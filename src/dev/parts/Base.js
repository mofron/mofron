/**
 * @file   parts/Base.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */
mofron.util.Vdom = require('../util/Vdom.js');

module.exports = class {
    constructor () {
        try {
            this.parent    = null;
            this.child     = new Array();
            //this.event     = new Array();
            //this.layout    = new Array();
            //this.effect    = new Array();
            this.vdom      = new mofron.util.Vdom('div');
            this.init_flg  = false;
            this.initContents(this.vdom);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** method ***/
    
    getTarget() {
        try {
            return this.vdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd,disp) {
        try {
            var _disp = (disp === undefined) ? true : disp;
            chd.parent = this;
            this.child.push(chd);
            if (true === this.init_flg) {
                chd.init(_disp);
//                for(var idx in this.layout) {
//                    this.layout[idx].layout(chd);
//                }
            }
            var chd_tgt  = this.getTarget();
            var chd_vdom = chd.getVdom();
            chd_vdom.setStyle('display', 'none');
            chd_tgt.addChild(chd_vdom);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    style(key, val) {
        try {
            var _key = (key === undefined) ? null : key;
            var _val = (val === undefined) ? null : val;
            
            if ( (null === _key) &&
                 (null === _val) ) {
                return this.vdom.getStyle();
            }
            this.vdom.setStyle(key, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addEvent (evt) {
        try {
return;
//            this.event.push(evt);
//            evt.setTarget(this);
//            if (true === this.init_flg) {
//                evt.event();
//            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addLayout (lo) {
        try {
return;
//            this.layout.push(lo);
//            lo.setTarget(this);
//            if (true === this.init_flg) {
//                for(var idx in this.child) {
//                    lo.layout(this.child[idx][0]);
//                }
//            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * create parts to DOM
     * 
     * @param disp (bool) : initial visible flag. default is true
     */
    init (disp) {
        try {
            if (true === this.init_flg) {
                throw new Error('detect duplicate init');
            }
            var _disp = disp === undefined ? true : disp;
            
            /* set initialize target */
            //var init_tgt = document.body;
            var init_tgt = null;
            if (null !== this.parent) {
                /* create to parent parts */
                this.vdom.setTarget(this.parent.getTarget());
            } else {
                mofron.root.push(this);
            }
            
            if (false === _disp) {
                this.vdom.setStyle('display', 'none');
            }
            this.vdom.pushDom(init_tgt);

            /* initialize event */
            //for(var idx in this.event) {
            //    this.event[idx].event();
            //}
            this.init_flg = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents(vd) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setVisible (flg, eff) {
        try  {
        
return;
//            var p_eff = eff || null;
//            
//            if ('boolean' != (typeof flg)) {
//                throw new Error('invalid parameter');
//            }
//            
//            if (null != p_eff) {
//                if (false === flg) {
//                    p_eff.start(this);
//                } else {
//                    p_eff.end(this);
//                }
//            } else {
//                if (false === flg) {
//                    $('#' + this.getId()).css('display', 'none');
//                } else {
//                    $('#' + this.getId()).css('display', '');
//                }
//                // set child visible
//                for(var idx in this.child) {
//                    if (true === this.child[idx][1]) {
//                        this.child[idx][0].visible(flg,p_eff);
//                    }
//                }
//            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getVdom() {
        try {
            return this.vdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
