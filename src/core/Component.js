/**
 * @file   Component.js
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
     * @param prm_opt : (object) component parameter / option (not require)
     */
    constructor (prm_opt) {
        try {
            super();
            this.name('Base');
            
            /* initialize member */
            this.m_parent = null;
            this.m_child  = new Array();
            this.m_event  = new Array();
            this.m_layout = new Array();
            this.m_style  = new mofron.Dom();
            this.m_vdom   = null;
            this.m_target = new Array(
                                null, /* child target */
                                null, /* style target */
                                null  /* event target */
                            );
            this.m_theme  = new mofron.Theme();
            this.prmOpt(prm_opt);
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
    
    /**
     * child target setter / getter
     * 
     * @param tgt : (object) dom/vdom object
     * @param idx : (number) set index
     * @return (object) dom/vdom object
     */
    target (tgt, idx) {
        try {
            var _idx = (undefined === idx) ? 0 : idx;
            if (undefined === tgt) {
                /* getter */
                return this.m_target[_idx];
            }
            /* setter */
            if ((null === tgt) || ('object' !== typeof tgt)) {
                throw new Error('invalid parameter');
            }
            this.m_target[_idx] = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get style target vdom
     *
     * @param tgt : (object) dom/vdom object
     * @return (object) dom/vdom object
     */
    styleTgt (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                if (null === this.m_target[1]) {
                    if (null === this.target()) {
                        return null;
                    }
                    this.target(this.target(),1);
                }
                return this.m_target[1];
            }
            /* setter */
            this.target(tgt,1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get event target vdom
     *
     * @param tgt : (object) dom/vdom object
     * @return (object) dom/vdom object
     */
    eventTgt (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                if (this.target().getId() === this.vdom().getId()) {
                    this.target(this.vdom().child()[0], 2);
                } else if (null === this.m_target[2]) {
                    return this.target();
                }
                return this.m_target[2];
            }
            /* setter */
            return this.target(tgt, 2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * child component setter / getter
     * 
     * @param chd : (object) child component
     * @param chd : (object) child component array
     * @paran disp : (boolean) child display flag
     * @return (array) : childlen object
     */
    child (chd, disp) {
        try {
            if (undefined === chd) {
                /* getter */
                var ret_val = new Array();
                for (var idx in this.m_child) {
                    ret_val.push(this.m_child[idx][0]);
                }
                return ret_val;
            }
            
            /* setter */
            this.addChild(chd, disp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp) {
        try {
            var _disp  = (disp === undefined) ? true : disp;
            if ('object' !== typeof chd) {
                throw new Error('invalid parameter');
            }
            
            if (undefined !== chd[0]) {
                /* set child array */
                for (var idx in chd) {
                    this.addChild(chd[idx], disp);
                }
                return;
            }
            
            chd.parent(this);  // child's parent is me
            if ((null !== this.vdom()) && (false === this.isRendered())) {
                /* this component is initialize DOM contents state */
                var set_flg = false;
                for (var chd_idx in this.m_child) {
                    if (false === this.m_child[chd_idx][2]) {
                        this.m_child.splice(chd_idx-1,0,[chd, disp, true]);
                        set_flg = true;
                        break;
                    }
                }
                if (false === set_flg) {
                    this.m_child.push([chd, disp, true]);
                }
            } else {
                this.m_child.push([chd, disp, false]);
            }
            /* set theme to child */
            chd.theme(this.m_theme);

            /* init child */
            if (true === this.isRendered()) {
                chd.render(_disp);
                for(var idx in this.m_layout) {
                    this.m_layout[idx].layout();
                }
            }
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
            if (null === this.styleTgt()) {
                tgt = this.m_style;
            } else {
                tgt = this.styleTgt();
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
    
    event (evt) {
        try {
            if (undefined === evt) {
                /* getter */
                return this.m_event;
            }
            /* setter */
            this.addEvent(evt);
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
            if (undefined !== evt[0]) {
                /* set child array */
                for (var idx in evt) {
                    this.addEvent(evt[idx]);
                }
                return;
            }
            
            if ('object' !== (typeof evt)) {
                throw new Error('invalid parameter');
            }
            this.m_event.push(evt);
            evt.target(this);
            if (true === this.isRendered()) {
                evt.event();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (lo) {
        try {
            if (undefined === evt) {
                /* getter */
                return this.m_layout;
            }
            /* setter */
            this.addLayout(lo);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add component layout
     *
     * @param lo : (object) layout object
     */
    addLayout (lo) {
        try {
            if (undefined !== lo[0]) {
                /* set child array */
                for (var idx in lo) {
                    this.addLayout(lo[idx]);
                }
                return;
            }
            
            if ( (undefined === lo) ||
                 (null      === lo) ||
                 ('object'  !== (typeof lo)) ) {
                throw new Error('invalid parameter');
            }
            this.m_layout.push(lo);
            lo.target(this);
            
            if (true === this.isRendered()) {
                lo.layout();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (eff, flg) {
        try {
            var _eff = (undefined === eff) ? null : eff;
            var _flg = (undefined === flg) ? true : flg;
            if (null === _eff) {
                throw new Error('invalid parameter');
            }
            _eff.target(this);
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
            var chdlen = this.child();
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
            this.rendered();
            this.initConfig();
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rendered () {}
    
    initConfig () {
        try {
            /* set event config */
            for (var idx in this.m_event) {
                this.m_event[idx].event();
            }
            
            /* set layout config */
            for (var idx in this.m_layout) {
                this.m_layout[idx].layout();
            }
            
            /* set child config */
            for (var chd_idx in this.m_child) {
                this.m_child[chd_idx][0].initConfig();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
            if (false === this.isRendered()) {
                throw new Error('not render yet');
            }
            var del_tgt = this.vdom().child();
            for (var idx_del in del_tgt) {
                del_tgt[idx_del].getRawDom().remove();
            }
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
            this.vdom(new mofron.Vdom());
            this.initDomConts(this.m_param);
            
            for (var chd_idx in this.m_child) {
                /* initialize DOM contents */
                this.m_child[chd_idx][0].initDomContsCtl();
                /* setting visible of child component */
                if (false === this.m_child[chd_idx][1]) {
                    this.m_child[chd_idx][0].vdom().style('display', 'none');
                }
                /* setting parent-child relation */
                this.target().addChild(this.m_child[chd_idx][0].vdom());
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
            this.vdom().addChild(new mofron.Dom('div',this));
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
                /* getter */
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
                this.effect(_eff, _flg);
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
     * virtual dom setter / getter
     * 
     * @return (object) vdom object
     */
    vdom (vd) {
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
