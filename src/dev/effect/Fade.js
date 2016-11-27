
module.exports = class extends mofron.effect.Base {
    constructor (tgt, spd) {
        try {
            super(tgt, spd);
            this.exec = false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect_func (flg, vd) {
        try {
            if (false === this.exec) {
                vd.setStyle('-webkit-transition', this.speed + 's all linear 0s');
                vd.setStyle('-moz-transition'   , 'all ' + this.speed + 's');
                vd.setStyle('-ms-transition'    , 'all ' + this.speed + 's');
                vd.setStyle('-o-transition'     , 'all ' + this.speed + 's');
                vd.setStyle('transtion'         , this.speed + 's all linear 0s');
                
                if (true === flg) {
                    vd.setStyle('opacity', '0');
                } else {
                    vd.setStyle('opacity', '1');
                }
            }
            
            var disp = vd.getStyle('display');
            if ('none' == disp) {
                vd.setStyle('display', null);
            }
            
            setTimeout(
                function(prm) {
                    if (true === prm[1]) {
                        prm[0].setStyle('opacity', '1');
                    } else {
                        prm[0].setStyle('opacity', '0');
                    }
                },
                200,
                [vd,flg]
            );
            //if (true === flg) {
            //    vd.setStyle('opacity', '1');
            //} else {
            //    vd.setStyle('opacity', '0');
            //}
            
            //var tgt_dom = document.querySelector('#' + this.target.getVdom().getId());
            //if (true === flg) {
            //    tgt_dom.classList.add('mofron-effect-fadein');
            //    tgt_dom.classList.remove('mofron-effect-fadeout');
            //} else {
            //    tgt_dom.classList.remove('mofron-effect-fadein');
            //    tgt_dom.classList.add('mofron-effect-fadeout');
            //}
            
            
            this.exec = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getStyleTag () {
        try {
            var ret_val = '<style>';
            
            ret_val    += '.mofron-effect-fadein {';
            ret_val    +=     'opacity:1;';
            ret_val    += '}';
            
            ret_val    += '.mofron-effect-fadeout {';
            ret_val    +=     'opacity:0;';
            ret_val    += '}';
            
            ret_val    += '</style>';
            return ret_val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}

mofron.effect.fade_exec = false;
