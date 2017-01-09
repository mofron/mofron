/**
 * @file template.js
 */

mofron.tmpl.Base = class {
    constructor (prm) {
        try {
            /* initialize member */
            this.base    = new mofron.comp.Base();
            this.param   = (prm === undefined) ? null : prm;
            this.m_title = null;
            this.m_theme = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init (disp) {
        try {
            var _disp = (disp === undefined) ? true : disp;
            this.initTemplate(this.param);
            this.base.init(false);
            if (true === _disp) {
                this.setVisible(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initTemplate (prm) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    title (val) {
        try {
            var _val = (val === undefined) ? null : val;
            if (null === _val) {
                return this.m_title;
            }
            var hc   = new mofron.util.HeadConts('title');
            hc.addConts(_val);
            hc.pushTag();
            this.m_title = _val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    theme (thm) {
        try {
            var _thm = (thm === undefined) ? null : thm;
            if (null === _thm) {
                return this.base.theme();
            }
            this.base.theme(_thm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setVisible (flg, eff) {
        try {
            var _eff = (eff === undefined) ? new mofron.effect.Fade() : eff;
            this.base.setVisible (true, _eff);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
