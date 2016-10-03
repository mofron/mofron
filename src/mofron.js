/**
 * @file  mafron.js
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            js_loader : null  ,
            init      : null  ,
            theme     : null  ,
            parts     : {}    ,
            layout    : {}    ,
            effect    : {}    ,
            other     : {}    ,
            useParts  : null  
            
        };
        mofron.init     = function(bp, cb) {
            try {
                /* set base path */
                var _bp = bp || null;
                var _cb = cb || null;
                if (null != _bp) {
                    tetraring.base_path = _bp;
                }
                mofron.js_loader = new tetraring.loader.JsLoader(_bp);
                
                /* load core parts */
                mofron.js_loader.addPath(tetraring.base_path + 'parts/base/Component.js');
                mofron.js_loader.addPath(tetraring.base_path + 'other/Color.js');
                mofron.js_loader.addPath(tetraring.base_path + 'other/Theme.js');
                mofron.js_loader.load(
                    function() {
                        try {
                            mofron.theme = new mofron.other.Theme();
                            mofron.js_loader.addPath('parts/base/Header.js');
                            mofron.js_loader.load(_cb,null);
                        } catch (e) {
                            console.error(e.stack + '\n');
                        }
                    }
                );
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        mofron.useParts = function(name) {
            try {
                //if (false === mofron.mng.is_loaded) {
                //    /* not loaded yet */
                //    throw new Error('initialize is not finished yet');
                //}
                ///* paramter must be string type */
                //if ('string' != (typeof name)) {
                //    throw new Error('invalid parameter');
                //}
                //var p_name = name.split('/');
                //if (1 != p_name.length) {
                //    throw new Error('invalid parameter');
                //}
                //tetraring.loader.jsSerial([mofron.conf.base_path + '/src/parts/extends/' + name]);
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
