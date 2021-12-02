function focusForm() {
    $$('.form-1').forEach( form => {
        let cancelBtn = $$('.cancel-btn')[0];
        form.querySelectorAll('input, textarea').forEach(tag => {
            tag.addEventListener('focus', () => {
                form.classList.add('form-1-active');
                cancelBtn.style.display='block';
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

document.addEventListener('DOMContentLoaded', focusForm);