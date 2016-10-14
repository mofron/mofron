$(function(){
    try {
        loadCss('./css/menu.css');
        $("#i-cnt #menuconts").css("height", $(window).height()-71 + "px");
        
        $("#i-cnt #menubar").click(function() {
            try {
                $(this).fadeOut('fast',function() {
                    $("#i-cnt #menuconts").fadeIn('fast');
                });
            } catch (e) {
                console.error(e.stack);
            }
        });
    } catch (e) {
        console.error(e.stack);
    }
});
