/**
 * @file CompTree.js
 * @brief tree manager for component
 * @license MIT
 */
const Tree   = require("./Tree.js");
const comutl = mofron.util.common;
const cmputl = mofron.util.component;

module.exports = class extends Tree {
    
    addChild (chd, idx) {
        try {
            if (true === Array.isArray(chd)) {
	        /* parameter check */
                for (let cidx in chd) {
		    this.addChild(chd[cidx], idx);
                }
                return;
	    }
            /* set parent-child relation in dom layer */
            let rdom = chd.rootDom();
            if (undefined === idx) {
                this.target().childDom().child(rdom);
	    } else {
	        let tgt_tree = this.target().childDom().getTree();
                let t_idx    = tgt_tree.getIndex(this.target().child()[idx].rootDom()[0]);
                tgt_tree.addChild(rdom, t_idx);
	    }
            
	    /* set parent-child relation in component layer */
	    super.addChild(chd, idx);
            
            /* check render */
            if (true === this.target().isExists()) {
		/* parent layout */
                lo = this.target().layout();
		for(let lidx2 in lo) {
                    lo[lidx2].execute();
		}

		/* theme */
                cmputl.theme(chd, this.target().theme());
		cmputl.theme(chd, cmputl.follow_theme(this.target()));

	        /* render child */
		cmputl.render(chd);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    replace (o_chd, n_chd) {
        try {
            if (this.target().childDom().id() === o_chd.childDom().id()) {
                /* old child is dom target, replace dom target */
                this.target().childDom(n_chd.childDom());
	    }
	    /* set parent-child relation in component layer */
	    this.getChild().splice(this.getIndex(o_chd), 0 , n_chd)
	    n_chd.parent(this.target());
            
            /* set parent-child relation in dom layer */
	    let tgt_tree = o_chd.rootDom()[0].parent().getTree();
            let rep_idx  = tgt_tree.getIndex(o_chd.rootDom()[0]);
            let n_rdom   = n_chd.rootDom();
            for (let ridx in n_rdom) {
                tgt_tree.getChild().splice(rep_idx+(parseInt(ridx)), 0, n_rdom[ridx]);
		n_rdom[ridx].parent(this.target().childDom());
	    }

	    if (true === o_chd.isExists()) {
	        cmputl.render(n_chd);
		cmputl.initmconf(n_chd.parent(), "layout");
	    }
            
	    o_chd.destroy()
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    delChild (chd) {
        try {
	    /* release relational in dom layer */
	    let rdom = chd.rootDom();
	    for (let ridx in rdom) {
	        if (null !== rdom[ridx].parent()) {
                    rdom[ridx].parent().getTree().delChild(rdom[ridx]);
		}
	    }
            /* delete child component */
            super.delChild(chd);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
