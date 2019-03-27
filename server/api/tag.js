var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";
const Router = require('koa-router')
let router = new Router()

//获取文章分类列表
router.get('/tag/list',async(ctx)=>{
	let getList = () => {
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, function(err, db) {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    dbo.collection('tag').find().toArray(function(err, result) {
			        if (err) throw err;
			        db.close();
			        console.log(result)
			        resolve(result)
			  });
			});
		})
	}
	let data = await getList()
	ctx.body={
	    code: 0,
	    msg: 'success',
		data: data,
	}
})
//新建标签
router.post('/tag/add',async (ctx)=>{
	let params = ctx.request.query
	console.log(ctx.session.password)
	if(!ctx.session.password){
		ctx.body={
	        code: 2,
	        msg: '无此权限',
	    }
	    return
	}
	let p = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url , (err,db)=>{
				if (err) throw err
				let dbo = db.db('blog');
				dbo.collection('tag').insertOne(params, function(err, result) {
			        if (err) throw err
			        console.log("文档插入成功");
			    	resolve('新建标签成功')
			        db.close();
			    });
			})
		})
	}
	let msg = await p()
	ctx.body={
		code: 0,
        msg: msg,
	}
})
//修改标签名称
router.post('/tag/rearticle',async(ctx)=>{
	let params = ctx.request.query
	console.log(ctx.session.password)
	if(!ctx.session.password){
		ctx.body={
	        code: 2,
	        msg: '无此权限',
	    }
	    return
	}
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db('blog');
	    var whereStr = {"id": ObjectId(params._id)};  // 查询条件
	    var updateStr = {$set: {title: params.title}};
	    dbo.collection('tag').updateOne(whereStr, updateStr, function(err, result) {
	        if (err) throw err;
	        console.log("文档更新成功");
	        db.close();
	        return 0
	    });
	});
    ctx.body={
        code: 0,
        msg: 'success',
    }
})
module.exports = router