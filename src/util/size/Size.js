/**
 * @file  Size.js
 * @brief size data type
 * @author simpart
 */

/**
 * @class Size
 * @brief Size Defined Class
 */
mofron.size.Size = class extends mofron.Base {
    /**
     *
     */
    constructor (siz, tp) {
        try {
            super();
            this.name('Size');
            
            if ( ('number' === typeof siz) && ('string' === typeof tp) ) {
                this.value(siz);
                this.type(tp);
            } else {
                this.value(mofron.func.getSizeValue(siz));
                this.type(mofron.func.getSizeType(siz));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
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
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    option (prm) {
        try { return this.member("option", "object", prm, {}); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    toStyle () {
        try { return [this.toString(), this.option()]; } catch (e) {
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
    
    
    //sum (p1, p2) {
    //    try { return mofron.func.sizeSum(this, p1, p2); } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //} 
    
    //diff (p1, p2) {
    //    try { return mofron.func.sizeDiff(this, p1, p2); } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
}
/* end of file */
