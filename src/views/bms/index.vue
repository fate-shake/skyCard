<template>
	<div class="index" v-loading.body="loading" element-loading-text="拼命加载中" >
		<header>
      <div class="logo">
        <!--  -->
      </div>
      <div>
        <p style="margin: 0;text-align: center;line-height: 40px;font-size: 24px;color: #ffffff">物联网卡管理系统</p>
      </div>
      <div class="usermsg">
        <el-button type="text" @click="editPassword = true"><span>修改密码</span><i class="iconfont">&#xe632;</i></el-button>
        <el-button type="text" @click="logout"><span>退出登录</span><i class="iconfont">&#xe778;</i></el-button>
      </div>
    </header>
    <el-dialog title="修改密码" size='tiny' :visible.sync="editPassword">
      <el-form :model="form">
        <el-form-item label="原密码" :label-width="formLabelWidth">
          <el-input type='password' v-model="form.oldpw" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input type='password' v-model="form.newpw" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPassword = false; form = { oldpw: '', newpw: '' }">关 闭</el-button>
        <el-button type="primary" @click="editPwd">确 定</el-button>
      </div>
    </el-dialog>
    <div class="container" >
      <div style="height: 100%;">
        <div class="left" :style="{'height':containerHeight+'px'}">
          <el-menu default-active="1-4-1" :router='true' class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :unique-opened="true" :collapse="isCollapse" theme='light'>
            <el-submenu index="1">
              <template slot="title">
                <i class="iconfont">&#xe623;</i>
                <span slot="title">物联网卡</span>
              </template>
              <el-menu-item index="/bms/fileUpLoad"><i class="iconfont">&#xe661;</i><span slot="title">上传</span></el-menu-item>
              <el-menu-item index="/bms/cardManage"><i class="iconfont">&#xe603;</i><span slot="title">管理</span></el-menu-item>
              <el-menu-item index="/bms/saleCard"><i class="iconfont">&#xe608;</i><span slot="title">销售</span></el-menu-item>
              <el-menu-item index="/bms"><i class="iconfont">&#xe689;</i><span slot="title">关联</span></el-menu-item>
            </el-submenu>
            <!-- <el-submenu index='2'>
              <template slot="title">
                <i class="iconfont">&#xe611;</i>
                <span slot="title">对账管理</span>
              </template>
              <el-menu-item index=""><i class="iconfont">&#xe680;</i><span slot="title">通用支付</span></el-menu-item>
              <el-menu-item index=""><i class="iconfont">&#xe601;</i><span slot="title">网卡支付</span></el-menu-item>
              <el-menu-item index=""><i class="iconfont">&#xe616;</i><span slot="title">维&emsp;&emsp;修</span></el-menu-item>
              <el-menu-item index=""><i class="iconfont">&#xe81a;</i><span slot="title">API接口</span></el-menu-item>
            </el-submenu> -->
            <el-menu-item index="/bms/userManage">
                <i class="iconfont">&#xe628;</i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <!-- <el-menu-item index="">
                <i class="iconfont">&#xe606;</i>
                <span slot="title">API接口管理</span>
            </el-menu-item> -->
          </el-menu>
        </div>
        <div class="right" :style="{'margin-left':isCollapse?'64px':'180px'}">
          <router-view></router-view>
        </div>
      </div>
      
    </div>
	</div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
// import router from './../../router/index.js'
export default {
  data () {
    return {
      isCollapse: false,
      loading: false,
      containerHeight: 0,
      privilege: {},
      // showSub_1: false,
      // showSub_2: false,
      route: '',
      editPassword: false,
      form: {
        oldpw: '',
        newpw: ''
      },
      formLabelWidth: '80px'
    }
  },
  created () {
    // let cookie = document.cookie.split(';')
    // for (let i = 0; i < cookie.length; i++) {
    //   if (cookie[i].indexOf('login') >= 0) {
    //     if (cookie[i].split('=')[1] === 'true') {
    //       // router.push('/')
    //     } else {
    //       router.push('login')
    //     }
    //   }
    // }
    this.loading = true
    let that = this
    this.route = this.$route.name
    this.$store.dispatch(types.SELF_MSG).then((res) => {
      that.loading = false
      that.privilege = res.data.privilege
    })
  },
  watch: {
    '$route': function () {
      this.route = this.$route.name
    },
    'editPassword': function () {
      this.form = {
        oldpw: '',
        newpw: ''
      }
    }
  },
  mounted: function () {
    let height = document.documentElement.clientHeight
    this.containerHeight = height - 40
    let that = this
    window.onresize = function temp () {
      if (!that.resizeAble) {
        that.resizeAble = true
        setTimeout(function () {
          that.containerHeight = document.documentElement.clientHeight - 40
          that.resizeAble = false
        }, 500)
      }
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    logout () {
      this.$confirm('是否退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        document.cookie = 'login=false'
        document.cookie = 'uType=' + ''
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '注销成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    test () {
      this.isCollapse = !this.isCollapse
    },
    editPwd () {
      if (this.form.oldpw.length === 0 || this.form.newpw.length === 0) {
        this.editPassword = false
        return
      }
      if (this.form.oldpw.length < 5) {
        return this.$message.warning('旧密码输入格式错误')
      }
      if (this.form.newpw.length < 5) {
        return this.$message.warning('新密码输入格式错误')
      }
      this.editPassword = false
      let that = this
      this.$store.dispatch(types.EDIT_PASSWORD, this.form).then(function (res) {
        if (res.errorcode === 0) {
          that.$message.success('密码修改成功')
        } else {
          that.$message.error('密码修改失败')
        }
      })
    }
  }
}
</script>

<style scoped>
html,body{
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.index{
	width: 100%;
	height: 100%;
	overflow: hidden;
}
header{
  width: 100%;
  height: 40px;
  background: #20A0FF;
}
.logo{
  position: absolute;
  width: 180px;
  height: 40px;
  text-align: center;
  overflow: hidden;
}
.usermsg{
  height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  line-height: 40px;
}
.usermsg button{
  color: #fff;
  padding: 8px 5px;
}
.container{
  width: 100%;
}
.left{
  position: absolute;
  width: 180px;
  height: 100%;
  overflow: hidden;
  background: #ffffff;
  transition: width .3s;
}
.right{
  margin-left: 180px;
  overflow: hidden;
  transition: width .3s;
}
.el-message-box{
  margin-top: -500px;
}
.logout{
  position: absolute;
  bottom: 0;
  width: 180px;
}
.logoutBtn{
  background: #20A0FF;
  width: 80px;
  height: 80px;
  border-radius: 80px;
  margin:0 auto;
  color:#fff;
  line-height: 40px;
  text-align: center;
}
.logoutBtn .el-button--text{
  color: #fff;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
}
.el-menu{
  height: 100%;
  border-right: 1px solid #ccc;
}
.el-submenu__icon-arrow{
  margin-top: 0;
}
.el-submenu,[class^=el-icon-]{
  vertical-align: middle;
}
.menu ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.menu-item{
  color: #666;
  text-decoration: none;
  display: block;
  height: 56px;
  line-height: 56px;
  padding-left: 20px;
  cursor: pointer;
}
.menu-item span{
  vertical-align: top;
}
.menu-item:hover{
  background-color:  #d1dbe5;
}
.sub-menu{
  height: 0;
  overflow: hidden;
  transition: height .3s;
}
.sub-menu li{
  height: 50px;
  line-height: 50px;
}
.submenu-item{
  color: #666;
  padding-left: 40px;
  text-decoration: none;
  display: block;
}
.submenu-item:hover{
  background-color:  #d1dbe5;
}
.active-menu{
  height: 200px;
}
.active-item{
  color: #20A0FF;
}
.collapse-menu-item{
  width: 40px;
  overflow: hidden;
}
.collapse-submenu-item{
  padding-left: 20px;
}
</style>
