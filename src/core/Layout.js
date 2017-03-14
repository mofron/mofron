/**
 * @file layout/Base.js
 * @brief Base class of layout
 */

mofron.Layout = class extends mofron.CompConf {
    constructor (prm_opt) {
        try {
            super();
            this.name('Layout');
            
            /* member */
            this.m_execnt = 0;
            
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            var tgt_chd = this.target().child();
            for (var idx in tgt_chd) {
                if (idx < this.m_execnt) {
                    continue;
                }
                this.layoutConts(idx,tgt_chd[idx]);
                this.m_execnt++;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    loutConts (idx, tgt) {
        try {
            console.warn('layout is not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
