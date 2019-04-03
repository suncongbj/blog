var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";
const Router = require('koa-router')
let router = new Router()

//密码登录
router.post('/login',async(ctx)=>{
	console.log('body@@@'+ctx.request.body)
	console.log('query@@@'+ctx.request.query)
	if(ctx.request.body.password == 'asui4132508') {
		ctx.session.password = 'asui4132508'
		ctx.body={
	        code: 0,
	        msg: 'welcome',
	    }
	}else{
		ctx.session.password = ''
		ctx.body={
	        code: 1,
	        msg: 'wrong password',
	    }
	}
})

module.exports = router