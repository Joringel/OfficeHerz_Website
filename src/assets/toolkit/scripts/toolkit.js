'use strict';

const jQuery = require('jquery');
window.jQuery = jQuery;
window.$ = jQuery;

const Tether = require('tether');
window.Tether = Tether;

require('bootstrap');

//Plugins
require('./_slider.js');
require('./_form-select.js');
require('./_table-sorting.js');


//Modules
//require('./module.js');

//console.log('toolkit.js is being used at ${Date.now()}.');

$(document).ready(function() {

	$(function() {
		$('[data-toggle="tooltip"]').tooltip()
	});

	//Header JS

	function checkScroll() {
		var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

		if ($(window).scrollTop() > startY) {
			$('.header').addClass("header--scrolled");
		} else {
			$('.header').removeClass("header--scrolled");
		}
	}

	if ($('.header').length > 0) {
		$(window).on("scroll load resize", function() {
			checkScroll();
		});
	}

	$(".navbar-toggler").on("click", function() {
		$(".header").toggleClass("header--expanded");
		return false;
	});

	$(window).resize(function() {
		var viewportWidth = $(window).width();

		if (viewportWidth > 991) {
			$(".header").removeClass("header--expanded");
		}
	});

	//Navbar JS

	$('ul.nav li.dropdown').hover(function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
	}, function() {
		$(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
	});

    $('ul.nav li.dropdown').on('click', function() {
        var $el = $(this);
        var $a = $el.children('a.dropdown-toggle');

        if ($a.length && $a.attr('href')) {
            location.href = $a.attr('href');
        }
    });


	//console.log("Is ready");
});
