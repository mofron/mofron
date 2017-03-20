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
            this.m_name  = new Array();
            this.m_param = null;
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
            if ('string' !== (typeof nm)) {
                throw new Error('invalid parameter');
            }
            this.m_name.push(nm);
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
    
    prmOpt (prm_opt) {
        try {
            if ((undefined === prm_opt) || (null === prm_opt)) {
                return;
            }
            if ('object' === typeof prm_opt) {
                if ((undefined  !== typeof prm_opt[0]) &&
                    ('function' === typeof prm_opt['name'])) {
                    this.m_param = prm_opt;
                    return;
                }
            } else {
                this.m_param = prm_opt;
                return;
            }
            /* prm is option */
            var opt = prm_opt;
            if ((null !== opt) && ('object' === typeof opt)) {
                /* option */
                for (var opt_idx in opt) {
                    if ('param' === opt_idx) {
                        this.m_param = opt[opt_idx];
                    } else if ('function' === typeof this[opt_idx]) {
                        if ( ('option' === this[opt_idx]) ||
                             ('name'   === this[opt_idx]) ) {
                            throw new Error('invalid option');
                        }
                        if (true === mofron.func.isObject(opt[opt_idx],'Param')) {
                            opt[opt_idx].call(this,opt_idx);
                        } else {
                            this[opt_idx](opt[opt_idx]);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
