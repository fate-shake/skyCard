<template>
	<div class="userManager"  v-loading.body="loading">
		<div class="userManager-header">
			<el-input placeholder="筛选暂未开通"  :disabled="true" v-model="searchString">
			  <el-button slot="append" @click="" :disabled="true" icon="search"></el-button>
			</el-input>
			<el-button v-if="privilege && privilege.createSon === 1" style="vertical-align: top" type="primary" @click="addVisible = true" >添加用户</el-button>
			<!-- <el-button type="danger" @click="" >删除用户</el-button> -->
		</div>
		<el-dialog
		  title="创建账户"
		  :visible.sync="addVisible"
		  size="tiny"
		  :show-close="false"
		  :before-close="handleClose">
		  <el-form ref="form" :model="subUserForm" label-width="80px">
			  <el-radio-group v-model="subUserForm.type">
		      <el-radio v-if="isRoot" label="管理用户"></el-radio>
		      <el-radio label="财务用户"></el-radio>
		      <el-radio label="基础用户"></el-radio>
		      <!-- <el-radio label="自定义用户"></el-radio> -->
		    </el-radio-group>
		    <div v-if="subUserForm.type === '自定义用户'" style="margin-top: 20px;">
		    	权限选择：<br>
		    	<el-checkbox v-model="subUserForm.power.createSon">创建子账户</el-checkbox>
		    	<el-checkbox v-model="subUserForm.power.ownCard">拥有SIM卡</el-checkbox>
		    	<el-checkbox v-model="subUserForm.power.allotCard">分配SIM卡</el-checkbox>
		    	<el-checkbox v-model="subUserForm.power.checkBill">查询订单</el-checkbox>
		    	<el-checkbox v-model="subUserForm.power.stockCard">入库SIM卡</el-checkbox>
		    </div>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addVisible = false">取 消</el-button>
		    <el-button type="primary" @click="addSubUser">确 定</el-button>
		  </span>
		</el-dialog>
		<div class="userManager-body">
			<el-table
					ref="multipleTable"
		      :data="subUser"
		      stripe
		      border
		      :fit="true"
		      :height="elTableHight"
		      @selection-change="handleSelectionChange"
		      style="text-align: center">
		      <el-table-column
		          prop="uid"
		          label="用户ID">
		      </el-table-column>
		      <el-table-column
		          prop="remark"
		          label="备注">
		      </el-table-column>
		      <!-- <el-table-column
		          prop="uname"
		          label="用户名">
		      </el-table-column> -->
		      <el-table-column label="操作">
		  	    <template scope="scope">
		  	      <el-button type="primary" size="mini" @click="editSubUser(scope.$index, scope.row)">修改备注</el-button>
		  	      <el-button type="primary" size="mini" @click="resetPassword(scope.$index, scope.row)">重置密码</el-button>
              <el-button type="danger" size="mini" @click="removeUser(scope.$index, scope.row)">删除用户</el-button>
		  	    </template>
		      </el-table-column>
		    </el-table>
		    <el-dialog
				  title="修改信息"
				  :visible.sync="editVisible"
				  size="tiny">
				  <span>修改为：</span><el-input :maxlength='32' v-model="remark"></el-input>
				  <span slot="footer" class="dialog-footer">
				    <el-button @click="editVisible = false">取 消</el-button>
				    <el-button type="primary" @click="edit()">确 定</el-button>
				  </span>
				</el-dialog>
        <el-dialog
          title="创建成功"
          :visible.sync="setVisible"
          size="tiny">
          <span>密码为：</span><h1 style="text-align: center">{{  newUserPassword }}</h1>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="setVisible = false">确 定</el-button>
          </span>
        </el-dialog>
				<el-dialog
				  title="重置密码"
				  :visible.sync="passwordVisible"
				  size="tiny">
				  <span>新密码为：</span><h1 style="text-align: center">{{ newPassword }}</h1>
				  <span slot="footer" class="dialog-footer">
				    <el-button type="primary" @click="passwordVisible = false">确 定</el-button>
				  </span>
				</el-dialog>
				<div style="text-align: center">
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
      searchString: '',
      subUser: [],
      isRoot: false,
      privilege: {
        createSon: 1,
        ownCard: 1,
        allotCard: 1,
        checkBill: 1,
        stockCard: 1
      },
      elTableHight: 0,
      currentPage: 1,
      total: 0,
      addVisible: false,
      subUserForm: {
        type: '基础用户',
        power: {
          createSon: false,
          ownCard: false,
          allotCard: false,
          checkBill: false,
          stockCard: false
        }
      },
      loading: false,
      editVisible: false,
      remark: '',
      _remark: '',
      current_user: '',
      pageSize: 20,
      getUser: true,
      newPassword: '########',
      passwordVisible: false,
      setVisible: false,
      newUserPassword: '########'
    }
  },
  created () {
    this.getSubUser({ page: 1, pageno: 20 })
  },
  updated () {
    if (this.$store.state.privilege) {
      this.privilege = this.$store.state.privilege
    }
  },
  mounted: function () {
    let height = document.documentElement.clientHeight
    this.elTableHight = height - 40 - 56 - 40
    let that = this
    window.onresize = function temp () {
      if (!that.resizeAble) {
        that.resizeAble = true
        setTimeout(function () {
          that.elTableHight = document.documentElement.clientHeight - 40 - 56 - 40
          that.resizeAble = false
        }, 500)
      }
    }
  },
  watch: {
    'setVisible': function () {
      if (!this.setVisible) {
        this.getSubUser({ page: 1, pageno: 20 })
      }
    },
    'addVisible': function () {
      if (this.addVisible) {
        if (this.$store.state.usermsg.uid.indexOf('root') >= 0) {
          this.isRoot = true
        } else {
          this.isRoot = false
        }
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
    },
    sizeChange (val) {
      this.pageSize = val
      let that = this
      setTimeout(function () {
        if (that.getUser) {
          that.getSubUser({ page: that.currentPage, pageno: val })
        }
      }, 500)
    },
    currentChange (val) {
      this.currentPage = val
      this.getUser = false
      this.getSubUser({ page: val, pageno: this.pageSize })
    },
    getSubUser (val) {
      this.loading = true
      let that = this
      this.$store.dispatch(types.GET_SUB_USER, val).then((res) => {
        if (res.errorcode === 0) {
          that.subUser = res.data.arr
          that.total = res.data.num
        }
        that.loading = false
      }).catch(function (e) {
        that.loading = false
        that.$message.error('网络连接失败')
      })
    },
    handleClose () {
    },
    addSubUser () {
      this.addVisible = false
      this.loading = true
      let data = {}
      if (this.subUserForm.type === '自定义用户') {
        data.type = 'dy'
        data.privilege = {
          createSon: this.subUserForm.power.createSon ? 1 : 0,
          ownCard: this.subUserForm.power.ownCard ? 1 : 0,
          allotCard: this.subUserForm.power.allotCard ? 1 : 0,
          checkBill: this.subUserForm.power.checkBill ? 1 : 0,
          stockCard: this.subUserForm.power.stockCard ? 1 : 0
        }
      } else {
        switch (this.subUserForm.type) {
          case '管理用户':
            data.type = 'gl'
            break
          case '财务用户':
            data.type = 'zw'
            break
          case '基础用户':
            data.type = 'jc'
            break
          default:
            data.type = 'jc'
        }
      }
      let that = this
      this.$store.dispatch(types.ADD_SUB_USER, data).then((res) => {
        that.loading = false
        if (res.errorcode === 0) {
          that.newUserPassword = res.data.pw
          that.setVisible = true
        } else {
          that.$message.error('创建子账户失败，错误码：' + res.errorcode)
        }
      })
    },
    editSubUser (val1, val2) {
      this.editVisible = true
      this._remark = val2.remark
      this.remark = val2.remark
      this.current_user = val2.uid
    },
    edit () {
      this.editVisible = false
      this.loading = true
      if (this._remark !== this.remark) {
        let that = this
        this.$store.dispatch(types.EDIT_REMARK, { son: this.current_user, remark: this.remark }).then((res) => {
          that.loading = false
          if (res.errorcode === 0) {
            that.$message.success('修改成功')
            that.getSubUser({ page: 1, pageno: 20 })
          } else {
            that.$message.error('修改失败，错误码：' + res.errorcode)
          }
        })
      }
    },
    resetPassword (val1, val2) {
      this.$confirm('是否重置此账号密码?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let that = this
        this.$store.dispatch(types.RESETPASSWORD, { son: val2.uid }).then(function (res) {
          that.loading = false
          if (res.errorcode === 0) {
            that.newPassword = res.data
            that.passwordVisible = true
          } else {
            that.$message.error('重置密码失败')
          }
        })
      }).catch(() => {
      })
    },
    removeUser (val1, val2) {
      this.$confirm('是否删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        let that = this
        this.$store.dispatch(types.REMOVE_USER, { uid: val2.uid }).then(function (res) {
          that.loading = false
          if (res.errorcode === 0) {
            that.getSubUser()
            that.$message.success('删除成功')
          } else {
            that.$message.error('删除失败')
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.userManager{
	padding: 10px;
}
.userManager-header{
	margin-bottom: 10px;
}
.userManager-header .el-input{
	width: 300px;
}
/*.userManager-body{
	text-align: center;
}*/
</style>
