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
                mofron.useParts('AwesomeIcon');
                
                topconts.setHeader(
                    app.getHeader()
                );
                
                topconts.addConts('Overview', app.getOverview());
                topconts.addConts('Index'   , app.getIndex());
                
                topconts.start();
                app.start = null;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        
        app.getHeader = function () {
            try {
                var header = new mofron.parts.TitleHeader('mofron.js Documentation');
                
                var github = new mofron.parts.AwesomeIcon('fa-github');
                github.setColor(new mofron.other.Color(255,255,255));
                github.setSize(40);
                github.setLink('https://github.com/simpart/mofron', true);
                var gh_style = new mofron.other.Styles(github);
                gh_style.style('position', 'relative');
                gh_style.style('top' , '5');
                gh_style.style('left', '10%');
                header.addChild(github);
                
                header.addChild(new mofron.parts.Base());
                return header;
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        
        app.getOverview = function () {
            try {
                app.jsSeri.addPath('view/text/top_JP.js');
                app.jsSeri.load();
                var ret_comp = new mofron.parts.Base();
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
                var ret_comp = new mofron.parts.Base();
                var index    = new mofron.parts.BoxList();
                var icon     = null;
                var ico_clr  = new mofron.other.Color(80,80,80);
                
                icon = new mofron.parts.AwesomeIcon('fa-cogs');
                icon.setColor(ico_clr);
                index.addElement(
                    'Parts',
                    icon ,
                    function(){alert("parts");}
                );
                
                icon = new mofron.parts.AwesomeIcon('fa-css3');
                icon.setColor(ico_clr);
                index.addElement(
                    'Style' ,
                    icon ,
                    function(){alert("style");}
                );
                
                icon = new mofron.parts.AwesomeIcon('fa-exclamation-circle');
                icon.setColor(ico_clr);
                index.addElement(
                    'Event' ,
                    icon ,
                    function(){alert("event");}
                );
                
                icon = new mofron.parts.AwesomeIcon('fa-object-group');
                icon.setColor(ico_clr);
                index.addElement(
                    'Layout' ,
                    icon ,
                    function(){alert("layout");}
                );
                
                icon = new mofron.parts.AwesomeIcon('fa-magic');
                icon.setColor(ico_clr);
                index.addElement(
                    'Effect' ,
                    icon ,
                    function(){alert("effect");}
                );
                
                icon = new mofron.parts.AwesomeIcon('fa-files-o');
                icon.setColor(ico_clr);
                index.addElement(
                    'Template' ,
                    icon ,
                    function(){alert("template");}
                );
                
                index.setRadius(20);
                var idx_style = new mofron.other.Styles(index);
                idx_style.style('position', 'relative');
                idx_style.style('top', '-50px');
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
