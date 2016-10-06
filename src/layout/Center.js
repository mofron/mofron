/**
 * @file Center.js
 */

mofron.layout.Center = class {
    constructor (parts) {
        try {
            this.parts = parts;
            this.rate  = 80;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setRate (rate) {
        try {
            this.rate = rate;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    layout () {
        try {
            var tgt = this.parts.getTarget();
            $(tgt).css('width'   , this.rate + '%');
            $(tgt).css('position', 'relative');
            $(tgt).css('left'    , (100 - this.rate)/2 + '%');
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
