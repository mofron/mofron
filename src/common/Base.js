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
            this.m_member = {};
            this.m_buff   = {};
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
            let ret = this.arrayMember('name', 'string', nm);
            return ((undefined !== ret) && (0 < ret.length)) ? ret[ret.length-1] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getNameList () {
        try { return this.arrayMember('name'); } catch (e) {
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
    
    member (key, tp, prm, ini) {
        try {
            if (('string' !== typeof key) || ('function' !== typeof this[key])) {
                throw new Error('invalid parameter');
            }
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_member[key]) {
                    return (undefined === ini) ? null : ini;
                }
                return this.m_member[key];
            } else if (null === prm) {
                /* delete */
                this.m_member[key] = prm;
                return;
            }
            /* setter */
            if (true === mofron.func.isInclude(prm, 'Base')) {
                if (false === mofron.func.isInclude(prm, tp)) {
                    throw new Error('invalid parameter');
                }
            } else if (true === Array.isArray(tp)) {
                let hit = false;
                for (let tidx in tp) {
                    if (tp[tidx] === prm) {
                        hit = true;
                        break;
                    }
                }
                if (true !== hit) {
                    throw new Error('invalid parameter');
                }
            } else if (tp !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_member[key] = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    arrayMember (key, tp, prm) {
        try {
            if ( ('string' !== typeof key) || ('function' !== typeof this[key]) ) {
                throw new Error('invalid parameter');
            }
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_member[key]) ? [] : this.m_member[key];
            }
            /* setter */
            if ( (true === Array.isArray(prm)) && (false === Array.isArray(tp))) {
                for (let aidx in prm) {
                    this.arrayMember(key, tp, prm[aidx]);
                }
                return;
            }
            
            if (true === mofron.func.isInclude(prm, 'Base')) {
                if (false === mofron.func.isInclude(prm, tp) ) {
                    throw new Error('invalid parameter');
                }
            } else if (true === Array.isArray(tp)) {
                if (tp.length !== prm.length) {
                    throw new Error('mismatched array length');
                }
                for (let tidx in tp) {
                    if (null === tp[tidx]) { 
                        continue;
                    } else if (tp[tidx] !== typeof prm[tidx]) {
                        throw new Error('invalid parameter');
                    }
                }
            } else if (null === tp) {
                
            } else if (tp !== typeof prm) {
                throw new Error('invalid parameter');
            }
            
            if (undefined === this.m_member[key]) {
                this.m_member[key] = new Array();
            }
            this.m_member[key].push(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    param (prm, pflg) {
        try {
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_param) {
                    return null;
                }
                return ((undefined === pflg) || (false === pflg)) ? this.m_param.get() : this.m_param;
            }
            /* setter */
            this.m_param = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getOption () {
        try { return (undefined === this.m_opt) ? null : this.m_opt; } catch (e) {
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
                if (undefined === this.m_opt[oidx]) {
                    this.m_opt[oidx] = opt[oidx];
                } else {
                    let lst_opt = this.listOption();
                    let islist  = false;
                    for (let lidx in lst_opt) {
                        if (oidx === lst_opt[lidx]) {
                            islist = true;
                            break;
                        }
                    }
                    
                    opt[oidx] = this.getFuncPrm(oidx, opt[oidx]);
                    
                    if (true === islist) {
                        if (true === Array.isArray(opt[oidx])) {
                            for (let ooidx in opt[oidx]) {
                                this.m_opt[oidx].push(opt[oidx][ooidx]);
                            }
                        } else {
                            for (let ooidx in opt[oidx]) {
                                this.m_opt[oidx][ooidx] = opt[oidx][ooidx];
                            }
                        }
                    } else {
                        this.m_opt[oidx] = opt[oidx];
                    }
                }
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
            } else if ( (null !== this.param()) && (0 !== this.prmMap().length) ) {
                mofron.func.execPrmMap(this);
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
            
            for (let opt_idx in opt) {
                if ('function' === typeof this[opt_idx]) {
                    if ('name' === this[opt_idx]) {
                        throw new Error('invalid option name');
                    }
                    
                    opt[opt_idx] = this.getFuncPrm(opt_idx, opt[opt_idx]);
                    
                    if ( (true === mofron.func.isObject(opt[opt_idx],'Param')) ||
                         (true === mofron.func.isObject(opt[opt_idx],'Option')) ) {
                        opt[opt_idx].exec(this, opt_idx);
                    } else {
                        this[opt_idx](opt[opt_idx]);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmMap (map) {
        try {
            if (undefined === map) {
                /* getter */
                return (undefined === this.m_map) ? [] : this.m_map;
            }
            /* setter */
            if ('string' === typeof map) { 
                this.m_map = [map];
                return;
            } if (true === Array.isArray(map)) {
                for (let midx in map) {
                    if ('string' !== typeof map[midx]) {
                        throw new Error('invalid parameter');
                    }
                }
                this.m_map = map;
                return;
            }
            throw new Error('invalid parameter');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    listOption (lst) {
        try { return this.arrayMember("listOption", "string", lst); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFuncPrm (idx, prm) {
        try {
            if ( (true === Array.isArray(prm)) &&
                 (this[idx].length > 1)        &&
                 (prm.length === this[idx].length) ) {
                /* array type param */
                let ret_prm = new mofron.Param();
                for (let pidx in prm) {
                    ret_prm.add(prm[pidx]);
                }
                return ret_prm;
            }
            return prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    data (key, val) {
        try {
            if ('string' !== typeof key) {
                throw new Error('invalid parameter');
            }
            if (undefined === val) {
                /* getter */
                return (undefined === this.m_buff[key]) ? null : this.m_buff[key];
            }
            /* setter */
            this.m_buff[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    objkey (key) {
        try {
            let ret = this.member('objkey', 'string', key);
            if (undefined === key) {
                return ret;
            }
            mofron.func.objkey(key, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
