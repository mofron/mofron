/**
 * @file event.js
 * @author simpart
 */

/**
 * @class mofron.event.Base
 * @brief base class of event
 */
mofron.Event = class extends mofron.CompConf {
    /**
     * initialize member
     *
     */
    constructor () {
        try {
            super();
            this.name('Event');
            this.m_effect  = new Array();
            this.m_handler = new Array();
            this.prmMap('handler');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set function for event listener
     *
     * @param fnc : (function) function for event listener
     * @param prm : (mixed) function parameter (option)
     */
    handler (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return this.m_handler;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_handler.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execHandler () {
        try {
            let hdl = this.handler();
            let prm = null;
            
            for (let hidx in hdl) {
                prm = new mofron.Param(this.component(), hdl[hidx][1]);
                prm.add(arguments);
                prm.exec(
                    { handler : hdl[hidx][0] },
                    'handler'
                );
            }
            
            this.execEffect_pri(arguments);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try { this.contents(this.component().eventTgt()); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    kickEffect (prm) {
        try {
            
            if (undefined === prm) {
                /* getter */
                return this.m_effect;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.kickEffect(prm[pidx]);
                }
                return;
            }
            if (true !== mofron.func.isInclude(prm, 'Effect')) {
                throw new Error('invalid parameter');
            }
            prm.suspend(true);
            this.m_effect.push(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execEffect_pri (prm) {
        try {
console.log(prm);
            let eff = this.kickEffect();
            for (let eidx in eff) {
                eff[eidx].suspend(false);
                this.execEffect(eff[eidx], prm);
                eff[eidx].suspend(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execEffect (eff, prm) {
        try { eff.execute(true); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
