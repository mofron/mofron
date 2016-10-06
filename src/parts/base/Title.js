/**
 * @file   Title.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.Title = class extends mofron.parts.Component {
    /**
     * initialize Header
     */
    constructor (ttl) {
        try {
            super();
            var title = new mofron.parts.Text(ttl);
            title.setSize(30);
            this.addChild(title);
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    init (disp) {
        try {
            this.child[0].style.addStyle('margin-left', '20px');
            super.init(disp);
            this.initChild(disp);
            $('#' + this.child[0].getId()).css('border-left'  , 'solid 15px black');
            $('#' + this.child[0].getId()).css('border-bottom', 'solid 1px black');
            
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
