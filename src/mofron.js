/**
 * @file  mafron.js
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            conf : {
                base_path : '.'  // path to mofron
            },
            mng  : {
                is_loaded : false
            },
            parts : {
                base    : {},
                extends : {}
            },
            /**
             *
             */
            useParts : null,
            
        };
        
        mofron.useParts = function(name) {
            try {
                if (false === mofron.mng.is_loaded) {
                    /* not loaded yet */
                    throw new Error('initialize is not finished yet');
                }
                /* paramter must be string type */
                if ('string' != (typeof name)) {
                    throw new Error('invalid parameter');
                }
                var p_name = name.split('/');
                if (1 != p_name.length) {
                    throw new Error('invalid parameter');
                }
                tetraring.loader.jsSerial([mofron.conf.base_path + '/src/parts/extends/' + name]);
            } catch (e) {
                console.error(e.stack);
            }
        };
        
        $.getScript('./src/lib/tetraring4js/src/tetraring.js');
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/* end of file */
