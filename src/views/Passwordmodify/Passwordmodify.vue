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
                        <el-button type="primary" @click="submitForm()">修改</el-button>
                    </el-form-item>
                    
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        // 自定义验证密码 oldPwd
        const oldPwd = (rule, value, callback) => {
        	// 通过axios 发送给后端
        	this.req.get('/account/checkoldpwd',{ oldpassword,value })
        	.then(res => {
        		console.log(res)
        		let {code,reason} = res;
        		//判断
        		if(code === 1){
        			callback(new Error(reason))
        		}else if(code === 0){
        			callback(reason)
        		}
        	})
        	.catch(err => {
        		console.log(err)
        	})
//          if (value === '') {
//              callback(new Error('请输入原密码'))
//          } else if (value.length < 3 || value.length > 5) {
//              callback(new Error('密码长度在 3 到 5 位'))
//          }else {
//              // 如果新密码不为空 再次出发一致性验证
//              if (this.passwordForm.newpassword !== '') {
//                  this.$refs.passwordForm.validateField('newpassword')
//              }
//              callback()
//          }
        }
        
        const validatePwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else if (value.length < 3 || value.length > 5) {
                callback(new Error('密码长度在 3 到 5 位'))
            } else if ( value === this.passwordForm.oldpassword ) {
                callback(new Error('两次密码不能一致'))
            } else {
                // 如果确认密码不为空 再次出发一致性验证
                if (this.passwordForm.checkPass !== '') {
                    this.$refs.passwordForm.validateField('checkPass')
                }
                callback()
            }
        }

        // 自定义验证确认密码
        const checkPwd = (rule, value, callback) => {
            if (value === '') { // 非空
                callback(new Error('请再次输入密码'))
            } else if ( value !== this.passwordForm.newpassword ) {
                callback(new Error('两次密码不一致'))
            } else {
                callback();
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
                    { required: true, validator: oldPwd, trigger: 'blur' },
                    { min: 3, max: 5, message: '密码长度在 3 到 5 位' }
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

                        // 收集账号和密码
                        const params = {
                            newpassword: this.passwordForm.newpassword
                        }
                        console.log('新密码为:', params)

                        this.$message({
                            type: 'success',
                            message: '修改密码成功'
                        })
                        
                        

                        // 通过axios 发送给后端

                    } else {
                        console.log('前端验证失败！不允许提交!');
                        return false;
                    }
                });
            }
        }
}
</script>
<style lang="less">
    @import './Passwordmodify.less';
</style>


