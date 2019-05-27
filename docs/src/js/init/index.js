require('expose-loader?app!../conf/namesp.js');
const mf=require('mofron');
const Text=require("mofron-comp-text");
const Link=require("mofron-comp-linktxt");
const Appbs=require("mofron-comp-appbase");
const Prjtop=require("mofron-comp-prjtop");
const Image=require("mofron-comp-image");
const TtlFrame=require("mofron-comp-ttlframe");
const Frame=require("mofron-comp-frame");
const Button=require("mofron-comp-ujarakbtn");
const Icon=require("mofron-comp-fontawesome");
const Footer=require("mofron-comp-footer");
const Synchei=require("mofron-effect-synchei");
const Syncwin=require("mofron-effect-syncwin");
const Synwwid=require("mofron-effect-synwwid");
const Shadow=require("mofron-effect-shadow");
const Hrzpos=require("mofron-effect-hrzpos");
const Vrtpos=require("mofron-effect-vrtpos");
const Fade=require("mofron-effect-fade");
const efHrzcnt=require("mofron-effect-hrzcenter");
const Padding=require("mofron-layout-padding");
const Grid=require("mofron-layout-grid");
const HrzCent=require("mofron-layout-hrzcenter");
const Margin=require("mofron-layout-margin");
const loHoriz=require("mofron-layout-horizon");
const evLink=require("mofron-event-link");
const SlideShare=require("../comp/SlideShare.js");
try {
    let isdef=[false,false];
    let buf="";
    if(null===document.body.getAttribute('style')){
        isdef[0]=true;
        document.body.setAttribute('style','margin:0px;padding:0px;font-size:0.16em;');
    }
    if(null===document.documentElement.getAttribute('style')){
        isdef[1]=true;
        document.documentElement.setAttribute('style','font-size:625%;');
    }
    if ("mobile"===mf.func.devType()){
        if(true===isdef[0]){
            document.documentElement.setAttribute("style","");
            mf.func.addHeadStyle('@media screen and (orientation:portrait){html{font-size:800%;}}');
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen and (orientation:portrait){html{font-size:800%;}}');
        }
    }
    if ("mobile"===mf.func.devType()){
        if(true===isdef[0]){
            document.documentElement.setAttribute("style","");
            mf.func.addHeadStyle('@media screen and (orientation:landscape){html{font-size:1400%;}}');
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen and (orientation:landscape){html{font-size:1400%;}}');
        }
    }
    if ("tablet"===mf.func.devType()){
        if(true===isdef[0]){
            document.documentElement.setAttribute("style","");
            mf.func.addHeadStyle('@media screen{html{font-size:800%;}}');
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen{html{font-size:800%;}}');
        }
    }
    if(window.navigator.userAgent.indexOf('iPhone') > 0){
        if(true===isdef[0]){
            document.documentElement.setAttribute("style","");
            mf.func.addHeadStyle('@media screen{html{font-size:3000%;}}');
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen{html{font-size:3000%;}}');
        }
    }
    let what_btn_clk=(p1,p2,p3)=>{try {let tag     = p1.tag();let scr_val = 0;if (undefined !== tag["Module Based"]) {mf.objkey.dtl_modsb.target().getRawDom().scrollIntoView(true);} else if (undefined !== tag["Replaceable"]) {mf.objkey.dtl_repl.target().getRawDom().scrollIntoView(true);} else if (undefined !== tag["Utility Functions"]) {mf.objkey.dtl_utlfnc.target().getRawDom().scrollIntoView(true);}} catch (e) {console.error(e.stack);throw new Error(e.stack);}};
    let ftframe=(p)=>{let tcmp1=new mf.Component();let tcmp2=new TtlFrame();let tcmp3=new mf.Component();let tcmp4=new Text();let tcmp5=new Button();tcmp1.child([tcmp2]);tcmp2.child([tcmp3,tcmp5]);tcmp3.child([tcmp4]);tcmp1.option({tag:p.title});tcmp2.option({objkey: p.frm_name,effect:new efHrzcnt(90),mainColor:[[240,230,250],{locked:true,forced:true}],baseColor:[[255,253,255],{locked:true,forced:true}],shadow:"0.015rem",style:{'padding-bottom':'0.2rem','height':'null'},title:new Text({text: p.title,effect:new Hrzpos("center"),size:"0.25rem",style:{'margin-top':'0.1rem'}})});tcmp3.option({layout:new HrzCent(85),style:{'margin-top':'0.2rem'}});tcmp4.option({text: p.desc,size:"0.18rem"});tcmp5.option({objkey: p.btn_name,height:"0.35rem",effect:new efHrzcnt(50),accentColor:[[240,230,250],{locked:true,forced:true}],clickEvent:what_btn_clk,style:{'margin-top':'0.2rem'},text:new Text({text: "Detail",size:"0.2rem",mainColor:["#0073bb",{locked:true,forced:true}]})});return [tcmp1];};
    let cmp0_1=new Appbs();
    let prjtop=new Prjtop();
    let Why_cmp0_1=new mf.Component();
    let Why_cmp0_2=new Text();
    let Why_cmp0_3=new Frame();
    let Why_cmp0_4=new mf.Component();
    let Why_cmp0_5=new Text();
    let Why_cmp0_6=new Text();
    let Why_cmp0_7=new Text();
    Why_cmp0_1.child([Why_cmp0_2,Why_cmp0_3]);
    Why_cmp0_3.child([Why_cmp0_4]);
    Why_cmp0_4.child([Why_cmp0_5,Why_cmp0_6,Why_cmp0_7]);
    Why_cmp0_1.option({baseColor:[[250,250,250],{locked:true,forced:true}],layout:[new Padding('top','0.2rem',false)],width:'100%'});
    Why_cmp0_2.option({text: "Why do we need a mofron ?",effect:new Hrzpos('center'),size:'0.35rem'});
    Why_cmp0_3.option({effect:new efHrzcnt(65),layout:new HrzCent(85),mainColor:[[240,230,250],{locked:true,forced:true}],baseColor:[[255,253,255],{locked:true,forced:true}],shadow:'0.015rem',style:{'padding-bottom':'0.2rem','height':'null'}});
    Why_cmp0_4.option({});
    Why_cmp0_5.option({text: "Today web development is tiresome for a sofware engineer. because it must need various things other than programming. For example, design and devices and browser and more...",size:"0.2rem"});
    Why_cmp0_6.option({text: "css tuning and UI/UX design are very important. however, it is a load for a non web designer.",size:"0.2rem"});
    Why_cmp0_7.option({text: "mofron aims to relieve the load of software engineers.",size:"0.2rem"});

    let Whats_cmp0_1=new mf.Component();
    let Whats_cmp0_2=new Text();
    let Whats_cmp0_3=new mf.Component();
    Whats_cmp0_1.child([Whats_cmp0_2,Whats_cmp0_3]);
    Whats_cmp0_3.child(ftframe({title:"Module Based",btn_name:"modbase_btn",desc:"All components are made up of node modules. It makes simple to build a web page."}));
    Whats_cmp0_3.child(ftframe({title:"Replaceable",btn_name:"repl_btn",desc:"UI components can be replaced. This feature will minimize the impact on design and feature changes. For example, it makes easy to shift from mockup to production."}));
    Whats_cmp0_3.child(ftframe({title:"Utility Functions",btn_name:"utlfnc_btn",desc:"The mofron has some utility functions such as 'effects' and 'layout'. it makes easy to build a web page without JS and CSS."}));
    Whats_cmp0_1.option({baseColor:[[250,250,250],{locked:true,forced:true}],layout:[new Padding('top','0.2rem',false)],width:'100%'});
    Whats_cmp0_2.option({text: "What is a mofron?",effect:new Hrzpos('center'),size:'0.35rem'});
    Whats_cmp0_3.option({effect:new efHrzcnt(90),respsv:{mobile:[{},{layout:[new Margin("top","0.2rem")]}],other:[{},{layout:[new Grid([33.3, 33.3, 33.3])]}]}});

    let Detail_cmp0_1=new mf.Component();
    let Detail_cmp0_2=new mf.Component();
    let dtl_modsb=new Text();
    let Detail_cmp0_3=new SlideShare();
    let Detail_cmp0_4=new mf.Component();
    let dtl_repl=new Text();
    let Detail_cmp0_5=new SlideShare();
    let Detail_cmp0_6=new mf.Component();
    let dtl_utlfnc=new Text();
    let Detail_cmp0_7=new SlideShare();
    Detail_cmp0_1.child([Detail_cmp0_2,Detail_cmp0_4,Detail_cmp0_6]);
    Detail_cmp0_2.child([dtl_modsb,Detail_cmp0_3]);
    Detail_cmp0_4.child([dtl_repl,Detail_cmp0_5]);
    Detail_cmp0_6.child([dtl_utlfnc,Detail_cmp0_7]);
    Detail_cmp0_1.option({layout:[new Padding('top','0.4rem',false)]});
    Detail_cmp0_2.option({baseColor:[[250,250,250],{locked:true,forced:true}],width:'100%'});
    dtl_modsb.option({text: "Module Based",objkey: "dtl_modsb",effect:new Hrzpos('center'),size:'0.35rem'});
    Detail_cmp0_3.option({effect:new Hrzpos('center'),src:"//www.slideshare.net/slideshow/embed_code/key/FEMhsyd6vq2yTt",width:"595",height:"485",frameborder:"0",marginwidth:"0",marginheight:"0",scrolling:"no",style:{'border':'1pxsolid#CCC','border-width':'1px','max-width':'100%'}});
    Detail_cmp0_4.option({baseColor:[[250,250,250],{locked:true,forced:true}],width:'100%'});
    dtl_repl.option({text: "Replaceable",objkey: "dtl_repl",effect:new Hrzpos('center'),size:'0.35rem'});
    Detail_cmp0_5.option({effect:new Hrzpos('center'),src:"//www.slideshare.net/slideshow/embed_code/key/1mlaDQYdlDnfwo",width:"595",height:"485",frameborder:"0",marginwidth:"0",marginheight:"0",scrolling:"no",style:{'border':'1pxsolid#CCC','border-width':'1px','max-width':'100%'}});
    Detail_cmp0_6.option({baseColor:[[250,250,250],{locked:true,forced:true}],width:'100%',style:{'padding-bottom':'0.5rem'}});
    dtl_utlfnc.option({text: "Utility Functions",objkey: "dtl_utlfnc",effect:new Hrzpos('center'),size:'0.35rem'});
    Detail_cmp0_7.option({effect:new Hrzpos('center'),src:"//www.slideshare.net/slideshow/embed_code/key/yJNyDxiyf5JUQA",width:"595",height:"485",frameborder:"0",marginwidth:"0",marginheight:"0",scrolling:"no",style:{'border':'1pxsolid#CCC','border-width':'1px','max-width':'100%'}});

    let cmp1_1=new mf.Component();
    let cmp1_2=new Frame();
    let cmp1_3=new Image();
    let cmp1_4=new Text();
    let cmp2_1=new Footer();
    let cmp2_2=new Text();
    cmp0_1.child([prjtop,Why_cmp0_1,Whats_cmp0_1,Detail_cmp0_1]);
    cmp1_1.child([cmp1_2]);
    cmp1_2.child([cmp1_3,cmp1_4]);
    cmp2_1.child([cmp2_2]);
    cmp0_1.option({title:'mofron',mainColor:[[240,230,250],{locked:true,forced:true}],effect:[new Fade(true,1000)],theme:{Text:{mainColor:[120,120,120]}},header:new mf.Option({logo:'./img/logo.png',effect:new Shadow({blur:'0.4rem'}),navi:[new Link({text: "Docs",size:'0.2rem',url:['./',true ]}),new Icon({text: "fab fa-github",size:'0.35rem',event:[new evLink(['https://github.com/mofron/mofron',true])]}),new Icon({text: "fab fa-twitter",size:'0.35rem',event:[new evLink(['https://twitter.com/mofronjs',true])]})]})});
    prjtop.option({baseColor:[[253,245,253],{locked:true,forced:true}],button:'Get Started',effect:[new Syncwin([true,true],['0px','-50%'])],objkey: "prjtop",theme:{Button:[Button,{accentColor:[240,230,250]}]},text:new mf.Option({text: "The module based frontend framework.",size:'0.4rem',style:{'z-index':'10'}})});
    cmp1_1.option({baseColor:[[250,250,250],{locked:true,forced:true}],style:{'padding-bottom':'0.5rem'},respsv:{mobile:[{},{layout:[new HrzCent(95)]}],other:[{},{layout:[new HrzCent(35)]}]}});
    cmp1_2.option({baseColor:[[253,245,253],{locked:true,forced:true}],effect:new Hrzpos("center"),layout:new loHoriz(),shadow:"0.015rem",event:[new evLink("https://github.com/mofron/mofron")]});
    cmp1_3.option({path:"./img/logo.png",height:"1rem",style:{'margin-left':'0.8rem'}});
    cmp1_4.option({text: "Get Started",size:"0.2rem",mainColor:[[120,120,120],{locked:true,forced:true}],effect:new Vrtpos("center"),style:{'margin-left':'0.3rem'}});
    cmp2_1.option({mainColor:[[190,190,190],{locked:true,forced:true}],baseColor:[[240,230,250],{locked:true,forced:true}],height:"1rem"});
    cmp2_2.option({text: "Released under the MIT License",effect:new Hrzpos("center"),style:{'margin-top':'0.2rem'},mainColor:[[120,120,120],{locked:true,forced:true}],size:"0.18rem"});

    let set_comp=[cmp0_1,cmp1_1,cmp2_1];
    app.root.child(set_comp)
    app.root.visible(true);

} catch (e) {
    console.error(e.stack);
}
