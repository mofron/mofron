/**
 * @file HeadConts.js
 *
 */

mofron.util.HeadConts = class {
    constructor (tag) {
        try {
            if ('string' != (typeof tag)) {
                throw new Error('invalid parameter');
            }
            this.tag        = tag;
            this.attr       = {};
            this.conts      = '';
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
    
    addConts (txt) {
        try {
            if ('string' !== (typeof txt)) {
                throw new Error('invalid parameter');
            }
            this.conts += txt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    pushTag () {
        try {
            var set_conts = '';
            if (false === this.isSimpleTag(this.tag)) {
                set_conts += '<' + this.tag + '>' + this.conts + '</' + this.tag + '>';
            }
            document.head.insertAdjacentHTML('beforeend',set_conts);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSimpleTag (tag) {
        try {
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
