//引入connect
const koa = require('koa')
const app = new koa()
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const {connect} = require('./database/init.js')
const session=require('koa-session');

app.use(cors())
app.use(bodyParser())

;(async () =>{
    await connect()
})()

 app.keys = ['this is my secret and fuck you all'];//我理解为一个加密的钥匙，类似一个token

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 86400000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));


let article = require('./api/article')
let search = require('./api/search')

let router = new Router()

router.use(article.routes())
router.use(search.routes())


app.use(router.routes())
app.use(router.allowedMethods())

app.listen(8080,()=>{
    console.log('[Server] starting at port 8080')
})