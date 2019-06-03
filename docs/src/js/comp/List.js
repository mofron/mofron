/**
 * @file  mofron-comp-list/index.js
 * @brief list component for mofron
 * @author simpart
 */
const mf   = require('mofron');
const Text = require("mofron-comp-text");

/**
 * @class SpeakerDeck
 */
mf.comp.List = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('List');
            this.prmMap('list');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @note private method
     */
    initDomConts () {
        try {
            this.adom().addChild(new mofron.Dom('ul',this));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    list (prm) {
        try {
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.list(prm[pidx]);
                }
                return;
            }
            
            let add_li  = new mofron.Dom('li',this);
            let buf_tgt = this.target();
            this.target().addChild(add_li);
            this.target(add_li);
            if ("string" === typeof prm) {
                this.child(new Text(prm));
            } else if (true === mf.func.isComp(prm)) {
                this.child(prm);
            }
            this.target(buf_tgt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.List;
/* end of file */
