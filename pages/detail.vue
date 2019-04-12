<template>
	<article class="content">
		<header>{{title}}</header>
		<p>{{ctime}}</p>
		<article v-html="content"></article>
	</article>
</template>

<script>
import {articleDetail} from '~/assets/server/index'
import showdown from 'showdown'
import {formatDate} from '~/assets/js/tools'
import hljs from 'highlight.js/lib/highlight'
import '../node_modules/highlight.js/styles/atom-one-dark.css'
export default {
	data(){
		return {
			content: '',
			title: '',
			ctime: '',
		}
	},
	methods:{
		setHighlight() {
			const preEl = document.querySelectorAll('pre code')
			preEl.forEach((el) => {
				hljs.highlightBlock(el)
			})
		},
		getData() {
			let converter = new showdown.Converter()
			let _id = this.$route.query._id
			articleDetail({
				_id: _id,
			}).then(res=>{
				this.content = converter.makeHtml(res.data[0].content)
				this.title = res.data[0].title
				let stamp = Date.parse(res.data[0].ctime)
				this.ctime = formatDate(stamp,'y')+'-'+formatDate(stamp,'m')+'-'+formatDate(stamp,'d')
				setTimeout(()=>{
					this.setHighlight()
				},10)
			})
		},
	},
	mounted(){
		this.getData()
	}
}
</script>

<style scoped>
.content>article{
	margin-top: 40px;
	color: #555;
	line-height: 2.2;
}
.content>p{
	text-align: center;
	font-size: 14px;
    font-weight: 300;
    margin: -10px auto;
    color: #555;
}
.content>header{
	margin: 40px auto;
	color: #555;
	font-size: 34px;line-height: 1.07885;letter-spacing: -0.016em;font-weight: 200;text-align: center;
}
.content{
	width: 60%;
	margin: 0 auto;
}
@media screen and (max-width: 960px){
	.content{
		width: 90%;
	}
}
</style>
