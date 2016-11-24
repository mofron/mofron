/**
 * @file   Header.js
 * @brief  Base UI of Header
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    
    initContents (vd, prm) {
        try {
            var hdr_conts = new mofron.util.Vdom('div');
            hdr_conts.setStyle('width', '100%');
            //hdr_conts.setStyle('float', 'left');
            hdr_conts.setStyle('border-bottom', 'solid 1px lightgray');
            hdr_conts.setStyle('position', 'fixed');
            vd.addChild(hdr_conts);
            
            var hdr_pad = new mofron.util.Vdom('div');
            //hdr_pad.setStyle('float', 'none');
            vd.addChild(hdr_pad);
            
            this.height(50);
            
            
            //if (null !== this.theme.colors[0]) {
            //    conts_style.style(
            //        'background',
            //        this.theme.colors[0].getStyle(),
            //        ' .conts'
            //    );
            //}
            
            this.addLayout(new mofron.layout.Horizon());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getEventTgt () {
        try {
console.log('get event target : ' + this.vdom.getChild(1).getId());
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
