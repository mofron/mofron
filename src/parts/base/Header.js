/**
 * @file   Header.js
 * @brief  Base UI of Header
 * @author simpart
 */

mofron.parts.Header = class extends mofron.parts.Component {
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
    
    init (disp) {
        try {
            var _disp = disp || false;
alert(_disp);
            super.init(_disp);
            
            
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
