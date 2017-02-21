/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.Base {
    
    constructor (prm) {
        try {
            super();
            this.name('Effect');
            
            this.m_target = null;
            this.m_speed  = 0;
            this.m_cb     = new Array(
                                null,  /* function */
                                null   /* parameter */
                            );
            
            this.prmOpt(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                return this.m_target;
            }
            /* setter */
            if ('object' != (typeof tgt)) {
                throw new Error('invalid parameter');
            }
            this.m_target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (flg) {
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
                if (false ===  this.target().isRendered()) {
                    throw new Error('target is not ready');
                }
                /* set initial style */
                if (true === _flg) {
                    this.disable(this.target());
                } else {
                    this.enable(this.target());
                }
                
                this.setConf(true);
                
                setTimeout(
                    function (eff,flg) {
                        try {
                            if (true === flg) {
                                eff.enable(eff.target());
                            } else {
                                eff.disable(eff.target());
                            }
                            //eff.setConf(false);
                        } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    },
                    200,
                    this,
                    flg
                );
            }
            
            setTimeout(
                function (eff) {
                    try {
                        if (null != eff.callback()[0]) {
                            eff.callback()[0](eff.callback()[1]);
                        }
                        eff.setConf(false);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                (1000 * this.speed()-200),
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
                vdom.style('-webkit-transition', ((1000 * this.speed()) - 200) + 'ms all linear 0s');
                vdom.style('-moz-transition'   , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                vdom.style('-ms-transition'    , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                vdom.style('-o-transition'     , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                vdom.style('transtion'         , ((1000 * this.speed()) - 200) + 'ms all linear 0s');
            } else {
                vdom.style('-webkit-transition', null);
                vdom.style('-moz-transition'   , null);
                vdom.style('-ms-transition'    , null);
                vdom.style('-o-transition'     , null);
                vdom.style('transtion'         , null);
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
                return this.m_speed;
            }
            if ('number' != (typeof spd)) {
                throw new Error('invalid parameter');
            }
            if (spd < 0.5) {
                this.m_speed = 0;
            } else {
                this.m_speed = spd;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    callback (cbf, cbp) {
        try {
            if (undefined === cbf) {
                /* getter */
                return this.m_cb;
            }
            /* setter */
            if ('function' != (typeof cbf)) {
                throw new Error('invalid parameter');
            }
            this.m_cb[0] = cbf;
            
            if (null != cbp) {
                this.m_cb[1] = cbp;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
