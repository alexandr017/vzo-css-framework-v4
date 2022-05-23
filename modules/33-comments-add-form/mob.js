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

function clearForm(btn) {
    btn.style.display='none';

    btn.closest('.form-1').querySelectorAll('input, textarea').forEach(tag => {
        if (!tag.readOnly) {
            tag.value = "";
        }
    });
}

function formCancelBtn() {
    $$('.form-1').forEach(form => {
        let cancelBtn = form.querySelector('.cancel-btn');
        let status = [];

        if (cancelBtn == null) {
            return;
        }

        form.querySelectorAll('input, textarea').forEach((tag, index) => {
            tag.addEventListener('keyup', e => {
                status[index] = e.target.value == "";
                if (status.every(Boolean)) {
                    cancelBtn.style.display = 'none';
                } else {
                    cancelBtn.style.display = 'block';
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', focusForm);
document.addEventListener('DOMContentLoaded', formCancelBtn);