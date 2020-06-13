<template>
	<!-- 底部 -->
	<view class="bottom-section" :class="[{position}, {lately}]">
		<view class="tip-title" :class="[{white: color}, {'msg-section': msg}]" v-if="btm && (!show || !tip)">
			<text class="text" v-if="!msg">
				啊欧，快到底了哦
			</text>
			<view class="msg-inner" v-else>
				<text class="msg-type">系统消息</text>
				<text class="msg-date">{{ msgDate.createtime }}</text>
			</view>
		</view>
		<view class="comTop" v-if="(!btm || color) && !show"></view>
		<view class="code-wrap" v-if="!show">
			<view class="code-inner text-center" v-for="(item, index) in codeList" :key="index">
				<text class="text">{{ item.titles }}</text>
				<image class="code-img" :src="item.image_ewm" mode=""></image>
				<view class="code-tip">
					<text>请长按识别二维码</text>
					<text>{{ item.title_tip }}</text>
				</view>
			</view>
		</view>
		<view class="supervise-wrap" v-if="!show">
			<image class="icon-phone" src="https://wxhyx-cdn.aisspc.cn/static/icon-phone.png" mode=""></image>
			<text>市民监督电话：{{ footInfo.tel }}</text>
		</view>
		<!-- 版权 -->
		<view class="copyright text-center" v-if="false">
			<!-- {{ footInfo.copyright }} -->
			通江好印象-经营评价平台主办单位
		</view>
		<!-- 备案 -->
		<view class="recordNo text-center" v-if="false">
			<!-- {{ footInfo.beian }} 公安备案号：{{ footInfo.record }} 网站标识码：{{ footInfo.identification }} -->
			无锡市梁溪区通江街道 无锡市梁溪区市场监督管理局通江分局
		</view>

		<view class="com_btm text-center" v-if="!hide">
			<text>{{ footInfo.copyright }}</text>
			<text>
				{{ footInfo.address }}
			</text>
		</view>
		<view class="government">
			<!-- <image :src="footInfo.gover" mode=""></image> -->
		</view>
	</view>

</template>

<script>
	export default {
		name: "foot",
		props: {
			// 是否展示tip提示(啊欧，快到底了哦)
			"btm": {
				type: Boolean,
				default: true
			},
			// 顶部tip提示（啊欧，快到底了哦）背景是否展示white 
			"color": {
				type: Boolean,
				default: false
			},
			// 是否使用定位布局
			"position": {
				type: Boolean,
				default: false
			},
			// 页面
			"show": {
				type: Boolean,
				default: false,
			},
			// 隐藏
			"hide": {
				type: Boolean,
				default: false,
			},
			// 隐藏二维码等等
			"tip": {
				type: Boolean,
				default: false
			},
			// lately
			"lately": {
				type: Boolean,
				default: false
			},
			// msgDetail
			"msg": {
				type: Boolean,
				default: false
			},
			// msg
			"msgDate": {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				codeList: [],
				footInfo: {}
			}
		},
		created() {
			this.getFootInfo();
			this.getFootConfig();
		},
		methods: {
			getFootInfo() {
				this.$http.getFootInfo({}, res => {
					if (res.code == 1) {
						this.codeList = res.data.reverse();
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
			}
		}
	}
</script>

<style lang="scss">
	@import '@/style/mixin.scss';

	.bottom-section {
		background-color: #F3F5F7;
		width: 100%;

		&.position {
			position: absolute;
			left: 0;
			bottom: 0;
		}

		&.lately {
			// position: fixed;
			// left: 0;
			// bottom: 0;
		}

		.tip-title {
			font-size: 28rpx;
			color: #BFBFBF;
			font-weight: 400;
			height: 135rpx;
			@include flexX;
			@include flexJ;

			&.msg-section {
				height: 76rpx;
				font-size: 26rpx;

				.msg-inner {
					@include flexSB;
					width: 100%;
					.msg-type{
						margin-left: 49rpx;
					}
					.msg-date{
						margin-right: 49rpx;
					}

				}
			}

			&.white {
				background-color: #FFFFFF;
			}

			.text {
				display: inline-block;
				position: relative;

				&::before {
					content: "";
					width: 150rpx;
					height: 2rpx;
					background-color: #BFBFBF;
					position: absolute;
					left: -200rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				&::after {
					content: "";
					width: 150rpx;
					height: 2rpx;
					background-color: #BFBFBF;
					position: absolute;
					right: -200rpx;
					top: 50%;
					transform: translateY(-50%);
				}
			}

		}

		.comTop {
			height: 48rpx;
			width: 100%;
			background-color: #F3F5F7;
		}

		.code-wrap {
			@include flexX;
			@include flexJ;

			.code-inner {
				@include flexY;
				@include flexA;
				width: 300rpx;

				&:first-child {
					margin-right: 30rpx;
				}

				.text {
					font-size: 24rpx;
					color: #333E49;
					font-weight: 400;
					white-space: nowrap;
				}

				.code-img {
					width: 200rpx;
					height: 200rpx;
					margin: 20rpx 0;
				}

				.code-tip {
					@include flexY;
					font-size: 20rpx;
					color: #8B8B8B;
					line-height: 30rpx;
				}
			}
		}

		.supervise-wrap {
			@include flexX;
			@include flexJ;
			margin: 50rpx 0 60rpx;

			.icon-phone {
				width: 32rpx;
				height: 27rpx;
				margin-right: 11rpx;
			}

			font-size: 24rpx;
			color: #646D77;
			font-weight: 400;
		}

		.copyright {
			font-size: 20rpx;
			color: #8B8B8B;
			font-weight: 400;
			padding: 0 32rpx;
		}

		.recordNo {
			// font-size: 16rpx;
			font-size: 20rpx;
			color: #8B8B8B;
			font-weight: 400;
			margin-top: 15rpx;
			padding: 0 32rpx;
		}

		.com_btm {
			background-image: url("https://wxhyx-cdn.aisspc.cn/static/cm_btm_bg.png");
			background-size: 100% 100%;
			@include flexY;
			padding-top: 40rpx;
			font-size: 20rpx;
			color: #BEBEBE;
			line-height: 30rpx;
			font-weight: 400;
		}

		.government {
			@include flexX;
			@include flexJ;
			margin-top: 24rpx;
			padding-bottom: 36rpx;

			image {
				width: 56rpx;
				height: 68rpx;
			}
		}

	}
</style>
