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
    
    toPxnum () {
        try {
            return this.value() * mf.func.getRemBase();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    px2Rem () {
        try {
            return this.value() / mf.func.getRemBase();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    calcu (prm, flg) {
        try {
            super.calcu(prm, flg);
            if ('px' === this.type()) {
                this.value(this.px2Rem());
                this.type('rem');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
