/**
 * @file  mofron-comp-speakerdeck/index.js
 * @brief embeded speakerdeck slide component for mofron
 * @author simpart
 */
const mf       = require('mofron');
const Text     = require("mofron-comp-text");
const Click    = require("mofron-event-click");

/**
 * @class SpeakerDeck
 */
mf.comp.SpeakerDeck = class extends mf.Component {
    
    constructor (po) {
        try {
            super();
            this.name('SpeakerDeck');
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
    //initDomConts () {
    //    try {
    //    } catch (e) {
    //        console.error(e.stack);
    //        throw e;
    //    }
    //}
    
    text (txt) {
        try {
            console.log(txt);
            let scp      = new mf.Dom('script', this);
            let sp_txt   = txt.split(' ');
            let set_attr = { async: "" };
            for (let sp_idx in sp_txt) {
                let buf = sp_txt[sp_idx].split('=');
                set_attr[buf[0]] = buf[1].substring(1, buf[1].length-1);
                //console.log(buf);
            }
            scp.attr(set_attr);
            
            this.target().addChild(scp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.SpeakerDeck;
/* end of file */
