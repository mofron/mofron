/**
 * @file component.js
 * @brief util functions for component
 * @license MIT
 */
const comutl = mofron.util.common;

mofron.util.component = {
    chdloop: (cmp,key,prm) => {
        try {
            if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
            }
            let chd  = cmp.getTree().getChild();
            let argc = (false === Array.isArray(prm)) ? 0 : prm.length;
            for (let cidx in chd) {
                if (0 === argc) {
                    chd[cidx][key]();
                } else if (1 === argc) {
                    chd[cidx][key](p1);
                } else if (2 === argc) {
                    chd[cidx][key](p1,p2);
                } else if (3 === argc) {
                    chd[cidx][key](p1,p2,p3);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    ischild : (pnt, cmp) => {
        try {
            let ret  = false;
            let pchd = pnt.getTree().child();
            for (let cidx in pchd) {
                if (true === comutl.ischild(chd[cidx], cmp)) {
                    return true;
                } else if (chd[cidx].id() === cmp.id()) {
                    return true;
                }
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    isinncmp: (cmp) => { 
        try {
            if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
            }
	    let chd_cmp = cmp.childDom().component();
            if ((null === chd_cmp) || (null === chd_cmp.getTree().parent())) {
                return false;
            }
            let pnt_buf = chd_cmp.getTree().parent();
            while (null !== pnt_buf) {
                if (cmp.id() === pnt_buf.id()) {
                    /* target is inner component */
                    return true;
                }
                pnt_buf = pnt_buf.getTree().parent();
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    
    modconf: (cmp, idx, po, opt) => {
        try {
	    if (true === Array.isArray(po)) {
                for (let pidx in po) {
                    cmputl.modconf(cmp, idx, po[pidx], opt);
                }
                return;
            }
            if (false === comutl.isinc(po, "ModConf")) {
                /* getter */
		let mc_lst  = cmp.confmng().get(idx);
                if ('object' !== typeof po) {
                    return mc_lst;
                }
                let ret = [];
                let hit = null;
		for (let mc_idx in mc_lst) {
                    hit = true;
                    for (let pidx in po) {
                        if (mc_lst[mc_idx][pidx]() !== po[pidx]) {
                            hit = false;
                            break;
                        }
                    }
		    if (true === hit) {
                        ret.push(mc_lst[mc_idx]);
                    }
                }
		if (0 === ret.length) {
                    return null;
		} else {
                    return (1 === ret.length) ? ret[0] : ret;
		}
	    }
	    /* setter */
	    po.component(cmp);
	    cmp.confmng(idx, po, opt);
            if ( (true === cmp.isExists()) && ("effect" !== idx) ) {
                po.execute();
            }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    },

    initmconf: (cmp, idx) => {
        try {
	    if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
	    }

	    let chd = cmp.getTree().getChild();
            for (let cidx in chd) {
                cmputl.initmconf(chd[cidx], idx);
	    }
            /* init module config */
            if (-1 !== idx.indexOf('effect')) {
                cmputl.initeffect(cmp,idx);
            } else {
                let cnf = cmputl.modconf(cmp, idx);
                for (let cfidx in cnf) {
                    cnf[cfidx].execute();
                }
            }
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    },
    
    initeffect: (cmp, idx) => {
        try {
	    let eid     = ("none" !== cmp.style("display")) ? 0 : 1;
	    let exe_lst = [];
            if ("zsp_effect" === idx) {
	        exe_lst = cmp.effect({ speed:0 });
		if (null === exe_lst) {
                    return;
		} else if (false === Array.isArray(exe_lst)) {
                    exe_lst = [exe_lst];
		}
	    } else {
	        let eff_lst = [];
	        eff_lst = cmp.effect({ eid:-1 });
		if (null === eff_lst) {
                    eff_lst = [];
		} else if (false === Array.isArray(eff_lst)) {
                    eff_lst = [eff_lst];
		}
		if (null !== cmp.effect({ eid:eid })) {
                    eff_lst = eff_lst.concat(cmp.effect({ eid:eid }));
		}
		for (let eidx in eff_lst) {
                    if (0 !== eff_lst[eidx].speed()) {
                        exe_lst.push(eff_lst[eidx]);
		    }
		}
	    }
	    if (0 === exe_lst.length) {
                return;
	    }
	    mofron.util.effect.exec(exe_lst, -1);
            mofron.util.effect.exec(exe_lst, eid);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    },

    follow_theme: (cmp) => {
        try {
	    let ret     = {};
	    let chk_cmp = cmp.parent();
	    let chk_thm = null;
	    
            while (chk_cmp) {
                
	        chk_thm = chk_cmp.theme();
                for (tidx in chk_thm) {
                    if (!ret[tidx]) {
                        ret[tidx] = chk_thm[tidx];
		    }
		}
                chk_cmp = chk_cmp.parent();
                
	    }
	    return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },
    theme: (cmp, thm) => {
        try {
	    if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
            }
	    
	    /*
	     * create the theme for execution with theme of component
	     * added to theme of parameter.
	     */
            let exe_thm = {};
	    for (let thm_idx in thm) {
                exe_thm[thm_idx] = thm[thm_idx];
	    }
	    let cmp_thm = cmp.theme();
	    for (let cmp_idx in cmp_thm) {
                exe_thm[cmp_idx] = cmp_thm[cmp_idx];
            }
            
            /* check ignore */
	    let is_ign   = false;
	    let exe_thm2 = {};
	    for (let e_idx in exe_thm) {
	        is_ign = false;
                if (undefined !== exe_thm[e_idx].ignore) {
                    if (true === Array.isArray(exe_thm[e_idx].ignore)) {
                        for (let e_idx2 in exe_thm[e_idx].ignore) {
                            if (cmp.name() === exe_thm[e_idx].ignore[e_idx2]) {
				is_ign = true;
                            }
                        }
                    } else if (cmp.name() === exe_thm[e_idx].ignore) {
                        is_ign = true;
                    }
		}
		if (false === is_ign) {
                    exe_thm2[e_idx] = exe_thm[e_idx];
		}
	    }
            
	    let chd     = cmp.getTree().getChild();
	    let inn_cmp = cmp.confmng("innerComp");
	    /* theme core process */
	    for (let thm_tgt in exe_thm2) {
	        if (true === comutl.isinc(cmp, thm_tgt)) {
	            if (undefined !== exe_thm2[thm_tgt].replace) {
		        if (true === comutl.isobj(cmp, thm_tgt)) {
	                    /* replace component */
			    let rep_cmp = new exe_thm2[thm_tgt].replace();
			    if (undefined !== exe_thm2[thm_tgt].config) {
                                rep_cmp.config(exe_thm2[thm_tgt].config);
                            }
                            rep_cmp.config(cmp.config());
	                    cmp.parent().getTree().replace(cmp,rep_cmp);
			    /* update child list for execution theme */
                            chd = rep_cmp.getTree().getChild();
                            
			    for (let inn_idx2 in inn_cmp) {
                                rep_cmp[inn_idx2]().config(inn_cmp[inn_idx2].config());
			    }
                        }
                    } else if (undefined !== exe_thm2[thm_tgt].config) {
                        /* config theme */
                        for (let cnf_idx in exe_thm2[thm_tgt].config) {
                            if (('layout' === cnf_idx) || ('effect' === cnf_idx) || ('event' === cnf_idx)) {
			        if (true !== Array.isArray(exe_thm2[thm_tgt].config[cnf_idx])) {
                                    let cnf_nm  = exe_thm2[thm_tgt].config[cnf_idx].modname();
                                    let rep_cnf = new mofron.require[cnf_nm]();
                                    rep_cnf.config(exe_thm2[thm_tgt].config[cnf_idx].config());
                                    exe_thm2[thm_tgt].config[cnf_idx] = rep_cnf;
				} else {
			            for (let cnf_idx_2 in exe_thm2[thm_tgt].config[cnf_idx]) {
				        let cnf_nm  = exe_thm2[thm_tgt].config[cnf_idx][cnf_idx_2].modname();
				        let rep_cnf = new mofron.require[cnf_nm]();
				        rep_cnf.config(exe_thm2[thm_tgt].config[cnf_idx][cnf_idx_2].config());
				        exe_thm2[thm_tgt].config[cnf_idx][cnf_idx_2] = rep_cnf;
			            }
                                }
			    }
			}
                        
                        cmp.config(exe_thm2[thm_tgt].config);
                    }
                }
                for (let inn_idx in inn_cmp) {
                    if ( (true === comutl.isobj(inn_cmp[inn_idx], thm_tgt)) &&
		         (undefined !== exe_thm2[thm_tgt].replace) ) {
			let rep_inn = new exe_thm2[thm_tgt].replace();
                        if (undefined !== exe_thm2[thm_tgt].config) {
                            rep_inn.config(exe_thm2[thm_tgt].config);
                        }
                        rep_inn.config(inn_cmp[inn_idx].config());
			inn_cmp[inn_idx].parent().getTree().replace(inn_cmp[inn_idx],rep_inn);
                        inn_cmp[inn_idx] = rep_inn;
                        break;
		    }
                }
            }
            
            /* execute child theme */
            for (let cidx in chd) {
                let buf_thm = {};
                for (let eth_idx in exe_thm2) {
                    buf_thm[eth_idx] = exe_thm2[eth_idx];
                }
                mofron.util.component.theme(chd[cidx], buf_thm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    size: (cmp, key, val, opt) => {
        try {
	    /* setter */
            if ( (false === comutl.iscmp(cmp)) ||
	         ("string" !== typeof key) ) {
	        throw new Error("invalid parameter");
            }
            if (undefined === val) {
                /* getter */
                return cmp.style(key);
            }
            /* setter */
            let style_val  = {};
	    if (null === comutl.getsize(val)) {
	        style_val[key] = null;
	    } else {
                style_val[key] = comutl.getsize(val).toString();
            }
            cmp.config({
	        style: new mofron.class.ConfArg(style_val, opt)
	    });
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    },

    color: (cmp, key, val, opt) => {
        try {
	    if ( (false === comutl.iscmp(cmp)) ||
	         ("string" !== typeof key) ) {
                throw new Error("invalid parameter");
            }
            if (undefined === val) {
                /* getter */
                return cmp.style(key);
            }
            /* setter */
            let style_val  = {};
            style_val[key] = (null === val) ? null : comutl.getcolor(val).toString();
	    if (undefined === opt) {
                opt = { private:true };
	    } else {
                opt.private = true
	    }
            cmp.style(style_val, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    },
    
    display : (cmp, flg) => {
        try {
            /* check parameter */
            if ( (false === comutl.iscmp(cmp)) ||
                 ('boolean' !== typeof flg) ) {
                throw new Error('invalid parameter');
            }
            let buf  = null;
            let rdom = cmp.rootDom();
	    for (let ridx in rdom) {
	        if (true === flg) {
		    /* diplayed target dom, set display value from buffer */
                    if (('none' === rdom[ridx].style("display")) && (true === rdom[ridx].isPushed())) {
		        buf = cmputl.dispbuff(rdom[ridx]);
                        rdom[ridx].style({ "display" : (undefined === buf) ? null : buf });
			cmputl.dispbuff(rdom[ridx], null);
		    }
		} else {
                    /* hidden target dom, buffering display value */
		    buf = rdom[ridx].style("display");
		    if ( ('none' !== buf) && (null !== buf) ) {
		        cmputl.dispbuff(rdom[ridx],buf);
		    }
                    rdom[ridx].style({ "display" : "none" });
		}
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    dispbuff: (dom, val) => {
        try {
            if (false === comutl.isinc(dom,"Dom")) {
                throw new Error("invalid parameter");
	    }
            let dkey = dom.id() + "_display";
            if (undefined === val) {
                /* getter */
                return dom.data(dkey);
	    }
            /* setter */
            dom.data(dkey, val);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    },

    exec_effect: (cmp, eid, cb) => {
        try {
	    let chd = cmp.child();
	    for (let cidx in chd) {
	        mofron.util.component.exec_effect(chd[cidx], eid);
	    }
	    if (false === cmp.execEffect(eid, cb)) {
                if ('function' === typeof cb) {
                    cb();
		}
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    visible: (cmp, vflg, ef, ep) => {
        try {
	    if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
            }
            if (undefined === vflg) {
                /* getter */
                if (false === cmp.isExists()) {
		    /* it does not rendered yet */
                    return false;
                }
                let doms = cmp.rootDom();
                for (let didx in doms) {
                    if ('none' !== doms[didx].style('display')) {
                        return true;
                    }
                }
                return false;
            }
            /* setter */
            if ('boolean' !== typeof vflg) {
                throw new Error('invalid parameter');
            }
            
            if (false === cmp.isExists()) {
	        /* render component */
                cmputl.display(cmp, vflg);
		if (true === vflg) {
                    cmputl.render(cmp, ef, ep);
		}
		return;
	    } else if (true === vflg) {
                cmputl.display(cmp, vflg);
	    }
            let scb = () => {
                try {
                    if (false === vflg) {
                        cmputl.display(cmp, false);
                    }
                    if ("function" === typeof ef) {
                        ef(cmp, cmp.visible(), ep);
                    }
                } catch (e) {
		    console.error(e.stack);
                    throw e;
                }
            }

            cmputl.exec_effect(
	        cmp,
		(true === vflg) ? 0 : 1,
		scb
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    render: (cmp, cbf, cbp) => {
        try {
	    if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
            }
            /* execute theme */
            cmputl.theme(cmp, {});
	    
	    /* execute layout modules */
            cmputl.initmconf(cmp, "layout");
            
            /* before push event */
            cmp.beforeRender();

            /* execute effect module that is 0 speed */
            cmputl.initmconf(cmp, "zsp_effect");
            
            /* render */
	    let rdom = cmp.rootDom();
	    for (let ridx in rdom) {
                if (null === rdom[ridx].parent()) {
                    rdom[ridx].push({ target: document.body });
		} else {
		    let cmp_idx = cmp.parent().getTree().getIndex(cmp);
		    let pc_len  = cmp.parent().child().length;
                    if (cmp_idx === pc_len-1) {
                        /* insert to last of parent */
                        rdom[ridx].push({ target: rdom[ridx].parent().getRawDom() });
		    } else {
                        /* insert to target index of parent */
			rdom[ridx].push({
			    target: cmp.parent().child()[cmp_idx+1].rootDom()[0].getRawDom(),
			    position: 'beforebegin'
			});
		    }
		}
	    }
            /* after push event */
            cmp.afterRender();

            if ("function" === typeof cbf) {
                cbf(cmp, cmp.visible(), cbp);
	    }
            
	    /* execute effect modules */
	    cmputl.initmconf(cmp, "effect");
            
            /* execute event modules */
	    cmputl.initmconf(cmp, "event");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    },

    rstyle: (cmp, sty, opt) => {
        try {
            if (false === comutl.iscmp(cmp)) {
                throw new Error("invalid parameter");
            }
            let root = cmp.rootDom();
            for (let ridx in root) {
                root[ridx].style(sty,opt);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
const cmputl = mofron.util.component;
module.exports = mofron.util.component;
/* end of file */
