/**
 * @file  
 * @brief 
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            base_path : './' ,
            is_loaded : false,
                       /**
                        *
                        */
            use       : function(mod, cb_func, prm) {
                            try {
                                if (false === mofron.is_loaded) {
                                    /* not loaded yet */
                                    setTimeout(function(mod, cb_func, prm) {
                                        mofron.use(mod, cb_func, prm);
                                    }, 200, mod, cb_func, prm);
                                    return;
                                }
                                
                                var p_cb_func = cb_func || null;
                                var p_prm     = prm     || null;
                                
                                
                            } catch (e) {
                               console.error(e.stack);
                            }
                        },
            
        };
        $.getScript('./src/lib/tetraring4js/src/tetraring.js');
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/* end of file */
