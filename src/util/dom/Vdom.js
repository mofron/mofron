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
                return (null === this.parent()) ? null : this.parent().tag();
            }
            throw new Error('tag set is not supported at vdom');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd) {
        try {
            if (true === mofron.func.isObject(chd, 'Dom')) {
                /* set config */
                chd.attr(this.attr());
                chd.style(this.style());
                chd.prop(this.prop());
                chd.className(('' === this.className()) ? undefined : this.className());
                chd.text(('' === this.text()) ? undefined : this.text());
            }
            super.addChild(chd);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * style setter / getter to(from) children
     *
     * @param kv : (object) key value object
     * @param los : (boolean) loose flag (not require)
     * @return (string) : style value
     * @return (object) : style object
     */
    style (kv, los) {
        try {
            if (undefined === kv) {
                /* getter */ 
                return this.m_style;
            }
            if ('string' === typeof kv) {
                /* getter */
                return (undefined === this.m_style[kv]) ? null : this.m_style[kv];
            }
            /* setter */
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].style(kv, los);
            }
            for (var idx in kv) {
                this.m_style[idx] = kv[idx];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag attribute setter / getter
     *
     * @param kv : (object) key value object
     * @return (string,null) attribute value 
     */
    attr (kv, val) {
        try {
            if ('object' === typeof kv) {
                for (var idx in kv) {
                    this.m_attr[idx] = kv[idx];
                }
                var chd = this.child();
                for (var idx in chd) {
                    chd[idx].attr(kv, val);
                }
            } else {
                if (undefined === kv) {
                    return this.m_attr;
                }
                return (undefined === this.m_attr[kv]) ? null : this.m_attr[kv];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom property setter / getter
     * 
     * @param kv (object) key value object
     * @param val (mix) property value
     */
    prop (kv) {
        try {
            if ('object' === typeof kv) {
                for (var idx in kv) {
                    this.m_prop[idx] = kv[idx];
                }
                var chd = this.child();
                for (var idx in chd) {
                    chd[idx].prop(kv);
                }
            } else {
                if (undefined === kv) {
                    return this.m_prop;
                }
                return (undefined === this.m_prop[kv]) ? null : this.m_prop[kv];
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
            if (undefined === name) {
                /* getter */
                var ret_val = '';
                for (var idx in this.m_classnm) {
                    if ('' === ret_val) {
                        ret_val += ' ';
                    }
                    ret_val += this.m_classnm[idx];
                }
                return ret_val;
            }
            /* setter */
            if ('string' !== typeof name) {
                throw new Error('invalid parameter');
            }
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].className(name);
            }
            this.m_classnm[name] = null;
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
                return (undefined === this.m_text) ? '' : this.m_text;
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
            if (0 != this.child().length) {
                var chd = this.child();
                for(var idx in chd) {
                    ret_val += chd[idx].value();
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
            
            if (0 != this.child().length) {
                var chd = this.child();
                for(var idx in chd) {
                    chd[idx].setPushed();
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
            if (false === this.isPushed()) {
                throw new Error('this vdom is not rendered yet');
            }
            return this.m_rawdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
            var chd = this.child();
            for (var idx in chd) {
                chd[idx].destroy();
            }
            
            if ( (null !== this.parent()) &&
                 (true === mofron.func.isObject(this.parent(), 'Dom')) ) {
                super.destroy();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
