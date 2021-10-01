$$('.tab-wrap').forEach((e) => {
    let tabTabs = e.querySelectorAll('.tab .tab-links');
    let tabItems = e.querySelectorAll('.tabs-items .tab-content');
    for(let i =0;i<tabTabs.length;i++) {
        tabTabs[0].classList.add('on');
        tabItems[0].classList.add('on');
        tabTabs[i].onclick = () => {
            tabTabs.forEach((e)  => { e.classList.remove('on') });
            tabItems.forEach((e)  => { e.classList.remove('on') });
            tabTabs[i].classList.add('on');
            tabItems[i].classList.add('on');
        }
    }
});

$$('.timeline_wrap').forEach((e) => {
    let timeLineTabTabs = e.querySelectorAll('.timeline-tab .time-line-tab-link');
    let timeLineTabItems = e.querySelectorAll('.timeline-tabs-item .timeline-tab-content');
    for(let i = 0 ; i < timeLineTabTabs.length; i++) {
        timeLineTabTabs[0].classList.add('active-tab');
        timeLineTabItems[0].classList.add('active-tab');
        timeLineTabTabs[i].onclick = () => {
            timeLineTabTabs.forEach((e)  => { e.classList.remove('active-tab') });
            timeLineTabItems.forEach((e)  => { e.classList.remove('active-tab') });
            timeLineTabTabs[i].classList.add('active-tab');
            timeLineTabItems[i].classList.add('active-tab');
        }
    }
});


if ( document.querySelectorAll('.our-benefits-slider' ).length > 0) {
    slideShow({
        element: '.our-benefits-slider',
        slidesToShow: 1,
        slidesToScroll: 1,
        circleScroll: false,
        height: '300',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    height: '240'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

if(document.getElementsByClassName('our-security-slider').length>0){
    slideShow({
        element:'.our-security-slider',
        slidesToShow:1,
        slidesToScroll:1,
        circleScroll:false,
        height:'300',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    height:'240'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

if(document.getElementsByClassName('our_expert_slider').length>0){
    slideShow({
        element:'.our_expert_slider',
        slidesToShow:2,
        slidesToScroll:1,
        circleScroll:true,
        height:'290',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

if(document.getElementsByClassName('our_expert').length>0){
    slideShow({
        element:'.our_expert',
        slidesToShow:2,
        slidesToScroll:1,
        circleScroll:true,
        height:'290',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

if(document.getElementsByClassName('smi_slider').length>0){
    slideShow({
        element:'.smi_slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'220',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    height:'240'
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}

if(document.getElementsByClassName('news-slider').length>0){
    slideShow({
        element:'.news-slider',
        slidesToShow:3,
        slidesToScroll:1,
        circleScroll:false,
        height:'400',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    })
}


let videos = $$('.insert-video-block');

for (let i = 0; i < videos.length; i++) {
    videos[i].addEventListener('click', function(){
        let link = this.querySelector('.video-img').getAttribute('data-video');
        this.innerHTML = '<div class="iframe-shadow " style="line-height: 0;" ><iframe class="border-radius" style="width: 100%; height: 350px"  src="'+ link +'" ></iframe></div>';
    });
}






