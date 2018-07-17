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
     * @param fnc : (option) function for event listener
     * @param prm : (option) function parameter
     */
    constructor (fnc, prm) {
        try {
            super();
            this.name('Event');
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
                return (undefined === this.m_handler) ? null : this.m_handler;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_handler) {
                this.m_handler = new Array(null,null);
            }
            this.m_handler[0] = fnc;
            this.m_handler[1] = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            this.contents(this.component().eventTgt());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmOpt (po, p1, p2, p3, p4) {
        try {
            super.prmOpt(po, p1, p2, p3, p4);
            let prm = this.param();
            if ((null !== prm) && ('function' === typeof prm[0])) {
                this.handler(
                    prm[0],
                    (1 < prm.length) ? prm[1] : undefined
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
