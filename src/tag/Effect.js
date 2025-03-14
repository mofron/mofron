/**
 * @file Effect.js
 */
const ModConf = require("../core/ModConf.js");
const cmputl  = mofron.util.component;
const comutl  = mofron.util.common;
const effutl  = mofron.util.effect;

module.exports = class extends ModConf {
    
    constructor (po) {
        try {
            super();
            this.modname('Effect');
            
	    this.confmng().add("callback",    { type: "event", list: true, private:true});
            this.confmng().add("otCallback",  { type: "event", list: true, private:true });
	    this.confmng().add("beforeEvent", { type: "event", list: true, private:true });
            this.confmng().add("order",  { type: "number", init: 0 });
            this.confmng().add("eid",    { type: "number", init: -1 });
	    this.confmng().add("speed",  { type: "number", init: 0 });
            this.confmng().add("delay",  { type: "number", init: 0 });
	    this.confmng().add(
	        "timing", { type: "string", init: "linear", select: ["ease","linear","ease-in","ease-out","ease-in-out"] }
            );
	    this.confmng().add("cubic",  { type: "array" });
            this.confmng().add("transition", { type: "string", list: true })
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * execute effect
     * 
     * @param p2 (function) simple call back
     */
    execute () {
        try {
            if (true === this.isSkipped(this.eid(), this.order())) {
                return;
            }
            
	    let trans = false;
            if ( (0 < this.speed()) &&
	         (null === this.component().style("transition")) ) {
		/* direct called execute() function  */
		effutl.transition([this]);
                trans = true;
		this.otCallback(
		    (ts1,ts2,ts3) => {
                        try {
			    /* release transition */
                            cmputl.rstyle(this.component(), { 'transition' : null }, { bpref: true });
                            this.component().styleDom().style({ 'transition' : null }, { bpref: true });
			} catch (e) {
                            console.error(e.stack);
                            throw e;
			}
		    },
		    this
		);
	    }
            
            /* execute effect */
            let exec = (exe_eff) => {
                try {
		    if (0 !== exe_eff.delay()) {
                        setTimeout(
			    () => { exe_eff.contents(exe_eff.component()); },
                            exe_eff.delay()
			);
		    } else {
                        exe_eff.contents(exe_eff.component());
                    }
                    exe_eff.isInited(true);
                    setTimeout(exe_eff.exeCallback, exe_eff.speed() + exe_eff.delay(), exe_eff);
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
	    exec(this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    fexec () {
        try {
            let sus = this.suspend();
            this.suspend(false);
            this.execute();
            this.suspend(sus);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contents (eid, cmp) {}

    transition (prm) {
        try {
            return this.confmng("transition", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    beforeEvent (fnc, prm) {
        try {
	    return this.confmng(
	        "beforeEvent", (undefined === fnc) ? undefined : [fnc,prm]
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    otCallback (fnc, prm) {
        try {
            let ret = this.confmng(
	                  "otCallback", (undefined === fnc) ? undefined : [fnc,prm]
                      );
	    if (undefined !== ret) {
	        this.confmng().delete("otCallback");
                return ret;
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    /**
     * @param p1 (array) [function, param, one time flag]
     */
    callback (fnc, prm) {
        try {
	    return this.confmng(
	        "callback", (undefined === fnc) ? undefined : [fnc,prm]
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    exeCallback (eff) {
        try {
            /* execute callback */
            let cb = eff.callback();
            for (let cidx1 in cb) {
                cb[cidx1][0](eff, eff.component(), cb[cidx1][1]);
            }
            let ocb = eff.otCallback();
            for (let cidx2 in ocb) {
                ocb[cidx2][0](eff, eff.component(), ocb[cidx2][1]);
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSkipped (eid, ord) {
        try {
            if ( (true === this.suspend()) ||
                 (eid !== this.eid()) || 
                 (ord !== this.order()) ) {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    /**
     * execute order number setter/getter
     *
     * @param p1 (number) execute order number
     * @param p1 (undefined) call as getter
     * @return (number) execute order number
     */
    order (prm) {
        try {
	    return this.confmng("order", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    eid (prm) {
        try {
	    return this.confmng("eid", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** default execute config ***/
    /**
     * effect speed setter/getter
     *
     * @param p1 (number) effect speed
     * @param p1 (undefined) call as getter
     * @return (number) effect speed
     */
    speed (prm) {
        try {
	    return this.confmng("speed", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    delay (prm) {
        try {
	    return this.confmng("delay", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    timing (prm) {
        try {
            return this.confmng("timing", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    cubicBezier (p1,p2,p3,p4) {
        try {
            if (undefined === p1) {
                return this.confmng("cubic");
	    }
	    if ( ("number" !== typeof p1) ||
	         ("number" !== typeof p2) ||
		 ("number" !== typeof p3) ||
		 ("number" !== typeof p4) ) {
                throw new Error("invalid parameter");
	    }
	    this.confmng("cubic", [p1,p2,p3,p4]);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    confmng (key, val, opt) {
        try {
            let ret = super.confmng(key, val, opt);
	    /* check auto apply */
            if ( (true === super.confmng().options('auto-apply')) &&
	         (undefined !== val) &&
	         (null !== this.component()) &&
		 (true === this.component().isExists()) ) {
                this.contents(this.component());
            }
            return ret;
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

}
/* end of file */
