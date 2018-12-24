// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const fs = require("fs");
// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next();
    fs.readFile("./index.html", function(err,data){
    	console.log(data)
    })
});

// 在端口3000监听:
app.listen(80);
console.log('app started at port http://localhost:80');