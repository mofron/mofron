mofron.layout.Base = class {
    constructor () {
        try {
            this.target  = null;
            this.exe_cnt = -1;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget(tgt) {
        try {
            this.target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout () {
        try {
            this.exe_cnt++;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
