/**
 * @file Base.js
 * @author simpart
 */

/**
 * @class Base
 * @brief top of mofron parent class
 */
mofron.Base = class {
    constructor () {
        try {
            this.m_name = new Array();
            this.name('Base');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * component name setter / getter
     *
     * @param nm : (string) component name
     * @return (string) component name
     * @note parameter syntax
     */
    name (nm) {
        try {
            if (undefined === nm) {
                if (0 === this.m_name.length) {
                    return null;
                }
                return this.m_name[this.m_name.length-1];
            }
            if ( !( ('string' === (typeof nm)) ||
                    ( ('object' === (typeof nm)) && (undefined !== nm[0])) ) ) {
                throw new Error('invalid parameter');
            }
            if ('object' === (typeof nm)) {
                for (var idx in nm) {
                    this.m_name.push(nm[idx]);
                }
            } else {
                this.m_name.push(nm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    data (key, val) {
        try {
            if (undefined === val) {
                /* getter */
                if (undefined === this.m_data) {
                    return null;
                }
                return (undefined === this.m_data[key]) ? null : this.m_data[key];
            }
            /* setter */
            if ('string' !== typeof key) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_data) {
                this.m_data = {};
            }
            this.m_data[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getNameList () {
        try {
            return this.m_name;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getId () {
        try {
            if (undefined === this.m_id) {
                this.m_id = mofron.func.getId();
            }
            return this.m_id;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    param (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_param) ? null : this.m_param.getParam();
            }
            /* setter */
            let pchk    = this.prmCheck();
            let get_prm = prm.getParam();
            if (null !== pchk) {
                for (let idx in pchk) {
                    pchk[idx](get_prm[idx]);
                }
            }
            this.m_param = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmCheck () {
        try {
            if (0 === arguments.length) {
                /* getter */
                return (undefined === this.m_prmcheck) ? null : this.m_prmcheck;
            }
            if (undefined === this.m_prmcheck) {
                this.m_prmcheck = new Array();
            }
            for (let idx in arguments) {
                if ('function' !== typeof arguments[idx]) {
                    throw new Error('invalid parameter');
                }
                this.m_prmcheck.push(arguments[idx]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getOption () {
        try {
            return (undefined === this.m_opt) ? null : this.m_opt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addOption (opt) {
        try {
            if ('object' !== typeof opt) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_opt) {
                this.m_opt = {};
            }
            for (let oidx in opt) {
                this.m_opt[oidx] = opt[oidx];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setPrmOpt (po, p2, p3, p4, p5) {
        try {
            let prm_cnt = 0;
            for (let pidx in arguments) {
                if (undefined !== arguments[pidx]) {
                    prm_cnt++;
                }
            }
            if (0 === prm_cnt) {
                return;
            } else if (1 === prm_cnt) {
                if ('object' === typeof po) {
                    if ("undefined" === typeof po[0]) {
                        if (true === mofron.func.isInclude(po, 'Base')) {
                            /* this is parameter */
                            this.param(new mofron.Param(po));
                            return;
                        }
                        
                        for (let pidx2 in po) {
                            if ('string' !== typeof pidx2) {
                                /* this is paramter */
                                this.param(new mofron.Param(po));
                                return;
                            }
                        }
                        /* this is option */
                        this.addOption(po);
                    } else {
                        /* this is paramter */
                        this.param(new mofron.Param(po));
                    }
                } else {
                    /* this is paramter */
                    this.param(new mofron.Param(po, p2, p3, p4, p5));
                }
            } else {
                this.param(new mofron.Param(po, p2, p3, p4, p5));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmOpt (po, p1, p2, p3, p4) {
        try {
            this.setPrmOpt(po, p1, p2, p3, p4);
            let opt = this.getOption();
            if (null !== opt) {
                this.execOption();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delOption (key) {
        try {
            if ('string' !== typeof key) {
                throw new Error('invalid parameter');
            }
            delete this.m_opt[key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execOption (opt) {
        try {
            if (undefined !== opt) {
                this.addOption(opt);
            } else {
                opt = this.getOption();
            }
            
            if (null === opt) {
                return;
            }
            
            for (var opt_idx in opt) {
                if ('function' === typeof this[opt_idx]) {
                    if ('name' === this[opt_idx]) {
                        throw new Error('invalid option name');
                    }
                    if ( (true === mofron.func.isObject(opt[opt_idx],'Param')) ||
                         (true === mofron.func.isObject(opt[opt_idx],'Option')) ) {
                        opt[opt_idx].exec(this, opt_idx);
                    }else {
                        this[opt_idx](opt[opt_idx]);
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
