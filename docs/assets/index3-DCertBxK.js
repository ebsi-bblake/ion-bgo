import{G as e}from"./index-C3n1svbR.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const t=(e,t,n,o)=>{const s=r(e)?{capture:!!o.capture,passive:!!o.passive}:!!o.capture;let a,c;return e.__zone_symbol__addEventListener?(a="__zone_symbol__addEventListener",c="__zone_symbol__removeEventListener"):(a="addEventListener",c="removeEventListener"),e[a](t,n,s),()=>{e[c](t,n,s)}},r=e=>{if(void 0===n)try{const t=Object.defineProperty({},"passive",{get:()=>{n=!0}});e.addEventListener("optsTest",(()=>{}),t)}catch(t){n=!1}return!!n};let n;const o=e=>e instanceof Document?e:e.ownerDocument,s=r=>{let n=!1,s=!1,u=!0,l=!1;const d=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},r),v=d.canStart,m=d.onWillStart,p=d.onStart,y=d.onEnd,X=d.notCaptured,Y=d.onMove,h=d.threshold,g=d.passive,_=d.blurOnStart,b={type:"pan",startX:0,startY:0,startTime:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,currentTime:0,event:void 0,data:void 0},f=((e,t,r)=>{const n=r*(Math.PI/180),o="x"===e,s=Math.cos(n),a=t*t;let c=0,i=0,u=!1,l=0;return{start(e,t){c=e,i=t,l=0,u=!0},detect(e,t){if(!u)return!1;const r=e-c,n=t-i,d=r*r+n*n;if(d<a)return!1;const v=Math.sqrt(d),m=(o?r:n)/v;return l=m>s?1:m<-s?-1:0,u=!1,!0},isGesture:()=>0!==l,getDirection:()=>l}})(d.direction,d.threshold,d.maxAngle),T=e.createGesture({name:r.gestureName,priority:r.gesturePriority,disableScroll:r.disableScroll}),E=()=>{n&&(l=!1,Y&&Y(b))},S=()=>!!T.capture()&&(n=!0,u=!1,b.startX=b.currentX,b.startY=b.currentY,b.startTime=b.currentTime,m?m(b).then(x):x(),!0),x=()=>{_&&(()=>{if("undefined"!=typeof document){const e=document.activeElement;(null==e?void 0:e.blur)&&e.blur()}})(),p&&p(b),u=!0},D=()=>{n=!1,s=!1,l=!1,u=!0,T.release()},L=e=>{const t=n,r=u;D(),r&&(a(b,e),t?y&&y(b):X&&X(b))},w=((e,r,n,s,a)=>{let c,i,u,l,d,v,m,p=0;const y=o=>{p=Date.now()+2e3,r(o)&&(!i&&n&&(i=t(e,"touchmove",n,a)),u||(u=t(o.target,"touchend",Y,a)),l||(l=t(o.target,"touchcancel",Y,a)))},X=s=>{p>Date.now()||r(s)&&(!v&&n&&(v=t(o(e),"mousemove",n,a)),m||(m=t(o(e),"mouseup",h,a)))},Y=e=>{g(),s&&s(e)},h=e=>{_(),s&&s(e)},g=()=>{i&&i(),u&&u(),l&&l(),i=u=l=void 0},_=()=>{v&&v(),m&&m(),v=m=void 0},b=()=>{g(),_()},f=(r=!0)=>{r?(c||(c=t(e,"touchstart",y,a)),d||(d=t(e,"mousedown",X,a))):(c&&c(),d&&d(),c=d=void 0,b())};return{enable:f,stop:b,destroy:()=>{f(!1),s=n=r=void 0}}})(d.el,(e=>{const t=i(e);return!(s||!u)&&(c(e,b),b.startX=b.currentX,b.startY=b.currentY,b.startTime=b.currentTime=t,b.velocityX=b.velocityY=b.deltaX=b.deltaY=0,b.event=e,(!v||!1!==v(b))&&(T.release(),!!T.start()&&(s=!0,0===h?S():(f.start(b.startX,b.startY),!0))))}),(e=>{n?!l&&u&&(l=!0,a(b,e),requestAnimationFrame(E)):(a(b,e),f.detect(b.currentX,b.currentY)&&(f.isGesture()&&S()||G()))}),L,{capture:!1,passive:g}),G=()=>{D(),w.stop(),X&&X(b)};return{enable(e=!0){e||(n&&L(void 0),D()),w.enable(e)},destroy(){T.destroy(),w.destroy()}}},a=(e,t)=>{if(!t)return;const r=e.currentX,n=e.currentY,o=e.currentTime;c(t,e);const s=e.currentX,a=e.currentY,u=(e.currentTime=i(t))-o;if(u>0&&u<100){const t=(s-r)/u,o=(a-n)/u;e.velocityX=.7*t+.3*e.velocityX,e.velocityY=.7*o+.3*e.velocityY}e.deltaX=s-e.startX,e.deltaY=a-e.startY,e.event=t},c=(e,t)=>{let r=0,n=0;if(e){const t=e.changedTouches;if(t&&t.length>0){const e=t[0];r=e.clientX,n=e.clientY}else void 0!==e.pageX&&(r=e.pageX,n=e.pageY)}t.currentX=r,t.currentY=n},i=e=>e.timeStamp||Date.now();export{e as GESTURE_CONTROLLER,s as createGesture};
