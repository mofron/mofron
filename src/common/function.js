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
     
    getSize : (prm) => {
        try {
            if ('string' !== typeof prm) {
                if (null === prm) {
                    return [0, null];
                } else {
                    throw new Error('invalid parameter');
                }
            }
            let stype   = ['px', '%', 'em', 'rem', 'vw', 'vh'];
            let sp_prm  = null;
            let ret_val = null;
            for (let sidx in stype) {
                sp_prm = prm.split(stype[sidx]);
                if (2 !== sp_prm.length) {
                    continue;
                }
                ret_val = (2 === sp_prm[0].split('.').length) ? parseFloat(sp_prm[0]) : parseInt(sp_prm[0]);
                if ((ret_val + '') !== sp_prm[0]) {
                    continue;
                }
                return [ret_val, stype[sidx]];
            }
            throw new Error('not supported size type');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getRemBase : () => {
        try {
            let fsize = mofron.func.getSize(
                document.documentElement.style[
                    mofron.func.getCamel('font-size')
                ]
            );
            if (null === fsize[1]) {
                throw new Error('invalid html font-size');
            }
            return 16 * (fsize[0] / 100);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    convRem2Px : (prm) => {
        try {
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            return prm * mofron.func.getRemBase();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    convPx2Rem : (prm) => {
        try {
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            return prm / mofron.func.getRemBase();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    compSize : (cmp, key, val) => {
        try {
            if ( (true !== mofron.func.isInclude(cmp, 'Component')) ||
                 ('string' !== typeof key) ) {
                throw new Error('invalid parameter');
            }
            if (undefined === val) {
                /* getter */
                return cmp.style(key);
            }
            /* setter */
            let set_style  = {};
            set_style[key] = ('number' === typeof val) ? (val + '') + cmp.sizeType() : val;
            if ('string' !== typeof set_style[key]) {
                throw new Error('invalid parameter');
            }
            cmp.style(set_style);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    sizeDiff : (siz1, siz2) => {
        try {
            let siz1_val = null;
            if ('string' === typeof siz1) {
                siz1_val = mofron.func.getSize(siz1);
            } else if ('number' === typeof siz1) {
                if ('string' !== typeof siz2) {
                    throw new Error('invalid parameter');
                }
                siz1_val = [siz1, mofron.func.getSize(siz2)[1]];
                if (null === siz1_val[1]) {
                    throw new Error('invalid parameter');
                }
            } else {
                throw new Error('invalid parameter');
            }
            
            if ('string' === typeof siz2) {
                let siz2_val = mofron.func.getSize(siz2);
                if (siz1_val[1] !== siz2_val[1]) {
                    throw new Error('mismatched size type');
                }
                return (siz1_val[0] - siz2_val[0]) + siz1_val[1];
            } else if ('number' === typeof siz2) {
                return (siz1_val[0] - siz2) + siz1_val[1];
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    sizeSum : (p1,p2,p3,p4,p5) => {
        try {
            let stype   = null;
            let chk_stp = null;
            let aidx    = null;
            let args    = [p1,p2,p3,p4,p5];
            for (aidx in args) {
                if (undefined === args[aidx]) {
                    continue;
                }
                if ('string' === typeof args[aidx]) {
                    chk_stp = mofron.func.getSize(args[aidx])[1];
                    if (null === stype) {
                        stype = chk_stp;
                    }
                    if ((stype !== null) && (null !== chk_stp) && (stype !== chk_stp)) {
                        throw new Error('invalid parameter');
                    }
                } else if ((null !== args[aidx]) && ('number' !== typeof args[aidx])) {
                    throw new Error('invalid parameter');
                }
            }
            if (null === stype) {
                throw new Error('could not find size type');
            }
            let ret_val = 0;
            for (aidx in args) {
                if (undefined === args[aidx]) {
                    continue;
                }
                if ('string' === typeof args[aidx]) {
                    ret_val += mofron.func.getSize(args[aidx])[0];
                } else if ('number' === typeof args[aidx]) {
                    ret_val += args[aidx];
                }
            }
            return (ret_val + '') + stype;
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
    angleEvent : () => {
        try {
            let nti_fnc = (evt) => {
                try {
                    let ef = null;
                    if ( ("landscape-primary"   === screen.mozOrientation) ||
                         ("landscape-secondary" === screen.mozOrientation) ) {
                        /* horizon event */
                        ef = mofron.func.hrzAngleEvent();
                    } else if ( ("portrait-primary"   === screen.mozOrientation) ||
                                ("portrait-secondary" === screen.mozOrientation) ) {
                        /* vertical event */
                        ef = mofron.func.vrtAngleEvent();
                    }
                    for (let eidx in ef) {
                        ef[eidx][0](evt, ef[eidx][1]);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            
            if ( (undefined !== screen.orientation) &&
                 (null      === screen.orientation.onchange) ) {
                //screen.orientation.onchange = nti_fnc;
                screen.orientation.onchange = (evt) => {
                    try {
                        let ef = null;
                        if ( ("landscape-primary"   === screen.orientation.type) ||
                             ("landscape-secondary" === screen.orientation.type) ) {
                            /* horizon event */
                            ef = mofron.func.hrzAngleEvent();
                        } else if ( ("portrait-primary"   === screen.orientation.type) ||
                                    ("portrait-secondary" === screen.orientation.type) ) {
                            /* vertical event */
                            ef = mofron.func.vrtAngleEvent();
                        }
                        for (let eidx in ef) {
                            ef[eidx][0](evt, ef[eidx][1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            } else if (null === screen.onmozorientationchange) {
                screen.onmozorientationchange = nti_fnc;
            } else if (null === screen.onmsorientationchange) {
                screen.onmsorientationchange = nti_fnc;
            } else {
                if ( (1 < mofron.func.hrzAngleEvent().length) ||
                     (1 < mofron.func.vrtAngleEvent().length)) {
                    return;
                }
                window.addEventListener(
                    "orientationchange",
                    (evt) => {
                        try {
                            let ef = null;
                            if (window.innerHeight < window.innerWidth) {
                                /* horizon event */
                                ef = mofron.func.hrzAngleEvent();
                            } else {
                                /* vertical event */
                                ef = mofron.func.vrtAngleEvent();
                            }
                            for (let eidx in ef) {
                                ef[eidx][0](evt, ef[eidx][1]);
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    hrzAngleEvent : (func, prm) => {
        try {
            if (undefined === func) {
                /* getter */
                return mofron.func.hrzAngleEvent_func;
            }
            /* setter */
            if ('function' !== typeof func) {
                throw new Error('invalid parameter');
            }
            mofron.func.hrzAngleEvent_func.push(new Array(func, prm));
            mofron.func.angleEvent();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    hrzAngleEvent_func : new Array(),
    vrtAngleEvent : (func, prm) => {
        try {
            if (undefined === func) {
                /* getter */
                return mofron.func.vrtAngleEvent_func;
            }
            /* setter */
            if ('function' !== typeof func) {
                throw new Error('invalid parameter');
            }
            mofron.func.vrtAngleEvent_func.push(new Array(func, prm));
            mofron.func.angleEvent();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    vrtAngleEvent_func : new Array(),
    devType : () => {
        try {
            let ua = navigator.userAgent;
            if ( ua.indexOf('iPhone')  > 0 ||
                 ua.indexOf('iPod')    > 0 ||
                 ua.indexOf('Android') > 0 &&
                 ua.indexOf('Mobile')  > 0 ){
                return 'mobile';
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
    osType  : () => {
        try {
            let ua = window.navigator.userAgent;
            if ( ua.indexOf('iPhone')  > 0 ||
                 ua.indexOf('iPod')    > 0 ||
                 ua.indexOf('iPad')    > 0 ) {
                return 'ios';
            } else if (ua.indexOf('Android') > 0) {
                return 'android';
            } else {
                return 'other';
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    brsType : () => {
        try {
            let ua = window.navigator.userAgent.toLowerCase();
            if( (ua.indexOf('msie')    !== -1) ||
                (ua.indexOf('trident') !== -1) ) {
                return 'ie';
            } else if (ua.indexOf('edge') != -1) {
                return 'edge';
            } else if (ua.indexOf('chrome') != -1) {
                return 'chrome';
            } else if (ua.indexOf('safari') != -1) {
                return 'safari';
            } else if (ua.indexOf('firefox') != -1) {
                return 'firefox';
            } else if (ua.indexOf('opera') != -1) {
                return 'opera';
            } else {
                return 'other';
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    convColorCode : (prm) => {
        try {
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            
            switch (prm) {
                case 'black':
                    return [0, 0, 0];
                case 'gray':
                    return [128, 128, 128];
                case 'silver':
                    return [192, 192, 192];
                case 'white':
                    return [255, 255, 255];
                case 'blue':
                    return [0, 0, 255];
                case 'navy':
                    return [0, 0, 128];
                case 'teal':
                    return [0, 128, 128];
                case 'green':
                    return [0, 128, 0];
                case 'lime':
                    return [0, 255, 0];
                case 'aqua':
                    return [0, 255, 255];
                case 'yellow':
                    return [255, 255, 0];
                case 'red':
                    return [255, 0, 0];
                case 'fuchsia':
                    return [255, 0, 255];
                case 'olive':
                    return [128, 128, 0];
                case 'purple':
                    return [128, 0, 128];
                case 'maroon':
                    return [128, 0, 0];
                default:
                    throw new Error('not supported color');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
};
/* end of file */
