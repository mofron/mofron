/**
 * @file BandText.js
 */
mofron.parts.AwesomeIcon = class extends mofron.parts.Component {
    constructor (ico) {
        try {
            super();
            this.icon  = ico;
            this.setSize(15);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (size) {
        try {
            var style = new mofron.other.Styles(this, ' i');
            style.style('font-size', size + 'px');
            this.size = size;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            $(this.getTarget()).html('<i class="fa '+ this.icon +'"></i>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
