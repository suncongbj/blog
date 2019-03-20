<template>
	<div class="login_box">
		<div>
			<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			<el-button type="primary" style="margin-left: 10px;" size="small">login</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			password: '',
		}
	},
	methods:{

	},
	mounted(){
		
	}
}
</script>

<style scoped>
.login_box{
	display: flex;justify-content: center;align-items: center;
	width: 100%;height: 100%;
}
.login_box>div{
	display: flex;
}
</style>
