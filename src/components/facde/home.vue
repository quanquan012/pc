<template>
  <el-main class="content">
    <router-view></router-view>
  </el-main>
</template>

<script>
  export default {
    name: 'home'
  }
</script>

<style scoped>
  .content {
    height: 100%;
    width: 100%;
    background-color: #FFFFFF;
    overflow: hidden;
  }
</style>
