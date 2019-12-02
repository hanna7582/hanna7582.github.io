$(function(){
  //select 리스트활성화
  $('.select > a').on('click',function(e){
    e.preventDefault();
    $('.select ul').slideUp('fast');
    $(this).next().slideToggle('fast');
  })

  //select이 아닌 다른 영역 선택시 select닫기
  $('html').click(function(e) {
    if(!$(e.target).hasClass("select-check")){
      $('.select ul').slideUp('fast');
    }
  });
  //리스트에서 선택시 select option값 변경
  $('.select li').on('click',function(e){
    e.preventDefault();
    var index=$(this).index();
    $(this).parents('.select').find("select option").eq(index).prop("selected", true);
    var value=$(this).parents('.select').find("select option:selected").text();
    $(this).parents('.select').children("a").text(value);
    $(this).parent().slideUp('fast');
  })

  //달력
  //hotel-datepicker열기
  $('#check-in, #check-out').on('click',function(){
    $('.select ul').slideUp('fast');
    $('#hotel-datepicker').slideDown();
    datepickerId=$(this).attr('id');
    if(datepickerId=='check-in'){
      $('#hotel-datepicker h1').text('체크인');
    }else if(datepickerId=='check-out'){
      $('#hotel-datepicker h1').text('체크아웃');
    }
  })
  $('#hotel-datepicker a').on('click',function(){
    if(!$(this).parent().hasClass('no')){
      var date=$(this).text();
      var yearmonth=$(this).parents('.wp50').find('.date').text();
      if(datepickerId=='check-in'){
        $('#check-in').val(yearmonth+'.'+date);
      }else if(datepickerId=='check-out'){
        $('#check-out').val(yearmonth+'.'+date);
      }
      $('#hotel-datepicker').slideUp();
    }else{
      if(datepickerId=='check-in'){
        alert('체크인이 불가합니다.')
      }else if(datepickerId=='check-out'){
        alert('체크아웃이 불가합니다.')
      }
    }
  })

  //tour-datepicker열기
  $('#tour-date').on('click',function(){
    $('.select ul').slideUp('fast');
    $('#tour-datepicker').slideDown();
  })
  $('#tour-datepicker a').on('click',function(){
    if(!$(this).parent().hasClass('no')){
      var date=$(this).text();
      var yearmonth=$(this).parents('#tour-datepicker').find('.date').text();
      $('#tour-date').val(yearmonth+'.'+date);
      $('#tour-datepicker').slideUp();
    }else{
      alert('선택이 불가합니다.')
    }
  })

  //datepicker 창닫기
  $('.popup-datepicker .icon-close').on('click',function(){
    $(this).parents('.popup-datepicker').slideUp();
  })

  //팝업창 닫기
  $('.popup .close').on('click',function(){
    $('.popup').slideUp(function(){
      $('.popup-bg').remove();
    });
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
