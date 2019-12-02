$(function(){
  //네비게이션
  var gnbNavH=$('nav').height()-100;
  $('nav .gnb-nav').height(gnbNavH);
  $('.btn-menu').on('click',function(){
    $('nav').toggleClass('open');
    $('html, body').css({'overflow': 'hidden'});
  })
  $('nav .btn-close').on('click',function(){
    $('nav').removeClass('open');
    $('html, body').css({'overflow': 'auto'});
  })

  //검색
  var searchH=$('#search').height()-55;
  $('#search .search-list').height(searchH);

  //footer
  $('footer .info a').on('click',function(){
    $(this).parent().toggleClass('active');
    $(this).parent().next().slideToggle();
  })

  //팝업창 닫기
  $('.popup .btn-close').on('click',function(){
    $('.popup').hide();
    $('html, body').css({'overflow': 'auto'});
  })

  //달력창 열기
  $('#check-in, #check-out').on('click',function(){
    $('#tour-info').hide();
    $('#hotel-info').show();
    $('#datepicker .search-form input').attr('placeholder','호텔명으로 검색');
    $('#datepicker').show();
  })

  //투어날짜선택
  $('#tour-date').on('click',function(){
    $('#hotel-info').hide();
    $('#tour-info').show();
    $('#datepicker .search-form input').attr('placeholder','투어명으로 검색');
    $('#datepicker').show();
  })

  $(window).scroll(function(){
    var scrollTop=$(window).scrollTop();
    if(scrollTop > 100){
      $('.btn-top').show();
    }else{
      $('.btn-top').hide();
    }
  })

  //검색중
  var icons=['/resources/images/hotel/h_restaurant.png',
            '/resources/images/hotel/h_luggagestorage.png',
            '/resources/images/hotel/h_roomserv.png',
            '/resources/images/tour/t_honeymoontour.png'];
  setInterval(function(){
    if(i>=3) i=0;
    $('.no-data .icons img').attr('src',icons[i++]);
  },500);


})//document.ready

//numberCommas
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
