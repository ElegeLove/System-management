<template>
    <div class="goods-manage">
       <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" class="clearfix">
                <span>商品管理</span>
            </div>
            <!-- 面板内容 -->
            <div class="text item">
                <!-- 商品查询 -->
                <div>
                    <el-form  size="small" :inline="true" :model="searchForm" class="demo-form-inline">
                      
                        <el-form-item label="分类">
                            <el-select v-model="searchForm.classify" placeholder="请选择分类">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="电子类" value="电子类"></el-option>
                                <el-option label="蔬菜类" value="蔬菜类"></el-option>
                                <el-option label="生活用品类" value="生活用品类"></el-option>
                                <el-option label="烟酒类" value="烟酒类"></el-option>
                                <el-option label="服装类" value="服装类"></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="关键字">
                            <el-input v-model="searchForm.keyWord" placeholder="商品名称或条形码"></el-input>
                        </el-form-item>


                        <el-form-item>
                            <el-button type="primary" @click="search">查询</el-button>
                        </el-form-item>
                    </el-form>
                </div>

               <!-- 账号管理表格 -->
                <el-table
                    ref="goodsTableData"
                    :data="goodsTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    >
                    <!-- 选择框 -->
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>

                    <!-- 商品条形码 -->
                    <el-table-column
                        prop="barcode"
                        label="商品条形码">
                    </el-table-column>

                    <!-- 商品名称 -->
                    <el-table-column
                        prop="productname"
                        label="商品名称">
                    </el-table-column>

                    <!-- 所属分类 -->
                    <el-table-column
                        prop="classify"
                        label="所属分类">
                    </el-table-column>

                    <!-- 售价 -->
                    <el-table-column
                        prop="market"
                        label="售价">
                    </el-table-column>

                    <!-- 是否促销 -->
                    <el-table-column
                        prop="promotion"
                        label="是否促销">
                    </el-table-column>

                    <!-- 日期 -->
                    <el-table-column
                        label="日期"
                        >
                        <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
                    </el-table-column>
                    <!-- 操作 -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button 
                                size="mini"
                                 type="primary"
                                 @click="handleEdit( scope.row.id )"
                                 >
                                <i class="el-icon-edit" ></i>
                            </el-button>
                            <el-button 
                                size="mini"
                                type="danger" 
                                @click="handleDelete( scope.row.id )">
                                <i class="el-icon-delete"></i> 
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>

                <!-- 分页 -->
                <div style="margin-top: 20px;">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[1, 3, 5, 10, 30]"
                        :page-size="3"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>

                <!-- 批量删除按钮 -->
                <div style="margin-top: 20px;">
                    <el-button @click="batchesdel" type='danger'>批量删除</el-button>
                    <el-button @click="cancelSelect" type='primary'>取消选择</el-button>
                </div>

                <!-- 模态框 -->
                <el-dialog width="400px" title="商品信息修改" :visible.sync="dialogFormVisible">
                    <!-- 表格 -->
                    <el-form :model="goodsEditForm" style="width: 320px;">
                    	
                        <!-- 条形码 -->
                        <el-form-item label="条形码" :label-width="formLabelWidth">
                            <el-input v-model="goodsEditForm.barcode" autocomplete="off"></el-input>
                        </el-form-item>
                        
                        <!--商品名称-->
                        <el-form-item label="商品名称" :label-width="formLabelWidth">
                            <el-input v-model="goodsEditForm.productname" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 所属分类 -->
                        <el-form-item label="所属分类" :label-width="formLabelWidth">
                            <el-select v-model="goodsEditForm.classify" placeholder="请选择所属分类">
                                <el-option label="全部" value="全部"></el-option>
                                <el-option label="电子类" value="电子类"></el-option>
                                <el-option label="蔬菜类" value="蔬菜类"></el-option>
                                <el-option label="生活用品类" value="生活用品类"></el-option>
                                <el-option label="烟酒类" value="烟酒类"></el-option>
                                <el-option label="服装类" value="服装类"></el-option>
                            </el-select>
                        </el-form-item>
                        
                        <!--售价-->
                        <el-form-item label="售价" :label-width="formLabelWidth">
                            <el-input v-model="goodsEditForm.market" autocomplete="off"></el-input>
                        </el-form-item>

                        <!-- 是否促销 -->
                        <el-form-item label="是否促销" :label-width="formLabelWidth">
                            <el-select v-model="goodsEditForm.promotion" placeholder="是否促销">
                                <el-option label="促销" value="促销"></el-option>
                                <el-option label="未促销" value="未促销"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <!-- 尾部 -->
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="saveEdit">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </el-card>
    </div>
</template>
<script>
// 引入日期格式化模块moment
import moment from 'moment'

export default {
    data () {
        return {
            goodsTableData: [], // 商品表格数据
            searchForm: {  // 查询表单
                classify: '',
                keyWord: ''
            },
            // 修改模态框
            goodsEditForm: {
            	barcode:'',
            	productname:'',
            	classify:'',
            	market:'',
            	promotion:''
            }, 
            // 需要修改的数据的id
			editId: 0, 
            // 选中的id数组
			selectedId: [],
            currentPage: 1, // 当前页
            pageSize: 3, // 每页条数
            total: 0, // 数据总条数
            dialogFormVisible: false, // 模态框是否显示
            formLabelWidth: '120px' // 标签宽度
        }
    },
    methods: {
        // 请求所有商品数据
        // getGoodsList() {
        //     this.req.get('/goods/goodslist')
        //         .then(res => {
        //             // 赋值给accountTableData 渲染表格
        //             this.goodsTableData = res
        //         })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },

        // 按照分页显示商品数据
        getGoodsListByPage () {
            // 收集参数（每页多少条 和 当前页码）
            let params = {
                pageSize: this.pageSize,
                currentPage: this.currentPage,
                classify: this.searchForm.classify,
                keyWord: this.searchForm.keyWord
            }
            // 发送请求给后端 把分页条件发送给后端
            this.req.get('/goods/goodslistbypage', params)
                .then(res => {
                    // 接收数据
                    let { total, data } = res;
                    // 赋值给对应变量
                    this.total = total
                    this.goodsTableData = data

                    // 如果数据为空 （优化 当当前页码数据为空 跳转到上一页）
                    if (!data.length && this.currentPage !== 1) {
                        this.currentPage -= 1;  // 当前页码自减1
                        this.getGoodsListByPage(); // 再次请求数据
                    }
                })
                .catch(err => {
                    console.log(err)
                })

        },
        // 查询函数
        search () { 
            // 调用分页函数
            this.getGoodsListByPage();

            // 收集查询条件
            // let params = {
            //     classify: this.searchForm.classify,
            //     keyWord: this.searchForm.keyWord
            // }

            // 发送请求给后端
            // this.req.get('/goods/search', params)
            //     .then(res => {
            //         this.goodsTableData = res; // 把查询结果赋值给表格渲染
            //     })
            //     .catch(err => {

            //     })
        },
        handleSizeChange (val) { // 当每页显示条数改变
            this.pageSize = val; 
            this.getGoodsListByPage(); // 调用分页函数
        },
        handleCurrentChange (val) { // 当前页码改变
            this.currentPage = val;
            this.getGoodsListByPage(); // 调用分页函数
        },
        
    	// 删除函数
		handleDelete(id) {
			// 优化删除体验
			this.$confirm('是否确定删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			})
			.then(() => { // 确定
				// 发送删除请求给后端
				this.req.get('/goods/goodsdel', { id })
				.then(res => {
					console.log(res)
					// 接收后端返回的数据
					let { code, reason } = res;
					// 判断
					if(code === 0) {
						// 弹出成功提示
						this.$message({
							type: 'success',
							message: reason
						})
						// 刷新列表数据
						this.getGoodsListByPage();

					} else if(code === 1) {
						this.$message.error(reason)
					}
				})
				.catch(err => {
					console.log(err)
				})

			})
			.catch(() => { // 取消
				this.$message({
					type: 'info',
					message: '已取消删除'
				});
			});
		},
		
		// 修改(编辑)
		handleEdit(id) {
			// 显示模态框
			this.dialogFormVisible = true;

			// 保留要修改这一条数据的id
			this.editId = id;

			// 发送请求 把id发送给后端
			this.req.get('/goods/goodsedit', { id })
			.then(res => {
				console.log(res);
				// 接收后端数据
				let { barcode,productname,classify,market,promotion } = res;
				// 回填表单
				this.goodsEditForm.barcode = barcode;
				this.goodsEditForm.productname = productname;
				this.goodsEditForm.classify = classify;
				this.goodsEditForm.market = market;
				this.goodsEditForm.promotion = promotion;
			})
			.catch(err => {
				console.log(err)
			})
		},
		// 保存修改
		saveEdit() {
			// 关闭模态框
			this.dialogFormVisible = false;
			// 收集修改后的新数据和原来的id
			let params = {
				barcode:this.goodsEditForm.barcode,
				productname:this.goodsEditForm.productname,
				classify:this.goodsEditForm.classify,
				market:this.goodsEditForm.market,
				promotion:this.goodsEditForm.promotion,
				id: this.editId
			}

			// 把新数据和老id一起发送给后端
			this.req.post('/goods/goodseditsave', params)
			.then(res => {
				// 接收后端数据
				let { code, reason } = res;
				// 判断
				if(code === 0) {
					// 弹成功提示
					this.$message({
						type: 'success',
						message: reason
					})
					// 刷列表
					this.getGoodsListByPage();

				} else if(code === 1) {
					// 弹失败提示
					this.$message.error(reason)
				}
			})
			.catch(err => {
				console.log(err)
			})
		},
		// 取消选择
        cancelSelect() {
            this.$refs.goodsTableData.clearSelection(); // 整个表格调用取消选择方法
        },
        // 当选择项发生改变触发
        handleSelectionChange(val) {
            // val就是选中的数据 把选中数据的id取出来 放在一个数组中
            this.selectedId = val.map(v => v.id);
            console.log(this.selectedId)
        },
        // 批量删除
    	batchesdel() {
    		// 如果用户不选 弹出提示 直接return
    		if(!this.selectedId.length){
    			this.$message.error('请选择要操作的选项！')
    			return
    		}
    		this.$confirm('是否批量删除?','温馨提示',{
    			confirmButtonText:'确定',
    			cancelButtonText:'取消',
    			type:'warning'
    		})
    		.then(()=>{
    			// 发送请求 把选中的数据id发送给后端
    			this.req.get('/account/batchesdel',{idArr: this.selectedId})
    			.then(res=>{
    				//接收数据
    				let { code, reason } = res;
    				//判断
    				if(code === 0){
    					this.$message({
    						type:'success',
    						message:reason
    					})
    					// 刷列表
    					this.getAccountListByPage()
    				}else if(code === 1){
    					this.$message.err(reason)
    				}
    			})
    			.catch(err=>{
    				console.log(err)
    			})
    		})
    	}
        	
			
    },
    // 生命周期钩子函数
    created () {
        this.getGoodsListByPage(); // 调用请求商品列表数据函数（按照分页显示）
    },
    // 过滤器
    filters: {
        filterCtime (ctime) {
            return moment(ctime).format('YYYY/MM/DD')
        }
    }
}
</script>
<style lang="less">
    @import './goodsmanage.less';
</style>


