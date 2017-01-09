/**
 * @file  Font.js
 * @author simpart
 */

/**
 * @class Font
 * @brief Font Defined Class
 */
mofron.util.Font = class {
    /**
     * initialize font
     *
     * @param fnt : (string) font name
     */
    constructor (fnt, pth) {
        try {
            /* check parameter */
            var _pth = (pth === undefined) ? null : pth;
            if ('string' !== (typeof fnt)) {
                throw new Error('invalid parameter');
            }
            
            /* initialize member */
            this.m_name   = null;
            this.m_family = {};
            this.size     = 15;
            this.thm_sel  = 'mofron-theme-' + mofron.util.getId(this);
            this.thm_flg  = false; 
            
            /* initialize function */
            this.name('Font');
            this.addFamily(fnt);
            if (null !== _pth) {
                this.setFace(fnt, _pth);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * name 
     *
     * @return (string) own name
     */
    name (nm) {
        try {
            if (undefined === nm) {
                /* getter */
                return this.m_name;
            }
            /* setter */
            if ('string' !== typeof nm) {
                throw new Error('invalid parameter');
            }
            this.m_name = nm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set @font-face
     * 
     * @param fnt : (string) font name
     * @param pth : (string) path to font file
     */
    setFace (fnt, pth) {
        try {
            var hc = new mofron.util.HeadConts('style');
            
            if ( ('string' !== (typeof pth)) ||
                 ('string' !== (typeof fnt)) ) {
                throw new Error('invalid parameter');
            }
            
            /* format */
            var pth_spt = pth.split('.');
            var format  = '';
            if ('woff' === pth_spt[pth_spt.length-1]) {
                format = "format('woff')";
            } else if ('ttf' === pth_spt[pth_spt.length-1]) {
                format = "format('truetype')";
            } else if ('otf' === pth_spt[pth_spt.length-1]) {
                format = "format('opentype')";
            } else if ('eot' === pth_spt[pth_spt.length-1]) {
                format = "format('embedded-opentype')";
            } else if ( ('svg' === pth_spt[pth_spt.length-1]) || ('svgz' === pth_spt[pth_spt.length-1])) {
                format = "format('svg')";
            }
            
            var style = {
                'font-family' : fnt,
                'src' : "url('" + pth + "') " + format
            };
            hc.addConts(mofron.util.getStyleConts('@font-face',style));
            hc.pushTag();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * add font family
     *
     * @param fm : (string) font family
     */
    addFamily (fm) {
        try {
            var _fm = (fm === undefined) ? null : fm;
            if ('string' !== (typeof _fm)) {
                throw new Error('invalid parameter');
            }
            this.m_family['"' + _fm + '"'] = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * get font family list
     * 
     * @param idx : (number) family index
     * @return (object) : font family
     */
    getFamily (idx) {
        try {
            var _idx = (idx === undefined) ? null : idx;
            var ret_val = new Array();
            for (var idx in this.m_family) {
                ret_val.push(idx);
            }
            
            if (null === _idx) {
                return ret_val;
            } else {
                if ( (-1 < _idx) &&
                     (ret_val.length > _idx)) {
                    return ret_val[_idx];
                }
            }
            return null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFamilyStyle () {
        try {
            var fm     = this.getFamily();
            var fm_str = '';
            for(var idx in fm) {
                if ('' !== fm_str) {
                    fm_str += ',';
                }
                fm_str += fm[idx];
            }
            return fm_str;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * font size setter/getter
     * 
     * @param val : (number) font size
     * @return (number) font size
     */
    size (val) {
        try {
            var _val = (val === undefined) ? null : val;
            if (null === _val) {
                return this.size;
            }
            if ( ('number' !== (typeof _val)) ||
                 (0         >  _val) ) {
                throw new Error('invalid parameter');
            }
            this.size = _val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
   
    /**
     * set own font style to style tag.
     */ 
    pushTheme () {
        try {
            if (true === this.thm_flg) {
                return;
            }
            var hc    = new mofron.util.HeadConts('style');
            var style = {
                'font-family' : this.getFamilyStyle(),
                'font-size'   : this.size + 'px'
            };
            hc.addConts(mofron.util.getStyleConts(this.thm_sel ,style));
            hc.pushTag();
            this.thm_flg = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getThemeClass () {
        try {
            return this.thm_sel;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set font-family style to target component
     * 
     * @param (object) : target object
     */
    setFont (tgt) {
        try {
            var _tgt = (tgt === undefined) ? null : tgt;
            if ( (null     === _tgt) ||
                 ('object' !== (typeof _tgt)) ) {
                throw new Error('invalid parameter');
            }
            
            if (true === this.thm_flg) {
                tgt.getTarget().addClname(this.thm_sel);
            } else {
                tgt.style('font-family', this.getFamilyStyle());
                tgt.style('font-size'  , this.size + 'px');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
