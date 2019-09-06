/*
@license

undefined v.6.1.3 Professional

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
/******/ 	return __webpack_require__(__webpack_require__.s = 53);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom = __webpack_require__(60);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(4);
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
function isNumeric(val) {
    return !isNaN(val - parseFloat(val));
}
exports.isNumeric = isNumeric;


/***/ }),
/* 2 */
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var html_1 = __webpack_require__(4);
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
/* 4 */
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
__webpack_require__(59);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var types_1 = __webpack_require__(6);
function getFormItemCss(item, validate) {
    var _a;
    var labelInline = item.labelInline, required = item.required, disabled = item.disabled, hiddenLabel = item.hiddenLabel, css = item.css, $validationStatus = item.$validationStatus;
    var cssStatus = (_a = {},
        _a[types_1.ValidationStatus.pre] = "",
        _a[types_1.ValidationStatus.error] = " dhx_form-group--state_error",
        _a[types_1.ValidationStatus.success] = " dhx_form-group--state_success",
        _a)[$validationStatus] || "";
    var labelPositionCss = labelInline ? " dhx_form-group--inline" : "";
    var requiredCss = required ? " dhx_form-group--required" : "";
    var disabledCss = disabled ? " dhx_form-group--disabled" : "";
    var labelSrCss = hiddenLabel ? " dhx_form-group--label_sr" : "";
    if (validate) {
        return (css || "" +
            labelPositionCss +
            cssStatus +
            requiredCss +
            disabledCss +
            labelSrCss);
    }
    return (css || "" +
        labelPositionCss +
        disabledCss +
        labelSrCss);
}
exports.getFormItemCss = getFormItemCss;
var validators = (_a = {},
    _a[types_1.Validation.validAplhaNumeric] = /^[a-zA-Z0-9_]+$/,
    _a[types_1.Validation.validEmail] = /^.+@.+\..+$/,
    _a[types_1.Validation.validInteger] = /^\d+$/,
    _a[types_1.Validation.validIPv4] = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
    _a[types_1.Validation.validNumeric] = /^\d+(\.\d+)?$/,
    _a);
function getValidationMessage(item) {
    var _a;
    var validationMessage = (_a = {
            undefined: item.preMessage
        },
        _a[types_1.ValidationStatus.pre] = item.preMessage,
        _a[types_1.ValidationStatus.error] = item.errorMessage,
        _a[types_1.ValidationStatus.success] = item.successMessage,
        _a)[item.$validationStatus] || "";
    return validationMessage;
}
exports.getValidationMessage = getValidationMessage;
function validateTemplate(template, str) {
    return validators[template] ? validators[template].test(str) : true;
}
exports.validateTemplate = validateTemplate;
function isBlock(config) {
    return Boolean(config.rows) || Boolean(config.cols);
}
exports.isBlock = isBlock;
function validateInput(value, validation) {
    var isValid = true;
    if (typeof validation === "function") {
        isValid = validation(value);
    }
    else {
        var regExp = validators[validation];
        if (regExp) {
            isValid = regExp.test(value);
        }
    }
    return isValid;
}
exports.validateInput = validateInput;
function isTimeFormat(value, timeFormat) {
    if (timeFormat === 12) {
        return /(^0?([1-9][0-2]?):[0-5][0-9]?([AP][M]?)$)/i.test(value);
    }
    return /(^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$)/i.test(value);
}
exports.isTimeFormat = isTimeFormat;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FormItemType;
(function (FormItemType) {
    FormItemType["block"] = "block";
    FormItemType["input"] = "input";
    FormItemType["button"] = "button";
    FormItemType["combo"] = "combo";
    FormItemType["slider"] = "slider";
    FormItemType["radioButton"] = "radioButton";
    FormItemType["radioGroup"] = "radioGroup";
    FormItemType["checkbox"] = "checkbox";
    FormItemType["select"] = "select";
    FormItemType["simpleVault"] = "simpleVault";
    FormItemType["textarea"] = "textarea";
    FormItemType["timepicker"] = "timepicker";
    FormItemType["datepicker"] = "datepicker";
    FormItemType["colorpicker"] = "colorpicker";
    FormItemType["text"] = "text";
})(FormItemType = exports.FormItemType || (exports.FormItemType = {}));
var FormEvents;
(function (FormEvents) {
    FormEvents["change"] = "change";
    FormEvents["buttonClick"] = "buttonclick";
    FormEvents["validationFail"] = "validationfail";
    FormEvents["beforeSend"] = "beforesend";
    FormEvents["afterSend"] = "aftersend";
})(FormEvents = exports.FormEvents || (exports.FormEvents = {}));
var Validation;
(function (Validation) {
    Validation["empty"] = "";
    Validation["validEmail"] = "email";
    Validation["validInteger"] = "integer";
    Validation["validNumeric"] = "numeric";
    Validation["validAplhaNumeric"] = "alphanumeric";
    Validation["validIPv4"] = "IPv4";
})(Validation = exports.Validation || (exports.Validation = {}));
var ValidationStatus;
(function (ValidationStatus) {
    ValidationStatus[ValidationStatus["pre"] = 0] = "pre";
    ValidationStatus[ValidationStatus["error"] = 1] = "error";
    ValidationStatus[ValidationStatus["success"] = 2] = "success";
})(ValidationStatus = exports.ValidationStatus || (exports.ValidationStatus = {}));
var ClearMethod;
(function (ClearMethod) {
    ClearMethod["value"] = "value";
    ClearMethod["validation"] = "validation";
})(ClearMethod = exports.ClearMethod || (exports.ClearMethod = {}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(11));
__export(__webpack_require__(32));
__export(__webpack_require__(66));
__export(__webpack_require__(67));
__export(__webpack_require__(16));
__export(__webpack_require__(12));
__export(__webpack_require__(35));
__export(__webpack_require__(34));
__export(__webpack_require__(69));
__export(__webpack_require__(33));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(76));
__export(__webpack_require__(37));


/***/ }),
/* 9 */
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
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(3);
var ts_popup_1 = __webpack_require__(8);
var html_1 = __webpack_require__(4);
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, container, config) || this;
        if (_this.config.help) {
            _this._helper = new ts_popup_1.Popup({ css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light" });
            _this._helper.attachHTML(_this.config.help);
        }
        _this._handlers = __assign({ showHelper: function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this._helper.show(e.target, { mode: _this.config.labelInline ? html_1.Position.right : html_1.Position.bottom });
            } }, _this._getHandlers());
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    Label.prototype._getHandlers = function () {
        return {};
    };
    Label.prototype._init = function () {
        return;
    };
    Label.prototype._draw = function () {
        return this._drawLabel();
    };
    Label.prototype._drawLabel = function () {
        var _a = this.config, id = _a.id, labelInline = _a.labelInline, label = _a.label, labelWidth = _a.labelWidth, help = _a.help;
        var width = labelInline && labelWidth ? labelWidth : "";
        return dom_1.el("label.dhx_label", {
            for: id || this._uid,
            style: { minWidth: width, maxWidth: width },
            class: help ? "dhx_label--with-help" : ""
        }, help ? [
            dom_1.el("span.dhx_label__holder", label),
            dom_1.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                tabindex: "0",
                role: "button",
                onclick: this._handlers.showHelper
            }),
        ] : label);
    };
    return Label;
}(view_1.View));
exports.Label = Label;


/***/ }),
/* 10 */
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18), __webpack_require__(55).setImmediate))

/***/ }),
/* 11 */
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
    DataEvents["loadError"] = "loaderror";
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dataproxy_1 = __webpack_require__(16);
var drivers_1 = __webpack_require__(33);
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
    if (isNaN(a) || isNaN(b)) {
        var ax_1 = [];
        var bx_1 = [];
        a.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
            ax_1.push([$1 || Infinity, $2 || ""]);
        });
        b.replace(/(\d+)|(\D+)/g, function (_, $1, $2) {
            bx_1.push([$1 || Infinity, $2 || ""]);
        });
        while (ax_1.length && bx_1.length) {
            var an = ax_1.shift();
            var bn = bx_1.shift();
            var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
            if (nn) {
                return nn;
            }
        }
        return ax_1.length - bx_1.length;
    }
    return a - b;
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
function hasJsonOrArrayStructure(str) {
    if (typeof str === "object") {
        return true;
    }
    if (typeof str !== "string") {
        return false;
    }
    try {
        var result = JSON.parse(str);
        return Object.prototype.toString.call(result) === "[object Object]"
            || Array.isArray(result);
    }
    catch (err) {
        return false;
    }
}
exports.hasJsonOrArrayStructure = hasJsonOrArrayStructure;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(70));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_data_1 = __webpack_require__(7);
exports.DataEvents = ts_data_1.DataEvents;
var ItemType;
(function (ItemType) {
    ItemType["button"] = "button";
    ItemType["imageButton"] = "imageButton";
    ItemType["selectButton"] = "selectButton";
    ItemType["customHTMLButton"] = "customButton";
    ItemType["input"] = "input";
    ItemType["separator"] = "separator";
    ItemType["title"] = "title";
    ItemType["spacer"] = "spacer";
    ItemType["menuItem"] = "menuItem";
    ItemType["block"] = "block";
    ItemType["navItem"] = "navItem";
})(ItemType = exports.ItemType || (exports.ItemType = {}));
var NavigationBarEvents;
(function (NavigationBarEvents) {
    NavigationBarEvents["inputCreated"] = "inputcreated";
    NavigationBarEvents["click"] = "click";
    NavigationBarEvents["openMenu"] = "openmenu";
    NavigationBarEvents["inputFocus"] = "inputfocus";
    NavigationBarEvents["inputBlur"] = "inputblur";
})(NavigationBarEvents = exports.NavigationBarEvents || (exports.NavigationBarEvents = {}));
var NavigationType;
(function (NavigationType) {
    NavigationType["pointer"] = "pointer";
    NavigationType["click"] = "click";
})(NavigationType = exports.NavigationType || (exports.NavigationType = {}));


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(14);
function getCount(item, widgetClass, isLimited) {
    var countColor = {
        danger: " dhx_navbar-count--color_danger",
        secondary: " dhx_navbar-count--color_secondary",
        primary: " dhx_navbar-count--color_primary",
        success: " dhx_navbar-count--color_success",
    }[item.countColor] || " dhx_navbar-count--color_danger";
    return dom_1.el(".dhx_navbar-count", {
        class: widgetClass + countColor + (!isLimited && parseInt(item.count, 10) > 99 ? " dhx_navbar-count--overlimit" : ""),
    }, isLimited && parseInt(item.count, 10) > 99 ? "99+" : item.count);
}
exports.getCount = getCount;
function getIcon(iconName, type) {
    if (iconName === void 0) { iconName = ""; }
    if (iconName.slice(0, 3) === "dxi") {
        iconName = "dxi " + iconName;
    }
    return dom_1.el("span", {
        class: "dhx_" + type + "__icon " + iconName
    });
}
exports.getIcon = getIcon;
function navbarComponentMixin(widgetName, item, asMenuItem, body) {
    var itemClass = getNavbarItemClass(widgetName, item, asMenuItem);
    var hasRibbonSize = widgetName === "ribbon" && (item.type === types_1.ItemType.navItem || item.type === types_1.ItemType.imageButton);
    return dom_1.el("li", {
        _key: item.id,
        class: itemClass +
            (item.icon && !item.value && hasRibbonSize ? " dhx_ribbon__item--icon" : "") +
            (item.src && !item.value && hasRibbonSize ? " dhx_ribbon__item--icon" : "") +
            (item.size && hasRibbonSize ? " dhx_ribbon__item--" + item.size : ""),
    }, [
        body
    ]);
}
exports.navbarComponentMixin = navbarComponentMixin;
function getNavbarButtonCSS(_a, widgetName) {
    var color = _a.color, size = _a.size, view = _a.view, full = _a.full, icon = _a.icon, circle = _a.circle, loading = _a.loading, value = _a.value, active = _a.active;
    var colorsCss = {
        danger: " dhx_button--color_danger",
        secondary: " dhx_button--color_secondary",
        primary: " dhx_button--color_primary",
        success: " dhx_button--color_success",
    }[color] || " dhx_button--color_primary";
    var sizeCss = {
        small: " dhx_button--size_small",
        medium: " dhx_button--size_medium",
    }[size] || " dhx_button--size_medium";
    var viewCss = {
        flat: " dhx_button--view_flat",
        link: " dhx_button--view_link",
    }[view] || " dhx_button--view_flat";
    var fullCss = full ? " dhx_button--width_full" : "";
    var circleCss = circle ? " dhx_button--circle" : "";
    var loadingCss = loading ? " dhx_button--loading" : "";
    var iconViewCss = icon && !value ? " dhx_button--icon" : "";
    var activeCss = active ? " dhx_button--active" : "";
    return colorsCss + sizeCss + viewCss + fullCss + circleCss + loadingCss + activeCss + iconViewCss;
}
exports.getNavbarButtonCSS = getNavbarButtonCSS;
var getNavbarItemClass = function (widgetName, item, asMenuItem) {
    var baseClassName = "";
    var resultClassName = "";
    if (asMenuItem) {
        baseClassName = "dhx_menu-item";
    }
    else {
        baseClassName = "dhx_" + widgetName + "__item";
    }
    resultClassName = baseClassName + (item.css ? " " + item.css : "");
    if (item.type === types_1.ItemType.spacer || item.type === types_1.ItemType.separator) {
        resultClassName += " " + baseClassName + "--" + item.type;
    }
    if (item.type === "button" && widgetName === "sidebar" && !item.icon) {
        resultClassName += " dhx_navbar-item--colapse_hidden";
    }
    return resultClassName;
};


/***/ }),
/* 16 */
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ts_data_1 = __webpack_require__(7);
var FileStatus;
(function (FileStatus) {
    FileStatus["queue"] = "queue";
    FileStatus["uploaded"] = "uploaded";
    FileStatus["failed"] = "failed";
    FileStatus["inprogress"] = "inprogress";
})(FileStatus = exports.FileStatus || (exports.FileStatus = {}));
var UploaderEvents;
(function (UploaderEvents) {
    UploaderEvents["uploadBegin"] = "uploadbegin";
    UploaderEvents["beforeUploadFile"] = "beforeuploadfile";
    UploaderEvents["uploadFile"] = "uploadfile";
    UploaderEvents["uploadFail"] = "uploadfail";
    UploaderEvents["uploadComplete"] = "uploadcomplete";
    UploaderEvents["uploadProgress"] = "uploadprogress";
})(UploaderEvents = exports.UploaderEvents || (exports.UploaderEvents = {}));
var ProgressBarEvents;
(function (ProgressBarEvents) {
    ProgressBarEvents["cancel"] = "cancel";
})(ProgressBarEvents = exports.ProgressBarEvents || (exports.ProgressBarEvents = {}));
var VaultMode;
(function (VaultMode) {
    VaultMode["grid"] = "grid";
    VaultMode["list"] = "list";
})(VaultMode = exports.VaultMode || (exports.VaultMode = {}));


/***/ }),
/* 18 */
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
/* 19 */
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
/* 20 */
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
            var code = comp + (key && key.toLowerCase());
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ListEvents;
(function (ListEvents) {
    ListEvents["click"] = "click";
    ListEvents["doubleClick"] = "doubleclick";
    ListEvents["contextmenu"] = "contextmenu";
    ListEvents["focusChange"] = "focuschange";
    ListEvents["beforeEditStart"] = "beforeEditStart";
    ListEvents["afterEditStart"] = "afterEditStart";
    ListEvents["beforeEditEnd"] = "beforeEditEnd";
    ListEvents["afterEditEnd"] = "afterEditEnd";
})(ListEvents = exports.ListEvents || (exports.ListEvents = {}));


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(79));
__export(__webpack_require__(40));


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(81));
__export(__webpack_require__(42));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(43);
var core_1 = __webpack_require__(1);
/*
    %d	day as a number with leading zero, 01..31
    %j	day as a number, 1..31
    %D	short name of the day, Su Mo Tu...
    %l	full name of the day, Sunday Monday Tuesday...
    %m	month as a number with leading zero, 01..12
    %n	month as a number, 1..12
    %M	short name of the month, Jan Feb Mar...
    %F	full name of the month, January February March...
    %y	year as a number, 2 digits
    %Y	year as a number, 4 digits
    %h	hours 12-format with leading zero, 01..12)
    %g	hours 12-format, 1..12)
    %H	hours 24-format with leading zero, 01..24
    %G	hours 24-format, 1..24
    %i	minutes with leading zero, 01..59
    %s	seconds with leading zero, 01..59
    %a	am or pm
    %A	AM or PM
    %u	milliseconds
    %P	timezone offset
*/
var formatters = {
    "%d": function (date) {
        var day = date.getDate();
        return day < 10 ? "0" + day : day;
    },
    "%j": function (date) { return date.getDate(); },
    "%l": function (date) {
        return en_1.default.days[date.getDay()];
    },
    "%D": function (date) {
        return en_1.default.daysShort[date.getDay()];
    },
    "%m": function (date) {
        var month = date.getMonth() + 1;
        return month < 10 ? "0" + month : month;
    },
    "%n": function (date) { return date.getMonth() + 1; },
    "%M": function (date) { return en_1.default.monthsShort[date.getMonth()]; },
    "%F": function (date) { return en_1.default.months[date.getMonth()]; },
    "%y": function (date) { return date.getFullYear().toString().slice(2); },
    "%Y": function (date) { return date.getFullYear(); },
    "%h": function (date) {
        var hours = date.getHours() % 12;
        return hours < 10 ? "0" + hours : hours;
    },
    "%g": function (date) { return date.getHours() % 12; },
    "%H": function (date) {
        var hours = date.getHours();
        return hours < 10 ? "0" + hours : hours;
    },
    "%G": function (date) { return date.getHours(); },
    "%i": function (date) {
        var minutes = date.getMinutes();
        return minutes < 10 ? "0" + minutes : minutes;
    },
    "%s": function (date) {
        var seconds = date.getSeconds();
        return seconds < 10 ? "0" + seconds : seconds;
    },
    "%a": function (date) { return date.getHours() > 12 ? "pm" : "am"; },
    "%A": function (date) { return date.getHours() > 12 ? "PM" : "AM"; },
    "%u": function (date) { return date.getMilliseconds(); }
};
var setFormatters = {
    "%d": function (date, value) {
        var check = /(^([0-9][0-9])$)/i.test(value);
        check
            ? date.setDate(Number(value))
            : date.setDate(Number(1));
    },
    "%j": function (date, value) {
        var check = /(^([0-9]?[0-9])$)/i.test(value);
        check
            ? date.setDate(Number(value))
            : date.setDate(Number(1));
    },
    "%m": function (date, value) {
        var check = /(^([0-9][0-9])$)/i.test(value);
        check
            ? date.setMonth(Number(value) - 1)
            : date.setMonth(Number(0));
    },
    "%n": function (date, value) {
        var check = /(^([0-9]?[0-9])$)/i.test(value);
        check
            ? date.setMonth(Number(value) - 1)
            : date.setMonth(Number(0));
    },
    "%M": function (date, value) {
        var index = core_1.findIndex(en_1.default.monthsShort, function (v) { return v === value; });
        index === -1
            ? date.setMonth(0)
            : date.setMonth(index);
    },
    "%F": function (date, value) {
        var index = core_1.findIndex(en_1.default.months, function (v) { return v === value; });
        index === -1
            ? date.setMonth(0)
            : date.setMonth(index);
    },
    "%y": function (date, value) {
        var check = /(^([0-9][0-9])$)/i.test(value);
        check
            ? date.setFullYear(Number("20" + value))
            : date.setFullYear(Number("2000"));
    },
    "%Y": function (date, value) {
        var check = /(^([0-9][0-9][0-9][0-9])$)/i.test(value);
        check
            ? date.setFullYear(Number(value))
            : date.setFullYear(Number("2000"));
    },
    "%h": function (date, value) {
        var check = /(^0[1-9]|1[0-2]$)/i.test(value);
        check
            ? date.setHours(Number(value))
            : date.setHours(Number(0));
    },
    "%g": function (date, value) {
        var check = /(^[1-9]$)|(^0[1-9]|1[0-2]$)/i.test(value);
        check
            ? date.setHours(Number(value))
            : date.setHours(Number(0));
    },
    "%H": function (date, value) {
        var check = /(^[0-9][0-3]$)/i.test(value);
        check
            ? date.setHours(Number(value))
            : date.setHours(Number(0));
    },
    "%G": function (date, value) {
        var check = /(^([0-9]$)|[0-9][0-3]$)/i.test(value);
        check
            ? date.setHours(Number(value))
            : date.setHours(Number(0));
    },
    "%i": function (date, value) {
        var check = /(^([0-5][0-9])$)/i.test(value);
        check
            ? date.setMinutes(Number(value))
            : date.setMinutes(Number(0));
    },
    "%s": function (date, value) {
        var check = /(^([0-5][0-9])$)/i.test(value);
        check
            ? date.setSeconds(Number(value))
            : date.setSeconds(Number(0));
    },
    "%a": function (date, value) {
        if (value === "pm") {
            date.setHours(date.getHours() + 12);
        }
    },
    "%A": function (date, value) {
        if (value === "PM") {
            date.setHours(date.getHours() + 12);
        }
    },
};
function getFormatedDate(format, date) {
    return tokenizeFormat(format).reduce(function (res, token) {
        if (token.type === TokenType.separator) {
            return res + token.value;
        }
        else {
            if (!formatters[token.value]) {
                return res;
            }
            return res + formatters[token.value](date);
        }
    }, "");
}
exports.getFormatedDate = getFormatedDate;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["separator"] = 0] = "separator";
    TokenType[TokenType["datePart"] = 1] = "datePart";
})(TokenType || (TokenType = {}));
function tokenizeFormat(format) {
    var tokens = [];
    var currentSeparator = "";
    for (var i = 0; i < format.length; i++) {
        if (format[i] === "%") {
            if (currentSeparator.length > 0) {
                tokens.push({
                    type: TokenType.separator,
                    value: currentSeparator
                });
                currentSeparator = "";
            }
            tokens.push({
                type: TokenType.datePart,
                value: format[i] + format[i + 1]
            });
            i++;
        }
        else {
            currentSeparator += format[i];
        }
    }
    if (currentSeparator.length > 0) {
        tokens.push({
            type: TokenType.separator,
            value: currentSeparator
        });
    }
    return tokens;
}
function stringToDate(str, format, validate) {
    var tokens = tokenizeFormat(format);
    var dateParts = [];
    var index = 0;
    var formatter = null;
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (token.type === TokenType.separator) {
            var sepratorIndex = str.indexOf(token.value, index);
            if (sepratorIndex === -1) {
                if (validate) {
                    return false;
                }
                throw new Error(("Incorrect date, see docs: https://docs.dhtmlx.com/suite/calendar__api__calendar_dateformat_config.html"));
            }
            if (formatter) {
                dateParts.push({
                    formatter: formatter,
                    value: str.slice(index, sepratorIndex)
                });
                formatter = null;
            }
            index = sepratorIndex + token.value.length;
        }
        else if (token.type === TokenType.datePart) {
            formatter = token.value;
        }
    }
    if (formatter) {
        dateParts.push({
            formatter: formatter,
            value: str.slice(index)
        });
    }
    var date = new Date();
    dateParts.reverse();
    for (var _a = 0, dateParts_1 = dateParts; _a < dateParts_1.length; _a++) {
        var datePart = dateParts_1[_a];
        if (setFormatters[datePart.formatter]) {
            setFormatters[datePart.formatter](date, datePart.value);
        }
    }
    return validate ? true : date;
}
exports.stringToDate = stringToDate;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function HSVtoRGB(hsv) {
    var rgb = { r: 0, g: 0, b: 0 };
    var h = hsv.h / 60;
    var s = hsv.s;
    var v = hsv.v;
    var i = Math.floor(h) % 6;
    var f = h - Math.floor(h);
    var p = 255 * v * (1 - s);
    var q = 255 * v * (1 - (s * f));
    var t = 255 * v * (1 - (s * (1 - f)));
    v *= 255;
    switch (i) {
        case 0:
            rgb.r = v;
            rgb.g = t;
            rgb.b = p;
            break;
        case 1:
            rgb.r = q;
            rgb.g = v;
            rgb.b = p;
            break;
        case 2:
            rgb.r = p;
            rgb.g = v;
            rgb.b = t;
            break;
        case 3:
            rgb.r = p;
            rgb.g = q;
            rgb.b = v;
            break;
        case 4:
            rgb.r = t;
            rgb.g = p;
            rgb.b = v;
            break;
        case 5:
            rgb.r = v;
            rgb.g = p;
            rgb.b = q;
            break;
    }
    for (var key in rgb) {
        rgb[key] = Math.round(rgb[key]);
    }
    return rgb;
}
exports.HSVtoRGB = HSVtoRGB;
function RGBToHex(rgb) {
    return Object.keys(rgb).reduce(function (hex, c) {
        var h = rgb[c].toString(16).toUpperCase();
        h = h.length === 1 ? "0" + h : h;
        return hex += h;
    }, "#");
}
exports.RGBToHex = RGBToHex;
function HexToRGB(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_m, r, g, b) {
        return r + r + g + g + b + b;
    });
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
exports.HexToRGB = HexToRGB;
function RGBToHSV(rgb) {
    var h;
    var s;
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;
    var v = Math.max(r, g, b);
    var diff = v - Math.min(r, g, b);
    var diffc = function (c) {
        return (v - c) / 6 / diff + 1 / 2;
    };
    if (diff === 0) {
        h = s = 0;
    }
    else {
        s = diff / v;
        var rdif = diffc(r);
        var gdif = diffc(g);
        var bdif = diffc(b);
        if (r === v) {
            h = bdif - gdif;
        }
        else if (g === v) {
            h = (1 / 3) + rdif - bdif;
        }
        else if (b === v) {
            h = (2 / 3) + gdif - rdif;
        }
        if (h < 0) {
            h += 1;
        }
        else if (h > 1) {
            h -= 1;
        }
    }
    return {
        h: Math.floor(h * 360),
        s: s,
        v: v
    };
}
exports.RGBToHSV = RGBToHSV;
function HexToHSV(hex) {
    return RGBToHSV(HexToRGB(hex));
}
exports.HexToHSV = HexToHSV;
function isHex(hex) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}
exports.isHex = isHex;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en = {
    cancel: "Cancel",
    select: "Select",
    rightClickToDelete: "Right click to delete",
    customColors: "Custom colors",
    addNewColor: "Add new color"
};
exports.default = en;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var RealPosition;
(function (RealPosition) {
    RealPosition["left"] = "left";
    RealPosition["right"] = "right";
    RealPosition["top"] = "top";
    RealPosition["bottom"] = "bottom";
    RealPosition["center"] = "center";
})(RealPosition = exports.RealPosition || (exports.RealPosition = {}));
var Position;
(function (Position) {
    Position["right"] = "right";
    Position["bottom"] = "bottom";
    Position["center"] = "center";
})(Position = exports.Position || (exports.Position = {}));
var MessageContainerPosition;
(function (MessageContainerPosition) {
    MessageContainerPosition["topLeft"] = "top-left";
    MessageContainerPosition["topRight"] = "top-right";
    MessageContainerPosition["bottomLeft"] = "bottom-left";
    MessageContainerPosition["bottomRight"] = "bottom-right";
})(MessageContainerPosition = exports.MessageContainerPosition || (exports.MessageContainerPosition = {}));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(88));
__export(__webpack_require__(89));
__export(__webpack_require__(90));
__export(__webpack_require__(47));
__export(__webpack_require__(27));


/***/ }),
/* 29 */
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
var dom_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var helper_1 = __webpack_require__(5);
var label_1 = __webpack_require__(9);
var events_1 = __webpack_require__(2);
var types_1 = __webpack_require__(6);
var INIT_DEBOUNCE_TIME = 500;
var InputEvents;
(function (InputEvents) {
    InputEvents["change"] = "change";
    InputEvents["error"] = "error";
    InputEvents["success"] = "success";
})(InputEvents = exports.InputEvents || (exports.InputEvents = {}));
var Input = /** @class */ (function (_super) {
    __extends(Input, _super);
    function Input(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, null, config) || this;
        _this.events = new events_1.EventSystem();
        _this._debounceTime = INIT_DEBOUNCE_TIME;
        _this.events.on(InputEvents.change, function (value) {
            _this.config.value = value || "";
        });
        return _this;
    }
    Input.prototype.validate = function () {
        var requiredCondition = !this.config.required || this.config.value;
        var isValid = !this.config.validation || helper_1.validateInput(this.config.value, this.config.validation);
        this.config.$validationStatus = requiredCondition && isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return requiredCondition && isValid;
    };
    Input.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    Input.prototype.clear = function () {
        this.config.value = "";
        this.paint();
    };
    Input.prototype.setValue = function (value) {
        this.events.fire(InputEvents.change, [value]);
        this.config.value = value;
        this.paint();
    };
    Input.prototype.getValue = function () {
        return this.config.value || "";
    };
    Input.prototype._init = function () {
        var _a = this.config, validation = _a.validation, value = _a.value;
        if (validation && value) {
            var isValid = helper_1.validateInput(value, validation);
            this.config.$validationStatus = isValid
                ? types_1.ValidationStatus.success
                : types_1.ValidationStatus.error;
        }
    };
    Input.prototype._getHandlers = function () {
        var _this = this;
        return {
            oninput: function (e) {
                var value = e.target.value;
                _this.config.value = value;
                if (_this._debounceTimer) {
                    clearTimeout(_this._debounceTimer);
                }
                var time = Date.now();
                var diff = _this._last ? time - _this._last : _this._debounceTime;
                _this._last = time;
                _this._debounceTime = (diff + _this._debounceTime) / 2 + 300;
                _this._debounceTimer = setTimeout(function () {
                    _this._validate(value);
                }, _this._debounceTime);
            },
            onblur: function (e) {
                _this._validate(e.target.value, true);
            }
        };
    };
    Input.prototype._draw = function () {
        var _a = this.config, id = _a.id, value = _a.value, disabled = _a.disabled, name = _a.name, icon = _a.icon, placeholder = _a.placeholder, required = _a.required, inputType = _a.inputType, validation = _a.validation, hidden = _a.hidden, autocomplete = _a.autocomplete;
        var visibility = hidden ? " dhx_form-group--hidden" : "";
        return dom_1.el("div.dhx_form-group", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(validation)) + visibility
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", {}, [
                dom_1.el("div.dhx_input-container", {}, [
                    this.config.icon ? dom_1.el(".dhx_input__icon", {
                        class: this.config.icon
                    }) : null,
                    dom_1.el("input.dhx_input", {
                        type: inputType,
                        id: id || this._uid,
                        placeholder: placeholder || "",
                        value: core_1.isDefined(value) ? value : "",
                        name: name || "",
                        disabled: disabled,
                        required: required,
                        onblur: this._handlers.onblur,
                        oninput: this._handlers.oninput,
                        class: icon ? "dhx_input--icon-padding" : "",
                        autocomplete: autocomplete ? "on" : "off"
                    }),
                ]),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    Input.prototype._validate = function (value, blur) {
        if (blur && this._debounceTimer) {
            clearTimeout(this._debounceTimer);
        }
        this._last = null;
        this._debounceTimer = null;
        this._debounceTime = INIT_DEBOUNCE_TIME;
        if (this.config.validation) {
            if (!helper_1.validateInput(value, this.config.validation)) {
                this.events.fire(InputEvents.error, [value]);
                this.config.$validationStatus = types_1.ValidationStatus.error;
                this.paint();
                return;
            }
            else {
                this.events.fire(InputEvents.success, [value]);
                this.config.$validationStatus = types_1.ValidationStatus.success;
                this.paint();
            }
        }
        else if (this.config.required) {
            if (value === "") {
                this.events.fire(InputEvents.error, [value]);
                this.config.$validationStatus = types_1.ValidationStatus.error;
                this.paint();
            }
            else {
                this.events.fire(InputEvents.success, [value]);
                this.config.$validationStatus = types_1.ValidationStatus.success;
                this.paint();
            }
        }
        this.events.fire(InputEvents.change, [value]);
    };
    return Input;
}(label_1.Label));
exports.Input = Input;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    dragAndDrop: "Drag & drop",
    or: "or",
    browse: "Browse files",
    filesOrFoldersHere: "files or folders here",
    cancel: "Cancel",
    clearAll: "Clear all",
    clear: "Clear",
    add: "Add",
    upload: "Upload",
    download: "Download",
    error: "error",
    byte: "B",
    kilobyte: "KB",
    megabyte: "MB",
    gigabyte: "GB",
};
exports.default = locale;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(58));
__export(__webpack_require__(39));


/***/ }),
/* 32 */
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
var events_1 = __webpack_require__(2);
var loader_1 = __webpack_require__(62);
var sort_1 = __webpack_require__(65);
var dataproxy_1 = __webpack_require__(16);
var helpers_1 = __webpack_require__(12);
var types_1 = __webpack_require__(11);
var core_1 = __webpack_require__(1);
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
        this.events.on(types_1.DataEvents.loadError, function (response) {
            if (typeof response !== "string") {
                helpers_1.dhxError(response);
            }
            else {
                helpers_1.dhxWarning(response);
            }
        });
    }
    DataCollection.prototype.add = function (obj, index) {
        var _this = this;
        if (!this.events.fire(types_1.DataEvents.beforeAdd, [obj])) {
            return;
        }
        if (Array.isArray(obj)) {
            obj.map(function (element, key) {
                if (key !== 0) {
                    index = index + 1;
                }
                var id = _this._addCore(element, index);
                _this._onChange("add", element.id, element);
                _this.events.fire(types_1.DataEvents.afterAdd, [element]);
                return id;
            });
        }
        else {
            var id = this._addCore(obj, index);
            this._onChange("add", obj.id, obj);
            this.events.fire(types_1.DataEvents.afterAdd, [obj]);
            return id;
        }
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
            this._applyFilters();
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
        if (!by) {
            this._order = [];
            for (var key in this._pull) {
                this._order.push(this._pull[key]);
            }
            this._applyFilters();
        }
        else {
            this._sort.sort(this._order, by);
            if (this._initOrder && this._initOrder.length) {
                this._sort.sort(this._initOrder, by);
            }
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
                target.add(helpers_1.copyWithoutInner(this.getItem(id)), index);
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
        this.events.fire(types_1.DataEvents.change, ["load"]);
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
    DataCollection.prototype._applyFilters = function () {
        var _this = this;
        if (this._filters && Object.keys(this._filters).length) {
            var fOrder = this._order.filter(function (item) {
                return Object.keys(_this._filters).every(function (key) {
                    return item[key] ?
                        _this._filters[key].compare(item[key], _this._filters[key].match, item)
                        : _this._filters[key].compare(item);
                });
            });
            if (!this._initOrder) {
                this._initOrder = this._order;
            }
            this._order = fOrder;
        }
    };
    return DataCollection;
}());
exports.DataCollection = DataCollection;


/***/ }),
/* 33 */
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
var JsonDriver_1 = __webpack_require__(34);
var CsvDriver_1 = __webpack_require__(35);
var XMLDriver_1 = __webpack_require__(63);
exports.dataDrivers = {
    json: JsonDriver_1.JsonDriver,
    csv: CsvDriver_1.CsvDriver
};
exports.dataDriversPro = __assign({}, exports.dataDrivers, { xml: XMLDriver_1.XMLDriver });


/***/ }),
/* 34 */
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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = __webpack_require__(19);
var ts_data_1 = __webpack_require__(7);
var Selection = /** @class */ (function () {
    function Selection(config, data) {
        var _this = this;
        this.config = config;
        this.events = data.events;
        this._data = data;
        this._selected = [];
        this._lastShiftSelectedIndexes = [];
        this._data.events.on(ts_data_1.DataEvents.removeAll, function () {
            _this._selected = [];
        });
        this._data.events.on(ts_data_1.DataEvents.afterRemove, function (obj) {
            _this._selected = _this._selected.filter(function (id) { return id !== obj.id; });
        });
    }
    Selection.prototype.getId = function () {
        if (this.config.multiselection) {
            return this._selected;
        }
        return this._selected[0];
    };
    Selection.prototype.getItem = function () {
        var _this = this;
        if (this._selected.length) {
            var items = this._selected.map(function (id) { return _this._data.getItem(id); });
            return this.config.multiselection ? items : items[0];
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
        if (!id) {
            this._data.map(function (item) {
                item.$selected = false;
                _this._selected = [];
            });
            return;
        }
        if (!id && !this._selected.length) {
            return true;
        }
        if (id) {
            return this._unselectItem(id);
        }
        this._selected.forEach(function (selectedId) { return _this._unselectItem(selectedId); });
        return true;
    };
    Selection.prototype.add = function (id, isCtrl, isShift) {
        var _this = this;
        if (!this.events.fire(types_1.SelectionEvents.beforeSelect)) {
            return;
        }
        if (!id) {
            this._selected = [];
            this._data.map(function (item) {
                item.$selected = true;
                _this._selected.push(item.id);
            });
            return;
        }
        if (this.config.multiselection) {
            this._addMulti(id, isCtrl, isShift);
        }
        else {
            this._addSingle(id, isCtrl);
        }
    };
    Selection.prototype._addMulti = function (id, isCtrl, isShift) {
        var _this = this;
        var currentSelectedItemIndex = this._data.getIndex(id);
        if (this.config.multiselectionMode === "click") {
            if (isShift) {
                this._addWithShift(currentSelectedItemIndex);
                this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
            }
            else {
                this._isSelected(id) ? this._unselectItem(id) : this._selectItem(id);
                this._lastSelectedIndex = this._data.getIndex(this._selected[this._selected.length - 1]);
                this._lastShiftSelectedIndexes = [];
            }
        }
        if (this.config.multiselectionMode === "ctrlClick") {
            if (!isShift && !isCtrl) {
                this._data.map(function (item) {
                    item.$selected = false;
                    _this._selected = [];
                });
                this._isSelected(id) ? this._unselectItem(id) : this._selectItem(id);
                this._lastSelectedIndex = this._data.getIndex(this._selected[this._selected.length - 1]);
                this._lastShiftSelectedIndexes = [];
            }
            if (isShift) {
                this._addWithShift(currentSelectedItemIndex);
                this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
            }
            if (isCtrl) {
                this._isSelected(id) ? this._unselectItem(id) : this._selectItem(id);
                this._lastSelectedIndex = this._data.getIndex(this._selected[this._selected.length - 1]);
                this._lastShiftSelectedIndexes = [];
            }
        }
    };
    Selection.prototype._addWithShift = function (currentSelectedItemIndex) {
        var _this = this;
        if (currentSelectedItemIndex >= this._lastSelectedIndex) {
            // remove last selection with shift
            this._data.map(function (item, index) {
                if (_this._lastShiftSelectedIndexes.indexOf(index) !== -1) {
                    item.$selected = false;
                    _this._selected = _this._selected.filter(function (i) { return i !== _this._data.getId(index); });
                    _this._lastShiftSelectedIndexes = _this._lastShiftSelectedIndexes.filter(function (i) {
                        return i !== index && i !== _this._lastSelectedIndex;
                    });
                }
            });
            // add new selection with shift
            this._data.map(function (item, index) {
                if (index >= _this._lastSelectedIndex && index <= currentSelectedItemIndex) {
                    item.$selected = true;
                    if (_this._selected.indexOf(item.id) === -1) {
                        _this._selected.push(item.id);
                    }
                    if (index !== _this._lastSelectedIndex) {
                        if (_this._lastShiftSelectedIndexes.indexOf(index) === -1) {
                            _this._lastShiftSelectedIndexes.push(index);
                        }
                    }
                }
            });
        }
        if (currentSelectedItemIndex <= this._lastSelectedIndex) {
            // remove last selection with shift
            this._data.map(function (item, index) {
                if (_this._lastShiftSelectedIndexes.indexOf(index) !== -1) {
                    item.$selected = false;
                    _this._selected = _this._selected.filter(function (i) { return i !== _this._data.getId(index); });
                    _this._lastShiftSelectedIndexes = _this._lastShiftSelectedIndexes.filter(function (i) {
                        return i !== index && i !== _this._lastSelectedIndex;
                    });
                }
            });
            // add new selection with shift
            this._data.map(function (item, index) {
                if (index <= _this._lastSelectedIndex && index >= currentSelectedItemIndex) {
                    item.$selected = true;
                    if (_this._selected.indexOf(item.id) === -1) {
                        _this._selected.push(item.id);
                    }
                    if (index !== _this._lastSelectedIndex) {
                        if (_this._lastShiftSelectedIndexes.indexOf(index) === -1) {
                            _this._lastShiftSelectedIndexes.push(index);
                        }
                    }
                }
            });
        }
    };
    Selection.prototype._addSingle = function (id, isCtrl) {
        // clean selection
        this.remove();
        // select item
        if (this.config && this.config.multiselectionMode === "click") {
            this._selectItem(id);
        }
        else {
            if (isCtrl) {
                this._selectItem(id);
            }
        }
    };
    Selection.prototype._isSelected = function (id) {
        return this._selected.indexOf(id) !== -1;
    };
    Selection.prototype._selectItem = function (id) {
        this._selected.push(id);
        this._data.update(id, { $selected: true });
        this.events.fire(types_1.SelectionEvents.afterSelect, [id]);
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
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    notFound: "Not Found",
    selectAll: "Select All",
    unselectAll: "Unselect All",
    selectedItems: "selected items"
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ComboboxEvents;
(function (ComboboxEvents) {
    ComboboxEvents["change"] = "change";
    ComboboxEvents["open"] = "open";
    ComboboxEvents["close"] = "close";
})(ComboboxEvents = exports.ComboboxEvents || (exports.ComboboxEvents = {}));
var ComboState;
(function (ComboState) {
    ComboState[ComboState["default"] = 0] = "default";
    ComboState[ComboState["error"] = 1] = "error";
    ComboState[ComboState["success"] = 2] = "success";
})(ComboState = exports.ComboState || (exports.ComboState = {}));


/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(80));
__export(__webpack_require__(44));
__export(__webpack_require__(24));


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var TimepickerEvents;
(function (TimepickerEvents) {
    TimepickerEvents["change"] = "change";
    TimepickerEvents["save"] = "save";
    TimepickerEvents["close"] = "close";
})(TimepickerEvents = exports.TimepickerEvents || (exports.TimepickerEvents = {}));


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Monday"],
    cancel: "Cancel"
};
exports.default = locale;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ViewMode;
(function (ViewMode) {
    ViewMode["days"] = "calendar";
    ViewMode["years"] = "year";
    ViewMode["months"] = "month";
    ViewMode["timepicker"] = "timepicker";
})(ViewMode = exports.ViewMode || (exports.ViewMode = {}));
var CalendarEvents;
(function (CalendarEvents) {
    CalendarEvents["change"] = "change";
    CalendarEvents["beforeChange"] = "beforechange";
    CalendarEvents["dateHover"] = "dateHover";
})(CalendarEvents = exports.CalendarEvents || (exports.CalendarEvents = {}));


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(86));
__export(__webpack_require__(46));
__export(__webpack_require__(25));
var en_1 = __webpack_require__(26);
exports.locale = en_1.default;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ColorpickerEvents;
(function (ColorpickerEvents) {
    ColorpickerEvents["colorChange"] = "colorChange";
    ColorpickerEvents["selectClick"] = "selectClick";
    ColorpickerEvents["cancelClick"] = "cancelClick";
    ColorpickerEvents["viewChange"] = "viewChange";
})(ColorpickerEvents = exports.ColorpickerEvents || (exports.ColorpickerEvents = {}));
var ViewsTypes;
(function (ViewsTypes) {
    ViewsTypes["palette"] = "palette";
    ViewsTypes["picker"] = "picker";
})(ViewsTypes = exports.ViewsTypes || (exports.ViewsTypes = {}));


/***/ }),
/* 47 */
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
var html_1 = __webpack_require__(4);
var types_1 = __webpack_require__(27);
var DEFAULT_SHOW_DELAY = 750;
var DEFAULT_HIDE_DELAY = 200;
function findPosition(targetRect, position, width, height) {
    var margin = 8; // margin top/bot, left/right
    var pos;
    var left;
    var top;
    switch (position) {
        case types_1.Position.center:
            left = targetRect.left + window.pageXOffset + (targetRect.width - width) / 2;
            if (left + margin < window.pageXOffset) {
                left = targetRect.left + window.pageXOffset;
            }
            top = targetRect.top + window.pageYOffset + (targetRect.height - height) / 2;
            pos = types_1.RealPosition.center;
            return { left: left, top: top, pos: pos };
        case types_1.Position.right:
            pos = types_1.RealPosition.right;
            left = targetRect.right + window.pageXOffset;
            if (left + width + margin > window.innerWidth + window.pageXOffset) { // set left
                left = window.pageXOffset + targetRect.left - width;
                pos = types_1.RealPosition.left;
            }
            top = window.pageYOffset + targetRect.top + (targetRect.height - height) / 2;
            return { left: left, top: top, pos: pos };
        case types_1.Position.bottom:
        default:
            left = window.pageXOffset + targetRect.left + (targetRect.width - width) / 2;
            if (left + width > window.innerWidth + window.pageXOffset) {
                left = window.innerWidth + window.pageXOffset - width;
            }
            else if (left < 0) {
                left = 0;
            }
            pos = types_1.RealPosition.bottom;
            top = window.pageYOffset + targetRect.bottom;
            if (top + height + margin > window.innerHeight + window.pageYOffset) { // set top
                top = window.pageYOffset + targetRect.top - height;
                pos = types_1.RealPosition.top;
            }
            return { left: left, top: top, pos: pos };
    }
}
exports.findPosition = findPosition;
// tooltip init
var tooltipBox = document.createElement("div");
var tooltipText = document.createElement("span");
tooltipText.className = "dhx_tooltip__text";
tooltipBox.appendChild(tooltipText);
tooltipBox.style.position = "absolute";
var lastNode = null;
var isActive = false;
var hideTimeout = null;
var showTimeout = null;
var activeListenersDestructor;
function showTooltip(node, text, position, css, force) {
    if (force === void 0) { force = false; }
    var rects = node.getBoundingClientRect();
    tooltipText.textContent = text;
    document.body.appendChild(tooltipBox);
    tooltipBox.className = "dhx_tooltip" + (force ? " dhx_tooltip--forced" : "");
    var _a = tooltipBox.getBoundingClientRect(), width = _a.width, height = _a.height;
    var _b = findPosition(rects, position, width, height), left = _b.left, top = _b.top, pos = _b.pos;
    switch (pos) {
        case types_1.RealPosition.bottom:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.top:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.left:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.right:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
        case types_1.RealPosition.center:
            tooltipBox.style.left = left + "px";
            tooltipBox.style.top = top + "px";
            break;
    }
    tooltipBox.className += " dhx_tooltip--" + pos + " " + (css || "");
    isActive = true;
    if (!force) {
        setTimeout(function () {
            tooltipBox.className += " dhx_tooltip--animate";
        });
    }
}
function hideTooltip(delay) {
    if (lastNode) {
        hideTimeout = setTimeout(function () {
            document.body.removeChild(tooltipBox);
            isActive = false;
            hideTimeout = null;
        }, delay || DEFAULT_HIDE_DELAY);
    }
}
function addListeners(node, text, config) {
    var force = config.force, showDelay = config.showDelay, hideDelay = config.hideDelay, position = config.position, css = config.css;
    if (!force) {
        showTimeout = setTimeout(function () {
            showTooltip(node, text, position || types_1.Position.bottom, css);
        }, showDelay || DEFAULT_SHOW_DELAY);
    }
    var hide = function () {
        if (isActive) {
            hideTooltip(hideDelay);
        }
        clearTimeout(showTimeout);
        node.removeEventListener("mouseleave", hide);
        node.removeEventListener("blur", hide);
        document.removeEventListener("mousedown", hide);
        lastNode = null;
        activeListenersDestructor = null;
    };
    if (force) {
        showTooltip(node, text, position, css, force);
    }
    node.addEventListener("mouseleave", hide);
    node.addEventListener("blur", hide);
    document.addEventListener("mousedown", hide);
    activeListenersDestructor = hide;
}
// default
function tooltip(text, config) {
    var node = html_1.toNode(config.node);
    if (node === lastNode) {
        return;
    }
    if (activeListenersDestructor) {
        activeListenersDestructor();
        activeListenersDestructor = null;
    }
    lastNode = node;
    if (hideTimeout) {
        clearTimeout(hideTimeout);
        hideTimeout = null;
        addListeners(node, text, __assign({}, config, { force: true }));
    }
    else {
        addListeners(node, text, config);
    }
}
exports.tooltip = tooltip;
function enableTooltip() {
    document.addEventListener("mousemove", _mousemove);
}
exports.enableTooltip = enableTooltip;
function disableTooltip() {
    document.removeEventListener("mousemove", _mousemove);
}
exports.disableTooltip = disableTooltip;
function _mousemove(e) {
    var node = html_1.locateNode(e, "dhx_tooltip_text");
    if (!node) {
        return;
    }
    tooltip(node.getAttribute("dhx_tooltip_text"), {
        position: node.getAttribute("dhx_tooltip_position") || types_1.Position.bottom,
        node: node
    });
}


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var locale = {
    apply: "apply",
    reject: "reject"
};
exports.default = locale;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function blockKeys(e) {
    var active = document.activeElement;
    if (!active.classList.contains("dhx_alert__confirm-reject") && !active.classList.contains("dhx_alert__confirm-aply")) {
        e.preventDefault();
    }
}
function blockScreen(css) {
    var blocker = document.createElement("div");
    blocker.className = "dhx_alert__overlay " + (css || "");
    document.body.appendChild(blocker);
    document.addEventListener("keydown", blockKeys);
    return function () {
        document.body.removeChild(blocker);
        document.removeEventListener("keydown", blockKeys);
    };
}
exports.blockScreen = blockScreen;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var html_1 = __webpack_require__(4);
var ts_data_1 = __webpack_require__(7);
var types_1 = __webpack_require__(17);
var Uploader = /** @class */ (function () {
    function Uploader(config, data, events) {
        if (config === void 0) { config = {}; }
        this.config = core_1.extend({
            autosend: true,
            updateFromResponse: true,
            fieldName: "file"
        }, config);
        this.data = data || new ts_data_1.DataCollection();
        this.events = events || this.data.events;
        this.isActive = false;
        this._fileInput = document.createElement("input");
        this._fileInput.type = "file";
        this._fileInput.multiple = true;
        this._initEvents();
        this._dropAreas = new Map();
    }
    Uploader.prototype.selectFile = function () {
        this._fileInput.click();
    };
    Uploader.prototype.linkDropArea = function (element) {
        var _this = this;
        var node = html_1.toNode(element);
        var dragover = function (e) { return e.preventDefault(); };
        var drop = function (e) {
            e.preventDefault();
            _this.parseFiles(e.dataTransfer);
        };
        node.addEventListener("dragover", dragover);
        node.addEventListener("drop", drop);
        this._dropAreas.set(node, {
            dragover: dragover,
            drop: drop
        });
    };
    Uploader.prototype.unlinkDropArea = function (element) {
        var _this = this;
        if (!element) {
            this._dropAreas.forEach(function (_, node) {
                _this._unlinkDropArea(node);
            });
            this._dropAreas.clear();
        }
        else {
            var node = html_1.toNode(element);
            this._unlinkDropArea(node);
            this._dropAreas.delete(node);
        }
    };
    Uploader.prototype.parseFiles = function (dataTransfer) {
        if (!dataTransfer.items || !dataTransfer.items[0] || !dataTransfer.items[0].webkitGetAsEntry) {
            var files = dataTransfer.files;
            for (var i = 0; i < files.length; i++) {
                this._addFile(files[i]);
            }
            if (this.config.autosend) {
                this.send();
            }
        }
        else {
            this._parseAsWebkitEntry(dataTransfer.items);
        }
    };
    Uploader.prototype.send = function (params) {
        var _this = this;
        if (this._uploadInfo && this.isActive) {
            // cancel two active sends
            return;
        }
        var all = this.data.findAll(function (item) { return item.status === types_1.FileStatus.queue || item.status === types_1.FileStatus.failed; });
        var files = all.filter(function (file) { return _this.events.fire(types_1.UploaderEvents.beforeUploadFile, [file]); });
        if (!files.length) {
            return;
        }
        this.isActive = true;
        this._uploadInfo = {
            files: files,
            count: files.length,
            size: files.reduce(function (s, f) { return s + f.file.size; }, 0)
        };
        this.events.fire(types_1.UploaderEvents.uploadBegin, [files]);
        this.events.fire(types_1.UploaderEvents.uploadProgress, [0, 0, this._uploadInfo.size]);
        if (this.config.singleRequest) {
            this._xhrSend(files, params);
        }
        else {
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var fileWrapper = files_1[_i];
                this._xhrSend([fileWrapper], params);
            }
        }
    };
    Uploader.prototype.abort = function (id) {
        if (!id) {
            if (!this._uploadInfo || !this._uploadInfo.files) {
                return;
            }
            for (var _i = 0, _a = this._uploadInfo.files; _i < _a.length; _i++) {
                var fileWrapper = _a[_i];
                this.abort(fileWrapper.id);
            }
            return;
        }
        else {
            var item = this.data.getItem(id);
            if (!item || !item.request || item.request.readyState === 4) {
                return;
            }
            item.request.abort();
        }
    };
    Uploader.prototype._unlinkDropArea = function (node) {
        var handlers = this._dropAreas.get(node);
        if (!handlers) {
            return;
        }
        var dragover = handlers.dragover, drop = handlers.drop;
        node.removeEventListener("dragover", dragover);
        node.removeEventListener("drop", drop);
    };
    Uploader.prototype._initEvents = function () {
        var _this = this;
        this._fileInput.addEventListener("change", function () {
            var files = _this._fileInput.files;
            for (var i = 0; i < files.length; i++) {
                _this._addFile(files[i]);
            }
            if (_this.config.autosend) {
                _this.send();
            }
            _this._fileInput.value = null; // clear file input after get info about files
        });
    };
    Uploader.prototype._xhrSend = function (fileWrappers, params) {
        var _this = this;
        var formData = this._createFormData(fileWrappers, params);
        var request = new XMLHttpRequest();
        for (var _i = 0, fileWrappers_1 = fileWrappers; _i < fileWrappers_1.length; _i++) {
            var fileWrapper = fileWrappers_1[_i];
            this.data.update(fileWrapper.id, {
                request: request,
                status: types_1.FileStatus.inprogress,
                progress: 0
            });
        }
        request.open("POST", this.config.target);
        request.upload.onprogress = function (ev) {
            for (var _i = 0, fileWrappers_2 = fileWrappers; _i < fileWrappers_2.length; _i++) {
                var fileWrapper = fileWrappers_2[_i];
                _this.data.update(fileWrapper.id, {
                    progress: ev.loaded / ev.total,
                    status: types_1.FileStatus.inprogress
                });
            }
            var current = _this._uploadInfo.files.reduce(function (tot, file) { return tot + file.size * file.progress; }, 0) || 0;
            var total = _this._uploadInfo.size;
            var progress = current / _this._uploadInfo.size * 100 || 0;
            _this.events.fire(types_1.UploaderEvents.uploadProgress, [progress, current, total]);
        };
        request.onloadend = function () {
            _this._uploadInfo.count = _this.config.singleRequest ? 0 : _this._uploadInfo.count - 1;
            var status = request.status === 200 ? types_1.FileStatus.uploaded : types_1.FileStatus.failed;
            var extra = request.status === 200 && request.response ? JSON.parse(request.response) : null;
            for (var _i = 0, fileWrappers_3 = fileWrappers; _i < fileWrappers_3.length; _i++) {
                var fileWrapper = fileWrappers_3[_i];
                _this.data.update(fileWrapper.id, { status: status });
                if (status === types_1.FileStatus.uploaded) {
                    if (_this.config.updateFromResponse && extra) {
                        if (_this.config.singleRequest && extra[fileWrapper.id]) {
                            _this.data.update(fileWrapper.id, extra[fileWrapper.id]);
                        }
                        else if (!_this.config.singleRequest) {
                            _this.data.update(fileWrapper.id, extra);
                        }
                    }
                    _this.events.fire(types_1.UploaderEvents.uploadFile, [fileWrapper, extra]);
                }
                else {
                    _this.events.fire(types_1.UploaderEvents.uploadFail, [fileWrapper]);
                }
            }
            if (_this._uploadInfo.count === 0) {
                _this.isActive = false;
                _this.events.fire(types_1.UploaderEvents.uploadComplete, [_this._uploadInfo.files]);
            }
        };
        request.send(formData);
    };
    Uploader.prototype._parseAsWebkitEntry = function (items) {
        var _this = this;
        var reads = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i].webkitGetAsEntry();
            reads.push(this._traverseFileTree(item));
        }
        Promise.all(reads).then(function () {
            if (_this.config.autosend) {
                _this.send();
            }
        });
    };
    Uploader.prototype._createFormData = function (fileWrappers, params) {
        var fieldName = this.config.fieldName;
        var formData = new FormData();
        var extraParams = this.config.params;
        if (params) {
            for (var key in params) {
                formData.append(key, params[key]);
            }
        }
        if (extraParams) {
            for (var key in extraParams) {
                formData.append(key, extraParams[key]);
            }
        }
        var brackets = fileWrappers.length > 1 ? "[]" : "";
        for (var _i = 0, fileWrappers_4 = fileWrappers; _i < fileWrappers_4.length; _i++) {
            var fileWrapper = fileWrappers_4[_i];
            formData.append(fieldName + brackets, fileWrapper.file, fileWrapper.file.name);
            formData.append(fieldName + "_fullname" + brackets, fileWrapper.path + fileWrapper.file.name);
            formData.append(fieldName + "_id" + brackets, fileWrapper.id);
        }
        return formData;
    };
    Uploader.prototype._addFile = function (file, path) {
        if (path === void 0) { path = ""; }
        var fileWrapper = {
            id: core_1.uid(),
            file: file,
            progress: 0,
            status: types_1.FileStatus.queue,
            src: null,
            path: path
        };
        this.data.add(fileWrapper);
    };
    Uploader.prototype._traverseFileTree = function (item) {
        var _this = this;
        return new Promise(function (res) {
            var count = 0;
            var readEntry = function (entry, path) {
                if (entry.isFile) {
                    count++;
                    entry.file(function (file) {
                        count--;
                        _this._addFile(file, path);
                        if (count === 0) {
                            res();
                        }
                    });
                }
                else if (entry.isDirectory) {
                    var reader = entry.createReader();
                    readDirectory(reader, path + entry.name + "/");
                }
            };
            var readDirectory = function (reader, path) {
                count++;
                reader.readEntries(function (entries) {
                    count--;
                    for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                        var entry = entries_1[_i];
                        readEntry(entry, path);
                    }
                    if (count === 0) {
                        res();
                    }
                });
            };
            readEntry(item, "");
        });
    };
    return Uploader;
}());
exports.Uploader = Uploader;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(109));
__export(__webpack_require__(110));
__export(__webpack_require__(14));


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    simpleVaultText: "Drag & drop files or folders here or",
    simpleVaultLabel: "browse files"
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Form_1 = __webpack_require__(54);
exports.Form = Form_1.Form;
__webpack_require__(126);
var en_1 = __webpack_require__(52);
var w = window;
exports.i18n = (w.dhx && w.dhx.i18n) ? w.dhx.i18 : {};
exports.i18n.setLocale = function (component, value) {
    var target = exports.i18n[component];
    for (var key in value) {
        target[key] = value[key];
    }
};
exports.i18n.form = exports.i18n.form || en_1.default;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_combobox_1 = __webpack_require__(31);
var events_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var ts_slider_1 = __webpack_require__(22);
var ts_layout_1 = __webpack_require__(13);
var ts_calendar_1 = __webpack_require__(41);
var core_1 = __webpack_require__(1);
var ts_data_1 = __webpack_require__(7);
var ts_timepicker_1 = __webpack_require__(23);
var ts_colorpicker_1 = __webpack_require__(45);
var dateInput_1 = __webpack_require__(93);
var button_1 = __webpack_require__(94);
var checkbox_1 = __webpack_require__(95);
var input_1 = __webpack_require__(29);
var radioGroup_1 = __webpack_require__(96);
var select_1 = __webpack_require__(98);
var textarea_1 = __webpack_require__(99);
var textinput_1 = __webpack_require__(100);
var combo_1 = __webpack_require__(101);
var sliderform_1 = __webpack_require__(102);
var helper_1 = __webpack_require__(5);
var simplevault_1 = __webpack_require__(103);
var types_1 = __webpack_require__(6);
var timeInput_1 = __webpack_require__(124);
var colorpicker_1 = __webpack_require__(125);
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(container, config) {
        var _this = _super.call(this, null, core_1.extend({
            labelWidth: "auto",
            inputType: "text"
        }, config)) || this;
        _this.events = new events_1.EventSystem(_this);
        _this._state = {};
        _this.container = container;
        _this._initUI(container);
        return _this;
    }
    Form.prototype.send = function (url, method, asFormData) {
        var _this = this;
        if (method === void 0) { method = "POST"; }
        if (this.events.fire(types_1.FormEvents.beforeSend)) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        resolve(xhr.response || xhr.responseText);
                    }
                    else {
                        reject({
                            status: xhr.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onloadend = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                        _this.events.fire(types_1.FormEvents.afterSend);
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                };
                if (method === "GET") {
                    url += "?" + encodeURIComponent(JSON.stringify(_this.getValue()));
                }
                xhr.open(method, url);
                if (!asFormData) {
                    xhr.setRequestHeader("Content-Type", "application/json");
                }
                switch (method) {
                    case "POST":
                    case "DELETE":
                    case "PUT":
                        xhr.send(asFormData ? _this.getValue(true) : JSON.stringify(_this.getValue()));
                        break;
                    case "GET":
                        xhr.send();
                    default:
                        xhr.send();
                        break;
                }
            });
        }
    };
    Form.prototype.setConfig = function (config) {
        this.unmount();
        this.config = config;
        this._initUI(this.container);
        this.paint();
    };
    Form.prototype.clear = function (method) {
        switch (method) {
            case types_1.ClearMethod.value:
                this._clear();
                break;
            case types_1.ClearMethod.validation:
                this._clearValidate();
                break;
            default:
                this._clear();
                this._clearValidate();
                break;
        }
        this.paint();
    };
    Form.prototype.setValue = function (obj) {
        for (var item in obj) {
            for (var key in this._attachments) {
                if (typeof this._attachments[key].setValue === "function") {
                    if (this._attachments[key].config.id === item) {
                        this._attachments[key].setValue(obj[key]);
                    }
                }
            }
        }
    };
    Form.prototype.getValue = function (asFormData) {
        if (asFormData) {
            var formData = new FormData();
            for (var key in this._state) {
                if (Array.isArray(this._state[key])) {
                    for (var _i = 0, _a = this._state[key]; _i < _a.length; _i++) {
                        var value = _a[_i];
                        formData.append(key + "[]", value);
                    }
                }
                else {
                    formData.append(key, this._state[key]);
                }
            }
            return formData;
        }
        return this._state;
    };
    Form.prototype.validate = function () {
        var attachments = this._attachments;
        var isValid = true;
        for (var id in attachments) {
            var component = attachments[id];
            if (component.validate && !component.validate()) {
                isValid = false;
                this.events.fire(types_1.FormEvents.validationFail, [id, component]);
            }
        }
        return isValid;
    };
    Form.prototype.getRootView = function () {
        return this.layout.getRootView();
    };
    Form.prototype.destructor = function () {
        this.events.clear();
        this.unmount();
    };
    Form.prototype._addLayoutItem = function (item) {
        var _this = this;
        item.id = item.id || core_1.uid();
        var id = item.id;
        var name = item.name || item.id;
        var width = item.width, height = item.height, cellCss = item.cellCss, gravity = item.gravity, config = __rest(item, ["width", "height", "cellCss", "gravity"]);
        var cell = {
            id: id,
            width: width,
            height: height,
            css: cellCss,
        };
        if ("gravity" in item) {
            cell.gravity = item.gravity;
        }
        switch (config.type) {
            case types_1.FormItemType.button:
                var button = this._attachments[id] = new button_1.Button(null, config);
                button.events.on(button_1.ButtonEvents.click, function (e) {
                    !_this.validate() ? e.preventDefault() : _this.events.fire(types_1.FormEvents.buttonClick, [id, e]);
                });
                break;
            case types_1.FormItemType.datepicker:
                var dateInput_2 = this._attachments[id] = new dateInput_1.DateInput(null, config);
                this._state[name] = dateInput_2.getValue();
                dateInput_2.calendar.events.on(ts_calendar_1.CalendarEvents.change, function () {
                    var value = dateInput_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                dateInput_2.events.on(dateInput_1.DateInputEvents.change, function () {
                    var value = dateInput_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.checkbox:
                var checkbox_2 = this._attachments[id] = new checkbox_1.Checkbox(null, config);
                this._state[name] = checkbox_2.getValue();
                checkbox_2.events.on(checkbox_1.CheckboxEvents.change, function () {
                    var value = checkbox_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.combo:
                var combo_2 = this._attachments[id] = new combo_1.Combo(config);
                this._state[name] = combo_2.getValue();
                combo_2.events.on(ts_combobox_1.ComboboxEvents.change, function (selected) {
                    var value = combo_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, selected]);
                    _this._state[name] = value;
                });
                if (config.data) {
                    combo_2.data.parse(config.data);
                }
                break;
            case types_1.FormItemType.input:
                var input_2 = this._attachments[id] = new input_1.Input(null, config);
                this._state[name] = input_2.getValue();
                input_2.events.on(input_1.InputEvents.change, function () {
                    var value = input_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.radioGroup:
                var radioGroup_2 = this._attachments[id] = new radioGroup_1.RadioGroup(null, config);
                this._state[name] = radioGroup_2.getValue();
                radioGroup_2.events.on(radioGroup_1.RadioGroupEvents.change, function () {
                    var value = radioGroup_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.select:
                var select_2 = this._attachments[id] = new select_1.Select(config);
                this._state[name] = select_2.getValue();
                select_2.events.on(select_1.SelectEvents.change, function () {
                    var value = select_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.simpleVault:
                var simpleVault_1 = this._attachments[id] = new simplevault_1.SimpleVault(null, config);
                this._state[name] = simpleVault_1.getValue();
                simpleVault_1.data.events.on(ts_data_1.DataEvents.change, function () {
                    var value = simpleVault_1.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.slider:
                var slider_1 = this._attachments[id] = new sliderform_1.SliderForm(config);
                this._state[name] = slider_1.getValue();
                slider_1.events.on(ts_slider_1.SliderEvents.change, function () {
                    var value = slider_1.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.textarea:
                var textarea_2 = this._attachments[id] = new textarea_1.Textarea(null, config);
                this._state[name] = textarea_2.getValue();
                textarea_2.events.on(input_1.InputEvents.change, function () {
                    _this._state[name] = textarea_2.getValue();
                });
                break;
            case types_1.FormItemType.text:
                this._attachments[id] = new textinput_1.Text(null, config);
                break;
            case types_1.FormItemType.timepicker:
                var timeInput_2 = this._attachments[id] = new timeInput_1.TimeInput(null, config);
                this._state[name] = timeInput_2.getValue();
                timeInput_2.timepicker.events.on(ts_timepicker_1.TimepickerEvents.change, function () {
                    var value = timeInput_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                timeInput_2.events.on(timeInput_1.TimeInputEvents.change, function () {
                    var value = timeInput_2.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
            case types_1.FormItemType.colorpicker:
                var colorpickerInput_1 = this._attachments[id] = new colorpicker_1.ColorpickerInput(null, config);
                this._state[name] = colorpickerInput_1.getValue();
                colorpickerInput_1.events.on(colorpicker_1.ColorpickerInputEvents.change, function () {
                    var value = colorpickerInput_1.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                colorpickerInput_1.colorpicker.events.on(ts_colorpicker_1.ColorpickerEvents.colorChange, function () {
                    var value = colorpickerInput_1.getValue();
                    _this.events.fire(types_1.FormEvents.change, [name, value]);
                    _this._state[name] = value;
                });
                break;
        }
        return cell;
    };
    Form.prototype._addLayoutItems = function (items, group, groupName) {
        var _this = this;
        return items.map(function (item) {
            item.type = item.type || group;
            if (helper_1.isBlock(item)) {
                var layoutConfig = {};
                _this._createLayoutConfig(item, layoutConfig);
                return layoutConfig;
            }
            else {
                item.name = item.name || groupName;
            }
            return _this._addLayoutItem(item);
        });
    };
    Form.prototype._createLayoutConfig = function (config, layoutConfig) {
        if (core_1.isDefined(config.cellCss)) {
            layoutConfig.css = config.cellCss;
        }
        if (core_1.isDefined(config.title)) {
            layoutConfig.header = config.title;
        }
        if (core_1.isDefined(config.padding)) {
            layoutConfig.padding = config.padding;
        }
        if (core_1.isDefined(config.gravity)) {
            layoutConfig.gravity = config.gravity;
        }
        if (core_1.isDefined(config.width)) {
            layoutConfig.width = config.width;
        }
        if (core_1.isDefined(config.height)) {
            layoutConfig.height = config.height;
        }
        if (core_1.isDefined(config.align)) {
            layoutConfig.align = config.align;
        }
        if (core_1.isDefined(config.rows)) {
            layoutConfig.rows = this._addLayoutItems(config.rows, config.group, config.groupName);
        }
        else if (core_1.isDefined(config.cols)) {
            layoutConfig.cols = this._addLayoutItems(config.cols, config.group, config.groupName);
        }
    };
    Form.prototype._initUI = function (container) {
        var attachments = this._attachments = {};
        var layoutConfig = { padding: "8px" };
        this._createLayoutConfig(this.config, layoutConfig);
        var layout = this.layout = new ts_layout_1.Layout(container, layoutConfig);
        for (var id in attachments) {
            layout.cell(id).attach(attachments[id]);
        }
    };
    Form.prototype._clear = function () {
        this._state = {};
        for (var key in this._attachments) {
            var name_1 = this._attachments[key].config.name;
            if (typeof this._attachments[key].clear === "function") {
                this._attachments[key].clear();
                name_1 ? this._state[name_1] = this._attachments[key].getValue() : this._state[key] = this._attachments[key].getValue();
            }
        }
    };
    Form.prototype._clearValidate = function () {
        for (var key in this._attachments) {
            if (typeof this._attachments[key].clearValidate === "function") {
                this._attachments[key].clearValidate();
            }
        }
    };
    return Form;
}(view_1.View));
exports.Form = Form;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 55 */
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
__webpack_require__(56);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18)))

/***/ }),
/* 56 */
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(18), __webpack_require__(57)))

/***/ }),
/* 57 */
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
/* 58 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var html_1 = __webpack_require__(4);
var keycodes_1 = __webpack_require__(61);
var view_1 = __webpack_require__(3);
var ts_data_1 = __webpack_require__(7);
var ts_layout_1 = __webpack_require__(13);
var ts_list_1 = __webpack_require__(72);
var ts_popup_1 = __webpack_require__(8);
var keyListener_1 = __webpack_require__(77);
var en_1 = __webpack_require__(38);
var helper_1 = __webpack_require__(78);
var types_1 = __webpack_require__(39);
var template = function (item) {
    if (item.icon) {
        return "<span class=\"" + item.icon + " dhx_combobox-options__icon\"></span> <span class=\"dhx_combobox-options__value\">" + item.value + "</span>";
    }
    if (item.src) {
        return "<img src=\"" + item.src + "\" class=\"dhx_combobox-options__image\"></img> <span class=\"dhx_combobox-options__value\">" + item.value + "</span>";
    }
    return "<span class=\"dhx_combobox-options__value\">" + item.value + "</span>";
};
var Combobox = /** @class */ (function (_super) {
    __extends(Combobox, _super);
    function Combobox(element, config) {
        var _this = _super.call(this, element, core_1.extend({
            // selectAllButton: true
            template: template,
            listHeight: 224,
            cellHeight: 32,
        }, config)) || this;
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
            _this.data.parse(_this.config.data);
        }
        else if (_this.config.data) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
        }
        _this.popup = new ts_popup_1.Popup();
        // this.popup.events.on(PopupEvents.beforeHide, () => true);
        _this.popup.events.on(ts_popup_1.PopupEvents.afterShow, function () {
            _this.paint();
        });
        _this.popup.events.on(ts_popup_1.PopupEvents.afterHide, function () {
            _this.paint();
        });
        if (_this.config.readonly) {
            _this._keyListener = new keyListener_1.KeyListener();
        }
        _this._state = {
            value: "",
            ignoreNext: false,
            canDelete: false,
            unselectActive: false,
            currentState: types_1.ComboState.default
        };
        _this._initHandlers();
        _this._createLayout();
        _this._initEvents();
        var vnode = dom_1.create({
            render: function () { return _this._draw(); },
            hooks: {
                didRedraw: function () {
                    if (_this.popup.isVisible()) {
                        _this.focus();
                        _this._configurePopup();
                    }
                }
            }
        });
        // const container = toNode(element);
        _this.mount(element, vnode);
        return _this;
    }
    Combobox.prototype.setState = function (state) {
        switch (state) {
            case "success":
                this._state.currentState = types_1.ComboState.success;
                break;
            case "error":
                this._state.currentState = types_1.ComboState.error;
                break;
            default:
                this._state.currentState = types_1.ComboState.default;
                break;
        }
        this.paint();
    };
    Combobox.prototype.focus = function () {
        if (this.config.disabled) {
            return false;
        }
        var rootView = this.getRootView();
        rootView.refs.input.el.focus();
    };
    Combobox.prototype.enable = function () {
        this.config.disabled = false;
        this.paint();
    };
    Combobox.prototype.disable = function () {
        this.config.disabled = true;
        this.paint();
    };
    Combobox.prototype.clear = function () {
        if (this.config.disabled) {
            return false;
        }
        this.list.selection.remove();
        this._state.value = "";
        this._filter();
        this._change();
    };
    Combobox.prototype.getValue = function (asArray) {
        var ids = this.list.selection.getId();
        if (asArray) {
            return core_1.wrapBox(ids);
        }
        return Array.isArray(ids) ? ids.join(",") : ids;
    };
    Combobox.prototype.setValue = function (ids) {
        var _this = this;
        if (this.config.disabled) {
            return false;
        }
        this._filter();
        this.list.selection.remove();
        this._state.value = "";
        if (this.config.multiselection) {
            if (typeof ids === "string") {
                ids = ids.split(",");
            }
            ids.forEach(function (id) { return _this.list.selection.add(id); });
        }
        else {
            var id = core_1.unwrapBox(ids);
            this.list.selection.add(id);
            var item = this.data.getItem(id);
            if (item) {
                this._state.value = this._getItemText(item);
            }
        }
        this._change();
    };
    Combobox.prototype.destructor = function () {
        this.popup.destructor();
        this.events.clear();
        this.list.destructor();
        this._layout.config = null;
        this._layout.destructor();
        this.unmount();
    };
    Combobox.prototype._createLayout = function () {
        var _this = this;
        var list = this.list = new ts_list_1.List(null, {
            template: this.config.template,
            virtual: this.config.virtual,
            keyNavigation: function () { return _this.popup.isVisible(); },
            itemHeight: this.config.cellHeight,
            height: this.config.listHeight,
            data: this.data
        });
        this.list.selection.events.on("change", function (e) {
            if (!_this.config.multiselection) {
                // dirty hack with load was really dearty
                if (e && e !== "load") {
                    _this._hideOptions();
                }
            }
        });
        if (this.config.multiselection) {
            list.selection.config.multiselection = true;
        }
        var layout = this._layout = new ts_layout_1.Layout(this.popup.getContainer(), {
            css: "dhx_combobox-options dhx_combobox__options",
            rows: [
                {
                    id: "select-unselect-all",
                    hidden: !this.config.multiselection || !this.config.selectAllButton
                },
                { id: "list", css: "dhx_layout-cell--gravity" },
                {
                    id: "not-found",
                    hidden: true,
                }
            ],
            on: {
                click: {
                    ".dhx_combobox__action-select-all": this._handlers.selectAll
                }
            }
        });
        layout.cell("list").attach(list);
        if (this.config.multiselection && this.config.selectAllButton) {
            layout.cell("select-unselect-all").attach(helper_1.selectAllView);
        }
    };
    Combobox.prototype._change = function () {
        var ids = this.list.selection.getId();
        this.events.fire(types_1.ComboboxEvents.change, [ids]);
        this.paint();
    };
    Combobox.prototype._initHandlers = function () {
        var _this = this;
        if (this.config.help) {
            this._helper = new ts_popup_1.Popup({ css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light" });
            this._helper.attachHTML(this.config.help);
        }
        this._handlers = {
            showHelper: function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this._helper.show(e.target);
            },
            selectAll: function () {
                _this.list.selection.remove();
                if (_this._state.unselectActive) {
                    _this.data.filter();
                    _this.list.selection.getId().forEach(function (id) {
                        _this.list.selection.remove(id);
                    });
                    if (_this.config.selectAllButton) {
                        _this._layout.cell("select-unselect-all").attach(helper_1.selectAllView);
                        _this._state.unselectActive = false;
                    }
                }
                else {
                    _this.data.filter();
                    _this.list.selection.add();
                    if (_this.config.selectAllButton) {
                        _this._layout.cell("select-unselect-all").attach(helper_1.unselectAllView);
                        _this._state.unselectActive = true;
                    }
                }
                _this._change();
            },
            onkeydown: function (e) {
                if (!_this.popup.isVisible() && e.which === keycodes_1.KEY_CODES.DOWN_ARROW) {
                    _this._showOptions();
                }
                if (_this.popup.isVisible() && e.which === keycodes_1.KEY_CODES.ENTER) {
                    if (_this.config.multiselection) {
                        var active = _this.list.getFocusItem();
                        var item = _this.data.getItem(active);
                        if (item) {
                            if (item.$selected) {
                                _this.list.selection.remove(active);
                            }
                            else {
                                _this.list.selection.add(active);
                            }
                        }
                        _this._state.value = "";
                        _this.data.filter();
                        _this.paint();
                    }
                    else {
                        var id = _this.list.getFocusItem();
                        _this.list.selection.add(id);
                        _this._state.value = _this._getItemText(_this.data.getItem(id)) || "";
                        _this._change();
                        _this._hideOptions();
                    }
                }
                if (_this.popup.isVisible() && e.which === keycodes_1.KEY_CODES.ESC) {
                    _this._hideOptions();
                }
            },
            onkeyup: function (e) {
                if (!_this.config.multiselection || _this.config.showItemsCount) {
                    return;
                }
                if (_this._state.ignoreNext) {
                    _this._state.ignoreNext = false;
                    return;
                }
                if (e.which === keycodes_1.KEY_CODES.BACKSPACE && _this._state.canDelete && _this.list.selection.getId().length) {
                    var selected = _this.list.selection.getId();
                    var id = selected[selected.length - 1];
                    _this.list.selection.remove(id);
                    _this._change();
                    _this.paint();
                }
            },
            oninput: function (e) {
                if (_this.config.disabled) {
                    return;
                }
                var input = e.target;
                var value = input.value;
                _this._state.value = value;
                _this._filter();
                if (!value.length) {
                    _this._state.ignoreNext = true;
                    _this._state.canDelete = true;
                }
                else {
                    _this._state.canDelete = false;
                }
                if (!_this.config.multiselection) {
                    _this.list.selection.remove();
                    _this._change();
                }
                if (!_this.popup.isVisible()) {
                    _this._showOptions();
                }
            },
            oninputclick: function (e) {
                if (_this.config.disabled) {
                    return;
                }
                _this.focus();
                if (e.target.classList.contains("dhx_combobox__action-remove")) {
                    var id = html_1.locate(e);
                    if (!id) {
                        return;
                    }
                    _this.list.selection.remove(id);
                    _this._change();
                    return;
                }
                if (e.target.classList.contains("dhx_combobox__action-clear-all")) {
                    _this.list.selection.getId().forEach(function (id) { return _this.list.selection.remove(id); });
                    if (_this.config.selectAllButton && _this._state.unselectActive) {
                        _this._layout.cell("select-unselect-all").attach(helper_1.selectAllView);
                        _this._state.unselectActive = false;
                    }
                    _this.paint();
                    return;
                }
                e.preventDefault();
                if (!_this.popup.isVisible()) {
                    _this._showOptions();
                    return;
                }
                _this.focus();
            },
            toggleIcon: function () {
                _this.focus();
                if (_this.popup.isVisible()) {
                    _this._hideOptions();
                }
                else {
                    _this._showOptions();
                }
            }
        };
    };
    Combobox.prototype._initEvents = function () {
        var _this = this;
        this.list.events.on(ts_list_1.ListEvents.click, function (id) {
            if (_this.config.multiselection) {
                var selected = _this.data.getItem(id).$selected;
                if (selected) {
                    if (_this.config.selectAllButton && !_this._state.unselectActive && _this.data.getLength() === _this.list.selection.getId().length) {
                        _this._layout.cell("select-unselect-all").attach(helper_1.unselectAllView);
                        _this._state.unselectActive = true;
                    }
                }
                else {
                    if (_this.config.selectAllButton && _this._state.unselectActive) {
                        _this._layout.cell("select-unselect-all").attach(helper_1.selectAllView);
                        _this._state.unselectActive = false;
                    }
                }
                if (!_this._state.value.length) {
                    _this._state.canDelete = true;
                }
                _this._change();
                return;
            }
            _this._state.value = _this._getItemText(_this.data.getItem(id)) || "";
            _this._change();
            _this._hideOptions();
        });
        if (this.config.readonly) {
            this.popup.events.on(ts_popup_1.PopupEvents.afterShow, function () {
                if (_this._state.value) {
                    var id = _this.list.selection.getId();
                    _this.list.setFocusIndex(_this.data.getIndex(id));
                }
                else {
                    _this.list.setFocusIndex(0);
                }
                _this._keyListener.startNewListen(function (val) { return _this._findBest(val); });
            });
        }
    };
    Combobox.prototype._showOptions = function () {
        if (this._state.value.length) {
            this._state.canDelete = true;
        }
        this._filter();
        if (this._configurePopup()) {
            this.events.fire(types_1.ComboboxEvents.open);
        }
    };
    Combobox.prototype._configurePopup = function () {
        var rootView = this.getRootView();
        if (!rootView || !rootView.refs || !rootView.refs.holder) {
            return false;
        }
        var holderNode = rootView.refs.holder.el;
        this.popup.getContainer().style.width = holderNode.offsetWidth + "px";
        this.popup.show(holderNode, { mode: html_1.Position.bottom });
        return true;
    };
    Combobox.prototype._hideOptions = function () {
        if (this.config.readonly) {
            this._keyListener.endListen();
        }
        this.list.setFocusIndex(0);
        if (!this.config.multiselection && !this.config.readonly && !this.list.selection.contains()) {
            this._state.value = "";
        }
        this.popup.hide();
        this.paint();
        this.events.fire(types_1.ComboboxEvents.close);
    };
    Combobox.prototype._filter = function () {
        var _this = this;
        if (this.config.readonly) {
            return;
        }
        this.data.filter(function (item) { return _this.config.filter
            ? _this.config.filter(item, _this._state.value)
            : core_1.isEqualString(_this._state.value, _this._getItemText(item)); });
        if (this.config.multiselection) {
            this.list.setFocusIndex(0);
        }
        else {
            var index = this.data.getIndex(this.list.selection.getId());
            this.list.setFocusIndex(index > -1 ? index : 0);
        }
        if (this.data.getLength() === 0) {
            if (this.config.multiselection && this.config.selectAllButton) {
                this._layout.cell("select-unselect-all").hide();
            }
            this._layout.cell("list").hide();
            this._layout.cell("not-found").attach(helper_1.emptyListView);
            this._layout.cell("not-found").show();
        }
        else {
            if (this.config.multiselection && this.config.selectAllButton) {
                this._layout.cell("select-unselect-all").show();
            }
            if (this._layout.cell("not-found").isVisible()) {
                this._layout.cell("list").show();
                this._layout.cell("not-found").hide();
            }
        }
    };
    Combobox.prototype._findBest = function (value) {
        var _this = this;
        var best = this.data.find(function (item) { return core_1.isEqualString(value, _this._getItemText(item)); });
        if (!best) {
            return;
        }
        if (this.list.selection.getId() === best.id) {
            return;
        }
        this.list.setFocusIndex(this.data.getIndex(best.id));
        this.list.selection.add(best.id);
        this.paint();
    };
    Combobox.prototype._draw = function () {
        var item = this.config.multiselection ? null : this.data.getItem(this.list.selection.getId());
        var showPlaceholder = !this.list.selection.getId() || this.list.selection.getId().length === 0;
        var width = this.config.labelInline && this.config.labelWidth ? this.config.labelWidth : "";
        var required = this.config.required;
        return dom_1.el(".dhx_widget.dhx_combobox" +
            (this.config.labelInline ? ".dhx_combobox--label-inline" : "") +
            (this.config.hiddenLabel ? ".dhx_combobox--sr_only" : "") +
            (this.config.required ? ".dhx_combobox--required" : "") +
            (this.config.css ? "." + this.config.css : ""), {
            dhx_widget_id: this._uid,
            onkeydown: this._handlers.onkeydown,
            onkeyup: this._handlers.onkeyup
        }, [
            this.config.label ? dom_1.el("label.dhx_label.dhx_combobox__label", {
                style: { minWidth: width, maxWidth: width },
                class: this.config.help ? "dhx_label--with-help" : "",
                onclick: this._handlers.oninputclick
            }, this.config.help ? [
                dom_1.el("span.dhx_label__holder", this.config.label),
                dom_1.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                    tabindex: "0",
                    role: "button",
                    onclick: this._handlers.showHelper
                }),
            ] : this.config.label) : null,
            dom_1.el("div.dhx_combobox-input-box" +
                // (this.popup.isVisible() ? ".dhx_combobox-input-box" : "") +
                (this.config.disabled ? ".dhx_combobox-input-box--disabled" : "") +
                (this.config.readonly ? ".dhx_combobox-input-box--readonly" : "") +
                (this._state.currentState === types_1.ComboState.error ? ".dhx_combobox-input-box--state_error" : "") +
                (this._state.currentState === types_1.ComboState.success ? ".dhx_combobox-input-box--state_success" : ""), {
                _ref: "holder"
            }, [
                dom_1.el("div.dhx_combobox-input__icon", {
                    onclick: this._handlers.toggleIcon
                }, [
                    dom_1.el("span" + (this.popup.isVisible() ? ".dxi.dxi-menu-up" : ".dxi.dxi-menu-down"))
                ]),
                dom_1.el("div.dhx_combobox-input-list-wrapper", {
                    onclick: this._handlers.oninputclick
                }, [
                    dom_1.el("ul.dhx_combobox-input-list", this._drawSelectedItems().concat([
                        dom_1.el("li.dhx_combobox-input-list__item.dhx_combobox-input-list__item--input", [
                            dom_1.el("input.dhx_combobox-input", {
                                oninput: this._handlers.oninput,
                                _ref: "input",
                                _key: this._uid,
                                type: "text",
                                placeHolder: showPlaceholder && this.config.placeholder ? this.config.placeholder : undefined,
                                value: this.config.readonly && item ? this._getItemText(item) : this._state.value,
                                readOnly: this.config.readonly || this.config.disabled,
                                required: required
                            })
                        ])
                    ]))
                ]),
            ])
        ]);
    };
    Combobox.prototype._drawSelectedItems = function () {
        var _this = this;
        if (!this.config.multiselection) {
            return [];
        }
        if (this.config.showItemsCount) {
            var count = this.list.selection.getId().length;
            return count ? [
                dom_1.el("li.dhx_combobox-input-list__item.dhx_combobox-tag", [
                    dom_1.el("span.dhx_combobox-tag__value", itemsCountTemplate(count, this.config.showItemsCount)),
                    dom_1.el("button.dhx_button.dhx_combobox-tag__action.dhx_combobox__action-clear-all", [
                        dom_1.el("span.dhx_button__icon.dxi.dxi-close-circle")
                    ])
                ])
            ] : [];
        }
        return this.list.selection.getId().map(function (id) {
            var item = _this.data.getItem(id);
            if (!item) {
                return null;
            }
            return dom_1.el("li.dhx_combobox-input-list__item.dhx_combobox-tag", { dhx_id: id }, [
                _this._drawImageOrIcon(item),
                dom_1.el("span.dhx_combobox-tag__value", _this._getItemText(item)),
                dom_1.el("button.dhx_button.dhx_button--icon.dhx_combobox-tag__action.dhx_combobox__action-remove", {
                    type: "button"
                }, [
                    dom_1.el("span.dhx_button__icon.dxi.dxi-close-circle")
                ])
            ]);
        });
    };
    Combobox.prototype._drawImageOrIcon = function (item) {
        if (item.src) {
            return dom_1.el("img.dhx_combobox-tag__image", { src: item.src });
        }
        else if (item.icon) {
            return dom_1.el("span.dhx_combobox-tag__icon", { class: item.icon });
        }
        return null;
    };
    Combobox.prototype._getItemText = function (item) {
        if (!item) {
            return null;
        }
        return item.value;
    };
    return Combobox;
}(view_1.View));
exports.Combobox = Combobox;
function itemsCountTemplate(count, templateFN) {
    if (typeof templateFN === "function") {
        return templateFN(count);
    }
    else {
        return count + " " + en_1.default.selectedItems;
    }
}


/***/ }),
/* 59 */
/***/ (function(module, exports) {

if (Element && !Element.prototype.matches) {
    var proto = Element.prototype;
    proto.matches = proto.matchesSelector ||
        proto.mozMatchesSelector || proto.msMatchesSelector ||
        proto.oMatchesSelector || proto.webkitMatchesSelector;
}


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/**
* Copyright (c) 2017, Leon Sorokin
* All rights reserved. (MIT Licensed)
*
* domvm.js (DOM ViewModel)
* A thin, fast, dependency-free vdom view layer
* @preserve https://github.com/leeoniya/domvm (v3.2.6, micro build)
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

// creates a one-shot self-ending stream that redraws target vm
// TODO: if it's already registered by any parent vm, then ignore to avoid simultaneous parent & child refresh

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
	else {}
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
		
	}
	else {
		for (var key in nattrs) {
			var nval = nattrs[key];
			var isDyn = isDynProp(vnode.tag, key);
			var oval = isDyn ? vnode.el[key] : oattrs[key];

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

// view + key serve as the vm's unique identity
function ViewModel(view, data, key, opts) {
	var vm = this;

	vm.view = view;
	vm.data = data;
	vm.key = key;

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
		var vm = this;
		sync ? vm._redraw(null, null, isHydrated(vm)) : vm._redrawAsync();
		return vm;
	},
	update: function(newData, sync) {
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

	return vm;
}

// asSub means this was called from a sub-routine, so don't drain did* hook queue
function unmount(asSub) {
	var vm = this;

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

	return vm;
}

// this also doubles as moveTo
// TODO? @withRedraw (prevent redraw from firing)
function updateSync(newData, newParent, newIdx, withDOM) {
	var vm = this;

	if (newData != null) {
		if (vm.data !== newData) {
			fireHook(vm.hooks, "willUpdate", vm, newData);
			vm.data = newData;

			
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

return nano;

})));
//# sourceMappingURL=domvm.micro.js.map


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.KEY_CODES = {
    BACKSPACE: 8,
    ENTER: 13,
    ESC: 27,
    DOWN_ARROW: 40,
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(12);
var types_1 = __webpack_require__(11);
var Loader = /** @class */ (function () {
    function Loader(parent, changes) {
        this._parent = parent;
        this._changes = changes; // todo: [dirty] mutation
    }
    Loader.prototype.load = function (url, driver) {
        var _this = this;
        return this._parent.loadData = url.load().then(function (data) {
            _this._parent.removeAll();
            // const parcedData = this.parse(data, driver);
            return _this.parse(data, driver);
        }).catch(function (error) {
            _this._parent.events.fire(types_1.DataEvents.loadError, [error]);
        });
    };
    Loader.prototype.parse = function (data, driver) {
        if (driver === void 0) { driver = "json"; }
        if (driver === "json" && !helpers_1.hasJsonOrArrayStructure(data)) {
            this._parent.events.fire(types_1.DataEvents.loadError, ["Uncaught SyntaxError: Unexpected end of input"]);
        }
        driver = helpers_1.toDataDriver(driver);
        data = driver.toJsonArray(data);
        this._parent.$parse(data);
        return data;
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

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var xml_1 = __webpack_require__(64);
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
/* 64 */
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
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(12);
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
                return helpers_1.naturalCompare(aa.toString(), bb.toString());
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
/* 66 */
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
var core_1 = __webpack_require__(1);
var datacollection_1 = __webpack_require__(32);
var dataproxy_1 = __webpack_require__(16);
var helpers_1 = __webpack_require__(12);
var types_1 = __webpack_require__(11);
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
        var _this = this;
        if (index === void 0) { index = -1; }
        if (parent === void 0) { parent = this._root; }
        if (typeof obj !== "object") {
            obj = {
                value: obj
            };
        }
        if (Array.isArray(obj)) {
            obj.map(function (element, key) {
                if (key > 0 && index !== -1) {
                    index = index + 1;
                }
                element.parent = element.parent ? element.parent.toString() : parent;
                var id = _super.prototype.add.call(_this, element, index);
                if (Array.isArray(element.items)) {
                    for (var _i = 0, _a = element.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        _this.add(item, -1, element.id);
                    }
                }
                return id;
            });
        }
        else {
            obj.parent = obj.parent ? obj.parent.toString() : parent;
            var id = _super.prototype.add.call(this, obj, index);
            if (Array.isArray(obj.items)) {
                for (var _i = 0, _a = obj.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this.add(item, -1, obj.id);
                }
            }
            return id;
        }
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
    TreeCollection.prototype.sort = function (by) {
        var _this = this;
        if (!by) {
            this._childs = {};
            // [dirty]
            this._parse_data(Object.keys(this._pull).map(function (key) { return _this._pull[key]; }));
            if (this._filters) {
                for (var key in this._filters) {
                    var filter = this._filters[key];
                    this.filter(filter.rule, filter.config);
                }
            }
        }
        else {
            for (var key in this._childs) {
                this._sort.sort(this._childs[key], by);
            }
            if (this._initChilds && Object.keys(this._initChilds).length) {
                for (var key in this._initChilds) {
                    this._sort.sort(this._initChilds[key], by);
                }
            }
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
        // [todo] we can store multiple filter rules, like in datacollection
        this._filters = {};
        this._filters._ = {
            rule: rule,
            config: config
        };
        var newChilds = {};
        this._recursiveFilter(rule, config, this._root, 0, newChilds);
        var parents = [];
        var _loop_1 = function (i) {
            if (newChilds[i].length > 0 && newChilds[i] !== newChilds[this_1.getRoot()]) {
                var item = newChilds[this_1.getRoot()].find(function (element) {
                    if (element.id === i) {
                        return element;
                    }
                });
                if (item) {
                    parents.push(item);
                }
            }
        };
        var this_1 = this;
        for (var i in newChilds) {
            _loop_1(i);
        }
        newChilds[this.getRoot()] = parents;
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(4);
var CollectionStore_1 = __webpack_require__(68);
var types_1 = __webpack_require__(11);
var helpers_1 = __webpack_require__(12);
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
function dragEventContent(element, elements) {
    var rect = element.getBoundingClientRect();
    var ghost = document.createElement("div");
    var clone = element.cloneNode(true);
    clone.style.width = rect.width + "px";
    clone.style.height = rect.height + "px";
    clone.style.maxHeight = rect.height + "px";
    clone.style.opacity = "0.6";
    ghost.appendChild(clone);
    if (elements && elements.length) {
        elements.forEach(function (node, key) {
            var nodeClone = node.cloneNode(true);
            nodeClone.style.width = rect.width + "px";
            nodeClone.style.height = rect.height + "px";
            nodeClone.style.maxHeight = rect.height + "px";
            nodeClone.style.top = ((key + 1) * 12 - rect.height) - (rect.height * key) + "px";
            nodeClone.style.left = (key + 1) * 12 + "px";
            nodeClone.style.opacity = "0.6";
            nodeClone.style.zIndex = "" + (-key - 1);
            ghost.appendChild(nodeClone);
        });
    }
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
        this._selectedIds = [];
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
    DragManager.prototype.onMouseDown = function (e, selectedIds, itemsForGhost) {
        if (e.which !== 1) {
            return;
        }
        e.preventDefault();
        document.addEventListener("mousemove", this._onMouseMove);
        document.addEventListener("mouseup", this._onMouseUp);
        var item = html_1.locateNode(e, "dhx_id");
        var id = item && item.getAttribute("dhx_id");
        var targetId = html_1.locate(e, "dhx_widget_id");
        if (selectedIds && selectedIds.indexOf(id) !== -1 && selectedIds.length > 1) {
            this._selectedIds = selectedIds;
            this._itemsForGhost = itemsForGhost;
        }
        else {
            this._selectedIds = [];
            this._itemsForGhost = null;
        }
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
        var ghost = dragEventContent(this._transferData.item, this._itemsForGhost);
        var ans = target.events.fire(types_1.DragEvents.beforeDrag, [item, ghost]);
        if (!ans || !id) {
            return null;
        }
        target.events.fire(types_1.DragEvents.dragStart, [id, this._selectedIds]);
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
            if (this._selectedIds instanceof Array && this._selectedIds.length > 1) {
                this._selectedIds.map(function (selctedId) {
                    fromData.copy(selctedId, index, toData, targetId);
                    if (index > -1) {
                        index++;
                    }
                });
            }
            else {
                fromData.copy(from.id, index, toData, targetId);
            }
        }
        else {
            if (this._selectedIds instanceof Array && this._selectedIds.length > 1) {
                this._selectedIds.map(function (selctedId) {
                    fromData.move(selctedId, index, toData, targetId);
                    if (index > -1) {
                        index++;
                    }
                });
            }
            else {
                fromData.move(from.id, index, toData, targetId); // typescript bug??
            }
        }
    };
    DragManager.prototype._endDrop = function () {
        this._toggleTextSelection(false);
        if (this._transferData.target) {
            this._transferData.target.events.fire(types_1.DragEvents.dragEnd, [this._transferData.id, this._selectedIds]);
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
/* 68 */
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
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(2);
var types_1 = __webpack_require__(19);
var types_2 = __webpack_require__(11);
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
/* 70 */
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
var Cell_1 = __webpack_require__(71);
var dom_1 = __webpack_require__(0);
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
/* 71 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(3);
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
        if (this.config === null) {
            this.config = {};
        }
        if (this.config.hidden) {
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
                (this.config.gravity ? " dhx_layout-cell--gravity" : "") }), this.config.full ? [
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
            var newValue = blockOpts.xLayout
                ? e.x - blockOpts.range.min + window.pageXOffset
                : e.y - blockOpts.range.min + window.pageYOffset;
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
        if (!config) {
            return;
        }
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(73));
__export(__webpack_require__(36));
__export(__webpack_require__(21));


/***/ }),
/* 73 */
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
var core_1 = __webpack_require__(1);
var ts_data_1 = __webpack_require__(7);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var Keymanager_1 = __webpack_require__(20);
var types_1 = __webpack_require__(19);
var view_1 = __webpack_require__(3);
var Selection_1 = __webpack_require__(36);
var html_1 = __webpack_require__(4);
var types_2 = __webpack_require__(21);
var editors_1 = __webpack_require__(74);
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List(node, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, node, core_1.extend({
            itemHeight: config.virtual ? 34 : config.itemHeight || null,
            keyNavigation: false,
            multiselectionMode: config.multiselectionMode ? config.multiselectionMode : "click",
            editing: false
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
        _this.selection = new Selection_1.Selection({
            multiselection: _this.config.multiselection,
            multiselectionMode: _this.config.multiselectionMode,
        }, _this.data);
        _this._getHotkeys();
        var updater = function (updateObj) { return function (id, ids) {
            if (ids && ids instanceof Array) {
                ids.map(function (selectedId) { return _this.data.exists(selectedId) && _this.data.update(selectedId, updateObj); });
                return;
            }
            if (_this.data.exists(id)) {
                _this.data.update(id, updateObj);
            }
        }; };
        _this.events.on(ts_data_1.DataEvents.change, function () {
            if (_this.config.virtual) {
                _this._updateVirtual(0);
            }
            _this.paint();
        });
        _this.events.on(ts_data_1.DataEvents.load, function () {
            _this.data.map(function (item) {
                if (item.$selected) {
                    _this.selection.add(item.id);
                    _this.events.fire(types_2.ListEvents.click, [item.id, null]);
                }
            });
        });
        _this.events.on(ts_data_1.DragEvents.canDrop, updater({ $drophere: true }));
        _this.events.on(ts_data_1.DragEvents.cancelDrop, updater({ $drophere: undefined }));
        _this.events.on(ts_data_1.DragEvents.dragStart, updater({ $dragtarget: true }));
        _this.events.on(ts_data_1.DragEvents.dragEnd, updater({ $dragtarget: undefined }));
        _this.events.on(types_2.ListEvents.afterEditEnd, function (value, id) {
            var item = _this.data.getItem(id);
            _this.data.update(id, __assign({}, item, { value: value }));
            _this._edited = null;
            _this._getHotkeys();
            _this.paint();
        });
        _this.selection.events.on(types_1.SelectionEvents.afterSelect, function (id) {
            if (id) {
                _this.setFocusIndex(_this.data.getIndex(id));
            }
        });
        _this._handlers = {
            onmousedown: function (e) {
                var itemsForGhost = [];
                var item = html_1.locateNode(e, "dhx_id");
                var itemId = item && item.getAttribute("dhx_id");
                var selectionIds = _this.selection.getId();
                if (_this.config.multiselection && selectionIds instanceof Array) {
                    selectionIds.map(function (id) {
                        if (id !== itemId) {
                            itemsForGhost.push(_this.getRootView().refs[id].el);
                        }
                    });
                }
                return _this.config.dragMode && !_this._edited ? ts_data_1.dragManager.onMouseDown(e, _this.selection.getId(), itemsForGhost) : null;
            },
            ondragstart: function () { return _this.config.dragMode && !_this._edited ? false : null; },
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
                _this.setFocusIndex(_this.data.getIndex(id));
                _this.selection.add(id, e.ctrlKey || e.metaKey, e.shiftKey);
                _this.events.fire(types_2.ListEvents.click, [id, e]);
            },
            ondblclick: function (e) {
                var id = html_1.locate(e);
                if (!id) {
                    return;
                }
                if (_this.config.editing) {
                    _this.edit(id);
                }
                _this.events.fire(types_2.ListEvents.doubleClick, [id, e]);
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
    List.prototype.edit = function (id) {
        this._edited = id;
        if (!this.data.getItem(this._edited) || !this.events.fire(types_2.ListEvents.beforeEditStart, [id])) {
            this._edited = null;
            return;
        }
        this._getHotkeys();
        this.paint();
        this.events.fire(types_2.ListEvents.afterEditStart, [id]);
    };
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
            if (listItem.offsetTop >= listEl.scrollTop + listEl.clientHeight - listItem.clientHeight) {
                listEl.scrollTop = listItem.offsetTop - listEl.clientHeight + listItem.clientHeight;
            }
            else if (listItem.offsetTop < listEl.scrollTop) {
                listEl.scrollTop = listItem.offsetTop;
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
    List.prototype._renderItem = function (item, index) {
        var html = (this.config.template && this.config.template(item)) || item.html;
        var focus = index === this._focusIndex;
        if (item.id === this._edited) {
            var editor = editors_1.getEditor(item, this);
            return editor.toHTML();
        }
        return html ? this._renderAsHtml(html, item, focus) : this._renderAsValue(item, focus);
    };
    List.prototype._renderAsHtml = function (html, item, focus) {
        var itemHeight = this.config.itemHeight;
        return dom_1.el("li", {
            "class": "dhx_list-item" +
                (item.$selected ? " dhx_list-item--selected" : "") +
                (focus ? " dhx_list-item--focus" : "") +
                (item.$drophere && !this._edited ? " dhx_list-item--drophere" : "") +
                (item.$dragtarget && !this._edited ? " dhx_list-item--dragtarget" : "") +
                (this.config.dragMode && !this._edited ? " dhx_list-item--drag" : "") +
                // (this.selection.getItem() )
                (item.css ? " " + item.css : ""),
            "dhx_id": item.id,
            "_ref": item.id,
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
                (item.$drophere && !this._edited ? " dhx_list-item--drophere" : "") +
                (item.$dragtarget && !this._edited ? " dhx_list-item--dragtarget" : "") +
                (this.config.dragMode && !this._edited ? " dhx_list-item--drag" : "") +
                (item.css ? " " + item.css : ""),
            dhx_id: item.id,
            _ref: item.id,
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
                "max-height": this.config.height + "px",
                "position": "relative"
            }, class: this.config.css +
                (this.config.multiselection && this.selection.getItem() ? " dhx_no-select--pointer" : ""), dhx_widget_id: this._uid }, this._handlers), kids);
    };
    List.prototype._renderVirtualList = function () {
        var _this = this;
        var kids = this.data.mapRange(this._range[0], this._range[1], function (obj, index) { return _this._renderItem(obj, index); });
        return dom_1.el(".dhx_widget.dhx_virtual-list-wrapper", __assign({ dhx_widget_id: this._uid, style: {
                "max-height": this._visibleHeight
            } }, this._handlers), [
            dom_1.el("ul.dhx_list.dhx_list--virtual", {
                class: this.config.css +
                    (this.config.multiselection && this.selection.getItem() ? " dhx_no-select--pointer" : ""),
                style: {
                    "height": this._getHeight() + "px",
                    "padding-top": this._topOffset + "px"
                },
            }, kids)
        ]);
    };
    List.prototype._updateVirtual = function (position) {
        var overscanCount = 5;
        var totalHeight = this._getHeight();
        if (position > totalHeight - this._visibleHeight) {
            position = totalHeight - this._visibleHeight;
        }
        var count = Math.floor(this._visibleHeight / this.config.itemHeight) + overscanCount;
        var index = Math.floor(position / this.config.itemHeight);
        this._range = [index, count + index];
        this._topOffset = position;
        this.paint();
    };
    List.prototype._getHeight = function () {
        return this.data.getLength() * this.config.itemHeight;
    };
    List.prototype._getHotkeys = function () {
        var _this = this;
        if (this.config.keyNavigation) {
            if (this._edited) {
                if (this._navigationDestructor) {
                    this._navigationDestructor();
                }
            }
            else {
                var keyNavigation = this.config.keyNavigation;
                if (typeof this.config.keyNavigation !== "function") {
                    this._widgetInFocus = false;
                    keyNavigation = function () { return _this._widgetInFocus; };
                    this._documentClickDestuctor = core_1.detectWidgetClick(this._uid, function (isInnerClick) { return _this._widgetInFocus = isInnerClick; });
                }
                var preventEvent = function (fn) { return function (e) {
                    e.preventDefault();
                    fn();
                }; };
                this._navigationDestructor = Keymanager_1.addHotkeys({
                    "arrowdown": preventEvent(function () { return _this.setFocusIndex(_this._focusIndex + 1); }),
                    "arrowup": preventEvent(function () { return _this.setFocusIndex(_this._focusIndex - 1); }),
                    "enter": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id);
                        _this.events.fire(types_2.ListEvents.click, [id, e]);
                    },
                    "enter+shift": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, false, true);
                        _this.events.fire(types_2.ListEvents.click, [id, e]);
                    },
                    "enter+ctrl": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, true, false);
                        _this.events.fire(types_2.ListEvents.click, [id, e]);
                    },
                    "enter+meta": function (e) {
                        var id = _this.data.getId(_this._focusIndex);
                        _this.selection.add(id, true, false);
                        _this.events.fire(types_2.ListEvents.click, [id, e]);
                    }
                }, keyNavigation);
            }
        }
    };
    return List;
}(view_1.View));
exports.List = List;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var InputEditor_1 = __webpack_require__(75);
function getEditor(item, list) {
    return new InputEditor_1.InputEditor(item, list);
}
exports.getEditor = getEditor;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(21);
var InputEditor = /** @class */ (function () {
    function InputEditor(item, list) {
        var _this = this;
        this._list = list;
        this._config = list.config;
        this._item = item;
        this._list.events.on(types_1.ListEvents.focusChange, function (index, id) {
            if (_this._mode && id !== _this._item.id) {
                _this.endEdit();
            }
        });
        this._initHandlers();
    }
    InputEditor.prototype.endEdit = function () {
        if (this._input) {
            var value = this._input.value;
            if (this._list.events.fire(types_1.ListEvents.beforeEditEnd, [value, this._item.id])) {
                this._input.removeEventListener("blur", this._handlers.onBlur);
                this._input.removeEventListener("change", this._handlers.onChange);
                this._handlers = {};
                this._mode = false;
                this._list.events.fire(types_1.ListEvents.afterEditEnd, [value, this._item.id]);
            }
            else {
                this._input.focus();
            }
        }
    };
    InputEditor.prototype.toHTML = function () {
        this._mode = true;
        var itemHeight = this._config.itemHeight;
        return dom_1.el(".dhx_input-wrapper", {}, [
            dom_1.el("div.dhx_input-container", {}, [
                dom_1.el("input.dhx_input", {
                    class: this._item.css ? " " + this._item.css : "",
                    style: {
                        height: itemHeight,
                        width: "100%",
                        padding: "8px, 12px",
                    },
                    _hooks: {
                        didInsert: this._handlers.didInsert,
                    },
                    _key: this._item.id,
                    dhx_id: this._item.id
                }),
            ]),
        ]);
    };
    InputEditor.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onBlur: function () {
                _this.endEdit();
            },
            onChange: function () {
                _this.endEdit();
            },
            didInsert: function (node) {
                var input = node.el;
                _this._input = input;
                input.focus();
                input.value = _this._item.value;
                input.setSelectionRange(0, input.value.length);
                input.addEventListener("change", _this._handlers.onChange);
                input.addEventListener("blur", _this._handlers.onBlur);
            }
        };
    };
    return InputEditor;
}());
exports.InputEditor = InputEditor;


/***/ }),
/* 76 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var html_1 = __webpack_require__(4);
var view_1 = __webpack_require__(3);
var types_1 = __webpack_require__(37);
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
        this._popup.style.left = "0";
        this._popup.style.top = "0";
        document.body.appendChild(this._popup);
        this._setPopupSize(node, config);
        this._isActive = true;
        setTimeout(function () {
            _this.events.fire(types_1.PopupEvents.afterShow, [node]);
            _this._outerClickDestructor = _this._detectOuterClick(node);
        }, 100);
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
        if (config.indent && config.indent !== 0) {
            switch (config.mode) {
                case html_1.Position.top:
                    this._popup.style.top = parseInt(this._popup.style.top.slice(0, -2), null) - parseInt(config.indent.toString(), null) + "px";
                    break;
                case html_1.Position.bottom:
                    this._popup.style.top = parseInt(this._popup.style.top.slice(0, -2), null) + parseInt(config.indent.toString(), null) + "px";
                    break;
                case html_1.Position.left:
                    this._popup.style.left = parseInt(this._popup.style.left.slice(0, -2), null) - parseInt(config.indent.toString(), null) + "px";
                    break;
                case html_1.Position.right:
                    this._popup.style.left = parseInt(this._popup.style.left.slice(0, -2), null) + parseInt(config.indent.toString(), null) + "px";
                    break;
                default:
                    this._popup.style.top = parseInt(this._popup.style.top.slice(0, -2), null) + parseInt(config.indent.toString(), null) + "px";
                    break;
            }
        }
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
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CLEAR_TIMEOUT = 2000;
var KeyListener = /** @class */ (function () {
    function KeyListener() {
        var _this = this;
        this._sequence = "";
        document.addEventListener("keydown", function (e) {
            if (!_this._isActive) {
                return;
            }
            var key = e.key;
            if (key === "Backspace" && _this._sequence.length > 0) {
                _this._sequence = _this._sequence.slice(0, _this._sequence.length - 1);
                _this._change();
            }
            if (key.length < 2) { // handle only single key value
                _this._sequence += key;
                _this._change();
            }
        });
    }
    KeyListener.prototype.startNewListen = function (action) {
        this._isActive = true;
        this._sequence = "";
        this._currentAction = action;
    };
    KeyListener.prototype.endListen = function () {
        this._currentAction = null;
        this.reset();
        this._isActive = false;
    };
    KeyListener.prototype.reset = function () {
        this._sequence = "";
    };
    KeyListener.prototype._change = function () {
        this._currentAction(this._sequence);
        this._addClearTimeout();
    };
    KeyListener.prototype._addClearTimeout = function () {
        var _this = this;
        if (this._clearTimeout) {
            clearTimeout(this._clearTimeout);
        }
        this._clearTimeout = setTimeout(function () {
            _this.reset();
            _this._clearTimeout = null;
        }, CLEAR_TIMEOUT);
    };
    return KeyListener;
}());
exports.KeyListener = KeyListener;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var en_1 = __webpack_require__(38);
function selectAllView() {
    return dom_1.el(".dhx_list-item.dhx_combobox-options__item.dhx_combobox-options__item--select-all.dhx_combobox__action-select-all", en_1.default.selectAll);
}
exports.selectAllView = selectAllView;
function unselectAllView() {
    return dom_1.el(".dhx_list-item.dhx_combobox-options__item.dhx_combobox-options__item--select-all.dhx_combobox__action-select-all", en_1.default.unselectAll);
}
exports.unselectAllView = unselectAllView;
function emptyListView() {
    return dom_1.el("ul.dhx_list", [
        dom_1.el("li.dhx_list-item.dhx_combobox-options__item", {}, en_1.default.notFound)
    ]);
}
exports.emptyListView = emptyListView;


/***/ }),
/* 79 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var Keymanager_1 = __webpack_require__(20);
var view_1 = __webpack_require__(3);
var ts_popup_1 = __webpack_require__(8);
var types_1 = __webpack_require__(40);
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
    Slider.prototype.getValue = function () {
        var res;
        if (this.config.range) {
            var a = this._getValue(this._currentPosition);
            var b = this._getValue(this._extraCurrentPosition);
            res = a < b ? [a, b] : [b, a];
        }
        else {
            res = [this._getValue(this._currentPosition)];
        }
        return res;
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
            value = parseFloat(value);
            if (!isNaN(value)) {
                this._setValue(value);
                this.events.fire(types_1.SliderEvents.change, [value, old, false]);
            }
            else {
                throw new Error("Wrong value type, for more info check documentation https://docs.dhtmlx.com/suite/slider__api__slider_setvalue_method.html");
            }
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
        var result = Number(min) + Number(val) - remain + rounder;
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
                e.stopPropagation();
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
            var tickValue = +(Number(min) + length * len).toFixed(5);
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
/* 80 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var ts_timepicker_1 = __webpack_require__(23);
var DateHelper_1 = __webpack_require__(84);
var DateFormatter_1 = __webpack_require__(24);
var helper_1 = __webpack_require__(85);
var en_1 = __webpack_require__(43);
var types_1 = __webpack_require__(44);
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    function Calendar(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, container, core_1.extend({
            weekStart: "sunday",
            thisMonthOnly: false,
            dateFormat: (window && window.dhx && window.dhx.dateFormat),
            width: "250px"
        }, config)) || this;
        _this.events = new events_1.EventSystem();
        if (!_this.config.dateFormat) {
            if (_this.config.timePicker) {
                if (_this.config.timeFormat === 12) {
                    _this.config.dateFormat = "%d/%m/%y %h:%i %A";
                }
                else {
                    _this.config.dateFormat = "%d/%m/%y %H:%i";
                }
            }
            else {
                _this.config.dateFormat = "%d/%m/%y";
            }
        }
        if (_this.config.value) {
            _this._selected = DateHelper_1.DateHelper.toDateObject(_this.config.value, _this.config.dateFormat);
        }
        if (_this.config.date) {
            _this._currentDate = DateHelper_1.DateHelper.toDateObject(_this.config.date, _this.config.dateFormat);
        }
        else if (_this._selected) {
            _this._currentDate = new Date(_this._selected);
        }
        else {
            _this._currentDate = new Date();
        }
        switch (_this.config.view) {
            case types_1.ViewMode.months:
                _this._currentViewMode = types_1.ViewMode.months;
                break;
            case types_1.ViewMode.years:
                _this._currentViewMode = types_1.ViewMode.years;
                break;
            default:
                _this._currentViewMode = types_1.ViewMode.days;
        }
        _this._initHandlers();
        if (_this.config.timePicker) {
            _this._timepicker = new ts_timepicker_1.Timepicker(null, { timeFormat: _this.config.timeFormat, actions: true });
            var initTime = _this._selected || new Date();
            _this._timepicker.setValue(initTime);
            _this._time = _this._timepicker.getValue();
            _this._timepicker.events.on(ts_timepicker_1.TimepickerEvents.close, function () {
                _this._timepicker.setValue(_this._time);
                _this.showDate(null, types_1.ViewMode.days);
            });
            _this._timepicker.events.on(ts_timepicker_1.TimepickerEvents.save, function () {
                var _a = _this._timepicker.getValue(true), hour = _a.hour, minute = _a.minute, AM = _a.AM;
                var oldDate = _this._selected;
                var newDate = _this._selected = DateHelper_1.DateHelper.withHoursAndMinutes(_this._selected || new Date(), AM === false ? hour + 12 : hour, minute);
                if (_this.events.fire(types_1.CalendarEvents.beforeChange, [newDate, oldDate, true])) {
                    _this._selected = newDate;
                    _this.events.fire(types_1.CalendarEvents.change, [newDate, oldDate, true]);
                }
                _this._time = _this._timepicker.getValue();
                _this.showDate(null, types_1.ViewMode.days);
            });
        }
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    Calendar.prototype.setValue = function (date) {
        date = DateHelper_1.DateHelper.toDateObject(date, this.config.dateFormat);
        var oldDate = DateHelper_1.DateHelper.copy(this._selected);
        if (!this.events.fire(types_1.CalendarEvents.beforeChange, [date, oldDate, false])) {
            return false;
        }
        this._selected = date;
        this._currentDate = DateHelper_1.DateHelper.copy(this._selected);
        if (this._timepicker) {
            this._timepicker.setValue(date);
            this._time = this._timepicker.getValue();
        }
        this.events.fire(types_1.CalendarEvents.change, [date, oldDate, false]);
        this.paint();
        return true;
    };
    Calendar.prototype.getValue = function (asDateObject) {
        if (!this._selected) {
            return null;
        }
        if (asDateObject) {
            return DateHelper_1.DateHelper.copy(this._selected);
        }
        else {
            return DateFormatter_1.getFormatedDate(this.config.dateFormat, this._selected);
        }
    };
    Calendar.prototype.showDate = function (date, mode) {
        if (date) {
            this._currentDate = date;
        }
        if (mode) {
            this._currentViewMode = mode;
        }
        this.paint();
    };
    Calendar.prototype.destructor = function () {
        if (this._linkedCalendar) {
            this._unlink();
        }
        if (this._timepicker) {
            this._timepicker.destructor();
        }
        this.unmount();
    };
    Calendar.prototype.link = function (targetCalendar) {
        var _this = this;
        if (this._linkedCalendar) {
            this._unlink();
        }
        this._linkedCalendar = targetCalendar;
        var rawLowerData = this.getValue(true);
        var rawUpperDate = targetCalendar.getValue(true);
        var lowerDate = rawLowerData && DateHelper_1.DateHelper.dayStart(rawLowerData);
        var upperDate = rawUpperDate && DateHelper_1.DateHelper.dayStart(rawUpperDate);
        var rangeMark = function (date) {
            if (lowerDate && upperDate) {
                return date >= lowerDate && date <= upperDate && getRangeClass(date);
            }
        };
        var getRangeClass = function (date) {
            if (DateHelper_1.DateHelper.isSameDay(upperDate, lowerDate)) {
                return null;
            }
            var positionInRange = "dhx_calendar-day--in-range";
            if (DateHelper_1.DateHelper.isSameDay(date, lowerDate)) {
                positionInRange += " dhx_calendar-day--first-date";
            }
            if (DateHelper_1.DateHelper.isSameDay(date, upperDate)) {
                positionInRange += " dhx_calendar-day--last-date";
            }
            return positionInRange;
        };
        if (!this.config.block || !this._linkedCalendar.config.block) {
            this.config.block = function (date) {
                if (upperDate) {
                    return date > upperDate;
                }
            };
            this._linkedCalendar.config.block = function (date) {
                if (lowerDate) {
                    return date < lowerDate;
                }
            };
        }
        this.config.thisMonthOnly = true;
        targetCalendar.config.thisMonthOnly = true;
        if (!this.config.$rangeMark || !this._linkedCalendar.config.$rangeMark) {
            this.config.$rangeMark = this._linkedCalendar.config.$rangeMark = rangeMark;
        }
        this.events.on(types_1.CalendarEvents.change, function (date) {
            lowerDate = DateHelper_1.DateHelper.dayStart(date);
            _this._linkedCalendar.paint();
        }, "link");
        this._linkedCalendar.events.on(types_1.CalendarEvents.change, function (date) {
            upperDate = DateHelper_1.DateHelper.dayStart(date);
            _this.paint();
        }, "link");
        this._linkedCalendar.paint();
        this.paint();
    };
    Calendar.prototype._unlink = function () {
        if (this._linkedCalendar) {
            this.config.$rangeMark = this._linkedCalendar.config.$rangeMark = null;
            this.config.block = this._linkedCalendar.config.block = null;
            this.events.detach(types_1.CalendarEvents.change, "link");
            this._linkedCalendar.events.detach(types_1.CalendarEvents.change, "link");
            this._linkedCalendar.paint();
            this.paint();
            this._linkedCalendar = null;
        }
    };
    Calendar.prototype._draw = function () {
        switch (this._currentViewMode) {
            case types_1.ViewMode.days:
                return this._drawCalendar();
            case types_1.ViewMode.months:
                return this._drawMonthSelector();
            case types_1.ViewMode.years:
                return this._drawYearSelector();
            case types_1.ViewMode.timepicker:
                return this._drawTimepicker();
        }
    };
    Calendar.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onclick: {
                ".dhx_calendar-year, .dhx_calendar-month, .dhx_calendar-day": function (_e, vn) {
                    var date = vn.attrs._date;
                    var oldDate = DateHelper_1.DateHelper.copy(_this._selected);
                    switch (_this._currentViewMode) {
                        case types_1.ViewMode.days:
                            var mergedDate = _this.config.timePicker ? DateHelper_1.DateHelper.mergeHoursAndMinutes(date, _this._selected || _this._currentDate) : date;
                            if (!_this.events.fire(types_1.CalendarEvents.beforeChange, [mergedDate, oldDate, true])) {
                                return;
                            }
                            _this._selected = mergedDate;
                            _this.showDate(date);
                            _this.events.fire(types_1.CalendarEvents.change, [date, oldDate, true]);
                            break;
                        case types_1.ViewMode.months:
                            if (_this.config.view !== types_1.ViewMode.months) {
                                DateHelper_1.DateHelper.setMonth(_this._currentDate, date);
                                _this.showDate(null, types_1.ViewMode.days);
                            }
                            else {
                                var newDate = DateHelper_1.DateHelper.fromYearAndMonth(_this._currentDate.getFullYear() || _this._selected.getFullYear(), date);
                                if (!_this.events.fire(types_1.CalendarEvents.beforeChange, [newDate, oldDate, true])) {
                                    return;
                                }
                                _this._currentDate = newDate;
                                _this._selected = newDate;
                                _this.events.fire(types_1.CalendarEvents.change, [_this._selected, oldDate, true]);
                                _this.paint();
                            }
                            break;
                        case types_1.ViewMode.years:
                            if (_this.config.view !== types_1.ViewMode.years) {
                                DateHelper_1.DateHelper.setYear(_this._currentDate, date);
                                _this.showDate(null, types_1.ViewMode.months);
                            }
                            else {
                                var newDate = DateHelper_1.DateHelper.fromYear(date);
                                if (!_this.events.fire(types_1.CalendarEvents.beforeChange, [newDate, oldDate, true])) {
                                    return;
                                }
                                _this._currentDate = newDate;
                                _this._selected = newDate;
                                _this.events.fire(types_1.CalendarEvents.change, [_this._selected, oldDate, true]);
                                _this.paint();
                            }
                    }
                },
                ".dhx_calendar-action__cancel": function () { return _this.showDate(_this._selected, types_1.ViewMode.days); },
                ".dhx_calendar-action__show-month": function () { return _this.showDate(null, types_1.ViewMode.months); },
                ".dhx_calendar-action__show-year": function () { return _this.showDate(null, types_1.ViewMode.years); },
                ".dhx_calendar-action__next": function () {
                    var newDate;
                    switch (_this._currentViewMode) {
                        case types_1.ViewMode.days:
                            newDate = DateHelper_1.DateHelper.addMonth(_this._currentDate, 1);
                            break;
                        case types_1.ViewMode.months:
                            newDate = DateHelper_1.DateHelper.addYear(_this._currentDate, 1);
                            break;
                        case types_1.ViewMode.years:
                            newDate = DateHelper_1.DateHelper.addYear(_this._currentDate, 12);
                    }
                    _this.showDate(newDate);
                },
                ".dhx_calendar-action__prev": function () {
                    var newDate;
                    switch (_this._currentViewMode) {
                        case types_1.ViewMode.days:
                            newDate = DateHelper_1.DateHelper.addMonth(_this._currentDate, -1);
                            break;
                        case types_1.ViewMode.months:
                            newDate = DateHelper_1.DateHelper.addYear(_this._currentDate, -1);
                            break;
                        case types_1.ViewMode.years:
                            newDate = DateHelper_1.DateHelper.addYear(_this._currentDate, -12);
                    }
                    _this.showDate(newDate);
                },
                ".dhx_calendar-action__show-timepicker": function () {
                    _this._currentViewMode = types_1.ViewMode.timepicker;
                    _this.paint();
                }
            },
            onmouseover: {
                ".dhx_calendar-day": function (e, vn) { return _this.events.fire(types_1.CalendarEvents.dateHover, [e, new Date(vn.attrs._date)]); }
            }
        };
    };
    Calendar.prototype._getData = function (d) {
        var firstDay = this.config.weekStart === "monday" ? 1 : 0;
        var first = DateHelper_1.DateHelper.weekStart(DateHelper_1.DateHelper.monthStart(d), firstDay);
        var data = [];
        var weeksCount = 6;
        var currentDate = first;
        while (weeksCount--) {
            var currentWeek = DateHelper_1.DateHelper.getWeekNumber(currentDate);
            var disabledDays = 0;
            var daysCount = 7;
            var days = [];
            while (daysCount--) {
                var isDateWeekEnd = DateHelper_1.DateHelper.isWeekEnd(currentDate);
                var isCurrentMonth = d.getMonth() === currentDate.getMonth();
                var isBlocked = this.config.block && this.config.block(currentDate);
                var css = [];
                if (isDateWeekEnd && isCurrentMonth) {
                    css.push("dhx_calendar-day--weekend");
                }
                if (!isCurrentMonth) {
                    if (this.config.thisMonthOnly) {
                        disabledDays++;
                        css.push("dhx_calendar-day--hidden");
                    }
                    else {
                        css.push("dhx_calendar-day--muffled");
                    }
                }
                if (this.config.mark) {
                    var markedCss = this.config.mark(currentDate);
                    if (markedCss) {
                        css.push(markedCss);
                    }
                }
                if (this.config.$rangeMark) {
                    var rangeMark = this.config.$rangeMark(currentDate);
                    if (rangeMark) {
                        css.push(rangeMark);
                    }
                }
                if (isBlocked) {
                    if (isDateWeekEnd) {
                        css.push("dhx_calendar-day--weekend-disabled");
                    }
                    else {
                        css.push("dhx_calendar-day--disabled");
                    }
                }
                if (this._selected && currentDate.getDate() === this._selected.getDate()
                    && currentDate.getMonth() === this._selected.getMonth()
                    && this._selected.getFullYear() === currentDate.getFullYear()) {
                    css.push("dhx_calendar-day--selected");
                }
                days.push({
                    date: currentDate,
                    day: currentDate.getDate(),
                    css: css.join(" ")
                });
                currentDate = DateHelper_1.DateHelper.addDay(currentDate);
            }
            data.push({
                weekNumber: currentWeek,
                days: days,
                disabledWeekNumber: disabledDays === 7
            });
        }
        return data;
    };
    Calendar.prototype._drawCalendar = function () {
        var date = this._currentDate;
        var weekDays = this.config.weekStart === "monday"
            ? en_1.default.daysShort.slice(1).concat([en_1.default.daysShort[0]]) : en_1.default.daysShort;
        var weekDaysHeader = weekDays.map(function (day) { return dom_1.el(".dhx_calendar-weekday", day); });
        var data = this._getData(date);
        var content = [];
        var weekNumbers = [];
        var weekNumbersWrapper;
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var week = data_1[_i];
            var weekRow = week.days.map(function (item) { return dom_1.el("div.dhx_calendar-day", {
                class: item.css,
                _date: item.date,
                tabIndex: 1,
            }, item.day); });
            if (this.config.weekNumbers && !(week.disabledWeekNumber && this.config.thisMonthOnly)) {
                weekNumbers.push(dom_1.el("div", {
                    class: "dhx_calendar-week-number"
                }, week.weekNumber));
            }
            content = content.concat(weekRow);
        }
        if (this.config.weekNumbers) {
            weekNumbersWrapper = dom_1.el(".dhx_calendar__week-numbers", weekNumbers);
        }
        var widgetClass = "dhx_calendar dhx_widget" +
            (this.config.css ? " " + this.config.css : "") +
            (this.config.timePicker ? " dhx_calendar--with_timepicker" : "") +
            (this.config.weekNumbers ? " dhx_calendar--with_week-numbers" : "");
        return dom_1.el("div", __assign({ class: widgetClass, style: { width: this.config.weekNumbers ? "calc(" + this.config.width + " + 48px )" : this.config.width } }, this._handlers), [
            dom_1.el(".dhx_calendar__wrapper", [
                this._drawHeader(dom_1.el("button.dhx_calendar-action__show-month.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle", en_1.default.months[date.getMonth()] + " " + date.getFullYear())),
                this.config.weekNumbers && dom_1.el(".dhx_calendar__dates-wrapper", [
                    dom_1.el(".dhx_calendar__weekdays", weekDaysHeader),
                    dom_1.el(".dhx_calendar__days", content),
                    weekNumbersWrapper
                ]),
                !this.config.weekNumbers && dom_1.el(".dhx_calendar__weekdays", weekDaysHeader),
                !this.config.weekNumbers && dom_1.el(".dhx_calendar__days", content),
                this.config.timePicker ?
                    dom_1.el(".dhx_timepicker__actions", [
                        dom_1.el("button.dhx_calendar__timepicker-button." +
                            "dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--width_full.dhx_button--circle.dhx_calendar-action__show-timepicker", [
                            dom_1.el("span.dhx_button__icon.dxi.dxi-clock-outline"),
                            dom_1.el("span.dhx_button__text", this._time),
                        ])
                    ]) : null,
            ])
        ]);
    };
    Calendar.prototype._drawMonthSelector = function () {
        var date = this._currentDate;
        var currentMonth = date.getMonth();
        var currentYear = this._selected ? this._selected.getFullYear() : null;
        var widgetClass = "dhx_calendar dhx_widget" +
            (this.config.css ? " " + this.config.css : "") +
            (this.config.timePicker ? " dhx_calendar--with_timepicker" : "") +
            (this.config.weekNumbers ? " dhx_calendar--with_week-numbers" : "");
        return dom_1.el("div", __assign({ class: widgetClass, style: {
                width: this.config.weekNumbers ? "calc(" + this.config.width + " + 48px)" : this.config.width,
            } }, this._handlers), [
            dom_1.el(".dhx_calendar__wrapper", [
                this._drawHeader(dom_1.el("button.dhx_calendar-action__show-year.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle", date.getFullYear())),
                dom_1.el(".dhx_calendar__months", en_1.default.monthsShort.map(function (item, i) { return dom_1.el("div", {
                    class: "dhx_calendar-month" + (currentMonth === i && currentYear === date.getFullYear() ? " dhx_calendar-month--selected" : ""),
                    tabIndex: 1,
                    _date: i
                }, item); })),
                this.config.view !== types_1.ViewMode.months ? dom_1.el(".dhx_calendar__actions", [
                    dom_1.el("button.dhx_button.dhx_button--color_primary.dhx_button--view_link.dhx_button--size_small.dhx_button--width_full.dhx_button--circle.dhx_calendar-action__cancel", en_1.default.cancel)
                ]) : null
            ])
        ]);
    };
    Calendar.prototype._drawYearSelector = function () {
        var _this = this;
        var date = this._currentDate;
        var yearsDiapason = DateHelper_1.DateHelper.getTwelweYears(date);
        var widgetClass = "dhx_calendar dhx_widget" +
            (this.config.css ? " " + this.config.css : "") +
            (this.config.timePicker ? " dhx_calendar--with_timepicker" : "") +
            (this.config.weekNumbers ? " dhx_calendar--with_week-numbers" : "");
        return dom_1.el("div", __assign({ class: widgetClass, style: { width: this.config.weekNumbers ? "calc(" + this.config.width + " + 48px)" : this.config.width } }, this._handlers), [
            dom_1.el(".dhx_calendar__wrapper", [
                this._drawHeader(dom_1.el("button.dhx_button.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle", yearsDiapason[0] + "-" + yearsDiapason[yearsDiapason.length - 1])),
                dom_1.el(".dhx_calendar__years", yearsDiapason.map(function (item) { return dom_1.el("div", {
                    class: "dhx_calendar-year" + (_this._selected && item === _this._selected.getFullYear() ? " dhx_calendar-year--selected" : ""),
                    _date: item,
                    tabIndex: 1,
                }, item); })),
                this.config.view !== types_1.ViewMode.years && this.config.view !== types_1.ViewMode.months ? dom_1.el(".dhx_calendar__actions", [
                    dom_1.el("button.dhx_button.dhx_button--color_primary.dhx_button--view_link.dhx_button--size_small.dhx_button--width_full.dhx_button--circle.dhx_calendar-action__cancel", en_1.default.cancel)
                ]) : null
            ])
        ]);
    };
    Calendar.prototype._drawHeader = function (actionContent) {
        return dom_1.el(".dhx_calendar__navigation", [
            dom_1.el("button.dhx_calendar-navigation__button.dhx_calendar-action__prev" + helper_1.linkButtonClasses + ".dhx_button--icon.dhx_button--circle", [
                dom_1.el(".dhx_button__icon.dxi.dxi-chevron-left")
            ]),
            actionContent,
            dom_1.el("button.dhx_calendar-navigation__button.dhx_calendar-action__next" + helper_1.linkButtonClasses + ".dhx_button--icon.dhx_button--circle", [
                dom_1.el(".dhx_button__icon.dxi.dxi-chevron-right")
            ]),
        ]);
    };
    Calendar.prototype._drawTimepicker = function () {
        return dom_1.el(".dhx_widget.dhx-calendar", {
            class: (this.config.css ? " " + this.config.css : ""),
            style: { width: this.config.weekNumbers ? "calc(" + this.config.width + " + 48px)" : this.config.width }
        }, [
            dom_1.inject(this._timepicker.getRootView())
        ]);
    };
    return Calendar;
}(view_1.View));
exports.Calendar = Calendar;


/***/ }),
/* 81 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var ts_layout_1 = __webpack_require__(13);
var ts_slider_1 = __webpack_require__(22);
var en_1 = __webpack_require__(82);
var helper_1 = __webpack_require__(83);
var types_1 = __webpack_require__(42);
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
        if (helper_1.isTimeCheck(value)) {
            this._hoursSlider.setValue(0);
            this._minutesSlider.setValue(m);
            this._time.isAM = true;
        }
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
            if (value < _this._hoursSlider.config.min || value > _this._hoursSlider.config.max) {
                return;
            }
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
            if (value < _this._minutesSlider.config.min || value > _this._minutesSlider.config.max) {
                return;
            }
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
/* 82 */
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
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function is designed to resolve conflicts with the time setting for the 12 hour format.
 */
function isTimeCheck(value) {
    return /(^12:[0-5][0-9]?AM$)/i.test(value);
}
exports.isTimeCheck = isTimeCheck;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var DateFormatter_1 = __webpack_require__(24);
var DateHelper = /** @class */ (function () {
    function DateHelper() {
    }
    DateHelper.copy = function (d) {
        return new Date(d);
    };
    DateHelper.fromYear = function (year) {
        return new Date(year, 0, 1);
    };
    DateHelper.fromYearAndMonth = function (year, month) {
        return new Date(year, month, 1);
    };
    DateHelper.weekStart = function (d, firstWeekday) {
        var diff = (d.getDay() + 7 - firstWeekday) % 7;
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() - diff);
    };
    DateHelper.monthStart = function (d) {
        return new Date(d.getFullYear(), d.getMonth(), 1);
    };
    DateHelper.yearStart = function (d) {
        return new Date(d.getFullYear(), 0, 1);
    };
    DateHelper.dayStart = function (d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    };
    DateHelper.addDay = function (d, count) {
        if (count === void 0) { count = 1; }
        return new Date(d.getFullYear(), d.getMonth(), d.getDate() + count);
    };
    DateHelper.addMonth = function (d, count) {
        if (count === void 0) { count = 1; }
        return new Date(d.getFullYear(), d.getMonth() + count, 1);
    };
    DateHelper.addYear = function (d, count) {
        if (count === void 0) { count = 1; }
        return new Date(d.getFullYear() + count, d.getMonth(), 0);
    };
    DateHelper.withHoursAndMinutes = function (d, hours, minutes) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hours, minutes);
    };
    DateHelper.setMonth = function (d, month) {
        d.setMonth(month);
    };
    DateHelper.setYear = function (d, year) {
        d.setFullYear(year);
    };
    DateHelper.mergeHoursAndMinutes = function (source, target) {
        return new Date(source.getFullYear(), source.getMonth(), source.getDate(), target.getHours(), target.getMinutes());
    };
    DateHelper.isWeekEnd = function (d) {
        return d.getDay() === 0 || d.getDay() === 6;
    };
    DateHelper.getTwelweYears = function (d) {
        var y = d.getFullYear();
        var firstYear = y - y % 12;
        return core_1.range(firstYear, firstYear + 11);
    };
    DateHelper.getWeekNumber = function (d) {
        if (d.getDay() !== 6) {
            d = DateHelper.addDay(d, 6 - d.getDay());
        }
        var dayMS = 24 * 60 * 60 * 1000;
        var ordinal = (d.valueOf() - DateHelper.yearStart(d).valueOf()) / dayMS;
        return Math.floor((ordinal - d.getDay() + 10) / 7);
    };
    DateHelper.isSameDay = function (d1, d2) {
        return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
    };
    DateHelper.toDateObject = function (date, dateFormat) {
        if (typeof date === "string") {
            return DateFormatter_1.stringToDate(date, dateFormat);
        }
        else {
            return new Date(date);
        }
    };
    DateHelper.nullTimestampDate = new Date(0);
    return DateHelper;
}());
exports.DateHelper = DateHelper;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.linkButtonClasses = ".dhx_button.dhx_button--view_link.dhx_button--icon.dhx_button--size_medium.dhx_button--color_secondary";


/***/ }),
/* 86 */
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
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var html_1 = __webpack_require__(4);
var view_1 = __webpack_require__(3);
var core_1 = __webpack_require__(1);
var color_1 = __webpack_require__(25);
var colors_1 = __webpack_require__(87);
var en_1 = __webpack_require__(26);
var types_1 = __webpack_require__(46);
// tslint:disable-next-line
var tooltip_1 = __webpack_require__(47);
// tslint:disable-next-line
var ts_message_1 = __webpack_require__(28);
var picker_1 = __webpack_require__(91);
var calculations_1 = __webpack_require__(92);
var Colorpicker = /** @class */ (function (_super) {
    __extends(Colorpicker, _super);
    function Colorpicker(container, config) {
        var _this = _super.call(this, container, config) || this;
        _this._setPaletteGrip = function (e) {
            var paletteRect = _this.getRootView().refs.picker_palette.el.getBoundingClientRect();
            var top = e.clientY - paletteRect.top;
            var left = e.clientX - paletteRect.left;
            var _a = calculations_1.calculatePaletteGrip(paletteRect, top, left), s = _a.s, v = _a.v;
            _this._pickerState.hsv.s = s;
            _this._pickerState.hsv.v = v;
            _this.paint();
        };
        _this._setRangeGrip = function (e) {
            var rangeRect = _this.getRootView().refs.hue_range.el.getBoundingClientRect();
            var left = e.clientX - rangeRect.left;
            var _a = calculations_1.calculateRangeGrip(rangeRect, left), h = _a.h, rangeLeft = _a.rangeLeft;
            _this._pickerState.hsv.h = h;
            _this._pickerState.rangeLeft = rangeLeft;
            _this.paint();
        };
        _this._onColorClick = function (_e, node) {
            _this._selected = node.data.color.toUpperCase();
            _this.events.fire(types_1.ColorpickerEvents.colorChange, [_this._selected]);
        };
        _this._container = container;
        _this.config = core_1.extend({
            css: "",
            paletteOnly: false,
            grayShades: true,
            pickerOnly: false,
            customColors: [],
            palette: colors_1.palette,
            width: "238px"
        }, _this.config);
        // [dirty]
        if (!_this.config.palette) {
            _this.config.palette = colors_1.palette;
        }
        if (_this.config.customColors) {
            _this.config.customColors = _this.config.customColors.map(function (color) { return color.toUpperCase(); });
        }
        _this.events = new events_1.EventSystem(_this);
        _this._pickerState = {
            hsv: { h: 0, s: 1, v: 1 },
            currentView: types_1.ViewsTypes.palette,
            customHex: ""
        };
        _this._setHandlers();
        var view = dom_1.create({ render: function () { return _this._getContent(); } });
        _this.mount(_this._container, view);
        return _this;
    }
    Colorpicker.prototype.destructor = function () {
        this.unmount();
    };
    Colorpicker.prototype.focusValue = function (value) {
        if (this._focusColor(value)) {
            this.paint();
        }
    };
    Colorpicker.prototype.setValue = function (value) {
        if (this._focusColor(value)) {
            this.paint();
            this.events.fire(types_1.ColorpickerEvents.colorChange, [this._selected]);
        }
    };
    Colorpicker.prototype.getValue = function () {
        return this._selected;
    };
    Colorpicker.prototype.getCustomColors = function () {
        return this.config.customColors;
    };
    Colorpicker.prototype.setCustomColors = function (customColors) {
        this.config.customColors = customColors.map(function (color) { return color.toUpperCase(); });
        this.paint();
    };
    Colorpicker.prototype.setView = function (view) {
        if (types_1.ViewsTypes[view]) {
            this._pickerState.currentView = view;
            this.events.fire(types_1.ColorpickerEvents.viewChange, [view]);
            this.paint();
        }
    };
    Colorpicker.prototype.getView = function () {
        return this._pickerState.currentView;
    };
    Colorpicker.prototype._setHandlers = function () {
        var _this = this;
        this._handlers = {
            click: {
                ".dhx_palette__cell": this._onColorClick
            },
            mousedown: function (e) {
                var name = html_1.locate(e);
                _this._pickerState.customHex = "";
                if (name === "picker_palette") {
                    _this._setPaletteGrip(e);
                }
                else {
                    _this._setRangeGrip(e);
                }
                var handler = name === "picker_palette" ? _this._setPaletteGrip : _this._setRangeGrip;
                document.addEventListener("mousemove", handler);
                document.addEventListener("mouseup", function () {
                    document.removeEventListener("mousemove", handler);
                });
                _this.paint();
            },
            buttonsClick: function (button) {
                _this.setView(types_1.ViewsTypes.palette);
                if (button === "cancel") {
                    _this.events.fire(types_1.ColorpickerEvents.cancelClick, []);
                    return;
                }
                if (button === "apply" && _this.config.customColors.indexOf(_this._pickerState.background) === -1) {
                    _this.setValue(_this._pickerState.background);
                    _this.events.fire(types_1.ColorpickerEvents.selectClick, []);
                }
            },
            customColorClick: function () {
                _this.setView(types_1.ViewsTypes.picker);
            },
            oninput: function (e) {
                if (_this._inputTimeout) {
                    clearTimeout(_this._inputTimeout);
                }
                _this._inputTimeout = setTimeout(function () {
                    var val = e.target.value;
                    if (val.indexOf("#") === -1) {
                        val = "#" + val;
                    }
                    _this._pickerState.customHex = val;
                    if (color_1.isHex(val)) {
                        _this._pickerState.hsv = color_1.HexToHSV(val);
                        _this.paint();
                    }
                }, 100);
            },
            contextmenu: {
                ".dhx_palette__cell": function (e, node) {
                    e.preventDefault();
                    var index = _this.config.customColors.indexOf(node.data.color);
                    if (index !== -1) {
                        _this._removeCustomColor(index);
                    }
                    _this.paint();
                    return;
                }
            },
            mouseover: {
                ".dhx_palette__cell": function (e) {
                    if (e.target) {
                        tooltip_1.tooltip(en_1.default.rightClickToDelete, {
                            node: e.target,
                            position: ts_message_1.Position.bottom
                        });
                    }
                },
                ".dhx_colorpicker-custom-colors__picker": function (e) {
                    if (e.target) {
                        tooltip_1.tooltip(en_1.default.addNewColor, {
                            node: e.target,
                            position: ts_message_1.Position.bottom
                        });
                    }
                }
            }
        };
        this.events.on(types_1.ColorpickerEvents.colorChange, function () {
            _this.paint();
        });
    };
    Colorpicker.prototype._focusColor = function (value) {
        var hex = value.toUpperCase();
        if (!color_1.isHex(hex)) {
            return false;
        }
        var isInPalette = this.config.palette.reduce(function (state, col) {
            if (state) {
                return state;
            }
            col.forEach(function (color) {
                if (color.toUpperCase() === hex) {
                    state = true;
                    return;
                }
            });
            return state;
        }, false);
        var isInGrayShades = colors_1.grayShades.indexOf(hex) !== -1;
        if (!isInPalette && !isInGrayShades) {
            var colors = this.getCustomColors();
            if (colors.indexOf(hex.toUpperCase()) === -1) {
                colors.push(hex.toUpperCase());
            }
        }
        this._selected = hex || null;
        this._pickerState.hsv = color_1.HexToHSV(hex);
        return true;
    };
    Colorpicker.prototype._removeCustomColor = function (index) {
        this.config.customColors.splice(index, 1);
    };
    Colorpicker.prototype._getCells = function (colors, cellClass) {
        var _this = this;
        if (cellClass === void 0) { cellClass = ""; }
        return colors.reduce(function (cells, color) {
            var selected = (_this._selected || "").toUpperCase() === color.toUpperCase() ? "dhx_palette__cell--selected" : "";
            cells.push(dom_1.el(".dhx_palette__cell", {
                class: selected + " " + cellClass,
                _data: { color: color },
                style: "background:" + color
            }));
            return cells;
        }, []);
    };
    Colorpicker.prototype._getGrayShades = function () {
        return dom_1.el(".dhx_palette__row", this._getCells(colors_1.grayShades));
    };
    Colorpicker.prototype._getPalette = function () {
        var _this = this;
        return this.config.palette.reduce(function (total, row) {
            total.push(dom_1.el(".dhx_palette__col", _this._getCells(row)));
            return total;
        }, []);
    };
    Colorpicker.prototype._getContent = function () {
        var view;
        if (this.config.pickerOnly) {
            view = [picker_1.getPicker(this, this._pickerState, this._handlers)];
        }
        else {
            view = this._pickerState.currentView === "palette" ? [
                this.config.grayShades && this._getGrayShades()
            ].concat((this._getPalette()), [
                !this.config.paletteOnly && dom_1.el(".dhx_colorpicker-custom-colors", {
                    onmouseover: this._handlers.mouseover
                }, [
                    dom_1.el(".dhx_colorpicker-custom-colors__header", [
                        en_1.default.customColors
                    ]),
                    dom_1.el(".dhx_palette--custom.dhx_palette__row", this._getCells(this.config.customColors, "dhx_custom-color__cell").concat([
                        dom_1.el(".dhx_colorpicker-custom-colors__picker", {
                            class: "dxi dxi-plus",
                            onclick: this._handlers.customColorClick,
                            onmouseover: this._handlers.mouseover
                        })
                    ]))
                ]),
            ]) :
                [picker_1.getPicker(this, this._pickerState, this._handlers)];
        }
        return dom_1.el(".dhx_colorpicker", { class: this.config.css, style: { width: this.config.width } }, [
            dom_1.el(".dhx_palette", {
                onclick: this._handlers.click,
                oncontextmenu: this._handlers.contextmenu
            }, view)
        ]);
    };
    return Colorpicker;
}(view_1.View));
exports.Colorpicker = Colorpicker;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.grayShades = [
    "#000000",
    "#4C4C4C",
    "#666666",
    "#808080",
    "#999999",
    "#B3B3B3",
    "#CCCCCC",
    "#E6E6E6",
    "#F2F2F2",
    "#FFFFFF"
];
exports.palette = [
    [
        "#D4DAE4",
        "#B0B8CD",
        "#949DB1",
        "#727A8C",
        "#5E6677",
        "#3F4757",
        "#1D2534"
    ],
    [
        "#FFCDD2",
        "#FE9998",
        "#F35C4E",
        "#E94633",
        "#D73C2D",
        "#CA3626",
        "#BB2B1A"
    ],
    [
        "#F9E6AD",
        "#F4D679",
        "#EDB90F",
        "#EAA100",
        "#EA8F00",
        "#EA7E00",
        "#EA5D00"
    ],
    [
        "#BCE4CE",
        "#90D2AF",
        "#33B579",
        "#36955F",
        "#247346",
        "#1D5B38",
        "#17492D"
    ],
    [
        "#BDF0E9",
        "#92E7DC",
        "#02D7C5",
        "#11B3A5",
        "#018B80",
        "#026B60",
        "#024F43"
    ],
    [
        "#B3E5FC",
        "#81D4FA",
        "#29B6F6",
        "#039BE5",
        "#0288D1",
        "#0277BD",
        "#01579B"
    ],
    [
        "#AEC1FF",
        "#88A3F9",
        "#5874CD",
        "#2349AE",
        "#163FA2",
        "#083596",
        "#002381"
    ],
    [
        "#C5C0DA",
        "#9F97C1",
        "#7E6BAD",
        "#584A8F",
        "#4F4083",
        "#473776",
        "#3A265F"
    ],
    [
        "#D6BDCC",
        "#C492AC",
        "#A9537C",
        "#963A64",
        "#81355A",
        "#6E3051",
        "#4C2640"
    ],
    [
        "#D2C5C1",
        "#B4A09A",
        "#826358",
        "#624339",
        "#5D4037",
        "#4E342E",
        "#3E2723"
    ]
];


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var html_1 = __webpack_require__(4);
var types_1 = __webpack_require__(27);
var nodeTimeout = new WeakMap();
var containers = new Map();
function onExpire(node, fromClick) {
    if (fromClick) {
        clearTimeout(nodeTimeout.get(node));
    }
    var container = node.parentNode;
    var position = container.getAttribute("data-position");
    var parent = container.parentNode;
    var messageContainerInfo = containers.get(parent);
    if (!messageContainerInfo) {
        return;
    }
    var positionInfo = messageContainerInfo[position];
    if (!positionInfo) {
        return;
    }
    var stack = positionInfo.stack;
    var index = stack.indexOf(node);
    if (index !== -1) {
        container.removeChild(node);
        stack.splice(index, 1);
        if (stack.length === 0) {
            parent.removeChild(container);
        }
        return;
    }
}
function message(props) {
    var _a;
    if (typeof props === "string") {
        props = { text: props };
    }
    props.position = props.position || types_1.MessageContainerPosition.topRight;
    var messageBox = document.createElement("div");
    messageBox.className = "dhx_message " + (props.css || "");
    if (props.html) {
        messageBox.innerHTML = props.html;
    }
    else {
        messageBox.innerHTML = "<span class=\"dhx_message__text\">" + props.text + "</span>\n\t\t" + (props.icon ? "<span class=\"dhx_message__icon dxi " + props.icon + "\"></span>" : "");
    }
    var parent = props.node ? html_1.toNode(props.node) : document.body;
    var position = getComputedStyle(parent).position;
    if (position === "static") {
        parent.style.position = "relative";
    }
    var messageContainerInfo = containers.get(parent);
    if (!messageContainerInfo) {
        containers.set(parent, (_a = {},
            _a[props.position] = {
                stack: [],
                container: createMessageContainer(parent, props.position)
            },
            _a));
    }
    else if (!messageContainerInfo[props.position]) {
        messageContainerInfo[props.position] = {
            stack: [],
            container: createMessageContainer(parent, props.position)
        };
    }
    var _b = containers.get(parent)[props.position], stack = _b.stack, container = _b.container;
    if (stack.length === 0) {
        parent.appendChild(container);
    }
    stack.push(messageBox);
    container.appendChild(messageBox);
    if (props.expire) {
        var timeout = setTimeout(function () { return onExpire(messageBox); }, props.expire);
        nodeTimeout.set(messageBox, timeout);
    }
    messageBox.onclick = function () { return onExpire(messageBox, true); };
}
exports.message = message;
function createMessageContainer(parent, position) {
    var messageContainer = document.createElement("div");
    messageContainer.setAttribute("data-position", position);
    messageContainer.className = "dhx_message-container " +
        "dhx_message-container--" + position +
        (parent === document.body ? " dhx_message-container--in-body" : "");
    return messageContainer;
}


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(48);
var common_1 = __webpack_require__(49);
function alert(props) {
    var apply = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.apply;
    var unblock = common_1.blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var alertBox = document.createElement("div");
        alertBox.className = "dhx_alert " + (props.css || "");
        alertBox.innerHTML = "\n\t\t\t" + (props.header ? "<div class=\"dhx_alert__header\"> " + props.header + " </div>" : "") + "\n\t\t\t" + (props.text ? "<div class=\"dhx_alert__content\">" + props.text + "</div>" : "") + "\n\t\t\t<div class=\"dhx_alert__footer " + (props.buttonsAlignment ? ("dhx_alert__footer--" + props.buttonsAlignment) : "") + "\">\n\t\t\t\t<button class=\"dhx_alert__apply-button dhx_button dhx_button--view_flat dhx_button--color_primary dhx_button--size_medium\">" + apply + "</button>\n\t\t\t</div>";
        document.body.appendChild(alertBox);
        alertBox.querySelector(".dhx_alert__apply-button").focus();
        alertBox.querySelector("button").addEventListener("click", function () {
            unblock();
            document.body.removeChild(alertBox);
            res(true);
        });
    });
}
exports.alert = alert;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Promise) {
Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(48);
var common_1 = __webpack_require__(49);
function confirm(props) {
    var apply = props.buttons && props.buttons[0] ? props.buttons[0] : en_1.default.apply;
    var reject = props.buttons && props.buttons[1] ? props.buttons[1] : en_1.default.reject;
    var unblock = common_1.blockScreen(props.blockerCss);
    return new Promise(function (res) {
        var answer = function (val) {
            unblock();
            confirmBox.removeEventListener("click", clickHandler);
            document.body.removeChild(confirmBox);
            res(val);
        };
        var confirmBox = document.createElement("div");
        confirmBox.className = "dhx_alert dhx_alert--confirm" + (props.css ? " " + props.css : "");
        confirmBox.innerHTML = "\n\t\t" + (props.header ? "<div class=\"dhx_alert__header\"> " + props.header + " </div>" : "") + "\n\t\t" + (props.text ? "<div class=\"dhx_alert__content\">" + props.text + "</div>" : "") + "\n\t\t\t<div class=\"dhx_alert__footer " + (props.buttonsAlignment ? ("dhx_alert__footer--" + props.buttonsAlignment) : "") + "\">\n\t\t\t\t<button class=\"dhx_alert__confirm-aply dhx_button dhx_button--view_link dhx_button--color_primary dhx_button--size_medium\">" + apply + "</button>\n\t\t\t\t<button class=\"dhx_alert__confirm-reject dhx_button dhx_button--view_flat dhx_button--color_primary dhx_button--size_medium\">" + reject + "</button>\n\t\t\t</div>";
        document.body.appendChild(confirmBox);
        confirmBox.querySelector(".dhx_alert__confirm-reject").focus();
        var clickHandler = function (e) {
            if (e.target.tagName === "BUTTON") {
                answer(e.target.classList.contains("dhx_alert__confirm-aply"));
            }
        };
        confirmBox.addEventListener("click", clickHandler);
    });
}
exports.confirm = confirm;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(10)))

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = __webpack_require__(25);
var dom_1 = __webpack_require__(0);
var en_1 = __webpack_require__(26);
function getPicker(colorpicker, pickerState, handlers) {
    var rgb = color_1.HSVtoRGB(pickerState.hsv);
    pickerState.background = color_1.RGBToHex(rgb);
    var currentBackground = color_1.RGBToHex(color_1.HSVtoRGB({ h: pickerState.hsv.h, s: 1, v: 1 }));
    var root = colorpicker.getRootView();
    var box = root.refs ?
        root.refs.picker_palette.el.getBoundingClientRect()
        : { height: 200, width: 218, x: 0, y: 0 };
    var height = box.height - 2;
    var width = box.width - 2;
    var gripTop = (height - pickerState.hsv.v * height) - 4;
    var gripLeft = (pickerState.hsv.s * width) - 4;
    var rangeWidth = box.width - 6;
    var rangeGripLeft = rangeWidth - ((360 - pickerState.hsv.h) / 360) * rangeWidth;
    var inputValue = pickerState.customHex ?
        pickerState.customHex.replace("#", "")
        : pickerState.background.replace("#", "");
    return dom_1.el(".dhx_colorpicker-picker", {}, [
        dom_1.el(".dhx_colorpicker-picker__palette", {
            style: {
                height: 132,
                background: currentBackground
            },
            onmousedown: handlers.mousedown,
            dhx_id: "picker_palette",
            _ref: "picker_palette"
        }, [
            dom_1.el(".dhx_palette_grip", {
                style: {
                    top: gripTop,
                    left: gripLeft
                }
            })
        ]),
        dom_1.el(".dhx_colorpicker-hue-range", {
            style: { height: 16 },
            onmousedown: handlers.mousedown,
            dhx_id: "hue_range",
            _key: "hue_range",
            _ref: "hue_range"
        }, [
            dom_1.el(".dhx_colorpicker-hue-range__grip", { style: { left: rangeGripLeft } })
        ]),
        dom_1.el(".dhx_colorpicker-value", [
            dom_1.el(".dhx_colorpicker-value__color", { style: { background: pickerState.background } }),
            dom_1.el(".dhx_colorpicker-value__input-wrapper", [
                dom_1.el("input", {
                    class: "dhx_colorpicker-value__input",
                    value: inputValue,
                    oninput: handlers.oninput,
                    maxlength: "7",
                    _key: "hex_input"
                })
            ])
        ]),
        dom_1.el(".dhx_colorpicker-picker__buttons", [
            !colorpicker.config.pickerOnly && dom_1.el("button", {
                class: "dhx_button dhx_button--size_medium dhx_button--view_link dhx_button--color_primary",
                onclick: [handlers.buttonsClick, "cancel"]
            }, en_1.default.cancel),
            dom_1.el("button", {
                class: "dhx_button dhx_button--size_medium dhx_button--view_flat dhx_button--color_primary",
                onclick: [handlers.buttonsClick, "apply"]
            }, en_1.default.select)
        ])
    ]);
}
exports.getPicker = getPicker;
function calculatePaletteGrip(rootView, top, left) {
    var paletteRect = rootView.refs.picker_palette.el.getBoundingClientRect();
    var bottom = paletteRect.height;
    var right = paletteRect.width;
    top = top < 0 ? 0 : top > bottom ? bottom : top;
    left = left < 0 ? 0 : left > right ? right : left;
    var pLeft = Math.round(left / (right / 100));
    var pTop = 100 - Math.round(top / (bottom / 100));
    this._pickerState.hsv.s = pLeft / 100;
    this._pickerState.hsv.v = pTop / 100;
}
exports.calculatePaletteGrip = calculatePaletteGrip;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function calculatePaletteGrip(clientRect, top, left) {
    var bottom = clientRect.height;
    var right = clientRect.width;
    top = top < 0 ? 0 : top > bottom ? bottom : top;
    left = left < 0 ? 0 : left > right ? right : left;
    var pLeft = Math.round(left / (right / 100));
    var pTop = 100 - Math.round(top / (bottom / 100));
    return {
        s: pLeft / 100,
        v: pTop / 100
    };
}
exports.calculatePaletteGrip = calculatePaletteGrip;
function calculateRangeGrip(clientRect, left) {
    var right = clientRect.width;
    left = left < 0 ? 0 : left > right ? right : left;
    return {
        h: Math.round(360 * (left / right)),
        rangeLeft: left
    };
}
exports.calculateRangeGrip = calculateRangeGrip;


/***/ }),
/* 93 */
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
var ts_calendar_1 = __webpack_require__(41);
var events_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var label_1 = __webpack_require__(9);
var ts_popup_1 = __webpack_require__(8);
var types_1 = __webpack_require__(6);
var helper_1 = __webpack_require__(5);
var DateInputEvents;
(function (DateInputEvents) {
    DateInputEvents["change"] = "change";
})(DateInputEvents = exports.DateInputEvents || (exports.DateInputEvents = {}));
var DateInput = /** @class */ (function (_super) {
    __extends(DateInput, _super);
    function DateInput(container, config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = new events_1.EventSystem();
        _this._popup = new ts_popup_1.Popup({ css: "dhx_widget--border-shadow" });
        _this.calendar = new ts_calendar_1.Calendar(null, config);
        _this._popup.attach(_this.calendar);
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        _this.calendar.events.on(ts_calendar_1.CalendarEvents.change, function () {
            _this.config.value = _this.calendar.getValue();
            _this._popup.hide();
            _this.validate();
        });
        _this.events.on(DateInputEvents.change, function (value) {
            _this.config.value = _this._inputValidate(value);
            if (_this._inputValidate(value)) {
                _this.calendar.setValue(value);
            }
            _this.validate();
        });
        return _this;
    }
    DateInput.prototype.validate = function () {
        var isValid = !this.config.required || Boolean(this.config.value);
        this.config.$validationStatus = isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return isValid;
    };
    DateInput.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    DateInput.prototype.setValue = function (value) {
        this.calendar.setValue(value);
        this.paint();
    };
    DateInput.prototype.getValue = function () {
        return this.config.value || "";
    };
    DateInput.prototype.clear = function () {
        this.config.value = "";
        this.paint();
    };
    DateInput.prototype._getHandlers = function () {
        var _this = this;
        return {
            onfocus: function () {
                if (_this._popup.isVisible()) {
                    return;
                }
                var node = _this.getRootView().refs.input.el;
                _this._popup.show(node);
            },
            onchange: function (e) {
                var value = e.target.value;
                _this.events.fire(DateInputEvents.change, [value]);
            },
            onkeyup: function (e) {
                if (e.keyCode === 13) {
                    if (_this._popup.isVisible()) {
                        _this._popup.hide();
                    }
                    var node = _this.getRootView().refs.input.el;
                    node.blur();
                }
            }
        };
    };
    DateInput.prototype._inputValidate = function (value) {
        var dateFormat = this.calendar.config.dateFormat;
        return ts_calendar_1.stringToDate(value, dateFormat, true) ? value : "";
    };
    DateInput.prototype._draw = function () {
        var _a = this.config, value = _a.value, icon = _a.icon, required = _a.required, disabled = _a.disabled, placeholder = _a.placeholder, name = _a.name, id = _a.id, validation = _a.validation, _b = _a.editing, editing = _b === void 0 ? false : _b;
        return dom_1.el("div.dhx_form-group", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(validation)),
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", [
                dom_1.el("div.dhx_input-container", {}, [
                    dom_1.el(".dhx_input__icon", {
                        class: icon || "dxi dxi-calendar-today"
                    }),
                    dom_1.el("input.dhx_input.dhx_input--icon-padding", {
                        _key: this._uid,
                        value: value,
                        type: "text",
                        _ref: "input",
                        required: required,
                        disabled: disabled,
                        placeholder: placeholder || "",
                        name: name || "",
                        id: id || this._uid,
                        onfocus: this._handlers.onfocus,
                        onchange: this._handlers.onchange,
                        onkeyup: this._handlers.onkeyup,
                        autocomplete: "off",
                        readOnly: !editing
                    }),
                ]),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", {}, helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return DateInput;
}(label_1.Label));
exports.DateInput = DateInput;


/***/ }),
/* 94 */
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
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(3);
var events_1 = __webpack_require__(2);
var ButtonEvents;
(function (ButtonEvents) {
    ButtonEvents["click"] = "click";
})(ButtonEvents = exports.ButtonEvents || (exports.ButtonEvents = {}));
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, container, config) || this;
        _this.events = new events_1.EventSystem();
        _this._handlers = {
            onclick: function (e) { return _this.events.fire(ButtonEvents.click, [e]); }
        };
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    Button.prototype.setValue = function (value) {
        this.config.value = value;
        this.paint();
    };
    Button.prototype._draw = function () {
        var _a = this.config, color = _a.color, size = _a.size, view = _a.view, full = _a.full, loading = _a.loading, circle = _a.circle, icon = _a.icon, value = _a.value, disabled = _a.disabled, submit = _a.submit;
        var colorsCss = {
            danger: " dhx_button--color_danger",
            secondary: " dhx_button--color_secondary",
            primary: " dhx_button--color_primary",
            success: " dhx_button--color_success",
        }[color] || " dhx_button--color_primary";
        var sizeCss = {
            small: " dhx_button--size_small",
            medium: " dhx_button--size_medium",
        }[size] || " dhx_button--size_medium";
        var viewCss = {
            flat: " dhx_button--view_flat",
            link: " dhx_button--view_link",
        }[view] || " dhx_button--view_flat";
        var fullCss = full ? " dhx_button--width_full" : "";
        var circleCss = circle ? " dhx_button--circle" : "";
        var loadingCss = loading ? " dhx_button--loading" : "";
        var iconViewCss = icon && !value ? " dhx_button--icon" : "";
        return dom_1.el("button", {
            disabled: disabled,
            onclick: this._handlers.onclick,
            type: submit ? "submit" : "button",
            class: "dhx_button" +
                colorsCss +
                sizeCss +
                viewCss +
                fullCss +
                circleCss +
                loadingCss +
                iconViewCss
        }, [
            icon && dom_1.el("span.dhx_button__icon", {
                class: icon
            }),
            value && dom_1.el("span.dhx_button__text", value),
            loading && dom_1.el("span.dhx_button__loading", [
                dom_1.el("span.dhx_button__loading-icon.dxi.dxi-loading")
            ])
        ]);
    };
    return Button;
}(view_1.View));
exports.Button = Button;


/***/ }),
/* 95 */
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
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var helper_1 = __webpack_require__(5);
var ts_popup_1 = __webpack_require__(8);
var types_1 = __webpack_require__(6);
var CheckboxEvents;
(function (CheckboxEvents) {
    CheckboxEvents["change"] = "change";
})(CheckboxEvents = exports.CheckboxEvents || (exports.CheckboxEvents = {}));
var Checkbox = /** @class */ (function (_super) {
    __extends(Checkbox, _super);
    function Checkbox(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, container, config) || this;
        if (_this.config.help) {
            _this._helper = new ts_popup_1.Popup({ css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light" });
            _this._helper.attachHTML(_this.config.help);
        }
        _this._handlers = {
            showHelper: function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this._helper.show(e.target);
            },
            cancelUnusefulClick: function (e) {
                e.preventDefault();
            },
            onchange: function (e) {
                _this.config.checked = e.target.checked;
                _this.events.fire(CheckboxEvents.change, [e.target.checked]);
                _this.validate();
            }
        };
        _this.events = new events_1.EventSystem();
        _this.events.on(CheckboxEvents.change, function (value) {
            _this.config.checked = value;
        });
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    Checkbox.prototype.clear = function () {
        this.config.checked = false;
        this.paint();
    };
    Checkbox.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    Checkbox.prototype.setValue = function (value) {
        this.events.fire(CheckboxEvents.change, [value]);
        this.config.checked = value;
        this.paint();
    };
    Checkbox.prototype.getValue = function () {
        return this.config.checked || false;
    };
    Checkbox.prototype.validate = function () {
        var isValid = !this.config.required || this.config.checked;
        this.config.$validationStatus = isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return isValid;
    };
    Checkbox.prototype._draw = function () {
        var _a = this.config, id = _a.id, value = _a.value, label = _a.label, checked = _a.checked, disabled = _a.disabled, name = _a.name, help = _a.help, labelWidth = _a.labelWidth, labelInline = _a.labelInline, required = _a.required, hidden = _a.hidden;
        var visibility = hidden ? " dhx_form-group--hidden" : "";
        return dom_1.el("label.dhx_form-group", {
            class: visibility,
            style: { "margin-left": "" + (labelWidth && labelInline ? "calc(" + labelWidth + " + 16px)" : "") }
        }, [
            dom_1.el("div.dhx_checkbox", {
                class: helper_1.getFormItemCss(this.config, Boolean(required)) + (help ? " dhx_label--with-help" : "")
            }, [
                dom_1.el("input.dhx_checkbox__input", {
                    type: "checkbox",
                    id: id,
                    value: value || "",
                    name: name || "",
                    disabled: disabled,
                    checked: checked,
                    onchange: this._handlers.onchange,
                    required: required
                }),
                dom_1.el("span.dhx_checkbox__visual-input"),
                dom_1.el("span.dhx_label", {
                    class: help ? "dhx_label--with-help" : ""
                }, help ? [
                    dom_1.el("span.dhx_label__holder", label),
                    dom_1.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                        tabindex: "0",
                        role: "button",
                        onclick: this._handlers.showHelper
                    }),
                ] : label),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", {
                    onclick: this._handlers.cancelUnusefulClick,
                }, helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return Checkbox;
}(view_1.View));
exports.Checkbox = Checkbox;


/***/ }),
/* 96 */
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
var dom_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var ts_layout_1 = __webpack_require__(13);
var events_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var radiobutton_1 = __webpack_require__(97);
var helper_1 = __webpack_require__(5);
var types_1 = __webpack_require__(6);
var RadioGroupEvents;
(function (RadioGroupEvents) {
    RadioGroupEvents["change"] = "change";
})(RadioGroupEvents = exports.RadioGroupEvents || (exports.RadioGroupEvents = {}));
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup(container, config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = new events_1.EventSystem();
        _this._buttons = [];
        var mapConfig = _this.config.options.rows || _this.config.options.cols;
        var _a = _this.config, preMessage = _a.preMessage, errorMessage = _a.errorMessage, successMessage = _a.successMessage;
        mapConfig.map(function (option) {
            option.id = option.id || core_1.uid();
        });
        _this.layout = new ts_layout_1.Layout(null, config.options);
        mapConfig.map(function (option) {
            var radiobutton = new radiobutton_1.RadioButton(null, option);
            radiobutton.config.disabled = _this.config.disabled;
            radiobutton.config.name = _this.config.name;
            radiobutton.config.required = _this.config.required;
            radiobutton.config.css = _this.config.css;
            if (preMessage || errorMessage || successMessage) {
                radiobutton.config.preMessage = "";
                radiobutton.config.errorMessage = "";
                radiobutton.config.successMessage = "";
            }
            _this._buttons.push(radiobutton);
            _this.layout.cell(option.id).attach(radiobutton);
            radiobutton.events.on(radiobutton_1.RadioButtonEvents.change, function () {
                _this._buttons.map(function (element) {
                    if (element.config.id !== radiobutton.config.id) {
                        element.setValue(false);
                    }
                });
                _this.events.fire(radiobutton_1.RadioButtonEvents.change);
                _this.validate();
            });
        });
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    RadioGroup.prototype.validate = function () {
        var _this = this;
        var isValid = false;
        this._buttons.map(function (element) {
            if (!_this.config.required || element.config.checked) {
                isValid = true;
            }
        });
        this._buttons.map(function (element) {
            element.config.$validationStatus = isValid
                ? types_1.ValidationStatus.success
                : types_1.ValidationStatus.error;
        });
        this.config.$validationStatus = isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return isValid;
    };
    RadioGroup.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this._buttons.map(function (element) {
            element.clearValidate();
        });
        this.paint();
    };
    RadioGroup.prototype.clear = function () {
        this._buttons.map(function (element) {
            element.clear();
        });
        this.paint();
    };
    RadioGroup.prototype.getValue = function () {
        var value;
        this._buttons.map(function (element) {
            if (element.getValue()) {
                value = element.getValue();
            }
        });
        return value || "";
    };
    RadioGroup.prototype.setValue = function (value) {
        this._buttons.map(function (element) {
            value === element.config.value
                ? element.setValue(true)
                : element.setValue(false);
        });
        this.events.fire(radiobutton_1.RadioButtonEvents.change);
        this.paint();
    };
    RadioGroup.prototype._draw = function () {
        var _a = this._buttons[0].config, labelWidth = _a.labelWidth, labelInline = _a.labelInline;
        var hidden = this.config.hidden;
        var visibility = hidden ? " dhx_form-group--hidden" : "";
        return dom_1.el("div.dhx_form-group", {
            class: helper_1.getFormItemCss(this.config, Boolean(this.config.required)) + visibility,
        }, [
            dom_1.inject(this.layout.getRootView()),
            dom_1.el("div", {
                style: { "margin-left": "" + (labelWidth && labelInline ? "calc(" + labelWidth + " + 16px)" : "") }
            }, [
                dom_1.el("span.dhx_input-caption", helper_1.getValidationMessage(this.config))
            ])
        ]);
    };
    return RadioGroup;
}(view_1.View));
exports.RadioGroup = RadioGroup;


/***/ }),
/* 97 */
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
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var view_1 = __webpack_require__(3);
var helper_1 = __webpack_require__(5);
var ts_popup_1 = __webpack_require__(8);
var types_1 = __webpack_require__(6);
var RadioButtonEvents;
(function (RadioButtonEvents) {
    RadioButtonEvents["change"] = "change";
})(RadioButtonEvents = exports.RadioButtonEvents || (exports.RadioButtonEvents = {}));
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    function RadioButton(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, container, config) || this;
        if (_this.config.help) {
            _this._helper = new ts_popup_1.Popup({ css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light" });
            _this._helper.attachHTML(_this.config.help);
        }
        _this._handlers = {
            showHelper: function (e) {
                e.preventDefault();
                e.stopPropagation();
                _this._helper.show(e.target);
            },
            cancelUnusefulClick: function (e) {
                e.preventDefault();
            },
            onchange: function (e) {
                _this.config.checked = e.target.checked;
                _this.events.fire(RadioButtonEvents.change, [e.target.checked]);
            }
        };
        _this.events = new events_1.EventSystem();
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    RadioButton.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    RadioButton.prototype.clear = function () {
        this.config.checked = false;
        this.paint();
    };
    RadioButton.prototype.getValue = function () {
        if (this.config.checked) {
            return this.config.value;
        }
    };
    RadioButton.prototype.setValue = function (checked) {
        this.config.checked = checked;
        this.paint();
    };
    RadioButton.prototype._draw = function () {
        var _a = this.config, id = _a.id, value = _a.value, label = _a.label, checked = _a.checked, disabled = _a.disabled, name = _a.name, help = _a.help, labelWidth = _a.labelWidth, labelInline = _a.labelInline, required = _a.required;
        return dom_1.el("label.dhx_form-group.dhx_radiobutton", {
            class: helper_1.getFormItemCss(this.config, Boolean(required)) + (help ? " dhx_label--with-help" : ""),
            style: { "margin-left": "" + (labelWidth && labelInline ? "calc(" + labelWidth + " + 16px)" : "") }
        }, [
            dom_1.el("input.dhx_radiobutton__input", {
                type: "radio",
                id: id,
                value: value || "",
                name: name || "",
                disabled: disabled,
                checked: checked,
                onchange: this._handlers.onchange,
                required: required
            }),
            dom_1.el("span.dhx_radiobutton__visual-input"),
            dom_1.el("span.dhx_label", {
                class: help ? "dhx_label--with-help" : ""
            }, help ? [
                dom_1.el("span.dhx_label__holder", label),
                dom_1.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                    tabindex: "0",
                    role: "button",
                    onclick: this._handlers.showHelper
                }),
            ] : label), dom_1.el("span.dhx_input-caption", {
                onclick: this._handlers.cancelUnusefulClick,
            }, helper_1.getValidationMessage(this.config)),
        ]);
    };
    return RadioButton;
}(view_1.View));
exports.RadioButton = RadioButton;


/***/ }),
/* 98 */
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
var dom_1 = __webpack_require__(0);
var label_1 = __webpack_require__(9);
var helper_1 = __webpack_require__(5);
var events_1 = __webpack_require__(2);
var types_1 = __webpack_require__(6);
var SelectEvents;
(function (SelectEvents) {
    SelectEvents["change"] = "change";
})(SelectEvents = exports.SelectEvents || (exports.SelectEvents = {}));
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select(config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = new events_1.EventSystem();
        _this.config.value = _this.config.options[0].value || _this.config.value;
        return _this;
    }
    Select.prototype.validate = function () {
        var _a = this.config, required = _a.required, value = _a.value, validation = _a.validation;
        if (validation) {
            var isValid = this.config.validation(value);
            isValid
                ? this.config.$validationStatus = types_1.ValidationStatus.success
                : this.config.$validationStatus = types_1.ValidationStatus.error;
            this.paint();
            return isValid;
        }
        else {
            !required || Boolean(value)
                ? this.config.$validationStatus = types_1.ValidationStatus.success
                : this.config.$validationStatus = types_1.ValidationStatus.error;
            this.paint();
            return !required || Boolean(value);
        }
    };
    Select.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    Select.prototype.clear = function () {
        this.config.value = this.config.options[0].value;
        this.paint();
    };
    Select.prototype.setValue = function (value) {
        this.config.value = value;
        this.events.fire(SelectEvents.change, [value]);
        this.paint();
    };
    Select.prototype.getValue = function () {
        return this.config.value || "";
    };
    Select.prototype._getHandlers = function () {
        var _this = this;
        return {
            onchange: function (e) {
                var value = e.target.value;
                _this.config.value = value;
                _this.events.fire(SelectEvents.change, []);
                _this.validate();
            }
        };
    };
    Select.prototype._draw = function () {
        var _a = this.config, id = _a.id, options = _a.options, icon = _a.icon, required = _a.required, value = _a.value, validation = _a.validation;
        return dom_1.el(".dhx_form-group", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(validation))
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", {}, [
                dom_1.el("div.dhx_input-container", {}, [
                    dom_1.el(".dhx_input__icon", {
                        class: icon ? icon : "dxi dxi-menu-down"
                    }),
                    dom_1.el("select", {
                        id: id,
                        class: "dhx_select dhx_input",
                        onchange: this._handlers.onchange
                    }, options && options.map(function (option) { return dom_1.el("option", {
                        value: option.value,
                        disabled: option.disabled,
                        selected: option.selected || value === option.value,
                    }, option.content); })),
                ]),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return Select;
}(label_1.Label));
exports.Select = Select;


/***/ }),
/* 99 */
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
var dom_1 = __webpack_require__(0);
var helper_1 = __webpack_require__(5);
var input_1 = __webpack_require__(29);
var core_1 = __webpack_require__(1);
var Textarea = /** @class */ (function (_super) {
    __extends(Textarea, _super);
    function Textarea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Textarea.prototype._draw = function () {
        var _a = this.config, id = _a.id, value = _a.value, disabled = _a.disabled, name = _a.name, placeholder = _a.placeholder, required = _a.required, resizable = _a.resizable, readOnly = _a.readOnly, validation = _a.validation;
        return dom_1.el("div.dhx_form-group.dhx_form-group--textarea", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(validation))
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", [
                dom_1.el("textarea.dhx_input.dhx_input--textarea", {
                    type: "text",
                    id: id,
                    placeholder: placeholder || "",
                    value: core_1.isDefined(value) ? value : "",
                    name: name || "",
                    disabled: disabled,
                    required: required,
                    readOnly: readOnly,
                    onblur: this._handlers.onblur,
                    oninput: this._handlers.oninput,
                    style: {
                        resize: resizable ? "both" : "none",
                    }
                }),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", {}, helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return Textarea;
}(input_1.Input));
exports.Textarea = Textarea;


/***/ }),
/* 100 */
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
var dom_1 = __webpack_require__(0);
var core_1 = __webpack_require__(1);
var helper_1 = __webpack_require__(5);
var input_1 = __webpack_require__(29);
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.prototype._draw = function () {
        var _a = this.config, id = _a.id, value = _a.value;
        return dom_1.el("div.dhx_form-group.dhx_form-group--textinput", {
            class: helper_1.getFormItemCss(this.config)
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", [
                dom_1.el("input.dhx_input.dhx_input--textinput", {
                    type: "text",
                    readOnly: true,
                    id: id,
                    value: core_1.isDefined(value) ? value : "",
                    name: name || ""
                }),
            ])
        ]);
    };
    return Text;
}(input_1.Input));
exports.Text = Text;


/***/ }),
/* 101 */
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
var dom_1 = __webpack_require__(0);
var helper_1 = __webpack_require__(5);
var ts_combobox_1 = __webpack_require__(31);
var label_1 = __webpack_require__(9);
var types_1 = __webpack_require__(6);
var Combo = /** @class */ (function (_super) {
    __extends(Combo, _super);
    function Combo(config) {
        var _this = _super.call(this, null, config) || this;
        _this.combobox = new ts_combobox_1.Combobox(null, config);
        _this.data = _this.combobox.data;
        _this.events = _this.combobox.events;
        _this.combobox.events.on("change", function (change) {
            if (change !== "load") {
                _this.validate();
            }
        });
        setTimeout(function () {
            _this.setValue(_this.config.value);
        });
        return _this;
    }
    Combo.prototype.clear = function () {
        this.combobox.clear();
        this.paint();
    };
    Combo.prototype.getValue = function () {
        if (this.combobox.getValue() !== undefined) {
            if (this.combobox.getValue().length > 1) {
                return this.combobox.getValue(true);
            }
        }
        return this.combobox.getValue() || "";
    };
    Combo.prototype.setValue = function (value) {
        if (value) {
            this.combobox.setValue(value);
        }
        this.paint();
    };
    Combo.prototype.validate = function () {
        var value = this.combobox.getValue();
        var _a = this.config, validation = _a.validation, required = _a.required;
        if (validation) {
            var isValid = this.config.validation(value);
            this.config.$validationStatus = isValid
                ? types_1.ValidationStatus.success
                : types_1.ValidationStatus.error;
            this._validationStatus();
            this.paint();
            return isValid;
        }
        else if (required) {
            this.config.$validationStatus = Boolean(value)
                ? types_1.ValidationStatus.success
                : types_1.ValidationStatus.error;
            this._validationStatus();
            this.paint();
            return Boolean(value);
        }
        else {
            this.paint();
            return true;
        }
    };
    Combo.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this._validationStatus();
        this.paint();
    };
    Combo.prototype._validationStatus = function () {
        switch (this.config.$validationStatus) {
            case types_1.ValidationStatus.pre:
                this.combobox.config.css = this.config.css || "";
                break;
            case types_1.ValidationStatus.success:
                this.combobox.config.css = (this.config.css || "") + "dhx_form-group--state_success";
                break;
            case types_1.ValidationStatus.error:
                this.combobox.config.css = (this.config.css || "") + "dhx_form-group--state_error";
                break;
            default:
                this.combobox.config.css = this.config.css || "";
                break;
        }
    };
    Combo.prototype._getRootView = function () {
        this.combobox.paint();
        return this.combobox.getRootView();
    };
    Combo.prototype._draw = function () {
        var _a = this.config, labelWidth = _a.labelWidth, labelInline = _a.labelInline, $validationStatus = _a.$validationStatus;
        return dom_1.el(".dhx_form-group", {}, [
            dom_1.inject(this._getRootView()),
            dom_1.el("div", {
                style: { "margin-left": "" + (labelWidth && labelInline ? "calc(" + labelWidth + " + 16px)" : "") },
                class: $validationStatus === 1 ? "dhx_form-group--state_error" : $validationStatus === 2 ? "dhx_form-group--state_success" : "",
            }, [
                dom_1.el("span.dhx_input-caption", helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return Combo;
}(label_1.Label));
exports.Combo = Combo;


/***/ }),
/* 102 */
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
var ts_slider_1 = __webpack_require__(22);
var label_1 = __webpack_require__(9);
var SliderForm = /** @class */ (function (_super) {
    __extends(SliderForm, _super);
    function SliderForm(config) {
        var _this = _super.call(this, null, config) || this;
        _this.slider = new ts_slider_1.Slider(null, config);
        _this.events = _this.slider.events;
        _this.config.value = _this.slider.getValue();
        _this.slider.events.on("Change", function () {
            _this.validate();
            _this.config.value = _this.slider.getValue();
        });
        _this.disable(_this.config.disabled);
        return _this;
    }
    SliderForm.prototype.clear = function () {
        this.config.value = [0];
        this.slider.setValue(this.config.value);
    };
    SliderForm.prototype.getValue = function () {
        return this.config.value;
    };
    SliderForm.prototype.disable = function (disabled) {
        disabled ? this.slider.disable() : this.slider.enable();
    };
    SliderForm.prototype.setValue = function (value) {
        this.slider.setValue(value);
    };
    SliderForm.prototype.getRootView = function () {
        return this.slider.getRootView();
    };
    SliderForm.prototype.validate = function () {
        return true;
    };
    return SliderForm;
}(label_1.Label));
exports.SliderForm = SliderForm;


/***/ }),
/* 103 */
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
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var html_1 = __webpack_require__(4);
var view_1 = __webpack_require__(3);
var ts_data_1 = __webpack_require__(7);
var ts_vault_1 = __webpack_require__(104);
var ts_popup_1 = __webpack_require__(8);
var helper_1 = __webpack_require__(5);
var en_1 = __webpack_require__(52);
var types_1 = __webpack_require__(6);
var SimpleVault = /** @class */ (function (_super) {
    __extends(SimpleVault, _super);
    function SimpleVault(container, config) {
        var _this = _super.call(this, container, config) || this;
        if (_this.config.help) {
            _this._helper = new ts_popup_1.Popup({ css: "dhx_tooltip dhx_tooltip--forced dhx_tooltip--light" });
            _this._helper.attachHTML(_this.config.help);
        }
        _this.events = new events_1.EventSystem(_this);
        _this.data = new ts_data_1.DataCollection({}, _this.events);
        _this._uploader = new ts_vault_1.Uploader(__assign({}, config, { autosend: false }), _this.data, _this.events);
        _this.data.events.on(ts_data_1.DataEvents.change, function () {
            _this.validate();
            _this.paint();
        });
        _this._handlers = {
            add: function (e) {
                if (_this.config.disabled) {
                    return;
                }
                e.preventDefault();
                _this._uploader.selectFile();
            },
            remove: function (e) {
                if (_this.config.disabled) {
                    return;
                }
                var id = html_1.locate(e);
                if (!id) {
                    return;
                }
                _this.data.remove(id);
            },
            ondragover: function (e) {
                var types = e.dataTransfer.types;
                for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
                    var type = types_2[_i];
                    if (type !== "Files" && type !== "application/x-moz-file") {
                        return;
                    }
                }
                if (_this._dragoverTimeout) {
                    clearTimeout(_this._dragoverTimeout);
                }
                else {
                    _this.paint();
                }
                _this._dragover = true;
                _this._dragoverTimeout = setTimeout(function () {
                    _this._dragover = false;
                    _this._dragoverTimeout = null;
                    _this.paint();
                }, 150);
            },
            showHelper: function (e) {
                e.stopPropagation();
                e.preventDefault();
                _this._helper.show(e.target);
            }
        };
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        return _this;
    }
    SimpleVault.prototype.validate = function () {
        var isValid = !this.config.required || this.data.getLength() > 0;
        this.config.$validationStatus = isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return isValid;
    };
    SimpleVault.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    SimpleVault.prototype.clear = function () {
        this.data.removeAll();
        this.paint();
    };
    SimpleVault.prototype.getValue = function () {
        return this.data.map(function (data) { return (data.file); }) || [];
    };
    SimpleVault.prototype._draw = function () {
        var _this = this;
        var files = this.data.getLength() ? dom_1.el("ul.dhx_simplevault__files.dhx_simplevault-files", this.data.map(function (file) { return dom_1.el("li.dhx_simplevault-files__item", [
            dom_1.el("span.dhx_simplevault-files__item-name", file.file.name),
            dom_1.el(".dhx_button.dhx_simplevault-files__delete.dhx_button--icon.dhx_button--view_link.dhx_button--size_small.dhx_button--color_secondary.dhx_button--circle", {
                dhx_id: file.id,
                onclick: _this._handlers.remove,
            }, [
                dom_1.el("span.dxi.dxi-delete-forever")
            ])
        ]); })) : null;
        var _a = this.config, id = _a.id, labelInline = _a.labelInline, label = _a.label, labelWidth = _a.labelWidth, help = _a.help, disabled = _a.disabled, required = _a.required, validation = _a.validation;
        var width = labelInline && labelWidth ? labelWidth : "";
        return dom_1.el(".dhx_form-group.dhx_form-group--simplevault", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(validation))
        }, [
            dom_1.el("label.dhx_label", {
                for: id || this._uid,
                style: { minWidth: width, maxWidth: width },
                class: help ? "dhx_label--with-help" : ""
            }, help ? [
                dom_1.el("span.dhx_label__holder", label),
                dom_1.el("span.dhx_label-help.dxi.dxi-help-circle-outline", {
                    tabindex: "0",
                    role: "button",
                    onclick: this._handlers.showHelper
                }),
            ] : label),
            dom_1.el(".dhx_input-wrapper", [
                dom_1.el("div", {
                    _hooks: {
                        didInsert: function (node) {
                            _this._uploader.linkDropArea(node.el);
                        }
                    },
                    ondragover: this._handlers.ondragover,
                    class: "dhx_simplevault" + (this._dragover ? " dhx_simplevault--on-drag" : "")
                }, [
                    dom_1.el("div.dhx_simplevault-loader", [
                        dom_1.el("span.dhx_simplevault__icon.dxi.dxi-vault")
                    ]),
                    dom_1.el(".dhx_simplevault__drop-area", [
                        dom_1.el("input.dhx_simplevault__input", {
                            type: "file",
                            id: id,
                            disabled: disabled,
                        }),
                        dom_1.el("span.dhx_simplevault__icon.dxi.dxi-vault"),
                        dom_1.el("span.dhx_simplevault__title", [
                            dom_1.el("span", en_1.default.simpleVaultText),
                            dom_1.el("br"),
                            dom_1.el("label.dhx_simplevault__label", {
                                onclick: this._handlers.add,
                                for: id
                            }, " " + en_1.default.simpleVaultLabel)
                        ]),
                    ]),
                    files,
                ]),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", {}, helper_1.getValidationMessage(this.config))
            ])
        ]);
    };
    return SimpleVault;
}(view_1.View));
exports.SimpleVault = SimpleVault;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(50));
__export(__webpack_require__(105));
__export(__webpack_require__(17));


/***/ }),
/* 105 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var html_1 = __webpack_require__(4);
var scrollView_1 = __webpack_require__(106);
var view_1 = __webpack_require__(3);
var ts_data_1 = __webpack_require__(7);
var ts_layout_1 = __webpack_require__(13);
var ts_message_1 = __webpack_require__(28);
var ts_toolbar_1 = __webpack_require__(107);
var en_1 = __webpack_require__(30);
var types_1 = __webpack_require__(17);
var Uploader_1 = __webpack_require__(50);
var configs_1 = __webpack_require__(120);
var helper_1 = __webpack_require__(121);
var ProgressBar_1 = __webpack_require__(122);
var ReadStackPreview_1 = __webpack_require__(123);
var Vault = /** @class */ (function (_super) {
    __extends(Vault, _super);
    function Vault(container, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, null, core_1.extend({
            mode: types_1.VaultMode.list,
            toolbar: true,
            updateFromResponse: true,
            scaleFactor: 4,
            customScroll: true,
            uploader: {},
            progressBar: {}
        }, config)) || this;
        if (!_this.config.toolbar) {
            _this.config.uploader.autosend = true;
        }
        if (config.data) {
            _this.data = config.data;
            _this.events = config.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.DataCollection({}, _this.events);
        }
        _this.data.config.init = function (obj) {
            obj.status = obj.status || types_1.FileStatus.uploaded;
            if (obj.file) {
                obj.size = obj.file.size;
                obj.name = obj.file.name;
            }
            else {
                obj.size = obj.size || 0;
                obj.name = obj.name || "";
            }
            if (_this.config.mode === types_1.VaultMode.grid && obj.file && helper_1.isImage(obj)) {
                _this._readStack.add(obj, _this.uploader.config.autosend);
            }
            return obj;
        };
        _this._readStack = new ReadStackPreview_1.ReadStackPreview(_this.data);
        _this.uploader = new Uploader_1.Uploader(_this.config.uploader, _this.data, _this.events);
        _this._scrollView = new scrollView_1.ScrollView(function () { return _this._vaultView.getRootView(); });
        _this._progressBar = new ProgressBar_1.ProgressBar(_this.events, _this.config.progressBar);
        _this.events.on(types_1.UploaderEvents.uploadProgress, function (progress, current, total) { return _this._progressBar.setState(progress, { current: current, total: total }); });
        _this._initHandlers();
        _this._initUI(container);
        _this._initEvents();
        return _this;
    }
    Vault.prototype.destructor = function () {
        this.toolbar.destructor();
        this._readStack.stop();
        this.uploader.unlinkDropArea();
        this.uploader.abort();
    };
    Vault.prototype.getRootView = function () {
        return this._layout.getRootView();
    };
    Vault.prototype._initUI = function (container) {
        var _this = this;
        var cfg = this.config.toolbar ? configs_1.layoutConfig : configs_1.layoutConfigWithoutTopbar;
        cfg.on = this._getDragEvents();
        var layout = this._layout = new ts_layout_1.Layout(container, cfg);
        var toolbar = this.toolbar = new ts_toolbar_1.Toolbar(null, { css: "vault-toolbar" });
        this.toolbar.data.parse([
            {
                id: "add",
                tooltip: en_1.default.add,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-plus"
            },
            {
                id: "upload",
                tooltip: en_1.default.upload,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi icon-upload" // Custom Web Font Icon
            },
            {
                id: "spacer",
                type: ts_toolbar_1.ItemType.spacer
            },
            {
                id: "remove-all",
                tooltip: en_1.default.clearAll,
                type: ts_toolbar_1.ItemType.button,
                icon: "dxi-delete-forever"
            }
        ]);
        this._hideUploadAndDeleteButtons();
        this._vaultView = view_1.toViewLike(dom_1.create({ render: function () { return _this._draw(); } }));
        if (this.config.toolbar) {
            layout.cell("topbar").attach(toolbar);
        }
        layout.cell("vault").attach(this._vaultView);
    };
    Vault.prototype._initHandlers = function () {
        var _this = this;
        this._handlers = {
            onclick: {
                ".action-add": function () { return _this.uploader.selectFile(); },
                ".action-remove-file": function (e) {
                    var id = html_1.locate(e);
                    if (!id) {
                        return;
                    }
                    _this.data.update(id, { $toRemove: true });
                    setTimeout(function () {
                        _this.data.update(id, { $toRemove: false }, true);
                        _this.data.remove(id);
                    }, 200);
                }
            },
            onmouseover: {
                ".action-download": function (e) {
                    ts_message_1.tooltip(en_1.default.download, {
                        node: e.target,
                        position: ts_message_1.Position.bottom
                    });
                },
                ".action-remove-file": function (e) {
                    ts_message_1.tooltip(en_1.default.clear, {
                        node: e.target,
                        position: ts_message_1.Position.bottom
                    });
                },
                ".title-content, .dhx-file-name": function (e) {
                    var id = html_1.locate(e);
                    var item = _this.data.getItem(id);
                    ts_message_1.tooltip(item.name, {
                        node: e.target,
                        position: ts_message_1.Position.bottom,
                        css: "tooltip-light"
                    });
                }
            }
        };
    };
    Vault.prototype._getDragEvents = function () {
        var _this = this;
        var rect = {
            left: null,
            top: null,
            width: null,
            height: null
        };
        return {
            dragleave: function (e) {
                if (!_this._canDrop) {
                    return;
                }
                if (e.pageX > rect.left + rect.width - 1 || e.pageX < rect.left || e.pageY > rect.top + rect.height - 1 || e.pageY < rect.top) {
                    _this._canDrop = false;
                    if (_this.config.toolbar) {
                        _this._layout.cell("topbar").show();
                    }
                    _this._layout.config.css = "vault-layout";
                    _this._layout.paint();
                }
            },
            dragenter: function (e) {
                e.preventDefault();
                if (_this.uploader.isActive || _this._canDrop) {
                    return;
                }
                var types = e.dataTransfer.types;
                for (var _i = 0, types_2 = types; _i < types_2.length; _i++) {
                    var type = types_2[_i];
                    if (type !== "Files" && type !== "application/x-moz-file") {
                        _this._canDrop = false;
                        return;
                    }
                }
                _this._canDrop = true;
                var clientRect = _this.getRootView().node.el.getBoundingClientRect();
                rect.left = clientRect.left + window.pageXOffset;
                rect.top = clientRect.top + window.pageYOffset;
                rect.width = clientRect.width;
                rect.height = clientRect.height;
                _this._canDrop = true;
                if (_this.config.toolbar) {
                    _this._layout.cell("topbar").hide();
                }
                _this._layout.config.css = "vault-layout dhx-dragin";
                _this._layout.paint();
            },
            dragover: function (e) {
                e.preventDefault();
            },
            drop: function (e) {
                e.preventDefault();
                if (!_this._canDrop) {
                    return;
                }
                var dataTransfer = e.dataTransfer;
                _this.uploader.parseFiles(dataTransfer);
                _this._canDrop = false;
                if (_this.config.toolbar) {
                    _this._layout.cell("topbar").show();
                }
                _this._layout.config.css = "vault-layout";
                _this._layout.paint();
            }
        };
    };
    Vault.prototype._hideUploadAndDeleteButtons = function () {
        this.toolbar.hide(["upload", "remove-all"]);
    };
    Vault.prototype._showUploadAndDeleteButtons = function () {
        if (this.uploader.config.autosend) {
            this.toolbar.show("remove-all");
        }
        else {
            this.toolbar.show(["upload", "remove-all"]);
        }
    };
    Vault.prototype._initEvents = function () {
        var _this = this;
        this.data.events.on(ts_data_1.DataEvents.change, function () {
            if (!_this.data.getLength()) {
                _this._hideUploadAndDeleteButtons();
            }
            else {
                _this._showUploadAndDeleteButtons();
            }
            _this._vaultView.paint();
        });
        this.events.on(types_1.UploaderEvents.uploadBegin, function () {
            if (_this.config.toolbar) {
                _this._layout.cell("topbar").attach(_this._progressBar);
            }
        });
        this.events.on(types_1.UploaderEvents.uploadComplete, function () {
            if (_this.config.mode === types_1.VaultMode.grid && _this.uploader.config.autosend) {
                _this._readStack.read();
            }
            if (_this.config.toolbar) {
                _this._layout.cell("topbar").attach(_this.toolbar);
            }
        });
        this.toolbar.events.on(ts_toolbar_1.NavigationBarEvents.click, function (id) {
            switch (id) {
                case "add":
                    _this.uploader.selectFile();
                    break;
                case "remove-all":
                    _this.data.removeAll();
                    break;
                case "upload":
                    _this.uploader.send();
                    break;
            }
        });
        this.events.on(types_1.ProgressBarEvents.cancel, function () {
            _this.uploader.abort();
            _this._vaultView.paint();
        });
    };
    Vault.prototype._draw = function () {
        var isEmpty = !this.data.getLength();
        var files = this.config.mode === types_1.VaultMode.grid ? this._drawGrid() : this._drawList();
        return dom_1.el("div", __assign({ class: "vault dhx_widget" + (this._canDrop ? " drop-here" : "") }, this._handlers, { dhx_widget_id: this._uid }), [
            this._canDrop || isEmpty ? this._drawDropableArea() :
                this.config.customScroll ? this._scrollView.render(files) : files
        ]);
    };
    Vault.prototype._getFileActions = function (file) {
        var defaultActions = [];
        var hoverActions = [];
        var actions = [
            dom_1.el(".dhx-default-actions", defaultActions),
            dom_1.el(".dhx-hover-actions", hoverActions)
        ];
        if (file.status === types_1.FileStatus.inprogress) {
            return actions;
        }
        if (file.status !== types_1.FileStatus.failed && file.link) {
            var link = (this.config.downloadURL || "") + file.link;
            var downloadName = link.split("/").pop().split("?")[0];
            var download = dom_1.el("a", {
                download: downloadName,
                class: "download-link",
                href: link
            }, [
                dom_1.el(".icon-btn.dxi.dxi-download.action-download")
            ]);
            hoverActions.push(download);
        }
        var remove = dom_1.el(".icon-btn.dxi.dxi-delete-forever.action-remove-file");
        hoverActions.push(remove);
        if (file.status === types_1.FileStatus.failed) {
            var warn = dom_1.el(".dxi.dxi-alert-circle.warning-status");
            defaultActions.push(warn);
        }
        if (file.status === types_1.FileStatus.uploaded) {
            var uploadComplete = dom_1.el(".dxi.dxi-checkbox-marked-circle.uploaded-status");
            defaultActions.push(uploadComplete);
        }
        return actions;
    };
    Vault.prototype._drawList = function () {
        var _this = this;
        return dom_1.el(".dhx-files-block.dhx-webkit-scroll", this.data.map(function (item) {
            var isError = item.status === types_1.FileStatus.failed && item.request;
            var inProgress = item.status === types_1.FileStatus.inprogress;
            var inQueue = item.status === types_1.FileStatus.queue;
            var notUploaded = item.status !== types_1.FileStatus.uploaded;
            return dom_1.el("div", {
                class: "dhx-file-item" + (item.$toRemove ? " to-remove" : "") + (inQueue ? " in-queue" : ""),
                dhx_id: item.id,
                _key: item.id
            }, [
                dom_1.el(".dhx-file-icon", [
                    dom_1.el("div", {
                        class: "dhx-file-type " + helper_1.getFileClassName(item) + (notUploaded ? " not-loaded" : "")
                    })
                ]),
                dom_1.el(".dhx-file-title", [
                    dom_1.el(".dhx-title-content", item.name),
                    dom_1.el(".dhx-file-info", [
                        isError && dom_1.el(".warn-message", item.request.statusText || en_1.default.error),
                        inProgress ? dom_1.el(".progress-value", (item.progress * 100).toFixed(1) + "%")
                            : dom_1.el(".dhx-size" + (isError && ".dhx-size-error" || ""), helper_1.getBasis(item.size))
                    ])
                ]),
                inProgress && dom_1.el(".dhx-download-progress", {
                    style: {
                        width: (item.progress * 100).toFixed(1) + "%"
                    }
                }),
                !inProgress && dom_1.el(".dhx-file-action", _this._getFileActions(item))
            ]);
        }));
    };
    Vault.prototype._drawDropableArea = function () {
        return dom_1.el(".dhx-dropable-area.drop-files-here", [
            dom_1.el(".dhx-big-icon-block", [
                dom_1.el(".dxi.icon-upload") // Custom Web Font Icon
            ]),
            !this._canDrop && dom_1.el(".drop-area-bold-text", en_1.default.dragAndDrop),
            !this._canDrop && dom_1.el(".drop-area-bold-text", en_1.default.filesOrFoldersHere),
            !this._canDrop && dom_1.el(".drop-area-light-text", en_1.default.or),
            !this._canDrop && dom_1.el("button.dhx_btn.dhx_btn--flat.dhx_btn--small.action-add", en_1.default.browse)
        ]);
    };
    Vault.prototype._drawGrid = function () {
        var _this = this;
        return dom_1.el("div", {
            class: "dhx-files-grid dhx-webkit-scroll"
        }, [
            dom_1.el(".dhx-grid-content", this.data.map(function (item) {
                var inProgress = item.status === types_1.FileStatus.inprogress;
                var inQueue = item.status === types_1.FileStatus.queue;
                var isError = item.status === types_1.FileStatus.failed;
                return dom_1.el("div", {
                    class: "dhx-file-grid-item" + (inProgress ? " in-progress" : "")
                        + (item.$toRemove ? " to-remove" : "") + (inQueue ? " in-queue" : "") + (isError ? " failed" : ""),
                    dhx_id: item.id,
                    _key: item.id
                }, [
                    dom_1.el(".dhx-preview-wrapper", [
                        item.preview ? dom_1.el(".dhx-server-file-preview", [
                            dom_1.el("img", { src: item.preview })
                        ]) :
                            item.image ? dom_1.el("canvas", {
                                width: 98 * _this.config.scaleFactor,
                                height: 98 * _this.config.scaleFactor,
                                _hooks: {
                                    didInsert: function (node) {
                                        var _a = helper_1.calculateCover(item.image), dx = _a.dx, dy = _a.dy, sx = _a.sx, sy = _a.sy, sHeight = _a.sHeight, sWidth = _a.sWidth;
                                        var ctx = node.el.getContext("2d");
                                        ctx.drawImage(item.image, sx, sy, sWidth, sHeight, dx, dy, 98 * _this.config.scaleFactor, 98 * _this.config.scaleFactor);
                                    }
                                }
                            }) : dom_1.el("div", {
                                class: "dhx-file-preview dhx-file-type " + helper_1.getFileClassName(item)
                            }),
                        inProgress && _this._drawCircle(item.progress)
                    ].concat(_this._getFileActions(item), [
                        dom_1.el(".dhx-file-info", [
                            isError && dom_1.el(".warn-message", item.request.statusText || en_1.default.error),
                            !inProgress && dom_1.el(".dhx-size" + (isError && ".dhx-size-error" || ""), helper_1.getBasis(item.size))
                        ])
                    ])),
                    dom_1.el(".dhx-file-name", helper_1.truncateWord(item.name))
                ]);
            }))
        ]);
    };
    Vault.prototype._drawCircle = function (progress) {
        return dom_1.el(".progress-layout", [
            dom_1.el(".progress-amount", (progress * 100).toFixed(1) + "%"),
            dom_1.sv("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                class: "progress-circle",
                viewBox: "0 0 60 60",
            }, [
                dom_1.sv("circle", {
                    "cx": 30,
                    "cy": 30,
                    "r": 28,
                    "stroke-width": 4,
                    "class": "progress-bar-background",
                }),
                dom_1.sv("circle.active-circle", {
                    "cx": 30,
                    "cy": 30,
                    "r": 28,
                    "stroke-width": 4,
                    "stroke-dasharray": "175.9 175.9",
                    "stroke-dashoffset": (1 - progress) * 175.9,
                    "class": "progress-bar-active",
                }),
            ])
        ]);
    };
    return Vault;
}(view_1.View));
exports.Vault = Vault;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(4);
var ScrollView = /** @class */ (function () {
    function ScrollView(getRootView, config) {
        var _a;
        if (config === void 0) { config = {}; }
        var _this = this;
        this.config = core_1.extend({
            speed: 20
        }, config);
        this._wheelName = html_1.isIE() ? "onmousewheel" : "onwheel";
        this._getRootView = getRootView;
        this._scrollTop = 0;
        this._runnerTop = 0;
        this._runnerHeight = 0;
        this._visibleArea = 1;
        this._scrollWidth = html_1.getScrollbarWidth();
        this._handlers = (_a = {
                onscroll: function () {
                    _this._update();
                }
            },
            _a[this._wheelName] = function (e) {
                e.preventDefault();
                var sign = (e.deltaY || -e.wheelDelta) > 0 ? 1 : -1;
                var delta = sign * _this.config.speed;
                var area = _this._getRefs().area;
                var maxBottom = area.scrollHeight - _this._runnerHeight;
                var newScrollTop = _this._scrollTop + delta;
                if (newScrollTop < 0) {
                    area.scrollTop = 0;
                }
                else if (newScrollTop > maxBottom) {
                    area.scrollTop = maxBottom;
                }
                else {
                    area.scrollTop = newScrollTop;
                }
                _this._update();
            },
            _a.onmousedownRunner = function (mouseDownEv) {
                mouseDownEv.preventDefault();
                var _a = _this._getRefs(), area = _a.area, runner = _a.runner;
                var rect = area.getBoundingClientRect();
                var top = rect.top + window.pageYOffset;
                var bottom = rect.bottom + window.pageYOffset;
                var maxBottom = area.scrollHeight - _this._runnerHeight;
                var delta = mouseDownEv.pageY - runner.getBoundingClientRect().top - window.pageYOffset;
                var mouseMove = function (e) {
                    var y = e.pageY - delta;
                    if (y <= top) {
                        area.scrollTop = 0;
                    }
                    else if (y > bottom) {
                        area.scrollTop = maxBottom;
                    }
                    else {
                        area.scrollTop = (y - top) / _this._visibleArea;
                    }
                    _this._update();
                };
                var mouseUp = function () {
                    document.removeEventListener("mousemove", mouseMove);
                    document.removeEventListener("mouseup", mouseUp);
                    document.body.classList.remove("dhx-no-select");
                };
                document.body.classList.add("dhx-no-select");
                document.addEventListener("mousemove", mouseMove);
                document.addEventListener("mouseup", mouseUp);
            },
            _a.onmousedownTrack = function (e) {
                if (e.target.classList.contains("scroll-runner")) {
                    return;
                }
                e.preventDefault();
                var mouseUp = function () {
                    document.removeEventListener("mouseup", mouseUp);
                    window.clearInterval(mousePressed); // typescript bug
                };
                var area = _this._getRefs().area;
                var top = e.target.getBoundingClientRect().top + window.pageYOffset;
                var maxBottom = area.scrollHeight - _this._runnerHeight;
                var y = e.pageY;
                var updateScroll = function () {
                    var scrollTop;
                    if (y < top + _this._runnerTop) {
                        scrollTop = _this._scrollTop - area.clientHeight;
                        if (scrollTop < 0) {
                            scrollTop = 0;
                        }
                    }
                    else if (y > top + _this._runnerTop + _this._runnerHeight) {
                        scrollTop = _this._scrollTop + area.clientHeight;
                        if (scrollTop > maxBottom) {
                            scrollTop = maxBottom;
                        }
                    }
                    else {
                        return;
                    }
                    area.scrollTop = scrollTop;
                    _this._update();
                };
                updateScroll();
                var mousePressed = setInterval(updateScroll, 100);
                document.addEventListener("mouseup", mouseUp);
            },
            _a);
    }
    ScrollView.prototype.render = function (element) {
        var _this = this;
        var _a;
        if (this._scrollWidth === 0) {
            return element;
        }
        return dom_1.el(".scroll-view-wrapper", {
            style: {
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative"
            }
        }, [
            dom_1.el(".scroll-view", {
                onscroll: this._handlers.onscroll,
                _ref: "scroll-view",
                _hooks: {
                    didInsert: function () {
                        _this._update();
                    },
                    didRecycle: function () {
                        _this._update();
                    }
                },
                style: {
                    "height": "100%",
                    "width": "calc(100% + " + this._scrollWidth + "px)",
                    "overflowY": "scroll",
                    "-ms-overflow-style": "scrollbar"
                },
            }, [element]),
            dom_1.el(".y-scroll", (_a = {
                    onmousedown: this._handlers.onmousedownTrack
                },
                _a[this._wheelName] = this._handlers[this._wheelName],
                _a.style = {
                    width: "10px",
                    height: "100%",
                    right: 0,
                    top: 0,
                    position: "absolute"
                },
                _a), [
                dom_1.el(".scroll-runner", {
                    _ref: "scroll-runner",
                    onmousedown: this._handlers.onmousedownRunner,
                    style: {
                        height: this._runnerHeight + "px",
                        right: "2px",
                        top: this._runnerTop,
                        width: "6px",
                        position: "absolute"
                    }
                })
            ])
        ]);
    };
    ScrollView.prototype._update = function () {
        var refs = this._getRefs();
        if (!refs) {
            return;
        }
        var area = refs.area, runner = refs.runner;
        this._visibleArea = area.clientHeight / area.scrollHeight;
        this._scrollTop = area.scrollTop;
        this._runnerTop = this._scrollTop * this._visibleArea;
        if (this._visibleArea < 1) {
            this._runnerHeight = area.clientHeight * this._visibleArea;
        }
        else {
            this._runnerHeight = 0;
        }
        // update dom
        runner.style.top = this._runnerTop + "px";
        runner.style.height = this._runnerHeight + "px";
    };
    ScrollView.prototype._getRefs = function () {
        var rootView = this._getRootView();
        if (rootView.refs && rootView.refs["scroll-view"] && rootView.refs["scroll-runner"]) {
            return {
                area: rootView.refs["scroll-view"].el,
                runner: rootView.refs["scroll-runner"].el
            };
        }
    };
    return ScrollView;
}());
exports.ScrollView = ScrollView;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(108));
var ts_navbar_1 = __webpack_require__(51);
exports.ItemType = ts_navbar_1.ItemType;
exports.NavigationBarEvents = ts_navbar_1.NavigationBarEvents;


/***/ }),
/* 108 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var html_1 = __webpack_require__(4);
var ts_navbar_1 = __webpack_require__(51);
var ts_message_1 = __webpack_require__(28);
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({
            navigationType: "click"
        }, config)) || this;
        _this._currentRoot = null;
        var render = function () { return _this._draw(); };
        _this.mount(element, dom_1.create({ render: render }));
        return _this;
    }
    Toolbar.prototype.getState = function () {
        var state = {};
        this.data.eachChild(this.data.getRoot(), function (item) {
            if (item.twoState && !item.group) {
                state[item.id] = item.active;
            }
            else if (item.type === ts_navbar_1.ItemType.input || item.type === ts_navbar_1.ItemType.selectButton) {
                state[item.id] = item.value;
            }
        }, false);
        for (var key in this._groups) {
            if (this._groups[key].active) {
                state[key] = this._groups[key].active;
            }
        }
        return state;
    };
    Toolbar.prototype.setState = function (state) {
        for (var key in state) {
            if (this._groups && this._groups[key]) {
                if (this._groups[key].active) {
                    this.data.update(this._groups[key].active, { active: false });
                    this._groups[key].active = state[key];
                    this.data.update(state[key], { active: true });
                }
            }
            else {
                var item = this.data.getItem(key);
                if (item.type === ts_navbar_1.ItemType.input || item.type === ts_navbar_1.ItemType.selectButton) {
                    this.data.update(key, { value: state[key] });
                }
                else {
                    this.data.update(key, { active: state[key] });
                }
            }
        }
    };
    Toolbar.prototype._customHandlers = function () {
        var _this = this;
        return {
            input: function (e) {
                var id = html_1.locate(e);
                _this.data.update(id, { value: e.target.value });
            },
            tooltip: function (e) {
                var elem = html_1.locateNode(e);
                if (!elem) {
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.tooltip) {
                    ts_message_1.tooltip(item.tooltip, {
                        node: elem,
                        position: ts_message_1.Position.bottom
                    });
                }
            }
        };
    };
    Toolbar.prototype._getFactory = function () {
        return ts_navbar_1.createFactory({
            widget: this,
            defaultType: ts_navbar_1.ItemType.navItem,
            allowedTypes: [
                ts_navbar_1.ItemType.button,
                ts_navbar_1.ItemType.customHTMLButton,
                ts_navbar_1.ItemType.imageButton,
                ts_navbar_1.ItemType.input,
                ts_navbar_1.ItemType.selectButton,
                ts_navbar_1.ItemType.separator,
                ts_navbar_1.ItemType.spacer,
                ts_navbar_1.ItemType.title,
                ts_navbar_1.ItemType.navItem,
                ts_navbar_1.ItemType.menuItem,
            ],
            widgetName: "toolbar"
        });
    };
    Toolbar.prototype._draw = function () {
        var _this = this;
        return dom_1.el("nav.dhx_widget.dhx_toolbar", {
            class: (this.config.css ? this.config.css : ""),
            style: { "min-height": this.data.getLength() ? "60px" : "" }
        }, [
            dom_1.el("ul.dhx_navbar.dhx_navbar--horizontal", {
                dhx_widget_id: this._uid,
                tabindex: 0,
                onclick: this._handlers.onclick,
                onmousedown: this._handlers.onmousedown,
                oninput: this._handlers.input,
                onmouseover: this._handlers.tooltip,
                _hooks: {
                    didInsert: function (node) {
                        node.el.addEventListener("keyup", function (e) {
                            if (e.which !== 9) {
                                return;
                            }
                            var elem = html_1.locateNode(document.activeElement);
                            if (!elem) {
                                return;
                            }
                            var id = elem.getAttribute("dhx_id");
                            var item = _this.data.getItem(id);
                            if (item.tooltip) {
                                ts_message_1.tooltip(item.tooltip, {
                                    node: elem,
                                    position: ts_message_1.Position.bottom,
                                    force: true
                                });
                            }
                        }, true);
                    }
                }
            }, this.data.map(function (item) { return _this._factory(item); }, this.data.getRoot(), false))
        ]);
    };
    Toolbar.prototype._getMode = function (item, root) {
        return item.id === root ? "bottom" : "right";
    };
    Toolbar.prototype._close = function () {
        this._activePosition = null;
        this._currentRoot = null;
        _super.prototype._close.call(this);
    };
    Toolbar.prototype._setRoot = function (id) {
        if (this.data.getParent(id) === this.data.getRoot()) {
            this._currentRoot = id;
        }
    };
    return Toolbar;
}(ts_navbar_1.Navbar));
exports.Toolbar = Toolbar;


/***/ }),
/* 109 */
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
var core_1 = __webpack_require__(1);
var dom_1 = __webpack_require__(0);
var events_1 = __webpack_require__(2);
var html_1 = __webpack_require__(4);
var Keymanager_1 = __webpack_require__(20);
var view_1 = __webpack_require__(3);
var ts_data_1 = __webpack_require__(7);
var types_1 = __webpack_require__(14);
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar(element, config) {
        var _this = _super.call(this, element, core_1.extend({}, config)) || this;
        _this._isContextMenu = false;
        _this._documentHaveListener = false;
        _this._rootItem = {};
        if (Array.isArray(_this.config.data)) {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.TreeCollection({}, _this.events);
        }
        else if (_this.config.data && _this.config.data.events) {
            _this.data = _this.config.data;
            _this.events = _this.data.events;
            _this.events.context = _this;
        }
        else {
            _this.events = new events_1.EventSystem(_this);
            _this.data = new ts_data_1.TreeCollection({}, _this.events);
        }
        _this._documentClick = function (e) {
            if (html_1.locate(e, "dhx_widget_id") !== _this._uid && _this._documentHaveListener) {
                document.removeEventListener("click", _this._documentClick);
                _this._documentHaveListener = false;
                _this._close();
            }
        };
        _this._currentRoot = _this.data.getRoot();
        _this._factory = _this._getFactory();
        _this._initHandlers();
        _this._init();
        _this._initEvents();
        if (Array.isArray(_this.config.data)) {
            _this.data.parse(_this.config.data);
        }
        return _this;
    }
    Navbar.prototype.paint = function () {
        _super.prototype.paint.call(this);
        this._vpopups.redraw();
    };
    Navbar.prototype.disable = function (ids) {
        this._setProp(ids, "disabled", true);
    };
    Navbar.prototype.enable = function (ids) {
        this._setProp(ids, "disabled", false);
    };
    Navbar.prototype.show = function (ids) {
        this._setProp(ids, "hidden", false);
    };
    Navbar.prototype.hide = function (ids) {
        this._setProp(ids, "hidden", true);
    };
    Navbar.prototype.destructor = function () {
        this.unmount();
        Keymanager_1.keyManager.removeHotKey(null, this);
        this._vpopups.unmount();
    };
    Navbar.prototype._customHandlers = function () {
        return {};
    };
    Navbar.prototype._close = function () {
        var _this = this;
        if (this._activeParents) {
            this._activeParents.forEach(function (parentId) { return _this.data.exists(parentId) && _this.data.update(parentId, { $activeParent: false }); });
        }
        if (this.config.navigationType === types_1.NavigationType.click) {
            this._isActive = false;
        }
        clearTimeout(this._currentTimeout);
        this._activeMenu = null;
        this.paint();
    };
    Navbar.prototype._init = function () {
        var _this = this;
        var render = function () { return dom_1.el("div", {
            dhx_widget_id: _this._uid,
            class: "dhx_" + (_this._isContextMenu ? " dhx_context-menu" : ""),
            onmousemove: _this._handlers.onmousemove,
            onmouseleave: _this._handlers.onmouseleave,
            onclick: _this._handlers.onclick,
            onmousedown: _this._handlers.onmousedown
        }, _this._drawPopups()); };
        this._vpopups = dom_1.create({
            render: render
        });
        this._vpopups.mount(document.body);
    };
    Navbar.prototype._initHandlers = function () {
        var _this = this;
        /*
            for navigation type click:
            first click open menu, _isActive = true
            after navigation use mousemove
            can be closed after outer click or menu leaf item click
        */
        this._isActive = this.config.navigationType !== types_1.NavigationType.click;
        this._handlers = __assign({ onmousemove: function (e) {
                if (!_this._isActive) {
                    return;
                }
                var elem = html_1.locateNode(e);
                if (!elem) {
                    return;
                }
                var id = elem.getAttribute("dhx_id");
                if (_this._activeMenu !== id) {
                    _this._activeMenu = id;
                    if (_this.data.haveItems(id)) {
                        var position = html_1.getRealPosition(elem);
                        _this.data.update(id, { $position: position }, false);
                    }
                    _this._activeItemChange(id);
                }
            }, onmouseleave: function () {
                if (_this.config.navigationType !== types_1.NavigationType.click) { // maybe all time when mouse leave close menu
                    _this._activeItemChange(null);
                }
            }, onclick: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (item.multiClick) {
                    return;
                }
                if (_this.data.haveItems(id)) {
                    if (id === _this._currentRoot) {
                        _this._close();
                        return;
                    }
                    if (!_this._isActive) {
                        _this._isActive = true;
                    }
                    _this._setRoot(id);
                    _this._activeMenu = id;
                    var position = html_1.getRealPosition(element);
                    _this.data.update(id, { $position: position }, false);
                    _this._activeItemChange(id);
                }
                else {
                    switch (item.type) {
                        case types_1.ItemType.input:
                        case types_1.ItemType.title:
                            break;
                        case types_1.ItemType.menuItem:
                        case types_1.ItemType.selectButton:
                            _this._onMenuItemClick(id, e);
                            break;
                        case types_1.ItemType.imageButton:
                        case types_1.ItemType.button:
                        case types_1.ItemType.customHTMLButton:
                        case types_1.ItemType.navItem:
                            if (item.twoState) {
                                _this.data.update(item.id, { active: !item.active });
                            }
                            _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                        // missed break for trigger close
                        default:
                            _this._close();
                    }
                }
            }, onmousedown: function (e) {
                var element = html_1.locateNode(e);
                if (!element) {
                    return;
                }
                var id = element.getAttribute("dhx_id");
                var item = _this.data.getItem(id);
                if (!item.multiClick) {
                    return;
                }
                var fireTime = 365;
                var timeout;
                var fireAction = function () {
                    _this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
                    if (fireTime > 50) {
                        fireTime -= 55;
                    }
                    timeout = setTimeout(fireAction, fireTime);
                };
                var mouseup = function () {
                    clearTimeout(timeout);
                    document.removeEventListener("mouseup", mouseup);
                };
                fireAction();
                document.addEventListener("mouseup", mouseup);
            } }, this._customHandlers());
    };
    Navbar.prototype._initEvents = function () {
        var _this = this;
        var timeout = null;
        this.data.events.on(types_1.DataEvents.change, function () {
            _this.paint();
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(function () {
                var groups = {};
                _this.data.eachChild(_this.data.getRoot(), function (item) {
                    if (item.group) {
                        item.twoState = true;
                        addInGroups(groups, item);
                    }
                }, true);
                _this._groups = groups;
                _this._resetHotkeys();
                timeout = null;
                _this.paint();
            }, 100);
        });
        this.events.on(types_1.NavigationBarEvents.click, function (id) {
            var item = _this.data.getItem(id);
            var parent = _this.data.getItem(item.parent);
            if (parent && parent.type === types_1.ItemType.selectButton) {
                _this.data.update(item.parent, { value: item.value, icon: item.icon });
            }
            if (item.group) {
                var group = _this._groups[item.group];
                if (group.active) {
                    _this.data.update(group.active, { active: false });
                }
                group.active = item.id;
                _this.data.update(item.id, { active: true });
            }
        });
        this._customInitEvents();
    };
    Navbar.prototype._getMode = function (item, root, _active) {
        if (_active === void 0) { _active = false; }
        return item.parent === root ? "bottom" : "right";
    };
    Navbar.prototype._drawMenuItems = function (id, asMenuItem) {
        var _this = this;
        if (asMenuItem === void 0) { asMenuItem = true; }
        return this.data.map(function (item) { return _this._factory(item, asMenuItem); }, id, false);
    };
    Navbar.prototype._setRoot = function (_id) {
        return; // need only for toolbar
    };
    Navbar.prototype._getParents = function (id, root) {
        var parentIds = [];
        var afterRoot = false;
        var currentItem = this.data.getItem(id);
        var disabled = currentItem && currentItem.disabled;
        this.data.eachParent(id, function (item) {
            if (item.id === root) {
                parentIds.push(item.id);
                afterRoot = true;
            }
            else if (!afterRoot) {
                parentIds.push(item.id);
            }
        }, !disabled);
        if (this._isContextMenu && this._activePosition) {
            parentIds.push(root);
        }
        return parentIds;
    };
    Navbar.prototype._listenOuterClick = function () {
        if (this._documentHaveListener) {
            return;
        }
        document.addEventListener("click", this._documentClick, true);
        this._documentHaveListener = true;
    };
    Navbar.prototype._customInitEvents = function () {
        return;
    };
    Navbar.prototype._drawPopups = function () {
        var _this = this;
        var id = this._activeMenu;
        if (!this._isContextMenu && !id) {
            return null;
        }
        var root = this._currentRoot;
        if (this._isContextMenu && !this._activePosition) {
            return null;
        }
        var parentIds = this._getParents(id, root);
        this._activeParents = parentIds;
        parentIds.forEach(function (parentId) { return _this.data.exists(parentId) && _this.data.update(parentId, { $activeParent: true }, false); });
        return parentIds.map(function (itemId) {
            if (!_this.data.haveItems(itemId)) {
                return null;
            }
            var item = _this.data.getItem(itemId) || _this._rootItem; // for root item
            return dom_1.el("ul", {
                class: "dhx_widget dhx_menu" + (_this.config.menuCss ? " " + _this.config.menuCss : ""),
                _key: itemId,
                _hooks: {
                    didInsert: function (vnode) {
                        var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                        var position = _this._isContextMenu && _this._activePosition && itemId === root ? _this._activePosition : item.$position;
                        var mode = _this._getMode(item, root, position === _this._activePosition);
                        var style = html_1.calculatePosition(position, { mode: mode, width: width, height: height });
                        item.$style = style;
                        vnode.patch({ style: style });
                    },
                    didRecycle: function (_, vnode) {
                        if (_this._isContextMenu && _this._activePosition && itemId === root) {
                            var _a = vnode.el.getBoundingClientRect(), width = _a.width, height = _a.height;
                            var style = html_1.calculatePosition(_this._activePosition, { mode: _this._getMode(item, root, true), width: width, height: height });
                            item.$style = style;
                            vnode.patch({ style: style });
                        }
                    }
                },
                tabindex: 0,
                style: item.$style || {
                    position: "absolute"
                }
            }, _this._drawMenuItems(itemId));
        }).reverse();
    };
    Navbar.prototype._onMenuItemClick = function (id, e) {
        var item = this.data.getItem(id);
        if (item.disabled) {
            return;
        }
        if (item.twoState) {
            this.data.update(item.id, { active: !item.active });
        }
        this.events.fire(types_1.NavigationBarEvents.click, [id, e]);
        this._close();
    };
    Navbar.prototype._activeItemChange = function (id) {
        var _this = this;
        if (this._activeParents) {
            var parentIds_1 = this._getParents(id, this._currentRoot);
            this._activeParents.forEach(function (parentId) {
                if (_this.data.exists(parentId) && parentIds_1.indexOf(parentId) === -1) {
                    _this.data.update(parentId, { $activeParent: false }, false);
                }
            });
        }
        if (id && !this._documentHaveListener) {
            this._listenOuterClick();
        }
        if (id && this.data.haveItems(id)) {
            this.events.fire(types_1.NavigationBarEvents.openMenu, [id]);
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this.paint();
        }
        else {
            this._activeMenu = id;
            clearTimeout(this._currentTimeout);
            this._currentTimeout = setTimeout(function () { return _this.paint(); }, 400);
        }
    };
    Navbar.prototype._resetHotkeys = function () {
        var _this = this;
        Keymanager_1.keyManager.removeHotKey(null, this);
        this.data.map(function (item) {
            if (item.hotkey) {
                Keymanager_1.keyManager.addHotKey(item.hotkey, function () { return _this._onMenuItemClick(item.id, null); }, _this);
            }
        });
    };
    Navbar.prototype._setProp = function (id, key, value) {
        var _this = this;
        var _a;
        if (Array.isArray(id)) {
            id.forEach(function (itemId) {
                var _a;
                return _this.data.update(itemId, (_a = {}, _a[key] = value, _a));
            });
        }
        else {
            this.data.update(id, (_a = {}, _a[key] = value, _a));
        }
    };
    return Navbar;
}(view_1.View));
exports.Navbar = Navbar;
function addInGroups(groups, item) {
    if (groups[item.group]) {
        if (item.active) {
            groups[item.group].active = item.id;
        }
        groups[item.group].elements.push(item.id);
    }
    else {
        groups[item.group] = {
            active: item.active ? item.id : null,
            elements: [item.id]
        };
    }
}


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var button_1 = __webpack_require__(111);
var navItem_1 = __webpack_require__(112);
var customHTMLButton_1 = __webpack_require__(113);
var imageButton_1 = __webpack_require__(114);
var input_1 = __webpack_require__(115);
var menuItem_1 = __webpack_require__(116);
var separator_1 = __webpack_require__(117);
var spacer_1 = __webpack_require__(118);
var title_1 = __webpack_require__(119);
var types_1 = __webpack_require__(14);
var helpers_1 = __webpack_require__(15);
function itemfactory(item, events, widgetName, props) {
    switch (item.type) {
        case types_1.ItemType.navItem:
        case types_1.ItemType.selectButton:
            return navItem_1.navItem(item, widgetName, props.collapsed);
        case types_1.ItemType.button:
            return button_1.button(item, widgetName);
        case types_1.ItemType.title:
            return title_1.title(item, widgetName);
        case types_1.ItemType.separator:
            return separator_1.separator(item, widgetName);
        case types_1.ItemType.spacer:
            return spacer_1.spacer(item, widgetName);
        case types_1.ItemType.input:
            return input_1.input(item, events, widgetName);
        case types_1.ItemType.imageButton:
            return imageButton_1.imageButton(item, widgetName);
        case types_1.ItemType.menuItem:
            return menuItem_1.menuItem(item, widgetName, props.asMenuItem);
        case types_1.ItemType.customHTMLButton:
            return customHTMLButton_1.customHTMLButton(item, widgetName);
        case types_1.ItemType.block:
        default:
            throw new Error("unknown item type " + item.type);
    }
}
function createFactory(_a) {
    var defaultType = _a.defaultType, allowedTypes = _a.allowedTypes, widgetName = _a.widgetName, widget = _a.widget;
    var allowedSet = new Set();
    for (var _i = 0, allowedTypes_1 = allowedTypes; _i < allowedTypes_1.length; _i++) {
        var type = allowedTypes_1[_i];
        allowedSet.add(type);
    }
    var config = widget.config, events = widget.events, data = widget.data;
    return function (item, asMenuItem) {
        if (item.hidden) {
            return null;
        }
        if (!item.type || item.type === "button" || item.type === "navItem" || item.type === "menuItem") {
            if (!item.value && !item.icon) {
                return null;
            }
        }
        item.type = item.type || defaultType;
        if (allowedSet && !allowedSet.has(item.type)) {
            item.type = defaultType;
        }
        if (item.type === types_1.ItemType.imageButton && widgetName !== "ribbon") {
            item.active = false;
        }
        if (asMenuItem && item.type !== types_1.ItemType.spacer && item.type !== types_1.ItemType.separator) {
            item.type = types_1.ItemType.menuItem;
        }
        if (data.haveItems(item.id)) {
            normalizeOpenIcon(widgetName, item, data);
        }
        return helpers_1.navbarComponentMixin(widgetName, item, asMenuItem, itemfactory(item, events, widgetName, { asMenuItem: asMenuItem, collapsed: widgetName !== "sidebar" || config.collapsed }));
    };
}
exports.createFactory = createFactory;
function normalizeOpenIcon(widgetName, item, data) {
    switch (widgetName) {
        case "sidebar":
        case "context-menu":
            item.$openIcon = "right";
            break;
        case "toolbar":
            if (item.parent === data.getRoot()) {
                item.$openIcon = "right";
            }
            else {
                item.$openIcon = "bot";
            }
            break;
        case "menu":
            if (item.parent !== this.data.getRoot()) {
                item.$openIcon = "right";
            }
            break;
        case "ribbon":
            var parent_1 = data.getItem(item.parent);
            if (parent_1 && item.type !== types_1.ItemType.block) {
                if (parent_1.type === types_1.ItemType.block) {
                    item.$openIcon = "bot";
                }
                else {
                    item.$openIcon = "right";
                }
            }
            break;
    }
}


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(15);
function button(item, widgetName) {
    var isIconButton = item.icon && !item.value;
    var counterClass = isIconButton ? " dhx_navbar-count--absolute" : " dhx_navbar-count--button-inline";
    return dom_1.el("button.dhx_button", {
        class: helpers_1.getNavbarButtonCSS(item, widgetName),
        dhx_id: item.id,
        disabled: item.disabled
    }, [
        item.icon ? helpers_1.getIcon(item.icon, "button") : null,
        item.value && dom_1.el("span.dhx_button__text", item.value),
        item.count > 0 && helpers_1.getCount(item, counterClass, isIconButton),
        item.value && item.$openIcon ? dom_1.el("span.dhx_button__icon.dhx_button__icon--menu.dxi.dxi-menu-right") : null,
        item.loading && dom_1.el("span.dhx_button__loading", [
            dom_1.el("span.dhx_button__loading-icon.dxi.dxi-loading")
        ])
    ]);
}
exports.button = button;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(15);
function navItem(item, widgetName, collapsed) {
    var baseClass = " dhx_" + widgetName + "-button";
    return dom_1.el("button", {
        class: "dhx_button" + baseClass +
            (item.active || item.$activeParent ? baseClass + "--active" : "") +
            (item.disabled ? baseClass + "--disabled" : "") +
            (item.$openIcon ? baseClass + "--select" : "") +
            (item.circle ? baseClass + "--circle" : "") +
            (item.size ? " " + baseClass + "--" + item.size : "") +
            (!item.value && item.icon ? baseClass + "--icon" : "") +
            (item.css ? " " + item.css : ""),
        dhx_id: item.id,
        disabled: item.disabled
    }, [
        item.icon && dom_1.el("span", {
            class: item.icon + baseClass + "__icon"
        }),
        item.value && dom_1.el("span", {
            class: baseClass.trim() + "__text"
        }, item.value),
        item.count > 0 && helpers_1.getCount(item, baseClass + "__count", collapsed),
        item.value && item.$openIcon && dom_1.el("span.dxi.dxi-menu-right", {
            class: baseClass + "__caret"
        })
    ]);
}
exports.navItem = navItem;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function customHTMLButton(item, widgetName) {
    return dom_1.el("button", {
        "dhx_id": item.id,
        ".innerHTML": item.html
    }, item.html ? "" : item.value);
}
exports.customHTMLButton = customHTMLButton;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(15);
function imageButton(item, widgetName) {
    var baseClass = "dhx_" + widgetName + "-button-image";
    var isRibbon = widgetName === "ribbon";
    return dom_1.el("button.dhx_button", {
        class: baseClass + (item.size ? " " + baseClass + "--" + item.size : "") +
            (!item.value && item.src ? " " + baseClass + "--icon" : "") +
            (isRibbon && item.$openIcon ? " " + baseClass + "--select" : "") +
            (item.active ? " " + baseClass + "--active" : ""),
        dhx_id: item.id,
    }, [
        isRibbon && item.value && item.$openIcon && dom_1.el("span.dxi.dxi-menu-right", {
            class: baseClass + "__caret"
        }),
        item.value && dom_1.el("span", {
            class: baseClass + "__text",
        }, item.value),
        item.src && dom_1.el("span", {
            class: baseClass + "__image",
            style: { backgroundImage: "url(" + item.src + ")" }
        }),
        item.count > 0 && helpers_1.getCount(item, baseClass + "__count", true),
    ]);
}
exports.imageButton = imageButton;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var types_1 = __webpack_require__(14);
function onBlur(events, id) {
    events.fire(types_1.NavigationBarEvents.inputBlur, [id]);
}
function onFocus(events, id) {
    events.fire(types_1.NavigationBarEvents.inputFocus, [id]);
}
function input(item, events, widgetName) {
    return dom_1.el(".dhx_form-group.dhx_form-group--no-message-holder.dhx_form-group--label_sr" + (".dhx_" + widgetName + "__input"), {
        style: {
            width: item.width ? item.width : "200px"
        },
    }, [
        dom_1.el("label.dhx_label", { for: item.id }, item.label),
        dom_1.el(".dhx_input-wrapper", [
            dom_1.el("input.dhx_input", {
                placeholder: item.placeholder,
                class: item.icon ? "dhx_input--icon-padding" : "",
                value: item.value,
                onblur: [onBlur, events, item.id],
                onfocus: [onFocus, events, item.id],
                dhx_id: item.id,
                _hooks: {
                    didInsert: function (node) {
                        if (events) {
                            events.fire(types_1.NavigationBarEvents.inputCreated, [item.id, node.el]);
                        }
                    }
                },
                _key: item.id
            }),
            item.icon ? dom_1.el(".dhx_input__icon", {
                class: item.icon
            }) : null,
        ])
    ]);
}
exports.input = input;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(15);
function menuItem(item, widgetName, asMenuItem) {
    var baseClass = asMenuItem ? " dhx_menu-button" : " dhx_nav-menu-button";
    return dom_1.el("button", {
        class: "dhx_button" + baseClass +
            (item.disabled ? baseClass + "--disabled" : "") +
            (item.$activeParent ? baseClass + "--active" : ""),
        disabled: item.disabled,
        dhx_id: item.id,
    }, asMenuItem ? [
        item.icon || item.value ? dom_1.el("span.dhx_menu-button__block.dhx_menu-button__block--left", [
            item.icon && dom_1.el("span.dhx_menu-button__icon", {
                class: item.icon
            }),
            item.value && dom_1.el("span.dhx_menu-button__text", item.value),
        ]) : null,
        (item.count > 0 || item.hotkey || item.items) ? dom_1.el("span.dhx_menu-button__block.dhx_menu-button__block--right", [
            item.count > 0 && helpers_1.getCount(item, " dhx_menu-button__count", false),
            item.hotkey && dom_1.el("span.dhx_menu-button__hotkey", item.hotkey),
            item.items && dom_1.el("span.dhx_menu-button__caret.dxi.dxi-menu-right"),
        ]) : null
    ] : [
        item.value && dom_1.el("span.dhx_nav-menu-button__text", item.value),
    ]);
}
exports.menuItem = menuItem;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function separator(item, widgetName) {
    return null;
}
exports.separator = separator;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function spacer(_item, widgetName) {
    return null;
}
exports.spacer = spacer;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var dom_1 = __webpack_require__(0);
function title(item, widgetName) {
    return dom_1.el("span", {
        class: "dhx_navbar-title" + " dhx_navbar-title--" + widgetName,
    }, item.value);
}
exports.title = title;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutConfig = {
    css: "vault-layout",
    rows: [
        {
            id: "topbar",
            css: "vault-topbar"
        },
        {
            id: "vault",
            css: "vault-file-grid"
        }
    ]
};
exports.layoutConfigWithoutTopbar = {
    css: "vault-layout",
    rows: [
        {
            id: "vault",
            css: "vault-file-grid"
        }
    ]
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var en_1 = __webpack_require__(30);
var basis = [
    "byte",
    "kilobyte",
    "megabyte",
    "gigabyte"
];
function getBasis(size, current) {
    if (size === void 0) { size = 0; }
    if (current === void 0) { current = 0; }
    return size < 1024 ? size + " " + en_1.default[basis[current]] : this.getBasis(Math.round(size / 1024), current + 1);
}
exports.getBasis = getBasis;
var MAX_WORD_LENGTH = 13;
function truncateWord(word, len) {
    if (len === void 0) { len = MAX_WORD_LENGTH; }
    var start;
    var end;
    if (word.length <= len) {
        return word;
    }
    var dotIndex = word.lastIndexOf(".");
    if (dotIndex === -1) {
        end = word.substr(word.length - 4);
        start = word.substr(0, len - 7);
    }
    else {
        var endStartFrom = dotIndex - 3;
        end = word.substr(endStartFrom);
        start = word.substr(0, len - (word.length - endStartFrom));
    }
    return start + "..." + end;
}
exports.truncateWord = truncateWord;
function calculateCover(image) {
    var width = image.width, height = image.height;
    var imageAspectRatio = width / height;
    var sHeight;
    var sWidth;
    var sx;
    var sy;
    if (imageAspectRatio > 1) {
        // width > height
        sWidth = height;
        sHeight = height;
        sx = (width - sWidth) / 2;
        sy = 0;
    }
    else if (imageAspectRatio < 1) {
        // width < height
        sWidth = width;
        sHeight = width;
        sx = 0;
        sy = (height - sHeight) / 2;
    }
    else {
        // width == height
        sHeight = width;
        sWidth = width;
        sx = 0;
        sy = 0;
    }
    return {
        sx: sx,
        sy: sy,
        sWidth: sWidth,
        sHeight: sHeight,
        dx: 0,
        dy: 0
    };
}
exports.calculateCover = calculateCover;
var FileType;
(function (FileType) {
    FileType["image"] = "image";
    FileType["video"] = "video";
    FileType["archive"] = "archive";
    FileType["table"] = "table";
    FileType["document"] = "document";
    FileType["presentation"] = "presentation";
    FileType["application"] = "application";
    FileType["web"] = "web";
    FileType["apple"] = "apple";
    FileType["pdf"] = "pdf";
    FileType["psd"] = "psd";
    FileType["audio"] = "audio";
    FileType["other"] = "other";
    FileType["text"] = "text";
})(FileType = exports.FileType || (exports.FileType = {}));
function getMimeAndExtension(fileWrapper) {
    var extension = fileWrapper.name.split(".").pop() || "none";
    var mime = fileWrapper.file ? fileWrapper.file.type : "";
    return {
        extension: extension,
        mime: mime
    };
}
function getFileType(extension, mime) {
    switch (extension) {
        case "jpg":
        case "jpeg":
        case "gif":
        case "png":
        case "bmp":
        case "tiff":
        case "pcx":
        case "svg":
        case "ico":
            return FileType.image;
        case "avi":
        case "mpg":
        case "mpeg":
        case "rm":
        case "move":
        case "mov":
        case "mkv":
        case "flv":
        case "f4v":
        case "mp4":
        case "3gp":
        case "wmv":
        case "webm":
        case "vob":
            return FileType.video;
        case "rar":
        case "zip":
        case "tar":
        case "tgz":
        case "arj":
        case "gzip":
        case "bzip2":
        case "7z":
        case "ace":
        case "apk":
        case "deb":
        case "zipx":
        case "cab":
        case "tar-gz":
        case "rpm":
        case "xar":
            return FileType.archive;
        case "xlr":
        case "xls":
        case "xlsm":
        case "xlsx":
        case "ods":
        case "csv":
        case "tsv":
            return FileType.table;
        case "doc":
        case "docx":
        case "docm":
        case "dot":
        case "dotx":
        case "odt":
        case "wpd":
        case "wps":
        case "pages":
            return FileType.document;
        case "wav":
        case "aiff":
        case "au":
        case "mp3":
        case "aac":
        case "wma":
        case "ogg":
        case "flac":
        case "ape":
        case "wv":
        case "m4a":
        case "mid":
        case "midi":
            return FileType.audio;
        case "pot":
        case "potm":
        case "potx":
        case "pps":
        case "ppsm":
        case "ppsx":
        case "ppt":
        case "pptx":
        case "pptm":
        case "odp":
            return FileType.presentation;
        case "html":
        case "htm":
        case "eml":
            return FileType.web;
        case "exe":
            return FileType.application;
        case "dmg":
            return FileType.apple;
        case "pdf":
        case "ps":
        case "eps":
            return FileType.pdf;
        case "psd":
            return FileType.psd;
        case "txt":
        case "djvu":
        case "nfo":
        case "xml":
            return FileType.text;
        default:
            var type = mime.split("/")[0];
            switch (type) {
                case "image":
                    return FileType.image;
                case "audio":
                    return FileType.audio;
                case "video":
                    return FileType.video;
                default:
                    return FileType.other;
            }
    }
}
exports.getFileType = getFileType;
function getFileClassName(fileWrapper) {
    var _a = getMimeAndExtension(fileWrapper), mime = _a.mime, extension = _a.extension;
    return getFileType(extension, mime) + " extension-" + extension;
}
exports.getFileClassName = getFileClassName;
function isImage(fileWrapper) {
    var _a = getMimeAndExtension(fileWrapper), mime = _a.mime, extension = _a.extension;
    var fileType = getFileType(extension, mime);
    return fileType === FileType.image;
}
exports.isImage = isImage;


/***/ }),
/* 122 */
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
var dom_1 = __webpack_require__(0);
var view_1 = __webpack_require__(3);
var en_1 = __webpack_require__(30);
var types_1 = __webpack_require__(17);
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar(events, config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = events;
        _this._progress = 0;
        var render = function () { return _this._draw(); };
        _this.mount(null, dom_1.create({
            render: render
        }));
        _this._abortUpload = function () {
            _this.events.fire(types_1.ProgressBarEvents.cancel);
        };
        return _this;
    }
    ProgressBar.prototype.setState = function (progress, extra) {
        this._progress = progress;
        if (this.config.template) {
            this._progressText = this.config.template(progress, extra);
        }
        else {
            this._progressText = this._progress.toFixed(1) + "%";
        }
        this.paint();
    };
    ProgressBar.prototype._draw = function () {
        return dom_1.el(".progress-bar", {
            _key: this._uid
        }, [
            dom_1.el(".progress-indicator", {
                style: {
                    width: this._progress + "%"
                }
            }),
            dom_1.el(".progress-text", {
                ".innerHTML": this._progressText
            }),
            dom_1.el("button", {
                class: "dhx_btn dhx_btn--flat dhx_btn_small action-abort-all",
                onclick: this._abortUpload
            }, en_1.default.cancel)
        ]);
    };
    return ProgressBar;
}(view_1.View));
exports.ProgressBar = ProgressBar;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ReadStackPreview = /** @class */ (function () {
    function ReadStackPreview(data) {
        this._readerStack = [];
        this._isActive = false;
        this._data = data;
    }
    ReadStackPreview.prototype.add = function (fileWrapper, wait) {
        if (wait === void 0) { wait = false; }
        this._readerStack.push(fileWrapper);
        if (!wait) {
            this.read();
        }
    };
    ReadStackPreview.prototype.read = function () {
        var _this = this;
        if (!this._readerStack.length || this._isActive) {
            return;
        }
        var fileWrapper = this._readerStack.shift();
        this._isActive = true;
        var reader = new FileReader();
        reader.readAsDataURL(fileWrapper.file);
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                if (_this._data.exists(fileWrapper.id)) {
                    _this._data.update(fileWrapper.id, { image: image });
                }
                _this._isActive = false;
                _this.read();
            };
        };
        reader.onerror = function () {
            _this._isActive = false;
            _this.read();
        };
    };
    ReadStackPreview.prototype.stop = function () {
        this._readerStack = [];
    };
    return ReadStackPreview;
}());
exports.ReadStackPreview = ReadStackPreview;


/***/ }),
/* 124 */
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
var ts_timepicker_1 = __webpack_require__(23);
var dom_1 = __webpack_require__(0);
var label_1 = __webpack_require__(9);
var ts_popup_1 = __webpack_require__(8);
var events_1 = __webpack_require__(2);
var types_1 = __webpack_require__(6);
var helper_1 = __webpack_require__(5);
var TimeInputEvents;
(function (TimeInputEvents) {
    TimeInputEvents["change"] = "change";
})(TimeInputEvents = exports.TimeInputEvents || (exports.TimeInputEvents = {}));
var TimeInput = /** @class */ (function (_super) {
    __extends(TimeInput, _super);
    function TimeInput(container, config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = new events_1.EventSystem();
        _this._popup = new ts_popup_1.Popup({ css: "dhx_widget--border-shadow" });
        _this.timepicker = new ts_timepicker_1.Timepicker(null, config);
        _this._popup.attach(_this.timepicker);
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        _this.timepicker.events.on(ts_timepicker_1.TimepickerEvents.change, function () {
            _this.config.value = _this.timepicker.getValue();
            _this.validate();
        });
        _this.timepicker.events.on(ts_timepicker_1.TimepickerEvents.close, function () {
            _this._popup.hide();
        });
        _this.timepicker.events.on(ts_timepicker_1.TimepickerEvents.save, function () {
            _this._popup.hide();
        });
        _this.events.on(TimeInputEvents.change, function (value) {
            _this.config.value = _this._inputValidate(value);
            _this.validate();
        });
        return _this;
    }
    TimeInput.prototype.validate = function () {
        var isValid = !this.config.required || Boolean(this.config.value);
        this.config.$validationStatus = isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return isValid;
    };
    TimeInput.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    TimeInput.prototype.setValue = function (value) {
        this.timepicker.setValue(value);
        this.paint();
    };
    TimeInput.prototype.getValue = function () {
        return this.config.value || "";
    };
    TimeInput.prototype.clear = function () {
        var timeFormat = this.config.timeFormat;
        timeFormat === 12 ? this.timepicker.setValue("12:00AM") : this.timepicker.setValue("00:00");
        this.config.value = "";
    };
    TimeInput.prototype._getHandlers = function () {
        var _this = this;
        return {
            onfocus: function () {
                if (_this._popup.isVisible()) {
                    return;
                }
                var node = _this.getRootView().refs.input.el;
                _this._popup.show(node);
            },
            onchange: function (e) {
                var value = e.target.value;
                _this.events.fire(TimeInputEvents.change, [value]);
            },
            onkeyup: function (e) {
                if (e.keyCode === 13) {
                    if (_this._popup.isVisible()) {
                        _this._popup.hide();
                    }
                    var node = _this.getRootView().refs.input.el;
                    node.blur();
                }
            }
        };
    };
    TimeInput.prototype._inputValidate = function (value) {
        var timeFormat = this.config.timeFormat;
        if (helper_1.isTimeFormat(value, timeFormat)) {
            this.timepicker.setValue(value);
            return value;
        }
        return "";
    };
    TimeInput.prototype._draw = function () {
        var _a = this.config, value = _a.value, required = _a.required, disabled = _a.disabled, placeholder = _a.placeholder, name = _a.name, id = _a.id, validation = _a.validation, _b = _a.editing, editing = _b === void 0 ? false : _b;
        return dom_1.el("div.dhx_form-group", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(validation)),
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", [
                dom_1.el("div.dhx_input-container", {}, [
                    dom_1.el(".dhx_input__icon.dxi.dxi-clock-outline"),
                    dom_1.el("input.dhx_input.dhx_input--icon-padding", {
                        _key: this._uid,
                        value: value,
                        type: "text",
                        _ref: "input",
                        required: required,
                        disabled: disabled,
                        placeholder: placeholder || "",
                        name: name || "",
                        id: id || this._uid,
                        onfocus: this._handlers.onfocus,
                        onchange: this._handlers.onchange,
                        onkeyup: this._handlers.onkeyup,
                        autocomplete: "off",
                        readOnly: !editing
                    }),
                ]),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", {}, helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return TimeInput;
}(label_1.Label));
exports.TimeInput = TimeInput;


/***/ }),
/* 125 */
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
var ts_colorpicker_1 = __webpack_require__(45);
var events_1 = __webpack_require__(2);
var dom_1 = __webpack_require__(0);
var label_1 = __webpack_require__(9);
var ts_popup_1 = __webpack_require__(8);
var types_1 = __webpack_require__(6);
var helper_1 = __webpack_require__(5);
var ColorpickerInputEvents;
(function (ColorpickerInputEvents) {
    ColorpickerInputEvents["change"] = "change";
})(ColorpickerInputEvents = exports.ColorpickerInputEvents || (exports.ColorpickerInputEvents = {}));
var ColorpickerInput = /** @class */ (function (_super) {
    __extends(ColorpickerInput, _super);
    function ColorpickerInput(container, config) {
        var _this = _super.call(this, null, config) || this;
        _this.events = new events_1.EventSystem();
        _this._popup = new ts_popup_1.Popup({ css: "dhx_widget--border-shadow" });
        _this.colorpicker = new ts_colorpicker_1.Colorpicker(null, config);
        _this._popup.attach(_this.colorpicker);
        var render = function () { return _this._draw(); };
        _this.mount(container, dom_1.create({ render: render }));
        _this.colorpicker.events.on(ts_colorpicker_1.ColorpickerEvents.colorChange, function () {
            _this.config.value = _this.colorpicker.getValue();
            _this._popup.hide();
            _this.validate();
        });
        _this.events.on(ColorpickerInputEvents.change, function (value) {
            var validValue = _this._inputValidate(value);
            _this.setValue(validValue);
            _this.validate();
        });
        return _this;
    }
    ColorpickerInput.prototype.validate = function () {
        var isValid = !this.config.required || Boolean(this.config.value);
        this.config.$validationStatus = isValid
            ? types_1.ValidationStatus.success
            : types_1.ValidationStatus.error;
        this.paint();
        return isValid;
    };
    ColorpickerInput.prototype.clearValidate = function () {
        this.config.$validationStatus = types_1.ValidationStatus.pre;
        this.paint();
    };
    ColorpickerInput.prototype.setValue = function (value) {
        this.config.value = value;
        this.colorpicker.setValue(value);
        this.paint();
    };
    ColorpickerInput.prototype.getValue = function () {
        return this.config.value || "";
    };
    ColorpickerInput.prototype.clear = function () {
        this.config.value = "";
        this.paint();
    };
    ColorpickerInput.prototype._getHandlers = function () {
        var _this = this;
        return {
            onfocus: function () {
                if (_this._popup.isVisible()) {
                    return;
                }
                var node = _this.getRootView().refs.input.el;
                _this._popup.show(node);
            },
            onchange: function (e) {
                var value = e.target.value;
                _this.events.fire(ColorpickerInputEvents.change, [value]);
            },
            onkeyup: function (e) {
                if (e.keyCode === 13) {
                    if (_this._popup.isVisible()) {
                        _this._popup.hide();
                    }
                    var node = _this.getRootView().refs.input.el;
                    node.blur();
                }
            }
        };
    };
    ColorpickerInput.prototype._inputValidate = function (value) {
        return ts_colorpicker_1.isHex(value) ? value : "";
    };
    ColorpickerInput.prototype._draw = function () {
        var _a = this.config, required = _a.required, value = _a.value, icon = _a.icon, disabled = _a.disabled, placeholder = _a.placeholder, name = _a.name, id = _a.id, _b = _a.editing, editing = _b === void 0 ? false : _b;
        return dom_1.el("div.dhx_form-group", {
            class: helper_1.getFormItemCss(this.config, Boolean(required) || Boolean(this.config.validation)),
        }, [
            this._drawLabel(),
            dom_1.el(".dhx_input-wrapper", [
                dom_1.el("div.dhx_input-container", {}, [
                    dom_1.el(".dhx_input__icon", {
                        class: icon || "dxi dxi-eyedropper-variant" +
                            (value ? " dhx_input__icon--color-selected" : ""),
                        style: { "background-color": value || "transparent" }
                    }),
                    dom_1.el("input.dhx_input.dhx_input--icon-padding", {
                        _key: this._uid,
                        value: value,
                        type: "text",
                        _ref: "input",
                        required: required,
                        disabled: disabled,
                        placeholder: placeholder || "",
                        name: name || "",
                        id: id || this._uid,
                        onfocus: this._handlers.onfocus,
                        onchange: this._handlers.onchange,
                        onkeyup: this._handlers.onkeyup,
                        autocomplete: "off",
                        readOnly: !editing
                    }),
                ]),
                helper_1.getValidationMessage(this.config) && dom_1.el("span.dhx_input-caption", {}, helper_1.getValidationMessage(this.config))
            ]),
        ]);
    };
    return ColorpickerInput;
}(label_1.Label));
exports.ColorpickerInput = ColorpickerInput;


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })
/******/ ]);
});if (window.dhx_legacy) { if (window.dhx){ for (var key in dhx) dhx_legacy[key] = dhx[key]; } window.dhx = dhx_legacy; delete window.dhx_legacy; }