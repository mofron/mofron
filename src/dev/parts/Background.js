/**
 * @file   Background.js
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    
    initContents (vd, prm) {
        try {
            var div = new mofron.util.Vdom('div');
            div.setStyle('height'    , '100%');
            div.setStyle('width'     , '100%');
            div.setStyle('position'  , 'fixed');
            vd.addChild(div);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget () {
        try {
            return this.getVdom().getChild(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setColor(clr) {
        try {
            //var style = new mofron.other.Styles(this);
            //style.style('background'    , clr.getStyle ());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setShadow(val) {
        try {
            //var style = new mofron.other.Styles(this);
            //style.style('box-shadow'    , '0px '+ val/2 + 'px '+ val +'px '+ '0px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
