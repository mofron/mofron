/**
 * @file  mafron.js
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            is_loaded : false ,
            js_loader : {}    ,
            init      : null  ,
            theme     : null  ,
            parts     : {}    ,
            layout    : {}    ,
            event     : {}    ,
            effect    : {}    ,
            other     : {}    ,
            rootConts : null  ,
            useParts  : null  ,
            innerFunc : {}
        };
        mofron.init     = function(bp, cb) {
            try {
                /* set base path */
                var _bp = bp || null;
                var _cb = cb || null;
                mofron.js_loader.Para = new tetraring.loader.JsPara(_bp);
                mofron.js_loader.Seri = new tetraring.loader.JsSeri(_bp);
                
                /* load core parts */
                mofron.js_loader.Para.addPath('parts/base/Component.js');
                mofron.js_loader.Para.addPath('layout/Base.js');
                mofron.js_loader.Para.addPath('event/Base.js');
                mofron.js_loader.Para.addPath('other/Color.js');
                mofron.js_loader.Para.addPath('other/Theme.js');
                mofron.js_loader.Para.addPath('other/Styles.js');
                mofron.js_loader.Para.load(
                    function() {
                        try {
                            var __cb = _cb;
                            mofron.js_loader.Para.addPath('layout/Float.js');
                            mofron.js_loader.Para.addPath('layout/Center.js');
                            mofron.js_loader.Para.addPath('layout/Margin.js');
                            mofron.js_loader.Para.addPath('layout/Grid.js');
                            mofron.js_loader.Para.addPath('event/Click.js');
                            mofron.js_loader.Para.addPath('parts/base/Header.js');
                            mofron.js_loader.Para.addPath('parts/base/Text.js');
                            mofron.js_loader.Para.addPath('parts/base/Frame.js');
                            mofron.js_loader.Para.addPath('parts/base/Title.js');
                            mofron.js_loader.Para.addPath('parts/base/Menu.js');
                            mofron.theme     = new mofron.other.Theme();
                            mofron.rootConts = new mofron.parts.Component();
                            mofron.rootConts.parent = 'RootConts';
                            mofron.rootConts.init(true);
                            mofron.js_loader.Para.load(function() {
                                try {
                                    mofron.is_loaded = true;
                                    __cb();
                                } catch (e) {
                                    console.error(e.stack);
                                }
                            },null);
                        } catch (e) {
                            console.error(e.stack);
                        }
                    }
                );
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        };
        mofron.useParts = function(name) {
            try {
                if (false === mofron.is_loaded) {
                    /* not loaded yet */
                    throw new Error('initialize is not finished yet');
                }
                /* paramter must be string type */
                if ('string' != (typeof name)) {
                    throw new Error('invalid parameter');
                }
                mofron.js_loader.Seri.addPath('parts/extends/' + name + '/' + name + '.js');
                mofron.js_loader.Seri.load();
            } catch (e) {
                console.error(e.stack);
            }
        };
        mofron.innerFunc.getId = function () {
            try {
                var ret_id = "";
                var loop   = 0;
                var val    = 0;
                for (loop=0; loop < 32 ;loop++) {
                    val = Math.random() * 16 | 0;
                    if ((loop === 8)  ||
                        (loop === 12) ||
                        (loop === 16) ||
                        (loop === 20)) {
                        ret_id += "-";
                    }
                    ret_id += (loop == 12 ? 4 : (loop == 16 ? (val & 3 | 8) : val)).toString(16);
                }
                this.id = ret_id;
                return ret_id;
            } catch (e) {
                console.error(e.stack);
                throw new Error();
            }
        };
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/* end of file */
