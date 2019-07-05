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
/******/ 	return __webpack_require__(__webpack_require__.s = "../ts-dataview/sources/entry.ts");
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

/***/ "../styles/dataview.scss":
/*!*******************************!*\
  !*** ../styles/dataview.scss ***!
  \*******************************/
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

/***/ "../ts-dataview/sources/DataView.ts":
/*!******************************************!*\
  !*** ../ts-dataview/sources/DataView.ts ***!
  \******************************************/
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
var Keymanager_1 = __webpack_require__(/*! @dhx/ts-common/Keymanager */ "../ts-common/Keymanager.ts");
var ts_list_1 = __webpack_require__(/*! @dhx/ts-list */ "../ts-list/index.ts");
var view_1 = __webpack_require__(/*! @dhx/ts-common/view */ "../ts-common/view.ts");
var ts_data_1 = __webpack_require__(/*! @dhx/ts-data */ "../ts-data/index.ts");
var events_1 = __webpack_require__(/*! @dhx/ts-common/events */ "../ts-common/events.ts");
var html_1 = __webpack_require__(/*! @dhx/ts-common/html */ "../ts-common/html.ts");
var types_1 = __webpack_require__(/*! @dhx/ts-common/types */ "../ts-common/types.ts");
var types_2 = __webpack_require__(/*! ./types */ "../ts-dataview/sources/types.ts");
var DataView = /** @class */ (function (_super) {
    __extends(DataView, _super);
    function DataView(node, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, node, core_1.extend({
            arrowNavigation: true,
            itemsInRow: 1,
            gap: "0px",
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
        _this.selection = new ts_list_1.Selection({}, _this.data);
        var preventEvent = function (fn) { return function (e) {
            e.preventDefault();
            fn();
        }; };
        if (_this.config.arrowNavigation) {
            var arrowNavigation = _this.config.arrowNavigation;
            if (typeof _this.config.arrowNavigation !== "function") {
                _this._widgetInFocus = false;
                arrowNavigation = function () { return _this._widgetInFocus; };
                _this._documentClickDestuctor = core_1.detectWidgetClick(_this._uid, function (isInnerClick) { return _this._widgetInFocus = isInnerClick; });
            }
            _this._navigationDestructor = Keymanager_1.addHotkeys({
                arrowdown: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex + _this.config.itemsInRow); }),
                arrowup: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex - _this.config.itemsInRow); }),
                arrowleft: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex - 1); }),
                arrowright: preventEvent(function () { return _this.setFocusIndex(_this._focusIndex + 1); }),
                enter: function (e) {
                    var id = _this.data.getId(_this._focusIndex);
                    _this.selection.add(id);
                    _this.events.fire(types_2.DataViewEvents.click, [id, e]);
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
                _this.events.fire(types_2.DataViewEvents.contextmenu, [id, e]);
            },
            onclick: function (e) {
                var id = html_1.locate(e);
                if (!id) {
                    return;
                }
                _this.selection.add(id);
                _this.events.fire(types_2.DataViewEvents.click, [id, e]);
            },
        };
        if (_this.config.dragMode) {
            ts_data_1.dragManager.setItem(_this._uid, _this);
        }
        var view = dom_1.create({
            render: function () { return _this._draw(); },
            hooks: {
                didRedraw: function (vm) {
                    var rootEl = vm.node.el;
                    var hasScroll = rootEl.scrollHeight > rootEl.offsetHeight;
                    var classAttr = vm.node.attrs.class.replace(" dhx_dataview--has-scroll", "");
                    var newClassName = hasScroll ? classAttr + " dhx_dataview--has-scroll" : classAttr;
                    vm.node.patch({ class: newClassName });
                }
            }
        });
        _this.mount(node, view);
        return _this;
    }
    DataView.prototype.setFocusIndex = function (index) {
        if (index < 0) {
            this._focusIndex = 0;
        }
        else if (index > this.data.getLength() - 1) {
            this._focusIndex = this.data.getLength() - 1;
        }
        else {
            this._focusIndex = index;
        }
        var node = this.getRootNode();
        if (!node || !node.parentNode) {
            return;
        }
        var clientHeight = node.parentNode.offsetHeight;
        var itemRow = node.children[Math.floor(this._focusIndex / this.config.itemsInRow)];
        if (itemRow) {
            var item = itemRow.children[this._focusIndex % this.config.itemsInRow];
            if (item.offsetTop >= node.scrollTop + clientHeight) {
                item.scrollIntoView(false);
            }
            else if (item.offsetTop < node.scrollTop) {
                item.scrollIntoView(true);
            }
        }
        this.events.fire(types_2.DataViewEvents.focusChange, [this._focusIndex, this.data.getId(this._focusIndex)]);
        this.paint();
        return;
    };
    DataView.prototype.getFocusIndex = function () {
        return this._focusIndex;
    };
    DataView.prototype.getFocusItem = function () {
        return this.data.getItem(this.data.getId(this._focusIndex));
    };
    DataView.prototype.setItemInRow = function (amount) {
        this.config.itemsInRow = amount;
        this.paint();
    };
    DataView.prototype.destructor = function () {
        this.events.clear();
        if (this._navigationDestructor) {
            this._navigationDestructor();
        }
        if (this._documentClickDestuctor) {
            this._documentClickDestuctor();
        }
        this.unmount();
    };
    DataView.prototype._renderItem = function (item, focus, isLastItemInRow) {
        var _a = this.config, itemsInRow = _a.itemsInRow, gap = _a.gap, template = _a.template;
        var html = template ? template(item) : item.htmlContent;
        var gapWithPx = function (gapSize) { return parseFloat(gapSize); };
        return dom_1.el("div", {
            // tabindex: "1",
            class: "dhx_dataview-item" +
                (item.$selected ? " dhx_dataview-item--selected" : "") +
                (focus ? " dhx_dataview-item--focus" : "") +
                (item.$drophere ? " dhx_dataview-item--drophere" : "") +
                (item.$dragtarget ? " dhx_dataview-item--dragtarget" : "") +
                (this.config.dragMode ? " dhx_dataview-item--drag" : "") +
                (gapWithPx(gap) ? " dhx_dataview-item--with-gap" : "") +
                (item.css ? " " + item.css : "") +
                (isLastItemInRow ? " dhx_dataview-item--last-item-in-row" : ""),
            style: {
                "width": "calc(" + 100 / itemsInRow + "% - " + gapWithPx(gap) + " * " + (itemsInRow - 1) / itemsInRow + "px)",
                "margin-right": isLastItemInRow ? "" : gap,
            },
            _key: item.id,
            dhx_id: item.id
        }, html ? [dom_1.el(".dhx_dataview-item__inner-html", {
                ".innerHTML": html
            })] : item.value || item.text || item.value);
    };
    DataView.prototype._draw = function () {
        var _this = this;
        var _a = this.config, itemsInRow = _a.itemsInRow, css = _a.css, gap = _a.gap;
        var currentCounter = 0;
        var rows = this.data.reduce(function (items, obj, index) {
            if (currentCounter === 0) {
                items.push([]);
            }
            items[items.length - 1].push(_this._renderItem(obj, index === _this._focusIndex, currentCounter === itemsInRow - 1));
            currentCounter = (currentCounter + 1) % itemsInRow;
            return items;
        }, []);
        return dom_1.el(".dhx_widget.dhx_dataview", __assign({}, this._handlers, { dhx_widget_id: this._uid, class: css ? css : "" }), rows.map(function (row) { return dom_1.el(".dhx_dataview-row", {
            style: { margin: gap },
        }, row); }));
    };
    return DataView;
}(view_1.View));
exports.DataView = DataView;


/***/ }),

/***/ "../ts-dataview/sources/entry.ts":
/*!***************************************!*\
  !*** ../ts-dataview/sources/entry.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ../../styles/dataview.scss */ "../styles/dataview.scss");
var DataView_1 = __webpack_require__(/*! ./DataView */ "../ts-dataview/sources/DataView.ts");
exports.DataView = DataView_1.DataView;


/***/ }),

/***/ "../ts-dataview/sources/types.ts":
/*!***************************************!*\
  !*** ../ts-dataview/sources/types.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var DataViewEvents;
(function (DataViewEvents) {
    DataViewEvents["click"] = "click";
    DataViewEvents["contextmenu"] = "contextmenu";
    DataViewEvents["focusChange"] = "focuschange";
})(DataViewEvents = exports.DataViewEvents || (exports.DataViewEvents = {}));


/***/ }),

/***/ "../ts-list/index.ts":
/*!***************************!*\
  !*** ../ts-list/index.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(/*! ./sources/List */ "../ts-list/sources/List.ts"));
__export(__webpack_require__(/*! ./sources/Selection */ "../ts-list/sources/Selection.ts"));
__export(__webpack_require__(/*! ./sources/types */ "../ts-list/sources/types.ts"));


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaHgvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL2RoeC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL2RvbXZtL2Rpc3QvZGV2L2RvbXZtLmRldi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3Byb21pei9wcm9taXouanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL2RoeC8uLi9ub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaHgvLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3N0eWxlcy9kYXRhdmlldy5zY3NzPzBlY2YiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9LZXltYW5hZ2VyLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vY29yZS50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL2RvbS50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL2h0bWwudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWNvbW1vbi9wb2x5ZmlsbHMvbWF0Y2hlcy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtY29tbW9uL3R5cGVzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1jb21tb24vdmlldy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9pbmRleC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL0NvbGxlY3Rpb25TdG9yZS50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL0RyYWdNYW5hZ2VyLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZGF0YWNvbGxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi9sb2FkZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kYXRhY29sbGVjdGlvbi9zb3J0LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZGF0YXByb3h5LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhL3NvdXJjZXMvZHJpdmVycy9Dc3ZEcml2ZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL0pzb25Ecml2ZXIudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9kcml2ZXJzL1hNTERyaXZlci50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2RyaXZlcnMvZHJpdmVycy50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL2hlbHBlcnMudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9zZWxlY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy9zZXJpYWxpemVycy94bWwudHMiLCJ3ZWJwYWNrOi8vZGh4Ly4uL3RzLWRhdGEvc291cmNlcy90cmVlY29sbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtZGF0YS9zb3VyY2VzL3R5cGVzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhdmlldy9zb3VyY2VzL0RhdGFWaWV3LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhdmlldy9zb3VyY2VzL2VudHJ5LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1kYXRhdmlldy9zb3VyY2VzL3R5cGVzLnRzIiwid2VicGFjazovL2RoeC8uLi90cy1saXN0L2luZGV4LnRzIiwid2VicGFjazovL2RoeC8uLi90cy1saXN0L3NvdXJjZXMvTGlzdC50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtbGlzdC9zb3VyY2VzL1NlbGVjdGlvbi50cyIsIndlYnBhY2s6Ly9kaHgvLi4vdHMtbGlzdC9zb3VyY2VzL3R5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzhEQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUMsS0FBNEQ7QUFDN0QsQ0FBQyxTQUMwQjtBQUMzQixDQUFDLHFCQUFxQjs7QUFFdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksdUJBQXVCOztBQUUzQixVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUksaUNBQWlDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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c0M7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMkJBQTJCOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxDQUFDO0FBQ0Q7Ozs7Ozs7Ozs7OztBQ2xsRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQzs7QUFFckM7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsVUFBVTs7Ozs7Ozs7Ozs7O0FDdkx0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxPQUFPO0FBQ1A7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLE9BQU87QUFDUDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7O0FBRVgsT0FBTztBQUNQOzs7QUFHQTs7QUFFQTtBQUNBLE1BQU0sSUFBNEI7QUFDbEM7QUFDQSxHQUFHLE1BQU0sRUFFTjtBQUNILENBQUM7Ozs7Ozs7Ozs7Ozs7QUM3VEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUMsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDO1NBQ1o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNkLENBQUM7SUFDRixnQkFBQztBQUFELENBQUM7QUEvRVksOEJBQVM7Ozs7Ozs7Ozs7Ozs7OztBQ0R0QixJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDckIseUNBQTJCO0lBQzNCLDZCQUFlO0lBQ2YseUNBQTBCO0FBQzNCLENBQUMsRUFKVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUlyQiIsImZpbGUiOiJkYXRhdmlldy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImRoeFwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJkaHhcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2NvZGViYXNlL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuLi90cy1kYXRhdmlldy9zb3VyY2VzL2VudHJ5LnRzXCIpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAoYykgMjAxNywgTGVvbiBTb3Jva2luXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuIChNSVQgTGljZW5zZWQpXG4qXG4qIGRvbXZtLmpzIChET00gVmlld01vZGVsKVxuKiBBIHRoaW4sIGZhc3QsIGRlcGVuZGVuY3ktZnJlZSB2ZG9tIHZpZXcgbGF5ZXJcbiogQHByZXNlcnZlIGh0dHBzOi8vZ2l0aHViLmNvbS9sZWVvbml5YS9kb212bSAodjMuMi42LCBkZXYgYnVpbGQpXG4qL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG5cdHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG5cdChnbG9iYWwuZG9tdm0gPSBmYWN0b3J5KCkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKCkgeyAndXNlIHN0cmljdCc7XG5cbi8vIE5PVEU6IGlmIGFkZGluZyBhIG5ldyAqVk5vZGUqIHR5cGUsIG1ha2UgaXQgPCBDT01NRU5UIGFuZCByZW51bWJlciByZXN0LlxuLy8gVGhlcmUgYXJlIHNvbWUgcGxhY2VzIHRoYXQgdGVzdCA8PSBDT01NRU5UIHRvIGFzc2VydCBpZiBub2RlIGlzIGEgVk5vZGVcblxuLy8gVk5vZGUgdHlwZXNcbnZhciBFTEVNRU5UXHQ9IDE7XG52YXIgVEVYVFx0XHQ9IDI7XG52YXIgQ09NTUVOVFx0PSAzO1xuXG4vLyBwbGFjZWhvbGRlciB0eXBlc1xudmFyIFZWSUVXXHRcdD0gNDtcbnZhciBWTU9ERUxcdFx0PSA1O1xuXG52YXIgRU5WX0RPTSA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCI7XG52YXIgd2luID0gRU5WX0RPTSA/IHdpbmRvdyA6IHt9O1xudmFyIHJBRiA9IHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5cbnZhciBlbXB0eU9iaiA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIGlzQXJyID0gQXJyYXkuaXNBcnJheTtcblxuZnVuY3Rpb24gaXNTZXQodmFsKSB7XG5cdHJldHVybiB2YWwgIT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNQbGFpbk9iaih2YWwpIHtcblx0cmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbC5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1x0XHQvLyAgJiYgdHlwZW9mIHZhbCA9PT0gXCJvYmplY3RcIlxufVxuXG5mdW5jdGlvbiBpbnNlcnRBcnIodGFyZywgYXJyLCBwb3MsIHJlbSkge1xuXHR0YXJnLnNwbGljZS5hcHBseSh0YXJnLCBbcG9zLCByZW1dLmNvbmNhdChhcnIpKTtcbn1cblxuZnVuY3Rpb24gaXNWYWwodmFsKSB7XG5cdHZhciB0ID0gdHlwZW9mIHZhbDtcblx0cmV0dXJuIHQgPT09IFwic3RyaW5nXCIgfHwgdCA9PT0gXCJudW1iZXJcIjtcbn1cblxuZnVuY3Rpb24gaXNGdW5jKHZhbCkge1xuXHRyZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJmdW5jdGlvblwiO1xufVxuXG5mdW5jdGlvbiBpc1Byb20odmFsKSB7XG5cdHJldHVybiB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIGlzRnVuYyh2YWwudGhlbik7XG59XG5cblxuXG5mdW5jdGlvbiBhc3NpZ25PYmoodGFyZykge1xuXHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuXHRmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspXG5cdFx0eyBmb3IgKHZhciBrIGluIGFyZ3NbaV0pXG5cdFx0XHR7IHRhcmdba10gPSBhcmdzW2ldW2tdOyB9IH1cblxuXHRyZXR1cm4gdGFyZztcbn1cblxuLy8gZXhwb3J0IGNvbnN0IGRlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGRlZXBTZXQodGFyZywgcGF0aCwgdmFsKSB7XG5cdHZhciBzZWc7XG5cblx0d2hpbGUgKHNlZyA9IHBhdGguc2hpZnQoKSkge1xuXHRcdGlmIChwYXRoLmxlbmd0aCA9PT0gMClcblx0XHRcdHsgdGFyZ1tzZWddID0gdmFsOyB9XG5cdFx0ZWxzZVxuXHRcdFx0eyB0YXJnW3NlZ10gPSB0YXJnID0gdGFyZ1tzZWddIHx8IHt9OyB9XG5cdH1cbn1cblxuLypcbmV4cG9ydCBmdW5jdGlvbiBkZWVwVW5zZXQodGFyZywgcGF0aCkge1xuXHR2YXIgc2VnO1xuXG5cdHdoaWxlIChzZWcgPSBwYXRoLnNoaWZ0KCkpIHtcblx0XHRpZiAocGF0aC5sZW5ndGggPT09IDApXG5cdFx0XHR0YXJnW3NlZ10gPSB2YWw7XG5cdFx0ZWxzZVxuXHRcdFx0dGFyZ1tzZWddID0gdGFyZyA9IHRhcmdbc2VnXSB8fCB7fTtcblx0fVxufVxuKi9cblxuZnVuY3Rpb24gc2xpY2VBcmdzKGFyZ3MsIG9mZnMpIHtcblx0dmFyIGFyciA9IFtdO1xuXHRmb3IgKHZhciBpID0gb2ZmczsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspXG5cdFx0eyBhcnIucHVzaChhcmdzW2ldKTsgfVxuXHRyZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBjbXBPYmooYSwgYikge1xuXHRmb3IgKHZhciBpIGluIGEpXG5cdFx0eyBpZiAoYVtpXSAhPT0gYltpXSlcblx0XHRcdHsgcmV0dXJuIGZhbHNlOyB9IH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gY21wQXJyKGEsIGIpIHtcblx0dmFyIGFsZW4gPSBhLmxlbmd0aDtcblxuXHRpZiAoYi5sZW5ndGggIT09IGFsZW4pXG5cdFx0eyByZXR1cm4gZmFsc2U7IH1cblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFsZW47IGkrKylcblx0XHR7IGlmIChhW2ldICE9PSBiW2ldKVxuXHRcdFx0eyByZXR1cm4gZmFsc2U7IH0gfVxuXG5cdHJldHVybiB0cnVlO1xufVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZGFyc2Fpbi9yYWZ0XG4vLyByQUYgdGhyb3R0bGVyLCBhZ2dyZWdhdGVzIG11bHRpcGxlIHJlcGVhdGVkIHJlZHJhdyBjYWxscyB3aXRoaW4gc2luZ2xlIGFuaW1mcmFtZVxuZnVuY3Rpb24gcmFmdChmbikge1xuXHRpZiAoIXJBRilcblx0XHR7IHJldHVybiBmbjsgfVxuXG5cdHZhciBpZCwgY3R4LCBhcmdzO1xuXG5cdGZ1bmN0aW9uIGNhbGwoKSB7XG5cdFx0aWQgPSAwO1xuXHRcdGZuLmFwcGx5KGN0eCwgYXJncyk7XG5cdH1cblxuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0Y3R4ID0gdGhpcztcblx0XHRhcmdzID0gYXJndW1lbnRzO1xuXHRcdGlmICghaWQpIHsgaWQgPSByQUYoY2FsbCk7IH1cblx0fTtcbn1cblxuZnVuY3Rpb24gY3VycnkoZm4sIGFyZ3MsIGN0eCkge1xuXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIGZuLmFwcGx5KGN0eCwgYXJncyk7XG5cdH07XG59XG5cbi8qXG5leHBvcnQgZnVuY3Rpb24gcHJvcCh2YWwsIGNiLCBjdHgsIGFyZ3MpIHtcblx0cmV0dXJuIGZ1bmN0aW9uKG5ld1ZhbCwgZXhlY0NiKSB7XG5cdFx0aWYgKG5ld1ZhbCAhPT0gdW5kZWZpbmVkICYmIG5ld1ZhbCAhPT0gdmFsKSB7XG5cdFx0XHR2YWwgPSBuZXdWYWw7XG5cdFx0XHRleGVjQ2IgIT09IGZhbHNlICYmIGlzRnVuYyhjYikgJiYgY2IuYXBwbHkoY3R4LCBhcmdzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsO1xuXHR9O1xufVxuKi9cblxuLypcbi8vIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vT2xpY2FsL2JpbmFyeS1zZWFyY2hcbmV4cG9ydCBmdW5jdGlvbiBiaW5hcnlLZXlTZWFyY2gobGlzdCwgaXRlbSkge1xuICAgIHZhciBtaW4gPSAwO1xuICAgIHZhciBtYXggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgdmFyIGd1ZXNzO1xuXG5cdHZhciBiaXR3aXNlID0gKG1heCA8PSAyMTQ3NDgzNjQ3KSA/IHRydWUgOiBmYWxzZTtcblx0aWYgKGJpdHdpc2UpIHtcblx0XHR3aGlsZSAobWluIDw9IG1heCkge1xuXHRcdFx0Z3Vlc3MgPSAobWluICsgbWF4KSA+PiAxO1xuXHRcdFx0aWYgKGxpc3RbZ3Vlc3NdLmtleSA9PT0gaXRlbSkgeyByZXR1cm4gZ3Vlc3M7IH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAobGlzdFtndWVzc10ua2V5IDwgaXRlbSkgeyBtaW4gPSBndWVzcyArIDE7IH1cblx0XHRcdFx0ZWxzZSB7IG1heCA9IGd1ZXNzIC0gMTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR3aGlsZSAobWluIDw9IG1heCkge1xuXHRcdFx0Z3Vlc3MgPSBNYXRoLmZsb29yKChtaW4gKyBtYXgpIC8gMik7XG5cdFx0XHRpZiAobGlzdFtndWVzc10ua2V5ID09PSBpdGVtKSB7IHJldHVybiBndWVzczsgfVxuXHRcdFx0ZWxzZSB7XG5cdFx0XHRcdGlmIChsaXN0W2d1ZXNzXS5rZXkgPCBpdGVtKSB7IG1pbiA9IGd1ZXNzICsgMTsgfVxuXHRcdFx0XHRlbHNlIHsgbWF4ID0gZ3Vlc3MgLSAxOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cbiAgICByZXR1cm4gLTE7XG59XG4qL1xuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Mb25nZXN0X2luY3JlYXNpbmdfc3Vic2VxdWVuY2Vcbi8vIGltcGwgYm9ycm93ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vaXZpanMvaXZpXG5mdW5jdGlvbiBsb25nZXN0SW5jcmVhc2luZ1N1YnNlcXVlbmNlKGEpIHtcblx0dmFyIHAgPSBhLnNsaWNlKCk7XG5cdHZhciByZXN1bHQgPSBbXTtcblx0cmVzdWx0LnB1c2goMCk7XG5cdHZhciB1O1xuXHR2YXIgdjtcblxuXHRmb3IgKHZhciBpID0gMCwgaWwgPSBhLmxlbmd0aDsgaSA8IGlsOyArK2kpIHtcblx0XHR2YXIgaiA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG5cdFx0aWYgKGFbal0gPCBhW2ldKSB7XG5cdFx0XHRwW2ldID0gajtcblx0XHRcdHJlc3VsdC5wdXNoKGkpO1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0dSA9IDA7XG5cdFx0diA9IHJlc3VsdC5sZW5ndGggLSAxO1xuXG5cdFx0d2hpbGUgKHUgPCB2KSB7XG5cdFx0XHR2YXIgYyA9ICgodSArIHYpIC8gMikgfCAwO1xuXHRcdFx0aWYgKGFbcmVzdWx0W2NdXSA8IGFbaV0pIHtcblx0XHRcdFx0dSA9IGMgKyAxO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0diA9IGM7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGFbaV0gPCBhW3Jlc3VsdFt1XV0pIHtcblx0XHRcdGlmICh1ID4gMCkge1xuXHRcdFx0XHRwW2ldID0gcmVzdWx0W3UgLSAxXTtcblx0XHRcdH1cblx0XHRcdHJlc3VsdFt1XSA9IGk7XG5cdFx0fVxuXHR9XG5cblx0dSA9IHJlc3VsdC5sZW5ndGg7XG5cdHYgPSByZXN1bHRbdSAtIDFdO1xuXG5cdHdoaWxlICh1LS0gPiAwKSB7XG5cdFx0cmVzdWx0W3VdID0gdjtcblx0XHR2ID0gcFt2XTtcblx0fVxuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8vIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS9PbGljYWwvYmluYXJ5LXNlYXJjaFxuZnVuY3Rpb24gYmluYXJ5RmluZExhcmdlcihpdGVtLCBsaXN0KSB7XG5cdHZhciBtaW4gPSAwO1xuXHR2YXIgbWF4ID0gbGlzdC5sZW5ndGggLSAxO1xuXHR2YXIgZ3Vlc3M7XG5cblx0dmFyIGJpdHdpc2UgPSAobWF4IDw9IDIxNDc0ODM2NDcpID8gdHJ1ZSA6IGZhbHNlO1xuXHRpZiAoYml0d2lzZSkge1xuXHRcdHdoaWxlIChtaW4gPD0gbWF4KSB7XG5cdFx0XHRndWVzcyA9IChtaW4gKyBtYXgpID4+IDE7XG5cdFx0XHRpZiAobGlzdFtndWVzc10gPT09IGl0ZW0pIHsgcmV0dXJuIGd1ZXNzOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxpc3RbZ3Vlc3NdIDwgaXRlbSkgeyBtaW4gPSBndWVzcyArIDE7IH1cblx0XHRcdFx0ZWxzZSB7IG1heCA9IGd1ZXNzIC0gMTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIHtcblx0XHR3aGlsZSAobWluIDw9IG1heCkge1xuXHRcdFx0Z3Vlc3MgPSBNYXRoLmZsb29yKChtaW4gKyBtYXgpIC8gMik7XG5cdFx0XHRpZiAobGlzdFtndWVzc10gPT09IGl0ZW0pIHsgcmV0dXJuIGd1ZXNzOyB9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0aWYgKGxpc3RbZ3Vlc3NdIDwgaXRlbSkgeyBtaW4gPSBndWVzcyArIDE7IH1cblx0XHRcdFx0ZWxzZSB7IG1heCA9IGd1ZXNzIC0gMTsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiAobWluID09IGxpc3QubGVuZ3RoKSA/IG51bGwgOiBtaW47XG5cbi8vXHRyZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGlzRXZQcm9wKG5hbWUpIHtcblx0cmV0dXJuIG5hbWVbMF0gPT09IFwib1wiICYmIG5hbWVbMV0gPT09IFwiblwiO1xufVxuXG5mdW5jdGlvbiBpc1NwbFByb3AobmFtZSkge1xuXHRyZXR1cm4gbmFtZVswXSA9PT0gXCJfXCI7XG59XG5cbmZ1bmN0aW9uIGlzU3R5bGVQcm9wKG5hbWUpIHtcblx0cmV0dXJuIG5hbWUgPT09IFwic3R5bGVcIjtcbn1cblxuZnVuY3Rpb24gcmVwYWludChub2RlKSB7XG5cdG5vZGUgJiYgbm9kZS5lbCAmJiBub2RlLmVsLm9mZnNldEhlaWdodDtcbn1cblxuZnVuY3Rpb24gaXNIeWRyYXRlZCh2bSkge1xuXHRyZXR1cm4gdm0ubm9kZSAhPSBudWxsICYmIHZtLm5vZGUuZWwgIT0gbnVsbDtcbn1cblxuLy8gdGVzdHMgaW50ZXJhY3RpdmUgcHJvcHMgd2hlcmUgcmVhbCB2YWwgc2hvdWxkIGJlIGNvbXBhcmVkXG5mdW5jdGlvbiBpc0R5blByb3AodGFnLCBhdHRyKSB7XG4vL1x0c3dpdGNoICh0YWcpIHtcbi8vXHRcdGNhc2UgXCJpbnB1dFwiOlxuLy9cdFx0Y2FzZSBcInRleHRhcmVhXCI6XG4vL1x0XHRjYXNlIFwic2VsZWN0XCI6XG4vL1x0XHRjYXNlIFwib3B0aW9uXCI6XG5cdFx0XHRzd2l0Y2ggKGF0dHIpIHtcblx0XHRcdFx0Y2FzZSBcInZhbHVlXCI6XG5cdFx0XHRcdGNhc2UgXCJjaGVja2VkXCI6XG5cdFx0XHRcdGNhc2UgXCJzZWxlY3RlZFwiOlxuLy9cdFx0XHRcdGNhc2UgXCJzZWxlY3RlZEluZGV4XCI6XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG4vL1x0fVxuXG5cdHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0Vm0obikge1xuXHRuID0gbiB8fCBlbXB0eU9iajtcblx0d2hpbGUgKG4udm0gPT0gbnVsbCAmJiBuLnBhcmVudClcblx0XHR7IG4gPSBuLnBhcmVudDsgfVxuXHRyZXR1cm4gbi52bTtcbn1cblxuZnVuY3Rpb24gVk5vZGUoKSB7fVxuXG52YXIgVk5vZGVQcm90byA9IFZOb2RlLnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZOb2RlLFxuXG5cdHR5cGU6XHRudWxsLFxuXG5cdHZtOlx0XHRudWxsLFxuXG5cdC8vIGFsbCB0aGlzIHN0dWZmIGNhbiBqdXN0IGxpdmUgaW4gYXR0cnMgKGFzIGRlZmluZWQpIGp1c3QgaGF2ZSBnZXR0ZXJzIGhlcmUgZm9yIGl0XG5cdGtleTpcdG51bGwsXG5cdHJlZjpcdG51bGwsXG5cdGRhdGE6XHRudWxsLFxuXHRob29rczpcdG51bGwsXG5cdG5zOlx0XHRudWxsLFxuXG5cdGVsOlx0XHRudWxsLFxuXG5cdHRhZzpcdG51bGwsXG5cdGF0dHJzOlx0bnVsbCxcblx0Ym9keTpcdG51bGwsXG5cblx0ZmxhZ3M6XHQwLFxuXG5cdF9jbGFzczpcdG51bGwsXG5cdF9kaWZmOlx0bnVsbCxcblxuXHQvLyBwZW5kaW5nIHJlbW92YWwgb24gcHJvbWlzZSByZXNvbHV0aW9uXG5cdF9kZWFkOlx0ZmFsc2UsXG5cdC8vIHBhcnQgb2YgbG9uZ2VzdCBpbmNyZWFzaW5nIHN1YnNlcXVlbmNlP1xuXHRfbGlzOlx0ZmFsc2UsXG5cblx0aWR4Olx0bnVsbCxcblx0cGFyZW50Olx0bnVsbCxcblxuXHQvKlxuXHQvLyBicmVhayBvdXQgaW50byBvcHRpb25hbCBmbHVlbnQgbW9kdWxlXG5cdGtleTpcdGZ1bmN0aW9uKHZhbCkgeyB0aGlzLmtleVx0PSB2YWw7IHJldHVybiB0aGlzOyB9LFxuXHRyZWY6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5yZWZcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcdFx0Ly8gZGVlcCByZWZzXG5cdGRhdGE6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5kYXRhXHQ9IHZhbDsgcmV0dXJuIHRoaXM7IH0sXG5cdGhvb2tzOlx0ZnVuY3Rpb24odmFsKSB7IHRoaXMuaG9va3NcdD0gdmFsOyByZXR1cm4gdGhpczsgfSxcdFx0Ly8gaChcImRpdlwiKS5ob29rcygpXG5cdGh0bWw6XHRmdW5jdGlvbih2YWwpIHsgdGhpcy5odG1sXHQ9IHRydWU7IHJldHVybiB0aGlzLmJvZHkodmFsKTsgfSxcblxuXHRib2R5Olx0ZnVuY3Rpb24odmFsKSB7IHRoaXMuYm9keVx0PSB2YWw7IHJldHVybiB0aGlzOyB9LFxuXHQqL1xufTtcblxuZnVuY3Rpb24gZGVmaW5lVGV4dChib2R5KSB7XG5cdHZhciBub2RlID0gbmV3IFZOb2RlO1xuXHRub2RlLnR5cGUgPSBURVhUO1xuXHRub2RlLmJvZHkgPSBib2R5O1xuXHRyZXR1cm4gbm9kZTtcbn1cblxudmFyIGlzU3RyZWFtID0gZnVuY3Rpb24oKSB7IHJldHVybiBmYWxzZSB9O1xuXG52YXIgc3RyZWFtVmFsID0gbm9vcDtcbnZhciBzdWJTdHJlYW0gPSBub29wO1xudmFyIHVuc3ViU3RyZWFtID0gbm9vcDtcblxuZnVuY3Rpb24gc3RyZWFtQ2ZnKGNmZykge1xuXHRpc1N0cmVhbVx0PSBjZmcuaXM7XG5cdHN0cmVhbVZhbFx0PSBjZmcudmFsO1xuXHRzdWJTdHJlYW1cdD0gY2ZnLnN1Yjtcblx0dW5zdWJTdHJlYW1cdD0gY2ZnLnVuc3ViO1xufVxuXG4vLyBjcmVhdGVzIGEgb25lLXNob3Qgc2VsZi1lbmRpbmcgc3RyZWFtIHRoYXQgcmVkcmF3cyB0YXJnZXQgdm1cbi8vIFRPRE86IGlmIGl0J3MgYWxyZWFkeSByZWdpc3RlcmVkIGJ5IGFueSBwYXJlbnQgdm0sIHRoZW4gaWdub3JlIHRvIGF2b2lkIHNpbXVsdGFuZW91cyBwYXJlbnQgJiBjaGlsZCByZWZyZXNoXG5mdW5jdGlvbiBob29rU3RyZWFtKHMsIHZtKSB7XG5cdHZhciByZWRyYXdTdHJlYW0gPSBzdWJTdHJlYW0ocywgZnVuY3Rpb24gKHZhbCkge1xuXHRcdC8vIHRoaXMgXCJpZlwiIGlnbm9yZXMgdGhlIGluaXRpYWwgZmlyaW5nIGR1cmluZyBzdWJzY3JpcHRpb24gKHRoZXJlJ3Mgbm8gcmVkcmF3YWJsZSB2bSB5ZXQpXG5cdFx0aWYgKHJlZHJhd1N0cmVhbSkge1xuXHRcdFx0Ly8gaWYgdm0gZnVsbHkgaXMgZm9ybWVkIChvciBtb3VudGVkIHZtLm5vZGUuZWw/KVxuXHRcdFx0aWYgKHZtLm5vZGUgIT0gbnVsbClcblx0XHRcdFx0eyB2bS5yZWRyYXcoKTsgfVxuXHRcdFx0dW5zdWJTdHJlYW0ocmVkcmF3U3RyZWFtKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBzdHJlYW1WYWwocyk7XG59XG5cbmZ1bmN0aW9uIGhvb2tTdHJlYW0yKHMsIHZtKSB7XG5cdHZhciByZWRyYXdTdHJlYW0gPSBzdWJTdHJlYW0ocywgZnVuY3Rpb24gKHZhbCkge1xuXHRcdC8vIHRoaXMgXCJpZlwiIGlnbm9yZXMgdGhlIGluaXRpYWwgZmlyaW5nIGR1cmluZyBzdWJzY3JpcHRpb24gKHRoZXJlJ3Mgbm8gcmVkcmF3YWJsZSB2bSB5ZXQpXG5cdFx0aWYgKHJlZHJhd1N0cmVhbSkge1xuXHRcdFx0Ly8gaWYgdm0gZnVsbHkgaXMgZm9ybWVkIChvciBtb3VudGVkIHZtLm5vZGUuZWw/KVxuXHRcdFx0aWYgKHZtLm5vZGUgIT0gbnVsbClcblx0XHRcdFx0eyB2bS5yZWRyYXcoKTsgfVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJlZHJhd1N0cmVhbTtcbn1cblxudmFyIHRhZ0NhY2hlID0ge307XG5cbnZhciBSRV9BVFRSUyA9IC9cXFsoXFx3KykoPzo9KFxcdyspKT9cXF0vZztcblxuZnVuY3Rpb24gY3NzVGFnKHJhdykge1xuXHR7XG5cdFx0dmFyIGNhY2hlZCA9IHRhZ0NhY2hlW3Jhd107XG5cblx0XHRpZiAoY2FjaGVkID09IG51bGwpIHtcblx0XHRcdHZhciB0YWcsIGlkLCBjbHMsIGF0dHI7XG5cblx0XHRcdHRhZ0NhY2hlW3Jhd10gPSBjYWNoZWQgPSB7XG5cdFx0XHRcdHRhZzpcdCh0YWdcdD0gcmF3Lm1hdGNoKCAvXlstXFx3XSsvKSlcdFx0P1x0dGFnWzBdXHRcdFx0XHRcdFx0OiBcImRpdlwiLFxuXHRcdFx0XHRpZDpcdFx0KGlkXHRcdD0gcmF3Lm1hdGNoKCAvIyhbLVxcd10rKS8pKVx0XHQ/IFx0aWRbMV1cdFx0XHRcdFx0XHQ6IG51bGwsXG5cdFx0XHRcdGNsYXNzOlx0KGNsc1x0PSByYXcubWF0Y2goL1xcLihbLVxcdy5dKykvKSlcdFx0P1x0Y2xzWzFdLnJlcGxhY2UoL1xcLi9nLCBcIiBcIilcdDogbnVsbCxcblx0XHRcdFx0YXR0cnM6XHRudWxsLFxuXHRcdFx0fTtcblxuXHRcdFx0d2hpbGUgKGF0dHIgPSBSRV9BVFRSUy5leGVjKHJhdykpIHtcblx0XHRcdFx0aWYgKGNhY2hlZC5hdHRycyA9PSBudWxsKVxuXHRcdFx0XHRcdHsgY2FjaGVkLmF0dHJzID0ge307IH1cblx0XHRcdFx0Y2FjaGVkLmF0dHJzW2F0dHJbMV1dID0gYXR0clsyXSB8fCBcIlwiO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjYWNoZWQ7XG5cdH1cbn1cblxudmFyIERFVk1PREUgPSB7XG5cdHN5bmNSZWRyYXc6IGZhbHNlLFxuXG5cdHdhcm5pbmdzOiB0cnVlLFxuXG5cdHZlcmJvc2U6IHRydWUsXG5cblx0bXV0YXRpb25zOiB0cnVlLFxuXG5cdERBVEFfUkVQTEFDRUQ6IGZ1bmN0aW9uKHZtLCBvbGREYXRhLCBuZXdEYXRhKSB7XG5cdFx0aWYgKGlzRnVuYyh2bS52aWV3KSAmJiB2bS52aWV3Lmxlbmd0aCA+IDEpIHtcblx0XHRcdHZhciBtc2cgPSBcIkEgdmlldydzIGRhdGEgd2FzIHJlcGxhY2VkLiBUaGUgZGF0YSBvcmlnaW5hbGx5IHBhc3NlZCB0byB0aGUgdmlldyBjbG9zdXJlIGR1cmluZyBpbml0IGlzIG5vdyBzdGFsZS4gWW91IG1heSB3YW50IHRvIHJlbHkgb25seSBvbiB0aGUgZGF0YSBwYXNzZWQgdG8gcmVuZGVyKCkgb3Igdm0uZGF0YS5cIjtcblx0XHRcdHJldHVybiBbbXNnLCB2bSwgb2xkRGF0YSwgbmV3RGF0YV07XG5cdFx0fVxuXHR9LFxuXG5cdFVOS0VZRURfSU5QVVQ6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0cmV0dXJuIFtcIlVua2V5ZWQgPGlucHV0PiBkZXRlY3RlZC4gQ29uc2lkZXIgYWRkaW5nIGEgbmFtZSwgaWQsIF9rZXksIG9yIF9yZWYgYXR0ciB0byBhdm9pZCBhY2NpZGVudGFsIERPTSByZWN5Y2xpbmcgYmV0d2VlbiBkaWZmZXJlbnQgPGlucHV0PiB0eXBlcy5cIiwgdm5vZGVdO1xuXHR9LFxuXG5cdFVOTU9VTlRFRF9SRURSQVc6IGZ1bmN0aW9uKHZtKSB7XG5cdFx0cmV0dXJuIFtcIkludm9raW5nIHJlZHJhdygpIG9mIGFuIHVubW91bnRlZCAoc3ViKXZpZXcgbWF5IHJlc3VsdCBpbiBlcnJvcnMuXCIsIHZtXTtcblx0fSxcblxuXHRJTkxJTkVfSEFORExFUjogZnVuY3Rpb24odm5vZGUsIG92YWwsIG52YWwpIHtcblx0XHRyZXR1cm4gW1wiQW5vbnltb3VzIGV2ZW50IGhhbmRsZXJzIGdldCByZS1ib3VuZCBvbiBlYWNoIHJlZHJhdywgY29uc2lkZXIgZGVmaW5pbmcgdGhlbSBvdXRzaWRlIG9mIHRlbXBsYXRlcyBmb3IgYmV0dGVyIHJldXNlLlwiLCB2bm9kZSwgb3ZhbCwgbnZhbF07XG5cdH0sXG5cblx0TUlTTUFUQ0hFRF9IQU5ETEVSOiBmdW5jdGlvbih2bm9kZSwgb3ZhbCwgbnZhbCkge1xuXHRcdHJldHVybiBbXCJQYXRjaGluZyBvZiBkaWZmZXJlbnQgZXZlbnQgaGFuZGxlciBzdHlsZXMgaXMgbm90IGZ1bGx5IHN1cHBvcnRlZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29ucy4gRW5zdXJlIHRoYXQgaGFuZGxlcnMgYXJlIGRlZmluZWQgdXNpbmcgdGhlIHNhbWUgc3R5bGUuXCIsIHZub2RlLCBvdmFsLCBudmFsXTtcblx0fSxcblxuXHRTVkdfV1JPTkdfRkFDVE9SWTogZnVuY3Rpb24odm5vZGUpIHtcblx0XHRyZXR1cm4gW1wiPHN2Zz4gZGVmaW5lZCB1c2luZyBkb212bS5kZWZpbmVFbGVtZW50LiBVc2UgZG9tdm0uZGVmaW5lU3ZnRWxlbWVudCBmb3IgPHN2Zz4gJiBjaGlsZCBub2Rlcy5cIiwgdm5vZGVdO1xuXHR9LFxuXG5cdEZPUkVJR05fRUxFTUVOVDogZnVuY3Rpb24oZWwpIHtcblx0XHRyZXR1cm4gW1wiZG9tdm0gc3R1bWJsZWQgdXBvbiBhbiBlbGVtZW50IGluIGl0cyBET00gdGhhdCBpdCBkaWRuJ3QgY3JlYXRlLCB3aGljaCBtYXkgYmUgcHJvYmxlbWF0aWMuIFlvdSBjYW4gaW5qZWN0IGV4dGVybmFsIGVsZW1lbnRzIGludG8gdGhlIHZ0cmVlIHVzaW5nIGRvbXZtLmluamVjdEVsZW1lbnQuXCIsIGVsXTtcblx0fSxcblxuXHRSRVVTRURfQVRUUlM6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0cmV0dXJuIFtcIkF0dHJzIG9iamVjdHMgbWF5IG9ubHkgYmUgcmV1c2VkIGlmIHRoZXkgYXJlIHRydWx5IHN0YXRpYywgYXMgYSBwZXJmIG9wdGltaXphdGlvbi4gTXV0YXRpbmcgJiByZXVzaW5nIHRoZW0gd2lsbCBoYXZlIG5vIGVmZmVjdCBvbiB0aGUgRE9NIGR1ZSB0byAwIGRpZmYuXCIsIHZub2RlXTtcblx0fSxcblxuXHRBREpBQ0VOVF9URVhUOiBmdW5jdGlvbih2bm9kZSwgdGV4dDEsIHRleHQyKSB7XG5cdFx0cmV0dXJuIFtcIkFkamFjZW50IHRleHQgbm9kZXMgd2lsbCBiZSBtZXJnZWQuIENvbnNpZGVyIGNvbmNhdGVudGF0aW5nIHRoZW0geW91cnNlbGYgaW4gdGhlIHRlbXBsYXRlIGZvciBpbXByb3ZlZCBwZXJmLlwiLCB2bm9kZSwgdGV4dDEsIHRleHQyXTtcblx0fSxcblxuXHRBUlJBWV9GTEFUVEVORUQ6IGZ1bmN0aW9uKHZub2RlLCBhcnJheSkge1xuXHRcdHJldHVybiBbXCJBcnJheXMgd2l0aGluIHRlbXBsYXRlcyB3aWxsIGJlIGZsYXR0ZW5lZC4gV2hlbiB0aGV5IGFyZSBsZWFkaW5nIG9yIHRyYWlsaW5nLCBpdCdzIGVhc3kgYW5kIG1vcmUgcGVyZm9ybWFudCB0byBqdXN0IC5jb25jYXQoKSB0aGVtIGluIHRoZSB0ZW1wbGF0ZS5cIiwgdm5vZGUsIGFycmF5XTtcblx0fSxcblxuXHRBTFJFQURZX0hZRFJBVEVEOiBmdW5jdGlvbih2bSkge1xuXHRcdHJldHVybiBbXCJBIGNoaWxkIHZpZXcgZmFpbGVkIHRvIG1vdW50IGJlY2F1c2UgaXQgd2FzIGFscmVhZHkgaHlkcmF0ZWQuIE1ha2Ugc3VyZSBub3QgdG8gaW52b2tlIHZtLnJlZHJhdygpIG9yIHZtLnVwZGF0ZSgpIG9uIHVubW91bnRlZCB2aWV3cy5cIiwgdm1dO1xuXHR9LFxuXG5cdEFUVEFDSF9JTVBMSUNJVF9UQk9EWTogZnVuY3Rpb24odm5vZGUsIHZjaGlsZCkge1xuXHRcdHJldHVybiBbXCI8dGFibGU+PHRyPiB3YXMgZGV0ZWN0ZWQgaW4gdGhlIHZ0cmVlLCBidXQgdGhlIERPTSB3aWxsIGJlIDx0YWJsZT48dGJvZHk+PHRyPiBhZnRlciBIVE1MJ3MgaW1wbGljaXQgcGFyc2luZy4gWW91IHNob3VsZCBjcmVhdGUgdGhlIDx0Ym9keT4gdm5vZGUgZXhwbGljaXRseSB0byBhdm9pZCBTU1IvYXR0YWNoKCkgZmFpbHVyZXMuXCIsIHZub2RlLCB2Y2hpbGRdO1xuXHR9XG59O1xuXG5mdW5jdGlvbiBkZXZOb3RpZnkoa2V5LCBhcmdzKSB7XG5cdGlmIChERVZNT0RFLndhcm5pbmdzICYmIGlzRnVuYyhERVZNT0RFW2tleV0pKSB7XG5cdFx0dmFyIG1zZ0FyZ3MgPSBERVZNT0RFW2tleV0uYXBwbHkobnVsbCwgYXJncyk7XG5cblx0XHRpZiAobXNnQXJncykge1xuXHRcdFx0bXNnQXJnc1swXSA9IGtleSArIFwiOiBcIiArIChERVZNT0RFLnZlcmJvc2UgPyBtc2dBcmdzWzBdIDogXCJcIik7XG5cdFx0XHRjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgbXNnQXJncyk7XG5cdFx0fVxuXHR9XG59XG5cbi8vIChkZSlvcHRpbWl6YXRpb24gZmxhZ3NcblxuLy8gZm9yY2VzIHNsb3cgYm90dG9tLXVwIHJlbW92ZUNoaWxkIHRvIGZpcmUgZGVlcCB3aWxsUmVtb3ZlL3dpbGxVbm1vdW50IGhvb2tzLFxudmFyIERFRVBfUkVNT1ZFID0gMTtcbi8vIHByZXZlbnRzIGluc2VydGluZy9yZW1vdmluZy9yZW9yZGVyaW5nIG9mIGNoaWxkcmVuXG52YXIgRklYRURfQk9EWSA9IDI7XG4vLyBlbmFibGVzIGZhc3Qga2V5ZWQgbG9va3VwIG9mIGNoaWxkcmVuIHZpYSBiaW5hcnkgc2VhcmNoLCBleHBlY3RzIGhvbW9nZW5lb3VzIGtleWVkIGJvZHlcbnZhciBLRVlFRF9MSVNUID0gNDtcbi8vIGluZGljYXRlcyBhbiB2bm9kZSBtYXRjaC9kaWZmL3JlY3ljbGVyIGZ1bmN0aW9uIGZvciBib2R5XG52YXIgTEFaWV9MSVNUID0gODtcblxuZnVuY3Rpb24gaW5pdEVsZW1lbnROb2RlKHRhZywgYXR0cnMsIGJvZHksIGZsYWdzKSB7XG5cdHZhciBub2RlID0gbmV3IFZOb2RlO1xuXG5cdG5vZGUudHlwZSA9IEVMRU1FTlQ7XG5cblx0aWYgKGlzU2V0KGZsYWdzKSlcblx0XHR7IG5vZGUuZmxhZ3MgPSBmbGFnczsgfVxuXG5cdG5vZGUuYXR0cnMgPSBhdHRycztcblxuXHR2YXIgcGFyc2VkID0gY3NzVGFnKHRhZyk7XG5cblx0bm9kZS50YWcgPSBwYXJzZWQudGFnO1xuXG5cdC8vIG1laCwgd2VhayBhc3NlcnRpb24sIHdpbGwgZmFpbCBmb3IgaWQ9MCwgZXRjLlxuXHRpZiAocGFyc2VkLmlkIHx8IHBhcnNlZC5jbGFzcyB8fCBwYXJzZWQuYXR0cnMpIHtcblx0XHR2YXIgcCA9IG5vZGUuYXR0cnMgfHwge307XG5cblx0XHRpZiAocGFyc2VkLmlkICYmICFpc1NldChwLmlkKSlcblx0XHRcdHsgcC5pZCA9IHBhcnNlZC5pZDsgfVxuXG5cdFx0aWYgKHBhcnNlZC5jbGFzcykge1xuXHRcdFx0bm9kZS5fY2xhc3MgPSBwYXJzZWQuY2xhc3M7XHRcdC8vIHN0YXRpYyBjbGFzc1xuXHRcdFx0cC5jbGFzcyA9IHBhcnNlZC5jbGFzcyArIChpc1NldChwLmNsYXNzKSA/IChcIiBcIiArIHAuY2xhc3MpIDogXCJcIik7XG5cdFx0fVxuXHRcdGlmIChwYXJzZWQuYXR0cnMpIHtcblx0XHRcdGZvciAodmFyIGtleSBpbiBwYXJzZWQuYXR0cnMpXG5cdFx0XHRcdHsgaWYgKCFpc1NldChwW2tleV0pKVxuXHRcdFx0XHRcdHsgcFtrZXldID0gcGFyc2VkLmF0dHJzW2tleV07IH0gfVxuXHRcdH1cblxuLy9cdFx0aWYgKG5vZGUuYXR0cnMgIT09IHApXG5cdFx0XHRub2RlLmF0dHJzID0gcDtcblx0fVxuXG5cdHZhciBtZXJnZWRBdHRycyA9IG5vZGUuYXR0cnM7XG5cblx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzKSkge1xuXHRcdGlmIChpc1NldChtZXJnZWRBdHRycy5fa2V5KSlcblx0XHRcdHsgbm9kZS5rZXkgPSBtZXJnZWRBdHRycy5fa2V5OyB9XG5cblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX3JlZikpXG5cdFx0XHR7IG5vZGUucmVmID0gbWVyZ2VkQXR0cnMuX3JlZjsgfVxuXG5cdFx0aWYgKGlzU2V0KG1lcmdlZEF0dHJzLl9ob29rcykpXG5cdFx0XHR7IG5vZGUuaG9va3MgPSBtZXJnZWRBdHRycy5faG9va3M7IH1cblxuXHRcdGlmIChpc1NldChtZXJnZWRBdHRycy5fZGF0YSkpXG5cdFx0XHR7IG5vZGUuZGF0YSA9IG1lcmdlZEF0dHJzLl9kYXRhOyB9XG5cblx0XHRpZiAoaXNTZXQobWVyZ2VkQXR0cnMuX2ZsYWdzKSlcblx0XHRcdHsgbm9kZS5mbGFncyA9IG1lcmdlZEF0dHJzLl9mbGFnczsgfVxuXG5cdFx0aWYgKCFpc1NldChub2RlLmtleSkpIHtcblx0XHRcdGlmIChpc1NldChub2RlLnJlZikpXG5cdFx0XHRcdHsgbm9kZS5rZXkgPSBub2RlLnJlZjsgfVxuXHRcdFx0ZWxzZSBpZiAoaXNTZXQobWVyZ2VkQXR0cnMuaWQpKVxuXHRcdFx0XHR7IG5vZGUua2V5ID0gbWVyZ2VkQXR0cnMuaWQ7IH1cblx0XHRcdGVsc2UgaWYgKGlzU2V0KG1lcmdlZEF0dHJzLm5hbWUpKVxuXHRcdFx0XHR7IG5vZGUua2V5ID0gbWVyZ2VkQXR0cnMubmFtZSArIChtZXJnZWRBdHRycy50eXBlID09PSBcInJhZGlvXCIgfHwgbWVyZ2VkQXR0cnMudHlwZSA9PT0gXCJjaGVja2JveFwiID8gbWVyZ2VkQXR0cnMudmFsdWUgOiBcIlwiKTsgfVxuXHRcdH1cblx0fVxuXG5cdGlmIChib2R5ICE9IG51bGwpXG5cdFx0eyBub2RlLmJvZHkgPSBib2R5OyB9XG5cblx0e1xuXHRcdGlmIChub2RlLnRhZyA9PT0gXCJzdmdcIikge1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdFx0bm9kZS5ucyA9PSBudWxsICYmIGRldk5vdGlmeShcIlNWR19XUk9OR19GQUNUT1JZXCIsIFtub2RlXSk7XG5cdFx0XHR9LCAxNik7XG5cdFx0fVxuXHRcdC8vIHRvZG86IGF0dHJzLmNvbnRlbnRlZGl0YWJsZSA9PT0gXCJ0cnVlXCI/XG5cdFx0ZWxzZSBpZiAoL14oPzppbnB1dHx0ZXh0YXJlYXxzZWxlY3R8ZGF0YWxpc3R8a2V5Z2VufG91dHB1dCkkLy50ZXN0KG5vZGUudGFnKSAmJiBub2RlLmtleSA9PSBudWxsKVxuXHRcdFx0eyBkZXZOb3RpZnkoXCJVTktFWUVEX0lOUFVUXCIsIFtub2RlXSk7IH1cblx0fVxuXG5cdHJldHVybiBub2RlO1xufVxuXG5mdW5jdGlvbiBzZXRSZWYodm0sIG5hbWUsIG5vZGUpIHtcblx0dmFyIHBhdGggPSBbXCJyZWZzXCJdLmNvbmNhdChuYW1lLnNwbGl0KFwiLlwiKSk7XG5cdGRlZXBTZXQodm0sIHBhdGgsIG5vZGUpO1xufVxuXG5mdW5jdGlvbiBzZXREZWVwUmVtb3ZlKG5vZGUpIHtcblx0d2hpbGUgKG5vZGUgPSBub2RlLnBhcmVudClcblx0XHR7IG5vZGUuZmxhZ3MgfD0gREVFUF9SRU1PVkU7IH1cbn1cblxuLy8gdm5ldywgdm9sZFxuZnVuY3Rpb24gcHJlUHJvYyh2bmV3LCBwYXJlbnQsIGlkeCwgb3duVm0pIHtcblx0aWYgKHZuZXcudHlwZSA9PT0gVk1PREVMIHx8IHZuZXcudHlwZSA9PT0gVlZJRVcpXG5cdFx0eyByZXR1cm47IH1cblxuXHR2bmV3LnBhcmVudCA9IHBhcmVudDtcblx0dm5ldy5pZHggPSBpZHg7XG5cdHZuZXcudm0gPSBvd25WbTtcblxuXHRpZiAodm5ldy5yZWYgIT0gbnVsbClcblx0XHR7IHNldFJlZihnZXRWbSh2bmV3KSwgdm5ldy5yZWYsIHZuZXcpOyB9XG5cblx0dmFyIG5oID0gdm5ldy5ob29rcyxcblx0XHR2aCA9IG93blZtICYmIG93blZtLmhvb2tzO1xuXG5cdGlmIChuaCAmJiAobmgud2lsbFJlbW92ZSB8fCBuaC5kaWRSZW1vdmUpIHx8XG5cdFx0dmggJiYgKHZoLndpbGxVbm1vdW50IHx8IHZoLmRpZFVubW91bnQpKVxuXHRcdHsgc2V0RGVlcFJlbW92ZSh2bmV3KTsgfVxuXG5cdGlmIChpc0Fycih2bmV3LmJvZHkpKVxuXHRcdHsgcHJlUHJvY0JvZHkodm5ldyk7IH1cblx0ZWxzZSB7XG5cdFx0aWYgKGlzU3RyZWFtKHZuZXcuYm9keSkpXG5cdFx0XHR7IHZuZXcuYm9keSA9IGhvb2tTdHJlYW0odm5ldy5ib2R5LCBnZXRWbSh2bmV3KSk7IH1cblx0fVxufVxuXG5mdW5jdGlvbiBwcmVQcm9jQm9keSh2bmV3KSB7XG5cdHZhciBib2R5ID0gdm5ldy5ib2R5O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBub2RlMiA9IGJvZHlbaV07XG5cblx0XHQvLyByZW1vdmUgZmFsc2UvbnVsbC91bmRlZmluZWRcblx0XHRpZiAobm9kZTIgPT09IGZhbHNlIHx8IG5vZGUyID09IG51bGwpXG5cdFx0XHR7IGJvZHkuc3BsaWNlKGktLSwgMSk7IH1cblx0XHQvLyBmbGF0dGVuIGFycmF5c1xuXHRcdGVsc2UgaWYgKGlzQXJyKG5vZGUyKSkge1xuXHRcdFx0e1xuXHRcdFx0XHRpZiAoaSA9PT0gMCB8fCBpID09PSBib2R5Lmxlbmd0aCAtIDEpXG5cdFx0XHRcdFx0eyBkZXZOb3RpZnkoXCJBUlJBWV9GTEFUVEVORURcIiwgW3ZuZXcsIG5vZGUyXSk7IH1cblx0XHRcdH1cblx0XHRcdGluc2VydEFycihib2R5LCBub2RlMiwgaS0tLCAxKTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHRpZiAobm9kZTIudHlwZSA9PSBudWxsKVxuXHRcdFx0XHR7IGJvZHlbaV0gPSBub2RlMiA9IGRlZmluZVRleHQoXCJcIitub2RlMik7IH1cblxuXHRcdFx0aWYgKG5vZGUyLnR5cGUgPT09IFRFWFQpIHtcblx0XHRcdFx0Ly8gcmVtb3ZlIGVtcHR5IHRleHQgbm9kZXNcblx0XHRcdFx0aWYgKG5vZGUyLmJvZHkgPT0gbnVsbCB8fCBub2RlMi5ib2R5ID09PSBcIlwiKVxuXHRcdFx0XHRcdHsgYm9keS5zcGxpY2UoaS0tLCAxKTsgfVxuXHRcdFx0XHQvLyBtZXJnZSB3aXRoIHByZXZpb3VzIHRleHQgbm9kZVxuXHRcdFx0XHRlbHNlIGlmIChpID4gMCAmJiBib2R5W2ktMV0udHlwZSA9PT0gVEVYVCkge1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGRldk5vdGlmeShcIkFESkFDRU5UX1RFWFRcIiwgW3ZuZXcsIGJvZHlbaS0xXS5ib2R5LCBub2RlMi5ib2R5XSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJvZHlbaS0xXS5ib2R5ICs9IG5vZGUyLmJvZHk7XG5cdFx0XHRcdFx0Ym9keS5zcGxpY2UoaS0tLCAxKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0eyBwcmVQcm9jKG5vZGUyLCB2bmV3LCBpLCBudWxsKTsgfVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IHByZVByb2Mobm9kZTIsIHZuZXcsIGksIG51bGwpOyB9XG5cdFx0fVxuXHR9XG59XG5cbnZhciB1bml0bGVzc1Byb3BzID0ge1xuXHRhbmltYXRpb25JdGVyYXRpb25Db3VudDogdHJ1ZSxcblx0Ym94RmxleDogdHJ1ZSxcblx0Ym94RmxleEdyb3VwOiB0cnVlLFxuXHRib3hPcmRpbmFsR3JvdXA6IHRydWUsXG5cdGNvbHVtbkNvdW50OiB0cnVlLFxuXHRmbGV4OiB0cnVlLFxuXHRmbGV4R3JvdzogdHJ1ZSxcblx0ZmxleFBvc2l0aXZlOiB0cnVlLFxuXHRmbGV4U2hyaW5rOiB0cnVlLFxuXHRmbGV4TmVnYXRpdmU6IHRydWUsXG5cdGZsZXhPcmRlcjogdHJ1ZSxcblx0Z3JpZFJvdzogdHJ1ZSxcblx0Z3JpZENvbHVtbjogdHJ1ZSxcblx0b3JkZXI6IHRydWUsXG5cdGxpbmVDbGFtcDogdHJ1ZSxcblxuXHRib3JkZXJJbWFnZU91dHNldDogdHJ1ZSxcblx0Ym9yZGVySW1hZ2VTbGljZTogdHJ1ZSxcblx0Ym9yZGVySW1hZ2VXaWR0aDogdHJ1ZSxcblx0Zm9udFdlaWdodDogdHJ1ZSxcblx0bGluZUhlaWdodDogdHJ1ZSxcblx0b3BhY2l0eTogdHJ1ZSxcblx0b3JwaGFuczogdHJ1ZSxcblx0dGFiU2l6ZTogdHJ1ZSxcblx0d2lkb3dzOiB0cnVlLFxuXHR6SW5kZXg6IHRydWUsXG5cdHpvb206IHRydWUsXG5cblx0ZmlsbE9wYWNpdHk6IHRydWUsXG5cdGZsb29kT3BhY2l0eTogdHJ1ZSxcblx0c3RvcE9wYWNpdHk6IHRydWUsXG5cdHN0cm9rZURhc2hhcnJheTogdHJ1ZSxcblx0c3Ryb2tlRGFzaG9mZnNldDogdHJ1ZSxcblx0c3Ryb2tlTWl0ZXJsaW1pdDogdHJ1ZSxcblx0c3Ryb2tlT3BhY2l0eTogdHJ1ZSxcblx0c3Ryb2tlV2lkdGg6IHRydWVcbn07XG5cbmZ1bmN0aW9uIGF1dG9QeChuYW1lLCB2YWwpIHtcblx0e1xuXHRcdC8vIHR5cGVvZiB2YWwgPT09ICdudW1iZXInIGlzIGZhc3RlciBidXQgZmFpbHMgZm9yIG51bWVyaWMgc3RyaW5nc1xuXHRcdHJldHVybiAhaXNOYU4odmFsKSAmJiAhdW5pdGxlc3NQcm9wc1tuYW1lXSA/ICh2YWwgKyBcInB4XCIpIDogdmFsO1xuXHR9XG59XG5cbi8vIGFzc3VtZXMgaWYgc3R5bGVzIGV4aXN0IGJvdGggYXJlIG9iamVjdHMgb3IgYm90aCBhcmUgc3RyaW5nc1xuZnVuY3Rpb24gcGF0Y2hTdHlsZShuLCBvKSB7XG5cdHZhciBucyA9ICAgICAobi5hdHRycyB8fCBlbXB0eU9iaikuc3R5bGU7XG5cdHZhciBvcyA9IG8gPyAoby5hdHRycyB8fCBlbXB0eU9iaikuc3R5bGUgOiBudWxsO1xuXG5cdC8vIHJlcGxhY2Ugb3IgcmVtb3ZlIGluIGZ1bGxcblx0aWYgKG5zID09IG51bGwgfHwgaXNWYWwobnMpKVxuXHRcdHsgbi5lbC5zdHlsZS5jc3NUZXh0ID0gbnM7IH1cblx0ZWxzZSB7XG5cdFx0Zm9yICh2YXIgbm4gaW4gbnMpIHtcblx0XHRcdHZhciBudiA9IG5zW25uXTtcblxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoaXNTdHJlYW0obnYpKVxuXHRcdFx0XHRcdHsgbnYgPSBob29rU3RyZWFtKG52LCBnZXRWbShuKSk7IH1cblx0XHRcdH1cblxuXHRcdFx0aWYgKG9zID09IG51bGwgfHwgbnYgIT0gbnVsbCAmJiBudiAhPT0gb3Nbbm5dKVxuXHRcdFx0XHR7IG4uZWwuc3R5bGVbbm5dID0gYXV0b1B4KG5uLCBudik7IH1cblx0XHR9XG5cblx0XHQvLyBjbGVhbiBvbGRcblx0XHRpZiAob3MpIHtcblx0XHRcdGZvciAodmFyIG9uIGluIG9zKSB7XG5cdFx0XHRcdGlmIChuc1tvbl0gPT0gbnVsbClcblx0XHRcdFx0XHR7IG4uZWwuc3R5bGVbb25dID0gXCJcIjsgfVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG52YXIgZGlkUXVldWUgPSBbXTtcblxuZnVuY3Rpb24gZmlyZUhvb2soaG9va3MsIG5hbWUsIG8sIG4sIGltbWVkaWF0ZSkge1xuXHRpZiAoaG9va3MgIT0gbnVsbCkge1xuXHRcdHZhciBmbiA9IG8uaG9va3NbbmFtZV07XG5cblx0XHRpZiAoZm4pIHtcblx0XHRcdGlmIChuYW1lWzBdID09PSBcImRcIiAmJiBuYW1lWzFdID09PSBcImlcIiAmJiBuYW1lWzJdID09PSBcImRcIikge1x0Ly8gZGlkKlxuXHRcdFx0XHQvL1x0Y29uc29sZS5sb2cobmFtZSArIFwiIHNob3VsZCBxdWV1ZSB0aWxsIHJlcGFpbnRcIiwgbywgbik7XG5cdFx0XHRcdGltbWVkaWF0ZSA/IHJlcGFpbnQoby5wYXJlbnQpICYmIGZuKG8sIG4pIDogZGlkUXVldWUucHVzaChbZm4sIG8sIG5dKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1x0XHQvLyB3aWxsKlxuXHRcdFx0XHQvL1x0Y29uc29sZS5sb2cobmFtZSArIFwiIG1heSBkZWxheSBieSBwcm9taXNlXCIsIG8sIG4pO1xuXHRcdFx0XHRyZXR1cm4gZm4obywgbik7XHRcdC8vIG9yIHBhc3MgIGRvbmUoKSByZXNvbHZlclxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBkcmFpbkRpZEhvb2tzKHZtKSB7XG5cdGlmIChkaWRRdWV1ZS5sZW5ndGgpIHtcblx0XHRyZXBhaW50KHZtLm5vZGUpO1xuXG5cdFx0dmFyIGl0ZW07XG5cdFx0d2hpbGUgKGl0ZW0gPSBkaWRRdWV1ZS5zaGlmdCgpKVxuXHRcdFx0eyBpdGVtWzBdKGl0ZW1bMV0sIGl0ZW1bMl0pOyB9XG5cdH1cbn1cblxudmFyIGRvYyA9IEVOVl9ET00gPyBkb2N1bWVudCA6IG51bGw7XG5cbmZ1bmN0aW9uIGNsb3Nlc3RWTm9kZShlbCkge1xuXHR3aGlsZSAoZWwuX25vZGUgPT0gbnVsbClcblx0XHR7IGVsID0gZWwucGFyZW50Tm9kZTsgfVxuXHRyZXR1cm4gZWwuX25vZGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBucykge1xuXHRpZiAobnMgIT0gbnVsbClcblx0XHR7IHJldHVybiBkb2MuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWcpOyB9XG5cdHJldHVybiBkb2MuY3JlYXRlRWxlbWVudCh0YWcpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUZXh0Tm9kZShib2R5KSB7XG5cdHJldHVybiBkb2MuY3JlYXRlVGV4dE5vZGUoYm9keSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbW1lbnQoYm9keSkge1xuXHRyZXR1cm4gZG9jLmNyZWF0ZUNvbW1lbnQoYm9keSk7XG59XG5cbi8vID8gcmVtb3ZlcyBpZiAhcmVjeWNsZWRcbmZ1bmN0aW9uIG5leHRTaWIoc2liKSB7XG5cdHJldHVybiBzaWIubmV4dFNpYmxpbmc7XG59XG5cbi8vID8gcmVtb3ZlcyBpZiAhcmVjeWNsZWRcbmZ1bmN0aW9uIHByZXZTaWIoc2liKSB7XG5cdHJldHVybiBzaWIucHJldmlvdXNTaWJsaW5nO1xufVxuXG4vLyBUT0RPOiB0aGlzIHNob3VsZCBjb2xsZWN0IGFsbCBkZWVwIHByb21zIGZyb20gYWxsIGhvb2tzIGFuZCByZXR1cm4gUHJvbWlzZS5hbGwoKVxuZnVuY3Rpb24gZGVlcE5vdGlmeVJlbW92ZShub2RlKSB7XG5cdHZhciB2bSA9IG5vZGUudm07XG5cblx0dmFyIHd1UmVzID0gdm0gIT0gbnVsbCAmJiBmaXJlSG9vayh2bS5ob29rcywgXCJ3aWxsVW5tb3VudFwiLCB2bSwgdm0uZGF0YSk7XG5cblx0dmFyIHdyUmVzID0gZmlyZUhvb2sobm9kZS5ob29rcywgXCJ3aWxsUmVtb3ZlXCIsIG5vZGUpO1xuXG5cdGlmICgobm9kZS5mbGFncyAmIERFRVBfUkVNT1ZFKSA9PT0gREVFUF9SRU1PVkUgJiYgaXNBcnIobm9kZS5ib2R5KSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5ib2R5Lmxlbmd0aDsgaSsrKVxuXHRcdFx0eyBkZWVwTm90aWZ5UmVtb3ZlKG5vZGUuYm9keVtpXSk7IH1cblx0fVxuXG5cdHJldHVybiB3dVJlcyB8fCB3clJlcztcbn1cblxuZnVuY3Rpb24gX3JlbW92ZUNoaWxkKHBhckVsLCBlbCwgaW1tZWRpYXRlKSB7XG5cdHZhciBub2RlID0gZWwuX25vZGUsIHZtID0gbm9kZS52bTtcblxuXHRpZiAoaXNBcnIobm9kZS5ib2R5KSkge1xuXHRcdGlmICgobm9kZS5mbGFncyAmIERFRVBfUkVNT1ZFKSA9PT0gREVFUF9SRU1PVkUpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5ib2R5Lmxlbmd0aDsgaSsrKVxuXHRcdFx0XHR7IF9yZW1vdmVDaGlsZChlbCwgbm9kZS5ib2R5W2ldLmVsKTsgfVxuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR7IGRlZXBVbnJlZihub2RlKTsgfVxuXHR9XG5cblx0ZGVsZXRlIGVsLl9ub2RlO1xuXG5cdHBhckVsLnJlbW92ZUNoaWxkKGVsKTtcblxuXHRmaXJlSG9vayhub2RlLmhvb2tzLCBcImRpZFJlbW92ZVwiLCBub2RlLCBudWxsLCBpbW1lZGlhdGUpO1xuXG5cdGlmICh2bSAhPSBudWxsKSB7XG5cdFx0ZmlyZUhvb2sodm0uaG9va3MsIFwiZGlkVW5tb3VudFwiLCB2bSwgdm0uZGF0YSwgaW1tZWRpYXRlKTtcblx0XHR2bS5ub2RlID0gbnVsbDtcblx0fVxufVxuXG4vLyB0b2RvOiBzaG91bGQgZGVsYXkgcGFyZW50IHVubW91bnQoKSBieSByZXR1cm5pbmcgcmVzIHByb20/XG5mdW5jdGlvbiByZW1vdmVDaGlsZChwYXJFbCwgZWwpIHtcblx0dmFyIG5vZGUgPSBlbC5fbm9kZTtcblxuXHQvLyBhbHJlYWR5IG1hcmtlZCBmb3IgcmVtb3ZhbFxuXHRpZiAobm9kZS5fZGVhZCkgeyByZXR1cm47IH1cblxuXHR2YXIgcmVzID0gZGVlcE5vdGlmeVJlbW92ZShub2RlKTtcblxuXHRpZiAocmVzICE9IG51bGwgJiYgaXNQcm9tKHJlcykpIHtcblx0XHRub2RlLl9kZWFkID0gdHJ1ZTtcblx0XHRyZXMudGhlbihjdXJyeShfcmVtb3ZlQ2hpbGQsIFtwYXJFbCwgZWwsIHRydWVdKSk7XG5cdH1cblx0ZWxzZVxuXHRcdHsgX3JlbW92ZUNoaWxkKHBhckVsLCBlbCk7IH1cbn1cblxuZnVuY3Rpb24gZGVlcFVucmVmKG5vZGUpIHtcblx0dmFyIG9ib2R5ID0gbm9kZS5ib2R5O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgb2JvZHkubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgbzIgPSBvYm9keVtpXTtcblx0XHRkZWxldGUgbzIuZWwuX25vZGU7XG5cblx0XHRpZiAobzIudm0gIT0gbnVsbClcblx0XHRcdHsgbzIudm0ubm9kZSA9IG51bGw7IH1cblxuXHRcdGlmIChpc0FycihvMi5ib2R5KSlcblx0XHRcdHsgZGVlcFVucmVmKG8yKTsgfVxuXHR9XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ2hpbGRyZW4ocGFyZW50KSB7XG5cdHZhciBwYXJFbCA9IHBhcmVudC5lbDtcblxuXHRpZiAoKHBhcmVudC5mbGFncyAmIERFRVBfUkVNT1ZFKSA9PT0gMCkge1xuXHRcdGlzQXJyKHBhcmVudC5ib2R5KSAmJiBkZWVwVW5yZWYocGFyZW50KTtcblx0XHRwYXJFbC50ZXh0Q29udGVudCA9IG51bGw7XG5cdH1cblx0ZWxzZSB7XG5cdFx0dmFyIGVsID0gcGFyRWwuZmlyc3RDaGlsZDtcblxuXHRcdGRvIHtcblx0XHRcdHZhciBuZXh0ID0gbmV4dFNpYihlbCk7XG5cdFx0XHRyZW1vdmVDaGlsZChwYXJFbCwgZWwpO1xuXHRcdH0gd2hpbGUgKGVsID0gbmV4dCk7XG5cdH1cbn1cblxuLy8gdG9kbzogaG9va3NcbmZ1bmN0aW9uIGluc2VydEJlZm9yZShwYXJFbCwgZWwsIHJlZkVsKSB7XG5cdHZhciBub2RlID0gZWwuX25vZGUsIGluRG9tID0gZWwucGFyZW50Tm9kZSAhPSBudWxsO1xuXG5cdC8vIGVsID09PSByZWZFbCBpcyBhc3NlcnRlZCBhcyBhIG5vLW9wIGluc2VydCBjYWxsZWQgdG8gZmlyZSBob29rc1xuXHR2YXIgdm0gPSAoZWwgPT09IHJlZkVsIHx8ICFpbkRvbSkgPyBub2RlLnZtIDogbnVsbDtcblxuXHRpZiAodm0gIT0gbnVsbClcblx0XHR7IGZpcmVIb29rKHZtLmhvb2tzLCBcIndpbGxNb3VudFwiLCB2bSwgdm0uZGF0YSk7IH1cblxuXHRmaXJlSG9vayhub2RlLmhvb2tzLCBpbkRvbSA/IFwid2lsbFJlaW5zZXJ0XCIgOiBcIndpbGxJbnNlcnRcIiwgbm9kZSk7XG5cdHBhckVsLmluc2VydEJlZm9yZShlbCwgcmVmRWwpO1xuXHRmaXJlSG9vayhub2RlLmhvb2tzLCBpbkRvbSA/IFwiZGlkUmVpbnNlcnRcIiA6IFwiZGlkSW5zZXJ0XCIsIG5vZGUpO1xuXG5cdGlmICh2bSAhPSBudWxsKVxuXHRcdHsgZmlyZUhvb2sodm0uaG9va3MsIFwiZGlkTW91bnRcIiwgdm0sIHZtLmRhdGEpOyB9XG59XG5cbmZ1bmN0aW9uIGluc2VydEFmdGVyKHBhckVsLCBlbCwgcmVmRWwpIHtcblx0aW5zZXJ0QmVmb3JlKHBhckVsLCBlbCwgcmVmRWwgPyBuZXh0U2liKHJlZkVsKSA6IG51bGwpO1xufVxuXG52YXIgb25lbWl0ID0ge307XG5cbmZ1bmN0aW9uIGVtaXRDZmcoY2ZnKSB7XG5cdGFzc2lnbk9iaihvbmVtaXQsIGNmZyk7XG59XG5cbmZ1bmN0aW9uIGVtaXQoZXZOYW1lKSB7XG5cdHZhciB0YXJnID0gdGhpcyxcblx0XHRzcmMgPSB0YXJnO1xuXG5cdHZhciBhcmdzID0gc2xpY2VBcmdzKGFyZ3VtZW50cywgMSkuY29uY2F0KHNyYywgc3JjLmRhdGEpO1xuXG5cdGRvIHtcblx0XHR2YXIgZXZzID0gdGFyZy5vbmVtaXQ7XG5cdFx0dmFyIGZuID0gZXZzID8gZXZzW2V2TmFtZV0gOiBudWxsO1xuXG5cdFx0aWYgKGZuKSB7XG5cdFx0XHRmbi5hcHBseSh0YXJnLCBhcmdzKTtcblx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fSB3aGlsZSAodGFyZyA9IHRhcmcucGFyZW50KCkpO1xuXG5cdGlmIChvbmVtaXRbZXZOYW1lXSlcblx0XHR7IG9uZW1pdFtldk5hbWVdLmFwcGx5KHRhcmcsIGFyZ3MpOyB9XG59XG5cbnZhciBvbmV2ZW50ID0gbm9vcDtcblxuZnVuY3Rpb24gY29uZmlnKG5ld0NmZykge1xuXHRvbmV2ZW50ID0gbmV3Q2ZnLm9uZXZlbnQgfHwgb25ldmVudDtcblxuXHR7XG5cdFx0aWYgKG5ld0NmZy5vbmVtaXQpXG5cdFx0XHR7IGVtaXRDZmcobmV3Q2ZnLm9uZW1pdCk7IH1cblx0fVxuXG5cdHtcblx0XHRpZiAobmV3Q2ZnLnN0cmVhbSlcblx0XHRcdHsgc3RyZWFtQ2ZnKG5ld0NmZy5zdHJlYW0pOyB9XG5cdH1cbn1cblxuZnVuY3Rpb24gYmluZEV2KGVsLCB0eXBlLCBmbikge1xuXHRlbFt0eXBlXSA9IGZuO1xufVxuXG5mdW5jdGlvbiBleGVjKGZuLCBhcmdzLCBlLCBub2RlLCB2bSkge1xuXHR2YXIgb3V0ID0gZm4uYXBwbHkodm0sIGFyZ3MuY29uY2F0KFtlLCBub2RlLCB2bSwgdm0uZGF0YV0pKTtcblxuXHQvLyBzaG91bGQgdGhlc2UgcmVzcGVjdCBvdXQgPT09IGZhbHNlP1xuXHR2bS5vbmV2ZW50KGUsIG5vZGUsIHZtLCB2bS5kYXRhLCBhcmdzKTtcblx0b25ldmVudC5jYWxsKG51bGwsIGUsIG5vZGUsIHZtLCB2bS5kYXRhLCBhcmdzKTtcblxuXHRpZiAob3V0ID09PSBmYWxzZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRlLnN0b3BQcm9wYWdhdGlvbigpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZShlKSB7XG5cdHZhciBub2RlID0gY2xvc2VzdFZOb2RlKGUudGFyZ2V0KTtcblx0dmFyIHZtID0gZ2V0Vm0obm9kZSk7XG5cblx0dmFyIGV2RGVmID0gZS5jdXJyZW50VGFyZ2V0Ll9ub2RlLmF0dHJzW1wib25cIiArIGUudHlwZV0sIGZuLCBhcmdzO1xuXG5cdGlmIChpc0FycihldkRlZikpIHtcblx0XHRmbiA9IGV2RGVmWzBdO1xuXHRcdGFyZ3MgPSBldkRlZi5zbGljZSgxKTtcblx0XHRleGVjKGZuLCBhcmdzLCBlLCBub2RlLCB2bSk7XG5cdH1cblx0ZWxzZSB7XG5cdFx0Zm9yICh2YXIgc2VsIGluIGV2RGVmKSB7XG5cdFx0XHRpZiAoZS50YXJnZXQubWF0Y2hlcyhzZWwpKSB7XG5cdFx0XHRcdHZhciBldkRlZjIgPSBldkRlZltzZWxdO1xuXG5cdFx0XHRcdGlmIChpc0FycihldkRlZjIpKSB7XG5cdFx0XHRcdFx0Zm4gPSBldkRlZjJbMF07XG5cdFx0XHRcdFx0YXJncyA9IGV2RGVmMi5zbGljZSgxKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRmbiA9IGV2RGVmMjtcblx0XHRcdFx0XHRhcmdzID0gW107XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRleGVjKGZuLCBhcmdzLCBlLCBub2RlLCB2bSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIHBhdGNoRXZlbnQobm9kZSwgbmFtZSwgbnZhbCwgb3ZhbCkge1xuXHRpZiAobnZhbCA9PT0gb3ZhbClcblx0XHR7IHJldHVybjsgfVxuXG5cdHtcblx0XHRpZiAoaXNGdW5jKG52YWwpICYmIGlzRnVuYyhvdmFsKSAmJiBvdmFsLm5hbWUgPT0gbnZhbC5uYW1lKVxuXHRcdFx0eyBkZXZOb3RpZnkoXCJJTkxJTkVfSEFORExFUlwiLCBbbm9kZSwgb3ZhbCwgbnZhbF0pOyB9XG5cblx0XHRpZiAob3ZhbCAhPSBudWxsICYmIG52YWwgIT0gbnVsbCAmJlxuXHRcdFx0KFxuXHRcdFx0XHRpc0FycihvdmFsKSAhPSBpc0FycihudmFsKSB8fFxuXHRcdFx0XHRpc1BsYWluT2JqKG92YWwpICE9IGlzUGxhaW5PYmoobnZhbCkgfHxcblx0XHRcdFx0aXNGdW5jKG92YWwpICE9IGlzRnVuYyhudmFsKVxuXHRcdFx0KVxuXHRcdCkgeyBkZXZOb3RpZnkoXCJNSVNNQVRDSEVEX0hBTkRMRVJcIiwgW25vZGUsIG92YWwsIG52YWxdKTsgfVxuXHR9XG5cblx0dmFyIGVsID0gbm9kZS5lbDtcblxuXHRpZiAobnZhbCA9PSBudWxsIHx8IGlzRnVuYyhudmFsKSlcblx0XHR7IGJpbmRFdihlbCwgbmFtZSwgbnZhbCk7IH1cblx0ZWxzZSBpZiAob3ZhbCA9PSBudWxsKVxuXHRcdHsgYmluZEV2KGVsLCBuYW1lLCBoYW5kbGUpOyB9XG59XG5cbmZ1bmN0aW9uIHJlbUF0dHIobm9kZSwgbmFtZSwgYXNQcm9wKSB7XG5cdGlmIChuYW1lWzBdID09PSBcIi5cIikge1xuXHRcdG5hbWUgPSBuYW1lLnN1YnN0cigxKTtcblx0XHRhc1Byb3AgPSB0cnVlO1xuXHR9XG5cblx0aWYgKGFzUHJvcClcblx0XHR7IG5vZGUuZWxbbmFtZV0gPSBcIlwiOyB9XG5cdGVsc2Vcblx0XHR7IG5vZGUuZWwucmVtb3ZlQXR0cmlidXRlKG5hbWUpOyB9XG59XG5cbi8vIHNldEF0dHJcbi8vIGRpZmYsIFwiLlwiLCBcIm9uKlwiLCBib29sIHZhbHMsIHNraXAgXyosIHZhbHVlL2NoZWNrZWQvc2VsZWN0ZWQgc2VsZWN0ZWRJbmRleFxuZnVuY3Rpb24gc2V0QXR0cihub2RlLCBuYW1lLCB2YWwsIGFzUHJvcCwgaW5pdGlhbCkge1xuXHR2YXIgZWwgPSBub2RlLmVsO1xuXG5cdGlmICh2YWwgPT0gbnVsbClcblx0XHR7ICFpbml0aWFsICYmIHJlbUF0dHIobm9kZSwgbmFtZSwgZmFsc2UpOyB9XHRcdC8vIHdpbGwgYWxzbyByZW1vdmVBdHRyIG9mIHN0eWxlOiBudWxsXG5cdGVsc2UgaWYgKG5vZGUubnMgIT0gbnVsbClcblx0XHR7IGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWwpOyB9XG5cdGVsc2UgaWYgKG5hbWUgPT09IFwiY2xhc3NcIilcblx0XHR7IGVsLmNsYXNzTmFtZSA9IHZhbDsgfVxuXHRlbHNlIGlmIChuYW1lID09PSBcImlkXCIgfHwgdHlwZW9mIHZhbCA9PT0gXCJib29sZWFuXCIgfHwgYXNQcm9wKVxuXHRcdHsgZWxbbmFtZV0gPSB2YWw7IH1cblx0ZWxzZSBpZiAobmFtZVswXSA9PT0gXCIuXCIpXG5cdFx0eyBlbFtuYW1lLnN1YnN0cigxKV0gPSB2YWw7IH1cblx0ZWxzZVxuXHRcdHsgZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbCk7IH1cbn1cblxuZnVuY3Rpb24gcGF0Y2hBdHRycyh2bm9kZSwgZG9ub3IsIGluaXRpYWwpIHtcblx0dmFyIG5hdHRycyA9IHZub2RlLmF0dHJzIHx8IGVtcHR5T2JqO1xuXHR2YXIgb2F0dHJzID0gZG9ub3IuYXR0cnMgfHwgZW1wdHlPYmo7XG5cblx0aWYgKG5hdHRycyA9PT0gb2F0dHJzKSB7XG5cdFx0eyBkZXZOb3RpZnkoXCJSRVVTRURfQVRUUlNcIiwgW3Zub2RlXSk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHRmb3IgKHZhciBrZXkgaW4gbmF0dHJzKSB7XG5cdFx0XHR2YXIgbnZhbCA9IG5hdHRyc1trZXldO1xuXHRcdFx0dmFyIGlzRHluID0gaXNEeW5Qcm9wKHZub2RlLnRhZywga2V5KTtcblx0XHRcdHZhciBvdmFsID0gaXNEeW4gPyB2bm9kZS5lbFtrZXldIDogb2F0dHJzW2tleV07XG5cblx0XHRcdHtcblx0XHRcdFx0aWYgKGlzU3RyZWFtKG52YWwpKVxuXHRcdFx0XHRcdHsgbmF0dHJzW2tleV0gPSBudmFsID0gaG9va1N0cmVhbShudmFsLCBnZXRWbSh2bm9kZSkpOyB9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChudmFsID09PSBvdmFsKSB7fVxuXHRcdFx0ZWxzZSBpZiAoaXNTdHlsZVByb3Aoa2V5KSlcblx0XHRcdFx0eyBwYXRjaFN0eWxlKHZub2RlLCBkb25vcik7IH1cblx0XHRcdGVsc2UgaWYgKGlzU3BsUHJvcChrZXkpKSB7fVxuXHRcdFx0ZWxzZSBpZiAoaXNFdlByb3Aoa2V5KSlcblx0XHRcdFx0eyBwYXRjaEV2ZW50KHZub2RlLCBrZXksIG52YWwsIG92YWwpOyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgc2V0QXR0cih2bm9kZSwga2V5LCBudmFsLCBpc0R5biwgaW5pdGlhbCk7IH1cblx0XHR9XG5cblx0XHQvLyBUT0RPOiBiZW5jaCBzdHlsZS5jc3NUZXh0ID0gXCJcIiB2cyByZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKVxuXHRcdGZvciAodmFyIGtleSBpbiBvYXR0cnMpIHtcblx0XHRcdCEoa2V5IGluIG5hdHRycykgJiZcblx0XHRcdCFpc1NwbFByb3Aoa2V5KSAmJlxuXHRcdFx0cmVtQXR0cih2bm9kZSwga2V5LCBpc0R5blByb3Aodm5vZGUudGFnLCBrZXkpIHx8IGlzRXZQcm9wKGtleSkpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWaWV3KHZpZXcsIGRhdGEsIGtleSwgb3B0cykge1xuXHRpZiAodmlldy50eXBlID09PSBWVklFVykge1xuXHRcdGRhdGFcdD0gdmlldy5kYXRhO1xuXHRcdGtleVx0XHQ9IHZpZXcua2V5O1xuXHRcdG9wdHNcdD0gdmlldy5vcHRzO1xuXHRcdHZpZXdcdD0gdmlldy52aWV3O1xuXHR9XG5cblx0cmV0dXJuIG5ldyBWaWV3TW9kZWwodmlldywgZGF0YSwga2V5LCBvcHRzKTtcbn1cblxuLy9pbXBvcnQgeyBYTUxfTlMsIFhMSU5LX05TIH0gZnJvbSAnLi9kZWZpbmVTdmdFbGVtZW50JztcbmZ1bmN0aW9uIGh5ZHJhdGVCb2R5KHZub2RlKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdm5vZGUuYm9keS5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB2bm9kZTIgPSB2bm9kZS5ib2R5W2ldO1xuXHRcdHZhciB0eXBlMiA9IHZub2RlMi50eXBlO1xuXG5cdFx0Ly8gRUxFTUVOVCxURVhULENPTU1FTlRcblx0XHRpZiAodHlwZTIgPD0gQ09NTUVOVClcblx0XHRcdHsgaW5zZXJ0QmVmb3JlKHZub2RlLmVsLCBoeWRyYXRlKHZub2RlMikpOyB9XHRcdC8vIHZub2RlLmVsLmFwcGVuZENoaWxkKGh5ZHJhdGUodm5vZGUyKSlcblx0XHRlbHNlIGlmICh0eXBlMiA9PT0gVlZJRVcpIHtcblx0XHRcdHZhciB2bSA9IGNyZWF0ZVZpZXcodm5vZGUyLnZpZXcsIHZub2RlMi5kYXRhLCB2bm9kZTIua2V5LCB2bm9kZTIub3B0cykuX3JlZHJhdyh2bm9kZSwgaSwgZmFsc2UpO1x0XHQvLyB0b2RvOiBoYW5kbGUgbmV3IGRhdGEgdXBkYXRlc1xuXHRcdFx0dHlwZTIgPSB2bS5ub2RlLnR5cGU7XG5cdFx0XHRpbnNlcnRCZWZvcmUodm5vZGUuZWwsIGh5ZHJhdGUodm0ubm9kZSkpO1xuXHRcdH1cblx0XHRlbHNlIGlmICh0eXBlMiA9PT0gVk1PREVMKSB7XG5cdFx0XHR2YXIgdm0gPSB2bm9kZTIudm07XG5cdFx0XHR2bS5fcmVkcmF3KHZub2RlLCBpKTtcdFx0XHRcdFx0Ly8gLCBmYWxzZVxuXHRcdFx0dHlwZTIgPSB2bS5ub2RlLnR5cGU7XG5cdFx0XHRpbnNlcnRCZWZvcmUodm5vZGUuZWwsIHZtLm5vZGUuZWwpO1x0XHQvLyAsIGh5ZHJhdGUodm0ubm9kZSlcblx0XHR9XG5cdH1cbn1cblxuLy8gIFRPRE86IERSWSB0aGlzIG91dC4gcmV1c2luZyBub3JtYWwgcGF0Y2ggaGVyZSBuZWdhdGl2ZWx5IGFmZmVjdHMgVjgncyBKSVRcbmZ1bmN0aW9uIGh5ZHJhdGUodm5vZGUsIHdpdGhFbCkge1xuXHRpZiAodm5vZGUuZWwgPT0gbnVsbCkge1xuXHRcdGlmICh2bm9kZS50eXBlID09PSBFTEVNRU5UKSB7XG5cdFx0XHR2bm9kZS5lbCA9IHdpdGhFbCB8fCBjcmVhdGVFbGVtZW50KHZub2RlLnRhZywgdm5vZGUubnMpO1xuXG5cdFx0Ly9cdGlmICh2bm9kZS50YWcgPT09IFwic3ZnXCIpXG5cdFx0Ly9cdFx0dm5vZGUuZWwuc2V0QXR0cmlidXRlTlMoWE1MX05TLCAneG1sbnM6eGxpbmsnLCBYTElOS19OUyk7XG5cblx0XHRcdGlmICh2bm9kZS5hdHRycyAhPSBudWxsKVxuXHRcdFx0XHR7IHBhdGNoQXR0cnModm5vZGUsIGVtcHR5T2JqLCB0cnVlKTsgfVxuXG5cdFx0XHRpZiAoKHZub2RlLmZsYWdzICYgTEFaWV9MSVNUKSA9PT0gTEFaWV9MSVNUKVx0Ly8gdm5vZGUuYm9keSBpbnN0YW5jZW9mIExhenlMaXN0XG5cdFx0XHRcdHsgdm5vZGUuYm9keS5ib2R5KHZub2RlKTsgfVxuXG5cdFx0XHRpZiAoaXNBcnIodm5vZGUuYm9keSkpXG5cdFx0XHRcdHsgaHlkcmF0ZUJvZHkodm5vZGUpOyB9XG5cdFx0XHRlbHNlIGlmICh2bm9kZS5ib2R5ICE9IG51bGwgJiYgdm5vZGUuYm9keSAhPT0gXCJcIilcblx0XHRcdFx0eyB2bm9kZS5lbC50ZXh0Q29udGVudCA9IHZub2RlLmJvZHk7IH1cblx0XHR9XG5cdFx0ZWxzZSBpZiAodm5vZGUudHlwZSA9PT0gVEVYVClcblx0XHRcdHsgdm5vZGUuZWwgPSB3aXRoRWwgfHwgY3JlYXRlVGV4dE5vZGUodm5vZGUuYm9keSk7IH1cblx0XHRlbHNlIGlmICh2bm9kZS50eXBlID09PSBDT01NRU5UKVxuXHRcdFx0eyB2bm9kZS5lbCA9IHdpdGhFbCB8fCBjcmVhdGVDb21tZW50KHZub2RlLmJvZHkpOyB9XG5cdH1cblxuXHR2bm9kZS5lbC5fbm9kZSA9IHZub2RlO1xuXG5cdHJldHVybiB2bm9kZS5lbDtcbn1cblxuLy8gcHJldmVudCBHQ0MgZnJvbSBpbmxpbmluZyBzb21lIGxhcmdlIGZ1bmNzICh3aGljaCBuZWdhdGl2ZWx5IGFmZmVjdHMgQ2hyb21lJ3MgSklUKVxuLy93aW5kb3cuc3luY0NoaWxkcmVuID0gc3luY0NoaWxkcmVuO1xud2luZG93Lmxpc01vdmUgPSBsaXNNb3ZlO1xuXG5mdW5jdGlvbiBuZXh0Tm9kZShub2RlLCBib2R5KSB7XG5cdHJldHVybiBib2R5W25vZGUuaWR4ICsgMV07XG59XG5cbmZ1bmN0aW9uIHByZXZOb2RlKG5vZGUsIGJvZHkpIHtcblx0cmV0dXJuIGJvZHlbbm9kZS5pZHggLSAxXTtcbn1cblxuZnVuY3Rpb24gcGFyZW50Tm9kZShub2RlKSB7XG5cdHJldHVybiBub2RlLnBhcmVudDtcbn1cblxudmFyIEJSRUFLID0gMTtcbnZhciBCUkVBS19BTEwgPSAyO1xuXG5mdW5jdGlvbiBzeW5jRGlyKGFkdlNpYiwgYWR2Tm9kZSwgaW5zZXJ0LCBzaWJOYW1lLCBub2RlTmFtZSwgaW52U2liTmFtZSwgaW52Tm9kZU5hbWUsIGludkluc2VydCkge1xuXHRyZXR1cm4gZnVuY3Rpb24obm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlLCBjb252VGVzdCwgbGlzKSB7XG5cdFx0dmFyIHNpYk5vZGUsIHRtcFNpYjtcblxuXHRcdGlmIChzdGF0ZVtzaWJOYW1lXSAhPSBudWxsKSB7XG5cdFx0XHQvLyBza2lwIGRvbSBlbGVtZW50cyBub3QgY3JlYXRlZCBieSBkb212bVxuXHRcdFx0aWYgKChzaWJOb2RlID0gc3RhdGVbc2liTmFtZV0uX25vZGUpID09IG51bGwpIHtcblx0XHRcdFx0eyBkZXZOb3RpZnkoXCJGT1JFSUdOX0VMRU1FTlRcIiwgW3N0YXRlW3NpYk5hbWVdXSk7IH1cblxuXHRcdFx0XHRzdGF0ZVtzaWJOYW1lXSA9IGFkdlNpYihzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKHBhcmVudE5vZGUoc2liTm9kZSkgIT09IG5vZGUpIHtcblx0XHRcdFx0dG1wU2liID0gYWR2U2liKHN0YXRlW3NpYk5hbWVdKTtcblx0XHRcdFx0c2liTm9kZS52bSAhPSBudWxsID8gc2liTm9kZS52bS51bm1vdW50KHRydWUpIDogcmVtb3ZlQ2hpbGQocGFyRWwsIHN0YXRlW3NpYk5hbWVdKTtcblx0XHRcdFx0c3RhdGVbc2liTmFtZV0gPSB0bXBTaWI7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoc3RhdGVbbm9kZU5hbWVdID09IGNvbnZUZXN0KVxuXHRcdFx0eyByZXR1cm4gQlJFQUtfQUxMOyB9XG5cdFx0ZWxzZSBpZiAoc3RhdGVbbm9kZU5hbWVdLmVsID09IG51bGwpIHtcblx0XHRcdGluc2VydChwYXJFbCwgaHlkcmF0ZShzdGF0ZVtub2RlTmFtZV0pLCBzdGF0ZVtzaWJOYW1lXSk7XHQvLyBzaG91bGQgbGlzIGJlIHVwZGF0ZWQgaGVyZT9cblx0XHRcdHN0YXRlW25vZGVOYW1lXSA9IGFkdk5vZGUoc3RhdGVbbm9kZU5hbWVdLCBib2R5KTtcdFx0Ly8gYWxzbyBuZWVkIHRvIGFkdmFuY2Ugc2liP1xuXHRcdH1cblx0XHRlbHNlIGlmIChzdGF0ZVtub2RlTmFtZV0uZWwgPT09IHN0YXRlW3NpYk5hbWVdKSB7XG5cdFx0XHRzdGF0ZVtub2RlTmFtZV0gPSBhZHZOb2RlKHN0YXRlW25vZGVOYW1lXSwgYm9keSk7XG5cdFx0XHRzdGF0ZVtzaWJOYW1lXSA9IGFkdlNpYihzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0fVxuXHRcdC8vIGhlYWQtPnRhaWwgb3IgdGFpbC0+aGVhZFxuXHRcdGVsc2UgaWYgKCFsaXMgJiYgc2liTm9kZSA9PT0gc3RhdGVbaW52Tm9kZU5hbWVdKSB7XG5cdFx0XHR0bXBTaWIgPSBzdGF0ZVtzaWJOYW1lXTtcblx0XHRcdHN0YXRlW3NpYk5hbWVdID0gYWR2U2liKHRtcFNpYik7XG5cdFx0XHRpbnZJbnNlcnQocGFyRWwsIHRtcFNpYiwgc3RhdGVbaW52U2liTmFtZV0pO1xuXHRcdFx0c3RhdGVbaW52U2liTmFtZV0gPSB0bXBTaWI7XG5cdFx0fVxuXHRcdGVsc2Uge1xuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc3RhdGVbbm9kZU5hbWVdLnZtICE9IG51bGwpXG5cdFx0XHRcdFx0eyBkZXZOb3RpZnkoXCJBTFJFQURZX0hZRFJBVEVEXCIsIFtzdGF0ZVtub2RlTmFtZV0udm1dKTsgfVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAobGlzICYmIHN0YXRlW3NpYk5hbWVdICE9IG51bGwpXG5cdFx0XHRcdHsgcmV0dXJuIGxpc01vdmUoYWR2U2liLCBhZHZOb2RlLCBpbnNlcnQsIHNpYk5hbWUsIG5vZGVOYW1lLCBwYXJFbCwgYm9keSwgc2liTm9kZSwgc3RhdGUpOyB9XG5cblx0XHRcdHJldHVybiBCUkVBSztcblx0XHR9XG5cdH07XG59XG5cbmZ1bmN0aW9uIGxpc01vdmUoYWR2U2liLCBhZHZOb2RlLCBpbnNlcnQsIHNpYk5hbWUsIG5vZGVOYW1lLCBwYXJFbCwgYm9keSwgc2liTm9kZSwgc3RhdGUpIHtcblx0aWYgKHNpYk5vZGUuX2xpcykge1xuXHRcdGluc2VydChwYXJFbCwgc3RhdGVbbm9kZU5hbWVdLmVsLCBzdGF0ZVtzaWJOYW1lXSk7XG5cdFx0c3RhdGVbbm9kZU5hbWVdID0gYWR2Tm9kZShzdGF0ZVtub2RlTmFtZV0sIGJvZHkpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIGZpbmQgY2xvc2VzdCB0b21iXG5cdFx0dmFyIHQgPSBiaW5hcnlGaW5kTGFyZ2VyKHNpYk5vZGUuaWR4LCBzdGF0ZS50b21icyk7XG5cdFx0c2liTm9kZS5fbGlzID0gdHJ1ZTtcblx0XHR2YXIgdG1wU2liID0gYWR2U2liKHN0YXRlW3NpYk5hbWVdKTtcblx0XHRpbnNlcnQocGFyRWwsIHN0YXRlW3NpYk5hbWVdLCB0ICE9IG51bGwgPyBib2R5W3N0YXRlLnRvbWJzW3RdXS5lbCA6IHQpO1xuXG5cdFx0aWYgKHQgPT0gbnVsbClcblx0XHRcdHsgc3RhdGUudG9tYnMucHVzaChzaWJOb2RlLmlkeCk7IH1cblx0XHRlbHNlXG5cdFx0XHR7IHN0YXRlLnRvbWJzLnNwbGljZSh0LCAwLCBzaWJOb2RlLmlkeCk7IH1cblxuXHRcdHN0YXRlW3NpYk5hbWVdID0gdG1wU2liO1xuXHR9XG59XG5cbnZhciBzeW5jTGZ0ID0gc3luY0RpcihuZXh0U2liLCBuZXh0Tm9kZSwgaW5zZXJ0QmVmb3JlLCBcImxmdFNpYlwiLCBcImxmdE5vZGVcIiwgXCJyZ3RTaWJcIiwgXCJyZ3ROb2RlXCIsIGluc2VydEFmdGVyKTtcbnZhciBzeW5jUmd0ID0gc3luY0RpcihwcmV2U2liLCBwcmV2Tm9kZSwgaW5zZXJ0QWZ0ZXIsIFwicmd0U2liXCIsIFwicmd0Tm9kZVwiLCBcImxmdFNpYlwiLCBcImxmdE5vZGVcIiwgaW5zZXJ0QmVmb3JlKTtcblxuZnVuY3Rpb24gc3luY0NoaWxkcmVuKG5vZGUsIGRvbm9yKSB7XG5cdHZhciBvYm9keVx0PSBkb25vci5ib2R5LFxuXHRcdHBhckVsXHQ9IG5vZGUuZWwsXG5cdFx0Ym9keVx0PSBub2RlLmJvZHksXG5cdFx0c3RhdGUgPSB7XG5cdFx0XHRsZnROb2RlOlx0Ym9keVswXSxcblx0XHRcdHJndE5vZGU6XHRib2R5W2JvZHkubGVuZ3RoIC0gMV0sXG5cdFx0XHRsZnRTaWI6XHRcdCgob2JvZHkpWzBdIHx8IGVtcHR5T2JqKS5lbCxcblx0XHRcdHJndFNpYjpcdFx0KG9ib2R5W29ib2R5Lmxlbmd0aCAtIDFdIHx8IGVtcHR5T2JqKS5lbCxcblx0XHR9O1xuXG5cdGNvbnZlcmdlOlxuXHR3aGlsZSAoMSkge1xuLy9cdFx0ZnJvbV9sZWZ0OlxuXHRcdHdoaWxlICgxKSB7XG5cdFx0XHR2YXIgbCA9IHN5bmNMZnQobm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlLCBudWxsLCBmYWxzZSk7XG5cdFx0XHRpZiAobCA9PT0gQlJFQUspIHsgYnJlYWs7IH1cblx0XHRcdGlmIChsID09PSBCUkVBS19BTEwpIHsgYnJlYWsgY29udmVyZ2U7IH1cblx0XHR9XG5cbi8vXHRcdGZyb21fcmlnaHQ6XG5cdFx0d2hpbGUgKDEpIHtcblx0XHRcdHZhciByID0gc3luY1JndChub2RlLCBwYXJFbCwgYm9keSwgc3RhdGUsIHN0YXRlLmxmdE5vZGUsIGZhbHNlKTtcblx0XHRcdGlmIChyID09PSBCUkVBSykgeyBicmVhazsgfVxuXHRcdFx0aWYgKHIgPT09IEJSRUFLX0FMTCkgeyBicmVhayBjb252ZXJnZTsgfVxuXHRcdH1cblxuXHRcdHNvcnRET00obm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlKTtcblx0XHRicmVhaztcblx0fVxufVxuXG4vLyBUT0RPOiBhbHNvIHVzZSB0aGUgc3RhdGUucmd0U2liIGFuZCBzdGF0ZS5yZ3ROb2RlIGJvdW5kcywgcGx1cyByZWR1Y2UgTElTIHJhbmdlXG5mdW5jdGlvbiBzb3J0RE9NKG5vZGUsIHBhckVsLCBib2R5LCBzdGF0ZSkge1xuXHR2YXIga2lkcyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHBhckVsLmNoaWxkTm9kZXMpO1xuXHR2YXIgZG9tSWR4cyA9IFtdO1xuXG5cdGZvciAodmFyIGsgPSAwOyBrIDwga2lkcy5sZW5ndGg7IGsrKykge1xuXHRcdHZhciBuID0ga2lkc1trXS5fbm9kZTtcblxuXHRcdGlmIChuLnBhcmVudCA9PT0gbm9kZSlcblx0XHRcdHsgZG9tSWR4cy5wdXNoKG4uaWR4KTsgfVxuXHR9XG5cblx0Ly8gbGlzdCBvZiBub24tbW92YWJsZSB2bm9kZSBpbmRpY2VzIChhbHJlYWR5IGluIGNvcnJlY3Qgb3JkZXIgaW4gb2xkIGRvbSlcblx0dmFyIHRvbWJzID0gbG9uZ2VzdEluY3JlYXNpbmdTdWJzZXF1ZW5jZShkb21JZHhzKS5tYXAoZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGRvbUlkeHNbaV07IH0pO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdG9tYnMubGVuZ3RoOyBpKyspXG5cdFx0eyBib2R5W3RvbWJzW2ldXS5fbGlzID0gdHJ1ZTsgfVxuXG5cdHN0YXRlLnRvbWJzID0gdG9tYnM7XG5cblx0d2hpbGUgKDEpIHtcblx0XHR2YXIgciA9IHN5bmNMZnQobm9kZSwgcGFyRWwsIGJvZHksIHN0YXRlLCBudWxsLCB0cnVlKTtcblx0XHRpZiAociA9PT0gQlJFQUtfQUxMKSB7IGJyZWFrOyB9XG5cdH1cbn1cblxuZnVuY3Rpb24gYWxyZWFkeUFkb3B0ZWQodm5vZGUpIHtcblx0cmV0dXJuIHZub2RlLmVsLl9ub2RlLnBhcmVudCAhPT0gdm5vZGUucGFyZW50O1xufVxuXG5mdW5jdGlvbiB0YWtlU2VxSW5kZXgobiwgb2JvZHksIGZyb21JZHgpIHtcblx0cmV0dXJuIG9ib2R5W2Zyb21JZHhdO1xufVxuXG5mdW5jdGlvbiBmaW5kU2VxVGhvcm91Z2gobiwgb2JvZHksIGZyb21JZHgpIHtcdFx0Ly8gcHJlLXRlc3RlZCBpc1ZpZXc/XG5cdGZvciAoOyBmcm9tSWR4IDwgb2JvZHkubGVuZ3RoOyBmcm9tSWR4KyspIHtcblx0XHR2YXIgbyA9IG9ib2R5W2Zyb21JZHhdO1xuXG5cdFx0aWYgKG8udm0gIT0gbnVsbCkge1xuXHRcdFx0Ly8gbWF0Y2ggYnkga2V5ICYgdmlld0ZuIHx8IHZtXG5cdFx0XHRpZiAobi50eXBlID09PSBWVklFVyAmJiBvLnZtLnZpZXcgPT09IG4udmlldyAmJiBvLnZtLmtleSA9PT0gbi5rZXkgfHwgbi50eXBlID09PSBWTU9ERUwgJiYgby52bSA9PT0gbi52bSlcblx0XHRcdFx0eyByZXR1cm4gbzsgfVxuXHRcdH1cblx0XHRlbHNlIGlmICghYWxyZWFkeUFkb3B0ZWQobykgJiYgbi50YWcgPT09IG8udGFnICYmIG4udHlwZSA9PT0gby50eXBlICYmIG4ua2V5ID09PSBvLmtleSAmJiAobi5mbGFncyAmIH5ERUVQX1JFTU9WRSkgPT09IChvLmZsYWdzICYgfkRFRVBfUkVNT1ZFKSlcblx0XHRcdHsgcmV0dXJuIG87IH1cblx0fVxuXG5cdHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBmaW5kSGFzaEtleWVkKG4sIG9ib2R5LCBmcm9tSWR4KSB7XG5cdHJldHVybiBvYm9keVtvYm9keS5fa2V5c1tuLmtleV1dO1xufVxuXG4vKlxuLy8gbGlzdCBtdXN0IGJlIGEgc29ydGVkIGxpc3Qgb2Ygdm5vZGVzIGJ5IGtleVxuZnVuY3Rpb24gZmluZEJpbktleWVkKG4sIGxpc3QpIHtcblx0dmFyIGlkeCA9IGJpbmFyeUtleVNlYXJjaChsaXN0LCBuLmtleSk7XG5cdHJldHVybiBpZHggPiAtMSA/IGxpc3RbaWR4XSA6IG51bGw7XG59XG4qL1xuXG4vLyBoYXZlIGl0IGhhbmRsZSBpbml0aWFsIGh5ZHJhdGU/ICFkb25vcj9cbi8vIHR5cGVzIChhbmQgdGFncyBpZiBFTEVNKSBhcmUgYXNzdW1lZCB0aGUgc2FtZSwgYW5kIGRvbm9yIGV4aXN0c1xuZnVuY3Rpb24gcGF0Y2godm5vZGUsIGRvbm9yKSB7XG5cdGZpcmVIb29rKGRvbm9yLmhvb2tzLCBcIndpbGxSZWN5Y2xlXCIsIGRvbm9yLCB2bm9kZSk7XG5cblx0dmFyIGVsID0gdm5vZGUuZWwgPSBkb25vci5lbDtcblxuXHR2YXIgb2JvZHkgPSBkb25vci5ib2R5O1xuXHR2YXIgbmJvZHkgPSB2bm9kZS5ib2R5O1xuXG5cdGVsLl9ub2RlID0gdm5vZGU7XG5cblx0Ly8gXCJcIiA9PiBcIlwiXG5cdGlmICh2bm9kZS50eXBlID09PSBURVhUICYmIG5ib2R5ICE9PSBvYm9keSkge1xuXHRcdGVsLm5vZGVWYWx1ZSA9IG5ib2R5O1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh2bm9kZS5hdHRycyAhPSBudWxsIHx8IGRvbm9yLmF0dHJzICE9IG51bGwpXG5cdFx0eyBwYXRjaEF0dHJzKHZub2RlLCBkb25vciwgZmFsc2UpOyB9XG5cblx0Ly8gcGF0Y2ggZXZlbnRzXG5cblx0dmFyIG9sZElzQXJyID0gaXNBcnIob2JvZHkpO1xuXHR2YXIgbmV3SXNBcnIgPSBpc0FycihuYm9keSk7XG5cdHZhciBsYXp5TGlzdCA9ICh2bm9kZS5mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVDtcblxuLy9cdHZhciBub25FcU5ld0JvZHkgPSBuYm9keSAhPSBudWxsICYmIG5ib2R5ICE9PSBvYm9keTtcblxuXHRpZiAob2xkSXNBcnIpIHtcblx0XHQvLyBbXSA9PiBbXVxuXHRcdGlmIChuZXdJc0FyciB8fCBsYXp5TGlzdClcblx0XHRcdHsgcGF0Y2hDaGlsZHJlbih2bm9kZSwgZG9ub3IpOyB9XG5cdFx0Ly8gW10gPT4gXCJcIiB8IG51bGxcblx0XHRlbHNlIGlmIChuYm9keSAhPT0gb2JvZHkpIHtcblx0XHRcdGlmIChuYm9keSAhPSBudWxsKVxuXHRcdFx0XHR7IGVsLnRleHRDb250ZW50ID0gbmJvZHk7IH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBjbGVhckNoaWxkcmVuKGRvbm9yKTsgfVxuXHRcdH1cblx0fVxuXHRlbHNlIHtcblx0XHQvLyBcIlwiIHwgbnVsbCA9PiBbXVxuXHRcdGlmIChuZXdJc0Fycikge1xuXHRcdFx0Y2xlYXJDaGlsZHJlbihkb25vcik7XG5cdFx0XHRoeWRyYXRlQm9keSh2bm9kZSk7XG5cdFx0fVxuXHRcdC8vIFwiXCIgfCBudWxsID0+IFwiXCIgfCBudWxsXG5cdFx0ZWxzZSBpZiAobmJvZHkgIT09IG9ib2R5KSB7XG5cdFx0XHRpZiAoZWwuZmlyc3RDaGlsZClcblx0XHRcdFx0eyBlbC5maXJzdENoaWxkLm5vZGVWYWx1ZSA9IG5ib2R5OyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgZWwudGV4dENvbnRlbnQgPSBuYm9keTsgfVxuXHRcdH1cblx0fVxuXG5cdGZpcmVIb29rKGRvbm9yLmhvb2tzLCBcImRpZFJlY3ljbGVcIiwgZG9ub3IsIHZub2RlKTtcbn1cblxuLy8gbGFyZ2VyIHF0eXMgb2YgS0VZRURfTElTVCBjaGlsZHJlbiB3aWxsIHVzZSBiaW5hcnkgc2VhcmNoXG4vL2NvbnN0IFNFUV9GQUlMU19NQVggPSAxMDA7XG5cbi8vIFRPRE86IG1vZGlmeSB2dHJlZSBtYXRjaGVyIHRvIHdvcmsgc2ltaWxhciB0byBkb20gcmVjb25jaWxlciBmb3Iga2V5ZWQgZnJvbSBsZWZ0IC0+IGZyb20gcmlnaHQgLT4gaGVhZC90YWlsIC0+IGJpbmFyeVxuLy8gZmFsbCBiYWNrIHRvIGJpbmFyeSBpZiBhZnRlciBmYWlsaW5nIG5yaSAtIG5saSA+IFNFUV9GQUlMU19NQVhcbi8vIHdoaWxlLWFkdmFuY2Ugbm9uLWtleWVkIGZyb21JZHhcbi8vIFtdID0+IFtdXG5mdW5jdGlvbiBwYXRjaENoaWxkcmVuKHZub2RlLCBkb25vcikge1xuXHR2YXIgbmJvZHlcdFx0PSB2bm9kZS5ib2R5LFxuXHRcdG5sZW5cdFx0PSBuYm9keS5sZW5ndGgsXG5cdFx0b2JvZHlcdFx0PSBkb25vci5ib2R5LFxuXHRcdG9sZW5cdFx0PSBvYm9keS5sZW5ndGgsXG5cdFx0aXNMYXp5XHRcdD0gKHZub2RlLmZsYWdzICYgTEFaWV9MSVNUKSA9PT0gTEFaWV9MSVNULFxuXHRcdGlzRml4ZWRcdFx0PSAodm5vZGUuZmxhZ3MgJiBGSVhFRF9CT0RZKSA9PT0gRklYRURfQk9EWSxcblx0XHRpc0tleWVkXHRcdD0gKHZub2RlLmZsYWdzICYgS0VZRURfTElTVCkgPT09IEtFWUVEX0xJU1QsXG5cdFx0ZG9tU3luY1x0XHQ9ICFpc0ZpeGVkICYmIHZub2RlLnR5cGUgPT09IEVMRU1FTlQsXG5cdFx0ZG9GaW5kXHRcdD0gdHJ1ZSxcblx0XHRmaW5kXHRcdD0gKFxuXHRcdFx0aXNLZXllZCA/IGZpbmRIYXNoS2V5ZWQgOlx0XHRcdFx0Ly8ga2V5ZWQgbGlzdHMvbGF6eUxpc3RzXG5cdFx0XHRpc0ZpeGVkIHx8IGlzTGF6eSA/IHRha2VTZXFJbmRleCA6XHRcdC8vIHVua2V5ZWQgbGF6eUxpc3RzIGFuZCBGSVhFRF9CT0RZXG5cdFx0XHRmaW5kU2VxVGhvcm91Z2hcdFx0XHRcdFx0XHRcdC8vIG1vcmUgY29tcGxleCBzdHVmZlxuXHRcdCk7XG5cblx0aWYgKGlzS2V5ZWQpIHtcblx0XHR2YXIga2V5cyA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JvZHkubGVuZ3RoOyBpKyspXG5cdFx0XHR7IGtleXNbb2JvZHlbaV0ua2V5XSA9IGk7IH1cblx0XHRvYm9keS5fa2V5cyA9IGtleXM7XG5cdH1cblxuXHRpZiAoZG9tU3luYyAmJiBubGVuID09PSAwKSB7XG5cdFx0Y2xlYXJDaGlsZHJlbihkb25vcik7XG5cdFx0aWYgKGlzTGF6eSlcblx0XHRcdHsgdm5vZGUuYm9keSA9IFtdOyB9XHQvLyBuYm9keS50cGwoYWxsKTtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR2YXIgZG9ub3IyLFxuXHRcdG5vZGUyLFxuXHRcdGZvdW5kSWR4LFxuXHRcdHBhdGNoZWQgPSAwLFxuXHRcdGV2ZXJOb25zZXEgPSBmYWxzZSxcblx0XHRmcm9tSWR4ID0gMDtcdFx0Ly8gZmlyc3QgdW5yZWN5Y2xlZCBub2RlIChzZWFyY2ggaGVhZClcblxuXHRpZiAoaXNMYXp5KSB7XG5cdFx0dmFyIGZub2RlMiA9IHtrZXk6IG51bGx9O1xuXHRcdHZhciBuYm9keU5ldyA9IEFycmF5KG5sZW4pO1xuXHR9XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBubGVuOyBpKyspIHtcblx0XHRpZiAoaXNMYXp5KSB7XG5cdFx0XHR2YXIgcmVtYWtlID0gZmFsc2U7XG5cdFx0XHR2YXIgZGlmZlJlcyA9IG51bGw7XG5cblx0XHRcdGlmIChkb0ZpbmQpIHtcblx0XHRcdFx0aWYgKGlzS2V5ZWQpXG5cdFx0XHRcdFx0eyBmbm9kZTIua2V5ID0gbmJvZHkua2V5KGkpOyB9XG5cblx0XHRcdFx0ZG9ub3IyID0gZmluZChmbm9kZTIsIG9ib2R5LCBmcm9tSWR4KTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRvbm9yMiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgZm91bmRJZHggPSBkb25vcjIuaWR4O1xuXHRcdFx0XHRkaWZmUmVzID0gbmJvZHkuZGlmZihpLCBkb25vcjIpO1xuXG5cdFx0XHRcdC8vIGRpZmYgcmV0dXJucyBzYW1lLCBzbyBjaGVhcGx5IGFkb3B0IHZub2RlIHdpdGhvdXQgcGF0Y2hpbmdcblx0XHRcdFx0aWYgKGRpZmZSZXMgPT09IHRydWUpIHtcblx0XHRcdFx0XHRub2RlMiA9IGRvbm9yMjtcblx0XHRcdFx0XHRub2RlMi5wYXJlbnQgPSB2bm9kZTtcblx0XHRcdFx0XHRub2RlMi5pZHggPSBpO1xuXHRcdFx0XHRcdG5vZGUyLl9saXMgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBkaWZmIHJldHVybnMgbmV3IGRpZmZWYWxzLCBzbyBnZW5lcmF0ZSBuZXcgdm5vZGUgJiBwYXRjaFxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0eyByZW1ha2UgPSB0cnVlOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgcmVtYWtlID0gdHJ1ZTsgfVxuXG5cdFx0XHRpZiAocmVtYWtlKSB7XG5cdFx0XHRcdG5vZGUyID0gbmJvZHkudHBsKGkpO1x0XHRcdC8vIHdoYXQgaWYgdGhpcyBpcyBhIFZWSUVXLCBWTU9ERUwsIGluamVjdGVkIGVsZW1lbnQ/XG5cdFx0XHRcdHByZVByb2Mobm9kZTIsIHZub2RlLCBpKTtcblxuXHRcdFx0XHRub2RlMi5fZGlmZiA9IGRpZmZSZXMgIT0gbnVsbCA/IGRpZmZSZXMgOiBuYm9keS5kaWZmKGkpO1xuXG5cdFx0XHRcdGlmIChkb25vcjIgIT0gbnVsbClcblx0XHRcdFx0XHR7IHBhdGNoKG5vZGUyLCBkb25vcjIpOyB9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0Ly8gVE9ETzogZmxhZyB0bXAgRklYRURfQk9EWSBvbiB1bmNoYW5nZWQgbm9kZXM/XG5cblx0XHRcdFx0Ly8gZG9tU3luYyA9IHRydWU7XHRcdGlmIGFueSBpZHggY2hhbmdlcyBvciBuZXcgbm9kZXMgYWRkZWQvcmVtb3ZlZFxuXHRcdFx0fVxuXG5cdFx0XHRuYm9keU5ld1tpXSA9IG5vZGUyO1xuXHRcdH1cblx0XHRlbHNlIHtcblx0XHRcdHZhciBub2RlMiA9IG5ib2R5W2ldO1xuXHRcdFx0dmFyIHR5cGUyID0gbm9kZTIudHlwZTtcblxuXHRcdFx0Ly8gRUxFTUVOVCxURVhULENPTU1FTlRcblx0XHRcdGlmICh0eXBlMiA8PSBDT01NRU5UKSB7XG5cdFx0XHRcdGlmIChkb25vcjIgPSBkb0ZpbmQgJiYgZmluZChub2RlMiwgb2JvZHksIGZyb21JZHgpKSB7XG5cdFx0XHRcdFx0cGF0Y2gobm9kZTIsIGRvbm9yMik7XG5cdFx0XHRcdFx0Zm91bmRJZHggPSBkb25vcjIuaWR4O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmICh0eXBlMiA9PT0gVlZJRVcpIHtcblx0XHRcdFx0aWYgKGRvbm9yMiA9IGRvRmluZCAmJiBmaW5kKG5vZGUyLCBvYm9keSwgZnJvbUlkeCkpIHtcdFx0Ly8gdXBkYXRlL21vdmVUb1xuXHRcdFx0XHRcdGZvdW5kSWR4ID0gZG9ub3IyLmlkeDtcblx0XHRcdFx0XHR2YXIgdm0gPSBkb25vcjIudm0uX3VwZGF0ZShub2RlMi5kYXRhLCB2bm9kZSwgaSk7XHRcdC8vIHdpdGhET01cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0eyB2YXIgdm0gPSBjcmVhdGVWaWV3KG5vZGUyLnZpZXcsIG5vZGUyLmRhdGEsIG5vZGUyLmtleSwgbm9kZTIub3B0cykuX3JlZHJhdyh2bm9kZSwgaSwgZmFsc2UpOyB9XHQvLyBjcmVhdGVWaWV3LCBubyBkb20gKHdpbGwgYmUgaGFuZGxlZCBieSBzeW5jIGJlbG93KVxuXG5cdFx0XHRcdHR5cGUyID0gdm0ubm9kZS50eXBlO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAodHlwZTIgPT09IFZNT0RFTCkge1xuXHRcdFx0XHQvLyBpZiB0aGUgaW5qZWN0ZWQgdm0gaGFzIG5ldmVyIGJlZW4gcmVuZGVyZWQsIHRoaXMgdm0uX3VwZGF0ZSgpIHNlcnZlcyBhcyB0aGVcblx0XHRcdFx0Ly8gaW5pdGlhbCB2dHJlZSBjcmVhdG9yLCBidXQgbXVzdCBhdm9pZCBoeWRyYXRpbmcgKGNyZWF0aW5nIC5lbCkgYmVjYXVzZSBzeW5jQ2hpbGRyZW4oKVxuXHRcdFx0XHQvLyB3aGljaCBpcyByZXNwb25zaWJsZSBmb3IgbW91bnRpbmcgYmVsb3cgKGFuZCBvcHRpb25hbGx5IGh5ZHJhdGluZyksIHRlc3RzIC5lbCBwcmVzZW5jZVxuXHRcdFx0XHQvLyB0byBkZXRlcm1pbmUgaWYgaHlkcmF0aW9uICYgbW91bnRpbmcgYXJlIG5lZWRlZFxuXHRcdFx0XHR2YXIgd2l0aERPTSA9IGlzSHlkcmF0ZWQobm9kZTIudm0pO1xuXG5cdFx0XHRcdHZhciB2bSA9IG5vZGUyLnZtLl91cGRhdGUobm9kZTIuZGF0YSwgdm5vZGUsIGksIHdpdGhET00pO1xuXHRcdFx0XHR0eXBlMiA9IHZtLm5vZGUudHlwZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBmb3VuZCBkb25vciAmIGR1cmluZyBhIHNlcXVlbnRpYWwgc2VhcmNoIC4uLmF0IHNlYXJjaCBoZWFkXG5cdFx0aWYgKCFpc0tleWVkICYmIGRvbm9yMiAhPSBudWxsKSB7XG5cdFx0XHRpZiAoZm91bmRJZHggPT09IGZyb21JZHgpIHtcblx0XHRcdFx0Ly8gYWR2YW5jZSBoZWFkXG5cdFx0XHRcdGZyb21JZHgrKztcblx0XHRcdFx0Ly8gaWYgYWxsIG9sZCB2bm9kZXMgYWRvcHRlZCBhbmQgbW9yZSBleGlzdCwgc3RvcCBzZWFyY2hpbmdcblx0XHRcdFx0aWYgKGZyb21JZHggPT09IG9sZW4gJiYgbmxlbiA+IG9sZW4pIHtcblx0XHRcdFx0XHQvLyBzaG9ydC1jaXJjdWl0IGZpbmQsIGFsbG93IGxvb3AganVzdCBjcmVhdGUvaW5pdCByZXN0XG5cdFx0XHRcdFx0ZG9ub3IyID0gbnVsbDtcblx0XHRcdFx0XHRkb0ZpbmQgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IGV2ZXJOb25zZXEgPSB0cnVlOyB9XG5cblx0XHRcdGlmIChvbGVuID4gMTAwICYmIGV2ZXJOb25zZXEgJiYgKytwYXRjaGVkICUgMTAgPT09IDApXG5cdFx0XHRcdHsgd2hpbGUgKGZyb21JZHggPCBvbGVuICYmIGFscmVhZHlBZG9wdGVkKG9ib2R5W2Zyb21JZHhdKSlcblx0XHRcdFx0XHR7IGZyb21JZHgrKzsgfSB9XG5cdFx0fVxuXHR9XG5cblx0Ly8gcmVwbGFjZSBMaXN0IHcvIG5ldyBib2R5XG5cdGlmIChpc0xhenkpXG5cdFx0eyB2bm9kZS5ib2R5ID0gbmJvZHlOZXc7IH1cblxuXHRkb21TeW5jICYmIHN5bmNDaGlsZHJlbih2bm9kZSwgZG9ub3IpO1xufVxuXG5mdW5jdGlvbiBET01JbnN0cih3aXRoVGltZSkge1xuXHR2YXIgaXNFZGdlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiRWRnZVwiKSAhPT0gLTE7XG5cdHZhciBpc0lFID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVHJpZGVudC9cIikgIT09IC0xO1xuXHR2YXIgZ2V0RGVzY3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXHR2YXIgZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuXHR2YXIgbm9kZVByb3RvID0gTm9kZS5wcm90b3R5cGU7XG5cdHZhciB0ZXh0Q29udGVudCA9IGdldERlc2NyKG5vZGVQcm90bywgXCJ0ZXh0Q29udGVudFwiKTtcblx0dmFyIG5vZGVWYWx1ZSA9IGdldERlc2NyKG5vZGVQcm90bywgXCJub2RlVmFsdWVcIik7XG5cblx0dmFyIGh0bWxQcm90byA9IEhUTUxFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGlubmVyVGV4dCA9IGdldERlc2NyKGh0bWxQcm90bywgXCJpbm5lclRleHRcIik7XG5cblx0dmFyIGVsZW1Qcm90b1x0PSBFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGlubmVySFRNTFx0PSBnZXREZXNjcighaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJpbm5lckhUTUxcIik7XG5cdHZhciBjbGFzc05hbWVcdD0gZ2V0RGVzY3IoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiY2xhc3NOYW1lXCIpO1xuXHR2YXIgaWRcdFx0XHQ9IGdldERlc2NyKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlkXCIpO1xuXG5cdHZhciBzdHlsZVByb3RvXHQ9IENTU1N0eWxlRGVjbGFyYXRpb24ucHJvdG90eXBlO1xuXG5cdHZhciBjc3NUZXh0XHRcdD0gZ2V0RGVzY3Ioc3R5bGVQcm90bywgXCJjc3NUZXh0XCIpO1xuXG5cdHZhciBpbnBQcm90byA9IEhUTUxJbnB1dEVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgYXJlYVByb3RvID0gSFRNTFRleHRBcmVhRWxlbWVudC5wcm90b3R5cGU7XG5cdHZhciBzZWxQcm90byA9IEhUTUxTZWxlY3RFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIG9wdFByb3RvID0gSFRNTE9wdGlvbkVsZW1lbnQucHJvdG90eXBlO1xuXG5cdHZhciBpbnBDaGVja2VkID0gZ2V0RGVzY3IoaW5wUHJvdG8sIFwiY2hlY2tlZFwiKTtcblx0dmFyIGlucFZhbCA9IGdldERlc2NyKGlucFByb3RvLCBcInZhbHVlXCIpO1xuXG5cdHZhciBhcmVhVmFsID0gZ2V0RGVzY3IoYXJlYVByb3RvLCBcInZhbHVlXCIpO1xuXG5cdHZhciBzZWxWYWwgPSBnZXREZXNjcihzZWxQcm90bywgXCJ2YWx1ZVwiKTtcblx0dmFyIHNlbEluZGV4ID0gZ2V0RGVzY3Ioc2VsUHJvdG8sIFwic2VsZWN0ZWRJbmRleFwiKTtcblxuXHR2YXIgb3B0U2VsID0gZ2V0RGVzY3Iob3B0UHJvdG8sIFwic2VsZWN0ZWRcIik7XG5cblx0Ly8gb25jbGljaywgb25rZXkqLCBldGMuLlxuXG5cdC8vIHZhciBzdHlsZVByb3RvID0gQ1NTU3R5bGVEZWNsYXJhdGlvbi5wcm90b3R5cGU7XG5cdC8vIHZhciBzZXRQcm9wZXJ0eSA9IGdldERlc2NyKHN0eWxlUHJvdG8sIFwic2V0UHJvcGVydHlcIik7XG5cblx0dmFyIG9yaWdPcHMgPSB7XG5cdFx0XCJkb2N1bWVudC5jcmVhdGVFbGVtZW50XCI6IG51bGwsXG5cdFx0XCJkb2N1bWVudC5jcmVhdGVFbGVtZW50TlNcIjogbnVsbCxcblx0XHRcImRvY3VtZW50LmNyZWF0ZVRleHROb2RlXCI6IG51bGwsXG5cdFx0XCJkb2N1bWVudC5jcmVhdGVDb21tZW50XCI6IG51bGwsXG5cdFx0XCJkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50XCI6IG51bGwsXG5cblx0XHRcIkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLmluc2VydEJlZm9yZVwiOiBudWxsLFx0XHQvLyBhcHBlbmRDaGlsZFxuXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZFwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRcIjogbnVsbCxcblx0XHRcIkVsZW1lbnQucHJvdG90eXBlLmluc2VydEJlZm9yZVwiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVwbGFjZUNoaWxkXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVcIjogbnVsbCxcblxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVOU1wiOiBudWxsLFxuXHRcdFwiRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlXCI6IG51bGwsXG5cdFx0XCJFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVBdHRyaWJ1dGVOU1wiOiBudWxsLFxuXG5cdFx0Ly8gYXNzaWduP1xuXHRcdC8vIGRhdGFzZXQsIGNsYXNzbGlzdCwgYW55IHByb3BzIGxpa2UgLm9uY2hhbmdlXG5cblx0XHQvLyAuc3R5bGUuc2V0UHJvcGVydHksIC5zdHlsZS5jc3NUZXh0XG5cdH07XG5cblx0dmFyIGNvdW50cyA9IHt9O1xuXHR2YXIgc3RhcnQgPSBudWxsO1xuXG5cdGZ1bmN0aW9uIGN0eE5hbWUob3BOYW1lKSB7XG5cdFx0dmFyIG9wUGF0aCA9IG9wTmFtZS5zcGxpdChcIi5cIik7XG5cdFx0dmFyIG8gPSB3aW5kb3c7XG5cdFx0d2hpbGUgKG9wUGF0aC5sZW5ndGggPiAxKVxuXHRcdFx0eyBvID0gb1tvcFBhdGguc2hpZnQoKV07IH1cblxuXHRcdHJldHVybiB7Y3R4OiBvLCBsYXN0OiBvcFBhdGhbMF19O1xuXHR9XG5cblx0Zm9yICh2YXIgb3BOYW1lIGluIG9yaWdPcHMpIHtcblx0XHR2YXIgcCA9IGN0eE5hbWUob3BOYW1lKTtcblxuXHRcdGlmIChvcmlnT3BzW29wTmFtZV0gPT09IG51bGwpXG5cdFx0XHR7IG9yaWdPcHNbb3BOYW1lXSA9IHAuY3R4W3AubGFzdF07IH1cblxuXHRcdChmdW5jdGlvbihvcE5hbWUsIG9wU2hvcnQpIHtcblx0XHRcdGNvdW50c1tvcFNob3J0XSA9IDA7XG5cdFx0XHRwLmN0eFtvcFNob3J0XSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRjb3VudHNbb3BTaG9ydF0rKztcblx0XHRcdFx0cmV0dXJuIG9yaWdPcHNbb3BOYW1lXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXHRcdFx0fTtcblx0XHR9KShvcE5hbWUsIHAubGFzdCk7XG5cdH1cblxuXHRjb3VudHMudGV4dENvbnRlbnQgPSAwO1xuXHRkZWZQcm9wKG5vZGVQcm90bywgXCJ0ZXh0Q29udGVudFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMudGV4dENvbnRlbnQrKztcblx0XHRcdHRleHRDb250ZW50LnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5ub2RlVmFsdWUgPSAwO1xuXHRkZWZQcm9wKG5vZGVQcm90bywgXCJub2RlVmFsdWVcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLm5vZGVWYWx1ZSsrO1xuXHRcdFx0bm9kZVZhbHVlLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5pbm5lclRleHQgPSAwO1xuXHRkZWZQcm9wKGh0bWxQcm90bywgXCJpbm5lclRleHRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmlubmVyVGV4dCsrO1xuXHRcdFx0aW5uZXJUZXh0LnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5pbm5lckhUTUwgPSAwO1xuXHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlubmVySFRNTFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuaW5uZXJIVE1MKys7XG5cdFx0XHRpbm5lckhUTUwuc2V0LmNhbGwodGhpcywgcyk7XG5cdFx0fSxcblx0fSk7XG5cblx0Y291bnRzLmNsYXNzTmFtZSA9IDA7XG5cdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiY2xhc3NOYW1lXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5jbGFzc05hbWUrKztcblx0XHRcdGNsYXNzTmFtZS5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuY3NzVGV4dCA9IDA7XG5cdGRlZlByb3Aoc3R5bGVQcm90bywgXCJjc3NUZXh0XCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5jc3NUZXh0Kys7XG5cdFx0XHRjc3NUZXh0LnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5pZCA9IDA7XG5cdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaWRcIiwge1xuXHRcdHNldDogZnVuY3Rpb24ocykge1xuXHRcdFx0Y291bnRzLmlkKys7XG5cdFx0XHRpZC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuY2hlY2tlZCA9IDA7XG5cdGRlZlByb3AoaW5wUHJvdG8sIFwiY2hlY2tlZFwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuY2hlY2tlZCsrO1xuXHRcdFx0aW5wQ2hlY2tlZC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMudmFsdWUgPSAwO1xuXHRkZWZQcm9wKGlucFByb3RvLCBcInZhbHVlXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy52YWx1ZSsrO1xuXHRcdFx0aW5wVmFsLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGRlZlByb3AoYXJlYVByb3RvLCBcInZhbHVlXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy52YWx1ZSsrO1xuXHRcdFx0YXJlYVZhbC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRkZWZQcm9wKHNlbFByb3RvLCBcInZhbHVlXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy52YWx1ZSsrO1xuXHRcdFx0c2VsVmFsLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdGNvdW50cy5zZWxlY3RlZEluZGV4ID0gMDtcblx0ZGVmUHJvcChzZWxQcm90bywgXCJzZWxlY3RlZEluZGV4XCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5zZWxlY3RlZEluZGV4Kys7XG5cdFx0XHRzZWxJbmRleC5zZXQuY2FsbCh0aGlzLCBzKTtcblx0XHR9LFxuXHR9KTtcblxuXHRjb3VudHMuc2VsZWN0ZWQgPSAwO1xuXHRkZWZQcm9wKG9wdFByb3RvLCBcInNlbGVjdGVkXCIsIHtcblx0XHRzZXQ6IGZ1bmN0aW9uKHMpIHtcblx0XHRcdGNvdW50cy5zZWxlY3RlZCsrO1xuXHRcdFx0b3B0U2VsLnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXG5cdC8qXG5cdGNvdW50cy5zZXRQcm9wZXJ0eSA9IDA7XG5cdGRlZlByb3Aoc3R5bGVQcm90bywgXCJzZXRQcm9wZXJ0eVwiLCB7XG5cdFx0c2V0OiBmdW5jdGlvbihzKSB7XG5cdFx0XHRjb3VudHMuc2V0UHJvcGVydHkrKztcblx0XHRcdHNldFByb3BlcnR5LnNldC5jYWxsKHRoaXMsIHMpO1xuXHRcdH0sXG5cdH0pO1xuXHQqL1xuXG5cdGZ1bmN0aW9uIHJlc2V0KCkge1xuXHRcdGZvciAodmFyIGkgaW4gY291bnRzKVxuXHRcdFx0eyBjb3VudHNbaV0gPSAwOyB9XG5cdH1cblxuXHR0aGlzLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG5cdFx0c3RhcnQgPSArbmV3IERhdGU7XG5cdH07XG5cblx0dGhpcy5lbmQgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgX3RpbWUgPSArbmV3IERhdGUgLSBzdGFydDtcblx0XHRzdGFydCA9IG51bGw7XG4vKlxuXHRcdGZvciAodmFyIG9wTmFtZSBpbiBvcmlnT3BzKSB7XG5cdFx0XHR2YXIgcCA9IGN0eE5hbWUob3BOYW1lKTtcblx0XHRcdHAuY3R4W3AubGFzdF0gPSBvcmlnT3BzW29wTmFtZV07XG5cdFx0fVxuXG5cdFx0ZGVmUHJvcChub2RlUHJvdG8sIFwidGV4dENvbnRlbnRcIiwgdGV4dENvbnRlbnQpO1xuXHRcdGRlZlByb3Aobm9kZVByb3RvLCBcIm5vZGVWYWx1ZVwiLCBub2RlVmFsdWUpO1xuXHRcdGRlZlByb3AoaHRtbFByb3RvLCBcImlubmVyVGV4dFwiLCBpbm5lclRleHQpO1xuXHRcdGRlZlByb3AoIWlzSUUgPyBlbGVtUHJvdG8gOiBodG1sUHJvdG8sIFwiaW5uZXJIVE1MXCIsIGlubmVySFRNTCk7XG5cdFx0ZGVmUHJvcCghaXNJRSA/IGVsZW1Qcm90byA6IGh0bWxQcm90bywgXCJjbGFzc05hbWVcIiwgY2xhc3NOYW1lKTtcblx0XHRkZWZQcm9wKCFpc0lFID8gZWxlbVByb3RvIDogaHRtbFByb3RvLCBcImlkXCIsIGlkKTtcblx0XHRkZWZQcm9wKGlucFByb3RvLCAgXCJjaGVja2VkXCIsIGlucENoZWNrZWQpO1xuXHRcdGRlZlByb3AoaW5wUHJvdG8sICBcInZhbHVlXCIsIGlucFZhbCk7XG5cdFx0ZGVmUHJvcChhcmVhUHJvdG8sIFwidmFsdWVcIiwgYXJlYVZhbCk7XG5cdFx0ZGVmUHJvcChzZWxQcm90bywgIFwidmFsdWVcIiwgc2VsVmFsKTtcblx0XHRkZWZQcm9wKHNlbFByb3RvLCAgXCJzZWxlY3RlZEluZGV4XCIsIHNlbEluZGV4KTtcblx0XHRkZWZQcm9wKG9wdFByb3RvLCAgXCJzZWxlY3RlZFwiLCBvcHRTZWwpO1xuXHQvL1x0ZGVmUHJvcChzdHlsZVByb3RvLCBcInNldFByb3BlcnR5XCIsIHNldFByb3BlcnR5KTtcblx0XHRkZWZQcm9wKHN0eWxlUHJvdG8sIFwiY3NzVGV4dFwiLCBjc3NUZXh0KTtcbiovXG5cdFx0dmFyIG91dCA9IHt9O1xuXG5cdFx0Zm9yICh2YXIgaSBpbiBjb3VudHMpXG5cdFx0XHR7IGlmIChjb3VudHNbaV0gPiAwKVxuXHRcdFx0XHR7IG91dFtpXSA9IGNvdW50c1tpXTsgfSB9XG5cblx0XHRyZXNldCgpO1xuXG5cdFx0aWYgKHdpdGhUaW1lKVxuXHRcdFx0eyBvdXQuX3RpbWUgPSBfdGltZTsgfVxuXG5cdFx0cmV0dXJuIG91dDtcblx0fTtcbn1cblxudmFyIGluc3RyID0gbnVsbDtcblxue1xuXHRpZiAoREVWTU9ERS5tdXRhdGlvbnMpIHtcblx0XHRpbnN0ciA9IG5ldyBET01JbnN0cih0cnVlKTtcblx0fVxufVxuXG4vLyB2aWV3ICsga2V5IHNlcnZlIGFzIHRoZSB2bSdzIHVuaXF1ZSBpZGVudGl0eVxuZnVuY3Rpb24gVmlld01vZGVsKHZpZXcsIGRhdGEsIGtleSwgb3B0cykge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdHZtLnZpZXcgPSB2aWV3O1xuXHR2bS5kYXRhID0gZGF0YTtcblx0dm0ua2V5ID0ga2V5O1xuXG5cdHtcblx0XHRpZiAoaXNTdHJlYW0oZGF0YSkpXG5cdFx0XHR7IHZtLl9zdHJlYW0gPSBob29rU3RyZWFtMihkYXRhLCB2bSk7IH1cblx0fVxuXG5cdGlmIChvcHRzKSB7XG5cdFx0dm0ub3B0cyA9IG9wdHM7XG5cdFx0dm0uY29uZmlnKG9wdHMpO1xuXHR9XG5cblx0dmFyIG91dCA9IGlzUGxhaW5PYmoodmlldykgPyB2aWV3IDogdmlldy5jYWxsKHZtLCB2bSwgZGF0YSwga2V5LCBvcHRzKTtcblxuXHRpZiAoaXNGdW5jKG91dCkpXG5cdFx0eyB2bS5yZW5kZXIgPSBvdXQ7IH1cblx0ZWxzZSB7XG5cdFx0dm0ucmVuZGVyID0gb3V0LnJlbmRlcjtcblx0XHR2bS5jb25maWcob3V0KTtcblx0fVxuXG5cdC8vIHRoZXNlIG11c3QgYmUgd3JhcHBlZCBoZXJlIHNpbmNlIHRoZXkncmUgZGVib3VuY2VkIHBlciB2aWV3XG5cdHZtLl9yZWRyYXdBc3luYyA9IHJhZnQoZnVuY3Rpb24gKF8pIHsgcmV0dXJuIHZtLnJlZHJhdyh0cnVlKTsgfSk7XG5cdHZtLl91cGRhdGVBc3luYyA9IHJhZnQoZnVuY3Rpb24gKG5ld0RhdGEpIHsgcmV0dXJuIHZtLnVwZGF0ZShuZXdEYXRhLCB0cnVlKTsgfSk7XG5cblx0dm0uaW5pdCAmJiB2bS5pbml0LmNhbGwodm0sIHZtLCB2bS5kYXRhLCB2bS5rZXksIG9wdHMpO1xufVxuXG52YXIgVmlld01vZGVsUHJvdG8gPSBWaWV3TW9kZWwucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVmlld01vZGVsLFxuXG5cdF9kaWZmOlx0bnVsbCxcdC8vIGRpZmYgY2FjaGVcblxuXHRpbml0Olx0bnVsbCxcblx0dmlldzpcdG51bGwsXG5cdGtleTpcdG51bGwsXG5cdGRhdGE6XHRudWxsLFxuXHRzdGF0ZTpcdG51bGwsXG5cdGFwaTpcdG51bGwsXG5cdG9wdHM6XHRudWxsLFxuXHRub2RlOlx0bnVsbCxcblx0aG9va3M6XHRudWxsLFxuXHRvbmV2ZW50OiBub29wLFxuXHRyZWZzOlx0bnVsbCxcblx0cmVuZGVyOlx0bnVsbCxcblxuXHRtb3VudDogbW91bnQsXG5cdHVubW91bnQ6IHVubW91bnQsXG5cdGNvbmZpZzogZnVuY3Rpb24ob3B0cykge1xuXHRcdHZhciB0ID0gdGhpcztcblxuXHRcdGlmIChvcHRzLmluaXQpXG5cdFx0XHR7IHQuaW5pdCA9IG9wdHMuaW5pdDsgfVxuXHRcdGlmIChvcHRzLmRpZmYpXG5cdFx0XHR7IHQuZGlmZiA9IG9wdHMuZGlmZjsgfVxuXHRcdGlmIChvcHRzLm9uZXZlbnQpXG5cdFx0XHR7IHQub25ldmVudCA9IG9wdHMub25ldmVudDsgfVxuXG5cdFx0Ly8gbWF5YmUgaW52ZXJ0IGFzc2lnbm1lbnQgb3JkZXI/XG5cdFx0aWYgKG9wdHMuaG9va3MpXG5cdFx0XHR7IHQuaG9va3MgPSBhc3NpZ25PYmoodC5ob29rcyB8fCB7fSwgb3B0cy5ob29rcyk7IH1cblxuXHRcdHtcblx0XHRcdGlmIChvcHRzLm9uZW1pdClcblx0XHRcdFx0eyB0Lm9uZW1pdCA9IGFzc2lnbk9iaih0Lm9uZW1pdCB8fCB7fSwgb3B0cy5vbmVtaXQpOyB9XG5cdFx0fVxuXHR9LFxuXHRwYXJlbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBnZXRWbSh0aGlzLm5vZGUucGFyZW50KTtcblx0fSxcblx0cm9vdDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIHAgPSB0aGlzLm5vZGU7XG5cblx0XHR3aGlsZSAocC5wYXJlbnQpXG5cdFx0XHR7IHAgPSBwLnBhcmVudDsgfVxuXG5cdFx0cmV0dXJuIHAudm07XG5cdH0sXG5cdHJlZHJhdzogZnVuY3Rpb24oc3luYykge1xuXHRcdHtcblx0XHRcdGlmIChERVZNT0RFLnN5bmNSZWRyYXcpIHtcblx0XHRcdFx0c3luYyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciB2bSA9IHRoaXM7XG5cdFx0c3luYyA/IHZtLl9yZWRyYXcobnVsbCwgbnVsbCwgaXNIeWRyYXRlZCh2bSkpIDogdm0uX3JlZHJhd0FzeW5jKCk7XG5cdFx0cmV0dXJuIHZtO1xuXHR9LFxuXHR1cGRhdGU6IGZ1bmN0aW9uKG5ld0RhdGEsIHN5bmMpIHtcblx0XHR7XG5cdFx0XHRpZiAoREVWTU9ERS5zeW5jUmVkcmF3KSB7XG5cdFx0XHRcdHN5bmMgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgdm0gPSB0aGlzO1xuXHRcdHN5bmMgPyB2bS5fdXBkYXRlKG5ld0RhdGEsIG51bGwsIG51bGwsIGlzSHlkcmF0ZWQodm0pKSA6IHZtLl91cGRhdGVBc3luYyhuZXdEYXRhKTtcblx0XHRyZXR1cm4gdm07XG5cdH0sXG5cblx0X3VwZGF0ZTogdXBkYXRlU3luYyxcblx0X3JlZHJhdzogcmVkcmF3U3luYyxcblx0X3JlZHJhd0FzeW5jOiBudWxsLFxuXHRfdXBkYXRlQXN5bmM6IG51bGwsXG59O1xuXG5mdW5jdGlvbiBtb3VudChlbCwgaXNSb290KSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0e1xuXHRcdGlmIChERVZNT0RFLm11dGF0aW9ucylcblx0XHRcdHsgaW5zdHIuc3RhcnQoKTsgfVxuXHR9XG5cblx0aWYgKGlzUm9vdCkge1xuXHRcdGNsZWFyQ2hpbGRyZW4oe2VsOiBlbCwgZmxhZ3M6IDB9KTtcblxuXHRcdHZtLl9yZWRyYXcobnVsbCwgbnVsbCwgZmFsc2UpO1xuXG5cdFx0Ly8gaWYgcGxhY2Vob2xkZXIgbm9kZSBkb2VzbnQgbWF0Y2ggcm9vdCB0YWdcblx0XHRpZiAoZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKSAhPT0gdm0ubm9kZS50YWcpIHtcblx0XHRcdGh5ZHJhdGUodm0ubm9kZSk7XG5cdFx0XHRpbnNlcnRCZWZvcmUoZWwucGFyZW50Tm9kZSwgdm0ubm9kZS5lbCwgZWwpO1xuXHRcdFx0ZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHsgaW5zZXJ0QmVmb3JlKGVsLnBhcmVudE5vZGUsIGh5ZHJhdGUodm0ubm9kZSwgZWwpLCBlbCk7IH1cblx0fVxuXHRlbHNlIHtcblx0XHR2bS5fcmVkcmF3KG51bGwsIG51bGwpO1xuXG5cdFx0aWYgKGVsKVxuXHRcdFx0eyBpbnNlcnRCZWZvcmUoZWwsIHZtLm5vZGUuZWwpOyB9XG5cdH1cblxuXHRpZiAoZWwpXG5cdFx0eyBkcmFpbkRpZEhvb2tzKHZtKTsgfVxuXG5cdHtcblx0XHRpZiAoREVWTU9ERS5tdXRhdGlvbnMpXG5cdFx0XHR7IGNvbnNvbGUubG9nKGluc3RyLmVuZCgpKTsgfVxuXHR9XG5cblx0cmV0dXJuIHZtO1xufVxuXG4vLyBhc1N1YiBtZWFucyB0aGlzIHdhcyBjYWxsZWQgZnJvbSBhIHN1Yi1yb3V0aW5lLCBzbyBkb24ndCBkcmFpbiBkaWQqIGhvb2sgcXVldWVcbmZ1bmN0aW9uIHVubW91bnQoYXNTdWIpIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHR7XG5cdFx0aWYgKGlzU3RyZWFtKHZtLl9zdHJlYW0pKVxuXHRcdFx0eyB1bnN1YlN0cmVhbSh2bS5fc3RyZWFtKTsgfVxuXHR9XG5cblx0dmFyIG5vZGUgPSB2bS5ub2RlO1xuXHR2YXIgcGFyRWwgPSBub2RlLmVsLnBhcmVudE5vZGU7XG5cblx0Ly8gZWRnZSBidWc6IHRoaXMgY291bGQgYWxzbyBiZSB3aWxsUmVtb3ZlIHByb21pc2UtZGVsYXllZDsgc2hvdWxkIC50aGVuKCkgb3Igc29tZXRoaW5nIHRvIG1ha2Ugc3VyZSBob29rcyBmaXJlIGluIG9yZGVyXG5cdHJlbW92ZUNoaWxkKHBhckVsLCBub2RlLmVsKTtcblxuXHRpZiAoIWFzU3ViKVxuXHRcdHsgZHJhaW5EaWRIb29rcyh2bSk7IH1cbn1cblxuZnVuY3Rpb24gcmVQYXJlbnQodm0sIHZvbGQsIG5ld1BhcmVudCwgbmV3SWR4KSB7XG5cdGlmIChuZXdQYXJlbnQgIT0gbnVsbCkge1xuXHRcdG5ld1BhcmVudC5ib2R5W25ld0lkeF0gPSB2b2xkO1xuXHRcdHZvbGQuaWR4ID0gbmV3SWR4O1xuXHRcdHZvbGQucGFyZW50ID0gbmV3UGFyZW50O1xuXHRcdHZvbGQuX2xpcyA9IGZhbHNlO1xuXHR9XG5cdHJldHVybiB2bTtcbn1cblxuZnVuY3Rpb24gcmVkcmF3U3luYyhuZXdQYXJlbnQsIG5ld0lkeCwgd2l0aERPTSkge1xuXHR2YXIgaXNSZWRyYXdSb290ID0gbmV3UGFyZW50ID09IG51bGw7XG5cdHZhciB2bSA9IHRoaXM7XG5cdHZhciBpc01vdW50ZWQgPSB2bS5ub2RlICYmIHZtLm5vZGUuZWwgJiYgdm0ubm9kZS5lbC5wYXJlbnROb2RlO1xuXG5cdHtcblx0XHQvLyB3YXMgbW91bnRlZCAoaGFzIG5vZGUgYW5kIGVsKSwgYnV0IGVsIG5vIGxvbmdlciBoYXMgcGFyZW50ICh1bm1vdW50ZWQpXG5cdFx0aWYgKGlzUmVkcmF3Um9vdCAmJiB2bS5ub2RlICYmIHZtLm5vZGUuZWwgJiYgIXZtLm5vZGUuZWwucGFyZW50Tm9kZSlcblx0XHRcdHsgZGV2Tm90aWZ5KFwiVU5NT1VOVEVEX1JFRFJBV1wiLCBbdm1dKTsgfVxuXG5cdFx0aWYgKGlzUmVkcmF3Um9vdCAmJiBERVZNT0RFLm11dGF0aW9ucyAmJiBpc01vdW50ZWQpXG5cdFx0XHR7IGluc3RyLnN0YXJ0KCk7IH1cblx0fVxuXG5cdHZhciB2b2xkID0gdm0ubm9kZSwgb2xkRGlmZiwgbmV3RGlmZjtcblxuXHRpZiAodm0uZGlmZiAhPSBudWxsKSB7XG5cdFx0b2xkRGlmZiA9IHZtLl9kaWZmO1xuXHRcdHZtLl9kaWZmID0gbmV3RGlmZiA9IHZtLmRpZmYodm0sIHZtLmRhdGEpO1xuXG5cdFx0aWYgKHZvbGQgIT0gbnVsbCkge1xuXHRcdFx0dmFyIGNtcEZuID0gaXNBcnIob2xkRGlmZikgPyBjbXBBcnIgOiBjbXBPYmo7XG5cdFx0XHR2YXIgaXNTYW1lID0gb2xkRGlmZiA9PT0gbmV3RGlmZiB8fCBjbXBGbihvbGREaWZmLCBuZXdEaWZmKTtcblxuXHRcdFx0aWYgKGlzU2FtZSlcblx0XHRcdFx0eyByZXR1cm4gcmVQYXJlbnQodm0sIHZvbGQsIG5ld1BhcmVudCwgbmV3SWR4KTsgfVxuXHRcdH1cblx0fVxuXG5cdGlzTW91bnRlZCAmJiBmaXJlSG9vayh2bS5ob29rcywgXCJ3aWxsUmVkcmF3XCIsIHZtLCB2bS5kYXRhKTtcblxuXHR2YXIgdm5ldyA9IHZtLnJlbmRlci5jYWxsKHZtLCB2bSwgdm0uZGF0YSwgb2xkRGlmZiwgbmV3RGlmZik7XG5cblx0aWYgKHZuZXcgPT09IHZvbGQpXG5cdFx0eyByZXR1cm4gcmVQYXJlbnQodm0sIHZvbGQsIG5ld1BhcmVudCwgbmV3SWR4KTsgfVxuXG5cdC8vIHRvZG86IHRlc3QgcmVzdWx0IG9mIHdpbGxSZWRyYXcgaG9va3MgYmVmb3JlIGNsZWFyaW5nIHJlZnNcblx0dm0ucmVmcyA9IG51bGw7XG5cblx0Ly8gYWx3YXlzIGFzc2lnbiB2bSBrZXkgdG8gcm9vdCB2bm9kZSAodGhpcyBpcyBhIGRlLW9wdClcblx0aWYgKHZtLmtleSAhPSBudWxsICYmIHZuZXcua2V5ICE9PSB2bS5rZXkpXG5cdFx0eyB2bmV3LmtleSA9IHZtLmtleTsgfVxuXG5cdHZtLm5vZGUgPSB2bmV3O1xuXG5cdGlmIChuZXdQYXJlbnQpIHtcblx0XHRwcmVQcm9jKHZuZXcsIG5ld1BhcmVudCwgbmV3SWR4LCB2bSk7XG5cdFx0bmV3UGFyZW50LmJvZHlbbmV3SWR4XSA9IHZuZXc7XG5cdH1cblx0ZWxzZSBpZiAodm9sZCAmJiB2b2xkLnBhcmVudCkge1xuXHRcdHByZVByb2Modm5ldywgdm9sZC5wYXJlbnQsIHZvbGQuaWR4LCB2bSk7XG5cdFx0dm9sZC5wYXJlbnQuYm9keVt2b2xkLmlkeF0gPSB2bmV3O1xuXHR9XG5cdGVsc2Vcblx0XHR7IHByZVByb2Modm5ldywgbnVsbCwgbnVsbCwgdm0pOyB9XG5cblx0aWYgKHdpdGhET00gIT09IGZhbHNlKSB7XG5cdFx0aWYgKHZvbGQpIHtcblx0XHRcdC8vIHJvb3Qgbm9kZSByZXBsYWNlbWVudFxuXHRcdFx0aWYgKHZvbGQudGFnICE9PSB2bmV3LnRhZyB8fCB2b2xkLmtleSAhPT0gdm5ldy5rZXkpIHtcblx0XHRcdFx0Ly8gaGFjayB0byBwcmV2ZW50IHRoZSByZXBsYWNlbWVudCBmcm9tIHRyaWdnZXJpbmcgbW91bnQvdW5tb3VudFxuXHRcdFx0XHR2b2xkLnZtID0gdm5ldy52bSA9IG51bGw7XG5cblx0XHRcdFx0dmFyIHBhckVsID0gdm9sZC5lbC5wYXJlbnROb2RlO1xuXHRcdFx0XHR2YXIgcmVmRWwgPSBuZXh0U2liKHZvbGQuZWwpO1xuXHRcdFx0XHRyZW1vdmVDaGlsZChwYXJFbCwgdm9sZC5lbCk7XG5cdFx0XHRcdGluc2VydEJlZm9yZShwYXJFbCwgaHlkcmF0ZSh2bmV3KSwgcmVmRWwpO1xuXG5cdFx0XHRcdC8vIGFub3RoZXIgaGFjayB0aGF0IGFsbG93cyBhbnkgaGlnaGVyLWxldmVsIHN5bmNDaGlsZHJlbiB0byBzZXRcblx0XHRcdFx0Ly8gcmVjb25jaWxpYXRpb24gYm91bmRzIHVzaW5nIGEgbGl2ZSBub2RlXG5cdFx0XHRcdHZvbGQuZWwgPSB2bmV3LmVsO1xuXG5cdFx0XHRcdC8vIHJlc3RvcmVcblx0XHRcdFx0dm5ldy52bSA9IHZtO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHR7IHBhdGNoKHZuZXcsIHZvbGQpOyB9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHRcdHsgaHlkcmF0ZSh2bmV3KTsgfVxuXHR9XG5cblx0aXNNb3VudGVkICYmIGZpcmVIb29rKHZtLmhvb2tzLCBcImRpZFJlZHJhd1wiLCB2bSwgdm0uZGF0YSk7XG5cblx0aWYgKGlzUmVkcmF3Um9vdCAmJiBpc01vdW50ZWQpXG5cdFx0eyBkcmFpbkRpZEhvb2tzKHZtKTsgfVxuXG5cdHtcblx0XHRpZiAoaXNSZWRyYXdSb290ICYmIERFVk1PREUubXV0YXRpb25zICYmIGlzTW91bnRlZClcblx0XHRcdHsgY29uc29sZS5sb2coaW5zdHIuZW5kKCkpOyB9XG5cdH1cblxuXHRyZXR1cm4gdm07XG59XG5cbi8vIHRoaXMgYWxzbyBkb3VibGVzIGFzIG1vdmVUb1xuLy8gVE9ETz8gQHdpdGhSZWRyYXcgKHByZXZlbnQgcmVkcmF3IGZyb20gZmlyaW5nKVxuZnVuY3Rpb24gdXBkYXRlU3luYyhuZXdEYXRhLCBuZXdQYXJlbnQsIG5ld0lkeCwgd2l0aERPTSkge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdGlmIChuZXdEYXRhICE9IG51bGwpIHtcblx0XHRpZiAodm0uZGF0YSAhPT0gbmV3RGF0YSkge1xuXHRcdFx0e1xuXHRcdFx0XHRkZXZOb3RpZnkoXCJEQVRBX1JFUExBQ0VEXCIsIFt2bSwgdm0uZGF0YSwgbmV3RGF0YV0pO1xuXHRcdFx0fVxuXHRcdFx0ZmlyZUhvb2sodm0uaG9va3MsIFwid2lsbFVwZGF0ZVwiLCB2bSwgbmV3RGF0YSk7XG5cdFx0XHR2bS5kYXRhID0gbmV3RGF0YTtcblxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoaXNTdHJlYW0odm0uX3N0cmVhbSkpXG5cdFx0XHRcdFx0eyB1bnN1YlN0cmVhbSh2bS5fc3RyZWFtKTsgfVxuXHRcdFx0XHRpZiAoaXNTdHJlYW0obmV3RGF0YSkpXG5cdFx0XHRcdFx0eyB2bS5fc3RyZWFtID0gaG9va1N0cmVhbTIobmV3RGF0YSwgdm0pOyB9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHZtLl9yZWRyYXcobmV3UGFyZW50LCBuZXdJZHgsIHdpdGhET00pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVFbGVtZW50KHRhZywgYXJnMSwgYXJnMiwgZmxhZ3MpIHtcblx0dmFyIGF0dHJzLCBib2R5O1xuXG5cdGlmIChhcmcyID09IG51bGwpIHtcblx0XHRpZiAoaXNQbGFpbk9iaihhcmcxKSlcblx0XHRcdHsgYXR0cnMgPSBhcmcxOyB9XG5cdFx0ZWxzZVxuXHRcdFx0eyBib2R5ID0gYXJnMTsgfVxuXHR9XG5cdGVsc2Uge1xuXHRcdGF0dHJzID0gYXJnMTtcblx0XHRib2R5ID0gYXJnMjtcblx0fVxuXG5cdHJldHVybiBpbml0RWxlbWVudE5vZGUodGFnLCBhdHRycywgYm9keSwgZmxhZ3MpO1xufVxuXG4vL2V4cG9ydCBjb25zdCBYTUxfTlMgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvXCI7XG52YXIgU1ZHX05TID0gXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiO1xuXG5mdW5jdGlvbiBkZWZpbmVTdmdFbGVtZW50KHRhZywgYXJnMSwgYXJnMiwgZmxhZ3MpIHtcblx0dmFyIG4gPSBkZWZpbmVFbGVtZW50KHRhZywgYXJnMSwgYXJnMiwgZmxhZ3MpO1xuXHRuLm5zID0gU1ZHX05TO1xuXHRyZXR1cm4gbjtcbn1cblxuZnVuY3Rpb24gZGVmaW5lQ29tbWVudChib2R5KSB7XG5cdHZhciBub2RlID0gbmV3IFZOb2RlO1xuXHRub2RlLnR5cGUgPSBDT01NRU5UO1xuXHRub2RlLmJvZHkgPSBib2R5O1xuXHRyZXR1cm4gbm9kZTtcbn1cblxuLy8gcGxhY2Vob2xkZXIgZm9yIGRlY2xhcmVkIHZpZXdzXG5mdW5jdGlvbiBWVmlldyh2aWV3LCBkYXRhLCBrZXksIG9wdHMpIHtcblx0dGhpcy52aWV3ID0gdmlldztcblx0dGhpcy5kYXRhID0gZGF0YTtcblx0dGhpcy5rZXkgPSBrZXk7XG5cdHRoaXMub3B0cyA9IG9wdHM7XG59XG5cblZWaWV3LnByb3RvdHlwZSA9IHtcblx0Y29uc3RydWN0b3I6IFZWaWV3LFxuXG5cdHR5cGU6IFZWSUVXLFxuXHR2aWV3OiBudWxsLFxuXHRkYXRhOiBudWxsLFxuXHRrZXk6IG51bGwsXG5cdG9wdHM6IG51bGwsXG59O1xuXG5mdW5jdGlvbiBkZWZpbmVWaWV3KHZpZXcsIGRhdGEsIGtleSwgb3B0cykge1xuXHRyZXR1cm4gbmV3IFZWaWV3KHZpZXcsIGRhdGEsIGtleSwgb3B0cyk7XG59XG5cbi8vIHBsYWNlaG9sZGVyIGZvciBpbmplY3RlZCBWaWV3TW9kZWxzXG5mdW5jdGlvbiBWTW9kZWwodm0pIHtcblx0dGhpcy52bSA9IHZtO1xufVxuXG5WTW9kZWwucHJvdG90eXBlID0ge1xuXHRjb25zdHJ1Y3RvcjogVk1vZGVsLFxuXG5cdHR5cGU6IFZNT0RFTCxcblx0dm06IG51bGwsXG59O1xuXG5mdW5jdGlvbiBpbmplY3RWaWV3KHZtKSB7XG4vL1x0aWYgKHZtLm5vZGUgPT0gbnVsbClcbi8vXHRcdHZtLl9yZWRyYXcobnVsbCwgbnVsbCwgZmFsc2UpO1xuXG4vL1x0cmV0dXJuIHZtLm5vZGU7XG5cblx0cmV0dXJuIG5ldyBWTW9kZWwodm0pO1xufVxuXG5mdW5jdGlvbiBpbmplY3RFbGVtZW50KGVsKSB7XG5cdHZhciBub2RlID0gbmV3IFZOb2RlO1xuXHRub2RlLnR5cGUgPSBFTEVNRU5UO1xuXHRub2RlLmVsID0gbm9kZS5rZXkgPSBlbDtcblx0cmV0dXJuIG5vZGU7XG59XG5cbmZ1bmN0aW9uIGxhenlMaXN0KGl0ZW1zLCBjZmcpIHtcblx0dmFyIGxlbiA9IGl0ZW1zLmxlbmd0aDtcblxuXHR2YXIgc2VsZiA9IHtcblx0XHRpdGVtczogaXRlbXMsXG5cdFx0bGVuZ3RoOiBsZW4sXG5cdFx0Ly8gZGVmYXVsdHMgdG8gcmV0dXJuaW5nIGl0ZW0gaWRlbnRpdHkgKG9yIHBvc2l0aW9uPylcblx0XHRrZXk6IGZ1bmN0aW9uKGkpIHtcblx0XHRcdHJldHVybiBjZmcua2V5KGl0ZW1zW2ldLCBpKTtcblx0XHR9LFxuXHRcdC8vIGRlZmF1bHQgcmV0dXJucyAwP1xuXHRcdGRpZmY6IGZ1bmN0aW9uKGksIGRvbm9yKSB7XG5cdFx0XHR2YXIgbmV3VmFscyA9IGNmZy5kaWZmKGl0ZW1zW2ldLCBpKTtcblx0XHRcdGlmIChkb25vciA9PSBudWxsKVxuXHRcdFx0XHR7IHJldHVybiBuZXdWYWxzOyB9XG5cdFx0XHR2YXIgb2xkVmFscyA9IGRvbm9yLl9kaWZmO1xuXHRcdFx0dmFyIHNhbWUgPSBuZXdWYWxzID09PSBvbGRWYWxzIHx8IGlzQXJyKG9sZFZhbHMpID8gY21wQXJyKG5ld1ZhbHMsIG9sZFZhbHMpIDogY21wT2JqKG5ld1ZhbHMsIG9sZFZhbHMpO1xuXHRcdFx0cmV0dXJuIHNhbWUgfHwgbmV3VmFscztcblx0XHR9LFxuXHRcdHRwbDogZnVuY3Rpb24oaSkge1xuXHRcdFx0cmV0dXJuIGNmZy50cGwoaXRlbXNbaV0sIGkpO1xuXHRcdH0sXG5cdFx0bWFwOiBmdW5jdGlvbih0cGwpIHtcblx0XHRcdGNmZy50cGwgPSB0cGw7XG5cdFx0XHRyZXR1cm4gc2VsZjtcblx0XHR9LFxuXHRcdGJvZHk6IGZ1bmN0aW9uKHZub2RlKSB7XG5cdFx0XHR2YXIgbmJvZHkgPSBBcnJheShsZW4pO1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRcdHZhciB2bm9kZTIgPSBzZWxmLnRwbChpKTtcblxuXHRcdFx0Ly9cdGlmICgodm5vZGUuZmxhZ3MgJiBLRVlFRF9MSVNUKSA9PT0gS0VZRURfTElTVCAmJiBzZWxmLiAhPSBudWxsKVxuXHRcdFx0Ly9cdFx0dm5vZGUyLmtleSA9IGdldEtleShpdGVtKTtcblxuXHRcdFx0XHR2bm9kZTIuX2RpZmYgPSBzZWxmLmRpZmYoaSk7XHRcdFx0Ly8gaG9sZHMgb2xkVmFscyBmb3IgY21wXG5cblx0XHRcdFx0bmJvZHlbaV0gPSB2bm9kZTI7XG5cblx0XHRcdFx0Ly8gcnVuIHByZXByb2MgcGFzcyAoc2hvdWxkIHRoaXMgYmUganVzdCBwcmVQcm9jIGluIGFib3ZlIGxvb3A/KSBiZW5jaFxuXHRcdFx0XHRwcmVQcm9jKHZub2RlMiwgdm5vZGUsIGkpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyByZXBsYWNlIExpc3Qgd2l0aCBnZW5lcmF0ZWQgYm9keVxuXHRcdFx0dm5vZGUuYm9keSA9IG5ib2R5O1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gc2VsZjtcbn1cblxudmFyIG5hbm8gPSB7XG5cdGNvbmZpZzogY29uZmlnLFxuXG5cdFZpZXdNb2RlbDogVmlld01vZGVsLFxuXHRWTm9kZTogVk5vZGUsXG5cblx0Y3JlYXRlVmlldzogY3JlYXRlVmlldyxcblxuXHRkZWZpbmVFbGVtZW50OiBkZWZpbmVFbGVtZW50LFxuXHRkZWZpbmVTdmdFbGVtZW50OiBkZWZpbmVTdmdFbGVtZW50LFxuXHRkZWZpbmVUZXh0OiBkZWZpbmVUZXh0LFxuXHRkZWZpbmVDb21tZW50OiBkZWZpbmVDb21tZW50LFxuXHRkZWZpbmVWaWV3OiBkZWZpbmVWaWV3LFxuXG5cdGluamVjdFZpZXc6IGluamVjdFZpZXcsXG5cdGluamVjdEVsZW1lbnQ6IGluamVjdEVsZW1lbnQsXG5cblx0bGF6eUxpc3Q6IGxhenlMaXN0LFxuXG5cdEZJWEVEX0JPRFk6IEZJWEVEX0JPRFksXG5cdERFRVBfUkVNT1ZFOiBERUVQX1JFTU9WRSxcblx0S0VZRURfTElTVDogS0VZRURfTElTVCxcblx0TEFaWV9MSVNUOiBMQVpZX0xJU1QsXG59O1xuXG5mdW5jdGlvbiBwcm90b1BhdGNoKG4sIGRvUmVwYWludCkge1xuXHRwYXRjaCQxKHRoaXMsIG4sIGRvUmVwYWludCk7XG59XG5cbi8vIG5ld05vZGUgY2FuIGJlIGVpdGhlciB7Y2xhc3M6IHN0eWxlOiB9IG9yIGZ1bGwgbmV3IFZOb2RlXG4vLyB3aWxsL2RpZFBhdGNoIGhvb2tzP1xuZnVuY3Rpb24gcGF0Y2gkMShvLCBuLCBkb1JlcGFpbnQpIHtcblx0aWYgKG4udHlwZSAhPSBudWxsKSB7XG5cdFx0Ly8gbm8gZnVsbCBwYXRjaGluZyBvZiB2aWV3IHJvb3RzLCBqdXN0IHVzZSByZWRyYXchXG5cdFx0aWYgKG8udm0gIT0gbnVsbClcblx0XHRcdHsgcmV0dXJuOyB9XG5cblx0XHRwcmVQcm9jKG4sIG8ucGFyZW50LCBvLmlkeCwgbnVsbCk7XG5cdFx0by5wYXJlbnQuYm9keVtvLmlkeF0gPSBuO1xuXHRcdHBhdGNoKG4sIG8pO1xuXHRcdGRvUmVwYWludCAmJiByZXBhaW50KG4pO1xuXHRcdGRyYWluRGlkSG9va3MoZ2V0Vm0obikpO1xuXHR9XG5cdGVsc2Uge1xuXHRcdC8vIFRPRE86IHJlLWVzdGFibGlzaCByZWZzXG5cblx0XHQvLyBzaGFsbG93LWNsb25lIHRhcmdldFxuXHRcdHZhciBkb25vciA9IE9iamVjdC5jcmVhdGUobyk7XG5cdFx0Ly8gZml4YXRlIG9yaWcgYXR0cnNcblx0XHRkb25vci5hdHRycyA9IGFzc2lnbk9iaih7fSwgby5hdHRycyk7XG5cdFx0Ly8gYXNzaWduIG5ldyBhdHRycyBpbnRvIGxpdmUgdGFyZyBub2RlXG5cdFx0dmFyIG9hdHRycyA9IGFzc2lnbk9iaihvLmF0dHJzLCBuKTtcblx0XHQvLyBwcmVwZW5kIGFueSBmaXhlZCBzaG9ydGhhbmQgY2xhc3Ncblx0XHRpZiAoby5fY2xhc3MgIT0gbnVsbCkge1xuXHRcdFx0dmFyIGFjbGFzcyA9IG9hdHRycy5jbGFzcztcblx0XHRcdG9hdHRycy5jbGFzcyA9IGFjbGFzcyAhPSBudWxsICYmIGFjbGFzcyAhPT0gXCJcIiA/IG8uX2NsYXNzICsgXCIgXCIgKyBhY2xhc3MgOiBvLl9jbGFzcztcblx0XHR9XG5cblx0XHRwYXRjaEF0dHJzKG8sIGRvbm9yKTtcblxuXHRcdGRvUmVwYWludCAmJiByZXBhaW50KG8pO1xuXHR9XG59XG5cblZOb2RlUHJvdG8ucGF0Y2ggPSBwcm90b1BhdGNoO1xuXG5mdW5jdGlvbiBuZXh0U3ViVm1zKG4sIGFjY3VtKSB7XG5cdHZhciBib2R5ID0gbi5ib2R5O1xuXG5cdGlmIChpc0Fycihib2R5KSkge1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYm9keS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG4yID0gYm9keVtpXTtcblxuXHRcdFx0aWYgKG4yLnZtICE9IG51bGwpXG5cdFx0XHRcdHsgYWNjdW0ucHVzaChuMi52bSk7IH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0eyBuZXh0U3ViVm1zKG4yLCBhY2N1bSk7IH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gYWNjdW07XG59XG5cbmZ1bmN0aW9uIGRlZmluZUVsZW1lbnRTcHJlYWQodGFnKSB7XG5cdHZhciBhcmdzID0gYXJndW1lbnRzO1xuXHR2YXIgbGVuID0gYXJncy5sZW5ndGg7XG5cdHZhciBib2R5LCBhdHRycztcblxuXHRpZiAobGVuID4gMSkge1xuXHRcdHZhciBib2R5SWR4ID0gMTtcblxuXHRcdGlmIChpc1BsYWluT2JqKGFyZ3NbMV0pKSB7XG5cdFx0XHRhdHRycyA9IGFyZ3NbMV07XG5cdFx0XHRib2R5SWR4ID0gMjtcblx0XHR9XG5cblx0XHRpZiAobGVuID09PSBib2R5SWR4ICsgMSAmJiAoaXNWYWwoYXJnc1tib2R5SWR4XSkgfHwgaXNBcnIoYXJnc1tib2R5SWR4XSkgfHwgYXR0cnMgJiYgKGF0dHJzLl9mbGFncyAmIExBWllfTElTVCkgPT09IExBWllfTElTVCkpXG5cdFx0XHR7IGJvZHkgPSBhcmdzW2JvZHlJZHhdOyB9XG5cdFx0ZWxzZVxuXHRcdFx0eyBib2R5ID0gc2xpY2VBcmdzKGFyZ3MsIGJvZHlJZHgpOyB9XG5cdH1cblxuXHRyZXR1cm4gaW5pdEVsZW1lbnROb2RlKHRhZywgYXR0cnMsIGJvZHkpO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVTdmdFbGVtZW50U3ByZWFkKCkge1xuXHR2YXIgbiA9IGRlZmluZUVsZW1lbnRTcHJlYWQuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcblx0bi5ucyA9IFNWR19OUztcblx0cmV0dXJuIG47XG59XG5cblZpZXdNb2RlbFByb3RvLmVtaXQgPSBlbWl0O1xuVmlld01vZGVsUHJvdG8ub25lbWl0ID0gbnVsbDtcblxuVmlld01vZGVsUHJvdG8uYm9keSA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gbmV4dFN1YlZtcyh0aGlzLm5vZGUsIFtdKTtcbn07XG5cbm5hbm8uZGVmaW5lRWxlbWVudFNwcmVhZCA9IGRlZmluZUVsZW1lbnRTcHJlYWQ7XG5uYW5vLmRlZmluZVN2Z0VsZW1lbnRTcHJlYWQgPSBkZWZpbmVTdmdFbGVtZW50U3ByZWFkO1xuXG5WaWV3TW9kZWxQcm90by5fc3RyZWFtID0gbnVsbDtcblxuZnVuY3Rpb24gcHJvdG9BdHRhY2goZWwpIHtcblx0dmFyIHZtID0gdGhpcztcblx0aWYgKHZtLm5vZGUgPT0gbnVsbClcblx0XHR7IHZtLl9yZWRyYXcobnVsbCwgbnVsbCwgZmFsc2UpOyB9XG5cblx0YXR0YWNoKHZtLm5vZGUsIGVsKTtcblxuXHRyZXR1cm4gdm07XG59XG5cbi8vIHZlcnkgc2ltaWxhciB0byBoeWRyYXRlLCBUT0RPOiBkcnlcbmZ1bmN0aW9uIGF0dGFjaCh2bm9kZSwgd2l0aEVsKSB7XG5cdHZub2RlLmVsID0gd2l0aEVsO1xuXHR3aXRoRWwuX25vZGUgPSB2bm9kZTtcblxuXHR2YXIgbmF0dHJzID0gdm5vZGUuYXR0cnM7XG5cblx0Zm9yICh2YXIga2V5IGluIG5hdHRycykge1xuXHRcdHZhciBudmFsID0gbmF0dHJzW2tleV07XG5cdFx0dmFyIGlzRHluID0gaXNEeW5Qcm9wKHZub2RlLnRhZywga2V5KTtcblxuXHRcdGlmIChpc1N0eWxlUHJvcChrZXkpIHx8IGlzU3BsUHJvcChrZXkpKSB7fVxuXHRcdGVsc2UgaWYgKGlzRXZQcm9wKGtleSkpXG5cdFx0XHR7IHBhdGNoRXZlbnQodm5vZGUsIGtleSwgbnZhbCk7IH1cblx0XHRlbHNlIGlmIChudmFsICE9IG51bGwgJiYgaXNEeW4pXG5cdFx0XHR7IHNldEF0dHIodm5vZGUsIGtleSwgbnZhbCwgaXNEeW4pOyB9XG5cdH1cblxuXHRpZiAoKHZub2RlLmZsYWdzICYgTEFaWV9MSVNUKSA9PT0gTEFaWV9MSVNUKVxuXHRcdHsgdm5vZGUuYm9keS5ib2R5KHZub2RlKTsgfVxuXG5cdGlmIChpc0Fycih2bm9kZS5ib2R5KSAmJiB2bm9kZS5ib2R5Lmxlbmd0aCA+IDApIHtcblx0XHR2YXIgYyA9IHdpdGhFbC5maXJzdENoaWxkO1xuXHRcdHZhciBpID0gMDtcblx0XHR2YXIgdiA9IHZub2RlLmJvZHlbaV07XG5cdFx0ZG8ge1xuXHRcdFx0aWYgKHYudHlwZSA9PT0gVlZJRVcpXG5cdFx0XHRcdHsgdiA9IGNyZWF0ZVZpZXcodi52aWV3LCB2LmRhdGEsIHYua2V5LCB2Lm9wdHMpLl9yZWRyYXcodm5vZGUsIGksIGZhbHNlKS5ub2RlOyB9XG5cdFx0XHRlbHNlIGlmICh2LnR5cGUgPT09IFZNT0RFTClcblx0XHRcdFx0eyB2ID0gdi5ub2RlIHx8IHYuX3JlZHJhdyh2bm9kZSwgaSwgZmFsc2UpLm5vZGU7IH1cblxuXHRcdFx0e1xuXHRcdFx0XHRpZiAodm5vZGUudGFnID09PSBcInRhYmxlXCIgJiYgdi50YWcgPT09IFwidHJcIikge1xuXHRcdFx0XHRcdGRldk5vdGlmeShcIkFUVEFDSF9JTVBMSUNJVF9UQk9EWVwiLCBbdm5vZGUsIHZdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRhdHRhY2godiwgYyk7XG5cdFx0fSB3aGlsZSAoKGMgPSBjLm5leHRTaWJsaW5nKSAmJiAodiA9IHZub2RlLmJvZHlbKytpXSkpXG5cdH1cbn1cblxuZnVuY3Rpb24gdm1Qcm90b0h0bWwoZHluUHJvcHMpIHtcblx0dmFyIHZtID0gdGhpcztcblxuXHRpZiAodm0ubm9kZSA9PSBudWxsKVxuXHRcdHsgdm0uX3JlZHJhdyhudWxsLCBudWxsLCBmYWxzZSk7IH1cblxuXHRyZXR1cm4gaHRtbCh2bS5ub2RlLCBkeW5Qcm9wcyk7XG59XG5cbmZ1bmN0aW9uIHZQcm90b0h0bWwoZHluUHJvcHMpIHtcblx0cmV0dXJuIGh0bWwodGhpcywgZHluUHJvcHMpO1xufVxuXG5mdW5jdGlvbiBjYW1lbERhc2godmFsKSB7XG5cdHJldHVybiB2YWwucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVTdHIoY3NzKSB7XG5cdHZhciBzdHlsZSA9IFwiXCI7XG5cblx0Zm9yICh2YXIgcG5hbWUgaW4gY3NzKSB7XG5cdFx0aWYgKGNzc1twbmFtZV0gIT0gbnVsbClcblx0XHRcdHsgc3R5bGUgKz0gY2FtZWxEYXNoKHBuYW1lKSArIFwiOiBcIiArIGF1dG9QeChwbmFtZSwgY3NzW3BuYW1lXSkgKyAnOyAnOyB9XG5cdH1cblxuXHRyZXR1cm4gc3R5bGU7XG59XG5cbmZ1bmN0aW9uIHRvU3RyKHZhbCkge1xuXHRyZXR1cm4gdmFsID09IG51bGwgPyAnJyA6ICcnK3ZhbDtcbn1cblxudmFyIHZvaWRUYWdzID0ge1xuICAgIGFyZWE6IHRydWUsXG4gICAgYmFzZTogdHJ1ZSxcbiAgICBicjogdHJ1ZSxcbiAgICBjb2w6IHRydWUsXG4gICAgY29tbWFuZDogdHJ1ZSxcbiAgICBlbWJlZDogdHJ1ZSxcbiAgICBocjogdHJ1ZSxcbiAgICBpbWc6IHRydWUsXG4gICAgaW5wdXQ6IHRydWUsXG4gICAga2V5Z2VuOiB0cnVlLFxuICAgIGxpbms6IHRydWUsXG4gICAgbWV0YTogdHJ1ZSxcbiAgICBwYXJhbTogdHJ1ZSxcbiAgICBzb3VyY2U6IHRydWUsXG4gICAgdHJhY2s6IHRydWUsXG5cdHdicjogdHJ1ZVxufTtcblxuZnVuY3Rpb24gZXNjSHRtbChzKSB7XG5cdHMgPSB0b1N0cihzKTtcblxuXHRmb3IgKHZhciBpID0gMCwgb3V0ID0gJyc7IGkgPCBzLmxlbmd0aDsgaSsrKSB7XG5cdFx0c3dpdGNoIChzW2ldKSB7XG5cdFx0XHRjYXNlICcmJzogb3V0ICs9ICcmYW1wOyc7ICBicmVhaztcblx0XHRcdGNhc2UgJzwnOiBvdXQgKz0gJyZsdDsnOyAgIGJyZWFrO1xuXHRcdFx0Y2FzZSAnPic6IG91dCArPSAnJmd0Oyc7ICAgYnJlYWs7XG5cdFx0Ly9cdGNhc2UgJ1wiJzogb3V0ICs9ICcmcXVvdDsnOyBicmVhaztcblx0XHQvL1x0Y2FzZSBcIidcIjogb3V0ICs9ICcmIzAzOTsnOyBicmVhaztcblx0XHQvL1x0Y2FzZSAnLyc6IG91dCArPSAnJiN4MmY7JzsgYnJlYWs7XG5cdFx0XHRkZWZhdWx0OiAgb3V0ICs9IHNbaV07XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gZXNjUXVvdGVzKHMpIHtcblx0cyA9IHRvU3RyKHMpO1xuXG5cdGZvciAodmFyIGkgPSAwLCBvdXQgPSAnJzsgaSA8IHMubGVuZ3RoOyBpKyspXG5cdFx0eyBvdXQgKz0gc1tpXSA9PT0gJ1wiJyA/ICcmcXVvdDsnIDogc1tpXTsgfVx0XHQvLyBhbHNvICY/XG5cblx0cmV0dXJuIG91dDtcbn1cblxuZnVuY3Rpb24gZWFjaEh0bWwoYXJyLCBkeW5Qcm9wcykge1xuXHR2YXIgYnVmID0gJyc7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKVxuXHRcdHsgYnVmICs9IGh0bWwoYXJyW2ldLCBkeW5Qcm9wcyk7IH1cblx0cmV0dXJuIGJ1Zjtcbn1cblxudmFyIGlubmVySFRNTCA9IFwiLmlubmVySFRNTFwiO1xuXG5mdW5jdGlvbiBodG1sKG5vZGUsIGR5blByb3BzKSB7XG5cdHZhciBvdXQsIHN0eWxlO1xuXG5cdHN3aXRjaCAobm9kZS50eXBlKSB7XG5cdFx0Y2FzZSBWVklFVzpcblx0XHRcdG91dCA9IGNyZWF0ZVZpZXcobm9kZS52aWV3LCBub2RlLmRhdGEsIG5vZGUua2V5LCBub2RlLm9wdHMpLmh0bWwoZHluUHJvcHMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBWTU9ERUw6XG5cdFx0XHRvdXQgPSBub2RlLnZtLmh0bWwoKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgRUxFTUVOVDpcblx0XHRcdGlmIChub2RlLmVsICE9IG51bGwgJiYgbm9kZS50YWcgPT0gbnVsbCkge1xuXHRcdFx0XHRvdXQgPSBub2RlLmVsLm91dGVySFRNTDtcdFx0Ly8gcHJlLWV4aXN0aW5nIGRvbSBlbGVtZW50cyAoZG9lcyBub3QgY3VycmVudGx5IGFjY291bnQgZm9yIGFueSBwcm9wcyBhcHBsaWVkIHRvIHRoZW0pXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgYnVmID0gXCJcIjtcblxuXHRcdFx0YnVmICs9IFwiPFwiICsgbm9kZS50YWc7XG5cblx0XHRcdHZhciBhdHRycyA9IG5vZGUuYXR0cnMsXG5cdFx0XHRcdGhhc0F0dHJzID0gYXR0cnMgIT0gbnVsbDtcblxuXHRcdFx0aWYgKGhhc0F0dHJzKSB7XG5cdFx0XHRcdGZvciAodmFyIHBuYW1lIGluIGF0dHJzKSB7XG5cdFx0XHRcdFx0aWYgKGlzRXZQcm9wKHBuYW1lKSB8fCBwbmFtZVswXSA9PT0gXCIuXCIgfHwgcG5hbWVbMF0gPT09IFwiX1wiIHx8IGR5blByb3BzID09PSBmYWxzZSAmJiBpc0R5blByb3Aobm9kZS50YWcsIHBuYW1lKSlcblx0XHRcdFx0XHRcdHsgY29udGludWU7IH1cblxuXHRcdFx0XHRcdHZhciB2YWwgPSBhdHRyc1twbmFtZV07XG5cblx0XHRcdFx0XHRpZiAocG5hbWUgPT09IFwic3R5bGVcIiAmJiB2YWwgIT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0c3R5bGUgPSB0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiID8gc3R5bGVTdHIodmFsKSA6IHZhbDtcblx0XHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh2YWwgPT09IHRydWUpXG5cdFx0XHRcdFx0XHR7IGJ1ZiArPSBcIiBcIiArIGVzY0h0bWwocG5hbWUpICsgJz1cIlwiJzsgfVxuXHRcdFx0XHRcdGVsc2UgaWYgKHZhbCA9PT0gZmFsc2UpIHt9XG5cdFx0XHRcdFx0ZWxzZSBpZiAodmFsICE9IG51bGwpXG5cdFx0XHRcdFx0XHR7IGJ1ZiArPSBcIiBcIiArIGVzY0h0bWwocG5hbWUpICsgJz1cIicgKyBlc2NRdW90ZXModmFsKSArICdcIic7IH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChzdHlsZSAhPSBudWxsKVxuXHRcdFx0XHRcdHsgYnVmICs9ICcgc3R5bGU9XCInICsgZXNjUXVvdGVzKHN0eWxlLnRyaW0oKSkgKyAnXCInOyB9XG5cdFx0XHR9XG5cblx0XHRcdC8vIGlmIGJvZHktbGVzcyBzdmcgbm9kZSwgYXV0by1jbG9zZSAmIHJldHVyblxuXHRcdFx0aWYgKG5vZGUuYm9keSA9PSBudWxsICYmIG5vZGUubnMgIT0gbnVsbCAmJiBub2RlLnRhZyAhPT0gXCJzdmdcIilcblx0XHRcdFx0eyByZXR1cm4gYnVmICsgXCIvPlwiOyB9XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHsgYnVmICs9IFwiPlwiOyB9XG5cblx0XHRcdGlmICghdm9pZFRhZ3Nbbm9kZS50YWddKSB7XG5cdFx0XHRcdGlmIChoYXNBdHRycyAmJiBhdHRyc1tpbm5lckhUTUxdICE9IG51bGwpXG5cdFx0XHRcdFx0eyBidWYgKz0gYXR0cnNbaW5uZXJIVE1MXTsgfVxuXHRcdFx0XHRlbHNlIGlmIChpc0Fycihub2RlLmJvZHkpKVxuXHRcdFx0XHRcdHsgYnVmICs9IGVhY2hIdG1sKG5vZGUuYm9keSwgZHluUHJvcHMpOyB9XG5cdFx0XHRcdGVsc2UgaWYgKChub2RlLmZsYWdzICYgTEFaWV9MSVNUKSA9PT0gTEFaWV9MSVNUKSB7XG5cdFx0XHRcdFx0bm9kZS5ib2R5LmJvZHkobm9kZSk7XG5cdFx0XHRcdFx0YnVmICs9IGVhY2hIdG1sKG5vZGUuYm9keSwgZHluUHJvcHMpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7IGJ1ZiArPSBlc2NIdG1sKG5vZGUuYm9keSk7IH1cblxuXHRcdFx0XHRidWYgKz0gXCI8L1wiICsgbm9kZS50YWcgKyBcIj5cIjtcblx0XHRcdH1cblx0XHRcdG91dCA9IGJ1Zjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVEVYVDpcblx0XHRcdG91dCA9IGVzY0h0bWwobm9kZS5ib2R5KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgQ09NTUVOVDpcblx0XHRcdG91dCA9IFwiPCEtLVwiICsgZXNjSHRtbChub2RlLmJvZHkpICsgXCItLT5cIjtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIG91dDtcbn1cblxuVmlld01vZGVsUHJvdG8uYXR0YWNoID0gcHJvdG9BdHRhY2g7XG5cblZpZXdNb2RlbFByb3RvLmh0bWwgPSB2bVByb3RvSHRtbDtcblZOb2RlUHJvdG8uaHRtbCA9IHZQcm90b0h0bWw7XG5cbm5hbm8uREVWTU9ERSA9IERFVk1PREU7XG5cbnJldHVybiBuYW5vO1xuXG59KSkpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZG9tdm0uZGV2LmpzLm1hcFxuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gIGdsb2JhbCA9IHRoaXNcblxuICB2YXIgcXVldWVJZCA9IDFcbiAgdmFyIHF1ZXVlID0ge31cbiAgdmFyIGlzUnVubmluZ1Rhc2sgPSBmYWxzZVxuXG4gIGlmICghZ2xvYmFsLnNldEltbWVkaWF0ZSlcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoZS5zb3VyY2UgPT0gZ2xvYmFsKXtcbiAgICAgICAgaWYgKGlzUnVubmluZ1Rhc2spXG4gICAgICAgICAgbmV4dFRpY2socXVldWVbZS5kYXRhXSlcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaXNSdW5uaW5nVGFzayA9IHRydWVcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcXVldWVbZS5kYXRhXSgpXG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgIGRlbGV0ZSBxdWV1ZVtlLmRhdGFdXG4gICAgICAgICAgaXNSdW5uaW5nVGFzayA9IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgaWYgKGdsb2JhbC5zZXRJbW1lZGlhdGUpIHNldEltbWVkaWF0ZShmbilcbiAgICAvLyBpZiBpbnNpZGUgb2Ygd2ViIHdvcmtlclxuICAgIGVsc2UgaWYgKGdsb2JhbC5pbXBvcnRTY3JpcHRzKSBzZXRUaW1lb3V0KGZuKVxuICAgIGVsc2Uge1xuICAgICAgcXVldWVJZCsrXG4gICAgICBxdWV1ZVtxdWV1ZUlkXSA9IGZuXG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UocXVldWVJZCwgJyonKVxuICAgIH1cbiAgfVxuXG4gIERlZmVycmVkLnJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoISh0aGlzLl9kID09IDEpKVxuICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERlZmVycmVkKVxuICAgICAgcmV0dXJuIHZhbHVlXG5cbiAgICByZXR1cm4gbmV3IERlZmVycmVkKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgIHJlc29sdmUodmFsdWUpXG4gICAgfSlcbiAgfVxuXG4gIERlZmVycmVkLnJlamVjdCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgcmV0dXJuIG5ldyBEZWZlcnJlZChmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHJlamVjdCh2YWx1ZSlcbiAgICB9KVxuICB9XG5cbiAgRGVmZXJyZWQuYWxsID0gZnVuY3Rpb24gKGFycikge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgaWYgKCEoYXJyIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgcmV0dXJuIERlZmVycmVkLnJlamVjdChUeXBlRXJyb3IoKSlcblxuICAgIHZhciBkID0gbmV3IERlZmVycmVkKClcblxuICAgIGZ1bmN0aW9uIGRvbmUoZSwgdikge1xuICAgICAgaWYgKHYpXG4gICAgICAgIHJldHVybiBkLnJlc29sdmUodilcblxuICAgICAgaWYgKGUpXG4gICAgICAgIHJldHVybiBkLnJlamVjdChlKVxuXG4gICAgICB2YXIgdW5yZXNvbHZlZCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGNudCwgdikge1xuICAgICAgICBpZiAodiAmJiB2LnRoZW4pXG4gICAgICAgICAgcmV0dXJuIGNudCArIDFcbiAgICAgICAgcmV0dXJuIGNudFxuICAgICAgfSwgMClcblxuICAgICAgaWYodW5yZXNvbHZlZCA9PSAwKVxuICAgICAgICBkLnJlc29sdmUoYXJyKVxuXG4gICAgICBhcnIubWFwKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgIGlmICh2ICYmIHYudGhlbilcbiAgICAgICAgICB2LnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGFycltpXSA9IHJcbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgcmV0dXJuIHJcbiAgICAgICAgICB9LCBkb25lKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIHJldHVybiBkXG4gIH1cblxuICBEZWZlcnJlZC5yYWNlID0gZnVuY3Rpb24gKGFycikge1xuICAgIGlmICghKHRoaXMuX2QgPT0gMSkpXG4gICAgICB0aHJvdyBUeXBlRXJyb3IoKVxuXG4gICAgaWYgKCEoYXJyIGluc3RhbmNlb2YgQXJyYXkpKVxuICAgICAgcmV0dXJuIERlZmVycmVkLnJlamVjdChUeXBlRXJyb3IoKSlcblxuICAgIGlmIChhcnIubGVuZ3RoID09IDApXG4gICAgICByZXR1cm4gbmV3IERlZmVycmVkKClcblxuICAgIHZhciBkID0gbmV3IERlZmVycmVkKClcblxuICAgIGZ1bmN0aW9uIGRvbmUoZSwgdikge1xuICAgICAgaWYgKHYpXG4gICAgICAgIHJldHVybiBkLnJlc29sdmUodilcblxuICAgICAgaWYgKGUpXG4gICAgICAgIHJldHVybiBkLnJlamVjdChlKVxuXG4gICAgICB2YXIgdW5yZXNvbHZlZCA9IGFyci5yZWR1Y2UoZnVuY3Rpb24gKGNudCwgdikge1xuICAgICAgICBpZiAodiAmJiB2LnRoZW4pXG4gICAgICAgICAgcmV0dXJuIGNudCArIDFcbiAgICAgICAgcmV0dXJuIGNudFxuICAgICAgfSwgMClcblxuICAgICAgaWYodW5yZXNvbHZlZCA9PSAwKVxuICAgICAgICBkLnJlc29sdmUoYXJyKVxuXG4gICAgICBhcnIubWFwKGZ1bmN0aW9uICh2LCBpKSB7XG4gICAgICAgIGlmICh2ICYmIHYudGhlbilcbiAgICAgICAgICB2LnRoZW4oZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgICAgIGRvbmUobnVsbCwgcilcbiAgICAgICAgICB9LCBkb25lKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBkb25lKClcblxuICAgIHJldHVybiBkXG4gIH1cblxuICBEZWZlcnJlZC5fZCA9IDFcblxuXG4gIC8qKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGZ1bmN0aW9uIERlZmVycmVkKHJlc29sdmVyKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG4gICAgaWYgKHR5cGVvZiByZXNvbHZlciAhPSAnZnVuY3Rpb24nICYmIHJlc29sdmVyICE9IHVuZGVmaW5lZClcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICBpZiAodHlwZW9mIHRoaXMgIT0gJ29iamVjdCcgfHwgKHRoaXMgJiYgdGhpcy50aGVuKSlcbiAgICAgIHRocm93IFR5cGVFcnJvcigpXG5cbiAgICAvLyBzdGF0ZXNcbiAgICAvLyAwOiBwZW5kaW5nXG4gICAgLy8gMTogcmVzb2x2aW5nXG4gICAgLy8gMjogcmVqZWN0aW5nXG4gICAgLy8gMzogcmVzb2x2ZWRcbiAgICAvLyA0OiByZWplY3RlZFxuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgIHN0YXRlID0gMCxcbiAgICAgIHZhbCA9IDAsXG4gICAgICBuZXh0ID0gW10sXG4gICAgICBmbiwgZXI7XG5cbiAgICBzZWxmWydwcm9taXNlJ10gPSBzZWxmXG5cbiAgICBzZWxmWydyZXNvbHZlJ10gPSBmdW5jdGlvbiAodikge1xuICAgICAgZm4gPSBzZWxmLmZuXG4gICAgICBlciA9IHNlbGYuZXJcbiAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgdmFsID0gdlxuICAgICAgICBzdGF0ZSA9IDFcblxuICAgICAgICBuZXh0VGljayhmaXJlKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGZcbiAgICB9XG5cbiAgICBzZWxmWydyZWplY3QnXSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICBmbiA9IHNlbGYuZm5cbiAgICAgIGVyID0gc2VsZi5lclxuICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICB2YWwgPSB2XG4gICAgICAgIHN0YXRlID0gMlxuXG4gICAgICAgIG5leHRUaWNrKGZpcmUpXG5cbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmXG4gICAgfVxuXG4gICAgc2VsZlsnX2QnXSA9IDFcblxuICAgIHNlbGZbJ3RoZW4nXSA9IGZ1bmN0aW9uIChfZm4sIF9lcikge1xuICAgICAgaWYgKCEodGhpcy5fZCA9PSAxKSlcbiAgICAgICAgdGhyb3cgVHlwZUVycm9yKClcblxuICAgICAgdmFyIGQgPSBuZXcgRGVmZXJyZWQoKVxuXG4gICAgICBkLmZuID0gX2ZuXG4gICAgICBkLmVyID0gX2VyXG4gICAgICBpZiAoc3RhdGUgPT0gMykge1xuICAgICAgICBkLnJlc29sdmUodmFsKVxuICAgICAgfVxuICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gNCkge1xuICAgICAgICBkLnJlamVjdCh2YWwpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV4dC5wdXNoKGQpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkXG4gICAgfVxuXG4gICAgc2VsZlsnY2F0Y2gnXSA9IGZ1bmN0aW9uIChfZXIpIHtcbiAgICAgIHJldHVybiBzZWxmWyd0aGVuJ10obnVsbCwgX2VyKVxuICAgIH1cblxuICAgIHZhciBmaW5pc2ggPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgc3RhdGUgPSB0eXBlIHx8IDRcbiAgICAgIG5leHQubWFwKGZ1bmN0aW9uIChwKSB7XG4gICAgICAgIHN0YXRlID09IDMgJiYgcC5yZXNvbHZlKHZhbCkgfHwgcC5yZWplY3QodmFsKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiByZXNvbHZlciA9PSAnZnVuY3Rpb24nKVxuICAgICAgICByZXNvbHZlcihzZWxmWydyZXNvbHZlJ10sIHNlbGZbJ3JlamVjdCddKVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHNlbGZbJ3JlamVjdCddKGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGZcblxuICAgIC8vIHJlZiA6IHJlZmVyZW5jZSB0byAndGhlbicgZnVuY3Rpb25cbiAgICAvLyBjYiwgZWMsIGNuIDogc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2ssIG5vdFRoZW5uYWJsZUNhbGxiYWNrXG4gICAgZnVuY3Rpb24gdGhlbm5hYmxlIChyZWYsIGNiLCBlYywgY24pIHtcbiAgICAgIC8vIFByb21pc2VzIGNhbiBiZSByZWplY3RlZCB3aXRoIG90aGVyIHByb21pc2VzLCB3aGljaCBzaG91bGQgcGFzcyB0aHJvdWdoXG4gICAgICBpZiAoc3RhdGUgPT0gMikge1xuICAgICAgICByZXR1cm4gY24oKVxuICAgICAgfVxuICAgICAgaWYgKCh0eXBlb2YgdmFsID09ICdvYmplY3QnIHx8IHR5cGVvZiB2YWwgPT0gJ2Z1bmN0aW9uJykgJiYgdHlwZW9mIHJlZiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRyeSB7XG5cbiAgICAgICAgICAvLyBjbnQgcHJvdGVjdHMgYWdhaW5zdCBhYnVzZSBjYWxscyBmcm9tIHNwZWMgY2hlY2tlclxuICAgICAgICAgIHZhciBjbnQgPSAwXG4gICAgICAgICAgcmVmLmNhbGwodmFsLCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKGNudCsrKSByZXR1cm5cbiAgICAgICAgICAgIHZhbCA9IHZcbiAgICAgICAgICAgIGNiKClcbiAgICAgICAgICB9LCBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgaWYgKGNudCsrKSByZXR1cm5cbiAgICAgICAgICAgIHZhbCA9IHZcbiAgICAgICAgICAgIGVjKClcbiAgICAgICAgICB9KVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsID0gZVxuICAgICAgICAgIGVjKClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY24oKVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmaXJlKCkge1xuXG4gICAgICAvLyBjaGVjayBpZiBpdCdzIGEgdGhlbmFibGVcbiAgICAgIHZhciByZWY7XG4gICAgICB0cnkge1xuICAgICAgICByZWYgPSB2YWwgJiYgdmFsLnRoZW5cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdmFsID0gZVxuICAgICAgICBzdGF0ZSA9IDJcbiAgICAgICAgcmV0dXJuIGZpcmUoKVxuICAgICAgfVxuXG4gICAgICB0aGVubmFibGUocmVmLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXRlID0gMVxuICAgICAgICBmaXJlKClcbiAgICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhdGUgPSAyXG4gICAgICAgIGZpcmUoKVxuICAgICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PSAxICYmIHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YWwgPSBmbih2YWwpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT0gMiAmJiB0eXBlb2YgZXIgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFsID0gZXIodmFsKVxuICAgICAgICAgICAgc3RhdGUgPSAxXG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdmFsID0gZVxuICAgICAgICAgIHJldHVybiBmaW5pc2goKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCA9PSBzZWxmKSB7XG4gICAgICAgICAgdmFsID0gVHlwZUVycm9yKClcbiAgICAgICAgICBmaW5pc2goKVxuICAgICAgICB9IGVsc2UgdGhlbm5hYmxlKHJlZiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZmluaXNoKDMpXG4gICAgICAgICAgfSwgZmluaXNoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmaW5pc2goc3RhdGUgPT0gMSAmJiAzKVxuICAgICAgICAgIH0pXG5cbiAgICAgIH0pXG4gICAgfVxuXG5cbiAgfVxuXG4gIC8vIEV4cG9ydCBvdXIgbGlicmFyeSBvYmplY3QsIGVpdGhlciBmb3Igbm9kZS5qcyBvciBhcyBhIGdsb2JhbGx5IHNjb3BlZCB2YXJpYWJsZVxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZVsnZXhwb3J0cyddID0gRGVmZXJyZWRcbiAgfSBlbHNlIHtcbiAgICBnbG9iYWxbJ1Byb21pc2UnXSA9IGdsb2JhbFsnUHJvbWlzZSddIHx8IERlZmVycmVkXG4gIH1cbn0pKClcbiIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcbiIsInZhciBzY29wZSA9ICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbCkgfHxcbiAgICAgICAgICAgICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmKSB8fFxuICAgICAgICAgICAgd2luZG93O1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFyVGltZW91dCk7XG59O1xuZXhwb3J0cy5zZXRJbnRlcnZhbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFRpbWVvdXQoYXBwbHkuY2FsbChzZXRJbnRlcnZhbCwgc2NvcGUsIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwoc2NvcGUsIHRoaXMuX2lkKTtcbn07XG5cbi8vIERvZXMgbm90IHN0YXJ0IHRoZSB0aW1lLCBqdXN0IHNldHMgdXAgdGhlIG1lbWJlcnMgbmVlZGVkLlxuZXhwb3J0cy5lbnJvbGwgPSBmdW5jdGlvbihpdGVtLCBtc2Vjcykge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gbXNlY3M7XG59O1xuXG5leHBvcnRzLnVuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG4gIGl0ZW0uX2lkbGVUaW1lb3V0ID0gLTE7XG59O1xuXG5leHBvcnRzLl91bnJlZkFjdGl2ZSA9IGV4cG9ydHMuYWN0aXZlID0gZnVuY3Rpb24oaXRlbSkge1xuICBjbGVhclRpbWVvdXQoaXRlbS5faWRsZVRpbWVvdXRJZCk7XG5cbiAgdmFyIG1zZWNzID0gaXRlbS5faWRsZVRpbWVvdXQ7XG4gIGlmIChtc2VjcyA+PSAwKSB7XG4gICAgaXRlbS5faWRsZVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gb25UaW1lb3V0KCkge1xuICAgICAgaWYgKGl0ZW0uX29uVGltZW91dClcbiAgICAgICAgaXRlbS5fb25UaW1lb3V0KCk7XG4gICAgfSwgbXNlY3MpO1xuICB9XG59O1xuXG4vLyBzZXRpbW1lZGlhdGUgYXR0YWNoZXMgaXRzZWxmIHRvIHRoZSBnbG9iYWwgb2JqZWN0XG5yZXF1aXJlKFwic2V0aW1tZWRpYXRlXCIpO1xuLy8gT24gc29tZSBleG90aWMgZW52aXJvbm1lbnRzLCBpdCdzIG5vdCBjbGVhciB3aGljaCBvYmplY3QgYHNldGltbWVkaWF0ZWAgd2FzXG4vLyBhYmxlIHRvIGluc3RhbGwgb250by4gIFNlYXJjaCBlYWNoIHBvc3NpYmlsaXR5IGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZVxuLy8gYHNldGltbWVkaWF0ZWAgbGlicmFyeS5cbmV4cG9ydHMuc2V0SW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwuc2V0SW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLnNldEltbWVkaWF0ZSk7XG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmIHNlbGYuY2xlYXJJbW1lZGlhdGUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0aGlzICYmIHRoaXMuY2xlYXJJbW1lZGlhdGUpO1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luIiwiaW50ZXJmYWNlIElTdG9yYWdlSXRlbSB7XG5cdGhhbmRsZXI6IChlOiBFdmVudCkgPT4gYW55O1xuXHRzY29wZTogYW55O1xufVxuaW50ZXJmYWNlIElLZXlTdG9yYWdlIHtcblx0W2tleTogc3RyaW5nXTogSVN0b3JhZ2VJdGVtW107XG59XG5cbmludGVyZmFjZSBJS2V5TWFuYWdlciB7XG5cdGFkZEhvdEtleShrZXk6IHN0cmluZywgaGFuZGxlciwgc2NvcGU/OiBhbnkpOiB2b2lkO1xuXHRyZW1vdmVIb3RLZXkoa2V5Pzogc3RyaW5nLCBzY29wZT86IGFueSk6IHZvaWQ7XG5cdGV4aXN0KGtleTogc3RyaW5nKTogYm9vbGVhbjtcbn1cblxuXG5mdW5jdGlvbiBnZXRIb3RLZXlDb2RlKGNvZGU6IHN0cmluZyk6IHN0cmluZyB7XG5cdGNvbnN0IG1hdGNoZXMgPSBjb2RlLnRvTG93ZXJDYXNlKCkubWF0Y2goL1xcdysvZyk7XG5cdGxldCBjb21wID0gMDtcblx0bGV0IGtleSA9IFwiXCI7XG5cdGZvciAobGV0IGkgPSAwO2kgPCBtYXRjaGVzLmxlbmd0aDtpKyspIHtcblx0XHRjb25zdCBjaGVjayA9IG1hdGNoZXNbaV07XG5cdFx0aWYgKGNoZWNrID09PSBcImN0cmxcIikge1xuXHRcdFx0Y29tcCArPSA0O1xuXHRcdH0gZWxzZSBpZiAoY2hlY2sgPT09IFwic2hpZnRcIikge1xuXHRcdFx0Y29tcCArPSAyO1xuXHRcdH0gZWxzZSBpZiAoY2hlY2sgPT09IFwiYWx0XCIpIHtcblx0XHRcdGNvbXAgKz0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0a2V5ID0gY2hlY2s7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBjb21wICsga2V5O1xufVxuXG5jbGFzcyBLZXlNYW5hZ2VyIGltcGxlbWVudHMgSUtleU1hbmFnZXIge1xuXHRwcml2YXRlIF9rZXlzU3RvcmFnZTogSUtleVN0b3JhZ2UgPSB7fTtcblxuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoZTogS2V5Ym9hcmRFdmVudCkgPT4ge1xuXHRcdFx0Y29uc3QgY29tcCA9IChlLmN0cmxLZXkgfHwgZS5tZXRhS2V5ID8gNCA6IDApICsgKGUuc2hpZnRLZXkgPyAyIDogMCkgKyAoZS5hbHRLZXkgPyAxIDogMCk7XG5cdFx0XHRsZXQga2V5O1xuXHRcdFx0aWYgKChlLndoaWNoID49IDQ4ICYmIGUud2hpY2ggPD0gNTcpIHx8IChlLndoaWNoID49IDY1ICYmIGUud2hpY2ggPD0gOTApKSB7IC8vIEEtWiAwLTlcblx0XHRcdFx0a2V5ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtleSA9IGUua2V5O1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgY29kZSA9IGNvbXAgKyBrZXkudG9Mb3dlckNhc2UoKTtcblx0XHRcdGNvbnN0IGFjdGlvbnMgPSB0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXTtcblx0XHRcdGlmIChhY3Rpb25zKSB7XG5cdFx0XHRcdGZvciAobGV0IGkgPSAwO2kgPCBhY3Rpb25zLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0XHRhY3Rpb25zW2ldLmhhbmRsZXIoZSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXHRhZGRIb3RLZXkoa2V5OiBzdHJpbmcsIGhhbmRsZXIsIHNjb3BlPzogYW55KTogdm9pZCB7XG5cdFx0Y29uc3QgY29kZSA9IGdldEhvdEtleUNvZGUoa2V5KTtcblx0XHRpZiAoIXRoaXMuX2tleXNTdG9yYWdlW2NvZGVdKSB7XG5cdFx0XHR0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXSA9IFtdO1xuXHRcdH1cblx0XHR0aGlzLl9rZXlzU3RvcmFnZVtjb2RlXS5wdXNoKHtcblx0XHRcdGhhbmRsZXIsXG5cdFx0XHRzY29wZVxuXHRcdH0pO1xuXHR9XG5cdHJlbW92ZUhvdEtleShrZXk/OiBzdHJpbmcsIHNjb3BlPzogYW55KTogdm9pZCB7XG5cdFx0Y29uc3Qga2V5U3RvcmFnZSA9IHRoaXMuX2tleXNTdG9yYWdlO1xuXHRcdGlmIChrZXkpIHtcblx0XHRcdGNvbnN0IGNvZGUgPSBnZXRIb3RLZXlDb2RlKGtleSk7XG5cdFx0XHRkZWxldGUga2V5U3RvcmFnZVtjb2RlXTtcblx0XHR9XG5cdFx0aWYgKHNjb3BlKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGNvZGUgaW4ga2V5U3RvcmFnZSkge1xuXHRcdFx0XHRjb25zdCB0b0RlbGV0ZSA9IFtdOyAvLyBpdGVtcyBpbmRleCB0byBkZWxldGVcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7aSA8IGtleVN0b3JhZ2VbY29kZV0ubGVuZ3RoO2krKykge1xuXHRcdFx0XHRcdGlmIChrZXlTdG9yYWdlW2NvZGVdW2ldLnNjb3BlID09PSBzY29wZSkge1xuXHRcdFx0XHRcdFx0dG9EZWxldGUucHVzaChpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGtleVN0b3JhZ2VbY29kZV0ubGVuZ3RoID09PSB0b0RlbGV0ZS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkZWxldGUga2V5U3RvcmFnZVtjb2RlXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRmb3IgKGxldCBpID0gdG9EZWxldGUubGVuZ3RoIC0gMTtpID49IDA7aS0tKSB7IC8vIGJlZ2luIGZyb20gbGFzdCBjb3ogc3BsaWNlIGNoYW5nZSBvdGhlciBpbmRleFxuXHRcdFx0XHRcdFx0a2V5U3RvcmFnZVtjb2RlXS5zcGxpY2UodG9EZWxldGVbaV0sIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRleGlzdChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IGNvZGUgPSBnZXRIb3RLZXlDb2RlKGtleSk7XG5cdFx0cmV0dXJuICEhdGhpcy5fa2V5c1N0b3JhZ2VbY29kZV07XG5cdH1cbn1cblxuZXhwb3J0IGNvbnN0IGtleU1hbmFnZXIgPSBuZXcgS2V5TWFuYWdlcigpO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkSG90a2V5cyhoYW5kbGVycywgYmVmb3JlQ2FsbD86ICgpID0+IGJvb2xlYW4pIHtcblx0Y29uc3QgY29udGV4dCA9IG5ldyBEYXRlKCk7XG5cblx0Y29uc3Qgd3JhcEhhbmRsZXIgPSBoYW5kbGVyID0+IGUgPT4ge1xuXHRcdGlmIChiZWZvcmVDYWxsICYmIGJlZm9yZUNhbGwoKSA9PT0gZmFsc2UpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aGFuZGxlcihlKTtcblx0fTtcblxuXHRmb3IgKGNvbnN0IGtleSBpbiBoYW5kbGVycykge1xuXHRcdGtleU1hbmFnZXIuYWRkSG90S2V5KFxuXHRcdFx0a2V5LFxuXHRcdFx0d3JhcEhhbmRsZXIoaGFuZGxlcnNba2V5XSksXG5cdFx0XHRjb250ZXh0XG5cdFx0KTtcblx0fVxuXG5cdHJldHVybiAoKSA9PiBrZXlNYW5hZ2VyLnJlbW92ZUhvdEtleSh1bmRlZmluZWQsIGNvbnRleHQpO1xufSIsImltcG9ydCB7IGxvY2F0ZSB9IGZyb20gXCIuL2h0bWxcIjtcblxubGV0IGNvdW50ZXIgPSAobmV3IERhdGUoKSkudmFsdWVPZigpO1xuZXhwb3J0IGZ1bmN0aW9uIHVpZCgpOiBzdHJpbmcge1xuXHRyZXR1cm4gXCJ1XCIgKyAoY291bnRlcisrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNvdXJjZSwgZGVlcCA9IHRydWUpe1xuXHRpZiAoc291cmNlKXtcblx0XHRmb3IgKGNvbnN0IGtleSBpbiBzb3VyY2Upe1xuXHRcdFx0Y29uc3Qgc29iaiA9IHNvdXJjZVtrZXldO1xuXHRcdFx0Y29uc3QgdG9iaiA9IHRhcmdldFtrZXldO1xuXHRcdFx0aWYgKGRlZXAgJiYgdHlwZW9mIHRvYmogPT09IFwib2JqZWN0XCIgJiYgISh0b2JqIGluc3RhbmNlb2YgRGF0ZSkgJiYgISh0b2JqIGluc3RhbmNlb2YgQXJyYXkpKXtcblx0XHRcdFx0ZXh0ZW5kKHRvYmosIHNvYmopO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGFyZ2V0W2tleV0gPSBzb2JqO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG5pbnRlcmZhY2UgSU9CaiB7XG5cdFtrZXk6IHN0cmluZ106IGFueTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KHNvdXJjZTogSU9Caiwgd2l0aG91dElubmVyPzogYm9vbGVhbik6IElPQmoge1xuXHRjb25zdCByZXN1bHQ6IElPQmogPSB7fTtcblx0Zm9yIChjb25zdCBrZXkgaW4gc291cmNlKXtcblx0XHRpZiAoIXdpdGhvdXRJbm5lciB8fCBrZXlbMF0gIT09IFwiJFwiKSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IHNvdXJjZVtrZXldO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbFNvcnQoYXJyKTogYW55W10ge1xuXHRyZXR1cm4gYXJyLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiB7XG5cdFx0Y29uc3Qgbm4gPSB0eXBlb2YgYSA9PT0gXCJzdHJpbmdcIiA/IGEubG9jYWxlQ29tcGFyZShiKSA6IGEgLSBiO1xuXHRcdHJldHVybiBubjtcblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kSW5kZXg8VCA9IGFueT4oYXJyOiBUW10sIHByZWRpY2F0ZTogKG9iajogVCkgPT4gYm9vbGVhbik6IG51bWJlciB7XG5cdGNvbnN0IGxlbiA9IGFyci5sZW5ndGg7XG5cdGZvciAobGV0IGk9MDsgaTxsZW47IGkrKykge1xuXHRcdGlmIChwcmVkaWNhdGUoYXJyW2ldKSkge1xuXHRcdFx0cmV0dXJuIGk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiAtMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRXF1YWxTdHJpbmcoZnJvbTogc3RyaW5nLCB0bzogc3RyaW5nKTogYm9vbGVhbiB7XG5cdGlmIChmcm9tLmxlbmd0aCA+IHRvLmxlbmd0aCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRmb3IgKGxldCBpPTA7IGk8ZnJvbS5sZW5ndGg7IGkrKykge1xuXHRcdGlmIChmcm9tW2ldLnRvTG93ZXJDYXNlKCkgIT09IHRvW2ldLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaW5nbGVPdXRlckNsaWNrKGZuOiAoZTogTW91c2VFdmVudCkgPT4gYm9vbGVhbikge1xuXHRjb25zdCBjbGljayA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG5cdFx0aWYgKGZuKGUpKSB7XG5cdFx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spO1xuXHRcdH1cblx0fTtcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRldGVjdFdpZGdldENsaWNrKHdpZGdldElkOiBzdHJpbmcsIGNiOiAoaW5uZXI6IGJvb2xlYW4pID0+IHZvaWQpOiAoKSA9PiB2b2lkIHtcblx0Y29uc3QgY2xpY2sgPSAoZTogTW91c2VFdmVudCkgPT4gY2IobG9jYXRlKGUsIFwiZGh4X3dpZGdldF9pZFwiKSA9PT0gd2lkZ2V0SWQpO1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spO1xuXG5cdHJldHVybiAoKSA9PiBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2spO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW53cmFwQm94PFQ+KGJveDogVCB8IFRbXSk6IFQge1xuXHRpZiAoQXJyYXkuaXNBcnJheShib3gpKSB7XG5cdFx0cmV0dXJuIGJveFswXTtcblx0fVxuXHRyZXR1cm4gYm94O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHdyYXBCb3g8VD4odW5ib3hlZDogVCB8IFRbXSk6IFRbXSB7XG5cdGlmIChBcnJheS5pc0FycmF5KHVuYm94ZWQpKSB7XG5cdFx0cmV0dXJuIHVuYm94ZWQ7XG5cdH1cblx0cmV0dXJuIFt1bmJveGVkXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVmaW5lZDxUPihzb21lOiBUKTogYm9vbGVhbiB7XG5cdHJldHVybiBzb21lICE9PSBudWxsICYmIHNvbWUgIT09IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJhbmdlKGZyb206IG51bWJlciwgdG86IG51bWJlcik6IG51bWJlcltdIHtcblx0aWYgKGZyb20gPiB0bykge1xuXHRcdHJldHVybiBbXTtcblx0fVxuXHRjb25zdCByZXN1bHQgPSBbXTtcblx0d2hpbGUoZnJvbSA8PSB0bykge1xuXHRcdHJlc3VsdC5wdXNoKGZyb20rKyk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn0iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSBcImRvbXZtL2Rpc3QvZGV2L2RvbXZtLmRldi5qc1wiO1xuZXhwb3J0IGxldCBlbCA9IGRvbS5kZWZpbmVFbGVtZW50O1xuZXhwb3J0IGxldCBzdiA9IGRvbS5kZWZpbmVTdmdFbGVtZW50O1xuZXhwb3J0IGxldCB2aWV3ID0gZG9tLmRlZmluZVZpZXc7XG5leHBvcnQgbGV0IGNyZWF0ZSA9IGRvbS5jcmVhdGVWaWV3O1xuZXhwb3J0IGxldCBpbmplY3QgPSBkb20uaW5qZWN0VmlldztcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVIZWxwKCkge1xuXHRkb20uREVWTU9ERS5tdXRhdGlvbnMgPSBmYWxzZTtcblx0ZG9tLkRFVk1PREUud2FybmluZ3MgPSBmYWxzZTtcblx0ZG9tLkRFVk1PREUudmVyYm9zZSA9IGZhbHNlO1xuXHRkb20uREVWTU9ERS5VTktFWUVEX0lOUFVUID0gZmFsc2U7XG59XG5cbmV4cG9ydCB0eXBlIFZOb2RlID0gYW55O1xuZXhwb3J0IGludGVyZmFjZSBJRG9tVmlld3tcblx0cmVkcmF3KCk7XG5cdG1vdW50KGVsIDogSFRNTEVsZW1lbnQpO1xufVxuZXhwb3J0IGludGVyZmFjZSBJRG9tUmVuZGVye1xuXHRyZW5kZXIodmlldyA6IElEb21WaWV3LCBkYXRhOiBhbnkpOlZOb2RlO1xufVxuZXhwb3J0IGludGVyZmFjZSBJVmlld0hhc2gge1xuXHRbbmFtZTogc3RyaW5nXSA6IElEb21SZW5kZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNpemVyKGhhbmRsZXIpe1xuXHRjb25zdCByZXNpemUgPSAod2luZG93IGFzIGFueSkuUmVzaXplT2JzZXJ2ZXI7XG5cdGNvbnN0IGFjdGl2ZUhhbmRsZXIgPSAobm9kZSkgPT4ge1xuXG5cdFx0Y29uc3QgaGVpZ2h0ID0gbm9kZS5lbC5vZmZzZXRIZWlnaHQ7XG5cdFx0Y29uc3Qgd2lkdGggPSBub2RlLmVsLm9mZnNldFdpZHRoO1xuXHRcdGhhbmRsZXIod2lkdGgsIGhlaWdodCk7XG5cdH07XG5cblx0aWYgKHJlc2l6ZSl7XG5cdFx0cmV0dXJuIGVsKFwiZGl2LmRoeC1yZXNpemUtb2JzZXJ2ZXJcIiwge1xuXHRcdFx0X2hvb2tzOntcblx0XHRcdFx0ZGlkSW5zZXJ0KG5vZGUpe1xuXHRcdFx0XHRcdG5ldyByZXNpemUoKCkgPT4gYWN0aXZlSGFuZGxlcihub2RlKSkub2JzZXJ2ZShub2RlLmVsKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cmV0dXJuIGVsKFwiaWZyYW1lLmRoeC1yZXNpemUtb2JzZXJ2ZXJcIiwge1xuXHRcdF9ob29rczp7XG5cdFx0XHRkaWRJbnNlcnQobm9kZSl7XG5cdFx0XHRcdG5vZGUuZWwuY29udGVudFdpbmRvdy5vbnJlc2l6ZSA9ICgpID0+IGFjdGl2ZUhhbmRsZXIobm9kZSk7XG5cdFx0XHRcdGFjdGl2ZUhhbmRsZXIobm9kZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn0iLCJleHBvcnQgdHlwZSBDYWxsYmFjayA9ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuZXhwb3J0IGludGVyZmFjZSBJRXZlbnRTeXN0ZW08RSwgVCBleHRlbmRzIElFdmVudEhhbmRsZXJzTWFwID0gSUV2ZW50SGFuZGxlcnNNYXA+IHtcblx0Y29udGV4dDogYW55O1xuXHRldmVudHM6IElFdmVudHM7XG5cdG9uPEsgZXh0ZW5kcyBrZXlvZiBUPihuYW1lOiBLLCBjYWxsYmFjazogVFtLXSwgY29udGV4dD86IGFueSk7XG5cdGRldGFjaChuYW1lOiBFLCBjb250ZXh0PzogYW55KTtcblx0Y2xlYXIoKTogdm9pZDtcblx0ZmlyZTxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgYXJncz86IEFyZ3VtZW50VHlwZXM8VFtLXT4pOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgSUV2ZW50IHtcblx0Y2FsbGJhY2s6IENhbGxiYWNrO1xuXHRjb250ZXh0OiBhbnk7XG59XG5pbnRlcmZhY2UgSUV2ZW50cyB7XG5cdFtrZXk6IHN0cmluZ106IElFdmVudFtdO1xufVxuXG5pbnRlcmZhY2UgSUV2ZW50SGFuZGxlcnNNYXAge1xuXHRba2V5OiBzdHJpbmddOiBDYWxsYmFjaztcbn1cbnR5cGUgQXJndW1lbnRUeXBlczxGIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+ID0gRiBleHRlbmRzICguLi5hcmdzOiBpbmZlciBBKSA9PiBhbnkgPyBBIDogbmV2ZXI7XG5cbmV4cG9ydCBjbGFzcyBFdmVudFN5c3RlbTxFIGV4dGVuZHMgc3RyaW5nLCBUIGV4dGVuZHMgSUV2ZW50SGFuZGxlcnNNYXAgPSBJRXZlbnRIYW5kbGVyc01hcD4gaW1wbGVtZW50cyBJRXZlbnRTeXN0ZW08RSwgVD4ge1xuXHRwdWJsaWMgZXZlbnRzOiBJRXZlbnRzO1xuXHRwdWJsaWMgY29udGV4dDogYW55O1xuXG5cdGNvbnN0cnVjdG9yKGNvbnRleHQ/OiBhbnkpIHtcblx0XHR0aGlzLmV2ZW50cyA9IHt9O1xuXHRcdHRoaXMuY29udGV4dCA9IGNvbnRleHQgfHwgdGhpcztcblx0fVxuXHRvbjxLIGV4dGVuZHMga2V5b2YgVD4obmFtZTogSywgY2FsbGJhY2s6IFRbS10sIGNvbnRleHQ/OiBhbnkpIHtcblx0XHRjb25zdCBldmVudDogc3RyaW5nID0gKG5hbWUgYXMgc3RyaW5nKS50b0xvd2VyQ2FzZSgpO1xuXHRcdHRoaXMuZXZlbnRzW2V2ZW50XSA9IHRoaXMuZXZlbnRzW2V2ZW50XSB8fCBbXTtcblx0XHR0aGlzLmV2ZW50c1tldmVudF0ucHVzaCh7IGNhbGxiYWNrLCBjb250ZXh0OiBjb250ZXh0IHx8IHRoaXMuY29udGV4dCB9KTtcblx0fVxuXHRkZXRhY2gobmFtZTogRSwgY29udGV4dD86IGFueSkge1xuXHRcdGNvbnN0IGV2ZW50OiBzdHJpbmcgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG5cblx0XHRjb25zdCBlU3RhY2sgPSB0aGlzLmV2ZW50c1tldmVudF07XG5cdFx0aWYgKGNvbnRleHQgJiYgZVN0YWNrICYmIGVTdGFjay5sZW5ndGgpIHtcblx0XHRcdGZvciAobGV0IGkgPSBlU3RhY2subGVuZ3RoIC0gMTtpID49IDA7aS0tKSB7XG5cdFx0XHRcdGlmIChlU3RhY2tbaV0uY29udGV4dCA9PT0gY29udGV4dCkge1xuXHRcdFx0XHRcdGVTdGFjay5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5ldmVudHNbZXZlbnRdID0gW107XG5cdFx0fVxuXHR9XG5cdGZpcmU8SyBleHRlbmRzIGtleW9mIFQ+KG5hbWU6IEssIGFyZ3M6IEFyZ3VtZW50VHlwZXM8VFtLXT4pOiBib29sZWFuIHtcblx0XHRpZiAodHlwZW9mIGFyZ3MgPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdGFyZ3MgPSBbXSBhcyBhbnk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgZXZlbnQ6IHN0cmluZyA9IChuYW1lIGFzIHN0cmluZykudG9Mb3dlckNhc2UoKTtcblxuXHRcdGlmICh0aGlzLmV2ZW50c1tldmVudF0pIHtcblx0XHRcdGNvbnN0IHJlcyA9IHRoaXMuZXZlbnRzW2V2ZW50XS5tYXAoXG5cdFx0XHRcdGUgPT4gZS5jYWxsYmFjay5hcHBseShlLmNvbnRleHQsIGFyZ3MpXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIHJlcy5pbmRleE9mKGZhbHNlKSA8IDA7XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cdGNsZWFyKCkge1xuXHRcdHRoaXMuZXZlbnRzID0ge307XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEV2ZW50c01peGluKG9iajogYW55KSB7XG5cdG9iaiA9IG9iaiB8fCB7fTtcblx0Y29uc3QgZXZlbnRTeXN0ZW0gPSBuZXcgRXZlbnRTeXN0ZW0ob2JqKTtcblx0b2JqLmRldGFjaEV2ZW50ID0gZXZlbnRTeXN0ZW0uZGV0YWNoLmJpbmQoZXZlbnRTeXN0ZW0pO1xuXHRvYmouYXR0YWNoRXZlbnQgPSBldmVudFN5c3RlbS5vbi5iaW5kKGV2ZW50U3lzdGVtKTtcblx0b2JqLmNhbGxFdmVudCA9IGV2ZW50U3lzdGVtLmZpcmUuYmluZChldmVudFN5c3RlbSk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50RmFjYWRlIHtcblx0YXR0YWNoRXZlbnQ6IGFueTtcblx0Y2FsbEV2ZW50OiBhbnk7XG59IiwiaW1wb3J0IFwiLi9wb2x5ZmlsbHMvbWF0Y2hlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9Ob2RlKG5vZGU6IHN0cmluZyB8IEhUTUxFbGVtZW50KTogSFRNTEVsZW1lbnQge1xuXHRpZiAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRub2RlID0gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5vZGUpIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iobm9kZSkpIGFzIEhUTUxFbGVtZW50O1xuXHR9XG5cdHJldHVybiBub2RlIHx8IGRvY3VtZW50LmJvZHk7XG59XG5cbnR5cGUgZXZlbnRQcmVwYXJlID0gKGV2OkV2ZW50KSA9PiBhbnk7XG5pbnRlcmZhY2UgSUhhbmRsZXJIYXNoIHtcblx0W25hbWU6IHN0cmluZ106ICgoLi4uYXJnczogYW55W10pID0+IChib29sZWFuIHwgdm9pZCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXZlbnRIYW5kbGVyKHByZXBhcmU6ZXZlbnRQcmVwYXJlLCBoYXNoOklIYW5kbGVySGFzaCl7XG5cdGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhoYXNoKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24oZXY6RXZlbnQpe1xuXHRcdGNvbnN0IGRhdGEgPSBwcmVwYXJlKGV2KTtcblx0XHRsZXQgbm9kZSA9IGV2LnRhcmdldCBhcyAoSFRNTEVsZW1lbnQgfCBTVkdFbGVtZW50KTtcblxuXHRcdHdoaWxlIChub2RlKXtcblx0XHRcdGNvbnN0IGNzc3N0cmluZyA9ICBub2RlLmdldEF0dHJpYnV0ZSA/IChub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpIDogXCJcIjtcblx0XHRcdGlmIChjc3NzdHJpbmcubGVuZ3RoKXtcblx0XHRcdFx0Y29uc3QgY3NzID0gY3Nzc3RyaW5nLnNwbGl0KFwiIFwiKTtcblx0XHRcdFx0Zm9yIChsZXQgaj0wOyBqPGtleXMubGVuZ3RoOyBqKyspe1xuXHRcdFx0XHRcdGlmIChjc3MuaW5kZXhPZihrZXlzW2pdKSA+IC0xKXtcblx0XHRcdFx0XHRcdHJldHVybiBoYXNoW2tleXNbal1dKGV2LCBkYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGUgYXMgKEhUTUxFbGVtZW50IHwgU1ZHRWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGUodGFyZ2V0OiBFdmVudCB8IEVsZW1lbnQsIGF0dHI6IHN0cmluZyA9IFwiZGh4X2lkXCIpOiBzdHJpbmcge1xuXHRjb25zdCBub2RlID0gbG9jYXRlTm9kZSh0YXJnZXQsIGF0dHIpO1xuXHRyZXR1cm4gbm9kZSA/IG5vZGUuZ2V0QXR0cmlidXRlKGF0dHIpIDogXCJcIjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsb2NhdGVOb2RlKHRhcmdldDogRXZlbnQgfCBFbGVtZW50LCBhdHRyOiBzdHJpbmcgPSBcImRoeF9pZFwiKTogRWxlbWVudCB7XG5cdGlmICh0YXJnZXQgaW5zdGFuY2VvZiBFdmVudCkge1xuXHRcdHRhcmdldCA9IHRhcmdldC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG5cdH1cblx0d2hpbGUgKHRhcmdldCkge1xuXHRcdGlmICh0YXJnZXQuZ2V0QXR0cmlidXRlICYmIHRhcmdldC5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcblx0XHRcdHJldHVybiB0YXJnZXQ7XG5cdFx0fVxuXHRcdHRhcmdldCA9IHRhcmdldC5wYXJlbnROb2RlIGFzIEhUTUxFbGVtZW50O1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCb3goZWxlbSkge1xuXHRjb25zdCBib3ggPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXHRjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuXHRjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgYm9keS5zY3JvbGxUb3A7XG5cdGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuXG5cdGNvbnN0IHRvcCA9IGJveC50b3AgKyBzY3JvbGxUb3A7XG5cdGNvbnN0IGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQ7XG5cdGNvbnN0IHJpZ2h0ID0gYm9keS5vZmZzZXRXaWR0aCAtIGJveC5yaWdodDtcblx0Y29uc3QgYm90dG9tID0gYm9keS5vZmZzZXRIZWlnaHQgLSBib3guYm90dG9tO1xuXHRjb25zdCB3aWR0aCA9IGJveC5yaWdodCAtIGJveC5sZWZ0O1xuXHRjb25zdCBoZWlnaHQgPSBib3guYm90dG9tIC0gYm94LnRvcDtcblxuXHRyZXR1cm4geyB0b3AsIGxlZnQsIHJpZ2h0LCBib3R0b20sIHdpZHRoLCBoZWlnaHQgfTtcbn1cblxubGV0IHNjcm9sbFdpZHRoID0gLTE7XG5leHBvcnQgZnVuY3Rpb24gZ2V0U2Nyb2xsYmFyV2lkdGgoKTogbnVtYmVyIHtcblx0aWYgKHNjcm9sbFdpZHRoID4gLTEpe1xuXHRcdHJldHVybiBzY3JvbGxXaWR0aDtcblx0fVxuXG5cdGNvbnN0IHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KTtcblx0c2Nyb2xsRGl2LnN0eWxlLmNzc1RleHQgPSBcInBvc2l0aW9uOiBhYnNvbHV0ZTtsZWZ0OiAtOTk5OTlweDtvdmVyZmxvdzpzY3JvbGw7d2lkdGg6IDEwMHB4O2hlaWdodDogMTAwcHg7XCI7XG5cdHNjcm9sbFdpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoO1xuXHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdik7XG5cdHJldHVybiBzY3JvbGxXaWR0aDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRml0VGFyZ2V0IHtcblx0dG9wOiBudW1iZXI7XG5cdGxlZnQ6IG51bWJlcjtcblx0d2lkdGg6IG51bWJlcjtcblx0aGVpZ2h0OiBudW1iZXI7XG59XG5pbnRlcmZhY2UgSUZpdFBvc2l0aW9uIHtcblx0bGVmdDogbnVtYmVyO1xuXHRyaWdodDogbnVtYmVyO1xuXHR0b3A6IG51bWJlcjtcblx0Ym90dG9tOiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIElGaXRQb3NpdGlvbkNvbmZpZyB7XG5cdG1vZGU/OiBQb3NpdGlvbjtcblx0YXV0bz86IGJvb2xlYW47XG5cdGNlbnRlcmluZz86IGJvb2xlYW47XG5cdHdpZHRoOiBudW1iZXI7XG5cdGhlaWdodDogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZml0UG9zaXRpb24obm9kZTogSFRNTEVsZW1lbnQsIGNvbmZpZzogSUZpdFBvc2l0aW9uQ29uZmlnKSB7XG5cdHJldHVybiBjYWxjdWxhdGVQb3NpdGlvbihnZXRSZWFsUG9zaXRpb24obm9kZSksIGNvbmZpZyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0lFKCkge1xuXHRjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuXHRyZXR1cm4gdWEuaW5kZXhPZihcIk1TSUUgXCIpID4gLTEgfHwgdWEuaW5kZXhPZihcIlRyaWRlbnQvXCIpID4gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSZWFsUG9zaXRpb24obm9kZTogSFRNTEVsZW1lbnQpOiBJRml0UG9zaXRpb24ge1xuXHRjb25zdCByZWN0cyA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdHJldHVybiB7XG5cdFx0bGVmdDogcmVjdHMubGVmdCArIHdpbmRvdy5wYWdlWE9mZnNldCxcblx0XHRyaWdodDogcmVjdHMucmlnaHQgKyB3aW5kb3cucGFnZVhPZmZzZXQsXG5cdFx0dG9wOiByZWN0cy50b3AgKyB3aW5kb3cucGFnZVlPZmZzZXQsXG5cdFx0Ym90dG9tOiByZWN0cy5ib3R0b20gKyB3aW5kb3cucGFnZVlPZmZzZXRcblx0fTtcbn1cblxuZXhwb3J0IGVudW0gUG9zaXRpb24ge1xuXHRsZWZ0ID0gXCJsZWZ0XCIsXG5cdHJpZ2h0ID0gXCJyaWdodFwiLFxuXHRib3R0b20gPSBcImJvdHRvbVwiLFxuXHR0b3AgPSBcInRvcFwiXG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9uKHBvczogSUZpdFBvc2l0aW9uLCBjb25maWc6IElGaXRQb3NpdGlvbkNvbmZpZykge1xuXHRjb25zdCB7bGVmdCwgdG9wfSA9IGNvbmZpZy5tb2RlID09PSBQb3NpdGlvbi5ib3R0b20gfHwgY29uZmlnLm1vZGUgPT09IFBvc2l0aW9uLnRvcFxuXHRcdD8gcGxhY2VCb3R0b21PclRvcChwb3MsIGNvbmZpZylcblx0XHQ6IHBsYWNlUmlnaHRPckxlZnQocG9zLCBjb25maWcpO1xuXHRyZXR1cm4ge1xuXHRcdGxlZnQ6IE1hdGgucm91bmQobGVmdCkgKyBcInB4XCIsXG5cdFx0dG9wOiBNYXRoLnJvdW5kKHRvcCkgKyBcInB4XCIsXG5cdFx0bWluV2lkdGg6IE1hdGgucm91bmQoY29uZmlnLndpZHRoKSArIFwicHhcIixcblx0XHRwb3NpdGlvbjogXCJhYnNvbHV0ZVwiXG5cdH07XG59XG5cbmZ1bmN0aW9uIGdldFdpbmRvd0JvcmRlcnMoKSB7XG5cdHJldHVybiB7XG5cdFx0cmlnaHRCb3JkZXI6IHdpbmRvdy5wYWdlWE9mZnNldCArIHdpbmRvdy5pbm5lcldpZHRoLFxuXHRcdGJvdHRvbUJvcmRlcjogd2luZG93LnBhZ2VZT2Zmc2V0ICsgd2luZG93LmlubmVySGVpZ2h0XG5cdH07XG59XG5cbmZ1bmN0aW9uIGhvcml6b250YWxDZW50ZXJpbmcocG9zOiBJRml0UG9zaXRpb24sIHdpZHRoOiBudW1iZXIsIHJpZ2h0Qm9yZGVyOiBudW1iZXIpIHtcblx0Y29uc3Qgbm9kZVdpZHRoID0gcG9zLnJpZ2h0IC0gcG9zLmxlZnQ7XG5cdGNvbnN0IGRpZmYgPSAod2lkdGggLSBub2RlV2lkdGgpIC8gMjtcblxuXHRjb25zdCBsZWZ0ID0gcG9zLmxlZnQgLSBkaWZmO1xuXHRjb25zdCByaWdodCA9IHBvcy5yaWdodCArIGRpZmY7XG5cblx0aWYgKGxlZnQgPj0gMCAmJiByaWdodCA8PSByaWdodEJvcmRlcikge1xuXHRcdHJldHVybiBsZWZ0O1xuXHR9XG5cblx0aWYgKGxlZnQgPCAwKSB7XG5cdFx0cmV0dXJuIDA7XG5cdH1cblxuXHRyZXR1cm4gcmlnaHRCb3JkZXIgLSB3aWR0aDtcbn1cblxuZnVuY3Rpb24gdmVydGljYWxDZW50ZXJpbmcocG9zOiBJRml0UG9zaXRpb24sIGhlaWdodDogbnVtYmVyLCBib3R0b21Cb3JkZXI6IG51bWJlcikge1xuXHRjb25zdCBub2RlSGVpZ2h0ID0gcG9zLmJvdHRvbSAtIHBvcy50b3A7XG5cdGNvbnN0IGRpZmYgPSAoaGVpZ2h0IC0gbm9kZUhlaWdodCkgLyAyO1xuXG5cdGNvbnN0IHRvcCA9IHBvcy50b3AgLSBkaWZmO1xuXHRjb25zdCBib3R0b20gPSBwb3MuYm90dG9tICsgZGlmZjtcblxuXHRpZiAodG9wID49IDAgJiYgYm90dG9tIDw9IGJvdHRvbUJvcmRlcikge1xuXHRcdHJldHVybiB0b3A7XG5cdH1cblxuXHRpZiAodG9wIDwgMCkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0cmV0dXJuIGJvdHRvbUJvcmRlciAtIGhlaWdodDtcbn1cblxuZnVuY3Rpb24gcGxhY2VCb3R0b21PclRvcChwb3M6IElGaXRQb3NpdGlvbiwgY29uZmlnOiBJRml0UG9zaXRpb25Db25maWcpIHtcblx0Y29uc3Qge3JpZ2h0Qm9yZGVyLCBib3R0b21Cb3JkZXJ9ID0gZ2V0V2luZG93Qm9yZGVycygpO1xuXG5cdGxldCBsZWZ0O1xuXHRsZXQgdG9wO1xuXG5cdGNvbnN0IGJvdHRvbURpZmYgPSBib3R0b21Cb3JkZXIgLSBwb3MuYm90dG9tIC0gY29uZmlnLmhlaWdodDtcblx0Y29uc3QgdG9wRGlmZiA9IHBvcy50b3AgLSBjb25maWcuaGVpZ2h0O1xuXG5cdGlmIChjb25maWcubW9kZSA9PT0gUG9zaXRpb24uYm90dG9tKSB7XG5cdFx0aWYgKGJvdHRvbURpZmYgPj0gMCkge1xuXHRcdFx0dG9wID0gcG9zLmJvdHRvbTtcblx0XHR9IGVsc2UgaWYgKHRvcERpZmYgPj0gMCkge1xuXHRcdFx0dG9wID0gdG9wRGlmZjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHRvcERpZmYgPj0gMCkge1xuXHRcdFx0dG9wID0gdG9wRGlmZjtcblx0XHR9IGVsc2UgaWYgKGJvdHRvbURpZmYgPj0gMCkge1xuXHRcdFx0dG9wID0gcG9zLmJvdHRvbTtcblx0XHR9XG5cdH1cblxuXHRpZiAoYm90dG9tRGlmZiA8IDAgJiYgdG9wRGlmZiA8IDApIHtcblx0XHRpZiAoY29uZmlnLmF1dG8pIHtcblx0XHRcdHJldHVybiBwbGFjZVJpZ2h0T3JMZWZ0KHBvcywgey4uLmNvbmZpZywgbW9kZTogUG9zaXRpb24ucmlnaHQsIGF1dG86IGZhbHNlfSk7XG5cdFx0fVxuXHRcdHRvcCA9IGJvdHRvbURpZmYgPiB0b3BEaWZmID8gcG9zLmJvdHRvbSA6IHRvcERpZmY7XG5cdH1cblxuXHRpZiAoY29uZmlnLmNlbnRlcmluZykge1xuXHRcdGxlZnQgPSBob3Jpem9udGFsQ2VudGVyaW5nKHBvcywgY29uZmlnLndpZHRoLCByaWdodEJvcmRlcik7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgbGVmdERpZmYgPSByaWdodEJvcmRlciAtIHBvcy5sZWZ0IC0gY29uZmlnLndpZHRoO1xuXHRcdGNvbnN0IHJpZ2h0RGlmZiA9IHBvcy5yaWdodCAtIGNvbmZpZy53aWR0aDtcblxuXHRcdGlmIChsZWZ0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gcG9zLmxlZnQ7XG5cdFx0fSBlbHNlIGlmIChyaWdodERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IHJpZ2h0RGlmZjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGVmdCA9IHJpZ2h0RGlmZiA+IGxlZnREaWZmICA/IHBvcy5sZWZ0IDogcmlnaHREaWZmO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB7bGVmdCwgdG9wfTtcbn1cblxuZnVuY3Rpb24gcGxhY2VSaWdodE9yTGVmdChwb3M6IElGaXRQb3NpdGlvbiwgY29uZmlnOiBJRml0UG9zaXRpb25Db25maWcpIHtcblx0Y29uc3Qge3JpZ2h0Qm9yZGVyLCBib3R0b21Cb3JkZXJ9ID0gZ2V0V2luZG93Qm9yZGVycygpO1xuXG5cdGxldCBsZWZ0O1xuXHRsZXQgdG9wO1xuXG5cdGNvbnN0IHJpZ2h0RGlmZiA9IHJpZ2h0Qm9yZGVyIC0gcG9zLnJpZ2h0IC0gY29uZmlnLndpZHRoO1xuXHRjb25zdCBsZWZ0RGlmZiA9IHBvcy5sZWZ0IC0gY29uZmlnLndpZHRoO1xuXG5cdGlmIChjb25maWcubW9kZSA9PT0gUG9zaXRpb24ucmlnaHQpIHtcblx0XHRpZiAocmlnaHREaWZmID49IDApIHtcblx0XHRcdGxlZnQgPSBwb3MucmlnaHQ7XG5cdFx0fSBlbHNlIGlmIChsZWZ0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gbGVmdERpZmY7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdGlmIChsZWZ0RGlmZiA+PSAwKSB7XG5cdFx0XHRsZWZ0ID0gbGVmdERpZmY7XG5cdFx0fSBlbHNlIGlmIChyaWdodERpZmYgPj0gMCkge1xuXHRcdFx0bGVmdCA9IHBvcy5yaWdodDtcblx0XHR9XG5cdH1cblxuXHRpZiAobGVmdERpZmYgPCAwICYmIHJpZ2h0RGlmZiA8IDApIHtcblx0XHRpZiAoY29uZmlnLmF1dG8pIHtcblx0XHRcdHJldHVybiBwbGFjZUJvdHRvbU9yVG9wKHBvcywgey4uLmNvbmZpZywgbW9kZTogUG9zaXRpb24uYm90dG9tLCBhdXRvOiBmYWxzZX0pO1xuXHRcdH1cblx0XHRsZWZ0ID0gbGVmdERpZmYgPiByaWdodERpZmYgPyBsZWZ0RGlmZiA6IHBvcy5yaWdodDtcblx0fVxuXG5cdGlmIChjb25maWcuY2VudGVyaW5nKSB7XG5cdFx0dG9wID0gdmVydGljYWxDZW50ZXJpbmcocG9zLCBjb25maWcuaGVpZ2h0LCByaWdodEJvcmRlcik7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgYm90dG9tRGlmZiA9IHBvcy5ib3R0b20gLSBjb25maWcuaGVpZ2h0O1xuXHRcdGNvbnN0IHRvcERpZmYgPSBib3R0b21Cb3JkZXIgLSBwb3MudG9wIC0gY29uZmlnLmhlaWdodDtcblxuXHRcdGlmICh0b3BEaWZmID49IDApIHtcblx0XHRcdHRvcCA9IHBvcy50b3A7XG5cdFx0fSBlbHNlIGlmIChib3R0b21EaWZmID4gMCkge1xuXHRcdFx0dG9wID0gYm90dG9tRGlmZjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dG9wID0gYm90dG9tRGlmZiA+IHRvcERpZmYgID8gYm90dG9tRGlmZiA6IHBvcy50b3A7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtsZWZ0LCB0b3B9O1xufSIsImlmIChFbGVtZW50ICYmICFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG5cdGNvbnN0IHByb3RvID0gKEVsZW1lbnQgYXMgYW55KS5wcm90b3R5cGU7XG5cdHByb3RvLm1hdGNoZXMgPSBwcm90by5tYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRwcm90by5tb3pNYXRjaGVzU2VsZWN0b3IgfHwgcHJvdG8ubXNNYXRjaGVzU2VsZWN0b3IgfHxcblx0XHRwcm90by5vTWF0Y2hlc1NlbGVjdG9yIHx8IHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3Rvcjtcbn0iLCJleHBvcnQgaW50ZXJmYWNlIElIYW5kbGVycyB7XG5cdFtrZXk6IHN0cmluZ106IGFueUZ1bmN0aW9uIHwgSUhhbmRsZXJzO1xufVxuXG5leHBvcnQgdHlwZSBmbjxUIGV4dGVuZHMgYW55W10sSz4gPSAoLi4uYXJnczogVCkgPT4gSztcbmV4cG9ydCB0eXBlIGFueUZ1bmN0aW9uID0gZm48YW55W10sIGFueT47XG5leHBvcnQgaW50ZXJmYWNlIElBbnlPYmoge1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBlbnVtIFNlbGVjdGlvbkV2ZW50cyB7XG5cdGJlZm9yZVVuU2VsZWN0ID0gXCJiZWZvcmV1bnNlbGVjdFwiLFxuXHRhZnRlclVuU2VsZWN0ID0gXCJhZnRlcnVuc2VsZWN0XCIsXG5cdGJlZm9yZVNlbGVjdCA9IFwiYmVmb3Jlc2VsZWN0XCIsXG5cdGFmdGVyU2VsZWN0ID0gXCJhZnRlcnNlbGVjdFwiXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSVNlbGVjdGlvbkV2ZW50c0hhbmRsZXJzTWFwIHtcblx0W2tleTogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cdFtTZWxlY3Rpb25FdmVudHMuYWZ0ZXJTZWxlY3RdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xuXHRbU2VsZWN0aW9uRXZlbnRzLmFmdGVyVW5TZWxlY3RdOiAoaWQ6IHN0cmluZykgPT4gYW55O1xuXHRbU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVNlbGVjdF06IChpZDogc3RyaW5nKSA9PiB2b2lkIHwgYm9vbGVhbjtcblx0W1NlbGVjdGlvbkV2ZW50cy5iZWZvcmVVblNlbGVjdF06IChpZDogc3RyaW5nKSA9PiB2b2lkIHwgYm9vbGVhbjtcbn0iLCJpbXBvcnQge3VpZH0gZnJvbSBcIi4vY29yZVwiO1xuaW1wb3J0IHsgdG9Ob2RlIH0gZnJvbSBcIi4vaHRtbFwiO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXd7XG5cdGdldFJvb3RWaWV3KCk6YW55O1xuXHRwYWludCgpOnZvaWQ7XG5cdG1vdW50KGNvbnRhaW5lciwgdm5vZGUpO1xufVxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgSVZpZXdMaWtle1xuXHRtb3VudD8oY29udGFpbmVyLCB2bm9kZT8pO1xuXHRnZXRSb290VmlldygpOmFueTtcbn1cblxuZXhwb3J0IGNsYXNzIFZpZXcge1xuXHRwdWJsaWMgY29uZmlnOiBhbnk7XG5cdHByb3RlY3RlZCBfY29udGFpbmVyOiBhbnk7XG5cdHByb3RlY3RlZCBfdWlkOiBhbnk7XG5cdHByb3RlY3RlZCBfZG9Ob3RSZXBhaW50OiBib29sZWFuO1xuXHRwcml2YXRlIF92aWV3OmFueTtcblxuXHRjb25zdHJ1Y3RvcihfY29udGFpbmVyLCBjb25maWcpe1xuXHRcdHRoaXMuX3VpZCA9IHVpZCgpO1xuXHRcdHRoaXMuY29uZmlnID0gY29uZmlnIHx8IHt9O1xuXHR9XG5cblx0cHVibGljIG1vdW50KGNvbnRhaW5lciwgdm5vZGU/IDphbnkpe1xuXHRcdGlmICh2bm9kZSl7XG5cdFx0XHR0aGlzLl92aWV3ID0gdm5vZGU7XG5cdFx0fVxuXHRcdGlmIChjb250YWluZXIgJiYgdGhpcy5fdmlldyAmJiB0aGlzLl92aWV3Lm1vdW50KSB7XG5cdFx0XHQvLyBpbml0IHZpZXcgaW5zaWRlIG9mIEhUTUwgY29udGFpbmVyXG5cdFx0XHR0aGlzLl9jb250YWluZXIgPSB0b05vZGUoY29udGFpbmVyKTtcblx0XHRcdGlmICh0aGlzLl9jb250YWluZXIudGFnTmFtZSl7XG5cdFx0XHRcdHRoaXMuX3ZpZXcubW91bnQodGhpcy5fY29udGFpbmVyKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fY29udGFpbmVyLmF0dGFjaCl7XG5cdFx0XHRcdHRoaXMuX2NvbnRhaW5lci5hdHRhY2godGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIHVubW91bnQoKSB7XG5cdFx0Y29uc3Qgcm9vdFZpZXcgPSB0aGlzLmdldFJvb3RWaWV3KCk7XG5cdFx0aWYgKHJvb3RWaWV3ICYmIHJvb3RWaWV3Lm5vZGUpIHtcblx0XHRcdHJvb3RWaWV3LnVubW91bnQoKTtcblx0XHRcdHRoaXMuX3ZpZXcgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnZXRSb290Vmlldygpe1xuXHRcdHJldHVybiB0aGlzLl92aWV3O1xuXHR9XG5cdHB1YmxpYyBnZXRSb290Tm9kZSgpOiBIVE1MRWxlbWVudCB7XG5cdFx0cmV0dXJuIHRoaXMuX3ZpZXcgJiYgdGhpcy5fdmlldy5ub2RlICYmIHRoaXMuX3ZpZXcubm9kZS5lbDtcblx0fVxuXG5cdHB1YmxpYyBwYWludCgpe1xuXHRcdGlmICh0aGlzLl92aWV3ICYmICgvLyB3YXMgbW91bnRlZFxuXHRcdFx0dGhpcy5fdmlldy5ub2RlIHx8IFx0Ly8gYWxyZWFkeSByZW5kZXJlZCBub2RlXG5cdFx0XHR0aGlzLl9jb250YWluZXIpKXsgLy8gbm90IHJlbmRlcmVkLCBidXQgaGFzIGNvbnRhaW5lclxuXHRcdFx0dGhpcy5fZG9Ob3RSZXBhaW50ID0gZmFsc2U7XG5cdFx0XHR0aGlzLl92aWV3LnJlZHJhdygpO1xuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9WaWV3TGlrZSh2aWV3KSB7XG5cdHJldHVybiB7XG5cdFx0Z2V0Um9vdFZpZXc6ICgpID0+IHZpZXcsXG5cdFx0cGFpbnQ6ICgpID0+IHZpZXcubm9kZSAmJiB2aWV3LnJlZHJhdygpLFxuXHRcdG1vdW50OiBjb250YWluZXIgPT4gdmlldy5tb3VudChjb250YWluZXIpXG5cdH07XG59IiwiZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy90eXBlc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9kYXRhY29sbGVjdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy90cmVlY29sbGVjdGlvblwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9EcmFnTWFuYWdlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9kYXRhcHJveHlcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NvdXJjZXMvaGVscGVyc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9kcml2ZXJzL0NzdkRyaXZlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vc291cmNlcy9kcml2ZXJzL0pzb25Ecml2ZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NvdXJjZXMvc2VsZWN0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL2RyaXZlcnMvZHJpdmVyc1wiO1xuIiwiaW1wb3J0IHsgSWQgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jbGFzcyBDb2xsZWN0aW9uU3RvcmUge1xuXHRwcml2YXRlIF9zdG9yZToge1tpZDogc3RyaW5nXTogYW55fSA9IHt9O1xuXG5cdHNldEl0ZW0oaWQ6IElkLCB0YXJnZXQ6IGFueSk6IHZvaWQge1xuXHRcdHRoaXMuX3N0b3JlW2lkXSA9IHRhcmdldDtcblx0fVxuXHRnZXRJdGVtKGlkOiBJZCkge1xuXHRcdGlmICghdGhpcy5fc3RvcmVbaWRdKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3N0b3JlW2lkXTtcblx0fVxufVxuXG5jb25zdCBkaHggPSAod2luZG93IGFzIGFueSkuZGh4SGVscGVycyA9ICh3aW5kb3cgYXMgYW55KS5kaHhIZWxwZXJzIHx8IHt9O1xuZGh4LmNvbGxlY3Rpb25TdG9yZSA9IGRoeC5jb2xsZWN0aW9uU3RvcmUgfHwgbmV3IENvbGxlY3Rpb25TdG9yZSgpO1xuZXhwb3J0IGNvbnN0IGNvbGxlY3Rpb25TdG9yZSA9IGRoeC5jb2xsZWN0aW9uU3RvcmU7XG4iLCJpbXBvcnQgeyBsb2NhdGUsIGxvY2F0ZU5vZGUsIGdldEJveCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9odG1sXCI7XG5pbXBvcnQgeyBjb2xsZWN0aW9uU3RvcmUgfSBmcm9tIFwiLi9Db2xsZWN0aW9uU3RvcmVcIjtcbmltcG9ydCB7IFRyZWVDb2xsZWN0aW9uIH0gZnJvbSBcIi4vdHJlZWNvbGxlY3Rpb25cIjtcbmltcG9ydCB7IERyb3BCZWhhdmlvdXIsIERyYWdFdmVudHMsIERyYWdNb2RlLCBJZCwgSVRyYW5zZmVyRGF0YSwgRHJvcFBvc2l0aW9uLCBJQ29weU9iamVjdCB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBpc1RyZWVDb2xsZWN0aW9uIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuXG5cbmZ1bmN0aW9uIGdldFBvc2l0aW9uKGU6IE1vdXNlRXZlbnQpIHtcblx0Y29uc3QgeSA9IGUuY2xpZW50WTtcblx0Y29uc3QgZWxlbWVudCA9IGxvY2F0ZU5vZGUoZSk7XG5cdGlmICghZWxlbWVudCkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGNvbnN0IHRyZWVMaW5lOiBIVE1MRWxlbWVudCA9IGVsZW1lbnQuY2hpbGROb2Rlc1swXSBhcyBIVE1MRWxlbWVudDtcblxuXHRjb25zdCB7dG9wLCBoZWlnaHR9ID0gdHJlZUxpbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdHJldHVybiAoeSAtIHRvcCkgLyBoZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIGRyYWdFdmVudENvbnRlbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcblx0Y29uc3QgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGdob3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0Y29uc3QgY2xvbmUgPSBlbGVtZW50LmNsb25lTm9kZSh0cnVlKSBhcyBIVE1MRWxlbWVudDtcblx0Y2xvbmUuc3R5bGUud2lkdGggPSByZWN0LndpZHRoICsgXCJweFwiO1xuXHRjbG9uZS5zdHlsZS5oZWlnaHQgPSByZWN0LmhlaWdodCArIFwicHhcIjtcblx0Z2hvc3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuXHRnaG9zdC5jbGFzc05hbWUgPSBcImRoeF9kcmFnLWdob3N0XCI7XG5cdGdob3N0LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXHRnaG9zdC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG5cdHJldHVybiBnaG9zdDtcbn1cblxuXG5jbGFzcyBEcmFnTWFuYWdlciB7XG5cdHByaXZhdGUgX3RyYW5zZmVyRGF0YTogSVRyYW5zZmVyRGF0YSA9IHt9O1xuXHRwcml2YXRlIF9jYW5Nb3ZlOiBib29sZWFuID0gdHJ1ZTtcblxuXHRwcml2YXRlIF9sYXN0SWQ6IHN0cmluZztcblx0cHJpdmF0ZSBfbGFzdENvbGxlY3Rpb25JZDogc3RyaW5nO1xuXG5cdHB1YmxpYyBzZXRJdGVtKGlkOiBJZCwgaXRlbTogYW55KSB7XG5cdFx0Y29sbGVjdGlvblN0b3JlLnNldEl0ZW0oaWQsIGl0ZW0pO1xuXHR9XG5cdHB1YmxpYyBvbk1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7IC8vIG9ubW91c2Vkb3duIG9ubHkgZm9yIHRhcmdldCBvYmplY3RzXG5cdFx0aWYgKGUud2hpY2ggIT09IDEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25Nb3VzZU1vdmUpO1xuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIHRoaXMuX29uTW91c2VVcCk7XG5cblx0XHRjb25zdCBpdGVtID0gbG9jYXRlTm9kZShlLCBcImRoeF9pZFwiKSBhcyBIVE1MRWxlbWVudDtcblx0XHRjb25zdCBpZCA9IGl0ZW0gJiYgaXRlbS5nZXRBdHRyaWJ1dGUoXCJkaHhfaWRcIik7XG5cdFx0Y29uc3QgdGFyZ2V0SWQgPSBsb2NhdGUoZSwgXCJkaHhfd2lkZ2V0X2lkXCIpO1xuXG5cdFx0aWYgKGlkICYmIHRhcmdldElkKSB7XG5cdFx0XHRjb25zdCB7bGVmdCwgdG9wfSA9IGdldEJveChpdGVtKTtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5pbml0WE9mZnNldCA9IGUucGFnZVggLSBsZWZ0O1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmluaXRZT2Zmc2V0ID0gZS5wYWdlWSAtIHRvcDtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS54ID0gZS5wYWdlWDtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS55ID0gZS5wYWdlWTtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXRJZCA9IHRhcmdldElkO1xuXHRcdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmlkID0gaWQ7XG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuaXRlbSA9IGl0ZW07XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX29uTW91c2VNb3ZlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRpZiAoIXRoaXMuX3RyYW5zZmVyRGF0YS5pZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHtwYWdlWCwgcGFnZVl9ID0gZTtcblx0XHRpZiAoIXRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdCkge1xuXHRcdFx0aWYgKE1hdGguYWJzKHRoaXMuX3RyYW5zZmVyRGF0YS54IC0gcGFnZVgpIDwgMyAmJiBNYXRoLmFicyh0aGlzLl90cmFuc2ZlckRhdGEueSAtIHBhZ2VZKSA8IDMpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgZ2hvc3QgPSB0aGlzLl9vbkRyYWdTdGFydCh0aGlzLl90cmFuc2ZlckRhdGEuaWQsIHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXRJZCk7XG5cdFx0XHRcdGlmICghZ2hvc3QpIHtcblx0XHRcdFx0XHR0aGlzLl9lbmREcm9wKCk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdCA9IGdob3N0O1xuXHRcdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy5fdHJhbnNmZXJEYXRhLmdob3N0KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9tb3ZlR2hvc3QocGFnZVgsIHBhZ2VZKTtcblx0XHR0aGlzLl9vbkRyYWcoZSk7XG5cdH1cblx0cHJpdmF0ZSBfb25Nb3VzZVVwID0gKCkgPT4ge1xuXHRcdGlmICghdGhpcy5fdHJhbnNmZXJEYXRhLngpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdCkge1xuXHRcdFx0dGhpcy5fcmVtb3ZlR2hvc3QoKTtcblx0XHRcdHRoaXMuX29uRHJvcCgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9lbmREcm9wKCk7XG5cdFx0fVxuXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0aGlzLl9vbk1vdXNlTW92ZSk7XG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgdGhpcy5fb25Nb3VzZVVwKTtcblxuXHR9XG5cdHByaXZhdGUgX21vdmVHaG9zdCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuXHRcdGlmICh0aGlzLl90cmFuc2ZlckRhdGEuZ2hvc3QpIHtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdC5zdHlsZS5sZWZ0ID0geCAtIHRoaXMuX3RyYW5zZmVyRGF0YS5pbml0WE9mZnNldCArIFwicHhcIjtcblx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5naG9zdC5zdHlsZS50b3AgPSB5IC0gdGhpcy5fdHJhbnNmZXJEYXRhLmluaXRZT2Zmc2V0ICsgIFwicHhcIjtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfcmVtb3ZlR2hvc3QoKSB7XG5cdFx0ZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLl90cmFuc2ZlckRhdGEuZ2hvc3QpO1xuXHR9XG5cdHByaXZhdGUgX29uRHJvcCgpIHtcblx0XHRpZiAoIXRoaXMuX2Nhbk1vdmUpIHtcblx0XHRcdHRoaXMuX2VuZERyb3AoKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCB0YXJnZXQgPSBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbSh0aGlzLl9sYXN0Q29sbGVjdGlvbklkKTtcblx0XHRjb25zdCBjb25maWcgPSB0YXJnZXQgJiYgdGFyZ2V0LmNvbmZpZztcblx0XHRpZiAoIXRhcmdldCB8fCBjb25maWcuZHJhZ01vZGUgPT09IERyYWdNb2RlLnNvdXJjZSkge1xuXHRcdFx0dGhpcy5fZW5kRHJvcCgpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAodGFyZ2V0LmV2ZW50cy5maXJlKERyYWdFdmVudHMuYmVmb3JlRHJvcCwgW3RoaXMuX2xhc3RJZCwgdGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldF0pKSB7XG5cdFx0XHRjb25zdCB0byA9IHtcblx0XHRcdFx0aWQ6IHRoaXMuX2xhc3RJZCxcblx0XHRcdFx0dGFyZ2V0XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgZnJvbSA9IHtcblx0XHRcdFx0aWQ6IHRoaXMuX3RyYW5zZmVyRGF0YS5pZCxcblx0XHRcdFx0dGFyZ2V0OiB0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0XG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5fbW92ZShmcm9tLCB0byk7XG5cdFx0XHR0by50YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5kcm9wQ29tcGxldGUsIFt0by5pZCwgdGhpcy5fdHJhbnNmZXJEYXRhLmRyb3BQb3NpdGlvbl0pO1xuXHRcdH1cblxuXHRcdHRoaXMuX2VuZERyb3AoKTtcblx0fVxuXHRwcml2YXRlIF9vbkRyYWdTdGFydChpZDogc3RyaW5nLCB0YXJnZXRJZDogc3RyaW5nKSB7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gY29sbGVjdGlvblN0b3JlLmdldEl0ZW0odGFyZ2V0SWQpO1xuXHRcdGNvbnN0IGNvbmZpZyA9IHRhcmdldC5jb25maWc7XG5cdFx0aWYgKGNvbmZpZy5kcmFnTW9kZSA9PT0gRHJhZ01vZGUudGFyZ2V0KSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0Y29uc3QgaXRlbSA9IHRhcmdldC5kYXRhLmdldEl0ZW0oaWQpO1xuXHRcdGNvbnN0IGdob3N0ID0gZHJhZ0V2ZW50Q29udGVudCh0aGlzLl90cmFuc2ZlckRhdGEuaXRlbSk7XG5cdFx0Y29uc3QgYW5zID0gdGFyZ2V0LmV2ZW50cy5maXJlKERyYWdFdmVudHMuYmVmb3JlRHJhZywgW2l0ZW0sIGdob3N0XSk7XG5cdFx0aWYgKCFhbnMgfHwgIWlkKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdFx0dGFyZ2V0LmV2ZW50cy5maXJlKERyYWdFdmVudHMuZHJhZ1N0YXJ0LCBbaWRdKTtcblx0XHR0aGlzLl90b2dnbGVUZXh0U2VsZWN0aW9uKHRydWUpO1xuXHRcdHRoaXMuX3RyYW5zZmVyRGF0YS50YXJnZXQgPSB0YXJnZXQ7XG5cdFx0dGhpcy5fdHJhbnNmZXJEYXRhLmRyYWdDb25maWcgPSBjb25maWc7XG5cdFx0cmV0dXJuIGdob3N0O1xuXHR9XG5cdHByaXZhdGUgX29uRHJhZyhlOiBNb3VzZUV2ZW50KSB7XG5cdFx0Y29uc3Qge2NsaWVudFgsIGNsaWVudFl9ID0gZTtcblx0XHRjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcblxuXHRcdGNvbnN0IGNvbGxlY3Rpb25JZCA9IGxvY2F0ZShlbGVtZW50LCBcImRoeF93aWRnZXRfaWRcIik7XG5cdFx0aWYgKCFjb2xsZWN0aW9uSWQpIHtcblx0XHRcdGlmICh0aGlzLl9jYW5Nb3ZlKSB7XG5cdFx0XHRcdHRoaXMuX2NhbmNlbENhbkRyb3AoKTtcblx0XHRcdH1cblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCB0YXJnZXQgPSBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbShjb2xsZWN0aW9uSWQpO1xuXHRcdGNvbnN0IGlkID0gbG9jYXRlKGVsZW1lbnQsIFwiZGh4X2lkXCIpO1xuXG5cdFx0aWYgKCFpZCkge1xuXHRcdFx0dGhpcy5fY2FuY2VsQ2FuRHJvcCgpO1xuXHRcdFx0dGhpcy5fbGFzdENvbGxlY3Rpb25JZCA9IGNvbGxlY3Rpb25JZDtcblx0XHRcdHRoaXMuX2xhc3RJZCA9IG51bGw7XG5cdFx0XHR0aGlzLl9jYW5Ecm9wKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cblx0XHRpZiAodGFyZ2V0LmNvbmZpZy5kcm9wQmVoYXZpb3VyID09PSBEcm9wQmVoYXZpb3VyLmNvbXBsZXgpIHtcblx0XHRcdGNvbnN0IHBvcyA9IGdldFBvc2l0aW9uKGUpO1xuXHRcdFx0aWYgKHBvcyA8PSAwLjI1KSB7XG5cdFx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5kcm9wUG9zaXRpb24gPSBEcm9wUG9zaXRpb24udG9wO1xuXHRcdFx0fSBlbHNlIGlmIChwb3MgPj0gMC43NSkge1xuXHRcdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uID0gRHJvcFBvc2l0aW9uLmJvdDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuX3RyYW5zZmVyRGF0YS5kcm9wUG9zaXRpb24gPSBEcm9wUG9zaXRpb24uaW47XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9sYXN0SWQgPT09IGlkICYmIHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQgPT09IGNvbGxlY3Rpb25JZCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGZyb206IElDb3B5T2JqZWN0ID0ge1xuXHRcdFx0aWQ6IHRoaXMuX3RyYW5zZmVyRGF0YS5pZCxcblx0XHRcdHRhcmdldDogdGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldFxuXHRcdH07XG5cdFx0aWYgKHRhcmdldC5jb25maWcuZHJhZ01vZGUgPT09IFwic291cmNlXCIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0ZnJvbS50YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5kcmFnT3V0LCBbaWQsIHRhcmdldF0pO1xuXG5cdFx0aWYgKGNvbGxlY3Rpb25JZCAhPT0gdGhpcy5fdHJhbnNmZXJEYXRhLnRhcmdldElkIHx8ICFpc1RyZWVDb2xsZWN0aW9uKGZyb20udGFyZ2V0LmRhdGEpIHx8XG5cdFx0XHQoaXNUcmVlQ29sbGVjdGlvbihmcm9tLnRhcmdldC5kYXRhKSAmJiBmcm9tLnRhcmdldC5kYXRhLmNhbkNvcHkoZnJvbS5pZCwgaWQpKSkge1xuXHRcdFx0dGhpcy5fY2FuY2VsQ2FuRHJvcCgpOyAvLyBjbGVhciBsYXN0XG5cdFx0XHR0aGlzLl9sYXN0SWQgPSBpZDtcblx0XHRcdHRoaXMuX2xhc3RDb2xsZWN0aW9uSWQgPSBjb2xsZWN0aW9uSWQ7XG5cdFx0XHRjb25zdCBjYW5Nb3ZlID0gZnJvbS50YXJnZXQuZXZlbnRzLmZpcmUoRHJhZ0V2ZW50cy5kcmFnSW4sIFtpZCwgdGhpcy5fdHJhbnNmZXJEYXRhLmRyb3BQb3NpdGlvbiwgY29sbGVjdGlvblN0b3JlLmdldEl0ZW0oY29sbGVjdGlvbklkKV0pO1xuXHRcdFx0aWYgKGNhbk1vdmUpIHtcblx0XHRcdFx0dGhpcy5fY2FuRHJvcCgpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX21vdmUoZnJvbTogSUNvcHlPYmplY3QsIHRvOiBJQ29weU9iamVjdCk6IHZvaWQge1xuXHRcdGNvbnN0IGZyb21EYXRhID0gZnJvbS50YXJnZXQuZGF0YTtcblx0XHRjb25zdCB0b0RhdGEgPSB0by50YXJnZXQuZGF0YTtcblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdGxldCB0YXJnZXRJZCA9IHRvLmlkO1xuXHRcdGNvbnN0IGJlaGF2aW91ciA9IGlzVHJlZUNvbGxlY3Rpb24odG9EYXRhKSA/IHRvLnRhcmdldC5jb25maWcuZHJvcEJlaGF2aW91ciA6IHVuZGVmaW5lZDtcblxuXHRcdHN3aXRjaChiZWhhdmlvdXIpIHtcblx0XHRcdGNhc2UgRHJvcEJlaGF2aW91ci5jaGlsZDpcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERyb3BCZWhhdmlvdXIuc2libGluZzpcblx0XHRcdFx0dGFyZ2V0SWQgPSAodG9EYXRhIGFzIFRyZWVDb2xsZWN0aW9uKS5nZXRQYXJlbnQodGFyZ2V0SWQpO1xuXHRcdFx0XHRpbmRleCA9IHRvRGF0YS5nZXRJbmRleCh0by5pZCkgKyAxO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRHJvcEJlaGF2aW91ci5jb21wbGV4OlxuXHRcdFx0XHRjb25zdCBkcm9wUG9zaXRpb24gPSB0aGlzLl90cmFuc2ZlckRhdGEuZHJvcFBvc2l0aW9uO1xuXHRcdFx0XHRpZiAoZHJvcFBvc2l0aW9uID09PSBEcm9wUG9zaXRpb24udG9wKSB7XG5cdFx0XHRcdFx0dGFyZ2V0SWQgPSAodG9EYXRhIGFzIFRyZWVDb2xsZWN0aW9uKS5nZXRQYXJlbnQodGFyZ2V0SWQpO1xuXHRcdFx0XHRcdGluZGV4ID0gdG9EYXRhLmdldEluZGV4KHRvLmlkKTtcblx0XHRcdFx0fSBlbHNlIGlmIChkcm9wUG9zaXRpb24gPT09IERyb3BQb3NpdGlvbi5ib3QpIHtcblx0XHRcdFx0XHR0YXJnZXRJZCA9ICh0b0RhdGEgYXMgVHJlZUNvbGxlY3Rpb24pLmdldFBhcmVudCh0YXJnZXRJZCk7XG5cdFx0XHRcdFx0aW5kZXggPSB0b0RhdGEuZ2V0SW5kZXgodG8uaWQpICsgMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdC8vIGxpc3QgbW92ZVxuXHRcdFx0XHRpZiAoIXRvLmlkKSB7XG5cdFx0XHRcdFx0aW5kZXggPSAtMTtcblx0XHRcdFx0fSBlbHNlIGlmIChmcm9tLnRhcmdldCA9PT0gdG8udGFyZ2V0ICYmIHRvRGF0YS5nZXRJbmRleChmcm9tLmlkKSA8IHRvRGF0YS5nZXRJbmRleCh0by5pZCkpIHtcblx0XHRcdFx0XHRpbmRleCA9IHRvRGF0YS5nZXRJbmRleCh0by5pZCkgLSAxO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGluZGV4ID0gdG9EYXRhLmdldEluZGV4KHRvLmlkKTtcblx0XHRcdFx0fVxuXHRcdH1cblx0XHRpZiAodGhpcy5fdHJhbnNmZXJEYXRhLmRyYWdDb25maWcuZHJhZ0NvcHkpIHtcblx0XHRcdGZyb21EYXRhLmNvcHkoZnJvbS5pZCwgaW5kZXgsIHRvRGF0YSwgdGFyZ2V0SWQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQoZnJvbURhdGEgYXMgYW55KS5tb3ZlKGZyb20uaWQsIGluZGV4LCB0b0RhdGEsIHRhcmdldElkKTsgLy8gdHlwZXNjcmlwdCBidWc/P1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF9lbmREcm9wKCkge1xuXHRcdHRoaXMuX3RvZ2dsZVRleHRTZWxlY3Rpb24oZmFsc2UpO1xuXHRcdGlmICh0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0KSB7XG5cdFx0XHR0aGlzLl90cmFuc2ZlckRhdGEudGFyZ2V0LmV2ZW50cy5maXJlKERyYWdFdmVudHMuZHJhZ0VuZCwgW3RoaXMuX3RyYW5zZmVyRGF0YS5pZF0pO1xuXHRcdH1cblx0XHR0aGlzLl9jYW5jZWxDYW5Ecm9wKCk7XG5cdFx0dGhpcy5fY2FuTW92ZSA9IHRydWU7XG5cdFx0dGhpcy5fdHJhbnNmZXJEYXRhID0ge307XG5cdFx0dGhpcy5fbGFzdElkID0gbnVsbDtcblx0XHR0aGlzLl9sYXN0Q29sbGVjdGlvbklkID0gbnVsbDtcblx0fVxuXHRwcml2YXRlIF9jYW5jZWxDYW5Ecm9wKCkge1xuXHRcdHRoaXMuX2Nhbk1vdmUgPSBmYWxzZTtcblx0XHRjb25zdCBjb2xsZWN0aW9uID0gY29sbGVjdGlvblN0b3JlLmdldEl0ZW0odGhpcy5fbGFzdENvbGxlY3Rpb25JZCk7XG5cdFx0aWYgKGNvbGxlY3Rpb24gJiYgdGhpcy5fbGFzdElkKSB7XG5cdFx0XHRjb2xsZWN0aW9uLmV2ZW50cy5maXJlKERyYWdFdmVudHMuY2FuY2VsRHJvcCwgW3RoaXMuX2xhc3RJZF0pO1xuXHRcdH1cblx0XHR0aGlzLl9sYXN0Q29sbGVjdGlvbklkID0gbnVsbDtcblx0XHR0aGlzLl9sYXN0SWQgPSBudWxsO1xuXHR9XG5cdHByaXZhdGUgX2NhbkRyb3AoKSB7XG5cdFx0dGhpcy5fY2FuTW92ZSA9IHRydWU7XG5cblx0XHRjb25zdCB0YXJnZXQgPSBjb2xsZWN0aW9uU3RvcmUuZ2V0SXRlbSh0aGlzLl9sYXN0Q29sbGVjdGlvbklkKTtcblx0XHRpZiAodGFyZ2V0ICYmIHRoaXMuX2xhc3RJZCkge1xuXHRcdFx0dGFyZ2V0LmV2ZW50cy5maXJlKERyYWdFdmVudHMuY2FuRHJvcCwgW3RoaXMuX2xhc3RJZCwgdGhpcy5fdHJhbnNmZXJEYXRhLmRyb3BQb3NpdGlvbl0pO1xuXHRcdH1cblx0fVxuXHRwcml2YXRlIF90b2dnbGVUZXh0U2VsZWN0aW9uKGFkZDogYm9vbGVhbikge1xuXHRcdGlmIChhZGQpIHtcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImRoeF9uby1zZWxlY3RcIik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZShcImRoeF9uby1zZWxlY3RcIik7XG5cdFx0fVxuXHR9XG59XG5cbmNvbnN0IGRoeCA9ICh3aW5kb3cgYXMgYW55KS5kaHhIZWxwZXJzID0gKHdpbmRvdyBhcyBhbnkpLmRoeEhlbHBlcnMgfHwge307XG5kaHguZHJhZ01hbmFnZXIgPSBkaHguZHJhZ01hbmFnZXIgfHwgbmV3IERyYWdNYW5hZ2VyKCk7XG5leHBvcnQgY29uc3QgZHJhZ01hbmFnZXIgPSBkaHguZHJhZ01hbmFnZXI7IiwiaW1wb3J0IHsgRXZlbnRTeXN0ZW0sIElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcblxuaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSBcIi4vZGF0YWNvbGxlY3Rpb24vbG9hZGVyXCI7XG5pbXBvcnQgeyBTb3J0IH0gZnJvbSBcIi4vZGF0YWNvbGxlY3Rpb24vc29ydFwiO1xuaW1wb3J0IHsgRGF0YVByb3h5IH0gZnJvbSBcIi4vZGF0YXByb3h5XCI7XG5pbXBvcnQgeyBkaHhFcnJvciwgZGh4V2FybmluZywgZmluZEJ5Q29uZiwgaXNEZWJ1ZywgaXNFcXVhbE9iaiwgY29weVdpdGhvdXRJbm5lciwgdG9EYXRhRHJpdmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHtcblx0RGF0YUNhbGxiYWNrLCBEYXRhRXZlbnRzLCBJZCwgSURhdGFDaGFuZ2VTdGFjaywgSURhdGFDb2xsZWN0aW9uLCBJRGF0YUl0ZW0sXG5cdElEYXRhUHJveHksIElGaWx0ZXJDYWxsYmFjaywgSUZpbHRlckNvbmZpZywgSUZpbHRlck1vZGUsIElTb3J0TW9kZSwgSVRyZWVDb2xsZWN0aW9uLCBJVXBkYXRlT2JqZWN0LCBSZWR1Y2VDYWxsQmFjaywgU3RhdHVzZXMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAsIERhdGFEcml2ZXIsXG59IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCB7IGNvcHksIGV4dGVuZCwgZmluZEluZGV4LCB1aWQgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vY29yZVwiO1xuaW1wb3J0IHsgVHJlZUNvbGxlY3Rpb24gfSBmcm9tIFwiLi90cmVlY29sbGVjdGlvblwiO1xuXG5leHBvcnQgY2xhc3MgRGF0YUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4gaW1wbGVtZW50cyBJRGF0YUNvbGxlY3Rpb248VD4ge1xuXHRwdWJsaWMgbG9hZERhdGE6IFByb21pc2U8YW55Pjtcblx0cHVibGljIHNhdmVEYXRhOiBQcm9taXNlPGFueT47XG5cdHB1YmxpYyBjb25maWc6IGFueTsgLy8gW1RPRE9dIGFkZCB0eXBpbmdzXG5cdHB1YmxpYyBldmVudHM6IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzLCBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwPjtcblxuXHRwcm90ZWN0ZWQgX29yZGVyOiBUW107XG5cdHByb3RlY3RlZCBfcHVsbDogeyBbaWQ6IHN0cmluZ106IFQgfTtcblx0cHJvdGVjdGVkIF9zb3J0OiBTb3J0O1xuXHRwcm90ZWN0ZWQgX2ZpbHRlcnM6YW55O1xuXG5cdHByaXZhdGUgX2NoYW5nZXM6IElEYXRhQ2hhbmdlU3RhY2s7XG5cblx0cHJpdmF0ZSBfaW5pdE9yZGVyOiBUW107XG5cblx0cHJpdmF0ZSBfbG9hZGVyOiBMb2FkZXI7XG5cblx0Y29uc3RydWN0b3IoY29uZmlnPzogYW55LCBldmVudHM/OklFdmVudFN5c3RlbTxhbnk+KSB7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWcgfHwge307XG5cblx0XHR0aGlzLl9vcmRlciA9IFtdO1xuXHRcdHRoaXMuX3B1bGwgPSB7fTtcblx0XHR0aGlzLl9jaGFuZ2VzID0ge29yZGVyOiBbXX07XG5cdFx0dGhpcy5faW5pdE9yZGVyID0gbnVsbDtcblxuXHRcdHRoaXMuX3NvcnQgPSBuZXcgU29ydCgpO1xuXHRcdHRoaXMuX2xvYWRlciA9IG5ldyBMb2FkZXIodGhpcywgdGhpcy5fY2hhbmdlcyk7XG5cdFx0dGhpcy5ldmVudHMgPSBldmVudHMgfHwgbmV3IEV2ZW50U3lzdGVtPGFueT4odGhpcyk7XG5cdH1cblxuXHRhZGQob2JqOiBhbnksIGluZGV4PzogbnVtYmVyKTogc3RyaW5nIHtcblx0XHRpZiAoIXRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5iZWZvcmVBZGQsIFtvYmpdKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGlkID0gdGhpcy5fYWRkQ29yZShvYmosIGluZGV4KTtcblxuXHRcdHRoaXMuX29uQ2hhbmdlKFwiYWRkXCIsIG9iai5pZCwgb2JqKTtcblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuYWZ0ZXJBZGQsIFtvYmpdKTtcblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0cmVtb3ZlKGlkOiBJZCk6IHZvaWQge1xuXHRcdGNvbnN0IG9iaiA9IHRoaXMuX3B1bGxbaWRdO1xuXHRcdGlmIChvYmopIHtcblx0XHRcdGlmICghdGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmJlZm9yZVJlbW92ZSwgW29ial0pKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdHRoaXMuX3JlbW92ZUNvcmUob2JqLmlkKTtcblx0XHRcdHRoaXMuX29uQ2hhbmdlKFwicmVtb3ZlXCIsIGlkLCBvYmopO1xuXHRcdH1cblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5hZnRlclJlbW92ZSwgW29ial0pO1xuXHR9XG5cblx0cmVtb3ZlQWxsKCk6IHZvaWQge1xuXHRcdHRoaXMuX3JlbW92ZUFsbCgpO1xuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5yZW1vdmVBbGwpO1xuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHR9XG5cblx0ZXhpc3RzKGlkOiBJZCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhIXRoaXMuX3B1bGxbaWRdO1xuXHR9XG5cdGdldE5lYXJJZChpZDogc3RyaW5nKXtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5fcHVsbFtpZF07XG5cdFx0aWYgKCFpdGVtKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fb3JkZXJbMF0uaWQgfHwgXCJcIjtcblx0XHR9XG5cdH1cblx0Z2V0SXRlbShpZDogSWQpOiBUIHtcblx0XHRyZXR1cm4gdGhpcy5fcHVsbFtpZF07XG5cdH1cblx0dXBkYXRlKGlkOiBJZCwgb2JqOiBJVXBkYXRlT2JqZWN0LCBzaWxlbnQ/OmJvb2xlYW4pIHtcblx0XHRjb25zdCBpdGVtID0gdGhpcy5nZXRJdGVtKGlkKTtcblx0XHRpZiAoaXRlbSkge1xuXHRcdFx0aWYgKGlzRXF1YWxPYmoob2JqLCBpdGVtKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmIChvYmouaWQgJiYgaWQgIT09IG9iai5pZCkge1xuXHRcdFx0XHRkaHhXYXJuaW5nKFwidGhpcyBtZXRob2QgZG9lc24ndCBhbGxvdyBjaGFuZ2UgaWRcIik7XG5cdFx0XHRcdGlmIChpc0RlYnVnKCkpIHtcblx0XHRcdFx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZGVidWdnZXJcblx0XHRcdFx0XHRkZWJ1Z2dlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXh0ZW5kKHRoaXMuX3B1bGxbaWRdLCBvYmosIGZhbHNlKTtcblx0XHRcdFx0aWYgKHRoaXMuY29uZmlnLnVwZGF0ZSl7XG5cdFx0XHRcdFx0dGhpcy5jb25maWcudXBkYXRlKHRoaXMuX3B1bGxbaWRdKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIXNpbGVudCl7XG5cdFx0XHRcdFx0dGhpcy5fb25DaGFuZ2UoXCJ1cGRhdGVcIiwgaWQsIHRoaXMuX3B1bGxbaWRdKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRkaHhXYXJuaW5nKFwiaXRlbSBub3QgZm91bmRcIik7XG5cdFx0fVxuXHR9XG5cdGdldEluZGV4KGlkOiBJZCk6IG51bWJlciB7XG5cdFx0Y29uc3QgcmVzID0gZmluZEluZGV4KHRoaXMuX29yZGVyLCBpdGVtID0+IGl0ZW0uaWQgPT09IGlkKTtcblx0XHRpZiAodGhpcy5fcHVsbFtpZF0gJiYgcmVzID49IDApIHtcblx0XHRcdHJldHVybiByZXM7XG5cdFx0fVxuXHRcdHJldHVybiAtMTtcblx0fVxuXHRnZXRJZChpbmRleDogbnVtYmVyKTogSWQge1xuXHRcdGlmICghdGhpcy5fb3JkZXJbaW5kZXhdKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9vcmRlcltpbmRleF0uaWQ7XG5cdH1cblx0Z2V0TGVuZ3RoKCkge1xuXHRcdHJldHVybiB0aGlzLl9vcmRlci5sZW5ndGg7XG5cdH1cblx0ZmlsdGVyKHJ1bGU/OiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjaywgY29uZmlnPzpJRmlsdGVyQ29uZmlnKSB7XG5cdFx0Y29uZmlnID0gZXh0ZW5kKHtcblx0XHRcdGFkZDpmYWxzZSxcblx0XHRcdG11bHRpcGxlOnRydWVcblx0XHR9LGNvbmZpZyk7XG5cblx0XHRpZiAoIWNvbmZpZy5hZGQpIHtcblx0XHRcdHRoaXMuX29yZGVyID0gdGhpcy5faW5pdE9yZGVyIHx8IHRoaXMuX29yZGVyO1xuXHRcdFx0dGhpcy5faW5pdE9yZGVyID0gbnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLl9maWx0ZXJzID0gdGhpcy5fZmlsdGVycyB8fCB7fTtcblxuXHRcdGlmICghY29uZmlnLm11bHRpcGxlfHwhcnVsZSkge1xuXHRcdFx0dGhpcy5fZmlsdGVycyA9IHt9O1xuXHRcdH1cblxuXHRcdGlmKHJ1bGUpe1xuXHRcdFx0aWYodHlwZW9mIHJ1bGUgPT09IFwiZnVuY3Rpb25cIil7XG5cdFx0XHRcdGNvbnN0IGYgPSBcIl9cIjtcblx0XHRcdFx0dGhpcy5fZmlsdGVyc1tmXSA9IHtcblx0XHRcdFx0XHRtYXRjaDpmLFxuXHRcdFx0XHRcdGNvbXBhcmU6cnVsZVxuXHRcdFx0XHR9O1xuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGlmKCFydWxlLm1hdGNoKXtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5fZmlsdGVyc1tydWxlLmJ5XTtcblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cnVsZS5jb21wYXJlID0gcnVsZS5jb21wYXJlIHx8ICgodmFsLCBtYXRjaCkgPT4gdmFsID09PSBtYXRjaCk7XG5cdFx0XHRcdFx0dGhpcy5fZmlsdGVyc1tydWxlLmJ5XSA9IHJ1bGU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgZk9yZGVyID0gdGhpcy5fb3JkZXIuZmlsdGVyKGl0ZW0gPT4ge1xuXHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXModGhpcy5fZmlsdGVycykuZXZlcnkoXG5cdFx0XHRcdFx0a2V5ID0+XG5cdFx0XHRcdFx0XHRpdGVtW2tleV0/XG5cdFx0XHRcdFx0XHR0aGlzLl9maWx0ZXJzW2tleV0uY29tcGFyZShpdGVtW2tleV0sIHRoaXMuX2ZpbHRlcnNba2V5XS5tYXRjaCwgaXRlbSlcblx0XHRcdFx0XHRcdDp0aGlzLl9maWx0ZXJzW2tleV0uY29tcGFyZShpdGVtKVxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmICghdGhpcy5faW5pdE9yZGVyKSB7XG5cdFx0XHRcdHRoaXMuX2luaXRPcmRlciA9IHRoaXMuX29yZGVyO1xuXHRcdFx0XHR0aGlzLl9vcmRlciA9IGZPcmRlcjtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0fVxuXHRmaW5kKGNvbmY6IElGaWx0ZXJNb2RlIHwgRGF0YUNhbGxiYWNrPFQ+KTogYW55IHtcblx0XHRmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9wdWxsKSB7XG5cdFx0XHRjb25zdCByZXMgPSBmaW5kQnlDb25mKHRoaXMuX3B1bGxba2V5XSwgY29uZik7XG5cdFx0XHRpZihyZXMpe1xuXHRcdFx0XHRyZXR1cm4gcmVzO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRmaW5kQWxsKGNvbmY6IElGaWx0ZXJNb2RlIHwgRGF0YUNhbGxiYWNrPFQ+KTogYW55W10ge1xuXHRcdGNvbnN0IHJlcyA9IFtdO1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHRoaXMuX3B1bGwpIHtcblx0XHRcdGNvbnN0IGl0ZW0gPSBmaW5kQnlDb25mKHRoaXMuX3B1bGxba2V5XSwgY29uZik7XG5cdFx0XHRpZiAoaXRlbSkge1xuXHRcdFx0XHRyZXMucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlcztcblx0fVxuXHRzb3J0KGJ5OiBJU29ydE1vZGUpIHtcblx0XHR0aGlzLl9zb3J0LnNvcnQodGhpcy5fb3JkZXIsIGJ5KTtcblxuXHRcdGlmICh0aGlzLl9pbml0T3JkZXIgJiYgdGhpcy5faW5pdE9yZGVyLmxlbmd0aCkge1xuXHRcdFx0dGhpcy5fc29ydC5zb3J0KHRoaXMuX2luaXRPcmRlciwgYnkpO1xuXHRcdH1cblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHR9XG5cdGNvcHkoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBJRGF0YUNvbGxlY3Rpb24gfCBJVHJlZUNvbGxlY3Rpb24sIHRhcmdldElkPzogSWQpOiBJZCB7XG5cdFx0aWYgKCF0aGlzLmV4aXN0cyhpZCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBuZXdpZCA9IHVpZCgpO1xuXHRcdGlmICh0YXJnZXQpIHtcblx0XHRcdGlmICghKHRhcmdldCBpbnN0YW5jZW9mIERhdGFDb2xsZWN0aW9uKSAmJiB0YXJnZXRJZCkge1xuXHRcdFx0XHR0YXJnZXQuYWRkKGNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGluZGV4LCB0YXJnZXRJZCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICh0YXJnZXQuZXhpc3RzKGlkKSkge1xuXHRcdFx0XHR0YXJnZXQuYWRkKHsuLi5jb3B5V2l0aG91dElubmVyKHRoaXMuZ2V0SXRlbShpZCkpLCBpZDogbmV3aWQgfSwgaW5kZXgpO1xuXHRcdFx0XHRyZXR1cm4gbmV3aWQ7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0YXJnZXQuYWRkKGNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGluZGV4KTtcblx0XHRcdFx0cmV0dXJuIGlkO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLmFkZCh7IC4uLmNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGlkOiBuZXdpZCB9LCBpbmRleCk7XG5cdFx0cmV0dXJuIG5ld2lkO1xuXHR9XG5cdG1vdmUoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBEYXRhQ29sbGVjdGlvbiB8IFRyZWVDb2xsZWN0aW9uLCB0YXJnZXRJZD86IElkKTogSWQge1xuXHRcdGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSB0aGlzICYmIHRoaXMuZXhpc3RzKGlkKSkge1xuXHRcdFx0Y29uc3QgaXRlbSA9IGNvcHkodGhpcy5nZXRJdGVtKGlkKSwgdHJ1ZSk7XG5cdFx0XHRpZiAodGFyZ2V0LmV4aXN0cyhpZCkpIHtcblx0XHRcdFx0aXRlbS5pZCA9IHVpZCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRhcmdldElkKSB7XG5cdFx0XHRcdGl0ZW0ucGFyZW50ID0gdGFyZ2V0SWQ7XG5cdFx0XHR9XG5cdFx0XHR0YXJnZXQuYWRkKGl0ZW0sIGluZGV4KTtcblx0XHRcdC8vIHJlbW92ZSBkYXRhIGZyb20gb3JpZ2luYWwgY29sbGVjdGlvblxuXHRcdFx0dGhpcy5yZW1vdmUoaWQpO1xuXHRcdFx0cmV0dXJuIGl0ZW0uaWQ7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmdldEluZGV4KGlkKSA9PT0gaW5kZXgpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHQvLyBtb3ZlIG90aGVyIGVsZW1lbnRzXG5cdFx0Y29uc3Qgc3BsaWNlZCA9IHRoaXMuX29yZGVyLnNwbGljZSh0aGlzLmdldEluZGV4KGlkKSwgMSlbMF07XG5cdFx0aWYgKGluZGV4ID09PSAtMSkge1xuXHRcdFx0aW5kZXggPSB0aGlzLl9vcmRlci5sZW5ndGg7XG5cdFx0fVxuXHRcdHRoaXMuX29yZGVyLnNwbGljZShpbmRleCwgMCwgc3BsaWNlZCk7XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTsgLy8gaWYgdGFyZ2V0IG5vdCB0aGlzLCBpdCB0cmlnZ2VyIGFkZCBhbmQgcmVtb3ZlXG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdGxvYWQodXJsOiBJRGF0YVByb3h5IHwgc3RyaW5nLCBkcml2ZXI/OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuXHRcdGlmICh0eXBlb2YgdXJsID09PSBcInN0cmluZ1wiKXtcblx0XHRcdHVybCA9IG5ldyBEYXRhUHJveHkodXJsKTtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2xvYWRlci5sb2FkKHVybCwgZHJpdmVyKTtcblx0fVxuXHRwYXJzZShkYXRhOiBUW10sIGRyaXZlcj86IGFueSkge1xuXHRcdHRoaXMuX3JlbW92ZUFsbCgpO1xuXHRcdHJldHVybiB0aGlzLl9sb2FkZXIucGFyc2UoZGF0YSwgZHJpdmVyKTtcblx0fVxuXHQkcGFyc2UoZGF0YTogYW55W10pe1xuXHRcdGNvbnN0IGFweCA9IHRoaXMuY29uZmlnLmFwcHJveGltYXRlO1xuXHRcdGlmIChhcHgpe1xuXHRcdFx0ZGF0YSA9IHRoaXMuX2FwcHJveGltYXRlKGRhdGEsIGFweC52YWx1ZSwgYXB4Lm1heE51bSk7XG5cdFx0fVxuXG5cdFx0dGhpcy5fcGFyc2VfZGF0YShkYXRhKTtcblxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UpO1xuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5sb2FkKTtcblx0fVxuXHRzYXZlKHVybDogSURhdGFQcm94eSkge1xuXHRcdHRoaXMuX2xvYWRlci5zYXZlKHVybCk7XG5cdH1cblx0Ly8gdG9kbzogbG9vcCB0aHJvdWdoIHRoZSBhcnJheSBhbmQgY2hlY2sgc2F2ZWQgc3RhdHVzZXNcblx0aXNTYXZlZCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gIXRoaXMuX2NoYW5nZXMub3JkZXIubGVuZ3RoOyAvLyB0b2RvOiBiYWQgc29sdXRpb24sIGVycm9ycyBhbmQgaG9sZGVkIGVsbWVudHMgYXJlIG1pc3NlZC4uLlxuXHR9XG5cdG1hcChjYjogRGF0YUNhbGxiYWNrPFQ+KSA6IGFueVtde1xuXHRcdGNvbnN0IHJlc3VsdCA6IGFueVtdID0gW107XG5cdFx0Zm9yIChsZXQgaT0wOyBpPHRoaXMuX29yZGVyLmxlbmd0aDsgaSsrKXtcblx0XHRcdHJlc3VsdC5wdXNoKGNiLmNhbGwodGhpcywgdGhpcy5fb3JkZXJbaV0sIGkpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRtYXBSYW5nZShmcm9tOiBudW1iZXIsIHRvOiBudW1iZXIsIGNiOiBEYXRhQ2FsbGJhY2s8VD4pOiBhbnlbXSB7XG5cdFx0aWYgKGZyb20gPCAwKSB7XG5cdFx0XHRmcm9tID0gMDtcblx0XHR9XG5cdFx0aWYgKHRvID4gdGhpcy5fb3JkZXIubGVuZ3RoIC0gMSkge1xuXHRcdFx0dG8gPSB0aGlzLl9vcmRlci5sZW5ndGggLSAxO1xuXHRcdH1cblx0XHRjb25zdCByZXN1bHQ6IGFueVtdID0gW107XG5cdFx0Zm9yIChsZXQgaT1mcm9tOyBpPD10bzsgaSsrKXtcblx0XHRcdHJlc3VsdC5wdXNoKGNiLmNhbGwodGhpcywgdGhpcy5fb3JkZXJbaV0sIGkpKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRyZWR1Y2U8QT4oY2I6IFJlZHVjZUNhbGxCYWNrPFQsIEE+LCBhY2M6IEEpe1xuXHRcdGZvciAobGV0IGk9MDsgaTx0aGlzLl9vcmRlci5sZW5ndGg7IGkrKykge1xuXHRcdFx0YWNjID0gY2IuY2FsbCh0aGlzLCBhY2MsIHRoaXMuX29yZGVyW2ldLCBpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGFjYztcblx0fVxuXHRzZXJpYWxpemUoZHJpdmVyOiBEYXRhRHJpdmVyID0gRGF0YURyaXZlci5qc29uKXsgLy8gcmVtb3ZlICQgYXR0cnNcblx0XHRjb25zdCBkYXRhID0gdGhpcy5tYXAoaXRlbSA9PiB7XG5cdFx0XHRjb25zdCBuZXdJdGVtID0gey4uLml0ZW0gYXMgSURhdGFJdGVtfTtcblx0XHRcdE9iamVjdC5rZXlzKG5ld0l0ZW0pLmZvckVhY2goa2V5ID0+IHtcblx0XHRcdFx0aWYgKGtleVswXSA9PT0gXCIkXCIpIHtcblx0XHRcdFx0XHRkZWxldGUgbmV3SXRlbVtrZXldO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHJldHVybiBuZXdJdGVtO1xuXHRcdH0pO1xuXHRcdGNvbnN0IGRhdGFEcml2ZXIgPSB0b0RhdGFEcml2ZXIoZHJpdmVyKTtcblx0XHRpZihkYXRhRHJpdmVyKXtcblx0XHRcdHJldHVybiBkYXRhRHJpdmVyLnNlcmlhbGl6ZShkYXRhKTtcblx0XHR9XG5cdH1cblx0Z2V0SW5pdGlhbERhdGEoKXtcblx0XHRyZXR1cm4gdGhpcy5faW5pdE9yZGVyO1xuXHR9XG5cdHByb3RlY3RlZCBfcmVtb3ZlQWxsKCl7XG5cdFx0dGhpcy5fcHVsbCA9IHt9O1xuXHRcdHRoaXMuX29yZGVyID0gW107XG5cdFx0dGhpcy5fY2hhbmdlcy5vcmRlciA9IFtdO1xuXHRcdHRoaXMuX2luaXRPcmRlciA9IG51bGw7XG5cdH1cblx0cHJvdGVjdGVkIF9hZGRDb3JlKG9iaiwgaW5kZXgpOiBzdHJpbmcge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5pbml0KSB7XG5cdFx0XHRvYmogPSB0aGlzLmNvbmZpZy5pbml0KG9iaik7XG5cdFx0fVxuXG5cdFx0b2JqLmlkID0gb2JqLmlkID8gb2JqLmlkLnRvU3RyaW5nKCkgOiB1aWQoKTtcblxuXHRcdGlmICh0aGlzLl9wdWxsW29iai5pZF0pIHtcblx0XHRcdGRoeEVycm9yKFwiSXRlbSBhbHJlYWR5IGV4aXN0XCIpO1xuXHRcdH1cblx0XHQvLyB0b2RvOiBub3QgaWRlYWwgc29sdXRpb25cblx0XHRpZiAodGhpcy5faW5pdE9yZGVyICYmIHRoaXMuX2luaXRPcmRlci5sZW5ndGgpIHtcblx0XHRcdHRoaXMuX2FkZFRvT3JkZXIodGhpcy5faW5pdE9yZGVyLCBvYmosIGluZGV4KTtcblx0XHR9XG5cblx0XHR0aGlzLl9hZGRUb09yZGVyKHRoaXMuX29yZGVyLCBvYmosIGluZGV4KTtcblxuXHRcdHJldHVybiBvYmouaWQ7XG5cdH1cblx0cHJvdGVjdGVkIF9yZW1vdmVDb3JlKGlkOiBJZCl7XG5cdFx0aWYgKHRoaXMuZ2V0SW5kZXgoaWQpID49IDApe1xuXHRcdFx0dGhpcy5fb3JkZXIgPSB0aGlzLl9vcmRlci5maWx0ZXIoZWwgPT4gZWwuaWQgIT09IGlkKTtcblx0XHRcdGRlbGV0ZSB0aGlzLl9wdWxsW2lkXTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5faW5pdE9yZGVyICYmIHRoaXMuX2luaXRPcmRlci5sZW5ndGgpIHtcblx0XHRcdHRoaXMuX2luaXRPcmRlciA9IHRoaXMuX2luaXRPcmRlci5maWx0ZXIoZWwgPT4gZWwuaWQgIT09IGlkKTtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX3BhcnNlX2RhdGEoZGF0YTogYW55W10pe1xuXHRcdGxldCBpbmRleCA9IHRoaXMuX29yZGVyLmxlbmd0aDtcblx0XHRpZih0aGlzLmNvbmZpZy5wcmVwKXtcblx0XHRcdGRhdGEgPSB0aGlzLmNvbmZpZy5wcmVwKGRhdGEpO1xuXHRcdH1cblx0XHRmb3IgKGxldCBvYmogb2YgZGF0YSkge1xuXHRcdFx0aWYgKHRoaXMuY29uZmlnLmluaXQpIHtcblx0XHRcdFx0b2JqID0gdGhpcy5jb25maWcuaW5pdChvYmopO1xuXHRcdFx0fVxuXHRcdFx0b2JqLmlkID0gKG9iai5pZCB8fCBvYmouaWQgPT09IDApID8gb2JqLmlkIDogdWlkKCk7XG5cdFx0XHR0aGlzLl9wdWxsW29iai5pZF0gPSBvYmo7XG5cdFx0XHR0aGlzLl9vcmRlcltpbmRleCsrXSA9IG9iajtcblx0XHR9XG5cdH1cblxuXHRwcm90ZWN0ZWQgX2FwcHJveGltYXRlKGRhdGE6IGFueVtdLCB2YWx1ZXM6c3RyaW5nW10sIG1heE51bTpudW1iZXIpe1xuXHRcdGNvbnN0IGxlbiA9IGRhdGEubGVuZ3RoO1xuXHRcdGNvbnN0IHZsZW4gPSB2YWx1ZXMubGVuZ3RoO1xuXHRcdGNvbnN0IHJsZW4gPSBNYXRoLmZsb29yKGxlbi9tYXhOdW0pO1xuXHRcdGNvbnN0IG5ld0RhdGEgPSBBcnJheShNYXRoLmNlaWwobGVuL3JsZW4pKTtcblxuXHRcdGxldCBpbmRleCA9IDA7XG5cdFx0Zm9yIChsZXQgaT0wOyBpPGxlbjsgaSs9cmxlbikge1xuXHRcdFx0Y29uc3QgbmV3SXRlbSA9IGNvcHkoZGF0YVtpXSk7XG5cdFx0XHRjb25zdCBlbmQgPSBNYXRoLm1pbihsZW4sIGkrcmxlbik7XG5cdFx0XHRmb3IgKGxldCBqPTA7IGo8dmxlbjsgaisrKSB7XG5cdFx0XHRcdGxldCBzdW0gPSAwO1xuXHRcdFx0XHRmb3IgKGxldCB6PWk7IHo8ZW5kOyB6Kyspe1xuXHRcdFx0XHRcdHN1bSArPSBkYXRhW3pdW3ZhbHVlc1tqXV07XG5cdFx0XHRcdH1cblx0XHRcdFx0bmV3SXRlbVt2YWx1ZXNbal1dID0gc3VtIC8gKGVuZC1pKTtcblx0XHRcdH1cblx0XHRcdG5ld0RhdGFbaW5kZXgrK10gPSBuZXdJdGVtO1xuXHRcdH1cblxuXHRcdHJldHVybiBuZXdEYXRhO1xuXHR9XG5cdHByb3RlY3RlZCBfb25DaGFuZ2Uoc3RhdHVzOiBTdGF0dXNlcywgaWQ6IElkLCBvYmo6IGFueSk6IHZvaWQge1xuXHRcdGZvciAobGV0IGl0ZW0gb2YgdGhpcy5fY2hhbmdlcy5vcmRlcikge1xuXHRcdFx0Ly8gdXBkYXRlIHBlbmRpbmcgaXRlbSBpZiBwcmV2aW91cyBzdGF0ZSBpcyBcInNhdmluZ1wiIG9yIGlmIGl0ZW0gbm90IHNhdmVkIHlldFxuXHRcdFx0aWYgKGl0ZW0uaWQgPT09IGlkICYmICFpdGVtLnNhdmluZykge1xuXHRcdFx0XHQvLyB1cGRhdGUgaXRlbVxuXHRcdFx0XHRpZiAoaXRlbS5lcnJvcikge1xuXHRcdFx0XHRcdGl0ZW0uZXJyb3IgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpdGVtID0geyAuLi5pdGVtLCBvYmosIHN0YXR1cyB9O1xuXG5cdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UsIFtpZCwgc3RhdHVzLCBvYmpdKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl9jaGFuZ2VzLm9yZGVyLnB1c2goeyBpZCwgc3RhdHVzLCBvYmo6eyAuLi5vYmp9LCBzYXZpbmc6IGZhbHNlIH0pO1xuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YUV2ZW50cy5jaGFuZ2UsIFtpZCwgc3RhdHVzLCBvYmpdKTtcblx0fVxuXHRwcm90ZWN0ZWQgX2FkZFRvT3JkZXIoYXJyYXk6IGFueVtdLCBvYmo6IGFueSwgaW5kZXg/OiBudW1iZXIpIHtcblx0XHRpZiAoaW5kZXggPj0gMCAmJiBhcnJheVtpbmRleF0pIHtcblx0XHRcdHRoaXMuX3B1bGxbb2JqLmlkXSA9IG9iajtcblx0XHRcdGFycmF5LnNwbGljZShpbmRleCwgMCwgb2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xuXHRcdFx0YXJyYXkucHVzaChvYmopO1xuXHRcdH1cblx0fVxufSIsImltcG9ydCB7IERhdGFDb2xsZWN0aW9uIH0gZnJvbSBcIi4vLi4vZGF0YWNvbGxlY3Rpb25cIjtcbmltcG9ydCB7IGRoeEVycm9yLCBkaHhXYXJuaW5nLCBpc0VxdWFsT2JqLCB0b0RhdGFEcml2ZXIgfSBmcm9tIFwiLi8uLi9oZWxwZXJzXCI7XG5pbXBvcnQgeyBJZCwgSURhdGFEcml2ZXIsIElEYXRhUHJveHkgfSBmcm9tIFwiLi8uLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTG9hZGVyIHtcblx0cHJpdmF0ZSBfcGFyZW50OiBEYXRhQ29sbGVjdGlvbjtcblx0cHJpdmF0ZSBfc2F2aW5nOiBib29sZWFuO1xuXHRwcml2YXRlIF9jaGFuZ2VzOiBhbnk7XG5cdGNvbnN0cnVjdG9yKHBhcmVudDogRGF0YUNvbGxlY3Rpb24sIGNoYW5nZXM6IGFueSkge1xuXHRcdHRoaXMuX3BhcmVudCA9IHBhcmVudDtcblx0XHR0aGlzLl9jaGFuZ2VzID0gY2hhbmdlczsvLyB0b2RvOiBbZGlydHldIG11dGF0aW9uXG5cdH1cblx0bG9hZCh1cmw6IElEYXRhUHJveHksIGRyaXZlcj86IElEYXRhRHJpdmVyKTogUHJvbWlzZTxhbnk+IHtcblx0XHRyZXR1cm4gdGhpcy5fcGFyZW50LmxvYWREYXRhID0gdXJsLmxvYWQoKS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHR0aGlzLl9wYXJlbnQucmVtb3ZlQWxsKCk7XG5cdFx0XHR0aGlzLnBhcnNlKGRhdGEsIGRyaXZlcik7XG5cdFx0fSk7XG5cdH1cblx0cGFyc2UoZGF0YTogYW55W10sIGRyaXZlcjogYW55ID0gXCJqc29uXCIpOiB2b2lkIHtcblx0XHRkcml2ZXIgPSB0b0RhdGFEcml2ZXIoZHJpdmVyKTtcblx0XHRkYXRhID0gZHJpdmVyLnRvSnNvbkFycmF5KGRhdGEpO1xuXHRcdHRoaXMuX3BhcmVudC4kcGFyc2UoZGF0YSk7XG5cdH1cblxuXHRzYXZlKHVybDogSURhdGFQcm94eSkge1xuXHRcdGZvciAoY29uc3QgZWwgb2YgdGhpcy5fY2hhbmdlcy5vcmRlcikge1xuXHRcdFx0aWYgKGVsLnNhdmluZyB8fCBlbC5wZW5kaW5nKSB7XG5cdFx0XHRcdGRoeFdhcm5pbmcoXCJpdGVtIGlzIHNhdmluZ1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHByZXZFbCA9IHRoaXMuX2ZpbmRQcmV2U3RhdGUoZWwuaWQpO1xuXG5cdFx0XHRcdGlmIChwcmV2RWwgJiYgcHJldkVsLnNhdmluZykge1xuXHRcdFx0XHRcdGNvbnN0IHBlbmRpbmcgPSBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcblx0XHRcdFx0XHRcdHByZXZFbC5wcm9taXNlLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHRlbC5wZW5kaW5nID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdHJlcyh0aGlzLl9zZXRQcm9taXNlKGVsLCB1cmwpKTtcblx0XHRcdFx0XHRcdH0pLmNhdGNoKGVyciA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuX3JlbW92ZUZyb21PcmRlcihwcmV2RWwpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLl9zZXRQcm9taXNlKGVsLCB1cmwpO1xuXHRcdFx0XHRcdFx0XHRkaHhXYXJuaW5nKGVycik7XG5cdFx0XHRcdFx0XHRcdHJlaihlcnIpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0dGhpcy5fYWRkVG9DaGFpbihwZW5kaW5nKTtcblx0XHRcdFx0XHRlbC5wZW5kaW5nID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zZXRQcm9taXNlKGVsLCB1cmwpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuX3BhcmVudC5zYXZlRGF0YS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuX3NhdmluZyA9IGZhbHNlO1xuXHRcdH0pO1xuXHR9XG5cdHByaXZhdGUgX3NldFByb21pc2UoZWwsIHVybCk6IFByb21pc2U8YW55PiB7XG5cdFx0ZWwucHJvbWlzZSA9IHVybC5zYXZlKGVsLm9iaiwgZWwuc3RhdHVzKTtcblx0XHRlbC5wcm9taXNlLnRoZW4oKCkgPT4ge1xuXHRcdFx0dGhpcy5fcmVtb3ZlRnJvbU9yZGVyKGVsKTtcblx0XHR9KS5jYXRjaChlcnIgPT4ge1xuXHRcdFx0ZWwuc2F2aW5nID0gZmFsc2U7XG5cdFx0XHRlbC5lcnJvciA9IHRydWU7XG5cdFx0XHRkaHhFcnJvcihlcnIpO1xuXHRcdH0pO1xuXHRcdGVsLnNhdmluZyA9IHRydWU7XG5cdFx0dGhpcy5fc2F2aW5nID0gdHJ1ZTtcblx0XHR0aGlzLl9hZGRUb0NoYWluKGVsLnByb21pc2UpO1xuXHRcdHJldHVybiBlbC5wcm9taXNlO1xuXHR9XG5cdHByaXZhdGUgX2FkZFRvQ2hhaW4ocHJvbWlzZSk6IHZvaWQge1xuXHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpwcmVmZXItY29uZGl0aW9uYWwtZXhwcmVzc2lvblxuXHRcdGlmICh0aGlzLl9wYXJlbnQuc2F2ZURhdGEgJiYgdGhpcy5fc2F2aW5nKSB7XG5cdFx0XHR0aGlzLl9wYXJlbnQuc2F2ZURhdGEgPSB0aGlzLl9wYXJlbnQuc2F2ZURhdGEudGhlbigoKSA9PiBwcm9taXNlKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fcGFyZW50LnNhdmVEYXRhID0gcHJvbWlzZTtcblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfZmluZFByZXZTdGF0ZShpZDogSWQpOiBhbnkge1xuXHRcdGZvciAoY29uc3QgZWwgb2YgdGhpcy5fY2hhbmdlcy5vcmRlcikge1xuXHRcdFx0aWYgKGVsLmlkID09PSBpZCkge1xuXHRcdFx0XHRyZXR1cm4gZWw7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdHByaXZhdGUgX3JlbW92ZUZyb21PcmRlcihlbCkge1xuXHRcdHRoaXMuX2NoYW5nZXMub3JkZXIgPSB0aGlzLl9jaGFuZ2VzLm9yZGVyLmZpbHRlcihpdGVtID0+ICFpc0VxdWFsT2JqKGl0ZW0sIGVsKSk7XG5cdH1cbn0iLCJpbXBvcnQgeyBuYXR1cmFsQ29tcGFyZSB9IGZyb20gXCIuLy4uL2hlbHBlcnNcIjtcbmltcG9ydCB7IElEaXIsIElTb3J0TW9kZSB9IGZyb20gXCIuLy4uL3R5cGVzXCI7XG5cbnR5cGUgQ2hhbmdlU3RyaW5nID0gKGE6IHN0cmluZykgPT4gc3RyaW5nIHwgbnVtYmVyO1xuXG5leHBvcnQgY2xhc3MgU29ydCB7XG5cdHNvcnQoYXJyYXk6IGFueVtdLCBieTogSVNvcnRNb2RlKSB7XG5cdFx0aWYgKGJ5LnJ1bGUgJiYgdHlwZW9mIGJ5LnJ1bGUgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dGhpcy5fc29ydChhcnJheSwgYnkpO1xuXHRcdH0gZWxzZSBpZiAoYnkuYnkpIHtcblx0XHRcdGJ5LnJ1bGUgPSAoYTogYW55LCBiOiBhbnkpID0+IHtcblx0XHRcdFx0Y29uc3QgYWEgPSB0aGlzLl9jaGVja1ZhbChieS5hcywgYVtieS5ieV0pO1xuXHRcdFx0XHRjb25zdCBiYiA9IHRoaXMuX2NoZWNrVmFsKGJ5LmFzLCBiW2J5LmJ5XSk7XG5cdFx0XHRcdHJldHVybiBuYXR1cmFsQ29tcGFyZShhYS50b1N0cmluZygpLCBiYi50b1N0cmluZygpKTsgIC8vIGRpZG50IHdvcmsgd2l0aCBudW1iZXJzXG5cdFx0XHR9O1xuXHRcdFx0dGhpcy5fc29ydChhcnJheSwgYnkpO1xuXHRcdH1cblxuXHR9XG5cdHByaXZhdGUgX2NoZWNrVmFsKG1ldGhvZDogQ2hhbmdlU3RyaW5nLCB2YWw6IHN0cmluZyB8IG51bWJlcikge1xuXHRcdHJldHVybiBtZXRob2QgPyBtZXRob2QuY2FsbCh0aGlzLCB2YWwpIDogdmFsO1xuXHR9XG5cdHByaXZhdGUgX3NvcnQoYXJyOiBhbnlbXSwgY29uZjogSVNvcnRNb2RlKTogYW55W10ge1xuXHRcdGNvbnN0IGRpcjogSURpciA9IHtcblx0XHRcdGFzYzogMSxcblx0XHRcdGRlc2M6IC0xXG5cdFx0fTtcblx0XHRyZXR1cm4gYXJyLnNvcnQoKGE6IGFueSwgYjogYW55KSA9PiB7XG5cdFx0XHRyZXR1cm4gY29uZi5ydWxlLmNhbGwodGhpcywgYSwgYikgKiAoZGlyW2NvbmYuZGlyXSB8fCBkaXIuYXNjKTtcblx0XHR9KTtcblx0fVxufSIsImltcG9ydCB7IElEYXRhUHJveHkgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgRGF0YVByb3h5IGltcGxlbWVudHMgSURhdGFQcm94eSB7XG5cdHB1YmxpYyB1cmw6IHN0cmluZztcblx0Y29uc3RydWN0b3IodXJsOiBzdHJpbmcpIHtcblx0XHR0aGlzLnVybCA9IHVybDtcblx0fVxuXHRsb2FkPFQ9c3RyaW5nPigpOiBQcm9taXNlPFQ+IHtcblx0XHRyZXR1cm4gdGhpcy5fYWpheCh0aGlzLnVybCk7XG5cdH1cblx0c2F2ZShkYXRhOiBhbnksIG1vZGU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XG5cdFx0Y29uc3QgbW9kZXMgPSB7XG5cdFx0XHRpbnNlcnQ6IFwiUE9TVFwiLFxuXHRcdFx0ZGVsZXRlOiBcIkRFTEVURVwiLFxuXHRcdFx0dXBkYXRlOiBcIlBPU1RcIlxuXHRcdH0gYXMgYW55O1xuXHRcdHJldHVybiB0aGlzLl9hamF4KHRoaXMudXJsLCBkYXRhLCBtb2Rlc1ttb2RlXSB8fCBcIlBPU1RcIik7XG5cdH1cblx0cHJpdmF0ZSBfYWpheCh1cmw6IHN0cmluZywgZGF0YT86IGFueSwgbWV0aG9kOiBzdHJpbmcgPSBcIkdFVFwiKTogUHJvbWlzZTxhbnk+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0Y29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cblx0XHRcdHhoci5vbmxvYWQgPSAoKSA9PiB7XG5cdFx0XHRcdGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XG5cdFx0XHRcdFx0cmVzb2x2ZSh4aHIucmVzcG9uc2UgfHwgeGhyLnJlc3BvbnNlVGV4dCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cmVqZWN0KHtcblx0XHRcdFx0XHRcdHN0YXR1czogeGhyLnN0YXR1cyxcblx0XHRcdFx0XHRcdHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHR4aHIub25lcnJvciA9ICgpID0+IHtcblx0XHRcdFx0cmVqZWN0KHtcblx0XHRcdFx0XHRzdGF0dXM6IHhoci5zdGF0dXMsXG5cdFx0XHRcdFx0c3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHRcblx0XHRcdFx0fSk7XG5cdFx0XHR9O1xuXHRcdFx0eGhyLm9wZW4obWV0aG9kLCB1cmwpO1xuXHRcdFx0eGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuXHRcdFx0c3dpdGNoIChtZXRob2QpIHtcblx0XHRcdFx0Y2FzZSBcIlBPU1RcIjpcblx0XHRcdFx0Y2FzZSBcIkRFTEVURVwiOlxuXHRcdFx0XHRjYXNlIFwiUFVUXCI6XG5cdFx0XHRcdFx0eGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiR0VUXCI6XG5cdFx0XHRcdFx0eGhyLnNlbmQoKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR4aHIuc2VuZCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59IiwiaW1wb3J0IHsgSURhdGFEcml2ZXIgfSBmcm9tIFwiLi8uLi90eXBlc1wiO1xuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuZXhwb3J0IGludGVyZmFjZSBJQ3N2RHJpdmVyQ29uZmlnIHtcblx0c2tpcEhlYWRlcj86IG51bWJlcjtcblx0bmFtZUJ5SGVhZGVyPzogYm9vbGVhbjtcblx0bmFtZXM/OiBzdHJpbmdbXTtcblx0cm93Pzogc3RyaW5nO1xuXHRjb2x1bW4/OiBzdHJpbmc7XG59XG5leHBvcnQgaW50ZXJmYWNlIElDc3ZEcml2ZXIgZXh0ZW5kcyBJRGF0YURyaXZlciB7XG5cdGdldEZpZWxkcyhkYXRhOiBzdHJpbmcsIGhlYWRlcnM/OiBzdHJpbmdbXSk7XG59XG5leHBvcnQgY2xhc3MgQ3N2RHJpdmVyIGltcGxlbWVudHMgSUNzdkRyaXZlciB7XG5cdHB1YmxpYyBjb25maWc6IElDc3ZEcml2ZXJDb25maWc7XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBJQ3N2RHJpdmVyQ29uZmlnID0ge30pIHtcblxuXHRcdGNvbnN0IGluaXRDb25maWcgPSB7XG5cdFx0XHRza2lwSGVhZGVyOiAwLFxuXHRcdFx0bmFtZUJ5SGVhZGVyOiBmYWxzZSxcblx0XHRcdHJvdzogXCJcXG5cIixcblx0XHRcdGNvbHVtbjogXCIsXCIsXG5cdFx0fTtcblxuXHRcdHRoaXMuY29uZmlnID0geyAuLi5pbml0Q29uZmlnLCAuLi5jb25maWcgfTtcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5uYW1lQnlIZWFkZXIpIHtcblx0XHRcdHRoaXMuY29uZmlnLnNraXBIZWFkZXIgPSAxO1xuXHRcdH1cblx0fVxuXG5cdGdldEZpZWxkcyhyb3c6IHN0cmluZywgaGVhZGVycz86IHN0cmluZ1tdKTogeyBba2V5OiBzdHJpbmddOiBhbnkgfSB7XG5cdFx0Y29uc3QgcGFydHMgPSByb3cudHJpbSgpLnNwbGl0KHRoaXMuY29uZmlnLmNvbHVtbik7XG5cblx0XHRjb25zdCBvYmogPSB7fTtcblx0XHRmb3IgKGxldCBpID0gMDtpIDwgcGFydHMubGVuZ3RoO2krKykge1xuXHRcdFx0b2JqW2hlYWRlcnMgPyBoZWFkZXJzW2ldIDogaSArIDFdID0gcGFydHNbaV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXHRnZXRSb3dzKGRhdGE6IHN0cmluZyk6IHN0cmluZ1tdIHtcblx0XHRyZXR1cm4gZGF0YS50cmltKCkuc3BsaXQodGhpcy5jb25maWcucm93KTtcblx0fVxuXHR0b0pzb25BcnJheShkYXRhOiBzdHJpbmcpOiBhbnlbXSB7XG5cdFx0Y29uc3Qgcm93cyA9IHRoaXMuZ2V0Um93cyhkYXRhKTtcblx0XHRsZXQgbmFtZXMgPSB0aGlzLmNvbmZpZy5uYW1lcztcblxuXHRcdGlmICh0aGlzLmNvbmZpZy5za2lwSGVhZGVyKSB7XG5cdFx0XHRjb25zdCB0b3AgPSByb3dzLnNwbGljZSgwLCB0aGlzLmNvbmZpZy5za2lwSGVhZGVyKTtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5uYW1lQnlIZWFkZXIpIHtcblx0XHRcdFx0bmFtZXMgPSB0b3BbMF0udHJpbSgpLnNwbGl0KHRoaXMuY29uZmlnLmNvbHVtbik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByb3dzLm1hcChyb3cgPT4gdGhpcy5nZXRGaWVsZHMocm93LCBuYW1lcykpO1xuXHR9XG5cdHNlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pOiBzdHJpbmcge1xuXHRcdGNvbnN0IGhlYWRlciA9IGRhdGFbMF0gPyBPYmplY3Qua2V5cyhkYXRhWzBdKS5maWx0ZXIoa2V5ID0+IGtleVswXSAhPT0gXCIkXCIpLmpvaW4oXCIsXCIpIDogXCJcIjtcblx0XHRyZXR1cm4gaGVhZGVyICsgdGhpcy5fc2VyaWFsaXplKGRhdGEpO1xuXHR9XG5cdHByaXZhdGUgX3NlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pOiBzdHJpbmcge1xuXHRcdHJldHVybiBkYXRhLnJlZHVjZSgoY3N2LCByb3cpID0+IHtcblx0XHRcdGNvbnN0IGNlbGxzID0gT2JqZWN0LmtleXMocm93KS5yZWR1Y2UoKHRvdGFsLCBrZXksIGkpID0+IHtcblx0XHRcdFx0aWYgKGtleVswXSA9PT0gXCIkXCIgfHwga2V5ID09PSBcIml0ZW1zXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gdG90YWw7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGAke3RvdGFsfSR7cm93W2tleV19JHtpID09PSByb3cubGVuZ3RoIC0gMSA/IFwiXCIgOiBcIixcIn1gO1xuXHRcdFx0fSwgXCJcIik7XG5cdFx0XHRpZiAocm93Lml0ZW1zKSB7XG5cdFx0XHRcdHJldHVybiBgJHtjc3Z9XFxuJHtjZWxsc30ke3RoaXMuX3NlcmlhbGl6ZShyb3cuaXRlbXMpfWA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYCR7Y3N2fVxcbiR7Y2VsbHN9YDtcblx0XHR9LCBcIlwiKTtcblx0fVxufSIsImltcG9ydCB7IElEYXRhRHJpdmVyIH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBKc29uRHJpdmVyIGltcGxlbWVudHMgSURhdGFEcml2ZXIge1xuXHR0b0pzb25BcnJheShkYXRhOiBhbnkpIHtcblx0XHRyZXR1cm4gdGhpcy5nZXRSb3dzKGRhdGEpO1xuXHR9XG5cdHNlcmlhbGl6ZShkYXRhOiBJQW55T2JqW10pOiBJQW55T2JqW10ge1xuXHRcdHJldHVybiBkYXRhO1xuXHR9XG5cdGdldEZpZWxkcyhyb3c6IGFueSk6IHsgW2tleTogc3RyaW5nXTogYW55IH0ge1xuXHRcdHJldHVybiByb3c7XG5cdH1cblx0Z2V0Um93cyhkYXRhOiBzdHJpbmcpOiBhbnlbXSB7XG5cdFx0cmV0dXJuIHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiID8gSlNPTi5wYXJzZShkYXRhKSA6IGRhdGE7XG5cdH1cbn0iLCJpbXBvcnQgeyBJRGF0YURyaXZlciB9IGZyb20gXCIuLi90eXBlc1wiO1xuaW1wb3J0IHsgSUFueU9iaiB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsganNvblRvWE1MIH0gZnJvbSBcIi4vLi4vc2VyaWFsaXplcnMveG1sXCI7XG5cbmNvbnN0IEFSUkFZX05BTUUgPSBcIml0ZW1zXCI7XG5jb25zdCBJVEVNX05BTUUgPSBcIml0ZW1cIjtcblxuZXhwb3J0IGNsYXNzIFhNTERyaXZlciBpbXBsZW1lbnRzIElEYXRhRHJpdmVyIHtcblx0dG9Kc29uQXJyYXkoZGF0YTogYW55KSB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0Um93cyhkYXRhKTtcblx0fVxuXHRzZXJpYWxpemUoZGF0YTogSUFueU9ialtdKSB7XG5cdFx0cmV0dXJuIGpzb25Ub1hNTChkYXRhKTtcblx0fVxuXHRnZXRGaWVsZHMocm93OiBhbnkpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcblx0XHRyZXR1cm4gcm93O1xuXHR9XG5cdGdldFJvd3MoZGF0YTogRG9jdW1lbnQgfCBzdHJpbmcpOiBhbnlbXSB7XG5cdFx0aWYgKHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRkYXRhID0gdGhpcy5fZnJvbVN0cmluZyhkYXRhKTtcblx0XHR9XG5cdFx0Y29uc3QgY2hpbGROb2RlcyA9IGRhdGEuY2hpbGROb2RlcyAmJiBkYXRhLmNoaWxkTm9kZXNbMF0gJiYgZGF0YS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXM7XG5cdFx0aWYgKCFjaGlsZE5vZGVzIHx8ICFjaGlsZE5vZGVzLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9nZXRSb3dzKGNoaWxkTm9kZXMpO1xuXHR9XG5cblx0cHJpdmF0ZSBfZ2V0Um93cyhub2RlczogTm9kZUxpc3RPZjxDaGlsZE5vZGU+KTogYW55W10ge1xuXHRcdGNvbnN0IHJlc3VsdCA9IFtdO1xuXHRcdGZvciAobGV0IGkgPSAwO2kgPCBub2Rlcy5sZW5ndGg7aSsrKSB7XG5cdFx0XHRpZiAoKG5vZGVzW2ldIGFzIEhUTUxFbGVtZW50KS50YWdOYW1lID09PSBJVEVNX05BTUUpIHtcblx0XHRcdFx0cmVzdWx0LnB1c2godGhpcy5fbm9kZVRvSlMobm9kZXNbaV0gYXMgSFRNTEVsZW1lbnQpKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRwcml2YXRlIF9mcm9tU3RyaW5nKGRhdGE6IHN0cmluZyk6IERvY3VtZW50IHtcblx0XHRyZXR1cm4gKG5ldyBET01QYXJzZXIoKSkucGFyc2VGcm9tU3RyaW5nKGRhdGEsIFwidGV4dC94bWxcIik7XG5cdH1cblxuXHRwcml2YXRlIF9ub2RlVG9KUyhub2RlOiBIVE1MRWxlbWVudCkge1xuXHRcdGNvbnN0IHJlc3VsdDogSUFueU9iaiA9IHt9O1xuXG5cdFx0aWYgKHRoaXMuX2hhdmVBdHRycyhub2RlKSkge1xuXHRcdFx0Y29uc3QgYXR0cnMgPSBub2RlLmF0dHJpYnV0ZXM7XG5cdFx0XHRmb3IgKGxldCBpID0gMDtpIDwgYXR0cnMubGVuZ3RoO2krKykge1xuXHRcdFx0XHRjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSBhdHRyc1tpXTtcblx0XHRcdFx0cmVzdWx0W25hbWVdID0gdGhpcy5fdG9UeXBlKHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKG5vZGUubm9kZVR5cGUgPT09IDMpIHtcblx0XHRcdHJlc3VsdC52YWx1ZSA9IHJlc3VsdC52YWx1ZSB8fCB0aGlzLl90b1R5cGUobm9kZS50ZXh0Q29udGVudCk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH1cblxuXHRcdGNvbnN0IGNoaWxkTm9kZXMgPSBub2RlLmNoaWxkTm9kZXM7XG5cdFx0aWYgKGNoaWxkTm9kZXMpIHtcblx0XHRcdGZvciAobGV0IGkgPSAwO2kgPCBjaGlsZE5vZGVzLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0Y29uc3Qgc3ViTm9kZSA9IGNoaWxkTm9kZXNbaV0gYXMgSFRNTEVsZW1lbnQ7XG5cdFx0XHRcdGNvbnN0IHRhZyA9IHN1Yk5vZGUudGFnTmFtZTtcblx0XHRcdFx0aWYgKCF0YWcpIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAodGFnID09PSBBUlJBWV9OQU1FICYmIHN1Yk5vZGUuY2hpbGROb2Rlcykge1xuXHRcdFx0XHRcdHJlc3VsdFt0YWddID0gdGhpcy5fZ2V0Um93cyhzdWJOb2RlLmNoaWxkTm9kZXMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGlmICh0aGlzLl9oYXZlQXR0cnMoc3ViTm9kZSkpIHtcblx0XHRcdFx0XHRcdHJlc3VsdFt0YWddID0gdGhpcy5fbm9kZVRvSlMoc3ViTm9kZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJlc3VsdFt0YWddID0gdGhpcy5fdG9UeXBlKHN1Yk5vZGUudGV4dENvbnRlbnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cblx0cHJpdmF0ZSBfdG9UeXBlKHZhbDogYW55KSB7XG5cdFx0aWYgKHZhbCA9PT0gXCJmYWxzZVwiIHx8IHZhbCA9PT0gXCJ0cnVlXCIpIHtcblx0XHRcdHJldHVybiB2YWwgPT09IFwidHJ1ZVwiO1xuXHRcdH1cblx0XHRpZiAoIWlzTmFOKHZhbCkpIHtcblx0XHRcdHJldHVybiBOdW1iZXIodmFsKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cdHByaXZhdGUgX2hhdmVBdHRycyhub2RlOiBIVE1MRWxlbWVudCkge1xuXHRcdHJldHVybiBub2RlLmF0dHJpYnV0ZXMgJiYgbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aDtcblx0fVxufSIsImltcG9ydCB7IEpzb25Ecml2ZXIgfSBmcm9tIFwiLi9Kc29uRHJpdmVyXCI7XHJcbmltcG9ydCB7IENzdkRyaXZlciB9IGZyb20gXCIuL0NzdkRyaXZlclwiO1xyXG5pbXBvcnQgeyBYTUxEcml2ZXIgfSBmcm9tIFwiLi9YTUxEcml2ZXJcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYXRhRHJpdmVycyA9IHtcclxuXHRqc29uOiBKc29uRHJpdmVyLFxyXG5cdGNzdjogQ3N2RHJpdmVyXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZGF0YURyaXZlcnNQcm8gPSB7XHJcblx0Li4uZGF0YURyaXZlcnMsXHJcblx0eG1sOiBYTUxEcml2ZXJcclxufTsiLCJpbXBvcnQgeyBEYXRhUHJveHkgfSBmcm9tIFwiLi9kYXRhcHJveHlcIjtcbmltcG9ydCB7IElGaWx0ZXJDYWxsYmFjaywgSUZpbHRlck1vZGUsIElEYXRhQ29sbGVjdGlvbiwgSVRyZWVDb2xsZWN0aW9uLCBEYXRhRHJpdmVyLCBJRGF0YURyaXZlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IGRhdGFEcml2ZXJzIH0gZnJvbSBcIi4vZHJpdmVycy9kcml2ZXJzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0VxdWFsT2JqKGE6IGFueSwgYjogYW55KSB7XG5cdGZvciAoY29uc3Qga2V5IGluIGEpIHtcblx0XHRpZiAoYVtrZXldICE9PSBiW2tleV0pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWU7XG59XG5leHBvcnQgZnVuY3Rpb24gbmF0dXJhbENvbXBhcmUoYSwgYikge1xuXHRjb25zdCBheCA9IFtdO1xuXHRjb25zdCBieCA9IFtdO1xuXG5cdGEucmVwbGFjZSgvKFxcZCspfChcXEQrKS9nLCAoXywgJDEsICQyKSA9PiB7IGF4LnB1c2goWyQxIHx8IEluZmluaXR5LCAkMiB8fCBcIlwiXSk7IH0pO1xuXHRiLnJlcGxhY2UoLyhcXGQrKXwoXFxEKykvZywgKF8sICQxLCAkMikgPT4geyBieC5wdXNoKFskMSB8fCBJbmZpbml0eSwgJDIgfHwgXCJcIl0pOyB9KTtcblxuXHR3aGlsZSAoYXgubGVuZ3RoICYmIGJ4Lmxlbmd0aCkge1xuXHRcdGNvbnN0IGFuID0gYXguc2hpZnQoKTtcblx0XHRjb25zdCBibiA9IGJ4LnNoaWZ0KCk7XG5cdFx0Y29uc3Qgbm4gPSAoYW5bMF0gLSBiblswXSkgfHwgYW5bMV0ubG9jYWxlQ29tcGFyZShiblsxXSk7XG5cdFx0aWYgKG5uKSB7XG5cdFx0XHRyZXR1cm4gbm47XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGF4Lmxlbmd0aCAtIGJ4Lmxlbmd0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeUNvbmYoaXRlbTogYW55LCBjb25mOiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjayk6IGFueSB7XG5cdGlmICh0eXBlb2YgY29uZiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0aWYgKGNvbmYuY2FsbCh0aGlzLCBpdGVtKSkge1xuXHRcdFx0cmV0dXJuIGl0ZW07XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGNvbmYuYnkgJiYgY29uZi5tYXRjaCkge1xuXHRcdGlmIChpdGVtW2NvbmYuYnldID09PSBjb25mLm1hdGNoKSB7XG5cdFx0XHRyZXR1cm4gaXRlbTtcblx0XHR9XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGVidWcoKTogYm9vbGVhbiB7XG5cdGNvbnN0IGRoeCA9ICh3aW5kb3cgYXMgYW55KS5kaHg7XG5cdGlmICh0eXBlb2YgZGh4ICE9PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0cmV0dXJuIHR5cGVvZiAoZGh4LmRlYnVnKSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkaHguZGVidWc7XG5cdH1cblx0Ly8gcmV0dXJuIHR5cGVvZiBESFhfREVCVUdfTU9ERSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBESFhfREVCVUdfTU9ERTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaHhXYXJuaW5nKG1zZzogc3RyaW5nKSB7XG5cdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zb2xlXG5cdGNvbnNvbGUud2Fybihtc2cpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRoeEVycm9yKG1zZzogc3RyaW5nKSB7XG5cdHRocm93IG5ldyBFcnJvcihtc2cpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Qcm94eShwcm94eTogYW55KTogRGF0YVByb3h5IHtcblx0Y29uc3QgdHlwZSA9IHR5cGVvZiBwcm94eTtcblxuXHRpZiAodHlwZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBuZXcgRGF0YVByb3h5KHByb3h5KTtcblx0fSBlbHNlIGlmICh0eXBlID09PSBcIm9iamVjdFwiKSB7XG5cdFx0cmV0dXJuIHByb3h5O1xuXHR9XG59XG5leHBvcnQgZnVuY3Rpb24gdG9EYXRhRHJpdmVyKGRyaXZlcjogRGF0YURyaXZlciB8IElEYXRhRHJpdmVyKSB7XG5cdGlmICh0eXBlb2YgZHJpdmVyID09PSBcInN0cmluZ1wiKSB7XG5cdFx0Y29uc3QgZGh4ID0gKHdpbmRvdyBhcyBhbnkpLmRoeDtcblx0XHRjb25zdCBkcml2ZXJzID0gZGh4LmRhdGFEcml2ZXJzIHx8IGRhdGFEcml2ZXJzO1xuXG5cdFx0aWYgKGRyaXZlcnNbZHJpdmVyXSkge1xuXHRcdFx0cmV0dXJuIG5ldyBkcml2ZXJzW2RyaXZlcl0oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcblx0XHRcdGNvbnNvbGUud2FybihcIkluY29ycmVjdCBkYXRhIGRyaXZlciB0eXBlOlwiLCBkcml2ZXIpO1xuXHRcdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWNvbnNvbGVcblx0XHRcdGNvbnNvbGUud2FybihcIkF2YWlsYWJsZSB0eXBlczpcIiwgSlNPTi5zdHJpbmdpZnkoT2JqZWN0LmtleXMoZHJpdmVycykpKTtcblx0XHR9XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRyaXZlciA9PT0gXCJvYmplY3RcIikge1xuXHRcdHJldHVybiBkcml2ZXI7XG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlXaXRob3V0SW5uZXIob2JqOiBJQW55T2JqLCBmb3JiaWRkZW4/OiBJQW55T2JqKTogSUFueU9iaiB7XG5cdGNvbnN0IHJlc3VsdCA9IHt9O1xuXHRmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcblx0XHRpZiAoa2V5WzBdICE9PSBcIiRcIiAmJiAoIWZvcmJpZGRlbiB8fCAhZm9yYmlkZGVuW2tleV0pKSB7XG5cdFx0XHRyZXN1bHRba2V5XSA9IG9ialtrZXldO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNUcmVlQ29sbGVjdGlvbihvYmo6IElEYXRhQ29sbGVjdGlvbjxhbnk+IHwgSVRyZWVDb2xsZWN0aW9uPGFueT4pOiBvYmogaXMgSVRyZWVDb2xsZWN0aW9uPGFueT4ge1xuXHRyZXR1cm4gQm9vbGVhbigob2JqIGFzIElUcmVlQ29sbGVjdGlvbikuZ2V0Um9vdCk7XG59IiwiaW1wb3J0IHsgRXZlbnRTeXN0ZW0sIElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IFNlbGVjdGlvbkV2ZW50cyB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi90eXBlc1wiO1xuaW1wb3J0IHsgRGF0YUNvbGxlY3Rpb24gfSBmcm9tIFwiLi9kYXRhY29sbGVjdGlvblwiO1xuaW1wb3J0IHsgRGF0YUV2ZW50cyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb257XG5cdHB1YmxpYyBldmVudHMgOiBJRXZlbnRTeXN0ZW08U2VsZWN0aW9uRXZlbnRzPjtcblxuXHRwcml2YXRlIF9zZWxlY3RlZCA6IHN0cmluZztcblx0cHJpdmF0ZSBfZGF0YTpEYXRhQ29sbGVjdGlvbjtcblxuXHRjb25zdHJ1Y3RvcihfY29uZmlnOmFueSwgZGF0YT86RGF0YUNvbGxlY3Rpb24sIGV2ZW50cz86SUV2ZW50U3lzdGVtPGFueT4pe1xuXHRcdHRoaXMuZXZlbnRzID0gZXZlbnRzIHx8IChuZXcgRXZlbnRTeXN0ZW08YW55Pih0aGlzKSk7XG5cdFx0dGhpcy5fZGF0YSA9IGRhdGE7XG5cblx0XHR0aGlzLl9kYXRhLmV2ZW50cy5vbihEYXRhRXZlbnRzLnJlbW92ZUFsbCwgKCkgPT4ge1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWQgPSBudWxsO1xuXHRcdH0pO1xuXHRcdHRoaXMuX2RhdGEuZXZlbnRzLm9uKERhdGFFdmVudHMuY2hhbmdlLCAoKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc2VsZWN0ZWQpe1xuXHRcdFx0XHRjb25zdCBuZWFyID0gdGhpcy5fZGF0YS5nZXROZWFySWQodGhpcy5fc2VsZWN0ZWQpO1xuXHRcdFx0XHRpZiAobmVhciAhPT0gdGhpcy5fc2VsZWN0ZWQpe1xuXHRcdFx0XHRcdHRoaXMuX3NlbGVjdGVkID0gbnVsbDtcblx0XHRcdFx0XHRpZiAobmVhcil7XG5cdFx0XHRcdFx0XHR0aGlzLmFkZChuZWFyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGdldElkKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuXHR9XG5cblx0Z2V0SXRlbSgpOmFueSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkKXtcblx0XHRcdHJldHVybiB0aGlzLl9kYXRhLmdldEl0ZW0odGhpcy5fc2VsZWN0ZWQpO1xuXHRcdH1cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJlbW92ZShpZD86IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGlkID0gaWQgfHwgdGhpcy5fc2VsZWN0ZWQ7XG5cdFx0aWYgKCFpZCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVVuU2VsZWN0LCBbaWRdKSkge1xuXHRcdFx0dGhpcy5fZGF0YS51cGRhdGUoaWQsIHsgJHNlbGVjdGVkOiBmYWxzZSB9KTtcblx0XHRcdHRoaXMuX3NlbGVjdGVkID0gbnVsbDtcblx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmFmdGVyVW5TZWxlY3QsIFtpZF0pO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGFkZChpZDogc3RyaW5nKSB7XG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkID09PSBpZCkgeyByZXR1cm47IH1cblx0XHR0aGlzLnJlbW92ZSgpO1xuXG5cdFx0aWYgKHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVNlbGVjdCwgW2lkXSkpIHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkID0gaWQ7XG5cdFx0XHR0aGlzLl9kYXRhLnVwZGF0ZShpZCwgeyAkc2VsZWN0ZWQ6IHRydWUgfSk7XG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKFNlbGVjdGlvbkV2ZW50cy5hZnRlclNlbGVjdCwgW2lkXSk7XG5cdFx0fVxuXHR9XG59XG5cbiIsImltcG9ydCB7IElBbnlPYmogfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcblxuY29uc3QgSU5ERU5UX1NURVAgPSA0O1xuXG5leHBvcnQgZnVuY3Rpb24ganNvblRvWE1MKGRhdGE6IElBbnlPYmpbXSwgcm9vdCA9IFwicm9vdFwiKTogc3RyaW5nIHtcblx0bGV0IHJlc3VsdCA9IGA8P3htbCB2ZXJzaW9uPVwiMS4wXCIgZW5jb2Rpbmc9XCJpc28tODg1OS0xXCI/Plxcbjwke3Jvb3R9PmA7XG5cdGZvciAobGV0IGk9MDsgaTxkYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0cmVzdWx0ICs9IFwiXFxuXCIgKyBpdGVtVG9YTUwoZGF0YVtpXSk7XG5cdH1cblx0cmV0dXJuIHJlc3VsdCArIGBcXG48LyR7cm9vdH0+YDtcbn1cblxuZnVuY3Rpb24gd3MoY291bnQ6IG51bWJlcikge1xuXHRyZXR1cm4gXCIgXCIucmVwZWF0KGNvdW50KTtcbn1cbmZ1bmN0aW9uIGl0ZW1Ub1hNTChpdGVtOiBJQW55T2JqLCBpbmRlbnQ6IG51bWJlciA9IElOREVOVF9TVEVQKSB7XG5cdGxldCByZXN1bHQgPSB3cyhpbmRlbnQpICsgXCI8aXRlbT5cXG5cIjtcblx0Zm9yIChjb25zdCBrZXkgaW4gaXRlbSkge1xuXHRcdGlmIChBcnJheS5pc0FycmF5KGl0ZW1ba2V5XSkpIHtcblx0XHRcdHJlc3VsdCArPSB3cyhpbmRlbnQgKyBJTkRFTlRfU1RFUCkgKyBgPCR7a2V5fT5cXG5gO1xuXHRcdFx0cmVzdWx0ICs9IGl0ZW1ba2V5XS5tYXAoKHN1Ykl0ZW06IElBbnlPYmopID0+IGl0ZW1Ub1hNTChzdWJJdGVtLCBpbmRlbnQgKyBJTkRFTlRfU1RFUCAqIDIpKS5qb2luKFwiXFxuXCIpICsgXCJcXG5cIjtcblx0XHRcdHJlc3VsdCArPSB3cyhpbmRlbnQgKyBJTkRFTlRfU1RFUCkgKyBgPC8ke2tleX0+XFxuYDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVzdWx0ICs9IHdzKGluZGVudCArIElOREVOVF9TVEVQKSArIGA8JHtrZXl9PiR7aXRlbVtrZXldfTwvJHtrZXl9PlxcbmA7XG5cdFx0fVxuXHR9XG5cdHJlc3VsdCArPSB3cyhpbmRlbnQpICsgXCI8L2l0ZW0+XCI7XG5cdHJldHVybiByZXN1bHQ7XG59XG4iLCJpbXBvcnQgeyBmaW5kSW5kZXgsIHVpZCB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9jb3JlXCI7XG5pbXBvcnQgeyBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiB9IGZyb20gXCIuL2RhdGFjb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBEYXRhUHJveHkgfSBmcm9tIFwiLi9kYXRhcHJveHlcIjtcbmltcG9ydCB7IHRvRGF0YURyaXZlciwgaXNUcmVlQ29sbGVjdGlvbiwgY29weVdpdGhvdXRJbm5lciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB7IERhdGFDYWxsYmFjaywgRGF0YUV2ZW50cywgSWQsIElEYXRhQ29sbGVjdGlvbiwgSURhdGFJdGVtLCBJVHJlZUNvbGxlY3Rpb24sIFRyZWVGaWx0ZXJUeXBlLCBJRmlsdGVyQ2FsbGJhY2ssIElGaWx0ZXJNb2RlLCBJVHJlZUZpbHRlckNvbmZpZywgRGF0YURyaXZlciB9IGZyb20gXCIuL3R5cGVzXCI7XG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5cbmZ1bmN0aW9uIGFkZFRvT3JkZXIoc3RvcmU6IGFueSwgb2JqOiBvYmplY3QsIHBhcmVudDogSWQsIGluZGV4OiBudW1iZXIpIHtcblx0aWYgKGluZGV4ICE9PSB1bmRlZmluZWQgJiYgaW5kZXggIT09IC0xICYmIHN0b3JlW3BhcmVudF0gJiYgc3RvcmVbcGFyZW50XVtpbmRleF0pIHtcblx0XHRzdG9yZVtwYXJlbnRdLnNwbGljZShpbmRleCwgMCwgb2JqKTtcblx0fSBlbHNlIHtcblx0XHRpZiAoIXN0b3JlW3BhcmVudF0pIHtcblx0XHRcdHN0b3JlW3BhcmVudF0gPSBbXTtcblx0XHR9XG5cdFx0c3RvcmVbcGFyZW50XS5wdXNoKG9iaik7XG5cdH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVHJlZUNvbGxlY3Rpb248VCBleHRlbmRzIElEYXRhSXRlbSA9IElEYXRhSXRlbT4gZXh0ZW5kcyBEYXRhQ29sbGVjdGlvbjxUPiBpbXBsZW1lbnRzIElUcmVlQ29sbGVjdGlvbjxUPiB7XG5cblx0cHJvdGVjdGVkIF9jaGlsZHM6IHsgW2lkOiBzdHJpbmddOiBUW10gfTtcblx0cHJvdGVjdGVkIF9yb290OiBJZDtcblxuXHRwcml2YXRlIF9pbml0Q2hpbGRzOiB7IFtpZDogc3RyaW5nXTogVFtdIH07XG5cblx0Y29uc3RydWN0b3IoY29uZmlnPzogYW55LCBldmVudHM/OiBJRXZlbnRTeXN0ZW08RGF0YUV2ZW50cz4pIHtcblx0XHRzdXBlcihjb25maWcsIGV2ZW50cyk7XG5cdFx0Y29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3QgPSBcIl9ST09UX1wiICsgdWlkKCk7XG5cdFx0dGhpcy5fY2hpbGRzID0geyBbcm9vdF06IFtdIH07XG5cdFx0dGhpcy5faW5pdENoaWxkcyA9IG51bGw7XG5cdH1cblx0YWRkKG9iajogYW55LCBpbmRleDogbnVtYmVyID0gLTEsIHBhcmVudDogSWQgPSB0aGlzLl9yb290KTogc3RyaW5nIHtcblx0XHRpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0b2JqID0ge1xuXHRcdFx0XHR2YWx1ZTogb2JqXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRvYmoucGFyZW50ID0gb2JqLnBhcmVudCA/IG9iai5wYXJlbnQudG9TdHJpbmcoKSA6IHBhcmVudDtcblx0XHRjb25zdCBpZCA9IHN1cGVyLmFkZChvYmosIGluZGV4KTtcblxuXHRcdGlmIChBcnJheS5pc0FycmF5KG9iai5pdGVtcykpIHtcblx0XHRcdGZvciAoY29uc3QgaXRlbSBvZiBvYmouaXRlbXMpIHtcblx0XHRcdFx0dGhpcy5hZGQoaXRlbSwgLTEsIG9iai5pZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBpZDtcblx0fVxuXHRnZXRSb290KCk6IElkIHtcblx0XHRyZXR1cm4gdGhpcy5fcm9vdDtcblx0fVxuXHRnZXRQYXJlbnQoaWQ6IElkLCBhc09iajogYm9vbGVhbiA9IGZhbHNlKTogSWQge1xuXHRcdGlmICghdGhpcy5fcHVsbFtpZF0pIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLl9wdWxsW2lkXS5wYXJlbnQ7XG5cdFx0cmV0dXJuIGFzT2JqID8gdGhpcy5fcHVsbFtwYXJlbnRdIDogcGFyZW50O1xuXHR9XG5cdGdldEl0ZW1zKGlkOiBJZCk6IFRbXSB7XG5cdFx0aWYgKHRoaXMuX2NoaWxkcyAmJiB0aGlzLl9jaGlsZHNbaWRdKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY2hpbGRzW2lkXTtcblx0XHR9XG5cdFx0cmV0dXJuIFtdO1xuXHR9XG5cdGdldExlbmd0aChpZDogSWQgPSB0aGlzLl9yb290KTogbnVtYmVyIHtcblx0XHRpZiAoIXRoaXMuX2NoaWxkc1tpZF0pIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fY2hpbGRzW2lkXS5sZW5ndGg7XG5cdH1cblx0cmVtb3ZlQWxsKGlkPzogSWQpOiB2b2lkIHtcblx0XHRpZiAoaWQpIHtcblx0XHRcdGNvbnN0IGNoaWxkcyA9IFsuLi4gdGhpcy5fY2hpbGRzW2lkXV07XG5cdFx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGNoaWxkcykge1xuXHRcdFx0XHR0aGlzLnJlbW92ZShjaGlsZC5pZCk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN1cGVyLnJlbW92ZUFsbCgpO1xuXHRcdFx0Y29uc3Qgcm9vdCA9IHRoaXMuX3Jvb3Q7XG5cdFx0XHR0aGlzLl9pbml0Q2hpbGRzID0gbnVsbDtcblx0XHRcdHRoaXMuX2NoaWxkcyA9IHsgW3Jvb3RdOiBbXSB9O1xuXHRcdH1cblx0fVxuXHRnZXRJbmRleChpZDogSWQpOiBudW1iZXIge1xuXHRcdGNvbnN0IHBhcmVudCA9IHRoaXMuZ2V0UGFyZW50KGlkKTtcblx0XHRpZiAoIXBhcmVudCB8fCAhdGhpcy5fY2hpbGRzW3BhcmVudF0pIHtcblx0XHRcdHJldHVybiAtMTtcblx0XHR9XG5cdFx0cmV0dXJuIGZpbmRJbmRleCh0aGlzLl9jaGlsZHNbcGFyZW50XSwgaXRlbSA9PiBpdGVtLmlkID09PSBpZCk7XG5cdH1cblx0c29ydChjb25mPzogYW55KTogdm9pZCB7XG5cdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5fY2hpbGRzO1xuXHRcdGZvciAoY29uc3Qga2V5IGluIGNoaWxkcykge1xuXHRcdFx0dGhpcy5fc29ydC5zb3J0KGNoaWxkc1trZXldLCBjb25mKTtcblx0XHR9XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0fVxuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPiwgcGFyZW50OiBJZCA9IHRoaXMuX3Jvb3QsIGRpcmVjdDogYm9vbGVhbiA9IHRydWUpOiBhbnlbXSB7XG5cdFx0bGV0IHJlc3VsdDogYW55W10gPSBbXTtcblx0XHRpZiAoIXRoaXMuaGF2ZUl0ZW1zKHBhcmVudCkpIHtcblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fVxuXHRcdGZvciAobGV0IGkgPSAwO2kgPCB0aGlzLl9jaGlsZHNbcGFyZW50XS5sZW5ndGg7aSsrKSB7XG5cdFx0XHRyZXN1bHQucHVzaChjYi5jYWxsKHRoaXMsIHRoaXMuX2NoaWxkc1twYXJlbnRdW2ldLCBpKSk7XG5cdFx0XHRpZiAoZGlyZWN0KSB7XG5cdFx0XHRcdGNvbnN0IGNoaWxkUmVzdWx0ID0gdGhpcy5tYXAoY2IsIHRoaXMuX2NoaWxkc1twYXJlbnRdW2ldLmlkLCBkaXJlY3QpO1xuXHRcdFx0XHRyZXN1bHQgPSByZXN1bHQuY29uY2F0KGNoaWxkUmVzdWx0KTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxuXHRmaWx0ZXIocnVsZT86IElGaWx0ZXJNb2RlIHwgSUZpbHRlckNhbGxiYWNrLCBjb25maWc6IElUcmVlRmlsdGVyQ29uZmlnID0ge30pOiB2b2lkIHtcblx0XHRpZiAoIXJ1bGUpIHtcblx0XHRcdHRoaXMucmVzdG9yZU9yZGVyKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYgKCF0aGlzLl9pbml0Q2hpbGRzKSB7XG5cdFx0XHR0aGlzLl9pbml0Q2hpbGRzID0gdGhpcy5fY2hpbGRzO1xuXHRcdH1cblx0XHRjb25maWcudHlwZSA9IGNvbmZpZy50eXBlIHx8IFRyZWVGaWx0ZXJUeXBlLmxlYWZzO1xuXG5cdFx0Y29uc3QgbmV3Q2hpbGRzID0ge307XG5cdFx0dGhpcy5fcmVjdXJzaXZlRmlsdGVyKHJ1bGUsIGNvbmZpZywgdGhpcy5fcm9vdCwgMCwgbmV3Q2hpbGRzKTtcblx0XHR0aGlzLl9jaGlsZHMgPSBuZXdDaGlsZHM7XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0fVxuXHRyZXN0b3JlT3JkZXIoKTogdm9pZCB7XG5cdFx0aWYgKHRoaXMuX2luaXRDaGlsZHMpIHtcblx0XHRcdHRoaXMuX2NoaWxkcyA9IHRoaXMuX2luaXRDaGlsZHM7XG5cdFx0XHR0aGlzLl9pbml0Q2hpbGRzID0gbnVsbDtcblx0XHR9XG5cblx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFFdmVudHMuY2hhbmdlKTtcblx0fVxuXHRjb3B5KGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0OiBJRGF0YUNvbGxlY3Rpb24gfCBJVHJlZUNvbGxlY3Rpb24gPSB0aGlzLCB0YXJnZXRJZDogSWQgPSB0aGlzLl9yb290KTogSWQge1xuXHRcdGlmICghdGhpcy5leGlzdHMoaWQpKSB7XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cblx0XHRjb25zdCBjdXJyZW50Q2hpbGRzID0gdGhpcy5fY2hpbGRzW2lkXTtcblx0XHRpZiAodGFyZ2V0ID09PSB0aGlzICYmICF0aGlzLmNhbkNvcHkoaWQsIHRhcmdldElkKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXHRcdGNvbnN0IGl0ZW1Db3B5ID0gY29weVdpdGhvdXRJbm5lcih0aGlzLmdldEl0ZW0oaWQpLCB7IGl0ZW1zOiB0cnVlIH0pO1xuXHRcdGlmICh0YXJnZXQuZXhpc3RzKGlkKSkge1xuXHRcdFx0aXRlbUNvcHkuaWQgPSB1aWQoKTtcblx0XHR9XG5cdFx0aWYgKCFpc1RyZWVDb2xsZWN0aW9uKHRhcmdldCkpIHtcblx0XHRcdHRhcmdldC5hZGQoaXRlbUNvcHksIGluZGV4KTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5leGlzdHMoaWQpKSB7XG5cdFx0XHRpdGVtQ29weS5wYXJlbnQgPSB0YXJnZXRJZDtcblx0XHRcdHRhcmdldC5hZGQoaXRlbUNvcHksIGluZGV4KTtcblx0XHRcdGlkID0gaXRlbUNvcHkuaWQ7XG5cdFx0fVxuXHRcdGlmIChjdXJyZW50Q2hpbGRzKSB7XG5cdFx0XHRmb3IgKGNvbnN0IGNoaWxkIG9mIGN1cnJlbnRDaGlsZHMpIHtcblx0XHRcdFx0Y29uc3QgY2hpbGRJZCA9IGNoaWxkLmlkO1xuXHRcdFx0XHRjb25zdCBjaGlsZEluZGV4ID0gdGhpcy5nZXRJbmRleChjaGlsZElkKTtcblx0XHRcdFx0dGhpcy5jb3B5KGNoaWxkSWQsIGNoaWxkSW5kZXgsIHRhcmdldCwgaWQpO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaWQ7XG5cdH1cblx0bW92ZShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldDogSVRyZWVDb2xsZWN0aW9uIHwgSURhdGFDb2xsZWN0aW9uID0gdGhpcywgdGFyZ2V0SWQ6IElkID0gdGhpcy5fcm9vdCk6IElkIHtcblx0XHRpZiAoIXRoaXMuZXhpc3RzKGlkKSkge1xuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0fVxuXG5cdFx0aWYgKHRhcmdldCAhPT0gdGhpcykge1xuXHRcdFx0aWYgKCFpc1RyZWVDb2xsZWN0aW9uKHRhcmdldCkpIHsgLy8gbW92ZSB0byBkYXRhY29sbGVjdGlvblxuXHRcdFx0XHR0YXJnZXQuYWRkKGNvcHlXaXRob3V0SW5uZXIodGhpcy5nZXRJdGVtKGlkKSksIGluZGV4KTtcblx0XHRcdFx0dGhpcy5yZW1vdmUoaWQpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByZXR1cm5JZCA9IHRoaXMuY29weShpZCwgaW5kZXgsIHRhcmdldCwgdGFyZ2V0SWQpO1xuXHRcdFx0dGhpcy5yZW1vdmUoaWQpO1xuXHRcdFx0cmV0dXJuIHJldHVybklkO1xuXHRcdH1cblx0XHQvLyBtb3ZlIGluc2lkZVxuXHRcdGlmICghdGhpcy5jYW5Db3B5KGlkLCB0YXJnZXRJZCkpIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH1cblx0XHRjb25zdCBwYXJlbnQgPSB0aGlzLmdldFBhcmVudChpZCk7XG5cdFx0Y29uc3QgcGFyZW50SW5kZXggPSB0aGlzLmdldEluZGV4KGlkKTtcblxuXHRcdC8vIGdldCBpdGVtIGZyb20gcGFyZW50IGFycmF5IGFuZCBtb3ZlIHRvIHRhcmdldCBhcnJheVxuXHRcdGNvbnN0IHNwbGljZWQgPSB0aGlzLl9jaGlsZHNbcGFyZW50XS5zcGxpY2UocGFyZW50SW5kZXgsIDEpWzBdO1xuXHRcdChzcGxpY2VkIGFzIElEYXRhSXRlbSkucGFyZW50ID0gdGFyZ2V0SWQ7IC8vIG5lZWQgZm9yIG5leHQgbW92aW5nLCAuLi4gbm90IGJlc3Qgc29sdXRpb24sIG1heSBiZSBmdWxsIG1ldGhvZCBmb3IgZ2V0IGl0ZW1cblxuXHRcdGlmICghdGhpcy5fY2hpbGRzW3BhcmVudF0ubGVuZ3RoKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5fY2hpbGRzW3BhcmVudF07XG5cdFx0fVxuXHRcdGlmICghdGhpcy5oYXZlSXRlbXModGFyZ2V0SWQpKSB7XG5cdFx0XHR0aGlzLl9jaGlsZHNbdGFyZ2V0SWRdID0gW107XG5cdFx0fVxuXHRcdGlmIChpbmRleCA9PT0gLTEpIHtcblx0XHRcdGluZGV4ID0gdGhpcy5fY2hpbGRzW3RhcmdldElkXS5wdXNoKHNwbGljZWQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aGlzLl9jaGlsZHNbdGFyZ2V0SWRdLnNwbGljZShpbmRleCwgMCwgc3BsaWNlZCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdFx0cmV0dXJuIGlkO1xuXHR9XG5cdGVhY2hDaGlsZChpZDogSWQsIGNiOiBEYXRhQ2FsbGJhY2s8VD4sIGRpcmVjdDogYm9vbGVhbiA9IHRydWUsIGNoZWNrSXRlbTogKGl0ZW06IElEYXRhSXRlbSkgPT4gYm9vbGVhbiA9ICgpID0+IHRydWUpOiB2b2lkIHtcblx0XHRpZiAoIXRoaXMuaGF2ZUl0ZW1zKGlkKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRmb3IgKGxldCBpID0gMDtpIDwgdGhpcy5fY2hpbGRzW2lkXS5sZW5ndGg7aSsrKSB7XG5cdFx0XHRjYi5jYWxsKHRoaXMsIHRoaXMuX2NoaWxkc1tpZF1baV0sIGkpO1xuXHRcdFx0aWYgKGRpcmVjdCAmJiBjaGVja0l0ZW0odGhpcy5fY2hpbGRzW2lkXVtpXSkpIHtcblx0XHRcdFx0dGhpcy5lYWNoQ2hpbGQodGhpcy5fY2hpbGRzW2lkXVtpXS5pZCwgY2IsIGRpcmVjdCwgY2hlY2tJdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Z2V0TmVhcklkKGlkOiBJZCk6IElkIHtcblx0XHRyZXR1cm4gaWQ7IC8vIGZvciBzZWxlY3Rpb25cblx0fVxuXHRsb2FkSXRlbXMoaWQ6IElkLCBkcml2ZXI6IGFueSA9IFwianNvblwiKTogdm9pZCB7XG5cdFx0Y29uc3QgdXJsID0gdGhpcy5jb25maWcuYXV0b2xvYWQgKyBcIj9pZD1cIiArIGlkO1xuXHRcdGNvbnN0IHByb3h5ID0gbmV3IERhdGFQcm94eSh1cmwpO1xuXHRcdHByb3h5LmxvYWQoKS50aGVuKChkYXRhKSA9PiB7XG5cdFx0XHRkcml2ZXIgPSB0b0RhdGFEcml2ZXIoZHJpdmVyKTtcblx0XHRcdGRhdGEgPSBkcml2ZXIudG9Kc29uQXJyYXkoZGF0YSk7XG5cdFx0XHR0aGlzLl9wYXJzZV9kYXRhKGRhdGEsIGlkKTtcblxuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShEYXRhRXZlbnRzLmNoYW5nZSk7XG5cdFx0fSk7XG5cdH1cblx0cmVmcmVzaEl0ZW1zKGlkOiBJZCwgZHJpdmVyOiBhbnkgPSBcImpzb25cIik6IHZvaWQge1xuXHRcdHRoaXMucmVtb3ZlQWxsKGlkKTtcblx0XHR0aGlzLmxvYWRJdGVtcyhpZCwgZHJpdmVyKTtcblx0fVxuXHRlYWNoUGFyZW50KGlkOiBJZCwgY2I6IERhdGFDYWxsYmFjazxUPiwgc2VsZjogYm9vbGVhbiA9IGZhbHNlKTogdm9pZCB7XG5cdFx0Y29uc3QgaXRlbSA9IHRoaXMuZ2V0SXRlbShpZCk7XG5cdFx0aWYgKCFpdGVtKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmIChzZWxmKSB7XG5cdFx0XHRjYi5jYWxsKHRoaXMsIGl0ZW0pO1xuXHRcdH1cblx0XHRpZiAoaXRlbS5wYXJlbnQgPT09IHRoaXMuX3Jvb3QpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5nZXRJdGVtKGl0ZW0ucGFyZW50KTtcblx0XHRjYi5jYWxsKHRoaXMsIHBhcmVudCk7XG5cdFx0dGhpcy5lYWNoUGFyZW50KGl0ZW0ucGFyZW50LCBjYik7XG5cdH1cblx0aGF2ZUl0ZW1zKGlkOiBJZCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiBpZCBpbiB0aGlzLl9jaGlsZHM7XG5cdH1cblx0Y2FuQ29weShpZDogSWQsIHRhcmdldDogSWQpOiBib29sZWFuIHtcblx0XHRpZiAoaWQgPT09IHRhcmdldCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRsZXQgY2FuQ29weSA9IHRydWU7XG5cdFx0dGhpcy5lYWNoUGFyZW50KHRhcmdldCwgaXRlbSA9PiBpdGVtLmlkID09PSBpZCA/IGNhbkNvcHkgPSBmYWxzZSA6IG51bGwpOyAvLyBsb2NhdGUgcmV0dXJuIHN0cmluZ1xuXHRcdHJldHVybiBjYW5Db3B5O1xuXHR9XG5cdHNlcmlhbGl6ZShkcml2ZXI6IERhdGFEcml2ZXIgPSBEYXRhRHJpdmVyLmpzb24sIGNoZWNrSXRlbT86IChpdGVtOiBhbnkpID0+IGFueSkge1xuXHRcdGNvbnN0IGRhdGEgPSB0aGlzLl9zZXJpYWxpemUodGhpcy5fcm9vdCwgY2hlY2tJdGVtKTtcblx0XHRjb25zdCBkYXRhRHJpdmVyID0gdG9EYXRhRHJpdmVyKGRyaXZlcik7XG5cdFx0aWYgKGRhdGFEcml2ZXIpIHtcblx0XHRcdHJldHVybiBkYXRhRHJpdmVyLnNlcmlhbGl6ZShkYXRhKTtcblx0XHR9XG5cdH1cblx0Z2V0SWQoaW5kZXg6IG51bWJlciwgcGFyZW50OiBzdHJpbmcgPSB0aGlzLl9yb290KTogc3RyaW5nIHtcblx0XHRpZiAoIXRoaXMuX2NoaWxkc1twYXJlbnRdIHx8ICF0aGlzLl9jaGlsZHNbcGFyZW50XVtpbmRleF0pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2NoaWxkc1twYXJlbnRdW2luZGV4XS5pZDtcblx0fVxuXHRwcm90ZWN0ZWQgX3JlbW92ZUFsbChpZD86IElkKSB7XG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRjb25zdCBjaGlsZHMgPSBbLi4uIHRoaXMuX2NoaWxkc1tpZF1dO1xuXHRcdFx0Zm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHMpIHtcblx0XHRcdFx0dGhpcy5yZW1vdmUoY2hpbGQuaWQpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdXBlci5fcmVtb3ZlQWxsKCk7XG5cdFx0XHRjb25zdCByb290ID0gdGhpcy5fcm9vdDtcblx0XHRcdHRoaXMuX2luaXRDaGlsZHMgPSBudWxsO1xuXHRcdFx0dGhpcy5fY2hpbGRzID0geyBbcm9vdF06IFtdIH07XG5cdFx0fVxuXHR9XG5cdHByb3RlY3RlZCBfcmVtb3ZlQ29yZShpZCkge1xuXHRcdGlmICh0aGlzLl9wdWxsW2lkXSkge1xuXHRcdFx0Y29uc3QgcGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoaWQpO1xuXHRcdFx0dGhpcy5fY2hpbGRzW3BhcmVudF0gPSB0aGlzLl9jaGlsZHNbcGFyZW50XS5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBpZCk7XG5cdFx0XHRpZiAocGFyZW50ICE9PSB0aGlzLl9yb290ICYmICF0aGlzLl9jaGlsZHNbcGFyZW50XS5sZW5ndGgpIHtcblx0XHRcdFx0ZGVsZXRlIHRoaXMuX2NoaWxkc1twYXJlbnRdO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHRoaXMuX2luaXRDaGlsZHMgJiYgdGhpcy5faW5pdENoaWxkc1twYXJlbnRdKSB7XG5cdFx0XHRcdHRoaXMuX2luaXRDaGlsZHNbcGFyZW50XSA9IHRoaXMuX2luaXRDaGlsZHNbcGFyZW50XS5maWx0ZXIoaXRlbSA9PiBpdGVtLmlkICE9PSBpZCk7XG5cdFx0XHRcdGlmIChwYXJlbnQgIT09IHRoaXMuX3Jvb3QgJiYgIXRoaXMuX2luaXRDaGlsZHNbcGFyZW50XS5sZW5ndGgpIHtcblx0XHRcdFx0XHRkZWxldGUgdGhpcy5faW5pdENoaWxkc1twYXJlbnRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLl9mYXN0RGVsZXRlQ2hpbGRzKHRoaXMuX2NoaWxkcywgaWQpO1xuXHRcdFx0aWYgKHRoaXMuX2luaXRDaGlsZHMpIHtcblx0XHRcdFx0dGhpcy5fZmFzdERlbGV0ZUNoaWxkcyh0aGlzLl9pbml0Q2hpbGRzLCBpZCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHByb3RlY3RlZCBfYWRkVG9PcmRlcihfb3JkZXIsIG9iajogYW55LCBpbmRleDogbnVtYmVyKTogdm9pZCB7XG5cdFx0Y29uc3QgY2hpbGRzID0gdGhpcy5fY2hpbGRzO1xuXHRcdGNvbnN0IGluaXRDaGlsZHMgPSB0aGlzLl9pbml0Q2hpbGRzO1xuXHRcdGNvbnN0IHBhcmVudCA9IG9iai5wYXJlbnQ7XG5cdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xuXG5cdFx0YWRkVG9PcmRlcihjaGlsZHMsIG9iaiwgcGFyZW50LCBpbmRleCk7XG5cdFx0aWYgKGluaXRDaGlsZHMpIHtcblx0XHRcdGFkZFRvT3JkZXIoaW5pdENoaWxkcywgb2JqLCBwYXJlbnQsIGluZGV4KTtcblx0XHR9XG5cdH1cblx0cHJvdGVjdGVkIF9wYXJzZV9kYXRhKGRhdGE6IGFueSwgcGFyZW50ID0gdGhpcy5fcm9vdCkge1xuXHRcdGZvciAobGV0IG9iaiBvZiBkYXRhKSB7XG5cdFx0XHRpZiAodGhpcy5jb25maWcuaW5pdCkge1xuXHRcdFx0XHRvYmogPSB0aGlzLmNvbmZpZy5pbml0KG9iaik7XG5cdFx0XHR9XG5cdFx0XHRpZiAodHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRvYmogPSB7XG5cdFx0XHRcdFx0dmFsdWU6IG9ialxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0b2JqLmlkID0gb2JqLmlkID8gb2JqLmlkLnRvU3RyaW5nKCkgOiB1aWQoKTtcblx0XHRcdG9iai5wYXJlbnQgPSBvYmoucGFyZW50ID8gb2JqLnBhcmVudC50b1N0cmluZygpIDogcGFyZW50O1xuXHRcdFx0dGhpcy5fcHVsbFtvYmouaWRdID0gb2JqO1xuXG5cdFx0XHRpZiAoIXRoaXMuX2NoaWxkc1tvYmoucGFyZW50XSkge1xuXHRcdFx0XHR0aGlzLl9jaGlsZHNbb2JqLnBhcmVudF0gPSBbXTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX2NoaWxkc1tvYmoucGFyZW50XS5wdXNoKG9iaik7XG5cdFx0XHRpZiAob2JqLml0ZW1zICYmIG9iai5pdGVtcyBpbnN0YW5jZW9mIE9iamVjdCkge1xuXHRcdFx0XHR0aGlzLl9wYXJzZV9kYXRhKG9iai5pdGVtcywgb2JqLmlkKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cHJpdmF0ZSBfZmFzdERlbGV0ZUNoaWxkcyh0YXJnZXQsIGlkOiBJZCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9wdWxsW2lkXSkge1xuXHRcdFx0ZGVsZXRlIHRoaXMuX3B1bGxbaWRdO1xuXHRcdH1cblx0XHRpZiAoIXRhcmdldFtpZF0pIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Zm9yIChsZXQgaSA9IDA7aSA8IHRhcmdldFtpZF0ubGVuZ3RoO2krKykge1xuXHRcdFx0dGhpcy5fZmFzdERlbGV0ZUNoaWxkcyh0YXJnZXQsIHRhcmdldFtpZF1baV0uaWQpO1xuXHRcdH1cblx0XHRkZWxldGUgdGFyZ2V0W2lkXTtcblx0fVxuXHRwcml2YXRlIF9yZWN1cnNpdmVGaWx0ZXIocnVsZTogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZzogSVRyZWVGaWx0ZXJDb25maWcsIGN1cnJlbnQ6IElkLCBsZXZlbDogbnVtYmVyLCBuZXdDaGlsZHM6IElBbnlPYmopOiB2b2lkIHtcblx0XHRjb25zdCBjaGlsZHMgPSB0aGlzLl9jaGlsZHNbY3VycmVudF07XG5cdFx0aWYgKCFjaGlsZHMpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgY29uZGl0aW9uID0gKGl0ZW06IFQpOiBib29sZWFuID0+IHtcblx0XHRcdHN3aXRjaCAoY29uZmlnLnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBUcmVlRmlsdGVyVHlwZS5hbGw6IHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFRyZWVGaWx0ZXJUeXBlLmxldmVsOiB7XG5cdFx0XHRcdFx0cmV0dXJuIGxldmVsID09PSBjb25maWcubGV2ZWw7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBUcmVlRmlsdGVyVHlwZS5sZWFmczoge1xuXHRcdFx0XHRcdHJldHVybiAhdGhpcy5oYXZlSXRlbXMoaXRlbS5pZCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdGlmICh0eXBlb2YgcnVsZSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRjb25zdCBjdXN0b21SdWxlID0gKGl0ZW06IFQpID0+ICFjb25kaXRpb24oaXRlbSkgfHwgcnVsZShpdGVtKTtcblx0XHRcdGNvbnN0IGZpbHRlcmVkID0gY2hpbGRzLmZpbHRlcihjdXN0b21SdWxlKTtcblx0XHRcdGlmIChmaWx0ZXJlZC5sZW5ndGgpIHtcblx0XHRcdFx0bmV3Q2hpbGRzW2N1cnJlbnRdID0gZmlsdGVyZWQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICgocnVsZSBhcyBJRmlsdGVyTW9kZSkuYnkgJiYgKHJ1bGUgYXMgSUZpbHRlck1vZGUpLm1hdGNoKSB7XG5cdFx0XHRjb25zdCBjdXN0b21SdWxlID0gKGl0ZW06IFQpID0+ICFjb25kaXRpb24oaXRlbSkgfHwgaXRlbVtydWxlLmJ5XS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihydWxlLm1hdGNoLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKSkgIT09IC0xO1xuXHRcdFx0bmV3Q2hpbGRzW2N1cnJlbnRdID0gY2hpbGRzLmZpbHRlcihjdXN0b21SdWxlKTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHMpIHtcblx0XHRcdHRoaXMuX3JlY3Vyc2l2ZUZpbHRlcihydWxlLCBjb25maWcsIGNoaWxkLmlkLCBsZXZlbCArIDEsIG5ld0NoaWxkcyk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3NlcmlhbGl6ZShwYXJlbnQgPSB0aGlzLl9yb290LCBmbj8pIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoaXRlbSA9PiB7XG5cdFx0XHRsZXQgaXRlbUNvcHk6IGFueSA9IHt9O1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgaW4gaXRlbSkge1xuXHRcdFx0XHRpZiAoa2V5ID09PSBcInBhcmVudFwiIHx8IGtleSA9PT0gXCJpdGVtc1wiKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aXRlbUNvcHlba2V5XSA9IGl0ZW1ba2V5XTtcblx0XHRcdH1cblx0XHRcdGlmIChmbikge1xuXHRcdFx0XHRpdGVtQ29weSA9IGZuKGl0ZW1Db3B5KTtcblx0XHRcdH1cblx0XHRcdGlmICh0aGlzLmhhdmVJdGVtcyhpdGVtLmlkKSkge1xuXHRcdFx0XHRpdGVtQ29weS5pdGVtcyA9IHRoaXMuX3NlcmlhbGl6ZShpdGVtLmlkLCBmbik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gaXRlbUNvcHk7XG5cdFx0fSwgcGFyZW50LCBmYWxzZSk7XG5cdH1cbn0iLCJpbXBvcnQgeyBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiB9IGZyb20gXCIuL2RhdGFjb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBUcmVlQ29sbGVjdGlvbiB9IGZyb20gXCIuL3RyZWVjb2xsZWN0aW9uXCI7XG5pbXBvcnQgeyBJQW55T2JqIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3R5cGVzXCI7XG5cbmV4cG9ydCB0eXBlIElkID0gc3RyaW5nO1xuZXhwb3J0IGludGVyZmFjZSBJRGF0YVByb3h5IHtcblx0bG9hZDogKCkgPT4gUHJvbWlzZTxhbnlbXT47XG5cdHNhdmU6IChkYXRhOiBhbnksIG1vZGU6IHN0cmluZykgPT4gUHJvbWlzZTxhbnk+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTb3J0TW9kZSB7XG5cdGJ5Pzogc3RyaW5nO1xuXHRkaXI/OiBzdHJpbmc7XG5cdGFzPzogKGE6IGFueSkgPT4gYW55O1xuXHRydWxlPzogKGE6IGFueSwgYjogYW55KSA9PiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIElGaWx0ZXJDYWxsYmFjayA9IChvYmo6IGFueSkgPT4gYm9vbGVhbjtcblxuZXhwb3J0IGludGVyZmFjZSBJRmlsdGVyTW9kZSB7XG5cdGJ5Pzogc3RyaW5nO1xuXHRtYXRjaD86IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW47XG5cdGNvbXBhcmU/OiAodmFsdWU6IGFueSwgbWF0Y2g6IGFueSwgb2JqOiBhbnkpID0+IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIElGaWx0ZXJDb25maWcge1xuXHRhZGQ/OiBib29sZWFuO1xuXHRtdWx0aXBsZT86IGJvb2xlYW47XG59XG5leHBvcnQgaW50ZXJmYWNlIElUcmVlRmlsdGVyQ29uZmlnIGV4dGVuZHMgSUZpbHRlckNvbmZpZyB7XG5cdHR5cGU/OiBUcmVlRmlsdGVyVHlwZTtcblx0bGV2ZWw/OiBudW1iZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIElVcGRhdGVPYmplY3Qge1xuXHRba2V5OiBzdHJpbmddOiBhbnk7XG59XG5leHBvcnQgaW50ZXJmYWNlIElEYXRhQ29sbGVjdGlvbjxUIGV4dGVuZHMgSURhdGFJdGVtID0gSURhdGFJdGVtPiB7XG5cdGxvYWREYXRhOiBQcm9taXNlPGFueT47XG5cdHNhdmVEYXRhOiBQcm9taXNlPGFueT47XG5cdGV2ZW50czogSUV2ZW50U3lzdGVtPERhdGFFdmVudHM+O1xuXHRhZGQob2JqOiBhbnksIGluZGV4PzogbnVtYmVyKTogc3RyaW5nO1xuXHRyZW1vdmUoaWQ6IElkKTogdm9pZDtcblx0cmVtb3ZlQWxsKCk6IHZvaWQ7XG5cdHVwZGF0ZShpZDogSWQsIG9iajogSVVwZGF0ZU9iamVjdCwgc2lsZW50PzogYm9vbGVhbik6IHZvaWQ7XG5cblx0ZXhpc3RzKGlkOiBJZCk6IGJvb2xlYW47XG5cdGdldEluaXRpYWxEYXRhKCk6IFRbXTtcblx0Z2V0SXRlbShpZDogSWQpOiBUO1xuXHRnZXRJbmRleChpZDogSWQpOiBudW1iZXI7XG5cdGdldExlbmd0aCgpOiBudW1iZXI7XG5cdGdldElkKGluZGV4OiBudW1iZXIpOiBJZDtcblx0ZmlsdGVyKHJ1bGU/OiBJRmlsdGVyTW9kZSB8IElGaWx0ZXJDYWxsYmFjaywgY29uZmlnPzogSUZpbHRlckNvbmZpZyk6IHZvaWQ7XG5cdGZpbmQocnVsZTogSUZpbHRlck1vZGUpOiBUO1xuXHRyZWR1Y2U8QT4oY2I6IFJlZHVjZUNhbGxCYWNrPFQsIEE+LCBhY2M6IEEpOiBBO1xuXHRmaW5kQWxsKHJ1bGU6IElGaWx0ZXJNb2RlKTogVFtdO1xuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPik6IFRbXTtcblx0bWFwUmFuZ2UoZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyLCBjYjogRGF0YUNhbGxiYWNrPFQ+KTogYW55W107XG5cdHNvcnQoYnk6IElTb3J0TW9kZSk6IHZvaWQ7XG5cdHNlcmlhbGl6ZShkcml2ZXI/OiBEYXRhRHJpdmVyKTogVFtdO1xuXHRjb3B5KGlkOiBJZCwgaW5kZXg6IG51bWJlciwgdGFyZ2V0PzogSURhdGFDb2xsZWN0aW9uKTogdm9pZDtcblx0bW92ZShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldD86IElEYXRhQ29sbGVjdGlvbik6IHZvaWQ7XG5cblx0bG9hZCh1cmw6IElEYXRhUHJveHkpOiBQcm9taXNlPGFueT47XG5cdHBhcnNlKGRhdGE6IFRbXSk7XG5cblx0c2F2ZSh1cmw6IElEYXRhUHJveHkpOiB2b2lkOyAvLyBQcm9taXNlPGFueT47XG5cdGlzU2F2ZWQoKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUNoYW5nZVN0YWNrIHtcblx0b3JkZXI6IElEYXRhQ2hhbmdlW107XG59XG5leHBvcnQgdHlwZSBTdGF0dXNlcyA9IFwiYWRkXCIgfCBcInVwZGF0ZVwiIHwgXCJyZW1vdmVcIjtcbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFDaGFuZ2Uge1xuXHRpZDogSWQ7XG5cdHN0YXR1czogU3RhdHVzZXM7XG5cdG9iajogYW55O1xuXHRzYXZpbmc6IGJvb2xlYW47XG5cdHByb21pc2U/OiBQcm9taXNlPGFueT47XG5cdHBlbmRpbmc/OiBib29sZWFuO1xuXHRlcnJvcj86IGJvb2xlYW47XG59XG5leHBvcnQgdHlwZSBSZXF1ZXN0U3RhdHVzID0gXCJzYXZpbmdcIiB8IFwicGVuZGluZ1wiIHwgXCJlcnJvclwiO1xuZXhwb3J0IGludGVyZmFjZSBJRGlyIHtcblx0W2tleTogc3RyaW5nXTogYW55O1xuXHRhc2M6IG51bWJlcjtcblx0ZGVzYzogbnVtYmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBJRGF0YURyaXZlciB7XG5cdHRvSnNvbkFycmF5KGRhdGE6IGFueSk6IGFueVtdO1xuXHRzZXJpYWxpemUoZGF0YTogSUFueU9ialtdKTogYW55O1xuXHRnZXRSb3dzKGRhdGE6IHN0cmluZyk6IGFueVtdO1xuXHRnZXRGaWVsZHMocm93OiBhbnkpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9O1xufVxuZXhwb3J0IGVudW0gVHJlZUZpbHRlclR5cGUge1xuXHRhbGwgPSBcImFsbFwiLFxuXHRsZXZlbCA9IFwibGV2ZWxcIixcblx0bGVhZnMgPSBcImxlYWZzXCJcbn1cbmV4cG9ydCB0eXBlIERhdGFDYWxsYmFjazxUPiA9IChpdGVtOiBULCBpbmRleD86IG51bWJlcikgPT4gYW55O1xuXG5leHBvcnQgdHlwZSBSZWR1Y2VDYWxsQmFjazxULCBBPiA9IChhY2M6IEEsIGl0ZW06IFQsIGluZGV4PzogbnVtYmVyKSA9PiBBO1xuXG5leHBvcnQgaW50ZXJmYWNlIElUcmVlQ29sbGVjdGlvbjxUIGV4dGVuZHMgSURhdGFJdGVtID0gSURhdGFJdGVtPiBleHRlbmRzIElEYXRhQ29sbGVjdGlvbjxUPiB7XG5cdGFkZChvYmo6IGFueSwgaW5kZXg/OiBudW1iZXIsIHBhcmVudD86IElkKTogc3RyaW5nO1xuXHRnZXRSb290KCk6IElkO1xuXHRnZXRQYXJlbnQoaWQ6IElkKTogSWQ7XG5cdHJlbW92ZUFsbChpZD86IElkKTogdm9pZDtcblx0Z2V0TGVuZ3RoKGlkPzogSWQpOiBudW1iZXI7XG5cdGdldEluZGV4KGlkOiBJZCk6IG51bWJlcjtcblx0Z2V0SXRlbXMoaWQ6IElkKTogVFtdO1xuXHRzb3J0KGNvbmY/OiBhbnkpOiB2b2lkO1xuXHRtYXAoY2I6IERhdGFDYWxsYmFjazxUPiwgcGFyZW50PzogSWQsIGRpcmVjdD86IGJvb2xlYW4pOiBhbnk7XG5cdGZpbHRlcihydWxlPzogSUZpbHRlck1vZGUgfCBJRmlsdGVyQ2FsbGJhY2ssIGNvbmZpZz86IElUcmVlRmlsdGVyQ29uZmlnKTogdm9pZDtcblx0cmVzdG9yZU9yZGVyKCk6IHZvaWQ7XG5cdGNvcHkoaWQ6IElkLCBpbmRleDogbnVtYmVyLCB0YXJnZXQ/OiBJRGF0YUNvbGxlY3Rpb24gfCBJVHJlZUNvbGxlY3Rpb24sIHRhcmdldElkPzogSWQpOiBJZDtcblx0bW92ZShpZDogSWQsIGluZGV4OiBudW1iZXIsIHRhcmdldD86IElEYXRhQ29sbGVjdGlvbiB8IElUcmVlQ29sbGVjdGlvbiwgdGFyZ2V0SWQ/OiBJZCk6IElkO1xuXHRlYWNoQ2hpbGQoaWQ6IElkLCBjYjogRGF0YUNhbGxiYWNrPFQ+LCBkaXJlY3Q/OiBib29sZWFuLCBjaGVja0l0ZW0/OiAoaXRlbTogSURhdGFJdGVtKSA9PiBib29sZWFuKTogdm9pZDtcblx0ZWFjaFBhcmVudChpZDogSWQsIGNiOiBEYXRhQ2FsbGJhY2s8VD4sIHNlbGY/OiBib29sZWFuKTogdm9pZDtcblx0bG9hZEl0ZW1zKGlkOiBJZCwgZHJpdmVyPzogYW55KTogdm9pZDtcblx0cmVmcmVzaEl0ZW1zKGlkOiBJZCwgZHJpdmVyPzogYW55KTogdm9pZDtcblx0aGF2ZUl0ZW1zKGlkOiBJZCk6IGJvb2xlYW47XG5cdGNhbkNvcHkoaWQ6IElkLCB0YXJnZXQ6IElkKTogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUl0ZW0ge1xuXHRpZD86IHN0cmluZztcblx0W2tleTogc3RyaW5nXTogYW55O1xufVxuXG5cbmV4cG9ydCBlbnVtIERyb3BQb3NpdGlvbiB7XG5cdHRvcCA9IFwidG9wXCIsXG5cdGJvdCA9IFwiYm90XCIsXG5cdGluID0gXCJpblwiXG59XG5leHBvcnQgaW50ZXJmYWNlIElPYmpXaXRoRGF0YSB7XG5cdGRhdGE6IFRyZWVDb2xsZWN0aW9uIHwgRGF0YUNvbGxlY3Rpb247XG5cdGV2ZW50czogSUV2ZW50U3lzdGVtPERyYWdFdmVudHMsIElEcmFnRXZlbnRzSGFuZGxlcnNNYXA+O1xuXHRjb25maWc6IElEcmFnQ29uZmlnO1xufVxuZXhwb3J0IGludGVyZmFjZSBJVHJhbnNmZXJEYXRhIHtcblx0aW5pdFhPZmZzZXQ/OiBudW1iZXI7XG5cdGluaXRZT2Zmc2V0PzogbnVtYmVyO1xuXHR4PzogbnVtYmVyO1xuXHR5PzogbnVtYmVyO1xuXHRnaG9zdD86IEhUTUxFbGVtZW50O1xuXHR0YXJnZXRJZD86IElkO1xuXHRpZD86IElkO1xuXHRkcmFnQ29uZmlnPzogSURyYWdDb25maWc7XG5cdHRhcmdldD86IElPYmpXaXRoRGF0YTtcblx0ZHJvcFBvc2l0aW9uPzogRHJvcFBvc2l0aW9uO1xuXHRpdGVtPzogSFRNTEVsZW1lbnQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURyYWdDb25maWcge1xuXHRkcmFnQ29weT86IGJvb2xlYW47XG5cdGRyb3BCZWhhdmlvdXI/OiBEcm9wQmVoYXZpb3VyO1xuXHRkcmFnTW9kZT86IERyYWdNb2RlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElDb3B5T2JqZWN0IHtcblx0aWQ6IHN0cmluZztcblx0dGFyZ2V0OiBJT2JqV2l0aERhdGE7XG59XG5cbmV4cG9ydCBlbnVtIERhdGFFdmVudHMge1xuXHRhZnRlckFkZCA9IFwiYWZ0ZXJhZGRcIixcblx0YmVmb3JlQWRkID0gXCJiZWZvcmVhZGRcIixcblx0cmVtb3ZlQWxsID0gXCJyZW1vdmVhbGxcIixcblx0YmVmb3JlUmVtb3ZlID0gXCJiZWZvcmVyZW1vdmVcIixcblx0YWZ0ZXJSZW1vdmUgPSBcImFmdGVycmVtb3ZlXCIsXG5cdGNoYW5nZSA9IFwiY2hhbmdlXCIsXG5cdGxvYWQgPSBcImxvYWRcIlxufVxuZXhwb3J0IGVudW0gRHJhZ0V2ZW50cyB7XG5cdGJlZm9yZURyYWcgPSBcImJlZm9yZWRyYWdcIiwgICAgIC8vIGZpcmUgb24gc291cmNlXG5cdGJlZm9yZURyb3AgPSBcImJlZm9yZURyb3BcIiwgICAgIC8vIGZpcmUgb24gdGFyZ2V0XG5cdGRyYWdTdGFydCA9IFwiZHJhZ3N0YXJ0XCIsICAgICAgIC8vIGZpcmUgb24gc291cmNlXG5cdGRyYWdFbmQgPSBcImRyYWdlbmRcIiwgICAgICAgICAgIC8vIGZpcmUgb24gc291cmNlXG5cdGNhbkRyb3AgPSBcImNhbmRyb3BcIiwgICAgICAgICAgIC8vIGZpcmUgb24gdGFyZ2V0XG5cdGNhbmNlbERyb3AgPSBcImNhbmNlbGRyb3BcIiwgICAgIC8vIGZpcmUgb24gdGFyZ2V0XG5cdGRyb3BDb21wbGV0ZSA9IFwiZHJvcGNvbXBsZXRlXCIsIC8vIGZpcmUgb24gdGFyZ2V0XG5cdGRyYWdPdXQgPSBcImRyYWdPdXRcIiwgICAgICAgICAgIC8vIGZpcmUgb24gc291cmNlXG5cdGRyYWdJbiA9IFwiZHJhZ0luXCIgICAgICAgICAgICAgIC8vIGZpcmUgb24gc291cmNlXG59XG5cblxuZXhwb3J0IGVudW0gRHJhZ01vZGUge1xuXHR0YXJnZXQgPSBcInRhcmdldFwiLFxuXHRib3RoID0gXCJib3RoXCIsXG5cdHNvdXJjZSA9IFwic291cmNlXCJcbn1cbmV4cG9ydCBlbnVtIERyb3BCZWhhdmlvdXIge1xuXHRjaGlsZCA9IFwiY2hpbGRcIixcblx0c2libGluZyA9IFwic2libGluZ1wiLFxuXHRjb21wbGV4ID0gXCJjb21wbGV4XCJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwIHtcblx0W2tleTogc3RyaW5nXTogKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk7XG5cdFtEYXRhRXZlbnRzLmNoYW5nZV06IChpZD86IHN0cmluZywgc3RhdHVzPzogU3RhdHVzZXMsIG9iaj86IGFueSkgPT4gYW55O1xuXHRbRGF0YUV2ZW50cy5hZnRlckFkZF06IChvYmo6IGFueSkgPT4gdm9pZDtcblx0W0RhdGFFdmVudHMuYWZ0ZXJSZW1vdmVdOiAob2JqOiBhbnkpID0+IHZvaWQ7XG5cdFtEYXRhRXZlbnRzLmJlZm9yZUFkZF06IChvYmo6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQ7XG5cdFtEYXRhRXZlbnRzLmJlZm9yZVJlbW92ZV06IChvYmo6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQ7XG5cdFtEYXRhRXZlbnRzLmxvYWRdOiAoKSA9PiB2b2lkO1xuXHRbRGF0YUV2ZW50cy5yZW1vdmVBbGxdOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEcmFnRXZlbnRzSGFuZGxlcnNNYXAge1xuXHRba2V5OiBzdHJpbmddOiAoLi4uYXJnczogYW55W10pID0+IGFueTtcblx0W0RyYWdFdmVudHMuYmVmb3JlRHJhZ106IChpdGVtOiBhbnksIGdob3N0OiBIVE1MRWxlbWVudCkgPT4gdm9pZCB8IGJvb2xlYW47XG5cdFtEcmFnRXZlbnRzLmJlZm9yZURyb3BdOiAoaWQ6IHN0cmluZywgdGFyZ2V0OiBJT2JqV2l0aERhdGEpID0+IGFueTtcblx0W0RyYWdFdmVudHMuY2FuRHJvcF06IChpZDogc3RyaW5nLCBkcm9wUG9zaXRpb246IERyb3BQb3NpdGlvbikgPT4gYW55O1xuXHRbRHJhZ0V2ZW50cy5jYW5jZWxEcm9wXTogKGlkOiBzdHJpbmcpID0+IGFueTtcblx0W0RyYWdFdmVudHMuZHJhZ0VuZF06IChpZDogc3RyaW5nKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmRyYWdJbl06IChpZDogc3RyaW5nLCBkcm9wUG9zaXRpb246IERyb3BQb3NpdGlvbiwgdGFyZ2V0OiBJT2JqV2l0aERhdGEpID0+IHZvaWQgfCBib29sZWFuO1xuXHRbRHJhZ0V2ZW50cy5kcmFnT3V0XTogKGlkOiBzdHJpbmcsIHRhcmdldDogSU9ialdpdGhEYXRhKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmRyYWdTdGFydF06IChpZDogc3RyaW5nKSA9PiBhbnk7XG5cdFtEcmFnRXZlbnRzLmRyb3BDb21wbGV0ZV06IChpZDogc3RyaW5nLCBwb3NpdGlvbjogRHJvcFBvc2l0aW9uKSA9PiBhbnk7XG59XG5cbmV4cG9ydCBlbnVtIERhdGFEcml2ZXIge1xuXHRqc29uID0gXCJqc29uXCIsXG5cdGNzdiA9IFwiY3N2XCIsXG5cdHhtbCA9IFwieG1sXCJcbn0iLCJpbXBvcnQgeyBleHRlbmQsIGRldGVjdFdpZGdldENsaWNrIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2NvcmVcIjtcbmltcG9ydCB7IGNyZWF0ZSwgZWwsIFZOb2RlIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2RvbVwiO1xuaW1wb3J0IHsgYWRkSG90a2V5cyB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9LZXltYW5hZ2VyXCI7XG5pbXBvcnQgeyBTZWxlY3Rpb24sIElTZWxlY3Rpb24gfSBmcm9tIFwiQGRoeC90cy1saXN0XCI7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL3ZpZXdcIjtcbmltcG9ydCB7IERhdGFDb2xsZWN0aW9uLCBEYXRhRXZlbnRzLCBEcmFnRXZlbnRzLCBkcmFnTWFuYWdlciwgSURhdGFFdmVudHNIYW5kbGVyc01hcCwgSURyYWdFdmVudHNIYW5kbGVyc01hcCB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcbmltcG9ydCB7IEV2ZW50U3lzdGVtLCBJRXZlbnRTeXN0ZW0gfSBmcm9tIFwiQGRoeC90cy1jb21tb24vZXZlbnRzXCI7XG5pbXBvcnQgeyBsb2NhdGUgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vaHRtbFwiO1xuaW1wb3J0IHsgSUhhbmRsZXJzLCBTZWxlY3Rpb25FdmVudHMgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IElEYXRhVmlld0NvbmZpZywgRGF0YVZpZXdFdmVudHMsIElEYXRhVmlld0V2ZW50SGFuZGxlcnNNYXAsIElEYXRhVmlldyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBEYXRhVmlldyBleHRlbmRzIFZpZXcgaW1wbGVtZW50cyBJRGF0YVZpZXcge1xuXHRwdWJsaWMgY29uZmlnOiBJRGF0YVZpZXdDb25maWc7XG5cdHB1YmxpYyBkYXRhOiBEYXRhQ29sbGVjdGlvbjtcblx0cHVibGljIGV2ZW50czogSUV2ZW50U3lzdGVtPERhdGFFdmVudHMgfCBEcmFnRXZlbnRzIHwgRGF0YVZpZXdFdmVudHMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAgJiBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwICYgSURhdGFWaWV3RXZlbnRIYW5kbGVyc01hcD47XG5cdHB1YmxpYyBzZWxlY3Rpb246IElTZWxlY3Rpb247XG5cblx0cHJpdmF0ZSBfaGFuZGxlcnM6IElIYW5kbGVycztcblx0cHJpdmF0ZSBfbmF2aWdhdGlvbkRlc3RydWN0b3I6ICgpID0+IHZvaWQ7XG5cdHByaXZhdGUgX2RvY3VtZW50Q2xpY2tEZXN0dWN0b3I6ICgpID0+IHZvaWQ7XG5cdHByaXZhdGUgX2ZvY3VzSW5kZXg6IG51bWJlcjtcblx0cHJpdmF0ZSBfd2lkZ2V0SW5Gb2N1czogYm9vbGVhbjtcblxuXHRjb25zdHJ1Y3Rvcihub2RlOiBIVE1MRWxlbWVudHxzdHJpbmcsIGNvbmZpZzogSURhdGFWaWV3Q29uZmlnID0ge30pe1xuXHRcdHN1cGVyKG5vZGUsIGV4dGVuZCh7XG5cdFx0XHRhcnJvd05hdmlnYXRpb246IHRydWUsXG5cdFx0XHRpdGVtc0luUm93OiAxLFxuXHRcdFx0Z2FwOiBcIjBweFwiLFxuXHRcdH0sIGNvbmZpZykpO1xuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuZGF0YSkpIHtcblx0XHRcdHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50U3lzdGVtPERhdGFFdmVudHM+KHRoaXMpO1xuXHRcdFx0dGhpcy5kYXRhID0gbmV3IERhdGFDb2xsZWN0aW9uKHt9LCB0aGlzLmV2ZW50cyk7XG5cdFx0XHR0aGlzLmRhdGEucGFyc2UodGhpcy5jb25maWcuZGF0YSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmNvbmZpZy5kYXRhICYmIHRoaXMuY29uZmlnLmRhdGEuZXZlbnRzKSB7XG5cdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmNvbmZpZy5kYXRhO1xuXHRcdFx0dGhpcy5ldmVudHMgPSB0aGlzLmRhdGEuZXZlbnRzO1xuXHRcdFx0dGhpcy5ldmVudHMuY29udGV4dCA9IHRoaXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50U3lzdGVtPERhdGFFdmVudHM+KHRoaXMpO1xuXHRcdFx0dGhpcy5kYXRhID0gbmV3IERhdGFDb2xsZWN0aW9uKHt9LCB0aGlzLmV2ZW50cyk7XG5cdFx0fVxuXHRcdHRoaXMuc2VsZWN0aW9uID0gbmV3IFNlbGVjdGlvbih7fSwgdGhpcy5kYXRhKTtcblx0XHRjb25zdCBwcmV2ZW50RXZlbnQgPSAoZm46ICgpID0+IHZvaWQpID0+IChlOiBFdmVudCkgPT4ge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0Zm4oKTtcblx0XHR9O1xuXHRcdGlmICh0aGlzLmNvbmZpZy5hcnJvd05hdmlnYXRpb24pIHtcblx0XHRcdGxldCBhcnJvd05hdmlnYXRpb24gPSB0aGlzLmNvbmZpZy5hcnJvd05hdmlnYXRpb24gYXMgYW55O1xuXHRcdFx0aWYgKHR5cGVvZiB0aGlzLmNvbmZpZy5hcnJvd05hdmlnYXRpb24gIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHR0aGlzLl93aWRnZXRJbkZvY3VzID0gZmFsc2U7XG5cdFx0XHRcdGFycm93TmF2aWdhdGlvbiA9ICgpID0+IHRoaXMuX3dpZGdldEluRm9jdXM7XG5cdFx0XHRcdHRoaXMuX2RvY3VtZW50Q2xpY2tEZXN0dWN0b3IgPSBkZXRlY3RXaWRnZXRDbGljayh0aGlzLl91aWQsIGlzSW5uZXJDbGljayA9PiB0aGlzLl93aWRnZXRJbkZvY3VzID0gaXNJbm5lckNsaWNrKTtcblx0XHRcdH1cblx0XHRcdHRoaXMuX25hdmlnYXRpb25EZXN0cnVjdG9yID0gYWRkSG90a2V5cyhcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFycm93ZG93bjogcHJldmVudEV2ZW50KCgpID0+IHRoaXMuc2V0Rm9jdXNJbmRleCh0aGlzLl9mb2N1c0luZGV4ICsgdGhpcy5jb25maWcuaXRlbXNJblJvdykpLFxuXHRcdFx0XHRcdGFycm93dXA6IHByZXZlbnRFdmVudCgoKSA9PiB0aGlzLnNldEZvY3VzSW5kZXgodGhpcy5fZm9jdXNJbmRleCAtIHRoaXMuY29uZmlnLml0ZW1zSW5Sb3cpKSxcblx0XHRcdFx0XHRhcnJvd2xlZnQ6IHByZXZlbnRFdmVudCgoKSA9PiB0aGlzLnNldEZvY3VzSW5kZXgodGhpcy5fZm9jdXNJbmRleCAtIDEpKSxcblx0XHRcdFx0XHRhcnJvd3JpZ2h0OiBwcmV2ZW50RXZlbnQoKCkgPT4gdGhpcy5zZXRGb2N1c0luZGV4KHRoaXMuX2ZvY3VzSW5kZXggKyAxKSksXG5cdFx0XHRcdFx0ZW50ZXI6IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBpZCA9IHRoaXMuZGF0YS5nZXRJZCh0aGlzLl9mb2N1c0luZGV4KTtcblx0XHRcdFx0XHRcdHRoaXMuc2VsZWN0aW9uLmFkZChpZCk7XG5cdFx0XHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFWaWV3RXZlbnRzLmNsaWNrLCBbaWQsIGVdKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFycm93TmF2aWdhdGlvblxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCB1cGRhdGVyID0gKHVwZGF0ZU9iajogYW55KSA9PiAoaWQ6IHN0cmluZykgPT4ge1xuXHRcdFx0aWYgKHRoaXMuZGF0YS5leGlzdHMoaWQpKSB7XG5cdFx0XHRcdHRoaXMuZGF0YS51cGRhdGUoaWQsIHVwZGF0ZU9iaik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHR0aGlzLmV2ZW50cy5vbihEYXRhRXZlbnRzLmNoYW5nZSwgKCkgPT4gdGhpcy5wYWludCgpKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmNhbkRyb3AsIHVwZGF0ZXIoeyRkcm9waGVyZTogdHJ1ZX0pKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmNhbmNlbERyb3AsIHVwZGF0ZXIoeyRkcm9waGVyZTogdW5kZWZpbmVkfSkpO1xuXHRcdHRoaXMuZXZlbnRzLm9uKERyYWdFdmVudHMuZHJhZ1N0YXJ0LCB1cGRhdGVyKHskZHJhZ3RhcmdldDogdHJ1ZX0pKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmRyYWdFbmQsIHVwZGF0ZXIoeyRkcmFndGFyZ2V0OiB1bmRlZmluZWR9KSk7XG5cblx0XHR0aGlzLnNlbGVjdGlvbi5ldmVudHMub24oU2VsZWN0aW9uRXZlbnRzLmFmdGVyU2VsZWN0LCBpZCA9PiB7XG5cdFx0XHR0aGlzLnNldEZvY3VzSW5kZXgodGhpcy5kYXRhLmdldEluZGV4KGlkKSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9oYW5kbGVycyA9IHtcblx0XHRcdG9ubW91c2Vkb3duOiAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5jb25maWcuZHJhZ01vZGUgPyBkcmFnTWFuYWdlci5vbk1vdXNlRG93bihlKSA6IG51bGwsXG5cdFx0XHRvbmRyYWdzdGFydDogKCkgPT4gdGhpcy5jb25maWcuZHJhZ01vZGUgPyBmYWxzZSA6IG51bGwsXG5cdFx0XHRvbmNvbnRleHRtZW51OiAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBpZCA9IGxvY2F0ZShlKTtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFWaWV3RXZlbnRzLmNvbnRleHRtZW51LCBbaWQsIGVdKTtcblx0XHRcdH0sXG5cdFx0XHRvbmNsaWNrOiAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBpZCA9IGxvY2F0ZShlKTtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnNlbGVjdGlvbi5hZGQoaWQpO1xuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKERhdGFWaWV3RXZlbnRzLmNsaWNrLCBbaWQsIGVdKTtcblx0XHRcdH0sXG5cdFx0fTtcblx0XHRpZiAodGhpcy5jb25maWcuZHJhZ01vZGUpIHtcblx0XHRcdGRyYWdNYW5hZ2VyLnNldEl0ZW0odGhpcy5fdWlkLCB0aGlzKTtcblx0XHR9XG5cblx0XHRjb25zdCB2aWV3ID0gIGNyZWF0ZSh7XG5cdFx0XHRyZW5kZXI6ICgpID0+IHRoaXMuX2RyYXcoKSxcblx0XHRcdGhvb2tzOiB7XG5cdFx0XHRcdGRpZFJlZHJhdzogKHZtKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3Qgcm9vdEVsID0gdm0ubm9kZS5lbDtcblx0XHRcdFx0XHRjb25zdCBoYXNTY3JvbGwgPSByb290RWwuc2Nyb2xsSGVpZ2h0ID4gcm9vdEVsLm9mZnNldEhlaWdodDtcblx0XHRcdFx0XHRjb25zdCBjbGFzc0F0dHI6IHN0cmluZyA9IHZtLm5vZGUuYXR0cnMuY2xhc3MucmVwbGFjZShcIiBkaHhfZGF0YXZpZXctLWhhcy1zY3JvbGxcIiwgXCJcIik7XG5cdFx0XHRcdFx0Y29uc3QgbmV3Q2xhc3NOYW1lID0gaGFzU2Nyb2xsID8gY2xhc3NBdHRyICsgXCIgZGh4X2RhdGF2aWV3LS1oYXMtc2Nyb2xsXCIgOiBjbGFzc0F0dHI7XG5cdFx0XHRcdFx0dm0ubm9kZS5wYXRjaCh7Y2xhc3M6IG5ld0NsYXNzTmFtZX0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0dGhpcy5tb3VudChub2RlLCB2aWV3KTtcblx0fVxuXG5cdHNldEZvY3VzSW5kZXgoaW5kZXg6IG51bWJlcikge1xuXHRcdGlmIChpbmRleCA8IDApIHtcblx0XHRcdHRoaXMuX2ZvY3VzSW5kZXggPSAwO1xuXHRcdH0gZWxzZSBpZiAoaW5kZXggPiB0aGlzLmRhdGEuZ2V0TGVuZ3RoKCkgLSAxKSB7XG5cdFx0XHR0aGlzLl9mb2N1c0luZGV4ID0gdGhpcy5kYXRhLmdldExlbmd0aCgpIC0gMTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5fZm9jdXNJbmRleCA9IGluZGV4O1xuXHRcdH1cblx0XHRjb25zdCBub2RlID0gdGhpcy5nZXRSb290Tm9kZSgpO1xuXHRcdGlmICghbm9kZSB8fCAhbm9kZS5wYXJlbnROb2RlKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGNsaWVudEhlaWdodCA9IChub2RlLnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLm9mZnNldEhlaWdodDtcblxuXHRcdGNvbnN0IGl0ZW1Sb3cgPSBub2RlLmNoaWxkcmVuW01hdGguZmxvb3IodGhpcy5fZm9jdXNJbmRleCAvIHRoaXMuY29uZmlnLml0ZW1zSW5Sb3cpXSBhcyBIVE1MRWxlbWVudDtcblx0XHRpZiAoaXRlbVJvdykge1xuXHRcdFx0Y29uc3QgaXRlbSA9IGl0ZW1Sb3cuY2hpbGRyZW5bdGhpcy5fZm9jdXNJbmRleCAlIHRoaXMuY29uZmlnLml0ZW1zSW5Sb3ddIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0aWYgKGl0ZW0ub2Zmc2V0VG9wID49IG5vZGUuc2Nyb2xsVG9wICsgY2xpZW50SGVpZ2h0KSB7XG5cdFx0XHRcdGl0ZW0uc2Nyb2xsSW50b1ZpZXcoZmFsc2UpO1xuXHRcdFx0fSBlbHNlIGlmIChpdGVtLm9mZnNldFRvcCA8IG5vZGUuc2Nyb2xsVG9wKSB7XG5cdFx0XHRcdGl0ZW0uc2Nyb2xsSW50b1ZpZXcodHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRoaXMuZXZlbnRzLmZpcmUoRGF0YVZpZXdFdmVudHMuZm9jdXNDaGFuZ2UsIFt0aGlzLl9mb2N1c0luZGV4LCB0aGlzLmRhdGEuZ2V0SWQodGhpcy5fZm9jdXNJbmRleCldKTtcblx0XHR0aGlzLnBhaW50KCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGdldEZvY3VzSW5kZXgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvY3VzSW5kZXg7XG5cdH1cblx0Z2V0Rm9jdXNJdGVtKCkge1xuXHRcdHJldHVybiB0aGlzLmRhdGEuZ2V0SXRlbSh0aGlzLmRhdGEuZ2V0SWQodGhpcy5fZm9jdXNJbmRleCkpO1xuXHR9XG5cdHNldEl0ZW1JblJvdyhhbW91bnQpIHtcblx0XHR0aGlzLmNvbmZpZy5pdGVtc0luUm93ID0gYW1vdW50O1xuXHRcdHRoaXMucGFpbnQoKTtcblx0fVxuXHRkZXN0cnVjdG9yKCkge1xuXHRcdHRoaXMuZXZlbnRzLmNsZWFyKCk7XG5cdFx0aWYgKHRoaXMuX25hdmlnYXRpb25EZXN0cnVjdG9yKSB7XG5cdFx0XHR0aGlzLl9uYXZpZ2F0aW9uRGVzdHJ1Y3RvcigpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5fZG9jdW1lbnRDbGlja0Rlc3R1Y3Rvcikge1xuXHRcdFx0dGhpcy5fZG9jdW1lbnRDbGlja0Rlc3R1Y3RvcigpO1xuXHRcdH1cblx0XHR0aGlzLnVubW91bnQoKTtcblx0fVxuXHRwcml2YXRlIF9yZW5kZXJJdGVtKGl0ZW06IGFueSwgZm9jdXM6IGJvb2xlYW4sIGlzTGFzdEl0ZW1JblJvdzogYm9vbGVhbikgOiBWTm9kZSB7XG5cdFx0Y29uc3Qge2l0ZW1zSW5Sb3csIGdhcCwgdGVtcGxhdGV9ID0gdGhpcy5jb25maWc7XG5cdFx0Y29uc3QgaHRtbCA9IHRlbXBsYXRlID8gdGVtcGxhdGUoaXRlbSkgOiBpdGVtLmh0bWxDb250ZW50O1xuXHRcdGNvbnN0IGdhcFdpdGhQeCA9IChnYXBTaXplOiBhbnkpID0+IHBhcnNlRmxvYXQoZ2FwU2l6ZSk7XG5cdFx0cmV0dXJuIGVsKFwiZGl2XCIsIHtcblx0XHRcdC8vIHRhYmluZGV4OiBcIjFcIixcblx0XHRcdGNsYXNzOiBcImRoeF9kYXRhdmlldy1pdGVtXCIgK1xuXHRcdFx0KGl0ZW0uJHNlbGVjdGVkID8gXCIgZGh4X2RhdGF2aWV3LWl0ZW0tLXNlbGVjdGVkXCIgOiBcIlwiKSArXG5cdFx0XHQoZm9jdXMgPyBcIiBkaHhfZGF0YXZpZXctaXRlbS0tZm9jdXNcIiA6IFwiXCIpICtcblx0XHRcdChpdGVtLiRkcm9waGVyZSA/IFwiIGRoeF9kYXRhdmlldy1pdGVtLS1kcm9waGVyZVwiIDogXCJcIikgK1xuXHRcdFx0KGl0ZW0uJGRyYWd0YXJnZXQgPyBcIiBkaHhfZGF0YXZpZXctaXRlbS0tZHJhZ3RhcmdldFwiIDogXCJcIikgK1xuXHRcdFx0KHRoaXMuY29uZmlnLmRyYWdNb2RlID8gXCIgZGh4X2RhdGF2aWV3LWl0ZW0tLWRyYWdcIiA6IFwiXCIpICtcblx0XHRcdChnYXBXaXRoUHgoZ2FwKSA/IFwiIGRoeF9kYXRhdmlldy1pdGVtLS13aXRoLWdhcFwiOiBcIlwiKSArXG5cdFx0XHQoaXRlbS5jc3MgPyBcIiBcIiArIGl0ZW0uY3NzIDogXCJcIikgK1xuXHRcdFx0KGlzTGFzdEl0ZW1JblJvdyA/IFwiIGRoeF9kYXRhdmlldy1pdGVtLS1sYXN0LWl0ZW0taW4tcm93XCIgOiBcIlwiKSxcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFwid2lkdGhcIjogYGNhbGMoJHsxMDAvaXRlbXNJblJvd30lIC0gJHtnYXBXaXRoUHgoZ2FwKX0gKiAkeyhpdGVtc0luUm93IC0gMSkgLyBpdGVtc0luUm93fXB4KWAsXG5cdFx0XHRcdFwibWFyZ2luLXJpZ2h0XCI6IGlzTGFzdEl0ZW1JblJvdyA/IFwiXCIgOiBnYXAsXG5cdFx0XHR9LFxuXHRcdFx0X2tleTogaXRlbS5pZCxcblx0XHRcdGRoeF9pZDogaXRlbS5pZFxuXHRcdH0sXG5cdFx0aHRtbCA/IFsgZWwoXCIuZGh4X2RhdGF2aWV3LWl0ZW1fX2lubmVyLWh0bWxcIiwge1xuXHRcdFx0XCIuaW5uZXJIVE1MXCI6IGh0bWxcblx0XHR9KV0gOiBpdGVtLnZhbHVlIHx8IGl0ZW0udGV4dCB8fCBpdGVtLnZhbHVlKTtcblx0fVxuXHRwcml2YXRlIF9kcmF3KCkgOiBWTm9kZSB7XG5cdFx0Y29uc3QgeyBpdGVtc0luUm93LCBjc3MsIGdhcCB9ID0gdGhpcy5jb25maWc7XG5cdFx0bGV0IGN1cnJlbnRDb3VudGVyID0gMDtcblx0XHRjb25zdCByb3dzID0gdGhpcy5kYXRhLnJlZHVjZSgoaXRlbXMsIG9iaiwgaW5kZXgpID0+IHtcblx0XHRcdGlmKGN1cnJlbnRDb3VudGVyID09PSAwKSB7XG5cdFx0XHRcdGl0ZW1zLnB1c2goW10pO1xuXHRcdFx0fVxuXHRcdFx0aXRlbXNbaXRlbXMubGVuZ3RoIC0gMV0ucHVzaCh0aGlzLl9yZW5kZXJJdGVtKG9iaiwgaW5kZXggPT09IHRoaXMuX2ZvY3VzSW5kZXgsIGN1cnJlbnRDb3VudGVyID09PSBpdGVtc0luUm93IC0gMSkpO1xuXHRcdFx0Y3VycmVudENvdW50ZXIgPSAoY3VycmVudENvdW50ZXIgKyAxKSAlIGl0ZW1zSW5Sb3c7XG5cdFx0XHRyZXR1cm4gaXRlbXM7XG5cdFx0fSwgW10pO1xuXHRcdHJldHVybiBlbCAoXCIuZGh4X3dpZGdldC5kaHhfZGF0YXZpZXdcIiwge1xuXHRcdFx0Li4udGhpcy5faGFuZGxlcnMsXG5cdFx0XHRkaHhfd2lkZ2V0X2lkOiB0aGlzLl91aWQsXG5cdFx0XHRjbGFzczogY3NzID8gY3NzIDogXCJcIixcblx0XHR9LCByb3dzLm1hcChyb3cgPT4gZWwoXCIuZGh4X2RhdGF2aWV3LXJvd1wiLCB7XG5cdFx0XHRzdHlsZToge21hcmdpbjogZ2FwfSxcblx0XHR9LCAgcm93KSkpO1xuXHR9XG59IiwiaW1wb3J0IFwiLi4vLi4vc3R5bGVzL2RhdGF2aWV3LnNjc3NcIjtcbmV4cG9ydCB7IERhdGFWaWV3IH0gZnJvbSBcIi4vRGF0YVZpZXdcIjtcbiIsImltcG9ydCB7IERhdGFDb2xsZWN0aW9uLCBEYXRhRXZlbnRzLCBEcmFnRXZlbnRzLCBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwLCBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwLCBJRHJhZ0NvbmZpZyB9IGZyb20gXCJAZGh4L3RzLWRhdGFcIjtcbmltcG9ydCB7IElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IElTZWxlY3Rpb24gfSBmcm9tIFwiQGRoeC90cy1saXN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFWaWV3Q29uZmlnIGV4dGVuZHMgSURyYWdDb25maWcge1xuXHRkYXRhPzogRGF0YUNvbGxlY3Rpb248YW55PiB8IGFueVtdO1xuXHRpdGVtc0luUm93PzogbnVtYmVyO1xuXHRnYXA/OiBudW1iZXI7XG5cdHRlbXBsYXRlPzogKGl0ZW06IGFueSkgPT4gc3RyaW5nO1xuXHRhcnJvd05hdmlnYXRpb24/OiBib29sZWFuIHwgKCgpID0+IGJvb2xlYW4pO1xuXHRjc3M/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSURhdGFWaWV3PFQgPSBhbnk+IHtcblx0Y29uZmlnOiBJRGF0YVZpZXdDb25maWc7XG5cdGRhdGE6IERhdGFDb2xsZWN0aW9uPFQ+O1xuXHRldmVudHM6IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzIHwgRHJhZ0V2ZW50cyB8IERhdGFWaWV3RXZlbnRzLCBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwICYgSURyYWdFdmVudHNIYW5kbGVyc01hcCAmIElEYXRhVmlld0V2ZW50SGFuZGxlcnNNYXA+O1xuXHRzZWxlY3Rpb246IElTZWxlY3Rpb247XG5cblx0c2V0Rm9jdXNJbmRleChpbmRleDogbnVtYmVyKTogdm9pZDtcblx0Z2V0Rm9jdXNJbmRleCgpOiBudW1iZXI7XG5cdGdldEZvY3VzSXRlbSgpOiBUO1xuXHRkZXN0cnVjdG9yKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBlbnVtIERhdGFWaWV3RXZlbnRzIHtcblx0Y2xpY2sgPSBcImNsaWNrXCIsXG5cdGNvbnRleHRtZW51ID0gXCJjb250ZXh0bWVudVwiLFxuXHRmb2N1c0NoYW5nZSA9IFwiZm9jdXNjaGFuZ2VcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElEYXRhVmlld0V2ZW50SGFuZGxlcnNNYXAge1xuXHRba2V5OiBzdHJpbmddOiAoLi4uYXJnczogYW55W10pID0+IGFueTtcblx0W0RhdGFWaWV3RXZlbnRzLmNsaWNrXTogKGlkOiBzdHJpbmcsIGU6IEV2ZW50KSA9PiBhbnk7XG5cdFtEYXRhVmlld0V2ZW50cy5jb250ZXh0bWVudV06IChpZDogc3RyaW5nLCBlOiBNb3VzZUV2ZW50KSA9PiBhbnk7XG5cdFtEYXRhVmlld0V2ZW50cy5mb2N1c0NoYW5nZV06IChmb2N1c0luZGV4OiBudW1iZXIsIGlkOiBzdHJpbmcpID0+IGFueTtcbn0iLCJleHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL0xpc3RcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3NvdXJjZXMvU2VsZWN0aW9uXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9zb3VyY2VzL3R5cGVzXCI7IiwiaW1wb3J0IHsgZXh0ZW5kLCBkZXRlY3RXaWRnZXRDbGljayB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9jb3JlXCI7XG5pbXBvcnQgeyBEYXRhQ29sbGVjdGlvbiwgZHJhZ01hbmFnZXIsIERhdGFFdmVudHMsIERyYWdFdmVudHMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAsIElEcmFnRXZlbnRzSGFuZGxlcnNNYXAgfSBmcm9tIFwiQGRoeC90cy1kYXRhXCI7XG5cbmltcG9ydCB7IGNyZWF0ZSwgZWwsIFZOb2RlIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2RvbVwiO1xuaW1wb3J0IHsgRXZlbnRTeXN0ZW0sIElFdmVudFN5c3RlbSB9IGZyb20gXCJAZGh4L3RzLWNvbW1vbi9ldmVudHNcIjtcbmltcG9ydCB7IGFkZEhvdGtleXMgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vS2V5bWFuYWdlclwiO1xuaW1wb3J0IHsgSUhhbmRsZXJzLCBTZWxlY3Rpb25FdmVudHMgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdmlld1wiO1xuaW1wb3J0IHsgU2VsZWN0aW9uIH0gZnJvbSBcIi4vU2VsZWN0aW9uXCI7XG5pbXBvcnQgeyBsb2NhdGUgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vaHRtbFwiO1xuaW1wb3J0IHsgSUxpc3RDb25maWcsIExpc3RFdmVudHMsIElMaXN0RXZlbnRIYW5kbGVyc01hcCwgSVNlbGVjdGlvbiwgSUxpc3QgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdCBleHRlbmRzIFZpZXcgaW1wbGVtZW50cyBJTGlzdCB7XG5cdHB1YmxpYyBjb25maWc6IElMaXN0Q29uZmlnO1xuXHRwdWJsaWMgZGF0YTogRGF0YUNvbGxlY3Rpb247XG5cdHB1YmxpYyBldmVudHM6IElFdmVudFN5c3RlbTxEYXRhRXZlbnRzIHwgTGlzdEV2ZW50cyB8IERyYWdFdmVudHMsIElMaXN0RXZlbnRIYW5kbGVyc01hcCAmIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAgJiBJRHJhZ0V2ZW50c0hhbmRsZXJzTWFwPjtcblx0cHVibGljIHNlbGVjdGlvbjogSVNlbGVjdGlvbjtcblxuXHRwcm90ZWN0ZWQgX2hhbmRsZXJzOiBJSGFuZGxlcnM7XG5cblx0cHJpdmF0ZSBfcmFuZ2U6IFtudW1iZXIsIG51bWJlcl07XG5cdHByaXZhdGUgX3Zpc2libGVIZWlnaHQ6IG51bWJlcjtcblx0cHJpdmF0ZSBfdG9wT2Zmc2V0OiBudW1iZXI7XG5cblx0cHJpdmF0ZSBfbmF2aWdhdGlvbkRlc3RydWN0b3I6ICgpID0+IHZvaWQ7XG5cblx0cHJpdmF0ZSBfd2lkZ2V0SW5Gb2N1czogYm9vbGVhbjtcblx0cHJpdmF0ZSBfZG9jdW1lbnRDbGlja0Rlc3R1Y3RvcjogKCkgPT4gdm9pZDtcblxuXHRwcml2YXRlIF9mb2N1c0luZGV4OiBudW1iZXI7XG5cblx0Y29uc3RydWN0b3Iobm9kZTogSFRNTEVsZW1lbnR8c3RyaW5nLCBjb25maWc6IElMaXN0Q29uZmlnID0ge30pe1xuXHRcdHN1cGVyKG5vZGUsIGV4dGVuZCh7XG5cdFx0XHRpdGVtSGVpZ2h0OiBjb25maWcudmlydHVhbCA/IDM0IDogY29uZmlnLml0ZW1IZWlnaHQgfHwgbnVsbCxcblx0XHRcdGFycm93TmF2aWdhdGlvbjogZmFsc2Vcblx0XHR9LCBjb25maWcpKTtcblxuXG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb25maWcuZGF0YSkpIHtcblx0XHRcdHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50U3lzdGVtPERhdGFFdmVudHM+KHRoaXMpO1xuXHRcdFx0dGhpcy5kYXRhID0gbmV3IERhdGFDb2xsZWN0aW9uKHt9LCB0aGlzLmV2ZW50cyk7XG5cdFx0XHR0aGlzLmRhdGEucGFyc2UodGhpcy5jb25maWcuZGF0YSk7XG5cdFx0fSBlbHNlIGlmICh0aGlzLmNvbmZpZy5kYXRhICYmIHRoaXMuY29uZmlnLmRhdGEuZXZlbnRzKSB7XG5cdFx0XHR0aGlzLmRhdGEgPSB0aGlzLmNvbmZpZy5kYXRhO1xuXHRcdFx0dGhpcy5ldmVudHMgPSB0aGlzLmRhdGEuZXZlbnRzO1xuXHRcdFx0dGhpcy5ldmVudHMuY29udGV4dCA9IHRoaXM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMuZXZlbnRzID0gbmV3IEV2ZW50U3lzdGVtPERhdGFFdmVudHM+KHRoaXMpO1xuXHRcdFx0dGhpcy5kYXRhID0gbmV3IERhdGFDb2xsZWN0aW9uKHt9LCB0aGlzLmV2ZW50cyk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zZWxlY3Rpb24gPSBuZXcgU2VsZWN0aW9uKHt9LCB0aGlzLmRhdGEpO1xuXG5cdFx0aWYgKHRoaXMuY29uZmlnLmFycm93TmF2aWdhdGlvbikge1xuXHRcdFx0bGV0IGFycm93TmF2aWdhdGlvbiA9IHRoaXMuY29uZmlnLmFycm93TmF2aWdhdGlvbiBhcyBhbnk7XG5cdFx0XHRpZiAodHlwZW9mIHRoaXMuY29uZmlnLmFycm93TmF2aWdhdGlvbiAhPT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdHRoaXMuX3dpZGdldEluRm9jdXMgPSBmYWxzZTtcblx0XHRcdFx0YXJyb3dOYXZpZ2F0aW9uID0gKCkgPT4gdGhpcy5fd2lkZ2V0SW5Gb2N1cztcblx0XHRcdFx0dGhpcy5fZG9jdW1lbnRDbGlja0Rlc3R1Y3RvciA9IGRldGVjdFdpZGdldENsaWNrKHRoaXMuX3VpZCwgaXNJbm5lckNsaWNrID0+IHRoaXMuX3dpZGdldEluRm9jdXMgPSBpc0lubmVyQ2xpY2spO1xuXHRcdFx0fVxuXHRcdFx0Y29uc3QgcHJldmVudEV2ZW50ID0gKGZuOiAoKSA9PiB2b2lkKSA9PiAoZTogRXZlbnQpID0+IHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRmbigpO1xuXHRcdFx0fTtcblx0XHRcdHRoaXMuX25hdmlnYXRpb25EZXN0cnVjdG9yID0gYWRkSG90a2V5cyhcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGFycm93ZG93bjogcHJldmVudEV2ZW50KCgpID0+IHRoaXMuc2V0Rm9jdXNJbmRleCh0aGlzLl9mb2N1c0luZGV4ICsgMSkpLFxuXHRcdFx0XHRcdGFycm93dXA6IHByZXZlbnRFdmVudCgoKSA9PiB0aGlzLnNldEZvY3VzSW5kZXgodGhpcy5fZm9jdXNJbmRleCAtIDEpKSxcblx0XHRcdFx0XHRlbnRlcjogKGU6IEtleWJvYXJkRXZlbnQpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IGlkID0gdGhpcy5kYXRhLmdldElkKHRoaXMuX2ZvY3VzSW5kZXgpO1xuXHRcdFx0XHRcdFx0dGhpcy5zZWxlY3Rpb24uYWRkKGlkKTtcblx0XHRcdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoTGlzdEV2ZW50cy5jbGljaywgW2lkLCBlXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcnJvd05hdmlnYXRpb25cblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0Y29uc3QgdXBkYXRlciA9ICh1cGRhdGVPYmo6IGFueSkgPT4gKGlkOiBzdHJpbmcpID0+IHtcblx0XHRcdGlmICh0aGlzLmRhdGEuZXhpc3RzKGlkKSkge1xuXHRcdFx0XHR0aGlzLmRhdGEudXBkYXRlKGlkLCB1cGRhdGVPYmopO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR0aGlzLmV2ZW50cy5vbihEYXRhRXZlbnRzLmNoYW5nZSwgKCkgPT4gdGhpcy5wYWludCgpKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmNhbkRyb3AsIHVwZGF0ZXIoeyRkcm9waGVyZTogdHJ1ZX0pKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmNhbmNlbERyb3AsIHVwZGF0ZXIoeyRkcm9waGVyZTogdW5kZWZpbmVkfSkpO1xuXHRcdHRoaXMuZXZlbnRzLm9uKERyYWdFdmVudHMuZHJhZ1N0YXJ0LCB1cGRhdGVyKHskZHJhZ3RhcmdldDogdHJ1ZX0pKTtcblx0XHR0aGlzLmV2ZW50cy5vbihEcmFnRXZlbnRzLmRyYWdFbmQsIHVwZGF0ZXIoeyRkcmFndGFyZ2V0OiB1bmRlZmluZWR9KSk7XG5cblx0XHR0aGlzLnNlbGVjdGlvbi5ldmVudHMub24oU2VsZWN0aW9uRXZlbnRzLmFmdGVyU2VsZWN0LCBpZCA9PiB7XG5cdFx0XHR0aGlzLnNldEZvY3VzSW5kZXgodGhpcy5kYXRhLmdldEluZGV4KGlkKSk7XG5cdFx0fSk7XG5cblx0XHR0aGlzLl9oYW5kbGVycyA9IHtcblx0XHRcdG9ubW91c2Vkb3duOiAoZTogTW91c2VFdmVudCkgPT4gdGhpcy5jb25maWcuZHJhZ01vZGUgPyBkcmFnTWFuYWdlci5vbk1vdXNlRG93bihlKSA6IG51bGwsXG5cdFx0XHRvbmRyYWdzdGFydDogKCkgPT4gdGhpcy5jb25maWcuZHJhZ01vZGUgPyBmYWxzZSA6IG51bGwsXG5cdFx0XHRvbmNvbnRleHRtZW51OiAoZTogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHRjb25zdCBpZCA9IGxvY2F0ZShlKTtcblx0XHRcdFx0aWYgKCFpZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLmV2ZW50cy5maXJlKExpc3RFdmVudHMuY29udGV4dG1lbnUsIFtpZCwgZV0pO1xuXHRcdFx0fSxcblx0XHRcdG9uY2xpY2s6IChlOiBNb3VzZUV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGlkID0gbG9jYXRlKGUpO1xuXHRcdFx0XHRpZiAoIWlkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRoaXMuc2VsZWN0aW9uLmFkZChpZCk7XG5cdFx0XHRcdHRoaXMuZXZlbnRzLmZpcmUoTGlzdEV2ZW50cy5jbGljaywgW2lkLCBlXSk7XG5cdFx0XHR9LFxuXHRcdFx0b25zY3JvbGw6IChlOiBhbnkpID0+IHRoaXMuY29uZmlnLnZpcnR1YWwgPyB0aGlzLl91cGRhdGVWaXJ0dWFsKGUudGFyZ2V0LnNjcm9sbFRvcCkgOiBudWxsXG5cdFx0fTtcblx0XHRpZiAodGhpcy5jb25maWcuZHJhZ01vZGUpIHtcblx0XHRcdGRyYWdNYW5hZ2VyLnNldEl0ZW0odGhpcy5fdWlkLCB0aGlzKTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jb25maWcudmlydHVhbCkge1xuXHRcdFx0dGhpcy5fcmFuZ2UgPSBbMCwgMF07XG5cdFx0XHR0aGlzLl90b3BPZmZzZXQgPSAwO1xuXHRcdH1cblxuXHRcdGNvbnN0IHZpZXcgPSAgY3JlYXRlKHtcblx0XHRcdHJlbmRlcjogKCkgPT4gdGhpcy5jb25maWcudmlydHVhbCA/IHRoaXMuX3JlbmRlclZpcnR1YWxMaXN0KCkgOiB0aGlzLl9yZW5kZXJMaXN0KCksXG5cdFx0XHRob29rczoge1xuXHRcdFx0XHRkaWRNb3VudDogKHZtOiBhbnkpID0+IHtcblx0XHRcdFx0XHRpZiAoIXRoaXMuY29uZmlnLmhlaWdodCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZWxlbWVudDogSFRNTEVsZW1lbnQgPSB2bS5ub2RlLmVsO1xuXHRcdFx0XHRcdFx0dGhpcy5jb25maWcuaGVpZ2h0ID0gKGVsZW1lbnQgJiYgZWxlbWVudC5wYXJlbnROb2RlICYmIChlbGVtZW50LnBhcmVudE5vZGUgYXMgSFRNTEVsZW1lbnQpLm9mZnNldEhlaWdodCkgfHwgMjAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGhpcy5jb25maWcudmlydHVhbCkge1xuXHRcdFx0XHRcdFx0dGhpcy5fdmlzaWJsZUhlaWdodCA9IHRoaXMuY29uZmlnLmhlaWdodDtcblx0XHRcdFx0XHRcdHRoaXMuX3VwZGF0ZVZpcnR1YWwoMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRoaXMucGFpbnQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHRoaXMubW91bnQobm9kZSwgdmlldyk7XG5cdH1cblx0c2V0Rm9jdXNJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG5cdFx0aWYgKGluZGV4IDwgMCB8fCBpbmRleCA+IHRoaXMuZGF0YS5nZXRMZW5ndGgoKSAtIDEpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0dGhpcy5fZm9jdXNJbmRleCA9IGluZGV4O1xuXG5cdFx0Y29uc3Qgcm9vdFZpZXcgPSB0aGlzLmdldFJvb3RWaWV3KCk7XG5cdFx0aWYgKCFyb290VmlldyB8fCAhcm9vdFZpZXcubm9kZSB8fCAhcm9vdFZpZXcubm9kZS5lbCkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGxpc3RFbDogSFRNTEVsZW1lbnQgPSB0aGlzLmdldFJvb3ROb2RlKCk7XG5cdFx0aWYgKCFsaXN0RWwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5jb25maWcudmlydHVhbCkge1xuXHRcdFx0Y29uc3QgcG9zaXRpb24gPSBpbmRleCAqIHRoaXMuY29uZmlnLml0ZW1IZWlnaHQ7XG5cdFx0XHRpZiAocG9zaXRpb24gPj0gdGhpcy5fdmlzaWJsZUhlaWdodCArIHRoaXMuX3RvcE9mZnNldCB8fCBwb3NpdGlvbiA8IHRoaXMuX3RvcE9mZnNldCkge1xuXHRcdFx0XHRsaXN0RWwuc2Nyb2xsVG8oMCwgcG9zaXRpb24pO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zdCBsaXN0SXRlbTogSFRNTEVsZW1lbnQgPSBsaXN0RWwuY2hpbGRyZW5baW5kZXhdIGFzIEhUTUxFbGVtZW50O1xuXHRcdFx0aWYgKCFsaXN0SXRlbSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAobGlzdEl0ZW0ub2Zmc2V0VG9wID49IGxpc3RFbC5zY3JvbGxUb3AgKyBsaXN0RWwuY2xpZW50SGVpZ2h0KSB7XG5cdFx0XHRcdGxpc3RJdGVtLnNjcm9sbEludG9WaWV3KGZhbHNlKTtcblx0XHRcdH0gZWxzZSBpZiAobGlzdEl0ZW0ub2Zmc2V0VG9wIDwgbGlzdEVsLnNjcm9sbFRvcCkge1xuXHRcdFx0XHRsaXN0SXRlbS5zY3JvbGxJbnRvVmlldyh0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy5ldmVudHMuZmlyZShMaXN0RXZlbnRzLmZvY3VzQ2hhbmdlLCBbdGhpcy5fZm9jdXNJbmRleCwgdGhpcy5kYXRhLmdldElkKHRoaXMuX2ZvY3VzSW5kZXgpXSk7XG5cdFx0dGhpcy5wYWludCgpO1xuXHR9XG5cdGdldEZvY3VzSXRlbSgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhLmdldElkKHRoaXMuX2ZvY3VzSW5kZXgpO1xuXHR9XG5cdGdldEZvY3VzSW5kZXgoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2ZvY3VzSW5kZXg7XG5cdH1cblx0ZGVzdHJ1Y3RvcigpIHtcblx0XHRpZiAodGhpcy5fbmF2aWdhdGlvbkRlc3RydWN0b3IpIHtcblx0XHRcdHRoaXMuX25hdmlnYXRpb25EZXN0cnVjdG9yKCk7XG5cdFx0fVxuXHRcdGlmICh0aGlzLl9kb2N1bWVudENsaWNrRGVzdHVjdG9yKSB7XG5cdFx0XHR0aGlzLl9kb2N1bWVudENsaWNrRGVzdHVjdG9yKCk7XG5cdFx0fVxuXHRcdHRoaXMudW5tb3VudCgpO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9yZW5kZXJJdGVtKGRhdGE6IGFueSwgaW5kZXg6IG51bWJlcik6IFZOb2RlIHtcblx0XHRjb25zdCBodG1sID0gKHRoaXMuY29uZmlnLnRlbXBsYXRlICYmIHRoaXMuY29uZmlnLnRlbXBsYXRlKGRhdGEpKSB8fCBkYXRhLmh0bWw7XG5cdFx0Y29uc3QgZm9jdXMgPSBpbmRleCA9PT0gdGhpcy5fZm9jdXNJbmRleDtcblx0XHRyZXR1cm4gaHRtbCA/IHRoaXMuX3JlbmRlckFzSHRtbChodG1sLCBkYXRhLCBmb2N1cykgOiB0aGlzLl9yZW5kZXJBc1ZhbHVlKGRhdGEsIGZvY3VzKTtcblx0fVxuXG5cdHByb3RlY3RlZCBfcmVuZGVyQXNIdG1sKGh0bWw6c3RyaW5nLCBpdGVtOmFueSwgZm9jdXM6IGJvb2xlYW4pOlZOb2RlIHtcblx0XHRjb25zdCB7aXRlbUhlaWdodH0gPSB0aGlzLmNvbmZpZztcblx0XHRyZXR1cm4gZWwoXCJsaVwiLCB7XG5cdFx0XHRcdFwiY2xhc3NcIjogXCJkaHhfbGlzdC1pdGVtXCIgK1xuXHRcdFx0XHQoaXRlbS4kc2VsZWN0ZWQgPyBcIiBkaHhfbGlzdC1pdGVtLS1zZWxlY3RlZFwiIDogXCJcIikgK1xuXHRcdFx0XHQoZm9jdXMgPyBcIiBkaHhfbGlzdC1pdGVtLS1mb2N1c1wiIDogXCJcIikgK1xuXHRcdFx0XHQoaXRlbS4kZHJvcGhlcmUgPyBcIiBkaHhfbGlzdC1pdGVtLS1kcm9waGVyZVwiIDogXCJcIikgK1xuXHRcdFx0XHQoaXRlbS4kZHJhZ3RhcmdldCA/IFwiIGRoeF9saXN0LWl0ZW0tLWRyYWd0YXJnZXRcIiA6IFwiXCIpICtcblx0XHRcdFx0KHRoaXMuY29uZmlnLmRyYWdNb2RlID8gXCIgZGh4X2xpc3QtaXRlbS0tZHJhZ1wiIDogXCJcIikgK1xuXHRcdFx0XHQoaXRlbS5jc3MgPyBcIiBcIiArIGl0ZW0uY3NzIDogXCJcIiksXG5cdFx0XHRcdFwiZGh4X2lkXCI6IGl0ZW0uaWQsXG5cdFx0XHRcdFwic3R5bGVcIjoge1xuXHRcdFx0XHRcdGhlaWdodDogaXRlbUhlaWdodFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRcIl9rZXlcIjogaXRlbS5pZCxcblx0XHRcdFx0XCIuaW5uZXJIVE1MXCI6IGh0bWxcblx0XHRcdH0sXG5cdFx0KTtcblx0fVxuXHRwcm90ZWN0ZWQgX3JlbmRlckFzVmFsdWUoaXRlbTphbnksIGZvY3VzOmJvb2xlYW4pOlZOb2RlIHtcblx0XHRjb25zdCB7aXRlbUhlaWdodH0gPSB0aGlzLmNvbmZpZztcblx0XHRyZXR1cm4gZWwoXCJsaVwiLCB7XG5cdFx0XHRcdGNsYXNzOiBcImRoeF9saXN0LWl0ZW0gZGh4X2xpc3QtaXRlbS0tdGV4dFwiICtcblx0XHRcdFx0KGl0ZW0uJHNlbGVjdGVkID8gXCIgZGh4X2xpc3QtaXRlbS0tc2VsZWN0ZWRcIiA6IFwiXCIpICtcblx0XHRcdFx0KGZvY3VzID8gXCIgZGh4X2xpc3QtaXRlbS0tZm9jdXNcIiA6IFwiXCIpICtcblx0XHRcdFx0KGl0ZW0uJGRyb3BoZXJlID8gXCIgZGh4X2xpc3QtaXRlbS0tZHJvcGhlcmVcIiA6IFwiXCIpICtcblx0XHRcdFx0KGl0ZW0uJGRyYWd0YXJnZXQgPyBcIiBkaHhfbGlzdC1pdGVtLS1kcmFndGFyZ2V0XCIgOiBcIlwiKSArXG5cdFx0XHRcdCh0aGlzLmNvbmZpZy5kcmFnTW9kZSA/IFwiIGRoeF9saXN0LWl0ZW0tLWRyYWdcIiA6IFwiXCIpICtcblx0XHRcdFx0KGl0ZW0uY3NzID8gXCIgXCIgKyBpdGVtLmNzcyA6IFwiXCIpLFxuXHRcdFx0XHRkaHhfaWQ6IGl0ZW0uaWQsXG5cdFx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFx0aGVpZ2h0OiBpdGVtSGVpZ2h0XG5cdFx0XHRcdH0sXG5cdFx0XHRcdF9rZXk6IGl0ZW0uaWQsXG5cdFx0XHR9LFxuXHRcdFx0aXRlbS50ZXh0IHx8IGl0ZW0udmFsdWVcblx0XHQpO1xuXHR9XG5cblx0cHJvdGVjdGVkIF9yZW5kZXJMaXN0KCk6IFZOb2RlIHtcblx0XHRjb25zdCBraWRzID0gdGhpcy5kYXRhLm1hcCgob2JqLCBpbmRleCkgPT4gdGhpcy5fcmVuZGVySXRlbShvYmosIGluZGV4KSk7XG5cblx0XHRyZXR1cm4gZWwoXCJ1bC5kaHhfd2lkZ2V0LmRoeF9saXN0XCIsIHtcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFwibWF4LWhlaWdodFwiOiB0aGlzLmNvbmZpZy5oZWlnaHQgKyBcInB4XCJcblx0XHRcdH0sXG5cdFx0XHRjbGFzczogdGhpcy5jb25maWcuY3NzLFxuXHRcdFx0ZGh4X3dpZGdldF9pZDogdGhpcy5fdWlkLFxuXHRcdFx0Li4udGhpcy5faGFuZGxlcnNcblx0XHR9LCBraWRzKTtcblx0fVxuXHRwcm90ZWN0ZWQgX3JlbmRlclZpcnR1YWxMaXN0KCk6IFZOb2RlIHtcblx0XHRjb25zdCBraWRzID0gdGhpcy5kYXRhLm1hcFJhbmdlKHRoaXMuX3JhbmdlWzBdLCB0aGlzLl9yYW5nZVsxXSwgKG9iaiwgaW5kZXgpID0+IHRoaXMuX3JlbmRlckl0ZW0ob2JqLCBpbmRleCkpO1xuXG5cdFx0cmV0dXJuIGVsKFwiLmRoeF93aWRnZXQuZGh4X3ZpcnR1YWwtbGlzdC13cmFwcGVyXCIsIHtcblx0XHRcdGRoeF93aWRnZXRfaWQ6IHRoaXMuX3VpZCxcblx0XHRcdHN0eWxlOiB7XG5cdFx0XHRcdFwibWF4LWhlaWdodFwiOiB0aGlzLl92aXNpYmxlSGVpZ2h0XG5cdFx0XHR9LFxuXHRcdFx0Li4udGhpcy5faGFuZGxlcnNcblx0XHR9LFxuXHRcdFtcblx0XHRcdGVsKFwidWwuZGh4X2xpc3QuZGh4X2xpc3QtLXZpcnR1YWxcIiwge1xuXHRcdFx0XHRjbGFzczogdGhpcy5jb25maWcuY3NzLFxuXHRcdFx0XHRzdHlsZToge1xuXHRcdFx0XHRcdFwiaGVpZ2h0XCI6IHRoaXMuX2dldEhlaWdodCgpICsgXCJweFwiLFxuXHRcdFx0XHRcdFwicGFkZGluZy10b3BcIjogdGhpcy5fdG9wT2Zmc2V0ICsgXCJweFwiXG5cdFx0XHRcdH0sXG5cdFx0XHR9LCBraWRzKVxuXHRcdF0pO1xuXHR9XG5cdHByaXZhdGUgX3VwZGF0ZVZpcnR1YWwocG9zaXRpb246IG51bWJlcikge1xuXHRcdGNvbnN0IG92ZXJzY2FuQ291bnQgPSA1O1xuXG5cdFx0Y29uc3QgY291bnQgPSBNYXRoLmZsb29yKHRoaXMuX3Zpc2libGVIZWlnaHQgLyB0aGlzLmNvbmZpZy5pdGVtSGVpZ2h0KSArIG92ZXJzY2FuQ291bnQ7XG5cblx0XHRjb25zdCBpbmRleCA9IE1hdGguZmxvb3IocG9zaXRpb24gLyB0aGlzLmNvbmZpZy5pdGVtSGVpZ2h0KTtcblxuXHRcdHRoaXMuX3JhbmdlID0gW2luZGV4LCBjb3VudCArIGluZGV4XTtcblxuXHRcdGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5fZ2V0SGVpZ2h0KCk7XG5cblx0XHRpZiAocG9zaXRpb24gPiB0b3RhbEhlaWdodCAtIHRoaXMuX3Zpc2libGVIZWlnaHQpIHtcblx0XHRcdHBvc2l0aW9uID0gdG90YWxIZWlnaHQgLSB0aGlzLl92aXNpYmxlSGVpZ2h0O1xuXHRcdH1cblxuXHRcdHRoaXMuX3RvcE9mZnNldCA9IHBvc2l0aW9uO1xuXG5cdFx0dGhpcy5wYWludCgpO1xuXHR9XG5cdHByaXZhdGUgX2dldEhlaWdodCgpIHtcblx0XHRyZXR1cm4gdGhpcy5kYXRhLmdldExlbmd0aCgpICogdGhpcy5jb25maWcuaXRlbUhlaWdodDtcblx0fVxufVxuIiwiaW1wb3J0IHsgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgU2VsZWN0aW9uRXZlbnRzLCBJU2VsZWN0aW9uRXZlbnRzSGFuZGxlcnNNYXAgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcbmltcG9ydCB7IERhdGFDb2xsZWN0aW9uLCBEYXRhRXZlbnRzLCBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwIH0gZnJvbSBcIkBkaHgvdHMtZGF0YVwiO1xuaW1wb3J0IHsgSVNlbGVjdGlvbkNvbmZpZywgSVNlbGVjdGlvbiB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZWxlY3Rpb24gaW1wbGVtZW50cyBJU2VsZWN0aW9uIHtcblx0cHVibGljIGNvbmZpZzogSVNlbGVjdGlvbkNvbmZpZztcblx0cHVibGljIGV2ZW50czogSUV2ZW50U3lzdGVtPFNlbGVjdGlvbkV2ZW50cyB8IERhdGFFdmVudHMsIElTZWxlY3Rpb25FdmVudHNIYW5kbGVyc01hcCAmIElEYXRhRXZlbnRzSGFuZGxlcnNNYXA+O1xuXG5cdHByaXZhdGUgX3NlbGVjdGVkOiBzdHJpbmdbXTtcblx0cHJpdmF0ZSBfZGF0YTogRGF0YUNvbGxlY3Rpb247XG5cblx0Y29uc3RydWN0b3IoY29uZmlnOiBJU2VsZWN0aW9uQ29uZmlnLCBkYXRhOkRhdGFDb2xsZWN0aW9uKSB7XG5cdFx0dGhpcy5jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5ldmVudHMgPSBkYXRhLmV2ZW50cyBhcyBJRXZlbnRTeXN0ZW08U2VsZWN0aW9uRXZlbnRzIHwgRGF0YUV2ZW50cz47XG5cdFx0dGhpcy5fZGF0YSA9IGRhdGE7XG5cblx0XHR0aGlzLl9zZWxlY3RlZCA9IFtdO1xuXG5cdFx0dGhpcy5fZGF0YS5ldmVudHMub24oRGF0YUV2ZW50cy5yZW1vdmVBbGwsICgpID0+IHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkID0gW107XG5cdFx0fSk7XG5cdFx0dGhpcy5fZGF0YS5ldmVudHMub24oRGF0YUV2ZW50cy5hZnRlclJlbW92ZSwgb2JqID0+IHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQuZmlsdGVyKGlkID0+IGlkICE9PSBvYmouaWQpO1xuXHRcdH0pO1xuXHR9XG5cblx0Z2V0SWQoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xuXHRcdGlmICh0aGlzLmNvbmZpZy5tdWx0aXNlbGVjdCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWRbMF07XG5cdH1cblxuXHRnZXRJdGVtKCk6YW55IHtcblx0XHRpZiAodGhpcy5fc2VsZWN0ZWQubGVuZ3RoKXtcblx0XHRcdGNvbnN0IGl0ZW1zID0gdGhpcy5fc2VsZWN0ZWQubWFwKGlkID0+IHRoaXMuX2RhdGEuZ2V0SXRlbShpZCkpO1xuXHRcdFx0cmV0dXJuIHRoaXMuY29uZmlnLm11bHRpc2VsZWN0ID8gaXRlbXMgOiBpdGVtc1swXTtcblx0XHR9XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblx0Y29udGFpbnMoaWQ/OiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRpZiAoaWQpIHtcblx0XHRcdHJldHVybiB0aGlzLl9zZWxlY3RlZC5pbmRleE9mKGlkKSA+IC0xO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2VsZWN0ZWQubGVuZ3RoID4gMDtcblx0fVxuXG5cdHJlbW92ZShpZD86IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdGlmICghaWQgJiYgIXRoaXMuX3NlbGVjdGVkLmxlbmd0aCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0aWYgKGlkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdW5zZWxlY3RJdGVtKGlkKTtcblx0XHR9XG5cdFx0dGhpcy5fc2VsZWN0ZWQuZm9yRWFjaChzZWxlY3RlZElkID0+IHRoaXMuX3Vuc2VsZWN0SXRlbShzZWxlY3RlZElkKSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRhZGQoaWQ6IHN0cmluZykge1xuXHRcdGlmICh0aGlzLl9zZWxlY3RlZC5pbmRleE9mKGlkKSAhPT0gLTEpIHtcblx0XHRcdGlmICh0aGlzLmNvbmZpZy5tdWx0aXNlbGVjdCkge1xuXHRcdFx0XHR0aGlzLl91bnNlbGVjdEl0ZW0oaWQpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZiAoIXRoaXMuY29uZmlnLm11bHRpc2VsZWN0KSB7XG5cdFx0XHR0aGlzLnJlbW92ZSgpO1xuXHRcdH1cblx0XHRpZiAodGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYmVmb3JlU2VsZWN0LCBbaWRdKSkge1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWQucHVzaChpZCk7XG5cdFx0XHR0aGlzLl9kYXRhLnVwZGF0ZShpZCwgeyAkc2VsZWN0ZWQ6IHRydWUgfSk7XG5cdFx0XHR0aGlzLmV2ZW50cy5maXJlKFNlbGVjdGlvbkV2ZW50cy5hZnRlclNlbGVjdCwgW2lkXSk7XG5cdFx0fVxuXHR9XG5cdHByaXZhdGUgX3Vuc2VsZWN0SXRlbShpZDogc3RyaW5nKSB7XG5cdFx0aWYgKHRoaXMuZXZlbnRzLmZpcmUoU2VsZWN0aW9uRXZlbnRzLmJlZm9yZVVuU2VsZWN0LCBbaWRdKSkge1xuXHRcdFx0dGhpcy5fZGF0YS51cGRhdGUoaWQsIHsgJHNlbGVjdGVkOiBmYWxzZSB9KTtcblx0XHRcdHRoaXMuX3NlbGVjdGVkID0gdGhpcy5fc2VsZWN0ZWQuZmlsdGVyKHNlbGVjdGVkSWQgPT4gc2VsZWN0ZWRJZCAhPT0gaWQpO1xuXHRcdFx0dGhpcy5ldmVudHMuZmlyZShTZWxlY3Rpb25FdmVudHMuYWZ0ZXJVblNlbGVjdCwgW2lkXSk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbiIsImltcG9ydCB7IElEYXRhSXRlbSwgRGF0YUNvbGxlY3Rpb24sIERhdGFFdmVudHMsIERyYWdFdmVudHMsIElEYXRhRXZlbnRzSGFuZGxlcnNNYXAsIElEcmFnRXZlbnRzSGFuZGxlcnNNYXAsIElEcmFnQ29uZmlnIH0gZnJvbSBcIkBkaHgvdHMtZGF0YVwiO1xuaW1wb3J0IHsgSUV2ZW50U3lzdGVtIH0gZnJvbSBcIkBkaHgvdHMtY29tbW9uL2V2ZW50c1wiO1xuaW1wb3J0IHsgU2VsZWN0aW9uRXZlbnRzLCBJU2VsZWN0aW9uRXZlbnRzSGFuZGxlcnNNYXAgfSBmcm9tIFwiQGRoeC90cy1jb21tb24vdHlwZXNcIjtcblxuZXhwb3J0IGVudW0gTGlzdEV2ZW50cyB7XG5cdGNvbnRleHRtZW51ID0gXCJjb250ZXh0bWVudVwiLFxuXHRjbGljayA9IFwiY2xpY2tcIixcblx0Zm9jdXNDaGFuZ2U9IFwiZm9jdXNjaGFuZ2VcIlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMaXN0Q29uZmlnIGV4dGVuZHMgSURyYWdDb25maWcge1xuXHR0ZW1wbGF0ZT86IChvYmo6IElEYXRhSXRlbSkgPT4gc3RyaW5nO1xuXHRkYXRhPzogRGF0YUNvbGxlY3Rpb248YW55PiB8IGFueVtdO1xuXHR2aXJ0dWFsPzogYm9vbGVhbjtcblx0aXRlbUhlaWdodD86IG51bWJlcjtcblx0Y3NzPzogc3RyaW5nO1xuXHRoZWlnaHQ/OiBudW1iZXI7XG5cdGFycm93TmF2aWdhdGlvbj86IGJvb2xlYW4gfCAoKCkgPT4gYm9vbGVhbik7IC8vIHdoZW4gcmV0dXJuIHRydWUsIG5hdmlnYXRpb24gd29ya1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElMaXN0RXZlbnRIYW5kbGVyc01hcCB7XG5cdFtrZXk6IHN0cmluZ106ICguLi5hcmdzOiBhbnlbXSkgPT4gYW55O1xuXHRbTGlzdEV2ZW50cy5jbGlja106IChpZDogc3RyaW5nLCBlOiBFdmVudCkgPT4gYW55O1xuXHRbTGlzdEV2ZW50cy5jb250ZXh0bWVudV06IChpZDogc3RyaW5nLCBlOiBNb3VzZUV2ZW50KSA9PiBhbnk7XG5cdFtMaXN0RXZlbnRzLmZvY3VzQ2hhbmdlXTogKGZvY3VzSW5kZXg6IG51bWJlciwgaWQ6IHN0cmluZykgPT4gYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTZWxlY3Rpb25Db25maWcge1xuXHRtdWx0aXNlbGVjdD86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUxpc3Q8VCA9IGFueT4ge1xuXHRjb25maWc6IElMaXN0Q29uZmlnO1xuXHRkYXRhOiBEYXRhQ29sbGVjdGlvbjxUPjtcblx0ZXZlbnRzOiBJRXZlbnRTeXN0ZW08RGF0YUV2ZW50cyB8IExpc3RFdmVudHMgfCBEcmFnRXZlbnRzLCBJTGlzdEV2ZW50SGFuZGxlcnNNYXAgJiBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwICYgSURyYWdFdmVudHNIYW5kbGVyc01hcD47XG5cdHNlbGVjdGlvbjogSVNlbGVjdGlvbjtcblxuXHRzZXRGb2N1c0luZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkO1xuXHRnZXRGb2N1c0l0ZW0oKTogVDtcblx0Z2V0Rm9jdXNJbmRleCgpOiBudW1iZXI7XG5cdGRlc3RydWN0b3IoKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2VsZWN0aW9uPFQgPSBhbnk+IHtcblx0Y29uZmlnOiBJU2VsZWN0aW9uQ29uZmlnO1xuXHRldmVudHM6IElFdmVudFN5c3RlbTxTZWxlY3Rpb25FdmVudHMgfCBEYXRhRXZlbnRzLCBJU2VsZWN0aW9uRXZlbnRzSGFuZGxlcnNNYXAgJiBJRGF0YUV2ZW50c0hhbmRsZXJzTWFwPjtcblxuXHRnZXRJZCgpOiBzdHJpbmcgfCBzdHJpbmdbXTtcblx0Z2V0SXRlbSgpOiBUO1xuXHRjb250YWlucyhpZD86IHN0cmluZyk6IGJvb2xlYW47XG5cdHJlbW92ZShpZD86IHN0cmluZyk6IGJvb2xlYW47XG5cdGFkZChpZDogc3RyaW5nKTogdm9pZDtcbn0iXSwic291cmNlUm9vdCI6IiJ9