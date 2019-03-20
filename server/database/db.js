var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
const db_name = 'blog'
const db = {}
//增
// obj={
// 	table_name: 'table_name',
// 	data: {},//插入对象
// }
db.addOne =(obj)=>{
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db(db_name);
	    dbo.collection(obj.table_name).insertOne(obj.data, function(err, res) {
	        if (err) throw err;
	        console.log("文档插入成功");
	        db.close();
	    });
	});
}

//删
// obj={
// 	id: 'id',//id
// 	table_name: 'table_name'//表名
// }
db.delOne = (obj) => {
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db(db_name);
	    var whereStr = {"id": obj._id};  // 查询条件
	    dbo.collection(obj.table_name).deleteOne(whereStr, function(err, obj) {
	        if (err) throw err;
	        console.log("文档删除成功");
	        db.close();
	        return 200
	    });
	});
}

//改
// obj={
// 	id: 'id',
// 	content_name: 'content_name',//修改键值
// 	content: 'content',//新内容
//	table_name: 'table_name', //表名
// }
db.revise = (obj) => {
	MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db(db_name);
	    var whereStr = {"id": obj._id};  // 查询条件
	    var updateStr = {$set: obj.condition};
	    dbo.collection(obj.table_name).updateOne(whereStr, updateStr, function(err, res) {
	        if (err) throw err;
	        console.log("文档更新成功");
	        db.close();
	        return 200
	    });
	});
}

//查
// obj={
// 	table_name: 'table_name', //表名
// 	key: 'key',//查询条件键名
// 	value: 'value',//查询条件键值
// }
db.findOne = (obj)=>{
	return MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db(db_name);
	    return dbo.collection(obj.table_name).find(obj.condition).toArray(function(err, result) {
	        if (err) throw err;
	        db.close();
	        return result;
	    });
	});
}

//分页查询
// obj={
// 	table_name: 'table_name', //表名
// 	page: 0,//页数
// 	limit: 10,//条数
// }
db.findInPage = async(obj) =>{
    MongoClient.connect(url, function(err, db) {
	    if (err) throw err;
	    var dbo = db.db(db_name);
	    dbo.collection(obj.table_name).find().skip(obj.page*obj.limit).limit(obj.limit).toArray(function(err, result) {
	        if (err) throw err;
	        db.close();
	        console.log(result)
	        res=result
	  });
	});
}




module.exports = db