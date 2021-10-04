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
