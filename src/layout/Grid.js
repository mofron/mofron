/**
 * @file Grid.js
 */

mofron.layout.Grid = class {
    constructor (parts) {
        try {
            this.parts  = parts;
            this.row    = 1;
            this.column = 1;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    setGrid (row, col) {
        try {
            this.row    = row;
            this.column = col;
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
    
    layout () {
        try {
            var tgt = this.parts.getTarget();
            
        } catch (e) {
            throw new Error(e.stack + '\n');
        }
    }
}
