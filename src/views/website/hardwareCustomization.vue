<template>
	<div class="customized">
		<div>
			<h4>设备定制</h4>
			<div>
				<p>合作案例</p>
				<div>
					
				</div>
			</div>
			<p>也许您除了基础的定位等功能外，还需要温度感应、光照感应、湿度感应、二氧化碳感应等特殊功能，我们的设备提供了基本功能外，可以根据您的需要，加入上述的特殊功能，或者其他功能。留下您的联系方式，或者通过页脚下的联系方式联系我们，我们将竭诚为您服务。</p>
		</div>
		<div style="width: 512px;margin: 0 auto;margin-top: 50px;">
    	<el-form ref="form" :model="form" label-width="100px">
				 <el-form-item label="姓名" required>
				   <el-input v-model="form.name"></el-input>
				 </el-form-item>
				 <el-form-item label="联系方式" required>
				   <el-input v-model="form.information"></el-input>
				 </el-form-item>
				 <el-form-item label="留言" required>
				   <el-input type="textarea" max :rows="6" v-model="form.desc"></el-input>
				 </el-form-item>
				 <el-form-item>
				   <el-button type="primary" @click="onSubmit">发送</el-button>
				 </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        information: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
    }
  }
}
</script>

<style>
.customized{
	width: 1024px;
	margin: 0 auto;
}
p{
	text-indent: 2em;
}
</style>
