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
            
            if ('function' === typeof fnc) {
                this.handler(fnc,prm);
            } else {
                this.prmOpt(fnc);
            }
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
            this.eventConts(this.target().eventTgt());
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
}
