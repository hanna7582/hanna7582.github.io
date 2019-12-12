$(function(){
  //초기 스크롤 제거
  $('html').css('overflow','hidden');

  //각 디바이스별 스크롤 이벤트 시작위치 다르게 설정
  $(window).resize(function(){
    w=$(window).width();
    if(w<768){
      diviceScroll=400;
      modal=140;
      navH=70;
    }else if(w>=768 && w < 992){
      diviceScroll=600;
      modal=180;
      navH=0;
    }else{
      diviceScroll=800;
      modal=180;
      navH=0;
    }
  })
  $(window).trigger('resize');

  $(window).scroll(function(){
    //위로가기
    var windowTop=$(window).scrollTop();
    if(windowTop > 100){
      $('.go-up').addClass('on');
    }else{
      $('.go-up').removeClass('on');
    }

    //profile 슬라이드
    $('#profile .row > div').each(function(index){
      var pos=$(this).offset().top;
      var winTop=$(window).scrollTop();
      if(pos < winTop+diviceScroll){
        if(index%2==0){
          $(this).addClass('slide-left');
        }else{
          $(this).addClass('slide-right');
        }
      }
    })
  })
  $(window).trigger('scroll');

  //메뉴 클릭시 부드럽게 스크롤 처리
  $('nav a, .go-up').on('click',function(event){
    if(this.hash!=''){
      event.preventDefault();
      var hash=this.hash;
      $('html').animate({
        scrollTop:$(hash).offset().top-navH
      },1000)
    }
  });

  //swiper ===========================================================================
  //swiper
  var swiper = new Swiper('#slide .swiper-container', {
    effect: 'fade',
    pagination: {
      el: '#slide .swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '#slide .swiper-button-next',
      prevEl: '#slide .swiper-button-prev',
    },
    loop:true,
    autoplay:{
      delay:2000,
    }
  });

  //정지재생버튼의 위치 잡기
  var pageLength=$('.swiper-pagination-bullet').length;
  var position=$('.swiper-pagination-bullet').outerWidth(true)*pageLength/2+5;
  $('.btn-play-control').css('margin-left',position);

  //사용자가 조작시
  swiper.on('touchStart', function () {
    $('.btn-play-control i').removeClass().addClass('fa fa-play');
    $('.btn-play-control span').text('재생');
  });
  $('.swiper-pagination span').click(function(){
    $('.btn-play-control i').removeClass().addClass('fa fa-play');
    $('.btn-play-control span').text('재생');
  })

  //정지/재생버튼
  $('.btn-play-control').click(function(){
    if($(this).find('i').hasClass('fa-stop')){
      swiper.autoplay.stop();
      $(this).find('span').text('재생');
    }else{
      swiper.autoplay.start();
      $(this).find('span').text('정지');
    }
    $(this).find('i').toggleClass('fa-play fa-stop');
  })

  //isotope ==========================================================================
  var qsRegex;
  var $grid;
  
  $('img').on('load',function(){
      $('#loading-bg').animate({
          opacity:0
      },2000,function(){
        $(this).remove();
        $('html').removeAttr('style');

        $grid=$('.filter').isotope({
            filter:function(){
                return qsRegex ? $(this).text().match(qsRegex):true;
            }
        });
    
        $grid.imagesLoaded().progress( function() {
          $grid.isotope('layout');
        }); 
    
        //정렬 후 이벤트 추가
        $grid.on('layoutComplete',function(event, laidOutItems){
            //정렬된 아이템의 수
            var searchLength=laidOutItems.length;
            if(searchLength==0) fn_alertMessage(searchLength);
            total(searchLength);
        })
      })    
  })

  //카테고리 메뉴 클릭시 정렬하기
  $('#works .nav li').on('click', function(){
      event.preventDefault();
      $('#works .nav li').removeClass('active');
      $(this).addClass('active');
      var sortValue=$(this).attr('data-sort-value');
      //console.log("정렬기준:"+sortValue);
      qsRegex=new RegExp(sortValue, 'gi');
      $grid.isotope({filter:sortValue});
  })

  function search(){
    //검색할 단어 가져오기
    $quicksearch=$('.quicksearch').val();
    qsRegex=new RegExp($quicksearch, 'gi');
    $grid.isotope({filter:function(){
       return qsRegex ? $(this).find('.title').text().match(qsRegex):true;
    }})
    //works영역으로 위치이동
    $('html').animate({
        scrollTop:$('#works').offset().top
    },1000);
  }

  //검색으로 정렬하기
  $('.search-form button').on('click',function(){
    search()
  })
  $('.quicksearch').on('keydown',function(e){
    if(e.keyCode==13){   
      search()
    }
  })

  //총 아이템 수
  function total(search){
    var total=$('.filter .item').length;
    $('.count .total').text(total);
    if(search==undefined) search=total;
    $('.count .search').text(search);
  }

  //검색 결과를 알림창으로 보여주기
  function fn_alertMessage(count){
    var alertText;
    if(count == 0){
       alertText="검색결과가 없습니다.";
    }
    var alertMessage='<div class="alert-bg">'
        +'<div class="alert alert-dismissible" role="alert">'
        // +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
        +'<strong>'+alertText+'</strong>'
        +'</div>'
        +'</div>';
    $('body').append(alertMessage);
    setTimeout(function(){
      $('.alert-bg').fadeOut(function(){
        $(this).remove();
      })
    },500);
  }
})
