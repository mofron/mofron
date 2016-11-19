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

	__webpack_require__(1);
	__webpack_require__(3);
	mofron.parts.Base = __webpack_require__(4);
	//mofron.event.Base = require('./event/Base.js');
	//mofron.layout.Base = require('./layout/Base.js');

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
	        parts: {},
	        layout: {},
	        event: {},
	        effect: {},
	        template: {},
	        util: {},
	        root: new Array()
	    };
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	mofron.util.getId = function () {
	    try {
	        var ret_id = "";
	        var loop = 0;
	        var val = 0;
	        for (loop = 0; loop < 32; loop++) {
	            val = Math.random() * 16 | 0;
	            if (loop === 8 || loop === 12 || loop === 16 || loop === 20) {
	                ret_id += "-";
	            }
	            ret_id += (loop == 12 ? 4 : loop == 16 ? val & 3 | 8 : val).toString(16);
	        }
	        return ret_id;
	    } catch (e) {
	        console.error(e.stack);
	        throw new Error();
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file   parts/Base.js
	 * @brief  Base of UI Parts Class
	 * @author simpart
	 */
	mofron.util.Vdom = __webpack_require__(5);

	module.exports = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            this.parent = null;
	            this.child = new Array();
	            //this.event     = new Array();
	            //this.layout    = new Array();
	            //this.effect    = new Array();
	            this.vdom = new mofron.util.Vdom('div');
	            this.init_flg = false;
	            this.initContents(this.vdom);
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /*** method ***/

	    _createClass(_class, [{
	        key: 'getTarget',
	        value: function getTarget() {
	            try {
	                return this.vdom;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(chd, disp) {
	            try {
	                var _disp = disp === undefined ? true : disp;
	                chd.parent = this;
	                this.child.push(chd);
	                if (true === this.init_flg) {
	                    chd.init(_disp);
	                    //                for(var idx in this.layout) {
	                    //                    this.layout[idx].layout(chd);
	                    //                }
	                }
	                var chd_tgt = this.getTarget();
	                var chd_vdom = chd.getVdom();
	                chd_vdom.setStyle('display', 'none');
	                chd_tgt.addChild(chd_vdom);
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
	                this.vdom.setStyle(key, val);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addEvent',
	        value: function addEvent(evt) {
	            try {
	                return;
	                //            this.event.push(evt);
	                //            evt.setTarget(this);
	                //            if (true === this.init_flg) {
	                //                evt.event();
	                //            }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addLayout',
	        value: function addLayout(lo) {
	            try {
	                return;
	                //            this.layout.push(lo);
	                //            lo.setTarget(this);
	                //            if (true === this.init_flg) {
	                //                for(var idx in this.child) {
	                //                    lo.layout(this.child[idx][0]);
	                //                }
	                //            }
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
	                if (true === this.init_flg) {
	                    throw new Error('detect duplicate init');
	                }
	                var _disp = disp === undefined ? true : disp;

	                /* set initialize target */
	                //var init_tgt = document.body;
	                var init_tgt = null;
	                if (null !== this.parent) {
	                    /* create to parent parts */
	                    this.vdom.setTarget(this.parent.getTarget());
	                } else {
	                    mofron.root.push(this);
	                }

	                if (false === _disp) {
	                    this.vdom.setStyle('display', 'none');
	                }
	                this.vdom.pushDom(init_tgt);

	                /* initialize event */
	                //for(var idx in this.event) {
	                //    this.event[idx].event();
	                //}
	                this.init_flg = true;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initContents',
	        value: function initContents(vd) {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setVisible',
	        value: function setVisible(flg, eff) {
	            try {

	                return;
	                //            var p_eff = eff || null;
	                //            
	                //            if ('boolean' != (typeof flg)) {
	                //                throw new Error('invalid parameter');
	                //            }
	                //            
	                //            if (null != p_eff) {
	                //                if (false === flg) {
	                //                    p_eff.start(this);
	                //                } else {
	                //                    p_eff.end(this);
	                //                }
	                //            } else {
	                //                if (false === flg) {
	                //                    $('#' + this.getId()).css('display', 'none');
	                //                } else {
	                //                    $('#' + this.getId()).css('display', '');
	                //                }
	                //                // set child visible
	                //                for(var idx in this.child) {
	                //                    if (true === this.child[idx][1]) {
	                //                        this.child[idx][0].visible(flg,p_eff);
	                //                    }
	                //                }
	                //            }
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file util/Vdom.js
	 *
	 */
	mofron.util.Style = __webpack_require__(6);

	module.exports = function () {
	    function _class(tag) {
	        _classCallCheck(this, _class);

	        try {
	            if ('string' != typeof tag) {
	                throw new Error('invalid parameter');
	            }
	            this.id = null;
	            this.tag = tag;
	            this.clname = null;
	            this.parent = null;
	            this.child = new Array();
	            this.style = new mofron.util.Style(this);
	            this.init_flg = false;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
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
	        key: 'getValue',
	        value: function getValue() {
	            try {
	                var ret_val = '<' + this.tag + ' ';

	                /* set id attribute */
	                ret_val += 'id="' + this.getId() + '" ';

	                /* set class attribute:*/
	                if (null != this.clname) {
	                    ret_val += 'class="' + this.clname + '" ';
	                }

	                /* set style attribute */
	                var style_conts = this.style.get();
	                if (null != this.style_conts) {
	                    ret_val += 'style="';
	                    for (var key in style_conts) {
	                        ret_val += key + ':' + style_conts[key] + ';';
	                    }
	                    ret_val += '"';
	                }
	                ret_val += '>';
	                /* get child value */
	                if (0 != this.child.length) {
	                    for (var chd_idx in this.child) {
	                        ret_val += this.child[chd_idx].getValue();
	                    }
	                }

	                ret_val += '</' + this.tag + '>';
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
	                this.setTarget(tgt);

	                var tgt_dom = null;
	                if (null === this.parent) {
	                    console.log("insert to body");
	                    tgt_dom = document.body;
	                } else {
	                    tgt_dom = document.querySelector('#' + tgt.getId());
	                }
	                console.log(this.getValue());
	                tgt_dom.innerHTML = this.getValue();

	                this.init_flg = true;
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
	    }]);

	    return _class;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file Style.js
	 */
	module.exports = function () {
	    function _class(tgt) {
	        _classCallCheck(this, _class);

	        try {
	            if ('object' != (typeof tgt === 'undefined' ? 'undefined' : _typeof(tgt))) {
	                throw new Error('invalid parameter');
	            }
	            this.target = tgt;
	            this.conts = new Array();
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    _createClass(_class, [{
	        key: 'set',
	        value: function set(key, val) {
	            try {
	                if ('string' != typeof key || 'string' != typeof val) {
	                    throw new Error('invalid parameter');
	                }
	                if (true === this.target.init_flg) {
	                    var dom = document.querySelector('#' + this.getId());
	                    dom.style[key] = val;
	                }
	                this.conts[key] = val;
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
	                if (0 === this.conts.length) {
	                    return null;
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

/***/ }
/******/ ]);