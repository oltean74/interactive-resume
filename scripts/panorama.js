/*
 * panorama - jQuery plugin
 * Created by Oltean Ioan (http://panorama.meximas.com/)
 */
(function($) {

   //default options for panorama image

   $.fn.panorama=function(options){
      this.each(function(){
         var settings={
              viewport_width: $(window).width(),
              speed: 25000, 
              direction: 'left',
              control_display: 'yes',
              image_width: 1250,
              image_height: 391,
              start_position: 15,
              auto_start: true,
              mode_360: false,
           timer: 3000
                            };
      if(options) $.extend(settings,options);

   // check if page have meta viewport 
         var viewport=document.querySelector('meta [name=viewport]'),
              viewportContent='width=device-width, initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'; 
   // otherwise it is set up automaticaly
      if(viewport===null){
         var head=document.getElementsByTagName('head')[0];         viewport=document.createElement('meta');   viewport.setAttribute('name', 'viewport');  head.appendChild(viewport); 
                             }
viewport.setAttribute('content',viewportContent);
    
   //store in variable the dimensions of image
         var ew=parseInt($(this).attr('width')),
              eh=parseInt($(this).attr('height')),
              cE=this,
              pV,
              pC, 
              bMm=false,
              mMs=0,
              mMms=0,
              body=null,
              fullscreen = 0;

   //construct the container that keep the image

   $(this).attr('unselectable','on') .css('position', 'relative') .css('-moz-user-select','none') .css('-webkit-user-select','none') .css('margin', '0') .css('padding', '0') .css('border', 'none') .wrap("<div class='panorama-container'></div>");

       if (settings.mode_360) $(this).clone().insertAfter(this);

   // now container need a viewport to show the image
            pC = $(this).parent();
            pC.css('height', eh+'px').css('overflow', 'hidden').wrap("<div class='panorama-viewport'></div>").parent().css('width',settings.viewport_width+'px')

   // and, of course, controls: 

           .append("<div class='panorama-control'><a href='#' class='panorama-control-right'><img src='./icons/right.png'/></a></div>");


   // start the construction of panorama image 

            pV = pC.parent();
            pI=pC.find('img'); 
            mlk=pI.attr('usemap');


   // set up fullscreen control

   
   $(window).load(function(){
fullMode();
                    
                  });

   // get the dimensions of image

      if(!(0>=settings.image_width&&0>=settings.image_height)||(settings.image_width=parseInt(ew),settings.image_height=parseInt(eh),settings.image_width&&settings.image_height));

   //create coords of map and set up position  

         var areamap,
              upscale=settings.image_height/settings.image_width,
              heightImg=parseInt($(this).height()),
              newscale=parseInt(heightImg/upscale),
              mlk=pI.attr("usemap");
      mlk&&(0>mlk.indexOf("#")&&(mlk="#"+mlk),   new_area=$("a").addClass("area"),   

   $("map").find("area").each(function(){
      switch($(this).attr("shape").toLowerCase()){
         case"rect":
             var areacoords=$(this).attr("coords").split(","), 
         newmap=$(document.createElement("a")).addClass("area").attr("href",$(this).attr("href")).attr("title",$(this).attr("alt"));         newmap.addClass($(this).attr("class")),pC.append(newmap.data("stitch",1).data("coords",areacoords)),
pC.append(newmap.clone().data("stitch",2).data("coords",areacoords))}}),
$("map"+mlk,pC).remove(),areamap=pC.find(".area"),areamap.mouseup(updatepos).mousemove(updatepos).mousedown(updatepos),updatecoord(areamap,settings.image_height,heightImg,newscale));
 
   //functions on mouse move 
         pV.mousedown(function(e){
               if (!bMm) {bMm = true; mMs = e.clientX;}return false;}).mouseup(function(){ bMm = false;mMs = 0;return false;}).mousemove(function(e){
               if (bMm){var delta = parseInt((mMs - e.clientX)/30);
              if ((delta>10) || (delta<10)) {
                  var newMarginLeft = parseInt(pC.css('marginLeft')) + (delta);
                     if (settings.mode_360) {
                        if (newMarginLeft > 0) {
                           newMarginLeft = -ew;
                                                     }
                        if (newMarginLeft < -ew) {
                           newMarginLeft = 0;
                                                       }}
                    else {
                        if (newMarginLeft > 0) {
                           newMarginLeft = 0;
                                                    }
                        if (newMarginLeft < -ew) {
                           newMarginLeft = -ew;
                                                       }}
                  pC.css('marginLeft', newMarginLeft+'px');
   }
      }
          }).bind('contextmenu',function(){return false;
             });

   //set up controls reactions 
         pV.css('height', eh+'px').css('overflow', 'hidden').bind('click', function() {
             $(pC).stop();
            });    
        pV.find('a.panorama-control-right').bind('click', function() {
            $(pC).stop();
            settings.direction = 'left';
            panorama_animate(pC, ew, settings);if(settings.timer)setTimer();return false;}); 
         

   
   //functions that we need to do all that :

       // resize on screen  orientation change
      resizeViewport = function(){
               var browserwidth = $(window).width(),
                    browserheight = $(window).height(),
               offset;
                     resizeWidth();
           function resizeWidth(minimum){
              pV.css('width', browserwidth + 'px');
              pV.css('height', browserheight + 'px');
                                         };
                                               };

//setTimer
function setTimer(){
var timer=settings.timer;
setTimeout(function(){      
$(pC).stop();
  }, +timer);
  };

fullMode=function(full) {
              if(!pV.hasClass('full')) {
                 fullscreen = 1;
                loadspinner();
                pV.addClass('full');
                resizeViewport();
                resizeContainer(); 
                $parent=$(window),              heightImg=parseInt($parent.height()),
                newscale=parseInt(heightImg/upscale),         mlk&&updatecoord(areamap,settings.image_height,heightImg,newscale);
                $(this).hide();

   //on screen orientation change must keep all toghether  

      $(window).resize(function(event){
               loadspinner();
                 resizeViewport();
                 resizeContainer(); 
                 $parent=$(this),                  
               heightImg=parseInt($parent.height());
                 newscale=parseInt(heightImg/upscale);       
         mlk&&updatecoord(areamap,settings.image_height,heightImg,newscale);
             panorama_animate(pC, ew, settings); 
$(pC).stop();

}).trigger('resize');
   }
      };
  resizeContainer = function(){
              var ratio = (ew/eh).toFixed(2);      
               var browserwidth = $(window).width(),
                    browserheight = $(window).height(),
               offset;
               var newWidth = browserheight*ratio,
 //               ew=newWidth; 
               heightImg=browserheight;  
             updateWidth();
           function updateWidth(minimum){
               var newimage=pC.find('img');
               newimage.width(newWidth);
               newimage.height(browserheight);      
               pC.css('height', browserheight + 'px');
                                          };
                                                };
      restoreContainer = function(){
                var tempWidth=ew;
                var tempHeight=eh;       
                restoreWidth(); 
          function restoreWidth(minimum){
               var origimage=pC.find('img');
               origimage.width(tempWidth);
               origimage.height(tempHeight);      
               pV.css('width', settings.viewport_width + 'px');
               pV.css('height', tempHeight + 'px');
               pC.css('height', tempHeight + 'px');
                                                 };
                                              };
               var overlay = jQuery('<div id="overlay"> </div>') ; 
               var spinn= jQuery('<div id="spinner"> </div>') ; 
                   spinn.appendTo(document.body);
                   overlay.appendTo(document.body);
                   spinn.hide();
                   overlay.hide();
         loadspinner=function(){
                   spinn.show();
                   overlay.show();
            setTimeout(function(){      
                   spinn.hide();
                   overlay.hide();
                    }, 2000);
                                      };

   // how we want to show controls 

          showcontrols=function(){
                 pV.find('.panorama-control').show();
             setTimeout(function(){      
                 pV.find('.panorama-control').hide();
  }, 10000);
                                       };
       if (settings.control_display == 'yes') {
                pV.find('.panorama-control').show();
         } else if (settings.control_display == 'auto') {
                $(this).bind('click', function(){
                showcontrols();
          });
   }

   // the position/mode of starting panorama  
      $(this).parent().css('margin-left', '-'+settings.start_position+'px');
         if (settings.auto_start) 
            panorama_animate(pC, ew, settings);
         
         });

   // update coords position in case of window resize

            function updatepos($){
               return e.preventDefault(),!1
                                        }
            function updatecoord(map,s_height,s_width,img_width){
                   var scale=s_width/s_height;
               map.each(function(){
                    switch(area_coord=$(this).data("coords"),                        stitch=$(this).data("stitch")){
                       case 1:
       $(this).css({
            left:
               area_coord[0]*scale+"px",
            top:
               area_coord[1]*scale+"px",
            width:
               (area_coord[2]-area_coord[0])*scale+"px",         height:
               (area_coord[3]-area_coord[1])*scale+"px"});        break;
                        case 2:
         $(this).css({
             left:          img_width+parseInt(area_coord[0])*scale+"px",
             top:
                area_coord[1]*scale+"px",
             width:
                (area_coord[2]-area_coord[0])*scale+"px",         height:
                (area_coord[3]-area_coord[1])*scale+"px"}
   )}
       })
                     } 

   // and the engine: animate all elements


      function panorama_animate(element, ew, settings) {
      
        currentPosition = 0-parseInt($(element).css('margin-left'));
         
         if (settings.direction == 'right') {
            
            $(element).animate({marginLeft: 0}, ((settings.speed / ew) * (currentPosition)) , 'linear',      function (){ 
               if (settings.mode_360) {
                  $(element).css('marginLeft', '-'+(parseInt(parseInt(ew))+'px'));
                  panorama_animate(element, ew, settings);
               }
            });
                } else {
           var rightlimit;
            if (settings.mode_360) 
               rightlimit = ew;
                  else
               rightlimit = ($(window).height()*3)-$(window).width();
            $(element).animate({marginLeft: -rightlimit}, ((settings.speed / rightlimit) * (rightlimit - currentPosition)), 'linear', function (){ 
               if (settings.mode_360) {
                  $(element).css('margin-left', 0); 
                  panorama_animate(element, ew, settings); }
            });
         }
      }
 



 };
 $(document).ready(function(){
      $("img.panorama").panorama();
});
})(jQuery);