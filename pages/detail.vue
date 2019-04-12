<template>
	<article class="content">
		<header>{{title}}</header>
		<p>2017-03-22</p>
		<article class="art" v-html="content"></article>
	</article>
</template>

<script>
import {articleDetail} from '~/assets/server/index'
import showdown from 'showdown'
import showdownHighlight from 'showdown-highlight'
const m2h = new showdown.Converter({extensions: [showdownHighlight]})
export default {
	data(){
		return {
			content: '',
			title: ''
		}
	},
	methods:{
		getData() {
			let _id = this.$route.query._id
			articleDetail({
				_id: _id,
			}).then(res=>{
				this.content = m2h.makeHtml(res.data[0].content)
				this.title = res.data[0].title
			})
		}
	},
	mounted(){
		this.getData()
	}
}
</script>

<style scoped>
.art>p{
	line-height: 1.5;
	color: #555;
}
.content>article{
	margin-top: 40px;
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
