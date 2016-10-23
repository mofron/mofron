/**
 * @file  frame.js
 * @brief display base frame
 */
$(function () {
    try {
        app.view.frame      = {};
        app.view.frame.init = function() {
            try {
                //mofron.useParts('TitleHeader');
                //var hdr = new mofron.parts.TitleHeader('mofron.js Document');
                //hdr.init(true);
                
                var back = new mofron.parts.Background();
                back.addLayout(new mofron.layout.HorizCenter(80));
                back.setColor(new mofron.other.Color(240,240,240));
                
                var main_conts = new mofron.parts.Background();
                main_conts.addLayout(new mofron.layout.HorizCenter(80));
                main_conts.addLayout(new mofron.layout.Padding('top',30));
                main_conts.setColor(new mofron.other.Color(255,255,255));
                main_conts.setShadow(20);
                back.addChild(main_conts,true);
                
                back.init(true);
                
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
