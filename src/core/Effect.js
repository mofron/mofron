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
    
    /**
     * execute effect
     * 
     * @param p2 (function) simple call back
     */
    execute () {
        try {
            if (true === this.isSkipped(this.eid(), this.order())) {
                return;
            }
            
            /* execute effect */
            let exec = (exe_eff) => {
                try {
                    exe_eff.contents(exe_eff.component());
                    exe_eff.isInited(true);
                    /* execute callback */
		    mofron.func.effCallback(exe_eff, exe_eff.callback());
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            setTimeout(exec, this.delay() + 50, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    forcedExec () {
        try {
            let sus = this.suspend();
            this.suspend(false);
            this.execute();
            this.suspend(sus);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (eid, cmp) {}
    
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
     * @param p1 (array) [function, param, one time flag]
     */
    callback (prm, idx) {
        try {
            if ('function' === typeof prm) { 
                prm = [prm, null, false];
            } else if (true === Array.isArray(prm)) {
                if ('function' !== typeof prm[0]) {
                    throw new Error('invalid parameter');
                }
                if (2 === prm.length) {
                    prm.push(false);
                } else if ('boolean' !== typeof prm[2]) {
                    throw new Error('invalid parameter');
                }
            }
            return this.arrayMember(
                'callback',
                'object',
                ((undefined === prm) && (undefined === idx)) ? undefined : prm,
                idx
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delCallback (idx) {
        try {
            if ('number' !== typeof idx) {
                throw new Error('invalid parameter');
	    }
	    /* delete callback */
	    this.m_member['callback'].splice(idx, 1);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    isSkipped (eid, ord) {
        try {
            if ( (true === this.suspend()) ||
                 (eid !== this.eid()) || 
                 (ord !== this.order()) ) {
                return true;
            }
            return false;
        } catch (e) {
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
    
    eid (prm) {
        try { return this.member('eid', 'number', prm, 0); } catch (e) {
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
     * @return (number) effect speed
     */
    speed (prm) {
        try { return this.member('speed', 'number', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delay (prm, idx) {
        try { return this.member('delay', 'number', prm, 0); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
