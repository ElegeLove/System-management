// 引入jwt验证token 和 设置响应头的模块解决跨域
const router =  require('./jwt');
// 引入数据库连接模块
const connection = require('./conn')

/* 接收添加商品请求： /goodsadd */ 
router.post('/goodsadd', (req, res) => {
	//接收前端数据
	let { classify,barcode,productname,pcsaleprice,price,market,goodsnumber,weight,productunit,members,promotion,goodsdesc} = req.body;
	//把数据存入数据库
	//写sql语句
	const sqlStr = `insert into goods(classify,barcode,productname,pcsaleprice,price,market,goodsnumber,weight,productunit,members,promotion,goodsdesc) values(?,?,?,?,?,?,?,?,?,?,?,?)`;
	const sqlvul = [classify,barcode,productname,pcsaleprice,price,market,goodsnumber,weight,productunit,members,promotion,goodsdesc];
	//执行sql语句
	
	connection.query(sqlStr,sqlvul,(err,data) => {
		console.log(sqlStr);
		console.log(data);
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


/* 商品列表 */ 
router.get('/goodslist', (req, res) => {
	// 去数据库查询所有数据
	// 写sql语句
	const sqlStr = `select * from goods order by ctime desc`; // 根据时间降序
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data); // 把查询到的所有账号数据返回给前端
	})
})


/* 商品搜索查询 */ 
router.get('/search', (req, res) => {
	// 接收查询条件
	let { classify, keyWord } = req.query;

	// 写sql语句
	let sqlStr = `select * from goods where 1=1`;

	// 分类条件（如果不等于全部 和 不等于空 才拼接）
	if (classify !== '全部' && classify !== '') {
		sqlStr += ` and classify='${classify}'`;
	}

	// 关键字条件(不等于空才拼接条件)
	if (keyWord !== '') {
		sqlStr += ` and (goodsName like '%${keyWord}%' or barCode like '%${keyWord}%')`;
	}

	// 拼接排序
	sqlStr += ` order by ctime desc`;

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		res.send(data)
	})
})

/* 接收删除请求： /goodsdel */ 
router.get('/goodsdel', (req, res) => {
	// 接收id
	const { id } = req.query;
	// 写sql语句
	const sqlStr = `delete from goods where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			// 返回成功的提示信息
			res.send({code: 0, reason: '删除账号成功'});
		} else {
			// 返回成功的提示信息
			res.send({code: 1, reason: '删除账号失败'});
		}
	})
})

/* 接收修改数据回显的请求: /accountedit */ 
router.get('/goodsedit', (req, res) => {
	// 接收id
	const { id } = req.query;

	// 写sql语句
	const sqlStr = `select * from goods where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send(data[0]) // 把查询到的数据返回给前端
	})
})

/* 接收保存修改的请求： /accounteditsave */ 
router.post('/goodseditsave', (req, res) => {
	// 接收新数据和原来的id
	let { barcode,productname,classify,market,promotion,id } = req.body;

	// 写sql语句
	const sqlStr = `update goods set barcode='${barcode}', productname='${productname}', classify='${classify}', market='${market}', promotion='${promotion}' where id=${id}`;
	console.log(sqlStr)
	// 执行sql语句
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			// 返回成功的提示信息
			res.send({code: 0, reason: '修改账号成功'});
		} else {
			// 返回成功的提示信息
			res.send({code: 1, reason: '修改账号失败'});
		}
	})
})


/* 商品分页 */ 
router.get('/goodslistbypage', (req, res) => {
	// 接收分页条件 和 查询条件
	let { pageSize, currentPage,  classify, keyWord } = req.query;

	// 写sql语句
	let sqlStr = `select * from goods where 1=1`;

	// 执行sql语句
	let total; // 数据总条数

	// 分类条件（如果不等于全部 和 不等于空 才拼接）
	if (classify !== '全部' && classify !== '') {
		sqlStr += ` and classify='${classify}'`;
	}

	// 关键字条件(不等于空才拼接条件)
	if (keyWord !== '') {
		sqlStr += ` and (productname like '%${keyWord}%' or barCode like '%${keyWord}%')`;
	}

	// 再次以拼接后的 sql查询数据库
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length;  // 按照查询的结果 
	})

	// 拼接排序
	sqlStr += ` order by ctime desc`;

	// 计算跳过多少条
	let n = (currentPage - 1) * pageSize;

	// 写sql语句
	sqlStr += ` limit ${n}, ${pageSize}`;

	// 查询对应页码的数据
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({total, data}); // 把数据总条数和每页对应数据给前端
	});
})


module.exports = router;
