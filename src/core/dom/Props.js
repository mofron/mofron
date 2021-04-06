/**
 * @file Props.js
 * @author simpart
 */
const DomConf = require("./DomConf.js");
const comutl = mofron.util.common;

module.exports = class extends DomConf {
    /**
     * initialize member
     *
     * @param tgt : (object) target dom object
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.modname('Prop');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    chkval (kv) {
        try {
            if ( !( ("object" === typeof kv) &&
                    (false === Array.isArray(kv)) &&
                    (false === comutl.isinc(kv,"Base")) ) ) {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * set property
     *
     * @param key : (string) property key
     * @param val : (string) property value
     */
    domSet (key, val) {
        try {
            if (undefined === this.dom().getRawDom()[key]) {
                throw new Error(key + ' is unknown property');
            }
            this.dom().getRawDom()[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domRem (key) {
        try {
            if (undefined === this.dom().getRawDom()[key]) {
                return;
            }
            delete this.dom().getRawDom()[key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get property value from rawdom
     *
     * @param key : (string) property key
     * @return (string) property value
     */
    domGet (key) {
        try {
            let ret = this.dom().getRawDom()[key];
	    return ("" === ret) ? undefined : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    toString () {
        try {
            return "";
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
