<template>
  <div class="demo">
      <img :src="img" alt="">
      <div class="layout">
        <header class="header">
          <div class="name content">欢迎你，XXX</div>
          <div class="button" @click="outSystem()"></div>
          <div class="date">
            <div class="date-text content">{{date}}</div>
          </div>
        </header>
        <section class="top">
            <div class="left">
              <div class="map content" id="map_bd"></div>
            </div>
            <div class="right">
              <div class="right-top">
                <div class="chart content" id="pie_bar"></div>
                <div class="chart content" id="lines_capacity"></div>
              </div>
              <div class="right-bottom">
                <div class="chart-l content" id="bar_repair"></div>
                <div class="chart-r content" id="pie_order"></div>
              </div>
            </div>
        </section>
        <footer class="bottom">
          <div class="infor-title content"></div>
          <div class="infor-list content">
          </div>
          <div class="project-title content"></div>
          <div class="project-list content"></div>
        </footer>
      </div>
  </div>
</template>

<script>
import img from './dp.png'
import chart_bar from './chartconfig/pieofbar'
import lines_capacity from './chartconfig/lines'
import bar_repair from './chartconfig/bar'
import pie_c_order from './chartconfig/pie'
import 'echarts/extension/bmap/bmap'
import ic from'./icon.png';
export default {
  data () {
    return {
      img,
      date:'2020-02-26',
      diviceOn:0,
      diviceOff:5,
      charts:{
        'ct1':'',
        'ct2':'',
        'ct3':'',
        'ct4':''
      },
      bmap:''
    }
  },
  created(){
    //this.getDivceStatus();
  },
  components: {},

  computed: {
    divceAll(){
      return Number(this.diviceOff) + Number(this.diviceOn)
    }
  },

  mounted () {
    
    
    const chart_repair = this.$echarts.init(document.getElementById('bar_repair'));
    
    
    
    chart_repair.setOption(bar_repair);
    this.charts.ct1 = chart_repair;
    this.getCapacityTrend();
    this.getDivceStatus();
    this.getOrderList()
    this.initMap();
    this.getMapData();
    let resizeTimer = '';

    window.addEventListener('resize', () => {
        const charts  = this.charts;
        const resizeArr = [];
        Object.keys(charts).forEach(v =>{
          resizeArr.push(charts[v]);
        })
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            for (let item in charts) {
                charts[item] && charts[item].resize();
            }
        }, 200);
    });
  },
  methods: {
    outSystem(){
      this.$Notice.warning({
          title: '警告',
          desc: '还没有任何功能，还没有任何功能，还没有任何功能，还没有任何功能，还没有任何功能，还没有任何功能，还没有任何功能，'
      });
    },
    getCapacityTrend(){
      this.$http.get('http://yapi.thingcom.com/mock/109/api/statis/capacityTrend').then((d)=>{

        const chart_capacity = this.$echarts.init(document.getElementById('lines_capacity'));
        this.charts.ct4 = chart_capacity;
        const res = d.data.data;
        const xA = [];
        res[0].trendList.forEach(val=>{
            const arr = val.date.split('-');
            xA.push(arr[1]+'.'+arr[2])
        })
        lines_capacity.xAxis.data = xA;
        res.forEach(function(val,index){
          lines_capacity.series[index].name=val.capacity;
          lines_capacity.series[index].data=val.trendList;
        })
        chart_capacity.setOption(lines_capacity);
        
      })
    },
    getDivceStatus(){
      this.$http.get('http://yapi.thingcom.com/mock/109/api/statis/deviceState').then((d)=>{
        const chart_pie_bar = this.$echarts.init(document.getElementById('pie_bar'));
        this.charts.ct2 = chart_pie_bar;
        const res = d.data.data;
        chart_bar.title.text=''+res.onlineNum;
        chart_bar.title.subtext='总数:'+(res.onlineNum+res.offlineNum);
        chart_bar.angleAxis.max=Math.max(res.onlineNum,res.offlineNum);
        chart_bar.series[0].data[0].value=res.onlineNum;
        chart_bar.series[1].data[0].value=res.offlineNum;
        chart_pie_bar.setOption(chart_bar);
      })
    },
    getOrderList(){
      this.$http.get('http://yapi.thingcom.com/mock/109/api/statis/maintain').then((d)=>{
        
        const chart_order = this.$echarts.init(document.getElementById('pie_order'));
        this.charts.ct3 = chart_order;
         const res = d.data.data;
         const arr = [{name:'已完成',value:res.finishNum},{name:'维修中',value:res.inHandleNum},{name:'待维修',value:res.waitNum}];
        pie_c_order.series[1].data=arr;
        chart_order.setOption(pie_c_order);
      })
    },
    getMapData(){
      this.$http.get('http://yapi.thingcom.com/mock/109/api/device/map').then((d)=>{
        
        const chart_order = this.$echarts.init(document.getElementById('pie_order'));
         const res = d.data.data;
         const myIcon = new BMap.Icon(ic, new BMap.Size(40, 40));
         res.records.forEach(val =>{
                let a = JSON.parse(val.location)
                //const marker = new BMap.Marker(new BMap.Point(99.1779956133,25.1204891962), {icon: myIcon});
                var marker = new BMap.Marker(new BMap.Point(a['lon'],a['lat']), {icon: myIcon});
                this.bmap.addOverlay(marker)
         })

      })
    },
    initMap(){
      const chart_map = this.$echarts.init(document.getElementById('map_bd'));
      const option ={
              title: {
                      text: 'xxxx',
                      left: 'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter:function(v){
                            return '';
                        }
                    },
                    bmap: {
                        // 保山为南京
                        center: [99.1779956133,25.1204891962],
                        zoom: 4,
                        roam: true
                      
                    }
               };
                    chart_map.setOption(option);

                const  bmap = chart_map.getModel().getComponent('bmap').getBMap();
                bmap.addControl(new BMap.MapTypeControl());
                bmap.addControl(new BMap.NavigationControl());
                bmap.disableScrollWheelZoom();
                const myIcon = new BMap.Icon(ic, new BMap.Size(40, 40));
                const marker = new BMap.Marker(new BMap.Point(99.1779956133,25.1204891962), {icon: myIcon});
                marker.addEventListener("click", (e) => {
                    this.filterMarker(e.target.point, index);
                });
                //var marker = new BMap.Marker(new BMap.Point(99.1779956133,25.1204891962));
                bmap.addOverlay(marker)
                var mapStyle ={
                style : 'dark',
                };
                bmap.setMapStyle(mapStyle);
                this.bmap = bmap;
        //   const map = new BMap.Map("map_bd");
        //   map.enableScrollWheelZoom(true);
        //   // 混合图
        // var mapType = new BMap.MapTypeControl(
        //   {
        //     mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP],
        //     anchor: BMAP_ANCHOR_TOP_LEFT
        //   }
        // );

        // // 鹰眼图
        // var overView = new BMap.OverviewMapControl();

        // // 比例尺
        // var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});

        // // 添加默认缩放平移控件
        //   var top_left_navigation = new BMap.NavigationControl({anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL});

        // map.addControl(mapType); 
        // map.addControl(overView);
        // map.addControl(top_left_control);  
        // map.addControl(top_left_navigation); 

        //   // 创建地图实例  
        //   const point = new BMap.Point(99.1779956133,25.1204891962);
        //   // 创建点坐标  
        //   map.centerAndZoom(point, 15);
    }
  }
}
</script>
<style lang="scss">
html,body{
   width: 100%;
   height: 100%;
}
.demo{
  position: relative;
  width: 100%;
  height: 100%;
  img{
    width: 100%;
    height: 100%;
  }
  .content{
     //background-color: rgba(0,0,0,0.7);
     background-color: #060327;
  }
}
.layout{
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  position: absolute;
  .header{
    height: 11%;
    width: 36%;
    display: flex;
    align-items: center;
    justify-content: center;
    div{
      height: 50%;
    }
    .name{
      width: 35%;
      color: #00acde;
      font-size: 16px;
      text-align: center;
    }
    .button{
      width: 25%;
      cursor: pointer;
    }
    .date{
      width: 40%;
      position: relative;
      .date-text{
        
        position: absolute;
        height: 60%;
        width: 50%;
        left: 25%;
        top:15%;
      }
    }
  }
  .top{
    height: 60%;
    display: flex;
    .left{
      margin-left: 2%;
      width: 45%;
      height: 100%;
      position: relative;
      .map{
      width: 95%;
      height: 88%;
      position: absolute;
      top: 10%;
      }
    }
    .right{
      margin-left: 1.2%;
      width: 49.2%;
      height: 100%;
      position: relative;
      .right-top{
        position:absolute;
        width: 100%;
        height: 40%;
        top:10%;
        display: flex;
        .chart{
          height: 100%;
          width: 50%;
        }
      }
      .right-bottom{
        position:absolute;
        width: 100%;
        height: 35%;
        top: 64%;
        &>div{
          height: 100%;
          position: absolute;
        }
        .chart-l{
          left: 0;
          width: 47%;
        }
        .chart-r{
          right: 0;
          width: 45%;
        }
      }
    }
  }
  .bottom{
    height:28%;
    position: relative;
    &>div{
      position:absolute;
    }
    .infor-title{
      width: 28%;
      height: 15%;
      top: 12%;
    left: 17%;
    }
    .infor-list{
      top: 28%;
      left: 2%;
      width: 43%;
      height: 65%;
    }
    .project-title{
      top: 12%;
      right: 4%;
      width: 32%;
      height: 15%;
    }
    .project-list{
      top: 28%;
      left: 49%;
      width: 47%;
      height: 65%;
    }
    
  }
}
</style>