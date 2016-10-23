/**
 * @file  Font.js
 */
mofron.other.Font = class {
    constructor (fm) {
        try {
            this.family = fm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    font (tgt) {
        try {
            var style = new mofron.other.Styles(tgt, ' div');
            style.style('font-family', this.family);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
