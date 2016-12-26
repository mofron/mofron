/**
 * @file theme.js
 * @author simpart
 */

/**
 * @class mofron.theme
 * @brief component theme defined class
 */
mofron.theme = class {
    /**
     * initialize member
     */
    constructor () {
        try {
            this.conts  = {};
            this.target = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * update theme contents
     * 
     * @param thm : (mofron.theme object) theme
     * @ param ovr : (bool) over ride flag (option)
     */
    setTheme (thm, ovr) {
        try {
            var _thm = (thm === undefined) ? null  : thm;
            var _ovr = (ovr === undefined) ? false : ovr;
            
            if (null === _thm) {
                throw new Error('invalid parameter');
            }
            
            if (false === _ovr) {
                var thm_cnt = thm.get();
                for (var cnt_key in thm_cnt) {
                    if (null === this.getConts(cnt_key)) {
                        this.add(cnt_key, thm_cnt[cnt_key]);
                    }
                }
            } else {
                this.conts = thm.get();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get theme contents
     * 
     * @param key : (string) theme identify key (option)
     * @return (object) theme value
     */
    get (key) {
        try {
             _key = (key === undefinenull  : key;
            if (null === _key) {
                return this.conts;
            }
            if (undefined === this.conts[key]) {
                return null;
            }
            return this.conts[key];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add theme contents
     * 
     * @param key : (string) theme identify key
     * @param val : (object) theme value
     */
    add (key, val) {
        try {
            var _key = (key === undefined) ? null  : key;
            var _val = (val === undefined) ? null  : val;
            if ( (null === _key) ||
                 (null === _val) ) {
                throw new Error('invalid parameter');
            }
            this.conts[key] = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * remove theme value
     *
     * @param key : (string) theme identify key
     */
    remove (key) {
        try {
            var _key = (key === undefined) ? null  : key;
            if (null === _key) {
                throw new Error('invalid parameter');
            }
            var cnt = 0;
            var hit = false;
            for (var idx in this.conts) {
                if (idx === _key) {
                    hit = true;
                    break;
                }
                cnt++;
            }
            if (true === hit) {
                this.conts.splice(cnt, 1);
            } else {
                throw new Error('invalid parameter');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
