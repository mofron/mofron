/**
 * @file event.js
 * @author simpart
 */

/**
 * @class mofron.event.Base
 * @brief base class of event
 */
mofron.Event = class extends mofron.CompConf {
    /**
     * initialize member
     *
     */
    constructor () {
        try {
            super();
            this.name('Event');
            this.m_effect  = new Array();
            this.m_handler = new Array();
            this.prmMap('handler');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set function for event listener
     *
     * @param fnc : (function) function for event listener
     * @param prm : (mixed) function parameter (option)
     */
    handler (fnc, prm) {
        try {
            if (undefined === fnc) {
                /* getter */
                return this.m_handler;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            this.m_handler.push([fnc, prm]);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execHandler () {
        try {
            let hdl = this.handler();
            for (let hidx in hdl) {
                if (0 === arguments.length) {
                    hdl[hidx][0](
                        this.component(),
                        hdl[hidx][1] 
                    );
                } else if (1 === arguments.length) {
                    hdl[hidx][0](
                        this.component(),
                        hdl[hidx][1],
                        arguments[0]
                    );
                } else if (2 === arguments.length) {
                    hdl[hidx][0](
                        this.component(),
                        hdl[hidx][1],
                        arguments[0],
                        arguments[1]
                    );
                } else if (3 === arguments.length) {
                    hdl[hidx][0](
                        this.component(),
                        hdl[hidx][1],
                        arguments[0],
                        arguments[1],
                        arguments[2]
                    );
                } else {
                    console.warn('too many arguments');
                    hdl[hidx][0](
                        this.component(),
                        hdl[hidx][1],
                        arguments[0],
                        arguments[1],
                        arguments[2],
                        arguments[3]
                    );
                }
            }
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute () {
        try {
            this.contents(this.component().eventTgt());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (prm) {
        try {
            let ret = super.component(prm);
            if (undefined === ret) { 
                let evt_eff = this.kickEffect();
                let cmp_eff = this.component().effect();
                let chk_eff = false;
                 
                for (let evt_idx in evt_eff) {
                    chk_eff = false;
                    for (let cmp_idx in cmp_eff) {
                        if (evt_eff[evt_idx].getId() === cmp_eff[cmp_idx].getId()) {
                            chk_eff = true;
                            break;
                        }
                    }
                    if (false === chk_eff) {
                        this.component().execOption({
                            effect : [ evt_eff[evt_idx] ]
                        });
                    }
                    evt_eff[evt_idx].defStatus(false);
                }
                let thisevt = this;
                this.handler(
                    (p1,p2,p3,p4,p5) => {
                        try {
                            thisevt.execEffect(
                                thisevt.kickEffect(),
                                [p1,p2,p3,p4,p5]
                            );
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                );
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    kickEffect (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return this.m_effect;
            }
            /* setter */
            if (true === Array.isArray(prm)) {
                for (let pidx in prm) {
                    this.kickEffect(prm[pidx]);
                }
                return;
            }
            if (true !== mofron.func.isInclude(prm, 'Effect')) {
                throw new Error('invalid parameter');
            }
            this.m_effect.push(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execEffect (eff, prm) {
        try {
            for (let eidx in eff) {
                eff[eidx].execute(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
