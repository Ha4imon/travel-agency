(function () {
  var btnMenu = document.querySelector('.main-menu__btn');
  var mainMenu = document.querySelector('.main-menu__wrapper');
  
  var openMenuHandler = function() {
    mainMenu.classList.toggle('main-menu__wrapper--active');
    btnMenu.classList.toggle('main-menu__btn--active');
  }
  
  btnMenu.addEventListener('click', openMenuHandler);
})();
