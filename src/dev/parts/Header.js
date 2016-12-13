/**
 * @file   Header.js
 * @brief  Base UI of Header
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    
    initContents (vd, prm) {
        try {
            /* set header style */
            var hdr_conts = new mofron.util.Vdom('div');
            hdr_conts.setStyle('width', '100%');
            hdr_conts.setStyle('border-bottom', 'solid 1px lightgray');
            hdr_conts.setStyle('position', 'fixed');
            vd.addChild(hdr_conts);
            var hdr_pad = new mofron.util.Vdom('div');
            vd.addChild(hdr_pad);
            
            /* set default height */
            this.height(50);
            
            /* child parts is added at horizon layout */
            this.addLayout(new mofron.layout.Horizon());
            
            if (undefined != mofron.theme) {
                var clr = mofron.theme.getColor(0);
                if (null !== clr) {
                    this.color(clr);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setThemeColor () {
        try {
            if (undefined != mofron.theme) {
                var clr = mofron.util.theme.getColor(0);
                if (null !== clr) {
                    this.color(clr);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getEventTgt () {
        try {
            return this.vdom;//.getChild(1);
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
    /**
     * set/get header height
     *
     * @param hei : (int) height (px)
     */
    height (val) {
        try {
            var _val = (val === undefined) ? null : val;
            var hdr  = this.getTarget();
            
            if (null === _val) {
                return hdr.getStyle('height');
            }
            if ('number' != (typeof _val)) {
                throw new Error('invalid parameter');
            }
            hdr.setStyle('height', val + 'px');
            this.vdom.getChild(1).setStyle('height', val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set header background color
     *
     * col : (string) color
     */
    color (col) {
        try {
            if ( (null === col) ||
                 (col  === undefined)) {
                throw new Error('invalid parameter');
            }
            
            if ('object' != (typeof col)) {
                throw new Error('invalid parameter');
            }
            this.style('background', col.getStyle());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
