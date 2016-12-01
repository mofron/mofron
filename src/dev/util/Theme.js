/**
 * @file Theme.js
 * @attention this source is GPLv3 license 
 */
module.exports = class {
    constructor () {
        try {
            this.colors = new Array(
                                  null,  /* main color */
                                  null,  /* secondary color */
                                  null   /* thirdly color */
                              );
            this.font = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setColor (col, idx) {
        try {
            var _idx = (idx === undefined) ? 0 : idx;
            if ( ('object' != (typeof col)) ||
                 ('number' != (typeof _idx)) ) {
                throw new Error('invalid parameter');
            }
            this.colors[_idx] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setFont(ft) {
        try {
            if ('object' != (typeof ft)) {
                throw new Error('invalid parameter');
            }
            this.font = ft;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
