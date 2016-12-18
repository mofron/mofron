/**
 * @file  Color.js
 * @brief color abstructor
 */
module.exports = class {
    constructor (r,g,b,a) {
        try {
            this.red   = (r === undefined) ? null : r;
            this.green = (g === undefined) ? null : g;
            this.blue  = (b === undefined) ? null : b;
            this.alpha = (a === undefined) ? 1 : a;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getRgba () {
        try {
            if ( (null === this.red)   ||
                 (null === this.green) ||
                 (null === this.blue)   ) {
                return 'none';
            }
            return new Array(
                           this.red   ,
                           this.green ,
                           this.blue  ,
                           this.alpha
                       );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getStyle () {
        try {
            if ( (null === this.red)   &&
                 (null === this.green) &&
                 (null === this.blue) ) {
                return 'none';
            }
            return 'rgba('+ this.red +','+ this.green +','+ this.blue +','+ this.alpha +')';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
