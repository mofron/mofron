/**
 * @file   Header.js
 * @brief  Base UI of Header
 * @author simpart
 */

mofron.parts.Header = class extends mofron.parts.Base {
    /**
     * initialize Header
     */
    constructor () {
        try {
            super();
            this.setHeight (50);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            console.log('initConts : Header');

            var tag  = "<div class='conts'></div>";
            tag     += "<div class='padd'></div>";
            $('#' + this.getId()).html(tag);
            
            var conts_style = new mofron.other.Styles(this, ' .conts');
            conts_style.style('width' , '100%');
            conts_style.style('float' , 'left');
            conts_style.style('border-bottom', 'solid 1px black');
            conts_style.style('position', 'fixed');
            var padd_style = new mofron.other.Styles(this, ' .padd');
            padd_style.style('float' , 'none');
            
            if (null !== this.theme.colors[0]) {
                conts_style.style(
                    'background',
                    this.theme.colors[0].getStyle(),
                    ' .conts'
                );
            }
            
            this.addLayout(new mofron.layout.Float('left'));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget () {
        try {
            return super.getTarget() + ' .conts';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set header height
     *
     * @param hei : (int) height
     */
    setHeight (hei) {
        try {
            var conts_style = new mofron.other.Styles(this, ' .conts');
            conts_style.style('height', hei + 'px');
            
            var padd_style = new mofron.other.Styles(this, ' .padd');
            padd_style.style('height', hei + 'px');
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set header background color
     *
     * col : (string) color
     */
    setColor (col) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setFix (flg) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
