/*
 * jQuery plugin - 2016
 * Created by Oltean Ioan for his interactive resume
 */
(function ($) {
 $(document).ready(function () {
  //initiate tooltip


  //prepare scene

  $('<div id="bunny"></div>').appendTo('.panorama-container');
  $('<div id="intro"></div>').appendTo('.panorama-viewport');
  $('<div id="astral"></div>').appendTo('.panorama-viewport');
  $('<div id="adn"></div>').appendTo('.panorama-viewport');
  $('<div id="diana"></div>').appendTo('.panorama-viewport');
  $('<div id="final"></div>').appendTo('.panorama-viewport');

  $('#bunny')
  .sprite({
   fps : 4,
   no_of_frames : 6
  })
  .spState(3);

  //store bunny corect positions
  var scene,
  imgH;
  //find controls
  var map = $('.panorama-container').parent(),
  viewport = $('.panorama-container'),
  areamap = map.find('.area'),
  controls = $('.panorama-control'),
  goRight = controls.find('a.panorama-control-right');
  //welcome msg
  var intro = function () {
  scene=0;
   var intro_msg = "Hello ,are you ready to start?<br>Just click on the right side carrot to go on...";
   setDialog(intro_msg, 4000, 10000);

   scene_1();
  };
  //build scene
  //scene 1- intro
  scene_1 = function () {

   goRight.one('click', function () {
   scene=1;

    $('.chapter1').removeClass('area').addClass('next');
    var go = "Let's go<br>...Follow me!";
    var msg = "Here we are...first step!<br>Just click UP there!";

    setDialog(go, 500, 3000);
    switchBunny(1, 100, 3, 4000);

    $('#bunny').animate({
     top :  + (posTop(0) + imgH / 2) + 'px',
     left : +posLeft(0) + 'px'
    }, 4000);
    setDialog(msg, 7000, 10000);
    setTimeout(function () {
     $('.chapter1').click(function () {
      var id = $('#intro');
      pan(id, 2000);
      $('.stage').click(function () {
       scene_2();
       $('.chapter2').removeClass('area').addClass('next');
       $('.chapter1').removeClass('next').addClass('area');
      });
     });

    }, 6000);

   });
  };
  //scene 2

  var scene_2 = function () {

   goRight.one('click', function () {
      scene=2;

    var msg2 = "Here we are...pretty far mmm?<br>Just click UP there!";

    switchBunny(1, 100, 3, 5000);
    $('#bunny').animate({
     top :  + (posTop(1) + imgH / 5) + 'px',
     left : +posLeft(1) + 'px'
    }, 4000, 'linear', function () {
     $(this).after(setDialog(msg2, 2000, 5000));
    });

    setTimeout(function () {
     $('.chapter2').click(function () {
      var id = $('#astral');
      pan(id, 2000);
      $('.stage').click(function () {
       scene_3();
       $('.chapter2').removeClass('next').addClass('area');
       $('.chapter3').removeClass('area').addClass('next');

      });
     });

    }, 6000);

   });
  };

  //scene 3
  var scene_3 = function () {

   goRight.one('click', function () {
   scene=3;

    var msg3 = "Here we are...not so far,mmm?<br>Just click UP there!";

    switchBunny(1, 100, 3, 5000);

    $('#bunny').animate({
     top :  + (posTop(2) + imgH / 6) + 'px',
     left : +posLeft(2) + 'px'
    }, 4000, 'linear', function () {
     $(this).after(setDialog(msg3, 2000, 5000));
    });

    setTimeout(function () {
     $('.chapter3').click(function () {
      var id = $('#adn');
      pan(id, 2000);
      $('.stage').click(function () {
       scene_4();
       $('.chapter3').removeClass('next').addClass('area');
       $('.chapter4').removeClass('area').addClass('next');

      });
     });

    }, 6000);

   });
  };
  //scene 4
  var scene_4 = function () {
   scene=4;

   goRight.one('click', function () {

    var msg4 = "Here we are...UFF I'm sweat!<br>Just click UP there!";

    setDialog(msg4, 7000, 9000);
    switchBunny(1, 100, 3, 5000);
    $('#bunny').animate({
     top :  + (posTop(3) + imgH / 9) + 'px',
     left : +posLeft(3) + 'px'
    }, 5000, 'linear', function () {
     $(this).after(setDialog(msg4, 2000, 5000));
    });

    setTimeout(function () {
     $('.chapter4').click(function () {
      var id = $('#diana');
      pan(id, 2000);
      $('.stage').click(function () {
       $('.chapter4').removeClass('next').addClass('area');
       setTimeout(function () {
        var see = $('#final');
        pan(see, 2000);
        see.one('click', function () {
         $('.finish').removeClass('area').addClass('next');
         scene_5();
        });
       }, 1000);
      });
     });

    }, 8000);

   });
  };

  //final

  var scene_5 = function () {

   goRight.one('click', function () {
   scene=5;

    var msg5 = "That's all folks...<br>You can do whatever you want with this code!</b>"; 
   setDialog(msg5, 4000, 10000);
    switchBunny(1, 100, 3, 5000);
   $('#bunny').animate({
     top :  + (posTop(4) + imgH / 2) + 'px',
     left : +posLeft(4) + 'px'
    }, 4000);
   setTimeout(function () {
	scene_6();
   }, 10000);
   });
  };
//scene 6
  var scene_6 = function () {
   scene=6;
 var msg6 = "Let your imagination free...<br>Until then, let's start over!</b>"; 
   setTimeout(function () {
   setDialog(msg6, 200,10000);
   }, 2000 );
   $('.finish').click(function () {
        $('.finish').removeClass('next').addClass('area');  
    switchBunny(2, 200, 3, 5000);
   $('#bunny').animate({
     top :  + (posTop(0) + imgH / 2) + 'px',
     left : +posLeft(0) + 'px'
    },5000, 'linear', function () {
  $(this).after(window.location.reload(true));   
    });
  
      });
 }  
  //functions

  //initiate bunny positions


  function bunnyPos(bunny, pos) {
   bunny.each(function () {
    var top = $(this).css("top"),
    left = $(this).css("left"),
    stitch = $(this).data("stitch");
    if (stitch == 1)
     pos.push(top + ':' + left);
   });
  };

  //set dialogs function
  function setDialog(content, show, hide) {
   var m = $('#bunny').tooltipster({
     content : '',
     multiple : true,
     contentAsHTML : true,
     animation : 'grow',
     trigger : 'custom'
    });
   var d = m[0];
   if (show)
    start = setTimeout(function () {
      d.content('' + content + '');
      d.show();
     }, +show);
   if (hide)
    stop = setTimeout(function () {
      d.hide();
     }, +hide);
  };
  function pan(id, s) {
   var move_on = "All right, click to move on...";
   id.addClass("stage");
   id.pan({
    fps : 20,
    speed : 2,
    dir : 'right',
    depth : 20
   });
var xW=$(window).width();
if(xW<350)
  id.pan({
    fps : 20,
    speed : 1,
    dir : 'down',
    depth : 20
   });
   setTimeout(function () {
    id.spStop();
   }, +s);
   id.click(function () {
    id.removeClass("stage");
    setDialog(move_on, 100, 4000);
   });
  };
  //automate state switch of my bunny

  function switchBunny(state_a, startA, state_b, startB) {
   var b = $('#bunny');

   stateA = setTimeout(function () {
     b.spState(+state_a);
    }, +startA);

   stateB = setTimeout(function () {
     b.spState(+state_b);
    }, +startB);
  };

  function posTop(x) {
   var topPos = [];
   bunnyPos(areamap, topPos);
   var area = topPos[+x].split(':'),
   top = parseInt((area[0]), 10);
  return top;
  };
  function posLeft(y) {
   var leftPos = [];
   bunnyPos(areamap, leftPos);
   var area = leftPos[+y].split(':'),
   left = parseInt((area[1]), 10);
   return left;
  };

  setTimeout(function () {
   imgH = $(window).height();
   $('#bunny').css('top', +parseInt(imgH - 100) + 'px');

   intro();
   return imgH;

  }, 3000);

  $(window).resize(function (event) {
  setTimeout(function () {
 imgH = $(window).height();
  $('#bunny').css('top', +parseInt(imgH - 100) + 'px');
if(scene==1)
    $('#bunny').animate({
     top :  + (posTop(0) + imgH / 2) + 'px',
     left : +posLeft(0) + 'px'
    }, 1000, 'linear');
if(scene==2)
    $('#bunny').animate({
     top :  + (posTop(1) + imgH / 5) + 'px',
     left : +posLeft(1) + 'px'
    }, 1000, 'linear');
if(scene==3)
    $('#bunny').animate({
     top :  + (posTop(2) + imgH / 6) + 'px',
     left : +posLeft(2) + 'px'
    }, 1000, 'linear');
if(scene==4)
    $('#bunny').animate({
     top :  + (posTop(3) + imgH / 9) + 'px',
     left : +posLeft(3) + 'px'
    }, 1000, 'linear');
if(scene==5)
    $('#bunny').animate({
     top :  + (posTop(4) + imgH / 2) + 'px',
     left : +posLeft(4) + 'px'
    }, 1000, 'linear');

},500); 
  }).trigger('resize');

 });
})(jQuery);
