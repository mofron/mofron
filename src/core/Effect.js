/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.CompConf {
    
    constructor (po) {
        try {
            super();
            //this.m_init = true;
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
                        (0 !== prm.effect().length) ) {
                /* inheritanced speed */
                this.speed(prm.effect()[0].speed());
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute (flg) {
        try {
            if (undefined === flg) {
                /* called by init */
                if (true === this.isExecd()) {
                    /* since it has already executed, nothing to do. */
                    return;
                }
                if ('none' === this.component().adom().style('display')) {
                    /* initialize visible is false */
                    flg = false;
                } else {
                    flg = this.status();
                }
            } else if ('boolean' !== typeof flg) {
                throw new Error('invalid paramter');
            }
            
            if (null === this.component()) {
                /* this effect has already deleted, notihing to do. */
                return;
            }
            if (true === this.suspend()) {
                return;
            }
            
            this.isExecd(true);
            
            if ( (true === this.isFirst()) && (0 !== this.speed()) ) {
                this.setConf(true);
            }
            /* wait render */
            setTimeout(
                (eff) => {
                    try { eff.contents(flg, eff.component()); } catch (e) {
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
                        if ( (true === eff.isLast()) && (0 !== eff.speed()) ) {
                            eff.setConf(false);
                        }
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
        try { return this.member('speed', 'number', prm, 0);  } catch (e) {
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
    
    suspend (prm) {
        try { return this.member('suspend', 'boolean', prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
