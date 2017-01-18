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
	__webpack_require__(14);

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
	        theme: null,
	        root: new Array()
	    };
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @file func.js
	 */

	mofron.util.getId = function (tgt) {
	    try {
	        var _tgt = tgt === undefined ? null : tgt;
	        var ipf = "aid";
	        if (null !== _tgt) {
	            ipf = _tgt.name();
	        }
	        var ret_id = ipf + '-' + new Date().getTime() + '-';
	        var loop = 0;
	        var val = 0;
	        for (loop = 0; loop < 8; loop++) {
	            val = Math.random() * 16 | 0;
	            ret_id += (loop == 12 ? 4 : loop == 16 ? val & 3 | 8 : val).toString(16);
	        }
	        return ret_id;
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
	 * @author simpart
	 */

	/**
	 * @class Vdom
	 * @brief virtual dom defined
	 */
	mofron.util.Vdom = function () {
	    /**
	     * initialize member
	     *
	     * @param tag : (string) tag name
	     * @param cmp : (object) component object
	     */
	    function _class(tag, cmp) {
	        _classCallCheck(this, _class);

	        try {
	            if ('string' != typeof tag) {
	                throw new Error('invalid parameter');
	            }
	            this.id = null;
	            this.comp = undefined === cmp ? null : cmp;
	            this.m_tag = tag;
	            this.clname = new Array();
	            this.m_parent = null;
	            this.child = new Array();
	            this.m_style = new mofron.util.Style(this);
	            this.m_attr = {};
	            this.m_text = null;
	            this.value = null;
	            this.entity = null;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * tar name setter / getter
	     * r('invalid parameter');
	     *
	     * @param tg : (string) tag name (option)
	     * @return (string) tag name
	     */


	    _createClass(_class, [{
	        key: 'tag',
	        value: function tag(tg) {
	            try {
	                var _tg = undefined === tg ? null : tg;
	                if (null === _tg) {
	                    /* getter */
	                    return this.m_tag;
	                }
	                if ('string' != typeof _tg) {
	                    throw new Error('invalid parameter');
	                }
	                /* setter */
	                this.m_tag = _tg;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get tag id
	         * 
	         * @return (string) tag id
	         */

	    }, {
	        key: 'getId',
	        value: function getId() {
	            try {
	                if (null === this.id) {
	                    this.id = mofron.util.getId(this.comp);
	                }
	                return this.id;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * add child vdom
	         *
	         * @param chd : (object) child vdom
	         */

	    }, {
	        key: 'addChild',
	        value: function addChild(chd) {
	            try {
	                if ('object' != (typeof chd === 'undefined' ? 'undefined' : _typeof(chd))) {
	                    throw new Error('invalid parameter');
	                }

	                chd.parent(this);
	                this.child.push(chd);
	                this.value = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get child vdom object
	         *
	         * @param idx : (number) child index
	         * @return (object) child vdom object
	         */

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

	        /**
	         * style setter / getter
	         *
	         * @param key : (string) style key (option)
	         * @param val : (string) style value (option)
	         * @return (string) : style value
	         * @return (object) : style object
	         */

	    }, {
	        key: 'style',
	        value: function style(key, val) {
	            try {
	                if (undefined === val && 'string' === typeof key) {
	                    /* getter */
	                    return this.m_style.get(key);
	                } else if ('string' === typeof key && ('string' === typeof val || null === val)) {
	                    /* setter */
	                    this.m_style.set(key, val);
	                    this.value;
	                } else if (undefined === key && undefined === val) {
	                    /* getter */
	                    return this.m_style;
	                } else {
	                    throw new Error('invalid parameter');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set style object
	         * 
	         */

	    }, {
	        key: 'setStyle',
	        value: function setStyle(sty) {
	            try {
	                if ('object' !== (typeof sty === 'undefined' ? 'undefined' : _typeof(sty))) {
	                    throw new Error('invalid parameter');
	                }
	                for (var key in sty) {
	                    this.m_style.set(key, sty[key]);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * tag attribute setter / getter
	         *
	         * @param key : (string) attribute key (option)
	         * @param val : (string) attribute value (option)
	         * @return
	         */

	    }, {
	        key: 'attr',
	        value: function attr(key, val) {
	            try {
	                if ('string' === typeof key && ('string' === typeof val || null === val)) {
	                    /* setter */
	                    this.m_attr[key] = val;
	                    if (true === this.isRendered()) {
	                        this.getDom().setAttribute(_key, val);
	                    }
	                    this.value = null;
	                } else if ('string' === typeof key && undefined === val) {
	                    /* getter */
	                    return this.m_attr[key];
	                } else if (undefined === key || undefined === val) {
	                    /* getter */
	                    return this.m_attr;
	                } else {
	                    throw new Error('invalid parameter');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * add tag class name
	         * 
	         * @param name : (string) class name
	         */

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

	        /**
	         * tag contents text setter / getter
	         * 
	         * @param cnt : (string) tag contents (option)
	         * @return (string) tag contents
	         */

	    }, {
	        key: 'text',
	        value: function text(txt) {
	            try {
	                if ('string' === typeof txt) {
	                    /* setter */
	                    if (true === this.isRendered()) {
	                        this.getDom().innerHTML = txt;
	                    }
	                    this.m_text = txt;
	                } else if (undefined === txt) {
	                    /* getter */
	                    return this.m_text;
	                } else {
	                    throw new Error('invalid parameter');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get dom string
	         *
	         * @return (string) dom string
	         */

	    }, {
	        key: 'getValue',
	        value: function getValue() {
	            try {
	                var ret_val = '';
	                if (null != this.value) {
	                    ret_val += this.value;
	                } else {
	                    //console.log(this.getId() + ' -> getValue()');
	                    ret_val += '<' + this.tag() + ' ';

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

	                    /* get style string */
	                    var style_conts = this.m_style.get();
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

	                    /* get attribute string */
	                    var attr_conts = '';
	                    var attr_val = this.attr();
	                    for (var key in attr_val) {
	                        attr_conts += key;
	                        if (null != attr_val[key]) {
	                            attr_conts += '=' + attr_val[key] + ' ';
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

	                if (null != this.text()) {
	                    ret_val += this.text();
	                }

	                if (false === this.isSimpleTag()) {
	                    ret_val += '</' + this.tag() + '>';
	                }

	                return ret_val;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * draw dom to target dom
	         * 
	         * @param tgt : (object) target dom
	         */

	    }, {
	        key: 'pushDom',
	        value: function pushDom(tgt) {
	            try {
	                if (true === this.isRendered()) {
	                    throw new Error('already pushed');
	                }

	                this.parent(tgt);

	                var tgt_dom = null;
	                if (null === this.parent()) {
	                    tgt_dom = document.body;
	                } else {
	                    tgt_dom = this.parent().getDom();
	                }
	                tgt_dom.insertAdjacentHTML('beforeend', this.getValue());

	                this.setPushed();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get vdom status
	         *
	         * @return (boolean) true : this vdom had pushed
	         * @return (boolean) false : this vdom had not pushed
	         */

	    }, {
	        key: 'isRendered',
	        value: function isRendered() {
	            try {
	                if (null === this.entity) {
	                    return false;
	                }
	                return true;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * update vdom status
	         * 
	         * @note update status also child vdom
	         */

	    }, {
	        key: 'setPushed',
	        value: function setPushed() {
	            try {
	                if (0 != this.child.length) {
	                    for (var chd_idx in this.child) {
	                        this.child[chd_idx].setPushed();
	                    }
	                }
	                this.entity = document.querySelector('#' + this.getId());
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * check whether tag name is simple tag
	         *
	         * @return (boolean) true  : this vdom is simple tag
	         * @return (boolean) false : this vdom is not simple tag
	         */

	    }, {
	        key: 'isSimpleTag',
	        value: function isSimpleTag() {
	            try {
	                if ('br' == this.m_tag || 'hr' == this.m_tag || 'input' == this.m_tag || 'img' == this.m_tag) {
	                    return true;
	                }
	                return false;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * parent vdom setter / getter
	         * 
	         * @param pnt : (object) parent vdom
	         * @return (object) parant vdom
	         */

	    }, {
	        key: 'parent',
	        value: function parent(pnt) {
	            try {
	                if ('object' === (typeof pnt === 'undefined' ? 'undefined' : _typeof(pnt))) {
	                    /* setter */
	                    this.m_parent = pnt;
	                } else if (undefined === pnt) {
	                    /* getter */
	                    return this.m_parent;
	                } else {
	                    throw new Error('invalid parameter');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get pushed dom object
	         *
	         * @return (object) dom object
	         */

	    }, {
	        key: 'getDom',
	        value: function getDom() {
	            try {
	                if (false === this.isRendered()) {
	                    throw new Error('this vdom is not rendered yet');
	                }
	                return this.entity;
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
	 * @author simpart
	 */

	/**
	 * @class Style
	 * @brief component style class
	 */
	mofron.util.Style = function () {
	    /**
	     * initialize member
	     *
	     * @param tgt : (object) target vdom object
	     */
	    function _class(tgt) {
	        _classCallCheck(this, _class);

	        try {
	            var _tgt = tgt === undefined ? null : tgt;
	            if (null !== _tgt && 'object' !== (typeof _tgt === 'undefined' ? 'undefined' : _typeof(_tgt))) {
	                throw new Error('invalid parameter');
	            }
	            this.target = _tgt;
	            this.m_protect = false;
	            this.conts = {};
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * set style
	     *
	     * @param key : (string) style key
	     * @param val : (string) style value
	     */


	    _createClass(_class, [{
	        key: 'set',
	        value: function set(key, val) {
	            try {
	                var _val = val === undefined ? null : val;

	                if ('string' != typeof key || null != _val && 'string' != typeof _val) {
	                    throw new Error('invalid parameter');
	                }

	                if (false === this.m_protect || true === this.m_protect && undefined === this.conts[key]) {
	                    this.conts[key] = _val;
	                    if (null !== this.target && true === this.target.isRendered()) {
	                        this.target.getDom().style[key] = _val;
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get style value
	         *
	         * @param key : (string) style key
	         * @return (object) style contents
	         * @return (string) style contents value
	         */

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

	        /**
	         * protect state setter / getter
	         *
	         * @param flg : (boolean) state flag
	         * @return (boolean)
	         */

	    }, {
	        key: 'protect',
	        value: function protect(flg) {
	            try {
	                if (undefined === flg) {
	                    /* getter */
	                    return this.m_protect;
	                }
	                /* setter */
	                if ('boolean' !== typeof flg) {
	                    throw new Error('invalid parameter');
	                }
	                this.m_protect = flg;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getStyleStr',
	        value: function getStyleStr() {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	        //    style () {
	        //        try {
	        //            
	        //        } catch (e) {
	        //            console.error(e.stack);
	        //            throw e;
	        //        }
	        //    }

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
	 * @author simpart
	 */

	/**
	 * @class Color
	 * @brief Color Defined Class
	 */
	mofron.util.Color = function () {
	    /**
	     * initialize member
	     *
	     * @param r : (number 0-255) red value (option)
	     * @param g : (number 0-255) green value (option)
	     * @param b : (number 0-255) blue alue (option)
	     * @param a : (number 0-1)   alpha value (option)
	     */
	    function _class(r, g, b, a) {
	        _classCallCheck(this, _class);

	        try {
	            this.name = 'Color';
	            this.red = r === undefined ? null : r;
	            this.green = g === undefined ? null : g;
	            this.blue = b === undefined ? null : b;
	            this.alpha = a === undefined ? 1 : a;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * get name
	     *
	     * @return (string) own name
	     */


	    _createClass(_class, [{
	        key: 'getName',
	        value: function getName() {
	            try {
	                return this.name;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get rgba value
	         * 
	         * @return (object) rgba array object
	         *   [0] -> (number) red value
	         *   [1] -> (number) green value
	         *   [2] -> (number) blue value
	         *   [3] -> (number) alpha value
	         */

	    }, {
	        key: 'getRgba',
	        value: function getRgba() {
	            try {
	                return new Array(this.red, this.green, this.blue, this.alpha);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get coloe style value
	         *
	         * @return (string) rgba(x,x,x,x)
	         * @return (string) none
	         * @note return 'none' if rgb is null.
	         */

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
	 * @author simpart
	 */

	/**
	 * @class Font
	 * @brief Font Defined Class
	 */
	mofron.util.Font = function () {
	    /**
	     * initialize font
	     *
	     * @param fnt : (string) font name
	     */
	    function _class(fnt, pth) {
	        _classCallCheck(this, _class);

	        try {
	            /* check parameter */
	            var _pth = pth === undefined ? null : pth;
	            if ('string' !== typeof fnt) {
	                throw new Error('invalid parameter');
	            }

	            /* initialize member */
	            this.m_name = null;
	            this.m_family = {};
	            this.size = 15;
	            this.thm_sel = 'mofron-theme-' + mofron.util.getId(this);
	            this.thm_flg = false;

	            /* initialize function */
	            this.name('Font');
	            this.addFamily(fnt);
	            if (null !== _pth) {
	                this.setFace(fnt, _pth);
	            }
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * name 
	     *
	     * @return (string) own name
	     */


	    _createClass(_class, [{
	        key: 'name',
	        value: function name(nm) {
	            try {
	                if (undefined === nm) {
	                    /* getter */
	                    return this.m_name;
	                }
	                /* setter */
	                if ('string' !== typeof nm) {
	                    throw new Error('invalid parameter');
	                }
	                this.m_name = nm;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set @font-face
	         * 
	         * @param fnt : (string) font name
	         * @param pth : (string) path to font file
	         */

	    }, {
	        key: 'setFace',
	        value: function setFace(fnt, pth) {
	            try {
	                var hc = new mofron.util.HeadConts('style');

	                if ('string' !== typeof pth || 'string' !== typeof fnt) {
	                    throw new Error('invalid parameter');
	                }

	                /* format */
	                var pth_spt = pth.split('.');
	                var format = '';
	                if ('woff' === pth_spt[pth_spt.length - 1]) {
	                    format = "format('woff')";
	                } else if ('ttf' === pth_spt[pth_spt.length - 1]) {
	                    format = "format('truetype')";
	                } else if ('otf' === pth_spt[pth_spt.length - 1]) {
	                    format = "format('opentype')";
	                } else if ('eot' === pth_spt[pth_spt.length - 1]) {
	                    format = "format('embedded-opentype')";
	                } else if ('svg' === pth_spt[pth_spt.length - 1] || 'svgz' === pth_spt[pth_spt.length - 1]) {
	                    format = "format('svg')";
	                }

	                var style = {
	                    'font-family': fnt,
	                    'src': "url('" + pth + "') " + format
	                };
	                hc.addConts(mofron.util.getStyleConts('@font-face', style));
	                hc.pushTag();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * add font family
	         *
	         * @param fm : (string) font family
	         */

	    }, {
	        key: 'addFamily',
	        value: function addFamily(fm) {
	            try {
	                var _fm = fm === undefined ? null : fm;
	                if ('string' !== typeof _fm) {
	                    throw new Error('invalid parameter');
	                }
	                this.m_family['"' + _fm + '"'] = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get font family list
	         * 
	         * @param idx : (number) family index
	         * @return (object) : font family
	         */

	    }, {
	        key: 'getFamily',
	        value: function getFamily(idx) {
	            try {
	                var _idx = idx === undefined ? null : idx;
	                var ret_val = new Array();
	                for (var idx in this.m_family) {
	                    ret_val.push(idx);
	                }

	                if (null === _idx) {
	                    return ret_val;
	                } else {
	                    if (-1 < _idx && ret_val.length > _idx) {
	                        return ret_val[_idx];
	                    }
	                }
	                return null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getFamilyStyle',
	        value: function getFamilyStyle() {
	            try {
	                var fm = this.getFamily();
	                var fm_str = '';
	                for (var idx in fm) {
	                    if ('' !== fm_str) {
	                        fm_str += ',';
	                    }
	                    fm_str += fm[idx];
	                }
	                return fm_str;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * font size setter/getter
	         * 
	         * @param val : (number) font size
	         * @return (number) font size
	         */

	    }, {
	        key: 'size',
	        value: function size(val) {
	            try {
	                var _val = val === undefined ? null : val;
	                if (null === _val) {
	                    return this.size;
	                }
	                if ('number' !== typeof _val || 0 > _val) {
	                    throw new Error('invalid parameter');
	                }
	                this.size = _val;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set own font style to style tag.
	         */

	    }, {
	        key: 'pushTheme',
	        value: function pushTheme() {
	            try {
	                if (true === this.thm_flg) {
	                    return;
	                }
	                var hc = new mofron.util.HeadConts('style');
	                var style = {
	                    'font-family': this.getFamilyStyle(),
	                    'font-size': this.size + 'px'
	                };
	                hc.addConts(mofron.util.getStyleConts(this.thm_sel, style));
	                hc.pushTag();
	                this.thm_flg = true;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getThemeClass',
	        value: function getThemeClass() {
	            try {
	                return this.thm_sel;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set font-family style to target component
	         * 
	         * @param (object) : target object
	         */

	    }, {
	        key: 'setFont',
	        value: function setFont(tgt) {
	            try {
	                var _tgt = tgt === undefined ? null : tgt;
	                if (null === _tgt || 'object' !== (typeof _tgt === 'undefined' ? 'undefined' : _typeof(_tgt))) {
	                    throw new Error('invalid parameter');
	                }

	                if (true === this.thm_flg) {
	                    tgt.getTarget().addClname(this.thm_sel);
	                } else {
	                    tgt.style('font-family', this.getFamilyStyle());
	                    tgt.style('font-size', this.size + 'px');
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
	 * @file   component.js
	 * @author simpart
	 */

	/**
	 * @class Base
	 * @brief base component class
	 */
	mofron.comp.Base = function () {

	    /**
	     * initialize member, vdom
	     *
	     * @param prm : (object) initialize parameter (option)
	     * @param opt : (object) initialize option (option)
	     * @note parameter syntax -> [prm] | [opt] | prm, opt
	     */
	    function _class(prm, opt) {
	        _classCallCheck(this, _class);

	        try {
	            /* initialize member */
	            this.m_parent = null;
	            this.child = new Array();
	            this.event = new Array();
	            this.layout = new Array();
	            this.vdom = null;
	            this.target = null;
	            //this.m_style  = new mofron.util.Style();
	            this.m_theme = new mofron.Theme();
	            this.m_state = 'init';
	            this.m_name = 'Base';
	            this.param = new Array(null, null);

	            /* parameter check */
	            var _prm = prm === undefined ? null : prm;
	            var _opt = opt === undefined ? null : opt;
	            if (null !== _prm && null === _opt) {
	                if ('object' === (typeof _prm === 'undefined' ? 'undefined' : _typeof(_prm))) {
	                    var hit = false;
	                    for (var idx in _prm) {
	                        hit = true;
	                        break;
	                    }
	                    if (true === hit) {
	                        this.param[1] = _prm;
	                    } else {
	                        this.param[0] = _prm;
	                    }
	                } else {
	                    this.param[0] = _prm;
	                }
	            } else if (null === _prm && null !== _opt) {
	                this.param[1] = _opt;
	            }

	            /* initialize virtual dom */
	            //this.initVdom(this.vdom, this.param[0]);
	            if (null !== this.param[1]) {
	                /* option */

	            }
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /*** method ***/

	    /**
	     * return component status
	     *
	     * @return (boolean) true : this component is initialized
	     * @return (boolean) false : this component is not initialize
	     */


	    _createClass(_class, [{
	        key: 'isRendered',
	        value: function isRendered() {
	            try {
	                if (null === this.vdom) {
	                    return false;
	                }
	                return this.getVdom().isRendered();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'state',
	        value: function state(sts) {
	            try {
	                if (undefined === sts) {
	                    return this.m_state;
	                }
	                if ('string' !== typeof sts) {
	                    throw new Error('invalid parameter');
	                }
	                this.m_state = sts;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get common target vdom
	         *
	         * @return (object) vdom object
	         */

	    }, {
	        key: 'getTarget',
	        value: function getTarget() {
	            try {
	                if (null !== this.target) {
	                    return this.target;
	                }
	                var ret = this.getVdom();
	                if (null !== this.target) {
	                    ret = this.target;
	                }
	                return ret;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get style target vdom
	         *
	         * @return (object) vdom object
	         */

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

	        /**
	         * get event target vdom
	         *
	         * @return (object) vdom object
	         */

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

	        /**
	         * add child component
	         * 
	         * @param chd : (object) child component
	         * @paran disp : (boolean) child display flag
	         */

	    }, {
	        key: 'addChild',
	        value: function addChild(chd, disp) {
	            try {
	                var _disp = disp === undefined ? true : disp;

	                chd.parent(this); // child's parent is me
	                this.child.push(chd);

	                /* set theme to child */
	                chd.theme(this.m_theme);

	                /* init child */
	                if (true === this.isRendered()) {
	                    chd.initDom(_disp);
	                    for (var idx in this.layout) {
	                        this.layout[idx].layout();
	                    }
	                }

	                /* set default display of child */
	                var chd_vdom = chd.getVdom();
	                if (false === _disp) {
	                    chd_vdom.style('display', 'none');
	                }

	                /* link to target my vdom */
	                this.getTarget().addChild(chd_vdom);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get child component
	         * 
	         * @param idx : (number) child index (option)
	         * @return child component
	         */

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

	        /**
	         * parent getter / setter
	         *
	         * @param pnt : (object) parent component
	         */

	    }, {
	        key: 'parent',
	        value: function parent(pnt) {
	            try {
	                if (undefined === pnt) {
	                    return this.m_parent;
	                }
	                this.m_parent = pnt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * style getter / setter
	         *
	         * @param key (string) style key
	         * @param val (string) style value
	         * @return (object) style object
	         * @note parameter syntax
	         *         key     : get style value of key
	         *         key,val : set style value of key
	         *         (none)  : get style object
	         */

	    }, {
	        key: 'style',
	        value: function style(key, val) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _val = val === undefined ? null : val;

	                if (null === _key && null === _val) {
	                    /* getter */
	                    return this.getStyleTgt().style().get();
	                } else if (null !== _key && undefined === val) {
	                    /* getter */
	                    return this.getStyleTgt().style(_key);
	                } else if (null !== _key && null !== _val) {
	                    /* setter */
	                    this.getStyleTgt().style(_key, _val);
	                } else {
	                    throw new Error('invalid parameter');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * add component event 
	         *
	         * @param evt : (object) event object
	         */

	    }, {
	        key: 'addEvent',
	        value: function addEvent(evt) {
	            try {
	                if ('object' !== (typeof evt === 'undefined' ? 'undefined' : _typeof(evt))) {
	                    throw new Error('invalid parameter');
	                }
	                this.event.push(evt);
	                this.getVdom();
	                evt.setTarget(this);
	                if (true === this.isRendered()) {
	                    evt.event();
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get event object
	         *
	         * @param idx : (number) event index
	         * @return (object) event object
	         */

	    }, {
	        key: 'getEvent',
	        value: function getEvent(idx) {
	            try {
	                var _idx = idx === undefined ? null : idx;
	                if (null === _idx) {
	                    return this.event;
	                }

	                if ('number' !== typeof _idx || 0 > _idx || this.event.length <= _idx) {
	                    return null;
	                }
	                return this.event[_idx];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**console.error(e.stack);
	        *             throw e;
	         * add component layout
	         *
	         * @param lo : (object) layout object
	         */

	    }, {
	        key: 'addLayout',
	        value: function addLayout(lo) {
	            try {
	                if (undefined === lo || null === lo || 'object' !== (typeof lo === 'undefined' ? 'undefined' : _typeof(lo))) {
	                    throw new Error('invalid parameter');
	                }
	                this.layout.push(lo);
	                this.getVdom();
	                lo.setTarget(this);

	                if (true === this.isRendered()) {
	                    lo.layout();
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get layout object
	         *
	         * @param idx : (number) layout index
	         * @return (object) layout object
	         */

	    }, {
	        key: 'getLayout',
	        value: function getLayout(idx) {
	            try {
	                var _idx = idx === undefined ? null : idx;
	                if (null === _idx) {
	                    this.state('initDom');
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
	         * theme setter / getter
	         *
	         * @param thm : (object) theme object
	         * @return (object) theme object
	         */

	    }, {
	        key: 'theme',
	        value: function theme(thm) {
	            try {
	                var _thm = thm === undefined ? null : thm;
	                if (null === _thm) {
	                    return this.m_theme;
	                }
	                this.m_theme.setTheme(_thm);
	                for (var idx in this.child) {
	                    this.child[idx].theme(_thm);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * create componrnt DOM
	         * 
	         * @param disp (bool) : initial visible flag. default is true
	         */

	    }, {
	        key: 'initDom',
	        value: function initDom(disp) {
	            try {
	                if ('initDom' === this.state()) {
	                    throw new Error('detect initDom duplex');
	                }
	                this.state('initDom');
	                /* set initialize target */

	                /* init vdom */
	                this.getStyleTgt().style().protect(true);
	                this.initDomContsCtl();
	                this.getStyleTgt().style().protect(false);

	                if (null === this.parent() || 'rendered' === this.parent().state()) {
	                    if (false === disp) {
	                        this.getVdom().style('display', 'none');
	                    }

	                    var init_tgt = null;
	                    if (null === this.m_parent) {
	                        mofron.root.push(this);
	                    } else {
	                        init_tgt = this.m_parent.getTarget();
	                    }

	                    this.getVdom().pushDom(init_tgt);
	                }

	                /* set event */
	                for (var idx in this.event) {
	                    this.event[idx].event();
	                }

	                /* set layout */
	                for (var idx in this.layout) {
	                    this.layout[idx].layout();
	                }

	                /* initialize child component */
	                for (var idx in this.child) {
	                    this.child[idx].initDom(disp);
	                }

	                /* finish state */
	                //this.state("inited");

	                this.afterInit();
	                this.state('rendered');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initDomContsCtl',
	        value: function initDomContsCtl() {
	            try {
	                if (null !== this.vdom) {
	                    return;
	                }
	                //this.vdom = new mofron.util.Vdom('div', this);
	                this.initDomConts(this.vdom, this.param[0]);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initDomConts',
	        value: function initDomConts(vd, prm) {
	            try {
	                this.vdom = new mofron.util.Vdom('div', this);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'afterInit',
	        value: function afterInit() {}
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'visible',
	        value: function visible(flg, eff) {
	            try {
	                var _flg = flg === undefined ? null : flg;
	                var _eff = eff === undefined ? null : eff;

	                /* parameter check */
	                if (null === _flg) {
	                    if (false === this.isRendered()) {
	                        return false;
	                    }
	                    var disp = this.getVdom().style('display');
	                    if ('none' === disp) {
	                        return false;
	                    } else {
	                        return true;
	                    }
	                }

	                if ('boolean' != typeof _flg || null != _eff && 'object' != (typeof _eff === 'undefined' ? 'undefined' : _typeof(_eff))) {
	                    throw new Error('invalid parameter');
	                }

	                /* initialize component */
	                if ('init' === this.state()) {
	                    this.initDom(_flg);
	                }

	                /* set effect */
	                if (null != _eff) {
	                    eff.setTarget(this);
	                    eff.setCallback(function (prm) {
	                        try {
	                            if (true === prm[1]) {
	                                prm[0].style('display', null);
	                            } else {
	                                prm[0].style('display', 'none');
	                            }
	                        } catch (e) {
	                            console.error(e.stack);
	                            throw e;
	                        }
	                    }, [this.getVdom(), _flg]);

	                    _eff.effect(_flg);
	                } else {
	                    if (true === _flg) {
	                        this.getVdom().style('display', null);
	                    } else {
	                        this.getVdom().style('display', 'none');
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get top vdom object
	         * 
	         * @return (object) vdom object
	         */

	    }, {
	        key: 'getVdom',
	        value: function getVdom() {
	            try {
	                if (null === this.vdom) {
	                    this.initDomContsCtl();
	                }
	                return this.vdom;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * component name setter / getter
	         *
	         * @param nm : (string) component name
	         * @return (string) component name
	         * @note parameter syntax
	         */

	    }, {
	        key: 'name',
	        value: function name(nm) {
	            try {
	                if (undefined === nm) {
	                    return this.m_name;
	                }
	                this.m_name = nm;
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
	 * @file event.js
	 * @author simpart
	 */

	/**
	 * @class mofron.event.Base
	 * @brief base class of event
	 */
	mofron.event.Base = function () {
	    /**
	     * initialize member
	     *
	     * @param fnc : (option) function for event listener
	     * @param prm : (option) function parameter
	     */
	    function _class(fnc, prm) {
	        _classCallCheck(this, _class);

	        try {
	            var _fnc = fnc === undefined ? null : fnc;
	            this.target = null;
	            this.func = null;
	            this.parm = null;
	            if (null !== _fnc) {
	                this.setEventFunc(_fnc, prm);
	            }
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * set event target component
	     *
	     * @param comp : component object
	     */


	    _createClass(_class, [{
	        key: 'setTarget',
	        value: function setTarget(comp) {
	            try {
	                if ('object' != (typeof comp === 'undefined' ? 'undefined' : _typeof(comp))) {
	                    throw new Error('invalid parameter');
	                }
	                this.target = comp.getEventTgt();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set function for event listener
	         *
	         * @param fnc : (function) function for event listener
	         * @param prm : (mixed) function parameter (option)
	         */

	    }, {
	        key: 'setEventFunc',
	        value: function setEventFunc(fnc, prm) {
	            try {
	                var _fnc = fnc === undefined ? null : fnc;
	                var _prm = prm === undefined ? null : prm;
	                if (null === _fnc) {
	                    throw new Error('invalid parameter');
	                }
	                this.func = _fnc;
	                this.parm = _prm;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'event',
	        value: function event() {
	            try {
	                if (null === this.target || false === this.target.isRendered()) {
	                    throw new Error('target is not ready');
	                }
	                this.eventFunc();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * this is interface function.
	         * extend class need implement this function.
	         */

	    }, {
	        key: 'eventFunc',
	        value: function eventFunc() {
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
	                if (false === dom.isRendered()) {
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
	 * @file template.js
	 */

	mofron.tmpl.Base = function () {
	    function _class(prm) {
	        _classCallCheck(this, _class);

	        try {
	            /* initialize member */
	            this.base = new mofron.comp.Base();
	            this.param = prm === undefined ? null : prm;
	            this.m_title = null;
	            this.m_theme = null;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'init',
	        value: function init(disp) {
	            try {
	                var _disp = disp === undefined ? true : disp;
	                this.initTemplate(this.param);
	                this.base.init(false);
	                if (true === _disp) {
	                    this.setVisible(true);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initTemplate',
	        value: function initTemplate(prm) {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'title',
	        value: function title(val) {
	            try {
	                var _val = val === undefined ? null : val;
	                if (null === _val) {
	                    return this.m_title;
	                }
	                var hc = new mofron.util.HeadConts('title');
	                hc.addConts(_val);
	                hc.pushTag();
	                this.m_title = _val;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'theme',
	        value: function theme(thm) {
	            try {
	                var _thm = thm === undefined ? null : thm;
	                if (null === _thm) {
	                    return this.base.theme();
	                }
	                this.base.theme(_thm);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setVisible',
	        value: function setVisible(flg, eff) {
	            try {
	                var _eff = eff === undefined ? new mofron.effect.Fade() : eff;
	                this.base.setVisible(true, _eff);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}();

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file theme.js
	 * @author simpart
	 */

	/**
	 * @class mofron.theme
	 * @brief Theme Defined Class
	 */
	mofron.Theme = function () {
	    /**
	     * initialize member
	     */
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            this.conts = {};
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /**
	     * set theme contents
	     * 
	     * @param thm : (mofron.theme object) theme
	     * @param ovr : (bool) over ride flag (option)
	     */


	    _createClass(_class, [{
	        key: 'setTheme',
	        value: function setTheme(thm, ovr) {
	            try {
	                var _thm = thm === undefined ? null : thm;
	                var _ovr = ovr === undefined ? true : ovr;

	                if (null === _thm) {
	                    throw new Error('invalid parameter');
	                }

	                var thm_cnt = thm.get();
	                var cnt_buf = null;
	                for (var cnt_key in thm_cnt) {
	                    cnt_buf = this.get(cnt_key);
	                    if (false === _ovr) {
	                        if (null !== cnt_buf) {
	                            continue;
	                        }
	                    }
	                    for (var idx in thm_cnt[cnt_key]) {
	                        this.set(cnt_key, thm_cnt[cnt_key][idx], parseInt(idx));
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set font theme
	         *
	         * @param fnt : (object) Font object
	         * @param idx : (number) set index (option)
	         */

	    }, {
	        key: 'setFont',
	        value: function setFont(fnt, idx) {
	            try {
	                var _fnt = fnt === undefined ? null : fnt;
	                var _idx = idx === undefined ? 0 : idx;
	                if (null === _fnt || 'object' !== (typeof _fnt === 'undefined' ? 'undefined' : _typeof(_fnt)) || 'Font' !== _fnt.getName()) {
	                    throw new Error('invalid parameter');
	                }

	                _fnt.pushTheme();
	                this.set(_fnt.getName(), _fnt, _idx);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set color theme
	         *
	         * @param clr : (object) Color object
	         * @param idx : (number) set index (option)
	         */

	    }, {
	        key: 'setColor',
	        value: function setColor(clr, idx) {
	            try {
	                var _clr = clr === undefined ? null : clr;
	                var _idx = idx === undefined ? 0 : idx;
	                if (null === _clr || 'object' !== (typeof _clr === 'undefined' ? 'undefined' : _typeof(_clr)) || 'Color' !== _clr.getName()) {
	                    throw new Error('invalid parameter');
	                }

	                this.set(_clr.getName(), _clr, _idx);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set component theme
	         *
	         * @param comp : (object) component object
	         * @param idx : (number) set index (option)
	         */

	    }, {
	        key: 'setComp',
	        value: function setComp(comp, idx) {
	            try {
	                var _comp = comp === undefined ? null : comp;
	                var _idx = idx === undefined ? 0 : idx;
	                if (null === _comp || 'object' !== (typeof _comp === 'undefined' ? 'undefined' : _typeof(_comp))) {
	                    throw new Error('invalid parameter');
	                }
	                this.set(_comp.getName(), _comp, _idx);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getComp',
	        value: function getComp(cmp_nm, idx) {
	            try {
	                var _idx = idx === undefined ? 0 : idx;
	                var _cmp_nm = cmp_nm === undefined ? null : cmp_nm;
	                if (null === _cmp_nm || 'string' !== typeof _cmp_nm) {
	                    throw new Error('invalid parameter');
	                }
	                return this.get(_cmp_nm, _idx);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get theme contents
	         * 
	         * @param key : (string) theme identify key (option)
	         * @param idx : (number) get index (option)
	         * @return (object) theme value
	         */

	    }, {
	        key: 'get',
	        value: function get(key, idx) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _idx = idx === undefined ? null : idx;

	                if (null === _key) {
	                    return this.conts;
	                }

	                var hit = false;
	                for (var cnt_key in this.conts) {
	                    if (cnt_key === _key) {
	                        hit = true;
	                        break;
	                    }
	                }
	                if (false === hit) {
	                    return null;
	                }

	                if (null === _idx) {
	                    return this.conts[_key];
	                }

	                if (_idx >= this.conts[_key].length || _idx < 0) {
	                    return null;
	                }

	                //for (var dbg_key in this.conts) {
	                //    console.log(dbg_key); 
	                //}
	                return this.conts[_key][_idx];
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * set theme contents
	         * 
	         * @param key : (string) theme contetent key
	         * @param val : (object) theme element
	         * @param idx : (number) set index
	         */

	    }, {
	        key: 'set',
	        value: function set(key, val, idx) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _val = val === undefined ? null : val;
	                var _idx = idx === undefined ? 0 : idx;

	                if (null === _key || null === _val || 0 > _idx) {
	                    throw new Error('invalid parameter');
	                }

	                if (undefined === this.conts[_key]) {
	                    this.conts[_key] = new Array();
	                }

	                if (_idx === this.conts[_key].length) {
	                    this.conts[_key].push(_val);
	                } else if (_idx < this.conts[_key].length) {
	                    this.conts[_key][_idx] = val;
	                } else {
	                    throw new Error('invalid parameter');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * remove theme value
	         *
	         * @param key : (string) theme identify key
	         * @param idx : (number) remove index
	         */

	    }, {
	        key: 'del',
	        value: function del(key, idx) {
	            try {
	                var _key = key === undefined ? null : key;
	                var _idx = idx === undefined ? 0 : idx;

	                if (null === _key || 0 > _idx && this.conts.length <= _idx) {
	                    throw new Error('invalid parameter');
	                }

	                var cnt = 0;
	                for (var cnt_key in this.conts) {
	                    if (cnt_key === _key) {
	                        this.conts[cnt_key].splice(_idx, 1);
	                        if (0 === this.conts[cnt_key].length) {
	                            this.conts.splice(cnt, 1);
	                        }
	                        return;
	                    }
	                    cnt++;
	                }

	                throw new Error('invalid parameter');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addNotify',
	        value: function addNotify(func) {
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