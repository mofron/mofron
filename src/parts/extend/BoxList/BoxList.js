/**
 * @file   BoxList.js
 * @author simpart
 */

mofron.parts.BoxList = class extends mofron.parts.Menu {
    /**
     * initialize Header
     *
     * @param cnt : (string) header title
     */
    constructor () {
        try {
            super();
            mofron.useParts('ImageBox');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            super.initConts(disp);
            this.addChild(new mofron.parts.Base(),disp);
            this.addLayout(new mofron.layout.Float('left'));
            this.addLayout(new mofron.layout.Margin('right',25));
            this.addLayout(new mofron.layout.Margin('top',25));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addElement (ttl, img, cbf, cbp) {
        try {
            super.addElement(new mofron.parts.ImageBox(ttl,img), cbf, cbp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setRadius (val) {
        try {
            if (0 === this.child.length) {
                console.warn('there is no children parts.');
                return;
            }
            for(var idx in this.child) {
                this.child[idx][0].setRadius(val);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
