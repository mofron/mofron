/**
 * @file CenterStyle.js
 */
mofron.appframe.CenterStyle = class extends mofron.appframe.Base {
    constructor () {
        try {
            super();
            this.header = null;
            this.base   = new mofron.parts.Background();
            this.conts  = new Array();
            
            mofron.useParts('RadiusTitle');
            mofron.rootConts.visible(false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setHeader (hdr) {
        try {
            if (null === hdr) {
                throw new Error('invalid parameter');
            }
            this.header = hdr;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addConts (ttl, conts) {
        try {
            var padd  = new mofron.parts.Component();
            var title = new mofron.parts.RadiusTitle(ttl);
            padd.addChild(title,true);
            this.conts.push(padd);
            this.conts.push(conts);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    start () {
        try {
            if (null != this.header) {
                this.header.init(true);
            }
            this.setBackground();
            
            for(var idx in this.conts) {
                this.base.addChild(this.conts[idx],true);
            }
            
            mofron.rootConts.visible(true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setBackground () {
        try {
            var back = new mofron.parts.Background();
            back.addLayout(
                new mofron.layout.HorizCenter(80)
            );
            back.setColor(
                mofron.theme.colors[1]
            );
            
            this.base.addLayout(
                new mofron.layout.HorizCenter(80)
            );
            this.base.addLayout(
                new mofron.layout.Padding('top',30)
            );
            this.base.setColor(
                new mofron.other.Color(255,255,255)
            );
            this.base.setShadow(20);
            back.addChild(this.base,true);
            
            back.init(true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
