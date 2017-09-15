<template>
	<div class="iots">
    <div class="iot-table">
      <div class="table">
        <ul>
          <li><router-link class="router-link" :to="{ path: '/charge', query: { key: 'message' } }" :class="[active === 'select'?'active':'']">查询</router-link></li>
          <li><router-link class="router-link" :to="{ path: '/charge', query: { key: 'recharge' } }" :class="[active === 'recharge'?'active':'']">充值</router-link></li>
        </ul>  
      </div>
    </div>
    <div class="iot">
      <div v-if="recharge">
        <div style="padding: 20px;text-align: center">
          <ul style="list-style: none;margin: 0;padding: 0;display: inline-block">
            <li @click="rechargeType = 'flow'" style="float: left;padding: 5px 10px;cursor: pointer" :style="{color: rechargeType === 'flow'?'#20A0FF':'','border-bottom':rechargeType === 'flow'?'1px solid #20A0FF':''}">流量充值</li>
            <li @click="rechargeType = 'member'" style="float: left;padding: 5px 10px;cursor: pointer" :style="{color: rechargeType === 'member'?'#20A0FF':'','border-bottom':rechargeType === 'member'?'1px solid #20A0FF':''}">年费充值</li>
          </ul>
          <div style="width: 600px;margin: 20px auto;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px" class="demo-ruleForm">
              <el-form-item label="请输入物联卡号" prop="simID">
                <el-input type="number" v-model="ruleForm.simID" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item v-if="rechargeType === 'member'" label="充值时间" prop="amount">
                <el-input-number v-model="ruleForm.amount" @change="handleChange" :min="1" :step="0.5" :max="10"></el-input-number>
                <span>单位：年</span>
              </el-form-item>
              <el-form-item v-if="rechargeType === 'flow'" label="充值流量" prop="amount">
                <a class="flows" @click="flowNumber = 5" :style="{'border-color':flowNumber === 5?'#20A0FF':'#ccc','color':flowNumber === 5?'#20A0FF':''}">5M</a>
                <a class="flows" @click="flowNumber = 10" :style="{'border-color':flowNumber === 10?'#20A0FF':'#ccc','color':flowNumber === 10?'#20A0FF':''}">10M</a>
                <a class="flows" @click="flowNumber = 30" :style="{'border-color':flowNumber === 30?'#20A0FF':'#ccc','color':flowNumber === 30?'#20A0FF':''}">30M</a>
              </el-form-item>
              <el-form-item  label="支付费用" prop="amount">
                <span style="color: #ff4949;font-size: 22px;">￥{{ flowSpend }}</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div style="height: 200px;padding: 0 300px;">
            <h3>温馨提示：</h3>
            <p>
              请认真核对输入的SIM卡号，以免充值到其他SIM卡上；
            </p>
            <p>
              批量充值请联系您的销售上级；
            </p>
          </div>
        </div>
      <div v-else>
        <div style="width: 480px;margin: 20px auto;">
            <el-form :model="ruleForm" :rules="rules" ref="queryForm" label-width="180px" class="demo-ruleForm">
              <el-form-item label="请输入物联卡号" prop="simID">
                <el-input type="text" v-model="ruleForm.simID" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="queryMessage()">提交</el-button>
              </el-form-item>
            </el-form>
        </div>
        <div class="message">
            <div  v-if="result.sim">
                <p>查询信息</p>
                <table border="1" style="border-collapse:collapse">
                  <tbody>
                     <tr>
                      <td>卡号</td>
                      <td>{{ result.sim }}</td>
                    </tr>
                    <tr>
                      <td>到期时间</td>
                      <td>{{ result.expire }}</td>
                    </tr>
                    <tr>
                      <td>套餐流量(MB)</td>
                      <td>{{ result.totalgprs }}</td>
                    </tr>
                    <tr>
                      <td>已用流量(MB)</td>
                      <td>{{ result.usedgprs }}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    var checkSimID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('SIM卡号不能为空'))
      }
      setTimeout(() => {
        if (value.length !== 13 && value.length !== 15 && value.length !== 20) {
          callback(new Error('请输入正确的SIM卡号'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      ruleForm: {
        simID: '',
        amount: 0
      },
      rules: {
        simID: [
          { validator: checkSimID, trigger: 'blur' }
        ]
      },
      rechargeType: 'flow',
      flowNumber: 5,
      recharge: true,
      active: 'recharge',
      result: {}
    }
  },
  computed: {
    flowSpend: function () {
      let spend = 0
      if (this.rechargeType === 'flow') {
        switch (this.flowNumber) {
          case 5:
            spend = 10
            break
          case 10:
            spend = 20
            break
          case 30:
            spend = 30
            break
          default:
            spend = 0
        }
      } else {
        spend = this.ruleForm.amount * 60
      }
      return spend
    }
  },
  watch: {
    '$route.params': function () {
      if (this.$route.query.key === 'recharge') {
        this.recharge = true
        this.active = 'recharge'
      }
      if (this.$route.query.key === 'message') {
        this.recharge = false
        this.active = 'select'
      }
      this.ruleForm.simID = ''
    }
  },
  mounted () {
    if (this.$route.query.key === 'recharge') {
      this.recharge = true
      this.active = 'recharge'
    } else {
      this.recharge = false
      this.active = 'select'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs['ruleForm'].validate((valid) => {
        this.$alert('功能暂未开放，敬请期待！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
          }
        })
      })
    },
    handleChange (value) {
    },
    queryMessage () {
      this.result = {}
      this.$refs['queryForm'].validate((valid) => {
        if (valid) {
          let that = this
          axios.get(`/publicard/` + this.ruleForm.simID).then(function (res) {
            if (res.data.errorcode === 0) {
              that.result = res.data.data
            }
            if (res.data.errorcode === 50040) {
              that.$alert('SIM卡归属错误', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          }).catch(function (e) {
            console.log(e)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.el-form-item{
	text-align: left;
}
.iot-table{
  background-color: #13ce66;
}
.iot{
  width: 1024px;
  margin: 0 auto;
}
.table{
  width: 1024px;
  margin: 0 auto;
  height: 40px;
  background: #13ce66;
}
.table ul{
  margin: 0;
  padding:0;
  list-style: none;
}
.table ul li{
  float: left;
}
.router-link{
  display: block;
  padding:11px 20px;
  text-decoration: none;
  color: #ffffff;
}
.active{
  background-color: #ffffff;
  color: #13ce66;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.flows{
  padding:10px 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
}
.message{
  height: 300px;
  width: 430px;
  padding-left: 50px;
  margin: 0 auto;
}
.message p{
  text-indent: 0;
}
.message span{
  width: 100px;
  display: block;
  min-height: 220px;
}
.message table{
  text-align: center;
}
td{
  width: 200px;
  padding: 10px;
}
</style>
