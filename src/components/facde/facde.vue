<template>
  <div class="main">
    <el-container direction="vertical" class="main">
      <top></top>
      <el-container class="main" style="overflow-x: hidden;">
        <navigation></navigation>
        <home></home>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import top from './top.vue'
import navigation from './navigation.vue'
import home from './home.vue'

export default {
  name: 'facde',
  components: {
    top, navigation, home
  }
}
</script>

<style>
  .main {
    height: 100%;
    overflow-x: hidden;
  }

</style>
