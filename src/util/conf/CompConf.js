/**
 * @file CompConf.js
 * @brief component config interface
 * @author simpart
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
    
    contents (p1) {
        console.warn('not implement');
    }
    
    tag (prm) {
        try { return this.member('tag', 'string', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isInited (prm) {
        try { return this.member('isInited', 'boolean', prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    suspend (prm) {
        try { return this.member('suspend', 'boolean', prm, false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
