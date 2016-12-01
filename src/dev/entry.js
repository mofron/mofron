if (typeof mofron != "undefined") {
    console.error('mofron is already defined');
}

require('expose?mofron!./object.js');

/* util */
require('./util/func.js');
mofron.util.Vdom  = require('./util/Vdom.js');
mofron.util.Style = require('./util/Style.js');
mofron.util.Color = require('./util/Color.js');
mofron.util.Font  = require('./util/Font.js');
(function() {
    var theme = require('./util/Theme.js');
    mofron.util.theme = new theme();
}());

    
/* UI Parts */
mofron.parts.Base       = require('./parts/Base.js');
mofron.parts.Text       = require('./parts/Text.js');
mofron.parts.Button     = require('./parts/Button.js');
mofron.parts.InputText  = require('./parts/InputText.js');
mofron.parts.Header     = require('./parts/Header.js');
mofron.parts.Frame      = require('./parts/Frame.js');
mofron.parts.Image      = require('./parts/Image.js');
mofron.parts.Loading    = require('./parts/Loading.js');
mofron.parts.Heading    = require('./parts/Heading.js');
mofron.parts.Background = require('./parts/Background.js');

/* Layout */
mofron.layout.Base        = require('./layout/Base.js');
mofron.layout.Horizon     = require('./layout/Horizon.js');
mofron.layout.HorizCenter = require('./layout/HorizCenter.js');
mofron.layout.VertiCenter = require('./layout/VertiCenter.js');

/* Event */
mofron.event.Base      = require('./event/Base.js');
mofron.event.Click     = require('./event/Click.js');
mofron.event.MouseOver = require('./event/MouseOver.js');

/* effect */
mofron.effect.Base     = require('./effect/Base.js');
mofron.effect.Fade     = require('./effect/Fade.js');
