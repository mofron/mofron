/**
 * @file  Color.js
 * @author simpart
 */

/**
 * @class Color
 * @brief Color Defined Class
 */
mofron.util.Color = class {
    /**
     * initialize member
     *
     * @param r : (number 0-255) red value (option)
     * @param g : (number 0-255) green value (option)
     * @param b : (number 0-255) blue alue (option)
     * @param a : (number 0-1)   alpha value (option)
     */
    constructor (r,g,b,a) {
        try {
            var _r = (r === undefined) ? null : r;
            var _g = (g === undefined) ? null : g;
            var _b = (b === undefined) ? null : b;
            var _a = (a === undefined) ?    1 : a;
            
            if ( (null === _r) && (null === _g) && (null === _b) ) {
                
            } else if ( (null !== _r) && (null !== _g) && (null !== _b) ) {
                if ( ('number' !== typeof _r) ||
                     ('number' !== typeof _g) ||
                     ('number' !== typeof _b) ) {
                    throw new Error('invalid parameter');
                }
            } else {
                throw new Error('invalid parameter');
            }
            this.name    = 'Color';
            this.red     = _r;
            this.green   = _g;
            this.blue    = _b;
            if ('number' !== typeof _a) {
                throw new Error('invalid parameter');
            }
            this.alpha   = _a;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get name
     *
     * @return (string) own name
     */
    getName () {
        try {
            return this.name;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get rgba value
     * 
     * @return (object) rgba array object
     *   [0] -> (number) red value
     *   [1] -> (number) green value
     *   [2] -> (number) blue value
     *   [3] -> (number) alpha value
     */
    getRgba () {
        try {
            return new Array(
                           (null === this.red) ?   0 : this.red  ,
                           (null === this.green) ? 0 : this.green,
                           (null === this.blue) ?  0 : this.blue ,
                           (null === this.alpha) ? 0 : this.alpha
                       );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get coloe style value
     *
     * @return (string) rgba(x,x,x,x)
     * @return (string) none
     * @note return 'none' if rgb is null.
     */
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
