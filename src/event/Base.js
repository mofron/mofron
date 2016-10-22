/**
 * @file Click.js
 */
mofron.event.Base = class {
    constructor () {
        try {
            this.tgt_obj = null;
            this.cb_func = null;
            this.cb_parm = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget (to) {
        try {
            this.tgt_obj = to;
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
            var _cbp = cbp || null;
            this.cb_func = cbf;
            this.cb_parm = _cbp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event () {
        try {
            throw new Error('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
