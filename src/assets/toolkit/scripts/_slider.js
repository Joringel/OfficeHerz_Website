require('swiper');

$(document).ready(function(){

  var mySwiper = new Swiper ('.slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: '.swiper-pagination',

    // Navigation arrows
    nextButton: '.slider_button-next',
    prevButton: '.slider_button-prev',

    // And if we need scrollbar
    //scrollbar: '.swiper-scrollbar',
      scrollbar: false
  })
});
