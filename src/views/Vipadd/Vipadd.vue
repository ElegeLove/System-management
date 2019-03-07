<template>
    <div class="vip-add">
       <el-card class="box-card">
            <!-- 面板头部 -->
            <div slot="header" class="clearfix">
                <span>添加编辑账号</span>
            </div>

            <!-- 面板内容 -->
            <div class="text item">
                <el-form 
                    :model="accountForm" 
                    status-icon 
                    :rules="rules"
                    ref="accountForm"
                    label-width="100px"
                    class="demo-ruleForm"
                    size="small"
                    style="width: 300px;"
                    >
                    <!-- 账号 -->
                    <el-form-item label="真实名字" prop="account">
                        <el-input type="text" v-model="accountForm.account" autocomplete="off"></el-input>
                    </el-form-item>

                    <!-- 密码 -->
                    <el-form-item label="会员卡卡号" prop="password">
                        <el-input type="text" v-model="accountForm.password" autocomplete="off"></el-input>
                    </el-form-item>
            
                    <!-- 选择用户组 -->
                    <el-form-item label="会员等级" prop="userGroup">
                        <el-select v-model="accountForm.userGroup" placeholder="请选择会员等级">
                        <el-option label="普通会员" value="普通会员"></el-option>
                        <el-option label="超级会员" value="超级会员"></el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-form-item label="身份证号">
                        <el-input type="text" v-model="accountForm.idcards"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="用户状态">
					    <el-radio-group v-model="accountForm.resource">
						    <el-radio label="启用"></el-radio>
						    <el-radio label="禁用"></el-radio>
					    </el-radio-group>
					</el-form-item>
                    
                    <el-form-item label="手机号码">
                        <el-input type="text" v-model="accountForm.cellphone"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="座机号码">
                        <el-input type="text" v-model="accountForm.telephone"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="邮箱地址">
					    <el-input v-model="accountForm.email"></el-input>
					</el-form-item>
					
					<el-form-item :span="24" label="地区选择">
					    <el-select :span="11" v-model="accountForm.region" placeholder="--选择省份--"  style="width: 100%;">
					       <el-option label="区域一" value="shanghai"></el-option>
					       <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					    <el-col class="line" :span="2">-</el-col>
					    <el-select :span="11" v-model="accountForm.region" placeholder="--选择城市--"  style="width: 100%;">
					       <el-option label="区域一" value="shanghai"></el-option>
					       <el-option label="区域二" value="beijing"></el-option>
					    </el-select>
					</el-form-item>
					
					<el-form-item label="详细地址">
                        <el-input type="text" v-model="accountForm.address"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="邮政编码">
                        <el-input type="text" v-model="accountForm.postcode"></el-input>
                    </el-form-item>
                    
                    

                    <!-- 提交按钮 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitForm()">添加</el-button>
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
        // 自定义验证密码
        const validatePwd = (rule, value, callback) => {
            if (value === '') { // 非空
                callback(new Error('请输入密码'))
            } else if (value.length < 3 || value.length > 5) { // 长度验证
                callback(new Error('密码长度在 3 到 5 位'))
            } else {
                // 如果确认密码不为空 再次出发一致性验证
                if (this.accountForm.checkPass !== '') {
                    this.$refs.accountForm.validateField('checkPass')
                }
                callback()
            }
        }


        return {
            // 添加账号表单数据
            accountForm: {
                account: '',
                password: '',
                userGroup: '',
                idcards:'',
                resource: '',
                cellphone:'',
                telephone:'',
                email:'',
                address:'',
                postcode:''
            },
            // 验证
            rules: {
                // 账号
                account: [
                    { required: true, message: '请输入真实名字', trigger: 'blur' },
                    { min: 3, max: 5, message: '真实名字长度在 3 到 5 位' }
                ],
                // 密码
                password: [
                    { required: true, validator: validatePwd, trigger: 'blur' }
                ],
                // 会员等级组
                userGroup: [
                    { required: true, message: '请选择会员等级', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
            // 提交表单  
            submitForm() {
                this.$refs.accountForm.validate((valid) => { // 所有前端验证通过valid就是true 否则就是false
                    if (valid) { 

                        // 收集账号和密码
                        const params = {
                            account: this.accountForm.account,
                            password: this.accountForm.password,
                            userGroup: this.accountForm.userGroup
                        }
                        console.log('账号数据:', params)

                        this.$message({
                            type: 'success',
                            message: '添加账号成功'
                        })
                        
//                      this.$router.push('/index/accountmanage')

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

</style>


