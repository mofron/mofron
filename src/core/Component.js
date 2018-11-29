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
            super();
            this.name('Component');
            
            /* initialize member */
            this.m_child  = new Array();
            this.m_inncmp = {};
            this.m_adom   = null;
            this.m_target = new Array(null, null, null); /* child, style, event */
            this.m_conf   = new Array([], [], [], []);   /* layout, effect, event, respsv */
            this.listOption([ 'child', 'layout', 'effect', 'event', 'respsv', 'style' ]);
            this.prmMap('child');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** dom method ***/
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
    
    getDomChild (flg) {
        try { return (true === flg) ? this.target().child() : this.adom().child(); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** child method ***/
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
                return this.getChild();
            }
            /* setter */
            if (true !== Array.isArray(chd)) {
                this.addChild(chd);
                return;
            }
            for (var idx in chd) {
                this.addChild(chd[idx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getChild (rflg) {
        try {
            this.adom();
            if ( (true === rflg) || true !== this.isInnerTarget() ) {
                return this.m_child;
            }
            return this.target().component().child();
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
            chd.parent(this);                         // child's parent is me
            this.target().addChild(chd.adom(), idx);  // parent relate to child at dom level
            
            if (true === this.isInnerTarget() ) {
                /* target is inner component */
                this.target().component().addChild(chd, idx);
                return;
            }
            
            if ( (undefined === idx) ||
                 (0 === this.m_child.length) ) {
                this.m_child.push(chd);
            } else {
                this.m_child.splice(idx, 0, chd);
            }
            if ( (null !== this.m_adom) &&
                 (true === this.adom().isPushed()) ) {
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
            var chd     = this.getChild(true);
            var upd_idx = null;
            for (var chd_idx in chd) {
                if (chd[chd_idx].getId() === o_chd.getId()) {
                    upd_idx = chd_idx;
                    break;
                }
            }
            if (null === upd_idx) {
                chd = this.child();
                for (let cidx in chd) {
                    if (chd[cidx].getId() === o_chd.getId()) {
                        upd_idx = cidx;
                        break;
                    }
                }
                if (null === upd_idx) {
                    throw new Error('invalid parameter');
                }
            }
            
            let old_tgt = chd[upd_idx].adom().parent();
            let buf_tgt = this.target();
            
            /* replace child */
            var upd_disp = this.getChild(true)[upd_idx].visible();
            this.getChild(true)[upd_idx].destroy();
            
            this.target(old_tgt);
            this.addChild(n_chd, upd_idx);
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
                 (undefined === this.getChild(true)[idx]) ) {
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
            let lis = this.parentListener();
            for (let lidx in lis) {
                lis[lidx][0](this, lis[lidx][1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    parentListener (evt, prm) {
        try {
            if (undefined === evt) {
                /* getter */
                return (undefined === this.m_pnt_lis) ? [] : this.m_pnt_lis;
            }
            /* setter */
            if ('function' !== typeof evt) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_pnt_lis) {
                this.m_pnt_lis = new Array();
            }
            this.m_pnt_lis.push([evt, prm]);
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
        try { return this.styleTgt().style(kv, los); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (prm) {
        try { return this.config(0, prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (prm) {
        try { return this.config(1, prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * @return (boolean) execute flag
     */
    execEffect (flg, scb, idx) {
        try {
            let _idx = (undefined === idx) ? 0 : idx;
            if ('number' !== typeof _idx) {
                throw new Error('invalid parameter');
            }
            
            let eff      = this.effect();
            let scb_func = undefined;
            
            /* exec check */
            let exe_chk = false;
            for (let eidx in eff) {
                
                if (_idx === eff[eidx].execOrder()) {
                    
                    if (true === eff[eidx].isLastExec(flg, _idx)) {
                        /* this is last of _idx effect group */
                        if (false === eff[eidx].isLastExec(flg)) {
                            /* exists next order effect */
                            scb_func = (p1) => {
                                p1.execEffect(flg, scb, _idx+1);
                            }
                        } else {
                            /* this is last in all effect */
                            scb_func = scb;
                        }
                    }
                    
                    let eff_ret = eff[eidx].execute(flg, scb_func, true);
                    if (true === eff_ret) {
                        exe_chk = true;
                    }
                } else if ( (_idx < eff[eidx].execOrder()) &&
                            (false === eff[eidx].isSkipped(flg)) ) {
                    exe_chk = true;
                }
                
            }
            if (false === exe_chk) {
                /* there is no executable effect object, callback doesn't call */
                return false;
            }
            return true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event (prm) {
        try { return this.config(2, prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    respsv (prm) {
        try { return this.config(3, prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConfig (idx) {
        try {
            /* init child config */
            let chd = this.getChild(true);
            for (let cidx in chd) {
                chd[cidx].initConfig(idx);
            }
            /* init config */
            if (1 == idx) {
                this.execEffect(this.visible());
                return;
            }
            let cnf = this.config(idx);
            for (let cfidx in cnf) {
                cnf[cfidx].execute();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delConfig (prm) {
        try {
            if (true !== mofron.func.isInclude(prm, 'CompConf')) {
                throw new Error('invalid parameter');
            }
            /* delete config from member */
            for (let idx in this.m_conf) {
                let cnf = this.config(idx);
                for (let cidx in cnf) {
                    if (prm.getId() === cnf[cidx].getId()) {
                        cnf.splice(cidx, 1);
                        prm.component(null);
                        return;
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    config (idx, prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_conf[idx]) {
                    throw new Error('invalid parameter');
                }
                return this.m_conf[idx];
            } else if ('string' === typeof prm) {
                /* getter */
                let cnf = this.config(idx);
                for (let cidx in cnf) {
                    if (cnf[cidx].name() === prm) {
                        return cnf[cidx];
                    }
                }
                return null;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.config(idx, prm[pidx]);
                }
                return;
            }
            if (true !== mofron.func.isInclude(prm, 'CompConf')) {
                throw new Error('invalid parameter');
            }
            if ( (true === this.isInnerTarget()) && (1 !== idx) ) {
                this.target().component().config(idx, prm);
            }
            
            this.m_conf[idx].push(prm);
            
            if (null === prm.component()) {
                prm.component(this);
            }
            if (true === this.adom().isPushed()) {
                prm.execute();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    configOpt (tp, nm, opt) {
        try {
            let cnf = this.getConfig(tp, nm);
            if (null === cnf) {
                return;
            }
            cnf.execOption(opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * theme setter / getter
     *
     * @param prm : (object) moron.Theme object
     * @return (object) theme object
     */
    theme (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_theme) { 
                    this.m_theme = new mofron.Theme({});
                    this.m_theme.tgtComp(this);
                }
                return this.m_theme;
            }
            /* setter */
            this.theme().setTheme(prm);
            let chd = this.getChild(true);
            for (let cidx in chd) {
                chd[cidx].theme(prm);
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
            
            /* set child config */
            this.initConfig(0); // layout
            this.initConfig(3); // responsive
            
            /* before push event */
            this.beforeRender();
            
            //this.initConfig(1); // effect
            
            /* execute render */
            this.adom().pushDom(
                (null === this.parent()) ? null : this.parent().target()
            );
            this.initConfig(1); // effect
            
            this.initConfig(2); // event
            
            /* after push event */
            this.afterRender();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            let chd = this.getChild(true);
            for (let idx in chd) {
                chd[idx].beforeRender();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    afterRender () {
        try {
            let chd = this.getChild(true);
            for (let idx in chd) {
                chd[idx].afterRender();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy (cb) {
        try {
            if (null === this.m_adom) {
                throw new Error('not initialized yet');
            }
            
            let des_fnc = (d_cmp) => {
                try {
                    /* delete at dom level */
                    d_cmp.adom().destroy();
                    
                    /* delete at component level */
                    if (null !== d_cmp.parent()) {
                        let chd = d_cmp.parent().child(); // children from parent
                        for (let idx in chd) {
                            if (chd[idx].adom().getId() === d_cmp.adom().getId()) {
                                d_cmp.parent().delChild(parseInt(idx));  // separated from parent
                                break;
                            }
                        }
                    }
                    
                    if ('function' === typeof cb) {
                        cb(this);
                    }
                    
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            if ( (true === this.target().isPushed()) && (true === this.visible()) ) {
                this.visible(false, des_fnc);
            } else {
                des_fnc(this);
            }
            
            ///* delete at dom level */
            //this.adom().destroy();
            //
            ///* delete at component level */
            //if (null !== this.parent()) {
            //   var chd = this.parent().child(); // children from parent
            //   for (var idx in chd) {
            //       if (chd[idx].adom().getId() === this.adom().getId()) {
            //           this.parent().delChild(parseInt(idx));  // separated from parent
            //           break;
            //       }
            //   }
            //}
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomContsCtl() {
        try {
            if (false === this.isInitDom()) {
                this.adom(new mofron.Adom());
                this.adom().component(this);
                this.initDomConts();
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
    
    isInitDom () {
        try { return (null === this.m_adom) ? false : true; } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg, eff) {
        try {
            //let eff_func = ('function' === typeof eff) ? eff : undefined;
            //let _eff = (false !== eff) ? true : false;
            
            if (undefined === flg) {
                /* getter */
                return  ( (false   === this.isInitDom()) ||
                          ('none' === this.adom().style('display')) ) ? false : true;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            
            /* configure css value */
            let scb = null;
            if (true === flg) {
                if ('none' === this.adom().style('display')) {
                    this.adom().style({ 'display' : null });
                }
            } else {
                //if (false === this.adom().isPushed()) {
                //    this.adom().style({ 'display' : 'none' });
                //    return;
                //} else {
                    scb = (p1) => {
                        try {
                            p1.adom().style({ 'display' : 'none' });
                            if ('function' === typeof eff) {
                                eff(p1);
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                //}
            }
            
            if ( (true === flg) &&
                 (null === this.parent()) &&
                 (false === this.adom().isPushed()) ) {
                /* root component */
                /* not supported eff parameter */
                this.render();
            } else if ((true === this.adom().isPushed()) && (false !== eff) ) {
                if ( (false === this.execEffect(flg, scb)) &&
                     ('function' === typeof scb) ) {
                    scb(this);
                }
            } else {
                ('function' === typeof scb) ? scb(this) : undefined;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
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
    
    size (x, y) {
        try {
            if (undefined === x) {
                /* getter */
                return [this.width(), this.height()];
            }
            /* setter */
            this.width(x);
            this.height(y);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm) {
        try {
            return (undefined === prm) ? this.style('width') : this.sizeValue('width', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            return (undefined === prm) ? this.style('height') : this.sizeValue('height', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    sizeValue (key, val) {
        try {
            if (undefined === val) {
                /* getter */
                return mofron.func.getSize(this.style(key),this);
            }
            /* setter */
            mofron.func.setSize(this, key, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** color method ***/
    color (c1, c2, c3) {
        try {
            return [this.mainColor(c1), this.baseColor(c2), this.accentColor(c3)];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor () { return null; }
    
    baseColor (prm) {
        try { return this.tgtColor('background', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor () { return null; }
    
    tgtColor (tgt, val) {
        try {
            return (undefined === val) ? this.style(tgt) : mofron.func.setColor(this, tgt, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmOpt (po, p1, p2, p3, p4) {
        try {
            if (undefined === po) {
                return;
            }
            this.setPrmOpt(po, p1, p2, p3, p4);
            let opt_flg = false;
            if ( (null !== this.getOption()) &&
                 (0 !== Object.keys(this.getOption()).length) ) {
                opt_flg = true;
            }
            this.adom();
            if (true === opt_flg) {
                this.execOption();
            } else if ( (null !== this.param()) && (0 !== this.prmMap().length) ) {
                mofron.func.execPrmMap(this);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execOption (opt) {
        try {
            this.adom();
            let exe_opt = null;
            let theme   = null;
            if (undefined === opt) {
                exe_opt = this.getOption();
                if (undefined !== exe_opt.theme) {
                    theme = exe_opt.theme;
                    this.delOption('theme');
                }
            } else {
                if (undefined !== opt.theme) {
                    theme = opt.theme;
                    delete opt.theme;
                }
            }
            super.execOption(opt);
            if (null !== theme) {
                this.theme(theme);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    innerComp (key, val, tmpl) {
        try {
            if (undefined === val) {
                /* getter */
                if (undefined === this.m_inncmp[key]) {
                    this[key](new tmpl({}));
                }
                return this.m_inncmp[key];
            }
            /* setter */
            if (true !== mofron.func.isInclude(val, 'Component')) {
                throw new Error('invalid parameter');
            }
            if (undefined !== this.m_inncmp[key]) {
                this.updChild(this.m_inncmp[key], val);
            }
            this.m_inncmp[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isInnerTarget () { 
        try {
            if (null === this.target().component().parent()) {
                return false;
            }
            
            let pnt_buf = this.target().component().parent();
            while (null !== pnt_buf) {
                if (this.getId() === pnt_buf.getId()) {
                    /* target is inner component */
                    return true;
                }
                pnt_buf = pnt_buf.parent();
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    switchTgt (tgt, fnc, prm) {
        try {
            if (true !== mofron.func.isInclude(tgt, 'Dom')) {
                throw new Error('invald parameter');
            }
            let tgt_buf = this.target();
            this.target(tgt);
            if ('function' !== typeof fnc) {
                throw new Error('invald parameter');
            }
            fnc(this, prm);
            this.target(tgt_buf);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
