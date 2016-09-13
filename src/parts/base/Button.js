/**
 * @file   Button.js
 * @brief  Base of UI Button Class
 * @author simpart
 */

mofron.parts.Button = class extends mofron.parts.Core {
    constructor (cnt) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts = cnt;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    init () {
        super.init();
        $('#' + this.getId()).append('<button>'+ this.conts +'</button>');
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
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
