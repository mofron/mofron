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
            this.m_name  = 'Base';
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
                return this.base.visible();
            }
            var _eff = (eff === undefined) ? null : eff;
            if (false === this.base.isRendered()) {
                this.initTmplConts (this.param);
            }
            this.base.vdom().attr('template', this.name());
            this.base.visible(true, _eff);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    name (nm) {
        try {
            if (undefined === nm) {
                return this.m_name;
            }
            if ('string' !== typeof nm) {
                throw new Error('invalid parameter');
            }
            this.m_name = nm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
