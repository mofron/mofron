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
            this.style    = new Array(); //new mofron.other.Style(this);
            this.theme    = mofron.theme;
            this.init_flg = false;
        } catch (e) {
            console.error(e.stack);
            throw e;
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
        this.id = mofron.innerFunc.getId();
        return this.id;
    }
    
    getTarget() {
        try {
            return '#' + this.getId();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd,disp) {
        try {
console.log('addChild : Components');

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
            console.error(e.stack);
            throw e;
        }
    }
    
    addEvents(evt) {
        
    }
    
    setLayout (lo) {
        try {
            this.layout = lo;
            this.layout.setTgtParts(this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init (disp) {
        try {
            var _disp = disp || false;
            
            this.initConts(_disp);
            
            for(var idx in this.style) {
                this.style[idx].setStyle();
            }
            
            this.initChild(_disp);
            
            this.init_flg = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
console.log('initConts : Component');
            
            var tgt = null;
            if (null === this.parent) {
                tgt = 'body';
            } else {
                tgt = this.parent.getTarget();
            }
            $(tgt).append('<div id="'+ this.getId() +'"></div>');
            
            if (false === disp) {
                var style = new mofron.other.Styles(this);
                style.style('display', 'none');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    initChild(disp) {
        try {
console.log('initChild : Component');

            for(var idx in this.child) {
                if (null !== this.layout) {
                    //this.child[idx].init(false);
                    this.layout.layout(this.child[idx],disp);
                    //this.child[idx].visible(disp);
                } else {
                    this.child[idx].init(disp);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
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
            console.error(e.stack);
            throw e;
        }
    }
    
//    style (key, val, ext) {
//        try {
//            
//        } catch (e) {
//            console.error(e.stack);
//            throw e;
//        }
//    }
}
/* end of file */
