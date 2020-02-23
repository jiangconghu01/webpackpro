<template>
    <div id="tradecomp_body" class="custom">
        <header class="header_nav">
          <div class="logo header_item"><img src="../static/tradecomp/title.png" alt=""></div>
          <div class="nav header_item">
            <ul>
              <li class="nav_item" :class="{'current' : currentPage === 'overview'}" @click="toOverView()">
                <span class="nav_item_inner">
                <img src="../static/tradecomp/zl.png" alt="">
                <i>总览</i>
                </span>
              </li>
              <li class="nav_item item_4" :class="{'current' : currentPage === 'trend'}" @click="toIncomeTrend()">
                <span class="nav_item_inner">
                <img src="../static/tradecomp/srqs.png" alt="">
                <i>收入趋势</i>
                </span>
              </li>
              <li class="nav_item item_4" :class="{'current' : currentPage === 'struct'}" @click="toIncomeStruct()">
                <span class="nav_item_inner">
                <img src="../static/tradecomp/srjg.png" alt="">
                <i>收入结构</i>
                </span>
              </li>
              <li class="nav_item" :class="{'current' : currentPage === 'mb5g'}" @click="toIncomeMobile5G()">
                <span class="nav_item_inner">
                <img src="../static/tradecomp/5G.png" alt="">
                <i>移动</i>
                </span>
              </li>
              <li class="nav_item" :class="{'current' : currentPage === 'broadband'}" @click="toIncomeBroadband()">
                <span class="nav_item_inner">
                <img src="../static/tradecomp/kd.png" alt="">
                <i>宽带</i>
                </span>
              </li>
              <li class="nav_item" :class="{'current' : currentPage === 'ict'}" @click="toIncomeICTandIDC()">
                <span class="nav_item_inner item_4">
                <img src="../static/tradecomp/idc.png" alt="">
                <i>ICT/IDC</i>
                </span>
              </li>
              <li class="nav_item cb_lr" :class="{'current' : currentPage === 'profit'}" @click="toIncomeProfitandCost()">
                <span class="nav_item_inner">
                <img src="../static/tradecomp/cb.png" alt="">
                <i>成本及利润</i>
                </span>
              </li>
            </ul>
          </div>
          <div class="date header_item">
            <row>
              <i-col span="14">
              <Date-picker type="month" 
                  placeholder="选择月" 
                  format="yyyy年MM月" 
                 class="date_container" 
                  style="width: 95px"
                  v-model="dateVal"
                  @on-change="setTime">
                </Date-picker>
                </i-col>
              <i-col span="10">
                <i-select 
                :model.sync="modelCity" 
                placeholder="浙江" 
                style="width:100%" 
                @on-change="getCity" 
                class="city_select">
                     <i-option value="A33" selected>浙江</i-option>
                    <i-option value="A3301">杭州</i-option>
                    <i-option value="A3302">宁波</i-option>
                    <i-option value="A3303">温州</i-option>
                    <i-option value="A3304">嘉兴</i-option>
                    <i-option value="A3305">湖州</i-option>
                    <i-option value="A3306">绍兴</i-option>
                    <i-option value="A3307">金华</i-option>
                    <i-option value="A3308">衢州</i-option>
                    <i-option value="A3309">丽水</i-option>
                    <i-option value="A3310">台州</i-option>
                    <i-option value="A3311">舟山</i-option>
                </i-select>
              </i-col>
            </row>
          </div>
        </header>
        <div class="container">
          <router-view></router-view>
        </div>
        <Spin fix v-show="loadinShow">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
        </Spin>
    </div>
</template>

<style lang="scss" scoped>
@import '../css/common.scss';
.custom{
    height:100%;
    // background: url('../static/tradecomp/bk.png') no-repeat;
    .header_nav{
    background-color: #188FFF;
    width: 100%;
    color: #FFF;
    height: 40px;
    .header_item{
      height: 100%;
      display: inline-block;
      position: relative;
      font-size:15px;
      
    }
      .logo{
        width: 20%;
        img{
          width: 95%;
          @include center();
        }
      }
      .nav{
        width: 64%;
        padding-left: 2%;
        .nav_item{
          &.current{
            opacity: 1;
            background-color: #1372CC;
            border-bottom: 2px solid #fff;
          }
          opacity: 0.8;
          padding-top:10px;
          width: 13%;
          &.item_4{
            width: 14%;
          }
          &.cb_lr{
            width:16%;
          }
          height: 40px;
          float: left;
          position: relative;
          text-align: center;
          cursor: pointer;
          .nav_item_inner{
            img{
              width: 18px;
              height: 18px;
              vertical-align: bottom;
            }
          }
        }
      }
      .date{
            width:13%;
            position: relative;
            display: inline-block;
      }
      .date_container{
        margin-top: 5px;
      }
      .city_select{
         background-color: rgba(16, 162, 249, 0);
         color:#fff;
         margin-top: 6px;
      }
    }
    .container{
      height: calc(100% - 40px);
      //overflow-y: scroll;
      background-color: #F2F2F2;
      background-size: cover;
    }

}
</style>
<script>
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'
function beforeMonth () {
  let date = new Date()
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if (month < 3) {
    year -= 1
    month = 10 + month
  } else {
    month = month - 2
  }
  return month < 10 ? `${year}-0${month}` : `${year}-${month}`
}
export default {
  data () {
    return {
      currentPage: 'overview', 
      dateVal:beforeMonth (),
      modelCity:'A33'
    }
  },
  computed: {
    ...mapGetters([
        'loadinShow'
    ]),
  },
  methods: {
    ...mapMutations([
      'setMonth', 
      'setCity'
    ]),
    setTime(){
      const y = this.dateVal.getFullYear();
      const m = this.dateVal.getMonth()+1;
      let date = m < 10 ? `${y}0${m}` : y+''+m;
      this.setMonth(date);
    },
    getCity(val){
      this.setCity(val);
    },
    toOverView(){
      this.currentPage = 'overview';
      this.$router.push({ name: 'overview' })
    },
    toIncomeTrend(){
      this.currentPage = 'trend';
      this.$router.push({name:'trend'})
    },
    toIncomeStruct(){
      this.currentPage = 'struct';
      this.$router.push({ name: 'struct' })
    },
    toIncomeMobile5G(){
      this.currentPage = 'mb5g';
      this.$router.push({ name: 'mb5g' })
    },
    toIncomeBroadband(){
      this.currentPage = 'broadband';
      this.$router.push({ name: 'broadband' })
    },
    toIncomeICTandIDC(){
      this.currentPage = 'ict';
      this.$router.push({ name: 'ict' })
    },
    toIncomeProfitandCost(){
      this.currentPage = 'profit';
      this.$router.push({ name: 'profit' })
    }
  },
  created () {
    // this.setTime();
  },
  mounted () {
    this.currentPage = getCurrent(this.$router.history.current.path)
    console.log(this.loadinShow)
  }

}

function getCurrent (path) {
  let current = 'overview'
  switch (path) {
    case '/':current = 'overview'
      break
    case '/trend':current = 'trend'
      break
    case '/struct':current = 'struct'
      break
    case '/mb5g':current = 'mb5g'
      break
    case '/broadband':current = 'broadband'
      break
    case '/ict':current = 'ict'
      break
    case '/profit':current = 'profit'
      break
  }
  return current
}
</script>
<style>
.ivu-date-picker-cells.ivu-date-picker-cells-month{
    width: 130px;
}
.ivu-date-picker-cells.ivu-date-picker-cells-year{
    width: 130px;
}
.ivu-date-picker .ivu-input[disabled]{
    background-color: rgba(255,255,255,0);
    opacity: 1;
    cursor: pointer;
    color:rgba(255, 255, 255, 0.8);
}
.ivu-picker-panel-body{
    background-color: #fff;
    color: #495060;
    border-radius:10px;
}
    .ivu-input-icon-normal.ivu-input-icon{
        display: none;
    }
    .ivu-date-picker-focused input{
        background-color: rgba(16, 162, 249, 0);
    }
   .ivu-input-wrapper .ivu-input{
        background-color: rgba(16, 162, 249, 0);
        border: none;
        color:transparent;
    text-shadow:0 0 0 white;
        font-size: 14px;
        cursor: pointer;
       padding:0;
    }
    .ivu-date-picker-focused input.ivu-input{
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    .ivu-date-picker .ivu-select-dropdown{
        background-color: rgba(16, 162, 249, 0);
        -webkit-box-shadow: none;
        box-shadow: none;        
    }
    .ivu-date-picker .ivu-picker-panel-body{
      font-size: 14px;
    }

    .city_select .ivu-select-selection-focused, .ivu-select-selection:hover{
      border-color:rgba(16, 162, 249, 0);
    }
    .city_select .ivu-select-selection{
      background-color:rgba(16, 162, 249, 0); 
      border:none;
    }
    .city_select .ivu-select-arrow{
      color:#fff;
      display: none;
    }
    .city_select.ivu-select-single .ivu-select-selection .ivu-select-placeholder{
      color:#fff;
    }
    .city_select .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
     .city_select .ivu-select-single .ivu-select-selection .ivu-select-selected-value{
      font-size: 14px;
    }
    .city_select .ivu-select-dropdown{
      max-height: 380px;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .ivu-spin-fix {
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
</style>

