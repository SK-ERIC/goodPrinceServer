(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"02cf":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){var t=this;e.getProvider({service:"oauth",success:function(n){~n.provider.indexOf("weixin")?e.login({provider:"weixin",success:function(n){"login:ok"==n.errMsg&&(e.setStorageSync("code",n.code),t.$http.wxLogin({code:n.code},(function(e){t.$db.set("userinfo",e.data.userinfo),t.$db.set("confirm_unionid",e.data.confirm_unionid)})))},fail:function(t){e.showToast({icon:none,title:"授权失败！"}),e.hideLoading()}}):e.showToast({title:"请先安装微信或升级版本",icon:"none"})}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=n}).call(this,n("543d")["default"])},"1e5a":function(e,t,n){"use strict";n.r(t);var o=n("4b96");for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n("3fdb");var c,i,u,a,f=n("f0c5"),l=Object(f["a"])(o["default"],c,i,!1,null,null,null,!1,u,a);t["default"]=l.exports},"3fdb":function(e,t,n){"use strict";var o=n("61ed"),r=n.n(o);r.a},"4b96":function(e,t,n){"use strict";n.r(t);var o=n("02cf"),r=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,(function(){return o[e]}))}(c);t["default"]=r.a},"61ed":function(e,t,n){},d13f:function(e,t,n){"use strict";(function(e,t){n("a1fc");var o=s(n("66fd")),r=s(n("6106")),c=s(n("1e5a")),i=s(n("299d")),u=p(n("5ade")),a=p(n("a6e8")),f=p(n("00f9")),l=n("c248");function d(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return d=function(){return e},e}function p(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=d();if(t&&t.has(e))return t.get(e);var n={},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var c=o?Object.getOwnPropertyDescriptor(e,r):null;c&&(c.get||c.set)?Object.defineProperty(n,r,c):n[r]=e[r]}return n.default=e,t&&t.set(e,n),n}function s(e){return e&&e.__esModule?e:{default:e}}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){y(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m="https://wxhyx.aisspc.cn";o.default.prototype.$http=u,o.default.prototype.$common=a,o.default.prototype.$db=f,o.default.prototype.$ph=l.PH,o.default.prototype.$store=r.default,o.default.prototype.$service=i.default;var g=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1500,o=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"none";!1!==Boolean(t)&&e.showToast({title:t,duration:n,mask:o,icon:r})},h=function(){var e=getCurrentPages(),t=e[e.length-2];return t.$vm},O=function(){Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-body")]).then(function(){return resolve(n("1cd9"))}.bind(null,n)).catch(n.oe)},w=function(){Promise.all([n.e("common/vendor"),n.e("components/mescroll-uni/mescroll-uni")]).then(function(){return resolve(n("d24e"))}.bind(null,n)).catch(n.oe)};o.default.component("mescroll-body",O),o.default.component("mescroll-uni",w);var P=e.getUpdateManager();P.onCheckForUpdate((function(e){})),P.onUpdateReady((function(t){e.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&P.applyUpdate()}})})),P.onUpdateFailed((function(t){e.showToast({title:"更新失败"})})),o.default.config.productionTip=!1,o.default.prototype.$fire=new o.default,o.default.prototype.$store=r.default,o.default.prototype.$baseURL=m,o.default.prototype.$api={msg:g,prePage:h},c.default.mpType="app";var j=new o.default(v({},c.default));t(j).$mount()}).call(this,n("543d")["default"],n("543d")["createApp"])}},[["d13f","common/runtime","common/vendor"]]]);