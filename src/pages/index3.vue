<template>
  <div class="demo">
      <com1></com1>
      <com2 color="red"></com2>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  created(){},
  components: {},
  computed: {},
  methods: {},
  mounted () {
      this.$msg(
          {
          label:'我是一个消息',
          time:4000
          });
  }
}
</script>
<style lang="scss">

</style>