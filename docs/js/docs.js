/* require */
require('mofron');
const Text=require("mofron-comp-text");
const AppBase=require("mofron-comp-appbase");
const Icon=require("mofron-comp-aweicon");
const Split=require("mofron-comp-split");
const Heading=require("mofron-comp-borderhdg");
const Code=require("mofron-comp-codeprettify");
const Footer=require("mofron-comp-footer");
const DText=require("../js/comp/DocText.js");
const DCode=require("../js/comp/DocCode.js");
const Center=require("mofron-effect-position");
const Fade=require("mofron-effect-fade");
const FSmooth=require("mofron-effect-fontsmooth");
const Margin=require("mofron-layout-margin");
const HrzCent=require("mofron-layout-hrzcenter");
const comutl=mofron.util.common;
const cmputl=mofron.util.component;
try {
    /* access */
    if(true===mofron.util.common.chkacc({device:'mobile'})){
        if(true===mofron.window.isPortrait()){
            document.documentElement.setAttribute('style','font-size:1200%;');
        }
        mofron.window.portraitEvent(()=>{document.documentElement.setAttribute('style','font-size:1200%;');});
    }
    if(true===mofron.util.common.chkacc({device:'mobile'})){
        if(true===mofron.window.isLandscape()){
            document.documentElement.setAttribute('style','font-size:600%;');
        }
        mofron.window.landscapeEvent(()=>{document.documentElement.setAttribute('style','font-size:600%;');});
    }
    if(true===mofron.util.common.chkacc({device:'tablet'})){
        document.documentElement.setAttribute('style','font-size:800%;');
    }

    /* script (extern) */

    /* script (init) */

    /* template */

    /* component */
    let cmp0_0=new Split();
    let cmp0_1_0=new Text("Released under the MIT License");
    let cmp0_1=new Footer();
    let cmp0=new AppBase();
    let root_cmp=new mofron.class.Component();
    cmp0_1.child([cmp0_1_0]);
    cmp0.child([cmp0_0,cmp0_1]);
    root_cmp.child([cmp0]);
    let cmp1=new Text("Quick Start");
    cmp1.config({size:"0.35rem",style:{'margin':"0.2rem"}});
    let cmp2_0=new Heading("Setup Local Development Environment");
    let cmp2_1=new DText("Make sure you have the latest version of Node.js installed before installing mofron.Bellow command creates a new directory with default configuration files.Replace 'mofron-project-name' with any name if necessary");
    let cmp2_2=new DCode("npx mofron-init mofron-project-name \ncd mofron-project-name\nnpm install mofron mofron-build");
    let cmp2_3=new Heading("Sample Project");
    let cmp2_4=new DText("Edit ./mof/index.mf in the directory to create the content.This is a sample to display the simplest characters.");
    let cmp2_5=new DCode();
    let cmp2_6=new DText("Install the component module used by index.mf");
    let cmp2_7=new DCode("npm install mofron-comp-text");
    let cmp2_8=new DText("Convert from markup format .mf file to javascript file.");
    let cmp2_9=new DCode("npx mofron-build index");
    let cmp2_10=new DText("Since dist_index.js is generated in ./dist/index directory, if you read it from the html file, the contents of the sample will be displayed.");
    let cmp2=new mofron.class.Component();
    cmp2.child([cmp2_0,cmp2_1,cmp2_2,cmp2_3,cmp2_4,cmp2_5,cmp2_6,cmp2_7,cmp2_8,cmp2_9,cmp2_10]);
    cmp2_5.config({src:"./dist/docs/simple.mf"});
    cmp2.config({style:{'overflow':"overlay"},layout:new Margin("top","0.2rem")});
    let cmp3=new mofron.class.Component();
    cmp3.config({height:"0.2rem"});
    let lot4=new HrzCent(85);
    let lot5=new Margin("top","0.2rem");
    cmp0_0.config({left:new mofron.class.ConfArg(cmp1,{width:"2rem"}),theme:{Heading:{config:{color:"#af64f0"}}},right:new mofron.class.ConfArg([cmp2,cmp3],{layout:[lot4,lot5]})});
    cmp0_1_0.config({color:'#787878',size:"0.3rem",effect:new Center()});
    cmp0_1.config({height:"0.8rem",baseColor:'#f0e6fa',style:{'display':"flex"}});
    let cmp6_0=new Icon("fab fa-github");
    let cmp6_1=new Icon("fab fa-twitter");
    let cmp6=new mofron.class.Component();
    cmp6.child([cmp6_0,cmp6_1]);
    cmp6_0.config({link:new mofron.class.ConfArg('https://github.com/mofron/mofron',true),size:"0.35rem"});
    cmp6_1.config({link:new mofron.class.ConfArg('https://twitter.com/mofronjs',true),size:"0.35rem"});
    cmp6.config({layout:new Margin('left','0.2rem'),style:{'display':"flex",'align-items':"center"}});
    cmp0.config({color:new mofron.class.ConfArg('#f0e6fa','#fafafa'),title:new mofron.class.ConfArg("mofron document","./dist/img/logo_small.png"),header:new mofron.class.PullConf({navi:cmp6})});
    let eff7=new Fade(true,3000);
    let eff8=new FSmooth();
    root_cmp.config({effect:[eff7,eff8],theme:{Text:{config:{color:'#787878',font:"Iceland"},ignore:"DocText"}}});

    /* script (before) */

    /* start visible */
    root_cmp.visible(true,() => {try{

        /* script (after) */

    }catch(e){console.error(e.stack);}});
} catch (e) {
    console.error(e.stack);
}
