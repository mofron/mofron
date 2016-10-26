
mofron.effect.Base = class {
    constructor (to) {
        try {
            this.tgt_obj = to;
            this.speed   = 200;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (flg) {
        try {
            throw new Error('not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSpeed (spd) {
        try {
            this.speed = spd;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
