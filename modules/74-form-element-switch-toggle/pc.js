if ($$('#supportSwitchToggle').length > 0) {
    $$('#supportSwitchToggle')[0].addEventListener('click', () => {
        if ($$('#jivo-iframe-container').length > 0) {
            console.log(1);
            $$('#jivo-iframe-container')[0].style.display = ($$('#jivo-iframe-container')[0].style.display == 'none') ? 'block' : 'none'
            $$('jdiv')[0].style.display = ($$('jdiv')[0].style.display == 'none') ? 'block' : 'none'
        } else {
            (function(){ var widget_id = 'Y5Z2sXofKC';var d=document;var w=window;function l(){
                var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
                s.src = '//code.jivosite.com/script/widget/'+widget_id
                ; var ss = document.getElementsByTagName('script')[0]; ss.parentNode.insertBefore(s, ss);}
                if(d.readyState=='complete'){l();}else{if(w.attachEvent){w.attachEvent('onload',l);}
                else{w.addEventListener('load',l,false);}}})();
        }
    })
};