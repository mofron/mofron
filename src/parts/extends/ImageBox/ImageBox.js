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
            
            var hvin = new mofron.event.HoverIn();
            var fade = new mofron.effect.Fade(own_ttl);
            var sdw  = new mofron.effect.Shadow(this);
            var blr  = new mofron.effect.Blur(this.image);
            
            hvin.setCbfunc (function() {
                sdw.effect(true);
                fade.effect(true);
                blr.effect(true);
            });
            this.addEvent(hvin);
            
            var hvout = new mofron.event.HoverOut();
            hvout.setCbfunc (function() {
                sdw.effect(false);
                fade.effect(false);
                blr.effect(false);
            });
            this.addEvent(hvout);
            
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
            style.style('top'     , '-45px');
            this.addChild(this.title,false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
