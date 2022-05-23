var sortItems = document.getElementsByClassName('option');
for (let i = 0; i < sortItems.length; i++) {
    sortItems[i].addEventListener("click", function (event) {
        let el = sortItems[i];

        let selectedItem =  $$('.sort .selected-item')[0];

        let sortActiveItem = el.getAttribute('data-name');
        let activeTag = document.getElementsByClassName('active')[0].dataset.cat;

        selectedItem.innerHTML = el.innerHTML;
        selectedItem.dataset.name = sortActiveItem;
        selectedItem.dataset.type = el.getAttribute('data-type');
        selectedItem.classList.remove('openSelect')

        $$('.sort .selected-dropdown')[0].classList.remove('toggleSelect');

        const metas = document.getElementsByTagName('meta');
        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === 'csrf-token') {
                var token = metas[i].getAttribute('content');
            }
        }

        (async function () {
            let data = {
                sortActiveItem: sortActiveItem,
                activeTag: activeTag
            };
            let response = await fetch('/qa/sort', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'X-CSRF-TOKEN': token
                },
                body: JSON.stringify(data)
            });
            let result = await response.text();
            if (result != '' && response.ok == true) {
                if(document.getElementById('load-more-qa')){
                    document.getElementById('load-more-qa').style.display = 'flex';
                }
                var parser = new DOMParser();
                var qaItems = parser.parseFromString(result, 'text/html');
                document.getElementsByClassName('qa-items-block')[0].innerHTML = '';
                for (let i = qaItems.body.children.length; i > 0; i--) {
                    document.getElementsByClassName('qa-items-block')[0].append(qaItems.body.children[0]);
                }
            }
        })()
        event.stopPropagation();
    }, false);
}