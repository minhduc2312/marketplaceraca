(this.webpackJsonpmarketplaceraca=this.webpackJsonpmarketplaceraca||[]).push([[0],{105:function(e,t,n){},117:function(e,t,n){},141:function(e,t,n){},165:function(e,t,n){},166:function(e,t,n){},168:function(e,t,n){},170:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(45),i=n.n(r),s=(n(141),n(21)),o=n(3),l=n.n(o),j=n(7),d=n(26),u=(n(105),function(e){return{type:"handleArrange",payload:e}}),b=function(e){return{type:"handlePower",payload:{min:e.minPower,max:e.maxPower}}},O=n(10),h=n(220),p=n(230),x=n(229),f=n(125),m=n(231),v=n(1),g=["children","value","index"];var w=function(e){var t=e.children,n=e.value,c=e.index,a=Object(f.a)(e,g);return Object(v.jsx)("div",Object(s.a)(Object(s.a)({role:"tabpanel",hidden:n!==c,id:"simple-tabpanel-".concat(c),sx:{color:"#ffffff"},"aria-labelledby":"simple-tab-".concat(c)},a),{},{children:n===c&&Object(v.jsx)(x.a,{sx:{span:3},children:Object(v.jsx)(m.a,{component:"span",children:t})})}))},y=n(40),k=n.n(y);var S=function(e){var t,n=e.nft,c=n.name,a=void 0===c?"undefined":c,r=n.id,i=void 0===r?"#0000":r,s=n.image_url,o=void 0===s?"":s,l=n.fixed_price,j=void 0===l?"0000":l;return Object(v.jsxs)("div",{className:"nft",children:[Object(v.jsx)("div",{className:"imgBox",children:Object(v.jsx)("img",{className:"image-nft",alt:a,src:o||"/marketplaceraca/nft.png"})}),Object(v.jsxs)("div",{className:"textBox",children:[Object(v.jsxs)("p",{className:"name-nft",children:[a," #",i]}),Object(v.jsx)("div",{className:"separate"}),Object(v.jsxs)("div",{className:"price",children:[Object(v.jsx)("p",{style:{color:"#ffffff",fontSize:20,fontWeight:700,lineHeight:"32px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",margin:"0"},children:"Price"}),Object(v.jsx)("p",{className:"priceNum",children:(t=j,t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))})]})]})]})},N=function(){var e=Object(c.useState)(""),t=Object(O.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(0),i=Object(O.a)(r,2),s=i[0],o=i[1],u=function(){var e=Object(j.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a(t.target.value);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=Object(d.c)((function(e){return e.price})).raca;return Object(c.useEffect)((function(){o((function(){return n*b}))}),[n,b]),Object(v.jsxs)("div",{id:"swap-raca",children:[Object(v.jsx)("input",{id:"RACA",type:"number",value:n,onChange:u}),Object(v.jsx)("span",{children:" ~ "}),Object(v.jsxs)("span",{id:"USD",children:[s," USD"]})]})},_=n(233),C=n(234),P=n(232),E=n(235),I=n(236),A=n(237),M=n(238),D=(n(165),function(e,t){return k()("https://market-api.radiocaca.com/nft-sales?pageSize=".concat(t,"&sortBy=fixed_price&order=asc&category=").concat(e,"&tokenId=-1"),{"Access-Control-Allow-Origin":"*"})});function F(e){return null===e||void 0===e?void 0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}var B=function(e){var t=e.hidden,n=Object(c.useState)([]),a=Object(O.a)(n,2),r=a[0],i=a[1],s=Object(c.useState)([]),o=Object(O.a)(s,2),u=o[0],b=o[1],h=Object(c.useState)([]),p=Object(O.a)(h,2),x=p[0],f=p[1],m=Object(c.useState)([]),g=Object(O.a)(m,2),w=g[0],y=g[1],k=Object(c.useState)({}),B=Object(O.a)(k,2),L=B[0],T=B[1],z=Object(c.useState)({}),H=Object(O.a)(z,2),R=H[0],q=H[1],W=Object(c.useState)({}),U=Object(O.a)(W,2),G=U[0],K=U[1],J=Object(c.useState)({}),X=Object(O.a)(J,2),Y=X[0],Q=X[1],Z=Object(c.useState)(0),V=Object(O.a)(Z,2),$=V[0],ee=V[1],te=Object(c.useState)(""),ne=Object(O.a)(te,2),ce=ne[0],ae=ne[1],re=function(){var e=new Date;ae(e.toLocaleString())},ie=Object(d.c)((function(e){return e.price})),se=ie.raca,oe=ie.elmon,le=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([D(13,10).then((function(e){return i(e.data.list)})),D(15,10).then((function(e){return y(e.data.list)})),D(16,10).then((function(e){return b(e.data.list)})),D(17,10).then((function(e){return f(e.data.list)})),D(20,1).then((function(e){var t;T(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),D(23,1).then((function(e){var t;K(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),D(7,1).then((function(e){var t;Q(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),D(46,1).then((function(e){var t;q(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")}))]));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){ee(se)}),[se]),Object(c.useEffect)((function(){le(),re();var e=setInterval((function(){le(),re()}),2e4);return function(){i([]),b([]),f([]),y([]),T({}),ee(0),clearInterval(e)}}),[]),Object(v.jsxs)("div",{hidden:t,children:[Object(v.jsxs)("div",{children:[Object(v.jsxs)("p",{className:"tokenPrice",children:["RACA Price: ",se]}),Object(v.jsxs)("p",{className:"tokenPrice",children:["ELMON Price: ",oe]})]}),Object(v.jsx)(N,{}),Object(v.jsx)("p",{id:"timeUpdated",children:ce}),Object(v.jsxs)("div",{className:"pricetable",children:[Object(v.jsx)(_.a,{id:"table-scroll",component:C.a,children:Object(v.jsxs)(P.a,{id:"tablePrice","aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(I.a,{children:[Object(v.jsx)(A.a,{align:"center",children:"#"}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/metamon.png",alt:"Metamon"})}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/MetamonEgg.png",alt:"Egg"})}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/DiamondYellow.png",alt:"DiamondYellow"})}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{style:{objectFit:"contain"},width:"50px",height:"50px",src:"/marketplaceraca/potion.png",alt:"Potion"})})]})}),Object(v.jsx)(M.a,{children:x&&r&&u&&w&&x.map((function(e,t){var n,c,a,i,s,o,l,j;return Object(v.jsxs)(I.a,{children:[Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:t+1}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(n=r[t])||void 0===n?void 0:n.fixed_price))," (~",($*(null===(c=r[t])||void 0===c?void 0:c.fixed_price)).toFixed(2),")"]}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(a=x[t])||void 0===a?void 0:a.fixed_price))," (~",($*(null===(i=x[t])||void 0===i?void 0:i.fixed_price)).toFixed(2),")"]}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(s=u[t])||void 0===s?void 0:s.fixed_price))," (~",($*(null===(o=u[t])||void 0===o?void 0:o.fixed_price)).toFixed(2),")"]}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(l=w[t])||void 0===l?void 0:l.fixed_price))," (~",($*(null===(j=w[t])||void 0===j?void 0:j.fixed_price)).toFixed(2),")"]})]},t+1)}))})]})}),Object(v.jsxs)("div",{id:"xike",children:[Object(v.jsx)("p",{children:"X\xecke Captain"}),Object(v.jsx)("img",{alt:"Xike",src:"/marketplaceraca/xike.png"})]})]}),Object(v.jsxs)("div",{className:"cards",children:[G&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:G})}),R&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:R})}),Y&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:Y})}),L&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:L})})]})]})},L=n(22),T=n(239),z=n(226),H=n(221),R=n(123),q={apiKey:"AIzaSyCQItrkH9bp7aT1yiwobbNbHtXcKcZ45Qk",authDomain:"sales-nft-raca.firebaseapp.com",projectId:"sales-nft-raca",storageBucket:"sales-nft-raca.appspot.com",messagingSenderId:"547281695761",appId:"1:547281695761:web:bade483d397ca7e9cd2db0"},W=n(66);n(166);function U(e,t,n,c,a){var r=t*a/100,i=n*a/100,s=r-i,o=c*a/100;return{name:e,sales:r,cost:i,profit:s,withdraw:o,remain:s-o}}var G=function(e,t){return k.a.get("https://market-api.radiocaca.com/users/0x10201091597635eC7b8e208306E6aDCC7c167925/histories?pageNo=".concat(e,"&pageSize=").concat(t))},K=function(){var e=Object(c.useState)([]),t=Object(O.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),o=Object(O.a)(i,2),d=o[0],u=o[1],b=Object(c.useState)([]),h=Object(O.a)(b,2),p=h[0],x=h[1],f=Object(c.useState)(!1),m=Object(O.a)(f,2),g=m[0],w=m[1];return Object(c.useEffect)((function(){var e=0,t=1,n=[],c=function(){var c=Object(j.a)(l.a.mark((function c(){var a;return l.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,G(t,10);case 2:a=c.sent,t++,e=a.data.total,n=[].concat(Object(L.a)(n),Object(L.a)(a.data.list));case 6:if(n.length<e){c.next=0;break}case 7:r(n);case 8:case"end":return c.stop()}}),c)})));return function(){return c.apply(this,arguments)}}();c();var a=function(){var e=Object(j.a)(l.a.mark((function e(){var t,n,c,a,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(R.a)(q),n=Object(W.c)(t),c=Object(W.e)(Object(W.a)(n,"Transaction"),Object(W.d)("time")),e.next=5,Object(W.b)(c);case 5:a=e.sent,r=[],a.forEach((function(e){r.push(e.data())})),i=r.map((function(e){return Object(s.a)(Object(s.a)({},e),{},{time:new Date(1e3*e.time.seconds).toLocaleString().split(",")[0]})})),x(i);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a(),function(){r([]),x([])}}),[]),Object(c.useEffect)((function(){var e=n.filter((function(e){return 407301===e.nft_token_id})),t=n.filter((function(e){return 403545===e.nft_token_id})),c=e.reduce((function(e,t){return t.time>Date.parse("12/28/2021")/1e3&&(t.fee=5*Number(t.amount)/100),e+(Number(t.amount)-Number(t.fee))}),0),a=t.reduce((function(e,t){return e+Number(t.amount)}),0),r=0,i=0;p.forEach((function(e,t){e.transfer?r+=Number(e.amount):i+=Number(e.amount)}),0),0!==c&&(c-=2700),u([U("Johny Duc",c,a+=i,r,40),U("Khang Pug",c,a,r,40),U("Duc Professor",c,a,r,20),U("Total",c,a,r,100)])}),[n,p]),Object(v.jsxs)("div",{className:"sales",children:[Object(v.jsx)(_.a,{id:"sales-section",component:C.a,children:Object(v.jsxs)(P.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(I.a,{children:[Object(v.jsx)(A.a,{children:"Name"}),Object(v.jsx)(A.a,{align:"center",children:"Sales"}),Object(v.jsx)(A.a,{align:"center",children:"Cost"}),Object(v.jsx)(A.a,{align:"center",children:"Profit"}),Object(v.jsx)(A.a,{align:"center",children:"Withdraw"}),Object(v.jsx)(A.a,{align:"center",children:"Remain"})]})}),Object(v.jsxs)(M.a,{children:[n&&d&&d.map((function(e){return Object(v.jsxs)(I.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(v.jsx)(A.a,{component:"th",scope:"row",children:e.name}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.sales))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.cost))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.profit))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.withdraw))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.remain))})]},e.name)})),!n&&Object(v.jsx)(I.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:Object(v.jsx)(A.a,{component:"th",scope:"row",children:Object(v.jsx)(T.a,{size:"small",color:"success"})})})]})]})}),Object(v.jsxs)("div",{id:"withdraw-history",children:[Object(v.jsx)("h2",{style:{textAlign:"left"},children:"Withdraw History"}),Object(v.jsxs)("div",{id:"addTransaction",children:[Object(v.jsx)(z.a,{size:"medium",id:"toggleButton",onClick:function(){w((function(e){return!e}))},variant:"contained",children:"Add Transaction"}),g&&Object(v.jsxs)(a.a.StrictMode,{children:[Object(v.jsx)(H.a,{type:"number",label:"Amount",variant:"outlined",size:"small",style:{marginBottom:"10px"}}),Object(v.jsx)(H.a,{label:"Notes",variant:"outlined",size:"small",id:"notes",style:{marginBottom:"10px"}}),Object(v.jsx)(z.a,{id:"addButton",size:"medium",variant:"contained",children:"Add"})]})]}),Object(v.jsx)(_.a,{id:"withdraw",component:C.a,children:Object(v.jsxs)(P.a,{sx:{minWidth:250},"aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(I.a,{children:[Object(v.jsx)(A.a,{children:"Time"}),Object(v.jsx)(A.a,{align:"center",children:"Amount"}),Object(v.jsx)(A.a,{align:"center",children:"Note"})]})}),Object(v.jsx)(M.a,{children:p&&p.map((function(e,t){return Object(v.jsxs)(I.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(v.jsx)(A.a,{component:"th",scope:"row",children:e.time}),Object(v.jsx)(A.a,{align:"center",children:F(e.amount)}),Object(v.jsx)(A.a,{align:"center",children:F(e.notes)})]},t)}))})]})})]})]})},J=n(6),X=n(242),Y=n(223),Q=n(218),Z=n(222),V=function(e){e.getFilter;var t,n=Object(d.b)(),a=Object(d.c)((function(e){return e.filters})),r=Object(c.useState)(a.arrange),i=Object(O.a)(r,2),s=i[0],o=i[1],l=Object(c.useState)(a.minScore),j=Object(O.a)(l,2),b=j[0],h=j[1],p=Object(c.useState)(a.level),f=Object(O.a)(p,2),m=f[0],g=f[1];return Object(v.jsxs)(X.a,{sx:{marginTop:"20px",color:"#fff"},children:[Object(v.jsxs)(x.a,{sx:{display:"flex",alignItems:"end"},children:[Object(v.jsx)(H.a,{value:b,onChange:function(e){h(e.target.value)},sx:{color:"#fff",width:100,marginRight:"0.5rem"},id:"min-score",label:"Min score",variant:"standard",type:"number"}),Object(v.jsx)(H.a,{value:m,onChange:function(e){g(e.target.value)},sx:{color:"#fff",width:100,marginRight:"0.5rem"},id:"level",label:"Level",variant:"standard",type:"number"}),Object(v.jsx)(z.a,{sx:(t={color:"#fff",height:"100%"},Object(J.a)(t,"color","#383838"),Object(J.a)(t,"background","#fcc33c"),t),variant:"contained",onClick:function(){n(function(e){return{type:"handleFilters",payload:{minScore:e.minScore,level:e.level}}}({minScore:b,level:m})),o(0)},children:"Confirm"})]}),Object(v.jsx)(x.a,{children:Object(v.jsx)(Y.a,{style:{margin:"20px 0"},children:Object(v.jsxs)(Q.a,{size:"small",labelId:"select",id:"filter",value:s,onChange:function(e){o(e.target.value),n(u(e.target.value))},sx:{color:"#fff"},children:[Object(v.jsx)(Z.a,{value:0,children:"Lowest Price"}),Object(v.jsx)(Z.a,{value:1,children:"Highest Level"}),Object(v.jsx)(Z.a,{value:2,children:"Highest Score"})]})})})]})},$=(n(168),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:300,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return k()("https://market-api.radiocaca.com/nft-sales?saleType&category=13&tokenType&tokenId=-1&pageNo=".concat(n,"&pageSize=100&sortBy=single_price&order=asc&min_level=").concat(t,"&max_level=60&min_score=").concat(e,"&max_score=330"),{"Access-Control-Allow-Origin":"*"})}),ee=function(){var e=Object(d.c)((function(e){return e.filters})),t=e.minScore,n=e.level,a=e.arrange,r=Object(c.useState)([]),i=Object(O.a)(r,2),s=i[0],o=i[1],b=Object(c.useState)([]),h=Object(O.a)(b,2),p=h[0],f=h[1],m=Object(d.b)(),g=Object(d.c)((function(e){return e.price})).raca,w=function(e){},y=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$(t,n,1).then(function(){var e=Object(j.a)(l.a.mark((function e(c){var a,r,i,s;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=c.data,r=c.data.list,i=1;case 3:if(!(i<=Math.floor(a.total/100))){e.next=11;break}return e.next=6,$(t,n,i+1).then((function(e){return e.data.list}));case 6:s=e.sent,r=r.concat(s);case 8:i++,e.next=3;break;case 11:o(r);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){return y(),m(u(0)),function(){o([])}}),[t,n]),Object(c.useEffect)((function(){var e=function(e){return s.sort((function(t,n){return"fixed_price"===e?Number(t[e])-Number(n[e]):Number(n[e])-Number(t[e])}))};switch(a){case 0:f(e("fixed_price").slice(0,10));break;case 1:f(e("level").slice(0,10));break;case 2:f(e("score").slice(0,10))}return function(){f([])}}),[s,a]),Object(v.jsxs)(x.a,{sx:{textAlign:"left"},children:[Object(v.jsx)(V,{}),Object(v.jsx)(_.a,{id:"table-scroll",component:C.a,children:Object(v.jsxs)(P.a,{id:"tablePrice","aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(I.a,{children:[Object(v.jsx)(A.a,{align:"center",children:"#"}),Object(v.jsx)(A.a,{align:"center"}),Object(v.jsx)(A.a,{align:"center",children:"ID"}),Object(v.jsx)(A.a,{align:"center",children:"Score"}),Object(v.jsx)(A.a,{align:"center",children:"Level"}),Object(v.jsx)(A.a,{align:"center",sx:{width:"25%"},children:"Price"})]})}),Object(v.jsx)(M.a,{children:p&&p.map((function(e,t){return Object(v.jsxs)(I.a,{children:[Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:t+1}),Object(v.jsx)(A.a,{id:"metamon-".concat(t+1),onMouseEnter:w,align:"center",component:"th",scope:"row",sx:{position:"relative"},children:Object(v.jsx)("img",{width:"50px",height:"50px",src:e.image_url,alt:"Metamon"})}),Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:Object(v.jsx)("a",{href:"https://market.radiocaca.com/#/market-place/".concat(e.id),target:"_blank",style:{color:"#fff",textDecoration:"none"},rel:"noreferrer",children:e.token_id})}),Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:null===e||void 0===e?void 0:e.score}),Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:null===e||void 0===e?void 0:e.level}),Object(v.jsxs)(A.a,{align:"center",component:"th",scope:"row",children:[F(e.fixed_price)," (~",(g*e.fixed_price).toFixed(2),")"]})]},t+1)}))})]})})]})},te=function(){var e=Object(d.c)((function(e){return e.filtersElemon})),t=e.min,n=e.max,a=e.sort,r=Object(c.useState)(t),i=Object(O.a)(r,2),s=i[0],o=i[1],l=Object(c.useState)(n),j=Object(O.a)(l,2),u=j[0],h=j[1],p=Object(c.useState)(a),f=Object(O.a)(p,2),m=(f[0],f[1]),g=Object(c.useState)(),w=Object(O.a)(g,2),y=w[0],k=(w[1],Object(d.b)());Object(c.useEffect)((function(){o(t)}),[t]);return Object(v.jsx)("div",{className:"filters",children:Object(v.jsx)("div",{className:"filter-content",children:Object(v.jsxs)("div",{className:"filter-top",children:[Object(v.jsxs)("select",{onChange:function(e){m(e.target.value),k(function(e){return{type:"handleSort",payload:e}}(e.target.value))},className:"market__select",children:[Object(v.jsx)("option",{value:"0",children:"Lowest price"}),Object(v.jsx)("option",{value:"1",children:"Highest price"}),Object(v.jsx)("option",{value:"2",children:"Lowest Point"}),Object(v.jsx)("option",{value:"3",children:"Highest Point"})]}),Object(v.jsxs)("select",{onChange:function(e){k({type:"handleName",payload:e.target.value})},className:"market__select",children:[Object(v.jsx)("option",{value:"0",children:"Elemon name"}),Object(v.jsx)("option",{value:"4",children:"Neikoo"}),Object(v.jsx)("option",{value:"8",children:"Skurumi"}),Object(v.jsx)("option",{value:"9",children:"RusMoonch"}),Object(v.jsx)("option",{value:"10",children:"PoxArchies"}),Object(v.jsx)("option",{value:"11",children:"Legolas"}),Object(v.jsx)("option",{value:"12",children:"Mykasa"}),Object(v.jsx)("option",{value:"15",children:"Hyugar"}),Object(v.jsx)("option",{value:"16",children:"Inori"}),Object(v.jsx)("option",{value:"22",children:"Kuroo"}),Object(v.jsx)("option",{value:"17",children:"Elight"}),Object(v.jsx)("option",{value:"20",children:"Finter"}),Object(v.jsx)("option",{value:"21",children:"Ties"}),Object(v.jsx)("option",{value:"26",children:"Hoorus"}),Object(v.jsx)("option",{value:"6",children:"Raizer"}),Object(v.jsx)("option",{value:"19",children:"Scary"}),Object(v.jsx)("option",{value:"13",children:"Cokoner"})]}),Object(v.jsx)("input",{onBlur:function(e){var t;k({type:"handleTokenId",payload:null===(t=e.target)||void 0===t?void 0:t.value})},className:"market__input",placeholder:"Elemon Id",value:y,type:"number"}),Object(v.jsxs)(x.a,{className:"filter_power",children:[Object(v.jsx)(H.a,{value:s,onChange:function(e){o(e.target.value)},sx:{width:100,marginRight:"0.5rem"},id:"min-power",label:"Min",variant:"standard",type:"number"}),Object(v.jsx)(H.a,{value:u,onChange:function(e){h(e.target.value)},sx:{width:100,marginRight:"0.5rem"},id:"max-power",label:"Max",variant:"standard",type:"number"}),Object(v.jsx)(z.a,{sx:{height:"100%",color:"#383838",background:"#fcc33c"},variant:"contained",onClick:function(){k(b({minPower:s,maxPower:u})),m(0)},children:"Confirm"})]})]})})})},ne=(n(117),n(228)),ce=function(e){var t=e.elemon,n="https://app.elemon.io",c=[t.bodyPart1,t.bodyPart2,t.bodyPart3,t.bodyPart4,t.bodyPart5,t.bodyPart6];return Object(v.jsxs)("div",{className:"character-item owner",children:[Object(v.jsxs)("div",{className:"head",children:[Object(v.jsxs)("p",{className:"id",children:["ID: ",t.tokenId]}),Object(v.jsx)("div",{className:"character-type",children:Object(v.jsx)("img",{"img-rarity":"",src:"".concat(n,"/assets/images/rarity_").concat(["B","A","S","SS","SSS"][t.rarity-1],".png")})})]}),Object(v.jsxs)("div",{className:"content",children:[Object(v.jsxs)("div",{className:"img",children:[Object(v.jsxs)("div",{className:"img-left",children:[Object(v.jsx)("div",{className:"icon",children:Object(v.jsx)("img",{src:"".concat(n,"/assets/images/element/").concat(["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"][t.class-1],".png")})}),Object(v.jsx)("p",{className:"icon_text",children:Object(v.jsx)("span",{children:Object(v.jsx)("img",{src:"".concat(n,"/assets/images/purity_").concat(0==t.purity?"Hybrid":"Pure",".png"),style:{width:"100%"}})})})]}),Object(v.jsx)("img",{"img-elemon":"",src:"https://statics.elemon.io/avatar/".concat(t.baseCardId,"/").concat(t.baseCardId,"_").concat(c.join("_"),".png"),className:"main"}),Object(v.jsx)("div",{className:"img_aura quality_".concat(t.quality)})]}),Object(v.jsxs)("div",{className:"text",children:[Object(v.jsxs)("p",{className:"price",children:[Object(v.jsx)("img",{src:"".concat(n,"/assets/images/busd_ticker.png"),width:"40",alt:""}),t.lastPrice/1e18," BUSD"]}),Object(v.jsxs)("div",{className:"element",children:[Object(v.jsx)("div",{className:"icon",children:Object(v.jsx)("img",{src:"".concat(n,"/assets/images/icon-power.png"),alt:""})}),Object(v.jsx)("p",{className:"element__name","data-power":"",children:F(t.point)})]}),Object(v.jsx)("a",{target:"_blank",href:"https://app.elemon.io/elemon/".concat(t.tokenId),className:"box__btn buy",type:"button",children:"0x10201091597635eC7b8e208306E6aDCC7c167925"===t.ownerAddress?"My Elemon":"Info"})]})]})]})},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;return k.a.get("https://app.elemon.io/market/getElemonItems?pageNumber=".concat(e,"&pageSize=").concat(t,"&positionType=2&priceMode=").concat(n,"&baseCardId=&tokenId=&rarities=&classes=&purities=")).then((function(e){return e.data}),{headers:{"Access-Control-Allow-Origin":"*"}})},re=function(e){var t=e.map((function(e){return e.tokenId}));return k.a.get("https://app.elemon.io/elemon/GetElemonInfo?tokenId=".concat(null===t||void 0===t?void 0:t.join(","))).then((function(e){return e.data}),{headers:{"Access-Control-Allow-Origin":"*"}}).catch((function(e){return e}))},ie=function(){var e=Object(c.useState)([]),t=Object(O.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),o=Object(O.a)(i,2),u=o[0],h=o[1],p=Object(c.useState)(""),f=Object(O.a)(p,2),m=f[0],g=f[1],w=Object(c.useState)(!0),y=Object(O.a)(w,2),k=y[0],S=y[1],N=Object(c.useState)([]),_=Object(O.a)(N,2),C=_[0],P=_[1],E=Object(c.useState)(),I=Object(O.a)(E,2),A=I[0],M=I[1],D=Object(d.c)((function(e){return e.filtersElemon})),F=D.min,B=D.max,L=D.sort,z=D.name,H=D.tokenId,R=Object(d.b)();return Object(c.useEffect)((function(){var e=function(){var e=Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae(1,100).then(function(){var e=Object(j.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae(1,t.paging.totalCount).then((function(e){return r(e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),function(){var e=new Date;g(e.toLocaleString())}(),function(){r([])}}),[]),a.a.useEffect((function(){var e=function(){var e=Object(j.a)(l.a.mark((function e(){var t,c,a,r,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S(!0),t=300,c=n.length,a=c%t===0?c/t:c/t+1,r=l.a.mark((function e(a){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c%t!==0&&c-a*t<0?(a-1)*t+c%t:a*t,e.next=3,re(null===n||void 0===n?void 0:n.slice((a-1)*t,r)).then((function(e){var c=n.slice((a-1)*t,r).map((function(t,n){var c,a;"0x10201091597635eC7b8e208306E6aDCC7c167925"===t.ownerAddress&&(t.point=null===(a=e.data[n])||void 0===a?void 0:a.point,R(b({minPower:t.point-(t.point%1e5+5e4),maxPower:B})),M(t));return Object(s.a)(Object(s.a)({},t),{},{point:null===(c=e.data[n])||void 0===c?void 0:c.point})}));h((function(e){return e.concat(c)}))}));case 3:case"end":return e.stop()}}),e)})),i=1;case 6:if(!(i<=a)){e.next=11;break}return e.delegateYield(r(i),"t0",8);case 8:i++,e.next=6;break;case 11:S(!1);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),function(){h([])}}),[n]),Object(c.useEffect)((function(){var e=u.filter((function(e){var t=B,n=F;if(H)return e.tokenId==H;var c=function(t,n){return!t||(1==n?e.point>=t:e.point<=t)};return 0!==Number(z)?e.point>=n&&e.point<=t&&e.baseCardId==z:c(n,1)&&c(t,2)})).sort((function(e,t){switch(Number(L)){case 0:return e.lastPrice>=t.lastPrice?1:-1;case 1:return e.lastPrice<=t.lastPrice?1:-1;case 2:return console.log(e.point),e.point>=t.point?1:-1;case 3:return e.point<=t.point?1:-1}}));return P(e),function(){P([])}}),[k,F,B,L,z,H]),Object(v.jsx)(x.a,{children:Object(v.jsxs)(x.a,{sx:{textAlign:"center"},children:[Object(v.jsx)(te,{}),Object(v.jsx)("p",{className:"timeUpdate",children:m}),Object(v.jsxs)(ne.a,{container:!0,spacing:1,children:[A&&Object(v.jsx)(ne.a,{item:!0,xs:6,md:4,lg:2.2,children:Object(v.jsx)(ce,{elemon:A})}),C&&(null===C||void 0===C?void 0:C.slice(0,100).map((function(e,t){return Object(v.jsx)(ne.a,{item:!0,xs:6,md:4,lg:2.2,children:Object(v.jsx)(ce,{elemon:e})},t)})))]}),k&&Object(v.jsx)(T.a,{})]})})};function se(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var oe=function(e){var t=e.match,n=e.history,a=t.params.page,r={0:"nfts",1:"sales",2:"metamon",3:"elemon"},i=Object(c.useState)({nfts:0,sales:1,metamon:2,elemon:3}[a]),o=Object(O.a)(i,2),l=o[0],j=o[1];return Object(v.jsxs)(x.a,{sx:{width:"100%"},children:[Object(v.jsx)(x.a,{id:"tabs",sx:{borderBottom:1,borderColor:"divider"},children:Object(v.jsxs)(h.a,{value:l,sx:{color:"#ffffff"},onChange:function(e,t){n.push("/marketplaceraca/".concat(r[t])),j(t)},"aria-label":"basic tabs example",children:[Object(v.jsx)(p.a,Object(s.a)({label:"NFTs"},se(0))),Object(v.jsx)(p.a,Object(s.a)({label:"Sales"},se(1))),Object(v.jsx)(p.a,Object(s.a)({label:"Metamon"},se(2))),Object(v.jsx)(p.a,Object(s.a)({label:"Elemon"},se(3)))]})}),Object(v.jsx)(w,{value:l,index:0,children:Object(v.jsx)(B,{})}),Object(v.jsx)(w,{value:l,index:1,children:Object(v.jsx)(K,{})}),Object(v.jsx)(w,{value:l,index:2,children:Object(v.jsx)(ee,{})}),Object(v.jsx)(w,{value:l,index:3,children:Object(v.jsx)(ie,{})})]})},le=n(25);var je=function(){var e=Object(d.b)(),t=function(){var t=Object(j.a)(l.a.mark((function t(){var n,c;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.a.get("https://api.coingecko.com/api/v3/simple/price?ids=radio-caca&vs_currencies=usd").then((function(e){return e.data["radio-caca"].usd}));case 2:return n=t.sent,t.next=5,k.a.get("https://api.coingecko.com/api/v3/simple/price?ids=elemon&vs_currencies=usd").then((function(e){return e.data.elemon.usd}));case 5:c=t.sent,document.title=n+" - Marketplace RACA",e({type:"updatePrice",payload:{raca:n,elmon:c}});case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){t();var e=setInterval(Object(j.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t();case 1:case"end":return e.stop()}}),e)}))),2e4);return function(){clearInterval(e)}}),[]),Object(v.jsx)("div",{className:"App",children:Object(v.jsxs)(le.d,{children:[Object(v.jsx)(le.a,{exact:!0,from:"/marketplaceraca",to:"/marketplaceraca/nfts"}),Object(v.jsx)(le.b,{exact:!0,path:"/marketplaceraca/:page?",render:function(e){return Object(v.jsx)(oe,Object(s.a)({},e))}})]})})},de=n(225),ue={filters:{minScore:315,level:20,arrange:0},price:{raca:0,elmon:0},filtersElemon:{sort:0,name:0,tokenId:"",rarity:"",purity:"",price:"",min:"",max:""}},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"handleFilters":return Object(s.a)(Object(s.a)({},e),{},{filters:Object(s.a)(Object(s.a)({},e.filters),{},{minScore:t.payload.minScore,level:t.payload.level})});case"handleArrange":return Object(s.a)(Object(s.a)({},e),{},{filters:Object(s.a)(Object(s.a)({},e.filters),{},{arrange:t.payload})});case"handlePower":return Object(s.a)(Object(s.a)({},e),{},{filtersElemon:Object(s.a)(Object(s.a)({},e.filtersElemon),{},{min:t.payload.min,max:t.payload.max})});case"handleSort":return Object(s.a)(Object(s.a)({},e),{},{filtersElemon:Object(s.a)(Object(s.a)({},e.filtersElemon),{},{sort:t.payload})});case"handleName":return Object(s.a)(Object(s.a)({},e),{},{filtersElemon:Object(s.a)(Object(s.a)({},e.filtersElemon),{},{name:t.payload})});case"handleTokenId":return Object(s.a)(Object(s.a)({},e),{},{filtersElemon:Object(s.a)(Object(s.a)({},e.filtersElemon),{},{tokenId:t.payload})});case"updatePrice":return Object(s.a)(Object(s.a)({},e),{},{price:t.payload});default:return e}},Oe=Object(de.a)(be),he=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,243)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))},pe=n(93);i.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(d.a,{store:Oe,children:Object(v.jsx)(pe.a,{children:Object(v.jsx)(je,{})})})}),document.getElementById("root")),he()}},[[170,1,2]]]);
//# sourceMappingURL=main.256ffb3a.chunk.js.map