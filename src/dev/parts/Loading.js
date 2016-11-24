/**
 * @file   Loading.js
 * @brief  Base UI Loading Class
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    constructor (prm) {
        try {
            super();
            this.timeout = 0;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    /**
     * 
     */
    initContents (vd,tgt) {
        try {
            var txt = new mofron.util.Vdom('div');
            txt.setText('Loading..');
            vd.addChild(txt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    notifyTimeout (cbf, to) {
        try {
            if (0 > to) {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setVisible (flg, eff) {
        try {
            super.setVisible(flg, eff);
            if ( (true === flg) &&
                 (0    !=  this.timeout)) {
                
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
