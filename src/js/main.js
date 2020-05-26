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


});

