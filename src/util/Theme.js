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
    constructor () {
        try {
            super();
            this.name('Theme');
            
            this.m_target = null;
            this.m_conts  = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tgt) {
        try {
            if (undefined === tgt) {
                /* getter */
                return this.m_target;
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
            
            var thm_cnt = thm.get();
            var cnt_buf = null;
            for (var cnt_key in thm_cnt) {
                if (true === ovr) {} else {
                    if (null !== this.get(cnt_key)) {
                        continue;
                    }
                }
                for (var idx in thm_cnt[cnt_key]) {
                    if (null === thm_cnt[cnt_key][parseInt(idx)]) {
                        continue;
                    }
                    this.set(
                        cnt_key,
                        thm_cnt[cnt_key][idx],
                        parseInt(idx),
                        false
                    );
                }
            }
            if (null  !== this.target()) {
                this.target().themeConts();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set font theme
     *
     * @param fnt : (object) Font object
     * @param idx : (number) set index (option)
     */
    setFont (fnt, idx) {
        try {
            if (false === mofron.func.isObject(fnt, 'Font')) {
                throw new Error('invalid parameter');
            }
            fnt.pushTheme();
            this.set(
                fnt.name(),
                fnt,
                (idx === undefined) ? 0 : idx
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFont (idx) {
        try {
            return this.get('Font', (idx === undefined) ? 0 : idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set color theme
     *
     * @param clr : (object) Color object
     * @param idx : (number) set index (option)
     */
    setColor (clr, idx, bind) {
        try {
            if (false === mofron.func.isObject(clr, 'Color') ) {
                throw new Error('invalid parameter');
            }
            this.set(
                clr.name(),
                clr,
                (idx === undefined) ? 0 : idx
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getColor (idx) {
        try {
            return this.get('Color',(idx    === undefined) ? 0 : idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setComp (cmp, idx, bind) {
        try {
            if ('object' !== typeof cmp) {
                throw new Error('invalid parameter');
            }
            var cmp_obj = new cmp();
            if (false === mofron.func.isInclude(cmp_obj, 'Component')) {
                throw new Error('invalid parameter');
            }
            this.set(
                cmp_obj.name(),
                cmp_obj,
                (idx === undefined) ? 0 : idx
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getComp (cmp_nm, idx) {
        try {
            return this.get(
                       (cmp_nm === undefined) ? null : cmp_nm,
                       (idx    === undefined) ?    0 : idx
                   );
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
