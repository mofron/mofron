/**
 * @file DomConf.js
 * @author simpart
 */

/**
 * @class DomConf
 * @brief key-val manage for dom object
 */
mofron.DomConf = class extends mofron.Base {
    
    constructor (tgt) {
        try {
            super();
            this.name('DomConf');
            this.m_conts   = {};
            this.target(tgt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                return (undefined === this.m_target) ? null : this.m_target;
            }
            /* setter */
            if (false === mofron.func.isInclude(tgt, 'Dom')) {
                throw new Error('invalid parameter');
            }
            this.m_target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set (kv) {
        try {
            if ( (undefined === kv) ||
                 ('object' !== typeof kv) ) {
                throw new Error('invalid parameter');
            }
            
            let ret = {};
            for (var idx in kv) {
                if ( ((true === this.protect()) && (undefined !== this.m_conts[idx])) ||
                     (kv[idx] === this.m_conts[idx])  ) {
                    continue;
                }
                
                if (null !== kv[idx]) {
                    /* set config */
                    this.m_conts[idx] = kv[idx];
                } else {
                    /* delete config */
                    if (undefined !== this.m_conts[idx]) {
                        delete this.m_conts[idx];
                    }
                }
                if (true === this.target().isPushed()) {
                    /* target is already rendered */
                    if (null !== kv[idx]) {
                        this.rset(idx, kv[idx]);
                    } else {
                        this.rrem(idx);
                    }
                }
                ret[idx] = kv[idx];
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    get (key) {
        try {
            if (false === this.target().isPushed()) {
                if (undefined === key) {
                    return this.m_conts;
                }
                return (undefined === this.m_conts[key]) ? null : this.m_conts[key];
            } else {
                 /* target is already rendered */
                return (undefined == this.rget(key)) ? null : this.rget(key);
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
            if (true === this.target().isPushed()) {
                 /* target is already rendered */
                 this.rrem(key);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rrem () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rset () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rget () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    protect (prt) {
        try {
            if (undefined === prt) {
                /* getter */
                return (undefined === this.m_protect) ? false : this.m_protect;
            }
            /* setter */
            if ('boolean' !== typeof prt) {
                throw new Error('invalid parameter');
            }
            this.m_protect = prt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
