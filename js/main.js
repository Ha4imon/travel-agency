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
  var slider = document.querySelector('.carousel');
  var slideList = slider.querySelectorAll('.carousel__item');
  var slideControl = slider.querySelector('.carousel__control');
  var maxSlide = 2; // отсчет с нуля
  var counter;
  var slideNumber;
  var widthSlider;
  var locked = true;

  var slideMoveHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('carousel__btn-left')) {
      for (var i = 0; i < slideList.length; i++) {
        if (slideList[i].classList.contains('carousel__item--active') && (i != 0) && locked) {
          counter = i;
          slideNumber = -1;
          widthSlider = parseFloat(getComputedStyle(slider).width);
          slideMove();
          return;
        } else if (slideList[i].classList.contains('carousel__item--active') && (i == 0) && locked) {
          counter = i;
          slideNumber = maxSlide;
          widthSlider = parseFloat(getComputedStyle(slider).width);
          slideMove();
          return;
        }
      }
    }

    if (target.classList.contains('carousel__btn-right')) {
      for (var i = 0; i < slideList.length; i++) {
        if (slideList[i].classList.contains('carousel__item--active') && (i != maxSlide) && locked) {
          counter = i;
          slideNumber = 1;
          widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
          slideMove();
          return;
        } else if (slideList[i].classList.contains('carousel__item--active') && (i == maxSlide) && locked) {
          counter = i;
          slideNumber = maxSlide * (-1);
          widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
          slideMove();
          return;
        }
      }
    }
  }

  var moveSlideTimer = function () {
    for (var i = 0; i < slideList.length; i++) {
      slider.onmouseover = function () {
        clearInterval(timer);
      }
      slider.onmouseout = function () {
        clearInterval(timer);
        timer = setInterval(moveSlideTimer, 5000);
      }
      if (slideList[i].classList.contains('carousel__item--active') && (i != maxSlide) && locked) {
        counter = i;
        slideNumber = 1;
        widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
        slideMove();
        return;
      } else if (slideList[i].classList.contains('carousel__item--active') && (i == maxSlide) && locked) {
        counter = i;
        slideNumber = maxSlide * (-1);
        widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
        slideMove();
        return;
      }
    }
  }

  var slideMove = function () {
    locked = false;
    slideList[counter + slideNumber].style.transform = 'translateX(' + (widthSlider * -1) + 'px)';
    setTimeout(function () {
      slideList[counter + slideNumber].classList.add('carousel__item--active');
      setTimeout(function () {
        slideList[counter].style.transform = 'translateX(' + widthSlider + 'px)';
        slideList[counter + slideNumber].style.transform = 'translateX(0)';
        setTimeout(function () {
          slideList[counter].classList.remove('carousel__item--active');
          slideList[counter + slideNumber].classList.add('carousel__item--active');
          slideList[counter].style.transform = 'translateX(' + 0 + 'px)';
          locked = true;
        }, 1000);
      }, 50);
    }, 50);
  }

  var timer = setInterval(moveSlideTimer, 5000);

  if (slideControl) {
    slideControl.addEventListener('click', slideMoveHandler);
  }
})();
