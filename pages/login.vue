<template>
	<div class="login_box">
		<div>
			<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			<el-button type="primary" style="margin-left: 10px;" size="small" @click="handlerLogin">login</el-button>
		</div>
	</div>
</template>

<script>
import {login} from '~/assets/server/index'
import axios from 'axios'
export default {
	data(){
		return {
			password: '',
		}
	},
	methods:{
		handlerLogin() {
			login({
				password: this.password
			}).then(res=>{
				if(!res.code) {
					this.$router.push('/admin')
				}
			})
		}
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
