var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";
const Router = require('koa-router')
let router = new Router()
//获取文章列表接口，分页，分类
router.get('/article/list',async(ctx)=>{
	let params = ctx.request.query
	let getList = () => {
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, function(err, db) {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    if(params.tag_id) {
					dbo.collection('article').find({"tag_id" : ObjectId(params.tag_id)}).toArray(function(err, result) {
				        if (err) throw err;
				        db.close();
				        console.log(result)
				        resolve(result)
				    });
			    }else{
					dbo.collection('article').find().skip((params.page-1)*30).limit(30).toArray(function(err, result) {
				        if (err) throw err;
				        db.close();
				        console.log(result)
				        resolve(result)
				    });
			    }
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
//根据文章id获取文章详情接口
router.get('/article/detail',async(ctx)=>{
	let params = ctx.request.query
	let getDetail = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, (err, db) => {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    dbo.collection('article').find({"_id" : ObjectId(params._id)}).toArray( (err, result) => {
			        if (err) reject(err);
			        db.close();
			        console.log(result);
			        resolve(result)
			    });
			});
		})
	}
	let data = await getDetail()
    ctx.body={
        code: 0,
        msg: 'success',
        data: data
    }
})
//根据_id修改文章标题
router.post('/article/retitle',async(ctx)=>{
	let params = ctx.request.body
	if(!ctx.session.password){
		ctx.body={
	        code: 2,
	        msg: '无此权限',
	    }
	    return
	}
	let resetTit = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, function(err, db) {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    var whereStr = {"_id": ObjectId(params._id)};  // 查询条件
			    var updateStr = {$set: {title: params.title}};
			    dbo.collection('article').updateOne(whereStr, updateStr, function(err, result) {
			        if (err) throw err;
			        resolve("文档更新成功")
			        db.close();
			    });
			});
		})
	}
	let msg = await resetTit()
    ctx.body={
        code: 0,
        msg: msg,
    }
})
//根据id修改文章内容
router.post('/article/rearticle',async(ctx)=>{
	let params = ctx.request.body
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db('blog');
	    var whereStr = {"_id": ObjectId(params._id)};  // 查询条件
	    var updateStr = {$set: {content_md: params.content_md,content_html: params.content_html}};
	    dbo.collection('article').updateOne(whereStr, updateStr, function(err, result) {
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
//提交文章
router.post('/article/add',async(ctx)=>{
	let params = ctx.request.body
	if(!ctx.session.password){
		ctx.body={
	        code: 2,
	        msg: '无此权限',
	    }
	    return
	}
	let obj = {
			title: params.title,
			tag_id: params.tag_id,
			content_html: params.content_html,
			content_md: params.content_md,
			ctime: new Date(),
	}
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db('blog');
	    dbo.collection('article').insertOne(obj, function(err, result) {
	        if (err) throw err
	        console.log("文档插入成功");
	        db.close();
	        
	    });
	});
	ctx.body = {
		code: 0,
		msg: 'succ',
	}
})
//删除文章
router.post('/article/delete',async(ctx)=>{
	let params = ctx.request.body
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
	    var whereStr = {"_id": ObjectId(params._id)};  // 查询条件
	    dbo.collection("article").deleteOne(whereStr, function(err, obj) {
	        if (err) throw err;
	        console.log("文档删除成功");
	        db.close();
	    });
	});
})
module.exports = router