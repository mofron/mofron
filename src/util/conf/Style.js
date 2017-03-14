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
     * @param tgt : (object) target vdom object
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
            var val = this.target().getRawDom().style[key];
            return (undefined === val) ? null : val;
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
}
