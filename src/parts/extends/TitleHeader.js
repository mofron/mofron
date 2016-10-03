/**
 * @file   TitleHeader.js
 * @brief  Simpale Page Title Header
 * @author simpart
 */

mofron.parts.TitleHeader = class extends mofron.parts.Header {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor (cnt) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts  = cnt;
            this.height = 70;
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
            var tag  = "<div class='header-conts'></div>";
            tag     += "<div class='header-padd'></div>";
            $('#' + this.getId()).html(tag);
            $('#' + this.getId() + ' .header-conts').css('height', this.height + 'px');
            $('#' + this.getId() + ' .header-conts').css('border-bottom', 'solid 1px black');
            $('#' + this.getId() + ' .header-padd').css('float' , 'none');
            $('#' + this.getId() + ' .header-padd').css('height', '70px');
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
}
/* end of file */
