<template>
    <div class="Password-modify">
       <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" class="clearfix">
                <span>修改密码</span>
            </div>

            <!-- 面板内容 -->
            <div class="text item">
                <el-form 
                    :model="passwordForm" 
                    status-icon 
                    :rules="rules"
                    ref="passwordForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    size="small"
                    style="width: 300px;"
                    >
                    <!-- 账号 -->
                    <el-form-item label="原密码" prop="oldpassword">
                        <el-input type="text" v-model="passwordForm.oldpassword" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item label="新密码" prop="newpassword">
                        <el-input type="text" v-model="passwordForm.newpassword" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 确认密码 -->
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="text" v-model="passwordForm.checkPass" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 修改按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">确定</el-button>
                        <el-button @click="resetForm()">重置</el-button>
                    </el-form-item>
                    
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        // 验证旧密码
        const checkoldPwd  = (rule, value, callback) => {
            // 发送axios给后端 把用户输入的旧密码发送给后端
            this.req.get('/account/checkoldpwd', { oldPwd: value })
                .then(res => {
//                  // 接收数据
                    let { code, reason } = res;
                    // 判断 
                    // 验证失败
                    if (code === 1) {
                        callback(new Error(reason))
                    // 验证成功
                    } else if (code === 0) {
                        callback()
                    }
//					console.log(res)
                })
                .catch(err => {
                    console.log(err)
                })
        }

        // 验证新密码
        const validatePwd = (rule, value, callback) => {
            // 非空
            if (value === '') {
                callback(new Error('请输入新密码'))
            } else if (value.length < 3 || value.length > 5) { // 长度
                callback(new Error('密码长度 3 到 5 位'))
            } else if (value === this.passwordForm.oldpassword) { // 一致性验证
                callback(new Error('不能和旧密码相同'))
            } else {
                if (this.passwordForm.checkPass !== '') {
                    // 触发一致性验证
                    this.$refs.passwordForm.validateField('checkPass')
                }
                callback(); // 成功
            }
        }

        // 验证确认新密码
        const checkPwd = (rule, value, callback) => {
               // 非空
            if (value === '') {
                callback(new Error('请确认新密码'))
            } else if (value.length < 3 || value.length > 5) { // 长度
                callback(new Error('密码长度 3 到 5 位'))
            } else if (value !== this.passwordForm.newpassword) { // 一致性验证
                callback(new Error('两次密码不一致'))
            } else {
                callback(); // 成功
            }
        }



        return {
            // 添加密码数据
            passwordForm: {
                oldpassword: '',
                newpassword: '',
                checkPass: ''
            },
            // 验证
            rules: {
                // 原密码
                oldpassword: [
                    { required: true, validator: checkoldPwd, trigger: 'blur' }
                ],
                // 新密码
                newpassword: [
                    { required: true, validator: validatePwd, trigger: 'blur' }
                ],
                // 确认密码
                checkPass: [
                    { required: true, validator: checkPwd, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        // 修改表单  
        submitForm() {
            this.$refs.passwordForm.validate((valid) => { 
                if (valid) { 

                    // 收集新密码
                    const params = {
                        newpassword: this.passwordForm.newpassword
                    }
                    console.log('新密码为:', params)
                    
					// 发送axios 把新密码发送给后端
					this.req.post('/account/savenewpassword',params)
					.then(res => {
						console.log(res)
						// 接收后端返回的参数
						let {code,reason} = res;
						//判断
						if(code === 0){
							this.$message({
	                            type: 'success',
	                            message: reason
	                        })
							// 清除token
							window.localStorage.removeItem('my-de-key')
							// 跳转到首页
                            this.$router.push('/login')
						}else if(code === 1){
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
        },
        // 重置表单   
        resetForm() {
        	 // 重置所有字段为空
            this.$refs.passwordModifyForm.resetFields();
        }
    }
}
</script>
<style lang="less">
    @import './Passwordmodify.less';
</style>


