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
            this.conts  = new Array();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set (key, val) {
        try {
            if ( ('string' != (typeof key)) ||
                 ('string' != (typeof val)) ) {
                throw new Error('invalid parameter');
            }
            if (true === this.target.init_flg) {
                var dom = document.querySelector('#' + this.getId());
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
            if (0 === this.conts.length) {
                return null;
            }
            return (this.conts[_key] === undefined) ? null : this.conts[_key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
