function hiddenLeadBlock() {
    if ($$('.lead-btn-more').length > 0) {
        let buttonLeadShow = $$('.lead-btn-more')[0],
            buttonLeadHide = $$('.lead-btn-less')[0],
            hiddenLeadContent = $$('.lead-hidden-part')[0];
        buttonLeadShow.addEventListener('click', event => {
            buttonLeadShow.style.display = 'none';
            buttonLeadHide.style.display = 'block';
            hiddenLeadContent.classList.remove('lead-hidden-part');
        });
        buttonLeadHide.addEventListener('click', event => {
            buttonLeadShow.style.display = 'block';
            buttonLeadHide.style.display = 'none';
            hiddenLeadContent.classList.add('lead-hidden-part');
        });
    }
}
document.addEventListener('DOMContentLoaded', hiddenLeadBlock);

