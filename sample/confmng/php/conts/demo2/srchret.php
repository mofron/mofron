<?php
try {
    require_once(__DIR__ . '/../../common/cmdb/require.php');
    
    $srch_key = $_GET['search'];
    if (1 === preg_match('/^(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/',$srch_key)) {
        /* key is ipaddress */
        $ipdev   = Fcmd_searchIpaddress(array(
                       'ipaddress' => $srch_key
                   ));
        if (null === $ipdev) {
            return;
        }
        $hostdev[] = array();
        foreach ($ipdev as $ipdev_elm) {
            $tmp       = Fcmd_getHost(array(
                             'id' => $ipdev_elm['host_id']
                         ));
            $hostdev[] = $tmp[0];
        }
    } else {
        /* key is hostname */
        $hostdev = Fcmd_searchHost(array(
                       'name' => $srch_key
                   ));
        if (null === $hostdev) {
            return;
        }
        $ipdev[] = array();
        foreach ($hostdev as $hostdev_elm) {
            $tmp     = Fcmd_getIpaddress(array(
                           'host_id' => $hostdev_elm['id']
                       ));
            $ipdev[] = $tmp[0];
        }
    }
    
    
    foreach ($hostdev as $hostdev_elm) {
        $dev_id = null;
        $tmp    = Fcmd_getHosts(array(
                      'host_name_id' => $hostdev_elm['id']
                  ));
        $dev_id = $tmp[0]['id'];
        foreach ($ipdev as $ipdev_elm) {
            if (0 === strcmp($hostdev_elm['id'], $ipdev_elm['host_id'])) {
                $row  = '<tr>';
                $row .= '<td class="c-retrow c-retrow-id" style="padding-top:15px;">'. $dev_id .'</td>';
                $row .= '<td class="c-retrow c-retrow-host" style="padding-top:15px;">'. $hostdev_elm['name'] .'</td>';
                $row .= '<td class="c-retrow c-retrow-ip" style="padding-top:15px;">'. $ipdev_elm['ipaddress'] .'</td>';
                $row .= '<td class="c-retrow c-retrow-remk" style="padding-top:15px;">'. $hostdev_elm['remarks'] .'</td>';
                $row .= '<td><div class="c-btn-ujarak c-retchk-btn">Check</div></td>';
                $row .= '</tr>';
                echo $row;
                break;
            }
        }
    }
} catch (Exception $e) {
    echo $e->getMessage();
}
