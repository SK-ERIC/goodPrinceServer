<template>
	<view class="container">

		<view class="msg-section">
			<text>{{ msg.contents }}</text>
		</view>

		<!-- foot -->
		<foot :msgDate="msg" msg color hide position></foot>
	</view>
</template>

<script>
	import foot from '../component/foot';
	export default {
		components: {
			foot
		},
		data() {
			return {
				msg: {},
			}
		},
		onLoad(options) {
			this.getReplyContent(options.id);
		},
		methods: {
			getReplyContent(id) {
				this.$http.getShopReplyContent({
					id
				}, res => {
					if (res.code == 1) {
						this.msg = res.data

					} else {
						this.$common.errorToShow(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		position: relative;
		min-height: 100vh;
		padding-bottom: 470rpx;

		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}

		.navBack {
			display: inline-flex;
			justify-content: flex-start;
			align-items: center;
			font-size: 36rpx;
			color: #282828;
			margin-left: 27rpx;

			.cuIcon-back {
				margin-right: 30rpx;
			}
		}

		.msg-section {
			padding: 50rpx;

			text {
				font-size: 28rpx;
				color: #9295A1;
				font-weight: 500;
			}
		}
	}
</style>
