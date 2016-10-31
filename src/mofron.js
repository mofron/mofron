/*
 * @file  mafron.js
 * @autor simpart
 */
try {
    if (typeof mofron === "undefined") {
        var mofron  = {
            is_loaded : false ,
            js_loader : {}    ,
            init      : null  ,
            theme     : null  ,
            parts     : {}    ,
            layout    : {}    ,
            event     : {}    ,
            effect    : {}    ,
            template  : {}    ,
            other     : {}    ,
            rootConts : null  ,
            useParts  : null  ,
            innerFunc : {}
        };
        mofron.useParts = function(name) {
            try {
                if (false === mofron.is_loaded) {
                    /* not loaded yet */
                    throw new Error('initialize is not finished yet');
                }
                /* paramter must be string type */
                if ('string' != (typeof name)) {
                    throw new Error('invalid parameter');
                }
                mofron.js_loader.Seri.addPath('parts/extend/' + name + '/' + name + '.js');
                mofron.js_loader.Seri.load();
            } catch (e) {
                console.error(e.stack);
            }
        };
        mofron.useTemplate = function(name) {
            try {
                if (false === mofron.is_loaded) {
                    /* not loaded yet */
                    throw new Error('initialize is not finished yet');
                }
                /* paramter must be string type */
                if ('string' != (typeof name)) {
                    throw new Error('invalid parameter');
                }
                mofron.js_loader.Seri.addPath('template/' + name + '/' + name + '.js');
                mofron.js_loader.Seri.load();
            } catch (e) {
                console.error(e.stack);
            }
        };
        mofron.innerFunc.getId = function () {
            try {
                var ret_id = "";
                var loop   = 0;
                var val    = 0;
                for (loop=0; loop < 32 ;loop++) {
                    val = Math.random() * 16 | 0;
                    if ((loop === 8)  ||
                        (loop === 12) ||
                        (loop === 16) ||
                        (loop === 20)) {
                        ret_id += "-";
                    }
                    ret_id += (loop == 12 ? 4 : (loop == 16 ? (val & 3 | 8) : val)).toString(16);
                }
                this.id = ret_id;
                return ret_id;
            } catch (e) {
                console.error(e.stack);
                throw new Error();
            }
        };
    } else {
        throw new Error('mofron is already defined');
    }
} catch(e) {
    console.error(e.stack);
}
/**
 * @file   Component.js
 * @brief  Base of UI Parts Class
 * @author simpart
 */

mofron.parts.Base = class {
    constructor () {
        try {
            this.id        = null;
            this.parent    = null;
            this.child     = new Array();
            this.event     = new Array();
            this.layout    = new Array();
            this.effect    = new Array();
            this.style     = new Array(); //new mofron.other.Style(this);
            this.theme     = mofron.theme;
            this.init_disp = true;
            this.init_flg  = false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    /*** method ***/
    /**
     * get parts id
     * 
     * @return (string) id
     */
    getId () {
        if (null != this.id) {
            return this.id;
        }
        this.id = mofron.innerFunc.getId();
        return this.id;
    }
    
    getTarget() {
        try {
            return '#' + this.getId();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild(chd,disp) {
        try {
            var _disp = disp === undefined ? true : disp;
            console.log('addChild : Components');

            chd.parent = this;
            this.child.push([chd,_disp]);
            if (true === this.init_flg) {
                chd.init(_disp);
                for(var idx in this.layout) {
                    this.layout[idx].layout(chd);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addEvent (evt) {
        try {
            this.event.push(evt);
            evt.setTarget(this);
            if (true === this.init_flg) {
                evt.event();
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addLayout (lo) {
        try {
            this.layout.push(lo);
            lo.setTarget(this);
            if (true === this.init_flg) {
                for(var idx in this.child) {
                    lo.layout(this.child[idx][0]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init (disp) {
        try {
            if (true === this.init_flg) {
                throw new Error('detect duplicate init');
            }
            var _disp = disp === undefined ? true : disp;
            
            if (null === this.parent) {
                mofron.rootConts.addChild(this,_disp);
                return;
            }
            
            this.initConts(_disp);
            
            /* set style */
            for(var idx in this.style) {
                this.style[idx].setStyle();
            }
            
            /* set event */
            for(var idx in this.event) {
                this.event[idx].event();
            }
            
            this.initChild(_disp);
            
            this.init_flg = true;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts(disp) {
        try {
            console.log('initConts : Component');
            
            var tgt = null;
            if ('RootConts' === this.parent) {
                tgt = 'body';
            } else {
                tgt = this.parent.getTarget();
            }
            $(tgt).append('<div id="'+ this.getId() +'"></div>');
            
            if (false === disp) {
                var style = new mofron.other.Styles(this);
                style.style('display', 'none');
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    
    initChild(disp) {
        try {
            console.log('initChild : Component');

            for(var idx in this.child) {
                if (false === this.child[idx][1]) {
                    disp = false;
                }
                this.child[idx][0].init(disp);
                if (0 !== this.layout.length) {
                    for(var lo_idx in this.layout) {
                        this.layout[lo_idx].layout(this.child[idx][0]);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    visible (flg, eff) {
        try  {
            var p_eff = eff || null;
            
            if ('boolean' != (typeof flg)) {
                throw new Error('invalid parameter');
            }
            
            if (null != p_eff) {
                if (false === flg) {
                    p_eff.start(this);
                } else {
                    p_eff.end(this);
                }
            } else {
                if (false === flg) {
                    $('#' + this.getId()).css('display', 'none');
                } else {
                    $('#' + this.getId()).css('display', '');
                }
                // set child visible
                for(var idx in this.child) {
                    if (true === this.child[idx][1]) {
                        this.child[idx][0].visible(flg,p_eff);
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Button.js
 * @brief  Base of UI Button Class
 * @author simpart
 */

mofron.parts.Button = class extends mofron.parts.Base {
    constructor (cnt) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts = cnt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init () {
        try {
            super.init();
            $('#' + this.getId()).append('<button>'+ this.conts +'</button>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
            if (null === func) {
                throw new Error('invalid parameter');
            }
            var p_prm = prm || null;
            $('#' + this.getId()).click(function() {
                try {
                    func(p_prm);
                } catch (e) {
                    console.error(e.stack + '\n');
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Text.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.Text = class extends mofron.parts.Base {
    /**
     * initialize Header
     */
    constructor (txt) {
        try {
            super();
            this.text       = txt;
            this.size       = null;
            this.auto_color = false;
            this.setSize(15);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            
            $('#' + this.getId()).html('<div class="text-conts">'+ this.text +'</div>');
            if ((null !== this.theme.colors[0]) &&
                (true === this.auto_color)) {
                if (true === this.auto_color) {
                    var rgb = this.theme.colors[0].getRgba();
                    if (290 > (rgb[0]+rgb[1]+rgb[2])) {
                        var style = new mofron.other.Styles(this, ' div');
                        style.style('color', 'rgba(255,255,255,'+ rgb[3] +')');
                    }
                }
            }
            
            if (null !== this.theme.font) {
                this.theme.font.font(this);
            }
            //style.style('font-size', this.size + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (size) {
        try {
            var style = new mofron.other.Styles(this, ' .text-conts');
            style.style('font-size', size + 'px');
            this.size = size;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getSize() {
        try {
            return this.size;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setAlign (tp) {
        try {
            var style = new mofron.other.Styles(this, ' .text-conts');
            style.style('text-align', tp);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setLink (url,tab) {
        try {
            var _tab = tab || false;
            var style = new mofron.other.Styles(this, ' .text-conts');
            style.style('cursor', 'pointer');
            var click = new mofron.event.Click();
            if (false === _tab) {
                click.setCbfunc (function(){
                    window.location.href = url;
                });
            } else {
                click.setCbfunc (function(){
                    window.open(url, '_blank');
                });
            }
            this.addEvent(click);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setColor(color) {
        try {
            var style = new mofron.other.Styles(this, ' .text-conts');
            style.style('color', color.getStyle());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget() {
        try {
            return '#' + this.getId() + ' .text-conts';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Input.js
 * @brief  Base of UI InputText Class
 * @author simpart
 */

mofron.parts.InputText = class extends mofron.parts.Base {
    constructor (val) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init () {
        try {
            super.init();
            $('#' + this.getId()).append('<input></input>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
            if (null === func) {
                throw new Error('invalid parameter');
            }
            var p_prm = prm || null;
            $('#' + this.getId()).click(function() {
                try {
                    func(p_prm);
                } catch (e) {
                    console.error(e.stack + '\n');
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Header.js
 * @brief  Base UI of Header
 * @author simpart
 */

mofron.parts.Header = class extends mofron.parts.Base {
    /**
     * initialize Header
     */
    constructor () {
        try {
            super();
            this.setHeight (50);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            console.log('initConts : Header');

            var tag  = "<div class='conts'></div>";
            tag     += "<div class='padd'></div>";
            $('#' + this.getId()).html(tag);
            
            var conts_style = new mofron.other.Styles(this, ' .conts');
            conts_style.style('width' , '100%');
            conts_style.style('float' , 'left');
            conts_style.style('border-bottom', 'solid 1px black');
            conts_style.style('position', 'fixed');
            var padd_style = new mofron.other.Styles(this, ' .padd');
            padd_style.style('float' , 'none');
            
            if (null !== this.theme.colors[0]) {
                conts_style.style(
                    'background',
                    this.theme.colors[0].getStyle(),
                    ' .conts'
                );
            }
            
            this.addLayout(new mofron.layout.Float('left'));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget () {
        try {
            return super.getTarget() + ' .conts';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set header height
     *
     * @param hei : (int) height
     */
    setHeight (hei) {
        try {
            var conts_style = new mofron.other.Styles(this, ' .conts');
            conts_style.style('height', hei + 'px');
            
            var padd_style = new mofron.other.Styles(this, ' .padd');
            padd_style.style('height', hei + 'px');
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set header background color
     *
     * col : (string) color
     */
    setColor (col) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setFix (flg) {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Input.js
 * @brief  Base of UI InputText Class
 * @author simpart
 */

mofron.parts.Image = class extends mofron.parts.Base {
    constructor (val) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init () {
        try {
            super.init();
            $('#' + this.getId()).append('<input></input>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
            if (null === func) {
                throw new Error('invalid parameter');
            }
            var p_prm = prm || null;
            $('#' + this.getId()).click(function() {
                try {
                    func(p_prm);
                } catch (e) {
                    console.error(e.stack + '\n');
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Frame.js
 * @brief  Base UI of Frame
 * @author simpart
 */

mofron.parts.Frame = class extends mofron.parts.Base {
        
    constructor () {
        try {
            super();
            this.setSize (100, 100);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * structure
     * 
     * @param disp : (bool) visible flag
     */
    initConts (disp) {
        try {
            super.initConts(disp);
            $('#' + this.getId()).html('<div class="frame-conts"></div>');
            var style = new mofron.other.Styles(this, ' div');
            style.style('border', 'solid 1px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSize (hei, wid) {
        try {
            var style = new mofron.other.Styles(this, ' div');
            style.style('height', hei + 'px');
            style.style('width' , wid + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setRadius (val) {
        try {
            var style = new mofron.other.Styles(this, ' div');
            style.style('webkit-border-radius', val + 'px');
            style.style('-moz-border-radius'  , val + 'px');
            style.style('border-radius'       , val + 'px');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setShadow (val) {
        try {
            var style = new mofron.other.Styles(this, ' div');
            style.style('box-shadow', val/2 + 'px '+ val/2 + 'px '+ val +'px '+ '0px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getTarget() {
        try {
            return '#' + this.getId() + ' .frame-conts';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Title.js
 * @brief  Base UI of Text
 * @author simpart
 */

mofron.parts.Title = class extends mofron.parts.Frame {
    constructor (ttl) {
        try {
            super();
            this.title = new mofron.parts.Text(ttl);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initConts (disp) {
        try {
            super.initConts(disp);
            this.title.setSize(30);
            
            //var bd_comp  = new mofron.parts.Frame();
            var style = new mofron.other.Styles(this, ' div');
            style.style('width'  , '100%');
            style.style('height' , '35px');
            style.style('border-left'  , 'solid 15px black');
            style.style('border-bottom', 'solid 1px black');
            if (null !== this.theme.colors[0]) {
                style.style('border-color', this.theme.colors[0].getStyle());
            }
            
            var ttl_style = new mofron.other.Styles(this.title);
            ttl_style.style('margin-left'  , '20px');
            this.addChild(this.title,disp);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Menu.js
 * @author simpart
 */

mofron.parts.Menu = class extends mofron.parts.Base {
    
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

/**
 * @file   Background.js
 * @author simpart
 */

mofron.parts.Background = class extends mofron.parts.Base {
    
    initConts (disp) {
        try {
            super.initConts(disp);
            var style = new mofron.other.Styles(this);
            style.style('height'    , '100%');
            style.style('width'     , '100%');
            style.style('position'  , 'fixed');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setColor(clr) {
        try {
            var style = new mofron.other.Styles(this);
            style.style('background'    , clr.getStyle ());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setShadow(val) {
        try {
            var style = new mofron.other.Styles(this);
            style.style('box-shadow'    , '0px '+ val/2 + 'px '+ val +'px '+ '0px gray');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file   Input.js
 * @brief  Base of UI InputText Class
 * @author simpart
 */

mofron.parts.Loading = class extends mofron.parts.Base {
    constructor (val) {
        try {
            super();
            if ('string' != (typeof cnt)) {
                throw new Error('invalid parameter type');
            }
            this.conts = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    init () {
        try {
            super.init();
            $('#' + this.getId()).append('<input></input>');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setClickEvent (func, prm) {
        try {
            if (null === func) {
                throw new Error('invalid parameter');
            }
            var p_prm = prm || null;
            $('#' + this.getId()).click(function() {
                try {
                    func(p_prm);
                } catch (e) {
                    console.error(e.stack + '\n');
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Click.js
 */
mofron.event.Base = class {
    constructor () {
        try {
            this.tgt_obj = null;
            this.cb_func = null;
            this.cb_parm = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget (to) {
        try {
            this.tgt_obj = to;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setCbfunc (cbf, cbp) {
        try {
            if (null === cbf) {
                throw new Error('invalid param');
            }
            var _cbp = cbp || null;
            this.cb_func = cbf;
            this.cb_parm = _cbp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    event () {
        try {
            throw new Error('not implement');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Click.js
 */
mofron.event.Click = class extends mofron.event.Base {
    
    event () {
        try {
            var cbf = this.cb_func;
            var cbp = this.cb_parm;
            $(this.tgt_obj.getTarget()).click(function() {
                try {
                    cbf(cbp);
                } catch (e) {
                    console.error(e.stack);
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Click.js
 */
mofron.event.HoverIn = class extends mofron.event.Base {
    
    event () {
        try {
            var cbf = this.cb_func;
            var cbp = this.cb_parm;
            
            $(this.tgt_obj.getTarget()).hover(function() {
                try {
                    cbf(cbp);
                } catch (e) {
                    console.error(e.stack);
                }
            },null);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Click.js
 */
mofron.event.HoverOut = class extends mofron.event.Base {
    
    event () {
        try {
            var cbf = this.cb_func;
            var cbp = this.cb_parm;
            
            $(this.tgt_obj.getTarget()).hover(null,function() {
                try {
                    cbf(cbp);
                } catch (e) {
                    console.error(e.stack);
                }
            });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

mofron.layout.Base = class {
    constructor () {
        try {
            this.target  = null;
            this.exe_cnt = -1;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTarget(tgt) {
        try {
            this.target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout () {
        try {
            this.exe_cnt++;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Float.js
 */

mofron.layout.Float = class extends mofron.layout.Base {
    constructor (tp) {
        try {
            super();
            this.type = tp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = null;
            for (var idx in this.target.child) {
                style = new mofron.other.Styles(this.target.child[idx][0]);
                if (idx == this.target.child.length-1) {
                    style.style('float', 'none');
                } else {
                    style.style('float', this.type);
                }
            }
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Center.js
 */

mofron.layout.HorizCenter = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            var _rt = rt || 80;
            this.rate = _rt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            style.style('width'   , this.rate + '%');
            style.style('position', 'relative');
            style.style('left'    , (100 - this.rate)/2 + '%');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Center.js
 */

mofron.layout.VartCenter = class extends mofron.layout.Base {
    constructor (rt) {
        try {
            super();
            var _rt = rt || 20;
            this.rate = _rt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            style.style('height'   , this.rate + '%');
            style.style('position', 'relative');
            style.style('top'    , (100 - this.rate)/2 + '%');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Margin.js
 */

mofron.layout.Padding = class extends mofron.layout.Base {
    constructor (tp,v) {
        try {
            super();
            this.type = tp;
            this.val  = v;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            var mg = 'padding';
            if (null !== this.type) {
                mg += '-' + this.type;
            }
            style.style(mg  , this.val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Float.js
 */

mofron.layout.Float = class extends mofron.layout.Base {
    constructor (tp) {
        try {
            super();
            this.type = tp;
            this.exec = false;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            
            
            //var style = null;
            //for (var idx in this.target.child) {
            //    style = new mofron.other.Styles(this.target.child[idx][0]);
            //    if (idx == this.target.child.length-1) {
            //        style.style('float', 'none');
            //    } else {
            //        style.style('float', this.type);
            //    }
            //}
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Grid.js
 */

mofron.layout.Grid = class {
    constructor (tgt) {
        try {
            this.target = tgt;
            this.row    = 1;
            this.column = 1;
            this.dummy  = null;
            this.style_buff = new Array();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setTgtParts(tgt) {
        try {
            this.target = tgt;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setGrid (row, col) {
        try {
            this.row    = row;
            this.column = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setMargin (type,val) {
        try {
            if (null !== this.dummy) {
                this.dummy.style.addStyle('margin-'+type, val+'px');
            } else {
                this.style_buff.push(new Array('margin-'+type, val+'px'));
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (child,disp) {
        try {
            var dummy = new mofron.parts.Base();
            dummy.parent = this.target;
            dummy.addChild(child);
            
            dummy.style.addStyle('height'  , (100 / this.row) + '%');
            dummy.style.addStyle('width'   , (100 / this.column) + '%');
            dummy.style.addStyle('float'   , 'left');
            for(var idx in this.style_buff) {
                dummy.style.addStyle(
                    this.style_buff[idx][0],
                    this.style_buff[idx][1]
                );
            }
            dummy.init(disp);
            
            child.parent = this.target;
            this.dummy = dummy;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Margin.js
 */

mofron.layout.Margin = class extends mofron.layout.Base {
    constructor (tp,v) {
        try {
            super();
            this.type = tp;
            this.val  = v;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    layout (tgt_chd) {
        try {
            super.layout();
            var style = new mofron.other.Styles(tgt_chd);
            var mg = 'margin';
            if (null !== this.type) {
                mg += '-' + this.type;
            }
            style.style(mg  , this.val);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */


mofron.effect.Base = class {
    constructor (to) {
        try {
            this.tgt_obj = to;
            this.speed   = 200;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    effect (flg) {
        try {
            throw new Error('not implements');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setSpeed (spd) {
        try {
            this.speed = spd;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}


mofron.effect.Blur = class extends mofron.effect.Base {
    effect (flg) {
        try {
            if (true === flg) {
                $(this.tgt_obj.getTarget()).velocity({blur : 2},this.speed);
            } else {
                $(this.tgt_obj.getTarget()).velocity({blur : 0},this.speed);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}



mofron.effect.Fade = class extends mofron.effect.Base {
    effect (flg) {
        try {
            if (true === flg) {
                $('#' + this.tgt_obj.getId()).fadeIn(this.speed);
            } else {
                $('#' + this.tgt_obj.getId()).fadeOut(this.speed);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}






mofron.effect.Shadow = class extends mofron.effect.Base {
    effect (flg) {
        try {
            if (true === flg) {
                $(this.tgt_obj.getTarget()).velocity(
                    { 
                        boxShadowX:    5 ,
                        boxShadowY:    5 ,
                        boxShadowBlur: 10 
                    } ,
                    this.speed
                );
            } else {
                $(this.tgt_obj.getTarget()).velocity(
                    {
                        boxShadowX:    0 ,
                        boxShadowY:    0 ,
                        boxShadowBlur: 0
                    } ,
                    this.speed
                );
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}


/**
 * @file Base.js
 */
mofron.template.Base = class {
    constructor () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    start () {
        try {
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file  Color.js
 * @brief color abstructor
 */
mofron.other.Color = class {
    constructor (r,g,b,a) {
        try {
            this.red   = r || null;
            this.green = g || null;
            this.blue  = b || null;
            this.alpha = a || 1;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setRgb (r, g, b) {
        try {
            this.red   = r;
            this.green = g;
            this.blue  = b;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setAlpha (a) {
        try {
            this.alpha = a;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getRgba () {
        try {
            return new Array(
                           this.red   ,
                           this.green ,
                           this.blue  ,
                           this.alpha
                       );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getStyle () {
        try {
            return 'rgba('+ this.red +','+ this.green +','+ this.blue +','+ this.alpha +')';
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file  Font.js
 */
mofron.other.Font = class {
    constructor (fm) {
        try {
            this.family = fm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    font (tgt) {
        try {
            var style = new mofron.other.Styles(tgt, ' div');
            style.style('font-family', this.family);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Style.js
 */
mofron.other.Styles = class {
    constructor (to, es) {
        try {
            var _es = es || '';
            if ( ('object' != (typeof to)) ||
                 ('string' != (typeof _es)) ) {
                throw new Error('invalid parameter');
            }
            
            this.style_buff = new Array();
            this.tgt_obj    = to;
            this.tgt_obj.style.push(this);
            this.ext_sel    = _es;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    style (key, val) {
        try {
            if ('string' != (typeof key)) {
                throw new Error('invalid parameter');
            }
            var set_flg = false;
            if (true === this.tgt_obj.init_flg) {
                $('#' + this.tgt_obj.getId() + this.ext_sel).css(
                    key, val
                );
                set_flg = true;
            }
            this.style_buff.push(new Array(key, val, set_flg));
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setStyle () {
        try {
            //var _ext_sel = ext_sel || '';
            var _ext_sel = '';
            for (var idx in this.style_buff) {
                if (false === this.style_buff[idx][2]) {
console.log('set style : ' + '#' + this.tgt_obj.getId() + this.ext_sel);
                    
                    $('#' + this.tgt_obj.getId() + this.ext_sel).css(
                        this.style_buff[idx][0],
                        this.style_buff[idx][1]
                    );
                    this.style_buff[idx][2] = true;
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

/**
 * @file Theme.js
 *
 */
mofron.other.Theme = class {
    constructor () {
        try {
            this.colors = new Array(
                                  null,  /* main color */
                                  null,  /* secondary color */
                                  null   /* thirdly color */
                              );
            this.font = null;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setMainColor (col) {
        try {
            this.colors[0] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setScndColor (col) {
        try {
            this.colors[1] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setThrdColor (col) {
        try {
            this.colors[2] = col;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    setFont(ft) {
        try {
            this.font = ft;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */

