import{M as e,N as t,O as n,P as o,Q as s}from"./index-CBreiGDI.js";
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */const r=()=>{const r=window;r.addEventListener("statusTap",(()=>{e((()=>{const e=r.innerWidth,i=r.innerHeight,a=document.elementFromPoint(e/2,i/2);if(!a)return;const d=t(a);d&&new Promise((e=>n(d,e))).then((()=>{o((async()=>{d.style.setProperty("--overflow","hidden"),await s(d,300),d.style.removeProperty("--overflow")}))}))}))}))};export{r as startStatusTap};
