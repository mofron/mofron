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
            this.text = txt;
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
                    $('#' + this.getId() + ' div').css('color', 'rgba(0,0,0,'+ rgb[3] +')');
                }
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
