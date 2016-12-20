/**
 * @file tmpl/Base.js
 */

mofron.tmpl.Base = class {
    constructor () {
        try {
            this.base = new mofron.parts.Base();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    start () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
