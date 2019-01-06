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
      initialization(el);
    });
  }

  function initialization(carousel) {
    var caruseSlides = carousel.querySelectorAll('.carousel__item');

    var carouselOptions = {
      wrapper: carousel.querySelector('.carousel__list'),
      slides: [],
      transformation: 0,
      leftActiveItem: 1,
      locked: true,
      direction: 0
    };


    caruseSlides.forEach(function (el, i) {
      carouselOptions.slides.push({
        item: el,
        index: i,
        transformation: 0
      });
    });

    carouselOptions.sumSlides = parseFloat(getComputedStyle(carouselOptions.wrapper).width) / parseFloat(getComputedStyle(carouselOptions.slides[0].item).width);

    var moveSlideTimer = setInterval(function () {
      carouselOptions.direction = -1;
      tranformationSlide(carouselOptions);
    }, 1000);

    carousel.onmouseover = function () {
      clearInterval(moveSlideTimer);
    }
    carousel.onmouseout = function () {
      clearInterval(moveSlideTimer);
      moveSlideTimer = setInterval(function () {
        carouselOptions.direction = -1;
        tranformationSlide(carouselOptions);
      }, 1000);
    }

    var carouselControl = carousel.querySelectorAll('.carousel__control');

    carouselControl.forEach(function (el) {
      if (carouselControl) {
        el.addEventListener('click', function (evt) {
          evt.preventDefault();
          carouselOptions.direction = evt.target.classList.contains('carousel__btn-right') ? -1 : 1;
          tranformationSlide(carouselOptions);
        });
      }
    });
  }


  function tranformationSlide(carouselOptions) {
    var widthWrapper = parseFloat(getComputedStyle(carouselOptions.wrapper).width);
    var widthSlide = parseFloat(getComputedStyle(carouselOptions.slides[0].item).width);
    var stepTranformation = widthSlide / widthWrapper;
    var sumSlides = widthWrapper / widthSlide;
    var minItem = position.getItemMin(carouselOptions.slides);
    var maxItem = position.getItemMax(carouselOptions.slides);
    var countSlide;

    if (carouselOptions.locked) {
      carouselOptions.locked = false;
      carouselOptions.leftActiveItem++;
      if ((carouselOptions.leftActiveItem + sumSlides - 1) > maxItem.index) {
        console.log(carouselOptions.leftActiveItem);
        if (carouselOptions.sumSlides > 0) {
          carouselOptions.sumSlides--;
          minItem.index = maxItem.index + 1;
          minItem.transformation = carouselOptions.slides.length * 100;
          minItem.item.style.transform = 'translateX(' + minItem.transformation + '%)';
          carouselOptions.transformation += stepTranformation * 100 * carouselOptions.direction;
          carouselOptions.wrapper.style.transform = 'translateX(' + carouselOptions.transformation + '%)';
          setTimeout(function () {
            if (carouselOptions.sumSlides === 0) {
              carouselOptions.leftActiveItem = 0;
              carouselOptions.wrapper.style.transition = 'none';
              carouselOptions.wrapper.style.transform = 'translateX(' + 0 + '%)';
              var counter = 0;
              for (var i = carouselOptions.slides.length; i < (sumSlides + carouselOptions.slides.length); i++) {
                carouselOptions.slides[counter].item.style.transform = 'translateX(' + 0 + '%)';
                counter++;
              }
              carouselOptions.transformation = 0;
              setTimeout(function () {
                carouselOptions.wrapper.style.transition = 'transform .6s';
                position.defaultPosition(carouselOptions.slides);
                carouselOptions.sumSlides = sumSlides;
              }, 100);
            }
          }, 600);
        }
        setTimeout(function () {
          carouselOptions.locked = true;
        }, 700);
        return;
      }
      carouselOptions.transformation += stepTranformation * 100 * carouselOptions.direction;
      carouselOptions.wrapper.style.transform = 'translateX(' + carouselOptions.transformation + '%)';
      setTimeout(function () {
        carouselOptions.locked = true;
      }, 700);
    }
  }


  var position = {
    getItemMin: function (slides) {
      var indexItem = 0;
      slides.forEach(function (el, i) {
        if (slides[i].index < slides[indexItem].index) {
          indexItem = i;
        }
      });
      return slides[indexItem];;
    },

    getItemMax: function (slides) {
      var indexItem = 0;
      slides.forEach(function (el, i) {
        if (slides[i].index > slides[indexItem].index) {
          indexItem = i;
        }
      });
      return slides[indexItem];
    },

    defaultPosition: function (slides) {
      slides.forEach(function (el, i) {
        slides[i].index = i;
      });
    }
  }
})();
