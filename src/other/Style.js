/**
 * @file Style.js
 */
mofron.other.Style = class {
    constructor (tgt) {
        try {
            if ('string' != (typeof tgt)) {
                throw new Error('invalid parameter');
            }
            this.style  = new Array();
            this.target = tgt;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    addStyle (key, val) {
        try {
            if ('string' != (typeof key)) {
                throw new Error('invalid parameter');
            }
            this.style.push(new Array(key, val));
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setStyle () {
        try {
            for (var idx in this.style) {
                $(this.target).css(this.style[idx][0], this.style[idx][1]);
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
