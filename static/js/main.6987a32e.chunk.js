(this.webpackJsonpmarketplaceraca=this.webpackJsonpmarketplaceraca||[]).push([[0],{109:function(e,t,n){},133:function(e,t,n){},158:function(e,t,n){},159:function(e,t,n){},161:function(e,t,n){},162:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(41),i=n.n(r),s=(n(133),n(3)),o=n.n(s),l=n(7),j=n(25),d=(n(96),function(e){return{type:"handleArrange",payload:e}}),u=function(e){return{type:"handlePower",payload:{min:e.minPower,max:e.maxPower}}},b=n(22),O=n(10),h=n(213),p=n(223),m=n(222),x=n(117),f=n(224),v=n(1),g=["children","value","index"];var w=function(e){var t=e.children,n=e.value,c=e.index,a=Object(x.a)(e,g);return Object(v.jsx)("div",Object(b.a)(Object(b.a)({role:"tabpanel",hidden:n!==c,id:"simple-tabpanel-".concat(c),sx:{color:"#ffffff"},"aria-labelledby":"simple-tab-".concat(c)},a),{},{children:n===c&&Object(v.jsx)(m.a,{sx:{span:3},children:Object(v.jsx)(f.a,{component:"span",children:t})})}))},y=n(34),k=n.n(y);var S=function(e){var t,n=e.nft,c=n.name,a=void 0===c?"undefined":c,r=n.id,i=void 0===r?"#0000":r,s=n.image_url,o=void 0===s?"":s,l=n.fixed_price,j=void 0===l?"0000":l;return Object(v.jsxs)("div",{className:"nft",children:[Object(v.jsx)("div",{className:"imgBox",children:Object(v.jsx)("img",{className:"image-nft",alt:a,src:o||"/marketplaceraca/nft.png"})}),Object(v.jsxs)("div",{className:"textBox",children:[Object(v.jsxs)("p",{className:"name-nft",children:[a," #",i]}),Object(v.jsx)("div",{className:"separate"}),Object(v.jsxs)("div",{className:"price",children:[Object(v.jsx)("p",{style:{color:"#ffffff",fontSize:20,fontWeight:700,lineHeight:"32px",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",margin:"0"},children:"Price"}),Object(v.jsx)("p",{className:"priceNum",children:(t=j,t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,","))})]})]})]})},N=function(){var e=Object(c.useState)(""),t=Object(O.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(0),i=Object(O.a)(r,2),s=i[0],d=i[1],u=function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a(t.target.value);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),b=Object(j.c)((function(e){return e.price})).raca;return Object(c.useEffect)((function(){d((function(){return n*b}))}),[n,b]),Object(v.jsxs)("div",{id:"swap-raca",children:[Object(v.jsx)("input",{id:"RACA",type:"number",value:n,onChange:u}),Object(v.jsx)("span",{children:" ~ "}),Object(v.jsxs)("span",{id:"USD",children:[s," USD"]})]})},_=n(226),I=n(227),C=n(225),E=n(228),P=n(229),A=n(230),M=n(231),D=(n(158),function(e,t){return k()("https://market-api.radiocaca.com/nft-sales?pageSize=".concat(t,"&sortBy=fixed_price&order=asc&category=").concat(e,"&tokenId=-1"),{"Access-Control-Allow-Origin":"*"})});function F(e){return null===e||void 0===e?void 0:e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}var B=function(e){var t=e.hidden,n=Object(c.useState)([]),a=Object(O.a)(n,2),r=a[0],i=a[1],s=Object(c.useState)([]),d=Object(O.a)(s,2),u=d[0],b=d[1],h=Object(c.useState)([]),p=Object(O.a)(h,2),m=p[0],x=p[1],f=Object(c.useState)([]),g=Object(O.a)(f,2),w=g[0],y=g[1],k=Object(c.useState)({}),B=Object(O.a)(k,2),L=B[0],T=B[1],z=Object(c.useState)({}),R=Object(O.a)(z,2),H=R[0],q=R[1],J=Object(c.useState)({}),W=Object(O.a)(J,2),U=W[0],G=W[1],K=Object(c.useState)({}),X=Object(O.a)(K,2),Y=X[0],Q=X[1],Z=Object(c.useState)(0),V=Object(O.a)(Z,2),$=V[0],ee=V[1],te=Object(c.useState)(""),ne=Object(O.a)(te,2),ce=ne[0],ae=ne[1],re=function(){var e=new Date;ae(e.toLocaleString())},ie=Object(j.c)((function(e){return e.price})),se=ie.raca,oe=ie.elmon,le=ie.elcoin,je=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all([D(13,10).then((function(e){return i(e.data.list)})),D(15,10).then((function(e){return y(e.data.list)})),D(16,10).then((function(e){return b(e.data.list)})),D(17,10).then((function(e){return x(e.data.list)})),D(20,1).then((function(e){var t;T(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),D(23,1).then((function(e){var t;G(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),D(7,1).then((function(e){var t;Q(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")})),D(46,1).then((function(e){var t;q(e.data.list[0]),null===(t=document.querySelector(".loading"))||void 0===t||t.classList.toggle("loading")}))]));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){ee(se)}),[se]),Object(c.useEffect)((function(){je(),re();var e=setInterval((function(){je(),re()}),2e4);return function(){i([]),b([]),x([]),y([]),T({}),ee(0),clearInterval(e)}}),[]),Object(v.jsxs)("div",{hidden:t,children:[Object(v.jsxs)("div",{className:"priceToken",children:[Object(v.jsxs)("p",{className:"tokenPrice",children:["RACA: ",se]}),Object(v.jsxs)("p",{className:"tokenPrice",children:["ELMON: ",oe]}),Object(v.jsxs)("p",{className:"tokenPrice",children:["ELCOIN: ",le]})]}),Object(v.jsx)(N,{}),Object(v.jsx)("p",{id:"timeUpdated",children:ce}),Object(v.jsxs)("div",{className:"pricetable",children:[Object(v.jsx)(_.a,{id:"table-scroll",component:I.a,children:Object(v.jsxs)(C.a,{id:"tablePrice","aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(P.a,{children:[Object(v.jsx)(A.a,{align:"center",children:"#"}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/metamon.png",alt:"Metamon"})}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/MetamonEgg.png",alt:"Egg"})}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{width:"50px",height:"50px",src:"/marketplaceraca/DiamondYellow.png",alt:"DiamondYellow"})}),Object(v.jsx)(A.a,{align:"center",children:Object(v.jsx)("img",{style:{objectFit:"contain"},width:"50px",height:"50px",src:"/marketplaceraca/potion.png",alt:"Potion"})})]})}),Object(v.jsx)(M.a,{children:m&&r&&u&&w&&m.map((function(e,t){var n,c,a,i,s,o,l,j;return Object(v.jsxs)(P.a,{children:[Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:t+1}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(n=r[t])||void 0===n?void 0:n.fixed_price))," (~",($*(null===(c=r[t])||void 0===c?void 0:c.fixed_price)).toFixed(2),")"]}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(a=m[t])||void 0===a?void 0:a.fixed_price))," (~",($*(null===(i=m[t])||void 0===i?void 0:i.fixed_price)).toFixed(2),")"]}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(s=u[t])||void 0===s?void 0:s.fixed_price))," (~",($*(null===(o=u[t])||void 0===o?void 0:o.fixed_price)).toFixed(2),")"]}),Object(v.jsxs)(A.a,{align:"center",children:[F(Math.floor(null===(l=w[t])||void 0===l?void 0:l.fixed_price))," (~",($*(null===(j=w[t])||void 0===j?void 0:j.fixed_price)).toFixed(2),")"]})]},t+1)}))})]})}),Object(v.jsxs)("div",{id:"xike",children:[Object(v.jsx)("p",{children:"X\xecke Captain"}),Object(v.jsx)("img",{alt:"Xike",src:"/marketplaceraca/xike.png"})]})]}),Object(v.jsxs)("div",{className:"cards",children:[U&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:U})}),H&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:H})}),Y&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:Y})}),L&&Object(v.jsx)("div",{className:"card loading",children:Object(v.jsx)(S,{nft:L})})]})]})},L=n(21),T=n(232),z=n(219),R=n(214),H=n(115),q={apiKey:"AIzaSyCQItrkH9bp7aT1yiwobbNbHtXcKcZ45Qk",authDomain:"sales-nft-raca.firebaseapp.com",projectId:"sales-nft-raca",storageBucket:"sales-nft-raca.appspot.com",messagingSenderId:"547281695761",appId:"1:547281695761:web:bade483d397ca7e9cd2db0"},J=n(62);n(159);function W(e,t,n,c,a){var r=t*a/100,i=n*a/100,s=r-i,o=c*a/100;return{name:e,sales:r,cost:i,profit:s,withdraw:o,remain:s-o}}var U=function(e,t){return k.a.get("https://market-api.radiocaca.com/users/0x10201091597635eC7b8e208306E6aDCC7c167925/histories?pageNo=".concat(e,"&pageSize=").concat(t))},G=function(){var e=Object(c.useState)([]),t=Object(O.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),s=Object(O.a)(i,2),j=s[0],d=s[1],u=Object(c.useState)([]),h=Object(O.a)(u,2),p=h[0],m=h[1],x=Object(c.useState)(!1),f=Object(O.a)(x,2),g=f[0],w=f[1];return Object(c.useEffect)((function(){var e=0,t=1,n=[],c=function(){var c=Object(l.a)(o.a.mark((function c(){var a;return o.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return c.next=2,U(t,10);case 2:a=c.sent,t++,e=a.data.total,n=[].concat(Object(L.a)(n),Object(L.a)(a.data.list));case 6:if(n.length<e){c.next=0;break}case 7:r(n);case 8:case"end":return c.stop()}}),c)})));return function(){return c.apply(this,arguments)}}();c();var a=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n,c,a,r,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(H.a)(q),n=Object(J.c)(t),c=Object(J.e)(Object(J.a)(n,"Transaction"),Object(J.d)("time")),e.next=5,Object(J.b)(c);case 5:a=e.sent,r=[],a.forEach((function(e){r.push(e.data())})),i=r.map((function(e){return Object(b.a)(Object(b.a)({},e),{},{time:new Date(1e3*e.time.seconds).toLocaleString().split(",")[0]})})),m(i);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return a(),function(){r([]),m([])}}),[]),Object(c.useEffect)((function(){var e=n.filter((function(e){return 407301===e.nft_token_id})),t=n.filter((function(e){return 403545===e.nft_token_id})),c=e.reduce((function(e,t){return t.time>Date.parse("12/28/2021")/1e3&&(t.fee=5*Number(t.amount)/100),e+(Number(t.amount)-Number(t.fee))}),0),a=t.reduce((function(e,t){return e+Number(t.amount)}),0),r=0,i=0;p.forEach((function(e,t){e.transfer?r+=Number(e.amount):i+=Number(e.amount)}),0),0!==c&&(c-=2700),d([W("Johny Duc",c,a+=i,r,40),W("Khang Pug",c,a,r,40),W("Duc Professor",c,a,r,20),W("Total",c,a,r,100)])}),[n,p]),Object(v.jsxs)("div",{className:"sales",children:[Object(v.jsx)(_.a,{id:"sales-section",component:I.a,children:Object(v.jsxs)(C.a,{sx:{minWidth:650},"aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(P.a,{children:[Object(v.jsx)(A.a,{children:"Name"}),Object(v.jsx)(A.a,{align:"center",children:"Sales"}),Object(v.jsx)(A.a,{align:"center",children:"Cost"}),Object(v.jsx)(A.a,{align:"center",children:"Profit"}),Object(v.jsx)(A.a,{align:"center",children:"Withdraw"}),Object(v.jsx)(A.a,{align:"center",children:"Remain"})]})}),Object(v.jsxs)(M.a,{children:[n&&j&&j.map((function(e){return Object(v.jsxs)(P.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(v.jsx)(A.a,{component:"th",scope:"row",children:e.name}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.sales))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.cost))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.profit))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.withdraw))}),Object(v.jsx)(A.a,{align:"center",children:F(Math.floor(e.remain))})]},e.name)})),!n&&Object(v.jsx)(P.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:Object(v.jsx)(A.a,{component:"th",scope:"row",children:Object(v.jsx)(T.a,{size:"small",color:"success"})})})]})]})}),Object(v.jsxs)("div",{id:"withdraw-history",children:[Object(v.jsx)("h2",{style:{textAlign:"left"},children:"Withdraw History"}),Object(v.jsxs)("div",{id:"addTransaction",children:[Object(v.jsx)(z.a,{size:"medium",id:"toggleButton",onClick:function(){w((function(e){return!e}))},variant:"contained",children:"Add Transaction"}),g&&Object(v.jsxs)(a.a.StrictMode,{children:[Object(v.jsx)(R.a,{type:"number",label:"Amount",variant:"outlined",size:"small",style:{marginBottom:"10px"}}),Object(v.jsx)(R.a,{label:"Notes",variant:"outlined",size:"small",id:"notes",style:{marginBottom:"10px"}}),Object(v.jsx)(z.a,{id:"addButton",size:"medium",variant:"contained",children:"Add"})]})]}),Object(v.jsx)(_.a,{id:"withdraw",component:I.a,children:Object(v.jsxs)(C.a,{sx:{minWidth:250},"aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(P.a,{children:[Object(v.jsx)(A.a,{children:"Time"}),Object(v.jsx)(A.a,{align:"center",children:"Amount"}),Object(v.jsx)(A.a,{align:"center",children:"Note"})]})}),Object(v.jsx)(M.a,{children:p&&p.map((function(e,t){return Object(v.jsxs)(P.a,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[Object(v.jsx)(A.a,{component:"th",scope:"row",children:e.time}),Object(v.jsx)(A.a,{align:"center",children:F(e.amount)}),Object(v.jsx)(A.a,{align:"center",children:F(e.notes)})]},t)}))})]})})]})]})},K=n(6),X=n(235),Y=n(216),Q=n(211),Z=n(215),V=function(e){e.getFilter;var t,n=Object(j.b)(),a=Object(j.c)((function(e){return e.filters})),r=window.localStorage,i=Object(c.useState)(a.arrange),s=Object(O.a)(i,2),o=s[0],l=s[1],u=Object(c.useState)(a.minScore),b=Object(O.a)(u,2),h=b[0],p=b[1],x=Object(c.useState)(a.level),f=Object(O.a)(x,2),g=f[0],w=f[1];return Object(v.jsxs)(X.a,{sx:{marginTop:"20px",color:"#fff"},children:[Object(v.jsxs)(m.a,{sx:{display:"flex",alignItems:"end"},children:[Object(v.jsx)(R.a,{value:h,onChange:function(e){p(e.target.value)},sx:{color:"#fff",width:100,marginRight:"0.5rem"},id:"min-score",label:"Min score",variant:"standard",type:"number"}),Object(v.jsx)(R.a,{value:g,onChange:function(e){w(e.target.value)},sx:{color:"#fff",width:100,marginRight:"0.5rem"},id:"level",label:"Level",variant:"standard",type:"number"}),Object(v.jsx)(z.a,{sx:(t={color:"#fff",height:"100%"},Object(K.a)(t,"color","#383838"),Object(K.a)(t,"background","#fcc33c"),t),variant:"contained",onClick:function(){n(function(e){return{type:"handleFilters",payload:{minScore:e.minScore,level:e.level}}}({minScore:h,level:g})),l(0),r.setItem("metamon",JSON.stringify({score:h,levelMetamon:g}))},children:"Confirm"})]}),Object(v.jsx)(m.a,{children:Object(v.jsx)(Y.a,{style:{margin:"20px 0"},children:Object(v.jsxs)(Q.a,{size:"small",labelId:"select",id:"filter",value:o,onChange:function(e){l(e.target.value),n(d(e.target.value))},sx:{color:"#fff"},children:[Object(v.jsx)(Z.a,{value:0,children:"Lowest Price"}),Object(v.jsx)(Z.a,{value:1,children:"Highest Level"}),Object(v.jsx)(Z.a,{value:2,children:"Highest Score"})]})})})]})},$=(n(161),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:315,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return k()("https://market-api.radiocaca.com/nft-sales?saleType&category=13&tokenType&tokenId=-1&pageNo=".concat(n,"&pageSize=100&sortBy=single_price&order=asc&min_level=").concat(t,"&max_level=60&min_score=").concat(e,"&max_score=330"),{"Access-Control-Allow-Origin":"*"})}),ee=function(){var e=Object(j.c)((function(e){return e.filters})),t=e.minScore,n=e.level,a=e.arrange,r=Object(c.useState)([]),i=Object(O.a)(r,2),s=i[0],u=i[1],b=Object(c.useState)([]),h=Object(O.a)(b,2),p=h[0],x=h[1],f=Object(j.b)(),g=Object(j.c)((function(e){return e.price})).raca,w=function(e){},y=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,$(t,n,1).then(function(){var e=Object(l.a)(o.a.mark((function e(c){var a,r,i,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=c.data,r=c.data.list,i=1;case 3:if(!(i<=Math.floor(a.total/100))){e.next=11;break}return e.next=6,$(t,n,i+1).then((function(e){return e.data.list}));case 6:s=e.sent,r=r.concat(s);case 8:i++,e.next=3;break;case 11:u(r);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){return y(),f(d(0)),function(){u([])}}),[t,n]),Object(c.useEffect)((function(){var e=function(e){return s.sort((function(t,n){return"fixed_price"===e?Number(t[e])-Number(n[e]):Number(n[e])-Number(t[e])}))};switch(a){case 0:x(e("fixed_price").slice(0,10));break;case 1:x(e("level").slice(0,10));break;case 2:x(e("score").slice(0,10))}return function(){x([])}}),[s,a]),Object(v.jsxs)(m.a,{sx:{textAlign:"left"},children:[Object(v.jsx)(V,{}),Object(v.jsx)(_.a,{id:"table-scroll",component:I.a,children:Object(v.jsxs)(C.a,{id:"tablePrice","aria-label":"simple table",children:[Object(v.jsx)(E.a,{children:Object(v.jsxs)(P.a,{children:[Object(v.jsx)(A.a,{align:"center",children:"#"}),Object(v.jsx)(A.a,{align:"center"}),Object(v.jsx)(A.a,{align:"center",children:"ID"}),Object(v.jsx)(A.a,{align:"center",children:"Score"}),Object(v.jsx)(A.a,{align:"center",children:"Level"}),Object(v.jsx)(A.a,{align:"center",sx:{width:"25%"},children:"Price"})]})}),Object(v.jsx)(M.a,{children:p&&p.map((function(e,t){return Object(v.jsxs)(P.a,{children:[Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:t+1}),Object(v.jsx)(A.a,{id:"metamon-".concat(t+1),onMouseEnter:w,align:"center",component:"th",scope:"row",sx:{position:"relative"},children:Object(v.jsx)("img",{width:"50px",height:"50px",src:e.image_url,alt:"Metamon"})}),Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:Object(v.jsx)("a",{href:"https://market.radiocaca.com/#/market-place/".concat(e.id),target:"_blank",style:{color:"#fff",textDecoration:"none"},rel:"noreferrer",children:e.token_id})}),Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:null===e||void 0===e?void 0:e.score}),Object(v.jsx)(A.a,{align:"center",component:"th",scope:"row",children:null===e||void 0===e?void 0:e.level}),Object(v.jsxs)(A.a,{align:"center",component:"th",scope:"row",children:[F(e.fixed_price)," (~",(g*e.fixed_price).toFixed(2),")"]})]},t+1)}))})]})})]})},te=function(){var e=Object(j.c)((function(e){return e.filtersElemon})),t=e.min,n=e.max,a=e.sort,r=Object(c.useState)(t),i=Object(O.a)(r,2),s=i[0],o=i[1],l=Object(c.useState)(n),d=Object(O.a)(l,2),b=d[0],h=d[1],p=Object(c.useState)(a),x=Object(O.a)(p,2),f=(x[0],x[1]),g=Object(c.useState)(),w=Object(O.a)(g,2),y=w[0],k=(w[1],Object(j.b)());Object(c.useEffect)((function(){o(t)}),[t]);return Object(v.jsx)("div",{className:"filters",children:Object(v.jsx)("div",{className:"filter-content",children:Object(v.jsxs)("div",{className:"filter-top",children:[Object(v.jsxs)("select",{onChange:function(e){f(e.target.value),k(function(e){return{type:"handleSort",payload:e}}(e.target.value))},className:"market__select",children:[Object(v.jsx)("option",{value:"0",children:"Lowest price"}),Object(v.jsx)("option",{value:"1",children:"Highest price"}),Object(v.jsx)("option",{value:"2",children:"Lowest Point"}),Object(v.jsx)("option",{value:"3",children:"Highest Point"})]}),Object(v.jsxs)("select",{onChange:function(e){k({type:"handleName",payload:e.target.value})},className:"market__select",children:[Object(v.jsx)("option",{value:"0",children:"Elemon name"}),Object(v.jsx)("option",{value:"4",children:"Neikoo"}),Object(v.jsx)("option",{value:"8",children:"Skurumi"}),Object(v.jsx)("option",{value:"9",children:"RusMoonch"}),Object(v.jsx)("option",{value:"10",children:"PoxArchies"}),Object(v.jsx)("option",{value:"11",children:"Legolas"}),Object(v.jsx)("option",{value:"12",children:"Mykasa"}),Object(v.jsx)("option",{value:"15",children:"Hyugar"}),Object(v.jsx)("option",{value:"16",children:"Inori"}),Object(v.jsx)("option",{value:"22",children:"Kuroo"}),Object(v.jsx)("option",{value:"17",children:"Elight"}),Object(v.jsx)("option",{value:"20",children:"Finter"}),Object(v.jsx)("option",{value:"21",children:"Ties"}),Object(v.jsx)("option",{value:"26",children:"Hoorus"}),Object(v.jsx)("option",{value:"6",children:"Raizer"}),Object(v.jsx)("option",{value:"19",children:"Scary"}),Object(v.jsx)("option",{value:"13",children:"Cokoner"})]}),Object(v.jsx)("input",{onBlur:function(e){var t;k({type:"handleTokenId",payload:null===(t=e.target)||void 0===t?void 0:t.value})},className:"market__input",placeholder:"Elemon Id",value:y,type:"number"}),Object(v.jsxs)(m.a,{className:"filter_power",children:[Object(v.jsx)(R.a,{value:s,onChange:function(e){o(e.target.value)},sx:{width:100,marginRight:"0.5rem"},id:"min-power",label:"Min",variant:"standard",type:"number"}),Object(v.jsx)(R.a,{value:b,onChange:function(e){h(e.target.value)},sx:{width:100,marginRight:"0.5rem"},id:"max-power",label:"Max",variant:"standard",type:"number"}),Object(v.jsx)(z.a,{sx:{height:"100%",color:"#383838",background:"#fcc33c"},variant:"contained",onClick:function(){k(u({minPower:s,maxPower:b})),f(0)},children:"Confirm"})]})]})})})},ne=(n(109),n(221)),ce=function(e){var t=e.elemon,n="0x10201091597635eC7b8e208306E6aDCC7c167925"===t.ownerAddress,c="https://app.elemon.io",a=[t.bodyPart1,t.bodyPart2,t.bodyPart3,t.bodyPart4,t.bodyPart5,t.bodyPart6];return Object(v.jsxs)("div",{className:"character-item owner",children:[Object(v.jsxs)("div",{className:"head",children:[Object(v.jsxs)("p",{className:"id",children:["ID: ",t.tokenId]}),Object(v.jsx)("div",{className:"character-type",children:Object(v.jsx)("img",{"img-rarity":"",src:"".concat(c,"/assets/images/rarity_").concat(["B","A","S","SS","SSS"][t.rarity-1],".png")})})]}),Object(v.jsxs)("div",{className:"content",children:[Object(v.jsxs)("div",{className:"img",children:[Object(v.jsxs)("div",{className:"img-left",children:[Object(v.jsx)("div",{className:"icon",children:Object(v.jsx)("img",{src:"".concat(c,"/assets/images/element/").concat(["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"][t.class-1],".png")})}),Object(v.jsx)("p",{className:"icon_text",children:Object(v.jsx)("span",{children:Object(v.jsx)("img",{src:"".concat(c,"/assets/images/purity_").concat(0==t.purity?"Hybrid":"Pure",".png"),style:{width:"100%"}})})})]}),Object(v.jsx)("img",{"img-elemon":"",src:"https://statics.elemon.io/avatar/".concat(t.baseCardId,"/").concat(t.baseCardId,"_").concat(a.join("_"),".png"),className:"main"}),Object(v.jsx)("div",{className:"img_aura quality_".concat(t.quality)})]}),Object(v.jsxs)("div",{className:"text",children:[Object(v.jsxs)("p",{className:"price",children:[Object(v.jsx)("img",{src:"".concat(c,"/assets/images/busd_ticker.png"),width:"40",alt:""}),t.lastPrice/1e18," BUSD"]}),Object(v.jsxs)("div",{className:"element",children:[Object(v.jsx)("div",{className:"icon",children:Object(v.jsx)("img",{src:"".concat(c,"/assets/images/icon-power.png"),alt:""})}),Object(v.jsx)("p",{className:"element__name","data-power":"",children:F(t.point)})]}),Object(v.jsx)("a",{target:"_blank",href:"https://app.elemon.io/elemon/".concat(t.tokenId),className:"box__btn buy ".concat(n?"owner":""),type:"button",children:n?"My Elemon":"Info"})]})]})]})},ae=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:20,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2;return k.a.get("https://app.elemon.io/market/getElemonItems?pageNumber=".concat(e,"&pageSize=").concat(t,"&positionType=2&priceMode=").concat(n,"&baseCardId=&tokenId=&rarities=&classes=&purities=")).then((function(e){return e.data}),{headers:{"Access-Control-Allow-Origin":"*"}})},re=function(e){var t=e.map((function(e){return e.tokenId}));return k.a.get("https://app.elemon.io/elemon/GetElemonInfo?tokenId=".concat(null===t||void 0===t?void 0:t.join(","))).then((function(e){return e.data}),{headers:{"Access-Control-Allow-Origin":"*"}}).catch((function(e){return e}))},ie=function(){var e=Object(c.useState)([]),t=Object(O.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)([]),s=Object(O.a)(i,2),d=s[0],h=s[1],p=Object(c.useState)(""),x=Object(O.a)(p,2),f=x[0],g=x[1],w=Object(c.useState)(!0),y=Object(O.a)(w,2),k=y[0],S=y[1],N=Object(c.useState)([]),_=Object(O.a)(N,2),I=_[0],C=_[1],E=Object(c.useState)(),P=Object(O.a)(E,2),A=P[0],M=P[1],D=Object(j.c)((function(e){return e.filtersElemon})),F=D.min,B=D.max,L=D.sort,z=D.name,R=D.tokenId,H=Object(j.b)();return Object(c.useEffect)((function(){var e=function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae(1,100).then(function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ae(1,t.paging.totalCount).then((function(e){return r(e.data)}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),function(){var e=new Date;g(e.toLocaleString())}(),function(){r([])}}),[]),a.a.useEffect((function(){var e=function(){var e=Object(l.a)(o.a.mark((function e(){var t,c,a,r,i;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S(!0),t=250,c=n.length,a=c%t===0?c/t:c/t+1,r=o.a.mark((function e(a){var r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=c%t!==0&&c-a*t<0?(a-1)*t+c%t:a*t,e.next=3,re(null===n||void 0===n?void 0:n.slice((a-1)*t,r)).then((function(e){var c=n.slice((a-1)*t,r).map((function(t,n){try{var c,a;if("0x10201091597635eC7b8e208306E6aDCC7c167925"===t.ownerAddress&&void 0!=n)t.point=null===(a=e.data[n])||void 0===a?void 0:a.point,H(u({minPower:t.point-(t.point%1e5+5e4),maxPower:B})),M(t);return Object(b.a)(Object(b.a)({},t),{},{point:null===e||void 0===e||null===(c=e.data[n])||void 0===c?void 0:c.point})}catch(r){console.log(r)}}));h((function(e){return e.concat(c)}))}));case 3:case"end":return e.stop()}}),e)})),i=1;case 6:if(!(i<=a)){e.next=11;break}return e.delegateYield(r(i),"t0",8);case 8:i++,e.next=6;break;case 11:S(!1);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return e(),function(){h([])}}),[n]),Object(c.useEffect)((function(){var e=d.filter((function(e){var t=B,n=F;if(R)return e.tokenId==R;var c=function(t,n){return!t||(1==n?e.point>=t:e.point<=t)};return 0!==Number(z)?c(n,1)&&c(t,2)&&e.baseCardId==z:c(n,1)&&c(t,2)})).sort((function(e,t){switch(Number(L)){case 0:return e.lastPrice>=t.lastPrice?1:-1;case 1:return e.lastPrice<=t.lastPrice?1:-1;case 2:return e.point>=t.point?1:-1;case 3:return e.point<=t.point?1:-1}}));return C(e),function(){C([])}}),[k,F,B,L,z,R]),Object(v.jsx)(m.a,{children:Object(v.jsxs)(m.a,{sx:{textAlign:"center"},children:[Object(v.jsx)(te,{}),Object(v.jsx)("p",{className:"timeUpdate",children:f}),Object(v.jsxs)(ne.a,{container:!0,spacing:1,children:[A&&Object(v.jsx)(ne.a,{item:!0,xs:6,md:4,lg:2.2,children:Object(v.jsx)(ce,{elemon:A})}),I&&(null===I||void 0===I?void 0:I.slice(0,100).map((function(e,t){return Object(v.jsx)(ne.a,{item:!0,xs:6,md:4,lg:2.2,children:Object(v.jsx)(ce,{elemon:e})},t)})))]}),k&&Object(v.jsx)(T.a,{})]})})};function se(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}}var oe=function(e){var t=window.localStorage,n=void 0===t.getItem("tab")?0:t.getItem("tab"),a=Object(c.useState)(Number(n)),r=Object(O.a)(a,2),i=r[0],s=r[1];return Object(v.jsxs)(m.a,{sx:{width:"100%"},children:[Object(v.jsx)(m.a,{id:"tabs",sx:{borderBottom:1,borderColor:"divider"},children:Object(v.jsxs)(h.a,{value:i,sx:{color:"#ffffff"},onChange:function(e,n){s(n),t.setItem("tab",n)},children:[Object(v.jsx)(p.a,Object(b.a)({label:"Raca"},se(0))),Object(v.jsx)(p.a,Object(b.a)({label:"Metamon"},se(1))),Object(v.jsx)(p.a,Object(b.a)({label:"Elemon"},se(2))),Object(v.jsx)(p.a,Object(b.a)({label:"Sales"},se(3)))]})}),Object(v.jsx)(w,{value:i,index:0,children:Object(v.jsx)(B,{})}),Object(v.jsx)(w,{value:i,index:1,children:Object(v.jsx)(ee,{})}),Object(v.jsx)(w,{value:i,index:2,children:Object(v.jsx)(ie,{})}),Object(v.jsx)(w,{value:i,index:3,children:Object(v.jsx)(G,{})})]})};var le=function(){var e=Object(j.b)(),t=function(){var t=Object(l.a)(o.a.mark((function t(){var n,c,a;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,k.a.get("https://api.pancakeswap.info/api/v2/tokens/0x12bb890508c125661e03b09ec06e404bc9289040").then((function(e){return Number(e.data.data.price).toFixed(8)}));case 2:return n=t.sent,t.next=5,k.a.get("https://api.coingecko.com/api/v3/simple/price?ids=elemon&vs_currencies=usd").then((function(e){return e.data.elemon.usd}));case 5:return c=t.sent,t.next=8,k.a.get("https://api.pancakeswap.info/api/v2/tokens/0x092ffbc968203b652b08361adec75e275573f2db").then((function(e){return Number(e.data.data.price).toFixed(8)}));case 8:a=t.sent,document.title=n+" - Marketplace RACA",e({type:"updatePrice",payload:{raca:n,elmon:c,elcoin:a}});case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(c.useEffect)((function(){t();var e=setInterval(Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t();case 1:case"end":return e.stop()}}),e)}))),2e4);return function(){clearInterval(e)}}),[]),Object(v.jsx)("div",{className:"App",children:Object(v.jsx)(oe,{})})},je=n(218),de=window.localStorage,ue={filters:{minScore:void 0==de.getItem("metamon")?315:JSON.parse(de.getItem("metamon")).score,level:void 0==de.getItem("metamon")?20:JSON.parse(de.getItem("metamon")).levelMetamon,arrange:0},price:{raca:0,elmon:0},filtersElemon:{sort:0,name:0,tokenId:"",rarity:"",purity:"",price:"",min:"",max:""},tab:0},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ue,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"handleFilters":return Object(b.a)(Object(b.a)({},e),{},{filters:Object(b.a)(Object(b.a)({},e.filters),{},{minScore:t.payload.minScore,level:t.payload.level})});case"handleArrange":return Object(b.a)(Object(b.a)({},e),{},{filters:Object(b.a)(Object(b.a)({},e.filters),{},{arrange:t.payload})});case"handlePower":return Object(b.a)(Object(b.a)({},e),{},{filtersElemon:Object(b.a)(Object(b.a)({},e.filtersElemon),{},{min:t.payload.min,max:t.payload.max})});case"handleSort":return Object(b.a)(Object(b.a)({},e),{},{filtersElemon:Object(b.a)(Object(b.a)({},e.filtersElemon),{},{sort:t.payload})});case"handleName":return Object(b.a)(Object(b.a)({},e),{},{filtersElemon:Object(b.a)(Object(b.a)({},e.filtersElemon),{},{name:t.payload})});case"handleTokenId":return Object(b.a)(Object(b.a)({},e),{},{filtersElemon:Object(b.a)(Object(b.a)({},e.filtersElemon),{},{tokenId:t.payload})});case"updatePrice":return Object(b.a)(Object(b.a)({},e),{},{price:t.payload});default:return e}},Oe=Object(je.a)(be),he=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,236)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),a(e),r(e),i(e)}))};i.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(j.a,{store:Oe,children:Object(v.jsx)(le,{})})}),document.getElementById("root")),he()},96:function(e,t,n){}},[[162,1,2]]]);
//# sourceMappingURL=main.6987a32e.chunk.js.map