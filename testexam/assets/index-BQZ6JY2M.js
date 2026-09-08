import{j as e,M as ls,r as ms,a as us}from"./vendor-markdown-oKfvsm2C.js";import{a as ps,b as p,R as pe,u as Qe,N as ke,O as ys,c as oe,L as E,d as Ge,e as fs,f as G,B as hs}from"./vendor-react-D6jYZ0oZ.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);new MutationObserver(d=>{for(const o of d)if(o.type==="childList")for(const h of o.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function n(d){const o={};return d.integrity&&(o.integrity=d.integrity),d.referrerPolicy&&(o.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?o.credentials="include":d.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(d){if(d.ep)return;d.ep=!0;const o=n(d);fetch(d.href,o)}})();var ye={},qe;function gs(){if(qe)return ye;qe=1;var s=ps();return ye.createRoot=s.createRoot,ye.hydrateRoot=s.hydrateRoot,ye}var bs=gs();/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=(...s)=>s.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xs=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ks=s=>s.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,n,r)=>r?r.toUpperCase():n.toLowerCase());/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Be=s=>{const t=ks(s);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Se={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ss=s=>{for(const t in s)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},vs=p.createContext({}),js=()=>p.useContext(vs),Cs=p.forwardRef(({color:s,size:t,strokeWidth:n,absoluteStrokeWidth:r,className:d="",children:o,iconNode:h,...l},y)=>{const{size:a=24,strokeWidth:u=2,absoluteStrokeWidth:m=!1,color:c="currentColor",className:i=""}=js()??{},f=r??m?Number(n??u)*24/Number(t??a):n??u;return p.createElement("svg",{ref:y,...Se,width:t??a??Se.width,height:t??a??Se.height,stroke:s??c,strokeWidth:f,className:Ke("lucide",i,d),...!o&&!Ss(l)&&{"aria-hidden":"true"},...l},[...h.map(([S,T])=>p.createElement(S,T)),...Array.isArray(o)?o:[o]])});/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(s,t)=>{const n=p.forwardRef(({className:r,...d},o)=>p.createElement(Cs,{ref:o,iconNode:t,className:Ke(`lucide-${xs(Be(s))}`,`lucide-${s}`,r),...d}));return n.displayName=Be(s),n};/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ms=[["circle",{cx:"12",cy:"13",r:"8",key:"3y4lt7"}],["path",{d:"M12 9v4l2 2",key:"1c63tq"}],["path",{d:"M5 3 2 6",key:"18tl5t"}],["path",{d:"m22 6-3-3",key:"1opdir"}],["path",{d:"M6.38 18.7 4 21",key:"17xu3x"}],["path",{d:"M17.64 18.67 20 21",key:"kv2oe2"}]],Ns=g("alarm-clock",Ms);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ws=[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["path",{d:"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z",key:"1l2ple"}],["path",{d:"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z",key:"1wam0m"}]],Ts=g("atom",ws);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ps=[["rect",{x:"14",y:"14",width:"4",height:"6",rx:"2",key:"p02svl"}],["rect",{x:"6",y:"4",width:"4",height:"6",rx:"2",key:"xm4xkj"}],["path",{d:"M6 20h4",key:"1i6q5t"}],["path",{d:"M14 10h4",key:"ru81e7"}],["path",{d:"M6 14h2v6",key:"16z9wg"}],["path",{d:"M14 4h2v6",key:"1idq9u"}]],Rs=g("binary",Ps);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ds=[["path",{d:"M10 2v8l3-3 3 3V2",key:"sqw3rj"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}]],Xe=g("book-marked",Ds);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Os=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],ce=g("book-open",Os);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ls=[["path",{d:"m14.5 7.5-5 5",key:"3lb6iw"}],["path",{d:"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20",key:"k3hazp"}],["path",{d:"m9.5 7.5 5 5",key:"ko136h"}]],Ye=g("book-x",Ls);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Is=[["path",{d:"M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1",key:"ezmyqa"}],["path",{d:"M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",key:"e1hn23"}]],As=g("braces",Is);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Es=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],qs=g("briefcase",Es);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Ce=g("chart-column",Bs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs=[["path",{d:"M12 16v5",key:"zza2cw"}],["path",{d:"M16 14.639V21",key:"1s85h0"}],["path",{d:"M20 10.656V21",key:"q45596"}],["path",{d:"m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15",key:"1fw8x9"}],["path",{d:"M4 18.463V21",key:"1otddq"}],["path",{d:"M8 14.656V21",key:"1t2idw"}]],Vs=g("chart-no-axes-combined",Hs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Us=[["path",{d:"M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z",key:"pzmjnu"}],["path",{d:"M21.21 15.89A10 10 0 1 1 8 2.83",key:"k2fpak"}]],He=g("chart-pie",Us);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fs=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],Ws=g("chevron-left",Fs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zs=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],_s=g("chevron-right",zs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 9-5.5 5.5L8 12",key:"xofnsj"}]],ie=g("circle-check",$s);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Js=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Te=g("circle-question-mark",Js);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qs=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]],ae=g("circle-x",Qs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}],["path",{d:"m9 14 2 2 4-4",key:"df797q"}]],Ks=g("clipboard-check",Gs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xs=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 6v6l4 2",key:"mmk7yg"}]],Pe=g("clock",Xs);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ys=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Zs=g("database",Ys);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const et=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],st=g("eye",et);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],at=g("file-text",tt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nt=[["path",{d:"M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",key:"1jaruq"}]],Me=g("flag",nt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const it=[["path",{d:"M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4",key:"1slcih"}]],rt=g("flame",it);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]],dt=g("folder-open",ot);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ct=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]],lt=g("globe",ct);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mt=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"r6nss1"}]],ut=g("house",mt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pt=[["polyline",{points:"22 12 16 12 14 15 10 15 8 12 2 12",key:"o97t9d"}],["path",{d:"M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",key:"oot6mr"}]],yt=g("inbox",pt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ft=[["path",{d:"M10 8h.01",key:"1r9ogq"}],["path",{d:"M12 12h.01",key:"1mp3jc"}],["path",{d:"M14 8h.01",key:"1primd"}],["path",{d:"M16 12h.01",key:"1l6xoz"}],["path",{d:"M18 8h.01",key:"emo2bl"}],["path",{d:"M6 8h.01",key:"x9i8wu"}],["path",{d:"M7 16h10",key:"wp8him"}],["path",{d:"M8 12h.01",key:"czm47f"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}]],ht=g("keyboard",ft);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gt=[["path",{d:"M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20",key:"1wjnjv"}],["path",{d:"M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13",key:"c1ejpn"}]],bt=g("leaf",gt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xt=[["path",{d:"m16 6 4 14",key:"ji33uf"}],["path",{d:"M12 6v14",key:"1n7gus"}],["path",{d:"M8 8v12",key:"1gg7y9"}],["path",{d:"M4 4v16",key:"6qkkli"}]],kt=g("library",xt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const St=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],Ze=g("lightbulb",St);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vt=[["path",{d:"M13 5h8",key:"a7qcls"}],["path",{d:"M13 12h8",key:"h98zly"}],["path",{d:"M13 19h8",key:"c3s6r1"}],["path",{d:"m3 17 2 2 4-4",key:"1jhpwq"}],["path",{d:"m3 7 2 2 4-4",key:"1obspn"}]],jt=g("list-checks",vt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ct=[["path",{d:"M11 5h10",key:"1cz7ny"}],["path",{d:"M11 12h10",key:"1438ji"}],["path",{d:"M11 19h10",key:"11t30w"}],["path",{d:"M4 4h1v5",key:"10yrso"}],["path",{d:"M4 9h2",key:"r1h2o0"}],["path",{d:"M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02",key:"xtkcd5"}]],Mt=g("list-ordered",Ct);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nt=[["path",{d:"M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",key:"169xi5"}],["path",{d:"M15 5.764v15",key:"1pn4in"}],["path",{d:"M9 3.236v15",key:"1uimfh"}]],wt=g("map",Nt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tt=[["path",{d:"M12 19v3",key:"npa21l"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["rect",{x:"9",y:"2",width:"6",height:"13",rx:"3",key:"s6n7sd"}]],es=g("mic",Tt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pt=[["path",{d:"M18 5h4",key:"1lhgn2"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],Ve=g("moon-star",Pt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rt=[["rect",{x:"16",y:"16",width:"6",height:"6",rx:"1",key:"4q2zg0"}],["rect",{x:"2",y:"16",width:"6",height:"6",rx:"1",key:"8cvhb9"}],["rect",{x:"9",y:"2",width:"6",height:"6",rx:"1",key:"1egb70"}],["path",{d:"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3",key:"1jsf9p"}],["path",{d:"M12 12V8",key:"2874zd"}]],Dt=g("network",Rt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ot=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],Lt=g("palette",Ot);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const It=[["path",{d:"M5.8 11.3 2 22l10.7-3.79",key:"gwxi1d"}],["path",{d:"M4 3h.01",key:"1vcuye"}],["path",{d:"M22 8h.01",key:"1mrtc2"}],["path",{d:"M15 2h.01",key:"1cjtqr"}],["path",{d:"M22 20h.01",key:"1mrys2"}],["path",{d:"m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10",key:"hbicv8"}],["path",{d:"m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17",key:"1i94pl"}],["path",{d:"m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7",key:"1cofks"}],["path",{d:"M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z",key:"4kbmks"}]],Re=g("party-popper",It);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const At=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Ue=g("play",At);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Et=[["path",{d:"M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",key:"w46dr5"}]],qt=g("puzzle",Et);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bt=[["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}],["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09",key:"u4xsad"}],["path",{d:"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z",key:"676m9"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05",key:"92ym6u"}]],Ht=g("rocket",Bt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vt=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],re=g("rotate-ccw",Vt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ut=[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Ft=g("search-x",Ut);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wt=[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]],ss=g("shuffle",Wt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zt=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],_t=g("sparkles",zt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $t=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],ne=g("star",$t);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jt=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 3v1",key:"1asbbs"}],["path",{d:"M12 20v1",key:"1wcdkc"}],["path",{d:"M3 12h1",key:"lp3yf2"}],["path",{d:"M20 12h1",key:"1vloll"}],["path",{d:"m18.364 5.636-.707.707",key:"1hakh0"}],["path",{d:"m6.343 17.657-.707.707",key:"18m9nf"}],["path",{d:"m5.636 5.636.707.707",key:"1xv1c5"}],["path",{d:"m17.657 17.657.707.707",key:"vl76zb"}]],Fe=g("sun-medium",Jt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qt=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],Ne=g("target",Qt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gt=[["path",{d:"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z",key:"m61m77"}],["path",{d:"M17 14V2",key:"8ymqnk"}]],Kt=g("thumbs-down",Gt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=[["path",{d:"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",key:"emmmcr"}],["path",{d:"M7 10v12",key:"1qc93n"}]],Yt=g("thumbs-up",Xt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zt=[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]],We=g("timer",Zt);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],sa=g("trash",ea);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],aa=g("trending-up",ta);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",key:"1ngwbx"}]],ia=g("wrench",na);/**
 * @license lucide-react v1.41.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=[["path",{d:"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z",key:"1v7up4"}]],oa=g("zap",ra),ze=s=>{let t;const n=new Set,r=(a,u)=>{const m=typeof a=="function"?a(t):a;if(!Object.is(m,t)){const c=t;t=u??(typeof m!="object"||m===null)?m:Object.assign({},t,m),n.forEach(i=>i(t,c))}},d=()=>t,l={setState:r,getState:d,getInitialState:()=>y,subscribe:a=>(n.add(a),()=>n.delete(a))},y=t=s(r,d,l);return l},da=(s=>s?ze(s):ze),ca=s=>s;function la(s,t=ca){const n=pe.useSyncExternalStore(s.subscribe,pe.useCallback(()=>t(s.getState()),[s,t]),pe.useCallback(()=>t(s.getInitialState()),[s,t]));return pe.useDebugValue(n),n}const _e=s=>{const t=da(s),n=r=>la(t,r);return Object.assign(n,t),n},ma=(s=>s?_e(s):_e),te="fequiz",B={records:`${te}.records.v1`,favorites:`${te}.favorites.v1`,dismissed:`${te}.wrong-dismissed.v1`,history:`${te}.history.v1`,interview:`${te}.interview-reports.v1`,paper:`${te}.practice-session.v1`};function Z(s,t){try{const n=localStorage.getItem(s);return n==null?t:JSON.parse(n)}catch{return t}}function K(s,t){try{localStorage.setItem(s,JSON.stringify(t))}catch{}}function de(s){return Array.isArray(s)?[...s].sort().join(","):String(s)}function ua(s,t){if(t==null)return!1;if(s.type==="judge"||s.type==="single")return de(t)===String(s.answer);if(s.type==="multiple"){const n=de(s.answer);return de(t)===n}return!1}function pa(s,t){return s.type==="essay"||s.type==="code"?"pending":ua(s,t)?"correct":"wrong"}function ts(s){const t=new Date(s),n=r=>String(r).padStart(2,"0");return`${t.getFullYear()}-${n(t.getMonth()+1)}-${n(t.getDate())} ${n(t.getHours())}:${n(t.getMinutes())}`}function ya(s){const t=new Date(s);return`${t.getMonth()+1}月${t.getDate()}日`}function ve(s){const t=Math.floor(s/60),n=s%60;return t===0?`${n} 秒`:`${t} 分 ${n} 秒`}function H(s,t){return t?Math.round(s/t*100):0}const fa=400,ha=20;function Y(s){K(B.records,s.records),K(B.favorites,s.favorites),K(B.dismissed,s.dismissedWrong),K(B.history,s.history),K(B.interview,s.interviewReports)}const w=ma((s,t)=>({records:Z(B.records,{}),favorites:Z(B.favorites,{}),dismissedWrong:Z(B.dismissed,[]),history:Z(B.history,[]),interviewReports:Z(B.interview,[]),submitAnswer:(n,r,d)=>{s(o=>{const h=o.records[n],l={questionId:n,grading:d,userAnswer:r,answeredAt:Date.now(),attempts:((h==null?void 0:h.attempts)??0)+1},y=[{questionId:n,time:Date.now(),grading:d},...o.history].slice(0,fa),a={...o,records:{...o.records,[n]:l},dismissedWrong:d==="wrong"?o.dismissedWrong:o.dismissedWrong.filter(u=>u!==n),history:y};return Y(a),a})},selfAssess:(n,r,d)=>{s(o=>{const h=o.records[n];if(!h)return o;const l={...h,grading:d?"correct":"wrong",userAnswer:r??h.userAnswer,answeredAt:Date.now()},y={...o,records:{...o.records,[n]:l},dismissedWrong:d?o.dismissedWrong.filter(a=>a!==n):o.dismissedWrong};return Y(y),y})},toggleFavorite:n=>{s(r=>{const d={...r.favorites};d[n]?delete d[n]:d[n]=Date.now();const o={...r,favorites:d};return Y(o),o})},isFavorite:n=>!!t().favorites[n],dismissWrong:n=>{s(r=>{if(r.dismissedWrong.includes(n))return r;const d={...r,dismissedWrong:[...r.dismissedWrong,n]};return Y(d),d})},restoreWrong:n=>{s(r=>{const d={...r,dismissedWrong:r.dismissedWrong.filter(o=>o!==n)};return Y(d),d})},saveInterviewReport:n=>{s(r=>{const d={...r,interviewReports:[n,...r.interviewReports].slice(0,ha)};return Y(d),d})},resetAll:()=>{const n={records:{},favorites:{},dismissedWrong:[],history:[],interviewReports:[]};Y({...t(),...n}),s(n)}})),ee=[{id:"html-css",name:"HTML & CSS",color:"#e8590c",description:"语义化、盒模型、BFC、Flex/Grid 布局、移动端适配等三件套基础",sources:["从零开始的前端面试题.md","面试问答.md","一些高频率考点.md"]},{id:"javascript",name:"JavaScript",color:"#b8860b",description:"数据类型、原型与闭包、this、异步与事件循环、DOM 与事件委托",sources:["从零开始的前端面试题.md","收集的面试知识点.md","面试问答.md"]},{id:"browser",name:"浏览器原理",color:"#1971c2",description:"进程线程、渲染原理、缓存、本地存储、同源策略、事件循环、GC 与安全",sources:["浏览器原理知识点.md","一些高频率考点.md"]},{id:"network",name:"计算机网络",color:"#5f3dc4",description:"HTTP/HTTPS、状态码、DNS、TCP/UDP、WebSocket 与 SSE",sources:["计算机网络面试题.md","收集的面试知识点.md"]},{id:"vue",name:"Vue",color:"#2f9e44",description:"响应式原理、生命周期、组件通信、Vue Router、Vuex/Pinia、虚拟 DOM",sources:["Vue框架面试题.md","一些高频率考点.md","知识点快速复习指南.md"]},{id:"react",name:"React",color:"#0c8599",description:"组件模型、setState、Hooks、Fiber、Diff、Redux 与状态管理",sources:["React框架面试题.md","收集的面试知识点.md","针对简历问答.md"]},{id:"performance",name:"性能优化",color:"#e03131",description:"性能指标、首屏加载、懒加载、虚拟列表、回流重绘、图片与资源优化",sources:["前端性能优化.md","前端性能优化面试题.md","知识点快速复习指南.md"]},{id:"engineering",name:"工程化",color:"#f08c00",description:"Git、Webpack、Vite、Babel、Tree Shaking、npm 与 Monorepo",sources:["前端工程化面试题.md","收集的面试知识点.md","基于简历的问题.md"]},{id:"algorithm",name:"算法与数据结构",color:"#7048e8",description:"数组、链表、树、图、动态规划、回溯、贪心与高频手写题",sources:["基础算法.md","知识点快速复习指南.md"]},{id:"scenario",name:"业务场景题",color:"#0c8599",description:"大文件上传、并发控制、多标签页通信、错误监控、组件封装等场景设计",sources:["问答类型面试题.md","一些高频率考点.md"]},{id:"project",name:"项目经验",color:"#862e9c",description:"农担智能体平台、慢 SQL 分析系统、BroadcastChannel、RBAC、FastAPI 与简历问答",sources:["农担重点逻辑.md","项目逻辑.md","针对简历问答.md","基于简历的问题.md","fastapi知识点.md"]},{id:"database",name:"SQL & MongoDB",color:"#087f5b",description:"SQL 基础、MySQL 索引与事务、慢查询优化、MongoDB 建模与数据库选型",sources:["收集的面试知识点.md","fastapi知识点.md","基于简历的问题.md"]}],me=Object.fromEntries(ee.map(s=>[s.id,s])),ga=[{id:"hc-001",type:"single",diff:"easy",sub:"HTML 基础",q:'`<script src="a.js">` 与 `<link href="style.css">` 中 src 和 href 的区别是什么？',opts:["src 表示引用资源替换当前元素内容，href 表示建立当前文档与资源的链接关系","src 和 href 完全等价，只是标签习惯不同","href 会阻塞解析而 src 不会","src 只能用于脚本，href 只能用于样式"],ans:"A",ana:"src（source）指向的内容会**嵌入并替换**当前元素，浏览器解析到 src 会暂停其他资源下载与处理，直到该资源加载执行完毕（如 script、img、iframe）。href（hypertext reference）只是在文档与资源之间建立**关联**，浏览器识别到 href 引用的资源会并行下载，并且不会停止对当前文档的处理（如 link、a）。",keys:["src 嵌入替换","href 建立关联","加载阻塞差异"],src:"从零开始的前端面试题.md"},{id:"hc-002",type:"essay",diff:"easy",sub:"HTML 基础",q:"谈谈你对 HTML 语义化的理解。",ans:"**面试回答：**语义化是指使用具有含义的标签来构建页面结构，比如 `header`、`nav`、`main`、`article`、`section`、`footer`，而不是全部用 div 嵌套。\n\n主要好处有三点：\n\n1. **代码结构更清晰**，团队协作和后期维护更容易；\n2. **SEO 更友好**，搜索引擎爬虫更容易理解页面各区块的内容和权重；\n3. **无障碍访问更好**，屏幕阅读器能根据标签语义准确识别页面结构，方便视障用户使用。\n\n实际开发中我会尽量避免“一 div 到底”，在合适的位置使用语义化标签，仅在纯样式容器场景使用 div。",ana:"语义化的核心是“标签本身具有含义”。可以结合 SEO、可访问性、可维护性三个维度回答，并给出常用语义化标签的例子。",keys:["header/nav/main/article","SEO","无障碍访问","可维护性"],src:"面试问答.md / 从零开始的前端面试题.md"},{id:"hc-003",type:"single",diff:"easy",sub:"HTML 基础",q:"关于 DOCTYPE 的作用，下列说法正确的是？",opts:["DOCTYPE 声明告知浏览器以哪种规范解析文档，`<!DOCTYPE html>` 让浏览器以标准模式渲染","DOCTYPE 声明是 HTML5 才引入的，旧版 HTML 不需要","没有 DOCTYPE 时浏览器会直接报错拒绝渲染","DOCTYPE 只影响 SEO 不影响渲染"],ans:"A",ana:"`<!DOCTYPE>` 声明位于文档最前面，作用是告诉浏览器以哪种 HTML 规范解析文档。HTML5 之前需要引用很长的 DTD，HTML5 简化为 `<!DOCTYPE html>`。缺少或不正确的声明会导致浏览器进入**怪异模式（混杂模式）**，以兼容老式的方式解析渲染，盒模型等表现会和标准模式有差异。声明缺失不会报错，但会导致渲染模式差异。",keys:["标准模式","怪异模式","HTML5 DOCTYPE"],src:"从零开始的前端面试题.md"},{id:"hc-004",type:"essay",diff:"medium",sub:"HTML 基础",q:"script 标签中 defer 和 async 有什么区别？",ans:`**面试回答：**两者都是为了解决 JS 加载执行阻塞 HTML 解析的问题，都会让脚本**异步下载**，区别在执行时机：

- **async**：下载完成后**立即执行**，多个 async 脚本的**执行顺序无法保证**，适合相互独立的脚本，比如统计脚本、广告脚本；
- **defer**：下载完成后**不立即执行**，等 HTML 解析完成后、触发 \`DOMContentLoaded\` 之前**按顺序执行**，适合有依赖关系的业务脚本。

另外普通 \`<script>\` 是同步的：下载并执行完才会继续解析 HTML，会阻塞解析；如果多个脚本之间有依赖关系，我会优先使用 defer。`,ana:"记忆点：async“下载完就跑，顺序不保证”；defer“排队等 HTML 解析完，顺序执行”。两者都不会阻塞 HTML 解析下载过程。",keys:["async 立即执行","defer 按序延迟执行","DOMContentLoaded"],src:"面试问答.md / 从零开始的前端面试题.md"},{id:"hc-005",type:"essay",diff:"easy",sub:"HTML 基础",q:"常用的 meta 标签有哪些？分别起什么作用？",ans:'**面试回答：**常用的 meta 标签主要有：\n\n1. `<meta charset="UTF-8">`：声明文档编码，避免乱码；\n2. `<meta name="viewport" content="width=device-width, initial-scale=1.0">`：移动端适配基础，让布局视口等于设备宽度；\n3. `<meta http-equiv="X-UA-Compatible" content="IE=edge">`：指定 IE 使用最新引擎渲染；\n4. `<meta name="keywords/description">`：SEO 相关的关键词与页面描述；\n5. `<meta http-equiv="refresh" content="30">`：定时刷新或跳转；\n6. CSP 相关：`<meta http-equiv="Content-Security-Policy">`，用于限制资源加载，防范 XSS。\n\n其中 viewport 和 charset 在日常项目中最常用。',ana:"viewport meta 是移动端适配必答题点：width=device-width 使布局视口等于理想视口，initial-scale 设置初始缩放。",keys:["charset","viewport","SEO description","CSP"],src:"从零开始的前端面试题.md"},{id:"hc-006",type:"essay",diff:"easy",sub:"HTML 基础",q:"HTML5 有哪些更新？",ans:`**面试回答：**HTML5 的更新可以从几类说：

1. **语义化标签**：header、nav、section、article、aside、footer 等；
2. **表单增强**：新增 input 类型（email、number、date、range 等）和属性（placeholder、required、pattern）；
3. **媒体标签**：audio、video，替代部分 Flash 场景；
4. **绘图能力**：canvas 2D 绘图、SVG 内联矢量图形；
5. **Web 存储**：localStorage、sessionStorage，以及离线应用 manifest；
6. **多线程与通信**：Web Worker、WebSocket、postMessage、BroadcastChannel 等；
7. **地理定位与设备 API**：Geolocation、拖放 API drag；
8. **新 API**：History API、requestAnimationFrame、IntersectionObserver 等。

总结来说 HTML5 让浏览器从“文档展示”走向了“应用平台”。`,ana:"答题框架：语义化标签 → 表单 → 媒体 → 绘图 → 存储 → 通信/线程 → 设备 API。能按类组织比罗列 API 更加分。",keys:["语义化标签","canvas/video","localStorage","Web Worker","WebSocket"],src:"从零开始的前端面试题.md / 收集的面试知识点.md"},{id:"hc-007",type:"judge",diff:"easy",sub:"HTML 基础",q:"img 标签的 srcset 属性可以根据不同的屏幕密度和视口宽度，让浏览器选择更合适的图片资源加载。",ans:!0,ana:'srcset 定义一组候选图片及其宽度/像素密度描述（如 `srcset="a-480w.jpg 480w, a-800w.jpg 800w"`），配合 sizes 描述插槽尺寸，浏览器会根据设备像素比（DPR）和视口宽度选择最合适的资源，避免在小屏上加载过大图片，是响应式图片的核心方案。',keys:["srcset","DPR","响应式图片"],src:"从零开始的前端面试题.md"},{id:"hc-008",type:"essay",diff:"easy",sub:"HTML 基础",q:"行内元素、块级元素分别有哪些？空（void）元素是什么？",ans:"**面试回答：**\n\n- **行内元素**：a、span、img、input、button、label、strong、em 等，默认不独占一行，宽高由内容决定（设置宽高无效，img/input 除外，它们是行内替换元素）；\n- **块级元素**：div、p、h1~h6、ul/ol/li、table、section、header 等，独占一行，可设置宽高；\n- **空（void）元素**：没有内容也没有闭合标签的元素，如 `<br>`、`<hr>`、`<img>`、`<input>`、`<link>`、`<meta>`。\n\n行内元素之间如果源码中存在换行或空格，会产生空白间隙，这也是常见考点。",ana:"img、input 属于“行内替换元素”，可以设置宽高，属于易错点。void 元素重点记 br、img、input、meta、link。",keys:["行内元素","块级元素","void 元素","替换元素"],src:"从零开始的前端面试题.md"},{id:"hc-009",type:"essay",diff:"medium",sub:"HTML5 能力",q:"谈一谈你对 Web Worker 的理解。",ans:`**面试回答：**JavaScript 是单线程的，复杂计算会阻塞主线程导致页面卡顿。Web Worker 让我们创建一个**独立于主线程的后台线程**去执行脚本，可以把大量计算交给它，完成后通过 \`postMessage\` 把结果传回主线程，避免阻塞 UI 交互。

使用要点和限制：

1. **同源限制**：worker 脚本文件必须与主线程同源；
2. **DOM 限制**：worker 线程无法操作 DOM、无法使用 window/document，本质是“不影响页面渲染安全”的设计；
3. **通信方式**：主线程与 worker 通过 \`postMessage\` / \`onmessage\` 传递消息，传对象会被结构化拷贝；
4. **典型场景**：大文件分片上传中计算文件 MD5 哈希、大量数据排序、复杂编解码计算。

我在项目里做文件分片上传时，就考虑用 Web Worker 计算大文件的哈希，避免阻塞主线程。`,ana:"结合项目场景（大文件 MD5 计算）回答会更加分。核心限制记三点：同源、无 DOM、消息通信。",keys:["多线程","postMessage","不能操作 DOM","文件哈希计算"],src:"从零开始的前端面试题.md / 知识点快速复习指南.md"},{id:"hc-010",type:"essay",diff:"medium",sub:"HTML5 能力",q:"iframe 有哪些优点和缺点？",ans:`**面试回答：**iframe 相当于在页面里嵌套了一个独立的浏览器上下文。

**优点**：
- 可以完整嵌入第三方页面（支付、广告、编辑器），与主页面样式和脚本天然隔离；
- 原型/沙箱场景便于隔离运行不受信任的代码；
- 并行加载，重构时不影响旧页面。

**缺点**：
- 会增加页面加载开销和内存占用，多个 iframe 更明显；
- **SEO 不友好**，搜索引擎对 iframe 内容的收录权重低；
- 容易产生**跨域问题**，父子页面通信受限（需 postMessage）；
- 阻塞父页面 onload 事件，移动端兼容与体验一般；
- 无法响应式自适应内容高度，需要额外处理。

现在除了第三方页面嵌入（如微前端隔离、支付 SDK），一般不会大规模使用 iframe。`,ana:"答题要点：本质是独立浏览器上下文 → 天然隔离是优点，也是加载开销和通信困难的根源。",keys:["独立上下文","SEO 不友好","跨域 postMessage","内存占用"],src:"面试问答.md / 从零开始的前端面试题.md"},{id:"hc-011",type:"essay",diff:"easy",sub:"HTML5 能力",q:"Canvas 和 SVG 有什么区别？",ans:`**面试回答：**

- **Canvas**：基于**像素**的位图绘制，通过 JS 脚本逐帧画图，不保留图形对象，放大缩放会失真；适合像素密集、大量图元的场景，比如游戏、数据可视化大屏、图片处理；
- **SVG**：基于**矢量**的 XML 描述，每个图形都是 DOM 节点，可以用 CSS 和 JS 操作，无损缩放，支持事件绑定；适合图标、图表、需要交互的图形。

性能上，图元数量非常大时 Canvas 更快（不维护 DOM）；需要频繁交互单个图形时 SVG 更方便。项目里封装 SVG 图标组件、用 ReactFlow 画工作流画布都是 SVG 方案。`,ana:"记忆：Canvas = 位图 + JS 绘制 + 适合大量图元；SVG = 矢量 + DOM 节点 + 适合交互与缩放。",keys:["位图 vs 矢量","DOM 节点","缩放失真","事件交互"],src:"从零开始的前端面试题.md / 收集的面试知识点.md"},{id:"hc-012",type:"judge",diff:"easy",sub:"HTML 基础",q:"head 标签中 title 是必不可少的，title 与 h1 的区别是 title 用于网页信息展示而 h1 用于文章内容标题。",ans:!0,ana:"head 里必须有 title（文档标题，显示在浏览器标签页、收藏夹、搜索结果中，一个页面只应有一个）。title 与 h1 区别：title 面向“整个文档/浏览器/搜索引擎”，h1 面向“页面内容的顶级标题”，一页可以有多个内容区块但一般只一个 h1。类似地 b 与 strong、i 与 em 的区别也是“视觉 vs 语义”：strong/em 带有强调语义，利于 SEO 和屏幕阅读器。",keys:["title 必需","title 面向文档","h1 面向内容","strong 语义化"],src:"从零开始的前端面试题.md"},{id:"hc-013",type:"essay",diff:"easy",sub:"CSS 基础",q:"说一下 CSS 选择器及其优先级。",ans:'**面试回答：**优先级从高到低是：\n\n1. `!important`（最高，慎用）；\n2. **内联样式** style 属性；\n3. **ID 选择器** `#id`；\n4. **类选择器、属性选择器、伪类** `.class`、`[type="text"]`、`:hover`；\n5. **标签选择器、伪元素** `div`、`::before`。\n\n优先级可以按 (id数, 类数, 标签数) 三元组比较。优先级相同时，**后出现的样式覆盖先出现的**。继承的属性没有优先级概念，通配符 \\* 的优先级为 0。',ana:"记忆口诀：important > 行内 > id > class/伪类/属性 > 标签/伪元素 > 通配符。",keys:["!important","内联样式","id 选择器","后覆盖前"],src:"面试问答.md / 从零开始的前端面试题.md"},{id:"hc-014",type:"essay",diff:"medium",sub:"CSS 基础",q:"CSS 中哪些属性可以继承？哪些不可以？",ans:`**面试回答：**

- **可继承**的主要是“文本相关”属性：color、font 系列（font-size、font-family、font-weight）、line-height、text-align、text-indent、letter-spacing、word-spacing、visibility、cursor 等；
- **不可继承**的主要是“盒模型与布局”属性：width、height、margin、padding、border、background、display、position、overflow、float、z-index 等。

继承的意义：文本样式继承符合直觉——给 body 设置字体颜色后所有文字默认跟随；而盒模型如果继承会破坏布局。开发中可用 \`inherit\` 强制继承，用 \`initial\` 重置为默认值。`,ana:"判断技巧：和“文字呈现”相关的多可继承，和“盒子占位”相关的不可继承。",keys:["文本属性可继承","盒模型不可继承","inherit/initial"],src:"从零开始的前端面试题.md"},{id:"hc-015",type:"essay",diff:"easy",sub:"CSS 基础",q:"隐藏元素的方法有哪些？display:none 与 visibility:hidden 有什么区别？",ans:"**面试回答：**常见隐藏方式：\n\n1. `display: none`：彻底移出渲染树，**不占空间**，触发回流+重绘，子元素也随之不可见且无法单独显示；\n2. `visibility: hidden`：**仍占空间**，只触发重绘，子元素可设置 `visibility: visible` 恢复显示；\n3. `opacity: 0`：透明度 0 仍占位，**仍可响应事件**，可用 transition 做过渡；\n4. `position` 移出视口 / `transform: scale(0)`；\n5. `clip-path` / `clip` 裁剪；\n6. `z-index: -1` 被覆盖（有局限）。\n\n核心区别总结：**display:none 不保留空间、会回流；visibility:hidden 保留空间、只重绘、可被子元素覆盖；opacity:0 保留空间且可交互。**",ana:"三者对比是高频题：空间占位、是否回流、子元素能否恢复、是否响应事件四个维度。",keys:["display:none","visibility:hidden","opacity:0","回流重绘"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"hc-016",type:"single",diff:"easy",sub:"CSS 基础",q:"关于 link 和 @import 引入 CSS 的区别，下列说法错误的是？",opts:["link 是 HTML 标签，@import 是 CSS 语法，只能写在样式文件或 style 中","@import 引入的样式会在页面加载完成后才加载，可能导致样式闪烁","link 引入的 CSS 与页面并行加载，且可以通过 JS 操作 DOM 改变 link","@import 的兼容性比 link 更好，性能也更高"],ans:"D",ana:"D 是错误说法。事实是：link 是 XHTML 标签，兼容性更好，与页面**并行加载**；@import 是 CSS 提供的规则，需要等页面加载完成后再加载引用的 CSS，可能导致 FOUC（无样式闪烁），且 @import 会被当作 CSS 内的串行请求，性能更差。link 还支持 RSS、可动态创建修改，@import 不支持。",keys:["link 并行加载","@import 串行","FOUC"],src:"从零开始的前端面试题.md"},{id:"hc-017",type:"essay",diff:"medium",sub:"CSS 基础",q:"说一下盒模型的理解。标准盒模型和怪异（IE）盒模型的区别是什么？如何切换？",ans:"**面试回答：**CSS 盒模型由内到外是：content（内容）→ padding（内边距）→ border（边框）→ margin（外边距）。\n\n- **标准盒模型**：`box-sizing: content-box`（默认），width/height 只包含 **content**，设置宽高后再加 padding 和 border 会让元素实际变大；\n- **怪异（IE）盒模型**：`box-sizing: border-box`，width/height 包含 **content + padding + border**，改 padding 不会撑大盒子。\n\n实际项目里通常全局设置 `* { box-sizing: border-box }`，让尺寸计算更直观。获取元素实际宽度可以用 `getBoundingClientRect()` 或 offsetWidth。",ana:"margin 不算在 width 计算内（无论哪种盒模型）。box-sizing 切换是必答点。",keys:["content-box","border-box","box-sizing"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"hc-018",type:"essay",diff:"medium",sub:"CSS 基础",q:"什么是 BFC？触发条件有哪些？常见使用场景是什么？",ans:`**面试回答：**BFC（Block Formatting Context）块级格式化上下文，是一块**独立的渲染区域**，内部元素的布局不会影响外部元素。

**常见触发条件**：
- 根元素 html；
- \`float\` 不为 none；
- \`position: absolute / fixed\`；
- \`display: inline-block / flex / grid / flow-root\`；
- \`overflow: hidden / auto / scroll\`（不为 visible）。

**常见使用场景**：
1. **清除浮动**：父元素高度塌陷时给父元素创建 BFC（overflow:hidden），让浮动子元素参与高度计算；
2. **防止 margin 塌陷/折叠**：父子元素或相邻块级元素的外边距会折叠，用 BFC 隔开；
3. **多栏布局**：一侧浮动一侧 BFC，实现自适应两栏，浮动元素不会覆盖 BFC 区域。

现代开发推荐 \`display: flow-root\`，语义就是“创建 BFC”且无副作用。`,ana:"BFC 三大应用：清浮动、防 margin 折叠、两栏自适应。可以补充 margin 折叠只发生在同一 BFC 的相邻块级盒子之间。",keys:["独立渲染区域","overflow:hidden","清除浮动","margin 折叠"],src:"一些高频率考点.md / 面试问答.md"},{id:"hc-019",type:"essay",diff:"easy",sub:"CSS 基础",q:"伪元素和伪类的区别是什么？",ans:"**面试回答：**\n\n- **伪类**用**单冒号** `:`，选择的是**处于特定状态的已有元素**，比如 `:hover`、`:focus`、`:first-child`、`:nth-child(n)`、`:not()`；\n- **伪元素**用**双冒号** `::`，创建的是**不在文档树中的虚拟元素**，比如 `::before`、`::after`、`::first-line`、`::placeholder`，可以像真实元素一样设置样式。\n\n单双冒号是为了区分二者：CSS2 时代伪类伪元素都用单冒号，CSS3 规范把伪元素改为双冒号（但 ::before/::after 保留单冒号写法的兼容）。伪元素常用于清除浮动（clearfix）、图标装饰、自定义内容。",ana:"一句话：伪类“筛选状态”，伪元素“创建节点”。",keys:["单冒号伪类","双冒号伪元素","hover/nth-child","before/after"],src:"从零开始的前端面试题.md"},{id:"hc-020",type:"essay",diff:"medium",sub:"CSS 基础",q:"transition 和 animation 有什么区别？为什么动画推荐用 transform 和 opacity？",ans:"**面试回答：**\n\n- **transition**：过渡动画，需要**触发条件**（状态变化，如 hover、class 切换），只有开始和结束两个状态，适合简单状态切换，不能自动循环；\n- **animation**：配合 `@keyframes` 定义多个关键帧，**不需要触发事件**即可播放，可控制循环次数、方向、暂停（animation-play-state），适合复杂动画。\n\n**为什么推荐 transform 和 opacity**：修改 width/height/top/left 等几何属性会触发 **Layout（回流）+ Paint（重绘）**，开销大；而 `transform` 和 `opacity` 变化通常只走 **Composite（合成）** 阶段，由合成线程/GPU 处理，**不触发布局和绘制**，性能最好。另外动画频繁的场景也可以用 requestAnimationFrame 代替 setTimeout 驱动。",ana:"渲染流水线：Layout → Paint → Composite。transform/opacity 能跳过前两步直接合成。",keys:["transition 触发式","keyframes 关键帧","合成层","GPU 加速"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"hc-021",type:"judge",diff:"medium",sub:"CSS 基础",q:"修改元素位置时，使用 transform: translate 通常比使用 position 的 top/left 性能更好，因为它不触发布局计算。",ans:!0,ana:"top/left 变化会触发 Layout（回流）→ Paint → Composite 完整流程；transform 位于合成器处理的属性，只触发 Composite，由 GPU 完成，性能更好。这就是“动画优先使用 transform 和 opacity”的原因。",keys:["transform 合成","top/left 回流","性能优化"],src:"从零开始的前端面试题.md"},{id:"hc-022",type:"essay",diff:"easy",sub:"CSS 基础",q:"CSS3 有哪些新特性？",ans:`**面试回答：**CSS3 新特性可以按模块说：

1. **选择器**：属性选择器增强、\`:nth-child()\`、\`:not()\` 等结构伪类；
2. **盒模型与布局**：border-radius、box-shadow、box-sizing；
3. **背景与边框**：多背景、background-size、border-image、渐变 linear-gradient/radial-gradient；
4. **文本效果**：text-shadow、word-wrap、@font-face 自定义字体；
5. **2D/3D 变换**：transform（translate/rotate/scale/skew）、transform-origin；
6. **过渡与动画**：transition、animation + @keyframes；
7. **新布局**：Flex 弹性布局、Grid 网格布局、多栏布局 columns；
8. **媒体查询**：@media 响应式设计基础；
9. **颜色与透明度**：rgba/hsla、opacity。

回答时挑 5~6 类说清楚即可，重点是 Flex/Grid、媒体查询、transform/transition/animation。`,ana:"分类记忆：选择器、盒模型视觉、变换动画、新布局、媒体查询。",keys:["Flex/Grid","媒体查询","transform/transition","border-radius"],src:"从零开始的前端面试题.md / 收集的面试知识点.md"},{id:"hc-023",type:"essay",diff:"medium",sub:"CSS 基础",q:"单行和多行文本溢出省略怎么实现？",ans:`**面试回答：**

**单行溢出**：

\`\`\`css
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
\`\`\`

**多行溢出**（Webkit 内核方案，兼容性最好）：

\`\`\`css
.line-clamp {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 行数 */
  overflow: hidden;
}
\`\`\`

也可以用 \`::after\` 绝对定位放省略号的兼容写法，或标准属性 \`line-clamp\`（较新）。注意多行方案要求容器高度由行高决定。`,ana:"单行三件套：overflow + text-overflow + white-space；多行：-webkit-box + line-clamp。",keys:["text-overflow: ellipsis","-webkit-line-clamp","white-space: nowrap"],src:"从零开始的前端面试题.md"},{id:"hc-024",type:"single",diff:"medium",sub:"CSS 基础",q:"以下哪个属性变化通常只触发重绘（Repaint）而不触发回流（Reflow）？",opts:["width","font-size","background-color","top"],ans:"C",ana:"修改元素的**外观**（color、background-color、visibility、outline、box-shadow 等）不影响几何布局，只触发重绘；而 width、font-size、top、border 等几何相关属性变化会引起回流，且回流必然伴随重绘。回流开销显著大于重绘。",keys:["重绘只改外观","回流改几何","回流必重绘"],src:"从零开始的前端面试题.md"},{id:"hc-025",type:"essay",diff:"easy",sub:"CSS 基础",q:"position 有哪些取值？各自相对什么定位？",ans:"**面试回答：**\n\n1. `static`：默认值，元素在正常文档流中，top/left 等偏移无效；\n2. `relative`：相对**自身原位置**偏移，**不脱离文档流**，原位置仍保留，常作为 absolute 子元素的定位参照；\n3. `absolute`：相对**最近的非 static 祖先元素**定位，脱离文档流；\n4. `fixed`：相对**浏览器视口**定位，脱离文档流，滚动不跟随（父级设置 transform/filter 会使其相对该父级定位，是常见坑）；\n5. `sticky`：粘性定位，结合 relative 和 fixed——在阈值内按 relative，达到阈值后固定（需要 top 等阈值才有意义）。",ana:"补充坑点：absolute 参照的是最近的 position 非 static 的祖先；fixed 元素祖先有 transform 时 fixed 会失效（相对 transform 祖先）。",keys:["relative 不脱流","absolute 最近定位祖先","fixed 视口","sticky 阈值"],src:"面试问答.md"},{id:"hc-026",type:"essay",diff:"easy",sub:"布局与适配",q:"px、em、rem、vw/vh 有什么区别？移动端适配一般怎么做？",ans:`**面试回答：**

- **px**：绝对像素单位，固定大小；
- **em**：相对**父元素（或自身）字体大小**，嵌套时会叠加计算，适合组件内间距；
- **rem**：相对**根元素 html 的 font-size**，全局统一缩放，是移动端等比缩放的主力；
- **vw/vh**：相对**视口**宽高的 1%，随窗口变化。

**移动端适配常见方案**：
1. **rem 方案**：通过 postcss-pxtorem 把 px 自动转 rem，JS 或 CSS 动态设置根字号，实现不同屏宽等比缩放；
2. **vw 方案**：直接用 vw 描述尺寸，1vw = 视口宽度 1%，无需 JS；
3. **媒体查询 + 弹性布局**：用 flex/grid 做自适应布局，媒体查询控制断点样式；
4. 实际项目通常组合使用：布局用 flex/grid，尺寸用 rem/vw，断点用媒体查询，大屏看板也可用固定设计稿尺寸 + transform: scale 方案。`,ana:"高频追问：flexible 原理（根字号 = 屏宽/10）、postcss-pxtorem 编译期转换、vw 无需 JS。",keys:["rem 根字号","vw 视口","postcss-pxtorem","媒体查询断点"],src:"面试问答.md / 一些高频率考点.md / 问答类型面试题.md"},{id:"hc-027",type:"essay",diff:"easy",sub:"布局与适配",q:"两栏布局（左固定右自适应）怎么实现？",ans:`**面试回答：**常见四种方案：

\`\`\`css
/* 1. Flex（首选） */
.container { display: flex; }
.left { width: 200px; }
.right { flex: 1; }

/* 2. Grid */
.container { display: grid; grid-template-columns: 200px 1fr; }

/* 3. float + BFC */
.left { float: left; width: 200px; }
.right { overflow: hidden; } /* 创建 BFC，不与浮动元素重叠 */

/* 4. float + margin */
.left { float: left; width: 200px; }
.right { margin-left: 200px; }
\`\`\`

面试优先说 Flex/Grid，再补充 float+BFC 方案体现理解深度。右侧 \`flex: 1\` 表示 flex-grow:1、flex-shrink:1、flex-basis:0%，占满剩余空间。`,ana:"若右栏内容溢出导致 flex:1 失效，通常是 min-width:auto 问题，加 min-width: 0 可解。",keys:["flex: 1","grid-template-columns","float + BFC"],src:"从零开始的前端面试题.md / 知识点快速复习指南.md"},{id:"hc-028",type:"essay",diff:"medium",sub:"布局与适配",q:"水平垂直居中一个元素，你能说出多少种方案？",ans:`**面试回答：**

\`\`\`css
/* 1. Flex（首选） */
.parent { display: flex; justify-content: center; align-items: center; }

/* 2. Grid */
.parent { display: grid; place-items: center; }

/* 3. absolute + transform（子元素宽高未知） */
.child {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
}

/* 4. absolute + margin:auto（子元素需有宽高） */
.child {
  position: absolute;
  inset: 0;
  margin: auto;
}

/* 5. absolute + 负 margin（宽高已知） */

/* 6. 单行文本: line-height = height + text-align: center */

/* 7. table-cell */
.parent { display: table-cell; vertical-align: middle; text-align: center; }
\`\`\`

回答时先说 Flex/place-items 两个现代方案，再补充 absolute + transform 体现基础。`,ana:"inset: 0 是 top/right/bottom/left: 0 的简写。",keys:["flex 居中","place-items","translate(-50%,-50%)"],src:"从零开始的前端面试题.md / 收集的面试知识点.md"},{id:"hc-029",type:"essay",diff:"medium",sub:"布局与适配",q:"说一下你对 Flex 布局的理解，flex: 1 具体表示什么？",ans:"**面试回答：**Flex 是弹性布局，通过容器上的 `display: flex` 让子元素沿主轴排列，能方便实现水平/垂直居中、等分空间、自适应两栏等布局。\n\n**容器属性**：flex-direction（主轴方向）、justify-content（主轴对齐）、align-items（交叉轴对齐）、flex-wrap（换行）、gap；\n**项目属性**：flex、align-self、order。\n\n`flex: 1` 是 `flex-grow: 1; flex-shrink: 1; flex-basis: 0%` 的缩写：\n- **flex-grow: 1**：有剩余空间时放大占满；\n- **flex-shrink: 1**：空间不足时允许收缩；\n- **flex-basis: 0%**：不按内容分配基准，按剩余空间比例分配。\n\n**flex: 1 失效常见原因**：父元素没有可分配空间、子元素 `min-width: auto` 导致无法收缩（加 `min-width: 0`）、固定宽度或内容溢出。",ana:"flex: auto（basis 为 auto，按内容分配）与 flex: 1（basis 为 0，等分）的区别是进阶追问点。",keys:["flex-grow/shrink/basis","min-width: auto","主轴与交叉轴"],src:"面试问答.md / 从零开始的前端面试题.md / 知识点快速复习指南.md"},{id:"hc-030",type:"single",diff:"medium",sub:"布局与适配",q:"父元素 display:flex，子元素内容过长导致无法收缩、把容器撑开，最直接的解决方式是什么？",opts:["给子元素设置 min-width: 0","给子元素设置 flex-grow: 0","给父元素设置 overflow: visible","给子元素设置 width: 100%"],ans:"A",ana:"flex 子项的默认 min-width 是 auto，即不允许收缩到比内容最小宽度更小，长文本/长列表会把子项撑开导致 flex:1 失效。设置 min-width: 0（或 overflow: hidden）允许子项收缩，配合 text-overflow: ellipsis 实现省略。",keys:["min-width: auto","flex 收缩限制","ellipsis"],src:"知识点快速复习指南.md"},{id:"hc-031",type:"essay",diff:"medium",sub:"布局与适配",q:"什么是高度塌陷？有哪些解决方案？",ans:'**面试回答：**当父元素没有设置高度、内部子元素全部浮动时，浮动元素脱离文档流，父元素无法感知子元素高度，高度变成 0，这就是高度塌陷。\n\n**解决方案**：\n1. 给父元素**创建 BFC**：`overflow: hidden` 或 `display: flow-root`（推荐，无副作用）；\n2. 最后加一个空元素设置 `clear: both`（需要多余标签，不推荐）；\n3. **伪元素 clearfix**：`.clearfix::after { content: ""; display: block; clear: both; }`；\n4. 现代开发直接用 **flex/grid 布局**替代 float，从根源避免。\n\n现在实际项目里 float 布局已经比较少，更多用 flex。',ana:"答题顺序：现象 → 原因（浮动脱流）→ 方案（BFC/clear/伪元素/flex）。",keys:["浮动脱流","overflow: hidden","clearfix 伪元素","flow-root"],src:"面试问答.md"},{id:"hc-032",type:"essay",diff:"medium",sub:"布局与适配",q:"外层大盒子包含小盒子，小盒子设置 margin-top: 10px 会呈现什么效果？为什么？怎么解决？",ans:"**面试回答：**会呈现**外边距折叠（margin 塌陷）**：小盒子的 margin-top 会“穿透”父元素，表现为**父元素整体下移 10px**，而小盒子在父元素内部的位置不变。\n\n**原因**：父子块级元素在垂直方向上相邻接触（且中间没有 border、padding、inline 内容隔开）时，上外边距会发生合并，取较大值，父元素与子元素共享同一个 margin-top。\n\n**解决方案**（任选其一，制造隔离）：\n1. 父元素创建 BFC：`overflow: hidden` 或 `display: flow-root`；\n2. 父元素加 `padding-top` 或 `border-top` 隔开边界；\n3. 子元素不用 margin，改用 `padding` 或父元素用 `display: flex`（flex 容器内不存在 margin 折叠）。",ana:"同类问题：相邻兄弟元素 margin 也会折叠（取较大值）。flex/grid 容器内的子项不会折叠。",keys:["外边距折叠","BFC 隔离","flow-root"],src:"问答类型面试题.md / 知识点快速复习指南.md"},{id:"hc-033",type:"judge",diff:"easy",sub:"布局与适配",q:"响应式设计的基本原理是通过媒体查询检测不同设备屏幕尺寸，配合弹性布局和相对单位设置页面样式。",ans:!0,ana:"响应式 = 媒体查询（断点）+ 弹性布局（flex/grid）+ 相对单位（rem/vw/百分比）+ max-width/min-width 边界控制。与“自适应”强调等比缩放略有差异，响应式会根据断点呈现不同布局。",keys:["媒体查询","断点","弹性布局"],src:"从零开始的前端面试题.md"},{id:"hc-034",type:"essay",diff:"easy",sub:"CSS 工程化",q:"CSS 预处理器和后处理器是什么？为什么要使用它们？",ans:`**面试回答：**

- **预处理器**：在 CSS 之上扩展编程能力，提供变量、嵌套、混合（mixin）、函数、模块化等，编译后输出原生 CSS。代表：**Sass/Scss、Less、Stylus**；
- **后处理器**：对编译产物再做处理，典型代表 **PostCSS** 及插件体系，如 autoprefixer 自动加浏览器前缀、postcss-pxtorem 做 px→rem 移动端适配、cssnano 压缩。

**为什么要用**：原生 CSS 缺少变量与复用机制，大量重复代码难维护；预处理器提升开发效率和可维护性；后处理器解决兼容性与目标环境适配，把“人写的意图”与“浏览器需要的产物”解耦。这属于 CSS 工程化的一部分。`,ana:"可补一句：现代项目里 CSS 变量（custom properties）也承担了部分预处理器变量的作用，且是运行时的。",keys:["Sass/Less","PostCSS","autoprefixer","pxtorem"],src:"从零开始的前端面试题.md"},{id:"hc-035",type:"essay",diff:"medium",sub:"CSS 基础",q:"li 与 li 之间有看不见的空白间隔是什么原因引起的？如何解决？",ans:`**面试回答：**行内元素（或 inline-block）标签之间，如果 HTML 源码中存在**换行、空格、制表符**，会被渲染为一个空格字符，产生约 4~8px 的空白间隙。

**解决方案**：
1. 父元素设置 \`font-size: 0\`，子元素单独设置字体大小；
2. 删除 HTML 中的换行/空格（标签紧挨书写，可读性差）；
3. 使用 HTML 注释 \`<!-- -->\` 占据空白位置；
4. **父元素设置 display: flex**，flex 子项之间不会产生空白字符问题（现代首选）；
5. 设置负 margin（不推荐，脆弱）。`,ana:"本质考点：HTML 空白符在行内格式化上下文中被渲染为空格。",keys:["空白字符","font-size: 0","flex 布局"],src:"从零开始的前端面试题.md"}],ba=[{id:"js-001",type:"single",diff:"easy",sub:"数据类型",q:"JavaScript 中以下哪个属于基本（原始）数据类型？",opts:["Object","Array","Symbol","Function"],ans:"C",ana:'JS 基本数据类型有 7 种：**Undefined、Null、Boolean、Number、String、Symbol（ES6 新增）、BigInt（ES2020 新增）**。Object 是引用类型，Array、Function、Date、RegExp 等都属于 Object 的子类型。可用 typeof 检测：基本类型中除 null 外都能正确返回；函数返回 "function"，其余对象返回 "object"。',keys:["7 种基本类型","Symbol/BigInt","引用类型"],src:"从零开始的前端面试题.md"},{id:"js-002",type:"essay",diff:"easy",sub:"数据类型",q:"JavaScript 有哪些数据类型？它们的区别是什么？",ans:`**面试回答：**分为两大类：

- **基本类型（7 种）**：Undefined、Null、Boolean、Number、String、Symbol、BigInt。存储在**栈**中，按**值**访问，赋值时是值的拷贝；
- **引用类型**：Object（包括 Array、Function、Date、RegExp、Map、Set 等）。存储在**堆**中，变量保存的是**引用地址**，赋值时拷贝的是地址，两个变量会指向同一个对象。

区别的本质是：基本类型的值不可变且比较按值；引用类型可变、比较按引用地址。`,ana:'可追问 typeof null === "object"（历史遗留 bug，Java 式值类型标记），判断数组用 Array.isArray。',keys:["栈与堆","值访问 vs 引用访问","Symbol/BigInt"],src:"从零开始的前端面试题.md"},{id:"js-003",type:"essay",diff:"medium",sub:"数据类型",q:"数据类型检测的方式有哪些？各自的特点和局限是什么？",ans:`**面试回答：**

1. **typeof**：返回类型字符串。能区分基本类型（除 null 外）和 function；但 \`typeof null === "object"\`（历史 bug），对象和数组都返回 "object"；
2. **instanceof**：检测对象是否是某构造函数的实例，基于**原型链**查找。能区分数组、日期等对象类型，但**无法检测基本类型**，且跨 iframe 等多全局环境会失准；
3. **Object.prototype.toString.call()**：最通用准确，返回 \`[object Array]\`、\`[object Null]\` 等，基本类型和内置对象都能正确检测；
4. **Array.isArray()**：判断数组的专用可靠方法；
5. **constructor**：可判断构造函数来源，但 null/undefined 没有 constructor，且构造函数被改写后会失准。

面试一般按“typeof → instanceof → toString.call”的演进顺序回答。`,ana:"instanceof 手写实现是高频追问：沿 Object.getPrototypeOf 向上查找是否等于构造函数的 prototype。",keys:["typeof null 是 object","原型链检测","toString.call"],src:"从零开始的前端面试题.md / 收集的面试知识点.md"},{id:"js-004",type:"essay",diff:"medium",sub:"数据类型",q:"null 和 undefined 有什么区别？为什么 0.1 + 0.2 !== 0.3？",ans:'**面试回答：**\n\n**null 与 undefined**：\n- `undefined` 表示“**未定义**”：变量声明未赋值、函数无返回值、对象不存在的属性、函数参数未传，都是 undefined；\n- `null` 表示“**空值**”，是一个有意的空对象引用，常用于主动清空引用（如释放对象）、DOM 查询不到时返回 null；\n- `null == undefined` 为 true（宽松相等特殊规则），`null === undefined` 为 false；typeof null 是 "object"（历史遗留），typeof undefined 是 "undefined"。\n\n**0.1 + 0.2 !== 0.3**：JS 的 Number 采用 **IEEE 754 双精度浮点数（64 位）**存储，二进制无法精确表示 0.1 和 0.2 这样的十进制小数，相加产生精度误差。解决方式：\n- `(0.1 + 0.2).toFixed(2)`（注意 toFixed 返回字符串）；\n- `Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON`；\n- 需要精确计算用整数字化（乘以 10^n）或 decimal.js 这类库。',ana:"两个经典题合并作答。EPSILON 是 Number 的最小精度，用于浮点比较。",keys:["未定义 vs 空值","IEEE 754","Number.EPSILON"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"js-005",type:"judge",diff:"easy",sub:"数据类型",q:'typeof NaN 的结果是 "number"，且 NaN 与任何值（包括自身）都不相等。',ans:!0,ana:'NaN 全称 Not a Number 但类型是 number；NaN === NaN 为 false，这是 IEEE 754 规范定义。判断 NaN 要用 **Number.isNaN()**（只对真正的 NaN 返回 true），而全局 isNaN() 会先做隐式转换（如 isNaN("abc") 为 true），两者区别是高频考点。',keys:["typeof NaN","Number.isNaN","isNaN 隐式转换"],src:"从零开始的前端面试题.md"},{id:"js-006",type:"essay",diff:"medium",sub:"数据类型",q:"Object.is() 与 ==、=== 的区别是什么？",ans:'**面试回答：**\n\n- `==`：宽松相等，比较前会进行**隐式类型转换**，如 `"1" == 1` 为 true，规则复杂易出错，开发中不推荐；\n- `===`：严格相等，类型不同直接 false；但有两个特例：`NaN === NaN` 为 false、`+0 === -0` 为 true；\n- `Object.is()`：在 === 基础上修正了两个特例：`Object.is(NaN, NaN)` 为 **true**、`Object.is(+0, -0)` 为 **false**，行为更符合“同值相等”的直觉。\n\nReact 里对比依赖数组的 Object.is 语义、Vue3 响应式中判断值是否变化都用到了类似逻辑。',ana:"记忆：Object.is 修了 === 的两个边界：NaN 相等、±0 不等。",keys:["隐式转换","NaN 不等于自身","+0 与 -0"],src:"从零开始的前端面试题.md"},{id:"js-007",type:"essay",diff:"medium",sub:"数据类型",q:"Object.assign 和扩展运算符是深拷贝还是浅拷贝？两者的区别是什么？深拷贝怎么做？",ans:"**面试回答：**两者都是**浅拷贝**：只复制对象第一层的属性值，如果属性值是引用类型，复制的是引用地址，嵌套对象仍然共享。\n\n**区别**：\n- `Object.assign(target, ...sources)` 会把源对象属性合并到 target 上，**target 本身被修改**并返回；\n- 扩展运算符 `{ ...obj }` 创建**新对象**返回，不修改原对象；后者语法更简洁，还能拷贝 Symbol 属性（两者都能拷贝可枚举属性）。\n\n**深拷贝方案**：\n1. `JSON.parse(JSON.stringify(obj))`：简单但有明显缺陷——丢失 **undefined、函数、Symbol**；`Date` 变字符串；**循环引用直接报错**；NaN/Infinity 变 null；丢失原型；\n2. `structuredClone(obj)`：浏览器原生，支持循环引用和大部分内置类型，但**不能拷贝函数**；\n3. **递归实现**：根据数据类型选择拷贝策略，用 **WeakMap 记录已访问对象**解决循环引用，这是面试推荐的手写方案；\n4. 生产可用 lodash 的 `cloneDeep`。",ana:"答出 JSON 方案的缺陷清单 + WeakMap 解决循环引用的思路，基本满分。",keys:["浅拷贝","JSON.stringify 缺陷","WeakMap 循环引用","structuredClone"],src:"从零开始的前端面试题.md / 知识点快速复习指南.md / 面试问答.md"},{id:"js-008",type:"essay",diff:"easy",sub:"数据类型",q:"数组去重有哪些方法？如何判断数组方法会不会改变原数组？",ans:`**面试回答：**

**去重**：
1. \`[...new Set(arr)]\`：最简洁，适合基本类型数组；
2. \`Array.from(new Set(arr))\`：等价写法；
3. \`filter + indexOf\`：\`arr.filter((item, i) => arr.indexOf(item) === i)\`；
4. 对象数组按字段去重：用 **Map** 以业务字段为 key 记录。

**会改变原数组的方法（7 个）**：push、pop、shift、unshift、splice、sort、reverse（以及 ES6 的 copyWithin、fill）；
**不改变原数组**：slice、concat、map、filter、forEach、find、findIndex、some、every、join、flat、includes 等。

记忆点：sort 默认按**字符串 Unicode 码位**排序，数字排序要传比较器 \`(a, b) => a - b\`。`,ana:"“哪些方法改变原数组”是 docs 中专门整理的高频题，7 个改变原数组的方法要记牢。",keys:["new Set","splice 改变原数组","sort 比较器"],src:"知识点快速复习指南.md / 问答类型面试题.md"},{id:"js-009",type:"essay",diff:"easy",sub:"ES6",q:"let、const、var 的区别是什么？",ans:`**面试回答：**主要区别在四点：

1. **作用域**：var 只有函数作用域；let/const 有**块级作用域**（{} 内有效）；
2. **变量提升**：var 声明会提升并初始化为 undefined；let/const 也会提升创建，但**不会初始化**，声明前访问进入**暂时性死区（TDZ）**，直接报 ReferenceError；
3. **重复声明**：var 可以重复声明，let/const 同一作用域不允许；
4. **const**：声明时必须初始化，且**引用不可重新赋值**——但对象/数组**内容仍可修改**（如 const obj 的属性），真正不可变要用 Object.freeze（浅冻结）。

另外 var 在全局声明会挂到 window 上，let/const 不会。`,ana:"const 对象属性可以修改是易错点：const 约束的是“绑定引用”而非“值”。",keys:["块级作用域","暂时性死区","const 引用不可变"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"js-010",type:"essay",diff:"easy",sub:"ES6",q:"箭头函数与普通函数的区别有哪些？",ans:`**面试回答：**

1. **this**：箭头函数**没有自己的 this**，捕获**定义时外层作用域**的 this 且不可改变（call/apply/bind 无法修改）；
2. **不能作为构造函数**：没有 [[Construct]] 内部方法和 **prototype** 属性，\`new\` 调用直接报错；
3. **没有 arguments**：可用 rest 参数 \`(...args)\` 替代；
4. **不能用作 Generator**：没有 yield 能力；
5. **语法差异**：单表达式可省略 return，永远匿名。

**适用**：需要继承外层 this 的回调（如 setTimeout、数组方法）；
**不适用**：对象方法（this 指向会丢失）、原型方法、需要动态 this 的 DOM 事件处理（需要事件.currentTarget 时）。`,ana:"“new 一个箭头函数会怎样”——报错，因为箭头函数没有 prototype 和内部 [[Construct]]。",keys:["词法 this","无 prototype","不能 new","rest 参数"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"js-011",type:"single",diff:"medium",sub:"ES6",q:"```js\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 1000);\n}\n```\n输出结果是什么？",opts:["1 2 3（间隔 1 秒依次输出）","3 3 3（约 1 秒后输出三个 3）","1 2 3（立即输出）","3 3 3（立即输出）"],ans:"B",ana:"var 声明的 i 是全局作用域内的同一个变量，循环结束后 i 为 3，三个回调共享它。setTimeout 的回调是宏任务，约 1 秒后依次入队执行，输出 3 3 3。把 var 换成 **let**（每次迭代创建新的块级绑定）即可输出 0 1 2；也可以用 IIFE 传参捕获。",keys:["var 共享绑定","let 块级作用域","宏任务时机"],src:"从零开始的前端面试题.md / 一些高频率考点.md"},{id:"js-012",type:"essay",diff:"easy",sub:"ES6",q:"ES6 模块与 CommonJS 模块有什么异同？",ans:`**面试回答：**主要区别：

1. **加载时机**：CommonJS 是运行时**动态加载**（require 是普通函数调用）；ES6 模块是**编译时确定依赖关系**的静态结构，import/export 必须在顶层；
2. **输出方式**：CommonJS 输出的是**值的拷贝**（模块加载后内部变化不影响外部已获取的值）；ES6 输出的是**值的引用**（动态只读绑定，内部变化会反映到导入方）；
3. **this 指向**：CommonJS 顶层 this 指向当前模块；ES6 模块顶层 this 是 undefined；
4. **其他**：CommonJS 同步加载，主要用于 Node；ES6 支持按需编译、Tree Shaking（静态分析剔除未使用代码）、异步加载 import()。

Tree Shaking 依赖 ES6 模块的静态性，这也是工程化面试的衔接点。`,ana:"值拷贝 vs 值引用 + 静态 vs 动态是核心，Tree Shaking 是常见延伸。",keys:["静态 vs 动态","值引用","Tree Shaking"],src:"从零开始的前端面试题.md / 前端面试八股文.md"},{id:"js-013",type:"essay",diff:"easy",sub:"ES6",q:"扩展运算符和解构赋值分别有什么作用？使用场景举例。",ans:'**面试回答：**\n\n**扩展运算符（...）**：\n- 数组/对象展开合并：`[...arr1, ...arr2]`、`{ ...defaults, ...options }`（常用于对象浅拷贝与默认值合并）；\n- 函数调用展开：`Math.max(...nums)`；\n- rest 参数收集：`function fn(a, ...rest)`；\n- 可迭代对象转数组，如 `[...document.querySelectorAll("div")]`。\n\n**解构赋值**：\n- 数组解构按位置、对象解构按属性名，可设置默认值 `const { name = "anon" } = user`；\n- 重命名 `const { name: userName } = user`；\n- **嵌套解构**提取深层数据：`const { data: { list } } = res`；\n- 交换变量、函数多返回值、函数参数默认值解构。\n\nReact 函数组件 `const { value, onChange } = props`、Redux 的 `...state` 不可变更新都是典型场景。',ana:"扩展运算符是浅拷贝——嵌套对象仍然共享引用，这点容易被追问。",keys:["浅拷贝合并","rest 参数","嵌套解构"],src:"从零开始的前端面试题.md"},{id:"js-014",type:"essay",diff:"medium",sub:"原型与原型链",q:"谈谈你对原型和原型链的理解。",ans:"**面试回答：**JavaScript 是基于**原型继承**的语言。\n\n- 每个函数都有一个 `prototype`（显式原型）属性，指向一个对象，**作为该构造函数创建的实例的原型**；\n- 每个对象都有一个 `__proto__`（隐式原型，规范访问方式是 `Object.getPrototypeOf`），指向**创建它的构造函数的 prototype**；\n- 访问对象属性时，先找**自身属性**，找不到就沿 `__proto__` 向上查找，直到 `Object.prototype`，再往上就是 **null**，查找结束——这条链就是**原型链**。\n\n**作用**：实现属性和方法的继承与共享，所有实例共享原型上的方法（节省内存）。instanceof 的原理就是检查构造函数的 prototype 是否出现在对象的原型链上。\n\n需要注意直接修改 `obj.__proto__` 性能差，推荐 `Object.create(proto)` 或 class 语法。",ana:"画图答题：fn.prototype ← __proto__ — obj；链终点 Object.prototype.__proto__ === null。",keys:["prototype/__proto__","属性查找","Object.prototype","instanceof 原理"],src:"面试问答.md / 从零开始的前端面试题.md"},{id:"js-015",type:"essay",diff:"medium",sub:"闭包",q:"什么是闭包？有什么作用和使用场景？闭包有什么问题？",ans:`**面试回答：**闭包是指**函数能够访问其定义时所在作用域中的变量**，即使这个函数在该作用域之外执行——外部函数执行结束后，其作用域内的变量因为被内层函数引用而不会被销毁。

**常见用途**：
1. **数据封装 / 私有变量**：通过闭包保存计数状态，避免变量被外部直接修改；
2. **函数工厂**：根据参数生成定制函数；
3. **防抖、节流**：定时器变量保存在闭包中；
4. 柯里化、模块化（IIFE + 闭包）。

**需要注意的问题**：闭包会**长期持有变量引用**，如果使用不当（如事件监听未解绑、被闭包引用的大对象不释放），会**阻止垃圾回收导致内存泄漏**。因此不再需要的闭包应及时解除引用（置为 null、清除定时器、解绑监听）。

**面试回答版本（简短）**：闭包是指一个函数能够访问其定义时所在作用域中的变量，即使这个函数在该作用域之外执行。常见用途包括数据封装、函数工厂、防抖节流等。需要注意的是闭包会让变量常驻内存，使用不当可能造成内存泄漏。`,ana:"垃圾回收角度：引用计数/标记清除中，被闭包引用的对象标记为可达而无法回收。",keys:["作用域引用","私有变量","内存泄漏","防抖节流"],src:"一些高频率考点.md / 收集的面试知识点.md / 知识点快速复习指南.md"},{id:"js-016",type:"code",diff:"medium",sub:"闭包",q:"写一个创建计数器的函数：调用 createCounter() 返回一个函数，每次调用返回的函数时计数 +1 并打印当前计数，外部无法直接修改计数。",ans:`\`\`\`js
function createCounter() {
  let count = 0 // 私有变量，只能通过返回的函数访问
  return function () {
    count += 1
    console.log(count)
    return count
  }
}

const counter = createCounter()
counter() // 1
counter() // 2
counter() // 3
// 外部无法访问 count，实现了数据封装
\`\`\`

**要点**：\`count\` 是闭包引用的外层变量，外部没有其他途径修改它；每次调用 \`createCounter()\` 会产生**独立的**计数器（各自的闭包作用域）。`,ana:"考察闭包的最典型应用：私有状态。追问点：多个计数器之间是否共享状态（不共享）。",keys:["闭包私有变量","独立作用域","数据封装"],src:"一些高频率考点.md"},{id:"js-017",type:"essay",diff:"medium",sub:"this",q:"JavaScript 中 this 的指向有哪些规则？",ans:"**面试回答：**按优先级从高到低：\n\n1. **new 绑定**：指向新创建的实例对象；\n2. **显式绑定**：`call` / `apply` / `bind` 指定的第一个参数（硬绑定）；\n3. **隐式绑定**：**谁调用指向谁**，如 `obj.fn()` 中 this 是 obj；\n4. **默认绑定**：独立函数调用，非严格模式指向 window，严格模式是 undefined；\n5. **箭头函数**：**不适用以上规则**，没有自己的 this，继承**定义时外层作用域**的 this，且无法被 call/apply/bind 修改。\n\n**易错点**：把对象方法赋值给变量再调用会丢失 this；定时器回调中的 this 默认是 window（箭头函数除外）；class 内部自动开启严格模式。",ana:"优先级：new > 显式 > 隐式 > 默认；箭头函数是“定义时决定”，普通函数是“调用时决定”。",keys:["默认/隐式/显式/new 绑定","箭头函数词法 this"],src:"面试问答.md / 收集的面试知识点.md"},{id:"js-018",type:"essay",diff:"easy",sub:"this",q:"call、apply、bind 的区别是什么？",ans:`**面试回答：**三者本质都是**改变函数的 this 指向**：

- **call(thisArg, arg1, arg2...)**：立即执行，参数**逐个**传递；
- **apply(thisArg, [argsArray])**：立即执行，参数以**数组**形式传递（适合参数不确定的场景，如 Math.max.apply(null, arr)）；
- **bind(thisArg, ...)**：**不立即执行**，返回一个**永久绑定 this**（还可以预设参数，即偏函数）的新函数，适合回调、事件处理中固定 this。

bind 返回的新函数被 new 调用时，绑定的 this 会失效，指向新实例（new 优先级更高）。`,ana:"手写 call/bind 是代码题高频：借 symbol 临时属性挂到 thisArg 上执行。",keys:["call 逐个传参","apply 数组传参","bind 返回新函数"],src:"面试问答.md / 从零开始的前端面试题.md"},{id:"js-019",type:"code",diff:"medium",sub:"this",q:"手写实现 Function.prototype.call（不使用原生 call/apply/bind）。",ans:`\`\`\`js
Function.prototype.myCall = function (context, ...args) {
  // 处理 null/undefined 时指向全局，基本类型包装为对象
  context = context == null ? globalThis : Object(context)
  // 用 Symbol 保证 key 唯一，避免覆盖已有属性
  const fnKey = Symbol('fn')
  context[fnKey] = this // this 是调用 myCall 的函数
  const result = context[fnKey](...args)
  delete context[fnKey] // 清理临时属性
  return result
}

// 测试
function introduce(greeting) {
  return \`\${greeting}, 我是 \${this.name}\`
}
console.log(introduce.myCall({ name: '王涵' }, '你好')) // 你好, 我是 王涵
\`\`\`

**实现思路**：把函数临时挂到目标对象上调用（利用隐式绑定），执行后删除临时属性。apply 同理，只是参数直接展开数组；bind 则返回一个闭包包装的函数并保留原型的传递。`,ana:"核心是“隐式绑定 this”技巧 + Symbol 防 key 冲突。bind 的手写还要处理 new 调用与参数预置。",keys:["隐式绑定","Symbol 临时属性","context 包装"],src:"从零开始的前端面试题.md"},{id:"js-020",type:"essay",diff:"medium",sub:"原型与原型链",q:"new 操作符的实现原理是什么？",ans:`**面试回答：**\`new Fn(...)\` 的过程分四步：

1. **创建空对象**；
2. 把空对象的 \`__proto__\` 指向构造函数的 \`prototype\`，建立原型连接；
3. **执行构造函数**，把函数内部的 this 绑定为这个新对象，为实例添加属性；
4. **返回结果**：如果构造函数**显式返回了一个对象**，则返回该对象（覆盖默认返回）；否则返回新创建的对象。

手写实现：

\`\`\`js
function myNew(Fn, ...args) {
  const obj = Object.create(Fn.prototype) // 步骤 1+2
  const result = Fn.apply(obj, args) // 步骤 3
  return result instanceof Object ? result : obj // 步骤 4
}
\`\`\``,ana:"Object.create 一步完成“创建对象+连接原型”。返回值判断要用 instanceof Object（函数返回基本类型时仍返回新对象）。",keys:["Object.create","绑定 this","显式返回对象优先"],src:"从零开始的前端面试题.md / 面试问答.md"},{id:"js-021",type:"essay",diff:"medium",sub:"作用域与执行上下文",q:"说一下执行上下文、作用域和作用域链的关系。为什么要进行变量提升？",ans:`**面试回答：**

- **执行上下文**：代码被执行前创建的环境，包含变量对象/词法环境、作用域链、this。分全局上下文、函数上下文、eval 上下文；
- **作用域**：变量可访问的范围，由**书写位置**决定（词法作用域/静态作用域），分全局、函数、块级作用域；
- **作用域链**：函数定义时就确定了的“由内向外查找变量”的路径，内部作用域可以访问外部作用域变量，找不到就到全局，再找不到报 ReferenceError。

**变量提升**：JS 代码执行前有**编译阶段**，会先创建执行上下文，把 var 声明和函数声明提前登记到变量环境中，让代码在声明前可用。它**方便了函数互相调用**（函数声明提升），但也导致了问题：变量未声明就使用不报错、函数表达式只有变量名提升、覆盖风险。let/const 引入暂时性死区就是为了修正这些问题。`,ana:"执行上下文生命周期：创建（提升/确定 this/作用域链）→ 执行 → 回收。",keys:["词法作用域","执行上下文创建阶段","函数声明整体提升"],src:"从零开始的前端面试题.md"},{id:"js-022",type:"essay",diff:"hard",sub:"垃圾回收",q:"V8 的垃圾回收机制是怎样的？哪些操作会造成内存泄漏？",ans:`**面试回答：**

**V8 垃圾回收**采用**分代回收**：
- **新生代（新生对象，空间小）**：使用 **Scavenge（Cheney）算法**，把空间分为 From 和 To 两块，存活对象从 From 复制到 To，然后空间角色互换；对象存活过两轮或空间占比过高会晋升到老生代；
- **老生代（存活久的对象，空间大）**：使用**标记清除（Mark-Sweep）**为主——从根对象（全局变量、调用栈等）出发标记所有可达对象，清除不可达的；为避免内存碎片，配合**标记整理（Mark-Compact）**把存活对象移到一端；
- 为避免长停顿，V8 还做了**增量标记、并发标记**等优化。

**常见内存泄漏**：
1. **未清除的定时器** setInterval/setTimeout；
2. **未解绑的事件监听**（组件卸载时 removeEventListener 缺失）；
3. **意外的全局变量**（未声明直接赋值）；
4. **闭包长期引用大对象**；
5. 脱离 DOM 的引用（JS 变量还持有已删除的 DOM 节点）；
6. 未清理的 console.log 打印大对象（devtools 打开时）。

内存泄漏指“不再需要的数据仍被引用，GC 无法释放”；栈溢出则是递归过深导致调用栈超限，两者概念不同。`,ana:"先讲分代模型（新生代 Scavenge / 老生代标记清除+整理），再列泄漏场景，最后区分内存泄漏与栈溢出。",keys:["分代回收","Scavenge","标记清除","定时器泄漏"],src:"浏览器原理知识点.md / 一些高频率考点.md / 从零开始的前端面试题.md"},{id:"js-023",type:"essay",diff:"medium",sub:"异步编程",q:"解释一下 JavaScript 的事件循环机制。宏任务和微任务分别有哪些？",ans:`**面试回答：**JS 是**单线程**语言，通过事件循环（Event Loop）实现异步。事件循环维护一个**调用栈**、一个**微任务队列**和**宏任务队列**。

**执行顺序**：
1. 执行**同步代码**，遇到异步任务按类型分发：setTimeout 回调进入**宏任务**队列，Promise.then、await 后面的代码进入**微任务**队列；
2. 当前调用栈清空后，**立即清空所有微任务**；
3. 从宏任务队列取出**一个**任务执行，执行完再次清空微任务队列，如此循环。

**宏任务**：整体 script、setTimeout/setInterval、I/O、UI 交互事件、setImmediate（Node）。
**微任务**：Promise.then/catch/finally、queueMicrotask、MutationObserver，Node 中还有 process.nextTick（优先级最高）。

注意 \`setTimeout(fn, 0)\` 不是立即执行，只是尽快进入宏任务队列；由于浏览器的定时器节流（嵌套超过 5 层最低 4ms 等），时间也不精确。`,ana:"经典输出题：1,4,6,7,3,5,2（setTimeout + Promise + async/await 混合代码），docs 前端面试八股文.md 中有完整推导。",keys:["同步 → 微任务 → 宏任务","Promise.then 微任务","setTimeout 宏任务"],src:"前端面试八股文.md / 一些高频率考点.md / 浏览器原理知识点.md"},{id:"js-024",type:"code",diff:"hard",sub:"异步编程",q:`写出下面代码的输出顺序并解释原因：

\`\`\`js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
async function async1() {
  console.log("4");
  await async2();
  console.log("5");
}
async function async2() {
  console.log("6");
}
async1();
console.log("7");
\`\`\``,ans:'**输出顺序：1, 4, 6, 7, 3, 5, 2**\n\n**解析**：\n1. 同步输出 `1`；\n2. `setTimeout` 回调 `2` 放入**宏任务**队列；\n3. `Promise.then` 回调 `3` 放入**微任务**队列；\n4. 执行 `async1()`，同步输出 `4`；\n5. 执行 `await async2()`：先同步执行 async2 输出 `6`；**await 后面的代码（console.log("5")）被包装成 Promise.then，放入微任务队列**；\n6. 继续同步输出 `7`；\n7. 同步代码执行完毕，调用栈清空，**清空微任务队列**：按入队顺序输出 `3`，然后 `5`；\n8. 微任务清空后执行下一个宏任务，输出 `2`。\n\n**核心记忆点**：async 函数在 await 前的代码是同步执行的；await 相当于把后面的代码挂起为微任务。',ana:"这是 docs/前端面试八股文.md 的第一幕原题。易错点：6 在 4 后同步执行，而不是进微任务。",keys:["输出顺序","await 挂起为微任务","宏任务最后执行"],src:"前端面试八股文.md"},{id:"js-025",type:"essay",diff:"easy",sub:"异步编程",q:"Promise 有哪几种状态？为什么 then 能链式调用？Promise.all 和 Promise.race 的区别和使用场景是什么？",ans:`**面试回答：**

**状态**：pending（等待）→ fulfilled（成功）/ rejected（失败），状态**一旦改变不可逆**。

**then 链式调用**：因为 then 本身**返回一个新的 Promise**。回调返回普通值会被包装成 resolve；返回 Promise 则等待其完成再决定新 Promise 的状态，因此可以实现串行异步。

**Promise 组合器**：
- \`Promise.all\`：**全部成功才成功**（结果按输入顺序），**一个失败即整体失败**——适合强依赖的并行任务，如同时请求页面多个必用数据；
- \`Promise.allSettled\`：等待全部结束，分别拿到成功/失败结果——适合批量任务容错；
- \`Promise.race\`：**第一个 settled 的 Promise 决定结果**（成功或失败都算）——适合**超时控制**，与一个定时 reject 的 Promise 竞速；
- \`Promise.any\`：**第一个 fulfilled** 的决定结果，全部失败才失败——多源请求择优。`,ana:"手写 Promise.all 的关键：结果按索引写入（不能用 push），计数达到 total 才 resolve，任一失败立即 reject。",keys:["状态不可逆","then 返回新 Promise","all 一败俱败","race 超时控制"],src:"面试问答.md / 知识点快速复习指南.md"},{id:"js-026",type:"code",diff:"hard",sub:"异步编程",q:"手写一个 Promise.all：接收 Promise 或普通值组成的数组，保持结果顺序；全部成功时 resolve，任一任务失败时 reject。",ans:`\`\`\`js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let count = 0
    const total = promises.length
    // 空数组直接 resolve
    if (total === 0) return resolve([])

    promises.forEach((p, index) => {
      // Promise.resolve 统一处理普通值和 thenable
      Promise.resolve(p).then((value) => {
        // 关键：按索引写入而不是 push，保证结果顺序与输入一致
        results[index] = value
        count += 1
        if (count === total) resolve(results)
      }, reject) // 任一失败立即 reject
    })
  })
}
\`\`\`

**易错点**：
1. 结果必须**按输入索引保存**，Promise 完成顺序和结果顺序不是一回事；
2. 输入项要用 \`Promise.resolve()\` 包装，兼容普通值；
3. 输入为空数组时返回 fulfilled 的 \`[]\`；
4. 失败后不用等其余任务（原生语义），已完成的计数也不再触发 resolve。`,ana:"这是知识点快速复习指南.md 中的速记题。追问：Promise.allSettled 怎么改？——不 reject，收集 { status, value/reason }。",keys:["按索引保存","Promise.resolve 包装","计数判断完成"],src:"知识点快速复习指南.md"},{id:"js-027",type:"essay",diff:"easy",sub:"异步编程",q:"对 async/await 的理解？await 后面的代码在什么时机执行？怎么捕获异常？",ans:`**面试回答：**

- **async/await 是基于 Promise 的语法糖**，让异步代码看起来像同步代码，提高可读性；
- \`async\` 函数**默认返回一个 Promise**，return 的值会被包装成 resolve；
- \`await\` 会**暂停当前 async 函数的执行**，等待 Promise 出结果后继续；await 后面的代码会被包装成微任务，**不会阻塞主线程**；
- **异常捕获**：await 的 Promise reject 时会抛出异常，可用 try/catch 捕获，或者在 Promise 后接 .catch()；未捕获会导致 async 函数返回的 Promise 变为 rejected；
- 多个无依赖的 await 应该用 \`Promise.all\` 并行，串行 await 会白白浪费时间。

对比回调函数和 Promise 链：async/await 避免了回调地狱和长 then 链，错误处理也更集中。`,ana:"可以补充：for...of + await 可以实现串行异步迭代；并行场景优先 Promise.all。",keys:["Promise 语法糖","await 暂停函数","try/catch","并行 Promise.all"],src:"从零开始的前端面试题.md / 一些高频率考点.md"},{id:"js-028",type:"single",diff:"medium",sub:"异步编程",q:"关于 setTimeout(fn, 1000)，下列说法正确的是？",opts:["1000ms 后 fn 一定立即执行","fn 会在 1000ms 后被放入宏任务队列，实际执行时间取决于队列和主线程状态","fn 会立即执行然后每秒重复","fn 在 1000ms 时被放入微任务队列"],ans:"B",ana:"setTimeout 的语义是“**至少**延迟 1000ms 后把回调放入宏任务队列”，实际执行时间受前面宏任务、微任务、主线程长任务影响，可能晚于预期。这也是 docs 中“为什么 setTimeout 时间不精准”的答案：定时器只保证入队时机，不保证执行时机。setInterval 同理，且回调堆积时可能连续执行。",keys:["宏任务入队时机","不精准原因","主线程长任务"],src:"问答类型面试题.md"},{id:"js-029",type:"essay",diff:"medium",sub:"DOM 与事件",q:"什么是 DOM 和 BOM？说一下事件冒泡、事件捕获和事件委托。",ans:`**面试回答：**

- **DOM**（Document Object Model）：文档对象模型，把 HTML 解析成树结构，提供操作页面内容的 API；
- **BOM**（Browser Object Model）：浏览器对象模型，提供 window、location、history、navigator、screen 等浏览器能力。

**事件流三个阶段**：捕获阶段（window 向目标传播）→ 目标阶段 → 冒泡阶段（目标向 window 传播）。addEventListener 默认在冒泡阶段监听，第三个参数传 true（或 { capture: true }）改为捕获。\`event.stopPropagation()\` 阻止传播，\`event.preventDefault()\` 阻止默认行为。

**事件委托**：利用冒泡，把子元素的事件统一绑定到父元素上，在回调中通过 \`event.target\` 判断实际目标。

**优点**：
1. 大量子元素时**减少事件监听数量**，节省内存；
2. 动态新增的子元素**无需重新绑定**事件。

适合列表项点击等场景；不适合需要 stopPropagation 的场景和 focus/blur 等不冒泡事件。`,ana:"事件委托是 docs 中单独整理的问答高频题，优点要点出“动态元素无需重新绑定”。",keys:["三阶段","stopPropagation","event.target","动态元素"],src:"从零开始的前端面试题.md / 问答类型面试题.md / 面试问答.md"},{id:"js-030",type:"essay",diff:"easy",sub:"DOM 与事件",q:"ajax、axios、fetch 有什么区别？",ans:`**面试回答：**

- **ajax**：泛指通过 XMLHttpRequest 实现的异步请求技术，API 陈旧、需手动处理回调，一般不直接使用；
- **fetch**：浏览器原生的现代请求 API，基于 **Promise**，语法简洁；但**默认不会把 4xx/5xx 当作 reject**（只有网络错误才 reject，需要手动检查 response.ok），不支持超时（需 AbortController），不带 cookie 需要 credentials 配置；
- **axios**：基于 XMLHttpRequest 封装的库，支持**拦截器**（token 注入、统一错误处理）、自动 JSON 转换、超时配置、取消请求、并发helper，是中后台项目的主流选择。

项目中一般对 axios 做二次封装：统一 baseURL、token、业务码处理、401 登录态、blob 下载兼容。`,ana:"fetch “网络错误才 reject”是高频易错点；axios 拦截器可结合项目 request.ts 讲。",keys:["XHR 基础","fetch response.ok","axios 拦截器"],src:"从零开始的前端面试题.md / 基于简历的问题.md"},{id:"js-031",type:"code",diff:"hard",sub:"性能与手写",q:"手写防抖函数 debounce 和节流函数 throttle，并说明各自的使用场景。",ans:`\`\`\`js
// 防抖：连续触发时只执行最后一次（停止触发 delay 后执行）
function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    clearTimeout(timer) // 每次触发先取消上一次
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// 节流：规定时间内最多执行一次
function throttle(fn, interval) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
\`\`\`

**场景区分**：
- **防抖**：搜索框输入联想（停止输入再请求）、窗口 resize 后重算布局、表单重复提交；
- **节流**：滚动监听（scroll）、拖拽、鼠标移动、上传进度更新（docs 建议 50-100ms 更新一次展示）。

面试可补充：防抖可加立即执行（首次触发先执行）选项；Vue 项目可直接用 VueUse 的 useDebounceFn/useThrottleFn 或 lodash。`,ana:"核心：防抖重置计时器，节流比较时间戳。箭头函数与 this 传递是细节加分点。",keys:["clearTimeout 重置","时间戳节流","搜索框防抖","滚动节流"],src:"前端性能优化面试题.md / 知识点快速复习指南.md / 面试问答.md"},{id:"js-032",type:"essay",diff:"medium",sub:"性能与手写",q:"页面请求大规模并发时，前端如何控制并发数量？",ans:`**面试回答：**浏览器对同域名 HTTP/1.1 并发连接有限制（一般 6 个），大量请求同时发出会导致排队、阻塞其他请求甚至拖垮服务端。前端要做**并发控制**：

**核心思路**：维护一个**请求队列**，限制同时进行的请求数量，完成一个再从队列取下一个。

\`\`\`js
function limitConcurrency(tasks, limit) {
  return new Promise((resolve, reject) => {
    const results = []
    let index = 0 // 下一个任务指针
    let finished = 0
    const total = tasks.length

    function next() {
      if (finished === total) return resolve(results)
      if (index >= total) return
      const current = index++
      tasks[current]().then((res) => {
        results[current] = res
        finished += 1
        next() // 完成一个，补位下一个
      }, reject)
    }
    // 先启动 limit 个
    for (let i = 0; i < Math.min(limit, total); i++) next()
  })
}
\`\`\`

**配合手段**：取消无效请求（AbortController）、请求缓存/去重、防抖节流降低触发频率、失败重试与降级。分片上传场景的并发数一般从 3~6 起步按网络情况调整。`,ana:"大文件分片上传的并发限制就是这一思路的落地场景，可与 project 分类呼应。",keys:["请求队列","并发限制","AbortController","请求合并"],src:"问答类型面试题.md / 一些高频率考点.md"},{id:"js-033",type:"essay",diff:"easy",sub:"内置对象",q:"Map 和 Object 有什么区别？WeakMap 有什么特点？",ans:`**面试回答：**

**Map vs Object**：
1. **键类型**：Object 键只能是字符串/Symbol（数字会被转字符串）；Map 键可以是**任意类型**（对象、函数、NaN 都行）；
2. **顺序**：Map 保证插入顺序遍历；Object 的键顺序不保证（数字键会排前面）；
3. **长度**：Map 有 \`size\` 属性；Object 需要手动 \`Object.keys().length\`；
4. **性能**：频繁增删键值对时 Map 表现更好；
5. **原型**：Object 有默认原型链，可能和自定义键冲突（可用 Object.create(null) 规避）。

**WeakMap**：键只能是**对象**，且是**弱引用**——不会阻止垃圾回收。当对象的其他引用都消失时，WeakMap 中对应键值对可被自动回收，适合存放与对象生命周期绑定的附加数据（如给 DOM 节点挂元数据），**不可遍历**。WeakSet 同理。`,ana:"弱引用与 GC 的关系是深挖点；对象数组按业务字段去重用 Map 也是实际应用。",keys:["任意类型键","插入顺序","弱引用","不可遍历"],src:"从零开始的前端面试题.md"},{id:"js-034",type:"single",diff:"easy",sub:"内置对象",q:"下列哪个方法可以最可靠地判断一个变量是否为数组？",opts:['typeof v === "array"',"v instanceof Array","Array.isArray(v)","Object.keys(v).length > 0"],ans:"C",ana:'typeof 无法区分数组和对象（都返回 "object"，且没有 "array" 这个返回值）；instanceof 在跨 iframe（多个全局环境）场景会失准；Array.isArray 是 ES5 引入的专用方法，不受上述限制，最可靠。Object.keys 对非对象参数会报错且不能证明是数组。',keys:["Array.isArray","typeof 局限","跨 iframe"],src:"从零开始的前端面试题.md"},{id:"js-035",type:"essay",diff:"hard",sub:"函数式编程",q:"说说你对函数式编程的理解，什么是纯函数和副作用？",ans:`**面试回答：**函数式编程是一种**用纯函数组合来表达程序**的编程范式，强调“计算即函数求值”，主要特征：

1. **纯函数**：相同输入永远得到相同输出，且**不产生副作用**（不修改外部变量、不做 I/O、不改参数）；
2. **不可变数据**：不直接修改原数据，而是创建新数据（如 React 的 setState 用新对象替换）；
3. **无副作用地组合**：通过函数组合、高阶函数、柯里化复用逻辑；
4. **副作用隔离**：把 I/O、请求、DOM 操作等副作用推到边界统一处理。

**优点**：逻辑可预测、易测试（输入输出确定）、易并行、易复用。

**在前端框架中的体现**：React 的设计理念是“UI = f(state)”——视图是状态的纯函数；组件渲染应该是纯的，数据请求、定时器这类副作用被约定放进 useEffect 中，就是为了把副作用与渲染分离。`,ana:"结合 React“渲染必须纯净、副作用放 useEffect”回答，能体现框架层理解。",keys:["纯函数","副作用","不可变","UI = f(state)"],src:"问答类型面试题.md / 收集的面试知识点.md"},{id:"js-036",type:"code",diff:"medium",sub:"性能与手写",q:"写一个带并发限制的异步任务调度器：同一时刻最多允许 limit 个任务执行。",ans:`\`\`\`js
class Scheduler {
  constructor(limit) {
    this.limit = limit
    this.queue = [] // 等待队列
    this.running = 0 // 当前运行数
  }

  add(promiseCreator) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseCreator, resolve, reject })
      this.run()
    })
  }

  run() {
    while (this.running < this.limit && this.queue.length) {
      const { promiseCreator, resolve, reject } = this.queue.shift()
      this.running += 1
      promiseCreator().then(resolve, reject).finally(() => {
        this.running -= 1
        this.run() // 释放一个名额，立即补位
      })
    }
  }
}

// 使用
const scheduler = new Scheduler(2)
const task = (time, val) => () =>
  new Promise((r) => setTimeout(() => r(val), time))
scheduler.add(task(1000, 'A')).then(console.log) // 1s 后 A
scheduler.add(task(500, 'B')).then(console.log)  // 1s 后 B（被并发 2 允许）
scheduler.add(task(300, 'C')).then(console.log)  // 1.5s 后 C（等名额）
\`\`\`

**思路**：队列 + 运行计数；完成一个补一个。大文件分片上传、批量图片处理都直接复用该模型。`,ana:"与 essay 题 js-032 互为补充：一个是函数式实现，一个是类实现，思路相同。",keys:["队列","running 计数","finally 补位"],src:"问答类型面试题.md / 一些高频率考点.md"},{id:"js-037",type:"judge",diff:"medium",sub:"内置对象",q:"JSON.stringify 深拷贝对象时会丢失 undefined 值的属性、函数和 Symbol，遇到循环引用会直接报错。",ans:!0,ana:"JSON.stringify 的已知缺陷：①undefined、函数、Symbol 属性被忽略（数组中变 null）；②Date 变 UTC 字符串；③NaN、Infinity 变 null；④循环引用抛 TypeError；⑤丢失原型链；⑥BigInt 直接报错。因此深拷贝推荐 structuredClone 或递归 + WeakMap 实现。",keys:["序列化缺陷","循环引用报错","structuredClone"],src:"知识点快速复习指南.md"},{id:"js-038",type:"essay",diff:"medium",sub:"内置对象",q:"对 JSON 的理解？escape、encodeURI、encodeURIComponent 有什么区别？",ans:`**面试回答：**

**JSON**：一种轻量级的数据交换格式，基于 JS 对象字面量语法但独立于语言。只有三种结构：键值对（键必须是双引号字符串）、数组、基本类型（不含 undefined、函数、注释）。前端常用 \`JSON.stringify\`（序列化，可传 replacer/缩进）和 \`JSON.parse\`（反序列化，可传 reviver）；\`toJSON\` 方法可自定义序列化行为。

**编码三兄弟**（处理 URL 特殊字符）：
- **escape**：已废弃，不用于 URL 编码，忽略不解码；
- **encodeURI**：编码整个 URI，**保留 URI 结构字符**（:/?#&= 等），适合对完整 URL 编码；
- **encodeURIComponent**：编码更彻底，**连 &、=、/ 也编码**，适合编码**参数值**（如搜索关键词），防止参数中的特殊字符破坏 URL 结构。

典型用法：\`url + "?q=" + encodeURIComponent(keyword)\`。`,ana:"encodeURIComponent 用于参数值、encodeURI 用于整个 URL，一句话区分。",keys:["轻量数据交换","encodeURI 保留结构","encodeURIComponent 参数值"],src:"从零开始的前端面试题.md"},{id:"js-039",type:"multiple",diff:"medium",sub:"内置对象",q:"下列哪些数组方法会**改变原数组**？（多选）",opts:["push / pop","slice","splice","sort / reverse"],ans:["A","C","D"],ana:"会改变原数组的 7 个方法：**push、pop、shift、unshift、splice、sort、reverse**。slice 截取并返回新数组、map/filter 返回新数组，都不改变原数组。sort 默认按字符串 Unicode 码位排序，数字排序要传比较器 (a, b) => a - b。",keys:["splice 改变原数组","slice 不改变","sort 比较器"],src:"知识点快速复习指南.md / 问答类型面试题.md"},{id:"js-040",type:"multiple",diff:"medium",sub:"异步编程",q:"下列哪些属于**微任务（microtask）**？（多选）",opts:["Promise.then / catch / finally","queueMicrotask","setTimeout / setInterval","MutationObserver"],ans:["A","B","D"],ana:"微任务：Promise.then/catch/finally、queueMicrotask、MutationObserver（浏览器）、process.nextTick（Node，优先级最高）。setTimeout/setInterval、I/O、UI 事件是**宏任务**；setImmediate 是 Node 的 check 阶段宏任务。执行顺序：同步代码 → 清空所有微任务 → 取一个宏任务 → 再清微任务。",keys:["微任务清单","宏任务清单","清空微任务再取宏任务"],src:"一些高频率考点.md / 知识点快速复习指南.md"}],xa=[{id:"br-001",type:"essay",diff:"easy",sub:"进程与线程",q:"进程和线程的概念与区别是什么？浏览器渲染进程有哪些线程？",ans:`**面试回答：**

- **进程**：操作系统**资源分配**的最小单位，拥有独立的内存空间；
- **线程**：CPU **调度执行**的最小单位，同一进程内的多个线程**共享进程的内存空间**，一个线程崩溃可能导致整个进程崩溃。

**区别**：进程间相互隔离、通信成本高（IPC）；线程间共享数据、切换开销小，但需要处理并发安全。

**浏览器是多进程架构**（Chrome）：每个标签页一个渲染进程、浏览器主进程、GPU 进程、网络进程、插件进程等，一个页面崩溃不影响其他标签页。

**渲染进程的主要线程**：
1. **GUI 渲染线程**：解析 HTML/CSS、布局绘制；
2. **JS 引擎线程**（如 V8）：执行 JS，与 GUI 线程**互斥**——JS 执行时页面渲染会暂停；
3. **事件触发线程**：维护事件队列（宏任务队列）；
4. **定时器线程**：管理 setTimeout/setInterval 计时；
5. **异步 HTTP 请求线程**：处理网络请求回调。`,ana:"JS 引擎线程与 GUI 线程互斥是“长任务阻塞渲染”的底层原因，可以衔接性能优化。",keys:["资源分配 vs 调度执行","多进程浏览器","GUI 与 JS 线程互斥"],src:"浏览器原理知识点.md"},{id:"br-002",type:"essay",diff:"medium",sub:"浏览器组成",q:"从输入 URL 到页面展示，中间发生了什么？",ans:`**面试回答：**这是贯穿网络与渲染的综合题，按流程回答：

**一、网络阶段**
1. **URL 解析**：浏览器解析协议、域名、端口、路径；
2. **缓存检查**：HTML 命中有效强缓存则直接使用本地资源；
3. **DNS 解析**：把域名解析成 IP（浏览器缓存 → 系统缓存 → hosts → 本地 DNS → 递归查询）；
4. **建立 TCP 连接**：三次握手确认双方收发能力；
5. **TLS 握手**（HTTPS）：验证证书、协商加密算法、生成会话密钥；
6. **发送 HTTP 请求**，服务端处理后返回响应。

**二、渲染阶段**
1. **构建 DOM 树**：HTML 解析器把字节流转换为 DOM 树；
2. **构建 CSSOM 树**：解析 CSS 生成规则树；
3. **构建渲染树**：合并 DOM 和 CSSOM，排除 display:none 等不可见节点；
4. **Layout（回流）**：计算每个节点的几何信息（位置、大小）；
5. **Paint（重绘）**：把样式绘制成图层内容；
6. **Composite（合成）**：各图层合成，交给 GPU 显示到屏幕。

**面试速答版**：浏览器先解析 URL 和缓存，然后 DNS 找 IP，TCP 建连接，HTTPS 再做 TLS 握手；拿到 HTML 后构建 DOM，CSS 构建 CSSOM，两者合成渲染树；接着 Layout 计算位置尺寸，Paint 绘制像素，最后 Composite 合成图层显示。`,ana:"docs 面试八股文第二幕原题。追问点：重排/重绘如何优化（合并 DOM 操作、脱离文档流、transform/opacity GPU 加速）。",keys:["DNS","三次握手","TLS 握手","渲染树","Layout/Paint/Composite"],src:"前端面试八股文.md / 知识点快速复习指南.md / 计算机网络面试题.md"},{id:"br-003",type:"essay",diff:"medium",sub:"渲染原理",q:"浏览器的渲染过程中，遇到 JS 和 CSS 会怎么处理？什么情况会阻塞渲染？",ans:`**面试回答：**

**JS 的处理**：
- 普通 \`<script>\` **阻塞 HTML 解析**：因为 JS 可能修改 DOM（document.write 等），浏览器必须等脚本下载并执行完才继续解析；
- 优化：\`defer\`（并行下载、DOM 解析后按序执行）、\`async\`（并行下载、下载完立即执行）、脚本放 body 底部、按需动态加载。

**CSS 的处理**：
- CSS **不阻塞 HTML 解析**（DOM 可以继续构建），但**阻塞渲染**：CSSOM 没准备好，浏览器无法确定最终样式，宁可白屏也不闪烁；
- CSS 也可能阻塞后续 JS 执行（JS 可能读取样式）。

**阻塞渲染的常见来源**：
1. 同步 script 标签；
2. 关键 CSS 未加载；
3. 首屏大图（影响 LCP）；
4. Web 字体加载慢（文字不可见）；
5. 大量 DOM 节点；
6. 主线程长任务。

**关键渲染路径优化**：压缩内联关键 CSS、非关键样式异步加载、defer/async 脚本、减少 DOM 复杂度。`,ana:"记忆：JS 阻塞解析、CSS 阻塞渲染。预解析（preload scanner）会提前发现资源并行下载。",keys:["JS 阻塞解析","CSS 阻塞渲染","defer/async","关键渲染路径"],src:"浏览器原理知识点.md / 知识点快速复习指南.md"},{id:"br-004",type:"essay",diff:"easy",sub:"缓存",q:"说一下浏览器缓存机制：强缓存和协商缓存的区别，以及项目中常见的缓存策略。",ans:`**面试回答：**浏览器缓存分为两类，按顺序生效：

**1. 强缓存**：命中时**不发请求**，直接读本地缓存（返回 200 from disk/memory cache）。
- \`Cache-Control: max-age=31536000\`：相对时间，优先级高；
- \`Expires\`：HTTP/1.0 的绝对时间，客户端时间不准会失效。

**2. 协商缓存**：强缓存过期后，浏览器带上资源标识询问服务器资源是否变化：
- \`ETag / If-None-Match\`：基于内容/版本生成的唯一标识，精度高；
- \`Last-Modified / If-Modified-Since\`：基于最后修改时间，精度到秒；
- 未变化返回 **304**（不返回正文，浏览器继续用本地缓存）；变化则返回新资源 + **200**。两者同时存在时一般优先 ETag。

**项目常见策略**：
- \`index.html\`：**短缓存或不强缓存**（入口文件要尽快拿到最新资源地址）；
- 带 hash 文件名的 JS/CSS/图片：**长期强缓存**（内容变 → 文件名变 → 缓存自动失效）。

**面试关键句**：缓存不是为了“永远不请求”，而是在“更新及时性”和“加载速度”之间做平衡。`,ana:"刷新行为差异可补充：F5 会跳过强缓存带 If-Modified-Since/If-None-Match；Ctrl+F5 强制刷新连协商缓存也跳过；地址栏回车则正常走完整缓存链。",keys:["强缓存不发请求","ETag/Last-Modified","304","hash 文件名"],src:"浏览器原理知识点.md / 知识点快速复习指南.md"},{id:"br-005",type:"single",diff:"medium",sub:"缓存",q:"点击刷新按钮（F5）、按 Ctrl+F5、地址栏回车，三者对缓存的处理正确的是？",opts:["F5 正常走完整缓存；Ctrl+F5 跳过强缓存；地址栏回车正常走完整缓存","F5 跳过所有缓存；Ctrl+F5 只跳过强缓存；地址栏回车跳过协商缓存","三者都正常使用全部缓存","三者都跳过所有缓存"],ans:"A",ana:"地址栏回车：正常走完整缓存链（强缓存 → 协商缓存）。F5 刷新：浏览器会跳过强缓存，带上协商缓存头（If-Modified-Since / If-None-Match）去验证。Ctrl+F5 强制刷新：跳过所有缓存，重新完整拉取资源。",keys:["F5 跳强缓存","Ctrl+F5 全跳过","地址栏回车正常缓存"],src:"浏览器原理知识点.md"},{id:"br-006",type:"essay",diff:"easy",sub:"本地存储",q:"Cookie、localStorage、sessionStorage、IndexedDB 有什么区别？各自的使用场景？",ans:`**面试回答：**

| 维度 | Cookie | localStorage | sessionStorage | IndexedDB |
|------|--------|--------------|----------------|-----------|
| 容量 | ~4KB | 5~10MB | 5~10MB | 几乎无限（数百 MB+） |
| 生命周期 | 可设过期时间 | 永久，手动清除 | 当前会话（标签页关闭） | 永久 |
| 随请求发送 | 每次自动携带 | 不发送 | 不发送 | 不发送 |
| API | document.cookie | 同步 API | 同步 API | 异步事务型 |

**使用场景**：
- **Cookie**：服务端需要的信息（登录态 token、CSRF Token）；配合 HttpOnly、Secure、SameSite 防护；
- **localStorage**：非敏感的用户配置、主题偏好、token（需权衡 XSS 风险）；
- **sessionStorage**：一次性会话数据（如表单草稿、列表筛选状态）；
- **IndexedDB**：大量结构化数据、离线应用数据缓存（配合 Service Worker）。

存储安全提醒：任何本地存储都可能被用户或 XSS 脚本读取，敏感数据不要明文存放。`,ana:"对比四件套是 docs 收集的高频题，表格化记忆。登录态保存在“收集的面试知识点.md”有双 Token 方案。",keys:["4KB vs 5MB","自动携带","会话级","IndexedDB 事务型"],src:"浏览器原理知识点.md / 一些高频率考点.md / 收集的面试知识点.md"},{id:"br-007",type:"essay",diff:"medium",sub:"同源策略",q:"什么是同源策略？跨域有哪些解决方案？CORS 的简单请求和预检请求是怎么回事？",ans:`**面试回答：**

**同源策略**：浏览器最核心的安全策略，要求协议、域名、端口**三者完全相同**才算同源。限制跨源的：Cookie/Storage 读取、DOM 访问、Ajax 响应读取。目的是隔离不同来源的数据，防止恶意网站窃取信息。

**跨域解决方案**：
1. **CORS**（主流）：服务端设置 \`Access-Control-Allow-Origin\` 等响应头授权跨域；
2. **代理**：开发用 Vite/Webpack devServer proxy，生产用 **Nginx 反向代理**，同源转发请求；
3. **JSONP**：利用 script 标签不受同源限制，只支持 GET，已基本淘汰；
4. **postMessage**：window 间跨域通信（iframe、多窗口）；
5. WebSocket：建立连接后不受同源策略限制。

**CORS 两类请求**：
- **简单请求**：GET/POST/HEAD，且 Content-Type 为 text/plain、multipart/form-data、application/x-www-form-urlencoded 等受限条件下，浏览器直接发送，服务端返回允许头即可；
- **复杂请求**：如带自定义头、Content-Type: application/json，浏览器先发 **OPTIONS 预检请求**，询问服务端是否允许（Allow-Methods/Headers/Origin），通过后才发送正式请求。预检结果有缓存（Access-Control-Max-Age）。`,ana:"面试常追问“为什么有预检”：让服务器有机会确认是否接受非常规跨域请求，保护老服务器不被副作用请求打挂。",keys:["协议/域名/端口","CORS 响应头","OPTIONS 预检","Nginx 代理"],src:"浏览器原理知识点.md / 收集的面试知识点.md"},{id:"br-008",type:"essay",diff:"medium",sub:"浏览器安全",q:"什么是 XSS 攻击？如何防御？",ans:`**面试回答：**XSS（Cross-Site Scripting，跨站脚本攻击）指攻击者向页面注入恶意脚本，在用户浏览时**在用户浏览器中执行**，窃取 Cookie/Token、篡改页面、发起伪造请求。

**类型**：
1. **存储型**：恶意脚本存入数据库（如评论区），所有访问者中招，危害最大；
2. **反射型**：脚本藏在 URL 参数中，服务端“反射”回页面执行，需诱导点击链接；
3. **DOM 型**：纯前端漏洞，如 \`innerHTML\` 直接插入未净化的 URL 参数内容。

**防御**：
1. **输出转义**：渲染用户输入时转义 HTML 实体（& < > " '），React/Vue 默认转义，慎用 dangerouslySetInnerHTML / v-html；
2. **输入过滤与富文本白名单**：限制可用标签和属性；
3. **CSP**（Content-Security-Policy）：限制脚本来源；
4. **HttpOnly Cookie**：脚本无法读取 Cookie；
5. 前后端都做：前端防护可被绕过，服务端存储前也要净化。`,ana:"与 CSRF 区分：XSS 是“注入代码执行”，CSRF 是“借用身份发请求”。XSS 危害更大也可辅助 CSRF。",keys:["存储/反射/DOM 型","innerHTML 转义","CSP","HttpOnly"],src:"浏览器原理知识点.md / 收集的面试知识点.md"},{id:"br-009",type:"essay",diff:"medium",sub:"浏览器安全",q:"什么是 CSRF 攻击？如何防御？",ans:`**面试回答：**CSRF（Cross-Site Request Forgery，跨站请求伪造）指攻击者**借助用户已有的登录身份**，在第三方网站诱导浏览器向目标站点发送伪造请求。因为浏览器会自动携带目标站点的 Cookie，服务端会误以为是用户本人操作。

**特点**：攻击者拿不到数据（受同源策略限制读不到响应），只能“冒用”请求；典型如诱导点击 → 自动提交转账/改邮箱表单。

**防御**：
1. **CSRF Token**：服务端下发随机 Token，请求时在参数/头中携带并校验，第三方站点拿不到；
2. **SameSite Cookie**：设置 SameSite=Lax/Strict，限制跨站请求携带 Cookie（现代浏览器默认 Lax）；
3. **校验 Origin / Referer**：请求头来源不合法则拒绝；
4. 敏感操作二次确认（验证码、密码）；
5. 不用 GET 做写操作。`,ana:"一句话对比：XSS 破坏“脚本执行隔离”，CSRF 破坏“请求来源可信”。",keys:["伪造请求","SameSite","CSRF Token","Origin 校验"],src:"浏览器原理知识点.md / 收集的面试知识点.md"},{id:"br-010",type:"essay",diff:"easy",sub:"浏览器事件机制",q:"同步和异步的区别是什么？什么是执行栈？Node 中的 Event Loop 和浏览器有什么区别？",ans:`**面试回答：**

**同步 vs 异步**：同步任务在主线程上排队顺序执行，后一个等前一个；异步任务不进入主线程，而是进入任务队列，只有任务队列通知主线程“可以执行了”才会进入主线程执行。

**执行栈（调用栈）**：存放函数调用的栈结构，函数调用压栈、返回出栈。栈空间有限，**递归过深会栈溢出**（Stack Overflow）。

**Node 与浏览器 Event Loop 区别**：
1. Node 的宏任务队列**分阶段**：timers → pending callbacks → poll → check（setImmediate）→ close，每阶段处理该阶段的回调；
2. **微任务执行时机不同**：浏览器是“每执行一个宏任务后清空微任务”；Node（11+ 后已对齐浏览器，但 process.nextTick 优先级最高，在每阶段切换时执行 nextTick 队列再执行 Promise 微任务）；
3. Node 特有 API：\`process.nextTick\`（特殊微任务，优先于 Promise）、\`setImmediate\`（check 阶段宏任务）。

面试时先说明运行环境差异，避免绝对化表述。`,ana:"process.nextTick > Promise.then 的执行优先级是 Node 部分的核心考点。",keys:["任务队列","调用栈","分阶段循环","process.nextTick"],src:"浏览器原理知识点.md"},{id:"br-011",type:"essay",diff:"medium",sub:"多标签页通信",q:"如何实现浏览器内多个标签页之间的通信？",ans:`**面试回答：**同源标签页间通信的常见方案：

1. **BroadcastChannel**：现代首选。同源标签页加入同一频道，\`postMessage\` 广播、\`onmessage\` 接收，实时性好、API 简单、不需要轮询。我在项目里用它做 SSE 连接复用的标签页间通信；
2. **localStorage + storage 事件**：一个页面写入，其他页面监听 \`storage\` 事件。注意 **storage 事件不会通知当前写入的页面**，实时性和性能一般，本质是“数据同步”而非消息通道；
3. **SharedWorker**：独立 Worker 进程持有连接/状态，多页面通过 port 通信；缺点是生命周期管理复杂，兼容性略差；
4. **WebSocket / 服务端中转**：跨域、跨浏览器也能通信，但需要服务端配合；
5. **Cookie + setInterval 轮询**：古老方案，实时性差，不推荐。

选型建议：同源实时通信选 BroadcastChannel；需要持久化共享状态用 localStorage；连接复用等复杂场景可组合（我项目就是 BroadcastChannel + localStorage 的 activeTabs 选举）。`,ana:"storage 事件“不通知自己”是易错点；BroadcastChannel 只支持同源。",keys:["BroadcastChannel","storage 事件","SharedWorker"],src:"浏览器原理知识点.md / 针对简历问答.md"},{id:"br-012",type:"essay",diff:"medium",sub:"Service Worker / PWA",q:"对 Service Worker 的理解？它和 HTML5 离线存储（AppCache）有何不同？",ans:`**面试回答：**

**Service Worker** 是运行在浏览器**后台独立线程**的脚本，充当网页与网络之间的**代理服务器**，核心能力：

1. **拦截网络请求**：可以自定义缓存策略（Cache First、Network First、Stale-While-Revalidate 等），是 PWA 离线可用的基础；
2. **离线缓存**：配合 Cache Storage API 缓存静态资源；
3. **消息推送**、后台同步；
4. 生命周期：install → waiting → activate，**必须 HTTPS**（localhost 除外）。

**与 AppCache（HTML5 离线存储）的区别**：AppCache 通过 manifest 文件声明缓存，灵活性差、缓存更新逻辑反直觉、坑多，已被废弃；Service Worker 用 JS 编程控制缓存，策略完全自定义，是它的替代品。

**使用注意**：SW 线程不能操作 DOM；作用域由文件路径决定；更新需要重新注册并刷新。`,ana:"可补充Workbox：Google 提供的 SW 工具库，模板化缓存策略。",keys:["后台线程代理","拦截请求","PWA 离线","必须 HTTPS"],src:"浏览器原理知识点.md / 从零开始的前端面试题.md"},{id:"br-013",type:"essay",diff:"medium",sub:"渲染原理",q:"如何优化关键渲染路径？回流和重绘如何避免？",ans:`**面试回答：**

**关键渲染路径**指浏览器从收到 HTML 到首次渲染出内容的流程（DOM → CSSOM → 渲染树 → Layout → Paint）。优化方向：

1. **减少关键资源数量**：内联关键 CSS、非关键 CSS 异步加载、JS 用 defer/async；
2. **减小关键资源体积**：压缩、按需加载；
3. **缩短关键渲染路径长度**：减少层级依赖，首屏内容尽早返回。

**回流（重排）**：元素几何属性（宽高、位置）变化触发布局重算，**开销大**；一个元素变化可能影响父元素、兄弟甚至整页。
**重绘**：只改外观（颜色、背景、阴影），不触发布局，开销较小。**回流必然引发重绘**。

**避免手段**：
1. **批量修改 DOM**：使用 DocumentFragment、修改 className、或把元素脱离文档流再改；
2. **读写分离**：先统一读取 offsetWidth/getBoundingClientRect 等布局信息，再统一修改样式，避免“读-写-读”强制同步布局；
3. 动画用 **transform/opacity**（只走合成，跳过布局绘制），复杂动画元素 position: absolute/fixed 脱离文档流；
4. \`will-change\` 提升合成层（不要滥用，图层过多内存压力大）；
5. 大列表用**虚拟滚动**。`,ana:"docs 前端八股文第二幕追问原文：合并 DOM 操作（DocumentFragment）、脱离文档流、GPU 加速三板斧。",keys:["关键渲染路径","读写分离","DocumentFragment","transform 合成"],src:"前端面试八股文.md / 浏览器原理知识点.md / 前端性能优化面试题.md"},{id:"br-014",type:"single",diff:"medium",sub:"渲染原理",q:"documentFragment 与直接操作 DOM 相比，主要优势是什么？",opts:["在内存中批量构建节点，最后一次性插入文档，减少回流次数","可以突破 DOM 数量上限","渲染速度永久性提升 10 倍","可以替代虚拟 DOM 实现响应式"],ans:"A",ana:"DocumentFragment 是轻量级文档片段，不在真实文档中。把大量节点先挂到 fragment 上（这些操作不触发回流），最后一次性 appendChild 到文档，只触发一次回流重绘，性能远好于循环里逐个插入 DOM。它不是虚拟 DOM，也没有响应式能力。",keys:["内存文档片段","批量插入","减少回流"],src:"前端性能优化面试题.md"},{id:"br-015",type:"judge",diff:"easy",sub:"本地存储",q:"IndexedDB 支持存储大量结构化数据，提供基于事务的异步 API，适合离线应用和大数据量缓存场景。",ans:!0,ana:"IndexedDB 特点：键值对存储、支持索引与事务（transaction）、API 异步不阻塞主线程、存储空间大（通常可达数百 MB 至磁盘配额）、同源限制。它弥补了 localStorage 只适合小量字符串数据的不足。",keys:["事务","异步 API","大容量","同源限制"],src:"浏览器原理知识点.md / 一些高频率考点.md"},{id:"br-016",type:"essay",diff:"medium",sub:"正向代理与反向代理",q:"正向代理和反向代理的区别是什么？Nginx 在前端项目中的常见用法有哪些？",ans:`**面试回答：**

- **正向代理**：代理**客户端**。服务器不知道真实客户端是谁，客户端主动配置代理（如 VPN、科学上网）；特点是“代理客户端、隐藏客户端”；
- **反向代理**：代理**服务端**。客户端无感知，以为自己在访问真实服务器，实际由代理转发（如 Nginx）。用于负载均衡、缓存、安全隔离；特点是“代理服务端、隐藏服务端”。

**Nginx 在前端的常见用法**（结合项目）：
1. **静态资源托管**：托管打包产物，gzip 压缩、缓存配置；
2. **反向代理接口**：把 /api 转发到后端服务，解决跨域与环境配置问题；
3. **SPA 路由回退**：history 模式刷新 404 问题，\`location / { try_files $uri /index.html; }\`；
4. **负载均衡**：多实例分流；
5. HTTPS 配置、限流等。`,ana:"try_files 是前端部署必知配置，可衔接 Docker + Nginx 部署经验。",keys:["代理客户端 vs 代理服务端","try_files","反向代理跨域"],src:"浏览器原理知识点.md / 针对简历问答.md"},{id:"br-017",type:"multiple",diff:"medium",sub:"渲染原理",q:"下列哪些方式可以创建 **BFC**（块级格式化上下文）？（多选）",opts:["overflow: hidden / auto","position: absolute / fixed","display: inline","float 不为 none / display: flow-root"],ans:["A","B","D"],ana:"常见触发条件：根元素、float 非 none、position: absolute/fixed、display: inline-block/flex/grid/flow-root、overflow 非 visible。display: inline 只是行内显示，不创建 BFC。BFC 常用于清除浮动、防止 margin 折叠、实现自适应两栏布局；现代推荐 display: flow-root（语义就是创建 BFC，无副作用）。",keys:["BFC 触发条件","flow-root","清除浮动"],src:"一些高频率考点.md / 面试问答.md"},{id:"br-018",type:"multiple",diff:"medium",sub:"缓存",q:"下列属于**强缓存**控制的响应头/机制有哪些？（多选）",opts:["Cache-Control: max-age","Expires","ETag / If-None-Match","Last-Modified / If-Modified-Since"],ans:["A","B"],ana:"强缓存：Cache-Control: max-age=xxx（相对时间，优先级高）和 Expires（HTTP/1.0 绝对时间，客户端时钟不准会失效），命中时不发请求。ETag/If-None-Match 和 Last-Modified/If-Modified-Since 是**协商缓存**的标识对：强缓存过期后浏览器带上它们询问服务器，未变化返回 304。项目常见策略：index.html 短缓存，带 hash 的静态资源长期强缓存。",keys:["强缓存 vs 协商缓存","Cache-Control 优先","304"],src:"知识点快速复习指南.md / 浏览器原理知识点.md"}],ka=[{id:"net-001",type:"essay",diff:"easy",sub:"HTTP 协议",q:"GET 和 POST 请求有哪些区别？",ans:`**面试回答：**

1. **语义**：GET 用于**获取资源**，幂等、安全（不改变服务器状态）；POST 用于**提交数据/创建资源**，不幂等；
2. **参数位置**：GET 参数放在 **URL** 中，长度受 URL 限制（浏览器限制约 2KB~8KB）；POST 参数放在**请求体**中，理论上不受限；
3. **缓存与收藏**：GET 可以被浏览器缓存、收藏为书签、保留在历史记录；POST 不能；
4. **编码类型**：GET 只支持 URL 编码；POST 支持多种（form-data、application/json 等）；
5. **安全性**：都不加密，但 GET 参数直接暴露在 URL，敏感信息不能用 GET。

补充：GET 也会携带请求体（RFC 未禁止）但服务端通常忽略；GET 产生一个 TCP 数据包（头+数据一起），POST 可能两个包（先头发包，部分浏览器实现），这个说法有争议，面试提及即可。`,ana:"幂等性是加分点：GET 幂等，POST 不幂等，PUT 幂等。",keys:["幂等","URL 参数","请求体","缓存"],src:"计算机网络面试题.md"},{id:"net-002",type:"single",diff:"medium",sub:"HTTP 协议",q:"POST 和 PUT 请求的核心区别是什么？",opts:["POST 幂等，PUT 不幂等","PUT 幂等（重复提交同一资源状态不变），POST 不幂等（每次都会新建资源）","PUT 只能上传文件","POST 请求体更小"],ans:"B",ana:"PUT 语义是“**整体替换**指定资源”，客户端指定资源 URI，重复执行结果一致，**幂等**；POST 语义是“向集合**新建**资源”，服务端决定 URI，重复提交会创建多个资源，**不幂等**。PATCH 则是部分更新。",keys:["PUT 幂等","整体替换","POST 新建"],src:"计算机网络面试题.md / fastapi知识点.md"},{id:"net-003",type:"essay",diff:"medium",sub:"HTTP 协议",q:"HTTP 1.0、1.1、2.0、3.0 各有哪些主要区别？",ans:`**面试回答：**

**HTTP/1.0 → 1.1**：
1. **长连接**：1.0 默认短连接（每次请求都建 TCP），1.1 默认 \`keep-alive\` 复用连接；
2. **管线化**：可以串行发出多个请求（但响应仍按序，队头阻塞仍在）；
3. 新增 Host 头（支持虚拟主机）、缓存控制（Cache-Control）、分块传输（chunked）等。

**HTTP/1.1 → 2.0**：
1. **二进制分帧**：数据以二进制帧传输；
2. **多路复用**：一个 TCP 连接上并行多个**流**，解决 HTTP 层队头阻塞（TCP 层的还在）；
3. **头部压缩 HPACK**：静态表+动态表+哈夫曼编码，减少重复头开销；
4. **服务器推送**（Server Push）。

**HTTP/2.0 → 3.0**：
1. 传输层从 TCP 换成 **QUIC（基于 UDP）**；
2. **彻底解决 TCP 队头阻塞**（流级别独立重传）；
3. **连接建立更快**：QUIC 把传输和加密握手合并（1-RTT 甚至 0-RTT）；
4. **连接迁移**：用 Connection ID 标识连接，切换网络（WiFi→4G）不断线。

一句话演进：**短连接 → 长连接 → 多路复用 → QUIC/UDP**。`,ana:"队头阻塞是贯穿线索：HTTP 层的队头阻塞被 2.0 多路复用解决；TCP 层的队头阻塞由 3.0 QUIC 解决。",keys:["keep-alive","多路复用","HPACK","QUIC"],src:"计算机网络面试题.md"},{id:"net-004",type:"essay",diff:"easy",sub:"HTTP 协议",q:"HTTP 和 HTTPS 的区别是什么？HTTPS 是如何保证安全的？",ans:`**面试回答：**

**区别**：
1. HTTPS = **HTTP + TLS/SSL**，默认端口 443（HTTP 是 80），数据**加密传输**；
2. HTTPS 需要向 CA 申请**数字证书**，验证服务器身份；
3. HTTPS 握手有额外开销，但现代硬件下性能可接受。

**TLS/SSL 工作原理**：**混合加密 + 数字证书 + 摘要算法**：
- **对称加密**（会话密钥）加密通信内容，性能好；
- **非对称加密**（公私钥）仅用于**交换对称密钥**，解决密钥配送问题；
- **数字证书**：CA 用自己的私钥签发服务器公钥信息，防止中间人替换公钥；
- **摘要算法**（如 SHA-256）验证报文完整性，防篡改。

**握手过程简述**：客户端发随机数+支持的加密套件 → 服务端返回证书+随机数 → 客户端验证证书，生成预主密钥用公钥加密发送 → 双方用三个随机数生成会话密钥 → 之后用对称加密通信。

**面试简答**：HTTPS = HTTP + TLS，不是换了一套应用层协议，而是在传输前多了加密和身份校验。`,ana:"对称加密快但密钥难配送、非对称加密安全但慢 → 混合加密的动机要讲清。",keys:["TLS 握手","对称+非对称混合","CA 证书","摘要防篡改"],src:"计算机网络面试题.md / 知识点快速复习指南.md"},{id:"net-005",type:"essay",diff:"easy",sub:"HTTP 状态码",q:"常见的 HTTP 状态码有哪些？302、303、307 有什么区别？",ans:`**面试回答：**按类别记：

- **2xx 成功**：200 OK；201 Created（资源创建成功，常用于 POST）；204 No Content（成功但无返回体，常用于 DELETE）；206 Partial Content（断点续传/分片下载）；
- **3xx 重定向**：301 永久重定向（搜索引擎更新索引）；302 临时重定向；304 Not Modified（协商缓存命中）；
- **4xx 客户端错误**：400 参数/格式错误；401 未认证（需登录）；403 已认证但无权限；404 资源不存在；405 方法不允许；413 请求体过大；429 触发限流；
- **5xx 服务端错误**：500 服务器内部错误；502 网关收到无效响应（如 Nginx 连不上后端）；503 服务不可用/过载；504 网关超时。

**302 / 303 / 307 区别**：
- **302**：临时重定向，规范允许改变方法但浏览器大多按 303 处理（转 GET），历史遗留混乱；
- **303**：重定向且**必须用 GET** 访问新地址（常用于 POST 后跳结果页）；
- **307**：临时重定向且**不允许改变请求方法**（POST 必须仍用 POST）；
- 对应地，308 是“不允许改方法的 301”。

**304 多好还是少好**：适度多好——304 说明协商缓存命中，减少了传输；但如果该缓存的内容频繁变化，过多的 304 校验请求也是浪费。`,ana:"重点记 301 vs 302 vs 307 的“是否改方法”，以及 401 vs 403 的“未认证 vs 无权限”。",keys:["2xx/3xx/4xx/5xx","304 协商缓存","307 不改方法","401 vs 403"],src:"计算机网络面试题.md / 一些高频率考点.md"},{id:"net-006",type:"single",diff:"medium",sub:"HTTP 协议",q:"HTTP/2.0 的头部压缩使用的是什么算法？",opts:["gzip 对整个报文压缩","HPACK：静态表 + 动态表 + 哈夫曼编码","Brotli 压缩","base64 编码缩短"],ans:"B",ana:"HTTP/2 采用 **HPACK**：①静态表记录常用头（如 :method GET）；②动态表记录连接期间出现过的自定义头；③哈夫曼编码压缩字符串。三者配合避免每次重复传输相同的头部字段，大幅减少头开销。HTTP/3 的 QUIC 则使用 QPACK，思路类似但适配了流乱序到达的场景。",keys:["HPACK","动态表","哈夫曼编码"],src:"计算机网络面试题.md"},{id:"net-007",type:"essay",diff:"medium",sub:"HTTP 协议",q:"当页面有多张图片时，HTTP 1.1 和 HTTP 2.0 的加载表现有什么不同？对 keep-alive 的理解是什么？",ans:`**面试回答：**

**HTTP/1.1**：同一域名下**并发连接数有限**（Chrome 一般 6 个），多张图片需要排队复用连接，超出并发的请求会阻塞等待；所以有多域名分片（domain sharding）、雪碧图等优化手段。

**HTTP/2.0**：**一个 TCP 连接多路复用**，所有图片请求可以在同一连接上并行交错传输，互不阻塞，不再需要域名分片和雪碧图。

**keep-alive 的理解**：HTTP/1.1 默认开启的长连接机制。HTTP/1.0 每次请求都要“三次握手 → 请求 → 响应 → 四次挥手”，开销大；keep-alive 让一次 TCP 连接建立后可以**复用发送多次请求/响应**，减少握手与慢启动开销。注意 keep-alive 解决的是“**重复建连**”开销，但没有解决 HTTP 层的队头阻塞（同一连接上响应仍按序）。

结合项目：数据上云平台 SSE 长连接受 HTTP/1.1 同域 6 连接限制，多标签页会把请求阻塞，这是我用 BroadcastChannel 复用连接的问题背景。`,ana:"把 keep-alive 与多路复用区分开：一个省握手，一个解决并行。",keys:["6 个并发连接","多路复用","keep-alive 复用 TCP"],src:"计算机网络面试题.md / 针对简历问答.md"},{id:"net-008",type:"essay",diff:"easy",sub:"HTTP 协议",q:"URL 有哪些组成部分？GET 的 URL 长度为什么会被限制？",ans:`**面试回答：**URL 组成：

\`\`\`
协议://域名:端口/路径?查询参数#锚点
https://example.com:443/api/v1/users?id=1#top
\`\`\`

1. **协议**：http/https/ftp 等；
2. **域名**：也可以是 IP，DNS 解析成 IP；
3. **端口**：http 默认 80，https 默认 443，省略时用默认端口；
4. **路径**：资源在服务器上的位置；
5. **查询参数**：? 后的 key=value，用 & 分隔；
6. **锚点（fragment）**：# 后的部分，**只在前端生效不会发给服务器**（前端路由 hash 模式的基础）。

**GET URL 长度限制的原因**：HTTP 协议本身**没有限制** URL 长度，限制来自**浏览器**（Chrome 约 2MB，但多数约定 2KB~8KB）和**服务器实现**（如 Nginx 默认 4KB~8KB 头缓冲）。POST 数据在请求体中，理论大小受服务器配置限制（如 413 Payload Too Large）。`,ana:"端口的作用：标识主机上的具体服务进程，一台服务器可以同时跑多个服务。",keys:["协议/域名/端口/路径/参数/锚点","hash 不发给服务器"],src:"计算机网络面试题.md"},{id:"net-009",type:"essay",diff:"medium",sub:"DNS",q:"DNS 是什么？完整的查询过程是怎样的？为什么同时使用 TCP 和 UDP？",ans:`**面试回答：**

**DNS**：域名系统，把 \`www.example.com\` 这类域名解析成 IP 地址，应用层协议。

**完整查询过程**（递归 + 迭代）：
1. 浏览器先查**自身 DNS 缓存**；
2. 查**操作系统缓存**和 hosts 文件；
3. 都没有则把请求发给**本地 DNS 服务器**（运营商，递归查询）；
4. 本地 DNS 没有就**迭代查询**：问根域名服务器（返回 .com 顶级域服务器地址）→ 问顶级域服务器（返回 authoritative 权威服务器地址）→ 问权威服务器拿到最终 IP；
5. 本地 DNS 缓存结果并返回给浏览器。

**为什么 TCP 和 UDP 都用**：
- **UDP（53 端口）**：常规查询用 UDP，一次往返就够，开销小速度快；
- **TCP**：响应报文超过 512 字节（区域传送、DNSSEC 大响应）时，或者查询被截断（TC 标志）后改用 TCP，保证传输可靠完整。

优化：\`dns-prefetch\` 可提前解析第三方域名，减少真正请求时的等待。`,ana:"递归查询（替你查到底）发生在客户端→本地 DNS；迭代查询（告诉你下一问谁）发生在本地 DNS→各级服务器。",keys:["递归与迭代","根/顶级/权威服务器","UDP 53","dns-prefetch"],src:"计算机网络面试题.md / 知识点快速复习指南.md"},{id:"net-010",type:"essay",diff:"medium",sub:"TCP 与 UDP",q:"TCP 和 UDP 的区别是什么？各自的使用场景？",ans:`**面试回答：**

| 维度 | TCP | UDP |
|------|-----|-----|
| 连接 | 面向连接（三次握手） | 无连接 |
| 可靠性 | 可靠（确认重传、排序、流量/拥塞控制） | 尽力而为，不保证 |
| 传输方式 | 字节流 | 数据报文 |
| 传输效率 | 较低（开销大） | 高（头部 8 字节） |
| 一对多 | 仅一对一 | 支持广播、多播 |

**TCP 场景**：要求准确完整的场景——网页（HTTP/HTTPS）、文件传输（FTP）、邮件（SMTP）、SSH。
**UDP 场景**：要求实时、可容忍少量丢包——视频/语音通话、直播、DNS 查询、在线游戏，以及现代的 **QUIC/HTTP3**（在 UDP 上自行实现可靠传输）。

一句话：**TCP 换可靠，UDP 换实时**。`,ana:"UDP 头只有 8 字节（TCP 至少 20 字节），这是效率高的原因之一。",keys:["面向连接","字节流 vs 数据报","实时场景"],src:"计算机网络面试题.md"},{id:"net-011",type:"essay",diff:"hard",sub:"TCP 与 UDP",q:"TCP 三次握手和四次挥手的过程？为什么是三次握手、四次挥手？",ans:`**面试回答：**

**三次握手（建立连接）**：
1. 客户端发 **SYN**（seq=x）：请求建立连接；
2. 服务端回 **SYN+ACK**（seq=y, ack=x+1）：同意并确认；
3. 客户端再发 **ACK**（ack=y+1）：连接建立。

**为什么必须三次**：双方都要确认“自己能发、对方能收、对方也能发、自己能收”。**两次不够**——若第二次就建立，服务端无法确认客户端有接收能力，且历史重复的 SYN 会让服务端白开无效连接（资源浪费）。

**四次挥手（断开连接）**：
1. 客户端发 **FIN**：我没有数据要发了；
2. 服务端回 **ACK**：知道了（此时服务端可能还有数据要发，所以先不关）；
3. 服务端发 **FIN**：我也发完了；
4. 客户端回 **ACK**，等待 **2MSL** 后进入 CLOSED。

**为什么四次**：因为 TCP 是全双工，两个方向的数据要**分别关闭**；服务端收到 FIN 后可能还有数据没发完，ACK 和 FIN 分开发，就多了一次。

**为什么等 2MSL**：确保最后一个 ACK 能到达（丢了服务端会重发 FIN），并让本连接的旧报文在网络中自然消亡，避免影响新连接。`,ana:"画时序图答题最稳。核心记忆：握手三次=确认双向收发能力；挥手四次=全双工分别关。",keys:["SYN/SYN+ACK/ACK","全双工","2MSL","半关闭"],src:"计算机网络面试题.md / 知识点快速复习指南.md"},{id:"net-012",type:"essay",diff:"hard",sub:"TCP 与 UDP",q:"TCP 如何保证可靠传输？重传、流量控制、拥塞控制分别是怎么回事？",ans:`**面试回答：**TCP 通过校验、序号、确认、重传、流控、拥塞控制六种机制保证可靠：

**1. 重传机制**：
- **超时重传**：发出数据后启动定时器，RTO 时间内没收到 ACK 就重传；
- **快速重传**：收到 **3 个重复 ACK** 就不等超时，立即重传丢失报文；
- **SACK**（选择性确认）：告诉发送方哪些段收到了，只重传真正丢失的部分。

**2. 流量控制**：**接收方**通过窗口字段（rwnd）告知自己的**接收缓冲区**剩余能力，发送方发送速度不能超过它，防止接收方被撑爆。

**3. 拥塞控制**：针对**网络整体**拥塞，发送方维护拥塞窗口（cwnd）：
- **慢启动**：指数增长（每 RTT 翻倍）直到阈值；
- **拥塞避免**：超过阈值后线性加性增大；
- **拥塞发生**：超时则阈值减半、cwnd 重置为 1 重新慢启动；快速重传则减半进入快速恢复。

**4. 其他**：校验和（检错）、序列号（排序去重）、确认应答（ARQ）。

一句话：**流量控制怕压垮接收方，拥塞控制怕压垮网络**。`,ana:"三次重复 ACK 触发快速重传、cwnd 慢启动指数→拥塞避免线性，两个数字细节是加分项。",keys:["超时/快速重传","滑动窗口","慢启动","拥塞避免"],src:"计算机网络面试题.md"},{id:"net-013",type:"essay",diff:"medium",sub:"TCP 与 UDP",q:"TCP 粘包是怎么回事？如何处理？为什么 UDP 不会粘包？",ans:`**面试回答：**

**粘包本质**：TCP 是**字节流协议，没有消息边界**。发送方多次写入的数据可能被合并成一个报文段发送（Nagle 算法），接收方也可能一次读到多个逻辑消息或半条消息。“粘包”不是 TCP 的 bug，而是**应用层没有定义消息边界**。

**处理方式（在应用层定义边界）**：
1. **固定长度**：每条消息定长，不足补齐；
2. **分隔符**：如 \\r\\n 分隔（HTTP 头、Redis 协议的做法）；
3. **长度前缀**：消息头带上消息体长度，先读长度再读内容（最通用，RPC 框架常用）。

**为什么 UDP 不粘包**：UDP 是**数据报协议**，每个 UDP 数据报有**天然边界**，发送几次就接收几个独立报文，应用层一次 recv 拿到一条完整消息（可能丢失或乱序，但不会粘连）。

前端关联：WebSocket 消息有帧边界，SSE 用空行分隔 event，也是“定义消息边界”的思路。`,ana:"关键词：字节流无边界、Nagle、长度前缀。UDP 面向报文保留边界。",keys:["字节流无边界","长度前缀","UDP 面向报文"],src:"计算机网络面试题.md"},{id:"net-014",type:"essay",diff:"medium",sub:"WebSocket",q:"对 WebSocket 的理解？它和 HTTP 是什么关系？",ans:`**面试回答：**WebSocket 是一种在**单个 TCP 连接上全双工通信**的协议。

**与 HTTP 的关系**：
- 握手阶段借用 HTTP：客户端发带 \`Upgrade: websocket\`、\`Connection: Upgrade\` 头的 GET 请求，服务端返回 **101 Switching Protocols** 表示协议升级成功；
- 升级后不再走 HTTP 报文格式，双方都可以**主动推送**消息；
- 默认端口同为 80/443（ws/wss，wss 是 TLS 加密）。

**特点**：
1. **全双工**：服务端可主动推送，客户端可随时发送；
2. **低延迟低开销**：没有 HTTP 每次请求的头开销，帧很小；
3. **长连接**：需要心跳保活（ping/pong）与断线重连机制。

**适用场景**：聊天室、协同编辑、实时行情、游戏、工作流节点运行状态推送。我在农担项目的工作流调试链路用 WebSocket 承接 node_run、stream_msg 等事件，前端按 category/type 分发更新 UI 状态。`,ana:"101 状态码是握手的关键；“HTTP 只能请求-响应，WS 双向主动”是本质区别。",keys:["全双工","101 协议升级","wss","心跳保活"],src:"计算机网络面试题.md / 农担重点逻辑.md"},{id:"net-015",type:"essay",diff:"medium",sub:"WebSocket",q:"即时通讯的实现方式：短轮询、长轮询、SSE 和 WebSocket 有什么区别？",ans:`**面试回答：**

1. **短轮询**：客户端定时发 HTTP 请求问“有没有新消息”。实现简单，但大量无效请求、实时性差、服务端压力大；
2. **长轮询**：请求发出后**服务端挂起**，有数据或超时才响应，客户端收到后立即再发起。比短轮询省请求，但每次仍要重新建连，服务端要维护挂起连接；
3. **SSE**（Server-Sent Events）：基于 HTTP 的**服务端单向推送**，本质是一个 \`Content-Type: text/event-stream\` 的长期 HTTP 响应，消息用 event/data 字段组织，浏览器 EventSource 原生支持、**自带断线重连**；缺点是**单向**（客户端只能靠额外请求发数据）、EventSource 只支持 GET；
4. **WebSocket**：独立协议，握手升级后**全双工**，双方都能主动发消息，开销最小、能力最强，但需要服务端单独实现协议。

**选型**：
- 只需要服务端→客户端的文本流（AI 流式输出、通知、日志）：**SSE 最轻**；
- 需要双向高频交互（聊天、协同编辑、节点状态）：**WebSocket**。

补充：AI 对话里常用 **fetch + ReadableStream 模拟 SSE 读取**，优点是能用 POST、自定义请求头、配合 AbortController 中断。`,ana:"四方案按“实时性/方向/开销”三维对比。SSE 优点：轻量、走 HTTP 基础设施、自动重连。",keys:["短轮询","长轮询","text/event-stream","全双工"],src:"计算机网络面试题.md / 收集的面试知识点.md / 知识点快速复习指南.md"},{id:"net-016",type:"judge",diff:"medium",sub:"WebSocket",q:"SSE 基于 HTTP 协议实现，浏览器原生 EventSource 会在连接断开后自动重连，但原生 EventSource 只能发起 GET 请求。",ans:!0,ana:"SSE 的响应 Content-Type 为 text/event-stream，EventSource 自带 Last-Event-ID 重连机制。限制：只支持 GET、无法自定义 header（如带 token 常改用 query 或 cookie）。需要 POST/复杂请求时，用 fetch + ReadableStream 手动读取流，配合 AbortController 实现停止生成。",keys:["text/event-stream","自动重连","fetch + ReadableStream"],src:"收集的面试知识点.md / 知识点快速复习指南.md"},{id:"net-017",type:"essay",diff:"medium",sub:"HTTP 协议",q:"HTTP 请求报文和响应报文的结构是什么样的？与缓存相关的请求头有哪些？",ans:`**面试回答：**

**请求报文**：
\`\`\`
请求行：方法 URL 版本       →  GET /api/users HTTP/1.1
请求头：Host、User-Agent、Content-Type、Authorization、Cookie...
空行
请求体：POST/PUT 携带的数据
\`\`\`

**响应报文**：
\`\`\`
状态行：版本 状态码 短语    →  HTTP/1.1 200 OK
响应头：Content-Type、Cache-Control、ETag、Set-Cookie...
空行
响应体：HTML/JSON/图片等
\`\`\`

**缓存相关请求头**：
- **强缓存验证**：Cache-Control（max-age/no-cache/no-store）、Expires、Pragma（旧）；
- **协商缓存验证**：If-None-Match（配合响应头 ETag）、If-Modified-Since（配合 Last-Modified）；
- 其他：If-Match、If-Range（断点续传）。

注意：If-None-Match/If-Modified-Since 是**请求头**，ETag/Last-Modified 是**响应头**，配对使用。`,ana:"no-cache 是“可以缓存但必须协商验证”，no-store 是“完全不缓存”，两者区别易考。",keys:["请求行/状态行","If-None-Match","Cache-Control"],src:"计算机网络面试题.md"},{id:"net-018",type:"single",diff:"easy",sub:"HTTP 协议",q:"OPTIONS 请求方法的主要使用场景是什么？",opts:["下载文件","CORS 跨域预检请求，询问服务器允许的方法和请求头","删除资源","长轮询等待消息"],ans:"B",ana:"OPTIONS 用于“询问服务器支持哪些方法/请求头”，最常见于 **CORS 预检**：复杂请求（自定义头、application/json、非简单方法）发出前，浏览器先发 OPTIONS 预检，服务端返回 Access-Control-Allow-Methods/Headers/Origin，通过后才发正式请求。预检结果可用 Access-Control-Max-Age 缓存减少 OPTIONS 次数。",keys:["预检请求","Access-Control-*","Max-Age 缓存"],src:"计算机网络面试题.md"},{id:"net-019",type:"essay",diff:"easy",sub:"网络模型",q:"OSI 七层模型和 TCP/IP 五层协议分别是什么？从输入 URL 发请求涉及哪些层？",ans:`**面试回答：**

**OSI 七层**（理论模型，自上而下）：
应用层 → 表示层 → 会话层 → 传输层 → 网络层 → 数据链路层 → 物理层

**TCP/IP 五层**（实用模型）：
1. **应用层**：HTTP、HTTPS、DNS、FTP——为应用提供服务；
2. **传输层**：TCP、UDP——端到端可靠/高效传输；
3. **网络层**：IP、ICMP——路由寻址，把数据包送到目标主机；
4. **数据链路层**：以太网、ARP——相邻节点传输帧；
5. **物理层**：比特流传输。

**一次 HTTP 请求的封装过程**：应用层生成 HTTP 报文 → 传输层加 TCP 头（端口）→ 网络层加 IP 头（地址）→ 链路层加以太网帧头（MAC）→ 物理层转比特流发送；接收方逐层解封装。ARP 协议用于把 IP 解析为 MAC 地址。

面试讲清楚“七层是理论参考、五层是实际落地”即可。`,ana:"顺带记：交换机工作在链路层、路由器工作在网络层。",keys:["七层 vs 五层","封装解封装","ARP"],src:"计算机网络面试题.md"},{id:"net-020",type:"multiple",diff:"medium",sub:"HTTP 状态码",q:"下列哪些状态码表示**重定向**（3xx）？（多选）",opts:["301","304","307","502"],ans:["A","C"],ana:"3xx 是重定向：301 永久重定向、302 临时重定向、303 必须改用 GET、307 临时重定向且不允许改变请求方法、308 永久且不改方法。**304 Not Modified 属于缓存协商成功**（不算重定向，浏览器继续用本地缓存）；502 是网关错误（5xx 服务端错误）。401 vs 403 也常一起考：未认证 vs 已认证但无权限。",keys:["3xx 重定向","304 协商缓存","307 不改方法"],src:"计算机网络面试题.md / 一些高频率考点.md"},{id:"net-021",type:"multiple",diff:"easy",sub:"TCP 与 UDP",q:"关于 TCP 和 UDP 的使用场景，下列说法正确的有哪些？（多选）",opts:["网页 HTTP/HTTPS、文件传输适合 TCP（要求可靠）","视频通话、直播、DNS 查询适合 UDP（要求实时）","UDP 保证数据不丢失且有序到达","QUIC（HTTP/3）基于 UDP 实现可靠传输"],ans:["A","B","D"],ana:"TCP 面向连接、可靠、字节流，适合准确性优先的场景；UDP 无连接、头部仅 8 字节、效率高，适合实时性优先、可容忍少量丢包的场景。UDP **不保证**可靠和有序（这正是选项 C 错误的原因）。QUIC/HTTP3 在 UDP 之上自行实现了可靠传输、流级别独立重传和连接迁移。",keys:["TCP 可靠优先","UDP 实时优先","QUIC"],src:"计算机网络面试题.md"}],Sa=[{id:"vue-001",type:"essay",diff:"medium",sub:"响应式原理",q:"说一下 Vue 的基本原理和双向数据绑定的实现。",ans:`**面试回答：**

**Vue 的基本原理**：Vue 是一套**响应式驱动的渐进式框架**。核心是一个**观察者模式**的闭环：

1. **数据劫持**：初始化时对 data 递归遍历，用 Object.defineProperty（Vue2）/ Proxy（Vue3）把每个属性转成 getter/setter；
2. **依赖收集**：组件渲染时，渲染 Watcher 读取数据触发 **getter**，把当前 Watcher 收集到该属性的依赖（Dep）中；
3. **派发更新**：数据变化触发 **setter**，通知 Dep 中收集的所有 Watcher，执行组件的更新（重新渲染 + Diff）。

**双向数据绑定（v-model）**：由两部分组成——
- 数据 → 视图：响应式系统 + 模板编译，数据变化自动更新 DOM；
- 视图 → 数据：监听表单元素的 input/change 事件，把用户输入赋回数据。

所以 v-model 本质是\`:value + @input\` 的**语法糖**（自定义组件上是 modelValue prop + update:modelValue 事件）。`,ana:"答题闭环：劫持 → 收集依赖 → 派发更新。v-model 是语法糖是必答点。",keys:["defineProperty/Proxy","依赖收集","派发更新","v-model 语法糖"],src:"Vue框架面试题.md"},{id:"vue-002",type:"essay",diff:"medium",sub:"响应式原理",q:"Vue2 使用 Object.defineProperty 做数据劫持有什么缺点？Vue3 为什么要换 Proxy？",ans:`**面试回答：**

**Object.defineProperty 的缺点**：
1. **无法监听新增/删除属性**：劫持在初始化时完成，后续新加属性没有 getter/setter，所以需要 \`Vue.set / Vue.delete\`；
2. **无法监听数组下标和 length 变化**：Vue2 通过**重写数组原型方法**（push/pop/splice 等 7 个）曲线实现监听，直接 \`arr[0] = x\` 或 \`arr.length = 0\` 依然无效；
3. **需要递归遍历初始化**：深层对象要一次性递归劫持，初始化开销大；
4. 只能劫持已知属性，扩展性差。

**Proxy 的优势**：
1. **代理整个对象**：拦截 get/set/deleteProperty/has/ownKeys 等 13 种操作，新增、删除属性和数组变化都能自动感知；
2. **惰性代理**：访问到深层属性时才代理（性能更好，初始化更快）；
3. 原生支持 Map/Set/WeakMap/WeakSet；
4. Vue3 配合 Reflect 保证 getter/setter 中 this 指向正确。

**一句话**：Proxy 从“劫持属性”升级为“代理对象”，监听覆盖更完整、性能更好、扩展性更强。`,ana:"Vue3 ref 的 .value 设计原因可追问：基本类型无法被 Proxy 代理，需要容器对象包裹。",keys:["Vue.set","数组重写方法","Proxy 13 种拦截","惰性代理"],src:"Vue框架面试题.md / 前端面试八股文.md / 一些高频率考点.md"},{id:"vue-003",type:"single",diff:"medium",sub:"响应式原理",q:"Vue3 中给 reactive 对象新增一个属性，视图会自动更新吗？换成 Vue2 呢？",opts:["都会自动更新","Vue3 会更新（Proxy 代理整个对象），Vue2 不会（需要 Vue.set 或替换整个对象）","Vue3 不会，Vue2 会","都不会，必须手动 $forceUpdate"],ans:"B",ana:"Vue2 的 defineProperty 在初始化后无法感知新增属性，需要 Vue.set(target, key, value)（内部调用 defineReactive 并手动触发依赖通知）或用新对象替换。Vue3 的 Proxy 在 set 拦截器中天然处理新增/删除属性，直接赋值即响应。",keys:["Proxy 新增属性","Vue.set 原理"],src:"Vue框架面试题.md / 一些高频率考点.md"},{id:"vue-004",type:"essay",diff:"medium",sub:"响应式原理",q:"Vue3 的 ref 和 reactive 有什么区别？分别的使用场景？",ans:`**面试回答：**

- **reactive**：接收对象/数组，返回 **Proxy 代理对象**。不能用于基本类型；**不能整体替换引用**（替换后失去响应式）；解构会丢失响应性（要用 toRefs）；
- **ref**：创建一个带 \`value\` 属性的**包装对象**，可以包装**任何类型**（包括基本类型和对象）；在脚本中通过 \`.value\` 读写，在模板中自动解包。

**为什么 ref 需要 .value**：基本类型（number/string）没有属性可被 Proxy 代理，只能通过容器对象统一拦截读写。

**使用场景**：响应式**原始值**（计数、开关、字符串状态）必须用 ref；响应式**复杂对象**优先 reactive，语法更简洁。实际项目中很多团队会统一风格，比如全部用 ref，避免心智负担。

**computed/watch/nextTick**：computed 有缓存、依赖变化才重算；watch 显式监听数据执行副作用；nextTick 在下次 DOM 更新循环结束后执行回调，用于“改数据后读 DOM”。`,ana:"Vue2/3 对比表格（响应式/组织方式/性能/TS 支持）是知识点快速复习指南的推荐答法。",keys:["ref 包装对象","reactive 代理",".value 原因","toRefs"],src:"前端面试八股文.md / 知识点快速复习指南.md"},{id:"vue-005",type:"essay",diff:"easy",sub:"Vue 基础",q:"MVVM、MVC、MVP 的区别是什么？",ans:`**面试回答：**

- **MVC**：Model（数据）- View（视图）- Controller（逻辑中转）。用户操作由 Controller 处理，更新 Model 后手动同步 View。前后端分离前的前端框架（jQuery 时代）多属此类，视图和数据要手动同步；
- **MVP**：Presenter 替代 Controller，负责从 Model 取数据并**手动调用** View 的接口更新视图，View 与 Model 完全解耦，但 Presenter 容易臃肿；
- **MVVM**：Model-View-**ViewModel**，核心是**数据双向绑定**：ViewModel 监听 Model 变化自动更新 View，监听 View 输入自动更新 Model，开发者只需关心数据。

**MVVM 的优缺点**：优点是低耦合、可复用、自动同步，开发效率高；缺点是调试成本高（数据驱动的 Bug 定位链路长）、大项目中 View 状态绑定过多会导致性能和可读性问题。

Vue 就是 MVVM 思想的典型实现：Vue 实例充当 ViewModel。`,ana:"关键词：MVVM 的 V 与 VM 自动绑定，MVC/MVP 需要手动同步视图。",keys:["ViewModel","双向绑定","低耦合"],src:"Vue框架面试题.md"},{id:"vue-006",type:"essay",diff:"easy",sub:"Vue 基础",q:"computed 和 watch、methods 分别有什么区别？",ans:`**面试回答：**

- **computed（计算属性）**：基于**依赖的响应式数据**计算，有**缓存**——依赖不变时多次访问返回缓存结果，不重复计算。适合模板中展示的派生数据（如全名、过滤后的列表、合计金额）；
- **watch（侦听器）**：监听指定数据**执行副作用**，无缓存概念，可以执行异步操作、请求接口、深度监听（deep）、立即执行（immediate）。适合“数据变化后做某事”（如路由参数变化重新请求）；
- **methods**：每次调用都执行，无缓存。适合事件处理函数和不需要缓存的计算。

**选型口诀**：模板派生值用 computed；变化后要干副作用的事用 watch；事件回调用 methods。computed 的 getter 必须是同步纯函数。`,ana:"Vue3 中 computed/setUp 中 watchEffect（自动追踪依赖、立即执行）与 watch（显式依赖）的区别也是延伸点。",keys:["computed 缓存","watch 副作用","watchEffect"],src:"Vue框架面试题.md / 知识点快速复习指南.md"},{id:"vue-007",type:"essay",diff:"medium",sub:"Vue 基础",q:"Vue2 和 Vue3 有哪些区别？",ans:`**面试回答：**按维度对比：

| 维度 | Vue 2 | Vue 3 |
|------|-------|-------|
| 响应式 | Object.defineProperty 劫持属性 | Proxy 代理整个对象 |
| 数组/新增属性 | 有监听限制，需要 Vue.set | 天然支持 |
| 组织方式 | Options API（data/methods/watch 分散） | Composition API（setup，逻辑按功能组合） |
| 逻辑复用 | mixin（命名冲突、来源不清晰） | 组合式函数（hooks），复用清晰 |
| 性能 | 组件粒度更新 | 编译优化：静态提升、PatchFlag、区块树，更新更精细 |
| TypeScript | 支持成本较高 | 源码 TS 重写，类型推导友好 |
| 新特性 | - | Fragment、Teleport、Suspense、多个 v-model |

**Composition API 的价值**：同一功能的响应式数据、计算属性、方法写在一起，逻辑复用从 mixin 变成函数调用，避免了命名冲突和“跳来跳去找代码”的问题。`,ana:"静态提升（static hoisting）、patchFlag（标记动态节点）是编译优化的细节加分点。",keys:["Proxy","Composition API","静态提升","Fragment"],src:"一些高频率考点.md / 知识点快速复习指南.md / 收集的面试知识点.md"},{id:"vue-008",type:"essay",diff:"medium",sub:"Vue 基础",q:"v-if 和 v-show 有什么区别？v-if 和 v-for 同时使用时哪个优先级高？",ans:`**面试回答：**

**v-if vs v-show**：
- **v-if**：**真正创建/销毁**组件与 DOM，切换开销大；惰性——初始条件为假时不渲染；适合**低频切换**且初始可能不显示的场景；
- **v-show**：只切换 \`display: none\`，DOM 始终渲染，初始渲染开销大但**切换开销小**；适合**高频切换**（如 Tab 面板、悬浮提示）；
- v-if 可以配合 template 使用并带动 v-else/v-else-if；v-show 不能用在 template 上。

**v-if 与 v-for 优先级**：**Vue2 中 v-for 优先级更高**（v-for 的每一项都会执行 v-if 判断，浪费性能）；**Vue3 中 v-if 优先级更高**（v-if 里无法访问 v-for 的变量，混用会报错）。**两个版本都不建议同时用在同一元素上**：正确做法是先用 computed 过滤数据，或者把 v-if 提到外层 template。`,ana:"v-for + v-if 的正确写法（computed 过滤）是“如果同时出现，应如何优化”的答案。",keys:["创建销毁 vs display","Vue2 v-for 优先","Vue3 v-if 优先"],src:"Vue框架面试题.md / 知识点快速复习指南.md"},{id:"vue-009",type:"essay",diff:"medium",sub:"组件基础",q:"slot 是什么？作用域插槽的原理是什么？",ans:'**面试回答：**slot（插槽）是 Vue 实现**内容分发**的机制，让父组件向子组件指定位置传入模板内容，子组件保留结构、父组件决定内容。\n\n**三类插槽**：\n1. **默认插槽**：`<slot>` 占位，父组件内容填入；\n2. **具名插槽**：`<slot name="header">` + `<template #header>`，多位置分发；\n3. **作用域插槽**：子组件把内部数据通过 `<slot :item="item">` 传出来，父组件用 `#default="{ item }"` 接收，实现“**内容在父组件定义，数据来自子组件**”。\n\n**原理**：插槽内容会被编译成函数（scoped slot 是返回 vNode 的函数），存放在子组件实例的 $slots 中；子组件渲染时调用对应函数并传入作用域数据。组件复用时不同实例可以渲染完全不同的插槽内容。\n\n使用场景：表格列自定义渲染、卡片组件底部操作区、列表项模板。',ana:"作用域插槽一句话：数据 child 提供，样式 parent 决定。",keys:["内容分发","具名插槽","作用域插槽","编译成函数"],src:"Vue框架面试题.md"},{id:"vue-010",type:"essay",diff:"medium",sub:"组件基础",q:"keep-alive 是什么？缓存的是什么？相关的生命周期有哪些？",ans:`**面试回答：**keep-alive 是 Vue 的**内置抽象组件**，用于缓存组件实例，避免切换时重复创建销毁，保留组件状态。

**缓存的是什么**：不是 DOM，而是**组件实例（vnode + 组件状态）**——数据、计算属性、DOM 状态都保留。实现上用缓存 Map 以组件的 key/组件名为 key 存 vnode，命中缓存时直接复用，配合 LRU 策略（include/exclude/max 控制缓存范围和上限）。

**生命周期**：被 keep-alive 包裹的组件激活/停用时触发 \`activated\` / \`deactivated\`，代替反复的 mounted/unmounted。Vue Router 中配合同一路由组件缓存列表页状态。

**注意点**：
1. 缓存的状态可能不是最新的，需要在 activated 中刷新数据；
2. include/exclude 用组件 name 匹配；
3. 过度缓存会占用内存，只缓存列表页这类有状态页面。`,ana:"LRU 缓存淘汰策略（最多 max 个，淘汰最久未访问）是实现层的加分细节。",keys:["组件实例缓存","activated/deactivated","include/exclude","LRU"],src:"Vue框架面试题.md / 知识点快速复习指南.md"},{id:"vue-011",type:"essay",diff:"medium",sub:"组件基础",q:"$nextTick 的原理和作用是什么？data 中对象新增属性会发生什么？",ans:`**面试回答：**

**$nextTick**：
- **作用**：在**下次 DOM 更新循环结束之后**执行回调，常用于“修改数据后需要读取/操作更新后的 DOM”的场景（读取尺寸、聚焦输入框、初始化图表）；
- **原理**：Vue 的 DOM 更新是**异步批量**的——数据变化后 Watcher 不会立即渲染，而是把更新推入队列，在 nextTick 的回调时机统一执行（微任务 Promise.then，降级方案 setImmediate/MessageChannel/setTimeout）。$nextTick 就是把回调插到这个更新队列之后，保证 DOM 已更新。

**data 中给对象新增属性**（Vue2）：新增属性没有 getter/setter，**不会触发视图更新**。解决方式：\`Vue.set(obj, key, value)\`、\`this.$forceUpdate()\`（强制重渲染，不推荐）、或预先在 data 中声明所有属性 / 整体替换对象。Vue3 的 Proxy 天然支持新增属性。`,ana:"nextTick 回答闭环：异步批量更新（性能）→ nextTick 保证时序。",keys:["异步批量更新","微任务","Vue.set"],src:"Vue框架面试题.md"},{id:"vue-012",type:"essay",diff:"medium",sub:"组件基础",q:"为什么组件的 data 必须是一个函数？子组件可以直接修改父组件的数据吗？",ans:`**面试回答：**

**data 为什么是函数**：组件是**可复用**的实例。如果 data 是对象，所有实例会**共享同一个对象引用**，一个实例修改数据会影响所有实例（类似引用类型的赋值）。写成函数，每次创建组件时返回一个**全新的独立数据副本**，实例间互不影响。根实例只创建一次，所以可以用对象。

**子组件能否直接改父组件数据**：不能。Vue 的数据流是**单向的**（props 向下、事件向上），直接修改 props 会破坏数据流向、让状态变化难以追踪，Vue 也会警告。正确做法：
1. 子组件通过 \`$emit\` 事件让父组件修改；
2. Vue3 的 v-model 双向绑定（modelValue + update:modelValue）；
3. 对象/数组类型的 props 内容变化可以“生效”，但那是修改了父组件的数据源，不是修改 props 本身，属于反模式；
4. props 传引用类型时子组件“能改内容但不能改引用”，同样不建议。`,ana:"追问 extend：Vue.extend 创建组件构造器时同样依赖 data 函数保证独立状态。",keys:["实例隔离","单向数据流","$emit"],src:"Vue框架面试题.md"},{id:"vue-013",type:"essay",diff:"easy",sub:"生命周期",q:"说一下 Vue 的生命周期，created 和 mounted 的区别是什么？请求一般发在哪个阶段？",ans:"**面试回答：**\n\n**Vue3 组合式 API 的顺序**：\n`setup` → `onBeforeMount` → `onMounted` → `onBeforeUpdate` → `onUpdated` → `onBeforeUnmount` → `onUnmounted`\n\n（对应 Vue2 的 beforeCreate/created/beforeMount/mounted/beforeUpdate/updated/beforeDestroy/destroyed）\n\n**created vs mounted**：\n- **created**：实例创建完成，**data/methods 可用，DOM 还没渲染**；\n- **mounted**：**DOM 已挂载**，可以访问 $el、初始化依赖 DOM 的第三方库（图表、编辑器）。\n\n**请求时机**：一般放在 **created（或 setup）**——更早拿到数据减少等待，且 SSR 场景只有 created 支持；如果请求结果需要依赖 DOM（如基于容器尺寸绘图）或需要 $nextTick 后操作，则放 mounted。**不要在 updated 里发请求或改数据**，容易触发循环更新。\n\n**onUnmounted 必须清理**：定时器、事件监听、SSE/WebSocket 连接、Observer 实例。",ana:"父子组件生命周期顺序：父 beforeMount → 子 mounted → 父 mounted（挂载阶段子组件先完成）。",keys:["created 无 DOM","mounted 可操作 DOM","onUnmounted 清理"],src:"Vue框架面试题.md / 知识点快速复习指南.md"},{id:"vue-014",type:"single",diff:"medium",sub:"生命周期",q:"Vue 中父组件渲染包含子组件时，mounted 的执行顺序是？",opts:["父组件 mounted 先于子组件 mounted","子组件 mounted 先于父组件 mounted","同时执行","随机顺序"],ans:"B",ana:"挂载阶段顺序为：父 created → 父 beforeMount → 子 created → 子 beforeMount → 子 mounted → **父 mounted**。父组件的 mounted 要等所有子组件挂载完成才触发。销毁阶段相反：父 beforeUnmount → 子 beforeUnmount → 子 unmounted → 父 unmounted。",keys:["子先挂载完成","父 mounted 收尾"],src:"Vue框架面试题.md"},{id:"vue-015",type:"essay",diff:"easy",sub:"组件通信",q:"Vue 组件之间有哪些通信方式？分别适用什么场景？",ans:`**面试回答：**按关系分类：

1. **父子**：父传子用 **props**；子传父用 **$emit** 事件；父访问子用 **ref / $refs**；子访问父用 **$parent**；
2. **跨层级（祖孙）**：**provide / inject**（祖先 provide，后代 inject），适合主题、国际化等；深层嵌套避免 props 逐层传递（props drilling）；
3. **任意组件（全局）**：**Pinia / Vuex** 状态管理，适合共享的业务状态；
4. **兄弟组件**：状态提升到共同父组件，或直接用 Pinia；
5. **事件总线 EventBus**（$emit/$on 的 mitt）：只适合**少量、明确的跨组件通知**，不要替代正常状态管理，事件多了难以追踪；
6. **$attrs / $listeners**（Vue3 合并为 $attrs）：透传未声明的属性与事件，封装二次包装组件常用；
7. v-model：父子双向绑定的语法糖。

**原则**：props/emit 是首选，跨层用 provide/inject，全局共享用 Pinia，避免滥用总线导致数据流混乱。`,ana:"Vue3 移除了 $children 和 $on/$off（EventBus 需用 mitt）。",keys:["props/$emit","provide/inject","Pinia","$attrs 透传"],src:"Vue框架面试题.md / 问答类型面试题.md / 知识点快速复习指南.md"},{id:"vue-016",type:"single",diff:"medium",sub:"组件通信",q:"在祖先组件 provide 了主题数据，深层子孙组件最合适的接收方式是？",opts:["每层组件都用 props 逐层传递","inject 注入祖先 provide 的数据","用 $children 遍历查找","把主题写到 window 上"],ans:"B",ana:"provide/inject 就是解决跨层级依赖注入的：祖先 provide 数据/方法，任意后代 inject 直接获取，避免 props drilling。注意 provide 的响应式要传 ref/computed（Vue3），且它更适合“低频变更的全局配置”，不是替代状态管理。",keys:["provide/inject","依赖注入","props drilling"],src:"Vue框架面试题.md"},{id:"vue-017",type:"essay",diff:"medium",sub:"Vue Router",q:"路由的 hash 模式和 history 模式有什么区别？history 模式刷新需要服务端配置什么？",ans:`**面试回答：**

**hash 模式**：
- URL 带 \`#\`，如 \`/#/user?id=1\`；
- 原理：监听 \`hashchange\` 事件，hash 变化**不会向服务器发请求**；
- 优点：**刷新无需服务端配置**、部署简单；缺点：URL 不美观、SEO 弱（锚点语义冲突）。

**history 模式**：
- URL 自然无 #，基于 **History API**（pushState/replaceState）+ \`popstate\` 事件；
- 刷新或直接访问非根路径时浏览器会**向服务器请求该路径**，服务器没有对应文件就 404——所以需要服务端把所有路由回退到 index.html：
\`\`\`nginx
location / {
  try_files $uri /index.html;
}
\`\`\`

**$route vs $router**：$router 是路由器实例（push/replace/back，编程式导航）；$route 是当前路由信息对象（params/query/path/meta）。

**params vs query**：params 配合动态路由 /user/:id，刷新可能丢失（不写进 path 时）；query 是 ?key=value，保留在 URL 中。`,ana:"动态权限路由追问：登录拿权限 → 过滤路由表 → router.addRoute 动态注册 → 首次跳转处理 → 退出时重置。",keys:["hashchange","pushState","try_files","$route/$router"],src:"Vue框架面试题.md / 问答类型面试题.md / 知识点快速复习指南.md"},{id:"vue-018",type:"essay",diff:"medium",sub:"Vue Router",q:"Vue Router 有哪些导航守卫？路由懒加载怎么实现？",ans:"**面试回答：**\n\n**导航守卫分三类**：\n1. **全局**：`beforeEach`（鉴权、登录校验、动态路由注册）、`beforeResolve`、`afterEach`（设置页面标题、埋点）；\n2. **路由独享**：路由配置里的 `beforeEnter`；\n3. **组件内**：`beforeRouteEnter`（beforeEnter 之前调用，此时实例未创建，要通过 next 回调访问 this）、`beforeRouteUpdate`（同组件路由参数变化）、`beforeRouteLeave`（离开确认，如未保存表单）。\n\n**守卫与生命周期关系**：完整顺序是 beforeEach → beforeEnter → 组件内守卫 → 全局 beforeResolve → 导航确认 → afterEach → 组件 beforeCreate/created → beforeMount → beforeRouteEnter 的 next 回调 → mounted。\n\n**路由懒加载**：把组件写成动态 import，构建时自动代码分割成独立 chunk，进入路由才加载：\n```js\nconst routes = [\n  { path: '/about', component: () => import('../views/About.vue') },\n]\n```\n配合 webpackChunkName 注释可以命名分包。这是首屏加载优化的标准手段。",ana:"beforeRouteEnter 中访问实例用 next(vm => {...})，因为组件创建前调用。",keys:["beforeEach 鉴权","beforeRouteUpdate","动态 import 分包"],src:"Vue框架面试题.md"},{id:"vue-019",type:"essay",diff:"medium",sub:"状态管理",q:"说一下 Vuex 的原理和核心属性。action 和 mutation 的区别是什么？为什么 mutation 不能做异步操作？",ans:`**面试回答：**

**Vuex 原理**：Vuex 利用 Vue 实例的响应式系统，把 state 作为**响应式数据**集中存储在 Store 中，组件通过 computed 读取（依赖收集），通过 dispatch/commit 修改（统一入口），保证状态变化可追踪。插件 devtools 通过订阅 mutation 记录状态快照实现时间旅行调试。

**五个核心属性**：
- **state**：单一状态树；**getters**：派生计算（类似 computed，有缓存）；
- **mutations**：**同步**修改 state 的唯一入口；**actions**：提交 mutation，可包含**异步**操作；
- **modules**：模块化拆分（命名空间 namespaced）。

**action vs mutation**：mutation 直接改 state 且必须同步；action 处理异步/业务逻辑后 commit mutation。devtools 只能快照同步 mutation，**异步放在 mutation 里会让状态变化时机不可追踪、devtools 无法记录**，所以 mutation 必须同步。

**Vuex vs localStorage**：Vuex 是内存中的响应式运行时状态（刷新丢失），localStorage 是持久化存储（无响应式）；两者配合可实现状态持久化。

**Vuex vs Pinia**：Pinia 更轻、天然 TS 支持、无 mutation（action 直接改）、支持组合式写法，是 Vue3 官方推荐。`,ana:"Redux 和 Vuex 共同思想：单一数据源、状态可预测、集中管理。区别：Redux 单向数据流更严格、中间件生态（thunk/saga）、immutable。",keys:["单一状态树","同步 mutation","devtools 快照","Pinia 对比"],src:"Vue框架面试题.md / 收集的面试知识点.md"},{id:"vue-020",type:"essay",diff:"easy",sub:"Vue 基础",q:"对 SPA 单页应用的理解？优缺点是什么？",ans:`**面试回答：**SPA（Single Page Application）只有一张 HTML 页面，跳转时**不重新请求整页**，由前端路由切换视图、按需加载 JS。

**优点**：
1. 用户体验好，页面切换无刷新、流畅；
2. 前后端职责分离，后端只提供 API；
3. 组件化开发、状态共享方便；
4. 可以做过渡动画、局部更新。

**缺点**：
1. **首屏加载慢**：首次要加载整包 JS/CSS（可用路由懒加载、代码分割缓解）；
2. **SEO 不友好**：内容靠 JS 渲染，爬虫抓取困难（可用 SSR/预渲染解决）；
3. 前进后退路由管理复杂（需要 History API / hash 方案）；
4. 对 JS 质量要求高，容易内存泄漏（切换页面时要清理副作用）。

与之相对的 MPA 多页应用每次跳转都重新请求整页，首屏快、SEO 好，但体验割裂。`,ana:"SPA 缺点要紧跟对应解法：懒加载/分包 → 首屏慢；SSR/预渲染 → SEO。",keys:["无刷新切换","首屏慢","SEO 弱","SSR"],src:"Vue框架面试题.md"},{id:"vue-021",type:"essay",diff:"medium",sub:"虚拟 DOM 与 Diff",q:"对虚拟 DOM 的理解？虚拟 DOM 一定比直接操作真实 DOM 性能好吗？",ans:`**面试回答：**

**虚拟 DOM**：用 JS 对象描述真实 DOM 结构（标签、属性、子节点、key），如 \`{ tag: "div", props: {...}, children: [...] }\`。

**解析过程**：模板编译 → render 函数 → 生成虚拟 DOM 树 → 数据变化时生成**新树** → **Diff 算法**对比新旧两棵树的最小差异 → **patch** 只更新变化的真实 DOM。

**为什么引入虚拟 DOM**：
1. **减少手动 DOM 操作**，声明式开发；
2. **批量、最小化更新**，避免频繁回流重绘；
3. **跨平台**：虚拟 DOM 是 JS 对象，可以渲染到 Web DOM、SSR 字符串、原生组件（React Native、Weex）；
4. 提供组件化抽象的基础。

**性能是否一定更好**：**不一定**。虚拟 DOM 有生成和 Diff 的 JS 计算开销；直接手写精准的 DOM 操作理论上更快。虚拟 DOM 的价值在于**在可维护性和性能之间取得平衡**：它保证“不写手动优化的前提下也足够快”（中上水平），把开发者从精细 DOM 操作中解放出来。内容大量变化、无法预知更新位置的场景，虚拟 DOM 优势明显。`,ana:"标准答案：虚拟 DOM 性能不是最快，是“保底不差”，同时换来声明式与跨平台。",keys:["JS 对象描述 DOM","Diff + patch","跨平台","保底性能"],src:"Vue框架面试题.md / React框架面试题.md / 收集的面试知识点.md"},{id:"vue-022",type:"essay",diff:"hard",sub:"虚拟 DOM 与 Diff",q:"Vue 的 Diff 算法是如何工作的？有哪些核心优化策略？为什么不建议用 index 作为 key？",ans:`**面试回答：**

**Diff 的工作方式**：
1. 只做**同层级比较**，不跨层对比（跨层移动视为删除+重建）；
2. 新旧节点标签或 key 不同，直接**替换**整棵子树；
3. 相同节点则复用，对比 props 更新，再递归比较子节点。

**Vue2 的双端 Diff**：维护新旧列表的**头尾四个指针**，每次循环从“旧头新头、旧尾新尾、旧头新尾、旧尾新头”四种匹配尝试，找到可复用节点就移动指针，都不匹配再按 key 查找。减少节点移动次数。

**Vue3 的快速 Diff**：预处理——先从头同步比较相同前缀、从尾同步比较相同后缀，中间部分基于**最长递增子序列（LIS）**计算最少 DOM 移动。

**key 的作用与 index 的问题**：key 是节点的**唯一身份标识**，帮助 Diff 正确判断“复用还是重建”。
用 **index 作 key** 的问题：列表插入、删除、排序后，同一 index 对应的**数据变了**，Vue 会误以为“节点没变只是内容变”，导致：
1. 不必要的更新（性能浪费）；
2. **状态错位**：输入框内容、选中态、组件内部状态串到别的数据上；
3. 带过渡动画时移动错误。

正确做法：用数据的唯一 id 作 key。`,ana:"Vue2 双端 Diff（四指针）与 Vue3 LIS 是核心区分点；index key 的“状态错位”要举例（输入框）。",keys:["同层比较","双端 Diff","最长递增子序列","key 唯一标识"],src:"Vue框架面试题.md / 问答类型面试题.md / 收集的面试知识点.md"},{id:"vue-023",type:"essay",diff:"medium",sub:"Vue 性能优化",q:"常见的 Vue 性能优化方法有哪些？",ans:`**面试回答：**分三层：

**编译/加载层**：
1. **路由懒加载**：动态 import 分包，减小首屏包体；
2. 组件异步加载：defineAsyncComponent / React.lazy 对应能力；
3. 开启 Tree Shaking、按需引入组件库（Element Plus 自动导入）；
4. 骨架屏提升感知速度。

**运行时层**：
1. **v-for 必须加唯一 key**（不用 index）；
2. **v-show 替代 v-if**（频繁切换场景）；
3. **computed 缓存**替代方法调用；
4. 长列表用**虚拟滚动**（vue-virtual-scroller），避免大量 DOM；
5. **shallowRef/shallowReactive** 优化大对象深层响应（如大数据表格）；
6. 第三方库实例（图表、编辑器）避免被 reactive 深层代理（markRaw/shallowRef）；
7. 事件、定时器在 unmount 时清理，防止内存泄漏；
8. 图片懒加载、防抖节流。

**工程层**：开启 gzip/brotli、CDN、HTTP 缓存、keep-alive 缓存页面组件、按需 polyfill。`,ana:"shallowRef 与 markRaw 是 Vue3 特有加分项；提到“服务端分页、整表深层响应”能体现表格优化经验。",keys:["路由懒加载","虚拟滚动","shallowRef","keep-alive"],src:"Vue框架面试题.md / 前端性能优化.md"},{id:"vue-024",type:"judge",diff:"medium",sub:"组件基础",q:"Vue 的 template 会被编译成 render 函数，运行时通过执行 render 函数生成虚拟 DOM，这个过程在 Vue3 的 SFC 预编译下通常在构建阶段完成。",ans:!0,ana:"Vue 模板编译流程：template → AST（parse）→ 优化标记静态节点/patchFlag（transform）→ render 函数（generate）。使用 vue-loader/vite plugin 的 SFC 在**构建时预编译**，运行时只需要包含 render 的版本（runtime-only 更小更快）；通过完整版或运行时编译 template 则在浏览器里编译。",keys:["AST","render 函数","预编译","runtime-only"],src:"Vue框架面试题.md"},{id:"vue-025",type:"essay",diff:"medium",sub:"Vue 基础",q:"如何保存页面的当前状态？简述 mixin 的覆盖逻辑。",ans:`**面试回答：**

**保存页面状态的方式**：
1. **keep-alive**：缓存组件实例，最直接；
2. **路由离开前存入 Pinia/Vuex**，返回时恢复；
3. **localStorage/sessionStorage** 持久化筛选条件、表单草稿（刷新也能恢复）；
4. 路由 query 参数保存列表状态（分页、筛选可分享、可回退）；
5. vuex-persistedstate 等插件自动持久化。

**mixin 的覆盖逻辑**：
- **数据对象**：递归合并，**组件自身 data 优先**（覆盖 mixin 中同名）；
- **生命周期钩子**：**合并为数组，mixin 的钩子先执行**，组件的后执行；
- **methods/components/指令**等对象选项：**组件的同名覆盖 mixin**；
- 问题：命名冲突、来源不清晰、隐式依赖——所以 Vue3 推荐用**组合式函数**替代 mixin。`,ana:"mixin 钩子先于组件钩子执行是易错点；组合式函数的“显式导入 + 命名空间隔离”是替代方案。",keys:["keep-alive","query 持久化","mixin 合并策略","组合式函数"],src:"Vue框架面试题.md"},{id:"vue-026",type:"multiple",diff:"easy",sub:"组件通信",q:"下列哪些是 Vue 组件间的**常用通信方式**？（多选）",opts:["props / $emit","provide / inject","Pinia 状态管理","useReducer + Context"],ans:["A","B","C"],ana:"Vue 通信方式：props/$emit（父子）、provide/inject（跨层级）、Pinia/Vuex（全局）、ref/$refs、$parent/$children（Vue2）、$attrs 透传、v-model 语法糖、事件总线（mitt，慎用）。useReducer + Context 是 **React** 的方案，不是 Vue 的。原则：props/emit 首选，跨层用 provide/inject，全局共享用 Pinia。",keys:["props/$emit","provide/inject","Pinia"],src:"Vue框架面试题.md / 知识点快速复习指南.md"},{id:"vue-027",type:"multiple",diff:"medium",sub:"Vue 基础",q:"下列哪些属于 **Vue3 的更新内容**？（多选）",opts:["Composition API（组合式 API）","响应式改用 Proxy","支持 Fragment（多根节点）","新增 mixin 机制"],ans:["A","B","C"],ana:"Vue3：Composition API（逻辑按功能组合、复用从 mixin 变成组合式函数）、Proxy 响应式（监听新增/删除属性和数组变化）、Fragment 多根节点、Teleport、Suspense、更好的 TS 支持、编译优化（静态提升、PatchFlag）。**mixin 是 Vue2 就有的机制**，Vue3 反而推荐用组合式函数替代它。",keys:["Composition API","Proxy","Fragment"],src:"一些高频率考点.md / 收集的面试知识点.md"}],va=[{id:"ra-001",type:"essay",diff:"medium",sub:"组件基础",q:"说一下 React 的事件机制。React 的事件和原生 HTML 事件有什么不同？",ans:`**面试回答：**React 自己实现了一套**合成事件（SyntheticEvent）**系统：

1. **事件委托**：React 17+ 把所有事件统一**委托到 root 容器**（16 及以前委托到 document），子组件的事件不会真的绑定在每个 DOM 上，统一由容器监听分发；
2. **分发过程**：DOM 原生事件冒泡到 root 后，React 根据事件目标沿组件树模拟捕获/冒泡阶段，找到对应的事件处理器执行；
3. **合成事件对象**：事件回调收到的是 React 包装的 SyntheticEvent，抹平浏览器差异，具有跨浏览器一致性（部分属性是惰性的，异步使用需要 persist()）；
4. 与原生事件的差异：**e.stopPropagation() 只阻止合成事件的传播**，不阻止原生监听器的执行（在 document 上绑原生监听仍能收到）；事件名采用小驼峰（onClick），传的是**函数引用**而不是字符串。

**为什么这么做**：统一管理减少监听器数量（性能）、抹平兼容性、为 Fiber 优先级调度提供基础。`,ana:"React 17 的变化：事件委托从 document 移到 root 容器，避免多 React 版本共存时冲突。",keys:["合成事件","事件委托到 root","SyntheticEvent"],src:"React框架面试题.md"},{id:"ra-002",type:"essay",diff:"medium",sub:"组件基础",q:"React 高阶组件（HOC）、Render Props 和 Hooks 有什么区别？为什么要不断迭代？",ans:`**面试回答：**三者都是 React 解决**逻辑复用**的方案：

1. **HOC**：高阶组件是一个**接收组件返回新组件**的函数（装饰器模式），把公共逻辑（权限、埋点、数据注入）包在外面。缺点：props 命名冲突、多层嵌套“套娃”、来源不直观；
2. **Render Props**：组件接收一个**函数 prop**，把状态作为参数回调给调用方渲染（如旧版 react-router、react-spring）。优点是数据来源清晰；缺点是嵌套深时形成回调地狱、 JSX 冗长；
3. **Hooks**：在**函数组件内部**以 use 函数复用状态逻辑（自定义 Hook），无嵌套、无命名冲突、与组件天然同生命周期，是目前的最终形态。

**为什么不断迭代**：前两者的本质问题是**复用逻辑必须改变组件结构**（包一层或传函数），而 Hooks 把“逻辑复用”和“组件结构”解耦了，同一个逻辑可以自由组合，代码扁平直观。HOC 还在用于跨组件切面场景（如 withErrorBoundary），但常规复用首选自定义 Hook。`,ana:"HOC 运用的设计模式：装饰器模式。可在 project 分类里结合 ErrorBoundary 组件封装延伸。",keys:["逻辑复用","props 冲突","自定义 Hook","装饰器模式"],src:"React框架面试题.md"},{id:"ra-003",type:"essay",diff:"hard",sub:"Fiber 架构",q:"对 React Fiber 的理解？它解决了什么问题？",ans:`**面试回答：**Fiber 是 React 16 引入的**新的协调（Reconciler）架构**。

**解决的问题**：旧架构的 Diff 是**递归同步**的，组件树很大时一次性协调不可中断，长时间占用主线程，导致动画掉帧、输入卡顿（长时间任务阻塞渲染）。

**Fiber 的做法**：
1. **可中断的渲染**：把组件树的协调任务拆成一个个**Fiber 节点单元**，用链表（child/sibling/return）组织，通过**requestIdleCallback 思想 / Scheduler 时间切片**逐单元执行，每执行一小段就检查是否有更高优先级的工作，让出主线程；
2. **优先级调度**：不同更新有不同优先级（用户输入 > 过渡更新），高优先级任务可以打断低优先级渲染（并发特性基础）；
3. **双缓冲 Fiber 树**：current 树（屏幕显示）与 workInProgress 树（内存构建）交替，提交阶段一次性切换；
4. 渲染阶段可中断（commit 阶段同步不可中断），为 Suspense、并发渲染（useTransition、useDeferredValue）铺路。

**一句话**：Fiber 把“一次不可打断的大渲染”变成“可调度、可中断的小任务”，让 React 能兼顾复杂渲染与交互流畅。`,ana:"时间切片 + 优先级 + 双缓冲三个关键词。commit 阶段不可中断是易错点。",keys:["可中断渲染","时间切片","优先级调度","双缓冲"],src:"React框架面试题.md / 收集的面试知识点.md"},{id:"ra-004",type:"essay",diff:"medium",sub:"组件基础",q:"类组件与函数组件有什么异同？React 声明组件有哪几种方法？",ans:`**面试回答：**

**声明组件的方式**：函数组件（主流）、class 组件（extends React.Component / PureComponent）、已被淘汰的 createClass（ReactDOM.createFactory 时代的 API）。

**异同**：
1. **心智模型**：函数组件是“**渲染快照**”——每次渲染捕获当时的 props/state，UI 是那次数据快照的结果；class 组件实例常驻，this 可变，读到的可能是最新值；
2. **状态与生命周期**：class 有生命周期方法；函数组件靠 **Hooks**（useState/useEffect）实现同等能力；
3. **性能**：函数组件可以用 memo 浅比较 props 跳过渲染；PureComponent 是 class 的对应物；
4. **this 问题**：class 组件要处理事件处理器的 this 绑定；函数组件没有 this；
5. **未来趋势**：Hooks 支持逻辑复用、更贴合 TS，函数组件是官方推荐方向。

为什么 Hooks 比 class 好（docs 针对简历问答原题）：class 组件存在 **this 指向问题、生命周期逻辑分散、复用困难（只能 HOC/Render Props）**；Hooks 的函数式写法更简洁、逻辑按功能聚合、复用更方便，更适合 TS 和项目维护。`,ana:"“渲染快照”概念可举闭包陷阱例子：setTimeout 中读到的 state 是当次渲染的值。",keys:["渲染快照","this 绑定","PureComponent","Hooks 复用"],src:"React框架面试题.md / 针对简历问答.md"},{id:"ra-005",type:"single",diff:"medium",sub:"组件基础",q:"React.Component 和 React.PureComponent 的区别是什么？",opts:["PureComponent 内置了 shouldComponentUpdate 的浅比较实现","PureComponent 会深度比较 props 和 state","Component 更新更快","PureComponent 不能配合 redux 使用"],ans:"A",ana:"PureComponent 自动实现了 **shouldComponentUpdate 中的浅比较**：props/state 的第一层引用不变就跳过重新渲染。注意是**浅比较**——嵌套对象的内部变化检测不到，所以更新嵌套数据必须返回新对象（不可变更新）。函数组件的对应能力是 React.memo。使用不当可能因“引用相同但内容变了”造成 UI 不更新。",keys:["浅比较","shouldComponentUpdate","React.memo"],src:"React框架面试题.md"},{id:"ra-006",type:"essay",diff:"medium",sub:"组件基础",q:"Fragment 是什么？Portals（插槽）的使用场景是什么？forwardRef 有什么作用？",ans:"**面试回答：**\n\n**Fragment**：让组件返回**多个子元素而不添加多余 DOM 节点**。`<React.Fragment>` 或短语法 `<>`。使用场景：表格行包裹（不能有额外 div）、列表分组、减少 DOM 层级。区别：短语法不能加 key，需要 key（如列表渲染）时用 `<React.Fragment key={id}>`。\n\n**Portals**：`ReactDOM.createPortal(child, domNode)` 把子组件渲染到**父组件 DOM 层级之外**的指定节点。事件冒泡仍按 React 组件树传递。使用场景：Modal 弹窗、Tooltip、下拉菜单——避免被父级的 overflow: hidden、z-index 限制。\n\n**forwardRef**：函数组件默认**不能接收 ref**，forwardRef 创建的组件可以把 ref **转发到内部 DOM 元素或子组件**。泛型 `forwardRef<T, P>`：T 是 ref 指向的元素类型（如 SVGSVGElement、HTMLDivElement），P 是 props 类型。项目里的 SVG 图标组件就是用 forwardRef 封装的，外部可以通过 ref.current 拿到 svg DOM 做 getBBox、动画等操作，同时用 className 灵活控制样式。",ana:"React 19 已支持函数组件直接接收 ref 作为 prop（无需 forwardRef），面试可提及。",keys:["无额外 DOM","createPortal","ref 转发","SVGSVGElement"],src:"React框架面试题.md / 农担项目所遇问题及总结.md"},{id:"ra-007",type:"essay",diff:"easy",sub:"组件基础",q:"React 中什么是受控组件和非受控组件？",ans:"**面试回答：**\n\n- **受控组件**：表单元素的值由 **React state 驱动**（`value={state}` + `onChange` 更新 state），组件状态是唯一数据源，每次输入都走“输入 → setState → 重渲染”的循环。优点：数据可校验、可联动、可提交前统一处理；\n- **非受控组件**：表单数据由 **DOM 自己管理**，React 不干预，需要时通过 **ref** 读取（`ref.current.value`）。适合简单表单或文件输入（file input 只能非受控）。\n\n**选择**：需要校验、联动、受控展示时用受控；性能敏感的超大表单或依赖默认行为时可用非受控。第三方组件库通常同时支持两种模式。",ana:"file input 必须非受控是常见追问点。",keys:["state 驱动","ref 读取","file input 非受控"],src:"React框架面试题.md / 知识点快速复习指南.md"},{id:"ra-008",type:"essay",diff:"medium",sub:"组件基础",q:"对 React Context 的理解？为什么 React 并不推荐优先使用 Context？",ans:`**面试回答：**

**Context**：提供一种**跨组件层级传递数据**的方式，避免 props 逐层透传（props drilling）。创建 \`createContext(defaultValue)\`，上层 Provider 提供 value，任意下层 useContext 读取；value 变化会让所有消费组件重新渲染。

**为什么不推荐优先使用**：
1. **更新粒度问题**：Provider 的 value 变化，**所有消费该 Context 的组件都会重新渲染**，即使它们只用到其中一小部分数据。高频更新的状态放进 Context 会引发大范围重渲染；
2. **耦合度**：组件隐式依赖上层 Context，复用性下降；
3. React 的组件模型更适合显式 props 传递，Context 应该是**低频全局数据**的方案（主题、语言、当前登录用户）。

**实际选型**（docs 针对简历问答）：服务端数据用 React Query；客户端全局状态用 Zustand/Redux；**Context 只用于主题、国际化、用户信息这类更新频率很低的状态**。`,ana:"useContext 选择器优化（use-context-selector 库）或拆分 Context 可以缓解重渲染问题。",keys:["props drilling","消费组件全量重渲染","低频全局数据"],src:"React框架面试题.md / 针对简历问答.md"},{id:"ra-009",type:"essay",diff:"medium",sub:"State 管理",q:"React 的 setState 是同步还是异步的？setState 之后发生了什么？",ans:`**面试回答：**

**表象**：React 18 之前，在合成事件和生命周期里 setState 是“异步”的（批处理，调用后不能立刻拿到最新值）；在 setTimeout、原生事件里是“同步”的（每次触发渲染）。**React 18 起 createRoot 开启自动批处理**，所有场景（包括 setTimeout、Promise.then、原生事件）都会批量合并更新。

**本质**：setState 从来不是“异步 API”，而是**批量合并更新**：React 为了性能把同一轮的多次 setState 合并成一次渲染，update 会被放入更新队列，在当前“批次”结束后统一处理。

**setState 之后发生了什么**：
1. 将 update 插入 fiber 的更新队列，标记该 fiber 需要更新；
2. 调度器安排一次重新渲染（可被批处理合并）；
3. render 阶段：函数组件重新执行，得到新虚拟 DOM，协调 Diff；
4. commit 阶段：把变更提交到真实 DOM，随后执行 useEffect 等副作用。

**获取最新值**：setState 的第二个参数回调（class）；函数式更新 \`setCount(c => c + 1)\`（避免基于旧值计算）；或在 useEffect 中监听变化。`,ana:"useState 异步更新 + 不能立刻拿到最新值是 docs 收集的知识点中单独列出的高频题。",keys:["批处理","自动批处理 React18","函数式更新"],src:"React框架面试题.md / 收集的面试知识点.md"},{id:"ra-010",type:"essay",diff:"easy",sub:"State 管理",q:"React 组件的 state 和 props 有什么区别？props 为什么是只读的？",ans:`**面试回答：**

**区别**：
- **props**：父组件传入的**只读数据**，组件不能修改，数据流自上而下；
- **state**：组件**内部私有可变**的状态，必须通过 setState/useState 的 setter 修改，修改会触发重新渲染。

**props 为什么只读**：
1. **单向数据流**原则：数据从父到子单向流动，子组件改 props 会让数据来源不可追踪，状态管理混乱；
2. **纯函数理念**：组件应该是“props → UI”的纯函数，修改入参破坏可预测性；
3. 需要变更时，应该通过**回调通知父组件**修改数据源（状态提升）。

另外注意：直接修改 state（this.state.x = 1 / state.x = 1）不会触发渲染，且 PureComponent/memo 的浅比较会失效，必须整体替换为新对象。`,ana:"props 只读 + 单向数据流 + 状态提升三个词串起来回答。",keys:["props 只读","单向数据流","setState 替换对象"],src:"React框架面试题.md"},{id:"ra-011",type:"essay",diff:"easy",sub:"State 管理",q:"React 中如何避免不必要的 render？",ans:`**面试回答：**从几个层面回答：

1. **组件级**：函数组件用 **React.memo** 包裹（props 浅比较），class 用 PureComponent / shouldComponentUpdate；
2. **props 稳定化**：
   - 匿名函数每次渲染都是新引用，会**破坏 memo 的浅比较**——用 **useCallback** 缓存函数；
   - 对象/数组 props 用 **useMemo** 缓存引用；
3. **状态下沉与粒度拆分**：把 state 放到真正需要它的组件附近，避免父组件的小状态变化引发整棵子树渲染；一个 state 里包含多个不相关数据时拆开（引用变化会导致依赖其他字段的 memo 也失效）；
4. **Context 拆分**：高频变化的数据不要放低频 Context；
5. **列表 key 稳定**：不要用 index 作 key 导致错误复用与多余渲染；
6. **虚拟列表**：大量列表只渲染可视区。

我的项目实践：智能体平台知识库卡片频繁重绘，我用“组件拆分 + 状态粒度细化 + useCallback”组合优化，明显减少卡顿。`,ana:"匿名函数破坏 memo 浅比较是 docs 针对简历问答里的原话，结合项目讲最加分。",keys:["React.memo","useCallback/useMemo","状态下沉"],src:"React框架面试题.md / 针对简历问答.md"},{id:"ra-012",type:"essay",diff:"medium",sub:"生命周期",q:"React 16 之后的生命周期有哪些？废弃了哪些生命周期？为什么？",ans:`**面试回答：**

**React 16.3+ 的生命周期（挂载）**：
constructor → getDerivedStateFromProps → render → componentDidMount

**更新**：getDerivedStateFromProps → shouldComponentUpdate → render → getSnapshotBeforeUpdate → componentDidUpdate

**卸载**：componentWillUnmount；**错误处理**：getDerivedStateFromError + componentDidCatch。

**废弃**：componentWillMount、componentWillReceiveProps、componentWillUpdate（可用 UNSAFE_ 前缀继续用到 17）。

**废弃原因**：它们在 Fiber 的**可中断渲染阶段**执行——如果渲染被打断重启，这些方法可能**被调用多次**，导致副作用重复执行（如请求发两次、订阅重复），语义不安全。替代品：
- componentWillMount → constructor 或 componentDidMount；
- componentWillReceiveProps → **getDerivedStateFromProps**（props 变化派生 state）；
- componentWillUpdate → **getSnapshotBeforeUpdate**（更新前读取 DOM 快照）。`,ana:"关键词：可中断渲染导致旧生命周期可能重复调用。函数组件没有生命周期概念，用 useEffect 模拟。",keys:["getDerivedStateFromProps","getSnapshotBeforeUpdate","UNSAFE_"],src:"React框架面试题.md"},{id:"ra-013",type:"essay",diff:"medium",sub:"Hooks",q:"对 React Hooks 的理解？为什么不能在循环、条件或嵌套函数中调用 Hook？",ans:`**面试回答：**

**Hooks 理解**：Hooks 是让**函数组件拥有状态和副作用等能力**的功能函数（useState/useEffect/useRef/useMemo 等）。实现原理上，React 按调用顺序为每个 Hook 在 Fiber 节点上分配一个“记忆单元格”（**单向链表**），渲染时按序读取。

**为什么必须在顶层调用**：React 依赖 **Hook 的调用顺序**来正确关联每次渲染的 state。如果在条件/循环中调用，两次渲染的 Hook 数量和顺序会错位，后续 Hook 会读到前面 Hook 的状态，导致 bug（React 也会直接报错提示）。

**使用规则（铁律）**：
1. 只在最顶层调用 Hook；
2. 只在 React 函数组件或自定义 Hook 中调用。

**Hooks 解决的问题**：class 的逻辑分散（一个功能拆在多个生命周期）、复用困难（HOC/Render Props 嵌套）、this 心智负担。

**useEffect vs useLayoutEffect**：
- **useEffect**：**异步**执行，浏览器完成布局与绘制**之后**执行，不阻塞渲染，适合数据请求、订阅；
- **useLayoutEffect**：**同步**执行，DOM 变更后、浏览器**绘制之前**执行，会阻塞绘制，适合需要**同步读取布局或调整样式**避免闪烁的场景（测量元素、动画初始位置）。`,ana:"“记忆单元格链表 + 调用顺序”是原理核心。useLayoutEffect 会阻塞绘制是关键差异。",keys:["调用顺序","Hook 链表","useLayoutEffect 同步"],src:"前端面试八股文.md / React框架面试题.md"},{id:"ra-014",type:"essay",diff:"medium",sub:"Hooks",q:"useEffect 为什么会死循环？React Hooks 和生命周期的关系是什么？",ans:`**面试回答：**

**useEffect 死循环**：useEffect 依赖变化就会重新执行，如果 **effect 内部又修改了它依赖的数据**，就会无限循环：

\`\`\`js
// 依赖 count，内部又改 count → 执行 → 更新 → 再执行……
useEffect(() => {
  setCount(count + 1)
}, [count])
\`\`\`

**本质**：依赖更新 → effect 执行 → 触发更新 → 再触发 effect 的闭环。修复方式：修正依赖（用函数式更新去掉多余依赖）、把派生值用 useMemo 计算、或用事件驱动替代。

**Hooks 与生命周期的对应关系**：
- \`useEffect(fn, [])\` ≈ componentDidMount（挂载后执行一次，但“闭包捕获首帧值”，可加清理函数模拟 componentWillUnmount）；
- \`useEffect(fn, [deps])\` ≈ componentDidUpdate（但首次也会执行，且逻辑上是“依赖变化后”）；
- \`useEffect 返回的清理函数\` ≈ componentWillUnmount；
- **没有完全等价**的对应：Hooks 的心智模型是“**同步状态与副作用**”，不是生命周期——同一个 useEffect 可以同时覆盖挂载和更新两种情形。`,ana:"强调心智模型差异是加分点：不要把 useEffect 当成三个生命周期拼起来用。",keys:["依赖闭环","清理函数","心智模型"],src:"针对简历问答.md / React框架面试题.md"},{id:"ra-015",type:"single",diff:"medium",sub:"Hooks",q:"为什么 useState 要使用数组而不是对象返回？",opts:["数组解构可以自由命名变量，多次调用不冲突；对象解构必须使用固定属性名","数组性能比对象更好","对象不能存储函数","这是历史遗留设计，没有原因"],ans:"A",ana:'数组解构允许开发者**自行命名**：`const [count, setCount] = useState(0)`、`const [name, setName] = useState("")`——同一个组件可以多次使用且互不冲突。如果返回对象 `{ state, setState }`，解构时每个 useState 的属性名都相同，必须手动重命名，写法繁琐且容易冲突。',keys:["数组解构自由命名","多次调用"],src:"React框架面试题.md"},{id:"ra-016",type:"essay",diff:"medium",sub:"Hooks",q:"React Hooks 在平时开发中有哪些需要注意的问题和常见坑？",ans:`**面试回答：**

1. **闭包陷阱**：setTimeout/事件回调里读到的 state 是**当次渲染的快照**——用函数式更新 \`setCount(c => c + 1)\` 或 useRef 保存最新值；
2. **依赖数组**：漏依赖导致读到旧值（可用 exhaustive-deps 插件检查）；对象/数组依赖每次渲染引用都变，导致 effect 反复执行——用 useMemo/useCallback 稳定引用；
3. **死循环**：effect 内部更新自己依赖的数据；
4. **清理副作用**：订阅、定时器、**SSE/WebSocket 连接**必须在清理函数中关闭，防止泄漏和重复连接（我项目里 SSE 重复展示就是连接未正确关闭导致）；
5. **不要滥用 useMemo/useCallback**：本身有比较和缓存成本，只在传递给 memo 子组件或作为依赖时使用；
6. **自定义 Hook 复用逻辑**：把“状态 + 操作”封装成 useXxx，而不是复制粘贴；
7. **并发安全**：React 18 严格模式开发环境会**双重执行 effect**，验证清理逻辑正确性，不要在 effect 里写不可重复执行的副作用。`,ana:"结合项目讲第 4 点（useRef 管理 SSE 连接生命周期、唯一标识去重）最加分。",keys:["闭包快照","exhaustive-deps","清理函数","严格模式双执行"],src:"收集的面试知识点.md / 针对简历问答.md / React框架面试题.md"},{id:"ra-017",type:"essay",diff:"easy",sub:"组件通信",q:"React 父子、跨级、非嵌套组件分别怎么通信？",ans:`**面试回答：**

**父子**：
- 父 → 子：**props**（数据、回调函数）；
- 子 → 父：调用父组件传入的**回调函数**（onChange、onSubmit），或子组件用 forwardRef 暴露实例方法；
- refs：ref + useImperativeHandle 暴露指定方法。

**跨级（祖孙）**：
- **Context**：避免 props 层层透传，适合主题、用户信息等；
- 逐层 props（props drilling，层数少时最直观）；
- 组合组件模式（把子组件作为 props 传入，如 Tabs + Tab.Item）。

**非嵌套（兄弟/任意）**：
- **状态提升**到最近公共父组件（React 官方推荐）；
- **全局状态管理**：Redux / Zustand / Jotai；
- 事件通知： mitt 之类的 EventEmitter（慎用，破坏数据流可追踪性）；
- URL/路由参数传递页面间状态。

**解决 props 层级过深**：优先考虑组件拆分是否合理（组件树太深往往是设计问题），再选 Context 或状态库。`,ana:"Redux 解决的问题：跨页面共享且关联复杂的全局状态、单向数据流可追踪、DevTools 时间旅行。",keys:["props/回调","Context","状态提升","Redux/Zustand"],src:"React框架面试题.md"},{id:"ra-018",type:"essay",diff:"hard",sub:"状态管理",q:"对 Redux 的理解？它的工作流程是怎样的？中间件是怎么拿到 store 和 action 的？",ans:`**面试回答：**

**Redux 解决什么问题**：复杂应用中多组件共享状态混乱、修改来源不可追踪。Redux 用**单一 store + 单向数据流**让状态变化可预测、可追踪（DevTools 时间旅行）。

**三大原则**：单一数据源；state 只读（只能通过 dispatch action 触发）；**纯函数 reducer** 修改状态（reducer: (state, action) => newState）。

**工作流程**：
View 派发 action → **middleware**（处理异步等副作用）→ reducer 计算新 state → store 更新并通知 → **connect/useSelector 订阅**的组件重新渲染。

**中间件原理**：applyMiddleware 对 **dispatch 做柯里化增强**。中间件签名是 \`store => next => action => result\`：
- 第一层拿到 store（getState/dispatch）；
- 第二层 next 是被包装前的 dispatch（链式传递）；
- 第三层处理 action，异步中间件（thunk）可以把 action 做成函数，等待请求完成再 dispatch 普通 action。

**异步处理**：thunk（简单，函数 action）、saga（基于 generator，适合复杂流程）、RTK Query（数据请求层）。

**为什么项目用 Redux 而不是 Context/useReducer**（docs 原题）：Context 高频更新引发大范围重渲染、修改路径不清晰；Redux 单向数据流可追踪 + DevTools，适合复杂后台。重新选型则会用 React Query（服务端数据）+ Zustand（客户端状态）。`,ana:"connect 的作用：把 store 的 state 映射为 props、订阅变化、注入 dispatch。",keys:["单一数据源","纯函数 reducer","柯里化中间件","thunk"],src:"React框架面试题.md / 针对简历问答.md"},{id:"ra-019",type:"essay",diff:"easy",sub:"状态管理",q:"React 的状态提升是什么？使用场景有哪些？",ans:`**面试回答：**状态提升是把多个组件**共享的状态移动到它们最近的共同父组件**，父组件通过 props 下发状态、通过回调函数接收修改，子组件变成“受控”的展示组件。

**典型场景**：
1. 两个兄弟组件依赖同一份数据（如搜索框输入 + 结果列表过滤）；
2. 表单与提交按钮分离；
3. Tabs 与内容面板联动；
4. 温度/长度转换这类“同源多视图”。

**好处**：单一数据源，状态变化可预测；**坏处/边界**：提升过度会导致父组件臃肿、props drilling，因此更上层的共享状态交给 Context 或 Redux/Zustand。原则：**就近共享用提升，跨页面/跨模块共享用状态库**。`,ana:"状态提升是“React 双向数据流模拟”的基础：input value + onChange。",keys:["共同父组件","受控组件","props drilling 边界"],src:"React框架面试题.md"},{id:"ra-020",type:"essay",diff:"medium",sub:"路由",q:"React Router 的实现原理是什么？有几种路由模式？Link 和 a 标签的区别？",ans:`**面试回答：**

**实现原理**：
- **BrowserRouter（history 模式）**：基于 HTML5 **History API**（pushState/replaceState）改变 URL 但不刷新页面，监听 **popstate** 事件响应前进后退；刷新时需要服务端把所有路径回退到 index.html；
- **HashRouter（hash 模式）**：URL 用 # 表示路径，监听 **hashchange**，无需服务端配置；
- Router 内部用 **Context** 把 location/history 提供给组件树，Route 组件根据路径匹配渲染对应组件。

**Link 和 a 的区别**：a 标签点击会**重新加载整个页面**（重新请求 HTML、丢失状态）；Link 拦截点击事件，用 pushState 更新 URL 并通知 Router 切换组件，**不重新加载页面**、保留应用状态。需要跳出应用（外链、下载）时才用 a。

**动态路由与鉴权**（docs 问答类型面试题）：React Router 用 useParams 获取动态参数；鉴权通过包装 Route 组件（校验 token/权限，无权限重定向 403 或登录页），配合后端返回的权限表动态生成路由配置。`,ana:"v6 的变化：Routes 替代 Switch、useNavigate 替代 useHistory、嵌套路由 Outlet。",keys:["pushState/popstate","HashRouter","Link 拦截点击"],src:"React框架面试题.md / 问答类型面试题.md"},{id:"ra-021",type:"essay",diff:"medium",sub:"虚拟 DOM 与 Diff",q:"React 的 Diff 算法原理是什么？React 与 Vue 的 Diff 有什么不同？React 为什么需要 key？",ans:`**面试回答：**

**React Diff 的三大前提策略**：
1. **同层级比较**：跨层移动视为删除 + 重建；
2. **不同类型组件 → 替换**整棵子树；
3. **同类型节点**：复用 DOM，只更新变化的 props，然后递归比较 children；子节点列表用 **key 标记**匹配。

**子列表 Diff（React 旧版双向遍历）**：用 key 建立旧节点映射，从左往右遍历新列表，能复用就移动（右侧集中插入位置），否则标记删除/插入。React 18+ 引入了**基于 Fiber 的可恢复 Diff**，支持中断。

**React 与 Vue 的 Diff 区别**：
- React 单向从左到右遍历；**Vue2 是双端 Diff**（头尾四指针），**Vue3 用快速 Diff + 最长递增子序列**，尽量减少 DOM 移动；
- Vue 有编译时优化（静态提升、PatchFlag 标记动态内容），Diff 时跳过静态节点；React 主要靠运行时（React Compiler 才引入编译优化）；
- 更新粒度不同：Vue 数据变化精确知道哪个组件依赖它；React 默认**从状态所在组件向整棵子树重新渲染**，靠 memo/useMemo 手动优化。

**为什么需要 key**：key 是列表节点的**唯一标识**，Diff 时靠它判断“复用还是重建”。没有 key 时 React 默认按**位置索引**复用——插入、删除、排序后节点错位，导致输入框内容串位、组件内部状态异常、不必要的重渲染。`,ana:"三段式：React 策略 → 与 Vue 对比 → key 的意义，正好是 docs 三个独立问题的合并答法。",keys:["同层比较","双端 Diff vs 单向","key 唯一标识","更新粒度"],src:"React框架面试题.md / 收集的面试知识点.md / 针对简历问答.md"},{id:"ra-022",type:"single",diff:"medium",sub:"虚拟 DOM 与 Diff",q:"列表渲染时，为什么循环中不建议用数组索引做 key？",opts:["index 作 key 性能一定最差","插入、删除、排序后 index 与数据的对应关系会错位，导致状态错乱和不必要重渲染","index 不是数字类型","React 不允许数字 key"],ans:"B",ana:"key 的意义是“稳定标识同一份数据”。列表顺序变化时 index 无法保持数据与节点的对应：比如删除第一项后，原来的第二项内容现在 index 为 0，React 会认为“key=0 的节点还在”，只更新内容而不重建——组件内部状态（输入框、滚动位置、勾选状态）就会**错位**到别的数据上。列表纯静态展示且不重排时 index 可以接受，但只要涉及增删排序就应该用唯一 id。",keys:["稳定标识","状态错位","唯一 id"],src:"收集的面试知识点.md"},{id:"ra-023",type:"essay",diff:"medium",sub:"其他",q:"React 数据持久化有什么实践？页面刷新时怎样保留数据？",ans:`**面试回答：**常见方案按场景选择：

1. **localStorage/sessionStorage**：token、用户偏好、筛选条件。配合状态库的 persist 中间件（redux-persist、zustand persist）自动同步；
2. **URL（路由参数）**：列表页分页、筛选状态放到 query，刷新、分享、回退都能恢复，可追踪性最好；
3. **服务端**：真正需要跨设备的数据存数据库，登录后拉取；
4. **React Query 缓存**：服务端数据在客户端缓存 + staleTime 控制，本质是“刷新后重新请求 + 请求间去重”。

**注意事项**：持久化数据要有**版本控制**（key 带版本号或校验逻辑），防止旧结构导致报错；敏感信息（token）放 localStorage 有 XSS 风险，可配合 HttpOnly Cookie。项目实战：我在智能体平台处理过“localStorage 缓存的模型已被后台删除”的问题，方案是初始化时用后端最新模型列表**校验本地缓存有效性**，失效则清除并回退到第一个可用模型。`,ana:"模型缓存校验是 docs/基于简历的问题.md 的原题，能自然带出项目。",keys:["persist 中间件","URL 状态","缓存校验"],src:"React框架面试题.md / 基于简历的问题.md"},{id:"ra-024",type:"essay",diff:"medium",sub:"其他",q:"对 React SSR 的理解？React 的设计理念是什么？",ans:`**面试回答：**

**SSR（服务端渲染）**：在服务端把 React 组件渲染成 **HTML 字符串**直接返回，浏览器先显示静态内容，再“注水（hydration）”让页面具备交互能力。

**解决什么**：
1. **首屏更快**：用户直接看到 HTML，不用等 JS 下载执行完；
2. **SEO**：爬虫直接抓到完整内容。

**代价与注意**：服务端计算压力、生命周期限制（只有 render 和部分钩子可用，useEffect 不在服务端执行）、需要处理 window/document 的环境判断、 hydration 不一致问题。同构框架：Next.js（App Router 引入 RSC 服务端组件）。

**React 的设计理念**（docs 原题）：
1. **UI = f(state)**：视图是状态的函数，声明式描述“应该长什么样”而不是命令式操作 DOM；
2. **组件化**：一切皆组件，组合优于继承；
3. **单向数据流**；
4. **最小 API 面与生态演进**：核心保持稳定，把能力交给社区（路由、状态管理）；
5. React 18 的并发理念：渲染可中断，交互优先。`,ana:"SSR 回答要提“注水 hydration”，理念回答抓 UI=f(state) 与组件化两点即可。",keys:["服务端渲染 HTML","hydration","UI = f(state)"],src:"React框架面试题.md"},{id:"ra-025",type:"code",diff:"medium",sub:"Hooks",q:"React 中如何在组件卸载或路由切换时正确清理定时器和订阅？写出一个自定义 Hook useInterval 的实现。",ans:`\`\`\`jsx
import { useEffect, useRef } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef(callback)

  // 每次渲染更新回调引用，避免闭包读到旧 state
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return
    const id = setInterval(() => savedCallback.current(), delay)
    // 清理函数：卸载或 delay 变化前执行，防止泄漏与重复定时器
    return () => clearInterval(id)
  }, [delay])
}

// 使用
function Timer() {
  const [seconds, setSeconds] = useState(0)
  useInterval(() => setSeconds((s) => s + 1), 1000)
  return <div>Seconds: {seconds}</div>
}
\`\`\`

**要点**：
1. 清理函数（return 的函数）在**卸载和下次 effect 执行前**都会运行；
2. 用 ref 保存最新回调解决闭包陷阱；
3. 项目中的 SSE/WebSocket/事件监听同理：useRef 保存连接引用、卸载时主动 close、建立前先判断已有连接，避免重复连接导致消息重复展示。`,ana:"useInterval 的 ref 模式（useEffectEvent 的前身）是经典面试代码题。",keys:["清理函数","useRef 保存回调","SSE 生命周期"],src:"农担项目所遇问题及总结.md / 基于简历的问题.md"},{id:"ra-026",type:"multiple",diff:"medium",sub:"Hooks",q:"下列哪些符合 **React Hooks 的使用规则**？（多选）",opts:["只在函数组件或自定义 Hook 的最顶层调用","可以在 if 条件中按需调用 useState","自定义 Hook 必须以 use 开头命名","可以在 useEffect 的清理函数中再调用 useState"],ans:["A","C"],ana:"Hooks 铁律：①只在最顶层调用——不能在循环、条件或嵌套函数中调用，因为 React 依赖调用顺序关联每次渲染的 state（内部是 Hook 链表）；②只在 React 函数组件或自定义 Hook 中调用。useEffect 清理函数只是普通回调，不应在其中再调用 Hook。自定义 Hook 以 use 开头是命名约定，也是 lint 识别 Hook 的依据。",keys:["调用顺序","Hook 链表","只在顶层"],src:"前端面试八股文.md / React框架面试题.md"},{id:"ra-027",type:"multiple",diff:"hard",sub:"生命周期",q:"下列哪些是 React 16.3+ 引入或保留的**安全生命周期**？（多选）",opts:["getDerivedStateFromProps","getSnapshotBeforeUpdate","componentWillReceiveProps","componentDidCatch"],ans:["A","B","D"],ana:"React 16.3 引入 getDerivedStateFromProps（props 变化派生 state）和 getSnapshotBeforeUpdate（更新前读 DOM 快照）；16.6 增加 componentDidCatch（错误边界，配套 getDerivedStateFromError）。**componentWillReceiveProps 被废弃**——它在 Fiber 可中断渲染阶段可能被调用多次，副作用不安全，替代方案就是 getDerivedStateFromProps。",keys:["废弃的生命周期","getDerivedStateFromProps","Fiber 不安全"],src:"React框架面试题.md"}],ja=[{id:"pf-001",type:"essay",diff:"medium",sub:"性能指标",q:"前端性能指标有哪些？FCP、LCP、INP、CLS 分别衡量什么？",ans:`**面试回答：**核心指标（Core Web Vitals）：

1. **FCP**（First Contentful Paint，首次内容绘制）：页面第一次出现文字、图片、SVG 等内容的时间——说明“页面不是白屏了”；
2. **LCP**（Largest Contentful Paint，最大内容绘制）：首屏最大图片、标题块等内容完成绘制的时间——**最能代表用户感知的首屏速度**；
3. **INP**（Interaction to Next Paint，交互响应延迟）：点击、输入等交互从触发到页面响应的延迟，主线程长任务过多会让 INP 变差（替代了 FID）；
4. **CLS**（Cumulative Layout Shift，布局稳定性）：页面加载中元素是否突然移动——图片未设置宽高、异步插入广告/弹窗都会变差；
5. **TTFB**（Time to First Byte，首字节时间）：反映服务端响应和网络链路速度。

**数据来源要说清楚**：本地 Performance/Lighthouse 用于**定位问题**，真实用户监控（RUM）用于**验证线上效果**；简历里报数据要补充采样范围、网络条件、版本对比和分位数（P50/P75/P90），避免只报单次本地结果。

我的简历数据：LCP 从约 2.4s 优化到约 1.5s，回答时会说明是线上真实用户 P75 口径的对比。`,ana:"四个指标的记忆：FCP 白屏结束、LCP 首屏内容、INP 交互延迟、CLS 布局抖动。",keys:["FCP/LCP/INP/CLS","TTFB","RUM vs Lighthouse"],src:"知识点快速复习指南.md / 收集的面试知识点.md / 一些高频率考点.md"},{id:"pf-002",type:"essay",diff:"medium",sub:"首屏优化",q:"首屏加载性能优化你会从哪些方面入手？如果 LCP 元素是一张首屏大图怎么优化？",ans:`**面试回答：**遵循“**先定位，再优化**”：

**第一步定位**：Lighthouse/Performance/Network/Bundle Analyzer 分析瓶颈——慢在网络、JS 执行还是渲染。

**网络层**：
1. 代码分割：**路由懒加载**、组件异步加载，拆分主包；
2. 资源压缩：Gzip/Brotli、图片压缩与 WebP/AVIF 格式；
3. **CDN** 加速静态资源、DNS 预解析（dns-prefetch）、preload 关键资源；
4. 缓存策略：hash 文件名 + 长期强缓存，index.html 短缓存。

**执行层**：减少首屏同步 JS、低优先级逻辑延后初始化、非关键脚本 defer。

**渲染层**：减少首屏 DOM 复杂度、骨架屏提升感知。

**LCP 是图片时的抓手**：
1. 压缩体积、改用 WebP/AVIF；
2. 设置 width/height（避免 CLS）；
3. \`<link rel="preload">\` 预加载首屏图；
4. **首屏图不要懒加载**（懒加载反而推迟 LCP）；
5. LCP 是文本时：减少阻塞 CSS、字体预加载、避免首屏内容依赖过多 JS 渲染。`,ana:"结构化回答：定位 → 网络/执行/渲染三层 → 针对性抓手。避免“一上来就加缓存”。",keys:["路由懒加载","Brotli","preload LCP 图","先定位再优化"],src:"前端性能优化.md / 知识点快速复习指南.md / 收集的面试知识点.md"},{id:"pf-003",type:"essay",diff:"easy",sub:"CDN",q:"CDN 的概念、原理和使用场景是什么？",ans:`**面试回答：**

**概念**：CDN（Content Delivery Network，内容分发网络）是把源站内容分发到**各地边缘节点**的网络，让用户从**距离最近的节点**获取资源。

**原理**：
1. 全局负载均衡：DNS 解析时根据用户地理位置、运营商，把域名解析到**最近/最空闲**的 CDN 节点（CNAME 到 CDN 调度系统）；
2. 边缘节点缓存：命中缓存直接返回；未命中则**回源**（从源站/上级节点拉取），并缓存下来供后续用户使用。

**作用**：缩短物理传输距离、分担源站压力、抗流量峰值，同时节省带宽成本。

**使用场景**：静态资源（JS/CSS/图片/字体）、视频点播与直播、软件下载包。前端项目常把构建产物（带 hash 的静态文件）上传 CDN，HTML 里引用 CDN 地址。

**注意事项**：缓存刷新策略、版本化文件名、回源风暴控制。`,ana:"关键词链：CNAME 调度 → 边缘节点 → 命中/回源。",keys:["边缘节点","DNS/CNAME 调度","回源","负载均衡"],src:"前端性能优化面试题.md"},{id:"pf-004",type:"essay",diff:"medium",sub:"懒加载",q:"懒加载的原理是什么？和预加载有什么区别？图片懒加载有哪些实现方案？",ans:`**面试回答：**

**懒加载**：延迟加载**当前不需要**的资源，进入可视区域时才加载。**原理**：img 初始 src 为空或占位图，把真实地址放在 data-src；监听滚动（或用 IntersectionObserver），判断元素 \`getBoundingClientRect().top\` 与视口的关系，进入视口时把 data-src 赋给 src 触发加载。

**懒加载 vs 预加载**：懒加载**按需**加载节省带宽（图片列表、路由分包）；预加载是**提前**加载马上要用的资源（preload/prefetch），牺牲带宽换体验（首屏 LCP 图、下一页资源）。

**图片懒加载方案对比**（docs 问答原题）：
1. \`loading="lazy"\`：原生 HTML 属性，一行代码，兼容性已很好，首选；
2. **IntersectionObserver**：异步观察交叉状态，不阻塞主线程，性能好于滚动监听，可控制 rootMargin 提前量；
3. **滚动事件 + 手动计算**：最原始，需要节流，容易引起布局抖动，不推荐；
4. 第三方库（lazysizes 等）：功能全面，适合复杂占位/淡入效果。

**其他懒加载**：路由懒加载（动态 import）、组件异步加载、虚拟列表本质也是“只渲染可视区”。`,ana:"方案对比题答法：先说原生属性（默认答案），再按性能和灵活度排 IntersectionObserver。",keys:["IntersectionObserver","loading=lazy","data-src","preload 反向"],src:"前端性能优化面试题.md / 问答类型面试题.md"},{id:"pf-005",type:"essay",diff:"medium",sub:"渲染优化",q:"大量数据一次性渲染导致卡顿，你会怎么优化？虚拟列表的实现原理是什么？",ans:`**面试回答：**

**问题本质**：一次性创建几万条 DOM 节点，样式计算、布局、绘制的开销巨大，主线程长时间阻塞。

**优化方案**：
1. **虚拟列表（虚拟滚动）**——核心方案：
   - 只渲染**可视区域**内的条目（可视区 + 上下缓冲区，比如前后各 5 条）；
   - 容器固定高度，内部放一个**撑开总高度的占位元素**（总高度 = 总条数 × 行高），保证滚动条正确；
   - 监听滚动，用 \`scrollTop / 行高\` 计算**起始索引**，动态替换渲染的数据切片，再用 \`transform: translateY(偏移量)\` 把内容定位到正确位置；
   - 不可定高时可先渲染再测量或预估行高，滚动中修正；
2. **分页加载/上拉加载**：从数据源头减少一次性请求量；
3. **时间分片**：requestAnimationFrame 分批插入（大数据但必须全渲染时）；
4. **Web Worker** 处理数据计算，主线程只负责渲染。

**项目结合**：智能体平台的复杂表格用“服务端分页 + 列配置稳定 + 按需渲染 + 筛选输入防抖”，避免整表深层响应式更新。`,ana:"虚拟列表三板斧：占位撑高、scrollTop 算索引、transform 定位。不定高场景的处理是深挖点。",keys:["可视区渲染","scrollTop 索引","transform 偏移","不定高"],src:"前端性能优化.md / 一些高频率考点.md / 收集的面试知识点.md"},{id:"pf-006",type:"essay",diff:"medium",sub:"回流重绘",q:"回流与重绘的概念、触发条件和规避方法？documentFragment 是什么？",ans:`**面试回答：**

**概念**：
- **回流（Reflow/重排）**：元素**几何属性**（宽高、位置、字体）变化，浏览器重新计算布局。一个元素变化可能影响父、兄弟甚至整页，开销大；
- **重绘（Repaint）**：只改变**外观**（color、background、visibility、box-shadow），不影响布局。回流必然引发重绘，重绘不一定回流。

**触发回流的操作**：增删 DOM、改 width/height/margin/position、改字体、窗口 resize、**读取 offsetWidth/offsetHeight/getBoundingClientRect 等布局属性**（强制同步布局）。

**规避方法**：
1. 批量修改：DocumentFragment、改 className、cssText 一次写入；
2. **读写分离**：先统一读布局信息，再统一写样式，避免读写交替强制回流；
3. 动画用 **transform/opacity**（只走合成），复杂动画元素 position: absolute/fixed 脱离文档流；
4. \`will-change\` 适度提升合成层；
5. 虚拟列表减少 DOM 总量。

**DocumentFragment**：轻量文档片段，不在真实 DOM 树中。把节点先挂到 fragment（这些操作不触发回流），最后一次性 appendChild，只触发一次回流。`,ana:"“读布局属性也会触发回流”（强制同步布局）是很多人忽略的点。",keys:["几何 vs 外观","强制同步布局","transform 合成","DocumentFragment"],src:"前端性能优化面试题.md / 浏览器原理知识点.md"},{id:"pf-007",type:"essay",diff:"easy",sub:"图片优化",q:"如何对项目中的图片进行优化？常见的图片格式及使用场景？",ans:`**面试回答：**

**图片优化手段**：
1. **格式选择**：WebP/AVIF 替代 JPEG/PNG（同质量体积小 25%~50%），提供兜底格式；
2. **响应式图片**：srcset + sizes 让浏览器按 DPR 和视口选择合适尺寸；
3. **懒加载**：loading="lazy" 或 IntersectionObserver（首屏图除外，避免拖慢 LCP）；
4. **压缩与尺寸**：构建压缩、按显示尺寸请求（不要 1000px 图显示 100px）；
5. **雪碧图 CSS Sprites**：合并小图标减少请求（HTTP/2 下必要性降低，可改用 SVG symbol 雪碧图）；
6. 首屏关键图 preload、CDN 分发、设置宽高防 CLS。

**格式场景**：
- **JPEG**：色彩丰富的照片，有损压缩；
- **PNG**：需要透明的图片、图标，无损；
- **GIF**：简单动图；
- **WebP/AVIF**：现代首选，兼容性差的场景提供降级；
- **SVG**：图标、Logo 等矢量图形，可缩放、可交互；
- **base64 内联**：极小图标减少请求，但会让 CSS 体积变大。`,ana:"渐进式加载（progressive JPEG 先模糊后清晰）是补充亮点。",keys:["WebP/AVIF","srcset","雪碧图","首屏图不懒加载"],src:"前端性能优化面试题.md / 从零开始的前端面试题.md / 收集的面试知识点.md"},{id:"pf-008",type:"essay",diff:"medium",sub:"框架层优化",q:"Vue 和 React 各自有哪些框架层面的性能优化手段？",ans:`**面试回答：**

**Vue 通用优化**：路由懒加载、图片优化、防抖节流、CDN + Gzip（与框架无关）。

**Vue 特有**：
1. **v-for 必须加 key**；
2. 频繁切换用 **v-show** 替代 v-if；
3. **computed 缓存**替代方法调用；
4. 组件异步加载（defineAsyncComponent）；
5. **shallowRef** 优化大对象（避免深层响应式代理开销），第三方实例 markRaw。

**React 特有**：
1. **React.memo** 避免子组件无效渲染；
2. **useCallback + useMemo** 缓存函数与对象引用（配合 memo 才有意义）；
3. **React.lazy + Suspense** 组件按需加载；
4. 避免内联对象/函数 props（破坏 memo）；
5. 用 **Fragment** 减少 DOM 层级；
6. useTransition/useDeferredValue 让低优先级更新不阻塞交互。

**工具检测**：Chrome Performance 看长任务、React DevTools Profiler 看组件渲染耗时、Vue DevTools 性能面板、Lighthouse 综合评分。

**实战优先级**（docs 前端性能优化.md）：先解决“包太大”（懒加载/拆包），再解决“渲染太多”（memo/缓存），最后才是微优化。`,ana:"框架优化题的关键是“和 memo 配合才有意义”这种因果表述，比罗列 API 高一档。",keys:["React.memo","shallowRef","React.lazy","Profiler"],src:"前端性能优化.md"},{id:"pf-009",type:"single",diff:"easy",sub:"性能指标",q:"以下哪个操作最容易导致 CLS（累积布局偏移）变差？",opts:["图片未设置宽高，加载完成后撑开下方内容","使用 system-ui 字体","开启 gzip 压缩","使用 CSS Grid 布局"],ans:"A",ana:"CLS 衡量页面加载过程中元素是否突然移动。图片没有设置 width/height 时，浏览器无法预留空间，图片加载完成后内容整体下移，产生布局偏移。解决方案：设置宽高或 aspect-ratio、占位骨架屏、避免异步插入弹窗/广告到文档流中。",keys:["CLS","width/height 预留","aspect-ratio"],src:"知识点快速复习指南.md"},{id:"pf-010",type:"essay",diff:"medium",sub:"综合场景",q:"高访问量页面的前端优化手段有哪些？",ans:`**面试回答：**从资源加载、请求控制、渲染性能三方面：

**资源方面**：
1. **CDN** 分发静态资源，就近访问；
2. 缓存策略：hash 文件名 + 强缓存（Cache-Control 长过期）；
3. 代码压缩（JS/CSS minify、gzip/brotli）、Tree Shaking 减少体积；
4. 按需加载/懒加载减少首屏资源。

**请求方面**：
1. **接口缓存**与防重复请求（相同参数合并/去重）；
2. **防抖节流**降低高频触发（搜索、滚动）；
3. 请求合并（batch）减少请求数；
4. 静态化：内容型页面 SSR/SSG/预渲染，减少实时计算；
5. 降级预案：非核心接口失败不阻塞主流程。

**渲染方面**：
1. **虚拟列表**、分页加载减少 DOM 数量；
2. 组件懒加载、防重复渲染（memo/computed）；
3. 大图片优化、Web Worker 处理计算。

结合项目：数据上云平台多标签页监控场景，我用 BroadcastChannel 把 N 个 SSE 连接复用为 1 个，也是“降低资源消耗”的典型手段。`,ana:"三段式（资源/请求/渲染）+ 项目案例收尾。",keys:["CDN + 强缓存","请求合并","虚拟列表","SSG"],src:"一些高频率考点.md / 收集的面试知识点.md"},{id:"pf-011",type:"essay",diff:"hard",sub:"监控排查",q:"用户反馈页面白屏，你怎么排查？页面首屏慢，排查路径是什么？",ans:`**面试回答：**

**白屏排查**：
1. **复现**：确认设备/浏览器/账号环境，是否可稳定复现；
2. **看控制台**：JS 报错（脚本异常、资源 404）、接口报错；
3. **看 Network**：入口 JS/CSS 是否加载失败（CDN 故障、缓存污染、域名问题）、接口响应；
4. **定位层次**：资源加载失败 → 部署/CDN 问题；JS 运行时异常 → 渲染逻辑/兼容性问题（如浏览器插件改 DOM）；接口异常 → 后端问题；
5. **兜底验证**：是否有 ErrorBoundary 兜底、Sentry 之类的监控是否捕获到错误。

**预防**：路由级 ErrorBoundary（我的项目实践：翻译插件修改 DOM 导致渲染异常白屏，封装 ErrorBoundary 后局部可恢复）、错误监控上报、灰度发布。

**首屏慢排查路径**：
1. **Network** 看 DNS、连接、请求、下载耗时——判断慢在网络还是资源体积；
2. **Performance** 看主线程长任务、Layout/Paint、脚本执行耗时；
3. **Lighthouse** 看 LCP/CLS/INP 指标与建议；
4. **Coverage/Bundle Analyzer** 看未使用代码和包体积；
5. 对应优化：网络慢 → CDN/压缩/缓存；JS 慢 → 拆包/延后初始化；渲染慢 → 减少 DOM/虚拟列表。`,ana:"排查题的万能结构：复现 → 控制台 → Network → 定位层次 → 预防手段。",keys:["复现问题","Network 定位","ErrorBoundary 兜底","Lighthouse"],src:"问答类型面试题.md / 针对简历问答.md / 知识点快速复习指南.md"},{id:"pf-012",type:"judge",diff:"easy",sub:"渲染优化",q:"requestAnimationFrame 会把回调安排在浏览器下一次重绘之前执行，因此用它驱动动画比 setTimeout 更贴合渲染节奏。",ans:!0,ana:"rAF 与浏览器渲染帧同步（通常 60fps，每 16.7ms 一帧），动画不会掉帧错拍；页面不可见时自动暂停，省电省性能。setTimeout 不与渲染对齐，间隔不准还可能在页面后台继续执行（被节流）。",keys:["rAF 重绘前","16.7ms 帧","后台自动暂停"],src:"从零开始的前端面试题.md / 前端性能优化面试题.md"},{id:"pf-013",type:"multiple",diff:"medium",sub:"性能指标",q:"下列哪些属于 Google Core Web Vitals **核心性能指标**？（多选）",opts:["LCP（最大内容绘制）","INP（交互响应延迟）","CLS（布局稳定性）","TTFB（首字节时间）"],ans:["A","B","C"],ana:"Core Web Vitals 三大核心指标：**LCP**（首屏感知速度）、**INP**（交互响应延迟，替代了 FID）、**CLS**（布局稳定性）。TTFB（首字节时间）是重要的辅助指标但不属于核心三件套；FCP（首次内容绘制）也是常用辅助指标，说明白屏结束。补充口径：报数据要说明来源（Lighthouse 定位 vs 真实用户监控验证）和分位数（P75）。",keys:["LCP/INP/CLS","TTFB 辅助","P75 口径"],src:"知识点快速复习指南.md"},{id:"pf-014",type:"multiple",diff:"medium",sub:"渲染优化",q:"下列哪些手段可以**避免回流（Reflow）**或降低其开销？（多选）",opts:["动画使用 transform / opacity 代替 top / left","用 DocumentFragment 批量插入 DOM","循环里交替读取 offsetWidth 再改样式","动画元素设置 position: absolute / fixed 脱离文档流"],ans:["A","B","D"],ana:"transform/opacity 只走合成阶段跳过布局绘制；DocumentFragment 在内存中组装节点、一次性插入只触发一次回流；动画元素脱离文档流能缩小重排影响范围。**循环里读写交替**（改样式→读 offsetWidth→再改）会造成强制同步布局，是典型的反面做法——正确做法是读写分离：先统一读布局信息，再统一写。",keys:["transform 合成","DocumentFragment","读写分离"],src:"前端性能优化面试题.md / 浏览器原理知识点.md"}],Ca=[{id:"en-001",type:"essay",diff:"easy",sub:"Git",q:"Git 和 SVN 的区别是什么？git pull 和 git fetch 的区别？",ans:`**面试回答：**

**Git vs SVN**：
- SVN 是**集中式**版本控制：只有一个中央仓库，必须联网提交，单点故障风险；
- Git 是**分布式**：每个开发者本地都有**完整仓库历史**，可以离线提交、本地分支操作，push 时再同步到远程；分支轻量、切换快。

**git pull vs git fetch**：
- \`git fetch\`：只把远程仓库的**最新提交拉到本地远程分支**（origin/xx），**不合并**到当前分支，可以先查看差异再决定；
- \`git pull\` = \`git fetch + git merge\`（或配置为 rebase），拉下来**直接合并**，遇到冲突当场处理。

**rebase vs merge**：merge 保留分叉历史、产生合并提交；rebase 把当前分支提交“搬到”目标分支末尾，历史线性整洁，但会改写提交，**不要对已推送到公共分支的提交 rebase**。`,ana:"加分句：团队协作我会先 fetch 看差异，再用 rebase 保持提交历史线性。",keys:["分布式","fetch 不合并","rebase 线性历史"],src:"前端工程化面试题.md"},{id:"en-002",type:"essay",diff:"medium",sub:"Git",q:"git cherry-pick 是干什么的？什么场景会用到？",ans:`**面试回答：**\`git cherry-pick <commit>\` 把**指定的某个（或某段）提交**摘取应用到当前分支，生成新的提交。

**常见使用场景**：
1. 在错误分支上开发了功能，把提交摘到正确分支；
2. bug 修复提交需要同步到多个发布分支，不想整个分支合并；
3. 只想要某个功能分支中的部分提交。

**常用操作**：
\`\`\`bash
git cherry-pick <commitHash>          # 应用单个提交
git cherry-pick <hash1> <hash2>       # 按顺序应用多个
git cherry-pick A..B                  # 应用 (A, B] 区间，不含 A
git cherry-pick A^..B                 # 应用 [A, B]，包含 A
git cherry-pick --continue            # 解决冲突后继续
git cherry-pick --abort               # 取消，回到操作前状态
git cherry-pick -n <hash>             # 只应用更改不自动提交
\`\`\`

**项目经验**：农担项目中我用 cherry-pick 把一个分支的修复同步到另一个集成分支，解决冲突后用 --continue 继续；--abort 可以完全放弃恢复原状。`,ana:"这是 docs/农担项目所遇问题及总结.md 中记录的实际使用经验，带场景回答最自然。",keys:["摘取提交","多分支同步","--abort 回退"],src:"农担项目所遇问题及总结.md"},{id:"en-003",type:"essay",diff:"medium",sub:"Git",q:"Monorepo 主要解决了什么问题？Monorepo 和 git 子模块有什么区别？",ans:`**面试回答：**

**Monorepo**：多个项目/包放在**同一个仓库**中管理（pnpm workspace、Turborepo、Nx）。

**解决的问题**：
1. **跨项目共享代码**：公共组件、工具库改动一处，所有项目即时受益，不需要发 npm 包再各处升级；
2. **原子提交**：一个 PR 可以同时修改多个相关项目，版本一致性有保障；
3. **统一工程配置**：lint、构建、CI 规范统一；
4. 依赖去重与提升，减少磁盘与安装成本。

**Monorepo vs git 子模块**：
- **git submodule** 是把其他仓库作为引用嵌入，各仓库**独立版本、独立提交**，主仓库只记录指针；更新子模块要单独操作，协作成本高、容易忘记更新导致版本漂移；
- **Monorepo 所有代码在同一个仓库同一份历史**，没有指针同步问题，但仓库体积大、权限控制粗（不能按目录设权限）、CI 需要增量构建优化。

**选型**：需要强一致共享、团队协作紧密 → Monorepo；需要独立发布、权限隔离 → 多仓库 + 子模块/包管理。`,ana:"对比核心：同一份历史 vs 独立仓库指针引用。",keys:["原子提交","pnpm workspace","子模块指针"],src:"问答类型面试题.md"},{id:"en-004",type:"essay",diff:"medium",sub:"Webpack",q:"Webpack 的构建流程是怎样的？Loader 和 Plugin 有什么不同？",ans:`**面试回答：**

**Webpack 构建流程**：
1. **初始化**：读取配置（webpack.config.js + CLI 合并），创建 Compiler 对象，注册所有内置插件，触发 environment/afterEnvironment 钩子；
2. **开始编译**：run 被调用，创建 Compilation，从 **entry 入口**开始；
3. **编译模块**：调用对应 **Loader** 转换每个模块内容 → 生成 AST（babel-parse/acorn），找出依赖，**递归处理**形成依赖图（module/chunk）；
4. **封装产物**：根据依赖图把模块组合成 chunk，再转换成 bundle 输出到 output 目录；
5. 全程通过 **Tapable 钩子**广播事件（emit、done 等），插件在各阶段介入。

**Loader vs Plugin**：
- **Loader**：**文件转换器**，把非 JS 模块（TS、CSS、图片、SVG）转换为 Webpack 能处理的模块，运行在模块编译阶段，是**单一职责的纯转换函数**（test + use 配置，从右往左/从下往上执行）；
- **Plugin**：**基于 Tapable 的事件机制**介入**整个构建生命周期**，能拿到 compiler/compilation 实例做全局性处理：打包优化、资源压缩（TerserPlugin）、生成 HTML（HtmlWebpackPlugin）、环境变量注入、清空目录等。

一句话：**Loader 处理“一个文件”，Plugin 处理“整个构建过程”**。`,ana:"常见 Loader：babel-loader、ts-loader、css-loader、style-loader、sass-loader、file/asset、vue-loader。常见 Plugin：HtmlWebpackPlugin、MiniCssExtractPlugin、DefinePlugin、BundleAnalyzerPlugin。",keys:["依赖图","Loader 转换","Plugin 生命周期","Tapable"],src:"前端工程化面试题.md / 收集的面试知识点.md"},{id:"en-005",type:"essay",diff:"medium",sub:"Webpack",q:"bundle、chunk、module 分别是什么？怎么配置单页和多页应用？",ans:`**面试回答：**

- **module**：一切被 Webpack 处理的**模块**（JS 文件、CSS、图片，loader 处理后的产物），是最小处理单元；
- **chunk**：Webpack 内部**打包过程的中间产物**——按入口/拆分策略组合的一组 module，分为 initial（入口）、async（异步 import）、runtime chunk；
- **bundle**：构建最终**输出的文件**，通常一个 chunk 对应一个 bundle（也可以拆分/合并）。

关系：module 组成 chunk，chunk 输出成 bundle。

**单页应用（SPA）**：entry 只有一个入口，路由由前端处理：
\`\`\`js
module.exports = {
  entry: './src/index.js',
  output: { filename: 'bundle.js', path: path.resolve(__dirname, 'dist') },
}
\`\`\`

**多页应用（MPA）**：entry 配置多个入口，配合 HtmlWebpackPlugin 生成多个 HTML：
\`\`\`js
entry: { index: './src/index.js', admin: './src/admin.js' },
output: { filename: '[name].bundle.js' },
plugins: [new HtmlWebpackPlugin({ template: 'index.html', chunks: ['index'] })]
\`\`\``,ana:"chunk 是过程产物、bundle 是输出产物，这个区分是关键。",keys:["module/chunk/bundle","多 entry","HtmlWebpackPlugin"],src:"前端工程化面试题.md"},{id:"en-006",type:"essay",diff:"medium",sub:"Webpack",q:"如何提高 Webpack 的构建速度？如何减少打包体积、优化前端性能？",ans:`**面试回答：**分三个目标：

**1. 构建速度**：
- **持久化缓存**（cache: { type: 'filesystem' }），二次构建大幅提速；
- **缩小处理范围**：include/exclude 排除 node_modules，resolve.alias、resolve.extensions 精简；
- **多进程**：thread-loader 并行处理；
- 开发环境关闭不必要的优化、用 esbuild/swc 替代 babel；
- 用 speed-measure-webpack-plugin 定位慢在哪。

**2. 打包体积**：
- **Tree Shaking**：剔除未使用代码（依赖 ES6 静态模块）；
- **代码分割**：splitChunks 抽离公共依赖、路由懒加载；
- 第三方库**按需引入**（lodash-es、组件库自动导入）；
- webpack-bundle-analyzer 分析大依赖；
- 图片压缩、CSS 提取与压缩（MiniCssExtractPlugin）。

**3. 运行性能**：
- hash 文件名 + 长期强缓存，公共库抽独立 chunk 利用浏览器缓存；
- 按需 polyfill（@babel/preset-env + useBuiltIns）；
- CDN 外链大依赖。`,ana:"Tree Shaking 原理（docs 八股文第五幕）：依赖 ES6 静态 import/export → 编译期标记未使用 export → 压缩阶段由 Terser 删除。",keys:["持久化缓存","Tree Shaking","splitChunks","bundle-analyzer"],src:"前端工程化面试题.md / 前端性能优化面试题.md / 前端面试八股文.md / 基于简历的问题.md"},{id:"en-007",type:"essay",diff:"medium",sub:"Webpack",q:"Webpack 热更新（HMR）的实现原理是什么？",ans:`**面试回答：**HMR 让模块变化时**不刷新整个页面**、只替换变更模块并保留应用状态。

**流程**：
1. **启动时**：Webpack 开启 watch 模式监听文件变化；dev server（webpack-dev-server）与浏览器通过 **WebSocket** 保持长连接；
2. **文件变化**：Webpack 增量编译，生成变更模块的 **hash 和补丁文件（manifest + update chunk）**，通过 WebSocket 推送 hash 给浏览器；
3. **浏览器请求补丁**：客户端比对 hash 不一致后，通过 JSONP/AJAX 拉取 manifest 与更新 chunk；
4. **模块替换**：HMR runtime 判断模块是否有 \`module.hot.accept\` 注册的处理逻辑——有则执行回调替换旧模块、局部重新渲染；没有则**向上冒泡**到引用方，一路冒到入口还处理不了就整页刷新；
5. 状态保留：React 通过 react-refresh 保留组件 state。

**与 Vite HMR 的区别**：Webpack 需要把相关模块**重新打包**成补丁；Vite 利用原生 ESM，**只让浏览器重新请求变更的单个模块**，毫秒级生效。`,ana:"三个角色：webpack watch 编译、WebSocket 通知、HMR runtime 替换。module.hot.accept 是替换入口。",keys:["WebSocket 通知","hash 补丁","module.hot.accept"],src:"前端工程化面试题.md / 收集的面试知识点.md"},{id:"en-008",type:"essay",diff:"medium",sub:"Vite",q:"Vite 相比 Webpack 有什么优势？两者的热更新有什么区别？",ans:`**面试回答：**

**Vite 的优势（核心在开发体验）**：
1. **开发阶段免打包**：基于浏览器**原生 ESM** 按需加载——启动时只启动 dev server，请求到哪个模块才编译哪个（esbuild 预构建依赖），冷启动秒级；
   - Webpack 则要先从入口**分析整个依赖图并完整打包**，项目越大启动越慢；
2. **HMR 快**：只更新变更模块，浏览器直接重新 import，与项目规模解耦；
3. 生产构建基于 **Rollup**，产物质量高；配置简单，内置 TS、CSS 预处理、Vue/React 插件。

**两者的热更新区别**：
- **Webpack**：文件变化 → 重新打包受影响的 chunk → 生成 hash 补丁 → WebSocket 通知 → 浏览器拉补丁替换。项目越大，**增量打包时间越长**；
- **Vite**：文件变化 → 直接**让浏览器重新请求该模块**（加时间戳 query 破坏缓存），esbuild 处理，**速度与项目规模基本无关**。

**局限**：开发与生产行为有差异（Rollup 打包 vs 原生 ESM）、生态插件成熟度、老浏览器兼容需要额外处理。`,ana:"一句话总结：Vite 把“打包”从启动路径上拿掉了，开发时按需编译。",keys:["原生 ESM","esbuild 预构建","按需编译"],src:"收集的面试知识点.md / 基于简历的问题.md"},{id:"en-009",type:"essay",diff:"easy",sub:"Babel 与编译",q:"Babel 的原理是什么？编写一个 Loader 的思路是什么？",ans:`**面试回答：**

**Babel 原理**（编译器三部曲）：
1. **解析（Parse）**：词法分析 + 语法分析，把源码转成**抽象语法树 AST**（@babel/parser）；
2. **转换（Transform）**：遍历 AST，应用插件做转换——语法降级（箭头函数→普通函数）、补齐 API（polyfill）、JSX 转换（React.createElement）；
3. **生成（Generate）**：把新 AST 转回目标代码字符串（@babel/generator）。

**编写 Loader 的思路**：Loader 本质是**接收文件内容、返回处理后内容**的函数：
\`\`\`js
module.exports = function (source) {
  // this 指向 loader 上下文：this.query 拿配置、this.async() 处理异步
  return source.replace(/console\\.log\\(.*?\\);?/g, '')
}
\`\`\`
要点：处理单一文件类型（职责单一）、链式组合（从右到左）、支持异步（this.async + callback）、可以通过 pitch 阶段拦截。

**编写 Plugin 的思路**：导出带 apply(compiler) 的类/函数，通过 \`compiler.hooks.xxx.tap(name, callback)\` 订阅生命周期钩子（如 emit 前修改产物、done 输出统计），操作 compilation 资源。`,ana:"Babel 与 AST 是“编译前端”的基础：宏插件（babel-plugin-macros）、ESLint 都基于 AST。",keys:["AST","parse/transform/generate","loader 函数式","plugin 钩子"],src:"前端工程化面试题.md"},{id:"en-010",type:"essay",diff:"easy",sub:"npm 与包管理",q:"npm 是什么？dependencies、devDependencies、peerDependencies 有什么区别？npm install 的过程是怎样的？",ans:`**面试回答：**

- **npm**：Node.js 的**包管理工具**（Node 是 JS 运行时，npm 是配套的包管理器），负责依赖安装、版本解析、脚本执行；
- **dependencies**：**运行时依赖**，生产环境也需要（react、axios）；
- **devDependencies**：**开发/构建依赖**（vite、eslint、typescript），上线不需要；
- **peerDependencies**：**宿主依赖声明**——插件类包声明“我需要宿主项目提供某依赖”，避免重复安装多个实例（如组件库声明 peer react，确保用的是宿主的 React）。

**npm install 过程**：
1. 读取 package.json 和 lock 文件；
2. 构建/校验**依赖树**（解决版本冲突、扁平化去重）；
3. 检查本地缓存（缓存命中则直接解压）；
4. 从 registry 下载缺失包并**校验完整性**（integrity hash）；
5. 写入 node_modules、执行生命周期脚本（preinstall/postinstall）；
6. 更新 package-lock.json 锁定版本。

package-lock.json 的意义：锁定依赖树的确切版本和下载地址，保证团队和 CI 环境安装结果一致。`,ana:"registry 是包的远程仓库，npx 可以临时执行包而不安装。",keys:["运行时 vs 开发依赖","peerDependencies","lock 文件"],src:"知识点快速复习指南.md"},{id:"en-011",type:"essay",diff:"medium",sub:"工程化综合",q:"项目构建越来越慢、打包体积越来越大，你会怎么分析和优化？",ans:`**面试回答：**先定位再优化，分两个方向：

**一、定位**
- 构建慢：构建日志、speed-measure-webpack-plugin 看是 Loader 慢、依赖解析慢还是插件耗时长；
- 体积大：**webpack-bundle-analyzer** 分析产物构成，看哪些依赖占比大、有没有重复打包。

**二、构建速度优化**
1. 开启**持久化缓存**，增量构建；
2. 合理配置 include/exclude，Loader 不扫 node_modules；
3. alias 与 resolve.extensions 收敛，减少解析搜索；
4. 多进程（thread-loader）、升级工具链（Vite/esbuild/swc）。

**三、产物体积优化**
1. bundle-analyzer 找大依赖 → 替换轻量库、按需引入；
2. **代码分割**：路由懒加载、splitChunks 抽公共依赖；
3. 确保 **Tree Shaking** 生效（ESM 引入、sideEffects 配置）；
4. 公共依赖抽独立 chunk 利用浏览器缓存；
5. 图片压缩、开启 gzip/brotli。

**Vite 项目**：开发慢通常和**依赖预构建**有关（检查 optimizeDeps 配置）；生产基于 Rollup，优化思路同上。整体原则：**先定位是构建慢还是产物大，再用对应手段，不盲目加配置**。`,ana:"这是 docs/基于简历的问题.md 的“构建打包优化”原题，结构化答法直接可用。",keys:["定位先行","持久化缓存","bundle-analyzer","Tree Shaking"],src:"基于简历的问题.md"},{id:"en-012",type:"judge",diff:"easy",sub:"Webpack",q:"Loader 运行在模块编译阶段负责文件转换，Plugin 基于 Tapable 钩子机制可以介入 Webpack 整个构建生命周期。",ans:!0,ana:"Loader 是转换器（如 babel-loader 把 TS/JSX 转 JS），按配置链式从右向左执行；Plugin 通过 compiler.hooks / compilation.hooks 订阅事件，可以做压缩、生成 HTML、注入环境变量、产物分析等全局工作。",keys:["Loader 转换","Plugin 钩子"],src:"前端工程化面试题.md / 知识点快速复习指南.md"},{id:"en-013",type:"multiple",diff:"medium",sub:"Webpack",q:"要让 **Tree Shaking** 有效剔除未使用代码，下列哪些条件/做法是需要的？（多选）",opts:["使用 ES6 模块（import / export）而非 CommonJS","生产模式或开启代码压缩（Terser）","正确配置 sideEffects 标记无副作用文件","把公共库用 require 动态引入以方便分析"],ans:["A","B","C"],ana:"Tree Shaking 依赖 ES6 模块的**静态结构**（编译期可分析依赖），CommonJS 的 require 是运行时动态加载无法静态分析；编译阶段 Webpack 标记未使用的 export，**压缩阶段由 Terser 安全删除**；package.json 的 sideEffects 告诉打包器哪些文件有副作用（如 CSS、polyfill）不能被误删。用 require 动态引入恰恰会让 Tree Shaking 失效。",keys:["ESM 静态分析","标记 + 压缩删除","sideEffects"],src:"前端面试八股文.md / 前端工程化面试题.md"}],Ma=[{id:"al-001",type:"essay",diff:"medium",sub:"基础概念",q:"动态规划的核心特征有哪些？什么样的题目适合用动态规划？",ans:`**面试回答：**动态规划适合的问题有三个核心特征：

1. **最优子结构**：原问题的最优解可以由**子问题的最优解**推导出来（最明显）；
2. **重叠子问题**：递归展开后同一个子问题被反复计算——这是 DP 与普通分治的关键区分点，可以用**记忆化（缓存）或递推表格**避免重复计算；
3. **无后效性**：当前状态一旦确定，后续决策不受“状态是怎么来的”影响（容易忽略）。

**解题步骤**：
1. 定义状态（dp[i] 的含义）；
2. 找状态转移方程；
3. 确定初始化（边界条件）；
4. 确定遍历顺序；
5. （可选）空间优化：滚动数组把二维压一维。

**常见模型**：线性 DP（打家劫舍）、背包（0/1 背包）、区间 DP、字符串 DP（编辑距离）、双 DP（乘积最大子数组）。

**0/1 背包要点**：n 个物品、容量 W，\`dp[j] = max(dp[j], dp[j - w[i]] + v[i])\`；**一维数组必须倒序遍历容量**，防止同件物品被重复选取。`,ana:"重叠子问题是“能不能用 DP”的判据，无后效性是“转移方程是否成立”的判据。",keys:["最优子结构","重叠子问题","无后效性","滚动数组"],src:"基础算法.md"},{id:"al-002",type:"code",diff:"easy",sub:"双指针与滑动窗口",q:"合并区间：给定若干区间如 [[1,3],[2,6],[8,10],[15,18]]，合并所有重叠区间，返回不重叠的结果。",ans:`\`\`\`js
function merge(intervals) {
  if (!intervals.length) return []
  // 1. 按区间起点升序排序
  intervals.sort((a, b) => a[0] - b[0])
  const result = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1] // 结果末尾区间
    const current = intervals[i]
    if (current[0] <= last[1]) {
      // 有重叠：扩展末尾区间的右边界
      last[1] = Math.max(last[1], current[1])
    } else {
      // 无重叠：直接加入
      result.push(current)
    }
  }
  return result
}
// [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]
\`\`\`

**复杂度**：排序 O(n log n) + 遍历 O(n)，空间 O(n)。
**易错点**：边界相等也算重叠——[1,3] 和 [3,5] 应合并为 [1,5]（判断用 <=）。`,ana:"这是知识点快速复习指南的速记题。注意 last[1] 取 max 而不是直接赋 current[1]。",keys:["排序后合并","last[1] 取 max","O(n log n)"],src:"知识点快速复习指南.md / 基础算法.md"},{id:"al-003",type:"code",diff:"easy",sub:"哈希统计",q:"出现次数最多的数字：给定整数数组，找出出现次数最多的数字；如果有多个并列最多，返回所有这些数字。",ans:`\`\`\`js
function mostFrequent(nums) {
  const map = new Map()
  // 1. 统计频次
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1)
  }
  // 2. 找最大次数
  let maxCount = 0
  for (const count of map.values()) {
    maxCount = Math.max(maxCount, count)
  }
  // 3. 收集所有并列最多的数字
  const result = []
  for (const [num, count] of map) {
    if (count === maxCount) result.push(num)
  }
  return result
}
// [1,2,2,3,3,4] → 最大次数 2，结果 [2,3]
\`\`\`

**复杂度**：两次遍历 O(n)，空间 O(k)（k 为不同数字数量）。
**易错点**：要处理并列时建议分两次遍历（先求 maxCount 再收集），一次遍历里维护“结果数组”的分支逻辑容易出错。`,ana:"Map 统计 + 两遍遍历是标准模板，也可扩展到“字符出现次数”“两数之和”等哈希题。",keys:["Map 计数","两遍遍历","并列处理"],src:"知识点快速复习指南.md / 基础算法.md"},{id:"al-004",type:"code",diff:"easy",sub:"字符串",q:'最长公共前缀：给定字符串数组 ["flower","flow","flight"]，返回所有字符串的最长公共前缀，没有则返回空字符串。',ans:`\`\`\`js
function longestCommonPrefix(strs) {
  if (!strs.length) return ''
  let prefix = strs[0]
  for (let i = 1; i < strs.length; i++) {
    // 不是公共前缀就不断缩短
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
      if (!prefix) return ''
    }
  }
  return prefix
}
// "flower" → "flow"（匹配 flow）→ "fl"（匹配 flight）→ 结果 "fl"
\`\`\`

**另一种思路**（按列比较）：比较所有字符串的第 0 位、第 1 位……遇到某列字符不一致或越界即停止。

**复杂度**：时间约 O(S)（S 为字符串总字符数），空间 O(1)。
**易错点**：缩短前缀必须**从末尾删除**；不能只比较相邻字符串就返回，后续字符串可能进一步缩短公共前缀。`,ana:"两种实现都答出来更稳：纵向比较（列扫描）或横向缩减（startsWith）。",keys:["startsWith 缩短","列比较","空串兜底"],src:"知识点快速复习指南.md / 基础算法.md"},{id:"al-005",type:"code",diff:"medium",sub:"字符串",q:'版本号比较：比较两个版本号字符串如 "1.01" 和 "1.001"，忽略每段开头的多余零。',ans:`\`\`\`js
function compareVersion(v1, v2) {
  const a = v1.split('.')
  const b = v2.split('.')
  const len = Math.max(a.length, b.length)
  for (let i = 0; i < len; i++) {
    // 缺失的段按 0 处理，Number() 去掉前导零
    const x = Number(a[i] || 0)
    const y = Number(b[i] || 0)
    if (x !== y) return x > y ? 1 : -1
  }
  return 0 // 相等
}
compareVersion('1.01', '1.001') // 0
compareVersion('1.2', '1.10')   // -1（2 < 10）
\`\`\`

**易错点**：
1. **不能直接字符串比较**：\`"1.10" < "1.2"\` 按字典序会得出错误结果；
2. 段数不同时缺失部分按 0（\`"1.0"\` 与 \`"1"\` 相等）；
3. 用 Number 转换自动处理 "01" → 1 的前导零。`,ana:"前端实战关联：package 版本比较、灰度发布版本判断。",keys:["split 点分段","Number 去前导零","缺失段补 0"],src:"知识点快速复习指南.md"},{id:"al-006",type:"code",diff:"easy",sub:"字符串",q:'字符串转驼峰：把 "hello-world-test" 转换为 "helloWorldTest"。',ans:`\`\`\`js
function toCamelCase(str) {
  // 1. 正则统一分隔符并切分，过滤空段（处理连续分隔符）
  const parts = str.split(/[-_\\s]+/).filter(Boolean)
  if (!parts.length) return ''
  // 2. 首段保持原样，后续段首字母大写
  return (
    parts[0] +
    parts.slice(1).map((p) => p[0].toUpperCase() + p.slice(1)).join('')
  )
}
toCamelCase('hello-world-test') // helloWorldTest
toCamelCase('foo--bar')          // fooBar（连续分隔符被正确处理）
\`\`\`

**另一种实现**（一次 replace）：

\`\`\`js
const toCamel = (s) =>
  s.replace(/[-_](\\w)/g, (_, c) => c.toUpperCase())
\`\`\`

**边界约定要说清**：连续分隔符是否忽略、空字符串返回什么、是否保留首段大小写。`,ana:"replace 回调写法更简洁，正则捕获组取首字母是常见变体。",keys:["split 正则","replace 回调","边界处理"],src:"知识点快速复习指南.md"},{id:"al-007",type:"essay",diff:"medium",sub:"链表",q:"快慢指针能解决哪些链表问题？如何判断链表有环、找链表中点？",ans:`**面试回答：**快慢指针（Floyd 判圈）用两个速度不同的指针遍历，O(1) 空间解决一类链表问题：

1. **判断有环**：快指针每次走 2 步、慢指针每次走 1 步；如果有环，两者必然在环内**相遇**；快指针到 null 则无环。
2. **找环入口**：相遇后让一个指针回到 head，同速前进，再次相遇点就是入口（数学推导：head 到入口距离 = 相遇点绕环到入口距离）；
3. **找中点**：快指针走 2 步、慢指针走 1 步，快指针到尾时慢指针在中点（偶数长度偏后，可微调），用于**链表归并排序**的切分；
4. **删除倒数第 n 个节点**：让快指针先走 n 步，再同步走，快指针到尾时慢指针在倒数第 n+1 个，直接跳过目标节点。

**手写判断有环**：

\`\`\`js
function hasCycle(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}
\`\`\``,ana:"四个经典应用：判环、找入口、找中点、倒数第 n 个。链表题统一注意 dummy 哨兵节点。",keys:["Floyd 判圈","O(1) 空间","dummy 哨兵"],src:"基础算法.md"},{id:"al-008",type:"essay",diff:"medium",sub:"栈与队列",q:"栈和队列的应用：如何实现一个最小栈？单调栈适合什么问题（如每日温度）？",ans:`**面试回答：**

**最小栈**：支持 push/pop/top 且 **O(1) 获取最小值**。实现：主栈正常存值，辅助栈（或栈内同时存“当前最小值”）在 push 时同步压入“min(当前值, 当前最小)”，pop 时同步弹出——保证每个状态下最小值同步维护：

\`\`\`js
class MinStack {
  constructor() { this.stack = []; this.minStack = [] }
  push(val) {
    this.stack.push(val)
    const min = this.minStack.length
      ? Math.min(this.minStack[this.minStack.length - 1], val)
      : val
    this.minStack.push(min)
  }
  pop() { this.stack.pop(); this.minStack.pop() }
  top() { return this.stack[this.stack.length - 1] }
  getMin() { return this.minStack[this.minStack.length - 1] }
}
\`\`\`

**单调栈**：栈内元素保持单调（递增/递减），遇到破坏单调性的元素时弹出并结算。适合“**下一个更大/更小元素**”类问题：
- **每日温度**：求每个位置之后多少天更热——维护递减栈，遇到更高温度时弹出栈顶并计算天数差；
- 应用还有柱状图最大矩形、下一个更大元素 II。

本质：**用一次遍历为每个元素找到它“需要等待”的目标，O(n) 替代 O(n²) 双重循环**。`,ana:"数组实现也可以：JavaScript 数组的 push/pop 天然是栈。",keys:["辅助栈同步","单调递减栈","下一个更大元素"],src:"基础算法.md"},{id:"al-009",type:"essay",diff:"medium",sub:"树与图",q:"二叉树的 DFS 能解决哪些问题？如何找两个节点的最近公共祖先？岛屿数量怎么求？",ans:`**面试回答：**

**二叉树 DFS**：递归遍历（前/中/后序）是多数树问题的基础，应用：最大深度、路径和、翻转二叉树、判断对称。技巧是**双重 DFS**（每个节点作为起点做一次遍历，O(n²)）或一次遍历携带信息（自底向上返回值）。

**最近公共祖先（LCA）**：

\`\`\`js
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root
  const left = lowestCommonAncestor(root.left, p, q)
  const right = lowestCommonAncestor(root.right, p, q)
  // p、q 分居两侧，当前节点就是 LCA
  if (left && right) return root
  return left || right
}
\`\`\`
思路：后序遍历自底向上，如果 p、q 分别出现在左右子树，当前节点就是答案；否则向上传递找到的那一侧。

**岛屿数量**：网格中 “1” 连成岛屿，求个数。遍历每个格子，遇到 "1" 计数 +1，并从该点 **DFS/BFS 把整个连通区域“淹掉”（置 0）**，保证每个岛屿只被统计一次。属于连通分量计数问题，同样思路可判断**有向图无环（拓扑排序）**。`,ana:"LCA 的左右结果组合判断是核心；岛屿问题讲清“遍历 + 感染”两步。",keys:["后序遍历","分居两侧","DFS 感染"],src:"基础算法.md"},{id:"al-010",type:"essay",diff:"medium",sub:"缓存设计",q:"LRU 缓存怎么设计实现？",ans:`**面试回答：**LRU（Least Recently Used）淘汰**最久未使用**的数据。

**设计**：要求 get/put 都是 O(1)——
- **哈希表**：key → 节点，O(1) 定位；
- **双向链表**：维护使用顺序，头部最新、尾部最旧，O(1) 移动/删除节点。

**流程**：
- get(key)：哈希表找到节点 → 从链表摘下移到头部 → 返回值；不存在返回 -1；
- put(key, value)：存在则更新并移到头部；不存在则新建插入头部，**容量超限时删除链表尾部节点及哈希表记录**。

\`\`\`js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map() // Map 保持插入序，模拟链表
  }
  get(key) {
    if (!this.map.has(key)) return -1
    const val = this.map.get(key)
    this.map.delete(key)
    this.map.set(key, val) // 移到最新
    return val
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key)
    this.map.set(key, value)
    if (this.map.size > this.capacity) {
      // Map.keys().next().value 是最旧的 key
      this.map.delete(this.map.keys().next().value)
    }
  }
}
\`\`\`

**进阶**：JS 的 Map 有序，可以模拟；生产实现用双向链表 + 哈希表（如手写或 LinkedHashMap）。**前端应用**：keep-alive 的 max 缓存淘汰就是 LRU。`,ana:"哈希表 + 双向链表 = O(1)；Map 模拟版是 JS 特色的简化答法。",keys:["双向链表 + 哈希表","O(1)","keep-alive LRU"],src:"基础算法.md"},{id:"al-011",type:"essay",diff:"medium",sub:"位运算",q:"常见的位运算技巧有哪些？异或运算有什么性质和应用？",ans:`**面试回答：**

**常用位运算**：
- \`x & 1\`：判断奇偶（末位为 1 是奇数）；
- \`x >> 1\`：除以 2（取整）；\`x << 1\`：乘以 2；
- \`x & (x - 1)\`：消去最低位的 1，可用于**统计二进制中 1 的个数**、判断 2 的幂；
- \`x & (-x)\`：获取最低位的 1；
- \`x ^ 0 = x\`，\`x ^ x = 0\`。

**异或的性质与应用**：
1. **自反性**：a ^ a = 0，a ^ 0 = a，交换律结合律成立；
2. **只出现一次的数字**：数组中其他数都出现两次，全部异或后剩下只出现一次的数（成对的互相抵消）；
3. **不用临时变量交换两数**：a ^= b; b ^= a; a ^= b（了解即可，实际可读性差）；
4. **状态压缩**：用位标记开关集合（如 N 皇后的列/对角线占用状态），空间小、操作快。

**找不同**（两个字符串只有一个字符不同）：所有字符异或运算，剩下的是多出的字符。`,ana:"异或三大性质：自反、与 0 不变、交换结合。状态压缩是进阶应用。",keys:["异或自反","x&(x-1)","状态压缩"],src:"基础算法.md"},{id:"al-012",type:"code",diff:"hard",sub:"回溯",q:"N 皇后问题的回溯思路是什么？写出核心框架。",ans:`**面试回答：**N 皇后要求 n×n 棋盘放 n 个皇后，**同行、同列、同对角线**不冲突。

**回溯框架**：逐行放置（每行必有一个），尝试每一列；冲突则剪枝回溯。

\`\`\`js
function solveNQueens(n) {
  const result = []
  const cols = new Set()        // 已占用的列
  const diag1 = new Set()       // 主对角线 (row - col)
  const diag2 = new Set()       // 副对角线 (row + col)
  const board = []

  function backtrack(row) {
    if (row === n) {
      result.push([...board])
      return
    }
    for (let col = 0; col < n; col++) {
      // 剪枝：同列或同对角线已占用
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue
      cols.add(col); diag1.add(row - col); diag2.add(row + col)
      board.push(col)
      backtrack(row + 1)
      // 回溯撤销选择
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col)
      board.pop()
    }
  }
  backtrack(0)
  return result
}
\`\`\`

**要点**：
1. **逐行递归**天然保证行不冲突；
2. 主对角线用 \`row - col\`、副对角线用 \`row + col\` 标识（同一条对角线上差值/和值恒定）；
3. 回溯三步：做选择 → 递归 → **撤销选择**；
4. 位运算优化：用三个整数的二进制位表示列/对角线占用，更快。`,ana:"回溯 = 决策树遍历 + 剪枝 + 撤销。对角线标识技巧是本题核心记忆点。",keys:["回溯框架","对角线 row±col","剪枝撤销"],src:"基础算法.md"},{id:"al-013",type:"essay",diff:"medium",sub:"贪心与哈希",q:"贪心算法适用什么场景？前缀和有什么用？最长连续序列怎么做？",ans:`**面试回答：**

**贪心**：每一步做**局部最优**选择，希望推出全局最优。适用前提：**局部最优能推出全局最优**（贪心选择性质），通常需要排序或证明。经典：跳跃游戏（维护能到达的最远位置）、区间调度、分发饼干。区别于 DP：贪心不回溯、不比较所有子问题。

**前缀和**：预处理 \`prefix[i] = nums[0..i-1] 之和\`，任意区间和 \`sum(i, j) = prefix[j+1] - prefix[i]\`，把区间求和从 O(n) 降到 O(1)。配合哈希表还能解决“和为 K 的子数组”（记录前缀和出现次数）。

**最长连续序列**（如 [100,4,200,1,3,2] → 连续序列 1,2,3,4 长度 4）：要求 O(n)——
1. 全部放入 **Set**；
2. 只从**序列起点**开始数（\`!set.has(x - 1)\` 才是起点）；
3. 从起点不断 \`set.has(x + 1)\` 向后延伸计数，更新最大值。
关键在于“只从起点数”，每个数字最多访问两次，总复杂度 O(n)。`,ana:"贪心 vs DP 的区别一句话：贪心不比较所有可能、不回头。",keys:["局部最优","前缀和 O(1) 区间和","Set 判起点"],src:"基础算法.md"},{id:"al-014",type:"code",diff:"hard",sub:"数组",q:"四数之和：数组中找出四个数之和等于 target 的所有不重复四元组。说说思路。",ans:`**面试回答：**两种思路，推荐排序 + 双指针：

**思路一：排序 + 双指针（O(n³)，推荐）**
1. 数组**升序排序**；
2. 固定前两个数 i、j（双重循环）；
3. 剩余区间用**左右双指针** l、r 收缩：四数和偏小则 l++，偏大则 r--，相等则收集一组；
4. **去重**：i、j、l、r 移动时跳过相同值（\`nums[k] === nums[k-1]\` 时 continue）；
5. **剪枝**：最小的四个数之和 > target 直接 break；当前数配上最大三数之和 < target 直接 continue。

**思路二：回溯 + 减枝 + 去重**：把问题看成“在排序数组中选 4 个数”，DFS 层级选择，用“同一层跳过重复值”去重，选满 4 个且和等于 target 时记录。通用性更好但常数大。

**易错点**：去重必须基于**排序后的相邻比较**；结果四元组要判重；数值相加可能溢出（用 BigInt 或注意语言类型）。`,ana:"与三数之和（15 题）同构，n 数之和都是“固定 n-2 个 + 双指针”。",keys:["排序双指针","同层去重","剪枝"],src:"基础算法.md"},{id:"al-015",type:"code",diff:"medium",sub:"动态规划",q:"0/1 背包问题：n 个物品各有重量 w[i] 和价值 v[i]，背包容量 W，求能装入的最大价值。写出状态转移方程和代码。",ans:`**面试回答：**

**状态定义**：dp[i][j] 表示前 i 个物品、容量 j 时的最大价值。

**状态转移**（对第 i 个物品：不装 or 装）：

\`\`\`
dp[i][j] = max(dp[i-1][j],                    // 不装第 i 件
               dp[i-1][j - w[i]] + v[i])       // 装第 i 件（j >= w[i]）
\`\`\`

**一维滚动数组优化**（必须**倒序遍历容量**）：

\`\`\`js
function knapsack(W, weights, values) {
  const dp = new Array(W + 1).fill(0)
  for (let i = 0; i < weights.length; i++) {
    // 倒序：保证每件物品只被选一次
    for (let j = W; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
    }
  }
  return dp[W]
}
\`\`\`

**为什么倒序**：正序时 dp[j - w[i]] 已被本轮更新，相当于第 i 件物品可以被选多次，变成**完全背包**；倒序用的是上一轮（i-1）的值，才是 0/1 语义。

**变体**：完全背包正序遍历；分割等和子数组装“和/2”；目标和转化为 0/1 背包计数。`,ana:"“倒序遍历”的原因是本题最常被追问的点，务必讲清。",keys:["dp[i][j]","滚动数组倒序","完全背包正序"],src:"基础算法.md"},{id:"al-016",type:"essay",diff:"medium",sub:"数组与字符串",q:"接雨水问题怎么解？双指针法的思路是什么？",ans:`**面试回答：**接雨水：给定柱子高度数组，求能接多少水。每个位置能接的水 = **min(左边最高, 右边最高) - 当前高度**。

**思路一：动态规划预处理（O(n) 时间 O(n) 空间）**：先从左到右算出每个位置的左侧最大值 leftMax[i]，再从右到左算右侧最大值 rightMax[i]，最后逐位累加 \`min(leftMax[i], rightMax[i]) - height[i]\`。直观好懂。

**思路二：双指针（O(n) 时间 O(1) 空间，最优）**：
- 左右两个指针从两端向中间移动，同时维护 leftMax、rightMax；
- **哪边最大值更小，就结算哪边**：若 leftMax < rightMax，说明左指针位置的水位由 leftMax 决定（右边必有一个 ≥ rightMax > leftMax 的墙），可以直接累加并移动左指针；反之亦然。

\`\`\`js
function trap(height) {
  let left = 0, right = height.length - 1
  let leftMax = 0, rightMax = 0, water = 0
  while (left < right) {
    if (height[left] < height[right]) {
      leftMax = Math.max(leftMax, height[left])
      water += leftMax - height[left]
      left++
    } else {
      rightMax = Math.max(rightMax, height[right])
      water += rightMax - height[right]
      right--
    }
  }
  return water
}
\`\`\`

核心洞察：**位置 i 的水量只由两侧较小的一方决定**，双指针始终处理较小一侧，无需完整预处理。`,ana:"先讲“逐位水量公式”，再给两种实现，体现从直观到优化的思路演进。",keys:["min(左最大,右最大)","双指针 O(1) 空间","较小侧结算"],src:"基础算法.md"},{id:"al-017",type:"essay",diff:"easy",sub:"基础概念",q:"Time 复杂度 O(n log n) 常出现在哪些算法？HashMap/Map 的查询为什么是 O(1)？",ans:`**面试回答：**

**O(n log n)**：基于**比较的排序**的下界（归并、快排平均、堆排序）；以及“排序 + 一层遍历”的算法模式（合并区间、四数之和预处理）。n log n 意味着 log n 层 × 每层 n 次操作（分治）。

**Map/HashMap 为什么 O(1)**：底层用**哈希表**——key 经哈希函数映射为数组下标，直接定位存储位置，无需遍历。最坏情况（哈希冲突严重退化成链表/红黑树）是 O(n)/O(log n)，平均 O(1)。Set 的 has 同理。

**常见复杂度速查**：
- 两数之和哈希法 O(n) vs 双重循环 O(n²)；
- 二分查找 O(log n)；
- 树的遍历 O(n)；
- 回溯类通常是指数级/阶乘级（N 皇后、全排列）。

面试口答复杂度时讲清“**时间花在哪一层**”比背结论更能加分。`,ana:"哈希冲突处理（链地址/开放寻址）可作延伸。",keys:["哈希函数","平均 O(1)","比较排序下界"],src:"基础算法.md / 收集的面试知识点.md"},{id:"al-018",type:"code",diff:"medium",sub:"数组与字符串",q:"用两种方法实现数组去重（基本类型数组），并说明对象数组如何按字段去重。",ans:`\`\`\`js
// 方法一：Set（首选，O(n)）
const unique1 = (arr) => [...new Set(arr)]

// 方法二：filter + indexOf（O(n²)，但直观）
const unique2 = (arr) => arr.filter((item, i) => arr.indexOf(item) === i)

// 对象数组按字段去重：用 Map 以业务字段为 key
function uniqueBy(arr, key) {
  const map = new Map()
  for (const item of arr) {
    if (!map.has(item[key])) map.set(item[key], item)
  }
  return [...map.values()]
}
uniqueBy([{ id: 1, a: 'x' }, { id: 1, b: 'y' }], 'id') // 保留第一个
\`\`\`

**要点**：
1. Set 内部用哈希结构，去重 O(n)，NaN 也会被去重（SameValueZero 语义）；
2. indexOf 是线性查找，整体 O(n²)，小数组无妨；
3. 对象是引用类型，Set 无法直接去重对象，必须**按业务字段**用 Map/对象索引；
4. 需要保留最后一个而非第一个时，倒序处理或覆盖写入。`,ana:"NaN 的去重（SameValueZero）是细节加分点。",keys:["new Set","indexOf 两次复杂度","按字段 Map"],src:"知识点快速复习指南.md / 问答类型面试题.md"},{id:"al-019",type:"essay",diff:"medium",sub:"字符串与 DP",q:"回文子串的数量怎么统计？中心扩展法和动态规划分别怎么做？",ans:`**面试回答：**统计字符串中回文子串个数（如 "aaa" 有 6 个：a,a,a,aa,aa,aaa）。

**思路一：中心扩展法（O(n²) 时间 O(1) 空间，推荐）**：回文一定有中心——**奇数长度**以单个字符为中心（n 个），**偶数长度**以两字符间隙为中心（n-1 个），共 2n-1 个中心。从每个中心向两侧扩展，两侧字符相等就计数 +1：

\`\`\`js
function countSubstrings(s) {
  let count = 0
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++
      l--
      r++
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i, i)     // 奇数长度中心
    expand(i, i + 1) // 偶数长度中心
  }
  return count
}
\`\`\`

**思路二：二维 DP（O(n²) 时间 O(n²) 空间）**：\`dp[i][j]\` 表示 s[i..j] 是否回文——
- \`s[i] !== s[j]\`：false；
- \`s[i] === s[j]\`：j - i < 2（单字符或双字符）为 true，否则 \`dp[i][j] = dp[i+1][j-1]\`；
遍历时统计 true 的个数（i 从后往前、j 从 i 往后遍历保证子问题已算）。

同构问题：最长回文子串（两者都适用）。`,ana:"中心扩展空间 O(1) 是面试更推荐的答法；2n-1 个中心是关键数字。",keys:["中心扩展","2n-1 个中心","dp[i+1][j-1]"],src:"基础算法.md"},{id:"al-020",type:"essay",diff:"easy",sub:"树与 Trie",q:"Trie（前缀树）是什么结构？有什么使用场景？",ans:`**面试回答：**Trie（字典树/前缀树）是专门处理**字符串前缀**的多叉树：每个节点代表一个字符，从根到某节点的路径拼出字符串；**公共前缀共享同一条路径**。

**核心操作**：insert（逐字符建子节点）、search（整词查找，需标记 isEnd）、startsWith（前缀查找，不需要 isEnd）。

**使用场景**：
1. 搜索框**输入联想/自动补全**（前缀匹配）；
2. 拼写检查、词频统计；
3. IP 路由最长前缀匹配；
4. 大量字符串的存储与去重（压缩公共前缀省空间）。

**复杂度**：插入/查找 O(L)（L 为单词长度），与词条总数无关——这是对比哈希表的优势（哈希表查前缀必须全表扫描）。

**实现要点**：节点用 Map/array 存子节点，isEnd 标记单词结束。`,ana:"前端关联：搜索联想输入框、路由通配匹配。",keys:["前缀共享","isEnd 标记","O(L) 查找"],src:"基础算法.md"},{id:"al-021",type:"multiple",diff:"easy",sub:"基础概念",q:"下列哪些排序算法的**平均时间复杂度是 O(n log n)**？（多选）",opts:["归并排序","快速排序（平均）","堆排序","冒泡排序"],ans:["A","B","C"],ana:"归并、快排（平均）、堆排序都是 O(n log n)，这也是基于比较的排序的时间复杂度下界。冒泡排序是 O(n²)。前端关联：V8 的 Array.prototype.sort 对大数组使用 TimSort（归并 + 插入的混合），JS 里“排序 + 一层遍历”的算法模式（合并区间、四数之和）整体复杂度也是 O(n log n)。",keys:["比较排序下界","TimSort","O(n²) 对比"],src:"基础算法.md"}],Na=[{id:"sc-001",type:"essay",diff:"medium",sub:"大文件上传",q:"大文件上传怎么做？分片、断点续传、并发控制的完整方案是什么？",ans:`**面试回答：**按“背景 → 方案 → 难点 → 结果”组织：

**背景**：SQL 大文件（几百 MB）单次上传时间长，一旦失败整个文件重来，稳定性差。

**方案**：
1. **分片上传**：前端把大文件按固定大小（如 5MB）切片，每个分片带上 fileId/fileHash/chunkIndex/chunkHash 信息；
2. **并发上传**：限制并发数（3~6 起步，按带宽和服务端限流调整），失败重试，支持暂停和取消（AbortController）；
3. **断点续传**：客户端生成稳定文件标识（文件名+大小+最后修改时间的 hash 或内容 hash），上传前先问服务端**已上传了哪些分片**，只补传缺失部分；
4. **服务端合并**：分片校验后记录，全部完成时**按 chunkIndex 排序合并**，合并后校验完整性；
5. **进度计算**：已完成分片字节数 / 文件总字节数（不是简单按分片数量算，除非分片完全等大）；
6. **Web Worker** 计算大文件 MD5，避免阻塞主线程。

**难点**：
- 分片大小权衡：太小请求数爆炸，太大失败重试代价高，按网络与服务端限制压测决定；
- 状态一致性：区分文件整体状态和每个分片状态，半数失败时保留成功的、只重试失败分片；
- 同一文件切片下标必须稳定：固定 chunkSize、按顺序计算 start/end、传输 chunkIndex。

**结果**：上传成功率与断网续传能力显著提升，用户中断后无需重传。`,ana:"这是 docs 反复强调的重点项目素材（知识点快速复习指南 + 问答类型面试题 + 基于简历的问题）。",keys:["分片 + chunkIndex","断点续传询问缺失分片","并发 3~6","Web Worker 算 MD5"],src:"问答类型面试题.md / 知识点快速复习指南.md / 一些高频率考点.md"},{id:"sc-002",type:"essay",diff:"medium",sub:"并发与限流",q:"QPS 达到峰值时，前端有哪些应对手段？",ans:`**面试回答：**前端能在“请求发起侧”做的治理，四个方向：

1. **请求限流**：限制同时进行的请求数（并发控制/请求队列），完成一个再放行下一个；高频触发用**防抖节流**降低发起频率；
2. **请求合并**：把短时间内的多个同类请求合并成一个批量请求（如 100ms 内的多次搜索合并、批量上报合并），减少请求数；
3. **请求缓存**：相同参数的请求结果缓存/去重（Map 以参数为 key，进行中的请求共享同一个 Promise），避免重复消耗；
4. **任务队列**：非实时任务（日志上报、图片处理）进入队列异步分批执行，削峰填谷。

**配合服务端**：接口限流（429 状态码识别）、CDN 静态化、服务端缓存。前端拿到 429 要做**退避重试**（指数退避），避免雪崩式重试。

**总结**：前端治理的本质是**削峰**——把瞬时大量请求变成可控的稳态流量，真正的容量问题必须靠服务端扩容和架构优化。`,ana:"限流、合并、缓存、队列四个词是 docs 的原文框架。",keys:["并发控制","请求合并","指数退避","削峰"],src:"问答类型面试题.md"},{id:"sc-003",type:"essay",diff:"medium",sub:"多标签页通信",q:"详细说说 BroadcastChannel 的运行逻辑（主从选举、心跳、异常恢复）。",ans:`**面试回答：**（这是我简历的核心亮点，按完整链路讲）

**目标**：数据上云平台用 SSE 推送监控数据，HTTP/1.1 下浏览器同域只有 **6 个长连接**，用户开多个标签页会导致新页面请求阻塞、图表不更新。方案：**保证任意时刻只有一个标签页持有 SSE 连接**，其他标签页通过 BroadcastChannel 获取数据。

**运行逻辑**：
1. **注册**：新标签页打开时给自己分配 tabId，注册到 localStorage 的 activeTabs；
2. **选举**：所有标签页按 tabId 排序，**tabId 最小者当 Master**（确定性选举），Master 把 instanceId 写入 masterKey 公示，其余标签页通过 BroadcastChannel 和 storage 事件感知——第一次打开的页面通常成为 Master；
3. **分工**：Master 持有 SSE 连接，收到推送后**统一广播**（消息带 serverId、pageId），各子标签页按自己订阅的标识过滤，避免无效渲染和串扰；BroadcastChannel 负责实时通信（选主、转发消息、心跳），activeTabs 负责成员感知；
4. **正常关闭**：Master 关闭触发 beforeunload，广播 master-disconnected 并清除 masterKey，其他标签页立即重新选举；
5. **异常恢复**：浏览器崩溃/断电时 unload 不执行，靠**心跳**——从标签页每 30 秒 ping，Master 回 pong，5 秒没收到 pong 就发起重新选举；
6. **后台标签页节流**：浏览器对后台页定时器降频，可能被误判失活清理；被清理的页面切回时会重新注册（非抢占式，现任 Master 不受影响）。

**为什么不用 localStorage 通信**：storage 事件**不通知当前页面**、实时性和性能一般；BroadcastChannel 原生支持同源多页实时通信，且只需修改 SSE 总配置文件，侵入小。

**评价**：解决了 90% 的问题；剩余风险是后台标签页被限速误判失活、localStorage 非原子操作有极小概率脑裂（选举结果确定性使其概率很低）。`,ana:"docs 针对简历问答 + 项目逻辑两处原文的整合，几乎原文可背。亮点话术：只改一个 SSE 配置文件。",keys:["tabId 选举","心跳 ping/pong","非抢占式","serverId/pageId 过滤"],src:"针对简历问答.md / 项目逻辑.md"},{id:"sc-004",type:"essay",diff:"medium",sub:"组件设计",q:"什么场景下需要封装组件？封装组件的判断标准是什么？",ans:`**面试回答：**

**什么时候封装**（满足任一即可考虑）：
1. **多处复用**且交互规则一致；
2. 业务逻辑复杂，单页维护成本高；
3. 需要**统一样式、行为、校验和错误处理**；
4. 需要沉淀为团队**公共能力**。

**封装前的设计清单**：输入（props）、输出（事件/回调）、默认值、插槽/children、受控或非受控模式、异常状态、可扩展点。

**我的实践**（高分回答）：
1. 封装时遵循**高内聚、低耦合、可配置化**：和业务强相关的部分抽离出去，props 控制展示，emit/回调暴露事件，插槽/render props 提供扩展；
2. 智能体平台工作流节点类型很多，如果每种节点写一个表单组件维护成本高——我抽象了**配置驱动的动态渲染机制**：节点类型、字段类型、校验规则统一放到配置对象，组件按配置生成表单项，新增节点只加配置；
3. 组件分层：**基础组件只管 UI 和交互，不处理接口请求**；业务组件负责数据组合和状态管理；复杂场景提供公共 hooks；
4. 避免为了复用而**过度抽象**——只有稳定的“字段+类型+默认值+校验”才配置化，复杂联动就组件化。`,ana:"通用部分配置化、特殊部分组件化——这是 docs 中出现两次的核心原则。",keys:["高内聚低耦合","配置驱动","插槽扩展","避免过度抽象"],src:"一些高频率考点.md / 问答类型面试题.md / 知识点快速复习指南.md"},{id:"sc-005",type:"essay",diff:"medium",sub:"组件设计",q:"举一个你封装的最有复用价值的组件例子：它解决了什么重复问题？如何设计的？",ans:`**面试回答：**（以 Error Boundary 为例，docs 原题答案）

**背景与重复问题**：农担智能体平台模块很多（构建、模型、知识库、系统、用户管理、召回测试等）。之前某个模块内部渲染异常会直接**整页白屏**——确实遇到过用户反馈某些页面白屏且本地难复现，排查发现是用户 Chrome 的**翻译插件修改 DOM** 导致 React 渲染异常。

**解决目标**：统一处理“局部模块异常导致全局白屏”，避免每个页面都写异常兜底逻辑。

**设计**：外部只需要 \`<ErrorBoundary><BusinessModule /></ErrorBoundary>\` 包住需要保护的模块，核心用 children 接收业务内容（因为它主要包在路由文件/关键模块外层）：

\`\`\`tsx
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true } // 子组件渲染异常时切换到兜底 UI
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info) // 记录错误，便于定位渲染链路
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div>当前模块出现异常</div>
          <button onClick={() => window.location.reload()}>重新加载</button>
        </div>
      )
    }
    return this.props.children
  }
}
\`\`\`

**价值**：路由级统一包裹后，某个模块异常时页面不整体崩溃，用户可重载或去其他功能——每个业务模块不需要自己实现异常兜底。解决的是**平台级**重复问题。`,ana:"组件封装题模板：重复问题 → 设计（Props/内部逻辑）→ 复用价值。必须用 class 实现（依赖生命周期）。",keys:["getDerivedStateFromError","componentDidCatch","路由级包裹"],src:"项目逻辑.md / 针对简历问答.md / 农担项目所遇问题及总结.md"},{id:"sc-006",type:"essay",diff:"medium",sub:"错误监控",q:"前端错误监控系统怎么设计？如果让你设计一个日志上报 SDK，模块如何划分、上报策略怎么定？",ans:`**面试回答：**

**错误分类**：
1. **JS 运行时错误**：window.onerror / window.addEventListener('error') 捕获；
2. **Promise 未捕获异常**：unhandledrejection 事件；
3. **资源加载错误**：error 事件捕获阶段监听（img/script/link）；
4. **接口错误**：拦截 axios/fetch 统一上报状态码与耗时；
5. **React 特有**：ErrorBoundary 的 componentDidCatch / getDerivedStateFromError。

**SDK 模块划分**（面试官要求讲思路）：
1. **采集层**：注册各类监听，标准化错误对象（错误信息、堆栈、组件树、userAgent、页面 URL）；
2. **上下文层**：用户行为面包屑（点击、路由变化）、性能数据（web-vitals：LCP/INP/CLS）、请求记录，用于还原现场；
3. **缓冲队列层**：内存队列 + 定时/定量刷出；
4. **上报层**：sendBeacon（页面卸载也不丢）优先，降级 fetch/image；失败重试与本地暂存；
5. **配置层**：采样率、开关、环境区分、忽略规则（如过滤插件噪音）。

**上报策略**：
- **定量 + 定时**：队列满 N 条或超过 T 秒批量上报；
- **重要错误立即上报**；错误聚合（相同错误指纹合并计数，避免重复轰炸）；
- **采样**：普通日志抽样上报，错误不抽样；
- **页面卸载**用 sendBeacon 保证不丢。

**还原现场**：配合 sourcemap 还原压缩堆栈、版本号关联发布记录。`,ana:"“采集-上下文-缓冲-上报-配置”五层划分 + 采样/聚合/sendBeacon 三策略，是满分结构。",keys:["unhandledrejection","面包屑","sendBeacon","错误聚合"],src:"问答类型面试题.md / 针对简历问答.md"},{id:"sc-007",type:"essay",diff:"medium",sub:"移动端",q:"移动端适配有哪些方案？有哪些常见坑点？",ans:`**面试回答：**

**方案对比**：
1. **rem 方案**：JS 或 CSS 动态设置根字号（如屏宽/10），postcss-pxtorem 编译时把 px 转 rem，实现等比缩放；
2. **vw 方案**：直接用 vw 单位（1vw = 视口宽 1%），无需 JS；
3. **媒体查询 + flex/grid**：断点式布局，适合内容型响应式页面；
4. **大屏看板**：固定设计稿尺寸 + transform: scale 整体缩放（注意弹层坐标系）。

**常见坑点**：
1. **1px 边框问题**：高 DPR 屏 1px 物理像素太粗——用 transform: scale(0.5) 伪元素或 border-image；
2. **点击 300ms 延迟**：历史上浏览器等待双击缩放，设置 viewport meta（width=device-width）后已基本消除，或用 fastclick（已过时）；
3. **软键盘遮挡/顶起页面**：iOS 输入框 focus 后 fixed 定位错乱，用交互后 blur 处理或监听键盘高度；
4. **iOS 安全区域**：底部横条遮挡，用 \`env(safe-area-inset-bottom)\`；
5. **禁止缩放与滚动穿透**：弹层滚动穿透用 body overflow: hidden 或 overscroll-behavior；
6. **图片模糊**：按 DPR 提供 @2x/@3x 图或用矢量 SVG；
7. **后台标签页节流**：定时器降频影响心跳/轮询类逻辑（我在 BroadcastChannel 方案里就遇到过）。`,ana:"viewport meta（禁止缩放 user-scalable=no 的取舍）、安全区域、1px 是三大经典坑。",keys:["postcss-pxtorem","1px 方案","safe-area-inset","DPR"],src:"问答类型面试题.md / 一些高频率考点.md"},{id:"sc-008",type:"essay",diff:"medium",sub:"页面截图",q:"前端如何实现页面截图功能？技术方案怎么选？",ans:`**面试回答：**（docs 问答类型面试题原题，按背景/方案对比/落地设计/避坑讲）

**背景与痛点**：需要把页面（如报表、工作流画布）保存为图片分享，后端截图服务成本高且样式还原难。

**方案对比**：
1. **html2canvas**：把 DOM 解析后用 Canvas 绘制，纯前端、无依赖服务；缺点是 CSS 支持不完整（部分 box-shadow/filter/伪元素问题）、跨域图片需要 CORS 配置，复杂页面保真度有限；
2. **dom-to-image / modern-screenshot**：把 DOM 序列化为 SVG foreignObject 再转图片，对 CSS 支持更好，但同样受跨域资源限制；
3. **浏览器原生**：\`getDisplayMedia\`（屏幕捕获，需要用户授权，适合录制/共享而非自动截图）；
4. **服务端渲染截图**（Puppeteer/Playwright）：还原度最高，但需要后端资源、无法拿到登录后的本地状态。

**落地设计（通用截图工具协议）**：封装统一的 capture 工具：传入目标容器 ref + 配置（scale、背景色、排除元素、字体处理），内部完成克隆节点 → 过滤隐藏元素 → 资源转 base64 → 渲染 canvas → 导出 blob/png，对外暴露 promise 化 API 和错误回调，业务方一行调用。

**避坑**：跨域图片必须服务端允许 CORS 且 useCORS: true；canvas 尺寸过大移动端会白屏（分块或限制 scale）；字体加载完成前截图会缺字（document.fonts.ready 之后再截）。`,ana:"方案对比的核心维度：还原度、依赖、成本。html2canvas 的 CSS 支持局限是必答点。",keys:["html2canvas","foreignObject","CORS","document.fonts.ready"],src:"问答类型面试题.md"},{id:"sc-009",type:"essay",diff:"easy",sub:"访问端识别",q:"前端如何识别访问端（PC/移动/小程序）？识别后如何选择渲染策略？",ans:`**面试回答：**

**识别方式**：
1. **User-Agent**：解析 UA 判断设备类型、浏览器内核（navigator.userAgent）；UA 可伪造、信息有限，但是最通用方案；
2. **特性检测**：判断 'ontouchstart'、pointer: coarse 媒体查询等能力差异；
3. **视口尺寸**：window.innerWidth / matchMedia 断点；
4. **服务端识别（SSR 场景）**：根据请求头 UA 在服务端决定渲染版本，避免首屏闪烁；
5. **容器环境检测**：微信/小程序 JSBridge 特征（window.wx 等）。

**框架中使用**：识别结果挂到全局（Provider/Provide inject），跨组件共享设备信息，配合响应式断点切换布局。

**渲染策略选择**：
- 同一套代码响应式适配（主流，维护成本低）；
- 移动端单独的移动版页面/路由（交互差异大时）；
- UA 分流到不同域名（m.example.com），注意 SEO 的 alternate 标注。

**注意**：识别结果可能变化（旋转、缩放窗口），不要只在 mounted 判断一次。`,ana:"UA 识别 + 特性检测组合，识别结果要可响应更新。",keys:["User-Agent","特性检测","SSR 识别"],src:"问答类型面试题.md"},{id:"sc-010",type:"essay",diff:"easy",sub:"交互模式",q:"上拉加载和下拉刷新的实现逻辑是什么？",ans:`**面试回答：**

**上拉加载（无限滚动）**：
1. 监听滚动：容器 scrollTop + 可视高度 接近 scrollHeight 时触发（设置提前量如 200px）；
2. 加载下一页数据（带 loading 状态防重复触发），追加到列表；
3. 没有更多数据时关闭加载并显示提示；
4. 优化：**IntersectionObserver 监听底部哨兵元素**进入视口再触发，比滚动事件计算性能更好；配合防抖节流；新数据用唯一 key 渲染。

**下拉刷新**：
1. 监听 touchstart/touchmove/touchend（或容器 scrollTop === 0 时的拖拽）；
2. 顶部下拉时展示刷新动画（跟随手指位移，带阻尼），超过阈值后松手触发刷新；
3. 刷新完成后回弹动画并重置列表（通常回到第一页）；
4. 移动端组件库一般内置（ vant 的 PullRefresh），原理一致。

**注意点**：加载中状态锁、数据去重（防重复插入）、列表大时配合虚拟滚动。`,ana:"上拉 = 滚动触底加载下一页；下拉 = 顶部拖拽刷新第一页。",keys:["scrollTop 触底","哨兵元素","touch 事件阈值"],src:"问答类型面试题.md"},{id:"sc-011",type:"essay",diff:"medium",sub:"降级与兜底",q:"静态资源加载失败的场景怎么做降级处理？",ans:`**面试回答：**（docs 问答原题）

**背景**：CDN 故障、域名被墙、版本发布瞬间等导致 JS/CSS 加载失败，页面白屏。

**降级方案**：
1. **多 CDN 备源重试**：script/link 的 onerror 回调里切换备用域名重新加载（动态创建 script 标签换 src）；
2. **本地兜底**：关键资源同域备份一份，CDN 失败后加载本地版本；
3. **上报与监控**：失败立即上报，触发告警；根据错误量自动切源；
4. **JS 加载失败的整页降级**：入口脚本 onerror 时展示静态兜底页/提示刷新；
5. **非关键资源失败**直接忽略或占位（埋点脚本、评论组件）；
6. **版本发布策略**：HTML 与静态资源发布顺序控制（先资源后 HTML）、保留上一个版本的资源文件，避免老 HTML 引用已删除资源。

**接口降级**配合：非核心接口失败不阻塞主流程，用缓存数据/默认值占位。`,ana:"“先资源后 HTML 发布 + 保留旧版本资源”是工程实践加分点。",keys:["onerror 换源","本地兜底","发布顺序"],src:"问答类型面试题.md"},{id:"sc-012",type:"essay",diff:"medium",sub:"大数处理",q:"后端返回的 ID 超过 Number 安全整数范围（大数处理）怎么解决？",ans:`**面试回答：**

**问题背景**：JavaScript 的 Number 是 IEEE 754 双精度，安全整数范围是 **Number.MAX_SAFE_INTEGER（2^53 - 1）**。后端（Java Long、数据库 bigint）生成的雪花 ID 超过这个范围，JSON 反序列化后**末尾精度丢失**（如 9007199254740993 变 9007199254740992），导致查询、比对错乱。

**解决方案**：
1. **后端序列化时把大数转字符串**（Long → String，Jackson 注解或全局配置）——最推荐，从源头解决；
2. 前端**用正则重写 JSON.parse**：解析前把长数字段加引号转字符串（如 json-bigint 库）；
3. 用 **BigInt** 类型接收（JSON.stringify 原生不支持 BigInt，需自定义序列化）；
4. axios 拦截器 transformResponse 配合 json-bigint 解析。

**注意**：BigInt 不能与 Number 直接混合运算、不能 JSON.stringify；比较时统一类型。大数计算场景（金额）用 decimal 类库。`,ana:"根因是 JSON.parse 的 Number 精度；治本是后端转字符串，治标是前端解析层拦截。",keys:["2^53-1","Long 转 String","json-bigint"],src:"问答类型面试题.md"},{id:"sc-013",type:"essay",diff:"easy",sub:"权限设计",q:"动态路由及鉴权怎么实现？菜单、路由、按钮、数据四层权限分别指什么？",ans:`**面试回答：**

**RBAC 四层权限**：
1. **菜单权限**：是否显示导航入口；
2. **路由权限**：是否允许进入页面（防 URL 直达）；
3. **按钮权限**：是否显示新增/编辑/删除等操作；
4. **数据权限**：接口返回哪些数据范围（如只看本部门）。

**前端动态路由流程**（Vue Router + Pinia 为例）：
1. 登录获取 Token 与用户权限列表；
2. 本地维护全量路由表，每条路由打 meta.permission 标记；
3. 用权限列表**递归过滤**路由表（getPrivateRouter(permissions)），生成该角色可见的路由树和菜单；
4. \`router.addRoute()\` 动态注册；
5. 处理**首次导航时序**（守卫中确保动态路由已注册后再放行，否则白屏/404）；
6. **退出登录时重置**动态路由和权限状态。

**关键原则**：前端权限只负责“体验和导航控制”，**真正的安全边界必须在后端**（接口鉴权、数据权限校验）——前端隐藏按钮挡不住直接调接口。

**实践问题**（我的项目）：用户有菜单权限但无数据权限时调接口 403，我们调整校验链路让“有菜单无数据权限”返回空结果而非异常，保证三层权限行为一致。`,ana:"四层权限模型 + addRoute 时序 + 后端兜底三句话是标准答案。",keys:["meta.permission","router.addRoute","后端兜底"],src:"问答类型面试题.md / 知识点快速复习指南.md / 基于简历的问题.md"},{id:"sc-014",type:"essay",diff:"medium",sub:"鉴权与 Token",q:"JWT 的概念与组成是什么？双 Token 机制如何设计？",ans:`**面试回答：**

**JWT 概念**：用于前后端分离的身份认证。用户登录后，后端校验账号密码，用服务端密钥签发 JWT（包含用户 ID、过期时间等），前端存起来，之后每次请求在 Authorization 头携带。**优势**：服务端无需像 Session 一样保存登录状态，Token 自带身份信息，靠签名防篡改。

**JWT 组成（三段式）**：
1. **Header**：类型与签名算法（JWT、HS256）——“说明怎么签”；
2. **Payload**：用户信息（用户 ID、过期时间 exp）——“存信息”；
3. **Signature**：用密钥对 Header+Payload 签名——“保证未被篡改”。
三部分用 . 连接，Base64Url 编码（**注意 Payload 只是编码不是加密**，不能放敏感明文）。

**过期校验**：exp 写在 Token 里，后端解析时比较当前时间，过期返回 **401**，前端引导重新登录。

**双 Token 机制**：
- **Access Token**：访问业务接口，有效期**短**（10 分钟~1 小时），泄露风险低；
- **Refresh Token**：专门用来换取新 Access Token，有效期**长**（几天~几十天），后端通常存 Redis/数据库以便注销和强制下线；
- 流程：Access 过期 → 拦截器捕获 401 → 用 Refresh Token 调刷新接口 → 换新 Access 并**重放原请求** → Refresh 也过期才跳登录页。`,ana:"拦截器里的“401 → 静默刷新 → 重放请求”是前端实现的加分细节。",keys:["Header/Payload/Signature","exp 字段","静默刷新重放"],src:"一些高频率考点.md / 收集的面试知识点.md"},{id:"sc-015",type:"essay",diff:"medium",sub:"联调与排查",q:"前后端联调最常见的问题是什么？你怎么排查线上问题？",ans:`**面试回答：**

**联调常见问题**：
1. **字段不一致**（命名、大小写）与**数据结构变化**（分页结构、数组层级）；
2. **类型错误**：数字变字符串、大数精度丢失；
3. **空值问题**：后端返回 \`{ list: null }\`，前端直接 list.map 页面崩溃。

**我的规范**：
- TS 类型约束接口返回结构；
- 默认值处理（list ?? []）、接口数据校验；
- 把 Mock 与真实接口的差异**收敛在接口封装层**，不在页面散落兼容逻辑；
- 重点回归查询、重置、分页、刷新流程（切换真实接口后最容易出问题的地方）。

**线上问题排查步骤**：
1. **复现问题**（确认环境：设备/浏览器/账号/版本）；
2. **看控制台**：JS 报错、资源加载失败；
3. **看 Network**：接口状态码、响应内容、耗时；
4. **定位接口/状态**：接口问题转后端（带请求 ID），数据问题查渲染逻辑；
5. 复杂问题结合 **Chrome Performance、React/Vue DevTools、Network Timing、日志埋点**分析；
6. 修复后补充监控告警，防止同类问题无感知。`,ana:"排查万能链：复现 → 控制台 → Network → 定位接口/状态 → 渲染逻辑（docs 原文）。",keys:["字段不一致","list ?? []","复现 → 控制台 → Network"],src:"针对简历问答.md / 项目逻辑.md"},{id:"sc-016",type:"essay",diff:"medium",sub:"部署",q:"Docker 和 Nginx 在前端部署中实际怎么用？完整流程是什么？",ans:`**面试回答：**

**Nginx 的作用**：
1. **静态资源托管**：托管构建产物，开启 gzip 压缩、缓存头；
2. **history 路由回退**：\`location / { try_files $uri /index.html; }\`，否则刷新 404；
3. **反向代理**：/api 转发到后端服务，统一入口、解决跨域；
4. 负载均衡、HTTPS 证书配置。

**Docker 的作用**：把前端产物 + Nginx 配置打进镜像，保证环境一致性，任何机器 docker run 即可运行，不需要单独配 Node 环境。

**完整部署流程**（以涉诈数据平台 Demo 为例）：
1. **本地构建**：npm run build 产出 dist 静态资源；
2. **编写 Dockerfile**：基于 nginx 镜像，COPY dist 到 nginx 默认目录，COPY nginx.conf；\`\`\`dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
\`\`\`；
3. **构建镜像**：docker build -t fe-app .；
4. **启动容器**：docker run -d -p 8080:80 fe-app，映射端口；
5. **内网验证**：访问地址检查页面、静态资源路径、接口代理是否正常。

**经验**：静态资源 404 多为路径 base 配置问题；history 路由刷新 404 记得 try_files。`,ana:"Dockerfile 三行核心 + try_files 是最低配置记忆点。",keys:["try_files","nginx:alpine","环境一致性"],src:"针对简历问答.md / 基于简历的问题.md"},{id:"sc-017",type:"essay",diff:"easy",sub:"技术选型",q:"技术方案选型的评分矩阵中，如何确定评估维度的权重分配？",ans:`**面试回答：**（docs 问答原题）

**常见评估维度**：功能匹配度、性能、可维护性、团队熟悉度、社区生态与活跃度、学习成本、迁移/退出成本、安全合规。

**权重确定方法**：
1. **从业务目标倒推**：先明确这次选型要解决的核心问题——如果核心诉求是“快速交付”，可维护性与团队熟悉度权重调高；如果是“长期平台演进”，生态与可扩展性权重调高；
2. **与团队共识**：权重不是个人拍板，组织评审让相关方（开发、运维、产品）对维度的重要性打分，收敛分歧；
3. **区分一票否决项**：安全合规、许可证等硬性约束不进加权，直接作为门槛条件；
4. **敏感性验证**：对权重做小幅调整看结论是否翻转，结论不稳健说明需要补充数据或保留多方案。

**落地**：每个维度按 1~5 打分 × 权重求和得出综合分，同时记录“不可量化因素”（如团队意愿），最终给出推荐 + 备选方案 + 回退路径。`,ana:"答题亮点：一票否决项不参与加权 + 权重敏感性检验，体现方法论而不是背概念。",keys:["业务倒推权重","一票否决项","敏感性验证"],src:"问答类型面试题.md"},{id:"sc-018",type:"judge",diff:"medium",sub:"多标签页通信",q:"localStorage 的 storage 事件会在所有标签页（包括执行写入的当前标签页）中触发。",ans:!1,ana:"storage 事件只在**其他同源标签页**触发，**当前执行写入的页面不会收到**——这也是我在项目中选择 BroadcastChannel 做标签页实时通信的原因之一（BroadcastChannel 的 postMessage 不广播给发送者自身，但同频道其他页面实时收到，且不依赖序列化轮询）。",keys:["storage 不通知自己","BroadcastChannel 实时"],src:"针对简历问答.md"},{id:"sc-019",type:"multiple",diff:"medium",sub:"大文件上传",q:"大文件分片上传方案中，下列哪些是**保证稳定性与一致性的关键要素**？（多选）",opts:["每个分片携带 fileId / chunkIndex / chunkHash 等标识","并发上传并限制最大并发数（3~6 起步）","断点续传：上传前询问服务端已成功的分片，只补传缺失部分","任何一个分片失败就放弃整个文件并全部重传"],ans:["A","B","C"],ana:"分片上传要素：分片标识（fileId/fileHash/chunkIndex/chunkHash）用于服务端校验与合并排序；并发限制 + 失败重试 + 暂停/取消（AbortController）；断点续传靠稳定文件标识询问已传分片；合并时按 chunkIndex 排序并校验完整性。**全部重传是反面做法**——应保留成功分片、只重试失败分片；进度按已传字节数/总字节数计算，MD5 计算放 Web Worker。",keys:["分片标识","断点续传","只重试失败分片"],src:"问答类型面试题.md / 知识点快速复习指南.md"}],wa=[{id:"pj-001",type:"essay",diff:"easy",sub:"自我介绍",q:"请做一个 30 秒的自我介绍（前端方向）。",ans:`**面试回答模板**（docs 知识点快速复习指南版）：

“我是计算机相关专业应届生，主要方向是前端开发，也有 AI 全栈项目经验。技术栈以 **Vue 3、React、TypeScript** 为主，熟悉 Pinia、Vue Router、Element Plus、Ant Design 和 Axios。实习期间参与过 **AI Agent 平台、流量调度平台和 SQL 分析系统**开发，重点负责**文件分片上传、权限系统、复杂表格、SSE 流式交互和前后端联调**。我比较擅长把复杂业务拆成可复用组件和清晰的数据流，并通过监控和性能工具验证结果。”

**个人版本要点**（针对简历问答版）：
1. 基本信息 + 求职方向（重庆邮电大学网络工程，方向前端）；
2. 技术栈：React、TypeScript 为主，Vue3 项目经验；
3. 实习亮点挑两个：**BroadcastChannel 解决 HTTP/1.1 SSE 连接数限制**（复杂业务 + 问题解决能力）、**工程化与线上质量**（Docker/Nginx 部署、Error Boundary 封装）；
4. 收尾表达意愿：希望深入 React 生态和工程化方向。

**表达技巧**：亮点用“发现什么问题 → 怎么解决 → 效果”一句话带过，给面试官留追问空间。`,ana:"自我介绍 = 基本盘 + 两个差异化亮点 + 意愿收尾，控制在 40 秒内。",keys:["技术栈概括","两个亮点","留追问钩子"],src:"知识点快速复习指南.md / 针对简历问答.md"},{id:"pj-002",type:"essay",diff:"medium",sub:"农担智能体平台",q:"你在农担智能体平台项目里负责什么？前端架构是怎么分层的？",ans:`**面试回答：**

**负责内容**（主答）：我负责企业 AI 平台前端，核心三块：
- **构建端**：应用与流程配置（BuildPage 相关：apps/flow/assistant/tools/skills）；
- **知识端**：知识库与检索配置（KnowledgePage：文件库/QA 库、上传、预览、召回测试）；
- **治理端**：用户角色权限和系统管理（SystemPage）。

重点是把手**路由权限、请求治理、模块分层**做成统一规范。此外我主导了概览模块开发，新增了召回测试、个人信息编辑、标签模块、工作流敏感词节点，并对核心模块 UI 重绘、参考豆包调优对话页面。

**架构分层**（面试高分点）：
\`\`\`
路由层 routes.tsx    → 页面组织 + 权限过滤
页面层 pages/*       → 业务交互与状态编排
API 层 controllers/API/* → 按模块聚合接口
请求层 request.ts    → 统一拦截器（token/业务码/401/blob 下载/错误提示）
\`\`\`
一句话：**页面负责交互编排，API 层负责业务调用，request 层负责统一治理**。

**为什么这样分**：减少重复代码、降低页面复杂度；后端接口规范调整时只改 API 层或 request 层，不需要大面积改页面。`,ana:"“30 秒前端自我贡献”话术：把前端从功能开发升级成系统交付——分层架构、权限路由、统一请求治理。",keys:["构建端/知识端/治理端","四层架构","统一请求治理"],src:"农担重点逻辑.md"},{id:"pj-003",type:"essay",diff:"medium",sub:"农担智能体平台",q:"农担项目的实时通信是怎么做的？WebSocket 的消息分发和流式输出拼接怎么处理？",ans:`**面试回答：**

**选型**：工作流调试/运行链路的主通道是 **WebSocket**（不是轮询）。场景是“工作流逐节点执行 + LLM 流式输出 + 用户中断输入”，前端要持续收到 node_run、stream_msg、input、error、processing close 等事件，WS 适合双向、持续、低延迟事件流。

**连接**：ChatInput 里按 http/https 动态切成 ws/wss 连接 workflow/chat 通道；建连后先发 init_data 或 check_status（区分新会话），再发 input 消息传递用户输入与节点上下文。

**消息分发（技术亮点）**：把 WS 事件做成“**协议驱动 UI 状态机**”，按 category/type 分发：
- \`error\`：统一转 toast + 锁定输入，写通知中心；
- \`node_run\`：更新节点运行状态（loading/success/error），缓存节点入参给单节点调试；
- \`input\`：动态决定文本输入还是表单输入，控制 UI 解锁；
- \`stream_msg\`：逐 token 追加，end 时触发完成事件；
- \`processing close\`：一轮会话结束，插入会话分隔符并锁定输入。

**流式拼接**：messageStore 用 \`unique_id + output_key\` 定位同一条消息做增量追加，避免流式串台和重复渲染；找不到消息则创建新消息。`,ana:"亮点话术：“协议驱动 UI 状态机” + “unique_id + output_key 聚合增量 token，end 收口”。",keys:["ws/wss","category/type 分发","unique_id + output_key"],src:"农担重点逻辑.md"},{id:"pj-004",type:"essay",diff:"medium",sub:"农担智能体平台",q:"配置驱动的工作流渲染是怎么设计的？Schema 数据结构长什么样？",ans:`**面试回答：**（docs 项目逻辑.md 原题，重点素材）

**总体思路**：工作流编辑器不是把每种节点写死，而是**Schema 驱动**——后端/模板提供“节点描述 + 参数 schema”，前端提供“渲染引擎 + 组件映射表”。

**数据结构三层**：
1. **工作流层**：\`{ id, name, description, nodes, edges, viewport }\`，nodes/edges/viewport 对应 ReactFlow 画布数据；
2. **节点层**：\`{ id, type, name, description, group_params, tab }\`——type 区分开始/LLM/知识库检索/条件/输出/工具节点；
3. **参数层**：group_params 是参数分组（模型配置、输入参数、输出变量），每组下 params：\`{ key, label, type, value, placeholder, required, options, hidden, tab }\`。

**渲染链路**：接口拿配置 → 转 ReactFlow 的 nodes/edges → \`<ReactFlow nodeTypes={nodeTypes} />\` 画布渲染 → 自定义 FlowNode 组件读取 data 渲染标题/连接点 → 遍历 group_params → Parameter 组件**根据 param.type 映射表单控件**（input/textarea/var_textarea/postwise_model/knowledge_select_multi/switch/slide 等）：

\`\`\`tsx
node.group_params.map(group =>
  group.params.map(param => renderComponentByType(param.type))
)
\`\`\`

**价值**：新增节点只需要后端加一份配置，参数类型已支持就能直接渲染；新参数类型只需在映射表补一个控件。**“节点是什么、有哪些参数”交给配置，“怎么画、怎么渲染”沉淀成前端通用能力**，前端代码不随业务节点数量线性膨胀。`,ana:"ReactFlow 定位一句话：画布引擎管“怎么画怎么交互”，配置驱动管“每个节点里展示什么”。",keys:["nodes/edges/viewport","group_params","type → 控件映射"],src:"项目逻辑.md / 针对简历问答.md / 基于简历的问题.md"},{id:"pj-005",type:"essay",diff:"hard",sub:"农担智能体平台",q:"工作流需要支持上百个节点时，nodes/edges 的状态管理怎么设计？Schema 与画布数据如何转换？",ans:`**面试回答：**（docs 基于简历的问题.md 深挖题）

**核心思路**：保持“**单一扁平数据源**”（所有节点在同一个 nodes 数组、连线统一存 edges），在大规模场景下做**分层治理 + 精细化更新**。

**1. 逻辑分层（同一节点对象内区分字段）**：
- 持久化配置：节点类型、模型参数、提示词；
- 运行时状态：执行结果、加载状态；
- 画布 UI 状态：坐标、选中态。

**2. 精准更新**：维护基于 ID 的**索引映射**，修改时 O(1) 定位节点、只更新那条记录再同步回数组，不做全量遍历重建。

**3. 按需渲染**：每个节点组件**只订阅自己需要的数据**（Zustand 选择器/jotai 原子），节点 A 配置变化不会引起全画布重渲染；Schema→nodes/edges 的转换用 useMemo 缓存；低频重组件按需加载。

**4. 前后端解耦**：加**转换层**——加载时后端结构化数据 → 前端扁平数组，保存时提取持久化字段转回后端格式，**不直接把 ReactFlow 的 nodes 提交给后端**，两边数据模型各自演进。

**复杂表单的取舍**：**通用部分配置化（必填/类型/简单依赖交给 Schema），特殊部分组件化**（供应商-模型联动、异步校验做成自定义节点组件），避免通用渲染器膨胀。`,ana:"四个关键词：数据统一、精准定位、按需渲染、转换层解耦。这是该项目最高频的深挖题。",keys:["单一扁平数据源","ID 索引精准更新","转换层解耦"],src:"基于简历的问题.md"},{id:"pj-006",type:"essay",diff:"medium",sub:"农担智能体平台",q:"工作流从配置到发布的前端请求封装了哪些生命周期？发布前如何校验？",ans:`**面试回答：**

**完整生命周期 API**（前端封装）：
1. **创建**：createWorkflowApi 创建工作流；
2. **保存**：saveWorkflow（PUT /api/v1/workflow/versions/:versionId）保存当前版本；
3. **切版本**：getVersionDetails 拉取指定版本详情回显画布；
4. **上下线**：onlineWorkflowApi 发布/下线；
5. **单节点调试**：runWorkflowNodeApi 单独运行某个节点验证。

**发布前校验（加分点）**：Header 里“先校验节点 → 再保存 → 再上线”——validateNodes 校验必填参数、连线完整性，错误以 notification 列表提示并定位节点；**已上线版本不可直接修改**，走新版本发布（版本分叉治理）。

**一致性保障（工程点）**：flow 数据有**唯一修改入口**——ReactFlow 的 onNodesChange/onEdgesChange 监听里统一回写，其他位置禁止直接修改 flow 引用，避免多处改同一状态产生脏数据。

**左侧节点面板也是配置驱动**：读取节点模板生成可拖拽节点，拖入画布时生成唯一 id、初始化变量引用，用户编辑/拖动/连线都更新本地 nodes/edges，保存时提交。`,ana:"“先校验再保存再上线 + 版本分叉 + 单一数据入口”三个工程点是高分细节。",keys:["版本治理","validateNodes","单一回写入口"],src:"农担重点逻辑.md"},{id:"pj-007",type:"essay",diff:"medium",sub:"SSE 与稳定性",q:"SSE 连接优化你是怎么做的？SSE 重复展示问题怎么解决？",ans:`**面试回答：**

**SSE 连接优化**（BroadcastChannel 复用）：
- 问题：HTTP/1.1 同域只有 6 个并发连接，监控平台多标签页打开后 SSE 长连接占满，新页面图表请求阻塞；
- 方案：主标签页唯一持有 SSE，通过 BroadcastChannel 广播数据（消息带 serverId/pageId 过滤），主节点关闭后重新选举；只修改 SSE 总配置文件，不用改所有建连处；
- 效果：N 个连接降为 1 个，减少资源消耗，提升稳定性。

**SSE 重复展示问题**（基于简历的问题.md 原题）：
- 原因：页面切换时**旧连接未正确关闭**，新旧连接同时接收消息，前端重复拼接；
- 解决：
  1. **useRef 管理 SSE 连接生命周期**；
  2. 建立连接前**判断是否已有连接**，有则先关闭；
  3. 组件销毁（useEffect cleanup）时主动关闭连接；
  4. 服务端消息加**唯一标识去重**；
- 效果：保证一次请求只展示一次流式结果。

**断线与中断补充**：保存会话/消息 ID，关闭时清理 reader 和 controller（AbortController 停止生成），重连携带游标避免重复渲染。`,ana:"两个问题一个根源：连接生命周期管理。useRef + 建连前判断 + 卸载关闭 + 去重四步。",keys:["useRef 生命周期","AbortController","唯一标识去重"],src:"针对简历问答.md / 基于简历的问题.md / 知识点快速复习指南.md"},{id:"pj-008",type:"essay",diff:"medium",sub:"Agent 平台认知",q:"整体讲一下 AI Agent 平台的开发流程（配置、编排、执行、返回）。",ans:`**面试回答：**（docs 基于简历的问题.md 原题）

**1. Agent 配置**：用户配置模型、System Prompt、模型参数，绑定知识库和工具（知识库检索、数据库查询、业务 API）。

**2. 工作流编排**：复杂任务拆成多个节点——开始、LLM、知识库检索、工具调用、条件判断、结束；前端用 ReactFlow 画布拖拽配置参数并连线，保存为结构化 Schema。

**3. 后端执行**：用户提问后，后端按 Agent 配置加载工作流，按 **edges 定义的拓扑关系（DAG）** 依次执行节点：LLM 节点调用大模型，判断需要工具就执行工具并把结果放回上下文继续推理。

**4. RAG 流程**（涉及知识库时）：问题 **Embedding → 向量数据库相似度检索 → 重排模型筛选** → 检索内容作为上下文交给大模型生成答案。

**5. 结果返回与记录**：大模型**流式输出**，后端通过 SSE 实时推送；平台记录每个节点执行状态、对话记录、Token 消耗和异常信息。

**我的角色**：负责前端编排与配置化——节点表单抽象成统一 Schema 动态渲染、ReactFlow 管理节点连线。一句话总结：**Agent 平台 = LLM 推理 + 工具调用 + 知识库 + 工作流编排，前端负责配置和可视化，后端负责执行和状态管理**。`,ana:"前端定位：编排与配置化；后端定位：DAG 执行引擎。RAG 链路（Embedding→检索→重排）要能顺出来。",keys:["DAG 执行","RAG 链路","流式输出"],src:"基于简历的问题.md"},{id:"pj-009",type:"essay",diff:"medium",sub:"RBAC 权限",q:"农担多角色权限前端是怎么做的？你如何统一处理接口异常和登录态？",ans:`**面试回答：**

**多角色权限**：
1. 路由配置里加 \`permission\` 元信息；
2. 登录后拿用户权限，\`getPrivateRouter(permissions)\` **递归过滤**路由表，只渲染当前角色可访问路由（菜单同步生成）；
3. 比起页面内到处写 if 判断更可控、可扩展；
4. 边界强调：**前端权限管展示和导航，真正的安全边界在后端鉴权**，两边协同。

**统一请求治理**（axios 拦截器 request.ts）：
1. **Token 注入**：请求拦截器统一加认证头；
2. **业务码解包**：响应拦截器统一判断 HTTP 状态 + 业务状态码，成功直接返回业务数据；
3. **401 处理**：登录态失效统一跳登录/刷新 token；
4. **Blob 下载兼容**：识别 responseType/content-type 是 blob 的响应**直接透传**，不走业务码解包（否则解析 undefined）；
5. **通用错误提示**：toast 统一展示，特殊业务码在拦截器分流。

**价值**：页面拿到的是“可用数据”，不再每页写 try/catch 和提示逻辑；接口异常处理一致。`,ana:"Blob 透传判断（responseType === blob / octet-stream / pdf）是 docs 农担项目踩坑的原题细节。",keys:["permission 元信息","递归过滤路由","401 与 blob 分流"],src:"农担重点逻辑.md / 农担项目所遇问题及总结.md"},{id:"pj-010",type:"essay",diff:"easy",sub:"稳定性",q:"你怎么保证后台系统稳定性？有做兜底吗？",ans:`**面试回答：**

**做了两层兜底**：

**1. 路由/页面级 ErrorBoundary**：
- 背景：平台模块多，局部渲染异常直接白屏（遇到过翻译插件改 DOM 导致的线上白屏，且本地难复现）；
- 实现：class 组件 getDerivedStateFromError 切换兜底 UI + componentDidCatch 记录错误；包裹在路由文件/关键业务模块外层；
- 效果：局部异常不拖垮全局，用户可重载或继续操作其他模块。

**2. 网络层统一兜底**：
- axios 拦截器统一捕获接口异常，错误 toast + 状态码分流（401 登录、403 无权限、500 提示），未捕获异常不会直接炸页面；
- Blob 响应透传、下载失败校验 content-type 后抛出统一错误。

**理念**：我更关注“**降级可用**”而不是“绝不报错”——企业后台场景里，局部可感知、可恢复比全站完美更重要。再往上还可以做错误监控上报（Sentry 类）形成闭环。`,ana:"两层兜底 + “降级可用”理念 + 线上案例，是 docs 农担重点逻辑的标准答法。",keys:["ErrorBoundary","拦截器兜底","降级可用"],src:"农担重点逻辑.md / 针对简历问答.md / 项目逻辑.md"},{id:"pj-011",type:"essay",diff:"medium",sub:"组件封装",q:"农担项目里你封装了哪些组件？说说 ChatInput 和消息组件的拆分思路。",ans:`**面试回答：**（docs 项目逻辑.md 原题）

**AI 对话界面的组件拆分**（单一职责、组合使用）：
1. **ChatInput.tsx** 输入框组件：多行文本自动撑高、**Enter 发送 / Shift+Enter 换行**区分、上传图片/文件入口；文件逻辑单独抽到 **FileBs.tsx**，避免输入框臃肿；
2. **消息展示拆分**：MessageUser.tsx / MessageSystem.tsx 分别渲染用户和系统消息，公共气泡结构下沉到 **MessageBs.tsx**；**MessageButtons.tsx** 渲染快捷回复按钮组（多场景复用）；**MessagePanne.tsx** 做消息面板容器（滚动到底部、加载历史消息）；
3. **Separator.tsx + SeparatorFactory.tsx**：工厂模式生成“昨天/今天”等时间分隔线，按类型扩展样式和行为；
4. **RunLog.tsx**：展示 AI 执行步骤（“思考中”“正在检索”）；**GuideQuestions.tsx**：引导问题列表，点击直接发送。

**其他通用组件**：
- **多选下拉栏**：搜索过滤、批量删除、全选、最大选择数限制，对外只暴露 options + 选中值；
- **主页卡片组件**：图标（组件或图片）、标题、描述、底部操作均可通过 props/插槽定制。

**封装习惯**：组件保持**单一职责、组合复用**；复杂模块拆细，后期维护和替换实现更轻松。`,ana:"名字不用背全，讲清“输入框/消息展示/分隔线/执行日志”四组拆分和职责即可。",keys:["单一职责","Enter/Shift+Enter","工厂模式分隔线"],src:"项目逻辑.md"},{id:"pj-012",type:"essay",diff:"medium",sub:"组件封装",q:"SVG 图标是怎么用 forwardRef 封装的？为什么要这样做？",ans:`**面试回答：**（docs 农担项目所遇问题及总结.md 原题）

**做法**：不是简单存 SVG 文件，而是用 Vite 的 \`?react\` 后缀把 SVG 转成 React 组件，再用 **forwardRef 转发 ref**：

\`\`\`tsx
import Assistant from './assistant.svg?react'

export const AssistantIcon = forwardRef<
  SVGSVGElement & { className: any },        // ref 指向的元素类型
  React.PropsWithChildren<{ className?: string }>  // props 类型
>((props, ref) => {
  return <Assistant ref={ref} {...props} />  // 透明转发层
})
\`\`\`

**forwardRef 泛型**：\`forwardRef<T, P>\`——T 是 **ref 指向的元素类型**（SVGSVGElement / HTMLDivElement），P 是组件 props 类型。

**为什么这样封装**：
1. 外部可以通过 \`iconRef.current\` **直接操作 SVG DOM**：getBBox 取边界框、添加动画；
2. className 灵活控制样式（\`w-6 h-6 text-red-500 hover:text-blue-500\`）；
3. 卡片头部 CardHeader 等也用同样模式封装，接收所有标准 div 属性，设置 displayName 便于调试。

**ref 的理解**：ref 是“直接访问标记”，修改 \`ref.current\` **不触发重渲染**，而修改 state 会触发重新渲染——适合命令式操作场景。`,ana:"?react 后缀（vite-svg-loader）+ forwardRef 双泛型是本题两个技术记忆点。",keys:["?react","forwardRef<T, P>","ref 不触发重渲染"],src:"农担项目所遇问题及总结.md"},{id:"pj-013",type:"essay",diff:"medium",sub:"问题排查",q:"说说你处理过的线上/环境问题：项目启动无法访问页面、下载请求返回 undefined 是怎么排查的？",ans:"**面试回答：**（docs 农担项目所遇问题及总结.md 两个真实案例）\n\n**案例一：项目启动但无法访问页面**\n1. 先排查**路由文件**是否正确；\n2. curl 验证：`curl http://localhost:4001/workspace` 返回 `Empty reply from server`——服务器接受连接但没返回数据；\n3. 查**端口占用**：`netstat -ano | findstr :4001` 发现两个进程同时 LISTENING（PID 19416、6112）；\n4. `Get-Process -Id 19416,6112` 确认进程身份，`taskkill /PID 6112 /F` 停掉冲突进程后恢复正常。\n\n**案例二：下载请求得到 undefined**\n1. 现象：文件下载接口拿到 undefined；\n2. 定位：是 **Blob 响应被 axios 拦截器解包**——拦截器统一返回 response.data，但 blob 类型的响应需要完整的 response（headers 里才有文件信息）；\n3. 修复：响应拦截器增加 blob 判断（`responseType === 'blob'` 或 content-type 含 octet-stream/pdf 等）**直接返回 response**；下载请求显式声明 `responseType: 'blob'`；\n4. 下载函数里校验：content-type 是 application/json 说明是错误响应（FileReader 读取 blob 解析错误信息），status 200 且 blob.size > 0 才用 URL.createObjectURL + a 标签触发下载，最后 revokeObjectURL 释放。\n\n**方法论**：环境问题先看端口/进程/路由；数据问题先看**拦截器和响应结构**，用最小请求验证。",ana:"两个案例都按“现象 → 定位 → 修复 → 验证”讲，体现排查方法论。",keys:["netstat 端口占用","blob 透传","createObjectURL"],src:"农担项目所遇问题及总结.md"},{id:"pj-014",type:"essay",diff:"medium",sub:"Mock 清理",q:"慢 SQL 分析系统清理遗留 MockJS 逻辑：为什么会有遗留问题？你做了什么保证接口切换稳定？",ans:`**面试回答：**（docs 项目逻辑.md 原题）

**遗留原因**：项目早期前后端并行开发，后端接口未稳定，前端用 MockJS 模拟数据先把慢 SQL 列表、多条件筛选、详情页搭起来。切真实接口时问题暴露：**Mock 数据与真实接口不一致**——字段名不同、分页结构不同、Mock 恒有值但真实接口可能为空、数组层级/总数证件字段不一致。直接删掉 Mock 会导致渲染异常、筛选分页参数传错。

**清理动作**：
1. **梳理 Mock 依赖**：全局搜索哪些页面/接口走 Mock，列出清单；
2. **对照 Swagger 校验字段**：逐接口核对字段名、类型、分页结构；
3. **差异收敛到接口封装层**：数据结构差异在 API 层做适配转换，不让页面组件到处写兼容逻辑；
4. **重点流程回归**：这个项目筛选条件多，重点验证**查询参数带全、重置后旧参数清除、分页切换不丢筛选条件、表格刷新**等链路；
5. 真实环境联调保证数据链路稳定。

**总结句**：重点不是“删掉 MockJS”，而是保证切换真实接口后**整个页面的数据链路、查询逻辑和异常场景稳定**。`,ana:"“差异收敛在接口层，不散落在页面”是核心方法论。",keys:["Swagger 字段核对","差异收敛接口层","筛选分页回归"],src:"项目逻辑.md"},{id:"pj-015",type:"essay",diff:"medium",sub:"接口签名",q:"人脸识别接口的加密签名是怎么实现的？SHA256、HMAC、Web Crypto API 各扮演什么角色？",ans:`**面试回答：**（docs 项目逻辑.md 原题）

**概念铺垫**：
- **SHA1/SHA256**：哈希算法，任意长度输入 → 固定长度摘要（SHA1 160 位、SHA256 256 位），不可逆；SHA1 已不安全，不推荐；
- **HMAC**：基于哈希的消息认证码 = **哈希算法 + 密钥**，只有持有密钥的一方才能算出结果，比纯哈希多了身份验证能力。

**签名流程**：
1. 拼接待签名字符串：\`accessKeyId + accessKeySecret + timestamp + 请求参数前 512 字符\`；
2. 用 **HMAC-SHA256**（按文档要求选 SHA256/SHA1）对拼接串签名，**密钥是 accessKeySecret**（不是凭证明文）；
3. 签名结果（二进制）转 **Base64** 得到 sign；
4. 每次请求携带 accessKeyId、timestamp、sign；后端用同样逻辑重算比对，一致才合法。

**作用**：验证请求合法性与完整性，**防篡改、防重放**（timestamp 参与签名，过期签名失效）。

**实现细节**：用浏览器原生 **Web Crypto API** 做 HMAC（原生支持 SHA 系列、性能好）；**MD5 不支持**，需要时换 crypto-js。插件侧打包成浏览器扩展放入 126 浏览器扩展程序加载测试。`,ana:"HMAC 与纯哈希的区别（是否带密钥）+ 512 字符截断 + Base64 转换，三个细节最容易被追问。",keys:["HMAC-SHA256","timestamp 防重放","Web Crypto API"],src:"项目逻辑.md / 基于简历的问题.md"},{id:"pj-016",type:"essay",diff:"easy",sub:"模型缓存",q:"本地缓存的模型配置和后端不一致（模型缓存问题）怎么解决？",ans:`**面试回答：**（docs 基于简历的问题.md 原题）

**问题本质**：用户选择模型后，前端把模型 id 和名称存到 **localStorage**；删除模型时只更新了后台配置，**没有同步清理本地存储**。再次进入工作台时，下拉列表已经没有该模型，但对话仍读取 localStorage 里的旧模型。

**解决方式**（降级校验）：
1. 工作台初始化加载模型配置时，先获取**后端最新模型列表**；
2. 判断 localStorage 保存的模型 id 是否仍存在于列表中；
3. 存在 → 继续使用；不存在 → **清除本地缓存**，默认选择列表第一个可用模型，并同步更新 localStorage；
4. 同时**弹窗提示**“该模型已被后台删除”，保证用户知情。

**原则总结**：本地缓存必须与后端配置做**有效性校验**，缓存数据要能“自愈”（失效回退默认值），不能假设缓存永远正确。`,ana:"缓存校验三步：拉最新数据 → 校验有效性 → 失效回退并提示。",keys:["localStorage 校验","失效回退","弹窗告知"],src:"基于简历的问题.md"},{id:"pj-017",type:"essay",diff:"medium",sub:"Axios 封装",q:"你是如何做 Axios 二次封装的？拦截器里处理哪些问题？",ans:`**面试回答：**（docs 基于简历的问题.md 原题）

**目标**：**统一请求入口、统一处理认证和异常**，减少业务代码重复逻辑。

**实例配置**：创建统一 Axios 实例，集中配置 baseURL、超时时间、公共请求头。

**请求拦截器**：
1. **Token 注入**：从本地状态取 token 放到请求头；
2. 公共参数处理（如语言、版本号）。

**响应拦截器**：
1. 统一判断 HTTP 状态 + **后端业务状态码**；
2. 成功：直接提取业务数据返回，调用方不用关心响应包裹结构；
3. **401**：统一处理登录态失效（清 token、跳登录或静默刷新）；
4. 其他错误：统一 toast 提示或转错误状态，特殊业务码在拦截器分流；
5. **Blob 响应直接透传**（下载场景需要完整 response）；
6. 网络超时、服务器异常等 Axios 错误统一兜底。

**效果**：业务组件只关心“传什么参数、数据怎么展示”；Token、异常、下载兼容都收在封装层。结合项目：慢 SQL 系统中用这套封装配合接口调试和数据校验，并清理了 MockJS 遗留逻辑。`,ana:"结构：实例配置 → 请求拦截（token）→ 响应拦截（业务码/401/blob/toast）→ 效果。",keys:["baseURL/超时","401 统一处理","业务码解包"],src:"基于简历的问题.md / 针对简历问答.md"},{id:"pj-018",type:"essay",diff:"medium",sub:"React 深挖",q:"React 已经有 Context 和 useReducer 了，为什么项目里还要使用 Redux？",ans:`**面试回答：**（docs 针对简历问答.md 原题，两面答法）

**当时为什么用 Redux**（慢 SQL 分析系统）：
1. 系统里有较多**跨页面共享且关联复杂的全局状态**：查询条件、分页信息、当前选中 SQL、分析结果缓存；
2. Context 的问题：value 变化会让**所有消费组件重渲染**，高频更新场景性能差；修改路径不清晰；
3. Redux 价值：**dispatch → reducer → 更新 state 的单向数据流**，状态变化可预测可追踪；**Redux DevTools 查看每次 action**，排查复杂后台问题非常有帮助。

**重新选型会怎么选**（体现成长）：
- **服务端数据**（SQL 列表、统计结果、详情）→ **React Query**：天然支持缓存、重试、失效更新、请求状态管理；
- **少量客户端全局状态**（筛选条件、选中项、弹窗）→ **Zustand**：轻量、样板代码少、按需订阅；
- **Context** → 只用于主题、国际化、用户信息这类**低频更新**状态。

**总结观点**：Redux 没有过时——大型、多人协作、状态关系复杂且强调规范性的项目仍有价值；但大多数中后台项目 **React Query + Zustand** 是更灵活高效的组合。`,ana:"先答“当时合理”，再答“现在怎么选”，体现技术判断力而不是背题。",keys:["单向数据流","DevTools 时间旅行","React Query + Zustand"],src:"针对简历问答.md"},{id:"pj-019",type:"essay",diff:"medium",sub:"性能优化实践",q:"你在项目中做过哪些性能优化？（结合简历数据回答）",ans:`**面试回答：**三类实践（docs 针对简历问答原题 + 复习指南数据）：

**1. React 渲染优化**：memo/useMemo/useCallback 减少重复渲染。

**2. SSE 连接优化（效果最明显）**：BroadcastChannel 复用连接，多标签页 N 个 SSE 降为 1 个，解决 HTTP/1.1 六连接限制导致的请求阻塞。

**3. 大量组件重绘优化**（智能体平台知识库卡片）：
- **拆分组件**：SearchBar 内部状态变化只重渲染 SearchBar 本身，ProductList/Sidebar 不受影响；
- **降低父组件 state 粒度**：一个 user 对象包含不相关字段，改一个字段整对象引用变化导致依赖其他字段的组件重绘且 **memo 失效**——拆成多个独立 state，关联状态用 useReducer；
- **避免匿名函数重复创建**：每次渲染新函数引用会破坏 memo 浅比较——useCallback 缓存。

**4. 首屏/LCP 优化**：拆包、路由懒加载、依赖拆分、渲染优化 + 真实监控，**LCP 从约 2.4s 降到约 1.5s**——回答时必须补充：线上真实用户监控口径（P75）、优化前后版本对比、采样范围，避免只报单次本地 Lighthouse 结果。`,ana:"报数据必须带口径（P75/版本对比/采样范围）是 docs 反复强调的加分要求。",keys:["memo 失效原因","BroadcastChannel","LCP 2.4s→1.5s P75"],src:"针对简历问答.md / 知识点快速复习指南.md"},{id:"pj-020",type:"essay",diff:"medium",sub:"AI 与学习",q:"你怎么看 AI 对前端的影响？如何高效学习新知识并落地到项目？",ans:`**面试回答：**

**AI 对前端的影响**（docs 针对简历问答原题）：
- AI **不会替代前端，但会改变开发方式**——Cursor、Copilot、AI 代码生成已明显提升效率；
- 真正难的部分仍在前端手里：**业务理解、架构设计、性能优化、复杂交互、工程化能力**；
- 我的实践：用 Cursor/Codex 辅助快速出 Demo（两天完成涉诈网站系统前端 UI + mock 数据 + Docker 部署）；智能体平台开发中我从“编码者”转变为“**代码审查者与架构者**”——用 AI 提效，自己负责业务逻辑宏观架构、代码审查和维护性把控；
- AI 的坑也要说：**改得不完全**（一处逻辑改了另一处漏改导致展示失败）、类名细节出错难自查——所以人工审查和回归验证不可少。

**学习方法**（docs 收集的面试知识点）：
1. **先搭骨架再补细节**：看官方文档核心概念 → 跑通最小 Demo → 在实际项目小范围试点 → 沉淀规范和文档分享给团队；
2. 用数据说服团队：试点对比（效率、包体积、性能指标）再推广；
3. 线上问题驱动学习：从 Bug 定位出发深挖底层原理。`,ana:"AI 题的答法：承认提效 + 指出不可替代部分 + 自己的实际用法 + AI 的坑。",keys:["审查者与架构者","vibe coding 坑","小范围试点"],src:"针对简历问答.md / 农担项目所遇问题及总结.md / 收集的面试知识点.md"},{id:"pj-021",type:"essay",diff:"medium",sub:"FastAPI 与后端协作",q:"FastAPI 项目一般怎么组织？作为前端你如何定位数据链路问题？",ans:`**面试回答：**（docs fastapi知识点.md 原题）

**FastAPI 项目组织**（分层）：
\`\`\`
Router   → 接口定义、参数接收（/users、/agents），include_router 挂载
Service  → 业务逻辑（权限判断、数据转换）
DAO/ORM  → SQLModel 操作数据库
Database → MySQL
\`\`\`
用 **Pydantic 定义请求/响应模型**：UserCreate（创建入参）、UserModel（数据库表结构）、UserResponse（返回给前端）分开，避免数据库结构直接暴露。FastAPI 优势：开发效率高、类型校验完善、自动生成 Swagger 文档。

**SQLModel**：ORM，一个 Python 类对应一张表（\`class User(SQLModel, table=True)\`），用对象操作代替手写 SQL。

**数据链路问题定位**（前端视角）：
\`\`\`
React 页面 → Axios → FastAPI 接口 → Service → SQLModel → MySQL → 返回 JSON → 页面展示
\`\`\`
1. 页面无数据：先看 **Network** 确认请求发出、返回内容是否正确；
2. 接口异常：用 **Swagger** 直接测试接口，看 FastAPI 日志定位后端问题；
3. 接口正常但数据错：检查数据库真实数据和 SQL 查询逻辑。

**慢 SQL 排查**（结合经验）：EXPLAIN 看执行计划 → 检查 JOIN/WHERE 索引（联合索引最左匹配）→ 优化 SQL 写法（避免函数计算、隐式类型转换）→ 数据量大时分页/归档/缓存。`,ana:"前端答后端题的关键是“数据链路视角”：我负责的链路到 Axios 为止，但能顺着 Network/Swagger 定位整条链。",keys:["Router/Service/DAO 分层","Pydantic 模型","EXPLAIN"],src:"fastapi知识点.md / 基于简历的问题.md"},{id:"pj-022",type:"essay",diff:"easy",sub:"反问环节",q:"面试官问“你有什么想问的吗？”——你的反问策略是什么？",ans:`**面试回答：**（docs 针对简历问答.md 原题）

**反问策略**：重点问“长期成长相关”的问题，显得关注发展而不只是拿 offer：

1. **团队情况**：目前前端规模、技术栈占比（React/Vue）、是否全面 TypeScript 化；
2. **业务方向**：这个岗位偏业务开发、组件库建设、性能优化，还是 AI 交互与平台建设；
3. **协作与规范**：团队怎么做代码评审、测试和线上问题监控；
4. **成长机制**：新人入职后最需要补齐的能力是什么；
5. **技术前瞻**（AI 岗位加分）：AI 能力在研发流程和实际产品中的参与深度。

**避免**：第一轮就问薪资福利、加班（留到 HR 环节）；问官网就能查到的信息。

**知识点快速复习指南的版本**：
- 团队前端规模、技术栈和代码协作方式？
- 新人最需要补齐的能力？
- 团队如何做代码评审、测试和线上监控？`,ana:"反问 = 展示你对成长的重视，同时二次确认岗位匹配度。",keys:["技术栈占比","代码评审机制","新人补齐能力"],src:"针对简历问答.md / 知识点快速复习指南.md"},{id:"pj-023",type:"essay",diff:"medium",sub:"项目表达",q:"复杂项目经验的回答怎么组织？你的重点项目素材有哪些？",ans:`**面试回答方法论**（docs 知识点快速复习指南原题）：

**五句话组织法**：
1. **背景**：谁在什么场景下遇到什么问题；
2. **目标**：要提升什么指标或解决什么风险；
3. **方案**：架构、数据流、关键技术；
4. **难点**：最容易失败的地方以及你的取舍；
5. **结果**：性能、成功率、稳定性或交付结果。

**重点项目素材清单**：
1. **AI Agent 平台**：React/Vue + FastAPI + SQLModel + MySQL；工作流、Agent 对话、知识库、模型配置、审计日志、权限；
2. **文件上传**：分片、MD5、断点续传、并发控制、失败重试、合并校验、进度展示；
3. **多标签 SSE**：BroadcastChannel 主标签维护连接 + 主从选举，减少重复连接；
4. **权限系统**：动态路由、菜单权限、按钮权限、Token 鉴权、退出重置；
5. **配置驱动平台**：节点表单抽象为统一 Schema 动态渲染；
6. **性能优化**：拆包、懒加载、渲染优化 + 真实监控，LCP 2.4s→1.5s。

**面试前最后检查**：
- 能脱稿讲文件分片上传（断点续传、并发、完整性校验）；
- 能解释 Vue3 响应式（不是只说“用了 Proxy”）；
- 能说清 LCP 数据的采集口径；
- 能画 AI 流式响应数据流（停止、重连、防重复）；
- 每个项目至少准备**一个失败案例和一个技术取舍**；
- 不确定的问题直接说边界，再给排查或验证方法。`,ana:"背景-目标-方案-难点-结果五段式 + 每项目一个失败案例，是最能体现真实性的表达框架。",keys:["五句话组织","失败案例","技术取舍"],src:"知识点快速复习指南.md"}],Ta=[{id:"db-001",type:"essay",diff:"easy",sub:"SQL 基础",q:"SQL 数据库和 NoSQL 数据库有什么区别？",ans:`**面试回答：**

- **数据模型**：SQL 数据库以表、行、列组织结构化数据，通常要求相对明确的 schema；NoSQL 以文档、键值、列族或图等模型存储数据，结构更加灵活。
- **关系与查询**：SQL 原生支持多表关联、复杂聚合和标准化查询；NoSQL 通常通过嵌入、冗余或特定查询 API 减少关联。
- **事务与一致性**：关系型数据库通常更适合强事务和复杂约束；NoSQL 也可能支持事务，但设计重点往往是灵活建模、吞吐量或水平扩展。
- **选型**：用户、订单、库存等关系明确且一致性要求高的场景优先考虑 SQL；结构变化频繁、数据天然是文档或需要灵活扩展的场景可以考虑 NoSQL。

实际项目中应根据数据关系、事务要求、查询方式和扩展成本选择，而不是简单判断谁更好。`,ana:"不要把 SQL 与 NoSQL 简化成“有事务”和“没有事务”的对立关系，关键是数据模型和业务约束不同。",keys:["关系型数据库","文档数据库","事务","数据模型","场景选型"],src:"收集的面试知识点.md"},{id:"db-002",type:"single",diff:"easy",sub:"SQL 基础",q:"在关系型数据库中，主键最核心的作用是什么？",opts:["允许一张表中存在重复记录","唯一标识一条记录，并且不能为 NULL","自动把所有字段都建立索引","只用于保存创建时间"],ans:"B",ana:"主键用于唯一标识表中的一条记录，要求值唯一且不能为 NULL。InnoDB 中主键通常还会作为聚簇索引。",keys:["主键","唯一性","非空","聚簇索引"],src:"收集的面试知识点.md"},{id:"db-003",type:"essay",diff:"easy",sub:"SQL 基础",q:"什么是外键？实际项目中是否一定要使用数据库外键？",ans:"外键是一个表中的字段，它引用另一张表的主键或唯一键，用于表达表之间的关联关系，例如订单表的 `user_id` 关联用户表的 `id`。数据库外键可以帮助保证引用完整性，避免出现指向不存在用户的订单。\n\n是否使用外键需要结合实际架构判断。在单体应用、数据边界清晰且由数据库统一管理的场景中，外键有助于保证数据一致性；在高并发、分库分表、微服务或需要独立发布的场景中，跨库外键难以维护，可能会由应用层校验、异步一致性或定时任务承担约束。",ana:"回答时要同时说明外键的价值和分布式场景下的限制，体现对一致性与架构成本的权衡。",keys:["外键","引用完整性","应用层约束","分库分表"],src:"收集的面试知识点.md"},{id:"db-004",type:"multiple",diff:"easy",sub:"SQL 基础",q:"下面哪些做法有助于合理设计关系型数据库字段？",opts:["金额使用 DECIMAL 等精确类型","根据实际范围选择整数类型","所有字段都使用 VARCHAR 以便灵活","时间字段根据业务语义选择 DATETIME 或 TIMESTAMP"],ans:["A","B","D"],ana:"字段类型应匹配业务语义、取值范围、精度和索引需求。金额不应使用浮点数直接保存，所有字段使用字符串会损失约束能力和查询性能。",keys:["字段类型","DECIMAL","DATETIME","数据约束"],src:"收集的面试知识点.md"},{id:"db-005",type:"essay",diff:"medium",sub:"SQL 查询",q:"INNER JOIN、LEFT JOIN 和 RIGHT JOIN 有什么区别？",ans:`- **INNER JOIN**：只返回两张表中连接条件匹配的记录。
- **LEFT JOIN**：保留左表全部记录，右表没有匹配时对应字段为 NULL。
- **RIGHT JOIN**：保留右表全部记录，左表没有匹配时对应字段为 NULL；实际开发中通常通过调换表顺序用 LEFT JOIN 表达。

例如要查询所有用户及其订单，即使用户没有订单也要展示，应使用 \`users LEFT JOIN orders\`。如果只关心有订单的用户，则可以使用 INNER JOIN。`,ana:"重点是说明“哪张表的记录必须保留”，而不是只背 JOIN 的语法名称。",keys:["INNER JOIN","LEFT JOIN","NULL","连接条件"],src:"fastapi知识点.md"},{id:"db-006",type:"single",diff:"medium",sub:"SQL 查询",q:"SQL 查询中，HAVING 子句主要用于什么场景？",opts:["在分组前过滤原始行","在分组后过滤聚合结果","替代所有 JOIN 操作","创建数据库索引"],ans:"B",ana:"WHERE 通常在分组前过滤原始行，HAVING 在 GROUP BY 后针对分组或聚合结果进行过滤，例如筛选订单数大于 10 的用户。",keys:["GROUP BY","HAVING","WHERE","聚合"],src:"fastapi知识点.md"},{id:"db-007",type:"single",diff:"easy",sub:"MySQL 索引",q:"MySQL InnoDB 索引通常使用哪种数据结构？",opts:["二叉搜索树","B+Tree","哈希表作为所有索引的唯一实现","链表"],ans:"B",ana:"InnoDB 的主键索引和常见二级索引通常基于 B+Tree。其树高较低，叶子节点通过链表连接，适合磁盘 I/O 和范围查询。",keys:["InnoDB","B+Tree","范围查询","磁盘 I/O"],src:"收集的面试知识点.md"},{id:"db-008",type:"essay",diff:"medium",sub:"MySQL 索引",q:"什么是聚簇索引、二级索引和回表？",ans:`在 InnoDB 中，**聚簇索引**的叶子节点保存完整行数据，主键索引通常就是聚簇索引。**二级索引**的叶子节点保存索引字段和对应主键值，而不是完整行数据。

如果通过二级索引找到主键后，还需要根据主键到聚簇索引中读取其他列，这个过程叫**回表**。如果查询所需字段全部包含在二级索引中，就可以直接返回结果，形成**覆盖索引**，从而减少回表。`,ana:"这是 MySQL 索引题中的高频关系：二级索引定位主键，回表读取整行，覆盖索引可以避免回表。",keys:["聚簇索引","二级索引","回表","覆盖索引"],src:"收集的面试知识点.md"},{id:"db-009",type:"judge",diff:"medium",sub:"MySQL 索引",q:"建立了索引之后，查询一定会使用这个索引。",ans:!1,ana:"错误。优化器会根据统计信息、选择性、数据量和成本选择执行计划。数据量很小、索引区分度低，或者查询条件不适合索引时，可能选择全表扫描。",keys:["查询优化器","索引选择性","全表扫描"],src:"收集的面试知识点.md"},{id:"db-010",type:"multiple",diff:"medium",sub:"MySQL 索引",q:"以下联合索引为 `(name, age, gender)` 时，哪些条件更容易使用它？",opts:["WHERE age = ?","WHERE name = ?","WHERE name = ? AND age = ?","WHERE name = ? AND age = ? AND gender = ?"],ans:["B","C","D"],ana:"联合索引通常按照从左到右的字段顺序匹配。对于 `(name, age, gender)`，以 `name` 开始的条件更容易使用索引；只查询 `age` 通常无法充分利用该索引。实际还要结合数据分布、查询条件和执行计划判断。",keys:["联合索引","最左前缀","索引顺序"],src:"收集的面试知识点.md"},{id:"db-011",type:"multiple",diff:"medium",sub:"MySQL 查询优化",q:"下列哪些情况可能导致索引无法充分生效或效果变差？",opts:["在索引字段上使用函数或计算","LIKE 以通配符开头，例如 LIKE '%abc'","联合索引跳过最左侧字段","对低区分度字段单独建立索引"],ans:["A","B","C","D"],ana:"这些情况都可能让索引失效、无法充分利用或收益很低。实际排查时应使用 EXPLAIN 查看执行计划，而不是仅凭 SQL 形式猜测。",keys:["索引失效","LIKE","最左前缀","区分度","EXPLAIN"],src:"收集的面试知识点.md / 基于简历的问题.md"},{id:"db-012",type:"essay",diff:"medium",sub:"MySQL 查询优化",q:"遇到慢 SQL 时，你会如何定位和优化？",ans:`1. **确认问题**：记录 SQL、参数、执行耗时、调用频率和影响范围，先排除网络、连接池或锁等待等非 SQL 因素。
2. **查看执行计划**：使用 \`EXPLAIN\` 检查访问类型、命中索引、扫描行数、连接顺序和额外操作。
3. **优化 SQL**：减少不必要的列和数据量，避免在索引列上做函数或隐式类型转换，确认 JOIN 条件和分页方式合理。
4. **优化索引**：结合真实查询建立合适的单列或联合索引，关注最左前缀、覆盖索引和索引选择性。
5. **复测与观察**：用接近真实的数据量和参数验证，观察慢查询日志、监控指标和线上回归结果。

如果单表数据量和访问量已经超过单机能力，再考虑缓存、归档、分库分表等更高层次方案。`,ana:"慢 SQL 优化应从执行计划和实际数据出发，不能只凭经验增加索引。",keys:["慢 SQL","EXPLAIN","执行计划","联合索引","慢查询日志"],src:"基于简历的问题.md / 收集的面试知识点.md"},{id:"db-013",type:"essay",diff:"easy",sub:"事务与并发",q:"事务的 ACID 分别是什么？请结合转账场景说明。",ans:`- **原子性（Atomicity）**：扣款和入账要么全部成功，要么全部回滚。
- **一致性（Consistency）**：事务执行前后，余额约束、账户关系等业务规则都成立。
- **隔离性（Isolation）**：并发转账时，一个事务的中间状态不应被另一个事务错误地读取。
- **持久性（Durability）**：转账提交后，即使数据库重启，已提交结果也应保留。`,ana:"ACID 不是四个孤立名词，最好用同一个业务例子把四种性质串起来。",keys:["ACID","原子性","一致性","隔离性","持久性"],src:"收集的面试知识点.md"},{id:"db-014",type:"single",diff:"medium",sub:"事务与并发",q:"MySQL InnoDB 默认的事务隔离级别通常是哪一个？",opts:["读未提交（READ UNCOMMITTED）","读已提交（READ COMMITTED）","可重复读（REPEATABLE READ）","串行化（SERIALIZABLE）"],ans:"C",ana:"InnoDB 默认使用可重复读。四种隔离级别从低到高通常是读未提交、读已提交、可重复读、串行化，隔离性越强通常并发性能开销越高。",keys:["事务隔离级别","可重复读","InnoDB"],src:"收集的面试知识点.md"},{id:"db-015",type:"essay",diff:"medium",sub:"事务与并发",q:"什么是脏读、不可重复读和幻读？",ans:`- **脏读**：一个事务读取到了另一个事务尚未提交的数据，后者如果回滚，前一个事务读到的内容就是无效的。
- **不可重复读**：同一事务中两次读取同一条记录，结果不同，通常是因为另一个事务修改并提交了这条记录。
- **幻读**：同一事务按相同条件查询两次，第二次出现了新增或消失的满足条件的记录，表现得像出现了“幻影行”。

它们本质上都是并发事务下的数据可见性问题，不同隔离级别通过 MVCC、锁等机制进行取舍。`,ana:"区分不可重复读与幻读：前者通常针对已有记录的值变化，后者针对满足条件的记录集合变化。",keys:["脏读","不可重复读","幻读","MVCC"],src:"收集的面试知识点.md"},{id:"db-016",type:"multiple",diff:"medium",sub:"事务与并发",q:"关于数据库锁，下面哪些说法是合理的？",opts:["锁用于协调并发事务对共享数据的访问","行锁通常比表锁并发度更高，但管理成本也更复杂","锁粒度越大，任何场景下性能都越好","不合理的锁顺序可能导致死锁"],ans:["A","B","D"],ana:"锁用于控制并发访问，行锁可以减少冲突范围但有更多管理开销。锁粒度不是越大越好，多个事务以不同顺序持有资源还可能形成死锁。",keys:["行锁","表锁","锁粒度","死锁"],src:"收集的面试知识点.md"},{id:"db-017",type:"essay",diff:"easy",sub:"数据库安全",q:"什么是 SQL 注入？后端应该如何防御？",ans:`SQL 注入是指后端把未处理的用户输入直接拼接到 SQL 字符串中，攻击者可以构造特殊输入改变原本 SQL 的语义，例如绕过登录条件或读取不应访问的数据。

主要防御方式包括：
1. 使用参数化查询或预编译 SQL，让用户输入只作为参数值而不是 SQL 语法执行；
2. 使用 ORM 或查询构造器时仍要避免拼接原始 SQL；
3. 对输入做必要的类型和长度校验；
4. 数据库账号遵循最小权限原则；
5. 对异常、审计日志和敏感数据访问进行监控。`,ana:"仅做字符串转义不是最稳妥的核心方案，参数化查询应作为第一选择。",keys:["SQL 注入","参数化查询","预编译","最小权限"],src:"收集的面试知识点.md"},{id:"db-018",type:"essay",diff:"hard",sub:"数据库架构",q:"为什么需要分库分表？它会带来哪些新问题？",ans:`当单个数据库或单张表的数据量、并发量达到单机瓶颈时，可以通过分库分表分散数据和访问压力。

- **分库**：将数据或业务拆到多个数据库实例，降低单实例压力。
- **分表**：把一张大表拆成多张结构相同的表，可以按用户 ID、时间等维度水平拆分，也可以按业务字段垂直拆分。

代价包括跨库或跨表查询更复杂、分页和排序更难、全局唯一 ID 需要额外设计、跨库事务和数据一致性成本上升。因此应先通过索引、SQL 优化、缓存、归档和读写分离解决问题，确认单库能力不足后再引入分片。`,ana:"分库分表不是默认优化手段，它解决的是容量和吞吐瓶颈，同时会显著增加系统复杂度。",keys:["分库分表","水平拆分","垂直拆分","跨库事务","全局 ID"],src:"收集的面试知识点.md / 基于简历的问题.md"},{id:"db-019",type:"essay",diff:"easy",sub:"MongoDB 基础",q:"MongoDB 中 Database、Collection 和 Document 分别是什么？",ans:`MongoDB 中：

- **Database** 类似一个数据库空间，用于组织多个集合；
- **Collection** 类似关系型数据库中的表，用于保存一组文档；
- **Document** 是集合中的一条 BSON 文档，类似关系型数据库中的一行，但可以包含嵌套对象和数组，而且同一集合中的文档字段可以不完全一致。

例如 \`users\` 是一个 Collection，每个用户对象就是一个 Document。`,ana:"MongoDB 的灵活 schema 不等于完全没有数据约束，应用仍应通过校验和合理建模保证数据质量。",keys:["Database","Collection","Document","BSON","灵活 schema"],src:"收集的面试知识点.md"},{id:"db-020",type:"single",diff:"easy",sub:"MongoDB 基础",q:"MongoDB 在插入文档时如果没有主动指定 `_id`，通常会发生什么？",opts:["插入一定失败","MongoDB 自动生成一个 ObjectId 作为唯一标识","使用集合名称作为主键","永远使用数字 0"],ans:"B",ana:"`_id` 是 MongoDB 文档的默认唯一标识字段。未指定时，驱动或 MongoDB 通常会生成 ObjectId。MongoDB 默认也会为 `_id` 建立唯一索引。",keys:["_id","ObjectId","唯一索引"],src:"收集的面试知识点.md"},{id:"db-021",type:"multiple",diff:"medium",sub:"MongoDB 索引",q:"MongoDB 常见的索引类型或索引能力包括哪些？",opts:["单字段索引","复合索引","文本索引","默认的 `_id` 唯一索引"],ans:["A","B","C","D"],ana:"MongoDB 支持单字段、复合、文本等多种索引，并默认对 `_id` 建立唯一索引。索引应围绕真实查询场景建立，也会带来存储和写入维护成本。",keys:["MongoDB 索引","复合索引","文本索引","_id"],src:"收集的面试知识点.md"},{id:"db-022",type:"essay",diff:"medium",sub:"MongoDB 建模",q:"MongoDB 中什么时候适合嵌入文档，什么时候应该使用引用关系？",ans:`如果关联数据通常一起读取、数量可控、生命周期相近，可以使用**嵌入式文档**，例如把用户地址嵌入用户文档，减少额外查询。

如果子数据数量会无限增长、需要独立更新或复用、访问模式经常分开，或者文档大小会持续膨胀，则更适合使用**引用关系**，把数据放在不同 Collection 中，通过应用层查询或聚合完成关联。

设计时应优先围绕访问模式和数据生命周期，而不是简单套用关系型数据库的一对多表结构。`,ana:"MongoDB 建模的核心是读写模式、文档大小、更新频率和数据生命周期之间的权衡。",keys:["嵌入式文档","引用","访问模式","一对多"],src:"收集的面试知识点.md"},{id:"db-023",type:"judge",diff:"medium",sub:"MongoDB 事务",q:"MongoDB 完全不支持事务，只能保证单条文档操作的原子性。",ans:!1,ana:"错误。MongoDB 早期更强调单文档操作的原子性，现代 MongoDB 已支持多文档事务。但如果通过合理嵌入减少跨文档操作，通常仍能获得更简单的模型和更好的性能。",keys:["多文档事务","单文档原子性","文档建模"],src:"收集的面试知识点.md"},{id:"db-024",type:"essay",diff:"medium",sub:"MongoDB 查询",q:"MongoDB 的聚合管道可以解决什么问题？它和 SQL 的 GROUP BY、JOIN 有什么对应关系？",ans:"MongoDB 聚合管道通过多个阶段处理文档，例如使用 `$match` 过滤、`$group` 分组统计、`$project` 选择或计算字段、`$sort` 排序，适合完成过滤、分组、统计和数据转换。\n\n在概念上，`$match` 类似 WHERE，`$group` 类似 GROUP BY，`$lookup` 可以完成类似 JOIN 的关联。MongoDB 也能做关联查询，但对于大量复杂关联、强约束事务和报表型查询，关系型数据库通常更自然。",ana:"不要说 MongoDB 完全不能关联查询；应说明 `$lookup` 存在，但数据建模通常会尽量减少复杂关联。",keys:["聚合管道","$match","$group","$lookup","JOIN"],src:"收集的面试知识点.md"},{id:"db-025",type:"essay",diff:"medium",sub:"数据库选型",q:"什么情况下你会选择 MySQL，什么情况下会选择 MongoDB？",ans:`我会从数据关系、事务要求、查询模式和扩展方式几个方面判断：

- 选择 **MySQL**：数据结构比较稳定，表之间存在明确关联，需要复杂 JOIN、聚合和强事务，例如用户、订单、库存、支付等核心业务。
- 选择 **MongoDB**：数据天然是 JSON/文档结构，字段变化频繁，层级数据经常一起读取，或者希望通过灵活 schema 和水平扩展适应业务变化。

如果一个系统同时包含两类需求，也可以组合使用，但需要明确数据边界、同步机制和一致性责任，不能因为技术流行就盲目引入双数据库。`,ana:"优秀回答应从业务约束出发，而不是笼统说 MySQL 适合小数据、MongoDB 适合大数据。",keys:["MySQL","MongoDB","事务","文档模型","场景选型"],src:"收集的面试知识点.md"},{id:"db-026",type:"single",diff:"hard",sub:"数据库选型",q:"对于用户、订单、库存之间存在复杂关联且扣库存必须与创建订单保持一致的场景，优先选择哪种方案？",opts:["只使用 MongoDB，并把所有数据拆成大量独立文档","优先使用支持强事务和关联查询的关系型数据库，并合理设计事务与索引","完全不保存库存，只在前端计算","把所有字段都存成字符串以保持灵活"],ans:"B",ana:"该场景有明确关系、库存一致性和事务要求，关系型数据库更适合承载核心业务。最终仍需结合规模、架构和访问模式设计，而不是只凭数据库名称决定。",keys:["强事务","订单库存","关系型数据库","一致性"],src:"收集的面试知识点.md / 基于简历的问题.md"},{id:"db-027",type:"essay",diff:"hard",sub:"数据库架构",q:"如果项目同时使用 MySQL 和 MongoDB，如何划分数据职责并处理一致性问题？",ans:`首先要按业务边界划分职责，而不是让同一份核心数据在两个库中随意重复维护。例如 MySQL 保存用户、订单、权限等结构化核心数据和事务记录；MongoDB 保存文档型内容、复杂解析结果或结构变化频繁的扩展信息。

对于跨库写入，应尽量避免强依赖的分布式事务，优先采用明确的主数据源、事件驱动、Outbox、幂等消费和补偿重试机制，并记录同步状态。读取时要明确允许的最终一致性范围，关键流程仍以主库状态为准。

如果数据规模和模型并不需要双数据库，优先使用一种数据库会更简单，也更容易维护。`,ana:"双数据库的难点不在连接两个驱动，而在数据边界、失败重试、幂等和一致性责任。",keys:["多数据库","主数据源","最终一致性","Outbox","幂等"],src:"收集的面试知识点.md / fastapi知识点.md"},{id:"db-028",type:"single",diff:"easy",sub:"SQL 基础",q:"在 SQL 中，判断某字段为空值应使用哪种写法？",opts:["WHERE field = NULL","WHERE field == NULL","WHERE field IS NULL","WHERE field EMPTY"],ans:"C",ana:"NULL 表示未知或缺失，不应使用普通等号比较。应使用 IS NULL 或 IS NOT NULL 判断空值。由于 NULL 参与普通比较时结果通常为 UNKNOWN，还要注意三值逻辑对查询结果的影响。",keys:["NULL","IS NULL","三值逻辑"],src:"收集的面试知识点.md"},{id:"db-029",type:"multiple",diff:"easy",sub:"SQL 基础",q:"关于 DELETE、TRUNCATE 和 DROP，下面哪些说法正确？",opts:["DELETE 可以结合 WHERE 删除部分记录","TRUNCATE 通常用于快速清空表中的全部数据","DROP 会删除表的结构以及表中的数据","DELETE、TRUNCATE、DROP 在所有数据库中的事务和日志行为完全一致"],ans:["A","B","C"],ana:"DELETE 面向行，可以使用 WHERE；TRUNCATE 通常用于清空整表；DROP 删除对象本身及其数据。三者在不同数据库中的事务、锁和日志细节可能不同，不能笼统认为行为完全一致。",keys:["DELETE","TRUNCATE","DROP","DDL","DML"],src:"收集的面试知识点.md"},{id:"db-030",type:"essay",diff:"medium",sub:"SQL 查询",q:"什么是窗口函数？它和 GROUP BY 的主要区别是什么？",ans:`窗口函数在不合并原始行的前提下，对与当前行相关的一组数据进行计算，例如使用 ROW_NUMBER、RANK、SUM 或 AVG 计算排名、累计值和分组统计。

GROUP BY 会把多行聚合成一行，结果集行数通常会减少；窗口函数会保留明细行，同时把计算结果作为新列返回。例如要查询每个部门员工的工资排名，或者保留每笔订单并展示该用户的订单总额，窗口函数比单纯 GROUP BY 更合适。`,ana:"窗口函数的关键特征是“保留明细行再计算”，回答时可以结合排名或分组累计案例说明。",keys:["窗口函数","ROW_NUMBER","RANK","GROUP BY","明细行"],src:"fastapi知识点.md"},{id:"db-031",type:"single",diff:"medium",sub:"SQL 查询",q:"在没有额外过滤条件时，下面哪种写法通常用于统计表中的记录数？",opts:["SELECT COUNT(*) FROM table_name","SELECT SUM(*) FROM table_name","SELECT NUMBER(*) FROM table_name","SELECT TOTAL(*) FROM table_name"],ans:"A",ana:"COUNT(*) 用于统计符合条件的行数。COUNT(column) 会忽略该列为 NULL 的行，因此需要根据统计语义选择 COUNT(*) 或 COUNT(column)。",keys:["COUNT","COUNT(*)","NULL"],src:"fastapi知识点.md"},{id:"db-032",type:"judge",diff:"medium",sub:"SQL 查询",q:"SQL 的 WHERE 子句可以直接使用聚合函数的结果来过滤分组。",ans:!1,ana:"错误。WHERE 通常在分组前过滤原始行，聚合结果应使用 HAVING 过滤。例如 COUNT(*) > 10 应写在 HAVING 中。也可以通过子查询或窗口函数改写，但不能把聚合结果直接放进同一层 WHERE。",keys:["WHERE","HAVING","聚合函数","执行顺序"],src:"fastapi知识点.md"},{id:"db-033",type:"essay",diff:"medium",sub:"SQL 查询优化",q:"为什么大数据量场景下不建议完全依赖 LIMIT offset 分页？有什么替代方案？",ans:`当 offset 很大时，数据库通常仍需要扫描或定位前面大量记录，再丢弃这些记录，导致查询成本随页码增加，结果还可能受到并发插入或删除的影响。

常见替代方案是**游标分页或基于范围的分页**：使用上一页最后一条记录的稳定排序键作为下一页条件，例如按 id 或 created_at、id 的联合顺序查询大于上次游标的记录，并配合合适索引。管理后台等对随机跳页有强需求的场景仍可使用 offset，但需要评估数据规模和索引情况。`,ana:"分页优化要同时考虑稳定排序、索引和数据变化，不能只把 offset 换成另一个参数。",keys:["深分页","LIMIT offset","游标分页","范围查询","稳定排序"],src:"基于简历的问题.md / 收集的面试知识点.md"},{id:"db-034",type:"multiple",diff:"medium",sub:"事务与并发",q:"下面哪些做法有助于降低数据库事务带来的并发风险？",opts:["尽量缩短事务持有锁的时间","保持多个事务获取资源的顺序一致","在事务中执行不必要的长时间网络请求","根据业务需要合理选择隔离级别"],ans:["A","B","D"],ana:"缩短事务、统一加锁顺序可以降低锁冲突和死锁概率，隔离级别应根据一致性需求与并发性能权衡。事务中执行长时间外部请求会长时间占用连接和锁，应尽量避免。",keys:["事务边界","锁等待","死锁","隔离级别"],src:"收集的面试知识点.md / fastapi知识点.md"},{id:"db-035",type:"essay",diff:"hard",sub:"事务与并发",q:"什么是 MVCC？它如何帮助实现并发读？",ans:`MVCC 是多版本并发控制。数据库为记录保留必要的历史版本或版本信息，读事务根据自己的可见性规则读取一个一致性快照，写事务则生成新版本或更新版本链。

这样普通读操作可以在不阻塞其他事务写入的情况下读取符合隔离级别的数据，减少读写锁冲突。以 InnoDB 为例，MVCC 会结合隐藏版本字段、undo log 和 Read View 判断某条记录对当前事务是否可见。MVCC 不是完全没有锁，更新、范围保护和特定锁定读仍可能需要加锁。`,ana:"回答 MVCC 时要说明“多版本 + 可见性判断 + 减少读写阻塞”，也要避免说成所有读写都不加锁。",keys:["MVCC","版本链","Read View","undo log","快照读"],src:"收集的面试知识点.md"},{id:"db-036",type:"single",diff:"easy",sub:"MongoDB 基础",q:"MongoDB 中用于对字段执行原子递增操作的更新运算符通常是哪个？",opts:["$set","$inc","$push","$unset"],ans:"B",ana:"$inc 用于对数值字段执行递增或递减，例如将浏览次数增加 1；$set 用于赋值，$push 用于向数组追加元素，$unset 用于删除字段。",keys:["$inc","$set","$push","$unset"],src:"收集的面试知识点.md"},{id:"db-037",type:"multiple",diff:"medium",sub:"MongoDB 建模",q:"设计 MongoDB 文档模型时，下面哪些因素需要重点考虑？",opts:["主要查询和更新模式","嵌入文档后的大小和增长速度","数据之间的生命周期和复用关系","无论业务如何都必须完全照搬关系型数据库的拆表方式"],ans:["A","B","C"],ana:"MongoDB 建模应围绕访问模式、文档大小、更新频率、生命周期和复用关系进行权衡。关系型数据库的范式和拆表方式可以参考，但不应机械照搬。",keys:["MongoDB 建模","访问模式","文档大小","生命周期"],src:"收集的面试知识点.md"},{id:"db-038",type:"essay",diff:"hard",sub:"MongoDB 架构",q:"MongoDB 副本集和分片分别解决什么问题？",ans:`**副本集**通过多个节点保存同一份数据，提供故障切换和数据冗余，主要解决高可用问题，也可以根据读策略分担部分读取压力。

**分片**把数据分布到多个分片节点，主要用于突破单机的存储和吞吐瓶颈，实现水平扩展。分片需要选择合适的 shard key，避免数据热点，并处理跨分片查询和运维复杂度。

两者可以组合使用：每个分片本身可以是一个副本集。副本集不是无限扩容方案，分片也不是自动提升所有查询性能。`,ana:"核心区分是副本集偏向高可用和冗余，分片偏向容量与水平扩展。",keys:["副本集","分片","高可用","水平扩展","shard key"],src:"收集的面试知识点.md"},{id:"db-039",type:"judge",diff:"medium",sub:"MongoDB 索引",q:"MongoDB 索引越多越好，因为每个索引都会提升查询性能且不会影响写入。",ans:!1,ana:"错误。索引能加速匹配的查询，但会占用内存和磁盘，并在插入、更新、删除时维护。索引过多还可能增加写入延迟和优化器选择成本，应根据真实查询建立并定期清理无用索引。",keys:["索引维护","写入成本","索引设计"],src:"收集的面试知识点.md"},{id:"db-040",type:"single",diff:"medium",sub:"MongoDB 查询",q:"MongoDB 更新操作中的 upsert 选项通常表示什么？",opts:["只允许查询，禁止更新","匹配到文档时更新，匹配不到时插入新文档","删除所有匹配文档","强制删除唯一索引"],ans:"B",ana:"upsert 表示 update or insert：如果过滤条件匹配到文档就更新，否则根据过滤条件和更新内容插入一条新文档。使用时要设计好唯一索引和幂等条件，避免重复数据。",keys:["upsert","幂等","唯一索引"],src:"收集的面试知识点.md"},{id:"db-041",type:"essay",diff:"hard",sub:"MongoDB 查询优化",q:"如何排查和优化 MongoDB 中执行缓慢的查询？",ans:`可以先通过慢查询日志、监控或 profiler 找到实际慢查询，再使用 explain 查看执行计划、扫描文档数、返回文档数和索引使用情况。

优化时应根据过滤、排序和返回字段设计索引，尽量减少无效扫描；检查复合索引字段顺序、是否存在低选择性条件、是否因为大文档或不必要字段导致网络和反序列化成本；对于聚合管道，可以尽早使用 $match，并控制中间结果规模。完成修改后要用接近真实数据量和查询分布的场景复测。`,ana:"MongoDB 查询优化同样需要执行计划和真实数据，不应只看到“有索引”就认为查询已经优化。",keys:["explain","profiler","慢查询","复合索引","$match"],src:"收集的面试知识点.md"},{id:"db-042",type:"multiple",diff:"hard",sub:"MongoDB 架构",q:"在使用 MongoDB 副本集时，下面哪些因素会影响读取到的数据是否最新？",opts:["读取节点的选择策略","主从节点之间的复制延迟","read concern 等一致性配置","前端页面使用的 CSS 框架"],ans:["A","B","C"],ana:"读副本、复制延迟和 read concern 等配置都会影响读取的一致性和新鲜度。应用应根据业务是否允许最终一致性选择读策略，不能只通过增加副本数解决所有一致性问题。",keys:["副本集","复制延迟","read concern","最终一致性"],src:"收集的面试知识点.md"},{id:"db-043",type:"essay",diff:"medium",sub:"数据库工程",q:"数据库表结构或索引变更如何尽量降低对线上业务的影响？",ans:`首先评估变更规模、锁行为、执行时间、磁盘空间和回滚方案，并在接近生产的数据量上验证。对于大表，应优先使用支持在线变更的工具或分阶段迁移，避免在高峰期直接执行长时间阻塞操作。

常见流程是先向后兼容：新增可选字段或新表，发布能够同时读写新旧结构的代码，完成历史数据回填和校验，再切换读流量，最后清理旧字段。索引创建也要观察资源、锁等待和查询性能，并准备暂停或回滚方案。`,ana:"线上数据库变更的重点是兼容性、可观测性和可回滚，而不仅是变更语句本身。",keys:["在线变更","向后兼容","数据回填","回滚","大表变更"],src:"基于简历的问题.md / fastapi知识点.md"},{id:"db-044",type:"single",diff:"medium",sub:"数据库工程",q:"数据库连接池的主要作用是什么？",opts:["让每条 SQL 都绕过数据库认证","复用有限数量的数据库连接，减少频繁建立和释放连接的开销","自动为所有 SQL 创建索引","把关系型数据库转换成 MongoDB"],ans:"B",ana:"连接池预先创建并复用一定数量的连接，降低连接建立成本，同时限制并发连接数。连接池大小需要结合数据库承载能力、应用并发和请求耗时配置，过大也可能压垮数据库。",keys:["连接池","连接复用","并发连接数"],src:"fastapi知识点.md"},{id:"db-045",type:"essay",diff:"hard",sub:"数据库工程",q:"如何保证一个“创建订单并扣减库存”接口在重复请求和异常重试下不会重复扣库存？",ans:`可以从幂等、事务和并发控制三个层面设计：

1. 为请求生成业务幂等键，并在订单表建立唯一约束，重复请求直接返回已有订单结果；
2. 在同一个本地事务中创建订单并扣减库存，扣减时带上库存大于 0 等条件，确保不会扣成负数；
3. 根据并发冲突选择行锁、乐观锁版本号或原子更新，并处理死锁和重试；
4. 对超时场景不能简单认为失败，应通过查询幂等键确认事务最终状态；
5. 如果还涉及消息或其他数据库，使用 Outbox、幂等消费和补偿机制处理跨系统一致性。

关键是让“重试”变成同一个业务操作，而不是每次都创建新订单并再次扣库存。`,ana:"这类场景题要把数据库约束、事务边界、并发控制和接口幂等结合起来回答，单独依赖前端防重复点击是不够的。",keys:["接口幂等","唯一约束","库存扣减","乐观锁","Outbox"],src:"基于简历的问题.md / 收集的面试知识点.md"},{id:"db-046",type:"single",diff:"easy",sub:"SQL 查询",q:"UNION 和 UNION ALL 的主要区别是什么？",opts:["UNION 会去重，UNION ALL 通常保留重复行","UNION 只能连接两张表，UNION ALL 可以连接三张表","UNION 只能用于数字字段","两者没有任何区别"],ans:"A",ana:"UNION 会合并结果并去除重复行，通常需要额外的去重成本；UNION ALL 直接拼接结果并保留重复行。如果业务确定不需要去重，UNION ALL 通常效率更高。",keys:["UNION","UNION ALL","去重"],src:"fastapi知识点.md"},{id:"db-047",type:"essay",diff:"medium",sub:"SQL 查询",q:"EXISTS 和 IN 有什么区别？实际使用时应该如何选择？",ans:`IN 用于判断某个值是否属于一个结果集合，EXISTS 用于判断子查询是否能返回至少一行结果。

当子查询结果集较小且需要直接比较值时，IN 通常比较直观；当外层表较大、子查询只需要判断是否存在匹配记录时，EXISTS 可以在找到第一条匹配记录后停止。现代数据库优化器可能会把两者转换成类似的执行计划，因此不能只凭语法断言谁一定更快，应该结合数据量、NULL 语义、索引和 EXPLAIN 判断。`,ana:"面试中要注意 NOT IN 遇到 NULL 可能产生意外结果，复杂场景可考虑 NOT EXISTS 并检查执行计划。",keys:["EXISTS","IN","NOT EXISTS","NULL","执行计划"],src:"fastapi知识点.md / 收集的面试知识点.md"},{id:"db-048",type:"multiple",diff:"medium",sub:"MySQL 索引",q:"设计联合索引时，下面哪些因素值得重点考虑？",opts:["高频查询的过滤字段和排序字段","字段的区分度和数据分布","等值条件、范围条件在查询中的位置","不看查询场景，给所有字段都建立联合索引"],ans:["A","B","C"],ana:"联合索引应由真实查询模式驱动，综合考虑过滤、排序、连接、区分度以及等值和范围条件。索引不是越多越好，盲目给所有字段建索引会增加存储和写入维护成本。",keys:["联合索引","区分度","查询模式","范围条件"],src:"收集的面试知识点.md"},{id:"db-049",type:"judge",diff:"medium",sub:"事务与并发",q:"乐观锁一定要使用数据库的锁语句，例如 SELECT ... FOR UPDATE。",ans:!1,ana:"错误。乐观锁通常通过版本号或更新时间字段进行条件更新，例如 UPDATE ... SET version = version + 1 WHERE id = ? AND version = ?，根据受影响行数判断是否发生并发冲突；SELECT ... FOR UPDATE 更属于悲观锁场景。",keys:["乐观锁","悲观锁","版本号","条件更新"],src:"收集的面试知识点.md / 基于简历的问题.md"},{id:"db-050",type:"essay",diff:"hard",sub:"事务与并发",q:"数据库发生死锁时，通常如何定位和处理？",ans:`死锁通常是多个事务以不同顺序持有资源并互相等待。定位时应查看数据库的死锁日志、锁等待信息和涉及的 SQL，确认事务持有了哪些锁、等待哪些锁，以及访问顺序是否不一致。

处理上可以统一多个事务获取资源的顺序，缩短事务范围，合理建立索引以减少锁住的记录，并避免在事务中执行长时间外部操作。应用层还应捕获死锁错误，在保证幂等的前提下进行有限次数重试。重试只是兜底，不能替代修正高频死锁的根因。`,ana:"死锁处理要包含定位、预防和恢复三部分；数据库主动回滚其中一个事务后，应用仍需要正确处理失败请求。",keys:["死锁","锁等待","事务顺序","重试","幂等"],src:"收集的面试知识点.md / 基于简历的问题.md"},{id:"db-051",type:"single",diff:"medium",sub:"数据库架构",q:"数据库读写分离中，最需要关注的常见问题是什么？",opts:["主库写入后从库可能存在复制延迟，导致读不到最新数据","只要有从库就不需要任何索引","从库一定比主库拥有更多最新数据","读写分离会自动解决所有事务问题"],ans:"A",ana:"主库写入后，从库同步需要时间，立即读取从库可能读到旧数据。需要根据业务重要性选择主库读、会话粘滞、等待复制完成或接受最终一致性，并监控复制延迟。",keys:["读写分离","复制延迟","最终一致性","主库读"],src:"基于简历的问题.md / 收集的面试知识点.md"},{id:"db-052",type:"essay",diff:"medium",sub:"数据库建模",q:"什么是数据库范式？为什么实际项目中有时会进行反范式设计？",ans:`范式是为了减少数据冗余和插入、更新、删除异常而形成的一组数据库设计规范，常见的第一范式、第二范式和第三范式分别关注字段原子性、部分依赖和传递依赖等问题。

反范式是在明确业务和性能收益的前提下，适当复制或预计算数据，减少高频查询中的 JOIN 和聚合。例如订单表保留下单时的商品名称和价格快照，可以保证历史展示稳定并减少读取关联。反范式会增加写入、同步和一致性成本，需要明确数据来源和更新策略。`,ana:"范式解决数据一致性和冗余问题，反范式解决部分读取性能和历史快照问题，二者是工程权衡而不是绝对对立。",keys:["数据库范式","反范式","数据冗余","快照"],src:"收集的面试知识点.md"},{id:"db-053",type:"multiple",diff:"medium",sub:"数据库安全",q:"数据库备份方案设计时，下面哪些内容需要考虑？",opts:["备份的频率、保留周期和恢复点目标","备份文件的加密、权限和异地保存","定期进行恢复演练，验证备份确实可用","只要备份任务显示成功，就无需关注恢复过程"],ans:["A","B","C"],ana:"备份的价值最终体现在可恢复性。除了频率和保留策略，还应保护备份本身，并定期演练恢复，验证恢复时间目标和恢复点目标是否满足业务要求。",keys:["数据库备份","恢复演练","RPO","RTO","备份安全"],src:"基于简历的问题.md"},{id:"db-054",type:"single",diff:"easy",sub:"MongoDB 基础",q:"MongoDB 中 TTL 索引通常适合用于哪类数据？",opts:["需要按时间自动过期的会话、临时令牌或日志","必须永久保存且不能删除的财务凭证","所有核心订单的唯一主键","替代所有普通查询索引"],ans:"A",ana:"TTL 索引可以根据日期字段自动清理过期文档，适合会话、临时数据和日志等有明确保留期限的场景。它不是实时定时器，清理存在时间间隔，也不能替代普通业务索引。",keys:["TTL 索引","数据过期","会话","日志"],src:"收集的面试知识点.md"},{id:"db-055",type:"essay",diff:"medium",sub:"MongoDB 索引",q:"MongoDB 如何为数组字段建立索引？需要注意什么？",ans:"MongoDB 可以为包含数组的字段建立多键索引（Multikey Index），用于匹配数组中包含某个元素或满足条件的文档。例如给 tags 建索引，可以支持按标签查询。需要注意数组字段会影响索引条目数量和写入成本，复合索引中对多个数组字段的设计也有限制；还要结合实际查询条件、选择性和文档规模使用 explain 验证。索引能帮助过滤数组内容，但不意味着所有数组查询都会高效。",ana:"数组索引的核心概念是多键索引，同时要关注数组增长、索引膨胀和复合索引限制。",keys:["多键索引","数组字段","Multikey Index","索引膨胀"],src:"收集的面试知识点.md"},{id:"db-056",type:"judge",diff:"medium",sub:"MongoDB 数据一致性",q:"MongoDB 的 write concern 设置为 acknowledged，就代表数据已经持久化到所有副本节点。",ans:!1,ana:"错误。write concern 用于控制写操作需要得到怎样的确认，acknowledged 通常只表示服务器确认接收或处理了写请求，并不等价于已经复制到所有节点并持久化。是否等待多数节点、是否等待日志落盘等要看具体配置。",keys:["write concern","副本集","持久化","数据一致性"],src:"收集的面试知识点.md"},{id:"db-057",type:"multiple",diff:"medium",sub:"MongoDB 查询",q:"MongoDB 查询优化中，projection（字段投影）可能带来哪些收益？",opts:["减少返回字段和网络传输量","降低应用反序列化和内存开销","在配合合适索引时可能形成覆盖查询","保证任何查询都不再需要索引"],ans:["A","B","C"],ana:"只返回业务需要的字段可以减少网络和应用层开销，若过滤条件和返回字段都在索引中，还可能避免读取完整文档。projection 不能替代过滤条件设计和索引。",keys:["projection","字段投影","覆盖查询","网络开销"],src:"收集的面试知识点.md"},{id:"db-058",type:"essay",diff:"hard",sub:"MongoDB 数据一致性",q:"MongoDB 的 read concern 和 write concern 分别解决什么问题？",ans:`write concern 描述写操作需要获得什么级别的确认，例如只确认主节点处理，还是等待写入多数副本节点；它影响写入可靠性、延迟和故障时的数据安全。

read concern 描述读操作可以读取什么级别的数据，例如是否只读到已提交或多数节点确认的数据；它影响读取的一致性和新鲜度。两者需要结合副本集拓扑、业务容忍度和性能要求配置，不能只追求最高级别而忽略延迟和吞吐。`,ana:"可以将 write concern 理解为“写入要确认到什么程度”，read concern 理解为“读取允许看到什么状态的数据”。",keys:["read concern","write concern","副本集","一致性","延迟"],src:"收集的面试知识点.md"},{id:"db-059",type:"single",diff:"medium",sub:"MongoDB 数据建模",q:"MongoDB 的 schema validation 主要用于什么？",opts:["在写入时对文档字段和数据类型施加一定约束","自动把 MongoDB 转换成关系型数据库","替代所有业务层校验和权限控制","自动为每个字段创建索引"],ans:"A",ana:"schema validation 可以通过规则约束文档结构、字段类型和必要字段，减少脏数据。它不能替代业务层校验、权限控制和完整的领域逻辑，也不会自动创建索引。",keys:["schema validation","文档校验","数据质量"],src:"收集的面试知识点.md"},{id:"db-060",type:"essay",diff:"hard",sub:"数据库架构",q:"如何设计一个数据库变更事件，使下游服务能够可靠消费？",ans:`可以先明确事件的业务语义、唯一事件 ID、聚合根 ID、版本号和发生时间，并把事件记录和业务状态变更放在同一个本地事务中写入 Outbox 表或集合，避免业务提交成功但消息发布失败。

发布器负责可靠投递并记录状态，下游消费者需要按照事件 ID 做幂等处理，失败时进行重试和死信隔离。对于乱序或重复事件，可以使用版本号、状态机或去重表保护状态更新。还应提供监控、补偿和人工重放能力，不能把“消息发送成功”直接等同于“所有下游已经完成处理”。`,ana:"可靠事件链路的核心是本地事务、可重试投递、消费者幂等、顺序或版本控制，以及可观测的补偿机制。",keys:["Outbox","事件 ID","幂等消费","重试","死信","最终一致性"],src:"基于简历的问题.md / fastapi知识点.md"}],Pa={"html-css":ga,javascript:ba,browser:xa,network:ka,vue:Sa,react:va,performance:ja,engineering:Ca,algorithm:Ma,scenario:Na,project:wa,database:Ta},Ra="ABCDEFGH";function Da(s,t){var d;const n=(d=s.opts)==null?void 0:d.map((o,h)=>({label:Ra[h],text:o}));let r;return s.type==="single"?r=s.ans:s.type==="multiple"?r=s.ans.slice().sort():(s.type,r=s.ans),{id:s.id,category:t,subCategory:s.sub,type:s.type,difficulty:s.diff,question:s.q,options:n,answer:r,analysis:s.ana,keyPoints:s.keys,source:s.src}}const F=Object.entries(Pa).flatMap(([s,t])=>t.map(n=>Da(n,s))),z=Object.fromEntries(F.map(s=>[s.id,s])),as=(()=>{const s={};for(const t of ee)s[t.id]=[];for(const t of F)s[t.category]||(s[t.category]=[]),s[t.category].push(t);return s})(),Oa=(()=>{var t;const s={};for(const n of F){if(!n.subCategory)continue;const r=s[t=n.category]??(s[t]=[]);r.includes(n.subCategory)||r.push(n.subCategory)}return s})();Object.fromEntries(F.map(s=>[s.id,s.subCategory??""]));function he(s){const t=s.slice();for(let n=t.length-1;n>0;n--){const r=Math.floor(Math.random()*(n+1));[t[n],t[r]]=[t[r],t[n]]}return t}const $e=[{to:"/",icon:ut,label:"首页"},{to:"/bank",icon:ce,label:"题库"},{to:"/wrong",icon:Ye,label:"错题本",wrongBadge:!0},{to:"/favorites",icon:ne,label:"收藏"},{to:"/stats",icon:Ce,label:"统计"},{to:"/interview",icon:es,label:"面试模式"}],ns="fe-quiz-theme";function La(){if(typeof window>"u")return"light";const s=window.localStorage.getItem(ns);return s==="light"||s==="dark"?s:window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Ia(){const s=Qe(),t=w(a=>a.records),n=w(a=>a.favorites),[r,d]=p.useState(La);p.useEffect(()=>{document.documentElement.dataset.theme=r,document.documentElement.style.colorScheme=r,window.localStorage.setItem(ns,r)},[r]);const o=p.useMemo(()=>{const a=Object.values(t).filter(m=>m.grading!=="pending"),u=a.filter(m=>m.grading==="correct").length;return{done:Object.keys(t).length,total:F.length,accuracy:H(u,a.length)}},[t]),h=p.useMemo(()=>Object.values(t).filter(a=>a.grading==="wrong").length,[t]),[l,y]=p.useState(s.pathname);return s.pathname!==l&&(y(s.pathname),window.scrollTo(0,0)),e.jsxs("div",{className:"app-shell",children:[e.jsxs("aside",{className:"sidebar",children:[e.jsxs("div",{className:"sidebar-brand",children:[e.jsx("img",{className:"brand-logo brand-logo-img",src:"./testexam_logo.webp",alt:"logo",onClick:()=>window.location.href=window.location.origin}),e.jsxs("div",{className:"brand-copy",children:[e.jsx("div",{className:"brand-title",children:"前端面试刷题"}),e.jsx("div",{className:"brand-sub",children:"FE Interview Quiz"})]}),e.jsx("button",{type:"button",className:"theme-toggle",onClick:()=>d(a=>a==="dark"?"light":"dark"),"aria-label":r==="dark"?"切换到亮色模式":"切换到暗色模式",title:r==="dark"?"切换到亮色模式":"切换到暗色模式",children:r==="dark"?e.jsx(Fe,{size:16}):e.jsx(Ve,{size:16})})]}),e.jsx("nav",{className:"sidebar-nav",children:$e.map(a=>e.jsxs(ke,{to:a.to,end:a.to==="/",className:({isActive:u})=>`nav-item ${u?"active":""}`,children:[e.jsx("span",{className:"nav-icon",children:e.jsx(a.icon,{size:16,strokeWidth:2})}),a.label,a.wrongBadge&&h>0&&e.jsx("span",{className:"nav-badge",children:h})]},a.to))}),e.jsxs("div",{className:"sidebar-footer",children:[e.jsxs("div",{className:"sidebar-footer-row",children:[e.jsx("span",{children:"学习进度"}),e.jsxs("strong",{children:[o.done,"/",o.total]})]}),e.jsx("div",{className:"progress-track",children:e.jsx("div",{className:"progress-fill",style:{width:`${H(o.done,o.total)}%`}})}),e.jsxs("div",{style:{marginTop:8},children:["总正确率"," ",e.jsxs("strong",{style:{color:"var(--text)"},children:[o.accuracy,"%"]})," · ","收藏"," ",e.jsx("strong",{style:{color:"var(--text)"},children:Object.keys(n).length})]})]})]}),e.jsxs("div",{className:"main-area",children:[e.jsxs("div",{className:"mobile-topbar",children:[e.jsx(ke,{to:"/",children:e.jsx("img",{className:"brand-logo brand-logo-img",src:"./testexam_logo.webp",alt:"logo"})}),e.jsx("button",{type:"button",className:"theme-toggle theme-toggle-mobile",onClick:()=>d(a=>a==="dark"?"light":"dark"),"aria-label":r==="dark"?"切换到亮色模式":"切换到暗色模式",title:r==="dark"?"切换到亮色模式":"切换到暗色模式",children:r==="dark"?e.jsx(Fe,{size:16}):e.jsx(Ve,{size:16})}),$e.map(a=>e.jsx(ke,{to:a.to,end:a.to==="/",className:({isActive:u})=>`mobile-nav-item ${u?"active":""}`,children:a.label},a.to))]}),e.jsx(ys,{})]})]})}const Aa={"html-css":Lt,javascript:As,browser:lt,network:Dt,vue:bt,react:Ts,performance:Ht,engineering:ia,algorithm:Rs,scenario:qt,project:qs,database:Zs};function De(s){return Aa[s]??Xe}function Oe({category:s,size:t=14,strokeWidth:n=2}){const r=De(s);return e.jsx(r,{size:t,strokeWidth:n})}const is={single:"单选",multiple:"多选",judge:"判断",essay:"解答",code:"代码"},rs={easy:"简单",medium:"中等",hard:"困难"};function ge({type:s}){return e.jsx("span",{className:"tag tag-type",children:is[s]})}function be({difficulty:s}){return e.jsx("span",{className:`tag tag-${s}`,children:rs[s]})}function xe({category:s,sub:t}){const n=me[s],r=De(s);return e.jsxs("span",{className:"tag tag-cat",children:[e.jsx(r,{size:12}),(n==null?void 0:n.name)??s,t?` · ${t}`:""]})}function ue({icon:s,title:t,desc:n,action:r}){return e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"empty-icon",children:s??e.jsx(yt,{size:40,strokeWidth:1.5})}),e.jsx("div",{className:"empty-title",children:t}),n&&e.jsx("div",{style:{fontSize:13},children:n}),r&&e.jsx("div",{style:{marginTop:16},children:r})]})}function Le({value:s,max:t}){const n=t>0?Math.round(s/t*100):0;return e.jsx("div",{className:"progress-track",children:e.jsx("div",{className:"progress-fill",style:{width:`${n}%`}})})}function Ie({grading:s}){return s==="correct"?e.jsxs("span",{className:"status-correct status-inline",children:[e.jsx(ie,{size:13})," 已答对"]}):s==="wrong"?e.jsxs("span",{className:"status-wrong status-inline",children:[e.jsx(ae,{size:13})," 已答错"]}):s==="pending"?e.jsxs("span",{className:"status-pending status-inline",children:[e.jsx(Te,{size:13})," 待自评"]}):e.jsx("span",{children:"未做过"})}function Je(){const s=oe(),t=w(l=>l.records),n=w(l=>l.history),r=p.useMemo(()=>{const l=Object.values(t).filter(a=>a.grading!=="pending"),y=l.filter(a=>a.grading==="correct").length;return{total:F.length,done:Object.keys(t).length,correct:y,accuracy:H(y,l.length)}},[t]),d=p.useMemo(()=>ee.map(l=>{const y=as[l.id]??[];let a=0,u=0,m=0;for(const c of y){const i=t[c.id];i&&(a++,i.grading!=="pending"&&(m++,i.grading==="correct"&&u++))}return{cat:l,total:y.length,done:a,accuracy:H(u,m)}}),[t]),o=p.useMemo(()=>n.slice(0,8).map(l=>({...l,question:z[l.questionId]})),[n]);function h(l){if(l==="random20"){const y=he(F).slice(0,20).map(a=>a.id);s("/practice",{state:{ids:y,title:"随机练习 20 题"}})}else s(l==="undone"?"/practice?status=undone&order=random":"/practice?status=wrong&order=random")}return e.jsxs("main",{className:"page",children:[e.jsxs("section",{className:"hero",children:[e.jsx("h1",{className:"hero-title",children:"前端面试刷题系统"}),e.jsx("p",{className:"hero-desc",children:"基于「面试知识 docs」知识体系构建的纯前端刷题与复习系统：覆盖 HTML/CSS、JavaScript、浏览器原理、计算机网络、 Vue、React、性能优化、工程化、算法、业务场景与项目经验 11 大板块，支持客观题自动判分、解答题对照面试参考答案、 错题本、收藏、学习统计与模拟面试。"}),e.jsxs("div",{className:"hero-actions",children:[e.jsxs("button",{className:"btn btn-lg btn-primary",onClick:()=>h("random20"),children:[e.jsx(oa,{size:16}),"快速开始 · 随机 20 题"]}),e.jsxs("button",{className:"btn btn-lg btn-hero",onClick:()=>h("undone"),children:[e.jsx(ce,{size:16}),"刷未做的题"]}),e.jsxs("button",{className:"btn btn-lg btn-hero",onClick:()=>h("wrong"),children:[e.jsx(re,{size:16}),"错题重做"]}),e.jsxs(E,{to:"/interview",className:"btn btn-lg btn-hero",children:[e.jsx(_t,{size:16}),"模拟面试"]})]}),e.jsxs("div",{className:"hero-stats",children:[e.jsxs("div",{children:[e.jsx("div",{className:"hero-stat-value",children:r.total}),e.jsx("div",{className:"hero-stat-label",children:"题库总题数"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hero-stat-value",children:r.done}),e.jsx("div",{className:"hero-stat-label",children:"已完成"})]}),e.jsxs("div",{children:[e.jsxs("div",{className:"hero-stat-value",children:[r.accuracy,"%"]}),e.jsx("div",{className:"hero-stat-label",children:"总正确率"})]}),e.jsxs("div",{children:[e.jsx("div",{className:"hero-stat-value",children:ee.length}),e.jsx("div",{className:"hero-stat-label",children:"知识分类"})]})]})]}),e.jsxs("h2",{className:"section-title",children:[e.jsx(ce,{size:16}),"知识分类"]}),e.jsx("div",{className:"grid-cats",children:d.map(({cat:l,total:y,done:a,accuracy:u})=>{const m=De(l.id);return e.jsxs(E,{to:`/bank?cat=${l.id}`,className:"card cat-card",children:[e.jsxs("div",{className:"cat-card-head",children:[e.jsx("div",{className:"cat-icon",style:{background:`${l.color}1a`,color:l.color},children:e.jsx(m,{size:19,strokeWidth:1.8})}),e.jsxs("div",{style:{flex:1},children:[e.jsx("div",{className:"cat-name",children:l.name}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--text-3)"},children:[a,"/",y," 已完成 · 正确率 ",u,"%"]})]})]}),e.jsx("div",{className:"cat-desc",children:l.description}),e.jsx(Le,{value:a,max:y})]},l.id)})}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:16},children:[e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(Pe,{size:16}),"最近做题记录"]}),o.length===0?e.jsx("p",{style:{color:"var(--text-3)",fontSize:13,padding:"16px 0"},children:"还没有做题记录，点击上方「快速开始」开启刷题之旅吧。"}):o.map((l,y)=>e.jsxs("div",{className:"recent-item",children:[e.jsx("span",{className:`dot dot-${l.grading==="correct"?"correct":l.grading==="wrong"?"wrong":"pending"}`}),e.jsx("span",{style:{flex:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:l.question?l.question.question.replace(/[#*`>|]/g,"").replace(/[[\]]/g,"").slice(0,48):l.questionId}),e.jsx(Ie,{grading:l.grading}),e.jsx("span",{style:{color:"var(--text-3)",fontSize:11.5,flexShrink:0},children:ts(l.time).slice(5,16)})]},`${l.questionId}-${l.time}-${y}`))]}),e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(wt,{size:16}),"复习路线（来自 docs 目录索引）"]}),e.jsxs("ol",{style:{margin:"10px 0 0",paddingLeft:20,fontSize:13,color:"var(--text-2)",lineHeight:2},children:[e.jsxs("li",{children:[e.jsx("strong",{children:"基础层"}),"：HTML / CSS / JavaScript 基础、基础算法"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"进阶层"}),"：原型闭包与异步、浏览器与网络原理、Vue / React 框架"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"项目与场景层"}),"：性能优化、工程化、大文件上传与并发、项目经验、FastAPI"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"冲刺"}),"：错题重做 + 面试模式模拟 + 高频反问准备"]})]}),e.jsxs("div",{style:{marginTop:14,display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsxs(E,{to:"/bank",className:"btn btn-sm",children:[e.jsx(ce,{size:13}),"进入题库"]}),e.jsx(E,{to:"/stats",className:"btn btn-sm",children:"查看统计"})]})]})]})]})}function os(s){var r;const t=w.getState().records,n=((r=s.search)==null?void 0:r.trim().toLowerCase())??"";return F.filter(d=>{var o;if(s.category&&d.category!==s.category||s.sub&&d.subCategory!==s.sub||s.type&&d.type!==s.type||s.diff&&d.difficulty!==s.diff)return!1;if(s.status&&s.status!=="all"){const h=t[d.id],l=h==null?void 0:h.grading;if(s.status==="undone"&&l||s.status==="correct"&&l!=="correct"||s.status==="wrong"&&l!=="wrong"||s.status==="pending"&&l!=="pending")return!1}return!(n&&!`${d.question} ${d.analysis??""} ${((o=d.keyPoints)==null?void 0:o.join(" "))??""}`.toLowerCase().includes(n))})}function ds(s){return{category:s.get("cat")||void 0,sub:s.get("sub")||void 0,type:s.get("type")||"",diff:s.get("diff")||"",status:s.get("status")||"all",search:s.get("q")||"",start:s.get("start")||void 0,order:s.get("order")==="random"?"random":"seq"}}function Ea(s){const t=new URLSearchParams;return s.category&&t.set("cat",s.category),s.sub&&t.set("sub",s.sub),s.type&&t.set("type",s.type),s.diff&&t.set("diff",s.diff),s.status&&s.status!=="all"&&t.set("status",s.status),s.search&&t.set("q",s.search),s.order==="random"&&t.set("order","random"),s.start&&t.set("start",s.start),t.toString()}function qa(){const[s]=Ge(),t=oe(),n=w(i=>i.records),r=w(i=>i.favorites),d=p.useMemo(()=>ds(s),[s]),[o,h]=p.useState("seq"),[l,y]=p.useState(50),a=p.useMemo(()=>os(d),[d]);function u(i,f){const S=new URLSearchParams(s);f?S.set(i,f):S.delete(i),t(`/bank?${S.toString()}`)}function m(i){const f={...d,start:i,order:o};t(`/practice?${Ea(f)}`)}const c=d.category||d.sub||d.type||d.diff||d.status&&d.status!=="all"||d.search;return e.jsxs("main",{className:"page",children:[e.jsxs("div",{className:"page-header",children:[e.jsxs("h1",{className:"page-title",children:[e.jsx(kt,{size:20}),"题库"]}),e.jsxs("p",{className:"page-desc",children:["共 ",a.length," 道题符合当前条件 · 支持按分类、题型、难度、完成状态筛选与全文搜索"]})]}),e.jsxs("div",{className:"card filter-bar",children:[e.jsxs("select",{className:"select",value:d.category??"",onChange:i=>{u("cat",i.target.value),u("sub","")},children:[e.jsx("option",{value:"",children:"全部分类"}),ee.map(i=>e.jsx("option",{value:i.id,children:i.name},i.id))]}),e.jsxs("select",{className:"select",value:d.sub??"",onChange:i=>u("sub",i.target.value),disabled:!d.category,children:[e.jsx("option",{value:"",children:"全部子分类"}),(Oa[d.category??""]??[]).map(i=>e.jsx("option",{value:i,children:i},i))]}),e.jsxs("select",{className:"select",value:d.type??"",onChange:i=>u("type",i.target.value),children:[e.jsx("option",{value:"",children:"全部题型"}),Object.entries(is).map(([i,f])=>e.jsx("option",{value:i,children:f},i))]}),e.jsxs("select",{className:"select",value:d.diff??"",onChange:i=>u("diff",i.target.value),children:[e.jsx("option",{value:"",children:"全部难度"}),Object.entries(rs).map(([i,f])=>e.jsx("option",{value:i,children:f},i))]}),e.jsxs("select",{className:"select",value:d.status??"all",onChange:i=>u("status",i.target.value),children:[e.jsx("option",{value:"all",children:"全部状态"}),e.jsx("option",{value:"undone",children:"未做过"}),e.jsx("option",{value:"correct",children:"已答对"}),e.jsx("option",{value:"wrong",children:"已答错"}),e.jsx("option",{value:"pending",children:"待自评"})]}),e.jsx("input",{className:"input",style:{flex:1,minWidth:160},placeholder:"搜索题干、解析、关键词…",value:d.search??"",onChange:i=>u("q",i.target.value)}),e.jsxs("div",{className:"order-toggle",children:[e.jsxs("button",{type:"button",className:`btn btn-sm ${o==="seq"?"btn-primary":""}`,onClick:()=>h("seq"),title:"顺序刷题",children:[e.jsx(Mt,{size:14}),"顺序"]}),e.jsxs("button",{type:"button",className:`btn btn-sm ${o==="random"?"btn-primary":""}`,onClick:()=>h("random"),title:"随机刷题",children:[e.jsx(ss,{size:14}),"随机"]})]}),e.jsxs("button",{className:"btn btn-primary",disabled:a.length===0,onClick:()=>m(),children:["开始刷题（",a.length,"）"]}),c&&e.jsx("button",{className:"btn btn-sm",onClick:()=>t("/bank"),children:"清空筛选"})]}),a.length===0?e.jsx("div",{className:"card",children:e.jsx(ue,{icon:e.jsx(Ft,{size:40,strokeWidth:1.5}),title:"没有符合条件的题目",desc:"调整筛选条件或清空筛选试试"})}):e.jsxs("div",{className:"card",style:{overflow:"hidden"},children:[a.slice(0,l).map(i=>{const f=n[i.id];return e.jsxs("div",{className:"q-row",onClick:()=>m(i.id),title:"点击开始刷题（从该题起）",children:[e.jsxs("div",{className:"q-row-meta",children:[e.jsx(ge,{type:i.type}),e.jsx(be,{difficulty:i.difficulty}),e.jsx(xe,{category:i.category,sub:i.subCategory}),r[i.id]&&e.jsxs("span",{className:"tag",style:{background:"var(--warning-soft)",color:"var(--warning)"},children:[e.jsx(ne,{size:11,fill:"currentColor"}),"已收藏"]}),e.jsxs("div",{className:"q-row-status",children:[e.jsx(Ie,{grading:(f==null?void 0:f.grading)??"none"}),f&&f.attempts>1&&e.jsxs("span",{children:["· 做过 ",f.attempts," 次"]})]})]}),e.jsx("div",{className:"q-row-title",children:i.question.replace(/[#*`>]/g,"")})]},i.id)}),a.length>l&&e.jsx("div",{style:{padding:16,textAlign:"center"},children:e.jsxs("button",{className:"btn btn-sm",onClick:()=>y(i=>i+50),children:["加载更多（还有 ",a.length-l," 道）"]})})]}),e.jsxs("p",{style:{fontSize:12.5,color:"var(--text-3)",marginTop:14,textAlign:"center"},children:["点击任意题目即可从该题开始刷题 · 数据保存在浏览器本地，刷新不丢失 ·"," ",e.jsx(E,{to:"/",children:"返回首页"})]})]})}function we(s){var n;if(s==null||typeof s=="boolean")return"";if(typeof s=="string"||typeof s=="number")return String(s);if(Array.isArray(s))return s.map(we).join("");const t=s;return((n=t.props)==null?void 0:n.children)!==void 0?we(t.props.children):""}function Ba({code:s,lang:t}){const[n,r]=p.useState(!1),d=p.useCallback(()=>{var h;const o=()=>{r(!0),window.setTimeout(()=>r(!1),1500)};if((h=navigator.clipboard)!=null&&h.writeText)navigator.clipboard.writeText(s).then(o,()=>o());else{const l=document.createElement("textarea");l.value=s,document.body.appendChild(l),l.select(),document.execCommand("copy"),document.body.removeChild(l),o()}},[s]);return e.jsxs("div",{className:"code-block-head",children:[e.jsx("span",{className:"code-lang",children:t||"text"}),e.jsx("button",{type:"button",className:"copy-btn",onClick:d,children:n?"✓ 已复制":"复制"})]})}function Ha({content:s}){return e.jsx("div",{className:"md",children:e.jsx(ls,{remarkPlugins:[us],rehypePlugins:[[ms,{detect:!0,ignoreMissing:!0}]],components:{pre({children:t}){const n=Array.isArray(t)?t[0]:t,r=n==null?void 0:n.props,d=(r==null?void 0:r.className)??"",o=/language-(\w+)/.exec(d),h=we(r==null?void 0:r.children);return e.jsxs("div",{className:"code-block",children:[e.jsx(Ba,{code:h,lang:(o==null?void 0:o[1])??""}),e.jsx("pre",{children:t})]})}},children:s})})}const le=p.memo(Ha);function cs({question:s,mode:t="practice",initialGrading:n=null,initialUserAnswer:r=null,onSubmitted:d,onSelfAssessed:o}){const h=s.type==="single"||s.type==="multiple"||s.type==="judge",l=w(k=>k.favorites),y=w(k=>k.toggleFavorite),a=!!l[s.id],[u,m]=p.useState([]),[c,i]=p.useState(""),[f,S]=p.useState(!1),[T,R]=p.useState(n);p.useEffect(()=>{m([]),i(typeof r=="string"?r:""),R(n),S(!!n)},[s.id]);const X=me[s.category],_=s.type==="multiple",$=p.useMemo(()=>s.options?(Array.isArray(s.answer)?s.answer:[String(s.answer)]).map(j=>s.options.find(D=>D.label===j)).filter(Boolean).map(j=>`${j.label}. ${j.text}`).join("；"):null,[s]);function M(k){f||m(_?j=>j.includes(k)?j.filter(D=>D!==k):[...j,k]:[k])}function J(){let k;if(s.type==="single"||s.type==="multiple"){if(k=_?[...u].sort():u[0]??null,!k||_&&u.length===0)return}else if(s.type==="judge"){if(k=u[0]??null,!k)return}else k=c;const j=pa(s,k);R(j),S(!0),d(k,j)}function V(k){const j=s.type==="code"||s.type==="essay"?c:null;R(k?"correct":"wrong"),o(j,k)}function q(){m([]),i(""),R(null),S(!1)}const Q=r==null?"":de(r).replace(/,/g,"、");return e.jsxs("div",{className:"card question-body",children:[e.jsxs("div",{className:"question-meta",children:[e.jsx(ge,{type:s.type}),e.jsx(be,{difficulty:s.difficulty}),e.jsxs("span",{className:"tag tag-cat",children:[e.jsx(Oe,{category:s.category,size:12}),X==null?void 0:X.name,s.subCategory?` · ${s.subCategory}`:""]}),e.jsx("button",{type:"button",className:`fav-btn ${a?"active":""}`,title:a?"取消收藏":"收藏本题",onClick:()=>y(s.id),children:e.jsx(ne,{size:17,fill:a?"currentColor":"none"})})]}),e.jsx("div",{className:"question-title",children:e.jsx(le,{content:s.question})}),s.options&&e.jsx("div",{className:"options",children:s.options.map(k=>{const j=u.includes(k.label),D=Array.isArray(s.answer)?s.answer.includes(k.label):s.answer===k.label;let b="option";return f?(b+=" disabled",D?b+=" correct-reveal":j&&(b+=" wrong-reveal")):j&&(b+=" selected"),e.jsxs("div",{className:b,onClick:()=>M(k.label),children:[e.jsx("span",{className:"option-label",children:k.label}),e.jsx("span",{children:k.text})]},k.label)})}),s.type==="judge"&&e.jsx("div",{className:"judge-row",children:["true","false"].map(k=>{const j=u[0]===k,D=String(s.answer)===k;let b="judge-btn";return f?D?b+=" reveal-correct":j&&(b+=" reveal-wrong"):j&&(b+=" selected"),e.jsx("button",{type:"button",className:b,disabled:f,onClick:()=>m([k]),children:k==="true"?"✓ 正确":"✗ 错误"},k)})}),(s.type==="essay"||s.type==="code")&&e.jsxs("div",{style:{marginTop:20},children:[e.jsx("textarea",{className:`textarea ${s.type==="code"?"code-editor":""}`,placeholder:s.type==="essay"?"按面试口述的方式写下你的回答：结论 → 展开要点 → 举例/结合项目……":"在这里写下你的代码实现……",value:c,disabled:f,onChange:k=>i(k.target.value)}),e.jsx("div",{className:"answer-actions",children:!f&&e.jsxs(e.Fragment,{children:[e.jsx("button",{type:"button",className:"btn btn-primary",onClick:J,children:"提交并对照参考答案"}),e.jsx("button",{type:"button",className:"btn",onClick:()=>{R("pending"),S(!0),d(c,"pending")},children:"直接查看参考答案"})]})})]}),h&&!f&&e.jsxs("div",{className:"answer-actions",children:[e.jsx("button",{type:"button",className:"btn btn-primary",disabled:u.length===0,onClick:J,children:"提交答案"}),_&&e.jsx("span",{style:{fontSize:12,color:"var(--text-3)"},children:"可多选，需全部选对方算正确"})]}),f&&T&&e.jsxs("div",{className:"analysis-panel",children:[e.jsxs("div",{className:"answer-actions",style:{marginTop:0,marginBottom:14},children:[T==="correct"&&e.jsxs("span",{className:"verdict verdict-correct",children:[e.jsx(ie,{size:15}),"回答正确"]}),T==="wrong"&&e.jsxs("span",{className:"verdict verdict-wrong",children:[e.jsx(ae,{size:15}),"回答错误"]}),T==="pending"&&e.jsxs("span",{className:"verdict verdict-pending",children:[e.jsx(Te,{size:15}),"已提交 · 请对照参考答案自评"]}),t==="practice"&&e.jsxs("button",{type:"button",className:"btn btn-sm btn-ghost",onClick:q,children:[e.jsx(re,{size:13}),"重新答题"]})]}),T==="pending"&&e.jsxs("div",{className:"answer-actions",style:{marginBottom:14},children:[e.jsx("span",{style:{fontSize:13,color:"var(--text-2)"},children:"自评结果："}),e.jsxs("button",{type:"button",className:"btn btn-sm",onClick:()=>V(!0),children:[e.jsx(Yt,{size:13}),"我答出来了"]}),e.jsxs("button",{type:"button",className:"btn btn-sm btn-danger",onClick:()=>V(!1),children:[e.jsx(Kt,{size:13}),"没答好，需要复习"]})]}),s.type==="judge"&&e.jsxs("div",{style:{fontSize:13,marginBottom:10},children:[e.jsx("strong",{children:"正确答案："}),s.answer?"正确 ✓":"错误 ✗",Q&&e.jsxs("span",{style:{color:"var(--text-3)"},children:["（你的选择：",Q==="true"?"正确":"错误","）"]})]}),$&&e.jsxs("div",{style:{fontSize:13,marginBottom:10},children:[e.jsx("strong",{children:"正确答案："}),e.jsx("span",{style:{color:"var(--success)"},children:$}),Q&&!_&&e.jsxs("span",{style:{color:"var(--text-3)"},children:["（你的选择：",Q,"）"]})]}),s.answer&&(s.type==="essay"||s.type==="code")&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"analysis-title",children:[e.jsx(Xe,{size:14}),"参考答案"]}),e.jsx(le,{content:String(s.answer)})]}),s.analysis&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"analysis-title",style:{marginTop:16},children:[e.jsx(Ze,{size:14}),"解析"]}),e.jsx(le,{content:s.analysis})]}),s.keyPoints&&s.keyPoints.length>0&&e.jsx("div",{className:"keywords",children:s.keyPoints.map(k=>e.jsx("span",{className:"keyword-chip",children:k},k))}),s.source&&e.jsxs("div",{className:"source-line",children:[e.jsx(at,{size:12}),"来源：docs/",s.source]})]})]})}function Va(){var q,Q,k,j,D;const s=Qe(),t=oe(),[n]=Ge(),r=w(b=>b.submitAnswer),d=w(b=>b.selfAssess),o=(q=s.state)==null?void 0:q.ids,h=(Q=s.state)==null?void 0:Q.title,l=p.useMemo(()=>ds(n),[n]),y=p.useMemo(()=>{if(o)return o.map(v=>z[v]).filter(Boolean);let b=os(l);return l.order==="random"&&(b=he(b)),b},[o,l]),a=h??(l.category?`${((k=me[l.category])==null?void 0:k.name)??""}${l.sub?` · ${l.sub}`:""}`:"全部题目"),u=p.useMemo(()=>{if(y.length===0)return{index:0,session:{}};const b=l.start?y.findIndex(O=>O.id===l.start):-1,v=Z(B.paper,null);return v&&v.ids.length===y.length&&v.ids.every((O,N)=>O===y[N].id)?{index:b>=0?b:v.index,session:v.session}:{index:b>=0?b:0,session:{}}},[y,l.start]),[m,c]=p.useState(u.index),[i,f]=p.useState(u.session),[S,T]=p.useState(!1),R=y[m];p.useLayoutEffect(()=>{c(u.index),f(u.session),T(!1)},[u]),p.useEffect(()=>{K(B.paper,{ids:y.map(b=>b.id),index:m,session:i})},[y,m,i]);const X=p.useCallback((b,v,O)=>{r(b,v,O),f(N=>({...N,[b]:{answer:v,grading:O}}))},[r]),_=p.useCallback((b,v,O)=>{d(b,v,O),f(N=>({...N,[b]:{answer:v,grading:O?"correct":"wrong"}}))},[d]),$=y.filter(b=>i[b.id]).length,M=p.useCallback(b=>{const v=y[b];if(!v)return;if(o){c(b);return}const O=new URLSearchParams(n);O.set("start",v.id),t({pathname:"/practice",search:`?${O.toString()}`},{replace:!0}),c(b)},[t,y,n,o]),J=()=>M(Math.max(0,m-1)),V=()=>{m<y.length-1&&M(m+1)};if(Ua(!S,J,V),y.length===0)return e.jsx("main",{className:"page page-narrow",children:e.jsx("div",{className:"card",children:e.jsx(ue,{icon:e.jsx(dt,{size:40,strokeWidth:1.5}),title:"没有可刷的题目",desc:"当前筛选条件下没有题目，或传入的题目 id 无效",action:e.jsx(E,{to:"/bank",className:"btn btn-primary",children:"去题库选题"})})})});if(S){const b=y.map(N=>{var W;return(W=i[N.id])==null?void 0:W.grading}).filter(Boolean),v=b.filter(N=>N==="correct").length,O=b.filter(N=>N==="wrong").length;return e.jsx("main",{className:"page page-narrow",children:e.jsxs("div",{className:"card",style:{padding:36,textAlign:"center"},children:[e.jsx("div",{className:"finish-icon",children:e.jsx(Re,{size:44,strokeWidth:1.5})}),e.jsx("h2",{style:{margin:"0 0 6px"},children:"本次练习完成"}),e.jsxs("p",{style:{color:"var(--text-2)",fontSize:13.5,marginTop:0},children:[a," · 共 ",y.length," 题，完成 ",b.length," 题"]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",gap:32,margin:"22px 0 28px"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:30,fontWeight:800,color:"var(--success)"},children:v}),e.jsx("div",{style:{fontSize:12.5,color:"var(--text-3)"},children:"答对"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:30,fontWeight:800,color:"var(--danger)"},children:O}),e.jsx("div",{style:{fontSize:12.5,color:"var(--text-3)"},children:"答错"})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:30,fontWeight:800},children:[H(v,b.length),"%"]}),e.jsx("div",{style:{fontSize:12.5,color:"var(--text-3)"},children:"正确率"})]})]}),e.jsxs("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{className:"btn btn-primary",onClick:()=>T(!1),children:"继续回顾本题"}),e.jsxs("button",{className:"btn",onClick:()=>{f({}),c(0),T(!1);const N=new URLSearchParams(n),W=y[0];W&&N.set("start",W.id),t({pathname:"/practice",search:`?${N.toString()}`},{replace:!0})},children:[e.jsx(re,{size:14}),"再刷一轮"]}),e.jsx(E,{className:"btn",to:"/wrong",children:"查看错题本"}),e.jsx(E,{className:"btn",to:"/stats",children:"查看统计"})]})]})})}return e.jsx("main",{className:"page",style:{maxWidth:1160},children:e.jsxs("div",{className:"practice-layout",children:[e.jsxs("div",{className:"practice-main",children:[e.jsxs("div",{className:"card practice-head",children:[e.jsxs("div",{children:[e.jsx("div",{className:"practice-head-title",children:a}),e.jsxs("div",{className:"practice-sub",children:[l.order==="random"&&!o&&e.jsx(ss,{size:11}),l.order==="random"&&!o?"随机顺序":"顺序练习"," · ",e.jsx(E,{to:"/bank",style:{color:"inherit"},children:"退出练习"})]})]}),e.jsx("div",{className:"practice-progress",children:e.jsx(Le,{value:$,max:y.length})}),e.jsxs("div",{className:"practice-count",children:[m+1," / ",y.length," · 已答 ",$]}),e.jsxs("button",{className:"btn btn-sm",onClick:()=>T(!0),children:[e.jsx(Me,{size:13}),"结束练习"]})]}),R&&e.jsx(cs,{question:R,initialGrading:((j=i[R.id])==null?void 0:j.grading)??null,initialUserAnswer:((D=i[R.id])==null?void 0:D.answer)??null,onSubmitted:(b,v)=>X(R.id,b,v),onSelfAssessed:(b,v)=>_(R.id,b,v)},`${R.id}-${m}`),e.jsxs("div",{className:"card practice-footer",children:[e.jsxs("button",{className:"btn",onClick:J,disabled:m===0,children:[e.jsx(Ws,{size:15}),"上一题"]}),e.jsxs("span",{className:"hotkey-hint",children:[e.jsx(ht,{size:12}),R==null?void 0:R.id," · ←/→ 切题"]}),e.jsxs("button",{className:"btn btn-primary",onClick:V,disabled:m>=y.length-1,children:["下一题",e.jsx(_s,{size:15})]})]})]}),e.jsxs("aside",{className:"card side-panel",children:[e.jsx("div",{className:"side-panel-head",children:"题目导航"}),e.jsx("div",{className:"side-panel-body",children:y.map((b,v)=>{var W;const O=(W=i[b.id])==null?void 0:W.grading;let N="cell";return v===m?N+=" current":O==="correct"?N+=" answered-correct":O==="wrong"?N+=" answered-wrong":O==="pending"&&(N+=" answered-pending"),e.jsx("button",{className:N,onClick:()=>M(v),title:b.id,children:v+1},b.id)})}),e.jsxs("div",{className:"side-legend",children:[e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"legend-swatch",style:{background:"var(--success-soft)",border:"1px solid rgba(22,163,74,.4)"}}),"答对"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"legend-swatch",style:{background:"var(--danger-soft)",border:"1px solid rgba(229,72,77,.4)"}}),"答错"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"legend-swatch",style:{background:"var(--purple-soft)",border:"1px solid rgba(124,92,240,.4)"}}),"待自评"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"legend-swatch",style:{background:"var(--primary)"}}),"当前"]})]})]})]})})}function Ua(s,t,n){p.useEffect(()=>{if(!s)return;const r=d=>{const o=d.target;o.tagName==="TEXTAREA"||o.tagName==="INPUT"||(d.key==="ArrowLeft"&&t(),d.key==="ArrowRight"&&n())};return window.addEventListener("keydown",r),()=>window.removeEventListener("keydown",r)},[s,t,n])}function Fa(){const s=oe(),t=w(c=>c.records),n=w(c=>c.dismissedWrong),r=w(c=>c.dismissWrong),d=w(c=>c.restoreWrong),[o,h]=p.useState(""),[l,y]=p.useState(null),a=p.useMemo(()=>Object.values(t).filter(c=>c.grading==="wrong"&&!n.includes(c.questionId)).map(c=>({record:c,question:z[c.questionId]})).filter(c=>c.question&&(o===""||c.question.category===o)).sort((c,i)=>i.record.answeredAt-c.record.answeredAt),[t,n,o]),u=p.useMemo(()=>{const c={};for(const i of Object.values(t)){if(i.grading!=="wrong"||n.includes(i.questionId))continue;const f=z[i.questionId];f&&(c[f.category]=(c[f.category]??0)+1)}return c},[t,n]);function m(){s("/practice",{state:{ids:a.map(c=>c.question.id),title:"错题重做"}})}return e.jsxs("main",{className:"page page-narrow",children:[e.jsxs("div",{className:"page-header",children:[e.jsxs("h1",{className:"page-title",children:[e.jsx(Ye,{size:20}),"错题本"]}),e.jsxs("p",{className:"page-desc",children:["共 ",a.length," 道错题 · 答错自动收录，重做答对后自动移出"]})]}),e.jsxs("div",{className:"card filter-bar",children:[e.jsxs("select",{className:"select",value:o,onChange:c=>h(c.target.value),children:[e.jsx("option",{value:"",children:"全部分类"}),ee.filter(c=>u[c.id]).map(c=>e.jsxs("option",{value:c.id,children:[c.name,"（",u[c.id],"）"]},c.id))]}),e.jsxs("button",{className:"btn btn-primary",disabled:a.length===0,onClick:m,children:[e.jsx(re,{size:14}),"开始重做（",a.length,"）"]})]}),a.length===0?e.jsx("div",{className:"card",children:e.jsx(ue,{icon:e.jsx(Re,{size:40,strokeWidth:1.5}),title:"错题本是空的",desc:"当前没有待复习的错题，继续保持！"})}):a.map(({record:c,question:i})=>{const f=l===i.id;return e.jsx("div",{className:"card",style:{marginBottom:12},children:e.jsxs("div",{className:"q-row",style:{cursor:"default"},children:[e.jsxs("div",{className:"q-row-meta",children:[e.jsx(ge,{type:i.type}),e.jsx(be,{difficulty:i.difficulty}),e.jsx(xe,{category:i.category,sub:i.subCategory}),e.jsxs("div",{className:"q-row-status",children:["最后答错 ",ts(c.answeredAt)]})]}),e.jsx("div",{className:"q-row-title",style:{WebkitLineClamp:f?void 0:2},children:i.question.replace(/[#*`>]/g,"")}),e.jsxs("div",{style:{fontSize:12.5,color:"var(--danger)",marginBottom:8},children:["你的答案：",c.userAnswer==null||c.userAnswer===""?"（未作答 / 直接查看答案）":String(Array.isArray(c.userAnswer)?c.userAnswer.join("、"):i.type==="judge"?c.userAnswer==="true"?"正确":"错误":c.userAnswer.length>60?`${c.userAnswer.slice(0,60)}…`:c.userAnswer)]}),e.jsxs("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[e.jsxs("button",{className:"btn btn-sm btn-primary",onClick:()=>s("/practice",{state:{ids:[i.id],title:"错题重做"}}),children:[e.jsx(re,{size:13}),"重做本题"]}),e.jsxs("button",{className:"btn btn-sm",onClick:()=>y(f?null:i.id),children:[e.jsx(st,{size:13}),f?"收起解析":"查看解析"]}),e.jsxs("button",{className:"btn btn-sm btn-danger",onClick:()=>r(i.id),children:[e.jsx(sa,{size:13}),"移出错题本"]})]}),f&&e.jsxs("div",{style:{marginTop:14,borderTop:"1px dashed var(--border-strong)",paddingTop:12},children:[e.jsxs("p",{className:"analysis-title",style:{color:"var(--success)"},children:[e.jsx(ie,{size:14}),"正确答案 / 参考答案"]}),i.type==="judge"?e.jsx("div",{style:{fontSize:13},children:i.answer?"正确 ✓":"错误 ✗"}):i.type==="single"||i.type==="multiple"?e.jsx("div",{style:{fontSize:13,color:"var(--success)",fontWeight:600},children:Array.isArray(i.answer)?i.answer.join("、"):String(i.answer)}):e.jsx(le,{content:String(i.answer)}),i.analysis&&e.jsxs(e.Fragment,{children:[e.jsxs("p",{className:"analysis-title",style:{marginTop:14},children:[e.jsx(Ze,{size:14}),"解析"]}),e.jsx(le,{content:i.analysis})]}),i.keyPoints&&i.keyPoints.length>0&&e.jsx("div",{className:"keywords",children:i.keyPoints.map(S=>e.jsx("span",{className:"keyword-chip",children:S},S))})]})]})},i.id)}),n.length>0&&e.jsxs("p",{style:{fontSize:12.5,color:"var(--text-3)",textAlign:"center",marginTop:18},children:["已移出 ",n.length," 道错题",e.jsx("button",{className:"btn btn-sm btn-ghost",style:{marginLeft:8},onClick:()=>n.forEach(d),children:"全部恢复"})]})]})}function Wa(){const s=oe(),t=w(o=>o.favorites),n=w(o=>o.records),r=w(o=>o.toggleFavorite),d=p.useMemo(()=>Object.entries(t).sort(([,o],[,h])=>h-o).map(([o,h])=>({question:z[o],time:h,record:n[o]})).filter(o=>o.question),[t,n]);return e.jsxs("main",{className:"page page-narrow",children:[e.jsxs("div",{className:"page-header",children:[e.jsxs("h1",{className:"page-title",children:[e.jsx(ne,{size:20}),"我的收藏"]}),e.jsxs("p",{className:"page-desc",children:["共 ",d.length," 道收藏题 · 点击星标可取消收藏"]})]}),d.length===0?e.jsx("div",{className:"card",children:e.jsx(ue,{icon:e.jsx(ne,{size:40,strokeWidth:1.5}),title:"还没有收藏题目",desc:"刷题时点击题目右上角的星标图标即可收藏重点题",action:e.jsx("button",{className:"btn btn-primary",onClick:()=>s("/bank"),children:"去题库刷题"})})}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"card filter-bar",children:e.jsxs("button",{className:"btn btn-primary",onClick:()=>s("/practice",{state:{ids:d.map(o=>o.question.id),title:"我的收藏练习"}}),children:[e.jsx(ce,{size:14}),"开始刷收藏题（",d.length,"）"]})}),e.jsx("div",{className:"card",style:{overflow:"hidden"},children:d.map(({question:o,time:h,record:l})=>e.jsxs("div",{className:"q-row",onClick:()=>s("/practice",{state:{ids:[o.id],title:"收藏题练习"}}),children:[e.jsxs("div",{className:"q-row-meta",children:[e.jsx(ge,{type:o.type}),e.jsx(be,{difficulty:o.difficulty}),e.jsx(xe,{category:o.category,sub:o.subCategory}),e.jsx("div",{className:"q-row-status",children:e.jsx(Ie,{grading:(l==null?void 0:l.grading)??"none"})})]}),e.jsxs("div",{className:"q-row-title",style:{display:"flex",gap:8,alignItems:"flex-start"},children:[e.jsx("button",{className:"fav-btn active",style:{margin:0},title:"取消收藏",onClick:y=>{y.stopPropagation(),r(o.id)},children:e.jsx(ne,{size:15,fill:"currentColor"})}),e.jsx("span",{children:o.question.replace(/[#*`>]/g,"")})]}),e.jsxs("div",{style:{fontSize:11.5,color:"var(--text-3)"},children:["收藏于 ",new Date(h).toLocaleString()]})]},o.id))})]})]})}function za(){const s=w(a=>a.records),t=w(a=>a.favorites),n=w(a=>a.history),r=p.useMemo(()=>{const a=Object.values(s),u=a.filter(f=>f.grading!=="pending"),m=u.filter(f=>f.grading==="correct").length,c=u.filter(f=>f.grading==="wrong").length,i=a.filter(f=>f.grading==="pending").length;return{total:F.length,done:a.length,correct:m,wrong:c,pending:i,accuracy:H(m,u.length)}},[s]),d=p.useMemo(()=>ee.map(a=>{const u=as[a.id]??[];let m=0,c=0,i=0,f=0;for(const S of u){const T=s[S.id];T&&(m++,T.grading!=="pending"&&(i++,T.grading==="correct"?c++:f++))}return{cat:a,total:u.length,done:m,accuracy:H(c,i),wrong:f}}).filter(a=>a.done>0).sort((a,u)=>u.done-a.done),[s]),o=p.useMemo(()=>{const a=[];for(let u=6;u>=0;u--){const m=new Date;m.setHours(0,0,0,0),m.setDate(m.getDate()-u);const c=m.getTime(),i=c+24*3600*1e3,f=n.filter(S=>S.time>=c&&S.time<i);a.push({label:ya(c),total:f.length,correct:f.filter(S=>S.grading==="correct").length})}return a},[n]),h=Math.max(1,...o.map(a=>a.total)),l=p.useMemo(()=>{var u;const a={};for(const m of Object.values(s)){const c=z[m.questionId];c&&(a[u=c.type]??(a[u]={done:0,correct:0,graded:0}),a[c.type].done++,m.grading!=="pending"&&(a[c.type].graded++,m.grading==="correct"&&a[c.type].correct++))}return a},[s]),y=p.useMemo(()=>d.filter(a=>a.accuracy<60&&a.done>=2).slice(0,4),[d]);return Object.keys(s).length===0?e.jsx("main",{className:"page page-narrow",children:e.jsx("div",{className:"card",children:e.jsx(ue,{icon:e.jsx(Ce,{size:40,strokeWidth:1.5}),title:"还没有学习数据",desc:"做完几道题后，这里会展示正确率、分类掌握度与最近趋势",action:e.jsx(E,{to:"/bank",className:"btn btn-primary",children:"去题库刷题"})})})}):e.jsxs("main",{className:"page",children:[e.jsxs("div",{className:"page-header",children:[e.jsxs("h1",{className:"page-title",children:[e.jsx(Ce,{size:20}),"学习统计"]}),e.jsx("p",{className:"page-desc",children:"数据基于本地作答记录实时计算 · 刷新不丢失"})]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",children:r.total}),e.jsx("div",{className:"stat-label",children:"题库总题数"})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",children:r.done}),e.jsxs("div",{className:"stat-label",children:["已做题数（",H(r.done,r.total),"%）"]})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",style:{color:"var(--success)"},children:r.correct}),e.jsx("div",{className:"stat-label",children:"答对"})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",style:{color:"var(--danger)"},children:r.wrong}),e.jsx("div",{className:"stat-label",children:"答错"})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsxs("div",{className:"stat-value",children:[r.accuracy,"%"]}),e.jsx("div",{className:"stat-label",children:"总正确率"})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",style:{color:"var(--purple)"},children:r.pending}),e.jsx("div",{className:"stat-label",children:"待自评解答题"})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",children:Object.keys(t).length}),e.jsx("div",{className:"stat-label",children:"收藏题数"})]}),e.jsxs("div",{className:"card stat-card",children:[e.jsx("div",{className:"stat-value",children:r.wrong}),e.jsx("div",{className:"stat-label",children:e.jsx(E,{to:"/wrong",style:{color:"inherit"},children:"错题数量 →"})})]})]}),y.length>0&&e.jsxs("div",{className:"card",style:{padding:"16px 20px",marginBottom:18,background:"var(--warning-soft)",border:"1px solid rgba(217,119,6,.25)"},children:[e.jsxs("strong",{style:{fontSize:13.5,display:"inline-flex",alignItems:"center",gap:5},children:[e.jsx(Ne,{size:15}),"建议复习："]}),e.jsxs("span",{style:{fontSize:13,color:"var(--text-2)"},children:[y.map(a=>`${a.cat.name}（正确率 ${a.accuracy}%）`).join("、")," ","—— 建议重做这些分类的错题并回看解析。"]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(340px, 1fr))",gap:16,marginBottom:18},children:[e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(aa,{size:16}),"各分类掌握度（正确率）"]}),d.length===0&&e.jsx("p",{style:{color:"var(--text-3)"},children:"暂无数据"}),d.map(a=>e.jsxs("div",{className:"bar-row",children:[e.jsxs("div",{className:"bar-name",children:[e.jsx(Oe,{category:a.cat.id,size:13}),e.jsx("span",{children:a.cat.name})]}),e.jsx("div",{className:"bar-track",children:e.jsx("div",{className:"bar-fill",style:{width:`${Math.max(2,a.accuracy)}%`,background:a.accuracy>=80?"linear-gradient(90deg,#22c55e,#4ade80)":a.accuracy>=60?"linear-gradient(90deg,var(--primary),var(--purple))":"linear-gradient(90deg,#f97316,#facc15)"}})}),e.jsxs("div",{className:"bar-value",children:[a.accuracy,"% · ",a.done,"/",a.total]})]},a.cat.id))]}),e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(rt,{size:16}),"最近 7 天做题量"]}),e.jsx("div",{className:"week-chart",children:o.map(a=>e.jsxs("div",{className:"week-col",title:`${a.label}：${a.total} 题，答对 ${a.correct}`,children:[e.jsx("div",{className:"week-bar",style:{height:`${Math.max(4,a.total/h*100)}%`},children:a.correct>0&&e.jsx("div",{className:"correct-part",style:{height:`${a.correct/Math.max(1,a.total)*100}%`,marginTop:`${100-a.correct/Math.max(1,a.total)*100}%`}})}),e.jsx("div",{className:"week-label",children:a.label})]},a.label))}),e.jsxs("div",{style:{display:"flex",gap:16,fontSize:11.5,color:"var(--text-3)",marginTop:10},children:[e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"legend-swatch",style:{background:"#34d399"}})," 答对"]}),e.jsxs("span",{className:"legend-item",children:[e.jsx("span",{className:"legend-swatch",style:{background:"var(--primary)"}})," 答错/待自评"]})]}),e.jsxs("h2",{className:"section-title",style:{marginTop:20},children:[e.jsx(Vs,{size:16}),"各题型完成情况"]}),Object.entries(l).map(([a,u])=>e.jsxs("div",{className:"bar-row",style:{gridTemplateColumns:"64px minmax(0,1fr) 90px"},children:[e.jsx("div",{className:"bar-name",children:a}),e.jsx("div",{className:"bar-track",children:e.jsx("div",{className:"bar-fill",style:{width:`${Math.max(2,H(u.correct,u.graded))}%`}})}),e.jsxs("div",{className:"bar-value",children:[H(u.correct,u.graded),"% · ",u.done," 题"]})]},a))]})]}),e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(Pe,{size:16}),"最近做题记录"]}),n.slice(0,12).map((a,u)=>{const m=z[a.questionId];return e.jsxs("div",{className:"recent-item",children:[a.grading==="correct"?e.jsx(ie,{size:14,className:"dot-icon dot-correct"}):a.grading==="wrong"?e.jsx(ae,{size:14,className:"dot-icon dot-wrong"}):e.jsx(ie,{size:14,className:"dot-icon dot-pending"}),e.jsx("span",{style:{flex:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:m?m.question.replace(/[#*`>|]/g,"").replace(/[[\]]/g,"").slice(0,60):a.questionId}),e.jsx("span",{style:{color:"var(--text-3)",fontSize:11.5,flexShrink:0},children:new Date(a.time).toLocaleString()})]},`${a.questionId}-${a.time}-${u}`)})]})]})}const fe="fequiz.interview-session.v1",je=120;function _a(s,t,n){const r=n?F.filter(c=>c.category===n):F,d=c=>r.filter(i=>c.includes(i.type)),o=d(["essay","code"]),h=d(["single"]),l=d(["judge"]),y=d(["multiple"]),a=[...h,...y,...l],u=[],m=(c,i)=>{u.push(...he(c).slice(0,i))};if(t==="objective")m(a,Math.min(s,a.length));else if(t==="choice"){const c=Math.ceil(s/2);m(h,Math.min(c,h.length)),m(y,Math.min(s-Math.min(c,h.length),y.length))}else if(t==="essay")m(o,Math.min(s,o.length));else{const c=Math.min(Math.ceil(s/2),o.length);m(o,c);const i=s-u.length,f=Math.min(Math.ceil(i*.6),h.length);m(h,f);const S=Math.min(Math.ceil(i*.25),l.length);m(l,S),m(y,Math.max(0,i-f-S))}if(u.length<s){const c=new Set(u.map(i=>i.id));m(r.filter(i=>!c.has(i.id)),s-u.length)}return he(u).slice(0,s).map(c=>c.id)}function $a(){var Ae;const s=oe(),t=w(x=>x.saveInterviewReport),n=w(x=>x.interviewReports),[r,d]=p.useState("config"),[o,h]=p.useState(10),[l,y]=p.useState("mixed"),[a,u]=p.useState(""),[m,c]=p.useState([]),[i,f]=p.useState(0),[S,T]=p.useState({}),[R,X]=p.useState(0),[_,$]=p.useState(0),[M,J]=p.useState(null),V=p.useMemo(()=>m.map(x=>z[x]).filter(Boolean),[m]),q=V[i],Q=m.length*je,k=Math.max(0,Q-_),j=p.useRef(null);p.useEffect(()=>{if(r==="running")return j.current=window.setInterval(()=>{$(x=>x+1)},1e3),()=>{j.current&&window.clearInterval(j.current)}},[r]),p.useEffect(()=>{r==="running"?K(fe,{ids:m,index:i,session:S,startedAt:R}):r==="config"&&K(fe,null)},[r,m,i,S,R]);const[D,b]=p.useState(null);p.useEffect(()=>{var P;const x=Z(fe,null);x&&((P=x.ids)!=null&&P.length)&&b(x)},[]);const v=p.useCallback(()=>{const x=_a(o,l,a);x.length!==0&&(c(x),f(0),T({}),X(Date.now()),$(0),J(null),d("running"))},[o,l,a]),O=p.useCallback(()=>{D&&(c(D.ids),f(D.index),T(D.session),X(D.startedAt),$(Math.floor((Date.now()-D.startedAt)/1e3)),J(null),b(null),d("running"))},[D]),N=p.useCallback(()=>{const x=m.map(A=>{var se;return((se=S[A])==null?void 0:se.grading)??null}),P=x.filter(A=>A==="correct").length,U=x.filter(A=>A==="wrong").length,C=x.filter(A=>A===null||A==="pending").length,L=Math.round(P/Math.max(1,P+U)*100),I={id:`iv-${Date.now()}`,time:Date.now(),questionIds:m,gradings:x,score:L,correctCount:P,wrongCount:U,pendingCount:C,durationSec:Math.floor((Date.now()-R)/1e3)};t(I),J(I),d("report")},[m,S,R,t]),W=p.useCallback((x,P,U)=>{T(C=>({...C,[x]:{grading:U?"correct":"wrong"}}))},[]);if(r==="config")return e.jsxs("main",{className:"page page-narrow",children:[e.jsxs("div",{className:"page-header",children:[e.jsxs("h1",{className:"page-title",children:[e.jsx(es,{size:20}),"面试模式"]}),e.jsx("p",{className:"page-desc",children:"模拟真实前端面试：随机抽题组卷，客观题自动判分，解答题对照参考答案自评，结束后生成得分与薄弱点报告"})]}),D&&e.jsxs("div",{className:"card",style:{padding:"14px 18px",marginBottom:14,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontSize:13},children:["检测到一场未完成的面试（已答"," ",Object.keys(D.session).length,"/",D.ids.length," 题）"]}),e.jsxs("button",{className:"btn btn-sm btn-primary",onClick:O,children:[e.jsx(Ue,{size:13}),"继续这场面试"]}),e.jsx("button",{className:"btn btn-sm btn-ghost",onClick:()=>{K(fe,null),b(null)},children:"放弃"})]}),e.jsxs("div",{className:"card",style:{padding:24},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(jt,{size:16}),"试卷设置"]}),e.jsxs("div",{style:{display:"grid",gap:14},children:[e.jsxs("label",{style:{display:"grid",gap:6,fontSize:13},children:[e.jsx("strong",{children:"题目数量"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[5,10,15,20].map(x=>e.jsxs("button",{className:`btn btn-sm ${o===x?"btn-primary":""}`,onClick:()=>h(x),children:[x," 题"]},x))})]}),e.jsxs("label",{style:{display:"grid",gap:6,fontSize:13},children:[e.jsx("strong",{children:"题型构成"}),e.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:[["mixed","混合（推荐）"],["objective","客观题为主"],["essay","解答 + 代码"],["choice","单选 + 多选"]].map(([x,P])=>e.jsx("button",{className:`btn btn-sm ${l===x?"btn-primary":""}`,onClick:()=>y(x),children:P},x))})]}),e.jsxs("label",{style:{display:"grid",gap:6,fontSize:13},children:[e.jsx("strong",{children:"知识范围"}),e.jsxs("select",{className:"select",value:a,onChange:x=>u(x.target.value),children:[e.jsx("option",{value:"",children:"全部知识分类"}),Object.entries(me).map(([x,P])=>e.jsx("option",{value:x,children:P.name},x))]})]}),e.jsxs("div",{style:{fontSize:12.5,color:"var(--text-3)",background:"var(--surface-2)",padding:"10px 14px",borderRadius:10},children:[e.jsx(We,{size:14}),"参考用时：每题 ",je/60," 分钟，共 ",m.length||o," 题 ≈"," ",ve((m.length||o)*je),"。超时不会强制交卷，但请尽量模拟真实节奏。"]}),e.jsxs("button",{className:"btn btn-lg btn-primary",onClick:v,children:[e.jsx(Ue,{size:16}),"开始面试"]})]})]}),n.length>0&&e.jsxs("section",{className:"card",style:{padding:"18px 20px",marginTop:16},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(Pe,{size:16}),"历史面试成绩"]}),n.slice(0,8).map(x=>e.jsxs("div",{className:"recent-item",children:[e.jsx("span",{className:`dot ${x.score>=80?"dot-correct":x.score>=60?"dot-pending":"dot-wrong"}`}),e.jsxs("span",{style:{flex:1},children:[new Date(x.time).toLocaleString()," · ",x.questionIds.length," 题 · 用时"," ",ve(x.durationSec)]}),e.jsxs("strong",{children:[x.score," 分"]})]},x.id))]})]});if(r==="report"&&M){const x=(()=>{const C={};return M.questionIds.forEach((L,I)=>{var Ee;const A=z[L];if(!A)return;const se=M.gradings[I];se!=="correct"&&se!=="wrong"||(C[Ee=A.category]??(C[Ee]={done:0,correct:0}),C[A.category].done++,se==="correct"&&C[A.category].correct++)}),Object.entries(C).map(([L,I])=>({cat:me[L],accuracy:H(I.correct,I.done),done:I.done})).sort((L,I)=>L.accuracy-I.accuracy)})(),P=M.questionIds.filter((C,L)=>M.gradings[L]==="wrong"||M.gradings[L]==="pending"),U=x.filter(C=>C.accuracy<60);return e.jsxs("main",{className:"page page-narrow",children:[e.jsx("div",{className:"card",style:{padding:30,marginBottom:16},children:e.jsxs("div",{style:{display:"flex",gap:28,alignItems:"center",flexWrap:"wrap"},children:[e.jsx("div",{className:"score-ring",style:{background:`conic-gradient(${M.score>=80?"#22c55e":M.score>=60?"#4f6ef7":"#e5484d"} ${M.score*3.6}deg, var(--bg-soft) 0deg)`},children:e.jsxs("div",{style:{position:"relative",textAlign:"center",zIndex:1},children:[e.jsx("div",{className:"report-score",style:{fontSize:34},children:M.score}),e.jsx("div",{style:{fontSize:11,color:"var(--text-3)"},children:"综合得分"})]})}),e.jsxs("div",{style:{flex:1,minWidth:220},children:[e.jsxs("h2",{style:{margin:"0 0 8px",display:"flex",alignItems:"center",gap:8},children:[e.jsx(Me,{size:17}),"面试报告"]}),e.jsxs("p",{style:{margin:0,fontSize:13,color:"var(--text-2)"},children:[new Date(M.time).toLocaleString()," · 共 ",M.questionIds.length," 题 · 用时"," ",ve(M.durationSec)]}),e.jsxs("div",{style:{display:"flex",gap:22,marginTop:14,flexWrap:"wrap"},children:[e.jsxs("div",{children:[e.jsx(ie,{size:16,className:"stat-mini-icon",style:{color:"var(--success)"}}),e.jsx("div",{style:{fontSize:22,fontWeight:800,color:"var(--success)"},children:M.correctCount}),e.jsx("div",{style:{fontSize:12,color:"var(--text-3)"},children:"答对"})]}),e.jsxs("div",{children:[e.jsx(ae,{size:16,className:"stat-mini-icon",style:{color:"var(--danger)"}}),e.jsx("div",{style:{fontSize:22,fontWeight:800,color:"var(--danger)"},children:M.wrongCount}),e.jsx("div",{style:{fontSize:12,color:"var(--text-3)"},children:"答错"})]}),e.jsxs("div",{children:[e.jsx(Te,{size:16,className:"stat-mini-icon",style:{color:"var(--purple)"}}),e.jsx("div",{style:{fontSize:22,fontWeight:800,color:"var(--purple)"},children:M.pendingCount}),e.jsx("div",{style:{fontSize:12,color:"var(--text-3)"},children:"未自评"})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:22,fontWeight:800},children:[H(M.correctCount,M.correctCount+M.wrongCount),"%"]}),e.jsx("div",{style:{fontSize:12,color:"var(--text-3)"},children:"正确率"})]})]})]})]})}),U.length>0&&e.jsxs("div",{className:"card",style:{padding:"16px 20px",marginBottom:16,background:"var(--warning-soft)",border:"1px solid rgba(217,119,6,.25)"},children:[e.jsxs("strong",{style:{fontSize:13.5,display:"inline-flex",alignItems:"center",gap:5},children:[e.jsx(Ne,{size:15}),"薄弱知识点："]}),e.jsxs("span",{style:{fontSize:13},children:[U.map(C=>{var L;return`${((L=C.cat)==null?void 0:L.name)??""}（${C.accuracy}%）`}).join("、")," ","- 建议优先复习这些分类。"]})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:16,marginBottom:16},children:[e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(He,{size:16}),"分类正确率"]}),x.map(C=>{var L,I;return e.jsxs("div",{className:"bar-row",children:[e.jsxs("div",{className:"bar-name",children:[C.cat&&e.jsx(Oe,{category:C.cat.id,size:13}),e.jsx("span",{children:(L=C.cat)==null?void 0:L.name})]}),e.jsx("div",{className:"bar-track",children:e.jsx("div",{className:"bar-fill",style:{width:`${Math.max(2,C.accuracy)}%`}})}),e.jsxs("div",{className:"bar-value",children:[C.accuracy,"%"]})]},(I=C.cat)==null?void 0:I.id)})]}),e.jsxs("section",{className:"card",style:{padding:"18px 20px"},children:[e.jsxs("h2",{className:"section-title",children:[e.jsx(Ne,{size:16}),"建议复习内容（答错 / 待巩固）"]}),P.length===0?e.jsxs("p",{style:{color:"var(--text-3)",fontSize:13,display:"flex",alignItems:"center",gap:6},children:[e.jsx(Re,{size:15}),"本次面试全部答对，太棒了！"]}):P.map(C=>{const L=z[C];return L?e.jsxs("div",{className:"recent-item",children:[e.jsx(ae,{size:14,className:"dot-icon dot-wrong"}),e.jsx("span",{style:{flex:1,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:L.question.replace(/[#*`>|]/g,"").replace(/[[\]]/g,"").slice(0,40)}),e.jsx(xe,{category:L.category})]},C):null})]})]}),e.jsxs("div",{style:{display:"flex",gap:10,flexWrap:"wrap"},children:[e.jsxs("button",{className:"btn btn-primary",onClick:v,children:[e.jsx(re,{size:14}),"再来一场"]}),P.length>0&&e.jsxs("button",{className:"btn",onClick:()=>s("/practice",{state:{ids:P,title:"面试错题重做"}}),children:["重做本次错题（",P.length,"）"]}),e.jsxs(E,{to:"/wrong",className:"btn",children:[e.jsx(ae,{size:14}),"查看错题本"]}),e.jsxs(E,{to:"/stats",className:"btn",children:[e.jsx(He,{size:14}),"查看统计"]})]})]})}return q?e.jsxs("main",{className:"page page-narrow",children:[e.jsxs("div",{className:"card practice-head",style:{marginBottom:14},children:[e.jsxs("div",{children:[e.jsx("div",{className:"practice-head-title",children:"模拟面试进行中"}),e.jsx("div",{style:{fontSize:11.5,color:"var(--text-3)"},children:"解答题请按真实口述作答，提交后自评 · 客观题自动判分"})]}),e.jsxs("div",{className:`timer-badge ${k===0?"urgent":""}`,children:[k===0?e.jsx(Ns,{size:14}):e.jsx(We,{size:14}),k===0?"已超时":`${String(Math.floor(k/60)).padStart(2,"0")}:${String(k%60).padStart(2,"0")}`]}),e.jsx("div",{className:"practice-progress",children:e.jsx(Le,{value:i+1,max:V.length})}),e.jsxs("div",{className:"practice-count",children:[i+1," / ",V.length]}),e.jsxs("button",{className:"btn btn-sm btn-primary",onClick:N,children:[e.jsx(Me,{size:13}),"交卷"]})]}),e.jsx(cs,{question:q,mode:"interview",initialGrading:((Ae=S[q.id])==null?void 0:Ae.grading)??null,onSubmitted:(x,P)=>{T(P==="pending"?U=>({...U,[q.id]:{grading:"pending"}}):U=>({...U,[q.id]:{grading:P}}))},onSelfAssessed:(x,P)=>W(q.id,x,P)},`${q.id}-${i}`),e.jsxs("div",{className:"card practice-footer",children:[e.jsx("button",{className:"btn",onClick:()=>f(x=>Math.max(0,x-1)),disabled:i===0,children:"← 上一题"}),e.jsxs("span",{style:{fontSize:12,color:"var(--text-3)"},children:["第 ",i+1," 题 · 共 ",V.length," 题"]}),i<V.length-1?e.jsx("button",{className:"btn btn-primary",onClick:()=>f(x=>x+1),children:"下一题"}):e.jsxs("button",{className:"btn btn-primary",onClick:N,children:[e.jsx(Ks,{size:14}),"交卷，生成报告"]})]})]}):null}function Ja(){return e.jsx(fs,{children:e.jsxs(G,{element:e.jsx(Ia,{}),children:[e.jsx(G,{path:"/",element:e.jsx(Je,{})}),e.jsx(G,{path:"/bank",element:e.jsx(qa,{})}),e.jsx(G,{path:"/practice",element:e.jsx(Va,{})}),e.jsx(G,{path:"/wrong",element:e.jsx(Fa,{})}),e.jsx(G,{path:"/favorites",element:e.jsx(Wa,{})}),e.jsx(G,{path:"/stats",element:e.jsx(za,{})}),e.jsx(G,{path:"/interview",element:e.jsx($a,{})}),e.jsx(G,{path:"*",element:e.jsx(Je,{})})]})})}bs.createRoot(document.getElementById("root")).render(e.jsx(p.StrictMode,{children:e.jsxs(hs,{children:["  ",e.jsx(Ja,{})]})}));
