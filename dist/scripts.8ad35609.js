parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"oxqQ":[function(require,module,exports) {
"use strict";function t(t){const e=document.querySelectorAll(t),s=Array.from(e);return 1==s.length?s[0]:s}function e(){return window.innerWidth>775}function s(t){return"true"===t||"false"===t}function i(t){return!isNaN(parseInt(t))}Object.defineProperty(exports,"__esModule",{value:!0}),exports.$=t,exports.isDesktop=e,exports.isBoolean=s,exports.isNumber=i,Element.prototype.animate=function(t,e,s=400,i="ease-in-out",n){this.classList.add("animating"),this.style.transition=`${t} ${s}ms ${i}`,setTimeout(()=>{this.style[t]=e,this.addEventListener("transitionend",()=>{this.classList.remove("animating"),"function"==typeof n&&n()})},100)},Element.prototype.fadeIn=function(t=400,e=!1,s=1,i){const n=this.style.transition;this.classList.add("fading"),this.style.transition=`opacity ${t}ms ease-in`,!1!==e&&(this.style.display=e),setTimeout(()=>{this.style.opacity=s},100),setTimeout(()=>{this.classList.remove("fading"),this.style.transition=n,"function"==typeof i&&i()},t+200)},Element.prototype.fadeOut=function(t=400,e=!1,s=0,i){const n=this.style.transition;this.classList.add("fading"),this.style.transition=`opacity ${t}ms ease-out`,setTimeout(()=>{this.style.opacity=s},100),setTimeout(()=>{this.classList.remove("fading"),this.style.transition=n,e&&(this.style.display="none"),"function"==typeof i&&i()},t+200)},Element.prototype.data=function(t,e){if(void 0===e){const e=this.getAttribute(`data-${t}`);let n=e;return i(e)&&(n=parseInt(e)),s(e)&&(n="true"==e),n}return this.setAttribute(`data-${t}`,e)};
},{}],"JqUM":[function(require,module,exports) {
var global = arguments[3];
var e=arguments[3];!function(e){"use strict";var t=function(){return{escape:function(e){return e.replace(/([.*+?^${}()|\[\]\/\\])/g,"\\$1")},parseExtension:t,mimeType:function(e){var n=t(e).toLowerCase();return(r="application/font-woff",{woff:r,woff2:r,ttf:"application/font-truetype",eot:"application/vnd.ms-fontobject",png:"image/png",jpg:"image/jpeg",jpeg:"image/jpeg",gif:"image/gif",tiff:"image/tiff",svg:"image/svg+xml"})[n]||"";var r},dataAsUrl:function(e,t){return"data:"+t+";base64,"+e},isDataUrl:function(e){return-1!==e.search(/^(data:)/)},canvasToBlob:function(e){return e.toBlob?new Promise(function(t){e.toBlob(t)}):function(e){return new Promise(function(t){for(var n=window.atob(e.toDataURL().split(",")[1]),r=n.length,o=new Uint8Array(r),i=0;i<r;i++)o[i]=n.charCodeAt(i);t(new Blob([o],{type:"image/png"}))})}(e)},resolveUrl:function(e,t){var n=document.implementation.createHTMLDocument(),r=n.createElement("base");n.head.appendChild(r);var o=n.createElement("a");return n.body.appendChild(o),r.href=t,o.href=e,o.href},getAndEncode:function(e){var t=3e4;u.impl.options.cacheBust&&(e+=(/\?/.test(e)?"&":"?")+(new Date).getTime());return new Promise(function(n){var r,o=new XMLHttpRequest;if(o.onreadystatechange=function(){if(4!==o.readyState)return;if(200!==o.status)return void(r?n(r):c("cannot fetch resource: "+e+", status: "+o.status));var t=new FileReader;t.onloadend=function(){var e=t.result.split(/,/)[1];n(e)},t.readAsDataURL(o.response)},o.ontimeout=function(){r?n(r):c("timeout of "+t+"ms occured while fetching resource: "+e)},o.responseType="blob",o.timeout=t,o.open("GET",e,!0),o.send(),u.impl.options.imagePlaceholder){var i=u.impl.options.imagePlaceholder.split(/,/);i&&i[1]&&(r=i[1])}function c(e){console.error(e),n("")}})},uid:(e=0,function(){return"u"+("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)+e++}),delay:function(e){return function(t){return new Promise(function(n){setTimeout(function(){n(t)},e)})}},asArray:function(e){for(var t=[],n=e.length,r=0;r<n;r++)t.push(e[r]);return t},escapeXhtml:function(e){return e.replace(/#/g,"%23").replace(/\n/g,"%0A")},makeImage:function(e){return new Promise(function(t,n){var r=new Image;r.onload=function(){t(r)},r.onerror=n,r.src=e})},width:function(e){var t=n(e,"border-left-width"),r=n(e,"border-right-width");return e.scrollWidth+t+r},height:function(e){var t=n(e,"border-top-width"),r=n(e,"border-bottom-width");return e.scrollHeight+t+r}};var e;function t(e){var t=/\.([^\.\/]*?)$/g.exec(e);return t?t[1]:""}function n(e,t){var n=window.getComputedStyle(e).getPropertyValue(t);return parseFloat(n.replace("px",""))}}(),n=function(){var e=/url\(['"]?([^'"]+?)['"]?\)/g;return{inlineAll:function(e,t,i){return n(e)?Promise.resolve(e).then(r).then(function(n){var r=Promise.resolve(e);return n.forEach(function(e){r=r.then(function(n){return o(n,e,t,i)})}),r}):Promise.resolve(e)},shouldProcess:n,impl:{readUrls:r,inline:o}};function n(t){return-1!==t.search(e)}function r(n){for(var r,o=[];null!==(r=e.exec(n));)o.push(r[1]);return o.filter(function(e){return!t.isDataUrl(e)})}function o(e,n,r,o){return Promise.resolve(n).then(function(e){return r?t.resolveUrl(e,r):e}).then(o||t.getAndEncode).then(function(e){return t.dataAsUrl(e,t.mimeType(n))}).then(function(r){return e.replace(function(e){return new RegExp("(url\\(['\"]?)("+t.escape(e)+")(['\"]?\\))","g")}(n),"$1"+r+"$3")})}}(),r=function(){return{resolveAll:function(){return e(document).then(function(e){return Promise.all(e.map(function(e){return e.resolve()}))}).then(function(e){return e.join("\n")})},impl:{readAll:e}};function e(){return Promise.resolve(t.asArray(document.styleSheets)).then(function(e){var n=[];return e.forEach(function(e){try{t.asArray(e.cssRules||[]).forEach(n.push.bind(n))}catch(r){console.log("Error while reading CSS rules from "+e.href,r.toString())}}),n}).then(function(e){return e.filter(function(e){return e.type===CSSRule.FONT_FACE_RULE}).filter(function(e){return n.shouldProcess(e.style.getPropertyValue("src"))})}).then(function(t){return t.map(e)});function e(e){return{resolve:function(){var t=(e.parentStyleSheet||{}).href;return n.inlineAll(e.cssText,t)},src:function(){return e.style.getPropertyValue("src")}}}}}(),o=function(){return{inlineAll:function r(o){if(!(o instanceof Element))return Promise.resolve(o);return function(e){var t=e.style.getPropertyValue("background");return t?n.inlineAll(t).then(function(t){e.style.setProperty("background",t,e.style.getPropertyPriority("background"))}).then(function(){return e}):Promise.resolve(e)}(o).then(function(){return o instanceof HTMLImageElement?e(o).inline():Promise.all(t.asArray(o.childNodes).map(function(e){return r(e)}))})},impl:{newImage:e}};function e(e){return{inline:function(n){return t.isDataUrl(e.src)?Promise.resolve():Promise.resolve(e.src).then(n||t.getAndEncode).then(function(n){return t.dataAsUrl(n,t.mimeType(e.src))}).then(function(t){return new Promise(function(n,r){e.onload=n,e.onerror=r,e.src=t})})}}}}(),i={imagePlaceholder:void 0,cacheBust:!1},u={toSvg:c,toPng:function(e,t){return a(e,t||{}).then(function(e){return e.toDataURL()})},toJpeg:function(e,t){return a(e,t=t||{}).then(function(e){return e.toDataURL("image/jpeg",t.quality||1)})},toBlob:function(e,n){return a(e,n||{}).then(t.canvasToBlob)},toPixelData:function(e,n){return a(e,n||{}).then(function(n){return n.getContext("2d").getImageData(0,0,t.width(e),t.height(e)).data})},impl:{fontFaces:r,images:o,util:t,inliner:n,options:{}}};function c(e,n){return function(e){void 0===e.imagePlaceholder?u.impl.options.imagePlaceholder=i.imagePlaceholder:u.impl.options.imagePlaceholder=e.imagePlaceholder;void 0===e.cacheBust?u.impl.options.cacheBust=i.cacheBust:u.impl.options.cacheBust=e.cacheBust}(n=n||{}),Promise.resolve(e).then(function(e){return function(e,n,r){if(!r&&n&&!n(e))return Promise.resolve();return Promise.resolve(e).then(function(e){return e instanceof HTMLCanvasElement?t.makeImage(e.toDataURL()):e.cloneNode(!1)}).then(function(r){return function(e,n,r){var o=e.childNodes;return 0===o.length?Promise.resolve(n):function(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return s(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}(n,t.asArray(o),r).then(function(){return n})}(e,r,n)}).then(function(n){return function(e,n){return n instanceof Element?Promise.resolve().then(function(){var r,o;r=window.getComputedStyle(e),o=n.style,r.cssText?o.cssText=r.cssText:function(e,n){t.asArray(e).forEach(function(t){n.setProperty(t,e.getPropertyValue(t),e.getPropertyPriority(t))})}(r,o)}).then(function(){[":before",":after"].forEach(function(r){!function(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""!==i&&"none"!==i){var u=t.uid();n.className=n.className+" "+u;var c=document.createElement("style");c.appendChild(function(e,n,r){var o="."+e+":"+n,i=r.cssText?function(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}(r):function(e){return t.asArray(e).map(function(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}).join("; ")+";"}(r);return document.createTextNode(o+"{"+i+"}")}(u,r,o)),n.appendChild(c)}}(r)})}).then(function(){e instanceof HTMLTextAreaElement&&(n.innerHTML=e.value),e instanceof HTMLInputElement&&n.setAttribute("value",e.value)}).then(function(){n instanceof SVGElement&&(n.setAttribute("xmlns","http://www.w3.org/2000/svg"),n instanceof SVGRectElement&&["width","height"].forEach(function(e){var t=n.getAttribute(e);t&&n.style.setProperty(e,t)}))}).then(function(){return n}):n}(e,n)})}(e,n.filter,!0)}).then(l).then(f).then(function(e){n.bgcolor&&(e.style.backgroundColor=n.bgcolor);n.width&&(e.style.width=n.width+"px");n.height&&(e.style.height=n.height+"px");n.style&&Object.keys(n.style).forEach(function(t){e.style[t]=n.style[t]});return e}).then(function(r){return function(e,n,r){return Promise.resolve(e).then(function(e){return e.setAttribute("xmlns","http://www.w3.org/1999/xhtml"),(new XMLSerializer).serializeToString(e)}).then(t.escapeXhtml).then(function(e){return'<foreignObject x="0" y="0" width="100%" height="100%">'+e+"</foreignObject>"}).then(function(e){return'<svg xmlns="http://www.w3.org/2000/svg" width="'+n+'" height="'+r+'">'+e+"</svg>"}).then(function(e){return"data:image/svg+xml;charset=utf-8,"+e})}(r,n.width||t.width(e),n.height||t.height(e))})}function a(e,n){return c(e,n).then(t.makeImage).then(t.delay(100)).then(function(r){var o=function(e){var r=document.createElement("canvas");if(r.width=n.width||t.width(e),r.height=n.height||t.height(e),n.bgcolor){var o=r.getContext("2d");o.fillStyle=n.bgcolor,o.fillRect(0,0,r.width,r.height)}return r}(e);return o.getContext("2d").drawImage(r,0,0),o})}function s(e,n,r){if(!r&&n&&!n(e))return Promise.resolve();return Promise.resolve(e).then(o).then(function(t){return i(e,t,n)}).then(function(t){return u(e,t)});function o(e){return e instanceof HTMLCanvasElement?t.makeImage(e.toDataURL()):e.cloneNode(!1)}function i(e,n,r){var o=e.childNodes;return 0===o.length?Promise.resolve(n):function(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return s(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}(n,t.asArray(o),r).then(function(){return n});function i(e,t,n){var r=Promise.resolve();return t.forEach(function(t){r=r.then(function(){return s(t,n)}).then(function(t){t&&e.appendChild(t)})}),r}}function u(e,n){return n instanceof Element?Promise.resolve().then(function(){!function(e,n){e.cssText?n.cssText=e.cssText:function(e,n){t.asArray(e).forEach(function(t){n.setProperty(t,e.getPropertyValue(t),e.getPropertyPriority(t))})}(e,n)}(window.getComputedStyle(e),n.style)}).then(function(){[":before",":after"].forEach(function(r){!function(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(""===i||"none"===i)return;var u=t.uid();n.className=n.className+" "+u;var c=document.createElement("style");c.appendChild(function(e,n,r){var o="."+e+":"+n,i=r.cssText?function(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}(r):function(e){return t.asArray(e).map(function(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}).join("; ")+";"}(r);return document.createTextNode(o+"{"+i+"}")}(u,r,o)),n.appendChild(c)}(r)})}).then(function(){e instanceof HTMLTextAreaElement&&(n.innerHTML=e.value);e instanceof HTMLInputElement&&n.setAttribute("value",e.value)}).then(function(){if(!(n instanceof SVGElement))return;if(n.setAttribute("xmlns","http://www.w3.org/2000/svg"),!(n instanceof SVGRectElement))return;["width","height"].forEach(function(e){var t=n.getAttribute(e);t&&n.style.setProperty(e,t)})}).then(function(){return n}):n;function r(){function r(e,n){if(e.cssText)n.cssText=e.cssText;else r(e,n);function r(e,n){t.asArray(e).forEach(function(t){n.setProperty(t,e.getPropertyValue(t),e.getPropertyPriority(t))})}}r(window.getComputedStyle(e),n.style)}function o(){function r(r){var o=window.getComputedStyle(e,r),i=o.getPropertyValue("content");if(i===""||i==="none")return;var u=t.uid();n.className=n.className+" "+u;var c=document.createElement("style");function a(e,n,r){var o="."+e+":"+n,i=r.cssText?u(r):c(r);return document.createTextNode(o+"{"+i+"}");function u(e){var t=e.getPropertyValue("content");return e.cssText+" content: "+t+";"}function c(e){return t.asArray(e).map(n).join("; ")+";";function n(t){return t+": "+e.getPropertyValue(t)+(e.getPropertyPriority(t)?" !important":"")}}}c.appendChild(a(u,r,o)),n.appendChild(c)}[":before",":after"].forEach(function(e){r(e)})}function i(){if(e instanceof HTMLTextAreaElement)n.innerHTML=e.value;if(e instanceof HTMLInputElement)n.setAttribute("value",e.value)}function u(){if(!(n instanceof SVGElement))return;if(n.setAttribute("xmlns","http://www.w3.org/2000/svg"),!(n instanceof SVGRectElement))return;["width","height"].forEach(function(e){var t=n.getAttribute(e);if(!t)return;n.style.setProperty(e,t)})}}}function l(e){return r.resolveAll().then(function(t){var n=document.createElement("style");return e.appendChild(n),n.appendChild(document.createTextNode(t)),e})}function f(e){return o.inlineAll(e).then(function(){return e})}"undefined"!=typeof module?module.exports=u:e.domtoimage=u}(this);
},{}],"kwCf":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PostBuilder=void 0;var e=require("../common.js"),t=require("../index.js");class s{constructor(e,t,s,i){this.tweet=e,this.user=t,this.media=s,this.theme=i}async createPhoto(){const s=(0,e.$)(".post-container"),i=s.cloneNode(!0);s.querySelectorAll(".media").forEach(e=>{e.classList.contains("hidden")&&e.remove()}),await(0,t.createScreenshot)(s,(0,e.$)(".content"),!0),(0,e.$)(".content").replaceChild(i,s)}display(){const s=this.tweet.date;if((0,e.$)(".post-container").style.opacity=1,(0,e.$)(".avatar").src=this.user.profile_image_url.replace("_normal",""),(0,e.$)(".name").innerHTML=this.user.name,(0,e.$)(".username").innerHTML=`@${this.user.username}`,(0,e.$)(".text").innerHTML=this.tweet.text,(0,e.$)(".datetime").innerHTML=`${s.hours}:${s.minutes} · ${s.day} ${s.month} ${s.year}`,this.applyTheme(this.theme),(0,e.$)(".media").forEach(e=>{e.classList.add("hidden")}),void 0!==this.media){(0,e.$)(".text").classList.remove("nomedia");const t=this.media.length,s=t<=4?t:"multi",i=(0,e.$)(`.media-${s}`);if(i.classList.remove("hidden"),1===t)i.querySelector("img").src=this.media[0].url;else{let e=0;i.querySelectorAll(".media-content").forEach(t=>{t.style.backgroundImage=`url(${this.media[e++].url})`})}}else(0,e.$)(".text").classList.add("nomedia");(0,e.$)(".settings-container").style.opacity=1,(0,t.positionSettings)()}applyTheme(t){(0,e.$)(".post-container").style.backgroundColor=t.background,(0,e.$)(".text-primary").forEach(e=>e.style.color=t.text.primary),(0,e.$)(".text-secondary").forEach(e=>e.style.color=t.text.secondary)}}exports.PostBuilder=s;
},{"../common.js":"oxqQ","../index.js":"g2Hq"}],"w3bu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Themes=exports.Accents=exports.Theme=void 0;class e{constructor(e,s,t,F){this.background=e,this.accent=s,this.text={primary:t,secondary:F}}}exports.Theme=e;const s={BLUE:"#1DA1F2",YELLOW:"#FFAD1F",RED:"#E0245E",PURPLE:"#794BC4",ORANGE:"#F45D22",GREEN:"#17BF63"};exports.Accents=s;const t={WHITE:new e("#FFFFFF",s.BLUE,"#0F1419","#7A7A7A"),DIM:new e("#14202A",s.BLUE,"#FFFFFF","#8899A6"),MIDNIGHT:new e("#000000",s.BLUE,"#D9D9D9","#6E767D")};exports.Themes=t;
},{}],"KAEt":[function(require,module,exports) {
var define;
var global = arguments[3];
var e,t=arguments[3];!function(t,n){"function"==typeof e&&e.amd?e([],n):"undefined"!=typeof exports?n():(n(),t.FileSaver={})}(this,function(){"use strict";function e(e,t,n){var o=new XMLHttpRequest;o.open("GET",e),o.responseType="blob",o.onload=function(){r(o.response,t,n)},o.onerror=function(){console.error("could not download file")},o.send()}function n(e){var t=new XMLHttpRequest;t.open("HEAD",e,!1);try{t.send()}catch(e){}return 200<=t.status&&299>=t.status}function o(t){try{t.dispatchEvent(new MouseEvent("click"))}catch(e){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),t.dispatchEvent(n)}}var a="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t&&t.global===t?t:void 0,i=a.navigator&&/Macintosh/.test(navigator.userAgent)&&/AppleWebKit/.test(navigator.userAgent)&&!/Safari/.test(navigator.userAgent),r=a.saveAs||("object"!=typeof window||window!==a?function(){}:"download"in HTMLAnchorElement.prototype&&!i?function(t,i,r){var s=a.URL||a.webkitURL,c=document.createElement("a");i=i||t.name||"download",c.download=i,c.rel="noopener","string"==typeof t?(c.href=t,c.origin===location.origin?o(c):n(c.href)?e(t,i,r):o(c,c.target="_blank")):(c.href=s.createObjectURL(t),setTimeout(function(){s.revokeObjectURL(c.href)},4e4),setTimeout(function(){o(c)},0))}:"msSaveOrOpenBlob"in navigator?function(t,a,i){if(a=a||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(function(e,t){return void 0===t?t={autoBom:!1}:"object"!=typeof t&&(console.warn("Deprecated: Expected third argument to be a object"),t={autoBom:!t}),t.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob(["\ufeff",e],{type:e.type}):e}(t,i),a);else if(n(t))e(t,a,i);else{var r=document.createElement("a");r.href=t,r.target="_blank",setTimeout(function(){o(r)})}}:function(t,n,o,r){if((r=r||open("","_blank"))&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof t)return e(t,n,o);var s="application/octet-stream"===t.type,c=/constructor/i.test(a.HTMLElement)||a.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent);if((l||s&&c||i)&&"undefined"!=typeof FileReader){var u=new FileReader;u.onloadend=function(){var e=u.result;e=l?e:e.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=e:location=e,r=null},u.readAsDataURL(t)}else{var f=a.URL||a.webkitURL,d=f.createObjectURL(t);r?r.location=d:location.href=d,r=null,setTimeout(function(){f.revokeObjectURL(d)},4e4)}});a.saveAs=r.saveAs=r,"undefined"!=typeof module&&(module.exports=r)});
},{}],"g2Hq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.positionSettings=v,exports.createScreenshot=A;var e,t=require("./common.js"),s=a(require("dom-to-image")),i=require("./obj/PostBuilder.js"),o=require("./obj/theme.js"),n=require("file-saver");function a(e){return e&&e.__esModule?e:{default:e}}var r,c=!1,d=!1,l=!0,u="WHITE";const p="AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB";function f(e){(0,t.$)(".theme").forEach(t=>{t.classList.remove("active"),t.classList.contains(e)&&t.classList.add("active")})}function m(){setTimeout(()=>{(0,t.$)(".settings-container").classList.remove("visible")},200),(0,t.$)(".option").forEach(e=>{e.classList.contains("settings")||e.fadeOut(300,!0)}),d=!1}function h(){(0,t.$)(".settings-container").classList.add("visible"),setTimeout(()=>{(0,t.$)(".option").forEach(e=>{e.classList.contains("settings")||e.fadeIn(300,"flex")})},600),d=!0}function v(){const e=(0,t.$)(".settings-container"),s=(0,t.$)(".post-container");setTimeout(()=>{(0,t.isDesktop)()?(e.style.top=s.offsetTop,e.style.right=s.offsetLeft-60,e.style.left="unset"):(e.style.top="",e.style.right="",e.style.left="")},100)}function y(t){(e=new i.PostBuilder(t.tweet,t.user,t.media,o.Themes.WHITE)).display(),c=!0}function w(e){if(void 0===e)throw new Error("No post provided");const t=e.data,s=new Date(t.created_at).toString().split(" GMT")[0].split(" "),i=s[s.length-1].split(":"),o={full:s.join(" "),dayName:s[0],month:s[1],day:s[2],year:s[3],hours:i[0],minutes:i[1],seconds:i[2]};return{tweet:{id:t.id,date:o,text:t.text.split(" ").filter(e=>!e.includes("t.co")).join(" ")},user:e.includes.users[0],media:e.includes.media}}async function g(e="1343331784621256709"){if(void 0===e)return;const t={"tweet.fields":"created_at,author_id",expansions:"author_id,attachments.media_keys","user.fields":"created_at,profile_image_url,username,verified,name","media.fields":"url,preview_image_url"};let s="";for(let o in t)s+=""===s?"?":"&",s+=`${o}=${t[o]}`;const i=`https://cors.bridged.cc/https://api.twitter.com/2/tweets/${e}${s}`;return await fetch(i,{headers:{Authorization:`Bearer ${p}`}}).then(e=>e.json())}function $(){const s=(0,t.$)(".theme-container");for(let[t,i]of Object.entries(o.Themes)){const o=document.createElement("div");o.classList.add("theme"),o.classList.add(t),o.dataset.color=i.background,o.style.backgroundColor=i.background,o.addEventListener("click",function(){f(t),e.applyTheme(i)}),s.appendChild(o)}}async function A(e,t,i=!1){i||await s.default.toPng(e).then(function(e){const s=document.createElement("img");s.src=e;const i=t.appendChild(s);i.style.position="absolute",i.style.top=0,i.style.zIndex=2}).catch(function(e){console.error("Could not render image: ",e)})}window.addEventListener("load",()=>{(0,t.$)(".container").style.opacity=1,$(),f(u)}),(0,t.$)(".load").addEventListener("click",async()=>{const e=(0,t.$)(".tweet-input").value;let s=e||void 0;const i=e.split("/");i.length>1&&(s=i[i.length-1]),(0,t.$)(".load").classList.add("dots");const o=w(await g(s));setTimeout(()=>{(0,t.$)(".load").classList.remove("dots"),(0,t.$)(".input-overlay").style.top=-window.innerHeight-200,(0,t.$)(".top-arrow").style.top=10,(0,t.$)(".top-arrow").classList.add("pulse")},500),y(o)}),(0,t.$)(".top-arrow").addEventListener("click",()=>{(0,t.$)(".input-overlay").style.top=0,c=!1}),(0,t.$)("body").addEventListener("click",()=>{d&&m()}),(0,t.$)(".option").forEach(e=>{const s=e.classList.value.replace("option","").trim();e.addEventListener("click",function(e){switch(s){case"themes":break;case"time":const e=(0,t.$)(".datetime");l?(e.fadeOut(300,!0),this.style.opacity=.4):(e.fadeIn(300,"block"),this.style.opacity=1),l=!l}e.stopPropagation()})}),new ResizeObserver(v).observe((0,t.$)(".post-container")),(0,t.$)(".settings").addEventListener("click",e=>{d?m():h(),e.stopPropagation()}),window.addEventListener("resize",()=>{c&&((0,t.$)(".input-overlay").style.top=-window.innerHeight-200,v())});
},{"./common.js":"oxqQ","dom-to-image":"JqUM","./obj/PostBuilder.js":"kwCf","./obj/theme.js":"w3bu","file-saver":"KAEt"}]},{},["g2Hq"], null)
//# sourceMappingURL=scripts.8ad35609.js.map