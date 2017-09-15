<template>
  <div class="login">
    <router-link to="/" style="font-size: 18px;color: #ff4949;line-height: 24px;padding: 0 30px;">主页</router-link>
    <h1>移联综合管理平台</h1>
    <div class="login-container">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item label="账号">
          <el-input v-model="user.uid"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" @keyup.enter.native="login" v-model="user.pw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" style="margin-left:100px;" type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      user: {
        uid: '',
        pw: ''
      },
      loading: false
    }
  },
  created () {
    document.title = '登录'
  },
  methods: {
    login () {
      if (this.user.uid && this.user.pw) {
        this.loading = true
        let that = this
        this.$store.dispatch(types.LOGIN, this.user).then(function (res) {
          if (res.errorcode === 0) {
            if (res.data === '0' || res.data === 'gl') {
              that.$router.push({ path: '/bms' })
            } else {
              that.$router.push({ path: '/admin' })
            }
          } else {
            that.$message.error('账号或密码错误')
          }
          that.loading = false
        }).catch(function (e) {
          that.$message.error('网络错误')
          that.loading = false
        })
      } else {
        this.$message.warning('请正确填写账号密码')
      }
    }
  }
}
</script>

<style scoped>
h1{
  text-align: center;
  line-height: 150px;
}
.login{
  width: 100%;
  min-width: 860px;
  height: 100%;
}
.login-container{
  width: 400px;
  margin: 0 auto;
  padding: 20px;
}
</style>
