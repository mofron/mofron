/**
 * @file  start.js
 * @brief start view
 */
try {
    if (typeof app === "undefined") {
        app = {};
        /* set app function */
        app.init = function () {
            try {
                app.view = {};
                app.jsLoader = new tetraring.loader.JsPara('./src/');
                app.jsLoader.addPath('view/frame.js');
                
                app.jsLoader.load(function() {
                    try {
                        app.start();
                        
                        //var style = new mofron.other.Styles(mofron.rootConts);
                        //style.style('margin', '0px');
                        //mofron.rootConts.init();
                        //mofron.rootConts.visible(true);
                    } catch (e) {
                        console.error(e.stack + '\n');
                    }
                },null);
                app.init = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        
        app.start = function () {
            try {
                mofron.theme.setMainColor (
                    new mofron.other.Color(230,230,230,1)
                );
                /* set app base frame */
                app.view.frame.init();
                
                /* display index title */
                var conts = app.view.main_conts;
                var title = new mofron.parts.Title('Index');
                conts.addChild(title,true);
                
                /* display index elements */
                mofron.useParts('BoxList');
                var menu = new mofron.parts.BoxList();
                menu.addElement(
                    new mofron.parts.Text('Parts'),
                    function(){alert("test");}
                );
                conts.addChild(menu,true);
                
                /* display element description */
                
                
                app.start = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
        
        /* initialize mofron */
        mofron.init(
            '../src/',
            app.init
        );
    } else {
        throw new Error('failed app initialize');
    }
} catch (e) {
    console.error(e.stack);
}
/* end of file */
