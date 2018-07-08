/**
 * @file function.js
 * @brief util functions
 * @author simpart
 */

module.exports = {
    /**
     * get unique id
     *
     * @param tgt : (object) target mofron object
     * @return (string) unique id
     */
    getId : (tgt) => {
        try {
            var _tgt = (tgt === undefined) ? null : tgt;
            var ipf  = "aid";
            if (null !== _tgt) {
                ipf = _tgt.name();
            }
            var ret_id = ipf + '-' + new Date().getTime() + '-';
            var loop   = 0;
            var val    = 0;
            for (loop = 0; loop < 8; loop++) {
                val = Math.random() * 16 | 0;
                ret_id += (loop == 12 ? 4 : loop == 16 ? val & 3 | 8 : val).toString(16);
            }
            return ret_id;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getCamel : (sty) => {
        try {
            if ('string' !== (typeof sty)) {
                throw new Error('invalid parameter');
            }
            
            if ( (sty.length-1) === sty.lastIndexOf('-') ) {
                throw new Error('invalid parameter');
            }
            
            var skip = false;
            if (0 === sty.indexOf('-')) {
                skip = true;
            }
            
            var ret_val = sty;
            var ret_buf = null;
            var up_str  = null;
            var idx     = null;
            while(true) {
                idx = ret_val.indexOf('-');
                if (-1 === idx) {
                    break;
                }
                up_str   = ret_val.charAt(idx+1).toUpperCase();
                ret_buf  = ret_val.substr(0, idx);
                if (true === skip) {
                    skip = false;
                    ret_val  = ret_buf + ret_val.substr(idx+1);
                } else {
                    ret_val  = ret_buf + up_str + ret_val.substr(idx+2);
                }
            }
            return ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getColor : (sty) => {
        try {
            if ('none' === sty) {
                return new mofron.Color();
            } else if (null === sty) {
                return null;
            }
            
            var color = null;
            if (-1 !== sty.indexOf('rgba(') ) {
                color = sty.substring(5);
            } else if (-1 !== sty.indexOf('rgb(')) {
                color = sty.substring(4);
            } else {
                return null;
            }
            
            color = color.substring(0,color.length-1);
            color = color.split(',');
            if (3 === color.length) {
                return new mofron.Color(
                               parseInt(color[0]),
                               parseInt(color[1]),
                               parseInt(color[2])
                           );
            } else if (4 === color.length) {
                return new mofron.Color(
                               parseInt(color[0]),
                               parseInt(color[1]),
                               parseInt(color[2]),
                               parseInt(color[3])
                           );
            } else {
                return null;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getLength : (val) => {
        try {
            if ('string' !== typeof val) {
                return null;
            }
            if ((val.length-2) === val.indexOf('px')) {
                return parseInt(val.split('px')[0]);
            }
            return val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getCompSize : (cmp) => {
        try {
            if (false === mofron.func.isInclude(cmp, 'Component')) {
                throw new Error('invalid parameter');
            }
            let wid = null;
            let hei = null;
            
            /* get x-value */
            if ('function' === (typeof cmp.width)) {
                wid = cmp.width();
            } else if ('function' === (typeof cmp.size)) {
                wid = cmp.size().width;
            } else {
                wid = mofron.func.getLength(cmp.style('width'));
            }
            
            /* get y-value */
            if ('function' === (typeof cmp.height)) {
                hei = cmp.height();
            } else if ('function' === (typeof cmp.size)) {
                hei = cmp.size().height;
            } else {
                hei = mofron.func.getLength(cmp.style('height'));
            }
            
            return {
                width  : wid,
                height : hei
            };
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getStyleConts : (sel,cnt) => {
        try {
            var ret_val = sel + '{';
            for (var idx in cnt) {
                ret_val += idx + ':' + cnt[idx] + ';';
            }
            return ret_val + '}';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isInclude : (obj, nm) => {
        try {
            if ((null === obj) || ('object' !== typeof obj)) {
                return false;
            }
            if ('function' !== typeof obj.name) {
                return false;
            }
            var chk_nm  = ('string' === typeof nm) ? [nm] : nm;
            var chk_idx = 0;
            var name_lst = obj.getNameList();
            for (var idx in name_lst) {
                if(chk_nm[chk_idx] === name_lst[idx]) {
                    chk_idx++;
                    if (chk_nm.length === chk_idx) {
                        return true;
                    }
                    continue;
                }
                if (0 < chk_idx) {
                    break;
                }
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isObject : (obj, nm) => {
        try {
            if ((null === obj) || ('object' !== typeof obj)) {
                return false;
            }
            if ('function' !== typeof obj.name) {
                return false;
            }
            if ('string' !== typeof nm) {
                throw new Error('invalid parameter');
            }
            
            if (nm === obj.name()) {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    addHeadConts : (opt) => {
        try {
            if ( ('object' !== typeof opt) || (null === opt) ) {
                throw new Error('invalid parameter');
            }
            
            var tag       = opt.tag;
            var contents  = (undefined === opt.contents) ? '' : opt.contents;
            if ( (undefined === tag)       ||
                 ('string' !== typeof tag) ) {
                throw new Error("invalid parameter");
            }
            
            /* get attr contents */
            var set_conts  = '';
            var attr_conts = '';
            var attr = (undefined === opt.attr) ? null : opt.attr;
            for (var key in attr) {
                attr_conts += key;
                if (null != attr[key]) {
                    attr_conts += '="' + attr[key] + '" ';
                }
            }
            
            /* check simple tag */
            var simple = false;
            if (undefined === opt.simple) {
                simple = ( ('link' === tag) ||
                           ('meta' === tag) ||
                           ('base' === tag) ) ? true : false;
            } else {
                simple = opt.simple;
            }
            
            /* init contents string */
            let conts_str = '';
            if ('object' === typeof contents) {
                for (let cidx in contents) {
                    if ('string' !== typeof contents[cidx]) {
                        throw new Error('invalid parameter');
                    }
                    conts_str += contents[cidx];
                }
            } else if ('string' === typeof contents) {
                conts_str = contents;
            } else {
                throw new Error('invalid parameter'); 
            }
            
            /* add tag */
            if (false === simple) {
                var add_conts = '<' + tag + ' '+ attr_conts +'>' + conts_str + '</' + tag + '>';
            } else {
                var add_conts = '<' + tag + ' '+ attr_conts +'>' + conts_str;
            }
            
            if (undefined !== mofron.ssr) {
                mofron.ssr.head(add_conts);
            } else { 
                document.head.insertAdjacentHTML('beforeend',add_conts);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    rsizWinEvent : (func, prm, tlag) => {
        try {
            var que_buf = null;
            var param   = prm;
            var time_lag = (undefined === tlag) ? 200 : tlag;
            if ( ('function' !== typeof func) ||
                 ('number'   !== typeof time_lag) ) {
                throw new Error('invalid parameter');
            }
            window.addEventListener(
                'resize',
                function() {
                    try {
                        clearTimeout(que_buf);
                        que_buf = setTimeout(func, time_lag, param);
                    } catch (e) {
                        console.error(e.stack);
                        throw new Error();
                    }
                },
                false
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    devType : () => {
        try {
            let ua = navigator.userAgent;
            if ( ua.indexOf('iPhone')  > 0 ||
                 ua.indexOf('iPod')    > 0 ||
                 ua.indexOf('Android') > 0 &&
                 ua.indexOf('Mobile')  > 0 ){
                return 'smartphone';
            } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
                return 'tablet';
            } else {
                return 'other';
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    responsive : (cmp, tgt, val) => {
        try {
            if (false === mofron.func.isInclude(cmp, 'Component')) {
                throw new Error('invalid parameter');
            }
            let resp = cmp.responsive();
            if (null === resp) {
                return;
            }
            for (let idx in resp) {
                if (tgt === idx) {
                    if ( ('number' === typeof resp[idx]) && ('number' === typeof val)) {
                        cmp[tgt](cmp[tgt]() + resp[idx]);
                    } else if ('string' === typeof resp[idx]) {
                        cmp[tgt](resp[idx]);
                    } else if ('function' === typeof resp[idx]) {
                        resp[idx](cmp, val);
                    }
                    break;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
};
/* end of file */
