<?php

function getBaseSrc($key, $conts) {
    try {
        $ret_
        foreach ($conts as $conts_elm) {
            file_get_contents(__DIR__ . '/../../../src/' . $key . '/base/' . $conts_elm . '.js' );
        }
        //var_dump($conts);
        
    } catch (Exception $e) {
        throw $e;
    }
}
