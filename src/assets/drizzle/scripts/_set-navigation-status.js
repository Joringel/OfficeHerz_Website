$(document).ready(function(){

    var pathname = window.location.pathname;
    var firstLevel = window.location.pathname.split('/')[1];
    var secondLevel = window.location.pathname.split('/')[2];
    var thirdLevel = window.location.pathname.split('/')[3];

    console.log(firstLevel.split('.')[0]);
    console.log(secondLevel.split('.')[0]);
    //console.log(thirdLevel.split('.')[0]);


    //$('.drizzle-Nav-item').data('slug').parent().addClass('active');
    //$('.drizzle-Nav-item').data('slug', secondLevel.split('.')[0]).parent().addClass('active');


    $('.drizzle-Nav').find("[data-slug='" + firstLevel.split('.')[0] + "']").addClass('active').parent().addClass('active');
    $('.drizzle-Nav').find("[data-slug='" + secondLevel.split('.')[0] + "']").addClass('active').parent().addClass('active');

    if(typeof thirdLevel !== 'undefined'){
        $('.drizzle-Nav').find("[data-slug='" + thirdLevel.split('.')[0] + "']").addClass('active').parent().addClass('active');
    }

});

const dom = {};
dom.nav = document.getElementById('nav');
dom.navItemCollapse = dom.nav.getElementsByClassName('drizzle-Nav-item--collapse-js');

Array.prototype.forEach.call(dom.navItemCollapse, function(el) {
    // Do stuff here
    el.addEventListener('click', event => {
        event.preventDefault();
        el.parentElement.classList.toggle('active');
      });
    console.log(el.tagName);
});

