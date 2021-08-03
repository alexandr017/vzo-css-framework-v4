let videos = document.getElementsByClassName('insert-video-block');

for (i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', function(){
        let link = this.querySelector('img').getAttribute('data-video');
        this.innerHTML = '<div class="iframe-shadow " style="line-height: 0;" ><iframe class="border-radius" width="314" height="175" src="'+ link +'"></iframe></div>';
    });
}