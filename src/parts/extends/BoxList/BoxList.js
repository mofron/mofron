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
            
            
            title.setAlign('center');
            title.setThickness(30);
            var style = new mofron.other.Styles(title);
            style.style('position', 'relative');
            style.style('top'     , '35px');
            title.setInitDisp(false); 
            frame.addChild(title);
            
            
            //var vcen = new mofron.layout.VartCenter(30);
            //vcen.setTarget(frame);
            //vcen.layout(title);
            
            super.addElement(frame, cbf, cbp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
