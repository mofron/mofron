/**
 * @file DomConf.js
 * @author simpart
 */

/**
 * @class DomConf
 * @brief key-val manage for dom object
 */
mofron.DomConf = class extends mofron.Base {

    constructor (dm) {
        try {
            super();
            this.name('DomKeyvals');
            
            this.m_dom   = null;
            this.dom(dm);
            this.m_protect = null;
            
            this.m_conts = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    dom (dm) {
        try {
            if (undefined === dm) {
                /* getter */
                return this.m_dom;
            }
            /* setter */
            if (false === mofron.func.isInclude(dm, 'Dom')) {
                throw new Error('invalid parameter');
            }
            this.m_dom = dm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    get () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    set () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rget () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    rset () {
        try {
            console.warn('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
