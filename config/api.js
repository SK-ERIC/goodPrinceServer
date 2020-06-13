import * as common from './common.js' //引入common
import * as db from './db.js' //引入db

export const domain = 'https://wxhyx.aisspc.cn'
const http = domain + '/api/';
//POST方法
const post = (method, data, callback) => {
	uni.showLoading({
		title: '加载中'
	});
	
	let userinfo = db.get("userinfo");
	
	if (userinfo) {
		data.token = userinfo.token;
	}
	
	uni.request({
		url: http + method,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
		},
		data: data,
		method: 'POST',
		success: (response) => {
			uni.hideLoading();
			const result = response.data			
			// 登录信息过期或者未登录
			if (result.code === 401) {
				//db.del("userinfo");
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1000,
					complete: function() {
						setTimeout(function() {
							uni.hideToast();
							// #ifdef H5 || APP-PLUS
							uni.navigateTo({
								url: '/pages/login/base'
							})
							// #endif
							// #ifdef MP-WEIXIN || MP-ALIPAY	
							uni.navigateTo({
								url: '/pages/login/base',
								animationType: 'pop-in',
								animationDuration: 200
							});
							// #endif
						}, 1000)
					}
				});
			}
			callback(result);
			
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		},
	});

}
//GET方法
const get = (url, data, callback) => {
	
	uni.showLoading({
		title: '加载中'
	});	
	let header = {
		'Content-Type': 'application/x-www-form-urlencoded', //自定义请求头信息
	}
	// 判断token是否存在
	let userinfo = db.get("userinfo");
	
	if (userinfo) {
		header.token = userinfo.token;
	}
	

	
	let param = common.builderUrlParams(http + url, data)
	
	// console.log(url, data, param, header);
	
	uni.request({
		url: param,
		header: header,
		method: 'GET',
		success: (response) => {
			uni.hideLoading();
			const result = response.data
			if (result.code === 401) {
				//db.del("userinfo");
				uni.showToast({
					title: result.msg,
					icon: 'none',
					duration: 1000,
					complete: function() {
						setTimeout(function() {
							uni.hideToast();
							// #ifdef H5 || APP-PLUS
							uni.navigateTo({
								url: '/pages/login/base'
							})
							// #endif
							// #ifdef MP-WEIXIN || MP-ALIPAY	
							uni.navigateTo({
								url: '/pages/login/base',
								animationType: 'pop-in',
								animationDuration: 200
							});
							// #endif
						}, 1000)
					}
				});
			}
			callback(result);
		},
		fail: (error) => {
			uni.hideLoading();
			if (error && error.response) {
				showError(error.response);
			}
		}
	});
}
//统一处理请求错误
const showError = error => {
	let errorMsg = ''
	switch (error.status) {
		case 400:
			errorMsg = '请求参数错误'
			break
		case 401:
			errorMsg = '未授权，请登录'
			break
		case 403:
			errorMsg = '跨域拒绝访问'
			break
		case 404:
			errorMsg = `请求地址出错: ${error.config.url}`
			break
		case 408:
			errorMsg = '请求超时'
			break
		case 500:
			errorMsg = '服务器内部错误'
			break
		case 501:
			errorMsg = '服务未实现'
			break
		case 502:
			errorMsg = '网关错误'
			break
		case 503:
			errorMsg = '服务不可用'
			break
		case 504:
			errorMsg = '网关超时'
			break
		case 505:
			errorMsg = 'HTTP版本不受支持'
			break
		default:
			errorMsg = error.msg
			break
	}

	uni.showToast({
		title: errorMsg,
		icon: 'none',
		duration: 1000,
		complete: function() {
			setTimeout(function() {
				uni.hideToast();
			}, 1000);
		}
	});
}
// 
// 上传图片
export const uploadImage = (num, callback) => {
	let userinfo = db.get("userinfo");

	if (!userinfo) {
		common.jumpToLogin();
		return false;
	}
	uni.chooseImage({
		count: num,
		success: (res) => {
			uni.showLoading({
				title: '上传中...'
			});
			let tempFilePaths = res.tempFilePaths
			for (var i = 0; i < tempFilePaths.length; i++) {
				uni.uploadFile({
					url: domain + '/addons/qiniu/index/upload',
					filePath: tempFilePaths[i],
					fileType: 'image',
					name: 'file',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'multipart/form-data',
					},
					formData: {
						'method': 'images.upload',
						'upfile': tempFilePaths[i],
						'token': userinfo.token
					},
					success: (uploadFileRes) => {
						callback(JSON.parse(uploadFileRes.data),tempFilePaths)
					},
					fail: (error) => {
						if (error && error.response) {
							showError(error.response);
						}
					},
					complete: () => {
						setTimeout(function() {
							uni.hideLoading();
						}, 250);
					},
				});
			}
		}
	});
}

// code
export const wxLogin = (data, callback) => post('wechat_shop/login', data, callback)
// 发送验证码
export const postSendCode = (data, callback) => post("sms/send", data, callback)
// export const postSendCode = (data, callback) => post("user/sendCode", data, callback)
// 手机验证码登录
export const postMobilelogin = (data, callback) => post("user/mobilelogin", data, callback)
// 商家实名认证
export const postSaveShopUser = (data, callback) => post("Shop_Authentication/saveShopUser", data, callback)
// 商家是否为首次登陆
export const postShopFirst = (data, callback) => post("Shop_authentication/shopFirst", data, callback)
// 商家中心首页
export const postShopCore = (data, callback) => post("Shop_authentication/shopCore", data, callback)
// 首页评论List
export const postShopCommentsList = (data, callback) => post('Shop_authentication/shopCommentsList', data, callback)
// 个人中心消息
export const ShopReply = (data, callback) => post('shops/ShopReply', data, callback)
// 商家资料提交
export const updateShopInfo = (data, callback) => post("Shop_authentication/updateShopInfo", data, callback)
// shop图片删除
export const delimages = (data, callback) => post("Shop_authentication/delimages", data, callback)
// 商家系统消息详情
export const getShopReplyContent = (data, callback) => post("shops/getShopReplyContent", data, callback)
// 页面底部信息1
export const getFootInfo = (data, callback) => get('foot_Info/index', data, callback)
// 底部网站信息
export const getFootConfig = (data, callback) => get('Config/index', data, callback)
// 商家回复评论
export const setShopReply = (data, callback) => post("Shop_authentication/setShopReply", data, callback)
// 小程序码
export const getErCode = (data, callback) => post("wechat_mp/getErCode", data, callback)
// 设置\实名认证
export const getShopAuthentication = (data, callback) => post("Shop_Authentication/getShopAuthentication", data, callback)
// 变更手机号
export const changemobile = (data, callback) => post("Shop_Authentication/changemobile", data, callback)
// 用户中心那个new
export const postIsRead = (data, callback) => post("Shop_authentication/isRead", data, callback)











