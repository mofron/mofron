/**
 * @file  Pixel.js
 * @brief pixel size data type
 * @author simpart
 */

/**
 * @class Pixel
 * @brief Pixel Defined Class
 */
mofron.size.Pixel = class extends mofron.size.Base {
    /**
     *
     */
    constructor (po) {
        try {
            super(po);
            this.name('Pixel');
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
                if ('pixel' !== this.type()) {
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
        try { return this.number(); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
/* end of file */
