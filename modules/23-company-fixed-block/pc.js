document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementsByClassName('comp-fixed-block').length != 0) {
        var companyFixedBlock = document.getElementsByClassName('comp-fixed-block')[0];
        window.addEventListener('scroll',function () {
            if(this.scrollY > 0) {
                companyFixedBlock.classList.add('comp-fixed');
            } else {
                companyFixedBlock.classList.remove('comp-fixed');
            }
        },false)
    }
});