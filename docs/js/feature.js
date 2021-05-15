/* require */
require('mofron');
const Text=require("mofron-comp-text");
const TFrame=require("mofron-comp-ttlframe");
const Grid=require("mofron-layout-grid");
const HrzCent=require("mofron-layout-hrzcenter");
const HrzPos=require("mofron-effect-hrzpos");
const comutl=mofron.util.common;
const cmputl=mofron.util.component;
try {

    /* script (extern) */

    /* script (init) */

    /* template */
    let feature=(feature_p)=>{let tpl0_0_0_0=new Text();let tpl0_0_0=new mofron.class.Component();let tpl0_0=new TFrame();let tpl0=new mofron.class.Component();tpl0_0_0.child([tpl0_0_0_0]);tpl0_0.child([tpl0_0_0]);tpl0.child([tpl0_0]);tpl0_0_0_0.config({size:"0.23rem",style:new mofron.class.ConfArg({'font-family':"Quicksand"},{lock:true}),text:feature_p.desc});tpl0_0_0.config({layout:new HrzCent(85),style:{'margin-top':"0.2rem",'margin-bottom':"0.2rem"}});let eff0=new HrzPos();tpl0_0.config({size:new mofron.class.ConfArg("90%",null),color:new mofron.class.ConfArg('#f0e6fa','#fffdff'),shadow:"0.02rem",text:new mofron.class.ConfArg(feature_p.title,{effect:new HrzPos()}),effect:eff0});return [tpl0];};
    /* component */
    let cmp1=new Text("Feature");
    let cmp2=new Text("aaa");
    let root_cmp=new mofron.class.Component();
    root_cmp.child([cmp1,cmp2]);
    cmp1.config({size:"0.45rem",effect:new HrzPos()});

    /* script (before) */

    /* start visible */
    root_cmp.visible(true,() => {try{

        /* script (after) */

    }catch(e){console.error(e.stack);}});
} catch (e) {
    console.error(e.stack);
}
