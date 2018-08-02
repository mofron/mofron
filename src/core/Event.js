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
                return [
                    (undefined === this.m_handler) ? null : this.m_handler,
                    this.handlerPrm()
                ];
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_handler = fnc;
            if (undefined !== prm) {
                this.handlerPrm(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    handlerPrm (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_hdlprm;
            }
            /* setter */
            this.m_hdlprm = prm;
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
    
}
/* end of file */
