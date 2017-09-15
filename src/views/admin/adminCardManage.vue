<template>
	<div class="cardManger"  v-loading.body="loading1" v-loading.fullscreen.lock="loading"
    :element-loading-text="load_text">
		<div class="cardAction">
	      <el-cascader
	        :options="options"
	        placeholder="请选择查询类型"
	        :show-all-levels="false"
	        v-model="searchType"
	        @change="searchSim"
	      ></el-cascader>
      <el-button type="primary" @click="moveSim">分组<i class="el-icon-delete el-icon--right"></i></el-button>
      <el-button type="primary" @click="rechargeSim">充值<i class="el-icon-delete el-icon--right"></i></el-button>
			<div class="filterInput">
				<el-input placeholder="筛选SIM卡" v-model="filterString">
			    <el-button slot="append" @click="search" icon="search"></el-button>
			  </el-input>
			</div>
      <!-- <div class="package">
        <el-radio-group v-model="package" @change="checkPackage">
          <el-radio :label="1">套餐1</el-radio>
          <el-radio :label="2">套餐2</el-radio>
          <el-radio :label="3">套餐3</el-radio>
        </el-radio-group>
      </div> -->

      <el-dialog
        title="提示"
        :visible.sync="assignVisible"
        size="tiny"
        >
        <el-form ref="form" :model="assignSubUser" label-width="80px">
          <el-form-item label="子账号">
            <el-select v-model="assignSubUser.suid" placeholder="请选择子账号">
              <el-option label="子账号1" value="子账号1"></el-option>
              <el-option label="子账号2" value="子账号2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="80px">
            <el-button type="primary" @click="assignTo">分配</el-button>
            <el-button @click="assignVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="rechargeVisible"
        size="tiny"
        @close="checkAll = false;checkGroup = false;checkSub = false"
        >
        <div v-if="searchType[0] == 'total'">
          <div v-if="selectedSim.length>0" style="text-align: center;">
            <el-radio-group v-model="checkAll"
            >
              <el-radio style="margin: 5px 0;" :label="false">为已选中的SIM进行充值(总共<span style="color: #ff4949">1000</span>张)</el-radio>
              <el-radio style="margin: 5px 0;" :label="true">为账号下所有SIM卡充值(总共<span style="color: #ff4949">1000</span>张)</el-radio>
            </el-radio-group>
          </div>
          <div v-else>
            未选中任何SIM卡，是否为账号下 <span style="color: #FF4949;background: #F7BA2A">所有SIM卡(1000张)</span>进行充值？
          </div>
        </div>
        <div v-if="searchType[0] == 'group'">
          <div v-if="selectedSim.length>0" style="text-align: center;">
            <el-radio-group v-model="checkGroup"
            >
              <el-radio style="margin: 5px 0;" :label="false">为已选中的SIM进行充值(总共<span style="color: #ff4949">1000</span>张)</el-radio>
              <el-radio style="margin: 5px 0;" :label="true">为该组下所有SIM卡充值(总共<span style="color: #ff4949">1000</span>张)</el-radio>
            </el-radio-group>
          </div>
          <div v-else>
            未选中任何SIM卡，是否为该组 <span style="color: #FF4949;background: #F7BA2A">所有SIM卡(1000张)</span>进行充值？
          </div>
        </div>
        <div v-if="searchType[0] == 'subUser'">
          <div v-if="selectedSim.length>0" style="text-align: center;">
            <el-radio-group v-model="checkSub"
            >
              <el-radio style="margin: 5px 0;" :label="false">为已选中的SIM进行充值(总共<span style="color: #ff4949">1000</span>张)</el-radio>
              <el-radio style="margin: 5px 0;" :label="true">为子账号下所有SIM卡充值(总共<span style="color: #ff4949">1000</span>张)</el-radio>
            </el-radio-group>
          </div>
          <div v-else>
            未选中任何SIM卡，是否为子账号<span style="color: #FF4949;background: #F7BA2A">所有SIM卡(1000张)</span>进行充值？
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="rechargeVisible = false;checkAll = false;checkGroup = false;checkSub = false">取 消</el-button>
          <el-button type="primary" @click="rechargeType">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="提示"
        :visible.sync="moveVisible"
        size="tiny"
        @close="simGroup = ''"
        >
        <el-form ref="form" :model="assignSubUser" label-width="80px">
          <el-form-item label="选择分组">
            <el-autocomplete
              class="inline-input"
              v-model="simGroup"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <p style="padding-left: 10px">不存在的组将会被创建</p>
          <el-form-item label-width="80px">
            <el-button type="primary" @click="moveGroup">分组</el-button>
            <el-button @click="moveVisible = false;simGroup = ''">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog
        title="充值类型"
        :visible.sync="chooseType"
        size="tiny"
        >
        <p style="margin-top: 0">请选择要充值的类型</p>
        <el-radio-group  style="margin-bottom: 10px;" v-model="recharge"
        @change="selectType">
            <el-radio label="time">时间</el-radio>
            <el-radio label="flow">流量</el-radio>
        </el-radio-group>
        <div class="time" v-if="recharge == 'time'">
          <el-button :class="[time == 1?'default':'']" @click="checkTime(1)">一年</el-button>
          <el-button :class="[time == 2?'default':'']" @click="checkTime(2)">两年</el-button>
          <el-button :class="[time == 3?'default':'']" @click="checkTime(3)">三年</el-button>
        </div>
        <div class="flow" v-if="recharge == 'flow'">
          <el-button :class="[flow == 5?'default':'']" @click="checkFlow(5)">5元10M</el-button>
          <el-button :class="[flow == 10?'default':'']" @click="checkFlow(10)">10元30M</el-button>
        </div>
        <div class="pay">
          <label>支付金额：</label>
          <span>¥{{ payNumber }}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="chooseType = false;checkAll = false;recharge = 'time'">取 消</el-button>
          <el-button type="primary" @click="submitOrder">提交订单</el-button>
        </span>
      </el-dialog>
		</div>
		<div class="cardList" :style="{height: elTableHight}">
			<el-table
      :data="tableData"
      stripe
      border
      :height="elTableHight"
      :fit="true"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
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
            label="套餐流量(MB)">
          </el-table-column>
          <!-- <el-table-column
            prop="usedsms"
            label="已用短信">
          </el-table-column>
          <el-table-column
            prop="totalsms"
            label="总短信"> -->
          </el-table-column>
          <el-table-column
            prop="gprsprod"
            label="套餐">
          </el-table-column>
        <el-table-column label="操作">
  	      <template scope="scope">
            <el-button type="primary" size="small" @click="charge">充值</el-button>
  	      </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="修改备注"
        :visible.sync="remarkVisible"
        size="tiny"
        >
        <el-form label-position="right" label-width="80px" :model="remark">
          <el-form-item label="备注">
            <el-input v-model="remark.remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="remarkVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
      </el-dialog>
		</div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSim">
      </el-pagination>
    </div>
	</div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      name: '',
      dealer: false,
      filterString: '',
      selectedSim: [],
      assignSubUser: {
        suid: ''
      },
      loading: false,
      loading1: false,
      load_text: '努力加载中…………',
      resizeAble: false,
      currentPage: 1,
      elTableHight: '0px',
      subUser: [],
      assignVisible: false,
      moveVisible: false,
      rechargeVisible: false,
      searchType: [],
      checkAll: false,
      checkGroup: false,
      checkSub: false,
      recharge: 'time',
      package: 1,
      time: 1,
      flow: 5,
      payNumber: 50,
      chooseType: false,
      remarkVisible: false,
      remark: {
        remark: ''
      },
      singleCard: [],
      options: [{
        value: 'total',
        label: '所有SIM卡'
      }, {
        value: 'group',
        label: '分组',
        children: []
      }],
      tableData: [],
      simGroup: '',
      simGsign: '',
      simGroups: [
      ],
      totalSim: 0,
      pageSize: 20,
      getlist: true
    }
  },
  mounted () {
    let height = document.documentElement.clientHeight
    this.elTableHight = height - 51 - 71 - 40
    this.elTableHight += 'px'
    let that = this
    window.onresize = function temp () {
      if (!that.resizeAble) {
        that.resizeAble = true
        setTimeout(function () {
          that.elTableHight = document.documentElement.clientHeight - 51 - 71 - 40 + 'px'
          that.resizeAble = false
        }, 500)
      }
    }
  },
  created () {
    this.getGroupList()
  },
  watch: {
    'assignVisible': function () {
      if (!this.assignVisible) {
        this.assignSubUser = {
          suid: ''
        }
      }
    },
    'filterString': function () {
      if (this.filterString.length > 5) {
      }
    },
    'simGroup': function () {
      if (this.simGroup === '') {
        this.simGsign = ''
      }
    }
  },
  methods: {
    getGroupList () {
      this.simGroups = []
      let that = this
      this.$store.dispatch(types.GET_GROUP_LIST).then(function (res) {
        if (res.errorcode === 0) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              that.options[1].children.push({ value: res.data[i].gsign, label: res.data[i].gname })
              that.simGroups.push({ value: res.data[i].gname, label: res.data[i].gsign })
            }
          }
        }
      })
    },
    handleSelectionChange (val) {
      let _temp = []
      val.map((item, index, input) => {
        _temp.push(item.sim)
      })
      this.selectedSim = _temp
    },
    searchSim (data) {
      let that = this
      if (this.searchType[0] === 'total') {
        this.$store.dispatch(types.GET_SIM_LIST, { page: data.page || 1, pageno: data.pageSize || 20 }).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData = res.data.arr
            that.totalSim = res.data.num
          }
        })
      } else if (this.searchType[0] === 'group') {
        this.$store.dispatch(types.GET_GROUP_SIM, { gsign: this.searchType[1], page: data.page || 1, pageno: data.pageSize || 20 }).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData = res.data.arr
            that.totalSim = res.data.num
          }
        })
      }
    },
    assignSim () {
      if (this.selectedSim.length > 0) {
        if (this.subUser.length > 0) {
          this.assignVisible = true
        } else {
          this.$message.error('请先创建子账号后再分配SIM卡')
        }
      } else {
        this.$message.error('请先选中要分配的SIM卡')
      }
    },
    assignTo () {
      if (this.assignSubUser.suid) {
      }
      this.assignVisible = false
    },
    recyleSim () {
      if (this.selectedSim.length > 0) {
        this.$confirm('是否回收已选中的SIM卡?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '回收成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        this.$message.error('请先选中要回收的SIM卡')
      }
    },
    moveSim () {
      if (this.selectedSim.length > 0) {
        this.moveVisible = true
      } else {
        this.$message.error('请先选中要移动的SIM卡')
      }
    },
    moveGroup () {
      if (this.simGroup.length > 0) {
        let that = this
        if (this.simGsign) {
          // 已有分组
          this.$store.dispatch(types.UPDATE_GROUP_SIM, { gsign: this.simGroup, sims: this.selectedSim }).then(function (res) {
            if (res.errorcode === 0) {
              that.$message.success('分组成功')
              that.searchSim()
            } else {
              that.$message.error('分组失败,错误码：' + res.errorcode)
            }
          })
        } else {
          // 新建分组
          this.$store.dispatch(types.ADD_GROUP, { gname: this.simGroup }).then(function (res) {
            if (res.errorcode === 0) {
            }
          }).catch((e) => {
            console.log(e)
          })
        }
        this.moveVisible = false
      } else {
        this.$message.error('请先选择分组')
      }
    },
    querySearch (queryString, cb) {
      cb(this.simGroups)
    },
    rechargeSim () {
      if (this.selectedSim.length > 0) {
        this.$message.warning('功能暂未开放，敬请期待')
        // this.rechargeVisible = true
      } else {
        this.$message.error('请先选择SIM卡')
      }
    },
    rechargeType () {
      this.rechargeVisible = false
      let that = this
      setTimeout(function () {
        that.chooseType = true
      }, 500)
    },
    submitOrder () {
      this.$confirm('生成订单前请务必确认订单信息无误，若订单信息无误，请选择确定，否则请点击取消', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.chooseType = false
        this.loading = true
        this.$message({
          type: 'success',
          message: '订单提交成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '订单未提交'
        })
      })
    },
    selectType () {
      this.time = 1
      this.flow = 5
      this.payNumber = this.recharge === 'time' ? 50 : 5
    },
    checkTime (time) {
      this.time = time
      this.payNumber = time * 50
    },
    checkFlow (flow) {
      this.flow = flow
      this.payNumber = flow * 1
    },
    editRemark (val1, val2) {
      this.remarkVisible = true
      this.remark.remark = val2.name
      this.singleCard = val2
    },
    edit () {
    },
    handleSelect (val) {
      this.simGsign = val.label
    },
    handleSizeChange (val) {
      this.pageSize = val
      let that = this
      setTimeout(function () {
        if (that.getlist) {
          that.getlist = true
          that.searchSim({ page: that.currentPage, pageno: val, own: 1 })
        }
      }, 500)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getlist = false
      this.searchSim({ page: val, pageSize: this.pageSize })
    },
    search () {
      if (this.filterString) {
        let that = this
        this.$store.dispatch(types.SEARCH_SIM, this.filterString).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData = [res.data]
          }
        })
      }
    },
    charge () {
      this.$message.warning('功能暂未开放，敬请期待')
    }
  }
}
</script>

<style scoped>
.el-table{
  height: 100%;
}
.el-select{
   width: 110px;
 }
 .el-loading-mask{
  background-color: rgba(255,255,255,0.7);
 }
 .el-loading-mask.is-fullscreen{
  background-color: rgba(255,255,255,0.7);
 }
 .searchSim{
  width: 300px;
  padding: 0;
 }
.cardAction{
	padding: 20px 0 15px 10px;
}

.filterInput{
	display: inline-block;
	width: 300px;
	padding-left: 10px;
}

.package{
  height: 36px;
  line-height: 36px;
}

.cardList{
	/*max-height: 800px;*/
	padding: 0 10px;
	overflow: auto;
}
.pagination{
  padding: 4px 0;
  text-align: center;
}
.time .el-button,.flow .el-button{
  border-color: #c4c4c4;
}

.time .default,.flow .default{
  border-color:#20a0ff;
  color: #20a0ff;
}
.pay{
  height: 36px;
  line-height: 36px;
  margin-top:30px;
}
.pay>span{
  color: #ff4949;
  font-size: 24px;
}
</style>
