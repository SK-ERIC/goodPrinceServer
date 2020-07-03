<template>
	<view class="container">
		<view class="canvas-section">
			<canvas canvas-id="myCanvas" :style="{ width: canvasW + 'px', height: canvasH + 'px' }" @click.stop="previewImage"></canvas>
		</view>

		<view class="btn-section" v-if="finished">
			<button v-if="openSettingBtnHidden" type="default" class="cu-btn download-btn" @click="saveImage">下载到本地</button>
			<button v-else type="default" class="cu-btn download-btn" open-type="openSetting" @opensetting="handleSetting">下载到本地</button>
		</view>

		<!-- 生成普通二维码 -->
		<!-- <view v-show="!finished" class="code_wrap">
			<tki-qrcode v-if="ifShow" cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize"
			 :pdground="pdground" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
		</view> -->

	</view>
</template>

<script>
	import {
		base64ToPath
	} from '@/components/image-tools/index.js'
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	var _this;
	export default {
		components: {
			tkiQrcode
		},
		data() {
			return {
				/* qr */
				ifShow: true,
				val: '', // 要生成的二维码值
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				pdground: '#F96D4E', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64

				/* canvas */
				canvasW: 0,
				canvasH: 0,
				imgSrc: "https://wxhyx-cdn.aisspc.cn/static/qr_bg.png", // 背景图
				Title: "", // 店铺名
				QrSrc: "", //太阳码
				LineType: true, //标题显示行数		（注超出2行显示会导致画布布局絮乱）
				tempFilePath: [], // 海报
				finished: false,
				openSettingBtnHidden: true, //是否授权
			}
		},
		onLoad() {
			const shopInfo = this.$db.get("shopInfo");
			this.val = `https://wxhyx.aisspc.cn?id=${shopInfo.id}`
			// console.log("二维码链接:", this.val)
			this.Title = shopInfo.shop_title;

			this.getErCode();
		},
		mounted() {
			_this = this;

		},
		methods: {
			getErCode() {
				const shopInfo = this.$db.get("shopInfo");
				this.$http.getErCode({
					scene: shopInfo.id
				}, res => {
					uni.showLoading({
						title: "加载中...",
						mask: true
					})
					base64ToPath(res)
						.then(path => {
							_this.QrSrc = path
						}).catch(error => {
							console.warn(error)
						})

					_this.OnCanvas();
				})
			},
			toBuffer(ab) {
				var buf = new Buffer(ab.byteLength);
				var view = new Uint8Array(ab);
				for (var i = 0; i < buf.length; ++i) {
					buf[i] = view[i];
				}
				return buf;
			},
			qrR(res) {
				// this.src = res
				// _this.QrSrc = res
				console.log("res", res)
				// base64ToPath(res)
				//   .then(path => {
				//     console.log("path",path)
				// 	 _this.QrSrc = path
				//   }).catch(error => {
				//     console.warn(error)
				//   })
				// _this.OnCanvas();
			},
			//微信小程序保存到相册
			handleSetting(e) {
				if (!e.detail.authSetting['scope.writePhotosAlbum']) {
					_this.openSettingBtnHidden = false;
				} else {
					_this.openSettingBtnHidden = true;
				}
			},
			saveImage(e) {
				//获取相册授权
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									//这里是用户同意授权后的回调
									_this.saveImgToLocal();
									console.log("相册授权成功")
								},
								fail() { //这里是用户拒绝授权后的回调
									_this.openSettingBtnHidden = false;
									console.log("相册授权失败")
								}
							})
						} else { //用户已经授权过了
							_this.saveImgToLocal();
						}
					}
				})
			},
			saveImgToLocal: function(e) {
				var tempFilePaths = _this.tempFilePath[0] 
				if (!tempFilePaths) {
					uni.showToast({
						icon: "none",
						title: "请重试!",
						mask: true
					})
					return
				}
				uni.showActionSheet({
					itemList: ['保存图片'],
					success: sheetRes => {
						uni.showLoading({
							title: "保存中...",
							mask: true
						})
						uni.downloadFile({
							url: tempFilePaths,
							success: (res) => {
								if (res.errMsg == "downloadFile:ok") {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: function() {
											uni.showToast({
												title: "保存成功",
												icon: "success"
											});
										},
										fail: function() {
											uni.showToast({
												title: "保存失败",
												icon: "none"
											});
										}
									});
								}
							},
							fail: (err) => {
								uni.showToast({
									icon: "none",
									title: "请重试!",
									mask: true
								})
							},
							complete: () => {
								// uni.hideLoading()
							}
						})

						// uni.saveFile({
						// 	tempFilePath: tempFilePaths,
						// 	success: function(saveRes) {
						// 		if (saveRes.errMsg == "saveFile:ok") {
						// 			uni.saveImageToPhotosAlbum({
						// 				filePath: saveRes.savedFilePath,
						// 				success: function() {
						// 					uni.showToast({
						// 						title: "保存成功",
						// 						icon: "success"
						// 					});
						// 				},
						// 				fail: function() {
						// 					uni.showToast({
						// 						title: "保存失败",
						// 						icon: "none"
						// 					});
						// 				}
						// 			});
						// 		}
						// 	},
						// 	fail: function(saveErr) {
						// 		console.log("save", saveErr)
						// 	}
						// })


					},
					fail: sheetErr => {
						console.log(sheetErr);
					}
				})
			},
			previewImage() {
				uni.previewImage({
					urls: this.tempFilePath,
					current: "",
				})
			},
			async OnCanvas() {
				_this.ctx = uni.createCanvasContext("myCanvas", this);
				const C_W = uni.upx2px(662), //canvas宽度
					C_P = uni.upx2px(0), //canvas Padding 间距
					C_Q = uni.upx2px(150); //二维码或太阳码宽高
				let _strlineW = 0; //文本宽度
				let _imgInfo = await _this.getImageInfo({
					imgSrc: _this.imgSrc
				}); //背景图
				let _QrCode = await _this.getImageInfo({
					imgSrc: _this.QrSrc
				}); //二维码或太阳码
				let r = [_imgInfo.width, _imgInfo.height];
				let q = [_QrCode.width, _QrCode.height];
				let imgW = C_W - C_P * 2;
				if (r[0] != imgW) {
					r[1] = Math.floor((imgW / r[0]) * r[1]);
					r[0] = imgW;
				}
				if (q[0] != C_Q) {
					q[1] = Math.floor((C_Q / q[0]) * q[1]);
					q[0] = C_Q;
				}
				_this.canvasW = C_W;
				_this.canvasH = r[1];
				_this.ctx.setFillStyle("#fff"); //canvas背景颜色
				_this.ctx.fillRect(0, 0, C_W, _this.canvasH); //canvas画布大小
				//添加图片展示
				_this.ctx.drawImage(_imgInfo.path, C_P, C_P, r[0], r[1]);
				//设置文本
				_this.ctx.setFontSize(uni.upx2px(40)); //设置标题字体大小
				_this.ctx.setFillStyle("#F4E0AD"); //设置标题文本颜色
				_this.ctx.setTextAlign("center")
				let _strLastIndex = 0; //每次开始截取的字符串的索引
				let _strHeight = uni.upx2px(90); //绘制字体距离canvas顶部的初始高度
				let _num = 1;
				for (let i = 0; i < _this.Title.length; i++) {
					_strlineW += _this.ctx.measureText(_this.Title[i]).width;
					if (_strlineW > r[0]) {
						if (_num == 2 && _this.LineType) {
							//文字换行数量大于二进行省略号处理
							_this.ctx.fillText(_this.Title.substring(_strLastIndex, i - 8) + '...', C_W / 2, _strHeight);
							_strlineW = 0;
							_strLastIndex = i;
							_num++;
							break;
						} else {
							_this.ctx.fillText(_this.Title.substring(_strLastIndex, i), C_W / 2, _strHeight);
							_strlineW = 0;
							_strHeight += 30;
							_strLastIndex = i;
							_num++;
						}
					} else if (i == _this.Title.length - 1) {
						_this.ctx.fillText(_this.Title.substring(_strLastIndex, i + 1), C_W / 2, _strHeight);
						_strlineW = 0;
					}
				}
				//设置文本 end

				//添加二维码
				// _strHeight += uni.upx2px(20);
				_this.ctx.drawImage(_QrCode.path, C_W / 2 - q[0] * 2.2 / 2, uni.upx2px(184), q[0] * 2.2, q[1] * 2.2);
				//添加二维码 end

				//延迟后渲染至canvas上
				setTimeout(function() {
					_this.ctx.draw(true, (ret) => {
						_this.getNewImage();
						uni.hideLoading()
						_this.finished = true;
					});
				}, 10);

			},
			async getImageInfo({
				imgSrc
			}) {
				return new Promise((resolve, errs) => {
					uni.getImageInfo({
						src: imgSrc,
						success: function(image) {
							resolve(image);
						},
						fail(err) {
							errs(err);
						}
					});
				});
			},
			getNewImage() {
				uni.canvasToTempFilePath({
					canvasId: "myCanvas",
					quality: 1,
					complete: (res) => {
						// console.log(res.tempFilePath);
						// this.tempFilePath.push(res.tempFilePath);

						let userinfo = this.$db.get("userinfo") || "";
						uni.uploadFile({
							url: 'https://wxhyx.aisspc.cn/addons/qiniu/index/upload',
							filePath: res.tempFilePath,
							name: 'file',
							fileType: 'image',
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'multipart/form-data',
							},
							formData: {
								'method': 'images.upload',
								'upfile': res.tempFilePath,
								'token': userinfo.token
							},
							//formData:{},传递参数
							success: (uploadFileRes) => {
								// src="https://wxhyx-cdn.aisspc.cn/static/shopCenter_icon_b.png"
								const backUpload = JSON.parse(uploadFileRes.data);
								const url = `https://wxhyx-cdn.aisspc.cn${backUpload.data.url}`
								this.tempFilePath.push(url);
								console.log("上传图片", this.tempFilePath)
								//自定义操作
							},
							complete() {
								//console.log("this is headimg"+this.headimg)   
							},
							fail(e) {
								console.log("this is errormes ")
							}

						});


					}
				}, this);
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/style/mixin.scss';

	.container {
		min-height: 100vh;
		background-image: url("https://wxhyx-cdn.aisspc.cn/static/cavas_bg.png");
		background-size: 100% 100%;
		padding-bottom: 80rpx;
	}

	.code_wrap {
		opacity: 0;
	}

	.canvas-section {
		padding: 80rpx 44rpx 0;
	}

	.btn-section {
		@include flexX;
		@include flexJ;
		margin-top: 50rpx;

		.download-btn {
			width: 480rpx;
			height: 100rpx;
			background-color: #FF544C;
			color: #fff;
			font-size: 32rpx;
			font-weight: 500;
			border-radius: 50rpx;
		}
	}
</style>
