<template>
	<div class="left-nav">
        <!-- 导航组件 -->
        <el-menu
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="rgb(64, 158, 255)"
            unique-opened
            router
        >   
            <!-- 导航1 -->
            <el-submenu v-for="(menu, index) in menuData" :key="index" :index="(index + 1) + ''">
                <template slot="title">
                    <span class="icon iconfont" v-html="menu.icon_code"></span>
                    <span>{{ menu.menuTitle }}</span>
                </template>
                <el-menu-item :index="subMenu.path" v-for="(subMenu, index) in menu.children" :key="index">
                    {{ subMenu.subMenuTitle }}
                </el-menu-item>
            </el-submenu>

            <!-- 导航2 -->
            <!-- <el-submenu index="2">
                <template slot="title">
                    <span class="icon iconfont">&#xe71b;</span>
                    <span>账号管理</span>
                </template>
                <el-menu-item index="/index/accountmanage">账号管理</el-menu-item>
                <el-menu-item index="/index/accountadd">添加账号</el-menu-item>
                <el-menu-item index="/index/passwordmodify">密码修改</el-menu-item>
            </el-submenu> -->

        </el-menu>
	</div>
</template>

<script>
	export default{
    data () {
        return {
            // 导航数据
            menuData: [
                // 系统信息
                {
                    menuTitle: '系统管理',
                    icon_code: '&#xe608',
                    children: [
                        {
                            path: '/index',
                            subMenuTitle: '系统信息'
                        }
                    ]
                },
                // 会员管理
                {
                    menuTitle: '会员管理',
                    icon_code: '&#xe639',
                    children: [
                        {
                            path: '/index/vipmanage',
                            subMenuTitle: '账号管理'
                        },
                        {
                            path: '/index/vipadd',
                            subMenuTitle: '添加账号'
                        }
                    ]
                },
                // 账号管理
                {
                    menuTitle: '账号管理',
                    icon_code: '&#xe666',
                    children: [
                        {
                            path: '/index/accountmanage',
                            subMenuTitle: '账号管理'
                        },
                        {
                            path: '/index/accountadd',
                            subMenuTitle: '账号添加'
                        },
                        {
                            path: '/index/passwordmodify',
                            subMenuTitle: '密码修改'
                        }
                    ]
                },
                // 统计管理
                {
                    menuTitle: '统计管理',
                    icon_code: '&#xe636',
                    children: [
                        {
                            path: '/index/salesstatistics',
                            subMenuTitle: '销售统计'
                        },
                        {
                            path: '/index/stockstatistics',
                            subMenuTitle: '进货统计'
                        }
                    ]
                },
                //出货管理
                {
                    menuTitle: '出货管理',
                    icon_code: '&#xe624',
                    children: [
                        {
                            path: '/index/saleslist',
                            subMenuTitle: '销售列表'
                        },
                        {
                            path: '/index/outboundgoods',
                            subMenuTitle: '商品出库'
                        },
                        {
                            path: '/index/goodsreturn',
                            subMenuTitle: '商品退货'
                        }
                    ]
                },
                //进货管理
                {
                    menuTitle: '进货管理',
                    icon_code: '&#xe6cb',
                    children: [
                        {
                            path: '/index/stockmanage',
                            subMenuTitle: '库存管理'
                        },
                        {
                            path: '/index/stockadd',
                            subMenuTitle: '添加库存'
                        }
                    ]
                },
                // 商品管理
                {
                    menuTitle: '商品管理',
                    icon_code: '&#xe602',
                    children: [
                        {
                            path: '/index/goodsmanage',
                            subMenuTitle: '商品管理'
                        },
                        {
                            path: '/index/goodsadd',
                            subMenuTitle: '商品添加'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        
    }
	}
</script>

<style lang="less">
	@import './leftnav.less';
</style>