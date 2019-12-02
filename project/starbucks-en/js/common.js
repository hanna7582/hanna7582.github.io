$(function(){
   // 메뉴 팝업
   $('.gnb button').click(function(){
      $(this).toggleClass('sp-menu sp-close');
      $('.gnb .gnb-popup').toggleClass('open');
   })


   // 메인 슬라이드
   var mainOption={
      navigation: {
         nextEl: '.sp-next',
         prevEl: '.sp-prev',
      },
      pagination: {
         el: '.swiper-pagination',
         type: 'progressbar',
      },
      effect:'fade',
      loop:true,
      simulateTouch:true,
      on:{
         'slideChange':function(){
            var index=mainSlide.realIndex+1;//현재 슬라이드 인덱스+1 페이지번호
            console.log('slideChange',index);            
            $('.pagination .page').text('0'+index);      
            $('.slide img').attr('src',slideImgs[index-1]);//현재페이지에 해당하는 배열의 인덱스
         },
         // 'slidePrevTransitionStart':function(){
         //    slidePrev();
         // },
         // 'slideNextTransitionStart':function(){
         //    slideNext();
         // }
      }
   }
   
   var mainSlide = new Swiper('.slide .swiper-container', mainOption);
   var slideImgs=['img/slide-coffee1.png', 'img/slide-coffee2.png', 'img/slide-coffee3.png'];
   var slideTexts=['Meet our new<br> Summer Caramel Frappuccino',
               '50% discount<br> Coffee Frappuccino',
               'Delicious<br> Java Chip Frappuccino'
               ];
 
   function slidePrev(){
      var index=mainSlide.realIndex+1;
      console.log(mainSlide);
      
      var prevIndex=index-1;//이전 슬라이드 번호
      if(prevIndex<1){//최소값보다 작아지면 최대값으로
         prevIndex=3;
      }
      $('.info .page').text('0'+(prevIndex));
      $('.info b').html(slideTexts[prevIndex-1]);//배열의 인덱스
   }

   function slideNext(){
      var index=mainSlide.realIndex+1;
      console.log(mainSlide);
      var nextIndex=index+1;//다음 슬라이드 번호
      if(index>2){//최대값보다 작아지면 최소값으로
         nextIndex=1
      }      
      $('.info .page').text('0'+(nextIndex));
      $('.info b').html(slideTexts[nextIndex-1]);//배열의 인덱스     
   }   

   $('.arrow button').on({
      mouseenter:function(){
         if($(this).hasClass('sp-prev')){
            $('.direction').text('Prev Slide');
            slidePrev();
         }else{
            $('.direction').text('Next Slide');
            slideNext();
         }
      }
   })

   // 매장선택
   $('.store-list').on('click','a',function(e){
      e.preventDefault();
   })

   // 주문 
   var offerOption={
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop:true,
      centeredSlides: true,
      simulateTouch:true,      
   }
   var offerSlide = new Swiper('.offers .swiper-container', offerOption);

   $(window).resize(function () { 
      var windowW=$(this).width(); 
      if(mainSlide!=undefined){
         mainSlide.destroy();         
         offerSlide.destroy();
      }
      if(windowW<768){
         mainOption.simulateTouch=true;                  
         offerSlide = new Swiper('.offers .swiper-container', offerOption);
      }else{
         mainOption.simulateTouch=false;
      }
      mainSlide = new Swiper('.slide .swiper-container', mainOption);    
  
      mainSlide.on('slidePrevTransitionStart',function(){
         slidePrev();
      });
      mainSlide.on('slideNextTransitionStart',function(){
         slideNext();
      });
   }).resize();
})

