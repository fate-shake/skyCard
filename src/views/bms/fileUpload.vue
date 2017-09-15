<template>
	<div>
		<div><p>物联网卡批量上传</p></div>
		<div class="loadContainer">
			<el-form ref="form" :model="subUser">
			  <el-form-item label="分配给用户：">
			    <el-input v-model="subUser.uid" placeholder="若填写下级账号则直接分配到下级账号"></el-input>
			  </el-form-item>
			  <span style="color:red">若是需要分配给下级账户必须先填写再选择文件</span>
			</el-form>
			<el-upload
			  class="upload-demo"
			  drag
			  action="/card/file"
			  list-type="text"
			  :data="subUser"
			  :show-file-list='true'
			  :on-success="loadSuccess"
			  :on-error="loadError">
			  <i class="el-icon-upload"></i>
			  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			  <!-- <div class="el-upload__tip" slot="tip">只能上传<span style="color: red">excel</span>文件</div> -->
			</el-upload>
			  <p style="color:red">选择文件之后会直接上传服务器</p>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      subUser: {
        uid: ''
      }
    }
  },
  methods: {
    loadSuccess (response, file, filelist) {
      if (response.errorcode === 0) {
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败')
      }
    },
    loadError () {
      this.$message.error('上传失败')
    }
  }
}
</script>

<style scoped>
.el-input{
	width: 400px;
}
.el-form-item{
	margin-bottom: 0;
}
p{
	margin: 0;
	padding: 0 20px;
	font-size: 24px;
	height: 40px;
	line-height: 40px;
}
.loadContainer{
	width:500px;
	margin: 0 auto;
	text-align: center;
}
</style>
