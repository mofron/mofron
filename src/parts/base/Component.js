/**
 * @file   Component.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */

mofron.parts.Component = class {
    constructor () {
        try {
            this.id       = null;
            this.parent   = null;
            this.child    = new Array();
            this.event    = null;
            this.layout   = null;
            this.effect   = null;
            this.style    = new mofron.other.Style(this.getTarget());
            this.theme    = mofron.theme;
            this.init_flg = false;
        } catch (e) {
            throw new Error(e.stack);
        }
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
    
    getTarget() {
        return '#' + this.getId();
    }
    
    addChild(chd,disp) {
        try {
            chd.parent = this;
            this.child.push(chd);
            if (true === this.init_flg) {
                if (null !== this.layout) {
                    this.layout.layout(chd,disp);
                } else {
                    chd.init(disp);
                }
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    addEvents(evt) {
        
    }
    
    setLayout (lo) {
        try {
            this.layout = lo;
            this.layout.setTgtParts(this);
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    init (disp) {
        try {
            var _disp = disp || false;
            var tgt   = null;
            if (null === this.parent) {
                tgt = 'body';
            } else {
                tgt = this.parent.getTarget();
            }
            if (false === _disp) {
                $(tgt).append('<div id="'+ this.getId() +'" style="display:none;"></div>');
            } else if (true === _disp) {
                $(tgt).append('<div id="'+ this.getId() +'"></div>');
            } else {
                throw new Error('invalid parameter');
            }
            
            this.initChild(disp);
            this.style.setStyle();
            this.init_flg = true;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    initChild(disp) {
        for(var idx in this.child) {
            if (null !== this.layout) {
                //this.child[idx].init(false);
                this.layout.layout(this.child[idx],disp);
                //this.child[idx].visible(disp);
            } else {
                this.child[idx].init(disp);
            }
        }
    }
    
    visible (flg, eff) {
        try  {
            var p_eff = eff || null;
            
            if ('boolean' != (typeof flg)) {
                throw new Error('invalid parameter');
            }
            
            if (null != p_eff) {
                if (false === flg) {
                    p_eff.start(this);
                } else {
                    p_eff.end(this);
                }
            } else {
                if (false === flg) {
                    $('#' + this.getId()).css('display', 'none');
                } else {
                    $('#' + this.getId()).css('display', '');
                }
                // set child visible
                for(var idx in this.child) {
                    this.child[idx].visible(flg,p_eff);
                }
            }
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
/* end of file */
