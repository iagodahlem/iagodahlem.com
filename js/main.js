/**
 * Header
 */
(function () {
  var BACKGROUND_VISIBLE = 'header--backgroundVisible';
  var HEADER_UP = 'header--up';

  var header = document.querySelector('.js-header');
  var headerHeight = header.clientHeight;

  var delta = 40;
  var lastScrollY = 0;

  var toggleBackground = function (e) {
    var scrollY = window.scrollY;

    if (scrollY > 0) {
      header.classList.add(BACKGROUND_VISIBLE);
      return;
    }

    header.classList.remove(BACKGROUND_VISIBLE);
    return;
  };

  var toggleFixed = function (e) {
    var scrollY = window.scrollY;

    if (Math.abs(lastScrollY - scrollY) <= delta) {
      return;
    }

    if (scrollY > lastScrollY && scrollY > headerHeight * 2) {
      header.classList.add(HEADER_UP);
    } else {
      header.classList.remove(HEADER_UP);
    }

    lastScrollY = scrollY;
  };

  var scrollHandle = function (e) {
    setTimeout(function () {
      toggleBackground();
      toggleFixed();
    }, 100);
  };

  toggleBackground();
  toggleFixed();
  window.addEventListener('scroll', scrollHandle);
}());

/**
 * Menu
 */
(function () {
  var ANIMATABLE = 'menu--animatable';
  var VISIBLE = 'menu--visible';

  var menu = document.querySelector('.js-menu');
  var toggle = document.querySelector('.js-toggle');

  var handleToggleClick = function (e) {
    menu.classList.add(ANIMATABLE);

    if (!menu.classList.contains(VISIBLE)) {
      menu.classList.add(VISIBLE);
    } else {
      menu.classList.remove(VISIBLE);
    }
  };

  var handleMenuTransitionEnd = function (e) {
    menu.classList.remove(ANIMATABLE);
  };

  menu.addEventListener('transitionend', handleMenuTransitionEnd, false);
  toggle.addEventListener('click', handleToggleClick, false);
  menu.addEventListener('click', handleToggleClick, false);
}());

/**
 * Page
 */
(function() {
  var height = document.documentElement.clientHeight;
  var pageHeader = document.querySelector('.js-page-header');

  if (!pageHeader || !pageHeader.dataset.fullheight) {
    return;
  }

  pageHeader.style.height = height + 'px';
}());
