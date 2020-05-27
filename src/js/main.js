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

    headertMenu();

    formScript();

    function headertMenu () {
        let headerNav = $('.header-nav'),
            headerNavIsOpen = headerNav.hasClass('open'),
            openClass = 'header-nav-open',
            opening = false,
            transitionTime = 500,
            timeout;



        $body.on('click touch', '.js-header-nav-trigger', function (e) {
            e.preventDefault();
            navToggle();
        });


        $body.on('click touch', function (event) {
            let obj = $(event.target);

            if ( !opening && headerNav.hasClass('open') && !obj.closest('.header-nav').length && !obj.closest('.fancybox-container').length ) {
                navClose();
            };
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
                $body.toggleClass(openClass, true);
            }
        
            if ( timeout ) {
                clearTimeout(timeout)
            }

            timeout = setTimeout(function() {
                headerNavIsOpen = headerNav.hasClass('open');

                if (!headerNavIsOpen) {
                    $body.toggleClass(openClass, false);
                }
                opening = false;
            }, transitionTime)
            
        };

        $('.header-nav__content').on('scroll',function(e) {
            if ( $('.header-nav__content').scrollTop() > 10 ) {
                $body.addClass('header-nav-scroll');
            } else {
                $body.removeClass('header-nav-scroll');
            }
        });
    };

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

       
    };

});

function formResset(form) {
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


function formSuccessSent(form) {
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