/**
 * @file effect/Base.js
 */

mofron.Effect = class extends mofron.Base {
    
    constructor (prm, vis) {
        try {
            super();
            this.name('Effect');
            
            this.m_target = null;
            this.m_speed  = 0;
            this.m_vis    = (undefined === vis) ? false : vis;
            this.m_exec   = false;
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
            
            if (0 === this.speed()) {
                this.effectConts(_flg, this);
            } else {
                if (false ===  this.target().isRendered()) {
                    throw new Error('target is not ready');
                }
                if (false === this.exec) {
                    this.exec = true;
                    this.initEffect(_flg, this);
                    var vdom = this.target().vdom();
                    vdom.style('-webkit-transition', ((1000 * this.speed()) - 200) + 'ms all linear 0s');
                    vdom.style('-moz-transition'   , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                    vdom.style('-ms-transition'    , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                    vdom.style('-o-transition'     , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                    vdom.style('transtion'         , ((1000 * this.speed()) - 200) + 'ms all linear 0s');
                }
                
                setTimeout(
                    this.effectConts,
                    200,
                    _flg,
                    this
                );
            }
            
            if (null != this.m_cb[0]) {
                setTimeout(
                    this.m_cb[0],
                    (1000 * this.speed()-200),
                    this.m_cb[1]
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initEffect (flg) {}
    effectConts (flg) {}
    
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
    
    setCallback (cbf, cbp) {
        try {
            var _cbp = (cbp === undefined) ? null : cbp;
            if ('function' != (typeof cbf)) {
                throw new Error('invalid parameter');
            }
            this.m_cb[0] = cbf;
            
            if (null != _cbp) {
                this.m_cb[1] = _cbp;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
