require('select2');

$(document).ready(function() {
  $(".form-select-default-js").select2({
      minimumResultsForSearch: -1
  });
    $('b[role="presentation"]').hide();
    $('.select2-selection__arrow').append('<svg class="icon {{icon-class}}" viewBox="0 0 32 32"><use xlink:href="/assets/toolkit/svg/sprite.symbol.svg#angle-down"></use></svg>');
});
