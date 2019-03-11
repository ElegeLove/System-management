/*连接mysql*/
const mysql = require('mysql');
// 使用mysql模块的方法创建连接对象
const connection = mysql.createConnection({
  // 服务器地址
  host     : 'localhost',
  // mysql的账号
  user     : 'root', 
  // mysql的密码
  password : 'root', 
  // 要连接的数据库的名字
  database : 'smms' 
});
//执行连接
connection.connect(()=>{
	console.log('数据库连接成功！')
});
//暴露出去
module.exports = connection;
