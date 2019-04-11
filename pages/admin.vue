<template>
	<div class="admin_box">
		<div class="admin_tag">
			<div class="admin_tag_add" @click="addTag">新建文集</div>
			<div class="admin_tag_input" v-show="add_tag_show">
				<input type="text" placeholder="请输入文集名..." v-model="add_tag_inpit">
				<div class="admin_tag_input_btn">
					<div @click="submitAddArticle">提 交</div>
					<div @click="add_tag_show = false">取 消</div>
				</div>
			</div>
			<div class="admin_tag_list">
				<div v-for="(v,k) in tag_list" :class="{'admin_tag_list__active': tag_index==k}" @click="handlerTag(v,k)">
					{{v.title}}
				</div>
			</div>
			<div class="admin_tag_opt">
				<p @click="reviseTagName()">改 名</p>
				<p @click="deleteTag()">删 除</p>
			</div>
		</div>
		<div class="admin_list">
			<div class="admin_list_add" @click="addArticle">⊕ 新建文章</div>
			<div class="admin_list_arts">
				<div v-for="(v,k) in art_list" :class="{'admin_list_arts__active': art_index==k}" @click="handlerArt(v,k)">{{v.title}}</div>
			</div>
		</div>
		<div class="admin_detail">
			<el-popover
			  placement="right"
			  width="400"
			  style="position: absolute;top: 40px;right: 20px;"
			  trigger="click">
			  <div>
			  	<p>#一级标题</p>
				<p>###三级标题</p>
				<p>######六级标题</p>
				<p>普通文字</p><br/>
				<p>插入链接</p>
				<p>[百度](www.baiudu.com)</p><br/>
				<p>插入图片</p>
				<p>![图片描述](https://www.baidu.com/xxx.jpg)</p><br/>
				<p>插入代码</p>
				<p>```</p>
				<p>//some code</p>
				<p>```</p><br>
				<p>列表</p>
				<p>无序列表</p>
				<p>- 什么什么什么</p>
				<p>- 什么什么什么2</p>
				<p>- 什么什么3</p><br>
				<p>有序列表</p>
				<p>1. 什么什么1</p>
				<p>2. 什么什么2</p>
				<p>3. 什么什么3</p><br>
				<p>表格</p>
				<p>| 姓名|年龄|电话|</p>
				<p>|-|-|-|</p>
				<p>|大明|12|12332123323|</p>
				<p>|sam|13|12312312313|</p>
				<p>|玲玲|11|13213210451|</p><br>
				<p>引用</p>
				<p>>我是引用哦</p>
			  </div>
			  <el-button slot="reference" style="width: 20px;height: 20px;box-sizing: border-box;padding: 0;border-radius: 100%;">?</el-button>
			</el-popover>
			<div class="admin_detail_tip_save"><i style="margin-right: 9px" v-show="art_save_loading" class="el-icon-loading"></i><span v-show="!art_save_loading" @click="saveArt">保存</span></div>
			<div class="admin_detail_tip_delete" @click="deleteArt">删除</div>
			
			<input type="text" v-model="title">
			<textarea v-model="content"></textarea>
		</div>
	</div>
</template>

<script>
import {tagAdd,tagRetitle,tagDelete,articleAdd,articleList,tagList,articleDetail,articleDelete} from '~/assets/server/index'
import {formatDate} from '~/assets/js/tools'
// import showdown from 'showdown'
// const m2h = new showdown.Converter()
export default {
	data(){
		return {
			tag_index: 1,//tag索引
			art_index: 1,//文章索引
			tag_obj: {},//选中tag的信息
			art_obj: {},//选中文章信息
			add_tag_show: false,
			add_tag_inpit: '',

			art_save_loading: false,//点击保存文章loading

			tag_list: [],
			art_list: [],

			content: '',//文章内容
			title: '',//文章标题

			timer: ''
		}
	},
	watch: {
		
	},
	methods:{
		saveArt() {//保存文章
			
		},
		deleteArt() {//删除文章
			this.$confirm('是否要删除文章： "'+this.art_obj.title+'"？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				articleDelete({
					_id: this.art_obj._id
				}).then(res=>{
					if(!res.code) {
						this.$succ('删除成功!')
						this.handlerTag(this.tag_obj,this.tag_index)
					}
				})
			}).catch(() => {
				
			});
		},
		deleteTag() {//删除标签
			this.$confirm('是否要删除标签： "'+this.tag_obj.title+'"？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				tagDelete({
					_id: this.tag_obj._id,
					title: this.tag_obj.title
				}).then(res=>{
					this.$succ('删除成功！')
					this.getTags()
				})
			}).catch(() => {
				
			});
		},
		reviseTagName() {//修改标签名称
			this.$prompt('修改 "'+this.tag_obj.title+'" 为：', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	        }).then(({ value }) => {
	          tagRetitle({
	          	_id: this.tag_obj._id,
	          	title: value
	          }).then(res=>{
				this.getTags()
	          })
	        }).catch(() => {
	          //点击取消
	        });
		},
		submitContent() {//提交文章修改内容
			articleAdd({
				title: this.title,
				content: this.content,
			}).then(res=>{
				if(!res.code) {
					this.$succ('保存成功！')
				}
			})
		},
		handlerTag(v,k) {//点击文集
			this.tag_index = k
			this.tag_obj = v
			articleList({
				// tag_id: v._id
			}).then(res=>{
				this.art_list =res.data
				setTimeout(()=>{
					this.handlerArt(this.art_list[0],0)
				},10)
			})
		},
		handlerArt(v,k) {//点击文章
			this.art_index = k
			this.art_obj = v
			articleDetail({
				_id: v._id
			}).then(res=>{
				this.content = res.data[0].content
				this.title = res.data[0].title
			})
		},
		addTag() {//新建文集
			this.add_tag_show = true
			this.add_tag_inpit = ''
		},
		submitAddArticle() {//提交新建文集
			//addTag接口,成功关闭提交框,获取tag列表
			tagAdd({
				title: this.add_tag_inpit
			}).then(res=>{
				this.add_tag_show = false
				this.add_tag_inpit = ''
				this.getTags()
			})
		},
		addArticle() {//添加文章
	        this.$prompt('请输入文章标题', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	        }).then(({ value }) => {
	          //点击提交
	          console.log(this.tag_obj)
	          articleAdd({
	          	title: value,
	          	content: '',
	          	tag_id: this.tag_obj._id
	          }).then(res=>{
	          	if(!res.code){
	          		this.handlerTag(this.tag_list[this.tag_index],0)
	          	}
	          })
	        }).catch(() => {
	          //点击取消
	        });
	    },
	    getTags() {
	    	tagList().then(res=>{
	    		this.tag_list = res.data
	    		setTimeout(()=>{
					this.handlerTag(this.tag_list[0],0)
	    		},10)
	    	})
	    },
	    initData() {
			this.getTags()
	    }
	},
	mounted(){
		this.initData()
	}
}
</script>

<style scoped>
.admin_detail_tip_delete {
	position: absolute;
	font-size: 14px;color: #E0786F;
	top: 10px;right: 10px;
	cursor: pointer;
}
.admin_detail_tip_save{
	position: absolute;
	font-size: 14px;color: #4788C4;
	top: 10px;right: 48px;
	cursor: pointer;
}
.admin_detail>textarea{
	border: none;
	border-top: 4px solid #f6f6f6;
	width: 100%;
	height: 80%;
	padding: 12px;box-sizing: border-box;
	outline: none;
	font-size: 18px;
    color: #595959;
    resize: none;
}
.admin_detail>input{
	width: 100%;
    padding: 20px 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 20%;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.admin_detail{
	position: relative;
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
