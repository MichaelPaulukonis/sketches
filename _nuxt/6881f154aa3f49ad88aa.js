(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{176:function(n,t,e){"use strict";function r(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}e.d(t,"a",(function(){return r}))},197:function(n,t,e){var r=e(6);r(r.P,"Array",{fill:e(198)}),e(69)("fill")},198:function(n,t,e){"use strict";var r=e(26),o=e(98),c=e(18);n.exports=function(n){for(var t=r(this),e=c(t.length),f=arguments.length,h=o(f>1?arguments[1]:void 0,e),l=f>2?arguments[2]:void 0,d=void 0===l?e:o(l,e);d>h;)t[h++]=n;return t}},199:function(n,t,e){"use strict";e.d(t,"a",(function(){return o}));e(70),e(99);var r=e(176),o=function n(text){Object(r.a)(this,n);var t=[],e=0,o=0,c=this;c.getchar=function(){var n=c.w.charAt(e);return e=(e+1)%c.w.length,n},c.getcharRandom=function(){return c.w.charAt(Math.floor(Math.random()*c.w.length))},c.getWord=function(){var n=t[o];return o=(o+1)%t.length,n},c.getText=function(){return c.w},c.setText=function(text){c.w=text,t=c.w.replace(/\n|\s+/g," ").match(/\w+|\s+|[^\s\w]+/g),o=0,e=0},c.setText(text||"These are the pearls that were his eyes")}},200:function(n,t,e){var content=e(311);"string"==typeof content&&(content=[[n.i,content,""]]),content.locals&&(n.exports=content.locals);(0,e(53).default)("64ae99e9",content,!0,{sourceMap:!1})},310:function(n,t,e){"use strict";var r=e(200);e.n(r).a},311:function(n,t,e){(n.exports=e(52)(!1)).push([n.i,".container[data-v-22a1cdea]{margin:0 auto;min-height:100vh;display:flex;justify-content:center;align-items:center;text-align:center}",""])},542:function(n,t,e){"use strict";e.r(t);e(197);function r(n,t,e){var r,o,c=0,f=20,h=90,l="A",d=[];d[0]=["A","-BF+AFA+FB-"],d[1]=["B","+AF-BFB-FA+"];var v=0,w=0,m=1e4,x=2e4,y=3e4;function A(s){for(var n="",i=0;i<s.length;i++){for(var t=0,e=0;e<d.length;e++)if(s[i]==d[e][0]){n+=d[e][1],t=1;break}0==t&&(n+=s[i])}return n}n.setup=function(){n.createCanvas(710,400).parent("p5Canvas"),n.background(255),r=0,o=n.height-1;for(var i=0;i<5;i++)l=A(l)},n.draw=function(){!function(e){if("F"===e){var l=r+f*n.cos(n.radians(c)),d=o+f*n.sin(n.radians(c));r=l,o=d}else"+"===e?c+=h:"-"===e&&(c-=h);var v=Math.floor(255*n.noise(w)),g=Math.floor(255*n.noise(m)),b=Math.floor(255*n.noise(x)),a=Math.floor(100*n.noise(y));n.fill(v,g,b,a);var A=t.getWord();n.text(A,r,o)}(l[v]),++v>l.length-1&&(v=0),w+=.01,m+=.01,x+=.01,y+=.01}}var o=e(199),c={components:{},mounted:function(){var n=e(237),t=new o.a("I have eaten\nthe plums\nthat were in\nthe icebox\n\nand which\nyou were probably\nsaving\nfor breakfast\n\nForgive me\nthey were delicious\nso sweet\nand so cold\n"),c={width:window.innerWidth,height:window.innerHeight};new n((function(e){e.static=n,new r(e,t,c)}))}},f=(e(310),e(22)),component=Object(f.a)(c,(function(){var n=this.$createElement;this._self._c;return this._m(0)}),[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"container"},[t("div",{staticClass:"d-flex justify-content-center",attrs:{id:"p5Canvas"}})])}],!1,null,"22a1cdea",null);t.default=component.exports}}]);