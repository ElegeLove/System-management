// 引入jwt验证token 和 设置响应头的模块
const router =  require('./jwt');
// 引入数据库连接模块
const connection = require('./conn')

/* 检测使用户和密码是否正确的路由: /checklogin */ 
router.post('/checklogin', (req, res) => {
	// 接收用户名和密码
	let { account, password } = req.body;
	// 构造sql语句
	const sqlStr = `select * from account where account='${account}' and password='${password}'`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.length) { // 登录成功
			// 对象浅拷贝
			const userInfo = Object.assign({}, data[0]);

			//生成token
			const token = jwt.sign(userInfo, secretKey, {
			    expiresIn:  60 * 60 * 24*3 // token过期时间
			})

			res.send({code: 0, reason: '欢迎你！登录成功', token})
		} else {
			res.send({code: 1, reason: '登录失败，请检查账号或密码'})
		}
	})
})


module.exports = router;
