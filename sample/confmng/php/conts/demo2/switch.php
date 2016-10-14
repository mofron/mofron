<div id='i-cnt' style='display:none;'>
    <div class='row' style='margin-top: 5px;'>
        <div class='col-md-1'></div>
        <div class='col-md-2'>
            <div id='i-back-btn' class='c-btn-ujarak'>
                <div><i class="fa fa-chevron-left" aria-hidden="true"></i> back to top</div>
            </div>
        </div>
        <div class='col-md-9'></div>
    </div>
    <div class='row'>
        <div class='col-md-1'></div>
        <div class='col-md-10'>
            <div id='i-sw-title'> &nbsp;Port Management</div>
        </div>
        <div class='col-md-1'></div>
    </div>
    <br>
    <?php
        if (true === array_key_exists('id', $_GET)) {
            require_once(__DIR__ . '/portlist.php');
        } else {
            require_once(__DIR__ . '/srch_fom.php');
            echo '<br><br>';
            if (true === array_key_exists('search', $_GET)) {
                require_once(__DIR__ . '/devlist.php');
            } else {
                require_once(__DIR__ . '/nsearch.php');
            }
        }
    ?>
</div>

