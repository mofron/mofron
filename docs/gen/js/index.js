/* require */
require('mofron');
const Text=require("mofron-comp-text");
const Image=require("mofron-comp-image");
const AppBase=require("mofron-comp-appbase");
const Button=require("mofron-comp-button");
const Ujarak=require("mofron-comp-ujarak");
const Link=require("mofron-comp-link");
const Icon=require("mofron-comp-aweicon");
const PrjTop=require("mofron-comp-prjtop");
const Footer=require("mofron-comp-footer");
const eLink=require("mofron-event-link");
const Fade=require("mofron-effect-fade");
const Center=require("mofron-effect-position");
const HrzPos=require("mofron-effect-hrzpos");
const FSmooth=require("mofron-effect-fontsmooth");
const Margin=require("mofron-layout-margin");
const TFrame=require("mofron-comp-ttlframe");
const Grid=require("mofron-layout-grid");
const HrzCent=require("mofron-layout-hrzcenter");
const Code=require("mofron-comp-codeprettify");
const InputTxt=require("mofron-comp-inputtext");
const DropDown=require("mofron-comp-dropdown");
const Frame=require("mofron-comp-frame");
const Winona=require("mofron-comp-winona");
const VrtPos=require("mofron-effect-vrtpos");
const SampleCodes=require("../js/comp/SampleCodes.js");
const LoginForm=require("mofron-comp-loginform");
const Input=require("mofron-comp-input");
const Yoko=require("mofron-comp-yoko");
const Haruki=require("mofron-comp-haruki");
const CheckList=require("mofron-comp-checklist");
const Slide=require("mofron-effect-slide");
const TxtShadow=require("mofron-effect-textshadow");
const Horiz=require("mofron-layout-horizon");
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
    let smp_mod_evt = (cmp,val) => {
        try {
            let chd   = smp_mod.child()[1].child();
            let bname = smp_mod_sel.text()[smp_mod_sel.select()];
            let cbuf  = smp_mod.confmng("codebuf");
            if (null === cbuf) {
                return;
            }
    
            /* result button event */
            if (true === comutl.isinc(cmp,"Button")) {
                alert("mofron-comp-" + bname);
                return;
            }
    
            /* button visible */
            for (let cidx in chd) {
                chd[cidx].visible(false);
            }
            chd[smp_mod_sel.select()].visible(true);
    
            /* button select */
            cbuf = cbuf.replace(/@btn-name/g, "mofron-comp-" + bname);
    
            /* button width */
            for (let cidx in chd) {
                chd[cidx].width(smp_mod_wid.value() + "rem");
            }
            cbuf = cbuf.replace(/@btn-width/g, smp_mod_wid.value() + "rem");
    
            /* button height */
            for (let cidx in chd) {
                chd[cidx].height(smp_mod_hei.value() + "rem");
            }
            cbuf = cbuf.replace(/@btn-height/g, smp_mod_hei.value() + "rem");
    
            smp_mod.code(cbuf);
    
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    let smp_rep_evt = (cmp,val) => {
        try {
            let cbuf = smp_rep.confmng("codebuf");
            if (null === cbuf) {
                return;
            }
            
            let thm_name = smp_rep_sel.text()[smp_rep_sel.select()].text();
            thm_name     = thm_name.slice(0,1).toUpperCase() + thm_name.slice(1);
            let cls_tag  = "&lt;&#047;LoginForm&gt;";
            
            if ("smp_rep_sel" === cmp.name()) {
                if (0 === val) {
                    //rep = Input;
                    cbuf = cbuf.replace(/@inp-theme/g, cls_tag + "&#010;&#010;");
                    
                } else {
                    fetch("./sample/replace_theme.mf")
                    .then(resp => resp.text())
                    .then((data) => {
                        let sp_char = "";
                        for (let didx in data) {
                            if ("<" === data[didx]) {
                                sp_char += "&lt;";
                            } else if (">" === data[didx]) {
                                sp_char += "&gt;";
                            } else {
                                sp_char += data[didx];
                            }
                        }
                        if (1 === val) {
                            sp_char = sp_char.replace(/@inp-theme/g,"Yoko");
                        } else {
                            sp_char = sp_char.replace(/@inp-theme/g,"Haruki");
                        }
                        cbuf = cbuf.replace(/@inp-theme/g, sp_char);
                        smp_rep.code(cbuf);
                    }).catch(error => console.error(error));
                }
    
                let login_form = [lf1,lf2,lf3];
                for (let lf_idx in login_form) {
                    login_form[lf_idx].visible(false);
                }
                login_form[smp_rep_sel.select()].visible(true);
                
            } else if ("smp_rep" === cmp.name()) {
                cbuf = cbuf.replace(/@inp-theme/g, "&lt;&#047;LoginForm&gt;&#010;&#010;&#010;");
            }
            smp_rep.code(cbuf);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    let smp_eff_evt = (cmp,val) => {
        try {
            let cbuf = smp_eff.confmng("codebuf");
            if (null === cbuf) {
                return;
            }
            let code_eff = "";
            
            if (comutl.isinc(cmp,"CheckList")) {
    
                let chkbx = cmp.checkbox();
                for (let cb_idx in chkbx) {
                    smp_eff_txt.effect({ modname: chkbx[cb_idx].text() }).suspend(!val[cb_idx]);
                }
                if (false === val[2]) {
                    smp_eff_txt.style({ "text-shadow" : null });
                }
    
                for (let vidx in val) {
                    if (true === val[vidx]) {
                        code_eff += "        &lt;" + chkbx[vidx].text() + "&gt;&lt;&#047;" + chkbx[vidx].text() + "&gt;&#010;";
                    }
                }
                if ("" !== code_eff) {
                    code_eff = "&#010;    &lt;effect&gt;&#010;" + code_eff + "    &lt;&#047;effect&gt;";
                }
            }
            
            cbuf = cbuf.replace(/@effect/g, code_eff);
            smp_eff.code(cbuf);
            
            /* redisplay */
            smp_eff_txt.visible(false);
            setTimeout(() => {
                smp_eff_txt.visible(true);
            },500);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /* template */
    let feature=(feature_p)=>{let tpl0_0_0_0=new Text();let tpl0_0_0=new mofron.class.Component();let tpl0_0=new TFrame();let tpl0=new mofron.class.Component();tpl0_0_0.child([tpl0_0_0_0]);tpl0_0.child([tpl0_0_0]);tpl0.child([tpl0_0]);tpl0_0_0_0.config({size:"0.23rem",style:new mofron.class.ConfArg({'font-family':"Quicksand"},{lock:true}),text:feature_p.desc});tpl0_0_0.config({layout:new HrzCent(85),style:{'margin-top':"0.2rem",'margin-bottom':"0.2rem"}});let eff0=new HrzPos();tpl0_0.config({size:new mofron.class.ConfArg("90%",null),color:new mofron.class.ConfArg('#f0e6fa','#fffdff'),shadow:"0.02rem",text:new mofron.class.ConfArg(feature_p.title,{effect:new HrzPos()}),effect:eff0});return [tpl0];};
    /* component */
    let prjtop=new PrjTop();
    let cmp1_0_0=new Text("Feature");
    let cmp1_0_1=new mofron.class.Component();
    let cmp1_0=new mofron.class.Component();
    let cmp1_1_0=new Text("Sample");
    let smp_mod_0_0=new Button("Button");
    let smp_mod_0_1=new Ujarak("Button");
    let smp_mod_0_2=new Winona("Button");
    let smp_mod_0=new mofron.class.Component();
    let smp_mod=new SampleCodes();
    let lf1=new LoginForm();
    let lf2=new LoginForm();
    let lf3=new LoginForm();
    let smp_rep_0=new mofron.class.Component();
    let smp_rep=new SampleCodes();
    let smp_eff_txt=new Text();
    let smp_eff_0=new mofron.class.Component();
    let smp_eff=new SampleCodes();
    let cmp1_1=new mofron.class.Component();
    let cmp1_2_0=new PrjTop();
    let cmp1_2=new mofron.class.Component();
    let cmp1_3_0=new Text("Released under the MIT License");
    let cmp1_3=new Footer();
    let cmp1=new AppBase();
    let root_cmp=new mofron.class.Component();
    cmp1_0.child([cmp1_0_0,cmp1_0_1]);
    smp_mod_0.child([smp_mod_0_0,smp_mod_0_1,smp_mod_0_2]);
    smp_mod.child([smp_mod_0]);
    smp_rep_0.child([lf1,lf2,lf3]);
    smp_rep.child([smp_rep_0]);
    smp_eff_0.child([smp_eff_txt]);
    smp_eff.child([smp_eff_0]);
    cmp1_1.child([cmp1_1_0,smp_mod,smp_rep,smp_eff]);
    cmp1_2.child([cmp1_2_0]);
    cmp1_3.child([cmp1_3_0]);
    cmp1.child([prjtop,cmp1_0,cmp1_1,cmp1_2,cmp1_3]);
    root_cmp.child([cmp1]);
    prjtop.config({baseColor:'#fdf5fd',name:"prjtop",offset:"-50%",image:"./dist/img/logo_large.png",text:["Javascript framework with replaceable UI","as if you changing clothes"],button:new mofron.class.ConfArg("Get Started",{url:"./docs.html"})});
    cmp1_0_0.config({size:"0.45rem",effect:new HrzPos()});
    let lot2=new HrzCent(85);
    let lot3=new Margin("top","0.3rem");
    let lot4=new Grid([33.3,33.3,33.3]);
    cmp1_0_1.child(feature({"title":"Reusable","desc":"All components are made up of node modules.You just select a completed UI component from the list.You can build web page, even if you don’t have knowledge of the front end."}));
    cmp1_0_1.child(feature({"title":"Replaceable","desc":"UI components can be replaced.Just change the module name and it makes easy to change UI design and functions."}));
    cmp1_0_1.child(feature({"title":"Easy to use","desc":"The mofron has some utility functions such as 'event', 'effects' and 'layout'.You can build advanced design, even if you don’t have knowledge of the front end."}));
    cmp1_0_1.config({style:{'margin-top':"0.3rem"},accessConf:new mofron.class.ConfArg({config:{layout:[lot2,lot3]},access:{orientation:"portrait"}},{config:{layout:lot4},access:{device:["default","tablet"]}}),});
    cmp1_0.config({width:'100%'});
    cmp1_1_0.config({size:"0.45rem",font:"Iceland",effect:new HrzPos()});
    smp_mod_0.config({theme:{Button:{config:{clickEvent:smp_mod_evt,style:{'margin':"0.9rem"},color:new mofron.class.ConfArg("#787878","#f0e6fa","#3f51b5")}}}});
    let smp_mod_sel=new DropDown();
    smp_mod_sel.config({name:"smp_mod_sel",effect:new VrtPos(),changeEvent:smp_mod_evt,size:new mofron.class.ConfArg("1rem","0.3rem"),text:["button","ujarak","winona"]});
    let smp_mod_wid=new InputTxt();
    smp_mod_wid.config({name:"smp_mod_wid",width:"0.8rem",type:"number",horizon:true,changeEvent:smp_mod_evt,label:"width:",value:1.5,suffix:"rem"});
    let smp_mod_hei=new InputTxt();
    smp_mod_hei.config({name:"smp_mod_hei",width:"0.8rem",type:"number",horizon:true,changeEvent:smp_mod_evt,label:"height:",value:0.35,suffix:"rem"});
    smp_mod.config({name:"smp_mod",src:"./dist/index/sample/module.mf",loadEvent:smp_mod_evt,desc:new mofron.class.ConfArg(["In mofron, it builds the UI with components declared as tags.","When you pass parameters to a component, you add tag attributes or child elements","Components defined as modules are reusable and you can easily switch components.","The sample shows how to use the basic button components and how to switch between the three types of buttons."],{font:"Quicksand"}),edit:[smp_mod_sel,smp_mod_wid,smp_mod_hei]});
    lf1.config({name:"lf1"});
    lf2.config({name:"lf2",visible:false,theme:{Input:{replace:Yoko}}});
    lf3.config({name:"lf3",visible:false,theme:{Input:{replace:Haruki}}});
    smp_rep_0.config({theme:{LoginForm:{config:{color:new mofron.class.ConfArg("#787878","#f0e6fa","#3f51b5")}}}});
    let smp_rep_sel=new DropDown();
    smp_rep_sel.config({name:"smp_rep_sel",effect:new VrtPos(),horizon:true,changeEvent:smp_rep_evt,label:"theme:",size:new mofron.class.ConfArg("2rem","0.3rem"),text:["Input","Yoko","Haruki"]});
    smp_rep.config({name:"smp_rep",src:"./dist/index/sample/replace.mf",loadEvent:smp_rep_evt,desc:["Theme features provide a powerful component replacement.","You can also replace the contents of components that have already been defined.","The sample replaces the Input component defined inside the login form."],edit:smp_rep_sel});
    let eff5=new HrzPos();
    let eff6=new Fade();
    eff6.config({suspend:true});
    let eff7=new Slide("left","0.1rem");
    eff7.config({suspend:true,speed:700});
    let eff8=new TxtShadow();
    eff8.config({suspend:true});
    smp_eff_txt.config({name:"smp_eff_txt",text:"Effect Sample",size:"0.3rem",style:{'margin-top':"0.6rem"},effect:[eff5,eff6,eff7,eff8]});
    let cmp9=new CheckList();
    let lot10=new Horiz();
    let lot11=new Margin("left","0.3rem");
    cmp9.config({checkbox:"Fade"});
    cmp9.config({checkbox:"Slide"});
    cmp9.config({checkbox:"TextShadow"});
    cmp9.config({changeEvent:smp_eff_evt,layout:[lot10,lot11]});
    smp_eff.config({name:"smp_eff",src:"./dist/index/sample/effect.mf",loadEvent:smp_eff_evt,desc:["You can specify a style for components, but the effects module is useful if you want to apply a more complex style.","You can flexibly configure components by applying effects according to your purpose."],edit:cmp9});
    let lot12=new HrzCent(70);
    let lot13=new Margin("top","0.5rem");
    cmp1_1.config({theme:{Text:{config:{color:'#787878'}}},layout:[lot12,lot13]});
    cmp1_2_0.config({baseColor:'#fdf5fd',height:"2rem",image:"./dist/img/logo_large.png",button:new mofron.class.ConfArg("Get Started",{url:"./docs.html"})});
    cmp1_2.config({style:{'margin-top':"0.2rem"}});
    cmp1_3_0.config({color:'#787878',size:"0.3rem",effect:new Center()});
    cmp1_3.config({height:"0.8rem",baseColor:'#f0e6fa',style:{'display':"flex"}});
    let cmp14=new Link("Document");
    cmp14.config({url:new mofron.class.ConfArg("./docs.html",true),size:"0.25rem"});
    let cmp15=new Icon("fab fa-github");
    cmp15.config({link:new mofron.class.ConfArg('https://github.com/mofron/mofron',true),size:"0.35rem"});
    let cmp16=new Icon("fab fa-twitter");
    cmp16.config({link:new mofron.class.ConfArg('https://twitter.com/mofronjs',true),size:"0.35rem"});
    cmp1.config({color:new mofron.class.ConfArg('#f0e6fa','#fafafa'),title:new mofron.class.ConfArg("mofron","./dist/img/logo_small.png"),header:new mofron.class.PullConf({navi:new mofron.class.ConfArg([cmp14,cmp15,cmp16],{layout:new Margin('left','0.2rem'),style:{'display':"flex",'align-items':"center"}})})});
    let eff17=new Fade(true,3000);
    let eff18=new FSmooth();
    root_cmp.config({effect:[eff17,eff18],theme:{Text:{config:{color:'#787878',font:"Iceland"},ignore:"smp_rep"},Button:{replace:Ujarak,config:{baseColor:"#f0e6fa"},ignore:"smp_rep"}}});

    /* script (before) */

    /* start visible */
    root_cmp.visible(true,() => {try{

        /* script (after) */

    }catch(e){console.error(e.stack);}});
} catch (e) {
    console.error(e.stack);
}
