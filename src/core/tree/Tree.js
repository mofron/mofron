/**
 * @file Tree.js
 * @brief basement tree manager
 * @license MIT
 */
const comutl = mofron.util.common;

module.exports = class {
    constructor (tgt, elm) {
        try {
	    this.m_parent = null;
	    this.m_child  = [];
            
	    this.elemName(tgt.modname());
	    this.target(tgt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    elemName (prm) {
        try {
            if (undefined === prm) {
                if (undefined === this.m_elemnm) {
                    throw new Error("could not find element name");
		}
		return this.m_elemnm;
	    }
	    if ("string" !== typeof prm) {
                throw new Error("invalid parameter");
	    }
	    this.m_elemnm = prm;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    target (prm) {
        try {
	    if (undefined === prm) {
                if (undefined === this.m_target) {
                    throw new Error("could not find target");
		}
		return this.m_target;
	    }
            if (false === comutl.isinc(prm, this.elemName())) {
                throw new Error('invalid parameter');
	    }
            this.m_target = prm;
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    getChild () {
        try {
            return this.m_child;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, idx) {
        try {
	    /* parameter check */
            if (true === Array.isArray(chd)) {
	        for (let cidx in chd) {
                    this.addChild(
		        chd[cidx],
			(undefined !== idx) ? idx+parseInt(cidx) : undefined
	            );
                }
                return;
	    }
            if (false === comutl.isinc(chd, this.elemName())) {
                throw new Error('invalid parameter');
            }
            /* set parent-child relation */
	    chd.parent(this.target());
	    /* add child */
            if (undefined === idx) {
                this.getChild().push(chd);
            } else {
                this.getChild().splice(idx, 0, chd);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    delChild (chd) {
        try {
	    let del_idx = this.getIndex(chd);
	    this.getChild().splice(del_idx, 1);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    parent (prm) {
        try {
	    if (undefined === prm) {
                /* getter */
		return (undefined === this.m_parent) ? null : this.m_parent;
	    }
            if (false === comutl.isinc(prm, this.elemName())) {
                throw new Error('invalid parameter');
            }
	    this.m_parent = prm;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    getIndex (prm) {
        try {
            let chd = this.getChild();
	    for (let cidx in chd) {
                if (chd[cidx].id() === prm.id()) {
                    return parseInt(cidx);
		}
	    }
	    throw new Error("invalid parameter");
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
