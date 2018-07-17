/**
 * @file CompConf.js
 * @author simpart
 */
/**
 * @class CompConf
 * @brief Interface of Component Config
 */
mofron.CompConf = class extends mofron.Base {
    
    constructor (po) {
        try {
            super(po);
            this.name('CompConf');
            //this.m_func = new Array(null, null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_comp) ? null : this.m_comp;
            }
            /* setter */
            if (false === mofron.func.isInclude(prm, 'Component') ) {
                throw new Error('invalid parameter');
            }
            this.m_comp = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        console.warn('not implement');
    }
    
    contents (p1, p2) {
        console.warn('not implement');
    }
    
    //confFunc (fnc, prm) {
    //    try {
    //        if (undefined === fnc) {
    //            /* getter */
    //            return this.m_func;
    //        }
    //        /* setter */
    //        if ('function' !== typeof fnc) {
    //            throw new Error('invalid parameter');
    //        }
    //        this.m_func[0] = fnc;
    //        this.m_func[1] = (undefined === prm) ? null : prm;
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
    
    //ignore (flg) {
    //    try {
    //        if (undefined === flg) {
    //            /* getter */
    //            return (undefined === this.m_cpcf_ign) ? false : this.m_cpcf_ign;
    //        }
    //        /* setter */
    //        if ('boolean' !== typeof flg) {
    //            throw new Error('invalid parameter');
    //        }
    //        this.m_cpcf_ign = flg;
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}

    value (p1, p2, p3, p4, p5) {
        try {
            if (undefined === p1) {
                /* getter */
                return super.param();
            }
            /* setter */
            super.param(new mofron.Param(p1, p2, p3, p4, p5));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    //param (p1, p2, p3, p4, p5) {
    //    try {
    //        if (undefined === p1) {
    //            /* getter */
    //            return super.param();
    //        }
    //        /* setter */
    //        super.param(new mofron.Param(p1, p2, p3, p4, p5));
    //        if ((null !== this.component()) && (true === this.component().adom().isPushed())) {
    //            this.execute();
    //        }
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
}
/* end of file */
