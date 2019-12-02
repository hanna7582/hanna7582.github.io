function Slide(className){
  this.className=className;
  this.index=0;
  this.max=3;
}


$(function(){
  var i=0;
  var max=8;

  $('label[for=service]').click(function(){
    if($('#service').is(":checked")){
      $('.service_menu').animate({height:'0'});
      $('.bg').css('visibility','hidden');
    }else{
      $('.service_menu').animate({height:'464px'});
      $('.bg').css('visibility','visible');
    }
  });
  $('.bg').click(function(){
      $('.service_menu').animate({height:'0'});
      $(this).css('visibility','hidden');
      $('#service').prop('checked',false);
      console.log($('#service').is(":checked"));
  })

  // kakaotalk_menu
  $('.kakaotalk_menu nav .wrap a').click(function(){
    var index=$('.kakaotalk_menu nav a').index(this);
    i=index;
    slide(i);
  });

  // kakaotalk_menu 이전 다음 버튼
  $('.kakaotalk_menu nav .arrow').click(function(){
    if($(this).hasClass('prev')){
      $('.kakaotalk_menu nav ul').animate({left:0},1000);
    }else{
      $('.kakaotalk_menu nav ul').animate({left:'-360px'},1000);
    }
  })

  // slide 이전 다음 버튼
  $('.slide .arrow').click(function(){
    if($(this).hasClass('prev')){
      i--;
      if(i<0)i=max;
    }else{
      i++;
      if(i>max)i=0;
    }
    if(i>=6){
      $('.kakaotalk_menu nav ul').animate({left:'-360px'},1000);
    }else{
      $('.kakaotalk_menu nav ul').animate({left:0},1000);
    }
    slide(i);
  })

  // 슬라이드
  function slide(i){
    $('.slide .wrap').stop().fadeOut()
    .eq(i).stop().fadeIn(1000,function(){
        $('.slide .wrap').remove('active');
        $(this).addClass('active')
      }
    );
    console.log("슬라이드",i);
    $('.kakaotalk_menu nav li').removeClass('active');
    $('.kakaotalk_menu nav li').eq(i).addClass('active');
  }
})
