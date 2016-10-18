/**
 * @file Theme.js
 *
 */
mofron.other.Theme = class {
    constructor () {
        try {
            this.colors = new Array(
                                  null,  /* main color */
                                  null,  /* secondary color */
                                  null   /* thirdly color */
                              );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setMainColor (col) {
        try {
            this.colors[0] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setScndColor (col) {
        try {
            this.colors[1] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setThrdColor (col) {
        try {
            this.colors[2] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
