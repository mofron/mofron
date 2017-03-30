/**
 * @file Template.js
 * @author simpart
 */

mofron.Template = class extends mofron.Base {
    constructor (prm) {
        try {
            super();
            this.name('Template');
            
            this.initTmplConts(
                ((undefined !== prm) && (undefined !== prm.param)) ? prm.param : null
            );
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
                if (undefined === this.m_base) {
                    this.m_base = new mofron.Component();
                    this.m_base.vdom().attr('template', this.name());
                }
                return this.m_base;
            }
            /* setter */
            if (false === mofron.func.isInclude(bs,'Component')) {
                throw new Error('invalid parameter');
            }
            bs.vdom().attr('template', this.name());
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
                return (undefined === this.m_title) ? null : this.m_title;
            }
            /* setter */
            mofron.func.addHeadConts({
                tag      : 'title',
                contents : val
            });
            this.m_title = val;
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
            return this.base().visible(flg, eff);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
