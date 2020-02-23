<template>
  <div class="income_trend_box" >
    <p class="title_box"><b class="title">移动-用户</b>电信联通份额环比持续<b class="up">增长</b>，三家单位新增环比均<b class="down">下降</b></p>
    <div class="chat_box">
      <div class="chat_item chart1" id="income_ict"></div>
      <div class="chat_item chart2" >
        <div class="chart_box" id="ict_rise_tb"></div>
        <div class="table_box">
          <table>
            <tbody>
              <tr>
                <td>电信</td>
                <td v-for="(item, index) in ictTable.dx" :key="index">{{Number(item).toFixed(0)}}</td>
              </tr>
              <tr>
                <td>移动</td>
                <td v-for="(item, index) in ictTable.yd" :key="index">{{Number(item).toFixed(0)}}</td>
              </tr>
              <tr>
                <td>联通</td>
                <td v-for="(item, index) in ictTable.lt" :key="index">{{Number(item).toFixed(0)}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="chat_item chart3" id="income_idc"></div>
      <div class="chat_item chart4">
        <div class="chart_box" id="idc_rise_tb"></div>
        <div class="table_box">
           <table>
            <tbody>
              <tr>
                <td>电信</td>
                <td v-for="(item, index) in idcTable.dx" :key="index">{{Number(item).toFixed(0)}}</td>
              </tr>
              <tr>
                <td>移动</td>
                <td v-for="(item, index) in idcTable.yd" :key="index">{{Number(item).toFixed(0)}}</td>
              </tr>
              <tr>
                <td>联通</td>
                <td v-for="(item, index) in idcTable.lt" :key="index">{{Number(item).toFixed(0)}}</td>
              </tr>
            </tbody>
          </table>         
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import {ictAndidcConfig} from '../chartsconfig/income.trend.chart.js'
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
     ictTable:{},
     idcTable:{}
    }
  },

  methods: {
    async getChartData(){
      const date = this.currentMonth;
      const code = this.currentCity;
      const year = parseInt(date.substring(0,4));
      const month = parseInt(date.substring(4,6));
      const ictAndidcMonths = getMonthsArr(year,month,12);
      const encodesictIncome = ['HYJZZB0160','HYJZZB0161','HYJZZB0162'];
      const encodesidcIncome = ['HYJZZB0163','HYJZZB0164','HYJZZB0165'];
      const encodesictTb = ['HYJZZB0166','HYJZZB0167','HYJZZB0168'];
      const encodesidcTb = ['HYJZZB0169','HYJZZB0170','HYJZZB0171'];




      const params0 = getDatesParams(ictAndidcMonths,[code],encodesictIncome)
      const params1 = getDatesParams(ictAndidcMonths,[code],encodesidcIncome)
      const params2 = getDatesParams(ictAndidcMonths,[code],encodesictTb)
      const params3 = getDatesParams(ictAndidcMonths,[code],encodesidcTb)
      const params = params0 + ',' +params1+','+params2+','+params3
      const postParam = { paramArrs: params};
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          return {
            data:d.data,
            months:ictAndidcMonths,
            encodesictincome:encodesictIncome,
            encodesidcincome:encodesidcIncome,
            encodesicttb:encodesictTb,
            encodesidctb:encodesidcTb,
            currentyear:year,
            month:month
          }

      } catch (error) {
          return Promise.reject(error);
      }

    },
    setChartsData(){
      this.getChartData().then(d => {
        const code = this.currentCity;
        const income_ict_box = this.$echarts.init(document.getElementById('income_ict')); 
        const income_idc_box = this.$echarts.init(document.getElementById('income_idc')); 
        const ict_rise_tb_box = this.$echarts.init(document.getElementById('ict_rise_tb'));
        const idc_rise_tb_box = this.$echarts.init(document.getElementById('idc_rise_tb'));

        income_ict_box.clear();
        income_idc_box.clear();
        ict_rise_tb_box.clear();
        idc_rise_tb_box.clear();
        const f_ictincome = JSON.parse(JSON.stringify(ictAndidcConfig));  
        const f_idcincome = JSON.parse(JSON.stringify(ictAndidcConfig));  
        const f_ict_tb = JSON.parse(JSON.stringify(ictAndidcConfig));
        const f_idc_tb = JSON.parse(JSON.stringify(ictAndidcConfig));
        f_ictincome.title.text = 'ICT业务收入'
        f_idcincome.title.text = 'IDC业务收入'
        f_ict_tb.title.text = 'ICT同步增长量'
        f_idc_tb.title.text = 'IDC同步增长量'

            const source = d.data;
            const encodesICTincome = d.encodesictincome;
            const encodesIDCincome = d.encodesictincome;
            const encodesICTtb = d.encodesicttb
            const encodesIDCtb = d.encodesidctb
            const ict_income_data = searchCodeMonthsValArr(encodesICTincome, code, d.months, source);
            const idc_income_data = searchCodeMonthsValArr(encodesIDCincome, code, d.months, source);
            const ict_tb_data =  searchCodeMonthsValArr(encodesICTtb, code, d.months, source);
            const idc_tb_data =  searchCodeMonthsValArr(encodesIDCtb, code, d.months, source);
            this.ictTable = {dx:ict_tb_data[0].dataArr,yd:ict_tb_data[1].dataArr,lt:ict_tb_data[2].dataArr}
            this.idcTable = {dx:idc_tb_data[0].dataArr,yd:idc_tb_data[1].dataArr,lt:idc_tb_data[2].dataArr}
            const legend=['电信','移动','联通'];
            f_ictincome.legend.data = legend;
            f_idcincome.legend.data = legend;
            f_ict_tb.legend.data = legend;
            f_idc_tb.legend.data = legend;
            const xAxisdata = getMonthsArr(d.currentyear,d.month,12,'/',true);
            f_ictincome.xAxis[0].data = xAxisdata
            f_idcincome.xAxis[0].data = xAxisdata
            f_ict_tb.xAxis[0].data = xAxisdata
            f_idc_tb.xAxis[0].data = xAxisdata
            const ict_income_serise = [];
            const idc_income_serise = [];
            const ict_tb_serise = [];
            const idc_tb_serise = [];
            f_ictincome.series = ict_income_serise;
            f_idcincome.series = idc_income_serise;
            f_ict_tb.series = ict_tb_serise;
            f_idc_tb.series = idc_tb_serise;
            legend.forEach((val,index)=>{
              ict_income_serise.push({
                  name:val,
                  type:'line',
                  label:{
                      show:true
                  },
                  data:ict_income_data[index].dataArr               
              })
              idc_income_serise.push({
                  name:val,
                  type:'line',
                  label:{
                      show:true
                  },
                  data:idc_income_data[index].dataArr               
              })
              ict_tb_serise.push({
                  name:val,
                  type:'bar',
                  barWidth: '8', 
                  barGap:'10%',
                  label:{
                      show:false,
                      position:'top',
                      color:'#106BDE'
                      //formatter:'{c}%'
                  },
                  data:ict_tb_data[index].dataArr               
              })
              idc_tb_serise.push({
                  name:val,
                  type:'bar',
                  barWidth: '8', 
                  barGap:'10%',
                  label:{
                      show:false,
                      position:'top',
                      color:'#106BDE'
                      //formatter:'{c}%'
                  },
                  data:idc_tb_data[index].dataArr               
              })
            })
        income_ict_box.setOption(f_ictincome)
        income_idc_box.setOption(f_idcincome)
        ict_rise_tb_box.setOption(f_ict_tb)
        idc_rise_tb_box.setOption(f_idc_tb)
      })
    }
  },
  components: {},

  computed: {
      ...mapGetters({
          currentMonth: 'month',
          currentCity: 'city'
      })    
  },

  mounted () {
    // let charts1= this.$echarts.init(document.getElementById('ict_rate_rise_dx'));
    // let charts2= this.$echarts.init(document.getElementById('ict_rate_rise_yd'));
    // let charts3= this.$echarts.init(document.getElementById('ict_rate_rise_lt'));

    // let charts4= this.$echarts.init(document.getElementById('trend_ict'));

    // charts1.setOption(incomeTrendRateOfRise)
    // charts2.setOption(incomeTrendRateOfRise)
    // charts3.setOption(incomeTrendRateOfRise)


    // charts4.setOption(stackBarTrendChartConfig)
    this.setChartsData();
    
  },
  watch:{
        currentMonth() {
        this.setChartsData();
      },
      currentCity () {
        this.setChartsData();
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
      .chart_box{
        height: 65%;
      }
      .table_box{
         height: 35%;
         table{
            border-collapse:collapse;
            height: 90%;
            width: 100%;
         }
         td{
           border: 1px solid #eee;
           text-align: center;
           vertical-align: middle;
           font-size: 12px;
           width: 7.69%;
         }
      }
    }
    .chart1,.chart2{
      margin-top: 50px;
    }
    .chart2,.chart4{
      padding: 0 1%;
    }
  }
}
</style>