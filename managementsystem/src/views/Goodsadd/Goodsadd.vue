<template>
	<div class="goods-add">
		<el-card class="box-card">
			<!-- 面板头部 -->
			<div slot="header" class="clearfix">
				<span>商品添加</span>
			</div>

			<!-- 面板内容 -->
			<div class="text item">
				<el-form 
					:model="goods"
					:rules="rules"
					ref="goods"
					label-width="100px"
					status-icon 
                    size="small"
                    style="width: 300px;"
					class="demo-goods"
					>
					<!-- 所属分类 -->
					<el-form-item label="所属分类" prop="classify">
						<el-select v-model="goods.classify" placeholder="请选择分类">
							<el-option label="电子类" value="电子类"></el-option>
                            <el-option label="蔬菜类" value="蔬菜类"></el-option>
                            <el-option label="生活用品类" value="生活用品类"></el-option>
                            <el-option label="烟酒类" value="烟酒类"></el-option>
                            <el-option label="服装类" value="服装类"></el-option>
						</el-select>
					</el-form-item>
					
					<!-- 商品条形码 -->
					<el-form-item label="条形码" prop="barcode">
						<el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input v-model="goods.barcode" placeholder="条形码"></el-input>
							</el-col>
							<el-col :span="4">
								<el-button type="primary" @click="creatbarcode">生成条形码</el-button>
							</el-col>
						</el-row>  
					</el-form-item>
					
					<!-- 商品名称 -->
					<el-form-item label="商品名称" prop="productname">
                        <el-input type="text" v-model="goods.productname" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <!-- 商品进价 -->
                    <el-form-item label="商品进价" prop="pcsaleprice">
                        <el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input type="text" @blur="autoPrice" v-model="goods.pcsaleprice" autocomplete="off"></el-input>
							</el-col>
							<el-col :span="4">元</el-col>
						</el-row>
                    </el-form-item>
                    
                    <!-- 商品市场价 -->
                    <el-form-item label="市场价" prop="price">
                    	<el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input type="text" v-model="goods.price" autocomplete="off"></el-input>
							</el-col>
							<el-col :span="4">元</el-col>
						</el-row>
                    </el-form-item>
                    
                    <!-- 商品售价 -->
                    <el-form-item label="商品售价" prop="market">
                        <el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input type="text" v-model="goods.market" autocomplete="off"></el-input>
							</el-col>
							<el-col :span="4">元</el-col>
						</el-row>
                    </el-form-item>
                    
                    <!-- 入库数量 -->
                    <el-form-item label="入库数量" prop="goodsnumber">
                        <el-input type="text" v-model="goods.goodsnumber" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <!-- 商品重量 -->
                    <el-form-item label="商品重量" prop="weight">
                        <el-input type="text" v-model="goods.weight" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <!-- 商品单位 -->
                    <el-form-item label="商品单位" prop="productunit">
                        <el-select v-model="goods.productunit" placeholder="请选择商品单位">
                            <el-option label="个" value="个"></el-option>
                            <el-option label="包" value="包"></el-option>
                            <el-option label="条" value="条"></el-option>
                            <el-option label="只" value="只"></el-option>
                            <el-option label="瓶" value="瓶"></el-option>
                            <el-option label="桶" value="桶"></el-option>
                            <el-option label="袋" value="袋"></el-option>
                        </el-select>
                    </el-form-item>
					
					<!-- 会员优惠 -->
					<el-form-item label="会员优惠" prop="members">
					    <el-radio-group v-model="goods.members">
						    <el-radio label="享受" checked></el-radio>
						    <el-radio label="不享受"></el-radio>
					    </el-radio-group>
					</el-form-item>
					
					<!-- 是否促销 -->
					<el-form-item label="是否促销" prop="promotion">
					    <el-radio-group v-model="goods.promotion">
						    <el-option label="促销" value="促销"></el-option>
                            <el-option label="未促销" value="未促销"></el-option>
					    </el-radio-group>
					</el-form-item>
					
					<!-- 商品简介 -->
					<el-form-item label="商品简介" prop="goodsdesc">
						<el-input type="textarea" v-model="goods.goodsdesc"></el-input>
					</el-form-item>
					
					<!-- 提交按钮 -->
					<el-form-item>
						<el-button type="primary" @click="submitForm">立即创建</el-button>
						<el-button @click="resetForm">重置</el-button>
					</el-form-item>
					
				</el-form>
			</div>
		</el-card>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				// 添加商品表单数据
				goods: {
					classify: '',
					barcode:'',
					productname:'',
					market:'',
					price:'',
					pcsaleprice:'',
					goodsnumber:'',
					weight:'',
					productunit:'',
					members:'',
					promotion:'',
					goodsdesc: ''
				},
				rules: {
					classify: [
						{ required: true, message: '请选择所属分类', trigger: 'change' }
					],
					barcode: [
						{ required: true, message: '请获取条形码', trigger: 'blur' }
					],
					productname: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					market: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					price: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					pcsaleprice: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					goodsnumber: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					weight: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					productunit: [
						{ required: true, message: '请选择单位', trigger: 'change' }
					],
					members: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					promotion: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					],
					goodsdesc: [
						{ required: true, message: '不超过200个字', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			// 商品进价失去焦点 自动填写市场价和售价
	        autoPrice () {
	            this.goods.price = this.goods.pcsaleprice * 3; // 市场价
	            this.goods.market = this.goods.pcsaleprice * 2; // 售价
	        },
			submitForm(formName) {
				this.$refs.goods.validate((valid) => {
					if(valid) {
						//收集数据
						const params = {
							barcode: this.goods.barcode,
							classify: this.goods.classify,
							productname: this.goods.productname,
							market: this.goods.market,
							price: this.goods.price,
							pcsaleprice: this.goods.pcsaleprice,
							goodsnumber: this.goods.goodsnumber,
							weight: this.goods.weight,
							productunit: this.goods.productunit,
							members: this.goods.members,
							promotion: this.goods.promotion,
							goodsdesc: this.goods.goodsdesc
						}
						console.log(params)
						//把数据发送给后端（axios）
						this.req.post('/goods/goodsadd',params)
						.then(res=>{
							//接收后端数据
							console.log(res)
							let { code,reason } = res;
							//判断
							if(code === 0){
								this.$message({
									type:'success',
									message:'添加商品成功'
								})
								//跳商品管理
								this.$router.push('/index/goodsmanage')
							}else if(code === 1){
								this.$message.error(reason)
							}
							
						})
						.catch(err=>{
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
                this.$refs.goods.resetFields(); 
            },
			creatbarcode(){
				let sjs = Math.floor(Math.random()*1000000000);
				this.goods.barcode = sjs;
			}
			
		}
	}
</script>
<style lang="less">

</style>