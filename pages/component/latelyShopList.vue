<template>
	<view class="container">
		<view class="shop-section">
			<view class="lately-cont" v-for="(item, index) in latelyList" :key="index">
				<view class="item-l">
					<image class="img" :src="item.logo" mode=""></image>
					<text class="browse">浏览: {{ item.browse }}</text>
				</view>
				<view class="item-r">
					<view class="item-cont-t">
						<text class="title">{{ item.title }}</text>
						<text class="address">
							<text>地址·</text>
							{{ item.address }}
						</text>
					</view>
					<view class="item-cont-b">
						<text class="mainCont">
							<text>内容·</text>
							{{ item.mainCont }}
						</text>
						<view class="rate-wrap">
							<view class="rate">
								<text>综合评分</text>
								<uni-rate disabled="true" :size="16" :max="5" :value="item.rate" />
							</view>
							<view class="date">
								{{ item.date }}
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="nthing-section">

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: "latelyShopList",
		props: {
			latelyList: { // 数据列表
				type: Array,
				default () {
					return []
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		.shop-section {
			margin: 26rpx 30rpx 0;
			background-color: #FFFFFF;
			border-radius: 16rpx;
			padding: 40rpx 20rpx 60rpx;

			.lately-cont {
				display: flex;
				margin-bottom: 80rpx;

				&:last-child {
					margin-bottom: 0;
				}

				.item-l {
					position: relative;

					.img {
						width: 194rpx;
						height: 194rpx;
						border-radius: 14rpx;
					}

					.browse {
						position: absolute;
						left: 0;
						bottom: 24rpx;
						height: 35rpx;
						background: linear-gradient(90deg, #F98F30, #FFAD03);
						border-radius: 0rpx 18rpx 18rpx 0rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: #FFFFFF;
						padding: 0 8rpx;
					}
				}

				.item-r {
					flex: 1;
					margin-left: 20rpx;
					@include flexY;
					width: 60%;
					justify-content: space-between;

					.item-cont-t {
						height: 48%;
						@include flexY;
						justify-content: space-between;

						.title {
							@include txt_cut;
							font-size: 36rpx;
							color: #282828;
							font-weight: bold;
						}

						.address {
							font-size: 24rpx;
							color: #333333;
							@include txt_cut;

							text {
								font-weight: bold;
								color: #282828;
							}
						}
					}

					.item-cont-b {
						height: 48%;
						@include flexY;
						justify-content: space-between;

						.mainCont {
							font-size: 24rpx;
							color: #333333;
							@include txt_cut;

							text {
								font-weight: bold;
								color: #282828;
							}
						}

						.rate-wrap {
							@include flexX;
							justify-content: space-between;

							.rate {
								@include flexX;
								align-items: baseline;

								text {
									font-weight: bold;
									font-size: 24rpx;
									color: #282828;
									margin-right: 20rpx;
								}
							}

							.date {
								font-size: 24rpx;
								color: #B1B1B1;
								font-weight: 400;
							}
						}
					}
				}
			}

		}
	}
</style>
