/**
 * @file  frame.js
 * @brief display base frame
 */
$(function () {
    try {
        app.view.frame      = {};
        app.view.frame.init = function() {
            try {
                var hdr = new mofron.parts.Header('mofron.js');
                hdr.init(true);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
});
/* end of file */
