/**
 * @file Center.js
 */

mofron.layout.VartCenter = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            var _rt = rt || 20;
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
            style.style('height'   , this.rate + '%');
            style.style('position', 'relative');
            style.style('top'    , (100 - this.rate)/2 + '%');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
