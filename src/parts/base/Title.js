/**
 * @file   Title.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.Title = class extends mofron.parts.Component {
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
            
            var bd_comp  = new mofron.parts.Component();
            var bd_style = new mofron.other.Styles(bd_comp);
            bd_style.style('border-left'  , 'solid 15px black');
            bd_style.style('border-bottom', 'solid 1px black');
            
            var ttl_style = new mofron.other.Styles(this.title);
            ttl_style.style('margin-left'  , '20px');
            bd_comp.addChild(this.title,disp);
            
            this.addChild(bd_comp,disp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
