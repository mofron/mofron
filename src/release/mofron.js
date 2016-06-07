/**
 * @file   mofron.php
 * @brief  
 * @author simpart 
 * @note   MIT License
 */
$(function(){
    try {
        /* check defined object */
        if ( (typeof Mofron      === "undefined") ||
             (typeof MofView     === "undefined") ||
             (typeof MofViewCore === "undefined") ) {
            
            var Mofron      = {};
            Mofron.body     = new MofView();
            Mofron.addConts = function (cnt) {
                try {
                    this.body.addConts(cnt);
                } catch (e) {
                    throw e;
                }
            };
            
            Mofron.setTitle = function (ttl,img) {
                try {
                    var pimg = img || null;
                    // add 'title' tag
                    $('head').append("<title>" + ttl + "</title>");
                    
                    
                } catch (e) {
                    throw e;
                }
            }
        } else {
            throw new Error('Mofron is already loaded.');
        }
    } catch (e) {
        throw e;
    }
});
/* end of file */
/**
 * @file   MofView.php
 * @brief  viewer basic class
 * @author simpart 
 * @note   MIT License
 */

/**
 * @class MofView
 * @brief vieeer basic class
 */
class MofView extends MofViewCore
{
    constructor(){
        try {
            super();
        } catch (e) {
            throw e;
        }
    }
    
    addConts(cnt,loc) {
        try {
            var ploc = loc || 0;
            // get class object name
            Object.prototype.toString.apply(cnt);
            
            // get parent
            var prt_id = prt.getId();
            // set id
            
            var tgt = "";
            cnt.build(tgt);
            
            this.chd[ploc].push(cnt);
        } catch (e) {
            
        }
    }
    
    visible(flg, lo) {
        try {
            
        } catch (e) {
            throw e;
        }
    }
    
    size(hei, wid) {
        try {
            
        } catch (e) {
            
        }
    }
}

/* end of file */
/**
 * @file   MofViewCore.php
 * @brief  viewer private functions
 * @author simpart
 * @note   MIT License
 */

/**
 * @class MofViewCore
 * @brief 
 */
class MofViewCore
{
    constructor() {
        try {
            this.prt = null;
            this.chd = null;
        } catch (e) {
            throw e;
        }
    }
    
    build () {
        throw new Error("build() is not implements");
    }
    
    setId () {
        try {
            
        } catch (e) {
            throw e;
        }
    }
    
    getId() {
        
    }
    
    setCss(kv) {
        try {
        
        } catch (e) {
        
        }
    }
    
    addTags() {
    
    }
}

/* end of file */
