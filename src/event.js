/**
 * @file event.js
 * @author simpart
 */

/**
 * @class mofron.event.Base
 * @brief base class of event
 */
mofron.event.Base = class {
    /**
     * initialize member
     *
     * @param fnc : (option) function for event listener
     * @param prm : (option) function parameter
     */
    constructor (fnc, prm) {
        try {
            var _fnc     = (fnc === undefined) ? null : fnc;
            this.target  = null;
            this.func    = null;
            this.parm    = null;
            if (null !== _fnc) {
                this.setEventFunc(_fnc, prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set event target component
     *
     * @param comp : component object
     */
    setTarget (comp) {
        try {
            if ('object' != (typeof comp)) {
                throw new Error('invalid parameter');
            }
            this.target = comp.getEventTgt();
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
    setEventFunc (fnc, prm) {
        try {
            var _fnc = (fnc === undefined) ? null : fnc;
            var _prm = (prm === undefined) ? null : prm;
            if (null === _fnc) {
                throw new Error('invalid parameter');
            }
            this.func = _fnc;
            this.parm = _prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event () {
        try {
            if ( (null === this.target) || (false === this.target.isRendered()) ) {
                throw new Error('target is not ready');
            }
            this.eventFunc();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * this is interface function.
     * extend class need implement this function.
     */
    eventFunc () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
