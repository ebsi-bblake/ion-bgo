if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let a={};const t=s=>l(s,r),u={module:{uri:r},exports:a,require:t};e[r]=Promise.all(i.map((s=>u[s]||t(s)))).then((s=>(n(...s),a)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AiChatPage-DyjJ9RQE.js",revision:null},{url:"assets/AiChatPage-legacy-Knc-LeUh.js",revision:null},{url:"assets/ContactUsPage-DAggTKGZ.js",revision:null},{url:"assets/ContactUsPage-legacy-_BXw1STv.js",revision:null},{url:"assets/DocumentViewerPage-C769jZ6V.js",revision:null},{url:"assets/DocumentViewerPage-legacy-CP_Dh7w9.js",revision:null},{url:"assets/DocumentViewerPage-opVEXqTD.css",revision:null},{url:"assets/ExploreContainer-C46RAOR_.css",revision:null},{url:"assets/ExploreContainer-Cr_GMvXr.js",revision:null},{url:"assets/ExploreContainer-legacy-DUyn_ZmU.js",revision:null},{url:"assets/focus-visible-C4Ai9SoT.js",revision:null},{url:"assets/focus-visible-legacy-DUnU5P9z.js",revision:null},{url:"assets/HomePage-DV9QBiSo.js",revision:null},{url:"assets/HomePage-legacy-BmkYTeQb.js",revision:null},{url:"assets/InboxPage-Di8oL8CN.js",revision:null},{url:"assets/InboxPage-legacy-9o9eF7ye.js",revision:null},{url:"assets/index-B7hZxyvk.js",revision:null},{url:"assets/index-BFF7NHk9.css",revision:null},{url:"assets/index-legacy-7nEaFYte.js",revision:null},{url:"assets/index3-Biewzzf7.js",revision:null},{url:"assets/index3-legacy-B54j2DGm.js",revision:null},{url:"assets/index9-CuTZO0_E.js",revision:null},{url:"assets/index9-legacy-Cw7ddVJ8.js",revision:null},{url:"assets/input-shims-legacy-NIGpBEe3.js",revision:null},{url:"assets/input-shims-Y9gBXSsy.js",revision:null},{url:"assets/ios.transition-caGg-Q1r.js",revision:null},{url:"assets/ios.transition-legacy-CdJjMXks.js",revision:null},{url:"assets/keyboard2-DkiARzpE.js",revision:null},{url:"assets/keyboard2-legacy-CeiVHcOF.js",revision:null},{url:"assets/LoginPage-KxU8iS_k.js",revision:null},{url:"assets/LoginPage-legacy-CnNB7O67.js",revision:null},{url:"assets/md.transition-D-AVUBmj.js",revision:null},{url:"assets/md.transition-legacy-CKQi5_bf.js",revision:null},{url:"assets/OnboardingPage-CZ8Na1Nw.js",revision:null},{url:"assets/OnboardingPage-legacy-h3Hs9o6I.js",revision:null},{url:"assets/polyfills-legacy-BgriWCAi.js",revision:null},{url:"assets/pwa-action-sheet.entry-legacy-B-0uxz2r.js",revision:null},{url:"assets/pwa-action-sheet.entry-z5Tf3cSi.js",revision:null},{url:"assets/pwa-camera-modal-instance.entry-DRRf0Qx5.js",revision:null},{url:"assets/pwa-camera-modal-instance.entry-legacy-Bx3ViUjo.js",revision:null},{url:"assets/pwa-camera-modal.entry-BmV6Hng7.js",revision:null},{url:"assets/pwa-camera-modal.entry-legacy-CR3AGPuT.js",revision:null},{url:"assets/pwa-camera.entry-CagqC3iq.js",revision:null},{url:"assets/pwa-camera.entry-legacy-Dey_Xc_T.js",revision:null},{url:"assets/pwa-toast.entry-legacy-PO6jOrSF.js",revision:null},{url:"assets/pwa-toast.entry-PoJ08aw9.js",revision:null},{url:"assets/SettingsPage-L3ev5zNY.js",revision:null},{url:"assets/SettingsPage-legacy-zOK-flsT.js",revision:null},{url:"assets/status-tap-BylmoTqw.js",revision:null},{url:"assets/status-tap-legacy-nYOXDQXZ.js",revision:null},{url:"assets/swipe-back-B8UVmLA9.js",revision:null},{url:"assets/swipe-back-legacy-CFJ1aaUH.js",revision:null},{url:"assets/ToDoListPage-CDkunKar.js",revision:null},{url:"assets/ToDoListPage-legacy-2Vzsgct_.js",revision:null},{url:"assets/web-DzZht27a.js",revision:null},{url:"assets/web-legacy-DswZ01q7.js",revision:null},{url:"index.html",revision:"931406db3c1cccf930762db10a046351"},{url:"registerSW.js",revision:"55b9bf67304d4dac9aeb254dd9fcf447"},{url:"manifest.webmanifest",revision:"7829de4c0f903c1bd63b62ed8f1ed388"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
