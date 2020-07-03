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
				shopInfo: {},
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
		onLoad() {
			this.getShopAuthentication()
		},
		methods: {
			getShopAuthentication() {
				const shop_authentication_id = this.$db.get("shopId");
				this.$http.getShopAuthentication({
					shop_authentication_id
				}, res => {
					if (res.code == 1) {
						this.shopInfo = res.data;
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			_switchSet(item) {
				switch (item.id) {
					case 0:
						uni.navigateTo({
							url: "/pages/shop/accountChange"
						})
						break
					case 1:
						if (this.shopInfo.chagesub == 0) {
							uni.navigateTo({
								url: "/pages/shop/check"
							})
						} else {
							const a = this.shopInfo.status;
							let c = "";
							switch (a) {
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
							if (c == 1) {
								// // 实名认证页无法返回变更实名页
								// uni.reLaunch({
								// 	url: `/pages/login/status?status=${c}&succ=true`
								// })
								// 改变chagesub字段为0
								const shopId = this.$db.get("shopId")
								this.$http.postSetChagesub({
									shop_authentication_id: shopId
								}, res => {
									if (res.code == 1) {
										uni.navigateTo({
											url: "/pages/shop/check"
										})
									} else {
										this.$common.errorToShow(res.msg);
									}
								})
								
							} else {
								let d = "";
								if (c == 0) d = 1;
								uni.navigateTo({
									url: `/pages/login/status?status=${c}&change=${d}`
								})
							}
						}
						
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
