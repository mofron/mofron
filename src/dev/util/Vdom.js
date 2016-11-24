/**
 * @file util/Vdom.js
 *
 */

module.exports = class {
    constructor (tag) {
        try {
            if ('string' != (typeof tag)) {
                throw new Error('invalid parameter');
            }
            this.id         = null;
            this.tag        = tag;
            this.clname     = null;
            this.parent     = null;
            this.child      = new Array();
            this.style      = new mofron.util.Style(this);
            this.attr       = {};
            this.text       = null;
            this.push_flg   = false;
            this.value      = null;
////console.log(tag + ' -> ' + this.getId());
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    chgTag(tag) {
        try {
            if ('string' != (typeof tag)) {
                throw new Error('invalid parameter');
            }
            this.tag      = tag;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getId() {
        try {
            if (null === this.id) {
                this.id = mofron.util.getId();
            }
            return this.id;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd) {
        try {
            if ('object' != (typeof chd)) {
                throw new Error('invalid parameter');
            }
            chd.setTarget(this);
            this.child.push(chd);
            this.value = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setStyle(key, val) {
        try {
            //console.log('set ' + this.tag + ' style-> ' + key + ':' + val);
            this.style.set(key,val);
            this.value = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getStyle (key) {
        try {
            return this.style.get(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setAttr (key, val) {
        try {
            var _key = (key === undefined) ? null : key;
            var _val = (val === undefined) ? null : val;
            this.attr[_key] = _val;
            this.value = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getAttr (val) {
        try {
            var _val = (val === undefined) ? null : val;
            if (null === _val) {
                return this.attr;
            }
            return this.attr[_val];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setText (txt) {
        try {
            if ('string' != (typeof txt)) {
                throw new Error('invalid parameter');
            }
            this.text  = txt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getValue () {
        try {
            var ret_val = '';
            if (null != this.value) {
                ret_val += this.value;
            } else {
                //console.log(this.getId() + ' -> getValue()');
                ret_val += '<'+ this.tag + ' ';
                
                /* set id attribute */
                ret_val += 'id="'+ this.getId() +'" ';
                
                /* set class attribute:*/
                if (null != this.clname) {
                    ret_val += 'class="' + this.clname +'" ';
                }
                
                /* set style attribute */
                var style_conts = this.style.get();
                var style = 'style="';
                for(var key in style_conts) {
                    style += key + ':'+ style_conts[key] + ';';
                }
                style += '"';
                if ('style=""' != style) {
                    ret_val += style;
                }
                
                var attr_conts = '';
                for (var key in this.attr) {
                    attr_conts += key;
                    if (null != this.attr[key]) {
                        attr_conts += '=' +this.attr[key] + ' ';
                    }
                }
                ret_val += attr_conts + '>';
                
                this.value = ret_val;
            }
            
            /* get child value */
            if (0 != this.child.length) {
                for(var chd_idx in this.child) {
                    //console.log(this.getId() + ' -> child value() -> ' + this.child[chd_idx].getValue());
                    ret_val += this.child[chd_idx].getValue();
                }
            }
            
            if (null != this.text) {
                ret_val += this.text;
            }
            
            if (false === this.isSimpleTag()) {
                ret_val += '</'+ this.tag +'>';
            }

//console.log(this.getId() + ' -> ' + ret_val);
            //console.log(this.getId() + ' -> value() -> ' + ret_val);
            return ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    pushDom (tgt) {
        try {
            if (true === this.push_flg) {
                throw new Error('already pushed');
            }
            
            this.setTarget(tgt);
            
            var tgt_dom = null;
            if (null === this.parent) {
                tgt_dom = document.body;
                console.log(this.getId() + ' -> push DOM to body');
            } else {
                tgt_dom = document.querySelector('#' + this.parent.getId());
                console.log(this.getId() + ' -> push DOM to ' + this.parent.getId());
            }
            tgt_dom.insertAdjacentHTML('beforeend',this.getValue());
//console.log('innerHTML : ' + tgt_dom.innerHTML);
            //tgt_dom.innerHTML += this.getValue();
            
            this.setPushed();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isPushed() {
        try {
            return this.push_flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setPushed () {
        try {
            if (0 != this.child.length) {
                for(var chd_idx in this.child) {
                    this.child[chd_idx].setPushed();
                }
            }
            this.push_flg = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSimpleTag () {
        try {
            if ( ('br'    == this.tag) ||
                 ('hr'    == this.tag) ||
                 ('input' == this.tag) ||
                 ('img'   == this.tag)) {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget(tgt) {
        try {
            if ('object' != (typeof tgt)) {
                throw new Error('invalid parameter');
            }
            this.parent = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getChild(idx) {
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
}
