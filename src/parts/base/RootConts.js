/**
 * @file   Text.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.RootConts = class extends mofron.parts.Component {
    constructor (txt) {
        try {
            super();
            this.parent = 'RootConts';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            $('body').attr('id',this.getId());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
