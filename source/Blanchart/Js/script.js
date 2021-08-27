document.addEventListener('DOMContentLoaded',function(){
  /*Acordion*/
  $( function() {
    $( ".accordion" ).accordion({header: "h3",heightStyle: "content",

    });
  });

  /*Burger*/
  let timer;
  let proverka;
  document.querySelector('.burger').addEventListener('click',function(burger){
    burger.currentTarget.classList.toggle('burger-active')

    if(proverka){
      document.querySelector('.menu').style.display='none';
    }
    if(document.querySelector('.menu').style.display=="none"){
        document.querySelector('.menu').style.display='block';
        document.querySelector('.menu').classList.add('is-active');
        proverka=false;
    }
    else{
        document.querySelector('.menu').classList.remove('is-active');
        document.querySelector('.menu').style.display='none';
        proverka=true;
    }
  })

  /*Catalog AcordItem*/
  document.querySelectorAll(".france .section-catalog__acordion-list-item").forEach(function(el){
    el.addEventListener('click',function(event){
      const path = event.currentTarget.dataset.target;
      document.querySelectorAll(".france .section-catalog__content").forEach(function(ell){
        ell.classList.remove("block");
      })
      document.querySelectorAll(".france .section-catalog__acordion-list-item").forEach(function(elll){
        elll.classList.remove("current");
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('block');
      event.target.classList.add('current');
    })
  })

  document.querySelectorAll(".germany .section-catalog__acordion-list-item").forEach(function(el){
    el.addEventListener('click',function(event){
      const path = event.currentTarget.dataset.target;
      document.querySelectorAll(".germany .section-catalog__content").forEach(function(ell){
        ell.classList.remove("block");
      })
      document.querySelectorAll(".germany .section-catalog__acordion-list-item").forEach(function(elll){
        elll.classList.remove("current");
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('block');
      event.target.classList.add('current');
    })
  })

  document.querySelectorAll(".itali .section-catalog__acordion-list-item").forEach(function(el){
    el.addEventListener('click',function(event){
      const path = event.currentTarget.dataset.target;
      document.querySelectorAll(".itali .section-catalog__content").forEach(function(ell){
        ell.classList.remove("block");
      })
      document.querySelectorAll(".itali .section-catalog__acordion-list-item").forEach(function(elll){
        elll.classList.remove("current");
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('block');
      event.target.classList.add('current');
    })
  })

  document.querySelectorAll(".rus .section-catalog__acordion-list-item").forEach(function(el){
    el.addEventListener('click',function(event){
      const path = event.currentTarget.dataset.target;
      document.querySelectorAll(".rus .section-catalog__content").forEach(function(ell){
        ell.classList.remove("block");
      })
      document.querySelectorAll(".rus .section-catalog__acordion-list-item").forEach(function(elll){
        elll.classList.remove("current");
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('block');
      event.target.classList.add('current');
    })
  })

  document.querySelectorAll(".belg .section-catalog__acordion-list-item").forEach(function(el){
    el.addEventListener('click',function(event){
      const path = event.currentTarget.dataset.target;
      document.querySelectorAll(".belg .section-catalog__content").forEach(function(ell){
        console.log(ell);
        ell.classList.remove("block");
      })
      document.querySelectorAll(".belg .section-catalog__acordion-list-item").forEach(function(elll){
        elll.classList.remove("current");
      })
      document.querySelector(`[data-path="${path}"]`).classList.add('block');
      event.target.classList.add('current');
    })
  })

  /*Catalog Swiper*/
  const swiper = new Swiper('.section-catalog__swiper-container', {
    // Optional parameters
    effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
    loop: false,
    allowTouchMove:false,
    spaceBetween: '3.125%',
    initialSlide:2,
  });
  $('.section-catalog__swiper-pagination__list').on('click',  '.swiper-pagination-bullet', function() {
    document.querySelectorAll(".swiper-pagination-bullet").forEach(function(bullet){
      bullet.classList.remove("swiper-pagination-bullet-active");
    });
    console.log(this);
    this.classList.add("swiper-pagination-bullet-active");
    const index = $(this).data('index')
    swiper.slideTo(index)
 });


  /*Contacts Validate*/
  var selector = document.querySelector("input[type='tel']");
      var im = new Inputmask("+7 (999) 999 99 99");
      im.mask(selector);

      new JustValidate('.form', {
        messages: {
          required: 'Это поле нужно обязатьельно заполнить',
          name: 'Недопустимый формат',
          phone: 'Недопустимый формат',
         },
        rules: {
          name: {
            required: true,
            minLength: 2,
            maxLength: 10,
            strength: {
              custom: '[а-я]'
            },
          },
          phone: {
            required: true,
            function: (name,value) =>{
              const phone = selector.inputmask.unmaskedvalue()
              return Number(phone) && phone.length === 10
            }
          },
          email: {
            required: true,
            email: true
          },
        },
        submitHandler: function (form) {
          let formData = new FormData(form);

          let xhr = new XMLHttpRequest();

          xhr.onreadystatechange = function(){
            if (xhr.readyState === 4){
              if(xhr.status === 200){
                console.log('Отправлено');
              }
            }
          }

          xhr.open('POST','mail.php',true);
          xhr.send(formData);

          form.reset();
        }
      });

    /*Dropdown*/
    const element =document.querySelectorAll(".section-description__select");
        console.log(element);
        element.forEach(el => {
          const choices = new Choices(el,{
          searchEnabled: false,
          itemSelectText: "",
          resetScrollPosition:false,
          shouldSortItems:false,
          shouldSort:false,
        });
      });
  $(document).ready(function() {
    $('.section-description .choices__list--dropdown .choices__list').slimScroll({
      color: 'white',
			size: '2px',
      opacity: 1,
			alwaysVisible: true,
      railVisible: true,
      railColor: 'black',
      railOpacity: 1,
      height : '220px',
    });
  });

  /*Events More*/
  document.querySelector(".section-events__button").addEventListener('click',function(event){
    event.preventDefault();
    this.textContent = this.textContent === 'Все события' ? 'Скрыть' : 'Все события';
    document.querySelectorAll(".section-events__item").forEach ( item => {
      item.classList.toggle("event-active");
    });
  });

  /*Events Swiper*/
  const min30 =window.matchMedia('(max-width: 668px)');
  if (min30.matches){
    const swiper1 = new Swiper('.section-events__swiper', {
      // Optional parameters
      loop: false,
      pagination: {
        el: '.section-events__swiper-pagination',
        clickable:true,
      },
      spaceBetween: '3.125%',
    });
  }

  /*Gallery Choices*/
  const choices1 =new Choices(document.querySelector(".section-gallery__select"),{
    searchEnabled: false,
    itemSelectText: "",
    resetScrollPosition:false,
    shouldSortItems:false,
    shouldSort:false,
  });
  const mediaQuery = window.matchMedia('(max-width: 576px)');
function handleTabletChange(e) {
  // Проверить, что media query будет true
  if (e.matches) {
    choices1.clearChoices();
    choices1.setChoices([{value: '', label: 'Автор', placeholder: true}]).setChoiceByValue('');
    choices1.setChoices(
      [
        { value: 'Направление'},
        { value: 'Техника'},
      ],
    );
  }
  else{
    choices1.clearChoices();
    choices1.setChoices([{value: '', label: 'Живопись', placeholder: true}]).setChoiceByValue('');
    choices1.setChoices(
      [
        { value: 'Рисунок'},
        { value: 'Скульптура'},
      ],
    );
  }
}

// Слушать события
mediaQuery.addListener(handleTabletChange);

// Начальная проверка
handleTabletChange(mediaQuery);

  /*Gallery Model*/
  const gmin1 =window.matchMedia('(min-width: 1366px)');
  const gmin2 =window.matchMedia('(min-width: 992px)');
  const gmin3 =window.matchMedia('(min-width: 500px)');
  document.querySelectorAll(".section-gallery__item").forEach(function(el){
      el.addEventListener('click',function(event){
        document.querySelector(".hide").style.display='block';
        if(gmin1.matches){
          console.log(2);
          document.querySelector(".hide__img").setAttribute("src",el.querySelector("picture source").srcset);
        }
        else if(gmin2.matches){
          console.log(3);
          document.querySelector(".hide__img").setAttribute("src",el.querySelectorAll("picture source")[1].srcset);

        }
        else if(gmin3.matches){
          document.querySelector(".hide__img").setAttribute("src",el.querySelectorAll("picture source")[2].srcset);
        }
        else{
          document.querySelector(".hide__img").setAttribute("src",el.querySelector("img").getAttribute("src"));
        }
      });
  })
  document.querySelector(".hide__exit").addEventListener('click',function(){
    document.querySelector(".hide").style.display='none';
  })
  document.querySelector(".hide").addEventListener('click',function(){
    document.querySelector(".hide").style.display='none';
  })


  /*Gallery Swiper 1*/
  const swipe2 = new Swiper('.section-gallery__slider .section-gallery__slider-container', {
    // Optional parameters
    loop: false,
    // If we need pagination
    pagination: {
      el: '.section-gallery__slider .swiper-pagination',
      type:'fraction',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.section-gallery__slider .swiper-button-next',
      prevEl: '.section-gallery__slider .swiper-button-prev',
      type:'custom',
    },
    speed:2000,
    a11y: {
      prevSlideMessage: 'Previous ',
      nextSlideMessage: 'Next slide',
    },
    breakpoints: {
      0: {
        spaceBetween: 20,
        slidesPerView: 1,
        slidesPerGroup: 1,
        grid: {
          fill:'row',
          rows: 1,
        },
	    },
      576: {
        spaceBetween: 34,
        slidesPerView: 2,
        slidesPerGroup: 2,
        grid: {
          fill:'row',
          rows: 2,
        },
	    },
      1200: {
        spaceBetween: 30,
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          fill:'row',
          rows: 2,
        },
	    },
      1600: {
        spaceBetween: 49,
        slidesPerView: 3,
        slidesPerGroup: 3,
        grid: {
          fill:'row',
          rows: 2,
        },
	    }
	  },
  });

  /*Link*/
  $(".section-header__list").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});
$(".menu__list").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});
$(".section-catalog__acordion__default-content").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});
$(".section-catalog__content").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
        top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 1500);
});
const min2 =window.matchMedia('(max-width: 576px)');
  if(min2.matches){
    $(".section-catalog__acordion-list").on("click","li", function (event) {
      event.preventDefault();
      var id  = $(this).attr('data-link'),
          top = $(id).offset().top;
      $('body,html').animate({scrollTop: top}, 1500);
  });
  };

  /*Map*/
  // Функция ymaps.ready() будет вызвана, когда
    // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
    ymaps.ready(init);
    function init(){
        // Создание карты.
        var myMap = new ymaps.Map("yandexMap", {
            // Координаты центра карты.
            // Порядок по умолчанию: «широта, долгота».
            // Чтобы не определять координаты центра карты вручную,
            // воспользуйтесь инструментом Определение координат.
            center: [55.758468, 37.601088],
            // Уровень масштабирования. Допустимые значения:
            // от 0 (весь мир) до 19.
            zoom: 14
        },{
        suppressMapOpenBlock: true
      });

        var myPlacemark = new ymaps.Placemark([55.758468, 37.601088],{},{
          iconLayout:'default#image',
          iconImageHref:'img/mdi_location_on.svg',
          iconImageSize:[20,20],
          iconImageOffset:[-3,-42]
        });

        // Размещение геообъекта на карте.
        myMap.geoObjects.add(myPlacemark);
        myMap.controls.remove('geolocationControl');
        myMap.controls.remove('searchControl');
        myMap.controls.remove('trafficControl');
        myMap.controls.remove('typeSelector');
        myMap.controls.remove('fullscreenControl');
        myMap.controls.remove('rulerControl');
        myMap.controls.remove('zoomControl');
        myMap.controls.remove('routeEditor');
        myMap.controls.remove('routeButtonControl');
        myMap.controls.remove('routePanelControl');

    }

  /*Projecs Popper*/
  const button1 = document.querySelector('.tooltip-icon-one');
      const tooltip1 = document.querySelector('.tooltip-text-one');

      const popperInstance1 = Popper.createPopper(button1, tooltip1, {
        placement: 'top',
        modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 20],
          },
        },
        ],
      });

      const button2 = document.querySelector('.tooltip-icon-two');
      const tooltip2 = document.querySelector('.tooltip-text-two');

      const popperInstance2 = Popper.createPopper(button2, tooltip2, {
        placement: 'top',
        modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 20],
          },
        },
        ],
      });

      const button3 = document.querySelector('.tooltip-icon-three');
      const tooltip3 = document.querySelector('.tooltip-text-three');

      const popperInstance3 = Popper.createPopper(button3, tooltip3, {
        placement: 'top',
        arrow: {
          classNames: [ '#arrow3' ]
        },
        modifiers: [
        {
          name: 'offset',
          enabled: true,
          options: {
            offset: [0, 20],
          },
        },
        {
          name: 'arrow',
          options: {
            element: document.querySelector(".arroww"),
          },
        },
        ],
      });

      function show1() {
        // Make the tooltip visible
        tooltip1.setAttribute('data-show', '');

        // Enable the event listeners
        popperInstance1.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: true }],
        });

        // Update its position
        popperInstance1.update();
      }
      function show2() {
        // Make the tooltip visible
        tooltip2.setAttribute('data-show', '');

        // Enable the event listeners
        popperInstance2.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: true }],
        });

        // Update its position
        popperInstance2.update();
      }
      function show3() {
        // Make the tooltip visible
        tooltip3.setAttribute('data-show', '');

        // Enable the event listeners
        popperInstance3.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: true }],
        });

        // Update its position
        popperInstance3.update();
      }

      function hide1() {
        // Hide the tooltip
        tooltip1.removeAttribute('data-show');

        // Disable the event listeners
        popperInstance1.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: false }],
        });
      }
      function hide2() {
        // Hide the tooltip
        tooltip2.removeAttribute('data-show');

        // Disable the event listeners
        popperInstance2.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: false }],
        });
      }
      function hide3() {
        // Hide the tooltip
        tooltip3.removeAttribute('data-show');

        // Disable the event listeners
        popperInstance3.setOptions({
          modifiers: [{ name: 'eventListeners', enabled: false }],
        });
      }

      const showEvents = ['mouseenter', 'focus'];
      const hideEvents = ['mouseleave', 'blur'];

      showEvents.forEach(event => {
        button1.addEventListener(event, show1);
        button2.addEventListener(event, show2);
        button3.addEventListener(event, show3);
      });

      hideEvents.forEach(event => {
        button1.addEventListener(event, hide1);
        button2.addEventListener(event, hide2);
        button3.addEventListener(event, hide3);
      });

  /*Projects Swiper*/
  const swipe5 = new Swiper('.section-projects__swiper .section-projects__swiper-container', {
    // Optional parameters
    loop: false,

    // Navigation arrows
    navigation: {
      nextEl: '.section-projects__swiper .swiper-button-next',
      prevEl: '.section-projects__swiper .swiper-button-prev',
      type:'custom',
    },
    speed:2000,
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
	    },
      501: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
	    },
	    769: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
	    },
      1025: {
        slidesPerView: 'auto',
        slidesPerGroup: 2,
	    },
      1200: {
        slidesPerView: 'auto',
        slidesPerGroup: 3,
	    }
	  },
    });

  /*Public Choices*/
  const choices =new Choices(document.querySelector(".section-public__select"),{
    removeItemButton: true,
    shouldSortItems:false,
    shouldSort:false,
  });
  document.querySelector(".section-public .choices__input.choices__input--cloned").addEventListener('click',function(){
    document.querySelector(".section-public .choices__list.choices__list--dropdown").classList.toggle("is-active");
    document.querySelector(".section-public .choices").classList.toggle("is-open");
    document.querySelector(".section-public .choices").classList.toggle("is-focus");
  });
  /*Public Swiper*/
  if (window.matchMedia("(min-width: 576px)").matches) {
    /* the viewport is at least 400 pixels wide */
    const swipe9 = new Swiper('.section-public__slider .section-public__slider-container', {
      // Optional parameters
      loop: false,
      // If we need pagination
      pagination: {
        el: '.section-public__slider .swiper-pagination',
        type:'fraction',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.section-public__slider .swiper-button-next',
        prevEl: '.section-public__slider .swiper-button-prev',
        type:'custom',
      },
      speed:2000,
      breakpoints: {
        0: {
          slidesPerView: 'auto',
          slidesPerGroup: 2,
        },
        1200: {
          slidesPerView: 'auto',
          slidesPerGroup: 3,
        }
      },
      });
  } else {
    /* the viewport is less than 400 pixels wide */
  }

  /*Disable Input*/
  document.querySelector(".choices__input.choices__input--cloned").setAttribute("readonly", "readonly");

  /*Search*/
  let timer1;
  let proverka1;
  document.querySelector(".search .enabled-320px").addEventListener('click',function(search){
        document.querySelector('.search-menu').style.display='block';
        document.querySelector('.search-menu').classList.add('search-menu__open');
  })
  document.querySelector(".search-menu__exit").addEventListener('click',function(search){
    document.querySelector('.search-menu').classList.remove('search-menu__open');
        document.querySelector('.search-menu').style.display='none';
        proverka1=true;
  })

  /*Search 2*/
  document.querySelector(".search .disabled-320px").addEventListener('click',function(){
    document.querySelector(".search").classList.toggle("search-open");
    setTimeout(function(){
      document.querySelector(".burger").classList.toggle("search-open-768");
      document.querySelector(".section-header__container").classList.toggle("background-none");
    },300);
  });
  document.querySelector(".enabled-768.exit").addEventListener('click',function(){
    document.querySelector(".search").classList.toggle("search-open");
    setTimeout(function(){
      document.querySelector(".burger").classList.toggle("search-open-768");
      document.querySelector(".section-header__container").classList.toggle("background-none");
    },300);
  });

  /*Swiper*/
  const swiper9 = new Swiper('.section-description', {
    // Optional parameters
    loop: true,
    allowTouchMove:false,

    autoplay: {
      delay: 4000,
    },
  });
});

