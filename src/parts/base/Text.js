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
            this.setSize(15);
            //this.style = new mofron.other.Style(this.getTarget() + ' div');
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
            
            if (null !== this.theme.colors[0]) {
                var rgb = this.theme.colors[0].getRgba();
                if (390 > (rgb[0]+rgb[1]+rgb[2])) {
                    this.style.addStyle('color', 'rgba(0,0,0,'+ rgb[3] +')', ' div');
                }
            }
            
            this.style.setStyle(' div');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            $(this.getTarget()).html('<div>'+ this.text +'</div>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (size) {
        try {
            this.size = size;
            this.style.addStyle('font-size', size + 'px', ' div');
            if (true === this.init_flg) {
                this.style.setStyle(' div');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
