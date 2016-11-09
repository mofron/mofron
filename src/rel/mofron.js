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

	"use strict";

	/*
	 * @file  mafron.js
	 * @autor simpart
	 */
	try {
	    if (typeof mofron === "undefined") {
	        var mofron = {
	            theme: null,
	            parts: {},
	            layout: {},
	            event: {},
	            effect: {},
	            appframe: {},
	            other: {},
	            rootConts: null,
	            useParts: null,
	            innerFunc: {}
	        };
	        mofron.innerFunc.getId = function () {
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
	                this.id = ret_id;
	                return ret_id;
	            } catch (e) {
	                console.error(e.stack);
	                throw new Error();
	            }
	        };
	        mofron.parts.Base = __webpack_require__(1);
	    } else {
	        throw new Error('mofron is already defined');
	    }
	} catch (e) {
	    console.error(e.stack);
	}
	/* end of file */

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @file   Component.js
	 * @brief  Base of UI Parts Class
	 * @author simpart
	 */

	module.exports = function () {
	    function _class() {
	        _classCallCheck(this, _class);

	        try {
	            this.id = null;
	            this.parent = null;
	            this.child = new Array();
	            this.event = new Array();
	            this.layout = new Array();
	            this.effect = new Array();
	            this.style = new Array(); //new mofron.other.Style(this);
	            this.theme = mofron.theme;
	            this.init_disp = true;
	            this.init_flg = false;
	        } catch (e) {
	            console.error(e.stack);
	            throw e;
	        }
	    }

	    /*** method ***/
	    /**
	     * get parts id
	     * 
	     * @return (string) id
	     */


	    _createClass(_class, [{
	        key: 'getId',
	        value: function getId() {
	            if (null != this.id) {
	                return this.id;
	            }
	            this.id = mofron.innerFunc.getId();
	            return this.id;
	        }
	    }, {
	        key: 'getTarget',
	        value: function getTarget() {
	            try {
	                return '#' + this.getId();
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
	                console.log('addChild : Components');

	                chd.parent = this;
	                this.child.push([chd, _disp]);
	                if (true === this.init_flg) {
	                    chd.init(_disp);
	                    for (var idx in this.layout) {
	                        this.layout[idx].layout(chd);
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'addEvent',
	        value: function addEvent(evt) {
	            try {
	                this.event.push(evt);
	                evt.setTarget(this);
	                if (true === this.init_flg) {
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
	                this.layout.push(lo);
	                lo.setTarget(this);
	                if (true === this.init_flg) {
	                    for (var idx in this.child) {
	                        lo.layout(this.child[idx][0]);
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'init',
	        value: function init(disp) {
	            try {
	                if (true === this.init_flg) {
	                    throw new Error('detect duplicate init');
	                }
	                var _disp = disp === undefined ? true : disp;

	                if (null === this.parent) {
	                    mofron.rootConts.addChild(this, _disp);
	                    return;
	                }

	                this.initConts(_disp);

	                /* set style */
	                for (var idx in this.style) {
	                    this.style[idx].setStyle();
	                }

	                /* set event */
	                for (var idx in this.event) {
	                    this.event[idx].event();
	                }

	                this.initChild(_disp);

	                this.init_flg = true;
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initConts',
	        value: function initConts(disp) {
	            try {
	                console.log('initConts : Component');

	                var tgt = null;
	                if ('RootConts' === this.parent) {
	                    tgt = 'body';
	                } else {
	                    tgt = this.parent.getTarget();
	                }
	                $(tgt).append('<div id="' + this.getId() + '"></div>');

	                if (false === disp) {
	                    var style = new mofron.other.Styles(this);
	                    style.style('display', 'none');
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'initChild',
	        value: function initChild(disp) {
	            try {
	                console.log('initChild : Component');

	                for (var idx in this.child) {
	                    if (false === this.child[idx][1]) {
	                        disp = false;
	                    }
	                    this.child[idx][0].init(disp);
	                    if (0 !== this.layout.length) {
	                        for (var lo_idx in this.layout) {
	                            this.layout[lo_idx].layout(this.child[idx][0]);
	                        }
	                    }
	                }
	            } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
	        }
	    }, {
	        key: 'visible',
	        value: function visible(flg, eff) {
	            try {
	                var p_eff = eff || null;

	                if ('boolean' != typeof flg) {
	                    throw new Error('invalid parameter');
	                }

	                if (null != p_eff) {
	                    if (false === flg) {
	                        p_eff.start(this);
	                    } else {
	                        p_eff.end(this);
	                    }
	                } else {
	                    if (false === flg) {
	                        $('#' + this.getId()).css('display', 'none');
	                    } else {
	                        $('#' + this.getId()).css('display', '');
	                    }
	                    // set child visible
	                    for (var idx in this.child) {
	                        if (true === this.child[idx][1]) {
	                            this.child[idx][0].visible(flg, p_eff);
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
	/* end of file */

/***/ }
/******/ ]);