/**
 * @file mofron-comp-{@comp-name}/index.js
 * @brief component module template for developper
 * @license MIT
 */
const Margin   = require("mofron-layout-margin");
const Code     = require("mofron-comp-codeprettify");
const Grid     = require("mofron-layout-grid");
const TFrame   = require("mofron-comp-ttlframe");
const Text     = require("mofron-comp-text");
const HrzPos   = require("mofron-effect-hrzpos");
const PullConf = mofron.class.PullConf;
const ConfArg  = mofron.class.ConfArg;

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
            this.modname("SampleCodes");
            
            /* init config */
            this.confmng().add("src",     { type: "string" });
	    this.confmng().add("codebuf", { type: "string" });
	    this.confmng().add("loadEvent", { type: 'event', list: true });
            
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
	    /* contents wrap */
            let cw = new mofron.class.Component({
                         layout: new Grid([65,35]),
			 style: { "margin-top": "0.2rem" }
	             });
            let conts = new mofron.class.Component({
	                    baseColor: [253,253,253]
	                });
            cw.child([this.codeComp(),conts]);
            
	    this.child([this.descWrap(), this.editWrap(), cw]);
	    this.childDom(conts.childDom());
            
	    let tfrm = new TFrame({
	        mainColor: "#f0e6fa",
		style: { "overflow": "scroll" },
                title:  new ConfArg(
		            new Text({ text: "Result", font: "Iceland", size: "0.25rem" }),
			    "0.2rem"
                        ),
                header: new PullConf({ height: "0.3rem" }),
                size:   new ConfArg("100%","100%")
            })
	    this.child(tfrm);

	    this.childDom(tfrm.childDom());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    beforeRender () {
        try {
            super.beforeRender();

	    let sample_code = this;
	    fetch(this.src())
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
		    sample_code.confmng("codebuf",sp_char);
		    let levt = sample_code.loadEvent();
                    for (let lidx in levt) {
                        levt[lidx][0](sample_code,sp_char);
		    }
		}).catch(error => console.error(error));
	} catch (e) {
            console.error(e.stack);
	    throw e;
	}
    }
    
    descWrap (prm) {
        try {
	    if (undefined !== prm) {
                prm.style({ "margin-bottom" : "0.3rem" });
	    }
            return this.innerComp("descWrap", prm, mofron.class.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    desc (prm,cnf) {
        try {
            if (undefined !== prm) {
	        if (true === Array.isArray(prm)) {
                    for (let pidx in prm) {
                        this.desc(prm[pidx]);
		    }
		    return;
		}

	        let dsc = new Text({
		              text: prm, size: "0.2rem", //layout: new HrzPos(),
			      style: { "text-align" : "left" },
			  });
		dsc.config(cnf);
                this.descWrap().child(dsc);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * edit wrap component
     * 
     * @param (Component) wrap component
     * @type private
     */
    editWrap (prm) {
        try {
            if (undefined !== prm) {
                prm.config({
		    style: { display: "flex" },
		    layout: new Margin("left","0.2rem"),
		    //theme: {Text:{config:{color:'#787878'}}}
		});
	    }
	    return this.innerComp("editWrap", prm, mofron.class.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * edit components
     * 
     * @param (array) contents list
     * @type parameter
     */
    edit (prm) {
        try {
            this.editWrap().child(prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    codeComp (prm) {
        try {
	    if (undefined !== prm) {
                prm.config({ baseColor: "#2d2d2d" });
	    }
	    return this.innerComp("codeComp", prm, mofron.class.Component);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    src (prm) {
        try {
            return this.confmng("src", prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * code contents
     * 
     * @param (string)
     */
    code (prm) {
        try {
            if (0 < this.codeComp().child().length) {
                this.codeComp().child()[0].destroy();
	    }
	    let code = new Code({ baseColor: "#2d2d2d", lang: "xml", text: prm });
	    code.rootDom()[0].style({
	        "padding-left": "0.1rem",
		"padding-right": "0.1rem"
            });
            this.codeComp().child(code);
            PR.prettyPrint();
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    mainColor (prm,opt) {
        try {
            return this.child()[0].mainColor(prm,opt);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    loadEvent (fnc, prm) {
        try {
            return this.confmng(
	        "loadEvent", (undefined === fnc) ?  undefined:[fnc,prm]
            );
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

}
/* end of file */
