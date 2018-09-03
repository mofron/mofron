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
            this.m_adom   = null;
            this.m_conf   = new Array(
                                new Array(), /* layout */
                                new Array(), /* effect */
                                new Array(), /* event */
                                new Array()  /* responsive */
                            );
            this.m_target = new Array(
                                null,        /* child */
                                null,        /* style */
                                null         /* event */
                            );
            this.listOption([
                'child', 'layout', 'effect', 'event', 'respsv', 'style'
            ]);
            this.prmOpt(po);
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
                if (true === this.isInnerTarget()) {
                    /* target is inner component */
                    return this.target().component().child();
                }
                return this.m_child;
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
            if (true === rflg) {
                return this.m_child;
            }
            return this.target().component().parent();
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
            var chd     = this.getChild(true);
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
            if (undefined === evt) {
                /* getter */
                return this.config(2);
            }
            /* setter */
            if ('object' !== typeof evt) {
                this.addEvent(evt);
                return;
            }
            for (let eidx in evt) {
                this.addEvent(evt[eidx]);
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
            if (undefined === lo) {
                /* getter */
                return this.config(0);
            }
            /* setter */
            if ('object' !== typeof lo) {
                this.addLayout(lo);
                return;
            }
            for (let lidx in lo) {
                this.addLayout(lo[lidx]);
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
    
    effect (eff) {
        try {
            if (undefined === eff) {
                /* getter */
                return this.config(1);
            }
            /* setter */
            if ('object' !== typeof eff) {
                this.addEffect(eff);
                return;
            }
            for (let eidx in eff) {
                this.addEffect(eff[eidx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addEffect (eff, flg) {
        try {
            if (undefined !== eff.speed()) {
                /* update effect speed */
                let eff_lst = this.effect();
                for (let eidx in eff_lst) {
                    eff_lst[eidx].speed(eff.speed());
                }
            } else {
                if ( (        0 !== this.effect().length) &&
                     (undefined !== this.effect()[0].speed()) ) {
                    eff.speed(this.effect()[0].speed());
                }
            }
            if (undefined !== flg) {
                eff.defStatus(flg);
            }
            this.addConfig(1, eff);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    respsv (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.config(3);
            }
            /* setter */
            if ('object' !== typeof prm) {
                this.addRespsv(prm);
                return;
            }
            for (let ridx in prm) {
                this.addRespsv(prm[ridx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addRespsv (prm) {
        try {
            this.addConfig(3, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getConfig (tp, nm) {
        try {
            if ( ('layout' !== tp) &&
                 ('effect' !== tp) &&
                 ('event'  !== tp) ) {
                throw new Error('invalid type');
            }
            let cnf = this[tp]();
            if (undefined !== nm) {
                for (let cidx in cnf) {
                    if (cnf[cidx].name() === nm) {
                        return cnf[cidx];
                    }
                }
            } else {
                return cnf;
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
    
    delConfig (tp, nm) {
        try {
            if ( ('layout' !== tp) &&
                 ('effect' !== tp) &&
                 ('event'  !== tp) ) {
                throw new Error('invalid type');
            }
            let cnf = this[tp]();
            if (undefined !== nm) {
                for (let cidx in cnf) {
                    if (cnf[cidx].name() === nm) {
                        /* delete target */
                        if ('layout' === tp) {
                            this.m_conf[0].splice(cidx, 1);
                        } else if ('effect' === tp) {
                            this.m_conf[1].splice(cidx, 1);
                        } else if ('event' === tp) {
                            this.m_conf[2].splice(cidx, 1);
                        }
                    }
                }
            } else {
                return cnf;
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    config (idx, cnf) {
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
                for (let cidx in cnf) {
                    /* set child array */
                    this.addConfig(idx, cnf[cidx]);
                }
                return;
            }
            this.addConfig(idx, cnf);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addConfig (idx, cnf) {
        try {
            if ( (undefined === this.m_conf[idx]) ||
                 (false     === mofron.func.isInclude(cnf, 'CompConf')) ) {
                throw new Error('invalid parameter');
            }
            this.m_conf[idx].push(cnf);
            cnf.component(this);
            if (true === this.adom().isPushed()) {
                if ( (    1 === idx) &&
                     (false === cnf.defStatus()) ) {
                    return;
                }
                cnf.execute();
            }
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
            this.initConfig(1); // effect
            this.initConfig(3); // responsive
            
            /* before push event */
            this.beforeRender();
            
            /* execute render */
            this.adom().pushDom(
                (null === this.parent()) ? null : this.parent().target()
            );
            /* after push event */
            this.afterRender();
            
            this.initConfig(2); // event
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            var chd = this.getChild(true);
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
            var chd = this.getChild(true);
            for (var idx in chd) {
                chd[idx].afterRender();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConfig (tgt_idx) {
        try {
            /* set child config */
            let chd = this.getChild(true);
            for (let cidx in chd) {
                chd[cidx].initConfig(tgt_idx);
            }
            
            /* set config */
            let cnf = this.config(tgt_idx);
            for (let cfidx in cnf) {
                cnf[cfidx].execute(
                    (1 === tgt_idx) ? (cnf[cfidx].defStatus()) : undefined
                );
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
            /* delete at dom level */
            this.adom().destroy();
            
            /* delete at component level */
            if (null !== this.parent()) {
               var chd = this.parent().child(); // children from parent
               for (var idx in chd) {
                   if (chd[idx].adom().getId() === this.adom().getId()) {
                       this.parent().delChild(parseInt(idx));  // separated from parent
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
            if (false === this.isInitDom()) {
                this.adom(new mofron.Adom());
                this.adom().component(this);
                this.initDomConts();
                
                if (null !== this.param()) {
                    let chk_prm = this.param();
                    let prm_map = this.prmMap();
                    
                    if (chk_prm.length > prm_map.length) {
                        throw new Error('mismatch parameter check count');
                    }
                    let obj = this;
                    for (let cidx in chk_prm) {
                        if ('function' !== typeof obj[prm_map[cidx]]) {
                            throw new Error('could not find method');
                        }
                        
                        let set_opt = {};
                        set_opt[prm_map[cidx]] = chk_prm[cidx];
                        this.addOption(set_opt);
                        
                        if (true === mofron.func.isObject(chk_prm[cidx], 'Param')) {
                            chk_prm[cidx].exec(obj[prm_map[cidx]], prm_map[cidx]);
                        } else {
                            obj[prm_map[cidx]](chk_prm[cidx]);
                        }
                    }
                }
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
        try {
            return (null === this.m_adom) ? false : true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return  ( (false   === this.isInitDom()) ||
                          ('none' === this.adom().style('display')) ) ? false : true;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            
            if (true === flg) {
                if ('none' === this.adom().style('display')) {
                    this.adom().style({ 'display' : null });
                }
            } else {
                this.adom().style({ 'display' : 'none' });
                if (false === this.adom().isPushed()) {
                    return;
                }
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
        try { return this.sizeValue('width', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try { return this.sizeValue('height', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    sizeValue (key, val) {
        try {
            if (undefined === val) {
                /* getter */
                return (null === this.style(key)) ? null : mofron.func.getSizeObj(this.style(key));
            }
            /* setter */
            mofron.func.setCompSize(this, key, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (c1, c2, c3) {
        try {
            if ( (undefined === c1) &&
                 (undefined === c2) &&
                 (undefined === c3) ) {
                /* getter */
                return [this.mainColor(), this.baseColor(), this.accentColor()];
            }
            /* setter */
            if (undefined !== c1) {
                this.mainColor(c1);
            }
            if (undefined !== c2) {
                this.baseColor(c2);
            }
            if (undefined !== c3) {
                this.accentColor(c3);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor () {}
    
    baseColor (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return mofron.func.getColor(this.style('background'));
            }
            /* setter */
            if (false === mofron.func.isInclude(prm, 'Color')) {
                throw new Error('invalid parameter');
            }
            this.style({ 'background' : prm.getStyle() });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor () {}
    
    prmOpt (po, p1, p2, p3, p4) {
        try {
            super.prmOpt(po, p1, p2, p3, p4);
            
            if (null !== this.param()) {
                this.adom();
            }
        } catch (e) {
            console.log(e.stack);
            throw e;
        }
    }
    
    prmMap () {
        try {
            if (0 === arguments.length) {
                /* getter */
                return (undefined === this.m_prmmap) ? [] : this.m_prmmap;
            }
            /* setter */
            this.m_prmmap = new Array();
            for (let idx in arguments) {
                this.m_prmmap.push(arguments[idx]);
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
            fnc(prm);
            this.target(tgt_buf);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
