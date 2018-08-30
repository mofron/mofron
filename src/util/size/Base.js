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
    constructor (po) {
        try {
            super();
            this.name('Size');
            this.prmOpt(po);
            if (null !== this.param()) {
                this.value(po);
            }
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
    
    number (prm) {
        try {
            if (undefined === prm) {
                /* getter */ 
                return (undefined === this.m_number) ? 0 : this.m_number;
            }
            /* setter */
            if ('number' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_number = prm;
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
    
    value (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (null === this.type()) ? null : this.number() + this.type();
            }
            /* setter */
            let siz = mofron.func.getSize(prm);
            this.number(siz[0]);
            this.type(siz[1]);
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
                this.number(
                    (true === flg) ? this.toPxnum() + prm.toPxNum() : this.toPxnum() - prm.toPxnum()
                );
                this.type('px');
            } else {
                this.number(
                    (true === flg) ? this.number() + prm.number() : this.number() - prm.number()
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
