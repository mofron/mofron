/**
 * @file   Frame.js
 * @brief  Base UI of Frame
 * @author simpart
 */

mofron.parts.Frame = class extends mofron.parts.Component {
        
    constructor () {
        try {
            super();
            this.setSize (100, 100);
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
    initConts (disp) {
        try {
            super.initConts(disp);
            var style = new mofron.other.Styles(this);
            style.style('border', 'solid 1px black');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (hei, wid) {
        try {
            var style = new mofron.other.Styles(this);
            style.style('height', hei + 'px');
            style.style('width' , wid + 'px');
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
