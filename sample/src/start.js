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
                
                /* set theme */
                mofron.theme.setMainColor (
                    new mofron.other.Color(37,113,130)
                );
                mofron.theme.setScndColor (
                    new mofron.other.Color(240,240,240)
                );
                mofron.theme.setFont(
                    new mofron.other.Font("'Raleway', sans-serif")
                );
                
                app.start();
                app.init = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        
        app.start = function () {
            try {
                mofron.useAppframe('CenterStyle');
                var topconts = new mofron.appframe.CenterStyle();
                
                /* set header */
                mofron.useParts('TitleHeader');
                topconts.setHeader(
                    new mofron.parts.TitleHeader('mofron.js Document')
                );
                
                topconts.addConts('Overview', new mofron.parts.Component());
                topconts.addConts('Index'   , new mofron.parts.Component());
//                
//                /* display index elements */
//                mofron.useParts('BoxList');
//                var menu = new mofron.parts.BoxList();
//                // ttl, img, cbf, cbp
//                mofron.useParts('AwesomeIcon');
//                menu.addElement(
//                    'Parts',
//                    new mofron.parts.AwesomeIcon('fa-cogs') ,
//                    function(){alert("parts");}
//                );
//                menu.addElement(
//                    'Event' ,
//                    new mofron.parts.AwesomeIcon('fa-exclamation-circle') ,
//                    function(){alert("event");}
//                );
//                
//                menu.addElement(
//                    'Layout' ,
//                    new mofron.parts.AwesomeIcon('fa-object-group') ,
//                    function(){alert("layout");}
//                );
//                
//                menu.addElement(
//                    'Effect' ,
//                    new mofron.parts.AwesomeIcon('fa-magic') ,
//                    function(){alert("effect");}
//                );
//                menu.setRadius(20);
//                conts.addChild(menu,true);
//                
//                /* display element description */
//                
//                
                topconts.start();
                app.start = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        
        //app.getOverview = 
        
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
