$$('.more-tags-btn')[0].addEventListener('click',function () {
   let list = this.nextElementSibling;
   list.classList.toggle('showed-tags-list');
   this.querySelector('svg').classList.toggle('rotate');
   let text = this.querySelector('span').innerHTML;
   text = (text === 'Больше') ? 'Меньше' : 'Больше';
   this.querySelector('span').innerHTML = text;
});