function centerActiveLinkOffset() {
    let activeNavLink = document.getElementsByClassName('active')[0];
    let navMenuPadding = 10;
    let navMenuCenterCoordinate = (window.innerWidth / 2) - (activeNavLink.clientWidth / 2);
    let activeNavLinkCenterScroll = activeNavLink.offsetLeft - navMenuPadding - navMenuCenterCoordinate;

    document.getElementsByClassName('nav-menu')[0].scrollLeft = activeNavLinkCenterScroll;
}
centerActiveLinkOffset();
