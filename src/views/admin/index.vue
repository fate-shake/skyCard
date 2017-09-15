<template>
	<div style="height:100%;">
		<div class="left" :class="[night?'night':'']" :style="{'width':isCollapse?'60px':'180px'}">
      <div class="logo">
        <a style="display: block;padding: 25px 20px;"></a>
      </div>
      <div class="collapse">
        <a @click="isCollapse = !isCollapse">
          <i v-if="isCollapse" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
        </a>
      </div>
      <el-menu default-active="1" :router='true' :class="[night?'night':'']" class="el-menu-vertical-demo"  @select="handleClick" @open="handleOpen" @close="handleClose" theme="{night?'dark':'light'}">
        <el-menu-item title="信息总览" index="/admin">
          <i class="iconfont">&#xe614;</i>
          信息总览
        </el-menu-item>
        <!-- <el-menu-item v-if="dealer" title="子账号" index="/admin/adminSubAccount">
          <i class="iconfont">&#xe70b;</i>
          子账号
        </el-menu-item> -->
        <el-menu-item title="单卡充值" index="/admin/searchAndCharge">
          <i class="iconfont">&#xe69c;</i>
          查询&充值
        </el-menu-item>
        <el-menu-item title="卡管理" index="/admin/adminCardManage">
          <i class="iconfont">&#xe68e;</i>
          卡管理
        </el-menu-item>
        <!-- <el-menu-item title="账号关联" index="/admin/connection">
          <i class="iconfont">&#xe690;</i>
          账号关联
        </el-menu-item>
        <el-menu-item title="充值记录" index="/admin/record">
          <i class="iconfont">&#xe618;</i>
          充值记录
        </el-menu-item> -->
      </el-menu>
    </div>
    <div class="right" :style="{'margin-left':isCollapse?'60px':'180px'}">
      <div class="container">
        <div class="header" :class="[night?'night':'']">
          <div class="switch"><i class="el-icon-menu"></i></div>
          <div class="intriduce">
            <p style="display:block;margin: 0;line-height: 50px;">当前：<span style="font-size: 24px;">{{currentIndex}}</span></p>
          </div>
          <div class="account">
            <!-- <div class="colorStyle">
              <el-switch
                v-model="night"
                on-text="白天"
                off-text="黑夜"
                on-color="#20A0FF"
                off-color="#324057">
              </el-switch>
            </div> -->
            <div class="fullScreen-wrapper">
              <div class="fullScreen" @click="fullScreen">
               <img v-if='fullscreen' title="退出全屏" src="./../../assets/image/scale_down.png">
               <img v-else='fullscreen' title="进入全屏" src="./../../assets/image/scale_up.png">
              </div>
            </div>
            <el-dropdown>
                <div class="user">
                  <img width="50" height="50" src="./../../assets/image/user.png">
                </div>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><a style="display: block;" @click='editPassword = true'>修改密码</a></el-dropdown-item>
                  <el-dropdown-item><a style="display: block;" @click='logout'>退出登录</a></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
          </div>
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
                <el-button @click="editPassword = false">关 闭</el-button>
                <el-button type="primary" @click="editPwd">确 定</el-button>
              </div>
            </el-dialog>
        </div>
        <div class="body">
          <router-view></router-view>
        </div>
      </div>
    </div>
	</div>
    
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      fullscreen: false,
      currentIndex: this.state,
      editPassword: false,
      night: false,
      dealer: true,
      isCollapse: false,
      form: {
        oldpw: '',
        newpw: ''
      },
      formLabelWidth: '80px'
    }
  },
  created () {
    document.title = '物联网卡管理平台'
  },
  watch: {
    '$route' (to, from) {
      this.currentIndex = to.name
    },
    'editPassword' () {
      this.form = {
        oldpw: '',
        newpw: ''
      }
    }
  },
  mounted () {
    this.currentIndex = this.$root._route.name
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    handleClick (key, keyPath) {
    },
    toFullScreen () {
      let docElm = document.documentElement
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen()
      } else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen()
      } else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen()
      } else if (docElm.msRequestFullscreen) {
        docElm.msRequestFullscreen()
      }
      this.fullscreen = true
    },
    exitFullScreen () {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
      this.fullscreen = false
    },
    fullScreen () {
      if (this.fullscreen) {
        this.exitFullScreen()
      } else {
        this.toFullScreen()
      }
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
      })
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

<style>
.el-menu-item .iconfont{
  font-size: 26px;
  padding-right: 20px;
}
.left{
  position: absolute;
  width: 180px;
  height: 100%;
  overflow: hidden;
  transition: all .2s;
}
.collapse{
  text-align: center;
  background: #eee;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ffffff;
}
.collapse a{
  display: block;
  cursor: pointer;
}
.right{
  height: 100%;
  margin-left: 180px;
  border-left: 1px solid #ccc;
  transition: all .2s;
}
.container{
  height: 100%;
  width: 100%;
}
.header{
  height: 50px;
  top: 0;
  border-bottom: 1px solid #ccc;
  background-color: #20A0FF;
  color: #ffffff;
  overflow: hidden;
}
.header .el-dropdown{
  height: 50px;
}
.fullScreen-wrapper{
  position: absolute;
  width: 50px;
  height: 50px;
  margin-left: 100px;
  border-radius: 50px;
  background: #ffffff;
}
.fullScreen{
  padding: 9px;
  cursor: pointer;
}
.colorStyle{
  width: 100px;
  position: absolute;
}
.switch{
  display: inline-block;
  line-height: 50px;
  padding: 0 20px;
  float: left;
}
.intriduce{
  display: inline-block;
  max-width: 200px;
  height:50px;
}
.account{
  display: inline-block;
  float: right;
  text-align: right;
  height: 50px;
  line-height: 50px;
  width: 200px;
}
.account .el-dropdown{
  position: absolute;
  display: block;
  margin-left: 150px;
}
.user{
  display: inline-block;
  border-radius: 50px;
  cursor: pointer;
  height: 50px;
  overflow: hidden;
}
.body{
}

.logo{
  background-color: #20A0FF;
}
.night{
  background: #324057;
  color:#bfcbd9;
}

.el-menu-item{
  height: 50px;
  line-height: 50px;
}

.night .el-menu-item{
  color:#bfcbd9;
}
.night .el-menu-item:hover{
  background:#48576a;
}
/*.el-menu-item.is-active{
  background: #324057;
}*/
.night .el-menu-item.is-active{
  color: #20a0ff;
}
.el-message-box{
  margin-top: -500px;
}

</style>
