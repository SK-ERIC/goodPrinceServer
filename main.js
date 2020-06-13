import Vue from 'vue'
import store from './store'
import App from './App'
const baseURL = 'https://wxhyx.aisspc.cn'
import service from './service'
import * as Api from './config/api.js'
import * as Common from './config/common.js'
import * as Db from './config/db.js'
import {PH} from './config/path.js'
Vue.prototype.$http = Api
Vue.prototype.$common = Common;
Vue.prototype.$db = Db;
Vue.prototype.$ph = PH;
Vue.prototype.$store = store
Vue.prototype.$service = service
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

/*           注册全局自定义组件            */

import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)



// #ifdef MP-WEIXIN
const updateManager = uni.getUpdateManager()
updateManager.onCheckForUpdate(function (res) {
  // console.log(res.hasUpdate)
})
updateManager.onUpdateReady(function (res) {
  uni.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})
updateManager.onUpdateFailed(function (res) {
  uni.showToast({
    title:"更新失败"
  })
})
// #endif
Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$baseURL = baseURL;
Vue.prototype.$api = {msg,  prePage};

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()