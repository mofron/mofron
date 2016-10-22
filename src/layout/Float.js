/**
 * @file Float.js
 */

mofron.layout.Float = class extends mofron.layout.Base {
    constructor (tp) {
        try {
            super();
            this.type = tp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            style.style('float'   , this.type);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
