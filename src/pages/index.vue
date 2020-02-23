<template>
  <div class="demo">
      <div class="test">werwerwrwerwrwer</div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {},

  computed: {},

  mounted () {
  },

  methods: {}
}
</script>
<style lang="scss" scoped>
body{
    background-color: brown;
}
.demo{
    width: 100px;
    height: 100px;
    background-color: aqua;
}
.test2{
    color: red;
    &:div{
        color: antiquewhite;
    }
}
</style>