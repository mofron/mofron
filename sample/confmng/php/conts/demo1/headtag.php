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
        href = './css/btn.css'
        rel  = 'stylesheet'
        type = 'text/css'>
    <link
        href = './css/header.css'
        rel  = 'stylesheet'
        type = 'text/css'>
    <link
        href = './css/demo1.css'
        rel  = 'stylesheet'
        type = 'text/css'>
    <script
        src         = 'https://code.jquery.com/jquery-3.1.0.min.js'
        integrity   = 'sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s='
        crossorigin = 'anonymous'>
    </script>
    <script
        src         = 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'
        integrity   = 'sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa'
        crossorigin = 'anonymous'>
    </script>
    <script src  = './js/demo1.js'></script>
    <script type = 'text/javascript'>
        $(function(){
            try {
                $('#i-back-btn').click(function(){
                    window.location.href = './';
                });
                $('#i-hdr div').click(function(){
                    window.location.href = './';
                });
                $('#i-cnt').fadeIn();
            } catch (e) {
                alert(e.stack);
            }
        });
    </script>
</head>
