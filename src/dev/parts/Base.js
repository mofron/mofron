/**
 * @file   parts/Base.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */

module.exports = class {
    constructor (prm) {
        try {
            var _prm = (prm === undefined) ? null : prm;
            this.parent    = null;
            this.child     = new Array();
            this.event     = new Array();
            this.layout    = new Array();
            //this.effect    = new Array();
            this.vdom      = new mofron.util.Vdom('div');
            this.init_flg  = false;
            this.state     = null;
            this.initContents(this.vdom, _prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** method ***/
    
    getTarget () {
        try {
            return this.vdom;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getEventTgt () {
        try {
            return this.getTarget();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd,disp) {
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
            
            /* set initial display of child */
            var chd_vdom = chd.getVdom();
            if (false === _disp) {
                chd_vdom.setStyle('display', 'none');
            }
            
            /* set to target vdom */
            var chd_tgt  = this.getTarget();
console.log(chd_tgt.getId() + ' add child -> ' + chd_vdom.getId());
            chd_tgt.addChild(chd_vdom);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getChild (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                return this.child;
            }
            if ((0 > _idx) || ((this.child.length-1) < _idx)) {
                throw new Error('invalid parameter');
            }
            return this.child[_idx];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getStyleTgt () {
        try {
            return this.getTarget();
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
            var style_tgt = this.getStyleTgt();
            style_tgt.setStyle(key, val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addEvent (evt) {
        try {
            if ( (undefined === evt) ||
                 (null      === evt) ||
                 ('object'  != (typeof evt)) ) {
                throw new Error('invalid parameter');
            }
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
            if ( (undefined === lo) ||
                 (null      === lo) ||
                 ('object'  != (typeof lo)) ) {
                throw new Error('invalid parameter');
            }
            this.layout.push(lo);
            lo.setTarget(this);
            //if (true === this.init_flg) {
            //    lo.layout();
            //}
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
            this.state = 'init';
            var _disp = disp === undefined ? true : disp;
            
            /* set initialize target */
            if ( (null === this.parent) || 
                 (null === this.parent.state) ) {
                var init_tgt = null;
                if (null === this.parent) {
                    mofron.root.push(this);
                } else {
                    init_tgt = this.parent.getTarget();
                }
                
                if (false === _disp) {
                    this.vdom.setStyle('display', 'none');
                }
                //console.log(this.getVdom().getId() + ' -> pushDom()');
                this.vdom.pushDom(init_tgt);
                console.log("pushed");
                
            }
            
            
            for (var idx in this.event) {
                this.event[idx].event();
            }
            
            /* set layout */
            for (var idx in this.layout) {
                this.layout[idx].layout();
            }
            
            for (var idx in this.child) {
                this.child[idx].init(_disp);
            }
            
            this.init_flg = true;
            this.state    = "inited";
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents(vd, prm) {
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
