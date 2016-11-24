/**
 * @file   Text.js
 * @brief  Base UI of Text
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    /**
     * initialize Header
     */
    constructor (txt) {
        try {
            super(txt);
            this.auto_color = false;
            this.size(15);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents (vd, prm) {
        try {
            if ('string' != (typeof prm)) {
                throw new Error('invalid parameter');
            }
            
            var text = new mofron.util.Vdom('div');
            text.setText(prm);
            vd.addChild(text);
            //$('#' + this.getId()).html('<div class="text-conts">'+ this.text +'</div>');
            //if ((null !== this.theme.colors[0]) &&
            //    (true === this.auto_color)) {
            //    if (true === this.auto_color) {
            //        var rgb = this.theme.colors[0].getRgba();
            //        if (290 > (rgb[0]+rgb[1]+rgb[2])) {
            //            var style = new mofron.other.Styles(this, ' div');
            //            style.style('color', 'rgba(255,255,255,'+ rgb[3] +')');
            //        }
            //    }
            //}
            //
            //if (null !== this.theme.font) {
            //    this.theme.font.font(this);
            //}
            //style.style('font-size', this.size + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (val) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (val) {
        try {
            if ('number' != (typeof val)) {
                throw new Error('invalid parameter');
            }
            var _val = (val === undefined) ? null : val
            var txt  = this.getTarget();
            if (null === _val) {
                return txt.getStyle('font-size');
            }
            txt.setStyle('font-size', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setAlign (tp) {
        try {
            //var style = new mofron.other.Styles(this, ' .text-conts');
            //style.style('text-align', tp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setLink (url,tab) {
        try {
            //var _tab = tab || false;
            //var style = new mofron.other.Styles(this, ' .text-conts');
            //style.style('cursor', 'pointer');
            //var click = new mofron.event.Click();
            //if (false === _tab) {
            //    click.setCbfunc (function(){
            //        window.location.href = url;
            //    });
            //} else {
            //    click.setCbfunc (function(){
            //        window.open(url, '_blank');
            //    });
            //}
            //this.addEvent(click);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setColor(color) {
        try {
            //var style = new mofron.other.Styles(this, ' .text-conts');
            //style.style('color', color.getStyle());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget() {
        try {
            return this.vdom.getChild(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
