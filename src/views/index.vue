<template>
  <div class="main">
    <div class="btn" @click="intoDetail">大乐透</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  props: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    intoDetail() {
      this.$router.push({
        path: '/super-lotto'
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* @import url(); 引入css类 */
.main {
  padding: 20px 10px;
  .btn {
    width: 100px;
    height: 30px;
    line-height: 30px;
    background-color: pink;
    border-radius: 10px;
  }
}
</style>
