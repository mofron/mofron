<?php

function callRest($uri, $type, $prm) {
    try {
        $curl = null;
        if (0 === strcmp($type, "GET")) {
            if( count($prm) > 0 ) {
                $uri  .= '?';
                $query = '';
                foreach ($prm as $key => $value) {
                    if( strlen(trim($key)) > 0 ) {
                        $query .= (rawurlencode($key).'='.rawurlencode($value).'&');
                    }
                }
                $uri .= $query;
            }
            $curl = curl_init($uri);
            curl_setopt($curl, CURLOPT_URL           , $uri);
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST , 'GET');
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); // 証明書の検証を行わない
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        } else if (0 === strcmp($type, "POST")) {
            $curl = curl_init($uri);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
            curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($prm));
            curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($curl, CURLOPT_MAXREDIRS     , 5);
        } else {
            throw new Exception("invalid type : " .$type);
        }
        $output = curl_exec($curl);
        curl_close($curl);
        return $output;
    } catch (Exception $e) {
        throw $e;
    }
}
