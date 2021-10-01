<?php

/**
 * @param string $path
 * @param string $mode
 */
function import($path, $mode = null)
{
    if ($mode == null) {
        $mode = getCurrentMode();
    }

    searchModule($path, true, $mode);
}


function includeModule($moduleName, $mode = null)
{
    if ($mode == null) {
        $mode = getCurrentMode();
    }

    searchModule($moduleName, false, $mode);
}

function includeShortCode($shortCodeName, $mode = null) {
    if ($mode == null) {
        $mode = getCurrentMode();
    }

    searchModule('short-codes/'. $shortCodeName, false, $mode);
}

