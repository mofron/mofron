/**
 * @file ConfManager.js
 * @brief config manager for mofron modules. it suply accessor functions to object.
 * @license MIT
 */
const comutl = mofron.util.common;

module.exports = class {
    constructor () {
        try {
	    this.m_conf = {};
	    this.m_opt  = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    conf (key, val, opt) {
        try {
            if ("string" !== typeof key) {
                throw new Error("invalid parameter");
            }
            return (undefined === val) ? this.get(key,opt) : this.set(key, val, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    add (key, opt) {
        try {
	    if ( ("object" !== typeof opt) ||
	         (true === Array.isArray(opt)) ||
		 (true === comutl.isinc(opt, "Base")) ) {
                throw new Error("invalid parameter");
	    }
	    this.m_opt[key] = opt;
            if ("key-value" === opt.type) {
                this.m_conf[key] = {};
		return;
	    } else if (true === opt.list) {
                this.m_conf[key] = [];
		return;
	    }
	    if (undefined !== opt.init) {
                this.set(key, opt.init);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    get (key, opt) {
        try {
	    if (undefined === key) {
	        /* get all config */
		let ret = {};
		for (let cidx in this.m_conf) {
		    if (true === this.m_opt[cidx].private) {
                        continue;
		    }
		    ret[cidx] = this.m_conf[cidx];
                }
                return ret;
	    } else if ("string" !== typeof key) {
                throw new Error("invalid parameter");
	    }
	    let pvt = (undefined !== this.m_conf[key+"_private"]) ? true : false;
            if (('object' === typeof opt) && (undefined !== opt.private)) {
                pvt = opt.private;
	    }
	    /* return config */
	    let ret = (undefined !== this.m_conf[key]) ? this.m_conf[key] : null;
            if ( (null !== ret) && (true === pvt) ) {
                let pvt_ret = this.m_conf[key+"_private"];
	        if (true === this.m_opt[key].list) {
		    return pvt_ret.concat(ret);
		} else if ("key-value" === this.m_opt[key].type) {
                    Object.assign(ret, pvt_ret);
		}
	    }
            
            return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    chkValue (key, val) {
        try {
            let opt = this.m_opt[key];
	    if ((undefined === opt) || (undefined === opt.type)) {
                throw new Error("could not find :" + key);
	    }
            if ("color" === opt.type) {
	        let clr = comutl.getcolor(val)
	        return (null === clr) ? clr : clr.toString();
            } else if ("size" === opt.type) {
                comutl.getsize(val);
		return val;
            } else if ("event" === opt.type) {
	        if ((true !== Array.isArray(val)) || ("function" !== typeof val[0])) {
                    throw new Error('invalid parameter');
		}
		return val;
            } else if ("array" === opt.type) {
                if (false === Array.isArray(val)) {
                    throw new Error('invalid parameter');
                }
            } else if ("key-value" === opt.type) {
                if ( ("object" !== typeof val) ||
		     (true === Array.isArray(val)) ||
		     (true === comutl.isinc(val, "Base")) ) {
                    throw new Error('invalid parameter');
                }
            } else if ((true === comutl.isinc(val, 'Base')) && ('object' !== opt.type)) {
                if (false === comutl.isinc(val, opt.type)) {
                    throw new Error('invalid parameter');
                }
            } else if (opt.type !== typeof val) {
                throw new Error('invalid parameter');
            }
	    return val;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    set (key, val, opt) {
        try {
	    if ( ("string" !== typeof key) || (undefined === this.m_opt[key])) {
                throw new Error("invalid parameter");
            }
            if ( (true === this.m_opt[key].list) &&
	         (true === Array.isArray(val)) &&
		 ("array" !== this.m_opt[key].type) &&
		 ("event" !== this.m_opt[key].type) ) {
	        for (let vidx in val) {
                    this.set(key, val[vidx], opt);
		}
                return;
	    }
	    let set_val = this.chkValue(key, val);
            let set_key = key;
	    if ((undefined !== opt) && (true === opt.private)) {
                set_key = key + "_private";
		if (undefined === this.m_opt[set_key]) {
		    this.m_opt[set_key] = {};
		    /* initialize priavte key */
                    for (let opt_idx in this.m_opt[key]) {
                        this.m_opt[set_key][opt_idx] = this.m_opt[key][opt_idx];
		    }
		    this.m_opt[set_key].private = true;
                    if (undefined !== this.m_opt[set_key].init) {
                        this.m_conf[set_key] = this.m_opt[set_key].init;
		    } else if (true === this.m_opt[set_key].list) {
                        this.m_conf[set_key] = [];
		    } else if ("key-value" === this.m_opt[set_key].type) {
                        this.m_conf[set_key] = {};
		    }
		}
	    }

            if (true === this.m_opt[set_key].list) {
                this.m_conf[set_key].push(set_val);
            } else if ("key-value" === this.m_opt[set_key].type) {
	        for (let vidx in val) {
                    this.m_conf[set_key][vidx] = val[vidx];
		}
	    } else {
	        if (true === Array.isArray(this.m_opt[set_key].select)) {
		    let exs = false;
                    for (let sidx in this.m_opt[set_key].select) {
                        if (set_val === this.m_opt[set_key].select[sidx]) {
                            exs = true;
			    break;
			}
		    }
		    if (false === exs) {
                        throw new Error("invald parameter");
		    }
		}
                this.m_conf[set_key] = set_val;
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    options (key) {
        try {
            if (undefined !== key) {
                return this.m_opt[key];
            }
            return this.m_opt;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delete (key) {
        try {
            if ("string" !== typeof key) {
                throw new Error("invalid parameter");
            }
            delete this.m_conf[key];
	    this.add(key, this.m_opt[key]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
