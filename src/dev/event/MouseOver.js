/**
 * @file HoverOut.js
 */
module.exports = class extends mofron.event.Base {
    
    event () {
        try {
            var cbf = this.cb_func;
            var cbp = this.cb_parm;
            
            if (false === this.target.isPushed()) {
                throw new Error('target is not ready');
            }
            var tgt_dom = document.querySelector('#'+ this.target.getId());
            tgt_dom.addEventListener('mouseover',function() {
                try {
                    if (null != cbf) {
                        cbf(cbp);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            },false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
