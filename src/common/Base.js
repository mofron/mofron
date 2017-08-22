/**
 * @file Base.js
 * @author simpart
 */

/**
 * @class Base
 * @brief top of mofron parent class
 */
mofron.Base = class {
    constructor (po) {
        try {
            this.m_name  = new Array();
            this.m_param = null;
            this.setPrmOpt(po);
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
                return this.m_data[key];
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
                return this.m_param;
            }
            /* setter */
            this.m_param = prm;
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
    
    prmOpt (po) {
        this.setPrmOpt(po);
    }
    
    setPrmOpt (po) {
        try {
            if ( (undefined === po) ||
                 (null      === po) ) {
                return;
            }
            if ( ('object'  !== typeof po) ||
                 (undefined !== po[0]) ) {
                /* prm-opt is paramter */
                this.param(po);
            } else if (null !== po) {
                /* prm-opt is option */
                this.addOption(po);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execOption (opt) {
        try {
            opt = (undefined === opt) ? this.getOption() : opt;
            if (null === opt) {
                return;
            }
            
            if ('object' !== typeof opt) {
                throw new Error('invalid parameter');
            }
            for (var opt_idx in opt) {
                if ('function' === typeof this[opt_idx]) {
                    if ( ('prmOpt' === this[opt_idx]) ||
                         ('name'   === this[opt_idx]) ) {
                        throw new Error('invalid option name');
                    }
                    if (true === mofron.func.isObject(opt[opt_idx],'Param')) {
                        opt[opt_idx].call(this,opt_idx);
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
    
    setOption (opt) {
        try {
            if ('object'  !== typeof opt) {
                throw new Error('invalid parameter');
            }
            for (var opt_idx in opt) {
                if ('function' === typeof this[opt_idx]) {
                    if ( ('prmOpt' === this[opt_idx]) ||
                         ('name'   === this[opt_idx]) ) {
                        throw new Error('invalid option name');
                    }
                    if (true === mofron.func.isObject(opt[opt_idx],'Param')) {
                        opt[opt_idx].call(this,opt_idx);
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
}
/* end of file */
