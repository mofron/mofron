/**
 * @file Vdom.js
 * @author simpart
 */

/**
 * @class Vdom
 * @brief virtual dom class
 */
mofron.Vdom = class extends mofron.Dom {
    /**
     * initialize member
     *
     * @param tag : (string) tag name
     * @param cmp : (object) component object
     */
    constructor (prm_opt) {
        try {
            super();
            this.name('Vdom');
            
            this.m_style   = {};
            this.m_classnm = {};
            this.m_attr    = {};
            this.m_prop    = {};
            
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag name setter / getter to(from) children
     * 
     * @param tg : (string) tag name (option)
     * @return (string,null) tag name
     */
    tag (tg) {
        try {
            if (undefined === tg) {
                /* getter */
                return this.m_tag;
            }
            /* setter */
            if ('string' != (typeof tg)) {
                throw new Error('invalid parameter');
            } else if (0 === chd.length) {
                throw new Error('there is no child in this vdom');
            }
            
            var chd = this.child();
            /* setter */
            for (var idx in chd) {
                chd[idx].tag(tg);
            }
            this.m_tag = tg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * style setter / getter to(from) children
     *
     * @param key : (string) style key (not require)
     * @param val : (string) style value (not require)
     * @param los : (boolean) loose flag (not require)
     * @return (string) : style value
     * @return (object) : style object
     */
    style (key, val, los) {
        try {
            if ( (undefined === val) &&
                 ('object'  !== typeof key) ) {
                /* getter */
                if (undefined === key) {
                    return this.m_style;
                } else {
                    return (undefined === this.m_style[key]) ? null : this.m_style[key];
                }
            }
            /* setter */
            if ('object' === typeof key) {
                mofrom.func.keyValSetter(this.style, key);
                return;
            }
            this.m_style[key] = val;
            for (var idx in m_child) {
                m_child[idx].style(key, val, los);
            }
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag attribute setter / getter
     *
     * @param key : (string) attribute key (option)
     * @param val : (string) attribute value (option)
     * @return (string,null) attribute value 
     */
    attr (key, val) {
        try {
            if ( (undefined === val) &&
                 ('object'  !== typeof key) ) {
                /* getter */
                if (undefined === kay) {
                    return this.m_attr;
                } else {
                    return (undefined === this.m_attr[key]) ? null : this.m_attr[key]; 
                }
            }
            /* setter */
            if ('object' === typeof key) {
                mofron.func.keyValueSetter(this.attr, key);
                return;
            }
            
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].attr(key, val);
            }
            this.m_attr[key] = val;
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom property setter / getter
     * 
     * @param key (string) property key
     * @param val (mix) property value
     */
    prop (key, val) {
        try {
            if ( (undefined === val) &&
                 ('object'  !== typeof key) ) {
                /* getter */
                if (undefined === key) {
                    return this.m_prop;
                } else {
                    return (undefined === this.m_prop[key]) ? null : this.m_prop[key];
                }
            }
            /* setter */
            if ('object' === typeof key) {
                mofron.func.keyValSetter(this.prop, key);
                return;
            }
            
            if (true === this.isRendered()) {
                var chd = this.child();
                for (var idx in chd) {
                    if (undefined === chd[idx].getRawDom()[key]) {
                        throw new Error(key + ' is unknown property');
                    }
                    chd[idx].getRawDom()[key] = val;
                }
            } else {
                this.m_prop[key] = val;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add tag class name
     * 
     * @param name : (string) class name
     */
    className (name) {
        try {
            if ('string' != (typeof name)) {
                throw new Error('invalid parameter');
            }
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].className(name);
            }
            this.m_classnm.push(name);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag contents text setter / getter
     * 
     * @param cnt : (string) tag contents (option)
     * @return (string) tag contents
     */
    text (txt) {
        try {
            if (undefined === txt) {
                /* getter */
                return this.m_text;
            }
            /* setter */
            if ('string' !== typeof txt) {
                throw new Error('invalid parameter');
            }
            
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].text(txt);
            }
            this.m_text = txt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get dom string
     *
     * @return (string) dom string
     */
    value (val) {
        try {
            if (undefined !== val) {
                return;
            }
            var ret_val = '';
            
            /* get child value */
            if (0 != this.m_child.length) {
                for(var chd_idx in this.m_child) {
                    ret_val += this.m_child[chd_idx].value();
                }
            }
            
            return ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    /**
     * update vdom status
     * 
     * @note update status also child vdom
     */
    setPushed () {
        try {
            /* set rawdom */
            this.m_rawdom = (null === this.parent()) ? document.body : this.parent().getRawDom();
            
            /* set property */
            var prop = this.m_prop;
            for (var idx in prop) {
                this.prop(idx, prop[idx]);
            }
            
            if (0 != this.m_child.length) {
                for(var chd_idx in this.m_child) {
                    this.m_child[chd_idx].setPushed();
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get parent's  pushed dom object from blowser
     *
     * @return (object) raw dom object
     */
    getRawDom () {
        try {
            if (false === this.isRendered()) {
                throw new Error('this vdom is not rendered yet');
            }
            return this.m_rawdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
