var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";
const Router = require('koa-router')
let router = new Router()
//获取文章列表接口，分页，分类
router.get('/article/list',async(ctx)=>{
	let params = ctx.request.query
	console.log(params)
	let getList = () => {
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, function(err, db) {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    if(params.tag_id) {
			    	console.log('get with tag_id')
					let whereStr = {'tag_id' : ObjectId(params.tag_id)}
					dbo.collection('article').find(whereStr).toArray(function(err, result) {
				        if (err) throw err;
				        db.close();
				        console.log(result)
				        resolve(result)
				    });
			    }else{
			    	console.log('get whth page')
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
	console.log(params)
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
//根据_id修改文章
router.post('/article/reset',async(ctx)=>{
	let params = ctx.request.body
	console.log(params)
	if(!ctx.session.password){
		ctx.body={
	        code: 2,
	        msg: '无此权限',
	    }
	    return
	}
	let reset = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, function(err, db) {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    var whereStr = {"_id": ObjectId(params._id)};  // 查询条件
			    var updateStr = {$set: {
			    		'content': params.content,
			    		'title': params.title,
			    	}
			    };
			    dbo.collection('article').updateOne(whereStr, updateStr, function(err, result) {
			        if (err) throw err;
			        resolve("文档更新成功")
			        db.close();
			    });
			});
		})
	}
	let msg = await reset()
    ctx.body={
        code: 0,
        msg: msg,
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
			tag_id: ObjectId(params.tag_id),
			content: params.content,
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
	let p = () =>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, function(err, db) {
			    if (err) {
			    	reject({
			    		code: 1,
			    		msg: err
			    	})
			    	throw err
			    };
			    var dbo = db.db('blog');
			    var whereStr = {"_id": ObjectId(params._id)};  // 查询条件
			    dbo.collection("article").deleteOne(whereStr, function(err, obj) {
			        if (err) {
			        	reject({
			        		code: 1,
			        		msg: err
			        	})
			        	throw err
			        };
			        resolve({
			        	code: 0,
			        	msg: '文档删除成功！'
			        })
			        db.close();
			    });
			});
		})
	}
	ctx.body = await p()
	
})
//搜索文章
router.post('/article/search',async(ctx)=>{
	let params = ctx.request.body
	let p = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url , function(err,db) {
				if(err){
					reject({
						code: 1,
						msg: err
					})
					throw err
				}
				let dbo = db.db('blog')
				dbo.collection('article').find('title':{$regex:{req.query.key}},(err,request)=>{
					if(err) {
						reject({
							code: 1,
							msg: err
						})
						throw err
					}
					resolve({
						code: 0,
						msg: ''
					})
					db.close()
				})
			})
		})
	}
	ctx.body = await p()
})
module.exports = router