var express = require('express');
var router = express.Router();

// 引入数据库连接模块
const connection = require('./conn')

// 引入jwt
const jwt= require('jsonwebtoken');
// 秘钥
const secretKey = 'itsource';


// 拦截所有请求
router.all('*', (req, res, next) => {
	// 设置响应头解决跨域
	res.setHeader("Access-Control-Allow-Origin", "*"); 
	// 放行
	next()
})

/* 接收添加商品请求： /goodsadd */ 
router.post('/goodsadd', (req, res) => {
	//接收前端数据
	let { classify,barcode,productname,market,price,pcsaleprice,goodsnumber,weight,productunit,members,promotion,desc} = req.body;
	//把数据存入数据库
	//写sql语句
	const sqlStr = `insert into goods(classify,barcode,productname,market,price,pcsaleprice,goodsnumber,weight,productunit,members,promotion,desc) values('${classify}', '${barcode}', '${productname}','${market}','${price}','${pcsaleprice}','${goodsnumber}','${weight}','${productunit}','${members}','${promotion}','${desc}')`;
	//执行sql语句
	console.log(sqlStr);
	connection.query(sqlStr,(err,data) => {
		if(err) throw err;
		// 判断如果影响行数大于0 就是成功 否则就是失败
		if(data.affectedRows > 0){
			// 返回成功的提示信息
			res.send({ code: 0, reason: '添加商品成功' });
		} else {
			// 返回失败的提示信息
			res.send({ code: 1, reason: '添加商品失败' });
		}
	})
	
})


module.exports = router;
