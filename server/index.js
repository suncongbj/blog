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

let article = require('./api/article')

let router = new Router()
router.use(article.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080,()=>{
    console.log('[Server] starting at port 8080')
})