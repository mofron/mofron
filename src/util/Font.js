/**
 * @file  Font.js
 */

mofron.util.Font = class {
    constructor (fnt) {
        try {
            if ('string' !== (typeof fnt)) {
                throw new Error('invalid parameter');
            }
            this.family = {};
            this.font   = fnt;
            this.addFamily(fnt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setFace (url) {
        try {
            var hc = new mofron.util.HeadConts('style');
            var fm = null;
            for (var idx in this.family) {
                fm = idx;
                break;
            }
            if ('string' !== (typeof url)) {
                throw new Error('invalid parameter');
            }
            
            /* format */
            var url_spt = url.split('.');
            var format  = '';
            if ('woff' === url_spt[url_spt.length-1]) {
                format = "format('woff')";
            } else if ('ttf' === url_spt[url_spt.length-1]) {
                format = "format('truetype')";
            } else if ('otf' === url_spt[url_spt.length-1]) {
                format = "format('opentype')";
            } else if ('eot' === url_spt[url_spt.length-1]) {
                format = "format('embedded-opentype')";
            } else if ( ('svg' === url_spt[url_spt.length-1]) || ('svgz' === url_spt[url_spt.length-1])) {
                format = "format('svg')";
            }
            
            var style = {
                'font-family' : fm,
                'src' : "url('" + url + "') " + format
            };
            hc.addConts(mofron.util.getStyleConts('@font-face',style));
            hc.pushTag();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setImport (url) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addFamily (fm) {
        try {
            if ( ('string' !== (typeof fm)) &&
                 ('object' !== (typeof fm)) ) {
                throw new Error('invalid parameter');
            }
            
            if ('string' === (typeof fm)) {
                this.family['"' + fm + '"'] = null;
            } else if ('object' === (typeof fm)) {
                for (var idx in fm) {
                    if ('string' !== fm[idx]) {
                        throw new Error('invalid parameter');
                    }
                    this.family['"' + fm[idx] + '"'] = null;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFamily () {
        try {
            return this.family;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getFontFamily () {
        try {
            var fm_str = '';
            for(var idx in this.family) {
                if ('' !== fm_str) {
                    fm_str += ',';
                }
                fm_str += idx;
            }
            return fm_str;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
