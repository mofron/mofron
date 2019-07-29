/**
 * @file  Color.js
 * @author simpart
 */

/**
 * @class Color
 * @brief Color Defined Class
 */
mofron.Color = class extends mofron.Base {
    /**
     * initialize member
     *
     */
    constructor (prm) {
        try {
            super();
            this.name('Color');
            this.m_rgba = [null, null, null, null]; /* red, green, blue, alpha */
            if ("string" === prm) {
                this.value(prm);
            } else if (true === Array.isArray(prm)) {
                this.rgba(prm[0], prm[1], prm[2], prm[3]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rgb (r, g, b) {
        try {
            let ret = this.rgba(r, g, b);
            return (undefined !== ret) ? [ret[0], ret[1], ret[2]] : undefined;
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
    rgba (red, green, blue, alpha) {
        try {
            if (undefined === red) {
                /* getter */
                return this.m_rgba;
            }
            /* setter */
            var _red   = (red   === undefined) ? null : red;
            var _green = (green === undefined) ? null : green;
            var _blue  = (blue  === undefined) ? null : blue;
            var _alpha = (alpha === undefined) ?    1 : alpha;
            
            if ( (null === _red) && (null === _green) && (null === _blue) ) {
                
            } else if ( (null !== _red) && (null !== _green) && (null !== _blue) ) {
                if ( ('number' !== typeof _red) ||
                     ('number' !== typeof _green) ||
                     ('number' !== typeof _blue) ) {
                    throw new Error('invalid parameter');
                }
            } else {
                throw new Error('invalid parameter');
            }

            if ('number' !== typeof _alpha) {
                throw new Error('invalid parameter');
            }
            
            this.m_rgba[0] = _red;
            this.m_rgba[1] = _green;
            this.m_rgba[2] = _blue;
            this.m_rgba[3] = _alpha;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try { return this.member("value", "string", prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    option (prm) {
        try { return this.member("option", "object", prm, {}); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    toStyle () {
        try { return [this.toString(), this.option()]; } catch (e) {
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
    toString () {
        try {
            if (null !== this.value()) {
                return this.value();
            }
            
            var rgba = this.rgba();
            var red   = rgba[0];
            var green = rgba[1];
            var blue  = rgba[2];
            var alpha = rgba[3];
            
            if ( (null === red)   &&
                 (null === green) &&
                 (null === blue) ) {
                return 'none';
            }
            return 'rgba('+ red +','+ green +','+ blue +','+ alpha +')';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
