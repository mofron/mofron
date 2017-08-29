/**
 * @file Attr.js
 * @author simpart
 */

/**
 * @class Attr
 * @brief tag attribute object
 */
mofron.Attr = class extends mofron.DomConf {
    /**
     * initialize member
     *
     * @param tgt : (object) target adom object
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.name('Attr');
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
            this.target().getRawDom().setAttribute(key, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get attribute value from rawdom
     *
     * @param key : (string) style key
     * @return (object) style contents
     * @return (string) style contents value
     */
    rget (key) {
        try {
            var val = this.target().getRawDom().getAttribute(key);
            return ('' === val) ? null : val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getString () {
        try {
            var ret_val = '';
            for (var idx in this.m_conts) {
                if ('' !== ret_val) {
                    ret_val += ' ';
                }
                ret_val += (null === this.m_conts[idx]) ? idx : idx + '="' + this.m_conts[idx] + '"';
            }
            return ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
