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
    
    toPxnum () {
        try { return this.number(); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
/* end of file */
