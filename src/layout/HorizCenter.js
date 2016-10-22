/**
 * @file Center.js
 */

mofron.layout.HorizCenter = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            var _rt = rt || 80;
            this.rate = _rt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            style.style('width'   , this.rate + '%');
            style.style('position', 'relative');
            style.style('left'    , (100 - this.rate)/2 + '%');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
