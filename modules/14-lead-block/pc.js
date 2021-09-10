function hiddenLeadBlock() {
    let buttonLeadShow = $$('.lead-btn-more')[0],
        buttonLeadHide = $$('.lead-btn-less')[0],
        hiddenLeadContent = $$('.hidden-lead-part');
    buttonLeadShow.addEventListener('click', event => {
        buttonLeadShow.style.display = 'none';
        for (let i = 0; i < hiddenLeadContent.length; i++) {
            hiddenLeadContent[i].style.display = 'inline';
        }
    });
    buttonLeadHide.addEventListener('click', event => {
        buttonLeadShow.style.display = 'block';
        for (let i = 0; i < hiddenLeadContent.length; i++) {
            if (hiddenLeadContent[i].style.display === 'inline') {
                hiddenLeadContent[i].style.display = 'none'
            }
        }
    });
}
document.addEventListener('DOMContentLoaded', hiddenLeadBlock);

