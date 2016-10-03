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
            this.height = 50;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    /**
     * structure header
     * 
     * @param disp : (bool) visible flag
     */
    init (disp) {
        try {
            var _disp = disp || false;
            super.init(_disp);
            var tag  = "<div class='conts'></div>";
            tag     += "<div class='padd'></div>";
            $('#' + this.getId()).html(tag);
            $('#' + this.getId() + ' .conts').css('height', this.height + 'px');
            $('#' + this.getId() + ' .conts').css('border-bottom', 'solid 1px black');
            $('#' + this.getId() + ' .padd').css('float' , 'none');
            $('#' + this.getId() + ' .padd').css('height', this.height + 'px');
            
            if (null !== this.theme.colors[0]) {
                $('#' + this.getId() + ' .conts').css(
                    'background',
                    this.theme.colors[0].getStyle()
                );
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    /**
     * set header height
     *
     * @param hei : (int) height
     */
    setHeight (hei) {
        try {
            this.height = hei;
            if (null !== this.id) {
                $('#' + this.getId() + ' .header-conts').css('height', this.height + 'px');
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
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
            throw new Error(e.stack + '\n');
        }
    }
    
    setFix (flg) {
        try {
            
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
