/**
 * @file effect/Base.js
 */
module.exports = class {
    constructor (tgt,spd) {
        try {
            var _tgt    = (tgt === undefined) ? null : tgt;
            this.target = null;
            if (null != _tgt) {
                this.setTarget(_tgt);
            }
            
            var _spd    = (spd === undefined) ? null : spd;
            this.speed  = 0.5;
            if (null != _spd) {
                this.setSpeed(_spd);
            }
            
            this.callback = new Array(null,null);
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
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (flg) {
        try {
            var _flg = (flg === undefined) ? true : flg;
            var dom  = this.target.getVdom();
            if (false ===  dom.isPushed()) {
                throw new Error('target is not ready');
            }
            this.effect_func(_flg,dom);
            
            if (null != this.callback[0]) {
                setTimeout(
                    this.callback[0],
                    (1000 * this.speed),
                    this.callback[1]
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect_func (flg, vd) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSpeed (spd) {
        try {
            if ('number' != (typeof spd)) {
                throw new Error('invalid parameter');
            }
            this.speed = spd;
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
