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
            
            if (undefined !== prm_opt) {
                this.prmOpt(prm_opt);
                this.vdom();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** method ***/
    
    name (nm) {
        try {
            if (undefined === nm) {
                this.vdom();
                return super.name();
            }
            super.name(nm);
            if ((undefined !== this.m_vdom) && (null !== this.m_vdom)) {
                var cmp_atr = this.vdom().attr('component');
                var set_nm  = null;
                if (null !== cmp_atr) {
                    if ('i' !== 'I'.toLowerCase()) {
                        set_nm = nm.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);});
                    } else {
                        set_nm = nm.toLowerCase();
                    }
                    this.vdom().attr({'component' : cmp_atr + '-' + set_nm});
                }
            }
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
            this.vdom();
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
     * @return (array) : childlen object
     */
    child (chd) {
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
            if ('object' !== typeof chd) {
                throw new Error('invalid parameter');
            }
            
            if (undefined !== chd[0]) {
                /* set child array */
                for (var idx in chd) {
                    this.addChild(
                        (true === mofron.func.isInclude(chd[idx], 'Component')) ? chd[idx] : chd[idx][0],
                        (true === mofron.func.isInclude(chd[idx], 'Component')) ? true : chd[idx][1]
                    );
                }
                return;
            }
            
            this.addChild(chd, disp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp, idx) {
        try {
            if (false === mofron.func.isInclude(chd, 'Component')) {
                throw new Error('invalid parameter');
            }
            
            /* setting parent-child relation */
            chd.parent(this);  // child's parent is me
            this.target().addChild(chd.vdom(), idx);
            if ( (undefined === idx) ||
                 (0 === this.child().length) ) {
                this.m_child.push([chd, disp]);
            } else {
                this.m_child.splice(idx,0,[chd, disp]);
            }

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
    
    updChild (o_chd, n_chd) {
        try {
            if ( (false  === mofron.func.isInclude(o_chd, 'Component')) ||
                 (false  === mofron.func.isInclude(n_chd, 'Component')) ) {
                throw new Error('invalid parameter');
            }
            
            /* search index of old-child */
            var chd     = this.child();
            var upd_idx = null;
            for (var chd_idx in chd) {
                if (chd[chd_idx].vdom().getId() === o_chd.vdom().getId()) {
                    upd_idx = chd_idx;
                    break;
                }
            }
            if (null === upd_idx) {
                throw new Error('invalid parameter');
            }
            
            /* replace child */
            var upd_disp = this.m_child[upd_idx][1];
            this.m_child[upd_idx][0].destroy();
            this.addChild(n_chd, upd_disp, upd_idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /* for destroy */
    delChild (idx) {
        try {
            if ( ('number'  !== typeof idx) ||
                 (undefined === this.child()[idx]) ) {
                throw new Error('invalid parameter');
            }
            this.m_child.splice(idx, 1);
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
                return (undefined === this.m_parent) ? null : this.m_parent;
            }
            if ((null !== pnt) && (false === mofron.func.isInclude(pnt, 'Component'))) {
                throw new Error('invalid parameter');
            }
            
            if ( (undefined !== pnt) &&
                 (null      !== pnt) &&
                 (null      !== this.parent()) ) {
                /* rewrite parent */
                var chd = this.parent().child(); // children from parent
                for (var idx in chd) {
                    if (chd[idx].vdom().getId() === this.vdom().getId()) {
                        this.parent().child()[parseInt(idx)].destroy();
                    }
                }
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
     * @param kv (object) 
     * @param los (boolean) loose flag
     * @return (object) style object
     */
    style (kv, los) {
        try {
            if ( ('string'  === typeof kv) ||
                 (undefined === kv) ) {
                /* getter */
                return this.styleTgt().style(kv);
            }
            /* setter */
            this.styleTgt().style(kv, los);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event (evt) {
        try {
            var ret_evt = this.config(2, evt);
            if (undefined === evt) {
                var ret = [];
                for (var idx in ret_evt) {
                    ret.push(ret_evt[idx][0]);
                }
                return ret;
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
            this.addConfig(2, evt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (lo) {
        try {
            var ret_lo = this.config(0, lo);
            if (undefined === lo) {
                var ret = [];
                for (var idx in ret_lo) {
                    ret.push(ret_lo[idx][0]);
                }
                return ret;
            }
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
                        ((undefined === prm) || (undefined === prm[cnf_idx])) ? undefined : prm[cnf_idx]
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
                if (undefined === this.m_theme) { 
                    this.m_theme = new mofron.Theme();
                    this.m_theme.target(this);
                }
                return this.m_theme;
            }
            /* setter */
            this.theme().setTheme(thm);
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].theme(thm);
            }
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
                this.vdom().style({'display' : 'none'});
            }
            for (var idx in this.m_child) {
                if (false === this.m_child[idx][1]) {
                    this.child()[idx].vdom().style({'display' : 'none'});
                }
            }
            
            /* push contents to DOM */
            if (null === this.parent()) {
                mofron.root.push(this);
            }
            
            /* before push event */
            this.beforeRender();
            
            this.vdom().pushDom(
                (null === this.parent()) ? null : this.parent().target()
            );
            
            /* after push event */
            this.afterRender();
            
            /* set child config */
            this.initConfig();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].beforeRender();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    afterRender () {
        try {
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].afterRender();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConfig () {
        try {
            /* set child config */
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].initConfig();
            }

            /* set config */
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
            /* delete dom */
            this.vdom().destroy();
            
            /* delete own object in parent */
            if (null !== this.parent()) {
               var chd = this.parent().child(); // children from parent
               for (var idx in chd) {
                   if (chd[idx].vdom().getId() === this.vdom().getId()) {
                       this.parent().delChild(parseInt(idx));
                       break;
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
            for (var idx in this.chd) {
                chd[idx].initDomContsCtl();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts(prm) {
        try {
            this.vdom().addChild(
                new mofron.Dom(('string' === typeof prm) ? prm : 'div',this)
            );
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
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            
            /* initialize component */
            if (false === this.vdom().isPushed()) {
                this.render(flg);
            }
            
            if ( (undefined !== eff) &&
                 (true      === mofron.func.isInclude(eff, 'Effect')) ) {
                /* set effect */
                eff.speed( (0 === eff.speed()) ? 0.5 : eff.speed());
                this.addEffect(eff, flg);
            } else {
                if (true === flg) {
                    this.vdom().style(
                        {'display' : null},
                        ('none' === this.vdom().style('display')) ? undefined : true
                    );
                } else {
                    this.vdom().style({'display' : 'none'});
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
