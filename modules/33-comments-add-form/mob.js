function focusForm() {
    $$('.form-1').forEach( form => {
        let cancelBtn = $$('.cancel-btn')[0];
        form.querySelectorAll('input, textarea').forEach(tag => {
            tag.addEventListener('focus', () => {
                form.classList.add('form-1-active');
                if(cancelBtn){
                    // cancelBtn.style.display='block';
                }
            });
        });
        form.querySelectorAll('input, textarea').forEach(tag => {
            tag.addEventListener('focusout', () => {
                form.classList.remove('form-1-active');
                // cancelBtn.style.display='none';
            });
        });
    });
}

function clearForm() {
    $$('.cancel-btn')[0].style.display='none';

    $$('.form-1').forEach(form => {
        form.querySelectorAll('input, textarea').forEach(tag => {
            tag.value = "";
        });
    });
}

$$('.form-1').forEach(form => {
    let cancelBtn = $$('.cancel-btn');
    let status = [];

    form.querySelectorAll('input, textarea').forEach((tag, index) => {
        tag.addEventListener('keyup', e => {
            status[index] = e.target.value == "";
            if(cancelBtn.length != 0) {
                cancelBtn = cancelBtn[0];
                if (status.every(Boolean)) {
                    cancelBtn.style.display='none';
                } else {
                    cancelBtn.style.display='block';
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', focusForm);
