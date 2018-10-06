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
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_comp) ? null : this.m_comp;
            }
            /* setter */
            if ( (null !== prm) && (true !== mofron.func.isInclude(prm, 'Component'))  ) {
                throw new Error('invalid parameter');
            }
            this.m_comp = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        console.warn('not implement');
    }
    
    contents (p1, p2) {
        console.warn('not implement');
    }
    
    prmMap () {
        try {
            if (0 === arguments.length) {
                /* getter */
                return (undefined === this.m_prmmap) ? [] : this.m_prmmap;
            }
            /* setter */
            this.m_prmmap = new Array();
            for (let idx in arguments) {
                this.m_prmmap.push(arguments[idx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
