$$('.vertical-tab-wrap').forEach((e) => {
    let tabTabs = e.querySelectorAll('.vertical-tab .vertical-tab-links');
    let tabItems = e.querySelectorAll('.vertical-tabs-items .vertical-tab-content');
    for(let i =0;i<tabTabs.length;i++) {
        tabTabs[0].click();
        tabTabs[i].onclick = () => {
            tabTabs.forEach((e)  => { e.classList.remove('on') });
            tabItems.forEach((e)  => { e.classList.remove('on') });
            tabTabs[i].classList.add('on');
            tabItems[i].classList.add('on');
        }
    }
});

// let tab =$$('#vertical-tab-scroll')[0];
// tab.onmousedown = () => {
//     let pageX = 0;
//     document.onmousemove = e => {
//         if (pageX !== 0) {
//             tab.scrollLeft = tab.scrollLeft + (pageX - e.pageX);
//         }
//         pageX = e.pageX;
//     };
//     tab.onmouseup = () => {
//         document.onmousemove = null;
//         tab.onmouseup = null;
//     };
//     tab.ondragstart = () => {
//         return false;
//     };
// };