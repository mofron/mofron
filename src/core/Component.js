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
     * initialize member, adom
     *
     * @param po : (object) component parameter / option (not require)
     */
    constructor (po) {
        try {
            super(po);
            this.name('Component');
            
            /* initialize member */
            this.m_child  = new Array();
            this.m_adom   = null;
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
            let opt = this.getOption();
            if ( (null !== opt) &&
                 (true === opt.visible) ) {
                this.visible(true);
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
                return super.name();
            }
            super.name(nm);
            if ((undefined !== this.m_adom) && (null !== this.m_adom)) {
                var cmp_atr = this.adom().attr('component');
                var set_nm  = null;
                if (null !== cmp_atr) {
                    if ('i' !== 'I'.toLowerCase()) {
                        set_nm = nm.replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);});
                    } else {
                        set_nm = nm.toLowerCase();
                    }
                    this.adom().attr({'component' : cmp_atr + '-' + set_nm});
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
     * @param tgt : (object) dom/adom object
     * @param idx : (number) set index
     * @return (object) dom/adom object
     */
    target (tgt, idx) {
        try {
            this.adom();
            var _idx = (undefined === idx) ? 0 : idx;
            if (undefined === tgt) {
                /* getter */
                if ( (0 === _idx) && (null === this.m_target[_idx]) ) {
                    if (0 === this.adom().child().length) {
                        return null;
                    }
                    this.target(this.adom().child()[0]);
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
     * get style target adom
     *
     * @param tgt : (object) dom/adom object
     * @return (object) dom/adom object
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
     * get event target adom
     *
     * @param tgt : (object) dom/adom object
     * @return (object) dom/adom object
     */
    eventTgt (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                if (this.target().getId() === this.adom().getId()) {
                    this.target(this.adom().child()[0], 2);
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
                this.adom();  // for before initDomConts()
                return this.m_child;
            }
            /* setter */
            if ('object' !== typeof chd) {
                throw new Error('invalid parameter');
            }
            
            let set_chd  = null;
            let set_disp = true;
            for (var idx in chd) {
                set_chd  = chd[idx];
                set_disp = true;
                if ( ('object' === typeof chd[idx]) &&
                     (false === mofron.func.isInclude(chd[idx], 'Component')) ) {
                    set_chd  = chd[idx][0];
                    set_disp = chd[idx][1];
                }
                this.addChild(set_chd, set_disp);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
            if (false === mofron.func.isInclude(chd, 'Component')) {
                throw new Error('invalid parameter');
            }
            
            /* configure child */
            chd.theme(
                (null === this.theme()) ? undefined : this.theme()
            );
            
            /* setting parent-child relation */
            chd.parent(this);     // child's parent is me
            
            if ( (undefined === idx) ||
                 (0 === this.m_child.length) ) {
                this.m_child.push(chd);
            } else {
                this.m_child.splice(idx, 0, chd);
            }
            
            if ( (null !== this.m_adom) &&
                 (this.adom().isPushed()) ) {
                /* render child */
                let lo = this.layout();
                for(var lo_idx in lo) {
                    lo[lo_idx].execute();
                }
                chd.render();
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
                if (chd[chd_idx].getId() === o_chd.getId()) {
                    upd_idx = chd_idx;
                    break;
                }
            }
            if (null === upd_idx) {
                throw new Error('invalid parameter');
            }
            
            let old_tgt = chd[upd_idx].adom().parent();
            let buf_tgt = this.target();
            
            /* replace child */
            var upd_disp = this.child()[upd_idx].visible();
            this.child()[upd_idx].destroy();
            
            this.target(old_tgt);
            this.addChild(n_chd, upd_disp, upd_idx);
            this.target(buf_tgt);
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
            
            if ( ( (null !== pnt) &&
                   (null !== this.parent()) )
                   ||
                 ( (null !== this.m_adom) &&
                   (true === this.target().isPushed()) ) ) {
                /* rewrite parent */
                this.destroy();
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
    
    getEffect (nm) {
        try {
            if ('string' !== typeof nm) {
                throw new Error('invalid parameter');
            }
            let eff  = this.effect();
            let name = null;
            for (let e_idx in eff) {
                name = eff[e_idx][0].name();
                if (nm === name) {
                    return eff[e_idx][0];
                }
            }
            return null;
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
            if (true === this.adom().isPushed()) {
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
                    this.m_theme = new mofron.Theme({});
                    this.m_theme.target(this);
                }
                return this.m_theme;
            }
            /* setter */
            this.theme().setTheme(thm);
            var chd = this.m_child;
            for (var idx in chd) {
                chd[idx].theme(thm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * create componrnt DOM
     * 
     */
    render () {
        try {
            /* push contents to DOM */
            if (null === this.parent()) {
                mofron.root.push(this);
            }
            
            /* before push event */
            this.beforeRender();
            
            /* set child config */
            this.initConfig('layout');
            this.initConfig('effect');
            
            this.adom().pushDom(
                (null === this.parent()) ? null : this.parent().target()
            );
            
            this.initConfig('event');
            
            /* after push event */
            this.afterRender();
            
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
    
    initConfig (tgt) {
        try {
            /* set child config */
            let chd = this.child();
            for (let idx in chd) {
                chd[idx].initConfig(tgt);
            }
            
            /* set config */
            if ('layout' === tgt) {
                let lo_lst = this.m_conf[0];
                for (let lo_idx in lo_lst) {
                    lo_lst[lo_idx][0].execute(
                        lo_lst[lo_idx][1]
                    );
                }
            } else if ('effect' === tgt) {
                let ef_lst = this.m_conf[1];
                for (let ef_idx in ef_lst) {
                    ef_lst[ef_idx][0].execute(
                        ef_lst[ef_idx][1]
                    );
                }
            } else if ('event' === tgt) {
                let ev_lst = this.m_conf[0];
                for (let ev_idx in ev_lst) {
                    ev_lst[ev_idx][0].execute(
                        ev_lst[ev_idx][1]
                    );
                }
            }
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
            if (null === this.m_adom) {
                throw new Error('not initialized yet');
            }
            /* delete dom */
            this.adom().destroy();
            
            /* delete own object in parent */
            if (null !== this.parent()) {
               var chd = this.parent().child(); // children from parent
               for (var idx in chd) {
                   if (chd[idx].adom().getId() === this.adom().getId()) {
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
            if (null === this.m_adom) {
                this.adom(new mofron.Adom());
                this.adom().component(this);
                this.initDomConts(this.m_param);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts(prm) {
        try {
            this.adom().addChild(
                new mofron.Dom(('string' === typeof prm) ? prm : 'div',this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return  ( (null   === this.m_adom) ||
                          ('none' === this.adom().style('display')) ) ? false : true;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            
            /* execute component option */
            if (null === this.parent()) {
                mofron.func.initCompChild(
                    this,
                    true
                );
            }
            
            if (true === flg) {
                if ('none' === this.adom().style('display')) {
                    this.adom().style({ 'display' : null });
                }
            } else {
                this.adom().style({ 'display' : 'none' });
            }
            
            if (null === this.parent()) {
                if (false === this.adom().isPushed()) {
                    this.render();
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    vdom (vd) {
        return this.adom(vd);
    }
    
    /**
     * agent dom setter / getter
     * 
     * @return (object) adom object
     */
    adom (ad, rdf) {
        try {
            if (undefined === ad) {
                /* getter */
                if (null === this.m_adom) {
                    this.initDomContsCtl();
                }
                return this.m_adom;
            }
            /* setter */
            if (false === mofron.func.isInclude(ad, 'Dom')) {
                throw new Error('invalid parameter : ' + typeof ad);
            }
            this.m_adom = ad;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execOption (opt) {
        try {
            opt = (undefined === opt) ? this.getOption() : opt;
            
            if (null === opt) {
                return;
            }
            if (undefined !== opt.theme) {
                this.theme(opt.theme);
                delete opt.theme;
            }
            
            if ( (null === this.parent()) &&
                 (true === opt.visible) ) {
                delete opt.visible;
            }
            super.execOption(opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
