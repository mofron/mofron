/**
 * @file Horizon.js
 */
module.exports = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            this.exec_flg = false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout () {
        try {
            if (true === this.exec_flg) {
                return;
            }
            
            this.target.style('display', '-webkit-flex');
            this.target.style('display', 'flex');
            this.exec_flg = true;
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
