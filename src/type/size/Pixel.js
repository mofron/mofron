/**
 * @file  Pixel.js
 * @brief pixel size data type
 * @author simpart
 */
const Size = require("./Size.js");

module.exports = class extends Size {
    /**
     *
     */
    constructor (prm) {
        try {
            super(prm, 'px');
            this.modname('Pixel');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toPixel () {
        try { return this.value(); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
/* end of file */
