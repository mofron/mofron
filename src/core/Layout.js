/**
 * @file layout/Base.js
 * @brief Base class of layout
 */

mofron.Layout = class extends mofron.CompConf {
    constructor (po) {
        try {
            super();
            this.name('Layout');
            this.m_execnt = 0;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            //if (true === this.ignore()) {
            //    return;
            //}
            var cmp_chd = this.component().child();
            var _idx    = null;
            let skip_flg = false;
            for (var idx in cmp_chd) {
                _idx = parseInt(idx);
                if (_idx < this.m_execnt) {
                    continue;
                }
                /* check skip */
                let skip = this.skipTarget();
                skip_flg = false;
                for (let sidx in skip) {
                    if (cmp_chd[_idx].getId() === skip[sidx]) {
                        skip_flg = true;
                        break;
                    }
                }
                
                if (false === skip_flg) {
                    this.contents(_idx, cmp_chd[_idx]);
                }
                this.m_execnt++;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    //contents (idx, tgt) {
    //    console.warn('layout is not implements');
    //}
    
    skipTarget (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_skip_tgt) ? [] : this.m_skip_tgt;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let sidx in prm) {
                    this.skipTarget(prm[sidx]);
                }
                return;
            } else if (true === mofron.func.isInclude(prm,'Component')) {
                if (undefined === this.m_skip_tgt) {
                    this.m_skip_tgt = new Array();
                }
                this.m_skip_tgt.push(prm.getId());
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
