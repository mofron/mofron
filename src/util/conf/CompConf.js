/**
 * @file CompConf.js
 * @author simpart
 */
/**
 * @class CompConf
 * @brief Interface of Component Config
 */
mofron.CompConf = class extends mofron.Base {
    
    constructor (po) {
        try {
            super(po);
            this.name('CompConf');
            this.m_func = new Array(null, null);
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
            if (false === mofron.func.isInclude(tgt, 'Component') ) {
                throw new Error('invalid parameter');
            }
            this.m_target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        console.warn('not implement');
    }
    
    confFunc (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return this.m_func;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_func[0] = fnc;
            this.m_func[1] = (undefined === prm) ? null : prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    ignore (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_cpcf_ign) ? false : this.m_cpcf_ign;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_cpcf_ign = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_value) ? null : this.m_value;
            }
            this.m_value = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
