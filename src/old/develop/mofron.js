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
