/**
 * @file CompConf.js
 * @author simpart
 */
/**
 * @class CompConf
 * @brief Interface of Component Config
 */
mofron.CompConf = class extends mofron.Base {
    
    constructor (po) {
        try {
            super(po);
            this.name('CompConf');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try { return this.member('component', 'Component', prm, null); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        console.warn('not implement');
    }
    
    contents (p1, p2) {
        console.warn('not implement');
    }
    
    isExecd (flg) {
        try { return this.member('isExecd', 'boolean', flg, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
