

$('.accommodation_slider').slick({
	lazyLoad: 'ondemand',
	slidesToShow: 3,
	speed: 2000,
	slidesToScroll: 3,
	dots: true,
	infinite: false,
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
