<template>
	<div class="sale">
		<div class="saleHeader">
      <div>
        <label>单卡查询</label>
        <el-input placeholder="请输入SIM卡号或ICCID或MSSI" v-model="searchNumber">
          <el-button slot="append" @click="searchSim" icon="search"></el-button>
        </el-input>
      </div>
      <div style="margin-top:10px;">
        <label>多卡查询</label>
        <el-select v-model="searchType" @change="handleChange" placeholder="请选择查询组">
          <el-option
            v-for="item in groupList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
            <span style="float: left">{{ item.label }}</span>
            <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.gsign }}</span> -->
          </el-option>
        </el-select>
        <!-- <el-button type="primary" style="vertical-align: top" @click="getList({ page: 1, pageno: 20, own: 1 })">全部SIM卡</el-button> -->
        <el-button type="primary" style="vertical-align: top;float:right;" @click="uploadVisible = true" >上传文件批量销售</el-button>
        <el-button type="primary" style="vertical-align: top;float:right;margin-right:20px;" @click="saleTo">销售</el-button>
        </div>
			<!-- <el-button type="primary" style="vertical-align: top" @click="saleTo">退货</el-button>
			<el-button type="primary" style="vertical-align: top" @click="uploadVisible = true" >上传文件批量退货</el-button> -->
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="subVisible"
		  size="tiny"
		  >
		  <span>将选中sim卡销售给：</span>
      <el-select v-model="subUser" placeholder="请选择">
        <el-option
          v-for="item in sonList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="subVisible = false">取 消</el-button>
		    <el-button type="primary" @click="sale">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="提示"
		  :visible.sync="singleVisible"
		  size="tiny"
		  >
		  <span>将sim卡销售给：</span>
      <el-select v-model="singleSubUser" placeholder="请选择">
        <el-option
          v-for="item in sonList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="singleVisible = false">取 消</el-button>
		    <el-button type="primary" @click="oneSale">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog
		  title="提示"
		  :visible.sync="uploadVisible"
		  size="tiny"
		  >
		  <div>
				<label>销售给用户：</label>
        <el-select v-model="inputUser.user" placeholder="请选择">
          <el-option
            v-for="item in sonList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
			</div>
			<el-upload
		  class="upload-demo"
		  ref="upload"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :data="inputUser"
		  :file-list="fileList"
		  :auto-upload="false">
			  <el-button slot="trigger" style="margin-top:10px;" size="small" type="primary">选取文件</el-button>
			  <el-button style="margin-top:10px;float: right" size="small" type="success" @click="multiSale">上传到服务器</el-button>
			</el-upload>
		</el-dialog>
		<div class="saleBody">
			<div class="single">
				<el-table
					ref="multipleTable"
		      :data="tableData"
		      stripe
		      border
		      :fit="true"
		      :height="elTableHight"
		      @selection-change="handleSelectionChange"
		      style="100%">
		      <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
		      <el-table-column
		          prop="sim"
		          label="卡号">
		      </el-table-column>
          <el-table-column
              prop="iccid"
              label="ICCID">
          </el-table-column>
          <el-table-column
              prop="imsi"
              label="IMSI">
          </el-table-column>
          <el-table-column
              prop="imei"
              label="IMEI">
          </el-table-column>
		      <el-table-column
		          prop="opendate"
		          label="开卡时间">
		      </el-table-column>
<!-- 		      <el-table-column
		          prop="sta"
		          label="状态">
		      </el-table-column> -->
		      <!-- <el-table-column
		        prop="smsprod"
		        label="短信套餐">
		        <template scope="scope">
			        <el-popover trigger="hover" placement="top">
			          <p v-if="scope.row.smsprod === 0">套餐一</p>
			          <p v-else>套餐二</p>
			          <div slot="reference" class="name-wrapper">
			            <el-tag>套餐{{ scope.row.smsprod }}</el-tag>
			          </div>
			        </el-popover>
			      </template>
		      </el-table-column> -->
		      <el-table-column
		        prop="gprsprod"
		        label="流量套餐">
		      </el-table-column>
		      <el-table-column
		        prop="genre"
		        label="卡类型">
		      </el-table-column>
		      <el-table-column label="操作">
		  	    <template scope="scope">
		  	      <el-button type="primary" @click="singleSale(scope.$index, scope.row)" size="mini">销售</el-button>
		  	    </template>
		      </el-table-column>
		    </el-table>
		    <el-pagination
		      @size-change="sizeChange"
		      @current-change="currentChange"
		      :current-page.sync="currentPage"
		      :page-sizes="[20, 50, 100, 200, 300, 500, 1000]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
		    </el-pagination>
		  </div>
		</div>
	</div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      searchNumber: '',
      uploadVisible: false,
      elTableHight: 0,
      tableData: [],
      currentPage: 1,
      selectIndex: [],
      subVisible: false,
      getlist: true,
      subUser: '',
      singleSubUser: '',
      singleVisible: false,
      inputUser: {
        user: ''
      },
      groupList: [{
        value: 'all',
        label: '全部'
      }],
      sonList: [],
      fileList: [],
      total: 0,
      pageSize: 20,
      tempSim: '',
      searchType: ''
    }
  },
  mounted: function () {
    let height = document.documentElement.clientHeight
    this.elTableHight = height - 40 - 56 - 80
    let that = this
    window.onresize = function temp () {
      if (!that.resizeAble) {
        that.resizeAble = true
        setTimeout(function () {
          that.elTableHight = document.documentElement.clientHeight - 40 - 56 - 80
          that.resizeAble = false
        }, 500)
      }
    }
  },
  created () {
    let that = this
    this.$store.dispatch(types.GET_GROUP_LIST).then(function (res) {
      let temp = []
      if (res.errorcode === 0) {
        res.data.map(function (item, index, input) {
          temp.push({ value: item.gsign, label: item.gname })
        })
      } else {
        temp = []
      }
      temp.unshift({ value: 'all', label: '全部' })
      that.groupList = temp
    })
    this.$store.dispatch(types.GET_SUB_USER).then(function (res) {
      let temp = []
      if (res.errorcode === 0) {
        res.data.arr.map(function (item, index, input) {
          temp.push({ value: item.uid, label: item.uid })
        })
      } else {
        temp = []
      }
      that.sonList = temp
    })
  },
  watch: {
    'subVisible': function () {
      this.subUser = ''
    }
  },
  methods: {
    searchSim () {
      this.searchType = ''
      if (!this.searchNumber) {
        return this.$message.warning('请输入正确的数字')
      }
      if (this.searchNumber.length !== 13 && this.searchNumber.length !== 15 && this.searchNumber.length !== 20) {
        return this.$message.warning('输入错误，请输入正确的数字')
      }
      let that = this
      this.$store.dispatch(types.SEARCH_SIM, this.searchNumber).then((res) => {
        if (res.errorcode === 0) {
          if (res.data.own === 0) {
            that.tableData = []
            that.$message.warning('SIM已经售出')
          } else {
            that.tableData = [res.data]
          }
        } else {
          that.tableData = []
          that.$message.error('错误码：' + res.errorcode)
        }
      }).catch((e) => {
        that.$message.error('网络错误')
      })
    },
    handleSelectionChange (val) {
      this.selectIndex = val
    },
    saleTo () {
      if (this.selectIndex.length > 0) {
        this.subVisible = true
      } else {
        this.$message.warning('未选中任务sim卡')
      }
    },
    loadSuccess () {
      this.$message.success('上传成功')
    },
    loadError () {
      this.$message.error('上传失败')
    },
    multiSale () {
      if (this.inputUser.user.length > 0) {
        this.$refs.upload.submit()
        this.uploadVisible = false
      } else {
        this.$message.warning('请先写要销售的用户')
      }
    },
    sizeChange (val) {
      this.pageSize = val
      let that = this
      setTimeout(function () {
        if (that.getlist) {
          that.getlist = true
          that.getList({ page: that.currentPage, pageno: val, own: 1 })
        }
      }, 500)
    },
    currentChange (val) {
      this.currentPage = val
      this.getlist = false
      this.getList({ page: val, pageno: this.pageSize, own: 1 })
    },
    getList (val) {
      let that = this
      this.$store.dispatch(types.GET_SIM_LIST, val).then(function (res) {
        if (res.errorcode === 0) {
          that.tableData = res.data.arr
          that.total = res.data.num
        } else {
          that.$message.error('错误码:' + res.errorcode)
        }
      })
    },
    singleSale (val1, val2) {
      this.tempSim = val2.sim
      this.singleVisible = true
    },
    oneSale () {
      if (this.singleSubUser.length > 0) {
        let that = this
        this.$store.dispatch(types.SALE_CARD, { uid: this.singleSubUser, sims: [this.tempSim] }).then((res) => {
          if (res.errorcode === 0) {
            that.$message.success('分配成功')
            that.getList({ page: that.currentPage, pageno: that.pageSize, own: 1 })
          } else {
            that.$message.error('分配失败')
          }
        })
        this.singleVisible = false
      } else {
        this.$message.warning('请填写要销售的账户')
      }
    },
    sale () {
      if (this.subUser.length > 0) {
        let sim = []
        this.selectIndex.map((item, index, input) => {
          return sim.push(item.sim)
        })
        let that = this
        this.$store.dispatch(types.SALE_CARD, { uid: this.subUser, sims: sim }).then((res) => {
          if (res.errorcode === 0) {
            that.$message.success('分配成功')
            that.getList({ page: that.currentPage, pageno: that.pageSize, own: 1 })
          } else {
            that.$message.error('分配失败')
          }
        })
        this.subVisible = false
      } else {
        this.$message.warning('请填写要销售的账户')
      }
    },
    handleChange (val) {
      if (val) {
        if (val === 'all') {
          this.getList({ page: 1, pageno: 20, own: 1 })
        } else {
          this.getList({ page: 1, pageno: 20, own: 1, gsign: val })
        }
      }
    }
  }
}
</script>

<style scoped>
.el-tag{
	background-color: #eef1f6;
	color: #13CE66;
}
.sale{
	height: 100%;
}
.saleHeader{
	padding:10px 20px;
}
.saleHeader .el-input{
	width: 300px;
}
.saleBody{
	padding:0 20px 10px 20px;
	text-align: center;
}
</style>
