/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.CompConf {
    
    constructor (po) {
        try {
            super();
            this.name('Effect');
            this.m_execonf = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined !== prm) {
                /* component setter */
                let eff = prm.effect();
                if ( (0 !== this.speed()[0]) || (0 !== this.speed()[1]) ) {
                    if ( (0 !== eff.length) &&
                         ((this.speed()[0] !== eff[0].speed()[0]) || (this.speed()[1] !== eff[0].speed()[1])) ) {
                        /* update effect speed */
                        for (let eidx in eff) {
                            eff[eidx].speed(this.speed()[0], this.speed()[1]);
                        }
                    }
                } else {
                    if (0 !== eff.length) {
                        /* inheritanced speed */
                        this.speed(eff[0].speed()[0], eff[0].speed()[1]);
                    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute (cflg, scb, iflg) {
        try {
            let init = this.isInit();
            
            if (true === this.isSkipped(cflg)) {
                /* this effect is skipped */
                this.isInit(false);
                return false;
            }
            this.isInit(false);
            
            if (true !== iflg) {
                this.setConf(this.speed()[(true === cflg) ? 0 : 1]);
            } else if (true === this.isFirstExec(cflg)) {
                if ( (true !== init) || (false !== cflg) ) {
                    this.setConf(this.speed()[(true === cflg) ? 0 : 1]);
                }
            }
            
            /* callback before execute */
            let bfcb = this.beforeExec();
            if (null !== bfcb) {
                for (let bidx in bfcb) {
                    bfcb[bidx][0](this, cflg, bfcb[bidx][1]);
                }
            }
            
            /* execute effect */
            setTimeout(
                (tdp1) => {
                    try { tdp1.contents(cflg, tdp1.component()); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this.delay()[(true === cflg) ? 0 : 1] + 50, // 50ms wait for render
                this
            );
            
            /* execute inner callback */
            this.setIcbid();
            let inn_cb = (eff, icb_id) => {
                try {
                    if (icb_id < eff.getIcbid()) {
                        /* skip inner callback for avoid redundant */
                        return;
                    }
                    
                    if ( (true === eff.isLastExec(cflg)) ||
                         (true !== iflg) ) {
                        /* reset css conf */
                        eff.setConf(null); 
                    }
                    
                    /* simple callback */
                    if (null != scb) {
                        if ('function' === typeof scb) {
                            /* callback without param */
                            scb(eff.component(), eff);
                        } else if ( (true === Array.isArray(scb)) &&
                                    ('function' === typeof scb[0]) ) {
                            /* callback with param */
                            scb[0](eff.component(), eff, scb[1]);
                        }
                    }
                    
                    /* common callback */
                    if (null != eff.callback()) {
                        eff.callback()[0](eff.component(), eff, eff.callback()[1]);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            let inn_delay = this.speed()[(true === cflg) ? 0 : 1] + 50;
            /* get the largest value of delay in component effect */
            let eff     = this.component().effect();
            let eff_dly = 0;
            let chk_dly = null;
            for (let eidx in eff) {
                chk_dly = eff[eidx].delay()[(true === cflg) ? 0 : 1];
                if (eff_dly < chk_dly) {
                    eff_dly = chk_dly;
                }
            }
            setTimeout(inn_cb, inn_delay + eff_dly, this, this.getIcbid());
            
            return true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    forcedExec (flg, scb) {
        try {
            let sus = this.suspend();
            this.suspend(
                (true === flg) ? false : sus[0],
                (false === flg) ? false : sus[1]
            );
            this.execute(flg, scb, false);
            this.suspend(sus[0], sus[1]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * @param p1 enable flag
     */
    setConf (spd) {
        try {
            if ( !((null === spd) || ('number' === typeof spd)) ) {
                throw new Error('invalid paramter');
            }
            if (0 === spd) {
                /* effect is not animation mode. nothing to do */
                return;
            }
            let adom = this.component().adom();
            if (null !== spd) {
                adom.style({
                    '-webkit-transition' : spd + 'ms all linear 0s',
                    '-moz-transition'    : 'all ' + spd + 'ms',
                    '-ms-transition'     : 'all ' + spd + 'ms',
                    '-o-transition'      : 'all ' + spd + 'ms',
                    'transtion'          : spd + 'ms all linear 0s'
                });
            } else {
                adom.style({
                    '-webkit-transition' : null,
                    '-moz-transition'    : null,
                    '-ms-transition'     : null,
                    '-o-transition'      : null,
                    'transtion'          : null
                });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (flg, cmp) {
        try {
            (true === flg) ? this.enable(cmp) : this.disable(cmp);
            this.status(flg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (tgt) {
        console.warn('not implement');
    }
    
    disable (tgt) {
        console.warn('not implement');
    }
    
    status (sts) {
        try { return this.member('status', 'boolean', sts, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    speed (prm, dis) {
        try {
            if ( ((undefined !== prm) && ('number' !== typeof prm)) ||
                 ((undefined !== dis) && ('number' !== typeof dis)) ) {
                throw new Error('invalid parameter');
            }
            let ret = this.execConfig('speed', prm, dis);
            if ( (undefined === ret) && (null !== this.component()) ) {
                /* setter, speed value is common to all effect of component */
                let eff = this.component().effect();
                let chk = null;
                for (let eidx in eff) {
                    chk = eff[eidx].speed();
                    if ( (this.speed()[0] !== chk[0]) || (this.speed()[1] !== chk[1])) {
                        /* update speed */
                        eff[eidx].setSpeed(prm, dis);
                    }
                }
            }
            return (null === ret) ? [0, 0] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSpeed (prm, dis) {
        try {
            if ( ((undefined !== prm) && ('number' !== typeof prm)) ||
                 ((undefined !== dis) && ('number' !== typeof dis)) ) {
                throw new Error('invalid parameter');
            }
            this.execConfig('speed', prm, dis);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delay (prm, dis) {
        try {
            if ( ((undefined !== prm) && ('number' !== typeof prm)) ||
                 ((undefined !== dis) && ('number' !== typeof dis)) ) {
                throw new Error('invalid parameter');
            }
            let ret = this.execConfig('delay', prm, dis);
            return (null === ret) ? [0, 0] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isFirstExec (flg) {
        try {
            let eff = this.component().effect();
            for (let eidx in eff) {
                if (false === eff[eidx].isSkipped(flg)) {
                    return (this.getId() === eff[eidx].getId()) ? true : false;
                }
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isLastExec (flg, ord) {
        try {
            let eff     = this.component().effect();
            let chk_tgt = [];
            
            /* get check target list */
            if ('number' === typeof ord) {
                for (let eidx in eff) {
                    if (ord === eff[eidx].execOrder()) {
                        chk_tgt.push(eff[eidx]);
                    }
                }
            } else {
                chk_tgt = eff;
            }
            
            /* skip check */
            if (true === this.isSkipped(flg)) {
                /* this effect will skip */ 
                return false;
            }
            
            for (let tidx in chk_tgt) {
                if (this.getId() === chk_tgt[tidx].getId()) {
                    if (tidx == chk_tgt.length-1) {
                        /* this effect is last */
                        return true;
                    }
                    
                    for (let tidx_2=parseInt(tidx)+1; tidx_2 < chk_tgt.length ;tidx_2++) {
                        if (false === chk_tgt[tidx_2].isSkipped(flg)) {
                            /* there is a effect to be executed after this effect */
                            return false;
                        }
                    }
                    /* this effect will be executed at the end */
                    return true;
                }
            }
            throw new Error('mismatched components');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSkipped (flg) {
        try {
            if ( (true === this.isInit()) && (flg !== this.status()) ) {
                /* mismatch status */
                return true;
            }
            
            if ( ((true === flg) && (true === this.suspend()[0])) ||
                 ((false === flg) && (true === this.suspend()[1])) ) {
                /* suspend */
                return true;
            }
            
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isInit (prm) {
        try { return this.member('isInit', 'boolean', prm, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeExec (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_bfexec) ? null : this.m_bfexec;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_callback) {
                this.m_bfexec = [];
            }
            this.m_bfexec.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    callback (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_callback) ? null : this.m_callback;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_callback) {
                this.m_callback = new Array(null,null);
            }
            this.m_callback[0] = fnc;
            this.m_callback[1] = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setIcbid () {
        try {
            if (undefined === this.m_icbstk) {
                this.m_icbstk = [null];
                return;
            }
            this.m_icbstk.push(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getIcbid () {
        try {
            return this.m_icbstk.length;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    suspend (prm, dis) {
        try {
            if ( ((undefined !== prm) && ('boolean' !== typeof prm)) ||
                 ((undefined !== dis) && ('boolean' !== typeof dis)) ) {
                throw new Error('invalid parameter');
            }
            let ret = this.execConfig('suspend', prm, dis);
            return (null === ret) ? [false, false] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /* enable/disable config interface */
    execConfig (nm, prm, dis) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_execonf[nm]) ? null : this.m_execonf[nm];
            }
            /* setter */
            if ('string' !== typeof nm) {
                 throw new Error('invalid parameter');
            }
            if (undefined === this.m_execonf[nm]) {
                this.m_execonf[nm] = [null, null];
            }
            
            if ( (undefined !== prm) && (undefined === dis) ) {
                this.m_execonf[nm] = [prm, prm];
            } else {
                if (undefined !== prm) {
                    this.m_execonf[nm][0] = prm;
                }
                if (undefined !== dis) {
                    this.m_execonf[nm][1] = dis;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execOrder (prm) {
        try { return this.member('execOrder', 'number', prm, 0); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
