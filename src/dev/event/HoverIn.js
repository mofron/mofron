/**
 * @file Click.js
 */
mofron.event.HoverIn = class extends mofron.event.Base {
    
    event () {
        try {
            var cbf = this.cb_func;
            var cbp = this.cb_parm;
            
            $(this.tgt_obj.getTarget()).hover(function() {
                try {
                    cbf(cbp);
                } catch (e) {
                    console.error(e.stack);
                }
            },null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
