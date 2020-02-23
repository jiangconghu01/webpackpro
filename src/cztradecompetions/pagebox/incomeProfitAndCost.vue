<template>
  <div class="income_trend_box" >
    <p class="title_box"><b class="title">宽带-用户</b>电信联通份额环比持续<b class="up">增长</b>，三家单位新增环比均<b class="down">下降</b></p>
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
import {incomeTrendRateOfRise,stackBarTrendChartConfig,user5GConfig} from '../chartsconfig/income.trend.chart.js'
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
      const encodesUserPart = ['HYJZZB0174','HYJZZB0173','HYJZZB0172'];

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
      let params = '';
      //income
      const monthArr = getMonthsArr(year,month,month);
      const befMonthArr =  getMonthsArr(year-1,12,12);
      const encodes_dx = ['HYJZZB0175','HYJZZB0178','HYJZZB0181','HYJZZB0184','HYJZZB0187'];
      const encodes_yd = ['HYJZZB0176','HYJZZB0179','HYJZZB0182','HYJZZB0185','HYJZZB0188'];
      const encodes_lt = ['HYJZZB0177','HYJZZB0180','HYJZZB0183','HYJZZB0186','HYJZZB0189'];


        
        const params0 = getDatesParams(befMonthArr.concat(monthArr),[code],encodes_dx)
        const params1 = getDatesParams(befMonthArr.concat(monthArr),[code],encodes_yd)
        const params2 = getDatesParams(befMonthArr.concat(monthArr),[code],encodes_lt)
        params = params0 + ',' +params1+','+params2

      const postParam = { paramArrs: params};
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          return {
            data:d.data,
            months:monthArr,
            befmonths:befMonthArr,
            encodes_dx:encodes_dx,
            encodes_yd:encodes_yd,
            encodes_lt:encodes_lt,

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
          const acEncode =  JSON.parse(JSON.stringify(d.encodes)).reverse();
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
 
          f.title.text = '利润份额走势（累计）';

          incomepart_box.setOption(f)
      }).catch(err => {
          this.$Message.info({
              content: '解析设置数据出错啦！请刷新页面或者联系管理员！',
              duration: 3,
              closable: true
          });
      });
      this.getRiseRateData().then(d => {
        const code = this.currentCity;
        const raterise_box_dx = this.$echarts.init(document.getElementById('trend_rate_rise_dx')); 
        const raterise_box_yd = this.$echarts.init(document.getElementById('trend_rate_rise_yd'));
        const raterise_box_lt = this.$echarts.init(document.getElementById('trend_rate_rise_lt'));
        raterise_box_dx.clear();
        raterise_box_yd.clear();
        raterise_box_lt.clear();
        const f_dx = JSON.parse(JSON.stringify(user5GConfig));  
        const f_yd = JSON.parse(JSON.stringify(user5GConfig));
        const f_lt = JSON.parse(JSON.stringify(user5GConfig));
        

            const date_currentyear = d.months;
            const date_befyear = d.befmonths;
            
            const dx_current_arr = searchCodeMonthsValArr(d.encodes_dx, code, date_currentyear, d.data);
            const yd_current_arr = searchCodeMonthsValArr(d.encodes_yd, code, date_currentyear, d.data);
            const lt_current_arr = searchCodeMonthsValArr(d.encodes_lt, code, date_currentyear, d.data);
            const dx_bef_arr = searchCodeMonthsValArr(d.encodes_dx, code, date_befyear, d.data);
            const yd_bef_arr = searchCodeMonthsValArr(d.encodes_yd, code, date_befyear, d.data);
            const lt_bef_arr = searchCodeMonthsValArr(d.encodes_lt, code, date_befyear, d.data);
            debugger
            f_dx.title.text = '电信'
            f_yd.title.text = '移动'
            f_lt.title.text = '联通'
            f_dx.color = ['#69F5FF','#3998FF','#FF7B51','#FFCE00','#FA4D41']
            f_yd.color = ['#69F5FF','#3998FF','#FF7B51','#FFCE00','#FA4D41']
            f_lt.color = ['#69F5FF','#3998FF','#FF7B51','#FFCE00','#FA4D41']
            lt_bef_arr.forEach((val,index)=>{
               lt_current_arr[index].dataArr.unshift(parseInt(eval(val.dataArr.join("+"))/12)); 
            })
            yd_bef_arr.forEach((val,index)=>{
               yd_current_arr[index].dataArr.unshift(parseInt(eval(val.dataArr.join("+"))/12)); 
            })
            dx_bef_arr.forEach((val,index)=>{
               dx_current_arr[index].dataArr.unshift(parseInt(eval(val.dataArr.join("+"))/12)); 
            })
            const legend = ['其他成本','销售费用','折旧及摊销','利润','主营收入']
            const year=~~d.currentyear;
            date_currentyear.unshift(year-1+'平均');
             const xAxisArr = date_currentyear;
            f_dx.legend.data = legend;
            f_yd.legend.data = legend;
            f_lt.legend.data = legend;
            f_dx.xAxis[0].data = xAxisArr;
            f_yd.xAxis[0].data = xAxisArr;
            f_lt.xAxis[0].data = xAxisArr;
            const seriesData = {dx:[],yd:[],lt:[]}
            const seriesDataSource = {dx:dx_current_arr,yd:yd_current_arr,lt:lt_current_arr}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                if(i == 4){
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    //yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:seriesDataSource[ele][i].dataArr
                  })
                }else {
                   seriesData[ele].push({
                    name:val,
                    stack:'数量',
                    type:'bar',
                    barWidth: '15', 
                    barCategoryGap: '8%',
                    label:{
                        show:false,
                        position:'inside'
                    },
                    data:seriesDataSource[ele][i].dataArr
                  })                   

                }
              })
            })
            f_dx.series = seriesData.dx;
            f_yd.series = seriesData.yd;
            f_lt.series = seriesData.lt;
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

    this.setCharts();
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
  .button_group{
    margin-top: 10px;
    margin-right: 3%;
    position: absolute;
    right: 0;
      .ivu-btn-group{
        .ivu-btn{
          padding:5px 8px;
        }
      }
  }
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
    .up{
      color: #fff;
      background-color:#48D102;
      padding:1px 5px;
      margin-left: 2px;
    }
    .down{
      color: #fff;
      background-color:#FD5E11;
      padding:1px 5px;
      margin-left: 2px;
    }
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