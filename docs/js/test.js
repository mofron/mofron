/* require */
require('mofron');
const Ujarak=require("mofron-comp-ujarak");
const comutl=mofron.util.common;
const cmputl=mofron.util.component;
try {

    /* script (extern) */

    /* script (init) */

    /* template */

    /* component */
    let cmp0=new Ujarak("button");
    let root_cmp=new mofron.class.Component();
    root_cmp.child([cmp0]);
    cmp0.config({baseColor:'#f0e6fa'});

    /* script (before) */

    /* start visible */
    root_cmp.visible(true,() => {try{

        /* script (after) */

    }catch(e){console.error(e.stack);}});
} catch (e) {
    console.error(e.stack);
}
