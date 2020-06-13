<script>
	export default {

		onLaunch: function() {
			// #ifdef MP-WEIXIN
			uni.getProvider({
				service: 'oauth',
				success: (res) => {
					if (~res.provider.indexOf('weixin')) {
						uni.login({
							provider: 'weixin',
							success: res => {
								if (res.errMsg == "login:ok") {
									uni.setStorageSync('code', res.code);
									this.$http.wxLogin({
										code: res.code
									}, msg => {
										this.$db.set("userinfo", msg.data.userinfo)
										this.$db.set("confirm_unionid", msg.data.confirm_unionid)
									})
			
								} else {
									// reject(res);
								}
							},
							fail: function(err) {
								uni.showToast({
									icon: none,
									title: "授权失败！"
								})
								uni.hideLoading()
							}
						});
					} else {
						uni.showToast({
							title: '请先安装微信或升级版本',
							icon: "none"
						});
					}
				},
			
			})
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import 'colorui/main.css';
	@import 'colorui/icon.css';
	@import 'style/icon.css';

	/* @import 'style/app.scss'; */
	page {
		background-color: #fff;
	}
</style>
