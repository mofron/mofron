/**
 * @file  Font.js
 * @author simpart
 */

/**
 * @class Font
 * @brief Font Defined Class
 */
mofron.Font = class extends mofron.Base {
    /**
     * initialize font
     *
     * @param fnt : (string) font name
     */
    constructor (fnt, pth) {
        try {
            super();
            this.name('Font');
            
            /* check parameter */
            var _pth = (pth === undefined) ? null : pth;
            if ('string' !== (typeof fnt)) {
                throw new Error('invalid parameter');
            }
            
            /* initialize member */
            this.m_family = {};
            this.m_class  = 'mofron-theme-' + mofron.func.getId(this);
            this.m_theme  = false; 
            
            /* initialize function */
            this.family(fnt);
            if (null !== _pth) {
                this.setFace(fnt, _pth);
            }
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
            mofron.func.addHeadConts({
                tag : 'style',
                contents : mofron.func.getStyleConts('@font-face',style)
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    family (fm) {
        try {
            if (undefined === fm) {
                /* getter */
                var ret_val = new Array();
                for (var idx in this.m_family) {
                    ret_val.push(idx);
                }
                return ret_val;
            }
            /* setter */
            if ('string' !== (typeof fm)) {
                throw new Error('invalid parameter');
            }
            this.m_family[fm] = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFamilyStyle () {
        try {
            var fm     = this.family();
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
     * set own font style to style tag.
     */ 
    pushTheme () {
        try {
            if (true === this.m_theme) {
                return;
            }
            var style = {
                'font-family' : this.getFamilyStyle()
            };
            mofron.func.addHeadConts({
                tag : 'style',
                contents : mofron.func.getStyleConts(
                               '.' + this.m_class ,
                               {'font-family' : this.getFamilyStyle()}
                           )
            });
            this.m_theme = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    className (cls) {
        try {
            if (undefined === cls) {
                /* getter */
                return this.m_class;
            }
            /* setter */
            if ('string' !== typeof cls) {
                throw new Error('invalid parameter')
            }
            this.m_class = cls;
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
            
            if (true === this.m_theme) {
                tgt.target().className(this.className());
            } else {
                tgt.style('font-family', this.getFamilyStyle());
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.font = {};
