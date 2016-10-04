/**
 * @file   TitleHeader.js
 * @brief  Simpale Page Title Header
 * @author simpart
 */

mofron.parts.TitleHeader = class extends mofron.parts.Header {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor (ttl) {
        try {
            super();
            if ('string' != (typeof ttl)) {
                throw new Error('invalid parameter type');
            }
            this.addChild(new mofron.parts.Text(ttl));
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
