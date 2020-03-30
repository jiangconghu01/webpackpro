<template>
<div class="message" v-if="show">
    {{label}}
</div>
</template>
<script>
export default {
data () {
return {
    label:'',
    show:true
}
},
created(){},
components: {},
computed: {},
methods: {},
mounted () {}
}
</script>
<style lang="scss">
.message{
    position:fixed;
    top:20px;
    right: 10px;
    color: #fff;
    background-color: #222;
    padding: 15px 20px;
    width: 180px;
}
</style>