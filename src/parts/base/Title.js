/**
 * @file   Title.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.Title = class extends mofron.parts.Frame {
    constructor (ttl) {
        try {
            super();
            this.title = new mofron.parts.Text(ttl);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            this.title.setSize(30);
            
            //var bd_comp  = new mofron.parts.Frame();
            var style = new mofron.other.Styles(this);
            style.style('width'  , '100%');
            style.style('height' , '35px');
            style.style('border-left'  , 'solid 15px black');
            style.style('border-bottom', 'solid 1px black');
            if (null !== this.theme.colors[0]) {
                style.style('border-color', this.theme.colors[0].getStyle());
            }
            
            var ttl_style = new mofron.other.Styles(this.title);
            ttl_style.style('margin-left'  , '20px');
            this.addChild(this.title,disp);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
