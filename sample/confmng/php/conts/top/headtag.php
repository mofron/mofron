<head>
    <title>19Test</title>
    <link
        href = 'https://fonts.googleapis.com/css?family=Orbitron'
        rel  = 'stylesheet'
        type = 'text/css'>
    <link 
        href = './css/font-awesome-4.6.3/css/font-awesome.min.css'
        rel  = 'stylesheet'
        type = 'text/css'>
     <link
        rel         = 'stylesheet'
        href        = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'
        integrity   = 'sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u'
        crossorigin = 'anonymous'>
    <link
        href = './css/top.css'
        rel  = 'stylesheet'
        type = 'text/css'>
    <link
        href = './css/header.css'
        rel  = 'stylesheet'
        type = 'text/css'>
    <script
        src         = 'https://code.jquery.com/jquery-3.1.0.min.js'
        integrity   = 'sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s='
        crossorigin = 'anonymous'>
    </script>
    <script src  = './js/top.js'></script>
    <script type = 'text/javascript'>
        $(function(){
            try {
                $("#i-hdr").css("width", $(window).width() + "px");
                $("#i-hdr div").click(function(){
                    window.location.href = './';
                });
                $('#i-hdr').fadeIn();
                $('#i-cnt').fadeIn();
            } catch (e) {
                alert(e.stack);
            }
        });
    </script>
</head>
