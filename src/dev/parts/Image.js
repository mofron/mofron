/**
 * @file   Image.js
 * @brief  Base UI Image Class
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    initContents (vd, prm) {
        try {
            if ('string' !== (typeof prm)) {
                throw new Error('invalid parameter');
            }
            var image = new mofron.util.Vdom('img');
            vd.addChild(image);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
