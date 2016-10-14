/**
 * @file start.js
 */

$(function(){
    try {
        //$.getScript('./js/menu.js');
        $.getScript('./js/top.js');
        
    } catch (e) {
        console.error(e.stack);
    }
});

function loadCss(tgt) {
    try {
        $('head').append('<link>');
        css = $('head').children(':last');
        css.attr({
            rel:  'stylesheet',
            type: 'text/css',
            href: tgt
        });
    } catch (e) {
        console.error(e.stack);
    }
}
/* end of file */
