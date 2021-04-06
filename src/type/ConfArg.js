/**
 * @file ConfArg.js
 * @brief config argument class
 * @author simpart
 */
const Base   = require("../core/Base.js");
const comutl = mofron.util.common;

module.exports = class extends Base {
    constructor () {
        try {
	    super();
	    this.modname("ConfArg");
	    this.param(arguments);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    exec (tgt, fnc) {
        try {
	    let arg = this.param();
            if (true === Array.isArray(fnc)) {
	        if (1 === fnc.length) {
                    this.exec(tgt, fnc[0]);
		} else {
                    if (fnc.length < arg.length) {
                        throw new Error("mismatched config count");
		    }
		    for (let aidx in arg) {
		        if ("function" !== typeof tgt[fnc[aidx]]) {
                            console.warn("invalid config: " + fnc[aidx]);
			    continue;
			}
                        if (true === comutl.isinc(arg[aidx],"ConfArg")) {
                            arg[aidx].exec(tgt, fnc[aidx]);
			} else {
                            tgt[fnc[aidx]](arg[aidx]);
			}
		    }
		}
                return;
	    } else if ("string" === typeof fnc) {
	        if ("function" !== typeof tgt[fnc]) {
                    console.warn("invalid config: " + fnc);
                    return;
		}
                if (0 === arg.length) {
                    tgt[fnc]();
                } else if (1 === arg.length) {
                    tgt[fnc](arg[0]);
                } else if (2 === arg.length) {
                    tgt[fnc](arg[0], arg[1]);
                } else if (3 === arg.length) {
                    tgt[fnc](arg[0], arg[1], arg[2]);
                } else if (4 === arg.length) {
                    tgt[fnc](arg[0], arg[1], arg[2], arg[3]);
                } else {
                    tgt[fnc](arg[0], arg[1], arg[2], arg[3], arg[4]);
                }
	    } else {
                throw new Error("invalid parameter");
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    param (prm) {
        try {
	    if (undefined === prm) {
                /* getter */
		if (undefined === this.m_param) {
                    throw new Error("could not find param");
                }
                return this.m_param;
	    }
	    /* setter */
            if ("object" !== typeof prm) {
                throw new Error("invalid parameter");
	    }

            let arg = [];
            let hit = false;
            for (let pidx=prm.length; pidx >= 0 ; pidx--) {
                if (true === hit) {
                    arg.unshift(prm[pidx]);
                } else if (undefined !== prm[pidx]) {
                    arg.unshift(prm[pidx]);
                    hit = true;
                }
            }
            this.m_param = arg;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    addParam (prm) {
        try {
	    this.m_param.push(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
