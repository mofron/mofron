/**
 * @file CompConf.js
 * @author simpart
 */

/**
 * @class CompConf
 * @brief Interface of Component Config
 */
mofron.CompConf = class extends mofron.Base {
    
    constructor (prm_opt) {
        try {
            super();
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
}
/* end of file */
