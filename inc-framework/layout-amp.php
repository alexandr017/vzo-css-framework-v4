<!doctype html>
<html ⚡>
<head>
    <meta charset="utf-8">
    <script async src="https://cdn.ampproject.org/v0.js"></script>
    <meta name="viewport" content="width=device-width">
    <title><?php if (isset($mode)) echo $mode . ' - '; ?>ВЗО UX Framework</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="format-detection" content="telephone=no">
    <script async custom-element="amp-carousel" src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"></script>
    <script async custom-element="amp-selector" src="https://cdn.ampproject.org/v0/amp-selector-0.1.js"></script>
<!--    <script async custom-element="amp-inline-gallery" src="https://cdn.ampproject.org/v0/amp-inline-gallery-0.1.js"></script>-->
<!--    <script async custom-element="amp-base-carousel" src="https://cdn.ampproject.org/v0/amp-base-carousel-0.1.js"></script>-->
    <script async custom-element="amp-fit-text" src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"></script>
    <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"></script>
    <script async custom-element="amp-lightbox-gallery" src="https://cdn.ampproject.org/v0/amp-lightbox-gallery-0.1.js"></script>
    <link rel="canonical" href="https://vsezaimyonline.ru">
    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <style amp-custom>
        body {
            padding: 100px 0;
            font-size: 1em;
        }
        .container {
            padding: 0;
            width: 100%;
            max-width: 768px;
            margin: 0 auto;
        }
        :root {
            --color-primary: #005AF0;
            --space-1: .5rem;  /* 8px */
            --space-4: 2rem;   /* 32px */
        }

        /* Styles for the flex layout based tabs */
        amp-selector[role=tablist].tabs-with-flex {
            display: flex;
            flex-wrap: wrap;
        }
        amp-selector[role=tablist].tabs-with-flex [role=tab] {
            flex-grow: 1;
            /* custom styling, feel free to change */
            text-align: center;
            padding: var(--space-1);
        }
        amp-selector[role=tablist].tabs-with-flex [role=tab][selected] {
            outline: none;
            /* custom styling, feel free to change */
            border-bottom: 2px solid var(--color-primary);
        }
        amp-selector[role=tablist].tabs-with-flex [role=tabpanel] {
            display: none;
            width: 100%;
            order: 1; /* must be greater than the order of the tab buttons to flex to the next line */
            /* custom styling, feel free to change */
            padding: var(--space-4);
        }
        amp-selector[role=tablist].tabs-with-flex [role=tab][selected] + [role=tabpanel] {
            display: block;
        }

        /* Styles for the selector based tabs */
        amp-selector[role=tablist].tabs-with-selector {
            display: flex;
        }
        amp-selector[role=tablist].tabs-with-selector [role=tab][selected] {
            outline: none;
            /* custom styling, feel free to change */
            border-bottom: 2px solid var(--color-primary);
        }
        amp-selector[role=tablist].tabs-with-selector {
            display: flex;
        }
        amp-selector[role=tablist].tabs-with-selector [role=tab] {
            /* custom styling, feel free to change */
            width: 100%;
            text-align: center;
            padding: var(--space-1);
        }
        amp-selector.tabpanels [role=tabpanel] {
            display: none;
            /* custom styling, feel free to change */
            padding: var(--space-4);
        }
        amp-selector.tabpanels [role=tabpanel][selected] {
            outline: none;
            display: block;
        }
        <?php
        include('modules/general/mob.css');
        include('modules/_framework/buttons/amp.css');
        include('modules/_framework/tables/pc.css');
        include('modules/_framework/titles/pc.css');
        include('modules/_framework/grid/pc.css');
            $mode = $_GET['mode'] ?? 'pc';
            $module = $_GET['module'];
            $mode_style = $_SERVER['DOCUMENT_ROOT'].'/modules/'.$module.'/amp.css';
            if(file_exists($mode_style)){
                include ($mode_style);
            }
        ?>
    </style>
</head>
<body>
<div class="container">
    <?php
    $mode_content = $_SERVER['DOCUMENT_ROOT'].'/modules/'.$module.'/amp.html';
    if(file_exists($mode_content)){
        include ($mode_content);
    }
    ?>
</div>
</body>
</html>