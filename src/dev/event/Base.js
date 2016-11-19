/**
 * @file event/Base.js
 */
module.exports = class {
    constructor (to) {
        try {
            if ('object' != (typeof to)) {
                throw new Error('invalid param');
            }
            this.tgt_obj = to;
            this.cb_func = null;
            this.cb_parm = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setCbfunc (cbf, cbp) {
        try {
            if (null === cbf) {
                throw new Error('invalid param');
            }
            var _cbp = cbp === undefined ? true : cbp;
            this.cb_func = cbf;
            this.cb_parm = _cbp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
