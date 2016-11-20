/**
 * @file   Button.js
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    constructor (cnt) {
        try {
            super(cnt);
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.addChild(new mofron.parts.Text(cnt));
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
    
    initContents (vd,prm) {
        try {
            var btn = new mofron.util.Vdom('button');
            vd.addChild(btn);
            
            this.width(50);
            this.height(25);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
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
