import dbopt from '../database/db/js'
const Router = require('koa-router')
let router = new Router()

//密码登录
router.post('/login',async(ctx)=>{
	let params = ctx.request.query
	let obj = {
		table_name: 'user',
	}
	let data = await dbopt.findInPage(obj)
    ctx.body={
        code: 200,
        msg: 'success',
		data: data,
    }
})