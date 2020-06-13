<template>
	<view class="container">
		<view class="head">
			<image src="https://wxhyx-cdn.aisspc.cn/static/contact_bg.png" mode=""></image>
		</view>

		<view class="foot-section">
			<!-- 底部 -->
			<view class="bottom-section">
				<view class="comTop">
					<text>{{ footInfo.copyright }}</text>
					<text>{{ addressB }}</text>
					<text>{{ addressA }}</text>
					<view class="phone">
						<image src="https://wxhyx-cdn.aisspc.cn/static/contactUs_phone.png" mode="" @click="callPhone"></image>
						<text>电话号码：{{ footInfo.tel }}</text>
					</view>
					<view class="email">
						<image src="https://wxhyx-cdn.aisspc.cn/static/contactUs_email.png" mode="" @tap="setClipboard"></image>
						<text>电子邮箱：{{ footInfo.mailbox }}</text>
					</view>
				</view>
				<view class="code-wrap">
					<view class="code-inner text-center" v-for="(item, index) in codeList" :key="index">
						<text class="text">{{ item.titles }}</text>
						<image class="code-img" :src="item.image_ewm" mode=""></image>
						<view class="code-tip">
							<text>请长按识别二维码</text>
							<text>{{ item.title_tip }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeList: [],
				footInfo: {},
				addressA: "",
				addressB: ""
			}
		},
		onLoad() {
			this.getFootInfo();
			this.getFootConfig();
		},
		methods: {
			getFootInfo() {
				this.$http.getFootInfo({}, res => {
					if (res.code == 1) {
						// this.codeList = res.data.reverse();
						this.codeList = res.data;
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			getFootConfig() {
				this.$http.getFootConfig({}, res => {
					if (res.code == 1) {
						this.footInfo = res.data;
						let a = res.data.address.trim().split(/\s+/); 
						this.addressA = a[0];
						this.addressB = a[1];
					} else {
						this.$common.errorToShow(res.msg)
					}
				})
			},
			setClipboard() {
				var data = this.footInfo.mailbox;
				if (data.length === 0) {
					uni.showModal({
						title: '设置剪贴板失败',
						content: '内容不能为空',
						showCancel: false
					})
				} else {
					uni.setClipboardData({
						data: data,
						success: () => {
							// 成功处理
							// #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
							uni.showToast({
								title: '设置剪贴板成功',
								icon: "success",
								mask: !1
							})
							// #endif
						},
						fail: () => {
							// 失败处理
							// #ifdef MP-ALIPAY || MP-BAIDU || MP-TOUTIAO
							uni.showToast({
								title: '储存数据失败!',
								icon: "none",
								mask: !1
							})
							// #endif
						}
					});
				}
			},
			// 拨打电话。
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.footInfo.tel,
					fail: (err) => {
						console.log("err", err)
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {

		.head {
			background-color: #A01613;

			image {
				width: 100%;
				height: 556rpx;
			}
		}

		.foot-section {
			background-color: #A11612;
			padding: 26rpx 20rpx;

			.bottom-section {
				background-color: #FFF5F4;
				border-radius: 10rpx;
				overflow: hidden;


				.comTop {
					@include flexY;
					@include flexJ;
					padding-top: 90rpx;
					text-align: center;

					text {
						font-size: 32rpx;
						line-height: 54rpx;
						color: #333333;
						font-weight: 500;
					}

					.phone,
					.email {
						@include flexX;
						@include flexJ;

						image {
							width: 44rpx;
							height: 44rpx;
							margin-right: 18rpx;
						}
					}

					.phone {
						margin: 80rpx 0 20rpx;
					}

					.email {
						margin-bottom: 150rpx;
					}
				}

				.code-wrap {
					@include flexX;
					@include flexJ;
					margin-bottom: 63rpx;

					.code-inner {
						@include flexY;
						@include flexA;
						width: 350rpx;

						&:first-child {
							margin-right: 30rpx;
						}

						.text {
							font-size: 24rpx;
							color: #333E49;
							font-weight: 400;
						}

						.code-img {
							width: 200rpx;
							height: 200rpx;
							margin: 20rpx 0;
						}

						.code-tip {
							@include flexY;
							font-size: 20rpx;
							color: #8B8B8B;
							line-height: 30rpx;
							white-space: nowrap;
						}
					}
				}

				.supervise-wrap {
					@include flexX;
					@include flexJ;
					margin: 50rpx 0 60rpx;

					.icon-phone {
						width: 32rpx;
						height: 27rpx;
						margin-right: 11rpx;
					}

					font-size: 24rpx;
					color: #646D77;
					font-weight: 400;
				}

				.copyright {
					font-size: 20rpx;
					color: #8B8B8B;
					font-weight: 400;
					padding: 0 32rpx;
				}

				.recordNo {
					font-size: 16rpx;
					color: #8B8B8B;
					font-weight: 400;
					margin-top: 15rpx;
					padding: 0 32rpx;
				}

				.government {
					@include flexX;
					@include flexJ;
					margin-top: 24rpx;
					padding-bottom: 36rpx;

					image {
						width: 56rpx;
						height: 68rpx;
					}
				}

			}

		}


	}
</style>
