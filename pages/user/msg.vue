<template>
	<view class="container">
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="msg-wrap">
				<view class="msg-section" v-for="(item, index) in msgList" :key="index" @click="_switchToDetail(item)">
					<view class="msg-item-l">
						<image class="img" src="https://wxhyx-cdn.aisspc.cn/static/msgIcon.png" mode=""></image>
						<text class="dot" v-show="!item.is_read"></text>
					</view>
					<view class="msg-item-r">
						<view class="item-inner-t">
							<text class="title"> 系统消息 </text>
							<text class="date"> {{ item.createtime }} </text>
						</view>
						<view class="item-inner-b">
							{{ item.contents }}
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				msgList: [],
				pageIndex: 1,
				pageSize: 3,
				user_id: "",
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 3, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					textLoading: '加载中 ...', // 加载中的提示文本
					textNoMore: '-- END --', // 没有更多数据的提示文本
					empty: {
						use: true, // 是否显示空布局
						icon: "https://wxhyx-cdn.aisspc.cn/static/nthing.png", // 图标路径
						tip: '~ 暂无相关数据 ~', // 提示
						// btnText: '我来说个话', // 按钮
						// // fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						// // top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						// // zIndex: 99 // fixed定位z-index值
					},
				}
			}
		},
		onLoad(options) {
			this.user_id = this.$db.get("userinfo").user_id;
		},
		onShow() {
			this.getReplySms();
		},
		methods: {
			getReplySms() {
				let shop_id = this.$db.get("shop_id")
				const total = this.$db.get("shopInfo").shopReply;
				this.$http.ShopReply({
					shop_id,
					page: this.pageIndex,
					page_size: this.pageSize
				}, res => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
					if (res.code == 1) {
						this.mescroll.endBySize(this.msgList.length, total); //必传参数(当前页的数据个数, 总数据量)
						if (this.pageIndex == 1) this.msgList = []; //如果是第一页需手动制空列表
						this.msgList = this.msgList.concat(res.data);
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据
				this.getReplySms();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.pageIndex = page.num;
				this.pageSize = page.size;
				this.getReplySms();
			},
			_switchToDetail(item) {
				uni.navigateTo({
					url: `/pages/user/msgDetail?id=${item.id}`
				})
			},
			navBack() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {


		.navBack {
			display: inline-flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 36rpx;
			color: #282828;
			margin-left: 27rpx;
			margin-bottom: 30rpx;

			.cuIcon-back {
				margin-right: 30rpx;
			}
		}

		.msg-wrap {
			padding: 0 45rpx;

			.msg-section {
				@include flexSB;
				height: 150rpx;
				border-bottom: 2rpx solid #F3F3F3;

				.msg-item-l {
					position: relative;

					.img {
						width: 84rpx;
						height: 84rpx;
						border-radius: 50%;
					}

					.dot {
						width: 25rpx;
						height: 25rpx;
						border-radius: 50%;
						background-color: #FE4B4D;
						position: absolute;
						top: 3rpx;
						right: -7rpx;
						border: 1rpx solid #FFFFFF;

					}
				}

				.msg-item-r {
					height: 84rpx;
					width: 84%;
					@include flexY;
					justify-content: space-between;

					.item-inner-t {
						@include flexSB;

						.title {
							font-size: 32rpx;
							color: #142340;
							font-weight: 600;

						}

						.date {
							font-size: 24rpx;
							color: #B1B1B1;
						}
					}

					.item-inner-b {
						@include txt_cut;
						color: #9295A1;
						font-size: 26rpx;
					}
				}
			}

		}


	}
</style>
