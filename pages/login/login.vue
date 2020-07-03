<template>
	<view class="container">

		<view class="logo server">
			<image src="https://wxhyx-cdn.aisspc.cn/static/logo.png" mode=""></image>
		</view>

		<view class="platform">
			<text>无锡好印象-经营评价平台</text>
			<text>商家管理中心</text>
		</view>

		<view class="server-section">
			<view class="item-l">
				账号
			</view>
			<view class="item-r">
				<input type="number" v-model="mobile.phone" maxlength="11" placeholder="请输入手机号码..." placeholder-class="holder" />
				<!-- <button class="getNum" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button> -->
			</view>
		</view>


		<view class="server-section">
			<view class="item-l">
				验证码
			</view>
			<view class="item-r">
				<input type="number" maxlength="6" v-model="mobile.code" placeholder="请输入验证码..." />
				<text class="phoneCode" @click="!safety.state ? fnGetPhoneCode() : ''">
					{{!safety.state&&'获取验证码'||(safety.time+' s')}}
				</text>
			</view>
		</view>

		<view class="btn-section type-server">
			<button type="default" class="cu-btn loginBtn" :disabled="!loginMobile" @tap="fnLogin">
				登录
			</button>
		</view>

		<view class="switch-text">
			<view @click="switchAuthen">
				实名入驻平台<text class="cuIcon-roundrightfill"></text>
			</view>
		</view>

		<!-- btm -->
		<view class="btm-section text-center">
			<!-- <text>主办单位</text>
			<text>无锡市梁溪区市场监督局 无锡市梁溪区通江街道</text> -->
			<text>{{ footInfo.copyright }}</text>
			<text>{{ footInfo.address }}</text>
		</view>


	</view>
</template>

<script>
	const WxAuth = require('@/config/WxAuth');
	export default {
		data() {
			return {
				isClient: true, // 是否是客户端
				mobile: {
					phone: '',
					code: ''
				},
				// 验证码
				safety: {
					time: 60,
					state: false,
					interval: ''
				},
				loginMobile: false,
				phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
				footInfo: {},
			}
		},
		watch: {
			/**
			 * 监听手机登录数值
			 */
			mobile: {
				handler(newValue) {
					if (this.phoneReg.test(newValue.phone) && newValue.code.length === 6) {
						this.loginMobile = true;
					} else {
						this.loginMobile = false;
					}
				},
				deep: true
			},
		},
		onLoad(options) {
			this.getFootConfig();
		},
		onShow() {
			// 复位验证码倒计时
			this.safety.time = 60;
			this.safety.state = false;
			clearInterval(this.safety.interval);
		},
		methods: {
			getFootConfig() {
				this.$http.getFootConfig({}, res => {
					if (res.code == 1) {
						this.footInfo = res.data;
					} else {
						this.$common.errorToShow(res.msg)
					}
				})
			},
			// 登录按钮点击执行
			fnLogin() {
				uni.showLoading({
					title: "登陆中...",
					mask: true
				})
				this.$http.postMobilelogin({
					mobile: this.mobile.phone,
					captcha: this.mobile.code
				}, res => {

					// // 复位验证码倒计时
					// this.safety.time = 60;
					// this.safety.state = false;
					// clearInterval(this.safety.interval);

					// 未实名认证
					if (res.code == 2) {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "/pages/login/authentication"
							})
						}, 1000)
						return;
					} else if (res.code == 1) {
						uni.hideLoading()
						uni.showToast({
							icon: "success",
							title: "登录成功"
						})
						this.$db.set("userinfo", res.data.userinfo);
						this.$db.set("shopId", res.data.shopAuthenticationId);
						const a = res.data.shopFirst;
						const b = res.data.shopStatus;
						setTimeout(() => {
							if (a == 2) {
								uni.reLaunch({
									url: "/pages/shop/shopCenter"
								})
								uni.hideHomeButton()
							} else {
								let c = null;
								switch (b) {
									case 0: // 未通过
										c = 2;
										break
									case 1: // 通过
										c = 1;
										break
									case 2: // 待审核
										c = 0;
										break
								}
								uni.navigateTo({
									url: `/pages/login/status?status=${c}`
								})
							}
						}, 500)
						return
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			// 获取用户电话
			getPhoneNumber(e) {
				console.log("getPhoneNumber", e)
				let {
					errMsg,
					iv,
					encryptedData
				} = e.detail;
				let confirm_unionid = uni.getStorageSync('confirm_unionid') || '';
				if (errMsg == "getPhoneNumber:ok") { // 同意授权
					uni.hideLoading()
					// 检查登录态是否过期。
					WxAuth.checkSession().then(code => {
						//code, iv, encryptedData 传给服务器解析，得到手机号信息
						const data = {
							code,
							iv,
							encryptedData,
							confirm_unionid
						};
						this.$http.getMobile(data, res => {
							if (res.code == 1) {
								uni.showToast({
									title: "授权成功！"
								})
								this.mobile.phone = res.data.mobile;
								uni.hideLoading();
							}
						}).catch(err => {
							console.log(err)
						})

					}).catch(console.log)
				} else {
					// 拒绝手机号授权
					uni.showToast({
						title: '手机号授权失败！',
						icon: 'none'
					});
				}
			},
			// 获取验证码
			fnGetPhoneCode() {
				let _this = this;
				if (this.phoneReg.test(this.mobile.phone)) {

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
							_this.$http.postSendCode({
								mobile: _this.mobile.phone,
							}, res => {
								console.log("发送验证码：", res)
								if (res.code == 1) {
									uni.showToast({
										title: "发送成功",
										icon: "success"
									})
								} else {
									_this.$common.errorToShow(res.msg);
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
			// 实名认证
			switchAuthen() {
				uni.navigateTo({
					url: "/pages/login/authentication"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		min-height: 100vh;
		background-image: url("https://wxhyx-cdn.aisspc.cn/static/login_bg_shop.png");
		background-size: 100% 100%;
		position: relative;

		.server-section {
			@include flexX;
			margin: 0 auto;
			width: 630rpx;
			height: 93rpx;
			border: 1rpx solid #5E6377;
			border-radius: 14rpx;
			margin-bottom: 24rpx;

			input {
				color: #FFFFFF;
			}

			.holder {
				font-size: 28rpx;
				color: #75767D;
			}

			.item-l {
				font-size: 34rpx;
				color: #FFFFFF;
				font-weight: 800;
				flex: .25;
				white-space: nowrap;
				text-indent: 30rpx;
			}

			.item-r {
				flex: .75;
				@include flexX;

				.getNum {
					border: none;
					font-size: 28rpx;
					color: #FF473E;
					font-weight: 500;
					white-space: nowrap;
					margin-right: 25rpx;
					background-color: rgba(255, 255, 255, 0);
				}

				.phoneCode {
					font-size: 28rpx;
					color: #FF473E;
					font-weight: 500;
					margin-right: 25rpx;
					white-space: nowrap;
					border-left: 1rpx solid #FF473E;
					padding-left: 12rpx;
				}
			}
		}

		.logo {
			@include flexX;
			@include flexJ;
			width: 100%;
			padding-top: 164rpx;

			&.server {
				padding-top: 154rpx;
				margin-bottom: 0;
			}

			image {
				width: 200rpx;
				height: 200rpx;
			}

			margin-bottom: 123rpx;
		}

		.platform {
			font-size: 40rpx;
			font-weight: 500;
			font-style: italic;
			color: #FFFFFF;
			margin-top: 37rpx;
			margin-bottom: 66rpx;
			@include flexY;
			text-align: center;
			line-height: 1;

			text {
				&:first-child {
					margin-bottom: 20rpx;
				}
			}
		}

		.switch-text {
			@include flexX;
			@include flexJ;

			font-size: 30rpx;
			color: #F75347;
			text-align: center;
			margin: 50rpx auto 0;

			.cuIcon-roundrightfill {
				margin-left: 10rpx;
			}
		}

		.btn-section {
			@include flexX;
			@include flexJ;
			padding-top: 40rpx;

			&.type-server {
				padding-top: 53rpx;
			}

			.loginBtn {
				width: 640rpx;
				height: 98rpx;
				background-color: #D82A2B;
				border-radius: 49rpx;
				color: #FFFFFF;
				font-size: 34rpx;
				margin: 0 auto;
			}
		}


		.btm-section {
			@include flexY;
			@include flexJ;
			border-top: 1rpx solid #414449;
			width: 680rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 80rpx;
			padding-top: 45rpx;
			font-size: 22rpx;
			color: #403F41;
			line-height: 40rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;

			text {
				white-space: nowrap;
			}
		}




	}
</style>
