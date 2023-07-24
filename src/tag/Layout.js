/**
 * @file layout/Base.js
 * @brief Base class of layout
 */
const ModConf = require("../core/ModConf.js");
const comutl  = mofron.util.common;

module.exports = class extends ModConf {
    constructor (po) {
        try {
            super();
            this.modname('Layout');
            
	    this.confmng().add("skip", { type: "Component", list: true });
            this.confmng().add("execlog", { type: "Component", list: true, private:true });
            
            //this.m_execnt = 0;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            let cmp_chd = this.component().child();
            
            for (let cidx in cmp_chd) {
                /* check skip */
                if (true === this.isSkipped(cmp_chd[cidx])) {
                    continue;
		}
                
                if (false === this.isExeced(cmp_chd[cidx])) {
		    /* execute layout contents */
                    this.contents(parseInt(cidx), cmp_chd[cidx]);
		    this.confmng("execlog", cmp_chd[cidx]);
		}
	    }
            this.isInited(true); 
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    isExeced (cmp) {
        try {
            let elog = this.confmng("execlog");
	    for (let eidx in elog) {
                if (elog[eidx].id() === cmp.id()) {
                    return true;
		}
	    }
	    return false;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    contents (idx, tgt) {
        console.warn('not implement');
    }
    
    skip (prm) {
        try {
            return this.confmng("skip", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    isSkipped (cmp) {
        try {
            let skp = this.skip();
            for (let sidx in skp) {
                if (skp[sidx].id() === cmp[cidx].id()) {
		    return true;
                }
            }
            return false;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
