<template>
	<view class="container">
		<view class="comment-list">
			<view v-if="list.length>0" class="comment-cont" v-for="(item, index) in list" :key="index">
				<view class="info-wrap">
					<view class="info-inner-l">
						<image :src="item.uname.avatar" mode=""></image>
					</view>
					<view class="info-inner-r">
						<view class="user">
							{{ item.uname.nickname }}
						</view>
						<view class="date">
							{{ item.add_date }}
						</view>
					</view>
				</view>
				<view class="comment-inner">
					<!-- 满意度打分 -->
					<view class="rate-wrap">
						<view class="rate-inner-l">
							<text class="text">满意度打分</text>
							<uni-rate disabled="true" :size="14" :max="5" :value="item.score_show" />
						</view>
						<view class="rate-inner-r">
							<image class="like-icon" src="https://wxhyx-cdn.aisspc.cn/static/like.png" mode=""></image>
							<!-- <image @click="_changeLike(item, false, index)" v-if="item.myZan" class="like-icon" src="https://wxhyx-cdn.aisspc.cn/static/liked.png"
							 mode=""></image>
							<image @click="_changeLike(item, true, index)" v-else class="like-icon" src="https://wxhyx-cdn.aisspc.cn/static/like.png"
							 mode=""></image> -->
							<text class="text">{{ item.zan }}</text>
						</view>
					</view>
					<!-- 评论内容 -->
					<view class="art" :class="{cut: item.full_text=='全文'}">
						{{ item.content }}
					</view>
					<!-- 全文 -->
					<view class="fullText" v-if="isShowFullText(item.content)" :data-text="item.full_text" :data-index='index'
					 @click.stop="_changeFullText">
						{{ item.full_text }}
					</view>
					<!-- 图片列表 -->
					<view class="img-list">
						<view class="img-cont" v-for="(img, ind) in item.image" :key="ind" :data-src="item.image[ind].image_url"
						 @click.stop="previewImage(item.image, $event)">
							<image :src="img.image_url" mode=""></image>
						</view>
					</view>
					<!--  回复-->
					<view class="reply-warp reply-top" v-if="item.keeper_content">
						<text class="reply">店家回复: </text>
						{{ item.keeper_content }}
					</view>

					<view class="reply-warp" v-else>
						<text class="reply">店家回复: </text>
						<view class="wrap bg-white radius" @click="replyModal(item, $event, index)">
							请输入50字以内回复~
							<!-- <textarea auto-height type="text" v-model="item.Comment_cont" class="replyIpt" maxlength="50" placeholder="请输入50字以内回复~"
							 placeholder-class="holder" /> -->
						</view>
						<!-- <button type="default" class="cu-btn round bg-white reply-btn" :data-cont="item.Comment_cont" @click="_confirmSend(item, $event, index)">发送</button> -->
					</view>
				</view>
			</view>
			<view v-if="list.length==0" class="nthing-section">
				<image class="nthing-img" src="https://wxhyx-cdn.aisspc.cn/static/nthing.png" mode=""></image>
				<text class="nthing-text">还没有顾客评论哦～</text>
			</view>
		</view>

		<!-- 输入框 -->
		<view class="overlay" v-if="isShowModal" @click="isHideModal"></view>
		<view class="reply-input-modal" v-if="isShowModal">
			<view class="input-inner">
				<textarea class="input uni-input" v-model="replyInput" maxlength="50" cursor-spacing="40" focus auto-height
				 placeholder="请输入回复内容..." placeholder-class="holder" @focus="iptFocus" />
				<view class="num_wrap">
					<text :class="{num: replyInput.length>50}">{{ replyInput.length }}</text>
					<text>/50</text>
				</view>
			</view>
			<button type="default" class="cu-btn sendBtn" @click="sendReply">发送</button>
		</view>

	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate';
	export default {
		components: {
			uniRate,
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				textarea: "",
				isShowModal: false,
				replyInput: "", // 回复框内容
				replyTarget: {},
			}
		},
		methods: {
			iptFocus(e) {
				console.log("textarea获焦了", e)
			},
			sendReply() {
				let cont = this.replyInput;
				if(cont == "") {
					uni.showToast({
						title: "回复内容不能为空~"
					})
					return
				} 
				let {v, e, i} = this.replyTarget;
				
				this.$emit("confirmSend",{v,e, i, cont})
				
				this.isShowModal = false
			},
			replyModal(v, e, i) {
				this.replyInput = "";
				this.replyTarget = { v, e, i }
				
				this.isShowModal = true
			},
			isHideModal() {
				this.isShowModal = false
				this.replyInput = "";
				this.replyTarget = {}
			},
			// _confirmSend(v, e, i) {
			// 	this.$emit("confirmSend",{v,e, i})
			// },
			isShowFullText(v) {
				return v.split("").length >= 64
			},
			_changeLike(item, bl, index) {
				// this.$emit("changeLike", {
				// 	item,
				// 	bl,
				// 	index
				// })
			},
			_changeFullText(e) {
				this.$emit("changeFullText", {
					e
				})
			},
			previewImage(v, e) {
				let list = [];
				const current = e.currentTarget.dataset.src;
				v.map(el => {
					list.push(el.image_url)
				})
				uni.previewImage({
					urls: list,
					current: current,
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';
	.overlay{
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0,0,0,.6);
		z-index: 5;
	}
	.reply-input-modal{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		// height: 100rpx;
		padding: 10rpx 0;
		z-index: 6;
		background-color: #FFFFFF;
		display: flex;
		align-items: flex-end;
		.input-inner{
			@include flexY;
			background-color: #F3F3F3;
			border-radius: 20rpx;
			padding: 15rpx;
			margin-left: 15rpx;
			.input{
				
			}
			.num_wrap{
				text-align: right;
				font-size: 20rpx;
				.num{
					color: #ff0000;
				}
			}
		}
		.sendBtn{
			border: none;
			background-color: #FFFFFF;
		}
		
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
							width: 40rpx;
							height: 40rpx;
							margin-right: 5rpx;
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
					padding: 10rpx;
					font-size: 24rpx;
					color: #989897;
					border-radius: 6rpx;
					@include flexX;
					&.reply-top{
						align-items: flex-start;
						background-color: #F3F3F3;
						border-radius:6rpx;
					}

					.reply {
						color: #333333;
						font-weight: 500;
						word-break: keep-all;
						display: inline;
						margin-right: 10rpx;
					}
					
					.wrap{
						padding: 12rpx;
						margin: 0 10rpx;
						width: 60%;
						background-color: #F3F3F4;
						.replyIpt{
							line-height: 1.2;
							color: #333333;
							width: 100%;
						}
					}
					.holder{
						color: #CACBD3;
					}
					
					.reply-btn{
						border: 1rpx solid #DFDFDF;
						white-space: nowrap;
						height: 50rpx;
						font-size: 25rpx;
						background-color: #F3F3F4;
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
</style>
