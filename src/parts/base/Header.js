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
}
/* end of file */
