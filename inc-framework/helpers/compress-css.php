<?php

if (! function_exists('compress_css')) {
    /**
     * @param string $s
     * @return string
     */
    function compress_css($s)
    {
        $s = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $s);
        $s = str_replace(array("\r\n", "\r", "\n", "\t", '  ', '    ', '    '), '', $s);
        return $s;
    }
}
