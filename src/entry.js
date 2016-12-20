//if (typeof mofron != "undefined") {
//    console.error('mofron is already defined');
//}

require('expose?mofron!./core.js');

/* util */
require('./util/func.js');
require('./util/Vdom.js');
require('./util/Style.js');
require('./util/Color.js');
require('./util/Font.js');
require('./util/HeadConts.js');

require('./parts.js');
require('./layout.js');
require('./event.js');
require('./effect.js');
require('./template.js');

