/**
 * @file Window.js
 * @brief mofron window class
 */
const Base = require("./Base.js");
const comutl = require("./../util/common.js");

module.exports = class extends mofron.class.Component {
    
    constructor () {
        try {
            super();
            this.modname('Document');
	    this.confmng().add("event", { type: "Event", list: true });
	    this.confmng().add("styleDom",   { type: "Dom", private: true });
            

	    let dom = new mofron.class.Dom();
	    dom.m_rawdom = document.body;
            
	    this.confmng("rootDom", dom);
	    this.confmng("styleDom", dom);

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getRawDom () {
        return document;
    }
    
    style (kv) {
        try {
            return this.styleDom().style(kv);
	} catch (e) {
            console.error(e.stack);
            throw e;
        } 
    }

    event (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.confmng("event");
            }
            /* setter */
            this.confmng("event", prm);
            //prm.component(this);
            prm.contents(this);
            prm.isInited(true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
