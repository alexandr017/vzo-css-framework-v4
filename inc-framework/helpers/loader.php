<?php


function searchModule($moduleName, $printHTHL = true, $mode = null)
{
    $html = '';
    $css = '';
    $js = '';

    if ($mode == 'amp') {
        if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/modules/'  . $moduleName . '/amp.html')) {
            $html = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/amp.html');
            $css = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/amp.css');
        } elseif (file_exists($_SERVER['DOCUMENT_ROOT'] . '/modules/'  . $moduleName . '/mob.html')) {
            $html = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.html');
            $css = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.css');
            $js = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.js');
        } elseif (file_exists($_SERVER['DOCUMENT_ROOT'] . '/modules/'  . $moduleName . '/pc.html')) {
            $html = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.html');
            $css = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.css');
            $js = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.js');
        }
    } elseif ($mode == 'mob') {
        if (file_exists($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.html')) {
            $html = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.html');
            $css = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.css');
            $js = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/mob.js');
        } elseif (file_exists($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.html')) {
            $html = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.html');
            $css = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.css');
            $js = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.js');
        }
    } elseif(file_exists($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.html')) {
        $html = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.html');
        $css = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.css');
        $js = loader($_SERVER['DOCUMENT_ROOT'] . '/modules/' . $moduleName . '/pc.js');
    }

    if (isset($GLOBALS ['js'])) {
        $GLOBALS ['js'] .= $js;
    } else {
        $GLOBALS ['js'] = $js;
    }

    if (isset($GLOBALS ['css'])) {
        $GLOBALS ['css'] .= $css;
    } else {
        $GLOBALS ['css'] = $css;
    }

    if ($printHTHL) {
        echo $html;
    }
}


/**
 * @param string $path
 * @return string $code
 */
function loader($path)
{
    $code = '';

    if (file_exists($path)) {
        $code = file_get_contents($path);
    }

    $code = preg_replace_callback("/{{.{1,500}}}/", "replaceModulesCallback", $code);
    $code = preg_replace_callback("/\[\[.{1,500}\]\]/", "replaceShortCodesCallback", $code);

    return $code;
}

function replaceModulesCallback($matches)
{
    foreach ($matches as $match) {
        includeModule(str_replace(['{{', '}}'], '', $match));
    }
    return '';
}

function replaceShortCodesCallback($matches)
{
    foreach ($matches as $match) {
        includeShortCode(str_replace(['[[', ']]'], '', $match));
    }
    return '';
}
