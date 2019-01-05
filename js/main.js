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
  var carousels = document.querySelectorAll('.carousel');


  if (carousels) {
    carousels.forEach(function (el) {
      doSomething(el);
    });
  }


  function doSomething(carousel) {
    var carouselElements = {
      caruselWrapper: carousel.querySelector('.carousel__list'),
      caruseSlides: carousel.querySelectorAll('.carousel__item'),
    };
    
    carouselElements.widthWrapper = parseFloat(getComputedStyle(carouselElements.caruselWrapper).width);
    carouselElements.widthSlide = parseFloat(getComputedStyle(carouselElements.caruseSlides[0]).width);
    carouselElements.stepTranformation = carouselElements.widthSlide / carouselElements.widthWrapper;
  }

  function tranformation() {
    
  }
})();


//(function () {
//  var carousel = document.querySelectorAll('.carousel');
//
//  var slideMoveHandler = function (carouselSlide, maxSlide, widthCarousel, locked, evt) {
//    var counter;
//    var nextSlide;
//    var sizeTransform = widthCarousel;
//    var target = evt.target;
//
//    if (target.classList.contains('carousel__btn-left')) {
//      for (var i = 0; i < carouselSlide.length; i++) {
//        if (carouselSlide[i].classList.contains('carousel__item--active') && (i != 0) && locked) {
//          counter = i;
//          nextSlide = -1;
//          sizeTransform *= 1;
//          slideMove(carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel);
//          return;
//        } else if (carouselSlide[i].classList.contains('carousel__item--active') && (i == 0) && locked) {
//          counter = i;
//          nextSlide = maxSlide;
//          sizeTransform *= 1;
//          slideMove(carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel);
//          return;
//        }
//      }
//    }
//
//    if (target.classList.contains('carousel__btn-right')) {
//      for (var i = 0; i < carouselSlide.length; i++) {
//        if (carouselSlide[i].classList.contains('carousel__item--active') && (i != maxSlide) && locked) {
//          counter = i;
//          nextSlide = 1;
//          sizeTransform *= -1;
//          slideMove(carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel);
//          return;
//        } else if (carouselSlide[i].classList.contains('carousel__item--active') && (i == maxSlide) && locked) {
//          counter = i;
//          nextSlide = maxSlide * -1;
//          sizeTransform *= -1;
//          slideMove(carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel);
//          return;
//        }
//      }
//    }
//  }
//
//  var moveSlideTimer = function (carouselSlide, maxSlide, widthCarousel, locked) {
//    var counter;
//    var nextSlide;
//    var sizeTransform = widthCarousel;
//
//    for (var i = 0; i < carouselSlide.length; i++) {
//      if (carouselSlide[i].classList.contains('carousel__item--active') && (i != maxSlide) && locked) {
//        counter = i;
//        nextSlide = 1;
//        sizeTransform *= -1;
//        slideMove(carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel);
//        return;
//      } else if (carouselSlide[i].classList.contains('carousel__item--active') && (i == maxSlide) && locked) {
//        counter = i;
//        nextSlide = maxSlide * (-1);
//        sizeTransform *= -1;
//        slideMove(carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel);
//        return;
//      }
//    }
//  }
//
//  var slideMove = function (carouselSlide, maxSlide, sizeTransform, locked, counter, nextSlide, widthCarousel) {
//    locked = false;
//    carouselSlide[counter + nextSlide].style.transform = 'translateX(' + (sizeTransform * -1) + 'px)';
//    setTimeout(function () {
//      carouselSlide[counter + nextSlide].classList.add('carousel__item--active');
//      setTimeout(function () {
//        carouselSlide[counter].style.transform = 'translateX(' + sizeTransform + 'px)';
//        carouselSlide[counter + nextSlide].style.transform = 'translateX(0)';
//        setTimeout(function () {
//          carouselSlide[counter].classList.remove('carousel__item--active');
//          carouselSlide[counter + nextSlide].classList.add('carousel__item--active');
//          carouselSlide[counter].style.transform = 'translateX(' + 0 + 'px)';
//          locked = true;
//        }, 1000);
//      }, 50);
//    }, 50);
//  }
//
//  var findCarouselSlide = function () {
//    var carouselSlide;
//    var carouselControl;
//    var maxSlide = [];
//    var locked = [];
//
//    for (var i = 0; i < carousel.length; i++) {
//      carouselSlide = carousel[i].querySelectorAll('.carousel__item');
//      carouselControl = carousel[i].querySelector('.carousel__control');
//      maxSlide[i] = carouselSlide.length - 1;
//      locked[i] = true;
//      doSomething(carousel[i], carouselSlide, maxSlide[i], carouselControl, locked[i]);
//    }
//  }
//
//  var doSomething = function (carousel, carouselSlide, maxSlide, carouselControl, locked) {
//    var widthCarousel = parseFloat(getComputedStyle(carousel.querySelector('.carousel__list')).width);
//
//    if (locked) {
//      if (carouselControl) {
//        carouselControl.addEventListener('click', function (evt) {
//          evt.preventDefault();
//          slideMoveHandler(carouselSlide, maxSlide, widthCarousel, locked, evt);
//        });
//      }
//
//      var timer = setInterval(function () {
//        moveSlideTimer(carouselSlide, maxSlide, widthCarousel, locked);
//      }, 5000);
//    }
//
//    carousel.onmouseover = function () {
//      clearInterval(timer);
//    }
//    carousel.onmouseout = function () {
//      clearInterval(timer);
//      timer = setInterval(function () {
//        moveSlideTimer(carouselSlide, maxSlide, widthCarousel, locked);
//      }, 5000);
//    }
//  }
//
//  window.onload = function () {
//    findCarouselSlide();
//  }
//
//})();
