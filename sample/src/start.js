/**
 * @file  start.js
 * @brief start view
 */
try {
    if (typeof app === "undefined") {
        app = {};
        app.view = {};
        /* set app function */
        app.init = function () {
            try {
                app.view = {};
                app.jsLoader = new tetraring.loader.JsPara('./src/');
                app.jsSeri   = test = new tetraring.loader.JsSeri('./src/');
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
                app.jsSeri.addPath('view/text/init.js');
                app.jsSeri.load();
                app.start();
                
                app.init = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        
        app.start = function () {
            try {
                mofron.useTemplate('CenterStyle');
                var topconts = new mofron.appframe.CenterStyle();
                
                /* set header */
                mofron.useParts('TitleHeader');
                topconts.setHeader(
                    new mofron.parts.TitleHeader('mofron.js Documentation')
                );
                
                topconts.addConts('Overview', app.getOverview());
                topconts.addConts('Index'   , app.getIndex());
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
        
        app.getOverview = function () {
            try {
                app.jsSeri.addPath('view/text/top_JP.js');
                app.jsSeri.load();
                var ret_comp = new mofron.parts.Component();
                ret_comp.addChild(
                    new mofron.parts.Text(app.view.text.top.overview)
                );
                
                return ret_comp;
            } catch (e) {
                console.error(e.stack);
                throw new Error(e);
            }
        };
        
        app.getIndex = function () {
            try {
                mofron.useParts('BoxList');
                mofron.useParts('AwesomeIcon');
                var ret_comp = new mofron.parts.Component();
                var index    = new mofron.parts.BoxList();
                
                index.addElement(
                    'Parts',
                    new mofron.parts.AwesomeIcon('fa-cogs') ,
                    function(){alert("parts");}
                );
                index.setRadius(20);
                
                ret_comp.addChild(index);
                return ret_comp;
            } catch (e) {
                console.error(e.stack);
                throw new Error(e);
            }
        };
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
