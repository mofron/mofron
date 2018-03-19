/**
 * @file CompCtrl.js
 * @brief component controller
 * @author simparts
 */

mofron.CompCtrl = class extends mofron.Base {
    constructor (po) {
        super();
        this.name('CompCtrl');
        this.prmOpt(po);
    }
    
    addCtrl (key, fnc, prm) {
        try {
            this.data(key, [fnc,prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execCtrl (key) { 
        try {
            let ctl = this.data(key);
            if (null !== ctl) {
                return ctl[0](this, this.m_data, ctl[1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setComponent (key, cmp) {
        try {
            this.data(key, cmp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addComponent (key, cmp) {
        try {
            let chk = this.data(key);
            if (null === chk) {
                if (true === mofron.func.isInclude(cmp, 'Component')) {
                    this.data(key, [cmp]);
                } else {
                    this.data(key, cmp);
                }
            } else if (true === mofron.func.isInclude(chk, 'Component')) {
                if (true === mofron.func.isInclude(cmp, 'Component')) {
                    this.data(key, [chk, cmp]);
                } else {
                    let set_cmp = new Array(chk);
                    this.data(key, set_cmp.concat(cmp));
                }
            } else if ('array' === typeof chk) {
                if (true === mofron.func.isInclude(cmp, 'Component')) {
                    this.data(key, chk.push(cmp));
                } else {
                    this.data(key, chk.concat(cmp));
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getComponent (key) {
        try {
            return this.data(key);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getCompValue (key) {
        try {
            let cmp = this.data(key);
            if (null === cmp) {
                return null;
            }
            if (true === mofron.func.isInclude(cmp, 'Component')) {
                return cmp.value();
            }
            if (undefined !== cmp[0]) {
                let ret = new Array();
                for (let idx in cmp) {
                    ret.push(cmp[idx].value());
                }
                return ret;
            }
            throw new Error('unknown data type');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
