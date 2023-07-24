/**
 * @file  Base.js
 * @brief basement class of mofron
 * @author simpart
 */
const comutl      = mofron.util.common;
const ConfManager = require("./ConfManager.js");

let genid = () => {
    try {
        let ret_id = '_';
        let loop   = 0;
        let val    = 0;
        for (loop = 0; loop < 8; loop++) {
            val = Math.random() * 16 | 0;
            ret_id += (loop == 12 ? 4 : loop == 16 ? val & 3 | 8 : val).toString(16);
        }
        return ret_id;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}

module.exports = class {
    constructor () {
        try {
	    this.m_confmng = new ConfManager();
            /* init config */
            this.confmng().add("name",      { type: "string",    private: true });
	    this.confmng().add("modname",   { type: "string",    private: true, list: true });
            this.confmng().add("id",        { type: "string",    private: true, init: genid() });
            this.confmng().add("data",      { type: "key-value", private: true });
            this.confmng().add("shortForm", { type: "array",     private: true, init: [] });
            
            this.modname("Base");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * config manager
     * 
     * @param (string) config key
     * @param (mixed) config data
     * @param (mixed) config option
     * @return (mixed) config data
     */
    confmng (key, val, opt) {
        try {
            return (undefined === key) ? this.m_confmng : this.m_confmng.conf(key, val, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * object name setter/getter
     * 
     * @param (string) object name
     * @return (string) object name
     */
    name (key) {
        try {
            if (undefined !== key) {
                mofron.objkey[key] = this;
            }
            return this.confmng("name", key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * module name setter / getter
     *
     * @param (string) module name
     * @return (string) module name
     */
    modname (prm) {
        try {
	    let ret = this.confmng("modname", prm);
	    return (undefined !== ret) ? ret[ret.length-1] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * module id getter
     * 
     * @return (string) module id
     */
    id () {
        try {
	    return this.confmng().get("id");
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    /**
     * data buffer
     * 
     * @param (string) buffer key
     * @param (mixed) buffer data
     *                undefined: call as getter
     * @return (mixed) buffer data
     */
    data (key, val) {
        try {
            if ("string" !== typeof key) {
                throw new Error("invalid parameter");
	    }
	    let dat = this.confmng().get("data");
            if (undefined === val) {
                /* getter */
		return (undefined === dat[key]) ? null : dat[key];
	    }
            /* setter */
	    dat[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * short form parameter setter/getter
     * 
     * @param (string) 
     */
    shortForm () {
        try {
	    if (0 === arguments.length) {
                return this.confmng().get("shortForm");
	    }
            let val = [];
	    for (let aidx in arguments) {
                val.push(arguments[aidx]);
	    }
	    this.confmng("shortForm", val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute config
     * 
     * @param (mixed) config data
     * @return (mixed) config list
     */
    config () {
        try {
	    /* get argument */
 	    if (0 === arguments.length) {
                /* getter */
                let cnf_ret = this.confmng().get();
		//delete cnf_ret.style;
		return cnf_ret;
            }

	    let arg = new mofron.class.ConfArg();
	    arg.param(arguments);
            /* setter */
	    if ((1 === arguments.length) && (comutl.isinc(arguments[0],"ConfArg"))) {
	        arguments[0].exec(this,this.shortForm());
	    } else if ( (1 < arg.param().length) ||
	         !( ("object" === typeof arguments[0]) &&
		    (false === Array.isArray(arguments[0])) &&
		    (false === comutl.isinc(arguments[0], "Base")) ) ) {
                /* short form */
                arg.exec(this, this.shortForm());
	    } else {
                /* config */
                for (let cf_idx in arguments[0]) {
                    if ("function" !== typeof this[cf_idx]) {
                        console.warn("invalid function: " + cf_idx);
			continue;
		    }
                    if (true !== comutl.isinc(arguments[0][cf_idx], "ConfArg")) {
                        this[cf_idx](arguments[0][cf_idx]);
		    } else {
                        arguments[0][cf_idx].exec(this, cf_idx);
		    }
		}
	    }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
}
/* end of file */
