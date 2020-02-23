<template>
  <div class="income_trend_box" >
    <p class="title_box"><b class="title">移动-用户</b>电信联通份额环比持续<b class="up">增长</b>，三家单位新增环比均<b class="down">下降</b></p>
    <div class="button_group">
      <Button-group>
            <i-button :class="{'ivu-btn-primary':mb5g_nav === 'income'}" @click="mb5g_nav = 'income'">收入</i-button>
            <i-button :class="{'ivu-btn-primary':mb5g_nav === 'user'}" @click="mb5g_nav = 'user'">用户</i-button>
            <i-button :class="{'ivu-btn-primary':mb5g_nav === 'flow'}" @click="mb5g_nav = 'flow'">流量</i-button>
            <i-button :class="{'ivu-btn-primary':mb5g_nav === '4g_user'}" @click="mb5g_nav = '4g_user'">4G用户</i-button>
            <i-button :class="{'ivu-btn-primary':mb5g_nav === 'internet_things'}" @click="mb5g_nav = 'internet_things'">物联网用户</i-button>
            <i-button :class="{'ivu-btn-primary':mb5g_nav === 'telephone_quantity'}" @click="mb5g_nav = 'telephone_quantity'">话务量</i-button>
      </Button-group>
    </div>
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
    <!-- <div class="chat_box">
      <div class="chat_item chart1" id="trend_mb5g"></div>
      <div class="chat_item chart2" id="mb5g_rate_rise_dx"></div>
      <div class="chat_item" id="mb5g_rate_rise_yd"></div>
      <div class="chat_item" id="mb5g_rate_rise_lt"></div>
    </div> -->
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
        mb5g_nav:'income',
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
      let encodesUserPart = [];
      if(this.mb5g_nav == 'income'){
          encodesUserPart = ['HYJZZB0072','HYJZZB0071','HYJZZB0070'];
      }
      if(this.mb5g_nav == 'user'){
          encodesUserPart = ['HYJZZB0081','HYJZZB0080','HYJZZB0079'];
      }
      if(this.mb5g_nav == 'flow'){
          encodesUserPart = ['HYJZZB0090','HYJZZB0089','HYJZZB0088'];
      }
      if(this.mb5g_nav == '4g_user'){
          encodesUserPart = ['HYJZZB0102','HYJZZB0101','HYJZZB0100'];
      }
      if(this.mb5g_nav == 'internet_things'){
          encodesUserPart = ['HYJZZB0111','HYJZZB0110','HYJZZB0109'];
      }
      if(this.mb5g_nav == 'telephone_quantity'){
          encodesUserPart = ['HYJZZB0120','HYJZZB0119','HYJZZB0118'];
      }

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
      const riseRateMonth = getMonthsArr(year,month,month);
      const incomeMonth =  getMonthsArr(year-1,12,12);
      const encodeRiseRate = ['HYJZZB0075','HYJZZB0074','HYJZZB0073'];
      const encodeIncomeNum = ['HYJZZB0078','HYJZZB0077','HYJZZB0076'];
      //user
      const increasedUserMonth = getMonthsArr(year,month,16);
      const encodesNewIncreasedUser = ['HYJZZB0087','HYJZZB0086','HYJZZB0085'];
      const encodesGrowthUser = ['HYJZZB0084','HYJZZB0083','HYJZZB0082'];
      //flow
      const flowMonthArr = increasedUserMonth;
      const encodeMbFlow = ['HYJZZB0093','HYJZZB0092','HYJZZB0091'];
      const encodeFlowIncome = ['HYJZZB0096','HYJZZB0095','HYJZZB0094'];
      const encodeFlowUintPrice= ['HYJZZB0099','HYJZZB0098','HYJZZB0097'];
      //telephone_quantity
      const teleqMonthArr = increasedUserMonth;
      const encodeteleq = ['HYJZZB0123','HYJZZB0122','HYJZZB0121'];
      const encodeTeleqIncome = ['HYJZZB0126','HYJZZB0125','HYJZZB0124'];
      const encodeTeleqUintPrice= ['HYJZZB0129','HYJZZB0128','HYJZZB0127'];
      //4g_user
      const user4GMonth = increasedUserMonth;
      const encodes4GUser = ['HYJZZB0105','HYJZZB0104','HYJZZB0104'];
      const encodesGrowth4GUser = ['HYJZZB0108','HYJZZB0107','HYJZZB0106'];
      //internet_things
      const userInetMonth = increasedUserMonth;
      const encodesInetUser = ['HYJZZB0114','HYJZZB0113','HYJZZB0112'];
      const encodesGrowthInetUser = ['HYJZZB0117','HYJZZB0116','HYJZZB0115'];
      if(this.mb5g_nav == 'income'){
        const params0 = getDatesParams(riseRateMonth,[code],encodeIncomeNum)
        const params1 = getDatesParams(riseRateMonth,[code],encodeRiseRate)
        const params2 = getDatesParams(incomeMonth,[code],encodeIncomeNum)
        params = params0 + ',' +params1+','+params2
      }
      if(this.mb5g_nav == 'flow'){
        const params0 = getDatesParams(flowMonthArr,[code],encodeMbFlow)
        const params1 = getDatesParams(flowMonthArr,[code],encodeFlowIncome)
        const params2 = getDatesParams(flowMonthArr,[code],encodeFlowUintPrice)
        params = params0 + ',' +params1+','+params2
      }
      if(this.mb5g_nav == 'telephone_quantity'){
        const params0 = getDatesParams(teleqMonthArr,[code],encodeteleq)
        const params1 = getDatesParams(teleqMonthArr,[code],encodeTeleqIncome)
        const params2 = getDatesParams(teleqMonthArr,[code],encodeTeleqUintPrice)
        params = params0 + ',' +params1+','+params2
      }
      if(this.mb5g_nav == 'user'){
        const params0 = getDatesParams(increasedUserMonth,[code],encodesNewIncreasedUser)
        const params1 = getDatesParams(increasedUserMonth,[code],encodesGrowthUser)
        params = params0 + ',' +params1
      }
      if(this.mb5g_nav == '4g_user'){
        const params0 = getDatesParams(user4GMonth,[code],encodes4GUser)
        const params1 = getDatesParams(user4GMonth,[code],encodesGrowth4GUser)
        params = params0 + ',' +params1
      }
      if(this.mb5g_nav == 'internet_things'){
        const params0 = getDatesParams(userInetMonth,[code],encodesInetUser)
        const params1 = getDatesParams(userInetMonth,[code],encodesGrowthInetUser)
        params = params0 + ',' +params1
      }

      const postParam = { paramArrs: params};
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          return {
            data:d.data,
            riseratemonths:riseRateMonth,
            incomemonths:incomeMonth,
            rateencode:encodeRiseRate,
            incomencode:encodeIncomeNum,

            usermonths:increasedUserMonth,
            userincreaseenconde:encodesNewIncreasedUser,
            usergrouthencode:encodesGrowthUser,
            
            flowmonths:flowMonthArr,
            mbflowencode:encodeMbFlow,
            incomeflowencode:encodeFlowIncome,
            unitflowencode:encodeFlowUintPrice,

            user4gmonths:user4GMonth,
            user4genconde:encodes4GUser,
            user4ggrouthencode:encodesGrowth4GUser,

            userinetmonths:userInetMonth,
            userinetenconde:encodesInetUser,
            userinetgrouthencode:encodesGrowthInetUser,

            teleqmonths:teleqMonthArr,
            teleqencode:encodeteleq,
            incometeleqencode:encodeTeleqIncome,
            unitteleqencode:encodeTeleqUintPrice,
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
          if(this.mb5g_nav == 'income'){
               f.title.text = '收入份额走势（累计）';
          }
          if(this.mb5g_nav == 'user'){
              f.title.text = '移动用户份额';
          }
          if(this.mb5g_nav == 'internet_things'){
              f.title.text = '物联网用户份额';
          }
          if(this.mb5g_nav == 'flow'){
              f.title.text = '流量份额走势（累计）';
          }
          if(this.mb5g_nav == '4g_user'){
              f.title.text = '4G用户（累计）';
          }
          if(this.mb5g_nav == 'telephone_quantity'){
              f.title.text = '移动话务量份额（累计）';
          }
         
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
        const f_dx = JSON.parse(JSON.stringify(incomeTrendRateOfRise));  
        const f_yd = JSON.parse(JSON.stringify(incomeTrendRateOfRise));
        const f_lt = JSON.parse(JSON.stringify(incomeTrendRateOfRise));
          if(this.mb5g_nav == 'income'){
            const date_currentyear = d.riseratemonths;
            const date_befyear = d.incomemonths;
            
            const rate_arr = searchCodeMonthsValArr(d.rateencode, code, date_currentyear, d.data);
            const current_income_arr = searchCodeMonthsValArr(d.incomencode, code, date_currentyear, d.data,0);
            const bef_income_arr = searchCodeMonthsValArr(d.incomencode, code, date_befyear, d.data,0);
            f_dx.title.text = '电信增长率'
            f_yd.title.text = '移动增长率'
            f_lt.title.text = '联通增长率'
            const year=~~d.currentyear;
            const yearlist = [year,year-1,year];
            const legend=yearlist.map((val,index) => index === 0 ? val+'累计增长率':val+'年');
            f_dx.legend.data = legend;
            const seriesData = {dx:[],yd:[],lt:[]}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                if(i == 0){
                  seriesData[ele].push({
                    name:val,
                    type:'bar',
                    barWidth: '15', 
                    barCategoryGap: '8%',
                    label:{
                        show:true,
                        position:'top',
                        color:'#106BDE',
                        formatter:'{c}%'
                    },
                    data:rate_arr[index].dataArr
                  })
                }else if(i == 1){
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:bef_income_arr[index].dataArr
                  })
                }else{
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:current_income_arr[index].dataArr
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
          }
          if(this.mb5g_nav == 'user'){
            const cf_dx = JSON.parse(JSON.stringify(user5GConfig));  
            const cf_yd = JSON.parse(JSON.stringify(user5GConfig));
            const cf_lt = JSON.parse(JSON.stringify(user5GConfig));
            const montsArr = d.usermonths;
            
            const increaseuser_arr = searchCodeMonthsValArr(d.userincreaseenconde, code, montsArr, d.data,0);
            const grouthuser_arr = searchCodeMonthsValArr(d.usergrouthencode, code, montsArr, d.data,0);
            cf_dx.title.text = '电信'
            cf_yd.title.text = '移动'
            cf_lt.title.text = '联通'
            cf_dx.xAxis[0].data = montsArr;
            cf_yd.xAxis[0].data = montsArr;
            cf_lt.xAxis[0].data = montsArr;
            const legend=['移动用户净增','移动用户新增'];
            cf_dx.legend.data = legend;
            cf_yd.legend.data = legend;
            cf_lt.legend.data = legend;
            const seriesData = {dx:[],yd:[],lt:[]}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                if(i == 0){
                  seriesData[ele].push({
                    name:val,
                    type:'bar',
                    barWidth: '12', 
                    barCategoryGap: '8%',
                    label:{
                        show:true,
                        position:'top',
                        color:'#106BDE'
                        //formatter:'{c}%'
                    },
                    data:grouthuser_arr[index].dataArr
                  })
                }else{
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    //yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:increaseuser_arr[index].dataArr
                  })
                }
              })
            })
            cf_dx.series = seriesData.dx;
            cf_yd.series = seriesData.yd;
            cf_lt.series = seriesData.lt;
            raterise_box_dx.setOption(cf_dx);
            raterise_box_yd.setOption(cf_yd);
            raterise_box_lt.setOption(cf_lt);
          }
          if(this.mb5g_nav == '4g_user'){
            const cf_dx = JSON.parse(JSON.stringify(user5GConfig));  
            const cf_yd = JSON.parse(JSON.stringify(user5GConfig));
            const cf_lt = JSON.parse(JSON.stringify(user5GConfig));
            const montsArr = d.user4gmonths;

            const user_arr = searchCodeMonthsValArr(d.user4genconde, code, montsArr, d.data,0);
            const grouthuser_arr = searchCodeMonthsValArr(d.user4ggrouthencode, code, montsArr, d.data,0);
            cf_dx.title.text = '电信'
            cf_yd.title.text = '移动'
            cf_lt.title.text = '联通'
            cf_dx.xAxis[0].data = montsArr;
            cf_yd.xAxis[0].data = montsArr;
            cf_lt.xAxis[0].data = montsArr;
            const legend=['4G用户净增','4G用户'];
            cf_dx.legend.data = legend;
            cf_yd.legend.data = legend;
            cf_lt.legend.data = legend;
            const seriesData = {dx:[],yd:[],lt:[]}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                if(i == 0){
                  seriesData[ele].push({
                    name:val,
                    type:'bar',
                    barWidth: '12', 
                    barCategoryGap: '8%',
                    label:{
                        show:true,
                        position:'top',
                        color:'#106BDE'
                        //formatter:'{c}%'
                    },
                    data:grouthuser_arr[index].dataArr
                  })
                }else{
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    //yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:user_arr[index].dataArr
                  })
                }
              })
            })
            cf_dx.series = seriesData.dx;
            cf_yd.series = seriesData.yd;
            cf_lt.series = seriesData.lt;
            raterise_box_dx.setOption(cf_dx);
            raterise_box_yd.setOption(cf_yd);
            raterise_box_lt.setOption(cf_lt);
          }
          if(this.mb5g_nav == 'internet_things'){
            const cf_dx = JSON.parse(JSON.stringify(user5GConfig));  
            const cf_yd = JSON.parse(JSON.stringify(user5GConfig));
            const cf_lt = JSON.parse(JSON.stringify(user5GConfig));
            const montsArr = d.userinetmonths;

            const user_arr = searchCodeMonthsValArr(d.userinetenconde, code, montsArr, d.data,0);
            const grouthuser_arr = searchCodeMonthsValArr(d.userinetgrouthencode, code, montsArr, d.data,0);
            cf_dx.title.text = '电信'
            cf_yd.title.text = '移动'
            cf_lt.title.text = '联通'
            cf_dx.xAxis[0].data = montsArr;
            cf_yd.xAxis[0].data = montsArr;
            cf_lt.xAxis[0].data = montsArr;
            const legend=['物联网用户净增','物联网用户'];
            cf_dx.legend.data = legend;
            cf_yd.legend.data = legend;
            cf_lt.legend.data = legend;
            const seriesData = {dx:[],yd:[],lt:[]}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                if(i == 0){
                  seriesData[ele].push({
                    name:val,
                    type:'bar',
                    barWidth: '12', 
                    barCategoryGap: '8%',
                    label:{
                        show:true,
                        position:'top',
                        color:'#106BDE'
                        //formatter:'{c}%'
                    },
                    data:grouthuser_arr[index].dataArr
                  })
                }else{
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    //yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:user_arr[index].dataArr
                  })
                }
              })
            })
            cf_dx.series = seriesData.dx;
            cf_yd.series = seriesData.yd;
            cf_lt.series = seriesData.lt;
            raterise_box_dx.setOption(cf_dx);
            raterise_box_yd.setOption(cf_yd);
            raterise_box_lt.setOption(cf_lt);
          }
          if(this.mb5g_nav == 'flow'){
            const cf_flow = JSON.parse(JSON.stringify(user5GConfig));  
            const cf_flowic= JSON.parse(JSON.stringify(user5GConfig));
            const cf_flowunit = JSON.parse(JSON.stringify(user5GConfig));
            const montsArr = d.flowmonths;
            //             flowmonths:flowMonthArr,
            // mbflowencode:encodeMbFlow,
            // incomeflowencode:encodeFlowIncome,
            // unitflowencode:encodeFlowUintPrice,
            const mbflow_arr = searchCodeMonthsValArr(d.mbflowencode, code, montsArr, d.data,0);
            const icflow_arr = searchCodeMonthsValArr(d.incomeflowencode, code, montsArr, d.data,0);
            const unitflow_arr = searchCodeMonthsValArr(d.unitflowencode, code, montsArr, d.data,5);
            cf_flow.title.text = '手机流量（WT）'
            cf_flowic.title.text = '手机流量业务收入'
            cf_flowunit.title.text = '流量单价（元/M）'
            cf_flow.xAxis[0].data = montsArr;
            cf_flowic.xAxis[0].data = montsArr;
            cf_flowunit.xAxis[0].data = montsArr;
            const legend=['电信','移动','联通'];
            cf_flow.legend.data = legend;
            cf_flowic.legend.data = legend;
            cf_flowunit.legend.data = legend;
            const seriesData = {flow:[],flwoic:[],flowunit:[]}
            const seriesData_source = {flow:mbflow_arr,flwoic:icflow_arr,flowunit:unitflow_arr}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    //yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:seriesData_source[ele][i].dataArr
                  })
              })
            })
            cf_flow.series = seriesData.flow;
            cf_flowic.series = seriesData.flwoic;
            cf_flowunit.series = seriesData.flowunit;
            raterise_box_dx.setOption(cf_flow);
            raterise_box_yd.setOption(cf_flowic);
            raterise_box_lt.setOption(cf_flowunit);
          }
          if(this.mb5g_nav == 'telephone_quantity'){
            const cf_flow = JSON.parse(JSON.stringify(user5GConfig));  
            const cf_flowic= JSON.parse(JSON.stringify(user5GConfig));
            const cf_flowunit = JSON.parse(JSON.stringify(user5GConfig));
            const montsArr = d.teleqmonths;

            const mbflow_arr = searchCodeMonthsValArr(d.teleqencode, code, montsArr, d.data,0);
            const icflow_arr = searchCodeMonthsValArr(d.incometeleqencode, code, montsArr, d.data,0);
            const unitflow_arr = searchCodeMonthsValArr(d.unitteleqencode, code, montsArr, d.data,5);
            cf_flow.title.text = '移动话务量（亿分钟）'
            cf_flowic.title.text = '移动话音收入'
            cf_flowunit.title.text = '移动话音单价（元/分钟）'
            cf_flow.xAxis[0].data = montsArr;
            cf_flowic.xAxis[0].data = montsArr;
            cf_flowunit.xAxis[0].data = montsArr;
            const legend=['电信','移动','联通'];
            cf_flow.legend.data = legend;
            cf_flowic.legend.data = legend;
            cf_flowunit.legend.data = legend;
            const seriesData = {flow:[],flwoic:[],flowunit:[]}
            const seriesData_source = {flow:mbflow_arr,flwoic:icflow_arr,flowunit:unitflow_arr}
            Object.keys(seriesData).forEach((ele,index)=>{
              legend.forEach((val,i)=>{
                  seriesData[ele].push({
                    name:val,
                    type:'line',
                    //yAxisIndex: 1,
                    label:{
                        show:true
                    },
                    data:seriesData_source[ele][i].dataArr
                  })
              })
            })
            cf_flow.series = seriesData.flow;
            cf_flowic.series = seriesData.flwoic;
            cf_flowunit.series = seriesData.flowunit;
            raterise_box_dx.setOption(cf_flow);
            raterise_box_yd.setOption(cf_flowic);
            raterise_box_lt.setOption(cf_flowunit);
          }

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
      },
      mb5g_nav(){
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