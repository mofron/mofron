/**
 * @file Style.js
 */
module.exports = class {
    constructor (tgt) {
        try {
            if ('object' != (typeof tgt) ) {
                throw new Error('invalid parameter');
            }
            this.target = tgt;
            this.conts  = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set (key, val) {
        try {
            var _val = (val === undefined) ? null : val;
            
            if ( ('string' != (typeof key)) ||
                 ((null != _val) && ('string' != (typeof _val))) ) {
                throw new Error('invalid parameter');
            }
            if (true === this.target.isPushed()) {
                var dom = document.querySelector('#' + this.target.getId());
                dom.style[key] = val;
            }
            this.conts[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    get (key) {
        try {
            var _key = (key === undefined) ? null : key;
            if (null === _key) {
                return this.conts;
            }
            return (this.conts[_key] === undefined) ? null : this.conts[_key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
