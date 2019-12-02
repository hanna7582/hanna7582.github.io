$(function(){
   $(window).scroll(function () { 
      var scrollTop=$(window).scrollTop();
      var cultureLab=$('.main-culture').offset().top-500;
      var coffeeLab=$('.main-coffee-lab').offset().top-500;
      console.log(scrollTop, cultureLab );      
      if(scrollTop>0){
         $('body').addClass('scroll');         
      }else{
         $('body').removeClass('scroll');  
      }
      
      var delay=0;
      
      if(scrollTop > cultureLab){
         $('.main-culture .fadeInUp').each(function(i){
            if(i==0){delay=0;}
            if(i==1){delay=500;}
            if(i==2){delay=1000;}
            setTimeout(()=>$(this).addClass('on'),delay);
         });
      }else{
         $('.main-culture .fadeInUp').removeClass('on');
      }
      if(scrollTop > coffeeLab){
         $('.main-coffee-lab .fadeInUp').each(function(i){
            if(i==0){delay=0;}
            if(i==1){delay=1000;}
            setTimeout(()=>$(this).addClass('on'),delay);
         });
      }else{
         $('.main-coffee-lab .fadeInUp').removeClass('on');
      }
   }).scroll();

   $(window).resize(function () { 
      var windowWidth=$(window).width();
      $('.gnb i').off('click');
      $('.gnb > li').removeClass('active'); 
      if(windowWidth<1100){
         $('.gnb .sub').hide(); 
         $('.gnb i').click(function (e) { 
            e.preventDefault();                                                       
            if($(this).parents('li').hasClass('active')){
               $(this).parents('li').removeClass('active');
               $(this).parents('li').find('.sub').slideUp();
            }else{
               $('.gnb > li').removeClass('active'); 
               $('.gnb .sub').slideUp();    
               $(this).parents('li').addClass('active');
               $(this).parents('li').find('.sub').slideDown();
            }
         });
      }else{         
         $('.gnb .sub').show(); 
      }
   }).resize();


   $('.language>a').click(function (e) { 
      e.preventDefault();
      $(this).next().slideToggle();
   });

   $('.language ul a').click(function (e) { 
      e.preventDefault();
      var value=$(this).text();
      $('.language>a').text(value);
      $(this).parents('ul').slideUp();
   });

   $('#btn-menu').click(function (e) { 
      e.preventDefault();
      $('body').toggleClass('open');
      if($(this).find('i').text()=='menu'){
         $(this).find('i').text('close');
      }else{
         $(this).find('i').text('menu');
      }
   });

   $('.quick-event button').click(function (e) { 
      e.preventDefault();
      $('.quick-event').hide();
   });

   //main-slide
   var swiper = new Swiper('.swiper-container', {
      loop:true,
      pagination: {
         el: '.pagination',
         clickable:true,
      },
      navigation: {
         nextEl: '.next',
         prevEl: '.prev',
      },
    });
})