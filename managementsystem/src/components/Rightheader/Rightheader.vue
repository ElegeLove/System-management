<template>
    <div class="right-header">
        <!-- 布局容器 -->
        <el-row :gutter="20">
            <!-- 左 -->
            <el-col :span="20">
                <i class="el-icon-menu"></i>
                <span class="title">华联超市管理系统</span>
            </el-col>
            <!-- 右 -->
            <el-col :span="4">

                <el-row>
                    <el-col :span="8">
                        <!-- 头像 -->
                        <div class="avatar">
                            <img src="./avatar.jpg" alt="">
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <!-- 下拉 -->
                        <div class="drop-down">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                	{{ accountName }}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="personal">个人中心</el-dropdown-item>
                                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>

      
    </div>
</template>
<script>
export default {
	data(){
		return{
			accountName:'默认值'
		}
	},
    methods: {
    	// 点击下拉菜单选项触发函数
        handleCommand(command) {
        	if(command === 'logout'){
        		// 清除token
            	window.localStorage.removeItem('my-de-key');
            	//弹出提示框
            	this.$message({
            		type:'success',
            		message:'退出成功，欢迎归来'
            	})
            	setTimeout(() => {
	                // 跳转到首页
	                this.$router.push('/login')
	            }, 1000)
        	}
        	console.log('参数:', command)
        },
        //获取账号名
        getAccountName(){
        	//发送请求 获取账号姓名
        	this.req.get('/account/accountname')
        	.then(res => {
        		//把后端返回的账号名赋值给对应字段
        		this.accountName = res.accountName;
        	})
        	.catch(err => {
        		console.log(err)
        	})
        }
    },
    // 生命周期钩子函数
    created () {
    	// 调用获取账号名的函数
        this.getAccountName() 
    }
}
</script>
<style lang="less">
    @import './Rightheader.less';
</style>


