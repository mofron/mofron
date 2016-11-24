/**
 * @file Center.js
 */

module.exports = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            var _rt = (rt === undefined) ? 50 : rt;
            this.rate = _rt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout () {
        try {
            this.target.style('display', '-webkit-flex');
            
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
