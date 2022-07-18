document.querySelectorAll('.modal-certificate-open').forEach( (button) => {
    button.addEventListener('click', (e) => {
        let certificateCard = e.target.closest('.modal-certificate-open');
        document.querySelector('.certificate-img').src = certificateCard.dataset.image;
        document.querySelector('.description').innerHTML = certificateCard.dataset.description;
    })
})
