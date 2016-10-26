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
            var own_ttl = this.title;
            
            var hvin    = new mofron.event.HoverIn();
            var fdin = new mofron.effect.Fadein(own_ttl);
            var sdw  = new mofron.effect.Shadow(this);
            hvin.setCbfunc (function(fd) {
                sdw.effect(true);
                fd.effect(true);
            },fdin);
            this.addEvent(hvin);
            
            var hvout = new mofron.event.HoverOut();
            hvout.setCbfunc (function(fd) {
                sdw.effect(false);
                fd.effect(false);
            },fdin);
            this.addEvent(hvout);
            //this.setShadow(10);

            this.image.setSize(80);
            var img_style = new mofron.other.Styles(this.image);
            img_style.style('position'   , 'relative');
            img_style.style('top'        , '10px');
            img_style.style('text-align' , 'center');
            this.addChild(this.image,disp);
            
            this.title.auto_color = true;
            this.title.setAlign('center');
            this.title.setThickness(30);
            
            var style = new mofron.other.Styles(this.title);
            style.style('position', 'relative');
            style.style('top'     , '-55px');
            this.addChild(this.title,false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
