/**
 * @file Window.js
 * @brief mofron window class
 */
//const Base   = require("./Base.js");
//const Component = require("../tag/Component.js");
const comutl = require("./../util/common.js");

module.exports = class extends mofron.class.Component {
    
    constructor () {
        try {
            super();
            this.modname('Window');
            
            this.confmng().add("landscapeEvent", { type: "event", list: true });
            this.confmng().add("portraitEvent", { type: "event", list: true });
	    //this.confmng().add("event", { type: "Event", list: true });

	    this.initOrientation();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isPortrait () {
        try {
            return (window.innerHeight > window.innerWidth) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isLandscape() {
        try {
            return (window.innerHeight < window.innerWidth) ? true : false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    resizeEvent (func, prm, tlag) {
        try {
            let que_buf = null;
            let param   = prm;
            let time_lag = (undefined === tlag) ? 200 : tlag;
            if ( ('function' !== typeof func) ||
                 ('number'   !== typeof time_lag) ) {
                throw new Error('invalid parameter');
            }
            window.addEventListener(
                'resize',
                () => {
                    try {
                        clearTimeout(que_buf);
                        que_buf = setTimeout(func, time_lag, param);
                    } catch (e) {
                        console.error(e.stack);
                        throw new Error();
                    }
                },
                false
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initOrientation () {
        try {
            if ( (undefined !== screen.orientation) &&
                 (null      === screen.orientation.onchange) ) {
                screen.orientation.onchange = this.orientationHandler.bind(this);
            } else if (null === screen.onmozorientationchange) {
                screen.onmozorientationchange = this.orientationHandler.bind(this);
            } else if (null === screen.onmsorientationchange) {
                screen.onmsorientationchange = this.orientationHandler.bind(this);
            } else {
                window.addEventListener("orientationchange", this.orientationHandler.bind(this));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    orientationHandler (evt) {
        try {
	    let ef = null;
            if ( ("landscape-primary"   === screen.mozOrientation)   ||
                 ("landscape-secondary" === screen.mozOrientation)   ||
		 ("landscape-primary"   === screen.orientation.type) ||
		 ("landscape-secondary" === screen.orientation.type) ) {
                /* landscape event */
		if ("function" === typeof this["landscapeEvent"]) {
                    evt_fnc = this.landscapeEvent();
		}
            } else if ( ("portrait-primary"   === screen.mozOrientation)   ||
                        ("portrait-secondary" === screen.mozOrientation)   ||
                        ("portrait-primary"   === screen.orientation.type) ||
                        ("portrait-secondary" === screen.orientation.type) ) {
                /* vertical event */
		if ("function" === typeof this["portraitEvent"]) {
                    evt_fnc = this.portraitEvent();
		}
            } else {
                if (window.innerHeight < window.innerWidth) {
                    /* landscape event */
		    if ("function" === typeof this["landscapeEvent"]) {
		        evt_fnc = this.landscapeEvent();
		    }
                } else {
                    /* portrait event */
		    if ("function" === typeof this["portraitEvent"]) {
		        evt_fnc = this.portraitEvent();
		    }
                }
            }
            for (let eidx in evt_fnc) {
                evt_fnc[eidx][0](this, evt, evt_fnc[eidx][1]);
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    landscapeEvent (fnc, prm) {
        try {
	    if (undefined === fnc) {
                return this.confmng("landscapeEvent");
	    }
            this.confmng("landscapeEvent", [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    portraitEvent (fnc, prm) {
        try {
	    if (undefined === fnc) {
                return this.confmng("portraitEvent");
	    }
            this.confmng("portraitEvent", [fnc,prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }       
    }
    
    eventDom () {
        return this;
    }

    getRawDom () {
        return window;
    }

    event (prm) {
        try {
	    let ret = super.event(prm);
	    if (undefined === prm) {
                return ret;
	    }
	    if (true === comutl.isinc(prm,"Event")) {
                prm.execute();
            } else if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    prm[pidx].execute();
		}
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

}
/* end of file */
