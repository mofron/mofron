/**
 * @file function.js
 * @brief util functions
 * @author simpart
 */

/**
 * get unique id
 *
 * @param tgt : (object) target mofron object
 * @return (string) unique id
 */
mofron.func.getId = function (tgt) {
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
}

mofron.func.getCamel = function(sty) {
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
}

mofron.func.getColor = function (sty) {
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
}

mofron.func.getLength = function (val) {
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
}

mofron.func.getStyleConts = function (sel,cnt) {
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
}

mofron.func.isInclude = function (obj, nm) {
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
}

mofron.func.isObject = function (obj, nm) {
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
}

mofron.func.addHeadConts = function (opt) {
    try {
        if ( ('object' !== typeof opt) || (null === opt) ) {
            throw new Error('invalid parameter');
        }
        
        var tag       = opt.tag;
        var contents  = (undefined === opt.contents) ? '' : opt.contents;
        if ( (undefined === tag)       ||
             ('string' !== typeof tag) ||
             ('string' !== typeof contents) ) {
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
        
        /* add tag */
        if (false === simple) {
            var add_conts = '<' + tag + ' '+ attr_conts +'>' + contents + '</' + tag + '>';
        } else {
            var add_conts = '<' + tag + ' '+ attr_conts +'>' + contents;
        }
        document.head.insertAdjacentHTML('beforeend',add_conts);
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}

mofron.func.addResizeWin = function (func, prm, tlag) {
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
}
/* end of file */
