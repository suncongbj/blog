const router = require('koa-router')()

module.exports = app => {
  router.get('/',(req,res) =>{
  	ctx.response.body = 'Hello World';
  })
}
