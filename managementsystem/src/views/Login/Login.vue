<template>
	<div class="login">
		<div class="login-wrapper">
			<!-- 标题 -->
			<h2 class="title">
                <span class="icon iconfont">&#xe60a;</span>
                欢迎登录华联超市管理系统
            </h2>
			<!-- 登录表单 -->
			<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
				<!-- 账号 -->
				<el-form-item label="账号" prop="account">
					<el-input type="text" v-model="loginForm.account" autocomplete="off"></el-input>
				</el-form-item>

				<!-- 密码 -->
				<el-form-item label="密码" prop="password">
					<el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
				</el-form-item>

				<!-- 确认密码 -->
				<el-form-item label="确认密码" prop="checkPass">
					<el-input type="text" v-model="loginForm.checkPass" autocomplete="off"></el-input>
				</el-form-item>

				<!-- 提交按钮 -->
				<el-form-item>
					<el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
					<el-button @click="resetForm('loginForm')">重置</el-button>
				</el-form-item>

			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			// 自定义验证密码的函数
			const validatePwd = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码!'))
				} else if(value.length < 3 || value.length > 5) {
					callback(new Error('长度在 3 到 5 个字符'))
				} else {
					// 如果确认密码不为空 要触发一次一致性验证
					if(this.loginForm.checkPass !== '') {
						this.$refs.loginForm.validateField('checkPass')
					}
					// 成功的回调
					callback();
				}
			}
			// 自定义验证确认密码函数
			const checkPwd = (rule, value, callback) => {
				// rule: 验证规则对象  value: 用户输入的值 callback: 函数
				if(value === '') { // 非空验证
					callback(new Error('请再次输入密码'));
				} else if(value !== this.loginForm.password) { // 一致性验证
					callback(new Error('两次密码不一致'))
				} else {
					callback(); // 直接调用就是成功 绿色的勾勾
				}
			}
			return {
				// 整个登录表单的数据
				loginForm: {
					account: '', // 账号
					password: '', // 密码
					checkPass: '' // 确认密码
				},
				// 验证规则
				rules: {
					// 账号验证
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' }, // 非空验证
						{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证
					],
					// 密码验证
					password: [
						// { required: true, message: '请输入密码', trigger: 'blur' }, // 非空验证
						// { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } // 长度验证

						// 密码验证改造
						{ required: true, validator: validatePwd, trigger: 'blur' } // 自定义验证规则
					],
					// 确认密码验证
					checkPass: [
						{ required: true, validator: checkPwd, trigger: 'blur' } // 自定义验证规则
					]
				}
			}
		},
		methods: {
			// 提交表单  
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					// 所有前端验证通过valid就是true 否则就是false
					if(valid) {
						//alert('所有前端验证通过！允许提交!');

						// 收集账号和密码
						const params = {
							account: this.loginForm.account,
							password: this.loginForm.password
						}

						// 通过axios 发送给后端
						this.req.post('/login/checklogin', params)
							.then(res => {
								//接收后端返回的数据
								let { code, reason, token } = res;
								//判断
								if(code === 0) {
									//把token存入浏览器
									window.localStorage.setItem('my--key', token);
									//弹成功提示
									this.$message({
										type: 'success',
										message: reason
									})
									//跳后端首页	
									this.$router.push('/index')
								} else if(code === 1) {
									//弹失败提示
									this.$message.error(reason)
								}
							})
							.catch(err => {
								console.log(err)
							})

					} else {
						console.log('前端验证失败！不允许提交!');
						return false;
					}
				});
			}, // 重置表单   
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>
<style lang="less">
	@import './Login.less';
</style>