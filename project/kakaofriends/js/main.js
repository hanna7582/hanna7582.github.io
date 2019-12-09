
$(function(){  
  // header
  $(window).scroll(function(){
    var scroll=$(window).scrollTop();
    if(scroll > 0){
      $('header').addClass('on');
    }else{
      $('header').removeClass('on');
    }
  })
  $(window).trigger('scroll');

  //캐릭터별 상품
  var characterSwiper = new Swiper('.character .swiper-container',{
    slidesPerView: 'auto',
    freeMode: true,
  });

  //메인 슬라이드 =================================================================
  var mainSwiper = new Swiper('.main-slide .swiper-container', {
    pagination: {
      el: '.main-slide .swiper-pagination',
      clickable:true
    },
    autoplay: {
      delay: 4000,
    },
    speed:1000,
    loop:true,
    effect:'fade',
    on: {
      slideChange: function () {
        var slideTxt=[
          ['젠틀맨 라이언 테마 컬렉션','더 멋진 모습을 기다렸어'],
          ['포터블팩과 보이스리모트까지','풀패키지로 더욱 새로워 카카오미니C'],
          ['프렌즈랜드 테마 컬렉션','어서 와, 프렌즈 랜드는 처음이지?']
        ];
        for (var i = 0; i < slideTxt.length; i++) {
          if(i==this.realIndex){
            $('.main-slide .text-box h2').text(slideTxt[i][0]);
            $('.main-slide .text-box p').text(slideTxt[i][1]);
          }
        }
      },
      sliderMove:function(){
        $('.main-slide button').attr('class','icon icon-play');
      },
    }
  });
  $('.main-slide button').click(function(){
    if(mainSwiper.autoplay.running){
      mainSwiper.autoplay.stop();
      $('.main-slide button').attr('class','icon icon-play');
    }else{
      mainSwiper.autoplay.start();
      $('.main-slide button').attr('class','icon icon-stop');
    }
  })
  $('.main-slide .swiper-pagination-bullet').click(function(){
    mainSwiper.autoplay.stop();
    $('.main-slide button').attr('class','icon icon-play');
  })

  var mainPc=[];
  var mainMobile=[];
  for (var i = 0; i < $('.main-slide img').length; i++) {
    mainPc[i]=$('.main-slide .swiper-slide').eq(i).find('img').attr('src');
    mainMobile[i]=$('.main-slide .swiper-slide').eq(i).find('img').attr('src').replace('.jpg','_m.jpg');
  }

  // 테마별 =================================================================
  // https://medium.com/@networkaaron/swiper-how-to-destroy-swiper-on-min-width-breakpoints-a947491ddec8
  var breakpoint = window.matchMedia('(min-width:768px)');
  var theme1Swiper = void 0;
  var theme2Swiper = void 0;
  var theme3Swiper = void 0;
  var theme4Swiper = void 0;
  var theme5Swiper = void 0;
  var breakpointChecker = function breakpointChecker() {
    if (breakpoint.matches === true) {
      if (theme1Swiper !== undefined) {
        theme1Swiper.destroy(true, true);
        theme2Swiper.destroy(true, true);
        theme3Swiper.destroy(true, true);
        theme4Swiper.destroy(true, true);
        theme5Swiper.destroy(true, true);
      }
      return;
    } else if (breakpoint.matches === false) {
      return enableSwiper();
    }
  };
  var enableSwiper = function enableSwiper() {
    theme1Swiper = new Swiper('#theme-tab1 .swiper-container',{
      slidesPerView: 'auto',
    });
    theme2Swiper = new Swiper('#theme-tab2 .swiper-container',{
      slidesPerView: 'auto',
    });
    theme3Swiper = new Swiper('#theme-tab3 .swiper-container',{
      slidesPerView: 'auto',
    });
    theme4Swiper = new Swiper('#theme-tab4 .swiper-container',{
      slidesPerView: 'auto',
    });
    theme5Swiper = new Swiper('#theme-tab5 .swiper-container',{
      slidesPerView: 'auto',
    });
    theme1Swiper.update();
    theme2Swiper.update();
    theme3Swiper.update();
    theme4Swiper.update();
    theme5Swiper.update();
  };
  breakpoint.addListener(breakpointChecker);
  breakpointChecker();

  $('.tab-nav a').click(function(e){
    e.preventDefault();
    $(this).parents('.tab-nav').next('.tab-contents').children('div').removeClass('on');
    var id=$(this).attr('href');
    $(this).parents('.tab-nav').find('a').removeClass('on');
    $(this).addClass('on');
    $(id).addClass('on');
  })

  $('.theme .tab-nav a').click(function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop:$('.theme').offset().top-50
    },500)
    if (breakpoint.matches === false) {
      theme1Swiper.activeIndex=0;
      theme2Swiper.activeIndex=0;
      theme3Swiper.activeIndex=0;
      theme4Swiper.activeIndex=0;
      theme5Swiper.activeIndex=0;
      theme1Swiper.update();
      theme2Swiper.update();
      theme3Swiper.update();
      theme4Swiper.update();
      theme5Swiper.update();
    }
    kakaostoryScrollTop=$('.kakaostory').offset().top-20;
  })

  //퀵메뉴 =================================================================
  $('.btn-top').click(function(e){
    $('html').animate({
      scrollTop:0
    },500);
  })

  // 공지사항 =================================================================
  var noticeRolling=0;
  function noticeMove(){
    $('.notice .rolling ul').stop().animate({
      'margin-top':noticeRolling
    },1000,
    function(){
      $('.notice .rolling ul li').eq(0).appendTo($('.notice .rolling ul'));
      $('.notice .rolling ul').css('margin-top',0);
    })
  }
  noticePlay=setInterval(noticeMove,3000);

  $('.notice .rolling ul').on({
    mouseenter:function(){
      clearInterval(noticePlay);
    },
    mouseleave:function(){
      clearInterval(noticePlay);
      noticePlay=setInterval(noticeMove,3000);
    }
  });

  //kakaostory =================================================================
  //https://codepen.io/thecuriousdev/pen/tDdxa
  var kakaostoryScrollTop=0;
  $('.filter-list li').addClass('on');
  $('.filter-list li').slice(0,6).show();
  $('.filter-nav a').click(function(e){
    kakaostoryScrollTop=$('.kakaostory').offset().top-20;      
    e.preventDefault();
    $('html, body').animate({
      scrollTop:kakaostoryScrollTop
    },500)
    var id=$(this).attr('href').replace('#','');
    // console.log(id);
    $('.filter-nav a').removeClass('on');
    $(this).addClass('on');

    $('.filter-list li').removeClass('on');
    setTimeout(function(){
      $('.filter-list li').hide();
      var searchIndex=0;
      $('.filter-list li').each(function(index,el){                    
          if($(this).data('filter')==id){
            searchIndex++;
            if(searchIndex<6){
              $(el).show();
              setTimeout(function(){
                $(el).addClass('on');
              }, 300);
            }
          }
          if(id=='all'){      
            if(index<6){    
              $('.filter-list li').eq(index).show();
              setTimeout(function(){
                $('.filter-list li').addClass('on');
              }, 300);
            }
          }
        
      })
      setTimeout(function(){
        var length=$('.filter-list li.on').length;
        console.log(length);  
        if(length>6){
          $('.kakaostory .icon-more').show();
        }else{
          $('.kakaostory .icon-more').fadeOut();
        }
      }, 300);
    }, 300);
  })

  $('.filter-list button').click(function(e){        
    return false;
  })
            
  $('.kakaostory .icon-more').click(function(){
      if($(this).text()=='접기'){//접기
          $('.filter-list li.on').hide().slice(0,6).show();
          $(this).removeClass('close');
          $(this).find('span').text('더보기');
      }else{//더보기
          $('.filter-list li.on:hidden').slice(0,6).show();
          if($('.filter-list li.on:hidden').length==0){
              $(this).addClass('close');
              $(this).find('span').text('접기');
          }
      }
  }) 
  
  //이벤트 =================================================================
  var eventSwiper = new Swiper('.event .swiper-container', {
    navigation: {
      nextEl: '.event .btn-next',
      prevEl: '.event .btn-prev',
    },
    pagination: {
      el: '.paging',
      type: 'fraction',
    },
    speed:1000,
    loop:true,
    slidesPerView:'auto',
    on: {
      sliderMove:function(){
        $('#event-control').prop('checked',false);
        $('.event .control .msg').text('재생');
      },
    }
  });

  var eventPc=[];
  var eventMobile=[];
  for (var i = 0; i < $('.event img').length; i++) {
    eventPc[i]=$('.event .swiper-slide').eq(i).find('img').attr('src');
    eventMobile[i]=$('.event .swiper-slide').eq(i).find('img').attr('src').replace('.jpg','_m.jpg');
  }

  $('.event .control > button').click(function(e){
    eventSwiper.autoplay.stop();
    $('#event-control').prop('checked',false);
    $('.event .control .msg').text('재생');
  })

  $('#event-control').change(function(){
    if(eventSwiper.autoplay.running){
      eventSwiper.autoplay.stop();
      $('#event-control').prop('checked',false);
      $('.event .control .msg').text('재생');
    }else{
      eventSwiper.autoplay.start();
      $('#event-control').prop('checked',true);
      $('.event .control .msg').text('정지');
    }
  })

  //사이트정보
  $('.etc-wrap > a').click(function(e){
    e.preventDefault();
    $('.etc-wrap ul').slideToggle();
    $(this).toggleClass('active');
  })

  //팝업 =================================================================
  var popupScrollTop=0;
  $('[data-popup]').click(function(e){
    e.preventDefault();
    var name=$(this).data('popup');
    $('.'+name).show();
    $('body').css('overflow','hidden');
    // popupScrollTop = $(window).scrollTop();
  })

  $('.popup .icon-close').click(function(){
    $(this).parent('.popup').hide();
    $('.bg').remove();
    $('body').css('overflow','');
    // $(window).scrollTop(popupScrollTop);
    //메뉴초기화
    $('.select ul, .depth2, .depth3').slideUp();
  })

  //로그인
  $('.btn-login').click(function(){
    $('.popup').hide();
    $('body').css('overflow','');
    // $(window).scrollTop(scrollTop);
    $('[data-popup=popup-login]').data('popup','popup-mypage');    
    $('[data-popup=popup-login]').find('i').addClass('login');
  })

  //로그아웃
  $('.btn-logout').click(function(e){
    e.preventDefault();
    $('.popup').hide();
    $('body').css('overflow','');
    $('[data-popup=popup-login]').data('popup','popup-login');
    $('[data-popup=popup-login]').find('i').removeClass('login');
  })
  
  //메뉴팝업 =================================================================
  var depth2H=0;
  var depth3H=0;
  //1depth
  $('.gnb-nav > li > a').click(function(e){
    e.preventDefault();
    $('.gnb-nav > li > a').removeClass('on');
    $('.depth2 > li > a').removeClass('on');
    $(this).addClass('on');
    $('.depth2').css('height','auto');
    $('.depth3').slideUp();
    if($(this).next().css('display')=='none'||$(this).next().length==0){
      $('.depth2').slideUp();
      $(this).next().slideDown(200);
    }
    var $this=$(this);
    setTimeout(function(){
      depth2H=$this.next().height();
      console.log(depth2H);
    },500);
  })

  $('.depth2 > li > a').click(function(e){
    e.preventDefault();
    var $this=$(this);
    $('.depth2 > li > a').removeClass('on');
    $this.addClass('on');
    $('.depth3').slideUp(300);
    depth3H=$this.next().outerHeight();
    if(depth3H==undefined){depth3H=0;}
    $this.parents('.depth2').animate({
      height:depth2H+depth3H
    },200)
    $this.next().slideDown(300);
    $this.next().css('top',depth2H);
  })

  $('.language-nav a').click(function(e){
    e.preventDefault();
    $('.language-nav a').removeClass('active');
    $(this).addClass('active');
  })


  //parallax
 // init controller
 var controller = new ScrollMagic.Controller({globalSceneOptions: { duration: "100%"}});

 // build scenes
 new ScrollMagic.Scene({triggerElement: "#parallax"})
         .setTween("#parallax > div", {y: "-30%"})
        //  .addIndicators()
         .addTo(controller);

  //리사이징=================================================================
  $(window).resize(function(){    

    w=$(window).width();
    h=$(window).height();
    if(w<=767){
      noticeRolling=-25;
      $('.main-slide img').each(function(i){
        $(this).attr('src',mainMobile[i]);
      });
      $('.event img').each(function(i){
        $(this).attr('src',eventMobile[i]);
      });
      setTimeout(function(){
        theme1Swiper.update();
        theme2Swiper.update();
        theme3Swiper.update();
        theme4Swiper.update();
        theme5Swiper.update();
        characterSwiper.update();
      },100);
      $('.checkbox-wrap').innerHeight(h-130);
      $('.etc-nav').hide();
      $('.etc-wrap > a').removeClass();
    }else if(w>767 && w <= 1200){
      noticeRolling=-50;
      $('.main-slide img').each(function(i){
        $(this).attr('src',mainMobile[i]);
      });
      $('.etc-nav').show();
    }else{
      noticeRolling=-50;
      $('.main-slide img').each(function(i){
        $(this).attr('src',mainPc[i]);
      });
      $('.event img').each(function(i){
        $(this).attr('src',eventPc[i]);
      });
      $('.etc-nav').show();
    }
  })
  $(window).trigger('resize');

})
