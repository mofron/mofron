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
                //var center = new mofron.parts.Component();
                //center.setLayout(new mofron.layout.Center());
                //center.layout.setRate(60);
                //// center.init(true);
                
                
                //var grid = new mofron.parts.Component();
                //grid.setLayout(new mofron.layout.Grid());
                //grid.layout.setGrid(3,1);
                //grid.layout.setMargin ('top',30);
                //center.addChild(grid);
                
                //center.init(true);
                //app.view.main_conts = grid;
                
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
