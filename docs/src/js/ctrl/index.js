/**
 * @file index.js
 * @brief index page initialize
 */
//const mf = require('mofron');
require('expose-loader?app!../conf/namesp.js');

/* app ctrl */
const base = require('../conf/basestyle.js');
const comp = require('../init/index.js');

console.log(comp);

try {
    base.init();
    app.root.child(comp);
    
    app.root.visible(true);
} catch (e) {
    console.error(e.stack);
}
/* end of file */
