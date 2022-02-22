
function loadCardHiddenPart() {
    let cardHiddenBlock = $$('.card-body');
    cardHiddenBlock.forEach(function (value, index) {
        let cardButtonShow = value.querySelector('.card-more'),
            cardButtonHide = value.querySelector('.card-less'),
            hiddenCardInfoBlock = value.querySelector('.hidden-card-info');
        cardButtonShow.addEventListener('click', event => {
            cardButtonHide.style.display = 'flex';
            cardButtonShow.style.display = 'none';
            hiddenCardInfoBlock.style.display = 'block';
        });
        cardButtonHide.addEventListener('click', event => {
            cardButtonShow.style.display = 'flex';
            cardButtonHide.style.display = 'none';
            hiddenCardInfoBlock.style.display = 'none';
        });
    })
}
document.addEventListener('DOMContentLoaded', function(){
    loadCardHiddenPart();
});