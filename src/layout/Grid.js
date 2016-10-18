/**
 * @file Grid.js
 */

mofron.layout.Grid = class {
    constructor (tgt) {
        try {
            this.target = tgt;
            this.row    = 1;
            this.column = 1;
            this.dummy  = null;
            this.style_buff = new Array();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTgtParts(tgt) {
        try {
            this.target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setGrid (row, col) {
        try {
            this.row    = row;
            this.column = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setMargin (type,val) {
        try {
            if (null !== this.dummy) {
                this.dummy.style.addStyle('margin-'+type, val+'px');
            } else {
                this.style_buff.push(new Array('margin-'+type, val+'px'));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (child,disp) {
        try {
            var dummy = new mofron.parts.Component();
            dummy.parent = this.target;
            dummy.addChild(child);
            
            dummy.style.addStyle('height'  , (100 / this.row) + '%');
            dummy.style.addStyle('width'   , (100 / this.column) + '%');
            dummy.style.addStyle('float'   , 'left');
            for(var idx in this.style_buff) {
                dummy.style.addStyle(
                    this.style_buff[idx][0],
                    this.style_buff[idx][1]
                );
            }
            dummy.init(disp);
            
            child.parent = this.target;
            this.dummy = dummy;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
