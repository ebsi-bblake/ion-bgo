import{q as t,v as e,x as n}from"./index-Cg4ZhdfB.js";var o=function(t,e,n,o){return new(n||(n=Promise))((function(r,i){function a(t){try{s(o.next(t))}catch(e){i(e)}}function c(t){try{s(o.throw(t))}catch(e){i(e)}}function s(t){t.done?r(t.value):function(t){return t instanceof n?t:new n((function(e){e(t)}))}(t.value).then(a,c)}s((o=o.apply(t,e||[])).next())}))},r=function(t,e){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(s){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(a=0)),a;)try{if(n=1,o&&(r=2&s[0]?o.return:s[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,s[1])).done)return r;switch(o=0,r&&(s=[2&s[0],r.value]),s[0]){case 0:case 1:r=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,o=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!(r=a.trys,(r=r.length>0&&r[r.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!r||s[1]>r[0]&&s[1]<r[3])){a.label=s[1];break}if(6===s[0]&&a.label<r[1]){a.label=r[1],r=s;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(s);break}r[2]&&a.ops.pop(),a.trys.pop();continue}s=e.call(t,a)}catch(c){s=[6,c],o=0}finally{n=r=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([c,s])}}},i=function(){function i(t){e(this,t),this.onPhoto=n(this,"onPhoto",7),this.noDeviceError=n(this,"noDeviceError",7),this.facingMode="user",this.hidePicker=!1}return i.prototype.present=function(){return o(this,void 0,void 0,(function(){var t,e=this;return r(this,(function(n){return(t=document.createElement("pwa-camera-modal-instance")).facingMode=this.facingMode,t.hidePicker=this.hidePicker,t.addEventListener("onPhoto",(function(t){return o(e,void 0,void 0,(function(){var e;return r(this,(function(n){return this._modal?(e=t.detail,this.onPhoto.emit(e),[2]):[2]}))}))})),t.addEventListener("noDeviceError",(function(t){return o(e,void 0,void 0,(function(){return r(this,(function(e){return this.noDeviceError.emit(t),[2]}))}))})),document.body.append(t),this._modal=t,[2]}))}))},i.prototype.dismiss=function(){return o(this,void 0,void 0,(function(){return r(this,(function(t){return this._modal?(this._modal&&this._modal.parentNode.removeChild(this._modal),this._modal=null,[2]):[2]}))}))},i.prototype.render=function(){return t("div",null)},i}();i.style=":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:600px;height:600px}";export{i as pwa_camera_modal};
