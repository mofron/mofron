/**
 * @file Template.js
 * @author simpart
 */

mofron.Template = class extends mofron.Base {
    constructor (prm) {
        try {
            super();
            this.name('Template');
            var bs_cmp = class extends mofron.Component {
                             initTmplConts (p) {
                                 try {
                                     p[0].initTmplConts(p[1]);
                                 } catch (e) {
                                     console.error(e.stack);
                                     throw e;
                                 }
                             }
                         };
            this.base(new bs_cmp());
            this.base().initTmplConts([this,prm]);
            
            var tmp     = this.getNameList();
            var tmp_str = '';
            for (var tidx in tmp) {
                if (0 == tidx) {
                    continue;
                } else if (1 != tidx) {
                    tmp_str += '-';
                }
                tmp_str += tmp[tidx];
            }
            this.base().target().attr('template', tmp_str);
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
                return (undefined === this.m_base) ? null : this.m_base;
            }
            /* setter */
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
