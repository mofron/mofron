

mofron.Base = class {
    constructor () {
        try {
            this.m_name = new Array();
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
    
    option (opt) {
        try {
            if ((null !== opt) && ('object' === typeof opt)) {
                /* option */
                for (var opt_idx in opt) {
                    if ('function' === typeof this[opt_idx]) {
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
