/**
 * @file ClassName.js
 * @author simpart
 */

/**
 * @class ClassName
 * @brief classname for tag object
 */
mofron.ClassName = class extends mofron.DomConf {
    /**
     * initialize member
     *
     * @param tgt : (object) target vdom object
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.name('ClassName');
            this.protect(true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    add (nm) {
        try {
            this.set(mn, null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set class name to rowdom
     *
     * @param key : (string) style key
     * @param val : (string) style value
     */
    rset (key, val) {
        try {
            this.target().getRawDom().classList.add(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get class name from rawdom
     *
     * @param key : unused
     * @return (object) style contents
     * @return (string) style contents value
     */
    rget (key) {
        try {
            var clnm    = this.target().getRawDom().className;
            if ( (undefined === clnm) ||
                 (null      === clnm) ||
                 (''        === clnm) ) {
                return null;
            }
            return clnm.split(' ');
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
                ret_val += idx;
            }
            if ('' === ret_val) {
                return '';
            }
            return 'class="' + ret_val + '"';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
