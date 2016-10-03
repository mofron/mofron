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
            throw new Error(e.stack + '\n');
        }
    }
    
    setMainColor (col) {
        try {
            this.colors[0] = col;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setScndColor (col) {
        try {
            this.colors[1] = col;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setThrdColor (col) {
        try {
            this.colors[2] = col;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
