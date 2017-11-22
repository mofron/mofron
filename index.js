require('expose-loader?mofron!./src/core/namesp.js');
require('./src/common/Base.js');
require('./src/common/Param.js');
mofron.func = require('./src/common/function.js');

require('./src/util/conf/DomConf.js');
require('./src/util/conf/Attr.js');
require('./src/util/conf/ClassName.js');
require('./src/util/conf/DomConf.js');
require('./src/util/conf/Prop.js');
require('./src/util/conf/Style.js');
require('./src/util/conf/CompConf.js');

require('./src/util/dom/Dom.js');
require('./src/util/dom/Adom.js');

require('./src/util/Color.js');
require('./src/util/Font.js');
require('./src/util/Theme.js');

require('./src/core/Component.js');
require('./src/core/Layout.js');
require('./src/core/Event.js');
require('./src/core/Effect.js');
require('./src/core/Template.js');
module.exports = mofron;
