/**
 * @file template.js
 */

mofron.Template = class extends mofron.Base {
    constructor (prm) {
        try {
            super();
            this.name('Template');
            
            /* initialize member */
            this.m_base  = new mofron.Component();
            this.m_title = new Array(null,false);
            this.m_theme = null;
            
            this.prmOpt(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (val) {
        try {
            if (undefined === val) {
                /* getter */
                return this.m_title[0];
            }
            /* setter */
            if ('string' !== typeof val) {
                throw new Error('invalid parameter');
            }
            var hc = new mofron.util.HeadConts('title');
            hc.addConts(val);
            hc.pushTag();
            this.m_title[0] = _val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    theme (thm) {
        try {
            var _thm = (thm === undefined) ? null : thm;
            if (null === _thm) {
                return this.m_base.theme();
            }
            this.m_base.theme(_thm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initTmplConts (prm) {
        try {
            console.log('not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg, eff) {
        try {
            if ((undefined === flg) && (undefined === eff)) {
                return this.m_base.visible();
            }
            var _eff = (eff === undefined) ? null : eff;
            if (false === this.m_base.isRendered()) {
                this.initTmplConts (this.m_param);
            }
            
            this.m_base.visible(true, _eff);
            this.m_base.vdom().attr('template', this.name());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
