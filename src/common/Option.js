/**
 * @file Option.js
 * @brief option object for component
 * @author simpart
 */

/**
 * @class Option
 * @brief option class for component
 */
mofron.Option = class extends mofron.Base {
    constructor (opt) {
        try {
            super();
            this.name('Option');
            if ( ('object' !== typeof opt) || (true === Array.isArray(opt))) {
                throw new Error('invalid parameter');
            }
            this.m_option = opt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    exec (cmp, func) {
        try {
            if ( (true !== mofron.func.isInclude(cmp, 'Component')) ||
                 ('string' !== typeof func) ) {
                throw new Error('invalid paramter');
            }
            let get_cmp = cmp[func]();
            if (true !== mofron.func.isInclude(get_cmp, 'Base')) {
                throw new Error('invalid paramter');
            }
            get_cmp.execOption(this.m_option);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
