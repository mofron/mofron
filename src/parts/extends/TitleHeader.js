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
            var title = new mofron.parts.Text(ttl);
            title.setSize (25);
            title.style.addStyle('margin-left', '20px');
            title.style.addStyle('position'   , 'relative');
            title.style.addStyle('top'        , '5px');
            this.addChild(title);
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
