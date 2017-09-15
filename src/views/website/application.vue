<template>
  <div class="application">
  	<h3>移动平台支持</h3>
  	<div>
  		<ul class="table">
  			<li @click="activeItem = 'android'" class="item" :class="[activeItem === 'android'?'active-item':'']">安卓客户端</li>
  			<li @click="activeItem = 'ios'" class="item" :class="[activeItem === 'ios'?'active-item':'']">IOS客户端</li>
  		</ul>
  		<div v-if="activeItem === 'android'" style="text-align: center">
  			<p style="text-align: left;font-size: 18px;"><a href="http://www.keelin.com.cn/download/Keelin.apk">安卓客户端下载</a></p>
  			<a href="http://www.keelin.com.cn/download/Keelin.apk"><img width="400" style="vertical-align:top" src="./../../assets/platform/android_01.jpg"></a>
						<img width="400" src="./../../assets/platform/android_02.png">
						<img width="400" src="./../../assets/platform/android_03.png">
						<img width="400" src="./../../assets/platform/android_04.png">
						<img width="400" src="./../../assets/platform/android_05.png">
						<img width="400" src="./../../assets/platform/android_06.png">
  		</div>
  		<div v-else style="text-align: center">
  			<p style="text-align: left;font-size: 18px;"><a href="https://itunes.apple.com/cn/app/ke-yi-lian-guan-li-xi-tong/id798026651?mt=8" target="_blank">IOS客户端</a></p>
  			<a href="https://itunes.apple.com/cn/app/ke-yi-lian-guan-li-xi-tong/id798026651?mt=8" target="_blank"><img style="vertical-align: top" src="./../../assets/platform/ios_01.jpg"></a>
						<img src="./../../assets/platform/ios_02.jpeg">
						<img src="./../../assets/platform/ios_03.jpeg">
						<img src="./../../assets/platform/ios_04.jpeg">
						<img src="./../../assets/platform/ios_05.jpeg">
						<img src="./../../assets/platform/ios_06.jpeg">
  		</div>
  	</div>
  	<div class="top" :style="{'right':showTop?'0':'-50px'}">
      <a @click="toTop"><i class="iconfont">&#xe61b;</i></a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeItem: 'android',
      showTop: false
    }
  },
  mounted () {
    let that = this
    window.onscroll = function () {
      let supportPageOffset = window.pageXOffset !== undefined
      let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
      let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      if (y > 100) {
        that.showTop = true
      } else {
        that.showTop = false
      }
    }
  },
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.application{
	width: 1024px;
	margin: 0 auto;
}
.table{
	list-style: none;
	margin: 0;
	padding:0;
	height: 46px;
	border-bottom: 1px solid #20A0FF;
}
.item{
	float: left;
	font-size: 14px;
	padding: 10px 20px;
	cursor: pointer;
	border-bottom: 5px solid #ffffff;
}
.item:hover{
	border-color: #20A0FF;
}
p a{
	color: #ff4949;
}
.active-item{
	border-color:#20A0FF;
	color: #20A0FF;
}
.top{
  position: fixed;
  bottom: 50px;
  right: -50px;
  width: 50px;
  height: 50px;
  background: #444;
  line-height: 50px;
  text-align: center;
  opacity: .8;
  transition: all .5s;
}
.top:hover{
  opacity: 1;
}
.top a{
  display: block;
  color: #20A0FF;
  cursor: pointer;
}
.top a i{
  font-size: 32px;
}
</style>
