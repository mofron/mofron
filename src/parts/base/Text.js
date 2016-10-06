/**
 * @file   Text.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.Text = class extends mofron.parts.Component {
    /**
     * initialize Header
     */
    constructor (txt) {
        try {
            super();
            this.text  = txt;
            this.size  = 15;
            this.style = new mofron.other.Style('#' + this.getId() + ' div');
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
            super.init(disp);
            $('#' + this.getId()).html('<div>'+ this.text +'</div>');
            
            if (null !== this.theme.colors[0]) {
                var rgb = this.theme.colors[0].getRgba();
                if (390 > (rgb[0]+rgb[1]+rgb[2])) {
                    this.style.addStyle('color', 'rgba(0,0,0,'+ rgb[3] +')');
                }
            }
            this.style.addStyle('font-size', this.size + 'px');
            this.style.setStyle();
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setSize (size) {
        try {
            this.size = size;
            if ('undefined' !== $('#' + this.getId()).html()) {
                this.style.addStyle('font-size', size + 'px');
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
