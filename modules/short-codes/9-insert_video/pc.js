let videoBlock = $$('.insert-video-block');

for (let i = 0; i < videoBlock.length; i++) {
    videoBlock [i].addEventListener('click', function(){
        let link = this.querySelector('.video-img').getAttribute('data-video');
        this.innerHTML = '<div class="iframe-shadow " style="line-height: 0;" ><iframe allowfullscreen class="border-radius" style="width: 100%; height: 440px"  src="'+ link +'" ></iframe></div>';
    });
}
