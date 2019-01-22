<template>
	<article class="content">
		<header>我是文章标题</header>
		<p>2017-03-22</p>
		<article>
			这里插入富文本编辑器内容
		</article>
	</article>
</template>

<script>
export default {
	layout: 'box',
	data(){
		return {

		}
	},
	methods:{

	},
	mounted(){

	}
}
</script>

<style scoped>
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
		width: 98%;
	}
}
</style>
