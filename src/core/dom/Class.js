/**
 * @file Class.js
 * @author simpart
 */
const DomConf = require("./DomConf.js");

module.exports = class extends DomConf {
    /**
     * initialize member
     *
     * @param tgt : (object) target adom object
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.modname('Class');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set (prm, opt) {
        try {
            if ( !( ("string" === typeof prm) || 
	            (true === Array.isArray(prm)) ) ) {
                throw new Error('invalid parameter');
	    }
	    let set_prm = {};
            if ("string" === typeof prm) {
                set_prm[prm] = "";
	    } else {
                for (let pidx in prm) {
		    if ("string" !== typeof prm[pidx]) {
                        throw new Error("invalid parameter");
		    }
                    set_prm[prm[pidx]] = "";
		}
	    }
            super.set(set_prm, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    get () {
        try {
	    let ret = [];
	    let cls = super.get();
	    for (let cidx in cls) {
                ret.push(cidx);
	    }
	    return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set class name to rowdom
     *
     * @param key : (string) style key
     * @param val : (string) style value
     */
    domSet (key, val) {
        try {
            this.dom().getRawDom().classList.add(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domRem (key) {
        try {
            this.dom().getRawDom().classList.remove(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get class name from rawdom
     *
     * @return (object) style contents
     * @return (string) style contents value
     */
    domGet () {
        try {
            let clnm    = this.dom().getRawDom().className;
            return ('string' === typeof clnm) ? clnm.split(' ') : null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toString () {
        try {
            let ret   = '';
            let conts = this.get();
            for (let idx in conts) {
                ret += conts[idx] + " ";
            }
            return ('' === ret) ? '' :  'class="' + ret.substring(0, ret.length-1) + '"';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
