System.register(["./index-legacy-G9F6mX_m.js"],(function(t,e){"use strict";var n;return{setters:[function(e){n=e.G,t("GESTURE_CONTROLLER",e.G)}],execute:function(){
/*!
             * (C) Ionic http://ionicframework.com - MIT License
             */
var e,r=function(t,e,n,r){var o,u,c=i(t)?{capture:!!r.capture,passive:!!r.passive}:!!r.capture;return t.__zone_symbol__addEventListener?(o="__zone_symbol__addEventListener",u="__zone_symbol__removeEventListener"):(o="addEventListener",u="removeEventListener"),t[o](e,n,c),function(){t[u](e,n,c)}},i=function(t){if(void 0===e)try{var n=Object.defineProperty({},"passive",{get:function(){e=!0}});t.addEventListener("optsTest",(function(){}),n)}catch(r){e=!1}return!!e},o=function(t){return t instanceof Document?t:t.ownerDocument},u=(t("createGesture",(function(t){var e=!1,i=!1,s=!0,v=!1,l=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},t),d=l.canStart,f=l.onWillStart,m=l.onStart,p=l.onEnd,y=l.notCaptured,X=l.onMove,Y=l.threshold,h=l.passive,g=l.blurOnStart,_={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},b=function(t,e,n){var r=n*(Math.PI/180),i="x"===t,o=Math.cos(r),u=e*e,c=0,a=0,s=!1,v=0;return{start:function(t,e){c=t,a=e,v=0,s=!0},detect:function(t,e){if(!s)return!1;var n=t-c,r=e-a,l=n*n+r*r;if(l<u)return!1;var d=Math.sqrt(l),f=(i?n:r)/d;return v=f>o?1:f<-o?-1:0,s=!1,!0},isGesture:function(){return 0!==v},getDirection:function(){return v}}}(l.direction,l.threshold,l.maxAngle),T=n.createGesture({name:t.gestureName,priority:t.gesturePriority,disableScroll:t.disableScroll}),E=function(){e&&(v=!1,X&&X(_))},S=function(){return!!T.capture()&&(e=!0,s=!1,_.startX=_.currentX,_.startY=_.currentY,_.startTime=_.currentTime,f?f(_).then(L):L(),!0)},L=function(){g&&function(){if("undefined"!=typeof document){var t=document.activeElement;(null==t?void 0:t.blur)&&t.blur()}}(),m&&m(_),s=!0},G=function(){e=!1,i=!1,v=!1,s=!0,T.release()},x=function(t){var n=e,r=s;G(),r&&(u(_,t),n?p&&p(_):y&&y(_))},D=function(t,e,n,i,u){var c,a,s,v,l,d,f,m=0,p=function(i){m=Date.now()+2e3,e(i)&&(!a&&n&&(a=r(t,"touchmove",n,u)),s||(s=r(i.target,"touchend",X,u)),v||(v=r(i.target,"touchcancel",X,u)))},y=function(i){m>Date.now()||e(i)&&(!d&&n&&(d=r(o(t),"mousemove",n,u)),f||(f=r(o(t),"mouseup",Y,u)))},X=function(t){h(),i&&i(t)},Y=function(t){g(),i&&i(t)},h=function(){a&&a(),s&&s(),v&&v(),a=s=v=void 0},g=function(){d&&d(),f&&f(),d=f=void 0},_=function(){h(),g()},b=function(){arguments.length>0&&void 0!==arguments[0]&&!arguments[0]?(c&&c(),l&&l(),c=l=void 0,_()):(c||(c=r(t,"touchstart",p,u)),l||(l=r(t,"mousedown",y,u)))};return{enable:b,stop:_,destroy:function(){b(!1),i=n=e=void 0}}}(l.el,(function(t){var e=a(t);return!(i||!s)&&(c(t,_),_.startX=_.currentX,_.startY=_.currentY,_.startTime=_.currentTime=e,_.velocityX=_.velocityY=_.deltaX=_.deltaY=0,_.event=t,(!d||!1!==d(_))&&(T.release(),!!T.start()&&(i=!0,0===Y?S():(b.start(_.startX,_.startY),!0))))}),(function(t){e?!v&&s&&(v=!0,u(_,t),requestAnimationFrame(E)):(u(_,t),b.detect(_.currentX,_.currentY)&&(b.isGesture()&&S()||w()))}),x,{capture:!1,passive:h}),w=function(){G(),D.stop(),y&&y(_)};return{enable:function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t||(e&&x(void 0),G()),D.enable(t)},destroy:function(){T.destroy(),D.destroy()}}})),function(t,e){if(e){var n=t.currentX,r=t.currentY,i=t.currentTime;c(e,t);var o=t.currentX,u=t.currentY,s=(t.currentTime=a(e))-i;if(s>0&&s<100){var v=(o-n)/s,l=(u-r)/s;t.velocityX=.7*v+.3*t.velocityX,t.velocityY=.7*l+.3*t.velocityY}t.deltaX=o-t.startX,t.deltaY=u-t.startY,t.event=e}}),c=function(t,e){var n=0,r=0;if(t){var i=t.changedTouches;if(i&&i.length>0){var o=i[0];n=o.clientX,r=o.clientY}else void 0!==t.pageX&&(n=t.pageX,r=t.pageY)}e.currentX=n,e.currentY=r},a=function(t){return t.timeStamp||Date.now()}}}}));
