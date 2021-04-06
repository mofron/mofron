/**
 * @file Attrs.js
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
            this.modname('Attrs');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set style
     *
     * @param key : (string) style key
     * @param val : (string) style value
     */
    domSet (key, val) {
        try {
            this.dom().getRawDom().setAttribute(key, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domRem (key) {
        try {
            this.dom().getRawDom().removeAttribute(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get attribute value from rawdom
     *
     * @param key : (string) style key
     * @return (object) style contents
     * @return (string) style contents value
     */
    domGet (key) {
        try {
            return this.dom().getRawDom().getAttribute(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toString () {
        try {
            let ret   = '';
	    let conts = this.get();
            for (let cidx in conts) {
                ret += (null === conts[cidx]) ? cidx : cidx + '="' + conts[cidx] + '"';
		ret += " ";
            }
            return ("" === ret) ? "" : ret.substring(0, ret.length-1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
