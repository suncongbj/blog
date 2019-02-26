const router = require('koa-router')()

module.exports = app => {
  router.get('/', Controller.hello) // 注意是在controller编写的hello函数
}
