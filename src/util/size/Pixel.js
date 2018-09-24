/**
 * @file  Pixel.js
 * @brief pixel size data type
 * @author simpart
 */

/**
 * @class Pixel
 * @brief Pixel Defined Class
 */
mofron.size.Pixel = class extends mofron.size.Size {
    /**
     *
     */
    constructor (prm) {
        try {
            super(prm, 'px');
            this.name('Pixel');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toPxnum () {
        try { return this.value(); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
/* end of file */
