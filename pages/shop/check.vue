<template>
	<view class="container skeleton">
		<m-skeleton selector="skeleton" :show="showSkeleton"></m-skeleton>
		<view class="check-section">
			<image class="img skeleton-rect" :src="shopInfo.license_image" mode="aspectFill" :data-src="shopInfo.license_image" @click="previewImage"></image>
			<view class="text-inner skeleton-rect">
				<view class="text-l">
					公司名称
				</view>
				<view class="text-r">
					{{ shopInfo.shop_name_full }}
				</view>
			</view>
			<view class="text-inner skeleton-rect">
				<view class="text-l">
					法人姓名
				</view>
				<view class="text-r">
					{{ shopInfo.legalname }}
				</view>
			</view>
			<view class="text-inner skeleton-rect">
				<view class="text-l">
					办理人姓名
				</view>
				<view class="text-r">
					{{ shopInfo.username }}
				</view>
			</view>
			<view class="text-inner skeleton-rect">
				<view class="text-l">
					手机号码
				</view>
				<view class="text-r">
					{{ shopInfo.mobile }}
				</view>
			</view>
		</view>

		<view class="btn-section">
			<button type="default" class="cu-btn btn skeleton-rect" @click="switchToAuth">变更实名认证</button>
		</view>
	</view>
</template>

<script>
	import mSkeleton from '@/components/skeleton/skeleton.vue'
	export default {
		components: {
			mSkeleton
		},
		data() {
			return {
				showSkeleton: true,
				shopInfo: {
					shop_name_full: "",
					legalname: "",
					username: "",
					mobile: ""
				},
				imgList: [],
			}
		},
		onLoad() {
			this.getShopAuthentication()
		},
		methods: {
			previewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.src
				})
			},
			getShopAuthentication() {
				const shop_authentication_id = this.$db.get("shopId");
				this.$http.getShopAuthentication({
					shop_authentication_id
				}, res => {
					if (res.code == 1) {
						this.shopInfo = res.data;
						this.imgList.push(res.data.license_image)
						this.showSkeleton = false
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			switchToAuth() {
				if (this.shopInfo.chagesub == 0) {
					this.$db.set("check", true);
					const shopId = this.$db.get("shopId");
					uni.navigateTo({
						url: `/pages/login/authentication?shopId=${shopId}`
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
						// 实名认证页无法返回变更实名页
						uni.reLaunch({
							url: `/pages/login/status?status=${c}&succ=true`
						})
						uni.hideHomeButton()
					} else {
						let d = "";
						if (c == 0) d = 1;
						uni.navigateTo({
							url: `/pages/login/status?status=${c}&change=${d}`
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		.check-section {
			padding: 30rpx 65rpx 0;

			.img {
				width: 100%;
				height: 336rpx;
				margin-bottom: 70rpx;
			}

			.text-inner {
				@include flexX;
				margin-bottom: 36rpx;

				.text-l {
					flex: .3;
					font-size: 30rpx;
					font-weight: 800;
					color: #363636;

				}

				.text-r {
					flex: .7;
					font-size: 30rpx;
					font-weight: 500;
					color: #142340;
				}
			}
		}

		.btn-section {
			@include flexX;
			@include flexJ;
			padding-top: 130rpx;

			.btn {
				width: 590rpx;
				height: 100rpx;
				background-color: #F75347;
				color: #ffffff;
				border-radius: 50rpx;
				font-size: 34rpx;
				font-weight: 500;
			}
		}

	}
</style>
