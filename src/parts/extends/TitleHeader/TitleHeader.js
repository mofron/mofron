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
console.log('constructor : TitleHeader');

            if ('string' != (typeof ttl)) {
                throw new Error('invalid parameter type');
            }
            this.title = new mofron.parts.Text(ttl);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
console.log('initConts : TitleHeader');
            
            var style = new mofron.other.Styles(this.title);
            this.title.setSize (25);
            style.style('margin-left', '20px');
            style.style('position'   , 'relative');
            style.style('top'        , '5px');
            
            this.addChild(this.title, disp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
