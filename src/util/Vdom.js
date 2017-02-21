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
            this.m_style = {};
            this.name('Vdom');
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
            var _tg = (undefined === tg) ? null : tg;
            var chd = this.child();
            if (null === _tg) {
                /* getter */
                if ((0 === chd.length) || (null === this.m_tag)) {
                    return null;
                }
                return this.m_tag;
            }
            if ('string' != (typeof _tg)) {
                throw new Error('invalid parameter');
            } else if (0 === chd.length) {
                throw new Error('there are no child in vdom');
            }
            /* setter */
            for (var idx in chd) {
                chd[idx].tag(_tg);
            }
            this.m_tag = _tg;
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
            if (undefined === val) {
                /* getter */
                if ('string' === (typeof key)) {
                    if (undefined === this.m_style[key]) {
                        return null;
                    }
                    return this.m_style[key];
                } else if (undefined === key) {
                    return this.m_style;
                } else {
                    throw new Error('invalid parameter');
                }
            } else if ( ('string' === typeof key) &&
                        (('string' === typeof val) || (null === val)) ) {
                /* setter */
                this.m_style[key] = val;
                var chd = this.child();
                for (var idx in chd) {
                    chd[idx].style(key, val, los);
                }
            } else {
                throw new Error('invalid parameter');
            }
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
            if (undefined === val) {
                /* getter */
                if ('string' === (typeof key)) {
                    if (undefined === this.m_attr[key]) {
                        return null;
                    }
                    return this.m_attr[key];
                } else if (undefined === kay) {
                    return this.m_attr;
                } else {
                    throw new Error('invalid parameter');
                }
            } else if ('string' === (typeof key)) {
                /* setter */
                var chd = this.child();
                for (var idx in chd) {
                    chd[idx].attr(key, val);
                }
                this.m_attr[key] = val;
            } else {
                throw new Error('invalid parameter');
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
            this.m_class.push(name);
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
            if ('string' === typeof txt) {
                /* setter */
                var chd = this.child();
                for (var idx in chd) {
                    chd[idx].text(txt);
                }
                this.m_text = txt;
            } else if (undefined === txt) {
                /* getter */
                return this.m_text;
            } else {
                throw new Error('invalid parameter');
            }
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
            var pnt = this.parent();
            if (null === pnt) {
                this.m_rawdom = document.body;
            } else {
                this.m_rawdom = pnt.getRawDom();
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
