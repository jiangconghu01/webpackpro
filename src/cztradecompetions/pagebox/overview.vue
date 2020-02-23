<template>
  <div class="over_view_box" >
    <section class="box_item income_share">
      <div class="left_title">
        收入份额
      </div>
      <div class="right_content">
        <ul>
          <li class="text">4月我公司份额累计<b class="up">提升{{accumulate.dx_tb}}pp</b>,收入拉动主要来自：{{contributeItem.dx}}。<i></i></li>
          <li class="text">移动份额累计<b class="up">提升{{accumulate.yd_tb}}pp</b>,收入拉动主要来自：{{contributeItem.yd}}。<i></i></li>
          <li class="text">联通份额累计<b class="up">提升{{accumulate.lt_tb}}pp</b>,收入拉动主要来自：{{contributeItem.lt}}。<i></i></li>
        </ul>
      </div>
    </section>
    <section class="box_item basic_face">
      <div class="left_title">
        基本面
      </div>
      <div class="right_content">
        <ul>
          <li class="text mu">移动业务：本月电信在移动用户、流量业务、话务量提升上均处于领先;浙移在移动收入提升上领先;<br>
          电信浙移在4G用户、物联网用户方面不及联通
          <i></i></li>
          <li class="text">宽带业务：本月电信用户比浙移少135万户<i></i></li>
          <li class="text">宽带业务：电信用户份额领先,当前用户数比浙移多52万户<i></i></li>
        </ul>
      </div>
    </section>
    <section class="box_item profit">
      <div class="left_title">
        利润
      </div>
      <div class="right_content">
        <ul>
          <li class="text">电信利润环比下降。当前累计利润率分别为浙移39.46%、电信16.76%、联通4.43%</li>
        </ul>
      </div>
    </section>
    <p class="more_botton" @click="toDetail()"><i>点击查看评价详情</i> <img src="../../static/tradecomp/down_arrow.png" alt=""></p>
  </div>
</template>
<style lang='scss' scoped>
.over_view_box{
  position: relative;
  padding-top: 50px;
  .box_item{
    margin-bottom: 18px;
    overflow: hidden;
    .left_title{
      box-shadow: 0 15px 18px -6px rgba(95,193,206,0.85);
      border: none;
      float: left;
      font-size: 17px;
      width: 120px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color:#fff;
      background: url('../../static/tradecomp/sub-title.png') no-repeat;
      background-size:cover;
    }
    .right_content{
      float: left;
      padding-left: 70px;
      width: calc(100% - 125px);
      .text{
        &.mu{
          line-height: 20px;
        }
        width: 78%;
        padding: 8px;
        background-color: #fff;
        margin-bottom: 12px;
        border-radius: 3px;
        line-height: 20px;
        cursor: pointer;
        &:hover i{
          display: block;
        }
        .down{
          background-color: #FE5D14;
        }
        .up{
          background-color: #37DD03;
        }
        b{
          color:rgba(255,255,255,0.8);
          margin: 0 3px;
          display: inline-block;
          font-size: 14px;
          border-radius: 2px;
          padding: 1px;
        }
        i{
          display: none;
          height: 14px;
          width: 14px;
          background: url('../../static/tradecomp/more.png')  no-repeat;
          background-size:cover;
          float: right;
          margin-left: 15px;
        }
      }
    }
  }
  .more_botton{
    transform: translateZ(0);
    width: 220px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #188FFF;
    border-radius: 3px;
    position: fixed;
    bottom: 25px;
    text-align: center;
    background-color: #188FFF;
    cursor:pointer;
    left: calc(50% - 140px);
    i{
        display: inline-block;
        vertical-align: top;
        color:#fff;
    }
    img{
      width: 10px;
      height: 17px;
      vertical-align: middle;
    }
  }
}
</style>
<script>
import { mapGetters } from 'vuex';
import {
getMonthsArr,
getDatesParams,
getContinusEncodes,
searchEncodesValArr,
searchEncodesMonthValArr} from '../chartsconfig/data.handle.util'
export default {
  data () {
    return {
      accumulate:{},
      contributeItem:{}
    }
  },

  methods: {
    async getIncomePartData(){
      const date = this.currentMonth;
      const code = this.currentCity;
      const year = parseInt(date.substring(0,4));
      //const month = parseInt(date.substring(4,6));
      const months = getMonthsArr(year,12,13);
      //收入份额
      const encodesUserPart = ['HYJZZB0003','HYJZZB0002','HYJZZB0001'];
      const contribute_dx = getContinusEncodes(40,49,'HYJZZB00');
      const contribute_yd = getContinusEncodes(50,59,'HYJZZB00');
      const contribute_lt = getContinusEncodes(60,69,'HYJZZB00');
      const encodes = [...encodesUserPart,...contribute_dx,...contribute_yd,...contribute_lt];
      const params = getDatesParams([months[0],date],[code],encodes)
      const postParam = { paramArrs: params};
      try {
          const d = await this.$http.post('/czxt/pages/wjhx/getIdWjhxParm.do', postParam);
          const befYearMonth = months[0];
          const accumulate_current = searchEncodesMonthValArr( encodesUserPart,this.currentMonth,d.data)
        
          const accumulate_befYmonth = searchEncodesMonthValArr( encodesUserPart,befYearMonth,d.data)
          this.accumulate = {
            lt_tb:accumulate_current[2].value-accumulate_befYmonth[2].value,
            yd_tb:accumulate_current[1].value-accumulate_befYmonth[1].value,
            dx_tb:accumulate_current[0].value-accumulate_befYmonth[0].value
          }

          const seriseNames = ['主营收入','移动业务','流量手机','固网话音及增值','有线宽带','宽带电视','ICT','IDC','网元电路出租','其他']
          const contributeArr_dx = searchEncodesMonthValArr(contribute_dx,this.currentMonth,d.data,1);
          const contributeArr_yd = searchEncodesMonthValArr(contribute_yd,this.currentMonth,d.data,1);
          const contributeArr_lt = searchEncodesMonthValArr(contribute_lt,this.currentMonth,d.data,1);
          const c_dx = contributeArr_dx.map((val,index)=>{
                let a = val;
                a.indexnum = index
                return a;
          })
          const c_yd = contributeArr_yd.map((val,index)=>{
                let a = val;
                a.indexnum = index
                return a;
          })
          const c_lt = contributeArr_lt.map((val,index)=>{
                let a = val;
                a.indexnum = index
                return a;
          })
          c_dx.sort((a,b)=>{
            return b.value - a.value;
          })
          c_yd.sort((a,b)=>{
            return b.value - a.value;
          })
          c_lt.sort((a,b)=>{
            return b.value - a.value;
          })
          this.contributeItem = {
            dx:c_dx[0].value == 0 ? '本月暂无数据' :  seriseNames[c_dx[0].indexnum] +'、'+ seriseNames[c_dx[1].indexnum],
            yd:c_yd[0].value == 0 ? '本月暂无数据' :  seriseNames[c_yd[0].indexnum] +'、'+ seriseNames[c_yd[1].indexnum],
            lt:c_lt[0].value == 0 ? '本月暂无数据' :  seriseNames[c_lt[0].indexnum] +'、'+ seriseNames[c_lt[1].indexnum]
          }

      } catch (error) {
          return Promise.reject(error);
      }

    },
    toDetail(){
       //this.$router.push({name:'detail'})
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
    this.getIncomePartData();
  },
  watch: {
      currentMonth() {
       this.getIncomePartData();
      },
      currentCity () {
       this.getIncomePartData();
      }
    }

}
</script>
