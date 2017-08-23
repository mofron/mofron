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
            super(tg);
            this.name('Dom');
            
            this.m_classnm = new mofron.ClassName(this);
            this.m_child   = new Array();
            this.m_style   = new mofron.Style(this);
            this.m_attr    = new mofron.Attr(this);
            this.m_prop    = new mofron.Prop(this);
            this.m_cnflis  = new Array();
            this.m_rawdom  = null;
            
            let prm = this.param();
            if (null === prm) {
                this.execOption();
            } else {
                this.tag(prm);
            }
            
            /* check component */
            if (undefined !== cmp) {
                this.component(cmp);
            }
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
                return (undefined === this.m_tag) ? null : this.m_tag;
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
                return (undefined === this.m_comp) ? null : this.m_comp;
            }
            /* setter */
            if (false === mofron.func.isInclude(cmp, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_comp = cmp;
            
            /* set component attribute */
            var nm_lst  = cmp.getNameList();
            var cmp_str = 'mofron-comp-';
            for (var cidx in nm_lst) {
                if (0 == cidx) {
                    continue;
                } else if (1 != cidx) {
                    cmp_str += '-';
                }
                if ('i' !== 'I'.toLowerCase()) {
                    cmp_str += nm_lst[cidx].replace(/[A-Z]/g, function(ch) {return String.fromCharCode(ch.charCodeAt(0) | 32);});
                } else {
                    cmp_str += nm_lst[cidx].toLowerCase();
                }
            }
            if ('mofron-comp-' !== cmp_str) {
                cmp.vdom().attr({'component' : cmp_str});
            }
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
    addChild (chd, idx) {
        try {
            if (false === mofron.func.isInclude(chd, 'Dom')) {
                throw new Error('invalid parameter');
            }
            chd.parent(this);
            
            if ((undefined === idx) || (0 === this.m_child.length)) {
                this.m_child.push(chd);
            } else {
                this.m_child.splice(idx, 0, chd);
            }
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    updChild (chd, idx) {
        try {
            if ( ('number'  !== typeof idx) ||
                 (undefined === this.child()[idx]) ) {
                throw new Error('invalid parameter');
            }
            this.m_child[idx].destroy();
            this.addChild(chd, idx);
            if ( (true === mofron.func.isObject(this, 'Vdom')) &&
                 (1 === this.child().length) ) {
                this.component().target(chd);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delChild (idx) {
        try {
            if ( ('number'  !== typeof idx) ||
                 (undefined === this.child()[idx]) ) {
                throw new Error('invalid parameter');
            }
            this.m_child.splice(idx, 1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * style setter / getter
     *
     * @param kv : (object) key-value object
     * @return (string) : value of style
     * @return (object) : style object
     */
    style (kv, los) {
        try {
            if ( (undefined === kv) || ('string' === typeof kv) ) {
                /* getter */
                return this.m_style.get(kv);
            }
            /* setter */
            var chgcnf = {};
            for (var kv_idx in kv) {
                if (kv[kv_idx] !== this.style(kv_idx)) {
                    chgcnf[kv_idx] = kv[kv_idx];
                }
            }
            
            if (true === los) {
                this.m_style.protect(true);
                this.m_style.set(kv);
                this.m_style.protect(false);
            } else if ('object' === typeof kv) {
                this.m_style.set(kv);
            }
            
            if (0 !== chgcnf.length) {
                this.execConfListener('style', chgcnf);
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
     * @param kv  : (object/string) key-value object / key of attribute
     * @param val : (object) value of attribute
     * @return
     */
    attr (kv, val) {
        try {
            if ( (undefined === val) &&
                 ('object'  !== typeof kv) ) {
                /* getter */
                return this.m_attr.get(kv);
            }
            /* setter */
            var chgcnf = {};
            for (var kv_idx in kv) {
                if (kv[kv_idx] !== this.attr(kv_idx)) {
                    chgcnf[kv_idx] = kv[kv_idx];
                }
            }
            
            if ('string' === typeof kv) {
                var set_obj = {};
                set_obj[kv] = val;
                this.m_attr.set(set_obj);
            } else {
                this.m_attr.set(kv);
            }
            
            if (0 !== chgcnf.length) {
                this.execConfListener ('attr', chgcnf);
            }
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom property setter / getter
     * 
     * @param kv  : (object/string) key-value object / key of
     * @param val : (object)  value of property
     */
    prop (kv, val) {
        try {
            if ( (undefined === val) &&
                 ('object'  !== typeof kv) ) {
                /* getter */
                return this.m_prop.get(kv);
            }
            /* setter */
            var chgcnf = {};
            for (var kv_idx in kv) {
                if (kv[kv_idx] !== this.prop(kv_idx)) {
                    chgcnf[kv_idx] = kv[kv_idx];
                }
            }
            
            if ('string' === typeof kv) {
                var set_obj = {};
                set_obj[kv] = val;
                this.m_prop.set(set_obj);
            } else {
                this.m_prop.set(kv);
            }
            
            if (0 !== chgcnf.length) {
                this.execConfListener ('prop', chgcnf);
            }
            this.value(null);
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
            this.execConfListener('className', name);
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
                return (undefined === this.m_text) ? '' : this.m_text;
            }
            /* setter */
            if ('string' !== typeof txt) {
                throw new Error('invalid parameter');
            }
            
            var chgcnf = null;
            if (txt !== this.text()) {
                chgcnf = txt;
            }
            this.m_text = txt;
            if (true === this.isPushed()) {
                this.getRawDom().innerHTML = txt;
            }
            
            if (null !== chgcnf) {
                this.execConfListener ('text', txt);
            }
            this.value(null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addConfListener (fnc, prm) {
        try {
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_cnflis.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execConfListener (type, prm) {
        try {
            for (var idx in this.m_cnflis) {
                this.m_cnflis[idx][0](
                    type,
                    prm,
                    this.m_cnflis[idx][1]
                );
            }
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
                if ( (undefined !== this.m_value) && ('string' === typeof this.m_value) ) {
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
               
                /* set child value */
                var child = this.child();
                for(var chd_idx in child) {
                    ret_val += child[chd_idx].value();
                }
                
                if (false === this.isSimple()) {
                    ret_val += '</'+ this.tag() +'>';
                }
                
                /* set buff */
                this.value(ret_val);
                
                return ret_val;
            }
            /* setter */
            if ((null === val) && (null !== this.parent())) {
                this.parent().value(null);
            }else if ((null !== val) && ('string' !== typeof val)) {
                throw new Error('invalid parameter');
            }
            this.m_value = val;
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
            
            if ((false === _upd) && (true === this.isPushed())) {
                throw new Error('already pushed');
            }
            
            //this.parent(tgt);
            
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
            var tgt_pnt = this.parent();
            while (tgt_pnt) {
                if (true === tgt_pnt.isSimple()) {
                    tgt_pnt = tgt_pnt.parent();
                } else {
                    break;
                }
            }
            if (null === tgt_pnt) {
                this.m_rawdom = document.querySelector('#' + this.getId());
            } else {
                this.m_rawdom = tgt_pnt.getRawDom().querySelector('#' + this.getId());
            }
            
            if (null === this.m_rawdom) {
                throw new Error('could not find rawdom');
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
    isSimple (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                if (undefined === this.m_simple) {
                    return ( ('br'    == this.tag()) ||
                             ('hr'    == this.tag()) ||
                             ('input' == this.tag()) ||
                             ('img'   == this.tag()) ) ? true : false;
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
    
    /**
     * parent vdom setter / getter
     * 
     * @param pnt : (object) parent dom/vdom object
     * @return (object) parant dom/vdom object
     */
    parent (pnt) {
        try {
            if (undefined === pnt) {
                /* getter */
                return (undefined === this.m_parent) ? null : this.m_parent;
            }
            /* setter */
            if ( (null  !== pnt) &&
                 (false === mofron.func.isInclude(pnt, 'Dom')) ) {
                throw new Error('invalid parameter');
            }
            if (undefined !== this.m_parent) {
                this.destroy();
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
                throw new Error('this dom is not pushed yet');
            }
            return this.m_rawdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
            if ( (true === this.isPushed()) &&
                 (true === mofron.func.isObject(this, 'Dom')) ) {
                this.getRawDom().remove();
                this.m_rawdom = null;
            }
            
            if ( (null !== this.parent()) &&
                 (true === mofron.func.isInclude(this.parent(), 'Dom')) ) {
                var pnt_chd = this.parent().child();
                for (var idx in pnt_chd) {
                    if (pnt_chd[idx].getId() === this.getId()) {
                        this.parent().delChild(parseInt(idx));
                        break;
                    }
                }
            }
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
