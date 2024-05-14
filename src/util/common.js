/**
 * @file common.js
 * @brief common util functions
 */

mofron.util.common = {
    isinc:  (obj, nm) => {
        try {
            /* parameter check */
            if ( (null === obj) ||
                 ('object' !== typeof obj) ||
                 (true === Array.isArray(obj)) ||
                 ("function" !== typeof obj.modname) ||
                 ("function" !== typeof obj.confmng) ) {
                return false;
            }
            let chk_nm   = ("string" === typeof nm) ? [nm] : nm;
            let chk_idx  = 0;
            let name_lst = obj.confmng("modname");
            for (let idx in name_lst) {
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
    
    iscmp: (obj) => {
        try {
            return comutl.isinc(obj, "Component");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    isobj: (obj, nm) => {
        try {
            return (obj.modname() === nm) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getcmp: (prm) => {
        try {
            return new mofron.class.Component(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getcolor: (prm) => {
        try {
            if ((null === prm) || (undefined === prm)) {
                return null;
            } else if ('string' === typeof prm) {
                if ('none' === prm) {
                    return new mofron.class.Color();
                } else if (0 === prm.indexOf('rgb')) {
                    let rgb_clr = null;
                    if (0 === prm.indexOf('rgba(') ) {
                        rgb_clr = prm.substring(5);
                    } else if (0 === prm.indexOf('rgb(')) {
                        rgb_clr = prm.substring(4);
                    } else {
                        throw new Error('invalid parameter');
                    }
                    rgb_clr = rgb_clr.substring(0, rgb_clr.length-1);
                    rgb_clr = rgb_clr.split(',');
                    if (3 === rgb_clr.length) {
                        return new mofron.class.Color([
                            parseInt(rgb_clr[0]),
                            parseInt(rgb_clr[1]),
                            parseInt(rgb_clr[2])
                        ]);
                    } else if (4 === rgb_clr.length) {
                        return new mofron.class.Color([
                           parseInt(rgb_clr[0]),
                           parseInt(rgb_clr[1]),
                           parseInt(rgb_clr[2]),
                           parseInt(rgb_clr[3])
                        ]);
                    } else {
                        throw new Error('invalid parameter');
                    }
                } else if (0 === prm.indexOf('#')) {
                    /* hex */
                    let hex_clr = prm.substring(1);
                    if (6 !== hex_clr.length) {
                        throw new Error('invalid parameter');
                    }
                    return new mofron.class.Color([
                        parseInt(hex_clr.substring(0,2) ,16),
                        parseInt(hex_clr.substring(2,4) ,16),
                        parseInt(hex_clr.substring(4,6) ,16)
                    ]);
                } else {
                    /* name */
                    if ('string' !== typeof prm) {
                        throw new Error('invalid parameter');
                    }
                    switch (prm) {
                        case 'black':
                            return new mofron.class.Color([0, 0, 0]);
                        case 'gray':
                            return new mofron.class.Color([128, 128, 128]);
                        case 'silver':
                            return new mofron.class.Color([192, 192, 192]);
                        case 'white':
                            return new mofron.class.Color([255, 255, 255]);
                        case 'blue':
                            return new mofron.class.Color([0, 0, 255]);
                        case 'navy':
                            return new mofron.class.Color([0, 0, 128]);
                        case 'teal':
                            return new mofron.class.Color([0, 128, 128]);
                        case 'green':
                            return new mofron.class.Color([0, 128, 0]);
                        case 'lime':
                            return new mofron.class.Color([0, 255, 0]);
                        case 'aqua':
                            return new mofron.class.Color([0, 255, 255]);
                        case 'yellow':
                            return new mofron.class.Color([255, 255, 0]);
                        case 'red':
                            return new mofron.class.Color([255, 0, 0]);
                        case 'fuchsia':
                            return new mofron.class.Color([255, 0, 255]);
                        case 'olive':
                            return new mofron.class.Color([128, 128, 0]);
                        case 'purple':
                            return new mofron.class.Color([128, 0, 128]);
                        case 'maroon':
                            return new mofron.class.Color([128, 0, 0]);
                        default:
                            throw new Error('not supported color');
                    }
                }
            } else if (true === Array.isArray(prm)) {
                return new mofron.class.Color(prm);
            } else if (true === comutl.isinc(prm, 'Color')) {
                return prm;
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getsize: (prm) => {
        try {
            let siz = null;
            /* parameter check */
            if ('string' !== typeof prm) {
                if ((null === prm) || (undefined === prm)) {
                    return null;
                } else if (true === comutl.isinc(prm,"Size")) {
                    return prm;
                } else {
                    throw new Error('invalid parameter');
                }
            }
            /* get size type */
            let stype = ['px', '%', 'rem', 'em', 'vw', 'vh'];
            let ptype = null;
            for (let sidx in stype) {
                if (2 !== prm.split(stype[sidx]).length) {
                    continue;
                }
                ptype = stype[sidx];
		break;
            }
            if (null === ptype) {
                throw new Error('not supported size type');
            }
            /* get value */
            let sval = null;
            sp_prm = prm.split(ptype);
            if (2 === sp_prm[0].split('.').length) {
                sval = parseFloat(sp_prm[0]);
            } else {
                sval = parseInt(sp_prm[0]);
            }
            if ('px' === ptype) {
                return new mofron.class.Pixel(sval);
            } else if ('rem' === ptype) {
                return new mofron.class.Rem(sval);
            } else {
                return new mofron.class.Size(sval, ptype);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    sizetype: (prm) => {
        try {
            let size = comutl.getsize(prm);
	    return (null === size) ? null : size.type();
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    sizesum : (p1, p2) => {
        try {
            let prm1 = ('string' === typeof p1) ? comutl.getsize(p1) : p1;
            let prm2 = ('string' === typeof p2) ? comutl.getsize(p2) : p2;
            
            if ( (null == prm1) &&
                 (true === comutl.isinc(prm2, ['Base', 'Size'])) ) {
                return prm2.toString();
            } else if ( (null == prm2) &&
                        (true === comutl.isinc(prm1, ['Base', 'Size'])) ) {
                return prm1.toString();
            } else if ((null === prm1) && (null === prm2)) {
                return null;
            }

            if ( (true !== comutl.isinc(prm1, ['Base', 'Size'])) ||
                 (true !== comutl.isinc(prm2, ['Base', 'Size'])) ) {
                throw new Error('invalid parameter');
            }
            if (prm1.type() !== prm2.type()) {
                if ((undefined !== prm1.toPixel()) && ('%' === prm2.type())) {
		    /* calculate percentage size */
                    return (prm1.value() * (prm2.value()/100)) + prm1.type();
	        } else if ((undefined === prm1.toPixel()) || (undefined === prm2.toPixel())) {
                    throw new Error('not supported type');
                }
                return new mofron.class.Pixel(prm1.toPixel() + prm2.toPixel()).toString();
            } else {
                let val_1 = comutl.roundup(prm1.value());
                let val_2 = comutl.roundup(prm2.value());
                return comutl.roundup((val_1 + val_2)) + prm1.type();
            }
        } catch (e) {
            throw e;
        }
    },

    sizediff : (p1,p2) => {
        try {
	    let prm2 = ('string' === typeof p2) ? comutl.getsize(p2) : p2;
            if (true !== comutl.isinc(prm2, "Size")) {
                throw new Error('not supported type');
	    }
	    let prm2_buf = comutl.getsize(prm2.toString());
	    prm2_buf.value(prm2_buf.value()*-1);
            return comutl.sizesum(p1,prm2_buf);
	} catch (e) {
            throw e;
        }
    },

    roundup : (prm) => {
        try {
            let flo = comutl.flo2int(prm);
            if (1000 >= flo[1]) {
                return prm;
	    }
	    return Math.floor(flo[0]/flo[1]*1000)/1000;
	} catch (e) {
	    console.error(e.stack);
            throw e;
	}
    },

    flo2int : (prm) => {
        try {
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let chk = null;
            let pos = 0;
            let wei = 1;
            
            chk = prm + '';
            pos = chk.indexOf('.');
            if (-1 === pos) {
                return [ prm, 1 ];
            }
            
            for (pos = ((chk.length-1) - pos) ; 0 < pos ; pos--) {
                wei = wei * 10;
            }
            return [ prm * wei, wei ];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    chkacc: (opt) => {
        try {
            for (let oidx in opt) {
	        if ( ("device" !== oidx) && ("os" !== oidx) &&
                     ("browser" !== oidx) && ("orientation" !== oidx) ) {
                    console.warn("unknown index:" + oidx);
		    return false;
		}
                if ("device" === oidx) {
		    if (true === Array.isArray(opt[oidx])) {
		        let dev_chk = false;
                        for (let didx in opt[oidx]) {
                            if (opt[oidx][didx] === comutl.accdev()) {
			        dev_chk = true;
			    }
			}
			if (false === dev_chk) {
                            return false;
			}
		    } else {
		        if (opt[oidx] !== comutl.accdev()) {
                            return false;
		        }
                    }
		} else if ("os" === oidx) {
                    if (opt[oidx] !== comutl.accos()) {
                        return false;
		    }
		} else if ("browser" === oidx) {
		    if (opt[oidx] !== comutl.accbrs()) {
                        return false;
                    }
		} else if ("orientation" === oidx) {
                    let ochk = ("portrait" === opt.orientation) ? true : false;
                    if (ochk !== mofron.window.isPortrait()) {
                        return false;
		    }
		}
	    }
	    return true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    accdev : () => {
        try {
            let ua = window.navigator.userAgent;
            if ( ua.indexOf('iPhone')  > 0 ||
                 ua.indexOf('iPod')    > 0 ||
                 ua.indexOf('Android') > 0 &&
                 ua.indexOf('Mobile')  > 0 ){
                return 'mobile';
            } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
                return 'tablet';
            } else {
                return 'default';
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    accos : () => {
        try {
            let ua = window.navigator.userAgent;
            if ( ua.indexOf('iPhone')  > 0 ||
                 ua.indexOf('iPod')    > 0 ||
                 ua.indexOf('iPad')    > 0 ) {
                return 'ios';
            } else if (ua.indexOf('Android') > 0) {
                return 'android';
	    } else if (ua.indexOf('Windows') > 0) {
	        return 'windows';
            } else if (ua.indexOf('Mac OS') > 0) {
	        return 'mac';
	    } else if (ua.indexOf('Linux') > 0) {
	        return 'linux';
            } else {
                return 'other';
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    accbrs : () => {
        try {
            let ua = window.navigator.userAgent.toLowerCase();
            if( (ua.indexOf('msie') !== -1) || (ua.indexOf('trident') !== -1) ) {
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
    
    addhead: (tag, atr, txt) => {
        try {
	    let conts = "<" + tag + " ";
	    /* set attributes */
	    for (let aidx in atr) {
                conts += aidx + '=' + atr[aidx] + ' ';
	    }
            conts = conts.substring(0, conts.length-1) + ">";
            if ( ('link' !== tag) &&
	         ('meta' !== tag) &&
		 ('base' !== tag) ) {
		 /* set contents */
	         conts += txt + "</" + tag + ">";
            }
            
            if (undefined !== mofron.ssr) {
                mofron.ssr.head(conts);
            } else {
                document.head.insertAdjacentHTML('beforeend',conts);
            }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    },

    addstyle: (id, prm, append) => {
        try {
	    let style = document.getElementById(id);
	    if (null === style) {
                comutl.addhead("style", {id:id}, prm);
	    } else if (false !== append) {
                style.innerText += prm;
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    obj2style: (sel, cnt) => {
        try {
            let ret = sel + " {"
            for (let cidx in cnt) {
	        ret += cidx + ":" + cnt[cidx] + ";";
	    }
	    return ret + "}";
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
};
const comutl = mofron.util.common;
module.exports = mofron.util.common;
/* end of file */
