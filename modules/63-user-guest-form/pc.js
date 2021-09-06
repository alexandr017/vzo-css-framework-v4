document.addEventListener('DOMContentLoaded', function(){
    let showPassItems = document.querySelectorAll('.user-guest-form-text-block .show-pass');
    for(let i = 0; i < showPassItems.length;i++){
        showPassItems[i].addEventListener('click', function () {
            this.classList.toggle('show-pass');
            this.classList.toggle('hide-pass');
            if(this.classList.contains('hide-pass')) {
                this.parentNode.getElementsByClassName('user-guest-form-inp')[0].attributes['type'].nodeValue = 'text';
            } else {
                this.parentNode.getElementsByClassName('user-guest-form-inp')[0].attributes['type'].nodeValue = 'password';
            }
        })
    }
    let repeatPass = document.getElementById('user-guest-repeat-pass');
    let newPass = document.getElementById('user-guest-new-pass');
    if(repeatPass) {
        repeatPass.addEventListener('keyup',function () {
            passMatchesFn(this,newPass);
        });
    }
    if(newPass) {
        newPass.addEventListener('keyup',function () {
            passMatchesFn(repeatPass,this);
        });
    }
    function passMatchesFn(repeatPass,newPass) {
        let resetPassErrMsg = document.getElementsByClassName('reset-pass-error')[0];
        let passMatchesItems = document.getElementsByClassName('passwords-matches');
        if(repeatPass.value == newPass.value && newPass.value != '' && repeatPass.value != '') {
            for(let i=0;i<passMatchesItems.length;i++) {
                passMatchesItems[i].style.display = 'block';
            }
            resetPassErrMsg.style.display = 'none';
        } else {
            for(let i=0;i<passMatchesItems.length;i++) {
                passMatchesItems[i].style.display = 'none';
            }
            resetPassErrMsg.style.display = 'block';
            if(newPass.value == '' && repeatPass.value == '') {
                resetPassErrMsg.style.display = 'none';
            }
        }
    }
});