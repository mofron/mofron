/**
 * @file  Size.js
 * @brief size data type
 * @author simpart
 */
const Base = require("../../core/Base.js");

/**
 * @class Size
 * @brief Size Defined Class
 */
module.exports = class extends Base {
    /**
     *
     */
    constructor (siz, tp) {
        try {
            super();
            this.modname('Size');
            
            this.confmng().add("type", { type: "string", init: "" });
            this.confmng().add("value", { type: "number", init: 0 });
            this.confmng().add("option", { type: "object", init: {} });
            
            if ( ('number' === typeof siz) && ('string' === typeof tp) ) {
                this.value(siz);
                this.type(tp);
            } else {
	        throw new Error("invalid parameter");
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    type (prm) {
        try {
	    return this.confmng("type", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try {
	    return this.confmng("value", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    option (prm) {
        try {
	    return this.confmng("option", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toStyle () {
        try {
	    return [this.toString(), this.option()];
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toString () {
        try {
            return (null === this.type()) ? null : this.value() + this.type(); 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toPixel () {
        try {
            throw new Error("not supported");
	} catch (e) {
            throw e;
	}
    }
}
/* end of file */
