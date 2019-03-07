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
                <el-table
                    ref="accountTableData"
                    :data="accountTableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                >
                    <!-- 选择框 -->
                    <el-table-column
                        type="selection"
                        width="55"
                    >
                    </el-table-column>

                    <!-- 账号 -->
                    <el-table-column
                        prop="account"
                        label="账号">
                    </el-table-column>

                    <!-- 用户组 -->
                    <el-table-column
                        prop="userGroup"
                        label="用户组"
                        >
                    </el-table-column>


                    <el-table-column
                        label="日期"
                        >
                        <template slot-scope="scope">{{ scope.row.ctime }}</template>
                    </el-table-column>

                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary">
                                <i class="el-icon-edit" ></i> 编辑
                            </el-button>

                            <el-button size="mini" type="danger">
                                <i class="el-icon-delete"></i>  删除
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // 账号列表数据
            accountTableData: [
                {
                    account: 'admin',
                    userGroup: '超级管理员',
                    ctime: '2019-03-06'
                },
                {
                    account: 'guest',
                    userGroup: '普通用户',
                    ctime: '2019-03-07'
                }
            ]
        }
    },
    methods: {
    }
}
</script>
<style lang="less">
    @import './Accountmanage.less';
</style>


