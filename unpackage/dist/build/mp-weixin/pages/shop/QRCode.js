(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/QRCode"],{"2b24":function(t,e,n){"use strict";n.r(e);var i=n("940f"),o=n("3824");for(var c in o)"default"!==c&&function(t){n.d(e,t,(function(){return o[t]}))}(c);n("a77a");var a,s=n("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"3d1c5784",null,!1,i["a"],a);e["default"]=r.exports},3824:function(t,e,n){"use strict";n.r(e);var i=n("94d8"),o=n.n(i);for(var c in i)"default"!==c&&function(t){n.d(e,t,(function(){return i[t]}))}(c);e["default"]=o.a},"6a0c":function(t,e,n){},"940f":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return i}))},"94d8":function(t,e,n){"use strict";(function(t,i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("4795")),c=n("fcf2");function a(t){return t&&t.__esModule?t:{default:t}}function s(t,e,n,i,o,c,a){try{var s=t[c](a),r=s.value}catch(u){return void n(u)}s.done?e(r):Promise.resolve(r).then(i,o)}function r(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var c=t.apply(e,n);function a(t){s(c,i,o,a,r,"next",t)}function r(t){s(c,i,o,a,r,"throw",t)}a(void 0)}))}}var u,f=function(){Promise.all([n.e("common/vendor"),n.e("components/tki-qrcode/tki-qrcode")]).then(function(){return resolve(n("bd49"))}.bind(null,n)).catch(n.oe)},l={components:{tkiQrcode:f},data:function(){return{ifShow:!0,val:"",size:200,unit:"upx",pdground:"#F96D4E",icon:"",iconsize:40,lv:3,onval:!1,loadMake:!0,src:"",canvasW:0,canvasH:0,imgSrc:"https://wxhyx-cdn.aisspc.cn/static/qr_bg.png",Title:"",QrSrc:"",LineType:!0,tempFilePath:[],finished:!1,openSettingBtnHidden:!0}},onLoad:function(){var t=this.$db.get("shopInfo");this.val="https://wxhyx.aisspc.cn?id=".concat(t.id),this.Title=t.shop_title,this.getErCode()},mounted:function(){u=this},methods:{getErCode:function(){var e=this.$db.get("shopInfo");this.$http.getErCode({scene:e.id},(function(e){t.showLoading({title:"加载中...",mask:!0}),(0,c.base64ToPath)(e).then((function(t){u.QrSrc=t})).catch((function(t){console.warn(t)})),u.OnCanvas()}))},toBuffer:function(t){for(var e=new i(t.byteLength),n=new Uint8Array(t),o=0;o<e.length;++o)e[o]=n[o];return e},qrR:function(t){console.log("res",t)},handleSetting:function(t){t.detail.authSetting["scope.writePhotosAlbum"]?u.openSettingBtnHidden=!0:u.openSettingBtnHidden=!1},saveImage:function(e){t.getSetting({success:function(e){e.authSetting["scope.writePhotosAlbum"]?u.saveImgToLocal():t.authorize({scope:"scope.writePhotosAlbum",success:function(){u.saveImgToLocal(),console.log("相册授权成功")},fail:function(){u.openSettingBtnHidden=!1,console.log("相册授权失败")}})}})},saveImgToLocal:function(e){t.showActionSheet({itemList:["保存图片","取消"],success:function(e){t.saveFile({tempFilePath:u.tempFilePath[0],success:function(e){"saveFile:ok"==e.errMsg&&t.saveImageToPhotosAlbum({filePath:e.savedFilePath,success:function(){t.showToast({title:"保存成功",icon:"success"})},fail:function(){t.showToast({title:"保存失败",icon:"none"})}})},fail:function(t){console.log("save",t)}})},fail:function(t){console.log(t)}})},previewImage:function(){t.previewImage({urls:this.tempFilePath,current:""})},OnCanvas:function(){var e=this;return r(o.default.mark((function n(){var i,c,a,s,r,f,l,d,h,p,g,v,m;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return u.ctx=t.createCanvasContext("myCanvas",e),i=t.upx2px(662),c=t.upx2px(0),a=t.upx2px(150),s=0,n.next=5,u.getImageInfo({imgSrc:u.imgSrc});case 5:return r=n.sent,n.next=8,u.getImageInfo({imgSrc:u.QrSrc});case 8:f=n.sent,l=[r.width,r.height],d=[f.width,f.height],h=i-2*c,l[0]!=h&&(l[1]=Math.floor(h/l[0]*l[1]),l[0]=h),d[0]!=a&&(d[1]=Math.floor(a/d[0]*d[1]),d[0]=a),u.canvasW=i,u.canvasH=l[1],u.ctx.setFillStyle("#fff"),u.ctx.fillRect(0,0,i,u.canvasH),u.ctx.drawImage(r.path,c,c,l[0],l[1]),u.ctx.setFontSize(t.upx2px(40)),u.ctx.setFillStyle("#F4E0AD"),u.ctx.setTextAlign("center"),p=0,g=t.upx2px(90),v=1,m=0;case 26:if(!(m<u.Title.length)){n.next=48;break}if(s+=u.ctx.measureText(u.Title[m]).width,!(s>l[0])){n.next=44;break}if(2!=v||!u.LineType){n.next=37;break}return u.ctx.fillText(u.Title.substring(p,m-8)+"...",i/2,g),s=0,p=m,v++,n.abrupt("break",48);case 37:u.ctx.fillText(u.Title.substring(p,m),i/2,g),s=0,g+=30,p=m,v++;case 42:n.next=45;break;case 44:m==u.Title.length-1&&(u.ctx.fillText(u.Title.substring(p,m+1),i/2,g),s=0);case 45:m++,n.next=26;break;case 48:u.ctx.drawImage(f.path,i/2-2.2*d[0]/2,t.upx2px(184),2.2*d[0],2.2*d[1]),setTimeout((function(){u.ctx.draw(!0,(function(e){u.getNewImage(),t.hideLoading(),u.finished=!0}))}),10);case 50:case"end":return n.stop()}}),n)})))()},getImageInfo:function(e){return r(o.default.mark((function n(){var i;return o.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return i=e.imgSrc,n.abrupt("return",new Promise((function(e,n){t.getImageInfo({src:i,success:function(t){e(t)},fail:function(t){n(t)}})})));case 2:case"end":return n.stop()}}),n)})))()},getNewImage:function(){var e=this;t.canvasToTempFilePath({canvasId:"myCanvas",quality:1,complete:function(t){e.tempFilePath.push(t.tempFilePath)}},this)}}};e.default=l}).call(this,n("543d")["default"],n("b639").Buffer)},a77a:function(t,e,n){"use strict";var i=n("6a0c"),o=n.n(i);o.a},f498:function(t,e,n){"use strict";(function(t){n("a1fc");i(n("66fd"));var e=i(n("2b24"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f498","common/runtime","common/vendor"]]]);