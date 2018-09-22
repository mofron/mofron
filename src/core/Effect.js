/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.CompConf {
    
    constructor (po) {
        try {
            super();
            this.m_init = true;
            this.name('Effect');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execute (flg) {
        try {
            let _flg = (undefined === _flg) ? this.status() : flg;
            if ('boolean' !== typeof _flg) {
                throw new Error('invalid paramter');
            }
            
            if (true === this.m_init) {
                /* this is first execute */
                this.contents(this.defStatus(), this.component());
                this.m_init = false;
                return;
            }
            
            
            
            if (0 === this.speed()) {
               this.contents(_flg,  this.component());
            } else {
                /* init exec */
                this.setConf(true);
                
                setTimeout(
                    (eff) => {
                        try {
                            eff.contents(_flg, eff.component());
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }, 50, this
                );
            }
            
            setTimeout(
                (eff) => {
                    try {
                        if ( (0 < eff.speed()) &&
                             (eff.getId() === eff.component().effect()[0].getId()) ) {
                            eff.setConf(false);
                        }
                        if (null != eff.callback()) {
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
            var adom = this.component().adom();
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
    
    contents (flg, cmp) {
        try {
            if (true === flg) {
                this.enable(cmp);
            } else {
                this.disable(cmp);
            }
            this.status(flg);
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
                return (undefined === this.m_speed) ? 0 : this.m_speed;
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
            if (undefined === fnc) {
                /* getter */
                return (undefined === this.m_callback) ? null : this.m_callback;
            }
            /* setter */
            if ('function' !== typeof fnc) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_callback) {
                this.m_callback = new Array(null,null);
            }
            this.m_callback[0] = fnc;
            this.m_callback[1] = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
