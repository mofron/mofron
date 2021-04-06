/**
 * @file mofron-comp-{@comp-name}/index.js
 * @brief component module template for developper
 * @license MIT
 */
const Code = require("mofron-comp-codeprettify");

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (key-value) component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("DocCode");
            
	    this.shortForm("text");

	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            
	    this.width("100%");
	    this.baseColor("#2d2d2d");
	    this.style({ "padding" : "0.2rem" });
            
	    //this.child(this.code());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    afterRender () {
        try {
            super.afterRender();
            PR.prettyPrint();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    src (prm) {
        try {
	    let dcode = this;
            fetch(prm)
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
		    dcode.text(sp_char,"xml");
                }).catch(error => console.error(error));
	} catch (e) {
             console.error(e.stack);
             throw e;
	}
    }

    text (prm,lng) {
        try {
	    let code = new Code({ baseColor: "#2d2d2d", text: prm });
	    code.lang((undefined !== lng) ? lng : "bsh");
	    code.rootDom()[0].style({
                "padding-left": "0.1rem",
                "padding-right": "0.1rem"
            });
            this.child(code);
            PR.prettyPrint();
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
