/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.CompConf {
    
    constructor (po) {
        try {
            super();
            this.name('Effect');
            this.m_execonf = {};
            /* set initial config */
            this.speed([0, 0]);
            this.delay([0, 0]);
            this.suspend([false, false]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initFlag (prm) {
        try { return this.member('initFlag', 'boolean', prm, true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined !== prm) {
                mofron.func.updSpeed(prm, this);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute effect
     * 
     * @param p1 (number) execute group index
     * @param p2 (function) simple call back
     * @param p3 
     */
    execute (gidx, scb) {
        try {
            if (true === this.initSkip()) {
                /* this effect is skipped */
                return;
            }
            
            mofron.func.confSpeed(this, this.speed()[gidx]);
            //this.confSpeed(this.speed()[eidx]);
            
            /* callback before execute */
            let bf = this.beforeEvent();
            for (let bidx in bf) {
                bf[bidx][0](this, gidx, bf[bidx][1]);
            }
            
            /* execute effect */
            setTimeout(
                (tdp1) => {
                    try { tdp1.contents(gidx, tdp1.component()); } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this.delay()[gidx] + 50, // 50ms wait for render
                this
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    forcedExec (flg, scb) {
        try {
            let sus = this.suspend();
            this.suspend(false);
            this.execute(flg, scb, false);
            this.suspend(sus[0], sus[1]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (eid, cmp) {
        try {
            //(true === flg) ? this.enable(cmp) : this.disable(cmp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeEvent (fnc, prm) {
        try {
            return this.arrayMember(
                'beforeEvent',
                'object',
                ('function' === typeof fnc) ? [fnc, prm] : undefined
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * 
     */
    callback (fnc, prm, ot) {
        try {
            return this.arrayMember(
                'callback',
                'object',
                ('function' === typeof fnc) ? [fnc, prm, ot] : undefined
            );
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
        try { return this.m_icbstk.length; } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute order number setter/getter
     *
     * @param p1 (number) execute order number
     * @param p1 (undefined) call as getter
     * @return (number) execute order number
     */
    order (prm) {
        try { return this.member('order', 'number', prm, 0); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initSkip (prm) {
        try { return this.member('initSkip', 'boolean', prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** default execute config ***/
    /**
     * effect speed setter/getter
     *
     * @param p1 (number) effect speed
     * @param p1 (undefined) call as getter
     * @param p2 (number) target exec-index
     * @return (array) effect speed list
     * @return (number) effect speed
     */
    speed (prm, idx) {
        try { return this.execConfig('speed', 'number', prm, idx); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    suspend (prm, idx) {
        try { return this.execConfig('suspend', 'boolean', prm, idx); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delay (prm, idx) {
        try { return this.execConfig('delay', 'number', prm, idx); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /* enable/disable config interface */
    execConfig (nm, tp, prm, idx) {
        try {
            if ('string' !== typeof nm) {
                throw new Error('invalid parameter');
            }
            
            if (undefined === prm) {
                /* getter */
                return ('number' === typeof idx) ? this.m_execonf[nm][idx] : this.m_execonf[nm];
            }
            /* setter */
            if (undefined === this.m_execonf[nm]) {
                this.m_execonf[nm] = [undefined, undefined];
            }
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.execConfig(nm, tp, prm[pidx], parseInt(pidx));
                }
                return;
            }
            
            /* check type */
            if (tp !== typeof prm) {
                throw new Error('invalid parameter');
            }
            
            if (undefined === idx) {
                /* set parameter to all elements */
                for (let ex_idx in this.m_execonf[nm]) {
                    this.m_execonf[nm][ex_idx] = prm;
                }
            } else {
                /* set parameter to target element */
                if (idx+1 > this.m_execonf[nm].length) {
                    for (let add_idx=this.m_execonf[nm].length; add_idx < (idx+1) ;add_idx++) {
                        this.m_execonf[nm].push(null);
                    }
                }
                this.m_execonf[nm][idx] = prm;
                if (undefined === this.speed()[idx]) {
                    this.speed(0, idx);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
