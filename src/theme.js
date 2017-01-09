/**
 * @file theme.js
 * @author simpart
 */

/**
 * @class mofron.theme
 * @brief Theme Defined Class
 */
mofron.Theme = class {
    /**
     * initialize member
     */
    constructor () {
        try {
            this.conts  = {};
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set theme contents
     * 
     * @param thm : (mofron.theme object) theme
     * @param ovr : (bool) over ride flag (option)
     */
    setTheme (thm, ovr) {
        try {
            var _thm = (thm === undefined) ? null  : thm;
            var _ovr = (ovr === undefined) ? true  : ovr;
            
            if (null === _thm) {
                throw new Error('invalid parameter');
            }
            
            var thm_cnt = thm.get();
            var cnt_buf = null;
            for (var cnt_key in thm_cnt) {
                cnt_buf = this.get(cnt_key);
                if (false === _ovr) {
                    if (null !== cnt_buf) {
                        continue;
                    }
                }
                for (var idx in thm_cnt[cnt_key]) {
                    this.set(cnt_key, thm_cnt[cnt_key][idx], parseInt(idx));
                }
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
            var _fnt = (fnt === undefined) ? null : fnt;
            var _idx = (idx === undefined) ?    0 : idx;
            if ( (null === _fnt)              ||
                 ('object' !== (typeof _fnt)) ||
                 ('Font'   !== _fnt.getName()) ) {
                throw new Error('invalid parameter');
            }
            
            _fnt.pushTheme();
            this.set(_fnt.getName(), _fnt, _idx);
            
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
    setColor (clr, idx) {
        try {
            var _clr = (clr === undefined) ? null : clr;
            var _idx = (idx === undefined) ?    0 : idx;
            if ( (null === _clr)              ||
                 ('object' !== (typeof _clr)) ||
                 ('Color'  !== _clr.getName()) ) {
                throw new Error('invalid parameter');
            }
            
            this.set(_clr.getName(), _clr, _idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set component theme
     *
     * @param comp : (object) component object
     * @param idx : (number) set index (option)
     */
    setComp (comp, idx) {
        try {
            var _comp = (comp === undefined) ? null : comp;
            var _idx  = (idx === undefined)  ?    0 : idx;
            if ( (null === _comp)              ||
                 ('object' !== (typeof _comp)) ) {
                throw new Error('invalid parameter');
            }
            this.set(_comp.getName(), _comp, _idx);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getComp (cmp_nm, idx) {
        try {
            var _idx    = (idx    === undefined) ? 0    : idx;
            var _cmp_nm = (cmp_nm === undefined) ? null : cmp_nm;
            if ( (null === _cmp_nm) || ('string' !== (typeof _cmp_nm))) {
                throw new Error('invalid parameter');
            }
            return this.get(_cmp_nm, _idx);
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
            var _key = (key === undefined) ? null  : key;
            var _idx = (idx === undefined) ? null  : idx;
            
            if (null === _key) {
                return this.conts;
            }
            
            var hit = false;
            for (var cnt_key in this.conts) {
                if (cnt_key === _key) {
                    hit = true;
                    break;
                }
            }
            if (false === hit) {
                return null;
            }
            
            if (null === _idx) {
                return this.conts[_key];
            }
            
            if ( (_idx >= this.conts[_key].length) ||
                 (_idx <  0) ) {
                return null;
            }
            
            //for (var dbg_key in this.conts) {
            //    console.log(dbg_key); 
            //}
            return this.conts[_key][_idx];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set theme contents
     * 
     * @param key : (string) theme contetent key
     * @param val : (object) theme element
     * @param idx : (number) set index
     */
    set (key, val, idx) {
        try {
            var _key = (key === undefined) ? null : key;
            var _val = (val === undefined) ? null : val;
            var _idx = (idx === undefined) ? 0    : idx;
            
            if ( (null === _key) ||
                 (null === _val) ||
                 (0    >   _idx) ) {
                throw new Error('invalid parameter');
            }
            
            if (undefined === this.conts[_key]) {
                this.conts[_key] = new Array();
            }
            
            if (_idx === this.conts[_key].length) {
                this.conts[_key].push(_val);
            } else if (_idx < this.conts[_key].length) {
                this.conts[_key][_idx] = val;
            } else {
                throw new Error('invalid parameter');
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
            var _key = (key === undefined) ? null : key;
            var _idx = (idx === undefined) ? 0    : idx;
            
            if ( (null === _key) ||
                 ((0    >   _idx) && (this.conts.length <= _idx)) ) {
                throw new Error('invalid parameter');
            }
            
            var cnt = 0;
            for (var cnt_key in this.conts) {
                if (cnt_key === _key) {
                    this.conts[cnt_key].splice(_idx,1);
                    if (0 === this.conts[cnt_key].length) {
                        this.conts.splice(cnt, 1);
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
    
    addNotify (func) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
