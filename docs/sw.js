if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const a=s=>l(s,r),t={module:{uri:r},exports:u,require:a};e[r]=Promise.all(i.map((s=>t[s]||a(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/AiChatPage-DuKZcZWa.js",revision:null},{url:"assets/AiChatPage-legacy-B95ZdZwi.js",revision:null},{url:"assets/ContactUsPage-GpEKCpBU.js",revision:null},{url:"assets/ContactUsPage-legacy-215F6GPj.js",revision:null},{url:"assets/ExploreContainer-C46RAOR_.css",revision:null},{url:"assets/ExploreContainer-CCVDcvDt.js",revision:null},{url:"assets/ExploreContainer-legacy-Db8CIHhI.js",revision:null},{url:"assets/focus-visible-C4Ai9SoT.js",revision:null},{url:"assets/focus-visible-legacy-DUnU5P9z.js",revision:null},{url:"assets/HomePage-Bwk_2F5O.js",revision:null},{url:"assets/HomePage-legacy-7UKTI1_h.js",revision:null},{url:"assets/InboxPage-_mL6pDH8.js",revision:null},{url:"assets/InboxPage-legacy-BBc4JsDu.js",revision:null},{url:"assets/index-CnW-HKGA.js",revision:null},{url:"assets/index-DQzPAPpW.css",revision:null},{url:"assets/index-legacy-DsXkgNVu.js",revision:null},{url:"assets/index3-C9YNfTjd.js",revision:null},{url:"assets/index3-legacy-BNhzQ5zQ.js",revision:null},{url:"assets/index9-Fl9v2mNp.js",revision:null},{url:"assets/index9-legacy-DBVTMEef.js",revision:null},{url:"assets/input-shims-CcvS_BCc.js",revision:null},{url:"assets/input-shims-legacy-BLVvbvfR.js",revision:null},{url:"assets/ios.transition-kfCKfb8q.js",revision:null},{url:"assets/ios.transition-legacy-CGKMlpUd.js",revision:null},{url:"assets/keyboard2-legacy-BZBVeuX7.js",revision:null},{url:"assets/keyboard2-r_fW4Op_.js",revision:null},{url:"assets/LoginPage-CWY6LfxS.js",revision:null},{url:"assets/LoginPage-legacy-BjqJCLHF.js",revision:null},{url:"assets/md.transition-legacy-CvfJLCcW.js",revision:null},{url:"assets/md.transition-O5E-KllZ.js",revision:null},{url:"assets/OnboardingPage-D6KkVsAf.js",revision:null},{url:"assets/OnboardingPage-legacy-Cyc33N3H.js",revision:null},{url:"assets/polyfills-legacy-zX2O9D_H.js",revision:null},{url:"assets/SettingsPage-Dszlog_O.js",revision:null},{url:"assets/SettingsPage-legacy-D6VA7yhg.js",revision:null},{url:"assets/status-tap-D0IXNXCX.js",revision:null},{url:"assets/status-tap-legacy-DW6vjpFv.js",revision:null},{url:"assets/swipe-back-legacy-TQnN38np.js",revision:null},{url:"assets/swipe-back-oqts2a8C.js",revision:null},{url:"assets/ToDoListPage-CkQ7zl_m.js",revision:null},{url:"assets/ToDoListPage-legacy-r3ekA10E.js",revision:null},{url:"index.html",revision:"7070e38c4791d828b5baef147cabcb68"},{url:"registerSW.js",revision:"55b9bf67304d4dac9aeb254dd9fcf447"},{url:"manifest.webmanifest",revision:"7829de4c0f903c1bd63b62ed8f1ed388"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
