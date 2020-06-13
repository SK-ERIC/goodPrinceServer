<template>
	<view class="container">

		<!-- 顾客有话说 -->
		<mescroll-body 
			ref="mescrollRef" 
			:up="upOption" 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback"
		>
			<view class="comment-section">
				<com-list 
					:list="commentList" 
					@confirmSend="_confirmSend" 
					@changeLike="_changeLike" 
					@changeFullText="_changeFullText"
				></com-list>
			</view>
		</mescroll-body>

		<!-- pop -->
		<pop ref="popup" :popCont="popCont"></pop>


	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import comList from '../component/commentList.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue';
	import pop from '../component/pop';
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		components: {
			uniRate,
			comList,
			pop
		},
		data() {
			return {
				total: "",
				pageIndex: 1,
				pageSize: 5,
				// 评论列表
				commentList: [],
				popCont: "您今天对此条留言的点赞次数已达上限",
				upOption: {
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 5, // 每页数据的数量
						time: null // 加载第一页数据服务器返回的时间; 防止用户翻页时,后台新增了数据从而导致下一页数据重复;
					},
					textColor: "gray", // 文本颜色 (当bgColor配置了颜色,而textColor未配置时,则textColor会默认为白色)
					textLoading: '加载中 ...', // 加载中的提示文本
					textNoMore: '-- END --', // 没有更多数据的提示文本
					empty: {
						use: false, // 是否显示空布局
						// icon: "https://wxhyx-cdn.aisspc.cn/static/nthing.png", // 图标路径
						// tip: '~ 暂无相关数据 ~', // 提示
						// btnText: '我来说个话', // 按钮
						// // fixed: false, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,最终会降级为absolute)
						// // top: "100rpx", // fixed定位的top值 (完整的单位值,如 "10%"; "100rpx")
						// // zIndex: 99 // fixed定位z-index值
					},
				}
			}
		},
		onLoad(options) {
			this.total = options.num;
		},
		methods: {
			_confirmSend({
				v,
				e,
				i,
				cont
			}) {
				console.log("v, e, i, cont", v, e, i, cont)
				this.$http.setShopReply({
					comments_id: v.id,
					content: cont
				}, res => {
					if (res.code == 1) {
						this.commentList[i].keeper_content = cont
						// this.mescroll.resetUpScroll()
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			postShopCommentsList() {
				const shop_id = this.$db.get("shop_id")
				this.$http.postShopCommentsList({
					shop_id,
					page: this.pageIndex,
					page_size: this.pageSize
				}, res => {
					//联网成功的回调,隐藏下拉刷新的状态
					this.mescroll.endSuccess();
					if (res.code == 1) {
						this.mescroll.endBySize(this.commentList.length, this.total); //必传参数(当前页的数据个数, 总数据量)
						if (this.pageIndex == 1) this.commentList = []; //如果是第一页需手动制空列表
						this.commentList = this.commentList.concat(res.data);
					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				// 这里加载你想下拉刷新的数据
				// this.postShopCommentsList();
				// 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )
				this.mescroll.resetUpScroll()
			},
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				this.pageIndex = page.num;
				this.pageSize = page.size;
				this.postShopCommentsList();
			},
			_changeLike(val) {
				const {
					item,
					bl,
					index
				} = val;
				let num = +this.commentList[index].like_num;
				// if (bl) {
				// 	this.commentList[index].like = bl;
				// 	this.commentList[index].like_num = num + 1;
				// } else {
				// 	this.$refs.popup.$refs.pop.open();
				// }
			},
			_changeFullText(val) {
				const {
					e
				} = val;
				const index = e.currentTarget.dataset.index;
				const str = e.currentTarget.dataset.text;
				this.commentList[index].full_text = str == "全文" ? "收起全文" : "全文";
			},
			_switchPostComments() {
				uni.navigateTo({
					url: "/pages/index/postComments"
				})
			},
			confirmPop() {

			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		background-color: #FFFFFF;

		.comment-section {
			padding: 0 40rpx;

			.title {
				font-size: 36rpx;
				color: #282828;
				font-weight: 500;
				line-height: 96rpx;
			}

			.comment-list {
				padding-top: 10rpx;

				.comment-cont {
					@include flexY;
					padding-bottom: 50rpx;
					border-bottom: 2rpx solid #EFEFEF;

					&:last-child {
						border-bottom: none;
					}

					.info-wrap {
						display: flex;
						justify-content: flex-start;
						padding-top: 27rpx;

						.info-inner-l {
							image {
								width: 90rpx;
								height: 90rpx;
								border-radius: 50%;
							}
						}

						.info-inner-r {
							margin-left: 22rpx;
							@include flexY;
							justify-content: space-around;

							.user {
								font-size: 32rpx;
								color: #222222;
								font-weight: 500;
							}

							.date {
								font-size: 24rpx;
								color: #B1B1B1;
								font-weight: 400;
							}
						}
					}

					// 评论
					.comment-inner {
						padding-left: 114rpx;

						.rate-wrap {
							@include flexSB;
							margin: 45rpx 0 40rpx;

							.rate-inner-l {
								@include flexX;
								align-items: baseline;

								.text {
									color: #282828;
									font-size: 24rpx;
									font-weight: 500;
									margin-right: 16rpx;
								}

							}

							.rate-inner-r {
								@include flexX;

								.like-icon {
									width: 34rpx;
									height: 34rpx;
								}

								.text {
									font-size: 30rpx;
									color: #B1B1B1;
									font-weight: 400;
								}
							}
						}

						.art {
							font-size: 30rpx;
							font-weight: 500;
							color: #333333;

							&.cut {
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 3;
								-webkit-box-orient: vertical;
								word-break: break-all;
								overflow: hidden;
								white-space: normal;
							}
						}

						.fullText {
							font-size: 30rpx;
							color: #FF903A;
							margin: 26rpx 0 14rpx;
						}

						.img-list {
							padding: 30rpx 0;
							@include flexX;
							flex-wrap: wrap;

							.img-cont {
								margin-right: 18rpx;
								margin-bottom: 18rpx;

								&:nth-child(3n) {
									margin-right: 0;
								}

								image {
									width: 174rpx;
									height: 174rpx;
									border-radius: 14rpx;
								}
							}
						}

						.reply-warp {
							min-height: 70rpx;
							padding: 20rpx;
							font-size: 24rpx;
							color: #989897;
							background-color: #F3F3F4;
							border-radius: 6rpx;

							.reply {
								color: #333333;
								font-weight: 500;
								word-break: keep-all;
								display: inline;
							}
						}

					}

				}

				.nthing-section {
					@include flexY;
					@include flexA;
					padding-top: 230rpx;
					padding-bottom: 130rpx;

					.nthing-img {
						width: 220rpx;
						height: 220rpx;
					}

					.nthing-text {
						margin: 40rpx 0 56rpx;
						font-size: 30rpx;
						color: #AFB0B5;
					}

					.nthing-btn {
						width: 480rpx;
						height: 100rpx;
						background-color: #FF544C;
						border-radius: 50rpx;
						color: #FFFFFF;
						font-size: 32rpx;
						text-align: center;
						font-weight: 400;
					}
				}
			}


		}

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


	}
</style>
