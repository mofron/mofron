/**
 * @file   Component.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */

mofron.parts.Frame = class extends mofron.parts.Core {
    constructor () {
        this.layout = null;
    }
    
    /**
     * set child parts
     */
    addParts (chd) {
        chd.parent = this;
        this.child.push(chd);
    }
    /**
     * get child parts
     * 
     * @param (int) idx : child index
     * @return (object) : child object
     */
    getParts (idx) {
        try {
            var p_idx = idx || null;
            if (null === p_idx) {
                return this.child;
            }
            
            if (0 === this.child.length) {
                throw new Error('child is null');
            }
            
            if ((0 > idx) || (this.child.length <= idx)) {
                throw new Error('invalid paramter');
            }
            
            return this.child[idx];
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setLayout (lo) {
        
    }
}
/* end of file */
