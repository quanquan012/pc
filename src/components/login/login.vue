<template>
  <div class="login">
    <el-form :model="loginForm" ref="loginForm" label-width="40px">
      <el-form-item prop="accountName">
        <el-input placeholder="账户" v-model="loginForm.accountName"></el-input>
      </el-form-item>
      <el-form-item prop="accountPass">
        <el-input placeholder="密码" type="password" v-model="loginForm.accountPass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登陆</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="onReset('loginForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data () {
      return {
        loginForm: {
          accountName: '',
          accountPass: ''
        }
      }
    },
    methods: {
      login () {
        console.log(this.loginForm)
        this.loginByAccount(this.loginForm)
      },
      onReset (formName) {
        this.$refs[formName].resetFields()
      },
      loginByAccount (loginForm) {
        const p = JSON.parse(JSON.stringify(loginForm))
        this.$http.post('/login', p,{timeout: 1000 * 60 * 2}).then((response) => {
          const ret = response.data
          let token = ret.token
          if (token) {
            console.log(token)
            this.$store.commit('set_token', token);
            this.$http.defaults.headers['token'] = token
            let redirect = decodeURIComponent(this.$route.query.redirect || '/facde');
            if(redirect){
              this.$router.push({//你需要接受路由的参数再跳转
                path: redirect
              });
            }
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 30%;
    position: fixed;
    top: 25%;
    left: 0;
    right: 0;
    margin: 0 auto;
    /*border: 1px solid #000;*/
    padding: 40px;
    /*background-color: #7e8c8d;*/
  }

  .el-button {
    width: 100%;
  }

  .el-form-item {
    margin-top: 10px;
    margin-bottom: 5px;
  }
</style>
