/**
 * @file Style.js
 * @author simpart
 */

/**
 * @class Style
 * @brief component style class
 */
mofron.util.Style = class {
    /**
     * initialize member
     *
     * @param tgt : (object) target vdom object
     */
    constructor (tgt) {
        try {
            var _tgt = (tgt === undefined) ? null : tgt;
            if ( (null     !== _tgt) &&
                 ('object' !== (typeof _tgt)) ) {
                throw new Error('invalid parameter');
            }
            this.target    = _tgt;
            this.m_protect = false;
            this.conts     = {};
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
    set (key, val) {
        try {
            var _val = (val === undefined) ? null : val;
            
            if ( ('string' != (typeof key)) ||
                 ((null != _val) && ('string' != (typeof _val))) ) {
                throw new Error('invalid parameter');
            }
            
            if ( (false === this.m_protect) ||
                 ((true === this.m_protect) && (undefined === this.conts[key])) ) {
                this.conts[key] = _val;
                if ( (null !== this.target) &&
                     (true === this.target.isRendered()) ) {
                    this.target.getDom().style[key] = _val;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get style value
     *
     * @param key : (string) style key
     * @return (object) style contents
     * @return (string) style contents value
     */
    get (key) {
        try {
            var _key = (key === undefined) ? null : key;
            if (null === _key) {
                return this.conts;
            }
            return (this.conts[_key] === undefined) ? null : this.conts[_key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * protect state setter / getter
     *
     * @param flg : (boolean) state flag
     * @return (boolean)
     */
    protect (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return this.m_protect;
            }
            /* setter */
            if ('boolean' !== (typeof flg)) {
                throw new Error('invalid parameter');
            }
            this.m_protect = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
