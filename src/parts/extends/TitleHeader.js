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
    constructor (ttl) {
        try {
            super();
            if ('string' != (typeof ttl)) {
                throw new Error('invalid parameter type');
            }
            this.title  = ttl;
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
            super.init();
            $('#' + this.getId() + ' .conts').html(this.title);
            this.visible(_disp);
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
