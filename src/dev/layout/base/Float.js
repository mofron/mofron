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
            var style = null;
            for (var idx in this.target.child) {
                style = new mofron.other.Styles(this.target.child[idx][0]);
                if (idx == this.target.child.length-1) {
                    style.style('float', 'none');
                } else {
                    style.style('float', this.type);
                }
            }
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
