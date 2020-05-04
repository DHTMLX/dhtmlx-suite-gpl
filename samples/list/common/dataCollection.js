/*
@license

undefined v.6.0.1 Professional

This software is covered by DHTMLX Commercial License.
Usage without proper license is prohibited.

(c) XB Software.

*/
if (window.dhx){ window.dhx_legacy = dhx; delete window.dhx; }(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dhx"] = factory();
	else
		root["dhx"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/codebase/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "../ts-data/sources/entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/promiz/promiz.js":
/*!****************************************!*\
  !*** ../node_modules/promiz/promiz.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, setImmediate) {(function () {
  global = this

  var queueId = 1
  var queue = {}
  var isRunningTask = false

  if (!global.setImmediate)
    global.addEventListener('message', function (e) {
      if (e.source == global){
        if (isRunningTask)
          nextTick(queue[e.data])
        else {
          isRunningTask = true
          try {
            queue[e.data]()
          } catch (e) {}

          delete queue[e.data]
          isRunningTask = false
        }
      }
    })

  function nextTick(fn) {
    if (global.setImmediate) setImmediate(fn)
    // if inside of web worker
    else if (global.importScripts) setTimeout(fn)
    else {
      queueId++
      queue[queueId] = fn
      global.postMessage(queueId, '*')
    }
  }

  Deferred.resolve = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    if (value instanceof Deferred)
      return value

    return new Deferred(function (resolve) {
        resolve(value)
    })
  }

  Deferred.reject = function (value) {
    if (!(this._d == 1))
      throw TypeError()

    return new Deferred(function (resolve, reject) {
        reject(value)
    })
  }

  Deferred.all = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            arr[i] = r
            done()
            return r
          }, done)
      })
    }

    done()

    return d
  }

  Deferred.race = function (arr) {
    if (!(this._d == 1))
      throw TypeError()

    if (!(arr instanceof Array))
      return Deferred.reject(TypeError())

    if (arr.length == 0)
      return new Deferred()

    var d = new Deferred()

    function done(e, v) {
      if (v)
        return d.resolve(v)

      if (e)
        return d.reject(e)

      var unresolved = arr.reduce(function (cnt, v) {
        if (v && v.then)
          return cnt + 1
        return cnt
      }, 0)

      if(unresolved == 0)
        d.resolve(arr)

      arr.map(function (v, i) {
        if (v && v.then)
          v.then(function (r) {
            done(null, r)
          }, done)
      })
    }

    done()

    return d
  }

  Deferred._d = 1


  /**
   * @constructor
   */
  function Deferred(resolver) {
    'use strict'
    if (typeof resolver != 'function' && resolver != undefined)
      throw TypeError()

    if (typeof this != 'object' || (this && this.then))
      throw TypeError()

    // states
    // 0: pending
    // 1: resolving
    // 2: rejecting
    // 3: resolved
    // 4: rejected
    var self = this,
      state = 0,
      val = 0,
      next = [],
      fn, er;

    self['promise'] = self

    self['resolve'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 1

        nextTick(fire)
      }
      return self
    }

    self['reject'] = function (v) {
      fn = self.fn
      er = self.er
      if (!state) {
        val = v
        state = 2

        nextTick(fire)

      }
      return self
    }

    self['_d'] = 1

    self['then'] = function (_fn, _er) {
      if (!(this._d == 1))
        throw TypeError()

      var d = new Deferred()

      d.fn = _fn
      d.er = _er
      if (state == 3) {
        d.resolve(val)
      }
      else if (state == 4) {
        d.reject(val)
      }
      else {
        next.push(d)
      }

      return d
    }

    self['catch'] = function (_er) {
      return self['then'](null, _er)
    }

    var finish = function (type) {
      state = type || 4
      next.map(function (p) {
        state == 3 && p.resolve(val) || p.reject(val)
      })
    }

    try {
      if (typeof resolver == 'function')
        resolver(self['resolve'], self['reject'])
    } catch (e) {
      self['reject'](e)
    }

    return self

    // ref : reference to 'then' function
    // cb, ec, cn : successCallback, failureCallback, notThennableCallback
    function thennable (ref, cb, ec, cn) {
      // Promises can be rejected with other promises, which should pass through
      if (state == 2) {
        return cn()
      }
      if ((typeof val == 'object' || typeof val == 'function') && typeof ref == 'function') {
        try {

          // cnt protects against abuse calls from spec checker
          var cnt = 0
          ref.call(val, function (v) {
            if (cnt++) return
            val = v
            cb()
          }, function (v) {
            if (cnt++) return
            val = v
            ec()
          })
        } catch (e) {
          val = e
          ec()
        }
      } else {
        cn()
      }
    };

    function fire() {

      // check if it's a thenable
      var ref;
      try {
        ref = val && val.then
      } catch (e) {
        val = e
        state = 2
        return fire()
      }

      thennable(ref, function () {
        state = 1
        fire()
      }, function () {
        state = 2
        fire()
      }, function () {
        try {
          if (state == 1 && typeof fn == 'function') {
            val = fn(val)
          }

          else if (state == 2 && typeof er == 'function') {
            val = er(val)
            state = 1
          }
        } catch (e) {
          val = e
          return finish()
        }

        if (val == self) {
          val = TypeError()
          finish()
        } else thennable(ref, function () {
            finish(3)
          }, finish, function () {
            finish(state == 1 && 3)
          })

      })
    }


  }

  // Export our library object, either for node.js or as a globally scoped variable
  if (true) {
    module['exports'] = Deferred
  } else {}
})()

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../timers-browserify/main.js */ "../node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "../node_modules/setimmediate/setImmediate.js":
/*!****************************************************!*\
  !*** ../node_modules/setimmediate/setImmediate.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/timers-browserify/main.js":
/*!*************************************************!*\
  !*** ../node_modules/timers-browserify/main.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "../node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../ts-common/core.ts":
/*!****************************!*\
  !*** ../ts-common/core.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(/*! ./html */ "../ts-common/html.ts");
var counter = (new Date()).valueOf();
function uid() {
    return "u" + (counter++);
}
exports.uid = uid;
function extend(target, source, deep) {
    if (deep === void 0) { deep = true; }
    if (source) {
        for (var key in source) {
            var sobj = source[key];
            var tobj = target[key];
            if (deep && typeof tobj === "object" && !(tobj instanceof Date) && !(tobj instanceof Array)) {
                extend(tobj, sobj);
            }
            else {
                target[key] = sobj;
            }
        }
    }
    return target;
}
exports.extend = extend;
function copy(source, withoutInner) {
    var result = {};
    for (var key in source) {
        if (!withoutInner || key[0] !== "$") {
            result[key] = source[key];
        }
    }
    return result;
}
exports.copy = copy;
function naturalSort(arr) {
    return arr.sort(function (a, b) {
        var nn = typeof a === "string" ? a.localeCompare(b) : a - b;
        return nn;
    });
}
exports.naturalSort = naturalSort;
function findIndex(arr, predicate) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
        if (predicate(arr[i])) {
            return i;
        }
    }
    return -1;
}
exports.findIndex = findIndex;
function isEqualString(from, to) {
    if (from.length > to.length) {
        return false;
    }
    for (var i = 0; i < from.length; i++) {
        if (from[i].toLowerCase() !== to[i].toLowerCase()) {
            return false;
        }
    }
    return true;
}
exports.isEqualString = isEqualString;
function singleOuterClick(fn) {
    var click = function (e) {
        if (fn(e)) {
            document.removeEventListener("click", click);
        }
    };
    document.addEventListener("click", click);
}
exports.singleOuterClick = singleOuterClick;
function detectWidgetClick(widgetId, cb) {
    var click = function (e) { return cb(html_1.locate(e, "dhx_widget_id") === widgetId); };
    document.addEventListener("click", click);
    return function () { return document.removeEventListener("click", click); };
}
exports.detectWidgetClick = detectWidgetClick;
function unwrapBox(box) {
    if (Array.isArray(box)) {
        return box[0];
    }
    return box;
}
exports.unwrapBox = unwrapBox;
function wrapBox(unboxed) {
    if (Array.isArray(unboxed)) {
        return unboxed;
    }
    return [unboxed];
}
exports.wrapBox = wrapBox;
function isDefined(some) {
    return some !== null && some !== undefined;
}
exports.isDefined = isDefined;
function range(from, to) {
    if (from > to) {
        return [];
    }
    var result = [];
    while (from <= to) {
        result.push(from++);
    }
    return result;
}
exports.range = range;


/***/ }),

/***/ "../ts-common/events.ts":
/*!******************************!*\
  !*** ../ts-common/events.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventSystem = /** @class */ (function () {
    function EventSystem(context) {
        this.events = {};
        this.context = context || this;
    }
    EventSystem.prototype.on = function (name, callback, context) {
        var event = name.toLowerCase();
        this.events[event] = this.events[event] || [];
        this.events[event].push({ callback: callback, context: context || this.context });
    };
    EventSystem.prototype.detach = function (name, context) {
        var event = name.toLowerCase();
        var eStack = this.events[event];
        if (context && eStack && eStack.length) {
            for (var i = eStack.length - 1; i >= 0; i--) {
                if (eStack[i].context === context) {
                    eStack.splice(i, 1);
                }
            }
        }
        else {
            this.events[event] = [];
        }
    };
    EventSystem.prototype.fire = function (name, args) {
        if (typeof args === "undefined") {
            args = [];
        }
        var event = name.toLowerCase();
        if (this.events[event]) {
            var res = this.events[event].map(function (e) { return e.callback.apply(e.context, args); });
            return res.indexOf(false) < 0;
        }
        return true;
    };
    EventSystem.prototype.clear = function () {
        this.events = {};
    };
    return EventSystem;
}());
exports.EventSystem = EventSystem;
function EventsMixin(obj) {
    obj = obj || {};
    var eventSystem = new EventSystem(obj);
    obj.detachEvent = eventSystem.detach.bind(eventSystem);
    obj.attachEvent = eventSystem.on.bind(eventSystem);
    obj.callEvent = eventSystem.fire.bind(eventSystem);
}
exports.EventsMixin = EventsMixin;


/***/ }),

/***/ "../ts-common/html.ts":
/*!****************************!*\
  !*** ../ts-common/html.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./polyfills/matches */ "../ts-common/polyfills/matches.ts");
function toNode(node) {
    if (typeof node === "string") {
        node = (document.getElementById(node) || document.querySelector(node));
    }
    return node || document.body;
}
exports.toNode = toNode;
function eventHandler(prepare, hash) {
    var keys = Object.keys(hash);
    return function (ev) {
        var data = prepare(ev);
        var node = ev.target;
        while (node) {
            var cssstring = node.getAttribute ? (node.getAttribute("class") || "") : "";
            if (cssstring.length) {
                var css = cssstring.split(" ");
                for (var j = 0; j < keys.length; j++) {
                    if (css.indexOf(keys[j]) > -1) {
                        return hash[keys[j]](ev, data);
                    }
                }
            }
            node = node.parentNode;
        }
        return true;
    };
}
exports.eventHandler = eventHandler;
function locate(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    var node = locateNode(target, attr);
    return node ? node.getAttribute(attr) : "";
}
exports.locate = locate;
function locateNode(target, attr) {
    if (attr === void 0) { attr = "dhx_id"; }
    if (target instanceof Event) {
        target = target.target;
    }
    while (target) {
        if (target.getAttribute && target.getAttribute(attr)) {
            return target;
        }
        target = target.parentNode;
    }
}
exports.locateNode = locateNode;
function getBox(elem) {
    var box = elem.getBoundingClientRect();
    var body = document.body;
    var scrollTop = window.pageYOffset || body.scrollTop;
    var scrollLeft = window.pageXOffset || body.scrollLeft;
    var top = box.top + scrollTop;
    var left = box.left + scrollLeft;
    var right = body.offsetWidth - box.right;
    var bottom = body.offsetHeight - box.bottom;
    var width = box.right - box.left;
    var height = box.bottom - box.top;
    return { top: top, left: left, right: right, bottom: bottom, width: width, height: height };
}
exports.getBox = getBox;
var scrollWidth = -1;
function getScrollbarWidth() {
    if (scrollWidth > -1) {
        return scrollWidth;
    }
    var scrollDiv = document.createElement("div");
    document.body.appendChild(scrollDiv);
    scrollDiv.style.cssText = "position: absolute;left: -99999px;overflow:scroll;width: 100px;height: 100px;";
    scrollWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollWidth;
}
exports.getScrollbarWidth = getScrollbarWidth;
function fitPosition(node, config) {
    return calculatePosition(getRealPosition(node), config);
}
exports.fitPosition = fitPosition;
function isIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
}
exports.isIE = isIE;
function getRealPosition(node) {
    var rects = node.getBoundingClientRect();
    return {
        left: rects.left + window.pageXOffset,
        right: rects.right + window.pageXOffset,
        top: rects.top + window.pageYOffset,
        bottom: rects.bottom + window.pageYOffset
    };
}
exports.getRealPosition = getRealPosition;
var Position;
(function (Position) {
    Position["left"] = "left";
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["top"] = "top";
})(Position = exports.Position || (exports.Position = {}));
function calculatePosition(pos, config) {
    var _a = config.mode === Position.bottom || config.mode === Position.top
        ? placeBottomOrTop(pos, config)
        : placeRightOrLeft(pos, config), left = _a.left, top = _a.top;
    return {
        left: Math.round(left) + "px",
        top: Math.round(top) + "px",
        minWidth: Math.round(config.width) + "px",
        position: "absolute"
    };
}
exports.calculatePosition = calculatePosition;
function getWindowBorders() {
    return {
        rightBorder: window.pageXOffset + window.innerWidth,
        bottomBorder: window.pageYOffset + window.innerHeight
    };
}
function horizontalCentering(pos, width, rightBorder) {
    var nodeWidth = pos.right - pos.left;
    var diff = (width - nodeWidth) / 2;
    var left = pos.left - diff;
    var right = pos.right + diff;
    if (left >= 0 && right <= rightBorder) {
        return left;
    }
    if (left < 0) {
        return 0;
    }
    return rightBorder - width;
}
function verticalCentering(pos, height, bottomBorder) {
    var nodeHeight = pos.bottom - pos.top;
    var diff = (height - nodeHeight) / 2;
    var top = pos.top - diff;
    var bottom = pos.bottom + diff;
    if (top >= 0 && bottom <= bottomBorder) {
        return top;
    }
    if (top < 0) {
        return 0;
    }
    return bottomBorder - height;
}
function placeBottomOrTop(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var bottomDiff = bottomBorder - pos.bottom - config.height;
    var topDiff = pos.top - config.height;
    if (config.mode === Position.bottom) {
        if (bottomDiff >= 0) {
            top = pos.bottom;
        }
        else if (topDiff >= 0) {
            top = topDiff;
        }
    }
    else {
        if (topDiff >= 0) {
            top = topDiff;
        }
        else if (bottomDiff >= 0) {
            top = pos.bottom;
        }
    }
    if (bottomDiff < 0 && topDiff < 0) {
        if (config.auto) {
            return placeRightOrLeft(pos, __assign({}, config, { mode: Position.right, auto: false }));
        }
        top = bottomDiff > topDiff ? pos.bottom : topDiff;
    }
    if (config.centering) {
        left = horizontalCentering(pos, config.width, rightBorder);
    }
    else {
        var leftDiff = rightBorder - pos.left - config.width;
        var rightDiff = pos.right - config.width;
        if (leftDiff >= 0) {
            left = pos.left;
        }
        else if (rightDiff >= 0) {
            left = rightDiff;
        }
        else {
            left = rightDiff > leftDiff ? pos.left : rightDiff;
        }
    }
    return { left: left, top: top };
}
function placeRightOrLeft(pos, config) {
    var _a = getWindowBorders(), rightBorder = _a.rightBorder, bottomBorder = _a.bottomBorder;
    var left;
    var top;
    var rightDiff = rightBorder - pos.right - config.width;
    var leftDiff = pos.left - config.width;
    if (config.mode === Position.right) {
        if (rightDiff >= 0) {
            left = pos.right;
        }
        else if (leftDiff >= 0) {
            left = leftDiff;
        }
    }
    else {
        if (leftDiff >= 0) {
            left = leftDiff;
        }
        else if (rightDiff >= 0) {
            left = pos.right;
        }
    }
    if (leftDiff < 0 && rightDiff < 0) {
        if (config.auto) {
            return placeBottomOrTop(pos, __assign({}, config, { mode: Position.bottom, auto: false }));
        }
        left = leftDiff > rightDiff ? leftDiff : pos.right;
    }
    if (config.centering) {
        top = verticalCentering(pos, config.height, rightBorder);
    }
    else {
        var bottomDiff = pos.bottom - config.height;
        var topDiff = bottomBorder - pos.top - config.height;
        if (topDiff >= 0) {
            top = pos.top;
        }
        else if (bottomDiff > 0) {
            top = bottomDiff;
        }
        else {
            top = bottomDiff > topDiff ? bottomDiff : pos.top;
        }
    }
    return { left: left, top: top };
}


/***/ }),

/***/ "../ts-common/polyfills/matches.ts":
/*!*****************************************!*\
  !*** ../ts-common/polyfills/matches.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}


/***/ }),

/***/ "../ts-data/sources/datacollection.ts":
/*!********************************************!*\
  !*** ../ts-data/sources/datacollection.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var loader_1 = __webpack_require__(/*! ./datacollection/loader */ "../ts-data/sources/datacollection/loader.ts");
var sort_1 = __webpack_require__(/*! ./datacollection/sort */ "../ts-data/sources/datacollection/sort.ts");
var dataproxy_1 = __webpack_require__(/*! ./dataproxy */ "../ts-data/sources/dataproxy.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-data/sources/helpers.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var DataCollection = /** @class */ (function () {
    function DataCollection(config, events) {
        this.config = config || {};
        this._order = [];
        this._pull = {};
        this._changes = { order: [] };
        this._initOrder = null;
        this._sort = new sort_1.Sort();
        this._loader = new loader_1.Loader(this, this._changes);
        this.events = events || new events_1.EventSystem(this);
    }
    DataCollection.prototype.add = function (obj, index) {
        if (!this.events.fire(types_1.DataEvents.beforeAdd, [obj])) {
            return;
        }
        var id = this._addCore(obj, index);
        this._onChange("add", obj.id, obj);
        this.events.fire(types_1.DataEvents.afterAdd, [obj]);
        return id;
    };
    DataCollection.prototype.remove = function (id) {
        var obj = this._pull[id];
        if (obj) {
            if (!this.events.fire(types_1.DataEvents.beforeRemove, [obj])) {
                return;
            }
            this._removeCore(obj.id);
            this._onChange("remove", id, obj);
        }
        this.events.fire(types_1.DataEvents.afterRemove, [obj]);
    };
    DataCollection.prototype.removeAll = function () {
        this._removeAll();
        this.events.fire(types_1.DataEvents.removeAll);
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.exists = function (id) {
        return !!this._pull[id];
    };
    DataCollection.prototype.getNearId = function (id) {
        var item = this._pull[id];
        if (!item) {
            return this._order[0].id || "";
        }
    };
    DataCollection.prototype.getItem = function (id) {
        return this._pull[id];
    };
    DataCollection.prototype.update = function (id, obj, silent) {
        var item = this.getItem(id);
        if (item) {
            if (helpers_1.isEqualObj(obj, item)) {
                return;
            }
            if (obj.id && id !== obj.id) {
                helpers_1.dhxWarning("this method doesn't allow change id");
                if (helpers_1.isDebug()) {
                    // tslint:disable-next-line:no-debugger
                    debugger;
                }
            }
            else {
                core_1.extend(this._pull[id], obj, false);
                if (this.config.update) {
                    this.config.update(this._pull[id]);
                }
                if (!silent) {
                    this._onChange("update", id, this._pull[id]);
                }
            }
        }
        else {
            helpers_1.dhxWarning("item not found");
        }
    };
    DataCollection.prototype.getIndex = function (id) {
        var res = core_1.findIndex(this._order, function (item) { return item.id === id; });
        if (this._pull[id] && res >= 0) {
            return res;
        }
        return -1;
    };
    DataCollection.prototype.getId = function (index) {
        if (!this._order[index]) {
            return;
        }
        return this._order[index].id;
    };
    DataCollection.prototype.getLength = function () {
        return this._order.length;
    };
    DataCollection.prototype.filter = function (rule, config) {
        var _this = this;
        config = core_1.extend({
            add: false,
            multiple: true
        }, config);
        if (!config.add) {
            this._order = this._initOrder || this._order;
            this._initOrder = null;
        }
        this._filters = this._filters || {};
        if (!config.multiple || !rule) {
            this._filters = {};
        }
        if (rule) {
            if (typeof rule === "function") {
                var f = "_";
                this._filters[f] = {
                    match: f,
                    compare: rule
                };
            }
            else {
                if (!rule.match) {
                    delete this._filters[rule.by];
                }
                else {
                    rule.compare = rule.compare || (function (val, match) { return val === match; });
                    this._filters[rule.by] = rule;
                }
            }
            var fOrder = this._order.filter(function (item) {
                return Object.keys(_this._filters).every(function (key) {
                    return item[key] ?
                        _this._filters[key].compare(item[key], _this._filters[key].match, item)
                        : _this._filters[key].compare(item);
                });
            });
            if (!this._initOrder) {
                this._initOrder = this._order;
                this._order = fOrder;
            }
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.find = function (conf) {
        for (var key in this._pull) {
            var res = helpers_1.findByConf(this._pull[key], conf);
            if (res) {
                return res;
            }
        }
        return null;
    };
    DataCollection.prototype.findAll = function (conf) {
        var res = [];
        for (var key in this._pull) {
            var item = helpers_1.findByConf(this._pull[key], conf);
            if (item) {
                res.push(item);
            }
        }
        return res;
    };
    DataCollection.prototype.sort = function (by) {
        this._sort.sort(this._order, by);
        if (this._initOrder && this._initOrder.length) {
            this._sort.sort(this._initOrder, by);
        }
        this.events.fire(types_1.DataEvents.change);
    };
    DataCollection.prototype.copy = function (id, index, target, targetId) {
        if (!this.exists(id)) {
            return null;
        }
        var newid = core_1.uid();
        if (target) {
            if (!(target instanceof DataCollection) && targetId) {
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index, targetId);
                return;
            }
            if (target.exists(id)) {
                target.add(__assign({}, helpers_1.copyWithoutInner(this.getItem(id)), { id: newid }), index);
                return newid;
            }
            else {
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                return id;
            }
        }
        this.add(__assign({}, helpers_1.copyWithoutInner(this.getItem(id)), { id: newid }), index);
        return newid;
    };
    DataCollection.prototype.move = function (id, index, target, targetId) {
        if (target && target !== this && this.exists(id)) {
            var item = core_1.copy(this.getItem(id), true);
            if (target.exists(id)) {
                item.id = core_1.uid();
            }
            if (targetId) {
                item.parent = targetId;
            }
            target.add(item, index);
            // remove data from original collection
            this.remove(id);
            return item.id;
        }
        if (this.getIndex(id) === index) {
            return null;
        }
        // move other elements
        var spliced = this._order.splice(this.getIndex(id), 1)[0];
        if (index === -1) {
            index = this._order.length;
        }
        this._order.splice(index, 0, spliced);
        this.events.fire(types_1.DataEvents.change); // if target not this, it trigger add and remove
        return id;
    };
    DataCollection.prototype.load = function (url, driver) {
        if (typeof url === "string") {
            url = new dataproxy_1.DataProxy(url);
        }
        return this._loader.load(url, driver);
    };
    DataCollection.prototype.parse = function (data, driver) {
        this._removeAll();
        return this._loader.parse(data, driver);
    };
    DataCollection.prototype.$parse = function (data) {
        var apx = this.config.approximate;
        if (apx) {
            data = this._approximate(data, apx.value, apx.maxNum);
        }
        this._parse_data(data);
        this.events.fire(types_1.DataEvents.change);
        this.events.fire(types_1.DataEvents.load);
    };
    DataCollection.prototype.save = function (url) {
        this._loader.save(url);
    };
    // todo: loop through the array and check saved statuses
    DataCollection.prototype.isSaved = function () {
        return !this._changes.order.length; // todo: bad solution, errors and holded elments are missed...
    };
    DataCollection.prototype.map = function (cb) {
        var result = [];
        for (var i = 0; i < this._order.length; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.mapRange = function (from, to, cb) {
        if (from < 0) {
            from = 0;
        }
        if (to > this._order.length - 1) {
            to = this._order.length - 1;
        }
        var result = [];
        for (var i = from; i <= to; i++) {
            result.push(cb.call(this, this._order[i], i));
        }
        return result;
    };
    DataCollection.prototype.reduce = function (cb, acc) {
        for (var i = 0; i < this._order.length; i++) {
            acc = cb.call(this, acc, this._order[i], i);
        }
        return acc;
    };
    DataCollection.prototype.serialize = function (driver) {
        if (driver === void 0) { driver = types_1.DataDriver.json; }
        var data = this.map(function (item) {
            var newItem = __assign({}, item);
            Object.keys(newItem).forEach(function (key) {
                if (key[0] === "$") {
                    delete newItem[key];
                }
            });
            return newItem;
        });
        var dataDriver = helpers_1.toDataDriver(driver);
        if (dataDriver) {
            return dataDriver.serialize(data);
        }
    };
    DataCollection.prototype.getInitialData = function () {
        return this._initOrder;
    };
    DataCollection.prototype._removeAll = function () {
        this._pull = {};
        this._order = [];
        this._changes.order = [];
        this._initOrder = null;
    };
    DataCollection.prototype._addCore = function (obj, index) {
        if (this.config.init) {
            obj = this.config.init(obj);
        }
        obj.id = obj.id ? obj.id.toString() : core_1.uid();
        if (this._pull[obj.id]) {
            helpers_1.dhxError("Item already exist");
        }
        // todo: not ideal solution
        if (this._initOrder && this._initOrder.length) {
            this._addToOrder(this._initOrder, obj, index);
        }
        this._addToOrder(this._order, obj, index);
        return obj.id;
    };
    DataCollection.prototype._removeCore = function (id) {
        if (this.getIndex(id) >= 0) {
            this._order = this._order.filter(function (el) { return el.id !== id; });
            delete this._pull[id];
        }
        if (this._initOrder && this._initOrder.length) {
            this._initOrder = this._initOrder.filter(function (el) { return el.id !== id; });
        }
    };
    DataCollection.prototype._parse_data = function (data) {
        var index = this._order.length;
        if (this.config.prep) {
            data = this.config.prep(data);
        }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            obj.id = (obj.id || obj.id === 0) ? obj.id : core_1.uid();
            this._pull[obj.id] = obj;
            this._order[index++] = obj;
        }
    };
    DataCollection.prototype._approximate = function (data, values, maxNum) {
        var len = data.length;
        var vlen = values.length;
        var rlen = Math.floor(len / maxNum);
        var newData = Array(Math.ceil(len / rlen));
        var index = 0;
        for (var i = 0; i < len; i += rlen) {
            var newItem = core_1.copy(data[i]);
            var end = Math.min(len, i + rlen);
            for (var j = 0; j < vlen; j++) {
                var sum = 0;
                for (var z = i; z < end; z++) {
                    sum += data[z][values[j]];
                }
                newItem[values[j]] = sum / (end - i);
            }
            newData[index++] = newItem;
        }
        return newData;
    };
    DataCollection.prototype._onChange = function (status, id, obj) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var item = _a[_i];
            // update pending item if previous state is "saving" or if item not saved yet
            if (item.id === id && !item.saving) {
                // update item
                if (item.error) {
                    item.error = false;
                }
                item = __assign({}, item, { obj: obj, status: status });
                this.events.fire(types_1.DataEvents.change, [id, status, obj]);
                return;
            }
        }
        this._changes.order.push({ id: id, status: status, obj: __assign({}, obj), saving: false });
        this.events.fire(types_1.DataEvents.change, [id, status, obj]);
    };
    DataCollection.prototype._addToOrder = function (array, obj, index) {
        if (index >= 0 && array[index]) {
            this._pull[obj.id] = obj;
            array.splice(index, 0, obj);
        }
        else {
            this._pull[obj.id] = obj;
            array.push(obj);
        }
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;


/***/ }),

/***/ "../ts-data/sources/datacollection/loader.ts":
/*!***************************************************!*\
  !*** ../ts-data/sources/datacollection/loader.ts ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ./../helpers */ "../ts-data/sources/helpers.ts");
var Loader = /** @class */ (function () {
    function Loader(parent, changes) {
        this._parent = parent;
        this._changes = changes; // todo: [dirty] mutation
    }
    Loader.prototype.load = function (url, driver) {
        var _this = this;
        return this._parent.loadData = url.load().then(function (data) {
            _this._parent.removeAll();
            _this.parse(data, driver);
        });
    };
    Loader.prototype.parse = function (data, driver) {
        if (driver === void 0) { driver = "json"; }
        driver = helpers_1.toDataDriver(driver);
        data = driver.toJsonArray(data);
        this._parent.$parse(data);
    };
    Loader.prototype.save = function (url) {
        var _this = this;
        var _loop_1 = function (el) {
            if (el.saving || el.pending) {
                helpers_1.dhxWarning("item is saving");
            }
            else {
                var prevEl_1 = this_1._findPrevState(el.id);
                if (prevEl_1 && prevEl_1.saving) {
                    var pending = new Promise(function (res, rej) {
                        prevEl_1.promise.then(function () {
                            el.pending = false;
                            res(_this._setPromise(el, url));
                        }).catch(function (err) {
                            _this._removeFromOrder(prevEl_1);
                            _this._setPromise(el, url);
                            helpers_1.dhxWarning(err);
                            rej(err);
                        });
                    });
                    this_1._addToChain(pending);
                    el.pending = true;
                }
                else {
                    this_1._setPromise(el, url);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            _loop_1(el);
        }
        this._parent.saveData.then(function () {
            _this._saving = false;
        });
    };
    Loader.prototype._setPromise = function (el, url) {
        var _this = this;
        el.promise = url.save(el.obj, el.status);
        el.promise.then(function () {
            _this._removeFromOrder(el);
        }).catch(function (err) {
            el.saving = false;
            el.error = true;
            helpers_1.dhxError(err);
        });
        el.saving = true;
        this._saving = true;
        this._addToChain(el.promise);
        return el.promise;
    };
    Loader.prototype._addToChain = function (promise) {
        // tslint:disable-next-line:prefer-conditional-expression
        if (this._parent.saveData && this._saving) {
            this._parent.saveData = this._parent.saveData.then(function () { return promise; });
        }
        else {
            this._parent.saveData = promise;
        }
    };
    Loader.prototype._findPrevState = function (id) {
        for (var _i = 0, _a = this._changes.order; _i < _a.length; _i++) {
            var el = _a[_i];
            if (el.id === id) {
                return el;
            }
        }
        return null;
    };
    Loader.prototype._removeFromOrder = function (el) {
        this._changes.order = this._changes.order.filter(function (item) { return !helpers_1.isEqualObj(item, el); });
    };
    return Loader;
}());
exports.Loader = Loader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! promiz */ "../node_modules/promiz/promiz.js")))

/***/ }),

/***/ "../ts-data/sources/datacollection/sort.ts":
/*!*************************************************!*\
  !*** ../ts-data/sources/datacollection/sort.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(/*! ./../helpers */ "../ts-data/sources/helpers.ts");
var Sort = /** @class */ (function () {
    function Sort() {
    }
    Sort.prototype.sort = function (array, by) {
        var _this = this;
        if (by.rule && typeof by.rule === "function") {
            this._sort(array, by);
        }
        else if (by.by) {
            by.rule = function (a, b) {
                var aa = _this._checkVal(by.as, a[by.by]);
                var bb = _this._checkVal(by.as, b[by.by]);
                return helpers_1.naturalCompare(aa.toString(), bb.toString()); // didnt work with numbers
            };
            this._sort(array, by);
        }
    };
    Sort.prototype._checkVal = function (method, val) {
        return method ? method.call(this, val) : val;
    };
    Sort.prototype._sort = function (arr, conf) {
        var _this = this;
        var dir = {
            asc: 1,
            desc: -1
        };
        return arr.sort(function (a, b) {
            return conf.rule.call(_this, a, b) * (dir[conf.dir] || dir.asc);
        });
    };
    return Sort;
}());
exports.Sort = Sort;


/***/ }),

/***/ "../ts-data/sources/dataproxy.ts":
/*!***************************************!*\
  !*** ../ts-data/sources/dataproxy.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var DataProxy = /** @class */ (function () {
    function DataProxy(url) {
        this.url = url;
    }
    DataProxy.prototype.load = function () {
        return this._ajax(this.url);
    };
    DataProxy.prototype.save = function (data, mode) {
        var modes = {
            insert: "POST",
            delete: "DELETE",
            update: "POST"
        };
        return this._ajax(this.url, data, modes[mode] || "POST");
    };
    DataProxy.prototype._ajax = function (url, data, method) {
        if (method === void 0) { method = "GET"; }
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(xhr.response || xhr.responseText);
                }
                else {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            };
            xhr.open(method, url);
            xhr.setRequestHeader("Content-Type", "application/json");
            switch (method) {
                case "POST":
                case "DELETE":
                case "PUT":
                    xhr.send(JSON.stringify(data));
                    break;
                case "GET":
                    xhr.send();
                    break;
                default:
                    xhr.send();
                    break;
            }
        });
    };
    return DataProxy;
}());
exports.DataProxy = DataProxy;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! promiz */ "../node_modules/promiz/promiz.js")))

/***/ }),

/***/ "../ts-data/sources/drivers/CsvDriver.ts":
/*!***********************************************!*\
  !*** ../ts-data/sources/drivers/CsvDriver.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var CsvDriver = /** @class */ (function () {
    function CsvDriver(config) {
        if (config === void 0) { config = {}; }
        var initConfig = {
            skipHeader: 0,
            nameByHeader: false,
            row: "\n",
            column: ",",
        };
        this.config = __assign({}, initConfig, config);
        if (this.config.nameByHeader) {
            this.config.skipHeader = 1;
        }
    }
    CsvDriver.prototype.getFields = function (row, headers) {
        var parts = row.trim().split(this.config.column);
        var obj = {};
        for (var i = 0; i < parts.length; i++) {
            obj[headers ? headers[i] : i + 1] = parts[i];
        }
        return obj;
    };
    CsvDriver.prototype.getRows = function (data) {
        return data.trim().split(this.config.row);
    };
    CsvDriver.prototype.toJsonArray = function (data) {
        var _this = this;
        var rows = this.getRows(data);
        var names = this.config.names;
        if (this.config.skipHeader) {
            var top_1 = rows.splice(0, this.config.skipHeader);
            if (this.config.nameByHeader) {
                names = top_1[0].trim().split(this.config.column);
            }
        }
        return rows.map(function (row) { return _this.getFields(row, names); });
    };
    CsvDriver.prototype.serialize = function (data) {
        var header = data[0] ? Object.keys(data[0]).filter(function (key) { return key[0] !== "$"; }).join(",") : "";
        return header + this._serialize(data);
    };
    CsvDriver.prototype._serialize = function (data) {
        var _this = this;
        return data.reduce(function (csv, row) {
            var cells = Object.keys(row).reduce(function (total, key, i) {
                if (key[0] === "$" || key === "items") {
                    return total;
                }
                return "" + total + row[key] + (i === row.length - 1 ? "" : ",");
            }, "");
            if (row.items) {
                return csv + "\n" + cells + _this._serialize(row.items);
            }
            return csv + "\n" + cells;
        }, "");
    };
    return CsvDriver;
}());
exports.CsvDriver = CsvDriver;


/***/ }),

/***/ "../ts-data/sources/drivers/JsonDriver.ts":
/*!************************************************!*\
  !*** ../ts-data/sources/drivers/JsonDriver.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver = /** @class */ (function () {
    function JsonDriver() {
    }
    JsonDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    JsonDriver.prototype.serialize = function (data) {
        return data;
    };
    JsonDriver.prototype.getFields = function (row) {
        return row;
    };
    JsonDriver.prototype.getRows = function (data) {
        return typeof data === "string" ? JSON.parse(data) : data;
    };
    return JsonDriver;
}());
exports.JsonDriver = JsonDriver;


/***/ }),

/***/ "../ts-data/sources/drivers/XMLDriver.ts":
/*!***********************************************!*\
  !*** ../ts-data/sources/drivers/XMLDriver.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_1 = __webpack_require__(/*! ./../serializers/xml */ "../ts-data/sources/serializers/xml.ts");
var ARRAY_NAME = "items";
var ITEM_NAME = "item";
var XMLDriver = /** @class */ (function () {
    function XMLDriver() {
    }
    XMLDriver.prototype.toJsonArray = function (data) {
        return this.getRows(data);
    };
    XMLDriver.prototype.serialize = function (data) {
        return xml_1.jsonToXML(data);
    };
    XMLDriver.prototype.getFields = function (row) {
        return row;
    };
    XMLDriver.prototype.getRows = function (data) {
        if (typeof data === "string") {
            data = this._fromString(data);
        }
        var childNodes = data.childNodes && data.childNodes[0] && data.childNodes[0].childNodes;
        if (!childNodes || !childNodes.length) {
            return null;
        }
        return this._getRows(childNodes);
    };
    XMLDriver.prototype._getRows = function (nodes) {
        var result = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName === ITEM_NAME) {
                result.push(this._nodeToJS(nodes[i]));
            }
        }
        return result;
    };
    XMLDriver.prototype._fromString = function (data) {
        return (new DOMParser()).parseFromString(data, "text/xml");
    };
    XMLDriver.prototype._nodeToJS = function (node) {
        var result = {};
        if (this._haveAttrs(node)) {
            var attrs = node.attributes;
            for (var i = 0; i < attrs.length; i++) {
                var _a = attrs[i], name_1 = _a.name, value = _a.value;
                result[name_1] = this._toType(value);
            }
        }
        if (node.nodeType === 3) {
            result.value = result.value || this._toType(node.textContent);
            return result;
        }
        var childNodes = node.childNodes;
        if (childNodes) {
            for (var i = 0; i < childNodes.length; i++) {
                var subNode = childNodes[i];
                var tag = subNode.tagName;
                if (!tag) {
                    continue;
                }
                if (tag === ARRAY_NAME && subNode.childNodes) {
                    result[tag] = this._getRows(subNode.childNodes);
                }
                else {
                    if (this._haveAttrs(subNode)) {
                        result[tag] = this._nodeToJS(subNode);
                    }
                    else {
                        result[tag] = this._toType(subNode.textContent);
                    }
                }
            }
        }
        return result;
    };
    XMLDriver.prototype._toType = function (val) {
        if (val === "false" || val === "true") {
            return val === "true";
        }
        if (!isNaN(val)) {
            return Number(val);
        }
        return val;
    };
    XMLDriver.prototype._haveAttrs = function (node) {
        return node.attributes && node.attributes.length;
    };
    return XMLDriver;
}());
exports.XMLDriver = XMLDriver;


/***/ }),

/***/ "../ts-data/sources/drivers/drivers.ts":
/*!*********************************************!*\
  !*** ../ts-data/sources/drivers/drivers.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsonDriver_1 = __webpack_require__(/*! ./JsonDriver */ "../ts-data/sources/drivers/JsonDriver.ts");
var CsvDriver_1 = __webpack_require__(/*! ./CsvDriver */ "../ts-data/sources/drivers/CsvDriver.ts");
var XMLDriver_1 = __webpack_require__(/*! ./XMLDriver */ "../ts-data/sources/drivers/XMLDriver.ts");
exports.dataDrivers = {
    json: JsonDriver_1.JsonDriver,
    csv: CsvDriver_1.CsvDriver
};
exports.dataDriversPro = __assign({}, exports.dataDrivers, { xml: XMLDriver_1.XMLDriver });


/***/ }),

/***/ "../ts-data/sources/entry.ts":
/*!***********************************!*\
  !*** ../ts-data/sources/entry.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var datacollection_1 = __webpack_require__(/*! ./datacollection */ "../ts-data/sources/datacollection.ts");
exports.DataCollection = datacollection_1.DataCollection;
var treecollection_1 = __webpack_require__(/*! ./treecollection */ "../ts-data/sources/treecollection.ts");
exports.TreeCollection = treecollection_1.TreeCollection;


/***/ }),

/***/ "../ts-data/sources/helpers.ts":
/*!*************************************!*\
  !*** ../ts-data/sources/helpers.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(/*! ./dataproxy */ "../ts-data/sources/dataproxy.ts");
var drivers_1 = __webpack_require__(/*! ./drivers/drivers */ "../ts-data/sources/drivers/drivers.ts");
function isEqualObj(a, b) {
    for (var key in a) {
        if (a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
exports.isEqualObj = isEqualObj;
function naturalCompare(a, b) {
    var ax = [];
    var bx = [];
    a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]); });
    b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]); });
    while (ax.length && bx.length) {
        var an = ax.shift();
        var bn = bx.shift();
        var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if (nn) {
            return nn;
        }
    }
    return ax.length - bx.length;
}
exports.naturalCompare = naturalCompare;
function findByConf(item, conf) {
    if (typeof conf === "function") {
        if (conf.call(this, item)) {
            return item;
        }
    }
    else if (conf.by && conf.match) {
        if (item[conf.by] === conf.match) {
            return item;
        }
    }
}
exports.findByConf = findByConf;
function isDebug() {
    var dhx = window.dhx;
    if (typeof dhx !== "undefined") {
        return typeof (dhx.debug) !== "undefined" && dhx.debug;
    }
    // return typeof DHX_DEBUG_MODE !== "undefined" && DHX_DEBUG_MODE;
}
exports.isDebug = isDebug;
function dhxWarning(msg) {
    // tslint:disable-next-line:no-console
    console.warn(msg);
}
exports.dhxWarning = dhxWarning;
function dhxError(msg) {
    throw new Error(msg);
}
exports.dhxError = dhxError;
function toProxy(proxy) {
    var type = typeof proxy;
    if (type === "string") {
        return new dataproxy_1.DataProxy(proxy);
    }
    else if (type === "object") {
        return proxy;
    }
}
exports.toProxy = toProxy;
function toDataDriver(driver) {
    if (typeof driver === "string") {
        var dhx = window.dhx;
        var drivers = (dhx && dhx.dataDrivers) || drivers_1.dataDrivers;
        if (drivers[driver]) {
            return new drivers[driver]();
        }
        else {
            // tslint:disable-next-line:no-console
            console.warn("Incorrect data driver type:", driver);
            // tslint:disable-next-line:no-console
            console.warn("Available types:", JSON.stringify(Object.keys(drivers)));
        }
    }
    else if (typeof driver === "object") {
        return driver;
    }
}
exports.toDataDriver = toDataDriver;
function copyWithoutInner(obj, forbidden) {
    var result = {};
    for (var key in obj) {
        if (key[0] !== "$" && (!forbidden || !forbidden[key])) {
            result[key] = obj[key];
        }
    }
    return result;
}
exports.copyWithoutInner = copyWithoutInner;
function isTreeCollection(obj) {
    return Boolean(obj.getRoot);
}
exports.isTreeCollection = isTreeCollection;


/***/ }),

/***/ "../ts-data/sources/serializers/xml.ts":
/*!*********************************************!*\
  !*** ../ts-data/sources/serializers/xml.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var INDENT_STEP = 4;
function jsonToXML(data, root) {
    if (root === void 0) { root = "root"; }
    var result = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n<" + root + ">";
    for (var i = 0; i < data.length; i++) {
        result += "\n" + itemToXML(data[i]);
    }
    return result + ("\n</" + root + ">");
}
exports.jsonToXML = jsonToXML;
function ws(count) {
    return " ".repeat(count);
}
function itemToXML(item, indent) {
    if (indent === void 0) { indent = INDENT_STEP; }
    var result = ws(indent) + "<item>\n";
    for (var key in item) {
        if (Array.isArray(item[key])) {
            result += ws(indent + INDENT_STEP) + ("<" + key + ">\n");
            result += item[key].map(function (subItem) { return itemToXML(subItem, indent + INDENT_STEP * 2); }).join("\n") + "\n";
            result += ws(indent + INDENT_STEP) + ("</" + key + ">\n");
        }
        else {
            result += ws(indent + INDENT_STEP) + ("<" + key + ">" + item[key] + "</" + key + ">\n");
        }
    }
    result += ws(indent) + "</item>";
    return result;
}


/***/ }),

/***/ "../ts-data/sources/treecollection.ts":
/*!********************************************!*\
  !*** ../ts-data/sources/treecollection.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var datacollection_1 = __webpack_require__(/*! ./datacollection */ "../ts-data/sources/datacollection.ts");
var dataproxy_1 = __webpack_require__(/*! ./dataproxy */ "../ts-data/sources/dataproxy.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-data/sources/helpers.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
function addToOrder(store, obj, parent, index) {
    if (index !== undefined && index !== -1 && store[parent] && store[parent][index]) {
        store[parent].splice(index, 0, obj);
    }
    else {
        if (!store[parent]) {
            store[parent] = [];
        }
        store[parent].push(obj);
    }
}
var TreeCollection = /** @class */ (function (_super) {
    __extends(TreeCollection, _super);
    function TreeCollection(config, events) {
        var _a;
        var _this = _super.call(this, config, events) || this;
        var root = _this._root = "_ROOT_" + core_1.uid();
        _this._childs = (_a = {}, _a[root] = [], _a);
        _this._initChilds = null;
        return _this;
    }
    TreeCollection.prototype.add = function (obj, index, parent) {
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        if (typeof obj !== "object") {
            obj = {
                value: obj
            };
        }
        obj.parent = obj.parent ? obj.parent.toString() : parent;
        var id = _super.prototype.add.call(this, obj, index);
        if (Array.isArray(obj.items)) {
            for (var _i = 0, _a = obj.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.add(item, -1, obj.id);
            }
        }
        return id;
    };
    TreeCollection.prototype.getRoot = function () {
        return this._root;
    };
    TreeCollection.prototype.getParent = function (id, asObj) {
        if (asObj === void 0) { asObj = false; }
        if (!this._pull[id]) {
            return null;
        }
        var parent = this._pull[id].parent;
        return asObj ? this._pull[parent] : parent;
    };
    TreeCollection.prototype.getItems = function (id) {
        if (this._childs && this._childs[id]) {
            return this._childs[id];
        }
        return [];
    };
    TreeCollection.prototype.getLength = function (id) {
        if (id === void 0) { id = this._root; }
        if (!this._childs[id]) {
            return null;
        }
        return this._childs[id].length;
    };
    TreeCollection.prototype.removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_1 = childs; _i < childs_1.length; _i++) {
                var child = childs_1[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype.removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype.getIndex = function (id) {
        var parent = this.getParent(id);
        if (!parent || !this._childs[parent]) {
            return -1;
        }
        return core_1.findIndex(this._childs[parent], function (item) { return item.id === id; });
    };
    TreeCollection.prototype.sort = function (conf) {
        var childs = this._childs;
        for (var key in childs) {
            this._sort.sort(childs[key], conf);
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.map = function (cb, parent, direct) {
        if (parent === void 0) { parent = this._root; }
        if (direct === void 0) { direct = true; }
        var result = [];
        if (!this.haveItems(parent)) {
            return result;
        }
        for (var i = 0; i < this._childs[parent].length; i++) {
            result.push(cb.call(this, this._childs[parent][i], i));
            if (direct) {
                var childResult = this.map(cb, this._childs[parent][i].id, direct);
                result = result.concat(childResult);
            }
        }
        return result;
    };
    TreeCollection.prototype.filter = function (rule, config) {
        if (config === void 0) { config = {}; }
        if (!rule) {
            this.restoreOrder();
            return;
        }
        if (!this._initChilds) {
            this._initChilds = this._childs;
        }
        config.type = config.type || types_1.TreeFilterType.leafs;
        var newChilds = {};
        this._recursiveFilter(rule, config, this._root, 0, newChilds);
        this._childs = newChilds;
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.restoreOrder = function () {
        if (this._initChilds) {
            this._childs = this._initChilds;
            this._initChilds = null;
        }
        this.events.fire(types_1.DataEvents.change);
    };
    TreeCollection.prototype.copy = function (id, index, target, targetId) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        var currentChilds = this._childs[id];
        if (target === this && !this.canCopy(id, targetId)) {
            return null;
        }
        var itemCopy = helpers_1.copyWithoutInner(this.getItem(id), { items: true });
        if (target.exists(id)) {
            itemCopy.id = core_1.uid();
        }
        if (!helpers_1.isTreeCollection(target)) {
            target.add(itemCopy, index);
            return;
        }
        if (this.exists(id)) {
            itemCopy.parent = targetId;
            target.add(itemCopy, index);
            id = itemCopy.id;
        }
        if (currentChilds) {
            for (var _i = 0, currentChilds_1 = currentChilds; _i < currentChilds_1.length; _i++) {
                var child = currentChilds_1[_i];
                var childId = child.id;
                var childIndex = this.getIndex(childId);
                this.copy(childId, childIndex, target, id);
            }
        }
        return id;
    };
    TreeCollection.prototype.move = function (id, index, target, targetId) {
        if (target === void 0) { target = this; }
        if (targetId === void 0) { targetId = this._root; }
        if (!this.exists(id)) {
            return null;
        }
        if (target !== this) {
            if (!helpers_1.isTreeCollection(target)) { // move to datacollection
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
                this.remove(id);
                return;
            }
            var returnId = this.copy(id, index, target, targetId);
            this.remove(id);
            return returnId;
        }
        // move inside
        if (!this.canCopy(id, targetId)) {
            return null;
        }
        var parent = this.getParent(id);
        var parentIndex = this.getIndex(id);
        // get item from parent array and move to target array
        var spliced = this._childs[parent].splice(parentIndex, 1)[0];
        spliced.parent = targetId; // need for next moving, ... not best solution, may be full method for get item
        if (!this._childs[parent].length) {
            delete this._childs[parent];
        }
        if (!this.haveItems(targetId)) {
            this._childs[targetId] = [];
        }
        if (index === -1) {
            index = this._childs[targetId].push(spliced);
        }
        else {
            this._childs[targetId].splice(index, 0, spliced);
        }
        this.events.fire(types_1.DataEvents.change);
        return id;
    };
    TreeCollection.prototype.eachChild = function (id, cb, direct, checkItem) {
        if (direct === void 0) { direct = true; }
        if (checkItem === void 0) { checkItem = function () { return true; }; }
        if (!this.haveItems(id)) {
            return;
        }
        for (var i = 0; i < this._childs[id].length; i++) {
            cb.call(this, this._childs[id][i], i);
            if (direct && checkItem(this._childs[id][i])) {
                this.eachChild(this._childs[id][i].id, cb, direct, checkItem);
            }
        }
    };
    TreeCollection.prototype.getNearId = function (id) {
        return id; // for selection
    };
    TreeCollection.prototype.loadItems = function (id, driver) {
        var _this = this;
        if (driver === void 0) { driver = "json"; }
        var url = this.config.autoload + "?id=" + id;
        var proxy = new dataproxy_1.DataProxy(url);
        proxy.load().then(function (data) {
            driver = helpers_1.toDataDriver(driver);
            data = driver.toJsonArray(data);
            _this._parse_data(data, id);
            _this.events.fire(types_1.DataEvents.change);
        });
    };
    TreeCollection.prototype.refreshItems = function (id, driver) {
        if (driver === void 0) { driver = "json"; }
        this.removeAll(id);
        this.loadItems(id, driver);
    };
    TreeCollection.prototype.eachParent = function (id, cb, self) {
        if (self === void 0) { self = false; }
        var item = this.getItem(id);
        if (!item) {
            return;
        }
        if (self) {
            cb.call(this, item);
        }
        if (item.parent === this._root) {
            return;
        }
        var parent = this.getItem(item.parent);
        cb.call(this, parent);
        this.eachParent(item.parent, cb);
    };
    TreeCollection.prototype.haveItems = function (id) {
        return id in this._childs;
    };
    TreeCollection.prototype.canCopy = function (id, target) {
        if (id === target) {
            return false;
        }
        var canCopy = true;
        this.eachParent(target, function (item) { return item.id === id ? canCopy = false : null; }); // locate return string
        return canCopy;
    };
    TreeCollection.prototype.serialize = function (driver, checkItem) {
        if (driver === void 0) { driver = types_1.DataDriver.json; }
        var data = this._serialize(this._root, checkItem);
        var dataDriver = helpers_1.toDataDriver(driver);
        if (dataDriver) {
            return dataDriver.serialize(data);
        }
    };
    TreeCollection.prototype.getId = function (index, parent) {
        if (parent === void 0) { parent = this._root; }
        if (!this._childs[parent] || !this._childs[parent][index]) {
            return;
        }
        return this._childs[parent][index].id;
    };
    TreeCollection.prototype._removeAll = function (id) {
        var _a;
        if (id) {
            var childs = this._childs[id].slice();
            for (var _i = 0, childs_2 = childs; _i < childs_2.length; _i++) {
                var child = childs_2[_i];
                this.remove(child.id);
            }
        }
        else {
            _super.prototype._removeAll.call(this);
            var root = this._root;
            this._initChilds = null;
            this._childs = (_a = {}, _a[root] = [], _a);
        }
    };
    TreeCollection.prototype._removeCore = function (id) {
        if (this._pull[id]) {
            var parent_1 = this.getParent(id);
            this._childs[parent_1] = this._childs[parent_1].filter(function (item) { return item.id !== id; });
            if (parent_1 !== this._root && !this._childs[parent_1].length) {
                delete this._childs[parent_1];
            }
            if (this._initChilds && this._initChilds[parent_1]) {
                this._initChilds[parent_1] = this._initChilds[parent_1].filter(function (item) { return item.id !== id; });
                if (parent_1 !== this._root && !this._initChilds[parent_1].length) {
                    delete this._initChilds[parent_1];
                }
            }
            this._fastDeleteChilds(this._childs, id);
            if (this._initChilds) {
                this._fastDeleteChilds(this._initChilds, id);
            }
        }
    };
    TreeCollection.prototype._addToOrder = function (_order, obj, index) {
        var childs = this._childs;
        var initChilds = this._initChilds;
        var parent = obj.parent;
        this._pull[obj.id] = obj;
        addToOrder(childs, obj, parent, index);
        if (initChilds) {
            addToOrder(initChilds, obj, parent, index);
        }
    };
    TreeCollection.prototype._parse_data = function (data, parent) {
        if (parent === void 0) { parent = this._root; }
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var obj = data_1[_i];
            if (this.config.init) {
                obj = this.config.init(obj);
            }
            if (typeof obj !== "object") {
                obj = {
                    value: obj
                };
            }
            obj.id = obj.id ? obj.id.toString() : core_1.uid();
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            this._pull[obj.id] = obj;
            if (!this._childs[obj.parent]) {
                this._childs[obj.parent] = [];
            }
            this._childs[obj.parent].push(obj);
            if (obj.items && obj.items instanceof Object) {
                this._parse_data(obj.items, obj.id);
            }
        }
    };
    TreeCollection.prototype._fastDeleteChilds = function (target, id) {
        if (this._pull[id]) {
            delete this._pull[id];
        }
        if (!target[id]) {
            return;
        }
        for (var i = 0; i < target[id].length; i++) {
            this._fastDeleteChilds(target, target[id][i].id);
        }
        delete target[id];
    };
    TreeCollection.prototype._recursiveFilter = function (rule, config, current, level, newChilds) {
        var _this = this;
        var childs = this._childs[current];
        if (!childs) {
            return;
        }
        var condition = function (item) {
            switch (config.type) {
                case types_1.TreeFilterType.all: {
                    return true;
                }
                case types_1.TreeFilterType.level: {
                    return level === config.level;
                }
                case types_1.TreeFilterType.leafs: {
                    return !_this.haveItems(item.id);
                }
            }
        };
        if (typeof rule === "function") {
            var customRule = function (item) { return !condition(item) || rule(item); };
            var filtered = childs.filter(customRule);
            if (filtered.length) {
                newChilds[current] = filtered;
            }
        }
        else if (rule.by && rule.match) {
            var customRule = function (item) { return !condition(item) || item[rule.by].toString().toLowerCase().indexOf(rule.match.toString().toLowerCase()) !== -1; };
            newChilds[current] = childs.filter(customRule);
        }
        for (var _i = 0, childs_3 = childs; _i < childs_3.length; _i++) {
            var child = childs_3[_i];
            this._recursiveFilter(rule, config, child.id, level + 1, newChilds);
        }
    };
    TreeCollection.prototype._serialize = function (parent, fn) {
        var _this = this;
        if (parent === void 0) { parent = this._root; }
        return this.map(function (item) {
            var itemCopy = {};
            for (var key in item) {
                if (key === "parent" || key === "items") {
                    continue;
                }
                itemCopy[key] = item[key];
            }
            if (fn) {
                itemCopy = fn(itemCopy);
            }
            if (_this.haveItems(item.id)) {
                itemCopy.items = _this._serialize(item.id, fn);
            }
            return itemCopy;
        }, parent, false);
    };
    return TreeCollection;
}(datacollection_1.DataCollection));
exports.TreeCollection = TreeCollection;


/***/ }),

/***/ "../ts-data/sources/types.ts":
/*!***********************************!*\
  !*** ../ts-data/sources/types.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TreeFilterType;
(function (TreeFilterType) {
    TreeFilterType["all"] = "all";
    TreeFilterType["level"] = "level";
    TreeFilterType["leafs"] = "leafs";
})(TreeFilterType = exports.TreeFilterType || (exports.TreeFilterType = {}));
var DropPosition;
(function (DropPosition) {
    DropPosition["top"] = "top";
    DropPosition["bot"] = "bot";
    DropPosition["in"] = "in";
})(DropPosition = exports.DropPosition || (exports.DropPosition = {}));
var DataEvents;
(function (DataEvents) {
    DataEvents["afterAdd"] = "afteradd";
    DataEvents["beforeAdd"] = "beforeadd";
    DataEvents["removeAll"] = "removeall";
    DataEvents["beforeRemove"] = "beforeremove";
    DataEvents["afterRemove"] = "afterremove";
    DataEvents["change"] = "change";
    DataEvents["load"] = "load";
})(DataEvents = exports.DataEvents || (exports.DataEvents = {}));
var DragEvents;
(function (DragEvents) {
    DragEvents["beforeDrag"] = "beforedrag";
    DragEvents["beforeDrop"] = "beforeDrop";
    DragEvents["dragStart"] = "dragstart";
    DragEvents["dragEnd"] = "dragend";
    DragEvents["canDrop"] = "candrop";
    DragEvents["cancelDrop"] = "canceldrop";
    DragEvents["dropComplete"] = "dropcomplete";
    DragEvents["dragOut"] = "dragOut";
    DragEvents["dragIn"] = "dragIn"; // fire on source
})(DragEvents = exports.DragEvents || (exports.DragEvents = {}));
var DragMode;
(function (DragMode) {
    DragMode["target"] = "target";
    DragMode["both"] = "both";
    DragMode["source"] = "source";
})(DragMode = exports.DragMode || (exports.DragMode = {}));
var DropBehaviour;
(function (DropBehaviour) {
    DropBehaviour["child"] = "child";
    DropBehaviour["sibling"] = "sibling";
    DropBehaviour["complex"] = "complex";
})(DropBehaviour = exports.DropBehaviour || (exports.DropBehaviour = {}));
var DataDriver;
(function (DataDriver) {
    DataDriver["json"] = "json";
    DataDriver["csv"] = "csv";
    DataDriver["xml"] = "xml";
})(DataDriver = exports.DataDriver || (exports.DataDriver = {}));


/***/ })

/******/ });
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaHgvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RoeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb21pei9wcm9taXouanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL2RoeC8uLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9jb3JlLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vZXZlbnRzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vaHRtbC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL3BvbHlmaWxscy9tYXRjaGVzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZGF0YWNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi9sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi9zb3J0LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZGF0YXByb3h5LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZHJpdmVycy9Dc3ZEcml2ZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL0pzb25Ecml2ZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL1hNTERyaXZlci50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2RyaXZlcnMvZHJpdmVycy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2VudHJ5LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL3NlcmlhbGl6ZXJzL3htbC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL3RyZWVjb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OERBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7QUN2THRDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLE9BQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVzs7QUFFWCxPQUFPO0FBQ1A7OztBQUdBOztBQUVBO0FBQ0EsTUFBTSxJQUE0QjtBQUNsQztBQUNBLEdBQUcsTUFBTSxFQUVOO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7OztBQzdURDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaUJBQWlCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7QUN6TEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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QUFDLEVBSlcsUUFBUSxHQUFSLGdCQUFRLEtBQVIsZ0JBQVEsUUFJbkI7QUFDRCxJQUFZLGFBSVg7QUFKRCxXQUFZLGFBQWE7SUFDeEIsZ0NBQWU7SUFDZixvQ0FBbUI7SUFDbkIsb0NBQW1CO0FBQ3BCLENBQUMsRUFKVyxhQUFhLEdBQWIscUJBQWEsS0FBYixxQkFBYSxRQUl4QjtBQTBCRCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDckIsMkJBQWE7SUFDYix5QkFBVztJQUNYLHlCQUFXO0FBQ1osQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCIiwiZmlsZSI6ImRhdGEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJkaHhcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiZGh4XCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9jb2RlYmFzZS9cIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi4vdHMtZGF0YS9zb3VyY2VzL2VudHJ5LnRzXCIpO1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gIGdsb2JhbCA9IHRoaXNcblxuICB2YXIgcXVldWVJZCA9IDFcbiAgdmFyIHF1ZXVlID0ge31cbiAgdmFyIGlzUnVubmluZ1Rhc2sgPSBmYWxzZVxuXG4gIGlmICghZ2xvYmFsLnNldEltbWVkaWF0ZSlcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5zb3VyY2UgPT0gZ2xvYmFsKXtcbiAgICAgICAgaWYgKGlzUnVubmluZ1Rhc2spXG4gICAgICAgICAgbmV4dFRpY2socXVldWVbZS5kYXRhXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaXNSdW5uaW5nVGFzayA9IHRydWVcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcXVldWVbZS5kYXRhXSgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgIGRlbGV0ZSBxdWV1ZVtlLmRhdGFdXG4gICAgICAgICAgaXNSdW5uaW5nVGFzayA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHNldEltbWVkaWF0ZShmbilcbiAgICAvLyBpZiBpbnNpZGUgb2Ygd2ViIHdvcmtlclxuICAgIGVsc2UgaWYgKGdsb2JhbC5pbXBvcnRTY3JpcHRzKSBzZXRUaW1lb3V0KGZuKVxuICAgIGVsc2Uge1xuICAgICAgcXVldWVJZCsrXG4gICAgICBxdWV1ZVtxdWV1ZUlkXSA9IGZuXG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UocXVldWVJZCwgJyonKVxuICAgIH1cbiAgfVxuXG4gIERlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoISh0aGlzLl9kID09IDEpKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERlZmVycmVkKVxuICAgICAgcmV0dXJuIHZhbHVlXG5cbiAgICByZXR1cm4gbmV3IERlZmVycmVkKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gIERlZmVycmVkLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgcmV0dXJuIG5ldyBEZWZlcnJlZChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlamVjdCh2YWx1ZSlcbiAgICB9KVxuICB9XG5cbiAgRGVmZXJyZWQuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgaWYgKCEoYXJyIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgcmV0dXJuIERlZmVycmVkLnJlamVjdChUeXBlRXJyb3IoKSlcblxuICAgIHZhciBkID0gbmV3IERlZmVycmVkKClcblxuICAgIGZ1bmN0aW9uIGRvbmUoZSwgdikge1xuICAgICAgaWYgKHYpXG4gICAgICAgIHJldHVybiBkLnJlc29sdmUodilcblxuICAgICAgaWYgKGUpXG4gICAgICAgIHJldHVybiBkLnJlamVjdChlKVxuXG4gICAgICB2YXIgdW5yZXNvbHZlZCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGNudCwgdikge1xuICAgICAgICBpZiAodiAmJiB2LnRoZW4pXG4gICAgICAgICAgcmV0dXJuIGNudCArIDFcbiAgICAgICAgcmV0dXJuIGNudFxuICAgICAgfSwgMClcblxuICAgICAgaWYodW5yZXNvbHZlZCA9PSAwKVxuICAgICAgICBkLnJlc29sdmUoYXJyKVxuXG4gICAgICBhcnIubWFwKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgIGlmICh2ICYmIHYudGhlbilcbiAgICAgICAgICB2LnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGFycltpXSA9IHJcbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgcmV0dXJuIHJcbiAgICAgICAgICB9LCBkb25lKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIHJldHVybiBkXG4gIH1cblxuICBEZWZlcnJlZC5yYWNlID0gZnVuY3Rpb24gKGFycikge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgaWYgKCEoYXJyIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgcmV0dXJuIERlZmVycmVkLnJlamVjdChUeXBlRXJyb3IoKSlcblxuICAgIGlmIChhcnIubGVuZ3RoID09IDApXG4gICAgICByZXR1cm4gbmV3IERlZmVycmVkKClcblxuICAgIHZhciBkID0gbmV3IERlZmVycmVkKClcblxuICAgIGZ1bmN0aW9uIGRvbmUoZSwgdikge1xuICAgICAgaWYgKHYpXG4gICAgICAgIHJldHVybiBkLnJlc29sdmUodilcblxuICAgICAgaWYgKGUpXG4gICAgICAgIHJldHVybiBkLnJlamVjdChlKVxuXG4gICAgICB2YXIgdW5yZXNvbHZlZCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGNudCwgdikge1xuICAgICAgICBpZiAodiAmJiB2LnRoZW4pXG4gICAgICAgICAgcmV0dXJuIGNudCArIDFcbiAgICAgICAgcmV0dXJuIGNudFxuICAgICAgfSwgMClcblxuICAgICAgaWYodW5yZXNvbHZlZCA9PSAwKVxuICAgICAgICBkLnJlc29sdmUoYXJyKVxuXG4gICAgICBhcnIubWFwKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgIGlmICh2ICYmIHYudGhlbilcbiAgICAgICAgICB2LnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGRvbmUobnVsbCwgcilcbiAgICAgICAgICB9LCBkb25lKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIHJldHVybiBkXG4gIH1cblxuICBEZWZlcnJlZC5fZCA9IDFcblxuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIERlZmVycmVkKHJlc29sdmVyKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG4gICAgaWYgKHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nICYmIHJlc29sdmVyICE9IHVuZGVmaW5lZClcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICBpZiAodHlwZW9mIHRoaXMgIT0gJ29iamVjdCcgfHwgKHRoaXMgJiYgdGhpcy50aGVuKSlcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICAvLyBzdGF0ZXNcbiAgICAvLyAwOiBwZW5kaW5nXG4gICAgLy8gMTogcmVzb2x2aW5nXG4gICAgLy8gMjogcmVqZWN0aW5nXG4gICAgLy8gMzogcmVzb2x2ZWRcbiAgICAvLyA0OiByZWplY3RlZFxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHN0YXRlID0gMCxcbiAgICAgIHZhbCA9IDAsXG4gICAgICBuZXh0ID0gW10sXG4gICAgICBmbiwgZXI7XG5cbiAgICBzZWxmWydwcm9taXNlJ10gPSBzZWxmXG5cbiAgICBzZWxmWydyZXNvbHZlJ10gPSBmdW5jdGlvbiAodikge1xuICAgICAgZm4gPSBzZWxmLmZuXG4gICAgICBlciA9IHNlbGYuZXJcbiAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgdmFsID0gdlxuICAgICAgICBzdGF0ZSA9IDFcblxuICAgICAgICBuZXh0VGljayhmaXJlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGZcbiAgICB9XG5cbiAgICBzZWxmWydyZWplY3QnXSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICBmbiA9IHNlbGYuZm5cbiAgICAgIGVyID0gc2VsZi5lclxuICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICB2YWwgPSB2XG4gICAgICAgIHN0YXRlID0gMlxuXG4gICAgICAgIG5leHRUaWNrKGZpcmUpXG5cbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmXG4gICAgfVxuXG4gICAgc2VsZlsnX2QnXSA9IDFcblxuICAgIHNlbGZbJ3RoZW4nXSA9IGZ1bmN0aW9uIChfZm4sIF9lcikge1xuICAgICAgaWYgKCEodGhpcy5fZCA9PSAxKSlcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgICAgdmFyIGQgPSBuZXcgRGVmZXJyZWQoKVxuXG4gICAgICBkLmZuID0gX2ZuXG4gICAgICBkLmVyID0gX2VyXG4gICAgICBpZiAoc3RhdGUgPT0gMykge1xuICAgICAgICBkLnJlc29sdmUodmFsKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNCkge1xuICAgICAgICBkLnJlamVjdCh2YWwpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV4dC5wdXNoKGQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkXG4gICAgfVxuXG4gICAgc2VsZlsnY2F0Y2gnXSA9IGZ1bmN0aW9uIChfZXIpIHtcbiAgICAgIHJldHVybiBzZWxmWyd0aGVuJ10obnVsbCwgX2VyKVxuICAgIH1cblxuICAgIHZhciBmaW5pc2ggPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgc3RhdGUgPSB0eXBlIHx8IDRcbiAgICAgIG5leHQubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHN0YXRlID09IDMgJiYgcC5yZXNvbHZlKHZhbCkgfHwgcC5yZWplY3QodmFsKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiByZXNvbHZlciA9PSAnZnVuY3Rpb24nKVxuICAgICAgICByZXNvbHZlcihzZWxmWydyZXNvbHZlJ10sIHNlbGZbJ3JlamVjdCddKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHNlbGZbJ3JlamVjdCddKGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGZcblxuICAgIC8vIHJlZiA6IHJlZmVyZW5jZSB0byAndGhlbicgZnVuY3Rpb25cbiAgICAvLyBjYiwgZWMsIGNuIDogc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2ssIG5vdFRoZW5uYWJsZUNhbGxiYWNrXG4gICAgZnVuY3Rpb24gdGhlbm5hYmxlIChyZWYsIGNiLCBlYywgY24pIHtcbiAgICAgIC8vIFByb21pc2VzIGNhbiBiZSByZWplY3RlZCB3aXRoIG90aGVyIHByb21pc2VzLCB3aGljaCBzaG91bGQgcGFzcyB0aHJvdWdoXG4gICAgICBpZiAoc3RhdGUgPT0gMikge1xuICAgICAgICByZXR1cm4gY24oKVxuICAgICAgfVxuICAgICAgaWYgKCh0eXBlb2YgdmFsID09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIHJlZiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAvLyBjbnQgcHJvdGVjdHMgYWdhaW5zdCBhYnVzZSBjYWxscyBmcm9tIHNwZWMgY2hlY2tlclxuICAgICAgICAgIHZhciBjbnQgPSAwXG4gICAgICAgICAgcmVmLmNhbGwodmFsLCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKGNudCsrKSByZXR1cm5cbiAgICAgICAgICAgIHZhbCA9IHZcbiAgICAgICAgICAgIGNiKClcbiAgICAgICAgICB9LCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKGNudCsrKSByZXR1cm5cbiAgICAgICAgICAgIHZhbCA9IHZcbiAgICAgICAgICAgIGVjKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsID0gZVxuICAgICAgICAgIGVjKClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY24oKVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmaXJlKCkge1xuXG4gICAgICAvLyBjaGVjayBpZiBpdCdzIGEgdGhlbmFibGVcbiAgICAgIHZhciByZWY7XG4gICAgICB0cnkge1xuICAgICAgICByZWYgPSB2YWwgJiYgdmFsLnRoZW5cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFsID0gZVxuICAgICAgICBzdGF0ZSA9IDJcbiAgICAgICAgcmV0dXJuIGZpcmUoKVxuICAgICAgfVxuXG4gICAgICB0aGVubmFibGUocmVmLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXRlID0gMVxuICAgICAgICBmaXJlKClcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhdGUgPSAyXG4gICAgICAgIGZpcmUoKVxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PSAxICYmIHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YWwgPSBmbih2YWwpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gMiAmJiB0eXBlb2YgZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFsID0gZXIodmFsKVxuICAgICAgICAgICAgc3RhdGUgPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsID0gZVxuICAgICAgICAgIHJldHVybiBmaW5pc2goKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCA9PSBzZWxmKSB7XG4gICAgICAgICAgdmFsID0gVHlwZUVycm9yKClcbiAgICAgICAgICBmaW5pc2goKVxuICAgICAgICB9IGVsc2UgdGhlbm5hYmxlKHJlZiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmluaXNoKDMpXG4gICAgICAgICAgfSwgZmluaXNoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmaW5pc2goc3RhdGUgPT0gMSAmJiAzKVxuICAgICAgICAgIH0pXG5cbiAgICAgIH0pXG4gICAgfVxuXG5cbiAgfVxuXG4gIC8vIEV4cG9ydCBvdXIgbGlicmFyeSBvYmplY3QsIGVpdGhlciBmb3Igbm9kZS5qcyBvciBhcyBhIGdsb2JhbGx5IHNjb3BlZCB2YXJpYWJsZVxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZVsnZXhwb3J0cyddID0gRGVmZXJyZWRcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxbJ1Byb21pc2UnXSA9IGdsb2JhbFsnUHJvbWlzZSddIHx8IERlZmVycmVkXG4gIH1cbn0pKClcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IHsgbG9jYXRlIH0gZnJvbSBcIi4vaHRtbFwiO1xuXG5sZXQgY291bnRlciA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XG5leHBvcnQgZnVuY3Rpb24gdWlkKCk6IHN0cmluZyB7XG5cdHJldHVybiBcInVcIiArIChjb3VudGVyKyspO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc291cmNlLCBkZWVwID0gdHJ1ZSl7XG5cdGlmIChzb3VyY2Upe1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSl7XG5cdFx0XHRjb25zdCBzb2JqID0gc291cmNlW2tleV07XG5cdFx0XHRjb25zdCB0b2JqID0gdGFyZ2V0W2tleV07XG5cdFx0XHRpZiAoZGVlcCAmJiB0eXBlb2YgdG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhKHRvYmogaW5zdGFuY2VvZiBEYXRlKSAmJiAhKHRvYmogaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0XHRleHRlbmQodG9iaiwgc29iaik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHNvYmo7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbmludGVyZmFjZSBJT0JqIHtcblx0W2tleTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlOiBJT0JqLCB3aXRob3V0SW5uZXI/OiBib29sZWFuKTogSU9CaiB7XG5cdGNvbnN0IHJlc3VsdDogSU9CaiA9IHt9O1xuXHRmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2Upe1xuXHRcdGlmICghd2l0aG91dElubmVyIHx8IGtleVswXSAhPT0gXCIkXCIpIHtcblx0XHRcdHJlc3VsdFtrZXldID0gc291cmNlW2tleV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsU29ydChhcnIpOiBhbnlbXSB7XG5cdHJldHVybiBhcnIuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcblx0XHRjb25zdCBubiA9IHR5cGVvZiBhID09PSBcInN0cmluZ1wiID8gYS5sb2NhbGVDb21wYXJlKGIpIDogYSAtIGI7XG5cdFx0cmV0dXJuIG5uO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbmRleDxUID0gYW55PihhcnI6IFRbXSwgcHJlZGljYXRlOiAob2JqOiBUKSA9PiBib29sZWFuKTogbnVtYmVyIHtcblx0Y29uc3QgbGVuID0gYXJyLmxlbmd0aDtcblx0Zm9yIChsZXQgaT0wOyBpPGxlbjsgaSsrKSB7XG5cdFx0aWYgKHByZWRpY2F0ZShhcnJbaV0pKSB7XG5cdFx0XHRyZXR1cm4gaTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbFN0cmluZyhmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBib29sZWFuIHtcblx0aWYgKGZyb20ubGVuZ3RoID4gdG8ubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGZvciAobGV0IGk9MDsgaTxmcm9tLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKGZyb21baV0udG9Mb3dlckNhc2UoKSAhPT0gdG9baV0udG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpbmdsZU91dGVyQ2xpY2soZm46IChlOiBNb3VzZUV2ZW50KSA9PiBib29sZWFuKSB7XG5cdGNvbnN0IGNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRpZiAoZm4oZSkpIHtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG5cdFx0fVxuXHR9O1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0V2lkZ2V0Q2xpY2sod2lkZ2V0SWQ6IHN0cmluZywgY2I6IChpbm5lcjogYm9vbGVhbikgPT4gdm9pZCk6ICgpID0+IHZvaWQge1xuXHRjb25zdCBjbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiBjYihsb2NhdGUoZSwgXCJkaHhfd2lkZ2V0X2lkXCIpID09PSB3aWRnZXRJZCk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG5cblx0cmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBCb3g8VD4oYm94OiBUIHwgVFtdKTogVCB7XG5cdGlmIChBcnJheS5pc0FycmF5KGJveCkpIHtcblx0XHRyZXR1cm4gYm94WzBdO1xuXHR9XG5cdHJldHVybiBib3g7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcEJveDxUPih1bmJveGVkOiBUIHwgVFtdKTogVFtdIHtcblx0aWYgKEFycmF5LmlzQXJyYXkodW5ib3hlZCkpIHtcblx0XHRyZXR1cm4gdW5ib3hlZDtcblx0fVxuXHRyZXR1cm4gW3VuYm94ZWRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkPFQ+KHNvbWU6IFQpOiBib29sZWFuIHtcblx0cmV0dXJuIHNvbWUgIT09IG51bGwgJiYgc29tZSAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogbnVtYmVyW10ge1xuXHRpZiAoZnJvbSA+IHRvKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHR3aGlsZShmcm9tIDw9IHRvKSB7XG5cdFx0cmVzdWx0LnB1c2goZnJvbSsrKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufSIsImV4cG9ydCB0eXBlIENhbGxiYWNrID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIElFdmVudFN5c3RlbTxFLCBUIGV4dGVuZHMgSUV2ZW50SGFuZGxlcnNNYXAgPSBJRXZlbnRIYW5kbGVyc01hcD4ge1xuXHRjb250ZXh0OiBhbnk7XG5cdGV2ZW50czogSUV2ZW50cztcblx0b248SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiBUW0tdLCBjb250ZXh0PzogYW55KTtcblx0ZGV0YWNoKG5hbWU6IEUsIGNvbnRleHQ/OiBhbnkpO1xuXHRjbGVhcigpOiB2b2lkO1xuXHRmaXJlPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBhcmdzPzogQXJndW1lbnRUeXBlczxUW0tdPik6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBJRXZlbnQge1xuXHRjYWxsYmFjazogQ2FsbGJhY2s7XG5cdGNvbnRleHQ6IGFueTtcbn1cbmludGVyZmFjZSBJRXZlbnRzIHtcblx0W2tleTogc3RyaW5nXTogSUV2ZW50W107XG59XG5cbmludGVyZmFjZSBJRXZlbnRIYW5kbGVyc01hcCB7XG5cdFtrZXk6IHN0cmluZ106IENhbGxiYWNrO1xufVxudHlwZSBBcmd1bWVudFR5cGVzPEYgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSBGIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIEEpID0+IGFueSA/IEEgOiBuZXZlcjtcblxuZXhwb3J0IGNsYXNzIEV2ZW50U3lzdGVtPEUgZXh0ZW5kcyBzdHJpbmcsIFQgZXh0ZW5kcyBJRXZlbnRIYW5kbGVyc01hcCA9IElFdmVudEhhbmRsZXJzTWFwPiBpbXBsZW1lbnRzIElFdmVudFN5c3RlbTxFLCBUPiB7XG5cdHB1YmxpYyBldmVudHM6IElFdmVudHM7XG5cdHB1YmxpYyBjb250ZXh0OiBhbnk7XG5cblx0Y29uc3RydWN0b3IoY29udGV4dD86IGFueSkge1xuXHRcdHRoaXMuZXZlbnRzID0ge307XG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzO1xuXHR9XG5cdG9uPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBjYWxsYmFjazogVFtLXSwgY29udGV4dD86IGFueSkge1xuXHRcdGNvbnN0IGV2ZW50OiBzdHJpbmcgPSAobmFtZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy5ldmVudHNbZXZlbnRdID0gdGhpcy5ldmVudHNbZXZlbnRdIHx8IFtdO1xuXHRcdHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHsgY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQgfHwgdGhpcy5jb250ZXh0IH0pO1xuXHR9XG5cdGRldGFjaChuYW1lOiBFLCBjb250ZXh0PzogYW55KSB7XG5cdFx0Y29uc3QgZXZlbnQ6IHN0cmluZyA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHRcdGNvbnN0IGVTdGFjayA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcblx0XHRpZiAoY29udGV4dCAmJiBlU3RhY2sgJiYgZVN0YWNrLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IGVTdGFjay5sZW5ndGggLSAxO2kgPj0gMDtpLS0pIHtcblx0XHRcdFx0aWYgKGVTdGFja1tpXS5jb250ZXh0ID09PSBjb250ZXh0KSB7XG5cdFx0XHRcdFx0ZVN0YWNrLnNwbGljZShpLCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcblx0XHR9XG5cdH1cblx0ZmlyZTxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgYXJnczogQXJndW1lbnRUeXBlczxUW0tdPik6IGJvb2xlYW4ge1xuXHRcdGlmICh0eXBlb2YgYXJncyA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0YXJncyA9IFtdIGFzIGFueTtcblx0XHR9XG5cblx0XHRjb25zdCBldmVudDogc3RyaW5nID0gKG5hbWUgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuXHRcdFx0Y29uc3QgcmVzID0gdGhpcy5ldmVudHNbZXZlbnRdLm1hcChcblx0XHRcdFx0ZSA9PiBlLmNhbGxiYWNrLmFwcGx5KGUuY29udGV4dCwgYXJncylcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gcmVzLmluZGV4T2YoZmFsc2UpIDwgMDtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0Y2xlYXIoKSB7XG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRzTWl4aW4ob2JqOiBhbnkpIHtcblx0b2JqID0gb2JqIHx8IHt9O1xuXHRjb25zdCBldmVudFN5c3RlbSA9IG5ldyBFdmVudFN5c3RlbShvYmopO1xuXHRvYmouZGV0YWNoRXZlbnQgPSBldmVudFN5c3RlbS5kZXRhY2guYmluZChldmVudFN5c3RlbSk7XG5cdG9iai5hdHRhY2hFdmVudCA9IGV2ZW50U3lzdGVtLm9uLmJpbmQoZXZlbnRTeXN0ZW0pO1xuXHRvYmouY2FsbEV2ZW50ID0gZXZlbnRTeXN0ZW0uZmlyZS5iaW5kKGV2ZW50U3lzdGVtKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRGYWNhZGUge1xuXHRhdHRhY2hFdmVudDogYW55O1xuXHRjYWxsRXZlbnQ6IGFueTtcbn0iLCJpbXBvcnQgXCIuL3BvbHlmaWxscy9tYXRjaGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b05vZGUobm9kZTogc3RyaW5nIHwgSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdG5vZGUgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobm9kZSkgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlKSkgYXMgSFRNTEVsZW1lbnQ7XG5cdH1cblx0cmV0dXJuIG5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbn1cblxudHlwZSBldmVudFByZXBhcmUgPSAoZXY6RXZlbnQpID0+IGFueTtcbmludGVyZmFjZSBJSGFuZGxlckhhc2gge1xuXHRbbmFtZTogc3RyaW5nXTogKCguLi5hcmdzOiBhbnlbXSkgPT4gKGJvb2xlYW4gfCB2b2lkKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVudEhhbmRsZXIocHJlcGFyZTpldmVudFByZXBhcmUsIGhhc2g6SUhhbmRsZXJIYXNoKXtcblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGhhc2gpO1xuXG5cdHJldHVybiBmdW5jdGlvbihldjpFdmVudCl7XG5cdFx0Y29uc3QgZGF0YSA9IHByZXBhcmUoZXYpO1xuXHRcdGxldCBub2RlID0gZXYudGFyZ2V0IGFzIChIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQpO1xuXG5cdFx0d2hpbGUgKG5vZGUpe1xuXHRcdFx0Y29uc3QgY3Nzc3RyaW5nID0gIG5vZGUuZ2V0QXR0cmlidXRlID8gKG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIikgOiBcIlwiO1xuXHRcdFx0aWYgKGNzc3N0cmluZy5sZW5ndGgpe1xuXHRcdFx0XHRjb25zdCBjc3MgPSBjc3NzdHJpbmcuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRmb3IgKGxldCBqPTA7IGo8a2V5cy5sZW5ndGg7IGorKyl7XG5cdFx0XHRcdFx0aWYgKGNzcy5pbmRleE9mKGtleXNbal0pID4gLTEpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGhhc2hba2V5c1tqXV0oZXYsIGRhdGEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZSBhcyAoSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZSh0YXJnZXQ6IEV2ZW50IHwgRWxlbWVudCwgYXR0cjogc3RyaW5nID0gXCJkaHhfaWRcIik6IHN0cmluZyB7XG5cdGNvbnN0IG5vZGUgPSBsb2NhdGVOb2RlKHRhcmdldCwgYXR0cik7XG5cdHJldHVybiBub2RlID8gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cikgOiBcIlwiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZU5vZGUodGFyZ2V0OiBFdmVudCB8IEVsZW1lbnQsIGF0dHI6IHN0cmluZyA9IFwiZGh4X2lkXCIpOiBFbGVtZW50IHtcblx0aWYgKHRhcmdldCBpbnN0YW5jZW9mIEV2ZW50KSB7XG5cdFx0dGFyZ2V0ID0gdGFyZ2V0LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblx0fVxuXHR3aGlsZSAodGFyZ2V0KSB7XG5cdFx0aWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyKSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveChlbGVtKSB7XG5cdGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG5cdGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBib2R5LnNjcm9sbFRvcDtcblx0Y29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cblx0Y29uc3QgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcDtcblx0Y29uc3QgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdDtcblx0Y29uc3QgcmlnaHQgPSBib2R5Lm9mZnNldFdpZHRoIC0gYm94LnJpZ2h0O1xuXHRjb25zdCBib3R0b20gPSBib2R5Lm9mZnNldEhlaWdodCAtIGJveC5ib3R0b207XG5cdGNvbnN0IHdpZHRoID0gYm94LnJpZ2h0IC0gYm94LmxlZnQ7XG5cdGNvbnN0IGhlaWdodCA9IGJveC5ib3R0b20gLSBib3gudG9wO1xuXG5cdHJldHVybiB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9O1xufVxuXG5sZXQgc2Nyb2xsV2lkdGggPSAtMTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpOiBudW1iZXIge1xuXHRpZiAoc2Nyb2xsV2lkdGggPiAtMSl7XG5cdFx0cmV0dXJuIHNjcm9sbFdpZHRoO1xuXHR9XG5cblx0Y29uc3Qgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuXHRzY3JvbGxEaXYuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGFic29sdXRlO2xlZnQ6IC05OTk5OXB4O292ZXJmbG93OnNjcm9sbDt3aWR0aDogMTAwcHg7aGVpZ2h0OiAxMDBweDtcIjtcblx0c2Nyb2xsV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG5cdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcblx0cmV0dXJuIHNjcm9sbFdpZHRoO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGaXRUYXJnZXQge1xuXHR0b3A6IG51bWJlcjtcblx0bGVmdDogbnVtYmVyO1xuXHR3aWR0aDogbnVtYmVyO1xuXHRoZWlnaHQ6IG51bWJlcjtcbn1cbmludGVyZmFjZSBJRml0UG9zaXRpb24ge1xuXHRsZWZ0OiBudW1iZXI7XG5cdHJpZ2h0OiBudW1iZXI7XG5cdHRvcDogbnVtYmVyO1xuXHRib3R0b206IG51bWJlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUZpdFBvc2l0aW9uQ29uZmlnIHtcblx0bW9kZT86IFBvc2l0aW9uO1xuXHRhdXRvPzogYm9vbGVhbjtcblx0Y2VudGVyaW5nPzogYm9vbGVhbjtcblx0d2lkdGg6IG51bWJlcjtcblx0aGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXRQb3NpdGlvbihub2RlOiBIVE1MRWxlbWVudCwgY29uZmlnOiBJRml0UG9zaXRpb25Db25maWcpIHtcblx0cmV0dXJuIGNhbGN1bGF0ZVBvc2l0aW9uKGdldFJlYWxQb3NpdGlvbihub2RlKSwgY29uZmlnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSUUoKSB7XG5cdGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdHJldHVybiB1YS5pbmRleE9mKFwiTVNJRSBcIikgPiAtMSB8fCB1YS5pbmRleE9mKFwiVHJpZGVudC9cIikgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlYWxQb3NpdGlvbihub2RlOiBIVE1MRWxlbWVudCk6IElGaXRQb3NpdGlvbiB7XG5cdGNvbnN0IHJlY3RzID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0cmV0dXJuIHtcblx0XHRsZWZ0OiByZWN0cy5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuXHRcdHJpZ2h0OiByZWN0cy5yaWdodCArIHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHR0b3A6IHJlY3RzLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcblx0XHRib3R0b206IHJlY3RzLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldFxuXHR9O1xufVxuXG5leHBvcnQgZW51bSBQb3NpdGlvbiB7XG5cdGxlZnQgPSBcImxlZnRcIixcblx0cmlnaHQgPSBcInJpZ2h0XCIsXG5cdGJvdHRvbSA9IFwiYm90dG9tXCIsXG5cdHRvcCA9IFwidG9wXCJcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUG9zaXRpb24ocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XG5cdGNvbnN0IHtsZWZ0LCB0b3B9ID0gY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLmJvdHRvbSB8fCBjb25maWcubW9kZSA9PT0gUG9zaXRpb24udG9wXG5cdFx0PyBwbGFjZUJvdHRvbU9yVG9wKHBvcywgY29uZmlnKVxuXHRcdDogcGxhY2VSaWdodE9yTGVmdChwb3MsIGNvbmZpZyk7XG5cdHJldHVybiB7XG5cdFx0bGVmdDogTWF0aC5yb3VuZChsZWZ0KSArIFwicHhcIixcblx0XHR0b3A6IE1hdGgucm91bmQodG9wKSArIFwicHhcIixcblx0XHRtaW5XaWR0aDogTWF0aC5yb3VuZChjb25maWcud2lkdGgpICsgXCJweFwiLFxuXHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93Qm9yZGVycygpIHtcblx0cmV0dXJuIHtcblx0XHRyaWdodEJvcmRlcjogd2luZG93LnBhZ2VYT2Zmc2V0ICsgd2luZG93LmlubmVyV2lkdGgsXG5cdFx0Ym90dG9tQm9yZGVyOiB3aW5kb3cucGFnZVlPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHRcblx0fTtcbn1cblxuZnVuY3Rpb24gaG9yaXpvbnRhbENlbnRlcmluZyhwb3M6IElGaXRQb3NpdGlvbiwgd2lkdGg6IG51bWJlciwgcmlnaHRCb3JkZXI6IG51bWJlcikge1xuXHRjb25zdCBub2RlV2lkdGggPSBwb3MucmlnaHQgLSBwb3MubGVmdDtcblx0Y29uc3QgZGlmZiA9ICh3aWR0aCAtIG5vZGVXaWR0aCkgLyAyO1xuXG5cdGNvbnN0IGxlZnQgPSBwb3MubGVmdCAtIGRpZmY7XG5cdGNvbnN0IHJpZ2h0ID0gcG9zLnJpZ2h0ICsgZGlmZjtcblxuXHRpZiAobGVmdCA+PSAwICYmIHJpZ2h0IDw9IHJpZ2h0Qm9yZGVyKSB7XG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH1cblxuXHRpZiAobGVmdCA8IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHJldHVybiByaWdodEJvcmRlciAtIHdpZHRoO1xufVxuXG5mdW5jdGlvbiB2ZXJ0aWNhbENlbnRlcmluZyhwb3M6IElGaXRQb3NpdGlvbiwgaGVpZ2h0OiBudW1iZXIsIGJvdHRvbUJvcmRlcjogbnVtYmVyKSB7XG5cdGNvbnN0IG5vZGVIZWlnaHQgPSBwb3MuYm90dG9tIC0gcG9zLnRvcDtcblx0Y29uc3QgZGlmZiA9IChoZWlnaHQgLSBub2RlSGVpZ2h0KSAvIDI7XG5cblx0Y29uc3QgdG9wID0gcG9zLnRvcCAtIGRpZmY7XG5cdGNvbnN0IGJvdHRvbSA9IHBvcy5ib3R0b20gKyBkaWZmO1xuXG5cdGlmICh0b3AgPj0gMCAmJiBib3R0b20gPD0gYm90dG9tQm9yZGVyKSB7XG5cdFx0cmV0dXJuIHRvcDtcblx0fVxuXG5cdGlmICh0b3AgPCAwKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gYm90dG9tQm9yZGVyIC0gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBwbGFjZUJvdHRvbU9yVG9wKHBvczogSUZpdFBvc2l0aW9uLCBjb25maWc6IElGaXRQb3NpdGlvbkNvbmZpZykge1xuXHRjb25zdCB7cmlnaHRCb3JkZXIsIGJvdHRvbUJvcmRlcn0gPSBnZXRXaW5kb3dCb3JkZXJzKCk7XG5cblx0bGV0IGxlZnQ7XG5cdGxldCB0b3A7XG5cblx0Y29uc3QgYm90dG9tRGlmZiA9IGJvdHRvbUJvcmRlciAtIHBvcy5ib3R0b20gLSBjb25maWcuaGVpZ2h0O1xuXHRjb25zdCB0b3BEaWZmID0gcG9zLnRvcCAtIGNvbmZpZy5oZWlnaHQ7XG5cblx0aWYgKGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi5ib3R0b20pIHtcblx0XHRpZiAoYm90dG9tRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSBwb3MuYm90dG9tO1xuXHRcdH0gZWxzZSBpZiAodG9wRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSB0b3BEaWZmO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAodG9wRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSB0b3BEaWZmO1xuXHRcdH0gZWxzZSBpZiAoYm90dG9tRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSBwb3MuYm90dG9tO1xuXHRcdH1cblx0fVxuXG5cdGlmIChib3R0b21EaWZmIDwgMCAmJiB0b3BEaWZmIDwgMCkge1xuXHRcdGlmIChjb25maWcuYXV0bykge1xuXHRcdFx0cmV0dXJuIHBsYWNlUmlnaHRPckxlZnQocG9zLCB7Li4uY29uZmlnLCBtb2RlOiBQb3NpdGlvbi5yaWdodCwgYXV0bzogZmFsc2V9KTtcblx0XHR9XG5cdFx0dG9wID0gYm90dG9tRGlmZiA+IHRvcERpZmYgPyBwb3MuYm90dG9tIDogdG9wRGlmZjtcblx0fVxuXG5cdGlmIChjb25maWcuY2VudGVyaW5nKSB7XG5cdFx0bGVmdCA9IGhvcml6b250YWxDZW50ZXJpbmcocG9zLCBjb25maWcud2lkdGgsIHJpZ2h0Qm9yZGVyKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBsZWZ0RGlmZiA9IHJpZ2h0Qm9yZGVyIC0gcG9zLmxlZnQgLSBjb25maWcud2lkdGg7XG5cdFx0Y29uc3QgcmlnaHREaWZmID0gcG9zLnJpZ2h0IC0gY29uZmlnLndpZHRoO1xuXG5cdFx0aWYgKGxlZnREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBwb3MubGVmdDtcblx0XHR9IGVsc2UgaWYgKHJpZ2h0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gcmlnaHREaWZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZWZ0ID0gcmlnaHREaWZmID4gbGVmdERpZmYgID8gcG9zLmxlZnQgOiByaWdodERpZmY7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtsZWZ0LCB0b3B9O1xufVxuXG5mdW5jdGlvbiBwbGFjZVJpZ2h0T3JMZWZ0KHBvczogSUZpdFBvc2l0aW9uLCBjb25maWc6IElGaXRQb3NpdGlvbkNvbmZpZykge1xuXHRjb25zdCB7cmlnaHRCb3JkZXIsIGJvdHRvbUJvcmRlcn0gPSBnZXRXaW5kb3dCb3JkZXJzKCk7XG5cblx0bGV0IGxlZnQ7XG5cdGxldCB0b3A7XG5cblx0Y29uc3QgcmlnaHREaWZmID0gcmlnaHRCb3JkZXIgLSBwb3MucmlnaHQgLSBjb25maWcud2lkdGg7XG5cdGNvbnN0IGxlZnREaWZmID0gcG9zLmxlZnQgLSBjb25maWcud2lkdGg7XG5cblx0aWYgKGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi5yaWdodCkge1xuXHRcdGlmIChyaWdodERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IHBvcy5yaWdodDtcblx0XHR9IGVsc2UgaWYgKGxlZnREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBsZWZ0RGlmZjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGxlZnREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBsZWZ0RGlmZjtcblx0XHR9IGVsc2UgaWYgKHJpZ2h0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gcG9zLnJpZ2h0O1xuXHRcdH1cblx0fVxuXG5cdGlmIChsZWZ0RGlmZiA8IDAgJiYgcmlnaHREaWZmIDwgMCkge1xuXHRcdGlmIChjb25maWcuYXV0bykge1xuXHRcdFx0cmV0dXJuIHBsYWNlQm90dG9tT3JUb3AocG9zLCB7Li4uY29uZmlnLCBtb2RlOiBQb3NpdGlvbi5ib3R0b20sIGF1dG86IGZhbHNlfSk7XG5cdFx0fVxuXHRcdGxlZnQgPSBsZWZ0RGlmZiA+IHJpZ2h0RGlmZiA/IGxlZnREaWZmIDogcG9zLnJpZ2h0O1xuXHR9XG5cblx0aWYgKGNvbmZpZy5jZW50ZXJpbmcpIHtcblx0XHR0b3AgPSB2ZXJ0aWNhbENlbnRlcmluZyhwb3MsIGNvbmZpZy5oZWlnaHQsIHJpZ2h0Qm9yZGVyKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBib3R0b21EaWZmID0gcG9zLmJvdHRvbSAtIGNvbmZpZy5oZWlnaHQ7XG5cdFx0Y29uc3QgdG9wRGlmZiA9IGJvdHRvbUJvcmRlciAtIHBvcy50b3AgLSBjb25maWcuaGVpZ2h0O1xuXG5cdFx0aWYgKHRvcERpZmYgPj0gMCkge1xuXHRcdFx0dG9wID0gcG9zLnRvcDtcblx0XHR9IGVsc2UgaWYgKGJvdHRvbURpZmYgPiAwKSB7XG5cdFx0XHR0b3AgPSBib3R0b21EaWZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3AgPSBib3R0b21EaWZmID4gdG9wRGlmZiAgPyBib3R0b21EaWZmIDogcG9zLnRvcDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge2xlZnQsIHRvcH07XG59IiwiaWYgKEVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcblx0Y29uc3QgcHJvdG8gPSAoRWxlbWVudCBhcyBhbnkpLnByb3RvdHlwZTtcblx0cHJvdG8ubWF0Y2hlcyA9IHByb3RvLm1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdHByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwcm90by5tc01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xufSIsImltcG9ydCB7IEV2ZW50U3lzdGVtLCBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5cbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCIuL2RhdGFjb2xsZWN0aW9uL2xvYWRlclwiO1xuaW1wb3J0IHsgU29ydCB9IGZyb20gXCIuL2RhdGFjb2xsZWN0aW9uL3NvcnRcIjtcbmltcG9ydCB7IERhdGFQcm94eSB9IGZyb20gXCIuL2RhdGFwcm94eVwiO1xuaW1wb3J0IHsgZGh4RXJyb3IsIGRoeFdhcm5pbmcsIGZpbmRCeUNvbmYsIGlzRGVidWcsIGlzRXF1YWxPYmosIGNvcHlXaXRob3V0SW5uZXIsIHRvRGF0YURyaXZlciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB7XG5cdERhdGFDYWxsYmFjaywgRGF0YUV2ZW50cywgSWQsIElEYXRhQ2hhbmdlU3RhY2ssIElEYXRhQ29sbGVjdGlvbiwgSURhdGFJdGVtLFxuXHRJRGF0YVByb3h5LCBJRmlsdGVyQ2FsbGJhY2ssIElGaWx0ZXJDb25maWcsIElGaWx0ZXJNb2RlLCBJU29ydE1vZGUsIElUcmVlQ29sbGVjdGlvbiwgSVVwZGF0ZU9iamVjdCwgUmVkdWNlQ2FsbEJhY2ssIFN0YXR1c2VzLCBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwLCBEYXRhRHJpdmVyLFxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG5pbXBvcnQgeyBjb3B5LCBleHRlbmQsIGZpbmRJbmRleCwgdWlkIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2NvcmVcIjtcbmltcG9ydCB7IFRyZWVDb2xsZWN0aW9uIH0gZnJvbSBcIi4vdHJlZWNvbGxlY3Rpb25cIjtcblxuZXhwb3J0IGNsYXNzIERhdGFDb2xsZWN0aW9uPFQgZXh0ZW5kcyBJRGF0YUl0ZW0gPSBJRGF0YUl0ZW0+IGltcGxlbWVudHMgSURhdGFDb2xsZWN0aW9uPFQ+IHtcblx0cHVibGljIGxvYWREYXRhOiBQcm9taXNlPGFueT47XG5cdHB1YmxpYyBzYXZlRGF0YTogUHJvbWlzZTxhbnk+O1xuXHRwdWJsaWMgY29uZmlnOiBhbnk7IC8vIFtUT0RPXSBhZGQgdHlwaW5nc1xuXHRwdWJsaWMgZXZlbnRzOiBJRXZlbnRTeXN0ZW08RGF0YUV2ZW50cywgSURhdGFFdmVudHNIYW5kbGVyc01hcD47XG5cblx0cHJvdGVjdGVkIF9vcmRlcjogVFtdO1xuXHRwcm90ZWN0ZWQgX3B1bGw6IHsgW2lkOiBzdHJpbmddOiBUIH07XG5cdHByb3RlY3RlZCBfc29ydDogU29ydDtcblx0cHJvdGVjdGVkIF9maWx0ZXJzOmFueTtcblxuXHRwcml2YXRlIF9jaGFuZ2VzOiBJRGF0YUNoYW5nZVN0YWNrO1xuXG5cdHByaXZhdGUgX2luaXRPcmRlcjogVFtdO1xuXG5cdHByaXZhdGUgX2xvYWRlcjogTG9hZGVyO1xuXG5cdGNvbnN0cnVjdG9yKGNvbmZpZz86IGFueSwgZXZlbnRzPzpJRXZlbnRTeXN0ZW08YW55Pikge1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuXG5cdFx0dGhpcy5fb3JkZXIgPSBbXTtcblx0XHR0aGlzLl9wdWxsID0ge307XG5cdFx0dGhpcy5fY2hhbmdlcyA9IHtvcmRlcjogW119O1xuXHRcdHRoaXMuX2luaXRPcmRlciA9IG51bGw7XG5cblx0XHR0aGlzLl9zb3J0ID0gbmV3IFNvcnQoKTtcblx0XHR0aGlzLl9sb2FkZXIgPSBuZXcgTG9hZGVyKHRoaXMsIHRoaXMuX2NoYW5nZXMpO1xuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzIHx8IG5ldyBFdmVudFN5c3RlbTxhbnk+KHRoaXMpO1xuXHR9XG5cblx0YWRkKG9iajogYW55LCBpbmRleD86IG51bWJlcik6IHN0cmluZyB7XG5cdFx0aWYgKCF0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuYmVmb3JlQWRkLCBbb2JqXSkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBpZCA9IHRoaXMuX2FkZENvcmUob2JqLCBpbmRleCk7XG5cblx0XHR0aGlzLl9vbkNoYW5nZShcImFkZFwiLCBvYmouaWQsIG9iaik7XG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmFmdGVyQWRkLCBbb2JqXSk7XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdHJlbW92ZShpZDogSWQpOiB2b2lkIHtcblx0XHRjb25zdCBvYmogPSB0aGlzLl9wdWxsW2lkXTtcblx0XHRpZiAob2JqKSB7XG5cdFx0XHRpZiAoIXRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5iZWZvcmVSZW1vdmUsIFtvYmpdKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9yZW1vdmVDb3JlKG9iai5pZCk7XG5cdFx0XHR0aGlzLl9vbkNoYW5nZShcInJlbW92ZVwiLCBpZCwgb2JqKTtcblx0XHR9XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuYWZ0ZXJSZW1vdmUsIFtvYmpdKTtcblx0fVxuXG5cdHJlbW92ZUFsbCgpOiB2b2lkIHtcblx0XHR0aGlzLl9yZW1vdmVBbGwoKTtcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMucmVtb3ZlQWxsKTtcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0fVxuXG5cdGV4aXN0cyhpZDogSWQpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gISF0aGlzLl9wdWxsW2lkXTtcblx0fVxuXHRnZXROZWFySWQoaWQ6IHN0cmluZyl7XG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMuX3B1bGxbaWRdO1xuXHRcdGlmICghaXRlbSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX29yZGVyWzBdLmlkIHx8IFwiXCI7XG5cdFx0fVxuXHR9XG5cdGdldEl0ZW0oaWQ6IElkKTogVCB7XG5cdFx0cmV0dXJuIHRoaXMuX3B1bGxbaWRdO1xuXHR9XG5cdHVwZGF0ZShpZDogSWQsIG9iajogSVVwZGF0ZU9iamVjdCwgc2lsZW50Pzpib29sZWFuKSB7XG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XG5cdFx0aWYgKGl0ZW0pIHtcblx0XHRcdGlmIChpc0VxdWFsT2JqKG9iaiwgaXRlbSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAob2JqLmlkICYmIGlkICE9PSBvYmouaWQpIHtcblx0XHRcdFx0ZGh4V2FybmluZyhcInRoaXMgbWV0aG9kIGRvZXNuJ3QgYWxsb3cgY2hhbmdlIGlkXCIpO1xuXHRcdFx0XHRpZiAoaXNEZWJ1ZygpKSB7XG5cdFx0XHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWRlYnVnZ2VyXG5cdFx0XHRcdFx0ZGVidWdnZXI7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGV4dGVuZCh0aGlzLl9wdWxsW2lkXSwgb2JqLCBmYWxzZSk7XG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy51cGRhdGUpe1xuXHRcdFx0XHRcdHRoaXMuY29uZmlnLnVwZGF0ZSh0aGlzLl9wdWxsW2lkXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCFzaWxlbnQpe1xuXHRcdFx0XHRcdHRoaXMuX29uQ2hhbmdlKFwidXBkYXRlXCIsIGlkLCB0aGlzLl9wdWxsW2lkXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGh4V2FybmluZyhcIml0ZW0gbm90IGZvdW5kXCIpO1xuXHRcdH1cblx0fVxuXHRnZXRJbmRleChpZDogSWQpOiBudW1iZXIge1xuXHRcdGNvbnN0IHJlcyA9IGZpbmRJbmRleCh0aGlzLl9vcmRlciwgaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XG5cdFx0aWYgKHRoaXMuX3B1bGxbaWRdICYmIHJlcyA+PSAwKSB7XG5cdFx0XHRyZXR1cm4gcmVzO1xuXHRcdH1cblx0XHRyZXR1cm4gLTE7XG5cdH1cblx0Z2V0SWQoaW5kZXg6IG51bWJlcik6IElkIHtcblx0XHRpZiAoIXRoaXMuX29yZGVyW2luZGV4XSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fb3JkZXJbaW5kZXhdLmlkO1xuXHR9XG5cdGdldExlbmd0aCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fb3JkZXIubGVuZ3RoO1xuXHR9XG5cdGZpbHRlcihydWxlPzogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZz86SUZpbHRlckNvbmZpZykge1xuXHRcdGNvbmZpZyA9IGV4dGVuZCh7XG5cdFx0XHRhZGQ6ZmFsc2UsXG5cdFx0XHRtdWx0aXBsZTp0cnVlXG5cdFx0fSxjb25maWcpO1xuXG5cdFx0aWYgKCFjb25maWcuYWRkKSB7XG5cdFx0XHR0aGlzLl9vcmRlciA9IHRoaXMuX2luaXRPcmRlciB8fCB0aGlzLl9vcmRlcjtcblx0XHRcdHRoaXMuX2luaXRPcmRlciA9IG51bGw7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZmlsdGVycyA9IHRoaXMuX2ZpbHRlcnMgfHwge307XG5cblx0XHRpZiAoIWNvbmZpZy5tdWx0aXBsZXx8IXJ1bGUpIHtcblx0XHRcdHRoaXMuX2ZpbHRlcnMgPSB7fTtcblx0XHR9XG5cblx0XHRpZihydWxlKXtcblx0XHRcdGlmKHR5cGVvZiBydWxlID09PSBcImZ1bmN0aW9uXCIpe1xuXHRcdFx0XHRjb25zdCBmID0gXCJfXCI7XG5cdFx0XHRcdHRoaXMuX2ZpbHRlcnNbZl0gPSB7XG5cdFx0XHRcdFx0bWF0Y2g6Zixcblx0XHRcdFx0XHRjb21wYXJlOnJ1bGVcblx0XHRcdFx0fTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRpZighcnVsZS5tYXRjaCl7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2ZpbHRlcnNbcnVsZS5ieV07XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJ1bGUuY29tcGFyZSA9IHJ1bGUuY29tcGFyZSB8fCAoKHZhbCwgbWF0Y2gpID0+IHZhbCA9PT0gbWF0Y2gpO1xuXHRcdFx0XHRcdHRoaXMuX2ZpbHRlcnNbcnVsZS5ieV0gPSBydWxlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGZPcmRlciA9IHRoaXMuX29yZGVyLmZpbHRlcihpdGVtID0+IHtcblx0XHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2ZpbHRlcnMpLmV2ZXJ5KFxuXHRcdFx0XHRcdGtleSA9PlxuXHRcdFx0XHRcdFx0aXRlbVtrZXldP1xuXHRcdFx0XHRcdFx0dGhpcy5fZmlsdGVyc1trZXldLmNvbXBhcmUoaXRlbVtrZXldLCB0aGlzLl9maWx0ZXJzW2tleV0ubWF0Y2gsIGl0ZW0pXG5cdFx0XHRcdFx0XHQ6dGhpcy5fZmlsdGVyc1trZXldLmNvbXBhcmUoaXRlbSlcblx0XHRcdFx0KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXRoaXMuX2luaXRPcmRlcikge1xuXHRcdFx0XHR0aGlzLl9pbml0T3JkZXIgPSB0aGlzLl9vcmRlcjtcblx0XHRcdFx0dGhpcy5fb3JkZXIgPSBmT3JkZXI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdH1cblx0ZmluZChjb25mOiBJRmlsdGVyTW9kZSB8IERhdGFDYWxsYmFjazxUPik6IGFueSB7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fcHVsbCkge1xuXHRcdFx0Y29uc3QgcmVzID0gZmluZEJ5Q29uZih0aGlzLl9wdWxsW2tleV0sIGNvbmYpO1xuXHRcdFx0aWYocmVzKXtcblx0XHRcdFx0cmV0dXJuIHJlcztcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0ZmluZEFsbChjb25mOiBJRmlsdGVyTW9kZSB8IERhdGFDYWxsYmFjazxUPik6IGFueVtdIHtcblx0XHRjb25zdCByZXMgPSBbXTtcblx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9wdWxsKSB7XG5cdFx0XHRjb25zdCBpdGVtID0gZmluZEJ5Q29uZih0aGlzLl9wdWxsW2tleV0sIGNvbmYpO1xuXHRcdFx0aWYgKGl0ZW0pIHtcblx0XHRcdFx0cmVzLnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXM7XG5cdH1cblx0c29ydChieTogSVNvcnRNb2RlKSB7XG5cdFx0dGhpcy5fc29ydC5zb3J0KHRoaXMuX29yZGVyLCBieSk7XG5cblx0XHRpZiAodGhpcy5faW5pdE9yZGVyICYmIHRoaXMuX2luaXRPcmRlci5sZW5ndGgpIHtcblx0XHRcdHRoaXMuX3NvcnQuc29ydCh0aGlzLl9pbml0T3JkZXIsIGJ5KTtcblx0XHR9XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0fVxuXHRjb3B5KGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uLCB0YXJnZXRJZD86IElkKTogSWQge1xuXHRcdGlmICghdGhpcy5leGlzdHMoaWQpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgbmV3aWQgPSB1aWQoKTtcblx0XHRpZiAodGFyZ2V0KSB7XG5cdFx0XHRpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBEYXRhQ29sbGVjdGlvbikgJiYgdGFyZ2V0SWQpIHtcblx0XHRcdFx0dGFyZ2V0LmFkZChjb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCkpLCBpbmRleCwgdGFyZ2V0SWQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAodGFyZ2V0LmV4aXN0cyhpZCkpIHtcblx0XHRcdFx0dGFyZ2V0LmFkZCh7Li4uY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaWQ6IG5ld2lkIH0sIGluZGV4KTtcblx0XHRcdFx0cmV0dXJuIG5ld2lkO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0LmFkZChjb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCkpLCBpbmRleCk7XG5cdFx0XHRcdHJldHVybiBpZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5hZGQoeyAuLi5jb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCkpLCBpZDogbmV3aWQgfSwgaW5kZXgpO1xuXHRcdHJldHVybiBuZXdpZDtcblx0fVxuXHRtb3ZlKGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogRGF0YUNvbGxlY3Rpb24gfCBUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkIHtcblx0XHRpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gdGhpcyAmJiB0aGlzLmV4aXN0cyhpZCkpIHtcblx0XHRcdGNvbnN0IGl0ZW0gPSBjb3B5KHRoaXMuZ2V0SXRlbShpZCksIHRydWUpO1xuXHRcdFx0aWYgKHRhcmdldC5leGlzdHMoaWQpKSB7XG5cdFx0XHRcdGl0ZW0uaWQgPSB1aWQoKTtcblx0XHRcdH1cblx0XHRcdGlmICh0YXJnZXRJZCkge1xuXHRcdFx0XHRpdGVtLnBhcmVudCA9IHRhcmdldElkO1xuXHRcdFx0fVxuXHRcdFx0dGFyZ2V0LmFkZChpdGVtLCBpbmRleCk7XG5cdFx0XHQvLyByZW1vdmUgZGF0YSBmcm9tIG9yaWdpbmFsIGNvbGxlY3Rpb25cblx0XHRcdHRoaXMucmVtb3ZlKGlkKTtcblx0XHRcdHJldHVybiBpdGVtLmlkO1xuXHRcdH1cblx0XHRpZiAodGhpcy5nZXRJbmRleChpZCkgPT09IGluZGV4KSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Ly8gbW92ZSBvdGhlciBlbGVtZW50c1xuXHRcdGNvbnN0IHNwbGljZWQgPSB0aGlzLl9vcmRlci5zcGxpY2UodGhpcy5nZXRJbmRleChpZCksIDEpWzBdO1xuXHRcdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRcdGluZGV4ID0gdGhpcy5fb3JkZXIubGVuZ3RoO1xuXHRcdH1cblx0XHR0aGlzLl9vcmRlci5zcGxpY2UoaW5kZXgsIDAsIHNwbGljZWQpO1xuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7IC8vIGlmIHRhcmdldCBub3QgdGhpcywgaXQgdHJpZ2dlciBhZGQgYW5kIHJlbW92ZVxuXHRcdHJldHVybiBpZDtcblx0fVxuXHRsb2FkKHVybDogSURhdGFQcm94eSB8IHN0cmluZywgZHJpdmVyPzogYW55KTogUHJvbWlzZTxhbnk+IHtcblx0XHRpZiAodHlwZW9mIHVybCA9PT0gXCJzdHJpbmdcIil7XG5cdFx0XHR1cmwgPSBuZXcgRGF0YVByb3h5KHVybCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9sb2FkZXIubG9hZCh1cmwsIGRyaXZlcik7XG5cdH1cblx0cGFyc2UoZGF0YTogVFtdLCBkcml2ZXI/OiBhbnkpIHtcblx0XHR0aGlzLl9yZW1vdmVBbGwoKTtcblx0XHRyZXR1cm4gdGhpcy5fbG9hZGVyLnBhcnNlKGRhdGEsIGRyaXZlcik7XG5cdH1cblx0JHBhcnNlKGRhdGE6IGFueVtdKXtcblx0XHRjb25zdCBhcHggPSB0aGlzLmNvbmZpZy5hcHByb3hpbWF0ZTtcblx0XHRpZiAoYXB4KXtcblx0XHRcdGRhdGEgPSB0aGlzLl9hcHByb3hpbWF0ZShkYXRhLCBhcHgudmFsdWUsIGFweC5tYXhOdW0pO1xuXHRcdH1cblxuXHRcdHRoaXMuX3BhcnNlX2RhdGEoZGF0YSk7XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMubG9hZCk7XG5cdH1cblx0c2F2ZSh1cmw6IElEYXRhUHJveHkpIHtcblx0XHR0aGlzLl9sb2FkZXIuc2F2ZSh1cmwpO1xuXHR9XG5cdC8vIHRvZG86IGxvb3AgdGhyb3VnaCB0aGUgYXJyYXkgYW5kIGNoZWNrIHNhdmVkIHN0YXR1c2VzXG5cdGlzU2F2ZWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICF0aGlzLl9jaGFuZ2VzLm9yZGVyLmxlbmd0aDsgLy8gdG9kbzogYmFkIHNvbHV0aW9uLCBlcnJvcnMgYW5kIGhvbGRlZCBlbG1lbnRzIGFyZSBtaXNzZWQuLi5cblx0fVxuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPikgOiBhbnlbXXtcblx0XHRjb25zdCByZXN1bHQgOiBhbnlbXSA9IFtdO1xuXHRcdGZvciAobGV0IGk9MDsgaTx0aGlzLl9vcmRlci5sZW5ndGg7IGkrKyl7XG5cdFx0XHRyZXN1bHQucHVzaChjYi5jYWxsKHRoaXMsIHRoaXMuX29yZGVyW2ldLCBpKSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0bWFwUmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjYjogRGF0YUNhbGxiYWNrPFQ+KTogYW55W10ge1xuXHRcdGlmIChmcm9tIDwgMCkge1xuXHRcdFx0ZnJvbSA9IDA7XG5cdFx0fVxuXHRcdGlmICh0byA+IHRoaXMuX29yZGVyLmxlbmd0aCAtIDEpIHtcblx0XHRcdHRvID0gdGhpcy5fb3JkZXIubGVuZ3RoIC0gMTtcblx0XHR9XG5cdFx0Y29uc3QgcmVzdWx0OiBhbnlbXSA9IFtdO1xuXHRcdGZvciAobGV0IGk9ZnJvbTsgaTw9dG87IGkrKyl7XG5cdFx0XHRyZXN1bHQucHVzaChjYi5jYWxsKHRoaXMsIHRoaXMuX29yZGVyW2ldLCBpKSk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cmVkdWNlPEE+KGNiOiBSZWR1Y2VDYWxsQmFjazxULCBBPiwgYWNjOiBBKXtcblx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5fb3JkZXIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGFjYyA9IGNiLmNhbGwodGhpcywgYWNjLCB0aGlzLl9vcmRlcltpXSwgaSk7XG5cdFx0fVxuXHRcdHJldHVybiBhY2M7XG5cdH1cblx0c2VyaWFsaXplKGRyaXZlcjogRGF0YURyaXZlciA9IERhdGFEcml2ZXIuanNvbil7IC8vIHJlbW92ZSAkIGF0dHJzXG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMubWFwKGl0ZW0gPT4ge1xuXHRcdFx0Y29uc3QgbmV3SXRlbSA9IHsuLi5pdGVtIGFzIElEYXRhSXRlbX07XG5cdFx0XHRPYmplY3Qua2V5cyhuZXdJdGVtKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRcdGlmIChrZXlbMF0gPT09IFwiJFwiKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIG5ld0l0ZW1ba2V5XTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gbmV3SXRlbTtcblx0XHR9KTtcblx0XHRjb25zdCBkYXRhRHJpdmVyID0gdG9EYXRhRHJpdmVyKGRyaXZlcik7XG5cdFx0aWYoZGF0YURyaXZlcil7XG5cdFx0XHRyZXR1cm4gZGF0YURyaXZlci5zZXJpYWxpemUoZGF0YSk7XG5cdFx0fVxuXHR9XG5cdGdldEluaXRpYWxEYXRhKCl7XG5cdFx0cmV0dXJuIHRoaXMuX2luaXRPcmRlcjtcblx0fVxuXHRwcm90ZWN0ZWQgX3JlbW92ZUFsbCgpe1xuXHRcdHRoaXMuX3B1bGwgPSB7fTtcblx0XHR0aGlzLl9vcmRlciA9IFtdO1xuXHRcdHRoaXMuX2NoYW5nZXMub3JkZXIgPSBbXTtcblx0XHR0aGlzLl9pbml0T3JkZXIgPSBudWxsO1xuXHR9XG5cdHByb3RlY3RlZCBfYWRkQ29yZShvYmosIGluZGV4KTogc3RyaW5nIHtcblx0XHRpZiAodGhpcy5jb25maWcuaW5pdCkge1xuXHRcdFx0b2JqID0gdGhpcy5jb25maWcuaW5pdChvYmopO1xuXHRcdH1cblxuXHRcdG9iai5pZCA9IG9iai5pZCA/IG9iai5pZC50b1N0cmluZygpIDogdWlkKCk7XG5cblx0XHRpZiAodGhpcy5fcHVsbFtvYmouaWRdKSB7XG5cdFx0XHRkaHhFcnJvcihcIkl0ZW0gYWxyZWFkeSBleGlzdFwiKTtcblx0XHR9XG5cdFx0Ly8gdG9kbzogbm90IGlkZWFsIHNvbHV0aW9uXG5cdFx0aWYgKHRoaXMuX2luaXRPcmRlciAmJiB0aGlzLl9pbml0T3JkZXIubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLl9hZGRUb09yZGVyKHRoaXMuX2luaXRPcmRlciwgb2JqLCBpbmRleCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fYWRkVG9PcmRlcih0aGlzLl9vcmRlciwgb2JqLCBpbmRleCk7XG5cblx0XHRyZXR1cm4gb2JqLmlkO1xuXHR9XG5cdHByb3RlY3RlZCBfcmVtb3ZlQ29yZShpZDogSWQpe1xuXHRcdGlmICh0aGlzLmdldEluZGV4KGlkKSA+PSAwKXtcblx0XHRcdHRoaXMuX29yZGVyID0gdGhpcy5fb3JkZXIuZmlsdGVyKGVsID0+IGVsLmlkICE9PSBpZCk7XG5cdFx0XHRkZWxldGUgdGhpcy5fcHVsbFtpZF07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2luaXRPcmRlciAmJiB0aGlzLl9pbml0T3JkZXIubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLl9pbml0T3JkZXIgPSB0aGlzLl9pbml0T3JkZXIuZmlsdGVyKGVsID0+IGVsLmlkICE9PSBpZCk7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIF9wYXJzZV9kYXRhKGRhdGE6IGFueVtdKXtcblx0XHRsZXQgaW5kZXggPSB0aGlzLl9vcmRlci5sZW5ndGg7XG5cdFx0aWYodGhpcy5jb25maWcucHJlcCl7XG5cdFx0XHRkYXRhID0gdGhpcy5jb25maWcucHJlcChkYXRhKTtcblx0XHR9XG5cdFx0Zm9yIChsZXQgb2JqIG9mIGRhdGEpIHtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5pbml0KSB7XG5cdFx0XHRcdG9iaiA9IHRoaXMuY29uZmlnLmluaXQob2JqKTtcblx0XHRcdH1cblx0XHRcdG9iai5pZCA9IChvYmouaWQgfHwgb2JqLmlkID09PSAwKSA/IG9iai5pZCA6IHVpZCgpO1xuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xuXHRcdFx0dGhpcy5fb3JkZXJbaW5kZXgrK10gPSBvYmo7XG5cdFx0fVxuXHR9XG5cblx0cHJvdGVjdGVkIF9hcHByb3hpbWF0ZShkYXRhOiBhbnlbXSwgdmFsdWVzOnN0cmluZ1tdLCBtYXhOdW06bnVtYmVyKXtcblx0XHRjb25zdCBsZW4gPSBkYXRhLmxlbmd0aDtcblx0XHRjb25zdCB2bGVuID0gdmFsdWVzLmxlbmd0aDtcblx0XHRjb25zdCBybGVuID0gTWF0aC5mbG9vcihsZW4vbWF4TnVtKTtcblx0XHRjb25zdCBuZXdEYXRhID0gQXJyYXkoTWF0aC5jZWlsKGxlbi9ybGVuKSk7XG5cblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdGZvciAobGV0IGk9MDsgaTxsZW47IGkrPXJsZW4pIHtcblx0XHRcdGNvbnN0IG5ld0l0ZW0gPSBjb3B5KGRhdGFbaV0pO1xuXHRcdFx0Y29uc3QgZW5kID0gTWF0aC5taW4obGVuLCBpK3JsZW4pO1xuXHRcdFx0Zm9yIChsZXQgaj0wOyBqPHZsZW47IGorKykge1xuXHRcdFx0XHRsZXQgc3VtID0gMDtcblx0XHRcdFx0Zm9yIChsZXQgej1pOyB6PGVuZDsgeisrKXtcblx0XHRcdFx0XHRzdW0gKz0gZGF0YVt6XVt2YWx1ZXNbal1dO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG5ld0l0ZW1bdmFsdWVzW2pdXSA9IHN1bSAvIChlbmQtaSk7XG5cdFx0XHR9XG5cdFx0XHRuZXdEYXRhW2luZGV4KytdID0gbmV3SXRlbTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbmV3RGF0YTtcblx0fVxuXHRwcm90ZWN0ZWQgX29uQ2hhbmdlKHN0YXR1czogU3RhdHVzZXMsIGlkOiBJZCwgb2JqOiBhbnkpOiB2b2lkIHtcblx0XHRmb3IgKGxldCBpdGVtIG9mIHRoaXMuX2NoYW5nZXMub3JkZXIpIHtcblx0XHRcdC8vIHVwZGF0ZSBwZW5kaW5nIGl0ZW0gaWYgcHJldmlvdXMgc3RhdGUgaXMgXCJzYXZpbmdcIiBvciBpZiBpdGVtIG5vdCBzYXZlZCB5ZXRcblx0XHRcdGlmIChpdGVtLmlkID09PSBpZCAmJiAhaXRlbS5zYXZpbmcpIHtcblx0XHRcdFx0Ly8gdXBkYXRlIGl0ZW1cblx0XHRcdFx0aWYgKGl0ZW0uZXJyb3IpIHtcblx0XHRcdFx0XHRpdGVtLmVycm9yID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXRlbSA9IHsgLi4uaXRlbSwgb2JqLCBzdGF0dXMgfTtcblxuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlLCBbaWQsIHN0YXR1cywgb2JqXSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fY2hhbmdlcy5vcmRlci5wdXNoKHsgaWQsIHN0YXR1cywgb2JqOnsgLi4ub2JqfSwgc2F2aW5nOiBmYWxzZSB9KTtcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlLCBbaWQsIHN0YXR1cywgb2JqXSk7XG5cdH1cblx0cHJvdGVjdGVkIF9hZGRUb09yZGVyKGFycmF5OiBhbnlbXSwgb2JqOiBhbnksIGluZGV4PzogbnVtYmVyKSB7XG5cdFx0aWYgKGluZGV4ID49IDAgJiYgYXJyYXlbaW5kZXhdKSB7XG5cdFx0XHR0aGlzLl9wdWxsW29iai5pZF0gPSBvYmo7XG5cdFx0XHRhcnJheS5zcGxpY2UoaW5kZXgsIDAsIG9iaik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcblx0XHRcdGFycmF5LnB1c2gob2JqKTtcblx0XHR9XG5cdH1cbn0iLCJpbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiB9IGZyb20gXCIuLy4uL2RhdGFjb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBkaHhFcnJvciwgZGh4V2FybmluZywgaXNFcXVhbE9iaiwgdG9EYXRhRHJpdmVyIH0gZnJvbSBcIi4vLi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSWQsIElEYXRhRHJpdmVyLCBJRGF0YVByb3h5IH0gZnJvbSBcIi4vLi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIExvYWRlciB7XG5cdHByaXZhdGUgX3BhcmVudDogRGF0YUNvbGxlY3Rpb247XG5cdHByaXZhdGUgX3NhdmluZzogYm9vbGVhbjtcblx0cHJpdmF0ZSBfY2hhbmdlczogYW55O1xuXHRjb25zdHJ1Y3RvcihwYXJlbnQ6IERhdGFDb2xsZWN0aW9uLCBjaGFuZ2VzOiBhbnkpIHtcblx0XHR0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG5cdFx0dGhpcy5fY2hhbmdlcyA9IGNoYW5nZXM7Ly8gdG9kbzogW2RpcnR5XSBtdXRhdGlvblxuXHR9XG5cdGxvYWQodXJsOiBJRGF0YVByb3h5LCBkcml2ZXI/OiBJRGF0YURyaXZlcik6IFByb21pc2U8YW55PiB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhcmVudC5sb2FkRGF0YSA9IHVybC5sb2FkKCkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0dGhpcy5fcGFyZW50LnJlbW92ZUFsbCgpO1xuXHRcdFx0dGhpcy5wYXJzZShkYXRhLCBkcml2ZXIpO1xuXHRcdH0pO1xuXHR9XG5cdHBhcnNlKGRhdGE6IGFueVtdLCBkcml2ZXI6IGFueSA9IFwianNvblwiKTogdm9pZCB7XG5cdFx0ZHJpdmVyID0gdG9EYXRhRHJpdmVyKGRyaXZlcik7XG5cdFx0ZGF0YSA9IGRyaXZlci50b0pzb25BcnJheShkYXRhKTtcblx0XHR0aGlzLl9wYXJlbnQuJHBhcnNlKGRhdGEpO1xuXHR9XG5cblx0c2F2ZSh1cmw6IElEYXRhUHJveHkpIHtcblx0XHRmb3IgKGNvbnN0IGVsIG9mIHRoaXMuX2NoYW5nZXMub3JkZXIpIHtcblx0XHRcdGlmIChlbC5zYXZpbmcgfHwgZWwucGVuZGluZykge1xuXHRcdFx0XHRkaHhXYXJuaW5nKFwiaXRlbSBpcyBzYXZpbmdcIik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBwcmV2RWwgPSB0aGlzLl9maW5kUHJldlN0YXRlKGVsLmlkKTtcblxuXHRcdFx0XHRpZiAocHJldkVsICYmIHByZXZFbC5zYXZpbmcpIHtcblx0XHRcdFx0XHRjb25zdCBwZW5kaW5nID0gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG5cdFx0XHRcdFx0XHRwcmV2RWwucHJvbWlzZS50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0ZWwucGVuZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRyZXModGhpcy5fc2V0UHJvbWlzZShlbCwgdXJsKSk7XG5cdFx0XHRcdFx0XHR9KS5jYXRjaChlcnIgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9yZW1vdmVGcm9tT3JkZXIocHJldkVsKTtcblx0XHRcdFx0XHRcdFx0dGhpcy5fc2V0UHJvbWlzZShlbCwgdXJsKTtcblx0XHRcdFx0XHRcdFx0ZGh4V2FybmluZyhlcnIpO1xuXHRcdFx0XHRcdFx0XHRyZWooZXJyKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMuX2FkZFRvQ2hhaW4ocGVuZGluZyk7XG5cdFx0XHRcdFx0ZWwucGVuZGluZyA9IHRydWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc2V0UHJvbWlzZShlbCwgdXJsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9wYXJlbnQuc2F2ZURhdGEudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLl9zYXZpbmcgPSBmYWxzZTtcblx0XHR9KTtcblx0fVxuXHRwcml2YXRlIF9zZXRQcm9taXNlKGVsLCB1cmwpOiBQcm9taXNlPGFueT4ge1xuXHRcdGVsLnByb21pc2UgPSB1cmwuc2F2ZShlbC5vYmosIGVsLnN0YXR1cyk7XG5cdFx0ZWwucHJvbWlzZS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuX3JlbW92ZUZyb21PcmRlcihlbCk7XG5cdFx0fSkuY2F0Y2goZXJyID0+IHtcblx0XHRcdGVsLnNhdmluZyA9IGZhbHNlO1xuXHRcdFx0ZWwuZXJyb3IgPSB0cnVlO1xuXHRcdFx0ZGh4RXJyb3IoZXJyKTtcblx0XHR9KTtcblx0XHRlbC5zYXZpbmcgPSB0cnVlO1xuXHRcdHRoaXMuX3NhdmluZyA9IHRydWU7XG5cdFx0dGhpcy5fYWRkVG9DaGFpbihlbC5wcm9taXNlKTtcblx0XHRyZXR1cm4gZWwucHJvbWlzZTtcblx0fVxuXHRwcml2YXRlIF9hZGRUb0NoYWluKHByb21pc2UpOiB2b2lkIHtcblx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6cHJlZmVyLWNvbmRpdGlvbmFsLWV4cHJlc3Npb25cblx0XHRpZiAodGhpcy5fcGFyZW50LnNhdmVEYXRhICYmIHRoaXMuX3NhdmluZykge1xuXHRcdFx0dGhpcy5fcGFyZW50LnNhdmVEYXRhID0gdGhpcy5fcGFyZW50LnNhdmVEYXRhLnRoZW4oKCkgPT4gcHJvbWlzZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX3BhcmVudC5zYXZlRGF0YSA9IHByb21pc2U7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2ZpbmRQcmV2U3RhdGUoaWQ6IElkKTogYW55IHtcblx0XHRmb3IgKGNvbnN0IGVsIG9mIHRoaXMuX2NoYW5nZXMub3JkZXIpIHtcblx0XHRcdGlmIChlbC5pZCA9PT0gaWQpIHtcblx0XHRcdFx0cmV0dXJuIGVsO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRwcml2YXRlIF9yZW1vdmVGcm9tT3JkZXIoZWwpIHtcblx0XHR0aGlzLl9jaGFuZ2VzLm9yZGVyID0gdGhpcy5fY2hhbmdlcy5vcmRlci5maWx0ZXIoaXRlbSA9PiAhaXNFcXVhbE9iaihpdGVtLCBlbCkpO1xuXHR9XG59IiwiaW1wb3J0IHsgbmF0dXJhbENvbXBhcmUgfSBmcm9tIFwiLi8uLi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBJRGlyLCBJU29ydE1vZGUgfSBmcm9tIFwiLi8uLi90eXBlc1wiO1xuXG50eXBlIENoYW5nZVN0cmluZyA9IChhOiBzdHJpbmcpID0+IHN0cmluZyB8IG51bWJlcjtcblxuZXhwb3J0IGNsYXNzIFNvcnQge1xuXHRzb3J0KGFycmF5OiBhbnlbXSwgYnk6IElTb3J0TW9kZSkge1xuXHRcdGlmIChieS5ydWxlICYmIHR5cGVvZiBieS5ydWxlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHRoaXMuX3NvcnQoYXJyYXksIGJ5KTtcblx0XHR9IGVsc2UgaWYgKGJ5LmJ5KSB7XG5cdFx0XHRieS5ydWxlID0gKGE6IGFueSwgYjogYW55KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGFhID0gdGhpcy5fY2hlY2tWYWwoYnkuYXMsIGFbYnkuYnldKTtcblx0XHRcdFx0Y29uc3QgYmIgPSB0aGlzLl9jaGVja1ZhbChieS5hcywgYltieS5ieV0pO1xuXHRcdFx0XHRyZXR1cm4gbmF0dXJhbENvbXBhcmUoYWEudG9TdHJpbmcoKSwgYmIudG9TdHJpbmcoKSk7ICAvLyBkaWRudCB3b3JrIHdpdGggbnVtYmVyc1xuXHRcdFx0fTtcblx0XHRcdHRoaXMuX3NvcnQoYXJyYXksIGJ5KTtcblx0XHR9XG5cblx0fVxuXHRwcml2YXRlIF9jaGVja1ZhbChtZXRob2Q6IENoYW5nZVN0cmluZywgdmFsOiBzdHJpbmcgfCBudW1iZXIpIHtcblx0XHRyZXR1cm4gbWV0aG9kID8gbWV0aG9kLmNhbGwodGhpcywgdmFsKSA6IHZhbDtcblx0fVxuXHRwcml2YXRlIF9zb3J0KGFycjogYW55W10sIGNvbmY6IElTb3J0TW9kZSk6IGFueVtdIHtcblx0XHRjb25zdCBkaXI6IElEaXIgPSB7XG5cdFx0XHRhc2M6IDEsXG5cdFx0XHRkZXNjOiAtMVxuXHRcdH07XG5cdFx0cmV0dXJuIGFyci5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xuXHRcdFx0cmV0dXJuIGNvbmYucnVsZS5jYWxsKHRoaXMsIGEsIGIpICogKGRpcltjb25mLmRpcl0gfHwgZGlyLmFzYyk7XG5cdFx0fSk7XG5cdH1cbn0iLCJpbXBvcnQgeyBJRGF0YVByb3h5IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIERhdGFQcm94eSBpbXBsZW1lbnRzIElEYXRhUHJveHkge1xuXHRwdWJsaWMgdXJsOiBzdHJpbmc7XG5cdGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XG5cdFx0dGhpcy51cmwgPSB1cmw7XG5cdH1cblx0bG9hZDxUPXN0cmluZz4oKTogUHJvbWlzZTxUPiB7XG5cdFx0cmV0dXJuIHRoaXMuX2FqYXgodGhpcy51cmwpO1xuXHR9XG5cdHNhdmUoZGF0YTogYW55LCBtb2RlOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuXHRcdGNvbnN0IG1vZGVzID0ge1xuXHRcdFx0aW5zZXJ0OiBcIlBPU1RcIixcblx0XHRcdGRlbGV0ZTogXCJERUxFVEVcIixcblx0XHRcdHVwZGF0ZTogXCJQT1NUXCJcblx0XHR9IGFzIGFueTtcblx0XHRyZXR1cm4gdGhpcy5fYWpheCh0aGlzLnVybCwgZGF0YSwgbW9kZXNbbW9kZV0gfHwgXCJQT1NUXCIpO1xuXHR9XG5cdHByaXZhdGUgX2FqYXgodXJsOiBzdHJpbmcsIGRhdGE/OiBhbnksIG1ldGhvZDogc3RyaW5nID0gXCJHRVRcIik6IFByb21pc2U8YW55PiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG5cdFx0XHR4aHIub25sb2FkID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDMwMCkge1xuXHRcdFx0XHRcdHJlc29sdmUoeGhyLnJlc3BvbnNlIHx8IHhoci5yZXNwb25zZVRleHQpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJlamVjdCh7XG5cdFx0XHRcdFx0XHRzdGF0dXM6IHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0XHRzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdFx0eGhyLm9uZXJyb3IgPSAoKSA9PiB7XG5cdFx0XHRcdHJlamVjdCh7XG5cdFx0XHRcdFx0c3RhdHVzOiB4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHRcdH0pO1xuXHRcdFx0fTtcblx0XHRcdHhoci5vcGVuKG1ldGhvZCwgdXJsKTtcblx0XHRcdHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcblx0XHRcdHN3aXRjaCAobWV0aG9kKSB7XG5cdFx0XHRcdGNhc2UgXCJQT1NUXCI6XG5cdFx0XHRcdGNhc2UgXCJERUxFVEVcIjpcblx0XHRcdFx0Y2FzZSBcIlBVVFwiOlxuXHRcdFx0XHRcdHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIkdFVFwiOlxuXHRcdFx0XHRcdHhoci5zZW5kKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0eGhyLnNlbmQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSIsImltcG9ydCB7IElEYXRhRHJpdmVyIH0gZnJvbSBcIi4vLi4vdHlwZXNcIjtcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcbmV4cG9ydCBpbnRlcmZhY2UgSUNzdkRyaXZlckNvbmZpZyB7XG5cdHNraXBIZWFkZXI/OiBudW1iZXI7XG5cdG5hbWVCeUhlYWRlcj86IGJvb2xlYW47XG5cdG5hbWVzPzogc3RyaW5nW107XG5cdHJvdz86IHN0cmluZztcblx0Y29sdW1uPzogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBJQ3N2RHJpdmVyIGV4dGVuZHMgSURhdGFEcml2ZXIge1xuXHRnZXRGaWVsZHMoZGF0YTogc3RyaW5nLCBoZWFkZXJzPzogc3RyaW5nW10pO1xufVxuZXhwb3J0IGNsYXNzIENzdkRyaXZlciBpbXBsZW1lbnRzIElDc3ZEcml2ZXIge1xuXHRwdWJsaWMgY29uZmlnOiBJQ3N2RHJpdmVyQ29uZmlnO1xuXG5cdGNvbnN0cnVjdG9yKGNvbmZpZzogSUNzdkRyaXZlckNvbmZpZyA9IHt9KSB7XG5cblx0XHRjb25zdCBpbml0Q29uZmlnID0ge1xuXHRcdFx0c2tpcEhlYWRlcjogMCxcblx0XHRcdG5hbWVCeUhlYWRlcjogZmFsc2UsXG5cdFx0XHRyb3c6IFwiXFxuXCIsXG5cdFx0XHRjb2x1bW46IFwiLFwiLFxuXHRcdH07XG5cblx0XHR0aGlzLmNvbmZpZyA9IHsgLi4uaW5pdENvbmZpZywgLi4uY29uZmlnIH07XG5cblx0XHRpZiAodGhpcy5jb25maWcubmFtZUJ5SGVhZGVyKSB7XG5cdFx0XHR0aGlzLmNvbmZpZy5za2lwSGVhZGVyID0gMTtcblx0XHR9XG5cdH1cblxuXHRnZXRGaWVsZHMocm93OiBzdHJpbmcsIGhlYWRlcnM/OiBzdHJpbmdbXSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuXHRcdGNvbnN0IHBhcnRzID0gcm93LnRyaW0oKS5zcGxpdCh0aGlzLmNvbmZpZy5jb2x1bW4pO1xuXG5cdFx0Y29uc3Qgb2JqID0ge307XG5cdFx0Zm9yIChsZXQgaSA9IDA7aSA8IHBhcnRzLmxlbmd0aDtpKyspIHtcblx0XHRcdG9ialtoZWFkZXJzID8gaGVhZGVyc1tpXSA6IGkgKyAxXSA9IHBhcnRzW2ldO1xuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH1cblx0Z2V0Um93cyhkYXRhOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG5cdFx0cmV0dXJuIGRhdGEudHJpbSgpLnNwbGl0KHRoaXMuY29uZmlnLnJvdyk7XG5cdH1cblx0dG9Kc29uQXJyYXkoZGF0YTogc3RyaW5nKTogYW55W10ge1xuXHRcdGNvbnN0IHJvd3MgPSB0aGlzLmdldFJvd3MoZGF0YSk7XG5cdFx0bGV0IG5hbWVzID0gdGhpcy5jb25maWcubmFtZXM7XG5cblx0XHRpZiAodGhpcy5jb25maWcuc2tpcEhlYWRlcikge1xuXHRcdFx0Y29uc3QgdG9wID0gcm93cy5zcGxpY2UoMCwgdGhpcy5jb25maWcuc2tpcEhlYWRlcik7XG5cdFx0XHRpZiAodGhpcy5jb25maWcubmFtZUJ5SGVhZGVyKSB7XG5cdFx0XHRcdG5hbWVzID0gdG9wWzBdLnRyaW0oKS5zcGxpdCh0aGlzLmNvbmZpZy5jb2x1bW4pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcm93cy5tYXAocm93ID0+IHRoaXMuZ2V0RmllbGRzKHJvdywgbmFtZXMpKTtcblx0fVxuXHRzZXJpYWxpemUoZGF0YTogSUFueU9ialtdKTogc3RyaW5nIHtcblx0XHRjb25zdCBoZWFkZXIgPSBkYXRhWzBdID8gT2JqZWN0LmtleXMoZGF0YVswXSkuZmlsdGVyKGtleSA9PiBrZXlbMF0gIT09IFwiJFwiKS5qb2luKFwiLFwiKSA6IFwiXCI7XG5cdFx0cmV0dXJuIGhlYWRlciArIHRoaXMuX3NlcmlhbGl6ZShkYXRhKTtcblx0fVxuXHRwcml2YXRlIF9zZXJpYWxpemUoZGF0YTogSUFueU9ialtdKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gZGF0YS5yZWR1Y2UoKGNzdiwgcm93KSA9PiB7XG5cdFx0XHRjb25zdCBjZWxscyA9IE9iamVjdC5rZXlzKHJvdykucmVkdWNlKCh0b3RhbCwga2V5LCBpKSA9PiB7XG5cdFx0XHRcdGlmIChrZXlbMF0gPT09IFwiJFwiIHx8IGtleSA9PT0gXCJpdGVtc1wiKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRvdGFsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBgJHt0b3RhbH0ke3Jvd1trZXldfSR7aSA9PT0gcm93Lmxlbmd0aCAtIDEgPyBcIlwiIDogXCIsXCJ9YDtcblx0XHRcdH0sIFwiXCIpO1xuXHRcdFx0aWYgKHJvdy5pdGVtcykge1xuXHRcdFx0XHRyZXR1cm4gYCR7Y3N2fVxcbiR7Y2VsbHN9JHt0aGlzLl9zZXJpYWxpemUocm93Lml0ZW1zKX1gO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGAke2Nzdn1cXG4ke2NlbGxzfWA7XG5cdFx0fSwgXCJcIik7XG5cdH1cbn0iLCJpbXBvcnQgeyBJRGF0YURyaXZlciB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgSnNvbkRyaXZlciBpbXBsZW1lbnRzIElEYXRhRHJpdmVyIHtcblx0dG9Kc29uQXJyYXkoZGF0YTogYW55KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Um93cyhkYXRhKTtcblx0fVxuXHRzZXJpYWxpemUoZGF0YTogSUFueU9ialtdKTogSUFueU9ialtdIHtcblx0XHRyZXR1cm4gZGF0YTtcblx0fVxuXHRnZXRGaWVsZHMocm93OiBhbnkpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcblx0XHRyZXR1cm4gcm93O1xuXHR9XG5cdGdldFJvd3MoZGF0YTogc3RyaW5nKTogYW55W10ge1xuXHRcdHJldHVybiB0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIiA/IEpTT04ucGFyc2UoZGF0YSkgOiBkYXRhO1xuXHR9XG59IiwiaW1wb3J0IHsgSURhdGFEcml2ZXIgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IGpzb25Ub1hNTCB9IGZyb20gXCIuLy4uL3NlcmlhbGl6ZXJzL3htbFwiO1xuXG5jb25zdCBBUlJBWV9OQU1FID0gXCJpdGVtc1wiO1xuY29uc3QgSVRFTV9OQU1FID0gXCJpdGVtXCI7XG5cbmV4cG9ydCBjbGFzcyBYTUxEcml2ZXIgaW1wbGVtZW50cyBJRGF0YURyaXZlciB7XG5cdHRvSnNvbkFycmF5KGRhdGE6IGFueSkge1xuXHRcdHJldHVybiB0aGlzLmdldFJvd3MoZGF0YSk7XG5cdH1cblx0c2VyaWFsaXplKGRhdGE6IElBbnlPYmpbXSkge1xuXHRcdHJldHVybiBqc29uVG9YTUwoZGF0YSk7XG5cdH1cblx0Z2V0RmllbGRzKHJvdzogYW55KTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG5cdFx0cmV0dXJuIHJvdztcblx0fVxuXHRnZXRSb3dzKGRhdGE6IERvY3VtZW50IHwgc3RyaW5nKTogYW55W10ge1xuXHRcdGlmICh0eXBlb2YgZGF0YSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0ZGF0YSA9IHRoaXMuX2Zyb21TdHJpbmcoZGF0YSk7XG5cdFx0fVxuXHRcdGNvbnN0IGNoaWxkTm9kZXMgPSBkYXRhLmNoaWxkTm9kZXMgJiYgZGF0YS5jaGlsZE5vZGVzWzBdICYmIGRhdGEuY2hpbGROb2Rlc1swXS5jaGlsZE5vZGVzO1xuXHRcdGlmICghY2hpbGROb2RlcyB8fCAhY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZ2V0Um93cyhjaGlsZE5vZGVzKTtcblx0fVxuXG5cdHByaXZhdGUgX2dldFJvd3Mobm9kZXM6IE5vZGVMaXN0T2Y8Q2hpbGROb2RlPik6IGFueVtdIHtcblx0XHRjb25zdCByZXN1bHQgPSBbXTtcblx0XHRmb3IgKGxldCBpID0gMDtpIDwgbm9kZXMubGVuZ3RoO2krKykge1xuXHRcdFx0aWYgKChub2Rlc1tpXSBhcyBIVE1MRWxlbWVudCkudGFnTmFtZSA9PT0gSVRFTV9OQU1FKSB7XG5cdFx0XHRcdHJlc3VsdC5wdXNoKHRoaXMuX25vZGVUb0pTKG5vZGVzW2ldIGFzIEhUTUxFbGVtZW50KSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfZnJvbVN0cmluZyhkYXRhOiBzdHJpbmcpOiBEb2N1bWVudCB7XG5cdFx0cmV0dXJuIChuZXcgRE9NUGFyc2VyKCkpLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBcInRleHQveG1sXCIpO1xuXHR9XG5cblx0cHJpdmF0ZSBfbm9kZVRvSlMobm9kZTogSFRNTEVsZW1lbnQpIHtcblx0XHRjb25zdCByZXN1bHQ6IElBbnlPYmogPSB7fTtcblxuXHRcdGlmICh0aGlzLl9oYXZlQXR0cnMobm9kZSkpIHtcblx0XHRcdGNvbnN0IGF0dHJzID0gbm9kZS5hdHRyaWJ1dGVzO1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7aSA8IGF0dHJzLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0Y29uc3QgeyBuYW1lLCB2YWx1ZSB9ID0gYXR0cnNbaV07XG5cdFx0XHRcdHJlc3VsdFtuYW1lXSA9IHRoaXMuX3RvVHlwZSh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChub2RlLm5vZGVUeXBlID09PSAzKSB7XG5cdFx0XHRyZXN1bHQudmFsdWUgPSByZXN1bHQudmFsdWUgfHwgdGhpcy5fdG9UeXBlKG5vZGUudGV4dENvbnRlbnQpO1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cblx0XHRjb25zdCBjaGlsZE5vZGVzID0gbm9kZS5jaGlsZE5vZGVzO1xuXHRcdGlmIChjaGlsZE5vZGVzKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDtpIDwgY2hpbGROb2Rlcy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdGNvbnN0IHN1Yk5vZGUgPSBjaGlsZE5vZGVzW2ldIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0XHRjb25zdCB0YWcgPSBzdWJOb2RlLnRhZ05hbWU7XG5cdFx0XHRcdGlmICghdGFnKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKHRhZyA9PT0gQVJSQVlfTkFNRSAmJiBzdWJOb2RlLmNoaWxkTm9kZXMpIHtcblx0XHRcdFx0XHRyZXN1bHRbdGFnXSA9IHRoaXMuX2dldFJvd3Moc3ViTm9kZS5jaGlsZE5vZGVzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRpZiAodGhpcy5faGF2ZUF0dHJzKHN1Yk5vZGUpKSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRbdGFnXSA9IHRoaXMuX25vZGVUb0pTKHN1Yk5vZGUpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRyZXN1bHRbdGFnXSA9IHRoaXMuX3RvVHlwZShzdWJOb2RlLnRleHRDb250ZW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX3RvVHlwZSh2YWw6IGFueSkge1xuXHRcdGlmICh2YWwgPT09IFwiZmFsc2VcIiB8fCB2YWwgPT09IFwidHJ1ZVwiKSB7XG5cdFx0XHRyZXR1cm4gdmFsID09PSBcInRydWVcIjtcblx0XHR9XG5cdFx0aWYgKCFpc05hTih2YWwpKSB7XG5cdFx0XHRyZXR1cm4gTnVtYmVyKHZhbCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXHRwcml2YXRlIF9oYXZlQXR0cnMobm9kZTogSFRNTEVsZW1lbnQpIHtcblx0XHRyZXR1cm4gbm9kZS5hdHRyaWJ1dGVzICYmIG5vZGUuYXR0cmlidXRlcy5sZW5ndGg7XG5cdH1cbn0iLCJpbXBvcnQgeyBKc29uRHJpdmVyIH0gZnJvbSBcIi4vSnNvbkRyaXZlclwiO1xyXG5pbXBvcnQgeyBDc3ZEcml2ZXIgfSBmcm9tIFwiLi9Dc3ZEcml2ZXJcIjtcclxuaW1wb3J0IHsgWE1MRHJpdmVyIH0gZnJvbSBcIi4vWE1MRHJpdmVyXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZGF0YURyaXZlcnMgPSB7XHJcblx0anNvbjogSnNvbkRyaXZlcixcclxuXHRjc3Y6IENzdkRyaXZlclxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGFEcml2ZXJzUHJvID0ge1xyXG5cdC4uLmRhdGFEcml2ZXJzLFxyXG5cdHhtbDogWE1MRHJpdmVyXHJcbn07IiwiZXhwb3J0IHsgRGF0YUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvblwiO1xuZXhwb3J0IHsgVHJlZUNvbGxlY3Rpb24gfSBmcm9tIFwiLi90cmVlY29sbGVjdGlvblwiOyIsImltcG9ydCB7IERhdGFQcm94eSB9IGZyb20gXCIuL2RhdGFwcm94eVwiO1xuaW1wb3J0IHsgSUZpbHRlckNhbGxiYWNrLCBJRmlsdGVyTW9kZSwgSURhdGFDb2xsZWN0aW9uLCBJVHJlZUNvbGxlY3Rpb24sIERhdGFEcml2ZXIsIElEYXRhRHJpdmVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsgZGF0YURyaXZlcnMgfSBmcm9tIFwiLi9kcml2ZXJzL2RyaXZlcnNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWxPYmooYTogYW55LCBiOiBhbnkpIHtcblx0Zm9yIChjb25zdCBrZXkgaW4gYSkge1xuXHRcdGlmIChhW2tleV0gIT09IGJba2V5XSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsQ29tcGFyZShhLCBiKSB7XG5cdGNvbnN0IGF4ID0gW107XG5cdGNvbnN0IGJ4ID0gW107XG5cblx0YS5yZXBsYWNlKC8oXFxkKyl8KFxcRCspL2csIChfLCAkMSwgJDIpID0+IHsgYXgucHVzaChbJDEgfHwgSW5maW5pdHksICQyIHx8IFwiXCJdKTsgfSk7XG5cdGIucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7IGJ4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCBcIlwiXSk7IH0pO1xuXG5cdHdoaWxlIChheC5sZW5ndGggJiYgYngubGVuZ3RoKSB7XG5cdFx0Y29uc3QgYW4gPSBheC5zaGlmdCgpO1xuXHRcdGNvbnN0IGJuID0gYnguc2hpZnQoKTtcblx0XHRjb25zdCBubiA9IChhblswXSAtIGJuWzBdKSB8fCBhblsxXS5sb2NhbGVDb21wYXJlKGJuWzFdKTtcblx0XHRpZiAobm4pIHtcblx0XHRcdHJldHVybiBubjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYXgubGVuZ3RoIC0gYngubGVuZ3RoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5Q29uZihpdGVtOiBhbnksIGNvbmY6IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrKTogYW55IHtcblx0aWYgKHR5cGVvZiBjb25mID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRpZiAoY29uZi5jYWxsKHRoaXMsIGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoY29uZi5ieSAmJiBjb25mLm1hdGNoKSB7XG5cdFx0aWYgKGl0ZW1bY29uZi5ieV0gPT09IGNvbmYubWF0Y2gpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWJ1ZygpOiBib29sZWFuIHtcblx0Y29uc3QgZGh4ID0gKHdpbmRvdyBhcyBhbnkpLmRoeDtcblx0aWYgKHR5cGVvZiBkaHggIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRyZXR1cm4gdHlwZW9mIChkaHguZGVidWcpICE9PSBcInVuZGVmaW5lZFwiICYmIGRoeC5kZWJ1Zztcblx0fVxuXHQvLyByZXR1cm4gdHlwZW9mIERIWF9ERUJVR19NT0RFICE9PSBcInVuZGVmaW5lZFwiICYmIERIWF9ERUJVR19NT0RFO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRoeFdhcm5pbmcobXNnOiBzdHJpbmcpIHtcblx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcblx0Y29uc29sZS53YXJuKG1zZyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGh4RXJyb3IobXNnOiBzdHJpbmcpIHtcblx0dGhyb3cgbmV3IEVycm9yKG1zZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1Byb3h5KHByb3h5OiBhbnkpOiBEYXRhUHJveHkge1xuXHRjb25zdCB0eXBlID0gdHlwZW9mIHByb3h5O1xuXG5cdGlmICh0eXBlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIG5ldyBEYXRhUHJveHkocHJveHkpO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcblx0XHRyZXR1cm4gcHJveHk7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGFEcml2ZXIoZHJpdmVyOiBEYXRhRHJpdmVyIHwgSURhdGFEcml2ZXIpIHtcblx0aWYgKHR5cGVvZiBkcml2ZXIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRjb25zdCBkaHggPSAod2luZG93IGFzIGFueSkuZGh4O1xuXHRcdGNvbnN0IGRyaXZlcnMgPSAoZGh4ICYmIGRoeC5kYXRhRHJpdmVycykgfHwgZGF0YURyaXZlcnM7XG5cblx0XHRpZiAoZHJpdmVyc1tkcml2ZXJdKSB7XG5cdFx0XHRyZXR1cm4gbmV3IGRyaXZlcnNbZHJpdmVyXSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS53YXJuKFwiSW5jb3JyZWN0IGRhdGEgZHJpdmVyIHR5cGU6XCIsIGRyaXZlcik7XG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS53YXJuKFwiQXZhaWxhYmxlIHR5cGVzOlwiLCBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhkcml2ZXJzKSkpO1xuXHRcdH1cblx0fSBlbHNlIGlmICh0eXBlb2YgZHJpdmVyID09PSBcIm9iamVjdFwiKSB7XG5cdFx0cmV0dXJuIGRyaXZlcjtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVdpdGhvdXRJbm5lcihvYmo6IElBbnlPYmosIGZvcmJpZGRlbj86IElBbnlPYmopOiBJQW55T2JqIHtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuXHRcdGlmIChrZXlbMF0gIT09IFwiJFwiICYmICghZm9yYmlkZGVuIHx8ICFmb3JiaWRkZW5ba2V5XSkpIHtcblx0XHRcdHJlc3VsdFtrZXldID0gb2JqW2tleV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RyZWVDb2xsZWN0aW9uKG9iajogSURhdGFDb2xsZWN0aW9uPGFueT4gfCBJVHJlZUNvbGxlY3Rpb248YW55Pik6IG9iaiBpcyBJVHJlZUNvbGxlY3Rpb248YW55PiB7XG5cdHJldHVybiBCb29sZWFuKChvYmogYXMgSVRyZWVDb2xsZWN0aW9uKS5nZXRSb290KTtcbn0iLCJpbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5cbmNvbnN0IElOREVOVF9TVEVQID0gNDtcblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25Ub1hNTChkYXRhOiBJQW55T2JqW10sIHJvb3QgPSBcInJvb3RcIik6IHN0cmluZyB7XG5cdGxldCByZXN1bHQgPSBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiaXNvLTg4NTktMVwiPz5cXG48JHtyb290fT5gO1xuXHRmb3IgKGxldCBpPTA7IGk8ZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdHJlc3VsdCArPSBcIlxcblwiICsgaXRlbVRvWE1MKGRhdGFbaV0pO1xuXHR9XG5cdHJldHVybiByZXN1bHQgKyBgXFxuPC8ke3Jvb3R9PmA7XG59XG5cbmZ1bmN0aW9uIHdzKGNvdW50OiBudW1iZXIpIHtcblx0cmV0dXJuIFwiIFwiLnJlcGVhdChjb3VudCk7XG59XG5mdW5jdGlvbiBpdGVtVG9YTUwoaXRlbTogSUFueU9iaiwgaW5kZW50OiBudW1iZXIgPSBJTkRFTlRfU1RFUCkge1xuXHRsZXQgcmVzdWx0ID0gd3MoaW5kZW50KSArIFwiPGl0ZW0+XFxuXCI7XG5cdGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcblx0XHRpZiAoQXJyYXkuaXNBcnJheShpdGVtW2tleV0pKSB7XG5cdFx0XHRyZXN1bHQgKz0gd3MoaW5kZW50ICsgSU5ERU5UX1NURVApICsgYDwke2tleX0+XFxuYDtcblx0XHRcdHJlc3VsdCArPSBpdGVtW2tleV0ubWFwKChzdWJJdGVtOiBJQW55T2JqKSA9PiBpdGVtVG9YTUwoc3ViSXRlbSwgaW5kZW50ICsgSU5ERU5UX1NURVAgKiAyKSkuam9pbihcIlxcblwiKSArIFwiXFxuXCI7XG5cdFx0XHRyZXN1bHQgKz0gd3MoaW5kZW50ICsgSU5ERU5UX1NURVApICsgYDwvJHtrZXl9PlxcbmA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCArPSB3cyhpbmRlbnQgKyBJTkRFTlRfU1RFUCkgKyBgPCR7a2V5fT4ke2l0ZW1ba2V5XX08LyR7a2V5fT5cXG5gO1xuXHRcdH1cblx0fVxuXHRyZXN1bHQgKz0gd3MoaW5kZW50KSArIFwiPC9pdGVtPlwiO1xuXHRyZXR1cm4gcmVzdWx0O1xufVxuIiwiaW1wb3J0IHsgZmluZEluZGV4LCB1aWQgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vY29yZVwiO1xuaW1wb3J0IHsgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgRGF0YVByb3h5IH0gZnJvbSBcIi4vZGF0YXByb3h5XCI7XG5pbXBvcnQgeyB0b0RhdGFEcml2ZXIsIGlzVHJlZUNvbGxlY3Rpb24sIGNvcHlXaXRob3V0SW5uZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBEYXRhQ2FsbGJhY2ssIERhdGFFdmVudHMsIElkLCBJRGF0YUNvbGxlY3Rpb24sIElEYXRhSXRlbSwgSVRyZWVDb2xsZWN0aW9uLCBUcmVlRmlsdGVyVHlwZSwgSUZpbHRlckNhbGxiYWNrLCBJRmlsdGVyTW9kZSwgSVRyZWVGaWx0ZXJDb25maWcsIERhdGFEcml2ZXIgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuXG5mdW5jdGlvbiBhZGRUb09yZGVyKHN0b3JlOiBhbnksIG9iajogb2JqZWN0LCBwYXJlbnQ6IElkLCBpbmRleDogbnVtYmVyKSB7XG5cdGlmIChpbmRleCAhPT0gdW5kZWZpbmVkICYmIGluZGV4ICE9PSAtMSAmJiBzdG9yZVtwYXJlbnRdICYmIHN0b3JlW3BhcmVudF1baW5kZXhdKSB7XG5cdFx0c3RvcmVbcGFyZW50XS5zcGxpY2UoaW5kZXgsIDAsIG9iaik7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKCFzdG9yZVtwYXJlbnRdKSB7XG5cdFx0XHRzdG9yZVtwYXJlbnRdID0gW107XG5cdFx0fVxuXHRcdHN0b3JlW3BhcmVudF0ucHVzaChvYmopO1xuXHR9XG59XG5cblxuZXhwb3J0IGNsYXNzIFRyZWVDb2xsZWN0aW9uPFQgZXh0ZW5kcyBJRGF0YUl0ZW0gPSBJRGF0YUl0ZW0+IGV4dGVuZHMgRGF0YUNvbGxlY3Rpb248VD4gaW1wbGVtZW50cyBJVHJlZUNvbGxlY3Rpb248VD4ge1xuXG5cdHByb3RlY3RlZCBfY2hpbGRzOiB7IFtpZDogc3RyaW5nXTogVFtdIH07XG5cdHByb3RlY3RlZCBfcm9vdDogSWQ7XG5cblx0cHJpdmF0ZSBfaW5pdENoaWxkczogeyBbaWQ6IHN0cmluZ106IFRbXSB9O1xuXG5cdGNvbnN0cnVjdG9yKGNvbmZpZz86IGFueSwgZXZlbnRzPzogSUV2ZW50U3lzdGVtPERhdGFFdmVudHM+KSB7XG5cdFx0c3VwZXIoY29uZmlnLCBldmVudHMpO1xuXHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9yb290ID0gXCJfUk9PVF9cIiArIHVpZCgpO1xuXHRcdHRoaXMuX2NoaWxkcyA9IHsgW3Jvb3RdOiBbXSB9O1xuXHRcdHRoaXMuX2luaXRDaGlsZHMgPSBudWxsO1xuXHR9XG5cdGFkZChvYmo6IGFueSwgaW5kZXg6IG51bWJlciA9IC0xLCBwYXJlbnQ6IElkID0gdGhpcy5fcm9vdCk6IHN0cmluZyB7XG5cdFx0aWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdG9iaiA9IHtcblx0XHRcdFx0dmFsdWU6IG9ialxuXHRcdFx0fTtcblx0XHR9XG5cdFx0b2JqLnBhcmVudCA9IG9iai5wYXJlbnQgPyBvYmoucGFyZW50LnRvU3RyaW5nKCkgOiBwYXJlbnQ7XG5cdFx0Y29uc3QgaWQgPSBzdXBlci5hZGQob2JqLCBpbmRleCk7XG5cblx0XHRpZiAoQXJyYXkuaXNBcnJheShvYmouaXRlbXMpKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGl0ZW0gb2Ygb2JqLml0ZW1zKSB7XG5cdFx0XHRcdHRoaXMuYWRkKGl0ZW0sIC0xLCBvYmouaWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0Z2V0Um9vdCgpOiBJZCB7XG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3Q7XG5cdH1cblx0Z2V0UGFyZW50KGlkOiBJZCwgYXNPYmo6IGJvb2xlYW4gPSBmYWxzZSk6IElkIHtcblx0XHRpZiAoIXRoaXMuX3B1bGxbaWRdKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5fcHVsbFtpZF0ucGFyZW50O1xuXHRcdHJldHVybiBhc09iaiA/IHRoaXMuX3B1bGxbcGFyZW50XSA6IHBhcmVudDtcblx0fVxuXHRnZXRJdGVtcyhpZDogSWQpOiBUW10ge1xuXHRcdGlmICh0aGlzLl9jaGlsZHMgJiYgdGhpcy5fY2hpbGRzW2lkXSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2NoaWxkc1tpZF07XG5cdFx0fVxuXHRcdHJldHVybiBbXTtcblx0fVxuXHRnZXRMZW5ndGgoaWQ6IElkID0gdGhpcy5fcm9vdCk6IG51bWJlciB7XG5cdFx0aWYgKCF0aGlzLl9jaGlsZHNbaWRdKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkc1tpZF0ubGVuZ3RoO1xuXHR9XG5cdHJlbW92ZUFsbChpZD86IElkKTogdm9pZCB7XG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRjb25zdCBjaGlsZHMgPSBbLi4uIHRoaXMuX2NoaWxkc1tpZF1dO1xuXHRcdFx0Zm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHMpIHtcblx0XHRcdFx0dGhpcy5yZW1vdmUoY2hpbGQuaWQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdXBlci5yZW1vdmVBbGwoKTtcblx0XHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9yb290O1xuXHRcdFx0dGhpcy5faW5pdENoaWxkcyA9IG51bGw7XG5cdFx0XHR0aGlzLl9jaGlsZHMgPSB7IFtyb290XTogW10gfTtcblx0XHR9XG5cdH1cblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyIHtcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudChpZCk7XG5cdFx0aWYgKCFwYXJlbnQgfHwgIXRoaXMuX2NoaWxkc1twYXJlbnRdKSB7XG5cdFx0XHRyZXR1cm4gLTE7XG5cdFx0fVxuXHRcdHJldHVybiBmaW5kSW5kZXgodGhpcy5fY2hpbGRzW3BhcmVudF0sIGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuXHR9XG5cdHNvcnQoY29uZj86IGFueSk6IHZvaWQge1xuXHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuX2NoaWxkcztcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBjaGlsZHMpIHtcblx0XHRcdHRoaXMuX3NvcnQuc29ydChjaGlsZHNba2V5XSwgY29uZik7XG5cdFx0fVxuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdH1cblx0bWFwKGNiOiBEYXRhQ2FsbGJhY2s8VD4sIHBhcmVudDogSWQgPSB0aGlzLl9yb290LCBkaXJlY3Q6IGJvb2xlYW4gPSB0cnVlKTogYW55W10ge1xuXHRcdGxldCByZXN1bHQ6IGFueVtdID0gW107XG5cdFx0aWYgKCF0aGlzLmhhdmVJdGVtcyhwYXJlbnQpKSB7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDtpIDwgdGhpcy5fY2hpbGRzW3BhcmVudF0ubGVuZ3RoO2krKykge1xuXHRcdFx0cmVzdWx0LnB1c2goY2IuY2FsbCh0aGlzLCB0aGlzLl9jaGlsZHNbcGFyZW50XVtpXSwgaSkpO1xuXHRcdFx0aWYgKGRpcmVjdCkge1xuXHRcdFx0XHRjb25zdCBjaGlsZFJlc3VsdCA9IHRoaXMubWFwKGNiLCB0aGlzLl9jaGlsZHNbcGFyZW50XVtpXS5pZCwgZGlyZWN0KTtcblx0XHRcdFx0cmVzdWx0ID0gcmVzdWx0LmNvbmNhdChjaGlsZFJlc3VsdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0ZmlsdGVyKHJ1bGU/OiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjaywgY29uZmlnOiBJVHJlZUZpbHRlckNvbmZpZyA9IHt9KTogdm9pZCB7XG5cdFx0aWYgKCFydWxlKSB7XG5cdFx0XHR0aGlzLnJlc3RvcmVPcmRlcigpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5faW5pdENoaWxkcykge1xuXHRcdFx0dGhpcy5faW5pdENoaWxkcyA9IHRoaXMuX2NoaWxkcztcblx0XHR9XG5cdFx0Y29uZmlnLnR5cGUgPSBjb25maWcudHlwZSB8fCBUcmVlRmlsdGVyVHlwZS5sZWFmcztcblxuXHRcdGNvbnN0IG5ld0NoaWxkcyA9IHt9O1xuXHRcdHRoaXMuX3JlY3Vyc2l2ZUZpbHRlcihydWxlLCBjb25maWcsIHRoaXMuX3Jvb3QsIDAsIG5ld0NoaWxkcyk7XG5cdFx0dGhpcy5fY2hpbGRzID0gbmV3Q2hpbGRzO1xuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdH1cblx0cmVzdG9yZU9yZGVyKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9pbml0Q2hpbGRzKSB7XG5cdFx0XHR0aGlzLl9jaGlsZHMgPSB0aGlzLl9pbml0Q2hpbGRzO1xuXHRcdFx0dGhpcy5faW5pdENoaWxkcyA9IG51bGw7XG5cdFx0fVxuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdH1cblx0Y29weShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldDogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uID0gdGhpcywgdGFyZ2V0SWQ6IElkID0gdGhpcy5fcm9vdCk6IElkIHtcblx0XHRpZiAoIXRoaXMuZXhpc3RzKGlkKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY3VycmVudENoaWxkcyA9IHRoaXMuX2NoaWxkc1tpZF07XG5cdFx0aWYgKHRhcmdldCA9PT0gdGhpcyAmJiAhdGhpcy5jYW5Db3B5KGlkLCB0YXJnZXRJZCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBpdGVtQ29weSA9IGNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSwgeyBpdGVtczogdHJ1ZSB9KTtcblx0XHRpZiAodGFyZ2V0LmV4aXN0cyhpZCkpIHtcblx0XHRcdGl0ZW1Db3B5LmlkID0gdWlkKCk7XG5cdFx0fVxuXHRcdGlmICghaXNUcmVlQ29sbGVjdGlvbih0YXJnZXQpKSB7XG5cdFx0XHR0YXJnZXQuYWRkKGl0ZW1Db3B5LCBpbmRleCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZXhpc3RzKGlkKSkge1xuXHRcdFx0aXRlbUNvcHkucGFyZW50ID0gdGFyZ2V0SWQ7XG5cdFx0XHR0YXJnZXQuYWRkKGl0ZW1Db3B5LCBpbmRleCk7XG5cdFx0XHRpZCA9IGl0ZW1Db3B5LmlkO1xuXHRcdH1cblx0XHRpZiAoY3VycmVudENoaWxkcykge1xuXHRcdFx0Zm9yIChjb25zdCBjaGlsZCBvZiBjdXJyZW50Q2hpbGRzKSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkSWQgPSBjaGlsZC5pZDtcblx0XHRcdFx0Y29uc3QgY2hpbGRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoY2hpbGRJZCk7XG5cdFx0XHRcdHRoaXMuY29weShjaGlsZElkLCBjaGlsZEluZGV4LCB0YXJnZXQsIGlkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdG1vdmUoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElUcmVlQ29sbGVjdGlvbiB8IElEYXRhQ29sbGVjdGlvbiA9IHRoaXMsIHRhcmdldElkOiBJZCA9IHRoaXMuX3Jvb3QpOiBJZCB7XG5cdFx0aWYgKCF0aGlzLmV4aXN0cyhpZCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGlmICh0YXJnZXQgIT09IHRoaXMpIHtcblx0XHRcdGlmICghaXNUcmVlQ29sbGVjdGlvbih0YXJnZXQpKSB7IC8vIG1vdmUgdG8gZGF0YWNvbGxlY3Rpb25cblx0XHRcdFx0dGFyZ2V0LmFkZChjb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCkpLCBpbmRleCk7XG5cdFx0XHRcdHRoaXMucmVtb3ZlKGlkKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcmV0dXJuSWQgPSB0aGlzLmNvcHkoaWQsIGluZGV4LCB0YXJnZXQsIHRhcmdldElkKTtcblx0XHRcdHRoaXMucmVtb3ZlKGlkKTtcblx0XHRcdHJldHVybiByZXR1cm5JZDtcblx0XHR9XG5cdFx0Ly8gbW92ZSBpbnNpZGVcblx0XHRpZiAoIXRoaXMuY2FuQ29weShpZCwgdGFyZ2V0SWQpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoaWQpO1xuXHRcdGNvbnN0IHBhcmVudEluZGV4ID0gdGhpcy5nZXRJbmRleChpZCk7XG5cblx0XHQvLyBnZXQgaXRlbSBmcm9tIHBhcmVudCBhcnJheSBhbmQgbW92ZSB0byB0YXJnZXQgYXJyYXlcblx0XHRjb25zdCBzcGxpY2VkID0gdGhpcy5fY2hpbGRzW3BhcmVudF0uc3BsaWNlKHBhcmVudEluZGV4LCAxKVswXTtcblx0XHQoc3BsaWNlZCBhcyBJRGF0YUl0ZW0pLnBhcmVudCA9IHRhcmdldElkOyAvLyBuZWVkIGZvciBuZXh0IG1vdmluZywgLi4uIG5vdCBiZXN0IHNvbHV0aW9uLCBtYXkgYmUgZnVsbCBtZXRob2QgZm9yIGdldCBpdGVtXG5cblx0XHRpZiAoIXRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aCkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX2NoaWxkc1twYXJlbnRdO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuaGF2ZUl0ZW1zKHRhcmdldElkKSkge1xuXHRcdFx0dGhpcy5fY2hpbGRzW3RhcmdldElkXSA9IFtdO1xuXHRcdH1cblx0XHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0XHRpbmRleCA9IHRoaXMuX2NoaWxkc1t0YXJnZXRJZF0ucHVzaChzcGxpY2VkKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fY2hpbGRzW3RhcmdldElkXS5zcGxpY2UoaW5kZXgsIDAsIHNwbGljZWQpO1xuXHRcdH1cblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHRcdHJldHVybiBpZDtcblx0fVxuXHRlYWNoQ2hpbGQoaWQ6IElkLCBjYjogRGF0YUNhbGxiYWNrPFQ+LCBkaXJlY3Q6IGJvb2xlYW4gPSB0cnVlLCBjaGVja0l0ZW06IChpdGVtOiBJRGF0YUl0ZW0pID0+IGJvb2xlYW4gPSAoKSA9PiB0cnVlKTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLmhhdmVJdGVtcyhpZCkpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaSA9IDA7aSA8IHRoaXMuX2NoaWxkc1tpZF0ubGVuZ3RoO2krKykge1xuXHRcdFx0Y2IuY2FsbCh0aGlzLCB0aGlzLl9jaGlsZHNbaWRdW2ldLCBpKTtcblx0XHRcdGlmIChkaXJlY3QgJiYgY2hlY2tJdGVtKHRoaXMuX2NoaWxkc1tpZF1baV0pKSB7XG5cdFx0XHRcdHRoaXMuZWFjaENoaWxkKHRoaXMuX2NoaWxkc1tpZF1baV0uaWQsIGNiLCBkaXJlY3QsIGNoZWNrSXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGdldE5lYXJJZChpZDogSWQpOiBJZCB7XG5cdFx0cmV0dXJuIGlkOyAvLyBmb3Igc2VsZWN0aW9uXG5cdH1cblx0bG9hZEl0ZW1zKGlkOiBJZCwgZHJpdmVyOiBhbnkgPSBcImpzb25cIik6IHZvaWQge1xuXHRcdGNvbnN0IHVybCA9IHRoaXMuY29uZmlnLmF1dG9sb2FkICsgXCI/aWQ9XCIgKyBpZDtcblx0XHRjb25zdCBwcm94eSA9IG5ldyBEYXRhUHJveHkodXJsKTtcblx0XHRwcm94eS5sb2FkKCkudGhlbigoZGF0YSkgPT4ge1xuXHRcdFx0ZHJpdmVyID0gdG9EYXRhRHJpdmVyKGRyaXZlcik7XG5cdFx0XHRkYXRhID0gZHJpdmVyLnRvSnNvbkFycmF5KGRhdGEpO1xuXHRcdFx0dGhpcy5fcGFyc2VfZGF0YShkYXRhLCBpZCk7XG5cblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHRcdH0pO1xuXHR9XG5cdHJlZnJlc2hJdGVtcyhpZDogSWQsIGRyaXZlcjogYW55ID0gXCJqc29uXCIpOiB2b2lkIHtcblx0XHR0aGlzLnJlbW92ZUFsbChpZCk7XG5cdFx0dGhpcy5sb2FkSXRlbXMoaWQsIGRyaXZlcik7XG5cdH1cblx0ZWFjaFBhcmVudChpZDogSWQsIGNiOiBEYXRhQ2FsbGJhY2s8VD4sIHNlbGY6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuXHRcdGlmICghaXRlbSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoc2VsZikge1xuXHRcdFx0Y2IuY2FsbCh0aGlzLCBpdGVtKTtcblx0XHR9XG5cdFx0aWYgKGl0ZW0ucGFyZW50ID09PSB0aGlzLl9yb290KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0SXRlbShpdGVtLnBhcmVudCk7XG5cdFx0Y2IuY2FsbCh0aGlzLCBwYXJlbnQpO1xuXHRcdHRoaXMuZWFjaFBhcmVudChpdGVtLnBhcmVudCwgY2IpO1xuXHR9XG5cdGhhdmVJdGVtcyhpZDogSWQpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gaWQgaW4gdGhpcy5fY2hpbGRzO1xuXHR9XG5cdGNhbkNvcHkoaWQ6IElkLCB0YXJnZXQ6IElkKTogYm9vbGVhbiB7XG5cdFx0aWYgKGlkID09PSB0YXJnZXQpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0bGV0IGNhbkNvcHkgPSB0cnVlO1xuXHRcdHRoaXMuZWFjaFBhcmVudCh0YXJnZXQsIGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQgPyBjYW5Db3B5ID0gZmFsc2UgOiBudWxsKTsgLy8gbG9jYXRlIHJldHVybiBzdHJpbmdcblx0XHRyZXR1cm4gY2FuQ29weTtcblx0fVxuXHRzZXJpYWxpemUoZHJpdmVyOiBEYXRhRHJpdmVyID0gRGF0YURyaXZlci5qc29uLCBjaGVja0l0ZW0/OiAoaXRlbTogYW55KSA9PiBhbnkpIHtcblx0XHRjb25zdCBkYXRhID0gdGhpcy5fc2VyaWFsaXplKHRoaXMuX3Jvb3QsIGNoZWNrSXRlbSk7XG5cdFx0Y29uc3QgZGF0YURyaXZlciA9IHRvRGF0YURyaXZlcihkcml2ZXIpO1xuXHRcdGlmIChkYXRhRHJpdmVyKSB7XG5cdFx0XHRyZXR1cm4gZGF0YURyaXZlci5zZXJpYWxpemUoZGF0YSk7XG5cdFx0fVxuXHR9XG5cdGdldElkKGluZGV4OiBudW1iZXIsIHBhcmVudDogc3RyaW5nID0gdGhpcy5fcm9vdCk6IHN0cmluZyB7XG5cdFx0aWYgKCF0aGlzLl9jaGlsZHNbcGFyZW50XSB8fCAhdGhpcy5fY2hpbGRzW3BhcmVudF1baW5kZXhdKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9jaGlsZHNbcGFyZW50XVtpbmRleF0uaWQ7XG5cdH1cblx0cHJvdGVjdGVkIF9yZW1vdmVBbGwoaWQ/OiBJZCkge1xuXHRcdGlmIChpZCkge1xuXHRcdFx0Y29uc3QgY2hpbGRzID0gWy4uLiB0aGlzLl9jaGlsZHNbaWRdXTtcblx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRzKSB7XG5cdFx0XHRcdHRoaXMucmVtb3ZlKGNoaWxkLmlkKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c3VwZXIuX3JlbW92ZUFsbCgpO1xuXHRcdFx0Y29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3Q7XG5cdFx0XHR0aGlzLl9pbml0Q2hpbGRzID0gbnVsbDtcblx0XHRcdHRoaXMuX2NoaWxkcyA9IHsgW3Jvb3RdOiBbXSB9O1xuXHRcdH1cblx0fVxuXHRwcm90ZWN0ZWQgX3JlbW92ZUNvcmUoaWQpIHtcblx0XHRpZiAodGhpcy5fcHVsbFtpZF0pIHtcblx0XHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KGlkKTtcblx0XHRcdHRoaXMuX2NoaWxkc1twYXJlbnRdID0gdGhpcy5fY2hpbGRzW3BhcmVudF0uZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPT0gaWQpO1xuXHRcdFx0aWYgKHBhcmVudCAhPT0gdGhpcy5fcm9vdCAmJiAhdGhpcy5fY2hpbGRzW3BhcmVudF0ubGVuZ3RoKSB7XG5cdFx0XHRcdGRlbGV0ZSB0aGlzLl9jaGlsZHNbcGFyZW50XTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLl9pbml0Q2hpbGRzICYmIHRoaXMuX2luaXRDaGlsZHNbcGFyZW50XSkge1xuXHRcdFx0XHR0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0gPSB0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0uZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCAhPT0gaWQpO1xuXHRcdFx0XHRpZiAocGFyZW50ICE9PSB0aGlzLl9yb290ICYmICF0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0ubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX2luaXRDaGlsZHNbcGFyZW50XTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dGhpcy5fZmFzdERlbGV0ZUNoaWxkcyh0aGlzLl9jaGlsZHMsIGlkKTtcblx0XHRcdGlmICh0aGlzLl9pbml0Q2hpbGRzKSB7XG5cdFx0XHRcdHRoaXMuX2Zhc3REZWxldGVDaGlsZHModGhpcy5faW5pdENoaWxkcywgaWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwcm90ZWN0ZWQgX2FkZFRvT3JkZXIoX29yZGVyLCBvYmo6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuX2NoaWxkcztcblx0XHRjb25zdCBpbml0Q2hpbGRzID0gdGhpcy5faW5pdENoaWxkcztcblx0XHRjb25zdCBwYXJlbnQgPSBvYmoucGFyZW50O1xuXHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcblxuXHRcdGFkZFRvT3JkZXIoY2hpbGRzLCBvYmosIHBhcmVudCwgaW5kZXgpO1xuXHRcdGlmIChpbml0Q2hpbGRzKSB7XG5cdFx0XHRhZGRUb09yZGVyKGluaXRDaGlsZHMsIG9iaiwgcGFyZW50LCBpbmRleCk7XG5cdFx0fVxuXHR9XG5cdHByb3RlY3RlZCBfcGFyc2VfZGF0YShkYXRhOiBhbnksIHBhcmVudCA9IHRoaXMuX3Jvb3QpIHtcblx0XHRmb3IgKGxldCBvYmogb2YgZGF0YSkge1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmluaXQpIHtcblx0XHRcdFx0b2JqID0gdGhpcy5jb25maWcuaW5pdChvYmopO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0b2JqID0ge1xuXHRcdFx0XHRcdHZhbHVlOiBvYmpcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdG9iai5pZCA9IG9iai5pZCA/IG9iai5pZC50b1N0cmluZygpIDogdWlkKCk7XG5cdFx0XHRvYmoucGFyZW50ID0gb2JqLnBhcmVudCA/IG9iai5wYXJlbnQudG9TdHJpbmcoKSA6IHBhcmVudDtcblx0XHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcblxuXHRcdFx0aWYgKCF0aGlzLl9jaGlsZHNbb2JqLnBhcmVudF0pIHtcblx0XHRcdFx0dGhpcy5fY2hpbGRzW29iai5wYXJlbnRdID0gW107XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9jaGlsZHNbb2JqLnBhcmVudF0ucHVzaChvYmopO1xuXHRcdFx0aWYgKG9iai5pdGVtcyAmJiBvYmouaXRlbXMgaW5zdGFuY2VvZiBPYmplY3QpIHtcblx0XHRcdFx0dGhpcy5fcGFyc2VfZGF0YShvYmouaXRlbXMsIG9iai5pZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2Zhc3REZWxldGVDaGlsZHModGFyZ2V0LCBpZDogSWQpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5fcHVsbFtpZF0pIHtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wdWxsW2lkXTtcblx0XHR9XG5cdFx0aWYgKCF0YXJnZXRbaWRdKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwO2kgPCB0YXJnZXRbaWRdLmxlbmd0aDtpKyspIHtcblx0XHRcdHRoaXMuX2Zhc3REZWxldGVDaGlsZHModGFyZ2V0LCB0YXJnZXRbaWRdW2ldLmlkKTtcblx0XHR9XG5cdFx0ZGVsZXRlIHRhcmdldFtpZF07XG5cdH1cblx0cHJpdmF0ZSBfcmVjdXJzaXZlRmlsdGVyKHJ1bGU6IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrLCBjb25maWc6IElUcmVlRmlsdGVyQ29uZmlnLCBjdXJyZW50OiBJZCwgbGV2ZWw6IG51bWJlciwgbmV3Q2hpbGRzOiBJQW55T2JqKTogdm9pZCB7XG5cdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5fY2hpbGRzW2N1cnJlbnRdO1xuXHRcdGlmICghY2hpbGRzKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGNvbmRpdGlvbiA9IChpdGVtOiBUKTogYm9vbGVhbiA9PiB7XG5cdFx0XHRzd2l0Y2ggKGNvbmZpZy50eXBlKSB7XG5cdFx0XHRcdGNhc2UgVHJlZUZpbHRlclR5cGUuYWxsOiB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBUcmVlRmlsdGVyVHlwZS5sZXZlbDoge1xuXHRcdFx0XHRcdHJldHVybiBsZXZlbCA9PT0gY29uZmlnLmxldmVsO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgVHJlZUZpbHRlclR5cGUubGVhZnM6IHtcblx0XHRcdFx0XHRyZXR1cm4gIXRoaXMuaGF2ZUl0ZW1zKGl0ZW0uaWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpZiAodHlwZW9mIHJ1bGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0Y29uc3QgY3VzdG9tUnVsZSA9IChpdGVtOiBUKSA9PiAhY29uZGl0aW9uKGl0ZW0pIHx8IHJ1bGUoaXRlbSk7XG5cdFx0XHRjb25zdCBmaWx0ZXJlZCA9IGNoaWxkcy5maWx0ZXIoY3VzdG9tUnVsZSk7XG5cdFx0XHRpZiAoZmlsdGVyZWQubGVuZ3RoKSB7XG5cdFx0XHRcdG5ld0NoaWxkc1tjdXJyZW50XSA9IGZpbHRlcmVkO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoKHJ1bGUgYXMgSUZpbHRlck1vZGUpLmJ5ICYmIChydWxlIGFzIElGaWx0ZXJNb2RlKS5tYXRjaCkge1xuXHRcdFx0Y29uc3QgY3VzdG9tUnVsZSA9IChpdGVtOiBUKSA9PiAhY29uZGl0aW9uKGl0ZW0pIHx8IGl0ZW1bcnVsZS5ieV0udG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YocnVsZS5tYXRjaC50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkpICE9PSAtMTtcblx0XHRcdG5ld0NoaWxkc1tjdXJyZW50XSA9IGNoaWxkcy5maWx0ZXIoY3VzdG9tUnVsZSk7XG5cdFx0fVxuXHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRzKSB7XG5cdFx0XHR0aGlzLl9yZWN1cnNpdmVGaWx0ZXIocnVsZSwgY29uZmlnLCBjaGlsZC5pZCwgbGV2ZWwgKyAxLCBuZXdDaGlsZHMpO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF9zZXJpYWxpemUocGFyZW50ID0gdGhpcy5fcm9vdCwgZm4/KSB7XG5cdFx0cmV0dXJuIHRoaXMubWFwKGl0ZW0gPT4ge1xuXHRcdFx0bGV0IGl0ZW1Db3B5OiBhbnkgPSB7fTtcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGl0ZW0pIHtcblx0XHRcdFx0aWYgKGtleSA9PT0gXCJwYXJlbnRcIiB8fCBrZXkgPT09IFwiaXRlbXNcIikge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW1Db3B5W2tleV0gPSBpdGVtW2tleV07XG5cdFx0XHR9XG5cdFx0XHRpZiAoZm4pIHtcblx0XHRcdFx0aXRlbUNvcHkgPSBmbihpdGVtQ29weSk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5oYXZlSXRlbXMoaXRlbS5pZCkpIHtcblx0XHRcdFx0aXRlbUNvcHkuaXRlbXMgPSB0aGlzLl9zZXJpYWxpemUoaXRlbS5pZCwgZm4pO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGl0ZW1Db3B5O1xuXHRcdH0sIHBhcmVudCwgZmFsc2UpO1xuXHR9XG59IiwiaW1wb3J0IHsgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgVHJlZUNvbGxlY3Rpb24gfSBmcm9tIFwiLi90cmVlY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBJZCA9IHN0cmluZztcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFQcm94eSB7XG5cdGxvYWQ6ICgpID0+IFByb21pc2U8YW55W10+O1xuXHRzYXZlOiAoZGF0YTogYW55LCBtb2RlOiBzdHJpbmcpID0+IFByb21pc2U8YW55Pjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU29ydE1vZGUge1xuXHRieT86IHN0cmluZztcblx0ZGlyPzogc3RyaW5nO1xuXHRhcz86IChhOiBhbnkpID0+IGFueTtcblx0cnVsZT86IChhOiBhbnksIGI6IGFueSkgPT4gbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBJRmlsdGVyQ2FsbGJhY2sgPSAob2JqOiBhbnkpID0+IGJvb2xlYW47XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlck1vZGUge1xuXHRieT86IHN0cmluZztcblx0bWF0Y2g/OiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuO1xuXHRjb21wYXJlPzogKHZhbHVlOiBhbnksIG1hdGNoOiBhbnksIG9iajogYW55KSA9PiBib29sZWFuO1xufVxuZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyQ29uZmlnIHtcblx0YWRkPzogYm9vbGVhbjtcblx0bXVsdGlwbGU/OiBib29sZWFuO1xufVxuZXhwb3J0IGludGVyZmFjZSBJVHJlZUZpbHRlckNvbmZpZyBleHRlbmRzIElGaWx0ZXJDb25maWcge1xuXHR0eXBlPzogVHJlZUZpbHRlclR5cGU7XG5cdGxldmVsPzogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBJVXBkYXRlT2JqZWN0IHtcblx0W2tleTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4ge1xuXHRsb2FkRGF0YTogUHJvbWlzZTxhbnk+O1xuXHRzYXZlRGF0YTogUHJvbWlzZTxhbnk+O1xuXHRldmVudHM6IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzPjtcblx0YWRkKG9iajogYW55LCBpbmRleD86IG51bWJlcik6IHN0cmluZztcblx0cmVtb3ZlKGlkOiBJZCk6IHZvaWQ7XG5cdHJlbW92ZUFsbCgpOiB2b2lkO1xuXHR1cGRhdGUoaWQ6IElkLCBvYmo6IElVcGRhdGVPYmplY3QsIHNpbGVudD86IGJvb2xlYW4pOiB2b2lkO1xuXG5cdGV4aXN0cyhpZDogSWQpOiBib29sZWFuO1xuXHRnZXRJbml0aWFsRGF0YSgpOiBUW107XG5cdGdldEl0ZW0oaWQ6IElkKTogVDtcblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyO1xuXHRnZXRMZW5ndGgoKTogbnVtYmVyO1xuXHRnZXRJZChpbmRleDogbnVtYmVyKTogSWQ7XG5cdGZpbHRlcihydWxlPzogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZz86IElGaWx0ZXJDb25maWcpOiB2b2lkO1xuXHRmaW5kKHJ1bGU6IElGaWx0ZXJNb2RlKTogVDtcblx0cmVkdWNlPEE+KGNiOiBSZWR1Y2VDYWxsQmFjazxULCBBPiwgYWNjOiBBKTogQTtcblx0ZmluZEFsbChydWxlOiBJRmlsdGVyTW9kZSk6IFRbXTtcblx0bWFwKGNiOiBEYXRhQ2FsbGJhY2s8VD4pOiBUW107XG5cdG1hcFJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlciwgY2I6IERhdGFDYWxsYmFjazxUPik6IGFueVtdO1xuXHRzb3J0KGJ5OiBJU29ydE1vZGUpOiB2b2lkO1xuXHRzZXJpYWxpemUoZHJpdmVyPzogRGF0YURyaXZlcik6IFRbXTtcblx0Y29weShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldD86IElEYXRhQ29sbGVjdGlvbik6IHZvaWQ7XG5cdG1vdmUoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBJRGF0YUNvbGxlY3Rpb24pOiB2b2lkO1xuXG5cdGxvYWQodXJsOiBJRGF0YVByb3h5KTogUHJvbWlzZTxhbnk+O1xuXHRwYXJzZShkYXRhOiBUW10pO1xuXG5cdHNhdmUodXJsOiBJRGF0YVByb3h5KTogdm9pZDsgLy8gUHJvbWlzZTxhbnk+O1xuXHRpc1NhdmVkKCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFDaGFuZ2VTdGFjayB7XG5cdG9yZGVyOiBJRGF0YUNoYW5nZVtdO1xufVxuZXhwb3J0IHR5cGUgU3RhdHVzZXMgPSBcImFkZFwiIHwgXCJ1cGRhdGVcIiB8IFwicmVtb3ZlXCI7XG5leHBvcnQgaW50ZXJmYWNlIElEYXRhQ2hhbmdlIHtcblx0aWQ6IElkO1xuXHRzdGF0dXM6IFN0YXR1c2VzO1xuXHRvYmo6IGFueTtcblx0c2F2aW5nOiBib29sZWFuO1xuXHRwcm9taXNlPzogUHJvbWlzZTxhbnk+O1xuXHRwZW5kaW5nPzogYm9vbGVhbjtcblx0ZXJyb3I/OiBib29sZWFuO1xufVxuZXhwb3J0IHR5cGUgUmVxdWVzdFN0YXR1cyA9IFwic2F2aW5nXCIgfCBcInBlbmRpbmdcIiB8IFwiZXJyb3JcIjtcbmV4cG9ydCBpbnRlcmZhY2UgSURpciB7XG5cdFtrZXk6IHN0cmluZ106IGFueTtcblx0YXNjOiBudW1iZXI7XG5cdGRlc2M6IG51bWJlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFEcml2ZXIge1xuXHR0b0pzb25BcnJheShkYXRhOiBhbnkpOiBhbnlbXTtcblx0c2VyaWFsaXplKGRhdGE6IElBbnlPYmpbXSk6IGFueTtcblx0Z2V0Um93cyhkYXRhOiBzdHJpbmcpOiBhbnlbXTtcblx0Z2V0RmllbGRzKHJvdzogYW55KTogeyBba2V5OiBzdHJpbmddOiBhbnkgfTtcbn1cbmV4cG9ydCBlbnVtIFRyZWVGaWx0ZXJUeXBlIHtcblx0YWxsID0gXCJhbGxcIixcblx0bGV2ZWwgPSBcImxldmVsXCIsXG5cdGxlYWZzID0gXCJsZWFmc1wiXG59XG5leHBvcnQgdHlwZSBEYXRhQ2FsbGJhY2s8VD4gPSAoaXRlbTogVCwgaW5kZXg/OiBudW1iZXIpID0+IGFueTtcblxuZXhwb3J0IHR5cGUgUmVkdWNlQ2FsbEJhY2s8VCwgQT4gPSAoYWNjOiBBLCBpdGVtOiBULCBpbmRleD86IG51bWJlcikgPT4gQTtcblxuZXhwb3J0IGludGVyZmFjZSBJVHJlZUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4gZXh0ZW5kcyBJRGF0YUNvbGxlY3Rpb248VD4ge1xuXHRhZGQob2JqOiBhbnksIGluZGV4PzogbnVtYmVyLCBwYXJlbnQ/OiBJZCk6IHN0cmluZztcblx0Z2V0Um9vdCgpOiBJZDtcblx0Z2V0UGFyZW50KGlkOiBJZCk6IElkO1xuXHRyZW1vdmVBbGwoaWQ/OiBJZCk6IHZvaWQ7XG5cdGdldExlbmd0aChpZD86IElkKTogbnVtYmVyO1xuXHRnZXRJbmRleChpZDogSWQpOiBudW1iZXI7XG5cdGdldEl0ZW1zKGlkOiBJZCk6IFRbXTtcblx0c29ydChjb25mPzogYW55KTogdm9pZDtcblx0bWFwKGNiOiBEYXRhQ2FsbGJhY2s8VD4sIHBhcmVudD86IElkLCBkaXJlY3Q/OiBib29sZWFuKTogYW55O1xuXHRmaWx0ZXIocnVsZT86IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrLCBjb25maWc/OiBJVHJlZUZpbHRlckNvbmZpZyk6IHZvaWQ7XG5cdHJlc3RvcmVPcmRlcigpOiB2b2lkO1xuXHRjb3B5KGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uLCB0YXJnZXRJZD86IElkKTogSWQ7XG5cdG1vdmUoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBJRGF0YUNvbGxlY3Rpb24gfCBJVHJlZUNvbGxlY3Rpb24sIHRhcmdldElkPzogSWQpOiBJZDtcblx0ZWFjaENoaWxkKGlkOiBJZCwgY2I6IERhdGFDYWxsYmFjazxUPiwgZGlyZWN0PzogYm9vbGVhbiwgY2hlY2tJdGVtPzogKGl0ZW06IElEYXRhSXRlbSkgPT4gYm9vbGVhbik6IHZvaWQ7XG5cdGVhY2hQYXJlbnQoaWQ6IElkLCBjYjogRGF0YUNhbGxiYWNrPFQ+LCBzZWxmPzogYm9vbGVhbik6IHZvaWQ7XG5cdGxvYWRJdGVtcyhpZDogSWQsIGRyaXZlcj86IGFueSk6IHZvaWQ7XG5cdHJlZnJlc2hJdGVtcyhpZDogSWQsIGRyaXZlcj86IGFueSk6IHZvaWQ7XG5cdGhhdmVJdGVtcyhpZDogSWQpOiBib29sZWFuO1xuXHRjYW5Db3B5KGlkOiBJZCwgdGFyZ2V0OiBJZCk6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFJdGVtIHtcblx0aWQ/OiBzdHJpbmc7XG5cdFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuXG5leHBvcnQgZW51bSBEcm9wUG9zaXRpb24ge1xuXHR0b3AgPSBcInRvcFwiLFxuXHRib3QgPSBcImJvdFwiLFxuXHRpbiA9IFwiaW5cIlxufVxuZXhwb3J0IGludGVyZmFjZSBJT2JqV2l0aERhdGEge1xuXHRkYXRhOiBUcmVlQ29sbGVjdGlvbiB8IERhdGFDb2xsZWN0aW9uO1xuXHRldmVudHM6IElFdmVudFN5c3RlbTxEcmFnRXZlbnRzLCBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwPjtcblx0Y29uZmlnOiBJRHJhZ0NvbmZpZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVRyYW5zZmVyRGF0YSB7XG5cdGluaXRYT2Zmc2V0PzogbnVtYmVyO1xuXHRpbml0WU9mZnNldD86IG51bWJlcjtcblx0eD86IG51bWJlcjtcblx0eT86IG51bWJlcjtcblx0Z2hvc3Q/OiBIVE1MRWxlbWVudDtcblx0dGFyZ2V0SWQ/OiBJZDtcblx0aWQ/OiBJZDtcblx0ZHJhZ0NvbmZpZz86IElEcmFnQ29uZmlnO1xuXHR0YXJnZXQ/OiBJT2JqV2l0aERhdGE7XG5cdGRyb3BQb3NpdGlvbj86IERyb3BQb3NpdGlvbjtcblx0aXRlbT86IEhUTUxFbGVtZW50O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEcmFnQ29uZmlnIHtcblx0ZHJhZ0NvcHk/OiBib29sZWFuO1xuXHRkcm9wQmVoYXZpb3VyPzogRHJvcEJlaGF2aW91cjtcblx0ZHJhZ01vZGU/OiBEcmFnTW9kZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJQ29weU9iamVjdCB7XG5cdGlkOiBzdHJpbmc7XG5cdHRhcmdldDogSU9ialdpdGhEYXRhO1xufVxuXG5leHBvcnQgZW51bSBEYXRhRXZlbnRzIHtcblx0YWZ0ZXJBZGQgPSBcImFmdGVyYWRkXCIsXG5cdGJlZm9yZUFkZCA9IFwiYmVmb3JlYWRkXCIsXG5cdHJlbW92ZUFsbCA9IFwicmVtb3ZlYWxsXCIsXG5cdGJlZm9yZVJlbW92ZSA9IFwiYmVmb3JlcmVtb3ZlXCIsXG5cdGFmdGVyUmVtb3ZlID0gXCJhZnRlcnJlbW92ZVwiLFxuXHRjaGFuZ2UgPSBcImNoYW5nZVwiLFxuXHRsb2FkID0gXCJsb2FkXCJcbn1cbmV4cG9ydCBlbnVtIERyYWdFdmVudHMge1xuXHRiZWZvcmVEcmFnID0gXCJiZWZvcmVkcmFnXCIsICAgICAvLyBmaXJlIG9uIHNvdXJjZVxuXHRiZWZvcmVEcm9wID0gXCJiZWZvcmVEcm9wXCIsICAgICAvLyBmaXJlIG9uIHRhcmdldFxuXHRkcmFnU3RhcnQgPSBcImRyYWdzdGFydFwiLCAgICAgICAvLyBmaXJlIG9uIHNvdXJjZVxuXHRkcmFnRW5kID0gXCJkcmFnZW5kXCIsICAgICAgICAgICAvLyBmaXJlIG9uIHNvdXJjZVxuXHRjYW5Ecm9wID0gXCJjYW5kcm9wXCIsICAgICAgICAgICAvLyBmaXJlIG9uIHRhcmdldFxuXHRjYW5jZWxEcm9wID0gXCJjYW5jZWxkcm9wXCIsICAgICAvLyBmaXJlIG9uIHRhcmdldFxuXHRkcm9wQ29tcGxldGUgPSBcImRyb3Bjb21wbGV0ZVwiLCAvLyBmaXJlIG9uIHRhcmdldFxuXHRkcmFnT3V0ID0gXCJkcmFnT3V0XCIsICAgICAgICAgICAvLyBmaXJlIG9uIHNvdXJjZVxuXHRkcmFnSW4gPSBcImRyYWdJblwiICAgICAgICAgICAgICAvLyBmaXJlIG9uIHNvdXJjZVxufVxuXG5cbmV4cG9ydCBlbnVtIERyYWdNb2RlIHtcblx0dGFyZ2V0ID0gXCJ0YXJnZXRcIixcblx0Ym90aCA9IFwiYm90aFwiLFxuXHRzb3VyY2UgPSBcInNvdXJjZVwiXG59XG5leHBvcnQgZW51bSBEcm9wQmVoYXZpb3VyIHtcblx0Y2hpbGQgPSBcImNoaWxkXCIsXG5cdHNpYmxpbmcgPSBcInNpYmxpbmdcIixcblx0Y29tcGxleCA9IFwiY29tcGxleFwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFFdmVudHNIYW5kbGVyc01hcCB7XG5cdFtrZXk6IHN0cmluZ106ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXHRbRGF0YUV2ZW50cy5jaGFuZ2VdOiAoaWQ/OiBzdHJpbmcsIHN0YXR1cz86IFN0YXR1c2VzLCBvYmo/OiBhbnkpID0+IGFueTtcblx0W0RhdGFFdmVudHMuYWZ0ZXJBZGRdOiAob2JqOiBhbnkpID0+IHZvaWQ7XG5cdFtEYXRhRXZlbnRzLmFmdGVyUmVtb3ZlXTogKG9iajogYW55KSA9PiB2b2lkO1xuXHRbRGF0YUV2ZW50cy5iZWZvcmVBZGRdOiAob2JqOiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkO1xuXHRbRGF0YUV2ZW50cy5iZWZvcmVSZW1vdmVdOiAob2JqOiBhbnkpID0+IGJvb2xlYW4gfCB2b2lkO1xuXHRbRGF0YUV2ZW50cy5sb2FkXTogKCkgPT4gdm9pZDtcblx0W0RhdGFFdmVudHMucmVtb3ZlQWxsXTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwIHtcblx0W2tleTogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmJlZm9yZURyYWddOiAoaXRlbTogYW55LCBnaG9zdDogSFRNTEVsZW1lbnQpID0+IHZvaWQgfCBib29sZWFuO1xuXHRbRHJhZ0V2ZW50cy5iZWZvcmVEcm9wXTogKGlkOiBzdHJpbmcsIHRhcmdldDogSU9ialdpdGhEYXRhKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmNhbkRyb3BdOiAoaWQ6IHN0cmluZywgZHJvcFBvc2l0aW9uOiBEcm9wUG9zaXRpb24pID0+IGFueTtcblx0W0RyYWdFdmVudHMuY2FuY2VsRHJvcF06IChpZDogc3RyaW5nKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmRyYWdFbmRdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5kcmFnSW5dOiAoaWQ6IHN0cmluZywgZHJvcFBvc2l0aW9uOiBEcm9wUG9zaXRpb24sIHRhcmdldDogSU9ialdpdGhEYXRhKSA9PiB2b2lkIHwgYm9vbGVhbjtcblx0W0RyYWdFdmVudHMuZHJhZ091dF06IChpZDogc3RyaW5nLCB0YXJnZXQ6IElPYmpXaXRoRGF0YSkgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5kcmFnU3RhcnRdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5kcm9wQ29tcGxldGVdOiAoaWQ6IHN0cmluZywgcG9zaXRpb246IERyb3BQb3NpdGlvbikgPT4gYW55O1xufVxuXG5leHBvcnQgZW51bSBEYXRhRHJpdmVyIHtcblx0anNvbiA9IFwianNvblwiLFxuXHRjc3YgPSBcImNzdlwiLFxuXHR4bWwgPSBcInhtbFwiXG59Il0sInNvdXJjZVJvb3QiOiIifQ==