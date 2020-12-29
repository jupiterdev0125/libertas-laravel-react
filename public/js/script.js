$('ul.navbar-nav li.dropdown').hover(
    function () {
        $('#dropdownmenu').addClass('show');
    },
    function () {
        $('#dropdownmenu').removeClass('show');
    }
);

$('li.dropdownserver').hover(
    function () {
        $('#dropdownmenuserver').addClass('show');
    },
    function () {
        $('#dropdownmenuserver').removeClass('show');
    }
);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

$(window).on('load', function () {
    initSmoothScrolling('.blocks', 'smoothscroll');
});

function initSmoothScrolling(container, animation) {
    /*
     * @param {String} container Class or ID of the animation container
     * @param {String} animation Name of the animation, e.g. smoothscroll
     */
    var sliderWidth = 0;
    var animationWidth = 0;

    $('>div>div', container).each(function () {
        animationWidth += $(this).outerWidth(true);
    });

    // detect number of visible slides
    var slidesVisible = $(container).width() / $('>div>div:first-of-type', container).outerWidth(true);
    slidesVisible = Math.ceil(slidesVisible);

    // count slides to determine animation speed
    var slidesNumber = $('>div>div', container).length;
    var speed = slidesNumber * 9;

    // append the tail
    $('>div>div', container).slice(0, slidesVisible).clone().appendTo($('>div', container));

    // Detect the slider width with appended tail
    $('>div>div', container).each(function () {
        sliderWidth += $(this).outerWidth(true);
    });

    //	// set slider dimensions
    $('>div', container).css({
        'width': sliderWidth,
    });

    // Insert styles to html
    $("<style type='text/css'>@keyframes " + animation + " { 0% { margin-left: 0px; } 100% { margin-left: -" + animationWidth + "px; } } .blocks >div>div:first-of-type { -webkit-animation: " + animation + " " + speed + "s linear infinite; -moz-animation: " + animation + " " + speed + "s linear infinite; -ms-animation: " + animation + " " + speed + "s linear infinite; -o-animation: " + animation + " " + speed + "s linear infinite; animation: " + animation + " " + speed + "s linear infinite; }</style>").appendTo("head");
}
