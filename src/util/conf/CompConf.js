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
    
    param (prm, pflg) {
        try {
            let ret = super.param(prm, pflg);
            if (undefined === ret) {
                let chk_prm = this.param();
                let prm_map = this.prmMap();
                
                if (chk_prm.length > prm_map.length) {
                    throw new Error('mismatch parameter check count');
                }
                let obj = this;
                for (let cidx in chk_prm) {
                    if ('function' !== typeof obj[prm_map[cidx]]) {
                        throw new Error('could not find method');
                    }
                    obj[prm_map[cidx]](chk_prm[cidx]);
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmMap () {
        try {
            if (0 === arguments.length) {
                /* getter */
                return (undefined === this.m_prmmap) ? [] : this.m_prmmap;
            }
            /* setter */
            if (undefined === this.m_prmmap) {
                this.m_prmmap = new Array();
            }
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
