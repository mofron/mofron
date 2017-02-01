/**
 * @file effect/Base.js
 */

mofron.effect.Base = class {
    
    constructor (prm) {
        try {
            this.param    = (undefined === prm) ? null : prm;
            this.target   = null;
            this.tgt_vd   = null;
            this.m_speed  = 0;
            this.v_flg    = false;
            this.exec     = false;
            this.callback = new Array(null,null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setVisible (flg) {
        try {
            if ('boolean' !== typeof flg) {
                throw new Error('invalid parameter');
            }
            this.v_flg = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget (tgt) {
        try {
            if ('object' != (typeof tgt)) {
                throw new Error('invalid parameter');
            }
            this.target = tgt;
            this.tgt_vd = tgt.vdom();
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
                if (false ===  this.target.isRendered()) {
                    throw new Error('target is not ready');
                }
                if (false === this.exec) {
                    this.exec = true;
                    this.initEffect(_flg, this)
                    this.tgt_vd.style('-webkit-transition',          ((1000 * this.speed()) - 200) + 'ms all linear 0s');
                    this.tgt_vd.style('-moz-transition'   , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                    this.tgt_vd.style('-ms-transition'    , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                    this.tgt_vd.style('-o-transition'     , 'all ' + ((1000 * this.speed()) - 200) + 'ms');
                    this.tgt_vd.style('transtion'         ,          ((1000 * this.speed()) - 200) + 'ms all linear 0s');
                }
                
                setTimeout(
                    this.effectConts,
                    200,
                    _flg,
                    this
                );
            }
            
            if (null != this.callback[0]) {
                setTimeout(
                    this.callback[0],
                    (1000 * this.speed()-200),
                    this.callback[1]
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
            this.callback[0] = cbf;
            
            if (null != _cbp) {
                this.callback[1] = _cbp;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
