/**
 * @file  Color.js
 * @brief color abstructor
 */
mofron.other.Color = class {
    constructor (r,g,b,a) {
        try {
            this.red   = r || null;
            this.green = g || null;
            this.blue  = b || null;
            this.alpha = a || 1;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setRgb (r, g, b) {
        try {
            this.red   = r;
            this.green = g;
            this.blue  = b;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setAlpha (a) {
        try {
            this.alpha = a;
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
/* end of file */
