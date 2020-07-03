<template>
	<view class="container">
		<view class="info-section">
			<view class="shop-name">
				{{ info.shop_title }}
			</view>
			<view class="shop-id">
				ID:{{ info.id }}
			</view>
			<view class="rate-t">
				<text class="text">顾客满意</text>
				<uni-rate disabled="true" :size="18" :max="5" :value="info.score" />
				<view class="num">
					{{ info.score }}分 <text>({{ info.commentCounts }}人)</text>
				</view>
			</view>
			<view class="rate-b">
				<text class="text">综合评分</text>
				<uni-rate disabled="true" :size="18" :max="5" :value="info.total_score" />
				<text class="num">{{ info.total_score }}分</text>
			</view>
			<view class="nav-list">
				<view class="nav-section" v-for="(item, index) in navList" :key="index" @click="_switchNav(item)">
					<view class="nav-item-l">
						<image class="logo" :src="item.logo" mode=""></image>
						<view class="text">
							<text class="name">{{ item.name }}</text>
							<text class="desc">{{ item.desc }}</text>
						</view>
					</view>
					<view class="nav-item-r">
						<view class="new cu-tag round  line-red" v-if="item.status">New</view>
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>

		</view>
		<view class="foot_section text-center">
			<text>{{ footInfo.copyright }}</text>
			<text>{{ footInfo.address }}</text>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	export default {
		components: {
			uniRate,
		},
		data() {
			return {
				info: {
					shop_title: "",
					id: "",
					score: 0,
					commentCounts: 0,
					total_score: 0
				},
				footInfo: {},
				navList: [{
						id: 0,
						logo: "https://wxhyx-cdn.aisspc.cn/static/shopCenter_icon_a.png",
						name: "商家资料",
						desc: "备案信息 更改上传资料等",
						status: 0
					},
					{
						id: 1,
						logo: "https://wxhyx-cdn.aisspc.cn/static/shopCenter_icon_b.png",
						name: "顾客留言",
						desc: "顾客留言 评价一键回复",
						status: 0
					},
					{
						id: 2,
						logo: "https://wxhyx-cdn.aisspc.cn/static/shopCenter_icon_c.png",
						name: "系统消息",
						desc: "各类消息 点我查看",
						status: 0
					},
					{
						id: 3,
						logo: "https://wxhyx-cdn.aisspc.cn/static/shopCenter_icon_d.png",
						name: "店铺二维码",
						desc: "店铺专属二维码",
						status: 0
					},
					{
						id: 4,
						logo: "https://wxhyx-cdn.aisspc.cn/static/shopCenter_icon_e.png",
						name: "设置",
						desc: "我的设置",
						status: 0
					}
				]
			}
		},
		onLoad() {
			uni.hideHomeButton()
			this.getFootConfig(); // 获取foot
		},
		onShow() {
			this.postShopCore();
			this.postIsRead();
		},
		methods: {
			postIsRead() {
				const shop_id = this.$db.get("shop_id");
				this.$http.postIsRead({
					shop_id
				}, res => {
					if (res.code = 1) {
						const data = res.data;
						// 新评论
						if (data.comments > 0) {
							this.$set(this.navList[1], `status`, 1);
						} else {
							this.$set(this.navList[1], `status`, 0);
						}
						// 新消息
						if (data.shopReply > 0) {
							this.$set(this.navList[2], `status`, 1);
						} else {
							this.$set(this.navList[2], `status`, 0);
						}
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			postShopCore() {
				const shopId = this.$db.get('shopId');
				this.$http.postShopCore({
					shop_authentication_id: shopId
				}, res => {
					if (res.code == 1) {
						this.info = res.data;
						this.$db.set("shopInfo", res.data)
						this.$db.set("shop_id", res.data.id)
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			getFootConfig() {
				this.$http.getFootConfig({}, res => {
					if (res.code == 1) {
						this.footInfo = res.data;
					} else {
						this.$common.errorToShow(res.msg)
					}
				})
			},
			_switchNav(item) {
				switch (item.name) {
					case "商家资料":
						uni.navigateTo({
							url: "/pages/shop/shopInfo"
						})
						break
					case "顾客留言":
						uni.navigateTo({
							url: `/pages/shop/leaveWord?num=${this.info.commentCounts}`
						})
						break
					case "系统消息":
						uni.navigateTo({
							url: "/pages/user/msg"
						})
						break
					case "店铺二维码":
						// 二维码的审核
						// if (this.info.status == 0) {
						// 	// 未通过
						// 	uni.showToast({
						// 		title: "您的店铺信息审核未通过~",
						// 		icon: "none"
						// 	})
						// } else if (this.info.status == 1) {
						// 	// 待审核
						// 	uni.showToast({
						// 		title: '您的店铺信息正在审核中~',
						// 		icon: "none"
						// 	})
						// } else if (this.info.status == 2) {
						// 	//  已通过
						// 	uni.navigateTo({
						// 		url: "/pages/shop/QRCode"
						// 	})
						// }

						uni.navigateTo({
							url: "/pages/shop/QRCode"
						})

						break
					case "设置":
						uni.navigateTo({
							url: "/pages/shop/set"
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
		// padding-top: 60rpx;
		position: relative;
		padding-bottom: 170rpx;

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

		.info-section {
			// padding: 68rpx 30rpx 0;
			padding: 34rpx 30rpx 0;

			.shop-name {
				font-size: 36rpx;
				color: #282828;
				font-weight: 500;
				margin-bottom: 36rpx;
			}

			.shop-id {
				font-size: 24rpx;
				color: #B1B1B1;
				font-weight: 500;
				margin-bottom: 39rpx;
			}

			.rate-t,
			.rate-b {
				display: flex;
				align-items: baseline;
				font-size: 24rpx;
				font-weight: 500;
				color: #282828;
				margin-bottom: 20rpx;

				.text {
					margin-right: 20rpx;
				}

				.num {
					margin-left: 30rpx;

					text {
						color: #999999;
						margin-left: 15rpx;
					}
				}
			}

			.rate-b {
				margin-bottom: 62rpx;
			}

			.nav-list {
				.nav-section {
					@include flexSB;
					width: 680rpx;
					height: 160rpx;
					border: 1rpx solid #F1F1F0;
					background-color: #FBFAFA;
					margin-bottom: 30rpx;

					.nav-item-l {
						@include flexX;
						;

						.logo {
							width: 100rpx;
							height: 100rpx;
							margin-left: 26rpx;
						}

						.text {
							margin-left: 27rpx;
							@include flexY;

							.name {
								font-size: 34rpx;
								color: #323232;
								font-weight: bold;
							}

							.desc {
								font-size: 22rpx;
								font-weight: 500;
								color: #808080;
								margin-top: 16rpx;
							}
						}
					}

					.nav-item-r {
						margin-right: 30rpx;
						@include flexX;
						@include flexJ;
						text-align: center;

						.new {
							// width: 60rpx;
							// height: 28rpx;
							// background: rgba(255, 177, 79, 0);
							// border: 2rpx solid #FF4238;
							// border-radius: 14rpx;
							font-size: 20rpx;
							// color: #FF453A;
							// font-weight: 500;
							margin-right: 12rpx;
							background-color: rgba(255, 0, 0, .1);

						}

						.cuIcon-right {
							color: #DFDFDF;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.foot_section {
			position: absolute;
			left: 0;
			bottom: 0;
			z-index: 2;
			width: 100%;
			height: 150rpx;
			background-image: url("https://wxhyx-cdn.aisspc.cn/static/cm_btm_bg.png");
			background-size: 100% 100%;
			@include flexY;

			text {
				&:first-child {
					margin-top: 40rpx;
				}

				font-size: 20rpx;
				font-weight: 400;
				line-height: 30rpx;
				font-family:Source Han Sans CN;
				color: #BEBEBE;
			}
		}

	}
</style>
