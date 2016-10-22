/**
 * @file   Component.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */

mofron.parts.Component = class {
    constructor () {
        try {
            this.id        = null;
            this.parent    = null;
            this.child     = new Array();
            this.event     = new Array();
            this.layout    = new Array();
            this.effect    = new Array();
            this.style     = new Array(); //new mofron.other.Style(this);
            this.theme     = mofron.theme;
            this.init_disp = true;
            this.init_flg  = false;
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
                chd.init(disp);
                for(var idx in this.layout) {
                    this.layout[idx].layout(chd);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addEvent (evt) {
        try {
            this.event.push(evt);
            evt.setTarget(this);
            if (true === this.init_flg) {
                evt.event();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addLayout (lo) {
        try {
            this.layout.push(lo);
            lo.setTarget(this);
            if (true === this.init_flg) {
                for(var idx in this.child) {
                    lo.layout(this.child[idx]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init (disp) {
        try {
            if (true === this.init_flg) {
                throw new Error('detect duplicate init');
            }
            var _disp = disp || false;
            
            if (null === this.parent) {
                mofron.rootConts.addChild(this,_disp);
                return;
            }
            
            this.initConts(_disp);
            
            /* set style */
            for(var idx in this.style) {
                this.style[idx].setStyle();
            }
            
            /* set event */
            for(var idx in this.event) {
                this.event[idx].event();
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
            if ('RootConts' === this.parent) {
                tgt = 'body';
            } else {
                tgt = this.parent.getTarget();
            }
            $(tgt).append('<div id="'+ this.getId() +'"></div>');
            
            if ((false === disp) || (false === this.init_disp)) {
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
                this.child[idx].init(disp);
                if (0 !== this.layout.length) {
                    for(var lo_idx in this.layout) {
                        this.layout[lo_idx].layout(this.child[idx]);
                    }
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
    
    setInitDisp (flg) {
        try {
            this.init_disp = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
