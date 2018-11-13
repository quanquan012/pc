<template>
  <div class="main">
    <el-container direction="vertical" class="main">
      <Header></Header>
      <el-container class="main" style="overflow-x: hidden;">
        <Navigation></Navigation>
        <Content></Content>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from './Header.vue'
  import Navigation from './Navigation.vue'
  import Content from './Content.vue'

  export default {
    name: 'Facde',
    components: {
      Header, Navigation, Content
    }
  }
</script>

<style>
  .main {
    height: 100%;
    overflow-x: hidden;
  }

</style>
