/**
 * @file HeadConts.js
 * @author simpart
 */

/**
 * @class HeadConts
 * @brief head tag contents
 */
mofron.HeadConts = class extends mofron.Base {
    constructor (tag) {
        try {
            super();
            this.name('HeadConts');
            
            this.m_tag   = null;
            this.m_attr  = {};
            this.m_conts = '';
            
            this.tag(tag);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tag (tg) {
        try {
            if (undefined === tg) {
                /* getter */
                return this.m_tag;
            }
            /* setter */
            if ('string' != (typeof tg)) {
                throw new Error('invalid parameter');
            }
            this.m_tag = tg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    attr (key, val) {
        try {
            if (undefined === key) {
                /* getter */
                return this.m_attr;
            } else {
                if ('string' !== typeof key) {
                    throw new Error('invalid parameter');
                } 
                if (undefined === val) {
                    /* getter */
                    if (undefined === this.m_attr[key]) {
                        return null;
                    }
                    return this.m_attr[key];
                }
                /* setter */
                if ('string' !== typeof val) {
                    throw new Error('invalid parameter');
                }
                this.m_attr[key] = val;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (txt) {
        try {
            if (undefined === txt) {
                /* getter */
                return this.m_conts;
            }
            if ('string' !== (typeof txt)) {
                throw new Error('invalid parameter');
            }
            this.m_conts = txt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    pushTag () {
        try {
            var set_conts  = '';
            var attr_conts = '';
            var attr = this.attr();
            for (var key in attr) {
                attr_conts += key;
                if (null != attr[key]) {
                    attr_conts += '="' + attr[key] + '" ';
                }
            }
            
            if (false === this.isSimpleTag(this.tag())) {
                set_conts += '<' + this.tag() + ' '+ attr_conts +'>' + this.contents() + '</' + this.tag() + '>';
            } else {
                set_conts += '<' + this.tag() + ' '+ attr_conts +'>' + this.contents();
            }
            
            document.head.insertAdjacentHTML('beforeend',set_conts);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSimpleTag (tag) {
        try {
            if ( ('link' === tag) ||
                 ('meta' === tag) ||
                 ('base' === tag) ) {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
