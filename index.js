(function(window, document) {

  var burger = document.querySelector('.js-idl-header__burger');
  var nav = document.querySelector('.js-idl-header__nav');

  function toggleNav() {
    if(!nav.classList.contains('is-open')) {
      nav.classList.add('is-open');
    } else {
      nav.classList.remove('is-open');
    }
  };

  burger.addEventListener('click', toggleNav, false);

})(window, document);
