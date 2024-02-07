/**
 * @file Style.js
 * @author simpart
 */
const DomConf = require("./DomConf.js");

module.exports = class extends DomConf {
    /**
     * initialize member
     *
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.modname('Style');
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
            this.dom().getRawDom().style[getcamel(key)] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get style value from rawdom
     *
     * @param key : (string) style key
     * @return (object) style contents
     * @return (string) style contents value
     */
    domGet (key) {
        try {
            if (undefined === key) {
	        let ret   = {};
		let style = this.dom().getRawDom().style;
		for (let sidx in style) {
                    if ( ("" !== style[sidx]) &&
		         (null !== style[sidx]) &&
			 ('function' !== typeof style[sidx]) ) {
                        ret[sidx] = style[sidx];
		    }
		}
                return ret;
            }
            let val = this.dom().getRawDom().style[getcamel(key)];
            return ((undefined === val) || ("" === val)) ? null : val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domRem (key) {
        try {
            this.dom().getRawDom().style[getcamel(key)] = "";
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
                ret += cidx + ':' + conts[cidx] + ';';
            }
	    return ('' === ret) ? '' : 'style="' + ret + '"';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}

let getcamel = (prm) => {
    try {
        if ('string' !== (typeof prm)) {
            throw new Error('invalid parameter');
        }
        if ( (prm.length-1) === prm.lastIndexOf('-') ) {
            throw new Error('invalid parameter');
        }
        var skip = false;
        if (0 === prm.indexOf('-')) {
            skip = true;
        }
        var ret_val = prm;
        var ret_buf = null;
        var up_str  = null;
        var idx     = null;
        while(true) {
            idx = ret_val.indexOf('-');
            if (-1 === idx) {
                break;
            }
            up_str   = ret_val.charAt(idx+1).toUpperCase();
            ret_buf  = ret_val.substr(0, idx);
            if (true === skip) {
                skip = false;
                ret_val  = ret_buf + ret_val.substr(idx+1);
            } else {
                ret_val  = ret_buf + up_str + ret_val.substr(idx+2);
            }
        }
        return ret_val;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}
/* end of file */
