/**
 * @file   Background.js
 * @author simpart
 */

mofron.parts.Background = class extends mofron.parts.Component {
    
    initConts (disp) {
        try {
            super.initConts(disp);
            var style = new mofron.other.Styles(this);
            style.style('height'    , '100%');
            style.style('width'     , '100%');
            style.style('position'  , 'fixed');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setColor(clr) {
        try {
            var style = new mofron.other.Styles(this);
            style.style('background'    , clr.getStyle ());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setShadow(val) {
        try {
            var style = new mofron.other.Styles(this);
            style.style('box-shadow'    , '0px '+ val/2 + 'px '+ val +'px '+ '0px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
