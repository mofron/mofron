/**
 * @file   BoxList.js
 * @author simpart
 */

mofron.parts.BoxList = class extends mofron.parts.Menu {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor (ttl) {
        try {
            super();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
