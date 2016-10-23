/**
 * @file   BoxList.js
 * @author simpart
 */

mofron.parts.ImageBox = class extends mofron.parts.Frame {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor (ttl, img) {
        try {
            super();
            mofron.useParts('BandText');
            this.title = new mofron.parts.BandText(ttl);
            this.image = img;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            var hvin  = new mofron.event.HoverIn();
            var own_ttl = this.title;
            hvin.setCbfunc (function(){
                $('#' + own_ttl.getId()).fadeIn('fast');
            });
            this.addEvent(hvin);
            var hvout = new mofron.event.HoverOut();
            hvout.setCbfunc (function(){
                $('#' + own_ttl.getId()).fadeOut('fast');
            });
            this.addEvent(hvout);
            this.setShadow(10);

            this.image.setSize(80);
            var img_style = new mofron.other.Styles(this.image);
            img_style.style('position', 'relative');
            img_style.style('top', '10px');
            img_style.style('text-align', 'center');
            this.addChild(this.image);
            
            this.title.auto_color = true;
            this.title.setAlign('center');
            this.title.setThickness(30);
            
            var style = new mofron.other.Styles(this.title);
            style.style('position', 'relative');
            style.style('top'     , '-45px');
            this.title.setInitDisp(false);
            this.addChild(this.title);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
