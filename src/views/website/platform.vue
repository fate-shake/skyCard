<template>
	<div class="platform">
		<div class="platform-container">
			<div class="platform-header">
				<p style="font-size:18px;">定位平台</p>
				<p>
					为方便用户查看设备信息和对设备进行各类操作，我们提供了多个版本的定位平台；同时，为了方便使用港澳台客户和使用其他语言的外国客户舒适使用平台，我们对平台进行了多语言处理(当前支持简体中文、繁体中文、阿拉伯语、英语、法语、西班牙语等)。
				</p>
				<ul>
					<li><a href="//www.sky200.com" target="_blank">www.sky200.com</a></li>
					<li><a href="//www.keelin.com.cn"  target="_blank">www.keelin.com.cn</a></li>
					<li><a href="//www.saudigps.com" target="_blank">www.saudigps.com</a></li>
					<li><a href="//www.detektormonitoreo.com" target="_blank">www.detektormonitoreo.com</a></li>
					<li><a href="//www.rastreogpsmclglobal.com.mx" target="_blank">www.rastreogpsmclglobal.com.mx</a></li>
				</ul>
			</div>
			<div class="platform-body">
				<div class="platform-item">
					<p>简体中文版本<a href="http://www.keelin.com.cn/" target="_blank">http://www.keelin.com.cn/</a></p>
					<div class="item-img">
						<img width="1024" src="./../../assets/platform/pc_01.jpg">
						<img width="1024" src="./../../assets/platform/pc_02.jpg">
						<img width="1024" src="./../../assets/platform/pc_03.jpg">
					</div>
				</div>
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
      platform: 'PC',
      showTop: false
    }
  },
  created () {
    this.platform = this.$route.query.platform
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
    setPlatform (val) {
    },
    toTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style>
.platform{
	width: 1024px;
	margin: 0 auto;
}
.platform h3{
	margin-bottom: 0;
}
.platform a{
	color: #20A0FF;
}
.platform p{
	text-indent: 0;
}
.platform-body ul{
	list-style: none;
	margin: 0;
	padding:0;
	height: 40px;
	background-color: #ccc;
	line-height: 40px;
}
.platform-body li{
	float: left;
}
.platform-body li a{
	display: block;
	width: 256px;
	text-align: center;
	cursor: pointer;
}
.platform-body li a:hover{
	background-color: #13CE66;
  color: #ffffff;
}
.activeIndex{
	color: #ffffff;
	background-color: #13CE66;
}
.distribute{
	width: 1024px;
	z-index: -1;
	opacity: 1;
	text-align: center;
	overflow: hidden;
	transition:z-index 1s, opacity 1s;
  -moz-transition:z-index 1s, opacity 1s; /* Firefox 4 */
  -webkit-transition:z-index 1s, opacity 1s; /* Safari 和 Chrome */
  -o-transition:z-index 1s, opacity 1s; /* Opera */
}
.show{
	z-index: 1;
	opacity: 1;
}
.hide{
	height: 0;
	z-index: -1;
	opacity: 0;
}
.top{
  position: fixed;
  bottom: 50px;
  right: -50px;
  width: 50px;
  height: 50px;
  background: #ccc;
  line-height: 50px;
  text-align: center;
  opacity: .8;
  transition: opacity .5s;
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
