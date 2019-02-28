let host = 'localhost'
// host = process.env.NODE_ENV == 'development' ? '127.0.0.1' : '39.105.32.55'

const Sequelize = require('sequelize');

const sequelize = new Sequelize('sun', 'root', 'asui4132508', {
    host: host,
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

export default sequelize