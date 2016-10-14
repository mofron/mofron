$(function(){
    try {
        $('#i-srch-input').FlowupLabels({
            feature_onInitLoad: true      ,
            class_focused:      'focused' ,
            class_populated:    'populated'
        });
        $('#i-srch-btn').click(function(){
            try {
                var keywd = $("#i-dev-keywd").val();
                if ("" == keywd) {
                    return;
                }
                window.location.href = './?func=demo2box&search=' + keywd;
            } catch (e) {
                alert(e.stack);
            }
        });
        $('#i-dev-keywd').keydown(function(e){
            try {
                if (13 === e.keyCode) {
                    $('#i-srch-btn').click();
                }
            } catch (e) {
                alert(e.stack);
            }
        });
        
        $('.c-retchk-btn').click(function(e){
            var idx = $('.c-retchk-btn').index(this);
            if ('10.228.5.254' != $('.c-retrow-ip').eq(idx).html()) {
                alert('checkを許可しているのは10.228.5.254のみです。');
            }
            $('#i-srch-fom').fadeOut();
            $('#i-srch-tbl').fadeOut('normal', function() {
                window.location.href = './?func=demo2box&id=' + $('.c-retrow-id').eq(idx).html();
            });
        });
    } catch (e) {
        alert(e.stack);
    }
});

function Fdm2_srchDev() {
    try {
        
    } catch (e) {
        alert(e.stack);
    }
}
