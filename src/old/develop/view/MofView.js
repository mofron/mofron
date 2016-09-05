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
