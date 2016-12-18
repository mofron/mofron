if (typeof mofron != "undefined") {
    console.error('mofron is already defined');
}

require('expose?mofron!./dev/util/object.js');

/* util */
require('./dev/util/func.js');
mofron.util.Vdom      = require('./dev/util/Vdom.js');
mofron.util.Style     = require('./dev/util/Style.js');
mofron.util.Color     = require('./dev/util/Color.js');
mofron.util.Font      = require('./dev/util/Font.js');
mofron.util.HeadConts = require('./dev/util/HeadConts.js');
    
mofron.parts.Base  = require('./dev/parts.js');    /* UI Parts */
mofron.layout.Base = require('./dev/layout.js');   /* Layout */
mofron.event.Base  = require('./dev/event.js');    /* Event */
mofron.effect.Base = require('./dev/effect.js');   /* Effect */
mofron.tmpl.Base   = require('./dev/template.js'); /* Template */
