/* --------------------------------------------------------------------------
 *  
 * file        : theme-script.js
 * Version     : 1.0
 * Author      : indonez - team
 * Author URI  : http://indonez.com
 *
 * Indonez Copyright 2015 All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * JQuery plugin configuration
      1. jQuery Responsive Pie Chart
      2. jQuery Progress Bar
      3. jQuery Counter
 
 * JQuery Handle Initialization
      1. animate scrolling
      2. fancybox
      3. isotope
      4. mediaelement
      5. parallax
      6. scroll Up
      7. header
      8. chart and progress bar
      9. twitter feed
      10. retina
      11. carousel
         - testimonial carousel - services.html
         - client carousel - testimonials.html
         - twitter carousel - index-version3.html
         - app mobile carousel - index-version6.html
         - portfolio single - portfolio-single.html
         - blog carousel - blog.html
      12. theme responsive
 * 
 * -------------------------------------------------------------------------- */

(function($) {
/* --------------------------------------------------------------------------
 * jQuery Responsive Pie Chart
 * -------------------------------------------------------------------------- */
   "use strict";
   
   // jQuery easypiechart constructor
   var defaultset = {
      barColor    : '#95a5a6',
      trackColor  : '#f1f1f1',
      scaleColor  : false,
      lineCap     : 'round',
      lineWidth   : 15,
      size        : 100,
      animation   : 5000,
      font        : 18,
      fontColor   : "inherit",
      bgColor     : false
   };

   $.fn.responsivePieChart = function (options) {

      return this.each(function() {

         var chartConfig = $.extend({}, defaultset, options),
         sizeElement = getSize(chartConfig.size, $(this), chartConfig.mode); 

         $(this).css({
            'height'       : sizeElement,
            'width'        : sizeElement,
            'position'     : 'relative',
            'display'      : 'inline-block',
            'margin'       : 'auto 0',
            'text-align'   : 'center'
         });

         $(this).append("<div class='percent' style='position:absolute;top:0;left:0;line-height:"+sizeElement+"px;text-align:center;width:"+sizeElement+"px;color:"+chartConfig.fontColor+";font-size:"+chartConfig.font+"px;font-weight:300;'></div>");
         if (chartConfig.bgColor) {
            sizeElement = sizeElement - chartConfig.lineWidth;
            $(this).css({'padding': chartConfig.lineWidth / 2 });
         }

         $(this).easyPieChart({
            barColor    : chartConfig.barColor,
            trackColor  : chartConfig.trackColor,
            scaleColor  : chartConfig.scaleColor,
            lineCap     : chartConfig.lineCap,
            lineWidth   : chartConfig.lineWidth,
            size        : sizeElement,
            animation   : chartConfig.animation,
            onStep: function(from, to, percent) {
               $(this.el).find('.percent').text(Math.round(percent)+'%');
            }
         });
      });  
   };
   
   function getSize(chartSize, self) {
      var defaultSize = 100,
      sizeElement;
      if (chartSize == defaultSize) {
         sizeElement = self.parent().width();
      } else {
         sizeElement = chartSize;
      }

      return sizeElement;
   }

})(jQuery) + (function($){
/* --------------------------------------------------------------------------
 * jQuery Progress Bar
 * -------------------------------------------------------------------------- */
   "use strict";

   // jQuery progress bar
   $.fn.responsiveProgressBar = function () {
      return this.each(function() {
         var bar = $(this);
         var percentage = $(this).attr('data-percent');

         progress(percentage, bar);
      });
   };

   function progress(percent, element) {
      var progressBarWidth = percent * element.width() / 100;
      element.find('.progress-content').append("<div class='progress-meter'></div>").animate({ 
         width: progressBarWidth,
         number: percent
      }, {
         duration: 4000,
         step: function(number) { // called on every step
            // Update the element's value:
            element.find('.progress-meter').text(Math.round(number)+'%');
         } 
      });
   }

})(jQuery) + (function($){
/* --------------------------------------------------------------------------
 * jQuery Counter
 * -------------------------------------------------------------------------- */ 
   "use strict";

   if ($.fn.countTo) {
      if (!Modernizr.touch) {

         // run with trigger
         var waypoint = new Waypoint({
            element: document.getElementsByClassName('count-me'),
            handler: function() {
               $('.count-me').each(function() {
                  $(this).data('countToOptions', {
                     formatter: function (value, options) {
                        return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
                     }
                  });

                  // start all the timers
                  $('.timer').each(count);

                  function count(options) {
                     var $this = $(this);
                     options = $.extend({}, options || {}, $this.data('countToOptions') || {});
                     $this.countTo(options);
                  }
               });

               this.destroy();
            },
            offset: '90%'
         });
      }  
   }

})(jQuery);

/* --------------------------------------------------------------------------
 * jQuery Handle Initialization
 * -------------------------------------------------------------------------- */
var Foundstrap = function ($) {

   // get window screen 
   var widthScreen = $(window).width(),
       mobileScreen = (widthScreen < 767);
   
   /* --------------------------------------------------------------------------
    * animate scrolling
    * -------------------------------------------------------------------------- */
   var theme_animate = function() {
      if (Modernizr.touch || mobileScreen) {
         $('.me-animate').css('opacity', '1');
      } else {
         foundstrapAnimate($('.me-animate'));
      }
      
      function foundstrapAnimate( items, trigger ) {
         items.each( function() {
            var animateElement = $(this),
            animateItem  = animateElement.attr('data-animate'),
            animateDelay = animateElement.attr('data-animate-delay');

            if( animateDelay > 0 ) {
               var delayTime = (animateDelay / 1000) + 's';

               animateElement.css({
                  'visibility'              : 'visible',
                  '-webkit-animation-delay' : delayTime,
                  '-moz-animation-delay'    : delayTime,   
                  '-o-animation-delay'      : delayTime,     
                  'animation-delay'         : delayTime
               });
            }

            var animateTrigger = ( trigger ) ? trigger : animateElement;

            var waypoints = animateTrigger.waypoint({               
               handler: function() {
                  animateElement.css('opacity', '1');
                  animateElement.addClass('animated ' + animateItem);

                  this.destroy();
               },
               offset: '80%'
            });
         });
      }
   };

   /* --------------------------------------------------------------------------
    * fancybox
    * -------------------------------------------------------------------------- */
   var theme_fancybox = function() {
      if ($.fn.fancybox) {
         $(".fancybox").fancybox({
            padding:0,
            openEffect:'elastic',
            openSpeed:250,
            closeEffect:'elastic',
            closeSpeed:250,
            closeClick:false,
            helpers:{
               title: { type:'outside'},
               media:{}
            }
         });

         $('.fancybox-media').attr('rel', 'media-gallery').fancybox({
            openEffect : 'none',
            closeEffect : 'none',
            prevEffect : 'none',
            nextEffect : 'none',
            padding : 0,

            arrows : false,
            helpers : {
               media : {},
               buttons : {}
            }
         });
      }
   };

   /* --------------------------------------------------------------------------
    * isotope
    * -------------------------------------------------------------------------- */
   var theme_isotope = function() {
      if ($.fn.isotope) {
         $(window).load(function () {
            var l = $(".portfolio-container");
            l.isotope({
               filter: "*",
               animationOptions: {
                  duration: 750,
                  easing: "linear",
                  queue: false
               }
            });

            $(".portfolio-filter a").click(function () {
               var n = $(this).attr("data-filter");
               l.isotope({
                  filter: n,
                  animationOptions: {
                     duration: 750,
                     easing: "linear",
                     queue: false
                  }
               });
               return false;
            });

            var k = $(".portfolio-filter"),
            m = k.find("a");
            m.click(function () {
               var o = $(this);
               if (o.hasClass("selected")) {
                  return false;
               }

               var n = o.parents(".portfolio-filter");
               n.find(".selected").removeClass("selected");
               o.addClass("selected");
            });
         });
      }
   };

   /* --------------------------------------------------------------------------
    * mediaelement
    * -------------------------------------------------------------------------- */
   var theme_mediaelement = function() {
      $("audio, video").each(function() {
         $(this).mediaelementplayer({
            success: function(media, player) {
               player.addEventListener("playing", function() {
               }, false);
            }
         });
      });   

      $(".me-video iframe").each(function() {
         $(this).attr('allowFullScreen','').attr('mozallowfullscreen','').attr('webkitAllowFullScreen','');
      });
   };

   /* --------------------------------------------------------------------------
    * parallax
    * -------------------------------------------------------------------------- */
   var theme_parallax = function () {
      if (!Modernizr.touch) {         
         $(".parallax1").parallax("50%", 0.15);
         $(".parallax3, .parallax2").parallax("30%", 0.15);
      }
   };

   /* --------------------------------------------------------------------------
    * scroll up
    * -------------------------------------------------------------------------- */
   var theme_scrollUp = function() {
      $.scrollUp({
         scrollText: '<i class="fa fa-chevron-up"></i>',
         scrollSpeed: 1250
      });
   };

   /* --------------------------------------------------------------------------
    * header
    * -------------------------------------------------------------------------- */
   var theme_header = function() {
      var clickTarget = $(".form-search-trigger"),
          clickObject = $(".form-search");
      
      $('html').click(function() {
         if ($("#me-header").hasClass("header-version2") || $("#me-header").hasClass("header-version3")){
            if(mobileScreen) {
               clickObject.slideUp("slow");
            } else {
               clickObject.fadeOut("slow");
            }
         }
         
         clickTarget.removeClass("active");
      });

      clickObject.click(function(e){
         e.stopPropagation();
      });

      clickTarget.click(function(e){
         e.stopPropagation();

         if($(this).hasClass("active")) {
            $(this).removeClass("active");
            if(mobileScreen) {
               clickObject.slideUp("slow");
            } else {
               clickObject.fadeOut("slow");
            }
         } else {
            $(this).addClass("active");
            if(mobileScreen) {
               clickObject.slideDown("slow");
            } else {
               clickObject.fadeIn("slow");
            }
         }
      });
   };

   /* --------------------------------------------------------------------------
    * chart and progress bar
    * -------------------------------------------------------------------------- */
   var theme_chart = function() { 
      if ($.fn.easyPieChart) {
         $(".chart").responsivePieChart({
            barColor    : '#169fe6'
         });

         $(".chart-green").responsivePieChart({ 
            barColor    : '#87B822'
         });

         $(".chart-blue").responsivePieChart({ 
            barColor    : '#169fe6'
         });

         $(".chart-yellow").responsivePieChart({ 
            barColor    : '#F0C42C'
         });

         $(".chart-red").responsivePieChart({ 
            barColor : '#E75B4C'
         });

         $(".chart-gray").responsivePieChart({ 
            barColor    : '#7f8c8d'
         });

         $('.progress-bar').responsiveProgressBar();
      }
   };

   /* --------------------------------------------------------------------------
    * twitter feed
    * -------------------------------------------------------------------------- */
   var theme_twitter = function() {
      if ($.fn.tweet) {
         $("#twitter-feed").tweet({
            username: "envato",
            join_text: "auto",
            modpath: 'js/twitter/',
            count: 2,
            loading_text: "Loading tweets...",
            template: "<div class='twitter-text'><p>{text}</p></div>"
         });
      }  
   };

   /* --------------------------------------------------------------------------
    * retina 
    * -------------------------------------------------------------------------- */
   var theme_retina = function() {
      if ($.fn.retina) {
         $('img.retina').retina("@2x");
      }
   };

   /* --------------------------------------------------------------------------
    * carousel
    * -------------------------------------------------------------------------- */
   var theme_carousel = function () {
      // ----------- testimonial carousel - index.html
      var testimonialCarousel = $(".testimonial-carousel");
         
      $(".testimonial-carousel-nav .left-nav").click(function(){
         testimonialCarousel.trigger('owl.next');
      });

      $(".testimonial-carousel-nav .right-nav").click(function(){
         testimonialCarousel.trigger('owl.prev');
      });

      testimonialCarousel.owlCarousel({
         autoPlay : 6000,
         navigation : false, 
         slideSpeed : 300,
         paginationSpeed : 400,
         singleItem: true,
         pagination: false
      });

      // ----------- client carousel - testimonials.html
      $(".client-carousel").owlCarousel({
         itemsCustom: [[0,1],[400,2],[700,4],[1000,5],[1200,5],[1600,5]],
         autoPlay : 6000,
         navigation : false, 
         slideSpeed : 300,
         paginationSpeed : 400,
         pagination: false
      });

      // ----------- blog carousel - blog.html
      var blogCarousel = $(".blog-carousel");
      
      $(".blog-carousel-nav .left-nav").click(function(){
         blogCarousel.trigger('owl.next');
      });

      $(".blog-carousel-nav .right-nav").click(function(){
         blogCarousel.trigger('owl.prev');
      });

      blogCarousel.owlCarousel({
         autoPlay : 6000,
         navigation : false, 
         slideSpeed : 300,
         paginationSpeed : 400,
         singleItem: true,
         pagination: false
      });

      // ----------- portfolio single - portfolio-single.html
      $(".portfolio-single-carousel").owlCarousel({
         autoPlay : 6000,
         navigation : false, 
         slideSpeed : 300,
         paginationSpeed : 400,
         singleItem: true,
         pagination: false
      });
   };

   /* --------------------------------------------------------------------------
    * theme responsive
    * -------------------------------------------------------------------------- */
   var theme_responsive = function() {
      if(widthScreen < 865) {
         if (!$("#me-header").hasClass("header-version2") && !$("#me-header").hasClass("header-version3")){
            
            $(".menu-container").after('<div class="search-trigger"><i class="fa fa-search"></i></div>');
            $(".form-search").hide();

            $(".search-trigger").click(function(e){
               e.stopPropagation();

               if($(this).hasClass("active")) {
                  $(this).removeClass("active");
                  $(".form-search").slideUp("slow");
               } else {
                  $(this).addClass("active");
                  $(".form-search").css({
                     "width" : "100%",
                     "padding-bottom" : "16px"
                  }).slideDown("slow");

                  $(".form-search").find(".input-group-placeholder").css("display","block");
               }
            });
         }
      }

      if(mobileScreen) {

         // disable box for mobile device
         $("#main-container").removeClass("box");

         if (!$("#me-header").hasClass("header-version2") && !$("#me-header").hasClass("header-version3")){
            $(".header-info-left").prepend('<div class="menu-trigger"><i class="fa fa-bars"></i></div>');         
            $(".search-trigger").insertAfter(".header-info-right");
         } else {
            $(".logo-container").before('<div class="menu-trigger"><i class="fa fa-bars"></i></div>'); 
            $(".form-search-trigger").insertAfter(".logo-container").addClass("search-trigger");
            $(".form-search").insertAfter(".menu-container");
         }

         // responsive menu
         $(".menu-trigger").click(function(e){
            e.preventDefault();
            if($(this).hasClass("active")) {
               // when menu close
               $(this).removeClass("active");
               $(".menu-container").slideUp("slow");
            } else {
               // when menu open
               $(this).addClass("active");
               $(".menu-container").slideDown("slow");
            }
         });
      }
   };

   return {

      // main function
      theme: function () {
         theme_responsive();
         theme_carousel();
         theme_parallax();
         theme_scrollUp();
         theme_header();
         theme_chart();
         theme_isotope();
         theme_fancybox();
         theme_mediaelement();
         theme_twitter();
         theme_retina();
         theme_animate();
      }
   };
}(jQuery);