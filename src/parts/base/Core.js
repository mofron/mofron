/**
 * @file   Component.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */

mofron.parts.Core = class {
    constructor () {
        this.id     = null;
        this.parent = null;
        this.child  = new Array();
        this.event  = null;
        
    }
    
    
    /*** method ***/
    /**
     * get parts id
     * 
     * @return (string) id
     */
    getId () {
        if (null != this.id) {
            return this.id;
        }
        var ret_id = ""; 
        var loop   = 0; 
        var val    = 0;
        for (loop=0; loop < 32 ;loop++) {
            val = Math.random() * 16 | 0;
            if ((loop === 8)  ||
                (loop === 12) ||
                (loop === 16) ||
                (loop === 20)) {
                ret_id += "-";
            }
                ret_id += (loop == 12 ? 4 : (loop == 16 ? (val & 3 | 8) : val)).toString(16);
        }
        this.id = ret_id;
        return ret_id;
    }
    
    addEvents(evt) {
        
    }
    
    init () {
        var tgt = null;
        if (null === this.parent) {
            tgt = 'body';
        } else {
            tgt = '#' + this.parent.getId();
        }
        $(tgt).append('<div id="'+ this.getId() +'"></div>');
    }
}
/* end of file */
