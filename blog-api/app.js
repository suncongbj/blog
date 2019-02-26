const koa = require('koa')
const app = new koa()
const middleWare = require('./middleware')
const router = require('./router')
middleWare(app)
router(app)

app.listen(80, () => {
  console.log('server is running at http://localhost:3000')
})