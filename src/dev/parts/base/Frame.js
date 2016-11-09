/**
 * @file   Frame.js
 * @brief  Base UI of Frame
 * @author simpart
 */

mofron.parts.Frame = class extends mofron.parts.Base {
        
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
            $('#' + this.getId()).html('<div class="frame-conts"></div>');
            var style = new mofron.other.Styles(this, ' div');
            style.style('border', 'solid 1px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (hei, wid) {
        try {
            var style = new mofron.other.Styles(this, ' div');
            style.style('height', hei + 'px');
            style.style('width' , wid + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setRadius (val) {
        try {
            var style = new mofron.other.Styles(this, ' div');
            style.style('webkit-border-radius', val + 'px');
            style.style('-moz-border-radius'  , val + 'px');
            style.style('border-radius'       , val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setShadow (val) {
        try {
            var style = new mofron.other.Styles(this, ' div');
            style.style('box-shadow', val/2 + 'px '+ val/2 + 'px '+ val +'px '+ '0px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget() {
        try {
            return '#' + this.getId() + ' .frame-conts';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
