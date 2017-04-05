/**
 * @file theme.js
 * @author simpart
 */

/**
 * @class mofron.theme
 * @brief theme defined class
 */
mofron.Theme = class extends mofron.Base {
    /**
     * initialize member
     */
    constructor (prm_opt) {
        try {
            super();
            this.name('Theme');
            this.m_conts = {};
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                return (undefined === this.m_target) ? null : this.m_target;
            }
            /* setter */
            if (false === mofron.func.isInclude(tgt, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.m_target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set theme contents
     * 
     * @param thm : (mofron.theme object) theme
     */
    setTheme (thm, ovr) {
        try {
            if (false === mofron.func.isObject(thm, 'Theme')) {
                throw new Error('invalid parameter');
            }
            var _ovr    = (undefined === ovr) ? false : ovr;
            var thm_cnt = thm.get();
            var set_flg = false;
            for (var cnt_key in thm_cnt) {
                for (var idx in thm_cnt[cnt_key]) {
                    var _idx = parseInt(idx);
                    if (null === thm_cnt[cnt_key][_idx]) {
                        /* skip null contents */
                        continue;
                    }

                    if ( (false === _ovr) &&
                         (null  !== this.get(cnt_key, _idx)) ) {
                        continue;
                    }

                    this.set(
                        cnt_key,
                        thm_cnt[cnt_key][_idx],
                        _idx,
                        false
                    );
                    set_flg = true;
                }
            }
            if ( (null  !== this.target()) && (true === set_flg)) {
                this.target().themeConts();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    style (kv, idx) {
        try {
            if ((undefined === kv) || ('number' === typeof kv)) {
                /* getter */
                return this.get('Style', kv);
            }
            /* setter */
            if ('object' !== typeof kv) {
                throw new Error('invalid parameter');
            }
            var style = this.get('Style');
            for (var kv_idx in kv) {
                style[kv_idx] = kv[kv_idx];
            }
            this.set('Style', style, idx, false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    color (clr, idx) {
        try {
            if ((undefined === clr) || ('number' === typeof clr)) {
                /* getter */
                return this.get('Color', clr);
            }
            /* setter */
            if (false === mofron.func.isObject(clr, 'Color') ) {
                throw new Error('invalid parameter');
            }
            this.set('Color', clr, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    component (key, cmp, idx) {
        try {
            if (undefined === cmp) {
                /* getter */
                var thm_cmp = this.get(key);
                if (null !== thm_cmp) {
                    return thm_cmp;
                }
                var sp_key  = key.split('-');
                var pfx     = sp_key[sp_key.length-1][0].toUpperCase();
                var ret_cmp = mofron.comp;
                var tgt_cmp = null;
                for (var kidx in sp_key) {
                    tgt_cmp = sp_key[kidx];
                    if ((kidx == 0) || (kidx == 1)) {
                        continue;
                    }
                    if (kidx == sp_key.length-1) {
                        var tgt_cmp = pfx;
                        for (var pidx in sp_key[sp_key.length-1]) {
                            if (0 == pidx) {
                                continue;
                            }
                            tgt_cmp += sp_key[sp_key.length-1][pidx];
                        }
                    }
                    if (undefined === ret_cmp[tgt_cmp]) {
                        throw new Error('invalid key');
                    }
                    ret_cmp = ret_cmp[tgt_cmp];
                }
                return ret_cmp;
            }
            /* setter */
            if (false === mofron.func.isInclude(cmp, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.set(key, cmp, idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    font (fnt, idx) {
        try {
            if ((undefined === fnt) || ('number' == typeof fnt)) {
                /* getter */
                return this.get('Font', fnt);
            }
            /* setter */
            if (false === mofron.func.isInclude(fnt, 'Font')) {
                throw new Error('invalid parameter');
            }
            fnt.pushTheme();
            this.set('Font', fnt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get theme contents
     * 
     * @param key : (string) theme identify key (option)
     * @param idx : (number) get index (option)
     * @return (object) theme value
     */
    get (key, idx) {
        try {
            if (undefined === key) {
                return this.m_conts;
            } else if ('string' !== typeof key) {
                throw new Error('invalid parameter');
            }
            
            var _idx = (undefined === idx) ? null : idx;
            if (null === _idx) {
                return (undefined === this.m_conts[key]) ? null : this.m_conts[key];
            } else {
                if (undefined === this.m_conts[key]) {
                    return null;
                }
                return (undefined === this.m_conts[key][_idx]) ? null : this.m_conts[key][_idx];
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set theme contents
     * 
     * @param key  : (string) theme contetent key
     * @param val  : (object) theme element
     * @param idx  : (number) set index
     * @param bind : (boolean) notify flag
     */
    set (key, val, idx, noti) {
        try {
            var _val = (val === undefined) ? null : val;
            var _idx = (idx === undefined) ? 0    : idx;
            
            if ( ('string' !== typeof key)  ||
                 (null     === _val)        ||
                 ('number' !== typeof _idx) ||
                 (0         >  _idx) ) {
                throw new Error('invalid parameter');
            }
            
            if (undefined === this.m_conts[key]) {
                this.m_conts[key] = new Array();
            }
            
            var loop    = 0;
            var set_flg = false;
            for (;loop < 10; loop++) {
                if (_idx === this.m_conts[key].length) {
                    this.m_conts[key].push(val);
                    set_flg = true;
                    break;
                } else if (_idx < this.m_conts[key].length) {
                    this.m_conts[key][_idx] = val;
                    set_flg = true;
                    break;
                } else {
                    this.m_conts[key].push(null);
                }
            }
            if (false === set_flg) {
                throw new Error('invalid parameter');
            }
            if ( (null  !== this.target()) && (false !== noti) ) {
                this.target().themeConts();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * remove theme value
     *
     * @param key : (string) theme identify key
     * @param idx : (number) remove index
     */
    del (key, idx) {
        try {
            if (undefined === this.m_conts[key][idx]) {
                throw new Error('invalid parameter');
            }
            
            var cnt = 0;
            for (var cnt_key in this.m_conts) {
                if (cnt_key === key) {
                    this.m_conts[cnt_key].splice(idx,1);
                    if (0 === this.m_conts[cnt_key].length) {
                        this.m_conts.splice(cnt, 1);
                    }
                    return;
                }
                cnt++;
            }
            
            throw new Error('invalid parameter');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
