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
	__webpack_require__(15);

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
	        func: {},
	        theme: null,
	        root: new Array()
	    };
	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	mofron.Base = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            this.m_name = new Array();
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


	    _createClass(_class, [{
	        key: 'name',
	        value: function name(nm) {
	            try {
	                if (undefined === nm) {
	                    if (0 === this.m_name.length) {
	                        return null;
	                    }
	                    return this.m_name[this.m_name.length - 1];
	                }
	                if ('string' !== typeof nm) {
	                    throw new Error('invalid parameter');
	                }
	                this.m_name.push(nm);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getNameList',
	        value: function getNameList() {
	            try {
	                return this.m_name;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'option',
	        value: function option(opt) {
	            try {
	                if (null !== opt && 'object' === (typeof opt === 'undefined' ? 'undefined' : _typeof(opt))) {
	                    /* option */
	                    for (var opt_idx in opt) {
	                        if ('function' === typeof this[opt_idx]) {
	                            this[opt_idx](opt[opt_idx]);
	                        }
	                    }
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
/* 4 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * @file func.js
	 */

	mofron.func.getId = function (tgt) {
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
	        throw new e();
	    }
	};

	mofron.func.getCamelStyle = function (sty) {
	    try {
	        if ('string' !== typeof sty) {
	            throw new Error('invalid parameter');
	        }

	        if (sty.length - 1 === sty.lastIndexOf('-')) {
	            throw new Error('invalid parameter');
	        }

	        var skip = false;
	        if (0 === sty.indexOf('-')) {
	            skip = true;
	        }

	        var ret_val = sty;
	        var ret_buf = null;
	        var up_str = null;
	        var idx = null;
	        while (true) {
	            idx = ret_val.indexOf('-');
	            if (-1 === idx) {
	                break;
	            }
	            up_str = ret_val.charAt(idx + 1).toUpperCase();
	            ret_buf = ret_val.substr(0, idx);
	            if (true === skip) {
	                skip = false;
	                ret_val = ret_buf + ret_val.substr(idx + 1);
	            } else {
	                ret_val = ret_buf + up_str + ret_val.substr(idx + 2);
	            }
	        }
	        return ret_val;
	    } catch (e) {
	        console.error(e.stack);
	        throw e;
	    }
	};

	mofron.func.getColorObj = function (sty) {
	    try {
	        if ('none' === sty) {
	            return new mofron.util.Color();
	        } else if (null === sty) {
	            return null;
	        }

	        var color = null;
	        if (-1 !== sty.indexOf('rgba(')) {
	            color = sty.substring(5);
	        } else if (-1 !== sty.indexOf('rgb(')) {
	            color = sty.substring(4);
	        } else {
	            return null;
	        }

	        color = color.substring(0, color.length - 1);
	        color = color.split(',');
	        if (3 === color.length) {
	            return new mofron.util.Color(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]));
	        } else if (4 === color.length) {
	            return new mofron.util.Color(parseInt(color[0]), parseInt(color[1]), parseInt(color[2]), parseInt(color[3]));
	        } else {
	            return null;
	        }
	    } catch (e) {
	        console.error(e.stack);
	        throw new Error();
	    }
	};

	mofron.func.getStyleConts = function (sel, cnt) {
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
/* 5 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file Vdom.js
	 * @author simpart
	 */

	/**
	 * @class Vdom
	 * @brief virtual dom defined
	 */
	mofron.util.Vdom = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    /**
	     * initialize member
	     *
	     * @param tag : (string) tag name
	     * @param cmp : (object) component object
	     */
	    function _class(tg, cmp) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Vdom');

	            _this.id = null;
	            _this.comp = undefined === cmp ? null : cmp;
	            _this.m_tag = null;
	            _this.clname = new Array();
	            _this.m_parent = null;
	            _this.child = new Array();
	            _this.m_style = new mofron.util.Style(_this);
	            _this.m_attr = {};
	            _this.m_text = null;
	            _this.value = null;
	            _this.entity = null;

	            _this.tag(tg);
	            if (null !== _this.comp) {
	                _this.attr('component', _this.comp.name());
	            }
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	                    this.id = mofron.func.getId();
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
	                        this.getDom().setAttribute(key, val);
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
	         * @param upd : (boolean) update flag
	         */

	    }, {
	        key: 'pushDom',
	        value: function pushDom(tgt, upd) {
	            try {
	                var _upd = undefined === upd ? false : upd;
	                if ('boolean' !== typeof _upd) {
	                    throw new Error('invalid parameter');
	                }

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

	                if (false === _upd) {
	                    tgt_dom.insertAdjacentHTML('beforeend', this.getValue());
	                } else {
	                    tgt_dom.innerHTML = this.getValue();
	                }
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
	}(mofron.Base);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file Style.js
	 * @author simpart
	 */

	/**
	 * @class Style
	 * @brief component style class
	 */
	mofron.util.Style = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    /**
	     * initialize member
	     *
	     * @param tgt : (object) target vdom object
	     */
	    function _class(tgt) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Style');

	            var _tgt = tgt === undefined ? null : tgt;
	            if (null !== _tgt && 'object' !== (typeof _tgt === 'undefined' ? 'undefined' : _typeof(_tgt))) {
	                throw new Error('invalid parameter');
	            }
	            _this.target = _tgt;
	            _this.m_protect = false;
	            _this.conts = {};
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	                        this.target.getDom().style[mofron.func.getCamelStyle(key)] = _val;
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
	    }]);

	    return _class;
	}(mofron.Base);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file  Color.js
	 * @author simpart
	 */

	/**
	 * @class Color
	 * @brief Color Defined Class
	 */
	mofron.util.Color = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

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
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Color');

	            var _r = r === undefined ? null : r;
	            var _g = g === undefined ? null : g;
	            var _b = b === undefined ? null : b;
	            var _a = a === undefined ? 1 : a;

	            if (null === _r && null === _g && null === _b) {} else if (null !== _r && null !== _g && null !== _b) {
	                if ('number' !== typeof _r || 'number' !== typeof _g || 'number' !== typeof _b) {
	                    throw new Error('invalid parameter');
	                }
	            } else {
	                throw new Error('invalid parameter');
	            }
	            _this.red = _r;
	            _this.green = _g;
	            _this.blue = _b;
	            if ('number' !== typeof _a) {
	                throw new Error('invalid parameter');
	            }
	            _this.alpha = _a;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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


	    _createClass(_class, [{
	        key: 'getRgba',
	        value: function getRgba() {
	            try {
	                return new Array(null === this.red ? 0 : this.red, null === this.green ? 0 : this.green, null === this.blue ? 0 : this.blue, null === this.alpha ? 0 : this.alpha);
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
	}(mofron.Base);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file  Font.js
	 * @author simpart
	 */

	/**
	 * @class Font
	 * @brief Font Defined Class
	 */
	mofron.util.Font = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    /**
	     * initialize font
	     *
	     * @param fnt : (string) font name
	     */
	    function _class(fnt, pth) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Font');

	            /* check parameter */
	            var _pth = pth === undefined ? null : pth;
	            if ('string' !== typeof fnt) {
	                throw new Error('invalid parameter');
	            }

	            /* initialize member */
	            _this.m_family = {};
	            _this.size = 15;
	            _this.thm_sel = 'mofron-theme-' + mofron.func.getId(_this);
	            _this.thm_flg = false;

	            /* initialize function */
	            _this.addFamily(fnt);
	            if (null !== _pth) {
	                _this.setFace(fnt, _pth);
	            }
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
	    }

	    /**
	     * set @font-face
	     * 
	     * @param fnt : (string) font name
	     * @param pth : (string) path to font file
	     */


	    _createClass(_class, [{
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
	                hc.addConts(mofron.func.getStyleConts('@font-face', style));
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
	                hc.addConts(mofron.func.getStyleConts('.' + this.thm_sel, style));
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
	}(mofron.Base);

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file HeadConts.js
	 *
	 */

	mofron.util.HeadConts = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    function _class(tag) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('HeadConts');

	            if ('string' != typeof tag) {
	                throw new Error('invalid parameter');
	            }
	            _this.tag = tag;
	            _this.attr = {};
	            _this.conts = '';
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	}(mofron.Base);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file theme.js
	 * @author simpart
	 */

	/**
	 * @class mofron.theme
	 * @brief Theme Defined Class
	 */
	mofron.util.Theme = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    /**
	     * initialize member
	     */
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Theme');
	            _this.conts = {};
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	                        if (null === thm_cnt[cnt_key][parseInt(idx)]) {
	                            continue;
	                        }
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
	                if (null === _fnt || 'object' !== (typeof _fnt === 'undefined' ? 'undefined' : _typeof(_fnt)) || 'Font' !== _fnt.name()) {
	                    throw new Error('invalid parameter');
	                }

	                _fnt.pushTheme();
	                this.set(_fnt.name(), _fnt, _idx);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getFont',
	        value: function getFont(idx) {
	            try {
	                var _idx = idx === undefined ? 0 : idx;
	                return this.get('Font', _idx);
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
	                if (null === _clr || 'object' !== (typeof _clr === 'undefined' ? 'undefined' : _typeof(_clr)) || 'Color' !== _clr.name()) {
	                    throw new Error('invalid parameter');
	                }

	                this.set(_clr.name(), _clr, _idx);
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'getColor',
	        value: function getColor(idx) {
	            try {
	                var _idx = idx === undefined ? 0 : idx;
	                return this.get('Color', _idx);
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

	                var loop = 0;
	                for (; loop < 10; loop++) {
	                    if (_idx === this.conts[_key].length) {
	                        this.conts[_key].push(_val);
	                        return;
	                    } else if (_idx < this.conts[_key].length) {
	                        this.conts[_key][_idx] = val;
	                        return;
	                    } else {
	                        this.conts[_key].push(null);
	                    }
	                }
	                throw new Error('invalid parameter');
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
	}(mofron.Base);

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file   component.js
	 * @author simpart
	 */

	/**
	 * @class Base
	 * @brief base component class
	 */
	mofron.Component = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    /**
	     * initialize member, vdom
	     *
	     * @param prm : (object) initialize parameter (option)
	     * @note parameter syntax -> [prm] | [opt] | prm, opt
	     */
	    function _class(prm) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Base');

	            /* initialize member */
	            _this.m_parent = null;
	            _this.child = new Array();
	            _this.event = new Array();
	            _this.layout = new Array();
	            _this.m_style = new mofron.util.Vdom('div');
	            _this.m_vdom = null;
	            _this.m_target = null;
	            _this.m_theme = new mofron.util.Theme();
	            _this.param = prm === undefined ? null : prm;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	                if (null === this.m_vdom) {
	                    return false;
	                }
	                return this.vdom().isRendered();
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'target',
	        value: function target(tgt) {
	            try {
	                if (undefined === tgt) {
	                    return this.m_target;
	                }
	                if (null === tgt || 'object' !== (typeof tgt === 'undefined' ? 'undefined' : _typeof(tgt))) {
	                    throw new Error('invalid parameter');
	                }
	                this.m_target = tgt;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }

	        /**
	         * get style target vdom
	         *console.error(e.stack);
	                throw e;
	         * @return (object) vdom object
	         */

	    }, {
	        key: 'getStyleTgt',
	        value: function getStyleTgt() {
	            try {
	                return this.target();
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
	                return this.target();
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
	                if (null !== this.vdom() && false === this.isRendered()) {
	                    //this.child.push([chd, disp]);
	                    var set_flg = false;
	                    for (var chd_idx in this.child) {
	                        if (false === this.child[chd_idx][2]) {
	                            this.child.splice(chd_idx - 1, 0, [chd, disp, true]);
	                            set_flg = true;
	                            break;
	                        }
	                    }
	                    if (false === set_flg) {
	                        this.child.push([chd, disp, true]);
	                    }
	                } else {
	                    this.child.push([chd, disp, false]);
	                }
	                /* set theme to child */
	                chd.theme(this.m_theme);

	                /* init child */
	                if (true === this.isRendered()) {
	                    chd.render(_disp);
	                    for (var idx in this.layout) {
	                        this.layout[idx].layout();
	                    }
	                }
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
	                    var ret_val = new Array();
	                    for (var ret_idx in this.child) {
	                        ret_val.push(this.child[ret_idx][0]);
	                    }
	                    return ret_val;
	                }
	                if (0 > _idx || this.child.length - 1 < _idx) {
	                    throw new Error('invalid parameter');
	                }
	                return this.child[_idx][0];
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

	                var tgt = null;
	                if (null === this.getStyleTgt()) {
	                    tgt = this.m_style;
	                } else {
	                    tgt = this.getStyleTgt();
	                }

	                if (null === _key && null === _val) {
	                    /* getter */
	                    return tgt.style().get();
	                } else if (null !== _key && undefined === val) {
	                    /* getter */
	                    return tgt.style(_key);
	                } else if (null !== _key && undefined !== _val) {
	                    /* setter */
	                    tgt.style(_key, _val);
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
	    }, {
	        key: 'setEffect',
	        value: function setEffect(eff, flg) {
	            try {
	                var _eff = undefined === eff ? null : eff;
	                var _flg = undefined === flg ? true : flg;
	                if (null === _eff) {
	                    throw new Error('invalid parameter');
	                }
	                _eff.setTarget(this);
	                _eff.effect(_flg);
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
	                var chdlen = this.getChild();
	                for (var idx in chdlen) {
	                    chdlen[idx].theme(_thm);
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
	        key: 'render',
	        value: function render(disp) {
	            try {
	                if (null !== this.vdom()) {
	                    throw new Error('detect duplex render');
	                }
	                /* initialize component contents */
	                this.initDomContsCtl();

	                /* setting component visible */
	                if (false === disp) {
	                    this.vdom().style('display', 'none');
	                }

	                /* push contents to DOM */
	                var init_tgt = null;
	                if (null === this.parent()) {
	                    mofron.root.push(this);
	                } else {
	                    init_tgt = this.parent().target();
	                }
	                this.vdom().pushDom(init_tgt);

	                this.setCompConf();

	                //this.state('rendered');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'setCompConf',
	        value: function setCompConf() {
	            try {
	                /* set event config */
	                for (var idx in this.event) {
	                    this.event[idx].event();
	                }

	                /* set layout config */
	                for (var idx in this.layout) {
	                    this.layout[idx].layout();
	                }

	                /* set child config */
	                for (var chd_idx in this.child) {
	                    this.child[chd_idx][0].setCompConf();
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            try {} catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            try {
	                this.vdom().getDom().innerHTML = null;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initDomContsCtl',
	        value: function initDomContsCtl() {
	            try {
	                if (null !== this.vdom()) {
	                    return;
	                }
	                this.vdom(new mofron.util.Vdom('div', this));
	                this.initDomConts(this.param);

	                for (var chd_idx in this.child) {
	                    /* initialize DOM contents */
	                    this.child[chd_idx][0].initDomContsCtl();
	                    /* setting visible of child component */
	                    if (false === this.child[chd_idx][1]) {
	                        this.child[chd_idx][0].vdom().style('display', 'none');
	                    }
	                    /* setting parent-child relation */
	                    this.target().addChild(this.child[chd_idx][0].vdom());
	                }

	                var sty_buf = this.m_style.style().get();
	                for (var sty_idx in sty_buf) {
	                    this.style(sty_idx, sty_buf[sty_idx]);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initDomConts',
	        value: function initDomConts(prm) {
	            try {
	                this.target(this.vdom());
	            } catch (e) {
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
	                    var disp = this.vdom().style('display');
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
	                if (null === this.vdom()) {
	                    this.render(_flg);
	                }

	                /* set effect */
	                if (null != _eff) {
	                    _eff.speed(0.5);
	                    _eff.setVisible(true);
	                    this.setEffect(_eff, _flg);
	                } else {
	                    if (true === _flg) {
	                        this.vdom().style('display', null);
	                    } else {
	                        this.vdom().style('display', 'none');
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
	        key: 'vdom',
	        value: function vdom(vd) {
	            try {
	                if (undefined === vd) {
	                    return this.m_vdom;
	                }

	                if ('object' !== (typeof vd === 'undefined' ? 'undefined' : _typeof(vd))) {
	                    throw new Error('invalid parameter : ' + (typeof vd === 'undefined' ? 'undefined' : _typeof(vd)));
	                }
	                this.m_vdom = vd;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}(mofron.Base);

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file layout/Base.js
	 * @brief Base class of layout
	 */

	mofron.Layout = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Layout');
	            _this.target = null;
	            _this.exec_cnt = 0;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	                    this.layoutConts(idx, tgt_chd[idx]);
	                    this.exec_cnt++;
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'layoutConts',
	        value: function layoutConts(idx, tgt) {
	            try {
	                console.warn('layout is not implements');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}(mofron.Base);

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file event.js
	 * @author simpart
	 */

	/**
	 * @class mofron.event.Base
	 * @brief base class of event
	 */
	mofron.Event = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    /**
	     * initialize member
	     *
	     * @param fnc : (option) function for event listener
	     * @param prm : (option) function parameter
	     */
	    function _class(fnc, prm) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.setBaseName('Event');
	            _this.name('Event');
	            var _fnc = fnc === undefined ? null : fnc;
	            _this.target = null;
	            _this.func = null;
	            _this.parm = null;
	            if (null !== _fnc) {
	                _this.setEventFunc(_fnc, prm);
	            }
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
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
	                if (null === comp || 'object' !== (typeof comp === 'undefined' ? 'undefined' : _typeof(comp))) {
	                    throw new Error('invalid parameter');
	                }
	                this.target = comp;
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
	                this.target = this.target.getEventTgt();
	                this.eventConts();
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
	        key: 'eventConts',
	        value: function eventConts() {
	            try {
	                console.warn('not implement');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}(mofron.Base);

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file effect/Base.js
	 */

	mofron.Effect = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    function _class(prm) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Effect');
	            _this.param = undefined === prm ? null : prm;
	            _this.target = null;
	            _this.tgt_vd = null;
	            _this.m_speed = 0;
	            _this.v_flg = false;
	            _this.exec = false;
	            _this.callback = new Array(null, null);
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
	    }

	    _createClass(_class, [{
	        key: 'setVisible',
	        value: function setVisible(flg) {
	            try {
	                if ('boolean' !== typeof flg) {
	                    throw new Error('invalid parameter');
	                }
	                this.v_flg = flg;
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
	                this.target = tgt;
	                this.tgt_vd = tgt.vdom();
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

	                if (0 === this.speed()) {
	                    this.effectConts(_flg, this);
	                } else {
	                    if (false === this.target.isRendered()) {
	                        throw new Error('target is not ready');
	                    }
	                    if (false === this.exec) {
	                        this.exec = true;
	                        this.initEffect(_flg, this);
	                        this.tgt_vd.style('-webkit-transition', 1000 * this.speed() - 200 + 'ms all linear 0s');
	                        this.tgt_vd.style('-moz-transition', 'all ' + (1000 * this.speed() - 200) + 'ms');
	                        this.tgt_vd.style('-ms-transition', 'all ' + (1000 * this.speed() - 200) + 'ms');
	                        this.tgt_vd.style('-o-transition', 'all ' + (1000 * this.speed() - 200) + 'ms');
	                        this.tgt_vd.style('transtion', 1000 * this.speed() - 200 + 'ms all linear 0s');
	                    }

	                    setTimeout(this.effectConts, 200, _flg, this);
	                }

	                if (null != this.callback[0]) {
	                    setTimeout(this.callback[0], 1000 * this.speed() - 200, this.callback[1]);
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initEffect',
	        value: function initEffect(flg) {}
	    }, {
	        key: 'effectConts',
	        value: function effectConts(flg) {}
	    }, {
	        key: 'speed',
	        value: function speed(spd) {
	            try {
	                if (undefined === spd) {
	                    return this.m_speed;
	                }
	                if ('number' != typeof spd) {
	                    throw new Error('invalid parameter');
	                }
	                if (spd < 0.5) {
	                    this.m_speed = 0;
	                } else {
	                    this.m_speed = spd;
	                }
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
	}(mofron.Base);

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * @file template.js
	 */

	mofron.Template = function (_mofron$Base) {
	    _inherits(_class, _mofron$Base);

	    function _class(prm) {
	        _classCallCheck(this, _class);

	        try {
	            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

	            _this.name('Template');
	            /* initialize member */
	            _this.base = new mofron.Component();
	            _this.param = prm === undefined ? null : prm;
	            _this.m_title = null;
	            _this.m_theme = null;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	        return _this;
	    }

	    _createClass(_class, [{
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
	        key: 'initTmplConts',
	        value: function initTmplConts(prm) {
	            try {
	                console.log('not implements');
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'visible',
	        value: function visible(flg, eff) {
	            try {
	                if (undefined === flg && undefined === eff) {
	                    return this.base.visible();
	                }
	                var _eff = eff === undefined ? null : eff;
	                if (false === this.base.isRendered()) {
	                    this.initTmplConts(this.param);
	                }
	                this.base.visible(true, _eff);
	                this.base.vdom().attr('template', this.name());
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }]);

	    return _class;
	}(mofron.Base);

/***/ }
/******/ ]);