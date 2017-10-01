"use strict";function init(){function t(t,e){$(".js-datepicker-container").each(function(a,s){var i=$.datepicker._getInst(s);i.drawMonth=i.selectedMonth=t,i.drawYear=i.selectedYear=e,$.datepicker._notifyChange(i),$.datepicker._adjustDate(s)})}Tabletop.init({key:publicSpreadsheetUrl,callback:showInfo,simpleSheet:!0}),$("input.js-datepicker").click(function(e){if($(".js-select-guest-container").hasClass("hidden")||$(".js-select-guest-container").addClass("hidden"),$(".js-datepicker-modal").removeClass("hidden"),$(".check-in").removeClass("js-is-invalid"),$(".check-out").removeClass("js-is-invalid"),$(e.target).hasClass("check-in"))if($(e.target).val()){a=$(e.target).val();t(new Date(a).getMonth(),new Date(a).getFullYear()),$(".check-out").removeClass("js-datepicker-highlight"),$(e.target).addClass("js-datepicker-highlight")}else $(e.target).addClass("js-datepicker-highlight"),$(".js-datepicker-container").datepicker("option","gotoCurrent",!0);else if($(e.target).hasClass("check-out"))if($(e.target).val()){a=$(e.target).val();t(new Date(a).getMonth(),new Date(a).getFullYear()),$(".check-in").addClass("js-datepicker-highlight")}else if($(".check-in").val().length){$(e.target).addClass("js-datepicker-highlight"),$(".check-in").removeClass("js-datepicker-highlight");var a=$(".check-in").val();t(new Date(a).getMonth(),new Date(a).getFullYear())}else $(".check-in").addClass("js-datepicker-highlight"),$(".js-datepicker-container").datepicker("option","gotoCurrent",!0)});var e=2;$(window).width()<768&&(e=1),$(".js-datepicker-container").datepicker({minDate:0,numberOfMonths:e,beforeShowDay:function(t){var e=$.datepicker.parseDate($.datepicker._defaults.dateFormat,$("#checkIn").val()),a=$.datepicker.parseDate($.datepicker._defaults.dateFormat,$("#checkOut").val()),s="dp-highlight";return(e&&t.getTime()==e.getTime()||a&&t.getTime()==a.getTime())&&(s="dp-highlighted"),e&&!a&&t>e&&(s="dp-highlight-hover"),[!0,e&&(t.getTime()==e.getTime()||!a&&t>e||a&&t>=e&&t<=a)?s:""]},onSelect:function(t,e){var a=$.datepicker.parseDate($.datepicker._defaults.dateFormat,$("#checkIn").val()),s=$.datepicker.parseDate($.datepicker._defaults.dateFormat,$("#checkOut").val()),i=$.datepicker.parseDate($.datepicker._defaults.dateFormat,t);if(!a||s?($("#checkIn").val(t).removeClass("js-datepicker-highlight"),$("#checkIn").hasClass("js-is-invalid")&&$("#checkIn").removeClass("js-is-invalid"),$("#checkOut").val("").addClass("js-datepicker-highlight"),$(this).datepicker()):i<a?($("#checkIn").val(t),$("#checkIn").hasClass("js-is-invalid")&&$("#checkIn").removeClass("js-is-invalid"),$("#checkIn").hasClass("js-datepicker-highlight")&&($("#checkIn").removeClass("js-datepicker-highlight"),$("#checkOut").addClass("js-datepicker-highlight")),$(this).datepicker()):($("#checkIn").hasClass("js-datepicker-highlight")?($("#checkIn").val(t).removeClass("js-datepicker-highlight"),$("#checkOut").addClass("js-datepicker-highlight")):($("#checkOut").val(t).removeClass("js-datepicker-highlight"),$("#checkOut").hasClass("js-is-invalid")||$("#checkOut").removeClass("js-is-invalid"),$(".js-datepicker-modal").hasClass("hidden")||$(".js-datepicker-modal").addClass("hidden")),$(this).datepicker()),$("body").hasClass("ja_JP")){if($("#checkIn").val().length){l=new Date($("#checkIn").val());$("#checkIn").siblings('input[name="ciDateY"]').val(l.getFullYear()),$("#checkIn").siblings('input[name="ciDateM"]').val(l.getMonth()+1),$("#checkIn").siblings('input[name="ciDateD"]').val(l.getDate())}if($("#checkOut").val().length){var l=new Date($("#checkOut").val());$("#checkOut").siblings('input[name="coDateY"]').val(l.getFullYear()),$("#checkOut").siblings('input[name="coDateM"]').val(l.getMonth()+1),$("#checkOut").siblings('input[name="coDateD"]').val(l.getDate())}}}}),$(".js-close-datepicker").click(function(){$(".js-datepicker-modal").addClass("hidden")})}function showInfo(t,e){console.log("Successfully processed!"),console.log(e.sheets("osaka").elements),console.log(e.sheets("Accomodations").elements),window.data={},window.data.main=e.sheets("osaka").elements,window.data.rooms=e.sheets("Accomodations").elements}var countryCode="jp";$(".js-accomodation").slick({lazyLoad:"ondemand",slidesToShow:3,speed:2e3,slidesToScroll:4,dots:!0,responsive:[{breakpoint:900,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}}]}),$(".slick-arrow").appendTo(".slick-dots"),$(".slick-arrow").addClass("icon arrow"),$(".header_cta-dropdown").on("click",function(){$(".header_language").toggleClass("active")});var createRoomSlider,addTextualContent,publicSpreadsheetUrl="https://docs.google.com/spreadsheets/d/1HyfDyalAgZ9sYE-WCqgeo58_y47BRSiyqi5YArcSins/pubhtml";$(document).on("mouseover",".ui-datepicker-calendar td a",function(t){$(".check-out").hasClass("js-datepicker-highlight")&&($(this).parents(".ui-datepicker-group").prevAll().find("td.dp-highlight-hover").removeClass("last-cell").addClass("new-cell"),$(this).parents("tr").prevAll().find("td.dp-highlight-hover").removeClass("last-cell").addClass("new-cell"),$(this).parent("td").prevAll("td.dp-highlight-hover").removeClass("last-cell").addClass("new-cell"),$(this).parent("td.dp-highlight-hover").addClass("last-cell"),$(this).parent("td").nextAll("td.dp-highlight-hover").removeClass("last-cell").removeClass("new-cell"),$(this).parents("tr").nextAll().find("td.dp-highlight-hover").removeClass("last-cell").removeClass("new-cell"),$(this).parents(".ui-datepicker-group").nextAll().find("td.dp-highlight-hover").removeClass("last-cell").removeClass("new-cell"))}),$(".js-select-guest").on("click",function(t){$(".js-select-guest-container").toggleClass("hidden"),$("html, body").animate({scrollTop:$(".js-select-guest").offset().top},1e3)}),$(".js-cancel-select-guest").on("click",function(){$(".js-select-guest-container").toggleClass("hidden"),$("html, body").animate({scrollTop:$("#mainForm").offset().top},1e3)}),$(".js-add-room").on("click",function(){var t=$(".js-room-list").find("li").length+1,e='<li class="js-room room clearfix" data-room="'+t+'">\t\t\t\t\t<div class="room-container clearfix">\t\t\t\t\t\t<p class="room__heading">'+miscellaneous.roomLabel+t+'</p>\t\t\t\t\t\t<div class="form__control">\t\t\t\t\t\t\t<label class="room__label form__label">'+miscellaneous.adultLabel+'</label>\t\t\t\t\t\t\t<div class="input-wrap">\t\t\t\t\t\t\t\t<select class="room__field form__field js-adult-count">\t\t\t\t\t\t\t\t\t<option value="1">1</option>\t\t\t\t\t\t\t\t\t<option value="2" selected>2</option>\t\t\t\t\t\t\t\t\t<option value="3">3</option>\t\t\t\t\t\t\t\t\t<option value="4">4</option>\t\t\t\t\t\t\t\t\t<option value="5">5</option>\t\t\t\t\t\t\t\t\t<option value="6">6</option>\t\t\t\t\t\t\t\t\t<option value="7">7</option>\t\t\t\t\t\t\t\t</select>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="form__control">\t\t\t\t\t\t\t<label class="room__label form__label">'+miscellaneous.childrenLabel+'</label>\t\t\t\t\t\t\t<div class="input-wrap">\t\t\t\t\t\t\t\t<select class="room__field form__field js-child-count">\t\t\t\t\t\t\t\t\t<option value="0">0</option>\t\t\t\t\t\t\t\t\t<option value="1">1</option>\t\t\t\t\t\t\t\t\t<option value="2">2</option>\t\t\t\t\t\t\t\t\t<option value="3">3</option>\t\t\t\t\t\t\t\t\t<option value="4">4</option>\t\t\t\t\t\t\t\t\t<option value="5">5</option>\t\t\t\t\t\t\t\t\t<option value="6">6</option>\t\t\t\t\t\t\t\t\t<option value="7">7</option>\t\t\t\t\t\t\t\t</select>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t\t<div class="room__delete">\t\t\t\t\t\t<a href="javascript:;" title="'+miscellaneous.deleteRoom+'" class="room__delete-btn js-delete-room"><i class="icon delete-icon"></i></a>\t\t\t\t\t</div>\t\t\t\t</li>';$(".js-room-list").append(e)}),$(".js-room-list").on("click",".js-delete-room",function(t){$(this).parents("li").remove()}),$(".js-room-list").on("change",".js-child-count",function(t){var e=$(this),a=e.val(),s=e.parents(".js-room").find(".js-child-age-list");s.empty();for(var i=0;i<a;i++){var l='<p class="room__heading">Ages</p>\t\t\t\t\t\t<div class="form__con js-child-age-ele">\t\t\t\t\t\t\t<label class="form__label">Child '+(i+1)+'</label>\t\t\t\t\t\t\t<div class="input-wrap">\t\t\t\t\t\t\t\t<select class="form__field">\t\t\t\t\t\t\t\t\t<option value="1">1</option>\t\t\t\t\t\t\t\t\t<option value="2">2</option>\t\t\t\t\t\t\t\t\t<option value="3">3</option>\t\t\t\t\t\t\t\t\t<option value="4">4</option>\t\t\t\t\t\t\t\t\t<option value="5">5</option>\t\t\t\t\t\t\t\t\t<option value="6">6</option>\t\t\t\t\t\t\t\t\t<option value="7">7</option>\t\t\t\t\t\t\t\t\t<option value="8">8</option>\t\t\t\t\t\t\t\t\t<option value="9">9</option>\t\t\t\t\t\t\t\t\t<option value="10">10</option>\t\t\t\t\t\t\t\t\t<option value="11">11</option>\t\t\t\t\t\t\t\t\t<option value="12">12</option>\t\t\t\t\t\t\t\t\t<option value="13">13</option>\t\t\t\t\t\t\t\t\t<option value="14">14</option>\t\t\t\t\t\t\t\t</select>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>';s.append(l)}}),$(".js-confirm").on("click",function(){for(var t=$(".js-select-guest-container").find(".js-adult-count"),e=$(".js-select-guest-container").find(".js-child-count"),a=0,s=0,i=0;i<t.length;i++)a+=Number(t[i].value);for(i=0;i<e.length;i++)s+=Number(e[i].value);$(".js-select-guest").val(a+s),$(".js-total-adult").val(a),$(".js-total-children").val(s),$(".js-total-room").val($(".js-room").length),$(".js-select-guest-container").toggleClass("hidden"),$("html, body").animate({scrollTop:$("#mainForm").offset().top},1e3)});var $grid=$(".grid").masonry({itemSelector:".grid-item",isFitWidth:!0,columnWidth:1});$(".js-tabs-select").on("change",function(t){var e=$(this).val();$("ul.tabs li").removeClass("current"),$(".tab-content").removeClass("current"),$('ul.js-tabs li[data-tab="'+e+'"]').addClass("current"),$("#"+e).addClass("current"),$(".js-accomodation").slick("refresh")}),$("ul.js-tabs li").click(function(){var t=$(this).attr("data-tab");$("ul.js-tabs li").removeClass("current"),$(".tab-content").removeClass("current"),$(".js-tabs-select").val(t).trigger("change"),$(this).addClass("current"),$("#"+t).addClass("current"),$(".js-accomodation").slick("refresh")}),$(".js-main-form-btn").on("click",function(){var t=$(this).parents("form"),e=!0;if(t.find(":input.required").each(function(t){this.value.length?$(this).removeClass("js-is-invalid"):(e=!1,$(this).addClass("js-is-invalid"))}),e){var a,s="";$("body").hasClass("ja_JP")?(t.serializeArray().forEach(function(t){s+="&"+t.name+"="+t.value}),a="https://mystays.rwiths.net/r-withs/tfs0020a.do?"+s):(s="s=results",t.serializeArray().forEach(function(t){if("arrival"==t.name||"departure"==t.name){var e=new Date(t.value);t.value=e.getFullYear()+"-"+(e.getMonth()+1)+"-"+e.getDate()}s+="&"+t.name+"="+t.value}),a="https://www.book-secure.com/index.php?"+s),window.open(a,"_blank").focus()}}),$(document).ready(init);