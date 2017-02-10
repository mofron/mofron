/**
 * @file   component.js
 * @author simpart
 */

/**
 * @class Base
 * @brief base component class
 */
mofron.Component = class extends mofron.Base {
    
    /**
     * initialize member, vdom
     *
     * @param prm : (object) initialize parameter (option)
     * @note parameter syntax -> [prm] | [opt] | prm, opt
     */
    constructor (prm) {
        try {
            super();
            this.name('Base');
            
            /* initialize member */
            this.m_parent = null;
            this.child    = new Array();
            this.event    = new Array();
            this.layout   = new Array();
            this.m_style  = new mofron.util.Vdom('div');
            this.m_vdom   = null;
            this.m_target = null;
            this.m_theme  = new mofron.util.Theme();
            this.param    = (prm === undefined) ? null : prm;
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
            if (null === this.m_vdom) {
                return false;
            }
            return this.vdom().isRendered();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tgt) {
        try {
            if (undefined === tgt) {
                return this.m_target;
            }
            if ((null === tgt) || ('object' !== typeof tgt)) {
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
    getStyleTgt () {
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
    getEventTgt () {
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
    addChild (chd, disp) {
        try {
            var _disp  = (disp === undefined) ? true : disp;
            
            chd.parent(this);  // child's parent is me
            if ((null !== this.vdom()) && (false === this.isRendered())) {
                //this.child.push([chd, disp]);
                var set_flg = false;
                for (var chd_idx in this.child) {
                    if (false === this.child[chd_idx][2]) {
                        this.child.splice(chd_idx-1,0,[chd, disp, true]);
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
                for(var idx in this.layout) {
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
    getChild (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                var ret_val = new Array();
                for (var ret_idx in this.child) {
                    ret_val.push(this.child[ret_idx][0]);
                }
                return ret_val;
            }
            if ((0 > _idx) || ((this.child.length-1) < _idx)) {
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
    style (key, val) {
        try {
            var _key  = (key === undefined) ? null : key;
            var _val  = (val === undefined) ? null : val;
            
            var tgt   = null;
            if (null === this.getStyleTgt()) {
                tgt = this.m_style;
            } else {
                tgt = this.getStyleTgt();
            }
            
            if ( (null === _key) &&
                 (null === _val) ) {
                /* getter */
                return tgt.style().get();
            } else if ( (null      !== _key) &&
                        (undefined === val) ) {
                /* getter */
                return tgt.style(_key);
            } else if ( (null      !== _key) &&
                        (undefined !== _val) ) {
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
    addEvent (evt) {
        try {
            if ('object' !== (typeof evt)) {
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
    
    setEffect (eff, flg) {
        try {
            var _eff = (undefined === eff) ? null : eff;
            var _flg = (undefined === flg) ? true : flg;
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
    theme (thm) {
        try {
            var _thm = (thm === undefined) ? null : thm;
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
    render (disp) {
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
    
    setCompConf () {
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
    
    update () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
            this.vdom().getDom().innerHTML = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomContsCtl() {
        try {
            if (null !== this.vdom()) {
                return;
            }
            this.vdom(new mofron.util.Vdom('div',this));
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
    
    initDomConts(prm) {
        try {
            this.target(this.vdom());
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
                var disp = this.vdom().style('display');
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
    vdom(vd) {
        try {
            if (undefined === vd) {
                return this.m_vdom;
            }
            
            if ('object' !== typeof vd) {
                throw new Error('invalid parameter : ' + typeof vd);
            }
            this.m_vdom = vd;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
