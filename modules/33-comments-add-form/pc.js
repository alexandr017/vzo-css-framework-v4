function focusForm() {
    $$('.form-1').forEach( form => {
        form.querySelectorAll('input, textarea').forEach(tag => {
            tag.addEventListener('focus', () => {
                form.classList.add('form-1-active');
            });
        });
        form.querySelectorAll('input, textarea').forEach(tag => {
            tag.addEventListener('focusout', () => {
                form.classList.remove('form-1-active');
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', focusForm);