/**
 * @file   Text.js
 * @brief  Base UI of Text
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    
    initContents (vd, prm) {
        try {
            if ('string' != (typeof prm)) {
                throw new Error('invalid parameter');
            }
            
            var text = new mofron.util.Vdom('div');
            text.setText(prm);
            vd.addChild(text);
            this.size(15);
            this.setTheme();
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (val) {
        try {
            var _val = (val === undefined) ? null : val;
            if (null === _val) {
                return this.getTarget().getText();
            }
            if ('string' !== (typeof _val)) {
                throw new Error('invalid parameter');
            }
            this.getTarget().setText(_val);
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
            var _val = (val === undefined) ? null : val;
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
    
    align (tp) {
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
            var _tab = (tab === undefined) ? false : tab;
            this.style('cursor', 'pointer');
            var click = new mofron.event.Click();
            if (false === _tab) {
                click = new mofron.event.Click(function(){
                    window.location.href = url;
                });
            } else {
                click = new mofron.event.Click(function(){
                    window.open(url, '_blank');
                });
            }
            this.addEvent(click);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (clr) {
        try {
            var _clr = (clr === undefined) ? null : clr;
            if (null === _clr) {
                return this.getStyleTgt().getStyle('color');
            }
            if ('object' !== (typeof _clr)) {
                throw new Error('invalid parameter');
            }
            this.style('color', _clr.getStyle());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    font (fnt) {
        try {
            var _fnt = (fnt === undefined) ? null : fnt;
            if (null === _fnt) {
                return this.getStyleTgt().getStyle('font-family');
            }
            if ('object' !== (typeof _fnt)) {
                throw new Error('invalid parameter');
            }
            this.style('font-family', _fnt.getFontFamily());
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
    
    setTheme (idx) {
        try {
            var _idx = (idx === undefined) ? 0 : idx;
            this.getTarget().addClname('mofron-theme-font' + _idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
