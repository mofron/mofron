( function( global, factory ) {
    "use strict";
    if ( //(typeof module         === "object") && 
         (typeof module.exports === "object") ) {
        module.exports = global.document ?factory( global, true ) :
                         function( w ) {
                             if ( !w.document ) {
                                 throw new Error( "mofron requires a window with a document" );
                             }
                             return factory( w );
                         };
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
    "use strict";
    var mof = {
        parts     : {},
        layout    : {},
        event     : {},
        effect    : {},
        tmpl      : {},
        util      : {},
        root      : new Array(),
    };
    
    //mof.util.Vdom      = require('./util/Vdom.js');
    //mof.util.Style     = require('./util/Style.js');
    //mof.util.Color     = require('./util/Color.js');
    //mof.util.Font      = require('./util/Font.js');
    //mof.util.HeadConts = require('./util/HeadConts.js');
    
    //mof.parts.Base  = require('./parts.js');
    //mof.layout.Base = require('./layout.js');
    //mof.event.Base  = require('./event.js');
    //mof.effect.Base = require('./effect.js');
    //mof.tmpl.Base   = require('./template.js');
    
    return mof;
});
