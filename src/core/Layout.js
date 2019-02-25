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
            let cmp_chd  = this.component().child();
            if (true === this.isInited()) {
                this.m_execnt = cmp_chd.length-1;
            }
            let _idx     = null;
            let skip_flg = false;
            for (let idx in cmp_chd) {
                _idx = parseInt(idx);
                if (_idx < this.m_execnt) {
                    continue;
                }
                /* check skip */
                let skip = this.suspend();
                skip_flg = false;
                for (let sidx in skip) {
                    if (cmp_chd[_idx].getId() === skip[sidx]) {
                        skip_flg = true;
                        break;
                    }
                }
                
                if (false === skip_flg) {
                    /* check parameter count */
                    this.contents(_idx, cmp_chd[_idx]);
                }
                this.m_execnt++;
            }
            this.isInited(true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (idx, tgt) {
        console.warn('not implement');
    }
    
    suspend (prm) {
        try {
            if (true === mofron.func.isComp(prm)) {
                prm = prm.getId();
            }
            return this.member('suspend', 'string', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
