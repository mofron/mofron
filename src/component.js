/**
 * @file   component.js
 * @author simpart
 */

/**
 * @class Base
 * @brief base component class
 */
mofron.comp.Base = class {
    
    /**
     * initialize member, vdom
     *
     * @param prm : (object) initialize parameter (option)
     * @param opt : (object) initialize option (option)
     * @note parameter syntax -> [prm] | [opt] | prm, opt
     */
    constructor (prm, opt) {
        try {
            /* initialize member */
            this.m_parent = null;
            this.child    = new Array();
            this.event    = new Array();
            this.layout   = new Array();
            this.vdom     = null;
            this.target   = null;
            this.m_style  = new mofron.util.Style();
            this.m_theme  = new mofron.Theme();
            this.init_flg = false;
            this.m_name   = 'Base';
            this.param    = new Array(null,null);
            
            /* parameter check */
            var _prm   = (prm === undefined) ? null : prm;
            var _opt   = (opt === undefined) ? null : opt;
            if ( (null !== _prm) &&
                 (null === _opt) ) {
                if ('object' === typeof _prm) {
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
            } else if ( (null === _prm) &&
                        (null !== _opt) ) {
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
    isRendered () {
        try {
            if (null === this.getVdom()) {
                return false;
            }
            return this.getVdom().isRendered();
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
    getTarget () {
        try {
            if (null !== this.target) {
                return this.target;
            }
            return this.getVdom();
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
    getStyleTgt () {
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
    getEventTgt () {
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
    addChild (chd, disp) {
        try {
            var _disp = (disp === undefined) ? true : disp;
            
            chd.parent(this);  // child's parent is me
            this.child.push(chd);
            
            /* set theme to child */
            chd.theme(this.m_theme);
            
            /* init child */
            if (true === this.isRendered ()) {
                chd.initDom(_disp);
                for(var idx in this.layout) {
                    this.layout[idx].layout();
                }
            }
            
            /* set default display of child */
            var chd_vdom = chd.getVdom();
            if (null === chd_vdom) {
                chd.initDomContsCtl();
                chd_vdom = chd.getVdom();
            }
            
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
    getChild (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                return this.child;
            }
            if ((0 > _idx) || ((this.child.length-1) < _idx)) {
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
    parent (pnt) {
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
    style(key, val) {
        try {
            var _key = (key === undefined) ? null : key;
            var _val = (val === undefined) ? null : val;
            
            if ( (null === _key) &&
                 (null === _val) ) {
                /* getter */
                return this.m_style.get();
            } else if ( (null      !== _key) &&
                        (undefined === val) ) {
                /* getter */
                return this.m_style.get(_key);
            } else if ( (null !== _key) &&
                        (null !== _val) ) {
                /* setter */
                this.m_style.set(_key, _val);
                if (true === this.isRendered()) {
                    this.getStyleTgt().style(_key, _val);
                }
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
    addEvent (evt) {
        try {
            if ('object' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            this.event.push(evt);
            if (null === this.vdom) {
                this.initDomContsCtl();
            }
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
    getEvent (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                return this.event;
            }
            
            if (('number' !== (typeof _idx)) ||
                (0 > _idx) || (this.event.length <= _idx)) {
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
    addLayout (lo) {
        try {
            if ( (undefined === lo) ||
                 (null      === lo) ||
                 ('object'  !== (typeof lo)) ) {
                throw new Error('invalid parameter');
            }
            this.layout.push(lo);
            if (null === this.vdom) {
                this.initDomContsCtl();
            }
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
    getLayout (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                return this.layout;
            }
            
            if (('number' !== (typeof _idx)) ||
                (0 > _idx) || (this.layout.length <= _idx)) {
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
    theme (thm) {
        try {
            var _thm = (thm === undefined) ? null : thm;
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
    initDom (disp) {
        try {
            if (true === this.init_flg) {
                 throw new Error('detect initDom duplex');
            }
            this.init_flg = true;
            /* set initialize target */
            if ( (null === this.m_parent) || 
                 (null === this.m_parent.getVdom()) ) {
                /* init vdom */
                this.m_style.protect(true);
                this.initDomContsCtl();
                this.m_style.protect(false);
                
                /* set style */
                this.getTarget().setStyle(this.style());
                
                var init_tgt = null;
                if (null === this.m_parent) {
                    mofron.root.push(this);
                } else {
                    init_tgt = this.m_parent.getTarget();
                }
                
                if (false === disp) {
                    this.vdom.style('display', 'none');
                }
                this.vdom.pushDom(init_tgt);
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
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomContsCtl() {
        try {
            if (null !== this.vdom) {
                return;
            }
            this.vdom = new mofron.util.Vdom('div', this);
            this.initDomConts(this.vdom,this.param[0]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts(vd, prm) {}
    
    afterInit () {}
    
    destroy () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg, eff) {
        try  {
            var _flg = (flg === undefined) ?  null : flg;
            var _eff = (eff === undefined) ?  null : eff;
            
            /* parameter check */
            if (null === _flg) {
                if (false === this.isRendered()) {
                    return false;
                }
                var disp = this.vdom.style('display');
                if ('none' === disp) {
                    return false;
                } else {
                    return true;
                }
            }
            
            if ( ('boolean' != (typeof _flg)) ||
                 ((null != _eff) && ('object'  != (typeof _eff))) ) {
                throw new Error('invalid parameter');
            }
            
            /* initialize component */
            if (false === this.init_flg) {
                this.initDom(_flg);
            }
            
            /* set effect */
            if (null != _eff) {
                eff.setTarget(this);
                eff.setCallback(
                    function(prm) {
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
                    },
                    [this.getVdom(),_flg]
                );
                
                _eff.effect(_flg);
            } else {
                if (true === _flg) {
                    this.vdom.style('display', null);
                } else {
                    this.vdom.style('display', 'none');
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
    getVdom() {
        try {
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
    name (nm) {
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
}
