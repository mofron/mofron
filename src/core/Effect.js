/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.CompConf {
    
    constructor (po) {
        try {
            super(po);
            this.name('Effect');
            this.m_cb = new Array(
                            null,  /* function */
                            null   /* parameter */
                        );
            this.execOption(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute (flg) {
        try {
            var _flg = (flg === undefined) ? true : flg;
            if ('boolean' !== typeof _flg) {
                throw new Error('invalid paramter');
            }
            
            if (0 === this.speed()) {
               if (true === _flg) {
                   this.enable(this.target());
               } else {
                   this.disable(this.target());
               }
            } else {
                /* init exec */
                if (true === _flg) {
                    this.disable(this.target());
                } else {
                    this.enable(this.target());
                }
                
                this.setConf(true);
                
                setTimeout(
                    (eff) => {
                        try {
                            if (true === _flg) {
                                eff.enable(eff.target());
                            } else {
                                eff.disable(eff.target());
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }, 200, this
                );
            }
            
            var cb_time = (0 > (1000 * this.speed()-200)) ? 0 : (1000 * this.speed()-200);
            setTimeout(
                (eff) => {
                    try {
                        if (null != eff.callback()[0]) {
                            eff.callback()[0](eff.callback()[1]);
                        }
                        if (0 < eff.speed()) {
                            eff.setConf(false);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                cb_time,
                this
            );
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setConf (en) {
        try {
            if ('boolean' !== typeof en) {
                throw new Error('invalid paramter');
            }
            
            var vdom = this.target().vdom();
            if (true === en) {
                vdom.style({
                    '-webkit-transition' : ((1000 * this.speed()) - 200) + 'ms all linear 0s',
                    '-moz-transition'    : 'all ' + ((1000 * this.speed()) - 200) + 'ms',
                    '-ms-transition'     : 'all ' + ((1000 * this.speed()) - 200) + 'ms',
                    '-o-transition'      : 'all ' + ((1000 * this.speed()) - 200) + 'ms',
                    'transtion'          : ((1000 * this.speed()) - 200) + 'ms all linear 0s'
                });
            } else {
                vdom.style({
                    '-webkit-transition' : null,
                    '-moz-transition'    : null,
                    '-ms-transition'     : null,
                    '-o-transition'      : null,
                    'transtion'          : null
                });
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (tgt) {
        console.warn('not implement');
    }
    
    disable (tgt) {
        console.warn('not implement');
    }
    
    speed (spd) {
        try {
            if (undefined === spd) {
                /* getter */
                return (undefined === this.m_speed) ? 0 : this.m_speed;
            }
            /* setter */
            if ('number' != (typeof spd)) {
                throw new Error('invalid parameter');
            }
            this.m_speed = (spd < 0.5) ? 0 : spd;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    callback (fnc, prm) {
        try {
            return this.confFunc(fnc, prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
