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
            this.contents(opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    exec (src, func) {
        try {
            if ( (true !== mofron.func.isInclude(src, 'Base')) ||
                 ('function' !== typeof src[func]) ) {
                throw new Error('invalid paramter');
            }
            let opt_tgt = src[func]();
            if (true !== mofron.func.isInclude(opt_tgt, 'Base')) {
                throw new Error('invalid paramter');
            }
            opt_tgt.execOption(this.contents());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (prm) {
        try { return this.member('contents', 'object', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
