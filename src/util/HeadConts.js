/**
 * @file HeadConts.js
 * @author simpart
 */

/**
 * @class HeadConts
 * @brief head tag contents
 */
mofron.HeadConts = class extends mofron.Base {
    constructor (prm) {
        try {
            super();
            this.name('HeadConts');
            this.m_attr = {};
            this.prmOpt(
                ('string' === typeof tag) ? {tag : prm} : prm
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tag (tg) {
        try {
            if (undefined === tg) {
                /* getter */
                return (undefined === this.m_tag) ? null : this.m_tag;
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
            if (undefined === val) {
                /* getter */
                if (undefined === key) {
                    return this.m_attr;
                }
                return (undefined === this.m_attr[key]) ? null : this.m_attr[key];
            }
            /* setter */
            if ( ('string' !== typeof key) || ('string' !== typeof val) ) {
                throw new Error('invalid parameter');
            }
            this.m_attr[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (txt) {
        try {
            if (undefined === txt) {
                /* getter */
                return (undefined === this.m_conts) ? '' : this.m_conts;
            }
            /* setter */
            if ('string' !== typeof txt) {
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
            
            if (false === this.isSimple()) {
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
    
    isSimple (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                if (undefined === this.m_simple) {
                    return ( ('link'    == this.tag()) ||
                             ('meta'    == this.tag()) ||
                             ('base' == this.tag()) ) ? true : false;
                } else {
                    return this.m_simple;
                }
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_simple = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
