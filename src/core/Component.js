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
            this.name("Component");
            
            /* initialize member */
            this.m_child  = new Array();
            this.m_inncmp = {};
            this.m_tag    = {};
            this.m_theme  = {};
            this.m_adom   = null;
            this.m_target = new Array(null, null, null); /* child, style, event */
            this.m_conf   = new Array([], [], []);   /* layout, effect, event */
            this.listOption(["child", "layout", "effect", "event", "style" ]);
            this.prmMap("child");
            
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
    
    updChild (o_chd, n_chd, inn) {
        try {
            if ( (false === mofron.func.isComp(o_chd)) ||
                 (false === mofron.func.isComp(n_chd)) ) {
                throw new Error('invalid parameter');
            }
            
            /* get old-child index */
            let cmp_chd = this.getChild();
            let upd_idx = null;
            for (let cidx in cmp_chd) {
                if (cmp_chd[cidx].getId() === o_chd.getId()) {
                    upd_idx = cidx;
                    break;
                }
            }
            if (null === upd_idx) { 
                cmp_chd = this.getChild(true);
                for (let cidx2 in cmp_chd) {
                    if (cmp_chd[cidx2].getId() === o_chd.getId()) {
                        upd_idx = cidx2;
                        break;
                    }
                }
            }
            if (null === upd_idx) {
                throw new Error('could not find old child component');
            }

            /* replace innerComp */
            if (false !== inn) {
                if (false === mofron.func.repInncmp(this, o_chd, n_chd)) {
                    let pnt = this.parent();
                    while (null !== pnt) {
                        if (true === mofron.func.repInncmp(pnt, o_chd, n_chd)) {
                            break;
                        }
                        pnt = pnt.parent();
                    }
                }
            }
            
            /* replace child */
            let ochd_tgt = o_chd.adom().parent();  
            let cmp_tgt  = this.target();
            o_chd.destroy();
            this.target(ochd_tgt);
            this.addChild(n_chd, upd_idx);
            this.target(cmp_tgt);
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
            
            let ptag = pnt.tag();
            let chd  = this.getChild(true);
            for (let tidx in ptag) {
                for (let cidx in chd) {
                    chd[cidx].tag(ptag[tidx]);
                }
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
     * @param kv (object) style contetns
     * @param los (object) option
     * @return (object) style object
     */
    style (kv, opt) {
        try {
            if (true === Array.isArray(kv)) {
                for (let kv_idx in kv) {
                    if (true === Array.isArray(kv[kv_idx])) {
                        this.style(kv[kv_idx][0], kv[kv_idx][1]);
                    } else {
                        this.style(kv[kv_idx]);
                    }
                }
                return;
            }
            if ("string" === typeof kv) {
                return this.styleTgt().style(kv, opt);
            } else if (undefined === kv) {
                throw new Error("invalid parameter");
            }
            /* check option */
            let chk = this.option().style;
            if (true === Array.isArray(chk)) {
                let chk_style = (true === Array.isArray(chk[chk.length-1])) ? chk[chk.length-1][0] : chk[chk.length-1];
                if (Object.keys(chk_style).length !== Object.keys(kv).length) {
                    chk = null;
                } else {
                    for (let chk_idx in chk_style) {
                        if (undefined === kv[chk_idx]) {
                            chk = null;
                            break;
                        }
                    }
                }
            } else {
                chk = null;
            }
            if (null === chk) {
                 this.option({ style: (undefined !== opt) ? [kv, opt] : kv });
                 return;
            }
            this.styleTgt().style(kv, opt); 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (prm) {
        try {
            return this.config(0, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (prm) {
        try {
            return this.config(1, prm);
        } catch (e) {
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
            this.execEffect(
                (true === this.visible()) ? 0 : 1
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event (prm) {
        try {
            return this.config(2, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    respsv (prm) {
        try {
            for (let pidx in prm) {
                if (pidx === mofron.func.devType()) {
                    for (let pidx2 in prm[pidx][0]) {
                        if (pidx2 === "os") {
                            if (prm[pidx][0][pidx2] === mofron.func.osType()) {
                                this.option(prm[pidx][1]);
                            }
                        } else if (pidx2 === "browser") {
                            if (prm[pidx][0][pidx2] === mofron.func.brsType()) {
                                this.option(prm[pidx][1]);
                            }
                        }
                    }
                    if (0 === Object.keys(prm[pidx][0]).length) { 
                        this.option(prm[pidx][1]);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tag (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_tag;
            }
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_tag[prm] = null;
            
            if (undefined !== prm) {
                let chd = this.getChild(true);
                for (let cidx in chd) {
                    chd[cidx].tag(prm);
                }
            }
        } catch (e) {
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
                if (undefined === idx) {
                    return this.m_conf;
                } else if (undefined === this.m_conf[idx]) {
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
            
            /* check add option */
            let cnf_key = ["layout", "effect", "event"];
            let chk_opt = this.option()[cnf_key[idx]];
            let hit     = false;
            for (let co_idx in chk_opt) {
                if (chk_opt[co_idx].getId() === prm.getId()) {
                    hit = true;
                    break;
                }
            }
            if (false === hit) {
                let add_opt = {};
                add_opt[cnf_key[idx]] = prm;
                this.addOption(add_opt)
            }
            
            this.m_conf[idx].push(prm);
            
            prm.component(this);
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
     * 
     */
    theme (thm) {
        try {
            if (undefined === thm) {
                /* getter */
                return this.m_theme;
            }
            /* setter */
            if ("object" !== typeof thm) {
                throw new Error("invalid parameter");
            }
            /* format data */
            for (let tidx in thm) {
                if ( ("object" === typeof thm[tidx]) &&
                     (false === mofron.func.isInclude(thm[tidx], 'Base')) ) {
                    /* param theme is option */
                    thm[tidx] = [undefined, thm[tidx]];
                } else if ("function" === typeof thm[tidx]) {
                    /* param theme is class */
                    thm[tidx] = [thm[tidx], {}];
                } else if ( (true === Array.isArray(thm)) &&
                            ("function" === typeof thm[tidx][0]) &&
                            ("object" === typeof thm[tidx][1]) &&
                            (false === mofron.func.isInclude(thm[tidx][1], 'Base')) ) {
                    /* param theme is class with option */
                    /* nothing to do */
                } else {
                    throw new Error("invalid parameter");
                }
                this.m_theme[tidx] = thm[tidx];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute theme function
     * 
     * @note opt ignore,level
     */
    execTheme (prm) {
        try {
            /* call child theme */
            let thm = this.theme();
            for (let tidx in thm) {
                if (undefined === prm[tidx]) {
                    prm[tidx] = thm[tidx];
                } else if (undefined === thm[tidx][0]) {
                    /* member theme is option */
                    for (let oidx in thm[tidx][1]) {
                        prm[tidx][1][oidx] = thm[tidx][1][oidx];
                    }
                } else if (undefined === prm[tidx][0]) {
                    /* parent theme is option */
                    for (let oidx in prm[tidx][1]) {
                        thm[tidx][1][oidx] = prm[tidx][1][oidx];
                    }
                    prm[tidx] = thm[tidx];
                } else {
                    /* parent theme is already set class */
                    prm[tidx] = thm[tidx];
                }
            }
            let chd = this.getChild(true);
            for (let cidx in chd) {
                chd[cidx].execTheme(prm);
            }
            
            /* exec theme */
            let replace = (cp, tg, rp) => {
                try {
                    let ret = new rp();
                    /* copy option */
                    let tg_opt = tg.option();
                    ret.option(tg_opt);
                    
                    if ( (undefined === tg_opt.child) && (0 !== tg.child().length) ) {
                        ret.option({ child: tg.child() });
                    }

                    /* replace child */
                    cp.updChild(tg, ret);
                    return ret;
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            /* check child */
            for (let cidx2 in chd) {
                
                for (let pidx in prm) {
                    
                    if (true === mofron.func.isInclude(chd[cidx2], pidx)) {
                        /* this child component is theme target */
                        if ( (undefined !== prm[pidx][0]) &&
                             (undefined === prm[pidx][1]) ) {
                            /* theme type is class */
                            replace(this, chd[cidx2], prm[pidx][0]);
                        } else if ( (undefined !== prm[pidx][0]) &&
                                    (undefined !== prm[pidx][1]) ) {
                            /* theme type is class with option */
                            replace(this, chd[cidx2], prm[pidx][0]).option(prm[pidx][1]);
                        } else if ( (undefined === prm[pidx][0]) &&
                                    (undefined !== prm[pidx][1]) ) {
                            /* theme type is option */
                            chd[cidx2].option(prm[pidx][1]);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    template (tmpl, prm) {
        try {
            if ('function' !== typeof tmpl) {
                throw new Error('invalid parameter');
            }
            this.child(tmpl(prm));
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
            
            /* before push event */
            this.beforeRender();
            
            this.execTheme({});
            
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
                if (false === this.adom().isPushed()) {
                    return false;
                }
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
                /* it doesn't execute effect, only callback */
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
	    if (true === Array.isArray(x)) {
                this.width(x[0], x[1]);
	    } else {
                this.width(x);
	    }
	    if (true === Array.isArray(y)) {
                this.height(y[0], y[1]);
            } else {
	        this.height(y);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    fsize (x, y) {
        try {
            if (undefined === x) {
                return this.size();
            }
            this.size([x,{locked:true}], [y,{locked:true}]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm, opt) {
        try { return mofron.func.cmpSize(this, "width", [prm,opt]); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm, opt) {
        try { return mofron.func.cmpSize(this, "height", [prm,opt]); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** color method ***/
    color (c1, c2, c3) {
        try {
	    if (undefined === c1) {
	        /* getter */
                return [this.mainColor(), this.baseColor(), this.accentColor()];
	    }
	    /* main color */
	    if ( (true === Array.isArray(c1)) && ('object' === typeof c1[1]) ) {
                this.mainColor(c1[0], c1[1]);
	    } else {
                this.mainColor(c1);
	    }
            /* base color */
            if ( (true === Array.isArray(c2)) && ('object' === typeof c2[1]) ) {
                this.baseColor(c2[0], c2[1]);
            } else {
                this.baseColor(c2);
            }
	    /* accent color */
            if ( (true === Array.isArray(c3)) && ('object' === typeof c3[1])) {
                this.accentColor(c3[0], c3[1]);
            } else {
                this.accentColor(c3);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm, opt) { return null; }
    
    baseColor (prm, opt) {
        try { return mofron.func.cmpColor(this, "background", [prm,opt]); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm, opt) { return null; }
    
    /* option method */
    prmOpt (po, p1, p2, p3, p4) {
        try {
            if (undefined === po) {
                return;
            }
            this.adom();
            let opt = this.setPrmOpt(po, p1, p2, p3, p4);
            
            if (undefined !== opt) {
                /* option */
                this.execOption(opt);
            } else if ( (null !== this.param()) && (0 !== this.prmMap().length) ) {
                /* parameter */
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
                if (undefined !== opt.prmOpt) {
                    this.prmOpt(opt.prmOpt);
                    delete opt.prmOpt;
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
            if (undefined === key) {
                return this.m_inncmp;
            } else if (undefined === val) {
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
                pnt.updChild(this.m_inncmp[key], val, false);
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
