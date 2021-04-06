/**
 * @file ModConf.js
 * @brief module config interface for mofron component
 * @author simpart
 */
const Base = require("./Base.js");

module.exports = class extends Base {
    
    constructor (po) {
        try {
            super(po);
            this.modname('ModConf');
	    /* init config */
	    this.confmng().add("component", { type: "Component" });
	    this.confmng().add("tag", { type: "string" });
            this.confmng().add("isInited", { type: "boolean", init: false })
            this.confmng().add("suspend", { type: "boolean", init: false });
            this.confmng().add("innerTgt", { type: "boolean", init: true });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
	    return this.confmng("component", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        console.warn('not implement');
    }
    
    contents (p1) {
        console.warn('not implement');
    }
    
    tag (prm) {
        try {
	    return this.confmng("tag", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isInited (prm) {
        try {
	    return this.confmng("isInited", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    suspend (prm) {
        try {
	    return this.confmng("suspend", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    innerTgt (prm) {
        try {
            return this.confmng("innerTgt", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
