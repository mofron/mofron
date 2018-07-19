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
            if (false === mofron.func.isInclude(prm, 'Component') ) {
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
    
    value (p1, p2, p3, p4, p5) {
        try {
            if ( (undefined === p1) ||
                 (undefined === p2) ||
                 (undefined === p3) ||
                 (undefined === p4) ||
                 (undefined === p5) ) {
                /* getter */
                return (1 === super.param().length) ? super.param()[0] : super.param();
            }
            /* setter */
            super.param(new mofron.Param(p1, p2, p3, p4, p5));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
