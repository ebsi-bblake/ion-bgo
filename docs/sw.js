if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const u=s=>l(s,r),t={module:{uri:r},exports:a,require:u};e[r]=Promise.all(i.map((s=>t[s]||u(s)))).then((s=>(n(...s),a)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AiChatPage-legacy-CgrWMoFo.js",revision:null},{url:"assets/AiChatPage-O8LXDJJJ.js",revision:null},{url:"assets/ContactUsPage-BCJeafX9.js",revision:null},{url:"assets/ContactUsPage-legacy-D51Ftuws.js",revision:null},{url:"assets/ExploreContainer-C46RAOR_.css",revision:null},{url:"assets/ExploreContainer-legacy-10VJLq3w.js",revision:null},{url:"assets/ExploreContainer-RIlpzNY2.js",revision:null},{url:"assets/focus-visible-C4Ai9SoT.js",revision:null},{url:"assets/focus-visible-legacy-DUnU5P9z.js",revision:null},{url:"assets/HomePage-CklW61R5.js",revision:null},{url:"assets/HomePage-legacy-8qcS6by8.js",revision:null},{url:"assets/InboxPage-BJHp3unO.js",revision:null},{url:"assets/InboxPage-legacy-CPJ4G4uC.js",revision:null},{url:"assets/index-B2d4qs-s.css",revision:null},{url:"assets/index-BmvdExpm.js",revision:null},{url:"assets/index-legacy-xc0dmz4J.js",revision:null},{url:"assets/index3-d2MrQso9.js",revision:null},{url:"assets/index3-legacy-BJiHc31N.js",revision:null},{url:"assets/index9-B1U-XkkI.js",revision:null},{url:"assets/index9-legacy-DjsNZagr.js",revision:null},{url:"assets/input-shims-Dj_PM3QI.js",revision:null},{url:"assets/input-shims-legacy-C77sc837.js",revision:null},{url:"assets/ios.transition-DyPEf8_4.js",revision:null},{url:"assets/ios.transition-legacy-26yTcoQa.js",revision:null},{url:"assets/keyboard2-CEPm_n-2.js",revision:null},{url:"assets/keyboard2-legacy-C4ZJ_Nfy.js",revision:null},{url:"assets/LoginPage-legacy-2NLd7wqB.js",revision:null},{url:"assets/LoginPage-zOsbwZte.js",revision:null},{url:"assets/md.transition-BqzDHgDf.js",revision:null},{url:"assets/md.transition-legacy-D9gAljq8.js",revision:null},{url:"assets/OnboardingPage-C2Nctulr.js",revision:null},{url:"assets/OnboardingPage-legacy-8aweUcM6.js",revision:null},{url:"assets/polyfills-legacy-zX2O9D_H.js",revision:null},{url:"assets/SettingsPage-DLVNPXV4.js",revision:null},{url:"assets/SettingsPage-legacy-CW1GQCpd.js",revision:null},{url:"assets/status-tap-CCQqFmat.js",revision:null},{url:"assets/status-tap-legacy-DI8Lcjj9.js",revision:null},{url:"assets/swipe-back-Byq6iDwC.js",revision:null},{url:"assets/swipe-back-legacy-DPgDKD_i.js",revision:null},{url:"assets/ToDoListPage-CxzxPJ9a.js",revision:null},{url:"assets/ToDoListPage-legacy-CZiu9Fy3.js",revision:null},{url:"index.html",revision:"52ef99260d1dcf8f560a9c5e242ec657"},{url:"registerSW.js",revision:"55b9bf67304d4dac9aeb254dd9fcf447"},{url:"manifest.webmanifest",revision:"7829de4c0f903c1bd63b62ed8f1ed388"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
