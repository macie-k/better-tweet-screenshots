// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"scripts/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$ = $;
exports.isDesktop = isDesktop;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;

function $(selector) {
  const nodes = document.querySelectorAll(selector);
  const nodesArray = Array.from(nodes);
  return nodesArray.length == 1 ? nodesArray[0] : nodesArray;
}

function isDesktop() {
  return window.innerWidth > 775;
}

function isBoolean(val) {
  return val === "true" || val === "false";
}

function isNumber(val) {
  return !isNaN(parseInt(val));
}

Element.prototype.animate = function (property, value, duration = 400, timing = 'ease-in-out', callback) {
  this.classList.add('animating');
  this.style.transition = `${property} ${duration}ms ${timing}`;
  setTimeout(() => {
    this.style[property] = value;
    this.addEventListener('transitionend', () => {
      this.classList.remove('animating');

      if (typeof callback == "function") {
        callback();
      }
    });
  }, 100);
};

Element.prototype.fadeIn = function (duration = 400, displayMode = false, limit = 1, callback) {
  const currentTransiton = this.style.transition;
  this.classList.add('fading');
  this.style.transition = `opacity ${duration}ms ease-in`;

  if (displayMode !== false) {
    this.style.display = displayMode;
  }

  setTimeout(() => {
    this.style.opacity = limit;
  }, 100);
  setTimeout(() => {
    this.classList.remove('fading');
    this.style.transition = currentTransiton;

    if (typeof callback == 'function') {
      callback();
    }
  }, duration + 200);
};

Element.prototype.fadeOut = function (duration = 400, disable = false, limit = 0, callback) {
  const currentTransiton = this.style.transition;
  this.classList.add('fading');
  this.style.transition = `opacity ${duration}ms ease-out`;
  setTimeout(() => {
    this.style.opacity = limit;
  }, 100);
  setTimeout(() => {
    this.classList.remove('fading');
    this.style.transition = currentTransiton;

    if (disable) {
      this.style.display = 'none';
    }

    if (typeof callback == 'function') {
      callback();
    }
  }, duration + 200);
};

Element.prototype.data = function (key, value) {
  if (value === undefined) {
    const rawVal = this.getAttribute(`data-${key}`);
    let returnVal = rawVal;
    if (isNumber(rawVal)) returnVal = parseInt(rawVal);
    if (isBoolean(rawVal)) returnVal = rawVal == 'true';
    return returnVal;
  } else {
    return this.setAttribute(`data-${key}`, value);
  }
};
},{}],"scripts/obj/PostBuilder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PostBuilder = void 0;

var _common = require("../common.js");

class PostBuilder {
  constructor(tweet, user, media, theme) {
    this.tweet = tweet;
    this.user = user;
    this.media = media;
    this.theme = theme;
  }

  display() {
    const date = this.tweet.date; // $('.input-container').style.display = 'none'

    (0, _common.$)('.post-container').style.opacity = 1;
    (0, _common.$)('.avatar').src = this.user.profile_image_url;
    (0, _common.$)('.name').innerHTML = this.user.name;
    (0, _common.$)('.username').innerHTML = `@${this.user.username}`;
    (0, _common.$)('.text').innerHTML = this.tweet.text;
    (0, _common.$)('.datetime').innerHTML = `${date.hours}:${date.minutes} · ${date.day} ${date.month} ${date.year}`;
    this.applyTheme(this.theme);

    if (this.media !== undefined) {
      (0, _common.$)('.text').classList.remove('nomedia');
      const amount = this.media.length;
      const nr = amount <= 4 ? amount : 'multi';
      const mediaContainer = (0, _common.$)(`.media-${nr}`);
      mediaContainer.classList.remove('hidden');

      if (amount === 1) {
        mediaContainer.querySelector('img').src = this.media[0].url;
      } else {
        let counter = 0;
        mediaContainer.querySelectorAll('.media-content').forEach(el => {
          el.style.backgroundImage = `url(${this.media[counter++].url})`;
        });
      }
    } else {
      (0, _common.$)('.text').classList.add('nomedia');
    }
  }

  applyTheme(theme) {
    (0, _common.$)('.post-container').style.backgroundColor = theme.background;
    (0, _common.$)('.text-primary').forEach(el => el.style.color = theme.text.primary);
    (0, _common.$)('.text-secondary').forEach(el => el.style.color = theme.text.secondary);
  }

}

exports.PostBuilder = PostBuilder;
},{"../common.js":"scripts/common.js"}],"scripts/obj/theme.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Themes = exports.Accents = exports.Theme = void 0;

class Theme {
  constructor(background, accent, textPrimary, textSecondary) {
    this.background = background;
    this.accent = accent;
    this.text = {
      primary: textPrimary,
      secondary: textSecondary
    };
  }

}

exports.Theme = Theme;
const Accents = {
  BLUE: '#1DA1F2',
  YELLOW: '#FFAD1F',
  RED: '#E0245E',
  PURPLE: '#794BC4',
  ORANGE: '#F45D22',
  GREEN: '#17BF63'
};
exports.Accents = Accents;
const Themes = {
  WHITE: new Theme('#FFFFFF', Accents.BLUE, '#0F1419', '#7A7A7A'),
  DIM: new Theme('#14202A', Accents.BLUE, '#FFFFFF', '#8899A6'),
  MIDNIGHT: new Theme('#000000', Accents.BLUE, '#D9D9D9', '#6E767D')
};
exports.Themes = Themes;
},{}],"scripts/index.js":[function(require,module,exports) {
"use strict";

var _common = require("./common.js");

var _PostBuilder = require("./obj/PostBuilder.js");

var _theme = require("./obj/theme.js");

// import dom2Img from 'dom-to-image'
const TWITTER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAALCNNwEAAAAAO0fvQSwiER9X%2FAFxKChvRxgDGYI%3DoWtrE96FRLO8i9nwNxeypKwG9YgCrYWniLg2cVQLTfIqShqTkB';
window.addEventListener('load', () => {
  (0, _common.$)('.container').style.opacity = 1;
});
(0, _common.$)('.load').addEventListener('click', async () => {
  const input = (0, _common.$)('.tweet-input').value;
  let id = input || undefined;
  const split = input.split('/');

  if (split.length > 1) {
    id = split[split.length - 1];
  }

  (0, _common.$)('.load').classList.add('dots');
  const results = await getTweetInformation(id);
  const tweetData = parseTweetInformation(results);
  setTimeout(() => {
    (0, _common.$)('.load').classList.remove('dots');
    (0, _common.$)('.input-overlay').style.top = -window.innerHeight;
  }, 500);
  showTweet(tweetData);
});

function showTweet(data) {
  console.log(data.media);
  const post = new _PostBuilder.PostBuilder(data.tweet, data.user, data.media, _theme.Themes.WHITE);
  post.display();
}

function parseTweetInformation(data) {
  if (data === undefined) {
    throw new Error('No post provided');
  }

  const tweet_data = data.data;
  const twDateArray = new Date(tweet_data.created_at).toString().split(" GMT")[0].split(' '); // format ISO 8601 date

  const twTimeArray = twDateArray[twDateArray.length - 1].split(':'); // separate time from date

  const tweetDate = {
    full: twDateArray.join(' '),
    dayName: twDateArray[0],
    month: twDateArray[1],
    day: twDateArray[2],
    year: twDateArray[3],
    hours: twTimeArray[0],
    minutes: twTimeArray[1],
    seconds: twTimeArray[2]
  };
  const tweet = {
    id: tweet_data.id,
    date: tweetDate,
    text: tweet_data.text.split(' ').filter(el => !el.includes('t.co')).join(' ')
  };
  const user = data.includes.users[0];
  const media = data.includes.media;
  return {
    tweet: tweet,
    user: user,
    media: media
  };
}

async function getTweetInformation(id) {
  if (id === undefined) {
    return undefined;
  }

  const endpointURL = 'https://api.twitter.com/2/tweets/';
  const prefix = 'http://127.0.0.1:8080/';
  const params = {
    "tweet.fields": "created_at,author_id",
    "expansions": "author_id,attachments.media_keys",
    "user.fields": "created_at,profile_image_url,username,verified,name",
    "media.fields": "url,preview_image_url"
  };
  let combinedParams = '';

  for (let p in params) {
    combinedParams += combinedParams === '' ? '?' : '&';
    combinedParams += `${p}=${params[p]}`;
  }

  const requestURL = `${prefix}${endpointURL}${id}${combinedParams}`;
  const res = await fetch(requestURL, {
    headers: {
      "Authorization": `Bearer ${TWITTER_TOKEN}`
    }
  }).then(response => {
    return response.json();
  });
  return res;
}

function createScreenshot(sourceNode, targetNode) {
  dom2Img.toPng(sourceNode).then(function (dataUrl) {
    const img = document.createElement('img');
    img.src = dataUrl;
    const element = targetNode.appendChild(img);
    element.style.position = 'absolute';
    element.style.top = 0;
    element.style.zIndex = 2;
  }).catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
} // var _0x50e1=['\x63\x72\x65\x61\x74\x65\x43\x6f\x6d\x6d\x65\x6e\x74','\x6c\x6f\x61\x64','\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72','\x43\x72\x65\x61\x74\x65\x64\x20\x62\x79\x20\x4d\x61\x63\x69\x65\x6a\x20\x4b\x61\u017a\x6d\x69\x65\x72\x63\x7a\x79\x6b\x20\x7e\x20\x40\x6d\x61\x63\x69\x65\x2e\x6b','\x61\x70\x70\x65\x6e\x64\x43\x68\x69\x6c\x64','\x68\x65\x61\x64'];(function(_0x349391,_0x8c7c3a){var _0x50e109=function(_0x483bd4){while(--_0x483bd4){_0x349391['\x70\x75\x73\x68'](_0x349391['\x73\x68\x69\x66\x74']());}};_0x50e109(++_0x8c7c3a);}(_0x50e1,0xbf));var _0x483b=function(_0x349391,_0x8c7c3a){_0x349391=_0x349391-0x15e;var _0x50e109=_0x50e1[_0x349391];return _0x50e109;};var _0x2549fb=_0x483b;window[_0x2549fb(0x161)](_0x2549fb(0x160),()=>{var _0x5428be=_0x2549fb;document[_0x5428be(0x15e)][_0x5428be(0x163)](document[_0x5428be(0x15f)](_0x5428be(0x162)));});
},{"./common.js":"scripts/common.js","./obj/PostBuilder.js":"scripts/obj/PostBuilder.js","./obj/theme.js":"scripts/obj/theme.js"}],"C:/Users/MacieK/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "192.168.0.5" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "6395" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/MacieK/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","scripts/index.js"], null)
//# sourceMappingURL=/scripts.bcf3243b.js.map