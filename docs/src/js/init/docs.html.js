require('expose-loader?app!../conf/namesp.js');
const mf=require('mofron');
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

    let set_comp=];
    app.root.child(set_comp)
    app.root.visible(true);

} catch (e) {
    console.error(e.stack);
}
