(this.webpackJsonpmarketplaceraca=this.webpackJsonpmarketplaceraca||[]).push([[0],{131:function(e,t,c){},138:function(e,t,c){},157:function(e,t,c){},158:function(e,t,c){},160:function(e,t,c){},161:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),r=c(41),i=c.n(r),s=(c(131),c(3)),l=c.n(s),o=c(7),d=c(30),j=(c(138),function(e){return{type:"handleArrange",payload:e}}),u=c(23),b=c(11),h=c(210),O=c(219),x=c(218),p=c(115),f=c(220),m=c(1),g=["children","value","index"];var v=function(e){var t=e.children,c=e.value,n=e.index,a=Object(p.a)(e,g);return Object(m.jsx)("div",Object(u.a)(Object(u.a)({role:"tabpanel",hidden:c!==n,id:"simple-tabpanel-".concat(n),"aria-labelledby":"simple-tab-".concat(n)},a),{},{children:c===n&&Object(m.jsx)(x.a,{sx:{span:3},children:Object(m.jsx)(f.a,{component:"span",children:t})})}))},w=c(39),S=c.n(w);var k=function(e){var t,c=e.nft,n=c.name,a=void 0===n?"undefined":n,r=c.id,i=void 0===r?"#0000":r,s=c.image_url,l=void 0===s?"":s,o=c.fixed_price,d=void 0===o?"0000":o;return Object(m.jsxs)("div",{className:"nft",children:[Object(m.jsx)("div",{className:"imgBox",children:Object(m.jsx)("img",{className:"image-nft",alt:a,src:l||"/marketplaceraca/nft.png"})}),Object(m.jsxs)("div",{className:"textBox",children:[Object(m.jsxs)("p",{className:"name-nft",children:[a," #",i]}),Object(m.jsx)("div",{className:"separate"}),Object(m.jsxs)("div",{className:"price",children:[Object(m.jsx)("p",{style:{color:"rgba(56, 56, 56, .4)",fontSize:20,fontWeight:700,lineHeight:"32px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",margin:"0"},children:"Price"}),Object(m.jsx)("p",{className:"priceNum",children:(t=d,t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))})]})]})]})},y=function(){var e=Object(n.useState)(""),t=Object(b.a)(e,2),c=t[0],a=t[1],r=Object(n.useState)(0),i=Object(b.a)(r,2),s=i[0],j=i[1],u=function(){var e=Object(o.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a(t.target.value);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=Object(d.c)((function(e){return e.price})).raca;return Object(n.useEffect)((function(){j((function(){return c*h}))}),[c,h]),Object(m.jsxs)("div",{id:"swap-raca",children:[Object(m.jsx)("input",{id:"RACA",type:"number",value:c,onChange:u}),Object(m.jsx)("span",{children:" ~ "}),Object(m.jsxs)("span",{id:"USD",children:[s," USD"]})]})},N=c(222),_=c(223),C=c(221),A=c(224),M=c(225),P=c(226),E=c(227),I=(c(157),function(e,t){return S()("https://market-api.radiocaca.com/nft-sales?pageSize=".concat(t,"&sortBy=fixed_price&order=asc&category=").concat(e,"&tokenId=-1"),{"Access-Control-Allow-Origin":"*"})});function B(e){return null===e||void 0===e?void 0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}var D=function(e){var t=e.hidden,c=Object(n.useState)([]),a=Object(b.a)(c,2),r=a[0],i=a[1],s=Object(n.useState)([]),j=Object(b.a)(s,2),u=j[0],h=j[1],O=Object(n.useState)([]),x=Object(b.a)(O,2),p=x[0],f=x[1],g=Object(n.useState)([]),v=Object(b.a)(g,2),w=v[0],S=v[1],D=Object(n.useState)({}),F=Object(b.a)(D,2),L=F[0],T=F[1],z=Object(n.useState)({}),H=Object(b.a)(z,2),R=H[0],W=H[1],q=Object(n.useState)({}),J=Object(b.a)(q,2),K=J[0],U=J[1],X=Object(n.useState)({}),Q=Object(b.a)(X,2),Y=Q[0],Z=Q[1],G=Object(n.useState)(0),V=Object(b.a)(G,2),$=V[0],ee=V[1],te=Object(n.useState)(""),ce=Object(b.a)(te,2),ne=ce[0],ae=ce[1],re=function(){var e=new Date;ae(e.toLocaleString())},ie=Object(d.c)((function(e){return e.price})),se=ie.raca,le=ie.elmon,oe=function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([I(13,10).then((function(e){return i(e.data.list)})),I(15,10).then((function(e){return S(e.data.list)})),I(16,10).then((function(e){return h(e.data.list)})),I(17,10).then((function(e){return f(e.data.list)})),I(20,1).then((function(e){var t;T(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),I(23,1).then((function(e){var t;U(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),I(7,1).then((function(e){var t;Z(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),I(46,1).then((function(e){var t;W(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")}))]));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){ee(se)}),[se]),Object(n.useEffect)((function(){oe(),re();var e=setInterval((function(){oe(),re()}),2e4);return function(){i([]),h([]),f([]),S([]),T({}),ee(0),clearInterval(e)}}),[]),Object(m.jsxs)("div",{hidden:t,children:[Object(m.jsxs)("div",{children:[Object(m.jsxs)("p",{className:"tokenPrice",children:["RACA Price: ",se]}),Object(m.jsxs)("p",{className:"tokenPrice",children:["ELMON Price: ",le]})]}),Object(m.jsx)(y,{}),Object(m.jsx)("p",{id:"timeUpdated",children:ne}),Object(m.jsxs)("div",{className:"pricetable",children:[Object(m.jsx)(N.a,{id:"table-scroll",component:_.a,children:Object(m.jsxs)(C.a,{id:"tablePrice","aria-label":"simple table",children:[Object(m.jsx)(A.a,{children:Object(m.jsxs)(M.a,{children:[Object(m.jsx)(P.a,{align:"center",children:"#"}),Object(m.jsx)(P.a,{align:"center",children:Object(m.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/metamon.png",alt:"Metamon"})}),Object(m.jsx)(P.a,{align:"center",children:Object(m.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/MetamonEgg.png",alt:"Egg"})}),Object(m.jsx)(P.a,{align:"center",children:Object(m.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/DiamondYellow.png",alt:"DiamondYellow"})}),Object(m.jsx)(P.a,{align:"center",children:Object(m.jsx)("img",{style:{objectFit:"contain"},width:"50px",height:"50px",src:"/marketplaceraca/potion.png",alt:"Potion"})})]})}),Object(m.jsx)(E.a,{children:p&&r&&u&&w&&p.map((function(e,t){var c,n,a,i,s,l,o,d;return Object(m.jsxs)(M.a,{children:[Object(m.jsx)(P.a,{align:"center",component:"th",scope:"row",children:t+1}),Object(m.jsxs)(P.a,{align:"center",children:[B(Math.floor(null===(c=r[t])||void 0===c?void 0:c.fixed_price))," (~",($*(null===(n=r[t])||void 0===n?void 0:n.fixed_price)).toFixed(2),")"]}),Object(m.jsxs)(P.a,{align:"center",children:[B(Math.floor(null===(a=p[t])||void 0===a?void 0:a.fixed_price))," (~",($*(null===(i=p[t])||void 0===i?void 0:i.fixed_price)).toFixed(2),")"]}),Object(m.jsxs)(P.a,{align:"center",children:[B(Math.floor(null===(s=u[t])||void 0===s?void 0:s.fixed_price))," (~",($*(null===(l=u[t])||void 0===l?void 0:l.fixed_price)).toFixed(2),")"]}),Object(m.jsxs)(P.a,{align:"center",children:[B(Math.floor(null===(o=w[t])||void 0===o?void 0:o.fixed_price))," (~",($*(null===(d=w[t])||void 0===d?void 0:d.fixed_price)).toFixed(2),")"]})]},t+1)}))})]})}),Object(m.jsxs)("div",{id:"xike",children:[Object(m.jsx)("p",{children:"X\xecke Captain"}),Object(m.jsx)("img",{alt:"Xike",src:"/marketplaceraca/xike.png"})]})]}),Object(m.jsxs)("div",{className:"cards",children:[K&&Object(m.jsx)("div",{className:"card loading",children:Object(m.jsx)(k,{nft:K})}),R&&Object(m.jsx)("div",{className:"card loading",children:Object(m.jsx)(k,{nft:R})}),Y&&Object(m.jsx)("div",{className:"card loading",children:Object(m.jsx)(k,{nft:Y})}),L&&Object(m.jsx)("div",{className:"card loading",children:Object(m.jsx)(k,{nft:L})})]})]})},F=c(22),L=c(228),T=c(216),z=c(211),H=c(113),R={apiKey:"AIzaSyCQItrkH9bp7aT1yiwobbNbHtXcKcZ45Qk",authDomain:"sales-nft-raca.firebaseapp.com",projectId:"sales-nft-raca",storageBucket:"sales-nft-raca.appspot.com",messagingSenderId:"547281695761",appId:"1:547281695761:web:bade483d397ca7e9cd2db0"},W=c(62);c(158);function q(e,t,c,n,a){var r=t*a/100,i=c*a/100,s=r-i,l=n*a/100;return{name:e,sales:r,cost:i,profit:s,withdraw:l,remain:s-l}}var J=function(e,t){return S.a.get("https://market-api.radiocaca.com/users/0x10201091597635eC7b8e208306E6aDCC7c167925/histories?pageNo=".concat(e,"&pageSize=").concat(t))},K=function(){var e=Object(n.useState)([]),t=Object(b.a)(e,2),c=t[0],r=t[1],i=Object(n.useState)([]),s=Object(b.a)(i,2),d=s[0],j=s[1],h=Object(n.useState)([]),O=Object(b.a)(h,2),x=O[0],p=O[1],f=Object(n.useState)(!1),g=Object(b.a)(f,2),v=g[0],w=g[1];return Object(n.useEffect)((function(){var e=0,t=1,c=[],n=function(){var n=Object(o.a)(l.a.mark((function n(){var a;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,J(t,10);case 2:a=n.sent,t++,e=a.data.total,c=[].concat(Object(F.a)(c),Object(F.a)(a.data.list));case 6:if(c.length<e){n.next=0;break}case 7:r(c);case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n();var a=function(){var e=Object(o.a)(l.a.mark((function e(){var t,c,n,a,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(H.a)(R),c=Object(W.c)(t),n=Object(W.e)(Object(W.a)(c,"Transaction"),Object(W.d)("time")),e.next=5,Object(W.b)(n);case 5:a=e.sent,r=[],a.forEach((function(e){r.push(e.data())})),i=r.map((function(e){return Object(u.a)(Object(u.a)({},e),{},{time:new Date(1e3*e.time.seconds).toLocaleString().split(",")[0]})})),p(i);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a(),function(){r([]),p([])}}),[]),Object(n.useEffect)((function(){var e=c.filter((function(e){return 407301===e.nft_token_id})),t=c.filter((function(e){return 403545===e.nft_token_id})),n=e.reduce((function(e,t){return t.time>Date.parse("12/28/2021")/1e3&&(t.fee=5*Number(t.amount)/100),e+(Number(t.amount)-Number(t.fee))}),0),a=t.reduce((function(e,t){return e+Number(t.amount)}),0),r=0,i=0;x.forEach((function(e,t){e.transfer?r+=Number(e.amount):i+=Number(e.amount)}),0),0!==n&&(n-=2700),j([q("Johny Duc",n,a+=i,r,40),q("Khang Pug",n,a,r,40),q("Duc Professor",n,a,r,20),q("Total",n,a,r,100)])}),[c,x]),Object(m.jsxs)("div",{className:"sales",children:[Object(m.jsx)(N.a,{id:"sales-section",component:_.a,children:Object(m.jsxs)(C.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(m.jsx)(A.a,{children:Object(m.jsxs)(M.a,{children:[Object(m.jsx)(P.a,{children:"Name"}),Object(m.jsx)(P.a,{align:"center",children:"Sales"}),Object(m.jsx)(P.a,{align:"center",children:"Cost"}),Object(m.jsx)(P.a,{align:"center",children:"Profit"}),Object(m.jsx)(P.a,{align:"center",children:"Withdraw"}),Object(m.jsx)(P.a,{align:"center",children:"Remain"})]})}),Object(m.jsxs)(E.a,{children:[c&&d&&d.map((function(e){return Object(m.jsxs)(M.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(m.jsx)(P.a,{component:"th",scope:"row",children:e.name}),Object(m.jsx)(P.a,{align:"center",children:B(Math.floor(e.sales))}),Object(m.jsx)(P.a,{align:"center",children:B(Math.floor(e.cost))}),Object(m.jsx)(P.a,{align:"center",children:B(Math.floor(e.profit))}),Object(m.jsx)(P.a,{align:"center",children:B(Math.floor(e.withdraw))}),Object(m.jsx)(P.a,{align:"center",children:B(Math.floor(e.remain))})]},e.name)})),!c&&Object(m.jsx)(M.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:Object(m.jsx)(P.a,{component:"th",scope:"row",children:Object(m.jsx)(L.a,{size:"small",color:"success"})})})]})]})}),Object(m.jsxs)("div",{id:"withdraw-history",children:[Object(m.jsx)("h2",{style:{textAlign:"left"},children:"Withdraw History"}),Object(m.jsxs)("div",{id:"addTransaction",children:[Object(m.jsx)(T.a,{size:"medium",id:"toggleButton",onClick:function(){w((function(e){return!e}))},variant:"contained",children:"Add Transaction"}),v&&Object(m.jsxs)(a.a.StrictMode,{children:[Object(m.jsx)(z.a,{type:"number",label:"Amount",variant:"outlined",size:"small",style:{marginBottom:"10px"}}),Object(m.jsx)(z.a,{label:"Notes",variant:"outlined",size:"small",id:"notes",style:{marginBottom:"10px"}}),Object(m.jsx)(T.a,{id:"addButton",size:"medium",variant:"contained",children:"Add"})]})]}),Object(m.jsx)(N.a,{id:"withdraw",component:_.a,children:Object(m.jsxs)(C.a,{sx:{minWidth:250},"aria-label":"simple table",children:[Object(m.jsx)(A.a,{children:Object(m.jsxs)(M.a,{children:[Object(m.jsx)(P.a,{children:"Time"}),Object(m.jsx)(P.a,{align:"center",children:"Amount"}),Object(m.jsx)(P.a,{align:"center",children:"Note"})]})}),Object(m.jsx)(E.a,{children:x&&x.map((function(e,t){return Object(m.jsxs)(M.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(m.jsx)(P.a,{component:"th",scope:"row",children:e.time}),Object(m.jsx)(P.a,{align:"center",children:B(e.amount)}),Object(m.jsx)(P.a,{align:"center",children:B(e.notes)})]},t)}))})]})})]})]})},U=c(231),X=c(213),Q=c(208),Y=c(212),Z=function(e){e.getFilter;var t=Object(d.b)(),c=Object(d.c)((function(e){return e.filters})),a=Object(n.useState)(c.arrange),r=Object(b.a)(a,2),i=r[0],s=r[1],l=Object(n.useState)(c.minScore),o=Object(b.a)(l,2),u=o[0],h=o[1],O=Object(n.useState)(c.level),p=Object(b.a)(O,2),f=p[0],g=p[1];return Object(m.jsxs)(U.a,{sx:{marginTop:"20px"},children:[Object(m.jsxs)(x.a,{sx:{display:"flex",alignItems:"end"},children:[Object(m.jsx)(z.a,{value:u,onChange:function(e){h(e.target.value)},sx:{width:100,marginRight:"0.5rem"},id:"min-score",label:"Min score",variant:"standard",type:"number"}),Object(m.jsx)(z.a,{value:f,onChange:function(e){g(e.target.value)},sx:{width:100,marginRight:"0.5rem"},id:"level",label:"Level",variant:"standard",type:"number"}),Object(m.jsx)(T.a,{sx:{height:"100%",color:"#383838",background:"#fcc33c"},variant:"contained",onClick:function(){t(function(e){return{type:"handleFilters",payload:{minScore:e.minScore,level:e.level}}}({minScore:u,level:f})),s(0)},children:"Confirm"})]}),Object(m.jsx)(x.a,{children:Object(m.jsx)(X.a,{style:{margin:"20px 0"},children:Object(m.jsxs)(Q.a,{size:"small",labelId:"select",id:"filter",value:i,onChange:function(e){s(e.target.value),t(j(e.target.value))},children:[Object(m.jsx)(Y.a,{value:0,children:"Lowest Price"}),Object(m.jsx)(Y.a,{value:1,children:"Highest Level"}),Object(m.jsx)(Y.a,{value:2,children:"Highest Score"})]})})})]})},G=(c(160),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,c=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return S()("https://market-api.radiocaca.com/nft-sales?saleType&category=13&tokenType&tokenId=-1&pageNo=".concat(c,"&pageSize=100&sortBy=single_price&order=asc&min_level=").concat(t,"&max_level=60&min_score=").concat(e,"&max_score=330"),{"Access-Control-Allow-Origin":"*"})}),V=function(){var e=Object(d.c)((function(e){return e.filters})),t=e.minScore,c=e.level,a=e.arrange,r=Object(n.useState)([]),i=Object(b.a)(r,2),s=i[0],u=i[1],h=Object(n.useState)([]),O=Object(b.a)(h,2),p=O[0],f=O[1],g=Object(d.b)(),v=Object(d.c)((function(e){return e.price})).raca,w=function(e){console.log(e.target)},S=function(){var e=Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,G(t,c,1).then(function(){var e=Object(o.a)(l.a.mark((function e(n){var a,r,i,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=n.data,r=n.data.list,i=1;case 3:if(!(i<=Math.floor(a.total/100))){e.next=11;break}return e.next=6,G(t,c,i+1).then((function(e){return e.data.list}));case 6:s=e.sent,r=r.concat(s);case 8:i++,e.next=3;break;case 11:u(r);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){return S(),g(j(0)),function(){u([])}}),[t,c]),Object(n.useEffect)((function(){var e=function(e){return s.sort((function(t,c){return"fixed_price"===e?Number(t[e])-Number(c[e]):Number(c[e])-Number(t[e])}))};switch(a){case 0:f(e("fixed_price").slice(0,10));break;case 1:f(e("level").slice(0,10));break;case 2:f(e("score").slice(0,10))}return function(){f([])}}),[s,a]),Object(m.jsxs)(x.a,{sx:{textAlign:"left"},children:[Object(m.jsx)(Z,{}),Object(m.jsx)(N.a,{id:"table-scroll",component:_.a,children:Object(m.jsxs)(C.a,{id:"tablePrice","aria-label":"simple table",children:[Object(m.jsx)(A.a,{children:Object(m.jsxs)(M.a,{children:[Object(m.jsx)(P.a,{align:"center",children:"#"}),Object(m.jsx)(P.a,{align:"center"}),Object(m.jsx)(P.a,{align:"center",children:"ID"}),Object(m.jsx)(P.a,{align:"center",children:"Score"}),Object(m.jsx)(P.a,{align:"center",children:"Level"}),Object(m.jsx)(P.a,{align:"center",sx:{width:"25%"},children:"Price"})]})}),Object(m.jsx)(E.a,{children:p&&p.map((function(e,t){return Object(m.jsxs)(M.a,{children:[Object(m.jsx)(P.a,{align:"center",component:"th",scope:"row",children:t+1}),Object(m.jsx)(P.a,{id:"metamon-".concat(t+1),onMouseEnter:w,align:"center",component:"th",scope:"row",sx:{position:"relative"},children:Object(m.jsx)("img",{width:"50px",height:"50px",src:e.image_url,alt:"Metamon"})}),Object(m.jsx)(P.a,{align:"center",component:"th",scope:"row",children:Object(m.jsx)("a",{href:"https://market.radiocaca.com/#/market-place/".concat(e.id),target:"_blank",style:{color:"#363636",textDecoration:"none"},rel:"noreferrer",children:e.token_id})}),Object(m.jsx)(P.a,{align:"center",component:"th",scope:"row",children:null===e||void 0===e?void 0:e.score}),Object(m.jsx)(P.a,{align:"center",component:"th",scope:"row",children:null===e||void 0===e?void 0:e.level}),Object(m.jsxs)(P.a,{align:"center",component:"th",scope:"row",children:[B(e.fixed_price)," (~",(v*e.fixed_price).toFixed(2),")"]})]},t+1)}))})]})})]})};function $(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var ee=function(){var e=Object(n.useState)(0),t=Object(b.a)(e,2),c=t[0],a=t[1];return Object(m.jsxs)(x.a,{sx:{width:"100%"},children:[Object(m.jsx)(x.a,{id:"tabs",sx:{borderBottom:1,borderColor:"divider"},children:Object(m.jsxs)(h.a,{value:c,onChange:function(e,t){a(t)},"aria-label":"basic tabs example",children:[Object(m.jsx)(O.a,Object(u.a)({label:"NFTs"},$(0))),Object(m.jsx)(O.a,Object(u.a)({label:"Sales"},$(1))),Object(m.jsx)(O.a,Object(u.a)({label:"Metamon"},$(2)))]})}),Object(m.jsx)(v,{value:c,index:0,children:Object(m.jsx)(D,{})}),Object(m.jsx)(v,{value:c,index:1,children:Object(m.jsx)(K,{})}),Object(m.jsx)(v,{value:c,index:2,children:Object(m.jsx)(V,{})})]})};var te=function(){var e=Object(d.b)(),t=function(){var t=Object(o.a)(l.a.mark((function t(){var c,n;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,S.a.get("https://api.coingecko.com/api/v3/simple/price?ids=radio-caca&vs_currencies=usd").then((function(e){return e.data["radio-caca"].usd}));case 2:return c=t.sent,t.next=5,S.a.get("https://api.coingecko.com/api/v3/simple/price?ids=elemon&vs_currencies=usd").then((function(e){return e.data.elemon.usd}));case 5:n=t.sent,document.title=c+" - Marketplace RACA",e({type:"updatePrice",payload:{raca:c,elmon:n}});case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(n.useEffect)((function(){t();var e=setInterval(Object(o.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t();case 1:case"end":return e.stop()}}),e)}))),2e4);return function(){clearInterval(e)}}),[]),Object(m.jsx)("div",{className:"App",children:Object(m.jsx)(ee,{})})},ce=c(215),ne={filters:{minScore:315,level:20,arrange:0},price:{raca:0,elmon:0},filtersElemon:{name:"",id:"",rarity:"",purity:"",price:""}},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ne,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"handleFilters":return Object(u.a)(Object(u.a)({},e),{},{filters:Object(u.a)(Object(u.a)({},e.filters),{},{minScore:t.payload.minScore,level:t.payload.level})});case"handleArrange":return Object(u.a)(Object(u.a)({},e),{},{filters:Object(u.a)(Object(u.a)({},e.filters),{},{arrange:t.payload})});case"updatePrice":return Object(u.a)(Object(u.a)({},e),{},{price:t.payload});default:return e}},re=Object(ce.a)(ae),ie=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,232)).then((function(t){var c=t.getCLS,n=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;c(e),n(e),a(e),r(e),i(e)}))};i.a.render(Object(m.jsx)(a.a.StrictMode,{children:Object(m.jsx)(d.a,{store:re,children:Object(m.jsx)(te,{})})}),document.getElementById("root")),ie()}},[[161,1,2]]]);
//# sourceMappingURL=main.95f5e242.chunk.js.map