/**
 * @file layout/Base.js
 * @brief Base class of layout
 */

mofron.Layout = class extends mofron.Base {
    constructor () {
        try {
            super();
            this.name('Layout');
            
            this.m_target = null;
            this.m_execnt = 0;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * @param tgt : (object) layout target component
     */
    target(tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                return this.m_target;
            }
            if ('object' === typeof tgt) {
                throw new Error('invalid parameter');
            }
            this.m_target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout () {
        try {
            if (null === this.target()) {
                throw new Error('target is null');
            }
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
