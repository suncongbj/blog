<template>
	<div class="admin_box">
		<div class="admin_tag">
			<div>
				<div class="admin_tag_add">新建文集</div>
				<div class="admin_tag_input">
					<input type="text" placeholder="请输入文集名...">
					<div class="admin_tag_input_btn">
						<div>提 交</div>
						<div>取 消</div>
					</div>
				</div>
			</div>
			<div class="admin_tag_list">
				<div v-for="v in 10" :class="{'admin_tag_list__active': tag_index==v}" @click="handlerTag(v)">
					{{v}}
				</div>
			</div>
			<div class="admin_tag_opt">
				<p>改 名</p>
				<p>删 除</p>
			</div>
		</div>
		<div class="admin_list">
			<div>新建文章</div>
		</div>
		<div class="admin_detail">
			文章详情
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			tag_index: 1
		}
	},
	methods:{
		handlerTag(index) {
			this.tag_index = index
		}
	},
	mounted(){
		
	}
}
</script>

<style scoped>
.admin_tag_opt>p:nth-child(2){
	color: #ec7259
}
.admin_tag_opt>p{
	cursor: pointer;
}
.admin_tag_opt{
	width: 100%;
	min-height: 40px;
	display: flex;justify-content: space-around;align-items: center;
}
.admin_tag_list__active{
	border-left: 3px solid #ec7259;
	padding: 0 12px;
	background: #666
}
.admin_tag_list>div{
	padding: 0 15px;
	line-height: 40px;
	cursor: pointer;
	overflow: hidden;white-space: nowrap;
}
.admin_tag_list>div:hover{
	background: #666
}
.admin_tag_list::-webkit-scrollbar {
	display: none;
}
.admin_tag_list{
	width: 100%;
	margin-top: 20px;
	overflow-y: auto;
}
.admin_tag_input_btn>div:nth-child(1){
	color: #42c02e;
}
.admin_tag_input_btn>div{
	cursor: pointer;
}
.admin_tag_input_btn{
	display: flex;justify-content: space-around;
}
.admin_tag_input>input{
	width: 100%;height: 35px;
    font-size: 14px;line-height: 20px;
    color: #ccc;
    background: #595959;
    border: 1px solid #333;
    padding: 4px 6px;
    margin-bottom: 10px;
    outline: none;
    margin-top: 15px;
}
.admin_tag_input{
	width: 100%;padding: 0 20px;box-sizing: border-box;
}
.admin_tag_add {
	display: flex;justify-content: center;align-items: center;

    font-size: 15px;
    padding: 9px 0;
    margin: 30px auto 0 auto;
    width: 130px;
    color: #ec7259;
    border: 1px solid rgba(236,114,89,.8);
    border-radius: 20px;
    cursor: pointer;
}
.admin_detail {
	flex: 16;
	overflow-y: auto;
}
.admin_list {
	flex: 8;
	overflow-y: scroll;
}
.admin_tag{
	flex: 4;
	display: flex;flex-direction: column;align-items: center;justify-content: space-between;
	position: relative;
	background: #404040;
	color: #f2f2f2;
}
.admin_box{
	display: flex;width: 100%;height: 100%;
}
.admin_box>div{
	height: 100%;
}
</style>
