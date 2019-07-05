/*
@license

undefined v.2.1.0 Professional

This software is covered by DHTMLX Commercial License.
Usage without proper license is prohibited.

(c) Dinamenta, UAB.

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
/******/ 	return __webpack_require__(__webpack_require__.s = "../ts-timepicker/sources/entry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/domvm/dist/dev/domvm.dev.js":
/*!***************************************************!*\
  !*** ../node_modules/domvm/dist/dev/domvm.dev.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
* Copyright (c) 2017, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* domvm.js (DOM ViewModel)
* A thin, fast, dependency-free vdom view layer
* @preserve https://github.com/leeoniya/domvm (v3.2.6, dev build)
*/

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

// NOTE: if adding a new *VNode* type, make it < COMMENT and renumber rest.
// There are some places that test <= COMMENT to assert if node is a VNode

// VNode types
var ELEMENT	= 1;
var TEXT		= 2;
var COMMENT	= 3;

// placeholder types
var VVIEW		= 4;
var VMODEL		= 5;

var ENV_DOM = typeof window !== "undefined";
var win = ENV_DOM ? window : {};
var rAF = win.requestAnimationFrame;

var emptyObj = {};

function noop() {}

var isArr = Array.isArray;

function isSet(val) {
	return val != null;
}

function isPlainObj(val) {
	return val != null && val.constructor === Object;		//  && typeof val === "object"
}

function insertArr(targ, arr, pos, rem) {
	targ.splice.apply(targ, [pos, rem].concat(arr));
}

function isVal(val) {
	var t = typeof val;
	return t === "string" || t === "number";
}

function isFunc(val) {
	return typeof val === "function";
}

function isProm(val) {
	return typeof val === "object" && isFunc(val.then);
}



function assignObj(targ) {
	var args = arguments;

	for (var i = 1; i < args.length; i++)
		{ for (var k in args[i])
			{ targ[k] = args[i][k]; } }

	return targ;
}

// export const defProp = Object.defineProperty;

function deepSet(targ, path, val) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			{ targ[seg] = val; }
		else
			{ targ[seg] = targ = targ[seg] || {}; }
	}
}

/*
export function deepUnset(targ, path) {
	var seg;

	while (seg = path.shift()) {
		if (path.length === 0)
			targ[seg] = val;
		else
			targ[seg] = targ = targ[seg] || {};
	}
}
*/

function sliceArgs(args, offs) {
	var arr = [];
	for (var i = offs; i < args.length; i++)
		{ arr.push(args[i]); }
	return arr;
}

function cmpObj(a, b) {
	for (var i in a)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

function cmpArr(a, b) {
	var alen = a.length;

	if (b.length !== alen)
		{ return false; }

	for (var i = 0; i < alen; i++)
		{ if (a[i] !== b[i])
			{ return false; } }

	return true;
}

// https://github.com/darsain/raft
// rAF throttler, aggregates multiple repeated redraw calls within single animframe
function raft(fn) {
	if (!rAF)
		{ return fn; }

	var id, ctx, args;

	function call() {
		id = 0;
		fn.apply(ctx, args);
	}

	return function() {
		ctx = this;
		args = arguments;
		if (!id) { id = rAF(call); }
	};
}

function curry(fn, args, ctx) {
	return function() {
		return fn.apply(ctx, args);
	};
}

/*
export function prop(val, cb, ctx, args) {
	return function(newVal, execCb) {
		if (newVal !== undefined && newVal !== val) {
			val = newVal;
			execCb !== false && isFunc(cb) && cb.apply(ctx, args);
		}

		return val;
	};
}
*/

/*
// adapted from https://github.com/Olical/binary-search
export function binaryKeySearch(list, item) {
    var min = 0;
    var max = list.length - 1;
    var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess].key === item) { return guess; }
			else {
				if (list[guess].key < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

    return -1;
}
*/

// https://en.wikipedia.org/wiki/Longest_increasing_subsequence
// impl borrowed from https://github.com/ivijs/ivi
function longestIncreasingSubsequence(a) {
	var p = a.slice();
	var result = [];
	result.push(0);
	var u;
	var v;

	for (var i = 0, il = a.length; i < il; ++i) {
		var j = result[result.length - 1];
		if (a[j] < a[i]) {
			p[i] = j;
			result.push(i);
			continue;
		}

		u = 0;
		v = result.length - 1;

		while (u < v) {
			var c = ((u + v) / 2) | 0;
			if (a[result[c]] < a[i]) {
				u = c + 1;
			} else {
				v = c;
			}
		}

		if (a[i] < a[result[u]]) {
			if (u > 0) {
				p[i] = result[u - 1];
			}
			result[u] = i;
		}
	}

	u = result.length;
	v = result[u - 1];

	while (u-- > 0) {
		result[u] = v;
		v = p[v];
	}

	return result;
}

// based on https://github.com/Olical/binary-search
function binaryFindLarger(item, list) {
	var min = 0;
	var max = list.length - 1;
	var guess;

	var bitwise = (max <= 2147483647) ? true : false;
	if (bitwise) {
		while (min <= max) {
			guess = (min + max) >> 1;
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	} else {
		while (min <= max) {
			guess = Math.floor((min + max) / 2);
			if (list[guess] === item) { return guess; }
			else {
				if (list[guess] < item) { min = guess + 1; }
				else { max = guess - 1; }
			}
		}
	}

	return (min == list.length) ? null : min;

//	return -1;
}

function isEvProp(name) {
	return name[0] === "o" && name[1] === "n";
}

function isSplProp(name) {
	return name[0] === "_";
}

function isStyleProp(name) {
	return name === "style";
}

function repaint(node) {
	node && node.el && node.el.offsetHeight;
}

function isHydrated(vm) {
	return vm.node != null && vm.node.el != null;
}

// tests interactive props where real val should be compared
function isDynProp(tag, attr) {
//	switch (tag) {
//		case "input":
//		case "textarea":
//		case "select":
//		case "option":
			switch (attr) {
				case "value":
				case "checked":
				case "selected":
//				case "selectedIndex":
					return true;
			}
//	}

	return false;
}

function getVm(n) {
	n = n || emptyObj;
	while (n.vm == null && n.parent)
		{ n = n.parent; }
	return n.vm;
}

function VNode() {}

var VNodeProto = VNode.prototype = {
	constructor: VNode,

	type:	null,

	vm:		null,

	// all this stuff can just live in attrs (as defined) just have getters here for it
	key:	null,
	ref:	null,
	data:	null,
	hooks:	null,
	ns:		null,

	el:		null,

	tag:	null,
	attrs:	null,
	body:	null,

	flags:	0,

	_class:	null,
	_diff:	null,

	// pending removal on promise resolution
	_dead:	false,
	// part of longest increasing subsequence?
	_lis:	false,

	idx:	null,
	parent:	null,

	/*
	// break out into optional fluent module
	key:	function(val) { this.key	= val; return this; },
	ref:	function(val) { this.ref	= val; return this; },		// deep refs
	data:	function(val) { this.data	= val; return this; },
	hooks:	function(val) { this.hooks	= val; return this; },		// h("div").hooks()
	html:	function(val) { this.html	= true; return this.body(val); },

	body:	function(val) { this.body	= val; return this; },
	*/
};

function defineText(body) {
	var node = new VNode;
	node.type = TEXT;
	node.body = body;
	return node;
}

var isStream = function() { return false };

var streamVal = noop;
var subStream = noop;
var unsubStream = noop;

function streamCfg(cfg) {
	isStream	= cfg.is;
	streamVal	= cfg.val;
	subStream	= cfg.sub;
	unsubStream	= cfg.unsub;
}

// creates a one-shot self-ending stream that redraws target vm
// TODO: if it's already registered by any parent vm, then ignore to avoid simultaneous parent & child refresh
function hookStream(s, vm) {
	var redrawStream = subStream(s, function (val) {
		// this "if" ignores the initial firing during subscription (there's no redrawable vm yet)
		if (redrawStream) {
			// if vm fully is formed (or mounted vm.node.el?)
			if (vm.node != null)
				{ vm.redraw(); }
			unsubStream(redrawStream);
		}
	});

	return streamVal(s);
}

function hookStream2(s, vm) {
	var redrawStream = subStream(s, function (val) {
		// this "if" ignores the initial firing during subscription (there's no redrawable vm yet)
		if (redrawStream) {
			// if vm fully is formed (or mounted vm.node.el?)
			if (vm.node != null)
				{ vm.redraw(); }
		}
	});

	return redrawStream;
}

var tagCache = {};

var RE_ATTRS = /\[(\w+)(?:=(\w+))?\]/g;

function cssTag(raw) {
	{
		var cached = tagCache[raw];

		if (cached == null) {
			var tag, id, cls, attr;

			tagCache[raw] = cached = {
				tag:	(tag	= raw.match( /^[-\w]+/))		?	tag[0]						: "div",
				id:		(id		= raw.match( /#([-\w]+)/))		? 	id[1]						: null,
				class:	(cls	= raw.match(/\.([-\w.]+)/))		?	cls[1].replace(/\./g, " ")	: null,
				attrs:	null,
			};

			while (attr = RE_ATTRS.exec(raw)) {
				if (cached.attrs == null)
					{ cached.attrs = {}; }
				cached.attrs[attr[1]] = attr[2] || "";
			}
		}

		return cached;
	}
}

var DEVMODE = {
	syncRedraw: false,

	warnings: true,

	verbose: true,

	mutations: true,

	DATA_REPLACED: function(vm, oldData, newData) {
		if (isFunc(vm.view) && vm.view.length > 1) {
			var msg = "A view's data was replaced. The data originally passed to the view closure during init is now stale. You may want to rely only on the data passed to render() or vm.data.";
			return [msg, vm, oldData, newData];
		}
	},

	UNKEYED_INPUT: function(vnode) {
		return ["Unkeyed <input> detected. Consider adding a name, id, _key, or _ref attr to avoid accidental DOM recycling between different <input> types.", vnode];
	},

	UNMOUNTED_REDRAW: function(vm) {
		return ["Invoking redraw() of an unmounted (sub)view may result in errors.", vm];
	},

	INLINE_HANDLER: function(vnode, oval, nval) {
		return ["Anonymous event handlers get re-bound on each redraw, consider defining them outside of templates for better reuse.", vnode, oval, nval];
	},

	MISMATCHED_HANDLER: function(vnode, oval, nval) {
		return ["Patching of different event handler styles is not fully supported for performance reasons. Ensure that handlers are defined using the same style.", vnode, oval, nval];
	},

	SVG_WRONG_FACTORY: function(vnode) {
		return ["<svg> defined using domvm.defineElement. Use domvm.defineSvgElement for <svg> & child nodes.", vnode];
	},

	FOREIGN_ELEMENT: function(el) {
		return ["domvm stumbled upon an element in its DOM that it didn't create, which may be problematic. You can inject external elements into the vtree using domvm.injectElement.", el];
	},

	REUSED_ATTRS: function(vnode) {
		return ["Attrs objects may only be reused if they are truly static, as a perf optimization. Mutating & reusing them will have no effect on the DOM due to 0 diff.", vnode];
	},

	ADJACENT_TEXT: function(vnode, text1, text2) {
		return ["Adjacent text nodes will be merged. Consider concatentating them yourself in the template for improved perf.", vnode, text1, text2];
	},

	ARRAY_FLATTENED: function(vnode, array) {
		return ["Arrays within templates will be flattened. When they are leading or trailing, it's easy and more performant to just .concat() them in the template.", vnode, array];
	},

	ALREADY_HYDRATED: function(vm) {
		return ["A child view failed to mount because it was already hydrated. Make sure not to invoke vm.redraw() or vm.update() on unmounted views.", vm];
	},

	ATTACH_IMPLICIT_TBODY: function(vnode, vchild) {
		return ["<table><tr> was detected in the vtree, but the DOM will be <table><tbody><tr> after HTML's implicit parsing. You should create the <tbody> vnode explicitly to avoid SSR/attach() failures.", vnode, vchild];
	}
};

function devNotify(key, args) {
	if (DEVMODE.warnings && isFunc(DEVMODE[key])) {
		var msgArgs = DEVMODE[key].apply(null, args);

		if (msgArgs) {
			msgArgs[0] = key + ": " + (DEVMODE.verbose ? msgArgs[0] : "");
			console.warn.apply(console, msgArgs);
		}
	}
}

// (de)optimization flags

// forces slow bottom-up removeChild to fire deep willRemove/willUnmount hooks,
var DEEP_REMOVE = 1;
// prevents inserting/removing/reordering of children
var FIXED_BODY = 2;
// enables fast keyed lookup of children via binary search, expects homogeneous keyed body
var KEYED_LIST = 4;
// indicates an vnode match/diff/recycler function for body
var LAZY_LIST = 8;

function initElementNode(tag, attrs, body, flags) {
	var node = new VNode;

	node.type = ELEMENT;

	if (isSet(flags))
		{ node.flags = flags; }

	node.attrs = attrs;

	var parsed = cssTag(tag);

	node.tag = parsed.tag;

	// meh, weak assertion, will fail for id=0, etc.
	if (parsed.id || parsed.class || parsed.attrs) {
		var p = node.attrs || {};

		if (parsed.id && !isSet(p.id))
			{ p.id = parsed.id; }

		if (parsed.class) {
			node._class = parsed.class;		// static class
			p.class = parsed.class + (isSet(p.class) ? (" " + p.class) : "");
		}
		if (parsed.attrs) {
			for (var key in parsed.attrs)
				{ if (!isSet(p[key]))
					{ p[key] = parsed.attrs[key]; } }
		}

//		if (node.attrs !== p)
			node.attrs = p;
	}

	var mergedAttrs = node.attrs;

	if (isSet(mergedAttrs)) {
		if (isSet(mergedAttrs._key))
			{ node.key = mergedAttrs._key; }

		if (isSet(mergedAttrs._ref))
			{ node.ref = mergedAttrs._ref; }

		if (isSet(mergedAttrs._hooks))
			{ node.hooks = mergedAttrs._hooks; }

		if (isSet(mergedAttrs._data))
			{ node.data = mergedAttrs._data; }

		if (isSet(mergedAttrs._flags))
			{ node.flags = mergedAttrs._flags; }

		if (!isSet(node.key)) {
			if (isSet(node.ref))
				{ node.key = node.ref; }
			else if (isSet(mergedAttrs.id))
				{ node.key = mergedAttrs.id; }
			else if (isSet(mergedAttrs.name))
				{ node.key = mergedAttrs.name + (mergedAttrs.type === "radio" || mergedAttrs.type === "checkbox" ? mergedAttrs.value : ""); }
		}
	}

	if (body != null)
		{ node.body = body; }

	{
		if (node.tag === "svg") {
			setTimeout(function() {
				node.ns == null && devNotify("SVG_WRONG_FACTORY", [node]);
			}, 16);
		}
		// todo: attrs.contenteditable === "true"?
		else if (/^(?:input|textarea|select|datalist|keygen|output)$/.test(node.tag) && node.key == null)
			{ devNotify("UNKEYED_INPUT", [node]); }
	}

	return node;
}

function setRef(vm, name, node) {
	var path = ["refs"].concat(name.split("."));
	deepSet(vm, path, node);
}

function setDeepRemove(node) {
	while (node = node.parent)
		{ node.flags |= DEEP_REMOVE; }
}

// vnew, vold
function preProc(vnew, parent, idx, ownVm) {
	if (vnew.type === VMODEL || vnew.type === VVIEW)
		{ return; }

	vnew.parent = parent;
	vnew.idx = idx;
	vnew.vm = ownVm;

	if (vnew.ref != null)
		{ setRef(getVm(vnew), vnew.ref, vnew); }

	var nh = vnew.hooks,
		vh = ownVm && ownVm.hooks;

	if (nh && (nh.willRemove || nh.didRemove) ||
		vh && (vh.willUnmount || vh.didUnmount))
		{ setDeepRemove(vnew); }

	if (isArr(vnew.body))
		{ preProcBody(vnew); }
	else {
		if (isStream(vnew.body))
			{ vnew.body = hookStream(vnew.body, getVm(vnew)); }
	}
}

function preProcBody(vnew) {
	var body = vnew.body;

	for (var i = 0; i < body.length; i++) {
		var node2 = body[i];

		// remove false/null/undefined
		if (node2 === false || node2 == null)
			{ body.splice(i--, 1); }
		// flatten arrays
		else if (isArr(node2)) {
			{
				if (i === 0 || i === body.length - 1)
					{ devNotify("ARRAY_FLATTENED", [vnew, node2]); }
			}
			insertArr(body, node2, i--, 1);
		}
		else {
			if (node2.type == null)
				{ body[i] = node2 = defineText(""+node2); }

			if (node2.type === TEXT) {
				// remove empty text nodes
				if (node2.body == null || node2.body === "")
					{ body.splice(i--, 1); }
				// merge with previous text node
				else if (i > 0 && body[i-1].type === TEXT) {
					{
						devNotify("ADJACENT_TEXT", [vnew, body[i-1].body, node2.body]);
					}
					body[i-1].body += node2.body;
					body.splice(i--, 1);
				}
				else
					{ preProc(node2, vnew, i, null); }
			}
			else
				{ preProc(node2, vnew, i, null); }
		}
	}
}

var unitlessProps = {
	animationIterationCount: true,
	boxFlex: true,
	boxFlexGroup: true,
	boxOrdinalGroup: true,
	columnCount: true,
	flex: true,
	flexGrow: true,
	flexPositive: true,
	flexShrink: true,
	flexNegative: true,
	flexOrder: true,
	gridRow: true,
	gridColumn: true,
	order: true,
	lineClamp: true,

	borderImageOutset: true,
	borderImageSlice: true,
	borderImageWidth: true,
	fontWeight: true,
	lineHeight: true,
	opacity: true,
	orphans: true,
	tabSize: true,
	widows: true,
	zIndex: true,
	zoom: true,

	fillOpacity: true,
	floodOpacity: true,
	stopOpacity: true,
	strokeDasharray: true,
	strokeDashoffset: true,
	strokeMiterlimit: true,
	strokeOpacity: true,
	strokeWidth: true
};

function autoPx(name, val) {
	{
		// typeof val === 'number' is faster but fails for numeric strings
		return !isNaN(val) && !unitlessProps[name] ? (val + "px") : val;
	}
}

// assumes if styles exist both are objects or both are strings
function patchStyle(n, o) {
	var ns =     (n.attrs || emptyObj).style;
	var os = o ? (o.attrs || emptyObj).style : null;

	// replace or remove in full
	if (ns == null || isVal(ns))
		{ n.el.style.cssText = ns; }
	else {
		for (var nn in ns) {
			var nv = ns[nn];

			{
				if (isStream(nv))
					{ nv = hookStream(nv, getVm(n)); }
			}

			if (os == null || nv != null && nv !== os[nn])
				{ n.el.style[nn] = autoPx(nn, nv); }
		}

		// clean old
		if (os) {
			for (var on in os) {
				if (ns[on] == null)
					{ n.el.style[on] = ""; }
			}
		}
	}
}

var didQueue = [];

function fireHook(hooks, name, o, n, immediate) {
	if (hooks != null) {
		var fn = o.hooks[name];

		if (fn) {
			if (name[0] === "d" && name[1] === "i" && name[2] === "d") {	// did*
				//	console.log(name + " should queue till repaint", o, n);
				immediate ? repaint(o.parent) && fn(o, n) : didQueue.push([fn, o, n]);
			}
			else {		// will*
				//	console.log(name + " may delay by promise", o, n);
				return fn(o, n);		// or pass  done() resolver
			}
		}
	}
}

function drainDidHooks(vm) {
	if (didQueue.length) {
		repaint(vm.node);

		var item;
		while (item = didQueue.shift())
			{ item[0](item[1], item[2]); }
	}
}

var doc = ENV_DOM ? document : null;

function closestVNode(el) {
	while (el._node == null)
		{ el = el.parentNode; }
	return el._node;
}

function createElement(tag, ns) {
	if (ns != null)
		{ return doc.createElementNS(ns, tag); }
	return doc.createElement(tag);
}

function createTextNode(body) {
	return doc.createTextNode(body);
}

function createComment(body) {
	return doc.createComment(body);
}

// ? removes if !recycled
function nextSib(sib) {
	return sib.nextSibling;
}

// ? removes if !recycled
function prevSib(sib) {
	return sib.previousSibling;
}

// TODO: this should collect all deep proms from all hooks and return Promise.all()
function deepNotifyRemove(node) {
	var vm = node.vm;

	var wuRes = vm != null && fireHook(vm.hooks, "willUnmount", vm, vm.data);

	var wrRes = fireHook(node.hooks, "willRemove", node);

	if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE && isArr(node.body)) {
		for (var i = 0; i < node.body.length; i++)
			{ deepNotifyRemove(node.body[i]); }
	}

	return wuRes || wrRes;
}

function _removeChild(parEl, el, immediate) {
	var node = el._node, vm = node.vm;

	if (isArr(node.body)) {
		if ((node.flags & DEEP_REMOVE) === DEEP_REMOVE) {
			for (var i = 0; i < node.body.length; i++)
				{ _removeChild(el, node.body[i].el); }
		}
		else
			{ deepUnref(node); }
	}

	delete el._node;

	parEl.removeChild(el);

	fireHook(node.hooks, "didRemove", node, null, immediate);

	if (vm != null) {
		fireHook(vm.hooks, "didUnmount", vm, vm.data, immediate);
		vm.node = null;
	}
}

// todo: should delay parent unmount() by returning res prom?
function removeChild(parEl, el) {
	var node = el._node;

	// already marked for removal
	if (node._dead) { return; }

	var res = deepNotifyRemove(node);

	if (res != null && isProm(res)) {
		node._dead = true;
		res.then(curry(_removeChild, [parEl, el, true]));
	}
	else
		{ _removeChild(parEl, el); }
}

function deepUnref(node) {
	var obody = node.body;

	for (var i = 0; i < obody.length; i++) {
		var o2 = obody[i];
		delete o2.el._node;

		if (o2.vm != null)
			{ o2.vm.node = null; }

		if (isArr(o2.body))
			{ deepUnref(o2); }
	}
}

function clearChildren(parent) {
	var parEl = parent.el;

	if ((parent.flags & DEEP_REMOVE) === 0) {
		isArr(parent.body) && deepUnref(parent);
		parEl.textContent = null;
	}
	else {
		var el = parEl.firstChild;

		do {
			var next = nextSib(el);
			removeChild(parEl, el);
		} while (el = next);
	}
}

// todo: hooks
function insertBefore(parEl, el, refEl) {
	var node = el._node, inDom = el.parentNode != null;

	// el === refEl is asserted as a no-op insert called to fire hooks
	var vm = (el === refEl || !inDom) ? node.vm : null;

	if (vm != null)
		{ fireHook(vm.hooks, "willMount", vm, vm.data); }

	fireHook(node.hooks, inDom ? "willReinsert" : "willInsert", node);
	parEl.insertBefore(el, refEl);
	fireHook(node.hooks, inDom ? "didReinsert" : "didInsert", node);

	if (vm != null)
		{ fireHook(vm.hooks, "didMount", vm, vm.data); }
}

function insertAfter(parEl, el, refEl) {
	insertBefore(parEl, el, refEl ? nextSib(refEl) : null);
}

var onemit = {};

function emitCfg(cfg) {
	assignObj(onemit, cfg);
}

function emit(evName) {
	var targ = this,
		src = targ;

	var args = sliceArgs(arguments, 1).concat(src, src.data);

	do {
		var evs = targ.onemit;
		var fn = evs ? evs[evName] : null;

		if (fn) {
			fn.apply(targ, args);
			break;
		}
	} while (targ = targ.parent());

	if (onemit[evName])
		{ onemit[evName].apply(targ, args); }
}

var onevent = noop;

function config(newCfg) {
	onevent = newCfg.onevent || onevent;

	{
		if (newCfg.onemit)
			{ emitCfg(newCfg.onemit); }
	}

	{
		if (newCfg.stream)
			{ streamCfg(newCfg.stream); }
	}
}

function bindEv(el, type, fn) {
	el[type] = fn;
}

function exec(fn, args, e, node, vm) {
	var out = fn.apply(vm, args.concat([e, node, vm, vm.data]));

	// should these respect out === false?
	vm.onevent(e, node, vm, vm.data, args);
	onevent.call(null, e, node, vm, vm.data, args);

	if (out === false) {
		e.preventDefault();
		e.stopPropagation();
	}
}

function handle(e) {
	var node = closestVNode(e.target);
	var vm = getVm(node);

	var evDef = e.currentTarget._node.attrs["on" + e.type], fn, args;

	if (isArr(evDef)) {
		fn = evDef[0];
		args = evDef.slice(1);
		exec(fn, args, e, node, vm);
	}
	else {
		for (var sel in evDef) {
			if (e.target.matches(sel)) {
				var evDef2 = evDef[sel];

				if (isArr(evDef2)) {
					fn = evDef2[0];
					args = evDef2.slice(1);
				}
				else {
					fn = evDef2;
					args = [];
				}

				exec(fn, args, e, node, vm);
			}
		}
	}
}

function patchEvent(node, name, nval, oval) {
	if (nval === oval)
		{ return; }

	{
		if (isFunc(nval) && isFunc(oval) && oval.name == nval.name)
			{ devNotify("INLINE_HANDLER", [node, oval, nval]); }

		if (oval != null && nval != null &&
			(
				isArr(oval) != isArr(nval) ||
				isPlainObj(oval) != isPlainObj(nval) ||
				isFunc(oval) != isFunc(nval)
			)
		) { devNotify("MISMATCHED_HANDLER", [node, oval, nval]); }
	}

	var el = node.el;

	if (nval == null || isFunc(nval))
		{ bindEv(el, name, nval); }
	else if (oval == null)
		{ bindEv(el, name, handle); }
}

function remAttr(node, name, asProp) {
	if (name[0] === ".") {
		name = name.substr(1);
		asProp = true;
	}

	if (asProp)
		{ node.el[name] = ""; }
	else
		{ node.el.removeAttribute(name); }
}

// setAttr
// diff, ".", "on*", bool vals, skip _*, value/checked/selected selectedIndex
function setAttr(node, name, val, asProp, initial) {
	var el = node.el;

	if (val == null)
		{ !initial && remAttr(node, name, false); }		// will also removeAttr of style: null
	else if (node.ns != null)
		{ el.setAttribute(name, val); }
	else if (name === "class")
		{ el.className = val; }
	else if (name === "id" || typeof val === "boolean" || asProp)
		{ el[name] = val; }
	else if (name[0] === ".")
		{ el[name.substr(1)] = val; }
	else
		{ el.setAttribute(name, val); }
}

function patchAttrs(vnode, donor, initial) {
	var nattrs = vnode.attrs || emptyObj;
	var oattrs = donor.attrs || emptyObj;

	if (nattrs === oattrs) {
		{ devNotify("REUSED_ATTRS", [vnode]); }
	}
	else {
		for (var key in nattrs) {
			var nval = nattrs[key];
			var isDyn = isDynProp(vnode.tag, key);
			var oval = isDyn ? vnode.el[key] : oattrs[key];

			{
				if (isStream(nval))
					{ nattrs[key] = nval = hookStream(nval, getVm(vnode)); }
			}

			if (nval === oval) {}
			else if (isStyleProp(key))
				{ patchStyle(vnode, donor); }
			else if (isSplProp(key)) {}
			else if (isEvProp(key))
				{ patchEvent(vnode, key, nval, oval); }
			else
				{ setAttr(vnode, key, nval, isDyn, initial); }
		}

		// TODO: bench style.cssText = "" vs removeAttribute("style")
		for (var key in oattrs) {
			!(key in nattrs) &&
			!isSplProp(key) &&
			remAttr(vnode, key, isDynProp(vnode.tag, key) || isEvProp(key));
		}
	}
}

function createView(view, data, key, opts) {
	if (view.type === VVIEW) {
		data	= view.data;
		key		= view.key;
		opts	= view.opts;
		view	= view.view;
	}

	return new ViewModel(view, data, key, opts);
}

//import { XML_NS, XLINK_NS } from './defineSvgElement';
function hydrateBody(vnode) {
	for (var i = 0; i < vnode.body.length; i++) {
		var vnode2 = vnode.body[i];
		var type2 = vnode2.type;

		// ELEMENT,TEXT,COMMENT
		if (type2 <= COMMENT)
			{ insertBefore(vnode.el, hydrate(vnode2)); }		// vnode.el.appendChild(hydrate(vnode2))
		else if (type2 === VVIEW) {
			var vm = createView(vnode2.view, vnode2.data, vnode2.key, vnode2.opts)._redraw(vnode, i, false);		// todo: handle new data updates
			type2 = vm.node.type;
			insertBefore(vnode.el, hydrate(vm.node));
		}
		else if (type2 === VMODEL) {
			var vm = vnode2.vm;
			vm._redraw(vnode, i);					// , false
			type2 = vm.node.type;
			insertBefore(vnode.el, vm.node.el);		// , hydrate(vm.node)
		}
	}
}

//  TODO: DRY this out. reusing normal patch here negatively affects V8's JIT
function hydrate(vnode, withEl) {
	if (vnode.el == null) {
		if (vnode.type === ELEMENT) {
			vnode.el = withEl || createElement(vnode.tag, vnode.ns);

		//	if (vnode.tag === "svg")
		//		vnode.el.setAttributeNS(XML_NS, 'xmlns:xlink', XLINK_NS);

			if (vnode.attrs != null)
				{ patchAttrs(vnode, emptyObj, true); }

			if ((vnode.flags & LAZY_LIST) === LAZY_LIST)	// vnode.body instanceof LazyList
				{ vnode.body.body(vnode); }

			if (isArr(vnode.body))
				{ hydrateBody(vnode); }
			else if (vnode.body != null && vnode.body !== "")
				{ vnode.el.textContent = vnode.body; }
		}
		else if (vnode.type === TEXT)
			{ vnode.el = withEl || createTextNode(vnode.body); }
		else if (vnode.type === COMMENT)
			{ vnode.el = withEl || createComment(vnode.body); }
	}

	vnode.el._node = vnode;

	return vnode.el;
}

// prevent GCC from inlining some large funcs (which negatively affects Chrome's JIT)
//window.syncChildren = syncChildren;
window.lisMove = lisMove;

function nextNode(node, body) {
	return body[node.idx + 1];
}

function prevNode(node, body) {
	return body[node.idx - 1];
}

function parentNode(node) {
	return node.parent;
}

var BREAK = 1;
var BREAK_ALL = 2;

function syncDir(advSib, advNode, insert, sibName, nodeName, invSibName, invNodeName, invInsert) {
	return function(node, parEl, body, state, convTest, lis) {
		var sibNode, tmpSib;

		if (state[sibName] != null) {
			// skip dom elements not created by domvm
			if ((sibNode = state[sibName]._node) == null) {
				{ devNotify("FOREIGN_ELEMENT", [state[sibName]]); }

				state[sibName] = advSib(state[sibName]);
				return;
			}

			if (parentNode(sibNode) !== node) {
				tmpSib = advSib(state[sibName]);
				sibNode.vm != null ? sibNode.vm.unmount(true) : removeChild(parEl, state[sibName]);
				state[sibName] = tmpSib;
				return;
			}
		}

		if (state[nodeName] == convTest)
			{ return BREAK_ALL; }
		else if (state[nodeName].el == null) {
			insert(parEl, hydrate(state[nodeName]), state[sibName]);	// should lis be updated here?
			state[nodeName] = advNode(state[nodeName], body);		// also need to advance sib?
		}
		else if (state[nodeName].el === state[sibName]) {
			state[nodeName] = advNode(state[nodeName], body);
			state[sibName] = advSib(state[sibName]);
		}
		// head->tail or tail->head
		else if (!lis && sibNode === state[invNodeName]) {
			tmpSib = state[sibName];
			state[sibName] = advSib(tmpSib);
			invInsert(parEl, tmpSib, state[invSibName]);
			state[invSibName] = tmpSib;
		}
		else {
			{
				if (state[nodeName].vm != null)
					{ devNotify("ALREADY_HYDRATED", [state[nodeName].vm]); }
			}

			if (lis && state[sibName] != null)
				{ return lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state); }

			return BREAK;
		}
	};
}

function lisMove(advSib, advNode, insert, sibName, nodeName, parEl, body, sibNode, state) {
	if (sibNode._lis) {
		insert(parEl, state[nodeName].el, state[sibName]);
		state[nodeName] = advNode(state[nodeName], body);
	}
	else {
		// find closest tomb
		var t = binaryFindLarger(sibNode.idx, state.tombs);
		sibNode._lis = true;
		var tmpSib = advSib(state[sibName]);
		insert(parEl, state[sibName], t != null ? body[state.tombs[t]].el : t);

		if (t == null)
			{ state.tombs.push(sibNode.idx); }
		else
			{ state.tombs.splice(t, 0, sibNode.idx); }

		state[sibName] = tmpSib;
	}
}

var syncLft = syncDir(nextSib, nextNode, insertBefore, "lftSib", "lftNode", "rgtSib", "rgtNode", insertAfter);
var syncRgt = syncDir(prevSib, prevNode, insertAfter, "rgtSib", "rgtNode", "lftSib", "lftNode", insertBefore);

function syncChildren(node, donor) {
	var obody	= donor.body,
		parEl	= node.el,
		body	= node.body,
		state = {
			lftNode:	body[0],
			rgtNode:	body[body.length - 1],
			lftSib:		((obody)[0] || emptyObj).el,
			rgtSib:		(obody[obody.length - 1] || emptyObj).el,
		};

	converge:
	while (1) {
//		from_left:
		while (1) {
			var l = syncLft(node, parEl, body, state, null, false);
			if (l === BREAK) { break; }
			if (l === BREAK_ALL) { break converge; }
		}

//		from_right:
		while (1) {
			var r = syncRgt(node, parEl, body, state, state.lftNode, false);
			if (r === BREAK) { break; }
			if (r === BREAK_ALL) { break converge; }
		}

		sortDOM(node, parEl, body, state);
		break;
	}
}

// TODO: also use the state.rgtSib and state.rgtNode bounds, plus reduce LIS range
function sortDOM(node, parEl, body, state) {
	var kids = Array.prototype.slice.call(parEl.childNodes);
	var domIdxs = [];

	for (var k = 0; k < kids.length; k++) {
		var n = kids[k]._node;

		if (n.parent === node)
			{ domIdxs.push(n.idx); }
	}

	// list of non-movable vnode indices (already in correct order in old dom)
	var tombs = longestIncreasingSubsequence(domIdxs).map(function (i) { return domIdxs[i]; });

	for (var i = 0; i < tombs.length; i++)
		{ body[tombs[i]]._lis = true; }

	state.tombs = tombs;

	while (1) {
		var r = syncLft(node, parEl, body, state, null, true);
		if (r === BREAK_ALL) { break; }
	}
}

function alreadyAdopted(vnode) {
	return vnode.el._node.parent !== vnode.parent;
}

function takeSeqIndex(n, obody, fromIdx) {
	return obody[fromIdx];
}

function findSeqThorough(n, obody, fromIdx) {		// pre-tested isView?
	for (; fromIdx < obody.length; fromIdx++) {
		var o = obody[fromIdx];

		if (o.vm != null) {
			// match by key & viewFn || vm
			if (n.type === VVIEW && o.vm.view === n.view && o.vm.key === n.key || n.type === VMODEL && o.vm === n.vm)
				{ return o; }
		}
		else if (!alreadyAdopted(o) && n.tag === o.tag && n.type === o.type && n.key === o.key && (n.flags & ~DEEP_REMOVE) === (o.flags & ~DEEP_REMOVE))
			{ return o; }
	}

	return null;
}

function findHashKeyed(n, obody, fromIdx) {
	return obody[obody._keys[n.key]];
}

/*
// list must be a sorted list of vnodes by key
function findBinKeyed(n, list) {
	var idx = binaryKeySearch(list, n.key);
	return idx > -1 ? list[idx] : null;
}
*/

// have it handle initial hydrate? !donor?
// types (and tags if ELEM) are assumed the same, and donor exists
function patch(vnode, donor) {
	fireHook(donor.hooks, "willRecycle", donor, vnode);

	var el = vnode.el = donor.el;

	var obody = donor.body;
	var nbody = vnode.body;

	el._node = vnode;

	// "" => ""
	if (vnode.type === TEXT && nbody !== obody) {
		el.nodeValue = nbody;
		return;
	}

	if (vnode.attrs != null || donor.attrs != null)
		{ patchAttrs(vnode, donor, false); }

	// patch events

	var oldIsArr = isArr(obody);
	var newIsArr = isArr(nbody);
	var lazyList = (vnode.flags & LAZY_LIST) === LAZY_LIST;

//	var nonEqNewBody = nbody != null && nbody !== obody;

	if (oldIsArr) {
		// [] => []
		if (newIsArr || lazyList)
			{ patchChildren(vnode, donor); }
		// [] => "" | null
		else if (nbody !== obody) {
			if (nbody != null)
				{ el.textContent = nbody; }
			else
				{ clearChildren(donor); }
		}
	}
	else {
		// "" | null => []
		if (newIsArr) {
			clearChildren(donor);
			hydrateBody(vnode);
		}
		// "" | null => "" | null
		else if (nbody !== obody) {
			if (el.firstChild)
				{ el.firstChild.nodeValue = nbody; }
			else
				{ el.textContent = nbody; }
		}
	}

	fireHook(donor.hooks, "didRecycle", donor, vnode);
}

// larger qtys of KEYED_LIST children will use binary search
//const SEQ_FAILS_MAX = 100;

// TODO: modify vtree matcher to work similar to dom reconciler for keyed from left -> from right -> head/tail -> binary
// fall back to binary if after failing nri - nli > SEQ_FAILS_MAX
// while-advance non-keyed fromIdx
// [] => []
function patchChildren(vnode, donor) {
	var nbody		= vnode.body,
		nlen		= nbody.length,
		obody		= donor.body,
		olen		= obody.length,
		isLazy		= (vnode.flags & LAZY_LIST) === LAZY_LIST,
		isFixed		= (vnode.flags & FIXED_BODY) === FIXED_BODY,
		isKeyed		= (vnode.flags & KEYED_LIST) === KEYED_LIST,
		domSync		= !isFixed && vnode.type === ELEMENT,
		doFind		= true,
		find		= (
			isKeyed ? findHashKeyed :				// keyed lists/lazyLists
			isFixed || isLazy ? takeSeqIndex :		// unkeyed lazyLists and FIXED_BODY
			findSeqThorough							// more complex stuff
		);

	if (isKeyed) {
		var keys = {};
		for (var i = 0; i < obody.length; i++)
			{ keys[obody[i].key] = i; }
		obody._keys = keys;
	}

	if (domSync && nlen === 0) {
		clearChildren(donor);
		if (isLazy)
			{ vnode.body = []; }	// nbody.tpl(all);
		return;
	}

	var donor2,
		node2,
		foundIdx,
		patched = 0,
		everNonseq = false,
		fromIdx = 0;		// first unrecycled node (search head)

	if (isLazy) {
		var fnode2 = {key: null};
		var nbodyNew = Array(nlen);
	}

	for (var i = 0; i < nlen; i++) {
		if (isLazy) {
			var remake = false;
			var diffRes = null;

			if (doFind) {
				if (isKeyed)
					{ fnode2.key = nbody.key(i); }

				donor2 = find(fnode2, obody, fromIdx);
			}

			if (donor2 != null) {
                foundIdx = donor2.idx;
				diffRes = nbody.diff(i, donor2);

				// diff returns same, so cheaply adopt vnode without patching
				if (diffRes === true) {
					node2 = donor2;
					node2.parent = vnode;
					node2.idx = i;
					node2._lis = false;
				}
				// diff returns new diffVals, so generate new vnode & patch
				else
					{ remake = true; }
			}
			else
				{ remake = true; }

			if (remake) {
				node2 = nbody.tpl(i);			// what if this is a VVIEW, VMODEL, injected element?
				preProc(node2, vnode, i);

				node2._diff = diffRes != null ? diffRes : nbody.diff(i);

				if (donor2 != null)
					{ patch(node2, donor2); }
			}
			else {
				// TODO: flag tmp FIXED_BODY on unchanged nodes?

				// domSync = true;		if any idx changes or new nodes added/removed
			}

			nbodyNew[i] = node2;
		}
		else {
			var node2 = nbody[i];
			var type2 = node2.type;

			// ELEMENT,TEXT,COMMENT
			if (type2 <= COMMENT) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {
					patch(node2, donor2);
					foundIdx = donor2.idx;
				}
			}
			else if (type2 === VVIEW) {
				if (donor2 = doFind && find(node2, obody, fromIdx)) {		// update/moveTo
					foundIdx = donor2.idx;
					var vm = donor2.vm._update(node2.data, vnode, i);		// withDOM
				}
				else
					{ var vm = createView(node2.view, node2.data, node2.key, node2.opts)._redraw(vnode, i, false); }	// createView, no dom (will be handled by sync below)

				type2 = vm.node.type;
			}
			else if (type2 === VMODEL) {
				// if the injected vm has never been rendered, this vm._update() serves as the
				// initial vtree creator, but must avoid hydrating (creating .el) because syncChildren()
				// which is responsible for mounting below (and optionally hydrating), tests .el presence
				// to determine if hydration & mounting are needed
				var withDOM = isHydrated(node2.vm);

				var vm = node2.vm._update(node2.data, vnode, i, withDOM);
				type2 = vm.node.type;
			}
		}

		// found donor & during a sequential search ...at search head
		if (!isKeyed && donor2 != null) {
			if (foundIdx === fromIdx) {
				// advance head
				fromIdx++;
				// if all old vnodes adopted and more exist, stop searching
				if (fromIdx === olen && nlen > olen) {
					// short-circuit find, allow loop just create/init rest
					donor2 = null;
					doFind = false;
				}
			}
			else
				{ everNonseq = true; }

			if (olen > 100 && everNonseq && ++patched % 10 === 0)
				{ while (fromIdx < olen && alreadyAdopted(obody[fromIdx]))
					{ fromIdx++; } }
		}
	}

	// replace List w/ new body
	if (isLazy)
		{ vnode.body = nbodyNew; }

	domSync && syncChildren(vnode, donor);
}

function DOMInstr(withTime) {
	var isEdge = navigator.userAgent.indexOf("Edge") !== -1;
	var isIE = navigator.userAgent.indexOf("Trident/") !== -1;
	var getDescr = Object.getOwnPropertyDescriptor;
	var defProp = Object.defineProperty;

	var nodeProto = Node.prototype;
	var textContent = getDescr(nodeProto, "textContent");
	var nodeValue = getDescr(nodeProto, "nodeValue");

	var htmlProto = HTMLElement.prototype;
	var innerText = getDescr(htmlProto, "innerText");

	var elemProto	= Element.prototype;
	var innerHTML	= getDescr(!isIE ? elemProto : htmlProto, "innerHTML");
	var className	= getDescr(!isIE ? elemProto : htmlProto, "className");
	var id			= getDescr(!isIE ? elemProto : htmlProto, "id");

	var styleProto	= CSSStyleDeclaration.prototype;

	var cssText		= getDescr(styleProto, "cssText");

	var inpProto = HTMLInputElement.prototype;
	var areaProto = HTMLTextAreaElement.prototype;
	var selProto = HTMLSelectElement.prototype;
	var optProto = HTMLOptionElement.prototype;

	var inpChecked = getDescr(inpProto, "checked");
	var inpVal = getDescr(inpProto, "value");

	var areaVal = getDescr(areaProto, "value");

	var selVal = getDescr(selProto, "value");
	var selIndex = getDescr(selProto, "selectedIndex");

	var optSel = getDescr(optProto, "selected");

	// onclick, onkey*, etc..

	// var styleProto = CSSStyleDeclaration.prototype;
	// var setProperty = getDescr(styleProto, "setProperty");

	var origOps = {
		"document.createElement": null,
		"document.createElementNS": null,
		"document.createTextNode": null,
		"document.createComment": null,
		"document.createDocumentFragment": null,

		"DocumentFragment.prototype.insertBefore": null,		// appendChild

		"Element.prototype.appendChild": null,
		"Element.prototype.removeChild": null,
		"Element.prototype.insertBefore": null,
		"Element.prototype.replaceChild": null,
		"Element.prototype.remove": null,

		"Element.prototype.setAttribute": null,
		"Element.prototype.setAttributeNS": null,
		"Element.prototype.removeAttribute": null,
		"Element.prototype.removeAttributeNS": null,

		// assign?
		// dataset, classlist, any props like .onchange

		// .style.setProperty, .style.cssText
	};

	var counts = {};
	var start = null;

	function ctxName(opName) {
		var opPath = opName.split(".");
		var o = window;
		while (opPath.length > 1)
			{ o = o[opPath.shift()]; }

		return {ctx: o, last: opPath[0]};
	}

	for (var opName in origOps) {
		var p = ctxName(opName);

		if (origOps[opName] === null)
			{ origOps[opName] = p.ctx[p.last]; }

		(function(opName, opShort) {
			counts[opShort] = 0;
			p.ctx[opShort] = function() {
				counts[opShort]++;
				return origOps[opName].apply(this, arguments);
			};
		})(opName, p.last);
	}

	counts.textContent = 0;
	defProp(nodeProto, "textContent", {
		set: function(s) {
			counts.textContent++;
			textContent.set.call(this, s);
		},
	});

	counts.nodeValue = 0;
	defProp(nodeProto, "nodeValue", {
		set: function(s) {
			counts.nodeValue++;
			nodeValue.set.call(this, s);
		},
	});

	counts.innerText = 0;
	defProp(htmlProto, "innerText", {
		set: function(s) {
			counts.innerText++;
			innerText.set.call(this, s);
		},
	});

	counts.innerHTML = 0;
	defProp(!isIE ? elemProto : htmlProto, "innerHTML", {
		set: function(s) {
			counts.innerHTML++;
			innerHTML.set.call(this, s);
		},
	});

	counts.className = 0;
	defProp(!isIE ? elemProto : htmlProto, "className", {
		set: function(s) {
			counts.className++;
			className.set.call(this, s);
		},
	});

	counts.cssText = 0;
	defProp(styleProto, "cssText", {
		set: function(s) {
			counts.cssText++;
			cssText.set.call(this, s);
		},
	});

	counts.id = 0;
	defProp(!isIE ? elemProto : htmlProto, "id", {
		set: function(s) {
			counts.id++;
			id.set.call(this, s);
		},
	});

	counts.checked = 0;
	defProp(inpProto, "checked", {
		set: function(s) {
			counts.checked++;
			inpChecked.set.call(this, s);
		},
	});

	counts.value = 0;
	defProp(inpProto, "value", {
		set: function(s) {
			counts.value++;
			inpVal.set.call(this, s);
		},
	});

	defProp(areaProto, "value", {
		set: function(s) {
			counts.value++;
			areaVal.set.call(this, s);
		},
	});

	defProp(selProto, "value", {
		set: function(s) {
			counts.value++;
			selVal.set.call(this, s);
		},
	});

	counts.selectedIndex = 0;
	defProp(selProto, "selectedIndex", {
		set: function(s) {
			counts.selectedIndex++;
			selIndex.set.call(this, s);
		},
	});

	counts.selected = 0;
	defProp(optProto, "selected", {
		set: function(s) {
			counts.selected++;
			optSel.set.call(this, s);
		},
	});

	/*
	counts.setProperty = 0;
	defProp(styleProto, "setProperty", {
		set: function(s) {
			counts.setProperty++;
			setProperty.set.call(this, s);
		},
	});
	*/

	function reset() {
		for (var i in counts)
			{ counts[i] = 0; }
	}

	this.start = function() {
		start = +new Date;
	};

	this.end = function() {
		var _time = +new Date - start;
		start = null;
/*
		for (var opName in origOps) {
			var p = ctxName(opName);
			p.ctx[p.last] = origOps[opName];
		}

		defProp(nodeProto, "textContent", textContent);
		defProp(nodeProto, "nodeValue", nodeValue);
		defProp(htmlProto, "innerText", innerText);
		defProp(!isIE ? elemProto : htmlProto, "innerHTML", innerHTML);
		defProp(!isIE ? elemProto : htmlProto, "className", className);
		defProp(!isIE ? elemProto : htmlProto, "id", id);
		defProp(inpProto,  "checked", inpChecked);
		defProp(inpProto,  "value", inpVal);
		defProp(areaProto, "value", areaVal);
		defProp(selProto,  "value", selVal);
		defProp(selProto,  "selectedIndex", selIndex);
		defProp(optProto,  "selected", optSel);
	//	defProp(styleProto, "setProperty", setProperty);
		defProp(styleProto, "cssText", cssText);
*/
		var out = {};

		for (var i in counts)
			{ if (counts[i] > 0)
				{ out[i] = counts[i]; } }

		reset();

		if (withTime)
			{ out._time = _time; }

		return out;
	};
}

var instr = null;

{
	if (DEVMODE.mutations) {
		instr = new DOMInstr(true);
	}
}

// view + key serve as the vm's unique identity
function ViewModel(view, data, key, opts) {
	var vm = this;

	vm.view = view;
	vm.data = data;
	vm.key = key;

	{
		if (isStream(data))
			{ vm._stream = hookStream2(data, vm); }
	}

	if (opts) {
		vm.opts = opts;
		vm.config(opts);
	}

	var out = isPlainObj(view) ? view : view.call(vm, vm, data, key, opts);

	if (isFunc(out))
		{ vm.render = out; }
	else {
		vm.render = out.render;
		vm.config(out);
	}

	// these must be wrapped here since they're debounced per view
	vm._redrawAsync = raft(function (_) { return vm.redraw(true); });
	vm._updateAsync = raft(function (newData) { return vm.update(newData, true); });

	vm.init && vm.init.call(vm, vm, vm.data, vm.key, opts);
}

var ViewModelProto = ViewModel.prototype = {
	constructor: ViewModel,

	_diff:	null,	// diff cache

	init:	null,
	view:	null,
	key:	null,
	data:	null,
	state:	null,
	api:	null,
	opts:	null,
	node:	null,
	hooks:	null,
	onevent: noop,
	refs:	null,
	render:	null,

	mount: mount,
	unmount: unmount,
	config: function(opts) {
		var t = this;

		if (opts.init)
			{ t.init = opts.init; }
		if (opts.diff)
			{ t.diff = opts.diff; }
		if (opts.onevent)
			{ t.onevent = opts.onevent; }

		// maybe invert assignment order?
		if (opts.hooks)
			{ t.hooks = assignObj(t.hooks || {}, opts.hooks); }

		{
			if (opts.onemit)
				{ t.onemit = assignObj(t.onemit || {}, opts.onemit); }
		}
	},
	parent: function() {
		return getVm(this.node.parent);
	},
	root: function() {
		var p = this.node;

		while (p.parent)
			{ p = p.parent; }

		return p.vm;
	},
	redraw: function(sync) {
		{
			if (DEVMODE.syncRedraw) {
				sync = true;
			}
		}
		var vm = this;
		sync ? vm._redraw(null, null, isHydrated(vm)) : vm._redrawAsync();
		return vm;
	},
	update: function(newData, sync) {
		{
			if (DEVMODE.syncRedraw) {
				sync = true;
			}
		}
		var vm = this;
		sync ? vm._update(newData, null, null, isHydrated(vm)) : vm._updateAsync(newData);
		return vm;
	},

	_update: updateSync,
	_redraw: redrawSync,
	_redrawAsync: null,
	_updateAsync: null,
};

function mount(el, isRoot) {
	var vm = this;

	{
		if (DEVMODE.mutations)
			{ instr.start(); }
	}

	if (isRoot) {
		clearChildren({el: el, flags: 0});

		vm._redraw(null, null, false);

		// if placeholder node doesnt match root tag
		if (el.nodeName.toLowerCase() !== vm.node.tag) {
			hydrate(vm.node);
			insertBefore(el.parentNode, vm.node.el, el);
			el.parentNode.removeChild(el);
		}
		else
			{ insertBefore(el.parentNode, hydrate(vm.node, el), el); }
	}
	else {
		vm._redraw(null, null);

		if (el)
			{ insertBefore(el, vm.node.el); }
	}

	if (el)
		{ drainDidHooks(vm); }

	{
		if (DEVMODE.mutations)
			{ console.log(instr.end()); }
	}

	return vm;
}

// asSub means this was called from a sub-routine, so don't drain did* hook queue
function unmount(asSub) {
	var vm = this;

	{
		if (isStream(vm._stream))
			{ unsubStream(vm._stream); }
	}

	var node = vm.node;
	var parEl = node.el.parentNode;

	// edge bug: this could also be willRemove promise-delayed; should .then() or something to make sure hooks fire in order
	removeChild(parEl, node.el);

	if (!asSub)
		{ drainDidHooks(vm); }
}

function reParent(vm, vold, newParent, newIdx) {
	if (newParent != null) {
		newParent.body[newIdx] = vold;
		vold.idx = newIdx;
		vold.parent = newParent;
		vold._lis = false;
	}
	return vm;
}

function redrawSync(newParent, newIdx, withDOM) {
	var isRedrawRoot = newParent == null;
	var vm = this;
	var isMounted = vm.node && vm.node.el && vm.node.el.parentNode;

	{
		// was mounted (has node and el), but el no longer has parent (unmounted)
		if (isRedrawRoot && vm.node && vm.node.el && !vm.node.el.parentNode)
			{ devNotify("UNMOUNTED_REDRAW", [vm]); }

		if (isRedrawRoot && DEVMODE.mutations && isMounted)
			{ instr.start(); }
	}

	var vold = vm.node, oldDiff, newDiff;

	if (vm.diff != null) {
		oldDiff = vm._diff;
		vm._diff = newDiff = vm.diff(vm, vm.data);

		if (vold != null) {
			var cmpFn = isArr(oldDiff) ? cmpArr : cmpObj;
			var isSame = oldDiff === newDiff || cmpFn(oldDiff, newDiff);

			if (isSame)
				{ return reParent(vm, vold, newParent, newIdx); }
		}
	}

	isMounted && fireHook(vm.hooks, "willRedraw", vm, vm.data);

	var vnew = vm.render.call(vm, vm, vm.data, oldDiff, newDiff);

	if (vnew === vold)
		{ return reParent(vm, vold, newParent, newIdx); }

	// todo: test result of willRedraw hooks before clearing refs
	vm.refs = null;

	// always assign vm key to root vnode (this is a de-opt)
	if (vm.key != null && vnew.key !== vm.key)
		{ vnew.key = vm.key; }

	vm.node = vnew;

	if (newParent) {
		preProc(vnew, newParent, newIdx, vm);
		newParent.body[newIdx] = vnew;
	}
	else if (vold && vold.parent) {
		preProc(vnew, vold.parent, vold.idx, vm);
		vold.parent.body[vold.idx] = vnew;
	}
	else
		{ preProc(vnew, null, null, vm); }

	if (withDOM !== false) {
		if (vold) {
			// root node replacement
			if (vold.tag !== vnew.tag || vold.key !== vnew.key) {
				// hack to prevent the replacement from triggering mount/unmount
				vold.vm = vnew.vm = null;

				var parEl = vold.el.parentNode;
				var refEl = nextSib(vold.el);
				removeChild(parEl, vold.el);
				insertBefore(parEl, hydrate(vnew), refEl);

				// another hack that allows any higher-level syncChildren to set
				// reconciliation bounds using a live node
				vold.el = vnew.el;

				// restore
				vnew.vm = vm;
			}
			else
				{ patch(vnew, vold); }
		}
		else
			{ hydrate(vnew); }
	}

	isMounted && fireHook(vm.hooks, "didRedraw", vm, vm.data);

	if (isRedrawRoot && isMounted)
		{ drainDidHooks(vm); }

	{
		if (isRedrawRoot && DEVMODE.mutations && isMounted)
			{ console.log(instr.end()); }
	}

	return vm;
}

// this also doubles as moveTo
// TODO? @withRedraw (prevent redraw from firing)
function updateSync(newData, newParent, newIdx, withDOM) {
	var vm = this;

	if (newData != null) {
		if (vm.data !== newData) {
			{
				devNotify("DATA_REPLACED", [vm, vm.data, newData]);
			}
			fireHook(vm.hooks, "willUpdate", vm, newData);
			vm.data = newData;

			{
				if (isStream(vm._stream))
					{ unsubStream(vm._stream); }
				if (isStream(newData))
					{ vm._stream = hookStream2(newData, vm); }
			}
		}
	}

	return vm._redraw(newParent, newIdx, withDOM);
}

function defineElement(tag, arg1, arg2, flags) {
	var attrs, body;

	if (arg2 == null) {
		if (isPlainObj(arg1))
			{ attrs = arg1; }
		else
			{ body = arg1; }
	}
	else {
		attrs = arg1;
		body = arg2;
	}

	return initElementNode(tag, attrs, body, flags);
}

//export const XML_NS = "http://www.w3.org/2000/xmlns/";
var SVG_NS = "http://www.w3.org/2000/svg";

function defineSvgElement(tag, arg1, arg2, flags) {
	var n = defineElement(tag, arg1, arg2, flags);
	n.ns = SVG_NS;
	return n;
}

function defineComment(body) {
	var node = new VNode;
	node.type = COMMENT;
	node.body = body;
	return node;
}

// placeholder for declared views
function VView(view, data, key, opts) {
	this.view = view;
	this.data = data;
	this.key = key;
	this.opts = opts;
}

VView.prototype = {
	constructor: VView,

	type: VVIEW,
	view: null,
	data: null,
	key: null,
	opts: null,
};

function defineView(view, data, key, opts) {
	return new VView(view, data, key, opts);
}

// placeholder for injected ViewModels
function VModel(vm) {
	this.vm = vm;
}

VModel.prototype = {
	constructor: VModel,

	type: VMODEL,
	vm: null,
};

function injectView(vm) {
//	if (vm.node == null)
//		vm._redraw(null, null, false);

//	return vm.node;

	return new VModel(vm);
}

function injectElement(el) {
	var node = new VNode;
	node.type = ELEMENT;
	node.el = node.key = el;
	return node;
}

function lazyList(items, cfg) {
	var len = items.length;

	var self = {
		items: items,
		length: len,
		// defaults to returning item identity (or position?)
		key: function(i) {
			return cfg.key(items[i], i);
		},
		// default returns 0?
		diff: function(i, donor) {
			var newVals = cfg.diff(items[i], i);
			if (donor == null)
				{ return newVals; }
			var oldVals = donor._diff;
			var same = newVals === oldVals || isArr(oldVals) ? cmpArr(newVals, oldVals) : cmpObj(newVals, oldVals);
			return same || newVals;
		},
		tpl: function(i) {
			return cfg.tpl(items[i], i);
		},
		map: function(tpl) {
			cfg.tpl = tpl;
			return self;
		},
		body: function(vnode) {
			var nbody = Array(len);

			for (var i = 0; i < len; i++) {
				var vnode2 = self.tpl(i);

			//	if ((vnode.flags & KEYED_LIST) === KEYED_LIST && self. != null)
			//		vnode2.key = getKey(item);

				vnode2._diff = self.diff(i);			// holds oldVals for cmp

				nbody[i] = vnode2;

				// run preproc pass (should this be just preProc in above loop?) bench
				preProc(vnode2, vnode, i);
			}

			// replace List with generated body
			vnode.body = nbody;
		}
	};

	return self;
}

var nano = {
	config: config,

	ViewModel: ViewModel,
	VNode: VNode,

	createView: createView,

	defineElement: defineElement,
	defineSvgElement: defineSvgElement,
	defineText: defineText,
	defineComment: defineComment,
	defineView: defineView,

	injectView: injectView,
	injectElement: injectElement,

	lazyList: lazyList,

	FIXED_BODY: FIXED_BODY,
	DEEP_REMOVE: DEEP_REMOVE,
	KEYED_LIST: KEYED_LIST,
	LAZY_LIST: LAZY_LIST,
};

function protoPatch(n, doRepaint) {
	patch$1(this, n, doRepaint);
}

// newNode can be either {class: style: } or full new VNode
// will/didPatch hooks?
function patch$1(o, n, doRepaint) {
	if (n.type != null) {
		// no full patching of view roots, just use redraw!
		if (o.vm != null)
			{ return; }

		preProc(n, o.parent, o.idx, null);
		o.parent.body[o.idx] = n;
		patch(n, o);
		doRepaint && repaint(n);
		drainDidHooks(getVm(n));
	}
	else {
		// TODO: re-establish refs

		// shallow-clone target
		var donor = Object.create(o);
		// fixate orig attrs
		donor.attrs = assignObj({}, o.attrs);
		// assign new attrs into live targ node
		var oattrs = assignObj(o.attrs, n);
		// prepend any fixed shorthand class
		if (o._class != null) {
			var aclass = oattrs.class;
			oattrs.class = aclass != null && aclass !== "" ? o._class + " " + aclass : o._class;
		}

		patchAttrs(o, donor);

		doRepaint && repaint(o);
	}
}

VNodeProto.patch = protoPatch;

function nextSubVms(n, accum) {
	var body = n.body;

	if (isArr(body)) {
		for (var i = 0; i < body.length; i++) {
			var n2 = body[i];

			if (n2.vm != null)
				{ accum.push(n2.vm); }
			else
				{ nextSubVms(n2, accum); }
		}
	}

	return accum;
}

function defineElementSpread(tag) {
	var args = arguments;
	var len = args.length;
	var body, attrs;

	if (len > 1) {
		var bodyIdx = 1;

		if (isPlainObj(args[1])) {
			attrs = args[1];
			bodyIdx = 2;
		}

		if (len === bodyIdx + 1 && (isVal(args[bodyIdx]) || isArr(args[bodyIdx]) || attrs && (attrs._flags & LAZY_LIST) === LAZY_LIST))
			{ body = args[bodyIdx]; }
		else
			{ body = sliceArgs(args, bodyIdx); }
	}

	return initElementNode(tag, attrs, body);
}

function defineSvgElementSpread() {
	var n = defineElementSpread.apply(null, arguments);
	n.ns = SVG_NS;
	return n;
}

ViewModelProto.emit = emit;
ViewModelProto.onemit = null;

ViewModelProto.body = function() {
	return nextSubVms(this.node, []);
};

nano.defineElementSpread = defineElementSpread;
nano.defineSvgElementSpread = defineSvgElementSpread;

ViewModelProto._stream = null;

function protoAttach(el) {
	var vm = this;
	if (vm.node == null)
		{ vm._redraw(null, null, false); }

	attach(vm.node, el);

	return vm;
}

// very similar to hydrate, TODO: dry
function attach(vnode, withEl) {
	vnode.el = withEl;
	withEl._node = vnode;

	var nattrs = vnode.attrs;

	for (var key in nattrs) {
		var nval = nattrs[key];
		var isDyn = isDynProp(vnode.tag, key);

		if (isStyleProp(key) || isSplProp(key)) {}
		else if (isEvProp(key))
			{ patchEvent(vnode, key, nval); }
		else if (nval != null && isDyn)
			{ setAttr(vnode, key, nval, isDyn); }
	}

	if ((vnode.flags & LAZY_LIST) === LAZY_LIST)
		{ vnode.body.body(vnode); }

	if (isArr(vnode.body) && vnode.body.length > 0) {
		var c = withEl.firstChild;
		var i = 0;
		var v = vnode.body[i];
		do {
			if (v.type === VVIEW)
				{ v = createView(v.view, v.data, v.key, v.opts)._redraw(vnode, i, false).node; }
			else if (v.type === VMODEL)
				{ v = v.node || v._redraw(vnode, i, false).node; }

			{
				if (vnode.tag === "table" && v.tag === "tr") {
					devNotify("ATTACH_IMPLICIT_TBODY", [vnode, v]);
				}
			}

			attach(v, c);
		} while ((c = c.nextSibling) && (v = vnode.body[++i]))
	}
}

function vmProtoHtml(dynProps) {
	var vm = this;

	if (vm.node == null)
		{ vm._redraw(null, null, false); }

	return html(vm.node, dynProps);
}

function vProtoHtml(dynProps) {
	return html(this, dynProps);
}

function camelDash(val) {
	return val.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function styleStr(css) {
	var style = "";

	for (var pname in css) {
		if (css[pname] != null)
			{ style += camelDash(pname) + ": " + autoPx(pname, css[pname]) + '; '; }
	}

	return style;
}

function toStr(val) {
	return val == null ? '' : ''+val;
}

var voidTags = {
    area: true,
    base: true,
    br: true,
    col: true,
    command: true,
    embed: true,
    hr: true,
    img: true,
    input: true,
    keygen: true,
    link: true,
    meta: true,
    param: true,
    source: true,
    track: true,
	wbr: true
};

function escHtml(s) {
	s = toStr(s);

	for (var i = 0, out = ''; i < s.length; i++) {
		switch (s[i]) {
			case '&': out += '&amp;';  break;
			case '<': out += '&lt;';   break;
			case '>': out += '&gt;';   break;
		//	case '"': out += '&quot;'; break;
		//	case "'": out += '&#039;'; break;
		//	case '/': out += '&#x2f;'; break;
			default:  out += s[i];
		}
	}

	return out;
}

function escQuotes(s) {
	s = toStr(s);

	for (var i = 0, out = ''; i < s.length; i++)
		{ out += s[i] === '"' ? '&quot;' : s[i]; }		// also &?

	return out;
}

function eachHtml(arr, dynProps) {
	var buf = '';
	for (var i = 0; i < arr.length; i++)
		{ buf += html(arr[i], dynProps); }
	return buf;
}

var innerHTML = ".innerHTML";

function html(node, dynProps) {
	var out, style;

	switch (node.type) {
		case VVIEW:
			out = createView(node.view, node.data, node.key, node.opts).html(dynProps);
			break;
		case VMODEL:
			out = node.vm.html();
			break;
		case ELEMENT:
			if (node.el != null && node.tag == null) {
				out = node.el.outerHTML;		// pre-existing dom elements (does not currently account for any props applied to them)
				break;
			}

			var buf = "";

			buf += "<" + node.tag;

			var attrs = node.attrs,
				hasAttrs = attrs != null;

			if (hasAttrs) {
				for (var pname in attrs) {
					if (isEvProp(pname) || pname[0] === "." || pname[0] === "_" || dynProps === false && isDynProp(node.tag, pname))
						{ continue; }

					var val = attrs[pname];

					if (pname === "style" && val != null) {
						style = typeof val === "object" ? styleStr(val) : val;
						continue;
					}

					if (val === true)
						{ buf += " " + escHtml(pname) + '=""'; }
					else if (val === false) {}
					else if (val != null)
						{ buf += " " + escHtml(pname) + '="' + escQuotes(val) + '"'; }
				}

				if (style != null)
					{ buf += ' style="' + escQuotes(style.trim()) + '"'; }
			}

			// if body-less svg node, auto-close & return
			if (node.body == null && node.ns != null && node.tag !== "svg")
				{ return buf + "/>"; }
			else
				{ buf += ">"; }

			if (!voidTags[node.tag]) {
				if (hasAttrs && attrs[innerHTML] != null)
					{ buf += attrs[innerHTML]; }
				else if (isArr(node.body))
					{ buf += eachHtml(node.body, dynProps); }
				else if ((node.flags & LAZY_LIST) === LAZY_LIST) {
					node.body.body(node);
					buf += eachHtml(node.body, dynProps);
				}
				else
					{ buf += escHtml(node.body); }

				buf += "</" + node.tag + ">";
			}
			out = buf;
			break;
		case TEXT:
			out = escHtml(node.body);
			break;
		case COMMENT:
			out = "<!--" + escHtml(node.body) + "-->";
			break;
	}

	return out;
}

ViewModelProto.attach = protoAttach;

ViewModelProto.html = vmProtoHtml;
VNodeProto.html = vProtoHtml;

nano.DEVMODE = DEVMODE;

return nano;

})));
//# sourceMappingURL=domvm.dev.js.map


/***/ }),

/***/ "../styles/timepicker.scss":
/*!*********************************!*\
  !*** ../styles/timepicker.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "../ts-common/Keymanager.ts":
/*!**********************************!*\
  !*** ../ts-common/Keymanager.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getHotKeyCode(code) {
    var matches = code.toLowerCase().match(/\w+/g);
    var comp = 0;
    var key = "";
    for (var i = 0; i < matches.length; i++) {
        var check = matches[i];
        if (check === "ctrl") {
            comp += 4;
        }
        else if (check === "shift") {
            comp += 2;
        }
        else if (check === "alt") {
            comp += 1;
        }
        else {
            key = check;
        }
    }
    return comp + key;
}
var KeyManager = /** @class */ (function () {
    function KeyManager() {
        var _this = this;
        this._keysStorage = {};
        document.addEventListener("keydown", function (e) {
            var comp = (e.ctrlKey || e.metaKey ? 4 : 0) + (e.shiftKey ? 2 : 0) + (e.altKey ? 1 : 0);
            var key;
            if ((e.which >= 48 && e.which <= 57) || (e.which >= 65 && e.which <= 90)) { // A-Z 0-9
                key = String.fromCharCode(e.which);
            }
            else {
                key = e.key;
            }
            var code = comp + key.toLowerCase();
            var actions = _this._keysStorage[code];
            if (actions) {
                for (var i = 0; i < actions.length; i++) {
                    actions[i].handler(e);
                }
            }
        });
    }
    KeyManager.prototype.addHotKey = function (key, handler, scope) {
        var code = getHotKeyCode(key);
        if (!this._keysStorage[code]) {
            this._keysStorage[code] = [];
        }
        this._keysStorage[code].push({
            handler: handler,
            scope: scope
        });
    };
    KeyManager.prototype.removeHotKey = function (key, scope) {
        var keyStorage = this._keysStorage;
        if (key) {
            var code = getHotKeyCode(key);
            delete keyStorage[code];
        }
        if (scope) {
            for (var code in keyStorage) {
                var toDelete = []; // items index to delete
                for (var i = 0; i < keyStorage[code].length; i++) {
                    if (keyStorage[code][i].scope === scope) {
                        toDelete.push(i);
                    }
                }
                if (keyStorage[code].length === toDelete.length) {
                    delete keyStorage[code];
                }
                else {
                    for (var i = toDelete.length - 1; i >= 0; i--) { // begin from last coz splice change other index
                        keyStorage[code].splice(toDelete[i], 1);
                    }
                }
            }
        }
    };
    KeyManager.prototype.exist = function (key) {
        var code = getHotKeyCode(key);
        return !!this._keysStorage[code];
    };
    return KeyManager;
}());
exports.keyManager = new KeyManager();
function addHotkeys(handlers, beforeCall) {
    var context = new Date();
    var wrapHandler = function (handler) { return function (e) {
        if (beforeCall && beforeCall() === false) {
            return;
        }
        handler(e);
    }; };
    for (var key in handlers) {
        exports.keyManager.addHotKey(key, wrapHandler(handlers[key]), context);
    }
    return function () { return exports.keyManager.removeHotKey(undefined, context); };
}
exports.addHotkeys = addHotkeys;


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

/***/ "../ts-common/dom.ts":
/*!***************************!*\
  !*** ../ts-common/dom.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom = __webpack_require__(/*! domvm/dist/dev/domvm.dev.js */ "../node_modules/domvm/dist/dev/domvm.dev.js");
exports.el = dom.defineElement;
exports.sv = dom.defineSvgElement;
exports.view = dom.defineView;
exports.create = dom.createView;
exports.inject = dom.injectView;
function disableHelp() {
    dom.DEVMODE.mutations = false;
    dom.DEVMODE.warnings = false;
    dom.DEVMODE.verbose = false;
    dom.DEVMODE.UNKEYED_INPUT = false;
}
exports.disableHelp = disableHelp;
function resizer(handler) {
    var resize = window.ResizeObserver;
    var activeHandler = function (node) {
        var height = node.el.offsetHeight;
        var width = node.el.offsetWidth;
        handler(width, height);
    };
    if (resize) {
        return exports.el("div.dhx-resize-observer", {
            _hooks: {
                didInsert: function (node) {
                    new resize(function () { return activeHandler(node); }).observe(node.el);
                }
            }
        });
    }
    return exports.el("iframe.dhx-resize-observer", {
        _hooks: {
            didInsert: function (node) {
                node.el.contentWindow.onresize = function () { return activeHandler(node); };
                activeHandler(node);
            }
        }
    });
}
exports.resizer = resizer;


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

/***/ "../ts-common/view.ts":
/*!****************************!*\
  !*** ../ts-common/view.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(/*! ./core */ "../ts-common/core.ts");
var html_1 = __webpack_require__(/*! ./html */ "../ts-common/html.ts");
var View = /** @class */ (function () {
    function View(_container, config) {
        this._uid = core_1.uid();
        this.config = config || {};
    }
    View.prototype.mount = function (container, vnode) {
        if (vnode) {
            this._view = vnode;
        }
        if (container && this._view && this._view.mount) {
            // init view inside of HTML container
            this._container = html_1.toNode(container);
            if (this._container.tagName) {
                this._view.mount(this._container);
            }
            else if (this._container.attach) {
                this._container.attach(this);
            }
        }
    };
    View.prototype.unmount = function () {
        var rootView = this.getRootView();
        if (rootView && rootView.node) {
            rootView.unmount();
            this._view = null;
        }
    };
    View.prototype.getRootView = function () {
        return this._view;
    };
    View.prototype.getRootNode = function () {
        return this._view && this._view.node && this._view.node.el;
    };
    View.prototype.paint = function () {
        if (this._view && ( // was mounted
        this._view.node || // already rendered node
            this._container)) { // not rendered, but has container
            this._doNotRepaint = false;
            this._view.redraw();
        }
    };
    return View;
}());
exports.View = View;
function toViewLike(view) {
    return {
        getRootView: function () { return view; },
        paint: function () { return view.node && view.redraw(); },
        mount: function (container) { return view.mount(container); }
    };
}
exports.toViewLike = toViewLike;


/***/ }),

/***/ "../ts-layout/index.ts":
/*!*****************************!*\
  !*** ../ts-layout/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/Layout */ "../ts-layout/sources/Layout.ts"));


/***/ }),

/***/ "../ts-layout/sources/Cell.ts":
/*!************************************!*\
  !*** ../ts-layout/sources/Cell.ts ***!
  \************************************/
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
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var resizeMode;
(function (resizeMode) {
    resizeMode[resizeMode["unknown"] = 0] = "unknown";
    resizeMode[resizeMode["percents"] = 1] = "percents";
    resizeMode[resizeMode["pixels"] = 2] = "pixels";
    resizeMode[resizeMode["mixedpx1"] = 3] = "mixedpx1";
    resizeMode[resizeMode["mixedpx2"] = 4] = "mixedpx2";
    resizeMode[resizeMode["mixedperc1"] = 5] = "mixedperc1";
    resizeMode[resizeMode["mixedperc2"] = 6] = "mixedperc2";
})(resizeMode || (resizeMode = {}));
function getResizeMode(dir, conf1, conf2) {
    var field = dir ? "width" : "height";
    var is1perc = conf1[field] && conf1[field].indexOf("%") !== -1;
    var is2perc = conf2[field] && conf2[field].indexOf("%") !== -1;
    var is1px = conf1[field] && conf1[field].indexOf("px") !== -1;
    var is2px = conf2[field] && conf2[field].indexOf("px") !== -1;
    if (is1perc && is2perc) {
        return resizeMode.percents;
    }
    if (is1px && is2px) {
        return resizeMode.pixels;
    }
    if (is1px && !is2px) {
        return resizeMode.mixedpx1;
    }
    if (is2px && !is1px) {
        return resizeMode.mixedpx2;
    }
    if (is1perc) {
        return resizeMode.mixedperc1;
    }
    if (is2perc) {
        return resizeMode.mixedperc2;
    }
    return resizeMode.unknown;
}
function getBlockRange(block1, block2, isXLayout) {
    if (isXLayout === void 0) { isXLayout = true; }
    if (isXLayout) {
        return {
            min: block1.left + window.pageXOffset,
            max: block2.right + window.pageXOffset
        };
    }
    return {
        min: block1.top + window.pageYOffset,
        max: block2.bottom + window.pageYOffset
    };
}
var Cell = /** @class */ (function (_super) {
    __extends(Cell, _super);
    function Cell(parent, config) {
        var _this = _super.call(this, parent, core_1.extend({ gravity: true }, config)) || this;
        var p = parent;
        if (p && p.isVisible) {
            _this._parent = p;
        }
        _this.config.full = _this.config.full === undefined ? Boolean(_this.config.header || _this.config.collapsable) : _this.config.full;
        _this._initHandlers();
        _this.id = _this.config.id || core_1.uid();
        return _this;
    }
    Cell.prototype.paint = function () {
        if (this.isVisible()) {
            var view = this.getRootView();
            if (view) {
                view.redraw();
            }
            else {
                this._parent.paint();
            }
        }
    };
    Cell.prototype.isVisible = function () {
        // top level node
        if (!this._parent) {
            if (this._container && this._container.tagName) {
                return true;
            }
            return Boolean(this.getRootNode());
        }
        // check active view in case of multiview
        var active = this._parent.config.activeView;
        if (active && active !== this.id) {
            return false;
        }
        // check that all parents of the cell are visible as well
        return !this.config.hidden && (!this._parent || this._parent.isVisible());
    };
    Cell.prototype.hide = function () {
        this.config.hidden = true;
        if (this._parent && this._parent.paint) {
            this._parent.paint();
        }
    };
    Cell.prototype.show = function () {
        if (this._parent && this._parent.config.activeView) {
            this._parent.config.activeView = this.id;
        }
        else {
            this.config.hidden = false;
        }
        if (this._parent && !this._parent.isVisible()) {
            this._parent.show();
        }
        this.paint();
    };
    Cell.prototype.getParent = function () {
        return this._parent;
    };
    Cell.prototype.destructor = function () {
        this.config = null;
        this.unmount();
    };
    Cell.prototype.getWidget = function () {
        return this._ui;
    };
    Cell.prototype.getCellView = function () {
        return this._parent && this._parent.getRefs(this._uid);
    };
    Cell.prototype.attach = function (name, config) {
        this.config.html = null;
        if (typeof name === "object") {
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    }
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Cell.prototype.attachHTML = function (html) {
        this.config.html = html;
        this.paint();
    };
    Cell.prototype.toVDOM = function (nodes) {
        var _a;
        var conf = this.config;
        if (conf.hidden) {
            return;
        }
        var style = this._calculateStyle();
        var stylePadding = core_1.isDefined(this.config.padding) ? { padding: this.config.padding } : {};
        var kids;
        if (!this.config.html) {
            if (this._ui) {
                var view = this._ui.getRootView();
                if (view.render) {
                    view = dom_1.inject(view);
                }
                kids = [view];
            }
            else {
                kids = nodes || null;
            }
        }
        var resizer = this.config.resizable && !this._isLastCell() && !this.config.collapsed ?
            dom_1.el(".dhx_layout-resizer." + (this._isXDirection() ? "dhx_layout-resizer--x" : "dhx_layout-resizer--y"), __assign({}, this._resizerHandlers, { _ref: "resizer_" + this._uid }), [dom_1.el("span.dhx_layout-resizer__icon", {
                    class: "dxi " + (this._isXDirection() ? "dxi-dots-vertical" : "dxi-dots-horizontal")
                })]) : null;
        var handlers = {};
        if (this.config.on) {
            for (var key in this.config.on) {
                handlers["on" + key] = this.config.on[key];
            }
        }
        var cell = dom_1.el("div", __assign((_a = { _key: this._uid, style: this.config.full || this.config.html ? style : __assign({}, style, stylePadding), _ref: this._uid }, _a["aria-labelledby"] = this.config.id ? "tab-content-" + this.config.id : null, _a), handlers, { class: this._getCss(false) +
                (this.config.css ? " " + this.config.css : "") +
                (this.config.collapsed ? " dhx_layout-cell--collapsed" : "") +
                (this.config.resizable ? " dhx_layout-cell--resizeble" : "") +
                //  только для селов
                (this.config.gravity ? " dhx_layout-cell--gravity" : "") +
                (this.config.isAccordion ? " dhx_layout-cell--accordion" : "") }), this.config.full ? [
            dom_1.el("div", {
                tabindex: this.config.collapsable ? "0" : "-1",
                class: "dhx_layout-cell-header" +
                    (this._isXDirection() ? " dhx_layout-cell-header--col" : " dhx_layout-cell-header--row") +
                    (this.config.collapsable ? " dhx_layout-cell-header--collapseble" : "") +
                    (this.config.collapsed ? " dhx_layout-cell-header--collapsed" : "") +
                    (((this.getParent() || {}).config || {}).isAccordion ? " dhx_layout-cell-header--accordion" : ""),
                onclick: this._handlers.collapse,
                onkeydown: this._handlers.enterCollapse
            }, [
                this.config.headerIcon && dom_1.el("span.dhx_layout-cell-header__icon" + this.config.headerIcon),
                this.config.headerImage && dom_1.el(".dhx_layout-cell-header__image-wrapper", [
                    dom_1.el("img", {
                        src: this.config.headerImage,
                        class: "dhx_layout-cell-header__image",
                    })
                ]),
                this.config.header && dom_1.el("h3.dhx_layout-cell-header__title", this.config.header),
                this.config.collapsable && dom_1.el("div.dhx_layout-cell-header__collapse-icon", {
                    class: this._getCollapseIcon()
                }),
            ]),
            !this.config.collapsed ? dom_1.el("div", {
                "style": this.config.html || nodes ? stylePadding : null,
                ".innerHTML": this.config.html,
                "class": this._getCss(true) + " dhx_layout-cell-content",
            }, kids) : null
        ] : (this.config.html ? [
            dom_1.el(".dhx_layout-cell-content", {
                ".innerHTML": this.config.html,
                "style": stylePadding,
            })
        ] : kids));
        return resizer ? [
            cell,
            resizer
        ] : cell;
    };
    Cell.prototype._getCss = function (_content) {
        return "dhx_layout-cell";
    };
    Cell.prototype._initHandlers = function () {
        var _this = this;
        var blockOpts = {
            left: null,
            top: null,
            isActive: false,
            range: null,
            xLayout: null,
            nextCell: null,
            size: null,
            resizerLength: null,
            mode: null,
            percentsum: null
        };
        var mouseUp = function () {
            blockOpts.isActive = false;
            document.body.classList.remove("dhx_no-select--resize");
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        };
        var mouseMove = function (e) {
            if (!blockOpts.isActive || blockOpts.mode === resizeMode.unknown) {
                return;
            }
            var newValue = blockOpts.xLayout ? e.x - blockOpts.range.min - window.pageXOffset :
                e.y - blockOpts.range.min - window.pageYOffset;
            var prop = blockOpts.xLayout ? "width" : "height";
            if (newValue < 0) {
                newValue = blockOpts.resizerLength / 2;
            }
            else if (newValue > blockOpts.size) {
                newValue = blockOpts.size - blockOpts.resizerLength;
            }
            switch (blockOpts.mode) {
                case resizeMode.pixels:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    blockOpts.nextCell.config[prop] = blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.mixedpx1:
                    _this.config[prop] = newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.mixedpx2:
                    blockOpts.nextCell.config[prop] = blockOpts.size - newValue - blockOpts.resizerLength / 2 + "px";
                    break;
                case resizeMode.percents:
                    _this.config[prop] = newValue / blockOpts.size * blockOpts.percentsum + "%";
                    blockOpts.nextCell.config[prop] = (blockOpts.size - newValue) / blockOpts.size * blockOpts.percentsum + "%";
                    break;
                case resizeMode.mixedperc1:
                    _this.config[prop] = newValue / blockOpts.size * blockOpts.percentsum + "%";
                    break;
                case resizeMode.mixedperc2:
                    blockOpts.nextCell.config[prop] = (blockOpts.size - newValue) / blockOpts.size * blockOpts.percentsum + "%";
                    break;
            }
            _this.paint();
        };
        this._handlers = {
            enterCollapse: function (e) {
                if (e.keyCode === 13) {
                    _this._handlers.collapse();
                }
            },
            collapse: function () {
                if (!_this.config.collapsable) {
                    return;
                }
                _this.config.collapsed = !_this.config.collapsed;
                _this.paint();
            }
        };
        this._resizerHandlers = {
            onmousedown: function (e) {
                if (e.which === 3) {
                    return;
                }
                if (blockOpts.isActive) {
                    mouseUp();
                }
                document.body.classList.add("dhx_no-select--resize");
                var block = _this.getCellView();
                var nextCell = _this._getNextCell();
                var nextBlock = nextCell.getCellView();
                var resizerBlock = _this._getResizerView();
                var blockOffsets = block.el.getBoundingClientRect();
                var resizerOffsets = resizerBlock.el.getBoundingClientRect();
                var nextBlockOffsets = nextBlock.el.getBoundingClientRect();
                blockOpts.xLayout = _this._isXDirection();
                blockOpts.left = blockOffsets.left + window.pageXOffset;
                blockOpts.top = blockOffsets.top + window.pageYOffset;
                blockOpts.range = getBlockRange(blockOffsets, nextBlockOffsets, blockOpts.xLayout);
                blockOpts.size = blockOpts.range.max - blockOpts.range.min;
                blockOpts.isActive = true;
                blockOpts.nextCell = nextCell;
                blockOpts.resizerLength = blockOpts.xLayout ? resizerOffsets.width : resizerOffsets.height;
                blockOpts.mode = getResizeMode(blockOpts.xLayout, _this.config, nextCell.config);
                if (blockOpts.mode === resizeMode.percents) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = parseFloat(_this.config[field]) + parseFloat(nextCell.config[field]);
                }
                if (blockOpts.mode === resizeMode.mixedperc1) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = 1 / (blockOffsets[field] / (blockOpts.size - blockOpts.resizerLength)) * parseFloat(_this.config[field]);
                }
                if (blockOpts.mode === resizeMode.mixedperc2) {
                    var field = blockOpts.xLayout ? "width" : "height";
                    blockOpts.percentsum = 1 / (nextBlockOffsets[field] / (blockOpts.size - blockOpts.resizerLength)) * parseFloat(nextCell.config[field]);
                }
                document.addEventListener("mouseup", mouseUp);
                document.addEventListener("mousemove", mouseMove);
            },
            ondragstart: function (e) { return e.preventDefault(); }
        };
    };
    Cell.prototype._getCollapseIcon = function () {
        if (this._isXDirection() && this.config.collapsed) {
            return "dxi dxi-chevron-right";
        }
        if (this._isXDirection() && !this.config.collapsed) {
            return "dxi dxi-chevron-left";
        }
        if (!this._isXDirection() && this.config.collapsed) {
            return "dxi dxi-chevron-up";
        }
        if (!this._isXDirection() && !this.config.collapsed) {
            return "dxi dxi-chevron-down";
        }
    };
    Cell.prototype._isLastCell = function () {
        var parent = this._parent;
        return parent && parent._cells.indexOf(this) === parent._cells.length - 1;
    };
    Cell.prototype._getNextCell = function () {
        var parent = this._parent;
        var index = parent._cells.indexOf(this);
        return parent._cells[index + 1];
    };
    Cell.prototype._getResizerView = function () {
        return this._parent.getRefs("resizer_" + this._uid);
    };
    Cell.prototype._isXDirection = function () {
        return this._parent && this._parent._xLayout;
    };
    Cell.prototype._calculateStyle = function () {
        var config = this.config;
        var style = {};
        if (this._isXDirection()) {
            if (config.width !== undefined && !config.collapsed) {
                style.flexBasis = config.width;
                style.width = config.width;
            }
            if (config.height !== undefined) {
                style.height = config.height;
            }
        }
        else {
            if (config.height !== undefined && !config.collapsed) {
                style.flexBasis = config.height;
                style.height = config.height;
            }
            if (config.width !== undefined) {
                style.width = config.width;
            }
        }
        // if (config.padding) {
        // 	style.padding = config.padding;
        // }
        return style;
    };
    return Cell;
}(view_1.View));
exports.Cell = Cell;


/***/ }),

/***/ "../ts-layout/sources/Layout.ts":
/*!**************************************!*\
  !*** ../ts-layout/sources/Layout.ts ***!
  \**************************************/
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
var Cell_1 = __webpack_require__(/*! ./Cell */ "../ts-layout/sources/Cell.ts");
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(parent, config) {
        var _this = _super.call(this, parent, config) || this;
        // root layout
        _this._root = _this.config.parent || _this;
        _this._all = {};
        _this._parseConfig();
        if (_this.config.views) {
            _this.config.activeView = _this.config.activeView || _this._cells[0].id;
            _this._isViewLayout = true;
        }
        if (!config.parent) {
            var view = dom_1.create({ render: function () { return _this.toVDOM(); } }, _this);
            _this.mount(parent, view);
        }
        return _this;
    }
    Layout.prototype.cell = function (id) {
        // FIXME
        return this._root._all[id];
    };
    Layout.prototype.toVDOM = function () {
        if (this._isViewLayout) {
            var roots = [this.cell(this.config.activeView).toVDOM()];
            return _super.prototype.toVDOM.call(this, roots);
        }
        var nodes = [];
        this._cells.forEach(function (cell) {
            var node = cell.toVDOM();
            if (Array.isArray(node)) {
                nodes = nodes.concat(node);
            }
            else {
                nodes.push(node);
            }
        });
        return _super.prototype.toVDOM.call(this, nodes);
    };
    Layout.prototype.removeCell = function (id) {
        var root = (this.config.parent || this);
        if (root !== this) {
            return root.removeCell(id);
        }
        // this === root layout
        var view = this.cell(id);
        if (view) {
            var parent_1 = view.getParent();
            delete this._all[id];
            parent_1._cells = parent_1._cells.filter(function (cell) { return cell.id !== id; });
            parent_1.paint();
        }
    };
    Layout.prototype.addCell = function (config, index) {
        if (index === void 0) { index = -1; }
        var view = this._createCell(config);
        if (index < 0) {
            index = this._cells.length + index + 1;
        }
        this._cells.splice(index, 0, view);
        this.paint();
    };
    Layout.prototype.getId = function (index) {
        if (index < 0) {
            index = this._cells.length + index;
        }
        return this._cells[index] ? this._cells[index].id : undefined;
    };
    Layout.prototype.getRefs = function (name) {
        return this._root.getRootView().refs[name];
    };
    Layout.prototype._getCss = function (content) {
        var layoutCss = this._xLayout ? "dhx_layout-columns" : "dhx_layout-rows";
        var directionCss = this.config.align ? " " + layoutCss + "--" + this.config.align : "";
        if (content) {
            return layoutCss + " dhx_layout-cell" + (this.config.align ? " dhx_layout-cell--" + this.config.align : "");
        }
        else {
            var cellCss = this.config.parent ? _super.prototype._getCss.call(this) : "dhx_widget dhx_layout";
            var fullModeCss = this.config.parent ? "" : " dhx_layout-cell";
            return cellCss + (this.config.full ? fullModeCss : " " + layoutCss) + directionCss;
        }
    };
    Layout.prototype._parseConfig = function () {
        var _this = this;
        var config = this.config;
        var cells = config.rows || config.cols || config.views || [];
        this._xLayout = !config.rows;
        this._cells = cells.map(function (a) { return _this._createCell(a); });
    };
    Layout.prototype._createCell = function (cell) {
        var view;
        if (cell.rows || cell.cols || cell.views) {
            cell.parent = this._root;
            view = new Layout(this, cell);
        }
        else {
            view = new Cell_1.Cell(this, cell);
        }
        // FIxME
        this._root._all[view.id] = view;
        return view;
    };
    return Layout;
}(Cell_1.Cell));
exports.Layout = Layout;


/***/ }),

/***/ "../ts-popup/index.ts":
/*!****************************!*\
  !*** ../ts-popup/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/Popup */ "../ts-popup/sources/Popup.ts"));
__export(__webpack_require__(/*! ./sources/types */ "../ts-popup/sources/types.ts"));


/***/ }),

/***/ "../ts-popup/sources/Popup.ts":
/*!************************************!*\
  !*** ../ts-popup/sources/Popup.ts ***!
  \************************************/
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
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-popup/sources/types.ts");
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, null, core_1.extend({}, config)) || this;
        var popup = _this._popup = document.createElement("div");
        popup.className = "dhx_widget dhx_popup" + (_this.config.css ? " " + _this.config.css : "");
        popup.style.position = "absolute";
        _this.mount(popup, dom_1.create({
            render: function () { return _this.toVDOM(); }
        }));
        _this._clickEvent = function (e) { return _this.events.fire(types_1.PopupEvents.click, [e]); };
        _this.events = config.events || new events_1.EventSystem(_this);
        _this._isActive = false;
        return _this;
    }
    Popup.prototype.show = function (node, config, attached) {
        var _this = this;
        if (config === void 0) { config = {}; }
        if (!this.events.fire(types_1.PopupEvents.beforeShow, [node])) {
            return;
        }
        node = html_1.toNode(node);
        if (this._isActive) {
            this._setPopupSize(node, config);
            return;
        }
        if (attached) {
            this.attach(attached);
        }
        setTimeout(function () {
            _this._popup.style.left = "0";
            _this._popup.style.top = "0";
            document.body.appendChild(_this._popup);
            _this._setPopupSize(node, config);
            _this._isActive = true;
            _this.events.fire(types_1.PopupEvents.afterShow, [node]);
            _this._outerClickDestructor = _this._detectOuterClick(node);
        });
    };
    Popup.prototype.hide = function () {
        this._hide(false, null);
    };
    Popup.prototype.isVisible = function () {
        return this._isActive;
    };
    Popup.prototype.attach = function (name, config) {
        this._html = null;
        if (typeof name === "object") {
            this._ui = name;
        }
        else if (typeof name === "string") {
            this._ui = new window.dhx[name](null, config);
        }
        else if (typeof name === "function") {
            if (name.prototype instanceof view_1.View) {
                this._ui = new name(null, config);
            }
            else {
                this._ui = {
                    getRootView: function () {
                        return name(config);
                    }
                };
            }
        }
        this.paint();
        return this._ui;
    };
    Popup.prototype.attachHTML = function (html) {
        this._html = html;
        this.paint();
    };
    Popup.prototype.getWidget = function () {
        return this._ui;
    };
    Popup.prototype.getContainer = function () {
        return this.getRootView().refs.content.el;
    };
    Popup.prototype.toVDOM = function () {
        var view;
        if (this._html) {
            view = dom_1.el(".dhx_popup__inner-html-content", {
                ".innerHTML": this._html
            });
        }
        else {
            view = this._ui ? this._ui.getRootView() : null;
            if (view && view.render) {
                view = dom_1.inject(view);
            }
        }
        return dom_1.el("div", {
            class: "dhx_popup-content",
            onclick: this._clickEvent,
            _key: this._uid,
            _ref: "content"
        }, [view]);
    };
    Popup.prototype.destructor = function () {
        this.hide();
        if (this._outerClickDestructor) {
            this._outerClickDestructor();
        }
        this._popup = null;
    };
    Popup.prototype._setPopupSize = function (node, config, calls) {
        var _this = this;
        if (calls === void 0) { calls = 3; }
        var _a = this._popup.getBoundingClientRect(), width = _a.width, height = _a.height;
        // TODO: IE popup height = 0
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
        if (calls && (width === 0 || height === 0)) {
            this._timeout = setTimeout(function () {
                if (!_this._isActive) {
                    return;
                }
                _this._setPopupSize(node, config, calls - 1);
                _this._timeout = null;
            });
            return;
        }
        var _b = html_1.fitPosition(node, __assign({ centering: true, mode: html_1.Position.bottom }, config, { width: width, height: height })), left = _b.left, top = _b.top;
        this._popup.style.left = left;
        this._popup.style.top = top;
    };
    Popup.prototype._detectOuterClick = function (node) {
        var _this = this;
        var outerClick = function (e) {
            var target = e.target;
            while (target) {
                if (target === node || target === _this._popup) {
                    return;
                }
                target = target.parentNode;
            }
            if (_this._hide(true, e)) {
                document.removeEventListener("click", outerClick);
            }
        };
        document.addEventListener("click", outerClick);
        return function () { return document.removeEventListener("click", outerClick); };
    };
    Popup.prototype._hide = function (fromOuterClick, e) {
        if (this._isActive) {
            if (!this.events.fire(types_1.PopupEvents.beforeHide, [fromOuterClick, e])) {
                return false;
            }
            document.body.removeChild(this._popup);
            this._isActive = false;
            if (this._outerClickDestructor) {
                this._outerClickDestructor();
                this._outerClickDestructor = null;
            }
            this.events.fire(types_1.PopupEvents.afterHide, [e]);
            return true;
        }
    };
    return Popup;
}(view_1.View));
exports.Popup = Popup;


/***/ }),

/***/ "../ts-popup/sources/types.ts":
/*!************************************!*\
  !*** ../ts-popup/sources/types.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PopupEvents;
(function (PopupEvents) {
    PopupEvents["beforeHide"] = "beforehide";
    PopupEvents["beforeShow"] = "beforeshow";
    PopupEvents["afterHide"] = "afterhide";
    PopupEvents["afterShow"] = "aftershow";
    PopupEvents["click"] = "click";
})(PopupEvents = exports.PopupEvents || (exports.PopupEvents = {}));


/***/ }),

/***/ "../ts-slider/index.ts":
/*!*****************************!*\
  !*** ../ts-slider/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/Slider */ "../ts-slider/sources/Slider.ts"));
__export(__webpack_require__(/*! ./sources/types */ "../ts-slider/sources/types.ts"));


/***/ }),

/***/ "../ts-slider/sources/Slider.ts":
/*!**************************************!*\
  !*** ../ts-slider/sources/Slider.ts ***!
  \**************************************/
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
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var Keymanager_1 = __webpack_require__(/*! @dhx/ts-common/Keymanager */ "../ts-common/Keymanager.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var ts_popup_1 = __webpack_require__(/*! @dhx/ts-popup */ "../ts-popup/index.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-slider/sources/types.ts");
function normalizeValue(value, min, max) {
    if (value < min) {
        return min;
    }
    if (value > max) {
        return max;
    }
    return value;
}
function parseValue(value, min, max) {
    var values;
    if (value === undefined) {
        values = [];
    }
    else if (Array.isArray(value)) {
        values = value;
    }
    else if (typeof value === "string") {
        values = value.split(",").map(function (v) { return parseInt(v, 10); });
    }
    else {
        values = [value];
    }
    values[0] = values[0] === undefined ? min : normalizeValue(values[0], min, max);
    values[1] = values[1] === undefined ? max : normalizeValue(values[1], min, max);
    return values;
}
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider(container, config) {
        var _this = _super.call(this, container, core_1.extend({
            mode: types_1.Direction.horizontal,
            min: 0,
            max: 100,
            step: 1,
            thumbLabel: true,
        }, config)) || this;
        _this.events = new events_1.EventSystem(_this);
        _this._axis = _this.config.mode === types_1.Direction.horizontal ? "clientX" : "clientY";
        _this._initStartPosition();
        _this._initHotkeys();
        var vNode = dom_1.create({
            render: function () { return _this._draw(); },
            hooks: {
                didMount: function () { return _this._calcSliderPosition(); },
                didRedraw: function () { return _this._calcSliderPosition(); }
            }
        });
        _this._initHandlers();
        _this.mount(container, vNode);
        return _this;
    }
    Slider.prototype.disable = function () {
        this._disabled = true;
        this.paint();
    };
    Slider.prototype.enable = function () {
        this._disabled = false;
        this.paint();
    };
    Slider.prototype.focus = function (extra) {
        this.getRootView().refs[extra ? "extraRunner" : "runner"].el.focus();
    };
    Slider.prototype.getValue = function (asArray) {
        var res;
        if (this.config.range) {
            var a = this._getValue(this._currentPosition);
            var b = this._getValue(this._extraCurrentPosition);
            res = a > b ? [b, a] : [a, b];
        }
        else {
            res = [this._getValue(this._currentPosition)];
        }
        return asArray ? res : res.join(",");
    };
    Slider.prototype.setValue = function (value) {
        var old = this._getValue(this._currentPosition);
        if (Array.isArray(value) && value.length > 1) {
            var oldExtra = this._getValue(this._extraCurrentPosition);
            this._setValue(value[0], false);
            this.events.fire(types_1.SliderEvents.change, [value[0], old, false]);
            this._setValue(value[1], true);
            this.events.fire(types_1.SliderEvents.change, [value[1], oldExtra, true]);
        }
        else {
            this._setValue(value);
            this.events.fire(types_1.SliderEvents.change, [value, old, false]);
        }
        this.paint();
    };
    Slider.prototype.destructor = function () {
        this._hotkeysDestructor();
        this.unmount();
    };
    Slider.prototype._calcSliderPosition = function () {
        var root = this.getRootView();
        if (!root) {
            return;
        }
        var tracker = root.refs.track.el;
        var rect = tracker.getBoundingClientRect();
        this._offsets = {
            left: rect.left + window.pageXOffset,
            top: rect.top + window.pageYOffset
        };
        this._length = this.config.mode === types_1.Direction.horizontal ? rect.width : rect.height;
    };
    Slider.prototype._initHotkeys = function () {
        var _this = this;
        var isRunnersInFocus = function () {
            var activeEl = document.activeElement;
            var refs = _this.getRootView().refs;
            if (!refs) {
                return false;
            }
            var runner = refs.runner;
            if (runner && runner.el === activeEl) {
                return true;
            }
            if (_this.config.range && refs.extraRunner && refs.extraRunner.el === activeEl) {
                return true;
            }
            return false;
        };
        this._hotkeysDestructor = Keymanager_1.addHotkeys({
            arrowleft: function (e) {
                if (_this.config.mode === types_1.Direction.vertical) {
                    return;
                }
                e.preventDefault();
                _this._move(-_this.config.step, e.target.classList.contains("dhx_slider__thumb--extra"));
            },
            arrowright: function (e) {
                if (_this.config.mode === types_1.Direction.vertical) {
                    return;
                }
                e.preventDefault();
                _this._move(_this.config.step, e.target.classList.contains("dhx_slider__thumb--extra"));
            },
            arrowup: function (e) {
                if (_this.config.mode === types_1.Direction.horizontal) {
                    return;
                }
                e.preventDefault();
                _this._move(_this.config.step, e.target.classList.contains("dhx_slider__thumb--extra"));
            },
            arrowdown: function (e) {
                if (_this.config.mode === types_1.Direction.horizontal) {
                    return;
                }
                e.preventDefault();
                _this._move(-_this.config.step, e.target.classList.contains("dhx_slider__thumb--extra"));
            }
        }, isRunnersInFocus);
    };
    Slider.prototype._move = function (value, forExtra) {
        if (this.config.inverse) {
            value = -value;
        }
        var oldValue = forExtra ? this._getValue(this._extraCurrentPosition) : this._getValue(this._currentPosition);
        var newValue = oldValue + value;
        this._setValue(oldValue + value, forExtra);
        this.events.fire(types_1.SliderEvents.change, [newValue, oldValue, forExtra]);
        this.paint();
    };
    Slider.prototype._initStartPosition = function () {
        var _a = this.config, max = _a.max, min = _a.min, range = _a.range;
        var _b = parseValue(this.config.value, this.config.min, this.config.max), value = _b[0], extraValue = _b[1];
        this._currentPosition = (value - min) / (max - min) * 100;
        if (range) {
            this._extraCurrentPosition = (max - extraValue) / (max - min) * 100;
        }
        this._currentPosition = (value - min) / (max - min) * 100;
        if (range) {
            this._extraCurrentPosition = (extraValue - min) / (max - min) * 100;
        }
        if (this._isInverse()) {
            this._currentPosition = 100 - this._currentPosition;
            if (range) {
                this._extraCurrentPosition = 100 - this._extraCurrentPosition;
            }
        }
    };
    Slider.prototype._getValue = function (value) {
        if (this._isInverse()) {
            value = 100 - value;
        }
        var _a = this.config, min = _a.min, max = _a.max, step = _a.step;
        if (value === 100) {
            return max;
        }
        if (value === 0) {
            return min;
        }
        var val = value * (max - min) / 100;
        var remain = val % step;
        var rounder = remain >= step / 2 ? step : 0;
        var result = min + val - remain + rounder;
        return +result.toFixed(5);
    };
    Slider.prototype._setValue = function (val, forExtra) {
        if (forExtra === void 0) { forExtra = false; }
        var _a = this.config, max = _a.max, min = _a.min;
        if (val > max || val < min) {
            return false;
        }
        var rawValue = (val - min) / (max - min) * 100;
        var newValue = this._isInverse() ? 100 - rawValue : rawValue;
        if (forExtra) {
            this._extraCurrentPosition = newValue;
        }
        else {
            this._currentPosition = newValue;
        }
    };
    Slider.prototype._initHandlers = function () {
        var _this = this;
        var mouseMove = function (e) {
            e.preventDefault();
            var x = (e[_this._axis] - _this._getBegining()) / _this._length * 100;
            if (_this._findNewDirection) {
                if (Math.abs(_this._currentPosition - x) < 1) {
                    return;
                }
                if (x > _this._currentPosition) {
                    _this._possibleRange = [_this._currentPosition, 100];
                }
                else {
                    _this._possibleRange = [0, _this._currentPosition];
                }
                _this._findNewDirection = null;
            }
            if (_this._inSide(x)) {
                _this._updatePosition(x, _this._isExtraActive);
            }
            _this.paint();
        };
        var mouseUp = function (e) {
            _this.events.fire(types_1.SliderEvents.mouseup, [e]);
            setTimeout(function () {
                _this._isMouseMoving = false;
                _this.paint();
            }, 4);
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        };
        if (this.config.help) {
            this._helper = new ts_popup_1.Popup({ css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light" });
            this._helper.attachHTML(this.config.help);
        }
        this._handlers = {
            showHelper: function (e) {
                e.preventDefault();
                _this._helper.show(e.target);
            },
            onmousedown: function (e) {
                if (_this._disabled || e.which === 3) {
                    return;
                }
                _this.events.fire(types_1.SliderEvents.mousedown, [e]);
                _this._isMouseMoving = true;
                var active;
                if (e.target.classList.contains("dhx_slider__thumb--extra")) {
                    _this._isExtraActive = true;
                    active = _this._extraCurrentPosition;
                }
                else {
                    _this._isExtraActive = false;
                    active = _this._currentPosition;
                }
                _this._findNewDirection = null;
                // define possible range
                if (_this.config.range) {
                    var _a = _this._currentPosition > _this._extraCurrentPosition ?
                        [_this._currentPosition, _this._extraCurrentPosition] : [_this._extraCurrentPosition, _this._currentPosition], more = _a[0], less = _a[1];
                    if (_this._currentPosition === _this._extraCurrentPosition) {
                        _this._findNewDirection = active;
                        _this._possibleRange = [0, 100];
                    }
                    else if (active < more) {
                        _this._possibleRange = [0, more];
                    }
                    else {
                        _this._possibleRange = [less, 100];
                    }
                }
                else {
                    _this._possibleRange = [0, 100];
                }
                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            },
            onlabelClick: function () {
                var refs = _this.getRootView().refs;
                refs.runner.el.focus();
            },
            onclick: function (e) {
                if (_this._disabled || _this._isMouseMoving || e.which === 3) {
                    return;
                }
                var x = (e[_this._axis] - _this._getBegining()) / _this._length * 100;
                var refs = _this.getRootView().refs;
                if (_this.config.range) {
                    var dist = Math.abs(_this._currentPosition - x);
                    var extraDist = Math.abs(_this._extraCurrentPosition - x);
                    if (dist < extraDist) {
                        _this._updatePosition(x, false);
                        refs.runner.el.focus();
                    }
                    else {
                        _this._updatePosition(x, true);
                        refs.extraRunner.el.focus();
                    }
                }
                else {
                    _this._updatePosition(x, false);
                    refs.runner.el.focus();
                }
                _this.paint();
            },
            onmouseover: function () {
                _this._mouseIn = true;
                _this.paint();
            },
            onmouseout: function () {
                _this._mouseIn = false;
                _this.paint();
            },
            onfocus: function () {
                _this._focusIn = true;
                _this.paint();
            },
            onblur: function () {
                _this._focusIn = false;
                _this.paint();
            }
        };
    };
    Slider.prototype._getBegining = function () {
        return this.config.mode === types_1.Direction.horizontal ? this._offsets.left - window.pageXOffset : this._offsets.top - window.pageYOffset;
    };
    Slider.prototype._inSide = function (x) {
        var range = this._possibleRange;
        if (x < range[0]) {
            this._updatePosition(range[0], this._isExtraActive);
            return false;
        }
        if (x > range[1]) {
            this._updatePosition(range[1], this._isExtraActive);
            return false;
        }
        return true;
    };
    Slider.prototype._updatePosition = function (x, extra) {
        if (extra === void 0) { extra = false; }
        if (x > 100) {
            x = 100;
        }
        if (x < 0) {
            x = 0;
        }
        var _a = this.config, max = _a.max, min = _a.min;
        var position = extra ? this._extraCurrentPosition : this._currentPosition;
        var oldValue = this._getValue(position);
        var newValue = this._getValue(x);
        if (oldValue === newValue) {
            return;
        }
        var rawValue = (newValue - min) / (max - min) * 100;
        var value = this._isInverse() ? 100 - rawValue : rawValue;
        if (extra) {
            this._extraCurrentPosition = value;
        }
        else {
            this._currentPosition = value;
        }
        this.events.fire(types_1.SliderEvents.change, [newValue, oldValue, extra]);
    };
    Slider.prototype._getRunnerStyle = function (forExtra) {
        if (forExtra === void 0) { forExtra = false; }
        var _a;
        var direction = this.config.mode === types_1.Direction.horizontal ? "left" : "top";
        var pos = forExtra ? this._extraCurrentPosition : this._currentPosition;
        return _a = {},
            _a[direction] = pos + "%",
            _a;
    };
    Slider.prototype._isInverse = function () {
        return (this.config.inverse && this.config.mode === types_1.Direction.horizontal) ||
            (!this.config.inverse && this.config.mode === types_1.Direction.vertical);
    };
    Slider.prototype._getRunnerCss = function (forExtra) {
        if (forExtra === void 0) { forExtra = false; }
        return "dhx_slider__thumb" +
            (forExtra ? " dhx_slider__thumb--extra" : "") +
            (this._isMouseMoving && ((forExtra && this._isExtraActive) || (!forExtra && !this._isExtraActive)) ? " dhx_slider__thumb--active" : "") +
            (this._disabled ? " dhx_slider__thumb--disabled" : "") +
            (this._isNullable(forExtra ? this._extraCurrentPosition : this._currentPosition) && !this.config.range ? " dhx_slider__thumb--nullable" : "");
    };
    Slider.prototype._draw = function () {
        var width = this.config.labelInline && this.config.labelWidth ? this.config.labelWidth : "";
        return dom_1.el("div", {
            class: "dhx_slider" +
                " dhx_slider--mode_" + this.config.mode +
                (this.config.label && this.config.labelInline ? " dhx_slider--label-inline" : "") +
                (this.config.hiddenLabel ? " dhx_slider--label_sr" : "") +
                (this.config.tick ? " dhx_slider--ticks" : "") +
                (this.config.majorTick ? " dhx_slider--major-ticks" : "") +
                (this.config.css ? " " + this.config.css : "")
        }, [
            this.config.label ? dom_1.el("label.dhx_label.dhx_slider__label", {
                style: { minWidth: width, maxWidth: width },
                class: this.config.help ? "dhx_label--with-help" : "",
                onclick: this._handlers.onlabelClick,
            }, this.config.help ? [
                dom_1.el("span.dhx_label__holder", this.config.label),
                dom_1.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                    tabindex: "0",
                    role: "button",
                    onclick: this._handlers.showHelper
                }),
            ] : this.config.label) : null,
            this._drawSlider()
        ]);
    };
    Slider.prototype._drawSlider = function () {
        return dom_1.el(".dhx_slider__track-holder", 
        // (this.config.mode === Direction.vertical ? ".dhx_slider--vertical" : ".dhx_slider--horizontal"),
        {
            dhx_widget_id: this._uid,
        }, [
            dom_1.el(".dhx_slider__track", {
                _ref: "track",
                onmouseover: this._handlers.onmouseover,
                onmouseout: this._handlers.onmouseout,
                onclick: this._handlers.onclick
            }, [
                this._getDetector(),
                dom_1.el("div", {
                    _ref: "runner",
                    class: this._getRunnerCss(),
                    onmousedown: this._handlers.onmousedown,
                    onmousemove: this._handlers.onmousemove,
                    onfocus: this._handlers.onfocus,
                    onblur: this._handlers.onblur,
                    style: this._getRunnerStyle(),
                    tabindex: 0,
                }),
                this.config.thumbLabel && (this._mouseIn || this._focusIn || this._isMouseMoving) ? this._drawThumbLabel() : null,
                this.config.thumbLabel && this.config.range && (this._mouseIn || this._focusIn || this._isMouseMoving) ? this._drawThumbLabel(true) : null,
                this.config.range ? dom_1.el("div", {
                    _ref: "extraRunner",
                    class: this._getRunnerCss(true),
                    onmousedown: this._handlers.onmousedown,
                    onmousemove: this._handlers.onmousemove,
                    onfocus: this._handlers.onfocus,
                    onblur: this._handlers.onblur,
                    style: this._getRunnerStyle(true),
                    tabindex: 0,
                }) : null,
            ]),
            this.config.tick ? this._drawTicks() : null
        ]);
    };
    Slider.prototype._getDetector = function () {
        var _a, _b, _c;
        if (this._disabled) {
            return dom_1.el(".dhx_slider__range");
        }
        var direction = this.config.mode === types_1.Direction.horizontal ? "left" : "top";
        var size = this.config.mode === types_1.Direction.horizontal ? "width" : "height";
        if (this.config.range) {
            var _d = this._currentPosition > this._extraCurrentPosition ?
                [this._currentPosition, this._extraCurrentPosition] : [this._extraCurrentPosition, this._currentPosition], more = _d[0], less = _d[1];
            return dom_1.el(".dhx_slider__range", {
                style: (_a = {},
                    _a[direction] = less + "%",
                    _a[size] = more - less + "%",
                    _a)
            });
        }
        if (this._isInverse()) {
            return dom_1.el(".dhx_slider__range", {
                style: (_b = {},
                    _b[direction] = this._currentPosition + "%",
                    _b[size] = 100 - this._currentPosition + "%",
                    _b)
            });
        }
        return dom_1.el(".dhx_slider__range", {
            style: (_c = {},
                _c[direction] = 0,
                _c[size] = this._currentPosition + "%",
                _c)
        });
    };
    Slider.prototype._drawThumbLabel = function (forExtra) {
        if (forExtra === void 0) { forExtra = false; }
        var _a;
        var pos = forExtra ? this._extraCurrentPosition : this._currentPosition;
        var direction = this.config.mode === types_1.Direction.horizontal ? "left" : "top";
        var classNameModifiers = this.config.mode === types_1.Direction.horizontal ? ".dhx_slider__thumb-label--horizontal" : ".dhx_slider__thumb-label--vertical";
        if ((forExtra && this._isExtraActive) || (!forExtra && !this._isExtraActive)) {
            classNameModifiers += ".dhx_slider__thumb-label--active";
        }
        var style = (_a = {},
            _a[direction] = pos + "%",
            _a);
        return dom_1.el(".dhx_slider__thumb-label" + classNameModifiers, {
            style: style
        }, this._getValue(pos));
    };
    Slider.prototype._getTicks = function () {
        var _a = this.config, max = _a.max, min = _a.min, step = _a.step, tick = _a.tick, majorTick = _a.majorTick;
        var len = max - min;
        var tickLength = (step * tick) / len;
        var positions = [];
        var length = 0;
        var index = 0;
        while (length < 1) {
            var tickValue = +(min + length * len).toFixed(5);
            var isMultiple = index % majorTick === 0;
            positions.push({
                position: (this._isInverse() ? (1 - length) * 100 : length * 100) + "%",
                isMultiple: isMultiple,
                label: isMultiple && typeof this.config.tickTemplate === "function" ? this.config.tickTemplate(tickValue) : null
            });
            length += tickLength;
            index++;
        }
        positions.push({
            position: (this._isInverse() ? 0 : 100) + "%",
            isMultiple: true,
            label: typeof this.config.tickTemplate === "function" ?
                this.config.tickTemplate(max) : null
        });
        return positions;
    };
    Slider.prototype._drawTicks = function () {
        var direction = this.config.mode === types_1.Direction.horizontal ? "left" : "top";
        return dom_1.el(".dhx_slider__ticks-holder", this._getTicks().map(function (tick) {
            var _a;
            return dom_1.el("div", {
                class: "dhx_slider__tick" + (tick.isMultiple ? " dhx_slider__tick--major" : ""),
                style: (_a = {},
                    _a[direction] = tick.position,
                    _a)
            }, tick.label !== undefined ? [
                dom_1.el(".dhx_slider__tick-label", tick.label)
            ] : null);
        }));
    };
    Slider.prototype._isNullable = function (value) {
        if (this._isInverse()) {
            return value === 100;
        }
        else {
            return value === 0;
        }
    };
    return Slider;
}(view_1.View));
exports.Slider = Slider;


/***/ }),

/***/ "../ts-slider/sources/types.ts":
/*!*************************************!*\
  !*** ../ts-slider/sources/types.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Direction;
(function (Direction) {
    Direction["vertical"] = "vertical";
    Direction["horizontal"] = "horizontal";
})(Direction = exports.Direction || (exports.Direction = {}));
var SliderEvents;
(function (SliderEvents) {
    SliderEvents["change"] = "change";
    SliderEvents["mousedown"] = "mousedown";
    SliderEvents["mouseup"] = "mouseup";
})(SliderEvents = exports.SliderEvents || (exports.SliderEvents = {}));


/***/ }),

/***/ "../ts-timepicker/sources/Timepicker.ts":
/*!**********************************************!*\
  !*** ../ts-timepicker/sources/Timepicker.ts ***!
  \**********************************************/
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
var core_1 = __webpack_require__(/*! @dhx/ts-common/core */ "../ts-common/core.ts");
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var ts_layout_1 = __webpack_require__(/*! @dhx/ts-layout */ "../ts-layout/index.ts");
var ts_slider_1 = __webpack_require__(/*! @dhx/ts-slider */ "../ts-slider/index.ts");
var en_1 = __webpack_require__(/*! ./locales/en */ "../ts-timepicker/sources/locales/en.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-timepicker/sources/types.ts");
var Timepicker = /** @class */ (function (_super) {
    __extends(Timepicker, _super);
    function Timepicker(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, container, core_1.extend({
            timeFormat: 24,
            actions: false
        }, config)) || this;
        _this.events = new events_1.EventSystem(_this);
        _this._time = {
            h: 0,
            m: 0,
            isAM: true
        };
        if (_this.config.timeFormat === 12) {
            _this._time.h = 12;
        }
        _this._initUI(container);
        _this._initHandlers();
        _this._initEvents();
        return _this;
    }
    Timepicker.prototype.getValue = function (asOBject) {
        var _a = this._time, h = _a.h, m = _a.m, isAM = _a.isAM;
        if (asOBject) {
            var obj = {
                hour: h,
                minute: m
            };
            if (this.config.timeFormat === 12) {
                obj.AM = isAM;
            }
            return obj;
        }
        return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + (this.config.timeFormat === 12 ? (isAM ? "AM" : "PM") : "");
    };
    Timepicker.prototype.setValue = function (value) {
        var m;
        var h;
        var isPM;
        if (typeof value === "number") {
            value = new Date(value);
        }
        if (value instanceof Date) {
            m = value.getMinutes();
            h = value.getHours();
        }
        else if (Array.isArray(value)) {
            h = validate(value[0], 23);
            m = validate(value[1], 59);
            if (value[2] && value[2].toLowerCase() === "pm") {
                isPM = true;
            }
        }
        else {
            var matches = value.match(/\d+/g);
            h = validate(+matches[0], 23);
            m = validate(+matches[1], 59);
            if (value.toLowerCase().indexOf("pm") !== -1) {
                isPM = true;
            }
        }
        if (isPM && h < 12) {
            h += 12;
        }
        this._hoursSlider.setValue(h);
        this._minutesSlider.setValue(m);
        this._inputsView.paint();
    };
    Timepicker.prototype.destructor = function () {
        this._minutesSlider.destructor();
        this._hoursSlider.destructor();
        this.events.clear();
        this.unmount();
    };
    Timepicker.prototype.getRootView = function () {
        return this.layout.getRootView();
    };
    Timepicker.prototype._initUI = function (container) {
        var _this = this;
        var layoutConfig = {
            gravity: false,
            css: "dhx_timepicker " +
                (this.config.css ? this.config.css : "") +
                (this.config.actions ? " dhx_timepicker--with-actions" : ""),
            rows: [
                {
                    id: "timepicker",
                    css: "dhx_timepicker__inputs"
                },
                {
                    id: "hour-slider",
                    css: "dhx_timepicker__hour"
                },
                {
                    id: "minute-slider",
                    css: "dhx_timepicker__minute"
                }
            ]
        };
        if (this.config.actions) {
            layoutConfig.rows.unshift({
                id: "close-action",
                css: "dhx_timepicker__close"
            });
            layoutConfig.rows.push({
                id: "save-action",
                css: "dhx_timepicker__save"
            });
        }
        var layout = this.layout = new ts_layout_1.Layout(container, layoutConfig);
        var timepicker = dom_1.create({
            render: function () { return _this._draw(); }
        });
        var inputsView = this._inputsView = view_1.toViewLike(timepicker);
        var mSlider = this._minutesSlider = new ts_slider_1.Slider(null, {
            min: 0,
            max: 59,
            step: 1,
            thumbLabel: false,
            labelInline: false,
            label: en_1.default.minutes
        });
        var hSlider = this._hoursSlider = new ts_slider_1.Slider(null, {
            min: 0,
            max: 23,
            step: 1,
            thumbLabel: false,
            labelInline: false,
            label: en_1.default.hours
        });
        layout.cell("timepicker").attach(inputsView);
        layout.cell("hour-slider").attach(hSlider);
        layout.cell("minute-slider").attach(mSlider);
        if (this.config.actions) {
            var save = function () {
                return dom_1.el("button.dhx_timepicker__button-save.dhx_button.dhx_button--view_flat.dhx_button--color_primary.dhx_button--size_medium.dhx_button--circle.dhx_button--width_full", { onclick: _this._outerHandlers.save }, en_1.default.save);
            };
            var close_1 = function () {
                return dom_1.el("button.dhx_timepicker__button-close.dhx_button.dhx_button--view_link.dhx_button--size_medium.dhx_button--view_link.dhx_button--color_secondary.dhx_button--icon.dhx_button--circle", {
                    onclick: _this._outerHandlers.close
                }, [dom_1.el("span.dhx_button__icon.dxi.dxi-close")]);
            };
            layout.cell("save-action").attach(save);
            layout.cell("close-action").attach(close_1);
        }
    };
    Timepicker.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onchange: {
                ".dhx_timepicker-input--hour": function (e) {
                    var hour = validate(parseInt(e.target.value, 10), 23);
                    e.target.value = hour;
                    _this._hoursSlider.setValue(hour);
                },
                ".dhx_timepicker-input--minutes": function (e) {
                    var min = validate(parseInt(e.target.value, 10), 59);
                    e.target.value = min;
                    _this._minutesSlider.setValue(min);
                }
            }
        };
        this._outerHandlers = {
            close: function () { return _this.events.fire(types_1.TimepickerEvents.close); },
            save: function () { return _this.events.fire(types_1.TimepickerEvents.save, [_this._time]); }
        };
    };
    Timepicker.prototype._initEvents = function () {
        var _this = this;
        this._hoursSlider.events.on(ts_slider_1.SliderEvents.change, function (value) {
            if (_this.config.timeFormat === 12) {
                _this._time.isAM = value < 12;
                _this._time.h = value % 12 || 12;
            }
            else {
                _this._time.h = value;
            }
            _this.events.fire(types_1.TimepickerEvents.change, [_this.getValue()]);
            _this._inputsView.paint();
        });
        this._minutesSlider.events.on(ts_slider_1.SliderEvents.change, function (value) {
            _this._time.m = value;
            _this.events.fire(types_1.TimepickerEvents.change, [_this.getValue()]);
            _this._inputsView.paint();
        });
    };
    Timepicker.prototype._draw = function () {
        return dom_1.el(".dhx_timepicker-inputs", __assign({}, this._handlers), [
            dom_1.el("input.dhx_timepicker-input.dhx_timepicker-input--hour", {
                _key: "hour",
                value: this._time.h < 10 ? "0" + this._time.h : this._time.h
            }),
            dom_1.el("span.dhx_timepicker-delimer", ":"),
            dom_1.el("input.dhx_timepicker-input.dhx_timepicker-input--minutes", {
                _key: "minute",
                value: this._time.m < 10 ? "0" + this._time.m : this._time.m
            }),
            this.config.timeFormat === 12 ? dom_1.el(".dhx_timepicker-ampm", this._time.isAM ? "AM" : "PM") : null
        ]);
    };
    return Timepicker;
}(view_1.View));
exports.Timepicker = Timepicker;
function validate(value, max) {
    if (isNaN(value)) {
        return 0;
    }
    return Math.min(max, Math.max(0, value));
}


/***/ }),

/***/ "../ts-timepicker/sources/entry.ts":
/*!*****************************************!*\
  !*** ../ts-timepicker/sources/entry.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../styles/timepicker.scss */ "../styles/timepicker.scss");
var Timepicker_1 = __webpack_require__(/*! ./Timepicker */ "../ts-timepicker/sources/Timepicker.ts");
exports.Timepicker = Timepicker_1.Timepicker;
var en_1 = __webpack_require__(/*! ./locales/en */ "../ts-timepicker/sources/locales/en.ts");
var w = window;
exports.i18n = (w.dhx && w.dhx.i18n) ? w.dhx.i18 : {};
exports.i18n.setLocale = function (component, value) {
    var target = exports.i18n[component];
    for (var key in value) {
        target[key] = value[key];
    }
};
exports.i18n.timepicker = exports.i18n.timepicker || en_1.default;


/***/ }),

/***/ "../ts-timepicker/sources/locales/en.ts":
/*!**********************************************!*\
  !*** ../ts-timepicker/sources/locales/en.ts ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    hours: "Hours",
    minutes: "Minutes",
    save: "save"
};
exports.default = locale;


/***/ }),

/***/ "../ts-timepicker/sources/types.ts":
/*!*****************************************!*\
  !*** ../ts-timepicker/sources/types.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TimepickerEvents;
(function (TimepickerEvents) {
    TimepickerEvents["change"] = "change";
    TimepickerEvents["save"] = "save";
    TimepickerEvents["close"] = "close";
})(TimepickerEvents = exports.TimepickerEvents || (exports.TimepickerEvents = {}));


/***/ })

/******/ });
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaHgvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RoeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL2RvbXZtL2Rpc3QvZGV2L2RvbXZtLmRldi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vc3R5bGVzL3RpbWVwaWNrZXIuc2Nzcz80MDFlIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vS2V5bWFuYWdlci50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL2NvcmUudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9kb20udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9odG1sLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vcG9seWZpbGxzL21hdGNoZXMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi92aWV3LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1sYXlvdXQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWxheW91dC9zb3VyY2VzL0NlbGwudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWxheW91dC9zb3VyY2VzL0xheW91dC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtcG9wdXAvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLXBvcHVwL3NvdXJjZXMvUG9wdXAudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLXBvcHVwL3NvdXJjZXMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLXNsaWRlci9pbmRleC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtc2xpZGVyL3NvdXJjZXMvU2xpZGVyLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1zbGlkZXIvc291cmNlcy90eXBlcy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtdGltZXBpY2tlci9zb3VyY2VzL1RpbWVwaWNrZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLXRpbWVwaWNrZXIvc291cmNlcy9lbnRyeS50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtdGltZXBpY2tlci9zb3VyY2VzL2xvY2FsZXMvZW4udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLXRpbWVwaWNrZXIvc291cmNlcy90eXBlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs4REFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDLEtBQTREO0FBQzdELENBQUMsU0FDMEI7QUFDM0IsQ0FBQyxxQkFBcUI7O0FBRXRCO0FBQ0E7O0FBRUE7QUFDQTtB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QUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVCQUF1Qjs7QUFFM0IsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGlDQUFpQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztB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YTtJQUNiLG1DQUFlO0FBQ2hCLENBQUMsRUFKVyxnQkFBZ0IsR0FBaEIsd0JBQWdCLEtBQWhCLHdCQUFnQixRQUkzQiIsImZpbGUiOiJ0aW1lcGlja2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiZGh4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImRoeFwiXSA9IGZhY3RvcnkoKTtcbn0pKHdpbmRvdywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvY29kZWJhc2UvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4uL3RzLXRpbWVwaWNrZXIvc291cmNlcy9lbnRyeS50c1wiKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgKGMpIDIwMTcsIExlb24gU29yb2tpblxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLiAoTUlUIExpY2Vuc2VkKVxuKlxuKiBkb212bS5qcyAoRE9NIFZpZXdNb2RlbClcbiogQSB0aGluLCBmYXN0LCBkZXBlbmRlbmN5LWZyZWUgdmRvbSB2aWV3IGxheWVyXG4qIEBwcmVzZXJ2ZSBodHRwczovL2dpdGh1Yi5jb20vbGVlb25peWEvZG9tdm0gKHYzLjIuNiwgZGV2IGJ1aWxkKVxuKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcblx0dHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuXHR0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuXHQoZ2xvYmFsLmRvbXZtID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vLyBOT1RFOiBpZiBhZGRpbmcgYSBuZXcgKlZOb2RlKiB0eXBlLCBtYWtlIGl0IDwgQ09NTUVOVCBhbmQgcmVudW1iZXIgcmVzdC5cbi8vIFRoZXJlIGFyZSBzb21lIHBsYWNlcyB0aGF0IHRlc3QgPD0gQ09NTUVOVCB0byBhc3NlcnQgaWYgbm9kZSBpcyBhIFZOb2RlXG5cbi8vIFZOb2RlIHR5cGVzXG52YXIgRUxFTUVOVFx0PSAxO1xudmFyIFRFWFRcdFx0PSAyO1xudmFyIENPTU1FTlRcdD0gMztcblxuLy8gcGxhY2Vob2xkZXIgdHlwZXNcbnZhciBWVklFV1x0XHQ9IDQ7XG52YXIgVk1PREVMXHRcdD0gNTtcblxudmFyIEVOVl9ET00gPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiO1xudmFyIHdpbiA9IEVOVl9ET00gPyB3aW5kb3cgOiB7fTtcbnZhciByQUYgPSB3aW4ucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG52YXIgZW1wdHlPYmogPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBpc0FyciA9IEFycmF5LmlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzU2V0KHZhbCkge1xuXHRyZXR1cm4gdmFsICE9IG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzUGxhaW5PYmoodmFsKSB7XG5cdHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwuY29uc3RydWN0b3IgPT09IE9iamVjdDtcdFx0Ly8gICYmIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCJcbn1cblxuZnVuY3Rpb24gaW5zZXJ0QXJyKHRhcmcsIGFyciwgcG9zLCByZW0pIHtcblx0dGFyZy5zcGxpY2UuYXBwbHkodGFyZywgW3BvcywgcmVtXS5jb25jYXQoYXJyKSk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsKHZhbCkge1xuXHR2YXIgdCA9IHR5cGVvZiB2YWw7XG5cdHJldHVybiB0ID09PSBcInN0cmluZ1wiIHx8IHQgPT09IFwibnVtYmVyXCI7XG59XG5cbmZ1bmN0aW9uIGlzRnVuYyh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09IFwiZnVuY3Rpb25cIjtcbn1cblxuZnVuY3Rpb24gaXNQcm9tKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiAmJiBpc0Z1bmModmFsLnRoZW4pO1xufVxuXG5cblxuZnVuY3Rpb24gYXNzaWduT2JqKHRhcmcpIHtcblx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cblx0Zm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKVxuXHRcdHsgZm9yICh2YXIgayBpbiBhcmdzW2ldKVxuXHRcdFx0eyB0YXJnW2tdID0gYXJnc1tpXVtrXTsgfSB9XG5cblx0cmV0dXJuIHRhcmc7XG59XG5cbi8vIGV4cG9ydCBjb25zdCBkZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5mdW5jdGlvbiBkZWVwU2V0KHRhcmcsIHBhdGgsIHZhbCkge1xuXHR2YXIgc2VnO1xuXG5cdHdoaWxlIChzZWcgPSBwYXRoLnNoaWZ0KCkpIHtcblx0XHRpZiAocGF0aC5sZW5ndGggPT09IDApXG5cdFx0XHR7IHRhcmdbc2VnXSA9IHZhbDsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgdGFyZ1tzZWddID0gdGFyZyA9IHRhcmdbc2VnXSB8fCB7fTsgfVxuXHR9XG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gZGVlcFVuc2V0KHRhcmcsIHBhdGgpIHtcblx0dmFyIHNlZztcblxuXHR3aGlsZSAoc2VnID0gcGF0aC5zaGlmdCgpKSB7XG5cdFx0aWYgKHBhdGgubGVuZ3RoID09PSAwKVxuXHRcdFx0dGFyZ1tzZWddID0gdmFsO1xuXHRcdGVsc2Vcblx0XHRcdHRhcmdbc2VnXSA9IHRhcmcgPSB0YXJnW3NlZ10gfHwge307XG5cdH1cbn1cbiovXG5cbmZ1bmN0aW9uIHNsaWNlQXJncyhhcmdzLCBvZmZzKSB7XG5cdHZhciBhcnIgPSBbXTtcblx0Zm9yICh2YXIgaSA9IG9mZnM7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKVxuXHRcdHsgYXJyLnB1c2goYXJnc1tpXSk7IH1cblx0cmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gY21wT2JqKGEsIGIpIHtcblx0Zm9yICh2YXIgaSBpbiBhKVxuXHRcdHsgaWYgKGFbaV0gIT09IGJbaV0pXG5cdFx0XHR7IHJldHVybiBmYWxzZTsgfSB9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGNtcEFycihhLCBiKSB7XG5cdHZhciBhbGVuID0gYS5sZW5ndGg7XG5cblx0aWYgKGIubGVuZ3RoICE9PSBhbGVuKVxuXHRcdHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhbGVuOyBpKyspXG5cdFx0eyBpZiAoYVtpXSAhPT0gYltpXSlcblx0XHRcdHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2RhcnNhaW4vcmFmdFxuLy8gckFGIHRocm90dGxlciwgYWdncmVnYXRlcyBtdWx0aXBsZSByZXBlYXRlZCByZWRyYXcgY2FsbHMgd2l0aGluIHNpbmdsZSBhbmltZnJhbWVcbmZ1bmN0aW9uIHJhZnQoZm4pIHtcblx0aWYgKCFyQUYpXG5cdFx0eyByZXR1cm4gZm47IH1cblxuXHR2YXIgaWQsIGN0eCwgYXJncztcblxuXHRmdW5jdGlvbiBjYWxsKCkge1xuXHRcdGlkID0gMDtcblx0XHRmbi5hcHBseShjdHgsIGFyZ3MpO1xuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdGN0eCA9IHRoaXM7XG5cdFx0YXJncyA9IGFyZ3VtZW50cztcblx0XHRpZiAoIWlkKSB7IGlkID0gckFGKGNhbGwpOyB9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGN1cnJ5KGZuLCBhcmdzLCBjdHgpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBmbi5hcHBseShjdHgsIGFyZ3MpO1xuXHR9O1xufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIHByb3AodmFsLCBjYiwgY3R4LCBhcmdzKSB7XG5cdHJldHVybiBmdW5jdGlvbihuZXdWYWwsIGV4ZWNDYikge1xuXHRcdGlmIChuZXdWYWwgIT09IHVuZGVmaW5lZCAmJiBuZXdWYWwgIT09IHZhbCkge1xuXHRcdFx0dmFsID0gbmV3VmFsO1xuXHRcdFx0ZXhlY0NiICE9PSBmYWxzZSAmJiBpc0Z1bmMoY2IpICYmIGNiLmFwcGx5KGN0eCwgYXJncyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHZhbDtcblx0fTtcbn1cbiovXG5cbi8qXG4vLyBhZGFwdGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL09saWNhbC9iaW5hcnktc2VhcmNoXG5leHBvcnQgZnVuY3Rpb24gYmluYXJ5S2V5U2VhcmNoKGxpc3QsIGl0ZW0pIHtcbiAgICB2YXIgbWluID0gMDtcbiAgICB2YXIgbWF4ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgIHZhciBndWVzcztcblxuXHR2YXIgYml0d2lzZSA9IChtYXggPD0gMjE0NzQ4MzY0NykgPyB0cnVlIDogZmFsc2U7XG5cdGlmIChiaXR3aXNlKSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gKG1pbiArIG1heCkgPj4gMTtcblx0XHRcdGlmIChsaXN0W2d1ZXNzXS5rZXkgPT09IGl0ZW0pIHsgcmV0dXJuIGd1ZXNzOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxpc3RbZ3Vlc3NdLmtleSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gTWF0aC5mbG9vcigobWluICsgbWF4KSAvIDIpO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdLmtleSA9PT0gaXRlbSkgeyByZXR1cm4gZ3Vlc3M7IH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAobGlzdFtndWVzc10ua2V5IDwgaXRlbSkgeyBtaW4gPSBndWVzcyArIDE7IH1cblx0XHRcdFx0ZWxzZSB7IG1heCA9IGd1ZXNzIC0gMTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG4gICAgcmV0dXJuIC0xO1xufVxuKi9cblxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTG9uZ2VzdF9pbmNyZWFzaW5nX3N1YnNlcXVlbmNlXG4vLyBpbXBsIGJvcnJvd2VkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2l2aWpzL2l2aVxuZnVuY3Rpb24gbG9uZ2VzdEluY3JlYXNpbmdTdWJzZXF1ZW5jZShhKSB7XG5cdHZhciBwID0gYS5zbGljZSgpO1xuXHR2YXIgcmVzdWx0ID0gW107XG5cdHJlc3VsdC5wdXNoKDApO1xuXHR2YXIgdTtcblx0dmFyIHY7XG5cblx0Zm9yICh2YXIgaSA9IDAsIGlsID0gYS5sZW5ndGg7IGkgPCBpbDsgKytpKSB7XG5cdFx0dmFyIGogPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuXHRcdGlmIChhW2pdIDwgYVtpXSkge1xuXHRcdFx0cFtpXSA9IGo7XG5cdFx0XHRyZXN1bHQucHVzaChpKTtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdHUgPSAwO1xuXHRcdHYgPSByZXN1bHQubGVuZ3RoIC0gMTtcblxuXHRcdHdoaWxlICh1IDwgdikge1xuXHRcdFx0dmFyIGMgPSAoKHUgKyB2KSAvIDIpIHwgMDtcblx0XHRcdGlmIChhW3Jlc3VsdFtjXV0gPCBhW2ldKSB7XG5cdFx0XHRcdHUgPSBjICsgMTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHYgPSBjO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChhW2ldIDwgYVtyZXN1bHRbdV1dKSB7XG5cdFx0XHRpZiAodSA+IDApIHtcblx0XHRcdFx0cFtpXSA9IHJlc3VsdFt1IC0gMV07XG5cdFx0XHR9XG5cdFx0XHRyZXN1bHRbdV0gPSBpO1xuXHRcdH1cblx0fVxuXG5cdHUgPSByZXN1bHQubGVuZ3RoO1xuXHR2ID0gcmVzdWx0W3UgLSAxXTtcblxuXHR3aGlsZSAodS0tID4gMCkge1xuXHRcdHJlc3VsdFt1XSA9IHY7XG5cdFx0diA9IHBbdl07XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG4vLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vT2xpY2FsL2JpbmFyeS1zZWFyY2hcbmZ1bmN0aW9uIGJpbmFyeUZpbmRMYXJnZXIoaXRlbSwgbGlzdCkge1xuXHR2YXIgbWluID0gMDtcblx0dmFyIG1heCA9IGxpc3QubGVuZ3RoIC0gMTtcblx0dmFyIGd1ZXNzO1xuXG5cdHZhciBiaXR3aXNlID0gKG1heCA8PSAyMTQ3NDgzNjQ3KSA/IHRydWUgOiBmYWxzZTtcblx0aWYgKGJpdHdpc2UpIHtcblx0XHR3aGlsZSAobWluIDw9IG1heCkge1xuXHRcdFx0Z3Vlc3MgPSAobWluICsgbWF4KSA+PiAxO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdID09PSBpdGVtKSB7IHJldHVybiBndWVzczsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsaXN0W2d1ZXNzXSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gTWF0aC5mbG9vcigobWluICsgbWF4KSAvIDIpO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdID09PSBpdGVtKSB7IHJldHVybiBndWVzczsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsaXN0W2d1ZXNzXSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gKG1pbiA9PSBsaXN0Lmxlbmd0aCkgPyBudWxsIDogbWluO1xuXG4vL1x0cmV0dXJuIC0xO1xufVxuXG5mdW5jdGlvbiBpc0V2UHJvcChuYW1lKSB7XG5cdHJldHVybiBuYW1lWzBdID09PSBcIm9cIiAmJiBuYW1lWzFdID09PSBcIm5cIjtcbn1cblxuZnVuY3Rpb24gaXNTcGxQcm9wKG5hbWUpIHtcblx0cmV0dXJuIG5hbWVbMF0gPT09IFwiX1wiO1xufVxuXG5mdW5jdGlvbiBpc1N0eWxlUHJvcChuYW1lKSB7XG5cdHJldHVybiBuYW1lID09PSBcInN0eWxlXCI7XG59XG5cbmZ1bmN0aW9uIHJlcGFpbnQobm9kZSkge1xuXHRub2RlICYmIG5vZGUuZWwgJiYgbm9kZS5lbC5vZmZzZXRIZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIGlzSHlkcmF0ZWQodm0pIHtcblx0cmV0dXJuIHZtLm5vZGUgIT0gbnVsbCAmJiB2bS5ub2RlLmVsICE9IG51bGw7XG59XG5cbi8vIHRlc3RzIGludGVyYWN0aXZlIHByb3BzIHdoZXJlIHJlYWwgdmFsIHNob3VsZCBiZSBjb21wYXJlZFxuZnVuY3Rpb24gaXNEeW5Qcm9wKHRhZywgYXR0cikge1xuLy9cdHN3aXRjaCAodGFnKSB7XG4vL1x0XHRjYXNlIFwiaW5wdXRcIjpcbi8vXHRcdGNhc2UgXCJ0ZXh0YXJlYVwiOlxuLy9cdFx0Y2FzZSBcInNlbGVjdFwiOlxuLy9cdFx0Y2FzZSBcIm9wdGlvblwiOlxuXHRcdFx0c3dpdGNoIChhdHRyKSB7XG5cdFx0XHRcdGNhc2UgXCJ2YWx1ZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tlZFwiOlxuXHRcdFx0XHRjYXNlIFwic2VsZWN0ZWRcIjpcbi8vXHRcdFx0XHRjYXNlIFwic2VsZWN0ZWRJbmRleFwiOlxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuLy9cdH1cblxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFZtKG4pIHtcblx0biA9IG4gfHwgZW1wdHlPYmo7XG5cdHdoaWxlIChuLnZtID09IG51bGwgJiYgbi5wYXJlbnQpXG5cdFx0eyBuID0gbi5wYXJlbnQ7IH1cblx0cmV0dXJuIG4udm07XG59XG5cbmZ1bmN0aW9uIFZOb2RlKCkge31cblxudmFyIFZOb2RlUHJvdG8gPSBWTm9kZS5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBWTm9kZSxcblxuXHR0eXBlOlx0bnVsbCxcblxuXHR2bTpcdFx0bnVsbCxcblxuXHQvLyBhbGwgdGhpcyBzdHVmZiBjYW4ganVzdCBsaXZlIGluIGF0dHJzIChhcyBkZWZpbmVkKSBqdXN0IGhhdmUgZ2V0dGVycyBoZXJlIGZvciBpdFxuXHRrZXk6XHRudWxsLFxuXHRyZWY6XHRudWxsLFxuXHRkYXRhOlx0bnVsbCxcblx0aG9va3M6XHRudWxsLFxuXHRuczpcdFx0bnVsbCxcblxuXHRlbDpcdFx0bnVsbCxcblxuXHR0YWc6XHRudWxsLFxuXHRhdHRyczpcdG51bGwsXG5cdGJvZHk6XHRudWxsLFxuXG5cdGZsYWdzOlx0MCxcblxuXHRfY2xhc3M6XHRudWxsLFxuXHRfZGlmZjpcdG51bGwsXG5cblx0Ly8gcGVuZGluZyByZW1vdmFsIG9uIHByb21pc2UgcmVzb2x1dGlvblxuXHRfZGVhZDpcdGZhbHNlLFxuXHQvLyBwYXJ0IG9mIGxvbmdlc3QgaW5jcmVhc2luZyBzdWJzZXF1ZW5jZT9cblx0X2xpczpcdGZhbHNlLFxuXG5cdGlkeDpcdG51bGwsXG5cdHBhcmVudDpcdG51bGwsXG5cblx0Lypcblx0Ly8gYnJlYWsgb3V0IGludG8gb3B0aW9uYWwgZmx1ZW50IG1vZHVsZVxuXHRrZXk6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5rZXlcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcblx0cmVmOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMucmVmXHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXHRcdC8vIGRlZXAgcmVmc1xuXHRkYXRhOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMuZGF0YVx0PSB2YWw7IHJldHVybiB0aGlzOyB9LFxuXHRob29rczpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmhvb2tzXHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXHRcdC8vIGgoXCJkaXZcIikuaG9va3MoKVxuXHRodG1sOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMuaHRtbFx0PSB0cnVlOyByZXR1cm4gdGhpcy5ib2R5KHZhbCk7IH0sXG5cblx0Ym9keTpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmJvZHlcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcblx0Ki9cbn07XG5cbmZ1bmN0aW9uIGRlZmluZVRleHQoYm9keSkge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblx0bm9kZS50eXBlID0gVEVYVDtcblx0bm9kZS5ib2R5ID0gYm9keTtcblx0cmV0dXJuIG5vZGU7XG59XG5cbnZhciBpc1N0cmVhbSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2UgfTtcblxudmFyIHN0cmVhbVZhbCA9IG5vb3A7XG52YXIgc3ViU3RyZWFtID0gbm9vcDtcbnZhciB1bnN1YlN0cmVhbSA9IG5vb3A7XG5cbmZ1bmN0aW9uIHN0cmVhbUNmZyhjZmcpIHtcblx0aXNTdHJlYW1cdD0gY2ZnLmlzO1xuXHRzdHJlYW1WYWxcdD0gY2ZnLnZhbDtcblx0c3ViU3RyZWFtXHQ9IGNmZy5zdWI7XG5cdHVuc3ViU3RyZWFtXHQ9IGNmZy51bnN1Yjtcbn1cblxuLy8gY3JlYXRlcyBhIG9uZS1zaG90IHNlbGYtZW5kaW5nIHN0cmVhbSB0aGF0IHJlZHJhd3MgdGFyZ2V0IHZtXG4vLyBUT0RPOiBpZiBpdCdzIGFscmVhZHkgcmVnaXN0ZXJlZCBieSBhbnkgcGFyZW50IHZtLCB0aGVuIGlnbm9yZSB0byBhdm9pZCBzaW11bHRhbmVvdXMgcGFyZW50ICYgY2hpbGQgcmVmcmVzaFxuZnVuY3Rpb24gaG9va1N0cmVhbShzLCB2bSkge1xuXHR2YXIgcmVkcmF3U3RyZWFtID0gc3ViU3RyZWFtKHMsIGZ1bmN0aW9uICh2YWwpIHtcblx0XHQvLyB0aGlzIFwiaWZcIiBpZ25vcmVzIHRoZSBpbml0aWFsIGZpcmluZyBkdXJpbmcgc3Vic2NyaXB0aW9uICh0aGVyZSdzIG5vIHJlZHJhd2FibGUgdm0geWV0KVxuXHRcdGlmIChyZWRyYXdTdHJlYW0pIHtcblx0XHRcdC8vIGlmIHZtIGZ1bGx5IGlzIGZvcm1lZCAob3IgbW91bnRlZCB2bS5ub2RlLmVsPylcblx0XHRcdGlmICh2bS5ub2RlICE9IG51bGwpXG5cdFx0XHRcdHsgdm0ucmVkcmF3KCk7IH1cblx0XHRcdHVuc3ViU3RyZWFtKHJlZHJhd1N0cmVhbSk7XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gc3RyZWFtVmFsKHMpO1xufVxuXG5mdW5jdGlvbiBob29rU3RyZWFtMihzLCB2bSkge1xuXHR2YXIgcmVkcmF3U3RyZWFtID0gc3ViU3RyZWFtKHMsIGZ1bmN0aW9uICh2YWwpIHtcblx0XHQvLyB0aGlzIFwiaWZcIiBpZ25vcmVzIHRoZSBpbml0aWFsIGZpcmluZyBkdXJpbmcgc3Vic2NyaXB0aW9uICh0aGVyZSdzIG5vIHJlZHJhd2FibGUgdm0geWV0KVxuXHRcdGlmIChyZWRyYXdTdHJlYW0pIHtcblx0XHRcdC8vIGlmIHZtIGZ1bGx5IGlzIGZvcm1lZCAob3IgbW91bnRlZCB2bS5ub2RlLmVsPylcblx0XHRcdGlmICh2bS5ub2RlICE9IG51bGwpXG5cdFx0XHRcdHsgdm0ucmVkcmF3KCk7IH1cblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiByZWRyYXdTdHJlYW07XG59XG5cbnZhciB0YWdDYWNoZSA9IHt9O1xuXG52YXIgUkVfQVRUUlMgPSAvXFxbKFxcdyspKD86PShcXHcrKSk/XFxdL2c7XG5cbmZ1bmN0aW9uIGNzc1RhZyhyYXcpIHtcblx0e1xuXHRcdHZhciBjYWNoZWQgPSB0YWdDYWNoZVtyYXddO1xuXG5cdFx0aWYgKGNhY2hlZCA9PSBudWxsKSB7XG5cdFx0XHR2YXIgdGFnLCBpZCwgY2xzLCBhdHRyO1xuXG5cdFx0XHR0YWdDYWNoZVtyYXddID0gY2FjaGVkID0ge1xuXHRcdFx0XHR0YWc6XHQodGFnXHQ9IHJhdy5tYXRjaCggL15bLVxcd10rLykpXHRcdD9cdHRhZ1swXVx0XHRcdFx0XHRcdDogXCJkaXZcIixcblx0XHRcdFx0aWQ6XHRcdChpZFx0XHQ9IHJhdy5tYXRjaCggLyMoWy1cXHddKykvKSlcdFx0PyBcdGlkWzFdXHRcdFx0XHRcdFx0OiBudWxsLFxuXHRcdFx0XHRjbGFzczpcdChjbHNcdD0gcmF3Lm1hdGNoKC9cXC4oWy1cXHcuXSspLykpXHRcdD9cdGNsc1sxXS5yZXBsYWNlKC9cXC4vZywgXCIgXCIpXHQ6IG51bGwsXG5cdFx0XHRcdGF0dHJzOlx0bnVsbCxcblx0XHRcdH07XG5cblx0XHRcdHdoaWxlIChhdHRyID0gUkVfQVRUUlMuZXhlYyhyYXcpKSB7XG5cdFx0XHRcdGlmIChjYWNoZWQuYXR0cnMgPT0gbnVsbClcblx0XHRcdFx0XHR7IGNhY2hlZC5hdHRycyA9IHt9OyB9XG5cdFx0XHRcdGNhY2hlZC5hdHRyc1thdHRyWzFdXSA9IGF0dHJbMl0gfHwgXCJcIjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2FjaGVkO1xuXHR9XG59XG5cbnZhciBERVZNT0RFID0ge1xuXHRzeW5jUmVkcmF3OiBmYWxzZSxcblxuXHR3YXJuaW5nczogdHJ1ZSxcblxuXHR2ZXJib3NlOiB0cnVlLFxuXG5cdG11dGF0aW9uczogdHJ1ZSxcblxuXHREQVRBX1JFUExBQ0VEOiBmdW5jdGlvbih2bSwgb2xkRGF0YSwgbmV3RGF0YSkge1xuXHRcdGlmIChpc0Z1bmModm0udmlldykgJiYgdm0udmlldy5sZW5ndGggPiAxKSB7XG5cdFx0XHR2YXIgbXNnID0gXCJBIHZpZXcncyBkYXRhIHdhcyByZXBsYWNlZC4gVGhlIGRhdGEgb3JpZ2luYWxseSBwYXNzZWQgdG8gdGhlIHZpZXcgY2xvc3VyZSBkdXJpbmcgaW5pdCBpcyBub3cgc3RhbGUuIFlvdSBtYXkgd2FudCB0byByZWx5IG9ubHkgb24gdGhlIGRhdGEgcGFzc2VkIHRvIHJlbmRlcigpIG9yIHZtLmRhdGEuXCI7XG5cdFx0XHRyZXR1cm4gW21zZywgdm0sIG9sZERhdGEsIG5ld0RhdGFdO1xuXHRcdH1cblx0fSxcblxuXHRVTktFWUVEX0lOUFVUOiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdHJldHVybiBbXCJVbmtleWVkIDxpbnB1dD4gZGV0ZWN0ZWQuIENvbnNpZGVyIGFkZGluZyBhIG5hbWUsIGlkLCBfa2V5LCBvciBfcmVmIGF0dHIgdG8gYXZvaWQgYWNjaWRlbnRhbCBET00gcmVjeWNsaW5nIGJldHdlZW4gZGlmZmVyZW50IDxpbnB1dD4gdHlwZXMuXCIsIHZub2RlXTtcblx0fSxcblxuXHRVTk1PVU5URURfUkVEUkFXOiBmdW5jdGlvbih2bSkge1xuXHRcdHJldHVybiBbXCJJbnZva2luZyByZWRyYXcoKSBvZiBhbiB1bm1vdW50ZWQgKHN1Yil2aWV3IG1heSByZXN1bHQgaW4gZXJyb3JzLlwiLCB2bV07XG5cdH0sXG5cblx0SU5MSU5FX0hBTkRMRVI6IGZ1bmN0aW9uKHZub2RlLCBvdmFsLCBudmFsKSB7XG5cdFx0cmV0dXJuIFtcIkFub255bW91cyBldmVudCBoYW5kbGVycyBnZXQgcmUtYm91bmQgb24gZWFjaCByZWRyYXcsIGNvbnNpZGVyIGRlZmluaW5nIHRoZW0gb3V0c2lkZSBvZiB0ZW1wbGF0ZXMgZm9yIGJldHRlciByZXVzZS5cIiwgdm5vZGUsIG92YWwsIG52YWxdO1xuXHR9LFxuXG5cdE1JU01BVENIRURfSEFORExFUjogZnVuY3Rpb24odm5vZGUsIG92YWwsIG52YWwpIHtcblx0XHRyZXR1cm4gW1wiUGF0Y2hpbmcgb2YgZGlmZmVyZW50IGV2ZW50IGhhbmRsZXIgc3R5bGVzIGlzIG5vdCBmdWxseSBzdXBwb3J0ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnMuIEVuc3VyZSB0aGF0IGhhbmRsZXJzIGFyZSBkZWZpbmVkIHVzaW5nIHRoZSBzYW1lIHN0eWxlLlwiLCB2bm9kZSwgb3ZhbCwgbnZhbF07XG5cdH0sXG5cblx0U1ZHX1dST05HX0ZBQ1RPUlk6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0cmV0dXJuIFtcIjxzdmc+IGRlZmluZWQgdXNpbmcgZG9tdm0uZGVmaW5lRWxlbWVudC4gVXNlIGRvbXZtLmRlZmluZVN2Z0VsZW1lbnQgZm9yIDxzdmc+ICYgY2hpbGQgbm9kZXMuXCIsIHZub2RlXTtcblx0fSxcblxuXHRGT1JFSUdOX0VMRU1FTlQ6IGZ1bmN0aW9uKGVsKSB7XG5cdFx0cmV0dXJuIFtcImRvbXZtIHN0dW1ibGVkIHVwb24gYW4gZWxlbWVudCBpbiBpdHMgRE9NIHRoYXQgaXQgZGlkbid0IGNyZWF0ZSwgd2hpY2ggbWF5IGJlIHByb2JsZW1hdGljLiBZb3UgY2FuIGluamVjdCBleHRlcm5hbCBlbGVtZW50cyBpbnRvIHRoZSB2dHJlZSB1c2luZyBkb212bS5pbmplY3RFbGVtZW50LlwiLCBlbF07XG5cdH0sXG5cblx0UkVVU0VEX0FUVFJTOiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdHJldHVybiBbXCJBdHRycyBvYmplY3RzIG1heSBvbmx5IGJlIHJldXNlZCBpZiB0aGV5IGFyZSB0cnVseSBzdGF0aWMsIGFzIGEgcGVyZiBvcHRpbWl6YXRpb24uIE11dGF0aW5nICYgcmV1c2luZyB0aGVtIHdpbGwgaGF2ZSBubyBlZmZlY3Qgb24gdGhlIERPTSBkdWUgdG8gMCBkaWZmLlwiLCB2bm9kZV07XG5cdH0sXG5cblx0QURKQUNFTlRfVEVYVDogZnVuY3Rpb24odm5vZGUsIHRleHQxLCB0ZXh0Mikge1xuXHRcdHJldHVybiBbXCJBZGphY2VudCB0ZXh0IG5vZGVzIHdpbGwgYmUgbWVyZ2VkLiBDb25zaWRlciBjb25jYXRlbnRhdGluZyB0aGVtIHlvdXJzZWxmIGluIHRoZSB0ZW1wbGF0ZSBmb3IgaW1wcm92ZWQgcGVyZi5cIiwgdm5vZGUsIHRleHQxLCB0ZXh0Ml07XG5cdH0sXG5cblx0QVJSQVlfRkxBVFRFTkVEOiBmdW5jdGlvbih2bm9kZSwgYXJyYXkpIHtcblx0XHRyZXR1cm4gW1wiQXJyYXlzIHdpdGhpbiB0ZW1wbGF0ZXMgd2lsbCBiZSBmbGF0dGVuZWQuIFdoZW4gdGhleSBhcmUgbGVhZGluZyBvciB0cmFpbGluZywgaXQncyBlYXN5IGFuZCBtb3JlIHBlcmZvcm1hbnQgdG8ganVzdCAuY29uY2F0KCkgdGhlbSBpbiB0aGUgdGVtcGxhdGUuXCIsIHZub2RlLCBhcnJheV07XG5cdH0sXG5cblx0QUxSRUFEWV9IWURSQVRFRDogZnVuY3Rpb24odm0pIHtcblx0XHRyZXR1cm4gW1wiQSBjaGlsZCB2aWV3IGZhaWxlZCB0byBtb3VudCBiZWNhdXNlIGl0IHdhcyBhbHJlYWR5IGh5ZHJhdGVkLiBNYWtlIHN1cmUgbm90IHRvIGludm9rZSB2bS5yZWRyYXcoKSBvciB2bS51cGRhdGUoKSBvbiB1bm1vdW50ZWQgdmlld3MuXCIsIHZtXTtcblx0fSxcblxuXHRBVFRBQ0hfSU1QTElDSVRfVEJPRFk6IGZ1bmN0aW9uKHZub2RlLCB2Y2hpbGQpIHtcblx0XHRyZXR1cm4gW1wiPHRhYmxlPjx0cj4gd2FzIGRldGVjdGVkIGluIHRoZSB2dHJlZSwgYnV0IHRoZSBET00gd2lsbCBiZSA8dGFibGU+PHRib2R5Pjx0cj4gYWZ0ZXIgSFRNTCdzIGltcGxpY2l0IHBhcnNpbmcuIFlvdSBzaG91bGQgY3JlYXRlIHRoZSA8dGJvZHk+IHZub2RlIGV4cGxpY2l0bHkgdG8gYXZvaWQgU1NSL2F0dGFjaCgpIGZhaWx1cmVzLlwiLCB2bm9kZSwgdmNoaWxkXTtcblx0fVxufTtcblxuZnVuY3Rpb24gZGV2Tm90aWZ5KGtleSwgYXJncykge1xuXHRpZiAoREVWTU9ERS53YXJuaW5ncyAmJiBpc0Z1bmMoREVWTU9ERVtrZXldKSkge1xuXHRcdHZhciBtc2dBcmdzID0gREVWTU9ERVtrZXldLmFwcGx5KG51bGwsIGFyZ3MpO1xuXG5cdFx0aWYgKG1zZ0FyZ3MpIHtcblx0XHRcdG1zZ0FyZ3NbMF0gPSBrZXkgKyBcIjogXCIgKyAoREVWTU9ERS52ZXJib3NlID8gbXNnQXJnc1swXSA6IFwiXCIpO1xuXHRcdFx0Y29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIG1zZ0FyZ3MpO1xuXHRcdH1cblx0fVxufVxuXG4vLyAoZGUpb3B0aW1pemF0aW9uIGZsYWdzXG5cbi8vIGZvcmNlcyBzbG93IGJvdHRvbS11cCByZW1vdmVDaGlsZCB0byBmaXJlIGRlZXAgd2lsbFJlbW92ZS93aWxsVW5tb3VudCBob29rcyxcbnZhciBERUVQX1JFTU9WRSA9IDE7XG4vLyBwcmV2ZW50cyBpbnNlcnRpbmcvcmVtb3ZpbmcvcmVvcmRlcmluZyBvZiBjaGlsZHJlblxudmFyIEZJWEVEX0JPRFkgPSAyO1xuLy8gZW5hYmxlcyBmYXN0IGtleWVkIGxvb2t1cCBvZiBjaGlsZHJlbiB2aWEgYmluYXJ5IHNlYXJjaCwgZXhwZWN0cyBob21vZ2VuZW91cyBrZXllZCBib2R5XG52YXIgS0VZRURfTElTVCA9IDQ7XG4vLyBpbmRpY2F0ZXMgYW4gdm5vZGUgbWF0Y2gvZGlmZi9yZWN5Y2xlciBmdW5jdGlvbiBmb3IgYm9keVxudmFyIExBWllfTElTVCA9IDg7XG5cbmZ1bmN0aW9uIGluaXRFbGVtZW50Tm9kZSh0YWcsIGF0dHJzLCBib2R5LCBmbGFncykge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblxuXHRub2RlLnR5cGUgPSBFTEVNRU5UO1xuXG5cdGlmIChpc1NldChmbGFncykpXG5cdFx0eyBub2RlLmZsYWdzID0gZmxhZ3M7IH1cblxuXHRub2RlLmF0dHJzID0gYXR0cnM7XG5cblx0dmFyIHBhcnNlZCA9IGNzc1RhZyh0YWcpO1xuXG5cdG5vZGUudGFnID0gcGFyc2VkLnRhZztcblxuXHQvLyBtZWgsIHdlYWsgYXNzZXJ0aW9uLCB3aWxsIGZhaWwgZm9yIGlkPTAsIGV0Yy5cblx0aWYgKHBhcnNlZC5pZCB8fCBwYXJzZWQuY2xhc3MgfHwgcGFyc2VkLmF0dHJzKSB7XG5cdFx0dmFyIHAgPSBub2RlLmF0dHJzIHx8IHt9O1xuXG5cdFx0aWYgKHBhcnNlZC5pZCAmJiAhaXNTZXQocC5pZCkpXG5cdFx0XHR7IHAuaWQgPSBwYXJzZWQuaWQ7IH1cblxuXHRcdGlmIChwYXJzZWQuY2xhc3MpIHtcblx0XHRcdG5vZGUuX2NsYXNzID0gcGFyc2VkLmNsYXNzO1x0XHQvLyBzdGF0aWMgY2xhc3Ncblx0XHRcdHAuY2xhc3MgPSBwYXJzZWQuY2xhc3MgKyAoaXNTZXQocC5jbGFzcykgPyAoXCIgXCIgKyBwLmNsYXNzKSA6IFwiXCIpO1xuXHRcdH1cblx0XHRpZiAocGFyc2VkLmF0dHJzKSB7XG5cdFx0XHRmb3IgKHZhciBrZXkgaW4gcGFyc2VkLmF0dHJzKVxuXHRcdFx0XHR7IGlmICghaXNTZXQocFtrZXldKSlcblx0XHRcdFx0XHR7IHBba2V5XSA9IHBhcnNlZC5hdHRyc1trZXldOyB9IH1cblx0XHR9XG5cbi8vXHRcdGlmIChub2RlLmF0dHJzICE9PSBwKVxuXHRcdFx0bm9kZS5hdHRycyA9IHA7XG5cdH1cblxuXHR2YXIgbWVyZ2VkQXR0cnMgPSBub2RlLmF0dHJzO1xuXG5cdGlmIChpc1NldChtZXJnZWRBdHRycykpIHtcblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX2tleSkpXG5cdFx0XHR7IG5vZGUua2V5ID0gbWVyZ2VkQXR0cnMuX2tleTsgfVxuXG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9yZWYpKVxuXHRcdFx0eyBub2RlLnJlZiA9IG1lcmdlZEF0dHJzLl9yZWY7IH1cblxuXHRcdGlmIChpc1NldChtZXJnZWRBdHRycy5faG9va3MpKVxuXHRcdFx0eyBub2RlLmhvb2tzID0gbWVyZ2VkQXR0cnMuX2hvb2tzOyB9XG5cblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX2RhdGEpKVxuXHRcdFx0eyBub2RlLmRhdGEgPSBtZXJnZWRBdHRycy5fZGF0YTsgfVxuXG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9mbGFncykpXG5cdFx0XHR7IG5vZGUuZmxhZ3MgPSBtZXJnZWRBdHRycy5fZmxhZ3M7IH1cblxuXHRcdGlmICghaXNTZXQobm9kZS5rZXkpKSB7XG5cdFx0XHRpZiAoaXNTZXQobm9kZS5yZWYpKVxuXHRcdFx0XHR7IG5vZGUua2V5ID0gbm9kZS5yZWY7IH1cblx0XHRcdGVsc2UgaWYgKGlzU2V0KG1lcmdlZEF0dHJzLmlkKSlcblx0XHRcdFx0eyBub2RlLmtleSA9IG1lcmdlZEF0dHJzLmlkOyB9XG5cdFx0XHRlbHNlIGlmIChpc1NldChtZXJnZWRBdHRycy5uYW1lKSlcblx0XHRcdFx0eyBub2RlLmtleSA9IG1lcmdlZEF0dHJzLm5hbWUgKyAobWVyZ2VkQXR0cnMudHlwZSA9PT0gXCJyYWRpb1wiIHx8IG1lcmdlZEF0dHJzLnR5cGUgPT09IFwiY2hlY2tib3hcIiA/IG1lcmdlZEF0dHJzLnZhbHVlIDogXCJcIik7IH1cblx0XHR9XG5cdH1cblxuXHRpZiAoYm9keSAhPSBudWxsKVxuXHRcdHsgbm9kZS5ib2R5ID0gYm9keTsgfVxuXG5cdHtcblx0XHRpZiAobm9kZS50YWcgPT09IFwic3ZnXCIpIHtcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdG5vZGUubnMgPT0gbnVsbCAmJiBkZXZOb3RpZnkoXCJTVkdfV1JPTkdfRkFDVE9SWVwiLCBbbm9kZV0pO1xuXHRcdFx0fSwgMTYpO1xuXHRcdH1cblx0XHQvLyB0b2RvOiBhdHRycy5jb250ZW50ZWRpdGFibGUgPT09IFwidHJ1ZVwiP1xuXHRcdGVsc2UgaWYgKC9eKD86aW5wdXR8dGV4dGFyZWF8c2VsZWN0fGRhdGFsaXN0fGtleWdlbnxvdXRwdXQpJC8udGVzdChub2RlLnRhZykgJiYgbm9kZS5rZXkgPT0gbnVsbClcblx0XHRcdHsgZGV2Tm90aWZ5KFwiVU5LRVlFRF9JTlBVVFwiLCBbbm9kZV0pOyB9XG5cdH1cblxuXHRyZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gc2V0UmVmKHZtLCBuYW1lLCBub2RlKSB7XG5cdHZhciBwYXRoID0gW1wicmVmc1wiXS5jb25jYXQobmFtZS5zcGxpdChcIi5cIikpO1xuXHRkZWVwU2V0KHZtLCBwYXRoLCBub2RlKTtcbn1cblxuZnVuY3Rpb24gc2V0RGVlcFJlbW92ZShub2RlKSB7XG5cdHdoaWxlIChub2RlID0gbm9kZS5wYXJlbnQpXG5cdFx0eyBub2RlLmZsYWdzIHw9IERFRVBfUkVNT1ZFOyB9XG59XG5cbi8vIHZuZXcsIHZvbGRcbmZ1bmN0aW9uIHByZVByb2Modm5ldywgcGFyZW50LCBpZHgsIG93blZtKSB7XG5cdGlmICh2bmV3LnR5cGUgPT09IFZNT0RFTCB8fCB2bmV3LnR5cGUgPT09IFZWSUVXKVxuXHRcdHsgcmV0dXJuOyB9XG5cblx0dm5ldy5wYXJlbnQgPSBwYXJlbnQ7XG5cdHZuZXcuaWR4ID0gaWR4O1xuXHR2bmV3LnZtID0gb3duVm07XG5cblx0aWYgKHZuZXcucmVmICE9IG51bGwpXG5cdFx0eyBzZXRSZWYoZ2V0Vm0odm5ldyksIHZuZXcucmVmLCB2bmV3KTsgfVxuXG5cdHZhciBuaCA9IHZuZXcuaG9va3MsXG5cdFx0dmggPSBvd25WbSAmJiBvd25WbS5ob29rcztcblxuXHRpZiAobmggJiYgKG5oLndpbGxSZW1vdmUgfHwgbmguZGlkUmVtb3ZlKSB8fFxuXHRcdHZoICYmICh2aC53aWxsVW5tb3VudCB8fCB2aC5kaWRVbm1vdW50KSlcblx0XHR7IHNldERlZXBSZW1vdmUodm5ldyk7IH1cblxuXHRpZiAoaXNBcnIodm5ldy5ib2R5KSlcblx0XHR7IHByZVByb2NCb2R5KHZuZXcpOyB9XG5cdGVsc2Uge1xuXHRcdGlmIChpc1N0cmVhbSh2bmV3LmJvZHkpKVxuXHRcdFx0eyB2bmV3LmJvZHkgPSBob29rU3RyZWFtKHZuZXcuYm9keSwgZ2V0Vm0odm5ldykpOyB9XG5cdH1cbn1cblxuZnVuY3Rpb24gcHJlUHJvY0JvZHkodm5ldykge1xuXHR2YXIgYm9keSA9IHZuZXcuYm9keTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGJvZHkubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbm9kZTIgPSBib2R5W2ldO1xuXG5cdFx0Ly8gcmVtb3ZlIGZhbHNlL251bGwvdW5kZWZpbmVkXG5cdFx0aWYgKG5vZGUyID09PSBmYWxzZSB8fCBub2RlMiA9PSBudWxsKVxuXHRcdFx0eyBib2R5LnNwbGljZShpLS0sIDEpOyB9XG5cdFx0Ly8gZmxhdHRlbiBhcnJheXNcblx0XHRlbHNlIGlmIChpc0Fycihub2RlMikpIHtcblx0XHRcdHtcblx0XHRcdFx0aWYgKGkgPT09IDAgfHwgaSA9PT0gYm9keS5sZW5ndGggLSAxKVxuXHRcdFx0XHRcdHsgZGV2Tm90aWZ5KFwiQVJSQVlfRkxBVFRFTkVEXCIsIFt2bmV3LCBub2RlMl0pOyB9XG5cdFx0XHR9XG5cdFx0XHRpbnNlcnRBcnIoYm9keSwgbm9kZTIsIGktLSwgMSk7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0aWYgKG5vZGUyLnR5cGUgPT0gbnVsbClcblx0XHRcdFx0eyBib2R5W2ldID0gbm9kZTIgPSBkZWZpbmVUZXh0KFwiXCIrbm9kZTIpOyB9XG5cblx0XHRcdGlmIChub2RlMi50eXBlID09PSBURVhUKSB7XG5cdFx0XHRcdC8vIHJlbW92ZSBlbXB0eSB0ZXh0IG5vZGVzXG5cdFx0XHRcdGlmIChub2RlMi5ib2R5ID09IG51bGwgfHwgbm9kZTIuYm9keSA9PT0gXCJcIilcblx0XHRcdFx0XHR7IGJvZHkuc3BsaWNlKGktLSwgMSk7IH1cblx0XHRcdFx0Ly8gbWVyZ2Ugd2l0aCBwcmV2aW91cyB0ZXh0IG5vZGVcblx0XHRcdFx0ZWxzZSBpZiAoaSA+IDAgJiYgYm9keVtpLTFdLnR5cGUgPT09IFRFWFQpIHtcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRkZXZOb3RpZnkoXCJBREpBQ0VOVF9URVhUXCIsIFt2bmV3LCBib2R5W2ktMV0uYm9keSwgbm9kZTIuYm9keV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRib2R5W2ktMV0uYm9keSArPSBub2RlMi5ib2R5O1xuXHRcdFx0XHRcdGJvZHkuc3BsaWNlKGktLSwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgcHJlUHJvYyhub2RlMiwgdm5ldywgaSwgbnVsbCk7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBwcmVQcm9jKG5vZGUyLCB2bmV3LCBpLCBudWxsKTsgfVxuXHRcdH1cblx0fVxufVxuXG52YXIgdW5pdGxlc3NQcm9wcyA9IHtcblx0YW5pbWF0aW9uSXRlcmF0aW9uQ291bnQ6IHRydWUsXG5cdGJveEZsZXg6IHRydWUsXG5cdGJveEZsZXhHcm91cDogdHJ1ZSxcblx0Ym94T3JkaW5hbEdyb3VwOiB0cnVlLFxuXHRjb2x1bW5Db3VudDogdHJ1ZSxcblx0ZmxleDogdHJ1ZSxcblx0ZmxleEdyb3c6IHRydWUsXG5cdGZsZXhQb3NpdGl2ZTogdHJ1ZSxcblx0ZmxleFNocmluazogdHJ1ZSxcblx0ZmxleE5lZ2F0aXZlOiB0cnVlLFxuXHRmbGV4T3JkZXI6IHRydWUsXG5cdGdyaWRSb3c6IHRydWUsXG5cdGdyaWRDb2x1bW46IHRydWUsXG5cdG9yZGVyOiB0cnVlLFxuXHRsaW5lQ2xhbXA6IHRydWUsXG5cblx0Ym9yZGVySW1hZ2VPdXRzZXQ6IHRydWUsXG5cdGJvcmRlckltYWdlU2xpY2U6IHRydWUsXG5cdGJvcmRlckltYWdlV2lkdGg6IHRydWUsXG5cdGZvbnRXZWlnaHQ6IHRydWUsXG5cdGxpbmVIZWlnaHQ6IHRydWUsXG5cdG9wYWNpdHk6IHRydWUsXG5cdG9ycGhhbnM6IHRydWUsXG5cdHRhYlNpemU6IHRydWUsXG5cdHdpZG93czogdHJ1ZSxcblx0ekluZGV4OiB0cnVlLFxuXHR6b29tOiB0cnVlLFxuXG5cdGZpbGxPcGFjaXR5OiB0cnVlLFxuXHRmbG9vZE9wYWNpdHk6IHRydWUsXG5cdHN0b3BPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VEYXNoYXJyYXk6IHRydWUsXG5cdHN0cm9rZURhc2hvZmZzZXQ6IHRydWUsXG5cdHN0cm9rZU1pdGVybGltaXQ6IHRydWUsXG5cdHN0cm9rZU9wYWNpdHk6IHRydWUsXG5cdHN0cm9rZVdpZHRoOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBhdXRvUHgobmFtZSwgdmFsKSB7XG5cdHtcblx0XHQvLyB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyBpcyBmYXN0ZXIgYnV0IGZhaWxzIGZvciBudW1lcmljIHN0cmluZ3Ncblx0XHRyZXR1cm4gIWlzTmFOKHZhbCkgJiYgIXVuaXRsZXNzUHJvcHNbbmFtZV0gPyAodmFsICsgXCJweFwiKSA6IHZhbDtcblx0fVxufVxuXG4vLyBhc3N1bWVzIGlmIHN0eWxlcyBleGlzdCBib3RoIGFyZSBvYmplY3RzIG9yIGJvdGggYXJlIHN0cmluZ3NcbmZ1bmN0aW9uIHBhdGNoU3R5bGUobiwgbykge1xuXHR2YXIgbnMgPSAgICAgKG4uYXR0cnMgfHwgZW1wdHlPYmopLnN0eWxlO1xuXHR2YXIgb3MgPSBvID8gKG8uYXR0cnMgfHwgZW1wdHlPYmopLnN0eWxlIDogbnVsbDtcblxuXHQvLyByZXBsYWNlIG9yIHJlbW92ZSBpbiBmdWxsXG5cdGlmIChucyA9PSBudWxsIHx8IGlzVmFsKG5zKSlcblx0XHR7IG4uZWwuc3R5bGUuY3NzVGV4dCA9IG5zOyB9XG5cdGVsc2Uge1xuXHRcdGZvciAodmFyIG5uIGluIG5zKSB7XG5cdFx0XHR2YXIgbnYgPSBuc1tubl07XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKGlzU3RyZWFtKG52KSlcblx0XHRcdFx0XHR7IG52ID0gaG9va1N0cmVhbShudiwgZ2V0Vm0obikpOyB9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvcyA9PSBudWxsIHx8IG52ICE9IG51bGwgJiYgbnYgIT09IG9zW25uXSlcblx0XHRcdFx0eyBuLmVsLnN0eWxlW25uXSA9IGF1dG9QeChubiwgbnYpOyB9XG5cdFx0fVxuXG5cdFx0Ly8gY2xlYW4gb2xkXG5cdFx0aWYgKG9zKSB7XG5cdFx0XHRmb3IgKHZhciBvbiBpbiBvcykge1xuXHRcdFx0XHRpZiAobnNbb25dID09IG51bGwpXG5cdFx0XHRcdFx0eyBuLmVsLnN0eWxlW29uXSA9IFwiXCI7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxudmFyIGRpZFF1ZXVlID0gW107XG5cbmZ1bmN0aW9uIGZpcmVIb29rKGhvb2tzLCBuYW1lLCBvLCBuLCBpbW1lZGlhdGUpIHtcblx0aWYgKGhvb2tzICE9IG51bGwpIHtcblx0XHR2YXIgZm4gPSBvLmhvb2tzW25hbWVdO1xuXG5cdFx0aWYgKGZuKSB7XG5cdFx0XHRpZiAobmFtZVswXSA9PT0gXCJkXCIgJiYgbmFtZVsxXSA9PT0gXCJpXCIgJiYgbmFtZVsyXSA9PT0gXCJkXCIpIHtcdC8vIGRpZCpcblx0XHRcdFx0Ly9cdGNvbnNvbGUubG9nKG5hbWUgKyBcIiBzaG91bGQgcXVldWUgdGlsbCByZXBhaW50XCIsIG8sIG4pO1xuXHRcdFx0XHRpbW1lZGlhdGUgPyByZXBhaW50KG8ucGFyZW50KSAmJiBmbihvLCBuKSA6IGRpZFF1ZXVlLnB1c2goW2ZuLCBvLCBuXSk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcdFx0Ly8gd2lsbCpcblx0XHRcdFx0Ly9cdGNvbnNvbGUubG9nKG5hbWUgKyBcIiBtYXkgZGVsYXkgYnkgcHJvbWlzZVwiLCBvLCBuKTtcblx0XHRcdFx0cmV0dXJuIGZuKG8sIG4pO1x0XHQvLyBvciBwYXNzICBkb25lKCkgcmVzb2x2ZXJcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gZHJhaW5EaWRIb29rcyh2bSkge1xuXHRpZiAoZGlkUXVldWUubGVuZ3RoKSB7XG5cdFx0cmVwYWludCh2bS5ub2RlKTtcblxuXHRcdHZhciBpdGVtO1xuXHRcdHdoaWxlIChpdGVtID0gZGlkUXVldWUuc2hpZnQoKSlcblx0XHRcdHsgaXRlbVswXShpdGVtWzFdLCBpdGVtWzJdKTsgfVxuXHR9XG59XG5cbnZhciBkb2MgPSBFTlZfRE9NID8gZG9jdW1lbnQgOiBudWxsO1xuXG5mdW5jdGlvbiBjbG9zZXN0Vk5vZGUoZWwpIHtcblx0d2hpbGUgKGVsLl9ub2RlID09IG51bGwpXG5cdFx0eyBlbCA9IGVsLnBhcmVudE5vZGU7IH1cblx0cmV0dXJuIGVsLl9ub2RlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgbnMpIHtcblx0aWYgKG5zICE9IG51bGwpXG5cdFx0eyByZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKTsgfVxuXHRyZXR1cm4gZG9jLmNyZWF0ZUVsZW1lbnQodGFnKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVGV4dE5vZGUoYm9keSkge1xuXHRyZXR1cm4gZG9jLmNyZWF0ZVRleHROb2RlKGJvZHkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21tZW50KGJvZHkpIHtcblx0cmV0dXJuIGRvYy5jcmVhdGVDb21tZW50KGJvZHkpO1xufVxuXG4vLyA/IHJlbW92ZXMgaWYgIXJlY3ljbGVkXG5mdW5jdGlvbiBuZXh0U2liKHNpYikge1xuXHRyZXR1cm4gc2liLm5leHRTaWJsaW5nO1xufVxuXG4vLyA/IHJlbW92ZXMgaWYgIXJlY3ljbGVkXG5mdW5jdGlvbiBwcmV2U2liKHNpYikge1xuXHRyZXR1cm4gc2liLnByZXZpb3VzU2libGluZztcbn1cblxuLy8gVE9ETzogdGhpcyBzaG91bGQgY29sbGVjdCBhbGwgZGVlcCBwcm9tcyBmcm9tIGFsbCBob29rcyBhbmQgcmV0dXJuIFByb21pc2UuYWxsKClcbmZ1bmN0aW9uIGRlZXBOb3RpZnlSZW1vdmUobm9kZSkge1xuXHR2YXIgdm0gPSBub2RlLnZtO1xuXG5cdHZhciB3dVJlcyA9IHZtICE9IG51bGwgJiYgZmlyZUhvb2sodm0uaG9va3MsIFwid2lsbFVubW91bnRcIiwgdm0sIHZtLmRhdGEpO1xuXG5cdHZhciB3clJlcyA9IGZpcmVIb29rKG5vZGUuaG9va3MsIFwid2lsbFJlbW92ZVwiLCBub2RlKTtcblxuXHRpZiAoKG5vZGUuZmxhZ3MgJiBERUVQX1JFTU9WRSkgPT09IERFRVBfUkVNT1ZFICYmIGlzQXJyKG5vZGUuYm9keSkpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKylcblx0XHRcdHsgZGVlcE5vdGlmeVJlbW92ZShub2RlLmJvZHlbaV0pOyB9XG5cdH1cblxuXHRyZXR1cm4gd3VSZXMgfHwgd3JSZXM7XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVDaGlsZChwYXJFbCwgZWwsIGltbWVkaWF0ZSkge1xuXHR2YXIgbm9kZSA9IGVsLl9ub2RlLCB2bSA9IG5vZGUudm07XG5cblx0aWYgKGlzQXJyKG5vZGUuYm9keSkpIHtcblx0XHRpZiAoKG5vZGUuZmxhZ3MgJiBERUVQX1JFTU9WRSkgPT09IERFRVBfUkVNT1ZFKSB7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKylcblx0XHRcdFx0eyBfcmVtb3ZlQ2hpbGQoZWwsIG5vZGUuYm9keVtpXS5lbCk7IH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0eyBkZWVwVW5yZWYobm9kZSk7IH1cblx0fVxuXG5cdGRlbGV0ZSBlbC5fbm9kZTtcblxuXHRwYXJFbC5yZW1vdmVDaGlsZChlbCk7XG5cblx0ZmlyZUhvb2sobm9kZS5ob29rcywgXCJkaWRSZW1vdmVcIiwgbm9kZSwgbnVsbCwgaW1tZWRpYXRlKTtcblxuXHRpZiAodm0gIT0gbnVsbCkge1xuXHRcdGZpcmVIb29rKHZtLmhvb2tzLCBcImRpZFVubW91bnRcIiwgdm0sIHZtLmRhdGEsIGltbWVkaWF0ZSk7XG5cdFx0dm0ubm9kZSA9IG51bGw7XG5cdH1cbn1cblxuLy8gdG9kbzogc2hvdWxkIGRlbGF5IHBhcmVudCB1bm1vdW50KCkgYnkgcmV0dXJuaW5nIHJlcyBwcm9tP1xuZnVuY3Rpb24gcmVtb3ZlQ2hpbGQocGFyRWwsIGVsKSB7XG5cdHZhciBub2RlID0gZWwuX25vZGU7XG5cblx0Ly8gYWxyZWFkeSBtYXJrZWQgZm9yIHJlbW92YWxcblx0aWYgKG5vZGUuX2RlYWQpIHsgcmV0dXJuOyB9XG5cblx0dmFyIHJlcyA9IGRlZXBOb3RpZnlSZW1vdmUobm9kZSk7XG5cblx0aWYgKHJlcyAhPSBudWxsICYmIGlzUHJvbShyZXMpKSB7XG5cdFx0bm9kZS5fZGVhZCA9IHRydWU7XG5cdFx0cmVzLnRoZW4oY3VycnkoX3JlbW92ZUNoaWxkLCBbcGFyRWwsIGVsLCB0cnVlXSkpO1xuXHR9XG5cdGVsc2Vcblx0XHR7IF9yZW1vdmVDaGlsZChwYXJFbCwgZWwpOyB9XG59XG5cbmZ1bmN0aW9uIGRlZXBVbnJlZihub2RlKSB7XG5cdHZhciBvYm9keSA9IG5vZGUuYm9keTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IG9ib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG8yID0gb2JvZHlbaV07XG5cdFx0ZGVsZXRlIG8yLmVsLl9ub2RlO1xuXG5cdFx0aWYgKG8yLnZtICE9IG51bGwpXG5cdFx0XHR7IG8yLnZtLm5vZGUgPSBudWxsOyB9XG5cblx0XHRpZiAoaXNBcnIobzIuYm9keSkpXG5cdFx0XHR7IGRlZXBVbnJlZihvMik7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBjbGVhckNoaWxkcmVuKHBhcmVudCkge1xuXHR2YXIgcGFyRWwgPSBwYXJlbnQuZWw7XG5cblx0aWYgKChwYXJlbnQuZmxhZ3MgJiBERUVQX1JFTU9WRSkgPT09IDApIHtcblx0XHRpc0FycihwYXJlbnQuYm9keSkgJiYgZGVlcFVucmVmKHBhcmVudCk7XG5cdFx0cGFyRWwudGV4dENvbnRlbnQgPSBudWxsO1xuXHR9XG5cdGVsc2Uge1xuXHRcdHZhciBlbCA9IHBhckVsLmZpcnN0Q2hpbGQ7XG5cblx0XHRkbyB7XG5cdFx0XHR2YXIgbmV4dCA9IG5leHRTaWIoZWwpO1xuXHRcdFx0cmVtb3ZlQ2hpbGQocGFyRWwsIGVsKTtcblx0XHR9IHdoaWxlIChlbCA9IG5leHQpO1xuXHR9XG59XG5cbi8vIHRvZG86IGhvb2tzXG5mdW5jdGlvbiBpbnNlcnRCZWZvcmUocGFyRWwsIGVsLCByZWZFbCkge1xuXHR2YXIgbm9kZSA9IGVsLl9ub2RlLCBpbkRvbSA9IGVsLnBhcmVudE5vZGUgIT0gbnVsbDtcblxuXHQvLyBlbCA9PT0gcmVmRWwgaXMgYXNzZXJ0ZWQgYXMgYSBuby1vcCBpbnNlcnQgY2FsbGVkIHRvIGZpcmUgaG9va3Ncblx0dmFyIHZtID0gKGVsID09PSByZWZFbCB8fCAhaW5Eb20pID8gbm9kZS52bSA6IG51bGw7XG5cblx0aWYgKHZtICE9IG51bGwpXG5cdFx0eyBmaXJlSG9vayh2bS5ob29rcywgXCJ3aWxsTW91bnRcIiwgdm0sIHZtLmRhdGEpOyB9XG5cblx0ZmlyZUhvb2sobm9kZS5ob29rcywgaW5Eb20gPyBcIndpbGxSZWluc2VydFwiIDogXCJ3aWxsSW5zZXJ0XCIsIG5vZGUpO1xuXHRwYXJFbC5pbnNlcnRCZWZvcmUoZWwsIHJlZkVsKTtcblx0ZmlyZUhvb2sobm9kZS5ob29rcywgaW5Eb20gPyBcImRpZFJlaW5zZXJ0XCIgOiBcImRpZEluc2VydFwiLCBub2RlKTtcblxuXHRpZiAodm0gIT0gbnVsbClcblx0XHR7IGZpcmVIb29rKHZtLmhvb2tzLCBcImRpZE1vdW50XCIsIHZtLCB2bS5kYXRhKTsgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihwYXJFbCwgZWwsIHJlZkVsKSB7XG5cdGluc2VydEJlZm9yZShwYXJFbCwgZWwsIHJlZkVsID8gbmV4dFNpYihyZWZFbCkgOiBudWxsKTtcbn1cblxudmFyIG9uZW1pdCA9IHt9O1xuXG5mdW5jdGlvbiBlbWl0Q2ZnKGNmZykge1xuXHRhc3NpZ25PYmoob25lbWl0LCBjZmcpO1xufVxuXG5mdW5jdGlvbiBlbWl0KGV2TmFtZSkge1xuXHR2YXIgdGFyZyA9IHRoaXMsXG5cdFx0c3JjID0gdGFyZztcblxuXHR2YXIgYXJncyA9IHNsaWNlQXJncyhhcmd1bWVudHMsIDEpLmNvbmNhdChzcmMsIHNyYy5kYXRhKTtcblxuXHRkbyB7XG5cdFx0dmFyIGV2cyA9IHRhcmcub25lbWl0O1xuXHRcdHZhciBmbiA9IGV2cyA/IGV2c1tldk5hbWVdIDogbnVsbDtcblxuXHRcdGlmIChmbikge1xuXHRcdFx0Zm4uYXBwbHkodGFyZywgYXJncyk7XG5cdFx0XHRicmVhaztcblx0XHR9XG5cdH0gd2hpbGUgKHRhcmcgPSB0YXJnLnBhcmVudCgpKTtcblxuXHRpZiAob25lbWl0W2V2TmFtZV0pXG5cdFx0eyBvbmVtaXRbZXZOYW1lXS5hcHBseSh0YXJnLCBhcmdzKTsgfVxufVxuXG52YXIgb25ldmVudCA9IG5vb3A7XG5cbmZ1bmN0aW9uIGNvbmZpZyhuZXdDZmcpIHtcblx0b25ldmVudCA9IG5ld0NmZy5vbmV2ZW50IHx8IG9uZXZlbnQ7XG5cblx0e1xuXHRcdGlmIChuZXdDZmcub25lbWl0KVxuXHRcdFx0eyBlbWl0Q2ZnKG5ld0NmZy5vbmVtaXQpOyB9XG5cdH1cblxuXHR7XG5cdFx0aWYgKG5ld0NmZy5zdHJlYW0pXG5cdFx0XHR7IHN0cmVhbUNmZyhuZXdDZmcuc3RyZWFtKTsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIGJpbmRFdihlbCwgdHlwZSwgZm4pIHtcblx0ZWxbdHlwZV0gPSBmbjtcbn1cblxuZnVuY3Rpb24gZXhlYyhmbiwgYXJncywgZSwgbm9kZSwgdm0pIHtcblx0dmFyIG91dCA9IGZuLmFwcGx5KHZtLCBhcmdzLmNvbmNhdChbZSwgbm9kZSwgdm0sIHZtLmRhdGFdKSk7XG5cblx0Ly8gc2hvdWxkIHRoZXNlIHJlc3BlY3Qgb3V0ID09PSBmYWxzZT9cblx0dm0ub25ldmVudChlLCBub2RlLCB2bSwgdm0uZGF0YSwgYXJncyk7XG5cdG9uZXZlbnQuY2FsbChudWxsLCBlLCBub2RlLCB2bSwgdm0uZGF0YSwgYXJncyk7XG5cblx0aWYgKG91dCA9PT0gZmFsc2UpIHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYW5kbGUoZSkge1xuXHR2YXIgbm9kZSA9IGNsb3Nlc3RWTm9kZShlLnRhcmdldCk7XG5cdHZhciB2bSA9IGdldFZtKG5vZGUpO1xuXG5cdHZhciBldkRlZiA9IGUuY3VycmVudFRhcmdldC5fbm9kZS5hdHRyc1tcIm9uXCIgKyBlLnR5cGVdLCBmbiwgYXJncztcblxuXHRpZiAoaXNBcnIoZXZEZWYpKSB7XG5cdFx0Zm4gPSBldkRlZlswXTtcblx0XHRhcmdzID0gZXZEZWYuc2xpY2UoMSk7XG5cdFx0ZXhlYyhmbiwgYXJncywgZSwgbm9kZSwgdm0pO1xuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAodmFyIHNlbCBpbiBldkRlZikge1xuXHRcdFx0aWYgKGUudGFyZ2V0Lm1hdGNoZXMoc2VsKSkge1xuXHRcdFx0XHR2YXIgZXZEZWYyID0gZXZEZWZbc2VsXTtcblxuXHRcdFx0XHRpZiAoaXNBcnIoZXZEZWYyKSkge1xuXHRcdFx0XHRcdGZuID0gZXZEZWYyWzBdO1xuXHRcdFx0XHRcdGFyZ3MgPSBldkRlZjIuc2xpY2UoMSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0Zm4gPSBldkRlZjI7XG5cdFx0XHRcdFx0YXJncyA9IFtdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXhlYyhmbiwgYXJncywgZSwgbm9kZSwgdm0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBwYXRjaEV2ZW50KG5vZGUsIG5hbWUsIG52YWwsIG92YWwpIHtcblx0aWYgKG52YWwgPT09IG92YWwpXG5cdFx0eyByZXR1cm47IH1cblxuXHR7XG5cdFx0aWYgKGlzRnVuYyhudmFsKSAmJiBpc0Z1bmMob3ZhbCkgJiYgb3ZhbC5uYW1lID09IG52YWwubmFtZSlcblx0XHRcdHsgZGV2Tm90aWZ5KFwiSU5MSU5FX0hBTkRMRVJcIiwgW25vZGUsIG92YWwsIG52YWxdKTsgfVxuXG5cdFx0aWYgKG92YWwgIT0gbnVsbCAmJiBudmFsICE9IG51bGwgJiZcblx0XHRcdChcblx0XHRcdFx0aXNBcnIob3ZhbCkgIT0gaXNBcnIobnZhbCkgfHxcblx0XHRcdFx0aXNQbGFpbk9iaihvdmFsKSAhPSBpc1BsYWluT2JqKG52YWwpIHx8XG5cdFx0XHRcdGlzRnVuYyhvdmFsKSAhPSBpc0Z1bmMobnZhbClcblx0XHRcdClcblx0XHQpIHsgZGV2Tm90aWZ5KFwiTUlTTUFUQ0hFRF9IQU5ETEVSXCIsIFtub2RlLCBvdmFsLCBudmFsXSk7IH1cblx0fVxuXG5cdHZhciBlbCA9IG5vZGUuZWw7XG5cblx0aWYgKG52YWwgPT0gbnVsbCB8fCBpc0Z1bmMobnZhbCkpXG5cdFx0eyBiaW5kRXYoZWwsIG5hbWUsIG52YWwpOyB9XG5cdGVsc2UgaWYgKG92YWwgPT0gbnVsbClcblx0XHR7IGJpbmRFdihlbCwgbmFtZSwgaGFuZGxlKTsgfVxufVxuXG5mdW5jdGlvbiByZW1BdHRyKG5vZGUsIG5hbWUsIGFzUHJvcCkge1xuXHRpZiAobmFtZVswXSA9PT0gXCIuXCIpIHtcblx0XHRuYW1lID0gbmFtZS5zdWJzdHIoMSk7XG5cdFx0YXNQcm9wID0gdHJ1ZTtcblx0fVxuXG5cdGlmIChhc1Byb3ApXG5cdFx0eyBub2RlLmVsW25hbWVdID0gXCJcIjsgfVxuXHRlbHNlXG5cdFx0eyBub2RlLmVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTsgfVxufVxuXG4vLyBzZXRBdHRyXG4vLyBkaWZmLCBcIi5cIiwgXCJvbipcIiwgYm9vbCB2YWxzLCBza2lwIF8qLCB2YWx1ZS9jaGVja2VkL3NlbGVjdGVkIHNlbGVjdGVkSW5kZXhcbmZ1bmN0aW9uIHNldEF0dHIobm9kZSwgbmFtZSwgdmFsLCBhc1Byb3AsIGluaXRpYWwpIHtcblx0dmFyIGVsID0gbm9kZS5lbDtcblxuXHRpZiAodmFsID09IG51bGwpXG5cdFx0eyAhaW5pdGlhbCAmJiByZW1BdHRyKG5vZGUsIG5hbWUsIGZhbHNlKTsgfVx0XHQvLyB3aWxsIGFsc28gcmVtb3ZlQXR0ciBvZiBzdHlsZTogbnVsbFxuXHRlbHNlIGlmIChub2RlLm5zICE9IG51bGwpXG5cdFx0eyBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTsgfVxuXHRlbHNlIGlmIChuYW1lID09PSBcImNsYXNzXCIpXG5cdFx0eyBlbC5jbGFzc05hbWUgPSB2YWw7IH1cblx0ZWxzZSBpZiAobmFtZSA9PT0gXCJpZFwiIHx8IHR5cGVvZiB2YWwgPT09IFwiYm9vbGVhblwiIHx8IGFzUHJvcClcblx0XHR7IGVsW25hbWVdID0gdmFsOyB9XG5cdGVsc2UgaWYgKG5hbWVbMF0gPT09IFwiLlwiKVxuXHRcdHsgZWxbbmFtZS5zdWJzdHIoMSldID0gdmFsOyB9XG5cdGVsc2Vcblx0XHR7IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWwpOyB9XG59XG5cbmZ1bmN0aW9uIHBhdGNoQXR0cnModm5vZGUsIGRvbm9yLCBpbml0aWFsKSB7XG5cdHZhciBuYXR0cnMgPSB2bm9kZS5hdHRycyB8fCBlbXB0eU9iajtcblx0dmFyIG9hdHRycyA9IGRvbm9yLmF0dHJzIHx8IGVtcHR5T2JqO1xuXG5cdGlmIChuYXR0cnMgPT09IG9hdHRycykge1xuXHRcdHsgZGV2Tm90aWZ5KFwiUkVVU0VEX0FUVFJTXCIsIFt2bm9kZV0pOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG5hdHRycykge1xuXHRcdFx0dmFyIG52YWwgPSBuYXR0cnNba2V5XTtcblx0XHRcdHZhciBpc0R5biA9IGlzRHluUHJvcCh2bm9kZS50YWcsIGtleSk7XG5cdFx0XHR2YXIgb3ZhbCA9IGlzRHluID8gdm5vZGUuZWxba2V5XSA6IG9hdHRyc1trZXldO1xuXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChpc1N0cmVhbShudmFsKSlcblx0XHRcdFx0XHR7IG5hdHRyc1trZXldID0gbnZhbCA9IGhvb2tTdHJlYW0obnZhbCwgZ2V0Vm0odm5vZGUpKTsgfVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobnZhbCA9PT0gb3ZhbCkge31cblx0XHRcdGVsc2UgaWYgKGlzU3R5bGVQcm9wKGtleSkpXG5cdFx0XHRcdHsgcGF0Y2hTdHlsZSh2bm9kZSwgZG9ub3IpOyB9XG5cdFx0XHRlbHNlIGlmIChpc1NwbFByb3Aoa2V5KSkge31cblx0XHRcdGVsc2UgaWYgKGlzRXZQcm9wKGtleSkpXG5cdFx0XHRcdHsgcGF0Y2hFdmVudCh2bm9kZSwga2V5LCBudmFsLCBvdmFsKTsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IHNldEF0dHIodm5vZGUsIGtleSwgbnZhbCwgaXNEeW4sIGluaXRpYWwpOyB9XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogYmVuY2ggc3R5bGUuY3NzVGV4dCA9IFwiXCIgdnMgcmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIilcblx0XHRmb3IgKHZhciBrZXkgaW4gb2F0dHJzKSB7XG5cdFx0XHQhKGtleSBpbiBuYXR0cnMpICYmXG5cdFx0XHQhaXNTcGxQcm9wKGtleSkgJiZcblx0XHRcdHJlbUF0dHIodm5vZGUsIGtleSwgaXNEeW5Qcm9wKHZub2RlLnRhZywga2V5KSB8fCBpc0V2UHJvcChrZXkpKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0aWYgKHZpZXcudHlwZSA9PT0gVlZJRVcpIHtcblx0XHRkYXRhXHQ9IHZpZXcuZGF0YTtcblx0XHRrZXlcdFx0PSB2aWV3LmtleTtcblx0XHRvcHRzXHQ9IHZpZXcub3B0cztcblx0XHR2aWV3XHQ9IHZpZXcudmlldztcblx0fVxuXG5cdHJldHVybiBuZXcgVmlld01vZGVsKHZpZXcsIGRhdGEsIGtleSwgb3B0cyk7XG59XG5cbi8vaW1wb3J0IHsgWE1MX05TLCBYTElOS19OUyB9IGZyb20gJy4vZGVmaW5lU3ZnRWxlbWVudCc7XG5mdW5jdGlvbiBoeWRyYXRlQm9keSh2bm9kZSkge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZub2RlLmJvZHkubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdm5vZGUyID0gdm5vZGUuYm9keVtpXTtcblx0XHR2YXIgdHlwZTIgPSB2bm9kZTIudHlwZTtcblxuXHRcdC8vIEVMRU1FTlQsVEVYVCxDT01NRU5UXG5cdFx0aWYgKHR5cGUyIDw9IENPTU1FTlQpXG5cdFx0XHR7IGluc2VydEJlZm9yZSh2bm9kZS5lbCwgaHlkcmF0ZSh2bm9kZTIpKTsgfVx0XHQvLyB2bm9kZS5lbC5hcHBlbmRDaGlsZChoeWRyYXRlKHZub2RlMikpXG5cdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZWSUVXKSB7XG5cdFx0XHR2YXIgdm0gPSBjcmVhdGVWaWV3KHZub2RlMi52aWV3LCB2bm9kZTIuZGF0YSwgdm5vZGUyLmtleSwgdm5vZGUyLm9wdHMpLl9yZWRyYXcodm5vZGUsIGksIGZhbHNlKTtcdFx0Ly8gdG9kbzogaGFuZGxlIG5ldyBkYXRhIHVwZGF0ZXNcblx0XHRcdHR5cGUyID0gdm0ubm9kZS50eXBlO1xuXHRcdFx0aW5zZXJ0QmVmb3JlKHZub2RlLmVsLCBoeWRyYXRlKHZtLm5vZGUpKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZNT0RFTCkge1xuXHRcdFx0dmFyIHZtID0gdm5vZGUyLnZtO1xuXHRcdFx0dm0uX3JlZHJhdyh2bm9kZSwgaSk7XHRcdFx0XHRcdC8vICwgZmFsc2Vcblx0XHRcdHR5cGUyID0gdm0ubm9kZS50eXBlO1xuXHRcdFx0aW5zZXJ0QmVmb3JlKHZub2RlLmVsLCB2bS5ub2RlLmVsKTtcdFx0Ly8gLCBoeWRyYXRlKHZtLm5vZGUpXG5cdFx0fVxuXHR9XG59XG5cbi8vICBUT0RPOiBEUlkgdGhpcyBvdXQuIHJldXNpbmcgbm9ybWFsIHBhdGNoIGhlcmUgbmVnYXRpdmVseSBhZmZlY3RzIFY4J3MgSklUXG5mdW5jdGlvbiBoeWRyYXRlKHZub2RlLCB3aXRoRWwpIHtcblx0aWYgKHZub2RlLmVsID09IG51bGwpIHtcblx0XHRpZiAodm5vZGUudHlwZSA9PT0gRUxFTUVOVCkge1xuXHRcdFx0dm5vZGUuZWwgPSB3aXRoRWwgfHwgY3JlYXRlRWxlbWVudCh2bm9kZS50YWcsIHZub2RlLm5zKTtcblxuXHRcdC8vXHRpZiAodm5vZGUudGFnID09PSBcInN2Z1wiKVxuXHRcdC8vXHRcdHZub2RlLmVsLnNldEF0dHJpYnV0ZU5TKFhNTF9OUywgJ3htbG5zOnhsaW5rJywgWExJTktfTlMpO1xuXG5cdFx0XHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbClcblx0XHRcdFx0eyBwYXRjaEF0dHJzKHZub2RlLCBlbXB0eU9iaiwgdHJ1ZSk7IH1cblxuXHRcdFx0aWYgKCh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVClcdC8vIHZub2RlLmJvZHkgaW5zdGFuY2VvZiBMYXp5TGlzdFxuXHRcdFx0XHR7IHZub2RlLmJvZHkuYm9keSh2bm9kZSk7IH1cblxuXHRcdFx0aWYgKGlzQXJyKHZub2RlLmJvZHkpKVxuXHRcdFx0XHR7IGh5ZHJhdGVCb2R5KHZub2RlKTsgfVxuXHRcdFx0ZWxzZSBpZiAodm5vZGUuYm9keSAhPSBudWxsICYmIHZub2RlLmJvZHkgIT09IFwiXCIpXG5cdFx0XHRcdHsgdm5vZGUuZWwudGV4dENvbnRlbnQgPSB2bm9kZS5ib2R5OyB9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHZub2RlLnR5cGUgPT09IFRFWFQpXG5cdFx0XHR7IHZub2RlLmVsID0gd2l0aEVsIHx8IGNyZWF0ZVRleHROb2RlKHZub2RlLmJvZHkpOyB9XG5cdFx0ZWxzZSBpZiAodm5vZGUudHlwZSA9PT0gQ09NTUVOVClcblx0XHRcdHsgdm5vZGUuZWwgPSB3aXRoRWwgfHwgY3JlYXRlQ29tbWVudCh2bm9kZS5ib2R5KTsgfVxuXHR9XG5cblx0dm5vZGUuZWwuX25vZGUgPSB2bm9kZTtcblxuXHRyZXR1cm4gdm5vZGUuZWw7XG59XG5cbi8vIHByZXZlbnQgR0NDIGZyb20gaW5saW5pbmcgc29tZSBsYXJnZSBmdW5jcyAod2hpY2ggbmVnYXRpdmVseSBhZmZlY3RzIENocm9tZSdzIEpJVClcbi8vd2luZG93LnN5bmNDaGlsZHJlbiA9IHN5bmNDaGlsZHJlbjtcbndpbmRvdy5saXNNb3ZlID0gbGlzTW92ZTtcblxuZnVuY3Rpb24gbmV4dE5vZGUobm9kZSwgYm9keSkge1xuXHRyZXR1cm4gYm9keVtub2RlLmlkeCArIDFdO1xufVxuXG5mdW5jdGlvbiBwcmV2Tm9kZShub2RlLCBib2R5KSB7XG5cdHJldHVybiBib2R5W25vZGUuaWR4IC0gMV07XG59XG5cbmZ1bmN0aW9uIHBhcmVudE5vZGUobm9kZSkge1xuXHRyZXR1cm4gbm9kZS5wYXJlbnQ7XG59XG5cbnZhciBCUkVBSyA9IDE7XG52YXIgQlJFQUtfQUxMID0gMjtcblxuZnVuY3Rpb24gc3luY0RpcihhZHZTaWIsIGFkdk5vZGUsIGluc2VydCwgc2liTmFtZSwgbm9kZU5hbWUsIGludlNpYk5hbWUsIGludk5vZGVOYW1lLCBpbnZJbnNlcnQpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgY29udlRlc3QsIGxpcykge1xuXHRcdHZhciBzaWJOb2RlLCB0bXBTaWI7XG5cblx0XHRpZiAoc3RhdGVbc2liTmFtZV0gIT0gbnVsbCkge1xuXHRcdFx0Ly8gc2tpcCBkb20gZWxlbWVudHMgbm90IGNyZWF0ZWQgYnkgZG9tdm1cblx0XHRcdGlmICgoc2liTm9kZSA9IHN0YXRlW3NpYk5hbWVdLl9ub2RlKSA9PSBudWxsKSB7XG5cdFx0XHRcdHsgZGV2Tm90aWZ5KFwiRk9SRUlHTl9FTEVNRU5UXCIsIFtzdGF0ZVtzaWJOYW1lXV0pOyB9XG5cblx0XHRcdFx0c3RhdGVbc2liTmFtZV0gPSBhZHZTaWIoc3RhdGVbc2liTmFtZV0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChwYXJlbnROb2RlKHNpYk5vZGUpICE9PSBub2RlKSB7XG5cdFx0XHRcdHRtcFNpYiA9IGFkdlNpYihzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0XHRcdHNpYk5vZGUudm0gIT0gbnVsbCA/IHNpYk5vZGUudm0udW5tb3VudCh0cnVlKSA6IHJlbW92ZUNoaWxkKHBhckVsLCBzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0XHRcdHN0YXRlW3NpYk5hbWVdID0gdG1wU2liO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKHN0YXRlW25vZGVOYW1lXSA9PSBjb252VGVzdClcblx0XHRcdHsgcmV0dXJuIEJSRUFLX0FMTDsgfVxuXHRcdGVsc2UgaWYgKHN0YXRlW25vZGVOYW1lXS5lbCA9PSBudWxsKSB7XG5cdFx0XHRpbnNlcnQocGFyRWwsIGh5ZHJhdGUoc3RhdGVbbm9kZU5hbWVdKSwgc3RhdGVbc2liTmFtZV0pO1x0Ly8gc2hvdWxkIGxpcyBiZSB1cGRhdGVkIGhlcmU/XG5cdFx0XHRzdGF0ZVtub2RlTmFtZV0gPSBhZHZOb2RlKHN0YXRlW25vZGVOYW1lXSwgYm9keSk7XHRcdC8vIGFsc28gbmVlZCB0byBhZHZhbmNlIHNpYj9cblx0XHR9XG5cdFx0ZWxzZSBpZiAoc3RhdGVbbm9kZU5hbWVdLmVsID09PSBzdGF0ZVtzaWJOYW1lXSkge1xuXHRcdFx0c3RhdGVbbm9kZU5hbWVdID0gYWR2Tm9kZShzdGF0ZVtub2RlTmFtZV0sIGJvZHkpO1xuXHRcdFx0c3RhdGVbc2liTmFtZV0gPSBhZHZTaWIoc3RhdGVbc2liTmFtZV0pO1xuXHRcdH1cblx0XHQvLyBoZWFkLT50YWlsIG9yIHRhaWwtPmhlYWRcblx0XHRlbHNlIGlmICghbGlzICYmIHNpYk5vZGUgPT09IHN0YXRlW2ludk5vZGVOYW1lXSkge1xuXHRcdFx0dG1wU2liID0gc3RhdGVbc2liTmFtZV07XG5cdFx0XHRzdGF0ZVtzaWJOYW1lXSA9IGFkdlNpYih0bXBTaWIpO1xuXHRcdFx0aW52SW5zZXJ0KHBhckVsLCB0bXBTaWIsIHN0YXRlW2ludlNpYk5hbWVdKTtcblx0XHRcdHN0YXRlW2ludlNpYk5hbWVdID0gdG1wU2liO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHtcblx0XHRcdFx0aWYgKHN0YXRlW25vZGVOYW1lXS52bSAhPSBudWxsKVxuXHRcdFx0XHRcdHsgZGV2Tm90aWZ5KFwiQUxSRUFEWV9IWURSQVRFRFwiLCBbc3RhdGVbbm9kZU5hbWVdLnZtXSk7IH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKGxpcyAmJiBzdGF0ZVtzaWJOYW1lXSAhPSBudWxsKVxuXHRcdFx0XHR7IHJldHVybiBsaXNNb3ZlKGFkdlNpYiwgYWR2Tm9kZSwgaW5zZXJ0LCBzaWJOYW1lLCBub2RlTmFtZSwgcGFyRWwsIGJvZHksIHNpYk5vZGUsIHN0YXRlKTsgfVxuXG5cdFx0XHRyZXR1cm4gQlJFQUs7XG5cdFx0fVxuXHR9O1xufVxuXG5mdW5jdGlvbiBsaXNNb3ZlKGFkdlNpYiwgYWR2Tm9kZSwgaW5zZXJ0LCBzaWJOYW1lLCBub2RlTmFtZSwgcGFyRWwsIGJvZHksIHNpYk5vZGUsIHN0YXRlKSB7XG5cdGlmIChzaWJOb2RlLl9saXMpIHtcblx0XHRpbnNlcnQocGFyRWwsIHN0YXRlW25vZGVOYW1lXS5lbCwgc3RhdGVbc2liTmFtZV0pO1xuXHRcdHN0YXRlW25vZGVOYW1lXSA9IGFkdk5vZGUoc3RhdGVbbm9kZU5hbWVdLCBib2R5KTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBmaW5kIGNsb3Nlc3QgdG9tYlxuXHRcdHZhciB0ID0gYmluYXJ5RmluZExhcmdlcihzaWJOb2RlLmlkeCwgc3RhdGUudG9tYnMpO1xuXHRcdHNpYk5vZGUuX2xpcyA9IHRydWU7XG5cdFx0dmFyIHRtcFNpYiA9IGFkdlNpYihzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0aW5zZXJ0KHBhckVsLCBzdGF0ZVtzaWJOYW1lXSwgdCAhPSBudWxsID8gYm9keVtzdGF0ZS50b21ic1t0XV0uZWwgOiB0KTtcblxuXHRcdGlmICh0ID09IG51bGwpXG5cdFx0XHR7IHN0YXRlLnRvbWJzLnB1c2goc2liTm9kZS5pZHgpOyB9XG5cdFx0ZWxzZVxuXHRcdFx0eyBzdGF0ZS50b21icy5zcGxpY2UodCwgMCwgc2liTm9kZS5pZHgpOyB9XG5cblx0XHRzdGF0ZVtzaWJOYW1lXSA9IHRtcFNpYjtcblx0fVxufVxuXG52YXIgc3luY0xmdCA9IHN5bmNEaXIobmV4dFNpYiwgbmV4dE5vZGUsIGluc2VydEJlZm9yZSwgXCJsZnRTaWJcIiwgXCJsZnROb2RlXCIsIFwicmd0U2liXCIsIFwicmd0Tm9kZVwiLCBpbnNlcnRBZnRlcik7XG52YXIgc3luY1JndCA9IHN5bmNEaXIocHJldlNpYiwgcHJldk5vZGUsIGluc2VydEFmdGVyLCBcInJndFNpYlwiLCBcInJndE5vZGVcIiwgXCJsZnRTaWJcIiwgXCJsZnROb2RlXCIsIGluc2VydEJlZm9yZSk7XG5cbmZ1bmN0aW9uIHN5bmNDaGlsZHJlbihub2RlLCBkb25vcikge1xuXHR2YXIgb2JvZHlcdD0gZG9ub3IuYm9keSxcblx0XHRwYXJFbFx0PSBub2RlLmVsLFxuXHRcdGJvZHlcdD0gbm9kZS5ib2R5LFxuXHRcdHN0YXRlID0ge1xuXHRcdFx0bGZ0Tm9kZTpcdGJvZHlbMF0sXG5cdFx0XHRyZ3ROb2RlOlx0Ym9keVtib2R5Lmxlbmd0aCAtIDFdLFxuXHRcdFx0bGZ0U2liOlx0XHQoKG9ib2R5KVswXSB8fCBlbXB0eU9iaikuZWwsXG5cdFx0XHRyZ3RTaWI6XHRcdChvYm9keVtvYm9keS5sZW5ndGggLSAxXSB8fCBlbXB0eU9iaikuZWwsXG5cdFx0fTtcblxuXHRjb252ZXJnZTpcblx0d2hpbGUgKDEpIHtcbi8vXHRcdGZyb21fbGVmdDpcblx0XHR3aGlsZSAoMSkge1xuXHRcdFx0dmFyIGwgPSBzeW5jTGZ0KG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgbnVsbCwgZmFsc2UpO1xuXHRcdFx0aWYgKGwgPT09IEJSRUFLKSB7IGJyZWFrOyB9XG5cdFx0XHRpZiAobCA9PT0gQlJFQUtfQUxMKSB7IGJyZWFrIGNvbnZlcmdlOyB9XG5cdFx0fVxuXG4vL1x0XHRmcm9tX3JpZ2h0OlxuXHRcdHdoaWxlICgxKSB7XG5cdFx0XHR2YXIgciA9IHN5bmNSZ3Qobm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlLCBzdGF0ZS5sZnROb2RlLCBmYWxzZSk7XG5cdFx0XHRpZiAociA9PT0gQlJFQUspIHsgYnJlYWs7IH1cblx0XHRcdGlmIChyID09PSBCUkVBS19BTEwpIHsgYnJlYWsgY29udmVyZ2U7IH1cblx0XHR9XG5cblx0XHRzb3J0RE9NKG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSk7XG5cdFx0YnJlYWs7XG5cdH1cbn1cblxuLy8gVE9ETzogYWxzbyB1c2UgdGhlIHN0YXRlLnJndFNpYiBhbmQgc3RhdGUucmd0Tm9kZSBib3VuZHMsIHBsdXMgcmVkdWNlIExJUyByYW5nZVxuZnVuY3Rpb24gc29ydERPTShub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUpIHtcblx0dmFyIGtpZHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChwYXJFbC5jaGlsZE5vZGVzKTtcblx0dmFyIGRvbUlkeHMgPSBbXTtcblxuXHRmb3IgKHZhciBrID0gMDsgayA8IGtpZHMubGVuZ3RoOyBrKyspIHtcblx0XHR2YXIgbiA9IGtpZHNba10uX25vZGU7XG5cblx0XHRpZiAobi5wYXJlbnQgPT09IG5vZGUpXG5cdFx0XHR7IGRvbUlkeHMucHVzaChuLmlkeCk7IH1cblx0fVxuXG5cdC8vIGxpc3Qgb2Ygbm9uLW1vdmFibGUgdm5vZGUgaW5kaWNlcyAoYWxyZWFkeSBpbiBjb3JyZWN0IG9yZGVyIGluIG9sZCBkb20pXG5cdHZhciB0b21icyA9IGxvbmdlc3RJbmNyZWFzaW5nU3Vic2VxdWVuY2UoZG9tSWR4cykubWFwKGZ1bmN0aW9uIChpKSB7IHJldHVybiBkb21JZHhzW2ldOyB9KTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHRvbWJzLmxlbmd0aDsgaSsrKVxuXHRcdHsgYm9keVt0b21ic1tpXV0uX2xpcyA9IHRydWU7IH1cblxuXHRzdGF0ZS50b21icyA9IHRvbWJzO1xuXG5cdHdoaWxlICgxKSB7XG5cdFx0dmFyIHIgPSBzeW5jTGZ0KG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgbnVsbCwgdHJ1ZSk7XG5cdFx0aWYgKHIgPT09IEJSRUFLX0FMTCkgeyBicmVhazsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFscmVhZHlBZG9wdGVkKHZub2RlKSB7XG5cdHJldHVybiB2bm9kZS5lbC5fbm9kZS5wYXJlbnQgIT09IHZub2RlLnBhcmVudDtcbn1cblxuZnVuY3Rpb24gdGFrZVNlcUluZGV4KG4sIG9ib2R5LCBmcm9tSWR4KSB7XG5cdHJldHVybiBvYm9keVtmcm9tSWR4XTtcbn1cblxuZnVuY3Rpb24gZmluZFNlcVRob3JvdWdoKG4sIG9ib2R5LCBmcm9tSWR4KSB7XHRcdC8vIHByZS10ZXN0ZWQgaXNWaWV3P1xuXHRmb3IgKDsgZnJvbUlkeCA8IG9ib2R5Lmxlbmd0aDsgZnJvbUlkeCsrKSB7XG5cdFx0dmFyIG8gPSBvYm9keVtmcm9tSWR4XTtcblxuXHRcdGlmIChvLnZtICE9IG51bGwpIHtcblx0XHRcdC8vIG1hdGNoIGJ5IGtleSAmIHZpZXdGbiB8fCB2bVxuXHRcdFx0aWYgKG4udHlwZSA9PT0gVlZJRVcgJiYgby52bS52aWV3ID09PSBuLnZpZXcgJiYgby52bS5rZXkgPT09IG4ua2V5IHx8IG4udHlwZSA9PT0gVk1PREVMICYmIG8udm0gPT09IG4udm0pXG5cdFx0XHRcdHsgcmV0dXJuIG87IH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAoIWFscmVhZHlBZG9wdGVkKG8pICYmIG4udGFnID09PSBvLnRhZyAmJiBuLnR5cGUgPT09IG8udHlwZSAmJiBuLmtleSA9PT0gby5rZXkgJiYgKG4uZmxhZ3MgJiB+REVFUF9SRU1PVkUpID09PSAoby5mbGFncyAmIH5ERUVQX1JFTU9WRSkpXG5cdFx0XHR7IHJldHVybiBvOyB9XG5cdH1cblxuXHRyZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gZmluZEhhc2hLZXllZChuLCBvYm9keSwgZnJvbUlkeCkge1xuXHRyZXR1cm4gb2JvZHlbb2JvZHkuX2tleXNbbi5rZXldXTtcbn1cblxuLypcbi8vIGxpc3QgbXVzdCBiZSBhIHNvcnRlZCBsaXN0IG9mIHZub2RlcyBieSBrZXlcbmZ1bmN0aW9uIGZpbmRCaW5LZXllZChuLCBsaXN0KSB7XG5cdHZhciBpZHggPSBiaW5hcnlLZXlTZWFyY2gobGlzdCwgbi5rZXkpO1xuXHRyZXR1cm4gaWR4ID4gLTEgPyBsaXN0W2lkeF0gOiBudWxsO1xufVxuKi9cblxuLy8gaGF2ZSBpdCBoYW5kbGUgaW5pdGlhbCBoeWRyYXRlPyAhZG9ub3I/XG4vLyB0eXBlcyAoYW5kIHRhZ3MgaWYgRUxFTSkgYXJlIGFzc3VtZWQgdGhlIHNhbWUsIGFuZCBkb25vciBleGlzdHNcbmZ1bmN0aW9uIHBhdGNoKHZub2RlLCBkb25vcikge1xuXHRmaXJlSG9vayhkb25vci5ob29rcywgXCJ3aWxsUmVjeWNsZVwiLCBkb25vciwgdm5vZGUpO1xuXG5cdHZhciBlbCA9IHZub2RlLmVsID0gZG9ub3IuZWw7XG5cblx0dmFyIG9ib2R5ID0gZG9ub3IuYm9keTtcblx0dmFyIG5ib2R5ID0gdm5vZGUuYm9keTtcblxuXHRlbC5fbm9kZSA9IHZub2RlO1xuXG5cdC8vIFwiXCIgPT4gXCJcIlxuXHRpZiAodm5vZGUudHlwZSA9PT0gVEVYVCAmJiBuYm9keSAhPT0gb2JvZHkpIHtcblx0XHRlbC5ub2RlVmFsdWUgPSBuYm9keTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAodm5vZGUuYXR0cnMgIT0gbnVsbCB8fCBkb25vci5hdHRycyAhPSBudWxsKVxuXHRcdHsgcGF0Y2hBdHRycyh2bm9kZSwgZG9ub3IsIGZhbHNlKTsgfVxuXG5cdC8vIHBhdGNoIGV2ZW50c1xuXG5cdHZhciBvbGRJc0FyciA9IGlzQXJyKG9ib2R5KTtcblx0dmFyIG5ld0lzQXJyID0gaXNBcnIobmJvZHkpO1xuXHR2YXIgbGF6eUxpc3QgPSAodm5vZGUuZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1Q7XG5cbi8vXHR2YXIgbm9uRXFOZXdCb2R5ID0gbmJvZHkgIT0gbnVsbCAmJiBuYm9keSAhPT0gb2JvZHk7XG5cblx0aWYgKG9sZElzQXJyKSB7XG5cdFx0Ly8gW10gPT4gW11cblx0XHRpZiAobmV3SXNBcnIgfHwgbGF6eUxpc3QpXG5cdFx0XHR7IHBhdGNoQ2hpbGRyZW4odm5vZGUsIGRvbm9yKTsgfVxuXHRcdC8vIFtdID0+IFwiXCIgfCBudWxsXG5cdFx0ZWxzZSBpZiAobmJvZHkgIT09IG9ib2R5KSB7XG5cdFx0XHRpZiAobmJvZHkgIT0gbnVsbClcblx0XHRcdFx0eyBlbC50ZXh0Q29udGVudCA9IG5ib2R5OyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgY2xlYXJDaGlsZHJlbihkb25vcik7IH1cblx0XHR9XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gXCJcIiB8IG51bGwgPT4gW11cblx0XHRpZiAobmV3SXNBcnIpIHtcblx0XHRcdGNsZWFyQ2hpbGRyZW4oZG9ub3IpO1xuXHRcdFx0aHlkcmF0ZUJvZHkodm5vZGUpO1xuXHRcdH1cblx0XHQvLyBcIlwiIHwgbnVsbCA9PiBcIlwiIHwgbnVsbFxuXHRcdGVsc2UgaWYgKG5ib2R5ICE9PSBvYm9keSkge1xuXHRcdFx0aWYgKGVsLmZpcnN0Q2hpbGQpXG5cdFx0XHRcdHsgZWwuZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuYm9keTsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IGVsLnRleHRDb250ZW50ID0gbmJvZHk7IH1cblx0XHR9XG5cdH1cblxuXHRmaXJlSG9vayhkb25vci5ob29rcywgXCJkaWRSZWN5Y2xlXCIsIGRvbm9yLCB2bm9kZSk7XG59XG5cbi8vIGxhcmdlciBxdHlzIG9mIEtFWUVEX0xJU1QgY2hpbGRyZW4gd2lsbCB1c2UgYmluYXJ5IHNlYXJjaFxuLy9jb25zdCBTRVFfRkFJTFNfTUFYID0gMTAwO1xuXG4vLyBUT0RPOiBtb2RpZnkgdnRyZWUgbWF0Y2hlciB0byB3b3JrIHNpbWlsYXIgdG8gZG9tIHJlY29uY2lsZXIgZm9yIGtleWVkIGZyb20gbGVmdCAtPiBmcm9tIHJpZ2h0IC0+IGhlYWQvdGFpbCAtPiBiaW5hcnlcbi8vIGZhbGwgYmFjayB0byBiaW5hcnkgaWYgYWZ0ZXIgZmFpbGluZyBucmkgLSBubGkgPiBTRVFfRkFJTFNfTUFYXG4vLyB3aGlsZS1hZHZhbmNlIG5vbi1rZXllZCBmcm9tSWR4XG4vLyBbXSA9PiBbXVxuZnVuY3Rpb24gcGF0Y2hDaGlsZHJlbih2bm9kZSwgZG9ub3IpIHtcblx0dmFyIG5ib2R5XHRcdD0gdm5vZGUuYm9keSxcblx0XHRubGVuXHRcdD0gbmJvZHkubGVuZ3RoLFxuXHRcdG9ib2R5XHRcdD0gZG9ub3IuYm9keSxcblx0XHRvbGVuXHRcdD0gb2JvZHkubGVuZ3RoLFxuXHRcdGlzTGF6eVx0XHQ9ICh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVCxcblx0XHRpc0ZpeGVkXHRcdD0gKHZub2RlLmZsYWdzICYgRklYRURfQk9EWSkgPT09IEZJWEVEX0JPRFksXG5cdFx0aXNLZXllZFx0XHQ9ICh2bm9kZS5mbGFncyAmIEtFWUVEX0xJU1QpID09PSBLRVlFRF9MSVNULFxuXHRcdGRvbVN5bmNcdFx0PSAhaXNGaXhlZCAmJiB2bm9kZS50eXBlID09PSBFTEVNRU5ULFxuXHRcdGRvRmluZFx0XHQ9IHRydWUsXG5cdFx0ZmluZFx0XHQ9IChcblx0XHRcdGlzS2V5ZWQgPyBmaW5kSGFzaEtleWVkIDpcdFx0XHRcdC8vIGtleWVkIGxpc3RzL2xhenlMaXN0c1xuXHRcdFx0aXNGaXhlZCB8fCBpc0xhenkgPyB0YWtlU2VxSW5kZXggOlx0XHQvLyB1bmtleWVkIGxhenlMaXN0cyBhbmQgRklYRURfQk9EWVxuXHRcdFx0ZmluZFNlcVRob3JvdWdoXHRcdFx0XHRcdFx0XHQvLyBtb3JlIGNvbXBsZXggc3R1ZmZcblx0XHQpO1xuXG5cdGlmIChpc0tleWVkKSB7XG5cdFx0dmFyIGtleXMgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9ib2R5Lmxlbmd0aDsgaSsrKVxuXHRcdFx0eyBrZXlzW29ib2R5W2ldLmtleV0gPSBpOyB9XG5cdFx0b2JvZHkuX2tleXMgPSBrZXlzO1xuXHR9XG5cblx0aWYgKGRvbVN5bmMgJiYgbmxlbiA9PT0gMCkge1xuXHRcdGNsZWFyQ2hpbGRyZW4oZG9ub3IpO1xuXHRcdGlmIChpc0xhenkpXG5cdFx0XHR7IHZub2RlLmJvZHkgPSBbXTsgfVx0Ly8gbmJvZHkudHBsKGFsbCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGRvbm9yMixcblx0XHRub2RlMixcblx0XHRmb3VuZElkeCxcblx0XHRwYXRjaGVkID0gMCxcblx0XHRldmVyTm9uc2VxID0gZmFsc2UsXG5cdFx0ZnJvbUlkeCA9IDA7XHRcdC8vIGZpcnN0IHVucmVjeWNsZWQgbm9kZSAoc2VhcmNoIGhlYWQpXG5cblx0aWYgKGlzTGF6eSkge1xuXHRcdHZhciBmbm9kZTIgPSB7a2V5OiBudWxsfTtcblx0XHR2YXIgbmJvZHlOZXcgPSBBcnJheShubGVuKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbmxlbjsgaSsrKSB7XG5cdFx0aWYgKGlzTGF6eSkge1xuXHRcdFx0dmFyIHJlbWFrZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRpZmZSZXMgPSBudWxsO1xuXG5cdFx0XHRpZiAoZG9GaW5kKSB7XG5cdFx0XHRcdGlmIChpc0tleWVkKVxuXHRcdFx0XHRcdHsgZm5vZGUyLmtleSA9IG5ib2R5LmtleShpKTsgfVxuXG5cdFx0XHRcdGRvbm9yMiA9IGZpbmQoZm5vZGUyLCBvYm9keSwgZnJvbUlkeCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChkb25vcjIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvdW5kSWR4ID0gZG9ub3IyLmlkeDtcblx0XHRcdFx0ZGlmZlJlcyA9IG5ib2R5LmRpZmYoaSwgZG9ub3IyKTtcblxuXHRcdFx0XHQvLyBkaWZmIHJldHVybnMgc2FtZSwgc28gY2hlYXBseSBhZG9wdCB2bm9kZSB3aXRob3V0IHBhdGNoaW5nXG5cdFx0XHRcdGlmIChkaWZmUmVzID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0bm9kZTIgPSBkb25vcjI7XG5cdFx0XHRcdFx0bm9kZTIucGFyZW50ID0gdm5vZGU7XG5cdFx0XHRcdFx0bm9kZTIuaWR4ID0gaTtcblx0XHRcdFx0XHRub2RlMi5fbGlzID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gZGlmZiByZXR1cm5zIG5ldyBkaWZmVmFscywgc28gZ2VuZXJhdGUgbmV3IHZub2RlICYgcGF0Y2hcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgcmVtYWtlID0gdHJ1ZTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IHJlbWFrZSA9IHRydWU7IH1cblxuXHRcdFx0aWYgKHJlbWFrZSkge1xuXHRcdFx0XHRub2RlMiA9IG5ib2R5LnRwbChpKTtcdFx0XHQvLyB3aGF0IGlmIHRoaXMgaXMgYSBWVklFVywgVk1PREVMLCBpbmplY3RlZCBlbGVtZW50P1xuXHRcdFx0XHRwcmVQcm9jKG5vZGUyLCB2bm9kZSwgaSk7XG5cblx0XHRcdFx0bm9kZTIuX2RpZmYgPSBkaWZmUmVzICE9IG51bGwgPyBkaWZmUmVzIDogbmJvZHkuZGlmZihpKTtcblxuXHRcdFx0XHRpZiAoZG9ub3IyICE9IG51bGwpXG5cdFx0XHRcdFx0eyBwYXRjaChub2RlMiwgZG9ub3IyKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdC8vIFRPRE86IGZsYWcgdG1wIEZJWEVEX0JPRFkgb24gdW5jaGFuZ2VkIG5vZGVzP1xuXG5cdFx0XHRcdC8vIGRvbVN5bmMgPSB0cnVlO1x0XHRpZiBhbnkgaWR4IGNoYW5nZXMgb3IgbmV3IG5vZGVzIGFkZGVkL3JlbW92ZWRcblx0XHRcdH1cblxuXHRcdFx0bmJvZHlOZXdbaV0gPSBub2RlMjtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR2YXIgbm9kZTIgPSBuYm9keVtpXTtcblx0XHRcdHZhciB0eXBlMiA9IG5vZGUyLnR5cGU7XG5cblx0XHRcdC8vIEVMRU1FTlQsVEVYVCxDT01NRU5UXG5cdFx0XHRpZiAodHlwZTIgPD0gQ09NTUVOVCkge1xuXHRcdFx0XHRpZiAoZG9ub3IyID0gZG9GaW5kICYmIGZpbmQobm9kZTIsIG9ib2R5LCBmcm9tSWR4KSkge1xuXHRcdFx0XHRcdHBhdGNoKG5vZGUyLCBkb25vcjIpO1xuXHRcdFx0XHRcdGZvdW5kSWR4ID0gZG9ub3IyLmlkeDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZWSUVXKSB7XG5cdFx0XHRcdGlmIChkb25vcjIgPSBkb0ZpbmQgJiYgZmluZChub2RlMiwgb2JvZHksIGZyb21JZHgpKSB7XHRcdC8vIHVwZGF0ZS9tb3ZlVG9cblx0XHRcdFx0XHRmb3VuZElkeCA9IGRvbm9yMi5pZHg7XG5cdFx0XHRcdFx0dmFyIHZtID0gZG9ub3IyLnZtLl91cGRhdGUobm9kZTIuZGF0YSwgdm5vZGUsIGkpO1x0XHQvLyB3aXRoRE9NXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgdmFyIHZtID0gY3JlYXRlVmlldyhub2RlMi52aWV3LCBub2RlMi5kYXRhLCBub2RlMi5rZXksIG5vZGUyLm9wdHMpLl9yZWRyYXcodm5vZGUsIGksIGZhbHNlKTsgfVx0Ly8gY3JlYXRlVmlldywgbm8gZG9tICh3aWxsIGJlIGhhbmRsZWQgYnkgc3luYyBiZWxvdylcblxuXHRcdFx0XHR0eXBlMiA9IHZtLm5vZGUudHlwZTtcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHR5cGUyID09PSBWTU9ERUwpIHtcblx0XHRcdFx0Ly8gaWYgdGhlIGluamVjdGVkIHZtIGhhcyBuZXZlciBiZWVuIHJlbmRlcmVkLCB0aGlzIHZtLl91cGRhdGUoKSBzZXJ2ZXMgYXMgdGhlXG5cdFx0XHRcdC8vIGluaXRpYWwgdnRyZWUgY3JlYXRvciwgYnV0IG11c3QgYXZvaWQgaHlkcmF0aW5nIChjcmVhdGluZyAuZWwpIGJlY2F1c2Ugc3luY0NoaWxkcmVuKClcblx0XHRcdFx0Ly8gd2hpY2ggaXMgcmVzcG9uc2libGUgZm9yIG1vdW50aW5nIGJlbG93IChhbmQgb3B0aW9uYWxseSBoeWRyYXRpbmcpLCB0ZXN0cyAuZWwgcHJlc2VuY2Vcblx0XHRcdFx0Ly8gdG8gZGV0ZXJtaW5lIGlmIGh5ZHJhdGlvbiAmIG1vdW50aW5nIGFyZSBuZWVkZWRcblx0XHRcdFx0dmFyIHdpdGhET00gPSBpc0h5ZHJhdGVkKG5vZGUyLnZtKTtcblxuXHRcdFx0XHR2YXIgdm0gPSBub2RlMi52bS5fdXBkYXRlKG5vZGUyLmRhdGEsIHZub2RlLCBpLCB3aXRoRE9NKTtcblx0XHRcdFx0dHlwZTIgPSB2bS5ub2RlLnR5cGU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gZm91bmQgZG9ub3IgJiBkdXJpbmcgYSBzZXF1ZW50aWFsIHNlYXJjaCAuLi5hdCBzZWFyY2ggaGVhZFxuXHRcdGlmICghaXNLZXllZCAmJiBkb25vcjIgIT0gbnVsbCkge1xuXHRcdFx0aWYgKGZvdW5kSWR4ID09PSBmcm9tSWR4KSB7XG5cdFx0XHRcdC8vIGFkdmFuY2UgaGVhZFxuXHRcdFx0XHRmcm9tSWR4Kys7XG5cdFx0XHRcdC8vIGlmIGFsbCBvbGQgdm5vZGVzIGFkb3B0ZWQgYW5kIG1vcmUgZXhpc3QsIHN0b3Agc2VhcmNoaW5nXG5cdFx0XHRcdGlmIChmcm9tSWR4ID09PSBvbGVuICYmIG5sZW4gPiBvbGVuKSB7XG5cdFx0XHRcdFx0Ly8gc2hvcnQtY2lyY3VpdCBmaW5kLCBhbGxvdyBsb29wIGp1c3QgY3JlYXRlL2luaXQgcmVzdFxuXHRcdFx0XHRcdGRvbm9yMiA9IG51bGw7XG5cdFx0XHRcdFx0ZG9GaW5kID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBldmVyTm9uc2VxID0gdHJ1ZTsgfVxuXG5cdFx0XHRpZiAob2xlbiA+IDEwMCAmJiBldmVyTm9uc2VxICYmICsrcGF0Y2hlZCAlIDEwID09PSAwKVxuXHRcdFx0XHR7IHdoaWxlIChmcm9tSWR4IDwgb2xlbiAmJiBhbHJlYWR5QWRvcHRlZChvYm9keVtmcm9tSWR4XSkpXG5cdFx0XHRcdFx0eyBmcm9tSWR4Kys7IH0gfVxuXHRcdH1cblx0fVxuXG5cdC8vIHJlcGxhY2UgTGlzdCB3LyBuZXcgYm9keVxuXHRpZiAoaXNMYXp5KVxuXHRcdHsgdm5vZGUuYm9keSA9IG5ib2R5TmV3OyB9XG5cblx0ZG9tU3luYyAmJiBzeW5jQ2hpbGRyZW4odm5vZGUsIGRvbm9yKTtcbn1cblxuZnVuY3Rpb24gRE9NSW5zdHIod2l0aFRpbWUpIHtcblx0dmFyIGlzRWRnZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIkVkZ2VcIikgIT09IC0xO1xuXHR2YXIgaXNJRSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIlRyaWRlbnQvXCIpICE9PSAtMTtcblx0dmFyIGdldERlc2NyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblx0dmFyIGRlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cblx0dmFyIG5vZGVQcm90byA9IE5vZGUucHJvdG90eXBlO1xuXHR2YXIgdGV4dENvbnRlbnQgPSBnZXREZXNjcihub2RlUHJvdG8sIFwidGV4dENvbnRlbnRcIik7XG5cdHZhciBub2RlVmFsdWUgPSBnZXREZXNjcihub2RlUHJvdG8sIFwibm9kZVZhbHVlXCIpO1xuXG5cdHZhciBodG1sUHJvdG8gPSBIVE1MRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpbm5lclRleHQgPSBnZXREZXNjcihodG1sUHJvdG8sIFwiaW5uZXJUZXh0XCIpO1xuXG5cdHZhciBlbGVtUHJvdG9cdD0gRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBpbm5lckhUTUxcdD0gZ2V0RGVzY3IoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaW5uZXJIVE1MXCIpO1xuXHR2YXIgY2xhc3NOYW1lXHQ9IGdldERlc2NyKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImNsYXNzTmFtZVwiKTtcblx0dmFyIGlkXHRcdFx0PSBnZXREZXNjcighaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpZFwiKTtcblxuXHR2YXIgc3R5bGVQcm90b1x0PSBDU1NTdHlsZURlY2xhcmF0aW9uLnByb3RvdHlwZTtcblxuXHR2YXIgY3NzVGV4dFx0XHQ9IGdldERlc2NyKHN0eWxlUHJvdG8sIFwiY3NzVGV4dFwiKTtcblxuXHR2YXIgaW5wUHJvdG8gPSBIVE1MSW5wdXRFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGFyZWFQcm90byA9IEhUTUxUZXh0QXJlYUVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgc2VsUHJvdG8gPSBIVE1MU2VsZWN0RWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBvcHRQcm90byA9IEhUTUxPcHRpb25FbGVtZW50LnByb3RvdHlwZTtcblxuXHR2YXIgaW5wQ2hlY2tlZCA9IGdldERlc2NyKGlucFByb3RvLCBcImNoZWNrZWRcIik7XG5cdHZhciBpbnBWYWwgPSBnZXREZXNjcihpbnBQcm90bywgXCJ2YWx1ZVwiKTtcblxuXHR2YXIgYXJlYVZhbCA9IGdldERlc2NyKGFyZWFQcm90bywgXCJ2YWx1ZVwiKTtcblxuXHR2YXIgc2VsVmFsID0gZ2V0RGVzY3Ioc2VsUHJvdG8sIFwidmFsdWVcIik7XG5cdHZhciBzZWxJbmRleCA9IGdldERlc2NyKHNlbFByb3RvLCBcInNlbGVjdGVkSW5kZXhcIik7XG5cblx0dmFyIG9wdFNlbCA9IGdldERlc2NyKG9wdFByb3RvLCBcInNlbGVjdGVkXCIpO1xuXG5cdC8vIG9uY2xpY2ssIG9ua2V5KiwgZXRjLi5cblxuXHQvLyB2YXIgc3R5bGVQcm90byA9IENTU1N0eWxlRGVjbGFyYXRpb24ucHJvdG90eXBlO1xuXHQvLyB2YXIgc2V0UHJvcGVydHkgPSBnZXREZXNjcihzdHlsZVByb3RvLCBcInNldFByb3BlcnR5XCIpO1xuXG5cdHZhciBvcmlnT3BzID0ge1xuXHRcdFwiZG9jdW1lbnQuY3JlYXRlRWxlbWVudFwiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TXCI6IG51bGwsXG5cdFx0XCJkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZVwiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlQ29tbWVudFwiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudFwiOiBudWxsLFxuXG5cdFx0XCJEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmVcIjogbnVsbCxcdFx0Ly8gYXBwZW5kQ2hpbGRcblxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGRcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5pbnNlcnRCZWZvcmVcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VDaGlsZFwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlXCI6IG51bGwsXG5cblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZVwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlTlNcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZVwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlTlNcIjogbnVsbCxcblxuXHRcdC8vIGFzc2lnbj9cblx0XHQvLyBkYXRhc2V0LCBjbGFzc2xpc3QsIGFueSBwcm9wcyBsaWtlIC5vbmNoYW5nZVxuXG5cdFx0Ly8gLnN0eWxlLnNldFByb3BlcnR5LCAuc3R5bGUuY3NzVGV4dFxuXHR9O1xuXG5cdHZhciBjb3VudHMgPSB7fTtcblx0dmFyIHN0YXJ0ID0gbnVsbDtcblxuXHRmdW5jdGlvbiBjdHhOYW1lKG9wTmFtZSkge1xuXHRcdHZhciBvcFBhdGggPSBvcE5hbWUuc3BsaXQoXCIuXCIpO1xuXHRcdHZhciBvID0gd2luZG93O1xuXHRcdHdoaWxlIChvcFBhdGgubGVuZ3RoID4gMSlcblx0XHRcdHsgbyA9IG9bb3BQYXRoLnNoaWZ0KCldOyB9XG5cblx0XHRyZXR1cm4ge2N0eDogbywgbGFzdDogb3BQYXRoWzBdfTtcblx0fVxuXG5cdGZvciAodmFyIG9wTmFtZSBpbiBvcmlnT3BzKSB7XG5cdFx0dmFyIHAgPSBjdHhOYW1lKG9wTmFtZSk7XG5cblx0XHRpZiAob3JpZ09wc1tvcE5hbWVdID09PSBudWxsKVxuXHRcdFx0eyBvcmlnT3BzW29wTmFtZV0gPSBwLmN0eFtwLmxhc3RdOyB9XG5cblx0XHQoZnVuY3Rpb24ob3BOYW1lLCBvcFNob3J0KSB7XG5cdFx0XHRjb3VudHNbb3BTaG9ydF0gPSAwO1xuXHRcdFx0cC5jdHhbb3BTaG9ydF0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0Y291bnRzW29wU2hvcnRdKys7XG5cdFx0XHRcdHJldHVybiBvcmlnT3BzW29wTmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH07XG5cdFx0fSkob3BOYW1lLCBwLmxhc3QpO1xuXHR9XG5cblx0Y291bnRzLnRleHRDb250ZW50ID0gMDtcblx0ZGVmUHJvcChub2RlUHJvdG8sIFwidGV4dENvbnRlbnRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnRleHRDb250ZW50Kys7XG5cdFx0XHR0ZXh0Q29udGVudC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMubm9kZVZhbHVlID0gMDtcblx0ZGVmUHJvcChub2RlUHJvdG8sIFwibm9kZVZhbHVlXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5ub2RlVmFsdWUrKztcblx0XHRcdG5vZGVWYWx1ZS5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuaW5uZXJUZXh0ID0gMDtcblx0ZGVmUHJvcChodG1sUHJvdG8sIFwiaW5uZXJUZXh0XCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5pbm5lclRleHQrKztcblx0XHRcdGlubmVyVGV4dC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuaW5uZXJIVE1MID0gMDtcblx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpbm5lckhUTUxcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmlubmVySFRNTCsrO1xuXHRcdFx0aW5uZXJIVE1MLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5jbGFzc05hbWUgPSAwO1xuXHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImNsYXNzTmFtZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuY2xhc3NOYW1lKys7XG5cdFx0XHRjbGFzc05hbWUuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmNzc1RleHQgPSAwO1xuXHRkZWZQcm9wKHN0eWxlUHJvdG8sIFwiY3NzVGV4dFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuY3NzVGV4dCsrO1xuXHRcdFx0Y3NzVGV4dC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuaWQgPSAwO1xuXHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlkXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5pZCsrO1xuXHRcdFx0aWQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmNoZWNrZWQgPSAwO1xuXHRkZWZQcm9wKGlucFByb3RvLCBcImNoZWNrZWRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmNoZWNrZWQrKztcblx0XHRcdGlucENoZWNrZWQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLnZhbHVlID0gMDtcblx0ZGVmUHJvcChpbnBQcm90bywgXCJ2YWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudmFsdWUrKztcblx0XHRcdGlucFZhbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRkZWZQcm9wKGFyZWFQcm90bywgXCJ2YWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudmFsdWUrKztcblx0XHRcdGFyZWFWYWwuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0ZGVmUHJvcChzZWxQcm90bywgXCJ2YWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudmFsdWUrKztcblx0XHRcdHNlbFZhbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuc2VsZWN0ZWRJbmRleCA9IDA7XG5cdGRlZlByb3Aoc2VsUHJvdG8sIFwic2VsZWN0ZWRJbmRleFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuc2VsZWN0ZWRJbmRleCsrO1xuXHRcdFx0c2VsSW5kZXguc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLnNlbGVjdGVkID0gMDtcblx0ZGVmUHJvcChvcHRQcm90bywgXCJzZWxlY3RlZFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuc2VsZWN0ZWQrKztcblx0XHRcdG9wdFNlbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHQvKlxuXHRjb3VudHMuc2V0UHJvcGVydHkgPSAwO1xuXHRkZWZQcm9wKHN0eWxlUHJvdG8sIFwic2V0UHJvcGVydHlcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnNldFByb3BlcnR5Kys7XG5cdFx0XHRzZXRQcm9wZXJ0eS5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblx0Ki9cblxuXHRmdW5jdGlvbiByZXNldCgpIHtcblx0XHRmb3IgKHZhciBpIGluIGNvdW50cylcblx0XHRcdHsgY291bnRzW2ldID0gMDsgfVxuXHR9XG5cblx0dGhpcy5zdGFydCA9IGZ1bmN0aW9uKCkge1xuXHRcdHN0YXJ0ID0gK25ldyBEYXRlO1xuXHR9O1xuXG5cdHRoaXMuZW5kID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIF90aW1lID0gK25ldyBEYXRlIC0gc3RhcnQ7XG5cdFx0c3RhcnQgPSBudWxsO1xuLypcblx0XHRmb3IgKHZhciBvcE5hbWUgaW4gb3JpZ09wcykge1xuXHRcdFx0dmFyIHAgPSBjdHhOYW1lKG9wTmFtZSk7XG5cdFx0XHRwLmN0eFtwLmxhc3RdID0gb3JpZ09wc1tvcE5hbWVdO1xuXHRcdH1cblxuXHRcdGRlZlByb3Aobm9kZVByb3RvLCBcInRleHRDb250ZW50XCIsIHRleHRDb250ZW50KTtcblx0XHRkZWZQcm9wKG5vZGVQcm90bywgXCJub2RlVmFsdWVcIiwgbm9kZVZhbHVlKTtcblx0XHRkZWZQcm9wKGh0bWxQcm90bywgXCJpbm5lclRleHRcIiwgaW5uZXJUZXh0KTtcblx0XHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlubmVySFRNTFwiLCBpbm5lckhUTUwpO1xuXHRcdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiY2xhc3NOYW1lXCIsIGNsYXNzTmFtZSk7XG5cdFx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpZFwiLCBpZCk7XG5cdFx0ZGVmUHJvcChpbnBQcm90bywgIFwiY2hlY2tlZFwiLCBpbnBDaGVja2VkKTtcblx0XHRkZWZQcm9wKGlucFByb3RvLCAgXCJ2YWx1ZVwiLCBpbnBWYWwpO1xuXHRcdGRlZlByb3AoYXJlYVByb3RvLCBcInZhbHVlXCIsIGFyZWFWYWwpO1xuXHRcdGRlZlByb3Aoc2VsUHJvdG8sICBcInZhbHVlXCIsIHNlbFZhbCk7XG5cdFx0ZGVmUHJvcChzZWxQcm90bywgIFwic2VsZWN0ZWRJbmRleFwiLCBzZWxJbmRleCk7XG5cdFx0ZGVmUHJvcChvcHRQcm90bywgIFwic2VsZWN0ZWRcIiwgb3B0U2VsKTtcblx0Ly9cdGRlZlByb3Aoc3R5bGVQcm90bywgXCJzZXRQcm9wZXJ0eVwiLCBzZXRQcm9wZXJ0eSk7XG5cdFx0ZGVmUHJvcChzdHlsZVByb3RvLCBcImNzc1RleHRcIiwgY3NzVGV4dCk7XG4qL1xuXHRcdHZhciBvdXQgPSB7fTtcblxuXHRcdGZvciAodmFyIGkgaW4gY291bnRzKVxuXHRcdFx0eyBpZiAoY291bnRzW2ldID4gMClcblx0XHRcdFx0eyBvdXRbaV0gPSBjb3VudHNbaV07IH0gfVxuXG5cdFx0cmVzZXQoKTtcblxuXHRcdGlmICh3aXRoVGltZSlcblx0XHRcdHsgb3V0Ll90aW1lID0gX3RpbWU7IH1cblxuXHRcdHJldHVybiBvdXQ7XG5cdH07XG59XG5cbnZhciBpbnN0ciA9IG51bGw7XG5cbntcblx0aWYgKERFVk1PREUubXV0YXRpb25zKSB7XG5cdFx0aW5zdHIgPSBuZXcgRE9NSW5zdHIodHJ1ZSk7XG5cdH1cbn1cblxuLy8gdmlldyArIGtleSBzZXJ2ZSBhcyB0aGUgdm0ncyB1bmlxdWUgaWRlbnRpdHlcbmZ1bmN0aW9uIFZpZXdNb2RlbCh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHR2bS52aWV3ID0gdmlldztcblx0dm0uZGF0YSA9IGRhdGE7XG5cdHZtLmtleSA9IGtleTtcblxuXHR7XG5cdFx0aWYgKGlzU3RyZWFtKGRhdGEpKVxuXHRcdFx0eyB2bS5fc3RyZWFtID0gaG9va1N0cmVhbTIoZGF0YSwgdm0pOyB9XG5cdH1cblxuXHRpZiAob3B0cykge1xuXHRcdHZtLm9wdHMgPSBvcHRzO1xuXHRcdHZtLmNvbmZpZyhvcHRzKTtcblx0fVxuXG5cdHZhciBvdXQgPSBpc1BsYWluT2JqKHZpZXcpID8gdmlldyA6IHZpZXcuY2FsbCh2bSwgdm0sIGRhdGEsIGtleSwgb3B0cyk7XG5cblx0aWYgKGlzRnVuYyhvdXQpKVxuXHRcdHsgdm0ucmVuZGVyID0gb3V0OyB9XG5cdGVsc2Uge1xuXHRcdHZtLnJlbmRlciA9IG91dC5yZW5kZXI7XG5cdFx0dm0uY29uZmlnKG91dCk7XG5cdH1cblxuXHQvLyB0aGVzZSBtdXN0IGJlIHdyYXBwZWQgaGVyZSBzaW5jZSB0aGV5J3JlIGRlYm91bmNlZCBwZXIgdmlld1xuXHR2bS5fcmVkcmF3QXN5bmMgPSByYWZ0KGZ1bmN0aW9uIChfKSB7IHJldHVybiB2bS5yZWRyYXcodHJ1ZSk7IH0pO1xuXHR2bS5fdXBkYXRlQXN5bmMgPSByYWZ0KGZ1bmN0aW9uIChuZXdEYXRhKSB7IHJldHVybiB2bS51cGRhdGUobmV3RGF0YSwgdHJ1ZSk7IH0pO1xuXG5cdHZtLmluaXQgJiYgdm0uaW5pdC5jYWxsKHZtLCB2bSwgdm0uZGF0YSwgdm0ua2V5LCBvcHRzKTtcbn1cblxudmFyIFZpZXdNb2RlbFByb3RvID0gVmlld01vZGVsLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZpZXdNb2RlbCxcblxuXHRfZGlmZjpcdG51bGwsXHQvLyBkaWZmIGNhY2hlXG5cblx0aW5pdDpcdG51bGwsXG5cdHZpZXc6XHRudWxsLFxuXHRrZXk6XHRudWxsLFxuXHRkYXRhOlx0bnVsbCxcblx0c3RhdGU6XHRudWxsLFxuXHRhcGk6XHRudWxsLFxuXHRvcHRzOlx0bnVsbCxcblx0bm9kZTpcdG51bGwsXG5cdGhvb2tzOlx0bnVsbCxcblx0b25ldmVudDogbm9vcCxcblx0cmVmczpcdG51bGwsXG5cdHJlbmRlcjpcdG51bGwsXG5cblx0bW91bnQ6IG1vdW50LFxuXHR1bm1vdW50OiB1bm1vdW50LFxuXHRjb25maWc6IGZ1bmN0aW9uKG9wdHMpIHtcblx0XHR2YXIgdCA9IHRoaXM7XG5cblx0XHRpZiAob3B0cy5pbml0KVxuXHRcdFx0eyB0LmluaXQgPSBvcHRzLmluaXQ7IH1cblx0XHRpZiAob3B0cy5kaWZmKVxuXHRcdFx0eyB0LmRpZmYgPSBvcHRzLmRpZmY7IH1cblx0XHRpZiAob3B0cy5vbmV2ZW50KVxuXHRcdFx0eyB0Lm9uZXZlbnQgPSBvcHRzLm9uZXZlbnQ7IH1cblxuXHRcdC8vIG1heWJlIGludmVydCBhc3NpZ25tZW50IG9yZGVyP1xuXHRcdGlmIChvcHRzLmhvb2tzKVxuXHRcdFx0eyB0Lmhvb2tzID0gYXNzaWduT2JqKHQuaG9va3MgfHwge30sIG9wdHMuaG9va3MpOyB9XG5cblx0XHR7XG5cdFx0XHRpZiAob3B0cy5vbmVtaXQpXG5cdFx0XHRcdHsgdC5vbmVtaXQgPSBhc3NpZ25PYmoodC5vbmVtaXQgfHwge30sIG9wdHMub25lbWl0KTsgfVxuXHRcdH1cblx0fSxcblx0cGFyZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZ2V0Vm0odGhpcy5ub2RlLnBhcmVudCk7XG5cdH0sXG5cdHJvb3Q6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwID0gdGhpcy5ub2RlO1xuXG5cdFx0d2hpbGUgKHAucGFyZW50KVxuXHRcdFx0eyBwID0gcC5wYXJlbnQ7IH1cblxuXHRcdHJldHVybiBwLnZtO1xuXHR9LFxuXHRyZWRyYXc6IGZ1bmN0aW9uKHN5bmMpIHtcblx0XHR7XG5cdFx0XHRpZiAoREVWTU9ERS5zeW5jUmVkcmF3KSB7XG5cdFx0XHRcdHN5bmMgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHN5bmMgPyB2bS5fcmVkcmF3KG51bGwsIG51bGwsIGlzSHlkcmF0ZWQodm0pKSA6IHZtLl9yZWRyYXdBc3luYygpO1xuXHRcdHJldHVybiB2bTtcblx0fSxcblx0dXBkYXRlOiBmdW5jdGlvbihuZXdEYXRhLCBzeW5jKSB7XG5cdFx0e1xuXHRcdFx0aWYgKERFVk1PREUuc3luY1JlZHJhdykge1xuXHRcdFx0XHRzeW5jID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHRzeW5jID8gdm0uX3VwZGF0ZShuZXdEYXRhLCBudWxsLCBudWxsLCBpc0h5ZHJhdGVkKHZtKSkgOiB2bS5fdXBkYXRlQXN5bmMobmV3RGF0YSk7XG5cdFx0cmV0dXJuIHZtO1xuXHR9LFxuXG5cdF91cGRhdGU6IHVwZGF0ZVN5bmMsXG5cdF9yZWRyYXc6IHJlZHJhd1N5bmMsXG5cdF9yZWRyYXdBc3luYzogbnVsbCxcblx0X3VwZGF0ZUFzeW5jOiBudWxsLFxufTtcblxuZnVuY3Rpb24gbW91bnQoZWwsIGlzUm9vdCkge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHtcblx0XHRpZiAoREVWTU9ERS5tdXRhdGlvbnMpXG5cdFx0XHR7IGluc3RyLnN0YXJ0KCk7IH1cblx0fVxuXG5cdGlmIChpc1Jvb3QpIHtcblx0XHRjbGVhckNoaWxkcmVuKHtlbDogZWwsIGZsYWdzOiAwfSk7XG5cblx0XHR2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTtcblxuXHRcdC8vIGlmIHBsYWNlaG9sZGVyIG5vZGUgZG9lc250IG1hdGNoIHJvb3QgdGFnXG5cdFx0aWYgKGVsLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgIT09IHZtLm5vZGUudGFnKSB7XG5cdFx0XHRoeWRyYXRlKHZtLm5vZGUpO1xuXHRcdFx0aW5zZXJ0QmVmb3JlKGVsLnBhcmVudE5vZGUsIHZtLm5vZGUuZWwsIGVsKTtcblx0XHRcdGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR7IGluc2VydEJlZm9yZShlbC5wYXJlbnROb2RlLCBoeWRyYXRlKHZtLm5vZGUsIGVsKSwgZWwpOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0dm0uX3JlZHJhdyhudWxsLCBudWxsKTtcblxuXHRcdGlmIChlbClcblx0XHRcdHsgaW5zZXJ0QmVmb3JlKGVsLCB2bS5ub2RlLmVsKTsgfVxuXHR9XG5cblx0aWYgKGVsKVxuXHRcdHsgZHJhaW5EaWRIb29rcyh2bSk7IH1cblxuXHR7XG5cdFx0aWYgKERFVk1PREUubXV0YXRpb25zKVxuXHRcdFx0eyBjb25zb2xlLmxvZyhpbnN0ci5lbmQoKSk7IH1cblx0fVxuXG5cdHJldHVybiB2bTtcbn1cblxuLy8gYXNTdWIgbWVhbnMgdGhpcyB3YXMgY2FsbGVkIGZyb20gYSBzdWItcm91dGluZSwgc28gZG9uJ3QgZHJhaW4gZGlkKiBob29rIHF1ZXVlXG5mdW5jdGlvbiB1bm1vdW50KGFzU3ViKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0e1xuXHRcdGlmIChpc1N0cmVhbSh2bS5fc3RyZWFtKSlcblx0XHRcdHsgdW5zdWJTdHJlYW0odm0uX3N0cmVhbSk7IH1cblx0fVxuXG5cdHZhciBub2RlID0gdm0ubm9kZTtcblx0dmFyIHBhckVsID0gbm9kZS5lbC5wYXJlbnROb2RlO1xuXG5cdC8vIGVkZ2UgYnVnOiB0aGlzIGNvdWxkIGFsc28gYmUgd2lsbFJlbW92ZSBwcm9taXNlLWRlbGF5ZWQ7IHNob3VsZCAudGhlbigpIG9yIHNvbWV0aGluZyB0byBtYWtlIHN1cmUgaG9va3MgZmlyZSBpbiBvcmRlclxuXHRyZW1vdmVDaGlsZChwYXJFbCwgbm9kZS5lbCk7XG5cblx0aWYgKCFhc1N1Yilcblx0XHR7IGRyYWluRGlkSG9va3Modm0pOyB9XG59XG5cbmZ1bmN0aW9uIHJlUGFyZW50KHZtLCB2b2xkLCBuZXdQYXJlbnQsIG5ld0lkeCkge1xuXHRpZiAobmV3UGFyZW50ICE9IG51bGwpIHtcblx0XHRuZXdQYXJlbnQuYm9keVtuZXdJZHhdID0gdm9sZDtcblx0XHR2b2xkLmlkeCA9IG5ld0lkeDtcblx0XHR2b2xkLnBhcmVudCA9IG5ld1BhcmVudDtcblx0XHR2b2xkLl9saXMgPSBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdm07XG59XG5cbmZ1bmN0aW9uIHJlZHJhd1N5bmMobmV3UGFyZW50LCBuZXdJZHgsIHdpdGhET00pIHtcblx0dmFyIGlzUmVkcmF3Um9vdCA9IG5ld1BhcmVudCA9PSBudWxsO1xuXHR2YXIgdm0gPSB0aGlzO1xuXHR2YXIgaXNNb3VudGVkID0gdm0ubm9kZSAmJiB2bS5ub2RlLmVsICYmIHZtLm5vZGUuZWwucGFyZW50Tm9kZTtcblxuXHR7XG5cdFx0Ly8gd2FzIG1vdW50ZWQgKGhhcyBub2RlIGFuZCBlbCksIGJ1dCBlbCBubyBsb25nZXIgaGFzIHBhcmVudCAodW5tb3VudGVkKVxuXHRcdGlmIChpc1JlZHJhd1Jvb3QgJiYgdm0ubm9kZSAmJiB2bS5ub2RlLmVsICYmICF2bS5ub2RlLmVsLnBhcmVudE5vZGUpXG5cdFx0XHR7IGRldk5vdGlmeShcIlVOTU9VTlRFRF9SRURSQVdcIiwgW3ZtXSk7IH1cblxuXHRcdGlmIChpc1JlZHJhd1Jvb3QgJiYgREVWTU9ERS5tdXRhdGlvbnMgJiYgaXNNb3VudGVkKVxuXHRcdFx0eyBpbnN0ci5zdGFydCgpOyB9XG5cdH1cblxuXHR2YXIgdm9sZCA9IHZtLm5vZGUsIG9sZERpZmYsIG5ld0RpZmY7XG5cblx0aWYgKHZtLmRpZmYgIT0gbnVsbCkge1xuXHRcdG9sZERpZmYgPSB2bS5fZGlmZjtcblx0XHR2bS5fZGlmZiA9IG5ld0RpZmYgPSB2bS5kaWZmKHZtLCB2bS5kYXRhKTtcblxuXHRcdGlmICh2b2xkICE9IG51bGwpIHtcblx0XHRcdHZhciBjbXBGbiA9IGlzQXJyKG9sZERpZmYpID8gY21wQXJyIDogY21wT2JqO1xuXHRcdFx0dmFyIGlzU2FtZSA9IG9sZERpZmYgPT09IG5ld0RpZmYgfHwgY21wRm4ob2xkRGlmZiwgbmV3RGlmZik7XG5cblx0XHRcdGlmIChpc1NhbWUpXG5cdFx0XHRcdHsgcmV0dXJuIHJlUGFyZW50KHZtLCB2b2xkLCBuZXdQYXJlbnQsIG5ld0lkeCk7IH1cblx0XHR9XG5cdH1cblxuXHRpc01vdW50ZWQgJiYgZmlyZUhvb2sodm0uaG9va3MsIFwid2lsbFJlZHJhd1wiLCB2bSwgdm0uZGF0YSk7XG5cblx0dmFyIHZuZXcgPSB2bS5yZW5kZXIuY2FsbCh2bSwgdm0sIHZtLmRhdGEsIG9sZERpZmYsIG5ld0RpZmYpO1xuXG5cdGlmICh2bmV3ID09PSB2b2xkKVxuXHRcdHsgcmV0dXJuIHJlUGFyZW50KHZtLCB2b2xkLCBuZXdQYXJlbnQsIG5ld0lkeCk7IH1cblxuXHQvLyB0b2RvOiB0ZXN0IHJlc3VsdCBvZiB3aWxsUmVkcmF3IGhvb2tzIGJlZm9yZSBjbGVhcmluZyByZWZzXG5cdHZtLnJlZnMgPSBudWxsO1xuXG5cdC8vIGFsd2F5cyBhc3NpZ24gdm0ga2V5IHRvIHJvb3Qgdm5vZGUgKHRoaXMgaXMgYSBkZS1vcHQpXG5cdGlmICh2bS5rZXkgIT0gbnVsbCAmJiB2bmV3LmtleSAhPT0gdm0ua2V5KVxuXHRcdHsgdm5ldy5rZXkgPSB2bS5rZXk7IH1cblxuXHR2bS5ub2RlID0gdm5ldztcblxuXHRpZiAobmV3UGFyZW50KSB7XG5cdFx0cHJlUHJvYyh2bmV3LCBuZXdQYXJlbnQsIG5ld0lkeCwgdm0pO1xuXHRcdG5ld1BhcmVudC5ib2R5W25ld0lkeF0gPSB2bmV3O1xuXHR9XG5cdGVsc2UgaWYgKHZvbGQgJiYgdm9sZC5wYXJlbnQpIHtcblx0XHRwcmVQcm9jKHZuZXcsIHZvbGQucGFyZW50LCB2b2xkLmlkeCwgdm0pO1xuXHRcdHZvbGQucGFyZW50LmJvZHlbdm9sZC5pZHhdID0gdm5ldztcblx0fVxuXHRlbHNlXG5cdFx0eyBwcmVQcm9jKHZuZXcsIG51bGwsIG51bGwsIHZtKTsgfVxuXG5cdGlmICh3aXRoRE9NICE9PSBmYWxzZSkge1xuXHRcdGlmICh2b2xkKSB7XG5cdFx0XHQvLyByb290IG5vZGUgcmVwbGFjZW1lbnRcblx0XHRcdGlmICh2b2xkLnRhZyAhPT0gdm5ldy50YWcgfHwgdm9sZC5rZXkgIT09IHZuZXcua2V5KSB7XG5cdFx0XHRcdC8vIGhhY2sgdG8gcHJldmVudCB0aGUgcmVwbGFjZW1lbnQgZnJvbSB0cmlnZ2VyaW5nIG1vdW50L3VubW91bnRcblx0XHRcdFx0dm9sZC52bSA9IHZuZXcudm0gPSBudWxsO1xuXG5cdFx0XHRcdHZhciBwYXJFbCA9IHZvbGQuZWwucGFyZW50Tm9kZTtcblx0XHRcdFx0dmFyIHJlZkVsID0gbmV4dFNpYih2b2xkLmVsKTtcblx0XHRcdFx0cmVtb3ZlQ2hpbGQocGFyRWwsIHZvbGQuZWwpO1xuXHRcdFx0XHRpbnNlcnRCZWZvcmUocGFyRWwsIGh5ZHJhdGUodm5ldyksIHJlZkVsKTtcblxuXHRcdFx0XHQvLyBhbm90aGVyIGhhY2sgdGhhdCBhbGxvd3MgYW55IGhpZ2hlci1sZXZlbCBzeW5jQ2hpbGRyZW4gdG8gc2V0XG5cdFx0XHRcdC8vIHJlY29uY2lsaWF0aW9uIGJvdW5kcyB1c2luZyBhIGxpdmUgbm9kZVxuXHRcdFx0XHR2b2xkLmVsID0gdm5ldy5lbDtcblxuXHRcdFx0XHQvLyByZXN0b3JlXG5cdFx0XHRcdHZuZXcudm0gPSB2bTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBwYXRjaCh2bmV3LCB2b2xkKTsgfVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR7IGh5ZHJhdGUodm5ldyk7IH1cblx0fVxuXG5cdGlzTW91bnRlZCAmJiBmaXJlSG9vayh2bS5ob29rcywgXCJkaWRSZWRyYXdcIiwgdm0sIHZtLmRhdGEpO1xuXG5cdGlmIChpc1JlZHJhd1Jvb3QgJiYgaXNNb3VudGVkKVxuXHRcdHsgZHJhaW5EaWRIb29rcyh2bSk7IH1cblxuXHR7XG5cdFx0aWYgKGlzUmVkcmF3Um9vdCAmJiBERVZNT0RFLm11dGF0aW9ucyAmJiBpc01vdW50ZWQpXG5cdFx0XHR7IGNvbnNvbGUubG9nKGluc3RyLmVuZCgpKTsgfVxuXHR9XG5cblx0cmV0dXJuIHZtO1xufVxuXG4vLyB0aGlzIGFsc28gZG91YmxlcyBhcyBtb3ZlVG9cbi8vIFRPRE8/IEB3aXRoUmVkcmF3IChwcmV2ZW50IHJlZHJhdyBmcm9tIGZpcmluZylcbmZ1bmN0aW9uIHVwZGF0ZVN5bmMobmV3RGF0YSwgbmV3UGFyZW50LCBuZXdJZHgsIHdpdGhET00pIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHRpZiAobmV3RGF0YSAhPSBudWxsKSB7XG5cdFx0aWYgKHZtLmRhdGEgIT09IG5ld0RhdGEpIHtcblx0XHRcdHtcblx0XHRcdFx0ZGV2Tm90aWZ5KFwiREFUQV9SRVBMQUNFRFwiLCBbdm0sIHZtLmRhdGEsIG5ld0RhdGFdKTtcblx0XHRcdH1cblx0XHRcdGZpcmVIb29rKHZtLmhvb2tzLCBcIndpbGxVcGRhdGVcIiwgdm0sIG5ld0RhdGEpO1xuXHRcdFx0dm0uZGF0YSA9IG5ld0RhdGE7XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKGlzU3RyZWFtKHZtLl9zdHJlYW0pKVxuXHRcdFx0XHRcdHsgdW5zdWJTdHJlYW0odm0uX3N0cmVhbSk7IH1cblx0XHRcdFx0aWYgKGlzU3RyZWFtKG5ld0RhdGEpKVxuXHRcdFx0XHRcdHsgdm0uX3N0cmVhbSA9IGhvb2tTdHJlYW0yKG5ld0RhdGEsIHZtKTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB2bS5fcmVkcmF3KG5ld1BhcmVudCwgbmV3SWR4LCB3aXRoRE9NKTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lRWxlbWVudCh0YWcsIGFyZzEsIGFyZzIsIGZsYWdzKSB7XG5cdHZhciBhdHRycywgYm9keTtcblxuXHRpZiAoYXJnMiA9PSBudWxsKSB7XG5cdFx0aWYgKGlzUGxhaW5PYmooYXJnMSkpXG5cdFx0XHR7IGF0dHJzID0gYXJnMTsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgYm9keSA9IGFyZzE7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRhdHRycyA9IGFyZzE7XG5cdFx0Ym9keSA9IGFyZzI7XG5cdH1cblxuXHRyZXR1cm4gaW5pdEVsZW1lbnROb2RlKHRhZywgYXR0cnMsIGJvZHksIGZsYWdzKTtcbn1cblxuLy9leHBvcnQgY29uc3QgWE1MX05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zL1wiO1xudmFyIFNWR19OUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIjtcblxuZnVuY3Rpb24gZGVmaW5lU3ZnRWxlbWVudCh0YWcsIGFyZzEsIGFyZzIsIGZsYWdzKSB7XG5cdHZhciBuID0gZGVmaW5lRWxlbWVudCh0YWcsIGFyZzEsIGFyZzIsIGZsYWdzKTtcblx0bi5ucyA9IFNWR19OUztcblx0cmV0dXJuIG47XG59XG5cbmZ1bmN0aW9uIGRlZmluZUNvbW1lbnQoYm9keSkge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblx0bm9kZS50eXBlID0gQ09NTUVOVDtcblx0bm9kZS5ib2R5ID0gYm9keTtcblx0cmV0dXJuIG5vZGU7XG59XG5cbi8vIHBsYWNlaG9sZGVyIGZvciBkZWNsYXJlZCB2aWV3c1xuZnVuY3Rpb24gVlZpZXcodmlldywgZGF0YSwga2V5LCBvcHRzKSB7XG5cdHRoaXMudmlldyA9IHZpZXc7XG5cdHRoaXMuZGF0YSA9IGRhdGE7XG5cdHRoaXMua2V5ID0ga2V5O1xuXHR0aGlzLm9wdHMgPSBvcHRzO1xufVxuXG5WVmlldy5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBWVmlldyxcblxuXHR0eXBlOiBWVklFVyxcblx0dmlldzogbnVsbCxcblx0ZGF0YTogbnVsbCxcblx0a2V5OiBudWxsLFxuXHRvcHRzOiBudWxsLFxufTtcblxuZnVuY3Rpb24gZGVmaW5lVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0cmV0dXJuIG5ldyBWVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpO1xufVxuXG4vLyBwbGFjZWhvbGRlciBmb3IgaW5qZWN0ZWQgVmlld01vZGVsc1xuZnVuY3Rpb24gVk1vZGVsKHZtKSB7XG5cdHRoaXMudm0gPSB2bTtcbn1cblxuVk1vZGVsLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZNb2RlbCxcblxuXHR0eXBlOiBWTU9ERUwsXG5cdHZtOiBudWxsLFxufTtcblxuZnVuY3Rpb24gaW5qZWN0Vmlldyh2bSkge1xuLy9cdGlmICh2bS5ub2RlID09IG51bGwpXG4vL1x0XHR2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTtcblxuLy9cdHJldHVybiB2bS5ub2RlO1xuXG5cdHJldHVybiBuZXcgVk1vZGVsKHZtKTtcbn1cblxuZnVuY3Rpb24gaW5qZWN0RWxlbWVudChlbCkge1xuXHR2YXIgbm9kZSA9IG5ldyBWTm9kZTtcblx0bm9kZS50eXBlID0gRUxFTUVOVDtcblx0bm9kZS5lbCA9IG5vZGUua2V5ID0gZWw7XG5cdHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBsYXp5TGlzdChpdGVtcywgY2ZnKSB7XG5cdHZhciBsZW4gPSBpdGVtcy5sZW5ndGg7XG5cblx0dmFyIHNlbGYgPSB7XG5cdFx0aXRlbXM6IGl0ZW1zLFxuXHRcdGxlbmd0aDogbGVuLFxuXHRcdC8vIGRlZmF1bHRzIHRvIHJldHVybmluZyBpdGVtIGlkZW50aXR5IChvciBwb3NpdGlvbj8pXG5cdFx0a2V5OiBmdW5jdGlvbihpKSB7XG5cdFx0XHRyZXR1cm4gY2ZnLmtleShpdGVtc1tpXSwgaSk7XG5cdFx0fSxcblx0XHQvLyBkZWZhdWx0IHJldHVybnMgMD9cblx0XHRkaWZmOiBmdW5jdGlvbihpLCBkb25vcikge1xuXHRcdFx0dmFyIG5ld1ZhbHMgPSBjZmcuZGlmZihpdGVtc1tpXSwgaSk7XG5cdFx0XHRpZiAoZG9ub3IgPT0gbnVsbClcblx0XHRcdFx0eyByZXR1cm4gbmV3VmFsczsgfVxuXHRcdFx0dmFyIG9sZFZhbHMgPSBkb25vci5fZGlmZjtcblx0XHRcdHZhciBzYW1lID0gbmV3VmFscyA9PT0gb2xkVmFscyB8fCBpc0FycihvbGRWYWxzKSA/IGNtcEFycihuZXdWYWxzLCBvbGRWYWxzKSA6IGNtcE9iaihuZXdWYWxzLCBvbGRWYWxzKTtcblx0XHRcdHJldHVybiBzYW1lIHx8IG5ld1ZhbHM7XG5cdFx0fSxcblx0XHR0cGw6IGZ1bmN0aW9uKGkpIHtcblx0XHRcdHJldHVybiBjZmcudHBsKGl0ZW1zW2ldLCBpKTtcblx0XHR9LFxuXHRcdG1hcDogZnVuY3Rpb24odHBsKSB7XG5cdFx0XHRjZmcudHBsID0gdHBsO1xuXHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0fSxcblx0XHRib2R5OiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdFx0dmFyIG5ib2R5ID0gQXJyYXkobGVuKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0XHR2YXIgdm5vZGUyID0gc2VsZi50cGwoaSk7XG5cblx0XHRcdC8vXHRpZiAoKHZub2RlLmZsYWdzICYgS0VZRURfTElTVCkgPT09IEtFWUVEX0xJU1QgJiYgc2VsZi4gIT0gbnVsbClcblx0XHRcdC8vXHRcdHZub2RlMi5rZXkgPSBnZXRLZXkoaXRlbSk7XG5cblx0XHRcdFx0dm5vZGUyLl9kaWZmID0gc2VsZi5kaWZmKGkpO1x0XHRcdC8vIGhvbGRzIG9sZFZhbHMgZm9yIGNtcFxuXG5cdFx0XHRcdG5ib2R5W2ldID0gdm5vZGUyO1xuXG5cdFx0XHRcdC8vIHJ1biBwcmVwcm9jIHBhc3MgKHNob3VsZCB0aGlzIGJlIGp1c3QgcHJlUHJvYyBpbiBhYm92ZSBsb29wPykgYmVuY2hcblx0XHRcdFx0cHJlUHJvYyh2bm9kZTIsIHZub2RlLCBpKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gcmVwbGFjZSBMaXN0IHdpdGggZ2VuZXJhdGVkIGJvZHlcblx0XHRcdHZub2RlLmJvZHkgPSBuYm9keTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIHNlbGY7XG59XG5cbnZhciBuYW5vID0ge1xuXHRjb25maWc6IGNvbmZpZyxcblxuXHRWaWV3TW9kZWw6IFZpZXdNb2RlbCxcblx0Vk5vZGU6IFZOb2RlLFxuXG5cdGNyZWF0ZVZpZXc6IGNyZWF0ZVZpZXcsXG5cblx0ZGVmaW5lRWxlbWVudDogZGVmaW5lRWxlbWVudCxcblx0ZGVmaW5lU3ZnRWxlbWVudDogZGVmaW5lU3ZnRWxlbWVudCxcblx0ZGVmaW5lVGV4dDogZGVmaW5lVGV4dCxcblx0ZGVmaW5lQ29tbWVudDogZGVmaW5lQ29tbWVudCxcblx0ZGVmaW5lVmlldzogZGVmaW5lVmlldyxcblxuXHRpbmplY3RWaWV3OiBpbmplY3RWaWV3LFxuXHRpbmplY3RFbGVtZW50OiBpbmplY3RFbGVtZW50LFxuXG5cdGxhenlMaXN0OiBsYXp5TGlzdCxcblxuXHRGSVhFRF9CT0RZOiBGSVhFRF9CT0RZLFxuXHRERUVQX1JFTU9WRTogREVFUF9SRU1PVkUsXG5cdEtFWUVEX0xJU1Q6IEtFWUVEX0xJU1QsXG5cdExBWllfTElTVDogTEFaWV9MSVNULFxufTtcblxuZnVuY3Rpb24gcHJvdG9QYXRjaChuLCBkb1JlcGFpbnQpIHtcblx0cGF0Y2gkMSh0aGlzLCBuLCBkb1JlcGFpbnQpO1xufVxuXG4vLyBuZXdOb2RlIGNhbiBiZSBlaXRoZXIge2NsYXNzOiBzdHlsZTogfSBvciBmdWxsIG5ldyBWTm9kZVxuLy8gd2lsbC9kaWRQYXRjaCBob29rcz9cbmZ1bmN0aW9uIHBhdGNoJDEobywgbiwgZG9SZXBhaW50KSB7XG5cdGlmIChuLnR5cGUgIT0gbnVsbCkge1xuXHRcdC8vIG5vIGZ1bGwgcGF0Y2hpbmcgb2YgdmlldyByb290cywganVzdCB1c2UgcmVkcmF3IVxuXHRcdGlmIChvLnZtICE9IG51bGwpXG5cdFx0XHR7IHJldHVybjsgfVxuXG5cdFx0cHJlUHJvYyhuLCBvLnBhcmVudCwgby5pZHgsIG51bGwpO1xuXHRcdG8ucGFyZW50LmJvZHlbby5pZHhdID0gbjtcblx0XHRwYXRjaChuLCBvKTtcblx0XHRkb1JlcGFpbnQgJiYgcmVwYWludChuKTtcblx0XHRkcmFpbkRpZEhvb2tzKGdldFZtKG4pKTtcblx0fVxuXHRlbHNlIHtcblx0XHQvLyBUT0RPOiByZS1lc3RhYmxpc2ggcmVmc1xuXG5cdFx0Ly8gc2hhbGxvdy1jbG9uZSB0YXJnZXRcblx0XHR2YXIgZG9ub3IgPSBPYmplY3QuY3JlYXRlKG8pO1xuXHRcdC8vIGZpeGF0ZSBvcmlnIGF0dHJzXG5cdFx0ZG9ub3IuYXR0cnMgPSBhc3NpZ25PYmooe30sIG8uYXR0cnMpO1xuXHRcdC8vIGFzc2lnbiBuZXcgYXR0cnMgaW50byBsaXZlIHRhcmcgbm9kZVxuXHRcdHZhciBvYXR0cnMgPSBhc3NpZ25PYmooby5hdHRycywgbik7XG5cdFx0Ly8gcHJlcGVuZCBhbnkgZml4ZWQgc2hvcnRoYW5kIGNsYXNzXG5cdFx0aWYgKG8uX2NsYXNzICE9IG51bGwpIHtcblx0XHRcdHZhciBhY2xhc3MgPSBvYXR0cnMuY2xhc3M7XG5cdFx0XHRvYXR0cnMuY2xhc3MgPSBhY2xhc3MgIT0gbnVsbCAmJiBhY2xhc3MgIT09IFwiXCIgPyBvLl9jbGFzcyArIFwiIFwiICsgYWNsYXNzIDogby5fY2xhc3M7XG5cdFx0fVxuXG5cdFx0cGF0Y2hBdHRycyhvLCBkb25vcik7XG5cblx0XHRkb1JlcGFpbnQgJiYgcmVwYWludChvKTtcblx0fVxufVxuXG5WTm9kZVByb3RvLnBhdGNoID0gcHJvdG9QYXRjaDtcblxuZnVuY3Rpb24gbmV4dFN1YlZtcyhuLCBhY2N1bSkge1xuXHR2YXIgYm9keSA9IG4uYm9keTtcblxuXHRpZiAoaXNBcnIoYm9keSkpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGJvZHkubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBuMiA9IGJvZHlbaV07XG5cblx0XHRcdGlmIChuMi52bSAhPSBudWxsKVxuXHRcdFx0XHR7IGFjY3VtLnB1c2gobjIudm0pOyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgbmV4dFN1YlZtcyhuMiwgYWNjdW0pOyB9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGFjY3VtO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVFbGVtZW50U3ByZWFkKHRhZykge1xuXHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0dmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuXHR2YXIgYm9keSwgYXR0cnM7XG5cblx0aWYgKGxlbiA+IDEpIHtcblx0XHR2YXIgYm9keUlkeCA9IDE7XG5cblx0XHRpZiAoaXNQbGFpbk9iaihhcmdzWzFdKSkge1xuXHRcdFx0YXR0cnMgPSBhcmdzWzFdO1xuXHRcdFx0Ym9keUlkeCA9IDI7XG5cdFx0fVxuXG5cdFx0aWYgKGxlbiA9PT0gYm9keUlkeCArIDEgJiYgKGlzVmFsKGFyZ3NbYm9keUlkeF0pIHx8IGlzQXJyKGFyZ3NbYm9keUlkeF0pIHx8IGF0dHJzICYmIChhdHRycy5fZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1QpKVxuXHRcdFx0eyBib2R5ID0gYXJnc1tib2R5SWR4XTsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgYm9keSA9IHNsaWNlQXJncyhhcmdzLCBib2R5SWR4KTsgfVxuXHR9XG5cblx0cmV0dXJuIGluaXRFbGVtZW50Tm9kZSh0YWcsIGF0dHJzLCBib2R5KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lU3ZnRWxlbWVudFNwcmVhZCgpIHtcblx0dmFyIG4gPSBkZWZpbmVFbGVtZW50U3ByZWFkLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG5cdG4ubnMgPSBTVkdfTlM7XG5cdHJldHVybiBuO1xufVxuXG5WaWV3TW9kZWxQcm90by5lbWl0ID0gZW1pdDtcblZpZXdNb2RlbFByb3RvLm9uZW1pdCA9IG51bGw7XG5cblZpZXdNb2RlbFByb3RvLmJvZHkgPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIG5leHRTdWJWbXModGhpcy5ub2RlLCBbXSk7XG59O1xuXG5uYW5vLmRlZmluZUVsZW1lbnRTcHJlYWQgPSBkZWZpbmVFbGVtZW50U3ByZWFkO1xubmFuby5kZWZpbmVTdmdFbGVtZW50U3ByZWFkID0gZGVmaW5lU3ZnRWxlbWVudFNwcmVhZDtcblxuVmlld01vZGVsUHJvdG8uX3N0cmVhbSA9IG51bGw7XG5cbmZ1bmN0aW9uIHByb3RvQXR0YWNoKGVsKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cdGlmICh2bS5ub2RlID09IG51bGwpXG5cdFx0eyB2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTsgfVxuXG5cdGF0dGFjaCh2bS5ub2RlLCBlbCk7XG5cblx0cmV0dXJuIHZtO1xufVxuXG4vLyB2ZXJ5IHNpbWlsYXIgdG8gaHlkcmF0ZSwgVE9ETzogZHJ5XG5mdW5jdGlvbiBhdHRhY2godm5vZGUsIHdpdGhFbCkge1xuXHR2bm9kZS5lbCA9IHdpdGhFbDtcblx0d2l0aEVsLl9ub2RlID0gdm5vZGU7XG5cblx0dmFyIG5hdHRycyA9IHZub2RlLmF0dHJzO1xuXG5cdGZvciAodmFyIGtleSBpbiBuYXR0cnMpIHtcblx0XHR2YXIgbnZhbCA9IG5hdHRyc1trZXldO1xuXHRcdHZhciBpc0R5biA9IGlzRHluUHJvcCh2bm9kZS50YWcsIGtleSk7XG5cblx0XHRpZiAoaXNTdHlsZVByb3Aoa2V5KSB8fCBpc1NwbFByb3Aoa2V5KSkge31cblx0XHRlbHNlIGlmIChpc0V2UHJvcChrZXkpKVxuXHRcdFx0eyBwYXRjaEV2ZW50KHZub2RlLCBrZXksIG52YWwpOyB9XG5cdFx0ZWxzZSBpZiAobnZhbCAhPSBudWxsICYmIGlzRHluKVxuXHRcdFx0eyBzZXRBdHRyKHZub2RlLCBrZXksIG52YWwsIGlzRHluKTsgfVxuXHR9XG5cblx0aWYgKCh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVClcblx0XHR7IHZub2RlLmJvZHkuYm9keSh2bm9kZSk7IH1cblxuXHRpZiAoaXNBcnIodm5vZGUuYm9keSkgJiYgdm5vZGUuYm9keS5sZW5ndGggPiAwKSB7XG5cdFx0dmFyIGMgPSB3aXRoRWwuZmlyc3RDaGlsZDtcblx0XHR2YXIgaSA9IDA7XG5cdFx0dmFyIHYgPSB2bm9kZS5ib2R5W2ldO1xuXHRcdGRvIHtcblx0XHRcdGlmICh2LnR5cGUgPT09IFZWSUVXKVxuXHRcdFx0XHR7IHYgPSBjcmVhdGVWaWV3KHYudmlldywgdi5kYXRhLCB2LmtleSwgdi5vcHRzKS5fcmVkcmF3KHZub2RlLCBpLCBmYWxzZSkubm9kZTsgfVxuXHRcdFx0ZWxzZSBpZiAodi50eXBlID09PSBWTU9ERUwpXG5cdFx0XHRcdHsgdiA9IHYubm9kZSB8fCB2Ll9yZWRyYXcodm5vZGUsIGksIGZhbHNlKS5ub2RlOyB9XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKHZub2RlLnRhZyA9PT0gXCJ0YWJsZVwiICYmIHYudGFnID09PSBcInRyXCIpIHtcblx0XHRcdFx0XHRkZXZOb3RpZnkoXCJBVFRBQ0hfSU1QTElDSVRfVEJPRFlcIiwgW3Zub2RlLCB2XSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0YXR0YWNoKHYsIGMpO1xuXHRcdH0gd2hpbGUgKChjID0gYy5uZXh0U2libGluZykgJiYgKHYgPSB2bm9kZS5ib2R5WysraV0pKVxuXHR9XG59XG5cbmZ1bmN0aW9uIHZtUHJvdG9IdG1sKGR5blByb3BzKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0aWYgKHZtLm5vZGUgPT0gbnVsbClcblx0XHR7IHZtLl9yZWRyYXcobnVsbCwgbnVsbCwgZmFsc2UpOyB9XG5cblx0cmV0dXJuIGh0bWwodm0ubm9kZSwgZHluUHJvcHMpO1xufVxuXG5mdW5jdGlvbiB2UHJvdG9IdG1sKGR5blByb3BzKSB7XG5cdHJldHVybiBodG1sKHRoaXMsIGR5blByb3BzKTtcbn1cblxuZnVuY3Rpb24gY2FtZWxEYXNoKHZhbCkge1xuXHRyZXR1cm4gdmFsLnJlcGxhY2UoLyhbYS16XSkoW0EtWl0pL2csICckMS0kMicpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmZ1bmN0aW9uIHN0eWxlU3RyKGNzcykge1xuXHR2YXIgc3R5bGUgPSBcIlwiO1xuXG5cdGZvciAodmFyIHBuYW1lIGluIGNzcykge1xuXHRcdGlmIChjc3NbcG5hbWVdICE9IG51bGwpXG5cdFx0XHR7IHN0eWxlICs9IGNhbWVsRGFzaChwbmFtZSkgKyBcIjogXCIgKyBhdXRvUHgocG5hbWUsIGNzc1twbmFtZV0pICsgJzsgJzsgfVxuXHR9XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiB0b1N0cih2YWwpIHtcblx0cmV0dXJuIHZhbCA9PSBudWxsID8gJycgOiAnJyt2YWw7XG59XG5cbnZhciB2b2lkVGFncyA9IHtcbiAgICBhcmVhOiB0cnVlLFxuICAgIGJhc2U6IHRydWUsXG4gICAgYnI6IHRydWUsXG4gICAgY29sOiB0cnVlLFxuICAgIGNvbW1hbmQ6IHRydWUsXG4gICAgZW1iZWQ6IHRydWUsXG4gICAgaHI6IHRydWUsXG4gICAgaW1nOiB0cnVlLFxuICAgIGlucHV0OiB0cnVlLFxuICAgIGtleWdlbjogdHJ1ZSxcbiAgICBsaW5rOiB0cnVlLFxuICAgIG1ldGE6IHRydWUsXG4gICAgcGFyYW06IHRydWUsXG4gICAgc291cmNlOiB0cnVlLFxuICAgIHRyYWNrOiB0cnVlLFxuXHR3YnI6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGVzY0h0bWwocykge1xuXHRzID0gdG9TdHIocyk7XG5cblx0Zm9yICh2YXIgaSA9IDAsIG91dCA9ICcnOyBpIDwgcy5sZW5ndGg7IGkrKykge1xuXHRcdHN3aXRjaCAoc1tpXSkge1xuXHRcdFx0Y2FzZSAnJic6IG91dCArPSAnJmFtcDsnOyAgYnJlYWs7XG5cdFx0XHRjYXNlICc8Jzogb3V0ICs9ICcmbHQ7JzsgICBicmVhaztcblx0XHRcdGNhc2UgJz4nOiBvdXQgKz0gJyZndDsnOyAgIGJyZWFrO1xuXHRcdC8vXHRjYXNlICdcIic6IG91dCArPSAnJnF1b3Q7JzsgYnJlYWs7XG5cdFx0Ly9cdGNhc2UgXCInXCI6IG91dCArPSAnJiMwMzk7JzsgYnJlYWs7XG5cdFx0Ly9cdGNhc2UgJy8nOiBvdXQgKz0gJyYjeDJmOyc7IGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDogIG91dCArPSBzW2ldO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGVzY1F1b3RlcyhzKSB7XG5cdHMgPSB0b1N0cihzKTtcblxuXHRmb3IgKHZhciBpID0gMCwgb3V0ID0gJyc7IGkgPCBzLmxlbmd0aDsgaSsrKVxuXHRcdHsgb3V0ICs9IHNbaV0gPT09ICdcIicgPyAnJnF1b3Q7JyA6IHNbaV07IH1cdFx0Ly8gYWxzbyAmP1xuXG5cdHJldHVybiBvdXQ7XG59XG5cbmZ1bmN0aW9uIGVhY2hIdG1sKGFyciwgZHluUHJvcHMpIHtcblx0dmFyIGJ1ZiA9ICcnO1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKylcblx0XHR7IGJ1ZiArPSBodG1sKGFycltpXSwgZHluUHJvcHMpOyB9XG5cdHJldHVybiBidWY7XG59XG5cbnZhciBpbm5lckhUTUwgPSBcIi5pbm5lckhUTUxcIjtcblxuZnVuY3Rpb24gaHRtbChub2RlLCBkeW5Qcm9wcykge1xuXHR2YXIgb3V0LCBzdHlsZTtcblxuXHRzd2l0Y2ggKG5vZGUudHlwZSkge1xuXHRcdGNhc2UgVlZJRVc6XG5cdFx0XHRvdXQgPSBjcmVhdGVWaWV3KG5vZGUudmlldywgbm9kZS5kYXRhLCBub2RlLmtleSwgbm9kZS5vcHRzKS5odG1sKGR5blByb3BzKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVk1PREVMOlxuXHRcdFx0b3V0ID0gbm9kZS52bS5odG1sKCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIEVMRU1FTlQ6XG5cdFx0XHRpZiAobm9kZS5lbCAhPSBudWxsICYmIG5vZGUudGFnID09IG51bGwpIHtcblx0XHRcdFx0b3V0ID0gbm9kZS5lbC5vdXRlckhUTUw7XHRcdC8vIHByZS1leGlzdGluZyBkb20gZWxlbWVudHMgKGRvZXMgbm90IGN1cnJlbnRseSBhY2NvdW50IGZvciBhbnkgcHJvcHMgYXBwbGllZCB0byB0aGVtKVxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0dmFyIGJ1ZiA9IFwiXCI7XG5cblx0XHRcdGJ1ZiArPSBcIjxcIiArIG5vZGUudGFnO1xuXG5cdFx0XHR2YXIgYXR0cnMgPSBub2RlLmF0dHJzLFxuXHRcdFx0XHRoYXNBdHRycyA9IGF0dHJzICE9IG51bGw7XG5cblx0XHRcdGlmIChoYXNBdHRycykge1xuXHRcdFx0XHRmb3IgKHZhciBwbmFtZSBpbiBhdHRycykge1xuXHRcdFx0XHRcdGlmIChpc0V2UHJvcChwbmFtZSkgfHwgcG5hbWVbMF0gPT09IFwiLlwiIHx8IHBuYW1lWzBdID09PSBcIl9cIiB8fCBkeW5Qcm9wcyA9PT0gZmFsc2UgJiYgaXNEeW5Qcm9wKG5vZGUudGFnLCBwbmFtZSkpXG5cdFx0XHRcdFx0XHR7IGNvbnRpbnVlOyB9XG5cblx0XHRcdFx0XHR2YXIgdmFsID0gYXR0cnNbcG5hbWVdO1xuXG5cdFx0XHRcdFx0aWYgKHBuYW1lID09PSBcInN0eWxlXCIgJiYgdmFsICE9IG51bGwpIHtcblx0XHRcdFx0XHRcdHN0eWxlID0gdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIiA/IHN0eWxlU3RyKHZhbCkgOiB2YWw7XG5cdFx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodmFsID09PSB0cnVlKVxuXHRcdFx0XHRcdFx0eyBidWYgKz0gXCIgXCIgKyBlc2NIdG1sKHBuYW1lKSArICc9XCJcIic7IH1cblx0XHRcdFx0XHRlbHNlIGlmICh2YWwgPT09IGZhbHNlKSB7fVxuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbCAhPSBudWxsKVxuXHRcdFx0XHRcdFx0eyBidWYgKz0gXCIgXCIgKyBlc2NIdG1sKHBuYW1lKSArICc9XCInICsgZXNjUXVvdGVzKHZhbCkgKyAnXCInOyB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoc3R5bGUgIT0gbnVsbClcblx0XHRcdFx0XHR7IGJ1ZiArPSAnIHN0eWxlPVwiJyArIGVzY1F1b3RlcyhzdHlsZS50cmltKCkpICsgJ1wiJzsgfVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBpZiBib2R5LWxlc3Mgc3ZnIG5vZGUsIGF1dG8tY2xvc2UgJiByZXR1cm5cblx0XHRcdGlmIChub2RlLmJvZHkgPT0gbnVsbCAmJiBub2RlLm5zICE9IG51bGwgJiYgbm9kZS50YWcgIT09IFwic3ZnXCIpXG5cdFx0XHRcdHsgcmV0dXJuIGJ1ZiArIFwiLz5cIjsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IGJ1ZiArPSBcIj5cIjsgfVxuXG5cdFx0XHRpZiAoIXZvaWRUYWdzW25vZGUudGFnXSkge1xuXHRcdFx0XHRpZiAoaGFzQXR0cnMgJiYgYXR0cnNbaW5uZXJIVE1MXSAhPSBudWxsKVxuXHRcdFx0XHRcdHsgYnVmICs9IGF0dHJzW2lubmVySFRNTF07IH1cblx0XHRcdFx0ZWxzZSBpZiAoaXNBcnIobm9kZS5ib2R5KSlcblx0XHRcdFx0XHR7IGJ1ZiArPSBlYWNoSHRtbChub2RlLmJvZHksIGR5blByb3BzKTsgfVxuXHRcdFx0XHRlbHNlIGlmICgobm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVCkge1xuXHRcdFx0XHRcdG5vZGUuYm9keS5ib2R5KG5vZGUpO1xuXHRcdFx0XHRcdGJ1ZiArPSBlYWNoSHRtbChub2RlLmJvZHksIGR5blByb3BzKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0eyBidWYgKz0gZXNjSHRtbChub2RlLmJvZHkpOyB9XG5cblx0XHRcdFx0YnVmICs9IFwiPC9cIiArIG5vZGUudGFnICsgXCI+XCI7XG5cdFx0XHR9XG5cdFx0XHRvdXQgPSBidWY7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFRFWFQ6XG5cdFx0XHRvdXQgPSBlc2NIdG1sKG5vZGUuYm9keSk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIENPTU1FTlQ6XG5cdFx0XHRvdXQgPSBcIjwhLS1cIiArIGVzY0h0bWwobm9kZS5ib2R5KSArIFwiLS0+XCI7XG5cdFx0XHRicmVhaztcblx0fVxuXG5cdHJldHVybiBvdXQ7XG59XG5cblZpZXdNb2RlbFByb3RvLmF0dGFjaCA9IHByb3RvQXR0YWNoO1xuXG5WaWV3TW9kZWxQcm90by5odG1sID0gdm1Qcm90b0h0bWw7XG5WTm9kZVByb3RvLmh0bWwgPSB2UHJvdG9IdG1sO1xuXG5uYW5vLkRFVk1PREUgPSBERVZNT0RFO1xuXG5yZXR1cm4gbmFubztcblxufSkpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRvbXZtLmRldi5qcy5tYXBcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiIsImludGVyZmFjZSBJU3RvcmFnZUl0ZW0ge1xuXHRoYW5kbGVyOiAoZTogRXZlbnQpID0+IGFueTtcblx0c2NvcGU6IGFueTtcbn1cbmludGVyZmFjZSBJS2V5U3RvcmFnZSB7XG5cdFtrZXk6IHN0cmluZ106IElTdG9yYWdlSXRlbVtdO1xufVxuXG5pbnRlcmZhY2UgSUtleU1hbmFnZXIge1xuXHRhZGRIb3RLZXkoa2V5OiBzdHJpbmcsIGhhbmRsZXIsIHNjb3BlPzogYW55KTogdm9pZDtcblx0cmVtb3ZlSG90S2V5KGtleT86IHN0cmluZywgc2NvcGU/OiBhbnkpOiB2b2lkO1xuXHRleGlzdChrZXk6IHN0cmluZyk6IGJvb2xlYW47XG59XG5cblxuZnVuY3Rpb24gZ2V0SG90S2V5Q29kZShjb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRjb25zdCBtYXRjaGVzID0gY29kZS50b0xvd2VyQ2FzZSgpLm1hdGNoKC9cXHcrL2cpO1xuXHRsZXQgY29tcCA9IDA7XG5cdGxldCBrZXkgPSBcIlwiO1xuXHRmb3IgKGxldCBpID0gMDtpIDwgbWF0Y2hlcy5sZW5ndGg7aSsrKSB7XG5cdFx0Y29uc3QgY2hlY2sgPSBtYXRjaGVzW2ldO1xuXHRcdGlmIChjaGVjayA9PT0gXCJjdHJsXCIpIHtcblx0XHRcdGNvbXAgKz0gNDtcblx0XHR9IGVsc2UgaWYgKGNoZWNrID09PSBcInNoaWZ0XCIpIHtcblx0XHRcdGNvbXAgKz0gMjtcblx0XHR9IGVsc2UgaWYgKGNoZWNrID09PSBcImFsdFwiKSB7XG5cdFx0XHRjb21wICs9IDE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGtleSA9IGNoZWNrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gY29tcCArIGtleTtcbn1cblxuY2xhc3MgS2V5TWFuYWdlciBpbXBsZW1lbnRzIElLZXlNYW5hZ2VyIHtcblx0cHJpdmF0ZSBfa2V5c1N0b3JhZ2U6IElLZXlTdG9yYWdlID0ge307XG5cblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcblx0XHRcdGNvbnN0IGNvbXAgPSAoZS5jdHJsS2V5IHx8IGUubWV0YUtleSA/IDQgOiAwKSArIChlLnNoaWZ0S2V5ID8gMiA6IDApICsgKGUuYWx0S2V5ID8gMSA6IDApO1xuXHRcdFx0bGV0IGtleTtcblx0XHRcdGlmICgoZS53aGljaCA+PSA0OCAmJiBlLndoaWNoIDw9IDU3KSB8fCAoZS53aGljaCA+PSA2NSAmJiBlLndoaWNoIDw9IDkwKSkgeyAvLyBBLVogMC05XG5cdFx0XHRcdGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRrZXkgPSBlLmtleTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IGNvZGUgPSBjb21wICsga2V5LnRvTG93ZXJDYXNlKCk7XG5cdFx0XHRjb25zdCBhY3Rpb25zID0gdGhpcy5fa2V5c1N0b3JhZ2VbY29kZV07XG5cdFx0XHRpZiAoYWN0aW9ucykge1xuXHRcdFx0XHRmb3IgKGxldCBpID0gMDtpIDwgYWN0aW9ucy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdFx0YWN0aW9uc1tpXS5oYW5kbGVyKGUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0YWRkSG90S2V5KGtleTogc3RyaW5nLCBoYW5kbGVyLCBzY29wZT86IGFueSk6IHZvaWQge1xuXHRcdGNvbnN0IGNvZGUgPSBnZXRIb3RLZXlDb2RlKGtleSk7XG5cdFx0aWYgKCF0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXSkge1xuXHRcdFx0dGhpcy5fa2V5c1N0b3JhZ2VbY29kZV0gPSBbXTtcblx0XHR9XG5cdFx0dGhpcy5fa2V5c1N0b3JhZ2VbY29kZV0ucHVzaCh7XG5cdFx0XHRoYW5kbGVyLFxuXHRcdFx0c2NvcGVcblx0XHR9KTtcblx0fVxuXHRyZW1vdmVIb3RLZXkoa2V5Pzogc3RyaW5nLCBzY29wZT86IGFueSk6IHZvaWQge1xuXHRcdGNvbnN0IGtleVN0b3JhZ2UgPSB0aGlzLl9rZXlzU3RvcmFnZTtcblx0XHRpZiAoa2V5KSB7XG5cdFx0XHRjb25zdCBjb2RlID0gZ2V0SG90S2V5Q29kZShrZXkpO1xuXHRcdFx0ZGVsZXRlIGtleVN0b3JhZ2VbY29kZV07XG5cdFx0fVxuXHRcdGlmIChzY29wZSkge1xuXHRcdFx0Zm9yIChjb25zdCBjb2RlIGluIGtleVN0b3JhZ2UpIHtcblx0XHRcdFx0Y29uc3QgdG9EZWxldGUgPSBbXTsgLy8gaXRlbXMgaW5kZXggdG8gZGVsZXRlXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwO2kgPCBrZXlTdG9yYWdlW2NvZGVdLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0XHRpZiAoa2V5U3RvcmFnZVtjb2RlXVtpXS5zY29wZSA9PT0gc2NvcGUpIHtcblx0XHRcdFx0XHRcdHRvRGVsZXRlLnB1c2goaSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChrZXlTdG9yYWdlW2NvZGVdLmxlbmd0aCA9PT0gdG9EZWxldGUubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZGVsZXRlIGtleVN0b3JhZ2VbY29kZV07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Zm9yIChsZXQgaSA9IHRvRGVsZXRlLmxlbmd0aCAtIDE7aSA+PSAwO2ktLSkgeyAvLyBiZWdpbiBmcm9tIGxhc3QgY296IHNwbGljZSBjaGFuZ2Ugb3RoZXIgaW5kZXhcblx0XHRcdFx0XHRcdGtleVN0b3JhZ2VbY29kZV0uc3BsaWNlKHRvRGVsZXRlW2ldLCAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblx0ZXhpc3Qoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRjb25zdCBjb2RlID0gZ2V0SG90S2V5Q29kZShrZXkpO1xuXHRcdHJldHVybiAhIXRoaXMuX2tleXNTdG9yYWdlW2NvZGVdO1xuXHR9XG59XG5cbmV4cG9ydCBjb25zdCBrZXlNYW5hZ2VyID0gbmV3IEtleU1hbmFnZXIoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZEhvdGtleXMoaGFuZGxlcnMsIGJlZm9yZUNhbGw/OiAoKSA9PiBib29sZWFuKSB7XG5cdGNvbnN0IGNvbnRleHQgPSBuZXcgRGF0ZSgpO1xuXG5cdGNvbnN0IHdyYXBIYW5kbGVyID0gaGFuZGxlciA9PiBlID0+IHtcblx0XHRpZiAoYmVmb3JlQ2FsbCAmJiBiZWZvcmVDYWxsKCkgPT09IGZhbHNlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGhhbmRsZXIoZSk7XG5cdH07XG5cblx0Zm9yIChjb25zdCBrZXkgaW4gaGFuZGxlcnMpIHtcblx0XHRrZXlNYW5hZ2VyLmFkZEhvdEtleShcblx0XHRcdGtleSxcblx0XHRcdHdyYXBIYW5kbGVyKGhhbmRsZXJzW2tleV0pLFxuXHRcdFx0Y29udGV4dFxuXHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gKCkgPT4ga2V5TWFuYWdlci5yZW1vdmVIb3RLZXkodW5kZWZpbmVkLCBjb250ZXh0KTtcbn0iLCJpbXBvcnQgeyBsb2NhdGUgfSBmcm9tIFwiLi9odG1sXCI7XG5cbmxldCBjb3VudGVyID0gKG5ldyBEYXRlKCkpLnZhbHVlT2YoKTtcbmV4cG9ydCBmdW5jdGlvbiB1aWQoKTogc3RyaW5nIHtcblx0cmV0dXJuIFwidVwiICsgKGNvdW50ZXIrKyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzb3VyY2UsIGRlZXAgPSB0cnVlKXtcblx0aWYgKHNvdXJjZSl7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gc291cmNlKXtcblx0XHRcdGNvbnN0IHNvYmogPSBzb3VyY2Vba2V5XTtcblx0XHRcdGNvbnN0IHRvYmogPSB0YXJnZXRba2V5XTtcblx0XHRcdGlmIChkZWVwICYmIHR5cGVvZiB0b2JqID09PSBcIm9iamVjdFwiICYmICEodG9iaiBpbnN0YW5jZW9mIERhdGUpICYmICEodG9iaiBpbnN0YW5jZW9mIEFycmF5KSl7XG5cdFx0XHRcdGV4dGVuZCh0b2JqLCBzb2JqKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gc29iajtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhcmdldDtcbn1cblxuaW50ZXJmYWNlIElPQmoge1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2U6IElPQmosIHdpdGhvdXRJbm5lcj86IGJvb2xlYW4pOiBJT0JqIHtcblx0Y29uc3QgcmVzdWx0OiBJT0JqID0ge307XG5cdGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSl7XG5cdFx0aWYgKCF3aXRob3V0SW5uZXIgfHwga2V5WzBdICE9PSBcIiRcIikge1xuXHRcdFx0cmVzdWx0W2tleV0gPSBzb3VyY2Vba2V5XTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5hdHVyYWxTb3J0KGFycik6IGFueVtdIHtcblx0cmV0dXJuIGFyci5zb3J0KChhOiBhbnksIGI6IGFueSkgPT4ge1xuXHRcdGNvbnN0IG5uID0gdHlwZW9mIGEgPT09IFwic3RyaW5nXCIgPyBhLmxvY2FsZUNvbXBhcmUoYikgOiBhIC0gYjtcblx0XHRyZXR1cm4gbm47XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4PFQgPSBhbnk+KGFycjogVFtdLCBwcmVkaWNhdGU6IChvYmo6IFQpID0+IGJvb2xlYW4pOiBudW1iZXIge1xuXHRjb25zdCBsZW4gPSBhcnIubGVuZ3RoO1xuXHRmb3IgKGxldCBpPTA7IGk8bGVuOyBpKyspIHtcblx0XHRpZiAocHJlZGljYXRlKGFycltpXSkpIHtcblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsU3RyaW5nKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRpZiAoZnJvbS5sZW5ndGggPiB0by5sZW5ndGgpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Zm9yIChsZXQgaT0wOyBpPGZyb20ubGVuZ3RoOyBpKyspIHtcblx0XHRpZiAoZnJvbVtpXS50b0xvd2VyQ2FzZSgpICE9PSB0b1tpXS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2luZ2xlT3V0ZXJDbGljayhmbjogKGU6IE1vdXNlRXZlbnQpID0+IGJvb2xlYW4pIHtcblx0Y29uc3QgY2xpY2sgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdGlmIChmbihlKSkge1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrKTtcblx0XHR9XG5cdH07XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RXaWRnZXRDbGljayh3aWRnZXRJZDogc3RyaW5nLCBjYjogKGlubmVyOiBib29sZWFuKSA9PiB2b2lkKTogKCkgPT4gdm9pZCB7XG5cdGNvbnN0IGNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IGNiKGxvY2F0ZShlLCBcImRoeF93aWRnZXRfaWRcIikgPT09IHdpZGdldElkKTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrKTtcblxuXHRyZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVud3JhcEJveDxUPihib3g6IFQgfCBUW10pOiBUIHtcblx0aWYgKEFycmF5LmlzQXJyYXkoYm94KSkge1xuXHRcdHJldHVybiBib3hbMF07XG5cdH1cblx0cmV0dXJuIGJveDtcbn1cbmV4cG9ydCBmdW5jdGlvbiB3cmFwQm94PFQ+KHVuYm94ZWQ6IFQgfCBUW10pOiBUW10ge1xuXHRpZiAoQXJyYXkuaXNBcnJheSh1bmJveGVkKSkge1xuXHRcdHJldHVybiB1bmJveGVkO1xuXHR9XG5cdHJldHVybiBbdW5ib3hlZF07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0RlZmluZWQ8VD4oc29tZTogVCk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gc29tZSAhPT0gbnVsbCAmJiBzb21lICE9PSB1bmRlZmluZWQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIpOiBudW1iZXJbXSB7XG5cdGlmIChmcm9tID4gdG8pIHtcblx0XHRyZXR1cm4gW107XG5cdH1cblx0Y29uc3QgcmVzdWx0ID0gW107XG5cdHdoaWxlKGZyb20gPD0gdG8pIHtcblx0XHRyZXN1bHQucHVzaChmcm9tKyspO1xuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59IiwiaW1wb3J0ICogYXMgZG9tIGZyb20gXCJkb212bS9kaXN0L2Rldi9kb212bS5kZXYuanNcIjtcbmV4cG9ydCBsZXQgZWwgPSBkb20uZGVmaW5lRWxlbWVudDtcbmV4cG9ydCBsZXQgc3YgPSBkb20uZGVmaW5lU3ZnRWxlbWVudDtcbmV4cG9ydCBsZXQgdmlldyA9IGRvbS5kZWZpbmVWaWV3O1xuZXhwb3J0IGxldCBjcmVhdGUgPSBkb20uY3JlYXRlVmlldztcbmV4cG9ydCBsZXQgaW5qZWN0ID0gZG9tLmluamVjdFZpZXc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlSGVscCgpIHtcblx0ZG9tLkRFVk1PREUubXV0YXRpb25zID0gZmFsc2U7XG5cdGRvbS5ERVZNT0RFLndhcm5pbmdzID0gZmFsc2U7XG5cdGRvbS5ERVZNT0RFLnZlcmJvc2UgPSBmYWxzZTtcblx0ZG9tLkRFVk1PREUuVU5LRVlFRF9JTlBVVCA9IGZhbHNlO1xufVxuXG5leHBvcnQgdHlwZSBWTm9kZSA9IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSURvbVZpZXd7XG5cdHJlZHJhdygpO1xuXHRtb3VudChlbCA6IEhUTUxFbGVtZW50KTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURvbVJlbmRlcntcblx0cmVuZGVyKHZpZXcgOiBJRG9tVmlldywgZGF0YTogYW55KTpWTm9kZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdIYXNoIHtcblx0W25hbWU6IHN0cmluZ10gOiBJRG9tUmVuZGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzaXplcihoYW5kbGVyKXtcblx0Y29uc3QgcmVzaXplID0gKHdpbmRvdyBhcyBhbnkpLlJlc2l6ZU9ic2VydmVyO1xuXHRjb25zdCBhY3RpdmVIYW5kbGVyID0gKG5vZGUpID0+IHtcblxuXHRcdGNvbnN0IGhlaWdodCA9IG5vZGUuZWwub2Zmc2V0SGVpZ2h0O1xuXHRcdGNvbnN0IHdpZHRoID0gbm9kZS5lbC5vZmZzZXRXaWR0aDtcblx0XHRoYW5kbGVyKHdpZHRoLCBoZWlnaHQpO1xuXHR9O1xuXG5cdGlmIChyZXNpemUpe1xuXHRcdHJldHVybiBlbChcImRpdi5kaHgtcmVzaXplLW9ic2VydmVyXCIsIHtcblx0XHRcdF9ob29rczp7XG5cdFx0XHRcdGRpZEluc2VydChub2RlKXtcblx0XHRcdFx0XHRuZXcgcmVzaXplKCgpID0+IGFjdGl2ZUhhbmRsZXIobm9kZSkpLm9ic2VydmUobm9kZS5lbCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBlbChcImlmcmFtZS5kaHgtcmVzaXplLW9ic2VydmVyXCIsIHtcblx0XHRfaG9va3M6e1xuXHRcdFx0ZGlkSW5zZXJ0KG5vZGUpe1xuXHRcdFx0XHRub2RlLmVsLmNvbnRlbnRXaW5kb3cub25yZXNpemUgPSAoKSA9PiBhY3RpdmVIYW5kbGVyKG5vZGUpO1xuXHRcdFx0XHRhY3RpdmVIYW5kbGVyKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59IiwiZXhwb3J0IHR5cGUgQ2FsbGJhY2sgPSAoLi4uYXJnczogYW55W10pID0+IGFueTtcbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50U3lzdGVtPEUsIFQgZXh0ZW5kcyBJRXZlbnRIYW5kbGVyc01hcCA9IElFdmVudEhhbmRsZXJzTWFwPiB7XG5cdGNvbnRleHQ6IGFueTtcblx0ZXZlbnRzOiBJRXZlbnRzO1xuXHRvbjxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgY2FsbGJhY2s6IFRbS10sIGNvbnRleHQ/OiBhbnkpO1xuXHRkZXRhY2gobmFtZTogRSwgY29udGV4dD86IGFueSk7XG5cdGNsZWFyKCk6IHZvaWQ7XG5cdGZpcmU8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGFyZ3M/OiBBcmd1bWVudFR5cGVzPFRbS10+KTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIElFdmVudCB7XG5cdGNhbGxiYWNrOiBDYWxsYmFjaztcblx0Y29udGV4dDogYW55O1xufVxuaW50ZXJmYWNlIElFdmVudHMge1xuXHRba2V5OiBzdHJpbmddOiBJRXZlbnRbXTtcbn1cblxuaW50ZXJmYWNlIElFdmVudEhhbmRsZXJzTWFwIHtcblx0W2tleTogc3RyaW5nXTogQ2FsbGJhY2s7XG59XG50eXBlIEFyZ3VtZW50VHlwZXM8RiBleHRlbmRzICguLi5hcmdzOiBhbnlbXSkgPT4gYW55PiA9IEYgZXh0ZW5kcyAoLi4uYXJnczogaW5mZXIgQSkgPT4gYW55ID8gQSA6IG5ldmVyO1xuXG5leHBvcnQgY2xhc3MgRXZlbnRTeXN0ZW08RSBleHRlbmRzIHN0cmluZywgVCBleHRlbmRzIElFdmVudEhhbmRsZXJzTWFwID0gSUV2ZW50SGFuZGxlcnNNYXA+IGltcGxlbWVudHMgSUV2ZW50U3lzdGVtPEUsIFQ+IHtcblx0cHVibGljIGV2ZW50czogSUV2ZW50cztcblx0cHVibGljIGNvbnRleHQ6IGFueTtcblxuXHRjb25zdHJ1Y3Rvcihjb250ZXh0PzogYW55KSB7XG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0IHx8IHRoaXM7XG5cdH1cblx0b248SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiBUW0tdLCBjb250ZXh0PzogYW55KSB7XG5cdFx0Y29uc3QgZXZlbnQ6IHN0cmluZyA9IChuYW1lIGFzIHN0cmluZykudG9Mb3dlckNhc2UoKTtcblx0XHR0aGlzLmV2ZW50c1tldmVudF0gPSB0aGlzLmV2ZW50c1tldmVudF0gfHwgW107XG5cdFx0dGhpcy5ldmVudHNbZXZlbnRdLnB1c2goeyBjYWxsYmFjaywgY29udGV4dDogY29udGV4dCB8fCB0aGlzLmNvbnRleHQgfSk7XG5cdH1cblx0ZGV0YWNoKG5hbWU6IEUsIGNvbnRleHQ/OiBhbnkpIHtcblx0XHRjb25zdCBldmVudDogc3RyaW5nID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0Y29uc3QgZVN0YWNrID0gdGhpcy5ldmVudHNbZXZlbnRdO1xuXHRcdGlmIChjb250ZXh0ICYmIGVTdGFjayAmJiBlU3RhY2subGVuZ3RoKSB7XG5cdFx0XHRmb3IgKGxldCBpID0gZVN0YWNrLmxlbmd0aCAtIDE7aSA+PSAwO2ktLSkge1xuXHRcdFx0XHRpZiAoZVN0YWNrW2ldLmNvbnRleHQgPT09IGNvbnRleHQpIHtcblx0XHRcdFx0XHRlU3RhY2suc3BsaWNlKGksIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZXZlbnRzW2V2ZW50XSA9IFtdO1xuXHRcdH1cblx0fVxuXHRmaXJlPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBhcmdzOiBBcmd1bWVudFR5cGVzPFRbS10+KTogYm9vbGVhbiB7XG5cdFx0aWYgKHR5cGVvZiBhcmdzID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHRhcmdzID0gW10gYXMgYW55O1xuXHRcdH1cblxuXHRcdGNvbnN0IGV2ZW50OiBzdHJpbmcgPSAobmFtZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRpZiAodGhpcy5ldmVudHNbZXZlbnRdKSB7XG5cdFx0XHRjb25zdCByZXMgPSB0aGlzLmV2ZW50c1tldmVudF0ubWFwKFxuXHRcdFx0XHRlID0+IGUuY2FsbGJhY2suYXBwbHkoZS5jb250ZXh0LCBhcmdzKVxuXHRcdFx0KTtcblx0XHRcdHJldHVybiByZXMuaW5kZXhPZihmYWxzZSkgPCAwO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXHRjbGVhcigpIHtcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFdmVudHNNaXhpbihvYmo6IGFueSkge1xuXHRvYmogPSBvYmogfHwge307XG5cdGNvbnN0IGV2ZW50U3lzdGVtID0gbmV3IEV2ZW50U3lzdGVtKG9iaik7XG5cdG9iai5kZXRhY2hFdmVudCA9IGV2ZW50U3lzdGVtLmRldGFjaC5iaW5kKGV2ZW50U3lzdGVtKTtcblx0b2JqLmF0dGFjaEV2ZW50ID0gZXZlbnRTeXN0ZW0ub24uYmluZChldmVudFN5c3RlbSk7XG5cdG9iai5jYWxsRXZlbnQgPSBldmVudFN5c3RlbS5maXJlLmJpbmQoZXZlbnRTeXN0ZW0pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElFdmVudEZhY2FkZSB7XG5cdGF0dGFjaEV2ZW50OiBhbnk7XG5cdGNhbGxFdmVudDogYW55O1xufSIsImltcG9ydCBcIi4vcG9seWZpbGxzL21hdGNoZXNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvTm9kZShub2RlOiBzdHJpbmcgfCBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcblx0aWYgKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0bm9kZSA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlKSB8fCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKG5vZGUpKSBhcyBIVE1MRWxlbWVudDtcblx0fVxuXHRyZXR1cm4gbm9kZSB8fCBkb2N1bWVudC5ib2R5O1xufVxuXG50eXBlIGV2ZW50UHJlcGFyZSA9IChldjpFdmVudCkgPT4gYW55O1xuaW50ZXJmYWNlIElIYW5kbGVySGFzaCB7XG5cdFtuYW1lOiBzdHJpbmddOiAoKC4uLmFyZ3M6IGFueVtdKSA9PiAoYm9vbGVhbiB8IHZvaWQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV2ZW50SGFuZGxlcihwcmVwYXJlOmV2ZW50UHJlcGFyZSwgaGFzaDpJSGFuZGxlckhhc2gpe1xuXHRjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoaGFzaCk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uKGV2OkV2ZW50KXtcblx0XHRjb25zdCBkYXRhID0gcHJlcGFyZShldik7XG5cdFx0bGV0IG5vZGUgPSBldi50YXJnZXQgYXMgKEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCk7XG5cblx0XHR3aGlsZSAobm9kZSl7XG5cdFx0XHRjb25zdCBjc3NzdHJpbmcgPSAgbm9kZS5nZXRBdHRyaWJ1dGUgPyAobm9kZS5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSB8fCBcIlwiKSA6IFwiXCI7XG5cdFx0XHRpZiAoY3Nzc3RyaW5nLmxlbmd0aCl7XG5cdFx0XHRcdGNvbnN0IGNzcyA9IGNzc3N0cmluZy5zcGxpdChcIiBcIik7XG5cdFx0XHRcdGZvciAobGV0IGo9MDsgajxrZXlzLmxlbmd0aDsgaisrKXtcblx0XHRcdFx0XHRpZiAoY3NzLmluZGV4T2Yoa2V5c1tqXSkgPiAtMSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gaGFzaFtrZXlzW2pdXShldiwgZGF0YSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlIGFzIChIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9jYXRlKHRhcmdldDogRXZlbnQgfCBFbGVtZW50LCBhdHRyOiBzdHJpbmcgPSBcImRoeF9pZFwiKTogc3RyaW5nIHtcblx0Y29uc3Qgbm9kZSA9IGxvY2F0ZU5vZGUodGFyZ2V0LCBhdHRyKTtcblx0cmV0dXJuIG5vZGUgPyBub2RlLmdldEF0dHJpYnV0ZShhdHRyKSA6IFwiXCI7XG59XG5leHBvcnQgZnVuY3Rpb24gbG9jYXRlTm9kZSh0YXJnZXQ6IEV2ZW50IHwgRWxlbWVudCwgYXR0cjogc3RyaW5nID0gXCJkaHhfaWRcIik6IEVsZW1lbnQge1xuXHRpZiAodGFyZ2V0IGluc3RhbmNlb2YgRXZlbnQpIHtcblx0XHR0YXJnZXQgPSB0YXJnZXQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuXHR9XG5cdHdoaWxlICh0YXJnZXQpIHtcblx0XHRpZiAodGFyZ2V0LmdldEF0dHJpYnV0ZSAmJiB0YXJnZXQuZ2V0QXR0cmlidXRlKGF0dHIpKSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdH1cblx0XHR0YXJnZXQgPSB0YXJnZXQucGFyZW50Tm9kZSBhcyBIVE1MRWxlbWVudDtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Qm94KGVsZW0pIHtcblx0Y29uc3QgYm94ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cblx0Y29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsVG9wO1xuXHRjb25zdCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcblxuXHRjb25zdCB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wO1xuXHRjb25zdCBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0O1xuXHRjb25zdCByaWdodCA9IGJvZHkub2Zmc2V0V2lkdGggLSBib3gucmlnaHQ7XG5cdGNvbnN0IGJvdHRvbSA9IGJvZHkub2Zmc2V0SGVpZ2h0IC0gYm94LmJvdHRvbTtcblx0Y29uc3Qgd2lkdGggPSBib3gucmlnaHQgLSBib3gubGVmdDtcblx0Y29uc3QgaGVpZ2h0ID0gYm94LmJvdHRvbSAtIGJveC50b3A7XG5cblx0cmV0dXJuIHsgdG9wLCBsZWZ0LCByaWdodCwgYm90dG9tLCB3aWR0aCwgaGVpZ2h0IH07XG59XG5cbmxldCBzY3JvbGxXaWR0aCA9IC0xO1xuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbGJhcldpZHRoKCk6IG51bWJlciB7XG5cdGlmIChzY3JvbGxXaWR0aCA+IC0xKXtcblx0XHRyZXR1cm4gc2Nyb2xsV2lkdGg7XG5cdH1cblxuXHRjb25zdCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdik7XG5cdHNjcm9sbERpdi5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjogYWJzb2x1dGU7bGVmdDogLTk5OTk5cHg7b3ZlcmZsb3c6c2Nyb2xsO3dpZHRoOiAxMDBweDtoZWlnaHQ6IDEwMHB4O1wiO1xuXHRzY3JvbGxXaWR0aCA9IHNjcm9sbERpdi5vZmZzZXRXaWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aDtcblx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpO1xuXHRyZXR1cm4gc2Nyb2xsV2lkdGg7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZpdFRhcmdldCB7XG5cdHRvcDogbnVtYmVyO1xuXHRsZWZ0OiBudW1iZXI7XG5cdHdpZHRoOiBudW1iZXI7XG5cdGhlaWdodDogbnVtYmVyO1xufVxuaW50ZXJmYWNlIElGaXRQb3NpdGlvbiB7XG5cdGxlZnQ6IG51bWJlcjtcblx0cmlnaHQ6IG51bWJlcjtcblx0dG9wOiBudW1iZXI7XG5cdGJvdHRvbTogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBJRml0UG9zaXRpb25Db25maWcge1xuXHRtb2RlPzogUG9zaXRpb247XG5cdGF1dG8/OiBib29sZWFuO1xuXHRjZW50ZXJpbmc/OiBib29sZWFuO1xuXHR3aWR0aDogbnVtYmVyO1xuXHRoZWlnaHQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpdFBvc2l0aW9uKG5vZGU6IEhUTUxFbGVtZW50LCBjb25maWc6IElGaXRQb3NpdGlvbkNvbmZpZykge1xuXHRyZXR1cm4gY2FsY3VsYXRlUG9zaXRpb24oZ2V0UmVhbFBvc2l0aW9uKG5vZGUpLCBjb25maWcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJRSgpIHtcblx0Y29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcblx0cmV0dXJuIHVhLmluZGV4T2YoXCJNU0lFIFwiKSA+IC0xIHx8IHVhLmluZGV4T2YoXCJUcmlkZW50L1wiKSA+IC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVhbFBvc2l0aW9uKG5vZGU6IEhUTUxFbGVtZW50KTogSUZpdFBvc2l0aW9uIHtcblx0Y29uc3QgcmVjdHMgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRyZXR1cm4ge1xuXHRcdGxlZnQ6IHJlY3RzLmxlZnQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG5cdFx0cmlnaHQ6IHJlY3RzLnJpZ2h0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuXHRcdHRvcDogcmVjdHMudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0LFxuXHRcdGJvdHRvbTogcmVjdHMuYm90dG9tICsgd2luZG93LnBhZ2VZT2Zmc2V0XG5cdH07XG59XG5cbmV4cG9ydCBlbnVtIFBvc2l0aW9uIHtcblx0bGVmdCA9IFwibGVmdFwiLFxuXHRyaWdodCA9IFwicmlnaHRcIixcblx0Ym90dG9tID0gXCJib3R0b21cIixcblx0dG9wID0gXCJ0b3BcIlxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQb3NpdGlvbihwb3M6IElGaXRQb3NpdGlvbiwgY29uZmlnOiBJRml0UG9zaXRpb25Db25maWcpIHtcblx0Y29uc3Qge2xlZnQsIHRvcH0gPSBjb25maWcubW9kZSA9PT0gUG9zaXRpb24uYm90dG9tIHx8IGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi50b3Bcblx0XHQ/IHBsYWNlQm90dG9tT3JUb3AocG9zLCBjb25maWcpXG5cdFx0OiBwbGFjZVJpZ2h0T3JMZWZ0KHBvcywgY29uZmlnKTtcblx0cmV0dXJuIHtcblx0XHRsZWZ0OiBNYXRoLnJvdW5kKGxlZnQpICsgXCJweFwiLFxuXHRcdHRvcDogTWF0aC5yb3VuZCh0b3ApICsgXCJweFwiLFxuXHRcdG1pbldpZHRoOiBNYXRoLnJvdW5kKGNvbmZpZy53aWR0aCkgKyBcInB4XCIsXG5cdFx0cG9zaXRpb246IFwiYWJzb2x1dGVcIlxuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dCb3JkZXJzKCkge1xuXHRyZXR1cm4ge1xuXHRcdHJpZ2h0Qm9yZGVyOiB3aW5kb3cucGFnZVhPZmZzZXQgKyB3aW5kb3cuaW5uZXJXaWR0aCxcblx0XHRib3R0b21Cb3JkZXI6IHdpbmRvdy5wYWdlWU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodFxuXHR9O1xufVxuXG5mdW5jdGlvbiBob3Jpem9udGFsQ2VudGVyaW5nKHBvczogSUZpdFBvc2l0aW9uLCB3aWR0aDogbnVtYmVyLCByaWdodEJvcmRlcjogbnVtYmVyKSB7XG5cdGNvbnN0IG5vZGVXaWR0aCA9IHBvcy5yaWdodCAtIHBvcy5sZWZ0O1xuXHRjb25zdCBkaWZmID0gKHdpZHRoIC0gbm9kZVdpZHRoKSAvIDI7XG5cblx0Y29uc3QgbGVmdCA9IHBvcy5sZWZ0IC0gZGlmZjtcblx0Y29uc3QgcmlnaHQgPSBwb3MucmlnaHQgKyBkaWZmO1xuXG5cdGlmIChsZWZ0ID49IDAgJiYgcmlnaHQgPD0gcmlnaHRCb3JkZXIpIHtcblx0XHRyZXR1cm4gbGVmdDtcblx0fVxuXG5cdGlmIChsZWZ0IDwgMCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0cmV0dXJuIHJpZ2h0Qm9yZGVyIC0gd2lkdGg7XG59XG5cbmZ1bmN0aW9uIHZlcnRpY2FsQ2VudGVyaW5nKHBvczogSUZpdFBvc2l0aW9uLCBoZWlnaHQ6IG51bWJlciwgYm90dG9tQm9yZGVyOiBudW1iZXIpIHtcblx0Y29uc3Qgbm9kZUhlaWdodCA9IHBvcy5ib3R0b20gLSBwb3MudG9wO1xuXHRjb25zdCBkaWZmID0gKGhlaWdodCAtIG5vZGVIZWlnaHQpIC8gMjtcblxuXHRjb25zdCB0b3AgPSBwb3MudG9wIC0gZGlmZjtcblx0Y29uc3QgYm90dG9tID0gcG9zLmJvdHRvbSArIGRpZmY7XG5cblx0aWYgKHRvcCA+PSAwICYmIGJvdHRvbSA8PSBib3R0b21Cb3JkZXIpIHtcblx0XHRyZXR1cm4gdG9wO1xuXHR9XG5cblx0aWYgKHRvcCA8IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHJldHVybiBib3R0b21Cb3JkZXIgLSBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIHBsYWNlQm90dG9tT3JUb3AocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XG5cdGNvbnN0IHtyaWdodEJvcmRlciwgYm90dG9tQm9yZGVyfSA9IGdldFdpbmRvd0JvcmRlcnMoKTtcblxuXHRsZXQgbGVmdDtcblx0bGV0IHRvcDtcblxuXHRjb25zdCBib3R0b21EaWZmID0gYm90dG9tQm9yZGVyIC0gcG9zLmJvdHRvbSAtIGNvbmZpZy5oZWlnaHQ7XG5cdGNvbnN0IHRvcERpZmYgPSBwb3MudG9wIC0gY29uZmlnLmhlaWdodDtcblxuXHRpZiAoY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLmJvdHRvbSkge1xuXHRcdGlmIChib3R0b21EaWZmID49IDApIHtcblx0XHRcdHRvcCA9IHBvcy5ib3R0b207XG5cdFx0fSBlbHNlIGlmICh0b3BEaWZmID49IDApIHtcblx0XHRcdHRvcCA9IHRvcERpZmY7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmICh0b3BEaWZmID49IDApIHtcblx0XHRcdHRvcCA9IHRvcERpZmY7XG5cdFx0fSBlbHNlIGlmIChib3R0b21EaWZmID49IDApIHtcblx0XHRcdHRvcCA9IHBvcy5ib3R0b207XG5cdFx0fVxuXHR9XG5cblx0aWYgKGJvdHRvbURpZmYgPCAwICYmIHRvcERpZmYgPCAwKSB7XG5cdFx0aWYgKGNvbmZpZy5hdXRvKSB7XG5cdFx0XHRyZXR1cm4gcGxhY2VSaWdodE9yTGVmdChwb3MsIHsuLi5jb25maWcsIG1vZGU6IFBvc2l0aW9uLnJpZ2h0LCBhdXRvOiBmYWxzZX0pO1xuXHRcdH1cblx0XHR0b3AgPSBib3R0b21EaWZmID4gdG9wRGlmZiA/IHBvcy5ib3R0b20gOiB0b3BEaWZmO1xuXHR9XG5cblx0aWYgKGNvbmZpZy5jZW50ZXJpbmcpIHtcblx0XHRsZWZ0ID0gaG9yaXpvbnRhbENlbnRlcmluZyhwb3MsIGNvbmZpZy53aWR0aCwgcmlnaHRCb3JkZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGxlZnREaWZmID0gcmlnaHRCb3JkZXIgLSBwb3MubGVmdCAtIGNvbmZpZy53aWR0aDtcblx0XHRjb25zdCByaWdodERpZmYgPSBwb3MucmlnaHQgLSBjb25maWcud2lkdGg7XG5cblx0XHRpZiAobGVmdERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IHBvcy5sZWZ0O1xuXHRcdH0gZWxzZSBpZiAocmlnaHREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSByaWdodERpZmY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxlZnQgPSByaWdodERpZmYgPiBsZWZ0RGlmZiAgPyBwb3MubGVmdCA6IHJpZ2h0RGlmZjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge2xlZnQsIHRvcH07XG59XG5cbmZ1bmN0aW9uIHBsYWNlUmlnaHRPckxlZnQocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XG5cdGNvbnN0IHtyaWdodEJvcmRlciwgYm90dG9tQm9yZGVyfSA9IGdldFdpbmRvd0JvcmRlcnMoKTtcblxuXHRsZXQgbGVmdDtcblx0bGV0IHRvcDtcblxuXHRjb25zdCByaWdodERpZmYgPSByaWdodEJvcmRlciAtIHBvcy5yaWdodCAtIGNvbmZpZy53aWR0aDtcblx0Y29uc3QgbGVmdERpZmYgPSBwb3MubGVmdCAtIGNvbmZpZy53aWR0aDtcblxuXHRpZiAoY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLnJpZ2h0KSB7XG5cdFx0aWYgKHJpZ2h0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gcG9zLnJpZ2h0O1xuXHRcdH0gZWxzZSBpZiAobGVmdERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IGxlZnREaWZmO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAobGVmdERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IGxlZnREaWZmO1xuXHRcdH0gZWxzZSBpZiAocmlnaHREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBwb3MucmlnaHQ7XG5cdFx0fVxuXHR9XG5cblx0aWYgKGxlZnREaWZmIDwgMCAmJiByaWdodERpZmYgPCAwKSB7XG5cdFx0aWYgKGNvbmZpZy5hdXRvKSB7XG5cdFx0XHRyZXR1cm4gcGxhY2VCb3R0b21PclRvcChwb3MsIHsuLi5jb25maWcsIG1vZGU6IFBvc2l0aW9uLmJvdHRvbSwgYXV0bzogZmFsc2V9KTtcblx0XHR9XG5cdFx0bGVmdCA9IGxlZnREaWZmID4gcmlnaHREaWZmID8gbGVmdERpZmYgOiBwb3MucmlnaHQ7XG5cdH1cblxuXHRpZiAoY29uZmlnLmNlbnRlcmluZykge1xuXHRcdHRvcCA9IHZlcnRpY2FsQ2VudGVyaW5nKHBvcywgY29uZmlnLmhlaWdodCwgcmlnaHRCb3JkZXIpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGJvdHRvbURpZmYgPSBwb3MuYm90dG9tIC0gY29uZmlnLmhlaWdodDtcblx0XHRjb25zdCB0b3BEaWZmID0gYm90dG9tQm9yZGVyIC0gcG9zLnRvcCAtIGNvbmZpZy5oZWlnaHQ7XG5cblx0XHRpZiAodG9wRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSBwb3MudG9wO1xuXHRcdH0gZWxzZSBpZiAoYm90dG9tRGlmZiA+IDApIHtcblx0XHRcdHRvcCA9IGJvdHRvbURpZmY7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRvcCA9IGJvdHRvbURpZmYgPiB0b3BEaWZmICA/IGJvdHRvbURpZmYgOiBwb3MudG9wO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7bGVmdCwgdG9wfTtcbn0iLCJpZiAoRWxlbWVudCAmJiAhRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuXHRjb25zdCBwcm90byA9IChFbGVtZW50IGFzIGFueSkucHJvdG90eXBlO1xuXHRwcm90by5tYXRjaGVzID0gcHJvdG8ubWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0cHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8IHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG5cdFx0cHJvdG8ub01hdGNoZXNTZWxlY3RvciB8fCBwcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3I7XG59IiwiaW1wb3J0IHt1aWR9IGZyb20gXCIuL2NvcmVcIjtcbmltcG9ydCB7IHRvTm9kZSB9IGZyb20gXCIuL2h0bWxcIjtcblxuXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3e1xuXHRnZXRSb290VmlldygpOmFueTtcblx0cGFpbnQoKTp2b2lkO1xuXHRtb3VudChjb250YWluZXIsIHZub2RlKTtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIElWaWV3TGlrZXtcblx0bW91bnQ/KGNvbnRhaW5lciwgdm5vZGU/KTtcblx0Z2V0Um9vdFZpZXcoKTphbnk7XG59XG5cbmV4cG9ydCBjbGFzcyBWaWV3IHtcblx0cHVibGljIGNvbmZpZzogYW55O1xuXHRwcm90ZWN0ZWQgX2NvbnRhaW5lcjogYW55O1xuXHRwcm90ZWN0ZWQgX3VpZDogYW55O1xuXHRwcm90ZWN0ZWQgX2RvTm90UmVwYWludDogYm9vbGVhbjtcblx0cHJpdmF0ZSBfdmlldzphbnk7XG5cblx0Y29uc3RydWN0b3IoX2NvbnRhaW5lciwgY29uZmlnKXtcblx0XHR0aGlzLl91aWQgPSB1aWQoKTtcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblx0fVxuXG5cdHB1YmxpYyBtb3VudChjb250YWluZXIsIHZub2RlPyA6YW55KXtcblx0XHRpZiAodm5vZGUpe1xuXHRcdFx0dGhpcy5fdmlldyA9IHZub2RlO1xuXHRcdH1cblx0XHRpZiAoY29udGFpbmVyICYmIHRoaXMuX3ZpZXcgJiYgdGhpcy5fdmlldy5tb3VudCkge1xuXHRcdFx0Ly8gaW5pdCB2aWV3IGluc2lkZSBvZiBIVE1MIGNvbnRhaW5lclxuXHRcdFx0dGhpcy5fY29udGFpbmVyID0gdG9Ob2RlKGNvbnRhaW5lcik7XG5cdFx0XHRpZiAodGhpcy5fY29udGFpbmVyLnRhZ05hbWUpe1xuXHRcdFx0XHR0aGlzLl92aWV3Lm1vdW50KHRoaXMuX2NvbnRhaW5lcik7XG5cdFx0XHR9IGVsc2UgaWYgKHRoaXMuX2NvbnRhaW5lci5hdHRhY2gpe1xuXHRcdFx0XHR0aGlzLl9jb250YWluZXIuYXR0YWNoKHRoaXMpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyB1bm1vdW50KCkge1xuXHRcdGNvbnN0IHJvb3RWaWV3ID0gdGhpcy5nZXRSb290VmlldygpO1xuXHRcdGlmIChyb290VmlldyAmJiByb290Vmlldy5ub2RlKSB7XG5cdFx0XHRyb290Vmlldy51bm1vdW50KCk7XG5cdFx0XHR0aGlzLl92aWV3ID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgZ2V0Um9vdFZpZXcoKXtcblx0XHRyZXR1cm4gdGhpcy5fdmlldztcblx0fVxuXHRwdWJsaWMgZ2V0Um9vdE5vZGUoKTogSFRNTEVsZW1lbnQge1xuXHRcdHJldHVybiB0aGlzLl92aWV3ICYmIHRoaXMuX3ZpZXcubm9kZSAmJiB0aGlzLl92aWV3Lm5vZGUuZWw7XG5cdH1cblxuXHRwdWJsaWMgcGFpbnQoKXtcblx0XHRpZiAodGhpcy5fdmlldyAmJiAoLy8gd2FzIG1vdW50ZWRcblx0XHRcdHRoaXMuX3ZpZXcubm9kZSB8fCBcdC8vIGFscmVhZHkgcmVuZGVyZWQgbm9kZVxuXHRcdFx0dGhpcy5fY29udGFpbmVyKSl7IC8vIG5vdCByZW5kZXJlZCwgYnV0IGhhcyBjb250YWluZXJcblx0XHRcdHRoaXMuX2RvTm90UmVwYWludCA9IGZhbHNlO1xuXHRcdFx0dGhpcy5fdmlldy5yZWRyYXcoKTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvVmlld0xpa2Uodmlldykge1xuXHRyZXR1cm4ge1xuXHRcdGdldFJvb3RWaWV3OiAoKSA9PiB2aWV3LFxuXHRcdHBhaW50OiAoKSA9PiB2aWV3Lm5vZGUgJiYgdmlldy5yZWRyYXcoKSxcblx0XHRtb3VudDogY29udGFpbmVyID0+IHZpZXcubW91bnQoY29udGFpbmVyKVxuXHR9O1xufSIsImV4cG9ydCAqIGZyb20gXCIuL3NvdXJjZXMvTGF5b3V0XCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3R5cGVzXCI7IiwiaW1wb3J0IHt1aWQsIGV4dGVuZCwgaXNEZWZpbmVkfSBmcm9tIFwiQGRoeC90cy1jb21tb24vY29yZVwiO1xuaW1wb3J0IHtlbCwgaW5qZWN0fSBmcm9tIFwiQGRoeC90cy1jb21tb24vZG9tXCI7XG5pbXBvcnQge0lWaWV3TGlrZSwgVmlldywgSVZpZXd9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi92aWV3XCI7XG5cbmltcG9ydCB7SUNlbGwsIElDZWxsQ29uZmlnLCBJTGF5b3V0LCBJVmlld0ZuLCBJVmlld0NvbnN0cnVjdG9yfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5lbnVtIHJlc2l6ZU1vZGUge1xuXHR1bmtub3duLFxuXHRwZXJjZW50cyxcblx0cGl4ZWxzLFxuXHRtaXhlZHB4MSxcblx0bWl4ZWRweDIsXG5cdG1peGVkcGVyYzEsXG5cdG1peGVkcGVyYzJcbn1cblxuZnVuY3Rpb24gZ2V0UmVzaXplTW9kZShkaXIsIGNvbmYxLCBjb25mMikge1xuXHRjb25zdCBmaWVsZCA9IGRpciA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCI7XG5cblx0Y29uc3QgaXMxcGVyYyA9IGNvbmYxW2ZpZWxkXSAmJiBjb25mMVtmaWVsZF0uaW5kZXhPZihcIiVcIikgIT09IC0xO1xuXHRjb25zdCBpczJwZXJjID0gY29uZjJbZmllbGRdICYmIGNvbmYyW2ZpZWxkXS5pbmRleE9mKFwiJVwiKSAhPT0gLTE7XG5cdGNvbnN0IGlzMXB4ID0gY29uZjFbZmllbGRdICYmIGNvbmYxW2ZpZWxkXS5pbmRleE9mKFwicHhcIikgIT09IC0xO1xuXHRjb25zdCBpczJweCA9IGNvbmYyW2ZpZWxkXSAmJiBjb25mMltmaWVsZF0uaW5kZXhPZihcInB4XCIpICE9PSAtMTtcblxuXHRpZiAoaXMxcGVyYyAmJiBpczJwZXJjKSB7XG5cdFx0cmV0dXJuIHJlc2l6ZU1vZGUucGVyY2VudHM7XG5cdH1cblx0aWYgKGlzMXB4ICYmIGlzMnB4KSB7XG5cdFx0cmV0dXJuIHJlc2l6ZU1vZGUucGl4ZWxzO1xuXHR9XG5cdGlmIChpczFweCAmJiAhaXMycHgpIHtcblx0XHRyZXR1cm4gcmVzaXplTW9kZS5taXhlZHB4MTtcblx0fVxuXHRpZiAoaXMycHggJiYgIWlzMXB4KSB7XG5cdFx0cmV0dXJuIHJlc2l6ZU1vZGUubWl4ZWRweDI7XG5cdH1cblx0aWYgKGlzMXBlcmMpIHtcblx0XHRyZXR1cm4gcmVzaXplTW9kZS5taXhlZHBlcmMxO1xuXHR9XG5cdGlmIChpczJwZXJjKSB7XG5cdFx0cmV0dXJuIHJlc2l6ZU1vZGUubWl4ZWRwZXJjMjtcblx0fVxuXHRyZXR1cm4gcmVzaXplTW9kZS51bmtub3duO1xufVxuXG5mdW5jdGlvbiBnZXRCbG9ja1JhbmdlKGJsb2NrMTogQ2xpZW50UmVjdCwgYmxvY2syOiBDbGllbnRSZWN0LCBpc1hMYXlvdXQgPSB0cnVlKSB7XG5cdGlmIChpc1hMYXlvdXQpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bWluOiBibG9jazEubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRcdG1heDogYmxvY2syLnJpZ2h0ICsgd2luZG93LnBhZ2VYT2Zmc2V0XG5cdFx0fTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdG1pbjogYmxvY2sxLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcblx0XHRtYXg6IGJsb2NrMi5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXRcblx0fTtcbn1cblxuZXhwb3J0IGNsYXNzIENlbGwgZXh0ZW5kcyBWaWV3IGltcGxlbWVudHMgSUNlbGx7XG5cdHB1YmxpYyBpZDogc3RyaW5nO1xuXHRwdWJsaWMgY29uZmlnOiBJQ2VsbENvbmZpZztcblxuXHRwcm90ZWN0ZWQgX2hhbmRsZXJzO1xuXG5cdC8vIEZJWE1FXG5cdC8vIGFjdHVhbGx5LCBmb3IgTGF5b3V0IHBhcmVudCBjYW4gYmUgSUNlbGwgYXMgd2VsbFxuXHRwcml2YXRlIF9wYXJlbnQ6IElMYXlvdXQ7XG5cdHByaXZhdGUgX3VpOiBJVmlld0xpa2U7XG5cblx0cHJpdmF0ZSBfcmVzaXplckhhbmRsZXJzOiBhbnk7XG5cblx0Y29uc3RydWN0b3IocGFyZW50OiBzdHJpbmd8SFRNTEVsZW1lbnR8SUxheW91dCwgY29uZmlnOiBJQ2VsbENvbmZpZykgeyAvLyBhc0NoaWxkIGZvciBkZXRlY3QgcGFyZW50IG9iamVjdFxuXHRcdHN1cGVyKHBhcmVudCwgZXh0ZW5kKHtncmF2aXR5OiB0cnVlfSwgY29uZmlnKSk7XG5cblx0XHRjb25zdCBwID0gcGFyZW50IGFzIElMYXlvdXQ7XG5cdFx0aWYgKHAgJiYgcC5pc1Zpc2libGUpe1xuXHRcdFx0dGhpcy5fcGFyZW50ID0gcDtcblx0XHR9XG5cblx0XHR0aGlzLmNvbmZpZy5mdWxsID0gdGhpcy5jb25maWcuZnVsbCA9PT0gdW5kZWZpbmVkID8gQm9vbGVhbih0aGlzLmNvbmZpZy5oZWFkZXIgfHwgdGhpcy5jb25maWcuY29sbGFwc2FibGUpIDogdGhpcy5jb25maWcuZnVsbDtcblxuXHRcdHRoaXMuX2luaXRIYW5kbGVycygpO1xuXG5cdFx0dGhpcy5pZCA9IHRoaXMuY29uZmlnLmlkIHx8IHVpZCgpO1xuXG5cdH1cblx0cGFpbnQoKXtcblx0XHRpZiAodGhpcy5pc1Zpc2libGUoKSl7XG5cdFx0XHRjb25zdCB2aWV3ID0gdGhpcy5nZXRSb290VmlldygpO1xuXHRcdFx0aWYgKHZpZXcpe1xuXHRcdFx0XHR2aWV3LnJlZHJhdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fcGFyZW50LnBhaW50KCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGlzVmlzaWJsZSgpe1xuXHRcdC8vIHRvcCBsZXZlbCBub2RlXG5cdFx0aWYgKCF0aGlzLl9wYXJlbnQpe1xuXHRcdFx0aWYgKHRoaXMuX2NvbnRhaW5lciAmJiB0aGlzLl9jb250YWluZXIudGFnTmFtZSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBCb29sZWFuKHRoaXMuZ2V0Um9vdE5vZGUoKSk7XG5cdFx0fVxuXG5cdFx0Ly8gY2hlY2sgYWN0aXZlIHZpZXcgaW4gY2FzZSBvZiBtdWx0aXZpZXdcblx0XHRjb25zdCBhY3RpdmUgPSB0aGlzLl9wYXJlbnQuY29uZmlnLmFjdGl2ZVZpZXc7XG5cdFx0aWYgKGFjdGl2ZSAmJiBhY3RpdmUgIT09IHRoaXMuaWQpe1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGNoZWNrIHRoYXQgYWxsIHBhcmVudHMgb2YgdGhlIGNlbGwgYXJlIHZpc2libGUgYXMgd2VsbFxuXHRcdHJldHVybiAhdGhpcy5jb25maWcuaGlkZGVuICYmICghdGhpcy5fcGFyZW50IHx8IHRoaXMuX3BhcmVudC5pc1Zpc2libGUoKSk7XG5cdH1cblxuXHRoaWRlKCkge1xuXHRcdHRoaXMuY29uZmlnLmhpZGRlbiA9IHRydWU7XG5cdFx0aWYgKHRoaXMuX3BhcmVudCAmJiB0aGlzLl9wYXJlbnQucGFpbnQpIHtcblx0XHRcdHRoaXMuX3BhcmVudC5wYWludCgpO1xuXHRcdH1cblx0fVxuXG5cdHNob3coKXtcblx0XHRpZiAodGhpcy5fcGFyZW50ICYmIHRoaXMuX3BhcmVudC5jb25maWcuYWN0aXZlVmlldykge1xuXHRcdFx0dGhpcy5fcGFyZW50LmNvbmZpZy5hY3RpdmVWaWV3ID0gdGhpcy5pZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jb25maWcuaGlkZGVuID0gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX3BhcmVudCAmJiAhdGhpcy5fcGFyZW50LmlzVmlzaWJsZSgpKXtcblx0XHRcdHRoaXMuX3BhcmVudC5zaG93KCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5wYWludCgpO1xuXHR9XG5cblx0Z2V0UGFyZW50KCkge1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQ7XG5cdH1cblx0ZGVzdHJ1Y3RvcigpIHtcblx0XHR0aGlzLmNvbmZpZyA9IG51bGw7XG5cdFx0dGhpcy51bm1vdW50KCk7XG5cdH1cblx0Z2V0V2lkZ2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMuX3VpO1xuXHR9XG5cdGdldENlbGxWaWV3KCkge1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQgJiYgdGhpcy5fcGFyZW50LmdldFJlZnModGhpcy5fdWlkKTtcblx0fVxuXHRhdHRhY2gobmFtZTogYW55LCBjb25maWc/OiBhbnkpOiBJVmlld0xpa2Uge1xuXHRcdHRoaXMuY29uZmlnLmh0bWwgPSBudWxsO1xuXHRcdGlmICh0eXBlb2YgbmFtZSA9PT0gXCJvYmplY3RcIil7XG5cdFx0XHR0aGlzLl91aSA9IG5hbWU7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIil7XG5cdFx0XHR0aGlzLl91aSA9IG5ldyAod2luZG93IGFzIGFueSkuZGh4W25hbWVdKG51bGwsIGNvbmZpZyk7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiKXtcblx0XHRcdGlmIChuYW1lLnByb3RvdHlwZSBpbnN0YW5jZW9mIFZpZXcpe1xuXHRcdFx0XHR0aGlzLl91aSA9IG5ldyBuYW1lKG51bGwsIGNvbmZpZyk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl91aSA9IHtcblx0XHRcdFx0XHRnZXRSb290Vmlldygpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5hbWUoY29uZmlnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5wYWludCgpO1xuXHRcdHJldHVybiB0aGlzLl91aTtcblx0fVxuXHRhdHRhY2hIVE1MKGh0bWw6IHN0cmluZyk6IHZvaWQge1xuXHRcdHRoaXMuY29uZmlnLmh0bWwgPSBodG1sO1xuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXHR0b1ZET00obm9kZXM/OiBhbnlbXSl7XG5cdFx0Y29uc3QgY29uZiA9IHRoaXMuY29uZmlnO1xuXHRcdGlmKGNvbmYuaGlkZGVuKXtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3Qgc3R5bGUgPSB0aGlzLl9jYWxjdWxhdGVTdHlsZSgpO1xuXHRcdGNvbnN0IHN0eWxlUGFkZGluZyA9IGlzRGVmaW5lZCh0aGlzLmNvbmZpZy5wYWRkaW5nKSA/IHtwYWRkaW5nOiB0aGlzLmNvbmZpZy5wYWRkaW5nfSA6IHt9O1xuXHRcdGxldCBraWRzO1xuXHRcdGlmICghdGhpcy5jb25maWcuaHRtbCl7XG5cdFx0XHRpZiAodGhpcy5fdWkpe1xuXHRcdFx0XHRsZXQgdmlldyA9IHRoaXMuX3VpLmdldFJvb3RWaWV3KCk7XG5cdFx0XHRcdGlmICh2aWV3LnJlbmRlcikge1xuXHRcdFx0XHRcdHZpZXcgPSBpbmplY3Qodmlldyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0a2lkcyA9IFsgdmlldyBdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2lkcyA9IG5vZGVzIHx8IG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgcmVzaXplciA9IHRoaXMuY29uZmlnLnJlc2l6YWJsZSAmJiAhdGhpcy5faXNMYXN0Q2VsbCgpICYmICF0aGlzLmNvbmZpZy5jb2xsYXBzZWQgP1xuXHRcdFx0ZWwoXCIuZGh4X2xheW91dC1yZXNpemVyLlwiICsgKHRoaXMuX2lzWERpcmVjdGlvbigpID8gXCJkaHhfbGF5b3V0LXJlc2l6ZXItLXhcIiA6IFwiZGh4X2xheW91dC1yZXNpemVyLS15XCIpLCB7XG5cdFx0XHRcdC4uLnRoaXMuX3Jlc2l6ZXJIYW5kbGVycyxcblx0XHRcdFx0X3JlZjogXCJyZXNpemVyX1wiICsgdGhpcy5fdWlkXG5cdFx0XHR9LCBbIGVsKFwic3Bhbi5kaHhfbGF5b3V0LXJlc2l6ZXJfX2ljb25cIiwge1xuXHRcdFx0XHRjbGFzczogXCJkeGkgXCIgKyAodGhpcy5faXNYRGlyZWN0aW9uKCkgPyBcImR4aS1kb3RzLXZlcnRpY2FsXCIgOiBcImR4aS1kb3RzLWhvcml6b250YWxcIilcblx0XHRcdH0pIF0pIDogbnVsbDtcblxuXHRcdGNvbnN0IGhhbmRsZXJzID0ge307XG5cdFx0aWYgKHRoaXMuY29uZmlnLm9uKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmNvbmZpZy5vbikge1xuXHRcdFx0XHRoYW5kbGVyc1tcIm9uXCIgKyBrZXldID0gdGhpcy5jb25maWcub25ba2V5XTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3QgY2VsbCA9IGVsKFxuXHRcdFx0XCJkaXZcIixcblx0XHRcdHtcblx0XHRcdFx0X2tleTogdGhpcy5fdWlkLFxuXHRcdFx0XHRzdHlsZTogdGhpcy5jb25maWcuZnVsbCB8fCB0aGlzLmNvbmZpZy5odG1sID8gc3R5bGUgOiB7Li4uc3R5bGUsIC4uLnN0eWxlUGFkZGluZ30sXG5cdFx0XHRcdF9yZWY6IHRoaXMuX3VpZCxcblx0XHRcdFx0W1wiYXJpYS1sYWJlbGxlZGJ5XCJdOiB0aGlzLmNvbmZpZy5pZCA/IFwidGFiLWNvbnRlbnQtXCIgKyB0aGlzLmNvbmZpZy5pZCA6IG51bGwsXG5cdFx0XHRcdC4uLmhhbmRsZXJzLFxuXHRcdFx0XHRjbGFzczogdGhpcy5fZ2V0Q3NzKGZhbHNlKSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5jc3MgPyBcIiBcIiArIHRoaXMuY29uZmlnLmNzcyA6IFwiXCIpICtcblx0XHRcdFx0KHRoaXMuY29uZmlnLmNvbGxhcHNlZCA/IFwiIGRoeF9sYXlvdXQtY2VsbC0tY29sbGFwc2VkXCIgOiBcIlwiKSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5yZXNpemFibGUgPyBcIiBkaHhfbGF5b3V0LWNlbGwtLXJlc2l6ZWJsZVwiIDogXCJcIikgK1xuXHRcdFx0XHQvLyAg0YLQvtC70YzQutC+INC00LvRjyDRgdC10LvQvtCyXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5ncmF2aXR5ID8gXCIgZGh4X2xheW91dC1jZWxsLS1ncmF2aXR5XCIgOiBcIlwiKSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5pc0FjY29yZGlvbiA/IFwiIGRoeF9sYXlvdXQtY2VsbC0tYWNjb3JkaW9uXCIgOiBcIlwiKSxcblx0XHRcdH0sXG5cdFx0XHR0aGlzLmNvbmZpZy5mdWxsID8gW1xuXHRcdFx0XHRlbChcImRpdlwiLCB7XG5cdFx0XHRcdFx0dGFiaW5kZXg6IHRoaXMuY29uZmlnLmNvbGxhcHNhYmxlID8gXCIwXCIgOiBcIi0xXCIsXG5cdFx0XHRcdFx0Y2xhc3M6XCJkaHhfbGF5b3V0LWNlbGwtaGVhZGVyXCIgK1xuXHRcdFx0XHRcdCh0aGlzLl9pc1hEaXJlY3Rpb24oKSA/IFwiIGRoeF9sYXlvdXQtY2VsbC1oZWFkZXItLWNvbFwiIDogXCIgZGh4X2xheW91dC1jZWxsLWhlYWRlci0tcm93XCIpICtcblx0XHRcdFx0XHQodGhpcy5jb25maWcuY29sbGFwc2FibGUgPyBcIiBkaHhfbGF5b3V0LWNlbGwtaGVhZGVyLS1jb2xsYXBzZWJsZVwiIDogXCJcIikgK1xuXHRcdFx0XHRcdCh0aGlzLmNvbmZpZy5jb2xsYXBzZWQgPyBcIiBkaHhfbGF5b3V0LWNlbGwtaGVhZGVyLS1jb2xsYXBzZWRcIiA6IFwiXCIpICtcblx0XHRcdFx0XHQoKCh0aGlzLmdldFBhcmVudCgpIHx8IHt9IGFzIGFueSkuY29uZmlnIHx8IHt9IGFzIGFueSkuaXNBY2NvcmRpb24gPyBcIiBkaHhfbGF5b3V0LWNlbGwtaGVhZGVyLS1hY2NvcmRpb25cIiA6IFwiXCIpLFxuXHRcdFx0XHRcdG9uY2xpY2s6IHRoaXMuX2hhbmRsZXJzLmNvbGxhcHNlLFxuXHRcdFx0XHRcdG9ua2V5ZG93bjogdGhpcy5faGFuZGxlcnMuZW50ZXJDb2xsYXBzZVxuXHRcdFx0XHR9LCBbXG5cdFx0XHRcdFx0dGhpcy5jb25maWcuaGVhZGVySWNvbiAmJiBlbChcInNwYW4uZGh4X2xheW91dC1jZWxsLWhlYWRlcl9faWNvblwiICsgdGhpcy5jb25maWcuaGVhZGVySWNvbiksXG5cdFx0XHRcdFx0dGhpcy5jb25maWcuaGVhZGVySW1hZ2UgJiYgZWwoXCIuZGh4X2xheW91dC1jZWxsLWhlYWRlcl9faW1hZ2Utd3JhcHBlclwiLCBbXG5cdFx0XHRcdFx0XHRlbChcImltZ1wiLCB7XG5cdFx0XHRcdFx0XHRcdHNyYzogdGhpcy5jb25maWcuaGVhZGVySW1hZ2UsXG5cdFx0XHRcdFx0XHRcdGNsYXNzOiBcImRoeF9sYXlvdXQtY2VsbC1oZWFkZXJfX2ltYWdlXCIsXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdF0pLFxuXHRcdFx0XHRcdHRoaXMuY29uZmlnLmhlYWRlciAmJiBlbChcImgzLmRoeF9sYXlvdXQtY2VsbC1oZWFkZXJfX3RpdGxlXCIsIHRoaXMuY29uZmlnLmhlYWRlciksXG5cdFx0XHRcdFx0dGhpcy5jb25maWcuY29sbGFwc2FibGUgJiYgZWwoXCJkaXYuZGh4X2xheW91dC1jZWxsLWhlYWRlcl9fY29sbGFwc2UtaWNvblwiLCB7XG5cdFx0XHRcdFx0XHRjbGFzczogdGhpcy5fZ2V0Q29sbGFwc2VJY29uKClcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XSksXG5cdFx0XHRcdCF0aGlzLmNvbmZpZy5jb2xsYXBzZWQgPyBlbChcImRpdlwiLCB7XG5cdFx0XHRcdFx0XCJzdHlsZVwiOiB0aGlzLmNvbmZpZy5odG1sIHx8IG5vZGVzID8gc3R5bGVQYWRkaW5nIDogbnVsbCxcblx0XHRcdFx0XHRcIi5pbm5lckhUTUxcIiA6IHRoaXMuY29uZmlnLmh0bWwsXG5cdFx0XHRcdFx0XCJjbGFzc1wiOiB0aGlzLl9nZXRDc3ModHJ1ZSkgKyBcIiBkaHhfbGF5b3V0LWNlbGwtY29udGVudFwiLFxuXHRcdFx0XHR9LCBraWRzKSA6IG51bGxcblx0XHRcdF0gOiAodGhpcy5jb25maWcuaHRtbCA/IFtcblx0XHRcdFx0ZWwoXCIuZGh4X2xheW91dC1jZWxsLWNvbnRlbnRcIiwge1xuXHRcdFx0XHRcdFwiLmlubmVySFRNTFwiIDogdGhpcy5jb25maWcuaHRtbCxcblx0XHRcdFx0XHRcInN0eWxlXCI6IHN0eWxlUGFkZGluZyxcblx0XHRcdFx0fSlcblx0XHRcdF0gOiBraWRzKVxuXHRcdCk7XG5cblx0XHRyZXR1cm4gcmVzaXplciA/IFtcblx0XHRcdGNlbGwsXG5cdFx0XHRyZXNpemVyXG5cdFx0XSA6IGNlbGw7XG5cdH1cblx0cHJvdGVjdGVkIF9nZXRDc3MoX2NvbnRlbnQ/OiBib29sZWFuKSB7XG5cdFx0cmV0dXJuIFwiZGh4X2xheW91dC1jZWxsXCI7XG5cdH1cblx0cHJvdGVjdGVkIF9pbml0SGFuZGxlcnMoKSB7XG5cdFx0Y29uc3QgYmxvY2tPcHRzID0ge1xuXHRcdFx0bGVmdDogbnVsbCxcblx0XHRcdHRvcDogbnVsbCxcblx0XHRcdGlzQWN0aXZlOiBmYWxzZSxcblx0XHRcdHJhbmdlOiBudWxsLFxuXHRcdFx0eExheW91dDogbnVsbCxcblx0XHRcdG5leHRDZWxsOiBudWxsLFxuXHRcdFx0c2l6ZTogbnVsbCxcblx0XHRcdHJlc2l6ZXJMZW5ndGg6IG51bGwsXG5cdFx0XHRtb2RlOiBudWxsLFxuXHRcdFx0cGVyY2VudHN1bTogbnVsbFxuXHRcdH07XG5cdFx0Y29uc3QgbW91c2VVcCA9ICgpID0+IHtcblx0XHRcdGJsb2NrT3B0cy5pc0FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiZGh4X25vLXNlbGVjdC0tcmVzaXplXCIpO1xuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZSk7XG5cdFx0fTtcblx0XHRjb25zdCBtb3VzZU1vdmUgPSBlID0+IHtcblx0XHRcdGlmICghYmxvY2tPcHRzLmlzQWN0aXZlIHx8IGJsb2NrT3B0cy5tb2RlID09PSByZXNpemVNb2RlLnVua25vd24pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0bGV0IG5ld1ZhbHVlID0gYmxvY2tPcHRzLnhMYXlvdXQgPyBlLnggLSBibG9ja09wdHMucmFuZ2UubWluIC0gd2luZG93LnBhZ2VYT2Zmc2V0IDpcblx0XHRcdFx0ZS55IC0gYmxvY2tPcHRzLnJhbmdlLm1pbiAtIHdpbmRvdy5wYWdlWU9mZnNldDtcblx0XHRcdGNvbnN0IHByb3AgPSBibG9ja09wdHMueExheW91dCA/IFwid2lkdGhcIiA6IFwiaGVpZ2h0XCI7XG5cdFx0XHRpZiAobmV3VmFsdWUgPCAwKSB7XG5cdFx0XHRcdG5ld1ZhbHVlID0gYmxvY2tPcHRzLnJlc2l6ZXJMZW5ndGggLyAyO1xuXHRcdFx0fSBlbHNlIGlmIChuZXdWYWx1ZSA+IGJsb2NrT3B0cy5zaXplKSB7XG5cdFx0XHRcdG5ld1ZhbHVlID0gYmxvY2tPcHRzLnNpemUgLSBibG9ja09wdHMucmVzaXplckxlbmd0aDtcblx0XHRcdH1cblxuXHRcdFx0c3dpdGNoKGJsb2NrT3B0cy5tb2RlKSB7XG5cdFx0XHRcdGNhc2UgcmVzaXplTW9kZS5waXhlbHM6XG5cdFx0XHRcdFx0dGhpcy5jb25maWdbcHJvcF0gPSBuZXdWYWx1ZSAtIGJsb2NrT3B0cy5yZXNpemVyTGVuZ3RoIC8gMiArIFwicHhcIjtcblx0XHRcdFx0XHRibG9ja09wdHMubmV4dENlbGwuY29uZmlnW3Byb3BdID0gYmxvY2tPcHRzLnNpemUgLSBuZXdWYWx1ZSAtIGJsb2NrT3B0cy5yZXNpemVyTGVuZ3RoIC8gMiArIFwicHhcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSByZXNpemVNb2RlLm1peGVkcHgxOlxuXHRcdFx0XHRcdHRoaXMuY29uZmlnW3Byb3BdID0gbmV3VmFsdWUgLSBibG9ja09wdHMucmVzaXplckxlbmd0aCAvIDIgKyBcInB4XCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgcmVzaXplTW9kZS5taXhlZHB4Mjpcblx0XHRcdFx0XHRibG9ja09wdHMubmV4dENlbGwuY29uZmlnW3Byb3BdID0gYmxvY2tPcHRzLnNpemUgLSBuZXdWYWx1ZSAtIGJsb2NrT3B0cy5yZXNpemVyTGVuZ3RoIC8gMiArIFwicHhcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSByZXNpemVNb2RlLnBlcmNlbnRzOlxuXHRcdFx0XHRcdHRoaXMuY29uZmlnW3Byb3BdID0gbmV3VmFsdWUgLyBibG9ja09wdHMuc2l6ZSAqIGJsb2NrT3B0cy5wZXJjZW50c3VtICsgXCIlXCI7XG5cdFx0XHRcdFx0YmxvY2tPcHRzLm5leHRDZWxsLmNvbmZpZ1twcm9wXSA9IChibG9ja09wdHMuc2l6ZSAtIG5ld1ZhbHVlKSAvIGJsb2NrT3B0cy5zaXplICogYmxvY2tPcHRzLnBlcmNlbnRzdW0gKyBcIiVcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSByZXNpemVNb2RlLm1peGVkcGVyYzE6XG5cdFx0XHRcdFx0dGhpcy5jb25maWdbcHJvcF0gPSBuZXdWYWx1ZSAvIGJsb2NrT3B0cy5zaXplICogYmxvY2tPcHRzLnBlcmNlbnRzdW0gKyBcIiVcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSByZXNpemVNb2RlLm1peGVkcGVyYzI6XG5cdFx0XHRcdFx0YmxvY2tPcHRzLm5leHRDZWxsLmNvbmZpZ1twcm9wXSA9IChibG9ja09wdHMuc2l6ZSAtIG5ld1ZhbHVlKSAvIGJsb2NrT3B0cy5zaXplICogYmxvY2tPcHRzLnBlcmNlbnRzdW0gKyBcIiVcIjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdHRoaXMucGFpbnQoKTtcblx0XHR9O1xuXHRcdHRoaXMuX2hhbmRsZXJzID0ge1xuXHRcdFx0ZW50ZXJDb2xsYXBzZTogKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcblx0XHRcdFx0XHR0aGlzLl9oYW5kbGVycy5jb2xsYXBzZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXHRcdFx0Y29sbGFwc2U6ICgpID0+IHtcblx0XHRcdFx0aWYgKCF0aGlzLmNvbmZpZy5jb2xsYXBzYWJsZSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmNvbmZpZy5jb2xsYXBzZWQgPSAhdGhpcy5jb25maWcuY29sbGFwc2VkO1xuXHRcdFx0XHR0aGlzLnBhaW50KCk7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLl9yZXNpemVySGFuZGxlcnMgPSB7XG5cdFx0XHRvbm1vdXNlZG93bjogKGUpID0+IHtcblx0XHRcdFx0aWYgKGUud2hpY2ggPT09IDMpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJsb2NrT3B0cy5pc0FjdGl2ZSkge1xuXHRcdFx0XHRcdG1vdXNlVXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJkaHhfbm8tc2VsZWN0LS1yZXNpemVcIik7XG5cblx0XHRcdFx0Y29uc3QgYmxvY2sgPSB0aGlzLmdldENlbGxWaWV3KCk7XG5cdFx0XHRcdGNvbnN0IG5leHRDZWxsID0gdGhpcy5fZ2V0TmV4dENlbGwoKTtcblx0XHRcdFx0Y29uc3QgbmV4dEJsb2NrID0gbmV4dENlbGwuZ2V0Q2VsbFZpZXcoKTtcblx0XHRcdFx0Y29uc3QgcmVzaXplckJsb2NrID0gdGhpcy5fZ2V0UmVzaXplclZpZXcoKTtcblx0XHRcdFx0Y29uc3QgYmxvY2tPZmZzZXRzID0gYmxvY2suZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdGNvbnN0IHJlc2l6ZXJPZmZzZXRzID0gcmVzaXplckJsb2NrLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdFx0XHRjb25zdCBuZXh0QmxvY2tPZmZzZXRzID0gbmV4dEJsb2NrLmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG5cdFx0XHRcdGJsb2NrT3B0cy54TGF5b3V0ID0gdGhpcy5faXNYRGlyZWN0aW9uKCk7XG5cblx0XHRcdFx0YmxvY2tPcHRzLmxlZnQgPSBibG9ja09mZnNldHMubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldDtcblx0XHRcdFx0YmxvY2tPcHRzLnRvcCA9IGJsb2NrT2Zmc2V0cy50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cblx0XHRcdFx0YmxvY2tPcHRzLnJhbmdlID0gZ2V0QmxvY2tSYW5nZShibG9ja09mZnNldHMsIG5leHRCbG9ja09mZnNldHMsIGJsb2NrT3B0cy54TGF5b3V0KTtcblx0XHRcdFx0YmxvY2tPcHRzLnNpemUgPSBibG9ja09wdHMucmFuZ2UubWF4IC0gYmxvY2tPcHRzLnJhbmdlLm1pbjtcblx0XHRcdFx0YmxvY2tPcHRzLmlzQWN0aXZlID0gdHJ1ZTtcblx0XHRcdFx0YmxvY2tPcHRzLm5leHRDZWxsID0gbmV4dENlbGw7XG5cdFx0XHRcdGJsb2NrT3B0cy5yZXNpemVyTGVuZ3RoID0gYmxvY2tPcHRzLnhMYXlvdXQgPyByZXNpemVyT2Zmc2V0cy53aWR0aCA6IHJlc2l6ZXJPZmZzZXRzLmhlaWdodDtcblxuXHRcdFx0XHRibG9ja09wdHMubW9kZSA9IGdldFJlc2l6ZU1vZGUoYmxvY2tPcHRzLnhMYXlvdXQsIHRoaXMuY29uZmlnLCBuZXh0Q2VsbC5jb25maWcpO1xuXHRcdFx0XHRpZiAoYmxvY2tPcHRzLm1vZGUgPT09IHJlc2l6ZU1vZGUucGVyY2VudHMpIHtcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGJsb2NrT3B0cy54TGF5b3V0ID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIjtcblx0XHRcdFx0XHRibG9ja09wdHMucGVyY2VudHN1bSA9IHBhcnNlRmxvYXQodGhpcy5jb25maWdbZmllbGRdKSArIHBhcnNlRmxvYXQobmV4dENlbGwuY29uZmlnW2ZpZWxkXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJsb2NrT3B0cy5tb2RlID09PSByZXNpemVNb2RlLm1peGVkcGVyYzEpIHtcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGJsb2NrT3B0cy54TGF5b3V0ID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIjtcblx0XHRcdFx0XHRibG9ja09wdHMucGVyY2VudHN1bSA9IDEgLyAoYmxvY2tPZmZzZXRzW2ZpZWxkXSAvIChibG9ja09wdHMuc2l6ZSAtIGJsb2NrT3B0cy5yZXNpemVyTGVuZ3RoKSkgKiBwYXJzZUZsb2F0KHRoaXMuY29uZmlnW2ZpZWxkXSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGJsb2NrT3B0cy5tb2RlID09PSByZXNpemVNb2RlLm1peGVkcGVyYzIpIHtcblx0XHRcdFx0XHRjb25zdCBmaWVsZCA9IGJsb2NrT3B0cy54TGF5b3V0ID8gXCJ3aWR0aFwiIDogXCJoZWlnaHRcIjtcblx0XHRcdFx0XHRibG9ja09wdHMucGVyY2VudHN1bSA9IDEgLyAobmV4dEJsb2NrT2Zmc2V0c1tmaWVsZF0gLyAoYmxvY2tPcHRzLnNpemUgLSBibG9ja09wdHMucmVzaXplckxlbmd0aCkpICogcGFyc2VGbG9hdChuZXh0Q2VsbC5jb25maWdbZmllbGRdKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZSk7XG5cdFx0XHR9LFxuXHRcdFx0b25kcmFnc3RhcnQ6IGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0fTtcblx0fVxuXHRwcml2YXRlIF9nZXRDb2xsYXBzZUljb24oKSB7XG5cdFx0aWYgKHRoaXMuX2lzWERpcmVjdGlvbigpICYmIHRoaXMuY29uZmlnLmNvbGxhcHNlZCkge1xuXHRcdFx0cmV0dXJuIFwiZHhpIGR4aS1jaGV2cm9uLXJpZ2h0XCI7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9pc1hEaXJlY3Rpb24oKSAmJiAhdGhpcy5jb25maWcuY29sbGFwc2VkKSB7XG5cdFx0XHRyZXR1cm4gXCJkeGkgZHhpLWNoZXZyb24tbGVmdFwiO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuX2lzWERpcmVjdGlvbigpICYmIHRoaXMuY29uZmlnLmNvbGxhcHNlZCkge1xuXHRcdFx0cmV0dXJuIFwiZHhpIGR4aS1jaGV2cm9uLXVwXCI7XG5cdFx0fVxuXHRcdGlmICghdGhpcy5faXNYRGlyZWN0aW9uKCkgJiYgIXRoaXMuY29uZmlnLmNvbGxhcHNlZCkge1xuXHRcdFx0cmV0dXJuIFwiZHhpIGR4aS1jaGV2cm9uLWRvd25cIjtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfaXNMYXN0Q2VsbCgpIHtcblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLl9wYXJlbnQgYXMgYW55O1xuXHRcdHJldHVybiBwYXJlbnQgJiYgcGFyZW50Ll9jZWxscy5pbmRleE9mKHRoaXMpID09PSBwYXJlbnQuX2NlbGxzLmxlbmd0aCAtIDE7XG5cdH1cblx0cHJpdmF0ZSBfZ2V0TmV4dENlbGwoKSB7XG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5fcGFyZW50IGFzIGFueTtcblx0XHRjb25zdCBpbmRleCA9IHBhcmVudC5fY2VsbHMuaW5kZXhPZih0aGlzKTtcblx0XHRyZXR1cm4gcGFyZW50Ll9jZWxsc1tpbmRleCArIDFdO1xuXHR9XG5cdHByaXZhdGUgX2dldFJlc2l6ZXJWaWV3KCkge1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQuZ2V0UmVmcyhcInJlc2l6ZXJfXCIgKyB0aGlzLl91aWQpO1xuXHR9XG5cdHByaXZhdGUgX2lzWERpcmVjdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50ICYmICh0aGlzLl9wYXJlbnQgYXMgYW55KS5feExheW91dDtcblx0fVxuXHRwcml2YXRlIF9jYWxjdWxhdGVTdHlsZSgpIHtcblx0XHRjb25zdCBjb25maWcgPSB0aGlzLmNvbmZpZztcblx0XHRjb25zdCBzdHlsZTogYW55ID0ge307XG5cblx0XHRpZiAodGhpcy5faXNYRGlyZWN0aW9uKCkpIHtcblx0XHRcdGlmIChjb25maWcud2lkdGggIT09IHVuZGVmaW5lZCAmJiAhY29uZmlnLmNvbGxhcHNlZCkge1xuXHRcdFx0XHRzdHlsZS5mbGV4QmFzaXMgPSBjb25maWcud2lkdGg7XG5cdFx0XHRcdHN0eWxlLndpZHRoID0gY29uZmlnLndpZHRoO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGNvbmZpZy5oZWlnaHQgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdHN0eWxlLmhlaWdodCA9IGNvbmZpZy5oZWlnaHQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmIChjb25maWcuaGVpZ2h0ICE9PSB1bmRlZmluZWQgJiYgIWNvbmZpZy5jb2xsYXBzZWQpIHtcblx0XHRcdFx0c3R5bGUuZmxleEJhc2lzID0gY29uZmlnLmhlaWdodDtcblx0XHRcdFx0c3R5bGUuaGVpZ2h0ID0gY29uZmlnLmhlaWdodDtcblx0XHRcdH1cblx0XHRcdGlmIChjb25maWcud2lkdGggIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRcdHN0eWxlLndpZHRoID0gY29uZmlnLndpZHRoO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBpZiAoY29uZmlnLnBhZGRpbmcpIHtcblx0XHQvLyBcdHN0eWxlLnBhZGRpbmcgPSBjb25maWcucGFkZGluZztcblx0XHQvLyB9XG5cdFx0cmV0dXJuIHN0eWxlO1xuXHR9XG59IiwiaW1wb3J0IHtDZWxsfSBmcm9tIFwiLi9DZWxsXCI7XG5pbXBvcnQge0lDZWxsLCBJQ2VsbENvbmZpZywgSUxheW91dCwgSUxheW91dENvbmZpZ30gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHtjcmVhdGV9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcblxuZXhwb3J0IGNsYXNzIExheW91dCBleHRlbmRzIENlbGwgaW1wbGVtZW50cyBJTGF5b3V0e1xuXHRwdWJsaWMgY29uZmlnOiBJTGF5b3V0Q29uZmlnO1xuXHRwcm90ZWN0ZWQgX2FsbDtcblx0cHJvdGVjdGVkIF9jZWxsczogSUNlbGxbXTtcdFx0XHRcdFx0Ly8gY2VsbHNcblxuXHRwcml2YXRlIF94TGF5b3V0OiBib29sZWFuO1x0XHRcdFx0XHQvLyB2ZXJ0aWNhbCBvciBob3Jpem9udGFsIGxheW91dFxuXHRwcml2YXRlIF9yb290OiBJTGF5b3V0O1xuXG5cdHByaXZhdGUgX2lzVmlld0xheW91dDogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3RvcihwYXJlbnQ6IGFueSwgY29uZmlnOiBJTGF5b3V0Q29uZmlnKSB7XG5cdFx0c3VwZXIocGFyZW50LCBjb25maWcpO1xuXG5cdFx0Ly8gcm9vdCBsYXlvdXRcblx0XHR0aGlzLl9yb290ID0gdGhpcy5jb25maWcucGFyZW50IHx8IHRoaXM7XG5cblx0XHR0aGlzLl9hbGwgPSB7fTtcblx0XHR0aGlzLl9wYXJzZUNvbmZpZygpO1xuXG5cdFx0aWYgKCh0aGlzLmNvbmZpZyBhcyBJTGF5b3V0Q29uZmlnKS52aWV3cykge1xuXHRcdFx0dGhpcy5jb25maWcuYWN0aXZlVmlldyA9IHRoaXMuY29uZmlnLmFjdGl2ZVZpZXcgfHwgdGhpcy5fY2VsbHNbMF0uaWQ7XG5cdFx0XHR0aGlzLl9pc1ZpZXdMYXlvdXQgPSB0cnVlO1xuXHRcdH1cblx0XHRpZiAoIWNvbmZpZy5wYXJlbnQpe1xuXHRcdFx0Y29uc3QgdmlldyAgPSBjcmVhdGUoeyByZW5kZXI6ICgpID0+IHRoaXMudG9WRE9NKCkgfSwgdGhpcyk7XG5cdFx0XHR0aGlzLm1vdW50KHBhcmVudCwgdmlldyk7XG5cdFx0fVxuXHR9XG5cblx0Y2VsbChpZDogc3RyaW5nKSB7XG5cdFx0Ly8gRklYTUVcblx0XHRyZXR1cm4gKHRoaXMuX3Jvb3QgYXMgYW55KS5fYWxsW2lkXTtcblx0fVxuXHR0b1ZET00oKTogc3RyaW5nIHtcblx0XHRpZiAodGhpcy5faXNWaWV3TGF5b3V0KSB7XG5cdFx0XHRjb25zdCByb290cyA9IFsgdGhpcy5jZWxsKHRoaXMuY29uZmlnLmFjdGl2ZVZpZXcpLnRvVkRPTSgpIF07XG5cdFx0XHRyZXR1cm4gc3VwZXIudG9WRE9NKHJvb3RzKTtcblx0XHR9XG5cdFx0bGV0IG5vZGVzID0gW107XG5cdFx0dGhpcy5fY2VsbHMuZm9yRWFjaChjZWxsID0+IHtcblx0XHRcdGNvbnN0IG5vZGUgPSBjZWxsLnRvVkRPTSgpO1xuXHRcdFx0aWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcblx0XHRcdFx0bm9kZXMgPSBub2Rlcy5jb25jYXQobm9kZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRub2Rlcy5wdXNoKG5vZGUpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHJldHVybiBzdXBlci50b1ZET00obm9kZXMpO1xuXHR9XG5cdHJlbW92ZUNlbGwoaWQ6c3RyaW5nKSB7XG5cdFx0Y29uc3Qgcm9vdCA9ICh0aGlzLmNvbmZpZy5wYXJlbnQgfHwgdGhpcyk7XG5cdFx0aWYgKHJvb3QgIT09IHRoaXMpIHsgcmV0dXJuIHJvb3QucmVtb3ZlQ2VsbChpZCk7IH1cblxuXHRcdC8vIHRoaXMgPT09IHJvb3QgbGF5b3V0XG5cblx0XHRjb25zdCB2aWV3ID0gdGhpcy5jZWxsKGlkKTtcblx0XHRpZiAodmlldykge1xuXHRcdFx0Y29uc3QgcGFyZW50ID0gdmlldy5nZXRQYXJlbnQoKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9hbGxbaWRdO1xuXG5cdFx0XHRwYXJlbnQuX2NlbGxzID0gcGFyZW50Ll9jZWxscy5maWx0ZXIoKGNlbGw6IElDZWxsKSA9PiBjZWxsLmlkICE9PSBpZCk7XG5cdFx0XHRwYXJlbnQucGFpbnQoKTtcblx0XHR9XG5cdH1cblx0YWRkQ2VsbChjb25maWc6IElDZWxsQ29uZmlnLCBpbmRleDogbnVtYmVyID0gLTEpIHtcblx0XHRjb25zdCB2aWV3ID0gdGhpcy5fY3JlYXRlQ2VsbChjb25maWcpO1xuXG5cdFx0aWYgKGluZGV4IDwgMCkge1xuXHRcdFx0aW5kZXggPSB0aGlzLl9jZWxscy5sZW5ndGggKyBpbmRleCArIDE7XG5cdFx0fVxuXG5cdFx0dGhpcy5fY2VsbHMuc3BsaWNlKGluZGV4LCAwLCB2aWV3KTtcblxuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXHRnZXRJZChpbmRleDogbnVtYmVyKSB7XG5cdFx0aWYgKGluZGV4IDwgMCkge1xuXHRcdFx0aW5kZXggPSB0aGlzLl9jZWxscy5sZW5ndGggKyBpbmRleDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2NlbGxzW2luZGV4XSA/IHRoaXMuX2NlbGxzW2luZGV4XS5pZCA6IHVuZGVmaW5lZDtcblx0fVxuXHRnZXRSZWZzKG5hbWU6IHN0cmluZyl7XG5cdFx0cmV0dXJuIHRoaXMuX3Jvb3QuZ2V0Um9vdFZpZXcoKS5yZWZzW25hbWVdO1xuXHR9XG5cdHByb3RlY3RlZCBfZ2V0Q3NzKGNvbnRlbnQ/OiBib29sZWFuKSB7XG5cdFx0Y29uc3QgbGF5b3V0Q3NzID0gdGhpcy5feExheW91dCA/IFwiZGh4X2xheW91dC1jb2x1bW5zXCIgOiBcImRoeF9sYXlvdXQtcm93c1wiO1xuXHRcdGNvbnN0IGRpcmVjdGlvbkNzcyA9IHRoaXMuY29uZmlnLmFsaWduID8gXCIgXCIgKyBsYXlvdXRDc3MgKyBcIi0tXCIgKyB0aGlzLmNvbmZpZy5hbGlnbiA6IFwiXCI7XG5cdFx0aWYgKGNvbnRlbnQpIHtcblx0XHRcdHJldHVybiBsYXlvdXRDc3MgKyBcIiBkaHhfbGF5b3V0LWNlbGxcIiArICh0aGlzLmNvbmZpZy5hbGlnbiA/IFwiIGRoeF9sYXlvdXQtY2VsbC0tXCIgKyB0aGlzLmNvbmZpZy5hbGlnbiA6IFwiXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBjZWxsQ3NzID0gdGhpcy5jb25maWcucGFyZW50ID8gc3VwZXIuX2dldENzcygpIDogXCJkaHhfd2lkZ2V0IGRoeF9sYXlvdXRcIjtcblx0XHRcdGNvbnN0IGZ1bGxNb2RlQ3NzID0gdGhpcy5jb25maWcucGFyZW50ID8gXCJcIiA6IFwiIGRoeF9sYXlvdXQtY2VsbFwiO1xuXHRcdFx0cmV0dXJuIGNlbGxDc3MgICsgKHRoaXMuY29uZmlnLmZ1bGwgPyBmdWxsTW9kZUNzcyA6IFwiIFwiICsgbGF5b3V0Q3NzKSArIGRpcmVjdGlvbkNzcztcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfcGFyc2VDb25maWcoKSB7XG5cdFx0Y29uc3QgY29uZmlnID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgY2VsbHMgPSBjb25maWcucm93cyB8fCBjb25maWcuY29scyB8fCBjb25maWcudmlld3MgfHwgW107XG5cblx0XHR0aGlzLl94TGF5b3V0ID0gIWNvbmZpZy5yb3dzO1xuXHRcdHRoaXMuX2NlbGxzID0gY2VsbHMubWFwKGEgPT4gdGhpcy5fY3JlYXRlQ2VsbChhKSk7XG5cdH1cblx0cHJpdmF0ZSBfY3JlYXRlQ2VsbChjZWxsOiBJTGF5b3V0Q29uZmlnKTpJQ2VsbHtcblx0XHRsZXQgdmlldzpJQ2VsbDtcblx0XHRpZihjZWxsLnJvd3MgfHwgY2VsbC5jb2xzIHx8IGNlbGwudmlld3MpIHtcblx0XHRcdGNlbGwucGFyZW50ID0gdGhpcy5fcm9vdDtcblx0XHRcdHZpZXcgPSBuZXcgTGF5b3V0KHRoaXMsIGNlbGwpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2aWV3ID0gbmV3IENlbGwodGhpcywgY2VsbCk7XG5cdFx0fVxuXG5cdFx0Ly8gRkl4TUVcblx0XHQodGhpcy5fcm9vdCBhcyBhbnkpLl9hbGxbdmlldy5pZF0gPSB2aWV3O1xuXHRcdHJldHVybiB2aWV3O1xuXHR9XG59IiwiZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9Qb3B1cFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3R5cGVzXCI7IiwiaW1wb3J0IHsgZXh0ZW5kIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2NvcmVcIjtcbmltcG9ydCB7IGNyZWF0ZSwgZWwsIGluamVjdCwgVk5vZGUgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZG9tXCI7XG5pbXBvcnQgeyBFdmVudFN5c3RlbSwgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgZml0UG9zaXRpb24sIFBvc2l0aW9uLCB0b05vZGUgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vaHRtbFwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi92aWV3XCI7XG5pbXBvcnQgeyBJUG9wdXAsIElQb3B1cENvbmZpZywgUG9wdXBFdmVudHMsIElTaG93Q29uZmlnLCBJUG9wdXBFdmVudEhhbmRsZXJzTWFwIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuXG5leHBvcnQgY2xhc3MgUG9wdXAgZXh0ZW5kcyBWaWV3IGltcGxlbWVudHMgSVBvcHVwIHtcblx0cHVibGljIGNvbmZpZzogSVBvcHVwQ29uZmlnO1xuXHRwdWJsaWMgZXZlbnRzOiBJRXZlbnRTeXN0ZW08UG9wdXBFdmVudHMsIElQb3B1cEV2ZW50SGFuZGxlcnNNYXA+O1xuXG5cdHByaXZhdGUgX2h0bWw6IHN0cmluZztcblx0cHJpdmF0ZSBfdWk6IGFueTtcblxuXHRwcml2YXRlIF9wb3B1cDogSFRNTEVsZW1lbnQ7XG5cblx0cHJpdmF0ZSBfY2xpY2tFdmVudDogKGU6IEV2ZW50KSA9PiB2b2lkO1xuXG5cdHByaXZhdGUgX2lzQWN0aXZlOiBib29sZWFuO1xuXHRwcml2YXRlIF9vdXRlckNsaWNrRGVzdHJ1Y3RvcjogKCkgPT4gdm9pZDtcblxuXHRwcml2YXRlIF90aW1lb3V0OiBhbnk7XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBJUG9wdXBDb25maWcgPSB7fSkge1xuXHRcdHN1cGVyKG51bGwsIGV4dGVuZCh7fSwgY29uZmlnKSk7XG5cblx0XHRjb25zdCBwb3B1cCA9IHRoaXMuX3BvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwb3B1cC5jbGFzc05hbWUgPSBcImRoeF93aWRnZXQgZGh4X3BvcHVwXCIgKyAodGhpcy5jb25maWcuY3NzID8gXCIgXCIgKyB0aGlzLmNvbmZpZy5jc3MgOiBcIlwiKTtcblx0XHRwb3B1cC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuXG5cdFx0dGhpcy5tb3VudChwb3B1cCwgY3JlYXRlKHtcblx0XHRcdHJlbmRlcjogKCkgPT4gdGhpcy50b1ZET00oKVxuXHRcdH0pKTtcblxuXHRcdHRoaXMuX2NsaWNrRXZlbnQgPSBlID0+IHRoaXMuZXZlbnRzLmZpcmUoUG9wdXBFdmVudHMuY2xpY2ssIFtlXSk7XG5cblx0XHR0aGlzLmV2ZW50cyA9IGNvbmZpZy5ldmVudHMgfHwgbmV3IEV2ZW50U3lzdGVtPFBvcHVwRXZlbnRzPih0aGlzKTtcblx0XHR0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuXHR9XG5cdHNob3cobm9kZTogSFRNTEVsZW1lbnQsIGNvbmZpZzogSVNob3dDb25maWcgPSB7fSwgYXR0YWNoZWQ/OiBhbnkpIHtcblx0XHRpZiAoIXRoaXMuZXZlbnRzLmZpcmUoUG9wdXBFdmVudHMuYmVmb3JlU2hvdywgW25vZGVdKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRub2RlID0gdG9Ob2RlKG5vZGUpO1xuXHRcdGlmICh0aGlzLl9pc0FjdGl2ZSkge1xuXHRcdFx0dGhpcy5fc2V0UG9wdXBTaXplKG5vZGUsIGNvbmZpZyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChhdHRhY2hlZCkge1xuXHRcdFx0dGhpcy5hdHRhY2goYXR0YWNoZWQpO1xuXHRcdH1cblxuXHRcdHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5fcG9wdXAuc3R5bGUubGVmdCA9IFwiMFwiO1xuXHRcdFx0dGhpcy5fcG9wdXAuc3R5bGUudG9wID0gXCIwXCI7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3BvcHVwKTtcblx0XHRcdHRoaXMuX3NldFBvcHVwU2l6ZShub2RlLCBjb25maWcpO1xuXHRcdFx0dGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShQb3B1cEV2ZW50cy5hZnRlclNob3csIFtub2RlXSk7XG5cdFx0XHR0aGlzLl9vdXRlckNsaWNrRGVzdHJ1Y3RvciA9IHRoaXMuX2RldGVjdE91dGVyQ2xpY2sobm9kZSk7XG5cdFx0fSk7XG5cdH1cblx0aGlkZSgpIHtcblx0XHR0aGlzLl9oaWRlKGZhbHNlLCBudWxsKTtcblx0fVxuXHRpc1Zpc2libGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzQWN0aXZlO1xuXHR9XG5cdGF0dGFjaChuYW1lOiBhbnksIGNvbmZpZz86IGFueSkge1xuXHRcdHRoaXMuX2h0bWwgPSBudWxsO1xuXHRcdGlmICh0eXBlb2YgbmFtZSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0dGhpcy5fdWkgPSBuYW1lO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHRoaXMuX3VpID0gbmV3ICh3aW5kb3cgYXMgYW55KS5kaHhbbmFtZV0obnVsbCwgY29uZmlnKTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdGlmIChuYW1lLnByb3RvdHlwZSBpbnN0YW5jZW9mIFZpZXcpIHtcblx0XHRcdFx0dGhpcy5fdWkgPSBuZXcgbmFtZShudWxsLCBjb25maWcpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fdWkgPSB7XG5cdFx0XHRcdFx0Z2V0Um9vdFZpZXcoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbmFtZShjb25maWcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnBhaW50KCk7XG5cdFx0cmV0dXJuIHRoaXMuX3VpO1xuXHR9XG5cdGF0dGFjaEhUTUwoaHRtbDogc3RyaW5nKSB7XG5cdFx0dGhpcy5faHRtbCA9IGh0bWw7XG5cdFx0dGhpcy5wYWludCgpO1xuXHR9XG5cdGdldFdpZGdldCgpIHtcblx0XHRyZXR1cm4gdGhpcy5fdWk7XG5cdH1cblx0Z2V0Q29udGFpbmVyKCkge1xuXHRcdHJldHVybiB0aGlzLmdldFJvb3RWaWV3KCkucmVmcy5jb250ZW50LmVsO1xuXHR9XG5cdHRvVkRPTSgpIHtcblx0XHRsZXQgdmlldzogVk5vZGU7XG5cdFx0aWYgKHRoaXMuX2h0bWwpIHtcblx0XHRcdHZpZXcgPSBlbChcIi5kaHhfcG9wdXBfX2lubmVyLWh0bWwtY29udGVudFwiLCB7XG5cdFx0XHRcdFwiLmlubmVySFRNTFwiOiB0aGlzLl9odG1sXG5cdFx0XHR9KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmlldyA9IHRoaXMuX3VpID8gdGhpcy5fdWkuZ2V0Um9vdFZpZXcoKSA6IG51bGw7XG5cdFx0XHRpZiAodmlldyAmJiB2aWV3LnJlbmRlcikge1xuXHRcdFx0XHR2aWV3ID0gaW5qZWN0KHZpZXcpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBlbChcImRpdlwiLCB7XG5cdFx0XHRjbGFzczogXCJkaHhfcG9wdXAtY29udGVudFwiLFxuXHRcdFx0b25jbGljazogdGhpcy5fY2xpY2tFdmVudCxcblx0XHRcdF9rZXk6IHRoaXMuX3VpZCxcblx0XHRcdF9yZWY6IFwiY29udGVudFwiXG5cdFx0fSwgW3ZpZXddKTtcblx0fVxuXHRkZXN0cnVjdG9yKCkge1xuXHRcdHRoaXMuaGlkZSgpO1xuXHRcdGlmICh0aGlzLl9vdXRlckNsaWNrRGVzdHJ1Y3Rvcikge1xuXHRcdFx0dGhpcy5fb3V0ZXJDbGlja0Rlc3RydWN0b3IoKTtcblx0XHR9XG5cdFx0dGhpcy5fcG9wdXAgPSBudWxsO1xuXHR9XG5cdHByaXZhdGUgX3NldFBvcHVwU2l6ZShub2RlOiBIVE1MRWxlbWVudCwgY29uZmlnOiBJU2hvd0NvbmZpZywgY2FsbHM6IG51bWJlciA9IDMpIHtcblx0XHRjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IHRoaXMuX3BvcHVwLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRcdC8vIFRPRE86IElFIHBvcHVwIGhlaWdodCA9IDBcblx0XHRpZiAodGhpcy5fdGltZW91dCkge1xuXHRcdFx0Y2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVvdXQpO1xuXHRcdFx0dGhpcy5fdGltZW91dCA9IG51bGw7XG5cdFx0fVxuXHRcdGlmIChjYWxscyAmJiAod2lkdGggPT09IDAgfHwgaGVpZ2h0ID09PSAwKSkge1xuXHRcdFx0dGhpcy5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0XHRpZiAoIXRoaXMuX2lzQWN0aXZlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX3NldFBvcHVwU2l6ZShub2RlLCBjb25maWcsIGNhbGxzIC0gMSk7XG5cdFx0XHRcdHRoaXMuX3RpbWVvdXQgPSBudWxsO1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IHsgbGVmdCwgdG9wIH0gPSBmaXRQb3NpdGlvbihub2RlLCB7IGNlbnRlcmluZzogdHJ1ZSwgbW9kZTogUG9zaXRpb24uYm90dG9tLCAuLi5jb25maWcsIHdpZHRoLCBoZWlnaHQgfSk7XG5cdFx0dGhpcy5fcG9wdXAuc3R5bGUubGVmdCA9IGxlZnQ7XG5cdFx0dGhpcy5fcG9wdXAuc3R5bGUudG9wID0gdG9wO1xuXHR9XG5cdHByaXZhdGUgX2RldGVjdE91dGVyQ2xpY2sobm9kZTogSFRNTEVsZW1lbnQpIHtcblx0XHRjb25zdCBvdXRlckNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRcdGxldCB0YXJnZXQgPSBlLnRhcmdldDtcblx0XHRcdHdoaWxlICh0YXJnZXQpIHtcblx0XHRcdFx0aWYgKHRhcmdldCA9PT0gbm9kZSB8fCB0YXJnZXQgPT09IHRoaXMuX3BvcHVwKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRhcmdldCA9ICh0YXJnZXQgYXMgYW55KS5wYXJlbnROb2RlO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2hpZGUodHJ1ZSwgZSkpIHtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG91dGVyQ2xpY2spO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3V0ZXJDbGljayk7XG5cblx0XHRyZXR1cm4gKCkgPT4gZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG91dGVyQ2xpY2spO1xuXHR9XG5cdHByaXZhdGUgX2hpZGUoZnJvbU91dGVyQ2xpY2s6IGJvb2xlYW4sIGU6IEV2ZW50KSB7XG5cdFx0aWYgKHRoaXMuX2lzQWN0aXZlKSB7XG5cdFx0XHRpZiAoIXRoaXMuZXZlbnRzLmZpcmUoUG9wdXBFdmVudHMuYmVmb3JlSGlkZSwgW2Zyb21PdXRlckNsaWNrLCBlXSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl9wb3B1cCk7XG5cdFx0XHR0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0aWYgKHRoaXMuX291dGVyQ2xpY2tEZXN0cnVjdG9yKSB7XG5cdFx0XHRcdHRoaXMuX291dGVyQ2xpY2tEZXN0cnVjdG9yKCk7XG5cdFx0XHRcdHRoaXMuX291dGVyQ2xpY2tEZXN0cnVjdG9yID0gbnVsbDtcblx0XHRcdH1cblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoUG9wdXBFdmVudHMuYWZ0ZXJIaWRlLCBbZV0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgVk5vZGUgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZG9tXCI7XHJcbmltcG9ydCB7IElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcclxuaW1wb3J0IHsgUG9zaXRpb24gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vaHRtbFwiO1xyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cCB7XHJcblx0c2hvdyhub2RlOiBIVE1MRWxlbWVudCwgY29uZmlnPzogSVNob3dDb25maWcsIGF0dGFjaD86IGFueSk6IHZvaWQ7XHJcblx0aGlkZSgpOiB2b2lkO1xyXG5cdHRvVkRPTSgpOiB2b2lkO1xyXG5cdGF0dGFjaEhUTUwoaHRtbDogc3RyaW5nKTogdm9pZDtcclxuXHRhdHRhY2gobmFtZTogYW55LCBjb25maWc/OiBhbnkpOiBWTm9kZTtcclxuXHRpc1Zpc2libGUoKTogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cENvbmZpZyB7XHJcblx0Y3NzPzogc3RyaW5nO1xyXG5cdGV2ZW50cz86IElFdmVudFN5c3RlbTxhbnk+O1xyXG59XHJcbmV4cG9ydCBlbnVtIFBvcHVwRXZlbnRzIHtcclxuXHRiZWZvcmVIaWRlID0gXCJiZWZvcmVoaWRlXCIsXHJcblx0YmVmb3JlU2hvdyA9IFwiYmVmb3Jlc2hvd1wiLFxyXG5cdGFmdGVySGlkZSA9IFwiYWZ0ZXJoaWRlXCIsXHJcblx0YWZ0ZXJTaG93ID0gXCJhZnRlcnNob3dcIixcclxuXHRjbGljayA9IFwiY2xpY2tcIlxyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNob3dDb25maWcge1xyXG5cdGNlbnRlcmluZz86IGJvb2xlYW47XHJcblx0YXV0bz86IGJvb2xlYW47XHJcblx0bW9kZT86IFBvc2l0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElQb3B1cEV2ZW50SGFuZGxlcnNNYXAge1xyXG5cdFtrZXk6IHN0cmluZ106ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xyXG5cdFtQb3B1cEV2ZW50cy5jbGlja106IChlOiBFdmVudCkgPT4gYW55O1xyXG5cdFtQb3B1cEV2ZW50cy5hZnRlckhpZGVdOiAoZTogRXZlbnQpID0+IGFueTtcclxuXHRbUG9wdXBFdmVudHMuYWZ0ZXJTaG93XTogKG5vZGU6IEhUTUxFbGVtZW50KSA9PiBhbnk7XHJcblx0W1BvcHVwRXZlbnRzLmJlZm9yZUhpZGVdOiAoZnJvbU91dGVyQ2xpY2s6IGJvb2xlYW4sIGU6IEV2ZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcclxuXHRbUG9wdXBFdmVudHMuYmVmb3JlU2hvd106IChub2RlOiBIVE1MRWxlbWVudCkgPT4gdm9pZCB8IGJvb2xlYW47XHJcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL1NsaWRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy90eXBlc1wiOyIsImltcG9ydCB7IGV4dGVuZCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGUsIGVsIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2RvbVwiO1xuaW1wb3J0IHsgSUhhbmRsZXJzIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBFdmVudFN5c3RlbSwgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgYWRkSG90a2V5cyB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9LZXltYW5hZ2VyXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3ZpZXdcIjtcbmltcG9ydCB7IFBvcHVwIH0gZnJvbSBcIkBkaHgvdHMtcG9wdXBcIjtcbmltcG9ydCB7IERpcmVjdGlvbiwgSVNsaWRlciwgU2xpZGVyRXZlbnRzLCBJU2xpZGVyQ29uZmlnfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5mdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSwgbWluLCBtYXgpIHtcblx0aWYgKHZhbHVlIDwgbWluKSB7XG5cdFx0cmV0dXJuIG1pbjtcblx0fVxuXHRpZiAodmFsdWUgPiBtYXgpIHtcblx0XHRyZXR1cm4gbWF4O1xuXHR9XG5cdHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VWYWx1ZSh2YWx1ZTogbnVtYmVyW10gfCBudW1iZXIgfCBzdHJpbmcsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcik6IG51bWJlcltdIHtcblx0bGV0IHZhbHVlcztcblx0aWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHR2YWx1ZXMgPSBbXTtcblx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuXHRcdHZhbHVlcyA9IHZhbHVlO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHZhbHVlcyA9IHZhbHVlLnNwbGl0KFwiLFwiKS5tYXAodiA9PiBwYXJzZUludCh2LCAxMCkpO1xuXHR9IGVsc2Uge1xuXHRcdHZhbHVlcyA9IFt2YWx1ZV07XG5cdH1cblx0dmFsdWVzWzBdID0gdmFsdWVzWzBdID09PSB1bmRlZmluZWQgPyBtaW4gOiBub3JtYWxpemVWYWx1ZSh2YWx1ZXNbMF0sIG1pbiwgbWF4KTtcblx0dmFsdWVzWzFdID0gdmFsdWVzWzFdID09PSB1bmRlZmluZWQgPyBtYXggOiBub3JtYWxpemVWYWx1ZSh2YWx1ZXNbMV0sIG1pbiwgbWF4KTtcblx0cmV0dXJuIHZhbHVlcztcbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRlciBleHRlbmRzIFZpZXcgaW1wbGVtZW50cyBJU2xpZGVyIHtcblx0cHVibGljIGNvbmZpZzogSVNsaWRlckNvbmZpZztcblx0cHVibGljIGV2ZW50czogSUV2ZW50U3lzdGVtPFNsaWRlckV2ZW50cz47XG5cdHByb3RlY3RlZCBfaGVscGVyOiBQb3B1cDtcblx0cHJpdmF0ZSBfb2Zmc2V0czoge2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9O1xuXHRwcml2YXRlIF9jdXJyZW50UG9zaXRpb246IG51bWJlcjtcblx0cHJpdmF0ZSBfZXh0cmFDdXJyZW50UG9zaXRpb246IG51bWJlcjtcblx0cHJpdmF0ZSBfbGVuZ3RoOiBudW1iZXI7XG5cdHByaXZhdGUgX2F4aXM6IHN0cmluZztcblx0cHJpdmF0ZSBfaXNFeHRyYUFjdGl2ZTogYm9vbGVhbjtcblx0cHJpdmF0ZSBfZGlzYWJsZWQ6IGJvb2xlYW47XG5cdHByaXZhdGUgX2lzTW91c2VNb3Zpbmc6IGJvb2xlYW47XG5cblx0cHJpdmF0ZSBfaGFuZGxlcnM6IElIYW5kbGVycztcblx0cHJpdmF0ZSBfcG9zc2libGVSYW5nZTogW251bWJlciwgbnVtYmVyXTtcblx0cHJpdmF0ZSBfZmluZE5ld0RpcmVjdGlvbjogbnVtYmVyO1xuXG5cdHByaXZhdGUgX21vdXNlSW46IGJvb2xlYW47XG5cdHByaXZhdGUgX2ZvY3VzSW46IGJvb2xlYW47XG5cblx0cHJpdmF0ZSBfaG90a2V5c0Rlc3RydWN0b3I6ICgpID0+IHZvaWQ7XG5cblx0Y29uc3RydWN0b3IoY29udGFpbmVyOiBIVE1MRWxlbWVudCB8IHN0cmluZywgY29uZmlnOiBJU2xpZGVyQ29uZmlnKSB7XG5cdFx0c3VwZXIoY29udGFpbmVyLCBleHRlbmQoe1xuXHRcdFx0bW9kZTogRGlyZWN0aW9uLmhvcml6b250YWwsXG5cdFx0XHRtaW46IDAsXG5cdFx0XHRtYXg6IDEwMCxcblx0XHRcdHN0ZXA6IDEsXG5cdFx0XHR0aHVtYkxhYmVsOiB0cnVlLFxuXHRcdH0sIGNvbmZpZykpO1xuXG5cdFx0dGhpcy5ldmVudHMgPSBuZXcgRXZlbnRTeXN0ZW0odGhpcyk7XG5cblx0XHR0aGlzLl9heGlzID0gdGhpcy5jb25maWcubW9kZSA9PT0gRGlyZWN0aW9uLmhvcml6b250YWwgPyBcImNsaWVudFhcIiA6IFwiY2xpZW50WVwiO1xuXG5cdFx0dGhpcy5faW5pdFN0YXJ0UG9zaXRpb24oKTtcblx0XHR0aGlzLl9pbml0SG90a2V5cygpO1xuXG5cdFx0Y29uc3Qgdk5vZGUgPSBjcmVhdGUoe1xuXHRcdFx0cmVuZGVyOiAoKSA9PiB0aGlzLl9kcmF3KCksXG5cdFx0XHRob29rczoge1xuXHRcdFx0XHRkaWRNb3VudDogKCkgPT4gdGhpcy5fY2FsY1NsaWRlclBvc2l0aW9uKCksXG5cdFx0XHRcdGRpZFJlZHJhdzogKCkgPT4gdGhpcy5fY2FsY1NsaWRlclBvc2l0aW9uKClcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHRoaXMuX2luaXRIYW5kbGVycygpO1xuXHRcdHRoaXMubW91bnQoY29udGFpbmVyLCB2Tm9kZSk7XG5cdH1cblx0ZGlzYWJsZSgpIHtcblx0XHR0aGlzLl9kaXNhYmxlZCA9IHRydWU7XG5cdFx0dGhpcy5wYWludCgpO1xuXHR9XG5cdGVuYWJsZSgpIHtcblx0XHR0aGlzLl9kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXHRmb2N1cyhleHRyYT86Ym9vbGVhbikge1xuXHRcdHRoaXMuZ2V0Um9vdFZpZXcoKS5yZWZzW2V4dHJhID8gXCJleHRyYVJ1bm5lclwiIDogXCJydW5uZXJcIl0uZWwuZm9jdXMoKTtcblx0fVxuXHRnZXRWYWx1ZTxUIGV4dGVuZHMgYm9vbGVhbiA9IGZhbHNlPihhc0FycmF5PzogVCk6IFQgZXh0ZW5kcyB0cnVlID8gbnVtYmVyW10gOiBzdHJpbmcge1xuXHRcdGxldCByZXM7XG5cdFx0aWYgKHRoaXMuY29uZmlnLnJhbmdlKSB7XG5cdFx0XHRjb25zdCBhID0gdGhpcy5fZ2V0VmFsdWUodGhpcy5fY3VycmVudFBvc2l0aW9uKTtcblx0XHRcdGNvbnN0IGIgPSB0aGlzLl9nZXRWYWx1ZSh0aGlzLl9leHRyYUN1cnJlbnRQb3NpdGlvbik7XG5cdFx0XHRyZXMgPSAgYSA+IGIgPyBbYiwgYV0gOiBbYSwgYl07XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlcyA9IFt0aGlzLl9nZXRWYWx1ZSh0aGlzLl9jdXJyZW50UG9zaXRpb24pXTtcblx0XHR9XG5cdFx0cmV0dXJuIGFzQXJyYXkgPyByZXMgOiByZXMuam9pbihcIixcIik7XG5cdH1cblx0c2V0VmFsdWUodmFsdWU6IG51bWJlciB8IG51bWJlcltdKSB7XG5cdFx0Y29uc3Qgb2xkID0gdGhpcy5fZ2V0VmFsdWUodGhpcy5fY3VycmVudFBvc2l0aW9uKTtcblx0XHRpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMSkge1xuXHRcdFx0Y29uc3Qgb2xkRXh0cmEgPSB0aGlzLl9nZXRWYWx1ZSh0aGlzLl9leHRyYUN1cnJlbnRQb3NpdGlvbik7XG5cdFx0XHR0aGlzLl9zZXRWYWx1ZSh2YWx1ZVswXSwgZmFsc2UpO1xuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShTbGlkZXJFdmVudHMuY2hhbmdlLCBbdmFsdWVbMF0sIG9sZCwgZmFsc2VdKTtcblx0XHRcdHRoaXMuX3NldFZhbHVlKHZhbHVlWzFdLCB0cnVlKTtcblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2xpZGVyRXZlbnRzLmNoYW5nZSwgW3ZhbHVlWzFdLCBvbGRFeHRyYSwgdHJ1ZV0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9zZXRWYWx1ZSh2YWx1ZSBhcyBudW1iZXIpO1xuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShTbGlkZXJFdmVudHMuY2hhbmdlLCBbdmFsdWUsIG9sZCwgZmFsc2VdKTtcblx0XHR9XG5cblx0XHR0aGlzLnBhaW50KCk7XG5cdH1cblx0ZGVzdHJ1Y3RvcigpIHtcblx0XHR0aGlzLl9ob3RrZXlzRGVzdHJ1Y3RvcigpO1xuXHRcdHRoaXMudW5tb3VudCgpO1xuXHR9XG5cdHByaXZhdGUgX2NhbGNTbGlkZXJQb3NpdGlvbigpIHtcblx0XHRjb25zdCByb290ID0gdGhpcy5nZXRSb290VmlldygpO1xuXHRcdGlmICghcm9vdCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCB0cmFja2VyOiBIVE1MRWxlbWVudCA9IHJvb3QucmVmcy50cmFjay5lbDtcblx0XHRjb25zdCByZWN0ID0gdHJhY2tlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0XHR0aGlzLl9vZmZzZXRzID0ge1xuXHRcdFx0bGVmdDogcmVjdC5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuXHRcdFx0dG9wOiByZWN0LnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldFxuXHRcdH07XG5cdFx0dGhpcy5fbGVuZ3RoID0gdGhpcy5jb25maWcubW9kZSA9PT0gRGlyZWN0aW9uLmhvcml6b250YWwgPyByZWN0LndpZHRoIDogcmVjdC5oZWlnaHQ7XG5cdH1cblx0cHJpdmF0ZSBfaW5pdEhvdGtleXMoKSB7XG5cdFx0Y29uc3QgaXNSdW5uZXJzSW5Gb2N1cyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGFjdGl2ZUVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcblx0XHRcdGNvbnN0IHJlZnMgPSB0aGlzLmdldFJvb3RWaWV3KCkucmVmcztcblx0XHRcdGlmICghcmVmcykge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBydW5uZXIgPSByZWZzLnJ1bm5lcjtcblx0XHRcdGlmIChydW5uZXIgJiYgcnVubmVyLmVsID09PSBhY3RpdmVFbCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmNvbmZpZy5yYW5nZSAmJiByZWZzLmV4dHJhUnVubmVyICYmIHJlZnMuZXh0cmFSdW5uZXIuZWwgPT09IGFjdGl2ZUVsKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH07XG5cblx0XHR0aGlzLl9ob3RrZXlzRGVzdHJ1Y3RvciA9IGFkZEhvdGtleXMoXG5cdFx0XHR7XG5cdFx0XHRcdGFycm93bGVmdDogZSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLm1vZGUgPT09IERpcmVjdGlvbi52ZXJ0aWNhbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5fbW92ZSgtdGhpcy5jb25maWcuc3RlcCwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGh4X3NsaWRlcl9fdGh1bWItLWV4dHJhXCIpKTtcblx0XHRcdFx0fSxcblx0XHRcdFx0YXJyb3dyaWdodDogZSA9PiB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLm1vZGUgPT09IERpcmVjdGlvbi52ZXJ0aWNhbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5fbW92ZSh0aGlzLmNvbmZpZy5zdGVwLCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkaHhfc2xpZGVyX190aHVtYi0tZXh0cmFcIikpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcnJvd3VwOiBlID0+IHtcblx0XHRcdFx0XHRpZiAodGhpcy5jb25maWcubW9kZSA9PT0gRGlyZWN0aW9uLmhvcml6b250YWwpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHRoaXMuX21vdmUodGhpcy5jb25maWcuc3RlcCwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGh4X3NsaWRlcl9fdGh1bWItLWV4dHJhXCIpKTtcblxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcnJvd2Rvd246IGUgPT4ge1xuXHRcdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24uaG9yaXpvbnRhbCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0dGhpcy5fbW92ZSgtdGhpcy5jb25maWcuc3RlcCwgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGh4X3NsaWRlcl9fdGh1bWItLWV4dHJhXCIpKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGlzUnVubmVyc0luRm9jdXNcblx0XHQpO1xuXHR9XG5cblx0cHJpdmF0ZSBfbW92ZSh2YWx1ZTogbnVtYmVyLCBmb3JFeHRyYT86IGJvb2xlYW4pIHtcblx0XHRpZiAodGhpcy5jb25maWcuaW52ZXJzZSkge1xuXHRcdFx0dmFsdWUgPSAtdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3Qgb2xkVmFsdWUgPSBmb3JFeHRyYSA/IHRoaXMuX2dldFZhbHVlKHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uKSA6IHRoaXMuX2dldFZhbHVlKHRoaXMuX2N1cnJlbnRQb3NpdGlvbik7XG5cdFx0Y29uc3QgbmV3VmFsdWUgPSBvbGRWYWx1ZSArIHZhbHVlO1xuXG5cdFx0dGhpcy5fc2V0VmFsdWUob2xkVmFsdWUgKyB2YWx1ZSwgZm9yRXh0cmEpO1xuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShTbGlkZXJFdmVudHMuY2hhbmdlLCBbbmV3VmFsdWUsIG9sZFZhbHVlLCBmb3JFeHRyYV0pO1xuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXG5cdHByaXZhdGUgX2luaXRTdGFydFBvc2l0aW9uKCkge1xuXHRcdGNvbnN0IHttYXgsIG1pbiwgcmFuZ2V9ID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgW3ZhbHVlLCBleHRyYVZhbHVlXSA9IHBhcnNlVmFsdWUodGhpcy5jb25maWcudmFsdWUsIHRoaXMuY29uZmlnLm1pbiwgdGhpcy5jb25maWcubWF4KTtcblxuXHRcdHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9ICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIDEwMDtcblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uID0gKG1heCAtIGV4dHJhVmFsdWUpIC8gKG1heCAtIG1pbikgKiAxMDA7XG5cdFx0fVxuXHRcdHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9ICh2YWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIDEwMDtcblx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uID0gKGV4dHJhVmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbikgKiAxMDA7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX2lzSW52ZXJzZSgpKSB7XG5cdFx0XHR0aGlzLl9jdXJyZW50UG9zaXRpb24gPSAxMDAgLSB0aGlzLl9jdXJyZW50UG9zaXRpb247XG5cdFx0XHRpZiAocmFuZ2UpIHtcblx0XHRcdFx0dGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb24gPSAxMDAgLSB0aGlzLl9leHRyYUN1cnJlbnRQb3NpdGlvbjtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfZ2V0VmFsdWUodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG5cdFx0aWYgKHRoaXMuX2lzSW52ZXJzZSgpKSB7XG5cdFx0XHR2YWx1ZSA9IDEwMCAtIHZhbHVlO1xuXHRcdH1cblx0XHRjb25zdCB7bWluLCBtYXgsIHN0ZXB9ID0gdGhpcy5jb25maWc7XG5cdFx0aWYgKHZhbHVlID09PSAxMDApIHtcblx0XHRcdHJldHVybiBtYXg7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZSA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIG1pbjtcblx0XHR9XG5cdFx0Y29uc3QgdmFsID0gdmFsdWUgKiAobWF4IC0gbWluKSAvIDEwMDtcblx0XHRjb25zdCByZW1haW4gPSB2YWwgJSBzdGVwO1xuXHRcdGNvbnN0IHJvdW5kZXIgPSByZW1haW4gPj0gc3RlcC8yID8gc3RlcCA6IDA7XG5cdFx0Y29uc3QgcmVzdWx0ID0gbWluICsgdmFsIC0gcmVtYWluICsgcm91bmRlcjtcblx0XHRyZXR1cm4gK3Jlc3VsdC50b0ZpeGVkKDUpO1xuXHR9XG5cdHByaXZhdGUgX3NldFZhbHVlKHZhbDogbnVtYmVyLCBmb3JFeHRyYTogYm9vbGVhbiA9IGZhbHNlKSB7XG5cdFx0Y29uc3Qge21heCwgbWlufSA9IHRoaXMuY29uZmlnO1xuXG5cdFx0aWYgKHZhbCA+IG1heCB8fCB2YWwgPCBtaW4pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRjb25zdCByYXdWYWx1ZSA9ICh2YWwgLSBtaW4pIC8gKG1heCAtIG1pbikgKiAxMDA7XG5cdFx0Y29uc3QgbmV3VmFsdWUgPSB0aGlzLl9pc0ludmVyc2UoKSA/IDEwMCAtIHJhd1ZhbHVlIDogcmF3VmFsdWU7XG5cblx0XHRpZiAoZm9yRXh0cmEpIHtcblx0XHRcdHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uID0gbmV3VmFsdWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2N1cnJlbnRQb3NpdGlvbiA9IG5ld1ZhbHVlO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF9pbml0SGFuZGxlcnMoKSB7XG5cdFx0Y29uc3QgbW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGNvbnN0IHggPSAoZVt0aGlzLl9heGlzXSAtIHRoaXMuX2dldEJlZ2luaW5nKCkpIC8gdGhpcy5fbGVuZ3RoICogMTAwO1xuXG5cdFx0XHRpZiAodGhpcy5fZmluZE5ld0RpcmVjdGlvbikge1xuXHRcdFx0XHRpZiAoTWF0aC5hYnModGhpcy5fY3VycmVudFBvc2l0aW9uIC0geCkgPCAxKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh4ID4gdGhpcy5fY3VycmVudFBvc2l0aW9uKSB7XG5cdFx0XHRcdFx0dGhpcy5fcG9zc2libGVSYW5nZSA9IFt0aGlzLl9jdXJyZW50UG9zaXRpb24sIDEwMF07XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fcG9zc2libGVSYW5nZSA9IFswLCB0aGlzLl9jdXJyZW50UG9zaXRpb25dO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuX2ZpbmROZXdEaXJlY3Rpb24gPSBudWxsO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodGhpcy5faW5TaWRlKHgpKSB7XG5cdFx0XHRcdHRoaXMuX3VwZGF0ZVBvc2l0aW9uKHgsIHRoaXMuX2lzRXh0cmFBY3RpdmUpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLnBhaW50KCk7XG5cdFx0fTtcblx0XHRjb25zdCBtb3VzZVVwID0gZSA9PiB7XG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKFNsaWRlckV2ZW50cy5tb3VzZXVwLCBbZV0pO1xuXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0dGhpcy5faXNNb3VzZU1vdmluZyA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLnBhaW50KCk7XG5cdFx0XHR9LCA0KTtcblxuXHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2VVcCk7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZSk7XG5cdFx0fTtcblx0XHRpZiAodGhpcy5jb25maWcuaGVscCkge1xuXHRcdFx0dGhpcy5faGVscGVyID0gbmV3IFBvcHVwKHtjc3M6IFwiZGh4X3Rvb2x0aXAgZGh4X3Rvb2x0aXAtLWZvcmNlZCBkaHhfdG9vbHRpcC0tbGlnaHRcIn0pO1xuXHRcdFx0dGhpcy5faGVscGVyLmF0dGFjaEhUTUwodGhpcy5jb25maWcuaGVscCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5faGFuZGxlcnMgPSB7XG5cdFx0XHRzaG93SGVscGVyOiBlID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR0aGlzLl9oZWxwZXIuc2hvdyhlLnRhcmdldCk7XG5cdFx0XHR9LFxuXHRcdFx0b25tb3VzZWRvd246IChlOiBNb3VzZUV2ZW50KSA9PiB7XG5cdFx0XHRcdGlmICh0aGlzLl9kaXNhYmxlZCB8fCBlLndoaWNoID09PSAzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2xpZGVyRXZlbnRzLm1vdXNlZG93biwgW2VdKTtcblxuXHRcdFx0XHR0aGlzLl9pc01vdXNlTW92aW5nID0gdHJ1ZTtcblx0XHRcdFx0bGV0IGFjdGl2ZTtcblx0XHRcdFx0aWYgKChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGh4X3NsaWRlcl9fdGh1bWItLWV4dHJhXCIpKSB7XG5cdFx0XHRcdFx0dGhpcy5faXNFeHRyYUFjdGl2ZSA9IHRydWU7XG5cdFx0XHRcdFx0YWN0aXZlID0gdGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb247XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5faXNFeHRyYUFjdGl2ZSA9IGZhbHNlO1xuXHRcdFx0XHRcdGFjdGl2ZSA9IHRoaXMuX2N1cnJlbnRQb3NpdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLl9maW5kTmV3RGlyZWN0aW9uID0gbnVsbDtcblxuXHRcdFx0XHQvLyBkZWZpbmUgcG9zc2libGUgcmFuZ2Vcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnJhbmdlKSB7XG5cdFx0XHRcdFx0Y29uc3QgW21vcmUsIGxlc3NdID0gdGhpcy5fY3VycmVudFBvc2l0aW9uID4gdGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb24gP1xuXHRcdFx0XHRcdFx0W3RoaXMuX2N1cnJlbnRQb3NpdGlvbiwgdGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb25dIDogW3RoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uLCB0aGlzLl9jdXJyZW50UG9zaXRpb25dO1xuXHRcdFx0XHRcdGlmICh0aGlzLl9jdXJyZW50UG9zaXRpb24gPT09IHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uKSB7XG5cdFx0XHRcdFx0XHR0aGlzLl9maW5kTmV3RGlyZWN0aW9uID0gYWN0aXZlO1xuXHRcdFx0XHRcdFx0dGhpcy5fcG9zc2libGVSYW5nZSA9IFswLCAxMDBdO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYWN0aXZlIDwgbW9yZSkge1xuXHRcdFx0XHRcdFx0dGhpcy5fcG9zc2libGVSYW5nZSA9IFswLCBtb3JlXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0dGhpcy5fcG9zc2libGVSYW5nZSA9IFtsZXNzLCAxMDBdO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9wb3NzaWJsZVJhbmdlID0gWzAsIDEwMF07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG1vdXNlTW92ZSk7XG5cdFx0XHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIG1vdXNlVXApO1xuXG5cdFx0XHR9LFxuXHRcdFx0b25sYWJlbENsaWNrOiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IHJlZnMgPSB0aGlzLmdldFJvb3RWaWV3KCkucmVmcztcblx0XHRcdFx0cmVmcy5ydW5uZXIuZWwuZm9jdXMoKTtcblx0XHRcdH0sXG5cdFx0XHRvbmNsaWNrOiAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5fZGlzYWJsZWQgfHwgdGhpcy5faXNNb3VzZU1vdmluZyB8fCBlLndoaWNoID09PSAzKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgeCA9IChlW3RoaXMuX2F4aXNdIC0gdGhpcy5fZ2V0QmVnaW5pbmcoKSkgLyB0aGlzLl9sZW5ndGggKiAxMDA7XG5cblx0XHRcdFx0Y29uc3QgcmVmcyA9IHRoaXMuZ2V0Um9vdFZpZXcoKS5yZWZzO1xuXG5cdFx0XHRcdGlmICh0aGlzLmNvbmZpZy5yYW5nZSkge1xuXHRcdFx0XHRcdGNvbnN0IGRpc3QgPSBNYXRoLmFicyh0aGlzLl9jdXJyZW50UG9zaXRpb24gLSB4KTtcblx0XHRcdFx0XHRjb25zdCBleHRyYURpc3QgPSBNYXRoLmFicyh0aGlzLl9leHRyYUN1cnJlbnRQb3NpdGlvbiAtIHgpO1xuXHRcdFx0XHRcdGlmIChkaXN0IDwgZXh0cmFEaXN0KSB7XG5cdFx0XHRcdFx0XHR0aGlzLl91cGRhdGVQb3NpdGlvbih4LCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRyZWZzLnJ1bm5lci5lbC5mb2N1cygpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHR0aGlzLl91cGRhdGVQb3NpdGlvbih4LCB0cnVlKTtcblx0XHRcdFx0XHRcdHJlZnMuZXh0cmFSdW5uZXIuZWwuZm9jdXMoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fdXBkYXRlUG9zaXRpb24oeCwgZmFsc2UpO1xuXHRcdFx0XHRcdHJlZnMucnVubmVyLmVsLmZvY3VzKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5wYWludCgpO1xuXHRcdFx0fSxcblx0XHRcdG9ubW91c2VvdmVyOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX21vdXNlSW4gPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnBhaW50KCk7XG5cdFx0XHR9LFxuXHRcdFx0b25tb3VzZW91dDogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLl9tb3VzZUluID0gZmFsc2U7XG5cdFx0XHRcdHRoaXMucGFpbnQoKTtcblx0XHRcdH0sXG5cdFx0XHRvbmZvY3VzOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX2ZvY3VzSW4gPSB0cnVlO1xuXHRcdFx0XHR0aGlzLnBhaW50KCk7XG5cdFx0XHR9LFxuXHRcdFx0b25ibHVyOiAoKSA9PiB7XG5cdFx0XHRcdHRoaXMuX2ZvY3VzSW4gPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5wYWludCgpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH1cblxuXHRwcml2YXRlIF9nZXRCZWdpbmluZygpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24uaG9yaXpvbnRhbCA/IHRoaXMuX29mZnNldHMubGVmdCAtIHdpbmRvdy5wYWdlWE9mZnNldCA6IHRoaXMuX29mZnNldHMudG9wIC0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXHR9XG5cdHByaXZhdGUgX2luU2lkZSh4OiBudW1iZXIpIHtcblx0XHRjb25zdCByYW5nZSA9IHRoaXMuX3Bvc3NpYmxlUmFuZ2U7XG5cdFx0aWYgKHggPCByYW5nZVswXSkge1xuXHRcdFx0dGhpcy5fdXBkYXRlUG9zaXRpb24ocmFuZ2VbMF0sIHRoaXMuX2lzRXh0cmFBY3RpdmUpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRpZiAoeCA+IHJhbmdlWzFdKSB7XG5cdFx0XHR0aGlzLl91cGRhdGVQb3NpdGlvbihyYW5nZVsxXSwgdGhpcy5faXNFeHRyYUFjdGl2ZSk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRwcml2YXRlIF91cGRhdGVQb3NpdGlvbih4OiBudW1iZXIsIGV4dHJhID0gZmFsc2UpIHtcblx0XHRpZiAoeCA+IDEwMCkge1xuXHRcdFx0eCA9IDEwMDtcblx0XHR9XG5cdFx0aWYgKHggPCAwKSB7XG5cdFx0XHR4ID0gMDtcblx0XHR9XG5cblx0XHRjb25zdCB7bWF4LCBtaW59ID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgcG9zaXRpb24gPSBleHRyYSA/IHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uIDogdGhpcy5fY3VycmVudFBvc2l0aW9uO1xuXG5cdFx0Y29uc3Qgb2xkVmFsdWUgPSB0aGlzLl9nZXRWYWx1ZShwb3NpdGlvbik7XG5cdFx0Y29uc3QgbmV3VmFsdWUgPSB0aGlzLl9nZXRWYWx1ZSh4KTtcblxuXHRcdGlmIChvbGRWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCByYXdWYWx1ZSA9IChuZXdWYWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKSAqIDEwMDtcblx0XHRjb25zdCB2YWx1ZSA9IHRoaXMuX2lzSW52ZXJzZSgpID8gMTAwIC0gcmF3VmFsdWUgOiByYXdWYWx1ZTtcblxuXHRcdGlmIChleHRyYSkge1xuXHRcdFx0dGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb24gPSB2YWx1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fY3VycmVudFBvc2l0aW9uID0gdmFsdWU7XG5cdFx0fVxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoU2xpZGVyRXZlbnRzLmNoYW5nZSwgW25ld1ZhbHVlLCBvbGRWYWx1ZSwgZXh0cmFdKTtcblx0fVxuXHRwcml2YXRlIF9nZXRSdW5uZXJTdHlsZShmb3JFeHRyYTogYm9vbGVhbiA9IGZhbHNlKSB7XG5cdFx0Y29uc3QgZGlyZWN0aW9uID0gdGhpcy5jb25maWcubW9kZSA9PT0gRGlyZWN0aW9uLmhvcml6b250YWwgPyBcImxlZnRcIiA6IFwidG9wXCI7XG5cdFx0Y29uc3QgcG9zID0gZm9yRXh0cmEgPyB0aGlzLl9leHRyYUN1cnJlbnRQb3NpdGlvbiA6IHRoaXMuX2N1cnJlbnRQb3NpdGlvbjtcblx0XHRyZXR1cm4ge1xuXHRcdFx0W2RpcmVjdGlvbl06IHBvcyArIFwiJVwiLFxuXHRcdH07XG5cdH1cblx0cHJpdmF0ZSBfaXNJbnZlcnNlKCkge1xuXHRcdHJldHVybiAodGhpcy5jb25maWcuaW52ZXJzZSAmJiB0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24uaG9yaXpvbnRhbCkgfHxcblx0XHRcdCghdGhpcy5jb25maWcuaW52ZXJzZSAmJiB0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24udmVydGljYWwpO1xuXHR9XG5cdHByaXZhdGUgX2dldFJ1bm5lckNzcyhmb3JFeHRyYTogYm9vbGVhbiA9IGZhbHNlKSB7XG5cdFx0cmV0dXJuIFwiZGh4X3NsaWRlcl9fdGh1bWJcIiArXG5cdFx0XHQoZm9yRXh0cmEgPyBcIiBkaHhfc2xpZGVyX190aHVtYi0tZXh0cmFcIiA6IFwiXCIpICtcblx0XHRcdCh0aGlzLl9pc01vdXNlTW92aW5nICYmICgoZm9yRXh0cmEgJiYgdGhpcy5faXNFeHRyYUFjdGl2ZSkgfHwgKCFmb3JFeHRyYSAmJiAhdGhpcy5faXNFeHRyYUFjdGl2ZSkpID8gXCIgZGh4X3NsaWRlcl9fdGh1bWItLWFjdGl2ZVwiIDogXCJcIikgK1xuXHRcdFx0KHRoaXMuX2Rpc2FibGVkID8gXCIgZGh4X3NsaWRlcl9fdGh1bWItLWRpc2FibGVkXCIgOiBcIlwiKSArXG5cdFx0XHQodGhpcy5faXNOdWxsYWJsZShmb3JFeHRyYSA/IHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uIDogdGhpcy5fY3VycmVudFBvc2l0aW9uKSAmJiAhdGhpcy5jb25maWcucmFuZ2UgPyBcIiBkaHhfc2xpZGVyX190aHVtYi0tbnVsbGFibGVcIiA6IFwiXCIpO1xuXHR9XG5cdHByaXZhdGUgX2RyYXcoKSB7XG5cdFx0Y29uc3Qgd2lkdGggPSB0aGlzLmNvbmZpZy5sYWJlbElubGluZSAmJiB0aGlzLmNvbmZpZy5sYWJlbFdpZHRoID8gdGhpcy5jb25maWcubGFiZWxXaWR0aCA6IFwiXCI7XG5cdFx0cmV0dXJuICBlbChcImRpdlwiLCB7XG5cdFx0XHRjbGFzczogXCJkaHhfc2xpZGVyXCIgK1xuXHRcdFx0XHRcIiBkaHhfc2xpZGVyLS1tb2RlX1wiICsgdGhpcy5jb25maWcubW9kZSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5sYWJlbCAmJiB0aGlzLmNvbmZpZy5sYWJlbElubGluZSA/IFwiIGRoeF9zbGlkZXItLWxhYmVsLWlubGluZVwiIDogXCJcIikgK1xuXHRcdFx0XHQodGhpcy5jb25maWcuaGlkZGVuTGFiZWwgPyBcIiBkaHhfc2xpZGVyLS1sYWJlbF9zclwiIDogXCJcIikgK1xuXHRcdFx0XHQodGhpcy5jb25maWcudGljayA/IFwiIGRoeF9zbGlkZXItLXRpY2tzXCIgOiBcIlwiKSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5tYWpvclRpY2sgPyBcIiBkaHhfc2xpZGVyLS1tYWpvci10aWNrc1wiIDogXCJcIikgK1xuXHRcdFx0XHQodGhpcy5jb25maWcuY3NzID8gXCIgXCIgKyB0aGlzLmNvbmZpZy5jc3MgOiBcIlwiKVxuXHRcdH0sIFtcblx0XHRcdHRoaXMuY29uZmlnLmxhYmVsID8gZWwoXCJsYWJlbC5kaHhfbGFiZWwuZGh4X3NsaWRlcl9fbGFiZWxcIiwge1xuXHRcdFx0XHRzdHlsZToge21pbldpZHRoOiB3aWR0aCwgbWF4V2lkdGg6IHdpZHRofSxcblx0XHRcdFx0Y2xhc3M6IHRoaXMuY29uZmlnLmhlbHAgPyBcImRoeF9sYWJlbC0td2l0aC1oZWxwXCIgOiBcIlwiLFxuXHRcdFx0XHRvbmNsaWNrOiB0aGlzLl9oYW5kbGVycy5vbmxhYmVsQ2xpY2ssXG5cdFx0XHR9LCB0aGlzLmNvbmZpZy5oZWxwID8gW1xuXHRcdFx0XHRlbChcInNwYW4uZGh4X2xhYmVsX19ob2xkZXJcIiwgdGhpcy5jb25maWcubGFiZWwpLFxuXHRcdFx0XHRlbChcInNwYW4uZGh4X2xhYmVsLWhlbHAuZHhpLmR4aS1oZWxwLWNpcmNsZS1vdXRsaW5lXCIsIHtcblx0XHRcdFx0XHR0YWJpbmRleDogXCIwXCIsXG5cdFx0XHRcdFx0cm9sZTogXCJidXR0b25cIixcblx0XHRcdFx0XHRvbmNsaWNrOiB0aGlzLl9oYW5kbGVycy5zaG93SGVscGVyXG5cdFx0XHRcdH0pLFxuXHRcdFx0XSA6IHRoaXMuY29uZmlnLmxhYmVsKSA6IG51bGwsXG5cdFx0XHR0aGlzLl9kcmF3U2xpZGVyKClcblx0XHRdKTtcblx0fVxuXHRwcml2YXRlIF9kcmF3U2xpZGVyKCkge1xuXHRcdHJldHVybiBlbChcIi5kaHhfc2xpZGVyX190cmFjay1ob2xkZXJcIixcblx0XHRcdC8vICh0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24udmVydGljYWwgPyBcIi5kaHhfc2xpZGVyLS12ZXJ0aWNhbFwiIDogXCIuZGh4X3NsaWRlci0taG9yaXpvbnRhbFwiKSxcblx0XHRcdHtcblx0XHRcdFx0ZGh4X3dpZGdldF9pZDogdGhpcy5fdWlkLFxuXHRcdFx0fSwgW1xuXHRcdFx0XHRlbChcIi5kaHhfc2xpZGVyX190cmFja1wiLCB7XG5cdFx0XHRcdF9yZWY6IFwidHJhY2tcIixcblx0XHRcdFx0b25tb3VzZW92ZXI6IHRoaXMuX2hhbmRsZXJzLm9ubW91c2VvdmVyLFxuXHRcdFx0XHRvbm1vdXNlb3V0OiB0aGlzLl9oYW5kbGVycy5vbm1vdXNlb3V0LFxuXHRcdFx0XHRvbmNsaWNrOiB0aGlzLl9oYW5kbGVycy5vbmNsaWNrXG5cdFx0XHR9LCBbXG5cdFx0XHRcdHRoaXMuX2dldERldGVjdG9yKCksXG5cdFx0XHRcdGVsKFwiZGl2XCIsIHtcblx0XHRcdFx0XHRfcmVmOiBcInJ1bm5lclwiLFxuXHRcdFx0XHRcdGNsYXNzOiB0aGlzLl9nZXRSdW5uZXJDc3MoKSxcblx0XHRcdFx0XHRvbm1vdXNlZG93bjogdGhpcy5faGFuZGxlcnMub25tb3VzZWRvd24sXG5cdFx0XHRcdFx0b25tb3VzZW1vdmU6IHRoaXMuX2hhbmRsZXJzLm9ubW91c2Vtb3ZlLFxuXHRcdFx0XHRcdG9uZm9jdXM6IHRoaXMuX2hhbmRsZXJzLm9uZm9jdXMsXG5cdFx0XHRcdFx0b25ibHVyOiB0aGlzLl9oYW5kbGVycy5vbmJsdXIsXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMuX2dldFJ1bm5lclN0eWxlKCksXG5cdFx0XHRcdFx0dGFiaW5kZXg6IDAsXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHR0aGlzLmNvbmZpZy50aHVtYkxhYmVsICYmICh0aGlzLl9tb3VzZUluIHx8IHRoaXMuX2ZvY3VzSW4gfHwgdGhpcy5faXNNb3VzZU1vdmluZykgPyB0aGlzLl9kcmF3VGh1bWJMYWJlbCgpIDogbnVsbCxcblx0XHRcdFx0dGhpcy5jb25maWcudGh1bWJMYWJlbCAmJiB0aGlzLmNvbmZpZy5yYW5nZSAmJiAodGhpcy5fbW91c2VJbiB8fCB0aGlzLl9mb2N1c0luIHx8IHRoaXMuX2lzTW91c2VNb3ZpbmcpID8gdGhpcy5fZHJhd1RodW1iTGFiZWwodHJ1ZSkgOiBudWxsLFxuXHRcdFx0XHR0aGlzLmNvbmZpZy5yYW5nZSA/IGVsKFwiZGl2XCIsIHtcblx0XHRcdFx0XHRfcmVmOiBcImV4dHJhUnVubmVyXCIsXG5cdFx0XHRcdFx0Y2xhc3M6IHRoaXMuX2dldFJ1bm5lckNzcyh0cnVlKSxcblx0XHRcdFx0XHRvbm1vdXNlZG93bjogdGhpcy5faGFuZGxlcnMub25tb3VzZWRvd24sXG5cdFx0XHRcdFx0b25tb3VzZW1vdmU6IHRoaXMuX2hhbmRsZXJzLm9ubW91c2Vtb3ZlLFxuXHRcdFx0XHRcdG9uZm9jdXM6IHRoaXMuX2hhbmRsZXJzLm9uZm9jdXMsXG5cdFx0XHRcdFx0b25ibHVyOiB0aGlzLl9oYW5kbGVycy5vbmJsdXIsXG5cdFx0XHRcdFx0c3R5bGU6IHRoaXMuX2dldFJ1bm5lclN0eWxlKHRydWUpLFxuXHRcdFx0XHRcdHRhYmluZGV4OiAwLFxuXHRcdFx0XHR9KSA6IG51bGwsXG5cdFx0XHRdKSxcblx0XHRcdHRoaXMuY29uZmlnLnRpY2sgPyB0aGlzLl9kcmF3VGlja3MoKSA6IG51bGxcblx0XHRdKTtcblx0fVxuXHRwcml2YXRlIF9nZXREZXRlY3RvcigpIHtcblx0XHRpZiAodGhpcy5fZGlzYWJsZWQpIHtcblx0XHRcdHJldHVybiBlbChcIi5kaHhfc2xpZGVyX19yYW5nZVwiKTtcblx0XHR9XG5cblx0XHRjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24uaG9yaXpvbnRhbCA/IFwibGVmdFwiIDogXCJ0b3BcIjtcblx0XHRjb25zdCBzaXplID0gdGhpcy5jb25maWcubW9kZSA9PT0gRGlyZWN0aW9uLmhvcml6b250YWwgPyBcIndpZHRoXCIgOiBcImhlaWdodFwiO1xuXHRcdGlmICh0aGlzLmNvbmZpZy5yYW5nZSkge1xuXHRcdFx0Y29uc3QgW21vcmUsIGxlc3NdID0gdGhpcy5fY3VycmVudFBvc2l0aW9uID4gdGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb24gP1xuXHRcdFx0XHRbdGhpcy5fY3VycmVudFBvc2l0aW9uLCB0aGlzLl9leHRyYUN1cnJlbnRQb3NpdGlvbl0gOiBbdGhpcy5fZXh0cmFDdXJyZW50UG9zaXRpb24sIHRoaXMuX2N1cnJlbnRQb3NpdGlvbl07XG5cdFx0XHRyZXR1cm4gZWwoXCIuZGh4X3NsaWRlcl9fcmFuZ2VcIiwge1xuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFtkaXJlY3Rpb25dOiBsZXNzICsgXCIlXCIsXG5cdFx0XHRcdFx0W3NpemVdOiBtb3JlIC0gbGVzcyArIFwiJVwiXG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH1cblx0XHRpZiAodGhpcy5faXNJbnZlcnNlKCkpIHtcblx0XHRcdHJldHVybiBlbChcIi5kaHhfc2xpZGVyX19yYW5nZVwiLCB7XG5cdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0W2RpcmVjdGlvbl06IHRoaXMuX2N1cnJlbnRQb3NpdGlvbiArIFwiJVwiLFxuXHRcdFx0XHRcdFtzaXplXTogMTAwIC0gdGhpcy5fY3VycmVudFBvc2l0aW9uICsgXCIlXCJcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiBlbChcIi5kaHhfc2xpZGVyX19yYW5nZVwiLCB7XG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRbZGlyZWN0aW9uXTogMCxcblx0XHRcdFx0W3NpemVdOiB0aGlzLl9jdXJyZW50UG9zaXRpb24gKyBcIiVcIlxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHByaXZhdGUgX2RyYXdUaHVtYkxhYmVsKGZvckV4dHJhOiBib29sZWFuID0gZmFsc2UpIHtcblx0XHRjb25zdCBwb3MgPSBmb3JFeHRyYSA/IHRoaXMuX2V4dHJhQ3VycmVudFBvc2l0aW9uIDogdGhpcy5fY3VycmVudFBvc2l0aW9uO1xuXHRcdGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuY29uZmlnLm1vZGUgPT09IERpcmVjdGlvbi5ob3Jpem9udGFsID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuXHRcdGxldCBjbGFzc05hbWVNb2RpZmllcnMgPSB0aGlzLmNvbmZpZy5tb2RlID09PSBEaXJlY3Rpb24uaG9yaXpvbnRhbCA/IFwiLmRoeF9zbGlkZXJfX3RodW1iLWxhYmVsLS1ob3Jpem9udGFsXCIgOiBcIi5kaHhfc2xpZGVyX190aHVtYi1sYWJlbC0tdmVydGljYWxcIjtcblx0XHRpZiAoKGZvckV4dHJhICYmIHRoaXMuX2lzRXh0cmFBY3RpdmUpIHx8ICghZm9yRXh0cmEgJiYgIXRoaXMuX2lzRXh0cmFBY3RpdmUpKSB7XG5cdFx0XHRjbGFzc05hbWVNb2RpZmllcnMgKz0gXCIuZGh4X3NsaWRlcl9fdGh1bWItbGFiZWwtLWFjdGl2ZVwiO1xuXHRcdH1cblx0XHRjb25zdCBzdHlsZSA9IHtcblx0XHRcdFtkaXJlY3Rpb25dOiBwb3MgKyBcIiVcIlxuXHRcdH07XG5cblx0XHRyZXR1cm4gZWwoXCIuZGh4X3NsaWRlcl9fdGh1bWItbGFiZWxcIiArIGNsYXNzTmFtZU1vZGlmaWVycywge1xuXHRcdFx0c3R5bGVcblx0XHR9LCB0aGlzLl9nZXRWYWx1ZShwb3MpKTtcblx0fVxuXHRwcml2YXRlIF9nZXRUaWNrcygpIHtcblx0XHRjb25zdCB7bWF4LCBtaW4sIHN0ZXAsIHRpY2ssIG1ham9yVGlja30gPSB0aGlzLmNvbmZpZztcblx0XHRjb25zdCBsZW4gPSBtYXggLSBtaW47XG5cdFx0Y29uc3QgdGlja0xlbmd0aCA9IChzdGVwICogdGljaykgLyBsZW47XG5cdFx0Y29uc3QgcG9zaXRpb25zID0gW107XG5cdFx0bGV0IGxlbmd0aCA9IDA7XG5cdFx0bGV0IGluZGV4ID0gMDtcblxuXHRcdHdoaWxlKGxlbmd0aCA8IDEpIHtcblx0XHRcdGNvbnN0IHRpY2tWYWx1ZSA9ICsobWluICsgbGVuZ3RoICogbGVuKS50b0ZpeGVkKDUpO1xuXHRcdFx0Y29uc3QgaXNNdWx0aXBsZSA9IGluZGV4ICUgbWFqb3JUaWNrID09PSAwO1xuXHRcdFx0cG9zaXRpb25zLnB1c2goe1xuXHRcdFx0XHRwb3NpdGlvbjogKHRoaXMuX2lzSW52ZXJzZSgpID8gKDEgLSBsZW5ndGgpICogMTAwIDogbGVuZ3RoICogMTAwKSArIFwiJVwiLFxuXHRcdFx0XHRpc011bHRpcGxlLFxuXHRcdFx0XHRsYWJlbDogaXNNdWx0aXBsZSAmJiB0eXBlb2YgdGhpcy5jb25maWcudGlja1RlbXBsYXRlID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLmNvbmZpZy50aWNrVGVtcGxhdGUodGlja1ZhbHVlKSA6IG51bGxcblx0XHRcdH0pO1xuXHRcdFx0bGVuZ3RoICs9IHRpY2tMZW5ndGg7XG5cdFx0XHRpbmRleCArKztcblx0XHR9XG5cdFx0cG9zaXRpb25zLnB1c2goe1xuXHRcdFx0cG9zaXRpb246ICh0aGlzLl9pc0ludmVyc2UoKSA/IDAgOiAxMDApICsgXCIlXCIsXG5cdFx0XHRpc011bHRpcGxlOiB0cnVlLFxuXHRcdFx0bGFiZWw6IHR5cGVvZiB0aGlzLmNvbmZpZy50aWNrVGVtcGxhdGUgPT09IFwiZnVuY3Rpb25cIiA/XG5cdFx0XHRcdHRoaXMuY29uZmlnLnRpY2tUZW1wbGF0ZShtYXgpIDogbnVsbFxuXHRcdH0pO1xuXHRcdHJldHVybiBwb3NpdGlvbnM7XG5cdH1cblx0cHJpdmF0ZSBfZHJhd1RpY2tzKCkge1xuXHRcdGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuY29uZmlnLm1vZGUgPT09IERpcmVjdGlvbi5ob3Jpem9udGFsID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuXHRcdHJldHVybiBlbChcIi5kaHhfc2xpZGVyX190aWNrcy1ob2xkZXJcIixcblx0XHRcdHRoaXMuX2dldFRpY2tzKCkubWFwKHRpY2sgPT4gZWwoXCJkaXZcIiwge1xuXHRcdFx0XHRjbGFzczogXCJkaHhfc2xpZGVyX190aWNrXCIgKyAodGljay5pc011bHRpcGxlID8gXCIgZGh4X3NsaWRlcl9fdGljay0tbWFqb3JcIiA6IFwiXCIpLFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFtkaXJlY3Rpb25dOiB0aWNrLnBvc2l0aW9uXG5cdFx0XHRcdH1cblx0XHRcdH0sIHRpY2subGFiZWwgIT09IHVuZGVmaW5lZCA/IFtcblx0XHRcdFx0ZWwoXCIuZGh4X3NsaWRlcl9fdGljay1sYWJlbFwiLCB0aWNrLmxhYmVsKVxuXHRcdFx0XSA6IG51bGwpXG5cdFx0KSk7XG5cdH1cblx0cHJpdmF0ZSBfaXNOdWxsYWJsZSh2YWx1ZSkge1xuXHRcdGlmICh0aGlzLl9pc0ludmVyc2UoKSkge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSAxMDA7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gMDtcblx0XHR9XG5cdH1cbn0iLCJleHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuXHR2ZXJ0aWNhbCA9IFwidmVydGljYWxcIixcblx0aG9yaXpvbnRhbCA9IFwiaG9yaXpvbnRhbFwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsaWRlciB7XG5cdGNvbmZpZzogSVNsaWRlckNvbmZpZztcblx0Z2V0VmFsdWUoYXNBcnJheT86IGJvb2xlYW4pOiBudW1iZXJbXSB8IHN0cmluZztcblx0c2V0VmFsdWUodmFsOiBudW1iZXIgfCBudW1iZXJbXSk6IHZvaWQ7XG59XG5cbmV4cG9ydCBlbnVtIFNsaWRlckV2ZW50cyB7XG5cdGNoYW5nZSA9IFwiY2hhbmdlXCIsXG5cdG1vdXNlZG93biA9IFwibW91c2Vkb3duXCIsXG5cdG1vdXNldXAgPSBcIm1vdXNldXBcIlxufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNsaWRlckNvbmZpZyB7XG5cdG1pbjogbnVtYmVyO1xuXHRtYXg6IG51bWJlcjtcblx0c3RlcDogbnVtYmVyO1xuXHRtb2RlPzogRGlyZWN0aW9uO1xuXHRyYW5nZT86IGJvb2xlYW47XG5cdHZhbHVlPzogbnVtYmVyW10gfCBudW1iZXIgfCBzdHJpbmc7XG5cdGludmVyc2U/OiBib29sZWFuO1xuXHR0aHVtYkxhYmVsPzogYm9vbGVhbjtcblx0Y3NzPzogc3RyaW5nO1xuXHR0aWNrPzogbnVtYmVyO1xuXHR0aWNrVGVtcGxhdGU/OiAocG9zaXRpb246IG51bWJlcikgPT4gc3RyaW5nO1xuXHRtYWpvclRpY2s/OiBudW1iZXI7XG5cdGxhYmVsPzogc3RyaW5nO1xuXHRyZXF1YXJlZD86IGJvb2xlYW47XG5cdGhlbHA/OiBzdHJpbmc7XG5cdGxhYmVsSW5saW5lPzogYm9vbGVhbjtcblx0bGFiZWxXaWR0aD86IHN0cmluZztcblx0aGlkZGVuTGFiZWw/OiBib29sZWFuO1xufSIsImltcG9ydCB7IGV4dGVuZCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9jb3JlXCI7XG5pbXBvcnQgeyBjcmVhdGUsIGVsIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2RvbVwiO1xuaW1wb3J0IHsgRXZlbnRTeXN0ZW0sIElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IElIYW5kbGVycyB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsgVmlldywgdG9WaWV3TGlrZSwgSVZpZXcsIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3ZpZXdcIjtcbmltcG9ydCB7IExheW91dCB9IGZyb20gXCJAZGh4L3RzLWxheW91dFwiO1xuaW1wb3J0IHsgU2xpZGVyLCBTbGlkZXJFdmVudHMgfSBmcm9tIFwiQGRoeC90cy1zbGlkZXJcIjtcbmltcG9ydCBsb2NhbGUgZnJvbSBcIi4vbG9jYWxlcy9lblwiO1xuaW1wb3J0IHsgVGltZXBpY2tlckV2ZW50cywgSVRpbWVwaWNrZXJDb25maWcsIElUaW1lcGlja2VyLCBJVGltZU9iamVjdCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyIGV4dGVuZHMgVmlldyBpbXBsZW1lbnRzIElUaW1lcGlja2VyIHtcblx0cHVibGljIGNvbmZpZzogSVRpbWVwaWNrZXJDb25maWc7XG5cdHB1YmxpYyBldmVudHM6IElFdmVudFN5c3RlbTxUaW1lcGlja2VyRXZlbnRzPjtcblxuXHRwdWJsaWMgbGF5b3V0OiBMYXlvdXQ7XG5cblx0cHJpdmF0ZSBfaG91cnNTbGlkZXI6IFNsaWRlcjtcblx0cHJpdmF0ZSBfbWludXRlc1NsaWRlcjogU2xpZGVyO1xuXG5cdHByaXZhdGUgX2lucHV0c1ZpZXc6IElWaWV3O1xuXG5cdHByaXZhdGUgX3RpbWU6IHtcblx0XHRoOiBudW1iZXIsXG5cdFx0bTogbnVtYmVyO1xuXHRcdGlzQU06IGJvb2xlYW47XG5cdH07XG5cblx0cHJpdmF0ZSBfaGFuZGxlcnM6IElIYW5kbGVycztcblx0cHJpdmF0ZSBfb3V0ZXJIYW5kbGVycztcblxuXHRjb25zdHJ1Y3Rvcihjb250YWluZXI6IEhUTUxFbGVtZW50IHwgc3RyaW5nLCBjb25maWc6IElUaW1lcGlja2VyQ29uZmlnID0ge30pIHtcblx0XHRzdXBlcihjb250YWluZXIsIGV4dGVuZCh7XG5cdFx0XHR0aW1lRm9ybWF0OiAyNCxcblx0XHRcdGFjdGlvbnM6IGZhbHNlXG5cdFx0fSwgY29uZmlnKSk7XG5cblx0XHR0aGlzLmV2ZW50cyA9IG5ldyBFdmVudFN5c3RlbSh0aGlzKTtcblxuXHRcdHRoaXMuX3RpbWUgPSB7XG5cdFx0XHRoOiAwLFxuXHRcdFx0bTogMCxcblx0XHRcdGlzQU06IHRydWVcblx0XHR9O1xuXHRcdGlmICh0aGlzLmNvbmZpZy50aW1lRm9ybWF0ID09PSAxMikge1xuXHRcdFx0dGhpcy5fdGltZS5oID0gMTI7XG5cdFx0fVxuXHRcdHRoaXMuX2luaXRVSShjb250YWluZXIpO1xuXHRcdHRoaXMuX2luaXRIYW5kbGVycygpO1xuXHRcdHRoaXMuX2luaXRFdmVudHMoKTtcblx0fVxuXHRnZXRWYWx1ZTxUIGV4dGVuZHMgYm9vbGVhbiA9IGZhbHNlPihhc09CamVjdD86IFQpOiBUIGV4dGVuZHMgdHJ1ZSA/IElUaW1lT2JqZWN0IDogc3RyaW5nIHtcblx0XHRjb25zdCB7aCwgbSwgaXNBTX0gPSB0aGlzLl90aW1lO1xuXHRcdGlmIChhc09CamVjdCkge1xuXHRcdFx0Y29uc3Qgb2JqOiB7aG91cjogbnVtYmVyLCBtaW51dGU6IG51bWJlciwgQU0/OiBib29sZWFufSA9IHtcblx0XHRcdFx0aG91cjogaCxcblx0XHRcdFx0bWludXRlOiBtXG5cdFx0XHR9O1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVGb3JtYXQgPT09IDEyKSB7XG5cdFx0XHRcdG9iai5BTSA9IGlzQU07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb2JqIGFzIGFueTtcblx0XHR9XG5cdFx0cmV0dXJuIChoIDwgMTAgPyBcIjBcIiArIGggOiBoKSArIFwiOlwiICsgKG0gPCAxMCA/IFwiMFwiICsgbSA6IG0pICsgKHRoaXMuY29uZmlnLnRpbWVGb3JtYXQgPT09IDEyID8gKGlzQU0gPyBcIkFNXCIgOiBcIlBNXCIpIDogXCJcIikgYXMgYW55O1xuXHR9XG5cdHNldFZhbHVlKHZhbHVlOiBEYXRlIHwgbnVtYmVyIHwgc3RyaW5nIHwgYW55W10pIHtcblx0XHRsZXQgbTogbnVtYmVyO1xuXHRcdGxldCBoOiBudW1iZXI7XG5cdFx0bGV0IGlzUE06IGJvb2xlYW47XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJudW1iZXJcIikge1xuXHRcdFx0dmFsdWUgPSBuZXcgRGF0ZSh2YWx1ZSk7XG5cdFx0fVxuXHRcdGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdG0gPSB2YWx1ZS5nZXRNaW51dGVzKCk7XG5cdFx0XHRoID0gdmFsdWUuZ2V0SG91cnMoKTtcblx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRoID0gdmFsaWRhdGUodmFsdWVbMF0sIDIzKTtcblx0XHRcdG0gPSB2YWxpZGF0ZSh2YWx1ZVsxXSwgNTkpO1xuXHRcdFx0aWYgKHZhbHVlWzJdICYmIHZhbHVlWzJdLnRvTG93ZXJDYXNlKCkgPT09IFwicG1cIikge1xuXHRcdFx0XHRpc1BNID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgbWF0Y2hlcyA9IHZhbHVlLm1hdGNoKC9cXGQrL2cpO1xuXHRcdFx0aCA9IHZhbGlkYXRlKCttYXRjaGVzWzBdLCAyMyk7XG5cdFx0XHRtID0gdmFsaWRhdGUoK21hdGNoZXNbMV0sIDU5KTtcblx0XHRcdGlmICh2YWx1ZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJwbVwiKSAhPT0gLTEpIHtcblx0XHRcdFx0aXNQTSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChpc1BNICYmIGggPCAxMikge1xuXHRcdFx0aCArPSAxMjtcblx0XHR9XG5cdFx0dGhpcy5faG91cnNTbGlkZXIuc2V0VmFsdWUoaCk7XG5cdFx0dGhpcy5fbWludXRlc1NsaWRlci5zZXRWYWx1ZShtKTtcblxuXHRcdHRoaXMuX2lucHV0c1ZpZXcucGFpbnQoKTtcblx0fVxuXHRkZXN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX21pbnV0ZXNTbGlkZXIuZGVzdHJ1Y3RvcigpO1xuXHRcdHRoaXMuX2hvdXJzU2xpZGVyLmRlc3RydWN0b3IoKTtcblx0XHR0aGlzLmV2ZW50cy5jbGVhcigpO1xuXHRcdHRoaXMudW5tb3VudCgpO1xuXHR9XG5cdGdldFJvb3RWaWV3KCkge1xuXHRcdHJldHVybiB0aGlzLmxheW91dC5nZXRSb290VmlldygpO1xuXHR9XG5cdHByaXZhdGUgX2luaXRVSShjb250YWluZXIpIHtcblx0XHRjb25zdCBsYXlvdXRDb25maWcgPSB7XG5cdFx0XHRncmF2aXR5OiBmYWxzZSxcblx0XHRcdGNzczogXCJkaHhfdGltZXBpY2tlciBcIiArXG5cdFx0XHQodGhpcy5jb25maWcuY3NzID8gdGhpcy5jb25maWcuY3NzIDogXCJcIikgK1xuXHRcdFx0KHRoaXMuY29uZmlnLmFjdGlvbnMgPyBcIiBkaHhfdGltZXBpY2tlci0td2l0aC1hY3Rpb25zXCIgOiBcIlwiKSxcblx0XHRcdHJvd3M6IFtcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlkOiBcInRpbWVwaWNrZXJcIixcblx0XHRcdFx0XHRjc3M6IFwiZGh4X3RpbWVwaWNrZXJfX2lucHV0c1wiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogXCJob3VyLXNsaWRlclwiLFxuXHRcdFx0XHRcdGNzczogXCJkaHhfdGltZXBpY2tlcl9faG91clwiXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogXCJtaW51dGUtc2xpZGVyXCIsXG5cdFx0XHRcdFx0Y3NzOiBcImRoeF90aW1lcGlja2VyX19taW51dGVcIlxuXHRcdFx0XHR9XG5cdFx0XHRdXG5cdFx0fTtcblx0XHRpZiAodGhpcy5jb25maWcuYWN0aW9ucykge1xuXHRcdFx0bGF5b3V0Q29uZmlnLnJvd3MudW5zaGlmdCh7XG5cdFx0XHRcdGlkOiBcImNsb3NlLWFjdGlvblwiLFxuXHRcdFx0XHRjc3M6IFwiZGh4X3RpbWVwaWNrZXJfX2Nsb3NlXCJcblx0XHRcdH0pO1xuXHRcdFx0bGF5b3V0Q29uZmlnLnJvd3MucHVzaCh7XG5cdFx0XHRcdGlkOiBcInNhdmUtYWN0aW9uXCIsXG5cdFx0XHRcdGNzczogXCJkaHhfdGltZXBpY2tlcl9fc2F2ZVwiXG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQgPSBuZXcgTGF5b3V0KGNvbnRhaW5lciwgbGF5b3V0Q29uZmlnKTtcblxuXHRcdGNvbnN0IHRpbWVwaWNrZXIgPSBjcmVhdGUoe1xuXHRcdFx0cmVuZGVyOiAoKSA9PiB0aGlzLl9kcmF3KClcblx0XHR9KTtcblx0XHRjb25zdCBpbnB1dHNWaWV3ID0gdGhpcy5faW5wdXRzVmlldyA9IHRvVmlld0xpa2UodGltZXBpY2tlcik7XG5cblx0XHRjb25zdCBtU2xpZGVyID0gdGhpcy5fbWludXRlc1NsaWRlciA9IG5ldyBTbGlkZXIobnVsbCwge1xuXHRcdFx0bWluOiAwLFxuXHRcdFx0bWF4OiA1OSxcblx0XHRcdHN0ZXA6IDEsXG5cdFx0XHR0aHVtYkxhYmVsOiBmYWxzZSxcblx0XHRcdGxhYmVsSW5saW5lOiBmYWxzZSxcblx0XHRcdGxhYmVsOiBsb2NhbGUubWludXRlc1xuXHRcdH0pO1xuXG5cdFx0Y29uc3QgaFNsaWRlciA9IHRoaXMuX2hvdXJzU2xpZGVyID0gbmV3IFNsaWRlcihudWxsLCB7XG5cdFx0XHRtaW46IDAsXG5cdFx0XHRtYXg6IDIzLFxuXHRcdFx0c3RlcDogMSxcblx0XHRcdHRodW1iTGFiZWw6IGZhbHNlLFxuXHRcdFx0bGFiZWxJbmxpbmU6IGZhbHNlLFxuXHRcdFx0bGFiZWw6IGxvY2FsZS5ob3Vyc1xuXHRcdH0pO1xuXG5cdFx0bGF5b3V0LmNlbGwoXCJ0aW1lcGlja2VyXCIpLmF0dGFjaChpbnB1dHNWaWV3KTtcblx0XHRsYXlvdXQuY2VsbChcImhvdXItc2xpZGVyXCIpLmF0dGFjaChoU2xpZGVyKTtcblx0XHRsYXlvdXQuY2VsbChcIm1pbnV0ZS1zbGlkZXJcIikuYXR0YWNoKG1TbGlkZXIpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmFjdGlvbnMpIHtcblx0XHRcdGNvbnN0IHNhdmUgPSAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiBlbChcImJ1dHRvbi5kaHhfdGltZXBpY2tlcl9fYnV0dG9uLXNhdmUuZGh4X2J1dHRvbi5kaHhfYnV0dG9uLS12aWV3X2ZsYXQuZGh4X2J1dHRvbi0tY29sb3JfcHJpbWFyeS5kaHhfYnV0dG9uLS1zaXplX21lZGl1bS5kaHhfYnV0dG9uLS1jaXJjbGUuZGh4X2J1dHRvbi0td2lkdGhfZnVsbFwiLFxuXHRcdFx0XHR7IG9uY2xpY2s6IHRoaXMuX291dGVySGFuZGxlcnMuc2F2ZSB9LCBsb2NhbGUuc2F2ZSk7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgY2xvc2UgPSAoKSA9PiB7XG5cdFx0XHRcdHJldHVybiBlbChcImJ1dHRvbi5kaHhfdGltZXBpY2tlcl9fYnV0dG9uLWNsb3NlLmRoeF9idXR0b24uZGh4X2J1dHRvbi0tdmlld19saW5rLmRoeF9idXR0b24tLXNpemVfbWVkaXVtLmRoeF9idXR0b24tLXZpZXdfbGluay5kaHhfYnV0dG9uLS1jb2xvcl9zZWNvbmRhcnkuZGh4X2J1dHRvbi0taWNvbi5kaHhfYnV0dG9uLS1jaXJjbGVcIixcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG9uY2xpY2s6IHRoaXMuX291dGVySGFuZGxlcnMuY2xvc2Vcblx0XHRcdFx0fSwgW2VsKFwic3Bhbi5kaHhfYnV0dG9uX19pY29uLmR4aS5keGktY2xvc2VcIildKTtcblx0XHRcdH07XG5cdFx0XHRsYXlvdXQuY2VsbChcInNhdmUtYWN0aW9uXCIpLmF0dGFjaChzYXZlKTtcblx0XHRcdGxheW91dC5jZWxsKFwiY2xvc2UtYWN0aW9uXCIpLmF0dGFjaChjbG9zZSk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2luaXRIYW5kbGVycygpIHtcblx0XHR0aGlzLl9oYW5kbGVycyA9IHtcblx0XHRcdG9uY2hhbmdlOiB7XG5cdFx0XHRcdFwiLmRoeF90aW1lcGlja2VyLWlucHV0LS1ob3VyXCI6IGUgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGhvdXIgPSB2YWxpZGF0ZShwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApLCAyMyk7XG5cdFx0XHRcdFx0ZS50YXJnZXQudmFsdWUgPSBob3VyO1xuXHRcdFx0XHRcdHRoaXMuX2hvdXJzU2xpZGVyLnNldFZhbHVlKGhvdXIpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIi5kaHhfdGltZXBpY2tlci1pbnB1dC0tbWludXRlc1wiOiBlID0+IHtcblx0XHRcdFx0XHRjb25zdCBtaW4gPSB2YWxpZGF0ZShwYXJzZUludChlLnRhcmdldC52YWx1ZSwgMTApLCA1OSk7XG5cdFx0XHRcdFx0ZS50YXJnZXQudmFsdWUgPSBtaW47XG5cdFx0XHRcdFx0dGhpcy5fbWludXRlc1NsaWRlci5zZXRWYWx1ZShtaW4pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLl9vdXRlckhhbmRsZXJzID0ge1xuXHRcdFx0Y2xvc2U6ICgpID0+IHRoaXMuZXZlbnRzLmZpcmUoVGltZXBpY2tlckV2ZW50cy5jbG9zZSksXG5cdFx0XHRzYXZlOiAoKSA9PiB0aGlzLmV2ZW50cy5maXJlKFRpbWVwaWNrZXJFdmVudHMuc2F2ZSwgW3RoaXMuX3RpbWVdKVxuXHRcdH07XG5cdH1cblx0cHJpdmF0ZSBfaW5pdEV2ZW50cygpIHtcblx0XHR0aGlzLl9ob3Vyc1NsaWRlci5ldmVudHMub24oU2xpZGVyRXZlbnRzLmNoYW5nZSwgdmFsdWUgPT4ge1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLnRpbWVGb3JtYXQgPT09IDEyKSB7XG5cdFx0XHRcdHRoaXMuX3RpbWUuaXNBTSA9IHZhbHVlIDwgMTI7XG5cdFx0XHRcdHRoaXMuX3RpbWUuaCA9IHZhbHVlICUgMTIgfHwgMTI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aGlzLl90aW1lLmggPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShUaW1lcGlja2VyRXZlbnRzLmNoYW5nZSwgW3RoaXMuZ2V0VmFsdWUoKV0pO1xuXHRcdFx0dGhpcy5faW5wdXRzVmlldy5wYWludCgpO1xuXHRcdH0pO1xuXHRcdHRoaXMuX21pbnV0ZXNTbGlkZXIuZXZlbnRzLm9uKFNsaWRlckV2ZW50cy5jaGFuZ2UsIHZhbHVlID0+IHtcblx0XHRcdHRoaXMuX3RpbWUubSA9IHZhbHVlO1xuXG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKFRpbWVwaWNrZXJFdmVudHMuY2hhbmdlLCBbdGhpcy5nZXRWYWx1ZSgpXSk7XG5cdFx0XHR0aGlzLl9pbnB1dHNWaWV3LnBhaW50KCk7XG5cdFx0fSk7XG5cdH1cblx0cHJpdmF0ZSBfZHJhdygpIHtcblx0XHRyZXR1cm4gZWwoXCIuZGh4X3RpbWVwaWNrZXItaW5wdXRzXCIsIHtcblx0XHRcdC4uLnRoaXMuX2hhbmRsZXJzXG5cdFx0fSwgW1xuXHRcdFx0ZWwoXCJpbnB1dC5kaHhfdGltZXBpY2tlci1pbnB1dC5kaHhfdGltZXBpY2tlci1pbnB1dC0taG91clwiLCB7XG5cdFx0XHRcdF9rZXk6IFwiaG91clwiLFxuXHRcdFx0XHR2YWx1ZTogdGhpcy5fdGltZS5oIDwgMTAgPyBcIjBcIiArIHRoaXMuX3RpbWUuaCA6IHRoaXMuX3RpbWUuaFxuXHRcdFx0fSksXG5cdFx0XHRlbChcInNwYW4uZGh4X3RpbWVwaWNrZXItZGVsaW1lclwiLCBcIjpcIiksXG5cdFx0XHRlbChcImlucHV0LmRoeF90aW1lcGlja2VyLWlucHV0LmRoeF90aW1lcGlja2VyLWlucHV0LS1taW51dGVzXCIsIHtcblx0XHRcdFx0X2tleTogXCJtaW51dGVcIixcblx0XHRcdFx0dmFsdWU6IHRoaXMuX3RpbWUubSA8IDEwID8gXCIwXCIgKyB0aGlzLl90aW1lLm0gOiB0aGlzLl90aW1lLm1cblx0XHRcdH0pLFxuXHRcdFx0dGhpcy5jb25maWcudGltZUZvcm1hdCA9PT0gMTIgPyBlbChcIi5kaHhfdGltZXBpY2tlci1hbXBtXCIsIHRoaXMuX3RpbWUuaXNBTSA/IFwiQU1cIiA6IFwiUE1cIikgOiBudWxsXG5cdFx0XSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGUodmFsdWU6IG51bWJlciwgbWF4OiBudW1iZXIpOiBudW1iZXIge1xuXHRpZiAoaXNOYU4odmFsdWUpKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblx0cmV0dXJuIE1hdGgubWluKG1heCwgTWF0aC5tYXgoMCwgdmFsdWUpKTtcbn0iLCJpbXBvcnQgXCIuLi8uLi9zdHlsZXMvdGltZXBpY2tlci5zY3NzXCI7XG5leHBvcnQge1RpbWVwaWNrZXJ9IGZyb20gXCIuL1RpbWVwaWNrZXJcIjtcbmltcG9ydCBsb2NhbGUgZnJvbSBcIi4vbG9jYWxlcy9lblwiO1xuXG5jb25zdCB3ID0gd2luZG93IGFzIGFueTtcbmV4cG9ydCBjb25zdCBpMThuOiBhbnkgPSAody5kaHggJiYgdy5kaHguaTE4bikgPyB3LmRoeC5pMTggOiB7fTtcbmkxOG4uc2V0TG9jYWxlID0gZnVuY3Rpb24oY29tcG9uZW50OiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcblx0Y29uc3QgdGFyZ2V0ID0gaTE4bltjb21wb25lbnRdO1xuXHRmb3IgKGNvbnN0IGtleSBpbiB2YWx1ZSkge1xuXHRcdHRhcmdldFtrZXldID0gdmFsdWVba2V5XTtcblx0fVxufTtcbmkxOG4udGltZXBpY2tlciA9IGkxOG4udGltZXBpY2tlciB8fCBsb2NhbGU7IiwiY29uc3QgbG9jYWxlID0ge1xuXHRob3VyczogXCJIb3Vyc1wiLFxuXHRtaW51dGVzOiBcIk1pbnV0ZXNcIixcblx0c2F2ZTogXCJzYXZlXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGxvY2FsZTsiLCJpbXBvcnQgeyBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5pbXBvcnQgeyBMYXlvdXQgfSBmcm9tIFwiQGRoeC90cy1sYXlvdXRcIjtcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcblxuZXhwb3J0IGVudW0gVGltZXBpY2tlckV2ZW50cyB7XG5cdGNoYW5nZSA9IFwiY2hhbmdlXCIsXG5cdHNhdmUgPSBcInNhdmVcIixcblx0Y2xvc2UgPSBcImNsb3NlXCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVGltZXBpY2tlckNvbmZpZyB7XG5cdGNzcz86IHN0cmluZztcblx0dGltZUZvcm1hdD86IDEyIHwgMjQ7XG5cdGFjdGlvbnM/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElUaW1lcGlja2VyIHtcblx0Y29uZmlnOiBJVGltZXBpY2tlckNvbmZpZztcblx0ZXZlbnRzOiBJRXZlbnRTeXN0ZW08VGltZXBpY2tlckV2ZW50cz47XG5cblx0bGF5b3V0OiBMYXlvdXQ7XG5cblx0Z2V0VmFsdWUoYXNPQmplY3Q/OiBib29sZWFuKTogSUFueU9iaiB8IHN0cmluZztcblx0c2V0VmFsdWUodmFsdWU6IERhdGUgfCBudW1iZXIgfCBzdHJpbmcgfCBhbnlbXSk6IHZvaWQ7XG5cdGRlc3RydWN0b3IoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJVGltZU9iamVjdCB7XG5cdGhvdXI6IG51bWJlcjtcblx0bWludXRlOiBudW1iZXI7XG5cdEFNPzogYm9vbGVhbjtcbn0iXSwic291cmNlUm9vdCI6IiJ9