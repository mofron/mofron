/**
 * @file   Input.js
 * @brief  Base of UI InputText Class
 * @author simpart
 */

mofron.parts.InputText = class extends mofron.parts.Core {
    constructor (val) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init () {
        try {
            super.init();
            $('#' + this.getId()).append('<input></input>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
            if (null === func) {
                throw new Error('invalid parameter');
            }
            var p_prm = prm || null;
            $('#' + this.getId()).click(function() {
                try {
                    func(p_prm);
                } catch (e) {
                    console.error(e.stack + '\n');
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
