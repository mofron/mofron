
try {
    if (typeof tetraring === "undefined") {
        var tetraring          = {};
        tetraring.loader          = {};
        tetraring.loader.JsPara = class {
            /**
             * initialize js loader
             *
             */
            constructor (bp) {
                try {
                    this.base_path  = bp || './'; 
                    this.load_path  = new Array();
                    this.callback   = new Array(null,null);
                    this.load_cnt   = 0;
                    this.loading    = false;
                    this.timeout    = 1000;
                    this.load_intvl = 200;
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            addPath (path) {
                try {
                    if ('string' != (typeof path)) {
                        throw new Error('invalid parameter');
                    }
                    if (true === this.loading) {
                        throw new Error('Loader is busy');
                    }
                    /* check duplex */
                    for (var load_path_idx in this.load_path) {
                        if (path == this.load_path[load_path_idx][0]) {
                            /* already  added */
                            return;
                        }
                    }
                    /* add load target path */
                    this.load_path.push(new Array(path, false));
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            load (cb_func, cb_prm, force) {
                try {
                    /* check busy */
                    if (true === this.loading) {
                        throw new Error('Loader is busy');
                    }
                    this.loading = true;
                    
                    /* set callback function */
                    if (null !== cb_func) {
                        this.callback[0] = cb_func;
                        this.callback[1] = cb_prm;
                    }
                    var p_force  = force || false;
                    
                    for (var load_path_idx in this.load_path) {
                        /* check loaded */
                        if (true === this.load_path[load_path_idx][1]) {
                            /* already loaded */
                            if (false === p_force) {
                                /* skip load */
                                continue;
                            }
                        }
                        
                        /* load javascript */
                        var own_loader = this;
                        $.getScript(
                            this.base_path + this.load_path[load_path_idx][0],
                            function() {
                                try {
                                    own_loader.loadedElem();
                                } catch (e) {
                                    console.error(e.stack);
                                }
                            }
                        );
                    }
                    
                    /* check load finish */
                    /* set load timeout */
                    //setTimeout(
                    //    function() {
                    //        try {
                    //            own_loader.chkLoad();
                    //        } catch (e) {
                    //            console.error(e.stack);
                    //        }
                    //    },
                    //    100
                    //);
                    this.chkLoad(0);
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            loadedElem () {
                try {
                    this.load_cnt++;
                    if (this.load_cnt === this.load_path.length) {
                        /* finished load */
                        /* update loaded flag */
                        for (var load_path_idx in this.load_path) {
                            this.load_path[load_path_idx][1] = true;
                        }
                        /* check callback function */
                        if (null !== this.callback[0]) {
                            var cb_func = this.callback[0];
                            var cb_parm = this.callback[1];
                            setTimeout(
                                function() {
                                    try {
                                        cb_func(cb_parm);
                                    } catch (e) {
                                        console.error(e.stack);
                                    }
                                },
                                this.load_intvl
                            );
                            this.callback[0] = null;
                            this.callback[1] = null;
                        }
                        this.loading = false;
                    }
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            chkLoad(idx) {
                try {
                    var load_flg = true;
                    for (var load_path_idx in this.load_path) {
                        if (false === this.load_path[load_path_idx][1]) {
                            //throw new Error('timeout load js : ' + this.base_path + this.load_path[load_path_idx][0]);
                            load_flg = false;
                            break;
                        }
                    }
                    if (false === load_flg) {
                        if ((idx * 100) > this.timeout) {
                            throw new Error('timeout load js : ' + this.base_path + this.load_path[load_path_idx][0]);
                        }
                        var own_loader = this;
                        setTimeout(
                            function() {
                                try {
                                    own_loader.chkLoad(idx+1);
                                } catch (e) {
                                    console.error(e.stack);
                                }
                            },
                            100
                        );
                    }
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
        };
        tetraring.loader.JsSeri = class {
            /**
             * initialize js loader
             *
             */
            constructor (bp) {
                try {
                    this.base_path  = bp || './';
                    this.load_path  = new Array();
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            addPath (path) {
                try {
                    if ('string' != (typeof path)) {
                        throw new Error('invalid parameter');
                    }
                    if (true === this.loading) {
                        throw new Error('Loader is busy');
                    }
                    /* check duplex */
                    for (var load_path_idx in this.load_path) {
                        if (path == this.load_path[load_path_idx][0]) {
                            /* already  added */
                            return;
                        }
                    }
                    /* add load target path */
                    this.load_path.push(path);
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            load (force) {
                try {
                    /* check stock */
                    this.loadElm();
                } catch (e) {
                    throw new Error(e.stack);
                }
            }
            
            loadElm (idx) {
                try {
                    var _idx    = idx || 0;
                    var own_obj = this;
                    $.ajax({
                        url      : this.base_path + this.load_path[_idx] ,
                        type     : 'GET'       ,
                        cache    : false       ,
                        dataType : 'script'    ,
                        async    : false
                    })
                    .done(function(jqXHR, textStatus, errorThrown) {
                        try {
                            if (_idx < (own_obj.load_path.length-1)) {
                                own_obj.loadElm(_idx+1);
                            }
                        } catch (e) {
                            console.error(e.stack);
                        }
                    })
                    .fail(function(jqXHR, textStatus, errorThrown) {
                        throw new Error(textStatus);
                    })
                    .always(function(data, textStatus, errorThrown) {});
                } catch (e) {
                    throw new Error(e.stack);
                }
            }
        };
        
        /* set css loader */
        /**
         * load css
         *
         * @param path to target css
         */
        tetraring.loader.css = function(path) {
            try {
                $('head').append('<link>');
                css = $('head').children(':last');
                css.attr({
                    rel:  'stylesheet',
                    type: 'text/css',
                    href: path
                });
            } catch (e) {
                throw new Error(e.stack);
            }
        };
        
        /**
         * brief load html
         * 
         * @param hpath : (string) path to html file
         * @param h_id : (string) insert the destination 'id' attribute of html tag
         */
        tetraring.loader.html = function(h_path, h_id) {
            try {
                $.ajax({
                    url      :  h_path ,
                    type     : 'GET'  ,
                    cache    : false  ,
                    dataType : 'html' ,
                    async    : false
                })
                .done(function(jqXHR, textStatus, errorThrown) {
                    $( '#' + h_id ).html(jqXHR);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    throw new Error();
                })
                .always(function(data, textStatus, errorThrown) {});
            } catch (e) {
                throw new Error(e.stack);
            }
        };

        tetraring.rest = {};
        tetraring.rest.private = {};
        tetraring.rest.get     = function(uri, data, func, prm) {
            try {
                tetraring.rest.private.request(uri, 'GET', data, func, prm);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
        
        tetraring.rest.post = function(uri, data, func, prm) {
            try {
                if (null == data) {
                    throw new Error('invalid parameter');
                }
                tetraring.rest.private.request(uri, 'POST', data, func, prm);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }
        
        tetraring.rest.private.request = function(uri, type, data, func, prm) {
            try {
                $.ajax({
                    url         : uri    ,
                    type        : type   ,
                    dataType    : 'json' ,
                    data        : data
                })
                .done(function(jqXHR, textStatus, errorThrown) {
                    try {
                        if( null != func ) {
                            if( null == prm ) {
                                func(jqXHR);
                            } else {
                                func(jqXHR, prm);
                            }
                        }
                    } catch( e ) {
                        alert( e.stack );
                    }
                })
                .fail(function( jqXHR, textStatus, errorThrown ) {
                    try {
                        
                    } catch( e ) {
                        console.error(e.stack);
                    }
                })
                .always(function( data, textStatus, errorThrown ) {});
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        }

        tetraring.debug = {};
        tetraring.debug.dumpObj = function(obj) {
            try {
                var ret_str = "";
                for (var i in obj) {
                    ret_str += i + "=" + obj[i] + "\n";
                }
                return ret_str;
            } catch (e) {
                throw new Error(e.stack);
            }
        }

        tetraring.time = {};
        tetraring.time.getDate = function () {
            try {
                var date = new Date();
                return date.getFullYear()  + '/' + 
                       (date.getMonth()+1) + '/' + 
                       date.getDate();
                       
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        tetraring.time.getTime = function () {
            try {
                var time = new Date();
                return time.getHours()   + ':' +
                       time.getMinutes() + ':' +
                       time.getSeconds();
                
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };
        tetraring.time.getUnix = function () {
            try {
                var start = new Date();
                return start.getTime();
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };


        tetraring.url = {};
        tetraring.url.getParam = function() {
            try {
                var ret_val = new Array();
                var prm = document.location.search;
                if ("" == prm) {
                    return null;
                }
                prm = prm.substring(1);
                var ret_flg   = false;
                var prm_array = prm.split('&');
                for (var prm_array_idx in prm_array) {
                    var key_val = prm_array[prm_array_idx].split('=');
                    if (2 != key_val.length) {
                        continue;
                    }
                    ret_flg = true;
                    ret_val[decodeURIComponent(key_val[0])] = decodeURIComponent(key_val[1]);
                }
                if (false === ret_flg) {
                    return null;
                }
                return new tetraring.array.Keyval(ret_val);
            } catch (e) {
                throw new Error(e.stack + '\n');
            }
        };

        tetraring.array = {};
        tetraring.array.Keyval = class {
            constructor (dat) {
                try {
                    if (null === dat) {
                        throw new Error('invalid parameter');
                    }
                    this.data = dat;
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            getValue (key) {
                try {
                    if ((null === key) || ('' == key)) {
                        throw new Error('invalid parameter');
                    }
                    if (false === this.isKeyExists(key)) {
                        return null;
                    }
                    return this.data[key];
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            isKeyExists (key) {
                try {
                    if ((null === key) || ('' == key)) {
                        throw new Error('invalid parameter');
                    }
                    for (var data_key in this.data) {
                        if (data_key === key) {
                            return true;
                        }
                    }
                    return false;
                } catch (e) {
                    throw new Error(e.stack + '\n');
                }
            }
            
            getCount () {
                try {
                    var ret = 0;
                    for (var data_key in this.data) {
                        ret++;
                    }
                    return ret;
                } catch (e) {
                     throw new Error(e.stack + '\n');
                }
            }
        }

    }
} catch (e) {
    console.error(e.stack);
}

/* end of file */
