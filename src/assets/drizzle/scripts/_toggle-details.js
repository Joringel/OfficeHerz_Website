$('.showDetails-js').on("click", function(event){
    console.log('CLICK');
    event.preventDefault();
    $('.detail-js').toggleClass('show');
});
