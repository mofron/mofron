/**
 * @file event/Base.js
 */
module.exports = class {
    constructor (cbf) {
        try {
            var _cbf = cbf === undefined ? null : cbf;
            this.target  = null;
            this.cb_func = _cbf;
            this.cb_parm = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget (parts) {
        try {
            if ('object' != (typeof parts)) {
                throw new Error('invalid parameter');
            }
            this.target = parts.getEventTgt();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setCbfunc (cbf, cbp) {
        try {
            if (null === cbf) {
                throw new Error('invalid parameter');
            }
            var _cbp = cbp === undefined ? null : cbp;
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
