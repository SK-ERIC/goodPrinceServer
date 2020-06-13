<template>
	<view class="container">
		<!-- pop -->
		<uni-popup ref="pop">
			<view class="pop-section">
				<view class="title text-center">
					温馨提示
				</view>
				<view class="cont text-center">
					{{ popCont }}
				</view>
				<view class="cu-btn btn" @click="confirmPop">
					知道了
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		name: "pop",
		props:{
			popCont: {
				type: String,
				default: ""
			},
		},
		methods:{
			confirmPop() {
				this.$refs.pop.close();
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';
	
	.pop-section {
		width: 590rpx;
		height: 480rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		@include flexY;
		@include flexA;
		justify-content: space-between;
	
		.title {
			font-size: 34rpx;
			color: #666666;
			line-height: 122rpx;
		}
	
		.cont {
			flex: 1;
			margin-top: 26rpx;
			font-size: 30rpx;
			color: #666666;
			width: 390rpx;
			line-height: 44rpx;
		}
	
		.btn {
			width: 440rpx;
			height: 90rpx;
			background-color: #FF544C;
			color: #FFFFFF;
			border-radius: 45rpx;
			margin-bottom: 75rpx;
		}
	}
</style>
