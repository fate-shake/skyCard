<template>
	<div class="subaccount" v-loading="loading">
		<div class="accountAction">
			<el-button type="primary" @click="addSubUser = true">添加子账号<i class="el-icon-plus el-icon--right"></i></el-button>
			<el-button type="danger" @click="delSubUser">删除子账号<i class="el-icon-delete el-icon--right"></i></el-button>
			<div class="filterInput">
				<el-input placeholder="筛选账号" v-model="filterString">
			    <el-button slot="append" @click="filter" icon="search"></el-button>
			  </el-input>
			</div>
      <el-dialog
        title="添加子账号"
        :visible.sync="addSubUser"
        size="tiny"
        >
        <el-form label-position="right" label-width="80px" :model="subUser">
          <el-form-item label="账号">
            <el-input v-model="subUser.uid"></el-input>
          </el-form-item>
          <!-- <el-form-item label="备注">
            <el-input v-model="subUser.remark"></el-input>
          </el-form-item> -->
          <el-form-item label="密码">
            <el-input type='password' v-model="subUser.password"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addSubUser = false">取 消</el-button>
          <el-button type="primary" @click="subMitSubUser">确 定</el-button>
        </span>
      </el-dialog>
		</div>
    <!--:style="{height: elTableHight+'px'}"-->
		<div class="accountList">
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
        prop="uid"
        label="账号">
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template scope="scope">
          <el-button type="primary" size="small">备注</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
		</div>
	</div>
</template>

<script>
import * as type from './../../vuex/mutation-type.js'
export default {
  data () {
    return {
      filterString: '',
      addSubUser: false,
      elTableHight: 0,
      resizeAble: false,
      selectedItem: [],
      subUser: {
        uid: '',
        password: '',
        remark: ''
      },
      tableData: [],
      loading: true
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
  created () {
    let that = this
    this.$store.dispatch(type.GET_SUB_USER).then(function (res) {
      that.loading = false
      if (res.errorcode === 0) {
        that.tableData = res.data.arr
      } else {
        that.tableData = []
      }
    }).catch(function (e) {
      console.log(e)
    })
  },
  watch: {
    'addSubUser': function () {
      this.subUser = {
        uid: '',
        remark: '',
        password: ''
      }
    }
  },
  methods: {
    toggleSelection (rows) {
      this.selectedItem = rows
    },
    handleSelectionChange (val) {
      this.selectedItem = val
    },
    subMitSubUser () {
      this.addSubUser = false
    },
    delSubUser () {
      if (this.selectedItem.length > 0) {
        this.$confirm('此操作将删除选中的子账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          showClose: true,
          message: '请先选中至少一条数据',
          type: 'error'
        })
      }
    },
    filter () {
      if (this.filterString.length > 0) {
      }
    }
  }
}
</script>

<style scoped>
.accountAction{
	padding: 20px 50px 15px 10px;
	min-width: 680px;
	overflow: hidden;
}
.filterInput{
	display: inline-block;
	width: 300px;
	padding-left: 10px;
}
.accountList{
	padding: 0 10px;
	overflow: auto;
  text-align: center;
}
</style>
