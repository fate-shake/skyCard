<template>
	<div class="about">
		<p style="font-size: 18px;font-weight: 400;text-indent: 0">关于我们</p>
		<hr>
		<div style="text-align: center">
			<img width="1024" src="./../../assets/about_01.jpg">
			
		</div>
		<div>
			<div style="float: left">
				<img width="500" src="./../../assets/about_02.jpg">
				<img width="500" src="./../../assets/about_03.jpg">
			</div>
		</div>
		<p>
		2004年7月，深圳市移联通信技术有限责任公司公司成立，致力于为客户提供手机设计方案。
 		</p>
 		<p>
 			2005年7月，在SkyWorks平台上，凭着手机多年的开发经验，经过研发与测试人员几个月的努力，开发出拥有完全自主知识产权的软件与硬件的第一款手机方案S661，通过信息产业部的CTA入网认证，并为某客户采用且实现量产。
 		</p>
 		<p>
 			2006年，移联通信在SkyWorks平台上开发出了大量技术领先的优秀产品方案，出货量也稳步提升，如音乐手机S300（出货200K），MP3/MP4手机方案S302，摄像手机方案S332（出货300K），以上机型均通过信息产业部CTA入网认证，以音质优美、品质高获得客户认可和青睐。
 		</p>
		<p>
			2006年12月，获得MTK授权，仅一个月在MTK平台上，开发出国内市场上技术领先的MP3，MP4，摄像等功能超薄手机方案M3000，通过信息产业部的CTA入网认证，并实现批量生产。
		</p>
		<p>
			2007年4月，在MTK平台上，开发出国内市场上技术领先的MP3，MP4，摄像，蓝牙等功能超长待机手机方案M3168，通过信息产业部的CTA入网认证，并实现大批量生产，远销欧洲。
		</p>
		<p>
			2008年，公司转型至GPS TRACKER ，由于技术积淀深厚，迅速攻关技术难点，在该领域成为专家，产品的性能和稳定性已经超出用户需求，公司的TRACKER以后均采用MTK方案。
		</p>
 		<p>
 			2009年-2011年，移联通信开发出了大量车载/个人定位产品，如TK110、TK112、TK115、TK116、K9稳步占领市场份额，年产百万台，远销北美、欧洲、东南亚。
 		</p>
		<p>
			2012年10月，给北美客户订制的车载定位产品通过PTCRB、FCC认证，展示了雄厚的技术实力并得到了客户的肯定和百万的订单。
		</p>
		<p>
			2013年9月，推出 OBD 诊断定位器GOT10和OBD接口定位器GOT08，进一步拓展产品线。
		</p>
		<p>
			2013年7月，推出自有品牌“可依恋”，旨在做让客户可依恋、可信赖的产品。
		</p>
		<p>
			2014年1月，移联通信同步推出 GPS定位服务平台 WEB端、安卓、苹果手机客户端，给客户提供服务、创造价值。
		</p>
		<div class="top" :style="{'right':showTop?'0':'-50px'}">
	      <a @click="toTop"><i class="iconfont">&#xe61b;</i></a>
	    </div>
	</div>
</template>

<script>
export default {
  data () {
    return {
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
.about{
	width:1024px;
	margin: 0 auto;
 }
 p{
 	text-indent: 2em;
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
