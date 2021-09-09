function showModalBlock() {
    let modals = document.querySelectorAll('[data-modal]');
    modals.forEach(function (trigger) {
        trigger.addEventListener('click', function (event) {
            event.preventDefault();
            let modal = document.getElementById(trigger.dataset.modal);
            modal.classList.add('open');
            let exits = document.querySelectorAll('.modal-exit');
            exits.forEach(function (exit) {
                exit.addEventListener('click', function (event) {
                    event.preventDefault();
                    modal.classList.remove('open');
                });
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', showModalBlock);
