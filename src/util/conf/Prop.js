/**
 * @file Prop.js
 * @author simpart
 */

/**
 * @class Prop
 * @brief dom property object
 */
mofron.Prop = class extends mofron.DomConf {
    /**
     * initialize member
     *
     * @param tgt : (object) target dom object
     */
    constructor (tgt) {
        try {
            super(tgt);
            this.name('Prop');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set property
     *
     * @param key : (string) property key
     * @param val : (string) property value
     */
    rset (key, val) {
        try {
            if (undefined === this.target().getRawDom()[key]) {
                throw new Error(key + ' is unknown property');
            }
            this.target().getRawDom()[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get property value from rawdom
     *
     * @param key : (string) property key
     * @return (string) property value
     */
    rget (key) {
        try {
            return this.target().getRawDom()[key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
