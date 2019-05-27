/**
 * @file namesp.js
 * @brief define namespace
 */
let mf = require('mofron');

/**
 * get GET parameter fron url
 */
let getParam = () => {
    try {
        let ret   = {};
        let param = location.search.substring(1).split('&');
        for(let loop = 0; loop < param.length; loop++) {

            let key_srh = param[loop].search(/=/);
            let key     = (-1 !== key_srh) ? param[loop].slice(0, key_srh) : '';
            let val     = param[loop].slice(param[loop].indexOf('=', 0) + 1);
            if ('' !== key) {
                ret[key] = decodeURI(val);
            }
        }
        return ret;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};

/**
 * get hash value from url
 */
let getHash = () => {
    try {
        let ret = window.location.hash.split('#')[1];
        return (undefined === ret) ? null : ret;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
};


module.exports = {
    root : new mf.Component(),
    conf : {
        GET  : getParam(),
        hash : getHash(),
    }
};
/* end of file */
