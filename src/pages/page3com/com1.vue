<template>
  <div class="demo">
      <button :style="{color:color}">我是插件一</button>
  </div>
</template>

<script>
export default {
    name:'com1',
    props:{
        color:{
            type:String,
            required:false,
            default:'#333'
        }
    },
    data(){
        return{

        }
    }
}
</script>

<style>

</style>