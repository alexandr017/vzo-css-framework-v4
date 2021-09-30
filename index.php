<?php

/**
 * pc | mob | amp
 */
$mode = $_GET['mode'] ?? 'pc';

require_once 'inc-framework/helpers/compress-css.php';
require_once 'inc-framework/helpers/import.php';
require_once 'inc-framework/helpers/loader.php';
require_once 'inc-framework/helpers/mode.php';

if($mode == 'amp') {
    require_once 'inc-framework/layout-amp.php';
} else {
    require_once 'inc-framework/layout.php';
}