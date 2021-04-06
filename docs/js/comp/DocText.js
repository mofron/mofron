/**
 * @file mofron-comp-{@comp-name}/index.js
 * @brief component module template for developper
 * @license MIT
 */
const Text = require("mofron-comp-text");

module.exports = class extends Text {
    /**
     * initialize component
     * 
     * @param (key-value) component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("DocText");
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
	    this.size("0.2rem");
	    this.style({ "font-family": "Quicksand" }, { lock:true });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
