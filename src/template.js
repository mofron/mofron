/**
 * @file template.js
 */

mofron.tmpl.Base = class {
    constructor () {
        try {
            this.base = new mofron.comp.Base();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (val) {
        try {
            var _val = (val === undefined) ? null : val;
            if (null === _val) {
                return null;
            }
            var hc   = new mofron.util.HeadConts('title');
            hc.addConts(_val);
            hc.pushTag();
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
