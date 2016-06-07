<?php
/**
 * @file deploy.php
 */
require_once(__DIR__ . '/loader.php');

try {
    echo '=== start mofron deploy ===' . PHP_EOL;
    
    # load javascript file
    $jpaths = getJsPaths(__DIR__ . '/../src/develop');
    $str    = "";
    foreach ($jpaths as $elm) {
        echo ' get ' . $elm . PHP_EOL;
        $str .= file_get_contents($elm);
    }
    echo ' set ' . __DIR__ . '/../src/release/mofron.js' . PHP_EOL;
    file_put_contents(__DIR__ . '/../src/release/mofron.js', $str);
    echo '=== succeed mofron deploy ===' . PHP_EOL;
} catch (Exception $e) {
    echo $e->getMessage();
}

/* end of file */
