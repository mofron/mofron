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
                
                var center = new mofron.parts.Component();
                center.layout = new mofron.layout.Center(center);
                center.layout.setRate(60);
                center.init(true);
                
                
                var grid = new mofron.parts.Component();
                grid.layout = new mofron.layout.Grid(grid);
                grid.layout.setGrid(3,1);
                center.addChild(grid);
                
                app.view.main_conts = grid;
                
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
