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
            effect    : {}    ,
            other     : {}    ,
            rootConts : null  ,
            useParts  : null  
            
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
                mofron.js_loader.Para.addPath('layout/Center.js');
                mofron.js_loader.Para.addPath('layout/Grid.js');
                mofron.js_loader.Para.addPath('other/Color.js');
                mofron.js_loader.Para.addPath('other/Theme.js');
                mofron.js_loader.Para.addPath('other/Style.js');
                mofron.js_loader.Para.load(
                    function() {
                        try {
                            var __cb = _cb;
                            mofron.theme     = new mofron.other.Theme();
                            mofron.rootConts = new mofron.parts.Component();
                            mofron.js_loader.Para.addPath('parts/base/Header.js');
                            mofron.js_loader.Para.addPath('parts/base/Text.js');
                            mofron.js_loader.Para.addPath('parts/base/Frame.js');
                            mofron.js_loader.Para.addPath('parts/base/Title.js');
                            mofron.js_loader.Para.load(function() {
                                try {
                                    __cb();
                                    mofron.is_loaded = true;
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
                mofron.js_loader.Seri.addPath('parts/extends/' + name + '.js');
                mofron.js_loader.Seri.load();
            } catch (e) {
                console.error(e.stack);
            }
        };
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/* end of file */
