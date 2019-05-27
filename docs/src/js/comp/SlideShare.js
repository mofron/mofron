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
    
    src (prm) {
        try { this.target().attr({ src : prm }); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    width (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return super.width();
            }
            /* setter */
            super.width(prm + "px");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    height (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return super.height();
            }
            /* setter */
            super.height(prm + "px");
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    frameborder (prm) { 
        try { this.target().attr({ frameborder : prm }); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    marginwidth (prm) {
        try { this.target().attr({ marginwidth : prm }); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    marginheight (prm) {
        try { this.target().attr({ marginheight : prm }); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    scrolling (prm) {
        try { this.target().attr({ scrolling : prm }); } catch (e) {
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
            let ifr = new mf.Dom('iframe', this);
            ifr.attr({ allowfullscreen: "" });
            this.adom().addChild(ifr);
            this.target(ifr);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mf.comp.SpeakerDeck;
/* end of file */
