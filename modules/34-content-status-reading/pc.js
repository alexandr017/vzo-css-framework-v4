function changeContentStatus()
{
    let offset = window.scrollY / ($$('.content')[0].clientHeight - window.innerHeight);
    $$('.progress-bar')[0].style.width = (100 * offset | 0) + "%";
    $$('.progress-page')[0].value = offset;
}

window.addEventListener('scroll', changeContentStatus);
window.addEventListener('resize', changeContentStatus);