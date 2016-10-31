/*
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
            template  : {}    ,
            other     : {}    ,
            rootConts : null  ,
            useParts  : null  ,
            innerFunc : {}
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
                mofron.js_loader.Seri.addPath('parts/extend/' + name + '/' + name + '.js');
                mofron.js_loader.Seri.load();
            } catch (e) {
                console.error(e.stack);
            }
        };
        mofron.useTemplate = function(name) {
            try {
                if (false === mofron.is_loaded) {
                    /* not loaded yet */
                    throw new Error('initialize is not finished yet');
                }
                /* paramter must be string type */
                if ('string' != (typeof name)) {
                    throw new Error('invalid parameter');
                }
                mofron.js_loader.Seri.addPath('template/' + name + '/' + name + '.js');
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
