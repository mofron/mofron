/**
 * @file Margin.js
 */

mofron.layout.Padding = class extends mofron.layout.Base {
    constructor (tp,v) {
        try {
            super();
            this.type = tp;
            this.val  = v;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            var mg = 'padding';
            if (null !== this.type) {
                mg += '-' + this.type;
            }
            style.style(mg  , this.val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
