//引入connect
const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const {connect} = require('./database/init.js')

app.use(cors())
app.use(bodyParser())

;(async () =>{
    await connect()
})()

let router = new Router()

router.get('/test',async(ctx)=>{
    ctx.body={
        code:200,
        message:'注册成功'
    }
})

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000,()=>{
    console.log('[Server] starting at port 3000')
})