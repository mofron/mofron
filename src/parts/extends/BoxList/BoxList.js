/**
 * @file   BoxList.js
 * @author simpart
 */

mofron.parts.BoxList = class extends mofron.parts.Menu {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor (ttl) {
        try {
            super();
            mofron.useParts('BandText');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            this.addLayout(new mofron.layout.Float('left'));
            this.addLayout(new mofron.layout.Margin('right',25));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addElement (ttl, img, cbf, cbp) {
        try {
            var frame = new mofron.parts.Frame();
            var title = new mofron.parts.BandText(ttl);
            
            var hvin  = new mofron.event.HoverIn();
            hvin.setCbfunc (function(){
                $('#' + title.getId()).fadeIn('fast');
            });
            frame.addEvent(hvin);
            var hvout = new mofron.event.HoverOut();
            hvout.setCbfunc (function(){
                $('#' + title.getId()).fadeOut('fast');
            });
            frame.addEvent(hvout);
            
            img.setSize(80);
            var img_style = new mofron.other.Styles(img);
            img_style.style('position', 'relative');
            img_style.style('top', '10px');
            img_style.style('text-align', 'center');
            frame.addChild(img);
            
            title.setAlign('center');
            title.setThickness(30);
            var style = new mofron.other.Styles(title);
            style.style('position', 'relative');
            style.style('top'     , '-45px');
            title.setInitDisp(false);
            frame.addChild(title);
            
            super.addElement(frame, cbf, cbp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
