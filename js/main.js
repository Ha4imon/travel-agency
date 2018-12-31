(function () {
  var btnMenu = document.querySelector('.main-menu__btn');
  var mainMenu = document.querySelector('.main-menu__wrapper');

  var openMenuHandler = function () {
    mainMenu.classList.toggle('main-menu__wrapper--active');
    btnMenu.classList.toggle('main-menu__btn--active');
  }
  if (btnMenu) {
    btnMenu.addEventListener('click', openMenuHandler);
  }
})();


(function () {
  var slideList = document.querySelectorAll('.slider__wrapper');
  var slideControl = document.querySelector('.slider__control');
  var counter;
  var maxSlide = 2; // отсчет с нуля
  var slideNumber;

  var slideMoveHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('slider__btn-left')) {
      for (var i = 0; i < slideList.length; i++) {
        if (slideList[i].classList.contains('slider__wrapper--active') && (i != 0)) {
          counter = i;
          slideNumber = -1;
          slideMove();
        } else if (slideList[i].classList.contains('slider__wrapper--active') && (i == 0)) {
          counter = i;
          slideNumber = maxSlide;
          slideMove();
        }
      }
    }

    if (target.classList.contains('slider__btn-right')) {
      for (var i = 0; i < slideList.length; i++) {
        if (slideList[i].classList.contains('slider__wrapper--active') && (i != maxSlide)) {
          counter = i;
          slideNumber = 1;
          slideMove();
        } else if (slideList[i].classList.contains('slider__wrapper--active') && (i == maxSlide)) {
          counter = i;
          slideNumber = maxSlide * (-1);
          slideMove();
        }
      }
    }
  }

  var slideMove = function () {
    slideList[counter].classList.remove('slider__wrapper--active');
    setTimeout(function () {
      slideList[counter + slideNumber].classList.add('slider__wrapper--active');
      counter = null;
    }, 200);
  }

  if (slideControl) {
    slideControl.addEventListener('click', slideMoveHandler);
  }
})();
