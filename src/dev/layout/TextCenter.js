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
    
    layout () {
        try {
            var child = this.target.getChild();
            for (var idx in child) {
                child[idx].getVdom().setStyle('width'   , this.rate + '%');
                child[idx].getVdom().setStyle('position', 'relative');
                child[idx].getVdom().setStyle('left'    , (100 - this.rate)/2 + '%');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
