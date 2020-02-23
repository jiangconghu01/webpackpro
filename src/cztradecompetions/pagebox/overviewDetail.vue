<template>
  <div class="over_view_box" >
    <section class="box_item income_share">
      <div class="left_title">
        月度评分
      </div>
      <div class="sub_title"></div>
      <div class="right_content">
        <ul>
        </ul>
      </div>
    </section>
    <section class="box_item basic_face">
      <div class="left_title">
        各地区评分
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

    <p class="more_botton" @click="toOverview()"><i>返回</i> <img src="../../static/tradecomp/down_arrow.png" alt=""></p>
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
    .sub_title{
      width: 100px;
      background-color: #188FFF;
      height: 34px;
      float: left;
      margin-left: calc(50% - 120px);
      transform: translateX(-50%);

    }
    .right_content{
      float: left;
      padding-left: 70px;
      width: calc(100% - 125px);

    }
  }
  .more_botton{
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
      transform: rotate(180deg);
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


    },
    toOverview(){
      this.$router.push({name:'overview'});
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
       //this.getIncomePartData();
      },
      currentCity () {
       //this.getIncomePartData();
      }
    }

}
</script>
