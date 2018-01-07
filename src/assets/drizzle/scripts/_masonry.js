var Masonry = require('masonry-layout');
 var imagesLoaded = require('imagesloaded');


$(document).ready(function(){


    if($('.grid').length){
        var msnry = new Masonry( '.grid', {
          itemSelector: '.grid-item',
          columnWidth: 100
        //  percentPosition: true
        });

    }




    if( $('.grid-images').length ){
        console.log('images loaded');

        imagesLoaded( '.grid-images', function() {


           var msnryImages = new Masonry( '.grid-images', {
              itemSelector: '.grid-item',
              percentPosition: true,
              columnWidth: '.grid-sizer'
            });

        });
    }




});
