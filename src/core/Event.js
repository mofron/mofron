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
            return this.confFunc(fnc, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            if (true !== this.ignore()) {
                this.eventConts(this.target().eventTgt());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * this is interface function.
     * extend class needs to implement this function.
     */
    eventConts (tgt) {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmOpt (po) {
        try {
            super.prmOpt(po);
            let prm = this.param();
            if (null !== prm) {
               if ('function' === typeof prm[0]) {
                   this.handler(
                       prm[0],
                       (1 < prm.length) ? prm[1] : undefined
                   );
               }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
