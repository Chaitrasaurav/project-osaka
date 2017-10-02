'use strict';
var countryCode = $('body').data('lang'),
	publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1HyfDyalAgZ9sYE-WCqgeo58_y47BRSiyqi5YArcSins/pubhtml';

function init() {
	Tabletop.init({ 
		key: publicSpreadsheetUrl,
     	callback: showInfo,
     	simpleSheet: true 
    });
    
    function gotoDate(month, year) {
	    $(".js-datepicker-container").each(function (i, el) {
	        var inst = $.datepicker._getInst(el);
	        inst.drawMonth = inst.selectedMonth = month;
	        inst.drawYear = inst.selectedYear = year;
	        $.datepicker._notifyChange(inst);
	        $.datepicker._adjustDate(el);
	    });
	}		

	//$.datepicker.regional[$('body').data('i18n')];

	$('input.js-datepicker').click(function(e){
		if(!$('.js-select-guest-container').hasClass('hidden')) {
	      	$('.js-select-guest-container').addClass('hidden');
	    }	
		$('.js-datepicker-modal').removeClass('hidden');
		$('.check-in').removeClass('js-is-invalid');
		$('.check-out').removeClass('js-is-invalid');
		//
		if($(e.target).hasClass('check-in')) {
			if($(e.target).val()) {
				var date = $(e.target).val();
				gotoDate(new Date(date).getMonth(), new Date(date).getFullYear());
				$('.check-out').removeClass('js-datepicker-highlight');
				$(e.target).addClass('js-datepicker-highlight');
			} else {
				$(e.target).addClass('js-datepicker-highlight');
				$(".js-datepicker-container").datepicker( "option", "gotoCurrent", true );		
			}
		} else if($(e.target).hasClass('check-out')) {
			if($(e.target).val()) {
				var date = $(e.target).val();
				gotoDate(new Date(date).getMonth(), new Date(date).getFullYear());
				$('.check-in').addClass('js-datepicker-highlight');
			}
			else {
				if(!$('.check-in').val().length) {
					$('.check-in').addClass('js-datepicker-highlight');
					$(".js-datepicker-container").datepicker( "option", "gotoCurrent", true );
				} else {
					$(e.target).addClass('js-datepicker-highlight');
					$('.check-in').removeClass('js-datepicker-highlight');
					var date = $('.check-in').val();
					gotoDate(new Date(date).getMonth(), new Date(date).getFullYear());
				}
			}
		}
	});

	var numberOfMonths = 2;
	if($(window).width() < 768) {
		numberOfMonths = 1;
	}

	$(".js-datepicker-container").datepicker({
		minDate: 0,
		numberOfMonths: numberOfMonths,
		beforeShowDay: function(date) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkIn").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkOut").val());
			var className = "dp-highlight",
				booleanFlag = true;
			if((date1 && date.getTime() == date1.getTime()) || (date2 && date.getTime() == date2.getTime())) {
				className = "dp-highlighted";
			}
			if(date1 && !date2 && date > date1) {
				
				className = 'dp-highlight-hover';
			}
			//console.log(date)
			return [booleanFlag, date1 && ((date.getTime() == date1.getTime()) || (!date2 && (date > date1)) || (date2 && date >= date1 && date <= date2)) ? className : ""];
		},
		onSelect: function(dateText, inst) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkIn").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkOut").val());
            var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);            
            if (!date1 || date2) {
				$("#checkIn").val(dateText).removeClass('js-datepicker-highlight');
				
				if($("#checkIn").hasClass('js-is-invalid')) {
                	$("#checkIn").removeClass('js-is-invalid');
                }
				$("#checkOut").val("").addClass('js-datepicker-highlight');
                $(this).datepicker();
            } else if( selectedDate < date1 ) {
                $("#checkIn").val( dateText );
                if($("#checkIn").hasClass('js-is-invalid')) {
                	$("#checkIn").removeClass('js-is-invalid');
                }
                if($("#checkIn").hasClass('js-datepicker-highlight')) {
            		$("#checkIn").removeClass('js-datepicker-highlight');
            		$("#checkOut").addClass('js-datepicker-highlight');
            	}
                $(this).datepicker();
            } else {
            	if($("#checkIn").hasClass('js-datepicker-highlight')) {
            		$("#checkIn").val(dateText).removeClass('js-datepicker-highlight');
            		$("#checkOut").addClass('js-datepicker-highlight');
            	} else {
            		$("#checkOut").val(dateText).removeClass('js-datepicker-highlight');
					if(!$("#checkOut").hasClass('js-is-invalid')) {
                    	$("#checkOut").removeClass('js-is-invalid');
                    }
                    if(!$('.js-datepicker-modal').hasClass('hidden')) {
				      	$('.js-datepicker-modal').addClass('hidden');
				    }
            	}
            	$(this).datepicker();
			}

			if($('body').hasClass('ja_JP')) {
            	if($("#checkIn").val().length) {
            		var date = new Date($("#checkIn").val());

            		// var dateArray = $("#checkIn").val().split(' ');
            		$("#checkIn").siblings('input[name="ciDateY"]').val(date.getFullYear());
	            	$("#checkIn").siblings('input[name="ciDateM"]').val(date.getMonth() + 1);
	            	$("#checkIn").siblings('input[name="ciDateD"]').val(date.getDate());
            	}
            	if($("#checkOut").val().length) {
            		// var dateArray = $("#checkOut").val().split(' ');
            		var date = new Date($("#checkOut").val());

            		$("#checkOut").siblings('input[name="coDateY"]').val(date.getFullYear());
	            	$("#checkOut").siblings('input[name="coDateM"]').val(date.getMonth() + 1);
	            	$("#checkOut").siblings('input[name="coDateD"]').val(date.getDate());
            	}
            }
		}
	});

	$('.js-close-datepicker').click(function() {
        $(".js-datepicker-modal").addClass('hidden');
    });

    var url = 'https://websdk.fastbooking-services.com/accommodations?locale=en_GB&property=jpnas28830&output=json&_authCode=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOiJeLiokIiwicHJvcGVydGllcyI6Il5qcChhfGJ8Y3xmfGh8anxrfG58b3xzfHR8dXx5KVthLXpdezJ9WzAtOV17NX0kIiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJNUyIsImlhdCI6MTQ4NTE5MDg1MiwianRpIjoiMzk1ZDQyNmEtMjUxYi00YmM0LThhN2UtZGU3ZjIyMDBhMGMxIn0.nfxBfwao6Z-k2X8rToJOTEouiVf1lhgPAwrTRFIyeW0';
    $.get( url, function( response ) {
	  console.log(response.data);
	  if(response.data.rooms.length) {

	  	var slickConfig = {
			lazyLoad: 'ondemand',
			infinite: false,
			speed: 500,
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
		},
		ele = '.js-accomodation',
		$ele = $('.js-accomodation'),
		rooms = response.data.rooms,
		roomsLength = rooms.length,
		i = 0,
		date = new Date(),
		currentDate,
		currentDateObj
		noOfSlide = 3;

		if($(window).width() < 900 && $(window).width() > 600) {
			noOfSlide = 2;
		}else if($(window).width() < 600) {
			noOfSlide = 1;
		}

		for (var j = 0; j < roomsLength; j++) {
			$ele.append('<li>\
				<img src="../dist/images/room-image.png">\
				<h3>' + rooms[j].title + '</h3>\
				<p class="spinner js-spinner"><span>Starting from:</span><span class="js-accomodation-price"></span><span>/night</span></p>\
				<a href="#">Book Now</a>\
			</li>')
		}

		slickConfig.slidesToShow = noOfSlide;
		slickConfig.slidesToScroll = noOfSlide;
		if(rooms.length <= noOfSlide) {
			slickConfig.dots = false;
			slickConfig.arrows = false;
		}
		$ele.slick(slickConfig);
		$ele.find('.slick-arrow').appendTo( $ele.find('.slick-dots'));
		$ele.find('.slick-arrow').addClass('icon arrow');	
		
		function buildList() {
			if(i < roomsLength) {
				if(currentDateObj) {
					date = currentDateObj;
				}
				var date1;
				if(date.getDate() < 10) {
					date1 = '0' + date.getDate();
				} else {
					date1 = date.getDate();	
				}
				currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date1;

				$.ajax({
		            type: "GET",
		            url: 'https://websdk.fastbooking-services.com/quotation?arrivalDate=' + currentDate + '&currency=JPY&property=jpnas28830&roomRestriction='+ rooms[i].beName + '&output=json&nights=1&adults=2&_authCode=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOiJeLiokIiwicHJvcGVydGllcyI6Il5qcChhfGJ8Y3xmfGh8anxrfG58b3xzfHR8dXx5KVthLXpdezJ9WzAtOV17NX0kIiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJNUyIsImlhdCI6MTQ4NTE5MDg1MiwianRpIjoiMzk1ZDQyNmEtMjUxYi00YmM0LThhN2UtZGU3ZjIyMDBhMGMxIn0.nfxBfwao6Z-k2X8rToJOTEouiVf1lhgPAwrTRFIyeW0',
		            success:function(response){
		            	var lowestPrice,
							currency;

						if(response.data.length) {
							lowestPrice = response.data[0].pricePerNight;
							currency = response.data[0].currency_html;

							// $ele.append('<li>\
							// 	<img src="../dist/images/room-image.png">\
							// 	<h3>' + rooms[i].title + '</h3>\
							// 	<p>Starting from: <span> ' + currency + ' ' + lowestPrice + '/night </span></p>\
							// 	<a href="#">Book Now</a>\
							// </li>')
							$($ele.find('li')[i]).find('.js-spinner').removeClass('spinner');
							$($ele.find('li')[i]).find('.js-accomodation-price').html(currency + ' ' + lowestPrice);
							currentDateObj = null;
							date = new Date();
							i++;
						} else {
							currentDateObj = new Date(currentDate);
							currentDateObj.setDate(currentDateObj.getDate() + 1);
						}
						buildList();
					}
				});
			}
		};
		buildList();
	  }
	});

    function nearBuy () {
    	var $ele = $('.js-nearbuy'),
	    	nearBuyList = [
				{
					property: 'jposa28306',
					beName: 'Renovated-Hollywood-Twin--Non-Sm'	
				},
				{
					property: 'jposa26338',
					beName: 'Deluxe-Triple-Non-Smoking'	
				},
				{
					property: 'jposa31260',
					beName: 'Standard-Double'	
				}
			],
			roomsLength = nearBuyList.length,
			i = 0,
			date = new Date(),
			currentDate,
			currentDateObj;
		
		function buildList() {
			if(i < roomsLength) {
				if(currentDateObj) {
					date = currentDateObj;
				}
				var date1;
				if(date.getDate() < 10) {
					date1 = '0' + date.getDate();
				} else {
					date1 = date.getDate();	
				}
				currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date1;

				$.ajax({
		            type: "GET",
		            url: 'https://websdk.fastbooking-services.com/quotation?arrivalDate=' + currentDate + '&currency=JPY&property=' + nearBuyList[i].property + '&roomRestriction='+ nearBuyList[i].beName + '&output=json&nights=1&adults=2&_authCode=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOiJeLiokIiwicHJvcGVydGllcyI6Il5qcChhfGJ8Y3xmfGh8anxrfG58b3xzfHR8dXx5KVthLXpdezJ9WzAtOV17NX0kIiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJNUyIsImlhdCI6MTQ4NTE5MDg1MiwianRpIjoiMzk1ZDQyNmEtMjUxYi00YmM0LThhN2UtZGU3ZjIyMDBhMGMxIn0.nfxBfwao6Z-k2X8rToJOTEouiVf1lhgPAwrTRFIyeW0',
		            success:function(response){
		            	var lowestPrice,
							currency;

						if(response.data.length) {
							lowestPrice = response.data[0].pricePerNight;
							currency = response.data[0].currency_html;
							$($ele.find('li')[i]).find('.js-spinner').removeClass('spinner');
							$($ele.find('li')[i]).find('.js-nearbuy-price').html(currency + ' ' + lowestPrice);
							currentDateObj = null;
							date = new Date();
							i++;
						} else {
							currentDateObj = new Date(currentDate);
							currentDateObj.setDate(currentDateObj.getDate() + 1);
						}
						buildList();
					}
				});
			}
		};
		buildList();
    }
    nearBuy();
};

function showInfo(data, tabletop) {
	console.log('Successfully processed!')
	// console.log(tabletop.sheets('osaka').elements);
	// console.log(tabletop.sheets('Accomodations').elements)
	window.data = {};
	window.data.main = tabletop.sheets('osaka').elements;
	window.data.rooms = tabletop.sheets('Accomodations').elements;
    
    window.data.main.map(function(value){
		$('[data-sheet=' + value.Item + ']').text(value[countryCode]);			
	});
};

$(document).on('mouseover', '.ui-datepicker-calendar td a', function(e){
	if($('.check-out').hasClass('js-datepicker-highlight')) {
		$(this).parents('.ui-datepicker-group').prevAll().find('td.dp-highlight-hover').removeClass('last-cell').addClass('new-cell');
		$(this).parents('tr').prevAll().find('td.dp-highlight-hover').removeClass('last-cell').addClass('new-cell');
		$(this).parent('td').prevAll('td.dp-highlight-hover').removeClass('last-cell').addClass('new-cell');
    	$(this).parent('td.dp-highlight-hover').addClass('last-cell');
    	$(this).parent('td').nextAll('td.dp-highlight-hover').removeClass('last-cell').removeClass('new-cell');
    	$(this).parents('tr').nextAll().find('td.dp-highlight-hover').removeClass('last-cell').removeClass('new-cell');
    	$(this).parents('.ui-datepicker-group').nextAll().find('td.dp-highlight-hover').removeClass('last-cell').removeClass('new-cell');
	}
});

$('.js-select-guest').on('click', function(e) {
	$('.js-select-guest-container').toggleClass('hidden');
	$('html, body').animate({
        scrollTop: $('.js-select-guest').offset().top
    }, 1000);
});

$('.js-cancel-select-guest').on('click', function() {
	$('.js-select-guest-container').toggleClass('hidden');
	$('html, body').animate({
        scrollTop: $('#mainForm').offset().top
    }, 1000);
});

$('.js-add-room').on('click', function(){
	//console.log($('.js-room-list').find('li').length)
	var index = $('.js-room-list').find('li').length + 1;
	var list = '<li class="js-room room clearfix" data-room="'+ index +'">\
					<div class="room-container clearfix">\
						<p class="room__heading">'+ miscellaneous.roomLabel + index +'</p>\
						<div class="form__control">\
							<label class="room__label form__label">' + miscellaneous.adultLabel + '</label>\
							<div class="input-wrap">\
								<select class="room__field form__field js-adult-count">\
									<option value="1">1</option>\
									<option value="2" selected>2</option>\
									<option value="3">3</option>\
									<option value="4">4</option>\
									<option value="5">5</option>\
									<option value="6">6</option>\
									<option value="7">7</option>\
								</select>\
							</div>\
						</div>\
						<div class="form__control">\
							<label class="room__label form__label">' + miscellaneous.childrenLabel + '</label>\
							<div class="input-wrap">\
								<select class="room__field form__field js-child-count">\
									<option value="0">0</option>\
									<option value="1">1</option>\
									<option value="2">2</option>\
									<option value="3">3</option>\
									<option value="4">4</option>\
									<option value="5">5</option>\
									<option value="6">6</option>\
									<option value="7">7</option>\
								</select>\
							</div>\
						</div>\
					</div>\
					<div class="room__delete">\
						<a href="javascript:;" title="'+ miscellaneous.deleteRoom +'" class="room__delete-btn js-delete-room"><i class="icon delete-icon"></i></a>\
					</div>\
				</li>';
	$('.js-room-list').append(list);
});

$('.js-room-list').on('click', '.js-delete-room', function(e){
	var $this = $(this);
	$this.parents('li').remove();
});

$('.js-room-list').on('change', '.js-child-count', function(e){
	var $this = $(this),
		value = $this.val(),
		$ageList = $this.parents('.js-room').find('.js-child-age-list');

	$ageList.empty();				
	for (var i = 0; i < value; i++) {
		var index = i + 1;
		var $ageField = '<p class="room__heading">Ages</p>\
						<div class="form__con js-child-age-ele">\
							<label class="form__label">Child '+ index + '</label>\
							<div class="input-wrap">\
								<select class="form__field">\
									<option value="1">1</option>\
									<option value="2">2</option>\
									<option value="3">3</option>\
									<option value="4">4</option>\
									<option value="5">5</option>\
									<option value="6">6</option>\
									<option value="7">7</option>\
									<option value="8">8</option>\
									<option value="9">9</option>\
									<option value="10">10</option>\
									<option value="11">11</option>\
									<option value="12">12</option>\
									<option value="13">13</option>\
									<option value="14">14</option>\
								</select>\
							</div>\
						</div>';
		$ageList.append($ageField);
	}
});

$('.js-confirm').on('click', function() {
	var adultFields = $('.js-select-guest-container').find('.js-adult-count'),
		childFields = $('.js-select-guest-container').find('.js-child-count'),
		adultCount = 0,
		childCount = 0;

		//console.log(adultFields, childFields);
		for (var i = 0; i < adultFields.length; i++) {
			adultCount += Number(adultFields[i].value);
		}
		for (var i = 0; i < childFields.length; i++) {
			childCount += Number(childFields[i].value);
		}
	$('.js-select-guest').val(adultCount + childCount);	
	$('.js-total-adult').val(adultCount);
	$('.js-total-children').val(childCount);
	$('.js-total-room').val($('.js-room').length);
	$('.js-select-guest-container').toggleClass('hidden');
	$('html, body').animate({
        scrollTop: $('#mainForm').offset().top
    }, 1000);
});

$('.js-more-photos').on('click', function(e) {
	e.preventDefault();
	$('.second-set').fadeIn();
	$(e.target).hide();
});

$('.js-tabs-select').on('change', function(e) {	
	var tabId = $(this).val();

	$('ul.tabs li').removeClass('current');
	$('.tab-content').removeClass('current');

	$('ul.js-tabs li[data-tab="'+ tabId +'"]').addClass('current');
	$("#"+tabId).addClass('current');
	$("#"+tabId).find('.js-tab-slider').slick('setPosition', 0);
});

$('ul.js-tabs li').click(function(){

	var tabId = $(this).attr('data-tab');

	$('ul.js-tabs li').removeClass('current');
	$('.tab-content').removeClass('current');

	$('.js-tabs-select').val(tabId).trigger('change');
	$(this).addClass('current');
	$("#"+tabId).addClass('current');
	$("#"+tabId).find('.js-tab-slider').slick('setPosition', 0);
});

var slickConfig = {
	lazyLoad: 'ondemand',
	infinite: false,
	speed: 500,
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
};

var noOfSlide = 3;
if($(window).width() < 900 && $(window).width() > 600) {
	noOfSlide = 2;
}else if($(window).width() < 600) {
	noOfSlide = 1;
}

var createSlider = function(ele) {
	var $eleOrEles = $(ele);
	if($eleOrEles.length > 1) {
		$eleOrEles.map(function(index, item){
			slickConfig.dots = true;
			slickConfig.arrows = true;
			slickConfig.slidesToShow = noOfSlide;
			slickConfig.slidesToScroll = noOfSlide;

			if($(item).find('li').length <= noOfSlide) {
				slickConfig.dots = false;
				slickConfig.arrows = false;
			}
			$(item).slick(slickConfig);
			$(item).find('.slick-arrow').appendTo( $(item).find('.slick-dots'));
			$(item).find('.slick-arrow').addClass('icon arrow');
		});
	} else {
		slickConfig.dots = true;
		slickConfig.arrows = true;
		slickConfig.slidesToShow = noOfSlide;
		slickConfig.slidesToScroll = noOfSlide;

		if($eleOrEles.find('li').length <= noOfSlide) {
			slickConfig.dots = false;
			slickConfig.arrows = false;
		}
		$eleOrEles.slick(slickConfig);
		$eleOrEles.find('.slick-arrow').appendTo( $eleOrEles.find('.slick-dots'));
		$eleOrEles.find('.slick-arrow').addClass('icon arrow');
	}
};

createSlider('.js-tab-slider');
createSlider('.js-nearbuy');

$('.header_cta-dropdown').on('click', function(){
	$('.header_language').toggleClass('active');
});

$('.js-header-link').on('click', function(e) {
	var secLink = $(e.target).attr('href');
	
	$('html, body').animate({
        scrollTop: $(secLink).offset().top
    }, 1250);
});

$('.js-main-form-btn').on('click', function(){
	var $this = $(this),
		$form = $this.parents("form"),
		isValid = true;

	$form.find(':input.required').each(function(index){
	    // console.log(this.value)
	    if(!this.value.length) {
    		isValid = false;
    		$(this).addClass('js-is-invalid');
	    }else {
	    	$(this).removeClass('js-is-invalid');
	    }
	});
	if(isValid) {
		var queryParams = '',
			url;

		if($('body').hasClass('ja_JP')) {
			$form.serializeArray().forEach(function(param){
				// console.log(param)
				queryParams +=  '&' + param.name + '=' + param.value;
			});

			url = 'https://mystays.rwiths.net/r-withs/tfs0020a.do?' + queryParams;
		} else {
			queryParams = "s=results";
			$form.serializeArray().forEach(function(param){
				// console.log(param)
				if(param.name == 'arrival' || param.name == 'departure') {
					var date = new Date(param.value);
					param.value = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
				}
				queryParams +=  '&' + param.name + '=' + param.value;
			});
			
			url = 'https://www.book-secure.com/index.php?' + queryParams;
		}
		// console.log(url)
		var win = window.open(url, '_blank');
			win.focus();
	}
});

$('.js-toggle-menu').on('click', function(e) {
	$('.js-mobile-menu').fadeIn();
});

$('.js-close-mobile-menu').on('click', function(e) {
	$('.js-mobile-menu').fadeOut();
});

$(document).ready(init);
