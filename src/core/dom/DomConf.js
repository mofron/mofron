/**
 * @file DomConf.js
 * @author simpart
 */
const Base = require("../Base.js");
const comutl = mofron.util.common;

module.exports = class extends Base {
    
    constructor (dom) {
        try {
            super();
            this.modname("DomConf");
            
	    this.confmng().add("lock", { type: "key-value" });
	    this.confmng().add("dom", { type: "Dom" });
            this.confmng().add("listener", { type: "array", list: true });
            
            this.dom(dom);
            this.m_conts = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dom (prm) {
        try {
	    return this.confmng("dom", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    lock (key, val) {
        try {
	    let lock = this.confmng().get("lock");
            if (undefined === val) {
	        /* getter */
		return (undefined === lock[key]) ? false : lock[key];
	    }
	    /* setter */
	    if ("boolean" !== typeof val) {
                throw new Error("invalid parameter");
	    }
            lock[key] = val;
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
            for (let key in kv) {
                if ( (null !== kv[key]) &&
                     ("object" === typeof kv[key]) ) {
                    throw new Error("invalid parameter");
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set (kv, opt) {
        try {
	    this.chkval(kv);
	    let p_opt = (undefined === opt) ? {} : opt;
	    let lis   = [];
            for (let key in kv) {
	        let old_kv = {};
		let new_kv = {};
	        old_kv[key] = (undefined === this.m_conts[key]) ? null : this.m_conts[key];
		new_kv[key] = kv[key];
	        if (null === kv[key]) {
                    /* delete config */
		    this.rem(key);
		    lis = this.listener(key);
		    for (let lidx in lis) {
                        lis[lidx][0](this.dom(),[new_kv[key],old_kv[key]], lis[lidx][1]);
		    }
		    if (true === p_opt.lock) {
                        this.lock(key, true);
		    }
		    continue;
		}
                /* setter */
                if (true === p_opt.passive) {
                    if (null === this.get(key)) {
                        this.m_conts[key] = kv[key];
		    } else {
                        continue;
		    }
		} else if (true === p_opt.forced) {
                    this.m_conts[key] = kv[key];
		    this.lock(key, false);
		} else {
                    if (true === this.lock(key)) {
                        continue;
		    }
		    this.m_conts[key] = kv[key];
		}
		if (true === p_opt.lock) {
                    this.lock(key, true);
		}
                
		if (true === this.dom().isPushed()) {
		    /* target dom is already rendered */
                    this.domSet(key, kv[key]);
                }
		lis = this.listener(key);
		for (let lidx2 in lis) {
                    lis[lidx2][0](this.dom(),[new_kv[key],old_kv[key]],lis[lidx2][1]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    get (key) {
        try {
            if (false === this.dom().isPushed()) {
                if (undefined === key) {
                    return this.m_conts;
                }
                return (undefined === this.m_conts[key]) ? null : this.m_conts[key];
            } else {
                /* target is already rendered */
                return (undefined == this.domGet(key)) ? null : this.domGet(key);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rem (key) {
        try {
            if (undefined !== this.m_conts[key]) {
                delete this.m_conts[key];
            }
            if (true === this.dom().isPushed()) {
                 /* target dom is already rendered */
                 this.domRem(key);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domRem (key) {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domSet (key, val) {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    domGet (key) {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    listener (key, fnc, prm) {
        try {
	    if (undefined === fnc) {
	        /* getter */
		let lis = this.confmng("listener");
		if (undefined === key) {
                    return lis;
		}
		let ret = [];
		for (let lidx in lis) {
                    if (key === lis[lidx][0]) {
                        ret.push([lis[lidx][1],lis[lidx][2]]);
		    }
		}
		return ret;
	    }
	    if (("string" !== typeof key) || ("function" !== typeof fnc)) {
                throw new Error("invalid parameter");
	    }
	    this.confmng("listener", [key, fnc, prm]);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
}
/* end of file */
