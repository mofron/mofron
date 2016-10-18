/**
 * @file Style.js
 */
mofron.other.Style = class {
    constructor (tgt) {
        try {
            if ('object' != (typeof tgt)) {
                throw new Error('invalid parameter');
            }
            this.style   = new Array();
            this.target  = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addStyle (key, val, ext_sel) {
        try {
            if ('string' != (typeof key)) {
                throw new Error('invalid parameter');
            }
            var _ext_sel = ext_sel || '';
            this.style.push(new Array(key, val, _ext_sel, false));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setStyle (ext_sel) {
        try {
            var _ext_sel = ext_sel || '';
            for (var idx in this.style) {
                if ((_ext_sel === this.style[idx][2]) &&
                    (false === this.style[idx][3])) {
                    $('#' + this.target.getId() + _ext_sel).css(
                        this.style[idx][0],
                        this.style[idx][1]
                    );
                    this.style[idx][3] = true;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
