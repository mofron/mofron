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
            this.title = new mofron.parts.Text(ttl);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init (disp) {
        try {
            super.init(disp);
            
            this.title.setSize (25);
            this.title.style.addStyle('margin-left', '20px');
            this.title.style.addStyle('position'   , 'relative');
            this.title.style.addStyle('top'        , '5px');
            this.addChild(this.title, disp);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
