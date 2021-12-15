let videos = $$('.we-compare-insert-video-block');

for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', function(){
        let link = this.querySelector('.video-img').getAttribute('data-video');
        this.innerHTML = '<div class="iframe-shadow " style="line-height: 0;" ><iframe class="border-radius" style="width: 100%; height: 184px"  src="'+ link +'" ></iframe></div>';
    });
}
