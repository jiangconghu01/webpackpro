<template>
  <div class="income_trend_box" >
    <p class="title_box"><b class="title">总体收入趋势</b>本月电信主营同比、环比均下降，移动联通累计增长率为正</p>
    <div class="chat_box">
      <div class="chat_item income_share_dx">
        <div class="accumulate_databox" :style="{left:accumulate.box_position+'%'}">
          <div class="title">累计提升</div> 
          <div class="data month dx" :style="{backgroundColor:accumulate.dx_hb>=0?'#48D102':'#FD5E11'}"><b>{{accumulate.dx_hb>0?'+'+accumulate.dx_hb:accumulate.dx_hb}}</b></div>
          <div class="data year dx" :style="{backgroundColor:accumulate.dx_tb>=0?'#48D102':'#FD5E11'}"><b>{{accumulate.dx_tb>0?'+'+accumulate.dx_tb:accumulate.dx_tb}}</b></div>
          <div class="data month yd" :style="{backgroundColor:accumulate.yd_hb>=0?'#48D102':'#FD5E11'}"><b>{{accumulate.yd_hb>0?'+'+accumulate.yd_hb:accumulate.yd_hb}}</b></div>
          <div class="data year yd" :style="{backgroundColor:accumulate.yd_tb>=0?'#48D102':'#FD5E11'}"><b>{{accumulate.yd_tb>0?'+'+accumulate.yd_tb:accumulate.yd_tb}}</b></div>
          <div class="data month lt" :style="{backgroundColor:accumulate.lt_hb>=0?'#48D102':'#FD5E11',bottom:'calc('+accumulate.lt_position+'% + 4px'}"><b>{{accumulate.lt_hb>0?'+'+accumulate.lt_hb:accumulate.lt_hb}}</b></div>
          <div class="data year lt" :style="{backgroundColor:accumulate.lt_tb>=0?'#48D102':'#FD5E11',bottom:'calc('+accumulate.lt_position+'% + 4px'}"><b>{{accumulate.lt_tb>0?'+'+accumulate.lt_tb:accumulate.lt_tb}}</b></div>
        </div>
        <div class="chart1" id="trend_income_share_dx"></div>
      </div>
      <div class="chat_item chart2" id="trend_rate_rise_dx"></div>
      <div class="chat_item" id="trend_rate_rise_yd"></div>
      <div class="chat_item" id="trend_rate_rise_lt"></div>
    </div>
  </div>
</template>

<script>
import {incomeTrendRateOfRise,stackBarTrendChartConfig} from '../chartsconfig/income.trend.chart.js'
import {
getMonthsArr,
getDatesParams,
searchCodeMonthsValArr,
searchEncodesMonthValArr,
getBeforeMothStr} from '../chartsconfig/data.handle.util'
import {ZJMap} from '../chartsconfig/city.map'
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
        accumulate:{}
    }
  },

  methods: {
    async getLeftTopData(){
      const date = this.currentMonth;
      const code = this.currentCity;
      const year = parseInt(date.substring(0,4));
      const month = parseInt(date.substring(4,6));
      const userPartMonths = getMonthsArr(year,12,13);
      const encodesUserPart = ['HYJZZB0003','HYJZZB0002','HYJZZB0001'];
      const params = getDatesParams(userPartMonths,[code],encodesUserPart)
      const postParam = { paramArrs: params};
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          return {
            data:d.data,
            months:userPartMonths,
            encodes:encodesUserPart,
            currentyear:year
          }

      } catch (error) {
          return Promise.reject(error);
      }

    },
    async getRiseRateData(){
      const date = this.currentMonth;
      const code = this.currentCity;
      const year = parseInt(date.substring(0,4));
      const month = parseInt(date.substring(4,6));
      const riseRateMonth = getMonthsArr(year,month,month);
      const incomeMonth = getMonthsArr(year-1,12,24);
      const encodeRiseRate= ['HYJZZB0006','HYJZZB0005','HYJZZB0004'];
      const encodeIncomeNum = ['HYJZZB0009','HYJZZB0008','HYJZZB0007'];
      const params0 = getDatesParams(riseRateMonth,[code],encodeIncomeNum)
      const params1 = getDatesParams(riseRateMonth,[code],encodeRiseRate)
      const params2 = getDatesParams(incomeMonth,[code],encodeIncomeNum)
      const params = params0 + ',' +params1+','+params2
      const postParam = { paramArrs: params};
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          return {
            data:d.data,
            riseratemonths:riseRateMonth,
            incomemonths:incomeMonth,
            rateencode:encodeRiseRate,
            incomencode:encodeIncomeNum,
            currentyear:year
          }

      } catch (error) {
          return Promise.reject(error);
      }
    },
    setCharts(){
      
      this.getLeftTopData().then(d => {
          const code = this.currentCity;
          const incomepart_box = this.$echarts.init(document.getElementById('trend_income_share_dx'));

          const data_income = searchCodeMonthsValArr(d.encodes, code, d.months, d.data);
          const f = stackBarTrendChartConfig;
          f.series[0].data = data_income[2].dataArr;
          f.series[1].data = data_income[1].dataArr;
          f.series[2].data = data_income[0].dataArr;
          f.series[3].data = data_income[2].dataArr;
          f.series[4].data = data_income[1].dataArr;
          const acEncode = ['HYJZZB0001','HYJZZB0002','HYJZZB0003'];
          const befMonth = getBeforeMothStr(this.currentMonth);
          const month = this.currentMonth.substring(4,6);
          const befYearMonth = d.months[0];
          const accumulate_current = searchEncodesMonthValArr( acEncode,this.currentMonth,d.data)
          let sum  = 0;
          accumulate_current.forEach(element => {
            sum+=Number(element.value);
          });
          const accumulate_bef = searchEncodesMonthValArr( acEncode,befMonth,d.data)
          const accumulate_befYmonth = searchEncodesMonthValArr( acEncode,befYearMonth,d.data)
          this.accumulate = {
            lt_hb:accumulate_current[0].value-accumulate_bef[0].value,
            lt_tb:accumulate_current[0].value-accumulate_befYmonth[0].value,
            yd_hb:accumulate_current[1].value-accumulate_bef[1].value,
            yd_tb:accumulate_current[1].value-accumulate_befYmonth[1].value,
            dx_hb:accumulate_current[2].value-accumulate_bef[2].value,
            dx_tb:accumulate_current[2].value-accumulate_befYmonth[2].value,
            lt_position:sum>0?accumulate_current[0].value/sum*100:0,
            box_position:3.2+Number(month)*7.2-2
          }
          const year = d.currentyear;
          const mongths = Array.apply(null,{length:12}).map((val,index)=>index+1+'月');
          mongths.unshift((year-1+'').slice(2,4)+'年底');
          f.xAxis[0].data = mongths;
          f.title.text = '收入份额走势（累计）';
          incomepart_box.setOption(f)
      }).catch(err => {
          this.$Message.info({
              content: '解析设置数据出错啦！',
              duration: 3,
              closable: true
          });
      });
      this.getRiseRateData().then(d => {
        const code = this.currentCity;
        const raterise_box_dx = this.$echarts.init(document.getElementById('trend_rate_rise_dx')); 
        const raterise_box_yd = this.$echarts.init(document.getElementById('trend_rate_rise_yd'));
        const raterise_box_lt = this.$echarts.init(document.getElementById('trend_rate_rise_lt'));
        const f_dx = JSON.parse(JSON.stringify(incomeTrendRateOfRise));  
        const f_yd = JSON.parse(JSON.stringify(incomeTrendRateOfRise));
        const f_lt = JSON.parse(JSON.stringify(incomeTrendRateOfRise));
        f_dx.series[1].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_dx.series[2].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_dx.series[3].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_yd.series[1].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_yd.series[2].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_yd.series[3].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_lt.series[1].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_lt.series[2].label.formatter = p =>p.value == 0 ? '' : p.value;
        f_lt.series[3].label.formatter = p =>p.value == 0 ? '' : p.value;
          

        const date_currentyear = d.riseratemonths;
        const date_befyear = d.incomemonths.slice(12,24);
        const date_doubleyearbef = d.incomemonths.slice(0,12);
        
        const rate_arr = searchCodeMonthsValArr(d.rateencode, code, date_currentyear, d.data);
        const current_income_arr = searchCodeMonthsValArr(d.incomencode, code, date_currentyear, d.data,0);
        const bef_income_arr = searchCodeMonthsValArr(d.incomencode, code, date_befyear, d.data,0);
        const doublebef_income_arr = searchCodeMonthsValArr(d.incomencode, code, date_doubleyearbef, d.data,0);
        f_dx.title.text = '电信增长率'
        f_yd.title.text = '移动增长率'
        f_lt.title.text = '联通增长率'
        const year=~~d.currentyear;
        const yearlist = [year,year-2,year-1,year];
        const legend=yearlist.map((val,index) => index === 0 ? val+'累计增长率':val+'年');
        f_dx.legend.data = legend;
        f_dx.series[0].name = legend[0];
        f_dx.series[1].name = legend[1];
        f_dx.series[2].name = legend[2];
        f_dx.series[3].name = legend[3];
        f_dx.series[0].data = rate_arr[0].dataArr;
        f_dx.series[1].data = doublebef_income_arr[0].dataArr;
        f_dx.series[2].data = bef_income_arr[0].dataArr;
        f_dx.series[3].data = current_income_arr[0].dataArr;

        f_yd.legend.data = legend;
        f_yd.series[0].name = legend[0];
        f_yd.series[1].name = legend[1];
        f_yd.series[2].name = legend[2];
        f_yd.series[3].name = legend[3];
        f_yd.series[0].data = rate_arr[1].dataArr;
        f_yd.series[1].data = doublebef_income_arr[1].dataArr;
        f_yd.series[2].data = bef_income_arr[1].dataArr;
        f_yd.series[3].data = current_income_arr[1].dataArr;

        f_lt.legend.data = legend;
        f_lt.series[0].name = legend[0];
        f_lt.series[1].name = legend[1];
        f_lt.series[2].name = legend[2];
        f_lt.series[3].name = legend[3];
        f_lt.series[0].data = rate_arr[2].dataArr;
        f_lt.series[1].data = doublebef_income_arr[2].dataArr;
        f_lt.series[2].data = bef_income_arr[2].dataArr;
        f_lt.series[3].data = current_income_arr[2].dataArr;
        raterise_box_dx.setOption(f_dx);
        raterise_box_yd.setOption(f_yd);
        raterise_box_lt.setOption(f_lt);
      }).catch(err => {
          this.$Message.info({
              content: '解析设置数据出错啦！',
              duration: 3,
              closable: true
          });
      });     
    }
  },
  components: {

  },

  computed: {
      ...mapGetters({
          currentMonth: 'month',
          currentCity: 'city'
      })
  },

  mounted () {

    // let charts1= this.$echarts.init(document.getElementById('trend_rate_rise_dx'));
    // let charts2= this.$echarts.init(document.getElementById('trend_rate_rise_yd'));
    // let charts3= this.$echarts.init(document.getElementById('trend_rate_rise_lt'));

    // let charts4= this.$echarts.init(document.getElementById('trend_income_share_dx'));

    // charts1.setOption(JSON.parse(JSON.stringify(incomeTrendRateOfRise)))
    // charts2.setOption(JSON.parse(JSON.stringify(incomeTrendRateOfRise)))
    // charts3.setOption(incomeTrendRateOfRise)
    // const f =JSON.parse(JSON.stringify(stackBarTrendChartConfig));
    // charts4.setOption(f)
    this.setCharts();
     console.log(this.currentMonth);
  },
  watch: {
      currentMonth() {
        this.setCharts();
      },
      currentCity () {
        this.setCharts();
      }
    }

}
</script>
<style lang='scss' scoped>
@import '../../css/common.scss';
.income_trend_box{
  height: 100%;
  .title_box{
    display: inline-block;
    @include Xcenter;
    height: 30px;
    line-height: 30px;
    margin: 10px 0;
    padding: 0px 20px;
    background-color: #fff;
    border-left: 4px solid #188FFF;
    border-radius: 3px;
  }
  .chat_box{
    height: 100%;
    .chat_item{
      margin-top: 20px;
      margin-left: 3%;
      float: left;
      width: 45.5%;
      height: 40%;
      background-color: #fff;
    }
    .income_share_dx{
       margin-top: 50px;
       position: relative;
       .accumulate_databox{
         z-index: 1;
         position: absolute;
         width: 11.2%;
         height: calc(100% - 50px);
         top:20px;
         left:3.5%;
         background-color: rgba(0,0,0,0);
        .title{
           width: 100%;
           font-size: 12px;
           white-space: nowrap;
           text-align: center;
           font-weight: bold;
         }
         .data{
           position: absolute;
           width: 48%;
           height: 14px;
           line-height: 14px;
           font-size: 12px;
           color:#fff;
           text-align: center;
           background-color: #48D102;
           overflow: hidden;
           border: 1px solid rgba(0,0,0,0);
           border-radius: 5%;
           //background-color: #FD5E11;
         }
         .dx{
           top:15px;
         }
         .yd{
          top:45%;
         }
         .lt{
           bottom: 4px;
         }
         .month{
           left: 0;
         }
         .year{
           left: 52%;
         }
       }
    }
    .chart1{
      width: 100%;
      height: 100%;
    }
    .chart2{
      margin-top: 50px;
    }
  }
}
</style>