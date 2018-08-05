/**
 * @file theme.js
 * @author simpart
 */

/**
 * @class mofron.theme
 * @brief theme defined class
 */
mofron.Theme = class extends mofron.Base {
    /**
     * initialize member
     */
    constructor (po, p1) {
        try {
            super();
            this.name('Theme');
            this.prmOpt(po, p1);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    tgtComp (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_tgtcomp) ? null : this.m_tgtcomp;
            }
            /* setter */
            if (false === mofron.func.isInclude(prm, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_tgtcomp = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    overwrite (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return (undefined === this.m_over) ? true : this.m_over;
            }
            /* setter */
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_over = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set theme contents
     * 
     * @param thm : (mofron.theme object) theme
     */
    setTheme (prm) {
        try {
            if (false === mofron.func.isObject(prm, 'Theme')) {
                throw new Error('invalid parameter');
            }
            let comp_thm = prm.component();
            if (null !== comp_thm) {
                this.compTheme(comp_thm);
            }
    
            let clr_thm  = prm.color();
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    color (c1, c2, c3) {
        try {
            if (undefined === c1) {
                /* getter */
                return (undefined === this.m_color) ? null : this.m_color;
            }
            /* setter */
            if ( ((null !== c1) || (undefined !== c1)) && (true !== mofron.func.isObject(c1, 'Color')) ) {
                throw new Error('invalid parameter');
            }
            if ( ((null !== c2) || (undefined !== c2)) && (true !== mofron.func.isObject(c2, 'Color')) ) {
                throw new Error('invalid parameter');
            }
            if ( ((null !== c3) || (undefined !== c3)) && (true !== mofron.func.isObject(c3, 'Color')) ) {
                throw new Error('invalid parameter');
            }
            
            if (undefined === this.m_color) {
                this.m_color = new Array(null,null,null);
            }
            this.m_color[0] = (undefined === c1) ? null : c1;
            this.m_color[1] = (undefined === c2) ? null : c2;
            this.m_color[2] = (undefined === c3) ? null : c3;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm, p2) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_thmcomp) ? null : this.m_thmcomp;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.component(prm[pidx]);
                }
                return;
            }
            
            if (undefined === this.m_thmcomp) {
                this.m_thmcomp = {};
            }
            
            if ( (true === mofron.func.isObject(prm, 'Param')) &&
                 (2 === prm.get().length) ) {
                this.m_thmcomp[prm.get()[0]] = [prm.get()[1], false];
            } else if ( ('string' !== typeof prm) ||
                        (undefined !== p2) ) {
                this.m_thmcomp[prm] = [p2, false];
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    compTheme (prm) {
        try {
            /* propagation theme */
            let cmp_thm = this.component();
            if (null === cmp_thm) {
                for (let prm_key in prm) {
                    this.component(prm_key, prm[prm_key][0]);
                }
            } else {
                for (let prm_key in prm) {
                    let set_flg = null;
                    for (let cmp_key in cmp_thm) {
                        if ( (cmp_key === prm_key) &&
                             (true === this.overwrite()) ) {
                            /* set overwrite theme component */
                            this.m_thmcomp[cmp_key] = [prm[prm_key][0], false];
                            set_flg = true;
                            break;
                        }
                    }
                    if (false === set_flg) {
                        this.component(prm_key, prm[prm_key][0]);
                    }
                }
            }
            
            /* replaced component */
            cmp_thm     = this.component();
            let chd     = this.tgtComp().getChild(true);
            let key     = null;
            let chk_cmp = null;
            for (let cmp_key in cmp_thm) {
                chk_cmp = cmp_thm[cmp_key][0];
                for (let cidx in chd) {
                    if ( (true === mofron.func.isInclude(chd[cidx],cmp_key)) &&
                         (false === cmp_thm[cmp_key][1]) ) {
                        if (undefined === mofron.comp[chk_cmp.name()]) {
                            throw new Error('could not find component');
                        }
                        //console.log(new cmp_thm[cmp_key][0]({}));
                        let rep_cmp = new mofron.comp[chk_cmp.name()](  //new cmp_thm[cmp_key][0](
                            (null === chd[cidx].getOption()) ? undefined : chd[cidx].getOption()
                        );
                        rep_cmp.execOption(cmp_thm[cmp_key][0].getOption());
                        this.tgtComp().updChild(chd[cidx], rep_cmp);
                        this.m_thmcomp[cmp_key][1] = true;
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
