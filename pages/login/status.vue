<template>
	<view class="container">
		<view class="status-section text-center" v-if="info">
			<image class="img" :src="info.src" mode=""></image>
			<text class="tip">{{ info.tip }}</text>
			<text class="text" v-for="(item, index) in info.text" :key="index">{{ item }}</text>
		</view>
		<view class="btn-section" v-if="info && change != '1' ">
			<navigator v-if="info.status == 0 || succ_chang" open-type="exit" target="miniProgram" class="cu-btn btn">
				我知道了
			</navigator>
			<button v-else type="default" class="cu-btn btn" @click="switchBtn(info.status)">{{ info.btn }}</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: null, // 0:审核中;1:已通过;2:未通过;
				info: null,
				infoA: {
					status: 0,
					src: "https://wxhyx-cdn.aisspc.cn/static/status_checking.png",
					tip: "您的实名认证 正在审核中...",
					text: ["请关注手机短信，实名认证审核成功之后，您会收到认证成功的短信。"],
					btn: "我知道了"
				},
				infoB: {
					status: 1,
					src: "https://wxhyx-cdn.aisspc.cn/static/status_success.png",
					tip: "您的实名认证已通过",
					text: ["您提交的实名认证资料已通过审核，请尽快登录商家中心后台，完善您的店铺资料。"],
					btn: "登录商家中心"
				},
				infoC: {
					status: 2,
					src: "https://wxhyx-cdn.aisspc.cn/static/status_faild.png",
					tip: "您的实名认证未通过",
					text: ["请您重新修改资料之后再提交"],
					btn: "变更实名认证"
				},
				change: "", // 是否是变更实名认证
				succ_chang: false
			}
		},
		onLoad(options) {
			const status = options.status;
			status == 0 ? this.info = this.infoA : status == 1 ? this.info = this.infoB : this.info = this.infoC;
			if (options.change) this.change = options.change
			console.log("options.change", options.change)
			if (options.succ) this.succ_chang = true
		},
		methods: {
			switchBtn(status) {
				const shopId = this.$db.get("shopId")
				switch (status) {
					case 1: // 已通过
						this.$http.postShopFirst({
							shop_authentication_id: shopId
						}, res => {
							if (res.code == 1) {
								uni.reLaunch({
									url: "/pages/shop/shopCenter"
								})
							} else {
								this.$common.errorToShow(res.msg);
							}
						})

						break
					case 2: // 未通过
						this.$db.set("check", false)
						uni.navigateTo({
							url: "/pages/login/authentication"
						})
						break
				}
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		padding-top: 60rpx;

		.navBack {
			@include flexX;
			font-size: 36rpx;
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

		.status-section {
			margin: 98rpx auto 0;
			width: 506rpx;
			@include flexY;
			@include flexA;

			.img {
				width: 200rpx;
				height: 200rpx;
				margin-bottom: 52rpx;
			}

			.tip {
				font-size: 34rpx;
				color: #363636;
				font-weight: 500rpx;
				margin-bottom: 28rpx;
			}

			.text {
				font-size: 28rpx;
				color: #989EAC;
				line-height: 44rpx;
				font-weight: 400;
				text-align: left;
				margin-bottom: 33rpx;
			}
		}

		.btn-section {
			padding-top: 35rpx;
			@include flexX;
			@include flexJ;

			.btn {
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
</style>
