/**
 * @file  Font.js
 */
module.exports = class {
    constructor (fm) {
        try {
            if ('string' != (typeof fm)) {
                throw new Error('invalid parameter');
            }
            this.family = fm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    font (tgt) {
        try {
            tgt.style('font-family', this.family);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
