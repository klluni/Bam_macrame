$(document).ready(function() {
    $('.carousel__inner').slick({
        speed: 1500,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev">Назад</button>',
        nextArrow: '<button type="button" class="slick-next">Вперед</button>',
        responsive: [
            {
            breakpoint: 992,
            settings: {
                dots: true,
                arrows: false
            }
        }
    ]
    });
});