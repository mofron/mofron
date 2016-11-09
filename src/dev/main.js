/*
 * @file  mafron.js
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            theme     : null  ,
            parts     : {}    ,
            layout    : {}    ,
            event     : {}    ,
            effect    : {}    ,
            appframe  : {}    ,
            other     : {}    ,
            rootConts : null  ,
            useParts  : null  ,
            innerFunc : {}
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
        mofron.parts.Base = require('./parts/base/Base');
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/* end of file */
