/**
 * @file basestyle.js
 * @brief styel sheet define for html,body 
 * @author simpart
 */
const mf = require('mofron');
let thisobj = null;

try {
    if (null !== thisobj) {
        module.exports = thisobj;
    }
    
    thisobj = {
        html : {
            base : {},
            default : {
                'font-size' : '625%'
            },
            mobile  : {
                horizon  : { 'font-size' : '800%' },
                vertical : { 'font-size' : '1200%' }
            },
            tablet  : {
                horizon  : { 'font-size' : '800%' },
                vertical : { 'font-size' : '1000%' }
            }
        },
        body : {
            base : {
                'margin'    : '0px',
                'padding'   : '0px',
                'font-size' : '0.16em'
            },
            default : {},
            mobile  : {
                horizon  : {},
                vertical : {}
            },
            tablet  : {
                horizon  : {},
                vertical : {}
            }
        },
        
        init    : (p1, p2) => {
            try {
                let dtype     = mf.func.devType();
                let set_style = thisobj.get_style(
                    (true === mf.func.isHrzAngle()) ? 'horizon' : 'vertical'
                );
                document.documentElement.setAttribute('style', set_style.html);
                document.body.setAttribute('style', set_style.body);
                
                let ang_evt = (p1, p2) => {
                    try {
                        let style = p2[0].get_style(p2[1]);
                        document.documentElement.setAttribute('style', style.html);
                        document.body.setAttribute('style', style.body);
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
                mf.func.hrzAngleEvent(ang_evt, [thisobj, 'horizon']);
                mf.func.vrtAngleEvent(ang_evt, [thisobj, 'vertical']);
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        
        },
        
        get_style : (ang) => {
            try {
                let dtype = mf.func.devType();
                let tgt   = ('other' === mf.func.devType()) ? 'default' : mf.func.devType();
                let ret   = { html : '', body : '' };
                
                // set html style
                for (let bidx in thisobj.html.base) {
                    ret.html += bidx + ':' + thisobj.html.base[bidx] + ';';
                }
                for (let bidx in thisobj.html[tgt]) {
                    if ('string' === typeof thisobj.html[tgt][bidx]) {
                        ret.html += bidx + ':' + thisobj.html[tgt][bidx] + ';';
                    } else {
                        for (let ang_idx in thisobj.html[tgt][ang] ) {
                            ret.html += ang_idx + ':' + thisobj.html[tgt][ang][ang_idx] + ';';
                        }
                    }
                }
                // set body style
                for (let bidx in thisobj.body.base) {
                    ret.body += bidx + ':' + thisobj.body.base[bidx] + ';';
                }
                for (let bidx in thisobj.body[tgt]) {
                    if ('string' === typeof thisobj.body[tgt][bidx]) {
                        ret.body += bidx + ':' + thisobj.body[tgt][bidx] + ';';
                    } else {
                        for (let ang_idx in thisobj.body[tgt][ang] ) {
                            ret.body += ang_idx + ':' + thisobj.body[tgt][ang][ang_idx] + ';';
                        }
                    }
                }
                
                return ret;
            } catch (e) {
                console.error(e.stack);
                throw e;
            }
        }
        
    }
    module.exports = thisobj;
} catch (e) {
    console.error(e.stack);
    throw e;
}
/* end of file */
