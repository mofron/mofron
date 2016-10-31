/**
 * @file Style.js
 */
mofron.other.Styles = class {
    constructor (to, es) {
        try {
            var _es = es || '';
            if ( ('object' != (typeof to)) ||
                 ('string' != (typeof _es)) ) {
                throw new Error('invalid parameter');
            }
            
            this.style_buff = new Array();
            this.tgt_obj    = to;
            this.tgt_obj.style.push(this);
            this.ext_sel    = _es;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    style (key, val) {
        try {
            if ('string' != (typeof key)) {
                throw new Error('invalid parameter');
            }
            var set_flg = false;
            if (true === this.tgt_obj.init_flg) {
                $('#' + this.tgt_obj.getId() + this.ext_sel).css(
                    key, val
                );
                set_flg = true;
            }
            this.style_buff.push(new Array(key, val, set_flg));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setStyle () {
        try {
            //var _ext_sel = ext_sel || '';
            var _ext_sel = '';
            for (var idx in this.style_buff) {
                if (false === this.style_buff[idx][2]) {
console.log('set style : ' + '#' + this.tgt_obj.getId() + this.ext_sel);
                    
                    $('#' + this.tgt_obj.getId() + this.ext_sel).css(
                        this.style_buff[idx][0],
                        this.style_buff[idx][1]
                    );
                    this.style_buff[idx][2] = true;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
