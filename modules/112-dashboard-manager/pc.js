let topCards = window.topCard;
document.addEventListener('DOMContentLoaded', function(){
    let favorites = topCards;
    if(favorites != null){
        let data = {
            '_token': $$('[name="csrf-token"]')[0].getAttribute('content'),
            'favorites': favorites,
        };

        fetch('/actions/favorites-load', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            return res.json().then((value) => {

                $$('.offers-list')[0].innerHTML = value.code;
                if(value.code != '') {
                    if($$('#favorites-clear').length != 0) {
                        $$('#favorites-clear')[0].style.display = 'block';
                    }
                    if($$('.block-with-back-link').length != 0) {
                        $$('.block-with-back-link')[0].style.display = 'none'
                    }
                    if($$('.lead').length != 0){
                        $$('.lead')[0].style.display = 'none';
                    }
                }
                addCardsBtnsEvents();
                var compareItems = '';
                for(let i =1; i<9;i++) {
                    var compareItemsByCat = localStorage.getItem('vzo_compare'+i);
                    if(compareItemsByCat != null) {
                        compareItems += compareItemsByCat;
                    }
                }
                if(compareItems != '') {
                    compareItems = compareItems.split(',');
                    $$('.card').forEach((card) => {
                        if(compareItems.indexOf(card.id.substr(5)) != -1) {
                            var cardIconsBlock = card.getElementsByClassName('card-icons')[0];
                            cardIconsBlock.classList.add('addedToCompare')
                        }
                    })
                    $$('.compare-items-count')[0].innerText = compareItems.length;
                    $$('.compare-items-count')[0].style.display = 'flex';

                } else {
                    $$('.compare-items-count')[0].style.display = 'none';
                }

            }).catch((err) => {
                console.log(err);
            })
        });

    }
});