/**
 * @file event.js
 * @author simpart
 */
const ModConf = require("../core/ModConf.js");
const comutl  = mofron.util.common;

module.exports = class extends ModConf {
    /**
     * initialize member
     *
     */
    constructor () {
        try {
            super();
            this.modname('Event');
            this.shortForm('listener');
            
            this.confmng().add("listener", { type: "event", list: true });
            this.confmng().add("eid", { type: "number" });
            
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
    listener (fnc, prm) {
        try {
	    return this.confmng(
	        "listener", (undefined === fnc) ? undefined : [fnc,prm]
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execListener (eprm) {
        try {
            if (true === this.suspend()) {
                return;
            }
            let lis = this.listener();
            let prm = null;
            for (let lidx in lis) {
                lis[lidx][0](this.component(), eprm, lis[lidx][1]);
            }
	    /* execute effect */
	    if (null !== this.eid()) {
                this.component().execEffect(this.eid());
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            this.initevt();
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initevt () {
        try {
            if (false === this.isInited()) {
                this.contents(this.component().eventDom());
                this.isInited(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    eid (prm) {
        try {
            return this.confmng("eid", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
