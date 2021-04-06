/**
 * @file  Rem.js
 * @brief rem size data type
 * @author simpart
 */
const Size = require("./Size.js");
const comutl = mofron.util.common;

module.exports = class extends Size {
    /**
     *
     */
    constructor (prm) {
        try {
            super(prm, 'rem');
            this.modname('Rem');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toPixel () {
        try {
	    /* get html font-size */
            let h_fsiz = document.documentElement.style["fontSize"];
            if ("" === h_fsiz) {
	        h_fsiz = 625;	// default size
            } else {
                h_fsiz = parseFloat(h_fsiz);
	    }
	    /* get body font-size */
	    let b_fsiz = document.body.style["fontSize"];
            if ("" === b_fsiz) {
                b_fsiz = "0.16";    // default size
	    } else {
                b_fsiz = parseFloat(b_fsiz);
	    }
            
	    return this.value() * (b_fsiz * h_fsiz);
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
