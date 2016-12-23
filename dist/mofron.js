/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	__webpack_require__(1);

	/* util */
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);

	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);

	exports.mofron = mofron;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["mofron"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	(function (global, factory) {
	    "use strict";

	    if ( //(typeof module         === "object") && 
	    _typeof(module.exports) === "object") {
	        module.exports = global.document ? factory(global, true) : function (w) {
	            if (!w.document) {
	                throw new Error("mofron requires a window with a document");
	            }
	            return factory(w);
	        };
	    } else {
	        factory(global);
	    }

	    // Pass this if window is not defined yet
	})(typeof window !== "undefined" ? window : undefined, function (window, noGlobal) {
	    "use strict";

	    return {
	        comp: {},
	        layout: {},
	        event: {},
	        effect: {},
	        tmpl: {},
	        util: {},
	        root: new Array()
	    };
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/**
	 * @file func.js
	 */

	mofron.util.getId = function (pf) {
	    try {
	        var _pf = pf === undefined ? "aid" : pf;
	        return _pf + '-' + new Date().getTime();
	    } catch (e) {
	        console.error(e.stack);
	        throw new Error();
	    }
	};

	mofron.util.camelMap = {
	    "align-items": "alignItems",
	    "align-self": "alignSelf",
	    "alignment-baseline": "alignmentBaseline",
	    "all": "all",
	    "animation": "animation",
	    "animation-delay": "animationDelay",
	    "animation-direction": "animationDirection",
	    "animation-duration": "animationDuration",
	    "animation-fillMode": "animationFillMode",
	    "animation-iteration-count": "animationIterationCount",
	    "animation-name": "animationName",
	    "animation-play-state": "animationPlayState",
	    "animation-timing-function": "animationTimingFunction",
	    "backface-visibility": "backfaceVisibility",
	    "background": "background",
	    "background-attachment": "backgroundAttachment",
	    "background-blend-mode": "backgroundBlendMode",
	    "background-clip": "backgroundClip",
	    "background-color": "backgroundColor",
	    "background-image": "backgroundImage",
	    "background-origin": "backgroundOrigin",
	    "background-position": "backgroundPosition",
	    "background-position-x": "backgroundPositionX",
	    "background-position-y": "backgroundPositionY",
	    "background-repeat": "backgroundRepeat",
	    "background-repeat-x": "backgroundRepeatX",
	    "background-repeat-y": "backgroundRepeatY",
	    "background-size": "backgroundSize",
	    "baseline-shift": "baselineShift",
	    "border": "border",
	    "border-bottom": "borderBottom",
	    "border-bottom-color": "borderBottomColor",
	    "border-bottom-left-radius": "borderBottomLeftRadius",
	    "border-bottom-right-radius": "borderBottomRightRadius",
	    "border-bottom-style": "borderBottomStyle",
	    "border-bottom-width": "borderBottomWidth",
	    "border-collapse": "borderCollapse",
	    "border-color": "borderColor",
	    "border-image": "borderImage",
	    "border-image-outset": "borderImageOutset",
	    "border-image-repeat": "borderImageRepeat",
	    "border-image-slice": "borderImageSlice",
	    "border-image-source": "borderImageSource",
	    "border-image-width": "borderImageWidth",
	    "border-left": "borderLeft",
	    "border-left-color": "borderLeftColor",
	    "border-left-style": "borderLeftStyle",
	    "border-left-width": "borderLeftWidth",
	    "border-radius": "borderRadius",
	    "border-right": "borderRight",
	    "border-right-color": "borderRightColor",
	    "border-right-style": "borderRightStyle",
	    "border-right-width": "borderRightWidth",
	    "border-spacing": "borderSpacing",
	    "border-style": "borderStyle",
	    "border-top": "borderTop",
	    "border-top-color": "borderTopColor",
	    "border-top-leftRadius": "borderTopLeftRadius",
	    "border-top-rightRadius": "borderTopRightRadius",
	    "border-top-style": "borderTopStyle",
	    "border-top-width": "borderTopWidth",
	    "border-width": "borderWidth",
	    "bottom": "bottom",
	    "box-shadow": "boxShadow",
	    "box-sizing": "boxSizing",
	    "break-after": "breakAfter",
	    "break-before": "breakBefore",
	    "break-inside": "breakInside",
	    "buffered-rendering": "bufferedRendering",
	    "caption-side": "captionSide",
	    "clear": "clear",
	    "clip": "clip",
	    "clip-path": "clipPath",
	    "clip-rule": "clipRule",
	    "color": "color",
	    "color-interpolation": "colorInterpolation",
	    "color-interpolation-filters": "colorInterpolationFilters",
	    "color-rendering": "colorRendering",
	    "column-count": "columnCount",
	    "column-fill": "columnFill",
	    "column-gap": "columnGap",
	    "column-rule": "columnRule",
	    "column-rule-color": "columnRuleColor",
	    "column-rule-style": "columnRuleStyle",
	    "column-rule-width": "columnRuleWidth",
	    "column-span": "columnSpan",
	    "column-width": "columnWidth",
	    "columns": "columns",
	    "content": "content",
	    "counter-increment": "counterIncrement",
	    "counter-reset": "counterReset",
	    "cursor": "cursor",
	    "cx": "cx",
	    "cy": "cy",
	    "direction": "direction",
	    "display": "display",
	    "dominant-baseline": "dominantBaseline",
	    "empty-cells": "emptyCells",
	    "fill": "fill",
	    "fill-opacity": "fillOpacity",
	    "fill-rule": "fillRule",
	    "filter": "filter",
	    "flex": "flex",
	    "flex-basis": "flexBasis",
	    "flex-direction": "flexDirection",
	    "flex-flow": "flexFlow",
	    "flex-grow": "flexGrow",
	    "flex-shrink": "flexShrink",
	    "flex-wrap": "flexWrap",
	    "float": "float",
	    "flood-color": "floodColor",
	    "flood-opacity": "floodOpacity",
	    "font": "font",
	    "font-family": "fontFamily",
	    "font-featureSettings": "fontFeatureSettings",
	    "font-kerning": "fontKerning",
	    "font-size": "fontSize",
	    "font-stretch": "fontStretch",
	    "font-style": "fontStyle",
	    "font-variant": "fontVariant",
	    "font-variant-ligatures": "fontVariantLigatures",
	    "font-weight": "fontWeight",
	    "height": "height",
	    "image-rendering": "imageRendering",
	    "isolation": "isolation",
	    "justify-content": "justifyContent",
	    "left": "left",
	    "letter-spacing": "letterSpacing",
	    "lighting-color": "lightingColor",
	    "line-height": "lineHeight",
	    "list-style": "listStyle",
	    "list-style-image": "listStyleImage",
	    "list-style-position": "listStylePosition",
	    "list-style-type": "listStyleType",
	    "margin": "margin",
	    "margin-bottom": "marginBottom",
	    "margin-left": "marginLeft",
	    "margin-right": "marginRight",
	    "margin-top": "marginTop",
	    "marker": "marker",
	    "marker-end": "markerEnd",
	    "marker-mid": "markerMid",
	    "marker-start": "markerStart",
	    "mask": "mask",
	    "mask-type": "maskType",
	    "max-height": "maxHeight",
	    "max-width": "maxWidth",
	    "max-zoom": "maxZoom",
	    "min-height": "minHeight",
	    "min-width": "minWidth",
	    "min-zoom": "minZoom",
	    "mix-blend-mode": "mixBlendMode",
	    "motion": "motion",
	    "motion-offset": "motionOffset",
	    "motion-path": "motionPath",
	    "motion-rotation": "motionRotation",
	    "object-fit": "objectFit",
	    "object-position": "objectPosition",
	    "opacity": "opacity",
	    "order": "order",
	    "orientation": "orientation",
	    "orphans": "orphans",
	    "outline": "outline",
	    "outline-color": "outlineColor",
	    "outline-offset": "outlineOffset",
	    "outline-style": "outlineStyle",
	    "outline-width": "outlineWidth",
	    "overflow": "overflow",
	    "overflow-wrap": "overflowWrap",
	    "overflow-x": "overflowX",
	    "overflow-y": "overflowY",
	    "padding": "padding",
	    "padding-bottom": "paddingBottom",
	    "padding-left": "paddingLeft",
	    "padding-right": "paddingRight",
	    "padding-top": "paddingTop",
	    "page": "page",
	    "page-break-after": "pageBreakAfter",
	    "page-break-before": "pageBreakBefore",
	    "page-break-inside": "pageBreakInside",
	    "paint-order": "paintOrder",
	    "perspective": "perspective",
	    "perspective-origin": "perspectiveOrigin",
	    "pointer-events": "pointerEvents",
	    "position": "position",
	    "quotes": "quotes",
	    "r": "r",
	    "resize": "resize",
	    "right": "right",
	    "rx": "rx",
	    "ry": "ry",
	    "shape-image-threshold": "shapeImageThreshold",
	    "shape-margin": "shapeMargin",
	    "shape-outside": "shapeOutside",
	    "shape-rendering": "shapeRendering",
	    "size": "size",
	    "speak": "speak",
	    "src": "src",
	    "stop-color": "stopColor",
	    "stop-opacity": "stopOpacity",
	    "stroke": "stroke",
	    "stroke-dasharray": "strokeDasharray",
	    "stroke-dashoffset": "strokeDashoffset",
	    "stroke-linecap": "strokeLinecap",
	    "stroke-linejoin": "strokeLinejoin",
	    "stroke-miterlimit": "strokeMiterlimit",
	    "stroke-opacity": "strokeOpacity",
	    "stroke-width": "strokeWidth",
	    "tab-size": "tabSize",
	    "table-layout": "tableLayout",
	    "text-align": "textAlign",
	    "text-alignLast": "textAlignLast",
	    "text-anchor": "textAnchor",
	    "text-combineUpright": "textCombineUpright",
	    "text-decoration": "textDecoration",
	    "text-indent": "textIndent",
	    "text-orientation": "textOrientation",
	    "text-overflow": "textOverflow",
	    "text-rendering": "textRendering",
	    "text-shadow": "textShadow",
	    "text-transform": "textTransform",
	    "top": "top",
	    "touch-action": "touchAction",
	    "transform": "transform",
	    "transform-origin": "transformOrigin",
	    "transform-style": "transformStyle",
	    "transition": "transition",
	    "transition-delay": "transitionDelay",
	    "transition-duration": "transitionDuration",
	    "transition-property": "transitionProperty",
	    "transition-timing-function": "transitionTimingFunction",
	    "unicode-bidi": "unicodeBidi",
	    "unicode-range": "unicodeRange",
	    "user-zoom": "userZoom",
	    "vector-effect": "vectorEffect",
	    "vertical-align": "verticalAlign",
	    "visibility": "visibility",
	    "webkit-app-region": "webkitAppRegion",
	    "webkit-appearance": "webkitAppearance",
	    "webkit-background-clip": "webkitBackgroundClip",
	    "webkit-background-origin": "webkitBackgroundOrigin",
	    "webkit-border-after": "webkitBorderAfter",
	    "webkit-border-after-color": "webkitBorderAfterColor",
	    "webkit-border-after-style": "webkitBorderAfterStyle",
	    "webkit-border-after-width": "webkitBorderAfterWidth",
	    "webkit-border-before": "webkitBorderBefore",
	    "webkit-border-before-color": "webkitBorderBeforeColor",
	    "webkit-border-before-style": "webkitBorderBeforeStyle",
	    "webkit-border-before-width": "webkitBorderBeforeWidth",
	    "webkit-border-end": "webkitBorderEnd",
	    "webkit-border-end-color": "webkitBorderEndColor",
	    "webkit-border-end-style": "webkitBorderEndStyle",
	    "webkit-border-end-width": "webkitBorderEndWidth",
	    "webkit-border-horizontal-spacing": "webkitBorderHorizontalSpacing",
	    "webkit-border-image": "webkitBorderImage",
	    "webkit-border-start": "webkitBorderStart",
	    "webkit-border-start-color": "webkitBorderStartColor",
	    "webkit-border-start-style": "webkitBorderStartStyle",
	    "webkit-border-start-width": "webkitBorderStartWidth",
	    "webkit-border-vertical-spacing": "webkitBorderVerticalSpacing",
	    "webkit-box-align": "webkitBoxAlign",
	    "webkit-box-decoration-break": "webkitBoxDecorationBreak",
	    "webkit-box-direction": "webkitBoxDirection",
	    "webkit-box-flex": "webkitBoxFlex",
	    "webkit-box-flex-group": "webkitBoxFlexGroup",
	    "webkit-box-lines": "webkitBoxLines",
	    "webkit-box-ordinal-group": "webkitBoxOrdinalGroup",
	    "webkit-box-orient": "webkitBoxOrient",
	    "webkit-box-pack": "webkitBoxPack",
	    "webkit-box-reflect": "webkitBoxReflect",
	    "webkit-clip-path": "webkitClipPath",
	    "webkit-column-break-after": "webkitColumnBreakAfter",
	    "webkit-column-break-before": "webkitColumnBreakBefore",
	    "webkit-column-break-inside": "webkitColumnBreakInside",
	    "webkit-filter": "webkitFilter",
	    "webkit-font-size-delta": "webkitFontSizeDelta",
	    "webkit-font-smoothing": "webkitFontSmoothing",
	    "webkit-highlight": "webkitHighlight",
	    "webkit-hyphenate-character": "webkitHyphenateCharacter",
	    "webkit-line-break": "webkitLineBreak",
	    "webkit-line-clamp": "webkitLineClamp",
	    "webkit-locale": "webkitLocale",
	    "webkit-logical-height": "webkitLogicalHeight",
	    "webkit-logical-width": "webkitLogicalWidth",
	    "webkit-margin-after": "webkitMarginAfter",
	    "webkit-margin-after-collapse": "webkitMarginAfterCollapse",
	    "webkit-margin-before": "webkitMarginBefore",
	    "webkit-margin-before-collapse": "webkitMarginBeforeCollapse",
	    "webkit-margin-bottom-collapse": "webkitMarginBottomCollapse",
	    "webkit-margin-collapse": "webkitMarginCollapse",
	    "webkit-margin-end": "webkitMarginEnd",
	    "webkit-margin-start": "webkitMarginStart",
	    "webkit-margin-top-collapse": "webkitMarginTopCollapse",
	    "webkit-mask": "webkitMask",
	    "webkit-mask-box-image": "webkitMaskBoxImage",
	    "webkit-mask-box-image-outset": "webkitMaskBoxImageOutset",
	    "webkit-mask-box-image-repeat": "webkitMaskBoxImageRepeat",
	    "webkit-mask-box-image-slice": "webkitMaskBoxImageSlice",
	    "webkit-mask-box-image-source": "webkitMaskBoxImageSource",
	    "webkit-mask-box-image-width": "webkitMaskBoxImageWidth",
	    "webkit-mask-clip": "webkitMaskClip",
	    "webkit-mask-composite": "webkitMaskComposite",
	    "webkit-mask-image": "webkitMaskImage",
	    "webkit-mask-origin": "webkitMaskOrigin",
	    "webkit-mask-position": "webkitMaskPosition",
	    "webkit-mask-positionX": "webkitMaskPositionX",
	    "webkit-mask-positionY": "webkitMaskPositionY",
	    "webkit-mask-repeat": "webkitMaskRepeat",
	    "webkit-mask-repeatX": "webkitMaskRepeatX",
	    "webkit-mask-repeatY": "webkitMaskRepeatY",
	    "webkit-mask-size": "webkitMaskSize",
	    "webkit-max-logical-height": "webkitMaxLogicalHeight",
	    "webkit-max-logical-width": "webkitMaxLogicalWidth",
	    "webkit-min-logical-height": "webkitMinLogicalHeight",
	    "webkit-min-logical-width": "webkitMinLogicalWidth",
	    "webkit-padding-after": "webkitPaddingAfter",
	    "webkit-padding-before": "webkitPaddingBefore",
	    "webkit-padding-end": "webkitPaddingEnd",
	    "webkit-padding-start": "webkitPaddingStart",
	    "webkit-perspective-origin-x": "webkitPerspectiveOriginX",
	    "webkit-perspective-origin-y": "webkitPerspectiveOriginY",
	    "webkit-print-color-adjust": "webkitPrintColorAdjust",
	    "webkit-rtl-ordering": "webkitRtlOrdering",
	    "webkit-ruby-position": "webkitRubyPosition",
	    "webkit-tap-highlight-color": "webkitTapHighlightColor",
	    "webkit-text-combine": "webkitTextCombine",
	    "webkit-text-decorations-in-effect": "webkitTextDecorationsInEffect",
	    "webkit-text-emphasis": "webkitTextEmphasis",
	    "webkit-text-emphasis-color": "webkitTextEmphasisColor",
	    "webkit-text-emphasis-position": "webkitTextEmphasisPosition",
	    "webkit-text-emphasis-style": "webkitTextEmphasisStyle",
	    "webkit-text-fillColor": "webkitTextFillColor",
	    "webkit-text-orientation": "webkitTextOrientation",
	    "webkit-text-security": "webkitTextSecurity",
	    "webkit-text-stroke": "webkitTextStroke",
	    "webkit-text-stroke-color": "webkitTextStrokeColor",
	    "webkit-text-stroke-width": "webkitTextStrokeWidth",
	    "webkit-transition": "webkitTransition",
	    "webkit-transform-origin-x": "webkitTransformOriginX",
	    "webkit-transform-origin-y": "webkitTransformOriginY",
	    "webkit-transform-origin-z": "webkitTransformOriginZ",
	    "webkit-user-drag": "webkitUserDrag",
	    "webkit-user-modify": "webkitUserModify",
	    "webkit-user-select": "webkitUserSelect",
	    "webkit-writing-mode": "webkitWritingMode",
	    "white-space": "whiteSpace",
	    "widows": "widows",
	    "width": "width",
	    "will-change": "willChange",
	    "word-break": "wordBreak",
	    "word-spacing": "wordSpacing",
	    "word-wrap": "wordWrap",
	    "writing-mode": "writingMode",
	    "x": "x",
	    "y": "y",
	    "z-index": "zIndex",
	    "zoom": "zoom",
	    "css-text": "cssText",
	    "length": "length",
	    "parent-rule": "parentRule",
	    "css-float": "cssFloat",
	    "item": "item",
	    "get-property-value": "getPropertyValue",
	    "get-property-priority": "getPropertyPriority",
	    "set-property": "setProperty",
	    "remove-property": "removeProperty"
	};

	mofron.util.getStyleConts = function (sel, cnt) {
	    try {
	        var ret_val = sel + '{';
	        for (var idx in cnt) {
	            ret_val += idx + ':' + cnt[idx] + ';';
	        }
	        return ret_val + '}';
	    } catch (e) {
	        console.error(e.stack);
	        throw new Error();
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file util/Vdom.js
	 *
	 */

	mofron.util.Vdom = function () {
	    function _class(tag) {
	        _classCallCheck(this, _class);

	        try {
	            if ('string' != typeof tag) {
	                throw new Error('invalid parameter');
	            }
	            this.id = null;
	            this.tag = tag;
	            this.clname = new Array();
	            this.parent = null;
	            this.child = new Array();
	            this.style = new mofron.util.Style(this);
	            this.attr = {};
	            this.text = null;
	            this.push_flg = false;
	            this.value = null;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'chgTag',
	        value: function chgTag(tag) {
	            try {
	                if ('string' != typeof tag) {
	                    throw new Error('invalid parameter');
	                }
	                this.tag = tag;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getId',
	        value: function getId() {
	            try {
	                if (null === this.id) {
	                    this.id = mofron.util.getId();
	                }
	                return this.id;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(chd) {
	            try {
	                if ('object' != (typeof chd === 'undefined' ? 'undefined' : _typeof(chd))) {
	                    throw new Error('invalid parameter');
	                }
	                chd.setTarget(this);
	                this.child.push(chd);
	                this.value = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setStyle',
	        value: function setStyle(key, val) {
	            try {
	                this.style.set(key, val);
	                this.value = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle(key) {
	            try {
	                return this.style.get(key);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setAttr',
	        value: function setAttr(key, val) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _val = val === undefined ? null : val;
	                if (null === _key || null === _val || 'string' !== typeof _key) {
	                    throw new Error('invalid parameter : ' + _key);
	                }
	                this.attr[_key] = _val;
	                if (true === this.isPushed()) {
	                    document.querySelector('#' + this.getId()).setAttribute(_key, val);
	                }
	                this.value = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getAttr',
	        value: function getAttr(val) {
	            try {
	                var _val = val === undefined ? null : val;
	                if (null === _val) {
	                    return this.attr;
	                }
	                return this.attr[_val];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addClname',
	        value: function addClname(name) {
	            try {
	                if ('string' != typeof name) {
	                    throw new Error('invalid parameter');
	                }
	                this.clname.push(name);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setText',
	        value: function setText(txt) {
	            try {
	                if ('string' != typeof txt) {
	                    throw new Error('invalid parameter');
	                }
	                if (true === this.isPushed()) {
	                    this.getPushedDom().innerHTML = txt;
	                }
	                this.text = txt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getText',
	        value: function getText() {
	            try {
	                return this.text;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            try {
	                var ret_val = '';
	                if (null != this.value) {
	                    ret_val += this.value;
	                } else {
	                    //console.log(this.getId() + ' -> getValue()');
	                    ret_val += '<' + this.tag + ' ';

	                    /* set id attribute */
	                    ret_val += 'id="' + this.getId() + '" ';

	                    /* set class attribute:*/
	                    var clname_str = 'class="';
	                    for (var idx in this.clname) {
	                        clname_str += this.clname[idx] + ' ';
	                    }
	                    clname_str += '"';
	                    if ('class=""' != clname_str) {
	                        ret_val += clname_str;
	                    }

	                    /* set style attribute */
	                    var style_conts = this.style.get();
	                    var style = 'style="';
	                    for (var key in style_conts) {
	                        if (null === style_conts[key]) {
	                            continue;
	                        }
	                        style += key + ':' + style_conts[key] + ';';
	                    }
	                    style += '"';
	                    if ('style=""' != style) {
	                        ret_val += style;
	                    }

	                    var attr_conts = '';
	                    for (var key in this.attr) {
	                        attr_conts += key;
	                        if (null != this.attr[key]) {
	                            attr_conts += '=' + this.attr[key] + ' ';
	                        }
	                    }
	                    ret_val += attr_conts + '>';

	                    this.value = ret_val;
	                }

	                /* get child value */
	                if (0 != this.child.length) {
	                    for (var chd_idx in this.child) {
	                        ret_val += this.child[chd_idx].getValue();
	                    }
	                }

	                if (null != this.text) {
	                    ret_val += this.text;
	                }

	                if (false === this.isSimpleTag()) {
	                    ret_val += '</' + this.tag + '>';
	                }

	                return ret_val;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'pushDom',
	        value: function pushDom(tgt) {
	            try {
	                if (true === this.isPushed()) {
	                    throw new Error('already pushed');
	                }

	                this.setTarget(tgt);

	                var tgt_dom = null;
	                if (null === this.parent) {
	                    tgt_dom = document.body;
	                } else {
	                    tgt_dom = document.querySelector('#' + this.parent.getId());
	                }
	                tgt_dom.insertAdjacentHTML('beforeend', this.getValue());

	                this.setPushed();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'isPushed',
	        value: function isPushed() {
	            try {
	                return this.push_flg;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setPushed',
	        value: function setPushed() {
	            try {
	                if (0 != this.child.length) {
	                    for (var chd_idx in this.child) {
	                        this.child[chd_idx].setPushed();
	                    }
	                }
	                this.push_flg = true;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'isSimpleTag',
	        value: function isSimpleTag() {
	            try {
	                if ('br' == this.tag || 'hr' == this.tag || 'input' == this.tag || 'img' == this.tag) {
	                    return true;
	                }
	                return false;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setTarget',
	        value: function setTarget(tgt) {
	            try {
	                if ('object' != (typeof tgt === 'undefined' ? 'undefined' : _typeof(tgt))) {
	                    throw new Error('invalid parameter');
	                }
	                this.parent = tgt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getChild',
	        value: function getChild(idx) {
	            try {
	                var _idx = idx === undefined ? null : idx;
	                if (null === _idx) {
	                    return this.child;
	                }
	                if (0 > _idx || this.child.length - 1 < _idx) {
	                    throw new Error('invalid parameter');
	                }
	                return this.child[_idx];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getPushedDom',
	        value: function getPushedDom() {
	            try {
	                if (false === this.isPushed()) {
	                    throw new Error('invalid parameter');
	                }
	                return document.querySelector('#' + this.getId());
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file Style.js
	 */

	mofron.util.Style = function () {
	    function _class(tgt) {
	        _classCallCheck(this, _class);

	        try {
	            if ('object' != (typeof tgt === 'undefined' ? 'undefined' : _typeof(tgt))) {
	                throw new Error('invalid parameter');
	            }
	            this.target = tgt;
	            this.conts = {};
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'set',
	        value: function set(key, val) {
	            try {
	                var _val = val === undefined ? null : val;

	                if ('string' != typeof key || null != _val && 'string' != typeof _val) {
	                    throw new Error('invalid parameter');
	                }
	                if (true === this.target.isPushed()) {
	                    var dom = document.querySelector('#' + this.target.getId());
	                    dom.style[key] = _val;
	                }
	                this.conts[key] = _val;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'get',
	        value: function get(key) {
	            try {
	                var _key = key === undefined ? null : key;
	                if (null === _key) {
	                    return this.conts;
	                }
	                return this.conts[_key] === undefined ? null : this.conts[_key];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file  Color.js
	 * @brief color abstructor
	 */

	mofron.util.Color = function () {
	    function _class(r, g, b, a) {
	        _classCallCheck(this, _class);

	        try {
	            this.red = r === undefined ? null : r;
	            this.green = g === undefined ? null : g;
	            this.blue = b === undefined ? null : b;
	            this.alpha = a === undefined ? 1 : a;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'getRgba',
	        value: function getRgba() {
	            try {
	                if (null === this.red || null === this.green || null === this.blue) {
	                    return 'none';
	                }
	                return new Array(this.red, this.green, this.blue, this.alpha);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle() {
	            try {
	                if (null === this.red && null === this.green && null === this.blue) {
	                    return 'none';
	                }
	                return 'rgba(' + this.red + ',' + this.green + ',' + this.blue + ',' + this.alpha + ')';
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file  Font.js
	 */

	mofron.util.Font = function () {
	    function _class(fnt) {
	        _classCallCheck(this, _class);

	        try {
	            if ('string' !== typeof fnt) {
	                throw new Error('invalid parameter');
	            }
	            this.family = {};
	            this.font = fnt;
	            this.addFamily(fnt);
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'setFace',
	        value: function setFace(url) {
	            try {
	                var hc = new mofron.util.HeadConts('style');
	                var fm = null;
	                for (var idx in this.family) {
	                    fm = idx;
	                    break;
	                }
	                if ('string' !== typeof url) {
	                    throw new Error('invalid parameter');
	                }

	                /* format */
	                var url_spt = url.split('.');
	                var format = '';
	                if ('woff' === url_spt[url_spt.length - 1]) {
	                    format = "format('woff')";
	                } else if ('ttf' === url_spt[url_spt.length - 1]) {
	                    format = "format('truetype')";
	                } else if ('otf' === url_spt[url_spt.length - 1]) {
	                    format = "format('opentype')";
	                } else if ('eot' === url_spt[url_spt.length - 1]) {
	                    format = "format('embedded-opentype')";
	                } else if ('svg' === url_spt[url_spt.length - 1] || 'svgz' === url_spt[url_spt.length - 1]) {
	                    format = "format('svg')";
	                }

	                var style = {
	                    'font-family': fm,
	                    'src': "url('" + url + "') " + format
	                };
	                hc.addConts(mofron.util.getStyleConts('@font-face', style));
	                hc.pushTag();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setImport',
	        value: function setImport(url) {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addFamily',
	        value: function addFamily(fm) {
	            try {
	                if ('string' !== typeof fm && 'object' !== (typeof fm === 'undefined' ? 'undefined' : _typeof(fm))) {
	                    throw new Error('invalid parameter');
	                }

	                if ('string' === typeof fm) {
	                    this.family['"' + fm + '"'] = null;
	                } else if ('object' === (typeof fm === 'undefined' ? 'undefined' : _typeof(fm))) {
	                    for (var idx in fm) {
	                        if ('string' !== fm[idx]) {
	                            throw new Error('invalid parameter');
	                        }
	                        this.family['"' + fm[idx] + '"'] = null;
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getFamily',
	        value: function getFamily() {
	            try {
	                return this.family;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getFontFamily',
	        value: function getFontFamily() {
	            try {
	                var fm_str = '';
	                for (var idx in this.family) {
	                    if ('' !== fm_str) {
	                        fm_str += ',';
	                    }
	                    fm_str += idx;
	                }
	                return fm_str;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file HeadConts.js
	 *
	 */

	mofron.util.HeadConts = function () {
	    function _class(tag) {
	        _classCallCheck(this, _class);

	        try {
	            if ('string' != typeof tag) {
	                throw new Error('invalid parameter');
	            }
	            this.tag = tag;
	            this.attr = {};
	            this.conts = '';
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'setAttr',
	        value: function setAttr(key, val) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _val = val === undefined ? null : val;
	                this.attr[_key] = _val;
	                this.value = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getAttr',
	        value: function getAttr(val) {
	            try {
	                var _val = val === undefined ? null : val;
	                if (null === _val) {
	                    return this.attr;
	                }
	                return this.attr[_val];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addConts',
	        value: function addConts(txt) {
	            try {
	                if ('string' !== typeof txt) {
	                    throw new Error('invalid parameter');
	                }
	                this.conts += txt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'pushTag',
	        value: function pushTag() {
	            try {
	                var set_conts = '';
	                var attr_conts = '';
	                for (var key in this.attr) {
	                    attr_conts += key;
	                    if (null != this.attr[key]) {
	                        attr_conts += '="' + this.attr[key] + '" ';
	                    }
	                }

	                if (false === this.isSimpleTag(this.tag)) {
	                    set_conts += '<' + this.tag + ' ' + attr_conts + '>' + this.conts + '</' + this.tag + '>';
	                } else {
	                    set_conts += '<' + this.tag + ' ' + attr_conts + '>' + this.conts;
	                }

	                document.head.insertAdjacentHTML('beforeend', set_conts);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'isSimpleTag',
	        value: function isSimpleTag(tag) {
	            try {
	                if ('link' === tag || 'meta' === tag || 'base' === tag) {
	                    return true;
	                }
	                return false;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file   parts/Base.js
	 * @brief  Base of UI Parts Class
	 * @author simpart
	 */

	mofron.parts.Base = function () {
	    function _class(prm) {
	        _classCallCheck(this, _class);

	        try {
	            var _prm = prm === undefined ? null : prm;
	            this.parent = null;
	            this.child = new Array();
	            this.event = new Array();
	            this.layout = new Array();
	            this.vdom = new mofron.util.Vdom('div');
	            this.target = this.vdom;
	            this.state = null;
	            this.initContents(this.vdom, _prm);
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /*** method ***/

	    _createClass(_class, [{
	        key: 'isInited',
	        value: function isInited() {
	            try {
	                if ('inited' === this.state) {
	                    return true;
	                }
	                return false;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initContents',
	        value: function initContents(vd, prm) {}
	    }, {
	        key: 'getTarget',
	        value: function getTarget() {
	            try {
	                return this.target;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getEventTgt',
	        value: function getEventTgt() {
	            try {
	                return this.getTarget();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(chd, disp, tgt) {
	            try {
	                var _disp = disp === undefined ? true : disp;
	                var _tgt = tgt === undefined ? null : tgt;
	                chd.parent = this;
	                this.child.push(chd);
	                if ('inited' === this.state) {
	                    chd.init(_disp);
	                    for (var idx in this.layout) {
	                        this.layout[idx].layout();
	                    }
	                }

	                /* set initial display of child */
	                var chd_vdom = chd.getVdom();
	                if (false === _disp) {
	                    chd_vdom.setStyle('display', 'none');
	                }

	                /* set to target vdom */
	                if (null === _tgt) {
	                    this.getTarget().addChild(chd_vdom);
	                } else {
	                    _tgt.addChild(chd_vdom);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getChild',
	        value: function getChild(idx) {
	            try {
	                var _idx = idx === undefined ? null : idx;
	                if (null === _idx) {
	                    return this.child;
	                }
	                if (0 > _idx || this.child.length - 1 < _idx) {
	                    throw new Error('invalid parameter');
	                }
	                return this.child[_idx];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getStyleTgt',
	        value: function getStyleTgt() {
	            try {
	                return this.getTarget();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'style',
	        value: function style(key, val) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _val = val === undefined ? null : val;

	                if (null === _key && null === _val) {
	                    return this.vdom.getStyle();
	                }
	                var style_tgt = this.getStyleTgt();
	                style_tgt.setStyle(key, val);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle(key) {
	            try {
	                var _key = key === undefined ? null : key;
	                if (null === _key) {
	                    return this.getStyleTgt().getStyle();
	                }
	                if ('string' !== typeof _key) {
	                    throw new Error('invalid parameter');
	                }
	                return this.getStyleTgt().getStyle(_key);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addEvent',
	        value: function addEvent(evt) {
	            try {
	                if (undefined === evt || null === evt || 'object' != (typeof evt === 'undefined' ? 'undefined' : _typeof(evt))) {
	                    throw new Error('invalid parameter');
	                }
	                this.event.push(evt);
	                evt.setTarget(this);
	                if ('inited' === this.state) {
	                    evt.event();
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addLayout',
	        value: function addLayout(lo) {
	            try {
	                if (undefined === lo || null === lo || 'object' != (typeof lo === 'undefined' ? 'undefined' : _typeof(lo))) {
	                    throw new Error('invalid parameter');
	                }
	                this.layout.push(lo);
	                lo.setTarget(this);

	                if ('inited' === this.state) {
	                    lo.layout();
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getLayout',
	        value: function getLayout(idx) {
	            try {
	                var _idx = idx === undefined ? null : idx;
	                if (null === _idx) {
	                    return this.layout;
	                }

	                if ('number' !== typeof _idx || 0 > _idx || this.layout.length <= _idx) {
	                    return null;
	                }
	                return this.layout[_idx];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * create parts to DOM
	         * 
	         * @param disp (bool) : initial visible flag. default is true
	         */

	    }, {
	        key: 'init',
	        value: function init(disp) {
	            try {

	                if ('inited' === this.state) {
	                    throw new Error('detect duplicate init');
	                }
	                this.state = 'init';
	                var _disp = disp === undefined ? true : disp;

	                /* set initialize target */
	                if (null === this.parent || null === this.parent.state) {
	                    var init_tgt = null;
	                    if (null === this.parent) {
	                        mofron.root.push(this);
	                    } else {
	                        init_tgt = this.parent.getTarget();
	                    }

	                    if (false === _disp) {
	                        this.vdom.setStyle('display', 'none');
	                    }
	                    this.vdom.pushDom(init_tgt);
	                }

	                for (var idx in this.event) {
	                    this.event[idx].event();
	                }

	                /* set layout */
	                for (var idx in this.layout) {
	                    this.layout[idx].layout();
	                }

	                for (var idx in this.child) {
	                    this.child[idx].init(_disp);
	                }

	                this.state = "inited";

	                this.afterInit();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'afterInit',
	        value: function afterInit() {}
	    }, {
	        key: 'setVisible',
	        value: function setVisible(flg, eff) {
	            try {
	                var _flg = flg === undefined ? null : flg;
	                var _eff = eff === undefined ? null : eff;

	                if (null === _flg) {
	                    throw new Error('invalid parameter');
	                }

	                if ('boolean' != typeof _flg || null != _eff && 'object' != (typeof _eff === 'undefined' ? 'undefined' : _typeof(_eff))) {
	                    throw new Error('invalid parameter');
	                }

	                if (null != _eff) {
	                    eff.setTarget(this);
	                    eff.setCallback(function (prm) {
	                        try {
	                            if (true === prm[1]) {
	                                prm[0].setStyle('display', null);
	                            } else {
	                                prm[0].setStyle('display', 'none');
	                            }
	                        } catch (e) {
	                            console.error(e.stack);
	                            throw e;
	                        }
	                    }, [this.getVdom(), _flg]);
	                    _eff.effect(_flg);
	                } else {
	                    var vd = this.getVdom();
	                    if (true === _flg) {
	                        vd.setStyle('display', null);
	                    } else {
	                        vd.setStyle('display', 'none');
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getVdom',
	        value: function getVdom() {
	            try {
	                return this.vdom;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file layout/Base.js
	 * @brief Base class of layout
	 */

	mofron.layout.Base = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            this.target = null;
	            this.exec_cnt = 0;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * @param tgt : (object) layout target Parts
	     */


	    _createClass(_class, [{
	        key: 'setTarget',
	        value: function setTarget(tgt) {
	            try {
	                this.target = tgt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'layout',
	        value: function layout() {
	            try {
	                if (null === this.target) {
	                    throw new Error('target is null');
	                }
	                var tgt_chd = this.target.getChild();
	                for (var idx in tgt_chd) {
	                    if (idx < this.exec_cnt) {
	                        continue;
	                    }
	                    this.layoutFunc(idx, tgt_chd[idx]);
	                    this.exec_cnt++;
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'layoutFunc',
	        value: function layoutFunc(idx, tgt) {
	            try {
	                console.warn('layout is not implements');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file event/Base.js
	 */

	mofron.event.Base = function () {
	    function _class(cbf) {
	        _classCallCheck(this, _class);

	        try {
	            var _cbf = cbf === undefined ? null : cbf;
	            this.target = null;
	            this.cb_func = _cbf;
	            this.cb_parm = null;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'setTarget',
	        value: function setTarget(parts) {
	            try {
	                if ('object' != (typeof parts === 'undefined' ? 'undefined' : _typeof(parts))) {
	                    throw new Error('invalid parameter');
	                }
	                this.target = parts.getEventTgt();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setCbfunc',
	        value: function setCbfunc(cbf, cbp) {
	            try {
	                if (null === cbf) {
	                    throw new Error('invalid parameter');
	                }
	                var _cbp = cbp === undefined ? null : cbp;
	                this.cb_func = cbf;
	                this.cb_parm = _cbp;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'event',
	        value: function event() {
	            try {
	                console.warn('not implement');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();
	/* end of file */

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file effect/Base.js
	 */

	mofron.effect.Base = function () {
	    function _class(tgt, spd) {
	        _classCallCheck(this, _class);

	        try {
	            var _tgt = tgt === undefined ? null : tgt;
	            this.target = null;
	            if (null != _tgt) {
	                this.setTarget(_tgt);
	            }

	            var _spd = spd === undefined ? null : spd;
	            this.speed = 0.5;
	            if (null != _spd) {
	                this.setSpeed(_spd);
	            }

	            this.callback = new Array(null, null);
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'setTarget',
	        value: function setTarget(tgt) {
	            try {
	                if ('object' != (typeof tgt === 'undefined' ? 'undefined' : _typeof(tgt))) {
	                    throw new Error('invalid parameter');
	                }
	                this.target = tgt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'effect',
	        value: function effect(flg) {
	            try {
	                var _flg = flg === undefined ? true : flg;
	                var dom = this.target.getVdom();
	                if (false === dom.isPushed()) {
	                    throw new Error('target is not ready');
	                }
	                this.effect_func(_flg, dom);

	                if (null != this.callback[0]) {
	                    setTimeout(this.callback[0], 1000 * this.speed, this.callback[1]);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'effect_func',
	        value: function effect_func(flg, vd) {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setSpeed',
	        value: function setSpeed(spd) {
	            try {
	                if ('number' != typeof spd) {
	                    throw new Error('invalid parameter');
	                }
	                this.speed = spd;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setCallback',
	        value: function setCallback(cbf, cbp) {
	            try {
	                var _cbp = cbp === undefined ? null : cbp;
	                if ('function' != typeof cbf) {
	                    throw new Error('invalid parameter');
	                }
	                this.callback[0] = cbf;

	                if (null != _cbp) {
	                    this.callback[1] = _cbp;
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file tmpl/Base.js
	 */

	mofron.tmpl.Base = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            this.base = new mofron.parts.Base();
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'title',
	        value: function title(val) {
	            try {
	                var _val = val === undefined ? null : val;
	                if (null === _val) {
	                    return null;
	                }
	                var hc = new mofron.util.HeadConts('title');
	                hc.addConts(_val);
	                hc.pushTag();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'start',
	        value: function start() {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ }
/******/ ]);