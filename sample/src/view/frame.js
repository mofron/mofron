/**
 * @file  frame.js
 * @brief display base frame
 */
$(function () {
    try {
        app.view.frame      = {};
        app.view.frame.init = function() {
            try {
                mofron.useParts('TitleHeader');
                var hdr = new mofron.parts.TitleHeader('mofron.js Document');
                hdr.init(true);
                
                app.view.frame.init = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
});
/* end of file */
