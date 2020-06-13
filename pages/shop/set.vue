<template>
	<view class="container">
		<view class="set-section">
			<view class="set-inner" v-for="(item, index) in setList" :key="index" @click="_switchSet(item)">
				<view class="set-item-l">
					<image class="logo" :src="item.logo" mode=""></image>
					<text>{{ item.name }}</text>
				</view>
				<view class="set-item-r">
					<text class="cuIcon-right"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				setList: [{
						id: 0,
						logo: "https://wxhyx-cdn.aisspc.cn/static/set_change.png",
						name: "账号更换"
					},
					{
						id: 1,
						logo: "https://wxhyx-cdn.aisspc.cn/static/set_check.png",
						name: "实名认证"
					},
					{
						id: 2,
						logo: "https://wxhyx-cdn.aisspc.cn/static/set_contact.png",
						name: "联系我们"
					}
				]
			}
		},
		methods: {
			_switchSet(item) {
				switch (item.id) {
					case 0:
						uni.navigateTo({
							url: "/pages/shop/accountChange"
						})
						break
					case 1:
						uni.navigateTo({
							url: "/pages/shop/check"
						})
						break
					case 2:
						uni.navigateTo({
							url: "/pages/shop/contactUs"
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

		.set-section {
			padding: 30rpx 38rpx 0;

			.set-inner {
				height: 150rpx;
				@include flexSB;
				border-bottom: 2rpx solid #F3F3F3;

				.set-item-l {
					@include flexX;

					.logo {
						width: 88rpx;
						height: 88rpx;
					}

					text {
						font-size: 32rpx;
						color: #142340;
						font-weight: 800;
						margin-left: 25rpx;
					}
				}

				.set-item-r {
					.cuIcon-right {
						font-size: 24rpx;
						color: #B1B1B1;
					}
				}

			}
		}
	}
</style>
