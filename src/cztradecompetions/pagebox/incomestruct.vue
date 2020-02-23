<template>
  <div class="income_struct_box" >
    <section class="struct_item dx">
      <div class="left_title">
        <ul>
          <li>
            <Img-title :url="dx_logo" color="#106BDE" >
              <template slot="title">电信增长率</template>
              <template slot="content">{{riseRate.dx_rate}}%</template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="dx_tb" color="#106BDE" :colorNumber="upData.dx_up &lt; 0 ? '#FA4D41' : '#0DAE0D'">
              <template slot="title">同比{{upData.dx_up &lt; 0 ? '下降' : '上升'}}</template>
              <template slot="content">
                <i>{{Math.abs((upData.dx_up/10000).toFixed(4))}}亿</i>
                <img v-if="upData.dx_up &lt; 0" src="../../static/tradecomp/down_red.png" alt="">
                <img v-if="!(upData.dx_up &lt; 0)" src="../../static/tradecomp/up_green.png" alt="">
              </template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="dx_sl" color="#106BDE" >
              <template slot="title">主要拉动</template>
              <template slot="content">{{mainItem.dx_max+'、'+mainItem.dx_max2}}</template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="dx_fl" color="#106BDE" :underLine="false">
              <template slot="title">负拉动明显</template>
              <template slot="content">{{mainItem.dx_min}}</template>
            </Img-title>
          </li>
        </ul>
      </div>
      <div class="chart_box">
        <div class="chart_box_e" id="dx_income_struct_chart"></div>
        <div class="chart_sign chart_sign_up" :style="{left:mainItem.dx_max_float+'%'}">
          <div class="back"></div>
          <span class="text">主要拉动</span>
        </div>
        <div class="chart_sign chart_sign_up" :style="{left:mainItem.dx_max_float2+'%'}">
          <div class="back"></div>
          <span class="text">主要拉动</span>
        </div>
        <div class="chart_sign chart_sign_down" :style="{left:mainItem.dx_min_float+'%',display:mainItem.dx_min_float == 0 ? 'none':'block'}">
          <div class="back"></div>
          <span class="text">负拉动</span>
        </div>
      </div>
    </section>
    <section class="struct_item yd">
      <div class="left_title">
          <ul>
          <li>
            <Img-title :url="yd_logo" color="#3DB0F2" >
              <template slot="title">移动增长率</template>
              <template slot="content">{{riseRate.yd_rate}}%</template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="yd_tb" color="#3DB0F2" :colorNumber="upData.yd_up &lt; 0 ? '#FA4D41' : '#0DAE0D'">
              <template slot="title">同比{{upData.yd_pu &lt; 0 ? '下降' : '上升'}}</template>
              <template slot="content">
                <i>{{Math.abs((upData.yd_up/10000).toFixed(4))}}亿</i>
                <img v-if="upData.yd_up &lt; 0" src="../../static/tradecomp/down_red.png" alt="">
                <img v-if="!(upData.yd_up &lt; 0)" src="../../static/tradecomp/up_green.png" alt="">
              </template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="yd_sl" color="#3DB0F2" :underLine="false">
              <template slot="title">主要拉动</template>
              <template slot="content">{{mainItem.yd_max+'、'+mainItem.yd_max2}}</template>
            </Img-title>
          </li>
        </ul>      
      </div>
      <div class="chart_box">
        <div class="chart_box_e" id="yd_income_struct_chart"></div>
        <div class="chart_sign chart_sign_up" :style="{left:mainItem.yd_max_float+'%'}">
          <div class="back"></div>
          <span class="text">主要拉动</span>
        </div>
        <div class="chart_sign chart_sign_up" :style="{left:mainItem.yd_max_float2+'%'}">
          <div class="back"></div>
          <span class="text">主要拉动</span>
        </div>
      </div>     
    </section>
    <section class="struct_item lt">
      <div class="left_title">
        <ul>
          <li>
            <Img-title :url="lt_logo" color="#FFA800" >
              <template slot="title">联通增长率</template>
              <template slot="content">{{riseRate.lt_rate}}%</template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="lt_tb" color="#FFA800" :colorNumber="upData.lt_up &lt; 0 ? '#FA4D41' : '#0DAE0D'">
              <template slot="title">同比{{upData.lt_pu &lt; 0 ? '下降' : '上升'}}</template>
              <template slot="content">
                <i>{{Math.abs((upData.lt_up/10000).toFixed(4))}}亿</i>
                <img v-if="upData.lt_up &lt; 0" src="../../static/tradecomp/down_red.png" alt="">
                <img v-if="!(upData.lt_up &lt; 0)" src="../../static/tradecomp/up_green.png" alt="">
              </template>
            </Img-title>
          </li>
          <li>
            <Img-title :url="lt_sl" color="#FFA800" :underLine="false">
              <template slot="title">主要拉动</template>
              <template slot="content">{{mainItem.lt_max+'、'+mainItem.lt_max2}}</template>
            </Img-title>
          </li>
        </ul>  
      </div>
      <div class="chart_box">
        <div class="chart_box_e" id="lt_income_struct_chart"></div>
        <div class="chart_sign chart_sign_up" :style="{left:mainItem.lt_max_float+'%'}">
          <div class="back"></div>
          <span class="text">主要拉动</span>
        </div>
        <div class="chart_sign chart_sign_up" :style="{left:mainItem.lt_max_float2+'%'}">
          <div class="back"></div>
          <span class="text">主要拉动</span>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import ImgTitle from '../basecomponents/imgtitle'
import dximg from '../../static/tradecomp/logo.png'
import dxtbimg from '../../static/tradecomp/dx_tb.png'
import dxslimg from '../../static/tradecomp/dx_sl.png'
import dxflimg from '../../static/tradecomp/dx_fl.png'

import ydimg from '../../static/tradecomp/yd_logo.png'
import ydtbimg from '../../static/tradecomp/yd_tb.png'
import ydslimg from '../../static/tradecomp/yd_sl.png'

import ltimg from '../../static/tradecomp/lt_logo.png'
import lttbimg from '../../static/tradecomp/lt_tb.png'
import ltslimg from '../../static/tradecomp/lt_sl.png'
import chartsConfig from '../chartsconfig/income.struct.chart.js'
import {getContinusEncodes,getDatesParams,searchEncodesValArr,searchValOfDate} from '../chartsconfig/data.handle.util'
import {ZJMap} from '../chartsconfig/city.map'
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      dx_logo:dximg,
      dx_tb:dxtbimg,
      dx_sl:dxslimg,
      dx_fl:dxflimg,
      yd_logo:ydimg,
      yd_tb:ydtbimg,
      yd_sl:ydslimg,
      lt_logo:ltimg,
      lt_tb:lttbimg,
      lt_sl:ltslimg,
      riseRate:{},
      upData:{},
      mainItem:{}
    }
  },
  created () {
   
  },
  methods: {
    async getChartsData(){
      const encodes  = getContinusEncodes(10,69,'HYJZZB00');
      const date  = this.currentMonth;
      const code  = this.currentCity;
      const postParam = {
         paramArrs: getDatesParams([date],[code],encodes)
      }
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          return {
            data:d.data
          }

      } catch (error) {
          return Promise.reject(error);
      }
    },
    setChartsData(){
      const seriseNames = ['主营收入','移动业务','流量手机','固网话音及增值','有线宽带','宽带电视','ICT','IDC','网元电路出租','其他']
      const upDataEncode_dx = getContinusEncodes(10,19,'HYJZZB00');
      const upDataEncode_yd = getContinusEncodes(20,29,'HYJZZB00');
      const upDataEncode_lt = getContinusEncodes(30,39,'HYJZZB00');
      const contribute_dx = getContinusEncodes(40,49,'HYJZZB00');
      const contribute_yd = getContinusEncodes(50,59,'HYJZZB00');
      const contribute_lt = getContinusEncodes(60,69,'HYJZZB00');
      this.getChartsData().then(d => {
        const data = d.data;
        const upDataArr_dx = searchEncodesValArr(upDataEncode_dx,data,1);
        const upDataArr_yd = searchEncodesValArr(upDataEncode_yd,data,1);
        const upDataArr_lt = searchEncodesValArr(upDataEncode_lt,data,1);
        const contributeArr_dx = searchEncodesValArr(contribute_dx,data,1);
        const contributeArr_yd = searchEncodesValArr(contribute_yd,data,1);
        const contributeArr_lt = searchEncodesValArr(contribute_lt,data,1);
        const chartsbox_dx = this.$echarts.init(document.getElementById('dx_income_struct_chart'));
        const chartsbox_yd = this.$echarts.init(document.getElementById('yd_income_struct_chart'));
        const chartsbox_lt = this.$echarts.init(document.getElementById('lt_income_struct_chart'));
        const f_dx = JSON.parse(JSON.stringify(chartsConfig));
        const f_yd = JSON.parse(JSON.stringify(chartsConfig));
        const f_lt = JSON.parse(JSON.stringify(chartsConfig));
        f_dx.series[0].data = upDataArr_dx;
        f_dx.series[1].data = contributeArr_dx;
        f_yd.series[0].data = upDataArr_yd;
        f_yd.series[1].data = contributeArr_yd;
        f_lt.series[0].data = upDataArr_lt;
        f_lt.series[1].data = contributeArr_lt;
        this.riseRate = {
          dx_rate:searchValOfDate(this.currentMonth,'HYJZZB0040',data),
          yd_rate:searchValOfDate(this.currentMonth,'HYJZZB0050',data),
          lt_rate:searchValOfDate(this.currentMonth,'HYJZZB0060',data)
        }
        this.upData = {
          dx_up:searchValOfDate(this.currentMonth,'HYJZZB0010',data),
          yd_up:searchValOfDate(this.currentMonth,'HYJZZB0020',data),
          lt_up:searchValOfDate(this.currentMonth,'HYJZZB0030',data)
        }
        //设置主要拉动项
        let main_upindex_dx = 0;
        let main_upindex_dx2 = 0;
        let main_downindex_dx = 0;
        let max_dx = contributeArr_dx[0].value;
        let max_dx2 = 0;
        let min_dx = contributeArr_dx[0].value;
        
        contributeArr_dx.forEach((element,index) => {
          if(element.value > max_dx){
            max_dx = element.value;
            main_upindex_dx = index;
          }
          if(element.value < min_dx){
            min_dx = element.value;
            main_downindex_dx = index;
          }
        });
        contributeArr_dx.forEach((element,index) => {
          if(!(index == main_upindex_dx) && element.value > max_dx2){
            max_dx2 = element.value;
            main_upindex_dx2 = index;
          }
        });
        let main_upindex_yd = 0;
        let main_upindex_yd2 = 0;
        let max_yd = contributeArr_yd[0].value;
        let max_yd2 = 0;
        contributeArr_yd.forEach((element,index) => {
          if(element.value > max_yd){
            max_yd = element.value;
            main_upindex_yd = index;
          }
        });
        contributeArr_yd.forEach((element,index) => {
          if(!(index == main_upindex_yd) && element.value > max_yd2){
            max_yd2 = element.value;
            main_upindex_yd2 = index;
          }
        });
        let main_upindex_lt = 0;
        let main_upindex_lt2 = 0;
        let max_lt = contributeArr_lt[0].value;
        let max_lt2 = 0;
        contributeArr_lt.forEach((element,index) => {
          if(element.value > max_lt){
            max_lt = element.value;
            main_upindex_lt = index;
          }
        });
        contributeArr_lt.forEach((element,index) => {
          if(!(index == main_upindex_lt) && element.value > max_lt2){
            max_lt2 = element.value;
            main_upindex_lt2 = index;
          }
        });
        this.mainItem = {
          dx_max:seriseNames[main_upindex_dx],
          dx_min:seriseNames[main_downindex_dx],
          yd_max:seriseNames[main_upindex_yd],
          lt_max:seriseNames[main_upindex_lt],

          dx_max2:seriseNames[main_upindex_dx2],
          yd_max2:seriseNames[main_upindex_yd2],
          lt_max2:seriseNames[main_upindex_lt2],

          dx_max_float:3+0.2+main_upindex_dx*9.5,
          dx_min_float:main_upindex_dx == main_downindex_dx ? 0 : 3+0.2+main_downindex_dx*9.5,
          yd_max_float:3+0.2+main_upindex_yd*9.5,
          lt_max_float:3+0.2+main_upindex_lt*9.5,

          dx_max_float2:3+0.2+main_upindex_dx2*9.5,
          yd_max_float2:3+0.2+main_upindex_yd2*9.5,
          lt_max_float2:3+0.2+main_upindex_lt2*9.5
        }
        chartsbox_dx.setOption(f_dx);
        chartsbox_yd.setOption(f_yd);
        chartsbox_lt.setOption(f_lt);
      })
    }
  },
  components: {
    ImgTitle
  },

  computed: {
      ...mapGetters({
        currentMonth: 'month',
        currentCity: 'city'
    })   
  },

  mounted () {
    this.setChartsData();
  },
  watch:{
    currentMonth(){
      this.setChartsData();
    },
    currentCity(){
      this.setChartsData();
    }
  }

}
</script>
<style lang='scss' scoped>
@import '../../css/common.scss';
.income_struct_box{
  height: 100%;
  padding-top:20px;
  .struct_item{
    height: 30%;
    &>div{
      height: 100%;
      float: left;
      background-color: #fff;
    }
    margin-bottom:15px;
    .left_title{
      position: relative;
      width: 24%;
      margin-left: 3%;
      border-left: 4px solid #eee;
      border-radius: 3px;
      ul{
        width: 100%;
         @include Ycenter;
      }
      li{
        padding: 0 8px;
      }
    }
    .chart_box{
      width: 68%;
      margin-left: 2%;
      height: 100%;
      position: relative;
      .chart_box_e{
        width: 100%;
        height: 100%;
      }
      .chart_sign{
        position: absolute;
        height: 100%;
        //width: 9.5%;
        width: 9.1%;
        bottom: 0;
        z-index: 1;
        left:3%;
        .back{
          width: 100%;
          height: 100%;
          //border:1px solid transparent;
          border:1px solid #fff;
        }
        &.chart_sign_up .back{
          border-left-color: #15A111;
          border-right-color: #15A111;
          opacity: 0.3;
          background-image: linear-gradient(180deg, rgba(255,255,255,0.00) 70%, #3DEA18 99%);
        }
        &.chart_sign_down{
          left:22%;
        }
        &.chart_sign_down .back{
          border-left-color: #FF1100;
          border-right-color: #FF1100;
          opacity: 0.2;
          background-image: linear-gradient(180deg, rgba(255,255,255,0.00) 70%, #FC4821 100%);
        }

        .text{
          display: inline-block;
          position:absolute;
          width: 100%;
          bottom: 0;
          text-align: center;
          font-size: 12px;
          border-radius: 2px;
          padding: 3px 0;
          color:rgba(255,255,255,.8);
          z-index: 2;
        }
        &.chart_sign_up .text{
          // background:radial-gradient( rgb(16, 235, 27), rgba(22, 222, 32,0.5));
          background-color: #3DEA18;
        }
        &.chart_sign_down .text{
           background-color:#FC4821;
        }
      }
    }
  }
  .dx{
      .left_title{
      border-left-color:#106BDE;
    }
  }
  .yd{
    .left_title{
      border-left-color:#13A9FF;
    }
  }
  .lt{
    .left_title{
      border-left-color:#FF9F00;
    }
    margin-bottom:0px;
  }
}
</style>