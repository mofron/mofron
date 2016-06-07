<?php

function getJsPaths ($dir) {
    try {
        $ret_val = array();
        $odir = scandir( $dir );
        if (2 < count($odir)) {
            foreach( $odir as $elm ) {
                if ((0 === strcmp($elm,'.')) ||
                    (0 === strcmp($elm,'..')) ) {
                    continue;
                }
                $ftype = filetype( $dir . DIRECTORY_SEPARATOR . $elm );
                if (0 === strcmp($ftype, 'file')) {
                    # echo $elm . PHP_EOL;
                    $ret_val[] = $dir . DIRECTORY_SEPARATOR . $elm;
                } else if (0 === strcmp($ftype, 'dir')) {
                    $buff = getJsPaths($dir . DIRECTORY_SEPARATOR . $elm);
                    if (null !== $buff) {
                        foreach ($buff as $buf_elm) {
                            $ret_val[] = $buf_elm;
                        }
                    }
                }
            }
        }
        if (0 === count($ret_val)) {
            return null;
        }
        return $ret_val;
    } catch (Exception $e) {
        throw $e;
    }
}
