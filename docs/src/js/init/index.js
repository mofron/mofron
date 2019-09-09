require('expose-loader?app!../conf/namesp.js');
const mf=require('mofron');
const Text=require("mofron-comp-text");
const AppBase=require("mofron-comp-appbase");
const Fade=require("mofron-effect-fade");
const Link=require("mofron-comp-linktxt");
const Icon=require("mofron-comp-aweicon");
const Prjtop=require("mofron-comp-prjtop");
const Image=require("mofron-comp-image");
const Footer=require("mofron-comp-footer");
const evLink=require("mofron-event-link");
const Shadow=require("mofron-effect-shadow");
const Hrzpos=require("mofron-effect-hrzpos");
const Vrtpos=require("mofron-effect-vrtpos");
const Margin=require("mofron-layout-margin");
const TtlFrame=require("mofron-comp-ttlframe");
const Button=require("mofron-comp-button");
const Dialog=require("mofron-comp-dialog");
const SlideShare=require("mofron-comp-slideshare");
const Padding=require("mofron-layout-padding");
const HrzCent=require("mofron-layout-hrzcenter");
const Grid=require("mofron-layout-grid");
const efHrzcnt=require("mofron-effect-hrzcenter");
try {
    let isdef=[false,false];
    let buf="";
    mf.fsize={};
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
            mf.func.addHeadStyle('@media screen and (orientation:portrait){html{font-size:1100%;}}');
            mf.fsize.vertical='1100%';
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen and (orientation:portrait){html{font-size:1100%;}}');
        }
    }
    if ("mobile"===mf.func.devType()){
        if(true===isdef[0]){
            document.documentElement.setAttribute("style","");
            mf.func.addHeadStyle('@media screen and (orientation:landscape){html{font-size:800%;}}');
            mf.fsize.horizon='800%';
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen and (orientation:landscape){html{font-size:800%;}}');
        }
    }
    if ("tablet"===mf.func.devType()){
        if(true===isdef[0]){
            document.documentElement.setAttribute("style","");
            mf.func.addHeadStyle('@media screen{html{font-size:800%;}}');
            mf.fsize.vertical='800%';
            mf.fsize.horizon='800%';
        }else{
            buf=document.documentElement.getAttribute("style");
            mf.func.addHeadStyle('buf+@media screen{html{font-size:800%;}}');
        }
    }
    let what_btn_clk=(p1,p2,p3)=>{try{
    let tag     = p1.tag();
    let scr_val = 0;
    /* switch visible of slide */slide_mod.visible(false);
    slide_rep.visible(false);
    slide_utl.visible(false);
    if (undefined !== tag["Module Based"]) {slide_mod.visible(true);
    dtldlg.visible(true);
    } else if (undefined !== tag["Replaceable"]) {slide_rep.visible(true);
    dtldlg.visible(true);
    } else if (undefined !== tag["Utility Functions"]) {slide_utl.visible(true);
    dtldlg.visible(true);
    };
    }catch(e){console.error(e.stack);throw e;}};
    let ftframe=(p)=>{let tcmp1=new mf.Component();let tcmp2=new TtlFrame();let tcmp3=new mf.Component();let tcmp4=new Text();let tcmp5=new Button();tcmp1.child([tcmp2]);tcmp2.child([tcmp3,tcmp5]);tcmp3.child([tcmp4]);tcmp1.option({tag:p.title});tcmp2.option({effect:new efHrzcnt(90),color:[['#f0e6fa',{locked:true,forced:true}],['#fffdff',{locked:true,forced:true}],[,{locked:true,forced:true}]],shadow:"0.015rem",style:[{'padding-bottom':'0.2rem','height':'null'},{locked:true,forced:true}],title:new Text({prmOpt: p.title,effect:new Hrzpos("center"),fsize:"0.35rem"})});tcmp3.option({layout:new HrzCent(85),style:[{'margin-top':'0.2rem'},{locked:true,forced:true}]});tcmp4.option({prmOpt: p.desc,fsize:"0.23rem",style:[{'font-family':'Quicksand'},{locked:true,forced:true}]});tcmp5.option({objkey: p.btn_name,height:"0.35rem",effect:new efHrzcnt(50),accentColor:[[240,230,250],{locked:true,forced:true}],clickEvent:what_btn_clk,style:[{'margin-top':'0.2rem'},{locked:true,forced:true}],text:new Text({prmOpt: "Detail",color:['#0073bb',{locked:true,forced:true}]})});return [tcmp1];};
    let cmp0_1=new AppBase();
    let prjtop=new Prjtop();
    let Whats_cmp0_1=new mf.Component();
    let Whats_cmp0_2=new Text();
    let Whats_cmp0_3=new mf.Component();
    let dtldlg=new Dialog();
    let slide_mod=new SlideShare();
    let slide_rep=new SlideShare();
    let slide_utl=new SlideShare();
    Whats_cmp0_1.child([Whats_cmp0_2,Whats_cmp0_3]);
    Whats_cmp0_3.child(ftframe({title:"Module Based",btn_name:"modbase_btn",desc:"All components are made up of node modules.You just select a completed UI component from the list.You can build web page, even if you don’t have knowledge of the front end."}));
    Whats_cmp0_3.child(ftframe({title:"Replaceable",btn_name:"repl_btn",desc:"UI components can be replaced.Just change the module name and it makes easy to change UI design and functions."}));
    Whats_cmp0_3.child(ftframe({title:"Utility Functions",btn_name:"utlfnc_btn",desc:"The mofron has some utility functions such as 'effects' and 'layout'.You can build advanced design, even if you don’t have knowledge of the front end."}));
    dtldlg.child([slide_mod,slide_rep,slide_utl]);
    Whats_cmp0_1.option({baseColor:[[250,250,250],{locked:true,forced:true}],layout:[new Padding('top','0.2rem',false)],width:['100%',{locked:true}]});
    Whats_cmp0_2.option({prmOpt: "Feature",effect:new Hrzpos('center'),fsize:"0.5rem",font:"Iceland"});
    Whats_cmp0_3.option({effect:new efHrzcnt(90),respsv:{mobile:[{},{layout:[new Margin({prmOpt: new mf.Param("top","0.2rem")})]}],other:[{},{layout:[new Grid({prmOpt: [33.3,33.3,33.3]})]}]}});
    dtldlg.option({fsize:["5rem","4rem"],objkey: "dtldlg",modal:new mf.Option({effect:[new Fade({prmOpt: new mf.Param(true,300)}),new Fade({prmOpt: new mf.Param(false,300),eid:1})]}),effect:[new Fade({prmOpt: new mf.Param(true,300)}),new Fade({prmOpt: new mf.Param(false,300),eid:1})]});
    slide_mod.option({objkey: "slide_mod",src:"//www.slideshare.net/slideshow/embed_code/key/FEMhsyd6vq2yTt",width:["100%",{locked:true}],height:["100%",{locked:true}],frameborder:"0",marginwidth:"0",marginheight:"0",scrolling:"no",style:[{'border-width':'1px','max-width':'100%'},{locked:true,forced:true}],visible:false});
    slide_rep.option({objkey: "slide_rep",src:"//www.slideshare.net/slideshow/embed_code/key/1mlaDQYdlDnfwo",width:["100%",{locked:true}],height:["100%",{locked:true}],frameborder:"0",marginwidth:"0",marginheight:"0",scrolling:"no",style:[{'border-width':'1px','max-width':'100%'},{locked:true,forced:true}],visible:false});
    slide_utl.option({objkey: "slide_utl",src:"//www.slideshare.net/slideshow/embed_code/key/yJNyDxiyf5JUQA",width:["100%",{locked:true}],height:["100%",{locked:true}],frameborder:"0",marginwidth:"0",marginheight:"0",scrolling:"no",style:[{'border-width':'1px','max-width':'100%'},{locked:true,forced:true}],visible:false});

    let cmp1_1=new Footer();
    let cmp1_2=new Text();
    cmp0_1.child([prjtop,Whats_cmp0_1,dtldlg]);
    cmp1_1.child([cmp1_2]);
    cmp0_1.option({color:['#f0e6fa',{locked:true,forced:true}],effect:[new Fade(true,1000)],style:[{'-webkit-font-smoothing':'antialiased','-moz-osx-font-smoothing':'grayscale','padding-bottom':'0.4rem'},{locked:true,forced:true}],theme:{Text:{color:'#787878',font:"Iceland"}},title:new mf.Param("mofron","./img/logo.png"),background:new mf.Component({baseColor:['#fafafa',{locked:true,forced:true}]}),header:new mf.Option({navi:new mf.Component({child:[new Link({prmOpt: "Document",url:['./docs.html',true],fsize:"0.25rem"}),new Icon({prmOpt: "fab fa-github",link:['https://github.com/mofron/mofron',true],fsize:"0.35rem"}),new Icon({prmOpt: "fab fa-twitter",link:['https://twitter.com/mofronjs',true],fsize:"0.35rem"})],layout:[new Margin('left','0.2rem')],style:[{'display':'flex'},{locked:true,forced:true}]})})});
    prjtop.option({baseColor:['#fdf5fd',{locked:true,forced:true}],objkey: "prjtop",offset:"-40%",image:new Image({prmOpt: "./img/mofron_tp.png",fsize:["2.5rem","2.5rem"]}),text:"Selectable UI as if you try clothes.",button:new mf.Param("Get Started","./docs.html")});
    cmp1_1.option({color:[['#bebebe',{locked:true,forced:true}],['#f0e6fa',{locked:true,forced:true}],[,{locked:true,forced:true}]],height:["1rem",{locked:true}],style:[{'display':'flex'},{locked:true,forced:true}]});
    cmp1_2.option({color:['#787878',{locked:true,forced:true}],fsize:"0.3rem",effect:[new Hrzpos({prmOpt: "center"}),new Vrtpos({prmOpt: "center"})],text:"Released under the MIT License"});

    let set_comp=[cmp0_1,cmp1_1];
    app.root.child(set_comp)
    app.root.visible(true);

} catch (e) {
    console.error(e.stack);
}
