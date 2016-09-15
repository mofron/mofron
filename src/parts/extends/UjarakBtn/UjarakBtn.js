$(function() {
    try {
        mofron.useParts('base/Button');
        
        if ("undefined" != (typeof mofron.parts.extends.UjarakBtn)) {
            throw new Error('duplex extends parts : UjarakBtn');
        }
        /**
         * @class UjarakBtn
         */
        mofron.parts.extends.UjarakBtn = class extends Button {
            
        }
    } catch (e) {
        console.error(e.stack + '\n');
    }
});
