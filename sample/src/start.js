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
                /* show frame */
                app.view.frame.init();
                var conts = app.view.main_conts;
                var quick = new mofron.parts.Frame();
                conts.addChild(quick);
                quick.visible(true);
                /* show top contetns */
                
                /* start visible */
                $('body').fadeIn();
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
