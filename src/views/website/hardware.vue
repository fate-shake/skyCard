<template>
  <div class="hardware">
  	<p class="breadcrumb ">产品中心>>
  		<a @click="item ='';currentDev =''">所有产品</a>
 		<span v-if="item !== ''">
 			>>
 			<a @click="currentDev = ''">{{item}}</a>
 		</span>
 		<span v-if="currentDev !== ''">
 			>>
  			<a>{{ currentDev }}</a>
 		</span>
  	</p>
  	<div class="products">
  		<div class="product-menu">
  			<ul style="border-left: 1px solid #ccc;border-bottom: 1px solid #ccc;">
  				<li v-for="(value,key,index) in products" class="item">	
  					<a class="item-a" @click="item = key;currentDev = ''">{{key}}</a>
  					<ul  :style="{'height': item===key?(value.length*40+'px'):'0'}">
  						<li v-for="items in value" class="item-li"><a @click="currentDev = items.name;currentProduct = items">{{ items.name }}</a></li>
  					</ul>
  				</li>
  			</ul>
  		</div>
  		<div class="product-list">
  			<div v-if="currentDev ===''" class="list">
  				<div  v-if="current_products.length > 0" style="height: 540px">
  					<div  v-for="item in current_products" class="list-item">
	  					<a @click="currentDev = item.name;currentProduct = item" class="product-a">
	  						<div class="img-wrap"><img width="228" height="209" :src="item.image"></div>
	  						<p>{{ item.name }}</p>
	  					</a>
	  				</div>
	  			</div>
          <div v-else>
            <div style="width: 1024px;margin: 0 auto;text-align: center">
              <p>程序员哥哥正在努力加班完成，敬请期待！</p>
              <img src="./../../assets/welcome.jpg">
            </div>
          </div>
	  			<div class="pagination">
	  				<el-button v-if="currentPage !== 1" @click="prev" type="text">上一页</el-button>
	  				<el-button v-if="currentPage !== totalPage && totalPage !== 0" @click="next" type="text" style="float: right">下一页</el-button>
	  			</div>
  			</div>
  			<div v-else class="detail">
  				<div class="detail-header">
  					<div class="detail-img">
  						<img width="250" :src="currentProduct.image">
  					</div>
  					<div class="detail-text">
  						<h1 style="margin: 0">{{ currentProduct.name }}</h1>
							<h3>产品定位：{{ currentProduct.position }}</h3>
							<strong>{{ currentProduct.info }}</strong>
  					</div>
  				</div>
  				<div class="detail-body">
  					<p style="font-size: 18px;border-bottom: 1px solid #ccc;">产品详情</p>
  					<div style="text-align: center">
  						<img v-for="int in currentProduct.intriduce" :src="int">
  					</div>
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
import Products from './../../products.js'
export default {
  data () {
    return {
      showTop: false,
      item: '',
      currentDev: '',
      products: {},
      total_products: [],
      current_products: [],
      type_products: [],
      currentProduct: {},
      currentPage: 1,
      totalPage: 1
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
  created () {
    this.products = Products
    let _temp = []
    for (let key in Products) {
      _temp = _temp.concat(Products[key])
    }
    this.total_products = _temp
    this.type_products = _temp
    this.totalPage = Math.ceil(this.type_products.length / 8)
    this.current_products = _temp.slice(0, 8)
  },
  watch: {
    'item': function () {
      if (this.item !== '') {
        this.type_products = Products[this.item]
        this.current_products = Products[this.item].slice(0, 8)
      } else {
        this.type_products = this.total_products
        this.current_products = this.total_products.slice(0, 8)
      }
      this.totalPage = Math.ceil(this.type_products.length / 8)
    },
    'currentDev': function () {
    }
  },
  methods: {
    toTop () {
      window.scrollTo(0, 0)
    },
    prev () {
      // let pages = Math.ceil(this.total_products.length / 8)
      if (this.currentPage > 1) {
        this.current_products = this.type_products.slice((this.currentPage - 2) * 8, (this.currentPage - 1) * 8)
        this.currentPage -= 1
      }
    },
    next () {
      let pages = Math.ceil(this.type_products.length / 8)
      if (this.currentPage < pages) {
        this.current_products = this.type_products.slice(this.currentPage * 8, (this.currentPage + 1) * 8)
        this.currentPage = this.currentPage + 1
      }
    }
  }
}
</script>

<style scoped>
ul{
	margin: 0;
	padding: 0;
	list-style: none;
}
.hardware{
	width: 1280px;
	margin: 0 auto;
}
.breadcrumb{
  padding-left: 50px;
  font-size: 18px;
  margin: 0;
  padding-top: 20px;
  text-indent: 0;
}
.breadcrumb a{
	color: #20A0FF;
	cursor: pointer;
}
.breadcrumb a:hover{
	color: #ff4949;
}
.product-menu{
	width: 150px;
	padding-left: 50px;
	position: absolute;
}
.product-list{
	width: 1000px;
	padding-left: 50px;
	margin-left: 200px;
	min-height: 600px;
	border-left: 1px solid #ccc;
}
.item{
	overflow: hidden;
	text-align: center;
	margin-bottom: 5px;
	cursor: pointer;
}
.item ul{
	transition: all .3s ease-in-out;
}
.item-a{
	display: block;
	height:40px;
	width: 150px;
	line-height: 40px;
	color: #ffffff;
	background-color: #666;
} 
.item-li{
	height: 40px;
	text-align: center;
	line-height: 40px;
	border-bottom: 1px solid #ccc;
}
.item-li:hover{
	background-color: #fff;
}
.item-li a:hover{
	text-decoration: underline;
	color: #20A0FF;
	cursor: pointer;
}
.list-item{
	display: inline-block;
	margin: 5px 8px;
	border: 1px solid #ffffff;
	cursor: pointer;
}
.list-item:hover{
	border-color: #20A0FF;
	background: #20A0FF;
	color: #20A0FF;
}
.list-item:hover + .product-a>p{
	background: #20A0FF;
}
.product-a{
	display: block;
	text-align: center;
	width: 230px;
	height: 250px;
}
.product-a p{
	line-height: 40px;
	margin: 0;
	background-color: #ccc;
}
.product-a:hover p{
	background-color: #20A0FF;
	color: #ffffff;
}
.img-wrap{
	height: 209px;
	border-left: 1px solid #ccc;
	border-top: 1px solid #ccc;
	border-right: 1px solid #ccc;
}
.detail-img,.detail-text{
	display: inline-block;
	height: 300px;
}
.detail-img{
	width: 300px;
	float: left;
	text-align: center;
	border: 1px solid #ccc;
}
.detail-text{
	width: 648px;
	height: 300px;
	padding-left:50px; 
}
.detail-body{
	margin-top: 50px;
}
.pagination{
	border-top: 1px solid #eee;
	padding: 0 20px;
	height: 40px;
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
