<?php

function includeModule($moduleName, $mode = null)
{
    $priorityArr = ['amp', 'turbo', 'mob', 'pc'];
    $template = $_SERVER['DOCUMENT_ROOT'] . '/modules/';

    if ($mode == null) {
        $mode = getClearModuleUrl();
    }

    // согласно приоритету грузим скрипты и стили модуля (если существует файл css)
    foreach ($priorityArr as $priority) {

        if ($mode == $priority) {

            $jsFile = $template . '/' . $mode . '.js';
            if (file_exists($jsFile)) {
                //$GLOBALS ['m'] = file_get_contents($jsFile);
                $GLOBALS ['m'][] = $moduleName;
            }

            $cssFile = $template . '/' . $mode . '.css';
            if (file_exists($cssFile)) {
                if (isset($GLOBALS ['css'])) {
                    $GLOBALS ['css'] .= file_get_contents($cssFile);
                } else {
                    $GLOBALS ['css'] = file_get_contents($cssFile);
                }
                return null;
            }
        }
    }

    return null;
}

function includeShortCode($shortCodeName) {

}