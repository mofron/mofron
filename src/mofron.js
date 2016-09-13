/**
 * @file  mafron.js
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            conf : {
                base_path : './'
            },
            mng  : {
                is_loaded : false
            },
            parts : {},
            /**
             *
             */
            loadParts : null,
            
        };
        
        mofron.loadParts = function(mod, cb_func, prm) {
            try {
                if (false === mofron.mng.is_loaded) {
                    /* not loaded yet */
                    setTimeout(
                        function(mod, cb_func, prm) {
                            mofron.loadParts(mod, cb_func, prm);
                        }       ,
                        200     ,
                        mod     ,
                        cb_func ,
                        prm
                    );
                    return;
                }
                var p_cb_func = cb_func || null;
                var p_prm     = prm     || null;
                                
                                
            } catch (e) {
                console.error(e.stack);
            }
        };
        
        //$.getScript('./src/lib/tetraring4js/src/tetraring.js');
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/* end of file */
