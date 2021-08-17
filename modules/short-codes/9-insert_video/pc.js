let videos = document.getElementsByClassName('insert-video-block');
let articleVideo = document.getElementsByClassName('article-video');

for (i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', function(){
        let link = this.querySelector('img').getAttribute('data-video');
        this.innerHTML = '<div class="iframe-shadow " style="line-height: 0;" ><iframe class="border-radius" width="476" height="268" src="'+ link +'" ></iframe></div>';
    });
    articleVideo[i].addEventListener('click', function(){
        let link = this.querySelector('img').getAttribute('data-video');
        this.innerHTML = '<div class="iframe-shadow " style="line-height: 0;" ><iframe class="border-radius" width="790" height="445" src="'+ link +'" ></iframe></div>';
    });
}
