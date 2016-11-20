/**
 * @file HorizCenter.js
 */
module.exports = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            var _rt = (rt === undefined) ? 80 : rt;
            this.rate = _rt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_dom) {
        try {
            //var style = new mofron.other.Styles(tgt_chd);
            //style.style('width'   , this.rate + '%');
            //style.style('position', 'relative');
            //style.style('left'    , (100 - this.rate)/2 + '%');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
