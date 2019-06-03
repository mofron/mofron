/**
 * @file  mofron-comp-list/index.js
 * @brief list component for mofron
 * @author simpart
 */
const mf      = require('mofron');
const PreText = require("mofron-comp-pretext");

/**
 * @class SpeakerDeck
 */
mf.comp.TagText = class extends PreText {
    
    constructor (po) {
        try {
            super();
            this.name('TagText');
            this.prmMap('text');
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
            super.initDomConts();
            this.mainColor([[50,50,50],{forced:true, locked:true}]);
            this.size("0.2rem");
            this.style(
                { margin: "0rem" },
                {forced:true, locked:true}
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    indentConf (prm) {
        try {
            let ret = this.member("indent", "number", prm, 0);
            if (undefined === prm) {
                return ret;
            }
            let add_sp = "";
            for (let i=0;i < prm;i++) {
                add_sp += "&ensp;&ensp;";
            }
            this.text(add_sp + this.text());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    comment () {
        try {
            this.style({ "font-style": "oblique" });
            this.mainColor([[150,150,150],{forced:true, locked:true}]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    text (prm) {
        try {
            if (undefined === prm) {
                return super.text();
            }
            let add_sp = "";
            for (let i=0;i < this.indentConf();i++) {
                add_sp += "&ensp;&ensp;";
            }
            return super.text(add_sp + prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.TagText;
/* end of file */
