<template>
    <div class="header">
      <el-header class="header">
        <img src="@/assets/logo.svg" alt="logo" class="header-logo">
      </el-header>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header{
  height: 80px;
  width: 100%;
  z-index: 999;
  background-color: #525C64;
}
.header-logo {
  margin: 20px;
  display: inline-block;
  vertical-align: middle;
}
</style>
