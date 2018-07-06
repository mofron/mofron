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
     * @param tgt : (object) target adom object
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
            var set_obj = {};
            set_obj[nm] = "";
            this.set(set_obj);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    get () {
        try {
            var ret_val = super.get();
            if (null === ret_val) {
                return null;
            } else if (undefined === ret_val[0]) {
                var ret_obj = new Array();
                for (var idx in ret_val) {
                    ret_obj.push(idx);
                }
                return ret_obj;
            } else {
                return ret_val;
            }
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
    rset (key) {
        try {
            let spkey = key.split(' ');
            for (let idx in spkey) {
                this.target().getRawDom().classList.add(spkey[idx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rrem (key) {
        try {
            this.target().getRawDom().classList.remove(key);
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
            var conts   = this.get();
            for (var idx in conts) {
                if ('' !== ret_val) {
                    ret_val += ' ';
                }
                ret_val += conts[idx];
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
