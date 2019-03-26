var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";
const Router = require('koa-router')
let router = new Router()

//密码登录
router.post('/login',async(ctx)=>{
	let params = ctx.request.query
	let obj = {
		table_name: 'user',
	}
	
    ctx.body={
        code: 200,
        msg: 'success',
		data: data,
    }
})