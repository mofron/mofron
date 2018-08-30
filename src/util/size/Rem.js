/**
 * @file  Rem.js
 * @brief rem size data type
 * @author simpart
 */

/**
 * @class Rem
 * @brief Rem Defined Class
 */
mofron.size.Rem = class extends mofron.size.Base {
    /**
     *
     */
    constructor (po) {
        try {
            super(po);
            this.name('Rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try {
            let ret = super.value(prm);
            if (undefined === ret) {
                /* setter */
                if ('rem' !== this.type()) {
                    throw new Error('invalid parameter');
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toPxnum () {
        try {
            return this.number() * mf.func.getRemBase();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    px2Rem () {
        try {
            return this.number() / mf.func.getRemBase();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    calcu (prm, flg) {
        try {
            super.calcu(prm, flg);
            if ('px' === this.type()) {
                this.number(this.px2Rem());
                this.type('rem');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
