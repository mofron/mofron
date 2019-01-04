/**
 * @file   Template.js
 * @brief  component template
 * @author simpart
 */

mofron.Template = class extends mofron.Base {
    constructor (po) {
        try {
            super(po);
            this.name('Template');
            this.prmMap('tmpl');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tmpl (fnc) {
        try { return this.member('tmpl', 'function', fnc); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
