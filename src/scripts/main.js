'use strict';
var propertyId,
	property,
	locale;

function init() {
    propertyId = $('#propertyId').val(),
    property = $('#property').val();
    locale = $('body').data('locale');
    function gotoDate(month, year) {
	    $(".js-datepicker-container").each(function (i, el) {
	        var inst = $.datepicker._getInst(el);
	        inst.drawMonth = inst.selectedMonth = month;
	        inst.drawYear = inst.selectedYear = year;
	        $.datepicker._notifyChange(inst);
	        $.datepicker._adjustDate(el);
	    });
	}		

	$.datepicker.regional[$('body').data('i18n')];

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
            		$("#checkIn").siblings('input[name="ciDateY"]').val(date.getFullYear());
	            	$("#checkIn").siblings('input[name="ciDateM"]').val(date.getMonth() + 1);
	            	$("#checkIn").siblings('input[name="ciDateD"]').val(date.getDate());
            	}
            	if($("#checkOut").val().length) {
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

    var url = 'https://websdk.fastbooking-services.com/accommodations?locale=' + locale + '&property='+ propertyId +'&output=json&_authCode=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOiJeLiokIiwicHJvcGVydGllcyI6Il5qcChhfGJ8Y3xmfGh8anxrfG58b3xzfHR8dXx5KVthLXpdezJ9WzAtOV17NX0kIiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJNUyIsImlhdCI6MTQ4NTE5MDg1MiwianRpIjoiMzk1ZDQyNmEtMjUxYi00YmM0LThhN2UtZGU3ZjIyMDBhMGMxIn0.nfxBfwao6Z-k2X8rToJOTEouiVf1lhgPAwrTRFIyeW0';
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
		k = 0,
		date = new Date(),
		originalDate,
		currentDate,
		currentDateObj,
		noOfSlide = 3,
		dayLimit = 5;

		if(date.getDay() < dayLimit) {
			
			switch (date.getDay()) {
			    case 0:
			        date.setDate(date.getDate() + 9);
			        break;
			    case 1:
			        date.setDate(date.getDate() + 8);
			        break;
			    case 2:
			        date.setDate(date.getDate() + 7);
			        break;
			    case 3:
			        date.setDate(date.getDate() + 6);
			        break;
			    case 4:
					date.setDate(date.getDate() + 5);
			        break;
			}
		} else {
			switch (date.getDay()) {
			    case 5:
			        date.setDate(date.getDate() + 11);
			        break;
			    case 6:
			        date.setDate(date.getDate() + 10);
			        break;
			}
		}

		originalDate = date;

		if($(window).width() < 900 && $(window).width() > 600) {
			noOfSlide = 2;
		}else if($(window).width() < 600) {
			noOfSlide = 1;
		}

		for (var j = 0; j < roomsLength; j++) {
			$ele.append('<li data-name="'+ rooms[j].beName +'">\
				<img src="../dist/images/room-image.png">\
				<h3>' + rooms[j].title + '</h3>\
				<p class="spinner js-spinner"><span>Starting from:</span><span class="js-accomodation-price"></span><span>/night</span></p>\
				<a href="#" class="js-book-now">Book Now</a>\
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
				var date1,
					month1;
				if(date.getDate() < 10) {
					date1 = '0' + date.getDate();
				} else {
					date1 = date.getDate();	
				}
				if((date.getMonth() + 1) < 10) {
					month1 = date.getMonth() + 1;
					month1 = '0' + month1;
				}else {
					month1 = date.getMonth() + 1;
				}
				currentDate = date.getFullYear() + '-' + month1 + '-' + date1;

				$.ajax({
		            type: "GET",
		            url: 'https://websdk.fastbooking-services.com/quotation?arrivalDate=' + currentDate + '&currency=JPY&property='+ propertyId +'&roomRestriction='+ rooms[i].beName + '&output=json&nights=1&adults=2&_authCode=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOiJeLiokIiwicHJvcGVydGllcyI6Il5qcChhfGJ8Y3xmfGh8anxrfG58b3xzfHR8dXx5KVthLXpdezJ9WzAtOV17NX0kIiwiZ3JvdXBzIjoiXiQiLCJmb3IiOiJNUyIsImlhdCI6MTQ4NTE5MDg1MiwianRpIjoiMzk1ZDQyNmEtMjUxYi00YmM0LThhN2UtZGU3ZjIyMDBhMGMxIn0.nfxBfwao6Z-k2X8rToJOTEouiVf1lhgPAwrTRFIyeW0',
		            success:function(response){
		            	var lowestPrice,
							currency;

						if(response.data.length) {
							lowestPrice = response.data[0].pricePerNight;
							currency = response.data[0].currency_html;

							$($ele.find('li')[i]).find('.js-spinner').removeClass('spinner');
							$($ele.find('li')[i]).find('.js-accomodation-price').html(currency + ' ' + Math.round(lowestPrice));
							k = 0;
							currentDateObj = null;
							date = originalDate;
							i++;
						} else {
							// if(k <= 150) {
							// 	k = 0;
							// 	$($ele.find('li')[i]).find('.js-spinner').removeClass('spinner').css('visibility', 'hidden');
							// 	currentDateObj = null;
							// 	date = originalDate;
							// 	i++;
							// 	buildList();
							// }
							currentDateObj = new Date(currentDate);
							currentDateObj.setDate(currentDateObj.getDate() + 7);
							k++;
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
					beName: 'Renovated-Standard-Single--Non-S'	
				},
				{
					property: 'jposa26338',
					beName: 'Standard-Semi-double-Non-Smoking'	
				},
				{
					property: 'jposa31260',
					beName: 'Standard-Double'	
				}
			],
			roomsLength = nearBuyList.length,
			i = 0,
			k = 0,
			date = new Date(),
			originalDate,
			dayLimit = 5,
			currentDate,
			currentDateObj;

			if(date.getDay() < dayLimit) {
			
			switch (date.getDay()) {
				    case 0:
				        date.setDate(date.getDate() + 9);
				        break;
				    case 1:
				        date.setDate(date.getDate() + 8);
				        break;
				    case 2:
				        date.setDate(date.getDate() + 7);
				        break;
				    case 3:
				        date.setDate(date.getDate() + 6);
				        break;
				    case 4:
						date.setDate(date.getDate() + 5);
				        break;
				}
			} else {
				switch (date.getDay()) {
				    case 5:
				        date.setDate(date.getDate() + 11);
				        break;
				    case 6:
				        date.setDate(date.getDate() + 10);
				        break;
				}
			}

			originalDate = date;
		
		function buildList() {
			if(i < roomsLength) {
				if(currentDateObj) {
					date = currentDateObj;
				}
				var date1,
					month1;
				if(date.getDate() < 10) {
					date1 = '0' + date.getDate();
				} else {
					date1 = date.getDate();	
				}
				if((date.getMonth() + 1) < 10) {
					month1 = date.getMonth() + 1;
					month1 = '0' + month1;
				}else {
					month1 = date.getMonth() + 1;
				}
				currentDate = date.getFullYear() + '-' + month1 + '-' + date1;

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
							$($ele.find('li')[i]).find('.js-nearbuy-price').html(currency + ' ' + Math.round(lowestPrice));
							k = 0;
							currentDateObj = null;
							date = originalDate;
							i++;
						} else {
							if(k <= 30) {
								k = 0;
								$($ele.find('li')[i]).find('.js-spinner').removeClass('spinner').css('visibility', 'hidden');
								currentDateObj = null;
								date = originalDate;
								i++;
								buildList();
							}
							currentDateObj = new Date(currentDate);
							currentDateObj.setDate(currentDateObj.getDate() + 7);
							k++;
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
	if(!$('.js-datepicker-modal').hasClass('hidden')) {
	      	$('.js-datepicker-modal').addClass('hidden');
	    }	
	$('.js-select-guest-container').toggleClass('hidden');
	$('html, body').animate({
        scrollTop: $('.js-select-guest').offset().top - 100
    }, 1000);
});

$('.js-cancel-select-guest').on('click', function() {
	$('.js-select-guest-container').toggleClass('hidden');
	$('html, body').animate({
        scrollTop: $('#mainForm').offset().top - 100
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
	$('.first-image').trigger('click');
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

$(document).on('click', '.js-book-now', function(e) {
	e.preventDefault();
	var url,
		date1 = new Date(),
		date2 = new Date(),
		day1Str,
		day2Str,
		month1Str,
		month2Str,
		fullDate1,
		fullDate2;

	date2.setDate(date2.getDate()  + 1);
	if(date1.getDate() < 10) {
		day1Str = '0' + date1.getDate();
	} else {
		day1Str = date1.getDate();	
	}

	if((date1.getMonth() +  1) < 10) {
		month1Str = (date1.getMonth() + 1);
		month1Str = '0' + month1Str;
	} else {
		month1Str = date1.getMonth() + 1;	
	}

	if(date2.getDate() < 10) {
		day2Str = '0' + date2.getDate();
	} else {
		day2Str = date2.getDate();	
	}

	if((date2.getMonth() +  1) < 10) {
		month2Str = (date2.getMonth() + 1);
		month2Str = '0' + month2Str;
	} else {
		month2Str = date2.getMonth() + 1;
	}

	fullDate1 = date1.getFullYear() + '-' + month1Str + '-' + day1Str;	
	fullDate2 = date2.getFullYear() + '-' + month2Str + '-' + day2Str;	

	if(locale === 'en_GB') {
		if($(e.target).parents('li').data('name')) {
			url = 'https://www.book-secure.com/index.php?s=results&property='+ propertyId +'&arrival='+ fullDate1 +'&departure=' + fullDate2 + '&accommodation=' + $(e.target).parents('li').data('name') + '&adults1=2&children1=0&children2=0&rooms=1&locale='+ locale +'&currency=JPY';
		} else if($(e.target).parents('li').data('hotel')) {
			url = 'https://www.book-secure.com/index.php?s=results&property=' + $(e.target).parents('li').data('hotel') + '&arrival='+ fullDate1 +'&departure=' + fullDate2 + '&adults1=2&children1=0&children2=0&rooms=1&locale='+ locale +'&currency=JPY';
		}
	} else if(locale === 'ja_JP') {
		if($(e.target).parents('li').data('name')) {		
			url = 'https://mystays.rwiths.net/r-withs/tfs0020a.do?&hotelNo='+ property +'&ciDateY='+ date1.getFullYear() +'&ciDateM='+ month1Str +'&ciDateD='+ day1Str +'&coDateY=' + date2.getFullYear() + '&coDateM=' + month2Str + '&coDateD='+ day2Str +'&otona=2&s1=0&room=1';
		} else if($(e.target).parents('li').data('hotel')) {
			url = 'https://mystays.rwiths.net/r-withs/tfs0020a.do?&hotelNo='+ $(e.target).parents('li').data('hotel') +'&ciDateY='+ date1.getFullYear() +'&ciDateM='+ month1Str +'&ciDateD='+ day1Str +'&coDateY=' + date2.getFullYear() + '&coDateM=' + month2Str + '&coDateD='+ day2Str +'&otona=2&s1=0&room=1';
		}
	}

	var win = window.open(url, '_blank');
		win.focus();
});

$(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`

     	if(!$('.js-datepicker-modal').hasClass('hidden')) {
     		$('.js-datepicker-modal').addClass('hidden');
    		$("#checkIn").removeClass('js-datepicker-highlight');
    		$("#checkOut").removeClass('js-datepicker-highlight');
     	}
     }
});

$(document).click(function(e) {
   if(!$(e.target).hasClass('js-datepicker-modal') && !$(e.target).parents().hasClass('js-datepicker-modal') && !$(e.target).parents().hasClass('ui-datepicker-header') && !$(e.target).hasClass('js-datepicker')) {
     	$('.js-datepicker-modal').addClass('hidden');
     	$("#checkIn").removeClass('js-datepicker-highlight');
    	$("#checkOut").removeClass('js-datepicker-highlight');	
   }
}); 
$(".fancybox-thumb").fancybox({
		prevEffect	: 'none',
		nextEffect	: 'none',
		helpers	: {
			title	: {
				type: 'outside'
			},
			thumbs	: {
				width	: 40,
				height	: 40
			}
		}
	});

function getReviews(id, key){
	var url = 'https://cors.io/?https://api.trustyou.com/hotels/' + key + '/trust_score.html?embedded=true&lang=en&size=m';
	
	$.ajax({url: url, success: function(result){

		$(id).append($(result).find('.rating-units'));
		$(id).append($(result).find('.counter'));

    }});
}
getReviews('#shinsaibashiEast', '487c3a95-0204-4b24-b3d8-07bb42db12fc');

$(document).ready(init);
