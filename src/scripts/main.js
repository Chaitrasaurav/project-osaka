$('.accommodation_slider').slick({
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

$('.header_cta-dropdown').on('click', function(){
	$('.header_language').toggleClass('active');
});
