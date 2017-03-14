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
            this.name('Component');
            
            /* initialize member */
            this.m_parent = null;
            this.m_child  = new Array();
            this.m_vdom   = null;
            this.m_conf   = new Array(
                                new Array(), /* layout */
                                new Array(), /* effect */
                                new Array()  /* event */
                            );
            this.m_target = new Array(
                                null,        /* child */
                                null,        /* style */
                                null         /* event */
                            );
            this.m_theme  = null;
            
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** method ***/
    
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
                if ( (0 === _idx) && (null === this.m_target[_idx]) ) {
                    if (0 === this.vdom().child().length) {
                        return null;
                    }
                    this.target(this.vdom().child()[0]);
                }
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
                return this.m_child;
            }
            /* setter */
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
            
            this.addChild(chd, disp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp) {
        try {
            if (false === mofron.func.isInclude(chd, 'Component')) {
                throw new Error('invalid parameter');
            }
            
            chd.parent(this);  // child's parent is me
            this.child().push(chd, disp);
            
            /* set theme to child */
            chd.theme(this.theme());
            
            /* init child */
            if (true === this.vdom().isPushed()) {
                chd.render(disp);
                for(var idx in this.m_layout) {
                    this.m_layout[idx].layout();
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delChild (idx) {
        try {
            if ( ('number'  !== typeof idx) ||
                 (undefined === this.child()[idx])) {
                throw new Error('invalid parameter');
            }
            this.splice(idx, 1);
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
     * @param los (boolean) loose flag
     * @return (object) style object
     * @note parameter syntax
     *         key     : get style value of key
     *         key,val : set style value of key
     *         (none)  : get style object
     */
    style (key, val, los) {
        try {
            if (undefined === val) {
                /* getter */
                return (undefined === key) ? this.styleTgt().style() : this.styleTgt().style(key);
            }
            /* setter */
            if ('object' === typeof key) {
                mofron.func.keyValSetter(this, 'style', key);
                return;
            }
            this.styleTgt().style(key, val, los);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event (evt) {
        try {
            return this.config(2, evt);
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
            this.addConfig(2, evt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (lo) {
        try {
            return this.config(0, lo);
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
            this.addConfig(0, lo);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (eff, flg) {
        try {
            return this.config(1, eff, flg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addEffect (eff, flg) {
        try {
            this.addConfig(1, eff, flg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    config (idx, cnf, prm) {
        try {
            if (undefined === cnf) {
                /* getter */
                return (undefined === this.m_conf[idx]) ? null : this.m_conf[idx];
            }
            /* setter */
            if ('object' !== typeof cnf) {
                throw new Error('invalid parameter');
            }
            if (undefined !== cnf[0]) {
                for (var cnf_idx in cnf) {
                    /* set child array */
                    this.addConfig(
                        idx,
                        cnf[cnf_idx],
                        (undefined === prm[cnf_idx]) ? null : prm[cnf_idx]
                    );
                }
                return;
            }
            
            this.addConfig(idx, cnf, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addConfig (idx, cnf, prm) {
        try {
            if ( (undefined === this.m_conf[idx]) ||
                 (false     === mofron.func.isInclude(cnf, 'CompConf')) ) {
                throw new Error('invalid parameter');
            }
            this.m_conf[idx].push(new Array(cnf, prm));
            cnf.target(this);
            if (true === this.vdom().isPushed()) {
                cnf.execute(prm);
            }
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
            if (undefined === thm) {
                /* getter */
                if (null === this.m_theme) { 
                    this.m_theme = new mofron.Theme();
                }
                return this.m_theme;
            }
            /* setter */
            this.theme().setTheme(thm);
            var chdlen = this.child();
            for (var idx in chdlen) {
                chdlen[idx].theme(thm);
            }
            
            this.themeConts();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    themeConts () {}
    
    /**
     * create componrnt DOM
     * 
     * @param disp (bool) : initial visible flag. default is true
     */
    render (disp) {
        try {
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
            /* set child config */
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].initConfig();
            }
            
            for (var idx_1 in this.m_conf) {
                for (var idx_2 in this.m_conf[idx_1]) {
                    this.m_conf[idx_1][idx_2][0].execute(this.m_conf[idx_1][idx_2][1]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
            if (null === this.m_vdom) {
                throw new Error('not initialized yet');
            }
            var del_tgt = this.vdom().child();
            for (var idx_del in del_tgt) {
                del_tgt[idx_del].getRawDom().remove();
            }
            if (null !== this.parent()) {
               var chd = this.parent().child();
               for (var idx in chd) {
                   if (chd[idx].getId() === this.getId()) {
                       chd[idx].delChild(idx);
                   }
               }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomContsCtl() {
        try {
            if (null === this.m_vdom) {
                this.vdom(new mofron.Vdom());
                this.initDomConts(this.m_param);
            }
            
            /* initialize child DOM contents */
            var chd     = this.child();
            var tgt_chd = this.target().child();
            var add_flg = true;
            for (var idx in this.chd) {
                chd[idx].initDomContsCtl();
                
                /* setting parent-child relation */
                for (var tgt_idx in tgt_chd) {
                    if (tgt_chd[tgt_idx].getId() === chd[idx].vdom().getId()) {
                        add_flg = false;
                        break;
                    }
                }
                if (true === add_flg) {
                    this.target().addChild(chd[idx].vdom());
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts(prm) {
        try {
            this.target(
                new mofron.Dom(('string' === typeof prm) ? prm : 'div',this)
            );
            this.vdom().addChild(this.target());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg, eff) {
        try  {
            if (undefined === flg) {
                /* getter */
                return  ( (null   === this.m_vdom) ||
                          ('none' === this.vdom().style('display')) ) ? false : true;
            }
            /* setter */
            if ( ('boolean' !== typeof flg) ) {
                throw new Error('invalid parameter');
            }
            
            /* initialize component */
            if (false === this.vdom().isPushed()) {
                this.render(flg);
            }
            
            if ( (undefined !== eff) &&
                 (true      === mofron.func.isObject(eff, 'Effect')) ) {
                /* set effect */
                eff.speed(1);
                this.execute(eff, flg);
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
                /* getter */
                if (null === this.m_vdom) {
                    this.initDomContsCtl();
                }
                return this.m_vdom;
            }
            /* setter */
            if (false === mofron.func.isInclude(vd, 'Dom')) {
                throw new Error('invalid parameter : ' + typeof vd);
            }
            this.m_vdom = vd;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
