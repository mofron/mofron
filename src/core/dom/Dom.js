/**
 * @file Dom.js
 * @author simpart
 */
const Base  = require("../Base.js");
const Class = require("./Class.js");
const Style = require("./Style.js");
const Attrs = require("./Attrs.js");
const Props = require("./Props.js");
const Tree  = require("../tree/Tree.js");

const IDX_CLASS = 0;
const IDX_STYLE = 1;
const IDX_ATTRS = 2;
const IDX_PROPS = 3;


module.exports = class extends Base {
    /**
     * initialize member
     *
     */
    constructor (tc, cmp) {
        try {
            super();
            this.modname('Dom');
            
            this.confmng().add("tag", { type: "string" });
            this.confmng().add("component", { type: "Component" });
            this.confmng().add("text", { type: "string", init: "" });
            this.confmng().add("dummy", { type: "boolean", init: false });

	    this.m_tree   = new Tree(this);
            this.m_rawdom = null;
	    this.m_conf   = [new Class(this), new Style(this), new Attrs(this), new Props(this)];
            
	    if ("string" === typeof tc) {
                this.tag(tc);
	        this.component(cmp);
	    } else if (undefined !== tc) {
                this.config(tc);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * tag name setter / getter
     *
     * @param tg : (string) tag name (option)
     * @return (string) tag name
     */
    tag (tg) {
        try {
	    return this.confmng("tag", tg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * component getter / setter
     * 
     * @param cmp (object) mofron.Component
     * @return (object) mofron.Component
     */
    component (cmp) {
        try {
	    return this.confmng("component", cmp);
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

    child (chd, idx) {
        try {
            if (undefined === chd) {
                /* getter */
                return this.m_tree.getChild();
            }
            /* setter */
            this.m_tree.addChild(chd,idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    parent (prm) {
        try {
            return this.m_tree.parent(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    conf (k_kv, v_opt, idx, opt) {
        try {
            let cnf = this.m_conf[idx];
            if (undefined === k_kv) {
                /* get dom-config object */
                return cnf;
            } else if (('string' === typeof k_kv) && (undefined === v_opt)) {
                /* getter */
                return cnf.get(k_kv);
            }
            /* setter */
            if ('object' === typeof k_kv) {
                cnf.set(k_kv, v_opt);
            } else if ('string' === typeof k_kv) {
                let set_kv = {};
                set_kv[k_kv] = v_opt;
                cnf.set(set_kv, opt);
            }
            this.value(null);
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }

    /**
     * style setter / getter
     *
     * @param kv : (object) key-value object
     * @param opt: (object) option
     * @return (string) : value of style
     * @return (object) : style object
     */
    style (kv, opt) {
        try {
	    if ((undefined !== opt) && (true === opt.bpref)) {
                for (let key in kv) {
                    kv["webkit-" + key] = kv[key];
		    kv["-moz-" + key]   = kv[key];
		    kv["-o-" + key]     = kv[key];
		    kv["-ms-" + key]    = kv[key];
		}
	    }
	    return this.conf(kv, opt, IDX_STYLE);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag attribute setter / getter
     *
     * @param kv  : (object/string) key-value object / key of attribute
     * @param val : (object) value of attribute
     * @return
     */
    attrs (k_kv, v_opt, opt) {
        try {
	    return this.conf(k_kv, v_opt, IDX_ATTRS, opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom property setter / getter
     * 
     * @param kv  : (object/string) key-value object / key of
     * @param val : (object)  value of property
     */
    props (k_kv, v_opt, opt) {
        try {
	    return this.conf(k_kv, v_opt, IDX_PROPS);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag class name setter / getter
     * 
     * @param name : (string) class name
     */
    class (prm, opt) {
        try {
	    if (undefined === prm) {
	        return this.conf((undefined === opt) ? undefined: "class", opt, IDX_CLASS);
	    }
	    this.conf(
	        ("string" === typeof prm) ? [prm] : prm, opt, IDX_CLASS
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * tag contents text setter / getter
     * 
     * @param cnt : (string) tag contents (option)
     * @return (string) tag contents
     */
    text (prm) {
        try {
	    let ret = this.confmng("text", prm);
            if ( (undefined !== prm) && (true === this.isPushed()) ) {
                this.getRawDom().innerHTML = prm;
	    }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * dom string getter
     *
     * @return (string) dom string
     */
    value () {
        try {
            let chd     = this.child();
            let chd_ret = '';
	    for(let cidx in chd) {
                chd_ret += chd[cidx].value();
            }
	    if (true === this.dummy()) {
                return chd_ret;
	    }
	    
            let ret = '<'+ this.tag() + ' ';
            /* set id attribute */
            ret += 'id="'+ this.id() +'" ';
            /* set dom config */
	    let cnf     = this.m_conf;
	    let cnf_val = null;
            for (var idx in cnf) {
                let cnf_val = cnf[idx].toString();
		if ("" !== cnf_val) {
                    ret += cnf_val + " ";
		}
            }
            ret += '>';
	    /* set tag contents */
            ret += this.text();
            /* check single */
            if (true === is_single(this.tag())) {
                return ret;
	    }
            /* set child value */
	    ret += chd_ret;
	    return ret + '</'+ this.tag() +'>';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * draw dom to target dom
     * 
     * @param (key-value) push option
     *     target   : push target object
     *     child    : child flag
     *     position : position of insertAdjacentHTML parameter
     */
    push (opt) {
        try {
            if (true === mofron.ssr) {
                return;
            } else if (undefined === opt) {
                throw new Error("invalid parameter");
	    }
            
	    if (true !== opt.child) {
                opt.target.insertAdjacentHTML(
		    (undefined === opt.position) ? 'beforeend' : opt.position,
		    this.value()
		);
            }
	    let props = this.props().get();
	    if (true === this.dummy()) {
	        this.m_rawdom = (null !== this.parent()) ? this.parent().getRawDom() : null;
            } else {
	        if (null !== this.parent()) {
                    this.m_rawdom = this.parent().getRawDom().querySelector("#" + this.id());
		} else {
                    this.m_rawdom = document.body.querySelector("#" + this.id());
		}
	    }
	    this.props(props);  // set property
            
	    /* notify push to children */
	    let chd = this.child();
            for (let cidx in chd) {
                chd[cidx].push({ target: this.m_rawdom, child: true });
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    
    /**
     * get adom status
     *
     * @return (boolean) true : this adom had pushed
     * @return (boolean) false : this adom had not pushed
     */
    isPushed () {
        try {
            return (null === this.m_rawdom) ? false : true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get pushed dom object from blowser
     *
     * @return (object) raw dom object
     */
    getRawDom () {
        try {
            if (false === this.isPushed()) {
                throw new Error('this dom is not pushed yet');
            }
            return this.m_rawdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    destroy () {
        try {
	    /* remove this object from parent dom */
            if (true === this.isPushed()) {
                this.getRawDom().remove();
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    dummy (prm) {
        try {
            return this.confmng("dummy", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}

let is_single = (prm) => {
    try {
        if ( ("br"    === prm) ||
             ("hr"    === prm) ||
             ("input" === prm) ||
             ("img"   === prm) ) {
            return true;
        }
	return false;
    } catch (e) {
        console.error(e.stack);
        throw e;
    }
}
/* end of file */
