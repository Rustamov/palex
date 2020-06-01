svg4everybody(); //for svg spite in ie
// objectFitImages();

let $window,
    $body,
    wWidth = 0,
    wHeight = 0,
    W_SM = 576,
    W_MD = 768,
    W_LG = 992,
    W_XL = 1200,

    LOADER_HTML = '<div class="overlay-loader"><div class="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'

;


$(document).ready(function () {
    $body = $('body');
    
    $body = $('body');
    $window = $(window);

    wWidth =  $(window).width();
    wHeight =  $(window).height();

    $window.on('resize', function() {
        wWidth =  $window.width();
        wHeight =  $window.height();
    });

    headerMenu();

    formScript();

    freeConsForm();

    othersScript();



    
    function headerMenu () {
        let headerNav = $('.header-menu'),
            headerNavIsOpen = headerNav.hasClass('open'),
            openClass = 'header-menu-open',
            opening = false,
            transitionTime = 300,
            timeout;

        $body.on('click touch', '.js-header-menu-trigger', function (e) {
            e.preventDefault();
            navToggle();
        });

        $body.on('keydown', function(e) {
            if ( !opening && headerNavIsOpen && (e.keyCode  === 27)) { // escape key maps to keycode '27'
                navToggle()
            };
        });

        function navToggle() {
            if ( opening ) {
                return 
            }
        
            opening = true;

            headerNavIsOpen = headerNav.hasClass('open');

            headerNav.toggleClass('open', !headerNavIsOpen);


            if (!headerNavIsOpen) {
                globalOpt.freeze();
                $body.toggleClass(openClass, true);
            }
        
            if ( timeout ) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(function() {
                headerNavIsOpen = headerNav.hasClass('open');

                if (!headerNavIsOpen) {
                    $body.toggleClass(openClass, false);
                    globalOpt.unfreeze();
                }
                opening = false;
            }, transitionTime)
        };       
    }

    function formScript () {

        $('[type=tel]').mask('+7 (000) 000-00-00');

        Parsley
            .addValidator('ruPhone', {
                // string | number | integer | date | regexp | boolean
                requirementType: 'string',

                // validateString | validateDate | validateMultiple
                validateString: function (value, requirement) {
                    let regexp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
                    
                    return  regexp.test(value) 
                },

                messages: {
                    ru: 'Неверный формат номера',
                    en: 'Invalid number format'
                }
            })
            .addValidator('personName', {
                // string | number | integer | date | regexp | boolean
                requirementType: 'string',

                // validateString | validateDate | validateMultiple
                validateString: function (value, requirement) {
                    let regexp = /^[а-яА-ЯёЁa-zA-Z\ ]+$/;

                    return  regexp.test(value) 
                },

                messages: {
                  ru: 'Используйте только буквы',
                  en: 'Use only letters'
                }
            })
            .addMessages('ru', {
                defaultMessage: "Некорректное значение.",
                type: {
                    email:        "Введите правильный е-mail",
                    url:          "Введите URL адрес",
                    number:       "Введите число",
                    integer:      "Введите целое число",
                    digits:       "Введите только цифры",
                    alphanum:     "Введите буквенно-цифровое значение"
                },
                notblank:       "Это поле должно быть заполнено",
                required:       "Заполните это поле",
                pattern:        "Это значение некорректно",
                min:            "Это значение должно быть не менее чем %s",
                max:            "Это значение должно быть не более чем %s",
                range:          "Это значение должно быть от %s до %s",
                minlength:      "Это значение должно содержать не менее %s символов",
                maxlength:      "Это значение должно содержать не более %s символов",
                length:         "Это значение должно содержать от %s до %s символов",
                mincheck:       "Выберите не менее %s значений",
                maxcheck:       "Выберите не более %s значений",
                check:          "Выберите от %s до %s значений",
                equalto:        "Это значение должно совпадать"
            })
            .setLocale('ru');

        $('.js-validate').parsley({

        });


        $body.on('focusin', '.input-text input, .input-text textarea', function() {
            let input = $(this),
                wrap = input.closest('.input-text');

            wrap.addClass('input-text--dirty');
        });

        $body.on('focusout', '.input-text input, .input-text textarea', function() {
            let input = $(this),
                wrap = input.closest('.input-text');

            wrap.toggleClass('input-text--dirty', input.val() !== '');
        });

        $('.input-text input, .input-text textarea').each(function() {
            let input = $(this),
                wrap = input.closest('.input-text');

            wrap.toggleClass('input-text--dirty', input.val() !== '')
        });

       
    }

    function freeConsForm () {
        let form = $('.js-consultation-form'),
            trigger = form.find('.js-consultation-trigger'),
            totalOutput = form.find('.js-consultation-price'),
            totalInput = form.find('.js-consultation-input-total')
           
            ;

        calc();

        form.on('change', '.js-consultation-input', function() {
            calc()
        });

        

        function calc() {
            let sum = 0;

            form.find('.js-consultation-input:checked').each(function() {
                let price = parseInt($(this).data('price'));

                if ( !Number.isNaN(price) ) {
                    sum += price;
                }
                
            });

            totalInput.val(sum);

            let formatNum = String(sum).replace(/(.)(?=(\d{3})+$)/g,'$1  ');

            totalOutput.html(formatNum);

        }

    }


    function othersScript() {
        $body.on('click touch', '[data-go-link]', function (e) {
            e.preventDefault();
            window.open($(this).data('go-link'));
        });

        $('.back-to-top').click(function(event) {
            $('body,html').animate({scrollTop:0},300);
          });
        
        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
        
            if ( scrollTop > 300 ) {
              $('.back-to-top').addClass('show');
            } else {
              $('.back-to-top').removeClass('show');
            };
        
        });


        // var scene = document.getElementById('scene');
        if ( W_XL < wWidth && $('.js-parallax').length > 0) {
            $('.js-parallax').each(function() {
                var scene = $(this).get(0);
                var parallaxInstance = new Parallax(scene, {
                    selector: '.js-layer'
                });    
            });
        }
        

        // if ( $('.sec-reviews__slides').length ) {
        //     $('.sec-reviews__slides').slick({
        //       slideToShow: 1,
        //       arrows: true,
        //       prevArrow: '<button class="btn-arrow btn-arrow--left">&nbsp;</button>',
        //       nextArrow: '<button class="btn-arrow btn-arrow--right">&nbsp;</button>',
        //       dots: false,
        //       infinite: false,
        //     });
        // };


        if ( $('.s-portfolio__slider-item').length > 1 ) {
            $('.js-s-portfolio-slider').slick({
                centerMode: true,
                variableWidth: true,
                adaptiveHeight: false,
                nextArrow: $('.js-s-portfolio-next'),
                prevArrow: $('.js-s-portfolio-prev')
            });
        }

        let workflowSlides = document.querySelectorAll('.s-workflow__slides-item');
        let workflowControls = document.querySelectorAll('.s-workflow__step');

        for (let i = 0; i < workflowControls.length; i++) {
            (function (i) {
                workflowControls[i].addEventListener('mouseover', function (evt) {
                    evt.preventDefault();

                    for (let j = 0; j < workflowSlides.length; j++) {
                        workflowControls[j].classList.remove('s-workflow__step--active');
                        workflowSlides[j].classList.remove('s-workflow__slides-item--active');
                    }

                    workflowControls[i].classList.add('s-workflow__step--active');
                    workflowSlides[i].classList.add('s-workflow__slides-item--active');
                });
            })(i);
        }

        let faqToggleButtons = document.querySelectorAll('.faq-accordion__expand-button');
        let faqElements = document.querySelectorAll('.faq-accordion__item');

        for (let i = 0; i < faqElements.length; i++) {
            faqToggleButtons[i].onclick = function() {
                faqElements[i].classList.toggle('open');
            };
        }

        
        $body.on('click touch', '.js-anchor', function (e) {
            let trigger = $(this),
                href = trigger.attr('href'),
                scrollOnMenuBtn = false,
                scrollOnHeaderHide = false,
                scrollSpeed = 800,
                delay = 0;

        
            href = '#' + href.split("#").pop();

            if ( !$(href).length  ) {
                console.log('No find element with this id')
                return
            }

            e.preventDefault();

            let obj = $(e.target);

            if ( obj.closest('.header-menu').length ) {
                delay = 300;
                globalOpt.headerMenuClose();
            };

            globalOpt.scrollToId(href, delay);    
        });

    }

 

    var $hash = '#' + location.hash.replace('#','');
    
    if ( $hash !== '#' && $($hash).length  ) {
        globalOpt.scrollToId($hash, 0);
    }



});

class globalConst {
    formResset(form) {
        if ( !form.length ) {
            return
        }
    
        $('.input-text input, .input-text textarea', form).each(function() {
            let input = $(this),
                wrap = input.closest('.input-text');
    
            input.val('').trigger('input');
    
    
            wrap.toggleClass('input-text--dirty', input.val() != '');
        });
    
        form.parsley().reset();
    
    };
    
    formSuccessSent(form) {
        if ( form.length ) {
            form.addClass('form-sent');
    
    
            formResset(form);
    
            if ( form.closest('.popup').length ) {
                form.closest('.popup').addClass('popup--form-sent');
            } else if ( form.closest('.feedback-form').length ) {
                form.closest('.feedback-form').addClass('feedback-form--form-sent');
            }
    
    
    
            setTimeout(function() {
                form.removeClass('form-sent');
                $('.popup').removeClass('popup--form-sent');
                $('.feedback-form').removeClass('feedback-form--form-sent');
    
                if ($('.fancybox-is-open').length) {
                    $.fancybox.close();
                };
    
            }, 8000);
    
        }
    };

    // Скрипт "замораживает" страничку, запрещая скролл
    freeze() {
        const h = $('html');

        if (h.css('position') !== 'fixed') {
            const top = h.scrollTop() ? h.scrollTop() : $body.scrollTop();

            if (window.innerWidth > h.width()) {
                h.css('overflow-y', 'scroll');
            }

            h.css({
                width: '100%',
                position: 'fixed',
                top: -top,
            });
        }
    }

    unfreeze() {
        const h = $('html');

        if (h.css('position') === 'fixed') {
            h.css('position', 'static');

            $('html, body').scrollTop(-parseInt(h.css('top'), 10));

            h.css({
                position: '',
                width: '',
                top: '',
                'overflow-y': '',
            });
        }
    }

    headerMenuClose() {
        $('.header-menu').removeClass('open');
        $body.removeClass('header-menu-open');
        this.unfreeze();
    }

    
    scrollToId(href, delay) {
        let scrollOnMenuBtn = false,
            scrollOnHeaderHide = false,
            scrollSpeed = 800;


        if ( href == '#interior' 
            || href == '#magazines'
        ) {
            scrollOnMenuBtn = true;
        }


        setTimeout(function() {
            scrollTo();
        }, delay)

        function scrollTo() {

            let targetOffset = $(href).offset().top;

            if ( wWidth >= W_MD && scrollOnMenuBtn ) {
                targetOffset -= $('.side-nav__trigger-icon-line--1').offset().top - $('.header').offset().top;
            } else if (wWidth < W_MD && !scrollOnHeaderHide) {
                targetOffset -= $('.header').outerHeight();
            }

            try {
                scrollSpeed = Math.abs($window.scrollTop() - targetOffset) / Math.abs($body[0].scrollHeight) * 4000
            } catch(event) {
                console.error(event);
            }

            scrollSpeed = ( scrollSpeed < 500 ) ? 500 : scrollSpeed;
     
            $('html, body').animate({ scrollTop: targetOffset }, scrollSpeed);

            location.replace(href);
            
        }
    };


}
   

const globalOpt = new globalConst;
