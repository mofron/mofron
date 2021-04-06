/**
 * @file pullConf.js
 * @brief pull type config argument class
 * @author simpart
 */
const ConfArg   = require("./ConfArg.js");
const comutl = mofron.util.common;

module.exports = class extends ConfArg {
    constructor (prm) {
        try {
	    if ( !( ('object' === typeof prm) &&
	            (false === Array.isArray(prm)) &&
		    (false === comutl.isinc(prm, "Base")) ) ) {
                throw new Error("invalid parameter");
	    }
	    super(prm);
	    this.modname("PullConf");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    exec (tgt, fnc) {
        try {
	    tgt[fnc]().config(this.param()[0]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
