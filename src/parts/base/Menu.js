/**
 * @file   Menu.js
 * @author simpart
 */

mofron.parts.Menu = class extends mofron.parts.Component {
    
    addElement(elm, cbf, cbp) {
        try {
            var style = new mofron.other.Styles(elm);
            style.style('cursor', 'pointer');
            
            var cl_evt = new mofron.event.Click();
            cl_evt.setCbfunc(function(){
                alert("click test");
            },null);
            elm.addEvent(cl_evt);
            //var cl_evt = new mofron.event.Click(elm);
            //cl_evt.setEvent(cbf,cbp);
            
            this.addChild(elm);
        } catch (e) {
            conole.error(e.stack);
            throw e;
        }
    }
    
//    initConts (disp) {
//        try {
//            super.initConts(disp);
//            
//        } catch (e) {
//            console.error(e.stack);
//            throw e;
//        }
//    }
}
/* end of file */
