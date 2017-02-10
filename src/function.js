/**
 * @file func.js
 */

mofron.func.getId = function(tgt) {
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
        throw new e;
    }
}

mofron.func.getCamelStyle = function(sty) {
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

mofron.func.getColorObj = function (sty) {
    try {
        if ('none' === sty) {
            return new mofron.util.Color();
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
            return new mofron.util.Color(
                           parseInt(color[0]),
                           parseInt(color[1]),
                           parseInt(color[2])
                       );
        } else if (4 === color.length) {
            return new mofron.util.Color(
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
        throw new Error();
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
        throw new Error();
    }
}
