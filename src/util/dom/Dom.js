/**
 * @file Dom.js
 * @author simpart
 */

/**
 * @class Dom
 * @brief Dom class
 */
mofron.Dom = class extends mofron.Base {
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
            
            this.m_id      = null;
            this.m_comp    = null;
            this.m_tag     = null;
            this.m_classnm = new mofron.ClassName(this);
            this.m_parent  = null;
            this.m_child   = new Array();
            this.m_style   = new mofron.Style(this);
            this.m_attr    = new mofron.Attr(this);
            this.m_prop    = new mofron.Prop(this);
            this.m_text    = '';
            this.m_value   = null;
            this.m_rawdom  = null;
            
            /* check tag */
            if ('string' === typeof tg) {
                this.tag(tg);
            }
            
            /* check component */
            if (undefined !== cmp) {
                this.component(cmp);
            }
            
            /* check option */
            this.prmOpt(tg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag name setter / getter
     *
     * @param tg : (string) tag name (option)
     * @return (string) tag name
     */
    tag (tg) {
        try {
            if (undefined === tg) {
                /* getter */
                return this.m_tag;
            }
            /* setter */
            if ('string' !== typeof tg) {
                throw new Error('invalid parameter');
            }
            this.m_tag = tg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * component getter / setter
     * 
     * @param cmp (object) mofron.Component
     * @return (object) mofron.Component
     */
    component (cmp) {
        try {
            if (undefined === cmp) {
                /* getter */
                return this.m_comp;
            }
            /* setter */
            if (false === mofron.func.isInclude(cmp,'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_comp = cmp;
            this.attr('component', cmp.name());
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
            if (null === this.m_id) {
                this.m_id = mofron.func.getId();
            }
            return this.m_id;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    child (chd) {
        try {
            if (undefined === chd) {
                /* getter */
                return this.m_child;
            }
            /* setter */
            if ('object' !== typeof chd) {
                throw new Error('invalid parameter');
            }
            
            if (undefined !== chd[0]) {
                for (var idx in chd) {
                    this.addChild(chd[idx]);
                }
                return;
            }
            this.addChild(chd);
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
            if (false === mofron.func.isInclude(chd, 'Dom')) {
                throw new Error('invalid parameter');
            }
            chd.parent(this);
            this.m_child.push(chd);
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * style setter / getter
     *
     * @param kv : (object) key value object
     * @return (string) : style value
     * @return (object) : style object
     */
    style (kv, los) {
        try {
            if (true === typeof los) {
                this.m_style.protect(true);
                this.m_style.set(kv);
                this.m_style.protect(false);
            } else if ('object' === typeof kv) {
                this.m_style.set(kv);
            } else {
                return this.m_style.get(kv);
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
     * @param kv : (object) attribute key value object
     * @return
     */
    attr (kv) {
        try {
            if (undefined === kv) {
                /* getter */
                return this.m_attr.get();
            }
            this.m_attr.set(kv);
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom property setter / getter
     * 
     * @param kv (object) key value object
     */
    prop (kv) {
        try {
            if (undefined === kv) {
                /* getter */
                return this.m_prop.get(kv);
            }
            /* setter */
            this.m_prop.set(kv);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag class name setter / getter
     * 
     * @param name : (string) class name
     */
    className (name) {
        try {
            if (undefined === name) {
                /* getter */
                return this.m_classnm.get();
            }
            /* setter */
            this.m_classnm.add(name);
            this.value(null);
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
            this.m_text = txt;
            if (true === this.isPushed()) {
                this.getRawDom().innerHTML = txt;
            }
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom string setter / getter
     *
     * @return (string) dom string
     */
    value (val) {
        try {
            if (undefined === val) {
                /* getter */
                if (null !== this.m_value) {
                    return this.m_value;
                }
                
                var ret_val = '';
                ret_val += '<'+ this.tag() + ' ';
                
                /* set id attribute */
                ret_val += 'id="'+ this.getId() +'" ';
                
                /* set dom config */
                var cnf_lst = [this.m_classnm,this.m_style,this.m_attr];
                var cnf_cnt = null;
                for (var idx in cnf_lst) {
                    cnf_cnt = cnf_lst[idx].getString();
                    if ('' !== cnf_cnt) {
                        ret_val += cnf_cnt;
                    }
                }
                
                /* close tag */
                ret_val += '>';
                
                /* set tag contents */
                ret_val += this.text();
               
                /* set buff */
                this.value(ret_val);
                
                /* set child value */
                var child = this.child();
                for(var chd_idx in child) {
                    ret_val += child[chd_idx].value();
                }
            
                if (false === this.isSimpleTag()) {
                    ret_val += '</'+ this.tag() +'>';
                }
                return ret_val;
            }
            /* setter */
            this.m_value = val;
            if ( (null === val) && (true === this.isPushed()) ) {
                // update dom contents
                this.getRawDom().innerHTML = this.value();
            }
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
            
            if (true === this.isPushed()) {
                throw new Error('already pushed');
            }
            
            this.parent(tgt);
            
            var tgt_dom = (null === this.parent()) ? document.body : this.parent().getRawDom();
            if (false === _upd) {
                tgt_dom.insertAdjacentHTML('beforeend',this.value());
            } else {
                tgt_dom.innerHTML = this.value();
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
    isPushed () {
        try {
            return (null === this.m_rawdom) ? false : true;
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
            if (null === this.parent()) {
                this.m_rawdom = document.querySelector('#' + this.getId());
            } else {
                this.m_rawdom = this.parent().getRawDom().querySelector('#' + this.getId());
            }
            
            /* set property */
            var prop = this.m_prop.get();
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
            if (undefined === pnt) {
                /* getter */
                return this.m_parent;
            }
            /* setter */
            if ('object' !== typeof pnt) {
                throw new Error('invalid parameter');
            }
            this.m_parent = pnt;
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
            if (false === this.isPushed()) {
                throw new Error('this dom is not rendered yet');
            }
            return this.m_rawdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}