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
            throw new Error(e.stack + '\n');
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
            throw new Error(e.stack + '\n');
        }
    }
    
    setSize (hei, wid) {
        try {
            
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setRadius (flg) {
        try {
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
