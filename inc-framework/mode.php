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
        if($_GET['mode'] == $m) {
            $result .= "<option selected value='$m'>$m</option>";
        } else {
            $result .= "<option value='$m'>$m</option>";
        }

    }
    return $result;
}