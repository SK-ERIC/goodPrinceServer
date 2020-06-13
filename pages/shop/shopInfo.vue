<template>
	<view class="container">
		<image class="head-img" src="https://wxhyx-cdn.aisspc.cn/static/shopInfo_head.png" mode=""></image>


		<form @submit="formSubmit">
			<view class="form-section">
				<view class="form-inner">
					<view class="input-wrap">
						<view class="input-item-l">
							店铺名称:
						</view>
						<view class="input-item-r">
							<input type="text" name="shopName" maxlength="20" v-model="shopName" placeholder="请输入店铺名称..." />
						</view>
					</view>
					<view class="input-wrap type-area">
						<view class="input-item-l">
							店铺地址:
						</view>
						<view class="input-item-r">
							<textarea name="shopAddress" maxlength="40" v-model="shopAddress" placeholder="请输入店铺地址..." />
							</view>
					</view>
					<view class="input-wrap">
						<view class="input-item-l">
							营业时间:
						</view>
						<view class="input-item-r timer-picker">
							<input name="shopOpenTime" disabled type="text" v-model="shopOpenTime" placeholder="请选择" @click="openTimerPicker" />
							<text class="line"></text>
							<input name="shopCloseTime" disabled type="text" v-model="shopCloseTime" placeholder="请选择" @click="closeTimerPicker"/>
						</view>
					</view>
					<view class="input-wrap type-area">
						<view class="input-item-l">
							主营内容:
						</view>
						<view class="input-item-r">
							<textarea name="shopMainCont" maxlength="30" v-model="shopMainCont" placeholder="请输入主营内容..." />
						</view>
					</view>
					<view class="input-wrap">
						<view class="input-item-l">
							联系电话:
						</view>
						<view class="input-item-r">
							<input name="shopTel" type="number" maxlength="11" v-model="shopTel" placeholder="请输入联系电话..." />
						</view>
					</view>
					<!-- 商家照片 -->
					<view class="upload-section">
						<view class="title">
							商家照片上传<text>(请上传的图片不得大于2M)</text>
						</view>
						<view class="upload-wrap">
							<view
								class="upload-inner"
								v-for="(item, index) in shopImgList"
								:key="index"
								:data-url="shopImgList[index]"
							>
								<image :src="item.image_url" mode="aspectFill" :data-src="item.image_url" 
									@click="preViewImage(shopImgUrl, $event)"
								></image>
								<view class="deletBox" :data-index="index"  @click.stop="imgDelete('shop', index, item)">
									<image class="del-img" src="https://wxhyx-cdn.aisspc.cn/static/delete_icon.png" mode=""></image>
								</view>
							</view>
							<view class="upload-inner" v-if="shopImgList.length<5">
								<image
									@tap="chooseImage('shop')"
									class="add-img" 
									src="https://wxhyx-cdn.aisspc.cn/static/add-img.png" 
									mode=""
								></image>
							</view>
						</view>
					</view>
					<!-- 营业执照 -->
					<view class="upload-section">
						<view class="title">
							营业执照上传
						</view>
						<view class="upload-wrap">
							<view class="upload-inner"
								v-if="licenseImgList.length>0"
								v-for="(item, index) in licenseImgList"
								:key="index"
								:data-url="licenseImgList[index]"
							>
								<image :src="item.image_url" mode="aspectFill" :data-src="item.image_url" @click="preViewImage(licenseImgUrl, $event)"></image>
								<view class="deletBox" :data-index="index" @click.stop="imgDelete('license', index, item)">
									<image class="del-img" src="https://wxhyx-cdn.aisspc.cn/static/delete_icon.png" mode=""></image>
								</view>
							</view>
							<view class="upload-inner"
								v-if="licenseImgList.length ==0"
							>
								<image
									@tap="chooseImage('license')"
									class="add-img" 
									src="https://wxhyx-cdn.aisspc.cn/static/add-img.png" 
									mode=""
								></image>
							</view>
						</view>
					</view>
					<!-- 卫生经营许可证 -->
					<view class="upload-section">
						<view class="title">
							卫生经营许可证上传
						</view>
						<view class="upload-wrap">
							<view class="upload-inner" 
								v-if="hygieneImgList.length>0"
								v-for="(item, index) in hygieneImgList"
								:key="index"
								:data-url="hygieneImgList[index]"
							>
								<image :src="item.image_url" mode="aspectFill" :data-src="item.image_url" @click="preViewImage(hygieneImgUrl, $event)"></image>
								<view class="deletBox" :data-index="index"  @click.stop="imgDelete('hygiene', index, item)">
									<image class="del-img" src="https://wxhyx-cdn.aisspc.cn/static/delete_icon.png" mode=""></image>
								</view>
							</view>
							<view class="upload-inner" 
								v-if="hygieneImgList.length==0"
							>
								<image
									@tap="chooseImage('hygiene')"
									class="add-img" 
									src="https://wxhyx-cdn.aisspc.cn/static/add-img.png" 
									mode=""
								></image>
							</view>
						</view>
					</view>
					<!-- 健康证 -->
					<view class="upload-section">
						<view class="title">
							健康证上传
						</view>
						<view class="upload-wrap">
							<view
								class="upload-inner"
								v-if="heaImgList.length>0"
								v-for="(item, index) in heaImgList"
								:key="index"
								:data-url="heaImgList[index]"
							>
								<image :src="item.image_url" mode="aspectFill" :data-src="item.image_url" @click="preViewImage(heaImgUrl, $event)"></image>
								<view class="deletBox" :data-index="index"  @click.stop="imgDelete('hea', index, item)">
									<image class="del-img" src="https://wxhyx-cdn.aisspc.cn/static/delete_icon.png" mode=""></image>
								</view>
							</view>
							<view class="upload-inner"
								v-if="heaImgList.length < 4"
							>
								<image
									@tap="chooseImage('hea')"
									class="add-img" 
									src="https://wxhyx-cdn.aisspc.cn/static/add-img.png" 
									mode=""
								></image>
							</view>
						</view>
					</view>
					<view class="btn-section">
						<button type="default" class="cu-btn save-btn" formType="submit">保存</button>
					</view>
				</view>
						
			</view>
		</form>

		<tui-datetime 
			ref="dateTime" 
			:type="type" 
			:startYear="startYear" 
			:endYear="endYear" 
			:cancelColor="cancelColor" 
			:color="color"
			:setDateTime="setDateTime" 
			:unitTop="unitTop" 
			:radius="radius" 
			@confirm="change"
		></tui-datetime>
	</view>
</template>

<script>
	const form = require("@/components/tui-validation/tui-validation.js")
	import tuiDatetime from '@/components/tui-datetime/tui-datetime'
	export default {
		components:{
			tuiDatetime
		},
		data() {
			return {
				shopId: "",
				shopName: "",
				shopAddress: "",
				shopOpenTime: "",
				shopCloseTime: "",
				shopMainCont: "",
				shopTel: "",
				 // 商家照片
				shopImgUrl: [],
				shopImgList: [],
				shopFilePath: [],
				// 营业执照
				licenseImgUrl: [],
				licenseImgList: [],
				licenseFilePath: [],
				// 卫生经营许可证
				hygieneImgUrl: [],
				hygieneImgList: [],
				hygieneFilePath: [],
				// 健康证
				heaImgUrl: [],
				heaImgList: [],
				heaFilePath: [],
				type: 4,
				startYear: 1980,
				endYear: 2030,
				cancelColor: '#888',
				color: '#5677fc',
				setDateTime: '',
				unitTop: false,
				radius: false,
				flag: false, // 是否是选择店铺关闭时间
			}
		},
		onLoad() {
			this.shopId = this.$db.get('shop_id');
			this.postShopCore();
		},
		mounted() {
			
		},
		methods: {
			postShopCore() {
				const shopId = this.$db.get('shopId');
				this.$http.postShopCore({
					shop_authentication_id: shopId
				}, res => {
					if (res.code == 1) {
						const info = res.data;
						this.shopName = info.shop_title || "";
						this.shopAddress = info.shop_address || "";
						this.shopOpenTime = info.shop_open_add_time || "";
						this.shopCloseTime = info.shop_open_end_time || "";
						this.shopMainCont = info.shop_content || "";
						this.shopTel = info.shop_mobile || "";
						const images = info.images || [];
						if(images) {
							// 店铺照片
							this.shopImgList = images.filter( v => {
								return v.type == 1
							})
							this.shopImgList.map( v=>{
								this.shopImgUrl.push(v.image_url)
							})
							// 营业执照
							this.licenseImgList = images.filter( v=> {
								return v.type == 2
							})
							this.licenseImgList.map( v=>{
								this.licenseImgUrl.push(v.image_url)
							})
							// 卫生经营许可证
							this.hygieneImgList = images.filter( v=> {
								return v.type == 4
							})
							this.hygieneImgList.map( v=>{
								this.hygieneImgUrl.push(v.image_url)
							})
							// 健康证
							this.heaImgList = images.filter( v=> {
								return v.type == 3
							})
							this.heaImgList.map( v=>{
								this.heaImgUrl.push(v.image_url)
							})
						}
						
						
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			formSubmit(e) {
				// 表单规则
				let rules =[{
					name: "shopName",
					rule: ["minLength:2", "maxLength:30"],
					msg: ["姓名必须2个或以上字符", "姓名不能超过30个字符"]
				},
				{
					name: "shopTel",
					rule: ["isMobile"],
					msg: ["请输入正确的手机号"]
				}]
				
				//进行表单检查
				let formData = e.detail.value;
				let checkRes = form.validation(formData, rules);
				if ( checkRes) {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
					return
				}
				
				this.$http.updateShopInfo({
					shop_id: this.shopId,
					shop_title: this.shopName,
					shop_mobile: this.shopTel,
					shop_address: this.shopAddress,
					shop_open_add_time: this.shopOpenTime,
					shop_open_end_time: this.shopCloseTime,
					shop_content: this.shopMainCont,
					shop_images: this.shopFilePath,
					shop_yyzz: this.licenseFilePath,
					shop_wsxk: this.hygieneFilePath,
					shop_jkz: this.heaFilePath
				}, res=> {
					if(res.code == 1) {
						uni.showToast({
							title:"保存成功",
							icon: "success"
						})
						uni.hideToast()
						uni.reLaunch({
							url:'/pages/shop/shopCenter'
						})
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			// 预览图片
			preViewImage(v, e) {
				const current = e.currentTarget.dataset.src;
				uni.previewImage({
					urls: v,
					current
				})
			},
			chooseImage(v) {
				this.$http.uploadImage(1, (res, tem)=> {
					switch (v){
						// 店铺照片上传
						case "shop":
							this.shopImgList.push({image_url: tem});
							this.shopFilePath.push(res.data.url);
							break
						// 营业执照上传
						case "license": 
							this.licenseImgList.push({image_url: tem});
							this.licenseFilePath.push(res.data.url);
							break
						// 卫生经营许可证
						case "hygiene":
							this.hygieneImgList.push({image_url: tem});
							this.hygieneFilePath.push(res.data.url);
							break
						// 健康证上传
						case "hea":
							this.heaImgList.push({image_url: tem});
							this.heaFilePath.push(res.data.url)
							break
					}
				})
			},
			// 删除照片
			imgDelete(v, i, item={}) {
				uni.showModal({
					title: '删除照片',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							
							if(item.id) {
								this.$http.delimages({
									shop_image_id: item.id
								}, res=> {
									if ( res.code == 1) {
										
									} else {
										this.$common.errorToShow(res.msg);
									}
								})
							}
							
							switch (v){
								// 店铺照片上传
								case "shop":
									this.shopImgList.splice(i, 1);
									if(this.shopFilePath[i]) this.shopFilePath.splice(i, 1);
								break
								// 营业执照上传
								case "license": 
									this.licenseImgList.splice(i, 1);
									if(this.licenseFilePath[i]) this.licenseFilePath.splice(i, 1);
								break
								// 卫生经营许可证
								case "hygiene":
									this.hygieneImgList.splice(i, 1);
									if(this.hygieneFilePath[i]) this.hygieneFilePath.splice(i, 1);
								break
								// 健康证上传
								case "hea":
									this.heaImgList.splice(i, 1);
									if(this.heaFilePath[i]) this.heaFilePath.splice(i, 1)
								break
							}
							
							
							
							
						}
					}
				})
			},
			openTimerPicker() {
				this.$refs.dateTime.show();
				this.flag = false;
			},
			closeTimerPicker() {
				this.$refs.dateTime.show();
				this.flag = true;
			},
			change(e) {
				const result = e.result;
				this.flag ? (this.shopCloseTime=result) : this.shopOpenTime = result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		.head-img {
			width: 100%;
			height: 324rpx;
		}

		.form-section {
			// background-color: #FFFFFF;
			position: relative;
			margin-top: -200rpx;
			// border-radius: 100rpx 100rpx 0 0;
			width: 100%;
			height: 960rpx;
			background-image: url("https://wxhyx-cdn.aisspc.cn/static/shopInfo_bg.png");
			background-size: 100% 100%;

			.form-inner {
				// margin:  0 55rpx;
				width: 640rpx;
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
				top: -64rpx;

				.input-wrap {
					height: 94rpx;
					border: 1rpx solid #DFDFDF;
					border-radius: 14rpx;
					background-color: #FFFFFF;
					margin-bottom: 28rpx;
					@include flexX;
					&.type-area{
						height: 94rpx;
						align-items: center;
						.input-item-l{
							line-height: 92rpx;
						}
						.input-item-r{
							// padding: 2rpx 0;
							
							textarea{
								padding: 6 0rpx;
								width: 430rpx;
								height: 84rpx;
							}
						}
					}
					
					.input-item-l{
						font-size: 30rpx;
						color: #363636;
						margin-left: 30rpx;
						white-space: nowrap;
					}
					.input-item-r{
						margin-left: 50rpx;
						input{
							height: 94rpx;
						}
						&.timer-picker{
							@include flexX;
							@include flexJ;
							input{
								text-align: center;
							}
							.line{
								width: 40rpx;
								height: 0;
								border-bottom: 2rpx solid #333333;
							}
						}
						
					}
				}
			
				.upload-section{
					.title{
						font-size: 30rpx;
						color: #363636;
						font-weight: bold;
						margin-left: 20rpx;
						line-height: 90rpx;
						text{
							color: #666666;
							font-weight: 400;
						}
					}
					
					.upload-wrap{
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						
						.upload-inner{
							width: 154rpx;
							height: 154rpx;
							position: relative;
							border-radius: 20rpx;
							overflow: hidden;
							margin-right: 30rpx;
							margin-bottom: 20rpx;
							&:nth-child(3n){
								margin-right: 0;
							}
							
							image{
								width: 154rpx;
								height: 154rpx;
							}
							.del-img{
								width: 42rpx;
								height: 40rpx;
								position: absolute;
								right: 0;
								top: 0;
								z-index: 2;
							}
						}
					}
					
				}
			
				.btn-section{
					@include flexX;
					@include flexJ;
					padding: 65rpx 0;
					.save-btn{
						width: 590rpx;
						height: 100rpx;
						background-color: #F75347;
						color: #FFFFFF;
						border-radius: 50rpx;
						font-size: 34rpx;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
