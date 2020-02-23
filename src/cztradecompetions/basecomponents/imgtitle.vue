<template>
  <div class="img_title" :class="{'u_line':underLine}">
    <div class="title">
        <img :src="url" alt="">
        <span class="title-text" :style="{color:color}"> 
            <slot name="title"></slot>
        </span>
        <span class="content_text" :style="{color:colorNumber}">
            <slot name="content"></slot>
        </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: false
    },
    color:{
        type:String,
        required:false,
    },
    colorNumber:{
        type:String,
        required:false,
        default:'#4D4D4D'
    },
    underLine:{
        type:Boolean,
        required:false,
        default:true
    }
  },
  data () {
    return {
    }
  },
  methods: {},
  components: {},
  computed: {},
  mounted () {}
}
</script>
<style lang='scss' scoped>
.img_title{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 3px 5px;
    &.u_line{
        border-bottom: 1px solid rgba(233,233,233,0.5);
    }
    
    cursor: pointer;
    .title{
        white-space: nowrap;
        img{
            width: 16px;
            height: 16px;
            //vertical-align: text-bottom;
            margin-top: 7px;
        }
        .title-text,.content_text{
            font-size: 14px;
            display: inline-block;
            line-height: 30px;
            height: 30px;
            vertical-align: top;
            font-family: MicrosoftYaHei;
            font-weight: 600;
            //padding-left: 2px;
            color: #333333;
            letter-spacing: 0.5px;
            opacity: .8;
        }
        .content_text{
            float:right;
            img{
                margin-left: 2px;
                width: 8px;
                height: 15px;
                margin-top: 8px;
            }
            i{
                vertical-align: top;
            }
        }
        margin-left: 5px; 
    }
}
</style>