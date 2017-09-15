<template>
	<div class="cardManager" v-loading.body="loading">
		<div class="search">
			<div style="margin-bottom: 5px;">
				<label>单卡查询</label>
				<el-input placeholder="请输入SIM卡号、ICCID或MSSI" v-model="input">
			  </el-input>
			  <el-button type="primary" @click="searchSim" >查询</el-button>
			</div>
			<label>多卡查询</label>
			<el-select v-model="searchType" placeholder="请选择查询组">
		    <el-option
		      v-for="item in groupList"
		      :key="item.gsign"
		      :label="item.gname"
		      :value="item.gsign"
		      >
		      <span style="float: left">{{ item.gname }}</span>
		      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.gsign }}</span> -->
		    </el-option>
		  </el-select>
			<el-select v-model="searchType2" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :key="item.value"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
			 <el-date-picker
			 	style="width: 210px;"
	      v-model="searchType3"
	      type="daterange"
	      align="right"
        format="yyyy-MM-dd"
	      placeholder="选择日期范围"
        @change="show"
	      :picker-options="pickerOptions2">
	    </el-date-picker>
		  <el-button type="primary" style="vertical-align: top;" @click="search">查询</el-button>
		  <el-button type="primary" style="vertical-align: top;" @click="uploadVisible = true">上传文件批量管理</el-button>
      <el-button type="primary" style="vertical-align: top;" @click="setGroup">设备分组</el-button>
		  <!-- <el-upload style='display: inline-block'
			  class="upload-demo"
			  action="http://jsonplaceholder.typicode.com/posts/"
			  :data="aType"
			  :show-file-list='false'
			  :on-success="loadSuccess"
			  :on-progress="actionType"
			  :on-error="loadError">
			  <el-button type="primary">上传文件批量管理</el-button>
			  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		  </el-upload> -->
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="uploadVisible"
		  size="tiny"
		  >
		  <div>
				<label>操作选择：</label>
				<template>
				  <el-radio class="radio" v-model="radio" label="stop">停机</el-radio>
				  <el-radio class="radio" v-model="radio" label="run">激活</el-radio>
				</template>
			</div>
			<el-upload
		  class="upload-demo"
		  ref="upload"
		  action="https://jsonplaceholder.typicode.com/posts/"
		  :data="aType"
		  :show-file-list='true'
			:on-success="loadSuccess"
			:on-progress="actionType"
			:on-error="loadError"
		  :auto-upload="false">
			  <el-button slot="trigger" style="margin-top:10px;" size="small" type="primary">选取文件</el-button>
			  <el-button style="margin-top:10px;float: right" size="small" type="success" @click="actionType">确定</el-button>
			</el-upload>
		</el-dialog>
    <el-dialog
        title="提示"
        :visible.sync="moveVisible"
        size="tiny"
        @close="simGroup = ''"
        >
        <el-form ref="form" label-width="80px">
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
		<div class="result">
			<div v-if="isSingle" class="single">
				<el-table
	      :data="tableData"
	      stripe
	      border
	      :fit="true"
	      :height="elTableHight"
	      @selection-change="handleSelectionChange"
	      style="100%">
	      	<el-table-column
			      type="selection"
			      fixed
			      width="55">
			    </el-table-column>
	        <el-table-column
	          prop="sim"
	          fixed
	          width="140"
	          label="卡号">
	        </el-table-column>
	        <el-table-column
	          prop="iccid"
	          width="200"
	          label="ICCID">
	        </el-table-column>
	        <el-table-column
	          prop="imsi"
	          width="160"
	          label="IMSI">
	        </el-table-column>
	        <el-table-column
	          prop="imei"
	          width="160"
	          label="IMEI">
	        </el-table-column>
	        <!-- <el-table-column
	          prop="name"
	          label="备注">
	        </el-table-column> -->
	        <el-table-column
	          prop="sta"
	          width="100"
	          label="工作状态">
	        </el-table-column>
	        <el-table-column
	          prop="usedgprs"
	          width="130"
	          label="已用流量(MB)">
	        </el-table-column>
	        <el-table-column
	          prop="usedsms"
	          width="100"
	          label="已用短信">
	        </el-table-column>
	        <el-table-column
	          prop="activedate"
	          width="120"
	          label="激活日期">
	        </el-table-column>
	        <el-table-column
	          prop="expire"
	          width="120"
	          label="到期时间">
	        </el-table-column>
	        <el-table-column width="300px" fixed="right" label="操作">
	  	      <template scope="scope">
	  	        <el-button type="success" v-if="scope.row.sta === '停机'" size="mini" @click="run(scope.$index, scope.row)">开机</el-button>
	  	        <el-button type="danger" v-if="scope.row.sta === '正使用'" size="mini" @click="stop(scope.$index, scope.row)">停机</el-button>
	  	        <el-button type="danger" v-if="scope.row.sta === '待激活'" size="mini" @click="stop(scope.$index, scope.row)">退货</el-button>
	  	        <!-- <el-button type="success" v-if="scope.row.sta === '正使用' && scope.row.smsopen === 0" size="mini" @click="run(scope.$index, scope.row)">启用短信</el-button>
	  	        <el-button type="danger" v-if="scope.row.sta === '正使用' && scope.row.smsopen === 1" size="mini" @click="run(scope.$index, scope.row)">关闭短信</el-button>
	  	        <el-button type="danger" v-if="scope.row.sta === '正使用' && scope.row.smsopen === 1" size="mini" @click="run(scope.$index, scope.row)">发送短信</el-button> -->
	  	        <el-button type="success" v-if="scope.row.sta === '正使用' && scope.row.gprsopen === 0" size="mini" @click="gpsOpen(scope.$index, scope.row)">启用GPRS</el-button>
	  	        <el-button type="danger" v-if="scope.row.sta === '正使用' && scope.row.gprsopen === 1" size="mini" @click="gpsClose(scope.$index, scope.row)">关闭GPRS</el-button>
	  	      </template>
	        </el-table-column>
	      </el-table>
	      <div style="text-align: center;">
	      	<el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page="currentPage"
			      :page-sizes="[20, 50, 100, 200]"
			      :page-size="pageSize"
			      layout="total, sizes, prev, pager, next, jumper"
			      :total="total">
			    </el-pagination>
	      </div>
			</div>
			<div v-else>
				<div style="width: 300px;margin: 0 auto;">
					<p>上传文件信息：</p>
					<p>SIM卡数量</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import * as types from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      loading: false,
      input: '',
      isSingle: true,
      tableData: [],
//  stop run
      aType: {
        type: 'stop'
      },
      uploadVisible: false,
      radio: 'stop',
      groupList: [],
      options: [{
        value: 'all',
        label: '全部'
      }, {
        value: 'saled',
        label: '已销售'
      }, {
        value: 'actived',
        label: '已激活'
      }],
      selectSim: [],
      moveVisible: false,
      simGroups: [],
      simGroup: '',
      simGsign: '',
      searchType: 'all',
      searchType2: 'all',
      searchType3: '',
      times: '',
      elTableHight: 0,
      total: 0,
      currentPage: 1,
      getlist: true,
      pageSize: 20,
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 9)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  created () {
    this.getGroupList()
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
  methods: {
    checkNumber (input) {
      let reg = /^[0-9]*$/
      if (reg.test(input)) {
        return true
      }
      return false
    },
    getGroupList () {
      let that = this
      this.$store.dispatch(types.GET_GROUP_LIST).then(function (res) {
        if (res.errorcode === 0) {
          if (res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              that.simGroups.push({ value: res.data[i].gname, label: res.data[i].gsign })
            }
          }
          that.groupList = res.data
          that.groupList.unshift({ gname: '全部', gsign: 'all' })
        }
      })
    },
    search () {
      console.log(this.pageSize)
      let params = { page: this.currentPage, pageno: this.pageSize }
      if (this.searchType === 'all') {
      } else {
        params.gsign = this.searchType
      }
      if (this.searchType2 === 'saled') {
        params.own = '0'
        if (this.searchType3) {
          params.stime = this.times
        }
      }
      if (this.searchType2 === 'actived') {
        params.active = '1'
        if (this.searchType3) {
          params.atime = this.times
        }
      }
      this.getList(params)
      this.currentPage = 1
    },
    searchSim () {
      if (!this.input) {
        return this.$message.warning('请输入正确的数字')
      }
      if (this.input.length !== 13 && this.input.length !== 15 && this.input.length !== 20) {
        return this.$message.warning('输入错误，请输入正确的数字')
      }
      this.isSingle = true
      let that = this
      this.$store.dispatch(types.SEARCH_SIM, this.input).then((res) => {
        that.searchType = ''
        if (res.errorcode === 0) {
          that.tableData = [res.data]
        } else {
          that.tableData = []
          that.$message.error('错误码：' + res.errorcode)
        }
      }).catch((e) => {
        that.$message.error('网络错误')
      })
    },
    loadSuccess (response, file, fileList) {
      this.$message({
        type: 'success',
        message: '停机成功!'
      })
      this.uploadVisible = false
    },
    actionType () {
      this.$refs.upload.submit()
    },
    loadError (err, file, fileList) {
      this.$message.error('文件上传失败')
      console.log(err)
    },
    stop (val1, val2) {
      this.$confirm('此操作将对此SIM卡进行停机处理, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let that = this
        this.$store.dispatch(types.SIM_STATE, { sim: val2.sim, state: 0 }).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData.map(function (item, index, input) {
              if (item.sim === val2.sim) {
                item.sta = '停机'
              }
            })
            that.loading = false
            that.$message.success('停机成功')
          }
        })
      }).catch(() => {
      })
    },
    run (val1, val2) {
      this.$confirm('是否将此SIM卡开机?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let that = this
        this.$store.dispatch(types.SIM_STATE, { sim: val2.sim, state: 1 }).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData.map(function (item, index, input) {
              if (item.sim === val2.sim) {
                item.sta = '正使用'
              }
            })
            that.loading = false
            that.$message.success('开机成功')
          }
        })
      }).catch(() => {
      })
    },
    gpsOpen (val1, val2) {
      this.$confirm('是否将此SIM卡开启流量业务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let that = this
        this.$store.dispatch(types.SIM_FLOW_STATE, { sim: val2.sim, state: 1 }).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData.map(function (item, index, input) {
              if (item.sim === val2.sim) {
                item.gprsopen = 1
              }
            })
            that.loading = false
            that.$message.success('开通流量成功')
          }
        })
      }).catch(() => {
      })
    },
    gpsClose (val1, val2) {
      this.$confirm('是否将此SIM卡关闭流量业务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let that = this
        this.$store.dispatch(types.SIM_FLOW_STATE, { sim: val2.sim, state: 0 }).then(function (res) {
          if (res.errorcode === 0) {
            that.tableData.map(function (item, index, input) {
              if (item.sim === val2.sim) {
                item.gprsopen = 0
              }
            })
            that.loading = false
            that.$message.success('GPRS功能关闭')
          }
        })
      }).catch(() => {
      })
    },
    handleSelectionChange (val) {
      let that = this
      this.selectSim = []
      val.map(function (item, index, input) {
        that.selectSim.push(item.sim)
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      let that = this
      setTimeout(function () {
        if (that.getlist) {
          that.getlist = true
          that.search()
        }
      }, 500)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getlist = false
      this.getList({ page: val, pageno: this.pageSize })
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
      }).catch(function (e) {
        that.$message.error('哇呜！出问题了！')
      })
    },
    show (val) {
      let _times = val.split(' - ')
      this.times = _times[0] + '->' + _times[1]
    },
    setGroup () {
      if (this.selectSim.length !== 0) {
        this.moveVisible = true
      }
    },
    querySearch (queryString, cb) {
      cb(this.simGroups)
    },
    handleSelect (val) {
      this.simGsign = val.label
    },
    moveGroup () {
      if (this.simGroup.length > 0) {
        let that = this
        if (this.simGsign) {
          // 已有分组
          this.$store.dispatch(types.UPDATE_GROUP_SIM, { gsign: this.simGsign, sims: this.selectSim }).then(function (res) {
            if (res.errorcode === 0) {
              that.$message.success('分组成功')
              that.getGroupList()
            } else {
              that.$message.error('分组失败,错误码：' + res.errorcode)
            }
          })
        } else {
          // 新建分组
          this.$store.dispatch(types.ADD_GROUP, { gname: this.simGroup }).then(function (res) {
            if (res.errorcode === 0) {
              that.$store.dispatch(types.UPDATE_GROUP_SIM, { gsign: res.data, sims: that.selectSim }).then(function (response) {
                if (response.errorcode === 0) {
                  that.$message.success('分组成功')
                  that.getGroupList()
                } else {
                  that.$message.error('分组失败,错误码：' + response.errorcode)
                }
              })
            }
          }).catch((e) => {
            console.log(e)
          })
        }
        this.moveVisible = false
      } else {
        this.$message.error('请先选择分组')
      }
    }
  }
}
</script>

<style scoped>
.el-select{
	width: 150px;
}
.el-message-box__wrapper{
	top: -300px;
}
.cardManager{
	padding: 10px 20px 0 20px;
	height: 100%;
}

.search .el-input{
	width:300px;
}
.result{
	width:100%;
	margin: 10px 0 0 0;
}
</style>
