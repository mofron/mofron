<!DOCTYPE html>
<html>
    <!-- head tag -->
    <?php
        try {
            if (false === array_key_exists('func', $_GET)) {
                require_once(__DIR__ . '/php/conts/top/headtag.php');
            } else if (0 === strcmp('demo1box', $_GET['func'])) {
                require_once(__DIR__ . '/php/conts/demo1/headtag.php');
            } else if (0 === strcmp('demo2box', $_GET['func'])) {
                require_once(__DIR__ . '/php/conts/demo2/headtag.php');
            } else if (0 === strcmp('demo3box', $_GET['func'])) {
                require_once(__DIR__ . '/php/conts/demo3/headtag.php');
            } else if (0 === strcmp('demo4box', $_GET['func'])) {
                require_once(__DIR__ . '/php/conts/demo4/headtag.php');
            } else {
                throw new Exception('unknown func');
            }
        } catch (Exception $e) {
            echo $e->getMessage() . PHP_EOL .
                 '(' . __FILE__ . ' : ' . __LINE__ . ')';
        }
    ?>
    <body>
        <?php
            try {
                if (false === array_key_exists('func', $_GET)) {
                    require_once(__DIR__ . '/php/conts/top/title.php');
                    require_once(__DIR__ . '/php/conts/top/demomenu.php');
                } else if (0 === strcmp('demo1box', $_GET['func'])) {
                    require_once(__DIR__ . '/php/conts/demo1/title.php');
                    require_once(__DIR__ . '/php/conts/demo1/container.php');
                } else if (0 === strcmp('demo2box', $_GET['func'])) {
                    require_once(__DIR__ . '/php/conts/demo1/title.php');
                    require_once(__DIR__ . '/php/conts/demo2/switch.php');
                } else if (0 === strcmp('demo3box', $_GET['func'])) {
                    require_once(__DIR__ . '/php/conts/demo1/title.php');
                    require_once(__DIR__ . '/php/conts/demo3/loadb.php');
                } else if (0 === strcmp('demo4box', $_GET['func'])) {
                    require_once(__DIR__ . '/php/conts/demo1/title.php');
                    require_once(__DIR__ . '/php/conts/demo4/sslfunc.php');
                } else {
                    throw new Exception('unknown func');
                }
            } catch (Exception $e) {
                echo $e->getMessage() . PHP_EOL .
                     '(' . __FILE__ . ' : ' . __LINE__ . ')';
            }
        ?>
    </body>
</html>
