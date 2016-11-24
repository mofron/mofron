/**
 * @file   Button.js
 * @author simpart
 */

/**
 * @class Button
 */
module.exports = class extends mofron.parts.Base {
    constructor (cnt) {
        try {
            super(cnt);
            if ('string' === (typeof cnt)) {
                this.addChild(new mofron.parts.Text(cnt));
            } else if ('object' === (typeof cnt)) {
                this.addChild(cnt);
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget () {
        try {
            return this.vdom.getChild(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents (vd, prm) {
        try {
            vd.addChild(new mofron.util.Vdom('button'));
            this.width(50);
            this.height(25);
            
            //this.style('display'        , 'flex');
            //this.style('align-items'    , 'center');
            //this.style('justify-content', 'center');
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
            if (null === func) {
                throw new Error('invalid parameter');
            }
            var _prm  = (prm === undefined) ? null : prm;
            var click = new mofron.event.Click();
            click.setCbfunc (func, _prm);
            this.addEvent(click);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (val) {
        try {
            var _val = (val === undefined) ? null : val;
            var btn  = this.getTarget();
            if (null === _val) {
                return btn.getStyle('width');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            btn.setStyle('width', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            var _val = (val === undefined) ? null : val;
            var btn  = this.getTarget();
            if (null === _val) {
                return btn.getStyle('height');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            btn.setStyle('height', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
