(this["webpackJsonpkeep-the-lights-on"]=this["webpackJsonpkeep-the-lights-on"]||[]).push([[0],{90:function(e,t,r){"use strict";r.r(t);var s,a=r(105),n=r(0),c=r.n(n),i=r(36),o=r.n(i),h=r(33),u=r(108),d=r(72),l=r(102),b=r(103),j=r(104),m=r(99),x=r(109),p=r(101),O=r(18),f=function(e){return O.a.fromMantissaExponent(e.man,e.exp)},y=function(e){var t=new O.a(e);return{man:t.mantissa,exp:t.exponent}},P=function(e,t){return y(O.a.add(f(e),f(t)))},w=function(e,t){return y(O.a.subtract(f(e),f(t)))},v=function(e,t){return y(O.a.multiply(f(e),f(t)))},g=function(e,t){return y(O.a.divide(f(e),f(t)))},C=function(e,t){return y(O.a.max(f(e),f(t)))},A=function(e,t){return y(O.a.min(f(e),f(t)))},S=function(e,t){return O.a.compare(f(e),f(t))},D=function(e){return f(e).toString()},G=r(48),k=r(17);!function(e){e.hamsters="hamsters",e.pinwheels="pinwheels",e.bicycle="bicycle"}(s||(s={}));var R,z={hamsters:{name:"Hamster",colorText:"Watch those little legs go!",baseCost:y(.25),costOfNthGenerator:function(e){return y(.25*e)}},pinwheels:{name:"Pinwheel",colorText:"One day you'll build a great wind farm.",baseCost:y(2),costOfNthGenerator:function(e){return y(2*e)}},bicycle:{name:"Human-powered Bicycle",colorText:"You can make it up the hill, just keep pedaling!",baseCost:y(20),costOfNthGenerator:function(e){return y(5*(e-1)+20)}}},E=Object.keys(s).sort((function(e,t){return S(z[e].baseCost,z[t].baseCost)})),I={hamsters:{numberOwned:0,wattsPerDay:y(.5),nextPurchaseCost:z.hamsters.baseCost},pinwheels:{numberOwned:0,wattsPerDay:y(2),nextPurchaseCost:z.pinwheels.baseCost},bicycle:{numberOwned:0,wattsPerDay:y(10),nextPurchaseCost:z.pinwheels.baseCost}},T=function(e,t){return-1!==S(e,t.nextPurchaseCost)};!function(e){e.juniorResearchAssistant="juniorResearchAssistant",e.researchAssistant="researchAssistant"}(R||(R={}));var H,N={juniorResearchAssistant:{name:"Junior Research Assistant",colorText:"Maybe recruiting your 12 year old cousin wasn't the best idea.",baseCost:y(5),costOfNthResearcher:function(e){return y(2*e+3)}},researchAssistant:{name:"Research Assistant",colorText:"The honors students from your high school are interested in your project. They might be helpful.",baseCost:y(25),costOfNthResearcher:function(e){return y(10*e+15)}}},W=Object.keys(R).sort((function(e,t){return S(N[e].baseCost,N[t].baseCost)})),M={juniorResearchAssistant:{numberEmployed:0,ideasPerDay:y(.5),nextPurchaseCost:N.juniorResearchAssistant.baseCost},researchAssistant:{numberEmployed:0,ideasPerDay:y(3),nextPurchaseCost:N.researchAssistant.baseCost}},$=function(e,t){return-1!==S(e,t.nextPurchaseCost)},U={daysElapsed:y(0),ticksPerDay:16,cashAvailable:y(1),maxCashAvailable:y(0),cashEarnedPerDay:y(0),homesPowered:y(0),homesInPowerGrid:y(1),wattsUsedPerHomePerDay:y(20),pricePerWatt:y(.03),wattsGeneratedPerDay:y(0),ideasAvailable:y(0),maxIdeasAvailable:y(0),ideasGeneratedPerDay:y(0)},B=function(e,t){var r=function(e,t){var r=e.daysElapsed;return t%e.ticksPerDay===0?P(r,y(1)):r}(e,t),s=function(e){var t=e.ticksPerDay,r=e.cashAvailable,s=e.homesInPowerGrid,a=e.wattsUsedPerHomePerDay,n=e.pricePerWatt,c=e.wattsGeneratedPerDay,i=A(c,v(s,a)),o=v(i,n);return P(r,g(o,y(t)))}(e),a=C(s,e.maxCashAvailable),n=function(e){var t=e.ticksPerDay,r=e.ideasAvailable,s=e.ideasGeneratedPerDay,a=g(s,y(t));return P(r,a)}(e),c=C(n,e.maxCashAvailable);return Object(k.a)(Object(k.a)({},e),{},{daysElapsed:r,cashAvailable:s,maxCashAvailable:a,ideasAvailable:n,maxIdeasAvailable:c})},J=function(e,t,r){var s,a=function(e){return Object.values(e).reduce((function(e,t){return P(e,v(y(t.numberOwned),t.wattsPerDay))}),y(0))}(t),n=A(a,v(e.homesInPowerGrid,e.wattsUsedPerHomePerDay)),c=v(n,e.pricePerWatt),i=A(e.homesInPowerGrid,g(a,e.wattsUsedPerHomePerDay)),o=(s=r,Object.values(s).reduce((function(e,t){return P(e,v(y(t.numberEmployed),t.ideasPerDay))}),y(0)));return Object(k.a)(Object(k.a)({},e),{},{cashEarnedPerDay:c,homesPowered:i,wattsGeneratedPerDay:a,ideasGeneratedPerDay:o})},q=function(e,t){var r=w(e.cashAvailable,t);return e.cashAvailable=r,e};!function(e){e.expandGrid1="expandGrid1",e.expandGrid2="expandGrid2"}(H||(H={}));var F=[{identifier:H.expandGrid1,name:"Power the Street",description:"Expand your power grid to provide power to your whole street",cost:y(100),requiresResearchProjects:[],applyResearch:function(e){return e.currentStatistics.homesInPowerGrid=y(10),e}},{identifier:H.expandGrid2,name:"Power the Neighborhood",description:"Expand your power grid to provide power to your whole street",cost:y(2e3),requiresResearchProjects:[],applyResearch:function(e){return e.currentStatistics.homesInPowerGrid=y(100),e}}],L={currentStatistics:U,generators:I,researchers:M,purchasedResearchProjects:[]},K=Object(G.b)({name:"game",initialState:L,reducers:{tick:function(e,t){e.currentStatistics=B(e.currentStatistics,t.payload)},updateTicksPerDay:function(e,t){e.currentStatistics.ticksPerDay=t.payload},buyGenerator:function(e,t){var r=t.payload,s=e.currentStatistics,a=e.generators,n=e.researchers,c=s.cashAvailable,i=a[r];if(T(c,i)){var o=i.nextPurchaseCost;e.generators[r]=function(e,t){var r=t.numberOwned,s=z[e].costOfNthGenerator(r+2);return Object(k.a)(Object(k.a)({},t),{},{numberOwned:r+1,nextPurchaseCost:s})}(r,i),e.currentStatistics=q(s,o),e.currentStatistics=J(s,a,n)}},buyResearcher:function(e,t){var r=t.payload,s=e.currentStatistics,a=e.generators,n=e.researchers,c=s.cashAvailable,i=n[r];if($(c,i)){var o=i.nextPurchaseCost;e.researchers[r]=function(e,t){var r=t.numberEmployed,s=N[e].costOfNthResearcher(r+2);return Object(k.a)(Object(k.a)({},t),{},{numberEmployed:r+1,nextPurchaseCost:s})}(r,i),e.currentStatistics=q(s,o),e.currentStatistics=J(s,a,n)}},purchaseResearchProject:function(e,t){var r=F.find((function(e){return e.identifier===t.payload}));r&&-1!==S(e.currentStatistics.ideasAvailable,r.cost)&&((e=r.applyResearch(e)).currentStatistics.ideasAvailable=w(e.currentStatistics.ideasAvailable,r.cost),e.purchasedResearchProjects.push(t.payload))}}}),Y=K.actions,Q=Y.tick,V=Y.buyGenerator,X=Y.buyResearcher,Z=Y.purchaseResearchProject,_=(Y.updateTicksPerDay,function(e){return e.game.generators}),ee=function(e){return e.game.researchers},te=function(e){return e.game.currentStatistics.ticksPerDay},re=function(e){return e.game.currentStatistics},se=function(e){return e.game.currentStatistics.cashAvailable},ae=function(e){return e.game.currentStatistics.maxCashAvailable},ne=function(e){return e.game.currentStatistics.ideasAvailable},ce=function(e){return e.game.currentStatistics.maxIdeasAvailable},ie=function(e){return e.game.purchasedResearchProjects},oe=(K.reducer,function(){return Object(h.b)()}),he=h.c,ue=r(2),de=function(e){var t=he(re),r=t.daysElapsed,s=t.cashAvailable,a=t.cashEarnedPerDay,n=t.homesPowered,c=t.homesInPowerGrid,i=t.wattsUsedPerHomePerDay,o=t.pricePerWatt,h=t.wattsGeneratedPerDay,u=t.ideasAvailable,d=t.ideasGeneratedPerDay,l=v(y(100),g(n,c));return Object(ue.jsxs)(ue.Fragment,{children:[Object(ue.jsx)(m.a,{as:"h1",size:"md",pb:2,children:"Keep the Lights On"}),Object(ue.jsxs)(x.b,{pt:4,align:"stretch",spacing:4,children:[Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"sm",pb:1,children:"Time Elapsed"}),Object(ue.jsxs)(p.a,{children:[D(r)," days"]})]}),Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"sm",pb:1,children:"Funds"}),Object(ue.jsxs)(p.a,{pb:1,children:["$",D(s)]}),Object(ue.jsxs)(p.a,{fontSize:"sm",color:"gray.400",children:["$",D(a)," per day"]})]}),Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"sm",pb:1,children:"Power Generation"}),Object(ue.jsxs)(p.a,{pb:1,children:[D(h)," watts per day"]}),Object(ue.jsxs)(p.a,{fontSize:"sm",color:"gray.400",children:["$",D(o)," per watt"]})]}),Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"sm",pb:1,children:"Houses Illuminated"}),Object(ue.jsxs)(p.a,{pb:1,children:[D(n)," / ",D(c)]}),Object(ue.jsxs)(p.a,{pb:1,color:n===c?void 0:"red.500",children:[D(l),"%"]}),Object(ue.jsxs)(p.a,{fontSize:"sm",color:"gray.400",children:[D(i)," watts used per house per day"]})]}),Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"sm",pb:1,children:"Research"}),Object(ue.jsxs)(p.a,{pb:1,children:[D(u)," ideas"]}),Object(ue.jsxs)(p.a,{fontSize:"sm",color:"gray.400",children:[D(d)," ideas per day"]})]})]})]})},le=r(106),be=function(e){return Object(ue.jsx)(l.a,{children:"Track your progress here"})},je=r(107),me=function(e){var t=oe(),r=he(se),s=he(ae),a=he(_);return Object(ue.jsx)(x.b,{align:"stretch",spacing:4,children:E.map((function(e){var n=a[e],c=z[e];return-1===S(s,v(y(.75),c.baseCost))?null:Object(ue.jsxs)(x.a,{children:[Object(ue.jsxs)(m.a,{as:"h2",size:"sm",pb:1,children:[c.name," x ",n.numberOwned]}),Object(ue.jsxs)(p.a,{pb:2,fontSize:"sm",color:"gray.400",children:["Generates ",D(n.wattsPerDay)," watts per day --"," ",c.colorText]}),Object(ue.jsxs)(je.a,{onClick:function(){return t(V(e))},disabled:!T(r,n),children:["Buy for $",D(n.nextPurchaseCost)]})]},e)}))})},xe=v(y(.75),N[R.juniorResearchAssistant].baseCost),pe=function(e){var t=oe(),r=he(se),s=he(ae),a=he(ne),n=he(ce),c=he(ee),i=he(ie);return 1!==S(s,xe)?Object(ue.jsx)(p.a,{fontStyle:"italic",color:"gray.400",children:"If you collect enough money, maybe you can hire staff to research improvements."}):Object(ue.jsxs)(x.b,{align:"stretch",spacing:8,children:[Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"md",pb:4,children:"Researchers"}),Object(ue.jsx)(x.b,{align:"stretch",spacing:4,children:W.map((function(e){var a=c[e],n=N[e];return-1===S(s,v(y(.75),n.baseCost))?null:Object(ue.jsxs)(x.a,{children:[Object(ue.jsxs)(m.a,{as:"h3",size:"sm",pb:1,children:[n.name," x ",a.numberEmployed]}),Object(ue.jsxs)(p.a,{pb:2,fontSize:"sm",color:"gray.400",children:["Generates ",D(a.ideasPerDay)," ideas per day --"," ",n.colorText]}),Object(ue.jsxs)(je.a,{onClick:function(){return t(X(e))},disabled:!$(r,a),children:["Hire for $",D(a.nextPurchaseCost)]})]},e)}))})]}),Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"md",pb:4,children:"Projects"}),n===y(0)?Object(ue.jsx)(p.a,{fontStyle:"italic",color:"gray.400",children:"Hire some researchers, and they might have an idea or two of how to improve your power grid."}):Object(ue.jsx)(x.b,{align:"stretch",spacing:4,children:F.map((function(e){return i.includes(e.identifier)||-1===S(n,v(y(.75),e.cost))?null:Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h3",size:"sm",pb:1,children:e.name}),Object(ue.jsx)(p.a,{pb:2,fontSize:"sm",color:"gray.400",children:e.description}),Object(ue.jsxs)(je.a,{onClick:function(){return t(Z(e.identifier))},disabled:1!==S(a,e.cost),children:["Purchase for ",D(e.cost)," ideas"]})]},e.identifier)}))})]})]})},Oe=r(92),fe=r(58),ye=function(e){var t=Object(Oe.b)().toggleColorMode,r=Object(Oe.c)("Switch to Dark Mode","Switch to Light Mode"),s=Object(Oe.c)(fe.a,fe.b);return Object(ue.jsx)(je.a,{size:"md",fontSize:"lg",leftIcon:Object(ue.jsx)(s,{}),variant:"solid",onClick:t,children:r})},Pe=function(e){oe(),he(te);return Object(ue.jsxs)(x.b,{align:"flex-start",spacing:4,children:[Object(ue.jsxs)(x.a,{children:[Object(ue.jsx)(m.a,{as:"h2",size:"sm",pb:1,children:"Theme"}),Object(ue.jsx)(ye,{})]}),!1]})},we=function(e){return Object(ue.jsxs)(le.e,{children:[Object(ue.jsxs)(le.b,{children:[Object(ue.jsx)(le.a,{children:"Generation"}),Object(ue.jsx)(le.a,{children:"Research"}),Object(ue.jsx)(le.a,{children:"Achievements"}),Object(ue.jsx)(le.a,{children:"Settings"})]}),Object(ue.jsxs)(le.d,{children:[Object(ue.jsx)(le.c,{children:Object(ue.jsx)(me,{})}),Object(ue.jsx)(le.c,{children:Object(ue.jsx)(pe,{})}),Object(ue.jsx)(le.c,{children:Object(ue.jsx)(be,{})}),Object(ue.jsx)(le.c,{children:Object(ue.jsx)(Pe,{})})]})]})},ve=Object(G.a)({reducer:{game:K.reducer}}),ge=0;setInterval((function(){ve.dispatch(Q(ge)),ge=(ge+1)%16}),62.5);var Ce=ve,Ae=function(){return Object(ue.jsx)(h.a,{store:Ce,children:Object(ue.jsx)(u.a,{theme:d.theme,children:Object(ue.jsx)(l.a,{children:Object(ue.jsxs)(b.a,{minH:"100vh",direction:"row",alignItems:"stretch",children:[Object(ue.jsx)(l.a,{overflow:"auto",w:250,p:3,children:Object(ue.jsx)(de,{})}),Object(ue.jsx)(l.a,{children:Object(ue.jsx)(j.a,{orientation:"vertical"})}),Object(ue.jsx)(l.a,{flexGrow:1,overflow:"auto",children:Object(ue.jsx)(we,{})})]})})})})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(Object(ue.jsxs)(c.a.StrictMode,{children:[Object(ue.jsx)(a.a,{}),Object(ue.jsx)(Ae,{})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[90,1,2]]]);
//# sourceMappingURL=main.3aeede9e.chunk.js.map