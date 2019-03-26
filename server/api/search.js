var MongoClient = require('mongodb').MongoClient;
ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost:27017";
const Router = require('koa-router')
let router = new Router()

//搜索联想接口
router.get('/search',async(ctx)=>{
	let params = ctx.request.query
	let getList = ()=>{
		return new Promise((resolve,reject)=>{
			MongoClient.connect(url, (err, db) => {
			    if (err) throw err;
			    var dbo = db.db('blog');
			    dbo.collection('article').find({"title": new RegExp(params.key)}).toArray( (err, result) => {
			        if (err) reject(err);
			        db.close();
			        console.log(result);
			        resolve(result)
			    });
			});
		})
	}
	let data = await getList()
    ctx.body={
        code: 200,
        msg: 'success',
        data: data
    }
})

module.exports = router