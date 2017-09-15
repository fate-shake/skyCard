<template>
  <div class="hello">
    <h3>账户基本信息</h3>
    <div class="total-charts">
    	<div class="sim-account">
				<el-card class="box-card" v-loading="load_user">
				  <div slot="header" class="clearfix">
				    <span style="line-height: 36px;">用户信息</span>
				  </div>
				  <div>
				    <p>用户名：<span style="color: #13CE66;font-size: 18px;">{{ user.uid }}</span></p>
				    <p>用户所属：<span>权威23</span></p>
				    <p>用户等级：<span>权威23</span></p>
				  </div>
				</el-card>
    	</div>
    	<div class="sim-state">
    		<div id="stateChart"></div>
    	</div>
    </div>
  </div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
import echarts from 'echarts'
export default {
  data () {
    return {
      user: {},
      load_user: false,
      total: {},
      load_total: false,
      myEcharts: ''
    }
  },
  created () {
    this.load_user = true
    this.load_total = true
    let that = this
    this.$store.dispatch(types.SELF_MSG).then(function (res) {
      that.load_user = false
      if (res.errorcode === 0) {
        that.user = res.data
      }
    })
    this.$store.dispatch(types.GET_USER_MSG).then(function (res) {
      that.load_total = false
      if (res.errorcode === 0) {
        that.total = res.data
        let myEcharts = echarts.init(document.getElementById('stateChart'))
        myEcharts.setOption({
          color: ['#20A0FF', '#20A0FF', '#FF4949', '#20A0FF'],
          title: {
            text: '用户拥有卡总览',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: 'shadow'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['SIM卡总量', '正在使用', '已停机', '待激活'],
            axisTick: {
              alignWidthLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [
            {
              name: '停开机状态',
              type: 'bar',
              barWidth: '60%',
              data: [res.data.num, res.data.on, res.data.off, res.data.unactive]
            }
          ]
        })
      }
    })
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
	margin: 12px 20px;
}
.total-charts{
	padding: 10px;
	width: 860px;
	margin: 0 0 0 10%;
}
.sim-account{
	width: 300px;
	display: inline-block;
	padding: 10px;
	border-radius: 10px;
}
.box-card{
	width: 300px;
}
.sim-state{
	position: absolute;
	width: 560px;
	display: inline-block;
	height: 500px;
	padding: 10px;
	border-radius: 10px;
}

#stateChart{
	height: 100%;
	border: 1px solid #ccc;
	border-radius: 10px;
}
</style>
