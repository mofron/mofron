/**
 * @file  start.js
 * @brief start view
 */
$(function() {
    try {
        /* start page header */
        mofron.init(
            '../src/parts/base/',
            function () {
                try {
                    alert("mofron");
                } catch (e) {
                    console.error(e.stack);
                }
            }
        );
    } catch (e) {
        console.error(e.stack);
    }
});
/* end of file */
