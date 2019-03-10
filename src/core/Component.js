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
            
            this.data(this.getId(), {});
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
            //chd.theme(
            //    (null === this.theme()) ? undefined : this.theme()
            //);
            
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
                
                if (undefined !== idx) {
                    chd.adom().parent().update();
                } else { 
                    chd.render();
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
     * execute effect
     *
     * @param p1 (number) execute id
     * @param p2 (function, array) callback
     * @return (boolean) execute result
     */
    execEffect (eid, cb) {
        try { return mofron.func.execEffect(this.effect(), eid, cb); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initEffect () {
        try {
            let chd = this.getChild(true);
            for (let cidx in chd) {
                chd[cidx].initEffect();
            }
            this.execEffect((true === this.visible()) ? 0 : 1);
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
            } else if ( (true === Array.isArray(prm)) &&
                        (2 === prm.length) &&
                        ('string' === typeof prm[0]) &&
                        ('string' === typeof prm[1]) ) {
                /* getter */
                return mofron.func.getCompConf(this.config(idx), prm[0], prm[1]);
            } else if ('string' === typeof prm) {
                /* getter */
                return mofron.func.getCompConf(this.config(idx), prm);
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
     * set theme
     * 
     * @param p1 (array) replace target component name
     * @param p1 (object) theme parameter (for set multiple theme)
     * @param p2 (Component) replace component
     */
    theme (prm, cmp) {
        try {
            if (true === Array.isArray(prm)) {
                this.theme(prm[0], prm[1]);
                return;
            }
            
            let chd = this.getChild(true);
            for (let cidx in chd) {
                chd[cidx].theme(prm, cmp);
            }
            
            for (let cidx2 in chd) {
                if (true === mofron.func.isComp(chd[cidx2], prm)) {
                    /* replace child */
                    let rep_chd = (true === mofron.func.isComp(cmp)) ? cmp : new cmp();
                    rep_chd.option(chd[cidx2].option());
                    this.updChild(chd[cidx2], rep_chd);
                    /* replace config component */
                    for (let i=0; i < this.m_conf.length; i++) {
                        let rep_cnf = rep_chd.config(i);
                        for (let ridx in rep_cnf) {
                            rep_cnf[ridx].component(rep_chd);
                        }
                    }
                    
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tmpl (tmpl, prm) {
        try {
            if (true !== mofron.func.isInclude(tmpl, 'Template')) {
                throw new Error('invalid parameter');
            }
            /* get option template */
            fnc = tmpl.tmpl();
            if (null !== fnc) {
                this.execOption(fnc(prm));
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
            /* execute render */
            this.adom().pushDom(
                (null === this.parent()) ? null : this.parent().target()
            );
            /* after push event */
            this.afterRender();
            
            this.initEffect();
            this.initConfig(2); // event
            
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
                        let chd = d_cmp.parent().getChild(true); // children from parent
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
                this.isIniting(true);
                this.initDomConts();
                this.isIniting(false);
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
    
    isIniting (prm) {
        try { return this.member('isIniting', 'boolean', prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg, cb) {
        try {
            if (undefined === flg) {
                /* getter */
                let achd = this.adom().child();
                for (let cidx in achd) {
                    if ('none' !== achd[cidx].style('display')) {
                        return true;
                    }
                }
                return false;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            
            if (true === flg) {
                /* enable display a component */
                /* execute effect 'after' enabled */
                mofron.func.compDisp(this, flg);
            } else {
                /* disable display a component */
                /* execute effect 'before' disabled */
                //this.style({ 'display' : 'none' });
            }
            
            if ( (null === this.parent()) &&
                 (false === this.adom().isPushed()) &&
                 (true === flg) ) {
                /* this is root component and rendering process */
                this.render();
                return;
            }
            
            let scb = (p1) => {
                try {
                    if (false === flg) {
                        mofron.func.compDisp(p1, flg);
                    }
                    if ('function' === typeof cb) {
                        cb(p1);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            
            if (false === this.adom().isPushed()) {
                scb(this);
            } else if (false === this.execEffect((true === flg) ? 0 : 1, [scb, this])) {
                /* execute effect */
                scb(this);
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
            let visible = null;
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
                if (undefined !== opt.visible) {
                    visible = opt.visible;
                    delete opt.visible;
                }
            }
            let opt_buf = null;
            if (true === this.isIniting()) {
                opt_buf = {};
                Object.assign(opt_buf, this.getOption());
                
                for (let oidx in opt_buf) {
                    if ('object' === typeof opt_buf[oidx]) {
                        let set_buf = {};
                        Object.assign(set_buf, opt_buf[oidx]);
                        opt_buf[oidx] = set_buf;
                    }
                }
            }
            
            /* check visible */
            super.execOption(opt);
            
            
            if (null !== opt_buf) {
                // avoid option overwrite
                for (let oidx1 in opt_buf) {
                    for (let oidx2 in opt) {
                        if (oidx1 === oidx2) {
                            let ret_opt = {};
                            ret_opt[oidx1] = opt_buf[oidx1];
                            this.addOption(ret_opt);
                        }
                    }
                }
            }
            
            if (null !== theme) {
                this.theme(theme);
            }
            if (null !== visible) {
                 this.visible(visible);
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
            if (null === val) {
                if (undefined !== this.m_inncmp[key]) {
                    this.m_inncmp[key].destroy();
                }
                return;
            } else if (true !== mofron.func.isComp(val)) {
                throw new Error('invalid parameter');
            }
            if (undefined !== this.m_inncmp[key]) {
                let pnt = this.m_inncmp[key].parent();
                pnt.updChild(this.m_inncmp[key], val);
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
}
/* end of file */
