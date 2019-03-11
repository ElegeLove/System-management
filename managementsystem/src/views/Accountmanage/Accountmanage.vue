<template>
	<div class="account-manage">
		<el-card class="box-card">
			<!-- 面板头部 -->
			<div slot="header" class="clearfix">
				<span>账号管理</span>
			</div>
			<!-- 面板内容 -->
			<div class="text item">
				<!-- 账号管理表格 -->
				<el-table ref="accountTableData" :data="accountTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<!-- 选择框 -->
					<el-table-column type="selection" width="55">
					</el-table-column>

					<!-- 账号 -->
					<el-table-column prop="account" label="账号">
					</el-table-column>

					<!-- 用户组 -->
					<el-table-column prop="usergroup" label="用户组">
					</el-table-column>

					<!-- 日期 -->
					<el-table-column label="日期">
						<template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
					</el-table-column>
					<!-- 操作 -->
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="handleEdit( scope.row.id )">
								<i class="el-icon-edit"></i> 编辑
							</el-button>
							<el-button size="mini" type="danger" @click="handleDelete( scope.row.id )">
								<i class="el-icon-delete"></i> 删除
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
				<el-dialog width="400px" title="账号修改" :visible.sync="dialogFormVisible">
					<!-- 表格 -->
					<el-form :model="accountEditForm" style="width: 320px;">
						<!-- 账号 -->
						<el-form-item label="账号" :label-width="formLabelWidth">
							<el-input v-model="accountEditForm.account" autocomplete="off"></el-input>
						</el-form-item>
						<!-- 用户组 -->
						<el-form-item label="用户组" :label-width="formLabelWidth">
							<el-select v-model="accountEditForm.usergroup" placeholder="请选择用户组">
								<el-option label="普通用户" value="普通用户"></el-option>
								<el-option label="超级管理员" value="超级管理员"></el-option>
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
		data() {
			return {
				// 账号列表数据
				accountTableData: [],
				// 控制模态框显示和隐藏
				dialogFormVisible: false,
				accountEditForm: { // 修改表单的数据
					account: '',
					usergroup: ''
				},
				// 标签宽度
				formLabelWidth: '120px', 
				// 需要修改的数据的id
				editId: 0, 
				// 选中的id数组
				selectedId: [],
				// 数据总条数
				total: 0, 
				// 当前默认第几页
	            currentPage: 1, 
	            // 每页多少条
	            pageSize: 3 
			}
		},
		methods: {
			// 请求所有账号数据
//			getAccountList() {
//				this.req.get('/account/accountlist')
//					.then(res => {
//						// 赋值给accountTableData 渲染表格
//						this.accountTableData = res
//					})
//					.catch(err => {
//						console.log(err)
//					})
//			},
			// 按照分页请求数据
			getAccountListByPage(){
				// 收集参数（每页多少条 和 当前页码）
				let params = {
					pageSize:this.pageSize,
					currentPage:this.currentPage
				}
				// 发送请求给后端 把分页条件发送给后端
				this.req.get('account/accountlistbypage',params)
				.then(res => {
					//接收数据
					let { total,data} = res;
					//赋值给对应变量
					this.total = total
					this.accountTableData = data
					// 如果数据为空 （优化 当当前页码数据为空 跳转到上一页）
					if(!data.length && this.currentPage !== 1){
						//当前页码自减1
						this.currentPage -= 1;
						//再次请求数据
						this.getAccountListByPage();
					}
				})
				.catch(err => {
					console.log(err)
				})
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
						this.req.get('/account/accountdel', { id })
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
									this.getAccountListByPage();

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
				this.req.get('/account/accountedit', { id })
					.then(res => {
						console.log(res);
						// 接收后端数据
						let { account, usergroup } = res;
						// 回填表单
						this.accountEditForm.account = account;
						this.accountEditForm.usergroup = usergroup;
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
					account: this.accountEditForm.account,
					usergroup: this.accountEditForm.usergroup,
					id: this.editId
				}

				// 把新数据和老id一起发送给后端
				this.req.post('/account/accounteditsave', params)
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
							this.getAccountListByPage();

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
	            this.$refs.accountTableData.clearSelection(); // 整个表格调用取消选择方法
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
        	},
        	// 每页条数变化触发
	        handleSizeChange(val) {
	            this.pageSize = val; // 每页多少条
	            this.getAccountListByPage(); // 调用分页函数
	        },
	        // 当前页码变化触发
	        handleCurrentChange(val) {
	           this.currentPage = val; // 当前页
	           this.getAccountListByPage(); // 调用分页函数
	        }
        	
		},
		
		// 生命周期钩子函数
		created() {
				// 调用请求所有数据函数
				this.getAccountListByPage()
		},
		// 过滤器
		filters: {
			filterCtime(ctime) {
				return moment(ctime).format('YYYY/MM/DD hh:mm:ss')
			}
		}
	}
</script>
<style lang="less">
	@import './accountmanage.less';
</style>