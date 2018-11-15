<template>
  <div class="header">
    <el-header class="header">
      <el-row>
        <el-col :span="20">
          <img src="@/assets/logo.svg" alt="logo" class="header-logo">
        </el-col>
        <el-col :span="4">
          <div class="user">
            <el-row>
              <el-col :span="12">
                <div class="info">
                  <el-button type="text">当前用户</el-button>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="logout">
                  <el-button type="text" @click="logout()">退出</el-button>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-header>
  </div>
</template>

<script>
  export default {
    name: 'top',
    methods: {
      logout(){
        this.$store.commit('del_token');
        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        if(redirect){
          this.$router.push({//你需要接受路由的参数再跳转
            path: redirect
          });
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    height: 80px;
    width: 100%;
    z-index: 999;
    background-color: #525C64;
  }

  .header-logo {
    margin: 20px;
    /*display: inline-block;*/
    /*vertical-align: middle;*/
  }

  .user{
    height: 80px;
    width: 100%;
    /*background-color: aqua;*/
  }
  .info{
    margin-top: 40px;
    margin-left: 20px;
  }
  .logout{
    margin-top: 40px;
  }

</style>
