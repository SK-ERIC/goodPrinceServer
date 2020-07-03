<template>
	<view class="container">
		<view class="shopAuth-section text-center">
			<image class="img" src="https://wxhyx-cdn.aisspc.cn/static/shopAuth.png" mode=""></image>
			<text class="tip">您的店铺实名认证已提交</text>
			<text class="text">请关注手机短信，实名认证审核成功之后，您会收到认证成功的短信。</text>
			<text class="text">您还可以用实名认证提交的手机号码登录后台，查看审核进度。</text>
		</view>
		<view class="btn-section">
			<navigator v-if="!shopId || !check" open-type="exit" target="miniProgram" class="cu-btn btn">
				我知道了
			</navigator>
			<button v-else type="default" class="cu-btn btn" @click="switchToShopCenter">我知道了</button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopId: "", // 商家id
				check: false
			}
		},
		onLoad(options) {
			console.log("options", options)
			if (options.shopId) this.shopId = options.shopId;
			if (this.$db.get("check")) {
				this.check = this.$db.get("check")
			}

			this.$db.del("check")
		},
		methods: {
			switchToShopCenter() {
				uni.reLaunch({
					url: "/pages/shop/shopCenter"
				})
				uni.hideHomeButton()
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

		.shopAuth-section {
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
