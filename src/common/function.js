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
            let _tgt = (tgt === undefined) ? null : tgt;
            let ipf  = "aid";
            if (null !== _tgt) {
                ipf = _tgt.name();
            }
            let ret_id = ipf + '-' + new Date().getTime() + '-';
            let loop   = 0;
            let val    = 0;
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
    
    
    objkey : (key, val, ary) => {
        try {
            if ('string' !== typeof key) {
                throw new Error('invalid parameter');
            }
            let buff   = mofron.objkey;
            let sp_key = key.split('.');
            for (let kidx in sp_key) {
                
                if (undefined === buff[sp_key[kidx]]) {
                    if (undefined !== val) {
                        buff[sp_key[kidx]] = (true === ary) ? [] : {};
                    } else {
                        return null;
                    }
                }
                
                if (kidx == sp_key.length-1) {
                    if (undefined === val) {
                        return buff[sp_key[kidx]];
                    } else {
                        if (true === ary) {
                            buff[sp_key[kidx]].push(val);
                        } else {
                            buff[sp_key[kidx]] = val;
                        }
                    }
                }
                buff = buff[sp_key[kidx]];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    /**
     * component display function
     *
     * @param p1 (Component) target component
     * @param p2 (boolean) visible flag
     */
    compDisp : (cmp, flg) => {
        try {
            /* check parameter */
            if ( (false === mofron.func.isComp(cmp)) ||
                 ('boolean' !== typeof flg) ) {
                throw new Error('invalid parameter');
            }
            
            let dbuf = [];
            let achd = cmp.adom().child();
            if (true === flg) {
                dbuf = cmp.data(cmp.getId()).dispBuff;
		if (undefined === dbuf) {
                    dbuf = [null];
                }
                for (let cidx in achd) {
                    if ('none' === achd[cidx].style('display')) {
                        achd[cidx].style({
                            'display' : ( ('none' !== dbuf[cidx]) && (null !== dbuf[cidx]) ) ? dbuf[cidx] : null
                        });
                    }
                }
            } else {
                for (let cidx in achd) {
                    dbuf.push(achd[cidx].style('display'));
                }
                let cbuf = cmp.data(cmp.getId());
                cbuf.dispBuff = dbuf;
                cmp.data(cmp.getId(), cbuf);
                cmp.adom().style({ 'display' : 'none' });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    repInncmp : (cmp, ocmp, ncmp) => {
        try {
            let ret = false;
            let inn = cmp.innerComp();
            for (let in_idx in inn) {
                if (ocmp.getId() === inn[in_idx].getId()) {
                    cmp.innerComp(in_idx, ncmp);
                    ret = true;
                }
            }
            return ret;
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
            let opt = {};
            for (let cidx in chk_prm) {
                opt[prm_map[cidx]] = chk_prm[cidx];
            }
            tgt.execOption(opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    /**
     * execute component effect by order
     *
     * @param p1 (Effect) effect
     * @param p2 (number) execute id
     * @param p3 (object) simple callback [function, mixed]
     * @param p4 (number) order index
     */
    execEffect : (eff, eid, scb, oidx) => {
        try {
            let _oidx = (undefined === oidx) ? 0 : oidx;
            let _scb  = [()=>{}, null, true];
            let exec  = false;   // exec flag
            
            if (undefined !== scb) {
                _scb = (true === Array.isArray(scb)) ? [scb[0], scb[1], true] : [scb, null, true];
            }
            /* check parameter */
            if ( (true !== Array.isArray(eff)) || 
                 ('number' !== typeof eid)    ||
                 ('number' !== typeof _oidx) ) {
                throw new Error('invalid parameter');
            }
            
            mofron.func.updEffSpeed(eff, eid, _oidx);
            let sp_eff = [];
	    /* execute 0 speed effect */
	    for (let eidx1 in eff) {
	        if (true === eff[eidx1].isSkipped(eid,_oidx)) {
                    continue;
                }
	        if (null === eff[eidx1].speed()) {
		    if ( (eidx1 == eff.length-1) && (0 === sp_eff.length)) {
                        /* last execute index */
                        eff[eidx1].option({ callback: _scb });
		    }
		    eff[eidx1].execute();
                    exec = true;
		} else {
                    sp_eff.push(eff[eidx1]);
		}
	    }

            let spd_cnf = false;
            for (let eidx in sp_eff) {
                
                if (true === sp_eff[eidx].isSkipped(eid, _oidx)) {
                    if (_oidx < sp_eff[eidx].order()) {
                        exec = true;
                    }
                    continue;
                }
                /* execute effect */
                if (eidx == mofron.func.getLastIndex(sp_eff, eid, _oidx)) {
                    /* this is last index in this order index, execute next order index */
                    if (eidx == mofron.func.getLastIndex(sp_eff, eid)) {
                        /* this is last index in this execute number */
                        let dis_spd = (ds1,ds2,ds_lef) => {
                            try { mofron.func.confSpeed(ds_lef, null); } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        }
                        let lst_eff = sp_eff[eidx];
                        sp_eff[eidx].execOption({ callback: [dis_spd, lst_eff, true] });
                        sp_eff[eidx].execOption({ callback: _scb });
                    } else {
                        /* set callback that execute next order */
                        sp_eff[eidx].callback(
                            () => {
                                try { mofron.func.execEffect(sp_eff, eid, scb, _oidx+1); } catch (e) {
                                    console.error(e.stack);
                                    throw e;
                                }
                            },
                            null,
                            true
                        );
                    }
                }
                
                if (eidx == mofron.func.getFirstIndex(sp_eff, eid, _oidx)) {
                    /* first execute initialize */
                    let eid_eff = mofron.func.getEffect(sp_eff, eid);
                    for (let eeidx in eid_eff) {
                        let bf = eid_eff[eeidx].beforeEvent();
                        for (let bidx in bf) {
                            bf[bidx][0](eid_eff[eeidx], bf[bidx][1]);
                        }
                    }
                    mofron.func.confSpeed(sp_eff[eidx], sp_eff[eidx].speed());
                }
                sp_eff[eidx].execute();
                exec = true;
                
            }
            
            return exec;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    updEffSpeed : (eff, eid, ord) => {
        try {
            let tgt = [];
            let spd = 0;
            for (let eidx in eff) {
                if (true === eff[eidx].isSkipped(eid, ord)) {
                    continue;
                }
                tgt.push(eff[eidx]);
                if ( ('number' === typeof eff[eidx].speed()) && (spd < eff[eidx].speed()) ) {
                    spd = eff[eidx].speed();
                }
            }
            
            if (0 < spd) {
                for (let tidx in tgt) {
		    if (null !== tgt[tidx].speed()) {
                        tgt[tidx].speed(spd);
		    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    confSpeed : (eff, spd) => {
        try {
            //let spd  = eff.speed();
            let adom = eff.component().adom();
            if (null === spd) { 
                /* delete speed config */
                adom.style({
                    '-webkit-transition' : null,
                    '-moz-transition'    : null,
                    '-ms-transition'     : null,
                    '-o-transition'      : null,
                    'transtion'          : null
                });
                
            } if (0 !== spd) {
                /* set speed config */
                adom.style({ 
                    '-webkit-transition' : spd + 'ms all linear 0s',
                    '-moz-transition'    : 'all ' + spd + 'ms',
                    '-ms-transition'     : 'all ' + spd + 'ms',
                    '-o-transition'      : 'all ' + spd + 'ms',
                    'transtion'          : spd + 'ms all linear 0s'
                });
            } 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getEffect : (eff_lst, eid, ord) => {
        try {
            let ret = [];
            for (let eidx in eff_lst) {
                if ( (undefined !== eid) && (undefined !== ord) ) {
                    if ( (eid === eff_lst[eidx].eid()) && (ord === eff_lst[eidx].order())) {
                        ret.push(eff_lst[eidx]);
                    }
                } else if (undefined !== eid) {
                    if (eid === eff_lst[eidx].eid()) {
                        ret.push(eff_lst[eidx]);
                    }
                }
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getFirstIndex : (eff, eid, ord) => {
        try {
            for (let eidx in eff) {
                if (false === eff[eidx].isSkipped(eid, ord)) {
                    return parseInt(eidx);
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getLastIndex : (eff, eid, ord) => {
        try {
            let tgt_lst = [];
            for (let eidx in eff) {
                if (eid !== eff[eidx].eid()) {
                    continue;
                } else if ( ('number' === typeof ord) && (ord !== eff[eidx].order()) ) {
                    continue;
                }
                tgt_lst.push(eff[eidx]);
            }
            
            if (0 === tgt_lst.length) {
                return null;
            }
            let last = tgt_lst[tgt_lst.length-1];
            for (let eidx2 in eff) {
                if (eff[eidx2].getId() === last.getId()) {
                    return parseInt(eidx2);
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    effCallback : (eff, cb) => {
        try {
            let upd_cb = [];
            if (0 !== cb.length) {
                let exec = () => {
                    for (let cidx in cb) {
                        cb[cidx][0](eff.component(), eff, cb[cidx][1]);
                    }
		    /* delete one-time callback */
                    for (let cidx2=0; cidx2 < cb.length ;cidx2++) {
                        if (true === cb[cidx2][2]) {
                            /* one-time callback */
			    eff.delCallback(cidx2);
			    cidx2--;
			}
		    }
                };
                setTimeout(exec, (null === eff.speed()) ? 0 : eff.speed());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    getCompConf : (cmp_lst, nm, tag) => {
        try {
            let ret = [];
            for (let cidx in cmp_lst) {
                if (true !== mofron.func.isInclude(cmp_lst[cidx], nm)) {
                    continue;
                }
                if (undefined === tag) {
                    ret.push(cmp_lst[cidx]);
                    continue;
                }
                
                if (tag === cmp_lst[cidx].tag()) {
                    ret.push(cmp_lst[cidx]);
                }
            }
            if (0 === ret.length) {
                return null;
            } else if (1 === ret.length) {
                return ret[0];
            } else {
                return ret;
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
            if ((null === prm) || (undefined === prm)) {
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
                return new mofron.Color(prm);
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
                parseInt(clr.substring(2,4) ,16),
                parseInt(clr.substring(4,6) ,16)
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
    
    cmpColor : (cmp, key, val) => {
        try {
            if ( (true !== mofron.func.isInclude(cmp, 'Component')) ||
                 ('string' !== typeof key) ) {
                throw new Error('invalid parameter');
            }
	    let opt = undefined;
	    if (true === Array.isArray(val)) {
	        _val = val[0];
		_opt = val[1];
	    }
            if ((undefined === val) || (undefined === _val)) {
                return cmp.style(key);
            }
            
            let get_style_val = (p1, p2) => {
                try {
                    let v = null;
                    if ( (null === p2) || ('string' === typeof p2) ) {
                        v = p2;
                    } else if (true === mofron.func.isInclude(p2, ['Base','Color'])) {
                        v = p2.toString();
                    } else if (true === Array.isArray(p2)) {
                        if (3 === p2.length) {
                            v = "rgb(" + p2[0] + "," + p2[1]  + "," + p2[2] + ")";
                        } else if (4 === p2.length) {
                            v = "rgba(" + p2[0] + "," + p2[1]  + "," + p2[2] + "," + p2[3] + ")";
                        } else {
                            throw new Error('invalid parameter');
                        }
                    }
                    let ret = {};
                    ret[p1] = v;
                    return ret;
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            /* set color */
            cmp.option({ style : [get_style_val(key,_val), _opt] });
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
                if ((null === prm) || (undefined === prm)) {
                    return null;
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
	    let dev_tp = mofron.func.devType();
	    let fsize  = null;
            if ( ('mobile' === dev_tp) || ('tablet' === dev_tp) ) {
                if (true === mofron.func.isVrtAngle()) {
		    fsize = mofron.func.getSize(mofron.fsize.vertical);
		} else {
		    fsize = mofron.func.getSize(mofron.fsize.horizon);
		}
	    } else if ('other' === dev_tp) {
                fsize = mofron.func.getSize(
                    document.documentElement.style[
                        mofron.func.getCamel('font-size')
                    ]
                );
                if (null === fsize.type()) {
                    throw new Error('invalid html font-size');
                }
                return 16 * (fsize.value() / 100);
	    }
	    if (null === fsize.type()) {
                throw new Error('invalid html font-size');
            }
            return 16 * (fsize.value() / 100);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    cmpSize : (cmp, key, val) => {
        try {
            if ( (true !== mofron.func.isInclude(cmp, 'Component')) ||
                 ('string' !== typeof key) ) {
                throw new Error('invalid parameter');
            }
	    let _val = val;
	    let _opt = undefined;
	    if (true === Array.isArray(_val)) {
	        _opt = val[1];
	        _val = val[0];
	    }
            if (undefined === _val) {
                return cmp.style(key);
            }
            let set_style  = {};
            if ( (null === _val) || ('string' === typeof _val) ) {
                set_style[key] = _val;
            } else if (true === mofron.func.isInclude(_val, ['Base','Size'])) {
                set_style[key] = _val.toString();
            } else {
                throw new Error('invalid parameter');
            }
            cmp.style(set_style, _opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }, 
    
    sizeCalcu : (p1, p2, flg) => {
        try {
            let prm1 = ('string' === typeof p1) ? mofron.func.getSize(p1) : p1;
            let prm2 = ('string' === typeof p2) ? mofron.func.getSize(p2) : p2;
            
            if ( (null == prm1) &&
                 (true === mofron.func.isInclude(prm2, ['Base', 'Size'])) ) {
                return prm2;
            } else if ( (null == prm2) && 
                        (true === mofron.func.isInclude(prm1, ['Base', 'Size'])) ) {
                return prm1;
            }
            
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
                let val_1 = prm1.value();
                let val_2 = prm2.value();
                let is_float = false;
                if ( (false === Number.isInteger(val_1)) ||
                     (false === Number.isInteger(val_2)) ) {
                    is_float = true;
                    val_1 = val_1 * 1000;
                    val_2 = val_2 * 1000;
                }
                let ret_val = null;
                if (true === flg) {
                    ret_val = mofron.func.getSize((val_1 + val_2) + prm1.type());
                } else {
                    ret_val = mofron.func.getSize((val_1 - val_2) + prm1.type());
                }
                if (true === is_float) {
                    ret_val.value(ret_val.value()/1000);
                }
                return ret_val;
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
    
    roundUp : (prm) => {
        try {
            let flo = mofron.func.flo2int(prm);
            if (1000 > flo[1]) {
                return prm;
	    }
	    return Math.floor(flo[0]/flo[1]*100)/100;
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
    
    isInclude : (obj, nm) => {
        try {
            if ((null === obj) || ('object' !== typeof obj)) {
                return false;
            }
            if ('function' !== typeof obj.name) {
                return false;
            }
            let chk_nm  = ('string' === typeof nm) ? [nm] : nm;
            let chk_idx = 0;
            let name_lst = obj.getNameList();
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
    
    isComp : (obj, nm) => {
        try {
            let inc_prm = ['Base', 'Component'];
            if ('string' === typeof nm) {
                inc_prm.push(nm);
            } else if (true === Array.isArray(nm)) {
                for (let nidx in nm) {
                    inc_prm.push(nm[nidx]);
                }
            }
            return mofron.func.isInclude(obj, inc_prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isEvent : (obj, nm) => {
        try {
            let inc_prm = ['Base', 'CompConf', 'Event'];
            if ('string' === typeof nm) {
                inc_prm.push(nm);
            } else if (true === Array.isArray(nm)) {
                for (let nidx in nm) {
                    inc_prm.push(nm[nidx]);
                }
            } 
            return mofron.func.isInclude(obj, inc_prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isEffect : (obj, nm) => {
        try {
            let inc_prm = ['Base', 'CompConf', 'Effect'];
            if ('string' === typeof nm) {
                inc_prm.push(nm);
            } else if (true === Array.isArray(nm)) {
                for (let nidx in nm) {
                    inc_prm.push(nm[nidx]);
                }
            }
            return mofron.func.isInclude(obj, inc_prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isLayout : (obj, nm) => {
        try {
            let inc_prm = ['Base', 'CompConf', 'Layout'];
            if ('string' === typeof nm) {
                inc_prm.push(nm);
            } else if (true === Array.isArray(nm)) {
                for (let nidx in nm) {
                    inc_prm.push(nm[nidx]);
                }
            }
            return mofron.func.isInclude(obj, inc_prm);
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
            if ('string' === typeof nm) {
                return (nm === obj.name()) ? true : false;
            } else if (true === Array.isArray(nm)) {
                if ( (true === mofron.func.isInclude(obj, nm)) &&
                     (obj.name() === nm[nm.length-1]) ) {
                    return true;
                }
                return false;
            }
            
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isChild (pnt, cmp) {
        try {
            let ret = false;
            let chd = pnt.getChild(true);
            for (let cidx in chd) {
                if (true === mofron.func.isChild(chd[cidx], cmp)) {
                    return true;
                } else if (chd[cidx].getId() === cmp.getId()) {
                    return true;
                }
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
    
    addHeadStyle : (prm) => {
        try {
            let set_prm = {tag: 'style', attr: { type: "text/css" }, contents: prm};
            mofron.func.addHeadConts(set_prm);
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
                return ('other' === mofron.func.devType()) ? true : false;
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
