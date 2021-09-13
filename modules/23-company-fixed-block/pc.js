document.addEventListener('DOMContentLoaded', function(){
    var companyFixedBlock = document.getElementsByClassName('comp-fixed-block')[0];
    window.addEventListener('scroll',function () {
        if(this.scrollY > 0) {
            companyFixedBlock.classList.add('comp-fixed');
        } else {
            companyFixedBlock.classList.remove('comp-fixed');
        }
    },false)
});