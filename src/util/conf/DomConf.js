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
            
            this.m_target  = null;
            this.m_protect = null;
            this.m_conts   = {};
            
            this.target(tgt);
            this.protect(false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                return this.m_target;
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
            if (undefined === kv) {
                throw new Error('invalid parameter');
            }
            if ('object' !== typeof kv) {
                throw new Error('invalid parameter');
            }
            
            for (var idx in kv) {
                if ( (true      === this.protect())   &&
                     (undefined !== this.m_conts[idx]) ) {
                    return;
                }
                this.m_conts[kv] = kv[idx];
                if (true === this.target().isPushed()) {
                    /* target is already rendered */
                    this.rset(idx, kv[idx]);
                }
            }
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
                return this.rget();
            }
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
                return this.m_protect;
            }
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