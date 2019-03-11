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
					<el-form-item label="所属分类" prop="classify">
						<el-select v-model="goods.classify" placeholder="----请选择分类----">
							<el-option label="----选择分类一----" value="shanghai"></el-option>
							<el-option label="----选择分类二----" value="beijing"></el-option>
						</el-select>
					</el-form-item>
					
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
					
					<el-form-item label="商品名称" prop="productname">
                        <el-input type="text" v-model="goods.productname" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="商品售价" prop="market">
                        <el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input type="text" v-model="goods.market" autocomplete="off"></el-input>
							</el-col>
							<el-col :span="4">元</el-col>
						</el-row>
                    </el-form-item>
                    
                    <el-form-item label="市场价" prop="price">
                    	<el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input type="text" v-model="goods.price" autocomplete="off"></el-input>
							</el-col>
							<el-col :span="4">元</el-col>
						</el-row>
                    </el-form-item>
                    
                    <el-form-item label="商品进价" prop="pcsaleprice">
                        <el-row :gutter="20">
			  				<el-col :span="18">
							    <el-input type="text" v-model="goods.pcsaleprice" autocomplete="off"></el-input>
							</el-col>
							<el-col :span="4">元</el-col>
						</el-row>
                    </el-form-item>
                    
                    <el-form-item label="入库数量" prop="goodsnumber">
                        <el-input type="text" v-model="goods.goodsnumber" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="商品重量" prop="weight">
                        <el-input type="text" v-model="goods.weight" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="商品单位" prop="productunit">
                        <el-input type="text" v-model="goods.productunit" autocomplete="off"></el-input>
                    </el-form-item>
					
					<el-form-item label="会员优惠">
					    <el-radio-group v-model="goods.members">
						    <el-radio label="享受" checked></el-radio>
						    <el-radio label="不享受"></el-radio>
					    </el-radio-group>
					</el-form-item>
					
					<el-form-item label="是否促销">
					    <el-radio-group v-model="goods.promotion">
						    <el-radio label="启用"></el-radio>
						    <el-radio label="禁用"></el-radio>
					    </el-radio-group>
					</el-form-item>
					
					<el-form-item label="商品简介" prop="desc">
						<el-input type="textarea" v-model="goods.desc"></el-input>
					</el-form-item>
					
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
					desc: ''
				},
				rules: {
					classify: [
						{ required: true, message: '请选择所属分类', trigger: 'change' }
					],
					barcode: [
						{ required: true, message: '请获取条形码', trigger: 'change' }
					],
					productname: [
						{ required: true, message: '请选择活动区域', trigger: 'change' }
					],
					market: [
						{ required: true, message: '请选择活动区域', trigger: 'change' }
					],
					desc: [
						{ required: true, message: '不超过200个字', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs.goods.validate((valid) => {
					if(valid) {
						//收集数据
						const params = {
							classify: this.goods.classify,
							barcode: this.goods.barcode,
							productname: this.goods.productname,
							market: this.goods.market,
							price: this.goods.price,
							pcsaleprice: this.goods.pcsaleprice,
							goodsnumber: this.goods.goodsnumber,
							weight: this.goods.weight,
							productunit: this.goods.productunit,
							members: this.goods.members,
							promotion: this.goods.promotion,
							desc: this.goods.desc
						}
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