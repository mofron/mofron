/**
 * @file event.js
 * @author simpart
 */

/**
 * @class mofron.event.Base
 * @brief base class of event
 */
mofron.Event = class extends mofron.Base {
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
            
            this.m_target  = null;
            this.m_evtfunc = new Array(
                                 null,  /* function */
                                 null   /* parameter */
                             );
            
            if (undefined !== fnc) {
                this.eventFunc(fnc,prm);
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
    target (comp) {
        try {
            if (undefined === comp) {
                /* getter */
                return this.m_target;
            }
            /* setter */
            if ((null === comp) || ('object' !== (typeof comp))) {
                throw new Error('invalid parameter');
            }
            this.m_target = comp;
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
    eventFunc (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return this.m_evtfunc;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_evtfunc[0] = fnc;
            this.m_evtfunc[1] = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event () {
        try {
            if ( (null === this.target()) || (false === this.target().isRendered()) ) {
                throw new Error('target is not ready');
            }
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
    eventConts () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
