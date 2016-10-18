/**
 * @file   Frame.js
 * @brief  Base UI of Frame
 * @author simpart
 */

mofron.parts.Frame = class extends mofron.parts.Component {
    /**
     * initialize Header
     */
    constructor () {
        try {
            super();
            this.style = new mofron.other.Style('#' + this.getId());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * structure
     * 
     * @param disp : (bool) visible flag
     */
    init (disp) {
        try {
            super.init(disp);
            this.style.addStyle('height', '100px');
            this.style.addStyle('width' , '100px');
            this.style.addStyle('border', 'solid 1px black');
            this.style.setStyle();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (hei, wid) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setRadius (flg) {
        try {
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
