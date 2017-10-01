<<<<<<< Updated upstream
$(".accommodation_slider").slick({lazyLoad:"ondemand",slidesToShow:3,speed:2e3,slidesToScroll:3,dots:!0,infinite:!1,responsive:[{breakpoint:900,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}}]}),$(".slick-arrow").appendTo(".slick-dots"),$(".slick-arrow").addClass("icon arrow"),$(".header_cta-dropdown").on("click",function(){$(".header_language").toggleClass("active")});
=======
$(window).ready(function(){window.data.main.map(function(o){$("[data-sheet="+o.Item+"]").text(o.jp)}),$(".js-accomodation").slick({lazyLoad:"ondemand",slidesToShow:3,speed:2e3,slidesToScroll:4,dots:!0,responsive:[{breakpoint:900,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}}]}),$(".slick-arrow").appendTo(".slick-dots"),$(".header_cta-dropdown").on("click",function(){$(".header_language").toggleClass("active")})});
>>>>>>> Stashed changes
