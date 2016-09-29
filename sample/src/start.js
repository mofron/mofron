/**
 * @file  start.js
 * @brief start view
 */
$(function() {
    try {
        /* start page header */
        mofron.init(
            '../src/parts/base/',
            function () {
                try {
                    if (typeof app === "undefined") {
                        app      = {};
                        app.view = {};
                        app.jsLoader = new tetraring.loader.JsLoader('./src/');
                        app.jsLoader.addPath('view/frame.js');
                        app.jsLoader.load(function() {
                            try {
                                startApp();
                            } catch (e) {
                                console.error(e.stack + '\n');
                            }
                        },null);
                    } else {
                        throw new Error('init error');
                    }
                } catch (e) {
                    console.error(e.stack);
                }
            }
        );
    } catch (e) {
        console.error(e.stack);
    }
});

function startApp() {
    try {
        /* show frame */
        app.view.frame.init();
        
        /* set menu */
        
        /* show top contetns */
    } catch (e) {
        console.error(e.stack);
    }
}
/* end of file */
