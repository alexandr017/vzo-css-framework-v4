$(document).ready(function(){
    $(".set > button").on("click", function(){
        if($(this).hasClass('active')){
            $(this).removeClass("active");
            $(this).siblings('.panel').slideUp(200);
            $(".set > a svg").removeClass("hide").addClass("show");
        }else{
            $(".set > a svg").removeClass("hide").addClass("show");
            $(this).find("svg").removeClass("show").addClass("hide");
            $(".set > button").removeClass("active");
            $(this).addClass("active");
            $('.panel').slideUp(200);
            $(this).siblings('.panel').slideDown(200);
        }
    });
});