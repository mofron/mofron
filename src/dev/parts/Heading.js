/**
 * @file   Heading.js
 * @brief  Base UI of Heading
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    constructor (txt, lv) {
        try {
            var _lv = (lv === undefined) ? 1 : lv;
            if ( (null === txt) || ('number' != (typeof _lv)) ) {
                throw new Error('invalid parameter');
            }
            if ( (1 > _lv) || (6 < _lv)) {
                throw new Error('invalid parameter');
            }
            super([txt,_lv]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents (vd, prm) {
        try {
            var frame = new mofron.parts.Frame();
            frame.style('width', '100%');
            frame.style('height', null);
            this.addChild(frame);
            
            var conts = new mofron.util.Vdom('h' + prm[1]);
            conts.setStyle('margin', '0px');
            conts.setText(prm[0]);
            frame.getTarget().addChild(conts);
            
            //var style = new mofron.other.Styles(this, ' div');
            //style.style('width'  , '100%');
            //style.style('height' , '35px');
            //style.style('border-left'  , 'solid 15px black');
            //style.style('border-bottom', 'solid 1px black');
            //if (null !== this.theme.colors[0]) {
            //    style.style('border-color', this.theme.colors[0].getStyle());
            //}
            //
            //var ttl_style = new mofron.other.Styles(this.title);
            //ttl_style.style('margin-left'  , '20px');
            //this.addChild(this.title,disp);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
