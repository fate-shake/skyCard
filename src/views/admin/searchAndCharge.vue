<template>
	<div class="search">
		<div class="searchbox">
			<el-input placeholder="请输入SIM卡号或ICCID或MSSI" v-model="searchNumber">
			    <el-button slot="append" @click="searchSim" icon="search"></el-button>
			  </el-input>
		</div>
		<div class="searchResult">
			<el-table
      :data="result"
      stripe
      border
      :height="elTableHight"
      :fit="true"
      style="width: 100%">
      <el-table-column
        prop="sim"
        label="卡号">
      </el-table-column>
      <el-table-column
        prop="activedate"
        label="激活日期">
      </el-table-column>
      <el-table-column
        prop="genre"
        label="备注">
      </el-table-column>
      <el-table-column
        prop="sta"
        label="工作状态">
      </el-table-column>
      <el-table-column
        prop="usedgprs"
        label="已用流量(MB)">
      </el-table-column>
      <el-table-column
        prop="totalgprs"
        label="总流量(MB)">
      </el-table-column>
      <el-table-column
        prop="usedsms"
        label="已用短信">
      </el-table-column>
      <el-table-column
        prop="totalsms"
        label="总短信">
      </el-table-column>
      <el-table-column
        prop="gprsprod"
        label="套餐">
      </el-table-column>
    </el-table>
		</div>
	</div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      searchNumber: '',
      elTableHight: 0,
      loading: false,
      result: []
    }
  },
  mounted: function () {
    let height = document.documentElement.clientHeight
    this.elTableHight = height - 51 - 71
    let that = this
    window.onresize = function temp () {
      if (!that.resizeAble) {
        that.resizeAble = true
        setTimeout(function () {
          that.elTableHight = document.documentElement.clientHeight - 51 - 71
          that.resizeAble = false
        }, 500)
      }
    }
  },
  methods: {
    checkNumber (input) {
      let reg = /^[0-9]*$/
      if (reg.test(input)) {
        return true
      }
      return false
    },
    searchSim () {
      if (!this.searchNumber) {
        return this.$message.error('请输入正确的数字')
      }
      if (!this.checkNumber(this.searchNumber)) {
        return this.$message.error('输入错误，请输入正确的数字')
      }
      if (this.searchNumber.length !== 13 && this.searchNumber.length !== 16 && this.searchNumber.length !== 20) {
        return this.$message.error('输入错误，请输入正确的数字')
      }
      // this.$message.success('Yes,可以请求数据了')
      if (this.searchNumber) {
        this.loading = true
        let that = this
        this.$store.dispatch(types.SEARCH_SIM, this.searchNumber).then(function (res) {
          that.loading = false
          if (res.errorcode === 0) {
            that.result = [res.data]
          } else {
            that.$message.error('查询失败')
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.searchbox{
	padding: 20px 50px 15px 10px;
}
.searchResult{
	padding: 0 10px;
	overflow: auto;
}
.search .el-input{
	width: 300px;
	margin: 0 auto;
}
.el-select{
   width: 110px;
 }
</style>
