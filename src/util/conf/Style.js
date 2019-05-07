/**
 * @file Style.js
 * @author simpart
 */

/**
 * @class Style
 * @brief component style class
 */
mofron.Style = class extends mofron.DomConf {
    /**
     * initialize member
     *
     * @param tgt : (object) target adom object
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.name('Style');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set (kv, fc) {
        try {
            if (true !== fc) {
                let lck = this.lock();
                for (let kidx in kv) {
                    for (let lidx in lck) {
                        if (kidx === lck[lidx]) {
                            delete kv[kidx];
                        }
                    }
                }
            }
            super.set(kv);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set style
     *
     * @param key : (string) style key
     * @param val : (string) style value
     */
    rset (key, val) {
        try {
            this.target().getRawDom().style[mofron.func.getCamel(key)] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get style value from rawdom
     *
     * @param key : (string) style key
     * @return (object) style contents
     * @return (string) style contents value
     */
    rget (key) {
        try {
            let val = this.target().getRawDom().style[mofron.func.getCamel(key)];
            return ((undefined === val) || ("" === val)) ? null : val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rrem (key) {
        try {
            this.target().getRawDom().style[mofron.func.getCamel(key)] = "";
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getString () {
        try {
            var ret_val = '';
            for (var idx in this.m_conts) {
                ret_val += idx + ':' + this.m_conts[idx] + ';';
            }
            if ('' === ret_val) {
                return '';
            }
            return 'style="' + ret_val + '"';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    lock (prm) {
        try { return this.arrayMember('lock', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
