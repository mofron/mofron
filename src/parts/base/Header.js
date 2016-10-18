/**
 * @file   Header.js
 * @brief  Base UI of Header
 * @author simpart
 */

mofron.parts.Header = class extends mofron.parts.Component {
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
    
    /**
     * structure header
     * 
     * @param disp : (bool) visible flag
     */
    init (disp) {
        try {
            super.init(disp);
            
            this.style.addStyle('width' , '100%', ' .conts');
            this.style.addStyle('float' , 'left', ' .conts');
            this.style.addStyle('border-bottom', 'solid 1px black', ' .conts');
            this.style.addStyle('float' , 'none', ' .padd');
            
            if (null !== this.theme.colors[0]) {
                this.style.addStyle(
                    'background',
                    this.theme.colors[0].getStyle(),
                    ' .conts'
                );
            }
            
            this.style.setStyle(' .conts');
            this.style.setStyle(' .padd');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            var tag  = "<div class='conts'></div>";
            tag     += "<div class='padd'></div>";
            $('#' + this.getId()).html(tag);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initChild (disp) {
        // dummy
    }
    
    initHdrChild (disp) {
        try {
            super.initChild(disp);
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
            this.style.addStyle('height', hei + 'px', ' .conts');
            this.style.addStyle('height', hei + 'px', ' .padd');
            if (true === this.init_flg) {
                this.style.setStyle(' .conts');
                this.style.setStyle(' .padd');
            }
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
