/**
 * @file  Color.js
 * @brief color abstructor
 */
module.exports = class {
    constructor (r,g,b,a) {
        try {
            this.red   = (r === undefined) ? 255 : r;
            this.green = (g === undefined) ? 255 : g;
            this.blue  = (b === undefined) ? 255 : b;
            this.alpha = (a === undefined) ? 1 : a;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getRgba () {
        try {
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
            return 'rgba('+ this.red +','+ this.green +','+ this.blue +','+ this.alpha +')';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
