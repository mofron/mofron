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
                
                var main_conts = new mofron.parts.Component();
                main_conts.layout = new mofron.layout.Center(main_conts);
                main_conts.init(true);
                app.view.main_conts = main_conts;
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
