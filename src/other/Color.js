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
            throw new Error(e.stack + '\n');
        }
    }
    
    setRgb (r, g, b) {
        try {
            this.red   = r;
            this.green = g;
            this.blue  = b;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setAlpha (a) {
        try {
            this.alpha = a;
        } catch (e) {
            throw new Error(e.stack + '\n');
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
            throw new Error(e.stack + '\n');
        }
    }
    
    getStyle () {
        try {
            return 'rgba('+ this.red +','+ this.green +','+ this.blue +','+ this.alpha +')';
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
