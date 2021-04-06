/**
 * @file Window.js
 * @brief mofron window class
 */
const Base = require("./Base.js");
const comutl = require("./../util/common.js");

module.exports = class extends Base {
    
    constructor () {
        try {
            super();
            this.modname('Document');
	    this.confmng().add("event", { type: "Event", list: true });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getRawDom () {
        return document;
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
