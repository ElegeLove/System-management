/* 账号管理的路由 */
const express = require('express');
const router = express.Router();

// 引入数据库连接模块
const connection = require('./conn')
// expressJwt 用于验证token的有效性
const expressJwt = require('express-jwt');
// 秘钥
const secretKey = 'itsource';

// 拦截所有请求
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
	res.setHeader("Access-Control-Allow-Origin", "*");  // 允许的域
	res.setHeader("Access-Control-Allow-Headers", "authorization"); // 允许携带的请求头
	// 放行
	next()
})

// 使用中间件验证token合法性
router.use(expressJwt ({
    secret:  secretKey 
}).unless({
    path: ['/login/checklogin']  // 不需要验证token的地址
}))


// 拦截器
router.use(function (err, req, res, next) {
    // 如果用户的请求 没有携带token 那么错误类型是 UnauthorizedError
    if (err.name === 'UnauthorizedError') {   
        // 如果前端请求不带token 返回错误
        res.status(401).send('无效的token...');
    }
})



/* 接收添加账号请求： /accountadd  */
router.post('/accountadd', (req, res) => {
	// 接收前端参数
	let { account, password, userGroup } = req.body;

	// 把数据存入数据库
	// 写sql语句
	const sqlStr = `insert into account(account, password, usergroup) values('${account}', '${password}', '${userGroup}')`;

	// 执行sql语句
	connection.query(sqlStr, (err, data) => {
		if(err) throw err;
		// 判断如果首影响行数大于0 就是成功 否则就是失败
		if(data.affectedRows > 0) {
			// 返回成功的提示信息
			res.send({ code: 0, reason: '添加账号成功' });
		} else {
			// 返回失败的提示信息
			res.send({ code: 1, reason: '添加账号失败' });
		}
	})
})

/* 接收账号列表请求： /accountlist  */
router.get('/accountlist', (req, res) => {
	// 去数据库查询所有数据
	// 写sql语句
	const sqlStr = `select * from account order by ctime desc`; // 根据时间降序
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if(err) throw err;
		// 把查询到的所有账号数据返回给前端
		res.send(data);
	})
})

/*接收删除请求：/accountdel*/
router.get('/accountdel', (req, res) => {
	//接收id
	const { id } = req.query;
	//写sql
	const sqlStr = `delete from account where id=${id}`;
	//执行sql
	connection.query(sqlStr, (err, data) => {
		if(err) throw err;
		//判断
		if(data.affectedRows > 0) {
			//返回成功提示信息
			res.send({ code: 0, reason: '删除账号成功' })
		} else {
			//返回失败的提示信息
			res.send({ code: 1, reason: '删除账号失败' })
		}
	})
})

/*接收修改数据回显的请求：/accountedit*/
router.get('/accountedit', (req, res) => {
	//接收id
	const { id } = req.query;
	//写sql语句
	const sqlStr = `select * from account where id=${id}`;
	//执行sql
	connection.query(sqlStr, (err, data) => {
		if(err) throw err;
		//把查询到的数据返回给前端
		res.send(data[0])
	})
})

/*接收保存修改的请求：/accounteditsave*/
router.post('/accounteditsave', (req, res) => {
	//接收新数据和原来的id
	let { account, usergroup, id } = req.body;

	// 写sql语句
	const sqlStr = `update account set account='${account}', usergroup='${usergroup}' where id=${id}`;
	// 执行sql语句
	connection.query(sqlStr, (err, data) => {
		if(err) throw err;
		// 判断
		if(data.affectedRows > 0) {
			// 返回成功的提示信息
			res.send({ code: 0, reason: '修改账号成功' });
		} else {
			// 返回成功的提示信息
			res.send({ code: 1, reason: '修改账号失败' });
		}
	})
})

/* 接收批量删除请求： /batchesdel */ 
router.get('/batchesdel',(req,res) =>{
	//接收数据
	let { idArr } = req.query;
	//写sql语句
	const sqlStr = `delete from account where id in (${idArr})`;
	//执行sql语句
	connection.query(sqlStr,(err,data)=>{
		if(err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '批量删除成功'})
		} else {
			res.send({code: 1, reason: '批量删除失败'})
		}
	})
})

/* 接收分页请求： /accountlistbypage */ 
router.get('/accountlistbypage',(req,res) => {
	
	//接收分页条件
	let { pageSize,currentPage } = req.query;
	//写sql语句
	let sqlStr = `select * from account order by ctime desc`;
	//执行sql语句
	connection.query(sqlStr,(err,data) => {
		if(err) throw err;
		//数据总条数
		let total = data.length;
		//计算跳过多少条
		let n = (currentPage - 1) * pageSize;
		//写sql语句
		sqlStr += ` limit ${n},${pageSize}`;
		//查询对应页码的数据
		connection.query(sqlStr,(err,data) => {
			if(err) throw err;
			//把数据总条数和每页对应数据给前端
			res.send({total,data});
		})
	})
})

/* 接收获取账号名请求: /accountname */ 
router.get('/accountname', (req, res) => {
	// 当前登录的用户账号信息 验证完token的有效性以后 被设置到了 req.user 中
	// 获取账号名
	const accountName = req.user.account;
	// 返回账号名给前端
	res.send({ accountName }) 
})

/* 验证旧密码: /checkoldpwd */ 
router.get('/checkoldpwd',(req,res) => {
	//接收旧密码
	let {oldPwd} = req.query;
	//判断
	if(oldPwd === req.user.password){
		res.send({code:0,reason:'旧密码正确'})
	}else{
		res.send({code:1,reason:'旧密码错误'})
	}
})

/* 保存新密码: /savenewpassword */ 
router.post('/savenewpassword',(req,res) => {
	// 接收新密码
	let {newpassword} = req.body;
	// 获取当前登录用户的id
	let {id} = req.user
	//写sql语句
	const sqlStr = `update account set password='${newpassword}' where id=${id}`;
	//执行sql语句
	connection.query(sqlStr,(err,data) => {
		if(err) throw err;
		//判断
		if(data.affectedRows > 0){
			res.send({code:0,reason:'密码修改成功请重新登陆'})
		}else{
			res.send({code:1,reason:'密码修改失败'})
		}
	})
})

/*  接收销售数据的请求: /salesdata */ 
router.get('/salesdata', (req, res) => {
	// 准备一份报表数据
	// 写sql语句
	const sqlStr = `select * from sales where ctime between '2019-03-01 00:00:00' and '2019-09-06 16:00:00'`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data) // 把数据返回给前端
	})
})
module.exports = router;