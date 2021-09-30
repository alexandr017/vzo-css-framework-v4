<?php
function getClearModuleUrl()
{
    $uri = $_SERVER['REQUEST_URI'];
    return str_replace(['&mode=pc', '&mode=mob', '&mode=amp'], '', $uri);
}

function generateSelectOptions()
{
    $modes = ['pc', 'mob', 'amp'];

    $result = '';

    foreach ($modes as $m) {
        if (isset($_GET['mode'])) {
            if($_GET['mode'] == $m) {
                $result .= "<option selected value='$m'>$m</option>";
            } else {
                $result .= "<option value='$m'>$m</option>";
            }
        } else {
            $result .= "<option value='$m'>$m</option>";
        }


    }
    return $result;
}


function getCurrentMode()
{
// не безопасно прямиком возращать то что лежит в $_GET['mode']
//    if (isset($_GET['mode'])) {
//        return $_GET['mode'];
//    }

    if(isset($_GET['mode'])) {
        switch ($_GET['mode']) {
            case 'mob':
                return 'mob';
            case 'amp':
                return 'amp';
            case 'turbo':
                return 'turbo';
        }
    }

    return 'pc';

}