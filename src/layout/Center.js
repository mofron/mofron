/**
 * @file Center.js
 */

mofron.layout.Center = class {
    constructor () {
        try {
            this.target = null;
            this.rate   = 80;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setRate (rate) {
        try {
            this.rate = rate;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setTgtParts(tgt) {
        try {
            this.target = tgt;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    layout (child,disp) {
        try {
            var dummy = new mofron.parts.Component();
            dummy.parent = this.target;
            dummy.addChild(child);
            dummy.style.addStyle('width'   , this.rate + '%');
            dummy.style.addStyle('position', 'relative');
            dummy.style.addStyle('left'    , (100 - this.rate)/2 + '%');
            dummy.init(disp);
            child.parent = this.target;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
