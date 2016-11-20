/**
 * @file layout/Base.js
 * @brief Base class of layout
 */
module.exports = class {
    constructor () {
        try {
            this.target  = null;
            this.exe_cnt = -1;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    //setTarget(tgt) {
    //    try {
    //        this.target = tgt;
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
    
    layout () {
        try {
            console.warn('layout is not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
