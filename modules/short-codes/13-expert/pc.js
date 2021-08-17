function actionMoreLess(){
    var boxOuter = ".data-more-less,
        boxInner = ".data-more-less-inner",
        boxBody = ".data-more-less-body",
        showMore = $(".action-more"),
        showLess = $(".action-less");
    $(boxInner).each(function(){
        var $this = $(this),
            bodyDataH = $this.find(boxBody).height();
        $this.css("max-height", $this.data("height"));
        var $thisH = $this.height();
        if(bodyDataH > $thisH){
            $this.closest(boxOuter).removeClass("action-disabled");
        } else {
            $this.closest(boxOuter).addClass("action-disabled");
        }
    })
    showMore.click(function(e){
        e.preventDefault();
        var $this = $(this),
            boxInnerH = $this.closest(boxOuter).find(boxInner).height(),
            boxInnerUpdate = boxInnerH + $this.closest(boxOuter).find(boxInner).data("increase-by"),
            boxBodyH = $this.closest(boxOuter).find(boxBody).height();
        setTimeout(function(){
            if(boxBodyH > boxInnerUpdate){
                $this.closest(boxOuter).removeClass("less-active").find(boxInner).css("max-height", boxInnerUpdate);
            } else {
                $this.closest(boxOuter).addClass("less-active").find(boxInner).css("max-height", "none");
            }
        },10);
    });
showLess.click(function(){
    $(this).closest(boxOuter).removeClass("less-active").find(boxInner).css("max-height", $(this).closest(boxOuter).find(boxInner).data("height"));
    return false;
});
} actionMoreLess();
