const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-BkS4Dt6i.js","assets/index-B1U94dYq.js","assets/index-ChHOEf7x.css"])))=>i.map(i=>d[i]);
import{m as e,_ as t,C as n,r as o,o as a,c as r,w as i,u as s,a as l,b as c,n as d,p as u,q as v,I as h,e as m,t as g,f,g as p}from"./index-B1U94dYq.js";
/*! Capacitor: https://capacitorjs.com/ - MIT License */const w=(e=>e.CapacitorPlatforms=(e=>{const t=new Map;t.set("web",{name:"web"});const n=e.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t};return n.addPlatform=(e,t)=>{n.platforms.set(e,t)},n.setPlatform=e=>{n.platforms.has(e)&&(n.currentPlatform=n.platforms.get(e))},n})(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{});var y,b;w.addPlatform,w.setPlatform,(b=y||(y={})).Unimplemented="UNIMPLEMENTED",b.Unavailable="UNAVAILABLE";class C extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}}const P=e=>{var t,n,o,a,r;const i=e.CapacitorCustomPlatform||null,s=e.Capacitor||{},l=s.Plugins=s.Plugins||{},c=e.CapacitorPlatforms,d=(null===(t=null==c?void 0:c.currentPlatform)||void 0===t?void 0:t.getPlatform)||(()=>null!==i?i.name:(e=>{var t,n;return(null==e?void 0:e.androidBridge)?"android":(null===(n=null===(t=null==e?void 0:e.webkit)||void 0===t?void 0:t.messageHandlers)||void 0===n?void 0:n.bridge)?"ios":"web"})(e)),u=(null===(n=null==c?void 0:c.currentPlatform)||void 0===n?void 0:n.isNativePlatform)||(()=>"web"!==d()),v=(null===(o=null==c?void 0:c.currentPlatform)||void 0===o?void 0:o.isPluginAvailable)||(e=>{const t=m.get(e);return!!(null==t?void 0:t.platforms.has(d()))||!!h(e)}),h=(null===(a=null==c?void 0:c.currentPlatform)||void 0===a?void 0:a.getPluginHeader)||(e=>{var t;return null===(t=s.PluginHeaders)||void 0===t?void 0:t.find((t=>t.name===e))}),m=new Map,g=(null===(r=null==c?void 0:c.currentPlatform)||void 0===r?void 0:r.registerPlugin)||((e,t={})=>{const n=m.get(e);if(n)return console.warn('Capacitor plugin "'.concat(e,'" already registered. Cannot register plugins twice.')),n.proxy;const o=d(),a=h(e);let r;const c=n=>{let l;const c=(...c)=>{const d=(async()=>(!r&&o in t?r=r="function"==typeof t[o]?await t[o]():t[o]:null!==i&&!r&&"web"in t&&(r=r="function"==typeof t.web?await t.web():t.web),r))().then((t=>{const r=((t,n)=>{var r,i;if(!a){if(t)return null===(i=t[n])||void 0===i?void 0:i.bind(t);throw new C('"'.concat(e,'" plugin is not implemented on ').concat(o),y.Unimplemented)}{const o=null==a?void 0:a.methods.find((e=>n===e.name));if(o)return"promise"===o.rtype?t=>s.nativePromise(e,n.toString(),t):(t,o)=>s.nativeCallback(e,n.toString(),t,o);if(t)return null===(r=t[n])||void 0===r?void 0:r.bind(t)}})(t,n);if(r){const e=r(...c);return l=null==e?void 0:e.remove,e}throw new C('"'.concat(e,".").concat(n,'()" is not implemented on ').concat(o),y.Unimplemented)}));return"addListener"===n&&(d.remove=async()=>l()),d};return c.toString=()=>"".concat(n.toString(),"() { [capacitor code] }"),Object.defineProperty(c,"name",{value:n,writable:!1,configurable:!1}),c},u=c("addListener"),v=c("removeListener"),g=(e,t)=>{const n=u({eventName:e},t),o=async()=>{const o=await n;v({eventName:e,callbackId:o},t)},a=new Promise((e=>n.then((()=>e({remove:o})))));return a.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await o()},a},f=new Proxy({},{get(e,t){switch(t){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return a?g:u;case"removeListener":return v;default:return c(t)}}});return l[e]=f,m.set(e,{name:e,proxy:f,platforms:new Set([...Object.keys(t),...a?[o]:[]])}),f});return s.convertFileSrc||(s.convertFileSrc=e=>e),s.getPlatform=d,s.handleError=t=>e.console.error(t),s.isNativePlatform=u,s.isPluginAvailable=v,s.pluginMethodNoop=(e,t,n)=>Promise.reject("".concat(n,' does not have an implementation of "').concat(t,'".')),s.registerPlugin=g,s.Exception=C,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},L=(e=>e.Capacitor=P(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),E=L.registerPlugin;L.Plugins;class x{constructor(e){this.listeners={},this.retainedEventArguments={},this.windowListeners={},e&&(console.warn('Capacitor WebPlugin "'.concat(e.name,'" config object was deprecated in v3 and will be removed in v4.')),this.config=e)}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o),n&&this.sendRetainedArgumentsForEvent(e);return Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){const o=this.listeners[e];if(o)o.forEach((e=>e(t)));else if(n){let n=this.retainedEventArguments[e];n||(n=[]),n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e="not implemented"){return new L.Exception(e,y.Unimplemented)}unavailable(e="not available"){return new L.Exception(e,y.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const o=n.indexOf(t);this.listeners[e].splice(o,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach((t=>{this.notifyListeners(e,t)})))}}const k=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),R=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class S extends x{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach((e=>{if(e.length<=0)return;let[n,o]=e.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=R(n).trim(),o=R(o).trim(),t[n]=o})),t}async setCookie(e){try{const t=k(e.key),n=k(e.value),o="; expires=".concat((e.expires||"").replace("expires=","")),a=(e.path||"/").replace("path=",""),r=null!=e.url&&e.url.length>0?"domain=".concat(e.url):"";document.cookie="".concat(t,"=").concat(n||"").concat(o,"; path=").concat(a,"; ").concat(r,";")}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie="".concat(e.key,"=; Max-Age=0")}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,"=;expires=".concat((new Date).toUTCString(),";path=/"))}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}E("CapacitorCookies",{web:()=>new S});const j=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),o=((e={})=>{const t=Object.keys(e);return Object.keys(e).map((e=>e.toLocaleLowerCase())).reduce(((n,o,a)=>(n[o]=e[t[a]],n)),{})})(e.headers)["content-type"]||"";if("string"==typeof e.data)n.body=e.data;else if(o.includes("application/x-www-form-urlencoded")){const t=new URLSearchParams;for(const[n,o]of Object.entries(e.data||{}))t.set(n,o);n.body=t.toString()}else if(o.includes("multipart/form-data")||e.data instanceof FormData){const t=new FormData;if(e.data instanceof FormData)e.data.forEach(((e,n)=>{t.append(n,e)}));else for(const n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;const o=new Headers(n.headers);o.delete("content-type"),n.headers=o}else(o.includes("application/json")||"object"==typeof e.data)&&(n.body=JSON.stringify(e.data));return n};class O extends x{async request(e){const t=j(e,e.webFetchExtra),n=((e,t=!0)=>e?Object.entries(e).reduce(((e,n)=>{const[o,a]=n;let r,i;return Array.isArray(a)?(i="",a.forEach((e=>{r=t?encodeURIComponent(e):e,i+="".concat(o,"=").concat(r,"&")})),i.slice(0,-1)):(r=t?encodeURIComponent(a):a,i="".concat(o,"=").concat(r)),"".concat(e,"&").concat(i)}),"").substr(1):null)(e.params,e.shouldEncodeUrlParams),o=n?"".concat(e.url,"?").concat(n):e.url,a=await fetch(o,t),r=a.headers.get("content-type")||"";let i,s,{responseType:l="text"}=a.ok?e:{};switch(r.includes("application/json")&&(l="json"),l){case"arraybuffer":case"blob":s=await a.blob(),i=await(async e=>new Promise(((t,n)=>{const o=new FileReader;o.onload=()=>{const e=o.result;t(e.indexOf(",")>=0?e.split(",")[1]:e)},o.onerror=e=>n(e),o.readAsDataURL(e)})))(s);break;case"json":i=await a.json();break;default:i=await a.text()}const c={};return a.headers.forEach(((e,t)=>{c[t]=e})),{data:i,headers:c,status:a.status,url:a.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}var T,I,A,_;E("CapacitorHttp",{web:()=>new O}),(I=T||(T={})).Base64="base64",I.ImageFilePath="imageFilePath",(_=A||(A={})).Success="success",_.Cancel="cancel";const F=E("DocumentScanner",{web:()=>e((()=>import("./web-BkS4Dt6i.js")),__vite__mapDeps([0,1,2])).then((e=>new e.DocumentScannerWeb))}),U={topLeftCorner:{x:0,y:0},topRightCorner:{x:0,y:0},bottomLeftCorner:{x:0,y:0},bottomRightCorner:{x:0,y:0}};var M=(e=>(e.Pre="Pre",e.Streaming="Streaming",e.Interaction="Interaction",e.Save="Save",e))(M||{});let D=null;const N=(e,t,n,o)=>{const a={video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}}};if(!e.value||!t.value)return void console.error("Video or canvas references are not available");t.value.getContext("2d",{willReadFrequently:!0}).clearRect(0,0,t.value.width,t.value.height),(e=>{if(document.getElementById("open-cv"))e();else{const t=document.createElement("script");t.id="open-cv",t.src="https://docs.opencv.org/5.x/opencv.js",t.onload=()=>setTimeout(e,1e3),document.body.appendChild(t)}})((()=>{console.log("OpenCV loaded and ready."),((e,t,n,o,a,r,i)=>{navigator.mediaDevices.getUserMedia(a).then((a=>{r.srcObject=a,r.addEventListener("loadeddata",(()=>{let a=10;const s=()=>{a>0?r.videoWidth>0&&r.videoHeight>0?(r.play(),((e,t,n)=>{const o=e.value,a=t.value,r=n.value,i=o.videoWidth,s=o.videoHeight;a.width=i,a.height=s,r.width=i,r.height=s})(t,n,o),e.value="Streaming",i()):setTimeout(s,100):i("Unable to play video stream."),a--};s()}))})).catch((e=>{console.error("Error accessing camera:",e)}))})(n,e,t,o,a,e.value,(()=>{console.log("init?");const o=t.value.getContext("2d",{willReadFrequently:!0}),a=new jscanify;((e,t,n,o,a)=>{const r=()=>{if(t&&(n.drawImage(t,0,0),console.log(e.value),e.value)){const t=o.highlightPaper(e.value,{thickness:5,color:"blue"});t&&n.drawImage(t,0,0)}"Streaming"==a.value&&requestAnimationFrame(r)};r()})(t,e.value,o,a,n)}))}))},q=(e,t)=>{if(null==e||null==t)return;const n=null==e?void 0:e.getContext("2d",{willReadFrequently:!0}).getImageData(0,0,e.width,e.height),o=cv.matFromImageData(n),a=new jscanify;console.log("Before findPaperContour: ",o);const r=a.findPaperContour(o);if(console.log("After findPaperContour: ",r),!r)return void console.error("No document found!");const i=a.getCornerPoints(r),{topLeftCorner:s,topRightCorner:l,bottomLeftCorner:c,bottomRightCorner:d}=i;U.topLeftCorner=s,U.topRightCorner=l,U.bottomLeftCorner=c,U.bottomRightCorner=d,t.save(),((e,t,n)=>{const{topLeftCorner:o,topRightCorner:a,bottomLeftCorner:r,bottomRightCorner:i}=n;e.beginPath(),e.moveTo(0,0),e.lineTo(t.width,0),e.lineTo(t.width,t.height),e.lineTo(0,t.height),e.closePath(),e.moveTo(o.x,o.y),e.lineTo(a.x,a.y),e.lineTo(i.x,i.y),e.lineTo(r.x,r.y),e.closePath(),e.fillStyle="rgba(0, 0, 0, 0.5)",e.fill("evenodd")})(t,e,i),t.lineWidth=3,t.strokeStyle="white",t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(l.x,l.y),t.lineTo(d.x,d.y),t.lineTo(c.x,c.y),t.closePath(),t.stroke(),((e,t)=>{const{topLeftCorner:n,topRightCorner:o,bottomLeftCorner:a,bottomRightCorner:r}=e;[n,o,a,r].forEach((e=>{t.beginPath(),t.arc(e.x,e.y,15,0,2*Math.PI),t.fillStyle="rgba(255, 255, 255, 0)",t.fill(),t.strokeStyle="white",t.lineWidth=2,t.stroke()}))})(i,t),t.restore()},W=(e,t,n)=>{const o=e-n.x,a=t-n.y;return o*o+a*a<=225},B=(e,t)=>{const n=t.getBoundingClientRect(),o=(e=>e.width/e.clientWidth)(t),a=(e=>e.height/e.clientHeight)(t),r=(e.clientX-n.left)*o,i=(e.clientY-n.top)*a;D=((e,t)=>{const{topLeftCorner:n,topRightCorner:o,bottomLeftCorner:a,bottomRightCorner:r}=U;return W(e,t,n)?n:W(e,t,o)?o:W(e,t,a)?a:W(e,t,r)?r:null})(r,i)},H=e=>{const t=null==e?void 0:e.getContext("2d",{willReadFrequently:!0});null==t||t.clearRect(0,0,e.width,e.height),e&&t&&q(e,t)},G={class:"action-buttons"},V=t({__name:"DocumentViewerPage",setup(e){const t="web"!==n.getPlatform(),w=o(M.Pre),y=o(""),b=o(null),C=o(null),P=o(null),L=async()=>{if(t)try{const{scannedImages:e}=await F.scanDocument({responseType:"base64"});e&&(y.value=CavideoRef,canvasRefpacitor.convertFileSrc(e[0]))}catch(e){console.error("Scan failed:",e)}else((e,t,n,o,a)=>{e.value="",o.value.style.display="none",t.value.style.display="block",n.value.style.display="block";const r=n.value.getContext("2d",{willReadFrequently:!0}),i=o.value.getContext("2d",{willReadFrequently:!0});null==r||r.clearRect(0,0,n.value.width,n.value.height),null==i||i.clearRect(0,0,o.value.width,o.value.height),N(t,n,a,o)})(y,b,C,P,w)},E=()=>{const e=C.value,t=P.value,n=t.getContext("2d");n.drawImage(b.value,0,0,e.width,e.height),t.style.display="block",S(),((e,t="blue")=>{const n=e.value,o=null==n?void 0:n.getContext("2d",{willReadFrequently:!0});if(!o)return;const a=o.getImageData(0,0,n.width,n.height),r=cv.matFromImageData(a),i=new cv.Mat;cv.cvtColor(r,i,cv.COLOR_RGBA2GRAY,0);const s=new cv.Mat;cv.GaussianBlur(i,s,new cv.Size(5,5),0);const l=new cv.Mat;cv.Canny(s,l,50,150);const c=new cv.MatVector,d=new cv.Mat;cv.findContours(l,c,d,cv.RETR_EXTERNAL,cv.CHAIN_APPROX_SIMPLE);let u=null,v=0;for(let m=0;m<c.size();m++){const e=c.get(m),t=cv.contourArea(e,!1);t>v&&(v=t,u=e)}const h=new cv.Mat;if(u){const e=cv.arcLength(u,!0);cv.approxPolyDP(u,h,.02*e,!0),o.lineWidth=3,o.strokeStyle=t,o.beginPath();for(let t=0;t<h.data32S.length/2;t++){const e=h.data32S[2*t],n=h.data32S[2*t+1];0===t?o.moveTo(e,n):o.lineTo(e,n)}o.closePath(),o.stroke()}r.delete(),i.delete(),s.delete(),l.delete(),c.delete(),d.delete(),h.delete()})(C,"white"),e.style.display="none",b.value.style.display="none",q(e,n),w.value=M.Interaction,x()},x=()=>{const e=P.value;e.addEventListener("mousedown",(e=>t=>{B(t,e),H(e)})(e)),e.addEventListener("mousemove",(e=>t=>{D&&(B(t,e),H(e))})(e)),e.addEventListener("mouseup",void(D=null)),e.addEventListener("touchstart",(e=>t=>{D&&B(t,e)})(e)),e.addEventListener("touchmove",(e=>t=>{D&&(B(t,e),H(e))})(e)),e.addEventListener("touchend",void(D=null))},k=()=>{const e=P.value,t=e.getContext("2d"),n=new jscanify,{topLeftCorner:o,topRightCorner:a,bottomLeftCorner:r,bottomRightCorner:i}=U,s=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),l=(e,t,n,o)=>Math.floor(Math.max(s(e,t),s(n,o))),c=l(o,a,r,i),d=l(o,r,a,i),u=n.extractPaper("outputCanvas",c,d);console.log(u),e.width=c,e.height=d,t.drawImage(u,0,0)},R=()=>{w.value=M.Pre},S=()=>{if(b.value&&b.value.srcObject){b.value.srcObject.getTracks().forEach((e=>e.stop())),b.value.srcObject=null}w.value=M.Pre},j=()=>{isFlashOn.value=!isFlashOn.value};return(e,t)=>(a(),r(s(p),null,{default:i((()=>[l(s(f),null,{default:i((()=>[c("video",{ref_key:"videoRef",ref:b,id:"videoSource",playsinline:"",autoplay:"",muted:"",style:{opacity:"0",width:"0",height:"0"}},null,512),w.value===s(M).Streaming?(a(),r(s(d),{key:0,id:"close-camera",name:s(u),onClick:S},null,8,["name"])):v("",!0),c("canvas",{ref_key:"canvasRef",ref:C,id:"outputCanvas"},null,512),c("canvas",{ref_key:"resultCanvasRef",ref:P,id:"resultCanvas",style:{display:"none"}},null,512),c("div",G,[l(s(h),{onClick:L},{default:i((()=>t[0]||(t[0]=[m(g("Start"))]))),_:1}),w.value===s(M).Streaming?(a(),r(s(h),{key:0,onClick:E},{default:i((()=>t[1]||(t[1]=[m(" Capture Image ")]))),_:1})):v("",!0),w.value===s(M).Streaming?(a(),r(s(h),{key:1,onClick:j},{default:i((()=>t[2]||(t[2]=[m(" Turn On Flash ")]))),_:1})):v("",!0),w.value===s(M).Interaction?(a(),r(s(h),{key:2,onClick:k},{default:i((()=>t[3]||(t[3]=[m(" Extract ")]))),_:1})):v("",!0),[s(M).Interaction].includes(w.value)?(a(),r(s(h),{key:3,onClick:R},{default:i((()=>t[4]||(t[4]=[m(" Save ")]))),_:1})):v("",!0)])])),_:1})])),_:1}))}},[["__scopeId","data-v-b3632cd3"]]),z=Object.freeze(Object.defineProperty({__proto__:null,default:V},Symbol.toStringTag,{value:"Module"}));export{C,z as D,A as S,x as W,E as r};
