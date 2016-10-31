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
            this.title.setLink('./');
            this.title.auto_color = true;
            this.addChild(this.title, true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            
            var style = new mofron.other.Styles(this.title);
            this.title.setSize (35);
            style.style('margin-left', '20px');
            style.style('position'   , 'relative');
            style.style('top'        , '5px');
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */