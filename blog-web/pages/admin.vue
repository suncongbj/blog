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
				<div v-for="v in 20" :class="{'admin_tag_list__active': tag_index==v}" @click="handlerTag(v)">
					{{v}}
				</div>
			</div>
			<div class="admin_tag_opt">
				<p>改 名</p>
				<p>删 除</p>
			</div>
		</div>
		<div class="admin_list">
			<div class="admin_list_add">⊕ 新建文章</div>
			<div class="admin_list_arts">
				<div v-for="v in 10" :class="{'admin_list_arts__active': art_index==v}" @click="handlerArt(v)">{{v}}</div>
			</div>
		</div>
		<div class="admin_detail">
			<input type="text">
			<div id="editor">
		        <p>欢迎使用 <b>wangEditor</b> 富文本编辑器</p>
		    </div>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return {
			tag_index: 1,
			art_index: 1,
		}
	},
	methods:{
		handlerTag(index) {
			this.tag_index = index
		},
		handlerArt(index) {
			this.art_index = index
		},
		initEditor() {
			var E = window.wangEditor
	        var editor = new E('#editor')
	        editor.customConfig.colors = [
		        '#555',
		        '#eeece0',
		        '#1c487f',
		        '#4d80bf',
		        '#c24f4a',
		        '#8baa4a',
		        '#7b5ba1',
		        '#46acc8',
		        '#f9963b',
		        '#ffffff'
		    ]
		    editor.customConfig.menus = [
			    'foreColor',  // 文字颜色
			    'fontSize',  // 字号
			    'code',  // 插入代码
			    'quote',  // 引用
			    'emoticon',  //表情
			    'bold',  // 粗体
			    'fontName',  // 字体
			    'italic',  // 斜体
			    'link',  // 插入链接
			    'image',  // 插入图片
			    'video',  // 插入视频
			    'undo',  // 撤销
			]
	        editor.create()
		},
	},
	mounted(){
		this.initEditor()
	}
}
</script>

<style scoped>
.admin_detail>input{
	width: 100%;
    padding: 20px 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.admin_list_arts__active{
	border-left: 3px solid #ec7259 !important;
}
.admin_list_arts>div:hover{
	background-color: #e6e6e6;
}
.admin_list_arts>div{
    height: 90px;
    color: #595959;
    background-color: #fff;
    margin-bottom: 0;
    padding: 15px 10px 15px 20px;
    -webkit-box-shadow: 0 0 0 1px #d9d9d9;
    box-shadow: 0 0 0 1px #d9d9d9;
    border-left: 5px solid transparent;
    list-style: none;
    line-height: 60px;    
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
}
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
	max-width: 100%;
	cursor: pointer;
	overflow: hidden;white-space: nowrap;text-overflow: ellipsis;
}
.admin_tag_list>div:hover{
	background: #666
}
.admin_tag_list::-webkit-scrollbar {
	display: none;
}
.admin_tag_list{
	width: 100%;height: 100%;
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
.admin_list_add{
	line-height: 20px;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0 20px 25px;
    cursor: pointer;
    color: #595959;
}
.admin_list {
	flex: 8;
	overflow-y: scroll;
}
.admin_tag>div:nth-child(1){
	min-height: 154px;
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
