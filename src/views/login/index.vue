<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="logo-pic">
        <img
          style="width: 96px; height: 96px"
          src="@/assets/images/logo.png"
          fit="cover"
        >
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container el-icon-mobile" />

        <el-input
          ref="loginName"
          v-model="loginForm.loginName"
          placeholder="请输入账号"
          name="loginName"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container el-icon-lock" />
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-form-item class="code-item" prop="code">
        <el-row>
          <el-col :span="17"><div class="grid-content bg-purple" />
            <span class="svg-container el-icon-lock" />
            <el-input
              ref="code"
              v-model="loginForm.code"
              placeholder="请输入验证码"
              name="code"
              type="text"
              tabindex="3"
              auto-complete="on"
            /></el-col>
          <el-col :span="7"><div class="grid-content bg-purple-light" />
            <div class="code-image" @click="updateCode">
              <img :src="codeUrl" alt="">
            </div>
          </el-col>
        </el-row>
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" @click.native.prevent="handleLogin">登录</el-button>
    </el-form>

  </div>
</template>

<script>
import { validloginName } from '@/utils/validate'
import { updateCodeAPI } from '@/api'
export default {
  name: 'Login',
  data() {
    const validateloginName = (rule, value, callback) => {
      if (!validloginName(value)) {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    const validateCode = (rule, value, callback) => {
      if (value.length < 4) {
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        loginName: 'admin',
        password: 'admin',
        code: '',
        clientToken: '',
        loginType: 0
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateloginName }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      codeUrl: ''

    }
  },
  computed: { },
  watch: {},
  created() {
    this.updateCode()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async updateCode() {
      const clientToken = Math.random().toString()
      this.loginForm.clientToken = clientToken
      const res = await updateCodeAPI(clientToken)
      this.codeUrl = res.config.url
    },
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate()
        this.loading = true
        await this.$store.dispatch('user/LOGIN_ACTION', this.loginForm)
        if (!this.$store.state.user.token) { this.$message.error(this.$store.state.user.data.msg) } else { this.$router.push('/') }
      } finally {
        this.loading = false
      }
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#fff;
$light_gray:#999;
$cursor: #999;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      height: 47px;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    width: 100%;
    height: 52px;
    margin-bottom: 24px;
    background: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    color: #454545;
  }
  .el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 110%;
    left: 0;
}
  .code-item{
    .code-image{
      width: 130px;
      height:50px;
      // background-color: lawngreen;
    }
  }

  .loginBtn{
    width: 100%;
    height: 52px;
    margin-bottom:30px;
    background: linear-gradient(262deg,#2e50e1,#6878f0);
    opacity: .91;
    border-radius: 8px;
    color: #fff;
    text-shadow: 0 7px 22px #cfcfcf
  }

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-image: url(~@/assets/images/background.png);
    background-repeat: no-repeat;
    background-size: cover;

  .login-form {
    position: absolute;
    width: 518px;
    height: 388px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 76px 35px 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    box-shadow: 0 3px 70px 0 rgb(30 111 72 / 35%);
    border-radius: 10px;
    .logo-pic{
      position: absolute;
    width: 96px;
    height: 96px;
    top: -46px;
    left: 50%;
    margin-left: -48px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
