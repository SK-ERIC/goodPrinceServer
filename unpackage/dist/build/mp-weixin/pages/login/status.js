(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/status"],{"39f9":function(t,n,s){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var s={data:function(){return{status:null,info:null,infoA:{status:0,src:"https://wxhyx-cdn.aisspc.cn/static/status_checking.png",tip:"您的实名认证 正在审核中...",text:["请关注手机短信，实名认证审核成功之后，您会收到认证成功的短信。"],btn:"我知道了"},infoB:{status:1,src:"https://wxhyx-cdn.aisspc.cn/static/status_success.png",tip:"您的实名认证已通过",text:["您提交的实名认证资料已通过审核，请尽快登录商家中心后台，完善您的店铺资料。"],btn:"登录商家中心"},infoC:{status:2,src:"https://wxhyx-cdn.aisspc.cn/static/status_faild.png",tip:"您的实名认证未通过",text:["请您重新修改资料之后再提交"],btn:"变更实名认证"},change:"",succ_chang:!1}},onLoad:function(t){var n=t.status;this.info=0==n?this.infoA:1==n?this.infoB:this.infoC,t.change&&(this.change=t.change),console.log("options.change",t.change),t.succ&&(this.succ_chang=!0)},methods:{switchBtn:function(n){var s=this,c=this.$db.get("shopId");switch(n){case 1:this.$http.postShopFirst({shop_authentication_id:c},(function(n){1==n.code?t.reLaunch({url:"/pages/shop/shopCenter"}):s.$common.errorToShow(n.msg)}));break;case 2:this.$db.set("check",!1),t.navigateTo({url:"/pages/login/authentication"});break}}}};n.default=s}).call(this,s("543d")["default"])},4412:function(t,n,s){"use strict";var c=s("94e1"),e=s.n(c);e.a},"5ef9":function(t,n,s){"use strict";(function(t){s("a1fc");c(s("66fd"));var n=c(s("6390"));function c(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,s("543d")["createPage"])},6390:function(t,n,s){"use strict";s.r(n);var c=s("7791"),e=s("9d52");for(var a in e)"default"!==a&&function(t){s.d(n,t,(function(){return e[t]}))}(a);s("4412");var i,u=s("f0c5"),o=Object(u["a"])(e["default"],c["b"],c["c"],!1,null,"567a735d",null,!1,c["a"],i);n["default"]=o.exports},7791:function(t,n,s){"use strict";var c,e=function(){var t=this,n=t.$createElement;t._self._c},a=[];s.d(n,"b",(function(){return e})),s.d(n,"c",(function(){return a})),s.d(n,"a",(function(){return c}))},"94e1":function(t,n,s){},"9d52":function(t,n,s){"use strict";s.r(n);var c=s("39f9"),e=s.n(c);for(var a in c)"default"!==a&&function(t){s.d(n,t,(function(){return c[t]}))}(a);n["default"]=e.a}},[["5ef9","common/runtime","common/vendor"]]]);