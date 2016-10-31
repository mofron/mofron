/**
 * @file   BoxList.js
 * @author simpart
 */

mofron.parts.RadiusTitle = class extends mofron.parts.Title {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor (ttl) {
        try {
            super(ttl);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            var rad_style = new mofron.other.Styles(this);
            rad_style.style('border-width', '1px 1px 1px 10px');
            this.setRadius(30);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
