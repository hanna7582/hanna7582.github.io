$(function(){
  $('#btn-menu').on('click',function(){
    console.log('메뉴');
    $('header nav').toggleClass('open');
    $(this).toggleClass('open');
  })

  $(window).resize(function(){
    var windowW=$(window).width();
    $('.gnb > li').off('click mouseenter mouseleave');
    if(windowW<768){
      $('.gnb > li').on('click',function(){
        $('.gnb ul').stop().slideUp();
        $(this).find('ul').stop().slideDown();
      })
    }else{
      $('.gnb > li').on({
        mouseenter:function(){
          $('.gnb ul').hide();
          $(this).find('ul').show();
        },
        mouseleave:function(){
          $('.gnb ul').hide();
        }
      })
    }

  }).resize();

  var swiper = new Swiper('.swiper-container', {
    speed: 600,
    parallax: true,
    scrollbar: {
      el: '.swiper-scrollbar',
    },
    autoplay:{
      delay: 5000,
    }
  });

  $(window).scroll(function(){
    if($('.custom-tab').length!=0){
      var customTab=$('.custom-tab').offset().top;
      var scrollTop=$(window).scrollTop();
      if(scrollTop>=customTab){
        $('.custom-tab').addClass('fixed');
      }else{
        $('.custom-tab').removeClass('fixed');
      }
    }
  }).scroll();

  $('.custom-tab nav li a').on('click',function(){
    $('.custom-tab nav li a').removeClass('active');
    $(this).addClass('active');
    const id=$(this).attr('href');
    $('.custom-tab .tab-content').hide();
    $(id).show();
    $('html, body').stop().animate({
      scrollTop:$('.custom-tab').offset().top
    })
    return false;
  })

  $('.accordion a').on('click',function(e){
    $('.accordion a').removeClass('active');
    $(this).addClass('active');
    $('.accordion .ac-content').stop().slideUp();
    $(this).parent().next().stop().slideDown();
    $('.accordion a i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    $(this).find('i').addClass('fa-chevron-up')
    return false;
  })


})
