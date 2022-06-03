/**
 * @file effect.js
 */
const cmputl = mofron.util.component;

mofron.util.effect = {
    
    exec: (eff, eid, evf, oid) => {
        try {
            let _oid = (undefined === oid) ? 0 : oid;
	    let elst = effutl.getlist(eff, eid, _oid);
	    if (0 === elst.length) {
                return false;
	    }
            
            /* execute before event */
            for (let eidx in elst) {
		let b_evt = elst[eidx].beforeEvent();
		for (let bidx in b_evt) {
		    b_evt[bidx][0](elst[eidx], elst[eidx].component(), b_evt[bidx][1]);
                }
	    }
	    /* set transition */
            effutl.transition(elst);
            
            let next_order = () => {
                let fin_cnt = 0;
                return (p1,p2,p3) => {
                    try {
		        let eff_cmp = elst[fin_cnt].component();
                        fin_cnt++;
                        if (p3 <= fin_cnt) {
                            if (false === effutl.exec(eff,eid,evf,oid+1)) {
			        /* release transition */
                                cmputl.rstyle(eff_cmp, { 'transition' : null }, { bpref: true });
                                eff_cmp.styleDom().style({ 'transition' : null }, { bpref: true });
                                /* execute callback function */
                                if ((undefined !== evf) && ("function" === typeof evf[0])) {
                                    evf[0](p2,eid,evf[1]);
                                }
                            }
                        }
		    } catch (e) {
	                console.error(e.stack);
	                throw e;
	            }
		}
	    }

	    let next = next_order(eff, eid, evf, oid);
            for (let eidx2 in elst) {
	        elst[eidx2].otCallback(next, elst.length);
                
                if (0 === elst[eidx2].speed()) {
                    elst[eidx2].execute();
		} else {
                    setTimeout(
                        (tm) => {
                            try {
                                tm.execute();
                            } catch (e) {
                                console.error(e.stack);
                                throw e;
                            }
                        },
                        50,
                        elst[eidx2]
                    );
		}

	    }
            
            return true;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    },
    
    /**
     * get valid list from effect lists
     */
    getlist: (eff, eid, oid) => {
        try {
	    let elst = [];
            for (let eidx in eff) {
	        if (true === eff[eidx].isSkipped(eid,oid)) {
		    continue;
		}
		elst.push(eff[eidx]);
	    }
	    return elst;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    },

    initlist: (cmp) => {
        try {
            let ret = [];
	    let chd = cmp.child();
	    for (let cidx in chd) {
                let chd_ret = effutl.initlist(chd[cidx]);
		if (null !== chd_ret) {
                    for (let cidx in chd_ret) {
                        ret.push(chd_ret[cidx]);
		    }
		}
	    }
	    let eff = cmputl.modconf(cmp, "effect");
	    let oid = 0;
	    let buf = null;
            while (true) {
                buf = effutl.getlist(
		    eff,
		    (true === cmp.visible()) ? 0 : 1,
		    oid
		);
		if (0 === buf.length) {
                    break;
		}
		for (let bidx in buf) {
                    ret.push(buf[bidx]);
		}
		oid++;
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    transition: (eff) => {
        try {
            let rdom      = eff[0].component().rootDom();
            let cmp_trans = {};  //effutl.gettrans(rdom.style('tarnsition'));

            /* get the effect transition that will be executed */
            let eff_trans = {};
            for (let eidx in eff) {
	        if (0 === eff[eidx].speed()) {
                    continue;
		}
                let tbuf = eff[eidx].transition();
		for (let bidx in tbuf) {
                    eff_trans[tbuf[bidx]]  = eff[eidx].speed() + 'ms ';
		    if (null === eff[eidx].cubicBezier()) {
		        eff_trans[tbuf[bidx]] += eff[eidx].timing();
		    } else {
		        let cubic = eff[eidx].cubicBezier();
		        eff_trans[tbuf[bidx]] += 'cubic-bezier(' + cubic[0] + ',' + cubic[1] + ',' + cubic[2] + ',' + cubic[3] + ')';
                    }
		    eff_trans[tbuf[bidx]] += ' ' + eff[eidx].delay() + 'ms';
		}
	    }
	    if (0 === Object.keys(eff_trans).length) {
                return;
	    }
	    /* set transition list to buff */
            for (let tidx in eff_trans) {
                cmp_trans[tidx] = eff_trans[tidx];
            }
            let setval = { 'transition' : "" };
	    for (let tidx2 in cmp_trans) {
	        setval.transition += tidx2 + " " + cmp_trans[tidx2] + ","
	    }
	    if (0 < setval.transition.length) {
	        setval.transition = setval.transition.substring(0, setval.transition.length-1);
            }
	    cmputl.rstyle(eff[0].component(), setval, { bpref: true });
            eff[0].component().styleDom().style(setval, { bpref: true });
	    
            
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    getfirst : (eff, eid, ord) => {
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
    
    getlast : (eff, eid, ord) => {
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
                if (eff[eidx2].id() === last.id()) {
                    return parseInt(eidx2);
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    setconf: (cmp, einf, cnf) => {
        try {
            let eff = cmp.effect(einf);
	    if (null === eff) {
                throw new Error("invalid parameter");
	    }
	    eff = (true !== Array.isArray(eff)) ? [eff] : eff;
	    for (let eidx in eff) {
                eff[eidx].config(cnf);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
};
const effutl = mofron.util.effect;
module.exports = mofron.util.effect;
/* end of file */
