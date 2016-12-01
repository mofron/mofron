/**
 * @file   Image.js
 * @brief  Base UI Image Class
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    
//    constructor (url) {
//        try {
//            super(prm);
//        } catch (e) {
//            console.error(e.stack);
//            throw e;
//        }
//    }
    
    initContents (vd, prm) {
        try {
            if ('string' !== (typeof prm)) {
                throw new Error('invalid parameter');
            }
            var image = new mofron.util.Vdom('img');
            image.setAttr('src', prm);
            vd.addChild(image);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
