/**
 *
 */
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
    return {
        comp      : {},
        layout    : {},
        event     : {},
        effect    : {},
        tmpl      : {},
        func      : {},
        theme     : null,
        root      : new Array(),
    };
});
