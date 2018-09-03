/**
 * @file  Size.js
 * @brief size data type
 * @author simpart
 */

/**
 * @class Size
 * @brief Size Defined Class
 */
mofron.size.Base = class extends mofron.Base {
    /**
     *
     */
    constructor (siz) {
        try {
            super();
            this.name('Size');
            if ('string' !== typeof siz) {
                throw new Error('invalid parameter');
            }
            let gsiz = mofron.func.getSize(siz);
            this.value(gsiz[0]);
            this.type(gsiz[1]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    //component (prm) {
    //    try {
    //        if (undefined === prm) {
    //            /* getter */
    //            return (undefined === this.m_comp) ? null :  this.m_comp;
    //        }
    //        /* setter */
    //        if (true !== mofron.func.isInclude(prm, 'Component')) {
    //            throw new Error('invalid parameter');
    //        }
    //        this.m_comp = prm;
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
    
    type (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_type) ? null : this.m_type;
            }
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_type = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    value (prm) {
        try {
            if (undefined === prm) {
                /* getter */ 
                return (undefined === this.m_value) ? 0 : this.m_value;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_value = prm;
            //if (null !== this.component()) {
            //    let set_style = {};
            //    set_style[this.key()]
            //    this.component().style({
            //        
            //    });
            //}
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toString () {
        try {
            return (null === this.type()) ? null : this.value() + this.type(); 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toPxnum () {}
    
    
    add (prm) {
        try {
            this.calcu(prm, true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
    
    sub (prm) {
        try {
            this.calcu(prm, false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    calcu (prm, flg) {
        try {
            if (true !== mofron.func.isInclude(prm, ['Base', 'Size'])) {
                throw new Error('invalid parameter');
            }
            if (prm.type() !== this.type()) {
                if ((undefined === prm.toPxnum()) || (undefined === this.toPxnum())) {
                    throw new Error('different type');
                }
                this.value(
                    (true === flg) ? this.toPxnum() + prm.toPxNum() : this.toPxnum() - prm.toPxnum()
                );
                this.type('px');
            } else {
                this.value(
                    (true === flg) ? this.value() + prm.value() : this.value() - prm.value()
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
