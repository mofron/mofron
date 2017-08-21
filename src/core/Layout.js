/**
 * @file layout/Base.js
 * @brief Base class of layout
 */

mofron.Layout = class extends mofron.CompConf {
    constructor (po) {
        try {
            super(po);
            this.name('Layout');
            this.m_execnt = 0;
            this.execPrmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            var tgt_chd = this.target().child();
            var _idx    = null;
            for (var idx in tgt_chd) {
                _idx = parseInt(idx);
                if (_idx < this.m_execnt) {
                    continue;
                }
                
                this.layoutConts(_idx, tgt_chd[_idx]);
                this.m_execnt++;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layoutConts (idx, tgt) {
        try {
            console.warn('layout is not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
