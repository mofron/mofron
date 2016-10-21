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
console.log('constructor : Text');
            this.text  = txt;
            this.setSize(15);
            //this.style = new mofron.other.Style(this.getTarget() + ' div');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
console.log('initConts : Text');
            
            $(this.getTarget()).html('<div>'+ this.text +'</div>');
            
            if (null !== this.theme.colors[0]) {
                var rgb = this.theme.colors[0].getRgba();
                if (390 > (rgb[0]+rgb[1]+rgb[2])) {
                    var style = new mofron.other.Styles(this, ' div');
                    style.style('color', 'rgba(0,0,0,'+ rgb[3] +')');
                }
            }
            
            //style.style('font-size', this.size + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (size) {
        try {
            //if (true === this.init_flg) {
                var style = new mofron.other.Styles(this, ' div');
                style.style('font-size', size + 'px');
            //}
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
