/**
 * @file Dom.js
 * @author simpart
 */

/**
 * @class Dom
 * @brief Dom class
 */
mofron.util.Dom = class extends mofron.Base {
    /**
     * initialize member
     *
     * @param tag : (string) tag name
     * @param cmp : (object) component object
     */
    constructor (tg, cmp) {
        try {
            super();
            this.name('Dom');
            
            this.id       = null;
            this.comp     = (undefined === cmp) ? null : cmp;
            this.m_tag    = null;
            this.m_class  = new Array();
            this.m_parent = null;
            this.child    = new Array();
            this.m_style  = new mofron.util.Style(this);
            this.m_attr   = {};
            this.m_text   = null;
            this.value    = null;
            this.entity   = null;
            
            if (undefined !== tg) {
                if ('string' !== (typeof tg)) {
                    throw new Error('invalid parameter');
                }
                this.tag(tg);
            }
            
            if (null !== this.comp) {
                this.attr('component', this.comp.name());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tar name setter / getter
     * r('invalid parameter');
     *
     * @param tg : (string) tag name (option)
     * @return (string) tag name
     */
    tag (tg) {
        try {
            var _tg = (undefined === tg) ? null : tg;
            if (null === _tg) {
                /* getter */
                return this.m_tag;
            }
            if ('string' != (typeof _tg)) {
                throw new Error('invalid parameter');
            }
            /* setter */
            this.m_tag = _tg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get tag id
     * 
     * @return (string) tag id
     */
    getId () {
        try {
            if (null === this.id) {
                this.id = mofron.func.getId();
            }
            return this.id;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add child vdom
     *
     * @param chd : (object) child vdom
     */
    addChild (chd) {
        try {
            if ('object' != (typeof chd)) {
                throw new Error('invalid parameter');
            }
            
            chd.parent(this);
            this.child.push(chd);
            this.value = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get child vdom object
     *
     * @param idx : (number) child index
     * @return (object) child vdom object
     */
    getChild (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                return this.child;
            }
            if ((0 > _idx) || ((this.child.length-1) < _idx)) {
                throw new Error('invalid parameter');
            }
            return this.child[_idx];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * style setter / getter
     *
     * @param key : (string) style key (option)
     * @param val : (string) style value (option)
     * @return (string) : style value
     * @return (object) : style object
     */
    style (key, val) {
        try {
            if ( (undefined === val) &&
                 ('string'  === typeof key) ) {
                /* getter */
                return this.m_style.get(key);
            } else if ( ('string' === typeof key) &&
                        (('string' === typeof val) || (null === val)) ) {
                /* setter */
                this.m_style.set(key, val);
                this.value;
            } else if ( (undefined === key) &&
                        (undefined === val) ) {
                /* getter */
                return this.m_style;
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set style object
     * 
     */
    setStyle(sty) {
        try {
            if ('object' !== (typeof sty)) {
                throw new Error('invalid parameter');
            }
            for (var key in sty) {
                this.style(key, sty[key]);
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
     * @return
     */
    attr (key, val) {
        try {
            if ( ('string' === typeof key) &&
                 (('string' === typeof val) || (null === val)) ) {
                /* setter */
                this.m_attr[key] = val;
                if (true === this.isRendered()) {
                    this.getRawDom().setAttribute(key, val);
                }
                this.value = null;
            } else if ( ('string'  === typeof key) &&
                        (undefined === val) ) {
                /* getter */
                return this.m_attr[key];
            } else if ( (undefined === key) ||
                        (undefined === val) ) {
                /* getter */
                return this.m_attr;
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
    addClass (name) {
        try {
            if ('string' != (typeof name)) {
                throw new Error('invalid parameter');
            }
            this.m_class.push(name);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getClass (idx) {
        try {
            if (undefined === idx) {
                return this.m_class;
            }
            if ('number' === (typeof idx)) {
                throw new Error('invalid parameter');
            }
            if ((0 > idx) || (this.m_class.length-1 < idx)) {
                return null;
            }
            return this.m_class[idx];
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
                if (true === this.isRendered()) {
                    this.getRawDom().innerHTML = txt;
                }
                this.m_text  = txt;
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
    getValue () {
        try {
            var ret_val = '';
            if (null != this.value) {
                ret_val += this.value;
            } else {
                //console.log(this.getId() + ' -> getValue()');
                ret_val += '<'+ this.tag() + ' ';
                
                /* set id attribute */
                ret_val += 'id="'+ this.getId() +'" ';
                
                /* set class attribute:*/
                var class_str = 'class="';
                var class_lst = this.getClass();
                for (var idx in class_lst) {
                    class_str += class_lst[idx] + ' ';
                }
                class_str += '"';
                if ('class=""' != class_str) {
                    ret_val += class_str;
                }
                
                /* get style string */
                var style_conts = this.m_style.get();
                var style = 'style="';
                for(var key in style_conts) {
                    if (null === style_conts[key]) {
                        continue;
                    }
                    style += key + ':'+ style_conts[key] + ';';
                }
                style += '"';
                if ('style=""' != style) {
                    ret_val += style;
                }
                
                /* get attribute string */
                var attr_conts = '';
                var attr_val   = this.attr();
                for (var key in attr_val) {
                    attr_conts += key;
                    if (null != attr_val[key]) {
                        attr_conts += '=' + attr_val[key] + ' ';
                    }
                }
                ret_val += attr_conts + '>';
                
                this.value = ret_val;
            }
            
            /* get child value */
            if (0 != this.child.length) {
                for(var chd_idx in this.child) {
                    ret_val += this.child[chd_idx].getValue();
                }
            }
            
            if (null != this.text()) {
                ret_val += this.text();
            }
            
            if (false === this.isSimpleTag()) {
                ret_val += '</'+ this.tag() +'>';
            }

            return ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * draw dom to target dom
     * 
     * @param tgt : (object) target dom
     * @param upd : (boolean) update flag
     */
    pushDom (tgt, upd) {
        try {
            var _upd = (undefined === upd) ? false : upd;
            if ('boolean' !== typeof _upd) {
                throw new Error('invalid parameter');
            }
            
            if (true === this.isRendered()) {
                throw new Error('already pushed');
            }
            
            this.parent(tgt);
            
            var tgt_dom = null;
            if (null === this.parent()) {
                tgt_dom = document.body;
            } else {
                tgt_dom = this.parent().getRawDom();
            }
            
            if (false === _upd) {
                tgt_dom.insertAdjacentHTML('beforeend',this.getValue());
            } else {
                tgt_dom.innerHTML = this.getValue();
            }
            this.setPushed();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get vdom status
     *
     * @return (boolean) true : this vdom had pushed
     * @return (boolean) false : this vdom had not pushed
     */
    isRendered () {
        try {
            if (null === this.entity) {
                return false;
            }
            return true;
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
            if (null === this.parent()) {
                this.entity = document.querySelector('#' + this.getId());
            } else {
                this.entity = this.parent().getRawDom().querySelector('#' + this.getId());
            }
            
            if (0 != this.child.length) {
                for(var chd_idx in this.child) {
                    this.child[chd_idx].setPushed();
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * check whether tag name is simple tag
     *
     * @return (boolean) true  : this vdom is simple tag
     * @return (boolean) false : this vdom is not simple tag
     */
    isSimpleTag () {
        try {
            if ( ('br'    == this.m_tag) ||
                 ('hr'    == this.m_tag) ||
                 ('input' == this.m_tag) ||
                 ('img'   == this.m_tag)) {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * parent vdom setter / getter
     * 
     * @param pnt : (object) parent vdom
     * @return (object) parant vdom
     */
    parent (pnt) {
        try {
            if ('object' === (typeof pnt)) {
                /* setter */
                this.m_parent = pnt;
            } else if (undefined === pnt) {
                /* getter */
                return this.m_parent;
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get pushed dom object from blowser
     *
     * @return (object) raw dom object
     */
    getRawDom () {
        try {
            if (false === this.isRendered()) {
                throw new Error('this vdom is not rendered yet');
            }
            return this.entity;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
