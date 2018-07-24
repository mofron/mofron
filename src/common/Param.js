/**
 * @file Param.js
 * @author simpart
 */

/**
 * @class Param
 * @brief option paramter for mofron object
 */
mofron.Param = class extends mofron.Base {
    constructor () {
        try {
            super();
            this.name('Param');
            
            this.m_param = new Array();
            for (let idx in arguments) {
                if (undefined === arguments[idx]) {
                    continue;
                }
                this.m_param.push(arguments[idx]); 
            }
            
            if (0 === this.m_param.length) {
                throw new Error('too few parameter');
            } else if (5 <= this.m_param.length) {
                throw new Error('too many parameters');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getParam () {
        try {
            return this.m_param;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    paramData (idx, val) {
        try {
            if (undefined === val) {
                /* getter */
                return (undefined === idx) ? this.m_param : this.m_param[idx];
            }
            /* setter */
            let plen = (undefined === this.m_param) ? 0 : this.m_param.length;
            for (let pidx = plen; pidx < idx ;pidx++) {
                this.m_param.push();
            }
            this.m_param[idx] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    exec (obj,func) {
        try {
            if ((null === obj) || ('object' !== typeof obj)) {
                throw new Error('invalid paramter');
            }
            if ('string' !== typeof func) {
                throw new Error('invalid parameter');
            }
            var prm = this.getParam();
            if (1 === prm.length) {
                obj[func](prm[0]);
            } else if (2 === prm.length) {
                obj[func](prm[0], prm[1]);
            } else if (3 === prm.length) {
                obj[func](prm[0], prm[1], prm[2]);
            } else if (4 === prm.length) {
                obj[func](prm[0], prm[1], prm[2], prm[3]);
            } else {
                obj[func](prm[0], prm[1], prm[2], prm[3], prm[4]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
