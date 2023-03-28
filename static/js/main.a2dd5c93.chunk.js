/*! For license information please see main.a2dd5c93.chunk.js.LICENSE.txt */
(this["webpackJsonpgif-search"]=this["webpackJsonpgif-search"]||[]).push([[0],{14:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=n(6),a=n.n(i),c=(n(14),n(7)),s=n(2),u=n(8);function l(e,t){var n=Object(r.useState)((function(){if("undefined"===typeof window)return t;try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(r){return console.log(r),t}})),o=Object(s.a)(n,2),i=o[0],a=o[1];return[i,function(t){try{var n=t instanceof Function?t(i):t;a(n),"undefined"!==typeof window&&window.localStorage.setItem(e,JSON.stringify(n))}catch(r){console.log(r)}}]}var f=n(4),d=n(3);function h(){var e=Object(r.useState)({width:void 0,height:void 0}),t=Object(s.a)(e,2),n=t[0],o=t[1];return Object(r.useEffect)((function(){function e(){o({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n}function v(e){var t=e.setFunction,n=e.isActive,r=e.text,i=e.refreshOnClick,a=n?d.f:d.e;return o.a.createElement("div",{className:"settings-btn",onClick:function(e){e.preventDefault(),t((function(e){return!e})),i&&window.location.reload()}},o.a.createElement("span",{className:"settings-btn-text"},r),o.a.createElement(f.a,{icon:a,className:"toggle-switch-icon"}))}function y(e){var t=e.isOpen,n=e.setIsOpen,i=e.settingsIconRef,a=e.darkModeIsActive,c=e.setDarkModeIsActive,u=e.isLowResolution,l=e.setIsLowResolution,f=e.playOnlyOnHover,d=e.setPlayOnlyOnHover,y=e.lazyLoadingIsOn,g=e.setLazyLoadingIsOn,p=e.infiniteScrollIsActive,m=e.setInfiniteScrollIsActive,O=h().width,b=Object(r.useRef)(null),w=Object(r.useState)(0),L=Object(s.a)(w,2),E=L[0],I=L[1],j=[{setFunction:g,state:y,text:"Lazy loading",refresh:!1},{setFunction:l,state:u,text:"Low resolution",refresh:!1},{setFunction:d,state:f,text:"Play only on hover",refresh:!1},{setFunction:m,state:p,text:"Infinte scroll",refresh:!0},{setFunction:c,state:a,text:"Dark mode",refresh:!1}],S="".concat(t?"open ":"").concat(a?"dark-mode":""),k=function(e){b.current.contains(e.target)||i.current.contains(e.target)||n(!1)};return Object(r.useEffect)((function(){var e,t=null===(e=i.current)||void 0===e?void 0:e.offsetLeft;I(t-220+8)}),[O]),Object(r.useEffect)((function(){return document.addEventListener("mousedown",k),function(){return document.removeEventListener("mousedown",k)}}),[]),o.a.createElement("div",{id:"settings-dialog",ref:b,className:S,style:{left:E}},j.map((function(e){return o.a.createElement(v,{key:e.text,setFunction:e.setFunction,isActive:e.state,text:e.text,refreshOnClick:e.refresh})})))}function g(e){var t=e.inputRef,n=e.darkModeIsActive,i=e.trendingGifsQueryCode,a=e.queryString,c=e.setQueryString,u=h().width,l=Object(r.useState)(!1),v=Object(s.a)(l,2),y=v[0],g=v[1],p=a===i?"":a,m="".concat(n?"dark-mode ":"").concat(y?"input-focus":""),O="What type of GIFs".concat(u>550?" would you like to see":"","?"),b=p?o.a.createElement("div",{id:"x-icon-container",onClick:function(){c(""),t.current.focus()}},o.a.createElement(f.a,{icon:d.g,id:"x-icon"})):null;return o.a.createElement("div",{id:"input-container",className:m},o.a.createElement("input",{type:"text",ref:t,placeholder:O,value:p,onChange:function(e){return c(e.target.value)},onFocus:function(){return g(!0)},onBlur:function(){return g(!1)}}),b)}function p(e){var t=e.inputRef,n=e.submitQuery,r=e.darkModeIsActive,i=e.trendingGifsQueryCode,a=e.queryString,c=e.setQueryString;return o.a.createElement(o.a.Fragment,null,o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),n(a)}},o.a.createElement(g,{inputRef:t,darkModeIsActive:r,trendingGifsQueryCode:i,queryString:a,setQueryString:c}),o.a.createElement("button",{id:"submit-btn","aria-label":"Search"},o.a.createElement(f.a,{icon:d.c,id:"magnifying-glass-icon"}))))}function m(e){var t=e.trendingGifsQueryCode,n=e.queryString,i=e.setQueryString,a=e.setGifs,c=e.setFailedToLoad,u=e.fetchGifs,l=e.topBarIsStyled,h=e.isLowResolution,v=e.setIsLowResolution,g=e.playOnlyOnHover,m=e.setPlayOnlyOnHover,O=e.lazyLoadingIsOn,b=e.setLazyLoadingIsOn,w=e.darkModeIsActive,L=e.setDarkModeIsActive,E=e.infiniteScrollIsActive,I=e.setInfiniteScrollIsActive,j=Object(r.useRef)(null),S=Object(r.useRef)(null),k=Object(r.useState)(!1),x=Object(s.a)(k,2),R=x[0],A=x[1],G="".concat(w?"dark ":"").concat(l?"styled":""),M=function(e){e?(a([]),c(!1),S.current.blur(),u(e,0)):window.alert("Please enter a search term")};return Object(r.useEffect)((function(){document.body.classList.toggle("dark",w)}),[w]),o.a.createElement("div",{id:"top-bar",className:G},o.a.createElement("div",{id:"top-bar-content"},o.a.createElement("div",{onClick:function(){M(t),i(t)},className:"top-bar-icon-container"},o.a.createElement(f.a,{icon:d.b,className:"top-bar-icon"})),o.a.createElement(p,{inputRef:S,submitQuery:M,darkModeIsActive:w,trendingGifsQueryCode:t,queryString:n,setQueryString:i}),o.a.createElement("div",{className:"top-bar-icon-container",ref:j,onClick:function(){return A((function(e){return!e}))}},o.a.createElement(f.a,{icon:d.a,className:"top-bar-icon"}))),o.a.createElement(y,{isOpen:R,setIsOpen:A,settingsIconRef:j,darkModeIsActive:w,setDarkModeIsActive:L,isLowResolution:h,setIsLowResolution:v,playOnlyOnHover:g,setPlayOnlyOnHover:m,lazyLoadingIsOn:O,setLazyLoadingIsOn:b,infiniteScrollIsActive:E,setInfiniteScrollIsActive:I}))}function O(e){var t=e.gifObject,n=e.gifsContainerRef,i=e.isLowResolution,a=e.playOnlyOnHover,c=e.lazyLoadingIsOn,u=Object(r.useRef)(null),l=Object(r.useRef)(null),f=Object(r.useState)(""),d=Object(s.a)(f,2),h=d[0],v=d[1],y=Object(r.useState)(!1),g=Object(s.a)(y,2),p=g[0],m=g[1],O=t.images,b=O.fixed_height_still.url,w=i?O.fixed_height_downsampled.url:O.fixed_height.url,L=p||!c;return Object(r.useEffect)((function(){if(c){var e=u.current;return e&&(l.current=new IntersectionObserver((function(e){e.forEach((function(e){return m(e.isIntersecting)}))}),{root:n.current}),l.current.observe(e)),function(){return l.current.unobserve(e)}}}),[u,n,c]),Object(r.useEffect)((function(){v(a?b:w)}),[i,a,t]),o.a.createElement("div",{ref:u,className:"gif"},L?o.a.createElement("img",{alt:t.title,src:h,onClick:function(){return window.open(t.embed_url,"_blank")},onMouseEnter:function(){a&&v(w)},onMouseLeave:function(){a&&v(b)}}):null)}function b(e){var t=e.gifs,n=e.gifsContainerRef,i=e.isLowResolution,a=e.playOnlyOnHover,c=e.lazyLoadingIsOn,u=h().width,l=Object(r.useState)(0),f=Object(s.a)(l,2),d=f[0],v=f[1],y={width:d||0};return Object(r.useEffect)((function(){var e=.9*u,t=e<395?e:395,n=Math.floor((e+5)/(t+5)),r=n>3?3:n;v(r*t+5*(r-1))}),[u]),o.a.createElement("div",{id:"gifs-grid",style:y},t.map((function(e,t){return o.a.createElement(O,{key:t,gifObject:e,gifsContainerRef:n,isLowResolution:i,playOnlyOnHover:a,lazyLoadingIsOn:c})})))}var w=o.a.memo((function(e){var t=e.gifs,n=e.gifsContainerRef,r=e.isLoading,i=e.failedToLoad,a=e.isLowResolution,c=e.playOnlyOnHover,s=e.lazyLoadingIsOn;return r&&!t.length?o.a.createElement(f.a,{icon:d.d,id:"spinner",className:"fa-spin"}):i?o.a.createElement("p",{id:"error-message"},"Oops, something went wrong with your search. Click ",o.a.createElement("a",{href:"/"},"here")," to refresh."):o.a.createElement(b,{gifs:t,gifsContainerRef:n,isLowResolution:a,playOnlyOnHover:c,lazyLoadingIsOn:s})}));function L(e){var t=e.text,n=e.onClick,r=e.isDisplayed,i=e.darkModeIsActive?"dark-mode":"";return r?o.a.createElement("div",{id:"load-button-container",className:i,onClick:n},o.a.createElement("button",{id:"load-button",className:i},o.a.createElement("span",{id:"load-button-text"},t))):null}function E(e){var t=e.gifs,n=e.queryString,i=e.fetchGifs,a=e.gifsPerRequest,c=e.failedToLoad,s=e.isLoading,u=e.allGifsFetched,l=e.apiResOffset,f=e.isLowResolution,d=e.darkModeIsActive,v=e.playOnlyOnHover,y=e.lazyLoadingIsOn,g=e.setTopBarIsStyled,p=e.infiniteScrollIsActive,m=h().height,O=Object(r.useRef)(null),b=!p&&t.length,E=b&&!u,I=b&&l>a;return o.a.createElement("main",{ref:O,onScroll:function(){var e=O.current;p&&!u&&Math.ceil((null===e||void 0===e?void 0:e.scrollTop)+(null===e||void 0===e?void 0:e.clientHeight))>=(null===e||void 0===e?void 0:e.scrollHeight)&&i(),g(e.scrollTop>=.05*m)}},o.a.createElement(L,{text:"Go Back",onClick:function(e){e.preventDefault(),i(n,l-2*a)},isDisplayed:I,darkModeIsActive:d}),o.a.createElement(w,{gifs:t,gifsContainerRef:O,isLoading:s,failedToLoad:c,isLowResolution:f,playOnlyOnHover:v,lazyLoadingIsOn:y}),o.a.createElement(L,{text:"Load More",onClick:function(e){e.preventDefault(),i(),O.current.scroll({top:0})},isDisplayed:E,darkModeIsActive:d}))}function I(){I=function(){return e};var e={},t=Object.prototype,n=t.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},o=r.iterator||"@@iterator",i=r.asyncIterator||"@@asyncIterator",a=r.toStringTag||"@@toStringTag";function c(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(k){c=function(e,t,n){return e[t]=n}}function s(e,t,n,r){var o=t&&t.prototype instanceof f?t:f,i=Object.create(o.prototype),a=new E(r||[]);return i._invoke=function(e,t,n){var r="suspendedStart";return function(o,i){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===o)throw i;return S()}for(n.method=o,n.arg=i;;){var a=n.delegate;if(a){var c=b(a,n);if(c){if(c===l)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var s=u(e,t,n);if("normal"===s.type){if(r=n.done?"completed":"suspendedYield",s.arg===l)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r="completed",n.method="throw",n.arg=s.arg)}}}(e,n,a),i}function u(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(k){return{type:"throw",arg:k}}}e.wrap=s;var l={};function f(){}function d(){}function h(){}var v={};c(v,o,(function(){return this}));var y=Object.getPrototypeOf,g=y&&y(y(j([])));g&&g!==t&&n.call(g,o)&&(v=g);var p=h.prototype=f.prototype=Object.create(v);function m(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function O(e,t){var r;this._invoke=function(o,i){function a(){return new t((function(r,a){!function r(o,i,a,c){var s=u(e[o],e,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==typeof f&&n.call(f,"__await")?t.resolve(f.__await).then((function(e){r("next",e,a,c)}),(function(e){r("throw",e,a,c)})):t.resolve(f).then((function(e){l.value=e,a(l)}),(function(e){return r("throw",e,a,c)}))}c(s.arg)}(o,i,r,a)}))}return r=r?r.then(a,a):a()}}function b(e,t){var n=e.iterator[t.method];if(void 0===n){if(t.delegate=null,"throw"===t.method){if(e.iterator.return&&(t.method="return",t.arg=void 0,b(e,t),"throw"===t.method))return l;t.method="throw",t.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,e.iterator,t.arg);if("throw"===r.type)return t.method="throw",t.arg=r.arg,t.delegate=null,l;var o=r.arg;return o?o.done?(t[e.resultName]=o.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,l):o:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,l)}function w(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function L(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function E(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(w,this),this.reset(!0)}function j(e){if(e){var t=e[o];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,i=function t(){for(;++r<e.length;)if(n.call(e,r))return t.value=e[r],t.done=!1,t;return t.value=void 0,t.done=!0,t};return i.next=i}}return{next:S}}function S(){return{value:void 0,done:!0}}return d.prototype=h,c(p,"constructor",h),c(h,"constructor",d),d.displayName=c(h,a,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===d||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,h):(e.__proto__=h,c(e,a,"GeneratorFunction")),e.prototype=Object.create(p),e},e.awrap=function(e){return{__await:e}},m(O.prototype),c(O.prototype,i,(function(){return this})),e.AsyncIterator=O,e.async=function(t,n,r,o,i){void 0===i&&(i=Promise);var a=new O(s(t,n,r,o),i);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},m(p),c(p,a,"Generator"),c(p,o,(function(){return this})),c(p,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){for(;t.length;){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=j,E.prototype={constructor:E,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var t in this)"t"===t.charAt(0)&&n.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(n,r){return a.type="throw",a.arg=e,t.next=n,r&&(t.method="next",t.arg=void 0),!!r}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,l):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),l},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),L(n),l}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var o=r.arg;L(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,n){return this.delegate={iterator:j(e),resultName:t,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},e}function j(){var e=Object(r.useMemo)((function(){return String(Math.random())}),[]),t=Object(r.useState)([]),n=Object(s.a)(t,2),i=n[0],a=n[1],f=Object(r.useState)(e),d=Object(s.a)(f,2),h=d[0],v=d[1],y=Object(r.useState)(0),g=Object(s.a)(y,2),p=g[0],O=g[1],b=Object(r.useState)(!1),w=Object(s.a)(b,2),L=w[0],j=w[1],S=Object(r.useState)(!1),k=Object(s.a)(S,2),x=k[0],R=k[1],A=Object(r.useState)(!1),G=Object(s.a)(A,2),M=G[0],N=G[1],C=Object(r.useState)(!1),_=Object(s.a)(C,2),F=_[0],H=_[1],z=l("lowResolution",!1),P=Object(s.a)(z,2),T=P[0],Q=P[1],q=l("playOnlyOnHover",!1),D=Object(s.a)(q,2),B=D[0],J=D[1],Y=l("lazyLoading",!0),W=Object(s.a)(Y,2),V=W[0],Z=W[1],K=l("infiniteScroll",!0),U=Object(s.a)(K,2),X=U[0],$=U[1],ee=l("darkMode",!1),te=Object(s.a)(ee,2),ne=te[0],re=te[1],oe=X?18:30,ie=function(){var t=Object(c.a)(I().mark((function t(){var n,r,o,i,c,s,l,f,d,v,y,g,m,b=arguments;return I().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=b.length>0&&void 0!==b[0]?b[0]:h,r=b.length>1&&void 0!==b[1]?b[1]:p,!L){t.next=4;break}return t.abrupt("return");case 4:return j(!0),N(!1),i=(o=n===e)?"trending":"search",c=o?"":"&q=".concat(n),s="https://api.giphy.com/v1/gifs/".concat(i,"?api_key=").concat(u.a).concat(c,"&limit=").concat(oe,"&offset=").concat(r),t.next=12,fetch(s);case 12:return l=t.sent,t.next=15,l.json();case 15:f=t.sent,d=f.data,v=f.meta.status,y=f.pagination.total_count,j(!1),v<200||v>299?R(!0):d.length?(a((function(e){return X?e.concat(d):d})),g=d.length===oe?oe:Math.min(d.length,oe),O(m=r+g),N(m>=y)):N(!0);case 21:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return Object(r.useEffect)((function(){ie()}),[]),o.a.createElement(o.a.Fragment,null,o.a.createElement(m,{trendingGifsQueryCode:e,queryString:h,setQueryString:v,setGifs:a,fetchGifs:ie,setFailedToLoad:R,topBarIsStyled:F,isLowResolution:T,setIsLowResolution:Q,playOnlyOnHover:B,setPlayOnlyOnHover:J,lazyLoadingIsOn:V,setLazyLoadingIsOn:Z,darkModeIsActive:ne,setDarkModeIsActive:re,infiniteScrollIsActive:X,setInfiniteScrollIsActive:$}),o.a.createElement(E,{gifs:i,setGifs:a,queryString:h,fetchGifs:ie,gifsPerRequest:oe,failedToLoad:x,allGifsFetched:M,isLoading:L,apiResOffset:p,isLowResolution:T,darkModeIsActive:ne,playOnlyOnHover:B,lazyLoadingIsOn:V,setTopBarIsStyled:H,infiniteScrollIsActive:X}),o.a.createElement("footer",null,o.a.createElement("span",{id:"attribution"},"Powered by GIPHY")))}a.a.render(o.a.createElement(j,null),document.getElementById("root"))},8:function(e){e.exports=JSON.parse('{"a":"8QqYxAPrsw4R0gITnrVZphyN9aF48HTH"}')},9:function(e,t,n){e.exports=n(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.a2dd5c93.chunk.js.map