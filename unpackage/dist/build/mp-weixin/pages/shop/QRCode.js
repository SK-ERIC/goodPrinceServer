(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/QRCode"],{"17ed":function(t,e,n){},"2b24":function(t,e,n){"use strict";n.r(e);var i=n("d53d"),o=n("3824");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("d124");var c,s=n("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"e538accc",null,!1,i["a"],c);e["default"]=r.exports},3824:function(t,e,n){"use strict";n.r(e);var i=n("94d8"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"94d8":function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=c(n("4795")),a=n("fcf2");function c(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,i,o,a,c){try{var s=t[a](c),r=s.value}catch(u){return void n(u)}s.done?e(r):Promise.resolve(r).then(i,o)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function c(t){s(a,i,o,c,r,"next",t)}function r(t){s(a,i,o,c,r,"throw",t)}c(void 0)}))}}var u,l=function(){Promise.all([n.e("common/vendor"),n.e("components/tki-qrcode/tki-qrcode")]).then(function(){return resolve(n("bd49"))}.bind(null,n)).catch(n.oe)},f={components:{tkiQrcode:l},data:function(){return{ifShow:!0,val:"",size:200,unit:"upx",pdground:"#F96D4E",icon:"",iconsize:40,lv:3,onval:!1,loadMake:!0,src:"",canvasW:0,canvasH:0,imgSrc:"https://wxhyx-cdn.aisspc.cn/static/qr_bg.png",Title:"",QrSrc:"",LineType:!0,tempFilePath:[],finished:!1,openSettingBtnHidden:!0}},onLoad:function(){var t=this.$db.get("shopInfo");this.val="https://wxhyx.aisspc.cn?id=".concat(t.id),this.Title=t.shop_title,this.getErCode()},mounted:function(){u=this},methods:{getErCode:function(){var e=this.$db.get("shopInfo");this.$http.getErCode({scene:e.id},(function(e){t.showLoading({title:"加载中...",mask:!0}),(0,a.base64ToPath)(e).then((function(t){u.QrSrc=t})).catch((function(t){console.warn(t)})),u.OnCanvas()}))},toBuffer:function(t){for(var e=new i(t.byteLength),n=new Uint8Array(t),o=0;o<e.length;++o)e[o]=n[o];return e},qrR:function(t){console.log("res",t)},handleSetting:function(t){t.detail.authSetting["scope.writePhotosAlbum"]?u.openSettingBtnHidden=!0:u.openSettingBtnHidden=!1},saveImage:function(e){t.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?u.saveImgToLocal():t.authorize({scope:"scope.writePhotosAlbum",success:function(){u.saveImgToLocal(),console.log("相册授权成功")},fail:function(){u.openSettingBtnHidden=!1,console.log("相册授权失败")}})}})},saveImgToLocal:function(e){var n=u.tempFilePath[0];n?t.showActionSheet({itemList:["保存图片"],success:function(e){t.showLoading({title:"保存中...",mask:!0}),t.downloadFile({url:n,success:function(e){"downloadFile:ok"==e.errMsg&&t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){t.showToast({title:"保存成功",icon:"success"})},fail:function(){t.showToast({title:"保存失败",icon:"none"})}})},fail:function(e){t.showToast({icon:"none",title:"请重试!",mask:!0})},complete:function(){}})},fail:function(t){console.log(t)}}):t.showToast({icon:"none",title:"请重试!",mask:!0})},previewImage:function(){t.previewImage({urls:this.tempFilePath,current:""})},OnCanvas:function(){var e=this;return r(o.default.mark((function n(){var i,a,c,s,r,l,f,d,h,p,m,g,v;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return u.ctx=t.createCanvasContext("myCanvas",e),i=t.upx2px(662),a=t.upx2px(0),c=t.upx2px(150),s=0,n.next=5,u.getImageInfo({imgSrc:u.imgSrc});case 5:return r=n.sent,n.next=8,u.getImageInfo({imgSrc:u.QrSrc});case 8:l=n.sent,f=[r.width,r.height],d=[l.width,l.height],h=i-2*a,f[0]!=h&&(f[1]=Math.floor(h/f[0]*f[1]),f[0]=h),d[0]!=c&&(d[1]=Math.floor(c/d[0]*d[1]),d[0]=c),u.canvasW=i,u.canvasH=f[1],u.ctx.setFillStyle("#fff"),u.ctx.fillRect(0,0,i,u.canvasH),u.ctx.drawImage(r.path,a,a,f[0],f[1]),u.ctx.setFontSize(t.upx2px(40)),u.ctx.setFillStyle("#F4E0AD"),u.ctx.setTextAlign("center"),p=0,m=t.upx2px(90),g=1,v=0;case 26:if(!(v<u.Title.length)){n.next=48;break}if(s+=u.ctx.measureText(u.Title[v]).width,!(s>f[0])){n.next=44;break}if(2!=g||!u.LineType){n.next=37;break}return u.ctx.fillText(u.Title.substring(p,v-8)+"...",i/2,m),s=0,p=v,g++,n.abrupt("break",48);case 37:u.ctx.fillText(u.Title.substring(p,v),i/2,m),s=0,m+=30,p=v,g++;case 42:n.next=45;break;case 44:v==u.Title.length-1&&(u.ctx.fillText(u.Title.substring(p,v+1),i/2,m),s=0);case 45:v++,n.next=26;break;case 48:u.ctx.drawImage(l.path,i/2-2.2*d[0]/2,t.upx2px(184),2.2*d[0],2.2*d[1]),setTimeout((function(){u.ctx.draw(!0,(function(e){u.getNewImage(),t.hideLoading(),u.finished=!0}))}),10);case 50:case"end":return n.stop()}}),n)})))()},getImageInfo:function(e){return r(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.imgSrc,n.abrupt("return",new Promise((function(e,n){t.getImageInfo({src:i,success:function(t){e(t)},fail:function(t){n(t)}})})));case 2:case"end":return n.stop()}}),n)})))()},getNewImage:function(){var e=this;t.canvasToTempFilePath({canvasId:"myCanvas",quality:1,complete:function(n){var i=e.$db.get("userinfo")||"";t.uploadFile({url:"https://wxhyx.aisspc.cn/addons/qiniu/index/upload",filePath:n.tempFilePath,name:"file",fileType:"image",headers:{Accept:"application/json","Content-Type":"multipart/form-data"},formData:{method:"images.upload",upfile:n.tempFilePath,token:i.token},success:function(t){var n=JSON.parse(t.data),i="https://wxhyx-cdn.aisspc.cn".concat(n.data.url);e.tempFilePath.push(i),console.log("上传图片",e.tempFilePath)},complete:function(){},fail:function(t){console.log("this is errormes ")}})}},this)}}};e.default=f}).call(this,n("543d")["default"],n("b639").Buffer)},d124:function(t,e,n){"use strict";var i=n("17ed"),o=n.n(i);o.a},d53d:function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},f498:function(t,e,n){"use strict";(function(t){n("a1fc");i(n("66fd"));var e=i(n("2b24"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f498","common/runtime","common/vendor"]]]);