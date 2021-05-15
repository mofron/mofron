
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
