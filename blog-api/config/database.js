let host
host = process.env.NODE_ENV == 'development' ? '127.0.0.1' : '39.105.32.55'
const database = {
	host: host,//数据库地址
    user: 'root',//账号
    password: 'asui4132508',//密码
    database: 'sun',//库名
    multipleStatements: true //允许执行多条语句
}