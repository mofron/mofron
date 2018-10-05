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
    
    execPrmMap : (tgt) => {
        try {
            if (true !== mofron.func.isInclude(tgt, 'Base')) {
                throw new Error('invalid parameter');
            }
            let chk_prm = tgt.param();
            let prm_map = tgt.prmMap();
            
            if (chk_prm.length > prm_map.length) {
                throw new Error('mismatch parameter check count');
            }
            //let obj = this;
            let opt = {};
            for (let cidx in chk_prm) {
                opt[prm_map[cidx]] = chk_prm[cidx];
                tgt.execOption(opt);
            }
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
    
    /*** color functions ***/
    getColor : (prm) => {
        try {
            if (null === prm) {
                return null;
            } else if ('string' === typeof prm) {
                if ('none' === prm) {
                    return new mofron.Color();
                } else if (0 === prm.indexOf('rgb')) {
                    return mofron.func.convColorRgba(prm);
                } else if (0 === prm.indexOf('#')) {
                    return mofron.func.convColorHex(prm);
                } else {
                    return mofron.func.convColorName(prm);
                }
            } else if (true === Array.isArray(prm)) {
                return new mofron.Color(prm[0], prm[1], prm[2], prm[3]);
            } else if (true === mofron.func.isInclude(prm, 'Color')) {
                return prm;
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    convColorRgba : (prm) => {
        try {
            let color = null;
            if (0 === prm.indexOf('rgba(') ) {
                color = prm.substring(5);
            } else if (0 === prm.indexOf('rgb(')) {
                color = prm.substring(4);
            } else {
                throw new Error('invalid parameter');
            }
            
            color = color.substring(0, color.length-1);
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
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    convColorHex : (prm) => {
        try {
            let clr = prm.substring(1);
            if (6 !== clr.length) {
                throw new Error('invalid parameter');
            }
            return new mofron.Color(
                parseInt(clr.substring(0,2) ,16),
                parseInt(clr.substring(2,2) ,16),
                parseInt(clr.substring(4,2) ,16)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    convColorName : (prm) => {
        try {
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }

            switch (prm) {
                case 'black':
                    return new mofron.Color(0, 0, 0);
                case 'gray':
                    return new mofron.Color(128, 128, 128);
                case 'silver':
                    return new mofron.Color(192, 192, 192);
                case 'white':
                    return new mofron.Color(255, 255, 255);
                case 'blue':
                    return new mofron.Color(0, 0, 255);
                case 'navy':
                    return new mofron.Color(0, 0, 128);
                case 'teal':
                    return new mofron.Color(0, 128, 128);
                case 'green':
                    return new mofron.Color(0, 128, 0);
                case 'lime':
                    return new mofron.Color(0, 255, 0);
                case 'aqua':
                    return new mofron.Color(0, 255, 255);
                case 'yellow':
                    return new mofron.Color(255, 255, 0);
                case 'red':
                    return new mofron.Color(255, 0, 0);
                case 'fuchsia':
                    return new mofron.Color(255, 0, 255);
                case 'olive':
                    return new mofron.Color(128, 128, 0);
                case 'purple':
                    return new mofron.Color(128, 0, 128);
                case 'maroon':
                    return new mofron.Color(128, 0, 0);
                default:
                    throw new Error('not supported color');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    setColor : (cmp, key, val) => {
        try {
            if ( (true !== mofron.func.isInclude(cmp, 'Component')) ||
                 ('string' !== typeof key) ) {
                throw new Error('invalid parameter');
            }
            
            let set_style  = {};
            if ( (null === val) || ('string' === typeof val) ) {
                set_style[key] = val;
            } else if (true === mofron.func.isInclude(val, ['Base','Color'])) {
                set_style[key] = val.toString();
            } else if (true === Array.isArray(val)) {
                if (3 === val.length) {
                    set_style[key] = 'rgb('+ val[0] + ',' + val[1]  + ',' + val[2] +')';
                } else if (4 === val.length) {
                    set_style[key] = 'rgba('+ val[0] + ',' + val[1]  + ',' + val[2] + ',' + val[3] + ')';
                } else {
                    throw new Error('invalid parameter');
                }
            } else {
                throw new Error('invalid parameter');
            }
            cmp.execOption({ style : set_style });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    /*** font functions ***/
    setFontFace : (fnt, pth) => {
        try {
            if ( ('string' !== typeof fnt) || ('string' !== typeof pth) ) {
                throw new Error('invalid parameter');
            }
            
            for (let pidx in mofron.func.fontBuff) {
                if (pth === mofron.func.fontBuff[pidx]) {
                    return;
                }
            }
            mofron.func.fontBuff.push(pth);
            
            /* format */
            let pth_spt = pth.split('.');
            let format  = '';
            if ('woff' === pth_spt[pth_spt.length-1]) {
                format = "format('woff')";
            } else if ('ttf' === pth_spt[pth_spt.length-1]) {
                format = "format('truetype')";
            } else if ('otf' === pth_spt[pth_spt.length-1]) {
                format = "format('opentype')";
            } else if ('eot' === pth_spt[pth_spt.length-1]) {
                format = "format('embedded-opentype')";
            } else if ( ('svg' === pth_spt[pth_spt.length-1]) || ('svgz' === pth_spt[pth_spt.length-1])) {
                format = "format('svg')";
            }

            let style = {
                'font-family' : fnt,
                'src' : "url('" + pth + "') " + format
            };
            mofron.func.addHeadConts({
                tag      : 'style',
                contents : mofron.func.getStyleConts('@font-face',style)
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    setFontLink : (fnt, pth) => {
        try {
            if ( ('string' !== typeof fnt) || ('string' !== typeof pth) ) {
                throw new Error('invalid parameter');
            }
            
            for (let pidx in mofron.func.fontBuff) {
                if (pth === mofron.func.fontBuff[pidx]) {
                    return;
                }
            }
            mofron.func.fontBuff.push(pth);
            
            mofron.func.addHeadConts({
                tag  : 'link',
                attr : { href : pth,
                         rel  : 'stylesheet' }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    fontBuff : [],
    
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
    
    /*** size functions ***/
    getSizeValue : (prm) => {
        try {
            let type = mofron.func.getSizeType(prm);
            sp_prm = prm.split(type);
            return (2 === sp_prm[0].split('.').length) ? parseFloat(sp_prm[0]) : parseInt(sp_prm[0]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getSizeType : (prm) => {
        try {
            let stype   = ['px', '%', 'rem', 'em', 'vw', 'vh'];
            let sp_prm  = null;
            let ret_val = null;
            for (let sidx in stype) {
                sp_prm = prm.split(stype[sidx]);
                if (2 !== sp_prm.length) {
                    continue;
                }
                return stype[sidx];
            }
            throw new Error('not supported size type');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getSize : (prm) => { 
        try {
            let siz = null;
            if ('string' !== typeof prm) {
                if (null === prm) {
                    return null; //siz = [0, 'px'];
                } else {
                    throw new Error('invalid parameter');
                }
            }
            let sval  = mofron.func.getSizeValue(prm);
            let stype = mofron.func.getSizeType(prm);
            if ('px' === stype) {
                return new mofron.size.Pixel(sval);
            } else if ('rem' === stype) {
                return new mofron.size.Rem(sval);
            } else {
                return new mofron.size.Size(sval, stype);
            }
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
    
    setSize : (cmp, key, val) => {
        try {
            if ( (true !== mofron.func.isInclude(cmp, 'Component')) ||
                 ('string' !== typeof key) ) {
                throw new Error('invalid parameter');
            }
            
            let set_style  = {};
            if ( (null === val) || ('string' === typeof val) ) {
                set_style[key] = val;
            } else if (true === mofron.func.isInclude(val, ['Base','Size'])) {
                set_style[key] = val.toString();
            } else {
                throw new Error('invalid parameter');
            }
            cmp.execOption({ style : set_style });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }, 
    
    sizeCalcu : (p1, p2, flg) => {
        try {
            let prm1 = ('string' === typeof p1) ? mofron.func.getSize(p1) : p1;
            let prm2 = ('string' === typeof p2) ? mofron.func.getSize(p2) : p2;
            if ( (true !== mofron.func.isInclude(prm1, ['Base', 'Size'])) ||
                 (true !== mofron.func.isInclude(prm2, ['Base', 'Size'])) ||
                 ('boolean' !== typeof flg) ) {
                throw new Error('invalid parameter');
            }
            if (prm1.type() !== prm2.type()) {
                if ((undefined === prm1.toPxnum()) || (undefined === prm2.toPxnum())) {
                    throw new Error('not supported type');
                }
                if (true === flg) {
                    return new mofron.size.Pixel(prm1.toPxnum() + prm2.toPxnum());
                } else {
                    return new mofron.size.Pixel(prm1.toPxnum() - prm2.toPxnum());
                }
            } else {
                if (true === flg) {
                    return mofron.func.getSize((prm1.value() + prm2.value()) + prm1.type());
                } else {
                    return mofron.func.getSize((prm1.value() - prm2.value()) + prm1.type());
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    sizeSum : (p1, p2, p3) => {
        try {
            let ret = mofron.func.sizeCalcu(p1, p2, true);
            if (undefined !== p3) {
                ret = mofron.func.sizeCalcu(ret, p3, true);
            }
            return ret.toString();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    sizeDiff : (p1, p2, p3) => {
        try {
            let ret = mofron.func.sizeCalcu(p1, p2, false);
            if (undefined !== p3) {
                ret = mofron.func.sizeCalcu(ret, p3, false);
            }
            return ret.toString();
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
    
    /*** event functions ***/
    rsizWinEvent : (func, prm, tlag) => {
        try {
            let que_buf = null;
            let param   = prm;
            let time_lag = (undefined === tlag) ? 200 : tlag;
            if ( ('function' !== typeof func) ||
                 ('number'   !== typeof time_lag) ) {
                throw new Error('invalid parameter');
            }
            window.addEventListener(
                'resize',
                () => {
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
    
    isVrtAngle : () => {
        try {
            if (('mobile' !== mofron.func.devType()) && ('tablet' !== mofron.func.devType())) {
                return false;
            }
            return (window.innerHeight > window.innerWidth) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isHrzAngle : () => {
        try {
            if (('mobile' !== mofron.func.devType()) && ('tablet' !== mofron.func.devType())) {
                return false;
            }
            return (window.innerHeight < window.innerWidth) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    /*** access type functions ***/
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
};
/* end of file */
