const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/web-BuY35pyw.js","assets/index-C3n1svbR.js","assets/index-ChHOEf7x.css"])))=>i.map(i=>d[i]);
import{m as e,r as t,_ as n,C as o,o as a,c as r,w as i,u as s,a as l,b as c,n as d,p as u,q as h,I as m,e as v,t as g,f,g as p}from"./index-C3n1svbR.js";
/*! Capacitor: https://capacitorjs.com/ - MIT License */const w=(e=>e.CapacitorPlatforms=(e=>{const t=new Map;t.set("web",{name:"web"});const n=e.CapacitorPlatforms||{currentPlatform:{name:"web"},platforms:t};return n.addPlatform=(e,t)=>{n.platforms.set(e,t)},n.setPlatform=e=>{n.platforms.has(e)&&(n.currentPlatform=n.platforms.get(e))},n})(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{});var y,C;w.addPlatform,w.setPlatform,(C=y||(y={})).Unimplemented="UNIMPLEMENTED",C.Unavailable="UNAVAILABLE";class b extends Error{constructor(e,t,n){super(e),this.message=e,this.code=t,this.data=n}}const P=e=>{var t,n,o,a,r;const i=e.CapacitorCustomPlatform||null,s=e.Capacitor||{},l=s.Plugins=s.Plugins||{},c=e.CapacitorPlatforms,d=(null===(t=null==c?void 0:c.currentPlatform)||void 0===t?void 0:t.getPlatform)||(()=>null!==i?i.name:(e=>{var t,n;return(null==e?void 0:e.androidBridge)?"android":(null===(n=null===(t=null==e?void 0:e.webkit)||void 0===t?void 0:t.messageHandlers)||void 0===n?void 0:n.bridge)?"ios":"web"})(e)),u=(null===(n=null==c?void 0:c.currentPlatform)||void 0===n?void 0:n.isNativePlatform)||(()=>"web"!==d()),h=(null===(o=null==c?void 0:c.currentPlatform)||void 0===o?void 0:o.isPluginAvailable)||(e=>{const t=v.get(e);return!!(null==t?void 0:t.platforms.has(d()))||!!m(e)}),m=(null===(a=null==c?void 0:c.currentPlatform)||void 0===a?void 0:a.getPluginHeader)||(e=>{var t;return null===(t=s.PluginHeaders)||void 0===t?void 0:t.find((t=>t.name===e))}),v=new Map,g=(null===(r=null==c?void 0:c.currentPlatform)||void 0===r?void 0:r.registerPlugin)||((e,t={})=>{const n=v.get(e);if(n)return console.warn('Capacitor plugin "'.concat(e,'" already registered. Cannot register plugins twice.')),n.proxy;const o=d(),a=m(e);let r;const c=n=>{let l;const c=(...c)=>{const d=(async()=>(!r&&o in t?r=r="function"==typeof t[o]?await t[o]():t[o]:null!==i&&!r&&"web"in t&&(r=r="function"==typeof t.web?await t.web():t.web),r))().then((t=>{const r=((t,n)=>{var r,i;if(!a){if(t)return null===(i=t[n])||void 0===i?void 0:i.bind(t);throw new b('"'.concat(e,'" plugin is not implemented on ').concat(o),y.Unimplemented)}{const o=null==a?void 0:a.methods.find((e=>n===e.name));if(o)return"promise"===o.rtype?t=>s.nativePromise(e,n.toString(),t):(t,o)=>s.nativeCallback(e,n.toString(),t,o);if(t)return null===(r=t[n])||void 0===r?void 0:r.bind(t)}})(t,n);if(r){const e=r(...c);return l=null==e?void 0:e.remove,e}throw new b('"'.concat(e,".").concat(n,'()" is not implemented on ').concat(o),y.Unimplemented)}));return"addListener"===n&&(d.remove=async()=>l()),d};return c.toString=()=>"".concat(n.toString(),"() { [capacitor code] }"),Object.defineProperty(c,"name",{value:n,writable:!1,configurable:!1}),c},u=c("addListener"),h=c("removeListener"),g=(e,t)=>{const n=u({eventName:e},t),o=async()=>{const o=await n;h({eventName:e,callbackId:o},t)},a=new Promise((e=>n.then((()=>e({remove:o})))));return a.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await o()},a},f=new Proxy({},{get(e,t){switch(t){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return a?g:u;case"removeListener":return h;default:return c(t)}}});return l[e]=f,v.set(e,{name:e,proxy:f,platforms:new Set([...Object.keys(t),...a?[o]:[]])}),f});return s.convertFileSrc||(s.convertFileSrc=e=>e),s.getPlatform=d,s.handleError=t=>e.console.error(t),s.isNativePlatform=u,s.isPluginAvailable=h,s.pluginMethodNoop=(e,t,n)=>Promise.reject("".concat(n,' does not have an implementation of "').concat(t,'".')),s.registerPlugin=g,s.Exception=b,s.DEBUG=!!s.DEBUG,s.isLoggingEnabled=!!s.isLoggingEnabled,s.platform=s.getPlatform(),s.isNative=s.isNativePlatform(),s},L=(e=>e.Capacitor=P(e))("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}),x=L.registerPlugin;L.Plugins;class E{constructor(e){this.listeners={},this.retainedEventArguments={},this.windowListeners={},e&&(console.warn('Capacitor WebPlugin "'.concat(e.name,'" config object was deprecated in v3 and will be removed in v4.')),this.config=e)}addListener(e,t){let n=!1;this.listeners[e]||(this.listeners[e]=[],n=!0),this.listeners[e].push(t);const o=this.windowListeners[e];o&&!o.registered&&this.addWindowListener(o),n&&this.sendRetainedArgumentsForEvent(e);return Promise.resolve({remove:async()=>this.removeListener(e,t)})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,n){const o=this.listeners[e];if(o)o.forEach((e=>e(t)));else if(n){let n=this.retainedEventArguments[e];n||(n=[]),n.push(t),this.retainedEventArguments[e]=n}}hasListeners(e){return!!this.listeners[e].length}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:e=>{this.notifyListeners(t,e)}}}unimplemented(e="not implemented"){return new L.Exception(e,y.Unimplemented)}unavailable(e="not available"){return new L.Exception(e,y.Unavailable)}async removeListener(e,t){const n=this.listeners[e];if(!n)return;const o=n.indexOf(t);this.listeners[e].splice(o,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach((t=>{this.notifyListeners(e,t)})))}}const R=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),S=e=>e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class k extends E{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach((e=>{if(e.length<=0)return;let[n,o]=e.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");n=S(n).trim(),o=S(o).trim(),t[n]=o})),t}async setCookie(e){try{const t=R(e.key),n=R(e.value),o="; expires=".concat((e.expires||"").replace("expires=","")),a=(e.path||"/").replace("path=",""),r=null!=e.url&&e.url.length>0?"domain=".concat(e.url):"";document.cookie="".concat(t,"=").concat(n||"").concat(o,"; path=").concat(a,"; ").concat(r,";")}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie="".concat(e.key,"=; Max-Age=0")}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,"=;expires=".concat((new Date).toUTCString(),";path=/"))}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}x("CapacitorCookies",{web:()=>new k});const T=(e,t={})=>{const n=Object.assign({method:e.method||"GET",headers:e.headers},t),o=((e={})=>{const t=Object.keys(e);return Object.keys(e).map((e=>e.toLocaleLowerCase())).reduce(((n,o,a)=>(n[o]=e[t[a]],n)),{})})(e.headers)["content-type"]||"";if("string"==typeof e.data)n.body=e.data;else if(o.includes("application/x-www-form-urlencoded")){const t=new URLSearchParams;for(const[n,o]of Object.entries(e.data||{}))t.set(n,o);n.body=t.toString()}else if(o.includes("multipart/form-data")||e.data instanceof FormData){const t=new FormData;if(e.data instanceof FormData)e.data.forEach(((e,n)=>{t.append(n,e)}));else for(const n of Object.keys(e.data))t.append(n,e.data[n]);n.body=t;const o=new Headers(n.headers);o.delete("content-type"),n.headers=o}else(o.includes("application/json")||"object"==typeof e.data)&&(n.body=JSON.stringify(e.data));return n};class O extends E{async request(e){const t=T(e,e.webFetchExtra),n=((e,t=!0)=>e?Object.entries(e).reduce(((e,n)=>{const[o,a]=n;let r,i;return Array.isArray(a)?(i="",a.forEach((e=>{r=t?encodeURIComponent(e):e,i+="".concat(o,"=").concat(r,"&")})),i.slice(0,-1)):(r=t?encodeURIComponent(a):a,i="".concat(o,"=").concat(r)),"".concat(e,"&").concat(i)}),"").substr(1):null)(e.params,e.shouldEncodeUrlParams),o=n?"".concat(e.url,"?").concat(n):e.url,a=await fetch(o,t),r=a.headers.get("content-type")||"";let i,s,{responseType:l="text"}=a.ok?e:{};switch(r.includes("application/json")&&(l="json"),l){case"arraybuffer":case"blob":s=await a.blob(),i=await(async e=>new Promise(((t,n)=>{const o=new FileReader;o.onload=()=>{const e=o.result;t(e.indexOf(",")>=0?e.split(",")[1]:e)},o.onerror=e=>n(e),o.readAsDataURL(e)})))(s);break;case"json":i=await a.json();break;default:i=await a.text()}const c={};return a.headers.forEach(((e,t)=>{c[t]=e})),{data:i,headers:c,status:a.status,url:a.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}var A,_,j,I;x("CapacitorHttp",{web:()=>new O}),(_=A||(A={})).Base64="base64",_.ImageFilePath="imageFilePath",(I=j||(j={})).Success="success",I.Cancel="cancel";const M=x("DocumentScanner",{web:()=>e((()=>import("./web-BuY35pyw.js")),__vite__mapDeps([0,1,2])).then((e=>new e.DocumentScannerWeb))}),F=()=>{const e=window.cv,t=(e,t)=>Math.hypot(e.x-t.x,e.y-t.y),n=t=>{const n=new e.Mat;e.cvtColor(t,n,e.COLOR_RGBA2GRAY);const o=new e.Mat;e.GaussianBlur(n,o,new e.Size(5,5),0,0,e.BORDER_DEFAULT);const a=new e.Mat;e.threshold(o,a,0,255,e.THRESH_BINARY+e.THRESH_OTSU);const r=new e.MatVector,i=new e.Mat;e.findContours(a,r,i,e.RETR_CCOMP,e.CHAIN_APPROX_SIMPLE);let s=0,l=-1;if(r.size()>0){for(let t=0;t<r.size();++t){const n=r.get(t),o=e.contourArea(n);o>s&&(s=o,l=t),n.delete()}if(-1!==l){const e=r.get(l);return n.delete(),o.delete(),a.delete(),i.delete(),r.delete(),e}}return n.delete(),o.delete(),a.delete(),r.delete(),i.delete(),null},o=(n,o)=>{const a=e.minAreaRect(n).center;let r,i,s,l;for(let e=0;e<n.data32S.length;e+=2){const o={x:n.data32S[e],y:n.data32S[e+1]},c=t(o,a);o.x<a.x&&o.y<a.y?(!r||c>t(r,a))&&(r=o):o.x>a.x&&o.y<a.y?(!i||c>t(i,a))&&(i=o):o.x<a.x&&o.y>a.y?(!s||c>t(s,a))&&(s=o):o.x>a.x&&o.y>a.y&&(!l||c>t(l,a))&&(l=o)}return{topLeftCorner:r,topRightCorner:i,bottomLeftCorner:s,bottomRightCorner:l}};return{highlightPaper:(t,a={})=>{a.color=a.color||"orange",a.thickness=a.thickness||10;const r=document.createElement("canvas"),i=r.getContext("2d"),s=e.imread(t),l=n(s);if(e.imshow(r,s),l){const{topLeftCorner:e,topRightCorner:t,bottomLeftCorner:n,bottomRightCorner:r}=o(l);e&&t&&n&&r&&(i.strokeStyle=a.color,i.lineWidth=a.thickness,i.beginPath(),i.moveTo(e.x,e.y),i.lineTo(t.x,t.y),i.lineTo(r.x,r.y),i.lineTo(n.x,n.y),i.lineTo(e.x,e.y),i.stroke())}return s.delete(),r},extractPaper:(t,a,r,i)=>{const s=document.createElement("canvas"),l=e.imread(t),c=n(l),{topLeftCorner:d,topRightCorner:u,bottomLeftCorner:h,bottomRightCorner:m}=i||o(c),v=new e.Mat,g=new e.Size(a,r),f=e.matFromArray(4,1,e.CV_32FC2,[d.x,d.y,u.x,u.y,h.x,h.y,m.x,m.y]),p=e.matFromArray(4,1,e.CV_32FC2,[0,0,a,0,0,r,a,r]),w=e.getPerspectiveTransform(f,p);return e.warpPerspective(l,v,w,g,e.INTER_LINEAR,e.BORDER_CONSTANT,new e.Scalar),e.imshow(s,v),l.delete(),v.delete(),s},findPaperContour:n,getCornerPoints:o}},N=window.cv,U={topLeftCorner:{x:0,y:0},topRightCorner:{x:0,y:0},bottomLeftCorner:{x:0,y:0},bottomRightCorner:{x:0,y:0}};var D=(e=>(e.Pre="Pre",e.Streaming="Streaming",e.Interaction="Interaction",e.Save="Save",e))(D||{});const q=t(null),W=(e,t,n,o)=>{const a={video:{facingMode:"environment",width:{ideal:1280},height:{ideal:720}}};if(!e.value||!t.value)return void console.error("Video or canvas references are not available");const r=t.value.getContext("2d",{willReadFrequently:!0});null==r||r.clearRect(0,0,t.value.width,t.value.height),(e=>{if(document.getElementById("open-cv"))e();else{const t=document.createElement("script");t.id="open-cv",t.async=!0,t.src="https://docs.opencv.org/5.x/opencv.js",t.onload=e,document.body.appendChild(t)}})((()=>{console.log("OpenCV loaded and ready."),((e,t,n,o,a,r,i)=>{navigator.mediaDevices.getUserMedia(a).then((a=>{r.srcObject=a,r.addEventListener("loadeddata",(()=>{let a=10;const s=()=>{a>0?r.videoWidth>0&&r.videoHeight>0?(r.play(),((e,t,n)=>{const o=e.value,a=t.value,r=n.value,i=o.videoWidth,s=o.videoHeight;a.width=i,a.height=s,r.width=i,r.height=s})(t,n,o),e.value="Streaming",i()):setTimeout(s,100):i("Unable to play video stream."),a--};s()}))})).catch((e=>{console.error("Error accessing camera:",e)}))})(n,e,t,o,a,e.value,(()=>{const o=t.value.getContext("2d",{willReadFrequently:!0});if(o){const a=F();((e,t,n,o,a)=>{const r=()=>{if(t&&(n.drawImage(t,0,0),e.value)){const t=o.highlightPaper(e.value,{thickness:5,color:"blue"});t&&n.drawImage(t,0,0)}"Streaming"==a.value&&requestAnimationFrame(r)};r()})(t,e.value,o,a,n)}}))}))},B=(e,t)=>{const n=e.getContext("2d",{willReadFrequently:!0});if(n){const o=n.getImageData(0,0,e.width,e.height),a=window.cv.matFromImageData(o),r=F(),i=r.findPaperContour(a);if(!i)return void console.error("No document found!");const s=r.getCornerPoints(i,o),{topLeftCorner:l,topRightCorner:c,bottomLeftCorner:d,bottomRightCorner:u}=s;U.topLeftCorner=l,U.topRightCorner=c,U.bottomLeftCorner=d,U.bottomRightCorner=u,t.save(),((e,t,n)=>{const{topLeftCorner:o,topRightCorner:a,bottomLeftCorner:r,bottomRightCorner:i}=n;e.beginPath(),e.moveTo(0,0),e.lineTo(t.width,0),e.lineTo(t.width,t.height),e.lineTo(0,t.height),e.closePath(),e.moveTo(o.x,o.y),e.lineTo(a.x,a.y),e.lineTo(i.x,i.y),e.lineTo(r.x,r.y),e.closePath(),e.fillStyle="rgba(0, 0, 0, 0.5)",e.fill("evenodd")})(t,e,s),t.lineWidth=3,t.strokeStyle="white",t.beginPath(),t.moveTo(l.x,l.y),t.lineTo(c.x,c.y),t.lineTo(u.x,u.y),t.lineTo(d.x,d.y),t.closePath(),t.stroke(),((e,t)=>{const{topLeftCorner:n,topRightCorner:o,bottomLeftCorner:a,bottomRightCorner:r}=e;[n,o,a,r].forEach((e=>{t.beginPath(),t.arc(e.x,e.y,15,0,2*Math.PI),t.fillStyle="rgba(255, 255, 255, 0)",t.fill(),t.strokeStyle="white",t.lineWidth=2,t.stroke()}))})(s,t),t.restore()}},H=(e,t,n)=>{const o=e-n.x,a=t-n.y;return o*o+a*a<=225},G=(e,t)=>{const n=t.getBoundingClientRect(),o=(e=>e.width/e.clientWidth)(t),a=(e=>e.height/e.clientHeight)(t),r=e instanceof MouseEvent?e.layerX:e.touches[0].clientX,i=e instanceof MouseEvent?e.layerY:e.touches[0].clientY,s=(r-n.left)*o,l=(i-n.top)*a;q.value=((e,t)=>{const{topLeftCorner:n,topRightCorner:o,bottomLeftCorner:a,bottomRightCorner:r}=U;return console.log(e,t),H(e,t,n)?n:H(e,t,o)?o:H(e,t,a)?a:H(e,t,r)?r:null})(s,l)},V=e=>{const t=null==e?void 0:e.getContext("2d",{willReadFrequently:!0});null==t||t.clearRect(0,0,e.width,e.height),e&&t&&B(e,t)},z={class:"action-buttons"},X=n({__name:"DocumentViewerPage",setup(e){const n="web"!==o.getPlatform(),w=t(D.Pre),y=t(""),C=t(null),b=t(null),P=t(null),L=async()=>{if(n)try{const{scannedImages:e}=await M.scanDocument({responseType:"base64"});e&&(y.value=CavideoRef,canvasRefpacitor.convertFileSrc(e[0]))}catch(e){console.error("Scan failed:",e)}else((e,t,n,o,a)=>{e.value="",o.value.style.display="none",t.value.style.display="block",n.value.style.display="block";const r=n.value.getContext("2d",{willReadFrequently:!0}),i=o.value.getContext("2d",{willReadFrequently:!0});null==r||r.clearRect(0,0,n.value.width,n.value.height),null==i||i.clearRect(0,0,o.value.width,o.value.height),W(t,n,a,o)})(y,C,b,P,w)},x=()=>{const e=b.value,t=P.value,n=t.getContext("2d");n.drawImage(C.value,0,0,e.width,e.height),t.style.display="block",((e,t="blue")=>{const n=e.value,o=null==n?void 0:n.getContext("2d",{willReadFrequently:!0});if(!o||!N)return;const a=o.getImageData(0,0,n.width,n.height),r=N.matFromImageData(a),i=new N.Mat;N.cvtColor(r,i,N.COLOR_RGBA2GRAY,0);const s=new N.Mat;N.GaussianBlur(i,s,new N.Size(5,5),0);const l=new N.Mat;N.Canny(s,l,50,150);const c=new N.MatVector,d=new N.Mat;N.findContours(l,c,d,N.RETR_EXTERNAL,N.CHAIN_APPROX_SIMPLE);let u=null,h=0;for(let v=0;v<c.size();v++){const e=c.get(v),t=N.contourArea(e,!1);t>h&&(h=t,u=e)}const m=new N.Mat;if(u){const e=N.arcLength(u,!0);N.approxPolyDP(u,m,.02*e,!0),o.lineWidth=3,o.strokeStyle=t,o.beginPath();for(let t=0;t<m.data32S.length/2;t++){const e=m.data32S[2*t],n=m.data32S[2*t+1];0===t?o.moveTo(e,n):o.lineTo(e,n)}o.closePath(),o.stroke()}r.delete(),i.delete(),s.delete(),l.delete(),c.delete(),d.delete(),m.delete()})(b,"white"),e.style.display="none",C.value.style.display="none",B(e,n),w.value=D.Interaction,E()},E=()=>{const e=P.value;e.addEventListener("mousedown",(e=>t=>{G(t,e),V(e)})(e)),e.addEventListener("mousemove",(e=>t=>{q.value&&(G(t,e),V(e))})(e)),e.addEventListener("mouseup",void(q.value=null)),e.addEventListener("touchstart",(e=>t=>{G(t,e),console.log("onTouchStart",q.value)})(e)),e.addEventListener("touchmove",(e=>t=>{G(t,e),console.log("onTouchMove",q.value)})(e)),e.addEventListener("touchend",void(q.value=null))},R=()=>{const e=P.value,t=e.getContext("2d"),n=F(),{topLeftCorner:o,topRightCorner:a,bottomLeftCorner:r,bottomRightCorner:i}=U,s=(e,t)=>Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2)),l=(e,t,n,o)=>Math.floor(Math.max(s(e,t),s(n,o))),c=l(o,a,r,i),d=l(o,r,a,i),u=n.extractPaper("outputCanvas",c,d);e.width=c,e.height=d,t.drawImage(u,0,0)},S=()=>{w.value=D.Pre},k=()=>{if(C.value&&C.value.srcObject){C.value.srcObject.getTracks().forEach((e=>e.stop())),C.value.srcObject=null}w.value=D.Pre},T=()=>{isFlashOn.value=!isFlashOn.value};return(e,t)=>(a(),r(s(p),null,{default:i((()=>[l(s(f),null,{default:i((()=>[c("video",{ref_key:"videoRef",ref:C,id:"videoSource",playsinline:"",autoplay:"",muted:"",style:{opacity:"0",width:"0",height:"0"}},null,512),w.value===s(D).Streaming?(a(),r(s(d),{key:0,id:"close-camera",name:s(u),onClick:k},null,8,["name"])):h("",!0),c("canvas",{ref_key:"canvasRef",ref:b,id:"outputCanvas"},null,512),c("canvas",{ref_key:"resultCanvasRef",ref:P,id:"resultCanvas",style:{display:"none"}},null,512),c("div",z,[l(s(m),{onClick:L},{default:i((()=>t[0]||(t[0]=[v(g("Start"))]))),_:1}),w.value===s(D).Streaming?(a(),r(s(m),{key:0,onClick:x},{default:i((()=>t[1]||(t[1]=[v(" Capture Image ")]))),_:1})):h("",!0),w.value===s(D).Streaming?(a(),r(s(m),{key:1,onClick:T},{default:i((()=>t[2]||(t[2]=[v(" Turn On Flash ")]))),_:1})):h("",!0),w.value===s(D).Interaction?(a(),r(s(m),{key:2,onClick:R},{default:i((()=>t[3]||(t[3]=[v(" Extract ")]))),_:1})):h("",!0),[s(D).Interaction].includes(w.value)?(a(),r(s(m),{key:3,onClick:S},{default:i((()=>t[4]||(t[4]=[v(" Save ")]))),_:1})):h("",!0)])])),_:1})])),_:1}))}},[["__scopeId","data-v-45eaa184"]]),Y=Object.freeze(Object.defineProperty({__proto__:null,default:X},Symbol.toStringTag,{value:"Module"}));export{b as C,Y as D,j as S,E as W,x as r};
