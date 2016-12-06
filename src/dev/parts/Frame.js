/**
 * @file   Frame.js
 * @brief  Base UI Frame class
 * @author simpart
 */

module.exports = class extends mofron.parts.Base {
    
    getTarget () {
        try {
            return this.vdom.getChild(0);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize contents
     * 
     * @param disp : (bool) visible flag
     */
    initContents (vd, prm) {
        try {
            var frame = new mofron.util.Vdom('div');
            frame.setStyle('border', 'solid 1px black');
            vd.addChild(frame);
            
            if ('number' === (typeof prm)) {
                this.size(prm,prm);
            } else {
                this.size(100, 100);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    size (hei, wid) {
        try {
            var _hei  = (hei === undefined) ? null : hei;
            var _wid  = (wid === undefined) ? null : wid;
            var style = this.getStyleTgt();
            
            if ( (null === _hei) &&
                 (null === _wid)) {
                return [
                    style.getStyle('height'),
                    style.getStyle('width')
                ];
            }
            
            if ( ('number' != (typeof _hei)) ||
                 ('number' != (typeof _wid)) ) {
                throw new Error('invalid parameter');
            }
            
            style.setStyle('height', _hei + 'px');
            style.setStyle('width' , _wid + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    radius (val) {
        try {
            var _val  = (val === undefined) ? null : val;
            var style = this.getStyleTgt();
            
            if (null === _val) {
                var ret_val = style.getStyle('webkit-border-radius');
                if (null != ret_val) {
                    return ret_val;
                }
                ret_val = style.getStyle('-moz-border-radius');
                if (null != ret_val) {
                    return ret_val;
                }
                ret_val = style.getStyle('border-radius');
                if (null != ret_val) {
                    return ret_val;
                }
                return null;
            }
            
            if ('number' != (typeof val)) {
                throw new Error('invalid parameter');
            }
            
            style.setStyle('webkit-border-radius', _val + 'px');
            style.setStyle('-moz-border-radius'  , _val + 'px');
            style.setStyle('border-radius'       , _val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    shadow (val) {
        try {
            var _val  = (val === undefined) ? null : val;
            var style = this.getStyleTgt();
            
            if (null === _val) {
                return style.getStyle('box-shadow');
            }
            
            if ('number' != (typeof val)) {
                throw new Error('invalid parameter');
            }
            style.setStyle('box-shadow', val/2 + 'px '+ val/2 + 'px '+ val +'px '+ '0px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
