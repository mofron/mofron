/**
 * @file  frame.js
 * @brief display base frame
 */
$(function () {
    try {
        app.parts      = {};
        app.parts.init = function() {
            try {
                app.parts.init = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
    } catch (e) {
        throw new Error(e.stack + '\n');
    }
});
/* end of file */
