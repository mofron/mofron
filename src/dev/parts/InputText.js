/**
 * @file   Input.js
 * @brief  Base of UI InputText Class
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    constructor (val) {
        try {
            super(val);
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
    
    initContents (vd, prm) {
        try {
            vd.addChild(new mofron.util.Vdom('input'));
            this.width(200);
            this.height(25);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (val) {
        try {
            var _val  = (val === undefined) ? null : val;
            var input = this.getTarget();
            if (null === _val) {
                return input.getStyle('width');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            input.setStyle('width', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (val) {
        try {
            var _val = (val === undefined) ? null : val;
            var input = this.getTarget();
            if (null === _val) {
                return input.getStyle('height');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            input.setStyle('height', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getText() {
        try {
            var vd = this.getTarget();
            if (false === vd.isPushed()) {
                return null;
            }
            var dm = document.querySelector('#'+vd.getId());
            return dm.value;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
