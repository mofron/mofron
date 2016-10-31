<?php
try {
    //require_once(__DIR__ . '/func.php');
    echo 'mofron aggregation' . PHP_EOL;
    
    $yml = yaml_parse_file(__DIR__ . '/../../conf/struct.yml');
    if (false === $yml) {
        throw new Exception('failed load struncture config');
    }
    
    $mof_src = file_get_contents(__DIR__ . '/../../../src/mofron/header.js');
    /* base source */
    foreach ($yml['base'] as $key => $val) {
        foreach ($val as $val_elm) {
            $mof_src .= file_get_contents(__DIR__ . '/../../../src/' . $key . '/base/' . $val_elm . '.js' );
            $mof_src .= PHP_EOL;
        }
        //$mof_src .= getBaseSrc($key, $val);
    }
    
    file_put_contents(__DIR__ . '/../../../src/mofron.js', $mof_src);
    
    
} catch (Exception $e) {
    echo $e->getMessage();
}
