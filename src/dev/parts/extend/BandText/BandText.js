/**
 * @file BandText.js
 */
mofron.parts.BandText = class extends mofron.parts.Text {
    initConts(disp) {
        try {
            super.initConts(disp);
            var style = new mofron.other.Styles(this);
            style.style('background', this.theme.colors[0].getStyle());
            
            //this.setThickness(30);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setThickness(val) {
        try {
            var style = new mofron.other.Styles(this);
            style.style('height', val + 'px');
            
            var vart = val - this.getSize();
            if (0 < vart) {
                var vart_style = new mofron.other.Styles(this, ' div');
                vart_style.style('position', 'relative');
                vart_style.style('top', (vart/4) + 'px');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
