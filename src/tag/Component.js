/**
 * @file   Component.js
 * @brief  basement component class
 * @author simpart
 */
const Base     = require("../core/Base.js");
const CompTree = require("../core/tree/CompTree.js");
const Dom      = mofron.class.Dom;
const comutl = mofron.util.common;
const cmputl = mofron.util.component;
const effutl = require("../util/effect.js");

module.exports = class extends Base {
    /**
     * initialize property, dom
     *
     * @param (mixed) component proterty
     */
    constructor (prm) {
        try {
            super();
            this.modname("Component");
            
            this.confmng().add("rootDom",     { type: "Dom",     list: true, private: true });
            this.confmng().add("childDom",    { type: "Dom",     private: true });
	    this.confmng().add("styleDom",    { type: "Dom",     private: true });
            this.confmng().add("eventDom",    { type: "Dom",     private: true });
	    this.confmng().add("layout",      { type: "ModConf", list: true });
	    this.confmng().add("effect",      { type: "ModConf", list: true });
	    this.confmng().add("event",       { type: "ModConf", list: true });
	    this.confmng().add("renderEvent_before", { type: "event", list: true, private: true });
	    this.confmng().add("renderEvent_after",  { type: "event", list: true, private: true });
            this.confmng().add("style",       { type: "key-value" });
	    this.confmng().add("theme",       { type: "key-value" });
	    this.confmng().add("innerComp",   { type: "key-value", private: true });
            this.confmng().add("mainColor",   { type: "color" });
            this.confmng().add("baseColor",   { type: "color" });
	    this.confmng().add("accentColor", { type: "color" });
            
            /* initialize member */
            this.m_tree = new CompTree(this);
            
	    /*** set config ***/
	    this.shortForm("child");
            
	    /* user config */
	    if (undefined !== prm) {
	        this.config(prm);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** dom method ***/
    
    /**
     * dom setter / getter
     * 
     * @return (object) dom object
     */
    rootDom (prm) {
        try {
	    if (undefined === prm) {
                /* getter */
		if (0 === this.confmng().get("rootDom").length) {
                    this.initDomConts();
		}
		return this.confmng().get("rootDom");
	    }
	    /* setter */
            this.confmng().set("rootDom", prm);
            if (null === this.childDom()) {
                this.childDom(this.rootDom()[0]);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom target setter / getter
     * 
     * @param tgt : (object) dom object
     * @return (object) dom object
     */
    childDom (tgt) {
        try {
	    this.rootDom();
	    let ret = this.confmng("childDom", tgt);
	    if (null === ret) {
	        if (0 < this.rootDom().length) {
                    this.confmng("childDom", this.rootDom()[0]);
		    return this.confmng("childDom");
		} else {
                    throw new Error("could not find child dom");
		}
	    }
	    return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get style target dom
     *
     * @param tgt : (object) dom object
     * @return (object) dom object
     */
    styleDom (tgt) {
        try {
	    let ret = this.confmng("styleDom", tgt);
	    return (null === ret) ? this.childDom() : ret; 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get event target dom
     *
     * @param tgt : (object) dom object
     * @return (object) dom object
     */
    eventDom (tgt) {
        try {
            let ret = this.confmng("eventDom", tgt);
            return (null === ret) ? this.childDom() : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    renderEvent (prm, typ) {
        try {
	    let type = (undefined === typ) ? "after" : typ;
	    if (undefined === prm) {
                return this.confmng("renderEvent_" + type);
	    }
            this.confmng("renderEvent_" + type, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            cmputl.chdloop(this, "beforeRender");
            
	    let evt = this.renderEvent(undefined, "before");
	    for (let eidx in evt) {
                evt[0](this,evt[1]);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts(prm) {
        try {
            this.rootDom(
	        new Dom((undefined === prm) ? "div" : prm, this)
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    afterRender () {
        try {
            cmputl.chdloop(this, "afterRender");
            
            let evt = this.renderEvent(undefined, "after");
            for (let eidx in evt) {
                evt[0](this,evt[1]);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTree () {
        try {
            return this.m_tree;
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /*** child method ***/
    /**
     * child component setter / getter
     * 
     * @param chd : (object) child component
     * @param chd : (object) child component array
     * @return (array) : childlen object
     */
    child (chd, idx) {
        try {
	    this.rootDom();
	    let ct = (true === cmputl.isinncmp(this)) ? this.childDom().component().getTree() : this.getTree();
            if (undefined === chd) {
                /* getter */
                return ct.getChild();
            }
            /* setter */
            ct.addChild(chd, idx);
            if ((true === this.isExists()) && (true === cmputl.isinncmp(this))) {
                /* perform layout on added components */
                cmputl.initmconf(this, "layout");
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    parent (prm) {
        try {
            return this.getTree().parent(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    innerComp (key, val, defcmp) {
        try {
            let incmp = this.confmng().get("innerComp");
            if (undefined === val) {
                /* getter */
                if (undefined === incmp[key]) {
                    this[key](new defcmp({}));
                }
                return incmp[key];
            } else if (false === comutl.iscmp(val)) {
	        this.innerComp(key).config(val);
		return;
            }
            /* setter */
            if (undefined !== incmp[key]) {
	        if (false === comutl.isinc(val,incmp[key].modname())) {
                    throw new Error("invalid parameter");
		}
                /* rewrite component, replace target child */
                let pnt = incmp[key].parent();
		if (null !== pnt) {
		    pnt.getTree().replace(incmp[key], val);
		}
            }
            incmp[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /* component method */
    /**
     * execute effect
     *
     * @param (number) execute id
     * @param (function, array) callback
     * @return (boolean) execute result
     */
    execEffect (eid, cb, cbp) {
        try {
	    return effutl.exec(
	        cmputl.modconf(this, "effect"), eid, [cb,cbp]
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isExists () {
        try {
            return this.childDom().isPushed();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** user config method ***/
    /**
     * style getter / setter
     *
     * @return (object) style object
     */
    style (kv, opt) {
        try {
            if ("string" === typeof kv) {
                /* getter */
		return this.styleDom().style(kv);
	    } else if (undefined === kv) {
                return this.styleDom().style(kv).get();
	    }
            this.styleDom().style(kv, opt);
            this.confmng("style", kv, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (prm, opt) {
        try {
	    return cmputl.modconf(this, "layout", prm, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (prm, opt) {
        try {
	    return cmputl.modconf(this, "effect", prm, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event (prm, opt) {
        try {
	    return cmputl.modconf(this, "event", prm, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    accessConf () {
        try {
	    let hit = false;
	    for (let arg_idx in arguments) {
	        hit = false;
	        if (undefined === arguments[arg_idx].access) {
		    if (true !== hit) {
                        /* set default config */
			this.config(arguments[arg_idx].config);
		    }
                    break;
		}
		/* check access types */
		let orit = arguments[arg_idx].access.orientation;
                if (undefined !== orit) {
                    if ( (('portrait' === orit) && (true !== mofron.window.isPortrait())) ||
		         (('landscape' === orit) && (true !== mofron.window.isLandscape())) ) {
                        continue;
		    }
		    delete arguments[arg_idx].access.orientation;
		}
		hit = comutl.chkacc(arguments[arg_idx].access);
		if (true === hit) {
                    this.config(arguments[arg_idx].config);
		}
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * 
     */
    theme (prm) {
        try {
	    return this.confmng("theme", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    template (tmpl, prm) {
        try {
            if ('function' !== typeof tmpl) {
                throw new Error('invalid parameter');
            }
            this.child(tmpl(prm));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
	    /* destroy in component layer */
	    if (null !== this.parent()) {
                this.parent().getTree().delChild(this);
	    }

	    /* destroy in dom layer */
            let rdom = this.rootDom();
	    for (let ridx in rdom) {
                rdom[ridx].destroy();
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (x, y, opt) {
        try {
            if (undefined === x) {
                /* getter */
                return [this.width(), this.height()];
            }
            /* setter */
            this.width(x, opt);
	    this.height(y, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    width (prm, opt) {
        try {
	    return cmputl.size(this, "width", prm, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm, opt) {
        try {
	    return cmputl.size(this, "height", prm, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /*** color method ***/
    color (c1, c2, c3) {
        try {
	    if (undefined === c1) {
	        /* getter */
                return [this.mainColor(), this.baseColor(), this.accentColor()];
	    }
            let clr_tgt = ["mainColor", "baseColor", "accentColor"];
            for (let cidx in clr_tgt) {
		if (undefined === arguments[cidx]) {
                    continue;
		} else if (true === comutl.isinc(arguments[cidx],"ConfArg")) {
                    arguments[cidx].exec(this, clr_tgt[cidx]);
		} else {
                    this[clr_tgt[cidx]](arguments[cidx]);
		}
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    mainColor (prm, opt) {
        /* this is interface */
	this.confmng("mainColor",prm);
	return null;
    }
    
    baseColor (clr, opt) {
        try {
	    /* interface */
	    this.confmng("baseColor",clr);
	    return cmputl.color(this, "background", clr, opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm, opt) {
        /* this is interface */
	return this.confmng("accentColor",prm);
    }
    

    visible (flg, cbf,cbp) {
        try {
	    return cmputl.visible(this, flg, cbf, cbp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    config (p1,p2,p3,p4,p5) {
        try {
	    this.rootDom();
	    if ( (0 === arguments.length) ||
	         ((1 === arguments.length) && (undefined === p1)) ) {
                return super.config();
	    }
            super.config(p1,p2,p3,p4,p5);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
