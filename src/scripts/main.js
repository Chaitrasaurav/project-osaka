$(window).ready(function(){
	var countryCode = 'en';

	//window.data.main.map(function(value){
	//	$('[data-sheet=' + value.Item + ']').text(value[countryCode]);			
	//});


});



$('.js-accomodation').slick({
		lazyLoad: 'ondemand',
		slidesToShow: 3,
		speed: 2000,
		slidesToScroll: 4,
		dots: true,
		responsive: [	   
		{
		  breakpoint: 900,
		  settings: {
		    slidesToShow: 2,
		    slidesToScroll: 2
		  }
		},
		{
		  breakpoint: 600,
		  settings: {
		    slidesToShow: 1,
		    slidesToScroll: 1,
		  }
		}
		]
	});

	$('.slick-arrow').appendTo('.slick-dots');
	$('.slick-arrow').addClass('icon arrow');

	$('.header_cta-dropdown').on('click', function(){
		$('.header_language').toggleClass('active');
	});

	var $grid = $('.grid').masonry({
		// options...
		itemSelector: '.grid-item',
		isFitWidth: true,
		columnWidth: 1
	});

	$('.js-tabs-select').on('change', function(e) {

		
		var tabId = $(this).val();

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$('ul.js-tabs li[data-tab="'+ tabId +'"]').addClass('current');
		$("#"+tabId).addClass('current');
		$('.js-accomodation').slick('refresh');

	});

	$('ul.js-tabs li').click(function(){

		var tabId = $(this).attr('data-tab');

		$('ul.js-tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$('.js-tabs-select').val(tabId).trigger('change');
		$(this).addClass('current');
		$("#"+tabId).addClass('current');
		$('.js-accomodation').slick('refresh');

	});

