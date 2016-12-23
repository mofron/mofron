/**
 * @file   component.js
 * @brief  Base of Component Class
 * @author simpart
 */

mofron.comp.Base = class {
    constructor (prm) {
        try {
            var _prm = (prm === undefined) ? null : prm;
            this.parent    = null;
            this.child     = new Array();
            this.event     = new Array();
            this.layout    = new Array();
            this.vdom      = new mofron.util.Vdom('div');
            this.target    = this.vdom;
            this.state     = null;
            this.initContents(this.vdom, _prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /*** method ***/
    
    isInited () {
        try {
            if ('inited' === this.state) {
                return true;
            }
            return false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initContents(vd, prm) {}
    
    getTarget () {
        try {
            return this.target;
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
    
    addChild (chd,disp,tgt) {
        try {
            var _disp = (disp === undefined) ? true  : disp;
            var _tgt  = (tgt === undefined) ?  null : tgt;
            chd.parent = this;
            this.child.push(chd);
            if ('inited' === this.state) {
                chd.init(_disp);
                for(var idx in this.layout) {
                    this.layout[idx].layout();
                }
            }
            
            /* set initial display of child */
            var chd_vdom = chd.getVdom();
            if (false === _disp) {
                chd_vdom.setStyle('display', 'none');
            }
            
            /* set to target vdom */
            if (null === _tgt) {
                this.getTarget().addChild(chd_vdom);
            } else {
                _tgt.addChild(chd_vdom);
            }
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
    
    getStyle (key) {
        try {
            var _key = (key === undefined) ? null : key;
            if (null === _key) {
                return this.getStyleTgt().getStyle();
            }
            if ('string' !== (typeof _key)) {
               throw new Error('invalid parameter');
            }
            return this.getStyleTgt().getStyle(_key);
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
            if ('inited' === this.state) {
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
            
            if ('inited' === this.state) {
                lo.layout();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getLayout (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            if (null === _idx) {
                return this.layout;
            }
            
            if (('number' !== (typeof _idx)) ||
                (0 > _idx) || (this.layout.length <= _idx)) {
                return null;
            }
            return this.layout[_idx];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * create DOM of component
     * 
     * @param disp (bool) : initial visible flag. default is true
     */
    init (disp) {
        try {
            
            if ('inited' === this.state) {
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
                this.vdom.pushDom(init_tgt);
                
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
            
            this.state    = "inited";
            
            this.afterInit();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    afterInit () {}
    
    setVisible (flg, eff) {
        try  {
            var _flg = (flg === undefined) ?  null : flg;
            var _eff = (eff === undefined) ?  null : eff;
            
            if (null === _flg) {
                throw new Error('invalid parameter');
            }
            
            if ( ('boolean' != (typeof _flg)) ||
                 ( (null != _eff) && ('object'  != (typeof _eff)) ) ) {
                throw new Error('invalid parameter');
            }
            
            if (null != _eff) {
                eff.setTarget(this);
                eff.setCallback(function(prm) {
                    try {
                        if (true === prm[1]) {
                            prm[0].setStyle('display', null);
                        } else {
                            prm[0].setStyle('display', 'none');
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                [this.getVdom(),_flg]);
                _eff.effect(_flg);
            } else {
                var vd = this.getVdom();
                if (true === _flg) {
                    vd.setStyle('display', null);
                } else {
                    vd.setStyle('display', 'none');
                }
            }
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
