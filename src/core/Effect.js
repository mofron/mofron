/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.CompConf {
    
    constructor (po) {
        try {
            super();
            this.name('Effect');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            let ret = super.component(prm);
            if ( (0 !== this.speed()) && (undefined !== prm) ) {
                /* update effect speed */
                let eff = prm.effect();
                for (let eidx in eff) {
                    eff[eidx].speed(this.speed());
                }
            } else if ( (0 === this.speed()) &&
                        (undefined !== prm)  &&
                        (0 !== prm.effect().length) &&
                        (0 !== prm.effect()[0].speed())  ) {
                /* inheritanced speed */
                this.speed(prm.effect()[0].speed());
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute (cflg, scb, iflg) {
        try {
            this.initConf(iflg);
            if (true === this.isSkipped(cflg)) {
                return;
            }
            if (undefined === cflg) {
                let disp = this.component().adom().style('display');
                cflg = ('none' === disp) ? false : this.status();
            }
            
            this.isExecd(true);
            
            /* wait render */
            setTimeout(
                (eff) => {
                    try { eff.contents(cflg, eff.component()); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }, 50, this
            );
            
            /* execute inner callback */
            this.setIcbid();
            setTimeout(
                (eff, id) => {
                    try {
                        if (id < eff.getIcbid()) {
                            /* skip inner callback for avoid redundant */
                            return;
                        }
                        /* simple callback */
                        if (null != scb) {
                            if ('function' === typeof scb) {
                                scb(eff.component());
                            } else if (true === Array.isArray(scb)) {
                                scb[0](eff.component(), scb[1]);
                            }
                        }
                        
                        /* common callback */
                        if (null != eff.callback()) {
                            eff.callback()[0](eff.callback()[1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this.speed() * 1000 + 50,
                this,
                this.getIcbid()
            );
            
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
            this.suspend(sus);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setConf (en) {
        try {
            if ('boolean' !== typeof en) {
                throw new Error('invalid paramter');
            }
            var adom = this.component().adom();
            if (true === en) {
                adom.style({
                    '-webkit-transition' : ((1000 * this.speed())) + 'ms all linear 0s',
                    '-moz-transition'    : 'all ' + ((1000 * this.speed())) + 'ms',
                    '-ms-transition'     : 'all ' + ((1000 * this.speed())) + 'ms',
                    '-o-transition'      : 'all ' + ((1000 * this.speed())) + 'ms',
                    'transtion'          : ((1000 * this.speed())) + 'ms all linear 0s'
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
    
    initConf (iflg) {
        try {
            if ( ((true === this.isFirst()) && (0 !== this.speed())) ||
                 (true !== iflg) ) {
                this.setConf(true);
            }
            if ( (true === this.isLast()) || (true !== iflg) ) {
                setTimeout(
                    (p1) => {
                        try { p1.setConf(false); } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    this.speed() * 1000 + 50,
                    this
                );
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
    
    speed (prm) {
        try {
            if ( (undefined !== prm) && (null !== this.component()) ) {
                /* setter */
                let eff = this.component().effect();
                for (let eidx in eff) {
                    if (prm !== eff[eidx].speed()) {
                        eff[eidx].setSpeed(prm);
                    }
                }
            }
            return this.member('speed', 'number', prm, 0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSpeed (prm) {
        try { this.member('speed', 'number', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isFirst () {
        try {
            let eff = this.component().effect();
            for (let eidx in eff) {
                if (this.getId() === eff[eidx].getId()) {
                    return (0 == eidx) ? true : false;
                }
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isLast () {
        try {
            let eff = this.component().effect();
            for (let eidx in eff) {
                if (this.getId() === eff[eidx].getId()) {
                    return ((eff.length-1) == eidx) ? true : false;
                }
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSkipped (flg) {
        try {
            if (undefined === flg) {
                if (true === this.isExecd()) {
                    /* since it has already executed, nothing to do. */
                    return true;
                }
                let disp = this.component().adom().style('display');
                flg = ('none' === disp) ? false : this.status(); 
            }
            
            if ('boolean' !== typeof flg) {
                throw new Error('invalid paramter');
            }
            
            if ( ((true === flg) && (true === this.suspend()[0])) ||
                 ((false === flg) && (true === this.suspend()[1])) ) {
                return true;
            }
            
            if (null === this.component()) {
                /* this effect has already deleted, notihing to do. */
                return true;
            }
            return false;
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
    
    suspend (flg, dis) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_suspend) ? [false, false] : this.m_suspend;
            }
            /* setter */
            if (undefined === this.m_suspend) {
                this.m_suspend = [false, false];
            }
            if (true === Array.isArray(flg)) {
                if ( ('boolean' !== typeof flg[0]) ||
                     ('boolean' !== typeof flg[1]) ) {
                    throw new Error('invalid parameter');
                }
                this.m_suspend = [flg[0], flg[1]];
            }
            
            if ( ('boolean' === typeof flg) && (undefined === dis) ) {
                this.m_suspend = [flg, flg];
            } else {
                if ('boolean' === typeof flg) {
                    this.m_suspend[0] = flg;
                }
                if ('boolean' === typeof dis) {
                    this.m_suspend[1] = dis;
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
