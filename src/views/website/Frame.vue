<template>
  <div class="home">
    <div class="nav">
      <div class="nav-wrapper">
        <div class="nav-logo">
          <!-- <img src="../assets/simlogo.png"> -->
          <img />
        </div>
        <div class="nav-login">
          <router-link class='el-button' to="/Login">登录</router-link>
        </div>
        <div class="menu-wrap">
          <div class="menu">
            <ul class="first-menu">
              <li class="first-li"><router-link to="/">首页</router-link></li>
              <li @mouseenter="achievement = true" @mouseover="achievement = true" @mouseleave="achievement = false" class="first-li" :class="[achievement?'active':'hidden']"><router-link to="">成果展示</router-link>
                <ul @mouseenter="achievement = true" @mouseleave="achievement = false"  @click="achievement = false" class="second-menu">
                  <li class="second-li"><router-link to="/platform">定位平台</router-link></li>
                  <li class="second-li"><router-link to="/application">APP</router-link></li>
                  <li class="second-li"><router-link to="/hardware">硬件产品</router-link></li>
                  <li class="second-li"><router-link to="comeSoon">生产监控系统</router-link></li>
                </ul>
              </li>
              <li @mouseenter="iotCard = true" @mouseover="iotCard = true" @mouseleave="iotCard = false" class="first-li" :class="[iotCard?'active':'hidden']"><router-link to="">物联网卡</router-link>
                <ul @mouseenter="iotCard = true" @mouseleave="iotCard = false" @click="iotCard = false" class="second-menu">
                  <li class="second-li"><router-link :to="{ path: 'charge', query: { key: 'message' } }">查询信息</router-link></li>
                  <li class="second-li"><router-link :to="{ path: 'charge', query: { key: 'recharge' } }">网卡充值</router-link></li>
                </ul>
              </li>
              <li @mouseenter="business = true" @mouseover="business = true" @mouseleave="business = false" class="first-li" :class="[business?'active':'hidden']"><router-link to="">商务合作</router-link>
                <ul @mouseenter="business = true" @mouseleave="business = false" @click="business = false" class="second-menu">
                  <li class="second-li"><router-link to="/hardwareCustomization">产品定制</router-link></li>
                  <li class="second-li"><router-link to="/softwareCustomization">平台定制</router-link></li>
                  <li class="second-li"><router-link to="/appCustomization">APP定制</router-link></li>
                  <li class="second-li"><router-link to="/comeSoon">物联网卡</router-link></li>
                  <li class="second-li"><router-link to="/comeSoon">解决方案</router-link></li>
                  <li class="second-li"><router-link to="/comeSoon">硬件OEM、ODM</router-link></li>
                  <li class="second-li"><router-link to="/comeSoon">生产流程监控</router-link></li>
                </ul>
              </li>
              <li @mouseenter="interface = true" @mouseover="interface = true"  @mouseleave="interface = false" class="first-li" :class="[interface?'active':'hidden']"><router-link to="">API接口</router-link>
                <ul @mouseenter="interface = true" @mouseleave="interface = false" @click="interface = false" class="second-menu">
                  <li class="second-li"><router-link to="/comeSoon">通用接口</router-link></li>
                  <li class="second-li"><router-link to="/comeSoon">定制接口</router-link></li>
                </ul>
              </li>
              <li class="first-li"><router-link to="/about">关于我们</router-link></li>
              <li class="first-li"><router-link to="/comeSoon">常见问题</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div style="width: 1024px;height: 100%;margin: 0 auto;">
        <div style="height:130px;padding-top: 20px;">      
          <div class="columns" style="width: 40%;text-align: right">
            <p>关注我们</p>
            <img @mouseenter="showWechat = true" @mouseleave="showWechat = false" src="./../../assets/platform/weixin_01.jpg" style="cursor: pointer" width="40" height="40">
            <div style="position: relative;width: 0;height: 0;top: -204px;left: 150px;display: none;" :style="{'display':showWechat?'block':'none'}"><img class="" src="./../../assets/platform/weixin_01.jpg" width="200" ></div>
            <!--  -->
          </div>
          <div class="columns" style="width: 40%;padding-left: 50px;text-align: left">
            <p>联系我们</p>
            <ul>
              <li>固话：<span>0755-86258387</span></li>
              <li>邮箱：huanze@eelink.com.cn</li>
              <li>地址：深圳市南山区科技园北区朗山2号路宇阳大厦3楼南座</li>
            </ul>
          </div>
        </div>
        <div style="">
          <p style="font-size:12px;text-align: center">Copyright © 2004-2017 深圳市移联通信技术有限责任公司 版权所有</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import router from '../router/index.js'
export default {
  data () {
    return {
      achievement: false,
      iotCard: false,
      business: false,
      interface: false,
      showWechat: false
    }
  },
  created () {
    document.title = '主页'
  },
  methods: {
    showChild () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/**{
  transition: all .5s;
  transition-timing-function: ease-in-out;
}*/
.home{
  width: 100%;
  min-width: 1280px;
}
.nav{
  position: fixed;
  width: 100%;
  margin: 0 auto;
  height:60px;
  z-index: 999;
  background: #fff;
  border-bottom: 1px solid #ccc;
}
.nav-wrapper{
  width: 1280px;
  margin: 0 auto;
}
.nav-logo{
  display: inline-block;
  padding: 8px 10px;
  vertical-align: top;
}
/*.nav-menu{
  display: inline-block;
  float: right;
}*/
.menu-wrap{
  display: inline-block;
  float: right;
}
.menu ul{
  margin: 0;
  padding:0;
  list-style: none;
}
.first-li{
  float: left;
  height: 60px;
  overflow: hidden;
  transition: all .5s;
}
.first-li>a{
  display: block;
  font-size: 16px;
  padding:18px 15px;
  text-decoration: none;
  color: #666;
  overflow: hidden;
}
.first-li>a:hover{
  background-color: #20A0FF;
  color: #ffffff;
  height: auto;
}
/*.first-li>a:hover + .second-menu{
  height: auto;
}
.first-li>a:hover + .second-menu > li{
  height: 40px;
}*/
.second-menu{
  top: 60px;
  position: absolute;
  overflow: hidden;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.second-menu:hover{
  height: auto;
}
.second-li{
  background-color: #ffffff;
  overflow: hidden;
  height: 40px;
  border-top: 1px solid #ccc;
}
.active ul{
  height: auto;
  display: block;
}
.hidden ul{
  height: 0;
  display: none;
}
.second-li a{
  display: block;
  font-size: 14px;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  color: #666;
}
.second-li a:hover{
  background-color: #20A0FF;
  color: #ffffff;
}
.nav-login{
  display:inline-block;
  float: right;
  padding:12px 15px;
}
.el-menu{
  background-color: #ffffff;
}
.el-button{
  color: #20A0FF;
  border-color: #20A0FF;
  text-decoration: none;
}
.el-button:hover{
  color:#FF4949;
  border-color: #FF4949;
}
.body{
  width: 100%;
  margin: 0 auto;
  padding-top: 60px;
}
.footer{
  border-top: 1px solid #ccc;
  background: #666;
  color: #ffffff;
}
.columns{
  display: block;
  width: 30%;
  height: 100%;
  float: left;
  text-align: center;
}
.columns ul{
  list-style: none;
  margin:0;
  padding: 0;
  font-size: 12px;
}
.columns li{
   padding: 6px 5px;
}
.columns li a{
  text-decoration: none;
  color: #ffffff;
}
.columns li a:hover{
  color: #20A0FF;
}
</style>
