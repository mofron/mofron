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
            this.execOption();
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
                   this.status(true);
               } else {
                   this.disable(this.target());
                   this.status(false);
               }
            } else {
                /* init exec */
                if (true === _flg) {
                    this.disable(this.target());
                    this.status(false);
                } else {
                    this.enable(this.target());
                    this.status(true);
                }
                
                this.setConf(true);
                
                setTimeout(
                    (eff) => {
                        try {
                            if (true === _flg) {
                                eff.enable(eff.target());
                                eff.status(true);
                            } else {
                                eff.disable(eff.target());
                                eff.status(false);
                            }
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }, 200, this
                );
            }
            
            setTimeout(
                (eff) => {
                    try {
                        if ( (0 < eff.speed()) &&
                             (eff.getId() === eff.target().effect()[0].getId()) ) {
                            eff.setConf(false);
                        }
                        if (null != eff.callback()[0]) {
                            eff.callback()[0](eff.callback()[1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                this.speed() * 1000,
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
            
            var adom = this.target().adom();
            if (true === en) {
                adom.style({
                    '-webkit-transition' : ((1000 * this.speed())) + 'ms all linear 0s',
                    '-moz-transition'    : 'all ' + ((1000 * this.speed())) + 'ms',
                    '-ms-transition'     : 'all ' + ((1000 * this.speed())) + 'ms',
                    '-o-transition'      : 'all ' + ((1000 * this.speed())) + 'ms',
                    'transtion'          : ((1000 * this.speed())) + 'ms all linear 0s'
                });
            } else {
                adom.style({
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
    
    status (sts) {
        try {
            if (undefined === sts) {
                /* getter */
                return (undefined === this.m_sts) ? false : this.m_sts;
            }
            /* setter */
            if ('boolean' !== typeof sts) {
                throw new Error('invalid parameter');
            }
            this.m_sts = sts;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    defStatus (sts) {
        try {
            if (undefined === sts) {
                /* getter */
                return (undefined === this.m_defsts) ? true : this.m_defsts;
            }
            /* setter */
            if ('boolean' !== typeof sts) {
                throw new Error('invalid parameter');
            }
            this.m_defsts = sts;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    speed (spd) {
        try {
            if (undefined === spd) {
                /* getter */
                return this.m_speed;
            }
            /* setter */
            if ('number' != (typeof spd)) {
                throw new Error('invalid parameter');
            }
            this.m_speed = spd;
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
