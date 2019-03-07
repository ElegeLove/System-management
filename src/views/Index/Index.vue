<template>
  <div class="index">
  	<!--布局容器-->
    <el-container>
    	<!--左侧-->
      <el-aside width="200px">
      	<!-- 左侧导航 -->
        <Leftnav></Leftnav>
      </el-aside>
      <!--右侧-->
      <el-container>
      	<!--头-->
        <el-header>
        	<!-- 右侧头部 -->
          <Rightheader></Rightheader>
        </el-header>
        <!--主体-->
        <el-main>
        	<!-- 路由出口 -->
          <router-view></router-view>
        </el-main>
        <!--尾-->
        <el-footer>
        	<!-- 右侧尾部 -->
          <Rightfooter></Rightfooter>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script>
	//引入组件
	import Leftnav from '@/components/Leftnav/Leftnav.vue'
	import Rightheader from '@/components/Rightheader/Rightheader.vue'
	import Rightfooter from '@/components/Rightfooter/Rightfooter.vue'
export default {
	//注册组件
	components:{
		Leftnav,
		Rightheader,
		Rightfooter
	}
};
</script>
<style lang="less">
    @import './index.less';
</style>


