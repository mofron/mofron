/**
 * @file Margin.js
 */

module.exports = class extends mofron.layout.Base {
    constructor (tp,v) {
        try {
            super();
            if ( ('string' != (typeof tp)) ||
                 ( (''       != tp) && 
                   ('top'    != tp) &&
                   ('right'  != tp) && 
                   ('bottom' != tp) && 
                   ('left'   != tp) )      ||
                 ('number' != (typeof v)) ) {
                throw new Error('invalid parameter');
            }
            this.type = tp;
            this.val  = v;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layoutFunc (idx, tgt) {
        try {
            var mg = 'margin';
            if ('' !== this.type) {
                mg += '-' + this.type;
            }
            tgt.getVdom().setStyle(mg, this.val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (val) {
        try {
            var _val = (val === undefined) ? null : val;
            if (null === _val) {
                return this.val;
            }
            this.val = _val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
