(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{278:function(t,e,n){"use strict";n(111),n(41),n(23),n(28),n(63);var o=n(311);e.a=function(){var t="poeticalbot.tumblr.com",e="soMpL6oJLZq5ovoVYVzU5Qhx5DE87MMrxou6J7tGYLec6XeT6L";return new Promise((function(n,r){var c="https://api.tumblr.com/v2/blog/"+t+"/posts?api_key="+e;o.a.get(c).then((function(t){return Math.floor(Math.random()*t.data.response.total_posts)}),(function(t){r(t)})).then((function(t){return o.a.get(c+"&offset=".concat(t,"&limit=").concat(20)).then((function(t){var e=t.data.response.posts.map((function(t){var e=(new DOMParser).parseFromString(t.body,"text/html");return(e.body.textContent||"").replace(/\s+/g," ").replace(/–/g,"--")}));n(e)}))}))}))}},279:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o=n(143),r=n(142),c=(n(28),n(199),n(63),Object(o.a)((function t(e){var text=e.text,n=e.corpus;Object(r.a)(this,t);var o=[],c=0,h=0,l=this;l.getchar=function(){var t=l.w.charAt(c);return c=(c+1)%l.w.length,t},l.getcharRandom=function(){return l.w.charAt(Math.floor(Math.random()*l.w.length))},l.getWord=function(){var t=o[h];return h=(h+1)%o.length,t},l.getText=function(){return l.w},l.setText=function(text){l.w=text,o=l.w.replace(/\n|\s+/g," ").match(/\w+|\s+|[^\s\w]+/g),h=0,c=0},l.randomText=function(){return(t=n)[Math.floor(Math.random()*t.length)];var t},l.changeText=function(){var text=l.randomText();l.setText(text)},l.setText(text||"These are the pearls that were his eyes")})))},287:function(t,e,n){var content=n(308);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(110).default)("45228e84",content,!0,{sourceMap:!1})},303:function(t,e,n){"use strict";var o=n(2),r=n(304);o({target:"String",proto:!0,forced:n(305)("sub")},{sub:function(){return r(this,"sub","","")}})},304:function(t,e,n){"use strict";var o=n(3),r=n(20),c=n(13),h=/"/g,l=o("".replace);t.exports=function(t,e,n,o){var f=c(r(t)),d="<"+e;return""!==n&&(d+=" "+n+'="'+l(c(o),h,"&quot;")+'"'),d+">"+f+"</"+e+">"}},305:function(t,e,n){"use strict";var o=n(4);t.exports=function(t){return o((function(){var e=""[t]('"');return e!==e.toLowerCase()||e.split('"').length>3}))}},306:function(t,e){t.exports="Let us now take wage-labor.\nThe rope that is attached to the hook starts playing out rapidly.\nCHICO You was insulted, but you don’t know it.\nTRENTINO (With a little chuckle) Oh – you mean… worm?\nCHICO I don’t know about us, but I know he’s-a got something… CUT TO the front of the building occupied by the beautiful girl.\n(b) This applies chiefly to Germany where the landed aristocracy and squirearchy have large portions of their estates cultivated for their own account by stewards, and are moreover, extensive beet-root sugar manufacturers and distillers of potato spirits.\nOr do you mean modern bourgeois private property?\nIn France the Communists ally themselves with the Social-Democrats(a), against the conservative and radical bourgeoisie, reserving, however, the right to take up a critical position in regard to phrases and illusions traditionally handed down from the great Revolution.\nBy this tine Vera has descended the stairs and exited from scene.\nI better examine you.\nPart of the way across, Harpo and Chico react to the singing of a very high note – it’s practically in Harpo’s ear.\nMRS. TEASDALE (Into phone) But your Excellency, you must – oh thank you – please hurry… (She hangs up phone… and walks over to her guests) He’ll be right over… CUT TO corner of room (Mrs. Teasdale’s living room), disclosing for the first time the fireman’s pole… Groucho comes sliding down the pole in his nightgown, with a long box of crackers under his arm… stops about three feet from the floor, looks around the room and sees Trentino.\nUSHER (To Chico and Harpo) I’m sorry gentlemen - but you have the wrong seats.\nLet us now take wage-labor"},307:function(t,e,n){"use strict";n(287)},308:function(t,e,n){var o=n(109)((function(i){return i[1]}));o.push([t.i,".container[data-v-77d1c894]{align-items:center;display:flex;justify-content:center;margin:0 auto;min-height:100vh;text-align:center}",""]),o.locals={},t.exports=o},314:function(t,e,n){"use strict";n.r(e);var o=n(29),r=n(142),c=n(143);n(284),n(35),n(45),n(41),n(202),n(85),n(86),n(65),n(23),n(43),n(303);function h(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function l(t){var e,n,l,f,d=t.size,m=t.p5Instance,v=t.tm,y=[],w=!1,x=0,O=0,C=1e4;m.setup=function(){T(),m.createCanvas(l,f).parent("p5Canvas"),e=m.createVector(0,0),n=m.createVector(0,0)};var T=function(){l=d.width,f=d.height,m.colorMode(m.HSB,l,f,100,1)},k=function(){return{x:Math.floor(l*m.noise(O)),y:Math.floor(f*m.noise(C))}};m.draw=function(){m.background(0);var t=m.random();if(m.millis()>x&&t<.04?j():m.millis()>x&&t<.02&&w&&M(),m.millis()>x&&w){O+=.01,C+=.01;var o=k();e.x=o.x,e.y=o.y;var r=m.static.Vector.sub(e,n);r.mult(.5),y[y.length-1].add(e,r),x=m.millis()+m.random(100),n.x=e.x,n.y=e.y}else O+=.02,C+=.02;for(var i=0;i<y.length;i++)y[i].update(),y[i].display()},m.windowResized=function(){M(),d={width:m.windowWidth,height:m.windowHeight},m.resizeCanvas(d.width,d.height),T(),j()},m.mousePressed=function(){j()},m.mouseReleased=function(){M()};var j=function(){x=0,w=!0;var t=k();n.x=t.x,n.y=t.y,y.push(new z(t))},M=function(){w=!1};m.keyTyped=function(){return"r"===m.key&&v.changeText(),!1};var z=function(){return Object(c.a)((function t(e){Object(r.a)(this,t),this.particles=[],this.hue=m.random(100),this.sizeChange=m.random([.995,1.005,.99,1.01,.995,1.005,.99,1.01,.95,1.05]),this.alignment=m.random([m.LEFT,m.RIGHT,m.CENTER]),this.position=e}),[{key:"add",value:function(t,e){this.particles.push(new P(t,e,this.hue,this.sizeChange,this.alignment))}},{key:"update",value:function(){for(var i=0;i<this.particles.length;i++)this.particles[i].update()}},{key:"display",value:function(){for(var i=this.particles.length-1;i>=0;i--)this.particles[i].lifespan<=0?this.particles.splice(i,1):this.particles[i].display(this.particles[i+1])}}])}(),P=function(){return Object(c.a)((function t(e,n,c,l,f){Object(r.a)(this,t),this.position=m.createVector(e.x,e.y),this.velocity=m.createVector(n.x,n.y),this.drag=.95,this.sizeChange=l,this.lifespan=150,this.text=v.getWord(),this.size=m.map(c,0,100,4,64),this.alignment=f,this.colorCoords=function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?h(Object(n),!0).forEach((function(e){Object(o.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},e)}),[{key:"update",value:function(){this.position.add(this.velocity),this.velocity.mult(this.drag),this.size=this.size/this.sizeChange,this.lifespan--}},{key:"display",value:function(t){var e=m.map(this.lifespan,0,255,0,1,!0),n=m.map(this.lifespan/2,0,255,0,1,!0);m.stroke(this.colorCoords.x,this.colorCoords.y,100,e),m.fill(this.colorCoords.x,this.colorCoords.y,100,n),m.textSize(this.size),m.textAlign(this.alignment),m.text(this.text,this.position.x,this.position.y)}}])}()}var f=n(279),d=n(306),m=n.n(d),v=n(278),y={components:{},mounted:function(){var t=n(285),e={width:window.innerWidth,height:window.innerHeight};Object(v.a)().then((function(n){new t((function(o){o.static=t;var r,text=(r=n)[Math.floor(Math.random()*r.length)];new l({p5Instance:o,tm:new f.a({text:text,corpus:n}),size:e,randomPost:v.a})}))})).catch((function(n){console.log("OH NOES NO POEM!!!"),console.error(n);new t((function(n){n.static=t,new l({p5Instance:n,tm:new f.a({text:m.a,corpus:[m.a]}),size:e,randomPost:v.a})}))}))}},w=(n(307),n(44)),component=Object(w.a)(y,(function(){this._self._c;return this._m(0)}),[function(){var t=this._self._c;return t("div",{staticClass:"container"},[t("div",{staticClass:"d-flex justify-content-center",attrs:{id:"p5Canvas"}})])}],!1,null,"77d1c894",null);e.default=component.exports}}]);