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
/******/ 	return __webpack_require__(__webpack_require__.s = "../ts-list/sources/entry.ts");
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

/***/ "../styles/list.scss":
/*!***************************!*\
  !*** ../styles/list.scss ***!
  \***************************/
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

/***/ "../ts-common/types.ts":
/*!*****************************!*\
  !*** ../ts-common/types.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SelectionEvents;
(function (SelectionEvents) {
    SelectionEvents["beforeUnSelect"] = "beforeunselect";
    SelectionEvents["afterUnSelect"] = "afterunselect";
    SelectionEvents["beforeSelect"] = "beforeselect";
    SelectionEvents["afterSelect"] = "afterselect";
})(SelectionEvents = exports.SelectionEvents || (exports.SelectionEvents = {}));


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

/***/ "../ts-data/index.ts":
/*!***************************!*\
  !*** ../ts-data/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/types */ "../ts-data/sources/types.ts"));
__export(__webpack_require__(/*! ./sources/datacollection */ "../ts-data/sources/datacollection.ts"));
__export(__webpack_require__(/*! ./sources/treecollection */ "../ts-data/sources/treecollection.ts"));
__export(__webpack_require__(/*! ./sources/DragManager */ "../ts-data/sources/DragManager.ts"));
__export(__webpack_require__(/*! ./sources/dataproxy */ "../ts-data/sources/dataproxy.ts"));
__export(__webpack_require__(/*! ./sources/helpers */ "../ts-data/sources/helpers.ts"));
__export(__webpack_require__(/*! ./sources/drivers/CsvDriver */ "../ts-data/sources/drivers/CsvDriver.ts"));
__export(__webpack_require__(/*! ./sources/drivers/JsonDriver */ "../ts-data/sources/drivers/JsonDriver.ts"));
__export(__webpack_require__(/*! ./sources/selection */ "../ts-data/sources/selection.ts"));
__export(__webpack_require__(/*! ./sources/drivers/drivers */ "../ts-data/sources/drivers/drivers.ts"));


/***/ }),

/***/ "../ts-data/sources/CollectionStore.ts":
/*!*********************************************!*\
  !*** ../ts-data/sources/CollectionStore.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CollectionStore = /** @class */ (function () {
    function CollectionStore() {
        this._store = {};
    }
    CollectionStore.prototype.setItem = function (id, target) {
        this._store[id] = target;
    };
    CollectionStore.prototype.getItem = function (id) {
        if (!this._store[id]) {
            return null;
        }
        return this._store[id];
    };
    return CollectionStore;
}());
var dhx = window.dhxHelpers = window.dhxHelpers || {};
dhx.collectionStore = dhx.collectionStore || new CollectionStore();
exports.collectionStore = dhx.collectionStore;


/***/ }),

/***/ "../ts-data/sources/DragManager.ts":
/*!*****************************************!*\
  !*** ../ts-data/sources/DragManager.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var CollectionStore_1 = __webpack_require__(/*! ./CollectionStore */ "../ts-data/sources/CollectionStore.ts");
var types_1 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
var helpers_1 = __webpack_require__(/*! ./helpers */ "../ts-data/sources/helpers.ts");
function getPosition(e) {
    var y = e.clientY;
    var element = html_1.locateNode(e);
    if (!element) {
        return null;
    }
    var treeLine = element.childNodes[0];
    var _a = treeLine.getBoundingClientRect(), top = _a.top, height = _a.height;
    return (y - top) / height;
}
function dragEventContent(element) {
    var rect = element.getBoundingClientRect();
    var ghost = document.createElement("div");
    var clone = element.cloneNode(true);
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    ghost.appendChild(clone);
    ghost.className = "dhx_drag-ghost";
    ghost.style.position = "absolute";
    ghost.style.pointerEvents = "none";
    return ghost;
}
var DragManager = /** @class */ (function () {
    function DragManager() {
        var _this = this;
        this._transferData = {};
        this._canMove = true;
        this._onMouseMove = function (e) {
            if (!_this._transferData.id) {
                return;
            }
            var pageX = e.pageX, pageY = e.pageY;
            if (!_this._transferData.ghost) {
                if (Math.abs(_this._transferData.x - pageX) < 3 && Math.abs(_this._transferData.y - pageY) < 3) {
                    return;
                }
                else {
                    var ghost = _this._onDragStart(_this._transferData.id, _this._transferData.targetId);
                    if (!ghost) {
                        _this._endDrop();
                        return;
                    }
                    else {
                        _this._transferData.ghost = ghost;
                        document.body.appendChild(_this._transferData.ghost);
                    }
                }
            }
            _this._moveGhost(pageX, pageY);
            _this._onDrag(e);
        };
        this._onMouseUp = function () {
            if (!_this._transferData.x) {
                return;
            }
            if (_this._transferData.ghost) {
                _this._removeGhost();
                _this._onDrop();
            }
            else {
                _this._endDrop();
            }
            document.removeEventListener("mousemove", _this._onMouseMove);
            document.removeEventListener("mouseup", _this._onMouseUp);
        };
    }
    DragManager.prototype.setItem = function (id, item) {
        CollectionStore_1.collectionStore.setItem(id, item);
    };
    DragManager.prototype.onMouseDown = function (e) {
        if (e.which !== 1) {
            return;
        }
        e.preventDefault();
        document.addEventListener("mousemove", this._onMouseMove);
        document.addEventListener("mouseup", this._onMouseUp);
        var item = html_1.locateNode(e, "dhx_id");
        var id = item && item.getAttribute("dhx_id");
        var targetId = html_1.locate(e, "dhx_widget_id");
        if (id && targetId) {
            var _a = html_1.getBox(item), left = _a.left, top_1 = _a.top;
            this._transferData.initXOffset = e.pageX - left;
            this._transferData.initYOffset = e.pageY - top_1;
            this._transferData.x = e.pageX;
            this._transferData.y = e.pageY;
            this._transferData.targetId = targetId;
            this._transferData.id = id;
            this._transferData.item = item;
        }
    };
    DragManager.prototype._moveGhost = function (x, y) {
        if (this._transferData.ghost) {
            this._transferData.ghost.style.left = x - this._transferData.initXOffset + "px";
            this._transferData.ghost.style.top = y - this._transferData.initYOffset + "px";
        }
    };
    DragManager.prototype._removeGhost = function () {
        document.body.removeChild(this._transferData.ghost);
    };
    DragManager.prototype._onDrop = function () {
        if (!this._canMove) {
            this._endDrop();
            return;
        }
        var target = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        var config = target && target.config;
        if (!target || config.dragMode === types_1.DragMode.source) {
            this._endDrop();
            return;
        }
        if (target.events.fire(types_1.DragEvents.beforeDrop, [this._lastId, this._transferData.target])) {
            var to = {
                id: this._lastId,
                target: target
            };
            var from = {
                id: this._transferData.id,
                target: this._transferData.target
            };
            this._move(from, to);
            to.target.events.fire(types_1.DragEvents.dropComplete, [to.id, this._transferData.dropPosition]);
        }
        this._endDrop();
    };
    DragManager.prototype._onDragStart = function (id, targetId) {
        var target = CollectionStore_1.collectionStore.getItem(targetId);
        var config = target.config;
        if (config.dragMode === types_1.DragMode.target) {
            return null;
        }
        var item = target.data.getItem(id);
        var ghost = dragEventContent(this._transferData.item);
        var ans = target.events.fire(types_1.DragEvents.beforeDrag, [item, ghost]);
        if (!ans || !id) {
            return null;
        }
        target.events.fire(types_1.DragEvents.dragStart, [id]);
        this._toggleTextSelection(true);
        this._transferData.target = target;
        this._transferData.dragConfig = config;
        return ghost;
    };
    DragManager.prototype._onDrag = function (e) {
        var clientX = e.clientX, clientY = e.clientY;
        var element = document.elementFromPoint(clientX, clientY);
        var collectionId = html_1.locate(element, "dhx_widget_id");
        if (!collectionId) {
            if (this._canMove) {
                this._cancelCanDrop();
            }
            return;
        }
        var target = CollectionStore_1.collectionStore.getItem(collectionId);
        var id = html_1.locate(element, "dhx_id");
        if (!id) {
            this._cancelCanDrop();
            this._lastCollectionId = collectionId;
            this._lastId = null;
            this._canDrop();
            return;
        }
        if (target.config.dropBehaviour === types_1.DropBehaviour.complex) {
            var pos = getPosition(e);
            if (pos <= 0.25) {
                this._transferData.dropPosition = types_1.DropPosition.top;
            }
            else if (pos >= 0.75) {
                this._transferData.dropPosition = types_1.DropPosition.bot;
            }
            else {
                this._transferData.dropPosition = types_1.DropPosition.in;
            }
        }
        else if (this._lastId === id && this._lastCollectionId === collectionId) {
            return;
        }
        var from = {
            id: this._transferData.id,
            target: this._transferData.target
        };
        if (target.config.dragMode === "source") {
            return;
        }
        from.target.events.fire(types_1.DragEvents.dragOut, [id, target]);
        if (collectionId !== this._transferData.targetId || !helpers_1.isTreeCollection(from.target.data) ||
            (helpers_1.isTreeCollection(from.target.data) && from.target.data.canCopy(from.id, id))) {
            this._cancelCanDrop(); // clear last
            this._lastId = id;
            this._lastCollectionId = collectionId;
            var canMove = from.target.events.fire(types_1.DragEvents.dragIn, [id, this._transferData.dropPosition, CollectionStore_1.collectionStore.getItem(collectionId)]);
            if (canMove) {
                this._canDrop();
            }
        }
        else {
            this._cancelCanDrop();
        }
    };
    DragManager.prototype._move = function (from, to) {
        var fromData = from.target.data;
        var toData = to.target.data;
        var index = 0;
        var targetId = to.id;
        var behaviour = helpers_1.isTreeCollection(toData) ? to.target.config.dropBehaviour : undefined;
        switch (behaviour) {
            case types_1.DropBehaviour.child:
                break;
            case types_1.DropBehaviour.sibling:
                targetId = toData.getParent(targetId);
                index = toData.getIndex(to.id) + 1;
                break;
            case types_1.DropBehaviour.complex:
                var dropPosition = this._transferData.dropPosition;
                if (dropPosition === types_1.DropPosition.top) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id);
                }
                else if (dropPosition === types_1.DropPosition.bot) {
                    targetId = toData.getParent(targetId);
                    index = toData.getIndex(to.id) + 1;
                }
                break;
            default:
                // list move
                if (!to.id) {
                    index = -1;
                }
                else if (from.target === to.target && toData.getIndex(from.id) < toData.getIndex(to.id)) {
                    index = toData.getIndex(to.id) - 1;
                }
                else {
                    index = toData.getIndex(to.id);
                }
        }
        if (this._transferData.dragConfig.dragCopy) {
            fromData.copy(from.id, index, toData, targetId);
        }
        else {
            fromData.move(from.id, index, toData, targetId); // typescript bug??
        }
    };
    DragManager.prototype._endDrop = function () {
        this._toggleTextSelection(false);
        if (this._transferData.target) {
            this._transferData.target.events.fire(types_1.DragEvents.dragEnd, [this._transferData.id]);
        }
        this._cancelCanDrop();
        this._canMove = true;
        this._transferData = {};
        this._lastId = null;
        this._lastCollectionId = null;
    };
    DragManager.prototype._cancelCanDrop = function () {
        this._canMove = false;
        var collection = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (collection && this._lastId) {
            collection.events.fire(types_1.DragEvents.cancelDrop, [this._lastId]);
        }
        this._lastCollectionId = null;
        this._lastId = null;
    };
    DragManager.prototype._canDrop = function () {
        this._canMove = true;
        var target = CollectionStore_1.collectionStore.getItem(this._lastCollectionId);
        if (target && this._lastId) {
            target.events.fire(types_1.DragEvents.canDrop, [this._lastId, this._transferData.dropPosition]);
        }
    };
    DragManager.prototype._toggleTextSelection = function (add) {
        if (add) {
            document.body.classList.add("dhx_no-select");
        }
        else {
            document.body.classList.remove("dhx_no-select");
        }
    };
    return DragManager;
}());
var dhx = window.dhxHelpers = window.dhxHelpers || {};
dhx.dragManager = dhx.dragManager || new DragManager();
exports.dragManager = dhx.dragManager;


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
        var drivers = dhx.dataDrivers || drivers_1.dataDrivers;
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

/***/ "../ts-data/sources/selection.ts":
/*!***************************************!*\
  !*** ../ts-data/sources/selection.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var types_1 = __webpack_require__(/*! @dhx/ts-common/types */ "../ts-common/types.ts");
var types_2 = __webpack_require__(/*! ./types */ "../ts-data/sources/types.ts");
var Selection = /** @class */ (function () {
    function Selection(_config, data, events) {
        var _this = this;
        this.events = events || (new events_1.EventSystem(this));
        this._data = data;
        this._data.events.on(types_2.DataEvents.removeAll, function () {
            _this._selected = null;
        });
        this._data.events.on(types_2.DataEvents.change, function () {
            if (_this._selected) {
                var near = _this._data.getNearId(_this._selected);
                if (near !== _this._selected) {
                    _this._selected = null;
                    if (near) {
                        _this.add(near);
                    }
                }
            }
        });
    }
    Selection.prototype.getId = function () {
        return this._selected;
    };
    Selection.prototype.getItem = function () {
        if (this._selected) {
            return this._data.getItem(this._selected);
        }
        return null;
    };
    Selection.prototype.remove = function (id) {
        id = id || this._selected;
        if (!id) {
            return true;
        }
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._data.update(id, { $selected: false });
            this._selected = null;
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            return true;
        }
        return false;
    };
    Selection.prototype.add = function (id) {
        if (this._selected === id) {
            return;
        }
        this.remove();
        if (this.events.fire(types_1.SelectionEvents.beforeSelect, [id])) {
            this._selected = id;
            this._data.update(id, { $selected: true });
            this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
        }
    };
    return Selection;
}());
exports.Selection = Selection;


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


/***/ }),

/***/ "../ts-list/sources/List.ts":
/*!**********************************!*\
  !*** ../ts-list/sources/List.ts ***!
  \**********************************/
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
var ts_data_1 = __webpack_require__(/*! @dhx/ts-data */ "../ts-data/index.ts");
var dom_1 = __webpack_require__(/*! @dhx/ts-common/dom */ "../ts-common/dom.ts");
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var Keymanager_1 = __webpack_require__(/*! @dhx/ts-common/Keymanager */ "../ts-common/Keymanager.ts");
var types_1 = __webpack_require__(/*! @dhx/ts-common/types */ "../ts-common/types.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var Selection_1 = __webpack_require__(/*! ./Selection */ "../ts-list/sources/Selection.ts");
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var types_2 = __webpack_require__(/*! ./types */ "../ts-list/sources/types.ts");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(node, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, node, core_1.extend({
            itemHeight: config.virtual ? 34 : config.itemHeight || null,
            arrowNavigation: false
        }, config)) || this;
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
            _this.data.parse(_this.config.data);
        }
        else if (_this.config.data && _this.config.data.events) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
        }
        _this.selection = new Selection_1.Selection({}, _this.data);
        if (_this.config.arrowNavigation) {
            var arrowNavigation = _this.config.arrowNavigation;
            if (typeof _this.config.arrowNavigation !== "function") {
                _this._widgetInFocus = false;
                arrowNavigation = function () { return _this._widgetInFocus; };
                _this._documentClickDestuctor = core_1.detectWidgetClick(_this._uid, function (isInnerClick) { return _this._widgetInFocus = isInnerClick; });
            }
            var preventEvent = function (fn) { return function (e) {
                e.preventDefault();
                fn();
            }; };
            _this._navigationDestructor = Keymanager_1.addHotkeys({
                arrowdown: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex + 1); }),
                arrowup: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex - 1); }),
                enter: function (e) {
                    var id = _this.data.getId(_this._focusIndex);
                    _this.selection.add(id);
                    _this.events.fire(types_2.ListEvents.click, [id, e]);
                }
            }, arrowNavigation);
        }
        var updater = function (updateObj) { return function (id) {
            if (_this.data.exists(id)) {
                _this.data.update(id, updateObj);
            }
        }; };
        _this.events.on(ts_data_1.DataEvents.change, function () { return _this.paint(); });
        _this.events.on(ts_data_1.DragEvents.canDrop, updater({ $drophere: true }));
        _this.events.on(ts_data_1.DragEvents.cancelDrop, updater({ $drophere: undefined }));
        _this.events.on(ts_data_1.DragEvents.dragStart, updater({ $dragtarget: true }));
        _this.events.on(ts_data_1.DragEvents.dragEnd, updater({ $dragtarget: undefined }));
        _this.selection.events.on(types_1.SelectionEvents.afterSelect, function (id) {
            _this.setFocusIndex(_this.data.getIndex(id));
        });
        _this._handlers = {
            onmousedown: function (e) { return _this.config.dragMode ? ts_data_1.dragManager.onMouseDown(e) : null; },
            ondragstart: function () { return _this.config.dragMode ? false : null; },
            oncontextmenu: function (e) {
                var id = html_1.locate(e);
                if (!id) {
                    return;
                }
                _this.events.fire(types_2.ListEvents.contextmenu, [id, e]);
            },
            onclick: function (e) {
                var id = html_1.locate(e);
                if (!id) {
                    return;
                }
                _this.selection.add(id);
                _this.events.fire(types_2.ListEvents.click, [id, e]);
            },
            onscroll: function (e) { return _this.config.virtual ? _this._updateVirtual(e.target.scrollTop) : null; }
        };
        if (_this.config.dragMode) {
            ts_data_1.dragManager.setItem(_this._uid, _this);
        }
        if (_this.config.virtual) {
            _this._range = [0, 0];
            _this._topOffset = 0;
        }
        var view = dom_1.create({
            render: function () { return _this.config.virtual ? _this._renderVirtualList() : _this._renderList(); },
            hooks: {
                didMount: function (vm) {
                    if (!_this.config.height) {
                        var element = vm.node.el;
                        _this.config.height = (element && element.parentNode && element.parentNode.offsetHeight) || 200;
                    }
                    if (_this.config.virtual) {
                        _this._visibleHeight = _this.config.height;
                        _this._updateVirtual(0);
                    }
                    _this.paint();
                }
            }
        });
        _this.mount(node, view);
        return _this;
    }
    List.prototype.setFocusIndex = function (index) {
        if (index < 0 || index > this.data.getLength() - 1) {
            return;
        }
        this._focusIndex = index;
        var rootView = this.getRootView();
        if (!rootView || !rootView.node || !rootView.node.el) {
            return;
        }
        var listEl = this.getRootNode();
        if (!listEl) {
            return;
        }
        if (this.config.virtual) {
            var position = index * this.config.itemHeight;
            if (position >= this._visibleHeight + this._topOffset || position < this._topOffset) {
                listEl.scrollTo(0, position);
            }
        }
        else {
            var listItem = listEl.children[index];
            if (!listItem) {
                return;
            }
            if (listItem.offsetTop >= listEl.scrollTop + listEl.clientHeight) {
                listItem.scrollIntoView(false);
            }
            else if (listItem.offsetTop < listEl.scrollTop) {
                listItem.scrollIntoView(true);
            }
        }
        this.events.fire(types_2.ListEvents.focusChange, [this._focusIndex, this.data.getId(this._focusIndex)]);
        this.paint();
    };
    List.prototype.getFocusItem = function () {
        return this.data.getId(this._focusIndex);
    };
    List.prototype.getFocusIndex = function () {
        return this._focusIndex;
    };
    List.prototype.destructor = function () {
        if (this._navigationDestructor) {
            this._navigationDestructor();
        }
        if (this._documentClickDestuctor) {
            this._documentClickDestuctor();
        }
        this.unmount();
    };
    List.prototype._renderItem = function (data, index) {
        var html = (this.config.template && this.config.template(data)) || data.html;
        var focus = index === this._focusIndex;
        return html ? this._renderAsHtml(html, data, focus) : this._renderAsValue(data, focus);
    };
    List.prototype._renderAsHtml = function (html, item, focus) {
        var itemHeight = this.config.itemHeight;
        return dom_1.el("li", {
            "class": "dhx_list-item" +
                (item.$selected ? " dhx_list-item--selected" : "") +
                (focus ? " dhx_list-item--focus" : "") +
                (item.$drophere ? " dhx_list-item--drophere" : "") +
                (item.$dragtarget ? " dhx_list-item--dragtarget" : "") +
                (this.config.dragMode ? " dhx_list-item--drag" : "") +
                (item.css ? " " + item.css : ""),
            "dhx_id": item.id,
            "style": {
                height: itemHeight
            },
            "_key": item.id,
            ".innerHTML": html
        });
    };
    List.prototype._renderAsValue = function (item, focus) {
        var itemHeight = this.config.itemHeight;
        return dom_1.el("li", {
            class: "dhx_list-item dhx_list-item--text" +
                (item.$selected ? " dhx_list-item--selected" : "") +
                (focus ? " dhx_list-item--focus" : "") +
                (item.$drophere ? " dhx_list-item--drophere" : "") +
                (item.$dragtarget ? " dhx_list-item--dragtarget" : "") +
                (this.config.dragMode ? " dhx_list-item--drag" : "") +
                (item.css ? " " + item.css : ""),
            dhx_id: item.id,
            style: {
                height: itemHeight
            },
            _key: item.id,
        }, item.text || item.value);
    };
    List.prototype._renderList = function () {
        var _this = this;
        var kids = this.data.map(function (obj, index) { return _this._renderItem(obj, index); });
        return dom_1.el("ul.dhx_widget.dhx_list", __assign({ style: {
                "max-height": this.config.height + "px"
            }, class: this.config.css, dhx_widget_id: this._uid }, this._handlers), kids);
    };
    List.prototype._renderVirtualList = function () {
        var _this = this;
        var kids = this.data.mapRange(this._range[0], this._range[1], function (obj, index) { return _this._renderItem(obj, index); });
        return dom_1.el(".dhx_widget.dhx_virtual-list-wrapper", __assign({ dhx_widget_id: this._uid, style: {
                "max-height": this._visibleHeight
            } }, this._handlers), [
            dom_1.el("ul.dhx_list.dhx_list--virtual", {
                class: this.config.css,
                style: {
                    "height": this._getHeight() + "px",
                    "padding-top": this._topOffset + "px"
                },
            }, kids)
        ]);
    };
    List.prototype._updateVirtual = function (position) {
        var overscanCount = 5;
        var count = Math.floor(this._visibleHeight / this.config.itemHeight) + overscanCount;
        var index = Math.floor(position / this.config.itemHeight);
        this._range = [index, count + index];
        var totalHeight = this._getHeight();
        if (position > totalHeight - this._visibleHeight) {
            position = totalHeight - this._visibleHeight;
        }
        this._topOffset = position;
        this.paint();
    };
    List.prototype._getHeight = function () {
        return this.data.getLength() * this.config.itemHeight;
    };
    return List;
}(view_1.View));
exports.List = List;


/***/ }),

/***/ "../ts-list/sources/Selection.ts":
/*!***************************************!*\
  !*** ../ts-list/sources/Selection.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(/*! @dhx/ts-common/types */ "../ts-common/types.ts");
var ts_data_1 = __webpack_require__(/*! @dhx/ts-data */ "../ts-data/index.ts");
var Selection = /** @class */ (function () {
    function Selection(config, data) {
        var _this = this;
        this.config = config;
        this.events = data.events;
        this._data = data;
        this._selected = [];
        this._data.events.on(ts_data_1.DataEvents.removeAll, function () {
            _this._selected = [];
        });
        this._data.events.on(ts_data_1.DataEvents.afterRemove, function (obj) {
            _this._selected = _this._selected.filter(function (id) { return id !== obj.id; });
        });
    }
    Selection.prototype.getId = function () {
        if (this.config.multiselect) {
            return this._selected;
        }
        return this._selected[0];
    };
    Selection.prototype.getItem = function () {
        var _this = this;
        if (this._selected.length) {
            var items = this._selected.map(function (id) { return _this._data.getItem(id); });
            return this.config.multiselect ? items : items[0];
        }
        return null;
    };
    Selection.prototype.contains = function (id) {
        if (id) {
            return this._selected.indexOf(id) > -1;
        }
        return this._selected.length > 0;
    };
    Selection.prototype.remove = function (id) {
        var _this = this;
        if (!id && !this._selected.length) {
            return true;
        }
        if (id) {
            return this._unselectItem(id);
        }
        this._selected.forEach(function (selectedId) { return _this._unselectItem(selectedId); });
        return true;
    };
    Selection.prototype.add = function (id) {
        if (this._selected.indexOf(id) !== -1) {
            if (this.config.multiselect) {
                this._unselectItem(id);
            }
            return;
        }
        if (!this.config.multiselect) {
            this.remove();
        }
        if (this.events.fire(types_1.SelectionEvents.beforeSelect, [id])) {
            this._selected.push(id);
            this._data.update(id, { $selected: true });
            this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
        }
    };
    Selection.prototype._unselectItem = function (id) {
        if (this.events.fire(types_1.SelectionEvents.beforeUnSelect, [id])) {
            this._data.update(id, { $selected: false });
            this._selected = this._selected.filter(function (selectedId) { return selectedId !== id; });
            this.events.fire(types_1.SelectionEvents.afterUnSelect, [id]);
            return true;
        }
        return false;
    };
    return Selection;
}());
exports.Selection = Selection;


/***/ }),

/***/ "../ts-list/sources/entry.ts":
/*!***********************************!*\
  !*** ../ts-list/sources/entry.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../styles/list.scss */ "../styles/list.scss");
var List_1 = __webpack_require__(/*! ./List */ "../ts-list/sources/List.ts");
exports.List = List_1.List;


/***/ }),

/***/ "../ts-list/sources/types.ts":
/*!***********************************!*\
  !*** ../ts-list/sources/types.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListEvents;
(function (ListEvents) {
    ListEvents["contextmenu"] = "contextmenu";
    ListEvents["click"] = "click";
    ListEvents["focusChange"] = "focuschange";
})(ListEvents = exports.ListEvents || (exports.ListEvents = {}));


/***/ })

/******/ });
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaHgvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RoeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL2RvbXZtL2Rpc3QvZGV2L2RvbXZtLmRldi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb21pei9wcm9taXouanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL2RoeC8uLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3N0eWxlcy9saXN0LnNjc3M/Yjc2ZSIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL0tleW1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9jb3JlLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vZG9tLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vZXZlbnRzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vaHRtbC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL3BvbHlmaWxscy9tYXRjaGVzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi92aWV3LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL2luZGV4LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvQ29sbGVjdGlvblN0b3JlLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvRHJhZ01hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2RhdGFjb2xsZWN0aW9uL2xvYWRlci50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2RhdGFjb2xsZWN0aW9uL3NvcnQudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kYXRhcHJveHkudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL0NzdkRyaXZlci50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2RyaXZlcnMvSnNvbkRyaXZlci50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2RyaXZlcnMvWE1MRHJpdmVyLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZHJpdmVycy9kcml2ZXJzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvaGVscGVycy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL3NlbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL3NlcmlhbGl6ZXJzL3htbC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL3RyZWVjb2xsZWN0aW9uLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvdHlwZXMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWxpc3Qvc291cmNlcy9MaXN0LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1saXN0L3NvdXJjZXMvU2VsZWN0aW9uLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1saXN0L3NvdXJjZXMvZW50cnkudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWxpc3Qvc291cmNlcy90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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVCQUF1Qjs7QUFFM0IsVUFBVTtBQUNWOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGlDQUFpQzs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBLElBQUksZUFBZTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBRUEsQ0FBQztBQUNEOzs7Ozs7Ozs7Ozs7QUNsbEZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7Ozs7OztBQ3ZMdEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsT0FBTztBQUNQOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXOztBQUVYLE9BQU87QUFDUDs7O0FBR0E7O0FBRUE7QUFDQSxNQUFNLElBQTRCO0FBQ2xDO0FBQ0EsR0FBRyxNQUFNLEVBRU47QUFDSCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDN1REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpQkFBaUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxzQkFBc0IsRUFBRTtBQUNsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ3pMRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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QUMsYUFBYSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNaO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZCxDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDO0FBL0VZLDhCQUFTOzs7Ozs7Ozs7Ozs7Ozs7QUNMdEIseUVBQWdDO0FBQ2hDLDZFQUE4QjtBQUFyQiwwQkFBSTs7Ozs7Ozs7Ozs7Ozs7O0FDR2IsSUFBWSxVQUlYO0FBSkQsV0FBWSxVQUFVO0lBQ3JCLHlDQUEyQjtJQUMzQiw2QkFBZTtJQUNmLHlDQUEwQjtBQUMzQixDQUFDLEVBSlcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFJckIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImRoeFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJkaHhcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi90cy1saXN0L3NvdXJjZXMvZW50cnkudHNcIik7XG4iLCIvKipcbiogQ29weXJpZ2h0IChjKSAyMDE3LCBMZW9uIFNvcm9raW5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC4gKE1JVCBMaWNlbnNlZClcbipcbiogZG9tdm0uanMgKERPTSBWaWV3TW9kZWwpXG4qIEEgdGhpbiwgZmFzdCwgZGVwZW5kZW5jeS1mcmVlIHZkb20gdmlldyBsYXllclxuKiBAcHJlc2VydmUgaHR0cHM6Ly9naXRodWIuY29tL2xlZW9uaXlhL2RvbXZtICh2My4yLjYsIGRldiBidWlsZClcbiovXG5cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG5cdHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcblx0KGdsb2JhbC5kb212bSA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoKSB7ICd1c2Ugc3RyaWN0JztcblxuLy8gTk9URTogaWYgYWRkaW5nIGEgbmV3ICpWTm9kZSogdHlwZSwgbWFrZSBpdCA8IENPTU1FTlQgYW5kIHJlbnVtYmVyIHJlc3QuXG4vLyBUaGVyZSBhcmUgc29tZSBwbGFjZXMgdGhhdCB0ZXN0IDw9IENPTU1FTlQgdG8gYXNzZXJ0IGlmIG5vZGUgaXMgYSBWTm9kZVxuXG4vLyBWTm9kZSB0eXBlc1xudmFyIEVMRU1FTlRcdD0gMTtcbnZhciBURVhUXHRcdD0gMjtcbnZhciBDT01NRU5UXHQ9IDM7XG5cbi8vIHBsYWNlaG9sZGVyIHR5cGVzXG52YXIgVlZJRVdcdFx0PSA0O1xudmFyIFZNT0RFTFx0XHQ9IDU7XG5cbnZhciBFTlZfRE9NID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIjtcbnZhciB3aW4gPSBFTlZfRE9NID8gd2luZG93IDoge307XG52YXIgckFGID0gd2luLnJlcXVlc3RBbmltYXRpb25GcmFtZTtcblxudmFyIGVtcHR5T2JqID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgaXNBcnIgPSBBcnJheS5pc0FycmF5O1xuXG5mdW5jdGlvbiBpc1NldCh2YWwpIHtcblx0cmV0dXJuIHZhbCAhPSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1BsYWluT2JqKHZhbCkge1xuXHRyZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XHRcdC8vICAmJiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiXG59XG5cbmZ1bmN0aW9uIGluc2VydEFycih0YXJnLCBhcnIsIHBvcywgcmVtKSB7XG5cdHRhcmcuc3BsaWNlLmFwcGx5KHRhcmcsIFtwb3MsIHJlbV0uY29uY2F0KGFycikpO1xufVxuXG5mdW5jdGlvbiBpc1ZhbCh2YWwpIHtcblx0dmFyIHQgPSB0eXBlb2YgdmFsO1xuXHRyZXR1cm4gdCA9PT0gXCJzdHJpbmdcIiB8fCB0ID09PSBcIm51bWJlclwiO1xufVxuXG5mdW5jdGlvbiBpc0Z1bmModmFsKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsID09PSBcImZ1bmN0aW9uXCI7XG59XG5cbmZ1bmN0aW9uIGlzUHJvbSh2YWwpIHtcblx0cmV0dXJuIHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgJiYgaXNGdW5jKHZhbC50aGVuKTtcbn1cblxuXG5cbmZ1bmN0aW9uIGFzc2lnbk9iaih0YXJnKSB7XG5cdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXG5cdGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7IGkrKylcblx0XHR7IGZvciAodmFyIGsgaW4gYXJnc1tpXSlcblx0XHRcdHsgdGFyZ1trXSA9IGFyZ3NbaV1ba107IH0gfVxuXG5cdHJldHVybiB0YXJnO1xufVxuXG4vLyBleHBvcnQgY29uc3QgZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZnVuY3Rpb24gZGVlcFNldCh0YXJnLCBwYXRoLCB2YWwpIHtcblx0dmFyIHNlZztcblxuXHR3aGlsZSAoc2VnID0gcGF0aC5zaGlmdCgpKSB7XG5cdFx0aWYgKHBhdGgubGVuZ3RoID09PSAwKVxuXHRcdFx0eyB0YXJnW3NlZ10gPSB2YWw7IH1cblx0XHRlbHNlXG5cdFx0XHR7IHRhcmdbc2VnXSA9IHRhcmcgPSB0YXJnW3NlZ10gfHwge307IH1cblx0fVxufVxuXG4vKlxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBVbnNldCh0YXJnLCBwYXRoKSB7XG5cdHZhciBzZWc7XG5cblx0d2hpbGUgKHNlZyA9IHBhdGguc2hpZnQoKSkge1xuXHRcdGlmIChwYXRoLmxlbmd0aCA9PT0gMClcblx0XHRcdHRhcmdbc2VnXSA9IHZhbDtcblx0XHRlbHNlXG5cdFx0XHR0YXJnW3NlZ10gPSB0YXJnID0gdGFyZ1tzZWddIHx8IHt9O1xuXHR9XG59XG4qL1xuXG5mdW5jdGlvbiBzbGljZUFyZ3MoYXJncywgb2Zmcykge1xuXHR2YXIgYXJyID0gW107XG5cdGZvciAodmFyIGkgPSBvZmZzOyBpIDwgYXJncy5sZW5ndGg7IGkrKylcblx0XHR7IGFyci5wdXNoKGFyZ3NbaV0pOyB9XG5cdHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGNtcE9iaihhLCBiKSB7XG5cdGZvciAodmFyIGkgaW4gYSlcblx0XHR7IGlmIChhW2ldICE9PSBiW2ldKVxuXHRcdFx0eyByZXR1cm4gZmFsc2U7IH0gfVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBjbXBBcnIoYSwgYikge1xuXHR2YXIgYWxlbiA9IGEubGVuZ3RoO1xuXG5cdGlmIChiLmxlbmd0aCAhPT0gYWxlbilcblx0XHR7IHJldHVybiBmYWxzZTsgfVxuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYWxlbjsgaSsrKVxuXHRcdHsgaWYgKGFbaV0gIT09IGJbaV0pXG5cdFx0XHR7IHJldHVybiBmYWxzZTsgfSB9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9kYXJzYWluL3JhZnRcbi8vIHJBRiB0aHJvdHRsZXIsIGFnZ3JlZ2F0ZXMgbXVsdGlwbGUgcmVwZWF0ZWQgcmVkcmF3IGNhbGxzIHdpdGhpbiBzaW5nbGUgYW5pbWZyYW1lXG5mdW5jdGlvbiByYWZ0KGZuKSB7XG5cdGlmICghckFGKVxuXHRcdHsgcmV0dXJuIGZuOyB9XG5cblx0dmFyIGlkLCBjdHgsIGFyZ3M7XG5cblx0ZnVuY3Rpb24gY2FsbCgpIHtcblx0XHRpZCA9IDA7XG5cdFx0Zm4uYXBwbHkoY3R4LCBhcmdzKTtcblx0fVxuXG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRjdHggPSB0aGlzO1xuXHRcdGFyZ3MgPSBhcmd1bWVudHM7XG5cdFx0aWYgKCFpZCkgeyBpZCA9IHJBRihjYWxsKTsgfVxuXHR9O1xufVxuXG5mdW5jdGlvbiBjdXJyeShmbiwgYXJncywgY3R4KSB7XG5cdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gZm4uYXBwbHkoY3R4LCBhcmdzKTtcblx0fTtcbn1cblxuLypcbmV4cG9ydCBmdW5jdGlvbiBwcm9wKHZhbCwgY2IsIGN0eCwgYXJncykge1xuXHRyZXR1cm4gZnVuY3Rpb24obmV3VmFsLCBleGVjQ2IpIHtcblx0XHRpZiAobmV3VmFsICE9PSB1bmRlZmluZWQgJiYgbmV3VmFsICE9PSB2YWwpIHtcblx0XHRcdHZhbCA9IG5ld1ZhbDtcblx0XHRcdGV4ZWNDYiAhPT0gZmFsc2UgJiYgaXNGdW5jKGNiKSAmJiBjYi5hcHBseShjdHgsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWw7XG5cdH07XG59XG4qL1xuXG4vKlxuLy8gYWRhcHRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9PbGljYWwvYmluYXJ5LXNlYXJjaFxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeUtleVNlYXJjaChsaXN0LCBpdGVtKSB7XG4gICAgdmFyIG1pbiA9IDA7XG4gICAgdmFyIG1heCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICB2YXIgZ3Vlc3M7XG5cblx0dmFyIGJpdHdpc2UgPSAobWF4IDw9IDIxNDc0ODM2NDcpID8gdHJ1ZSA6IGZhbHNlO1xuXHRpZiAoYml0d2lzZSkge1xuXHRcdHdoaWxlIChtaW4gPD0gbWF4KSB7XG5cdFx0XHRndWVzcyA9IChtaW4gKyBtYXgpID4+IDE7XG5cdFx0XHRpZiAobGlzdFtndWVzc10ua2V5ID09PSBpdGVtKSB7IHJldHVybiBndWVzczsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsaXN0W2d1ZXNzXS5rZXkgPCBpdGVtKSB7IG1pbiA9IGd1ZXNzICsgMTsgfVxuXHRcdFx0XHRlbHNlIHsgbWF4ID0gZ3Vlc3MgLSAxOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHdoaWxlIChtaW4gPD0gbWF4KSB7XG5cdFx0XHRndWVzcyA9IE1hdGguZmxvb3IoKG1pbiArIG1heCkgLyAyKTtcblx0XHRcdGlmIChsaXN0W2d1ZXNzXS5rZXkgPT09IGl0ZW0pIHsgcmV0dXJuIGd1ZXNzOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxpc3RbZ3Vlc3NdLmtleSA8IGl0ZW0pIHsgbWluID0gZ3Vlc3MgKyAxOyB9XG5cdFx0XHRcdGVsc2UgeyBtYXggPSBndWVzcyAtIDE7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuICAgIHJldHVybiAtMTtcbn1cbiovXG5cbi8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xvbmdlc3RfaW5jcmVhc2luZ19zdWJzZXF1ZW5jZVxuLy8gaW1wbCBib3Jyb3dlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9pdmlqcy9pdmlcbmZ1bmN0aW9uIGxvbmdlc3RJbmNyZWFzaW5nU3Vic2VxdWVuY2UoYSkge1xuXHR2YXIgcCA9IGEuc2xpY2UoKTtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHRyZXN1bHQucHVzaCgwKTtcblx0dmFyIHU7XG5cdHZhciB2O1xuXG5cdGZvciAodmFyIGkgPSAwLCBpbCA9IGEubGVuZ3RoOyBpIDwgaWw7ICsraSkge1xuXHRcdHZhciBqID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcblx0XHRpZiAoYVtqXSA8IGFbaV0pIHtcblx0XHRcdHBbaV0gPSBqO1xuXHRcdFx0cmVzdWx0LnB1c2goaSk7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR1ID0gMDtcblx0XHR2ID0gcmVzdWx0Lmxlbmd0aCAtIDE7XG5cblx0XHR3aGlsZSAodSA8IHYpIHtcblx0XHRcdHZhciBjID0gKCh1ICsgdikgLyAyKSB8IDA7XG5cdFx0XHRpZiAoYVtyZXN1bHRbY11dIDwgYVtpXSkge1xuXHRcdFx0XHR1ID0gYyArIDE7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR2ID0gYztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoYVtpXSA8IGFbcmVzdWx0W3VdXSkge1xuXHRcdFx0aWYgKHUgPiAwKSB7XG5cdFx0XHRcdHBbaV0gPSByZXN1bHRbdSAtIDFdO1xuXHRcdFx0fVxuXHRcdFx0cmVzdWx0W3VdID0gaTtcblx0XHR9XG5cdH1cblxuXHR1ID0gcmVzdWx0Lmxlbmd0aDtcblx0diA9IHJlc3VsdFt1IC0gMV07XG5cblx0d2hpbGUgKHUtLSA+IDApIHtcblx0XHRyZXN1bHRbdV0gPSB2O1xuXHRcdHYgPSBwW3ZdO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn1cblxuLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL09saWNhbC9iaW5hcnktc2VhcmNoXG5mdW5jdGlvbiBiaW5hcnlGaW5kTGFyZ2VyKGl0ZW0sIGxpc3QpIHtcblx0dmFyIG1pbiA9IDA7XG5cdHZhciBtYXggPSBsaXN0Lmxlbmd0aCAtIDE7XG5cdHZhciBndWVzcztcblxuXHR2YXIgYml0d2lzZSA9IChtYXggPD0gMjE0NzQ4MzY0NykgPyB0cnVlIDogZmFsc2U7XG5cdGlmIChiaXR3aXNlKSB7XG5cdFx0d2hpbGUgKG1pbiA8PSBtYXgpIHtcblx0XHRcdGd1ZXNzID0gKG1pbiArIG1heCkgPj4gMTtcblx0XHRcdGlmIChsaXN0W2d1ZXNzXSA9PT0gaXRlbSkgeyByZXR1cm4gZ3Vlc3M7IH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAobGlzdFtndWVzc10gPCBpdGVtKSB7IG1pbiA9IGd1ZXNzICsgMTsgfVxuXHRcdFx0XHRlbHNlIHsgbWF4ID0gZ3Vlc3MgLSAxOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHdoaWxlIChtaW4gPD0gbWF4KSB7XG5cdFx0XHRndWVzcyA9IE1hdGguZmxvb3IoKG1pbiArIG1heCkgLyAyKTtcblx0XHRcdGlmIChsaXN0W2d1ZXNzXSA9PT0gaXRlbSkgeyByZXR1cm4gZ3Vlc3M7IH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAobGlzdFtndWVzc10gPCBpdGVtKSB7IG1pbiA9IGd1ZXNzICsgMTsgfVxuXHRcdFx0XHRlbHNlIHsgbWF4ID0gZ3Vlc3MgLSAxOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIChtaW4gPT0gbGlzdC5sZW5ndGgpID8gbnVsbCA6IG1pbjtcblxuLy9cdHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gaXNFdlByb3AobmFtZSkge1xuXHRyZXR1cm4gbmFtZVswXSA9PT0gXCJvXCIgJiYgbmFtZVsxXSA9PT0gXCJuXCI7XG59XG5cbmZ1bmN0aW9uIGlzU3BsUHJvcChuYW1lKSB7XG5cdHJldHVybiBuYW1lWzBdID09PSBcIl9cIjtcbn1cblxuZnVuY3Rpb24gaXNTdHlsZVByb3AobmFtZSkge1xuXHRyZXR1cm4gbmFtZSA9PT0gXCJzdHlsZVwiO1xufVxuXG5mdW5jdGlvbiByZXBhaW50KG5vZGUpIHtcblx0bm9kZSAmJiBub2RlLmVsICYmIG5vZGUuZWwub2Zmc2V0SGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBpc0h5ZHJhdGVkKHZtKSB7XG5cdHJldHVybiB2bS5ub2RlICE9IG51bGwgJiYgdm0ubm9kZS5lbCAhPSBudWxsO1xufVxuXG4vLyB0ZXN0cyBpbnRlcmFjdGl2ZSBwcm9wcyB3aGVyZSByZWFsIHZhbCBzaG91bGQgYmUgY29tcGFyZWRcbmZ1bmN0aW9uIGlzRHluUHJvcCh0YWcsIGF0dHIpIHtcbi8vXHRzd2l0Y2ggKHRhZykge1xuLy9cdFx0Y2FzZSBcImlucHV0XCI6XG4vL1x0XHRjYXNlIFwidGV4dGFyZWFcIjpcbi8vXHRcdGNhc2UgXCJzZWxlY3RcIjpcbi8vXHRcdGNhc2UgXCJvcHRpb25cIjpcblx0XHRcdHN3aXRjaCAoYXR0cikge1xuXHRcdFx0XHRjYXNlIFwidmFsdWVcIjpcblx0XHRcdFx0Y2FzZSBcImNoZWNrZWRcIjpcblx0XHRcdFx0Y2FzZSBcInNlbGVjdGVkXCI6XG4vL1x0XHRcdFx0Y2FzZSBcInNlbGVjdGVkSW5kZXhcIjpcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cbi8vXHR9XG5cblx0cmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRWbShuKSB7XG5cdG4gPSBuIHx8IGVtcHR5T2JqO1xuXHR3aGlsZSAobi52bSA9PSBudWxsICYmIG4ucGFyZW50KVxuXHRcdHsgbiA9IG4ucGFyZW50OyB9XG5cdHJldHVybiBuLnZtO1xufVxuXG5mdW5jdGlvbiBWTm9kZSgpIHt9XG5cbnZhciBWTm9kZVByb3RvID0gVk5vZGUucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVk5vZGUsXG5cblx0dHlwZTpcdG51bGwsXG5cblx0dm06XHRcdG51bGwsXG5cblx0Ly8gYWxsIHRoaXMgc3R1ZmYgY2FuIGp1c3QgbGl2ZSBpbiBhdHRycyAoYXMgZGVmaW5lZCkganVzdCBoYXZlIGdldHRlcnMgaGVyZSBmb3IgaXRcblx0a2V5Olx0bnVsbCxcblx0cmVmOlx0bnVsbCxcblx0ZGF0YTpcdG51bGwsXG5cdGhvb2tzOlx0bnVsbCxcblx0bnM6XHRcdG51bGwsXG5cblx0ZWw6XHRcdG51bGwsXG5cblx0dGFnOlx0bnVsbCxcblx0YXR0cnM6XHRudWxsLFxuXHRib2R5Olx0bnVsbCxcblxuXHRmbGFnczpcdDAsXG5cblx0X2NsYXNzOlx0bnVsbCxcblx0X2RpZmY6XHRudWxsLFxuXG5cdC8vIHBlbmRpbmcgcmVtb3ZhbCBvbiBwcm9taXNlIHJlc29sdXRpb25cblx0X2RlYWQ6XHRmYWxzZSxcblx0Ly8gcGFydCBvZiBsb25nZXN0IGluY3JlYXNpbmcgc3Vic2VxdWVuY2U/XG5cdF9saXM6XHRmYWxzZSxcblxuXHRpZHg6XHRudWxsLFxuXHRwYXJlbnQ6XHRudWxsLFxuXG5cdC8qXG5cdC8vIGJyZWFrIG91dCBpbnRvIG9wdGlvbmFsIGZsdWVudCBtb2R1bGVcblx0a2V5Olx0ZnVuY3Rpb24odmFsKSB7IHRoaXMua2V5XHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXG5cdHJlZjpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLnJlZlx0PSB2YWw7IHJldHVybiB0aGlzOyB9LFx0XHQvLyBkZWVwIHJlZnNcblx0ZGF0YTpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmRhdGFcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcblx0aG9va3M6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5ob29rc1x0PSB2YWw7IHJldHVybiB0aGlzOyB9LFx0XHQvLyBoKFwiZGl2XCIpLmhvb2tzKClcblx0aHRtbDpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmh0bWxcdD0gdHJ1ZTsgcmV0dXJuIHRoaXMuYm9keSh2YWwpOyB9LFxuXG5cdGJvZHk6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5ib2R5XHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXG5cdCovXG59O1xuXG5mdW5jdGlvbiBkZWZpbmVUZXh0KGJvZHkpIHtcblx0dmFyIG5vZGUgPSBuZXcgVk5vZGU7XG5cdG5vZGUudHlwZSA9IFRFWFQ7XG5cdG5vZGUuYm9keSA9IGJvZHk7XG5cdHJldHVybiBub2RlO1xufVxuXG52YXIgaXNTdHJlYW0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIGZhbHNlIH07XG5cbnZhciBzdHJlYW1WYWwgPSBub29wO1xudmFyIHN1YlN0cmVhbSA9IG5vb3A7XG52YXIgdW5zdWJTdHJlYW0gPSBub29wO1xuXG5mdW5jdGlvbiBzdHJlYW1DZmcoY2ZnKSB7XG5cdGlzU3RyZWFtXHQ9IGNmZy5pcztcblx0c3RyZWFtVmFsXHQ9IGNmZy52YWw7XG5cdHN1YlN0cmVhbVx0PSBjZmcuc3ViO1xuXHR1bnN1YlN0cmVhbVx0PSBjZmcudW5zdWI7XG59XG5cbi8vIGNyZWF0ZXMgYSBvbmUtc2hvdCBzZWxmLWVuZGluZyBzdHJlYW0gdGhhdCByZWRyYXdzIHRhcmdldCB2bVxuLy8gVE9ETzogaWYgaXQncyBhbHJlYWR5IHJlZ2lzdGVyZWQgYnkgYW55IHBhcmVudCB2bSwgdGhlbiBpZ25vcmUgdG8gYXZvaWQgc2ltdWx0YW5lb3VzIHBhcmVudCAmIGNoaWxkIHJlZnJlc2hcbmZ1bmN0aW9uIGhvb2tTdHJlYW0ocywgdm0pIHtcblx0dmFyIHJlZHJhd1N0cmVhbSA9IHN1YlN0cmVhbShzLCBmdW5jdGlvbiAodmFsKSB7XG5cdFx0Ly8gdGhpcyBcImlmXCIgaWdub3JlcyB0aGUgaW5pdGlhbCBmaXJpbmcgZHVyaW5nIHN1YnNjcmlwdGlvbiAodGhlcmUncyBubyByZWRyYXdhYmxlIHZtIHlldClcblx0XHRpZiAocmVkcmF3U3RyZWFtKSB7XG5cdFx0XHQvLyBpZiB2bSBmdWxseSBpcyBmb3JtZWQgKG9yIG1vdW50ZWQgdm0ubm9kZS5lbD8pXG5cdFx0XHRpZiAodm0ubm9kZSAhPSBudWxsKVxuXHRcdFx0XHR7IHZtLnJlZHJhdygpOyB9XG5cdFx0XHR1bnN1YlN0cmVhbShyZWRyYXdTdHJlYW0pO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHN0cmVhbVZhbChzKTtcbn1cblxuZnVuY3Rpb24gaG9va1N0cmVhbTIocywgdm0pIHtcblx0dmFyIHJlZHJhd1N0cmVhbSA9IHN1YlN0cmVhbShzLCBmdW5jdGlvbiAodmFsKSB7XG5cdFx0Ly8gdGhpcyBcImlmXCIgaWdub3JlcyB0aGUgaW5pdGlhbCBmaXJpbmcgZHVyaW5nIHN1YnNjcmlwdGlvbiAodGhlcmUncyBubyByZWRyYXdhYmxlIHZtIHlldClcblx0XHRpZiAocmVkcmF3U3RyZWFtKSB7XG5cdFx0XHQvLyBpZiB2bSBmdWxseSBpcyBmb3JtZWQgKG9yIG1vdW50ZWQgdm0ubm9kZS5lbD8pXG5cdFx0XHRpZiAodm0ubm9kZSAhPSBudWxsKVxuXHRcdFx0XHR7IHZtLnJlZHJhdygpOyB9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcmVkcmF3U3RyZWFtO1xufVxuXG52YXIgdGFnQ2FjaGUgPSB7fTtcblxudmFyIFJFX0FUVFJTID0gL1xcWyhcXHcrKSg/Oj0oXFx3KykpP1xcXS9nO1xuXG5mdW5jdGlvbiBjc3NUYWcocmF3KSB7XG5cdHtcblx0XHR2YXIgY2FjaGVkID0gdGFnQ2FjaGVbcmF3XTtcblxuXHRcdGlmIChjYWNoZWQgPT0gbnVsbCkge1xuXHRcdFx0dmFyIHRhZywgaWQsIGNscywgYXR0cjtcblxuXHRcdFx0dGFnQ2FjaGVbcmF3XSA9IGNhY2hlZCA9IHtcblx0XHRcdFx0dGFnOlx0KHRhZ1x0PSByYXcubWF0Y2goIC9eWy1cXHddKy8pKVx0XHQ/XHR0YWdbMF1cdFx0XHRcdFx0XHQ6IFwiZGl2XCIsXG5cdFx0XHRcdGlkOlx0XHQoaWRcdFx0PSByYXcubWF0Y2goIC8jKFstXFx3XSspLykpXHRcdD8gXHRpZFsxXVx0XHRcdFx0XHRcdDogbnVsbCxcblx0XHRcdFx0Y2xhc3M6XHQoY2xzXHQ9IHJhdy5tYXRjaCgvXFwuKFstXFx3Ll0rKS8pKVx0XHQ/XHRjbHNbMV0ucmVwbGFjZSgvXFwuL2csIFwiIFwiKVx0OiBudWxsLFxuXHRcdFx0XHRhdHRyczpcdG51bGwsXG5cdFx0XHR9O1xuXG5cdFx0XHR3aGlsZSAoYXR0ciA9IFJFX0FUVFJTLmV4ZWMocmF3KSkge1xuXHRcdFx0XHRpZiAoY2FjaGVkLmF0dHJzID09IG51bGwpXG5cdFx0XHRcdFx0eyBjYWNoZWQuYXR0cnMgPSB7fTsgfVxuXHRcdFx0XHRjYWNoZWQuYXR0cnNbYXR0clsxXV0gPSBhdHRyWzJdIHx8IFwiXCI7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNhY2hlZDtcblx0fVxufVxuXG52YXIgREVWTU9ERSA9IHtcblx0c3luY1JlZHJhdzogZmFsc2UsXG5cblx0d2FybmluZ3M6IHRydWUsXG5cblx0dmVyYm9zZTogdHJ1ZSxcblxuXHRtdXRhdGlvbnM6IHRydWUsXG5cblx0REFUQV9SRVBMQUNFRDogZnVuY3Rpb24odm0sIG9sZERhdGEsIG5ld0RhdGEpIHtcblx0XHRpZiAoaXNGdW5jKHZtLnZpZXcpICYmIHZtLnZpZXcubGVuZ3RoID4gMSkge1xuXHRcdFx0dmFyIG1zZyA9IFwiQSB2aWV3J3MgZGF0YSB3YXMgcmVwbGFjZWQuIFRoZSBkYXRhIG9yaWdpbmFsbHkgcGFzc2VkIHRvIHRoZSB2aWV3IGNsb3N1cmUgZHVyaW5nIGluaXQgaXMgbm93IHN0YWxlLiBZb3UgbWF5IHdhbnQgdG8gcmVseSBvbmx5IG9uIHRoZSBkYXRhIHBhc3NlZCB0byByZW5kZXIoKSBvciB2bS5kYXRhLlwiO1xuXHRcdFx0cmV0dXJuIFttc2csIHZtLCBvbGREYXRhLCBuZXdEYXRhXTtcblx0XHR9XG5cdH0sXG5cblx0VU5LRVlFRF9JTlBVVDogZnVuY3Rpb24odm5vZGUpIHtcblx0XHRyZXR1cm4gW1wiVW5rZXllZCA8aW5wdXQ+IGRldGVjdGVkLiBDb25zaWRlciBhZGRpbmcgYSBuYW1lLCBpZCwgX2tleSwgb3IgX3JlZiBhdHRyIHRvIGF2b2lkIGFjY2lkZW50YWwgRE9NIHJlY3ljbGluZyBiZXR3ZWVuIGRpZmZlcmVudCA8aW5wdXQ+IHR5cGVzLlwiLCB2bm9kZV07XG5cdH0sXG5cblx0VU5NT1VOVEVEX1JFRFJBVzogZnVuY3Rpb24odm0pIHtcblx0XHRyZXR1cm4gW1wiSW52b2tpbmcgcmVkcmF3KCkgb2YgYW4gdW5tb3VudGVkIChzdWIpdmlldyBtYXkgcmVzdWx0IGluIGVycm9ycy5cIiwgdm1dO1xuXHR9LFxuXG5cdElOTElORV9IQU5ETEVSOiBmdW5jdGlvbih2bm9kZSwgb3ZhbCwgbnZhbCkge1xuXHRcdHJldHVybiBbXCJBbm9ueW1vdXMgZXZlbnQgaGFuZGxlcnMgZ2V0IHJlLWJvdW5kIG9uIGVhY2ggcmVkcmF3LCBjb25zaWRlciBkZWZpbmluZyB0aGVtIG91dHNpZGUgb2YgdGVtcGxhdGVzIGZvciBiZXR0ZXIgcmV1c2UuXCIsIHZub2RlLCBvdmFsLCBudmFsXTtcblx0fSxcblxuXHRNSVNNQVRDSEVEX0hBTkRMRVI6IGZ1bmN0aW9uKHZub2RlLCBvdmFsLCBudmFsKSB7XG5cdFx0cmV0dXJuIFtcIlBhdGNoaW5nIG9mIGRpZmZlcmVudCBldmVudCBoYW5kbGVyIHN0eWxlcyBpcyBub3QgZnVsbHkgc3VwcG9ydGVkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zLiBFbnN1cmUgdGhhdCBoYW5kbGVycyBhcmUgZGVmaW5lZCB1c2luZyB0aGUgc2FtZSBzdHlsZS5cIiwgdm5vZGUsIG92YWwsIG52YWxdO1xuXHR9LFxuXG5cdFNWR19XUk9OR19GQUNUT1JZOiBmdW5jdGlvbih2bm9kZSkge1xuXHRcdHJldHVybiBbXCI8c3ZnPiBkZWZpbmVkIHVzaW5nIGRvbXZtLmRlZmluZUVsZW1lbnQuIFVzZSBkb212bS5kZWZpbmVTdmdFbGVtZW50IGZvciA8c3ZnPiAmIGNoaWxkIG5vZGVzLlwiLCB2bm9kZV07XG5cdH0sXG5cblx0Rk9SRUlHTl9FTEVNRU5UOiBmdW5jdGlvbihlbCkge1xuXHRcdHJldHVybiBbXCJkb212bSBzdHVtYmxlZCB1cG9uIGFuIGVsZW1lbnQgaW4gaXRzIERPTSB0aGF0IGl0IGRpZG4ndCBjcmVhdGUsIHdoaWNoIG1heSBiZSBwcm9ibGVtYXRpYy4gWW91IGNhbiBpbmplY3QgZXh0ZXJuYWwgZWxlbWVudHMgaW50byB0aGUgdnRyZWUgdXNpbmcgZG9tdm0uaW5qZWN0RWxlbWVudC5cIiwgZWxdO1xuXHR9LFxuXG5cdFJFVVNFRF9BVFRSUzogZnVuY3Rpb24odm5vZGUpIHtcblx0XHRyZXR1cm4gW1wiQXR0cnMgb2JqZWN0cyBtYXkgb25seSBiZSByZXVzZWQgaWYgdGhleSBhcmUgdHJ1bHkgc3RhdGljLCBhcyBhIHBlcmYgb3B0aW1pemF0aW9uLiBNdXRhdGluZyAmIHJldXNpbmcgdGhlbSB3aWxsIGhhdmUgbm8gZWZmZWN0IG9uIHRoZSBET00gZHVlIHRvIDAgZGlmZi5cIiwgdm5vZGVdO1xuXHR9LFxuXG5cdEFESkFDRU5UX1RFWFQ6IGZ1bmN0aW9uKHZub2RlLCB0ZXh0MSwgdGV4dDIpIHtcblx0XHRyZXR1cm4gW1wiQWRqYWNlbnQgdGV4dCBub2RlcyB3aWxsIGJlIG1lcmdlZC4gQ29uc2lkZXIgY29uY2F0ZW50YXRpbmcgdGhlbSB5b3Vyc2VsZiBpbiB0aGUgdGVtcGxhdGUgZm9yIGltcHJvdmVkIHBlcmYuXCIsIHZub2RlLCB0ZXh0MSwgdGV4dDJdO1xuXHR9LFxuXG5cdEFSUkFZX0ZMQVRURU5FRDogZnVuY3Rpb24odm5vZGUsIGFycmF5KSB7XG5cdFx0cmV0dXJuIFtcIkFycmF5cyB3aXRoaW4gdGVtcGxhdGVzIHdpbGwgYmUgZmxhdHRlbmVkLiBXaGVuIHRoZXkgYXJlIGxlYWRpbmcgb3IgdHJhaWxpbmcsIGl0J3MgZWFzeSBhbmQgbW9yZSBwZXJmb3JtYW50IHRvIGp1c3QgLmNvbmNhdCgpIHRoZW0gaW4gdGhlIHRlbXBsYXRlLlwiLCB2bm9kZSwgYXJyYXldO1xuXHR9LFxuXG5cdEFMUkVBRFlfSFlEUkFURUQ6IGZ1bmN0aW9uKHZtKSB7XG5cdFx0cmV0dXJuIFtcIkEgY2hpbGQgdmlldyBmYWlsZWQgdG8gbW91bnQgYmVjYXVzZSBpdCB3YXMgYWxyZWFkeSBoeWRyYXRlZC4gTWFrZSBzdXJlIG5vdCB0byBpbnZva2Ugdm0ucmVkcmF3KCkgb3Igdm0udXBkYXRlKCkgb24gdW5tb3VudGVkIHZpZXdzLlwiLCB2bV07XG5cdH0sXG5cblx0QVRUQUNIX0lNUExJQ0lUX1RCT0RZOiBmdW5jdGlvbih2bm9kZSwgdmNoaWxkKSB7XG5cdFx0cmV0dXJuIFtcIjx0YWJsZT48dHI+IHdhcyBkZXRlY3RlZCBpbiB0aGUgdnRyZWUsIGJ1dCB0aGUgRE9NIHdpbGwgYmUgPHRhYmxlPjx0Ym9keT48dHI+IGFmdGVyIEhUTUwncyBpbXBsaWNpdCBwYXJzaW5nLiBZb3Ugc2hvdWxkIGNyZWF0ZSB0aGUgPHRib2R5PiB2bm9kZSBleHBsaWNpdGx5IHRvIGF2b2lkIFNTUi9hdHRhY2goKSBmYWlsdXJlcy5cIiwgdm5vZGUsIHZjaGlsZF07XG5cdH1cbn07XG5cbmZ1bmN0aW9uIGRldk5vdGlmeShrZXksIGFyZ3MpIHtcblx0aWYgKERFVk1PREUud2FybmluZ3MgJiYgaXNGdW5jKERFVk1PREVba2V5XSkpIHtcblx0XHR2YXIgbXNnQXJncyA9IERFVk1PREVba2V5XS5hcHBseShudWxsLCBhcmdzKTtcblxuXHRcdGlmIChtc2dBcmdzKSB7XG5cdFx0XHRtc2dBcmdzWzBdID0ga2V5ICsgXCI6IFwiICsgKERFVk1PREUudmVyYm9zZSA/IG1zZ0FyZ3NbMF0gOiBcIlwiKTtcblx0XHRcdGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBtc2dBcmdzKTtcblx0XHR9XG5cdH1cbn1cblxuLy8gKGRlKW9wdGltaXphdGlvbiBmbGFnc1xuXG4vLyBmb3JjZXMgc2xvdyBib3R0b20tdXAgcmVtb3ZlQ2hpbGQgdG8gZmlyZSBkZWVwIHdpbGxSZW1vdmUvd2lsbFVubW91bnQgaG9va3MsXG52YXIgREVFUF9SRU1PVkUgPSAxO1xuLy8gcHJldmVudHMgaW5zZXJ0aW5nL3JlbW92aW5nL3Jlb3JkZXJpbmcgb2YgY2hpbGRyZW5cbnZhciBGSVhFRF9CT0RZID0gMjtcbi8vIGVuYWJsZXMgZmFzdCBrZXllZCBsb29rdXAgb2YgY2hpbGRyZW4gdmlhIGJpbmFyeSBzZWFyY2gsIGV4cGVjdHMgaG9tb2dlbmVvdXMga2V5ZWQgYm9keVxudmFyIEtFWUVEX0xJU1QgPSA0O1xuLy8gaW5kaWNhdGVzIGFuIHZub2RlIG1hdGNoL2RpZmYvcmVjeWNsZXIgZnVuY3Rpb24gZm9yIGJvZHlcbnZhciBMQVpZX0xJU1QgPSA4O1xuXG5mdW5jdGlvbiBpbml0RWxlbWVudE5vZGUodGFnLCBhdHRycywgYm9keSwgZmxhZ3MpIHtcblx0dmFyIG5vZGUgPSBuZXcgVk5vZGU7XG5cblx0bm9kZS50eXBlID0gRUxFTUVOVDtcblxuXHRpZiAoaXNTZXQoZmxhZ3MpKVxuXHRcdHsgbm9kZS5mbGFncyA9IGZsYWdzOyB9XG5cblx0bm9kZS5hdHRycyA9IGF0dHJzO1xuXG5cdHZhciBwYXJzZWQgPSBjc3NUYWcodGFnKTtcblxuXHRub2RlLnRhZyA9IHBhcnNlZC50YWc7XG5cblx0Ly8gbWVoLCB3ZWFrIGFzc2VydGlvbiwgd2lsbCBmYWlsIGZvciBpZD0wLCBldGMuXG5cdGlmIChwYXJzZWQuaWQgfHwgcGFyc2VkLmNsYXNzIHx8IHBhcnNlZC5hdHRycykge1xuXHRcdHZhciBwID0gbm9kZS5hdHRycyB8fCB7fTtcblxuXHRcdGlmIChwYXJzZWQuaWQgJiYgIWlzU2V0KHAuaWQpKVxuXHRcdFx0eyBwLmlkID0gcGFyc2VkLmlkOyB9XG5cblx0XHRpZiAocGFyc2VkLmNsYXNzKSB7XG5cdFx0XHRub2RlLl9jbGFzcyA9IHBhcnNlZC5jbGFzcztcdFx0Ly8gc3RhdGljIGNsYXNzXG5cdFx0XHRwLmNsYXNzID0gcGFyc2VkLmNsYXNzICsgKGlzU2V0KHAuY2xhc3MpID8gKFwiIFwiICsgcC5jbGFzcykgOiBcIlwiKTtcblx0XHR9XG5cdFx0aWYgKHBhcnNlZC5hdHRycykge1xuXHRcdFx0Zm9yICh2YXIga2V5IGluIHBhcnNlZC5hdHRycylcblx0XHRcdFx0eyBpZiAoIWlzU2V0KHBba2V5XSkpXG5cdFx0XHRcdFx0eyBwW2tleV0gPSBwYXJzZWQuYXR0cnNba2V5XTsgfSB9XG5cdFx0fVxuXG4vL1x0XHRpZiAobm9kZS5hdHRycyAhPT0gcClcblx0XHRcdG5vZGUuYXR0cnMgPSBwO1xuXHR9XG5cblx0dmFyIG1lcmdlZEF0dHJzID0gbm9kZS5hdHRycztcblxuXHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMpKSB7XG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9rZXkpKVxuXHRcdFx0eyBub2RlLmtleSA9IG1lcmdlZEF0dHJzLl9rZXk7IH1cblxuXHRcdGlmIChpc1NldChtZXJnZWRBdHRycy5fcmVmKSlcblx0XHRcdHsgbm9kZS5yZWYgPSBtZXJnZWRBdHRycy5fcmVmOyB9XG5cblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX2hvb2tzKSlcblx0XHRcdHsgbm9kZS5ob29rcyA9IG1lcmdlZEF0dHJzLl9ob29rczsgfVxuXG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9kYXRhKSlcblx0XHRcdHsgbm9kZS5kYXRhID0gbWVyZ2VkQXR0cnMuX2RhdGE7IH1cblxuXHRcdGlmIChpc1NldChtZXJnZWRBdHRycy5fZmxhZ3MpKVxuXHRcdFx0eyBub2RlLmZsYWdzID0gbWVyZ2VkQXR0cnMuX2ZsYWdzOyB9XG5cblx0XHRpZiAoIWlzU2V0KG5vZGUua2V5KSkge1xuXHRcdFx0aWYgKGlzU2V0KG5vZGUucmVmKSlcblx0XHRcdFx0eyBub2RlLmtleSA9IG5vZGUucmVmOyB9XG5cdFx0XHRlbHNlIGlmIChpc1NldChtZXJnZWRBdHRycy5pZCkpXG5cdFx0XHRcdHsgbm9kZS5rZXkgPSBtZXJnZWRBdHRycy5pZDsgfVxuXHRcdFx0ZWxzZSBpZiAoaXNTZXQobWVyZ2VkQXR0cnMubmFtZSkpXG5cdFx0XHRcdHsgbm9kZS5rZXkgPSBtZXJnZWRBdHRycy5uYW1lICsgKG1lcmdlZEF0dHJzLnR5cGUgPT09IFwicmFkaW9cIiB8fCBtZXJnZWRBdHRycy50eXBlID09PSBcImNoZWNrYm94XCIgPyBtZXJnZWRBdHRycy52YWx1ZSA6IFwiXCIpOyB9XG5cdFx0fVxuXHR9XG5cblx0aWYgKGJvZHkgIT0gbnVsbClcblx0XHR7IG5vZGUuYm9keSA9IGJvZHk7IH1cblxuXHR7XG5cdFx0aWYgKG5vZGUudGFnID09PSBcInN2Z1wiKSB7XG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRub2RlLm5zID09IG51bGwgJiYgZGV2Tm90aWZ5KFwiU1ZHX1dST05HX0ZBQ1RPUllcIiwgW25vZGVdKTtcblx0XHRcdH0sIDE2KTtcblx0XHR9XG5cdFx0Ly8gdG9kbzogYXR0cnMuY29udGVudGVkaXRhYmxlID09PSBcInRydWVcIj9cblx0XHRlbHNlIGlmICgvXig/OmlucHV0fHRleHRhcmVhfHNlbGVjdHxkYXRhbGlzdHxrZXlnZW58b3V0cHV0KSQvLnRlc3Qobm9kZS50YWcpICYmIG5vZGUua2V5ID09IG51bGwpXG5cdFx0XHR7IGRldk5vdGlmeShcIlVOS0VZRURfSU5QVVRcIiwgW25vZGVdKTsgfVxuXHR9XG5cblx0cmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIHNldFJlZih2bSwgbmFtZSwgbm9kZSkge1xuXHR2YXIgcGF0aCA9IFtcInJlZnNcIl0uY29uY2F0KG5hbWUuc3BsaXQoXCIuXCIpKTtcblx0ZGVlcFNldCh2bSwgcGF0aCwgbm9kZSk7XG59XG5cbmZ1bmN0aW9uIHNldERlZXBSZW1vdmUobm9kZSkge1xuXHR3aGlsZSAobm9kZSA9IG5vZGUucGFyZW50KVxuXHRcdHsgbm9kZS5mbGFncyB8PSBERUVQX1JFTU9WRTsgfVxufVxuXG4vLyB2bmV3LCB2b2xkXG5mdW5jdGlvbiBwcmVQcm9jKHZuZXcsIHBhcmVudCwgaWR4LCBvd25WbSkge1xuXHRpZiAodm5ldy50eXBlID09PSBWTU9ERUwgfHwgdm5ldy50eXBlID09PSBWVklFVylcblx0XHR7IHJldHVybjsgfVxuXG5cdHZuZXcucGFyZW50ID0gcGFyZW50O1xuXHR2bmV3LmlkeCA9IGlkeDtcblx0dm5ldy52bSA9IG93blZtO1xuXG5cdGlmICh2bmV3LnJlZiAhPSBudWxsKVxuXHRcdHsgc2V0UmVmKGdldFZtKHZuZXcpLCB2bmV3LnJlZiwgdm5ldyk7IH1cblxuXHR2YXIgbmggPSB2bmV3Lmhvb2tzLFxuXHRcdHZoID0gb3duVm0gJiYgb3duVm0uaG9va3M7XG5cblx0aWYgKG5oICYmIChuaC53aWxsUmVtb3ZlIHx8IG5oLmRpZFJlbW92ZSkgfHxcblx0XHR2aCAmJiAodmgud2lsbFVubW91bnQgfHwgdmguZGlkVW5tb3VudCkpXG5cdFx0eyBzZXREZWVwUmVtb3ZlKHZuZXcpOyB9XG5cblx0aWYgKGlzQXJyKHZuZXcuYm9keSkpXG5cdFx0eyBwcmVQcm9jQm9keSh2bmV3KTsgfVxuXHRlbHNlIHtcblx0XHRpZiAoaXNTdHJlYW0odm5ldy5ib2R5KSlcblx0XHRcdHsgdm5ldy5ib2R5ID0gaG9va1N0cmVhbSh2bmV3LmJvZHksIGdldFZtKHZuZXcpKTsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIHByZVByb2NCb2R5KHZuZXcpIHtcblx0dmFyIGJvZHkgPSB2bmV3LmJvZHk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIG5vZGUyID0gYm9keVtpXTtcblxuXHRcdC8vIHJlbW92ZSBmYWxzZS9udWxsL3VuZGVmaW5lZFxuXHRcdGlmIChub2RlMiA9PT0gZmFsc2UgfHwgbm9kZTIgPT0gbnVsbClcblx0XHRcdHsgYm9keS5zcGxpY2UoaS0tLCAxKTsgfVxuXHRcdC8vIGZsYXR0ZW4gYXJyYXlzXG5cdFx0ZWxzZSBpZiAoaXNBcnIobm9kZTIpKSB7XG5cdFx0XHR7XG5cdFx0XHRcdGlmIChpID09PSAwIHx8IGkgPT09IGJvZHkubGVuZ3RoIC0gMSlcblx0XHRcdFx0XHR7IGRldk5vdGlmeShcIkFSUkFZX0ZMQVRURU5FRFwiLCBbdm5ldywgbm9kZTJdKTsgfVxuXHRcdFx0fVxuXHRcdFx0aW5zZXJ0QXJyKGJvZHksIG5vZGUyLCBpLS0sIDEpO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdGlmIChub2RlMi50eXBlID09IG51bGwpXG5cdFx0XHRcdHsgYm9keVtpXSA9IG5vZGUyID0gZGVmaW5lVGV4dChcIlwiK25vZGUyKTsgfVxuXG5cdFx0XHRpZiAobm9kZTIudHlwZSA9PT0gVEVYVCkge1xuXHRcdFx0XHQvLyByZW1vdmUgZW1wdHkgdGV4dCBub2Rlc1xuXHRcdFx0XHRpZiAobm9kZTIuYm9keSA9PSBudWxsIHx8IG5vZGUyLmJvZHkgPT09IFwiXCIpXG5cdFx0XHRcdFx0eyBib2R5LnNwbGljZShpLS0sIDEpOyB9XG5cdFx0XHRcdC8vIG1lcmdlIHdpdGggcHJldmlvdXMgdGV4dCBub2RlXG5cdFx0XHRcdGVsc2UgaWYgKGkgPiAwICYmIGJvZHlbaS0xXS50eXBlID09PSBURVhUKSB7XG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0ZGV2Tm90aWZ5KFwiQURKQUNFTlRfVEVYVFwiLCBbdm5ldywgYm9keVtpLTFdLmJvZHksIG5vZGUyLmJvZHldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ym9keVtpLTFdLmJvZHkgKz0gbm9kZTIuYm9keTtcblx0XHRcdFx0XHRib2R5LnNwbGljZShpLS0sIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7IHByZVByb2Mobm9kZTIsIHZuZXcsIGksIG51bGwpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgcHJlUHJvYyhub2RlMiwgdm5ldywgaSwgbnVsbCk7IH1cblx0XHR9XG5cdH1cbn1cblxudmFyIHVuaXRsZXNzUHJvcHMgPSB7XG5cdGFuaW1hdGlvbkl0ZXJhdGlvbkNvdW50OiB0cnVlLFxuXHRib3hGbGV4OiB0cnVlLFxuXHRib3hGbGV4R3JvdXA6IHRydWUsXG5cdGJveE9yZGluYWxHcm91cDogdHJ1ZSxcblx0Y29sdW1uQ291bnQ6IHRydWUsXG5cdGZsZXg6IHRydWUsXG5cdGZsZXhHcm93OiB0cnVlLFxuXHRmbGV4UG9zaXRpdmU6IHRydWUsXG5cdGZsZXhTaHJpbms6IHRydWUsXG5cdGZsZXhOZWdhdGl2ZTogdHJ1ZSxcblx0ZmxleE9yZGVyOiB0cnVlLFxuXHRncmlkUm93OiB0cnVlLFxuXHRncmlkQ29sdW1uOiB0cnVlLFxuXHRvcmRlcjogdHJ1ZSxcblx0bGluZUNsYW1wOiB0cnVlLFxuXG5cdGJvcmRlckltYWdlT3V0c2V0OiB0cnVlLFxuXHRib3JkZXJJbWFnZVNsaWNlOiB0cnVlLFxuXHRib3JkZXJJbWFnZVdpZHRoOiB0cnVlLFxuXHRmb250V2VpZ2h0OiB0cnVlLFxuXHRsaW5lSGVpZ2h0OiB0cnVlLFxuXHRvcGFjaXR5OiB0cnVlLFxuXHRvcnBoYW5zOiB0cnVlLFxuXHR0YWJTaXplOiB0cnVlLFxuXHR3aWRvd3M6IHRydWUsXG5cdHpJbmRleDogdHJ1ZSxcblx0em9vbTogdHJ1ZSxcblxuXHRmaWxsT3BhY2l0eTogdHJ1ZSxcblx0Zmxvb2RPcGFjaXR5OiB0cnVlLFxuXHRzdG9wT3BhY2l0eTogdHJ1ZSxcblx0c3Ryb2tlRGFzaGFycmF5OiB0cnVlLFxuXHRzdHJva2VEYXNob2Zmc2V0OiB0cnVlLFxuXHRzdHJva2VNaXRlcmxpbWl0OiB0cnVlLFxuXHRzdHJva2VPcGFjaXR5OiB0cnVlLFxuXHRzdHJva2VXaWR0aDogdHJ1ZVxufTtcblxuZnVuY3Rpb24gYXV0b1B4KG5hbWUsIHZhbCkge1xuXHR7XG5cdFx0Ly8gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgaXMgZmFzdGVyIGJ1dCBmYWlscyBmb3IgbnVtZXJpYyBzdHJpbmdzXG5cdFx0cmV0dXJuICFpc05hTih2YWwpICYmICF1bml0bGVzc1Byb3BzW25hbWVdID8gKHZhbCArIFwicHhcIikgOiB2YWw7XG5cdH1cbn1cblxuLy8gYXNzdW1lcyBpZiBzdHlsZXMgZXhpc3QgYm90aCBhcmUgb2JqZWN0cyBvciBib3RoIGFyZSBzdHJpbmdzXG5mdW5jdGlvbiBwYXRjaFN0eWxlKG4sIG8pIHtcblx0dmFyIG5zID0gICAgIChuLmF0dHJzIHx8IGVtcHR5T2JqKS5zdHlsZTtcblx0dmFyIG9zID0gbyA/IChvLmF0dHJzIHx8IGVtcHR5T2JqKS5zdHlsZSA6IG51bGw7XG5cblx0Ly8gcmVwbGFjZSBvciByZW1vdmUgaW4gZnVsbFxuXHRpZiAobnMgPT0gbnVsbCB8fCBpc1ZhbChucykpXG5cdFx0eyBuLmVsLnN0eWxlLmNzc1RleHQgPSBuczsgfVxuXHRlbHNlIHtcblx0XHRmb3IgKHZhciBubiBpbiBucykge1xuXHRcdFx0dmFyIG52ID0gbnNbbm5dO1xuXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChpc1N0cmVhbShudikpXG5cdFx0XHRcdFx0eyBudiA9IGhvb2tTdHJlYW0obnYsIGdldFZtKG4pKTsgfVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAob3MgPT0gbnVsbCB8fCBudiAhPSBudWxsICYmIG52ICE9PSBvc1tubl0pXG5cdFx0XHRcdHsgbi5lbC5zdHlsZVtubl0gPSBhdXRvUHgobm4sIG52KTsgfVxuXHRcdH1cblxuXHRcdC8vIGNsZWFuIG9sZFxuXHRcdGlmIChvcykge1xuXHRcdFx0Zm9yICh2YXIgb24gaW4gb3MpIHtcblx0XHRcdFx0aWYgKG5zW29uXSA9PSBudWxsKVxuXHRcdFx0XHRcdHsgbi5lbC5zdHlsZVtvbl0gPSBcIlwiOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbnZhciBkaWRRdWV1ZSA9IFtdO1xuXG5mdW5jdGlvbiBmaXJlSG9vayhob29rcywgbmFtZSwgbywgbiwgaW1tZWRpYXRlKSB7XG5cdGlmIChob29rcyAhPSBudWxsKSB7XG5cdFx0dmFyIGZuID0gby5ob29rc1tuYW1lXTtcblxuXHRcdGlmIChmbikge1xuXHRcdFx0aWYgKG5hbWVbMF0gPT09IFwiZFwiICYmIG5hbWVbMV0gPT09IFwiaVwiICYmIG5hbWVbMl0gPT09IFwiZFwiKSB7XHQvLyBkaWQqXG5cdFx0XHRcdC8vXHRjb25zb2xlLmxvZyhuYW1lICsgXCIgc2hvdWxkIHF1ZXVlIHRpbGwgcmVwYWludFwiLCBvLCBuKTtcblx0XHRcdFx0aW1tZWRpYXRlID8gcmVwYWludChvLnBhcmVudCkgJiYgZm4obywgbikgOiBkaWRRdWV1ZS5wdXNoKFtmbiwgbywgbl0pO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSB7XHRcdC8vIHdpbGwqXG5cdFx0XHRcdC8vXHRjb25zb2xlLmxvZyhuYW1lICsgXCIgbWF5IGRlbGF5IGJ5IHByb21pc2VcIiwgbywgbik7XG5cdFx0XHRcdHJldHVybiBmbihvLCBuKTtcdFx0Ly8gb3IgcGFzcyAgZG9uZSgpIHJlc29sdmVyXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGRyYWluRGlkSG9va3Modm0pIHtcblx0aWYgKGRpZFF1ZXVlLmxlbmd0aCkge1xuXHRcdHJlcGFpbnQodm0ubm9kZSk7XG5cblx0XHR2YXIgaXRlbTtcblx0XHR3aGlsZSAoaXRlbSA9IGRpZFF1ZXVlLnNoaWZ0KCkpXG5cdFx0XHR7IGl0ZW1bMF0oaXRlbVsxXSwgaXRlbVsyXSk7IH1cblx0fVxufVxuXG52YXIgZG9jID0gRU5WX0RPTSA/IGRvY3VtZW50IDogbnVsbDtcblxuZnVuY3Rpb24gY2xvc2VzdFZOb2RlKGVsKSB7XG5cdHdoaWxlIChlbC5fbm9kZSA9PSBudWxsKVxuXHRcdHsgZWwgPSBlbC5wYXJlbnROb2RlOyB9XG5cdHJldHVybiBlbC5fbm9kZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIG5zKSB7XG5cdGlmIChucyAhPSBudWxsKVxuXHRcdHsgcmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50TlMobnMsIHRhZyk7IH1cblx0cmV0dXJuIGRvYy5jcmVhdGVFbGVtZW50KHRhZyk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKGJvZHkpIHtcblx0cmV0dXJuIGRvYy5jcmVhdGVUZXh0Tm9kZShib2R5KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQ29tbWVudChib2R5KSB7XG5cdHJldHVybiBkb2MuY3JlYXRlQ29tbWVudChib2R5KTtcbn1cblxuLy8gPyByZW1vdmVzIGlmICFyZWN5Y2xlZFxuZnVuY3Rpb24gbmV4dFNpYihzaWIpIHtcblx0cmV0dXJuIHNpYi5uZXh0U2libGluZztcbn1cblxuLy8gPyByZW1vdmVzIGlmICFyZWN5Y2xlZFxuZnVuY3Rpb24gcHJldlNpYihzaWIpIHtcblx0cmV0dXJuIHNpYi5wcmV2aW91c1NpYmxpbmc7XG59XG5cbi8vIFRPRE86IHRoaXMgc2hvdWxkIGNvbGxlY3QgYWxsIGRlZXAgcHJvbXMgZnJvbSBhbGwgaG9va3MgYW5kIHJldHVybiBQcm9taXNlLmFsbCgpXG5mdW5jdGlvbiBkZWVwTm90aWZ5UmVtb3ZlKG5vZGUpIHtcblx0dmFyIHZtID0gbm9kZS52bTtcblxuXHR2YXIgd3VSZXMgPSB2bSAhPSBudWxsICYmIGZpcmVIb29rKHZtLmhvb2tzLCBcIndpbGxVbm1vdW50XCIsIHZtLCB2bS5kYXRhKTtcblxuXHR2YXIgd3JSZXMgPSBmaXJlSG9vayhub2RlLmhvb2tzLCBcIndpbGxSZW1vdmVcIiwgbm9kZSk7XG5cblx0aWYgKChub2RlLmZsYWdzICYgREVFUF9SRU1PVkUpID09PSBERUVQX1JFTU9WRSAmJiBpc0Fycihub2RlLmJvZHkpKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmJvZHkubGVuZ3RoOyBpKyspXG5cdFx0XHR7IGRlZXBOb3RpZnlSZW1vdmUobm9kZS5ib2R5W2ldKTsgfVxuXHR9XG5cblx0cmV0dXJuIHd1UmVzIHx8IHdyUmVzO1xufVxuXG5mdW5jdGlvbiBfcmVtb3ZlQ2hpbGQocGFyRWwsIGVsLCBpbW1lZGlhdGUpIHtcblx0dmFyIG5vZGUgPSBlbC5fbm9kZSwgdm0gPSBub2RlLnZtO1xuXG5cdGlmIChpc0Fycihub2RlLmJvZHkpKSB7XG5cdFx0aWYgKChub2RlLmZsYWdzICYgREVFUF9SRU1PVkUpID09PSBERUVQX1JFTU9WRSkge1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmJvZHkubGVuZ3RoOyBpKyspXG5cdFx0XHRcdHsgX3JlbW92ZUNoaWxkKGVsLCBub2RlLmJvZHlbaV0uZWwpOyB9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHsgZGVlcFVucmVmKG5vZGUpOyB9XG5cdH1cblxuXHRkZWxldGUgZWwuX25vZGU7XG5cblx0cGFyRWwucmVtb3ZlQ2hpbGQoZWwpO1xuXG5cdGZpcmVIb29rKG5vZGUuaG9va3MsIFwiZGlkUmVtb3ZlXCIsIG5vZGUsIG51bGwsIGltbWVkaWF0ZSk7XG5cblx0aWYgKHZtICE9IG51bGwpIHtcblx0XHRmaXJlSG9vayh2bS5ob29rcywgXCJkaWRVbm1vdW50XCIsIHZtLCB2bS5kYXRhLCBpbW1lZGlhdGUpO1xuXHRcdHZtLm5vZGUgPSBudWxsO1xuXHR9XG59XG5cbi8vIHRvZG86IHNob3VsZCBkZWxheSBwYXJlbnQgdW5tb3VudCgpIGJ5IHJldHVybmluZyByZXMgcHJvbT9cbmZ1bmN0aW9uIHJlbW92ZUNoaWxkKHBhckVsLCBlbCkge1xuXHR2YXIgbm9kZSA9IGVsLl9ub2RlO1xuXG5cdC8vIGFscmVhZHkgbWFya2VkIGZvciByZW1vdmFsXG5cdGlmIChub2RlLl9kZWFkKSB7IHJldHVybjsgfVxuXG5cdHZhciByZXMgPSBkZWVwTm90aWZ5UmVtb3ZlKG5vZGUpO1xuXG5cdGlmIChyZXMgIT0gbnVsbCAmJiBpc1Byb20ocmVzKSkge1xuXHRcdG5vZGUuX2RlYWQgPSB0cnVlO1xuXHRcdHJlcy50aGVuKGN1cnJ5KF9yZW1vdmVDaGlsZCwgW3BhckVsLCBlbCwgdHJ1ZV0pKTtcblx0fVxuXHRlbHNlXG5cdFx0eyBfcmVtb3ZlQ2hpbGQocGFyRWwsIGVsKTsgfVxufVxuXG5mdW5jdGlvbiBkZWVwVW5yZWYobm9kZSkge1xuXHR2YXIgb2JvZHkgPSBub2RlLmJvZHk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYm9keS5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBvMiA9IG9ib2R5W2ldO1xuXHRcdGRlbGV0ZSBvMi5lbC5fbm9kZTtcblxuXHRcdGlmIChvMi52bSAhPSBudWxsKVxuXHRcdFx0eyBvMi52bS5ub2RlID0gbnVsbDsgfVxuXG5cdFx0aWYgKGlzQXJyKG8yLmJvZHkpKVxuXHRcdFx0eyBkZWVwVW5yZWYobzIpOyB9XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xlYXJDaGlsZHJlbihwYXJlbnQpIHtcblx0dmFyIHBhckVsID0gcGFyZW50LmVsO1xuXG5cdGlmICgocGFyZW50LmZsYWdzICYgREVFUF9SRU1PVkUpID09PSAwKSB7XG5cdFx0aXNBcnIocGFyZW50LmJvZHkpICYmIGRlZXBVbnJlZihwYXJlbnQpO1xuXHRcdHBhckVsLnRleHRDb250ZW50ID0gbnVsbDtcblx0fVxuXHRlbHNlIHtcblx0XHR2YXIgZWwgPSBwYXJFbC5maXJzdENoaWxkO1xuXG5cdFx0ZG8ge1xuXHRcdFx0dmFyIG5leHQgPSBuZXh0U2liKGVsKTtcblx0XHRcdHJlbW92ZUNoaWxkKHBhckVsLCBlbCk7XG5cdFx0fSB3aGlsZSAoZWwgPSBuZXh0KTtcblx0fVxufVxuXG4vLyB0b2RvOiBob29rc1xuZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHBhckVsLCBlbCwgcmVmRWwpIHtcblx0dmFyIG5vZGUgPSBlbC5fbm9kZSwgaW5Eb20gPSBlbC5wYXJlbnROb2RlICE9IG51bGw7XG5cblx0Ly8gZWwgPT09IHJlZkVsIGlzIGFzc2VydGVkIGFzIGEgbm8tb3AgaW5zZXJ0IGNhbGxlZCB0byBmaXJlIGhvb2tzXG5cdHZhciB2bSA9IChlbCA9PT0gcmVmRWwgfHwgIWluRG9tKSA/IG5vZGUudm0gOiBudWxsO1xuXG5cdGlmICh2bSAhPSBudWxsKVxuXHRcdHsgZmlyZUhvb2sodm0uaG9va3MsIFwid2lsbE1vdW50XCIsIHZtLCB2bS5kYXRhKTsgfVxuXG5cdGZpcmVIb29rKG5vZGUuaG9va3MsIGluRG9tID8gXCJ3aWxsUmVpbnNlcnRcIiA6IFwid2lsbEluc2VydFwiLCBub2RlKTtcblx0cGFyRWwuaW5zZXJ0QmVmb3JlKGVsLCByZWZFbCk7XG5cdGZpcmVIb29rKG5vZGUuaG9va3MsIGluRG9tID8gXCJkaWRSZWluc2VydFwiIDogXCJkaWRJbnNlcnRcIiwgbm9kZSk7XG5cblx0aWYgKHZtICE9IG51bGwpXG5cdFx0eyBmaXJlSG9vayh2bS5ob29rcywgXCJkaWRNb3VudFwiLCB2bSwgdm0uZGF0YSk7IH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocGFyRWwsIGVsLCByZWZFbCkge1xuXHRpbnNlcnRCZWZvcmUocGFyRWwsIGVsLCByZWZFbCA/IG5leHRTaWIocmVmRWwpIDogbnVsbCk7XG59XG5cbnZhciBvbmVtaXQgPSB7fTtcblxuZnVuY3Rpb24gZW1pdENmZyhjZmcpIHtcblx0YXNzaWduT2JqKG9uZW1pdCwgY2ZnKTtcbn1cblxuZnVuY3Rpb24gZW1pdChldk5hbWUpIHtcblx0dmFyIHRhcmcgPSB0aGlzLFxuXHRcdHNyYyA9IHRhcmc7XG5cblx0dmFyIGFyZ3MgPSBzbGljZUFyZ3MoYXJndW1lbnRzLCAxKS5jb25jYXQoc3JjLCBzcmMuZGF0YSk7XG5cblx0ZG8ge1xuXHRcdHZhciBldnMgPSB0YXJnLm9uZW1pdDtcblx0XHR2YXIgZm4gPSBldnMgPyBldnNbZXZOYW1lXSA6IG51bGw7XG5cblx0XHRpZiAoZm4pIHtcblx0XHRcdGZuLmFwcGx5KHRhcmcsIGFyZ3MpO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9IHdoaWxlICh0YXJnID0gdGFyZy5wYXJlbnQoKSk7XG5cblx0aWYgKG9uZW1pdFtldk5hbWVdKVxuXHRcdHsgb25lbWl0W2V2TmFtZV0uYXBwbHkodGFyZywgYXJncyk7IH1cbn1cblxudmFyIG9uZXZlbnQgPSBub29wO1xuXG5mdW5jdGlvbiBjb25maWcobmV3Q2ZnKSB7XG5cdG9uZXZlbnQgPSBuZXdDZmcub25ldmVudCB8fCBvbmV2ZW50O1xuXG5cdHtcblx0XHRpZiAobmV3Q2ZnLm9uZW1pdClcblx0XHRcdHsgZW1pdENmZyhuZXdDZmcub25lbWl0KTsgfVxuXHR9XG5cblx0e1xuXHRcdGlmIChuZXdDZmcuc3RyZWFtKVxuXHRcdFx0eyBzdHJlYW1DZmcobmV3Q2ZnLnN0cmVhbSk7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBiaW5kRXYoZWwsIHR5cGUsIGZuKSB7XG5cdGVsW3R5cGVdID0gZm47XG59XG5cbmZ1bmN0aW9uIGV4ZWMoZm4sIGFyZ3MsIGUsIG5vZGUsIHZtKSB7XG5cdHZhciBvdXQgPSBmbi5hcHBseSh2bSwgYXJncy5jb25jYXQoW2UsIG5vZGUsIHZtLCB2bS5kYXRhXSkpO1xuXG5cdC8vIHNob3VsZCB0aGVzZSByZXNwZWN0IG91dCA9PT0gZmFsc2U/XG5cdHZtLm9uZXZlbnQoZSwgbm9kZSwgdm0sIHZtLmRhdGEsIGFyZ3MpO1xuXHRvbmV2ZW50LmNhbGwobnVsbCwgZSwgbm9kZSwgdm0sIHZtLmRhdGEsIGFyZ3MpO1xuXG5cdGlmIChvdXQgPT09IGZhbHNlKSB7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlKGUpIHtcblx0dmFyIG5vZGUgPSBjbG9zZXN0Vk5vZGUoZS50YXJnZXQpO1xuXHR2YXIgdm0gPSBnZXRWbShub2RlKTtcblxuXHR2YXIgZXZEZWYgPSBlLmN1cnJlbnRUYXJnZXQuX25vZGUuYXR0cnNbXCJvblwiICsgZS50eXBlXSwgZm4sIGFyZ3M7XG5cblx0aWYgKGlzQXJyKGV2RGVmKSkge1xuXHRcdGZuID0gZXZEZWZbMF07XG5cdFx0YXJncyA9IGV2RGVmLnNsaWNlKDEpO1xuXHRcdGV4ZWMoZm4sIGFyZ3MsIGUsIG5vZGUsIHZtKTtcblx0fVxuXHRlbHNlIHtcblx0XHRmb3IgKHZhciBzZWwgaW4gZXZEZWYpIHtcblx0XHRcdGlmIChlLnRhcmdldC5tYXRjaGVzKHNlbCkpIHtcblx0XHRcdFx0dmFyIGV2RGVmMiA9IGV2RGVmW3NlbF07XG5cblx0XHRcdFx0aWYgKGlzQXJyKGV2RGVmMikpIHtcblx0XHRcdFx0XHRmbiA9IGV2RGVmMlswXTtcblx0XHRcdFx0XHRhcmdzID0gZXZEZWYyLnNsaWNlKDEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdGZuID0gZXZEZWYyO1xuXHRcdFx0XHRcdGFyZ3MgPSBbXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGV4ZWMoZm4sIGFyZ3MsIGUsIG5vZGUsIHZtKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hFdmVudChub2RlLCBuYW1lLCBudmFsLCBvdmFsKSB7XG5cdGlmIChudmFsID09PSBvdmFsKVxuXHRcdHsgcmV0dXJuOyB9XG5cblx0e1xuXHRcdGlmIChpc0Z1bmMobnZhbCkgJiYgaXNGdW5jKG92YWwpICYmIG92YWwubmFtZSA9PSBudmFsLm5hbWUpXG5cdFx0XHR7IGRldk5vdGlmeShcIklOTElORV9IQU5ETEVSXCIsIFtub2RlLCBvdmFsLCBudmFsXSk7IH1cblxuXHRcdGlmIChvdmFsICE9IG51bGwgJiYgbnZhbCAhPSBudWxsICYmXG5cdFx0XHQoXG5cdFx0XHRcdGlzQXJyKG92YWwpICE9IGlzQXJyKG52YWwpIHx8XG5cdFx0XHRcdGlzUGxhaW5PYmoob3ZhbCkgIT0gaXNQbGFpbk9iaihudmFsKSB8fFxuXHRcdFx0XHRpc0Z1bmMob3ZhbCkgIT0gaXNGdW5jKG52YWwpXG5cdFx0XHQpXG5cdFx0KSB7IGRldk5vdGlmeShcIk1JU01BVENIRURfSEFORExFUlwiLCBbbm9kZSwgb3ZhbCwgbnZhbF0pOyB9XG5cdH1cblxuXHR2YXIgZWwgPSBub2RlLmVsO1xuXG5cdGlmIChudmFsID09IG51bGwgfHwgaXNGdW5jKG52YWwpKVxuXHRcdHsgYmluZEV2KGVsLCBuYW1lLCBudmFsKTsgfVxuXHRlbHNlIGlmIChvdmFsID09IG51bGwpXG5cdFx0eyBiaW5kRXYoZWwsIG5hbWUsIGhhbmRsZSk7IH1cbn1cblxuZnVuY3Rpb24gcmVtQXR0cihub2RlLCBuYW1lLCBhc1Byb3ApIHtcblx0aWYgKG5hbWVbMF0gPT09IFwiLlwiKSB7XG5cdFx0bmFtZSA9IG5hbWUuc3Vic3RyKDEpO1xuXHRcdGFzUHJvcCA9IHRydWU7XG5cdH1cblxuXHRpZiAoYXNQcm9wKVxuXHRcdHsgbm9kZS5lbFtuYW1lXSA9IFwiXCI7IH1cblx0ZWxzZVxuXHRcdHsgbm9kZS5lbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7IH1cbn1cblxuLy8gc2V0QXR0clxuLy8gZGlmZiwgXCIuXCIsIFwib24qXCIsIGJvb2wgdmFscywgc2tpcCBfKiwgdmFsdWUvY2hlY2tlZC9zZWxlY3RlZCBzZWxlY3RlZEluZGV4XG5mdW5jdGlvbiBzZXRBdHRyKG5vZGUsIG5hbWUsIHZhbCwgYXNQcm9wLCBpbml0aWFsKSB7XG5cdHZhciBlbCA9IG5vZGUuZWw7XG5cblx0aWYgKHZhbCA9PSBudWxsKVxuXHRcdHsgIWluaXRpYWwgJiYgcmVtQXR0cihub2RlLCBuYW1lLCBmYWxzZSk7IH1cdFx0Ly8gd2lsbCBhbHNvIHJlbW92ZUF0dHIgb2Ygc3R5bGU6IG51bGxcblx0ZWxzZSBpZiAobm9kZS5ucyAhPSBudWxsKVxuXHRcdHsgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbCk7IH1cblx0ZWxzZSBpZiAobmFtZSA9PT0gXCJjbGFzc1wiKVxuXHRcdHsgZWwuY2xhc3NOYW1lID0gdmFsOyB9XG5cdGVsc2UgaWYgKG5hbWUgPT09IFwiaWRcIiB8fCB0eXBlb2YgdmFsID09PSBcImJvb2xlYW5cIiB8fCBhc1Byb3ApXG5cdFx0eyBlbFtuYW1lXSA9IHZhbDsgfVxuXHRlbHNlIGlmIChuYW1lWzBdID09PSBcIi5cIilcblx0XHR7IGVsW25hbWUuc3Vic3RyKDEpXSA9IHZhbDsgfVxuXHRlbHNlXG5cdFx0eyBlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTsgfVxufVxuXG5mdW5jdGlvbiBwYXRjaEF0dHJzKHZub2RlLCBkb25vciwgaW5pdGlhbCkge1xuXHR2YXIgbmF0dHJzID0gdm5vZGUuYXR0cnMgfHwgZW1wdHlPYmo7XG5cdHZhciBvYXR0cnMgPSBkb25vci5hdHRycyB8fCBlbXB0eU9iajtcblxuXHRpZiAobmF0dHJzID09PSBvYXR0cnMpIHtcblx0XHR7IGRldk5vdGlmeShcIlJFVVNFRF9BVFRSU1wiLCBbdm5vZGVdKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGZvciAodmFyIGtleSBpbiBuYXR0cnMpIHtcblx0XHRcdHZhciBudmFsID0gbmF0dHJzW2tleV07XG5cdFx0XHR2YXIgaXNEeW4gPSBpc0R5blByb3Aodm5vZGUudGFnLCBrZXkpO1xuXHRcdFx0dmFyIG92YWwgPSBpc0R5biA/IHZub2RlLmVsW2tleV0gOiBvYXR0cnNba2V5XTtcblxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoaXNTdHJlYW0obnZhbCkpXG5cdFx0XHRcdFx0eyBuYXR0cnNba2V5XSA9IG52YWwgPSBob29rU3RyZWFtKG52YWwsIGdldFZtKHZub2RlKSk7IH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG52YWwgPT09IG92YWwpIHt9XG5cdFx0XHRlbHNlIGlmIChpc1N0eWxlUHJvcChrZXkpKVxuXHRcdFx0XHR7IHBhdGNoU3R5bGUodm5vZGUsIGRvbm9yKTsgfVxuXHRcdFx0ZWxzZSBpZiAoaXNTcGxQcm9wKGtleSkpIHt9XG5cdFx0XHRlbHNlIGlmIChpc0V2UHJvcChrZXkpKVxuXHRcdFx0XHR7IHBhdGNoRXZlbnQodm5vZGUsIGtleSwgbnZhbCwgb3ZhbCk7IH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBzZXRBdHRyKHZub2RlLCBrZXksIG52YWwsIGlzRHluLCBpbml0aWFsKTsgfVxuXHRcdH1cblxuXHRcdC8vIFRPRE86IGJlbmNoIHN0eWxlLmNzc1RleHQgPSBcIlwiIHZzIHJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpXG5cdFx0Zm9yICh2YXIga2V5IGluIG9hdHRycykge1xuXHRcdFx0IShrZXkgaW4gbmF0dHJzKSAmJlxuXHRcdFx0IWlzU3BsUHJvcChrZXkpICYmXG5cdFx0XHRyZW1BdHRyKHZub2RlLCBrZXksIGlzRHluUHJvcCh2bm9kZS50YWcsIGtleSkgfHwgaXNFdlByb3Aoa2V5KSk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZpZXcodmlldywgZGF0YSwga2V5LCBvcHRzKSB7XG5cdGlmICh2aWV3LnR5cGUgPT09IFZWSUVXKSB7XG5cdFx0ZGF0YVx0PSB2aWV3LmRhdGE7XG5cdFx0a2V5XHRcdD0gdmlldy5rZXk7XG5cdFx0b3B0c1x0PSB2aWV3Lm9wdHM7XG5cdFx0dmlld1x0PSB2aWV3LnZpZXc7XG5cdH1cblxuXHRyZXR1cm4gbmV3IFZpZXdNb2RlbCh2aWV3LCBkYXRhLCBrZXksIG9wdHMpO1xufVxuXG4vL2ltcG9ydCB7IFhNTF9OUywgWExJTktfTlMgfSBmcm9tICcuL2RlZmluZVN2Z0VsZW1lbnQnO1xuZnVuY3Rpb24gaHlkcmF0ZUJvZHkodm5vZGUpIHtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2bm9kZS5ib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHZub2RlMiA9IHZub2RlLmJvZHlbaV07XG5cdFx0dmFyIHR5cGUyID0gdm5vZGUyLnR5cGU7XG5cblx0XHQvLyBFTEVNRU5ULFRFWFQsQ09NTUVOVFxuXHRcdGlmICh0eXBlMiA8PSBDT01NRU5UKVxuXHRcdFx0eyBpbnNlcnRCZWZvcmUodm5vZGUuZWwsIGh5ZHJhdGUodm5vZGUyKSk7IH1cdFx0Ly8gdm5vZGUuZWwuYXBwZW5kQ2hpbGQoaHlkcmF0ZSh2bm9kZTIpKVxuXHRcdGVsc2UgaWYgKHR5cGUyID09PSBWVklFVykge1xuXHRcdFx0dmFyIHZtID0gY3JlYXRlVmlldyh2bm9kZTIudmlldywgdm5vZGUyLmRhdGEsIHZub2RlMi5rZXksIHZub2RlMi5vcHRzKS5fcmVkcmF3KHZub2RlLCBpLCBmYWxzZSk7XHRcdC8vIHRvZG86IGhhbmRsZSBuZXcgZGF0YSB1cGRhdGVzXG5cdFx0XHR0eXBlMiA9IHZtLm5vZGUudHlwZTtcblx0XHRcdGluc2VydEJlZm9yZSh2bm9kZS5lbCwgaHlkcmF0ZSh2bS5ub2RlKSk7XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHR5cGUyID09PSBWTU9ERUwpIHtcblx0XHRcdHZhciB2bSA9IHZub2RlMi52bTtcblx0XHRcdHZtLl9yZWRyYXcodm5vZGUsIGkpO1x0XHRcdFx0XHQvLyAsIGZhbHNlXG5cdFx0XHR0eXBlMiA9IHZtLm5vZGUudHlwZTtcblx0XHRcdGluc2VydEJlZm9yZSh2bm9kZS5lbCwgdm0ubm9kZS5lbCk7XHRcdC8vICwgaHlkcmF0ZSh2bS5ub2RlKVxuXHRcdH1cblx0fVxufVxuXG4vLyAgVE9ETzogRFJZIHRoaXMgb3V0LiByZXVzaW5nIG5vcm1hbCBwYXRjaCBoZXJlIG5lZ2F0aXZlbHkgYWZmZWN0cyBWOCdzIEpJVFxuZnVuY3Rpb24gaHlkcmF0ZSh2bm9kZSwgd2l0aEVsKSB7XG5cdGlmICh2bm9kZS5lbCA9PSBudWxsKSB7XG5cdFx0aWYgKHZub2RlLnR5cGUgPT09IEVMRU1FTlQpIHtcblx0XHRcdHZub2RlLmVsID0gd2l0aEVsIHx8IGNyZWF0ZUVsZW1lbnQodm5vZGUudGFnLCB2bm9kZS5ucyk7XG5cblx0XHQvL1x0aWYgKHZub2RlLnRhZyA9PT0gXCJzdmdcIilcblx0XHQvL1x0XHR2bm9kZS5lbC5zZXRBdHRyaWJ1dGVOUyhYTUxfTlMsICd4bWxuczp4bGluaycsIFhMSU5LX05TKTtcblxuXHRcdFx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwpXG5cdFx0XHRcdHsgcGF0Y2hBdHRycyh2bm9kZSwgZW1wdHlPYmosIHRydWUpOyB9XG5cblx0XHRcdGlmICgodm5vZGUuZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1QpXHQvLyB2bm9kZS5ib2R5IGluc3RhbmNlb2YgTGF6eUxpc3Rcblx0XHRcdFx0eyB2bm9kZS5ib2R5LmJvZHkodm5vZGUpOyB9XG5cblx0XHRcdGlmIChpc0Fycih2bm9kZS5ib2R5KSlcblx0XHRcdFx0eyBoeWRyYXRlQm9keSh2bm9kZSk7IH1cblx0XHRcdGVsc2UgaWYgKHZub2RlLmJvZHkgIT0gbnVsbCAmJiB2bm9kZS5ib2R5ICE9PSBcIlwiKVxuXHRcdFx0XHR7IHZub2RlLmVsLnRleHRDb250ZW50ID0gdm5vZGUuYm9keTsgfVxuXHRcdH1cblx0XHRlbHNlIGlmICh2bm9kZS50eXBlID09PSBURVhUKVxuXHRcdFx0eyB2bm9kZS5lbCA9IHdpdGhFbCB8fCBjcmVhdGVUZXh0Tm9kZSh2bm9kZS5ib2R5KTsgfVxuXHRcdGVsc2UgaWYgKHZub2RlLnR5cGUgPT09IENPTU1FTlQpXG5cdFx0XHR7IHZub2RlLmVsID0gd2l0aEVsIHx8IGNyZWF0ZUNvbW1lbnQodm5vZGUuYm9keSk7IH1cblx0fVxuXG5cdHZub2RlLmVsLl9ub2RlID0gdm5vZGU7XG5cblx0cmV0dXJuIHZub2RlLmVsO1xufVxuXG4vLyBwcmV2ZW50IEdDQyBmcm9tIGlubGluaW5nIHNvbWUgbGFyZ2UgZnVuY3MgKHdoaWNoIG5lZ2F0aXZlbHkgYWZmZWN0cyBDaHJvbWUncyBKSVQpXG4vL3dpbmRvdy5zeW5jQ2hpbGRyZW4gPSBzeW5jQ2hpbGRyZW47XG53aW5kb3cubGlzTW92ZSA9IGxpc01vdmU7XG5cbmZ1bmN0aW9uIG5leHROb2RlKG5vZGUsIGJvZHkpIHtcblx0cmV0dXJuIGJvZHlbbm9kZS5pZHggKyAxXTtcbn1cblxuZnVuY3Rpb24gcHJldk5vZGUobm9kZSwgYm9keSkge1xuXHRyZXR1cm4gYm9keVtub2RlLmlkeCAtIDFdO1xufVxuXG5mdW5jdGlvbiBwYXJlbnROb2RlKG5vZGUpIHtcblx0cmV0dXJuIG5vZGUucGFyZW50O1xufVxuXG52YXIgQlJFQUsgPSAxO1xudmFyIEJSRUFLX0FMTCA9IDI7XG5cbmZ1bmN0aW9uIHN5bmNEaXIoYWR2U2liLCBhZHZOb2RlLCBpbnNlcnQsIHNpYk5hbWUsIG5vZGVOYW1lLCBpbnZTaWJOYW1lLCBpbnZOb2RlTmFtZSwgaW52SW5zZXJ0KSB7XG5cdHJldHVybiBmdW5jdGlvbihub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUsIGNvbnZUZXN0LCBsaXMpIHtcblx0XHR2YXIgc2liTm9kZSwgdG1wU2liO1xuXG5cdFx0aWYgKHN0YXRlW3NpYk5hbWVdICE9IG51bGwpIHtcblx0XHRcdC8vIHNraXAgZG9tIGVsZW1lbnRzIG5vdCBjcmVhdGVkIGJ5IGRvbXZtXG5cdFx0XHRpZiAoKHNpYk5vZGUgPSBzdGF0ZVtzaWJOYW1lXS5fbm9kZSkgPT0gbnVsbCkge1xuXHRcdFx0XHR7IGRldk5vdGlmeShcIkZPUkVJR05fRUxFTUVOVFwiLCBbc3RhdGVbc2liTmFtZV1dKTsgfVxuXG5cdFx0XHRcdHN0YXRlW3NpYk5hbWVdID0gYWR2U2liKHN0YXRlW3NpYk5hbWVdKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocGFyZW50Tm9kZShzaWJOb2RlKSAhPT0gbm9kZSkge1xuXHRcdFx0XHR0bXBTaWIgPSBhZHZTaWIoc3RhdGVbc2liTmFtZV0pO1xuXHRcdFx0XHRzaWJOb2RlLnZtICE9IG51bGwgPyBzaWJOb2RlLnZtLnVubW91bnQodHJ1ZSkgOiByZW1vdmVDaGlsZChwYXJFbCwgc3RhdGVbc2liTmFtZV0pO1xuXHRcdFx0XHRzdGF0ZVtzaWJOYW1lXSA9IHRtcFNpYjtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChzdGF0ZVtub2RlTmFtZV0gPT0gY29udlRlc3QpXG5cdFx0XHR7IHJldHVybiBCUkVBS19BTEw7IH1cblx0XHRlbHNlIGlmIChzdGF0ZVtub2RlTmFtZV0uZWwgPT0gbnVsbCkge1xuXHRcdFx0aW5zZXJ0KHBhckVsLCBoeWRyYXRlKHN0YXRlW25vZGVOYW1lXSksIHN0YXRlW3NpYk5hbWVdKTtcdC8vIHNob3VsZCBsaXMgYmUgdXBkYXRlZCBoZXJlP1xuXHRcdFx0c3RhdGVbbm9kZU5hbWVdID0gYWR2Tm9kZShzdGF0ZVtub2RlTmFtZV0sIGJvZHkpO1x0XHQvLyBhbHNvIG5lZWQgdG8gYWR2YW5jZSBzaWI/XG5cdFx0fVxuXHRcdGVsc2UgaWYgKHN0YXRlW25vZGVOYW1lXS5lbCA9PT0gc3RhdGVbc2liTmFtZV0pIHtcblx0XHRcdHN0YXRlW25vZGVOYW1lXSA9IGFkdk5vZGUoc3RhdGVbbm9kZU5hbWVdLCBib2R5KTtcblx0XHRcdHN0YXRlW3NpYk5hbWVdID0gYWR2U2liKHN0YXRlW3NpYk5hbWVdKTtcblx0XHR9XG5cdFx0Ly8gaGVhZC0+dGFpbCBvciB0YWlsLT5oZWFkXG5cdFx0ZWxzZSBpZiAoIWxpcyAmJiBzaWJOb2RlID09PSBzdGF0ZVtpbnZOb2RlTmFtZV0pIHtcblx0XHRcdHRtcFNpYiA9IHN0YXRlW3NpYk5hbWVdO1xuXHRcdFx0c3RhdGVbc2liTmFtZV0gPSBhZHZTaWIodG1wU2liKTtcblx0XHRcdGludkluc2VydChwYXJFbCwgdG1wU2liLCBzdGF0ZVtpbnZTaWJOYW1lXSk7XG5cdFx0XHRzdGF0ZVtpbnZTaWJOYW1lXSA9IHRtcFNpYjtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR7XG5cdFx0XHRcdGlmIChzdGF0ZVtub2RlTmFtZV0udm0gIT0gbnVsbClcblx0XHRcdFx0XHR7IGRldk5vdGlmeShcIkFMUkVBRFlfSFlEUkFURURcIiwgW3N0YXRlW25vZGVOYW1lXS52bV0pOyB9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChsaXMgJiYgc3RhdGVbc2liTmFtZV0gIT0gbnVsbClcblx0XHRcdFx0eyByZXR1cm4gbGlzTW92ZShhZHZTaWIsIGFkdk5vZGUsIGluc2VydCwgc2liTmFtZSwgbm9kZU5hbWUsIHBhckVsLCBib2R5LCBzaWJOb2RlLCBzdGF0ZSk7IH1cblxuXHRcdFx0cmV0dXJuIEJSRUFLO1xuXHRcdH1cblx0fTtcbn1cblxuZnVuY3Rpb24gbGlzTW92ZShhZHZTaWIsIGFkdk5vZGUsIGluc2VydCwgc2liTmFtZSwgbm9kZU5hbWUsIHBhckVsLCBib2R5LCBzaWJOb2RlLCBzdGF0ZSkge1xuXHRpZiAoc2liTm9kZS5fbGlzKSB7XG5cdFx0aW5zZXJ0KHBhckVsLCBzdGF0ZVtub2RlTmFtZV0uZWwsIHN0YXRlW3NpYk5hbWVdKTtcblx0XHRzdGF0ZVtub2RlTmFtZV0gPSBhZHZOb2RlKHN0YXRlW25vZGVOYW1lXSwgYm9keSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gZmluZCBjbG9zZXN0IHRvbWJcblx0XHR2YXIgdCA9IGJpbmFyeUZpbmRMYXJnZXIoc2liTm9kZS5pZHgsIHN0YXRlLnRvbWJzKTtcblx0XHRzaWJOb2RlLl9saXMgPSB0cnVlO1xuXHRcdHZhciB0bXBTaWIgPSBhZHZTaWIoc3RhdGVbc2liTmFtZV0pO1xuXHRcdGluc2VydChwYXJFbCwgc3RhdGVbc2liTmFtZV0sIHQgIT0gbnVsbCA/IGJvZHlbc3RhdGUudG9tYnNbdF1dLmVsIDogdCk7XG5cblx0XHRpZiAodCA9PSBudWxsKVxuXHRcdFx0eyBzdGF0ZS50b21icy5wdXNoKHNpYk5vZGUuaWR4KTsgfVxuXHRcdGVsc2Vcblx0XHRcdHsgc3RhdGUudG9tYnMuc3BsaWNlKHQsIDAsIHNpYk5vZGUuaWR4KTsgfVxuXG5cdFx0c3RhdGVbc2liTmFtZV0gPSB0bXBTaWI7XG5cdH1cbn1cblxudmFyIHN5bmNMZnQgPSBzeW5jRGlyKG5leHRTaWIsIG5leHROb2RlLCBpbnNlcnRCZWZvcmUsIFwibGZ0U2liXCIsIFwibGZ0Tm9kZVwiLCBcInJndFNpYlwiLCBcInJndE5vZGVcIiwgaW5zZXJ0QWZ0ZXIpO1xudmFyIHN5bmNSZ3QgPSBzeW5jRGlyKHByZXZTaWIsIHByZXZOb2RlLCBpbnNlcnRBZnRlciwgXCJyZ3RTaWJcIiwgXCJyZ3ROb2RlXCIsIFwibGZ0U2liXCIsIFwibGZ0Tm9kZVwiLCBpbnNlcnRCZWZvcmUpO1xuXG5mdW5jdGlvbiBzeW5jQ2hpbGRyZW4obm9kZSwgZG9ub3IpIHtcblx0dmFyIG9ib2R5XHQ9IGRvbm9yLmJvZHksXG5cdFx0cGFyRWxcdD0gbm9kZS5lbCxcblx0XHRib2R5XHQ9IG5vZGUuYm9keSxcblx0XHRzdGF0ZSA9IHtcblx0XHRcdGxmdE5vZGU6XHRib2R5WzBdLFxuXHRcdFx0cmd0Tm9kZTpcdGJvZHlbYm9keS5sZW5ndGggLSAxXSxcblx0XHRcdGxmdFNpYjpcdFx0KChvYm9keSlbMF0gfHwgZW1wdHlPYmopLmVsLFxuXHRcdFx0cmd0U2liOlx0XHQob2JvZHlbb2JvZHkubGVuZ3RoIC0gMV0gfHwgZW1wdHlPYmopLmVsLFxuXHRcdH07XG5cblx0Y29udmVyZ2U6XG5cdHdoaWxlICgxKSB7XG4vL1x0XHRmcm9tX2xlZnQ6XG5cdFx0d2hpbGUgKDEpIHtcblx0XHRcdHZhciBsID0gc3luY0xmdChub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUsIG51bGwsIGZhbHNlKTtcblx0XHRcdGlmIChsID09PSBCUkVBSykgeyBicmVhazsgfVxuXHRcdFx0aWYgKGwgPT09IEJSRUFLX0FMTCkgeyBicmVhayBjb252ZXJnZTsgfVxuXHRcdH1cblxuLy9cdFx0ZnJvbV9yaWdodDpcblx0XHR3aGlsZSAoMSkge1xuXHRcdFx0dmFyIHIgPSBzeW5jUmd0KG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSwgc3RhdGUubGZ0Tm9kZSwgZmFsc2UpO1xuXHRcdFx0aWYgKHIgPT09IEJSRUFLKSB7IGJyZWFrOyB9XG5cdFx0XHRpZiAociA9PT0gQlJFQUtfQUxMKSB7IGJyZWFrIGNvbnZlcmdlOyB9XG5cdFx0fVxuXG5cdFx0c29ydERPTShub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUpO1xuXHRcdGJyZWFrO1xuXHR9XG59XG5cbi8vIFRPRE86IGFsc28gdXNlIHRoZSBzdGF0ZS5yZ3RTaWIgYW5kIHN0YXRlLnJndE5vZGUgYm91bmRzLCBwbHVzIHJlZHVjZSBMSVMgcmFuZ2VcbmZ1bmN0aW9uIHNvcnRET00obm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlKSB7XG5cdHZhciBraWRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwocGFyRWwuY2hpbGROb2Rlcyk7XG5cdHZhciBkb21JZHhzID0gW107XG5cblx0Zm9yICh2YXIgayA9IDA7IGsgPCBraWRzLmxlbmd0aDsgaysrKSB7XG5cdFx0dmFyIG4gPSBraWRzW2tdLl9ub2RlO1xuXG5cdFx0aWYgKG4ucGFyZW50ID09PSBub2RlKVxuXHRcdFx0eyBkb21JZHhzLnB1c2gobi5pZHgpOyB9XG5cdH1cblxuXHQvLyBsaXN0IG9mIG5vbi1tb3ZhYmxlIHZub2RlIGluZGljZXMgKGFscmVhZHkgaW4gY29ycmVjdCBvcmRlciBpbiBvbGQgZG9tKVxuXHR2YXIgdG9tYnMgPSBsb25nZXN0SW5jcmVhc2luZ1N1YnNlcXVlbmNlKGRvbUlkeHMpLm1hcChmdW5jdGlvbiAoaSkgeyByZXR1cm4gZG9tSWR4c1tpXTsgfSk7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0b21icy5sZW5ndGg7IGkrKylcblx0XHR7IGJvZHlbdG9tYnNbaV1dLl9saXMgPSB0cnVlOyB9XG5cblx0c3RhdGUudG9tYnMgPSB0b21icztcblxuXHR3aGlsZSAoMSkge1xuXHRcdHZhciByID0gc3luY0xmdChub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUsIG51bGwsIHRydWUpO1xuXHRcdGlmIChyID09PSBCUkVBS19BTEwpIHsgYnJlYWs7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBhbHJlYWR5QWRvcHRlZCh2bm9kZSkge1xuXHRyZXR1cm4gdm5vZGUuZWwuX25vZGUucGFyZW50ICE9PSB2bm9kZS5wYXJlbnQ7XG59XG5cbmZ1bmN0aW9uIHRha2VTZXFJbmRleChuLCBvYm9keSwgZnJvbUlkeCkge1xuXHRyZXR1cm4gb2JvZHlbZnJvbUlkeF07XG59XG5cbmZ1bmN0aW9uIGZpbmRTZXFUaG9yb3VnaChuLCBvYm9keSwgZnJvbUlkeCkge1x0XHQvLyBwcmUtdGVzdGVkIGlzVmlldz9cblx0Zm9yICg7IGZyb21JZHggPCBvYm9keS5sZW5ndGg7IGZyb21JZHgrKykge1xuXHRcdHZhciBvID0gb2JvZHlbZnJvbUlkeF07XG5cblx0XHRpZiAoby52bSAhPSBudWxsKSB7XG5cdFx0XHQvLyBtYXRjaCBieSBrZXkgJiB2aWV3Rm4gfHwgdm1cblx0XHRcdGlmIChuLnR5cGUgPT09IFZWSUVXICYmIG8udm0udmlldyA9PT0gbi52aWV3ICYmIG8udm0ua2V5ID09PSBuLmtleSB8fCBuLnR5cGUgPT09IFZNT0RFTCAmJiBvLnZtID09PSBuLnZtKVxuXHRcdFx0XHR7IHJldHVybiBvOyB9XG5cdFx0fVxuXHRcdGVsc2UgaWYgKCFhbHJlYWR5QWRvcHRlZChvKSAmJiBuLnRhZyA9PT0gby50YWcgJiYgbi50eXBlID09PSBvLnR5cGUgJiYgbi5rZXkgPT09IG8ua2V5ICYmIChuLmZsYWdzICYgfkRFRVBfUkVNT1ZFKSA9PT0gKG8uZmxhZ3MgJiB+REVFUF9SRU1PVkUpKVxuXHRcdFx0eyByZXR1cm4gbzsgfVxuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGZpbmRIYXNoS2V5ZWQobiwgb2JvZHksIGZyb21JZHgpIHtcblx0cmV0dXJuIG9ib2R5W29ib2R5Ll9rZXlzW24ua2V5XV07XG59XG5cbi8qXG4vLyBsaXN0IG11c3QgYmUgYSBzb3J0ZWQgbGlzdCBvZiB2bm9kZXMgYnkga2V5XG5mdW5jdGlvbiBmaW5kQmluS2V5ZWQobiwgbGlzdCkge1xuXHR2YXIgaWR4ID0gYmluYXJ5S2V5U2VhcmNoKGxpc3QsIG4ua2V5KTtcblx0cmV0dXJuIGlkeCA+IC0xID8gbGlzdFtpZHhdIDogbnVsbDtcbn1cbiovXG5cbi8vIGhhdmUgaXQgaGFuZGxlIGluaXRpYWwgaHlkcmF0ZT8gIWRvbm9yP1xuLy8gdHlwZXMgKGFuZCB0YWdzIGlmIEVMRU0pIGFyZSBhc3N1bWVkIHRoZSBzYW1lLCBhbmQgZG9ub3IgZXhpc3RzXG5mdW5jdGlvbiBwYXRjaCh2bm9kZSwgZG9ub3IpIHtcblx0ZmlyZUhvb2soZG9ub3IuaG9va3MsIFwid2lsbFJlY3ljbGVcIiwgZG9ub3IsIHZub2RlKTtcblxuXHR2YXIgZWwgPSB2bm9kZS5lbCA9IGRvbm9yLmVsO1xuXG5cdHZhciBvYm9keSA9IGRvbm9yLmJvZHk7XG5cdHZhciBuYm9keSA9IHZub2RlLmJvZHk7XG5cblx0ZWwuX25vZGUgPSB2bm9kZTtcblxuXHQvLyBcIlwiID0+IFwiXCJcblx0aWYgKHZub2RlLnR5cGUgPT09IFRFWFQgJiYgbmJvZHkgIT09IG9ib2R5KSB7XG5cdFx0ZWwubm9kZVZhbHVlID0gbmJvZHk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0aWYgKHZub2RlLmF0dHJzICE9IG51bGwgfHwgZG9ub3IuYXR0cnMgIT0gbnVsbClcblx0XHR7IHBhdGNoQXR0cnModm5vZGUsIGRvbm9yLCBmYWxzZSk7IH1cblxuXHQvLyBwYXRjaCBldmVudHNcblxuXHR2YXIgb2xkSXNBcnIgPSBpc0FycihvYm9keSk7XG5cdHZhciBuZXdJc0FyciA9IGlzQXJyKG5ib2R5KTtcblx0dmFyIGxhenlMaXN0ID0gKHZub2RlLmZsYWdzICYgTEFaWV9MSVNUKSA9PT0gTEFaWV9MSVNUO1xuXG4vL1x0dmFyIG5vbkVxTmV3Qm9keSA9IG5ib2R5ICE9IG51bGwgJiYgbmJvZHkgIT09IG9ib2R5O1xuXG5cdGlmIChvbGRJc0Fycikge1xuXHRcdC8vIFtdID0+IFtdXG5cdFx0aWYgKG5ld0lzQXJyIHx8IGxhenlMaXN0KVxuXHRcdFx0eyBwYXRjaENoaWxkcmVuKHZub2RlLCBkb25vcik7IH1cblx0XHQvLyBbXSA9PiBcIlwiIHwgbnVsbFxuXHRcdGVsc2UgaWYgKG5ib2R5ICE9PSBvYm9keSkge1xuXHRcdFx0aWYgKG5ib2R5ICE9IG51bGwpXG5cdFx0XHRcdHsgZWwudGV4dENvbnRlbnQgPSBuYm9keTsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IGNsZWFyQ2hpbGRyZW4oZG9ub3IpOyB9XG5cdFx0fVxuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIFwiXCIgfCBudWxsID0+IFtdXG5cdFx0aWYgKG5ld0lzQXJyKSB7XG5cdFx0XHRjbGVhckNoaWxkcmVuKGRvbm9yKTtcblx0XHRcdGh5ZHJhdGVCb2R5KHZub2RlKTtcblx0XHR9XG5cdFx0Ly8gXCJcIiB8IG51bGwgPT4gXCJcIiB8IG51bGxcblx0XHRlbHNlIGlmIChuYm9keSAhPT0gb2JvZHkpIHtcblx0XHRcdGlmIChlbC5maXJzdENoaWxkKVxuXHRcdFx0XHR7IGVsLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmJvZHk7IH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBlbC50ZXh0Q29udGVudCA9IG5ib2R5OyB9XG5cdFx0fVxuXHR9XG5cblx0ZmlyZUhvb2soZG9ub3IuaG9va3MsIFwiZGlkUmVjeWNsZVwiLCBkb25vciwgdm5vZGUpO1xufVxuXG4vLyBsYXJnZXIgcXR5cyBvZiBLRVlFRF9MSVNUIGNoaWxkcmVuIHdpbGwgdXNlIGJpbmFyeSBzZWFyY2hcbi8vY29uc3QgU0VRX0ZBSUxTX01BWCA9IDEwMDtcblxuLy8gVE9ETzogbW9kaWZ5IHZ0cmVlIG1hdGNoZXIgdG8gd29yayBzaW1pbGFyIHRvIGRvbSByZWNvbmNpbGVyIGZvciBrZXllZCBmcm9tIGxlZnQgLT4gZnJvbSByaWdodCAtPiBoZWFkL3RhaWwgLT4gYmluYXJ5XG4vLyBmYWxsIGJhY2sgdG8gYmluYXJ5IGlmIGFmdGVyIGZhaWxpbmcgbnJpIC0gbmxpID4gU0VRX0ZBSUxTX01BWFxuLy8gd2hpbGUtYWR2YW5jZSBub24ta2V5ZWQgZnJvbUlkeFxuLy8gW10gPT4gW11cbmZ1bmN0aW9uIHBhdGNoQ2hpbGRyZW4odm5vZGUsIGRvbm9yKSB7XG5cdHZhciBuYm9keVx0XHQ9IHZub2RlLmJvZHksXG5cdFx0bmxlblx0XHQ9IG5ib2R5Lmxlbmd0aCxcblx0XHRvYm9keVx0XHQ9IGRvbm9yLmJvZHksXG5cdFx0b2xlblx0XHQ9IG9ib2R5Lmxlbmd0aCxcblx0XHRpc0xhenlcdFx0PSAodm5vZGUuZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1QsXG5cdFx0aXNGaXhlZFx0XHQ9ICh2bm9kZS5mbGFncyAmIEZJWEVEX0JPRFkpID09PSBGSVhFRF9CT0RZLFxuXHRcdGlzS2V5ZWRcdFx0PSAodm5vZGUuZmxhZ3MgJiBLRVlFRF9MSVNUKSA9PT0gS0VZRURfTElTVCxcblx0XHRkb21TeW5jXHRcdD0gIWlzRml4ZWQgJiYgdm5vZGUudHlwZSA9PT0gRUxFTUVOVCxcblx0XHRkb0ZpbmRcdFx0PSB0cnVlLFxuXHRcdGZpbmRcdFx0PSAoXG5cdFx0XHRpc0tleWVkID8gZmluZEhhc2hLZXllZCA6XHRcdFx0XHQvLyBrZXllZCBsaXN0cy9sYXp5TGlzdHNcblx0XHRcdGlzRml4ZWQgfHwgaXNMYXp5ID8gdGFrZVNlcUluZGV4IDpcdFx0Ly8gdW5rZXllZCBsYXp5TGlzdHMgYW5kIEZJWEVEX0JPRFlcblx0XHRcdGZpbmRTZXFUaG9yb3VnaFx0XHRcdFx0XHRcdFx0Ly8gbW9yZSBjb21wbGV4IHN0dWZmXG5cdFx0KTtcblxuXHRpZiAoaXNLZXllZCkge1xuXHRcdHZhciBrZXlzID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYm9keS5sZW5ndGg7IGkrKylcblx0XHRcdHsga2V5c1tvYm9keVtpXS5rZXldID0gaTsgfVxuXHRcdG9ib2R5Ll9rZXlzID0ga2V5cztcblx0fVxuXG5cdGlmIChkb21TeW5jICYmIG5sZW4gPT09IDApIHtcblx0XHRjbGVhckNoaWxkcmVuKGRvbm9yKTtcblx0XHRpZiAoaXNMYXp5KVxuXHRcdFx0eyB2bm9kZS5ib2R5ID0gW107IH1cdC8vIG5ib2R5LnRwbChhbGwpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHZhciBkb25vcjIsXG5cdFx0bm9kZTIsXG5cdFx0Zm91bmRJZHgsXG5cdFx0cGF0Y2hlZCA9IDAsXG5cdFx0ZXZlck5vbnNlcSA9IGZhbHNlLFxuXHRcdGZyb21JZHggPSAwO1x0XHQvLyBmaXJzdCB1bnJlY3ljbGVkIG5vZGUgKHNlYXJjaCBoZWFkKVxuXG5cdGlmIChpc0xhenkpIHtcblx0XHR2YXIgZm5vZGUyID0ge2tleTogbnVsbH07XG5cdFx0dmFyIG5ib2R5TmV3ID0gQXJyYXkobmxlbik7XG5cdH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IG5sZW47IGkrKykge1xuXHRcdGlmIChpc0xhenkpIHtcblx0XHRcdHZhciByZW1ha2UgPSBmYWxzZTtcblx0XHRcdHZhciBkaWZmUmVzID0gbnVsbDtcblxuXHRcdFx0aWYgKGRvRmluZCkge1xuXHRcdFx0XHRpZiAoaXNLZXllZClcblx0XHRcdFx0XHR7IGZub2RlMi5rZXkgPSBuYm9keS5rZXkoaSk7IH1cblxuXHRcdFx0XHRkb25vcjIgPSBmaW5kKGZub2RlMiwgb2JvZHksIGZyb21JZHgpO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZG9ub3IyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBmb3VuZElkeCA9IGRvbm9yMi5pZHg7XG5cdFx0XHRcdGRpZmZSZXMgPSBuYm9keS5kaWZmKGksIGRvbm9yMik7XG5cblx0XHRcdFx0Ly8gZGlmZiByZXR1cm5zIHNhbWUsIHNvIGNoZWFwbHkgYWRvcHQgdm5vZGUgd2l0aG91dCBwYXRjaGluZ1xuXHRcdFx0XHRpZiAoZGlmZlJlcyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdG5vZGUyID0gZG9ub3IyO1xuXHRcdFx0XHRcdG5vZGUyLnBhcmVudCA9IHZub2RlO1xuXHRcdFx0XHRcdG5vZGUyLmlkeCA9IGk7XG5cdFx0XHRcdFx0bm9kZTIuX2xpcyA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdC8vIGRpZmYgcmV0dXJucyBuZXcgZGlmZlZhbHMsIHNvIGdlbmVyYXRlIG5ldyB2bm9kZSAmIHBhdGNoXG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7IHJlbWFrZSA9IHRydWU7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyByZW1ha2UgPSB0cnVlOyB9XG5cblx0XHRcdGlmIChyZW1ha2UpIHtcblx0XHRcdFx0bm9kZTIgPSBuYm9keS50cGwoaSk7XHRcdFx0Ly8gd2hhdCBpZiB0aGlzIGlzIGEgVlZJRVcsIFZNT0RFTCwgaW5qZWN0ZWQgZWxlbWVudD9cblx0XHRcdFx0cHJlUHJvYyhub2RlMiwgdm5vZGUsIGkpO1xuXG5cdFx0XHRcdG5vZGUyLl9kaWZmID0gZGlmZlJlcyAhPSBudWxsID8gZGlmZlJlcyA6IG5ib2R5LmRpZmYoaSk7XG5cblx0XHRcdFx0aWYgKGRvbm9yMiAhPSBudWxsKVxuXHRcdFx0XHRcdHsgcGF0Y2gobm9kZTIsIGRvbm9yMik7IH1cblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHQvLyBUT0RPOiBmbGFnIHRtcCBGSVhFRF9CT0RZIG9uIHVuY2hhbmdlZCBub2Rlcz9cblxuXHRcdFx0XHQvLyBkb21TeW5jID0gdHJ1ZTtcdFx0aWYgYW55IGlkeCBjaGFuZ2VzIG9yIG5ldyBub2RlcyBhZGRlZC9yZW1vdmVkXG5cdFx0XHR9XG5cblx0XHRcdG5ib2R5TmV3W2ldID0gbm9kZTI7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0dmFyIG5vZGUyID0gbmJvZHlbaV07XG5cdFx0XHR2YXIgdHlwZTIgPSBub2RlMi50eXBlO1xuXG5cdFx0XHQvLyBFTEVNRU5ULFRFWFQsQ09NTUVOVFxuXHRcdFx0aWYgKHR5cGUyIDw9IENPTU1FTlQpIHtcblx0XHRcdFx0aWYgKGRvbm9yMiA9IGRvRmluZCAmJiBmaW5kKG5vZGUyLCBvYm9keSwgZnJvbUlkeCkpIHtcblx0XHRcdFx0XHRwYXRjaChub2RlMiwgZG9ub3IyKTtcblx0XHRcdFx0XHRmb3VuZElkeCA9IGRvbm9yMi5pZHg7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKHR5cGUyID09PSBWVklFVykge1xuXHRcdFx0XHRpZiAoZG9ub3IyID0gZG9GaW5kICYmIGZpbmQobm9kZTIsIG9ib2R5LCBmcm9tSWR4KSkge1x0XHQvLyB1cGRhdGUvbW92ZVRvXG5cdFx0XHRcdFx0Zm91bmRJZHggPSBkb25vcjIuaWR4O1xuXHRcdFx0XHRcdHZhciB2bSA9IGRvbm9yMi52bS5fdXBkYXRlKG5vZGUyLmRhdGEsIHZub2RlLCBpKTtcdFx0Ly8gd2l0aERPTVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7IHZhciB2bSA9IGNyZWF0ZVZpZXcobm9kZTIudmlldywgbm9kZTIuZGF0YSwgbm9kZTIua2V5LCBub2RlMi5vcHRzKS5fcmVkcmF3KHZub2RlLCBpLCBmYWxzZSk7IH1cdC8vIGNyZWF0ZVZpZXcsIG5vIGRvbSAod2lsbCBiZSBoYW5kbGVkIGJ5IHN5bmMgYmVsb3cpXG5cblx0XHRcdFx0dHlwZTIgPSB2bS5ub2RlLnR5cGU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0eXBlMiA9PT0gVk1PREVMKSB7XG5cdFx0XHRcdC8vIGlmIHRoZSBpbmplY3RlZCB2bSBoYXMgbmV2ZXIgYmVlbiByZW5kZXJlZCwgdGhpcyB2bS5fdXBkYXRlKCkgc2VydmVzIGFzIHRoZVxuXHRcdFx0XHQvLyBpbml0aWFsIHZ0cmVlIGNyZWF0b3IsIGJ1dCBtdXN0IGF2b2lkIGh5ZHJhdGluZyAoY3JlYXRpbmcgLmVsKSBiZWNhdXNlIHN5bmNDaGlsZHJlbigpXG5cdFx0XHRcdC8vIHdoaWNoIGlzIHJlc3BvbnNpYmxlIGZvciBtb3VudGluZyBiZWxvdyAoYW5kIG9wdGlvbmFsbHkgaHlkcmF0aW5nKSwgdGVzdHMgLmVsIHByZXNlbmNlXG5cdFx0XHRcdC8vIHRvIGRldGVybWluZSBpZiBoeWRyYXRpb24gJiBtb3VudGluZyBhcmUgbmVlZGVkXG5cdFx0XHRcdHZhciB3aXRoRE9NID0gaXNIeWRyYXRlZChub2RlMi52bSk7XG5cblx0XHRcdFx0dmFyIHZtID0gbm9kZTIudm0uX3VwZGF0ZShub2RlMi5kYXRhLCB2bm9kZSwgaSwgd2l0aERPTSk7XG5cdFx0XHRcdHR5cGUyID0gdm0ubm9kZS50eXBlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIGZvdW5kIGRvbm9yICYgZHVyaW5nIGEgc2VxdWVudGlhbCBzZWFyY2ggLi4uYXQgc2VhcmNoIGhlYWRcblx0XHRpZiAoIWlzS2V5ZWQgJiYgZG9ub3IyICE9IG51bGwpIHtcblx0XHRcdGlmIChmb3VuZElkeCA9PT0gZnJvbUlkeCkge1xuXHRcdFx0XHQvLyBhZHZhbmNlIGhlYWRcblx0XHRcdFx0ZnJvbUlkeCsrO1xuXHRcdFx0XHQvLyBpZiBhbGwgb2xkIHZub2RlcyBhZG9wdGVkIGFuZCBtb3JlIGV4aXN0LCBzdG9wIHNlYXJjaGluZ1xuXHRcdFx0XHRpZiAoZnJvbUlkeCA9PT0gb2xlbiAmJiBubGVuID4gb2xlbikge1xuXHRcdFx0XHRcdC8vIHNob3J0LWNpcmN1aXQgZmluZCwgYWxsb3cgbG9vcCBqdXN0IGNyZWF0ZS9pbml0IHJlc3Rcblx0XHRcdFx0XHRkb25vcjIgPSBudWxsO1xuXHRcdFx0XHRcdGRvRmluZCA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgZXZlck5vbnNlcSA9IHRydWU7IH1cblxuXHRcdFx0aWYgKG9sZW4gPiAxMDAgJiYgZXZlck5vbnNlcSAmJiArK3BhdGNoZWQgJSAxMCA9PT0gMClcblx0XHRcdFx0eyB3aGlsZSAoZnJvbUlkeCA8IG9sZW4gJiYgYWxyZWFkeUFkb3B0ZWQob2JvZHlbZnJvbUlkeF0pKVxuXHRcdFx0XHRcdHsgZnJvbUlkeCsrOyB9IH1cblx0XHR9XG5cdH1cblxuXHQvLyByZXBsYWNlIExpc3Qgdy8gbmV3IGJvZHlcblx0aWYgKGlzTGF6eSlcblx0XHR7IHZub2RlLmJvZHkgPSBuYm9keU5ldzsgfVxuXG5cdGRvbVN5bmMgJiYgc3luY0NoaWxkcmVuKHZub2RlLCBkb25vcik7XG59XG5cbmZ1bmN0aW9uIERPTUluc3RyKHdpdGhUaW1lKSB7XG5cdHZhciBpc0VkZ2UgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJFZGdlXCIpICE9PSAtMTtcblx0dmFyIGlzSUUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJUcmlkZW50L1wiKSAhPT0gLTE7XG5cdHZhciBnZXREZXNjciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cdHZhciBkZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5cdHZhciBub2RlUHJvdG8gPSBOb2RlLnByb3RvdHlwZTtcblx0dmFyIHRleHRDb250ZW50ID0gZ2V0RGVzY3Iobm9kZVByb3RvLCBcInRleHRDb250ZW50XCIpO1xuXHR2YXIgbm9kZVZhbHVlID0gZ2V0RGVzY3Iobm9kZVByb3RvLCBcIm5vZGVWYWx1ZVwiKTtcblxuXHR2YXIgaHRtbFByb3RvID0gSFRNTEVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgaW5uZXJUZXh0ID0gZ2V0RGVzY3IoaHRtbFByb3RvLCBcImlubmVyVGV4dFwiKTtcblxuXHR2YXIgZWxlbVByb3RvXHQ9IEVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgaW5uZXJIVE1MXHQ9IGdldERlc2NyKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlubmVySFRNTFwiKTtcblx0dmFyIGNsYXNzTmFtZVx0PSBnZXREZXNjcighaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJjbGFzc05hbWVcIik7XG5cdHZhciBpZFx0XHRcdD0gZ2V0RGVzY3IoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaWRcIik7XG5cblx0dmFyIHN0eWxlUHJvdG9cdD0gQ1NTU3R5bGVEZWNsYXJhdGlvbi5wcm90b3R5cGU7XG5cblx0dmFyIGNzc1RleHRcdFx0PSBnZXREZXNjcihzdHlsZVByb3RvLCBcImNzc1RleHRcIik7XG5cblx0dmFyIGlucFByb3RvID0gSFRNTElucHV0RWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBhcmVhUHJvdG8gPSBIVE1MVGV4dEFyZWFFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIHNlbFByb3RvID0gSFRNTFNlbGVjdEVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgb3B0UHJvdG8gPSBIVE1MT3B0aW9uRWxlbWVudC5wcm90b3R5cGU7XG5cblx0dmFyIGlucENoZWNrZWQgPSBnZXREZXNjcihpbnBQcm90bywgXCJjaGVja2VkXCIpO1xuXHR2YXIgaW5wVmFsID0gZ2V0RGVzY3IoaW5wUHJvdG8sIFwidmFsdWVcIik7XG5cblx0dmFyIGFyZWFWYWwgPSBnZXREZXNjcihhcmVhUHJvdG8sIFwidmFsdWVcIik7XG5cblx0dmFyIHNlbFZhbCA9IGdldERlc2NyKHNlbFByb3RvLCBcInZhbHVlXCIpO1xuXHR2YXIgc2VsSW5kZXggPSBnZXREZXNjcihzZWxQcm90bywgXCJzZWxlY3RlZEluZGV4XCIpO1xuXG5cdHZhciBvcHRTZWwgPSBnZXREZXNjcihvcHRQcm90bywgXCJzZWxlY3RlZFwiKTtcblxuXHQvLyBvbmNsaWNrLCBvbmtleSosIGV0Yy4uXG5cblx0Ly8gdmFyIHN0eWxlUHJvdG8gPSBDU1NTdHlsZURlY2xhcmF0aW9uLnByb3RvdHlwZTtcblx0Ly8gdmFyIHNldFByb3BlcnR5ID0gZ2V0RGVzY3Ioc3R5bGVQcm90bywgXCJzZXRQcm9wZXJ0eVwiKTtcblxuXHR2YXIgb3JpZ09wcyA9IHtcblx0XHRcImRvY3VtZW50LmNyZWF0ZUVsZW1lbnRcIjogbnVsbCxcblx0XHRcImRvY3VtZW50LmNyZWF0ZUVsZW1lbnROU1wiOiBudWxsLFxuXHRcdFwiZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGVcIjogbnVsbCxcblx0XHRcImRvY3VtZW50LmNyZWF0ZUNvbW1lbnRcIjogbnVsbCxcblx0XHRcImRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnRcIjogbnVsbCxcblxuXHRcdFwiRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlXCI6IG51bGwsXHRcdC8vIGFwcGVuZENoaWxkXG5cblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLmFwcGVuZENoaWxkXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZFwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUuaW5zZXJ0QmVmb3JlXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlQ2hpbGRcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZVwiOiBudWxsLFxuXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnNldEF0dHJpYnV0ZU5TXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGVcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TXCI6IG51bGwsXG5cblx0XHQvLyBhc3NpZ24/XG5cdFx0Ly8gZGF0YXNldCwgY2xhc3NsaXN0LCBhbnkgcHJvcHMgbGlrZSAub25jaGFuZ2VcblxuXHRcdC8vIC5zdHlsZS5zZXRQcm9wZXJ0eSwgLnN0eWxlLmNzc1RleHRcblx0fTtcblxuXHR2YXIgY291bnRzID0ge307XG5cdHZhciBzdGFydCA9IG51bGw7XG5cblx0ZnVuY3Rpb24gY3R4TmFtZShvcE5hbWUpIHtcblx0XHR2YXIgb3BQYXRoID0gb3BOYW1lLnNwbGl0KFwiLlwiKTtcblx0XHR2YXIgbyA9IHdpbmRvdztcblx0XHR3aGlsZSAob3BQYXRoLmxlbmd0aCA+IDEpXG5cdFx0XHR7IG8gPSBvW29wUGF0aC5zaGlmdCgpXTsgfVxuXG5cdFx0cmV0dXJuIHtjdHg6IG8sIGxhc3Q6IG9wUGF0aFswXX07XG5cdH1cblxuXHRmb3IgKHZhciBvcE5hbWUgaW4gb3JpZ09wcykge1xuXHRcdHZhciBwID0gY3R4TmFtZShvcE5hbWUpO1xuXG5cdFx0aWYgKG9yaWdPcHNbb3BOYW1lXSA9PT0gbnVsbClcblx0XHRcdHsgb3JpZ09wc1tvcE5hbWVdID0gcC5jdHhbcC5sYXN0XTsgfVxuXG5cdFx0KGZ1bmN0aW9uKG9wTmFtZSwgb3BTaG9ydCkge1xuXHRcdFx0Y291bnRzW29wU2hvcnRdID0gMDtcblx0XHRcdHAuY3R4W29wU2hvcnRdID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGNvdW50c1tvcFNob3J0XSsrO1xuXHRcdFx0XHRyZXR1cm4gb3JpZ09wc1tvcE5hbWVdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0XHR9O1xuXHRcdH0pKG9wTmFtZSwgcC5sYXN0KTtcblx0fVxuXG5cdGNvdW50cy50ZXh0Q29udGVudCA9IDA7XG5cdGRlZlByb3Aobm9kZVByb3RvLCBcInRleHRDb250ZW50XCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy50ZXh0Q29udGVudCsrO1xuXHRcdFx0dGV4dENvbnRlbnQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLm5vZGVWYWx1ZSA9IDA7XG5cdGRlZlByb3Aobm9kZVByb3RvLCBcIm5vZGVWYWx1ZVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMubm9kZVZhbHVlKys7XG5cdFx0XHRub2RlVmFsdWUuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmlubmVyVGV4dCA9IDA7XG5cdGRlZlByb3AoaHRtbFByb3RvLCBcImlubmVyVGV4dFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuaW5uZXJUZXh0Kys7XG5cdFx0XHRpbm5lclRleHQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmlubmVySFRNTCA9IDA7XG5cdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaW5uZXJIVE1MXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5pbm5lckhUTUwrKztcblx0XHRcdGlubmVySFRNTC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuY2xhc3NOYW1lID0gMDtcblx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJjbGFzc05hbWVcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmNsYXNzTmFtZSsrO1xuXHRcdFx0Y2xhc3NOYW1lLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5jc3NUZXh0ID0gMDtcblx0ZGVmUHJvcChzdHlsZVByb3RvLCBcImNzc1RleHRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmNzc1RleHQrKztcblx0XHRcdGNzc1RleHQuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmlkID0gMDtcblx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpZFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuaWQrKztcblx0XHRcdGlkLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5jaGVja2VkID0gMDtcblx0ZGVmUHJvcChpbnBQcm90bywgXCJjaGVja2VkXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5jaGVja2VkKys7XG5cdFx0XHRpbnBDaGVja2VkLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy52YWx1ZSA9IDA7XG5cdGRlZlByb3AoaW5wUHJvdG8sIFwidmFsdWVcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnZhbHVlKys7XG5cdFx0XHRpbnBWYWwuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0ZGVmUHJvcChhcmVhUHJvdG8sIFwidmFsdWVcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnZhbHVlKys7XG5cdFx0XHRhcmVhVmFsLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGRlZlByb3Aoc2VsUHJvdG8sIFwidmFsdWVcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnZhbHVlKys7XG5cdFx0XHRzZWxWYWwuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLnNlbGVjdGVkSW5kZXggPSAwO1xuXHRkZWZQcm9wKHNlbFByb3RvLCBcInNlbGVjdGVkSW5kZXhcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnNlbGVjdGVkSW5kZXgrKztcblx0XHRcdHNlbEluZGV4LnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5zZWxlY3RlZCA9IDA7XG5cdGRlZlByb3Aob3B0UHJvdG8sIFwic2VsZWN0ZWRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLnNlbGVjdGVkKys7XG5cdFx0XHRvcHRTZWwuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Lypcblx0Y291bnRzLnNldFByb3BlcnR5ID0gMDtcblx0ZGVmUHJvcChzdHlsZVByb3RvLCBcInNldFByb3BlcnR5XCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5zZXRQcm9wZXJ0eSsrO1xuXHRcdFx0c2V0UHJvcGVydHkuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cdCovXG5cblx0ZnVuY3Rpb24gcmVzZXQoKSB7XG5cdFx0Zm9yICh2YXIgaSBpbiBjb3VudHMpXG5cdFx0XHR7IGNvdW50c1tpXSA9IDA7IH1cblx0fVxuXG5cdHRoaXMuc3RhcnQgPSBmdW5jdGlvbigpIHtcblx0XHRzdGFydCA9ICtuZXcgRGF0ZTtcblx0fTtcblxuXHR0aGlzLmVuZCA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBfdGltZSA9ICtuZXcgRGF0ZSAtIHN0YXJ0O1xuXHRcdHN0YXJ0ID0gbnVsbDtcbi8qXG5cdFx0Zm9yICh2YXIgb3BOYW1lIGluIG9yaWdPcHMpIHtcblx0XHRcdHZhciBwID0gY3R4TmFtZShvcE5hbWUpO1xuXHRcdFx0cC5jdHhbcC5sYXN0XSA9IG9yaWdPcHNbb3BOYW1lXTtcblx0XHR9XG5cblx0XHRkZWZQcm9wKG5vZGVQcm90bywgXCJ0ZXh0Q29udGVudFwiLCB0ZXh0Q29udGVudCk7XG5cdFx0ZGVmUHJvcChub2RlUHJvdG8sIFwibm9kZVZhbHVlXCIsIG5vZGVWYWx1ZSk7XG5cdFx0ZGVmUHJvcChodG1sUHJvdG8sIFwiaW5uZXJUZXh0XCIsIGlubmVyVGV4dCk7XG5cdFx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpbm5lckhUTUxcIiwgaW5uZXJIVE1MKTtcblx0XHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImNsYXNzTmFtZVwiLCBjbGFzc05hbWUpO1xuXHRcdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaWRcIiwgaWQpO1xuXHRcdGRlZlByb3AoaW5wUHJvdG8sICBcImNoZWNrZWRcIiwgaW5wQ2hlY2tlZCk7XG5cdFx0ZGVmUHJvcChpbnBQcm90bywgIFwidmFsdWVcIiwgaW5wVmFsKTtcblx0XHRkZWZQcm9wKGFyZWFQcm90bywgXCJ2YWx1ZVwiLCBhcmVhVmFsKTtcblx0XHRkZWZQcm9wKHNlbFByb3RvLCAgXCJ2YWx1ZVwiLCBzZWxWYWwpO1xuXHRcdGRlZlByb3Aoc2VsUHJvdG8sICBcInNlbGVjdGVkSW5kZXhcIiwgc2VsSW5kZXgpO1xuXHRcdGRlZlByb3Aob3B0UHJvdG8sICBcInNlbGVjdGVkXCIsIG9wdFNlbCk7XG5cdC8vXHRkZWZQcm9wKHN0eWxlUHJvdG8sIFwic2V0UHJvcGVydHlcIiwgc2V0UHJvcGVydHkpO1xuXHRcdGRlZlByb3Aoc3R5bGVQcm90bywgXCJjc3NUZXh0XCIsIGNzc1RleHQpO1xuKi9cblx0XHR2YXIgb3V0ID0ge307XG5cblx0XHRmb3IgKHZhciBpIGluIGNvdW50cylcblx0XHRcdHsgaWYgKGNvdW50c1tpXSA+IDApXG5cdFx0XHRcdHsgb3V0W2ldID0gY291bnRzW2ldOyB9IH1cblxuXHRcdHJlc2V0KCk7XG5cblx0XHRpZiAod2l0aFRpbWUpXG5cdFx0XHR7IG91dC5fdGltZSA9IF90aW1lOyB9XG5cblx0XHRyZXR1cm4gb3V0O1xuXHR9O1xufVxuXG52YXIgaW5zdHIgPSBudWxsO1xuXG57XG5cdGlmIChERVZNT0RFLm11dGF0aW9ucykge1xuXHRcdGluc3RyID0gbmV3IERPTUluc3RyKHRydWUpO1xuXHR9XG59XG5cbi8vIHZpZXcgKyBrZXkgc2VydmUgYXMgdGhlIHZtJ3MgdW5pcXVlIGlkZW50aXR5XG5mdW5jdGlvbiBWaWV3TW9kZWwodmlldywgZGF0YSwga2V5LCBvcHRzKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0dm0udmlldyA9IHZpZXc7XG5cdHZtLmRhdGEgPSBkYXRhO1xuXHR2bS5rZXkgPSBrZXk7XG5cblx0e1xuXHRcdGlmIChpc1N0cmVhbShkYXRhKSlcblx0XHRcdHsgdm0uX3N0cmVhbSA9IGhvb2tTdHJlYW0yKGRhdGEsIHZtKTsgfVxuXHR9XG5cblx0aWYgKG9wdHMpIHtcblx0XHR2bS5vcHRzID0gb3B0cztcblx0XHR2bS5jb25maWcob3B0cyk7XG5cdH1cblxuXHR2YXIgb3V0ID0gaXNQbGFpbk9iaih2aWV3KSA/IHZpZXcgOiB2aWV3LmNhbGwodm0sIHZtLCBkYXRhLCBrZXksIG9wdHMpO1xuXG5cdGlmIChpc0Z1bmMob3V0KSlcblx0XHR7IHZtLnJlbmRlciA9IG91dDsgfVxuXHRlbHNlIHtcblx0XHR2bS5yZW5kZXIgPSBvdXQucmVuZGVyO1xuXHRcdHZtLmNvbmZpZyhvdXQpO1xuXHR9XG5cblx0Ly8gdGhlc2UgbXVzdCBiZSB3cmFwcGVkIGhlcmUgc2luY2UgdGhleSdyZSBkZWJvdW5jZWQgcGVyIHZpZXdcblx0dm0uX3JlZHJhd0FzeW5jID0gcmFmdChmdW5jdGlvbiAoXykgeyByZXR1cm4gdm0ucmVkcmF3KHRydWUpOyB9KTtcblx0dm0uX3VwZGF0ZUFzeW5jID0gcmFmdChmdW5jdGlvbiAobmV3RGF0YSkgeyByZXR1cm4gdm0udXBkYXRlKG5ld0RhdGEsIHRydWUpOyB9KTtcblxuXHR2bS5pbml0ICYmIHZtLmluaXQuY2FsbCh2bSwgdm0sIHZtLmRhdGEsIHZtLmtleSwgb3B0cyk7XG59XG5cbnZhciBWaWV3TW9kZWxQcm90byA9IFZpZXdNb2RlbC5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBWaWV3TW9kZWwsXG5cblx0X2RpZmY6XHRudWxsLFx0Ly8gZGlmZiBjYWNoZVxuXG5cdGluaXQ6XHRudWxsLFxuXHR2aWV3Olx0bnVsbCxcblx0a2V5Olx0bnVsbCxcblx0ZGF0YTpcdG51bGwsXG5cdHN0YXRlOlx0bnVsbCxcblx0YXBpOlx0bnVsbCxcblx0b3B0czpcdG51bGwsXG5cdG5vZGU6XHRudWxsLFxuXHRob29rczpcdG51bGwsXG5cdG9uZXZlbnQ6IG5vb3AsXG5cdHJlZnM6XHRudWxsLFxuXHRyZW5kZXI6XHRudWxsLFxuXG5cdG1vdW50OiBtb3VudCxcblx0dW5tb3VudDogdW5tb3VudCxcblx0Y29uZmlnOiBmdW5jdGlvbihvcHRzKSB7XG5cdFx0dmFyIHQgPSB0aGlzO1xuXG5cdFx0aWYgKG9wdHMuaW5pdClcblx0XHRcdHsgdC5pbml0ID0gb3B0cy5pbml0OyB9XG5cdFx0aWYgKG9wdHMuZGlmZilcblx0XHRcdHsgdC5kaWZmID0gb3B0cy5kaWZmOyB9XG5cdFx0aWYgKG9wdHMub25ldmVudClcblx0XHRcdHsgdC5vbmV2ZW50ID0gb3B0cy5vbmV2ZW50OyB9XG5cblx0XHQvLyBtYXliZSBpbnZlcnQgYXNzaWdubWVudCBvcmRlcj9cblx0XHRpZiAob3B0cy5ob29rcylcblx0XHRcdHsgdC5ob29rcyA9IGFzc2lnbk9iaih0Lmhvb2tzIHx8IHt9LCBvcHRzLmhvb2tzKTsgfVxuXG5cdFx0e1xuXHRcdFx0aWYgKG9wdHMub25lbWl0KVxuXHRcdFx0XHR7IHQub25lbWl0ID0gYXNzaWduT2JqKHQub25lbWl0IHx8IHt9LCBvcHRzLm9uZW1pdCk7IH1cblx0XHR9XG5cdH0sXG5cdHBhcmVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGdldFZtKHRoaXMubm9kZS5wYXJlbnQpO1xuXHR9LFxuXHRyb290OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgcCA9IHRoaXMubm9kZTtcblxuXHRcdHdoaWxlIChwLnBhcmVudClcblx0XHRcdHsgcCA9IHAucGFyZW50OyB9XG5cblx0XHRyZXR1cm4gcC52bTtcblx0fSxcblx0cmVkcmF3OiBmdW5jdGlvbihzeW5jKSB7XG5cdFx0e1xuXHRcdFx0aWYgKERFVk1PREUuc3luY1JlZHJhdykge1xuXHRcdFx0XHRzeW5jID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dmFyIHZtID0gdGhpcztcblx0XHRzeW5jID8gdm0uX3JlZHJhdyhudWxsLCBudWxsLCBpc0h5ZHJhdGVkKHZtKSkgOiB2bS5fcmVkcmF3QXN5bmMoKTtcblx0XHRyZXR1cm4gdm07XG5cdH0sXG5cdHVwZGF0ZTogZnVuY3Rpb24obmV3RGF0YSwgc3luYykge1xuXHRcdHtcblx0XHRcdGlmIChERVZNT0RFLnN5bmNSZWRyYXcpIHtcblx0XHRcdFx0c3luYyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0c3luYyA/IHZtLl91cGRhdGUobmV3RGF0YSwgbnVsbCwgbnVsbCwgaXNIeWRyYXRlZCh2bSkpIDogdm0uX3VwZGF0ZUFzeW5jKG5ld0RhdGEpO1xuXHRcdHJldHVybiB2bTtcblx0fSxcblxuXHRfdXBkYXRlOiB1cGRhdGVTeW5jLFxuXHRfcmVkcmF3OiByZWRyYXdTeW5jLFxuXHRfcmVkcmF3QXN5bmM6IG51bGwsXG5cdF91cGRhdGVBc3luYzogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIG1vdW50KGVsLCBpc1Jvb3QpIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHR7XG5cdFx0aWYgKERFVk1PREUubXV0YXRpb25zKVxuXHRcdFx0eyBpbnN0ci5zdGFydCgpOyB9XG5cdH1cblxuXHRpZiAoaXNSb290KSB7XG5cdFx0Y2xlYXJDaGlsZHJlbih7ZWw6IGVsLCBmbGFnczogMH0pO1xuXG5cdFx0dm0uX3JlZHJhdyhudWxsLCBudWxsLCBmYWxzZSk7XG5cblx0XHQvLyBpZiBwbGFjZWhvbGRlciBub2RlIGRvZXNudCBtYXRjaCByb290IHRhZ1xuXHRcdGlmIChlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICE9PSB2bS5ub2RlLnRhZykge1xuXHRcdFx0aHlkcmF0ZSh2bS5ub2RlKTtcblx0XHRcdGluc2VydEJlZm9yZShlbC5wYXJlbnROb2RlLCB2bS5ub2RlLmVsLCBlbCk7XG5cdFx0XHRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0eyBpbnNlcnRCZWZvcmUoZWwucGFyZW50Tm9kZSwgaHlkcmF0ZSh2bS5ub2RlLCBlbCksIGVsKTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdHZtLl9yZWRyYXcobnVsbCwgbnVsbCk7XG5cblx0XHRpZiAoZWwpXG5cdFx0XHR7IGluc2VydEJlZm9yZShlbCwgdm0ubm9kZS5lbCk7IH1cblx0fVxuXG5cdGlmIChlbClcblx0XHR7IGRyYWluRGlkSG9va3Modm0pOyB9XG5cblx0e1xuXHRcdGlmIChERVZNT0RFLm11dGF0aW9ucylcblx0XHRcdHsgY29uc29sZS5sb2coaW5zdHIuZW5kKCkpOyB9XG5cdH1cblxuXHRyZXR1cm4gdm07XG59XG5cbi8vIGFzU3ViIG1lYW5zIHRoaXMgd2FzIGNhbGxlZCBmcm9tIGEgc3ViLXJvdXRpbmUsIHNvIGRvbid0IGRyYWluIGRpZCogaG9vayBxdWV1ZVxuZnVuY3Rpb24gdW5tb3VudChhc1N1Yikge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHtcblx0XHRpZiAoaXNTdHJlYW0odm0uX3N0cmVhbSkpXG5cdFx0XHR7IHVuc3ViU3RyZWFtKHZtLl9zdHJlYW0pOyB9XG5cdH1cblxuXHR2YXIgbm9kZSA9IHZtLm5vZGU7XG5cdHZhciBwYXJFbCA9IG5vZGUuZWwucGFyZW50Tm9kZTtcblxuXHQvLyBlZGdlIGJ1ZzogdGhpcyBjb3VsZCBhbHNvIGJlIHdpbGxSZW1vdmUgcHJvbWlzZS1kZWxheWVkOyBzaG91bGQgLnRoZW4oKSBvciBzb21ldGhpbmcgdG8gbWFrZSBzdXJlIGhvb2tzIGZpcmUgaW4gb3JkZXJcblx0cmVtb3ZlQ2hpbGQocGFyRWwsIG5vZGUuZWwpO1xuXG5cdGlmICghYXNTdWIpXG5cdFx0eyBkcmFpbkRpZEhvb2tzKHZtKTsgfVxufVxuXG5mdW5jdGlvbiByZVBhcmVudCh2bSwgdm9sZCwgbmV3UGFyZW50LCBuZXdJZHgpIHtcblx0aWYgKG5ld1BhcmVudCAhPSBudWxsKSB7XG5cdFx0bmV3UGFyZW50LmJvZHlbbmV3SWR4XSA9IHZvbGQ7XG5cdFx0dm9sZC5pZHggPSBuZXdJZHg7XG5cdFx0dm9sZC5wYXJlbnQgPSBuZXdQYXJlbnQ7XG5cdFx0dm9sZC5fbGlzID0gZmFsc2U7XG5cdH1cblx0cmV0dXJuIHZtO1xufVxuXG5mdW5jdGlvbiByZWRyYXdTeW5jKG5ld1BhcmVudCwgbmV3SWR4LCB3aXRoRE9NKSB7XG5cdHZhciBpc1JlZHJhd1Jvb3QgPSBuZXdQYXJlbnQgPT0gbnVsbDtcblx0dmFyIHZtID0gdGhpcztcblx0dmFyIGlzTW91bnRlZCA9IHZtLm5vZGUgJiYgdm0ubm9kZS5lbCAmJiB2bS5ub2RlLmVsLnBhcmVudE5vZGU7XG5cblx0e1xuXHRcdC8vIHdhcyBtb3VudGVkIChoYXMgbm9kZSBhbmQgZWwpLCBidXQgZWwgbm8gbG9uZ2VyIGhhcyBwYXJlbnQgKHVubW91bnRlZClcblx0XHRpZiAoaXNSZWRyYXdSb290ICYmIHZtLm5vZGUgJiYgdm0ubm9kZS5lbCAmJiAhdm0ubm9kZS5lbC5wYXJlbnROb2RlKVxuXHRcdFx0eyBkZXZOb3RpZnkoXCJVTk1PVU5URURfUkVEUkFXXCIsIFt2bV0pOyB9XG5cblx0XHRpZiAoaXNSZWRyYXdSb290ICYmIERFVk1PREUubXV0YXRpb25zICYmIGlzTW91bnRlZClcblx0XHRcdHsgaW5zdHIuc3RhcnQoKTsgfVxuXHR9XG5cblx0dmFyIHZvbGQgPSB2bS5ub2RlLCBvbGREaWZmLCBuZXdEaWZmO1xuXG5cdGlmICh2bS5kaWZmICE9IG51bGwpIHtcblx0XHRvbGREaWZmID0gdm0uX2RpZmY7XG5cdFx0dm0uX2RpZmYgPSBuZXdEaWZmID0gdm0uZGlmZih2bSwgdm0uZGF0YSk7XG5cblx0XHRpZiAodm9sZCAhPSBudWxsKSB7XG5cdFx0XHR2YXIgY21wRm4gPSBpc0FycihvbGREaWZmKSA/IGNtcEFyciA6IGNtcE9iajtcblx0XHRcdHZhciBpc1NhbWUgPSBvbGREaWZmID09PSBuZXdEaWZmIHx8IGNtcEZuKG9sZERpZmYsIG5ld0RpZmYpO1xuXG5cdFx0XHRpZiAoaXNTYW1lKVxuXHRcdFx0XHR7IHJldHVybiByZVBhcmVudCh2bSwgdm9sZCwgbmV3UGFyZW50LCBuZXdJZHgpOyB9XG5cdFx0fVxuXHR9XG5cblx0aXNNb3VudGVkICYmIGZpcmVIb29rKHZtLmhvb2tzLCBcIndpbGxSZWRyYXdcIiwgdm0sIHZtLmRhdGEpO1xuXG5cdHZhciB2bmV3ID0gdm0ucmVuZGVyLmNhbGwodm0sIHZtLCB2bS5kYXRhLCBvbGREaWZmLCBuZXdEaWZmKTtcblxuXHRpZiAodm5ldyA9PT0gdm9sZClcblx0XHR7IHJldHVybiByZVBhcmVudCh2bSwgdm9sZCwgbmV3UGFyZW50LCBuZXdJZHgpOyB9XG5cblx0Ly8gdG9kbzogdGVzdCByZXN1bHQgb2Ygd2lsbFJlZHJhdyBob29rcyBiZWZvcmUgY2xlYXJpbmcgcmVmc1xuXHR2bS5yZWZzID0gbnVsbDtcblxuXHQvLyBhbHdheXMgYXNzaWduIHZtIGtleSB0byByb290IHZub2RlICh0aGlzIGlzIGEgZGUtb3B0KVxuXHRpZiAodm0ua2V5ICE9IG51bGwgJiYgdm5ldy5rZXkgIT09IHZtLmtleSlcblx0XHR7IHZuZXcua2V5ID0gdm0ua2V5OyB9XG5cblx0dm0ubm9kZSA9IHZuZXc7XG5cblx0aWYgKG5ld1BhcmVudCkge1xuXHRcdHByZVByb2Modm5ldywgbmV3UGFyZW50LCBuZXdJZHgsIHZtKTtcblx0XHRuZXdQYXJlbnQuYm9keVtuZXdJZHhdID0gdm5ldztcblx0fVxuXHRlbHNlIGlmICh2b2xkICYmIHZvbGQucGFyZW50KSB7XG5cdFx0cHJlUHJvYyh2bmV3LCB2b2xkLnBhcmVudCwgdm9sZC5pZHgsIHZtKTtcblx0XHR2b2xkLnBhcmVudC5ib2R5W3ZvbGQuaWR4XSA9IHZuZXc7XG5cdH1cblx0ZWxzZVxuXHRcdHsgcHJlUHJvYyh2bmV3LCBudWxsLCBudWxsLCB2bSk7IH1cblxuXHRpZiAod2l0aERPTSAhPT0gZmFsc2UpIHtcblx0XHRpZiAodm9sZCkge1xuXHRcdFx0Ly8gcm9vdCBub2RlIHJlcGxhY2VtZW50XG5cdFx0XHRpZiAodm9sZC50YWcgIT09IHZuZXcudGFnIHx8IHZvbGQua2V5ICE9PSB2bmV3LmtleSkge1xuXHRcdFx0XHQvLyBoYWNrIHRvIHByZXZlbnQgdGhlIHJlcGxhY2VtZW50IGZyb20gdHJpZ2dlcmluZyBtb3VudC91bm1vdW50XG5cdFx0XHRcdHZvbGQudm0gPSB2bmV3LnZtID0gbnVsbDtcblxuXHRcdFx0XHR2YXIgcGFyRWwgPSB2b2xkLmVsLnBhcmVudE5vZGU7XG5cdFx0XHRcdHZhciByZWZFbCA9IG5leHRTaWIodm9sZC5lbCk7XG5cdFx0XHRcdHJlbW92ZUNoaWxkKHBhckVsLCB2b2xkLmVsKTtcblx0XHRcdFx0aW5zZXJ0QmVmb3JlKHBhckVsLCBoeWRyYXRlKHZuZXcpLCByZWZFbCk7XG5cblx0XHRcdFx0Ly8gYW5vdGhlciBoYWNrIHRoYXQgYWxsb3dzIGFueSBoaWdoZXItbGV2ZWwgc3luY0NoaWxkcmVuIHRvIHNldFxuXHRcdFx0XHQvLyByZWNvbmNpbGlhdGlvbiBib3VuZHMgdXNpbmcgYSBsaXZlIG5vZGVcblx0XHRcdFx0dm9sZC5lbCA9IHZuZXcuZWw7XG5cblx0XHRcdFx0Ly8gcmVzdG9yZVxuXHRcdFx0XHR2bmV3LnZtID0gdm07XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgcGF0Y2godm5ldywgdm9sZCk7IH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0eyBoeWRyYXRlKHZuZXcpOyB9XG5cdH1cblxuXHRpc01vdW50ZWQgJiYgZmlyZUhvb2sodm0uaG9va3MsIFwiZGlkUmVkcmF3XCIsIHZtLCB2bS5kYXRhKTtcblxuXHRpZiAoaXNSZWRyYXdSb290ICYmIGlzTW91bnRlZClcblx0XHR7IGRyYWluRGlkSG9va3Modm0pOyB9XG5cblx0e1xuXHRcdGlmIChpc1JlZHJhd1Jvb3QgJiYgREVWTU9ERS5tdXRhdGlvbnMgJiYgaXNNb3VudGVkKVxuXHRcdFx0eyBjb25zb2xlLmxvZyhpbnN0ci5lbmQoKSk7IH1cblx0fVxuXG5cdHJldHVybiB2bTtcbn1cblxuLy8gdGhpcyBhbHNvIGRvdWJsZXMgYXMgbW92ZVRvXG4vLyBUT0RPPyBAd2l0aFJlZHJhdyAocHJldmVudCByZWRyYXcgZnJvbSBmaXJpbmcpXG5mdW5jdGlvbiB1cGRhdGVTeW5jKG5ld0RhdGEsIG5ld1BhcmVudCwgbmV3SWR4LCB3aXRoRE9NKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0aWYgKG5ld0RhdGEgIT0gbnVsbCkge1xuXHRcdGlmICh2bS5kYXRhICE9PSBuZXdEYXRhKSB7XG5cdFx0XHR7XG5cdFx0XHRcdGRldk5vdGlmeShcIkRBVEFfUkVQTEFDRURcIiwgW3ZtLCB2bS5kYXRhLCBuZXdEYXRhXSk7XG5cdFx0XHR9XG5cdFx0XHRmaXJlSG9vayh2bS5ob29rcywgXCJ3aWxsVXBkYXRlXCIsIHZtLCBuZXdEYXRhKTtcblx0XHRcdHZtLmRhdGEgPSBuZXdEYXRhO1xuXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChpc1N0cmVhbSh2bS5fc3RyZWFtKSlcblx0XHRcdFx0XHR7IHVuc3ViU3RyZWFtKHZtLl9zdHJlYW0pOyB9XG5cdFx0XHRcdGlmIChpc1N0cmVhbShuZXdEYXRhKSlcblx0XHRcdFx0XHR7IHZtLl9zdHJlYW0gPSBob29rU3RyZWFtMihuZXdEYXRhLCB2bSk7IH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdm0uX3JlZHJhdyhuZXdQYXJlbnQsIG5ld0lkeCwgd2l0aERPTSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZUVsZW1lbnQodGFnLCBhcmcxLCBhcmcyLCBmbGFncykge1xuXHR2YXIgYXR0cnMsIGJvZHk7XG5cblx0aWYgKGFyZzIgPT0gbnVsbCkge1xuXHRcdGlmIChpc1BsYWluT2JqKGFyZzEpKVxuXHRcdFx0eyBhdHRycyA9IGFyZzE7IH1cblx0XHRlbHNlXG5cdFx0XHR7IGJvZHkgPSBhcmcxOyB9XG5cdH1cblx0ZWxzZSB7XG5cdFx0YXR0cnMgPSBhcmcxO1xuXHRcdGJvZHkgPSBhcmcyO1xuXHR9XG5cblx0cmV0dXJuIGluaXRFbGVtZW50Tm9kZSh0YWcsIGF0dHJzLCBib2R5LCBmbGFncyk7XG59XG5cbi8vZXhwb3J0IGNvbnN0IFhNTF9OUyA9IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIjtcbnZhciBTVkdfTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG5cbmZ1bmN0aW9uIGRlZmluZVN2Z0VsZW1lbnQodGFnLCBhcmcxLCBhcmcyLCBmbGFncykge1xuXHR2YXIgbiA9IGRlZmluZUVsZW1lbnQodGFnLCBhcmcxLCBhcmcyLCBmbGFncyk7XG5cdG4ubnMgPSBTVkdfTlM7XG5cdHJldHVybiBuO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVDb21tZW50KGJvZHkpIHtcblx0dmFyIG5vZGUgPSBuZXcgVk5vZGU7XG5cdG5vZGUudHlwZSA9IENPTU1FTlQ7XG5cdG5vZGUuYm9keSA9IGJvZHk7XG5cdHJldHVybiBub2RlO1xufVxuXG4vLyBwbGFjZWhvbGRlciBmb3IgZGVjbGFyZWQgdmlld3NcbmZ1bmN0aW9uIFZWaWV3KHZpZXcsIGRhdGEsIGtleSwgb3B0cykge1xuXHR0aGlzLnZpZXcgPSB2aWV3O1xuXHR0aGlzLmRhdGEgPSBkYXRhO1xuXHR0aGlzLmtleSA9IGtleTtcblx0dGhpcy5vcHRzID0gb3B0cztcbn1cblxuVlZpZXcucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVlZpZXcsXG5cblx0dHlwZTogVlZJRVcsXG5cdHZpZXc6IG51bGwsXG5cdGRhdGE6IG51bGwsXG5cdGtleTogbnVsbCxcblx0b3B0czogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIGRlZmluZVZpZXcodmlldywgZGF0YSwga2V5LCBvcHRzKSB7XG5cdHJldHVybiBuZXcgVlZpZXcodmlldywgZGF0YSwga2V5LCBvcHRzKTtcbn1cblxuLy8gcGxhY2Vob2xkZXIgZm9yIGluamVjdGVkIFZpZXdNb2RlbHNcbmZ1bmN0aW9uIFZNb2RlbCh2bSkge1xuXHR0aGlzLnZtID0gdm07XG59XG5cblZNb2RlbC5wcm90b3R5cGUgPSB7XG5cdGNvbnN0cnVjdG9yOiBWTW9kZWwsXG5cblx0dHlwZTogVk1PREVMLFxuXHR2bTogbnVsbCxcbn07XG5cbmZ1bmN0aW9uIGluamVjdFZpZXcodm0pIHtcbi8vXHRpZiAodm0ubm9kZSA9PSBudWxsKVxuLy9cdFx0dm0uX3JlZHJhdyhudWxsLCBudWxsLCBmYWxzZSk7XG5cbi8vXHRyZXR1cm4gdm0ubm9kZTtcblxuXHRyZXR1cm4gbmV3IFZNb2RlbCh2bSk7XG59XG5cbmZ1bmN0aW9uIGluamVjdEVsZW1lbnQoZWwpIHtcblx0dmFyIG5vZGUgPSBuZXcgVk5vZGU7XG5cdG5vZGUudHlwZSA9IEVMRU1FTlQ7XG5cdG5vZGUuZWwgPSBub2RlLmtleSA9IGVsO1xuXHRyZXR1cm4gbm9kZTtcbn1cblxuZnVuY3Rpb24gbGF6eUxpc3QoaXRlbXMsIGNmZykge1xuXHR2YXIgbGVuID0gaXRlbXMubGVuZ3RoO1xuXG5cdHZhciBzZWxmID0ge1xuXHRcdGl0ZW1zOiBpdGVtcyxcblx0XHRsZW5ndGg6IGxlbixcblx0XHQvLyBkZWZhdWx0cyB0byByZXR1cm5pbmcgaXRlbSBpZGVudGl0eSAob3IgcG9zaXRpb24/KVxuXHRcdGtleTogZnVuY3Rpb24oaSkge1xuXHRcdFx0cmV0dXJuIGNmZy5rZXkoaXRlbXNbaV0sIGkpO1xuXHRcdH0sXG5cdFx0Ly8gZGVmYXVsdCByZXR1cm5zIDA/XG5cdFx0ZGlmZjogZnVuY3Rpb24oaSwgZG9ub3IpIHtcblx0XHRcdHZhciBuZXdWYWxzID0gY2ZnLmRpZmYoaXRlbXNbaV0sIGkpO1xuXHRcdFx0aWYgKGRvbm9yID09IG51bGwpXG5cdFx0XHRcdHsgcmV0dXJuIG5ld1ZhbHM7IH1cblx0XHRcdHZhciBvbGRWYWxzID0gZG9ub3IuX2RpZmY7XG5cdFx0XHR2YXIgc2FtZSA9IG5ld1ZhbHMgPT09IG9sZFZhbHMgfHwgaXNBcnIob2xkVmFscykgPyBjbXBBcnIobmV3VmFscywgb2xkVmFscykgOiBjbXBPYmoobmV3VmFscywgb2xkVmFscyk7XG5cdFx0XHRyZXR1cm4gc2FtZSB8fCBuZXdWYWxzO1xuXHRcdH0sXG5cdFx0dHBsOiBmdW5jdGlvbihpKSB7XG5cdFx0XHRyZXR1cm4gY2ZnLnRwbChpdGVtc1tpXSwgaSk7XG5cdFx0fSxcblx0XHRtYXA6IGZ1bmN0aW9uKHRwbCkge1xuXHRcdFx0Y2ZnLnRwbCA9IHRwbDtcblx0XHRcdHJldHVybiBzZWxmO1xuXHRcdH0sXG5cdFx0Ym9keTogZnVuY3Rpb24odm5vZGUpIHtcblx0XHRcdHZhciBuYm9keSA9IEFycmF5KGxlbik7XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdFx0dmFyIHZub2RlMiA9IHNlbGYudHBsKGkpO1xuXG5cdFx0XHQvL1x0aWYgKCh2bm9kZS5mbGFncyAmIEtFWUVEX0xJU1QpID09PSBLRVlFRF9MSVNUICYmIHNlbGYuICE9IG51bGwpXG5cdFx0XHQvL1x0XHR2bm9kZTIua2V5ID0gZ2V0S2V5KGl0ZW0pO1xuXG5cdFx0XHRcdHZub2RlMi5fZGlmZiA9IHNlbGYuZGlmZihpKTtcdFx0XHQvLyBob2xkcyBvbGRWYWxzIGZvciBjbXBcblxuXHRcdFx0XHRuYm9keVtpXSA9IHZub2RlMjtcblxuXHRcdFx0XHQvLyBydW4gcHJlcHJvYyBwYXNzIChzaG91bGQgdGhpcyBiZSBqdXN0IHByZVByb2MgaW4gYWJvdmUgbG9vcD8pIGJlbmNoXG5cdFx0XHRcdHByZVByb2Modm5vZGUyLCB2bm9kZSwgaSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlcGxhY2UgTGlzdCB3aXRoIGdlbmVyYXRlZCBib2R5XG5cdFx0XHR2bm9kZS5ib2R5ID0gbmJvZHk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBzZWxmO1xufVxuXG52YXIgbmFubyA9IHtcblx0Y29uZmlnOiBjb25maWcsXG5cblx0Vmlld01vZGVsOiBWaWV3TW9kZWwsXG5cdFZOb2RlOiBWTm9kZSxcblxuXHRjcmVhdGVWaWV3OiBjcmVhdGVWaWV3LFxuXG5cdGRlZmluZUVsZW1lbnQ6IGRlZmluZUVsZW1lbnQsXG5cdGRlZmluZVN2Z0VsZW1lbnQ6IGRlZmluZVN2Z0VsZW1lbnQsXG5cdGRlZmluZVRleHQ6IGRlZmluZVRleHQsXG5cdGRlZmluZUNvbW1lbnQ6IGRlZmluZUNvbW1lbnQsXG5cdGRlZmluZVZpZXc6IGRlZmluZVZpZXcsXG5cblx0aW5qZWN0VmlldzogaW5qZWN0Vmlldyxcblx0aW5qZWN0RWxlbWVudDogaW5qZWN0RWxlbWVudCxcblxuXHRsYXp5TGlzdDogbGF6eUxpc3QsXG5cblx0RklYRURfQk9EWTogRklYRURfQk9EWSxcblx0REVFUF9SRU1PVkU6IERFRVBfUkVNT1ZFLFxuXHRLRVlFRF9MSVNUOiBLRVlFRF9MSVNULFxuXHRMQVpZX0xJU1Q6IExBWllfTElTVCxcbn07XG5cbmZ1bmN0aW9uIHByb3RvUGF0Y2gobiwgZG9SZXBhaW50KSB7XG5cdHBhdGNoJDEodGhpcywgbiwgZG9SZXBhaW50KTtcbn1cblxuLy8gbmV3Tm9kZSBjYW4gYmUgZWl0aGVyIHtjbGFzczogc3R5bGU6IH0gb3IgZnVsbCBuZXcgVk5vZGVcbi8vIHdpbGwvZGlkUGF0Y2ggaG9va3M/XG5mdW5jdGlvbiBwYXRjaCQxKG8sIG4sIGRvUmVwYWludCkge1xuXHRpZiAobi50eXBlICE9IG51bGwpIHtcblx0XHQvLyBubyBmdWxsIHBhdGNoaW5nIG9mIHZpZXcgcm9vdHMsIGp1c3QgdXNlIHJlZHJhdyFcblx0XHRpZiAoby52bSAhPSBudWxsKVxuXHRcdFx0eyByZXR1cm47IH1cblxuXHRcdHByZVByb2Mobiwgby5wYXJlbnQsIG8uaWR4LCBudWxsKTtcblx0XHRvLnBhcmVudC5ib2R5W28uaWR4XSA9IG47XG5cdFx0cGF0Y2gobiwgbyk7XG5cdFx0ZG9SZXBhaW50ICYmIHJlcGFpbnQobik7XG5cdFx0ZHJhaW5EaWRIb29rcyhnZXRWbShuKSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Ly8gVE9ETzogcmUtZXN0YWJsaXNoIHJlZnNcblxuXHRcdC8vIHNoYWxsb3ctY2xvbmUgdGFyZ2V0XG5cdFx0dmFyIGRvbm9yID0gT2JqZWN0LmNyZWF0ZShvKTtcblx0XHQvLyBmaXhhdGUgb3JpZyBhdHRyc1xuXHRcdGRvbm9yLmF0dHJzID0gYXNzaWduT2JqKHt9LCBvLmF0dHJzKTtcblx0XHQvLyBhc3NpZ24gbmV3IGF0dHJzIGludG8gbGl2ZSB0YXJnIG5vZGVcblx0XHR2YXIgb2F0dHJzID0gYXNzaWduT2JqKG8uYXR0cnMsIG4pO1xuXHRcdC8vIHByZXBlbmQgYW55IGZpeGVkIHNob3J0aGFuZCBjbGFzc1xuXHRcdGlmIChvLl9jbGFzcyAhPSBudWxsKSB7XG5cdFx0XHR2YXIgYWNsYXNzID0gb2F0dHJzLmNsYXNzO1xuXHRcdFx0b2F0dHJzLmNsYXNzID0gYWNsYXNzICE9IG51bGwgJiYgYWNsYXNzICE9PSBcIlwiID8gby5fY2xhc3MgKyBcIiBcIiArIGFjbGFzcyA6IG8uX2NsYXNzO1xuXHRcdH1cblxuXHRcdHBhdGNoQXR0cnMobywgZG9ub3IpO1xuXG5cdFx0ZG9SZXBhaW50ICYmIHJlcGFpbnQobyk7XG5cdH1cbn1cblxuVk5vZGVQcm90by5wYXRjaCA9IHByb3RvUGF0Y2g7XG5cbmZ1bmN0aW9uIG5leHRTdWJWbXMobiwgYWNjdW0pIHtcblx0dmFyIGJvZHkgPSBuLmJvZHk7XG5cblx0aWYgKGlzQXJyKGJvZHkpKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBib2R5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgbjIgPSBib2R5W2ldO1xuXG5cdFx0XHRpZiAobjIudm0gIT0gbnVsbClcblx0XHRcdFx0eyBhY2N1bS5wdXNoKG4yLnZtKTsgfVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IG5leHRTdWJWbXMobjIsIGFjY3VtKTsgfVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBhY2N1bTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lRWxlbWVudFNwcmVhZCh0YWcpIHtcblx0dmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cdHZhciBsZW4gPSBhcmdzLmxlbmd0aDtcblx0dmFyIGJvZHksIGF0dHJzO1xuXG5cdGlmIChsZW4gPiAxKSB7XG5cdFx0dmFyIGJvZHlJZHggPSAxO1xuXG5cdFx0aWYgKGlzUGxhaW5PYmooYXJnc1sxXSkpIHtcblx0XHRcdGF0dHJzID0gYXJnc1sxXTtcblx0XHRcdGJvZHlJZHggPSAyO1xuXHRcdH1cblxuXHRcdGlmIChsZW4gPT09IGJvZHlJZHggKyAxICYmIChpc1ZhbChhcmdzW2JvZHlJZHhdKSB8fCBpc0FycihhcmdzW2JvZHlJZHhdKSB8fCBhdHRycyAmJiAoYXR0cnMuX2ZsYWdzICYgTEFaWV9MSVNUKSA9PT0gTEFaWV9MSVNUKSlcblx0XHRcdHsgYm9keSA9IGFyZ3NbYm9keUlkeF07IH1cblx0XHRlbHNlXG5cdFx0XHR7IGJvZHkgPSBzbGljZUFyZ3MoYXJncywgYm9keUlkeCk7IH1cblx0fVxuXG5cdHJldHVybiBpbml0RWxlbWVudE5vZGUodGFnLCBhdHRycywgYm9keSk7XG59XG5cbmZ1bmN0aW9uIGRlZmluZVN2Z0VsZW1lbnRTcHJlYWQoKSB7XG5cdHZhciBuID0gZGVmaW5lRWxlbWVudFNwcmVhZC5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRuLm5zID0gU1ZHX05TO1xuXHRyZXR1cm4gbjtcbn1cblxuVmlld01vZGVsUHJvdG8uZW1pdCA9IGVtaXQ7XG5WaWV3TW9kZWxQcm90by5vbmVtaXQgPSBudWxsO1xuXG5WaWV3TW9kZWxQcm90by5ib2R5ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiBuZXh0U3ViVm1zKHRoaXMubm9kZSwgW10pO1xufTtcblxubmFuby5kZWZpbmVFbGVtZW50U3ByZWFkID0gZGVmaW5lRWxlbWVudFNwcmVhZDtcbm5hbm8uZGVmaW5lU3ZnRWxlbWVudFNwcmVhZCA9IGRlZmluZVN2Z0VsZW1lbnRTcHJlYWQ7XG5cblZpZXdNb2RlbFByb3RvLl9zdHJlYW0gPSBudWxsO1xuXG5mdW5jdGlvbiBwcm90b0F0dGFjaChlbCkge1xuXHR2YXIgdm0gPSB0aGlzO1xuXHRpZiAodm0ubm9kZSA9PSBudWxsKVxuXHRcdHsgdm0uX3JlZHJhdyhudWxsLCBudWxsLCBmYWxzZSk7IH1cblxuXHRhdHRhY2godm0ubm9kZSwgZWwpO1xuXG5cdHJldHVybiB2bTtcbn1cblxuLy8gdmVyeSBzaW1pbGFyIHRvIGh5ZHJhdGUsIFRPRE86IGRyeVxuZnVuY3Rpb24gYXR0YWNoKHZub2RlLCB3aXRoRWwpIHtcblx0dm5vZGUuZWwgPSB3aXRoRWw7XG5cdHdpdGhFbC5fbm9kZSA9IHZub2RlO1xuXG5cdHZhciBuYXR0cnMgPSB2bm9kZS5hdHRycztcblxuXHRmb3IgKHZhciBrZXkgaW4gbmF0dHJzKSB7XG5cdFx0dmFyIG52YWwgPSBuYXR0cnNba2V5XTtcblx0XHR2YXIgaXNEeW4gPSBpc0R5blByb3Aodm5vZGUudGFnLCBrZXkpO1xuXG5cdFx0aWYgKGlzU3R5bGVQcm9wKGtleSkgfHwgaXNTcGxQcm9wKGtleSkpIHt9XG5cdFx0ZWxzZSBpZiAoaXNFdlByb3Aoa2V5KSlcblx0XHRcdHsgcGF0Y2hFdmVudCh2bm9kZSwga2V5LCBudmFsKTsgfVxuXHRcdGVsc2UgaWYgKG52YWwgIT0gbnVsbCAmJiBpc0R5bilcblx0XHRcdHsgc2V0QXR0cih2bm9kZSwga2V5LCBudmFsLCBpc0R5bik7IH1cblx0fVxuXG5cdGlmICgodm5vZGUuZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1QpXG5cdFx0eyB2bm9kZS5ib2R5LmJvZHkodm5vZGUpOyB9XG5cblx0aWYgKGlzQXJyKHZub2RlLmJvZHkpICYmIHZub2RlLmJvZHkubGVuZ3RoID4gMCkge1xuXHRcdHZhciBjID0gd2l0aEVsLmZpcnN0Q2hpbGQ7XG5cdFx0dmFyIGkgPSAwO1xuXHRcdHZhciB2ID0gdm5vZGUuYm9keVtpXTtcblx0XHRkbyB7XG5cdFx0XHRpZiAodi50eXBlID09PSBWVklFVylcblx0XHRcdFx0eyB2ID0gY3JlYXRlVmlldyh2LnZpZXcsIHYuZGF0YSwgdi5rZXksIHYub3B0cykuX3JlZHJhdyh2bm9kZSwgaSwgZmFsc2UpLm5vZGU7IH1cblx0XHRcdGVsc2UgaWYgKHYudHlwZSA9PT0gVk1PREVMKVxuXHRcdFx0XHR7IHYgPSB2Lm5vZGUgfHwgdi5fcmVkcmF3KHZub2RlLCBpLCBmYWxzZSkubm9kZTsgfVxuXG5cdFx0XHR7XG5cdFx0XHRcdGlmICh2bm9kZS50YWcgPT09IFwidGFibGVcIiAmJiB2LnRhZyA9PT0gXCJ0clwiKSB7XG5cdFx0XHRcdFx0ZGV2Tm90aWZ5KFwiQVRUQUNIX0lNUExJQ0lUX1RCT0RZXCIsIFt2bm9kZSwgdl0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGF0dGFjaCh2LCBjKTtcblx0XHR9IHdoaWxlICgoYyA9IGMubmV4dFNpYmxpbmcpICYmICh2ID0gdm5vZGUuYm9keVsrK2ldKSlcblx0fVxufVxuXG5mdW5jdGlvbiB2bVByb3RvSHRtbChkeW5Qcm9wcykge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdGlmICh2bS5ub2RlID09IG51bGwpXG5cdFx0eyB2bS5fcmVkcmF3KG51bGwsIG51bGwsIGZhbHNlKTsgfVxuXG5cdHJldHVybiBodG1sKHZtLm5vZGUsIGR5blByb3BzKTtcbn1cblxuZnVuY3Rpb24gdlByb3RvSHRtbChkeW5Qcm9wcykge1xuXHRyZXR1cm4gaHRtbCh0aGlzLCBkeW5Qcm9wcyk7XG59XG5cbmZ1bmN0aW9uIGNhbWVsRGFzaCh2YWwpIHtcblx0cmV0dXJuIHZhbC5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCAnJDEtJDInKS50b0xvd2VyQ2FzZSgpO1xufVxuXG5mdW5jdGlvbiBzdHlsZVN0cihjc3MpIHtcblx0dmFyIHN0eWxlID0gXCJcIjtcblxuXHRmb3IgKHZhciBwbmFtZSBpbiBjc3MpIHtcblx0XHRpZiAoY3NzW3BuYW1lXSAhPSBudWxsKVxuXHRcdFx0eyBzdHlsZSArPSBjYW1lbERhc2gocG5hbWUpICsgXCI6IFwiICsgYXV0b1B4KHBuYW1lLCBjc3NbcG5hbWVdKSArICc7ICc7IH1cblx0fVxuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gdG9TdHIodmFsKSB7XG5cdHJldHVybiB2YWwgPT0gbnVsbCA/ICcnIDogJycrdmFsO1xufVxuXG52YXIgdm9pZFRhZ3MgPSB7XG4gICAgYXJlYTogdHJ1ZSxcbiAgICBiYXNlOiB0cnVlLFxuICAgIGJyOiB0cnVlLFxuICAgIGNvbDogdHJ1ZSxcbiAgICBjb21tYW5kOiB0cnVlLFxuICAgIGVtYmVkOiB0cnVlLFxuICAgIGhyOiB0cnVlLFxuICAgIGltZzogdHJ1ZSxcbiAgICBpbnB1dDogdHJ1ZSxcbiAgICBrZXlnZW46IHRydWUsXG4gICAgbGluazogdHJ1ZSxcbiAgICBtZXRhOiB0cnVlLFxuICAgIHBhcmFtOiB0cnVlLFxuICAgIHNvdXJjZTogdHJ1ZSxcbiAgICB0cmFjazogdHJ1ZSxcblx0d2JyOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBlc2NIdG1sKHMpIHtcblx0cyA9IHRvU3RyKHMpO1xuXG5cdGZvciAodmFyIGkgPSAwLCBvdXQgPSAnJzsgaSA8IHMubGVuZ3RoOyBpKyspIHtcblx0XHRzd2l0Y2ggKHNbaV0pIHtcblx0XHRcdGNhc2UgJyYnOiBvdXQgKz0gJyZhbXA7JzsgIGJyZWFrO1xuXHRcdFx0Y2FzZSAnPCc6IG91dCArPSAnJmx0Oyc7ICAgYnJlYWs7XG5cdFx0XHRjYXNlICc+Jzogb3V0ICs9ICcmZ3Q7JzsgICBicmVhaztcblx0XHQvL1x0Y2FzZSAnXCInOiBvdXQgKz0gJyZxdW90Oyc7IGJyZWFrO1xuXHRcdC8vXHRjYXNlIFwiJ1wiOiBvdXQgKz0gJyYjMDM5Oyc7IGJyZWFrO1xuXHRcdC8vXHRjYXNlICcvJzogb3V0ICs9ICcmI3gyZjsnOyBicmVhaztcblx0XHRcdGRlZmF1bHQ6ICBvdXQgKz0gc1tpXTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBlc2NRdW90ZXMocykge1xuXHRzID0gdG9TdHIocyk7XG5cblx0Zm9yICh2YXIgaSA9IDAsIG91dCA9ICcnOyBpIDwgcy5sZW5ndGg7IGkrKylcblx0XHR7IG91dCArPSBzW2ldID09PSAnXCInID8gJyZxdW90OycgOiBzW2ldOyB9XHRcdC8vIGFsc28gJj9cblxuXHRyZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBlYWNoSHRtbChhcnIsIGR5blByb3BzKSB7XG5cdHZhciBidWYgPSAnJztcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspXG5cdFx0eyBidWYgKz0gaHRtbChhcnJbaV0sIGR5blByb3BzKTsgfVxuXHRyZXR1cm4gYnVmO1xufVxuXG52YXIgaW5uZXJIVE1MID0gXCIuaW5uZXJIVE1MXCI7XG5cbmZ1bmN0aW9uIGh0bWwobm9kZSwgZHluUHJvcHMpIHtcblx0dmFyIG91dCwgc3R5bGU7XG5cblx0c3dpdGNoIChub2RlLnR5cGUpIHtcblx0XHRjYXNlIFZWSUVXOlxuXHRcdFx0b3V0ID0gY3JlYXRlVmlldyhub2RlLnZpZXcsIG5vZGUuZGF0YSwgbm9kZS5rZXksIG5vZGUub3B0cykuaHRtbChkeW5Qcm9wcyk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFZNT0RFTDpcblx0XHRcdG91dCA9IG5vZGUudm0uaHRtbCgpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBFTEVNRU5UOlxuXHRcdFx0aWYgKG5vZGUuZWwgIT0gbnVsbCAmJiBub2RlLnRhZyA9PSBudWxsKSB7XG5cdFx0XHRcdG91dCA9IG5vZGUuZWwub3V0ZXJIVE1MO1x0XHQvLyBwcmUtZXhpc3RpbmcgZG9tIGVsZW1lbnRzIChkb2VzIG5vdCBjdXJyZW50bHkgYWNjb3VudCBmb3IgYW55IHByb3BzIGFwcGxpZWQgdG8gdGhlbSlcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBidWYgPSBcIlwiO1xuXG5cdFx0XHRidWYgKz0gXCI8XCIgKyBub2RlLnRhZztcblxuXHRcdFx0dmFyIGF0dHJzID0gbm9kZS5hdHRycyxcblx0XHRcdFx0aGFzQXR0cnMgPSBhdHRycyAhPSBudWxsO1xuXG5cdFx0XHRpZiAoaGFzQXR0cnMpIHtcblx0XHRcdFx0Zm9yICh2YXIgcG5hbWUgaW4gYXR0cnMpIHtcblx0XHRcdFx0XHRpZiAoaXNFdlByb3AocG5hbWUpIHx8IHBuYW1lWzBdID09PSBcIi5cIiB8fCBwbmFtZVswXSA9PT0gXCJfXCIgfHwgZHluUHJvcHMgPT09IGZhbHNlICYmIGlzRHluUHJvcChub2RlLnRhZywgcG5hbWUpKVxuXHRcdFx0XHRcdFx0eyBjb250aW51ZTsgfVxuXG5cdFx0XHRcdFx0dmFyIHZhbCA9IGF0dHJzW3BuYW1lXTtcblxuXHRcdFx0XHRcdGlmIChwbmFtZSA9PT0gXCJzdHlsZVwiICYmIHZhbCAhPSBudWxsKSB7XG5cdFx0XHRcdFx0XHRzdHlsZSA9IHR5cGVvZiB2YWwgPT09IFwib2JqZWN0XCIgPyBzdHlsZVN0cih2YWwpIDogdmFsO1xuXHRcdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHZhbCA9PT0gdHJ1ZSlcblx0XHRcdFx0XHRcdHsgYnVmICs9IFwiIFwiICsgZXNjSHRtbChwbmFtZSkgKyAnPVwiXCInOyB9XG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsID09PSBmYWxzZSkge31cblx0XHRcdFx0XHRlbHNlIGlmICh2YWwgIT0gbnVsbClcblx0XHRcdFx0XHRcdHsgYnVmICs9IFwiIFwiICsgZXNjSHRtbChwbmFtZSkgKyAnPVwiJyArIGVzY1F1b3Rlcyh2YWwpICsgJ1wiJzsgfVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHN0eWxlICE9IG51bGwpXG5cdFx0XHRcdFx0eyBidWYgKz0gJyBzdHlsZT1cIicgKyBlc2NRdW90ZXMoc3R5bGUudHJpbSgpKSArICdcIic7IH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gaWYgYm9keS1sZXNzIHN2ZyBub2RlLCBhdXRvLWNsb3NlICYgcmV0dXJuXG5cdFx0XHRpZiAobm9kZS5ib2R5ID09IG51bGwgJiYgbm9kZS5ucyAhPSBudWxsICYmIG5vZGUudGFnICE9PSBcInN2Z1wiKVxuXHRcdFx0XHR7IHJldHVybiBidWYgKyBcIi8+XCI7IH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBidWYgKz0gXCI+XCI7IH1cblxuXHRcdFx0aWYgKCF2b2lkVGFnc1tub2RlLnRhZ10pIHtcblx0XHRcdFx0aWYgKGhhc0F0dHJzICYmIGF0dHJzW2lubmVySFRNTF0gIT0gbnVsbClcblx0XHRcdFx0XHR7IGJ1ZiArPSBhdHRyc1tpbm5lckhUTUxdOyB9XG5cdFx0XHRcdGVsc2UgaWYgKGlzQXJyKG5vZGUuYm9keSkpXG5cdFx0XHRcdFx0eyBidWYgKz0gZWFjaEh0bWwobm9kZS5ib2R5LCBkeW5Qcm9wcyk7IH1cblx0XHRcdFx0ZWxzZSBpZiAoKG5vZGUuZmxhZ3MgJiBMQVpZX0xJU1QpID09PSBMQVpZX0xJU1QpIHtcblx0XHRcdFx0XHRub2RlLmJvZHkuYm9keShub2RlKTtcblx0XHRcdFx0XHRidWYgKz0gZWFjaEh0bWwobm9kZS5ib2R5LCBkeW5Qcm9wcyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHsgYnVmICs9IGVzY0h0bWwobm9kZS5ib2R5KTsgfVxuXG5cdFx0XHRcdGJ1ZiArPSBcIjwvXCIgKyBub2RlLnRhZyArIFwiPlwiO1xuXHRcdFx0fVxuXHRcdFx0b3V0ID0gYnVmO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBURVhUOlxuXHRcdFx0b3V0ID0gZXNjSHRtbChub2RlLmJvZHkpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBDT01NRU5UOlxuXHRcdFx0b3V0ID0gXCI8IS0tXCIgKyBlc2NIdG1sKG5vZGUuYm9keSkgKyBcIi0tPlwiO1xuXHRcdFx0YnJlYWs7XG5cdH1cblxuXHRyZXR1cm4gb3V0O1xufVxuXG5WaWV3TW9kZWxQcm90by5hdHRhY2ggPSBwcm90b0F0dGFjaDtcblxuVmlld01vZGVsUHJvdG8uaHRtbCA9IHZtUHJvdG9IdG1sO1xuVk5vZGVQcm90by5odG1sID0gdlByb3RvSHRtbDtcblxubmFuby5ERVZNT0RFID0gREVWTU9ERTtcblxucmV0dXJuIG5hbm87XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kb212bS5kZXYuanMubWFwXG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgZ2xvYmFsID0gdGhpc1xuXG4gIHZhciBxdWV1ZUlkID0gMVxuICB2YXIgcXVldWUgPSB7fVxuICB2YXIgaXNSdW5uaW5nVGFzayA9IGZhbHNlXG5cbiAgaWYgKCFnbG9iYWwuc2V0SW1tZWRpYXRlKVxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnNvdXJjZSA9PSBnbG9iYWwpe1xuICAgICAgICBpZiAoaXNSdW5uaW5nVGFzaylcbiAgICAgICAgICBuZXh0VGljayhxdWV1ZVtlLmRhdGFdKVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpc1J1bm5pbmdUYXNrID0gdHJ1ZVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBxdWV1ZVtlLmRhdGFdKClcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgICAgZGVsZXRlIHF1ZXVlW2UuZGF0YV1cbiAgICAgICAgICBpc1J1bm5pbmdUYXNrID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgZnVuY3Rpb24gbmV4dFRpY2soZm4pIHtcbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkgc2V0SW1tZWRpYXRlKGZuKVxuICAgIC8vIGlmIGluc2lkZSBvZiB3ZWIgd29ya2VyXG4gICAgZWxzZSBpZiAoZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHNldFRpbWVvdXQoZm4pXG4gICAgZWxzZSB7XG4gICAgICBxdWV1ZUlkKytcbiAgICAgIHF1ZXVlW3F1ZXVlSWRdID0gZm5cbiAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShxdWV1ZUlkLCAnKicpXG4gICAgfVxuICB9XG5cbiAgRGVmZXJyZWQucmVzb2x2ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGVmZXJyZWQpXG4gICAgICByZXR1cm4gdmFsdWVcblxuICAgIHJldHVybiBuZXcgRGVmZXJyZWQoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSlcbiAgICB9KVxuICB9XG5cbiAgRGVmZXJyZWQucmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCEodGhpcy5fZCA9PSAxKSlcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICByZXR1cm4gbmV3IERlZmVycmVkKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcmVqZWN0KHZhbHVlKVxuICAgIH0pXG4gIH1cblxuICBEZWZlcnJlZC5hbGwgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgaWYgKCEodGhpcy5fZCA9PSAxKSlcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICBpZiAoIShhcnIgaW5zdGFuY2VvZiBBcnJheSkpXG4gICAgICByZXR1cm4gRGVmZXJyZWQucmVqZWN0KFR5cGVFcnJvcigpKVxuXG4gICAgdmFyIGQgPSBuZXcgRGVmZXJyZWQoKVxuXG4gICAgZnVuY3Rpb24gZG9uZShlLCB2KSB7XG4gICAgICBpZiAodilcbiAgICAgICAgcmV0dXJuIGQucmVzb2x2ZSh2KVxuXG4gICAgICBpZiAoZSlcbiAgICAgICAgcmV0dXJuIGQucmVqZWN0KGUpXG5cbiAgICAgIHZhciB1bnJlc29sdmVkID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoY250LCB2KSB7XG4gICAgICAgIGlmICh2ICYmIHYudGhlbilcbiAgICAgICAgICByZXR1cm4gY250ICsgMVxuICAgICAgICByZXR1cm4gY250XG4gICAgICB9LCAwKVxuXG4gICAgICBpZih1bnJlc29sdmVkID09IDApXG4gICAgICAgIGQucmVzb2x2ZShhcnIpXG5cbiAgICAgIGFyci5tYXAoZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgaWYgKHYgJiYgdi50aGVuKVxuICAgICAgICAgIHYudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgYXJyW2ldID0gclxuICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICByZXR1cm4gclxuICAgICAgICAgIH0sIGRvbmUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGRvbmUoKVxuXG4gICAgcmV0dXJuIGRcbiAgfVxuXG4gIERlZmVycmVkLnJhY2UgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgaWYgKCEodGhpcy5fZCA9PSAxKSlcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICBpZiAoIShhcnIgaW5zdGFuY2VvZiBBcnJheSkpXG4gICAgICByZXR1cm4gRGVmZXJyZWQucmVqZWN0KFR5cGVFcnJvcigpKVxuXG4gICAgaWYgKGFyci5sZW5ndGggPT0gMClcbiAgICAgIHJldHVybiBuZXcgRGVmZXJyZWQoKVxuXG4gICAgdmFyIGQgPSBuZXcgRGVmZXJyZWQoKVxuXG4gICAgZnVuY3Rpb24gZG9uZShlLCB2KSB7XG4gICAgICBpZiAodilcbiAgICAgICAgcmV0dXJuIGQucmVzb2x2ZSh2KVxuXG4gICAgICBpZiAoZSlcbiAgICAgICAgcmV0dXJuIGQucmVqZWN0KGUpXG5cbiAgICAgIHZhciB1bnJlc29sdmVkID0gYXJyLnJlZHVjZShmdW5jdGlvbiAoY250LCB2KSB7XG4gICAgICAgIGlmICh2ICYmIHYudGhlbilcbiAgICAgICAgICByZXR1cm4gY250ICsgMVxuICAgICAgICByZXR1cm4gY250XG4gICAgICB9LCAwKVxuXG4gICAgICBpZih1bnJlc29sdmVkID09IDApXG4gICAgICAgIGQucmVzb2x2ZShhcnIpXG5cbiAgICAgIGFyci5tYXAoZnVuY3Rpb24gKHYsIGkpIHtcbiAgICAgICAgaWYgKHYgJiYgdi50aGVuKVxuICAgICAgICAgIHYudGhlbihmdW5jdGlvbiAocikge1xuICAgICAgICAgICAgZG9uZShudWxsLCByKVxuICAgICAgICAgIH0sIGRvbmUpXG4gICAgICB9KVxuICAgIH1cblxuICAgIGRvbmUoKVxuXG4gICAgcmV0dXJuIGRcbiAgfVxuXG4gIERlZmVycmVkLl9kID0gMVxuXG5cbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgZnVuY3Rpb24gRGVmZXJyZWQocmVzb2x2ZXIpIHtcbiAgICAndXNlIHN0cmljdCdcbiAgICBpZiAodHlwZW9mIHJlc29sdmVyICE9ICdmdW5jdGlvbicgJiYgcmVzb2x2ZXIgIT0gdW5kZWZpbmVkKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIGlmICh0eXBlb2YgdGhpcyAhPSAnb2JqZWN0JyB8fCAodGhpcyAmJiB0aGlzLnRoZW4pKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIC8vIHN0YXRlc1xuICAgIC8vIDA6IHBlbmRpbmdcbiAgICAvLyAxOiByZXNvbHZpbmdcbiAgICAvLyAyOiByZWplY3RpbmdcbiAgICAvLyAzOiByZXNvbHZlZFxuICAgIC8vIDQ6IHJlamVjdGVkXG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgc3RhdGUgPSAwLFxuICAgICAgdmFsID0gMCxcbiAgICAgIG5leHQgPSBbXSxcbiAgICAgIGZuLCBlcjtcblxuICAgIHNlbGZbJ3Byb21pc2UnXSA9IHNlbGZcblxuICAgIHNlbGZbJ3Jlc29sdmUnXSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICBmbiA9IHNlbGYuZm5cbiAgICAgIGVyID0gc2VsZi5lclxuICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICB2YWwgPSB2XG4gICAgICAgIHN0YXRlID0gMVxuXG4gICAgICAgIG5leHRUaWNrKGZpcmUpXG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZlxuICAgIH1cblxuICAgIHNlbGZbJ3JlamVjdCddID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgIGZuID0gc2VsZi5mblxuICAgICAgZXIgPSBzZWxmLmVyXG4gICAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAgIHZhbCA9IHZcbiAgICAgICAgc3RhdGUgPSAyXG5cbiAgICAgICAgbmV4dFRpY2soZmlyZSlcblxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGZcbiAgICB9XG5cbiAgICBzZWxmWydfZCddID0gMVxuXG4gICAgc2VsZlsndGhlbiddID0gZnVuY3Rpb24gKF9mbiwgX2VyKSB7XG4gICAgICBpZiAoISh0aGlzLl9kID09IDEpKVxuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgICB2YXIgZCA9IG5ldyBEZWZlcnJlZCgpXG5cbiAgICAgIGQuZm4gPSBfZm5cbiAgICAgIGQuZXIgPSBfZXJcbiAgICAgIGlmIChzdGF0ZSA9PSAzKSB7XG4gICAgICAgIGQucmVzb2x2ZSh2YWwpXG4gICAgICB9XG4gICAgICBlbHNlIGlmIChzdGF0ZSA9PSA0KSB7XG4gICAgICAgIGQucmVqZWN0KHZhbClcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXh0LnB1c2goZClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRcbiAgICB9XG5cbiAgICBzZWxmWydjYXRjaCddID0gZnVuY3Rpb24gKF9lcikge1xuICAgICAgcmV0dXJuIHNlbGZbJ3RoZW4nXShudWxsLCBfZXIpXG4gICAgfVxuXG4gICAgdmFyIGZpbmlzaCA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gICAgICBzdGF0ZSA9IHR5cGUgfHwgNFxuICAgICAgbmV4dC5tYXAoZnVuY3Rpb24gKHApIHtcbiAgICAgICAgc3RhdGUgPT0gMyAmJiBwLnJlc29sdmUodmFsKSB8fCBwLnJlamVjdCh2YWwpXG4gICAgICB9KVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAodHlwZW9mIHJlc29sdmVyID09ICdmdW5jdGlvbicpXG4gICAgICAgIHJlc29sdmVyKHNlbGZbJ3Jlc29sdmUnXSwgc2VsZlsncmVqZWN0J10pXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgc2VsZlsncmVqZWN0J10oZSlcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZlxuXG4gICAgLy8gcmVmIDogcmVmZXJlbmNlIHRvICd0aGVuJyBmdW5jdGlvblxuICAgIC8vIGNiLCBlYywgY24gOiBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaywgbm90VGhlbm5hYmxlQ2FsbGJhY2tcbiAgICBmdW5jdGlvbiB0aGVubmFibGUgKHJlZiwgY2IsIGVjLCBjbikge1xuICAgICAgLy8gUHJvbWlzZXMgY2FuIGJlIHJlamVjdGVkIHdpdGggb3RoZXIgcHJvbWlzZXMsIHdoaWNoIHNob3VsZCBwYXNzIHRocm91Z2hcbiAgICAgIGlmIChzdGF0ZSA9PSAyKSB7XG4gICAgICAgIHJldHVybiBjbigpXG4gICAgICB9XG4gICAgICBpZiAoKHR5cGVvZiB2YWwgPT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PSAnZnVuY3Rpb24nKSAmJiB0eXBlb2YgcmVmID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdHJ5IHtcblxuICAgICAgICAgIC8vIGNudCBwcm90ZWN0cyBhZ2FpbnN0IGFidXNlIGNhbGxzIGZyb20gc3BlYyBjaGVja2VyXG4gICAgICAgICAgdmFyIGNudCA9IDBcbiAgICAgICAgICByZWYuY2FsbCh2YWwsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAoY250KyspIHJldHVyblxuICAgICAgICAgICAgdmFsID0gdlxuICAgICAgICAgICAgY2IoKVxuICAgICAgICAgIH0sIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBpZiAoY250KyspIHJldHVyblxuICAgICAgICAgICAgdmFsID0gdlxuICAgICAgICAgICAgZWMoKVxuICAgICAgICAgIH0pXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB2YWwgPSBlXG4gICAgICAgICAgZWMoKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjbigpXG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGZpcmUoKSB7XG5cbiAgICAgIC8vIGNoZWNrIGlmIGl0J3MgYSB0aGVuYWJsZVxuICAgICAgdmFyIHJlZjtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlZiA9IHZhbCAmJiB2YWwudGhlblxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICB2YWwgPSBlXG4gICAgICAgIHN0YXRlID0gMlxuICAgICAgICByZXR1cm4gZmlyZSgpXG4gICAgICB9XG5cbiAgICAgIHRoZW5uYWJsZShyZWYsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhdGUgPSAxXG4gICAgICAgIGZpcmUoKVxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGF0ZSA9IDJcbiAgICAgICAgZmlyZSgpXG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09IDEgJiYgdHlwZW9mIGZuID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbCA9IGZuKHZhbClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbHNlIGlmIChzdGF0ZSA9PSAyICYmIHR5cGVvZiBlciA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YWwgPSBlcih2YWwpXG4gICAgICAgICAgICBzdGF0ZSA9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB2YWwgPSBlXG4gICAgICAgICAgcmV0dXJuIGZpbmlzaCgpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsID09IHNlbGYpIHtcbiAgICAgICAgICB2YWwgPSBUeXBlRXJyb3IoKVxuICAgICAgICAgIGZpbmlzaCgpXG4gICAgICAgIH0gZWxzZSB0aGVubmFibGUocmVmLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmaW5pc2goMylcbiAgICAgICAgICB9LCBmaW5pc2gsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZpbmlzaChzdGF0ZSA9PSAxICYmIDMpXG4gICAgICAgICAgfSlcblxuICAgICAgfSlcbiAgICB9XG5cblxuICB9XG5cbiAgLy8gRXhwb3J0IG91ciBsaWJyYXJ5IG9iamVjdCwgZWl0aGVyIGZvciBub2RlLmpzIG9yIGFzIGEgZ2xvYmFsbHkgc2NvcGVkIHZhcmlhYmxlXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlWydleHBvcnRzJ10gPSBEZWZlcnJlZFxuICB9IGVsc2Uge1xuICAgIGdsb2JhbFsnUHJvbWlzZSddID0gZ2xvYmFsWydQcm9taXNlJ10gfHwgRGVmZXJyZWRcbiAgfVxufSkoKVxuIiwiKGZ1bmN0aW9uIChnbG9iYWwsIHVuZGVmaW5lZCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBuZXh0SGFuZGxlID0gMTsgLy8gU3BlYyBzYXlzIGdyZWF0ZXIgdGhhbiB6ZXJvXG4gICAgdmFyIHRhc2tzQnlIYW5kbGUgPSB7fTtcbiAgICB2YXIgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgdmFyIGRvYyA9IGdsb2JhbC5kb2N1bWVudDtcbiAgICB2YXIgcmVnaXN0ZXJJbW1lZGlhdGU7XG5cbiAgICBmdW5jdGlvbiBzZXRJbW1lZGlhdGUoY2FsbGJhY2spIHtcbiAgICAgIC8vIENhbGxiYWNrIGNhbiBlaXRoZXIgYmUgYSBmdW5jdGlvbiBvciBhIHN0cmluZ1xuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNhbGxiYWNrID0gbmV3IEZ1bmN0aW9uKFwiXCIgKyBjYWxsYmFjayk7XG4gICAgICB9XG4gICAgICAvLyBDb3B5IGZ1bmN0aW9uIGFyZ3VtZW50c1xuICAgICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICB9XG4gICAgICAvLyBTdG9yZSBhbmQgcmVnaXN0ZXIgdGhlIHRhc2tcbiAgICAgIHZhciB0YXNrID0geyBjYWxsYmFjazogY2FsbGJhY2ssIGFyZ3M6IGFyZ3MgfTtcbiAgICAgIHRhc2tzQnlIYW5kbGVbbmV4dEhhbmRsZV0gPSB0YXNrO1xuICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUobmV4dEhhbmRsZSk7XG4gICAgICByZXR1cm4gbmV4dEhhbmRsZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGhhbmRsZSkge1xuICAgICAgICBkZWxldGUgdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bih0YXNrKSB7XG4gICAgICAgIHZhciBjYWxsYmFjayA9IHRhc2suY2FsbGJhY2s7XG4gICAgICAgIHZhciBhcmdzID0gdGFzay5hcmdzO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgY2FsbGJhY2soYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KHVuZGVmaW5lZCwgYXJncyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJ1bklmUHJlc2VudChoYW5kbGUpIHtcbiAgICAgICAgLy8gRnJvbSB0aGUgc3BlYzogXCJXYWl0IHVudGlsIGFueSBpbnZvY2F0aW9ucyBvZiB0aGlzIGFsZ29yaXRobSBzdGFydGVkIGJlZm9yZSB0aGlzIG9uZSBoYXZlIGNvbXBsZXRlZC5cIlxuICAgICAgICAvLyBTbyBpZiB3ZSdyZSBjdXJyZW50bHkgcnVubmluZyBhIHRhc2ssIHdlJ2xsIG5lZWQgdG8gZGVsYXkgdGhpcyBpbnZvY2F0aW9uLlxuICAgICAgICBpZiAoY3VycmVudGx5UnVubmluZ0FUYXNrKSB7XG4gICAgICAgICAgICAvLyBEZWxheSBieSBkb2luZyBhIHNldFRpbWVvdXQuIHNldEltbWVkaWF0ZSB3YXMgdHJpZWQgaW5zdGVhZCwgYnV0IGluIEZpcmVmb3ggNyBpdCBnZW5lcmF0ZWQgYVxuICAgICAgICAgICAgLy8gXCJ0b28gbXVjaCByZWN1cnNpb25cIiBlcnJvci5cbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHRhc2sgPSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgICAgICAgICBpZiAodGFzaykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcnVuKHRhc2spO1xuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW1tZWRpYXRlKGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbiAoKSB7IHJ1bklmUHJlc2VudChoYW5kbGUpOyB9KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5Vc2VQb3N0TWVzc2FnZSgpIHtcbiAgICAgICAgLy8gVGhlIHRlc3QgYWdhaW5zdCBgaW1wb3J0U2NyaXB0c2AgcHJldmVudHMgdGhpcyBpbXBsZW1lbnRhdGlvbiBmcm9tIGJlaW5nIGluc3RhbGxlZCBpbnNpZGUgYSB3ZWIgd29ya2VyLFxuICAgICAgICAvLyB3aGVyZSBgZ2xvYmFsLnBvc3RNZXNzYWdlYCBtZWFucyBzb21ldGhpbmcgY29tcGxldGVseSBkaWZmZXJlbnQgYW5kIGNhbid0IGJlIHVzZWQgZm9yIHRoaXMgcHVycG9zZS5cbiAgICAgICAgaWYgKGdsb2JhbC5wb3N0TWVzc2FnZSAmJiAhZ2xvYmFsLmltcG9ydFNjcmlwdHMpIHtcbiAgICAgICAgICAgIHZhciBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBvbGRPbk1lc3NhZ2UgPSBnbG9iYWwub25tZXNzYWdlO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSBmYWxzZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoXCJcIiwgXCIqXCIpO1xuICAgICAgICAgICAgZ2xvYmFsLm9ubWVzc2FnZSA9IG9sZE9uTWVzc2FnZTtcbiAgICAgICAgICAgIHJldHVybiBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIC8vIEluc3RhbGxzIGFuIGV2ZW50IGhhbmRsZXIgb24gYGdsb2JhbGAgZm9yIHRoZSBgbWVzc2FnZWAgZXZlbnQ6IHNlZVxuICAgICAgICAvLyAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0RPTS93aW5kb3cucG9zdE1lc3NhZ2VcbiAgICAgICAgLy8gKiBodHRwOi8vd3d3LndoYXR3Zy5vcmcvc3BlY3Mvd2ViLWFwcHMvY3VycmVudC13b3JrL211bHRpcGFnZS9jb21tcy5odG1sI2Nyb3NzRG9jdW1lbnRNZXNzYWdlc1xuXG4gICAgICAgIHZhciBtZXNzYWdlUHJlZml4ID0gXCJzZXRJbW1lZGlhdGUkXCIgKyBNYXRoLnJhbmRvbSgpICsgXCIkXCI7XG4gICAgICAgIHZhciBvbkdsb2JhbE1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNvdXJjZSA9PT0gZ2xvYmFsICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGV2ZW50LmRhdGEgPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhLmluZGV4T2YobWVzc2FnZVByZWZpeCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoK2V2ZW50LmRhdGEuc2xpY2UobWVzc2FnZVByZWZpeC5sZW5ndGgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdsb2JhbC5hdHRhY2hFdmVudChcIm9ubWVzc2FnZVwiLCBvbkdsb2JhbE1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShtZXNzYWdlUHJlZml4ICsgaGFuZGxlLCBcIipcIik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBldmVudC5kYXRhO1xuICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIGNoYW5uZWwucG9ydDIucG9zdE1lc3NhZ2UoaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgaHRtbCA9IGRvYy5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICAvLyBDcmVhdGUgYSA8c2NyaXB0PiBlbGVtZW50OyBpdHMgcmVhZHlzdGF0ZWNoYW5nZSBldmVudCB3aWxsIGJlIGZpcmVkIGFzeW5jaHJvbm91c2x5IG9uY2UgaXQgaXMgaW5zZXJ0ZWRcbiAgICAgICAgICAgIC8vIGludG8gdGhlIGRvY3VtZW50LiBEbyBzbywgdGh1cyBxdWV1aW5nIHVwIHRoZSB0YXNrLiBSZW1lbWJlciB0byBjbGVhbiB1cCBvbmNlIGl0J3MgYmVlbiBjYWxsZWQuXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG4gICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gSWYgc3VwcG9ydGVkLCB3ZSBzaG91bGQgYXR0YWNoIHRvIHRoZSBwcm90b3R5cGUgb2YgZ2xvYmFsLCBzaW5jZSB0aGF0IGlzIHdoZXJlIHNldFRpbWVvdXQgZXQgYWwuIGxpdmUuXG4gICAgdmFyIGF0dGFjaFRvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihnbG9iYWwpO1xuICAgIGF0dGFjaFRvID0gYXR0YWNoVG8gJiYgYXR0YWNoVG8uc2V0VGltZW91dCA/IGF0dGFjaFRvIDogZ2xvYmFsO1xuXG4gICAgLy8gRG9uJ3QgZ2V0IGZvb2xlZCBieSBlLmcuIGJyb3dzZXJpZnkgZW52aXJvbm1lbnRzLlxuICAgIGlmICh7fS50b1N0cmluZy5jYWxsKGdsb2JhbC5wcm9jZXNzKSA9PT0gXCJbb2JqZWN0IHByb2Nlc3NdXCIpIHtcbiAgICAgICAgLy8gRm9yIE5vZGUuanMgYmVmb3JlIDAuOVxuICAgICAgICBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChjYW5Vc2VQb3N0TWVzc2FnZSgpKSB7XG4gICAgICAgIC8vIEZvciBub24tSUUxMCBtb2Rlcm4gYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFBvc3RNZXNzYWdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZ2xvYmFsLk1lc3NhZ2VDaGFubmVsKSB7XG4gICAgICAgIC8vIEZvciB3ZWIgd29ya2Vycywgd2hlcmUgc3VwcG9ydGVkXG4gICAgICAgIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGRvYyAmJiBcIm9ucmVhZHlzdGF0ZWNoYW5nZVwiIGluIGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpKSB7XG4gICAgICAgIC8vIEZvciBJRSA24oCTOFxuICAgICAgICBpbnN0YWxsUmVhZHlTdGF0ZUNoYW5nZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGb3Igb2xkZXIgYnJvd3NlcnNcbiAgICAgICAgaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpO1xuICAgIH1cblxuICAgIGF0dGFjaFRvLnNldEltbWVkaWF0ZSA9IHNldEltbWVkaWF0ZTtcbiAgICBhdHRhY2hUby5jbGVhckltbWVkaWF0ZSA9IGNsZWFySW1tZWRpYXRlO1xufSh0eXBlb2Ygc2VsZiA9PT0gXCJ1bmRlZmluZWRcIiA/IHR5cGVvZiBnbG9iYWwgPT09IFwidW5kZWZpbmVkXCIgPyB0aGlzIDogZ2xvYmFsIDogc2VsZikpO1xuIiwidmFyIHNjb3BlID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsKSB8fFxuICAgICAgICAgICAgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYpIHx8XG4gICAgICAgICAgICB3aW5kb3c7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5cbi8vIERPTSBBUElzLCBmb3IgY29tcGxldGVuZXNzXG5cbmV4cG9ydHMuc2V0VGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRUaW1lb3V0LCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCBzY29wZSwgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkge1xuICBpZiAodGltZW91dCkge1xuICAgIHRpbWVvdXQuY2xvc2UoKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gVGltZW91dChpZCwgY2xlYXJGbikge1xuICB0aGlzLl9pZCA9IGlkO1xuICB0aGlzLl9jbGVhckZuID0gY2xlYXJGbjtcbn1cblRpbWVvdXQucHJvdG90eXBlLnVucmVmID0gVGltZW91dC5wcm90b3R5cGUucmVmID0gZnVuY3Rpb24oKSB7fTtcblRpbWVvdXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2NsZWFyRm4uY2FsbChzY29wZSwgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIHNldGltbWVkaWF0ZSBhdHRhY2hlcyBpdHNlbGYgdG8gdGhlIGdsb2JhbCBvYmplY3RcbnJlcXVpcmUoXCJzZXRpbW1lZGlhdGVcIik7XG4vLyBPbiBzb21lIGV4b3RpYyBlbnZpcm9ubWVudHMsIGl0J3Mgbm90IGNsZWFyIHdoaWNoIG9iamVjdCBgc2V0aW1tZWRpYXRlYCB3YXNcbi8vIGFibGUgdG8gaW5zdGFsbCBvbnRvLiAgU2VhcmNoIGVhY2ggcG9zc2liaWxpdHkgaW4gdGhlIHNhbWUgb3JkZXIgYXMgdGhlXG4vLyBgc2V0aW1tZWRpYXRlYCBsaWJyYXJ5LlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5zZXRJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuc2V0SW1tZWRpYXRlKTtcbmV4cG9ydHMuY2xlYXJJbW1lZGlhdGUgPSAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZi5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5jbGVhckltbWVkaWF0ZSk7XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbnRlcmZhY2UgSVN0b3JhZ2VJdGVtIHtcblx0aGFuZGxlcjogKGU6IEV2ZW50KSA9PiBhbnk7XG5cdHNjb3BlOiBhbnk7XG59XG5pbnRlcmZhY2UgSUtleVN0b3JhZ2Uge1xuXHRba2V5OiBzdHJpbmddOiBJU3RvcmFnZUl0ZW1bXTtcbn1cblxuaW50ZXJmYWNlIElLZXlNYW5hZ2VyIHtcblx0YWRkSG90S2V5KGtleTogc3RyaW5nLCBoYW5kbGVyLCBzY29wZT86IGFueSk6IHZvaWQ7XG5cdHJlbW92ZUhvdEtleShrZXk/OiBzdHJpbmcsIHNjb3BlPzogYW55KTogdm9pZDtcblx0ZXhpc3Qoa2V5OiBzdHJpbmcpOiBib29sZWFuO1xufVxuXG5cbmZ1bmN0aW9uIGdldEhvdEtleUNvZGUoY29kZTogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgbWF0Y2hlcyA9IGNvZGUudG9Mb3dlckNhc2UoKS5tYXRjaCgvXFx3Ky9nKTtcblx0bGV0IGNvbXAgPSAwO1xuXHRsZXQga2V5ID0gXCJcIjtcblx0Zm9yIChsZXQgaSA9IDA7aSA8IG1hdGNoZXMubGVuZ3RoO2krKykge1xuXHRcdGNvbnN0IGNoZWNrID0gbWF0Y2hlc1tpXTtcblx0XHRpZiAoY2hlY2sgPT09IFwiY3RybFwiKSB7XG5cdFx0XHRjb21wICs9IDQ7XG5cdFx0fSBlbHNlIGlmIChjaGVjayA9PT0gXCJzaGlmdFwiKSB7XG5cdFx0XHRjb21wICs9IDI7XG5cdFx0fSBlbHNlIGlmIChjaGVjayA9PT0gXCJhbHRcIikge1xuXHRcdFx0Y29tcCArPSAxO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRrZXkgPSBjaGVjaztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGNvbXAgKyBrZXk7XG59XG5cbmNsYXNzIEtleU1hbmFnZXIgaW1wbGVtZW50cyBJS2V5TWFuYWdlciB7XG5cdHByaXZhdGUgX2tleXNTdG9yYWdlOiBJS2V5U3RvcmFnZSA9IHt9O1xuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG5cdFx0XHRjb25zdCBjb21wID0gKGUuY3RybEtleSB8fCBlLm1ldGFLZXkgPyA0IDogMCkgKyAoZS5zaGlmdEtleSA/IDIgOiAwKSArIChlLmFsdEtleSA/IDEgOiAwKTtcblx0XHRcdGxldCBrZXk7XG5cdFx0XHRpZiAoKGUud2hpY2ggPj0gNDggJiYgZS53aGljaCA8PSA1NykgfHwgKGUud2hpY2ggPj0gNjUgJiYgZS53aGljaCA8PSA5MCkpIHsgLy8gQS1aIDAtOVxuXHRcdFx0XHRrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2V5ID0gZS5rZXk7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBjb2RlID0gY29tcCArIGtleS50b0xvd2VyQ2FzZSgpO1xuXHRcdFx0Y29uc3QgYWN0aW9ucyA9IHRoaXMuX2tleXNTdG9yYWdlW2NvZGVdO1xuXHRcdFx0aWYgKGFjdGlvbnMpIHtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7aSA8IGFjdGlvbnMubGVuZ3RoO2krKykge1xuXHRcdFx0XHRcdGFjdGlvbnNbaV0uaGFuZGxlcihlKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGFkZEhvdEtleShrZXk6IHN0cmluZywgaGFuZGxlciwgc2NvcGU/OiBhbnkpOiB2b2lkIHtcblx0XHRjb25zdCBjb2RlID0gZ2V0SG90S2V5Q29kZShrZXkpO1xuXHRcdGlmICghdGhpcy5fa2V5c1N0b3JhZ2VbY29kZV0pIHtcblx0XHRcdHRoaXMuX2tleXNTdG9yYWdlW2NvZGVdID0gW107XG5cdFx0fVxuXHRcdHRoaXMuX2tleXNTdG9yYWdlW2NvZGVdLnB1c2goe1xuXHRcdFx0aGFuZGxlcixcblx0XHRcdHNjb3BlXG5cdFx0fSk7XG5cdH1cblx0cmVtb3ZlSG90S2V5KGtleT86IHN0cmluZywgc2NvcGU/OiBhbnkpOiB2b2lkIHtcblx0XHRjb25zdCBrZXlTdG9yYWdlID0gdGhpcy5fa2V5c1N0b3JhZ2U7XG5cdFx0aWYgKGtleSkge1xuXHRcdFx0Y29uc3QgY29kZSA9IGdldEhvdEtleUNvZGUoa2V5KTtcblx0XHRcdGRlbGV0ZSBrZXlTdG9yYWdlW2NvZGVdO1xuXHRcdH1cblx0XHRpZiAoc2NvcGUpIHtcblx0XHRcdGZvciAoY29uc3QgY29kZSBpbiBrZXlTdG9yYWdlKSB7XG5cdFx0XHRcdGNvbnN0IHRvRGVsZXRlID0gW107IC8vIGl0ZW1zIGluZGV4IHRvIGRlbGV0ZVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDtpIDwga2V5U3RvcmFnZVtjb2RlXS5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdFx0aWYgKGtleVN0b3JhZ2VbY29kZV1baV0uc2NvcGUgPT09IHNjb3BlKSB7XG5cdFx0XHRcdFx0XHR0b0RlbGV0ZS5wdXNoKGkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoa2V5U3RvcmFnZVtjb2RlXS5sZW5ndGggPT09IHRvRGVsZXRlLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRlbGV0ZSBrZXlTdG9yYWdlW2NvZGVdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGZvciAobGV0IGkgPSB0b0RlbGV0ZS5sZW5ndGggLSAxO2kgPj0gMDtpLS0pIHsgLy8gYmVnaW4gZnJvbSBsYXN0IGNveiBzcGxpY2UgY2hhbmdlIG90aGVyIGluZGV4XG5cdFx0XHRcdFx0XHRrZXlTdG9yYWdlW2NvZGVdLnNwbGljZSh0b0RlbGV0ZVtpXSwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGV4aXN0KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0Y29uc3QgY29kZSA9IGdldEhvdEtleUNvZGUoa2V5KTtcblx0XHRyZXR1cm4gISF0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXTtcblx0fVxufVxuXG5leHBvcnQgY29uc3Qga2V5TWFuYWdlciA9IG5ldyBLZXlNYW5hZ2VyKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRIb3RrZXlzKGhhbmRsZXJzLCBiZWZvcmVDYWxsPzogKCkgPT4gYm9vbGVhbikge1xuXHRjb25zdCBjb250ZXh0ID0gbmV3IERhdGUoKTtcblxuXHRjb25zdCB3cmFwSGFuZGxlciA9IGhhbmRsZXIgPT4gZSA9PiB7XG5cdFx0aWYgKGJlZm9yZUNhbGwgJiYgYmVmb3JlQ2FsbCgpID09PSBmYWxzZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRoYW5kbGVyKGUpO1xuXHR9O1xuXG5cdGZvciAoY29uc3Qga2V5IGluIGhhbmRsZXJzKSB7XG5cdFx0a2V5TWFuYWdlci5hZGRIb3RLZXkoXG5cdFx0XHRrZXksXG5cdFx0XHR3cmFwSGFuZGxlcihoYW5kbGVyc1trZXldKSxcblx0XHRcdGNvbnRleHRcblx0XHQpO1xuXHR9XG5cblx0cmV0dXJuICgpID0+IGtleU1hbmFnZXIucmVtb3ZlSG90S2V5KHVuZGVmaW5lZCwgY29udGV4dCk7XG59IiwiaW1wb3J0IHsgbG9jYXRlIH0gZnJvbSBcIi4vaHRtbFwiO1xuXG5sZXQgY291bnRlciA9IChuZXcgRGF0ZSgpKS52YWx1ZU9mKCk7XG5leHBvcnQgZnVuY3Rpb24gdWlkKCk6IHN0cmluZyB7XG5cdHJldHVybiBcInVcIiArIChjb3VudGVyKyspO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc291cmNlLCBkZWVwID0gdHJ1ZSl7XG5cdGlmIChzb3VyY2Upe1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHNvdXJjZSl7XG5cdFx0XHRjb25zdCBzb2JqID0gc291cmNlW2tleV07XG5cdFx0XHRjb25zdCB0b2JqID0gdGFyZ2V0W2tleV07XG5cdFx0XHRpZiAoZGVlcCAmJiB0eXBlb2YgdG9iaiA9PT0gXCJvYmplY3RcIiAmJiAhKHRvYmogaW5zdGFuY2VvZiBEYXRlKSAmJiAhKHRvYmogaW5zdGFuY2VvZiBBcnJheSkpe1xuXHRcdFx0XHRleHRlbmQodG9iaiwgc29iaik7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXRba2V5XSA9IHNvYmo7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiB0YXJnZXQ7XG59XG5cbmludGVyZmFjZSBJT0JqIHtcblx0W2tleTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlOiBJT0JqLCB3aXRob3V0SW5uZXI/OiBib29sZWFuKTogSU9CaiB7XG5cdGNvbnN0IHJlc3VsdDogSU9CaiA9IHt9O1xuXHRmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2Upe1xuXHRcdGlmICghd2l0aG91dElubmVyIHx8IGtleVswXSAhPT0gXCIkXCIpIHtcblx0XHRcdHJlc3VsdFtrZXldID0gc291cmNlW2tleV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsU29ydChhcnIpOiBhbnlbXSB7XG5cdHJldHVybiBhcnIuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcblx0XHRjb25zdCBubiA9IHR5cGVvZiBhID09PSBcInN0cmluZ1wiID8gYS5sb2NhbGVDb21wYXJlKGIpIDogYSAtIGI7XG5cdFx0cmV0dXJuIG5uO1xuXHR9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbmRleDxUID0gYW55PihhcnI6IFRbXSwgcHJlZGljYXRlOiAob2JqOiBUKSA9PiBib29sZWFuKTogbnVtYmVyIHtcblx0Y29uc3QgbGVuID0gYXJyLmxlbmd0aDtcblx0Zm9yIChsZXQgaT0wOyBpPGxlbjsgaSsrKSB7XG5cdFx0aWYgKHByZWRpY2F0ZShhcnJbaV0pKSB7XG5cdFx0XHRyZXR1cm4gaTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIC0xO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNFcXVhbFN0cmluZyhmcm9tOiBzdHJpbmcsIHRvOiBzdHJpbmcpOiBib29sZWFuIHtcblx0aWYgKGZyb20ubGVuZ3RoID4gdG8ubGVuZ3RoKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cdGZvciAobGV0IGk9MDsgaTxmcm9tLmxlbmd0aDsgaSsrKSB7XG5cdFx0aWYgKGZyb21baV0udG9Mb3dlckNhc2UoKSAhPT0gdG9baV0udG9Mb3dlckNhc2UoKSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNpbmdsZU91dGVyQ2xpY2soZm46IChlOiBNb3VzZUV2ZW50KSA9PiBib29sZWFuKSB7XG5cdGNvbnN0IGNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRpZiAoZm4oZSkpIHtcblx0XHRcdGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG5cdFx0fVxuXHR9O1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGV0ZWN0V2lkZ2V0Q2xpY2sod2lkZ2V0SWQ6IHN0cmluZywgY2I6IChpbm5lcjogYm9vbGVhbikgPT4gdm9pZCk6ICgpID0+IHZvaWQge1xuXHRjb25zdCBjbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiBjYihsb2NhdGUoZSwgXCJkaHhfd2lkZ2V0X2lkXCIpID09PSB3aWRnZXRJZCk7XG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG5cblx0cmV0dXJuICgpID0+IGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGljayk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bndyYXBCb3g8VD4oYm94OiBUIHwgVFtdKTogVCB7XG5cdGlmIChBcnJheS5pc0FycmF5KGJveCkpIHtcblx0XHRyZXR1cm4gYm94WzBdO1xuXHR9XG5cdHJldHVybiBib3g7XG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcEJveDxUPih1bmJveGVkOiBUIHwgVFtdKTogVFtdIHtcblx0aWYgKEFycmF5LmlzQXJyYXkodW5ib3hlZCkpIHtcblx0XHRyZXR1cm4gdW5ib3hlZDtcblx0fVxuXHRyZXR1cm4gW3VuYm94ZWRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWZpbmVkPFQ+KHNvbWU6IFQpOiBib29sZWFuIHtcblx0cmV0dXJuIHNvbWUgIT09IG51bGwgJiYgc29tZSAhPT0gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogbnVtYmVyW10ge1xuXHRpZiAoZnJvbSA+IHRvKSB7XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHR3aGlsZShmcm9tIDw9IHRvKSB7XG5cdFx0cmVzdWx0LnB1c2goZnJvbSsrKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufSIsImltcG9ydCAqIGFzIGRvbSBmcm9tIFwiZG9tdm0vZGlzdC9kZXYvZG9tdm0uZGV2LmpzXCI7XG5leHBvcnQgbGV0IGVsID0gZG9tLmRlZmluZUVsZW1lbnQ7XG5leHBvcnQgbGV0IHN2ID0gZG9tLmRlZmluZVN2Z0VsZW1lbnQ7XG5leHBvcnQgbGV0IHZpZXcgPSBkb20uZGVmaW5lVmlldztcbmV4cG9ydCBsZXQgY3JlYXRlID0gZG9tLmNyZWF0ZVZpZXc7XG5leHBvcnQgbGV0IGluamVjdCA9IGRvbS5pbmplY3RWaWV3O1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUhlbHAoKSB7XG5cdGRvbS5ERVZNT0RFLm11dGF0aW9ucyA9IGZhbHNlO1xuXHRkb20uREVWTU9ERS53YXJuaW5ncyA9IGZhbHNlO1xuXHRkb20uREVWTU9ERS52ZXJib3NlID0gZmFsc2U7XG5cdGRvbS5ERVZNT0RFLlVOS0VZRURfSU5QVVQgPSBmYWxzZTtcbn1cblxuZXhwb3J0IHR5cGUgVk5vZGUgPSBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIElEb21WaWV3e1xuXHRyZWRyYXcoKTtcblx0bW91bnQoZWwgOiBIVE1MRWxlbWVudCk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElEb21SZW5kZXJ7XG5cdHJlbmRlcih2aWV3IDogSURvbVZpZXcsIGRhdGE6IGFueSk6Vk5vZGU7XG59XG5leHBvcnQgaW50ZXJmYWNlIElWaWV3SGFzaCB7XG5cdFtuYW1lOiBzdHJpbmddIDogSURvbVJlbmRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2l6ZXIoaGFuZGxlcil7XG5cdGNvbnN0IHJlc2l6ZSA9ICh3aW5kb3cgYXMgYW55KS5SZXNpemVPYnNlcnZlcjtcblx0Y29uc3QgYWN0aXZlSGFuZGxlciA9IChub2RlKSA9PiB7XG5cblx0XHRjb25zdCBoZWlnaHQgPSBub2RlLmVsLm9mZnNldEhlaWdodDtcblx0XHRjb25zdCB3aWR0aCA9IG5vZGUuZWwub2Zmc2V0V2lkdGg7XG5cdFx0aGFuZGxlcih3aWR0aCwgaGVpZ2h0KTtcblx0fTtcblxuXHRpZiAocmVzaXplKXtcblx0XHRyZXR1cm4gZWwoXCJkaXYuZGh4LXJlc2l6ZS1vYnNlcnZlclwiLCB7XG5cdFx0XHRfaG9va3M6e1xuXHRcdFx0XHRkaWRJbnNlcnQobm9kZSl7XG5cdFx0XHRcdFx0bmV3IHJlc2l6ZSgoKSA9PiBhY3RpdmVIYW5kbGVyKG5vZGUpKS5vYnNlcnZlKG5vZGUuZWwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gZWwoXCJpZnJhbWUuZGh4LXJlc2l6ZS1vYnNlcnZlclwiLCB7XG5cdFx0X2hvb2tzOntcblx0XHRcdGRpZEluc2VydChub2RlKXtcblx0XHRcdFx0bm9kZS5lbC5jb250ZW50V2luZG93Lm9ucmVzaXplID0gKCkgPT4gYWN0aXZlSGFuZGxlcihub2RlKTtcblx0XHRcdFx0YWN0aXZlSGFuZGxlcihub2RlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufSIsImV4cG9ydCB0eXBlIENhbGxiYWNrID0gKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5leHBvcnQgaW50ZXJmYWNlIElFdmVudFN5c3RlbTxFLCBUIGV4dGVuZHMgSUV2ZW50SGFuZGxlcnNNYXAgPSBJRXZlbnRIYW5kbGVyc01hcD4ge1xuXHRjb250ZXh0OiBhbnk7XG5cdGV2ZW50czogSUV2ZW50cztcblx0b248SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGNhbGxiYWNrOiBUW0tdLCBjb250ZXh0PzogYW55KTtcblx0ZGV0YWNoKG5hbWU6IEUsIGNvbnRleHQ/OiBhbnkpO1xuXHRjbGVhcigpOiB2b2lkO1xuXHRmaXJlPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBhcmdzPzogQXJndW1lbnRUeXBlczxUW0tdPik6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBJRXZlbnQge1xuXHRjYWxsYmFjazogQ2FsbGJhY2s7XG5cdGNvbnRleHQ6IGFueTtcbn1cbmludGVyZmFjZSBJRXZlbnRzIHtcblx0W2tleTogc3RyaW5nXTogSUV2ZW50W107XG59XG5cbmludGVyZmFjZSBJRXZlbnRIYW5kbGVyc01hcCB7XG5cdFtrZXk6IHN0cmluZ106IENhbGxiYWNrO1xufVxudHlwZSBBcmd1bWVudFR5cGVzPEYgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IGFueT4gPSBGIGV4dGVuZHMgKC4uLmFyZ3M6IGluZmVyIEEpID0+IGFueSA/IEEgOiBuZXZlcjtcblxuZXhwb3J0IGNsYXNzIEV2ZW50U3lzdGVtPEUgZXh0ZW5kcyBzdHJpbmcsIFQgZXh0ZW5kcyBJRXZlbnRIYW5kbGVyc01hcCA9IElFdmVudEhhbmRsZXJzTWFwPiBpbXBsZW1lbnRzIElFdmVudFN5c3RlbTxFLCBUPiB7XG5cdHB1YmxpYyBldmVudHM6IElFdmVudHM7XG5cdHB1YmxpYyBjb250ZXh0OiBhbnk7XG5cblx0Y29uc3RydWN0b3IoY29udGV4dD86IGFueSkge1xuXHRcdHRoaXMuZXZlbnRzID0ge307XG5cdFx0dGhpcy5jb250ZXh0ID0gY29udGV4dCB8fCB0aGlzO1xuXHR9XG5cdG9uPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBjYWxsYmFjazogVFtLXSwgY29udGV4dD86IGFueSkge1xuXHRcdGNvbnN0IGV2ZW50OiBzdHJpbmcgPSAobmFtZSBhcyBzdHJpbmcpLnRvTG93ZXJDYXNlKCk7XG5cdFx0dGhpcy5ldmVudHNbZXZlbnRdID0gdGhpcy5ldmVudHNbZXZlbnRdIHx8IFtdO1xuXHRcdHRoaXMuZXZlbnRzW2V2ZW50XS5wdXNoKHsgY2FsbGJhY2ssIGNvbnRleHQ6IGNvbnRleHQgfHwgdGhpcy5jb250ZXh0IH0pO1xuXHR9XG5cdGRldGFjaChuYW1lOiBFLCBjb250ZXh0PzogYW55KSB7XG5cdFx0Y29uc3QgZXZlbnQ6IHN0cmluZyA9IG5hbWUudG9Mb3dlckNhc2UoKTtcblxuXHRcdGNvbnN0IGVTdGFjayA9IHRoaXMuZXZlbnRzW2V2ZW50XTtcblx0XHRpZiAoY29udGV4dCAmJiBlU3RhY2sgJiYgZVN0YWNrLmxlbmd0aCkge1xuXHRcdFx0Zm9yIChsZXQgaSA9IGVTdGFjay5sZW5ndGggLSAxO2kgPj0gMDtpLS0pIHtcblx0XHRcdFx0aWYgKGVTdGFja1tpXS5jb250ZXh0ID09PSBjb250ZXh0KSB7XG5cdFx0XHRcdFx0ZVN0YWNrLnNwbGljZShpLCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmV2ZW50c1tldmVudF0gPSBbXTtcblx0XHR9XG5cdH1cblx0ZmlyZTxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgYXJnczogQXJndW1lbnRUeXBlczxUW0tdPik6IGJvb2xlYW4ge1xuXHRcdGlmICh0eXBlb2YgYXJncyA9PT0gXCJ1bmRlZmluZWRcIikge1xuXHRcdFx0YXJncyA9IFtdIGFzIGFueTtcblx0XHR9XG5cblx0XHRjb25zdCBldmVudDogc3RyaW5nID0gKG5hbWUgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0aWYgKHRoaXMuZXZlbnRzW2V2ZW50XSkge1xuXHRcdFx0Y29uc3QgcmVzID0gdGhpcy5ldmVudHNbZXZlbnRdLm1hcChcblx0XHRcdFx0ZSA9PiBlLmNhbGxiYWNrLmFwcGx5KGUuY29udGV4dCwgYXJncylcblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gcmVzLmluZGV4T2YoZmFsc2UpIDwgMDtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0Y2xlYXIoKSB7XG5cdFx0dGhpcy5ldmVudHMgPSB7fTtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRXZlbnRzTWl4aW4ob2JqOiBhbnkpIHtcblx0b2JqID0gb2JqIHx8IHt9O1xuXHRjb25zdCBldmVudFN5c3RlbSA9IG5ldyBFdmVudFN5c3RlbShvYmopO1xuXHRvYmouZGV0YWNoRXZlbnQgPSBldmVudFN5c3RlbS5kZXRhY2guYmluZChldmVudFN5c3RlbSk7XG5cdG9iai5hdHRhY2hFdmVudCA9IGV2ZW50U3lzdGVtLm9uLmJpbmQoZXZlbnRTeXN0ZW0pO1xuXHRvYmouY2FsbEV2ZW50ID0gZXZlbnRTeXN0ZW0uZmlyZS5iaW5kKGV2ZW50U3lzdGVtKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRGYWNhZGUge1xuXHRhdHRhY2hFdmVudDogYW55O1xuXHRjYWxsRXZlbnQ6IGFueTtcbn0iLCJpbXBvcnQgXCIuL3BvbHlmaWxscy9tYXRjaGVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b05vZGUobm9kZTogc3RyaW5nIHwgSFRNTEVsZW1lbnQpOiBIVE1MRWxlbWVudCB7XG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdG5vZGUgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobm9kZSkgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihub2RlKSkgYXMgSFRNTEVsZW1lbnQ7XG5cdH1cblx0cmV0dXJuIG5vZGUgfHwgZG9jdW1lbnQuYm9keTtcbn1cblxudHlwZSBldmVudFByZXBhcmUgPSAoZXY6RXZlbnQpID0+IGFueTtcbmludGVyZmFjZSBJSGFuZGxlckhhc2gge1xuXHRbbmFtZTogc3RyaW5nXTogKCguLi5hcmdzOiBhbnlbXSkgPT4gKGJvb2xlYW4gfCB2b2lkKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBldmVudEhhbmRsZXIocHJlcGFyZTpldmVudFByZXBhcmUsIGhhc2g6SUhhbmRsZXJIYXNoKXtcblx0Y29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGhhc2gpO1xuXG5cdHJldHVybiBmdW5jdGlvbihldjpFdmVudCl7XG5cdFx0Y29uc3QgZGF0YSA9IHByZXBhcmUoZXYpO1xuXHRcdGxldCBub2RlID0gZXYudGFyZ2V0IGFzIChIVE1MRWxlbWVudCB8IFNWR0VsZW1lbnQpO1xuXG5cdFx0d2hpbGUgKG5vZGUpe1xuXHRcdFx0Y29uc3QgY3Nzc3RyaW5nID0gIG5vZGUuZ2V0QXR0cmlidXRlID8gKG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIikgOiBcIlwiO1xuXHRcdFx0aWYgKGNzc3N0cmluZy5sZW5ndGgpe1xuXHRcdFx0XHRjb25zdCBjc3MgPSBjc3NzdHJpbmcuc3BsaXQoXCIgXCIpO1xuXHRcdFx0XHRmb3IgKGxldCBqPTA7IGo8a2V5cy5sZW5ndGg7IGorKyl7XG5cdFx0XHRcdFx0aWYgKGNzcy5pbmRleE9mKGtleXNbal0pID4gLTEpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGhhc2hba2V5c1tqXV0oZXYsIGRhdGEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bm9kZSA9IG5vZGUucGFyZW50Tm9kZSBhcyAoSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZSh0YXJnZXQ6IEV2ZW50IHwgRWxlbWVudCwgYXR0cjogc3RyaW5nID0gXCJkaHhfaWRcIik6IHN0cmluZyB7XG5cdGNvbnN0IG5vZGUgPSBsb2NhdGVOb2RlKHRhcmdldCwgYXR0cik7XG5cdHJldHVybiBub2RlID8gbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cikgOiBcIlwiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxvY2F0ZU5vZGUodGFyZ2V0OiBFdmVudCB8IEVsZW1lbnQsIGF0dHI6IHN0cmluZyA9IFwiZGh4X2lkXCIpOiBFbGVtZW50IHtcblx0aWYgKHRhcmdldCBpbnN0YW5jZW9mIEV2ZW50KSB7XG5cdFx0dGFyZ2V0ID0gdGFyZ2V0LnRhcmdldCBhcyBIVE1MRWxlbWVudDtcblx0fVxuXHR3aGlsZSAodGFyZ2V0KSB7XG5cdFx0aWYgKHRhcmdldC5nZXRBdHRyaWJ1dGUgJiYgdGFyZ2V0LmdldEF0dHJpYnV0ZShhdHRyKSkge1xuXHRcdFx0cmV0dXJuIHRhcmdldDtcblx0XHR9XG5cdFx0dGFyZ2V0ID0gdGFyZ2V0LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQ7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJveChlbGVtKSB7XG5cdGNvbnN0IGJveCA9IGVsZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuXG5cdGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBib2R5LnNjcm9sbFRvcDtcblx0Y29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBib2R5LnNjcm9sbExlZnQ7XG5cblx0Y29uc3QgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcDtcblx0Y29uc3QgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdDtcblx0Y29uc3QgcmlnaHQgPSBib2R5Lm9mZnNldFdpZHRoIC0gYm94LnJpZ2h0O1xuXHRjb25zdCBib3R0b20gPSBib2R5Lm9mZnNldEhlaWdodCAtIGJveC5ib3R0b207XG5cdGNvbnN0IHdpZHRoID0gYm94LnJpZ2h0IC0gYm94LmxlZnQ7XG5cdGNvbnN0IGhlaWdodCA9IGJveC5ib3R0b20gLSBib3gudG9wO1xuXG5cdHJldHVybiB7IHRvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgd2lkdGgsIGhlaWdodCB9O1xufVxuXG5sZXQgc2Nyb2xsV2lkdGggPSAtMTtcbmV4cG9ydCBmdW5jdGlvbiBnZXRTY3JvbGxiYXJXaWR0aCgpOiBudW1iZXIge1xuXHRpZiAoc2Nyb2xsV2lkdGggPiAtMSl7XG5cdFx0cmV0dXJuIHNjcm9sbFdpZHRoO1xuXHR9XG5cblx0Y29uc3Qgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpO1xuXHRzY3JvbGxEaXYuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGFic29sdXRlO2xlZnQ6IC05OTk5OXB4O292ZXJmbG93OnNjcm9sbDt3aWR0aDogMTAwcHg7aGVpZ2h0OiAxMDBweDtcIjtcblx0c2Nyb2xsV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGg7XG5cdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KTtcblx0cmV0dXJuIHNjcm9sbFdpZHRoO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElGaXRUYXJnZXQge1xuXHR0b3A6IG51bWJlcjtcblx0bGVmdDogbnVtYmVyO1xuXHR3aWR0aDogbnVtYmVyO1xuXHRoZWlnaHQ6IG51bWJlcjtcbn1cbmludGVyZmFjZSBJRml0UG9zaXRpb24ge1xuXHRsZWZ0OiBudW1iZXI7XG5cdHJpZ2h0OiBudW1iZXI7XG5cdHRvcDogbnVtYmVyO1xuXHRib3R0b206IG51bWJlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUZpdFBvc2l0aW9uQ29uZmlnIHtcblx0bW9kZT86IFBvc2l0aW9uO1xuXHRhdXRvPzogYm9vbGVhbjtcblx0Y2VudGVyaW5nPzogYm9vbGVhbjtcblx0d2lkdGg6IG51bWJlcjtcblx0aGVpZ2h0OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaXRQb3NpdGlvbihub2RlOiBIVE1MRWxlbWVudCwgY29uZmlnOiBJRml0UG9zaXRpb25Db25maWcpIHtcblx0cmV0dXJuIGNhbGN1bGF0ZVBvc2l0aW9uKGdldFJlYWxQb3NpdGlvbihub2RlKSwgY29uZmlnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSUUoKSB7XG5cdGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cdHJldHVybiB1YS5pbmRleE9mKFwiTVNJRSBcIikgPiAtMSB8fCB1YS5pbmRleE9mKFwiVHJpZGVudC9cIikgPiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJlYWxQb3NpdGlvbihub2RlOiBIVE1MRWxlbWVudCk6IElGaXRQb3NpdGlvbiB7XG5cdGNvbnN0IHJlY3RzID0gbm9kZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0cmV0dXJuIHtcblx0XHRsZWZ0OiByZWN0cy5sZWZ0ICsgd2luZG93LnBhZ2VYT2Zmc2V0LFxuXHRcdHJpZ2h0OiByZWN0cy5yaWdodCArIHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHR0b3A6IHJlY3RzLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldCxcblx0XHRib3R0b206IHJlY3RzLmJvdHRvbSArIHdpbmRvdy5wYWdlWU9mZnNldFxuXHR9O1xufVxuXG5leHBvcnQgZW51bSBQb3NpdGlvbiB7XG5cdGxlZnQgPSBcImxlZnRcIixcblx0cmlnaHQgPSBcInJpZ2h0XCIsXG5cdGJvdHRvbSA9IFwiYm90dG9tXCIsXG5cdHRvcCA9IFwidG9wXCJcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlUG9zaXRpb24ocG9zOiBJRml0UG9zaXRpb24sIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XG5cdGNvbnN0IHtsZWZ0LCB0b3B9ID0gY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLmJvdHRvbSB8fCBjb25maWcubW9kZSA9PT0gUG9zaXRpb24udG9wXG5cdFx0PyBwbGFjZUJvdHRvbU9yVG9wKHBvcywgY29uZmlnKVxuXHRcdDogcGxhY2VSaWdodE9yTGVmdChwb3MsIGNvbmZpZyk7XG5cdHJldHVybiB7XG5cdFx0bGVmdDogTWF0aC5yb3VuZChsZWZ0KSArIFwicHhcIixcblx0XHR0b3A6IE1hdGgucm91bmQodG9wKSArIFwicHhcIixcblx0XHRtaW5XaWR0aDogTWF0aC5yb3VuZChjb25maWcud2lkdGgpICsgXCJweFwiLFxuXHRcdHBvc2l0aW9uOiBcImFic29sdXRlXCJcblx0fTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93Qm9yZGVycygpIHtcblx0cmV0dXJuIHtcblx0XHRyaWdodEJvcmRlcjogd2luZG93LnBhZ2VYT2Zmc2V0ICsgd2luZG93LmlubmVyV2lkdGgsXG5cdFx0Ym90dG9tQm9yZGVyOiB3aW5kb3cucGFnZVlPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHRcblx0fTtcbn1cblxuZnVuY3Rpb24gaG9yaXpvbnRhbENlbnRlcmluZyhwb3M6IElGaXRQb3NpdGlvbiwgd2lkdGg6IG51bWJlciwgcmlnaHRCb3JkZXI6IG51bWJlcikge1xuXHRjb25zdCBub2RlV2lkdGggPSBwb3MucmlnaHQgLSBwb3MubGVmdDtcblx0Y29uc3QgZGlmZiA9ICh3aWR0aCAtIG5vZGVXaWR0aCkgLyAyO1xuXG5cdGNvbnN0IGxlZnQgPSBwb3MubGVmdCAtIGRpZmY7XG5cdGNvbnN0IHJpZ2h0ID0gcG9zLnJpZ2h0ICsgZGlmZjtcblxuXHRpZiAobGVmdCA+PSAwICYmIHJpZ2h0IDw9IHJpZ2h0Qm9yZGVyKSB7XG5cdFx0cmV0dXJuIGxlZnQ7XG5cdH1cblxuXHRpZiAobGVmdCA8IDApIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdHJldHVybiByaWdodEJvcmRlciAtIHdpZHRoO1xufVxuXG5mdW5jdGlvbiB2ZXJ0aWNhbENlbnRlcmluZyhwb3M6IElGaXRQb3NpdGlvbiwgaGVpZ2h0OiBudW1iZXIsIGJvdHRvbUJvcmRlcjogbnVtYmVyKSB7XG5cdGNvbnN0IG5vZGVIZWlnaHQgPSBwb3MuYm90dG9tIC0gcG9zLnRvcDtcblx0Y29uc3QgZGlmZiA9IChoZWlnaHQgLSBub2RlSGVpZ2h0KSAvIDI7XG5cblx0Y29uc3QgdG9wID0gcG9zLnRvcCAtIGRpZmY7XG5cdGNvbnN0IGJvdHRvbSA9IHBvcy5ib3R0b20gKyBkaWZmO1xuXG5cdGlmICh0b3AgPj0gMCAmJiBib3R0b20gPD0gYm90dG9tQm9yZGVyKSB7XG5cdFx0cmV0dXJuIHRvcDtcblx0fVxuXG5cdGlmICh0b3AgPCAwKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gYm90dG9tQm9yZGVyIC0gaGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBwbGFjZUJvdHRvbU9yVG9wKHBvczogSUZpdFBvc2l0aW9uLCBjb25maWc6IElGaXRQb3NpdGlvbkNvbmZpZykge1xuXHRjb25zdCB7cmlnaHRCb3JkZXIsIGJvdHRvbUJvcmRlcn0gPSBnZXRXaW5kb3dCb3JkZXJzKCk7XG5cblx0bGV0IGxlZnQ7XG5cdGxldCB0b3A7XG5cblx0Y29uc3QgYm90dG9tRGlmZiA9IGJvdHRvbUJvcmRlciAtIHBvcy5ib3R0b20gLSBjb25maWcuaGVpZ2h0O1xuXHRjb25zdCB0b3BEaWZmID0gcG9zLnRvcCAtIGNvbmZpZy5oZWlnaHQ7XG5cblx0aWYgKGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi5ib3R0b20pIHtcblx0XHRpZiAoYm90dG9tRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSBwb3MuYm90dG9tO1xuXHRcdH0gZWxzZSBpZiAodG9wRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSB0b3BEaWZmO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRpZiAodG9wRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSB0b3BEaWZmO1xuXHRcdH0gZWxzZSBpZiAoYm90dG9tRGlmZiA+PSAwKSB7XG5cdFx0XHR0b3AgPSBwb3MuYm90dG9tO1xuXHRcdH1cblx0fVxuXG5cdGlmIChib3R0b21EaWZmIDwgMCAmJiB0b3BEaWZmIDwgMCkge1xuXHRcdGlmIChjb25maWcuYXV0bykge1xuXHRcdFx0cmV0dXJuIHBsYWNlUmlnaHRPckxlZnQocG9zLCB7Li4uY29uZmlnLCBtb2RlOiBQb3NpdGlvbi5yaWdodCwgYXV0bzogZmFsc2V9KTtcblx0XHR9XG5cdFx0dG9wID0gYm90dG9tRGlmZiA+IHRvcERpZmYgPyBwb3MuYm90dG9tIDogdG9wRGlmZjtcblx0fVxuXG5cdGlmIChjb25maWcuY2VudGVyaW5nKSB7XG5cdFx0bGVmdCA9IGhvcml6b250YWxDZW50ZXJpbmcocG9zLCBjb25maWcud2lkdGgsIHJpZ2h0Qm9yZGVyKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBsZWZ0RGlmZiA9IHJpZ2h0Qm9yZGVyIC0gcG9zLmxlZnQgLSBjb25maWcud2lkdGg7XG5cdFx0Y29uc3QgcmlnaHREaWZmID0gcG9zLnJpZ2h0IC0gY29uZmlnLndpZHRoO1xuXG5cdFx0aWYgKGxlZnREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBwb3MubGVmdDtcblx0XHR9IGVsc2UgaWYgKHJpZ2h0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gcmlnaHREaWZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZWZ0ID0gcmlnaHREaWZmID4gbGVmdERpZmYgID8gcG9zLmxlZnQgOiByaWdodERpZmY7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtsZWZ0LCB0b3B9O1xufVxuXG5mdW5jdGlvbiBwbGFjZVJpZ2h0T3JMZWZ0KHBvczogSUZpdFBvc2l0aW9uLCBjb25maWc6IElGaXRQb3NpdGlvbkNvbmZpZykge1xuXHRjb25zdCB7cmlnaHRCb3JkZXIsIGJvdHRvbUJvcmRlcn0gPSBnZXRXaW5kb3dCb3JkZXJzKCk7XG5cblx0bGV0IGxlZnQ7XG5cdGxldCB0b3A7XG5cblx0Y29uc3QgcmlnaHREaWZmID0gcmlnaHRCb3JkZXIgLSBwb3MucmlnaHQgLSBjb25maWcud2lkdGg7XG5cdGNvbnN0IGxlZnREaWZmID0gcG9zLmxlZnQgLSBjb25maWcud2lkdGg7XG5cblx0aWYgKGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi5yaWdodCkge1xuXHRcdGlmIChyaWdodERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IHBvcy5yaWdodDtcblx0XHR9IGVsc2UgaWYgKGxlZnREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBsZWZ0RGlmZjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKGxlZnREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBsZWZ0RGlmZjtcblx0XHR9IGVsc2UgaWYgKHJpZ2h0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gcG9zLnJpZ2h0O1xuXHRcdH1cblx0fVxuXG5cdGlmIChsZWZ0RGlmZiA8IDAgJiYgcmlnaHREaWZmIDwgMCkge1xuXHRcdGlmIChjb25maWcuYXV0bykge1xuXHRcdFx0cmV0dXJuIHBsYWNlQm90dG9tT3JUb3AocG9zLCB7Li4uY29uZmlnLCBtb2RlOiBQb3NpdGlvbi5ib3R0b20sIGF1dG86IGZhbHNlfSk7XG5cdFx0fVxuXHRcdGxlZnQgPSBsZWZ0RGlmZiA+IHJpZ2h0RGlmZiA/IGxlZnREaWZmIDogcG9zLnJpZ2h0O1xuXHR9XG5cblx0aWYgKGNvbmZpZy5jZW50ZXJpbmcpIHtcblx0XHR0b3AgPSB2ZXJ0aWNhbENlbnRlcmluZyhwb3MsIGNvbmZpZy5oZWlnaHQsIHJpZ2h0Qm9yZGVyKTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBib3R0b21EaWZmID0gcG9zLmJvdHRvbSAtIGNvbmZpZy5oZWlnaHQ7XG5cdFx0Y29uc3QgdG9wRGlmZiA9IGJvdHRvbUJvcmRlciAtIHBvcy50b3AgLSBjb25maWcuaGVpZ2h0O1xuXG5cdFx0aWYgKHRvcERpZmYgPj0gMCkge1xuXHRcdFx0dG9wID0gcG9zLnRvcDtcblx0XHR9IGVsc2UgaWYgKGJvdHRvbURpZmYgPiAwKSB7XG5cdFx0XHR0b3AgPSBib3R0b21EaWZmO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0b3AgPSBib3R0b21EaWZmID4gdG9wRGlmZiAgPyBib3R0b21EaWZmIDogcG9zLnRvcDtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4ge2xlZnQsIHRvcH07XG59IiwiaWYgKEVsZW1lbnQgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcblx0Y29uc3QgcHJvdG8gPSAoRWxlbWVudCBhcyBhbnkpLnByb3RvdHlwZTtcblx0cHJvdG8ubWF0Y2hlcyA9IHByb3RvLm1hdGNoZXNTZWxlY3RvciB8fFxuXHRcdHByb3RvLm1vek1hdGNoZXNTZWxlY3RvciB8fCBwcm90by5tc01hdGNoZXNTZWxlY3RvciB8fFxuXHRcdHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xufSIsImV4cG9ydCBpbnRlcmZhY2UgSUhhbmRsZXJzIHtcblx0W2tleTogc3RyaW5nXTogYW55RnVuY3Rpb24gfCBJSGFuZGxlcnM7XG59XG5cbmV4cG9ydCB0eXBlIGZuPFQgZXh0ZW5kcyBhbnlbXSxLPiA9ICguLi5hcmdzOiBUKSA9PiBLO1xuZXhwb3J0IHR5cGUgYW55RnVuY3Rpb24gPSBmbjxhbnlbXSwgYW55PjtcbmV4cG9ydCBpbnRlcmZhY2UgSUFueU9iaiB7XG5cdFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGVudW0gU2VsZWN0aW9uRXZlbnRzIHtcblx0YmVmb3JlVW5TZWxlY3QgPSBcImJlZm9yZXVuc2VsZWN0XCIsXG5cdGFmdGVyVW5TZWxlY3QgPSBcImFmdGVydW5zZWxlY3RcIixcblx0YmVmb3JlU2VsZWN0ID0gXCJiZWZvcmVzZWxlY3RcIixcblx0YWZ0ZXJTZWxlY3QgPSBcImFmdGVyc2VsZWN0XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0aW9uRXZlbnRzSGFuZGxlcnNNYXAge1xuXHRba2V5OiBzdHJpbmddOiAoLi4uYXJnczogYW55W10pID0+IGFueTtcblx0W1NlbGVjdGlvbkV2ZW50cy5hZnRlclNlbGVjdF06IChpZDogc3RyaW5nKSA9PiBhbnk7XG5cdFtTZWxlY3Rpb25FdmVudHMuYWZ0ZXJVblNlbGVjdF06IChpZDogc3RyaW5nKSA9PiBhbnk7XG5cdFtTZWxlY3Rpb25FdmVudHMuYmVmb3JlU2VsZWN0XTogKGlkOiBzdHJpbmcpID0+IHZvaWQgfCBib29sZWFuO1xuXHRbU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVVuU2VsZWN0XTogKGlkOiBzdHJpbmcpID0+IHZvaWQgfCBib29sZWFuO1xufSIsImltcG9ydCB7dWlkfSBmcm9tIFwiLi9jb3JlXCI7XG5pbXBvcnQgeyB0b05vZGUgfSBmcm9tIFwiLi9odG1sXCI7XG5cblxuZXhwb3J0IGludGVyZmFjZSBJVmlld3tcblx0Z2V0Um9vdFZpZXcoKTphbnk7XG5cdHBhaW50KCk6dm9pZDtcblx0bW91bnQoY29udGFpbmVyLCB2bm9kZSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBJVmlld0xpa2V7XG5cdG1vdW50Pyhjb250YWluZXIsIHZub2RlPyk7XG5cdGdldFJvb3RWaWV3KCk6YW55O1xufVxuXG5leHBvcnQgY2xhc3MgVmlldyB7XG5cdHB1YmxpYyBjb25maWc6IGFueTtcblx0cHJvdGVjdGVkIF9jb250YWluZXI6IGFueTtcblx0cHJvdGVjdGVkIF91aWQ6IGFueTtcblx0cHJvdGVjdGVkIF9kb05vdFJlcGFpbnQ6IGJvb2xlYW47XG5cdHByaXZhdGUgX3ZpZXc6YW55O1xuXG5cdGNvbnN0cnVjdG9yKF9jb250YWluZXIsIGNvbmZpZyl7XG5cdFx0dGhpcy5fdWlkID0gdWlkKCk7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG5cdH1cblxuXHRwdWJsaWMgbW91bnQoY29udGFpbmVyLCB2bm9kZT8gOmFueSl7XG5cdFx0aWYgKHZub2RlKXtcblx0XHRcdHRoaXMuX3ZpZXcgPSB2bm9kZTtcblx0XHR9XG5cdFx0aWYgKGNvbnRhaW5lciAmJiB0aGlzLl92aWV3ICYmIHRoaXMuX3ZpZXcubW91bnQpIHtcblx0XHRcdC8vIGluaXQgdmlldyBpbnNpZGUgb2YgSFRNTCBjb250YWluZXJcblx0XHRcdHRoaXMuX2NvbnRhaW5lciA9IHRvTm9kZShjb250YWluZXIpO1xuXHRcdFx0aWYgKHRoaXMuX2NvbnRhaW5lci50YWdOYW1lKXtcblx0XHRcdFx0dGhpcy5fdmlldy5tb3VudCh0aGlzLl9jb250YWluZXIpO1xuXHRcdFx0fSBlbHNlIGlmICh0aGlzLl9jb250YWluZXIuYXR0YWNoKXtcblx0XHRcdFx0dGhpcy5fY29udGFpbmVyLmF0dGFjaCh0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwdWJsaWMgdW5tb3VudCgpIHtcblx0XHRjb25zdCByb290VmlldyA9IHRoaXMuZ2V0Um9vdFZpZXcoKTtcblx0XHRpZiAocm9vdFZpZXcgJiYgcm9vdFZpZXcubm9kZSkge1xuXHRcdFx0cm9vdFZpZXcudW5tb3VudCgpO1xuXHRcdFx0dGhpcy5fdmlldyA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGdldFJvb3RWaWV3KCl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXc7XG5cdH1cblx0cHVibGljIGdldFJvb3ROb2RlKCk6IEhUTUxFbGVtZW50IHtcblx0XHRyZXR1cm4gdGhpcy5fdmlldyAmJiB0aGlzLl92aWV3Lm5vZGUgJiYgdGhpcy5fdmlldy5ub2RlLmVsO1xuXHR9XG5cblx0cHVibGljIHBhaW50KCl7XG5cdFx0aWYgKHRoaXMuX3ZpZXcgJiYgKC8vIHdhcyBtb3VudGVkXG5cdFx0XHR0aGlzLl92aWV3Lm5vZGUgfHwgXHQvLyBhbHJlYWR5IHJlbmRlcmVkIG5vZGVcblx0XHRcdHRoaXMuX2NvbnRhaW5lcikpeyAvLyBub3QgcmVuZGVyZWQsIGJ1dCBoYXMgY29udGFpbmVyXG5cdFx0XHR0aGlzLl9kb05vdFJlcGFpbnQgPSBmYWxzZTtcblx0XHRcdHRoaXMuX3ZpZXcucmVkcmF3KCk7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1ZpZXdMaWtlKHZpZXcpIHtcblx0cmV0dXJuIHtcblx0XHRnZXRSb290VmlldzogKCkgPT4gdmlldyxcblx0XHRwYWludDogKCkgPT4gdmlldy5ub2RlICYmIHZpZXcucmVkcmF3KCksXG5cdFx0bW91bnQ6IGNvbnRhaW5lciA9PiB2aWV3Lm1vdW50KGNvbnRhaW5lcilcblx0fTtcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3R5cGVzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RhdGFjb2xsZWN0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3RyZWVjb2xsZWN0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL0RyYWdNYW5hZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RhdGFwcm94eVwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9oZWxwZXJzXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RyaXZlcnMvQ3N2RHJpdmVyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RyaXZlcnMvSnNvbkRyaXZlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9zZWxlY3Rpb25cIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NvdXJjZXMvZHJpdmVycy9kcml2ZXJzXCI7XG4iLCJpbXBvcnQgeyBJZCB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmNsYXNzIENvbGxlY3Rpb25TdG9yZSB7XG5cdHByaXZhdGUgX3N0b3JlOiB7W2lkOiBzdHJpbmddOiBhbnl9ID0ge307XG5cblx0c2V0SXRlbShpZDogSWQsIHRhcmdldDogYW55KTogdm9pZCB7XG5cdFx0dGhpcy5fc3RvcmVbaWRdID0gdGFyZ2V0O1xuXHR9XG5cdGdldEl0ZW0oaWQ6IElkKSB7XG5cdFx0aWYgKCF0aGlzLl9zdG9yZVtpZF0pIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc3RvcmVbaWRdO1xuXHR9XG59XG5cbmNvbnN0IGRoeCA9ICh3aW5kb3cgYXMgYW55KS5kaHhIZWxwZXJzID0gKHdpbmRvdyBhcyBhbnkpLmRoeEhlbHBlcnMgfHwge307XG5kaHguY29sbGVjdGlvblN0b3JlID0gZGh4LmNvbGxlY3Rpb25TdG9yZSB8fCBuZXcgQ29sbGVjdGlvblN0b3JlKCk7XG5leHBvcnQgY29uc3QgY29sbGVjdGlvblN0b3JlID0gZGh4LmNvbGxlY3Rpb25TdG9yZTtcbiIsImltcG9ydCB7IGxvY2F0ZSwgbG9jYXRlTm9kZSwgZ2V0Qm94IH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2h0bWxcIjtcbmltcG9ydCB7IGNvbGxlY3Rpb25TdG9yZSB9IGZyb20gXCIuL0NvbGxlY3Rpb25TdG9yZVwiO1xuaW1wb3J0IHsgVHJlZUNvbGxlY3Rpb24gfSBmcm9tIFwiLi90cmVlY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgRHJvcEJlaGF2aW91ciwgRHJhZ0V2ZW50cywgRHJhZ01vZGUsIElkLCBJVHJhbnNmZXJEYXRhLCBEcm9wUG9zaXRpb24sIElDb3B5T2JqZWN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IGlzVHJlZUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cblxuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZTogTW91c2VFdmVudCkge1xuXHRjb25zdCB5ID0gZS5jbGllbnRZO1xuXHRjb25zdCBlbGVtZW50ID0gbG9jYXRlTm9kZShlKTtcblx0aWYgKCFlbGVtZW50KSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0Y29uc3QgdHJlZUxpbmU6IEhUTUxFbGVtZW50ID0gZWxlbWVudC5jaGlsZE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuXG5cdGNvbnN0IHt0b3AsIGhlaWdodH0gPSB0cmVlTGluZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0cmV0dXJuICh5IC0gdG9wKSAvIGhlaWdodDtcbn1cblxuZnVuY3Rpb24gZHJhZ0V2ZW50Q29udGVudChlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuXHRjb25zdCByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblx0Y29uc3QgZ2hvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRjb25zdCBjbG9uZSA9IGVsZW1lbnQuY2xvbmVOb2RlKHRydWUpIGFzIEhUTUxFbGVtZW50O1xuXHRjbG9uZS5zdHlsZS53aWR0aCA9IHJlY3Qud2lkdGggKyBcInB4XCI7XG5cdGNsb25lLnN0eWxlLmhlaWdodCA9IHJlY3QuaGVpZ2h0ICsgXCJweFwiO1xuXHRnaG9zdC5hcHBlbmRDaGlsZChjbG9uZSk7XG5cdGdob3N0LmNsYXNzTmFtZSA9IFwiZGh4X2RyYWctZ2hvc3RcIjtcblx0Z2hvc3Quc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cdGdob3N0LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcblx0cmV0dXJuIGdob3N0O1xufVxuXG5cbmNsYXNzIERyYWdNYW5hZ2VyIHtcblx0cHJpdmF0ZSBfdHJhbnNmZXJEYXRhOiBJVHJhbnNmZXJEYXRhID0ge307XG5cdHByaXZhdGUgX2Nhbk1vdmU6IGJvb2xlYW4gPSB0cnVlO1xuXG5cdHByaXZhdGUgX2xhc3RJZDogc3RyaW5nO1xuXHRwcml2YXRlIF9sYXN0Q29sbGVjdGlvbklkOiBzdHJpbmc7XG5cblx0cHVibGljIHNldEl0ZW0oaWQ6IElkLCBpdGVtOiBhbnkpIHtcblx0XHRjb2xsZWN0aW9uU3RvcmUuc2V0SXRlbShpZCwgaXRlbSk7XG5cdH1cblx0cHVibGljIG9uTW91c2VEb3duKGU6IE1vdXNlRXZlbnQpIHsgLy8gb25tb3VzZWRvd24gb25seSBmb3IgdGFyZ2V0IG9iamVjdHNcblx0XHRpZiAoZS53aGljaCAhPT0gMSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fb25Nb3VzZVVwKTtcblxuXHRcdGNvbnN0IGl0ZW0gPSBsb2NhdGVOb2RlKGUsIFwiZGh4X2lkXCIpIGFzIEhUTUxFbGVtZW50O1xuXHRcdGNvbnN0IGlkID0gaXRlbSAmJiBpdGVtLmdldEF0dHJpYnV0ZShcImRoeF9pZFwiKTtcblx0XHRjb25zdCB0YXJnZXRJZCA9IGxvY2F0ZShlLCBcImRoeF93aWRnZXRfaWRcIik7XG5cblx0XHRpZiAoaWQgJiYgdGFyZ2V0SWQpIHtcblx0XHRcdGNvbnN0IHtsZWZ0LCB0b3B9ID0gZ2V0Qm94KGl0ZW0pO1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmluaXRYT2Zmc2V0ID0gZS5wYWdlWCAtIGxlZnQ7XG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuaW5pdFlPZmZzZXQgPSBlLnBhZ2VZIC0gdG9wO1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLnggPSBlLnBhZ2VYO1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLnkgPSBlLnBhZ2VZO1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldElkID0gdGFyZ2V0SWQ7XG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuaWQgPSBpZDtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5pdGVtID0gaXRlbTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfb25Nb3VzZU1vdmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdGlmICghdGhpcy5fdHJhbnNmZXJEYXRhLmlkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3Qge3BhZ2VYLCBwYWdlWX0gPSBlO1xuXHRcdGlmICghdGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0KSB7XG5cdFx0XHRpZiAoTWF0aC5hYnModGhpcy5fdHJhbnNmZXJEYXRhLnggLSBwYWdlWCkgPCAzICYmIE1hdGguYWJzKHRoaXMuX3RyYW5zZmVyRGF0YS55IC0gcGFnZVkpIDwgMykge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBnaG9zdCA9IHRoaXMuX29uRHJhZ1N0YXJ0KHRoaXMuX3RyYW5zZmVyRGF0YS5pZCwgdGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldElkKTtcblx0XHRcdFx0aWYgKCFnaG9zdCkge1xuXHRcdFx0XHRcdHRoaXMuX2VuZERyb3AoKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0ID0gZ2hvc3Q7XG5cdFx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLl90cmFuc2ZlckRhdGEuZ2hvc3QpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX21vdmVHaG9zdChwYWdlWCwgcGFnZVkpO1xuXHRcdHRoaXMuX29uRHJhZyhlKTtcblx0fVxuXHRwcml2YXRlIF9vbk1vdXNlVXAgPSAoKSA9PiB7XG5cdFx0aWYgKCF0aGlzLl90cmFuc2ZlckRhdGEueCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0KSB7XG5cdFx0XHR0aGlzLl9yZW1vdmVHaG9zdCgpO1xuXHRcdFx0dGhpcy5fb25Ecm9wKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2VuZERyb3AoKTtcblx0XHR9XG5cblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX29uTW91c2VNb3ZlKTtcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9vbk1vdXNlVXApO1xuXG5cdH1cblx0cHJpdmF0ZSBfbW92ZUdob3N0KHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG5cdFx0aWYgKHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdCkge1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0LnN0eWxlLmxlZnQgPSB4IC0gdGhpcy5fdHJhbnNmZXJEYXRhLmluaXRYT2Zmc2V0ICsgXCJweFwiO1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0LnN0eWxlLnRvcCA9IHkgLSB0aGlzLl90cmFuc2ZlckRhdGEuaW5pdFlPZmZzZXQgKyAgXCJweFwiO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF9yZW1vdmVHaG9zdCgpIHtcblx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdCk7XG5cdH1cblx0cHJpdmF0ZSBfb25Ecm9wKCkge1xuXHRcdGlmICghdGhpcy5fY2FuTW92ZSkge1xuXHRcdFx0dGhpcy5fZW5kRHJvcCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhcmdldCA9IGNvbGxlY3Rpb25TdG9yZS5nZXRJdGVtKHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQpO1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRhcmdldCAmJiB0YXJnZXQuY29uZmlnO1xuXHRcdGlmICghdGFyZ2V0IHx8IGNvbmZpZy5kcmFnTW9kZSA9PT0gRHJhZ01vZGUuc291cmNlKSB7XG5cdFx0XHR0aGlzLl9lbmREcm9wKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmICh0YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5iZWZvcmVEcm9wLCBbdGhpcy5fbGFzdElkLCB0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0XSkpIHtcblx0XHRcdGNvbnN0IHRvID0ge1xuXHRcdFx0XHRpZDogdGhpcy5fbGFzdElkLFxuXHRcdFx0XHR0YXJnZXRcblx0XHRcdH07XG5cdFx0XHRjb25zdCBmcm9tID0ge1xuXHRcdFx0XHRpZDogdGhpcy5fdHJhbnNmZXJEYXRhLmlkLFxuXHRcdFx0XHR0YXJnZXQ6IHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXRcblx0XHRcdH07XG5cdFx0XHR0aGlzLl9tb3ZlKGZyb20sIHRvKTtcblx0XHRcdHRvLnRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmRyb3BDb21wbGV0ZSwgW3RvLmlkLCB0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uXSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fZW5kRHJvcCgpO1xuXHR9XG5cdHByaXZhdGUgX29uRHJhZ1N0YXJ0KGlkOiBzdHJpbmcsIHRhcmdldElkOiBzdHJpbmcpIHtcblx0XHRjb25zdCB0YXJnZXQgPSBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbSh0YXJnZXRJZCk7XG5cdFx0Y29uc3QgY29uZmlnID0gdGFyZ2V0LmNvbmZpZztcblx0XHRpZiAoY29uZmlnLmRyYWdNb2RlID09PSBEcmFnTW9kZS50YXJnZXQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBpdGVtID0gdGFyZ2V0LmRhdGEuZ2V0SXRlbShpZCk7XG5cdFx0Y29uc3QgZ2hvc3QgPSBkcmFnRXZlbnRDb250ZW50KHRoaXMuX3RyYW5zZmVyRGF0YS5pdGVtKTtcblx0XHRjb25zdCBhbnMgPSB0YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5iZWZvcmVEcmFnLCBbaXRlbSwgZ2hvc3RdKTtcblx0XHRpZiAoIWFucyB8fCAhaWQpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHR0YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5kcmFnU3RhcnQsIFtpZF0pO1xuXHRcdHRoaXMuX3RvZ2dsZVRleHRTZWxlY3Rpb24odHJ1ZSk7XG5cdFx0dGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldCA9IHRhcmdldDtcblx0XHR0aGlzLl90cmFuc2ZlckRhdGEuZHJhZ0NvbmZpZyA9IGNvbmZpZztcblx0XHRyZXR1cm4gZ2hvc3Q7XG5cdH1cblx0cHJpdmF0ZSBfb25EcmFnKGU6IE1vdXNlRXZlbnQpIHtcblx0XHRjb25zdCB7Y2xpZW50WCwgY2xpZW50WX0gPSBlO1xuXHRcdGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGNsaWVudFgsIGNsaWVudFkpO1xuXG5cdFx0Y29uc3QgY29sbGVjdGlvbklkID0gbG9jYXRlKGVsZW1lbnQsIFwiZGh4X3dpZGdldF9pZFwiKTtcblx0XHRpZiAoIWNvbGxlY3Rpb25JZCkge1xuXHRcdFx0aWYgKHRoaXMuX2Nhbk1vdmUpIHtcblx0XHRcdFx0dGhpcy5fY2FuY2VsQ2FuRHJvcCgpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHRhcmdldCA9IGNvbGxlY3Rpb25TdG9yZS5nZXRJdGVtKGNvbGxlY3Rpb25JZCk7XG5cdFx0Y29uc3QgaWQgPSBsb2NhdGUoZWxlbWVudCwgXCJkaHhfaWRcIik7XG5cblx0XHRpZiAoIWlkKSB7XG5cdFx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7XG5cdFx0XHR0aGlzLl9sYXN0Q29sbGVjdGlvbklkID0gY29sbGVjdGlvbklkO1xuXHRcdFx0dGhpcy5fbGFzdElkID0gbnVsbDtcblx0XHRcdHRoaXMuX2NhbkRyb3AoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblxuXHRcdGlmICh0YXJnZXQuY29uZmlnLmRyb3BCZWhhdmlvdXIgPT09IERyb3BCZWhhdmlvdXIuY29tcGxleCkge1xuXHRcdFx0Y29uc3QgcG9zID0gZ2V0UG9zaXRpb24oZSk7XG5cdFx0XHRpZiAocG9zIDw9IDAuMjUpIHtcblx0XHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmRyb3BQb3NpdGlvbiA9IERyb3BQb3NpdGlvbi50b3A7XG5cdFx0XHR9IGVsc2UgaWYgKHBvcyA+PSAwLjc1KSB7XG5cdFx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5kcm9wUG9zaXRpb24gPSBEcm9wUG9zaXRpb24uYm90O1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmRyb3BQb3NpdGlvbiA9IERyb3BQb3NpdGlvbi5pbjtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRoaXMuX2xhc3RJZCA9PT0gaWQgJiYgdGhpcy5fbGFzdENvbGxlY3Rpb25JZCA9PT0gY29sbGVjdGlvbklkKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgZnJvbTogSUNvcHlPYmplY3QgPSB7XG5cdFx0XHRpZDogdGhpcy5fdHJhbnNmZXJEYXRhLmlkLFxuXHRcdFx0dGFyZ2V0OiB0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0XG5cdFx0fTtcblx0XHRpZiAodGFyZ2V0LmNvbmZpZy5kcmFnTW9kZSA9PT0gXCJzb3VyY2VcIikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmcm9tLnRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmRyYWdPdXQsIFtpZCwgdGFyZ2V0XSk7XG5cblx0XHRpZiAoY29sbGVjdGlvbklkICE9PSB0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0SWQgfHwgIWlzVHJlZUNvbGxlY3Rpb24oZnJvbS50YXJnZXQuZGF0YSkgfHxcblx0XHRcdChpc1RyZWVDb2xsZWN0aW9uKGZyb20udGFyZ2V0LmRhdGEpICYmIGZyb20udGFyZ2V0LmRhdGEuY2FuQ29weShmcm9tLmlkLCBpZCkpKSB7XG5cdFx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7IC8vIGNsZWFyIGxhc3Rcblx0XHRcdHRoaXMuX2xhc3RJZCA9IGlkO1xuXHRcdFx0dGhpcy5fbGFzdENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZDtcblx0XHRcdGNvbnN0IGNhbk1vdmUgPSBmcm9tLnRhcmdldC5ldmVudHMuZmlyZShEcmFnRXZlbnRzLmRyYWdJbiwgW2lkLCB0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uLCBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbShjb2xsZWN0aW9uSWQpXSk7XG5cdFx0XHRpZiAoY2FuTW92ZSkge1xuXHRcdFx0XHR0aGlzLl9jYW5Ecm9wKCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NhbmNlbENhbkRyb3AoKTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfbW92ZShmcm9tOiBJQ29weU9iamVjdCwgdG86IElDb3B5T2JqZWN0KTogdm9pZCB7XG5cdFx0Y29uc3QgZnJvbURhdGEgPSBmcm9tLnRhcmdldC5kYXRhO1xuXHRcdGNvbnN0IHRvRGF0YSA9IHRvLnRhcmdldC5kYXRhO1xuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0bGV0IHRhcmdldElkID0gdG8uaWQ7XG5cdFx0Y29uc3QgYmVoYXZpb3VyID0gaXNUcmVlQ29sbGVjdGlvbih0b0RhdGEpID8gdG8udGFyZ2V0LmNvbmZpZy5kcm9wQmVoYXZpb3VyIDogdW5kZWZpbmVkO1xuXG5cdFx0c3dpdGNoKGJlaGF2aW91cikge1xuXHRcdFx0Y2FzZSBEcm9wQmVoYXZpb3VyLmNoaWxkOlxuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRHJvcEJlaGF2aW91ci5zaWJsaW5nOlxuXHRcdFx0XHR0YXJnZXRJZCA9ICh0b0RhdGEgYXMgVHJlZUNvbGxlY3Rpb24pLmdldFBhcmVudCh0YXJnZXRJZCk7XG5cdFx0XHRcdGluZGV4ID0gdG9EYXRhLmdldEluZGV4KHRvLmlkKSArIDE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBEcm9wQmVoYXZpb3VyLmNvbXBsZXg6XG5cdFx0XHRcdGNvbnN0IGRyb3BQb3NpdGlvbiA9IHRoaXMuX3RyYW5zZmVyRGF0YS5kcm9wUG9zaXRpb247XG5cdFx0XHRcdGlmIChkcm9wUG9zaXRpb24gPT09IERyb3BQb3NpdGlvbi50b3ApIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9ICh0b0RhdGEgYXMgVHJlZUNvbGxlY3Rpb24pLmdldFBhcmVudCh0YXJnZXRJZCk7XG5cdFx0XHRcdFx0aW5kZXggPSB0b0RhdGEuZ2V0SW5kZXgodG8uaWQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGRyb3BQb3NpdGlvbiA9PT0gRHJvcFBvc2l0aW9uLmJvdCkge1xuXHRcdFx0XHRcdHRhcmdldElkID0gKHRvRGF0YSBhcyBUcmVlQ29sbGVjdGlvbikuZ2V0UGFyZW50KHRhcmdldElkKTtcblx0XHRcdFx0XHRpbmRleCA9IHRvRGF0YS5nZXRJbmRleCh0by5pZCkgKyAxO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0Ly8gbGlzdCBtb3ZlXG5cdFx0XHRcdGlmICghdG8uaWQpIHtcblx0XHRcdFx0XHRpbmRleCA9IC0xO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGZyb20udGFyZ2V0ID09PSB0by50YXJnZXQgJiYgdG9EYXRhLmdldEluZGV4KGZyb20uaWQpIDwgdG9EYXRhLmdldEluZGV4KHRvLmlkKSkge1xuXHRcdFx0XHRcdGluZGV4ID0gdG9EYXRhLmdldEluZGV4KHRvLmlkKSAtIDE7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aW5kZXggPSB0b0RhdGEuZ2V0SW5kZXgodG8uaWQpO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHRcdGlmICh0aGlzLl90cmFuc2ZlckRhdGEuZHJhZ0NvbmZpZy5kcmFnQ29weSkge1xuXHRcdFx0ZnJvbURhdGEuY29weShmcm9tLmlkLCBpbmRleCwgdG9EYXRhLCB0YXJnZXRJZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdChmcm9tRGF0YSBhcyBhbnkpLm1vdmUoZnJvbS5pZCwgaW5kZXgsIHRvRGF0YSwgdGFyZ2V0SWQpOyAvLyB0eXBlc2NyaXB0IGJ1Zz8/XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX2VuZERyb3AoKSB7XG5cdFx0dGhpcy5fdG9nZ2xlVGV4dFNlbGVjdGlvbihmYWxzZSk7XG5cdFx0aWYgKHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXQpIHtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5kcmFnRW5kLCBbdGhpcy5fdHJhbnNmZXJEYXRhLmlkXSk7XG5cdFx0fVxuXHRcdHRoaXMuX2NhbmNlbENhbkRyb3AoKTtcblx0XHR0aGlzLl9jYW5Nb3ZlID0gdHJ1ZTtcblx0XHR0aGlzLl90cmFuc2ZlckRhdGEgPSB7fTtcblx0XHR0aGlzLl9sYXN0SWQgPSBudWxsO1xuXHRcdHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQgPSBudWxsO1xuXHR9XG5cdHByaXZhdGUgX2NhbmNlbENhbkRyb3AoKSB7XG5cdFx0dGhpcy5fY2FuTW92ZSA9IGZhbHNlO1xuXHRcdGNvbnN0IGNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbSh0aGlzLl9sYXN0Q29sbGVjdGlvbklkKTtcblx0XHRpZiAoY29sbGVjdGlvbiAmJiB0aGlzLl9sYXN0SWQpIHtcblx0XHRcdGNvbGxlY3Rpb24uZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5jYW5jZWxEcm9wLCBbdGhpcy5fbGFzdElkXSk7XG5cdFx0fVxuXHRcdHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQgPSBudWxsO1xuXHRcdHRoaXMuX2xhc3RJZCA9IG51bGw7XG5cdH1cblx0cHJpdmF0ZSBfY2FuRHJvcCgpIHtcblx0XHR0aGlzLl9jYW5Nb3ZlID0gdHJ1ZTtcblxuXHRcdGNvbnN0IHRhcmdldCA9IGNvbGxlY3Rpb25TdG9yZS5nZXRJdGVtKHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQpO1xuXHRcdGlmICh0YXJnZXQgJiYgdGhpcy5fbGFzdElkKSB7XG5cdFx0XHR0YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5jYW5Ecm9wLCBbdGhpcy5fbGFzdElkLCB0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uXSk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3RvZ2dsZVRleHRTZWxlY3Rpb24oYWRkOiBib29sZWFuKSB7XG5cdFx0aWYgKGFkZCkge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiZGh4X25vLXNlbGVjdFwiKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKFwiZGh4X25vLXNlbGVjdFwiKTtcblx0XHR9XG5cdH1cbn1cblxuY29uc3QgZGh4ID0gKHdpbmRvdyBhcyBhbnkpLmRoeEhlbHBlcnMgPSAod2luZG93IGFzIGFueSkuZGh4SGVscGVycyB8fCB7fTtcbmRoeC5kcmFnTWFuYWdlciA9IGRoeC5kcmFnTWFuYWdlciB8fCBuZXcgRHJhZ01hbmFnZXIoKTtcbmV4cG9ydCBjb25zdCBkcmFnTWFuYWdlciA9IGRoeC5kcmFnTWFuYWdlcjsiLCJpbXBvcnQgeyBFdmVudFN5c3RlbSwgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuXG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvbi9sb2FkZXJcIjtcbmltcG9ydCB7IFNvcnQgfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvbi9zb3J0XCI7XG5pbXBvcnQgeyBEYXRhUHJveHkgfSBmcm9tIFwiLi9kYXRhcHJveHlcIjtcbmltcG9ydCB7IGRoeEVycm9yLCBkaHhXYXJuaW5nLCBmaW5kQnlDb25mLCBpc0RlYnVnLCBpc0VxdWFsT2JqLCBjb3B5V2l0aG91dElubmVyLCB0b0RhdGFEcml2ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5pbXBvcnQge1xuXHREYXRhQ2FsbGJhY2ssIERhdGFFdmVudHMsIElkLCBJRGF0YUNoYW5nZVN0YWNrLCBJRGF0YUNvbGxlY3Rpb24sIElEYXRhSXRlbSxcblx0SURhdGFQcm94eSwgSUZpbHRlckNhbGxiYWNrLCBJRmlsdGVyQ29uZmlnLCBJRmlsdGVyTW9kZSwgSVNvcnRNb2RlLCBJVHJlZUNvbGxlY3Rpb24sIElVcGRhdGVPYmplY3QsIFJlZHVjZUNhbGxCYWNrLCBTdGF0dXNlcywgSURhdGFFdmVudHNIYW5kbGVyc01hcCwgRGF0YURyaXZlcixcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHsgY29weSwgZXh0ZW5kLCBmaW5kSW5kZXgsIHVpZCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9jb3JlXCI7XG5pbXBvcnQgeyBUcmVlQ29sbGVjdGlvbiB9IGZyb20gXCIuL3RyZWVjb2xsZWN0aW9uXCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRhQ29sbGVjdGlvbjxUIGV4dGVuZHMgSURhdGFJdGVtID0gSURhdGFJdGVtPiBpbXBsZW1lbnRzIElEYXRhQ29sbGVjdGlvbjxUPiB7XG5cdHB1YmxpYyBsb2FkRGF0YTogUHJvbWlzZTxhbnk+O1xuXHRwdWJsaWMgc2F2ZURhdGE6IFByb21pc2U8YW55Pjtcblx0cHVibGljIGNvbmZpZzogYW55OyAvLyBbVE9ET10gYWRkIHR5cGluZ3Ncblx0cHVibGljIGV2ZW50czogSUV2ZW50U3lzdGVtPERhdGFFdmVudHMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXA+O1xuXG5cdHByb3RlY3RlZCBfb3JkZXI6IFRbXTtcblx0cHJvdGVjdGVkIF9wdWxsOiB7IFtpZDogc3RyaW5nXTogVCB9O1xuXHRwcm90ZWN0ZWQgX3NvcnQ6IFNvcnQ7XG5cdHByb3RlY3RlZCBfZmlsdGVyczphbnk7XG5cblx0cHJpdmF0ZSBfY2hhbmdlczogSURhdGFDaGFuZ2VTdGFjaztcblxuXHRwcml2YXRlIF9pbml0T3JkZXI6IFRbXTtcblxuXHRwcml2YXRlIF9sb2FkZXI6IExvYWRlcjtcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc/OiBhbnksIGV2ZW50cz86SUV2ZW50U3lzdGVtPGFueT4pIHtcblx0XHR0aGlzLmNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcblxuXHRcdHRoaXMuX29yZGVyID0gW107XG5cdFx0dGhpcy5fcHVsbCA9IHt9O1xuXHRcdHRoaXMuX2NoYW5nZXMgPSB7b3JkZXI6IFtdfTtcblx0XHR0aGlzLl9pbml0T3JkZXIgPSBudWxsO1xuXG5cdFx0dGhpcy5fc29ydCA9IG5ldyBTb3J0KCk7XG5cdFx0dGhpcy5fbG9hZGVyID0gbmV3IExvYWRlcih0aGlzLCB0aGlzLl9jaGFuZ2VzKTtcblx0XHR0aGlzLmV2ZW50cyA9IGV2ZW50cyB8fCBuZXcgRXZlbnRTeXN0ZW08YW55Pih0aGlzKTtcblx0fVxuXG5cdGFkZChvYmo6IGFueSwgaW5kZXg/OiBudW1iZXIpOiBzdHJpbmcge1xuXHRcdGlmICghdGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmJlZm9yZUFkZCwgW29ial0pKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgaWQgPSB0aGlzLl9hZGRDb3JlKG9iaiwgaW5kZXgpO1xuXG5cdFx0dGhpcy5fb25DaGFuZ2UoXCJhZGRcIiwgb2JqLmlkLCBvYmopO1xuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5hZnRlckFkZCwgW29ial0pO1xuXHRcdHJldHVybiBpZDtcblx0fVxuXHRyZW1vdmUoaWQ6IElkKTogdm9pZCB7XG5cdFx0Y29uc3Qgb2JqID0gdGhpcy5fcHVsbFtpZF07XG5cdFx0aWYgKG9iaikge1xuXHRcdFx0aWYgKCF0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuYmVmb3JlUmVtb3ZlLCBbb2JqXSkpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fcmVtb3ZlQ29yZShvYmouaWQpO1xuXHRcdFx0dGhpcy5fb25DaGFuZ2UoXCJyZW1vdmVcIiwgaWQsIG9iaik7XG5cdFx0fVxuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmFmdGVyUmVtb3ZlLCBbb2JqXSk7XG5cdH1cblxuXHRyZW1vdmVBbGwoKTogdm9pZCB7XG5cdFx0dGhpcy5fcmVtb3ZlQWxsKCk7XG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLnJlbW92ZUFsbCk7XG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdH1cblxuXHRleGlzdHMoaWQ6IElkKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICEhdGhpcy5fcHVsbFtpZF07XG5cdH1cblx0Z2V0TmVhcklkKGlkOiBzdHJpbmcpe1xuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLl9wdWxsW2lkXTtcblx0XHRpZiAoIWl0ZW0pIHtcblx0XHRcdHJldHVybiB0aGlzLl9vcmRlclswXS5pZCB8fCBcIlwiO1xuXHRcdH1cblx0fVxuXHRnZXRJdGVtKGlkOiBJZCk6IFQge1xuXHRcdHJldHVybiB0aGlzLl9wdWxsW2lkXTtcblx0fVxuXHR1cGRhdGUoaWQ6IElkLCBvYmo6IElVcGRhdGVPYmplY3QsIHNpbGVudD86Ym9vbGVhbikge1xuXHRcdGNvbnN0IGl0ZW0gPSB0aGlzLmdldEl0ZW0oaWQpO1xuXHRcdGlmIChpdGVtKSB7XG5cdFx0XHRpZiAoaXNFcXVhbE9iaihvYmosIGl0ZW0pKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKG9iai5pZCAmJiBpZCAhPT0gb2JqLmlkKSB7XG5cdFx0XHRcdGRoeFdhcm5pbmcoXCJ0aGlzIG1ldGhvZCBkb2Vzbid0IGFsbG93IGNoYW5nZSBpZFwiKTtcblx0XHRcdFx0aWYgKGlzRGVidWcoKSkge1xuXHRcdFx0XHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1kZWJ1Z2dlclxuXHRcdFx0XHRcdGRlYnVnZ2VyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRleHRlbmQodGhpcy5fcHVsbFtpZF0sIG9iaiwgZmFsc2UpO1xuXHRcdFx0XHRpZiAodGhpcy5jb25maWcudXBkYXRlKXtcblx0XHRcdFx0XHR0aGlzLmNvbmZpZy51cGRhdGUodGhpcy5fcHVsbFtpZF0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICghc2lsZW50KXtcblx0XHRcdFx0XHR0aGlzLl9vbkNoYW5nZShcInVwZGF0ZVwiLCBpZCwgdGhpcy5fcHVsbFtpZF0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRoeFdhcm5pbmcoXCJpdGVtIG5vdCBmb3VuZFwiKTtcblx0XHR9XG5cdH1cblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyIHtcblx0XHRjb25zdCByZXMgPSBmaW5kSW5kZXgodGhpcy5fb3JkZXIsIGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpO1xuXHRcdGlmICh0aGlzLl9wdWxsW2lkXSAmJiByZXMgPj0gMCkge1xuXHRcdFx0cmV0dXJuIHJlcztcblx0XHR9XG5cdFx0cmV0dXJuIC0xO1xuXHR9XG5cdGdldElkKGluZGV4OiBudW1iZXIpOiBJZCB7XG5cdFx0aWYgKCF0aGlzLl9vcmRlcltpbmRleF0pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX29yZGVyW2luZGV4XS5pZDtcblx0fVxuXHRnZXRMZW5ndGgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX29yZGVyLmxlbmd0aDtcblx0fVxuXHRmaWx0ZXIocnVsZT86IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrLCBjb25maWc/OklGaWx0ZXJDb25maWcpIHtcblx0XHRjb25maWcgPSBleHRlbmQoe1xuXHRcdFx0YWRkOmZhbHNlLFxuXHRcdFx0bXVsdGlwbGU6dHJ1ZVxuXHRcdH0sY29uZmlnKTtcblxuXHRcdGlmICghY29uZmlnLmFkZCkge1xuXHRcdFx0dGhpcy5fb3JkZXIgPSB0aGlzLl9pbml0T3JkZXIgfHwgdGhpcy5fb3JkZXI7XG5cdFx0XHR0aGlzLl9pbml0T3JkZXIgPSBudWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuX2ZpbHRlcnMgPSB0aGlzLl9maWx0ZXJzIHx8IHt9O1xuXG5cdFx0aWYgKCFjb25maWcubXVsdGlwbGV8fCFydWxlKSB7XG5cdFx0XHR0aGlzLl9maWx0ZXJzID0ge307XG5cdFx0fVxuXG5cdFx0aWYocnVsZSl7XG5cdFx0XHRpZih0eXBlb2YgcnVsZSA9PT0gXCJmdW5jdGlvblwiKXtcblx0XHRcdFx0Y29uc3QgZiA9IFwiX1wiO1xuXHRcdFx0XHR0aGlzLl9maWx0ZXJzW2ZdID0ge1xuXHRcdFx0XHRcdG1hdGNoOmYsXG5cdFx0XHRcdFx0Y29tcGFyZTpydWxlXG5cdFx0XHRcdH07XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0aWYoIXJ1bGUubWF0Y2gpe1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9maWx0ZXJzW3J1bGUuYnldO1xuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRydWxlLmNvbXBhcmUgPSBydWxlLmNvbXBhcmUgfHwgKCh2YWwsIG1hdGNoKSA9PiB2YWwgPT09IG1hdGNoKTtcblx0XHRcdFx0XHR0aGlzLl9maWx0ZXJzW3J1bGUuYnldID0gcnVsZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBmT3JkZXIgPSB0aGlzLl9vcmRlci5maWx0ZXIoaXRlbSA9PiB7XG5cdFx0XHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9maWx0ZXJzKS5ldmVyeShcblx0XHRcdFx0XHRrZXkgPT5cblx0XHRcdFx0XHRcdGl0ZW1ba2V5XT9cblx0XHRcdFx0XHRcdHRoaXMuX2ZpbHRlcnNba2V5XS5jb21wYXJlKGl0ZW1ba2V5XSwgdGhpcy5fZmlsdGVyc1trZXldLm1hdGNoLCBpdGVtKVxuXHRcdFx0XHRcdFx0OnRoaXMuX2ZpbHRlcnNba2V5XS5jb21wYXJlKGl0ZW0pXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKCF0aGlzLl9pbml0T3JkZXIpIHtcblx0XHRcdFx0dGhpcy5faW5pdE9yZGVyID0gdGhpcy5fb3JkZXI7XG5cdFx0XHRcdHRoaXMuX29yZGVyID0gZk9yZGVyO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHR9XG5cdGZpbmQoY29uZjogSUZpbHRlck1vZGUgfCBEYXRhQ2FsbGJhY2s8VD4pOiBhbnkge1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3B1bGwpIHtcblx0XHRcdGNvbnN0IHJlcyA9IGZpbmRCeUNvbmYodGhpcy5fcHVsbFtrZXldLCBjb25mKTtcblx0XHRcdGlmKHJlcyl7XG5cdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGZpbmRBbGwoY29uZjogSUZpbHRlck1vZGUgfCBEYXRhQ2FsbGJhY2s8VD4pOiBhbnlbXSB7XG5cdFx0Y29uc3QgcmVzID0gW107XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gdGhpcy5fcHVsbCkge1xuXHRcdFx0Y29uc3QgaXRlbSA9IGZpbmRCeUNvbmYodGhpcy5fcHVsbFtrZXldLCBjb25mKTtcblx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdHJlcy5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzO1xuXHR9XG5cdHNvcnQoYnk6IElTb3J0TW9kZSkge1xuXHRcdHRoaXMuX3NvcnQuc29ydCh0aGlzLl9vcmRlciwgYnkpO1xuXG5cdFx0aWYgKHRoaXMuX2luaXRPcmRlciAmJiB0aGlzLl9pbml0T3JkZXIubGVuZ3RoKSB7XG5cdFx0XHR0aGlzLl9zb3J0LnNvcnQodGhpcy5faW5pdE9yZGVyLCBieSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdH1cblx0Y29weShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldD86IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkIHtcblx0XHRpZiAoIXRoaXMuZXhpc3RzKGlkKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IG5ld2lkID0gdWlkKCk7XG5cdFx0aWYgKHRhcmdldCkge1xuXHRcdFx0aWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgRGF0YUNvbGxlY3Rpb24pICYmIHRhcmdldElkKSB7XG5cdFx0XHRcdHRhcmdldC5hZGQoY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaW5kZXgsIHRhcmdldElkKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRhcmdldC5leGlzdHMoaWQpKSB7XG5cdFx0XHRcdHRhcmdldC5hZGQoey4uLmNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGlkOiBuZXdpZCB9LCBpbmRleCk7XG5cdFx0XHRcdHJldHVybiBuZXdpZDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldC5hZGQoY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaW5kZXgpO1xuXHRcdFx0XHRyZXR1cm4gaWQ7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuYWRkKHsgLi4uY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaWQ6IG5ld2lkIH0sIGluZGV4KTtcblx0XHRyZXR1cm4gbmV3aWQ7XG5cdH1cblx0bW92ZShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldD86IERhdGFDb2xsZWN0aW9uIHwgVHJlZUNvbGxlY3Rpb24sIHRhcmdldElkPzogSWQpOiBJZCB7XG5cdFx0aWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IHRoaXMgJiYgdGhpcy5leGlzdHMoaWQpKSB7XG5cdFx0XHRjb25zdCBpdGVtID0gY29weSh0aGlzLmdldEl0ZW0oaWQpLCB0cnVlKTtcblx0XHRcdGlmICh0YXJnZXQuZXhpc3RzKGlkKSkge1xuXHRcdFx0XHRpdGVtLmlkID0gdWlkKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAodGFyZ2V0SWQpIHtcblx0XHRcdFx0aXRlbS5wYXJlbnQgPSB0YXJnZXRJZDtcblx0XHRcdH1cblx0XHRcdHRhcmdldC5hZGQoaXRlbSwgaW5kZXgpO1xuXHRcdFx0Ly8gcmVtb3ZlIGRhdGEgZnJvbSBvcmlnaW5hbCBjb2xsZWN0aW9uXG5cdFx0XHR0aGlzLnJlbW92ZShpZCk7XG5cdFx0XHRyZXR1cm4gaXRlbS5pZDtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZ2V0SW5kZXgoaWQpID09PSBpbmRleCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdC8vIG1vdmUgb3RoZXIgZWxlbWVudHNcblx0XHRjb25zdCBzcGxpY2VkID0gdGhpcy5fb3JkZXIuc3BsaWNlKHRoaXMuZ2V0SW5kZXgoaWQpLCAxKVswXTtcblx0XHRpZiAoaW5kZXggPT09IC0xKSB7XG5cdFx0XHRpbmRleCA9IHRoaXMuX29yZGVyLmxlbmd0aDtcblx0XHR9XG5cdFx0dGhpcy5fb3JkZXIuc3BsaWNlKGluZGV4LCAwLCBzcGxpY2VkKTtcblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpOyAvLyBpZiB0YXJnZXQgbm90IHRoaXMsIGl0IHRyaWdnZXIgYWRkIGFuZCByZW1vdmVcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0bG9hZCh1cmw6IElEYXRhUHJveHkgfCBzdHJpbmcsIGRyaXZlcj86IGFueSk6IFByb21pc2U8YW55PiB7XG5cdFx0aWYgKHR5cGVvZiB1cmwgPT09IFwic3RyaW5nXCIpe1xuXHRcdFx0dXJsID0gbmV3IERhdGFQcm94eSh1cmwpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fbG9hZGVyLmxvYWQodXJsLCBkcml2ZXIpO1xuXHR9XG5cdHBhcnNlKGRhdGE6IFRbXSwgZHJpdmVyPzogYW55KSB7XG5cdFx0dGhpcy5fcmVtb3ZlQWxsKCk7XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlci5wYXJzZShkYXRhLCBkcml2ZXIpO1xuXHR9XG5cdCRwYXJzZShkYXRhOiBhbnlbXSl7XG5cdFx0Y29uc3QgYXB4ID0gdGhpcy5jb25maWcuYXBwcm94aW1hdGU7XG5cdFx0aWYgKGFweCl7XG5cdFx0XHRkYXRhID0gdGhpcy5fYXBwcm94aW1hdGUoZGF0YSwgYXB4LnZhbHVlLCBhcHgubWF4TnVtKTtcblx0XHR9XG5cblx0XHR0aGlzLl9wYXJzZV9kYXRhKGRhdGEpO1xuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmxvYWQpO1xuXHR9XG5cdHNhdmUodXJsOiBJRGF0YVByb3h5KSB7XG5cdFx0dGhpcy5fbG9hZGVyLnNhdmUodXJsKTtcblx0fVxuXHQvLyB0b2RvOiBsb29wIHRocm91Z2ggdGhlIGFycmF5IGFuZCBjaGVjayBzYXZlZCBzdGF0dXNlc1xuXHRpc1NhdmVkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhdGhpcy5fY2hhbmdlcy5vcmRlci5sZW5ndGg7IC8vIHRvZG86IGJhZCBzb2x1dGlvbiwgZXJyb3JzIGFuZCBob2xkZWQgZWxtZW50cyBhcmUgbWlzc2VkLi4uXG5cdH1cblx0bWFwKGNiOiBEYXRhQ2FsbGJhY2s8VD4pIDogYW55W117XG5cdFx0Y29uc3QgcmVzdWx0IDogYW55W10gPSBbXTtcblx0XHRmb3IgKGxldCBpPTA7IGk8dGhpcy5fb3JkZXIubGVuZ3RoOyBpKyspe1xuXHRcdFx0cmVzdWx0LnB1c2goY2IuY2FsbCh0aGlzLCB0aGlzLl9vcmRlcltpXSwgaSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdG1hcFJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlciwgY2I6IERhdGFDYWxsYmFjazxUPik6IGFueVtdIHtcblx0XHRpZiAoZnJvbSA8IDApIHtcblx0XHRcdGZyb20gPSAwO1xuXHRcdH1cblx0XHRpZiAodG8gPiB0aGlzLl9vcmRlci5sZW5ndGggLSAxKSB7XG5cdFx0XHR0byA9IHRoaXMuX29yZGVyLmxlbmd0aCAtIDE7XG5cdFx0fVxuXHRcdGNvbnN0IHJlc3VsdDogYW55W10gPSBbXTtcblx0XHRmb3IgKGxldCBpPWZyb207IGk8PXRvOyBpKyspe1xuXHRcdFx0cmVzdWx0LnB1c2goY2IuY2FsbCh0aGlzLCB0aGlzLl9vcmRlcltpXSwgaSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHJlZHVjZTxBPihjYjogUmVkdWNlQ2FsbEJhY2s8VCwgQT4sIGFjYzogQSl7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHRoaXMuX29yZGVyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRhY2MgPSBjYi5jYWxsKHRoaXMsIGFjYywgdGhpcy5fb3JkZXJbaV0sIGkpO1xuXHRcdH1cblx0XHRyZXR1cm4gYWNjO1xuXHR9XG5cdHNlcmlhbGl6ZShkcml2ZXI6IERhdGFEcml2ZXIgPSBEYXRhRHJpdmVyLmpzb24peyAvLyByZW1vdmUgJCBhdHRyc1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLm1hcChpdGVtID0+IHtcblx0XHRcdGNvbnN0IG5ld0l0ZW0gPSB7Li4uaXRlbSBhcyBJRGF0YUl0ZW19O1xuXHRcdFx0T2JqZWN0LmtleXMobmV3SXRlbSkuZm9yRWFjaChrZXkgPT4ge1xuXHRcdFx0XHRpZiAoa2V5WzBdID09PSBcIiRcIikge1xuXHRcdFx0XHRcdGRlbGV0ZSBuZXdJdGVtW2tleV07XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0cmV0dXJuIG5ld0l0ZW07XG5cdFx0fSk7XG5cdFx0Y29uc3QgZGF0YURyaXZlciA9IHRvRGF0YURyaXZlcihkcml2ZXIpO1xuXHRcdGlmKGRhdGFEcml2ZXIpe1xuXHRcdFx0cmV0dXJuIGRhdGFEcml2ZXIuc2VyaWFsaXplKGRhdGEpO1xuXHRcdH1cblx0fVxuXHRnZXRJbml0aWFsRGF0YSgpe1xuXHRcdHJldHVybiB0aGlzLl9pbml0T3JkZXI7XG5cdH1cblx0cHJvdGVjdGVkIF9yZW1vdmVBbGwoKXtcblx0XHR0aGlzLl9wdWxsID0ge307XG5cdFx0dGhpcy5fb3JkZXIgPSBbXTtcblx0XHR0aGlzLl9jaGFuZ2VzLm9yZGVyID0gW107XG5cdFx0dGhpcy5faW5pdE9yZGVyID0gbnVsbDtcblx0fVxuXHRwcm90ZWN0ZWQgX2FkZENvcmUob2JqLCBpbmRleCk6IHN0cmluZyB7XG5cdFx0aWYgKHRoaXMuY29uZmlnLmluaXQpIHtcblx0XHRcdG9iaiA9IHRoaXMuY29uZmlnLmluaXQob2JqKTtcblx0XHR9XG5cblx0XHRvYmouaWQgPSBvYmouaWQgPyBvYmouaWQudG9TdHJpbmcoKSA6IHVpZCgpO1xuXG5cdFx0aWYgKHRoaXMuX3B1bGxbb2JqLmlkXSkge1xuXHRcdFx0ZGh4RXJyb3IoXCJJdGVtIGFscmVhZHkgZXhpc3RcIik7XG5cdFx0fVxuXHRcdC8vIHRvZG86IG5vdCBpZGVhbCBzb2x1dGlvblxuXHRcdGlmICh0aGlzLl9pbml0T3JkZXIgJiYgdGhpcy5faW5pdE9yZGVyLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5fYWRkVG9PcmRlcih0aGlzLl9pbml0T3JkZXIsIG9iaiwgaW5kZXgpO1xuXHRcdH1cblxuXHRcdHRoaXMuX2FkZFRvT3JkZXIodGhpcy5fb3JkZXIsIG9iaiwgaW5kZXgpO1xuXG5cdFx0cmV0dXJuIG9iai5pZDtcblx0fVxuXHRwcm90ZWN0ZWQgX3JlbW92ZUNvcmUoaWQ6IElkKXtcblx0XHRpZiAodGhpcy5nZXRJbmRleChpZCkgPj0gMCl7XG5cdFx0XHR0aGlzLl9vcmRlciA9IHRoaXMuX29yZGVyLmZpbHRlcihlbCA9PiBlbC5pZCAhPT0gaWQpO1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3B1bGxbaWRdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9pbml0T3JkZXIgJiYgdGhpcy5faW5pdE9yZGVyLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5faW5pdE9yZGVyID0gdGhpcy5faW5pdE9yZGVyLmZpbHRlcihlbCA9PiBlbC5pZCAhPT0gaWQpO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfcGFyc2VfZGF0YShkYXRhOiBhbnlbXSl7XG5cdFx0bGV0IGluZGV4ID0gdGhpcy5fb3JkZXIubGVuZ3RoO1xuXHRcdGlmKHRoaXMuY29uZmlnLnByZXApe1xuXHRcdFx0ZGF0YSA9IHRoaXMuY29uZmlnLnByZXAoZGF0YSk7XG5cdFx0fVxuXHRcdGZvciAobGV0IG9iaiBvZiBkYXRhKSB7XG5cdFx0XHRpZiAodGhpcy5jb25maWcuaW5pdCkge1xuXHRcdFx0XHRvYmogPSB0aGlzLmNvbmZpZy5pbml0KG9iaik7XG5cdFx0XHR9XG5cdFx0XHRvYmouaWQgPSAob2JqLmlkIHx8IG9iai5pZCA9PT0gMCkgPyBvYmouaWQgOiB1aWQoKTtcblx0XHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcblx0XHRcdHRoaXMuX29yZGVyW2luZGV4KytdID0gb2JqO1xuXHRcdH1cblx0fVxuXG5cdHByb3RlY3RlZCBfYXBwcm94aW1hdGUoZGF0YTogYW55W10sIHZhbHVlczpzdHJpbmdbXSwgbWF4TnVtOm51bWJlcil7XG5cdFx0Y29uc3QgbGVuID0gZGF0YS5sZW5ndGg7XG5cdFx0Y29uc3QgdmxlbiA9IHZhbHVlcy5sZW5ndGg7XG5cdFx0Y29uc3QgcmxlbiA9IE1hdGguZmxvb3IobGVuL21heE51bSk7XG5cdFx0Y29uc3QgbmV3RGF0YSA9IEFycmF5KE1hdGguY2VpbChsZW4vcmxlbikpO1xuXG5cdFx0bGV0IGluZGV4ID0gMDtcblx0XHRmb3IgKGxldCBpPTA7IGk8bGVuOyBpKz1ybGVuKSB7XG5cdFx0XHRjb25zdCBuZXdJdGVtID0gY29weShkYXRhW2ldKTtcblx0XHRcdGNvbnN0IGVuZCA9IE1hdGgubWluKGxlbiwgaStybGVuKTtcblx0XHRcdGZvciAobGV0IGo9MDsgajx2bGVuOyBqKyspIHtcblx0XHRcdFx0bGV0IHN1bSA9IDA7XG5cdFx0XHRcdGZvciAobGV0IHo9aTsgejxlbmQ7IHorKyl7XG5cdFx0XHRcdFx0c3VtICs9IGRhdGFbel1bdmFsdWVzW2pdXTtcblx0XHRcdFx0fVxuXHRcdFx0XHRuZXdJdGVtW3ZhbHVlc1tqXV0gPSBzdW0gLyAoZW5kLWkpO1xuXHRcdFx0fVxuXHRcdFx0bmV3RGF0YVtpbmRleCsrXSA9IG5ld0l0ZW07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5ld0RhdGE7XG5cdH1cblx0cHJvdGVjdGVkIF9vbkNoYW5nZShzdGF0dXM6IFN0YXR1c2VzLCBpZDogSWQsIG9iajogYW55KTogdm9pZCB7XG5cdFx0Zm9yIChsZXQgaXRlbSBvZiB0aGlzLl9jaGFuZ2VzLm9yZGVyKSB7XG5cdFx0XHQvLyB1cGRhdGUgcGVuZGluZyBpdGVtIGlmIHByZXZpb3VzIHN0YXRlIGlzIFwic2F2aW5nXCIgb3IgaWYgaXRlbSBub3Qgc2F2ZWQgeWV0XG5cdFx0XHRpZiAoaXRlbS5pZCA9PT0gaWQgJiYgIWl0ZW0uc2F2aW5nKSB7XG5cdFx0XHRcdC8vIHVwZGF0ZSBpdGVtXG5cdFx0XHRcdGlmIChpdGVtLmVycm9yKSB7XG5cdFx0XHRcdFx0aXRlbS5lcnJvciA9IGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0gPSB7IC4uLml0ZW0sIG9iaiwgc3RhdHVzIH07XG5cblx0XHRcdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSwgW2lkLCBzdGF0dXMsIG9ial0pO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX2NoYW5nZXMub3JkZXIucHVzaCh7IGlkLCBzdGF0dXMsIG9iajp7IC4uLm9ian0sIHNhdmluZzogZmFsc2UgfSk7XG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSwgW2lkLCBzdGF0dXMsIG9ial0pO1xuXHR9XG5cdHByb3RlY3RlZCBfYWRkVG9PcmRlcihhcnJheTogYW55W10sIG9iajogYW55LCBpbmRleD86IG51bWJlcikge1xuXHRcdGlmIChpbmRleCA+PSAwICYmIGFycmF5W2luZGV4XSkge1xuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xuXHRcdFx0YXJyYXkuc3BsaWNlKGluZGV4LCAwLCBvYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wdWxsW29iai5pZF0gPSBvYmo7XG5cdFx0XHRhcnJheS5wdXNoKG9iaik7XG5cdFx0fVxuXHR9XG59IiwiaW1wb3J0IHsgRGF0YUNvbGxlY3Rpb24gfSBmcm9tIFwiLi8uLi9kYXRhY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgZGh4RXJyb3IsIGRoeFdhcm5pbmcsIGlzRXF1YWxPYmosIHRvRGF0YURyaXZlciB9IGZyb20gXCIuLy4uL2hlbHBlcnNcIjtcbmltcG9ydCB7IElkLCBJRGF0YURyaXZlciwgSURhdGFQcm94eSB9IGZyb20gXCIuLy4uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMb2FkZXIge1xuXHRwcml2YXRlIF9wYXJlbnQ6IERhdGFDb2xsZWN0aW9uO1xuXHRwcml2YXRlIF9zYXZpbmc6IGJvb2xlYW47XG5cdHByaXZhdGUgX2NoYW5nZXM6IGFueTtcblx0Y29uc3RydWN0b3IocGFyZW50OiBEYXRhQ29sbGVjdGlvbiwgY2hhbmdlczogYW55KSB7XG5cdFx0dGhpcy5fcGFyZW50ID0gcGFyZW50O1xuXHRcdHRoaXMuX2NoYW5nZXMgPSBjaGFuZ2VzOy8vIHRvZG86IFtkaXJ0eV0gbXV0YXRpb25cblx0fVxuXHRsb2FkKHVybDogSURhdGFQcm94eSwgZHJpdmVyPzogSURhdGFEcml2ZXIpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiB0aGlzLl9wYXJlbnQubG9hZERhdGEgPSB1cmwubG9hZCgpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdHRoaXMuX3BhcmVudC5yZW1vdmVBbGwoKTtcblx0XHRcdHRoaXMucGFyc2UoZGF0YSwgZHJpdmVyKTtcblx0XHR9KTtcblx0fVxuXHRwYXJzZShkYXRhOiBhbnlbXSwgZHJpdmVyOiBhbnkgPSBcImpzb25cIik6IHZvaWQge1xuXHRcdGRyaXZlciA9IHRvRGF0YURyaXZlcihkcml2ZXIpO1xuXHRcdGRhdGEgPSBkcml2ZXIudG9Kc29uQXJyYXkoZGF0YSk7XG5cdFx0dGhpcy5fcGFyZW50LiRwYXJzZShkYXRhKTtcblx0fVxuXG5cdHNhdmUodXJsOiBJRGF0YVByb3h5KSB7XG5cdFx0Zm9yIChjb25zdCBlbCBvZiB0aGlzLl9jaGFuZ2VzLm9yZGVyKSB7XG5cdFx0XHRpZiAoZWwuc2F2aW5nIHx8IGVsLnBlbmRpbmcpIHtcblx0XHRcdFx0ZGh4V2FybmluZyhcIml0ZW0gaXMgc2F2aW5nXCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcHJldkVsID0gdGhpcy5fZmluZFByZXZTdGF0ZShlbC5pZCk7XG5cblx0XHRcdFx0aWYgKHByZXZFbCAmJiBwcmV2RWwuc2F2aW5nKSB7XG5cdFx0XHRcdFx0Y29uc3QgcGVuZGluZyA9IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuXHRcdFx0XHRcdFx0cHJldkVsLnByb21pc2UudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdGVsLnBlbmRpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0cmVzKHRoaXMuX3NldFByb21pc2UoZWwsIHVybCkpO1xuXHRcdFx0XHRcdFx0fSkuY2F0Y2goZXJyID0+IHtcblx0XHRcdFx0XHRcdFx0dGhpcy5fcmVtb3ZlRnJvbU9yZGVyKHByZXZFbCk7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3NldFByb21pc2UoZWwsIHVybCk7XG5cdFx0XHRcdFx0XHRcdGRoeFdhcm5pbmcoZXJyKTtcblx0XHRcdFx0XHRcdFx0cmVqKGVycik7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR0aGlzLl9hZGRUb0NoYWluKHBlbmRpbmcpO1xuXHRcdFx0XHRcdGVsLnBlbmRpbmcgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3NldFByb21pc2UoZWwsIHVybCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5fcGFyZW50LnNhdmVEYXRhLnRoZW4oKCkgPT4ge1xuXHRcdFx0dGhpcy5fc2F2aW5nID0gZmFsc2U7XG5cdFx0fSk7XG5cdH1cblx0cHJpdmF0ZSBfc2V0UHJvbWlzZShlbCwgdXJsKTogUHJvbWlzZTxhbnk+IHtcblx0XHRlbC5wcm9taXNlID0gdXJsLnNhdmUoZWwub2JqLCBlbC5zdGF0dXMpO1xuXHRcdGVsLnByb21pc2UudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLl9yZW1vdmVGcm9tT3JkZXIoZWwpO1xuXHRcdH0pLmNhdGNoKGVyciA9PiB7XG5cdFx0XHRlbC5zYXZpbmcgPSBmYWxzZTtcblx0XHRcdGVsLmVycm9yID0gdHJ1ZTtcblx0XHRcdGRoeEVycm9yKGVycik7XG5cdFx0fSk7XG5cdFx0ZWwuc2F2aW5nID0gdHJ1ZTtcblx0XHR0aGlzLl9zYXZpbmcgPSB0cnVlO1xuXHRcdHRoaXMuX2FkZFRvQ2hhaW4oZWwucHJvbWlzZSk7XG5cdFx0cmV0dXJuIGVsLnByb21pc2U7XG5cdH1cblx0cHJpdmF0ZSBfYWRkVG9DaGFpbihwcm9taXNlKTogdm9pZCB7XG5cdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOnByZWZlci1jb25kaXRpb25hbC1leHByZXNzaW9uXG5cdFx0aWYgKHRoaXMuX3BhcmVudC5zYXZlRGF0YSAmJiB0aGlzLl9zYXZpbmcpIHtcblx0XHRcdHRoaXMuX3BhcmVudC5zYXZlRGF0YSA9IHRoaXMuX3BhcmVudC5zYXZlRGF0YS50aGVuKCgpID0+IHByb21pc2UpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQuc2F2ZURhdGEgPSBwcm9taXNlO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF9maW5kUHJldlN0YXRlKGlkOiBJZCk6IGFueSB7XG5cdFx0Zm9yIChjb25zdCBlbCBvZiB0aGlzLl9jaGFuZ2VzLm9yZGVyKSB7XG5cdFx0XHRpZiAoZWwuaWQgPT09IGlkKSB7XG5cdFx0XHRcdHJldHVybiBlbDtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0cHJpdmF0ZSBfcmVtb3ZlRnJvbU9yZGVyKGVsKSB7XG5cdFx0dGhpcy5fY2hhbmdlcy5vcmRlciA9IHRoaXMuX2NoYW5nZXMub3JkZXIuZmlsdGVyKGl0ZW0gPT4gIWlzRXF1YWxPYmooaXRlbSwgZWwpKTtcblx0fVxufSIsImltcG9ydCB7IG5hdHVyYWxDb21wYXJlIH0gZnJvbSBcIi4vLi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgSURpciwgSVNvcnRNb2RlIH0gZnJvbSBcIi4vLi4vdHlwZXNcIjtcblxudHlwZSBDaGFuZ2VTdHJpbmcgPSAoYTogc3RyaW5nKSA9PiBzdHJpbmcgfCBudW1iZXI7XG5cbmV4cG9ydCBjbGFzcyBTb3J0IHtcblx0c29ydChhcnJheTogYW55W10sIGJ5OiBJU29ydE1vZGUpIHtcblx0XHRpZiAoYnkucnVsZSAmJiB0eXBlb2YgYnkucnVsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHR0aGlzLl9zb3J0KGFycmF5LCBieSk7XG5cdFx0fSBlbHNlIGlmIChieS5ieSkge1xuXHRcdFx0YnkucnVsZSA9IChhOiBhbnksIGI6IGFueSkgPT4ge1xuXHRcdFx0XHRjb25zdCBhYSA9IHRoaXMuX2NoZWNrVmFsKGJ5LmFzLCBhW2J5LmJ5XSk7XG5cdFx0XHRcdGNvbnN0IGJiID0gdGhpcy5fY2hlY2tWYWwoYnkuYXMsIGJbYnkuYnldKTtcblx0XHRcdFx0cmV0dXJuIG5hdHVyYWxDb21wYXJlKGFhLnRvU3RyaW5nKCksIGJiLnRvU3RyaW5nKCkpOyAgLy8gZGlkbnQgd29yayB3aXRoIG51bWJlcnNcblx0XHRcdH07XG5cdFx0XHR0aGlzLl9zb3J0KGFycmF5LCBieSk7XG5cdFx0fVxuXG5cdH1cblx0cHJpdmF0ZSBfY2hlY2tWYWwobWV0aG9kOiBDaGFuZ2VTdHJpbmcsIHZhbDogc3RyaW5nIHwgbnVtYmVyKSB7XG5cdFx0cmV0dXJuIG1ldGhvZCA/IG1ldGhvZC5jYWxsKHRoaXMsIHZhbCkgOiB2YWw7XG5cdH1cblx0cHJpdmF0ZSBfc29ydChhcnI6IGFueVtdLCBjb25mOiBJU29ydE1vZGUpOiBhbnlbXSB7XG5cdFx0Y29uc3QgZGlyOiBJRGlyID0ge1xuXHRcdFx0YXNjOiAxLFxuXHRcdFx0ZGVzYzogLTFcblx0XHR9O1xuXHRcdHJldHVybiBhcnIuc29ydCgoYTogYW55LCBiOiBhbnkpID0+IHtcblx0XHRcdHJldHVybiBjb25mLnJ1bGUuY2FsbCh0aGlzLCBhLCBiKSAqIChkaXJbY29uZi5kaXJdIHx8IGRpci5hc2MpO1xuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IHsgSURhdGFQcm94eSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRhUHJveHkgaW1wbGVtZW50cyBJRGF0YVByb3h5IHtcblx0cHVibGljIHVybDogc3RyaW5nO1xuXHRjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuXHRcdHRoaXMudXJsID0gdXJsO1xuXHR9XG5cdGxvYWQ8VD1zdHJpbmc+KCk6IFByb21pc2U8VD4ge1xuXHRcdHJldHVybiB0aGlzLl9hamF4KHRoaXMudXJsKTtcblx0fVxuXHRzYXZlKGRhdGE6IGFueSwgbW9kZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcblx0XHRjb25zdCBtb2RlcyA9IHtcblx0XHRcdGluc2VydDogXCJQT1NUXCIsXG5cdFx0XHRkZWxldGU6IFwiREVMRVRFXCIsXG5cdFx0XHR1cGRhdGU6IFwiUE9TVFwiXG5cdFx0fSBhcyBhbnk7XG5cdFx0cmV0dXJuIHRoaXMuX2FqYXgodGhpcy51cmwsIGRhdGEsIG1vZGVzW21vZGVdIHx8IFwiUE9TVFwiKTtcblx0fVxuXHRwcml2YXRlIF9hamF4KHVybDogc3RyaW5nLCBkYXRhPzogYW55LCBtZXRob2Q6IHN0cmluZyA9IFwiR0VUXCIpOiBQcm9taXNlPGFueT4ge1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHRjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuXHRcdFx0eGhyLm9ubG9hZCA9ICgpID0+IHtcblx0XHRcdFx0aWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCAzMDApIHtcblx0XHRcdFx0XHRyZXNvbHZlKHhoci5yZXNwb25zZSB8fCB4aHIucmVzcG9uc2VUZXh0KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZWplY3Qoe1xuXHRcdFx0XHRcdFx0c3RhdHVzOiB4aHIuc3RhdHVzLFxuXHRcdFx0XHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHRcdHhoci5vbmVycm9yID0gKCkgPT4ge1xuXHRcdFx0XHRyZWplY3Qoe1xuXHRcdFx0XHRcdHN0YXR1czogeGhyLnN0YXR1cyxcblx0XHRcdFx0XHRzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dFxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0XHR4aHIub3BlbihtZXRob2QsIHVybCk7XG5cdFx0XHR4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG5cdFx0XHRzd2l0Y2ggKG1ldGhvZCkge1xuXHRcdFx0XHRjYXNlIFwiUE9TVFwiOlxuXHRcdFx0XHRjYXNlIFwiREVMRVRFXCI6XG5cdFx0XHRcdGNhc2UgXCJQVVRcIjpcblx0XHRcdFx0XHR4aHIuc2VuZChKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJHRVRcIjpcblx0XHRcdFx0XHR4aHIuc2VuZCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdHhoci5zZW5kKCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn0iLCJpbXBvcnQgeyBJRGF0YURyaXZlciB9IGZyb20gXCIuLy4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5leHBvcnQgaW50ZXJmYWNlIElDc3ZEcml2ZXJDb25maWcge1xuXHRza2lwSGVhZGVyPzogbnVtYmVyO1xuXHRuYW1lQnlIZWFkZXI/OiBib29sZWFuO1xuXHRuYW1lcz86IHN0cmluZ1tdO1xuXHRyb3c/OiBzdHJpbmc7XG5cdGNvbHVtbj86IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUNzdkRyaXZlciBleHRlbmRzIElEYXRhRHJpdmVyIHtcblx0Z2V0RmllbGRzKGRhdGE6IHN0cmluZywgaGVhZGVycz86IHN0cmluZ1tdKTtcbn1cbmV4cG9ydCBjbGFzcyBDc3ZEcml2ZXIgaW1wbGVtZW50cyBJQ3N2RHJpdmVyIHtcblx0cHVibGljIGNvbmZpZzogSUNzdkRyaXZlckNvbmZpZztcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc6IElDc3ZEcml2ZXJDb25maWcgPSB7fSkge1xuXG5cdFx0Y29uc3QgaW5pdENvbmZpZyA9IHtcblx0XHRcdHNraXBIZWFkZXI6IDAsXG5cdFx0XHRuYW1lQnlIZWFkZXI6IGZhbHNlLFxuXHRcdFx0cm93OiBcIlxcblwiLFxuXHRcdFx0Y29sdW1uOiBcIixcIixcblx0XHR9O1xuXG5cdFx0dGhpcy5jb25maWcgPSB7IC4uLmluaXRDb25maWcsIC4uLmNvbmZpZyB9O1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLm5hbWVCeUhlYWRlcikge1xuXHRcdFx0dGhpcy5jb25maWcuc2tpcEhlYWRlciA9IDE7XG5cdFx0fVxuXHR9XG5cblx0Z2V0RmllbGRzKHJvdzogc3RyaW5nLCBoZWFkZXJzPzogc3RyaW5nW10pOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcblx0XHRjb25zdCBwYXJ0cyA9IHJvdy50cmltKCkuc3BsaXQodGhpcy5jb25maWcuY29sdW1uKTtcblxuXHRcdGNvbnN0IG9iaiA9IHt9O1xuXHRcdGZvciAobGV0IGkgPSAwO2kgPCBwYXJ0cy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRvYmpbaGVhZGVycyA/IGhlYWRlcnNbaV0gOiBpICsgMV0gPSBwYXJ0c1tpXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cdGdldFJvd3MoZGF0YTogc3RyaW5nKTogc3RyaW5nW10ge1xuXHRcdHJldHVybiBkYXRhLnRyaW0oKS5zcGxpdCh0aGlzLmNvbmZpZy5yb3cpO1xuXHR9XG5cdHRvSnNvbkFycmF5KGRhdGE6IHN0cmluZyk6IGFueVtdIHtcblx0XHRjb25zdCByb3dzID0gdGhpcy5nZXRSb3dzKGRhdGEpO1xuXHRcdGxldCBuYW1lcyA9IHRoaXMuY29uZmlnLm5hbWVzO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLnNraXBIZWFkZXIpIHtcblx0XHRcdGNvbnN0IHRvcCA9IHJvd3Muc3BsaWNlKDAsIHRoaXMuY29uZmlnLnNraXBIZWFkZXIpO1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLm5hbWVCeUhlYWRlcikge1xuXHRcdFx0XHRuYW1lcyA9IHRvcFswXS50cmltKCkuc3BsaXQodGhpcy5jb25maWcuY29sdW1uKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJvd3MubWFwKHJvdyA9PiB0aGlzLmdldEZpZWxkcyhyb3csIG5hbWVzKSk7XG5cdH1cblx0c2VyaWFsaXplKGRhdGE6IElBbnlPYmpbXSk6IHN0cmluZyB7XG5cdFx0Y29uc3QgaGVhZGVyID0gZGF0YVswXSA/IE9iamVjdC5rZXlzKGRhdGFbMF0pLmZpbHRlcihrZXkgPT4ga2V5WzBdICE9PSBcIiRcIikuam9pbihcIixcIikgOiBcIlwiO1xuXHRcdHJldHVybiBoZWFkZXIgKyB0aGlzLl9zZXJpYWxpemUoZGF0YSk7XG5cdH1cblx0cHJpdmF0ZSBfc2VyaWFsaXplKGRhdGE6IElBbnlPYmpbXSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGRhdGEucmVkdWNlKChjc3YsIHJvdykgPT4ge1xuXHRcdFx0Y29uc3QgY2VsbHMgPSBPYmplY3Qua2V5cyhyb3cpLnJlZHVjZSgodG90YWwsIGtleSwgaSkgPT4ge1xuXHRcdFx0XHRpZiAoa2V5WzBdID09PSBcIiRcIiB8fCBrZXkgPT09IFwiaXRlbXNcIikge1xuXHRcdFx0XHRcdHJldHVybiB0b3RhbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gYCR7dG90YWx9JHtyb3dba2V5XX0ke2kgPT09IHJvdy5sZW5ndGggLSAxID8gXCJcIiA6IFwiLFwifWA7XG5cdFx0XHR9LCBcIlwiKTtcblx0XHRcdGlmIChyb3cuaXRlbXMpIHtcblx0XHRcdFx0cmV0dXJuIGAke2Nzdn1cXG4ke2NlbGxzfSR7dGhpcy5fc2VyaWFsaXplKHJvdy5pdGVtcyl9YDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBgJHtjc3Z9XFxuJHtjZWxsc31gO1xuXHRcdH0sIFwiXCIpO1xuXHR9XG59IiwiaW1wb3J0IHsgSURhdGFEcml2ZXIgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIEpzb25Ecml2ZXIgaW1wbGVtZW50cyBJRGF0YURyaXZlciB7XG5cdHRvSnNvbkFycmF5KGRhdGE6IGFueSkge1xuXHRcdHJldHVybiB0aGlzLmdldFJvd3MoZGF0YSk7XG5cdH1cblx0c2VyaWFsaXplKGRhdGE6IElBbnlPYmpbXSk6IElBbnlPYmpbXSB7XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cblx0Z2V0RmllbGRzKHJvdzogYW55KTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG5cdFx0cmV0dXJuIHJvdztcblx0fVxuXHRnZXRSb3dzKGRhdGE6IHN0cmluZyk6IGFueVtdIHtcblx0XHRyZXR1cm4gdHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgPyBKU09OLnBhcnNlKGRhdGEpIDogZGF0YTtcblx0fVxufSIsImltcG9ydCB7IElEYXRhRHJpdmVyIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBqc29uVG9YTUwgfSBmcm9tIFwiLi8uLi9zZXJpYWxpemVycy94bWxcIjtcblxuY29uc3QgQVJSQVlfTkFNRSA9IFwiaXRlbXNcIjtcbmNvbnN0IElURU1fTkFNRSA9IFwiaXRlbVwiO1xuXG5leHBvcnQgY2xhc3MgWE1MRHJpdmVyIGltcGxlbWVudHMgSURhdGFEcml2ZXIge1xuXHR0b0pzb25BcnJheShkYXRhOiBhbnkpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRSb3dzKGRhdGEpO1xuXHR9XG5cdHNlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pIHtcblx0XHRyZXR1cm4ganNvblRvWE1MKGRhdGEpO1xuXHR9XG5cdGdldEZpZWxkcyhyb3c6IGFueSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuXHRcdHJldHVybiByb3c7XG5cdH1cblx0Z2V0Um93cyhkYXRhOiBEb2N1bWVudCB8IHN0cmluZyk6IGFueVtdIHtcblx0XHRpZiAodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdGRhdGEgPSB0aGlzLl9mcm9tU3RyaW5nKGRhdGEpO1xuXHRcdH1cblx0XHRjb25zdCBjaGlsZE5vZGVzID0gZGF0YS5jaGlsZE5vZGVzICYmIGRhdGEuY2hpbGROb2Rlc1swXSAmJiBkYXRhLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlcztcblx0XHRpZiAoIWNoaWxkTm9kZXMgfHwgIWNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2dldFJvd3MoY2hpbGROb2Rlcyk7XG5cdH1cblxuXHRwcml2YXRlIF9nZXRSb3dzKG5vZGVzOiBOb2RlTGlzdE9mPENoaWxkTm9kZT4pOiBhbnlbXSB7XG5cdFx0Y29uc3QgcmVzdWx0ID0gW107XG5cdFx0Zm9yIChsZXQgaSA9IDA7aSA8IG5vZGVzLmxlbmd0aDtpKyspIHtcblx0XHRcdGlmICgobm9kZXNbaV0gYXMgSFRNTEVsZW1lbnQpLnRhZ05hbWUgPT09IElURU1fTkFNRSkge1xuXHRcdFx0XHRyZXN1bHQucHVzaCh0aGlzLl9ub2RlVG9KUyhub2Rlc1tpXSBhcyBIVE1MRWxlbWVudCkpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdHByaXZhdGUgX2Zyb21TdHJpbmcoZGF0YTogc3RyaW5nKTogRG9jdW1lbnQge1xuXHRcdHJldHVybiAobmV3IERPTVBhcnNlcigpKS5wYXJzZUZyb21TdHJpbmcoZGF0YSwgXCJ0ZXh0L3htbFwiKTtcblx0fVxuXG5cdHByaXZhdGUgX25vZGVUb0pTKG5vZGU6IEhUTUxFbGVtZW50KSB7XG5cdFx0Y29uc3QgcmVzdWx0OiBJQW55T2JqID0ge307XG5cblx0XHRpZiAodGhpcy5faGF2ZUF0dHJzKG5vZGUpKSB7XG5cdFx0XHRjb25zdCBhdHRycyA9IG5vZGUuYXR0cmlidXRlcztcblx0XHRcdGZvciAobGV0IGkgPSAwO2kgPCBhdHRycy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdGNvbnN0IHsgbmFtZSwgdmFsdWUgfSA9IGF0dHJzW2ldO1xuXHRcdFx0XHRyZXN1bHRbbmFtZV0gPSB0aGlzLl90b1R5cGUodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAobm9kZS5ub2RlVHlwZSA9PT0gMykge1xuXHRcdFx0cmVzdWx0LnZhbHVlID0gcmVzdWx0LnZhbHVlIHx8IHRoaXMuX3RvVHlwZShub2RlLnRleHRDb250ZW50KTtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXG5cdFx0Y29uc3QgY2hpbGROb2RlcyA9IG5vZGUuY2hpbGROb2Rlcztcblx0XHRpZiAoY2hpbGROb2Rlcykge1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7aSA8IGNoaWxkTm9kZXMubGVuZ3RoO2krKykge1xuXHRcdFx0XHRjb25zdCBzdWJOb2RlID0gY2hpbGROb2Rlc1tpXSBhcyBIVE1MRWxlbWVudDtcblx0XHRcdFx0Y29uc3QgdGFnID0gc3ViTm9kZS50YWdOYW1lO1xuXHRcdFx0XHRpZiAoIXRhZykge1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0YWcgPT09IEFSUkFZX05BTUUgJiYgc3ViTm9kZS5jaGlsZE5vZGVzKSB7XG5cdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSB0aGlzLl9nZXRSb3dzKHN1Yk5vZGUuY2hpbGROb2Rlcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuX2hhdmVBdHRycyhzdWJOb2RlKSkge1xuXHRcdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSB0aGlzLl9ub2RlVG9KUyhzdWJOb2RlKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmVzdWx0W3RhZ10gPSB0aGlzLl90b1R5cGUoc3ViTm9kZS50ZXh0Q29udGVudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF90b1R5cGUodmFsOiBhbnkpIHtcblx0XHRpZiAodmFsID09PSBcImZhbHNlXCIgfHwgdmFsID09PSBcInRydWVcIikge1xuXHRcdFx0cmV0dXJuIHZhbCA9PT0gXCJ0cnVlXCI7XG5cdFx0fVxuXHRcdGlmICghaXNOYU4odmFsKSkge1xuXHRcdFx0cmV0dXJuIE51bWJlcih2YWwpO1xuXHRcdH1cblxuXHRcdHJldHVybiB2YWw7XG5cdH1cblx0cHJpdmF0ZSBfaGF2ZUF0dHJzKG5vZGU6IEhUTUxFbGVtZW50KSB7XG5cdFx0cmV0dXJuIG5vZGUuYXR0cmlidXRlcyAmJiBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoO1xuXHR9XG59IiwiaW1wb3J0IHsgSnNvbkRyaXZlciB9IGZyb20gXCIuL0pzb25Ecml2ZXJcIjtcclxuaW1wb3J0IHsgQ3N2RHJpdmVyIH0gZnJvbSBcIi4vQ3N2RHJpdmVyXCI7XHJcbmltcG9ydCB7IFhNTERyaXZlciB9IGZyb20gXCIuL1hNTERyaXZlclwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRhdGFEcml2ZXJzID0ge1xyXG5cdGpzb246IEpzb25Ecml2ZXIsXHJcblx0Y3N2OiBDc3ZEcml2ZXJcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhRHJpdmVyc1BybyA9IHtcclxuXHQuLi5kYXRhRHJpdmVycyxcclxuXHR4bWw6IFhNTERyaXZlclxyXG59OyIsImltcG9ydCB7IERhdGFQcm94eSB9IGZyb20gXCIuL2RhdGFwcm94eVwiO1xuaW1wb3J0IHsgSUZpbHRlckNhbGxiYWNrLCBJRmlsdGVyTW9kZSwgSURhdGFDb2xsZWN0aW9uLCBJVHJlZUNvbGxlY3Rpb24sIERhdGFEcml2ZXIsIElEYXRhRHJpdmVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsgZGF0YURyaXZlcnMgfSBmcm9tIFwiLi9kcml2ZXJzL2RyaXZlcnNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWxPYmooYTogYW55LCBiOiBhbnkpIHtcblx0Zm9yIChjb25zdCBrZXkgaW4gYSkge1xuXHRcdGlmIChhW2tleV0gIT09IGJba2V5XSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBuYXR1cmFsQ29tcGFyZShhLCBiKSB7XG5cdGNvbnN0IGF4ID0gW107XG5cdGNvbnN0IGJ4ID0gW107XG5cblx0YS5yZXBsYWNlKC8oXFxkKyl8KFxcRCspL2csIChfLCAkMSwgJDIpID0+IHsgYXgucHVzaChbJDEgfHwgSW5maW5pdHksICQyIHx8IFwiXCJdKTsgfSk7XG5cdGIucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7IGJ4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCBcIlwiXSk7IH0pO1xuXG5cdHdoaWxlIChheC5sZW5ndGggJiYgYngubGVuZ3RoKSB7XG5cdFx0Y29uc3QgYW4gPSBheC5zaGlmdCgpO1xuXHRcdGNvbnN0IGJuID0gYnguc2hpZnQoKTtcblx0XHRjb25zdCBubiA9IChhblswXSAtIGJuWzBdKSB8fCBhblsxXS5sb2NhbGVDb21wYXJlKGJuWzFdKTtcblx0XHRpZiAobm4pIHtcblx0XHRcdHJldHVybiBubjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYXgubGVuZ3RoIC0gYngubGVuZ3RoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEJ5Q29uZihpdGVtOiBhbnksIGNvbmY6IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrKTogYW55IHtcblx0aWYgKHR5cGVvZiBjb25mID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRpZiAoY29uZi5jYWxsKHRoaXMsIGl0ZW0pKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdH0gZWxzZSBpZiAoY29uZi5ieSAmJiBjb25mLm1hdGNoKSB7XG5cdFx0aWYgKGl0ZW1bY29uZi5ieV0gPT09IGNvbmYubWF0Y2gpIHtcblx0XHRcdHJldHVybiBpdGVtO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWJ1ZygpOiBib29sZWFuIHtcblx0Y29uc3QgZGh4ID0gKHdpbmRvdyBhcyBhbnkpLmRoeDtcblx0aWYgKHR5cGVvZiBkaHggIT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRyZXR1cm4gdHlwZW9mIChkaHguZGVidWcpICE9PSBcInVuZGVmaW5lZFwiICYmIGRoeC5kZWJ1Zztcblx0fVxuXHQvLyByZXR1cm4gdHlwZW9mIERIWF9ERUJVR19NT0RFICE9PSBcInVuZGVmaW5lZFwiICYmIERIWF9ERUJVR19NT0RFO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRoeFdhcm5pbmcobXNnOiBzdHJpbmcpIHtcblx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcblx0Y29uc29sZS53YXJuKG1zZyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZGh4RXJyb3IobXNnOiBzdHJpbmcpIHtcblx0dGhyb3cgbmV3IEVycm9yKG1zZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1Byb3h5KHByb3h5OiBhbnkpOiBEYXRhUHJveHkge1xuXHRjb25zdCB0eXBlID0gdHlwZW9mIHByb3h5O1xuXG5cdGlmICh0eXBlID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIG5ldyBEYXRhUHJveHkocHJveHkpO1xuXHR9IGVsc2UgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIpIHtcblx0XHRyZXR1cm4gcHJveHk7XG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0b0RhdGFEcml2ZXIoZHJpdmVyOiBEYXRhRHJpdmVyIHwgSURhdGFEcml2ZXIpIHtcblx0aWYgKHR5cGVvZiBkcml2ZXIgPT09IFwic3RyaW5nXCIpIHtcblx0XHRjb25zdCBkaHggPSAod2luZG93IGFzIGFueSkuZGh4O1xuXHRcdGNvbnN0IGRyaXZlcnMgPSBkaHguZGF0YURyaXZlcnMgfHwgZGF0YURyaXZlcnM7XG5cblx0XHRpZiAoZHJpdmVyc1tkcml2ZXJdKSB7XG5cdFx0XHRyZXR1cm4gbmV3IGRyaXZlcnNbZHJpdmVyXSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS53YXJuKFwiSW5jb3JyZWN0IGRhdGEgZHJpdmVyIHR5cGU6XCIsIGRyaXZlcik7XG5cdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tY29uc29sZVxuXHRcdFx0Y29uc29sZS53YXJuKFwiQXZhaWxhYmxlIHR5cGVzOlwiLCBKU09OLnN0cmluZ2lmeShPYmplY3Qua2V5cyhkcml2ZXJzKSkpO1xuXHRcdH1cblx0fSBlbHNlIGlmICh0eXBlb2YgZHJpdmVyID09PSBcIm9iamVjdFwiKSB7XG5cdFx0cmV0dXJuIGRyaXZlcjtcblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weVdpdGhvdXRJbm5lcihvYmo6IElBbnlPYmosIGZvcmJpZGRlbj86IElBbnlPYmopOiBJQW55T2JqIHtcblx0Y29uc3QgcmVzdWx0ID0ge307XG5cdGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuXHRcdGlmIChrZXlbMF0gIT09IFwiJFwiICYmICghZm9yYmlkZGVuIHx8ICFmb3JiaWRkZW5ba2V5XSkpIHtcblx0XHRcdHJlc3VsdFtrZXldID0gb2JqW2tleV07XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RyZWVDb2xsZWN0aW9uKG9iajogSURhdGFDb2xsZWN0aW9uPGFueT4gfCBJVHJlZUNvbGxlY3Rpb248YW55Pik6IG9iaiBpcyBJVHJlZUNvbGxlY3Rpb248YW55PiB7XG5cdHJldHVybiBCb29sZWFuKChvYmogYXMgSVRyZWVDb2xsZWN0aW9uKS5nZXRSb290KTtcbn0iLCJpbXBvcnQgeyBFdmVudFN5c3RlbSwgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgU2VsZWN0aW9uRXZlbnRzIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiB9IGZyb20gXCIuL2RhdGFjb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBEYXRhRXZlbnRzIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIFNlbGVjdGlvbntcblx0cHVibGljIGV2ZW50cyA6IElFdmVudFN5c3RlbTxTZWxlY3Rpb25FdmVudHM+O1xuXG5cdHByaXZhdGUgX3NlbGVjdGVkIDogc3RyaW5nO1xuXHRwcml2YXRlIF9kYXRhOkRhdGFDb2xsZWN0aW9uO1xuXG5cdGNvbnN0cnVjdG9yKF9jb25maWc6YW55LCBkYXRhPzpEYXRhQ29sbGVjdGlvbiwgZXZlbnRzPzpJRXZlbnRTeXN0ZW08YW55Pil7XG5cdFx0dGhpcy5ldmVudHMgPSBldmVudHMgfHwgKG5ldyBFdmVudFN5c3RlbTxhbnk+KHRoaXMpKTtcblx0XHR0aGlzLl9kYXRhID0gZGF0YTtcblxuXHRcdHRoaXMuX2RhdGEuZXZlbnRzLm9uKERhdGFFdmVudHMucmVtb3ZlQWxsLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZCA9IG51bGw7XG5cdFx0fSk7XG5cdFx0dGhpcy5fZGF0YS5ldmVudHMub24oRGF0YUV2ZW50cy5jaGFuZ2UsICgpID0+IHtcblx0XHRcdGlmICh0aGlzLl9zZWxlY3RlZCl7XG5cdFx0XHRcdGNvbnN0IG5lYXIgPSB0aGlzLl9kYXRhLmdldE5lYXJJZCh0aGlzLl9zZWxlY3RlZCk7XG5cdFx0XHRcdGlmIChuZWFyICE9PSB0aGlzLl9zZWxlY3RlZCl7XG5cdFx0XHRcdFx0dGhpcy5fc2VsZWN0ZWQgPSBudWxsO1xuXHRcdFx0XHRcdGlmIChuZWFyKXtcblx0XHRcdFx0XHRcdHRoaXMuYWRkKG5lYXIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Z2V0SWQoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG5cdH1cblxuXHRnZXRJdGVtKCk6YW55IHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWQpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX2RhdGEuZ2V0SXRlbSh0aGlzLl9zZWxlY3RlZCk7XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cblx0cmVtb3ZlKGlkPzogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0aWQgPSBpZCB8fCB0aGlzLl9zZWxlY3RlZDtcblx0XHRpZiAoIWlkKXtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRpZiAodGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYmVmb3JlVW5TZWxlY3QsIFtpZF0pKSB7XG5cdFx0XHR0aGlzLl9kYXRhLnVwZGF0ZShpZCwgeyAkc2VsZWN0ZWQ6IGZhbHNlIH0pO1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWQgPSBudWxsO1xuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYWZ0ZXJVblNlbGVjdCwgW2lkXSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0YWRkKGlkOiBzdHJpbmcpIHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWQgPT09IGlkKSB7IHJldHVybjsgfVxuXHRcdHRoaXMucmVtb3ZlKCk7XG5cblx0XHRpZiAodGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYmVmb3JlU2VsZWN0LCBbaWRdKSkge1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWQgPSBpZDtcblx0XHRcdHRoaXMuX2RhdGEudXBkYXRlKGlkLCB7ICRzZWxlY3RlZDogdHJ1ZSB9KTtcblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmFmdGVyU2VsZWN0LCBbaWRdKTtcblx0XHR9XG5cdH1cbn1cblxuIiwiaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuXG5jb25zdCBJTkRFTlRfU1RFUCA9IDQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBqc29uVG9YTUwoZGF0YTogSUFueU9ialtdLCByb290ID0gXCJyb290XCIpOiBzdHJpbmcge1xuXHRsZXQgcmVzdWx0ID0gYDw/eG1sIHZlcnNpb249XCIxLjBcIiBlbmNvZGluZz1cImlzby04ODU5LTFcIj8+XFxuPCR7cm9vdH0+YDtcblx0Zm9yIChsZXQgaT0wOyBpPGRhdGEubGVuZ3RoOyBpKyspIHtcblx0XHRyZXN1bHQgKz0gXCJcXG5cIiArIGl0ZW1Ub1hNTChkYXRhW2ldKTtcblx0fVxuXHRyZXR1cm4gcmVzdWx0ICsgYFxcbjwvJHtyb290fT5gO1xufVxuXG5mdW5jdGlvbiB3cyhjb3VudDogbnVtYmVyKSB7XG5cdHJldHVybiBcIiBcIi5yZXBlYXQoY291bnQpO1xufVxuZnVuY3Rpb24gaXRlbVRvWE1MKGl0ZW06IElBbnlPYmosIGluZGVudDogbnVtYmVyID0gSU5ERU5UX1NURVApIHtcblx0bGV0IHJlc3VsdCA9IHdzKGluZGVudCkgKyBcIjxpdGVtPlxcblwiO1xuXHRmb3IgKGNvbnN0IGtleSBpbiBpdGVtKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkoaXRlbVtrZXldKSkge1xuXHRcdFx0cmVzdWx0ICs9IHdzKGluZGVudCArIElOREVOVF9TVEVQKSArIGA8JHtrZXl9PlxcbmA7XG5cdFx0XHRyZXN1bHQgKz0gaXRlbVtrZXldLm1hcCgoc3ViSXRlbTogSUFueU9iaikgPT4gaXRlbVRvWE1MKHN1Ykl0ZW0sIGluZGVudCArIElOREVOVF9TVEVQICogMikpLmpvaW4oXCJcXG5cIikgKyBcIlxcblwiO1xuXHRcdFx0cmVzdWx0ICs9IHdzKGluZGVudCArIElOREVOVF9TVEVQKSArIGA8LyR7a2V5fT5cXG5gO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgKz0gd3MoaW5kZW50ICsgSU5ERU5UX1NURVApICsgYDwke2tleX0+JHtpdGVtW2tleV19PC8ke2tleX0+XFxuYDtcblx0XHR9XG5cdH1cblx0cmVzdWx0ICs9IHdzKGluZGVudCkgKyBcIjwvaXRlbT5cIjtcblx0cmV0dXJuIHJlc3VsdDtcbn1cbiIsImltcG9ydCB7IGZpbmRJbmRleCwgdWlkIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2NvcmVcIjtcbmltcG9ydCB7IElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IERhdGFDb2xsZWN0aW9uIH0gZnJvbSBcIi4vZGF0YWNvbGxlY3Rpb25cIjtcbmltcG9ydCB7IERhdGFQcm94eSB9IGZyb20gXCIuL2RhdGFwcm94eVwiO1xuaW1wb3J0IHsgdG9EYXRhRHJpdmVyLCBpc1RyZWVDb2xsZWN0aW9uLCBjb3B5V2l0aG91dElubmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgRGF0YUNhbGxiYWNrLCBEYXRhRXZlbnRzLCBJZCwgSURhdGFDb2xsZWN0aW9uLCBJRGF0YUl0ZW0sIElUcmVlQ29sbGVjdGlvbiwgVHJlZUZpbHRlclR5cGUsIElGaWx0ZXJDYWxsYmFjaywgSUZpbHRlck1vZGUsIElUcmVlRmlsdGVyQ29uZmlnLCBEYXRhRHJpdmVyIH0gZnJvbSBcIi4vdHlwZXNcIjtcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcblxuZnVuY3Rpb24gYWRkVG9PcmRlcihzdG9yZTogYW55LCBvYmo6IG9iamVjdCwgcGFyZW50OiBJZCwgaW5kZXg6IG51bWJlcikge1xuXHRpZiAoaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpbmRleCAhPT0gLTEgJiYgc3RvcmVbcGFyZW50XSAmJiBzdG9yZVtwYXJlbnRdW2luZGV4XSkge1xuXHRcdHN0b3JlW3BhcmVudF0uc3BsaWNlKGluZGV4LCAwLCBvYmopO1xuXHR9IGVsc2Uge1xuXHRcdGlmICghc3RvcmVbcGFyZW50XSkge1xuXHRcdFx0c3RvcmVbcGFyZW50XSA9IFtdO1xuXHRcdH1cblx0XHRzdG9yZVtwYXJlbnRdLnB1c2gob2JqKTtcblx0fVxufVxuXG5cbmV4cG9ydCBjbGFzcyBUcmVlQ29sbGVjdGlvbjxUIGV4dGVuZHMgSURhdGFJdGVtID0gSURhdGFJdGVtPiBleHRlbmRzIERhdGFDb2xsZWN0aW9uPFQ+IGltcGxlbWVudHMgSVRyZWVDb2xsZWN0aW9uPFQ+IHtcblxuXHRwcm90ZWN0ZWQgX2NoaWxkczogeyBbaWQ6IHN0cmluZ106IFRbXSB9O1xuXHRwcm90ZWN0ZWQgX3Jvb3Q6IElkO1xuXG5cdHByaXZhdGUgX2luaXRDaGlsZHM6IHsgW2lkOiBzdHJpbmddOiBUW10gfTtcblxuXHRjb25zdHJ1Y3Rvcihjb25maWc/OiBhbnksIGV2ZW50cz86IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzPikge1xuXHRcdHN1cGVyKGNvbmZpZywgZXZlbnRzKTtcblx0XHRjb25zdCByb290ID0gdGhpcy5fcm9vdCA9IFwiX1JPT1RfXCIgKyB1aWQoKTtcblx0XHR0aGlzLl9jaGlsZHMgPSB7IFtyb290XTogW10gfTtcblx0XHR0aGlzLl9pbml0Q2hpbGRzID0gbnVsbDtcblx0fVxuXHRhZGQob2JqOiBhbnksIGluZGV4OiBudW1iZXIgPSAtMSwgcGFyZW50OiBJZCA9IHRoaXMuX3Jvb3QpOiBzdHJpbmcge1xuXHRcdGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRvYmogPSB7XG5cdFx0XHRcdHZhbHVlOiBvYmpcblx0XHRcdH07XG5cdFx0fVxuXHRcdG9iai5wYXJlbnQgPSBvYmoucGFyZW50ID8gb2JqLnBhcmVudC50b1N0cmluZygpIDogcGFyZW50O1xuXHRcdGNvbnN0IGlkID0gc3VwZXIuYWRkKG9iaiwgaW5kZXgpO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkob2JqLml0ZW1zKSkge1xuXHRcdFx0Zm9yIChjb25zdCBpdGVtIG9mIG9iai5pdGVtcykge1xuXHRcdFx0XHR0aGlzLmFkZChpdGVtLCAtMSwgb2JqLmlkKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdGdldFJvb3QoKTogSWQge1xuXHRcdHJldHVybiB0aGlzLl9yb290O1xuXHR9XG5cdGdldFBhcmVudChpZDogSWQsIGFzT2JqOiBib29sZWFuID0gZmFsc2UpOiBJZCB7XG5cdFx0aWYgKCF0aGlzLl9wdWxsW2lkXSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuX3B1bGxbaWRdLnBhcmVudDtcblx0XHRyZXR1cm4gYXNPYmogPyB0aGlzLl9wdWxsW3BhcmVudF0gOiBwYXJlbnQ7XG5cdH1cblx0Z2V0SXRlbXMoaWQ6IElkKTogVFtdIHtcblx0XHRpZiAodGhpcy5fY2hpbGRzICYmIHRoaXMuX2NoaWxkc1tpZF0pIHtcblx0XHRcdHJldHVybiB0aGlzLl9jaGlsZHNbaWRdO1xuXHRcdH1cblx0XHRyZXR1cm4gW107XG5cdH1cblx0Z2V0TGVuZ3RoKGlkOiBJZCA9IHRoaXMuX3Jvb3QpOiBudW1iZXIge1xuXHRcdGlmICghdGhpcy5fY2hpbGRzW2lkXSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9jaGlsZHNbaWRdLmxlbmd0aDtcblx0fVxuXHRyZW1vdmVBbGwoaWQ/OiBJZCk6IHZvaWQge1xuXHRcdGlmIChpZCkge1xuXHRcdFx0Y29uc3QgY2hpbGRzID0gWy4uLiB0aGlzLl9jaGlsZHNbaWRdXTtcblx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRzKSB7XG5cdFx0XHRcdHRoaXMucmVtb3ZlKGNoaWxkLmlkKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0c3VwZXIucmVtb3ZlQWxsKCk7XG5cdFx0XHRjb25zdCByb290ID0gdGhpcy5fcm9vdDtcblx0XHRcdHRoaXMuX2luaXRDaGlsZHMgPSBudWxsO1xuXHRcdFx0dGhpcy5fY2hpbGRzID0geyBbcm9vdF06IFtdIH07XG5cdFx0fVxuXHR9XG5cdGdldEluZGV4KGlkOiBJZCk6IG51bWJlciB7XG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoaWQpO1xuXHRcdGlmICghcGFyZW50IHx8ICF0aGlzLl9jaGlsZHNbcGFyZW50XSkge1xuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH1cblx0XHRyZXR1cm4gZmluZEluZGV4KHRoaXMuX2NoaWxkc1twYXJlbnRdLCBpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcblx0fVxuXHRzb3J0KGNvbmY/OiBhbnkpOiB2b2lkIHtcblx0XHRjb25zdCBjaGlsZHMgPSB0aGlzLl9jaGlsZHM7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gY2hpbGRzKSB7XG5cdFx0XHR0aGlzLl9zb3J0LnNvcnQoY2hpbGRzW2tleV0sIGNvbmYpO1xuXHRcdH1cblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHR9XG5cdG1hcChjYjogRGF0YUNhbGxiYWNrPFQ+LCBwYXJlbnQ6IElkID0gdGhpcy5fcm9vdCwgZGlyZWN0OiBib29sZWFuID0gdHJ1ZSk6IGFueVtdIHtcblx0XHRsZXQgcmVzdWx0OiBhbnlbXSA9IFtdO1xuXHRcdGlmICghdGhpcy5oYXZlSXRlbXMocGFyZW50KSkge1xuXHRcdFx0cmV0dXJuIHJlc3VsdDtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaSA9IDA7aSA8IHRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aDtpKyspIHtcblx0XHRcdHJlc3VsdC5wdXNoKGNiLmNhbGwodGhpcywgdGhpcy5fY2hpbGRzW3BhcmVudF1baV0sIGkpKTtcblx0XHRcdGlmIChkaXJlY3QpIHtcblx0XHRcdFx0Y29uc3QgY2hpbGRSZXN1bHQgPSB0aGlzLm1hcChjYiwgdGhpcy5fY2hpbGRzW3BhcmVudF1baV0uaWQsIGRpcmVjdCk7XG5cdFx0XHRcdHJlc3VsdCA9IHJlc3VsdC5jb25jYXQoY2hpbGRSZXN1bHQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0O1xuXHR9XG5cdGZpbHRlcihydWxlPzogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZzogSVRyZWVGaWx0ZXJDb25maWcgPSB7fSk6IHZvaWQge1xuXHRcdGlmICghcnVsZSkge1xuXHRcdFx0dGhpcy5yZXN0b3JlT3JkZXIoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuX2luaXRDaGlsZHMpIHtcblx0XHRcdHRoaXMuX2luaXRDaGlsZHMgPSB0aGlzLl9jaGlsZHM7XG5cdFx0fVxuXHRcdGNvbmZpZy50eXBlID0gY29uZmlnLnR5cGUgfHwgVHJlZUZpbHRlclR5cGUubGVhZnM7XG5cblx0XHRjb25zdCBuZXdDaGlsZHMgPSB7fTtcblx0XHR0aGlzLl9yZWN1cnNpdmVGaWx0ZXIocnVsZSwgY29uZmlnLCB0aGlzLl9yb290LCAwLCBuZXdDaGlsZHMpO1xuXHRcdHRoaXMuX2NoaWxkcyA9IG5ld0NoaWxkcztcblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHR9XG5cdHJlc3RvcmVPcmRlcigpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5faW5pdENoaWxkcykge1xuXHRcdFx0dGhpcy5fY2hpbGRzID0gdGhpcy5faW5pdENoaWxkcztcblx0XHRcdHRoaXMuX2luaXRDaGlsZHMgPSBudWxsO1xuXHRcdH1cblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHR9XG5cdGNvcHkoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ6IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiA9IHRoaXMsIHRhcmdldElkOiBJZCA9IHRoaXMuX3Jvb3QpOiBJZCB7XG5cdFx0aWYgKCF0aGlzLmV4aXN0cyhpZCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblxuXHRcdGNvbnN0IGN1cnJlbnRDaGlsZHMgPSB0aGlzLl9jaGlsZHNbaWRdO1xuXHRcdGlmICh0YXJnZXQgPT09IHRoaXMgJiYgIXRoaXMuY2FuQ29weShpZCwgdGFyZ2V0SWQpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgaXRlbUNvcHkgPSBjb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCksIHsgaXRlbXM6IHRydWUgfSk7XG5cdFx0aWYgKHRhcmdldC5leGlzdHMoaWQpKSB7XG5cdFx0XHRpdGVtQ29weS5pZCA9IHVpZCgpO1xuXHRcdH1cblx0XHRpZiAoIWlzVHJlZUNvbGxlY3Rpb24odGFyZ2V0KSkge1xuXHRcdFx0dGFyZ2V0LmFkZChpdGVtQ29weSwgaW5kZXgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmV4aXN0cyhpZCkpIHtcblx0XHRcdGl0ZW1Db3B5LnBhcmVudCA9IHRhcmdldElkO1xuXHRcdFx0dGFyZ2V0LmFkZChpdGVtQ29weSwgaW5kZXgpO1xuXHRcdFx0aWQgPSBpdGVtQ29weS5pZDtcblx0XHR9XG5cdFx0aWYgKGN1cnJlbnRDaGlsZHMpIHtcblx0XHRcdGZvciAoY29uc3QgY2hpbGQgb2YgY3VycmVudENoaWxkcykge1xuXHRcdFx0XHRjb25zdCBjaGlsZElkID0gY2hpbGQuaWQ7XG5cdFx0XHRcdGNvbnN0IGNoaWxkSW5kZXggPSB0aGlzLmdldEluZGV4KGNoaWxkSWQpO1xuXHRcdFx0XHR0aGlzLmNvcHkoY2hpbGRJZCwgY2hpbGRJbmRleCwgdGFyZ2V0LCBpZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpZDtcblx0fVxuXHRtb3ZlKGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0OiBJVHJlZUNvbGxlY3Rpb24gfCBJRGF0YUNvbGxlY3Rpb24gPSB0aGlzLCB0YXJnZXRJZDogSWQgPSB0aGlzLl9yb290KTogSWQge1xuXHRcdGlmICghdGhpcy5leGlzdHMoaWQpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRpZiAodGFyZ2V0ICE9PSB0aGlzKSB7XG5cdFx0XHRpZiAoIWlzVHJlZUNvbGxlY3Rpb24odGFyZ2V0KSkgeyAvLyBtb3ZlIHRvIGRhdGFjb2xsZWN0aW9uXG5cdFx0XHRcdHRhcmdldC5hZGQoY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpKSwgaW5kZXgpO1xuXHRcdFx0XHR0aGlzLnJlbW92ZShpZCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHJldHVybklkID0gdGhpcy5jb3B5KGlkLCBpbmRleCwgdGFyZ2V0LCB0YXJnZXRJZCk7XG5cdFx0XHR0aGlzLnJlbW92ZShpZCk7XG5cdFx0XHRyZXR1cm4gcmV0dXJuSWQ7XG5cdFx0fVxuXHRcdC8vIG1vdmUgaW5zaWRlXG5cdFx0aWYgKCF0aGlzLmNhbkNvcHkoaWQsIHRhcmdldElkKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KGlkKTtcblx0XHRjb25zdCBwYXJlbnRJbmRleCA9IHRoaXMuZ2V0SW5kZXgoaWQpO1xuXG5cdFx0Ly8gZ2V0IGl0ZW0gZnJvbSBwYXJlbnQgYXJyYXkgYW5kIG1vdmUgdG8gdGFyZ2V0IGFycmF5XG5cdFx0Y29uc3Qgc3BsaWNlZCA9IHRoaXMuX2NoaWxkc1twYXJlbnRdLnNwbGljZShwYXJlbnRJbmRleCwgMSlbMF07XG5cdFx0KHNwbGljZWQgYXMgSURhdGFJdGVtKS5wYXJlbnQgPSB0YXJnZXRJZDsgLy8gbmVlZCBmb3IgbmV4dCBtb3ZpbmcsIC4uLiBub3QgYmVzdCBzb2x1dGlvbiwgbWF5IGJlIGZ1bGwgbWV0aG9kIGZvciBnZXQgaXRlbVxuXG5cdFx0aWYgKCF0aGlzLl9jaGlsZHNbcGFyZW50XS5sZW5ndGgpIHtcblx0XHRcdGRlbGV0ZSB0aGlzLl9jaGlsZHNbcGFyZW50XTtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmhhdmVJdGVtcyh0YXJnZXRJZCkpIHtcblx0XHRcdHRoaXMuX2NoaWxkc1t0YXJnZXRJZF0gPSBbXTtcblx0XHR9XG5cdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0aW5kZXggPSB0aGlzLl9jaGlsZHNbdGFyZ2V0SWRdLnB1c2goc3BsaWNlZCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuX2NoaWxkc1t0YXJnZXRJZF0uc3BsaWNlKGluZGV4LCAwLCBzcGxpY2VkKTtcblx0XHR9XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0ZWFjaENoaWxkKGlkOiBJZCwgY2I6IERhdGFDYWxsYmFjazxUPiwgZGlyZWN0OiBib29sZWFuID0gdHJ1ZSwgY2hlY2tJdGVtOiAoaXRlbTogSURhdGFJdGVtKSA9PiBib29sZWFuID0gKCkgPT4gdHJ1ZSk6IHZvaWQge1xuXHRcdGlmICghdGhpcy5oYXZlSXRlbXMoaWQpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwO2kgPCB0aGlzLl9jaGlsZHNbaWRdLmxlbmd0aDtpKyspIHtcblx0XHRcdGNiLmNhbGwodGhpcywgdGhpcy5fY2hpbGRzW2lkXVtpXSwgaSk7XG5cdFx0XHRpZiAoZGlyZWN0ICYmIGNoZWNrSXRlbSh0aGlzLl9jaGlsZHNbaWRdW2ldKSkge1xuXHRcdFx0XHR0aGlzLmVhY2hDaGlsZCh0aGlzLl9jaGlsZHNbaWRdW2ldLmlkLCBjYiwgZGlyZWN0LCBjaGVja0l0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRnZXROZWFySWQoaWQ6IElkKTogSWQge1xuXHRcdHJldHVybiBpZDsgLy8gZm9yIHNlbGVjdGlvblxuXHR9XG5cdGxvYWRJdGVtcyhpZDogSWQsIGRyaXZlcjogYW55ID0gXCJqc29uXCIpOiB2b2lkIHtcblx0XHRjb25zdCB1cmwgPSB0aGlzLmNvbmZpZy5hdXRvbG9hZCArIFwiP2lkPVwiICsgaWQ7XG5cdFx0Y29uc3QgcHJveHkgPSBuZXcgRGF0YVByb3h5KHVybCk7XG5cdFx0cHJveHkubG9hZCgpLnRoZW4oKGRhdGEpID0+IHtcblx0XHRcdGRyaXZlciA9IHRvRGF0YURyaXZlcihkcml2ZXIpO1xuXHRcdFx0ZGF0YSA9IGRyaXZlci50b0pzb25BcnJheShkYXRhKTtcblx0XHRcdHRoaXMuX3BhcnNlX2RhdGEoZGF0YSwgaWQpO1xuXG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0XHR9KTtcblx0fVxuXHRyZWZyZXNoSXRlbXMoaWQ6IElkLCBkcml2ZXI6IGFueSA9IFwianNvblwiKTogdm9pZCB7XG5cdFx0dGhpcy5yZW1vdmVBbGwoaWQpO1xuXHRcdHRoaXMubG9hZEl0ZW1zKGlkLCBkcml2ZXIpO1xuXHR9XG5cdGVhY2hQYXJlbnQoaWQ6IElkLCBjYjogRGF0YUNhbGxiYWNrPFQ+LCBzZWxmOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcblx0XHRpZiAoIWl0ZW0pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHNlbGYpIHtcblx0XHRcdGNiLmNhbGwodGhpcywgaXRlbSk7XG5cdFx0fVxuXHRcdGlmIChpdGVtLnBhcmVudCA9PT0gdGhpcy5fcm9vdCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmdldEl0ZW0oaXRlbS5wYXJlbnQpO1xuXHRcdGNiLmNhbGwodGhpcywgcGFyZW50KTtcblx0XHR0aGlzLmVhY2hQYXJlbnQoaXRlbS5wYXJlbnQsIGNiKTtcblx0fVxuXHRoYXZlSXRlbXMoaWQ6IElkKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIGlkIGluIHRoaXMuX2NoaWxkcztcblx0fVxuXHRjYW5Db3B5KGlkOiBJZCwgdGFyZ2V0OiBJZCk6IGJvb2xlYW4ge1xuXHRcdGlmIChpZCA9PT0gdGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdGxldCBjYW5Db3B5ID0gdHJ1ZTtcblx0XHR0aGlzLmVhY2hQYXJlbnQodGFyZ2V0LCBpdGVtID0+IGl0ZW0uaWQgPT09IGlkID8gY2FuQ29weSA9IGZhbHNlIDogbnVsbCk7IC8vIGxvY2F0ZSByZXR1cm4gc3RyaW5nXG5cdFx0cmV0dXJuIGNhbkNvcHk7XG5cdH1cblx0c2VyaWFsaXplKGRyaXZlcjogRGF0YURyaXZlciA9IERhdGFEcml2ZXIuanNvbiwgY2hlY2tJdGVtPzogKGl0ZW06IGFueSkgPT4gYW55KSB7XG5cdFx0Y29uc3QgZGF0YSA9IHRoaXMuX3NlcmlhbGl6ZSh0aGlzLl9yb290LCBjaGVja0l0ZW0pO1xuXHRcdGNvbnN0IGRhdGFEcml2ZXIgPSB0b0RhdGFEcml2ZXIoZHJpdmVyKTtcblx0XHRpZiAoZGF0YURyaXZlcikge1xuXHRcdFx0cmV0dXJuIGRhdGFEcml2ZXIuc2VyaWFsaXplKGRhdGEpO1xuXHRcdH1cblx0fVxuXHRnZXRJZChpbmRleDogbnVtYmVyLCBwYXJlbnQ6IHN0cmluZyA9IHRoaXMuX3Jvb3QpOiBzdHJpbmcge1xuXHRcdGlmICghdGhpcy5fY2hpbGRzW3BhcmVudF0gfHwgIXRoaXMuX2NoaWxkc1twYXJlbnRdW2luZGV4XSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fY2hpbGRzW3BhcmVudF1baW5kZXhdLmlkO1xuXHR9XG5cdHByb3RlY3RlZCBfcmVtb3ZlQWxsKGlkPzogSWQpIHtcblx0XHRpZiAoaWQpIHtcblx0XHRcdGNvbnN0IGNoaWxkcyA9IFsuLi4gdGhpcy5fY2hpbGRzW2lkXV07XG5cdFx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcykge1xuXHRcdFx0XHR0aGlzLnJlbW92ZShjaGlsZC5pZCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN1cGVyLl9yZW1vdmVBbGwoKTtcblx0XHRcdGNvbnN0IHJvb3QgPSB0aGlzLl9yb290O1xuXHRcdFx0dGhpcy5faW5pdENoaWxkcyA9IG51bGw7XG5cdFx0XHR0aGlzLl9jaGlsZHMgPSB7IFtyb290XTogW10gfTtcblx0XHR9XG5cdH1cblx0cHJvdGVjdGVkIF9yZW1vdmVDb3JlKGlkKSB7XG5cdFx0aWYgKHRoaXMuX3B1bGxbaWRdKSB7XG5cdFx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudChpZCk7XG5cdFx0XHR0aGlzLl9jaGlsZHNbcGFyZW50XSA9IHRoaXMuX2NoaWxkc1twYXJlbnRdLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT09IGlkKTtcblx0XHRcdGlmIChwYXJlbnQgIT09IHRoaXMuX3Jvb3QgJiYgIXRoaXMuX2NoaWxkc1twYXJlbnRdLmxlbmd0aCkge1xuXHRcdFx0XHRkZWxldGUgdGhpcy5fY2hpbGRzW3BhcmVudF07XG5cdFx0XHR9XG5cdFx0XHRpZiAodGhpcy5faW5pdENoaWxkcyAmJiB0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF0pIHtcblx0XHRcdFx0dGhpcy5faW5pdENoaWxkc1twYXJlbnRdID0gdGhpcy5faW5pdENoaWxkc1twYXJlbnRdLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgIT09IGlkKTtcblx0XHRcdFx0aWYgKHBhcmVudCAhPT0gdGhpcy5fcm9vdCAmJiAhdGhpcy5faW5pdENoaWxkc1twYXJlbnRdLmxlbmd0aCkge1xuXHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl9pbml0Q2hpbGRzW3BhcmVudF07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMuX2Zhc3REZWxldGVDaGlsZHModGhpcy5fY2hpbGRzLCBpZCk7XG5cdFx0XHRpZiAodGhpcy5faW5pdENoaWxkcykge1xuXHRcdFx0XHR0aGlzLl9mYXN0RGVsZXRlQ2hpbGRzKHRoaXMuX2luaXRDaGlsZHMsIGlkKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJvdGVjdGVkIF9hZGRUb09yZGVyKF9vcmRlciwgb2JqOiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcblx0XHRjb25zdCBjaGlsZHMgPSB0aGlzLl9jaGlsZHM7XG5cdFx0Y29uc3QgaW5pdENoaWxkcyA9IHRoaXMuX2luaXRDaGlsZHM7XG5cdFx0Y29uc3QgcGFyZW50ID0gb2JqLnBhcmVudDtcblx0XHR0aGlzLl9wdWxsW29iai5pZF0gPSBvYmo7XG5cblx0XHRhZGRUb09yZGVyKGNoaWxkcywgb2JqLCBwYXJlbnQsIGluZGV4KTtcblx0XHRpZiAoaW5pdENoaWxkcykge1xuXHRcdFx0YWRkVG9PcmRlcihpbml0Q2hpbGRzLCBvYmosIHBhcmVudCwgaW5kZXgpO1xuXHRcdH1cblx0fVxuXHRwcm90ZWN0ZWQgX3BhcnNlX2RhdGEoZGF0YTogYW55LCBwYXJlbnQgPSB0aGlzLl9yb290KSB7XG5cdFx0Zm9yIChsZXQgb2JqIG9mIGRhdGEpIHtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5pbml0KSB7XG5cdFx0XHRcdG9iaiA9IHRoaXMuY29uZmlnLmluaXQob2JqKTtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2Ygb2JqICE9PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdG9iaiA9IHtcblx0XHRcdFx0XHR2YWx1ZTogb2JqXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRvYmouaWQgPSBvYmouaWQgPyBvYmouaWQudG9TdHJpbmcoKSA6IHVpZCgpO1xuXHRcdFx0b2JqLnBhcmVudCA9IG9iai5wYXJlbnQgPyBvYmoucGFyZW50LnRvU3RyaW5nKCkgOiBwYXJlbnQ7XG5cdFx0XHR0aGlzLl9wdWxsW29iai5pZF0gPSBvYmo7XG5cblx0XHRcdGlmICghdGhpcy5fY2hpbGRzW29iai5wYXJlbnRdKSB7XG5cdFx0XHRcdHRoaXMuX2NoaWxkc1tvYmoucGFyZW50XSA9IFtdO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5fY2hpbGRzW29iai5wYXJlbnRdLnB1c2gob2JqKTtcblx0XHRcdGlmIChvYmouaXRlbXMgJiYgb2JqLml0ZW1zIGluc3RhbmNlb2YgT2JqZWN0KSB7XG5cdFx0XHRcdHRoaXMuX3BhcnNlX2RhdGEob2JqLml0ZW1zLCBvYmouaWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRwcml2YXRlIF9mYXN0RGVsZXRlQ2hpbGRzKHRhcmdldCwgaWQ6IElkKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX3B1bGxbaWRdKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5fcHVsbFtpZF07XG5cdFx0fVxuXHRcdGlmICghdGFyZ2V0W2lkXSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDtpIDwgdGFyZ2V0W2lkXS5sZW5ndGg7aSsrKSB7XG5cdFx0XHR0aGlzLl9mYXN0RGVsZXRlQ2hpbGRzKHRhcmdldCwgdGFyZ2V0W2lkXVtpXS5pZCk7XG5cdFx0fVxuXHRcdGRlbGV0ZSB0YXJnZXRbaWRdO1xuXHR9XG5cdHByaXZhdGUgX3JlY3Vyc2l2ZUZpbHRlcihydWxlOiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjaywgY29uZmlnOiBJVHJlZUZpbHRlckNvbmZpZywgY3VycmVudDogSWQsIGxldmVsOiBudW1iZXIsIG5ld0NoaWxkczogSUFueU9iaik6IHZvaWQge1xuXHRcdGNvbnN0IGNoaWxkcyA9IHRoaXMuX2NoaWxkc1tjdXJyZW50XTtcblx0XHRpZiAoIWNoaWxkcykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBjb25kaXRpb24gPSAoaXRlbTogVCk6IGJvb2xlYW4gPT4ge1xuXHRcdFx0c3dpdGNoIChjb25maWcudHlwZSkge1xuXHRcdFx0XHRjYXNlIFRyZWVGaWx0ZXJUeXBlLmFsbDoge1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgVHJlZUZpbHRlclR5cGUubGV2ZWw6IHtcblx0XHRcdFx0XHRyZXR1cm4gbGV2ZWwgPT09IGNvbmZpZy5sZXZlbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFRyZWVGaWx0ZXJUeXBlLmxlYWZzOiB7XG5cdFx0XHRcdFx0cmV0dXJuICF0aGlzLmhhdmVJdGVtcyhpdGVtLmlkKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0aWYgKHR5cGVvZiBydWxlID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdGNvbnN0IGN1c3RvbVJ1bGUgPSAoaXRlbTogVCkgPT4gIWNvbmRpdGlvbihpdGVtKSB8fCBydWxlKGl0ZW0pO1xuXHRcdFx0Y29uc3QgZmlsdGVyZWQgPSBjaGlsZHMuZmlsdGVyKGN1c3RvbVJ1bGUpO1xuXHRcdFx0aWYgKGZpbHRlcmVkLmxlbmd0aCkge1xuXHRcdFx0XHRuZXdDaGlsZHNbY3VycmVudF0gPSBmaWx0ZXJlZDtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKChydWxlIGFzIElGaWx0ZXJNb2RlKS5ieSAmJiAocnVsZSBhcyBJRmlsdGVyTW9kZSkubWF0Y2gpIHtcblx0XHRcdGNvbnN0IGN1c3RvbVJ1bGUgPSAoaXRlbTogVCkgPT4gIWNvbmRpdGlvbihpdGVtKSB8fCBpdGVtW3J1bGUuYnldLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHJ1bGUubWF0Y2gudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpKSAhPT0gLTE7XG5cdFx0XHRuZXdDaGlsZHNbY3VycmVudF0gPSBjaGlsZHMuZmlsdGVyKGN1c3RvbVJ1bGUpO1xuXHRcdH1cblx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcykge1xuXHRcdFx0dGhpcy5fcmVjdXJzaXZlRmlsdGVyKHJ1bGUsIGNvbmZpZywgY2hpbGQuaWQsIGxldmVsICsgMSwgbmV3Q2hpbGRzKTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfc2VyaWFsaXplKHBhcmVudCA9IHRoaXMuX3Jvb3QsIGZuPykge1xuXHRcdHJldHVybiB0aGlzLm1hcChpdGVtID0+IHtcblx0XHRcdGxldCBpdGVtQ29weTogYW55ID0ge307XG5cdFx0XHRmb3IgKGNvbnN0IGtleSBpbiBpdGVtKSB7XG5cdFx0XHRcdGlmIChrZXkgPT09IFwicGFyZW50XCIgfHwga2V5ID09PSBcIml0ZW1zXCIpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpdGVtQ29weVtrZXldID0gaXRlbVtrZXldO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGZuKSB7XG5cdFx0XHRcdGl0ZW1Db3B5ID0gZm4oaXRlbUNvcHkpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuaGF2ZUl0ZW1zKGl0ZW0uaWQpKSB7XG5cdFx0XHRcdGl0ZW1Db3B5Lml0ZW1zID0gdGhpcy5fc2VyaWFsaXplKGl0ZW0uaWQsIGZuKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpdGVtQ29weTtcblx0XHR9LCBwYXJlbnQsIGZhbHNlKTtcblx0fVxufSIsImltcG9ydCB7IElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IERhdGFDb2xsZWN0aW9uIH0gZnJvbSBcIi4vZGF0YWNvbGxlY3Rpb25cIjtcbmltcG9ydCB7IFRyZWVDb2xsZWN0aW9uIH0gZnJvbSBcIi4vdHJlZWNvbGxlY3Rpb25cIjtcbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcblxuZXhwb3J0IHR5cGUgSWQgPSBzdHJpbmc7XG5leHBvcnQgaW50ZXJmYWNlIElEYXRhUHJveHkge1xuXHRsb2FkOiAoKSA9PiBQcm9taXNlPGFueVtdPjtcblx0c2F2ZTogKGRhdGE6IGFueSwgbW9kZTogc3RyaW5nKSA9PiBQcm9taXNlPGFueT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNvcnRNb2RlIHtcblx0Ynk/OiBzdHJpbmc7XG5cdGRpcj86IHN0cmluZztcblx0YXM/OiAoYTogYW55KSA9PiBhbnk7XG5cdHJ1bGU/OiAoYTogYW55LCBiOiBhbnkpID0+IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgSUZpbHRlckNhbGxiYWNrID0gKG9iajogYW55KSA9PiBib29sZWFuO1xuXG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJNb2RlIHtcblx0Ynk/OiBzdHJpbmc7XG5cdG1hdGNoPzogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbjtcblx0Y29tcGFyZT86ICh2YWx1ZTogYW55LCBtYXRjaDogYW55LCBvYmo6IGFueSkgPT4gYm9vbGVhbjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSUZpbHRlckNvbmZpZyB7XG5cdGFkZD86IGJvb2xlYW47XG5cdG11bHRpcGxlPzogYm9vbGVhbjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVGaWx0ZXJDb25maWcgZXh0ZW5kcyBJRmlsdGVyQ29uZmlnIHtcblx0dHlwZT86IFRyZWVGaWx0ZXJUeXBlO1xuXHRsZXZlbD86IG51bWJlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSVVwZGF0ZU9iamVjdCB7XG5cdFtrZXk6IHN0cmluZ106IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFDb2xsZWN0aW9uPFQgZXh0ZW5kcyBJRGF0YUl0ZW0gPSBJRGF0YUl0ZW0+IHtcblx0bG9hZERhdGE6IFByb21pc2U8YW55Pjtcblx0c2F2ZURhdGE6IFByb21pc2U8YW55Pjtcblx0ZXZlbnRzOiBJRXZlbnRTeXN0ZW08RGF0YUV2ZW50cz47XG5cdGFkZChvYmo6IGFueSwgaW5kZXg/OiBudW1iZXIpOiBzdHJpbmc7XG5cdHJlbW92ZShpZDogSWQpOiB2b2lkO1xuXHRyZW1vdmVBbGwoKTogdm9pZDtcblx0dXBkYXRlKGlkOiBJZCwgb2JqOiBJVXBkYXRlT2JqZWN0LCBzaWxlbnQ/OiBib29sZWFuKTogdm9pZDtcblxuXHRleGlzdHMoaWQ6IElkKTogYm9vbGVhbjtcblx0Z2V0SW5pdGlhbERhdGEoKTogVFtdO1xuXHRnZXRJdGVtKGlkOiBJZCk6IFQ7XG5cdGdldEluZGV4KGlkOiBJZCk6IG51bWJlcjtcblx0Z2V0TGVuZ3RoKCk6IG51bWJlcjtcblx0Z2V0SWQoaW5kZXg6IG51bWJlcik6IElkO1xuXHRmaWx0ZXIocnVsZT86IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrLCBjb25maWc/OiBJRmlsdGVyQ29uZmlnKTogdm9pZDtcblx0ZmluZChydWxlOiBJRmlsdGVyTW9kZSk6IFQ7XG5cdHJlZHVjZTxBPihjYjogUmVkdWNlQ2FsbEJhY2s8VCwgQT4sIGFjYzogQSk6IEE7XG5cdGZpbmRBbGwocnVsZTogSUZpbHRlck1vZGUpOiBUW107XG5cdG1hcChjYjogRGF0YUNhbGxiYWNrPFQ+KTogVFtdO1xuXHRtYXBSYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNiOiBEYXRhQ2FsbGJhY2s8VD4pOiBhbnlbXTtcblx0c29ydChieTogSVNvcnRNb2RlKTogdm9pZDtcblx0c2VyaWFsaXplKGRyaXZlcj86IERhdGFEcml2ZXIpOiBUW107XG5cdGNvcHkoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBJRGF0YUNvbGxlY3Rpb24pOiB2b2lkO1xuXHRtb3ZlKGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogSURhdGFDb2xsZWN0aW9uKTogdm9pZDtcblxuXHRsb2FkKHVybDogSURhdGFQcm94eSk6IFByb21pc2U8YW55Pjtcblx0cGFyc2UoZGF0YTogVFtdKTtcblxuXHRzYXZlKHVybDogSURhdGFQcm94eSk6IHZvaWQ7IC8vIFByb21pc2U8YW55Pjtcblx0aXNTYXZlZCgpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhQ2hhbmdlU3RhY2sge1xuXHRvcmRlcjogSURhdGFDaGFuZ2VbXTtcbn1cbmV4cG9ydCB0eXBlIFN0YXR1c2VzID0gXCJhZGRcIiB8IFwidXBkYXRlXCIgfCBcInJlbW92ZVwiO1xuZXhwb3J0IGludGVyZmFjZSBJRGF0YUNoYW5nZSB7XG5cdGlkOiBJZDtcblx0c3RhdHVzOiBTdGF0dXNlcztcblx0b2JqOiBhbnk7XG5cdHNhdmluZzogYm9vbGVhbjtcblx0cHJvbWlzZT86IFByb21pc2U8YW55Pjtcblx0cGVuZGluZz86IGJvb2xlYW47XG5cdGVycm9yPzogYm9vbGVhbjtcbn1cbmV4cG9ydCB0eXBlIFJlcXVlc3RTdGF0dXMgPSBcInNhdmluZ1wiIHwgXCJwZW5kaW5nXCIgfCBcImVycm9yXCI7XG5leHBvcnQgaW50ZXJmYWNlIElEaXIge1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG5cdGFzYzogbnVtYmVyO1xuXHRkZXNjOiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIElEYXRhRHJpdmVyIHtcblx0dG9Kc29uQXJyYXkoZGF0YTogYW55KTogYW55W107XG5cdHNlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pOiBhbnk7XG5cdGdldFJvd3MoZGF0YTogc3RyaW5nKTogYW55W107XG5cdGdldEZpZWxkcyhyb3c6IGFueSk6IHsgW2tleTogc3RyaW5nXTogYW55IH07XG59XG5leHBvcnQgZW51bSBUcmVlRmlsdGVyVHlwZSB7XG5cdGFsbCA9IFwiYWxsXCIsXG5cdGxldmVsID0gXCJsZXZlbFwiLFxuXHRsZWFmcyA9IFwibGVhZnNcIlxufVxuZXhwb3J0IHR5cGUgRGF0YUNhbGxiYWNrPFQ+ID0gKGl0ZW06IFQsIGluZGV4PzogbnVtYmVyKSA9PiBhbnk7XG5cbmV4cG9ydCB0eXBlIFJlZHVjZUNhbGxCYWNrPFQsIEE+ID0gKGFjYzogQSwgaXRlbTogVCwgaW5kZXg/OiBudW1iZXIpID0+IEE7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVRyZWVDb2xsZWN0aW9uPFQgZXh0ZW5kcyBJRGF0YUl0ZW0gPSBJRGF0YUl0ZW0+IGV4dGVuZHMgSURhdGFDb2xsZWN0aW9uPFQ+IHtcblx0YWRkKG9iajogYW55LCBpbmRleD86IG51bWJlciwgcGFyZW50PzogSWQpOiBzdHJpbmc7XG5cdGdldFJvb3QoKTogSWQ7XG5cdGdldFBhcmVudChpZDogSWQpOiBJZDtcblx0cmVtb3ZlQWxsKGlkPzogSWQpOiB2b2lkO1xuXHRnZXRMZW5ndGgoaWQ/OiBJZCk6IG51bWJlcjtcblx0Z2V0SW5kZXgoaWQ6IElkKTogbnVtYmVyO1xuXHRnZXRJdGVtcyhpZDogSWQpOiBUW107XG5cdHNvcnQoY29uZj86IGFueSk6IHZvaWQ7XG5cdG1hcChjYjogRGF0YUNhbGxiYWNrPFQ+LCBwYXJlbnQ/OiBJZCwgZGlyZWN0PzogYm9vbGVhbik6IGFueTtcblx0ZmlsdGVyKHJ1bGU/OiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjaywgY29uZmlnPzogSVRyZWVGaWx0ZXJDb25maWcpOiB2b2lkO1xuXHRyZXN0b3JlT3JkZXIoKTogdm9pZDtcblx0Y29weShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldD86IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkO1xuXHRtb3ZlKGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogSURhdGFDb2xsZWN0aW9uIHwgSVRyZWVDb2xsZWN0aW9uLCB0YXJnZXRJZD86IElkKTogSWQ7XG5cdGVhY2hDaGlsZChpZDogSWQsIGNiOiBEYXRhQ2FsbGJhY2s8VD4sIGRpcmVjdD86IGJvb2xlYW4sIGNoZWNrSXRlbT86IChpdGVtOiBJRGF0YUl0ZW0pID0+IGJvb2xlYW4pOiB2b2lkO1xuXHRlYWNoUGFyZW50KGlkOiBJZCwgY2I6IERhdGFDYWxsYmFjazxUPiwgc2VsZj86IGJvb2xlYW4pOiB2b2lkO1xuXHRsb2FkSXRlbXMoaWQ6IElkLCBkcml2ZXI/OiBhbnkpOiB2b2lkO1xuXHRyZWZyZXNoSXRlbXMoaWQ6IElkLCBkcml2ZXI/OiBhbnkpOiB2b2lkO1xuXHRoYXZlSXRlbXMoaWQ6IElkKTogYm9vbGVhbjtcblx0Y2FuQ29weShpZDogSWQsIHRhcmdldDogSWQpOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhSXRlbSB7XG5cdGlkPzogc3RyaW5nO1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cblxuZXhwb3J0IGVudW0gRHJvcFBvc2l0aW9uIHtcblx0dG9wID0gXCJ0b3BcIixcblx0Ym90ID0gXCJib3RcIixcblx0aW4gPSBcImluXCJcbn1cbmV4cG9ydCBpbnRlcmZhY2UgSU9ialdpdGhEYXRhIHtcblx0ZGF0YTogVHJlZUNvbGxlY3Rpb24gfCBEYXRhQ29sbGVjdGlvbjtcblx0ZXZlbnRzOiBJRXZlbnRTeXN0ZW08RHJhZ0V2ZW50cywgSURyYWdFdmVudHNIYW5kbGVyc01hcD47XG5cdGNvbmZpZzogSURyYWdDb25maWc7XG59XG5leHBvcnQgaW50ZXJmYWNlIElUcmFuc2ZlckRhdGEge1xuXHRpbml0WE9mZnNldD86IG51bWJlcjtcblx0aW5pdFlPZmZzZXQ/OiBudW1iZXI7XG5cdHg/OiBudW1iZXI7XG5cdHk/OiBudW1iZXI7XG5cdGdob3N0PzogSFRNTEVsZW1lbnQ7XG5cdHRhcmdldElkPzogSWQ7XG5cdGlkPzogSWQ7XG5cdGRyYWdDb25maWc/OiBJRHJhZ0NvbmZpZztcblx0dGFyZ2V0PzogSU9ialdpdGhEYXRhO1xuXHRkcm9wUG9zaXRpb24/OiBEcm9wUG9zaXRpb247XG5cdGl0ZW0/OiBIVE1MRWxlbWVudDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRHJhZ0NvbmZpZyB7XG5cdGRyYWdDb3B5PzogYm9vbGVhbjtcblx0ZHJvcEJlaGF2aW91cj86IERyb3BCZWhhdmlvdXI7XG5cdGRyYWdNb2RlPzogRHJhZ01vZGU7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvcHlPYmplY3Qge1xuXHRpZDogc3RyaW5nO1xuXHR0YXJnZXQ6IElPYmpXaXRoRGF0YTtcbn1cblxuZXhwb3J0IGVudW0gRGF0YUV2ZW50cyB7XG5cdGFmdGVyQWRkID0gXCJhZnRlcmFkZFwiLFxuXHRiZWZvcmVBZGQgPSBcImJlZm9yZWFkZFwiLFxuXHRyZW1vdmVBbGwgPSBcInJlbW92ZWFsbFwiLFxuXHRiZWZvcmVSZW1vdmUgPSBcImJlZm9yZXJlbW92ZVwiLFxuXHRhZnRlclJlbW92ZSA9IFwiYWZ0ZXJyZW1vdmVcIixcblx0Y2hhbmdlID0gXCJjaGFuZ2VcIixcblx0bG9hZCA9IFwibG9hZFwiXG59XG5leHBvcnQgZW51bSBEcmFnRXZlbnRzIHtcblx0YmVmb3JlRHJhZyA9IFwiYmVmb3JlZHJhZ1wiLCAgICAgLy8gZmlyZSBvbiBzb3VyY2Vcblx0YmVmb3JlRHJvcCA9IFwiYmVmb3JlRHJvcFwiLCAgICAgLy8gZmlyZSBvbiB0YXJnZXRcblx0ZHJhZ1N0YXJ0ID0gXCJkcmFnc3RhcnRcIiwgICAgICAgLy8gZmlyZSBvbiBzb3VyY2Vcblx0ZHJhZ0VuZCA9IFwiZHJhZ2VuZFwiLCAgICAgICAgICAgLy8gZmlyZSBvbiBzb3VyY2Vcblx0Y2FuRHJvcCA9IFwiY2FuZHJvcFwiLCAgICAgICAgICAgLy8gZmlyZSBvbiB0YXJnZXRcblx0Y2FuY2VsRHJvcCA9IFwiY2FuY2VsZHJvcFwiLCAgICAgLy8gZmlyZSBvbiB0YXJnZXRcblx0ZHJvcENvbXBsZXRlID0gXCJkcm9wY29tcGxldGVcIiwgLy8gZmlyZSBvbiB0YXJnZXRcblx0ZHJhZ091dCA9IFwiZHJhZ091dFwiLCAgICAgICAgICAgLy8gZmlyZSBvbiBzb3VyY2Vcblx0ZHJhZ0luID0gXCJkcmFnSW5cIiAgICAgICAgICAgICAgLy8gZmlyZSBvbiBzb3VyY2Vcbn1cblxuXG5leHBvcnQgZW51bSBEcmFnTW9kZSB7XG5cdHRhcmdldCA9IFwidGFyZ2V0XCIsXG5cdGJvdGggPSBcImJvdGhcIixcblx0c291cmNlID0gXCJzb3VyY2VcIlxufVxuZXhwb3J0IGVudW0gRHJvcEJlaGF2aW91ciB7XG5cdGNoaWxkID0gXCJjaGlsZFwiLFxuXHRzaWJsaW5nID0gXCJzaWJsaW5nXCIsXG5cdGNvbXBsZXggPSBcImNvbXBsZXhcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAge1xuXHRba2V5OiBzdHJpbmddOiAoLi4uYXJnczogYW55W10pID0+IGFueTtcblx0W0RhdGFFdmVudHMuY2hhbmdlXTogKGlkPzogc3RyaW5nLCBzdGF0dXM/OiBTdGF0dXNlcywgb2JqPzogYW55KSA9PiBhbnk7XG5cdFtEYXRhRXZlbnRzLmFmdGVyQWRkXTogKG9iajogYW55KSA9PiB2b2lkO1xuXHRbRGF0YUV2ZW50cy5hZnRlclJlbW92ZV06IChvYmo6IGFueSkgPT4gdm9pZDtcblx0W0RhdGFFdmVudHMuYmVmb3JlQWRkXTogKG9iajogYW55KSA9PiBib29sZWFuIHwgdm9pZDtcblx0W0RhdGFFdmVudHMuYmVmb3JlUmVtb3ZlXTogKG9iajogYW55KSA9PiBib29sZWFuIHwgdm9pZDtcblx0W0RhdGFFdmVudHMubG9hZF06ICgpID0+IHZvaWQ7XG5cdFtEYXRhRXZlbnRzLnJlbW92ZUFsbF06ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURyYWdFdmVudHNIYW5kbGVyc01hcCB7XG5cdFtrZXk6IHN0cmluZ106ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5iZWZvcmVEcmFnXTogKGl0ZW06IGFueSwgZ2hvc3Q6IEhUTUxFbGVtZW50KSA9PiB2b2lkIHwgYm9vbGVhbjtcblx0W0RyYWdFdmVudHMuYmVmb3JlRHJvcF06IChpZDogc3RyaW5nLCB0YXJnZXQ6IElPYmpXaXRoRGF0YSkgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5jYW5Ecm9wXTogKGlkOiBzdHJpbmcsIGRyb3BQb3NpdGlvbjogRHJvcFBvc2l0aW9uKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmNhbmNlbERyb3BdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5kcmFnRW5kXTogKGlkOiBzdHJpbmcpID0+IGFueTtcblx0W0RyYWdFdmVudHMuZHJhZ0luXTogKGlkOiBzdHJpbmcsIGRyb3BQb3NpdGlvbjogRHJvcFBvc2l0aW9uLCB0YXJnZXQ6IElPYmpXaXRoRGF0YSkgPT4gdm9pZCB8IGJvb2xlYW47XG5cdFtEcmFnRXZlbnRzLmRyYWdPdXRdOiAoaWQ6IHN0cmluZywgdGFyZ2V0OiBJT2JqV2l0aERhdGEpID0+IGFueTtcblx0W0RyYWdFdmVudHMuZHJhZ1N0YXJ0XTogKGlkOiBzdHJpbmcpID0+IGFueTtcblx0W0RyYWdFdmVudHMuZHJvcENvbXBsZXRlXTogKGlkOiBzdHJpbmcsIHBvc2l0aW9uOiBEcm9wUG9zaXRpb24pID0+IGFueTtcbn1cblxuZXhwb3J0IGVudW0gRGF0YURyaXZlciB7XG5cdGpzb24gPSBcImpzb25cIixcblx0Y3N2ID0gXCJjc3ZcIixcblx0eG1sID0gXCJ4bWxcIlxufSIsImltcG9ydCB7IGV4dGVuZCwgZGV0ZWN0V2lkZ2V0Q2xpY2sgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vY29yZVwiO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3Rpb24sIGRyYWdNYW5hZ2VyLCBEYXRhRXZlbnRzLCBEcmFnRXZlbnRzLCBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwLCBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwIH0gZnJvbSBcIkBkaHgvdHMtZGF0YVwiO1xuXG5pbXBvcnQgeyBjcmVhdGUsIGVsLCBWTm9kZSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9kb21cIjtcbmltcG9ydCB7IEV2ZW50U3lzdGVtLCBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5pbXBvcnQgeyBhZGRIb3RrZXlzIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL0tleW1hbmFnZXJcIjtcbmltcG9ydCB7IElIYW5kbGVycywgU2VsZWN0aW9uRXZlbnRzIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3ZpZXdcIjtcbmltcG9ydCB7IFNlbGVjdGlvbiB9IGZyb20gXCIuL1NlbGVjdGlvblwiO1xuaW1wb3J0IHsgbG9jYXRlIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2h0bWxcIjtcbmltcG9ydCB7IElMaXN0Q29uZmlnLCBMaXN0RXZlbnRzLCBJTGlzdEV2ZW50SGFuZGxlcnNNYXAsIElTZWxlY3Rpb24sIElMaXN0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3QgZXh0ZW5kcyBWaWV3IGltcGxlbWVudHMgSUxpc3Qge1xuXHRwdWJsaWMgY29uZmlnOiBJTGlzdENvbmZpZztcblx0cHVibGljIGRhdGE6IERhdGFDb2xsZWN0aW9uO1xuXHRwdWJsaWMgZXZlbnRzOiBJRXZlbnRTeXN0ZW08RGF0YUV2ZW50cyB8IExpc3RFdmVudHMgfCBEcmFnRXZlbnRzLCBJTGlzdEV2ZW50SGFuZGxlcnNNYXAgJiBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwICYgSURyYWdFdmVudHNIYW5kbGVyc01hcD47XG5cdHB1YmxpYyBzZWxlY3Rpb246IElTZWxlY3Rpb247XG5cblx0cHJvdGVjdGVkIF9oYW5kbGVyczogSUhhbmRsZXJzO1xuXG5cdHByaXZhdGUgX3JhbmdlOiBbbnVtYmVyLCBudW1iZXJdO1xuXHRwcml2YXRlIF92aXNpYmxlSGVpZ2h0OiBudW1iZXI7XG5cdHByaXZhdGUgX3RvcE9mZnNldDogbnVtYmVyO1xuXG5cdHByaXZhdGUgX25hdmlnYXRpb25EZXN0cnVjdG9yOiAoKSA9PiB2b2lkO1xuXG5cdHByaXZhdGUgX3dpZGdldEluRm9jdXM6IGJvb2xlYW47XG5cdHByaXZhdGUgX2RvY3VtZW50Q2xpY2tEZXN0dWN0b3I6ICgpID0+IHZvaWQ7XG5cblx0cHJpdmF0ZSBfZm9jdXNJbmRleDogbnVtYmVyO1xuXG5cdGNvbnN0cnVjdG9yKG5vZGU6IEhUTUxFbGVtZW50fHN0cmluZywgY29uZmlnOiBJTGlzdENvbmZpZyA9IHt9KXtcblx0XHRzdXBlcihub2RlLCBleHRlbmQoe1xuXHRcdFx0aXRlbUhlaWdodDogY29uZmlnLnZpcnR1YWwgPyAzNCA6IGNvbmZpZy5pdGVtSGVpZ2h0IHx8IG51bGwsXG5cdFx0XHRhcnJvd05hdmlnYXRpb246IGZhbHNlXG5cdFx0fSwgY29uZmlnKSk7XG5cblxuXHRcdGlmIChBcnJheS5pc0FycmF5KHRoaXMuY29uZmlnLmRhdGEpKSB7XG5cdFx0XHR0aGlzLmV2ZW50cyA9IG5ldyBFdmVudFN5c3RlbTxEYXRhRXZlbnRzPih0aGlzKTtcblx0XHRcdHRoaXMuZGF0YSA9IG5ldyBEYXRhQ29sbGVjdGlvbih7fSwgdGhpcy5ldmVudHMpO1xuXHRcdFx0dGhpcy5kYXRhLnBhcnNlKHRoaXMuY29uZmlnLmRhdGEpO1xuXHRcdH0gZWxzZSBpZiAodGhpcy5jb25maWcuZGF0YSAmJiB0aGlzLmNvbmZpZy5kYXRhLmV2ZW50cykge1xuXHRcdFx0dGhpcy5kYXRhID0gdGhpcy5jb25maWcuZGF0YTtcblx0XHRcdHRoaXMuZXZlbnRzID0gdGhpcy5kYXRhLmV2ZW50cztcblx0XHRcdHRoaXMuZXZlbnRzLmNvbnRleHQgPSB0aGlzO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLmV2ZW50cyA9IG5ldyBFdmVudFN5c3RlbTxEYXRhRXZlbnRzPih0aGlzKTtcblx0XHRcdHRoaXMuZGF0YSA9IG5ldyBEYXRhQ29sbGVjdGlvbih7fSwgdGhpcy5ldmVudHMpO1xuXHRcdH1cblxuXHRcdHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbih7fSwgdGhpcy5kYXRhKTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5hcnJvd05hdmlnYXRpb24pIHtcblx0XHRcdGxldCBhcnJvd05hdmlnYXRpb24gPSB0aGlzLmNvbmZpZy5hcnJvd05hdmlnYXRpb24gYXMgYW55O1xuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5hcnJvd05hdmlnYXRpb24gIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR0aGlzLl93aWRnZXRJbkZvY3VzID0gZmFsc2U7XG5cdFx0XHRcdGFycm93TmF2aWdhdGlvbiA9ICgpID0+IHRoaXMuX3dpZGdldEluRm9jdXM7XG5cdFx0XHRcdHRoaXMuX2RvY3VtZW50Q2xpY2tEZXN0dWN0b3IgPSBkZXRlY3RXaWRnZXRDbGljayh0aGlzLl91aWQsIGlzSW5uZXJDbGljayA9PiB0aGlzLl93aWRnZXRJbkZvY3VzID0gaXNJbm5lckNsaWNrKTtcblx0XHRcdH1cblx0XHRcdGNvbnN0IHByZXZlbnRFdmVudCA9IChmbjogKCkgPT4gdm9pZCkgPT4gKGU6IEV2ZW50KSA9PiB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0Zm4oKTtcblx0XHRcdH07XG5cdFx0XHR0aGlzLl9uYXZpZ2F0aW9uRGVzdHJ1Y3RvciA9IGFkZEhvdGtleXMoXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRhcnJvd2Rvd246IHByZXZlbnRFdmVudCgoKSA9PiB0aGlzLnNldEZvY3VzSW5kZXgodGhpcy5fZm9jdXNJbmRleCArIDEpKSxcblx0XHRcdFx0XHRhcnJvd3VwOiBwcmV2ZW50RXZlbnQoKCkgPT4gdGhpcy5zZXRGb2N1c0luZGV4KHRoaXMuX2ZvY3VzSW5kZXggLSAxKSksXG5cdFx0XHRcdFx0ZW50ZXI6IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBpZCA9IHRoaXMuZGF0YS5nZXRJZCh0aGlzLl9mb2N1c0luZGV4KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0aW9uLmFkZChpZCk7XG5cdFx0XHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKExpc3RFdmVudHMuY2xpY2ssIFtpZCwgZV0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSxcblx0XHRcdFx0YXJyb3dOYXZpZ2F0aW9uXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGNvbnN0IHVwZGF0ZXIgPSAodXBkYXRlT2JqOiBhbnkpID0+IChpZDogc3RyaW5nKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5kYXRhLmV4aXN0cyhpZCkpIHtcblx0XHRcdFx0dGhpcy5kYXRhLnVwZGF0ZShpZCwgdXBkYXRlT2JqKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dGhpcy5ldmVudHMub24oRGF0YUV2ZW50cy5jaGFuZ2UsICgpID0+IHRoaXMucGFpbnQoKSk7XG5cdFx0dGhpcy5ldmVudHMub24oRHJhZ0V2ZW50cy5jYW5Ecm9wLCB1cGRhdGVyKHskZHJvcGhlcmU6IHRydWV9KSk7XG5cdFx0dGhpcy5ldmVudHMub24oRHJhZ0V2ZW50cy5jYW5jZWxEcm9wLCB1cGRhdGVyKHskZHJvcGhlcmU6IHVuZGVmaW5lZH0pKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmRyYWdTdGFydCwgdXBkYXRlcih7JGRyYWd0YXJnZXQ6IHRydWV9KSk7XG5cdFx0dGhpcy5ldmVudHMub24oRHJhZ0V2ZW50cy5kcmFnRW5kLCB1cGRhdGVyKHskZHJhZ3RhcmdldDogdW5kZWZpbmVkfSkpO1xuXG5cdFx0dGhpcy5zZWxlY3Rpb24uZXZlbnRzLm9uKFNlbGVjdGlvbkV2ZW50cy5hZnRlclNlbGVjdCwgaWQgPT4ge1xuXHRcdFx0dGhpcy5zZXRGb2N1c0luZGV4KHRoaXMuZGF0YS5nZXRJbmRleChpZCkpO1xuXHRcdH0pO1xuXG5cdFx0dGhpcy5faGFuZGxlcnMgPSB7XG5cdFx0XHRvbm1vdXNlZG93bjogKGU6IE1vdXNlRXZlbnQpID0+IHRoaXMuY29uZmlnLmRyYWdNb2RlID8gZHJhZ01hbmFnZXIub25Nb3VzZURvd24oZSkgOiBudWxsLFxuXHRcdFx0b25kcmFnc3RhcnQ6ICgpID0+IHRoaXMuY29uZmlnLmRyYWdNb2RlID8gZmFsc2UgOiBudWxsLFxuXHRcdFx0b25jb250ZXh0bWVudTogKGU6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRcdFx0Y29uc3QgaWQgPSBsb2NhdGUoZSk7XG5cdFx0XHRcdGlmICghaWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0dGhpcy5ldmVudHMuZmlyZShMaXN0RXZlbnRzLmNvbnRleHRtZW51LCBbaWQsIGVdKTtcblx0XHRcdH0sXG5cdFx0XHRvbmNsaWNrOiAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBpZCA9IGxvY2F0ZShlKTtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNlbGVjdGlvbi5hZGQoaWQpO1xuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKExpc3RFdmVudHMuY2xpY2ssIFtpZCwgZV0pO1xuXHRcdFx0fSxcblx0XHRcdG9uc2Nyb2xsOiAoZTogYW55KSA9PiB0aGlzLmNvbmZpZy52aXJ0dWFsID8gdGhpcy5fdXBkYXRlVmlydHVhbChlLnRhcmdldC5zY3JvbGxUb3ApIDogbnVsbFxuXHRcdH07XG5cdFx0aWYgKHRoaXMuY29uZmlnLmRyYWdNb2RlKSB7XG5cdFx0XHRkcmFnTWFuYWdlci5zZXRJdGVtKHRoaXMuX3VpZCwgdGhpcyk7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY29uZmlnLnZpcnR1YWwpIHtcblx0XHRcdHRoaXMuX3JhbmdlID0gWzAsIDBdO1xuXHRcdFx0dGhpcy5fdG9wT2Zmc2V0ID0gMDtcblx0XHR9XG5cblx0XHRjb25zdCB2aWV3ID0gIGNyZWF0ZSh7XG5cdFx0XHRyZW5kZXI6ICgpID0+IHRoaXMuY29uZmlnLnZpcnR1YWwgPyB0aGlzLl9yZW5kZXJWaXJ0dWFsTGlzdCgpIDogdGhpcy5fcmVuZGVyTGlzdCgpLFxuXHRcdFx0aG9va3M6IHtcblx0XHRcdFx0ZGlkTW91bnQ6ICh2bTogYW55KSA9PiB7XG5cdFx0XHRcdFx0aWYgKCF0aGlzLmNvbmZpZy5oZWlnaHQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGVsZW1lbnQ6IEhUTUxFbGVtZW50ID0gdm0ubm9kZS5lbDtcblx0XHRcdFx0XHRcdHRoaXMuY29uZmlnLmhlaWdodCA9IChlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZSAmJiAoZWxlbWVudC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50KS5vZmZzZXRIZWlnaHQpIHx8IDIwMDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnZpcnR1YWwpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3Zpc2libGVIZWlnaHQgPSB0aGlzLmNvbmZpZy5oZWlnaHQ7XG5cdFx0XHRcdFx0XHR0aGlzLl91cGRhdGVWaXJ0dWFsKDApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aGlzLnBhaW50KCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0XHR0aGlzLm1vdW50KG5vZGUsIHZpZXcpO1xuXHR9XG5cdHNldEZvY3VzSW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXHRcdGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLmRhdGEuZ2V0TGVuZ3RoKCkgLSAxKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHRoaXMuX2ZvY3VzSW5kZXggPSBpbmRleDtcblxuXHRcdGNvbnN0IHJvb3RWaWV3ID0gdGhpcy5nZXRSb290VmlldygpO1xuXHRcdGlmICghcm9vdFZpZXcgfHwgIXJvb3RWaWV3Lm5vZGUgfHwgIXJvb3RWaWV3Lm5vZGUuZWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBsaXN0RWw6IEhUTUxFbGVtZW50ID0gdGhpcy5nZXRSb290Tm9kZSgpO1xuXHRcdGlmICghbGlzdEVsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuY29uZmlnLnZpcnR1YWwpIHtcblx0XHRcdGNvbnN0IHBvc2l0aW9uID0gaW5kZXggKiB0aGlzLmNvbmZpZy5pdGVtSGVpZ2h0O1xuXHRcdFx0aWYgKHBvc2l0aW9uID49IHRoaXMuX3Zpc2libGVIZWlnaHQgKyB0aGlzLl90b3BPZmZzZXQgfHwgcG9zaXRpb24gPCB0aGlzLl90b3BPZmZzZXQpIHtcblx0XHRcdFx0bGlzdEVsLnNjcm9sbFRvKDAsIHBvc2l0aW9uKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgbGlzdEl0ZW06IEhUTUxFbGVtZW50ID0gbGlzdEVsLmNoaWxkcmVuW2luZGV4XSBhcyBIVE1MRWxlbWVudDtcblx0XHRcdGlmICghbGlzdEl0ZW0pIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGxpc3RJdGVtLm9mZnNldFRvcCA+PSBsaXN0RWwuc2Nyb2xsVG9wICsgbGlzdEVsLmNsaWVudEhlaWdodCkge1xuXHRcdFx0XHRsaXN0SXRlbS5zY3JvbGxJbnRvVmlldyhmYWxzZSk7XG5cdFx0XHR9IGVsc2UgaWYgKGxpc3RJdGVtLm9mZnNldFRvcCA8IGxpc3RFbC5zY3JvbGxUb3ApIHtcblx0XHRcdFx0bGlzdEl0ZW0uc2Nyb2xsSW50b1ZpZXcodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoTGlzdEV2ZW50cy5mb2N1c0NoYW5nZSwgW3RoaXMuX2ZvY3VzSW5kZXgsIHRoaXMuZGF0YS5nZXRJZCh0aGlzLl9mb2N1c0luZGV4KV0pO1xuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXHRnZXRGb2N1c0l0ZW0oKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5nZXRJZCh0aGlzLl9mb2N1c0luZGV4KTtcblx0fVxuXHRnZXRGb2N1c0luZGV4KCkge1xuXHRcdHJldHVybiB0aGlzLl9mb2N1c0luZGV4O1xuXHR9XG5cdGRlc3RydWN0b3IoKSB7XG5cdFx0aWYgKHRoaXMuX25hdmlnYXRpb25EZXN0cnVjdG9yKSB7XG5cdFx0XHR0aGlzLl9uYXZpZ2F0aW9uRGVzdHJ1Y3RvcigpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fZG9jdW1lbnRDbGlja0Rlc3R1Y3Rvcikge1xuXHRcdFx0dGhpcy5fZG9jdW1lbnRDbGlja0Rlc3R1Y3RvcigpO1xuXHRcdH1cblx0XHR0aGlzLnVubW91bnQoKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfcmVuZGVySXRlbShkYXRhOiBhbnksIGluZGV4OiBudW1iZXIpOiBWTm9kZSB7XG5cdFx0Y29uc3QgaHRtbCA9ICh0aGlzLmNvbmZpZy50ZW1wbGF0ZSAmJiB0aGlzLmNvbmZpZy50ZW1wbGF0ZShkYXRhKSkgfHwgZGF0YS5odG1sO1xuXHRcdGNvbnN0IGZvY3VzID0gaW5kZXggPT09IHRoaXMuX2ZvY3VzSW5kZXg7XG5cdFx0cmV0dXJuIGh0bWwgPyB0aGlzLl9yZW5kZXJBc0h0bWwoaHRtbCwgZGF0YSwgZm9jdXMpIDogdGhpcy5fcmVuZGVyQXNWYWx1ZShkYXRhLCBmb2N1cyk7XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3JlbmRlckFzSHRtbChodG1sOnN0cmluZywgaXRlbTphbnksIGZvY3VzOiBib29sZWFuKTpWTm9kZSB7XG5cdFx0Y29uc3Qge2l0ZW1IZWlnaHR9ID0gdGhpcy5jb25maWc7XG5cdFx0cmV0dXJuIGVsKFwibGlcIiwge1xuXHRcdFx0XHRcImNsYXNzXCI6IFwiZGh4X2xpc3QtaXRlbVwiICtcblx0XHRcdFx0KGl0ZW0uJHNlbGVjdGVkID8gXCIgZGh4X2xpc3QtaXRlbS0tc2VsZWN0ZWRcIiA6IFwiXCIpICtcblx0XHRcdFx0KGZvY3VzID8gXCIgZGh4X2xpc3QtaXRlbS0tZm9jdXNcIiA6IFwiXCIpICtcblx0XHRcdFx0KGl0ZW0uJGRyb3BoZXJlID8gXCIgZGh4X2xpc3QtaXRlbS0tZHJvcGhlcmVcIiA6IFwiXCIpICtcblx0XHRcdFx0KGl0ZW0uJGRyYWd0YXJnZXQgPyBcIiBkaHhfbGlzdC1pdGVtLS1kcmFndGFyZ2V0XCIgOiBcIlwiKSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5kcmFnTW9kZSA/IFwiIGRoeF9saXN0LWl0ZW0tLWRyYWdcIiA6IFwiXCIpICtcblx0XHRcdFx0KGl0ZW0uY3NzID8gXCIgXCIgKyBpdGVtLmNzcyA6IFwiXCIpLFxuXHRcdFx0XHRcImRoeF9pZFwiOiBpdGVtLmlkLFxuXHRcdFx0XHRcInN0eWxlXCI6IHtcblx0XHRcdFx0XHRoZWlnaHQ6IGl0ZW1IZWlnaHRcblx0XHRcdFx0fSxcblx0XHRcdFx0XCJfa2V5XCI6IGl0ZW0uaWQsXG5cdFx0XHRcdFwiLmlubmVySFRNTFwiOiBodG1sXG5cdFx0XHR9LFxuXHRcdCk7XG5cdH1cblx0cHJvdGVjdGVkIF9yZW5kZXJBc1ZhbHVlKGl0ZW06YW55LCBmb2N1czpib29sZWFuKTpWTm9kZSB7XG5cdFx0Y29uc3Qge2l0ZW1IZWlnaHR9ID0gdGhpcy5jb25maWc7XG5cdFx0cmV0dXJuIGVsKFwibGlcIiwge1xuXHRcdFx0XHRjbGFzczogXCJkaHhfbGlzdC1pdGVtIGRoeF9saXN0LWl0ZW0tLXRleHRcIiArXG5cdFx0XHRcdChpdGVtLiRzZWxlY3RlZCA/IFwiIGRoeF9saXN0LWl0ZW0tLXNlbGVjdGVkXCIgOiBcIlwiKSArXG5cdFx0XHRcdChmb2N1cyA/IFwiIGRoeF9saXN0LWl0ZW0tLWZvY3VzXCIgOiBcIlwiKSArXG5cdFx0XHRcdChpdGVtLiRkcm9waGVyZSA/IFwiIGRoeF9saXN0LWl0ZW0tLWRyb3BoZXJlXCIgOiBcIlwiKSArXG5cdFx0XHRcdChpdGVtLiRkcmFndGFyZ2V0ID8gXCIgZGh4X2xpc3QtaXRlbS0tZHJhZ3RhcmdldFwiIDogXCJcIikgK1xuXHRcdFx0XHQodGhpcy5jb25maWcuZHJhZ01vZGUgPyBcIiBkaHhfbGlzdC1pdGVtLS1kcmFnXCIgOiBcIlwiKSArXG5cdFx0XHRcdChpdGVtLmNzcyA/IFwiIFwiICsgaXRlbS5jc3MgOiBcIlwiKSxcblx0XHRcdFx0ZGh4X2lkOiBpdGVtLmlkLFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdGhlaWdodDogaXRlbUhlaWdodFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRfa2V5OiBpdGVtLmlkLFxuXHRcdFx0fSxcblx0XHRcdGl0ZW0udGV4dCB8fCBpdGVtLnZhbHVlXG5cdFx0KTtcblx0fVxuXG5cdHByb3RlY3RlZCBfcmVuZGVyTGlzdCgpOiBWTm9kZSB7XG5cdFx0Y29uc3Qga2lkcyA9IHRoaXMuZGF0YS5tYXAoKG9iaiwgaW5kZXgpID0+IHRoaXMuX3JlbmRlckl0ZW0ob2JqLCBpbmRleCkpO1xuXG5cdFx0cmV0dXJuIGVsKFwidWwuZGh4X3dpZGdldC5kaHhfbGlzdFwiLCB7XG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcIm1heC1oZWlnaHRcIjogdGhpcy5jb25maWcuaGVpZ2h0ICsgXCJweFwiXG5cdFx0XHR9LFxuXHRcdFx0Y2xhc3M6IHRoaXMuY29uZmlnLmNzcyxcblx0XHRcdGRoeF93aWRnZXRfaWQ6IHRoaXMuX3VpZCxcblx0XHRcdC4uLnRoaXMuX2hhbmRsZXJzXG5cdFx0fSwga2lkcyk7XG5cdH1cblx0cHJvdGVjdGVkIF9yZW5kZXJWaXJ0dWFsTGlzdCgpOiBWTm9kZSB7XG5cdFx0Y29uc3Qga2lkcyA9IHRoaXMuZGF0YS5tYXBSYW5nZSh0aGlzLl9yYW5nZVswXSwgdGhpcy5fcmFuZ2VbMV0sIChvYmosIGluZGV4KSA9PiB0aGlzLl9yZW5kZXJJdGVtKG9iaiwgaW5kZXgpKTtcblxuXHRcdHJldHVybiBlbChcIi5kaHhfd2lkZ2V0LmRoeF92aXJ0dWFsLWxpc3Qtd3JhcHBlclwiLCB7XG5cdFx0XHRkaHhfd2lkZ2V0X2lkOiB0aGlzLl91aWQsXG5cdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcIm1heC1oZWlnaHRcIjogdGhpcy5fdmlzaWJsZUhlaWdodFxuXHRcdFx0fSxcblx0XHRcdC4uLnRoaXMuX2hhbmRsZXJzXG5cdFx0fSxcblx0XHRbXG5cdFx0XHRlbChcInVsLmRoeF9saXN0LmRoeF9saXN0LS12aXJ0dWFsXCIsIHtcblx0XHRcdFx0Y2xhc3M6IHRoaXMuY29uZmlnLmNzcyxcblx0XHRcdFx0c3R5bGU6IHtcblx0XHRcdFx0XHRcImhlaWdodFwiOiB0aGlzLl9nZXRIZWlnaHQoKSArIFwicHhcIixcblx0XHRcdFx0XHRcInBhZGRpbmctdG9wXCI6IHRoaXMuX3RvcE9mZnNldCArIFwicHhcIlxuXHRcdFx0XHR9LFxuXHRcdFx0fSwga2lkcylcblx0XHRdKTtcblx0fVxuXHRwcml2YXRlIF91cGRhdGVWaXJ0dWFsKHBvc2l0aW9uOiBudW1iZXIpIHtcblx0XHRjb25zdCBvdmVyc2NhbkNvdW50ID0gNTtcblxuXHRcdGNvbnN0IGNvdW50ID0gTWF0aC5mbG9vcih0aGlzLl92aXNpYmxlSGVpZ2h0IC8gdGhpcy5jb25maWcuaXRlbUhlaWdodCkgKyBvdmVyc2NhbkNvdW50O1xuXG5cdFx0Y29uc3QgaW5kZXggPSBNYXRoLmZsb29yKHBvc2l0aW9uIC8gdGhpcy5jb25maWcuaXRlbUhlaWdodCk7XG5cblx0XHR0aGlzLl9yYW5nZSA9IFtpbmRleCwgY291bnQgKyBpbmRleF07XG5cblx0XHRjb25zdCB0b3RhbEhlaWdodCA9IHRoaXMuX2dldEhlaWdodCgpO1xuXG5cdFx0aWYgKHBvc2l0aW9uID4gdG90YWxIZWlnaHQgLSB0aGlzLl92aXNpYmxlSGVpZ2h0KSB7XG5cdFx0XHRwb3NpdGlvbiA9IHRvdGFsSGVpZ2h0IC0gdGhpcy5fdmlzaWJsZUhlaWdodDtcblx0XHR9XG5cblx0XHR0aGlzLl90b3BPZmZzZXQgPSBwb3NpdGlvbjtcblxuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXHRwcml2YXRlIF9nZXRIZWlnaHQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5nZXRMZW5ndGgoKSAqIHRoaXMuY29uZmlnLml0ZW1IZWlnaHQ7XG5cdH1cbn1cbiIsImltcG9ydCB7IElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IFNlbGVjdGlvbkV2ZW50cywgSVNlbGVjdGlvbkV2ZW50c0hhbmRsZXJzTWFwIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiwgRGF0YUV2ZW50cywgSURhdGFFdmVudHNIYW5kbGVyc01hcCB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcbmltcG9ydCB7IElTZWxlY3Rpb25Db25maWcsIElTZWxlY3Rpb24gfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0aW9uIGltcGxlbWVudHMgSVNlbGVjdGlvbiB7XG5cdHB1YmxpYyBjb25maWc6IElTZWxlY3Rpb25Db25maWc7XG5cdHB1YmxpYyBldmVudHM6IElFdmVudFN5c3RlbTxTZWxlY3Rpb25FdmVudHMgfCBEYXRhRXZlbnRzLCBJU2VsZWN0aW9uRXZlbnRzSGFuZGxlcnNNYXAgJiBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwPjtcblxuXHRwcml2YXRlIF9zZWxlY3RlZDogc3RyaW5nW107XG5cdHByaXZhdGUgX2RhdGE6IERhdGFDb2xsZWN0aW9uO1xuXG5cdGNvbnN0cnVjdG9yKGNvbmZpZzogSVNlbGVjdGlvbkNvbmZpZywgZGF0YTpEYXRhQ29sbGVjdGlvbikge1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnO1xuXHRcdHRoaXMuZXZlbnRzID0gZGF0YS5ldmVudHMgYXMgSUV2ZW50U3lzdGVtPFNlbGVjdGlvbkV2ZW50cyB8IERhdGFFdmVudHM+O1xuXHRcdHRoaXMuX2RhdGEgPSBkYXRhO1xuXG5cdFx0dGhpcy5fc2VsZWN0ZWQgPSBbXTtcblxuXHRcdHRoaXMuX2RhdGEuZXZlbnRzLm9uKERhdGFFdmVudHMucmVtb3ZlQWxsLCAoKSA9PiB7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZCA9IFtdO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2RhdGEuZXZlbnRzLm9uKERhdGFFdmVudHMuYWZ0ZXJSZW1vdmUsIG9iaiA9PiB7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkLmZpbHRlcihpZCA9PiBpZCAhPT0gb2JqLmlkKTtcblx0XHR9KTtcblx0fVxuXG5cdGdldElkKCk6IHN0cmluZyB8IHN0cmluZ1tdIHtcblx0XHRpZiAodGhpcy5jb25maWcubXVsdGlzZWxlY3QpIHtcblx0XHRcdHJldHVybiB0aGlzLl9zZWxlY3RlZDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkWzBdO1xuXHR9XG5cblx0Z2V0SXRlbSgpOmFueSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkLmxlbmd0aCl7XG5cdFx0XHRjb25zdCBpdGVtcyA9IHRoaXMuX3NlbGVjdGVkLm1hcChpZCA9PiB0aGlzLl9kYXRhLmdldEl0ZW0oaWQpKTtcblx0XHRcdHJldHVybiB0aGlzLmNvbmZpZy5tdWx0aXNlbGVjdCA/IGl0ZW1zIDogaXRlbXNbMF07XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGNvbnRhaW5zKGlkPzogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWQuaW5kZXhPZihpZCkgPiAtMTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkLmxlbmd0aCA+IDA7XG5cdH1cblxuXHRyZW1vdmUoaWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRpZiAoIWlkICYmICF0aGlzLl9zZWxlY3RlZC5sZW5ndGgpe1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdGlmIChpZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3Vuc2VsZWN0SXRlbShpZCk7XG5cdFx0fVxuXHRcdHRoaXMuX3NlbGVjdGVkLmZvckVhY2goc2VsZWN0ZWRJZCA9PiB0aGlzLl91bnNlbGVjdEl0ZW0oc2VsZWN0ZWRJZCkpO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0YWRkKGlkOiBzdHJpbmcpIHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWQuaW5kZXhPZihpZCkgIT09IC0xKSB7XG5cdFx0XHRpZiAodGhpcy5jb25maWcubXVsdGlzZWxlY3QpIHtcblx0XHRcdFx0dGhpcy5fdW5zZWxlY3RJdGVtKGlkKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKCF0aGlzLmNvbmZpZy5tdWx0aXNlbGVjdCkge1xuXHRcdFx0dGhpcy5yZW1vdmUoKTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVNlbGVjdCwgW2lkXSkpIHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkLnB1c2goaWQpO1xuXHRcdFx0dGhpcy5fZGF0YS51cGRhdGUoaWQsIHsgJHNlbGVjdGVkOiB0cnVlIH0pO1xuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYWZ0ZXJTZWxlY3QsIFtpZF0pO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF91bnNlbGVjdEl0ZW0oaWQ6IHN0cmluZykge1xuXHRcdGlmICh0aGlzLmV2ZW50cy5maXJlKFNlbGVjdGlvbkV2ZW50cy5iZWZvcmVVblNlbGVjdCwgW2lkXSkpIHtcblx0XHRcdHRoaXMuX2RhdGEudXBkYXRlKGlkLCB7ICRzZWxlY3RlZDogZmFsc2UgfSk7XG5cdFx0XHR0aGlzLl9zZWxlY3RlZCA9IHRoaXMuX3NlbGVjdGVkLmZpbHRlcihzZWxlY3RlZElkID0+IHNlbGVjdGVkSWQgIT09IGlkKTtcblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmFmdGVyVW5TZWxlY3QsIFtpZF0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG4iLCJpbXBvcnQgXCIuLi8uLi9zdHlsZXMvbGlzdC5zY3NzXCI7XG5leHBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vTGlzdFwiO1xuIiwiaW1wb3J0IHsgSURhdGFJdGVtLCBEYXRhQ29sbGVjdGlvbiwgRGF0YUV2ZW50cywgRHJhZ0V2ZW50cywgSURhdGFFdmVudHNIYW5kbGVyc01hcCwgSURyYWdFdmVudHNIYW5kbGVyc01hcCwgSURyYWdDb25maWcgfSBmcm9tIFwiQGRoeC90cy1kYXRhXCI7XG5pbXBvcnQgeyBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5pbXBvcnQgeyBTZWxlY3Rpb25FdmVudHMsIElTZWxlY3Rpb25FdmVudHNIYW5kbGVyc01hcCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuXG5leHBvcnQgZW51bSBMaXN0RXZlbnRzIHtcblx0Y29udGV4dG1lbnUgPSBcImNvbnRleHRtZW51XCIsXG5cdGNsaWNrID0gXCJjbGlja1wiLFxuXHRmb2N1c0NoYW5nZT0gXCJmb2N1c2NoYW5nZVwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxpc3RDb25maWcgZXh0ZW5kcyBJRHJhZ0NvbmZpZyB7XG5cdHRlbXBsYXRlPzogKG9iajogSURhdGFJdGVtKSA9PiBzdHJpbmc7XG5cdGRhdGE/OiBEYXRhQ29sbGVjdGlvbjxhbnk+IHwgYW55W107XG5cdHZpcnR1YWw/OiBib29sZWFuO1xuXHRpdGVtSGVpZ2h0PzogbnVtYmVyO1xuXHRjc3M/OiBzdHJpbmc7XG5cdGhlaWdodD86IG51bWJlcjtcblx0YXJyb3dOYXZpZ2F0aW9uPzogYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKTsgLy8gd2hlbiByZXR1cm4gdHJ1ZSwgbmF2aWdhdGlvbiB3b3JrXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxpc3RFdmVudEhhbmRsZXJzTWFwIHtcblx0W2tleTogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cdFtMaXN0RXZlbnRzLmNsaWNrXTogKGlkOiBzdHJpbmcsIGU6IEV2ZW50KSA9PiBhbnk7XG5cdFtMaXN0RXZlbnRzLmNvbnRleHRtZW51XTogKGlkOiBzdHJpbmcsIGU6IE1vdXNlRXZlbnQpID0+IGFueTtcblx0W0xpc3RFdmVudHMuZm9jdXNDaGFuZ2VdOiAoZm9jdXNJbmRleDogbnVtYmVyLCBpZDogc3RyaW5nKSA9PiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdGlvbkNvbmZpZyB7XG5cdG11bHRpc2VsZWN0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJTGlzdDxUID0gYW55PiB7XG5cdGNvbmZpZzogSUxpc3RDb25maWc7XG5cdGRhdGE6IERhdGFDb2xsZWN0aW9uPFQ+O1xuXHRldmVudHM6IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzIHwgTGlzdEV2ZW50cyB8IERyYWdFdmVudHMsIElMaXN0RXZlbnRIYW5kbGVyc01hcCAmIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAgJiBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwPjtcblx0c2VsZWN0aW9uOiBJU2VsZWN0aW9uO1xuXG5cdHNldEZvY3VzSW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQ7XG5cdGdldEZvY3VzSXRlbSgpOiBUO1xuXHRnZXRGb2N1c0luZGV4KCk6IG51bWJlcjtcblx0ZGVzdHJ1Y3RvcigpOiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3Rpb248VCA9IGFueT4ge1xuXHRjb25maWc6IElTZWxlY3Rpb25Db25maWc7XG5cdGV2ZW50czogSUV2ZW50U3lzdGVtPFNlbGVjdGlvbkV2ZW50cyB8IERhdGFFdmVudHMsIElTZWxlY3Rpb25FdmVudHNIYW5kbGVyc01hcCAmIElEYXRhRXZlbnRzSGFuZGxlcnNNYXA+O1xuXG5cdGdldElkKCk6IHN0cmluZyB8IHN0cmluZ1tdO1xuXHRnZXRJdGVtKCk6IFQ7XG5cdGNvbnRhaW5zKGlkPzogc3RyaW5nKTogYm9vbGVhbjtcblx0cmVtb3ZlKGlkPzogc3RyaW5nKTogYm9vbGVhbjtcblx0YWRkKGlkOiBzdHJpbmcpOiB2b2lkO1xufSJdLCJzb3VyY2VSb290IjoiIn0=