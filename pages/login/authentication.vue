<template>
	<view class="container">
		<view class="nav-section">
			<view class="steps-section">
				<view class="steps-inner" v-for="(item, index) in 3" :key="index">
					<view class="round-text text-center" :class="{'active-round': index<=activeSteps-1}">
						<text> {{ index + 1 }} </text>
					</view>
					<view v-if="index!=2" class="line" :class="{'active-line': index<=activeSteps-2}"></view>
				</view>
			</view>
		</view>


		<view class="auth-section">
			<!-- 第一步 -->
			<view class="steps-one" v-if="activeSteps==1">
				<view class="input-section">
					<view class="input-item-l">
						店铺名称
					</view>
					<view class="input-item-r">
						<input type="text" focus v-model.trim="stepsOne.shopName" maxlength="20" placeholder="请输入店铺名称..."
						 placeholder-class="holder" />
					</view>
				</view>
				<view class="input-section">
					<view class="input-item-l">
						商家全称
					</view>
					<view class="input-item-r">
						<input type="text" v-model.trim="stepsOne.businessName" maxlength="25" placeholder="请输入商家全称..." placeholder-class="holder" />
					</view>
				</view>
				<view class="input-section">
					<view class="input-item-l">
						法人姓名
					</view>
					<view class="input-item-r">
						<input type="text" v-model.trim="stepsOne.legalPerson" maxlength="20" placeholder="请输入法人姓名..." placeholder-class="holder" />
					</view>
				</view>
				<view class="tip-section text-center">
					<text class="red">*</text>
					注：请填写营业执照上的公司全称及法人姓名
				</view>

				<view class="btn-section">
					<button type="default" :disabled="!disabledOne" class="cu-btn next-steps" @click="nextSteps">下一步</button>
				</view>
			</view>
			<!-- 第二步 -->
			<view class="steps-two" v-if="activeSteps==2">
				<view class="upload-title text-center">
					请上传需要实名认证的店铺营业执照
				</view>
				<view class="upload-section">
					<view class="img-section">
						<image v-if="!BusinessLicense[0]" class="img" src="https://wxhyx-cdn.aisspc.cn/static/upload.png" @tap="chooseImage"></image>
						<image v-else class="img" :src="BusinessLicense[0]" mode="" :data-src="BusinessLicense[0]" @click="previewImage"></image>
						<text v-if="BusinessLicense[0]" class="cuIcon-roundclosefill" @tap.stop="delImage"></text>
					</view>
					<view class="tip-wrap">
						<view class="tip-l">
							<text class="red">*</text>
							注:
						</view>
						<view class="tip-r">
							<text>①可以上传JPG、PNG、GIF格式的图片</text>
							<text>②可以使用电子扫描件、照片（清晰）</text>
							<text>③图片大小不得大于5M</text>
						</view>
					</view>
				</view>
				<view class="btn-section">
					<button type="default" :disabled="!disabledTwo" class="cu-btn next-steps" @click="nextSteps">下一步</button>
				</view>
			</view>
			<!-- 第三步 -->
			<view class="steps-three" v-if="activeSteps==3">
				<view class="input-title text-center">
					办理人信息录入
				</view>
				<view class="input-section">
					<view class="input-item-l type-three">
						真实姓名
					</view>
					<view class="input-item-r">
						<input type="text" name="userName" v-model="stepsThree.userName" maxlength="20" placeholder="请输入真实姓名..."
						 placeholder-class="holder" />
					</view>
				</view>
				<view class="input-section">
					<view class="input-item-l type-three">
						身份证号码
					</view>
					<view class="input-item-r">
						<input type="idcard" name="idcard" v-model="stepsThree.IDCard" maxlength="18" placeholder="请输入身份证号码..."
						 placeholder-class="holder" @blur="idBlur" />
					</view>
				</view>
				<view class="input-section">
					<view class="input-item-l type-three">
						手机号码
					</view>
					<view class="input-item-r">
						<input type="number" name="phone" v-model="stepsThree.phone" maxlength="11" placeholder="请输入手机号码..."
						 placeholder-class="holder" />
					</view>
				</view>
				<view class="input-section">
					<view class="input-item-l type-three">
						输入验证码
					</view>
					<view class="input-item-r type-code">
						<input type="number" name="code" v-model="stepsThree.code" maxlength="6" placeholder="请输入..." placeholder-class="holder" />
						<text class="phoneCode text-center" @tap="!safety.state ? fnGetPhoneCode() : ''">
							{{!safety.state&&'获取验证码'||(safety.time+' s')}}
						</text>
					</view>
				</view>
				<view class="btn-section">
					<button type="default" :disabled="!disabledThree" class="cu-btn next-steps" @click="submit">完成提交</button>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeSteps: 1, // 当前步骤
				disabledOne: false,
				disabledTwo: false,
				disabledThree: false,
				stepsOne: {
					shopName: "", // 店铺名称
					businessName: "", // 商家全称
					legalPerson: "", // 法人姓名
				},
				tempFilePaths: [],
				BusinessLicense: [], // 营业执照
				stepsThree: {
					userName: "", // 真实姓名
					IDCard: "", // 身份证号码
					phone: "", // 手机号码
					code: "", // 验证码
				},
				// 验证码
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
				cardReg: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
				shop_authentication_id: "",
			}
		},
		onLoad(options) {
			console.log("options", options)
			if (options.steps) this.activeSteps = options.steps;
			if (options.shopId) this.shop_authentication_id = options.shopId;
			if (this.$db.get("shopId")) this.shop_authentication_id = this.$db.get("shopId");
		},
		watch: {
			// 监听第一步
			stepsOne: {
				handler(newValue) {
					if (newValue.shopName && newValue.businessName && newValue.legalPerson) {
						this.disabledOne = true;
					} else {
						this.disabledOne = false;
					}
				},
				deep: true
			},
			BusinessLicense: {
				handler(newValue) {
					this.disabledTwo = !!newValue
				}
			},
			// 监听第三步
			stepsThree: {
				handler(newValue) {
					if (newValue.userName && this.cardReg.test(newValue.IDCard) && this.phoneReg.test(newValue.phone) && newValue.code
						.length === 6) {
						this.disabledThree = true;
					} else {
						this.disabledThree = false;
					}
				},
				deep: true
			},
		},
		methods: {
			nextSteps() {
				this.activeSteps++;
			},
			idBlur() {
				if(!this.cardReg.test(this.stepsThree.IDCard)) {
					uni.showToast({
						icon: "none",
						title: "身份证输入有误~"
					})
				}
			},
			chooseImage() {
				this.$http.uploadImage(1, (res, tem) => {
					this.BusinessLicense.push(...tem);
					this.tempFilePaths.push(res.data.url);
				})
			},
			// 删除图片
			delImage(e) {
				uni.showModal({
					title: '删除照片',
					content: '确定要删除这张照片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.BusinessLicense = []
							this.tempFilePaths = []
						}
					}
				})
			},
			// 预览
			previewImage(e) {
				uni.previewImage({
					urls: this.tempFilePaths,
					current: e.currentTarget.dataset.src
				})
			},
			// 获取验证码
			fnGetPhoneCode() {
				if (this.phoneReg.test(this.stepsThree.phone)) {
					uni.showToast({
						title: "正在发送验证码",
						icon: "loading",
						success: () => {
							// 成功后显示倒计时60s后可在点击
							this.safety.state = true;
							// 倒计时
							this.safety.interval = setInterval(() => {
								if (this.safety.time-- <= 0) {
									this.safety.time = 60;
									this.safety.state = false;
									clearInterval(this.safety.interval);
								}
							}, 1000);
							// 发送验证码
							this.$http.postSendCode({
								mobile: this.stepsThree.phone
							}, res => {
								console.log("发送验证码：", res)
								if (res.code == 1) {
									uni.showToast({
										title: "发送成功",
										icon: "success"
									})
								} else {
									this.$common.errorToShow(res.msg);
								}
							})
						}
					})
				} else {
					uni.showToast({
						title: "手机号不正确",
						icon: "none"
					})
				}
			},
			submit() {
				const shop_id = this.$db.get("shop_id") || "";
				this.$http.postSaveShopUser({
					shop_id, // 店铺id
					shop_authentication_id: this.shop_authentication_id, // 商家id
					shop_title: this.stepsOne.shopName, // 店铺名称
					shop_name_full: this.stepsOne.businessName, // 商家全称
					legalname: this.stepsOne.legalPerson, // 法人
					license_image: this.tempFilePaths[0], // 营业执照
					mobile: this.stepsThree.phone, // 手机号
					username: this.stepsThree.userName, // 办证人
					card: this.stepsThree.IDCard, // 身份证
					captcha: this.stepsThree.code // 验证码
				}, res => {
					if (res.code == 1) {
						uni.reLaunch({
							url: `/pages/login/shopAuth?shopId=${this.shop_authentication_id}`
						})
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {


		.nav-section {
			height: 350rpx;
			background-image: url("https://wxhyx-cdn.aisspc.cn/static/auth_bg.png");
			background-size: 100% 100%;

			.navBack {
				// width: 100rpx;
				@include flexX;
				font-size: 36rpx;
				color: #FFFFFF;
				margin-bottom: 30rpx;
				margin: 0 27rpx;

				.edg {
					flex: .3;
				}

				.title {
					flex: .4;
					text-align: center;
				}

			}
		}

		.steps-section {
			@include flexX;
			@include flexJ;
			padding-top: 50rpx;

			.steps-inner {
				@include flexX;
				@include flexJ;
			}

			.round-text {
				font-size: 34rpx;
				color: #B1BDE8;
				background-color: #4F66B6;
				line-height: 60rpx;
				width: 60rpx;
				border: 1rpx solid #8593C8;
				border-radius: 50%;

				&.active-round {
					background-color: #FFFFFF;
					color: #536BB9;
				}
			}

			.line {
				height: 0;
				width: 160rpx;
				border-bottom: 2rpx dashed #8190C6;

				&.active-line {
					border-bottom-style: solid;
					border-bottom-color: #B3BEE7;
				}
			}

		}

		.auth-section {
			width: 100%;
			position: relative;
			z-index: 1;
			overflow: hidden;
			margin-top: -160rpx;

			&::after {
				content: '';
				width: 140%;
				height: 100px;
				position: absolute;
				left: -20%;
				top: 0;
				z-index: -1;
				border-radius: 50% 50% 0 0;
				background: #FFFFFF;
			}

			.steps-one {
				padding-top: 172rpx;
			}

			.steps-two {
				@include flexY;
				padding-top: 86rpx;

				.upload-title {
					font-size: 34rpx;
					font-weight: 500;
					color: #363636;
					margin-bottom: 33rpx;
				}

				.upload-section {
					@include flexY;
					@include flexA;

					.img-section {
						position: relative;
						@include flexX;

						.img {
							width: 440rpx;
							height: 360rpx;
							margin: 0 auto 24rpx;
						}

						.cuIcon-roundclosefill {
							font-size: 48rpx;
							position: absolute;
							right: 0;
							top: 0;
							z-index: 1;
						}
					}


					.tip-wrap {
						display: flex;
						color: #989EAC;
						font-size: 24rpx;
						line-height: 40rpx;

						.tip-l {
							.red {
								color: #F75347;
								margin-right: 6rpx;
							}

							margin-right: 10rpx;
						}

						.tip-r {
							@include flexY;

						}
					}
				}

				.btn-section {
					margin-top: 45rpx;
				}
			}

			.steps-three {
				padding-top: 84rpx;

				.input-title {
					font-size: 36rpx;
					font-weight: 800;
					color: #363636;
					margin-bottom: 54rpx;
				}

				.btn-section {
					margin-top: 60rpx;
				}
			}

			.input-section {
				@include flexX;
				width: 560rpx;
				height: 93rpx;
				background-color: #F8F8F8;
				border-radius: 14rpx;
				margin: 0 auto 40rpx;

				.input-item-l {
					margin-left: 30rpx;
					font-size: 30rpx;
					color: #363636;
					font-weight: 500;
					white-space: nowrap;

					&.type-three {
						width: 150rpx;
					}
				}

				.input-item-r {
					margin: 0 20rpx;

					input {
						height: 93rpx;
					}

					&.type-code {
						@include flexX;

						.phoneCode {
							white-space: nowrap;
							font-size: 26rpx;
							color: #5280E0;
							border-left: 2rpx solid #5280E0;
							padding-left: 8rpx;
							line-height: 1;
							width: 128rpx;
						}
					}
				}

				.holder {
					font-size: 26rpx;
					color: #C9CBD3;
					font-weight: 500;
				}
			}

			.tip-section {
				font-size: 24rpx;
				color: #989EAC;
				font-weight: 400;

				.red {
					color: #F75347;
					margin-right: 10rpx;
				}
			}

			.btn-section {
				margin-top: 106rpx;
				@include flexX;
				@include flexJ;

				.next-steps {
					width: 590rpx;
					height: 100rpx;
					background-color: #F75347;
					border-radius: 50rpx;
					font-size: 34rpx;
					color: #FFFFFF;
					font-weight: 500;
				}
			}

		}

	}
</style>
