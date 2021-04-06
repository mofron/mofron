require('expose-loader?exposes=mofron!./src/core/namesp.js');

/* util functions */
require('./src/util/common.js');
require('./src/util/component.js');
require('./src/util/effect.js');

mofron.class.ConfArg  = require('./src/type/ConfArg.js');
mofron.class.PullConf = require('./src/type/PullConf.js');

mofron.class.Dom       = require('./src/core/dom/Dom.js');
mofron.class.Component = require('./src/tag/Component.js');
mofron.class.Layout    = require('./src/tag/Layout.js');
mofron.class.Effect    = require('./src/tag/Effect.js');
mofron.class.Event     = require('./src/tag/Event.js');
mofron.class.Color     = require('./src/type/Color.js');
mofron.class.Size      = require('./src/type/size/Size.js');
mofron.class.Pixel     = require('./src/type/size/Pixel.js');
mofron.class.Rem       = require('./src/type/size/Rem.js');

let Window = require('./src/core/Window.js');
mofron.window = new Window();
let Document = require('./src/core/Document.js');
mofron.document = new Document();

module.exports = mofron;
