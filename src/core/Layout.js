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
            
            let opt = this.getOption();
            if (null !== opt) {
                this.execOption(opt);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            if (true === this.ignore()) {
                return;
            }
            var tgt_chd = this.target().child();
            var _idx    = null;
            let skip_flg = false;
            for (var idx in tgt_chd) {
                _idx = parseInt(idx);
                if (_idx < this.m_execnt) {
                    continue;
                }
                /* check skip */
                let skip = this.skipTarget();
                skip_flg = false;
                for (let sidx in skip) {
                    if (tgt_chd[_idx].getId() === skip[sidx]) {
                        skip_flg = true;
                        break;
                    }
                }
                
                if (false === skip_flg) {
                    this.layoutConts(_idx, tgt_chd[_idx]);
                }
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
    
    skipTarget (id) {
        try {
            if (undefined === id) {
                /* getter */
                return (undefined === this.m_skip_tgt) ? [] : this.m_skip_tgt;
            }
            /* setter */
            if ('string' !== typeof id) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_skip_tgt) {
                this.m_skip_tgt = new Array();
            }
            this.m_skip_tgt.push(id);
        } catch (e) {
            console.error(e.stack);
        }
    }
}
/* end of file */
