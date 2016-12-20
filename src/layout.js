/**
 * @file layout/Base.js
 * @brief Base class of layout
 */

mofron.layout.Base = class {
    constructor () {
        try {
            this.target   = null;
            this.exec_cnt = 0;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * @param tgt : (object) layout target Parts
     */
    setTarget(tgt) {
        try {
            this.target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout () {
        try {
            if (null === this.target) {
                throw new Error('target is null');
            }
            var tgt_chd = this.target.getChild();
            for (var idx in tgt_chd) {
                if (idx < this.exec_cnt) {
                    continue;
                }
                this.layoutFunc(idx,tgt_chd[idx]);
                this.exec_cnt++;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layoutFunc (idx, tgt) {
        try {
            console.warn('layout is not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
