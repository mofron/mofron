/**
 * @file   Menu.js
 * @author simpart
 */

mofron.parts.Menu = class extends mofron.parts.Component {
    
    addElement(elm, cbf, cbp) {
        try {
            var tgt_sel = elm.getTarget().split(' ');
            var ext_sel = '';
            if (1 < tgt_sel.length) {
                ext_sel = ' ' + tgt_sel[1];
            }
            var style = new mofron.other.Styles(elm, ext_sel);
            style.style('cursor', 'pointer');
            
            var cl_evt = new mofron.event.Click();
            cl_evt.setCbfunc(cbf,cbp);
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
