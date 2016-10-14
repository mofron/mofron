
var DTOP_STS_DEMO1 = "DTOP_STS_DEMO1";
var DTOP_STS_DEMO2 = "DTOP_STS_DEMO2";
var DTOP_STS_DEMO3 = "DTOP_STS_DEMO3";
var DTOP_STS_DEMO4 = "DTOP_STS_DEMO4";

//var Gtop_menuState = null;


$(function(){
    try {
        $(".demo").hover(
            function () {
                var id = $(this).attr("id");
                $("#" + id).css("box-shadow", "rgba(0, 0, 0, 0.4) 10px 10px 10px");
                $("#" + id + "_logo").css("filter", "blur(2px)");
                $("#" + id + "_logo").css("-webkit-filter", "blur(2px)");
                $("#" + id +"_desc").fadeIn('fast');
            },
            function () {
                var id = $(this).attr("id");
                $("#" + id).css("box-shadow", "");
                $("#" + id + "_logo").css("filter", "");
                $("#" + id + "_logo").css("-webkit-filter", "");
                $("#" + id +"_desc").fadeOut('fast');
            }
        );
        
        $(".demo").click(function(){
            var id = $(this).attr("id");
            $("#i-cnt").fadeOut('fast',function() {
                window.location.href = './?func=' + id;
                //Gtop_menuState = id;
                //$("#" + id + "_conts").fadeIn('fast');
            });
        });
    } catch (e) { 
        console.error(e.stack);
    }
});
