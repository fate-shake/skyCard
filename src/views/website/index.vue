<template>
  <div class="index">
    <div class="el-carousel" style="min-width: 1280px;">
      <el-carousel trigger="click" height="500px" color='#ffffff'>
          <el-carousel-item>
            <div class="carousel-item">
              <img  height='600px' width="1920" src="./../../assets/sim_copy/3.jpg">
              <div style="position: absolute;top: 100px;right: 150px;text-align: right">
                <h1>物联网卡</h1>
                <p>
                  物联卡基于物联网专网， 采用物联网专属号段 ，通过专用网元设备支持短信、<br>
                  无线数据通信、语音等基础通信服务，并提供通信状态管理和通信鉴权等智能通道服务，<br>
                  默认开通物联网专用的短信接入服务号和物联网通用APN。
                </p>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div  class="carousel-item">
              <img  height='600px' width="1920" src="./../../assets/sim_copy/1.jpg">
              <div style="position: absolute;top: 150px;left: 150px">
                <h1>智能穿戴</h1>
                <p>
                  智能穿戴是指应用穿戴式技术对日常穿戴进行智能化设计，开发出可以穿戴的设备，<br>
                  如眼镜、手套、手表、服饰和鞋等。智能穿戴设备，可以利用传感器、射频识别、<br>
                  全球定位系统等信息传感设备，接入移动互联网，实现人与物随时随地的信息交流。
                </p>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div  class="carousel-item">
              <img  height='600px' width="1920" src="./../../assets/sim_copy/2.jpg">
              <div style="position: absolute;top: 200px;left: 200px">
                <h1>车联网</h1>
                <p>
                  通过装载在车辆上的电子标签通过无线射频等识别技术，<br>
                  实现在信息网络平台上对所有车辆的属性信息和静、动态信息进行提取和有效利用，<br>
                  并根据不同的功能需求对所有车辆的运行状态进行有效的监管和提供综合服务的系统。
                </p>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div  class="carousel-item">
              <img height='600px' width="1920" src="./../../assets/sim_copy/3.jpg">
              <div style="position: absolute;top: 300px;right: 150px;text-align: right">
                <h1>智能家居</h1>
                <p>
                  以住宅为平台，利用综合布线技术、网络通信技术、 安全防范技术、自动控制技术、<br>
                  音视频技术将家居生活有关的设施集成，构建高效的住宅设施与家庭日程事务的管理系统，<br>
                  提升家居安全性、便利性、舒适性、艺术性，并实现环保节能的居住环境。
                </p>
              </div>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div  class="carousel-item">
              <img height='600px' width="1920" src="./../../assets/sim_copy/4.jpg">
              <div style="position: absolute;top: 100px;left: 100px">
                <h1>其他领域</h1>
                <p>
                  电力：电力抄表、电力设备监控等;<br>
                  金融：无线POS终端、税控发票打印机等;<br>
                  以及企业安防、医疗、农业、能源、气象、水文监测、油田、气象、环保等领域。
                </p>
              </div>
            </div>
          </el-carousel-item>
      </el-carousel>
      </div>
      <div class="intriduce">
        <div style="padding: 40px 0;height: 300px;">
          <ul class="cards">
            <!-- 平台、硬件、物联网卡、api接口 -->
            <li class="card">
              <div class="card-container">
                <div>
                  <div class="card-header">
                    <i class="card-icon iconfont">
                      &#xe61f;
                    </i>
                    <span>平台</span>
                  </div>
                  <div class="card-body">
                    <p>帮助客户管理设备，进行设备数据统计，让客户可以直观了解自己的状态</p>
                    <ul>
                      <li>PC端
                        <ol>
                          <li><router-link to="/platform">多车管理</router-link></li>
                          <li><router-link to="/comeSoon">经销管理</router-link></li>
                          <li><a href="http://www.sky200.net/backstage.html" target="_blank">物联卡管理</a></li>
                        </ol>
                      </li>
                      <li>移动端
                        <ol>
                          <li><router-link to="/application">可依恋Android</router-link></li>
                          <li><router-link to="/application">可依恋IOS</router-link></li>
                        </ol>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li class="card">
              <div class="card-container">
                <div>
                  <div class="card-header">
                    <i class="card-icon iconfont">
                      &#xe60e;
                    </i>
                    <span>硬件</span>
                  </div>
                  <div class="card-body">
                    <p>硬件系统由我们专业的工程师，自主研发设计；</p>
                    <p>独立的生产车间，专业的质量监测系统，严格把控产品质量；</p>
                    <p> 出口量过千万，品质值得信赖 </p>
                    <br>
                    <router-link to="/hardware">硬件产品展示</router-link>
                  </div>
                </div>
              </div>
            </li>
            <li class="card">
              <div class="card-container">
                <div>
                  <div class="card-header">
                    <i class="card-icon iconfont">
                    &#xe650;
                    </i>
                    <span>物联网卡</span>
                  </div>
                  <div class="card-body">
                    <p>专门为物联网用户而生的SIM卡，可用于各种智能物联行业；</p>
                    <p>我们拥有专门为物联网卡客户管理和查询客户所拥有的SIM卡的信息的网站；</p>
                    <br>
                    <p><router-link :to="{ path: '/recharge', query: { key: 'message' } }">查询入口</router-link></p>
                    <br>
                    <p><router-link :to="{ path: '/recharge', query: { key: 'recharge' } }">专业管理网站入口</router-link></p>
                  </div>
                </div>
              </div>
            </li>
            <li class="card">
              <div class="card-container">
                <div>
                  <div class="card-header">
                    <i class="card-icon iconfont">
                    &#xe81a;
                    </i>
                    <span>API接口</span>
                  </div>
                  <div class="card-body">
                    <p>获取实时数据、历史数据、发送实时指令，接收实时警报；获取各种数据统计结果；等等；</p>
                    <p>我们开放了丰富的数据接口，客户可按需调用，或者定制接口</p><br>
                    <p><router-link to="/comeSoon">通用接口</router-link></p><br>
                    <p><router-link to="/comeSoon">定制接口</router-link></p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p style="text-align: center;margin: 5px auto;font-size: 24px;">解决方案</p>
        <div class="solution">
          <div class="solution-ul">
            <ul>
              <li id="car_solution" style="background: url('/static/car_solution.jpg') no-repeat">
                <router-link class="solution-item" to="">
                  <div class="item">
                    <i class="iconfont">&#xe980;</i>
                    <h3>车队管理解决方案</h3>
                    <div class="item-detail">
                      <p>为企业管理企业车辆、特殊行业(如冷链运输)管理等制定合理的管理方案</p>
                      <el-button>查看详情</el-button>
                    </div>
                  </div>
                </router-link>
              </li>
              <li id="share_solution"  style="background: url('/static/share_solution.jpg') no-repeat">
                <router-link class="solution-item" to="">
                  <div class="item">
                    <i class="iconfont">&#xe7fa;</i>
                    <h3>共享经济解决方案</h3>
                    <div class="item-detail">
                      <p>顺应当下兴起的共享经济潮流，为企业制定共享经济模式制定解决方案</p>
                      <el-button>查看详情</el-button>
                    </div>
                  </div>
                </router-link>
              </li>
              <li id="autoSale_solution"  style="background: url('/static/autoSale_solution.jpg') no-repeat">
                <router-link class="solution-item" to="">
                  <div class="item">
                    <i class="iconfont">&#xe66e;</i>
                    <h3>投放式电器解决方案</h3>
                    <div class="item-detail">
                      <p>时下越来越多的自助式营销方式，解决投放设备的状态，制定管理方案</p>
                      <el-button>查看详情</el-button>
                    </div>
                  </div>
                </router-link>
              </li>
              <li id="more_solution" style="background: url('/static/car_solution.jpg') no-repeat">
                <router-link class="solution-item" to="">
                  <div class="item">
                    <i class="iconfont">&#xe627;</i>
                    <h3>更多</h3>
                    <div class="item-detail">
                      <el-button class="el-button">查看更多解决方案，戳我吧</el-button>
                    </div>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="products">
        <p style="text-align: center;margin: 5px auto;font-size: 24px;">部分产品</p>
        <div class="product">
          <ul>
            <li>
              <div class="product-item">
                <div class="product-item-img">
                  <div style="height: 180px;overflow: hidden">
                    <img width="200" height="180" src="./../../assets/products/k30.jpg" alt="K30">
                  </div>
                  <div style="background-color:#20A0FF;height: 100px;padding: 10px 5px">
                    <p>型号：K30</p>
                    <p>穿戴式定位器</p>
                    <p>特色：一键通话、紧急求救、定时开关机；等</p>
                  </div>
                </div>
                <div class="product-item-text">
                  <div style="padding: 10px;">
                    <p>型号：K30</p>
                    <p>产品定位：个人跟踪器</p>
                    <p>产品特点：机身小巧、定位准确、待机持久、双向通话、SOS报警；等</p>
                    <p>该产品能够设置工作模式，随时切换定位方式；能够设置自动开关机功能，夜间自动关机省电，待机更持久</p>
                    <!-- <el-button class="el-button">查看详情</el-button> -->
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="product-item">
                <div class="product-item-img">
                  <div style="height: 180px;overflow: hidden">
                    <img width="200" height="180" src="./../../assets/products/gpt18.jpg" alt="GPT18">
                  </div>
                  <div style="background-color:#20A0FF;height: 100px;padding: 10px 5px">
                    <p>型号：GPT18</p>
                    <p>穿戴式儿童定位器</p>
                    <p>特色：四重定位方式、高清双向通话、紧急求救、低辐射、材质优良；等</p>
                  </div>
                </div>
                <div class="product-item-text">
                  <div style="padding: 10px;">
                    <p>型号：GPT18</p>
                    <p>产品定位：儿童定位监护手表</p>
                    <p>产品特点：四重定位方式，保证定位的精准性；高清双向通话功能；长按3秒自动拨号监护人号码(可设置3个，呼叫时按设置顺序拨号)、低辐射、材质优良；等</p>
                    <!-- <el-button class="el-button">查看详情</el-button> -->
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="product-item">
                <div class="product-item-img">
                  <div style="height: 180px;overflow: hidden">
                    <img width="200" height="180" src="./../../assets/products/k20.jpg" alt="K20">
                  </div>
                  <div style="background-color:#20A0FF;height: 100px;padding: 10px 5px">
                    <p>型号：K20</p>
                    <p>老人定位手机</p>
                    <p>特色：超长待机、定位准确、一键报警求救；等</p>
                  </div>
                </div>
                <div class="product-item-text">
                  <div style="padding: 10px;">
                    <p>型号：K20</p>
                    <p>产品定位：老人定位手机</p>
                    <p>产品特点：1700mAh大容量电池，一周待机时长；智能定位模式；低电警报，保障设备及时续电工作；一键SOSO报警求救；大字体、大按键、大声音，操作简单；等</p>
                    <!-- <el-button class="el-button">查看详情</el-button> -->
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="product-item">
                <div class="product-item-img">
                  <div style="height: 180px;overflow: hidden">
                    <img width="200" height="180" src="./../../assets/products/tk116.jpg" alt="tk116">
                  </div>
                  <div style="background-color:#20A0FF;height: 100px;padding: 10px 5px">
                    <p>型号：TK116</p>
                    <p>车载定位器</p>
                    <p>特色：全球定位、宽电压6-36VDC、远程熄火断油、数据断点传输电；等</p>
                  </div>
                </div>
                <div class="product-item-text">
                  <div style="padding: 10px;">
                    <p>型号：TK116</p>
                    <p>产品定位：车载定位器</p>
                    <p>产品特点：卫星基站双重定位，全球区域无限制、90天内轨迹回放、宽电压6-36VDC适用于私家车及大部分电动车、配合继电器实现远程断油电、震动报警、位移报警；等</p>
                    <!-- <el-button class="el-button">查看详情</el-button> -->
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="product-item">
                <div class="product-item-img">
                  <div style="height: 180px;overflow: hidden">
                    <img width="200" height="180" src="./../../assets/products/got10.jpg" alt="GOT10">
                  </div>
                  <div style="background-color:#20A0FF;height: 100px;padding: 10px 5px">
                    <p>型号：GOT10</p>
                    <p>微型车载定位器</p>
                    <p>特色：OBD数据分析、多种车辆报警、即插即用；等</p>
                  </div>
                </div>
                <div class="product-item-text">
                  <div style="padding: 10px;">
                    <p>型号：GOT10</p>
                    <p>产品定位：个人跟踪器</p>
                    <p>产品特点：安装方便、查看车辆行驶状态(车速、转速、发动机负荷、水温等)、支持多种车辆报警、OBD系统车辆诊断等</p>
                    <!-- <el-button class="el-button">查看详情</el-button> -->
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="product-item">
                <div class="product-item-img">
                  <div style="height: 180px;overflow: hidden">
                    <p style="color: #666;text-align: center;margin-top: 100px;font-size: 24px;color: #ff4949;">更多产品</p>
                  </div>
                  <div style="background-color:#20A0FF;height: 100px;padding: 10px 5px">
                    
                  </div>
                </div>
                <div class="product-item-text">
                  <div style="padding: 10px;text-align: center;">
                    <router-link to="/hardware" style="margin: 120px auto;" class="el-button">产品列表</router-link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="ages">
        <div class="">
          <img class="transtionImg" id="img_01" width="1280" height="500" src="./../../assets/bg1.gif">
        </div>
      </div>
      <div class="ages">
        <img class="transtionImg" id="img_02" width="1280" height="500" src="./../../assets/bg2.gif">
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
      selectIndex: '1',
      activedCard: 3,
      showTop: false,
      showImg1: 1,
      showImg2: 1
    }
  },
  mounted () {
    let that = this
    window.onscroll = function () {
      let supportPageOffset = window.pageXOffset !== undefined
      let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')
      let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      if (that.showImg1) {
        let h = document.documentElement.clientHeight
        let top = document.querySelector('#img_01').getBoundingClientRect().top
        if (h - top > 50) {
          document.querySelector('#img_01').style.opacity = 1
          that.showImg1 = 0
        }
      }
      if (that.showImg2) {
        let h = document.documentElement.clientHeight
        let top = document.querySelector('#img_02').getBoundingClientRect().top
        if (h - top > 50) {
          document.querySelector('#img_02').style.opacity = 1
          that.showImg2 = 0
        }
      }
      if (y > 100) {
        that.showTop = true
      } else {
        that.showTop = false
      }
    }
  },
  methods: {
    selectMenu (index) {
      this.selectIndex = index
    },
    toTop () {
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
*{
  transition: all .5s ease-in-out;
}
p{
  text-indent: 0;
}
.carousel-item{
  color: #ffffff;
}
.router-link{
  color: #20A0FF;
  text-decoration: none;
}
.el-menu li:hover{
  background: #ffffff;
}
.body .el-menu-item, .el-submenu__title{
  height: 40px;
  line-height: 40px;
}
.intriduce{
  width: 1280px;
  margin: 0 auto;
  overflow: hidden;
}
.intriduce a{
  color: #20A0FF;
  text-decoration: none;
}
.intriduce a:hover{
  color: #ff4949;
}
.cards{
  margin: 0;
  padding: 0;
  list-style: none;
}
.card{
  display: inline-block;
  float: left;
  width: 298px;
  height: 300px;
  margin: 0 10px;
  vertical-align: middle;
  background: #ffffff;
  border: 1px solid #eee;
/*  margin-top: 50px;*/
  transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s;
  -moz-transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s; /* Firefox 4 */
  -webkit-transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s; /* Safari 和 Chrome */
  -o-transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s; /* Opera */
}
.card-container{
  height: 280px;
  padding: 10px;
}
.activedCard{
  height: 500px;
  width: 300px;
  margin-top: -50px;
  border:1px solid #13CE66;
}
.card-header{
  background: #ffffff;
  text-align: center;
  transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s;
  -moz-transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s; /* Firefox 4 */
  -webkit-transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s; /* Safari 和 Chrome */
  -o-transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1), z-index 0s 0.12s; /* Opera */
}
.card-header span{
  padding: 0 15px;
  font-size: 18px;
}
.activedHeader{
  color: #ffffff;
  height: 120px;
  line-height: 120px;
  background: #13CE66;
}
.card-icon{
  height: 50px;
  width:64px;
  font-size: 50px;
  color: #20A0FF;
  display: inline-block;
}
h3{
  margin: 0;
  padding: 0;
}
.card-body{
  padding: 10px 20px;
}
.card-body ul{
  margin: 0;
  padding: 0;
  list-style: none;
}
.card-body p{
  margin: 0;
}
.solution{
  height: 400px;
  background-color: #eee;
}
.solution .el-button{
    color: #20A0FF;
    border-color: #20A0FF;
    text-decoration: none;
    background-color: rgba(255, 255, 255, 0);
}
.solution .el-button:hover{
  border-color: #13ce66;
  color: #13CE66;
}
.solution-ul{
  width: 1280px;
  margin: 0 auto;
}
.solution-ul ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.solution-ul li{
  float: left;
  width: 25%;
}
#car_solution{
/*  background-image: url('./../../assets/car_solution.jpg');
  background-repeat: no-repeat;*/
  background-size: 320px 400px;
}
#share_solution{
/*  background-image: url('./../../assets/share_solution.jpg');
  background-repeat: no-repeat;*/
  background-size: 320px 400px;
}
#autoSale_solution{
/*  background-image: url('./../../assets/autoSale_solution.jpg');
  background-repeat: no-repeat;*/
  background-size: 320px 400px;
}
#more_solution{
/*  background-image: url('./../../assets/car_solution.jpg');
  background-repeat: no-repeat;*/
  background-size: 320px 400px;
}
.solution-item{
  display: block;
  border-left:1px solid #eee;
  height: 400px;
  color: #ffffff;
  text-decoration: none;
  overflow: hidden;
}
.item{
  position: relative;
  top: 100px;
  text-align: center;
  transition: all .5s;
  font-size: 18px;
}
.item .iconfont{
  font-size: 80px;
  color: #20A0FF;
}
.item-detail{
  padding: 80px 50px 0 50px;
  opacity: 0;
  transition: all 1s;
  transition-timing-function: ease-in-out;
}
.item-detail p{
  font-size: 14px;
}
.solution-item:hover{
  background-color: rgba(0, 0, 0, 0.8);
}
.solution-item:hover .item{
  top: 50px;
}
.solution-item:hover .item-detail{
  padding: 10px 50px 0 50px;
  opacity: 1;
}
.ages{
  height: 500px;
  padding: 10px 0; 
  width: 100%;
  min-width: 1280px;
  margin: 0 auto;
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
.transtionImg{
  display:block;
  margin: 0 auto;
  opacity: 0;
  transition: all 3s;
  -moz-transition:all 3s; /* Firefox 4 */
  -webkit-transition:all 3s; /* Safari 和 Chrome */
  -o-transition:all 3s; /* Opera */
}
.index .products{
  height: 400px;
  width: 1280px;
  margin: 0 auto;
  padding-top: 20px;
}
.product{
  background-color: #ccc;
}
.product ul{
  list-style: none;
  margin: 0;
  padding: 0;
}
.product li{
  float: left;
  height: 300px;
  width: 200px;
  padding: 5px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d; 
}
.product-item{
  height: 100%;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d; 
  perspective:800px;
  cursor: pointer;
  /*color: #ffffff;*/
}
.product-item .el-button{
  border-color: #20A0FF;
  color: #20A0FF;
  margin: 20px 40px;
}
.product-item .el-button:hover{
  border-color: #13CE66;
  color: #13CE66;
}
.product-item p{
  margin: 0;
}
.product-item-img,.product-item-text{
  position: absolute;
  text-align: left;
  width: 200px;
  height: 300px;
  backface-visibility:hidden;
  perspective-origin: 25% 75%;
}
.product-item-text{
  transform: rotate3d(0,1,0,180deg);
  background: #ffffff;
  border:1px solid #ccc;
  /*box-shadow: 0 0 5px 0 #20A0FF;*/
}
.product-item-img{
  color: #ffffff;
  transform: rotate3d(0,1,0,0deg);
  border:1px solid #ccc;
  /*box-shadow: 0 0 5px 0 #20A0FF;*/
}
.product-item:hover .product-item-text{
  transform: rotate3d(0,1,0,0deg);
}
.product-item:hover .product-item-img{
  transform: rotate3d(0,-1,0,180deg);
}
</style>
