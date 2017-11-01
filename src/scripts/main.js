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
				$('.check-out').addClass('js-datepicker-highlight');
				$('.check-in').removeClass('js-datepicker-highlight');
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
		minDate: new Date(2018, 1, 1),
		numberOfMonths: numberOfMonths,
		beforeShowDay: function(date) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkIn").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkOut").val());
			var className = "",
				booleanFlag = true;
			
			if(date1 && date > date1) {	
				className = 'dp-highlight-hover';
			}
			if(date1 && date2 && date > date1 && date < date2){
				className = 'dp-highlight';
			}
			if((date1 && date.getTime() == date1.getTime()) || (date2 && date.getTime() == date2.getTime())) {
				className = "dp-highlighted";
			}
			//console.log(date)
			return [booleanFlag, date1 && ((date.getTime() == date1.getTime()) || (!date2 && (date > date1)) || (date2 && date >= date1)) ? className : ""];
		},
		onSelect: function(dateText, inst) {
			var date1 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkIn").val());
			var date2 = $.datepicker.parseDate($.datepicker._defaults.dateFormat, $("#checkOut").val());
            var selectedDate = $.datepicker.parseDate($.datepicker._defaults.dateFormat, dateText);            
            
            if (date1 && date2) {
            	if(selectedDate < date1) {
            		if($("#checkIn").hasClass('js-datepicker-highlight')) {
	            		$("#checkIn").val(dateText).removeClass('js-datepicker-highlight');
	            		if(!$('.js-datepicker-modal').hasClass('hidden')) {
					      	$('.js-datepicker-modal').addClass('hidden');
					    }
	            	}else if($("#checkOut").hasClass('js-datepicker-highlight')) {
	            		$("#checkIn").val(dateText);
		            	$("#checkOut").val('').addClass('js-datepicker-highlight');
	            	} 
            	} else if(selectedDate > date1 && selectedDate < date2) { 
            		if($("#checkIn").hasClass('js-datepicker-highlight')) {
	            		$("#checkIn").val(dateText).removeClass('js-datepicker-highlight');
	            		if(!$('.js-datepicker-modal').hasClass('hidden')) {
					      	$('.js-datepicker-modal').addClass('hidden');
					    }
	            	}else if($("#checkOut").hasClass('js-datepicker-highlight')) {
		            	$("#checkOut").val(dateText).removeClass('js-datepicker-highlight');
		            	if(!$('.js-datepicker-modal').hasClass('hidden')) {
					      	$('.js-datepicker-modal').addClass('hidden');
					    }
	            	}
            	}else if(selectedDate > date2) { 
            		if($("#checkIn").hasClass('js-datepicker-highlight')) {
	            		$("#checkIn").val(dateText).removeClass('js-datepicker-highlight');
	            		$("#checkOut").val('').addClass('js-datepicker-highlight');
	            	}else if($("#checkOut").hasClass('js-datepicker-highlight')) {
		            	$("#checkOut").val(dateText).removeClass('js-datepicker-highlight');
		            	if(!$('.js-datepicker-modal').hasClass('hidden')) {
					      	$('.js-datepicker-modal').addClass('hidden');
					    }
	            	}
            	}
                $(this).datepicker();
            } else if (!date1 && date2) {
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

            if($("#checkIn").val()){
            	var arrDate = new Date($("#checkIn").val()).getDate();
            	arrDate = arrDate < 10 ? '0' + arrDate : arrDate;
            	$('.js-date-arrival').removeClass('hidden').text(arrDate);
            }else {
            	$('.js-date-arrival').removeClass('hidden').text('');
            }

            if($("#checkOut").val()){
            	var depDate = new Date($("#checkOut").val()).getDate();
            	depDate = depDate < 10 ? '0' + depDate : depDate;
            	$('.js-date-departure').removeClass('hidden').text(depDate);
            }else {
            	$('.js-date-departure').removeClass('hidden').text('');
            }
		}
	});

	$('.js-close-datepicker').click(function() {
        $(".js-datepicker-modal").addClass('hidden');
    });

    var inDateObj = new Date(),
    	inMonth = (inDateObj.getMonth() + 1) < 10 ?  '0' + (inDateObj.getMonth() + 1) : (inDateObj.getMonth() + 1),
    	inDate = inDateObj.getDate() < 10 ?  '0' + inDateObj.getDate() : inDateObj.getDate(),
    	currentDate = inDateObj.getFullYear() + '-' + inMonth + '-' + inDate,
    	outDateObj = new Date();

   	outDateObj.setDate(new Date().getDate() + 1);
    var	outMonth = (outDateObj.getMonth() + 1) < 10 ?  '0' + (outDateObj.getMonth() + 1) : (outDateObj.getMonth() + 1),
    	outDate = outDateObj.getDate() < 10 ?  '0' + outDateObj.getDate() +  1 : outDateObj.getDate(),
    	nextDate = outDateObj.getFullYear() + '-' + outMonth + '-' + outDate;

    //var url = 'http://dev.mystays.net.smartosc.com/api/mystays/Pricing/GetHotelPrice?hotelid=98555&checkin=' + currentDate + '&checkout=' + nextDate + '&adults=2&child=0&rooms=1';
    //var url = 'https://dev.mystays.net.smartosc.com/api/mystays/Pricing/GetHotelPrice?hotelid=98555&checkin=2017-11-02&checkout=2017-11-05&adults=2&child=0&rooms=1';
    var url = 'http://dev.mystays.net.smartosc.com/api/mystays/Pricing/GetHotelPrice?hotelid=98555&checkin=' + currentDate + '&checkout=' + nextDate + '&adults=2&child=0&rooms=1';
 //    var response = {
	//   "propertyname": "Hotel Mystays Haneda",
	//   "rooms": [
	//     {
	//       "roomName": "Standard Semi Double S",
	//       "price": "118.8000",
	//       "roomIdBooking": "428264"
	//     },
	//     {
	//       "roomName": "Standard Semi Double NS",
	//       "price": "237.6000",
	//       "roomIdBooking": "428265"
	//     },
	//     {
	//       "roomName": "Standard Double S",
	//       "price": "356.4000",
	//       "roomIdBooking": "428266"
	//     },
	//     {
	//       "roomName": "Standard Double NS",
	//       "price": "475.2000",
	//       "roomIdBooking": "428267"
	//     },
	//     {
	//       "roomName": "Standard Queen S",
	//       "price": "594.0000",
	//       "roomIdBooking": "428268"
	//     },
	//     {
	//       "roomName": "Standard Queen NS",
	//       "price": "712.8000",
	//       "roomIdBooking": "428269"
	//     },
	//     {
	//       "roomName": "Standard Twin S",
	//       "price": "831.6000",
	//       "roomIdBooking": "428270"
	//     },
	//     {
	//       "roomName": "Standard Twin NS",
	//       "price": "950.4000",
	//       "roomIdBooking": "428271"
	//     },
	//     {
	//       "roomName": "Standard Hollywood Twin NS",
	//       "price": "1069.2000",
	//       "roomIdBooking": "428272"
	//     },
	//     {
	//       "roomName": "Accessible Double NS",
	//       "price": "1188.0000",
	//       "roomIdBooking": "428273"
	//     },
	//     {
	//       "roomName": "Deluxe Queen NS",
	//       "price": "1306.8000",
	//       "roomIdBooking": "428274"
	//     },
	//     {
	//       "roomName": "Deluxe Twin NS",
	//       "price": "1425.6000",
	//       "roomIdBooking": "428275"
	//     },
	//     {
	//       "roomName": "Superior Double Kitchenette NS",
	//       "price": "1544.4000",
	//       "roomIdBooking": "428276"
	//     },
	//     {
	//       "roomName": "Superior Queen NS",
	//       "price": "1663.2000",
	//       "roomIdBooking": "428277"
	//     },
	//     {
	//       "roomName": "Grand Deluxe Twin S",
	//       "price": "1782.0000",
	//       "roomIdBooking": "428278"
	//     },
	//     {
	//       "roomName": "Grand Deluxe Twin NS",
	//       "price": "1900.8000",
	//       "roomIdBooking": "428279"
	//     }
	//   ]
	// };

    $.ajax({
    	type: 'GET',
    	url: url,
    	dataType: 'json',
    	success:function(response){
    		console.info(response)
    		if(response.rooms.length) {
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
				      infinite: true,
   					  centerMode: true,
   					  centerPadding: '30px',			      
				    }
				  }
				]
			},
			ele = '.js-accomodation',
			$ele = $('.js-accomodation'),
			rooms = response.rooms,
			roomsLength = rooms.length,
			noOfSlide = 3,
			lowestPrice,
			lowestPriceFormatted,
			currentDate = new Date();

			if($(window).width() < 900 && $(window).width() > 600) {
				noOfSlide = 2;
			}else if($(window).width() < 600) {
				noOfSlide = 1;
			}

			for (var i = 0; i < roomsLength; i++) {
				lowestPrice =Math.round(parseFloat(rooms[i].price));
				try {
					lowestPriceFormatted = lowestPrice.toLocaleString('ja-JP');
			  	} catch (e) {
			    	lowestPriceFormatted = lowestPrice;
			  	}

				$ele.append('<li data-room="'+ rooms[i].roomIdBooking +'">\
					<img src="../dist/images/room-image.png">\
					<h3>' + rooms[i].roomName + '</h3>\
					<p><span>Starting from:</span><span class="js-accomodation-price">¥ ' + lowestPriceFormatted + '</span><span>/night</span></p>\
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
		  }
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
		            		lowestPriceFormatted,
							currency;

						if(response.data.length) {
							lowestPrice =  Math.round(response.data[0].pricePerNight);
							currency = response.data[0].currency_html;

							try {
								lowestPriceFormatted = lowestPrice.toLocaleString('ja-JP');
						  	} catch (e) {
						    	lowestPriceFormatted = lowestPrice;
						  	}

							$($ele.find('li')[i]).find('.js-spinner').removeClass('spinner');
							$($ele.find('li')[i]).find('.js-nearbuy-price').html(currency + ' ' + lowestPriceFormatted);
							k = 0;
							currentDateObj = null;
							date = originalDate;
							i++;
						} else {
							if(k == 5) {
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
	$("#"+tabId).find('.js-tab-slider-inner').slick('setPosition', 0);
});

$('ul.js-tabs li').click(function(){

	var tabId = $(this).attr('data-tab');

	$('ul.js-tabs li').removeClass('current');
	$('.tab-content').removeClass('current');

	$('.js-tabs-select').val(tabId).trigger('change');
	$(this).addClass('current');
	$("#"+tabId).addClass('current');
	$("#"+tabId).find('.js-tab-slider').slick('setPosition', 0);
	$("#"+tabId).find('.js-tab-slider-inner').slick('setPosition', 0);
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
	      infinite: true,
		  centerMode: true,
		  centerPadding: '30px',
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
if($(window).width() > 600){
	createSlider('.js-nearbuy');
}

$('.js-tab-slider-inner').slick({
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  dots: true,
    dotsClass: 'custom_paging',
    customPaging: function (slider, i) {
        return  (i + 1) + ' of ' + slider.slideCount;
    }
});
$('.js-tab-slider-inner .slick-arrow').addClass('icon arrow');

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
				if(param.name == 'datein' || param.name == 'dateout') {
					var date = new Date(param.value);
					param.value = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
				}
				queryParams +=  '&' + param.name + '=' + param.value;
			});
			
			//url = 'https://www.book-secure.com/index.php?' + queryParams;
			url = 'https://reservations.travelclick.com/' + property + '?' + queryParams + '#/guestsandrooms'
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
		date1,
		date2,
		day1Str,
		day2Str,
		month1Str,
		month2Str,
		fullDate1,
		fullDate2,
		selectedDate = new Date(2018, 1, 1),
		now = new Date();

	selectedDate.setHours(0,0,0,0);
	now.setHours(0,0,0,0);
	if (now < selectedDate) {
	  	date1 = new Date(2018, 1, 1);
		date2 = new Date(2018, 1, 1);
	} else {
		date1 = new Date();
		date2 = new Date();
	}

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

	if(locale === 'en_GB') {
		fullDate1 = month1Str + '/' + day1Str + '/' + date1.getFullYear();	
		fullDate2 = month2Str + '/' + day2Str + '/' + date2.getFullYear();	

		if($(e.target).parents('li').data('room')) {
			url = 'https://reservations.travelclick.com/' + property + '?hotelid=' + property + '&datein=' + fullDate1 + '&dateout=' + fullDate2 + '&rooms=1&adults=2&children=0&roomtypeid=' + $(e.target).parents('li').data('room') + '#/accommodation/room';
			//url = 'https://www.book-secure.com/index.php?s=results&property='+ propertyId +'&arrival='+ fullDate1 +'&departure=' + fullDate2 + '&accommodation=' + $(e.target).parents('li').data('name') + '&adults1=2&children1=0&children2=0&rooms=1&locale='+ locale +'&currency=JPY';
		} else if($(e.target).parents('li').data('hotel')) {
			url = 'https://www.book-secure.com/index.php?s=results&property=' + $(e.target).parents('li').data('hotel') + '&arrival='+ fullDate1 +'&departure=' + fullDate2 + '&adults1=2&children1=0&children2=0&rooms=1&locale='+ locale +'&currency=JPY';
		}
	} else if(locale === 'ja_JP') {
		fullDate1 = date1.getFullYear() + '-' + month1Str + '-' + day1Str;	
		fullDate2 = date2.getFullYear() + '-' + month2Str + '-' + day2Str;	

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
	var url = 'https://api.trustyou.com/hotels/' + key + '/trust_score.html?embedded=true&lang=en&size=m';
	
	$.ajax({url: url, success: function(result){
		$(id).append($(result).find('.counter'));
		$(id).append($(result).find('.rating-units'));
		

    }});
}
getReviews('#shinsaibashiEast', '487c3a95-0204-4b24-b3d8-07bb42db12fc');
getReviews('#shinsaibashi', 'b5c6981a-016b-436e-95a6-85041532bdcb');

$.ajax({url: 'https://api.trustyou.com/hotels/93ed65c2-4b3f-4101-a7a0-d149aedf852e/trust_score.html?embedded=true&lang=en&size=m', success: function(result){
	$('#guide-logo').append(result);
}});

$(document).ready(init);
