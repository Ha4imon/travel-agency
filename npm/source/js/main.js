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
  var slider = document.querySelector('.slider');
  var slideList = slider.querySelectorAll('.slider__item');
  var slideControl = slider.querySelector('.slider__control');
  var counter;
  var maxSlide = 2; // отсчет с нуля
  var slideNumber;
  var widthSlider;

  var slideMoveHandler = function (evt) {
    evt.preventDefault();
    var target = evt.target;
    if (target.classList.contains('slider__btn-left')) {
      for (var i = 0; i < slideList.length; i++) {
        if (slideList[i].classList.contains('slider__item--active') && (i != 0)) {
          counter = i;
          slideNumber = -1;
          widthSlider = parseFloat(getComputedStyle(slider).width);
          slideMove();
        } else if (slideList[i].classList.contains('slider__item--active') && (i == 0)) {
          counter = i;
          slideNumber = maxSlide;
          widthSlider = parseFloat(getComputedStyle(slider).width);
          slideMove();
        }
      }
    }

    if (target.classList.contains('slider__btn-right')) {
      for (var i = 0; i < slideList.length; i++) {
        if (slideList[i].classList.contains('slider__item--active') && (i != maxSlide)) {
          counter = i;
          slideNumber = 1;
          widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
          slideMove();
        } else if (slideList[i].classList.contains('slider__item--active') && (i == maxSlide)) {
          counter = i;
          slideNumber = maxSlide * (-1);
          widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
          slideMove();
        }
      }
    }
  }

  var slideMove = function () {
    slideList[counter + slideNumber].style.display = 'block';
    slideList[counter].classList.remove('slider__item--active');
    slideList[counter + slideNumber].style.transform = 'translateX(' + (widthSlider * -1) + 'px)';
    setTimeout(function () {
      slideList[counter].style.transform = 'translateX(' + widthSlider + 'px)';
      slideList[counter + slideNumber].style.transform = 'translateX(0)';
      setTimeout(function () {
        slideList[counter].style.display = 'none';
        slideList[counter + slideNumber].classList.add('slider__item--active');
        slideList[counter].style.transform = 'translateX(' + 0 + 'px)';
      }, 1000);

    }, 100);
  }

  if (slideControl) {
    slideControl.addEventListener('click', slideMoveHandler);
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
      if (slideList[i].classList.contains('slider__item--active') && (i != maxSlide)) {
        counter = i;
        slideNumber = 1;
        widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
        slideMove();
      } else if (slideList[i].classList.contains('slider__item--active') && (i == maxSlide)) {
        counter = i;
        slideNumber = maxSlide * (-1);
        widthSlider = parseFloat(getComputedStyle(slider).width) * -1;
        slideMove();
      }
    }
  }

  var timer = setInterval(moveSlideTimer, 5000);
})();
