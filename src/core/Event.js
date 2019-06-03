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
    
    component (prm) {
        try {
            if (undefined !== prm) {
                let kick_eff = this.kickEffect();
                for (let kidx in kick_eff) {
                    if (null === kick_eff[kidx].component()) {
                        kick_eff[kidx].execOption({ suspend : true });
                        prm.effect([ kick_eff[kidx] ]);
                    }
                }
            }
            return super.component(prm);
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
    
    execHandler (ep) {
        try {
            if (true === this.suspend()) {
                return;
            }
            
            let hdl = this.handler();
            let prm = null;
            
            for (let hidx in hdl) {
                prm = new mofron.Param(
                    this.component(),
                    ep,
                    (undefined === hdl[hidx][1]) ? undefined : hdl[hidx][1]
                );
                prm.exec(
                    { handler : hdl[hidx][0] },
                    'handler'
                );
            }
            
            let eff = this.kickEffect();
            for (let eidx in eff) {
                this.execEffect(eff[eidx], ep);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            if (false === this.isInited()) {
                this.contents(this.component().eventTgt());
                this.isInited(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    kickEffect (prm) {
        try { return this.arrayMember('kickEffect', 'Effect', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execEffect (eff, prm) {
        try {
            if ("boolean" !== typeof prm) {
                console.warn("execute effect is not implements");
                return;
            }
            if ( (true === prm) && (0 === eff.eid()) ) {
                eff.forcedExec();
            } else if ( (false === prm) && (1 === eff.eid()) ) {
                eff.forcedExec();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
