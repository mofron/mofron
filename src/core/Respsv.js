/**
 * @file Respsv.js
 * @brief interface for responsive config
 * @author simpart
 */

/**
 * @class Respsv
 * @brief base class of Responsive
 */
mofron.Respsv = class extends mofron.CompConf {
    constructor (po) {
        try {
            super(po);
            this.name('Respsv');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            if (true !== this.chkFilter()) {
                return;
            }
            this.contents(this.component());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    
    chkFilter () {
        try {
            let fil = this.filter();
            if (null === fil) {
                throw new Error('could not find filter');
            }
            
            let chk_ret = null;
            for (let fidx in fil) {
                /*  check device type */
                chk_ret = this.chkDevice(fil[fidx]);
                if (false === chk_ret) {
                    return chk_ret;
                }
                /* check os type */
                chk_ret = this.chkOS(fil[fidx]);
                if (false === chk_ret) {
                    return chk_ret;
                }
                /* check browser type */
                chk_ret = this.chkBrowser(fil[fidx]);
                if (false === chk_ret) {
                    return chk_ret;
                }
            }
            return true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    filter (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_filter) ? null : this.m_filter;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let fidx in prm) {
                    this.filter(prm[fidx]);
                }
                return;
            }
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_filter) {
                this.m_filter = new Array();
            }
            this.m_filter.push(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    chkDevice (prm) {
        try {
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let loprm = prm.toLowerCase();
            if ( ('mobile' !== loprm) &&
                 ('tablet' !== loprm) &&
                 ('other'  !== loprm) ) {
                return null;
            }
            return (loprm === mofron.func.devType()) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    chkOS (prm) {
        try {
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let loprm = prm.toLowerCase();
            let ua    = window.navigator.userAgent.toLowerCase();
            if ('ios' === loprm) {
                if ( (ua.indexOf('iphone') > 0) ||
                     (ua.indexOf('ipod')   > 0) ||
                     (ua.indexOf('ipad')   > 0) ) {
                    return true;
                } else {
                    return false;
                }
            } else if ('android' === loprm) {
                return (ua.indexOf('android') > 0) ? true : false;
            } else {
                return null;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    chkBrowser (prm) {
        try {
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            let loprm = prm.toLowerCase();
            if ( ('ie'      !== loprm) &&
                 ('edge'    !== loprm) &&
                 ('chrome'  !== loprm) &&
                 ('safari'  !== loprm) &&
                 ('firefox' !== loprm) &&
                 ('opera'   !== loprm) &&
                 ('other'   !== loprm) ) {
                return null;
            }
            return (loprm === mofron.func.brsType()) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    prmOpt (po, p2, p3, p4, p5) {
        try {
            if (true === Array.isArray(po)) {
                this.filter(po);
                super.prmOpt(p2, p3, p4, p5);
            } else {
                super.prmOpt(po, p2, p3, p4, p5);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    //browserVer (prm, lof) {
    //    try {
    //        
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
}
/* end of file */
