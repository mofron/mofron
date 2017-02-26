/**
 * @file template.js
 */

mofron.Template = class extends mofron.Base {
    constructor (prm) {
        try {
            super();
            this.name('Template');
            
            /* initialize member */
            this.m_base  = null;
            this.m_title = new Array(null,false);
            this.m_theme = null;
            this.base(new mofron.Component());
            
            this.prmOpt(prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    base (bs) {
        try {
            if (undefined === bs) {
                /* getter */
                return this.m_base;
            }
            if (false === mofron.func.isInclude(bs,'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_base = bs;
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
            var hc = new mofron.HeadConts('title');
            hc.contents(val);
            hc.pushTag();
            this.m_title[0] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    theme (thm) {
        try {
            if (undefined === thm) {
                /* getter */
                return this.base().theme();
            }
            /* setter */
            this.base().theme(thm);
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
                return this.base().visible();
            }
            var _eff = (eff === undefined) ? null : eff;
            if (false === this.base().isRendered()) {
                this.initTmplConts (this.m_param);
            }
            
            this.base().visible(true, _eff);
            this.base().vdom().attr('template', this.name());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
