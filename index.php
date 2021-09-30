<?php

/**
 * pc | mob | amp
 */
$mode = $_GET['mode'] ?? 'pc';

require_once 'inc-framework/loader.php';
require_once 'inc-framework/mode.php';
require_once 'inc-framework/import.php';

if($mode == 'amp') {
    require_once 'inc-framework/layout-amp.php';
} else {
    require_once 'inc-framework/layout.php';
}